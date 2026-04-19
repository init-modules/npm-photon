export { W as WebsiteBuilderStudio } from './website-builder-studio-C6CAL69K.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
export { g as getWebsiteBuilderSurfaceModeStyle } from './surface-layout-BupNtOm_.js';
import './types-q9w-WbBC.js';

type WebsiteBuilderSurfaceLayoutMetrics = {
    builderEnabled: boolean;
    kind: "page" | "site";
    regionKey: string;
    width: number;
};
declare const WebsiteBuilderSurfaceLayoutProvider: ({ children, value, }: {
    children: ReactNode;
    value: WebsiteBuilderSurfaceLayoutMetrics;
}) => react_jsx_runtime.JSX.Element;
declare const useWebsiteBuilderSurfaceLayoutMetrics: () => WebsiteBuilderSurfaceLayoutMetrics | null;
declare const useWebsiteBuilderSurfaceBreakpoints: () => {
    width: number;
    atLeastSm: boolean;
    atLeastMd: boolean;
    atLeastLg: boolean;
    atLeastXl: boolean;
};

export { type WebsiteBuilderSurfaceLayoutMetrics, WebsiteBuilderSurfaceLayoutProvider, useWebsiteBuilderSurfaceBreakpoints, useWebsiteBuilderSurfaceLayoutMetrics };
