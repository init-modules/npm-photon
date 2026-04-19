"use client";

import clsx from "clsx";
import type { PointerEventHandler } from "react";

type BuilderSidebarResizeHandleProps = {
	side: "left" | "right";
	onPointerDown: PointerEventHandler<HTMLButtonElement>;
};

export const BuilderSidebarResizeHandle = ({
	side,
	onPointerDown,
}: BuilderSidebarResizeHandleProps) => {
	return (
		<button
			type="button"
			aria-label={`Resize ${side} sidebar`}
			onPointerDown={onPointerDown}
			className={clsx(
				"group absolute bottom-0 top-0 z-20 hidden w-6 cursor-col-resize touch-none lg:block",
				side === "left" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2",
			)}
		>
			<span className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 rounded-full bg-cyan-300/0 opacity-0 transition-[background-color,opacity] duration-200 delay-500 group-hover:bg-cyan-300/12 group-hover:opacity-100 group-focus-visible:bg-cyan-300/12 group-focus-visible:opacity-100 group-active:delay-0 group-active:bg-cyan-300/18 group-active:opacity-100" />
			<span className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 rounded-full bg-white/12 opacity-50 transition-[background-color,opacity] duration-200 delay-500 group-hover:bg-cyan-300/55 group-hover:opacity-100 group-focus-visible:bg-cyan-300/55 group-focus-visible:opacity-100 group-active:delay-0 group-active:bg-cyan-300/65 group-active:opacity-100" />
		</button>
	);
};
