import assert from "node:assert/strict";
import test from "node:test";
import {
	resolvePhotonInteractionSurfaceCatalog,
	resolvePhotonInteractionSurfaceRequest,
	resolvePhotonInteractionToastTemplate,
} from "./interaction-surfaces";
import { readPhotonInteractionSettings, PHOTON_INTERACTIONS_SITE_SETTING_KEY } from "./interactions";
import { setValueAtPath } from "./path";
import type { PhotonInteractionSurfaceDefinition } from "../types";

const definitions: PhotonInteractionSurfaceDefinition[] = [
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
					description: "Default description",
				},
			},
		],
		defaultIntentBindings: [
			{
				intent: "auth:sign-in",
				surfaceInstanceId: "auth:default",
				overrides: {
					description: "Intent description",
				},
			},
		],
		defaultToastTemplates: [
			{
				id: "photon:notice",
				label: "Notice",
				status: "info",
				title: "Notice",
			},
		],
	},
];

test("interaction surface catalog resolves defaults, persisted settings and trigger overrides", () => {
	const catalog = resolvePhotonInteractionSurfaceCatalog({
		definitions,
		siteSettings: {
			interactionSurfaces: {
				instances: {
					"auth:default": {
						id: "auth:default",
						definitionId: "auth.dialog",
						label: "Edited auth",
						props: {
							title: "Edited sign in",
						},
					},
				},
			},
		},
	});
	const request = resolvePhotonInteractionSurfaceRequest(
		{
			intent: "auth:sign-in",
			overrides: {
				description: "Trigger description",
			},
		},
		catalog,
	);

	assert.equal(request?.instance.label, "Edited auth");
	assert.equal(request?.props.title, "Edited sign in");
	assert.equal(request?.props.description, "Trigger description");
});

test("interaction surface resolution returns null for missing or disabled instances", () => {
	const catalog = resolvePhotonInteractionSurfaceCatalog({
		definitions,
		siteSettings: {
			interactionSurfaces: {
				instances: {
					"auth:default": {
						id: "auth:default",
						definitionId: "auth.dialog",
						label: "Disabled auth",
						enabled: false,
					},
				},
			},
		},
	});

	assert.equal(
		resolvePhotonInteractionSurfaceRequest(
			{ intent: "auth:sign-in" },
			catalog,
		),
		null,
	);
});

test("toast template resolution merges editable template overrides", () => {
	const catalog = resolvePhotonInteractionSurfaceCatalog({
		definitions,
		siteSettings: {
			interactionSurfaces: {
				toastTemplates: {
					"photon:notice": {
						id: "photon:notice",
						label: "Edited notice",
						status: "success",
						title: "Saved",
					},
				},
			},
		},
	});
	const template = resolvePhotonInteractionToastTemplate(
		{
			templateId: "photon:notice",
			overrides: {
				description: "Everything is synced",
			},
		},
		catalog,
	);

	assert.equal(template?.status, "success");
	assert.equal(template?.title, "Saved");
	assert.equal(template?.description, "Everything is synced");
});

test("canvas stage overrides are stored per slot and per scenario without cross-contamination", () => {
	const slotId = "search-trigger";
	const initial: Record<string, Record<string, Record<string, unknown>>> = {};

	const writeOverride = (
		current: typeof initial,
		slot: string,
		scenario: string,
		path: string,
		value: unknown,
	) => ({
		...current,
		[slot]: {
			...(current[slot] ?? {}),
			[scenario]: setValueAtPath(current[slot]?.[scenario] ?? {}, path, value),
		},
	});

	const afterIdleEdit = writeOverride(initial, slotId, "idle", "placeholder", "Search…");
	const afterResultsEdit = writeOverride(afterIdleEdit, slotId, "results", "empty", "No results");

	assert.equal(afterResultsEdit[slotId]["idle"]["placeholder"], "Search…");
	assert.equal(afterResultsEdit[slotId]["results"]["empty"], "No results");
	assert.equal(afterResultsEdit[slotId]["idle"]["empty"], undefined, "idle must not inherit results edits");
	assert.equal(afterResultsEdit[slotId]["results"]["placeholder"], undefined, "results must not inherit idle edits");
});

test("canvas stage overrides live in canvasStageOverrides, not in triggerBindings", () => {
	const siteSettings = {
		[PHOTON_INTERACTIONS_SITE_SETTING_KEY]: {
			triggerBindings: {
				"search-trigger": {
					slotId: "search-trigger",
					actionInstanceId: "photon.search-site:default",
					overrides: { title: "Search the site" },
				},
			},
			canvasStageOverrides: {
				"search-trigger": {
					idle: { placeholder: "Idle placeholder" },
					results: { empty: "No matches" },
				},
			},
		},
	};

	const settings = readPhotonInteractionSettings(siteSettings);

	assert.equal(
		settings.triggerBindings?.["search-trigger"]?.overrides?.["title"],
		"Search the site",
		"published overrides remain in triggerBindings",
	);
	assert.equal(
		(settings.triggerBindings?.["search-trigger"] as Record<string, unknown>)?.["statesOverrides"],
		undefined,
		"statesOverrides must no longer exist on triggerBindings",
	);
	assert.equal(
		settings.canvasStageOverrides?.["search-trigger"]?.["idle"]?.["placeholder"],
		"Idle placeholder",
		"canvas stage idle overrides readable from canvasStageOverrides",
	);
	assert.equal(
		settings.canvasStageOverrides?.["search-trigger"]?.["results"]?.["empty"],
		"No matches",
		"canvas stage results overrides readable from canvasStageOverrides",
	);
});

test("canvas stage reset clears slot overrides without affecting other slots", () => {
	const canvasStageOverrides: Record<string, Record<string, Record<string, unknown>>> = {
		"search-trigger": { idle: { placeholder: "Custom" } },
		"auth-trigger": { guest: { label: "Login" } },
	};

	const { ["search-trigger"]: _removed, ...rest } = canvasStageOverrides;

	assert.equal(Object.keys(rest).length, 1, "only auth-trigger remains");
	assert.equal(rest["auth-trigger"]?.["guest"]?.["label"], "Login", "auth-trigger unaffected");
	assert.equal(rest["search-trigger"], undefined, "search-trigger cleared");
});
