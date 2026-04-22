import type { CSSProperties } from "react";
import type { PhotonSurfaceMode } from "../types";

export const getPhotonSurfaceModeStyle = (
	mode: PhotonSurfaceMode,
): CSSProperties | undefined => {
	switch (mode) {
		case "bleed":
			return {
				marginInline: "calc(50% - 50cqw)",
				paddingInline:
					"max(calc((100cqw - var(--photon-site-max-width, 1280px)) / 2), var(--photon-site-gutter, 24px))",
			};
		case "full-viewport":
			return {
				marginInline: "calc(50% - 50cqw)",
			};
		case "contained":
		case "fixed-shell":
		default:
			return undefined;
	}
};
