import assert from "node:assert/strict";
import test from "node:test";
import type {
	PhotonActionPolicy,
	PhotonConditionEvaluationContext,
	PhotonConditionEvaluatorMap,
	PhotonInteractionGuardInstance,
} from "../types";
import {
	buildActionPlan,
	evaluateConditionExpression,
	mapGuardsToActionPolicies,
} from "./action-policy";

const emptyContext: PhotonConditionEvaluationContext = {
	siteSettings: {},
};

const fixedTrue: PhotonConditionEvaluatorMap = {
	"always-true": () => true,
	"always-false": () => false,
};

test("evaluateConditionExpression resolves ref to evaluator result", () => {
	const expr = { type: "ref" as const, conditionId: "always-true" };
	assert.equal(evaluateConditionExpression(expr, fixedTrue, emptyContext), true);
});

test("evaluateConditionExpression returns null for missing evaluator", () => {
	const expr = { type: "ref" as const, conditionId: "unknown" };
	assert.equal(evaluateConditionExpression(expr, {}, emptyContext), null);
});

test("evaluateConditionExpression evaluates and short-circuits on false", () => {
	const expr = {
		type: "and" as const,
		operands: [
			{ type: "ref" as const, conditionId: "always-true" },
			{ type: "ref" as const, conditionId: "always-false" },
		],
	};
	assert.equal(evaluateConditionExpression(expr, fixedTrue, emptyContext), false);
});

test("evaluateConditionExpression evaluates or short-circuits on true", () => {
	const expr = {
		type: "or" as const,
		operands: [
			{ type: "ref" as const, conditionId: "always-false" },
			{ type: "ref" as const, conditionId: "always-true" },
		],
	};
	assert.equal(evaluateConditionExpression(expr, fixedTrue, emptyContext), true);
});

test("evaluateConditionExpression and with null operand returns null when no false", () => {
	const expr = {
		type: "and" as const,
		operands: [
			{ type: "ref" as const, conditionId: "always-true" },
			{ type: "ref" as const, conditionId: "missing" },
		],
	};
	assert.equal(evaluateConditionExpression(expr, fixedTrue, emptyContext), null);
});

test("evaluateConditionExpression not negates non-null result", () => {
	const expr = {
		type: "not" as const,
		operand: { type: "ref" as const, conditionId: "always-true" },
	};
	assert.equal(evaluateConditionExpression(expr, fixedTrue, emptyContext), false);
});

test("evaluateConditionExpression not preserves null", () => {
	const expr = {
		type: "not" as const,
		operand: { type: "ref" as const, conditionId: "missing" },
	};
	assert.equal(evaluateConditionExpression(expr, fixedTrue, emptyContext), null);
});

test("evaluateConditionExpression eq resolves nested path", () => {
	const ctx: PhotonConditionEvaluationContext = {
		siteSettings: {},
		routeContext: { city: { slug: "astana" } },
	};
	const expr = {
		type: "eq" as const,
		path: "routeContext.city.slug",
		value: "astana",
	};
	assert.equal(evaluateConditionExpression(expr, {}, ctx), true);
});

test("evaluateConditionExpression eq returns false on missing path", () => {
	const expr = {
		type: "eq" as const,
		path: "routeContext.city.slug",
		value: "astana",
	};
	assert.equal(evaluateConditionExpression(expr, {}, emptyContext), false);
});

test("buildActionPlan with no policies returns empty steps", () => {
	const plan = buildActionPlan("target.action", [], {}, emptyContext);
	assert.deepEqual(plan.steps, []);
	assert.equal(plan.hasCycles, false);
	assert.deepEqual(plan.warnings, []);
});

test("buildActionPlan adds prerequisite step when condition matches", () => {
	const policies: PhotonActionPolicy[] = [
		{
			id: "policy-auth-before-publish",
			packageName: "auth",
			targetActionId: "publish",
			when: { type: "ref", conditionId: "is-guest" },
			run: "auth.sign-in",
			scope: "package-default",
		},
	];
	const evaluators: PhotonConditionEvaluatorMap = { "is-guest": () => true };
	const plan = buildActionPlan("publish", policies, evaluators, emptyContext);
	assert.equal(plan.steps.length, 1);
	assert.equal(plan.steps[0].actionInstanceId, "auth.sign-in");
	assert.equal(plan.steps[0].policyId, "policy-auth-before-publish");
});

test("buildActionPlan skips prerequisite when condition false", () => {
	const policies: PhotonActionPolicy[] = [
		{
			id: "p1",
			packageName: "auth",
			targetActionId: "publish",
			when: { type: "ref", conditionId: "is-guest" },
			run: "auth.sign-in",
			scope: "package-default",
		},
	];
	const evaluators: PhotonConditionEvaluatorMap = { "is-guest": () => false };
	const plan = buildActionPlan("publish", policies, evaluators, emptyContext);
	assert.equal(plan.steps.length, 0);
});

test("buildActionPlan detects direct cycle", () => {
	const policies: PhotonActionPolicy[] = [
		{
			id: "a-needs-b",
			packageName: "test",
			targetActionId: "a",
			when: { type: "ref", conditionId: "always" },
			run: "b",
			scope: "package-default",
		},
		{
			id: "b-needs-a",
			packageName: "test",
			targetActionId: "b",
			when: { type: "ref", conditionId: "always" },
			run: "a",
			scope: "package-default",
		},
	];
	const evaluators: PhotonConditionEvaluatorMap = { always: () => true };
	const plan = buildActionPlan("a", policies, evaluators, emptyContext);
	assert.equal(plan.hasCycles, true);
	assert.ok(plan.warnings.some((w) => w.startsWith("Cycle detected")));
});

test("buildActionPlan max depth produces warning, no crash", () => {
	const policies: PhotonActionPolicy[] = [];
	for (let i = 0; i < 15; i += 1) {
		policies.push({
			id: `p-${i}`,
			packageName: "test",
			targetActionId: `step-${i}`,
			when: { type: "ref", conditionId: "always" },
			run: `step-${i + 1}`,
			scope: "package-default",
		});
	}
	const evaluators: PhotonConditionEvaluatorMap = { always: () => true };
	const plan = buildActionPlan("step-0", policies, evaluators, emptyContext);
	assert.ok(plan.warnings.some((w) => w.startsWith("Max depth exceeded")));
});

test("buildActionPlan deduplicates same prerequisite from multiple policies", () => {
	const policies: PhotonActionPolicy[] = [
		{
			id: "p1",
			packageName: "auth-a",
			targetActionId: "checkout",
			when: { type: "ref", conditionId: "always" },
			run: "auth.sign-in",
			scope: "package-default",
		},
		{
			id: "p2",
			packageName: "auth-b",
			targetActionId: "checkout",
			when: { type: "ref", conditionId: "always" },
			run: "auth.sign-in",
			scope: "package-default",
		},
	];
	const evaluators: PhotonConditionEvaluatorMap = { always: () => true };
	const plan = buildActionPlan("checkout", policies, evaluators, emptyContext);
	const occurrences = plan.steps.filter(
		(s) => s.actionInstanceId === "auth.sign-in",
	).length;
	assert.equal(occurrences, 1);
});

test("buildActionPlan fail-closed policy with null evaluator skips and warns", () => {
	const policies: PhotonActionPolicy[] = [
		{
			id: "p1",
			packageName: "auth",
			targetActionId: "publish",
			when: { type: "ref", conditionId: "missing-evaluator" },
			run: "auth.sign-in",
			scope: "package-default",
			securityMode: "fail-closed",
		},
	];
	const plan = buildActionPlan("publish", policies, {}, emptyContext);
	assert.equal(plan.steps.length, 0);
	assert.ok(plan.warnings.some((w) => w.includes("fail-closed")));
});

test("buildActionPlan respects priority order across packages", () => {
	const policies: PhotonActionPolicy[] = [
		{
			id: "company-prereq",
			packageName: "company",
			targetActionId: "checkout",
			when: { type: "ref", conditionId: "always" },
			run: "company.profile.create",
			scope: "package-default",
			priority: 20,
		},
		{
			id: "auth-prereq",
			packageName: "auth",
			targetActionId: "checkout",
			when: { type: "ref", conditionId: "always" },
			run: "auth.sign-in",
			scope: "package-default",
			priority: 10,
		},
	];
	const evaluators: PhotonConditionEvaluatorMap = { always: () => true };
	const plan = buildActionPlan("checkout", policies, evaluators, emptyContext);
	assert.equal(plan.steps[0].actionInstanceId, "auth.sign-in");
	assert.equal(plan.steps[1].actionInstanceId, "company.profile.create");
});

test("mapGuardsToActionPolicies converts enabled guards and skips disabled", () => {
	const guards: PhotonInteractionGuardInstance[] = [
		{
			id: "auth-required",
			definitionId: "auth.required",
			label: "Auth required",
			enabled: true,
			action: {
				type: "surface",
				surfaceInstanceId: "auth.sign-in.default",
			},
		},
		{
			id: "disabled-guard",
			definitionId: "any",
			label: "Disabled",
			enabled: false,
		},
	];
	const policies = mapGuardsToActionPolicies(guards, [], {
		targetActionId: "publish",
	});
	assert.equal(policies.length, 1);
	assert.equal(policies[0].id, "bridge:guard:auth-required");
	assert.equal(policies[0].targetActionId, "publish");
	assert.equal(policies[0].run, "auth.sign-in.default");
	assert.equal(policies[0].when.type, "ref");
	assert.equal(policies[0].enforcement, "client-hint");
	assert.equal(policies[0].securityMode, "fail-open");
});
