import assert from "node:assert/strict";
import test from "node:test";
import {
	mergePhotonStudioUrlState,
	normalizePhotonStudioSurfaceMode,
	parsePhotonStudioUrlState,
	writePhotonStudioUrlState,
} from "./studio-url-state";

test("studio URL state parses builder mode, interactions surface and selected entities", () => {
	const state = parsePhotonStudioUrlState(
		"?mode=builder&builderSurface=surfaces&interactionTab=guards&surface=auth%3Adefault&toast=toast%3Asaved&action=auth%3Asign-in&guard=auth%3Arequired&scenario=guest&block=header&trigger=site-header.auth&paletteTab=library&library=component%3Ahero",
	);

	assert.deepEqual(state, {
		mode: "builder",
		builderSurface: "interactions",
		interactionTab: "guards",
		surface: "auth:default",
		toast: "toast:saved",
		action: "auth:sign-in",
		guard: "auth:required",
		scenario: "guest",
		block: "header",
		trigger: "site-header.auth",
		paletteTab: "library",
		library: "component:hero",
	});
});

test("studio URL state writes known keys without removing host-owned params", () => {
	const url = new URL("https://example.test/site?locale=ru&mode=content");

	const next = writePhotonStudioUrlState(url.searchParams, {
		mode: "builder",
		builderSurface: "interactions",
		interactionTab: "actions",
		action: "auth:sign-in",
		guard: "auth:required",
		scenario: "guest",
		surface: "search:site",
	});

	assert.equal(next.get("locale"), "ru");
	assert.equal(next.get("mode"), "builder");
	assert.equal(next.get("builderSurface"), "interactions");
	assert.equal(next.get("interactionTab"), "actions");
	assert.equal(next.get("action"), "auth:sign-in");
	assert.equal(next.get("guard"), "auth:required");
	assert.equal(next.get("scenario"), "guest");
	assert.equal(next.get("surface"), "search:site");
});

test("studio URL state can clear transient selections", () => {
	const url = new URL(
		"https://example.test/site?mode=builder&builderSurface=interactions&surface=auth&toast=saved&action=auth&guard=required&scenario=guest&library=item",
	);

	const next = writePhotonStudioUrlState(url.searchParams, {
		surface: null,
		toast: null,
		action: null,
		guard: null,
		scenario: null,
		library: null,
	});

	assert.equal(next.get("mode"), "builder");
	assert.equal(next.get("builderSurface"), "interactions");
	assert.equal(next.has("surface"), false);
	assert.equal(next.has("toast"), false);
	assert.equal(next.has("action"), false);
	assert.equal(next.has("guard"), false);
	assert.equal(next.has("scenario"), false);
	assert.equal(next.has("library"), false);
});

test("studio URL state merge skips undefined values but applies null clears", () => {
	const next = mergePhotonStudioUrlState(
		"?mode=builder&builderSurface=interactions&block=hero",
		{
			mode: undefined,
			block: null,
		},
	);

	assert.equal(next.get("mode"), "builder");
	assert.equal(next.get("builderSurface"), "interactions");
	assert.equal(next.has("block"), false);
});

test("studio surface mode normalizer keeps legacy surfaces as an alias", () => {
	assert.equal(normalizePhotonStudioSurfaceMode("canvas"), "canvas");
	assert.equal(normalizePhotonStudioSurfaceMode("settings"), "settings");
	assert.equal(normalizePhotonStudioSurfaceMode("interactions"), "interactions");
	assert.equal(normalizePhotonStudioSurfaceMode("surfaces"), "interactions");
	assert.equal(normalizePhotonStudioSurfaceMode("unknown"), undefined);
});
