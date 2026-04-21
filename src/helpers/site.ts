import type {
	WebsiteBuilderArea,
	WebsiteBuilderBlock,
	WebsiteBuilderDocument,
	WebsiteBuilderSite,
	WebsiteBuilderSiteRegion,
} from "../types";
import { cloneWebsiteBuilderValue } from "./path";
import { createWebsiteBuilderAreaListId } from "./tree";

const WEBSITE_BUILDER_SURFACE_REGION_AREA_ID = "content";
export const WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY = "page";
const WEBSITE_BUILDER_PAGE_SURFACE_REGION_ORDER = 50;
const WEBSITE_BUILDER_SITE_SHELL_REGION_TYPES = {
	header: "site-header-shell",
	footer: "site-footer-shell",
} as const;

type WebsiteBuilderSurfaceRegionDescriptor = {
	key: string;
	label: string;
	order: number;
	lockedOnCanvas: boolean;
	kind: "page" | "site";
};

const createWebsiteBuilderSurfaceRegionBlockId = (regionKey: string) =>
	`__wb_surface_region:${regionKey}__`;

const isWebsiteBuilderSurfaceRegionBlock = (
	block: WebsiteBuilderBlock,
	regionKey?: string,
) => {
	if (!block.id.startsWith("__wb_surface_region:")) {
		return false;
	}

	return regionKey
		? block.id === createWebsiteBuilderSurfaceRegionBlockId(regionKey)
		: true;
};

const getWebsiteBuilderSurfaceRegionArea = (
	block: WebsiteBuilderBlock,
): WebsiteBuilderArea | null =>
	block.areas?.find(
		(area) => area.id === WEBSITE_BUILDER_SURFACE_REGION_AREA_ID,
	) ?? null;

const getWebsiteBuilderSiteRegionDescriptors = (
	site: WebsiteBuilderSite,
): WebsiteBuilderSurfaceRegionDescriptor[] =>
	Object.values(site.regions)
		.sort((left, right) => left.order - right.order)
		.map((region) => ({
			key: region.key,
			label: region.label,
			order: region.order,
			lockedOnCanvas: region.lockedOnCanvas,
			kind: "site" as const,
		}));

const removeDuplicatedWebsiteBuilderSiteShellBlocks = (
	blocks: WebsiteBuilderBlock[],
	site: WebsiteBuilderSite,
) =>
	blocks.filter((block) => {
		const regionEntry = Object.entries(
			WEBSITE_BUILDER_SITE_SHELL_REGION_TYPES,
		).find(([, type]) => type === block.type);

		if (!regionEntry) {
			return true;
		}

		const [regionKey] = regionEntry;

		return !regionKey || !(regionKey in site.regions);
	});

export const resolveWebsiteBuilderSurfaceRegionDescriptors = (
	site: WebsiteBuilderSite,
): WebsiteBuilderSurfaceRegionDescriptor[] => {
	const pageDescriptor: WebsiteBuilderSurfaceRegionDescriptor = {
		key: WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
		label: "Page content",
		order: WEBSITE_BUILDER_PAGE_SURFACE_REGION_ORDER,
		lockedOnCanvas: false,
		kind: "page",
	};

	return [...getWebsiteBuilderSiteRegionDescriptors(site), pageDescriptor].sort(
		(left, right) => left.order - right.order,
	);
};

const createWebsiteBuilderSurfaceRegionBlock = ({
	key,
	label,
	lockedOnCanvas,
	blocks,
}: {
	key: string;
	label: string;
	lockedOnCanvas: boolean;
	blocks: WebsiteBuilderBlock[];
}): WebsiteBuilderBlock => ({
	id: createWebsiteBuilderSurfaceRegionBlockId(key),
	module: "__website_builder_internal__",
	type: "surface-region",
	props: {
		regionKey: key,
		label,
		lockedOnCanvas,
	},
	areas: [
		{
			id: WEBSITE_BUILDER_SURFACE_REGION_AREA_ID,
			label,
			blocks: cloneWebsiteBuilderValue(blocks),
		},
	],
});

const createWebsiteBuilderEmptyDocument = (
	key: string,
	label: string,
	route: string,
	updatedAt: string,
): WebsiteBuilderDocument => ({
	id: `website-builder-${key}`,
	name: label,
	route,
	updatedAt,
	blocks: [],
});

export const composeWebsiteBuilderSurfaceDocument = (
	pageDocument: WebsiteBuilderDocument,
	site: WebsiteBuilderSite,
): WebsiteBuilderDocument => {
	const sanitizedPageBlocks = removeDuplicatedWebsiteBuilderSiteShellBlocks(
		pageDocument.blocks,
		site,
	);
	const regionDescriptors = resolveWebsiteBuilderSurfaceRegionDescriptors(site);
	const latestUpdatedAt = Object.values(site.regions).reduce(
		(currentLatest, region) => {
			const candidate = region.document?.updatedAt;

			return typeof candidate === "string" && candidate > currentLatest
				? candidate
				: currentLatest;
		},
		pageDocument.updatedAt,
	);

	return {
		id: pageDocument.id,
		name: pageDocument.name,
		route: pageDocument.route,
		updatedAt: latestUpdatedAt,
		blocks: regionDescriptors.map((descriptor) => {
			if (descriptor.kind === "page") {
				return createWebsiteBuilderSurfaceRegionBlock({
					key: descriptor.key,
					label: descriptor.label,
					lockedOnCanvas: descriptor.lockedOnCanvas,
					blocks: sanitizedPageBlocks,
				});
			}

			const regionDocument = site.regions[descriptor.key]?.document;

			return createWebsiteBuilderSurfaceRegionBlock({
				key: descriptor.key,
				label: descriptor.label,
				lockedOnCanvas: descriptor.lockedOnCanvas,
				blocks: regionDocument?.blocks ?? [],
			});
		}),
	};
};

export const decomposeWebsiteBuilderSurfaceDocument = (
	surfaceDocument: WebsiteBuilderDocument,
	site: WebsiteBuilderSite,
): {
	pageDocument: WebsiteBuilderDocument;
	site: WebsiteBuilderSite;
} => {
	const pageBlocks =
		getWebsiteBuilderSurfaceRegionBlocks(
			surfaceDocument,
			WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
		) ?? [];

	const pageDocument: WebsiteBuilderDocument = {
		id: surfaceDocument.id,
		name: surfaceDocument.name,
		route: surfaceDocument.route,
		updatedAt: surfaceDocument.updatedAt,
		blocks: cloneWebsiteBuilderValue(
			removeDuplicatedWebsiteBuilderSiteShellBlocks(pageBlocks, site),
		),
	};

	const nextRegions = Object.fromEntries(
		Object.entries(site.regions).map(([regionKey, region]) => {
			const regionBlocks =
				getWebsiteBuilderSurfaceRegionBlocks(surfaceDocument, regionKey) ?? [];
			const fallbackDocument =
				region.document ??
				createWebsiteBuilderEmptyDocument(
					`site-${regionKey}`,
					region.label,
					`/_site/${regionKey}`,
					surfaceDocument.updatedAt,
				);

			return [
				regionKey,
				{
					...region,
					document: {
						...fallbackDocument,
						updatedAt: surfaceDocument.updatedAt,
						blocks: cloneWebsiteBuilderValue(regionBlocks),
					},
				} satisfies WebsiteBuilderSiteRegion,
			];
		}),
	);

	return {
		pageDocument,
		site: {
			settings: cloneWebsiteBuilderValue(site.settings),
			regions: nextRegions,
		},
	};
};

export const getWebsiteBuilderSurfaceRegionBlocks = (
	document: WebsiteBuilderDocument,
	regionKey: string,
): WebsiteBuilderBlock[] | null => {
	const block = document.blocks.find((candidate) =>
		isWebsiteBuilderSurfaceRegionBlock(candidate, regionKey),
	);
	const area = block ? getWebsiteBuilderSurfaceRegionArea(block) : null;

	return area ? area.blocks : null;
};

export const getWebsiteBuilderSurfaceRegionListId = (regionKey: string) =>
	createWebsiteBuilderAreaListId(
		createWebsiteBuilderSurfaceRegionBlockId(regionKey),
		WEBSITE_BUILDER_SURFACE_REGION_AREA_ID,
	);

const findFirstEditableBlockId = (
	blocks: WebsiteBuilderBlock[],
): string | null => {
	for (const block of blocks) {
		if (isWebsiteBuilderSurfaceRegionBlock(block)) {
			const area = getWebsiteBuilderSurfaceRegionArea(block);
			const nested = area ? findFirstEditableBlockId(area.blocks) : null;

			if (nested) {
				return nested;
			}

			continue;
		}

		return block.id;
	}

	return null;
};

export const getFirstWebsiteBuilderSurfaceEditableBlockId = (
	document: WebsiteBuilderDocument,
): string | null => findFirstEditableBlockId(document.blocks);

const resolveWebsiteBuilderSurfaceRegionFromBlocks = (
	blocks: WebsiteBuilderBlock[],
	blockId: string,
	listId: string,
	currentRegion: string | null,
): string | null => {
	for (const block of blocks) {
		const nextRegion = isWebsiteBuilderSurfaceRegionBlock(block)
			? ((block.props.regionKey as string | undefined) ?? currentRegion)
			: currentRegion;

		if (block.id === blockId) {
			return nextRegion;
		}

		for (const area of block.areas ?? []) {
			const areaListId = createWebsiteBuilderAreaListId(block.id, area.id);

			if (areaListId === listId) {
				return nextRegion;
			}

			const nested = resolveWebsiteBuilderSurfaceRegionFromBlocks(
				area.blocks,
				blockId,
				listId,
				nextRegion,
			);

			if (nested) {
				return nested;
			}
		}
	}

	return null;
};

export const resolveWebsiteBuilderSurfaceRegionForBlockId = (
	document: WebsiteBuilderDocument,
	blockId: string,
): string | null =>
	resolveWebsiteBuilderSurfaceRegionFromBlocks(
		document.blocks,
		blockId,
		"__unknown__",
		null,
	);

export const resolveWebsiteBuilderSurfaceRegionForListId = (
	document: WebsiteBuilderDocument,
	listId: string,
): string | null =>
	resolveWebsiteBuilderSurfaceRegionFromBlocks(
		document.blocks,
		"__unknown__",
		listId,
		null,
	);
