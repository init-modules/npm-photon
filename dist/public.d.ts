import * as react_jsx_runtime from 'react/jsx-runtime';
export { g as getPhotonAnchorRel, s as sanitizePhotonLinkHref } from './link-url-XwgBLvA0.js';
import { aG as PhotonLinkComponentProps, t as PhotonDocument, u as PhotonResources, v as PhotonPageSettings, w as PhotonSite, x as PhotonRegistry, y as PhotonWorkspaceDescriptor, z as PhotonWorkspaceCapabilities, D as PhotonMode, U as PhotonI18nValue, H as PhotonSearchHandler, F as PhotonInteractionActionPresentation, N as PhotonInteractionSurfaceDefinition, O as PhotonInteractionActionDefinition, Q as PhotonInteractionGuardDefinition, R as PhotonInteractionGuardEvaluatorMap, a8 as PhotonActionPolicy, a5 as PhotonConditionDefinition, a6 as PhotonConditionEvaluatorMap, aa as PhotonSiteDataSchema, a9 as PhotonRouteContextField, S as PhotonInteractionSurfaceRendererMap, I as PhotonNavigateHandler, J as PhotonPrefetchHandler, aH as PhotonAuthPageRenderer, L as PhotonLinkComponent, M as PhotonLinkFactory, aI as PhotonNavigationConfig, P as PhotonSiteFrameExtension, d as PhotonAccountTabExtension, aJ as PhotonInteractionSurfaceOpenHandler, aK as PhotonInteractionToastHandler, au as PhotonInteractionExecutionResult, av as PhotonInteractionTriggerSlot, aL as PhotonInteractionPreviewScenario, e as PhotonSurfaceMode, ab as PhotonInstallableKit, a1 as PhotonModule, aM as PhotonSiteFrameMobileControls, aN as PhotonSiteFrameMobileMenuTriggerPlacement, aO as PhotonResolvedPage, K as PhotonSearchHighlight } from './types-BQcsKmzz.js';
export { aP as PhotonActionPlan, aQ as PhotonActionPlanExecutionStatus, aR as PhotonActionPlanResult, aS as PhotonActionPlanStep, aT as PhotonActionPolicyEnforcement, aU as PhotonActionPolicyScope, aV as PhotonActionStateDefinition, aW as PhotonAuthPageRenderInput, aX as PhotonBindingAdapter, _ as PhotonBlock, aY as PhotonBlockComponentProps, Z as PhotonBlockDefinition, a0 as PhotonBlockLocalizationSchema, aZ as PhotonComponentLibraryEditorSelection, aq as PhotonComponentLibraryItem, at as PhotonComponentLibrarySettings, a_ as PhotonComponentLibrarySourceSelection, ar as PhotonComponentLibraryUsage, T as PhotonComponentLibraryUsageProvider, as as PhotonComponentReferenceProps, a$ as PhotonConditionEvaluationContext, b0 as PhotonConditionEvaluator, b1 as PhotonConditionExpression, b2 as PhotonConditionResolution, a7 as PhotonDocumentsMap, h as PhotonField, b3 as PhotonFieldOption, aA as PhotonInteractionActionExecutionHandlers, b4 as PhotonInteractionActionInstance, b5 as PhotonInteractionExecutionStatus, ax as PhotonInteractionGuardEvaluationContext, az as PhotonInteractionGuardEvaluationResult, b6 as PhotonInteractionGuardEvaluator, aw as PhotonInteractionGuardInstance, b7 as PhotonInteractionGuardMissingEvaluatorPolicy, aB as PhotonInteractionSettings, b8 as PhotonInteractionSurfaceInstance, b9 as PhotonInteractionSurfaceIntentBinding, ba as PhotonInteractionSurfaceKind, bb as PhotonInteractionSurfaceRenderer, Y as PhotonInteractionSurfaceRendererProps, aj as PhotonInteractionSurfaceSettings, al as PhotonInteractionSurfaceTrigger, bc as PhotonInteractionSurfaceVariant, an as PhotonInteractionToastInput, bd as PhotonInteractionToastStatus, ao as PhotonInteractionToastTemplate, be as PhotonInteractionTriggerBinding, bf as PhotonLinkFactoryOptions, bg as PhotonLocaleDescriptor, bh as PhotonLocaleStatus, bi as PhotonNavigateOptions, V as PhotonPageSettingsPanelDefinition, bj as PhotonPageSettingsScope, bk as PhotonResolvedSiteData, bl as PhotonSiteDataBinding, bm as PhotonSiteDataField, bn as PhotonSiteDataFieldKind, bo as PhotonSiteFrameActionComponentProps, bp as PhotonSiteFrameActionItem, a as PhotonSiteFrameExtensionContext, bq as PhotonSiteFrameFloatingControls, br as PhotonSiteFrameFooterSlot, bs as PhotonSiteFrameFooterSlotItems, b as PhotonSiteFrameFooterSlots, bt as PhotonSiteFrameHeaderSlot, bu as PhotonSiteFrameHeaderSlotItems, c as PhotonSiteFrameHeaderSlots, bv as PhotonSiteFrameLinkItem, bw as PhotonSiteFrameMobileBottomMenuControls, bx as PhotonSiteFrameMobileMenuControls, by as PhotonSiteFrameMobileMenuType, bz as PhotonSiteFrameNavigationColumn, W as PhotonSiteSettingsPanelDefinition } from './types-BQcsKmzz.js';
import { ElementType, HTMLAttributes, ReactNode, CSSProperties } from 'react';
export { P as PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY, a as PHOTON_COMPONENT_REFERENCE_MODULE, b as PHOTON_COMPONENT_REFERENCE_TYPE, c as PHOTON_INTERACTIONS_SITE_SETTING_KEY, d as PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY, e as PHOTON_ROUTE_CONTEXT_SCOPE, f as PHOTON_SEARCH_OCCURRENCE_PARAM, g as PHOTON_SEARCH_QUERY_PARAM, h as PHOTON_SEARCH_TARGET_PARAM, i as clonePhotonComponentLibraryBlocksForCopy, j as clonePhotonComponentSourceBlockWithNewIds, k as collectPhotonComponentLibraryUsages, l as createPhotonActionValue, m as createPhotonComponentLibraryBlockId, n as createPhotonComponentLibraryItemFromBlock, o as createPhotonComponentReferenceBlock, p as createPhotonInteractionActionDefinition, q as createPhotonInteractionExecutionResult, r as createPhotonInteractionGuardDefinition, s as createPhotonInteractionSurfaceDefinition, t as createPhotonInteractionTriggerSlot, u as evaluatePhotonInteractionGuards, v as executePhotonInteractionActionPresentation, w as executePhotonInteractionTriggerSlot, x as getPhotonComponentLibraryItems, y as isPhotonComponentReferenceBlock, z as matchRoutePattern, A as mergePhotonStudioUrlState, B as normalizePhotonStudioSurfaceMode, C as parsePhotonComponentLibraryBlockId, D as parsePhotonStudioUrlState, E as parseRoutePattern, F as photonInteractionExecutionSucceeded, G as readPhotonComponentLibrarySettings, H as readPhotonInteractionSettings, I as readPhotonInteractionSurfaceSettings, J as resolvePhotonComponentReferenceBlocks, K as resolvePhotonInteractionActionCatalog, L as resolvePhotonInteractionSlotAction, M as resolvePhotonInteractionSlotGuards, N as resolvePhotonInteractionSurfaceCatalog, O as resolvePhotonInteractionSurfaceRequest, Q as resolvePhotonInteractionToastTemplate, R as resolveRouteContext, S as writePhotonStudioUrlState } from './constants-UpG__eCm.js';
export { P as PhotonSiteSearch, a as PhotonSiteSearchSurfaceRenderer, u as usePhotonI18n, b as usePhotonRenderDepth } from './photon-site-search-BfpZYnTX.js';
export { c as createPhotonBlockLocalizationSchema, a as createPhotonKit, b as createPhotonLocalizedDefault, d as createPhotonRuntime, e as definePhotonBlockDefinition } from './runtime-BiwbSa22.js';
export { c as collectPhotonFooterExtensionItems, a as collectPhotonHeaderExtensionItems, b as createPhotonAccountTabExtension, d as createPhotonSiteFrameExtension, r as resolvePhotonAccountTabs, e as resolvePhotonSiteFrameExtensions } from './site-frame-extensions-DGiCZlam.js';

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
    interactionPolicies: PhotonActionPolicy[];
    conditionDefinitions: PhotonConditionDefinition[];
    conditionEvaluators: PhotonConditionEvaluatorMap;
    siteDataSchemas: PhotonSiteDataSchema[];
    routeContextFields: PhotonRouteContextField[];
    routeContextValues: Record<string, unknown>;
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
    interactionPolicies?: PhotonActionPolicy[];
    conditionDefinitions?: PhotonConditionDefinition[];
    conditionEvaluators?: PhotonConditionEvaluatorMap;
    siteDataSchemas?: PhotonSiteDataSchema[];
    routeContextFields?: PhotonRouteContextField[];
    routeContextValues?: Record<string, unknown>;
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
declare const PhotonProvider: ({ children, initialDocument, initialResources, initialPageSettings, initialSite, registry, workspace, capabilities, initialMode, isAdmin, i18n, searchSite, requestAuth, requestAuthAction, interactionSurfaces, interactionActions, interactionGuards, interactionGuardEvaluators, interactionPolicies, conditionDefinitions, conditionEvaluators, siteDataSchemas, routeContextFields, routeContextValues, interactionSurfaceRenderers, navigate, prefetch, renderAuthPage, linkComponent, linkFactory, navigation, siteFrameExtensions, accountTabs, }: PhotonPublicProviderProps) => react_jsx_runtime.JSX.Element;
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
    routeContextFields?: PhotonRouteContextField[];
    routeContextValues?: Record<string, unknown>;
};
declare const PhotonPublicPage: ({ page, registry, i18n, linkComponent, siteFrameExtensions, accountTabs, interactionSurfaces, interactionActions, interactionGuards, interactionGuardEvaluators, interactionSurfaceRenderers, requestAuth, requestAuthAction, navigate, prefetch, renderAuthPage, linkFactory, searchSite, activeSearchHighlight, navigation, routeContextFields, routeContextValues, }: PhotonPublicPageProps) => react_jsx_runtime.JSX.Element;

export { EditableGallery, EditableImage, EditableRepeaterValue, EditableRichText, EditableText, EditableTextarea, PhotonAccountTabExtension, PhotonActionPolicy, PhotonAuthPageRenderer, PhotonConditionDefinition, PhotonConditionEvaluatorMap, PhotonDocument, PhotonInstallableKit, PhotonInteractionActionDefinition, PhotonInteractionActionPresentation, PhotonInteractionExecutionResult, PhotonInteractionGuardDefinition, PhotonInteractionGuardEvaluatorMap, PhotonInteractionPreviewScenario, PhotonInteractionSurfaceDefinition, PhotonInteractionSurfaceOpenHandler, PhotonInteractionSurfaceRendererMap, PhotonInteractionToastHandler, PhotonInteractionTriggerSlot, PhotonLink, PhotonLinkComponentProps, PhotonLinkFactory, PhotonModule, PhotonNavigateHandler, PhotonPageSettings, PhotonPrefetchHandler, PhotonProvider, PhotonPublicPage, type PhotonPublicRuntimePageValue, PhotonResources, PhotonSiteDataSchema, PhotonSiteFrameExtension, PhotonSiteFrameMobileControls, getPhotonPublicSurfaceModeStyle as getPhotonSurfaceModeStyle, photonPublicSystemKit as photonSystemKit, photonPublicSystemModule as photonSystemModule, renderPhotonRichTextHtml, resolvePhotonSiteFrameMobileControls, sanitizePhotonRichTextHtml, usePhoton, usePhotonCanEdit, usePhotonSiteFrameScrollLock, usePhotonStore, usePhotonFieldValue as usePhotonValueAtPath };
