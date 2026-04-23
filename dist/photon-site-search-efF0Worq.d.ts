import * as react from 'react';
import { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { I as PhotonI18nValue } from './types-BAycJgQn.js';

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
};
declare const PhotonSiteSearch: ({ blockId, placeholderPath, className, }: PhotonSiteSearchProps) => react_jsx_runtime.JSX.Element;

export { PhotonSiteSearch as P, usePhotonRenderDepth as a, PhotonI18nProvider as b, PhotonRenderDepthProvider as c, resolvePhotonText as r, usePhotonI18n as u };
