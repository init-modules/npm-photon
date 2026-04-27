import assert from "node:assert/strict";
import test from "node:test";
import type {
	PhotonAnyBlockDefinition,
	PhotonBlock,
	PhotonField,
	PhotonRegistry,
} from "../types";
import {
	buildPhotonBlockSchemaMapForBlocks,
	computePhotonTranslationCompletenessForLocales,
	computePhotonTranslationCompletenessFromRegistry,
} from "./translation-completeness-from-registry";

const field = (path: string, kind: PhotonField["kind"]): PhotonField => ({
	path,
	label: path,
	kind,
});

const cardDefinition: Partial<PhotonAnyBlockDefinition> = {
	type: "card",
	fields: [field("title", "text"), field("body", "textarea"), field("image", "image")],
};

const stubRegistry: PhotonRegistry = {
	modules: [],
	definitions: new Map([
		["demo::card", cardDefinition as PhotonAnyBlockDefinition],
	]),
	bindingAdapters: new Map(),
	pageSettingsPanels: [],
	siteSettingsPanels: [],
	getDefinition: (module: string, type: string) =>
		stubRegistry.definitions.get(`${module}::${type}`),
	getBindingAdapter: () => undefined,
	getPageSettingsPanels: () => [],
	getSiteSettingsPanels: () => [],
	getPaletteBlocks: () => [],
};

const block = (id: string, props: Record<string, unknown>): PhotonBlock => ({
	id,
	module: "demo",
	type: "card",
	props,
});

const localized = (values: Record<string, unknown>) => ({
	__wbLocalizedDefault: true,
	values,
});

test("buildPhotonBlockSchemaMapForBlocks pulls definitions only for blocks present", () => {
	const map = buildPhotonBlockSchemaMapForBlocks(
		[block("1", { title: localized({ en: "x" }) })],
		stubRegistry,
	);
	assert.equal(map.card?.fields.length, 3);
});

test("computePhotonTranslationCompletenessFromRegistry resolves through registry", () => {
	const result = computePhotonTranslationCompletenessFromRegistry({
		blocks: [
			block("1", {
				title: localized({ en: "Hello", ru: "" }),
				body: localized({ en: "Body", ru: "Тело" }),
			}),
		],
		registry: stubRegistry,
		locale: "ru",
	});
	assert.equal(result.total, 2);
	assert.equal(result.filled, 1);
	assert.equal(result.percentage, 50);
});

test("computePhotonTranslationCompletenessForLocales returns one result per locale", () => {
	const result = computePhotonTranslationCompletenessForLocales({
		blocks: [
			block("1", {
				title: localized({ en: "Hi", ru: "Привет", de: "" }),
				body: localized({ en: "B", ru: "Б", de: "" }),
			}),
		],
		registry: stubRegistry,
		locales: ["en", "ru", "de"],
	});
	assert.equal(result.en.percentage, 100);
	assert.equal(result.ru.percentage, 100);
	assert.equal(result.de.percentage, 0);
});

test("blocks of unknown module/type yield empty schema map without throwing", () => {
	const map = buildPhotonBlockSchemaMapForBlocks(
		[{ id: "x", module: "missing", type: "missing", props: {} }],
		stubRegistry,
	);
	assert.deepEqual(map, {});
});

test("recursively visits area children", () => {
	const map = buildPhotonBlockSchemaMapForBlocks(
		[
			{
				id: "p",
				module: "demo",
				type: "outer",
				props: {},
				areas: [
					{
						id: "main",
						blocks: [block("c", { title: localized({ en: "x" }) })],
					},
				],
			},
		],
		stubRegistry,
	);
	assert.equal(map.card?.fields.length, 3);
});
