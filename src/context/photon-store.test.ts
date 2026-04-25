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
