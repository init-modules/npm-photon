"use client";

import type { PhotonBlock } from "../../types";

export const BlockOverlayCard = ({ block }: { block: PhotonBlock }) => {
	return (
		<div
			className="rounded-[24px] border px-4 py-4 text-sm backdrop-blur-xl"
			style={{
				borderColor: "var(--photon-builder-border-strong)",
				background:
					"var(--photon-builder-card-highlight), linear-gradient(180deg, var(--photon-builder-panel-solid), var(--photon-builder-panel))",
				color: "var(--photon-builder-text)",
				boxShadow: "var(--photon-builder-shadow)",
			}}
		>
			<div
				className="text-[11px] uppercase tracking-[0.28em]"
				style={{ color: "var(--photon-builder-text-soft)" }}
			>
				{block.module}
			</div>
			<div className="mt-2 font-semibold">{block.type}</div>
			<div className="mt-1" style={{ color: "var(--photon-builder-text-muted)" }}>
				Move block into any visible insert zone.
			</div>
		</div>
	);
};
