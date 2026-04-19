import assert from "node:assert/strict";
import test from "node:test";
import type { WebsiteBuilderBlock, WebsiteBuilderDocument } from "../types";
import {
	composeWebsiteBuilderSurfaceDocument,
	decomposeWebsiteBuilderSurfaceDocument,
	getWebsiteBuilderSurfaceRegionBlocks,
	WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
} from "./site";

const createDocument = (
	id: string,
	blocks: WebsiteBuilderBlock[],
): WebsiteBuilderDocument => ({
	id,
	name: id,
	route: `/${id}`,
	updatedAt: "2026-01-01T00:00:00.000Z",
	blocks,
});

test("composeWebsiteBuilderSurfaceDocument strips duplicated header and footer shell blocks from page content", () => {
	const pageDocument = createDocument("home", [
		{
			id: "header-inline",
			module: "website-builder-system",
			type: "site-header-shell",
			props: {},
		},
		{
			id: "hero",
			module: "marketing-demo",
			type: "hero",
			props: {},
		},
		{
			id: "footer-inline",
			module: "website-builder-system",
			type: "site-footer-shell",
			props: {},
		},
	]);
	const site = {
		settings: {},
		regions: {
			header: {
				key: "header",
				label: "Header",
				order: 10,
				lockedOnCanvas: true,
				document: createDocument("header", [
					{
						id: "header-shell",
						module: "website-builder-system",
						type: "site-header-shell",
						props: {},
					},
				]),
			},
			footer: {
				key: "footer",
				label: "Footer",
				order: 90,
				lockedOnCanvas: true,
				document: createDocument("footer", [
					{
						id: "footer-shell",
						module: "website-builder-system",
						type: "site-footer-shell",
						props: {},
					},
				]),
			},
		},
	};

	const surfaceDocument = composeWebsiteBuilderSurfaceDocument(pageDocument, site);
	const pageBlocks =
		getWebsiteBuilderSurfaceRegionBlocks(
			surfaceDocument,
			WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
		) ?? [];
	const headerBlocks =
		getWebsiteBuilderSurfaceRegionBlocks(surfaceDocument, "header") ?? [];
	const footerBlocks =
		getWebsiteBuilderSurfaceRegionBlocks(surfaceDocument, "footer") ?? [];

	assert.deepEqual(
		pageBlocks.map((block) => block.id),
		["hero"],
	);
	assert.deepEqual(
		headerBlocks.map((block) => block.id),
		["header-shell"],
	);
	assert.deepEqual(
		footerBlocks.map((block) => block.id),
		["footer-shell"],
	);
});

test("decomposeWebsiteBuilderSurfaceDocument keeps site shell ownership inside site regions", () => {
	const surfaceDocument = {
		id: "home",
		name: "home",
		route: "/home",
		updatedAt: "2026-01-01T00:00:00.000Z",
		blocks: [
			{
				id: "__wb_surface_region:header__",
				module: "__website_builder_internal__",
				type: "surface-region",
				props: {
					regionKey: "header",
					label: "Header",
					lockedOnCanvas: true,
				},
				areas: [
					{
						id: "content",
						blocks: [
							{
								id: "header-shell",
								module: "website-builder-system",
								type: "site-header-shell",
								props: {},
							},
						],
					},
				],
			},
			{
				id: "__wb_surface_region:page__",
				module: "__website_builder_internal__",
				type: "surface-region",
				props: {
					regionKey: "page",
					label: "Page content",
					lockedOnCanvas: false,
				},
				areas: [
					{
						id: "content",
						blocks: [
							{
								id: "header-inline",
								module: "website-builder-system",
								type: "site-header-shell",
								props: {},
							},
							{
								id: "hero",
								module: "marketing-demo",
								type: "hero",
								props: {},
							},
						],
					},
				],
			},
			{
				id: "__wb_surface_region:footer__",
				module: "__website_builder_internal__",
				type: "surface-region",
				props: {
					regionKey: "footer",
					label: "Footer",
					lockedOnCanvas: true,
				},
				areas: [
					{
						id: "content",
						blocks: [
							{
								id: "footer-shell",
								module: "website-builder-system",
								type: "site-footer-shell",
								props: {},
							},
						],
					},
				],
			},
		],
	};
	const site = {
		settings: {},
		regions: {
			header: {
				key: "header",
				label: "Header",
				order: 10,
				lockedOnCanvas: true,
				document: createDocument("header", []),
			},
			footer: {
				key: "footer",
				label: "Footer",
				order: 90,
				lockedOnCanvas: true,
				document: createDocument("footer", []),
			},
		},
	};

	const persistedState = decomposeWebsiteBuilderSurfaceDocument(
		surfaceDocument,
		site,
	);

	assert.deepEqual(
		persistedState.pageDocument.blocks.map((block) => block.id),
		["hero"],
	);
	assert.deepEqual(
		persistedState.site.regions.header.document.blocks.map((block) => block.id),
		["header-shell"],
	);
	assert.deepEqual(
		persistedState.site.regions.footer.document.blocks.map((block) => block.id),
		["footer-shell"],
	);
});
