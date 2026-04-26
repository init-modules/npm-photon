import assert from "node:assert/strict";
import test from "node:test";
import type { PhotonRouteContextField } from "../types";
import {
	matchRoutePattern,
	parseRoutePattern,
	resolveRouteContext,
} from "./route-context";

const slugField: PhotonRouteContextField = {
	path: "slug",
	label: "Slug",
	kind: "text",
	packageName: "test",
};

const cityField: PhotonRouteContextField = {
	path: "city",
	label: "City",
	kind: "text",
	defaultValue: "almaty",
	packageName: "test",
};

const pageField: PhotonRouteContextField = {
	path: "page",
	label: "Page",
	kind: "number",
	defaultValue: 1,
	packageName: "test",
};

test("parseRoutePattern extracts a single param name", () => {
	const { paramNames } = parseRoutePattern("/products/:slug");
	assert.deepEqual(paramNames, ["slug"]);
});

test("parseRoutePattern extracts multiple param names in order", () => {
	const { paramNames } = parseRoutePattern("/:city/products/:slug");
	assert.deepEqual(paramNames, ["city", "slug"]);
});

test("parseRoutePattern escapes regex meta characters in literals", () => {
	const { regex } = parseRoutePattern("/products.html/:id");
	assert.ok(regex.test("/products.html/42"));
	assert.ok(!regex.test("/productsXhtml/42"));
});

test("matchRoutePattern returns null for non-matching path", () => {
	assert.equal(matchRoutePattern("/products/:slug", "/services/coffee"), null);
});

test("matchRoutePattern extracts URL-decoded params", () => {
	const result = matchRoutePattern("/products/:slug", "/products/coffee%20bean");
	assert.deepEqual(result?.params, { slug: "coffee bean" });
});

test("matchRoutePattern accepts trailing slash", () => {
	const result = matchRoutePattern("/products/:slug", "/products/coffee/");
	assert.deepEqual(result?.params, { slug: "coffee" });
});

test("resolveRouteContext picks first matching pattern", () => {
	const fields = [slugField, cityField];
	const result = resolveRouteContext(
		fields,
		["/products/:slug", "/:city/products/:slug"],
		"/astana/products/coffee",
	);
	assert.equal(result.matchedPattern, "/:city/products/:slug");
	assert.equal(result.values.city, "astana");
	assert.equal(result.values.slug, "coffee");
});

test("resolveRouteContext applies defaults when first pattern matches without param", () => {
	const fields = [slugField, cityField];
	const result = resolveRouteContext(
		fields,
		["/products/:slug", "/:city/products/:slug"],
		"/products/coffee",
	);
	assert.equal(result.matchedPattern, "/products/:slug");
	assert.equal(result.values.city, "almaty");
	assert.equal(result.values.slug, "coffee");
});

test("resolveRouteContext applies defaults when no pattern matches", () => {
	const result = resolveRouteContext([cityField], ["/products/:slug"], "/about");
	assert.equal(result.matchedPattern, null);
	assert.equal(result.values.city, "almaty");
});

test("resolveRouteContext coerces kind:number from URL", () => {
	const result = resolveRouteContext([pageField], ["/blog/:page"], "/blog/42");
	assert.equal(result.values.page, 42);
	assert.equal(typeof result.values.page, "number");
});

test("resolveRouteContext respects urlParam alias", () => {
	const aliasField: PhotonRouteContextField = {
		path: "city",
		label: "City",
		kind: "text",
		urlParam: "region",
		defaultValue: "almaty",
		packageName: "test",
	};
	const result = resolveRouteContext(
		[aliasField],
		["/:region/products/:slug"],
		"/astana/products/coffee",
	);
	assert.equal(result.values.city, "astana");
});

test("resolveRouteContext omits field when no URL param and no default", () => {
	const result = resolveRouteContext([slugField], ["/about"], "/about");
	assert.equal(result.values.slug, undefined);
	assert.equal(Object.hasOwn(result.values, "slug"), false);
});

test("resolveRouteContext exposes fieldsByPath map", () => {
	const result = resolveRouteContext([slugField, cityField], [], "/");
	assert.equal(result.fieldsByPath.get("city")?.defaultValue, "almaty");
	assert.equal(result.fieldsByPath.get("slug")?.kind, "text");
});
