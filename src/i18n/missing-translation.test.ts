import assert from "node:assert/strict";
import test from "node:test";
import type { PhotonBlock } from "../types";
import { findPhotonFieldMissingLocales } from "./missing-translation";

const localized = (values: Record<string, unknown>) => ({
	__wbLocalizedDefault: true,
	values,
});

const block = (
	props: Record<string, unknown>,
	overrides?: Record<string, "localized" | "shared">,
): PhotonBlock => ({
	id: "b1",
	module: "demo",
	type: "card",
	props,
	...(overrides ? { localization: overrides } : {}),
});

test("returns [] when field is shared", () => {
	const result = findPhotonFieldMissingLocales({
		block: block({ image: { url: "i.jpg" } }),
		fieldPath: "image",
		fieldKind: "image",
		locales: ["en", "ru", "de"],
	});
	assert.deepEqual(result, []);
});

test("flags locales with empty values", () => {
	const result = findPhotonFieldMissingLocales({
		block: block({
			title: localized({ en: "Hi", ru: "" }),
		}),
		fieldPath: "title",
		fieldKind: "text",
		locales: ["en", "ru", "de"],
	});
	assert.deepEqual(result, ["ru", "de"]);
});

test("flags whitespace-only as missing", () => {
	const result = findPhotonFieldMissingLocales({
		block: block({
			title: localized({ en: "Hi", ru: "   " }),
		}),
		fieldPath: "title",
		fieldKind: "text",
		locales: ["en", "ru"],
	});
	assert.deepEqual(result, ["ru"]);
});

test("flags copied-from-reference values when treatCopiedAsMissing on", () => {
	const result = findPhotonFieldMissingLocales({
		block: block({
			title: localized({ en: "Hello", ru: "Hello" }),
		}),
		fieldPath: "title",
		fieldKind: "text",
		locales: ["en", "ru"],
		referenceLocale: "en",
	});
	assert.deepEqual(result, ["ru"]);
});

test("explicit override `localized` opts out of copied-untranslated detection", () => {
	const result = findPhotonFieldMissingLocales({
		block: block(
			{ title: localized({ en: "Photon", ru: "Photon" }) },
			{ title: "localized" },
		),
		fieldPath: "title",
		fieldKind: "text",
		locales: ["en", "ru"],
		referenceLocale: "en",
	});
	assert.deepEqual(result, []);
});

test("does not flag reference locale itself", () => {
	const result = findPhotonFieldMissingLocales({
		block: block({
			title: localized({ en: "Hello", ru: "Hello" }),
		}),
		fieldPath: "title",
		fieldKind: "text",
		locales: ["en", "ru"],
		referenceLocale: "en",
	});
	assert.deepEqual(result, ["ru"]);
});

test("treats raw (non-localized) value as filled for all locales", () => {
	const result = findPhotonFieldMissingLocales({
		block: block({ title: "Brand" }),
		fieldPath: "title",
		fieldKind: "text",
		locales: ["en", "ru"],
	});
	// Empty per locale (raw is the same for all; treatCopiedAsMissing skips
	// without referenceLocale)
	assert.deepEqual(result, []);
});

test("returns [] when value is non-empty for all locales and no reference", () => {
	const result = findPhotonFieldMissingLocales({
		block: block({
			title: localized({ en: "Hi", ru: "Привет" }),
		}),
		fieldPath: "title",
		fieldKind: "text",
		locales: ["en", "ru"],
	});
	assert.deepEqual(result, []);
});
