"use client";

import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";
import {
	ChevronDown,
	ChevronUp,
	Copy,
	GripVertical,
	Trash2,
} from "lucide-react";
import { memo, type ReactNode, useEffect, useState } from "react";
import type { WebsiteBuilderBlock } from "../../types";

type CanvasBlockShellProps = {
	block: WebsiteBuilderBlock;
	blockLabel: string;
	blockModule: string;
	chromeStyle?: "default" | "edge-to-edge";
	builderEnabled: boolean;
	collapseControlsEnabled: boolean;
	isSelected: boolean;
	isCollapsed: boolean;
	onSelect: () => void;
	onDuplicate: () => void;
	onDelete: () => void;
	onToggleCollapse: () => void;
	children: ReactNode;
};

const CanvasBlockShellComponent = ({
	block,
	blockLabel,
	blockModule,
	chromeStyle = "default",
	builderEnabled,
	collapseControlsEnabled,
	isSelected,
	isCollapsed,
	onSelect,
	onDuplicate,
	onDelete,
	onToggleCollapse,
	children,
}: CanvasBlockShellProps) => {
	const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
		id: `block:${block.id}`,
		data: {
			kind: "block",
			blockId: block.id,
		},
		disabled: !builderEnabled,
	});
	const [hasMounted, setHasMounted] = useState(false);
	const chromeEnabled = builderEnabled || collapseControlsEnabled;
	const contentChromeOnly = collapseControlsEnabled && !builderEnabled;
	const edgeToEdgeChrome = chromeStyle === "edge-to-edge";

	useEffect(() => {
		setHasMounted(true);
	}, []);

	const chromeBorderClassName = clsx(
		"border transition",
		isSelected
			? "border-[color:var(--wb-builder-border-strong)] shadow-[0_0_0_1px_var(--wb-builder-accent-strong)]"
			: "border-[color:var(--wb-builder-border)] group-hover:border-[color:var(--wb-builder-border-strong)]",
	);

	const chromeBadges = builderEnabled ? (
		<>
			<div
				className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
				style={{
					borderColor: "var(--wb-builder-border)",
					background: "var(--wb-builder-panel-solid)",
					color: "var(--wb-builder-text-muted)",
				}}
			>
				{blockLabel}
			</div>
			<div
				className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]"
				style={{
					borderColor: "var(--wb-builder-border)",
					background: "var(--wb-builder-panel-solid)",
					color: "var(--wb-builder-text-ghost)",
				}}
			>
				{blockModule}
			</div>
		</>
	) : null;

	const chromeControls = chromeEnabled ? (
		<>
			<button
				type="button"
				onClick={(event) => {
					event.stopPropagation();
					onToggleCollapse();
				}}
				className="rounded-full border p-2 transition"
				style={{
					borderColor: "var(--wb-builder-border)",
					background: "var(--wb-builder-panel-solid)",
					color: "var(--wb-builder-text-muted)",
				}}
			>
				{isCollapsed ? (
					<ChevronDown className="h-4 w-4" />
				) : (
					<ChevronUp className="h-4 w-4" />
				)}
			</button>
			{builderEnabled ? (
				<>
					<button
						type="button"
						onClick={(event) => {
							event.stopPropagation();
							onDuplicate();
						}}
						className="rounded-full border p-2 transition"
						style={{
							borderColor: "var(--wb-builder-border)",
							background: "var(--wb-builder-panel-solid)",
							color: "var(--wb-builder-text-muted)",
						}}
					>
						<Copy className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={(event) => {
							event.stopPropagation();
							onDelete();
						}}
						className="rounded-full border p-2 transition"
						style={{
							borderColor: "var(--wb-builder-border)",
							background: "var(--wb-builder-panel-solid)",
							color: "var(--wb-builder-text-muted)",
						}}
					>
						<Trash2 className="h-4 w-4" />
					</button>
					<button
						type="button"
						{...(hasMounted ? attributes : {})}
						{...(hasMounted ? listeners : {})}
						onClick={(event) => event.stopPropagation()}
						className="rounded-full border p-2 transition"
						style={{
							borderColor: "var(--wb-builder-border)",
							background: "var(--wb-builder-panel-solid)",
							color: "var(--wb-builder-text-muted)",
						}}
					>
						<GripVertical className="h-4 w-4" />
					</button>
				</>
			) : null}
		</>
	) : null;

	if (edgeToEdgeChrome && chromeEnabled) {
		return (
			<article
				ref={hasMounted ? setNodeRef : undefined}
				role={chromeEnabled ? "button" : undefined}
				tabIndex={chromeEnabled ? 0 : undefined}
				onClick={chromeEnabled ? onSelect : undefined}
				onKeyDown={
					chromeEnabled
						? (event) => {
								if (event.key === "Enter" || event.key === " ") {
									event.preventDefault();
									onSelect();
								}
							}
						: undefined
				}
				className={clsx(
					"group relative transition duration-200",
					chromeEnabled && "cursor-default",
					hasMounted && isDragging && "opacity-0",
				)}
			>
				{chromeEnabled ? (
					<div className="mb-3 flex items-start justify-between gap-3">
						<div className="pointer-events-none flex min-h-10 max-w-[70%] flex-wrap items-center gap-2">
							{chromeBadges}
						</div>
						<div className="relative z-10 flex shrink-0 items-center gap-2">
							{chromeControls}
						</div>
					</div>
				) : null}

				<div
					className={clsx(
						"relative overflow-hidden rounded-[28px]",
						chromeBorderClassName,
					)}
				>
					{children}
				</div>
			</article>
		);
	}

	return (
		<article
			ref={hasMounted ? setNodeRef : undefined}
			role={chromeEnabled ? "button" : undefined}
			tabIndex={chromeEnabled ? 0 : undefined}
			onClick={chromeEnabled ? onSelect : undefined}
			onKeyDown={
				chromeEnabled
					? (event) => {
							if (event.key === "Enter" || event.key === " ") {
								event.preventDefault();
								onSelect();
							}
						}
					: undefined
			}
			className={clsx(
				"group relative transition duration-200",
				chromeEnabled && "cursor-default",
				hasMounted && isDragging && "opacity-0",
			)}
		>
			{chromeEnabled ? (
				<div
					className={clsx(
						"pointer-events-none absolute inset-0 rounded-[36px] border transition",
						chromeBorderClassName,
					)}
				/>
			) : null}

			{builderEnabled ? (
				<div className="pointer-events-none absolute left-5 top-5 z-10 flex max-w-[70%] flex-wrap items-center gap-2">
					{chromeBadges}
				</div>
			) : null}

			{chromeEnabled ? (
				<div className="absolute right-5 top-5 z-10 flex items-center gap-2">
					{chromeControls}
				</div>
			) : null}

			<div
				className={clsx(
					builderEnabled &&
						(edgeToEdgeChrome
							? "px-0 pb-0 pt-0"
							: "overflow-hidden rounded-[36px] px-4 pb-4 pt-16 sm:px-5 sm:pb-5 sm:pt-[4.75rem]"),
					contentChromeOnly &&
						(edgeToEdgeChrome
							? "px-0 pb-0 pt-0"
							: "overflow-hidden rounded-[36px] px-4 pb-4 pt-6 sm:px-5 sm:pb-5 sm:pt-7"),
				)}
			>
				{children}
			</div>
		</article>
	);
};

export const CanvasBlockShell = memo(CanvasBlockShellComponent);
