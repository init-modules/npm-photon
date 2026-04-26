import type {
	PhotonArea,
	PhotonBlock,
	PhotonComponentLibraryItem,
	PhotonComponentLibrarySettings,
	PhotonComponentLibraryUsage,
	PhotonComponentReferenceProps,
	PhotonDocument,
	PhotonSiteSettings,
} from "../types";
import { clonePhotonValue, isRecord } from "./path";
import { createPhotonNodeId } from "./node-id";

export const PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY = "componentLibrary";
export const PHOTON_COMPONENT_REFERENCE_MODULE = "photon-system";
export const PHOTON_COMPONENT_REFERENCE_TYPE = "component-reference";
export const PHOTON_COMPONENT_REFERENCE_AREA_ID = "content";
export const PHOTON_COMPONENT_REFERENCE_MAX_DEPTH = 8;

const COMPONENT_BLOCK_ID_PREFIX = "__photon_component_block__";

const normalizeItem = (
	key: string,
	item: Record<string, unknown>,
): PhotonComponentLibraryItem | null => {
	const id = typeof item.id === "string" && item.id.trim() ? item.id : key;
	const label =
		typeof item.label === "string" && item.label.trim() ? item.label : id;
	const blocks = Array.isArray(item.blocks)
		? (item.blocks.filter(isRecord) as PhotonBlock[])
		: [];

	if (blocks.length === 0) {
		return null;
	}

	return {
		...(item as PhotonComponentLibraryItem),
		id,
		label,
		blocks,
	};
};

const createItemId = (label: string) => {
	const slug = label
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 48);

	return `component:${slug || "item"}:${Date.now().toString(36)}`;
};

const encodePart = (value: string) => encodeURIComponent(value);
const decodePart = (value: string) => {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
};

export const readPhotonComponentLibrarySettings = (
	siteSettings: PhotonSiteSettings | undefined,
): PhotonComponentLibrarySettings => {
	const rawSettings = siteSettings?.[PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY];

	if (!isRecord(rawSettings) || !isRecord(rawSettings.items)) {
		return {};
	}

	return {
		items: Object.fromEntries(
			Object.entries(rawSettings.items)
				.map(([key, item]) => (isRecord(item) ? normalizeItem(key, item) : null))
				.filter((item): item is PhotonComponentLibraryItem => Boolean(item))
				.map((item) => [item.id, item]),
		),
	};
};

export const getPhotonComponentLibraryItems = (
	siteSettings: PhotonSiteSettings | undefined,
): Record<string, PhotonComponentLibraryItem> =>
	readPhotonComponentLibrarySettings(siteSettings).items ?? {};

export const isPhotonComponentReferenceBlock = (
	block: PhotonBlock,
): block is PhotonBlock<PhotonComponentReferenceProps> =>
	block.module === PHOTON_COMPONENT_REFERENCE_MODULE &&
	block.type === PHOTON_COMPONENT_REFERENCE_TYPE &&
	typeof block.props.itemId === "string" &&
	block.props.itemId.trim() !== "";

export const createPhotonComponentReferenceBlock = (
	item: Pick<PhotonComponentLibraryItem, "id" | "label">,
): PhotonBlock<PhotonComponentReferenceProps> => ({
	id: createPhotonNodeId(),
	module: PHOTON_COMPONENT_REFERENCE_MODULE,
	type: PHOTON_COMPONENT_REFERENCE_TYPE,
	props: {
		itemId: item.id,
		label: item.label,
	},
});

export const parsePhotonComponentLibraryBlockId = (
	blockId: string,
):
	| {
			itemId: string;
			referenceBlockId: string;
			sourceBlockId: string;
	  }
	| null => {
	if (!blockId.startsWith(`${COMPONENT_BLOCK_ID_PREFIX}:`)) {
		return null;
	}

	const [, itemId, referenceBlockId, sourceBlockId] = blockId.split(":");

	if (!itemId || !referenceBlockId || !sourceBlockId) {
		return null;
	}

	return {
		itemId: decodePart(itemId),
		referenceBlockId: decodePart(referenceBlockId),
		sourceBlockId: decodePart(sourceBlockId),
	};
};

export const createPhotonComponentLibraryBlockId = ({
	itemId,
	referenceBlockId,
	sourceBlockId,
}: {
	itemId: string;
	referenceBlockId: string;
	sourceBlockId: string;
}) =>
	[
		COMPONENT_BLOCK_ID_PREFIX,
		encodePart(itemId),
		encodePart(referenceBlockId),
		encodePart(sourceBlockId),
	].join(":");

const remapAreas = (
	areas: PhotonArea[] | undefined,
	itemId: string,
	referenceBlockId: string,
): PhotonArea[] | undefined => {
	if (!areas?.length) {
		return undefined;
	}

	return areas.map((area) => ({
		...area,
		blocks: area.blocks.map((block) =>
			remapPhotonComponentLibraryBlock(block, itemId, referenceBlockId),
		),
	}));
};

export const remapPhotonComponentLibraryBlock = (
	block: PhotonBlock,
	itemId: string,
	referenceBlockId: string,
): PhotonBlock => ({
	...clonePhotonValue(block),
	id: createPhotonComponentLibraryBlockId({
		itemId,
		referenceBlockId,
		sourceBlockId: block.id,
	}),
	areas: remapAreas(block.areas, itemId, referenceBlockId),
});

export const resolvePhotonComponentReferenceBlocks = ({
	block,
	siteSettings,
	stack = [],
}: {
	block: PhotonBlock<PhotonComponentReferenceProps>;
	siteSettings: PhotonSiteSettings | undefined;
	stack?: readonly string[];
}): PhotonBlock[] => {
	const itemId = block.props.itemId;
	const item = getPhotonComponentLibraryItems(siteSettings)[itemId];

	if (
		!item ||
		item.enabled === false ||
		stack.includes(item.id) ||
		stack.length >= PHOTON_COMPONENT_REFERENCE_MAX_DEPTH
	) {
		return [];
	}

	return item.blocks.map((sourceBlock) =>
		remapPhotonComponentLibraryBlock(sourceBlock, item.id, block.id),
	);
};

export const clonePhotonComponentLibraryBlocksForCopy = (
	item: PhotonComponentLibraryItem,
): PhotonBlock[] => item.blocks.map(clonePhotonComponentSourceBlockWithNewIds);

export const clonePhotonComponentSourceBlockWithNewIds = (
	block: PhotonBlock,
): PhotonBlock => ({
	id: createPhotonNodeId(),
	module: block.module,
	type: block.type,
	props: clonePhotonValue(block.props),
	bindings: clonePhotonValue(block.bindings),
	areas: block.areas?.map((area) => ({
		id: area.id,
		label: area.label,
		blocks: area.blocks.map(clonePhotonComponentSourceBlockWithNewIds),
	})),
});

export const createPhotonComponentLibraryItemFromBlock = (
	block: PhotonBlock,
	label?: string,
): PhotonComponentLibraryItem => {
	const resolvedLabel = label?.trim() || block.type;
	const now = new Date().toISOString();

	return {
		id: createItemId(resolvedLabel),
		label: resolvedLabel,
		blocks: [clonePhotonComponentSourceBlockWithNewIds(block)],
		createdAt: now,
		updatedAt: now,
	};
};

export const duplicatePhotonComponentLibraryItem = (
	item: PhotonComponentLibraryItem,
): PhotonComponentLibraryItem => {
	const label = `${item.label} copy`;
	const now = new Date().toISOString();

	return {
		...clonePhotonValue(item),
		id: createItemId(label),
		label,
		blocks: clonePhotonComponentLibraryBlocksForCopy(item),
		createdAt: now,
		updatedAt: now,
	};
};

const collectUsagesFromBlocks = (
	blocks: PhotonBlock[],
	path: string,
	source: NonNullable<PhotonComponentLibraryUsage["source"]>,
	regionKey?: string | null,
): PhotonComponentLibraryUsage[] =>
	blocks.flatMap((block, index) => {
		const blockPath = `${path}.${index}`;
		const surfaceRegionKey =
			block.module === "__photon_internal__" &&
			block.type === "surface-region" &&
			typeof block.props.regionKey === "string"
				? block.props.regionKey
				: null;
		const nextRegionKey = surfaceRegionKey ?? regionKey;
		const nextSource =
			source === "currentDocument" &&
			surfaceRegionKey &&
			surfaceRegionKey !== "page"
				? "siteFrame"
				: source;
		const ownUsage = isPhotonComponentReferenceBlock(block)
			? [
					{
						itemId: block.props.itemId,
						referenceBlockId: block.id,
						regionKey: nextRegionKey,
						path: blockPath,
						source: nextSource,
					},
				]
			: [];
		const nestedUsages = (block.areas ?? []).flatMap((area) =>
			collectUsagesFromBlocks(
				area.blocks,
				`${blockPath}.areas.${area.id}.blocks`,
				nextSource,
				nextRegionKey,
			),
		);

		return [...ownUsage, ...nestedUsages];
	});

export const collectPhotonComponentLibraryUsages = (
	document: PhotonDocument,
	source: NonNullable<PhotonComponentLibraryUsage["source"]> = "currentDocument",
): PhotonComponentLibraryUsage[] =>
	collectUsagesFromBlocks(document.blocks, "blocks", source);
