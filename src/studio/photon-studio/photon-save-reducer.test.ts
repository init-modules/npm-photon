import assert from "node:assert/strict";
import test from "node:test";
import {
	photonInitialSaveState,
	photonSaveReducer,
	toExternalSaveState,
	type PhotonSaveState,
} from "./photon-save-reducer";

test("initial state is hydrating", () => {
	assert.deepEqual(photonInitialSaveState, { kind: "hydrating" });
});

test("HYDRATE_DONE moves hydrating to idle", () => {
	const next = photonSaveReducer(photonInitialSaveState, {
		type: "HYDRATE_DONE",
	});
	assert.deepEqual(next, { kind: "idle" });
});

test("HYDRATE_DONE is a no-op once hydrated (returns same reference)", () => {
	const idle: PhotonSaveState = { kind: "idle" };
	assert.equal(
		photonSaveReducer(idle, { type: "HYDRATE_DONE" }),
		idle,
	);
});

test("START_SAVE from idle enters saving", () => {
	const next = photonSaveReducer(
		{ kind: "idle" },
		{ type: "START_SAVE" },
	);
	assert.deepEqual(next, { kind: "saving" });
});

test("START_SAVE while saving is ignored (re-entry guard)", () => {
	const saving: PhotonSaveState = { kind: "saving" };
	const next = photonSaveReducer(saving, { type: "START_SAVE" });
	assert.equal(next, saving);
});

test("START_SAVE while saving leaves state strictly unchanged (no kind transition, no payload mutation)", () => {
	// Pins the invariant that use-studio-persistence relies on after dropping
	// the saveStateRef re-entry guard: a second START_SAVE dispatched while a
	// save is already in flight must produce a state that is reference-equal
	// AND structurally equal to the input — no kind transition, no added
	// payload fields.
	const saving: PhotonSaveState = { kind: "saving" };
	const next = photonSaveReducer(saving, { type: "START_SAVE" });
	assert.equal(next, saving);
	assert.deepEqual(next, { kind: "saving" });
	assert.equal(Object.keys(next).length, 1);
});

test("START_SAVE while hydrating is ignored", () => {
	const hydrating: PhotonSaveState = { kind: "hydrating" };
	const next = photonSaveReducer(hydrating, { type: "START_SAVE" });
	assert.equal(next, hydrating);
});

test("START_SAVE from saved transitions to saving", () => {
	const next = photonSaveReducer(
		{ kind: "saved" },
		{ type: "START_SAVE" },
	);
	assert.deepEqual(next, { kind: "saving" });
});

test("START_SAVE from error transitions to saving", () => {
	const next = photonSaveReducer(
		{ kind: "error", message: "boom" },
		{ type: "START_SAVE" },
	);
	assert.deepEqual(next, { kind: "saving" });
});

test("SAVE_SUCCESS only applies from saving", () => {
	assert.deepEqual(
		photonSaveReducer({ kind: "saving" }, { type: "SAVE_SUCCESS" }),
		{ kind: "saved" },
	);
	const idle: PhotonSaveState = { kind: "idle" };
	assert.equal(
		photonSaveReducer(idle, { type: "SAVE_SUCCESS" }),
		idle,
	);
});

test("SAVE_FAILURE carries message from saving", () => {
	const next = photonSaveReducer(
		{ kind: "saving" },
		{ type: "SAVE_FAILURE", message: "network down" },
	);
	assert.deepEqual(next, { kind: "error", message: "network down" });
});

test("SAVE_FAILURE outside saving is a no-op", () => {
	const idle: PhotonSaveState = { kind: "idle" };
	assert.equal(
		photonSaveReducer(idle, { type: "SAVE_FAILURE", message: "x" }),
		idle,
	);
});

test("RESET from saved returns idle", () => {
	assert.deepEqual(
		photonSaveReducer({ kind: "saved" }, { type: "RESET" }),
		{ kind: "idle" },
	);
});

test("RESET from error returns idle", () => {
	assert.deepEqual(
		photonSaveReducer(
			{ kind: "error", message: "boom" },
			{ type: "RESET" },
		),
		{ kind: "idle" },
	);
});

test("RESET from saving returns idle (terminates in-flight save tracking)", () => {
	assert.deepEqual(
		photonSaveReducer({ kind: "saving" }, { type: "RESET" }),
		{ kind: "idle" },
	);
});

test("RESET preserves hydrating", () => {
	const hydrating: PhotonSaveState = { kind: "hydrating" };
	assert.equal(
		photonSaveReducer(hydrating, { type: "RESET" }),
		hydrating,
	);
});

test("RESET on idle returns same reference", () => {
	const idle: PhotonSaveState = { kind: "idle" };
	assert.equal(
		photonSaveReducer(idle, { type: "RESET" }),
		idle,
	);
});

test("toExternalSaveState maps hydrating to idle for backward-compat", () => {
	assert.equal(toExternalSaveState({ kind: "hydrating" }), "idle");
	assert.equal(toExternalSaveState({ kind: "idle" }), "idle");
	assert.equal(toExternalSaveState({ kind: "saving" }), "saving");
	assert.equal(toExternalSaveState({ kind: "saved" }), "saved");
	assert.equal(
		toExternalSaveState({ kind: "error", message: "x" }),
		"error",
	);
});

