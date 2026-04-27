"use client";

import clsx from "clsx";
import { ChevronRight, History, LoaderCircle, Save } from "lucide-react";
import { useState } from "react";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "../../components/ui/context-menu";
import type { PhotonMode } from "../../types";
import { EditorResetDialog } from "./editor-reset-dialog";
import { getSaveButtonMeta } from "./get-save-button-meta";

type SaveState = "idle" | "saving" | "saved" | "error";

type EditorSaveButtonProps = {
	activeMode: PhotonMode;
	hasUnsavedChanges: boolean;
	collapsedBlockCount: number;
	saveState: SaveState;
	showCollapsedInPreview: boolean;
	onPreviewCollapsedChange: () => void;
	onReset: () => void;
	onSave: () => void;
};

export const EditorSaveButton = ({
	activeMode,
	hasUnsavedChanges,
	collapsedBlockCount,
	saveState,
	showCollapsedInPreview,
	onPreviewCollapsedChange,
	onReset,
	onSave,
}: EditorSaveButtonProps) => {
	const [resetDialogOpen, setResetDialogOpen] = useState(false);
	const meta = getSaveButtonMeta({
		activeMode,
		hasUnsavedChanges,
		saveState,
	});

	return (
		<>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<button
						type="button"
						onClick={onSave}
						data-testid="photon-editor-save"
						className={clsx(
							"inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,color] duration-200 ease-out",
							meta.className,
						)}
					>
						{saveState === "saving" ? (
							<LoaderCircle className="h-4 w-4 animate-spin" />
						) : (
							<Save className="h-4 w-4" />
						)}
						<span
							className={clsx("h-2.5 w-2.5 rounded-full", meta.dotClassName)}
						/>
						<span>{meta.label}</span>
					</button>
				</ContextMenuTrigger>

				<ContextMenuContent>
					<ContextMenuItem onSelect={onSave}>
						<Save className="mr-3 h-4 w-4 text-[color:var(--photon-builder-text-soft)]" />
						Save now
					</ContextMenuItem>

					<ContextMenuItem
						disabled={!hasUnsavedChanges}
						onSelect={() => {
							setResetDialogOpen(true);
						}}
					>
						<History className="mr-3 h-4 w-4 text-[color:var(--photon-builder-text-soft)]" />
						Revert local draft
					</ContextMenuItem>

					<ContextMenuSeparator />

					{activeMode === "preview" && collapsedBlockCount > 0 ? (
						<ContextMenuItem onSelect={onPreviewCollapsedChange}>
							<ChevronRight className="mr-3 h-4 w-4 rotate-90 text-[color:var(--photon-builder-text-soft)]" />
							{showCollapsedInPreview
								? "Show full layout"
								: "Show collapsed blocks"}
						</ContextMenuItem>
					) : null}
				</ContextMenuContent>
			</ContextMenu>

			<EditorResetDialog
				open={resetDialogOpen}
				onOpenChange={setResetDialogOpen}
				onConfirm={() => {
					setResetDialogOpen(false);
					onReset();
				}}
			/>
		</>
	);
};
