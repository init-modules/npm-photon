import assert from "node:assert/strict";
import test from "node:test";
import type { PhotonActionPolicy } from "../types";
import {
	PHOTON_CASCADE_SCOPE_ORDER,
	comparePhotonCascadable,
	dedupePhotonCascadeBy,
	dedupePoliciesById,
	detectPhotonCascadeConflicts,
	resolvePolicyCascade,
	sortPhotonCascade,
} from "./override-resolution";

const makePolicy = (
	overrides: Partial<PhotonActionPolicy> & {
		id: string;
		scope: PhotonActionPolicy["scope"];
	},
): PhotonActionPolicy => ({
	packageName: "test",
	targetActionId: "target",
	when: { type: "ref", conditionId: "always" },
	run: "run-action",
	...overrides,
});

// --- Scope ladder ---

test("PHOTON_CASCADE_SCOPE_ORDER mirrors 6.md ladder (low → high)", () => {
	const expected: Record<string, number> = {
		"package-default": 1,
		site: 2,
		locale: 3,
		"route-family": 4,
		"route-context": 5,
		page: 6,
		component: 7,
		"action-flow": 8,
		"workspace-draft": 9,
		workspace: 9,
		"user-session": 10,
	};
	for (const [scope, value] of Object.entries(expected)) {
		assert.equal(
			PHOTON_CASCADE_SCOPE_ORDER[
				scope as keyof typeof PHOTON_CASCADE_SCOPE_ORDER
			],
			value,
			`scope ${scope} must have priority ${value}`,
		);
	}
});

// --- Sort direction (higher precedence first) ---

test("sortPhotonCascade puts higher scope first (user-session beats workspace-draft beats site beats package-default)", () => {
	const sorted = sortPhotonCascade([
		{ scope: "package-default", packageName: "x" },
		{ scope: "user-session", packageName: "x" },
		{ scope: "site", packageName: "x" },
		{ scope: "workspace-draft", packageName: "x" },
	]);
	assert.deepEqual(
		sorted.map((s) => s.scope),
		["user-session", "workspace-draft", "site", "package-default"],
	);
});

test("sortPhotonCascade orders all 10 scopes correctly per 6.md ladder", () => {
	const allScopes: PhotonActionPolicy["scope"][] = [
		"package-default",
		"site",
		"locale",
		"route-family",
		"route-context",
		"page",
		"component",
		"action-flow",
		"workspace-draft",
		"user-session",
	];
	const sorted = sortPhotonCascade(
		allScopes.map((scope) => ({ scope, packageName: "x" })),
	);
	const sortedNames = sorted.map((s) => s.scope);
	assert.deepEqual(sortedNames, [...allScopes].reverse());
});

test("sortPhotonCascade respects explicit priority within same scope (higher wins)", () => {
	const sorted = sortPhotonCascade([
		{ scope: "site", packageName: "x", priority: 10 },
		{ scope: "site", packageName: "x", priority: 30 },
		{ scope: "site", packageName: "x", priority: 20 },
	]);
	assert.deepEqual(
		sorted.map((s) => s.priority),
		[30, 20, 10],
	);
});

test("sortPhotonCascade tie-breaks on packageName alphabetically", () => {
	const sorted = sortPhotonCascade([
		{ scope: "site", packageName: "zebra" },
		{ scope: "site", packageName: "alpha" },
		{ scope: "site", packageName: "mid" },
	]);
	assert.deepEqual(
		sorted.map((s) => s.packageName),
		["alpha", "mid", "zebra"],
	);
});

test("sortPhotonCascade is pure (does not mutate input)", () => {
	const input = [
		{ scope: "site" as const, packageName: "z" },
		{ scope: "package-default" as const, packageName: "a" },
	];
	const before = input.map((s) => s.packageName);
	sortPhotonCascade(input);
	assert.deepEqual(
		input.map((s) => s.packageName),
		before,
	);
});

// --- Dedupe by key ---

test("dedupePhotonCascadeBy keeps highest-precedence item per key", () => {
	const items = [
		{ scope: "package-default" as const, packageName: "p", id: "a" },
		{ scope: "site" as const, packageName: "p", id: "a" },
		{ scope: "page" as const, packageName: "p", id: "a" },
		{ scope: "site" as const, packageName: "p", id: "b" },
	];
	const result = dedupePhotonCascadeBy(items, (item) => item.id);
	assert.equal(result.length, 2);
	const byId = Object.fromEntries(result.map((item) => [item.id, item]));
	assert.equal(byId.a?.scope, "page", "page beats site beats package-default for id 'a'");
	assert.equal(byId.b?.scope, "site");
});

test("dedupePhotonCascadeBy on equal scope+priority keeps alphabetical packageName winner", () => {
	const items = [
		{ scope: "site" as const, packageName: "zebra", id: "shared", priority: 5 },
		{ scope: "site" as const, packageName: "alpha", id: "shared", priority: 5 },
	];
	const result = dedupePhotonCascadeBy(items, (item) => item.id);
	assert.equal(result.length, 1);
	assert.equal(result[0]?.packageName, "alpha");
});

// --- Conflict detection ---

test("detectPhotonCascadeConflicts flags ambiguous resolutions (same scope+priority, different packages)", () => {
	const items = [
		{ scope: "site" as const, packageName: "zebra", id: "shared", priority: 5 },
		{ scope: "site" as const, packageName: "alpha", id: "shared", priority: 5 },
		{ scope: "site" as const, packageName: "mid", id: "no-conflict" },
	];
	const conflicts = detectPhotonCascadeConflicts(items, (item) => item.id);
	assert.equal(conflicts.length, 1);
	assert.equal(conflicts[0]?.key, "shared");
	assert.equal(conflicts[0]?.winner.packageName, "alpha");
	assert.equal(conflicts[0]?.losers.length, 1);
	assert.equal(conflicts[0]?.losers[0]?.packageName, "zebra");
});

test("detectPhotonCascadeConflicts ignores cases where higher scope or priority disambiguates", () => {
	const items = [
		// Same id but DIFFERENT scope — page beats site, no conflict.
		{ scope: "site" as const, packageName: "zebra", id: "x" },
		{ scope: "page" as const, packageName: "alpha", id: "x" },
		// Same id+scope but DIFFERENT priority — high wins, no conflict.
		{ scope: "site" as const, packageName: "z", id: "y", priority: 10 },
		{ scope: "site" as const, packageName: "a", id: "y", priority: 20 },
	];
	const conflicts = detectPhotonCascadeConflicts(items, (item) => item.id);
	assert.equal(
		conflicts.length,
		0,
		"clear winners must not be flagged as conflicts",
	);
});

// --- Backward compat: policy-specific helpers still work ---

test("resolvePolicyCascade orders 10-scope ladder for policies (workspace-draft beats site beats package-default)", () => {
	const sorted = resolvePolicyCascade([
		makePolicy({ id: "a", scope: "package-default" }),
		makePolicy({ id: "b", scope: "workspace-draft" }),
		makePolicy({ id: "c", scope: "site" }),
	]);
	assert.deepEqual(
		sorted.map((p) => p.id),
		["b", "c", "a"],
	);
});

test("resolvePolicyCascade respects priority within same scope (higher wins)", () => {
	const sorted = resolvePolicyCascade([
		makePolicy({ id: "high", scope: "site", priority: 30 }),
		makePolicy({ id: "low", scope: "site", priority: 10 }),
		makePolicy({ id: "mid", scope: "site", priority: 20 }),
	]);
	assert.deepEqual(
		sorted.map((p) => p.id),
		["high", "mid", "low"],
	);
});

test("dedupePoliciesById picks higher-scope policy when ids collide", () => {
	const result = dedupePoliciesById([
		makePolicy({
			id: "shared-id",
			scope: "package-default",
			run: "package-default-run",
		}),
		makePolicy({ id: "shared-id", scope: "site", run: "site-run" }),
	]);
	assert.equal(result.length, 1);
	assert.equal(result[0]?.scope, "site");
	assert.equal(result[0]?.run, "site-run");
});

test("dedupePoliciesById picks higher-priority policy on same scope+id", () => {
	const result = dedupePoliciesById([
		makePolicy({ id: "shared-id", scope: "site", priority: 10, run: "low" }),
		makePolicy({ id: "shared-id", scope: "site", priority: 30, run: "high" }),
	]);
	assert.equal(result.length, 1);
	assert.equal(result[0]?.run, "high");
});

test("workspace alias is treated identically to workspace-draft (same scope tier)", () => {
	const sorted = resolvePolicyCascade([
		makePolicy({ id: "draft", scope: "workspace-draft" }),
		makePolicy({ id: "alias", scope: "workspace" }),
	]);
	// Same priority; alphabetical packageName tiebreak (both "test") — order
	// is stable based on input order via localeCompare returning 0.
	assert.equal(sorted.length, 2);
	assert.equal(
		PHOTON_CASCADE_SCOPE_ORDER[sorted[0].scope],
		PHOTON_CASCADE_SCOPE_ORDER[sorted[1].scope],
		"workspace and workspace-draft share the same tier",
	);
});

test("comparePhotonCascadable returns 0 for fully equal items", () => {
	const item = {
		scope: "site" as const,
		packageName: "x",
		priority: 5,
	};
	assert.equal(comparePhotonCascadable(item, { ...item }), 0);
});
