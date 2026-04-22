"use client";

import { createContext, type ReactNode, useContext } from "react";
import { getPhotonSurfaceModeStyle } from "../helpers/surface-layout";

export type PhotonSurfaceLayoutMetrics = {
	builderEnabled: boolean;
	kind: "page" | "site";
	regionKey: string;
	width: number;
};

const PhotonSurfaceLayoutContext =
	createContext<PhotonSurfaceLayoutMetrics | null>(null);

export const PhotonSurfaceLayoutProvider = ({
	children,
	value,
}: {
	children: ReactNode;
	value: PhotonSurfaceLayoutMetrics;
}) => (
	<PhotonSurfaceLayoutContext.Provider value={value}>
		{children}
	</PhotonSurfaceLayoutContext.Provider>
);

export const usePhotonSurfaceLayoutMetrics = () =>
	useContext(PhotonSurfaceLayoutContext);

export const usePhotonSurfaceBreakpoints = () => {
	const metrics = usePhotonSurfaceLayoutMetrics();
	const width = metrics?.width ?? 0;

	return {
		width,
		atLeastSm: width >= 640,
		atLeastMd: width >= 768,
		atLeastLg: width >= 1024,
		atLeastXl: width >= 1280,
	};
};
export { getPhotonSurfaceModeStyle };
