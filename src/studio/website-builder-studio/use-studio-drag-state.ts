"use client";

import type {
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import {
	resolveWebsiteBuilderSurfaceRegionForBlockId,
	resolveWebsiteBuilderSurfaceRegionForListId,
} from "../../helpers/site";
import { findWebsiteBuilderBlock } from "../../helpers/tree";
import type { WebsiteBuilderBlock, WebsiteBuilderDocument } from "../../types";
import { resolveInsertTarget } from "../shared";
import type { InsertTarget, PaletteDefinition } from "../types";

type UseStudioDragStateProps = {
	builderEnabled: boolean;
	document: WebsiteBuilderDocument;
	allPaletteBlocks: PaletteDefinition[];
	selectedBlockId: string | null;
	selectedBlock: WebsiteBuilderBlock | null;
	insertBlock: (input: {
		module: string;
		type: string;
		listId: string;
		index: number;
	}) => void;
	moveBlock: (blockId: string, listId: string, index: number) => void;
	selectBlock: (blockId: string | null) => void;
	onClearPaletteSelection: () => void;
};

type PaletteOverlayOrigin = {
	x: number;
	y: number;
} | null;

export const useStudioDragState = ({
	builderEnabled,
	document,
	allPaletteBlocks,
	selectedBlockId,
	selectedBlock,
	insertBlock,
	moveBlock,
	selectBlock,
	onClearPaletteSelection,
}: UseStudioDragStateProps) => {
	const [activePaletteKey, setActivePaletteKey] = useState<string | null>(null);
	const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
	const [activeDragKind, setActiveDragKind] = useState<
		"palette" | "block" | null
	>(null);
	const [dropTarget, setDropTarget] = useState<InsertTarget | null>(null);
	const [paletteOverlayOrigin, setPaletteOverlayOrigin] =
		useState<PaletteOverlayOrigin>(null);

	const activePaletteDefinition = activePaletteKey
		? (allPaletteBlocks.find(
				(definition) => definition.key === activePaletteKey,
			) ?? null)
		: null;
	const activeBlock =
		activeBlockId && activeBlockId === selectedBlockId
			? selectedBlock
			: activeBlockId
				? findWebsiteBuilderBlock(document.blocks, activeBlockId)
				: null;

	const handleDragStart = (event: DragStartEvent) => {
		const activeData = event.active.data.current;

		if (activeData?.kind === "palette") {
			setActiveDragKind("palette");
			setActivePaletteKey(String(activeData.definitionKey));
			const activatorTarget =
				event.activatorEvent.target instanceof HTMLElement
					? event.activatorEvent.target
					: null;
			const paletteCard = activatorTarget?.closest<HTMLElement>(
				"[data-wb-palette-card='true']",
			);
			const paletteCardRect = paletteCard?.getBoundingClientRect();
			setPaletteOverlayOrigin(
				paletteCardRect
					? {
							x: paletteCardRect.left,
							y: paletteCardRect.top,
						}
					: null,
			);
			return;
		}

		if (activeData?.kind === "block") {
			setActiveDragKind("block");
			const blockId = String(activeData.blockId);
			setActiveBlockId(blockId);
			onClearPaletteSelection();
			selectBlock(blockId);
		}
	};

	const handleDragOver = (event: DragOverEvent) => {
		const activeData = event.active.data.current;
		const candidate = resolveInsertTarget(event) ?? null;

		if (!candidate || activeData?.kind !== "block") {
			setDropTarget(candidate);
			return;
		}

		const sourceRegion = resolveWebsiteBuilderSurfaceRegionForBlockId(
			document,
			String(activeData.blockId),
		);
		const targetRegion = resolveWebsiteBuilderSurfaceRegionForListId(
			document,
			candidate.listId,
		);

		setDropTarget(
			sourceRegion !== null &&
				targetRegion !== null &&
				sourceRegion === targetRegion
				? candidate
				: null,
		);
	};

	const resetDragState = () => {
		setActiveDragKind(null);
		setActivePaletteKey(null);
		setActiveBlockId(null);
		setDropTarget(null);
		setPaletteOverlayOrigin(null);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const activeData = event.active.data.current;
		const candidateTarget = resolveInsertTarget(event) ?? dropTarget;
		const target =
			activeData?.kind !== "block" || !candidateTarget
				? candidateTarget
				: (() => {
						const sourceRegion = resolveWebsiteBuilderSurfaceRegionForBlockId(
							document,
							String(activeData.blockId),
						);
						const targetRegion = resolveWebsiteBuilderSurfaceRegionForListId(
							document,
							candidateTarget.listId,
						);

						return sourceRegion !== null &&
							targetRegion !== null &&
							sourceRegion === targetRegion
							? candidateTarget
							: null;
					})();

		if (target && activeData?.kind === "palette" && builderEnabled) {
			insertBlock({
				module: String(activeData.module),
				type: String(activeData.type),
				listId: target.listId,
				index: target.index,
			});
		}

		if (target && activeData?.kind === "block" && builderEnabled) {
			moveBlock(String(activeData.blockId), target.listId, target.index);
		}

		resetDragState();
	};

	return {
		activeBlock,
		activeDragKind,
		activePaletteDefinition,
		paletteOverlayOrigin,
		dropTarget,
		handleDragCancel: resetDragState,
		handleDragEnd,
		handleDragOver,
		handleDragStart,
	};
};
