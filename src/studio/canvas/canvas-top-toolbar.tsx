"use client";

import clsx from "clsx";
import { ChevronDown, ChevronUp, History } from "lucide-react";
import type { ReactNode } from "react";
import { useWebsiteBuilderI18n } from "../../i18n/website-builder-i18n-context";
import { CanvasSurfaceModeToggle } from "./canvas-surface-mode-toggle";

type CanvasTopToolbarProps = {
	visible: boolean;
	surfaceMode: "canvas" | "settings";
	canReset: boolean;
	topOffset: number;
	leftOffset: number;
	rightOffset: number;
	onSurfaceModeChange: (value: "canvas" | "settings") => void;
	onReset: () => void;
	onCollapseAll: () => void;
	onExpandAll: () => void;
};

const CanvasTopToolbarButton = ({
	label,
	onClick,
	disabled = false,
	children,
}: {
	label: string;
	onClick: () => void;
	disabled?: boolean;
	children: ReactNode;
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			title={label}
			aria-label={label}
			className="group relative inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-[9px] border transition disabled:pointer-events-none disabled:opacity-35"
			style={{
				borderColor: "var(--wb-builder-border)",
				background: "var(--wb-builder-field)",
				color: "var(--wb-builder-text-muted)",
			}}
		>
			{children}
			<span
				className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border px-2 py-1 text-[10px] font-semibold opacity-0 transition duration-150 group-hover:-translate-y-0.5 group-hover:opacity-100"
				style={{
					borderColor: "var(--wb-builder-border)",
					background: "var(--wb-builder-panel-solid)",
					color: "var(--wb-builder-text)",
					boxShadow: "var(--wb-builder-shadow)",
				}}
			>
				{label}
			</span>
		</button>
	);
};

export const CanvasTopToolbar = ({
	visible,
	surfaceMode,
	canReset,
	topOffset,
	leftOffset,
	rightOffset,
	onSurfaceModeChange,
	onReset,
	onCollapseAll,
	onExpandAll,
}: CanvasTopToolbarProps) => {
	const { translate } = useWebsiteBuilderI18n();
	return (
		<div
			className={clsx(
				"pointer-events-none fixed z-40 hidden transition-[opacity,transform] duration-300 ease-out lg:block",
				visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
			)}
			style={{
				top: topOffset,
				left: leftOffset,
				right: rightOffset,
			}}
			data-testid="wb-canvas-toolbar"
		>
			<div
				className="border-b backdrop-blur-xl"
				style={{
					borderColor: "var(--wb-builder-border)",
					background:
						"linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
					boxShadow: "var(--wb-builder-shadow)",
				}}
			>
				<div className="flex h-10 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
					<CanvasSurfaceModeToggle
						value={surfaceMode}
						onChange={onSurfaceModeChange}
					/>

					<div
						className={clsx(
							"pointer-events-auto flex items-center gap-1 rounded-[12px] border p-1 transition-opacity duration-200",
							surfaceMode === "canvas"
								? "opacity-100"
								: "pointer-events-none opacity-35",
						)}
						style={{
							borderColor: "var(--wb-builder-border)",
							background: "var(--wb-builder-field)",
							boxShadow: "var(--wb-builder-shadow)",
						}}
					>
						<CanvasTopToolbarButton
							label={translate(
								"websiteBuilder.toolbar.revertDraft",
								"Revert local draft",
							)}
							onClick={onReset}
							disabled={!canReset || surfaceMode !== "canvas"}
						>
							<History className={clsx("h-[13px] w-[13px]")} />
						</CanvasTopToolbarButton>
						<CanvasTopToolbarButton
							label={translate(
								"websiteBuilder.toolbar.collapseAll",
								"Collapse all blocks",
							)}
							onClick={onCollapseAll}
							disabled={surfaceMode !== "canvas"}
						>
							<ChevronDown className="h-[13px] w-[13px]" />
						</CanvasTopToolbarButton>
						<CanvasTopToolbarButton
							label={translate(
								"websiteBuilder.toolbar.expandAll",
								"Expand all blocks",
							)}
							onClick={onExpandAll}
							disabled={surfaceMode !== "canvas"}
						>
							<ChevronUp className="h-[13px] w-[13px]" />
						</CanvasTopToolbarButton>
					</div>
				</div>
			</div>
		</div>
	);
};
