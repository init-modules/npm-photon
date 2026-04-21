"use client";

import { Fragment, memo } from "react";
import { WebsiteBuilderBlockRenderer } from "../../components/block-renderer";
import { useWebsiteBuilderStore } from "../../context/website-builder-context";
import {
	useWebsiteBuilderRenderDepth,
	WebsiteBuilderRenderDepthProvider,
} from "../../context/website-builder-render-depth-context";
import { createWebsiteBuilderAreaListId } from "../../helpers/tree";
import { useWebsiteBuilderI18n } from "../../i18n/website-builder-i18n-context";
import type { WebsiteBuilderBlock } from "../../types";
import { matchesTarget } from "../shared";
import type { InsertTarget } from "../types";
import { CanvasBlockList } from "./canvas-block-list";
import { CanvasBlockShell } from "./canvas-block-shell";
import { CanvasInsertZone } from "./canvas-insert-zone";
import { CollapsedBlockPreview } from "./collapsed-block-preview";

type CanvasBlockItemProps = {
	block: WebsiteBuilderBlock;
	index: number;
	listId: string;
	builderEnabled: boolean;
	collapseControlsEnabled: boolean;
	respectsCollapsedState: boolean;
	isDragging: boolean;
	manualInsertTarget: InsertTarget | null;
	dropTarget: InsertTarget | null;
	onActivateInsertTarget: (target: InsertTarget | null) => void;
};

const CanvasBlockItemComponent = ({
	block,
	index,
	listId,
	builderEnabled,
	collapseControlsEnabled,
	respectsCollapsedState,
	isDragging,
	manualInsertTarget,
	dropTarget,
	onActivateInsertTarget,
}: CanvasBlockItemProps) => {
	const renderDepth = useWebsiteBuilderRenderDepth();
	const { translate } = useWebsiteBuilderI18n();
	const registry = useWebsiteBuilderStore((state) => state.registry);
	const isSelected = useWebsiteBuilderStore(
		(state) => state.selectedBlockId === block.id,
	);
	const isCollapsed = useWebsiteBuilderStore((state) =>
		Boolean(state.collapsedBlockIds[block.id]),
	);
	const selectBlock = useWebsiteBuilderStore((state) => state.selectBlock);
	const duplicateBlock = useWebsiteBuilderStore(
		(state) => state.duplicateBlock,
	);
	const removeBlock = useWebsiteBuilderStore((state) => state.removeBlock);
	const toggleBlockCollapse = useWebsiteBuilderStore(
		(state) => state.toggleBlockCollapse,
	);
	const definition = registry.getDefinition(block.module, block.type);
	const chromeStyle =
		definition?.category === "Site Frame" ? "edge-to-edge" : "default";

	return (
		<Fragment>
			<CanvasBlockShell
				block={block}
				blockLabel={translate(
					definition?.labelKey ?? definition?.label ?? block.type,
					definition?.label ?? block.type,
				)}
				blockModule={block.module}
				chromeStyle={chromeStyle}
				builderEnabled={builderEnabled}
				collapseControlsEnabled={collapseControlsEnabled}
				isSelected={isSelected}
				isCollapsed={respectsCollapsedState && isCollapsed}
				onDuplicate={() => duplicateBlock(block.id)}
				onDelete={() => removeBlock(block.id)}
				onSelect={() => selectBlock(block.id)}
				onToggleCollapse={() => toggleBlockCollapse(block.id)}
			>
				{respectsCollapsedState && isCollapsed ? (
					<CollapsedBlockPreview block={block} />
				) : (
					<WebsiteBuilderBlockRenderer
						block={block}
						renderArea={(area) => (
							<WebsiteBuilderRenderDepthProvider value={renderDepth + 1}>
								<CanvasBlockList
									blocks={area.blocks}
									listId={createWebsiteBuilderAreaListId(block.id, area.id)}
									builderEnabled={builderEnabled}
									collapseControlsEnabled={collapseControlsEnabled}
									respectsCollapsedState={respectsCollapsedState}
									isDragging={isDragging}
									manualInsertTarget={manualInsertTarget}
									dropTarget={dropTarget}
									onActivateInsertTarget={onActivateInsertTarget}
								/>
							</WebsiteBuilderRenderDepthProvider>
						)}
					/>
				)}
			</CanvasBlockShell>
			<CanvasInsertZone
				listId={listId}
				index={index + 1}
				builderEnabled={builderEnabled}
				isActive={matchesTarget(dropTarget, listId, index + 1)}
				isDragging={isDragging}
				isManual={matchesTarget(manualInsertTarget, listId, index + 1)}
				onActivate={() => onActivateInsertTarget({ listId, index: index + 1 })}
			/>
		</Fragment>
	);
};

export const CanvasBlockItem = memo(CanvasBlockItemComponent);
