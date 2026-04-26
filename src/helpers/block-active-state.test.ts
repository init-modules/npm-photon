import assert from "node:assert/strict";
import test from "node:test";
import type {
	PhotonAnyBlockDefinition,
	PhotonConditionDefinition,
	PhotonConditionEvaluatorMap,
} from "../types";
import { resolvePhotonBlockActiveState } from "./block-active-state";

const baseDefinition: PhotonAnyBlockDefinition = {
	type: "subscribe-button",
	label: "Subscribe button",
	description: "Subscribe to newsletter",
	category: "interactive",
	defaults: {},
	fields: [],
	component: () => null,
	previewScenarios: [
		{ id: "default", label: "Default" },
		{ id: "subscribed", label: "Subscribed" },
		{ id: "loading", label: "Loading" },
	],
	states: [
		{
			id: "subscribed",
			label: "Subscribed",
			condition: { type: "ref", conditionId: "newsletter.isSubscribed" },
		},
		{
			id: "loading",
			label: "Loading",
			condition: { type: "ref", conditionId: "newsletter.isLoading" },
		},
		{
			id: "default",
			label: "Default",
			isDefaultServerState: true,
		},
	],
};

const allFalse: PhotonConditionEvaluatorMap = {
	"newsletter.isSubscribed": () => false,
	"newsletter.isLoading": () => false,
};

const subscribedTrue: PhotonConditionEvaluatorMap = {
	"newsletter.isSubscribed": () => true,
	"newsletter.isLoading": () => false,
};

const allUnresolved: PhotonConditionEvaluatorMap = {};

const emptyContext = { siteSettings: {} };

test("resolvePhotonBlockActiveState returns 'none' when definition is missing", () => {
	const result = resolvePhotonBlockActiveState({ definition: undefined });
	assert.equal(result.source, "none");
	assert.equal(result.state, null);
	assert.equal(result.scenario, null);
});

test("resolvePhotonBlockActiveState picks the state whose condition is true", () => {
	const result = resolvePhotonBlockActiveState({
		definition: baseDefinition,
		evaluators: subscribedTrue,
		context: emptyContext,
	});
	assert.equal(result.source, "condition");
	assert.equal(result.state?.id, "subscribed");
});

test("resolvePhotonBlockActiveState falls back to unconditional state when no condition matches", () => {
	const result = resolvePhotonBlockActiveState({
		definition: baseDefinition,
		evaluators: allFalse,
		context: emptyContext,
	});
	assert.equal(result.source, "fallback");
	assert.equal(result.state?.id, "default");
});

test("resolvePhotonBlockActiveState picks default-server state when conditions unresolved", () => {
	const result = resolvePhotonBlockActiveState({
		definition: baseDefinition,
		evaluators: allUnresolved,
		context: emptyContext,
	});
	assert.equal(result.source, "default-server");
	assert.equal(result.state?.id, "default");
});

test("resolvePhotonBlockActiveState honours preview override when state matches", () => {
	const result = resolvePhotonBlockActiveState({
		definition: baseDefinition,
		evaluators: subscribedTrue,
		context: emptyContext,
		previewScenarioId: "loading",
	});
	assert.equal(result.source, "preview");
	assert.equal(result.state?.id, "loading");
});

test("resolvePhotonBlockActiveState preview override returns scenario when no state matches the id", () => {
	const definition: PhotonAnyBlockDefinition = {
		...baseDefinition,
		states: [],
	};
	const result = resolvePhotonBlockActiveState({
		definition,
		previewScenarioId: "subscribed",
	});
	assert.equal(result.source, "preview");
	assert.equal(result.scenario?.id, "subscribed");
	assert.equal(result.state, null);
});

test("resolvePhotonBlockActiveState returns first scenario when block has only previewScenarios", () => {
	const definition: PhotonAnyBlockDefinition = {
		...baseDefinition,
		states: [],
	};
	const result = resolvePhotonBlockActiveState({ definition });
	assert.equal(result.source, "fallback");
	assert.equal(result.scenario?.id, "default");
});

test("resolvePhotonBlockActiveState returns 'none' when block declares neither states nor scenarios", () => {
	const definition: PhotonAnyBlockDefinition = {
		...baseDefinition,
		states: [],
		previewScenarios: [],
	};
	const result = resolvePhotonBlockActiveState({
		definition,
		evaluators: subscribedTrue,
		context: emptyContext,
	});
	assert.equal(result.source, "none");
	assert.equal(result.state, null);
	assert.equal(result.scenario, null);
});

test("resolvePhotonBlockActiveState ignores unknown previewScenarioId silently and falls through to condition resolution", () => {
	const result = resolvePhotonBlockActiveState({
		definition: baseDefinition,
		evaluators: subscribedTrue,
		context: emptyContext,
		previewScenarioId: "ghost-state",
	});
	assert.equal(result.source, "condition");
	assert.equal(result.state?.id, "subscribed");
});

// --- SSR mode (defaultServerPreviewState) ---

const ssrConditionDefinitions: PhotonConditionDefinition[] = [
	{
		id: "newsletter.isSubscribed",
		packageName: "newsletter",
		label: "Subscribed",
		resolution: "client",
		defaultServerPreviewStateId: "default",
	},
	{
		id: "newsletter.isLoading",
		packageName: "newsletter",
		label: "Loading",
		resolution: "client",
	},
];

test("resolvePhotonBlockActiveState SSR mode: client-only conditions short-circuit to default-server", () => {
	const result = resolvePhotonBlockActiveState({
		definition: baseDefinition,
		evaluators: subscribedTrue,
		context: emptyContext,
		mode: "server",
		conditionDefinitions: ssrConditionDefinitions,
	});
	assert.equal(result.source, "default-server");
	assert.equal(
		result.state?.id,
		"default",
		"server-side resolution picks isDefaultServerState rather than client-only condition state",
	);
});

test("resolvePhotonBlockActiveState SSR mode without isDefaultServerState falls back to defaultServerPreviewStateId pointer", () => {
	const definition: PhotonAnyBlockDefinition = {
		...baseDefinition,
		states: [
			{
				id: "subscribed",
				label: "Subscribed",
				condition: { type: "ref", conditionId: "newsletter.isSubscribed" },
			},
			{
				id: "default",
				label: "Default",
				condition: {
					type: "not",
					operand: { type: "ref", conditionId: "newsletter.isSubscribed" },
				},
			},
		],
	};
	const result = resolvePhotonBlockActiveState({
		definition,
		evaluators: subscribedTrue,
		context: emptyContext,
		mode: "server",
		conditionDefinitions: ssrConditionDefinitions,
	});
	assert.equal(result.source, "default-server");
	assert.equal(
		result.state?.id,
		"default",
		"defaultServerPreviewStateId pointer wins when no unconditional state",
	);
});

test("resolvePhotonBlockActiveState 'any' mode (default) preserves legacy client-side resolution", () => {
	const result = resolvePhotonBlockActiveState({
		definition: baseDefinition,
		evaluators: subscribedTrue,
		context: emptyContext,
		mode: "any",
		conditionDefinitions: ssrConditionDefinitions,
	});
	assert.equal(result.source, "condition");
	assert.equal(result.state?.id, "subscribed");
});

test("resolvePhotonBlockActiveState SSR mode evaluates server/both conditions normally", () => {
	const definition: PhotonAnyBlockDefinition = {
		...baseDefinition,
		states: [
			{
				id: "ru",
				label: "Russian",
				condition: { type: "ref", conditionId: "locale.isRu" },
			},
			{
				id: "default",
				label: "Default",
				isDefaultServerState: true,
			},
		],
	};
	const conditions: PhotonConditionDefinition[] = [
		{
			id: "locale.isRu",
			packageName: "i18n",
			label: "Russian locale",
			resolution: "both",
		},
	];
	const result = resolvePhotonBlockActiveState({
		definition,
		evaluators: { "locale.isRu": () => true },
		context: emptyContext,
		mode: "server",
		conditionDefinitions: conditions,
	});
	assert.equal(result.source, "condition");
	assert.equal(result.state?.id, "ru");
});
