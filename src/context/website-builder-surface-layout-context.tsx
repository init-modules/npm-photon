"use client";

import {
	createContext,
	useContext,
	type ReactNode,
} from "react";
import { getWebsiteBuilderSurfaceModeStyle } from "../helpers/surface-layout";

export type WebsiteBuilderSurfaceLayoutMetrics = {
	builderEnabled: boolean;
	kind: "page" | "site";
	regionKey: string;
	width: number;
};

const WebsiteBuilderSurfaceLayoutContext =
	createContext<WebsiteBuilderSurfaceLayoutMetrics | null>(null);

export const WebsiteBuilderSurfaceLayoutProvider = ({
	children,
	value,
}: {
	children: ReactNode;
	value: WebsiteBuilderSurfaceLayoutMetrics;
}) => (
	<WebsiteBuilderSurfaceLayoutContext.Provider value={value}>
		{children}
	</WebsiteBuilderSurfaceLayoutContext.Provider>
);

export const useWebsiteBuilderSurfaceLayoutMetrics = () =>
	useContext(WebsiteBuilderSurfaceLayoutContext);

export const useWebsiteBuilderSurfaceBreakpoints = () => {
	const metrics = useWebsiteBuilderSurfaceLayoutMetrics();
	const width = metrics?.width ?? 0;

	return {
		width,
		atLeastSm: width >= 640,
		atLeastMd: width >= 768,
		atLeastLg: width >= 1024,
		atLeastXl: width >= 1280,
	};
};
export { getWebsiteBuilderSurfaceModeStyle };
