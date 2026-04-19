"use client";

import { Boxes } from "lucide-react";
import { STUDIO_ICONS } from "../shared";
import type { PaletteDefinition } from "../types";

export const PaletteOverlayCard = ({
	definition,
}: {
	definition: PaletteDefinition;
}) => {
	const Icon =
		STUDIO_ICONS[definition.icon as keyof typeof STUDIO_ICONS] ?? Boxes;

	return (
		<div
			className="w-[13.5rem] min-w-[13.5rem] max-w-[13.5rem] overflow-hidden rounded-[30px] border px-3.5 py-3.5 text-left backdrop-blur-xl"
			style={{
				borderColor: "var(--wb-builder-border-strong)",
				background:
					"var(--wb-builder-card-highlight), linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
				color: "var(--wb-builder-text)",
				boxShadow: "var(--wb-builder-shadow)",
			}}
		>
			<div className="flex items-center gap-3">
				<div
					className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[20px] border"
					style={{
						borderColor: "var(--wb-builder-border)",
						background: "var(--wb-builder-field)",
						color: "var(--wb-builder-accent)",
					}}
				>
					<Icon className="h-4 w-4" />
				</div>
				<div className="min-w-0 flex-1">
					<div
						className="text-[10px] uppercase tracking-[0.26em]"
						style={{ color: "var(--wb-builder-text-soft)" }}
					>
						{definition.category}
					</div>
					<div className="mt-1 truncate text-[1.05rem] font-semibold leading-6">
						{definition.label}
					</div>
					<div
						className="mt-2 text-[10px] uppercase tracking-[0.26em]"
						style={{ color: "var(--wb-builder-text-ghost)" }}
					>
						{definition.module}
					</div>
				</div>
			</div>
		</div>
	);
};
