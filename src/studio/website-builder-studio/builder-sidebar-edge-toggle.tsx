"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BuilderSidebarEdgeToggleProps = {
	side: "left" | "right";
	dockHeight: number;
	onExpand: () => void;
};

export const BuilderSidebarEdgeToggle = ({
	side,
	dockHeight,
	onExpand,
}: BuilderSidebarEdgeToggleProps) => {
	return (
		<div
			className={clsx(
				"fixed bottom-0 z-20 hidden lg:block",
				side === "left" ? "left-0 w-5" : "right-0 w-5",
			)}
			style={{
				top: dockHeight,
			}}
		>
			<div className="group relative h-full w-full">
				<button
					type="button"
					aria-label={`Expand ${side} sidebar`}
					onClick={onExpand}
					className={clsx(
						"absolute top-6 rounded-full border p-2 shadow-[var(--wb-builder-shadow)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
						side === "left"
							? "-left-10 group-hover:translate-x-9"
							: "-right-10 group-hover:-translate-x-9",
					)}
					style={{
						borderColor: "var(--wb-builder-border)",
						background: "var(--wb-builder-panel-solid)",
						color: "var(--wb-builder-text-muted)",
					}}
				>
					{side === "left" ? (
						<ChevronRight className="h-4 w-4" />
					) : (
						<ChevronLeft className="h-4 w-4" />
					)}
				</button>
			</div>
		</div>
	);
};
