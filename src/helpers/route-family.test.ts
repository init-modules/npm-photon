import assert from "node:assert/strict";
import test from "node:test";
import type { PhotonDocument, PhotonDocumentsMap } from "../types";
import { resolvePhotonDocumentForRoute } from "./route-family";

const make = (
	id: string,
	route: string,
	patterns?: string[],
): PhotonDocument => ({
	id,
	name: id,
	route,
	updatedAt: "2026-01-01T00:00:00.000Z",
	blocks: [],
	...(patterns ? { routePatterns: patterns } : {}),
});

test("resolvePhotonDocumentForRoute prefers exact route override over template pattern", () => {
	const documents: PhotonDocumentsMap = {
		template: make("template", "/", ["/:city"]),
		astana: make("astana", "/astana"),
	};
	const result = resolvePhotonDocumentForRoute("/astana", documents);
	assert.equal(result?.source, "exact");
	assert.equal(result?.document.id, "astana");
});

test("resolvePhotonDocumentForRoute falls back to template pattern when no exact match", () => {
	const documents: PhotonDocumentsMap = {
		template: make("template", "/", ["/:city/products/:slug"]),
	};
	const result = resolvePhotonDocumentForRoute(
		"/almaty/products/coffee",
		documents,
	);
	assert.equal(result?.source, "pattern");
	assert.equal(result?.document.id, "template");
	assert.equal(result?.matchedPattern, "/:city/products/:slug");
});

test("resolvePhotonDocumentForRoute returns null when no document matches", () => {
	const documents: PhotonDocumentsMap = {
		template: make("template", "/", ["/:city/products/:slug"]),
	};
	const result = resolvePhotonDocumentForRoute("/about", documents);
	assert.equal(result, null);
});

test("resolvePhotonDocumentForRoute picks the only document whose pattern actually matches", () => {
	const documents: PhotonDocumentsMap = {
		"product-template": make("product-template", "/", [
			"/:city/products/:slug",
		]),
		"city-template": make("city-template", "/", ["/:city"]),
	};
	const result = resolvePhotonDocumentForRoute("/almaty", documents);
	assert.equal(result?.source, "pattern");
	assert.equal(
		result?.document.id,
		"city-template",
		"only city-template's pattern matches a single-segment path",
	);
});

test("resolvePhotonDocumentForRoute exact match wins even when pattern document is also matched", () => {
	const documents: PhotonDocumentsMap = {
		template: make("template", "/", ["/:city"]),
		exactAlmaty: make("exactAlmaty", "/almaty"),
	};
	const result = resolvePhotonDocumentForRoute("/almaty", documents);
	assert.equal(result?.source, "exact");
	assert.equal(result?.document.id, "exactAlmaty");
});
