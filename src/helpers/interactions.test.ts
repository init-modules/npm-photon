import assert from "node:assert/strict";
import test from "node:test";
import {
	evaluatePhotonInteractionGuards,
	executePhotonInteractionTriggerSlot,
	resolvePhotonInteractionActionCatalog,
	resolvePhotonInteractionSlotAction,
	resolvePhotonInteractionSlotGuards,
} from "./interactions";
import type {
	PhotonInteractionActionDefinition,
	PhotonInteractionGuardDefinition,
	PhotonInteractionGuardEvaluatorMap,
	PhotonInteractionSurfaceDefinition,
	PhotonInteractionTriggerSlot,
} from "../types";

const actionDefinitions: PhotonInteractionActionDefinition[] = [
	{
		id: "auth.sign-in",
		label: "Auth sign in",
		defaultInstances: [
			{
				id: "auth:sign-in",
				definitionId: "auth.sign-in",
				label: "Default sign in",
				props: {
					title: "Sign in",
				},
				presentation: {
					type: "surface",
					intent: "auth:sign-in",
					overrides: {
						title: "Sign in",
					},
				},
			},
		],
	},
];

const guardDefinitions: PhotonInteractionGuardDefinition[] = [
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
						description: "Sign in to continue",
					},
				},
			},
			{
				id: "auth:disabled",
				definitionId: "auth.required",
				label: "Disabled auth",
				enabled: false,
			},
		],
	},
];

test("interaction action catalog merges defaults, persisted instances and trigger overrides", () => {
	const slot: PhotonInteractionTriggerSlot = {
		id: "site-header.auth",
		label: "Auth",
		actionInstanceId: "auth:sign-in",
	};
	const catalog = resolvePhotonInteractionActionCatalog({
		actions: actionDefinitions,
		siteSettings: {
			interactions: {
				actionInstances: {
					"auth:sign-in": {
						id: "auth:sign-in",
						definitionId: "auth.sign-in",
						label: "Edited sign in",
						props: {
							title: "Edited title",
						},
						presentation: {
							type: "surface",
							intent: "auth:sign-in",
							overrides: {
								title: "Edited title",
							},
						},
					},
				},
				triggerBindings: {
					"site-header.auth": {
						slotId: "site-header.auth",
						actionInstanceId: "auth:sign-in",
						overrides: {
							description: "Publish requires an account",
						},
					},
				},
			},
		},
	});
	const action = resolvePhotonInteractionSlotAction(slot, catalog);

	assert.equal(catalog.actionInstances["auth:sign-in"].label, "Edited sign in");
	assert.deepEqual(action, {
		type: "surface",
		intent: "auth:sign-in",
		overrides: {
			title: "Edited title",
			description: "Publish requires an account",
		},
	});
});

test("interaction guards resolve enabled chain entries from trigger bindings", () => {
	const slot: PhotonInteractionTriggerSlot = {
		id: "checkout.submit",
		label: "Checkout",
		guardInstanceIds: ["auth:disabled"],
	};
	const catalog = resolvePhotonInteractionActionCatalog({
		actions: actionDefinitions,
		guards: guardDefinitions,
		siteSettings: {
			interactions: {
				triggerBindings: {
					"checkout.submit": {
						slotId: "checkout.submit",
						guardInstanceIds: ["auth:required", "auth:disabled"],
					},
				},
			},
		},
	});
	const guards = resolvePhotonInteractionSlotGuards(slot, catalog);

	assert.deepEqual(
		guards.map((guard) => guard.id),
		["auth:required"],
	);
	assert.deepEqual(guards[0]?.action, {
		type: "surface",
		intent: "auth:sign-in",
		overrides: {
			description: "Sign in to continue",
		},
	});
});

test("interaction catalog exposes compatibility actions for non-toast surfaces", () => {
	const surfaces: PhotonInteractionSurfaceDefinition[] = [
		{
			id: "search.dialog",
			label: "Search",
			kind: "dialog",
			rendererKey: "search.dialog",
			defaultInstances: [
				{
					id: "search:site",
					definitionId: "search.dialog",
					label: "Site search",
					props: {
						placeholder: "Search",
					},
				},
			],
		},
		{
			id: "notice.toast",
			label: "Notice",
			kind: "toast",
			rendererKey: "notice.toast",
		},
	];
	const catalog = resolvePhotonInteractionActionCatalog({
		surfaces,
		siteSettings: {
			interactionSurfaces: {
				instances: {
					"search:blog": {
						id: "search:blog",
						definitionId: "search.dialog",
						label: "Blog search",
						props: {
							placeholder: "Search articles",
						},
					},
				},
			},
		},
	});

	assert.ok(catalog.actionsById.has("search.dialog.action"));
	assert.equal(catalog.actionsById.has("notice.toast.action"), false);
	const actionInstance = catalog.actionInstances["search:site"];
	assert.equal(actionInstance?.presentation.type, "surface");
	assert.equal(
		actionInstance?.presentation.type === "surface"
			? actionInstance.presentation.surfaceInstanceId
			: null,
		"search:site",
	);
	assert.equal(catalog.actionInstances["search:blog"]?.label, "Blog search");
	assert.deepEqual(catalog.actionInstances["search:blog"]?.presentation, {
		type: "surface",
		surfaceInstanceId: "search:blog",
	});
});

test("disabled trigger binding suppresses slot action", () => {
	const catalog = resolvePhotonInteractionActionCatalog({
		actions: actionDefinitions,
		siteSettings: {
			interactions: {
				triggerBindings: {
					"site-header.auth": {
						slotId: "site-header.auth",
						enabled: false,
					},
				},
			},
		},
	});

	assert.equal(
		resolvePhotonInteractionSlotAction(
			{
				id: "site-header.auth",
				label: "Auth",
				actionInstanceId: "auth:sign-in",
			},
			catalog,
		),
		null,
	);
});

test("interaction guard execution allows the main action when evaluators pass", () => {
	const slot: PhotonInteractionTriggerSlot = {
		id: "checkout.submit",
		label: "Checkout",
		action: {
			type: "link",
			href: "/checkout",
		},
		guardInstanceIds: ["auth:required"],
	};
	const catalog = resolvePhotonInteractionActionCatalog({
		guards: guardDefinitions,
	});
	const navigations: string[] = [];
	const context = {
		document: {
			id: "doc",
			name: "Doc",
			route: "/",
			updatedAt: "2026-01-01T00:00:00.000Z",
			blocks: [],
		},
		resources: {},
		pageSettings: {},
		site: {
			settings: {},
			regions: {},
		},
		mode: "preview" as const,
		isAdmin: false,
	};

	const result = executePhotonInteractionTriggerSlot({
			slot,
			catalog,
			evaluators: {
				"auth.required": () => true,
			},
			context,
			handlers: {
				openInteractionSurface: () => false,
				showInteractionToast: () => false,
				navigate: (href) => {
					navigations.push(href);
				},
			},
		});

	assert.equal(result.status, "executed");
	assert.equal(result.executed, true);
	assert.deepEqual(navigations, ["/checkout"]);

	const evaluation = evaluatePhotonInteractionGuards({
		guards: resolvePhotonInteractionSlotGuards(slot, catalog),
		evaluators: {
			"auth.required": () => true,
		},
		context: {
			...context,
			slot,
			action: slot.action ?? null,
			catalog,
		},
	});

	assert.deepEqual(evaluation, {
		status: "allowed",
	});
});

test("interaction guard execution blocks by default when an explicit evaluator is missing", () => {
	const slot: PhotonInteractionTriggerSlot = {
		id: "checkout.submit",
		label: "Checkout",
		action: {
			type: "link",
			href: "/checkout",
		},
		guardInstanceIds: ["auth:required"],
	};
	const catalog = resolvePhotonInteractionActionCatalog({
		guards: guardDefinitions,
	});
	const navigations: string[] = [];
	const context = {
		document: {
			id: "doc",
			name: "Doc",
			route: "/",
			updatedAt: "2026-01-01T00:00:00.000Z",
			blocks: [],
		},
		resources: {},
		pageSettings: {},
		site: {
			settings: {},
			regions: {},
		},
		mode: "preview" as const,
		isAdmin: false,
	};
	const result = executePhotonInteractionTriggerSlot({
		slot,
		catalog,
		context,
		handlers: {
			openInteractionSurface: () => false,
			showInteractionToast: () => false,
			navigate: (href) => {
				navigations.push(href);
			},
		},
	});

	assert.equal(result.status, "missing-evaluator");
	assert.equal(result.executed, false);
	assert.deepEqual(navigations, []);
	assert.deepEqual(
		evaluatePhotonInteractionGuards({
			guards: resolvePhotonInteractionSlotGuards(slot, catalog),
			context: {
				...context,
				slot,
				action: slot.action ?? null,
				catalog,
			},
		}),
		{
			status: "blocked",
			reason: "missing-evaluator",
			action: {
				type: "surface",
				intent: "auth:sign-in",
				overrides: {
					description: "Sign in to continue",
				},
			},
		},
	);
});

test("interaction guard execution can explicitly allow a missing evaluator", () => {
	const slot: PhotonInteractionTriggerSlot = {
		id: "checkout.submit",
		label: "Checkout",
		action: {
			type: "link",
			href: "/checkout",
		},
		guardInstanceIds: ["auth:required"],
	};
	const catalog = resolvePhotonInteractionActionCatalog({
		guards: [
			{
				...guardDefinitions[0],
				missingEvaluatorPolicy: "allow",
			},
		],
	});
	const navigations: string[] = [];
	const result = executePhotonInteractionTriggerSlot({
		slot,
		catalog,
		context: {
			document: {
				id: "doc",
				name: "Doc",
				route: "/",
				updatedAt: "2026-01-01T00:00:00.000Z",
				blocks: [],
			},
			resources: {},
			pageSettings: {},
			site: {
				settings: {},
				regions: {},
			},
			mode: "preview",
			isAdmin: false,
		},
		handlers: {
			openInteractionSurface: () => false,
			showInteractionToast: () => false,
			navigate: (href) => {
				navigations.push(href);
			},
		},
	});

	assert.equal(result.status, "executed");
	assert.equal(result.executed, true);
	assert.deepEqual(navigations, ["/checkout"]);
});

test("interaction guard execution runs the guard action when blocked", () => {
	const slot: PhotonInteractionTriggerSlot = {
		id: "checkout.submit",
		label: "Checkout",
		action: {
			type: "link",
			href: "/checkout",
		},
		guardInstanceIds: ["auth:required"],
	};
	const catalog = resolvePhotonInteractionActionCatalog({
		guards: guardDefinitions,
	});
	const opened: unknown[] = [];
	const evaluators: PhotonInteractionGuardEvaluatorMap = {
		"auth.required": () => false,
	};

	const executed = executePhotonInteractionTriggerSlot({
		slot,
		catalog,
		evaluators,
		context: {
			document: {
				id: "doc",
				name: "Doc",
				route: "/",
				updatedAt: "2026-01-01T00:00:00.000Z",
				blocks: [],
			},
			resources: {},
			pageSettings: {},
			site: {
				settings: {},
				regions: {},
			},
			mode: "preview",
			isAdmin: false,
		},
		handlers: {
			openInteractionSurface: (trigger) => {
				opened.push(trigger);
				return true;
			},
			showInteractionToast: () => false,
		},
	});

	assert.equal(executed.status, "blocked");
	assert.equal(executed.executed, true);
	assert.deepEqual(opened, [
		{
			type: "surface",
			intent: "auth:sign-in",
			overrides: {
				description: "Sign in to continue",
			},
		},
	]);
});

test("blocked guard without an action uses the main surface fallback href", () => {
	const slot: PhotonInteractionTriggerSlot = {
		id: "publish.article",
		label: "Publish",
		action: {
			type: "surface",
			intent: "article:publish",
			fallbackHref: "/login",
		},
		guardInstanceIds: ["auth:missing-action"],
	};
	const catalog = resolvePhotonInteractionActionCatalog({
		guards: [
			{
				id: "auth.required",
				label: "Auth required",
				defaultInstances: [
					{
						id: "auth:missing-action",
						definitionId: "auth.required",
						label: "Require account",
					},
				],
			},
		],
	});
	const navigations: string[] = [];

	const executed = executePhotonInteractionTriggerSlot({
		slot,
		catalog,
		evaluators: {
			"auth.required": () => ({ status: "blocked" }),
		},
		context: {
			document: {
				id: "doc",
				name: "Doc",
				route: "/",
				updatedAt: "2026-01-01T00:00:00.000Z",
				blocks: [],
			},
			resources: {},
			pageSettings: {},
			site: {
				settings: {},
				regions: {},
			},
			mode: "preview",
			isAdmin: false,
		},
		handlers: {
			openInteractionSurface: () => false,
			showInteractionToast: () => false,
			navigate: (href) => {
				navigations.push(href);
			},
		},
	});

	assert.equal(executed.status, "blocked");
	assert.equal(executed.executed, true);
	assert.deepEqual(navigations, ["/login"]);
});
