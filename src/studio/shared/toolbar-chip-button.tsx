"use client";

import type { ReactNode } from "react";

export const ToolbarChipButton = ({
	children,
	onClick,
}: {
	children: ReactNode;
	onClick: () => void;
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition"
			style={{
				borderColor: "var(--photon-builder-border)",
				background: "var(--photon-builder-panel-solid)",
				color: "var(--photon-builder-text-soft)",
			}}
		>
			{children}
		</button>
	);
};
