"use client";

import type { ReactNode } from "react";

export const StatusChip = ({ children }: { children: ReactNode }) => {
	return (
		<div
			data-testid="photon-status-chip"
			className="rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
			style={{
				borderColor: "var(--photon-builder-border)",
				background: "var(--photon-builder-panel-muted)",
				color: "var(--photon-builder-text-soft)",
			}}
		>
			{children}
		</div>
	);
};
