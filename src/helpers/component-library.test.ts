import assert from "node:assert/strict";
import test from "node:test";
import {
	collectPhotonComponentLibraryUsages,
	createPhotonComponentLibraryBlockId,
	createPhotonComponentLibraryItemFromBlock,
	createPhotonComponentReferenceBlock,
	duplicatePhotonComponentLibraryItem,
	parsePhotonComponentLibraryBlockId,
	resolvePhotonComponentReferenceBlocks,
} from "./component-library";
import type { PhotonBlock, PhotonComponentLibraryItem } from "../types";

const sourceBlock: PhotonBlock = {
	id: "hero",
	module: "test",
	type: "hero",
	props: {
		title: "Original",
	},
	areas: [
		{
			id: "content",
			label: "Content",
			blocks: [
				{
					id: "cta",
					module: "test",
					type: "button",
					props: {
						label: "Buy",
					},
				},
			],
		},
	],
};

const createLibrarySettings = (item: PhotonComponentLibraryItem) => ({
	componentLibrary: {
		items: {
			[item.id]: item,
		},
	},
});

test("component library item creation clones source block ids", () => {
	const item = createPhotonComponentLibraryItemFromBlock(sourceBlock, "Hero");

	assert.equal(item.label, "Hero");
	assert.equal(item.blocks.length, 1);
	assert.notEqual(item.blocks[0]?.id, sourceBlock.id);
	assert.notEqual(item.blocks[0]?.areas?.[0]?.blocks[0]?.id, "cta");
	assert.deepEqual(item.blocks[0]?.props, sourceBlock.props);
});

test("component library source duplication creates an independent source tree", () => {
	const item = createPhotonComponentLibraryItemFromBlock(sourceBlock, "Hero");
	const duplicate = duplicatePhotonComponentLibraryItem(item);

	assert.notEqual(duplicate.id, item.id);
	assert.equal(duplicate.label, "Hero copy");
	assert.notEqual(duplicate.blocks[0]?.id, item.blocks[0]?.id);
	assert.notEqual(
		duplicate.blocks[0]?.areas?.[0]?.blocks[0]?.id,
		item.blocks[0]?.areas?.[0]?.blocks[0]?.id,
	);
	assert.deepEqual(duplicate.blocks[0]?.props, item.blocks[0]?.props);
});

test("component reference resolution remaps source ids per placement", () => {
	const item: PhotonComponentLibraryItem = {
		id: "component:hero",
		label: "Hero",
		blocks: [sourceBlock],
	};
	const reference = createPhotonComponentReferenceBlock(item);
	const resolved = resolvePhotonComponentReferenceBlocks({
		block: reference,
		siteSettings: createLibrarySettings(item),
	});
	const resolvedBlock = resolved[0];

	assert.ok(resolvedBlock);
	assert.equal(resolvedBlock.props.title, "Original");
	assert.deepEqual(parsePhotonComponentLibraryBlockId(resolvedBlock.id), {
		itemId: item.id,
		referenceBlockId: reference.id,
		sourceBlockId: sourceBlock.id,
	});
	assert.deepEqual(
		parsePhotonComponentLibraryBlockId(
			resolvedBlock.areas?.[0]?.blocks[0]?.id ?? "",
		),
		{
			itemId: item.id,
			referenceBlockId: reference.id,
			sourceBlockId: "cta",
		},
	);
});

test("component reference resolution blocks disabled items and cycles", () => {
	const item: PhotonComponentLibraryItem = {
		id: "component:hero",
		label: "Hero",
		blocks: [sourceBlock],
	};
	const reference = createPhotonComponentReferenceBlock(item);

	assert.deepEqual(
		resolvePhotonComponentReferenceBlocks({
			block: reference,
			siteSettings: createLibrarySettings({
				...item,
				enabled: false,
			}),
		}),
		[],
	);
	assert.deepEqual(
		resolvePhotonComponentReferenceBlocks({
			block: reference,
			siteSettings: createLibrarySettings(item),
			stack: [item.id],
		}),
		[],
	);
});

test("component library usage collection finds reference blocks in nested areas", () => {
	const reference = createPhotonComponentReferenceBlock({
		id: "component:hero",
		label: "Hero",
	});
	const document = {
		id: "page",
		name: "Page",
		route: "/",
		updatedAt: "2026-01-01T00:00:00.000Z",
		blocks: [
			{
				id: "layout",
				module: "test",
				type: "layout",
				props: {},
				areas: [
					{
						id: "main",
						label: "Main",
						blocks: [reference],
					},
				],
			},
		],
	};

	assert.deepEqual(collectPhotonComponentLibraryUsages(document), [
		{
			itemId: "component:hero",
				referenceBlockId: reference.id,
				regionKey: undefined,
				path: "blocks.0.areas.main.blocks.0",
				source: "currentDocument",
			},
		]);
	});

test("component library usage collection distinguishes site frame regions", () => {
	const reference = createPhotonComponentReferenceBlock({
		id: "component:header",
		label: "Header",
	});
	const document = {
		id: "page",
		name: "Page",
		route: "/",
		updatedAt: "2026-01-01T00:00:00.000Z",
		blocks: [
			{
				id: "__photon_surface_region:header__",
				module: "__photon_internal__",
				type: "surface-region",
				props: {
					regionKey: "header",
				},
				areas: [
					{
						id: "content",
						label: "Header",
						blocks: [reference],
					},
				],
			},
		],
	};

	assert.deepEqual(collectPhotonComponentLibraryUsages(document), [
		{
			itemId: "component:header",
			referenceBlockId: reference.id,
			regionKey: "header",
			path: "blocks.0.areas.content.blocks.0",
			source: "siteFrame",
		},
	]);
});

test("component library synthetic ids are round-trippable", () => {
	const id = createPhotonComponentLibraryBlockId({
		itemId: "component:hero:with-colon",
		referenceBlockId: "reference/1",
		sourceBlockId: "source nested",
	});

	assert.deepEqual(parsePhotonComponentLibraryBlockId(id), {
		itemId: "component:hero:with-colon",
		referenceBlockId: "reference/1",
		sourceBlockId: "source nested",
	});
});
