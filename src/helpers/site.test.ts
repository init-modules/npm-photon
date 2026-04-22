import assert from "node:assert/strict";
import test from "node:test";
import type { PhotonBlock, PhotonDocument } from "../types";
import {
	composePhotonSurfaceDocument,
	decomposePhotonSurfaceDocument,
	getPhotonSurfaceRegionBlocks,
	PHOTON_PAGE_SURFACE_REGION_KEY,
} from "./site";

const createDocument = (
	id: string,
	blocks: PhotonBlock[],
): PhotonDocument => ({
	id,
	name: id,
	route: `/${id}`,
	updatedAt: "2026-01-01T00:00:00.000Z",
	blocks,
});

test("composePhotonSurfaceDocument strips duplicated header and footer shell blocks from page content", () => {
	const pageDocument = createDocument("home", [
		{
			id: "header-inline",
			module: "photon-system",
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
			module: "photon-system",
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
						module: "photon-system",
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
						module: "photon-system",
						type: "site-footer-shell",
						props: {},
					},
				]),
			},
		},
	};

	const surfaceDocument = composePhotonSurfaceDocument(
		pageDocument,
		site,
	);
	const pageBlocks =
		getPhotonSurfaceRegionBlocks(
			surfaceDocument,
			PHOTON_PAGE_SURFACE_REGION_KEY,
		) ?? [];
	const headerBlocks =
		getPhotonSurfaceRegionBlocks(surfaceDocument, "header") ?? [];
	const footerBlocks =
		getPhotonSurfaceRegionBlocks(surfaceDocument, "footer") ?? [];

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

test("decomposePhotonSurfaceDocument keeps site shell ownership inside site regions", () => {
	const surfaceDocument = {
		id: "home",
		name: "home",
		route: "/home",
		updatedAt: "2026-01-01T00:00:00.000Z",
		blocks: [
			{
				id: "__photon_surface_region:header__",
				module: "__photon_internal__",
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
								module: "photon-system",
								type: "site-header-shell",
								props: {},
							},
						],
					},
				],
			},
			{
				id: "__photon_surface_region:page__",
				module: "__photon_internal__",
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
								module: "photon-system",
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
				id: "__photon_surface_region:footer__",
				module: "__photon_internal__",
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
								module: "photon-system",
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

	const persistedState = decomposePhotonSurfaceDocument(
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
