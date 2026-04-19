"use client";

import type { WebsiteBuilderBlock } from "../../types";

export const CollapsedBlockPreview = ({
	block,
}: {
	block: WebsiteBuilderBlock;
}) => {
	return (
		<div
			className="rounded-[28px] border border-dashed px-5 py-5 text-sm"
			style={{
				borderColor: "var(--wb-builder-border)",
				background: "var(--wb-builder-panel-muted)",
				color: "var(--wb-builder-text-muted)",
			}}
		>
			<div
				className="font-semibold"
				style={{ color: "var(--wb-builder-text)" }}
			>
				{block.type}
			</div>
			<div
				className="mt-2"
				style={{ color: "var(--wb-builder-text-soft)" }}
			>
				{block.areas?.length
					? `${block.areas.length} layout area${block.areas.length > 1 ? "s" : ""} hidden while collapsed.`
					: "Collapsed to keep the canvas compact while you work on neighboring sections."}
			</div>
		</div>
	);
};
