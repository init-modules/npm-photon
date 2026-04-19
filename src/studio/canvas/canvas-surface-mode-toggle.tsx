"use client";

import clsx from "clsx";

type CanvasSurfaceModeToggleProps = {
	value: "canvas" | "settings";
	onChange: (value: "canvas" | "settings") => void;
};

export const CanvasSurfaceModeToggle = ({
	value,
	onChange,
}: CanvasSurfaceModeToggleProps) => {
	return (
		<div
			className="pointer-events-auto inline-flex items-center gap-1 rounded-[14px] border p-1"
			style={{
				borderColor: "var(--wb-builder-border)",
				background: "var(--wb-builder-field)",
				boxShadow: "var(--wb-builder-shadow)",
			}}
		>
			{[
				{
					key: "canvas" as const,
					label: "Canvas",
				},
				{
					key: "settings" as const,
					label: "Settings",
				},
			].map((option) => (
				<button
					key={option.key}
					type="button"
					onClick={() => onChange(option.key)}
					data-testid={`wb-canvas-surface-mode-${option.key}`}
					className={clsx(
						"cursor-pointer rounded-[10px] px-3 py-1.5 text-xs font-semibold transition",
					)}
					style={
						value === option.key
							? {
									background: "var(--wb-builder-accent-soft)",
									color: "var(--wb-builder-accent-text)",
								}
							: { color: "var(--wb-builder-text-muted)" }
					}
				>
					{option.label}
				</button>
			))}
		</div>
	);
};
