import * as react_jsx_runtime from 'react/jsx-runtime';
export { g as getPhotonAnchorRel, s as sanitizePhotonLinkHref } from './link-url-XwgBLvA0.js';
import { be as PhotonLinkComponentProps, w as PhotonDocument, a4 as PhotonResources, a1 as PhotonPageSettings, a7 as PhotonSite, aA as PhotonRegistry, af as PhotonWorkspaceDescriptor, ae as PhotonWorkspaceCapabilities, aE as PhotonMode, aM as PhotonI18nValue, aG as PhotonSearchHandler, C as PhotonInteractionActionPresentation, O as PhotonInteractionSurfaceDefinition, z as PhotonInteractionActionDefinition, F as PhotonInteractionGuardDefinition, J as PhotonInteractionGuardEvaluatorMap, d as PhotonActionPolicy, q as PhotonConditionDefinition, t as PhotonConditionEvaluatorMap, ab as PhotonSiteDataSchema, aW as PhotonRouteContextField, aL as PhotonInteractionSurfaceRendererMap, aH as PhotonNavigateHandler, aI as PhotonPrefetchHandler, bf as PhotonAuthPageRenderer, aJ as PhotonLinkComponent, aK as PhotonLinkFactory, bg as PhotonNavigationConfig, ag as PhotonSiteFrameExtension, ak as PhotonAccountTabExtension, bh as PhotonInteractionSurfaceOpenHandler, bi as PhotonInteractionToastHandler, D as PhotonInteractionExecutionResult, W as PhotonInteractionTriggerSlot, M as PhotonInteractionPreviewScenario, x as PhotonDocumentsMap, ao as PhotonField, g as PhotonActionStateDefinition, aZ as PhotonAnyBlockDefinition, al as PhotonSurfaceMode, aX as PhotonInstallableKit, aS as PhotonModule, bj as PhotonSiteFrameMobileControls, bk as PhotonSiteFrameMobileMenuTriggerPlacement, a2 as PhotonResolvedPage, a5 as PhotonSearchHighlight } from './types-1-bZpAzJ.js';
export { P as PhotonActionPlan, a as PhotonActionPlanExecutionStatus, b as PhotonActionPlanResult, c as PhotonActionPlanStep, e as PhotonActionPolicyEnforcement, f as PhotonActionPolicyScope, bl as PhotonAuthPageRenderInput, bm as PhotonBindingAdapter, i as PhotonBlock, bn as PhotonBlockComponentProps, aP as PhotonBlockDefinition, aR as PhotonBlockLocalizationSchema, j as PhotonComponentLibraryEditorSelection, k as PhotonComponentLibraryItem, l as PhotonComponentLibrarySettings, m as PhotonComponentLibrarySourceSelection, n as PhotonComponentLibraryUsage, o as PhotonComponentLibraryUsageProvider, p as PhotonComponentReferenceProps, r as PhotonConditionEvaluationContext, s as PhotonConditionEvaluator, u as PhotonConditionExpression, v as PhotonConditionResolution, bo as PhotonFieldOption, A as PhotonInteractionActionExecutionHandlers, B as PhotonInteractionActionInstance, E as PhotonInteractionExecutionStatus, G as PhotonInteractionGuardEvaluationContext, H as PhotonInteractionGuardEvaluationResult, I as PhotonInteractionGuardEvaluator, K as PhotonInteractionGuardInstance, L as PhotonInteractionGuardMissingEvaluatorPolicy, N as PhotonInteractionSettings, Q as PhotonInteractionSurfaceInstance, R as PhotonInteractionSurfaceIntentBinding, bp as PhotonInteractionSurfaceKind, bq as PhotonInteractionSurfaceRenderer, a$ as PhotonInteractionSurfaceRendererProps, S as PhotonInteractionSurfaceSettings, T as PhotonInteractionSurfaceTrigger, br as PhotonInteractionSurfaceVariant, b7 as PhotonInteractionToastInput, bs as PhotonInteractionToastStatus, U as PhotonInteractionToastTemplate, V as PhotonInteractionTriggerBinding, bt as PhotonLinkFactoryOptions, X as PhotonLocaleDescriptor, Y as PhotonLocaleStatus, bu as PhotonNavigateOptions, aN as PhotonPageSettingsPanelDefinition, bv as PhotonPageSettingsScope, a3 as PhotonResolvedSiteData, a8 as PhotonSiteDataBinding, a9 as PhotonSiteDataField, aa as PhotonSiteDataFieldKind, bw as PhotonSiteFrameActionComponentProps, bx as PhotonSiteFrameActionItem, ah as PhotonSiteFrameExtensionContext, by as PhotonSiteFrameFloatingControls, bz as PhotonSiteFrameFooterSlot, bA as PhotonSiteFrameFooterSlotItems, ai as PhotonSiteFrameFooterSlots, bB as PhotonSiteFrameHeaderSlot, bC as PhotonSiteFrameHeaderSlotItems, aj as PhotonSiteFrameHeaderSlots, bD as PhotonSiteFrameLinkItem, bE as PhotonSiteFrameMobileBottomMenuControls, bF as PhotonSiteFrameMobileMenuControls, bG as PhotonSiteFrameMobileMenuType, bH as PhotonSiteFrameNavigationColumn, aO as PhotonSiteSettingsPanelDefinition } from './types-1-bZpAzJ.js';
import { ElementType, HTMLAttributes, ReactNode, CSSProperties } from 'react';
import { P as PhotonBlockActiveStateResolution } from './photon-site-search-BX8xiYuj.js';
export { a as PhotonBlockActiveStateInput, b as PhotonConditionResolutionMode, c as PhotonSiteSearch, d as PhotonSiteSearchSurfaceRenderer, e as evaluatePhotonConditionForMode, r as resolvePhotonActionStateForMode, f as resolvePhotonBlockActiveState, g as resolvePhotonConditionAxis, u as usePhotonI18n, h as usePhotonRenderDepth } from './photon-site-search-BX8xiYuj.js';
export { P as PhotonProfileSeedInput, a as PhotonProfileSeedSiteSettings, c as collectPhotonProfileSeedSiteSettings, m as mergePhotonProfileSeedIntoSiteSettings } from './profile-seed-SOTvZhfj.js';
export { P as PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY, c as PHOTON_COMPONENT_REFERENCE_MODULE, d as PHOTON_COMPONENT_REFERENCE_TYPE, e as PHOTON_INTERACTIONS_SITE_SETTING_KEY, f as PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY, g as PHOTON_ROUTE_CONTEXT_SCOPE, h as PHOTON_SEARCH_OCCURRENCE_PARAM, i as PHOTON_SEARCH_QUERY_PARAM, j as PHOTON_SEARCH_TARGET_PARAM, k as clonePhotonComponentLibraryBlocksForCopy, l as clonePhotonComponentSourceBlockWithNewIds, m as collectPhotonComponentLibraryUsages, n as createPhotonActionValue, o as createPhotonComponentLibraryBlockId, p as createPhotonComponentLibraryItemFromBlock, q as createPhotonComponentReferenceBlock, r as createPhotonInteractionActionDefinition, s as createPhotonInteractionExecutionResult, t as createPhotonInteractionGuardDefinition, u as createPhotonInteractionSurfaceDefinition, v as createPhotonInteractionTriggerSlot, x as evaluatePhotonInteractionGuards, y as executePhotonInteractionActionPresentation, z as executePhotonInteractionTriggerSlot, A as getPhotonComponentLibraryItems, B as isPhotonComponentReferenceBlock, C as matchRoutePattern, D as mergePhotonStudioUrlState, E as normalizePhotonStudioSurfaceMode, F as parsePhotonComponentLibraryBlockId, G as parsePhotonStudioUrlState, H as parseRoutePattern, I as photonInteractionExecutionSucceeded, J as planPhotonInteractionTriggerSlot, K as readPhotonComponentLibrarySettings, L as readPhotonInteractionSettings, M as readPhotonInteractionSurfaceSettings, Q as resolvePhotonComponentReferenceBlocks, R as resolvePhotonInteractionActionCatalog, S as resolvePhotonInteractionSlotAction, T as resolvePhotonInteractionSlotGuards, U as resolvePhotonInteractionSurfaceCatalog, V as resolvePhotonInteractionSurfaceRequest, W as resolvePhotonInteractionToastTemplate, X as resolveRouteContext, Y as writePhotonStudioUrlState } from './constants-tXsWK43T.js';
export { c as createPhotonBlockLocalizationSchema, a as createPhotonKit, b as createPhotonLocalizedDefault, d as createPhotonRuntime, e as definePhotonBlockDefinition } from './runtime-CNj8WQEr.js';
export { c as collectPhotonFooterExtensionItems, a as collectPhotonHeaderExtensionItems, b as createPhotonAccountTabExtension, d as createPhotonSiteFrameExtension, r as resolvePhotonAccountTabs, e as resolvePhotonSiteFrameExtensions } from './site-frame-extensions-EvFuCLX5.js';

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
/**
 * Public-runtime variant of `usePhotonBlockActiveState`. Builder preview overrides
 * are not applicable here (production runtime), so resolution always falls back to
 * condition evaluation + server defaults.
 */
declare const usePhotonBlockActiveState: (blockId: string) => PhotonBlockActiveStateResolution;
type PhotonLinkProps = PhotonLinkComponentProps & {
    navigateInPreviewOnly?: boolean;
};
declare const PhotonLink: ({ navigateInPreviewOnly, onClick, ...props }: PhotonLinkProps) => react_jsx_runtime.JSX.Element;

type PhotonResolvedDocumentForRoute = {
    document: PhotonDocument;
    source: "exact" | "pattern";
    matchedPattern?: string;
};
/**
 * Resolves which document to render for a given URL path.
 *
 * Resolution order:
 * 1. **Exact match** — a document whose `route` equals `path` (override case
 *    from 4.md: "/astana" gets a fully custom document, not the template).
 * 2. **Pattern match** — first document with `routePatterns` that contains
 *    a pattern matching `path` (template case: "/products/:slug" matches
 *    "/products/coffee" and feeds slug into route context).
 * 3. **Null** when neither matches — caller decides 404 vs default behavior.
 *
 * Pattern documents (templates) typically have `route` set to a placeholder
 * like "/" or "/products" and the actual specific routes are derived from
 * `routePatterns`. Specific overrides have `route` set to the exact path
 * and no `routePatterns`.
 */
declare const resolvePhotonDocumentForRoute: (path: string, documents: PhotonDocumentsMap) => PhotonResolvedDocumentForRoute | null;

/**
 * Unified component shape — bridges `PhotonBlockDefinition` (inline)
 * and `PhotonInteractionSurfaceDefinition` (portal-mounted) for
 * generic builder UX (instance pickers, state switchers, field
 * editing). Backed by adapter functions so existing block/surface
 * types remain the source of truth.
 *
 * Long-term goal per 7.md: Block and Surface converge into one
 * `PhotonComponentDefinition` that simply differs by `kind`. This
 * adapter is the bridge until that refactor.
 */
type PhotonComponentDefinition = {
    id: string;
    label: string;
    labelKey?: string;
    description?: string;
    descriptionKey?: string;
    /**
     * Mounting strategy:
     * - `inline`: rendered inside the document tree at a fixed position (block)
     * - `dialog` / `panel` / `toast`: portal-mounted overlay activated globally (surface)
     */
    kind: "inline" | "dialog" | "panel" | "toast";
    package?: string;
    fields?: PhotonField[];
    previewScenarios?: PhotonInteractionPreviewScenario[];
    states?: PhotonActionStateDefinition[];
    /**
     * Reusable site-owned configured copies of this component. For inline
     * blocks this is currently `undefined` (each block in the document is
     * its own placement). For surfaces this maps `defaultInstances`.
     */
    instances?: PhotonComponentInstance[];
    /**
     * Reference to the originating definition for runtime fall-through.
     * Generic helpers use the unified shape; concrete renderers still
     * dispatch on `kind` and call the original block/surface APIs.
     */
    source: PhotonComponentDefinitionSource;
};
type PhotonComponentInstance = {
    id: string;
    label: string;
    labelKey?: string;
    enabled?: boolean;
    props?: Record<string, unknown>;
};
type PhotonComponentDefinitionSource = {
    kind: "block";
    definition: PhotonAnyBlockDefinition;
} | {
    kind: "surface";
    definition: PhotonInteractionSurfaceDefinition;
};
/**
 * Adapt a block definition into the unified shape. Inline blocks have
 * no native instance system — the unified `instances` field stays
 * undefined. `kind` is fixed to `"inline"`.
 */
declare const blockDefinitionAsPhotonComponentDefinition: (definition: PhotonAnyBlockDefinition) => PhotonComponentDefinition;
/**
 * Adapt a surface definition into the unified shape. `kind` carries
 * over from the surface (`dialog` / `panel` / `toast`). `instances`
 * maps from `defaultInstances`.
 */
declare const surfaceDefinitionAsPhotonComponentDefinition: (definition: PhotonInteractionSurfaceDefinition) => PhotonComponentDefinition;
/**
 * Convenience overload — accepts either a block or a surface and
 * returns the unified shape. Generic helpers can write code against
 * `PhotonComponentDefinition` once and consume from either source.
 */
declare const asPhotonComponentDefinition: (definition: PhotonAnyBlockDefinition | PhotonInteractionSurfaceDefinition) => PhotonComponentDefinition;
/**
 * Generic helper: returns an instance label, falling back to the
 * component label when no per-instance label is defined. Useful for
 * inspector pickers and chain rows that show "instance: label".
 */
declare const getPhotonComponentInstanceLabel: (component: PhotonComponentDefinition, instanceId: string | undefined) => string;
/**
 * Generic helper: collects all preview scenarios + states into a
 * uniform `{ id, label, kind: "scenario" | "state" }` list. Used by
 * canvas state-switcher and inspector picker UIs that need to render
 * both options regardless of source.
 */
type PhotonComponentSwitchableOption = {
    id: string;
    label: string;
    labelKey?: string;
    kind: "scenario" | "state";
};
declare const collectPhotonComponentSwitchableOptions: (component: PhotonComponentDefinition) => PhotonComponentSwitchableOption[];

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

export { EditableGallery, EditableImage, EditableRepeaterValue, EditableRichText, EditableText, EditableTextarea, PhotonAccountTabExtension, PhotonActionPolicy, PhotonActionStateDefinition, PhotonAuthPageRenderer, PhotonBlockActiveStateResolution, type PhotonComponentDefinition, type PhotonComponentDefinitionSource, type PhotonComponentInstance, type PhotonComponentSwitchableOption, PhotonConditionDefinition, PhotonConditionEvaluatorMap, PhotonDocument, PhotonDocumentsMap, PhotonField, PhotonInstallableKit, PhotonInteractionActionDefinition, PhotonInteractionActionPresentation, PhotonInteractionExecutionResult, PhotonInteractionGuardDefinition, PhotonInteractionGuardEvaluatorMap, PhotonInteractionPreviewScenario, PhotonInteractionSurfaceDefinition, PhotonInteractionSurfaceOpenHandler, PhotonInteractionSurfaceRendererMap, PhotonInteractionToastHandler, PhotonInteractionTriggerSlot, PhotonLink, PhotonLinkComponentProps, PhotonLinkFactory, PhotonModule, PhotonNavigateHandler, PhotonPageSettings, PhotonPrefetchHandler, PhotonProvider, PhotonPublicPage, type PhotonPublicRuntimePageValue, type PhotonResolvedDocumentForRoute, PhotonResources, PhotonSiteDataSchema, PhotonSiteFrameExtension, PhotonSiteFrameMobileControls, asPhotonComponentDefinition, blockDefinitionAsPhotonComponentDefinition, collectPhotonComponentSwitchableOptions, getPhotonComponentInstanceLabel, getPhotonPublicSurfaceModeStyle as getPhotonSurfaceModeStyle, photonPublicSystemKit as photonSystemKit, photonPublicSystemModule as photonSystemModule, renderPhotonRichTextHtml, resolvePhotonDocumentForRoute, resolvePhotonSiteFrameMobileControls, sanitizePhotonRichTextHtml, surfaceDefinitionAsPhotonComponentDefinition, usePhoton, usePhotonBlockActiveState, usePhotonCanEdit, usePhotonSiteFrameScrollLock, usePhotonStore, usePhotonFieldValue as usePhotonValueAtPath };
