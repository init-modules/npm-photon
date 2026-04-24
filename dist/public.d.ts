import * as react_jsx_runtime from 'react/jsx-runtime';
export { g as getPhotonAnchorRel, s as sanitizePhotonLinkHref } from './link-url-XwgBLvA0.js';
import { a1 as PhotonLinkComponentProps, b as PhotonDocument, m as PhotonResources, k as PhotonPageSettings, p as PhotonSite, A as PhotonRegistry, t as PhotonWorkspaceDescriptor, s as PhotonWorkspaceCapabilities, E as PhotonMode, L as PhotonI18nValue, G as PhotonSearchHandler, H as PhotonNavigateHandler, I as PhotonPrefetchHandler, a2 as PhotonAuthPageRenderer, J as PhotonLinkComponent, K as PhotonLinkFactory, a3 as PhotonNavigationConfig, u as PhotonSiteFrameExtension, y as PhotonAccountTabExtension, z as PhotonSurfaceMode, X as PhotonInstallableKit, T as PhotonModule, a4 as PhotonSiteFrameMobileControls, l as PhotonResolvedPage, n as PhotonSearchHighlight } from './types-_Y3LUXJR.js';
export { a5 as PhotonAuthPageRenderInput, a6 as PhotonBindingAdapter, a as PhotonBlock, a7 as PhotonBlockComponentProps, Q as PhotonBlockDefinition, S as PhotonBlockLocalizationSchema, c as PhotonDocumentsMap, M as PhotonField, a8 as PhotonFieldOption, a9 as PhotonLinkFactoryOptions, e as PhotonLocaleDescriptor, f as PhotonLocaleStatus, aa as PhotonNavigateOptions, N as PhotonPageSettingsPanelDefinition, ab as PhotonPageSettingsScope, ac as PhotonSiteFrameActionComponentProps, ad as PhotonSiteFrameActionItem, v as PhotonSiteFrameExtensionContext, ae as PhotonSiteFrameFloatingControls, af as PhotonSiteFrameFooterSlot, ag as PhotonSiteFrameFooterSlotItems, w as PhotonSiteFrameFooterSlots, ah as PhotonSiteFrameHeaderSlot, ai as PhotonSiteFrameHeaderSlotItems, x as PhotonSiteFrameHeaderSlots, aj as PhotonSiteFrameLinkItem, ak as PhotonSiteFrameMobileBottomMenuControls, al as PhotonSiteFrameMobileMenuControls, am as PhotonSiteFrameMobileMenuType, O as PhotonSiteSettingsPanelDefinition } from './types-_Y3LUXJR.js';
import { ElementType, HTMLAttributes, ReactNode, CSSProperties } from 'react';
export { P as PhotonSiteSearch, u as usePhotonI18n, a as usePhotonRenderDepth } from './photon-site-search-C3rRcoDr.js';
export { c as createPhotonBlockLocalizationSchema, a as createPhotonKit, b as createPhotonLocalizedDefault, d as createPhotonRuntime, e as definePhotonBlockDefinition } from './runtime-9uis0Id-.js';
export { c as collectPhotonFooterExtensionItems, a as collectPhotonHeaderExtensionItems, b as createPhotonAccountTabExtension, d as createPhotonSiteFrameExtension, r as resolvePhotonAccountTabs, e as resolvePhotonSiteFrameExtensions } from './site-frame-extensions-B8_bnzq9.js';
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
    navigate?: PhotonNavigateHandler;
    prefetch?: PhotonPrefetchHandler;
    renderAuthPage?: PhotonAuthPageRenderer;
    linkComponent: PhotonLinkComponent;
    linkFactory: PhotonLinkFactory;
    navigation: PhotonNavigationConfig;
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
    navigate?: PhotonNavigateHandler;
    prefetch?: PhotonPrefetchHandler;
    renderAuthPage?: PhotonAuthPageRenderer;
    linkComponent?: PhotonLinkComponent;
    linkFactory?: PhotonLinkFactory;
    navigation?: PhotonNavigationConfig;
    siteFrameExtensions?: PhotonSiteFrameExtension[];
    accountTabs?: PhotonAccountTabExtension[];
};
declare const PhotonProvider: ({ children, initialDocument, initialResources, initialPageSettings, initialSite, registry, workspace, capabilities, initialMode, isAdmin, i18n, searchSite, requestAuth, navigate, prefetch, renderAuthPage, linkComponent, linkFactory, navigation, siteFrameExtensions, accountTabs, }: PhotonPublicProviderProps) => react_jsx_runtime.JSX.Element;
declare const usePhoton: () => PhotonPublicContextValue;
declare const usePhotonStore: <T>(selector: (state: PhotonPublicContextValue) => T) => T;
declare const usePhotonFieldValue: (blockId: string, path: string) => unknown;
declare const usePhotonCanEdit: () => boolean;
type PhotonLinkProps = PhotonLinkComponentProps & {
    navigateInPreviewOnly?: boolean;
};
declare const PhotonLink: ({ navigateInPreviewOnly, onClick, ...props }: PhotonLinkProps) => react_jsx_runtime.JSX.Element;

declare const getPhotonPublicSurfaceModeStyle: (mode: PhotonSurfaceMode) => CSSProperties | undefined;

declare const photonPublicSystemModule: PhotonModule;
declare const photonPublicSystemKit: PhotonInstallableKit;

type ResolvedPhotonSiteFrameMobileControls = {
    sticky: boolean;
    menu: {
        type: "inline" | "drawer" | "fullscreen";
        fixedTrigger: boolean;
        scrollLock: boolean;
        floating: boolean;
        disableFloatingOnSmallScreens: boolean;
    };
    bottomMenu: {
        enabled: boolean;
        showBurger: boolean;
        floating: boolean;
        disableFloatingOnSmallScreens: boolean;
    };
};
declare const resolvePhotonSiteFrameMobileControls: (controls?: PhotonSiteFrameMobileControls) => ResolvedPhotonSiteFrameMobileControls;
declare const usePhotonSiteFrameScrollLock: (locked: boolean) => void;

type PhotonPublicRuntimePageValue = Pick<PhotonResolvedPage, "page" | "document" | "resources" | "pageSettings" | "runtimeData" | "site">;
type PhotonPublicPageProps = {
    page: PhotonPublicRuntimePageValue;
    registry: PhotonRegistry;
    i18n?: PhotonI18nValue | null;
    linkComponent?: PhotonLinkComponent;
    siteFrameExtensions?: PhotonSiteFrameExtension[];
    accountTabs?: PhotonAccountTabExtension[];
    requestAuth?: () => void;
    navigate?: PhotonNavigateHandler;
    prefetch?: PhotonPrefetchHandler;
    renderAuthPage?: PhotonAuthPageRenderer;
    linkFactory?: PhotonLinkFactory;
    searchSite?: PhotonSearchHandler;
    activeSearchHighlight?: PhotonSearchHighlight | null;
    navigation?: PhotonNavigationConfig;
};
declare const PhotonPublicPage: ({ page, registry, i18n, linkComponent, siteFrameExtensions, accountTabs, requestAuth, navigate, prefetch, renderAuthPage, linkFactory, searchSite, activeSearchHighlight, navigation, }: PhotonPublicPageProps) => react_jsx_runtime.JSX.Element;

export { EditableGallery, EditableImage, EditableRepeaterValue, EditableRichText, EditableText, EditableTextarea, PhotonAccountTabExtension, PhotonAuthPageRenderer, PhotonDocument, PhotonInstallableKit, PhotonLink, PhotonLinkComponentProps, PhotonLinkFactory, PhotonModule, PhotonNavigateHandler, PhotonPageSettings, PhotonPrefetchHandler, PhotonProvider, PhotonPublicPage, type PhotonPublicRuntimePageValue, PhotonSiteFrameExtension, PhotonSiteFrameMobileControls, getPhotonPublicSurfaceModeStyle as getPhotonSurfaceModeStyle, photonPublicSystemKit as photonSystemKit, photonPublicSystemModule as photonSystemModule, renderPhotonRichTextHtml, resolvePhotonSiteFrameMobileControls, sanitizePhotonRichTextHtml, usePhoton, usePhotonCanEdit, usePhotonSiteFrameScrollLock, usePhotonStore, usePhotonFieldValue as usePhotonValueAtPath };
