"use client";

import {
	type CSSProperties,
	createElement,
	type ElementType,
	type ReactNode,
} from "react";
import { getPhotonSurfaceModeStyle } from "../helpers/surface-layout";
import type { PhotonSurfaceMode } from "../types";

type PhotonSurfaceSectionProps<T extends ElementType> = {
	as?: T;
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
	surfaceMode?: PhotonSurfaceMode;
};

export const PhotonSurfaceSection = <
	T extends ElementType = "section",
>({
	as,
	children,
	className,
	style,
	surfaceMode = "contained",
}: PhotonSurfaceSectionProps<T>) => {
	const Component = as ?? "section";
	const surfaceStyle = getPhotonSurfaceModeStyle(surfaceMode);

	return createElement(
		Component,
		{
			className,
			style: surfaceStyle ? { ...surfaceStyle, ...style } : style,
			"data-photon-surface-mode": surfaceMode,
		},
		children,
	);
};
