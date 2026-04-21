"use client";

import {
	type CSSProperties,
	createElement,
	type ElementType,
	type ReactNode,
} from "react";
import { getWebsiteBuilderSurfaceModeStyle } from "../helpers/surface-layout";
import type { WebsiteBuilderSurfaceMode } from "../types";

type WebsiteBuilderSurfaceSectionProps<T extends ElementType> = {
	as?: T;
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
	surfaceMode?: WebsiteBuilderSurfaceMode;
};

export const WebsiteBuilderSurfaceSection = <
	T extends ElementType = "section",
>({
	as,
	children,
	className,
	style,
	surfaceMode = "contained",
}: WebsiteBuilderSurfaceSectionProps<T>) => {
	const Component = as ?? "section";
	const surfaceStyle = getWebsiteBuilderSurfaceModeStyle(surfaceMode);

	return createElement(
		Component,
		{
			className,
			style: surfaceStyle ? { ...surfaceStyle, ...style } : style,
			"data-wb-surface-mode": surfaceMode,
		},
		children,
	);
};
