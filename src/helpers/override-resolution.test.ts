import assert from "node:assert/strict";
import test from "node:test";
import type { PhotonActionPolicy } from "../types";
import {
	dedupePoliciesById,
	resolvePolicyCascade,
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

test("resolvePolicyCascade orders workspace > site > package-default", () => {
	const sorted = resolvePolicyCascade([
		makePolicy({ id: "a", scope: "package-default" }),
		makePolicy({ id: "b", scope: "workspace" }),
		makePolicy({ id: "c", scope: "site" }),
	]);
	assert.deepEqual(
		sorted.map((p) => p.id),
		["b", "c", "a"],
	);
});

test("resolvePolicyCascade respects explicit priority within same scope", () => {
	const sorted = resolvePolicyCascade([
		makePolicy({ id: "high", scope: "site", priority: 30 }),
		makePolicy({ id: "low", scope: "site", priority: 10 }),
		makePolicy({ id: "mid", scope: "site", priority: 20 }),
	]);
	assert.deepEqual(
		sorted.map((p) => p.id),
		["low", "mid", "high"],
	);
});

test("resolvePolicyCascade falls back to alphabetical packageName tie-break", () => {
	const sorted = resolvePolicyCascade([
		makePolicy({
			id: "zebra-policy",
			scope: "site",
			priority: 10,
			packageName: "zebra",
		}),
		makePolicy({
			id: "alpha-policy",
			scope: "site",
			priority: 10,
			packageName: "alpha",
		}),
	]);
	assert.deepEqual(
		sorted.map((p) => p.id),
		["alpha-policy", "zebra-policy"],
	);
});

test("dedupePoliciesById replaces lower-scope policy with higher-scope one of same id", () => {
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

test("dedupePoliciesById keeps distinct ids untouched", () => {
	const result = dedupePoliciesById([
		makePolicy({ id: "a", scope: "package-default" }),
		makePolicy({ id: "b", scope: "site" }),
	]);
	assert.equal(result.length, 2);
});

test("resolvePolicyCascade does not mutate input array", () => {
	const input = [
		makePolicy({ id: "a", scope: "package-default" }),
		makePolicy({ id: "b", scope: "workspace" }),
	];
	const before = input.map((p) => p.id);
	resolvePolicyCascade(input);
	const after = input.map((p) => p.id);
	assert.deepEqual(before, after);
});
