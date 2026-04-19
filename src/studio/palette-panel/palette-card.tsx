"use client";

import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";
import { Boxes } from "lucide-react";
import { useEffect, useState } from "react";
import { useWebsiteBuilderI18n } from "../../i18n/website-builder-i18n-context";
import { STUDIO_ICONS } from "../shared";
import type { PaletteDefinition } from "../types";

type PaletteCardProps = {
	definition: PaletteDefinition;
	isSelected: boolean;
	onInsert: (definition: PaletteDefinition) => void;
	onSelect: (definition: PaletteDefinition) => void;
};

export const PaletteCard = ({
	definition,
	isSelected,
	onInsert,
	onSelect,
}: PaletteCardProps) => {
	const { translate } = useWebsiteBuilderI18n();
	const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
		id: definition.key,
		data: {
			kind: "palette",
			module: definition.module,
			type: definition.type,
			definitionKey: definition.key,
		},
	});
	const [hasMounted, setHasMounted] = useState(false);
	const Icon =
		STUDIO_ICONS[definition.icon as keyof typeof STUDIO_ICONS] ?? Boxes;

	useEffect(() => {
		setHasMounted(true);
	}, []);

	return (
		<button
			type="button"
			ref={hasMounted ? setNodeRef : undefined}
			{...(hasMounted ? attributes : {})}
			{...(hasMounted ? listeners : {})}
			onClick={() => onSelect(definition)}
			onDoubleClick={() => onInsert(definition)}
			data-wb-palette-card="true"
			className={clsx(
				"group flex w-full cursor-pointer items-center gap-3 rounded-[28px] border px-3.5 py-3.5 text-left transition duration-200",
				hasMounted && isDragging && "opacity-0",
			)}
			style={{
				borderColor: isSelected
					? "var(--wb-builder-border-strong)"
					: "var(--wb-builder-border)",
				background: isSelected
					? "var(--wb-builder-card-highlight), var(--wb-builder-card-selected)"
					: "var(--wb-builder-card)",
				color: "var(--wb-builder-text)",
				boxShadow: "var(--wb-builder-card-shadow)",
			}}
		>
			<div
				className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] border"
				style={{
					borderColor: isSelected
						? "var(--wb-builder-border-strong)"
						: "var(--wb-builder-border)",
					background: isSelected
						? "var(--wb-builder-accent-strong)"
						: "var(--wb-builder-field)",
					color: isSelected
						? "var(--wb-builder-accent)"
						: "var(--wb-builder-text-soft)",
					boxShadow: "var(--wb-builder-card-shadow)",
				}}
			>
				<Icon className="h-4 w-4" />
			</div>
			<div className="min-w-0 flex-1">
				<div
					className="truncate text-[15px] font-semibold"
					style={{ color: "var(--wb-builder-text)" }}
				>
					{translate(definition.labelKey ?? definition.label, definition.label)}
				</div>
			</div>
		</button>
	);
};
