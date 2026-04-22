"use client";

import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { createInsertionZoneId } from "../shared";

type CanvasInsertZoneProps = {
	listId: string;
	index: number;
	builderEnabled: boolean;
	isActive: boolean;
	isDragging: boolean;
	isManual: boolean;
	isEmpty?: boolean;
	onActivate: () => void;
};

export const CanvasInsertZone = ({
	listId,
	index,
	builderEnabled,
	isActive,
	isDragging,
	isManual,
	isEmpty = false,
	onActivate,
}: CanvasInsertZoneProps) => {
	const { setNodeRef, isOver } = useDroppable({
		id: createInsertionZoneId(listId, index),
		data: {
			kind: "insert-zone",
			listId,
			index,
		},
		disabled: !builderEnabled || !isDragging,
	});

	if (!builderEnabled) {
		return null;
	}

	return (
		<div
			ref={setNodeRef}
			className={clsx(
				"relative flex items-center justify-center transition-[padding] duration-200 ease-out",
				isDragging ? "py-4" : "py-2",
				isEmpty && !isDragging && "py-4",
			)}
		>
			<div
				className={clsx(
					"absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-[22px] border border-dashed transition-[height,background-color,border-color,box-shadow] duration-200 ease-out",
					isDragging ? "h-14" : "h-6 border-transparent bg-transparent",
				)}
				style={{
					borderColor:
						isActive || isOver
							? "var(--photon-builder-border-strong)"
							: isManual
								? "var(--photon-builder-border)"
								: isDragging
									? "var(--photon-builder-border)"
									: "transparent",
					background:
						isActive || isOver
							? "var(--photon-builder-accent-strong)"
							: isManual
								? "color-mix(in srgb, var(--photon-builder-accent) 8%, transparent)"
								: isDragging
									? "var(--photon-builder-panel-muted)"
									: "transparent",
					boxShadow:
						isActive || isOver ? "var(--photon-builder-card-shadow)" : "none",
				}}
			/>
			<div
				className={clsx(
					"absolute inset-x-0 top-1/2 h-px -translate-y-1/2 transition",
				)}
				style={{
					background:
						isActive || isOver
							? "var(--photon-builder-border-strong)"
							: isManual
								? "var(--photon-builder-border)"
								: "var(--photon-builder-border)",
				}}
			/>
			<button
				type="button"
				onClick={onActivate}
				className={clsx(
					"relative z-10 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition duration-200",
					isDragging && "px-4 py-2",
				)}
				style={{
					borderColor:
						isActive || isOver
							? "var(--photon-builder-border-strong)"
							: isManual
								? "var(--photon-builder-border)"
								: "var(--photon-builder-border)",
					background:
						isActive || isOver
							? "var(--photon-builder-accent-soft)"
							: isManual
								? "color-mix(in srgb, var(--photon-builder-accent) 10%, var(--photon-builder-panel-solid))"
								: "var(--photon-builder-panel-solid)",
					color:
						isActive || isOver
							? "var(--photon-builder-accent-text)"
							: isManual
								? "var(--photon-builder-text)"
								: "var(--photon-builder-text-muted)",
				}}
			>
				<Plus className="h-3.5 w-3.5" />
				{isEmpty
					? isDragging
						? "Drop first block here"
						: "Insert first block"
					: isDragging
						? "Drop block here"
						: "Insert here"}
			</button>
		</div>
	);
};
