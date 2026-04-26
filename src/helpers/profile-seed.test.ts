import assert from "node:assert/strict";
import test from "node:test";
import type {
	PhotonInteractionSurfaceDefinition,
} from "../types";
import {
	collectPhotonProfileSeedSiteSettings,
	mergePhotonProfileSeedIntoSiteSettings,
} from "./profile-seed";

const surfaceWithDefaults: PhotonInteractionSurfaceDefinition = {
	id: "auth.dialog",
	label: "Auth dialog",
	kind: "dialog",
	rendererKey: "auth.dialog",
	defaultInstances: [
		{
			id: "auth:default",
			definitionId: "auth.dialog",
			label: "Default sign-in",
			props: { title: "Sign in", description: "Sign in to continue." },
		},
		{
			id: "auth:no-props",
			definitionId: "auth.dialog",
			label: "No props",
		},
	],
};

const surfaceWithoutDefaults: PhotonInteractionSurfaceDefinition = {
	id: "support.dialog",
	label: "Support dialog",
	kind: "dialog",
	rendererKey: "support.dialog",
};

test("collectPhotonProfileSeedSiteSettings returns null for empty input", () => {
	assert.equal(
		collectPhotonProfileSeedSiteSettings({}),
		null,
		"no surfaces → no seed",
	);
	assert.equal(
		collectPhotonProfileSeedSiteSettings({ interactionSurfaces: [] }),
		null,
		"empty surfaces array → no seed",
	);
});

test("collectPhotonProfileSeedSiteSettings emits surface instances + canvas stage overrides", () => {
	const seed = collectPhotonProfileSeedSiteSettings({
		interactionSurfaces: [surfaceWithDefaults],
	});
	assert.ok(seed, "seed must be non-null when surfaces have default instances");
	assert.deepEqual(seed.interactionSurfaces?.instances?.["auth:default"], {
		id: "auth:default",
		definitionId: "auth.dialog",
		label: "Default sign-in",
		props: { title: "Sign in", description: "Sign in to continue." },
	});
	assert.deepEqual(
		seed.interactions?.canvasStageOverrides?.["auth:default"],
		{
			default: { title: "Sign in", description: "Sign in to continue." },
		},
		"canvas stage overrides snapshot the instance props at the default scenario",
	);
	assert.ok(
		!seed.interactions?.canvasStageOverrides?.["auth:no-props"],
		"instances without props produce no canvas stage overrides entry",
	);
});

test("collectPhotonProfileSeedSiteSettings skips surfaces without default instances", () => {
	const seed = collectPhotonProfileSeedSiteSettings({
		interactionSurfaces: [surfaceWithoutDefaults],
	});
	assert.equal(
		seed,
		null,
		"surfaces without defaults produce no seed payload",
	);
});

test("mergePhotonProfileSeedIntoSiteSettings preserves caller overrides over seed defaults", () => {
	const existing = {
		interactionSurfaces: {
			instances: {
				"auth:default": {
					id: "auth:default",
					definitionId: "auth.dialog",
					label: "Custom sign-in",
					props: { title: "Welcome back" },
				},
			},
		},
	};

	const merged = mergePhotonProfileSeedIntoSiteSettings(existing, {
		interactionSurfaces: [surfaceWithDefaults],
	});

	assert.equal(
		(merged.interactionSurfaces as { instances: Record<string, { label: string }> })
			.instances["auth:default"].label,
		"Custom sign-in",
		"existing instance label survives the merge",
	);
});

test("mergePhotonProfileSeedIntoSiteSettings is a no-op when no seed payload", () => {
	const existing = { foo: "bar" };
	const merged = mergePhotonProfileSeedIntoSiteSettings(existing, {});
	assert.equal(merged, existing, "no-op returns the same reference");
});
