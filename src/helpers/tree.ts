import type {
	WebsiteBuilderArea,
	WebsiteBuilderBlock,
	WebsiteBuilderDocument,
} from "../types";
import { cloneWebsiteBuilderValue } from "./path";

export { cloneWebsiteBuilderValue } from "./path";

export const WEBSITE_BUILDER_ROOT_LIST_ID = "root";

export const createWebsiteBuilderAreaListId = (
	blockId: string,
	areaId: string,
) => `area:${blockId}:${areaId}`;

const randomSegment = () => Math.random().toString(36).slice(2, 10);

export const createWebsiteBuilderNodeId = () => `wb_${randomSegment()}`;

const cloneAreaTree = (
	areas: WebsiteBuilderArea[] | undefined,
): WebsiteBuilderArea[] | undefined => {
	if (!areas?.length) {
		return undefined;
	}

	return areas.map((area) => ({
		id: area.id,
		label: area.label,
		blocks: area.blocks.map(cloneWebsiteBuilderBlockTreeWithNewIds),
	}));
};

export const cloneWebsiteBuilderBlockTreeWithNewIds = <
	Props extends Record<string, unknown> = Record<string, unknown>,
>(
	block: WebsiteBuilderBlock<Props>,
): WebsiteBuilderBlock<Props> => ({
	id: createWebsiteBuilderNodeId(),
	module: block.module,
	type: block.type,
	props: cloneWebsiteBuilderValue(block.props),
	bindings: cloneWebsiteBuilderValue(block.bindings),
	areas: cloneAreaTree(block.areas),
});

export const getFirstWebsiteBuilderBlockId = (
	blocks: WebsiteBuilderBlock[],
): string | null => blocks[0]?.id ?? null;

export const findWebsiteBuilderBlock = (
	blocks: WebsiteBuilderBlock[],
	blockId: string,
): WebsiteBuilderBlock | null => {
	for (const block of blocks) {
		if (block.id === blockId) {
			return block;
		}

		for (const area of block.areas ?? []) {
			const nested = findWebsiteBuilderBlock(area.blocks, blockId);

			if (nested) {
				return nested;
			}
		}
	}

	return null;
};

export const collectBlockIds = (blocks: WebsiteBuilderBlock[]): string[] => {
	const ids: string[] = [];

	for (const block of blocks) {
		ids.push(block.id);

		for (const area of block.areas ?? []) {
			ids.push(...collectBlockIds(area.blocks));
		}
	}

	return ids;
};

type UpdateResult = {
	blocks: WebsiteBuilderBlock[];
	updated: boolean;
};

const updateBlocks = (
	blocks: WebsiteBuilderBlock[],
	blockId: string,
	updater: (block: WebsiteBuilderBlock) => WebsiteBuilderBlock,
): UpdateResult => {
	let updated = false;

	const nextBlocks = blocks.map((block) => {
		if (block.id === blockId) {
			updated = true;
			return updater(block);
		}

		if (!block.areas?.length) {
			return block;
		}

		let nestedUpdated = false;
		const nextAreas = block.areas.map((area) => {
			const result = updateBlocks(area.blocks, blockId, updater);

			if (!result.updated) {
				return area;
			}

			nestedUpdated = true;
			return {
				...area,
				blocks: result.blocks,
			};
		});

		if (!nestedUpdated) {
			return block;
		}

		updated = true;

		return {
			...block,
			areas: nextAreas,
		};
	});

	return {
		blocks: updated ? nextBlocks : blocks,
		updated,
	};
};

export const updateWebsiteBuilderBlockInDocument = (
	document: WebsiteBuilderDocument,
	blockId: string,
	updater: (block: WebsiteBuilderBlock) => WebsiteBuilderBlock,
) => {
	const result = updateBlocks(document.blocks, blockId, updater);

	return result.updated
		? {
				...document,
				blocks: result.blocks,
			}
		: document;
};

type RemoveResult = {
	blocks: WebsiteBuilderBlock[];
	removed: WebsiteBuilderBlock | null;
	sourceListId: string | null;
	sourceIndex: number;
};

const removeBlockFromList = (
	blocks: WebsiteBuilderBlock[],
	blockId: string,
	listId: string,
): RemoveResult => {
	const targetIndex = blocks.findIndex((block) => block.id === blockId);

	if (targetIndex >= 0) {
		return {
			blocks: blocks.filter((block) => block.id !== blockId),
			removed: blocks[targetIndex] ?? null,
			sourceListId: listId,
			sourceIndex: targetIndex,
		};
	}

	for (const block of blocks) {
		if (!block.areas?.length) {
			continue;
		}

		let areaChanged = false;
		const nextAreas = block.areas.map((area) => {
			const result = removeBlockFromList(
				area.blocks,
				blockId,
				createWebsiteBuilderAreaListId(block.id, area.id),
			);

			if (!result.removed) {
				return area;
			}

			areaChanged = true;

			return {
				...area,
				blocks: result.blocks,
				__removed: result.removed,
				__sourceListId: result.sourceListId,
				__sourceIndex: result.sourceIndex,
			} as WebsiteBuilderArea & {
				__removed: WebsiteBuilderBlock;
				__sourceListId: string;
				__sourceIndex: number;
			};
		});

		if (!areaChanged) {
			continue;
		}

		const areaWithPayload = nextAreas.find(
			(
				area,
			): area is WebsiteBuilderArea & {
				__removed: WebsiteBuilderBlock;
				__sourceListId: string;
				__sourceIndex: number;
			} => "__removed" in area,
		);

		return {
			blocks: blocks.map((candidate) =>
				candidate.id === block.id
					? {
							...candidate,
							areas: nextAreas.map((area) => {
								const {
									__removed,
									__sourceListId,
									__sourceIndex,
									...cleanArea
								} = area as WebsiteBuilderArea & {
									__removed?: WebsiteBuilderBlock;
									__sourceListId?: string;
									__sourceIndex?: number;
								};

								return cleanArea;
							}),
						}
					: candidate,
			),
			removed: areaWithPayload?.__removed ?? null,
			sourceListId: areaWithPayload?.__sourceListId ?? null,
			sourceIndex: areaWithPayload?.__sourceIndex ?? -1,
		};
	}

	return {
		blocks,
		removed: null,
		sourceListId: null,
		sourceIndex: -1,
	};
};

const insertIntoList = (
	blocks: WebsiteBuilderBlock[],
	block: WebsiteBuilderBlock,
	index: number,
) => {
	const nextBlocks = [...blocks];
	const safeIndex = Math.min(Math.max(index, 0), nextBlocks.length);

	nextBlocks.splice(safeIndex, 0, block);

	return nextBlocks;
};

type InsertResult = {
	blocks: WebsiteBuilderBlock[];
	inserted: boolean;
};

const insertIntoListTree = (
	blocks: WebsiteBuilderBlock[],
	listId: string,
	block: WebsiteBuilderBlock,
	index: number,
): InsertResult => {
	if (listId === WEBSITE_BUILDER_ROOT_LIST_ID) {
		return {
			blocks: insertIntoList(blocks, block, index),
			inserted: true,
		};
	}

	let inserted = false;
	const nextBlocks = blocks.map((candidate) => {
		if (!candidate.areas?.length) {
			return candidate;
		}

		const nextAreas = candidate.areas.map((area) => {
			const areaListId = createWebsiteBuilderAreaListId(candidate.id, area.id);

			if (areaListId === listId) {
				inserted = true;

				return {
					...area,
					blocks: insertIntoList(area.blocks, block, index),
				};
			}

			const result = insertIntoListTree(area.blocks, listId, block, index);

			if (!result.inserted) {
				return area;
			}

			inserted = true;

			return {
				...area,
				blocks: result.blocks,
			};
		});

		return inserted
			? {
					...candidate,
					areas: nextAreas,
				}
			: candidate;
	});

	return {
		blocks: inserted ? nextBlocks : blocks,
		inserted,
	};
};

export const insertWebsiteBuilderBlockInDocument = (
	document: WebsiteBuilderDocument,
	listId: string,
	block: WebsiteBuilderBlock,
	index: number,
) => {
	const result = insertIntoListTree(document.blocks, listId, block, index);

	return result.inserted
		? {
				...document,
				blocks: result.blocks,
			}
		: document;
};

export const removeWebsiteBuilderBlockFromDocument = (
	document: WebsiteBuilderDocument,
	blockId: string,
) =>
	removeBlockFromList(document.blocks, blockId, WEBSITE_BUILDER_ROOT_LIST_ID);

export const duplicateWebsiteBuilderBlockInDocument = (
	document: WebsiteBuilderDocument,
	blockId: string,
) => {
	const target = findWebsiteBuilderBlock(document.blocks, blockId);

	if (!target) {
		return {
			document,
			duplicatedBlockId: null,
		};
	}

	const removeResult = removeBlockFromList(
		document.blocks,
		blockId,
		WEBSITE_BUILDER_ROOT_LIST_ID,
	);

	if (!removeResult.sourceListId || removeResult.sourceIndex < 0) {
		return {
			document,
			duplicatedBlockId: null,
		};
	}

	const clone = cloneWebsiteBuilderBlockTreeWithNewIds(target);
	const nextDocument = insertWebsiteBuilderBlockInDocument(
		document,
		removeResult.sourceListId,
		clone,
		removeResult.sourceIndex + 1,
	);

	return {
		document: nextDocument,
		duplicatedBlockId: clone.id,
	};
};

export const moveWebsiteBuilderBlockInDocument = (
	document: WebsiteBuilderDocument,
	blockId: string,
	targetListId: string,
	targetIndex: number,
) => {
	const removal = removeBlockFromList(
		document.blocks,
		blockId,
		WEBSITE_BUILDER_ROOT_LIST_ID,
	);

	if (!removal.removed || !removal.sourceListId || removal.sourceIndex < 0) {
		return document;
	}

	const targetLivesInsideRemovedTree = (
		block: WebsiteBuilderBlock,
		listId: string,
	): boolean => {
		for (const area of block.areas ?? []) {
			if (createWebsiteBuilderAreaListId(block.id, area.id) === listId) {
				return true;
			}

			if (
				area.blocks.some((child) => targetLivesInsideRemovedTree(child, listId))
			) {
				return true;
			}
		}

		return false;
	};

	if (targetLivesInsideRemovedTree(removal.removed, targetListId)) {
		return document;
	}

	const adjustedIndex =
		removal.sourceListId === targetListId && removal.sourceIndex < targetIndex
			? targetIndex - 1
			: targetIndex;

	const nextDocument = insertWebsiteBuilderBlockInDocument(
		{
			...document,
			blocks: removal.blocks,
		},
		targetListId,
		removal.removed,
		adjustedIndex,
	);

	return nextDocument;
};
