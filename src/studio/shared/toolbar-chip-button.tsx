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
				borderColor: "var(--wb-builder-border)",
				background: "var(--wb-builder-panel-solid)",
				color: "var(--wb-builder-text-soft)",
			}}
		>
			{children}
		</button>
	);
};
