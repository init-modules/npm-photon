import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
export { P as PhotonStudio } from './photon-studio-CFXoMCmR.js';
export { g as getPhotonSurfaceModeStyle } from './surface-layout-C7tcEvSp.js';
import './types-1-bZpAzJ.js';

type PhotonSurfaceLayoutMetrics = {
    builderEnabled: boolean;
    kind: "page" | "site";
    regionKey: string;
    width: number;
};
declare const PhotonSurfaceLayoutProvider: ({ children, value, }: {
    children: ReactNode;
    value: PhotonSurfaceLayoutMetrics;
}) => react_jsx_runtime.JSX.Element;
declare const usePhotonSurfaceLayoutMetrics: () => PhotonSurfaceLayoutMetrics | null;
declare const usePhotonSurfaceBreakpoints: () => {
    width: number;
    atLeastSm: boolean;
    atLeastMd: boolean;
    atLeastLg: boolean;
    atLeastXl: boolean;
};

export { type PhotonSurfaceLayoutMetrics, PhotonSurfaceLayoutProvider, usePhotonSurfaceBreakpoints, usePhotonSurfaceLayoutMetrics };
