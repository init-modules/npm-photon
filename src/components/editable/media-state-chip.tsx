"use client";

import clsx from "clsx";

export const MediaStateChip = ({
	children,
	tone = "neutral",
}: {
	children: string;
	tone?: "neutral" | "accent";
}) => (
	<div
		data-testid={
			tone === "accent" ? "photon-media-state-chip-accent" : "photon-media-state-chip"
		}
		className={clsx(
			"rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
		)}
		style={
			tone === "accent"
				? {
						borderColor:
							"var(--photon-gallery-chip-accent-border, rgba(34,211,238,0.16))",
						background:
							"var(--photon-gallery-chip-accent-bg, rgba(34,211,238,0.1))",
						color: "var(--photon-gallery-chip-accent-text, rgba(207,250,254,0.84))",
					}
				: {
						borderColor: "var(--photon-gallery-chip-border, rgba(255,255,255,0.1))",
						background: "var(--photon-gallery-chip-bg, rgba(255,255,255,0.03))",
						color: "var(--photon-gallery-chip-text, rgba(255,255,255,0.52))",
					}
		}
	>
		{children}
	</div>
);
