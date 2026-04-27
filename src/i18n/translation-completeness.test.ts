import assert from "node:assert/strict";
import test from "node:test";
import type {
	PhotonBlock,
	PhotonField,
	PhotonLocalizedDefaultValue,
} from "../types";
import {
	computePhotonTranslationCompleteness,
	type PhotonBlockSchemaMap,
} from "./translation-completeness";

const localizedValue = <T>(values: Record<string, T>): PhotonLocalizedDefaultValue<T> => ({
	__wbLocalizedDefault: true,
	values,
});

const cardField = (path: string, kind: PhotonField["kind"]): PhotonField => ({
	path,
	label: path,
	kind,
});

const schemas: PhotonBlockSchemaMap = {
	"card": {
		fields: [
			cardField("title", "text"),
			cardField("body", "textarea"),
			cardField("image", "image"),
			cardField("cta", "url"),
		],
	},
};

const block = (
	props: Record<string, unknown>,
	overrides?: Partial<PhotonBlock>,
): PhotonBlock => ({
	id: overrides?.id ?? "card-1",
	module: "demo",
	type: "card",
	props,
	...overrides,
});

test("100% when all localized fields filled in target locale", () => {
	const result = computePhotonTranslationCompleteness({
		blocks: [
			block({
				title: localizedValue({ en: "Hello", ru: "Привет" }),
				body: localizedValue({ en: "Welcome", ru: "Добро пожаловать" }),
				image: { url: "i.jpg" },
				cta: "/about",
			}),
		],
		schemas,
		locale: "ru",
	});

	// title + body are localized; image (image kind) and cta (url kind) are shared
	assert.equal(result.total, 2);
	assert.equal(result.filled, 2);
	assert.equal(result.percentage, 100);
});

test("50% when one of two localized fields missing", () => {
	const result = computePhotonTranslationCompleteness({
		blocks: [
			block({
				title: localizedValue({ en: "Hello", ru: "" }),
				body: localizedValue({ en: "Welcome", ru: "Добро пожаловать" }),
			}),
		],
		schemas,
		locale: "ru",
	});

	assert.equal(result.total, 2);
	assert.equal(result.filled, 1);
	assert.equal(result.percentage, 50);
	assert.equal(result.missingFields[0].fieldPath, "title");
});

test("treats whitespace-only string as empty", () => {
	const result = computePhotonTranslationCompleteness({
		blocks: [block({ title: "   ", body: "ok" })],
		schemas,
		locale: "ru",
	});
	assert.equal(result.total, 2);
	assert.equal(result.filled, 1);
});

test("instance override flips field to shared, removing it from total", () => {
	const result = computePhotonTranslationCompleteness({
		blocks: [
			block(
				{
					title: localizedValue({ en: "Brand", ru: "" }),
					body: localizedValue({ en: "Welcome", ru: "Привет" }),
				},
				{ localization: { title: "shared" } },
			),
		],
		schemas,
		locale: "ru",
	});
	assert.equal(result.total, 1);
	assert.equal(result.filled, 1);
	assert.equal(result.percentage, 100);
});

test("treatCopiedAsMissing flags identical-to-reference values", () => {
	const result = computePhotonTranslationCompleteness({
		blocks: [
			block({
				title: localizedValue({ en: "Hello", ru: "Hello" }),
				body: localizedValue({ en: "Hi", ru: "Привет" }),
			}),
		],
		schemas,
		locale: "ru",
		referenceLocale: "en",
	});
	assert.equal(result.total, 2);
	assert.equal(result.filled, 1);
	assert.equal(result.missingFields[0].fieldPath, "title");
});

test("instance override 'localized' opts out of copied-untranslated detection", () => {
	const result = computePhotonTranslationCompleteness({
		blocks: [
			block(
				{
					title: localizedValue({ en: "Photon", ru: "Photon" }),
					body: localizedValue({ en: "ok", ru: "ок" }),
				},
				{ localization: { title: "localized" } },
			),
		],
		schemas,
		locale: "ru",
		referenceLocale: "en",
	});
	assert.equal(result.total, 2);
	assert.equal(result.filled, 2);
	assert.equal(result.percentage, 100);
});

test("nested area blocks are traversed", () => {
	const child: PhotonBlock = block(
		{ title: localizedValue({ en: "Child", ru: "" }), body: "ok" },
		{ id: "child-1" },
	);
	const parent: PhotonBlock = block(
		{ title: "outer-en", body: "ok" },
		{
			id: "parent",
			areas: [{ id: "main", blocks: [child] }],
		},
	);
	const result = computePhotonTranslationCompleteness({
		blocks: [parent],
		schemas,
		locale: "ru",
	});
	assert.equal(result.total, 4);
	assert.equal(
		result.missingFields.find((f) => f.blockId === "child-1")?.fieldPath,
		"title",
	);
});

test("returns 100% when there are no localized fields", () => {
	const result = computePhotonTranslationCompleteness({
		blocks: [block({ image: { url: "i.jpg" } })],
		schemas: {
			card: {
				fields: [cardField("image", "image")],
			},
		},
		locale: "ru",
	});
	assert.equal(result.total, 0);
	assert.equal(result.percentage, 100);
});

test("blocks of unknown type are skipped without throwing", () => {
	const result = computePhotonTranslationCompleteness({
		blocks: [{ id: "x", module: "?", type: "mystery", props: {} }],
		schemas,
		locale: "ru",
	});
	assert.equal(result.total, 0);
	assert.equal(result.percentage, 100);
});
