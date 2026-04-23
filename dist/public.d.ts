import * as react_jsx_runtime from 'react/jsx-runtime';
export { g as getPhotonAnchorRel, s as sanitizePhotonLinkHref } from './link-url-XwgBLvA0.js';
import { _ as PhotonLinkComponentProps, b as PhotonDocument, m as PhotonResources, k as PhotonPageSettings, p as PhotonSite, A as PhotonRegistry, t as PhotonWorkspaceDescriptor, s as PhotonWorkspaceCapabilities, E as PhotonMode, I as PhotonI18nValue, G as PhotonSearchHandler, H as PhotonLinkComponent, u as PhotonSiteFrameExtension, y as PhotonAccountTabExtension, z as PhotonSurfaceMode, U as PhotonInstallableKit, Q as PhotonModule, l as PhotonResolvedPage, n as PhotonSearchHighlight } from './types-BAycJgQn.js';
export { $ as PhotonBindingAdapter, a as PhotonBlock, a0 as PhotonBlockComponentProps, M as PhotonBlockDefinition, O as PhotonBlockLocalizationSchema, c as PhotonDocumentsMap, J as PhotonField, a1 as PhotonFieldOption, e as PhotonLocaleDescriptor, f as PhotonLocaleStatus, K as PhotonPageSettingsPanelDefinition, a2 as PhotonPageSettingsScope, L as PhotonSiteSettingsPanelDefinition } from './types-BAycJgQn.js';
import { ElementType, HTMLAttributes, ReactNode, CSSProperties } from 'react';
export { P as PhotonSiteSearch, u as usePhotonI18n, a as usePhotonRenderDepth } from './photon-site-search-efF0Worq.js';
export { c as createPhotonBlockLocalizationSchema, a as createPhotonKit, b as createPhotonLocalizedDefault, d as createPhotonRuntime, e as definePhotonBlockDefinition } from './runtime-bINqXqWs.js';
export { P as PHOTON_SEARCH_OCCURRENCE_PARAM, a as PHOTON_SEARCH_QUERY_PARAM, b as PHOTON_SEARCH_TARGET_PARAM } from './constants-Bu7HPDAC.js';

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

type PhotonPublicContextValue = {
    document: PhotonDocument;
    resources: PhotonResources;
    pageSettings: PhotonPageSettings;
    site: PhotonSite;
    registry: PhotonRegistry;
    workspace: PhotonWorkspaceDescriptor;
    capabilities: PhotonWorkspaceCapabilities;
    mode: PhotonMode;
    isAdmin: boolean;
    searchSite?: PhotonSearchHandler;
    requestAuth?: () => void;
    linkComponent: PhotonLinkComponent;
    siteFrameExtensions: PhotonSiteFrameExtension[];
    accountTabs: PhotonAccountTabExtension[];
    contentLocale: string;
    defaultLocale: string;
};
type PhotonPublicProviderProps = {
    children: ReactNode;
    initialDocument: PhotonDocument;
    initialResources?: PhotonResources;
    initialPageSettings?: PhotonPageSettings;
    initialSite?: PhotonSite;
    registry: PhotonRegistry;
    workspace?: PhotonWorkspaceDescriptor;
    capabilities?: Partial<PhotonWorkspaceCapabilities>;
    initialMode?: PhotonMode;
    isAdmin?: boolean;
    i18n?: PhotonI18nValue | null;
    searchSite?: PhotonSearchHandler;
    requestAuth?: () => void;
    linkComponent?: PhotonLinkComponent;
    siteFrameExtensions?: PhotonSiteFrameExtension[];
    accountTabs?: PhotonAccountTabExtension[];
};
declare const PhotonProvider: ({ children, initialDocument, initialResources, initialPageSettings, initialSite, registry, workspace, capabilities, initialMode, isAdmin, i18n, searchSite, requestAuth, linkComponent, siteFrameExtensions, accountTabs, }: PhotonPublicProviderProps) => react_jsx_runtime.JSX.Element;
declare const usePhoton: () => PhotonPublicContextValue;
declare const usePhotonStore: <T>(selector: (state: PhotonPublicContextValue) => T) => T;
declare const usePhotonFieldValue: (blockId: string, path: string) => unknown;
declare const usePhotonCanEdit: () => boolean;
type PhotonLinkProps = PhotonLinkComponentProps & {
    navigateInPreviewOnly?: boolean;
};
declare const PhotonLink: ({ navigateInPreviewOnly, onClick, ...props }: PhotonLinkProps) => react_jsx_runtime.JSX.Element;

declare const createPhotonPublicSiteFrameExtension: (extension: PhotonSiteFrameExtension) => PhotonSiteFrameExtension;
declare const createPhotonPublicAccountTabExtension: (tab: PhotonAccountTabExtension) => PhotonAccountTabExtension;
declare const resolvePhotonPublicAccountTabs: (tabs: readonly PhotonAccountTabExtension[] | undefined, disabledTabIds?: readonly string[]) => PhotonAccountTabExtension[];

declare const getPhotonPublicSurfaceModeStyle: (mode: PhotonSurfaceMode) => CSSProperties | undefined;

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

export { EditableGallery, EditableImage, EditableRepeaterValue, EditableRichText, EditableText, EditableTextarea, PhotonAccountTabExtension, PhotonDocument, PhotonInstallableKit, PhotonLink, PhotonLinkComponentProps, PhotonModule, PhotonProvider, PhotonPublicPage, type PhotonPublicRuntimePageValue, PhotonSiteFrameExtension, createPhotonPublicAccountTabExtension as createPhotonAccountTabExtension, createPhotonPublicSiteFrameExtension as createPhotonSiteFrameExtension, getPhotonPublicSurfaceModeStyle as getPhotonSurfaceModeStyle, photonPublicSystemKit as photonSystemKit, photonPublicSystemModule as photonSystemModule, renderPhotonRichTextHtml, resolvePhotonPublicAccountTabs as resolvePhotonAccountTabs, sanitizePhotonRichTextHtml, usePhoton, usePhotonCanEdit, usePhotonStore, usePhotonFieldValue as usePhotonValueAtPath };
