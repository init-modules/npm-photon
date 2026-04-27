import assert from "node:assert/strict";
import test from "node:test";
import {
	resolvePhotonFallbackLocaleCode,
	resolvePhotonLocalizedValue,
} from "./locale-fallback";

const locale = (
	code: string,
	isDefault = false,
): { code: string; label: string; status: "active"; isDefault: boolean } => ({
	code,
	label: code.toUpperCase(),
	status: "active",
	isDefault,
});

const locales = [locale("en", true), locale("ru"), locale("de")];

test("returns default locale when settings absent", () => {
	const result = resolvePhotonFallbackLocaleCode({
		settings: undefined,
		locales,
	});
	assert.equal(result, "en");
});

test("returns null when fallbackLocale=false", () => {
	const result = resolvePhotonFallbackLocaleCode({
		settings: { fallbackLocale: false },
		locales,
	});
	assert.equal(result, null);
});

test("returns explicit fallbackLocale when set and present in list", () => {
	const result = resolvePhotonFallbackLocaleCode({
		settings: { fallbackLocale: "ru" },
		locales,
	});
	assert.equal(result, "ru");
});

test("falls back to default locale when explicit code is unknown", () => {
	const result = resolvePhotonFallbackLocaleCode({
		settings: { fallbackLocale: "fr" },
		locales,
	});
	assert.equal(result, "en");
});

test("returns null when no default locale and no explicit code", () => {
	const result = resolvePhotonFallbackLocaleCode({
		settings: undefined,
		locales: [locale("en"), locale("ru")],
	});
	assert.equal(result, null);
});

test("returns raw value as-is for non-localized fields", () => {
	assert.equal(
		resolvePhotonLocalizedValue({
			value: "Brand",
			locale: "ru",
			settings: undefined,
			locales,
		}),
		"Brand",
	);
});

test("returns empty undefined for empty raw value", () => {
	assert.equal(
		resolvePhotonLocalizedValue({
			value: "",
			locale: "ru",
			settings: undefined,
			locales,
		}),
		undefined,
	);
});

test("uses target-locale value when present", () => {
	const result = resolvePhotonLocalizedValue({
		value: { __wbLocalizedDefault: true, values: { en: "Hi", ru: "Привет" } },
		locale: "ru",
		settings: undefined,
		locales,
	});
	assert.equal(result, "Привет");
});

test("falls back to default-locale value when target empty and fallback enabled", () => {
	const result = resolvePhotonLocalizedValue({
		value: { __wbLocalizedDefault: true, values: { en: "Hello", ru: "" } },
		locale: "ru",
		settings: undefined,
		locales,
	});
	assert.equal(result, "Hello");
});

test("falls back to explicit fallbackLocale when set", () => {
	const result = resolvePhotonLocalizedValue({
		value: {
			__wbLocalizedDefault: true,
			values: { en: "Hello", ru: "Привет", de: "" },
		},
		locale: "de",
		settings: { fallbackLocale: "ru" },
		locales,
	});
	assert.equal(result, "Привет");
});

test("returns undefined when fallback disabled and target empty", () => {
	const result = resolvePhotonLocalizedValue({
		value: { __wbLocalizedDefault: true, values: { en: "Hi", ru: "" } },
		locale: "ru",
		settings: { fallbackLocale: false },
		locales,
	});
	assert.equal(result, undefined);
});

test("returns undefined when fallback target is also empty", () => {
	const result = resolvePhotonLocalizedValue({
		value: { __wbLocalizedDefault: true, values: { en: "", ru: "" } },
		locale: "ru",
		settings: undefined,
		locales,
	});
	assert.equal(result, undefined);
});

test("does not loop fallback into itself", () => {
	// fallback code == locale: skip fallback
	const result = resolvePhotonLocalizedValue({
		value: { __wbLocalizedDefault: true, values: { en: "" } },
		locale: "en",
		settings: undefined,
		locales,
	});
	assert.equal(result, undefined);
});
