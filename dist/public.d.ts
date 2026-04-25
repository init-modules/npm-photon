import * as react_jsx_runtime from 'react/jsx-runtime';
export { g as getPhotonAnchorRel, s as sanitizePhotonLinkHref } from './link-url-XwgBLvA0.js';
import { aG as PhotonLinkComponentProps, i as PhotonDocument, R as PhotonResources, O as PhotonPageSettings, U as PhotonSite, a3 as PhotonRegistry, Y as PhotonWorkspaceDescriptor, X as PhotonWorkspaceCapabilities, a7 as PhotonMode, af as PhotonI18nValue, a9 as PhotonSearchHandler, o as PhotonInteractionActionPresentation, A as PhotonInteractionSurfaceDefinition, l as PhotonInteractionActionDefinition, r as PhotonInteractionGuardDefinition, v as PhotonInteractionGuardEvaluatorMap, ae as PhotonInteractionSurfaceRendererMap, aa as PhotonNavigateHandler, ab as PhotonPrefetchHandler, aH as PhotonAuthPageRenderer, ac as PhotonLinkComponent, ad as PhotonLinkFactory, aI as PhotonNavigationConfig, Z as PhotonSiteFrameExtension, a1 as PhotonAccountTabExtension, aJ as PhotonInteractionSurfaceOpenHandler, aK as PhotonInteractionToastHandler, p as PhotonInteractionExecutionResult, H as PhotonInteractionTriggerSlot, y as PhotonInteractionPreviewScenario, a2 as PhotonSurfaceMode, ar as PhotonInstallableKit, an as PhotonModule, aL as PhotonSiteFrameMobileControls, aM as PhotonSiteFrameMobileMenuTriggerPlacement, Q as PhotonResolvedPage, S as PhotonSearchHighlight } from './types-DkoIiv0C.js';
export { aN as PhotonAuthPageRenderInput, aO as PhotonBindingAdapter, a as PhotonBlock, aP as PhotonBlockComponentProps, ak as PhotonBlockDefinition, am as PhotonBlockLocalizationSchema, b as PhotonComponentLibraryEditorSelection, c as PhotonComponentLibraryItem, d as PhotonComponentLibrarySettings, e as PhotonComponentLibrarySourceSelection, f as PhotonComponentLibraryUsage, g as PhotonComponentLibraryUsageProvider, h as PhotonComponentReferenceProps, j as PhotonDocumentsMap, ag as PhotonField, aQ as PhotonFieldOption, m as PhotonInteractionActionExecutionHandlers, n as PhotonInteractionActionInstance, q as PhotonInteractionExecutionStatus, s as PhotonInteractionGuardEvaluationContext, t as PhotonInteractionGuardEvaluationResult, u as PhotonInteractionGuardEvaluator, w as PhotonInteractionGuardInstance, x as PhotonInteractionGuardMissingEvaluatorPolicy, z as PhotonInteractionSettings, B as PhotonInteractionSurfaceInstance, C as PhotonInteractionSurfaceIntentBinding, aR as PhotonInteractionSurfaceKind, aS as PhotonInteractionSurfaceRenderer, aj as PhotonInteractionSurfaceRendererProps, D as PhotonInteractionSurfaceSettings, E as PhotonInteractionSurfaceTrigger, aT as PhotonInteractionSurfaceVariant, aw as PhotonInteractionToastInput, aU as PhotonInteractionToastStatus, F as PhotonInteractionToastTemplate, G as PhotonInteractionTriggerBinding, aV as PhotonLinkFactoryOptions, I as PhotonLocaleDescriptor, J as PhotonLocaleStatus, aW as PhotonNavigateOptions, ah as PhotonPageSettingsPanelDefinition, aX as PhotonPageSettingsScope, aY as PhotonSiteFrameActionComponentProps, aZ as PhotonSiteFrameActionItem, _ as PhotonSiteFrameExtensionContext, a_ as PhotonSiteFrameFloatingControls, a$ as PhotonSiteFrameFooterSlot, b0 as PhotonSiteFrameFooterSlotItems, $ as PhotonSiteFrameFooterSlots, b1 as PhotonSiteFrameHeaderSlot, b2 as PhotonSiteFrameHeaderSlotItems, a0 as PhotonSiteFrameHeaderSlots, b3 as PhotonSiteFrameLinkItem, b4 as PhotonSiteFrameMobileBottomMenuControls, b5 as PhotonSiteFrameMobileMenuControls, b6 as PhotonSiteFrameMobileMenuType, b7 as PhotonSiteFrameNavigationColumn, ai as PhotonSiteSettingsPanelDefinition } from './types-DkoIiv0C.js';
import { ElementType, HTMLAttributes, ReactNode, CSSProperties } from 'react';
export { P as PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY, c as PHOTON_COMPONENT_REFERENCE_MODULE, d as PHOTON_COMPONENT_REFERENCE_TYPE, e as PHOTON_INTERACTIONS_SITE_SETTING_KEY, f as PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY, g as PHOTON_SEARCH_OCCURRENCE_PARAM, h as PHOTON_SEARCH_QUERY_PARAM, i as PHOTON_SEARCH_TARGET_PARAM, j as clonePhotonComponentLibraryBlocksForCopy, k as clonePhotonComponentSourceBlockWithNewIds, l as collectPhotonComponentLibraryUsages, m as createPhotonActionValue, n as createPhotonComponentLibraryBlockId, o as createPhotonComponentLibraryItemFromBlock, p as createPhotonComponentReferenceBlock, q as createPhotonInteractionActionDefinition, r as createPhotonInteractionExecutionResult, s as createPhotonInteractionGuardDefinition, t as createPhotonInteractionSurfaceDefinition, u as createPhotonInteractionTriggerSlot, w as evaluatePhotonInteractionGuards, x as executePhotonInteractionActionPresentation, y as executePhotonInteractionTriggerSlot, z as getPhotonComponentLibraryItems, A as isPhotonComponentReferenceBlock, B as mergePhotonStudioUrlState, C as normalizePhotonStudioSurfaceMode, D as parsePhotonComponentLibraryBlockId, E as parsePhotonStudioUrlState, F as photonInteractionExecutionSucceeded, G as readPhotonComponentLibrarySettings, H as readPhotonInteractionSettings, I as readPhotonInteractionSurfaceSettings, L as resolvePhotonComponentReferenceBlocks, M as resolvePhotonInteractionActionCatalog, N as resolvePhotonInteractionSlotAction, O as resolvePhotonInteractionSlotGuards, Q as resolvePhotonInteractionSurfaceCatalog, R as resolvePhotonInteractionSurfaceRequest, S as resolvePhotonInteractionToastTemplate, T as writePhotonStudioUrlState } from './constants-C5-uAwL9.js';
export { P as PhotonSiteSearch, a as PhotonSiteSearchSurfaceRenderer, u as usePhotonI18n, b as usePhotonRenderDepth } from './photon-site-search-C_qg0k2X.js';
export { c as createPhotonBlockLocalizationSchema, a as createPhotonKit, b as createPhotonLocalizedDefault, d as createPhotonRuntime, e as definePhotonBlockDefinition } from './runtime-D29vnJUy.js';
export { c as collectPhotonFooterExtensionItems, a as collectPhotonHeaderExtensionItems, b as createPhotonAccountTabExtension, d as createPhotonSiteFrameExtension, r as resolvePhotonAccountTabs, e as resolvePhotonSiteFrameExtensions } from './site-frame-extensions-DB1lCXlC.js';

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
    openInteractionSurface: PhotonInteractionSurfaceOpenHandler;
    showInteractionToast: PhotonInteractionToastHandler;
    executeInteractionAction: (action: PhotonInteractionActionPresentation | undefined | null) => PhotonInteractionExecutionResult;
    executeInteractionTriggerSlot: (slot: PhotonInteractionTriggerSlot, options?: {
        scenarioId?: string | null;
        scenario?: PhotonInteractionPreviewScenario | null;
    }) => PhotonInteractionExecutionResult;
    navigate?: PhotonNavigateHandler;
    prefetch?: PhotonPrefetchHandler;
    renderAuthPage?: PhotonAuthPageRenderer;
    linkComponent: PhotonLinkComponent;
    linkFactory: PhotonLinkFactory;
    navigation: PhotonNavigationConfig;
    siteFrameExtensions: PhotonSiteFrameExtension[];
    accountTabs: PhotonAccountTabExtension[];
    interactionSurfaces: PhotonInteractionSurfaceDefinition[];
    interactionActions: PhotonInteractionActionDefinition[];
    interactionGuards: PhotonInteractionGuardDefinition[];
    interactionGuardEvaluators: PhotonInteractionGuardEvaluatorMap;
    interactionSurfaceRenderers: PhotonInteractionSurfaceRendererMap;
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
    requestAuthAction?: PhotonInteractionActionPresentation;
    interactionSurfaces?: PhotonInteractionSurfaceDefinition[];
    interactionActions?: PhotonInteractionActionDefinition[];
    interactionGuards?: PhotonInteractionGuardDefinition[];
    interactionGuardEvaluators?: PhotonInteractionGuardEvaluatorMap;
    interactionSurfaceRenderers?: PhotonInteractionSurfaceRendererMap;
    navigate?: PhotonNavigateHandler;
    prefetch?: PhotonPrefetchHandler;
    renderAuthPage?: PhotonAuthPageRenderer;
    linkComponent?: PhotonLinkComponent;
    linkFactory?: PhotonLinkFactory;
    navigation?: PhotonNavigationConfig;
    siteFrameExtensions?: PhotonSiteFrameExtension[];
    accountTabs?: PhotonAccountTabExtension[];
};
declare const PhotonProvider: ({ children, initialDocument, initialResources, initialPageSettings, initialSite, registry, workspace, capabilities, initialMode, isAdmin, i18n, searchSite, requestAuth, requestAuthAction, interactionSurfaces, interactionActions, interactionGuards, interactionGuardEvaluators, interactionSurfaceRenderers, navigate, prefetch, renderAuthPage, linkComponent, linkFactory, navigation, siteFrameExtensions, accountTabs, }: PhotonPublicProviderProps) => react_jsx_runtime.JSX.Element;
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
        triggerPlacement: PhotonSiteFrameMobileMenuTriggerPlacement;
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
    interactionSurfaces?: PhotonInteractionSurfaceDefinition[];
    interactionActions?: PhotonInteractionActionDefinition[];
    interactionGuards?: PhotonInteractionGuardDefinition[];
    interactionGuardEvaluators?: PhotonInteractionGuardEvaluatorMap;
    interactionSurfaceRenderers?: PhotonInteractionSurfaceRendererMap;
    requestAuth?: () => void;
    requestAuthAction?: PhotonInteractionActionPresentation;
    navigate?: PhotonNavigateHandler;
    prefetch?: PhotonPrefetchHandler;
    renderAuthPage?: PhotonAuthPageRenderer;
    linkFactory?: PhotonLinkFactory;
    searchSite?: PhotonSearchHandler;
    activeSearchHighlight?: PhotonSearchHighlight | null;
    navigation?: PhotonNavigationConfig;
};
declare const PhotonPublicPage: ({ page, registry, i18n, linkComponent, siteFrameExtensions, accountTabs, interactionSurfaces, interactionActions, interactionGuards, interactionGuardEvaluators, interactionSurfaceRenderers, requestAuth, requestAuthAction, navigate, prefetch, renderAuthPage, linkFactory, searchSite, activeSearchHighlight, navigation, }: PhotonPublicPageProps) => react_jsx_runtime.JSX.Element;

export { EditableGallery, EditableImage, EditableRepeaterValue, EditableRichText, EditableText, EditableTextarea, PhotonAccountTabExtension, PhotonAuthPageRenderer, PhotonDocument, PhotonInstallableKit, PhotonInteractionActionDefinition, PhotonInteractionActionPresentation, PhotonInteractionExecutionResult, PhotonInteractionGuardDefinition, PhotonInteractionGuardEvaluatorMap, PhotonInteractionPreviewScenario, PhotonInteractionSurfaceDefinition, PhotonInteractionSurfaceOpenHandler, PhotonInteractionSurfaceRendererMap, PhotonInteractionToastHandler, PhotonInteractionTriggerSlot, PhotonLink, PhotonLinkComponentProps, PhotonLinkFactory, PhotonModule, PhotonNavigateHandler, PhotonPageSettings, PhotonPrefetchHandler, PhotonProvider, PhotonPublicPage, type PhotonPublicRuntimePageValue, PhotonResources, PhotonSiteFrameExtension, PhotonSiteFrameMobileControls, getPhotonPublicSurfaceModeStyle as getPhotonSurfaceModeStyle, photonPublicSystemKit as photonSystemKit, photonPublicSystemModule as photonSystemModule, renderPhotonRichTextHtml, resolvePhotonSiteFrameMobileControls, sanitizePhotonRichTextHtml, usePhoton, usePhotonCanEdit, usePhotonSiteFrameScrollLock, usePhotonStore, usePhotonFieldValue as usePhotonValueAtPath };
