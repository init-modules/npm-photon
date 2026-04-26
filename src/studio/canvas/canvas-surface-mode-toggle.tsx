"use client";

import clsx from "clsx";
import type { PhotonStudioSurfaceMode } from "../../types";

type CanvasSurfaceModeToggleProps = {
	value: PhotonStudioSurfaceMode;
	onChange: (value: PhotonStudioSurfaceMode) => void;
};

export const CanvasSurfaceModeToggle = ({
	value,
	onChange,
}: CanvasSurfaceModeToggleProps) => {
	return (
		<div
			className="pointer-events-auto inline-flex items-center gap-1 rounded-[14px] border p-1"
			style={{
				borderColor: "var(--photon-builder-border)",
				background: "var(--photon-builder-field)",
				boxShadow: "var(--photon-builder-shadow)",
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
				{
					key: "interactions" as const,
					label: "Interactions",
				},
				{
					key: "data" as const,
					label: "Data",
				},
			].map((option) => (
				<button
					key={option.key}
					type="button"
					onClick={() => onChange(option.key)}
					data-testid={`photon-canvas-surface-mode-${option.key}`}
					className={clsx(
						"cursor-pointer rounded-[10px] px-3 py-1.5 text-xs font-semibold transition",
					)}
					style={
						value === option.key
							? {
									background: "var(--photon-builder-accent-soft)",
									color: "var(--photon-builder-accent-text)",
								}
							: { color: "var(--photon-builder-text-muted)" }
					}
				>
					{option.label}
				</button>
			))}
		</div>
	);
};
