"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

export const ToolbarButton = ({
	children,
	onClick,
	disabled = false,
	className,
}: {
	children: ReactNode;
	onClick: () => void;
	disabled?: boolean;
	className?: string;
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				"inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-45",
				"border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] text-[color:var(--photon-builder-text-muted)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)] hover:text-[color:var(--photon-builder-text)]",
				className,
			)}
		>
			{children}
		</button>
	);
};
