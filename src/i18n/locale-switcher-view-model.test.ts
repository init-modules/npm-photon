import assert from "node:assert/strict";
import test from "node:test";
import { buildPhotonLocaleSwitcherViewModel } from "./locale-switcher-view-model";

const locale = (code: string, label?: string) => ({
	code,
	label: label ?? code.toUpperCase(),
	status: "active" as const,
	sortOrder: 0,
});

test("showSearch false when below threshold", () => {
	const result = buildPhotonLocaleSwitcherViewModel({
		locales: [locale("en"), locale("ru")],
	});
	assert.equal(result.showSearch, false);
});

test("showSearch true at threshold", () => {
	const locales = Array.from({ length: 8 }, (_, i) =>
		locale(`l${i}`, `Locale ${i}`),
	);
	const result = buildPhotonLocaleSwitcherViewModel({ locales });
	assert.equal(result.showSearch, true);
});

test("results are alphabetical by label", () => {
	const result = buildPhotonLocaleSwitcherViewModel({
		locales: [locale("ru", "Russian"), locale("en", "English"), locale("de", "German")],
	});
	assert.deepEqual(
		result.results.map((l) => l.code),
		["en", "de", "ru"],
	);
});

test("recents preserved in usage order, capped at maxRecents", () => {
	const locales = [
		locale("en", "English"),
		locale("ru", "Russian"),
		locale("de", "German"),
		locale("fr", "French"),
	];
	const result = buildPhotonLocaleSwitcherViewModel({
		locales,
		recentCodes: ["fr", "en", "ru", "de"],
		maxRecents: 3,
	});
	assert.deepEqual(
		result.recents.map((l) => l.code),
		["fr", "en", "ru"],
	);
});

test("recents are filtered to known locales", () => {
	const result = buildPhotonLocaleSwitcherViewModel({
		locales: [locale("en"), locale("ru")],
		recentCodes: ["xx", "ru"],
	});
	assert.deepEqual(
		result.recents.map((l) => l.code),
		["ru"],
	);
});

test("search query filters by code or label, case-insensitive", () => {
	const result = buildPhotonLocaleSwitcherViewModel({
		locales: [
			locale("en", "English"),
			locale("ru", "Russian"),
			locale("de", "German"),
		],
		searchQuery: "RUS",
	});
	assert.deepEqual(
		result.results.map((l) => l.code),
		["ru"],
	);
});

test("search query also filters recents", () => {
	const result = buildPhotonLocaleSwitcherViewModel({
		locales: [locale("en", "English"), locale("ru", "Russian")],
		recentCodes: ["en", "ru"],
		searchQuery: "en",
	});
	assert.deepEqual(
		result.recents.map((l) => l.code),
		["en"],
	);
});

test("empty result list when query matches nothing", () => {
	const result = buildPhotonLocaleSwitcherViewModel({
		locales: [locale("en"), locale("ru")],
		searchQuery: "xyz",
	});
	assert.deepEqual(result.results, []);
});

test("recents deduped against duplicate codes in recentCodes", () => {
	const result = buildPhotonLocaleSwitcherViewModel({
		locales: [locale("en"), locale("ru")],
		recentCodes: ["en", "en", "ru"],
		maxRecents: 3,
	});
	assert.deepEqual(
		result.recents.map((l) => l.code),
		["en", "ru"],
	);
});
