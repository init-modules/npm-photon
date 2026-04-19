"use client";

import type { WebsiteBuilderBlock } from "../../types";

export const BlockOverlayCard = ({ block }: { block: WebsiteBuilderBlock }) => {
	return (
		<div
			className="rounded-[24px] border px-4 py-4 text-sm backdrop-blur-xl"
			style={{
				borderColor: "var(--wb-builder-border-strong)",
				background:
					"var(--wb-builder-card-highlight), linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
				color: "var(--wb-builder-text)",
				boxShadow: "var(--wb-builder-shadow)",
			}}
		>
			<div
				className="text-[11px] uppercase tracking-[0.28em]"
				style={{ color: "var(--wb-builder-text-soft)" }}
			>
				{block.module}
			</div>
			<div className="mt-2 font-semibold">{block.type}</div>
			<div
				className="mt-1"
				style={{ color: "var(--wb-builder-text-muted)" }}
			>
				Move block into any visible insert zone.
			</div>
		</div>
	);
};
