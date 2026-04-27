import assert from "node:assert/strict";
import test from "node:test";
import type { PhotonBlock, PhotonField } from "../types";
import {
	copyPhotonBlockLocaleContent,
	copyPhotonLocaleContent,
} from "./copy-locale-content";
import type { PhotonBlockSchemaMap } from "./translation-completeness";

const cardField = (path: string, kind: PhotonField["kind"]): PhotonField => ({
	path,
	label: path,
	kind,
});

const schemas: PhotonBlockSchemaMap = {
	card: {
		fields: [
			cardField("title", "text"),
			cardField("body", "textarea"),
			cardField("image", "image"),
		],
	},
};

const blockWith = (props: Record<string, unknown>): PhotonBlock => ({
	id: "b1",
	module: "demo",
	type: "card",
	props,
});

test("merge mode fills empty target fields from source", () => {
	const result = copyPhotonLocaleContent({
		blocks: [
			blockWith({
				title: { __wbLocalizedDefault: true, values: { en: "Hello" } },
			}),
		],
		schemas,
		sourceLocale: "en",
		targetLocale: "ru",
	});
	const value = result[0].props.title as {
		values: Record<string, string>;
	};
	assert.equal(value.values.ru, "Hello");
	assert.equal(value.values.en, "Hello");
});

test("merge mode preserves existing target value", () => {
	const result = copyPhotonLocaleContent({
		blocks: [
			blockWith({
				title: {
					__wbLocalizedDefault: true,
					values: { en: "Hello", ru: "Привет" },
				},
			}),
		],
		schemas,
		sourceLocale: "en",
		targetLocale: "ru",
	});
	const value = result[0].props.title as {
		values: Record<string, string>;
	};
	assert.equal(value.values.ru, "Привет");
});

test("clone mode overwrites existing target value", () => {
	const result = copyPhotonLocaleContent({
		blocks: [
			blockWith({
				title: {
					__wbLocalizedDefault: true,
					values: { en: "Updated", ru: "Старое" },
				},
			}),
		],
		schemas,
		sourceLocale: "en",
		targetLocale: "ru",
		mode: "clone",
	});
	const value = result[0].props.title as {
		values: Record<string, string>;
	};
	assert.equal(value.values.ru, "Updated");
});

test("ignores non-localized fields", () => {
	const result = copyPhotonLocaleContent({
		blocks: [
			blockWith({
				image: { url: "i.jpg" },
				title: { __wbLocalizedDefault: true, values: { en: "Hi" } },
			}),
		],
		schemas,
		sourceLocale: "en",
		targetLocale: "ru",
	});
	assert.deepEqual(result[0].props.image, { url: "i.jpg" });
});

test("respects instance override flipping a field to shared", () => {
	const result = copyPhotonLocaleContent({
		blocks: [
			{
				id: "b1",
				module: "demo",
				type: "card",
				localization: { title: "shared" },
				props: {
					title: { __wbLocalizedDefault: true, values: { en: "Hello" } },
				},
			},
		],
		schemas,
		sourceLocale: "en",
		targetLocale: "ru",
	});
	const value = result[0].props.title as {
		values: Record<string, string>;
	};
	assert.equal(value.values.ru, undefined);
});

test("upgrades a non-localized raw string into a localized default for the target", () => {
	const result = copyPhotonLocaleContent({
		blocks: [blockWith({ title: "Brand" })],
		schemas,
		sourceLocale: "en",
		targetLocale: "ru",
	});
	const value = result[0].props.title as {
		__wbLocalizedDefault: boolean;
		values: Record<string, string>;
	};
	assert.equal(value.__wbLocalizedDefault, true);
	assert.equal(value.values.ru, "Brand");
});

test("traverses nested area blocks", () => {
	const child: PhotonBlock = {
		id: "child",
		module: "demo",
		type: "card",
		props: { title: { __wbLocalizedDefault: true, values: { en: "Inner" } } },
	};
	const parent: PhotonBlock = {
		id: "parent",
		module: "demo",
		type: "card",
		props: { title: "outer" },
		areas: [{ id: "main", blocks: [child] }],
	};
	const result = copyPhotonLocaleContent({
		blocks: [parent],
		schemas,
		sourceLocale: "en",
		targetLocale: "ru",
	});
	const childResult = result[0].areas?.[0].blocks[0];
	const value = childResult?.props.title as {
		values: Record<string, string>;
	};
	assert.equal(value.values.ru, "Inner");
});

test("copyPhotonBlockLocaleContent works on a single block", () => {
	const result = copyPhotonBlockLocaleContent(
		blockWith({
			body: { __wbLocalizedDefault: true, values: { en: "Body" } },
		}),
		{ schemas, sourceLocale: "en", targetLocale: "ru" },
	);
	const value = result.props.body as { values: Record<string, string> };
	assert.equal(value.values.ru, "Body");
});

test("does not mutate input blocks", () => {
	const start = blockWith({
		title: { __wbLocalizedDefault: true, values: { en: "Hello" } },
	});
	const before = JSON.stringify(start);
	copyPhotonLocaleContent({
		blocks: [start],
		schemas,
		sourceLocale: "en",
		targetLocale: "ru",
	});
	assert.equal(JSON.stringify(start), before);
});
