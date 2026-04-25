import assert from "node:assert/strict";
import test from "node:test";
import {
	resolvePhotonInteractionSurfaceCatalog,
	resolvePhotonInteractionSurfaceRequest,
	resolvePhotonInteractionToastTemplate,
} from "./interaction-surfaces";
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
