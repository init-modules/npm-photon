import * as react from 'react';
import { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { af as PhotonI18nValue, aj as PhotonInteractionSurfaceRendererProps } from './types-DkoIiv0C.js';

declare const PhotonRenderDepthProvider: react.Provider<number>;
declare const usePhotonRenderDepth: () => number;

declare const PhotonI18nProvider: ({ children, value, }: {
    children: ReactNode;
    value?: Partial<PhotonI18nValue> | null;
}) => react_jsx_runtime.JSX.Element;
declare const usePhotonI18n: () => PhotonI18nValue;
declare const resolvePhotonText: (value: string, translate: PhotonI18nValue["translate"], fallback?: string) => string;

type PhotonSiteSearchProps = {
    blockId: string;
    placeholderPath: string;
    className?: string;
    surfaceOpen?: boolean;
    onSurfaceOpenChange?: (open: boolean) => void;
    surfacePlaceholder?: string;
    surfaceTitle?: string;
    surfaceDescription?: string;
    surfaceHint?: string;
    surfaceLoading?: string;
    surfaceEmpty?: string;
    hideTrigger?: boolean;
    previewMode?: "runtime" | "builder-inline";
};
declare const PhotonSiteSearch: ({ blockId, placeholderPath, className, surfaceOpen, onSurfaceOpenChange, surfacePlaceholder, surfaceTitle, surfaceDescription, surfaceHint, surfaceLoading, surfaceEmpty, hideTrigger, previewMode, }: PhotonSiteSearchProps) => react_jsx_runtime.JSX.Element;
declare const PhotonSiteSearchSurfaceRenderer: ({ open, onOpenChange, request, previewMode, }: PhotonInteractionSurfaceRendererProps) => react_jsx_runtime.JSX.Element;

export { PhotonSiteSearch as P, PhotonSiteSearchSurfaceRenderer as a, usePhotonRenderDepth as b, PhotonI18nProvider as c, PhotonRenderDepthProvider as d, resolvePhotonText as r, usePhotonI18n as u };
