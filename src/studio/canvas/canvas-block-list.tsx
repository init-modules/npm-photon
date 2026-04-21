"use client";

import type { WebsiteBuilderBlock } from "../../types";
import { matchesTarget } from "../shared";
import type { InsertTarget } from "../types";
import { CanvasBlockItem } from "./canvas-block-item";
import { CanvasInsertZone } from "./canvas-insert-zone";

type CanvasBlockListProps = {
	blocks: WebsiteBuilderBlock[];
	listId: string;
	builderEnabled: boolean;
	collapseControlsEnabled: boolean;
	respectsCollapsedState: boolean;
	isDragging: boolean;
	manualInsertTarget: InsertTarget | null;
	dropTarget: InsertTarget | null;
	onActivateInsertTarget: (target: InsertTarget | null) => void;
};

export const CanvasBlockList = ({
	blocks,
	listId,
	builderEnabled,
	collapseControlsEnabled,
	respectsCollapsedState,
	isDragging,
	manualInsertTarget,
	dropTarget,
	onActivateInsertTarget,
}: CanvasBlockListProps) => (
	<div className="space-y-[var(--wb-list-gap,0.75rem)]">
		<CanvasInsertZone
			listId={listId}
			index={0}
			builderEnabled={builderEnabled}
			isActive={matchesTarget(dropTarget, listId, 0)}
			isDragging={isDragging}
			isManual={matchesTarget(manualInsertTarget, listId, 0)}
			isEmpty={blocks.length === 0}
			onActivate={() => onActivateInsertTarget({ listId, index: 0 })}
		/>

		{blocks.map((block, index) => (
			<CanvasBlockItem
				key={block.id}
				block={block}
				index={index}
				listId={listId}
				builderEnabled={builderEnabled}
				collapseControlsEnabled={collapseControlsEnabled}
				respectsCollapsedState={respectsCollapsedState}
				isDragging={isDragging}
				manualInsertTarget={manualInsertTarget}
				dropTarget={dropTarget}
				onActivateInsertTarget={onActivateInsertTarget}
			/>
		))}
	</div>
);
