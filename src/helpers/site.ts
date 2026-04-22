import type {
	PhotonArea,
	PhotonBlock,
	PhotonDocument,
	PhotonSite,
	PhotonSiteRegion,
} from "../types";
import { clonePhotonValue } from "./path";
import { createPhotonAreaListId } from "./tree";

const PHOTON_SURFACE_REGION_AREA_ID = "content";
export const PHOTON_PAGE_SURFACE_REGION_KEY = "page";
const PHOTON_PAGE_SURFACE_REGION_ORDER = 50;
const PHOTON_SITE_SHELL_REGION_TYPES = {
	header: "site-header-shell",
	footer: "site-footer-shell",
} as const;

type PhotonSurfaceRegionDescriptor = {
	key: string;
	label: string;
	order: number;
	lockedOnCanvas: boolean;
	kind: "page" | "site";
};

const createPhotonSurfaceRegionBlockId = (regionKey: string) =>
	`__photon_surface_region:${regionKey}__`;

const isPhotonSurfaceRegionBlock = (
	block: PhotonBlock,
	regionKey?: string,
) => {
	if (!block.id.startsWith("__photon_surface_region:")) {
		return false;
	}

	return regionKey
		? block.id === createPhotonSurfaceRegionBlockId(regionKey)
		: true;
};

const getPhotonSurfaceRegionArea = (
	block: PhotonBlock,
): PhotonArea | null =>
	block.areas?.find(
		(area) => area.id === PHOTON_SURFACE_REGION_AREA_ID,
	) ?? null;

const getPhotonSiteRegionDescriptors = (
	site: PhotonSite,
): PhotonSurfaceRegionDescriptor[] =>
	Object.values(site.regions)
		.sort((left, right) => left.order - right.order)
		.map((region) => ({
			key: region.key,
			label: region.label,
			order: region.order,
			lockedOnCanvas: region.lockedOnCanvas,
			kind: "site" as const,
		}));

const removeDuplicatedPhotonSiteShellBlocks = (
	blocks: PhotonBlock[],
	site: PhotonSite,
) =>
	blocks.filter((block) => {
		const regionEntry = Object.entries(
			PHOTON_SITE_SHELL_REGION_TYPES,
		).find(([, type]) => type === block.type);

		if (!regionEntry) {
			return true;
		}

		const [regionKey] = regionEntry;

		return !regionKey || !(regionKey in site.regions);
	});

export const resolvePhotonSurfaceRegionDescriptors = (
	site: PhotonSite,
): PhotonSurfaceRegionDescriptor[] => {
	const pageDescriptor: PhotonSurfaceRegionDescriptor = {
		key: PHOTON_PAGE_SURFACE_REGION_KEY,
		label: "Page content",
		order: PHOTON_PAGE_SURFACE_REGION_ORDER,
		lockedOnCanvas: false,
		kind: "page",
	};

	return [...getPhotonSiteRegionDescriptors(site), pageDescriptor].sort(
		(left, right) => left.order - right.order,
	);
};

const createPhotonSurfaceRegionBlock = ({
	key,
	label,
	lockedOnCanvas,
	blocks,
}: {
	key: string;
	label: string;
	lockedOnCanvas: boolean;
	blocks: PhotonBlock[];
}): PhotonBlock => ({
	id: createPhotonSurfaceRegionBlockId(key),
	module: "__photon_internal__",
	type: "surface-region",
	props: {
		regionKey: key,
		label,
		lockedOnCanvas,
	},
	areas: [
		{
			id: PHOTON_SURFACE_REGION_AREA_ID,
			label,
			blocks: clonePhotonValue(blocks),
		},
	],
});

const createPhotonEmptyDocument = (
	key: string,
	label: string,
	route: string,
	updatedAt: string,
): PhotonDocument => ({
	id: `photon-${key}`,
	name: label,
	route,
	updatedAt,
	blocks: [],
});

export const composePhotonSurfaceDocument = (
	pageDocument: PhotonDocument,
	site: PhotonSite,
): PhotonDocument => {
	const sanitizedPageBlocks = removeDuplicatedPhotonSiteShellBlocks(
		pageDocument.blocks,
		site,
	);
	const regionDescriptors = resolvePhotonSurfaceRegionDescriptors(site);
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
				return createPhotonSurfaceRegionBlock({
					key: descriptor.key,
					label: descriptor.label,
					lockedOnCanvas: descriptor.lockedOnCanvas,
					blocks: sanitizedPageBlocks,
				});
			}

			const regionDocument = site.regions[descriptor.key]?.document;

			return createPhotonSurfaceRegionBlock({
				key: descriptor.key,
				label: descriptor.label,
				lockedOnCanvas: descriptor.lockedOnCanvas,
				blocks: regionDocument?.blocks ?? [],
			});
		}),
	};
};

export const decomposePhotonSurfaceDocument = (
	surfaceDocument: PhotonDocument,
	site: PhotonSite,
): {
	pageDocument: PhotonDocument;
	site: PhotonSite;
} => {
	const pageBlocks =
		getPhotonSurfaceRegionBlocks(
			surfaceDocument,
			PHOTON_PAGE_SURFACE_REGION_KEY,
		) ?? [];

	const pageDocument: PhotonDocument = {
		id: surfaceDocument.id,
		name: surfaceDocument.name,
		route: surfaceDocument.route,
		updatedAt: surfaceDocument.updatedAt,
		blocks: clonePhotonValue(
			removeDuplicatedPhotonSiteShellBlocks(pageBlocks, site),
		),
	};

	const nextRegions = Object.fromEntries(
		Object.entries(site.regions).map(([regionKey, region]) => {
			const regionBlocks =
				getPhotonSurfaceRegionBlocks(surfaceDocument, regionKey) ?? [];
			const fallbackDocument =
				region.document ??
				createPhotonEmptyDocument(
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
						blocks: clonePhotonValue(regionBlocks),
					},
				} satisfies PhotonSiteRegion,
			];
		}),
	);

	return {
		pageDocument,
		site: {
			settings: clonePhotonValue(site.settings),
			regions: nextRegions,
		},
	};
};

export const getPhotonSurfaceRegionBlocks = (
	document: PhotonDocument,
	regionKey: string,
): PhotonBlock[] | null => {
	const block = document.blocks.find((candidate) =>
		isPhotonSurfaceRegionBlock(candidate, regionKey),
	);
	const area = block ? getPhotonSurfaceRegionArea(block) : null;

	return area ? area.blocks : null;
};

export const getPhotonSurfaceRegionListId = (regionKey: string) =>
	createPhotonAreaListId(
		createPhotonSurfaceRegionBlockId(regionKey),
		PHOTON_SURFACE_REGION_AREA_ID,
	);

const findFirstEditableBlockId = (
	blocks: PhotonBlock[],
): string | null => {
	for (const block of blocks) {
		if (isPhotonSurfaceRegionBlock(block)) {
			const area = getPhotonSurfaceRegionArea(block);
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

export const getFirstPhotonSurfaceEditableBlockId = (
	document: PhotonDocument,
): string | null => findFirstEditableBlockId(document.blocks);

const resolvePhotonSurfaceRegionFromBlocks = (
	blocks: PhotonBlock[],
	blockId: string,
	listId: string,
	currentRegion: string | null,
): string | null => {
	for (const block of blocks) {
		const nextRegion = isPhotonSurfaceRegionBlock(block)
			? ((block.props.regionKey as string | undefined) ?? currentRegion)
			: currentRegion;

		if (block.id === blockId) {
			return nextRegion;
		}

		for (const area of block.areas ?? []) {
			const areaListId = createPhotonAreaListId(block.id, area.id);

			if (areaListId === listId) {
				return nextRegion;
			}

			const nested = resolvePhotonSurfaceRegionFromBlocks(
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

export const resolvePhotonSurfaceRegionForBlockId = (
	document: PhotonDocument,
	blockId: string,
): string | null =>
	resolvePhotonSurfaceRegionFromBlocks(
		document.blocks,
		blockId,
		"__unknown__",
		null,
	);

export const resolvePhotonSurfaceRegionForListId = (
	document: PhotonDocument,
	listId: string,
): string | null =>
	resolvePhotonSurfaceRegionFromBlocks(
		document.blocks,
		"__unknown__",
		listId,
		null,
	);
