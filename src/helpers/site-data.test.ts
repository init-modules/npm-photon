import assert from "node:assert/strict";
import test from "node:test";
import type { PhotonSiteDataSchema, PhotonSiteSettings } from "../types";
import {
	extractPhotonSiteDataBindings,
	localeSitePath,
	parsePhotonSiteDataBindingExpression,
	resolvePhotonSiteData,
	resolvePhotonSiteDataBinding,
	sitePath,
} from "./site-data";

const brandSchema: PhotonSiteDataSchema = {
	id: "brand",
	packageName: "test",
	label: "Brand",
	fields: [
		{ path: "name", label: "Name", kind: "text", defaultValue: "Photon" },
		{ path: "tagline", label: "Tagline", kind: "text", defaultValue: "" },
	],
};

const contactsSchema: PhotonSiteDataSchema = {
	id: "contacts",
	packageName: "test",
	label: "Contacts",
	fields: [
		{ path: "phone", label: "Phone", kind: "phone", defaultValue: "+1-000" },
	],
};

test("sitePath returns nested data.<schema>.<field> path", () => {
	assert.equal(sitePath("brand", "name"), "data.brand.name");
});

test("resolvePhotonSiteData returns defaults when no overrides", () => {
	const resolved = resolvePhotonSiteData([brandSchema, contactsSchema], {});
	assert.equal(resolved.values.brand?.name, "Photon");
	assert.equal(resolved.values.contacts?.phone, "+1-000");
});

test("resolvePhotonSiteData applies site overrides", () => {
	const settings: PhotonSiteSettings = {
		data: { brand: { name: "MyBrand" } },
	};
	const resolved = resolvePhotonSiteData([brandSchema], settings);
	assert.equal(resolved.values.brand?.name, "MyBrand");
});

test("resolvePhotonSiteData preserves defaults for fields without overrides", () => {
	const settings: PhotonSiteSettings = {
		data: { brand: { name: "MyBrand" } },
	};
	const resolved = resolvePhotonSiteData([brandSchema], settings);
	assert.equal(resolved.values.brand?.tagline, "");
});

test("resolvePhotonSiteDataBinding substitutes single binding", () => {
	const resolved = resolvePhotonSiteData([brandSchema], {});
	assert.equal(
		resolvePhotonSiteDataBinding("Hello {{ brand.name }}", resolved),
		"Hello Photon",
	);
});

test("resolvePhotonSiteDataBinding substitutes multiple bindings", () => {
	const settings: PhotonSiteSettings = {
		data: { brand: { name: "X" }, contacts: { phone: "+9-999" } },
	};
	const resolved = resolvePhotonSiteData(
		[brandSchema, contactsSchema],
		settings,
	);
	assert.equal(
		resolvePhotonSiteDataBinding(
			"{{ brand.name }} call {{ contacts.phone }}",
			resolved,
		),
		"X call +9-999",
	);
});

test("resolvePhotonSiteDataBinding returns empty for missing path by default", () => {
	const resolved = resolvePhotonSiteData([brandSchema], {});
	assert.equal(
		resolvePhotonSiteDataBinding("[{{ brand.unknown }}]", resolved),
		"[]",
	);
});

test("resolvePhotonSiteDataBinding uses fallback when missing", () => {
	const resolved = resolvePhotonSiteData([brandSchema], {});
	assert.equal(
		resolvePhotonSiteDataBinding("[{{ brand.unknown }}]", resolved, {
			fallback: "n/a",
		}),
		"[n/a]",
	);
});

test("resolvePhotonSiteDataBinding leaves invalid {{ x }} (no dot) literal", () => {
	const resolved = resolvePhotonSiteData([brandSchema], {});
	assert.equal(
		resolvePhotonSiteDataBinding("Hello {{ name }}", resolved),
		"Hello {{ name }}",
	);
});

test("extractPhotonSiteDataBindings returns parsed bindings from text", () => {
	const result = extractPhotonSiteDataBindings(
		"Hi {{ brand.name }} — call {{ contacts.phone }} now",
	);
	assert.deepEqual(result, [
		{ schemaId: "brand", fieldPath: "name" },
		{ schemaId: "contacts", fieldPath: "phone" },
	]);
});

test("parsePhotonSiteDataBindingExpression returns null for invalid", () => {
	assert.equal(parsePhotonSiteDataBindingExpression("brand"), null);
	assert.equal(parsePhotonSiteDataBindingExpression(".name"), null);
	assert.equal(parsePhotonSiteDataBindingExpression("brand."), null);
});

test("parsePhotonSiteDataBindingExpression handles nested fieldPath", () => {
	assert.deepEqual(
		parsePhotonSiteDataBindingExpression("brand.contact.phone"),
		{ schemaId: "brand", fieldPath: "contact.phone" },
	);
});

test("resolvePhotonSiteDataBinding resolves {{ route.X }} from routeContext", () => {
	const resolved = resolvePhotonSiteData([brandSchema], {});
	const text = resolvePhotonSiteDataBinding(
		"Кофе {{ route.slug }} в {{ route.city }}",
		resolved,
		{ routeContext: { slug: "coffee", city: "astana" } },
	);
	assert.equal(text, "Кофе coffee в astana");
});

test("resolvePhotonSiteDataBinding falls back when route field missing", () => {
	const resolved = resolvePhotonSiteData([brandSchema], {});
	const text = resolvePhotonSiteDataBinding(
		"Hello {{ route.slug }}",
		resolved,
		{ routeContext: {}, fallback: "—" },
	);
	assert.equal(text, "Hello —");
});

test("resolvePhotonSiteDataBinding mixes site data and route bindings", () => {
	const resolved = resolvePhotonSiteData([brandSchema], {});
	const text = resolvePhotonSiteDataBinding(
		"{{ brand.name }} · {{ route.city }}",
		resolved,
		{ routeContext: { city: "almaty" } },
	);
	assert.equal(text, "Photon · almaty");
});

test("localeSitePath returns dataByLocale.<locale>.<schema>.<field>", () => {
	assert.equal(
		localeSitePath("ru", "brand", "name"),
		"dataByLocale.ru.brand.name",
	);
});

test("resolvePhotonSiteData applies locale override over site override", () => {
	const settings: PhotonSiteSettings = {
		data: { brand: { name: "Site Brand" } },
		dataByLocale: {
			ru: { brand: { name: "Сайт Бренд" } },
		},
	};
	const resolved = resolvePhotonSiteData([brandSchema], settings, {
		locale: "ru",
	});
	assert.equal(resolved.values.brand?.name, "Сайт Бренд");
});

test("resolvePhotonSiteData falls back to site override when locale layer empty", () => {
	const settings: PhotonSiteSettings = {
		data: { brand: { name: "Site Brand" } },
		dataByLocale: { ru: {} },
	};
	const resolved = resolvePhotonSiteData([brandSchema], settings, {
		locale: "ru",
	});
	assert.equal(resolved.values.brand?.name, "Site Brand");
});

test("resolvePhotonSiteData ignores locale layer when no current locale", () => {
	const settings: PhotonSiteSettings = {
		data: { brand: { name: "Site Brand" } },
		dataByLocale: { ru: { brand: { name: "Сайт Бренд" } } },
	};
	const resolved = resolvePhotonSiteData([brandSchema], settings);
	assert.equal(resolved.values.brand?.name, "Site Brand");
});

test("resolvePhotonSiteData locale layer falls through to default when site empty", () => {
	const settings: PhotonSiteSettings = {
		dataByLocale: { en: {} },
	};
	const resolved = resolvePhotonSiteData([brandSchema], settings, {
		locale: "en",
	});
	assert.equal(resolved.values.brand?.name, "Photon");
});
