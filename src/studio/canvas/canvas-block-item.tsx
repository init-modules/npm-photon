"use client";

import { Fragment, memo } from "react";
import { PhotonBlockRenderer } from "../../components/block-renderer";
import { usePhotonStore } from "../../context/photon-context";
import {
	usePhotonRenderDepth,
	PhotonRenderDepthProvider,
} from "../../context/photon-render-depth-context";
import { createPhotonAreaListId } from "../../helpers/tree";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";
import type { PhotonBlock } from "../../types";
import { matchesTarget } from "../shared";
import type { InsertTarget } from "../types";
import { CanvasBlockList } from "./canvas-block-list";
import { CanvasBlockShell } from "./canvas-block-shell";
import { CanvasInsertZone } from "./canvas-insert-zone";
import { CollapsedBlockPreview } from "./collapsed-block-preview";

type CanvasBlockItemProps = {
	block: PhotonBlock;
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
	const renderDepth = usePhotonRenderDepth();
	const { translate } = usePhotonI18n();
	const registry = usePhotonStore((state) => state.registry);
	const isSelected = usePhotonStore(
		(state) => state.selectedBlockId === block.id,
	);
	const isCollapsed = usePhotonStore((state) =>
		Boolean(state.collapsedBlockIds[block.id]),
	);
	const selectBlock = usePhotonStore((state) => state.selectBlock);
	const duplicateBlock = usePhotonStore(
		(state) => state.duplicateBlock,
	);
	const removeBlock = usePhotonStore((state) => state.removeBlock);
	const toggleBlockCollapse = usePhotonStore(
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
					<PhotonBlockRenderer
						block={block}
						renderArea={(area) => (
							<PhotonRenderDepthProvider value={renderDepth + 1}>
								<CanvasBlockList
									blocks={area.blocks}
									listId={createPhotonAreaListId(block.id, area.id)}
									builderEnabled={builderEnabled}
									collapseControlsEnabled={collapseControlsEnabled}
									respectsCollapsedState={respectsCollapsedState}
									isDragging={isDragging}
									manualInsertTarget={manualInsertTarget}
									dropTarget={dropTarget}
									onActivateInsertTarget={onActivateInsertTarget}
								/>
							</PhotonRenderDepthProvider>
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
