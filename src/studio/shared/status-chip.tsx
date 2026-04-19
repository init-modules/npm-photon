"use client";

import type { ReactNode } from "react";

export const StatusChip = ({ children }: { children: ReactNode }) => {
	return (
		<div
			className="rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
			style={{
				borderColor: "var(--wb-builder-border)",
				background: "var(--wb-builder-panel-muted)",
				color: "var(--wb-builder-text-soft)",
			}}
		>
			{children}
		</div>
	);
};
