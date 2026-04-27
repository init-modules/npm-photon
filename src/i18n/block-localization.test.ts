import assert from "node:assert/strict";
import test from "node:test";
import type { PhotonBlock } from "../types";
import {
	clearPhotonBlockFieldLocalization,
	isPhotonBlockFieldLocalizationOverridden,
	resolveDefaultPhotonFieldLocalization,
	resolvePhotonBlockFieldLocalization,
	togglePhotonBlockFieldLocalization,
} from "./block-localization";

const block = (
	overrides?: Record<string, "localized" | "shared">,
): PhotonBlock => ({
	id: "b-1",
	module: "demo",
	type: "demo-card",
	props: {},
	...(overrides ? { localization: overrides } : {}),
});

test("text fields default to localized", () => {
	assert.equal(resolveDefaultPhotonFieldLocalization("text"), "localized");
	assert.equal(resolveDefaultPhotonFieldLocalization("textarea"), "localized");
	assert.equal(resolveDefaultPhotonFieldLocalization("rich-text"), "localized");
	assert.equal(resolveDefaultPhotonFieldLocalization("tags"), "localized");
});

test("media/structural fields default to shared", () => {
	assert.equal(resolveDefaultPhotonFieldLocalization("image"), "shared");
	assert.equal(resolveDefaultPhotonFieldLocalization("gallery"), "shared");
	assert.equal(resolveDefaultPhotonFieldLocalization("color"), "shared");
	assert.equal(resolveDefaultPhotonFieldLocalization("number"), "shared");
	assert.equal(resolveDefaultPhotonFieldLocalization("toggle"), "shared");
	assert.equal(resolveDefaultPhotonFieldLocalization("url"), "shared");
});

test("instance override wins over schema and defaults", () => {
	const result = resolvePhotonBlockFieldLocalization({
		block: block({ title: "shared" }),
		schema: { localized: ["title"], shared: [] },
		fieldPath: "title",
		fieldKind: "text",
	});
	assert.equal(result, "shared");
});

test("schema is consulted when no instance override is present", () => {
	const result = resolvePhotonBlockFieldLocalization({
		block: block(),
		schema: { localized: [], shared: ["title"] },
		fieldPath: "title",
		fieldKind: "text",
	});
	assert.equal(result, "shared");
});

test("kind default applied when no override or schema entry", () => {
	const result = resolvePhotonBlockFieldLocalization({
		block: block(),
		schema: { localized: [], shared: [] },
		fieldPath: "title",
		fieldKind: "text",
	});
	assert.equal(result, "localized");
});

test("isPhotonBlockFieldLocalizationOverridden true only when override differs from baseline", () => {
	const baseline = isPhotonBlockFieldLocalizationOverridden({
		block: block({ title: "localized" }),
		fieldPath: "title",
		fieldKind: "text",
	});
	assert.equal(baseline, false, "matching kind default is not an override");

	const overridden = isPhotonBlockFieldLocalizationOverridden({
		block: block({ title: "shared" }),
		fieldPath: "title",
		fieldKind: "text",
	});
	assert.equal(overridden, true);
});

test("togglePhotonBlockFieldLocalization flips text field to shared and stores override", () => {
	const result = togglePhotonBlockFieldLocalization(block(), "title", "text");
	assert.equal(result.localization?.title, "shared");
});

test("togglePhotonBlockFieldLocalization clears override when it matches baseline", () => {
	const start = block({ title: "shared" });
	const result = togglePhotonBlockFieldLocalization(start, "title", "text");
	// text default = localized → toggle goes back to localized → matches default → cleared
	assert.equal(result.localization, undefined);
});

test("clearPhotonBlockFieldLocalization removes a single override", () => {
	const start = block({ title: "shared", body: "shared" });
	const result = clearPhotonBlockFieldLocalization(start, "title");
	assert.deepEqual(result.localization, { body: "shared" });
});

test("clearPhotonBlockFieldLocalization drops the localization key when empty", () => {
	const start = block({ title: "shared" });
	const result = clearPhotonBlockFieldLocalization(start, "title");
	assert.equal(result.localization, undefined);
});

test("clearPhotonBlockFieldLocalization is a no-op when override missing", () => {
	const start = block();
	const result = clearPhotonBlockFieldLocalization(start, "title");
	assert.equal(result, start);
});
