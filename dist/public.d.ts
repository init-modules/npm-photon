import * as react_jsx_runtime from 'react/jsx-runtime';
export { g as getPhotonAnchorRel, s as sanitizePhotonLinkHref } from './link-url-XwgBLvA0.js';
import { U as PhotonInstallableKit, Q as PhotonModule, l as PhotonResolvedPage, A as PhotonRegistry, I as PhotonI18nValue, H as PhotonLinkComponent, u as PhotonSiteFrameExtension, y as PhotonAccountTabExtension, G as PhotonSearchHandler, n as PhotonSearchHighlight } from './types-S6aNsw9R.js';
export { a0 as PhotonBindingAdapter, a as PhotonBlock, a1 as PhotonBlockComponentProps, M as PhotonBlockDefinition, O as PhotonBlockLocalizationSchema, b as PhotonDocument, c as PhotonDocumentsMap, J as PhotonField, a2 as PhotonFieldOption, $ as PhotonLinkComponentProps, e as PhotonLocaleDescriptor, f as PhotonLocaleStatus, K as PhotonPageSettingsPanelDefinition, a3 as PhotonPageSettingsScope, L as PhotonSiteSettingsPanelDefinition } from './types-S6aNsw9R.js';
import { ElementType, HTMLAttributes } from 'react';
export { P as PhotonLink, a as PhotonSiteSearch, u as usePhoton, b as usePhotonCanEdit, c as usePhotonI18n, d as usePhotonRenderDepth, e as usePhotonStore, f as usePhotonValueAtPath } from './photon-site-search-CyOGWrWo.js';
export { c as createPhotonBlockLocalizationSchema, a as createPhotonKit, b as createPhotonLocalizedDefault, d as createPhotonRuntime, e as definePhotonBlockDefinition } from './runtime-B8vjSNTE.js';
export { c as createPhotonAccountTabExtension, a as createPhotonSiteFrameExtension, r as resolvePhotonAccountTabs } from './site-frame-extensions-MxazF6mP.js';
export { g as getPhotonSurfaceModeStyle } from './surface-layout-DTo_L0tV.js';
export { P as PHOTON_SEARCH_OCCURRENCE_PARAM, a as PHOTON_SEARCH_QUERY_PARAM, b as PHOTON_SEARCH_TARGET_PARAM } from './constants-Bu7HPDAC.js';
import 'zustand/vanilla';

type PublicEditableGalleryProps = {
    blockId: string;
    path: string;
    className?: string;
    emptyTitle?: string;
    emptyBody?: string;
    columnsClassName?: string;
    itemCardClassName?: string;
    itemFallbackClassName?: string;
    itemLabelClassName?: string;
    itemCaptionClassName?: string;
    itemFileNameClassName?: string;
    emptyStateClassName?: string;
    emptyStateTitleClassName?: string;
    emptyStateBodyClassName?: string;
    emptyStateButtonClassName?: string;
    addCardClassName?: string;
    addCardTitleClassName?: string;
    addCardBodyClassName?: string;
    addCardButtonClassName?: string;
};
declare const EditableGallery: ({ blockId, path, className, emptyTitle, emptyBody, columnsClassName, itemCardClassName, itemFallbackClassName, itemLabelClassName, itemCaptionClassName, itemFileNameClassName, emptyStateClassName, emptyStateTitleClassName, emptyStateBodyClassName, emptyStateButtonClassName, addCardClassName, addCardTitleClassName, addCardBodyClassName, addCardButtonClassName, }: PublicEditableGalleryProps) => react_jsx_runtime.JSX.Element;

type PublicEditableImageProps = {
    blockId: string;
    path: string;
    altPath?: string;
    className?: string;
    imageClassName?: string;
    fallbackAlt?: string;
};
declare const EditableImage: ({ blockId, path, altPath, className, imageClassName, fallbackAlt, }: PublicEditableImageProps) => react_jsx_runtime.JSX.Element;

type PublicEditableRepeaterValueProps = {
    blockId: string;
    path: string;
    fallback?: string;
    className?: string;
    as?: ElementType;
};
declare const EditableRepeaterValue: ({ blockId, path, fallback, className, as, }: PublicEditableRepeaterValueProps) => react_jsx_runtime.JSX.Element;

type PublicEditableRichTextProps = {
    blockId: string;
    path: string;
    className?: string;
    placeholder?: string;
};
declare const EditableRichText: ({ blockId, path, className, placeholder, }: PublicEditableRichTextProps) => react_jsx_runtime.JSX.Element;

type PublicEditableTextProps = HTMLAttributes<HTMLElement> & {
    blockId: string;
    path: string;
    as?: ElementType;
    placeholder?: string;
};
declare const EditableText: ({ blockId, path, as: Tag, className, placeholder, ...rest }: PublicEditableTextProps) => react_jsx_runtime.JSX.Element;

type PublicEditableTextareaProps = {
    blockId: string;
    path: string;
    className?: string;
    placeholder?: string;
};
declare const EditableTextarea: ({ blockId, path, className, placeholder, }: PublicEditableTextareaProps) => react_jsx_runtime.JSX.Element;

declare const sanitizePhotonRichTextHtml: (value: string) => string;
declare const renderPhotonRichTextHtml: (value: string, placeholder: string) => string;

declare const photonPublicSystemModule: PhotonModule;
declare const photonPublicSystemKit: PhotonInstallableKit;

type PhotonPublicRuntimePageValue = Pick<PhotonResolvedPage, "page" | "document" | "resources" | "pageSettings" | "runtimeData" | "site">;
type PhotonPublicPageProps = {
    page: PhotonPublicRuntimePageValue;
    registry: PhotonRegistry;
    i18n?: PhotonI18nValue | null;
    linkComponent?: PhotonLinkComponent;
    siteFrameExtensions?: PhotonSiteFrameExtension[];
    accountTabs?: PhotonAccountTabExtension[];
    requestAuth?: () => void;
    searchSite?: PhotonSearchHandler;
    activeSearchHighlight?: PhotonSearchHighlight | null;
};
declare const PhotonPublicPage: ({ page, registry, i18n, linkComponent, siteFrameExtensions, accountTabs, requestAuth, searchSite, activeSearchHighlight, }: PhotonPublicPageProps) => react_jsx_runtime.JSX.Element;

export { EditableGallery, EditableImage, EditableRepeaterValue, EditableRichText, EditableText, EditableTextarea, PhotonAccountTabExtension, PhotonInstallableKit, PhotonModule, PhotonPublicPage, type PhotonPublicRuntimePageValue, PhotonSiteFrameExtension, photonPublicSystemKit as photonSystemKit, photonPublicSystemModule as photonSystemModule, renderPhotonRichTextHtml, sanitizePhotonRichTextHtml };
