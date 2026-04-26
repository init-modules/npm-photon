import assert from "node:assert/strict";
import test from "node:test";
import {
	createPhotonComponentLibraryBlockId,
	getPhotonComponentLibraryItems,
	isPhotonComponentReferenceBlock,
} from "../helpers/component-library";
import { createPhotonRegistry } from "../helpers/document";
import { PHOTON_ROOT_LIST_ID } from "../helpers/tree";
import type { PhotonInteractionSurfaceDefinition } from "../types";
import { createPhotonStore, getPhotonSelectedBlock } from "./photon-store";

const createDocument = (id: string, blockId: string) => ({
	id,
	name: id,
	route: `/${id}`,
	updatedAt: "2026-01-01T00:00:00.000Z",
	blocks: [
		{
			id: blockId,
			module: "test",
			type: "text",
			props: {
				label: id,
			},
		},
	],
});

const createStore = () =>
	createPhotonStore({
		initialDocument: createDocument("profile-a", "block-a"),
		initialResources: {},
		initialPageSettings: {},
		initialSite: {
			settings: {},
			regions: {},
		},
		registry: createPhotonRegistry([]),
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "main",
			},
		},
		linkComponent: () => null,
		isAdmin: true,
	});

const authSurfaceDefinitions: PhotonInteractionSurfaceDefinition[] = [
	{
		id: "auth.dialog",
		label: "Auth dialog",
		kind: "dialog",
		rendererKey: "auth.dialog",
		defaultInstances: [
			{
				id: "auth:default",
				definitionId: "auth.dialog",
				label: "Default auth",
				props: {
					title: "Sign in",
				},
			},
		],
		defaultIntentBindings: [
			{
				intent: "auth:sign-in",
				surfaceInstanceId: "auth:default",
			},
		],
	},
];

test("syncExternalState replaces the active workspace and resets dirty state", () => {
	const store = createStore();

	store.getState().updatePageSettingValue("seo.title", "Draft title");
	assert.equal(store.getState().contentRevision, 1);

	store.getState().syncExternalState({
		initialDocument: createDocument("profile-b", "block-b"),
		initialResources: {
			record: {
				title: "Fresh",
			},
		},
		initialPageSettings: {
			seo: {
				title: "Published",
			},
		},
		initialSite: {
			settings: {
				design: {
					presetId: "init-landing",
				},
			},
			regions: {},
		},
		workspace: {
			ref: {
				profileId: "profile-b",
				branch: "feature/refresh",
			},
			profileName: "Profile B",
		},
		capabilities: {
			canEditMain: false,
		},
	});

	const state = store.getState();

	assert.equal(state.workspace.ref.profileId, "profile-b");
	assert.equal(state.workspace.ref.branch, "feature/refresh");
	assert.equal(state.initialWorkspace.ref.profileId, "profile-b");
	assert.equal(state.contentRevision, 0);
	assert.equal(state.document.id, "profile-b");
	assert.equal(state.selectedBlockId, "block-b");
	assert.deepEqual(state.pageSettings, {
		seo: {
			title: "Published",
		},
	});
	assert.deepEqual(state.resources, {
		record: {
			title: "Fresh",
		},
	});
});

test("readonly revision workspaces reject editor mutations", () => {
	const store = createPhotonStore({
		initialDocument: createDocument("revision", "block-readonly"),
		initialResources: {},
		initialPageSettings: {},
		initialSite: {
			settings: {},
			regions: {},
		},
		registry: createPhotonRegistry([]),
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "release",
				revisionId: "rev-42",
				readonly: true,
			},
			readonlyReason: "revision",
		},
		capabilities: {
			canEdit: false,
			canCommit: false,
			isReadonlyRevision: true,
		},
		linkComponent: () => null,
		isAdmin: true,
	});

	store.getState().updatePageSettingValue("seo.title", "Should not persist");
	store.getState().updateSiteSettingValue("design.presetId", "init-landing");

	const state = store.getState();

	assert.deepEqual(state.pageSettings, {});
	assert.deepEqual(state.site.settings, {});
	assert.equal(state.contentRevision, 0);
});

test("requestAuth executes the configured compatibility interaction action before using fallback", () => {
	let fallbackCalls = 0;
	const store = createPhotonStore({
		initialDocument: createDocument("profile-auth", "block-auth"),
		initialResources: {},
		initialPageSettings: {},
		initialSite: {
			settings: {},
			regions: {},
		},
		registry: createPhotonRegistry([]),
		linkComponent: () => null,
		requestAuth: () => {
			fallbackCalls += 1;
		},
		requestAuthAction: {
			type: "surface",
			intent: "auth:sign-in",
		},
		interactionSurfaces: authSurfaceDefinitions,
		interactionSurfaceRenderers: {
			"auth.dialog": () => null,
		},
		isAdmin: true,
	});

	store.getState().requestAuth?.();

	assert.equal(fallbackCalls, 0);
	assert.equal(
		store.getState().activeInteractionSurface?.instance.id,
		"auth:default",
	);
});

test("requestAuth falls back when the auth interaction surface is unavailable", () => {
	let fallbackCalls = 0;
	const store = createPhotonStore({
		initialDocument: createDocument("profile-auth-disabled", "block-auth"),
		initialResources: {},
		initialPageSettings: {},
		initialSite: {
			settings: {
				interactionSurfaces: {
					instances: {
						"auth:default": {
							id: "auth:default",
							definitionId: "auth.dialog",
							enabled: false,
						},
					},
				},
			},
			regions: {},
		},
		registry: createPhotonRegistry([]),
		linkComponent: () => null,
		requestAuth: () => {
			fallbackCalls += 1;
		},
		requestAuthAction: {
			type: "surface",
			intent: "auth:sign-in",
		},
		interactionSurfaces: authSurfaceDefinitions,
		isAdmin: true,
	});

	store.getState().requestAuth?.();

	assert.equal(fallbackCalls, 1);
	assert.equal(store.getState().activeInteractionSurface, null);
});

test("interaction action execution follows fallback when the renderer is unavailable", () => {
	const navigatedTo: string[] = [];
	const store = createPhotonStore({
		initialDocument: createDocument("profile-missing-renderer", "block-auth"),
		initialResources: {},
		initialPageSettings: {},
		initialSite: {
			settings: {},
			regions: {},
		},
		registry: createPhotonRegistry([]),
		linkComponent: () => null,
		navigate: (href) => {
			navigatedTo.push(href);
		},
		interactionSurfaces: authSurfaceDefinitions,
		isAdmin: true,
	});

	const opened = store.getState().executeInteractionAction({
		intent: "auth:sign-in",
		type: "surface",
		fallbackHref: "/login",
	});

	assert.equal(opened.status, "fallback");
	assert.equal(opened.executed, true);
	assert.deepEqual(navigatedTo, ["/login"]);
	assert.equal(store.getState().activeInteractionSurface, null);
});

test("component library supports reference insertion, source editing and detach", () => {
	const store = createStore();

	store.getState().createComponentLibraryItemFromBlock("block-a");

	const [item] = Object.values(
		getPhotonComponentLibraryItems(store.getState().site.settings),
	);

	assert.ok(item);
	assert.equal(item.blocks[0]?.props.label, "profile-a");

	const sourceBlockId = item.blocks[0]?.id ?? "";
	store.getState().selectComponentLibrarySource(item.id);
	assert.deepEqual(store.getState().selectedComponentLibrarySource, {
		kind: "component-library-source",
		itemId: item.id,
		sourceBlockId,
	});
	const syntheticSourceId = createPhotonComponentLibraryBlockId({
		itemId: item.id,
		referenceBlockId: "preview-reference",
		sourceBlockId,
	});

	store.getState().updateFieldValue(syntheticSourceId, "label", "Library edit");

	const editedItem =
		getPhotonComponentLibraryItems(store.getState().site.settings)[item.id];
	assert.equal(editedItem?.blocks[0]?.props.label, "Library edit");

	store.getState().insertComponentLibraryReference(item.id, PHOTON_ROOT_LIST_ID);

	const referenceBlock = store
		.getState()
		.document.blocks.find((block) => isPhotonComponentReferenceBlock(block));

	assert.ok(referenceBlock);
	assert.equal(referenceBlock.props.itemId, item.id);
	assert.equal(getPhotonSelectedBlock(store.getState())?.id, referenceBlock.id);

	store.getState().detachComponentReference(referenceBlock.id);

	assert.equal(
		store
			.getState()
			.document.blocks.some((block) => isPhotonComponentReferenceBlock(block)),
		false,
	);
	assert.equal(getPhotonSelectedBlock(store.getState())?.props.label, "Library edit");
});

test("component library copy insertion is independent from source edits", () => {
	const store = createStore();

	store.getState().createComponentLibraryItemFromBlock("block-a");

	const [item] = Object.values(
		getPhotonComponentLibraryItems(store.getState().site.settings),
	);

	assert.ok(item);

	store.getState().insertComponentLibraryCopy(item.id, PHOTON_ROOT_LIST_ID);

	const copiedBlockId = store.getState().selectedBlockId;

	assert.ok(copiedBlockId);
	assert.equal(getPhotonSelectedBlock(store.getState())?.props.label, "profile-a");

	const sourceBlockId = item.blocks[0]?.id ?? "";
	const syntheticSourceId = createPhotonComponentLibraryBlockId({
		itemId: item.id,
		referenceBlockId: "preview-reference",
		sourceBlockId,
	});

	store.getState().updateFieldValue(syntheticSourceId, "label", "Source edit");

	const copiedBlock = store
		.getState()
		.document.blocks.find((block) => block.id === copiedBlockId);

	assert.equal(copiedBlock?.props.label, "profile-a");
	assert.equal(
		getPhotonComponentLibraryItems(store.getState().site.settings)[item.id]
			?.blocks[0]?.props.label,
		"Source edit",
	);
});

test("generic trigger execution runs guard action before the protected action", () => {
	const store = createPhotonStore({
		initialDocument: createDocument("profile-guard", "block-guard"),
		initialResources: {},
		initialPageSettings: {},
		initialSite: {
			settings: {},
			regions: {},
		},
		registry: createPhotonRegistry([]),
		linkComponent: () => null,
		interactionSurfaces: authSurfaceDefinitions,
		interactionSurfaceRenderers: {
			"auth.dialog": () => null,
		},
		interactionGuards: [
			{
				id: "auth.required",
				label: "Auth required",
				defaultInstances: [
					{
						id: "auth:required",
						definitionId: "auth.required",
						label: "Require account",
						action: {
							type: "surface",
							intent: "auth:sign-in",
							overrides: {
								description: "Sign in before checkout",
							},
						},
					},
				],
			},
		],
		interactionGuardEvaluators: {
			"auth.required": () => false,
		},
		isAdmin: true,
	});

	const executed = store.getState().executeInteractionTriggerSlot({
		id: "checkout.submit",
		label: "Checkout",
		action: {
			type: "link",
			href: "/checkout",
		},
		guardInstanceIds: ["auth:required"],
	});

	assert.equal(executed.status, "blocked");
	assert.equal(executed.executed, true);
	assert.equal(
		store.getState().activeInteractionSurface?.instance.id,
		"auth:default",
	);
	assert.equal(
		store.getState().activeInteractionSurface?.props.description,
		"Sign in before checkout",
	);
});

test("generic trigger execution blocks the protected action when guard evaluator is missing", () => {
	const navigations: string[] = [];
	const store = createPhotonStore({
		initialDocument: createDocument("profile-guard-missing", "block-guard"),
		initialResources: {},
		initialPageSettings: {},
		initialSite: {
			settings: {},
			regions: {},
		},
		registry: createPhotonRegistry([]),
		linkComponent: () => null,
		navigate: (href) => {
			navigations.push(href);
		},
		interactionGuards: [
			{
				id: "auth.required",
				label: "Auth required",
				defaultInstances: [
					{
						id: "auth:required",
						definitionId: "auth.required",
						label: "Require account",
						action: {
							type: "surface",
							intent: "auth:sign-in",
						},
					},
				],
			},
		],
		isAdmin: true,
	});

	const executed = store.getState().executeInteractionTriggerSlot({
		id: "checkout.submit",
		label: "Checkout",
		action: {
			type: "link",
			href: "/checkout",
		},
		guardInstanceIds: ["auth:required"],
	});

	assert.equal(executed.status, "missing-evaluator");
	assert.equal(executed.executed, false);
	assert.deepEqual(navigations, []);
});

test("component library duplicate and delete lifecycle guards active usages", () => {
	const store = createStore();

	store.getState().createComponentLibraryItemFromBlock("block-a");

	const [item] = Object.values(
		getPhotonComponentLibraryItems(store.getState().site.settings),
	);

	assert.ok(item);

	store.getState().insertComponentLibraryReference(item.id, PHOTON_ROOT_LIST_ID);

	assert.equal(store.getState().deleteComponentLibraryItem(item.id), false);
	assert.ok(getPhotonComponentLibraryItems(store.getState().site.settings)[item.id]);

	store.getState().duplicateComponentLibraryItem(item.id);

	const itemsAfterDuplicate = Object.values(
		getPhotonComponentLibraryItems(store.getState().site.settings),
	);
	const duplicate = itemsAfterDuplicate.find((candidate) => candidate.id !== item.id);

	assert.ok(duplicate);
	assert.notEqual(duplicate.blocks[0]?.id, item.blocks[0]?.id);
	assert.equal(store.getState().deleteComponentLibraryItem(item.id, { force: true }), false);
	assert.equal(
		store.getState().deleteComponentLibraryItem(item.id, { detachUsages: true }),
		true,
	);
	assert.equal(
		getPhotonComponentLibraryItems(store.getState().site.settings)[item.id],
		undefined,
	);
	assert.equal(
		store
			.getState()
			.document.blocks.some((block) => isPhotonComponentReferenceBlock(block)),
		false,
	);
});

test("selectCanvasTriggerStage and selectInspectorTrigger are independent — one does not affect the other", () => {
	const store = createStore();

	store.getState().selectCanvasTriggerStage("search-trigger");

	assert.equal(store.getState().selectedCanvasTriggerStageId, "search-trigger");
	assert.equal(
		store.getState().selectedInspectorTriggerId,
		null,
		"opening canvas stage must not open inspector trigger tab",
	);

	store.getState().selectInspectorTrigger("auth-trigger");

	assert.equal(store.getState().selectedInspectorTriggerId, "auth-trigger");
	assert.equal(
		store.getState().selectedCanvasTriggerStageId,
		"search-trigger",
		"opening inspector trigger tab must not close canvas stage",
	);
});

test("selectBlock resets both trigger selections when switching to a different block", () => {
	const store = createStore();

	store.getState().selectBlock("block-a");
	store.getState().selectCanvasTriggerStage("search-trigger");
	store.getState().selectInspectorTrigger("auth-trigger");

	store.getState().selectBlock("block-a");

	assert.equal(store.getState().selectedCanvasTriggerStageId, "search-trigger", "same block: canvas stage preserved");
	assert.equal(store.getState().selectedInspectorTriggerId, "auth-trigger", "same block: inspector trigger preserved");

	store.getState().selectBlock(null);

	assert.equal(store.getState().selectedCanvasTriggerStageId, null, "deselect: canvas stage reset");
	assert.equal(store.getState().selectedInspectorTriggerId, null, "deselect: inspector trigger reset");
});

test("setBlockPreviewScenario writes per-block scenario id and clears it on null", () => {
	const store = createStore();

	store.getState().setBlockPreviewScenario("block-a", "loading");
	assert.equal(
		store.getState().blockPreviewScenarios["block-a"],
		"loading",
		"scenario id stored",
	);

	store.getState().setBlockPreviewScenario("block-b", "subscribed");
	assert.equal(
		store.getState().blockPreviewScenarios["block-b"],
		"subscribed",
		"second block stored independently",
	);
	assert.equal(
		store.getState().blockPreviewScenarios["block-a"],
		"loading",
		"first block unaffected",
	);

	store.getState().setBlockPreviewScenario("block-a", null);
	assert.equal(
		store.getState().blockPreviewScenarios["block-a"],
		undefined,
		"null clears the entry",
	);
	assert.equal(
		store.getState().blockPreviewScenarios["block-b"],
		"subscribed",
		"clearing one block does not touch siblings",
	);
});

test("setBlockPreviewScenario is a no-op when value did not change (preserves reference)", () => {
	const store = createStore();

	store.getState().setBlockPreviewScenario("block-a", "loading");
	const before = store.getState().blockPreviewScenarios;

	store.getState().setBlockPreviewScenario("block-a", "loading");
	assert.equal(
		store.getState().blockPreviewScenarios,
		before,
		"identical scenario id leaves blockPreviewScenarios reference unchanged",
	);
});

const createTriggerChainStore = (
	initialAuthSubscribed: boolean,
	authConditionEvaluator: () => boolean | null,
) => {
	const navigations: string[] = [];
	const store = createPhotonStore({
		initialDocument: createDocument("trigger-chain", "block-chain"),
		initialResources: {},
		initialPageSettings: {},
		initialSite: {
			settings: {},
			regions: {},
		},
		registry: createPhotonRegistry([]),
		linkComponent: () => null,
		navigate: (href) => {
			navigations.push(href);
		},
		interactionSurfaces: authSurfaceDefinitions,
		interactionSurfaceRenderers: {
			"auth.dialog": () => null,
		},
		interactionPolicies: [
			{
				id: "policy:auth-required-for-checkout",
				packageName: "checkout-package",
				targetActionId: "checkout:submit",
				when: { type: "ref", conditionId: "auth.isGuest" },
				run: "auth:default",
				scope: "site",
				enforcement: "client-hint",
				securityMode: "fail-open",
			},
		],
		conditionEvaluators: {
			"auth.isGuest": authConditionEvaluator,
		},
		interactionActions: [
			{
				id: "checkout:submit-action",
				label: "Submit checkout",
				defaultInstances: [
					{
						id: "checkout:submit",
						definitionId: "checkout:submit-action",
						label: "Submit checkout",
						presentation: { type: "link", href: "/checkout/done" },
					},
				],
			},
		],
		isAdmin: true,
	});
	return { store, navigations };
};

test("trigger execution opens prereq surface and stores pendingActionPlan when policy condition matches", () => {
	const { store, navigations } = createTriggerChainStore(false, () => true);

	const result = store.getState().executeInteractionTriggerSlot({
		id: "checkout-trigger",
		label: "Checkout",
		actionInstanceId: "checkout:submit",
	});

	assert.equal(result.status, "prerequisite-required");
	assert.equal(result.executed, true);
	assert.equal(
		store.getState().activeInteractionSurface?.instance.id,
		"auth:default",
		"prereq surface (sign-in) opened",
	);
	assert.deepEqual(navigations, [], "target action (link) not yet executed");
	const pending = store.getState().pendingActionPlan;
	assert.ok(pending, "pendingActionPlan stored");
	assert.equal(pending?.targetActionInstanceId, "checkout:submit");
	assert.equal(pending?.previousStepCount, 1);
});

test("completing prereq surface re-evaluates plan and executes target action when conditions cleared", () => {
	let isGuest = true;
	const { store, navigations } = createTriggerChainStore(false, () => isGuest);

	store.getState().executeInteractionTriggerSlot({
		id: "checkout-trigger",
		label: "Checkout",
		actionInstanceId: "checkout:submit",
	});

	assert.equal(
		store.getState().activeInteractionSurface?.instance.id,
		"auth:default",
	);
	assert.ok(store.getState().pendingActionPlan, "plan pending while signing in");

	// User completes sign-in (condition flips), then renderer signals completion.
	isGuest = false;
	store.getState().completeInteractionSurface();

	assert.equal(
		store.getState().activeInteractionSurface,
		null,
		"surface closed",
	);
	assert.equal(
		store.getState().pendingActionPlan,
		null,
		"pendingActionPlan cleared after target executed",
	);
	assert.deepEqual(
		navigations,
		["/checkout/done"],
		"target action executed via auto-continuation",
	);
});

test("closeInteractionSurface is strict-clear: cancels pending plan even if conditions changed", () => {
	let isGuest = true;
	const { store, navigations } = createTriggerChainStore(false, () => isGuest);

	store.getState().executeInteractionTriggerSlot({
		id: "checkout-trigger",
		label: "Checkout",
		actionInstanceId: "checkout:submit",
	});
	assert.ok(store.getState().pendingActionPlan);

	// Condition flips to satisfied, but user dismisses (close not complete).
	isGuest = false;
	store.getState().closeInteractionSurface();

	assert.equal(store.getState().pendingActionPlan, null, "plan cleared");
	assert.deepEqual(
		navigations,
		[],
		"target NOT executed because close is strict-clear (cancel intent)",
	);
});

test("closing prereq surface without progress clears pendingActionPlan and does not execute target", () => {
	const { store, navigations } = createTriggerChainStore(false, () => true);

	store.getState().executeInteractionTriggerSlot({
		id: "checkout-trigger",
		label: "Checkout",
		actionInstanceId: "checkout:submit",
	});
	assert.ok(store.getState().pendingActionPlan);

	// User closes the dialog without signing in — condition unchanged.
	store.getState().closeInteractionSurface();

	assert.equal(store.getState().pendingActionPlan, null);
	assert.deepEqual(
		navigations,
		[],
		"target action not executed because user cancelled",
	);
});

test("trigger execution with no policies executes the target action immediately and leaves no pending plan", () => {
	const { store, navigations } = createTriggerChainStore(false, () => false);

	const result = store.getState().executeInteractionTriggerSlot({
		id: "checkout-trigger",
		label: "Checkout",
		actionInstanceId: "checkout:submit",
	});

	assert.equal(result.status, "executed");
	assert.deepEqual(navigations, ["/checkout/done"]);
	assert.equal(store.getState().pendingActionPlan, null);
});

test("multi-step chain: sign-in then create-company then checkout target executes in sequence", () => {
	const navigations: string[] = [];
	let isGuest = true;
	let hasCompany = false;
	const store = createPhotonStore({
		initialDocument: createDocument("multi-step", "block-multi"),
		initialResources: {},
		initialPageSettings: {},
		initialSite: { settings: {}, regions: {} },
		registry: createPhotonRegistry([]),
		linkComponent: () => null,
		navigate: (href) => {
			navigations.push(href);
		},
		interactionSurfaces: [
			...authSurfaceDefinitions,
			{
				id: "company.dialog",
				label: "Company creation",
				kind: "dialog",
				rendererKey: "company.dialog",
				defaultInstances: [
					{
						id: "company:create",
						definitionId: "company.dialog",
						label: "Create company",
					},
				],
			},
		],
		interactionSurfaceRenderers: {
			"auth.dialog": () => null,
			"company.dialog": () => null,
		},
		interactionPolicies: [
			{
				id: "policy:auth-required",
				packageName: "auth-package",
				targetActionId: "checkout:submit",
				when: { type: "ref", conditionId: "auth.isGuest" },
				run: "auth:default",
				scope: "site",
			},
			{
				id: "policy:company-required",
				packageName: "company-package",
				targetActionId: "checkout:submit",
				when: { type: "ref", conditionId: "company.hasNoCompany" },
				run: "company:create",
				scope: "site",
			},
		],
		conditionEvaluators: {
			"auth.isGuest": () => isGuest,
			"company.hasNoCompany": () => !hasCompany,
		},
		interactionActions: [
			{
				id: "checkout:submit-action",
				label: "Submit checkout",
				defaultInstances: [
					{
						id: "checkout:submit",
						definitionId: "checkout:submit-action",
						label: "Submit checkout",
						presentation: { type: "link", href: "/checkout/done" },
					},
				],
			},
		],
		isAdmin: true,
	});

	// Step 1: clicking checkout opens the first prereq (sign-in dialog).
	store.getState().executeInteractionTriggerSlot({
		id: "checkout-trigger",
		label: "Checkout",
		actionInstanceId: "checkout:submit",
	});
	assert.equal(
		store.getState().activeInteractionSurface?.instance.id,
		"auth:default",
		"first prereq surface (sign-in) opened",
	);
	assert.equal(
		store.getState().pendingActionPlan?.previousStepCount,
		2,
		"plan tracks two outstanding prereqs",
	);
	assert.deepEqual(navigations, [], "target action not yet executed");

	// User signs in successfully → completeInteractionSurface; runtime
	// re-evaluates plan (now only company-required remains) and opens next prereq.
	isGuest = false;
	store.getState().completeInteractionSurface();
	assert.equal(
		store.getState().activeInteractionSurface?.instance.id,
		"company:create",
		"second prereq surface (create company) opened automatically",
	);
	assert.equal(
		store.getState().pendingActionPlan?.previousStepCount,
		1,
		"plan now tracks one remaining prereq",
	);
	assert.deepEqual(navigations, [], "target action still not executed");

	// User creates company → completeInteractionSurface; plan empty → target runs.
	hasCompany = true;
	store.getState().completeInteractionSurface();
	assert.equal(
		store.getState().activeInteractionSurface,
		null,
		"final surface closed",
	);
	assert.equal(
		store.getState().pendingActionPlan,
		null,
		"pendingActionPlan cleared after target executed",
	);
	assert.deepEqual(
		navigations,
		["/checkout/done"],
		"target action executed via 2-step auto-continuation",
	);
});

test("multi-step chain: cancelling a middle prereq clears pendingActionPlan and stops the chain", () => {
	const navigations: string[] = [];
	let isGuest = true;
	const hasCompany = false;
	const store = createPhotonStore({
		initialDocument: createDocument("multi-step-cancel", "block-multi"),
		initialResources: {},
		initialPageSettings: {},
		initialSite: { settings: {}, regions: {} },
		registry: createPhotonRegistry([]),
		linkComponent: () => null,
		navigate: (href) => {
			navigations.push(href);
		},
		interactionSurfaces: [
			...authSurfaceDefinitions,
			{
				id: "company.dialog",
				label: "Company creation",
				kind: "dialog",
				rendererKey: "company.dialog",
				defaultInstances: [
					{
						id: "company:create",
						definitionId: "company.dialog",
						label: "Create company",
					},
				],
			},
		],
		interactionSurfaceRenderers: {
			"auth.dialog": () => null,
			"company.dialog": () => null,
		},
		interactionPolicies: [
			{
				id: "policy:auth-required",
				packageName: "auth-package",
				targetActionId: "checkout:submit",
				when: { type: "ref", conditionId: "auth.isGuest" },
				run: "auth:default",
				scope: "site",
			},
			{
				id: "policy:company-required",
				packageName: "company-package",
				targetActionId: "checkout:submit",
				when: { type: "ref", conditionId: "company.hasNoCompany" },
				run: "company:create",
				scope: "site",
			},
		],
		conditionEvaluators: {
			"auth.isGuest": () => isGuest,
			"company.hasNoCompany": () => !hasCompany,
		},
		interactionActions: [
			{
				id: "checkout:submit-action",
				label: "Submit checkout",
				defaultInstances: [
					{
						id: "checkout:submit",
						definitionId: "checkout:submit-action",
						label: "Submit checkout",
						presentation: { type: "link", href: "/checkout/done" },
					},
				],
			},
		],
		isAdmin: true,
	});

	store.getState().executeInteractionTriggerSlot({
		id: "checkout-trigger",
		label: "Checkout",
		actionInstanceId: "checkout:submit",
	});

	// User completes sign-in → second prereq opens.
	isGuest = false;
	store.getState().completeInteractionSurface();
	assert.equal(
		store.getState().activeInteractionSurface?.instance.id,
		"company:create",
	);

	// User cancels company creation (closes dialog without progress).
	store.getState().closeInteractionSurface();
	assert.equal(
		store.getState().pendingActionPlan,
		null,
		"chain stopped after middle-step cancellation",
	);
	assert.deepEqual(
		navigations,
		[],
		"target action not executed because chain was cancelled",
	);
});

test("completeInteractionSurface without pending plan is a no-op (does not error)", () => {
	const store = createStore();
	store.getState().completeInteractionSurface();
	assert.equal(store.getState().activeInteractionSurface, null);
	assert.equal(store.getState().pendingActionPlan, null);
});

test("selectInteractionInstance sets selectedInteractionInstanceId and clears on null", () => {
	const store = createStore();
	store.getState().selectInteractionInstance("auth:default");
	assert.equal(
		store.getState().selectedInteractionInstanceId,
		"auth:default",
		"instance id stored",
	);
	store.getState().selectInteractionInstance(null);
	assert.equal(
		store.getState().selectedInteractionInstanceId,
		null,
		"null clears the selection",
	);
});

test("selectInteractionInstance preserves reference when value did not change", () => {
	const store = createStore();
	store.getState().selectInteractionInstance("auth:default");
	const before = store.getState();
	store.getState().selectInteractionInstance("auth:default");
	assert.equal(
		store.getState(),
		before,
		"identical id leaves state reference unchanged",
	);
});

test("setFieldBinding writes a binding object to block.bindings and clears it on null", () => {
	const store = createStore();
	const findBlock = () => {
		const state = store.getState();
		state.selectBlock("block-a");
		return getPhotonSelectedBlock(store.getState());
	};

	store.getState().setFieldBinding("block-a", "label", {
		source: "site-data",
		path: "brand.name",
	});
	let block = findBlock();
	assert.ok(block);
	assert.deepEqual(block.bindings?.label, {
		source: "site-data",
		path: "brand.name",
	});

	store.getState().setFieldBinding("block-a", "label", null);
	block = findBlock();
	assert.equal(
		block?.bindings,
		undefined,
		"bindings collection cleared when last binding removed",
	);
});

test("setFieldBinding is a no-op when binding is structurally identical", () => {
	const store = createStore();
	store.getState().setFieldBinding("block-a", "label", {
		source: "site-data",
		path: "brand.name",
	});
	const before = store.getState().document;
	store.getState().setFieldBinding("block-a", "label", {
		source: "site-data",
		path: "brand.name",
	});
	assert.equal(
		store.getState().document,
		before,
		"identical binding leaves document reference unchanged",
	);
});

test("updateDocumentMetadata updates routePatterns and bumps content revision", () => {
	const store = createStore();
	const initialRevision = store.getState().contentRevision;

	store.getState().updateDocumentMetadata({
		routePatterns: ["/:city", "/:city/products/:slug"],
	});
	assert.deepEqual(store.getState().document.routePatterns, [
		"/:city",
		"/:city/products/:slug",
	]);
	assert.equal(
		store.getState().contentRevision,
		initialRevision + 1,
		"content revision bumped",
	);

	store.getState().updateDocumentMetadata({ routePatterns: undefined });
	assert.equal(
		store.getState().document.routePatterns,
		undefined,
		"undefined clears patterns",
	);
});

test("updateDocumentMetadata is a no-op when nothing changes", () => {
	const store = createStore();
	store.getState().updateDocumentMetadata({
		routePatterns: ["/:city"],
	});
	const beforeDoc = store.getState().document;
	const beforeRevision = store.getState().contentRevision;
	store.getState().updateDocumentMetadata({
		routePatterns: ["/:city"],
	});
	assert.equal(
		store.getState().document,
		beforeDoc,
		"identical patterns leave document reference unchanged",
	);
	assert.equal(
		store.getState().contentRevision,
		beforeRevision,
		"no-op does not bump revision",
	);
});

test("setFieldBinding preserves other bindings on the same block", () => {
	const store = createStore();
	const findBlock = () => {
		store.getState().selectBlock("block-a");
		return getPhotonSelectedBlock(store.getState());
	};

	store.getState().setFieldBinding("block-a", "label", {
		source: "site-data",
		path: "brand.name",
	});
	store.getState().setFieldBinding("block-a", "subtitle", {
		source: "site-data",
		path: "brand.tagline",
	});
	store.getState().setFieldBinding("block-a", "label", null);
	const block = findBlock();
	assert.equal(block?.bindings?.label, undefined, "label binding removed");
	assert.deepEqual(
		block?.bindings?.subtitle,
		{ source: "site-data", path: "brand.tagline" },
		"subtitle binding preserved",
	);
});

test("trigger execution blocks when fail-closed policy condition is unresolved (missing evaluator result)", () => {
	const navigations: string[] = [];
	const store = createPhotonStore({
		initialDocument: createDocument("trigger-chain", "block-chain"),
		initialResources: {},
		initialPageSettings: {},
		initialSite: { settings: {}, regions: {} },
		registry: createPhotonRegistry([]),
		linkComponent: () => null,
		navigate: (href) => {
			navigations.push(href);
		},
		interactionSurfaces: authSurfaceDefinitions,
		interactionSurfaceRenderers: { "auth.dialog": () => null },
		interactionPolicies: [
			{
				id: "policy:fail-closed",
				packageName: "test",
				targetActionId: "checkout:submit",
				when: { type: "ref", conditionId: "auth.unknown" },
				run: "auth:default",
				scope: "site",
				securityMode: "fail-closed",
			},
		],
		conditionEvaluators: {
			"auth.unknown": () => null,
		},
		interactionActions: [
			{
				id: "checkout:submit-action",
				label: "Submit checkout",
				defaultInstances: [
					{
						id: "checkout:submit",
						definitionId: "checkout:submit-action",
						label: "Submit checkout",
						presentation: { type: "link", href: "/checkout/done" },
					},
				],
			},
		],
		isAdmin: true,
	});

	const result = store.getState().executeInteractionTriggerSlot({
		id: "checkout-trigger",
		label: "Checkout",
		actionInstanceId: "checkout:submit",
	});

	assert.equal(result.status, "blocked");
	assert.equal(result.reason, "missing-evaluator");
	assert.deepEqual(navigations, []);
	assert.equal(
		store.getState().activeInteractionSurface,
		null,
		"surface not opened when fail-closed plan is blocked",
	);
	assert.equal(store.getState().pendingActionPlan, null);
});
