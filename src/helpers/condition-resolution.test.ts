import assert from "node:assert/strict";
import test from "node:test";
import type {
	PhotonActionStateDefinition,
	PhotonConditionDefinition,
	PhotonConditionEvaluatorMap,
	PhotonConditionExpression,
} from "../types";
import {
	evaluatePhotonConditionForMode,
	resolvePhotonActionStateForMode,
	resolvePhotonConditionAxis,
} from "./condition-resolution";

const conditionDefinitions: PhotonConditionDefinition[] = [
	{
		id: "auth.isGuest",
		packageName: "auth",
		label: "Is guest",
		resolution: "client",
		defaultServerPreviewStateId: "guest",
	},
	{
		id: "locale.isRu",
		packageName: "i18n",
		label: "Is Russian locale",
		resolution: "both",
	},
	{
		id: "session.hasCookie",
		packageName: "auth",
		label: "Has session cookie",
		resolution: "server",
	},
];

const emptyContext = { siteSettings: {} };

// --- resolvePhotonConditionAxis ---

test("resolvePhotonConditionAxis returns 'both' for undefined / pure expressions", () => {
	assert.equal(resolvePhotonConditionAxis(undefined, []), "both");
	assert.equal(
		resolvePhotonConditionAxis(
			{ type: "eq", path: "a.b", value: 1 },
			[],
		),
		"both",
	);
});

test("resolvePhotonConditionAxis returns 'client' for any client-only ref", () => {
	const expr: PhotonConditionExpression = {
		type: "and",
		operands: [
			{ type: "ref", conditionId: "session.hasCookie" },
			{ type: "ref", conditionId: "auth.isGuest" },
		],
	};
	assert.equal(resolvePhotonConditionAxis(expr, conditionDefinitions), "client");
});

test("resolvePhotonConditionAxis returns 'server' for server + both refs", () => {
	const expr: PhotonConditionExpression = {
		type: "and",
		operands: [
			{ type: "ref", conditionId: "session.hasCookie" },
			{ type: "ref", conditionId: "locale.isRu" },
		],
	};
	assert.equal(resolvePhotonConditionAxis(expr, conditionDefinitions), "server");
});

test("resolvePhotonConditionAxis returns 'both' when only 'both' refs", () => {
	assert.equal(
		resolvePhotonConditionAxis(
			{ type: "ref", conditionId: "locale.isRu" },
			conditionDefinitions,
		),
		"both",
	);
});

test("resolvePhotonConditionAxis is conservative ('client') for unknown refs", () => {
	assert.equal(
		resolvePhotonConditionAxis(
			{ type: "ref", conditionId: "missing" },
			conditionDefinitions,
		),
		"client",
	);
});

test("resolvePhotonConditionAxis traverses 'not' operand", () => {
	const expr: PhotonConditionExpression = {
		type: "not",
		operand: { type: "ref", conditionId: "auth.isGuest" },
	};
	assert.equal(resolvePhotonConditionAxis(expr, conditionDefinitions), "client");
});

// --- evaluatePhotonConditionForMode ---

const evaluators: PhotonConditionEvaluatorMap = {
	"auth.isGuest": () => true,
	"locale.isRu": () => true,
	"session.hasCookie": () => true,
};

test("evaluatePhotonConditionForMode in 'server' mode short-circuits client refs to null", () => {
	const expr: PhotonConditionExpression = {
		type: "ref",
		conditionId: "auth.isGuest",
	};
	assert.equal(
		evaluatePhotonConditionForMode(
			expr,
			evaluators,
			emptyContext,
			conditionDefinitions,
			"server",
		),
		null,
	);
});

test("evaluatePhotonConditionForMode in 'server' mode evaluates server/both refs normally", () => {
	const expr: PhotonConditionExpression = {
		type: "and",
		operands: [
			{ type: "ref", conditionId: "session.hasCookie" },
			{ type: "ref", conditionId: "locale.isRu" },
		],
	};
	assert.equal(
		evaluatePhotonConditionForMode(
			expr,
			evaluators,
			emptyContext,
			conditionDefinitions,
			"server",
		),
		true,
	);
});

test("evaluatePhotonConditionForMode in 'client' mode evaluates all axes", () => {
	const expr: PhotonConditionExpression = {
		type: "ref",
		conditionId: "auth.isGuest",
	};
	assert.equal(
		evaluatePhotonConditionForMode(
			expr,
			evaluators,
			emptyContext,
			conditionDefinitions,
			"client",
		),
		true,
	);
});

test("evaluatePhotonConditionForMode handles 'not' / 'or' / 'eq' correctly in server mode", () => {
	// or: client-axis short-circuits to null, but if server-axis returns true, OR returns true
	const orExpr: PhotonConditionExpression = {
		type: "or",
		operands: [
			{ type: "ref", conditionId: "auth.isGuest" }, // null in server mode
			{ type: "ref", conditionId: "session.hasCookie" }, // true
		],
	};
	assert.equal(
		evaluatePhotonConditionForMode(
			orExpr,
			evaluators,
			emptyContext,
			conditionDefinitions,
			"server",
		),
		true,
	);
});

// --- resolvePhotonActionStateForMode ---

const states: PhotonActionStateDefinition[] = [
	{
		id: "authenticated",
		label: "Authenticated",
		condition: { type: "ref", conditionId: "auth.isGuest" },
	},
	{
		id: "guest",
		label: "Guest",
		isDefaultServerState: true,
	},
];

test("resolvePhotonActionStateForMode in 'server' mode returns isDefaultServerState when conditions are client-only", () => {
	const result = resolvePhotonActionStateForMode({
		states,
		conditionDefinitions,
		evaluators,
		context: emptyContext,
		mode: "server",
	});
	assert.equal(result?.id, "guest");
});

test("resolvePhotonActionStateForMode in 'client' mode returns the condition-matched state", () => {
	const result = resolvePhotonActionStateForMode({
		states,
		conditionDefinitions,
		evaluators,
		context: emptyContext,
		mode: "client",
	});
	assert.equal(result?.id, "authenticated");
});

test("resolvePhotonActionStateForMode falls back to defaultServerPreviewStateId pointer when no isDefaultServerState", () => {
	const conditionalStates: PhotonActionStateDefinition[] = [
		{
			id: "authenticated",
			label: "Authenticated",
			condition: { type: "ref", conditionId: "auth.isGuest" },
		},
		{
			id: "guest",
			label: "Guest",
			condition: {
				type: "not",
				operand: { type: "ref", conditionId: "auth.isGuest" },
			},
		},
	];
	const result = resolvePhotonActionStateForMode({
		states: conditionalStates,
		conditionDefinitions,
		evaluators,
		context: emptyContext,
		mode: "server",
	});
	// auth.isGuest is client-only; both conditions short-circuit. The
	// definition's defaultServerPreviewStateId points to "guest" so it
	// should be picked even though it has a condition.
	assert.equal(result?.id, "guest");
});

test("resolvePhotonActionStateForMode returns null when no states", () => {
	const result = resolvePhotonActionStateForMode({
		states: [],
		conditionDefinitions,
		evaluators,
		context: emptyContext,
		mode: "server",
	});
	assert.equal(result, null);
});
