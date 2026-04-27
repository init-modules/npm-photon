import * as react from 'react';
import { ComponentType, ReactNode, ElementType, HTMLAttributes, CSSProperties, KeyboardEvent } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { i as PhotonBlock, h as PhotonArea, al as PhotonSurfaceMode, ao as PhotonField, w as PhotonDocument, a4 as PhotonResources, a1 as PhotonPageSettings, a7 as PhotonSite, aA as PhotonRegistry, af as PhotonWorkspaceDescriptor, ae as PhotonWorkspaceCapabilities, aE as PhotonMode, aF as PhotonMediaUploadHandler, aG as PhotonSearchHandler, C as PhotonInteractionActionPresentation, O as PhotonInteractionSurfaceDefinition, z as PhotonInteractionActionDefinition, F as PhotonInteractionGuardDefinition, J as PhotonInteractionGuardEvaluatorMap, d as PhotonActionPolicy, q as PhotonConditionDefinition, t as PhotonConditionEvaluatorMap, ab as PhotonSiteDataSchema, aW as PhotonRouteContextField, aq as PhotonFormSchemaDescriptor, aL as PhotonInteractionSurfaceRendererMap, U as PhotonInteractionToastTemplate, aH as PhotonNavigateHandler, aI as PhotonPrefetchHandler, aJ as PhotonLinkComponent, aK as PhotonLinkFactory, bg as PhotonNavigationConfig, ag as PhotonSiteFrameExtension, ak as PhotonAccountTabExtension, m as PhotonComponentLibrarySourceSelection, bI as PhotonSelectedField, W as PhotonInteractionTriggerSlot, bh as PhotonInteractionSurfaceOpenHandler, bi as PhotonInteractionToastHandler, D as PhotonInteractionExecutionResult, M as PhotonInteractionPreviewScenario, y as PhotonFieldBinding, k as PhotonComponentLibraryItem, be as PhotonLinkComponentProps, aM as PhotonI18nValue, a3 as PhotonResolvedSiteData, bm as PhotonBindingAdapter, _ as PhotonMediaValue, aX as PhotonInstallableKit, aS as PhotonModule, a6 as PhotonSearchResult, a5 as PhotonSearchHighlight } from './types-1-bZpAzJ.js';
export { bJ as PhotonAccountTabMatch, P as PhotonActionPlan, a as PhotonActionPlanExecutionStatus, b as PhotonActionPlanResult, c as PhotonActionPlanStep, e as PhotonActionPolicyEnforcement, f as PhotonActionPolicyScope, g as PhotonActionStateDefinition, b4 as PhotonActionValue, bK as PhotonActorSummary, aZ as PhotonAnyBlockDefinition, bl as PhotonAuthPageRenderInput, bf as PhotonAuthPageRenderer, bL as PhotonBindingMode, bM as PhotonBlockComponent, bn as PhotonBlockComponentProps, bN as PhotonBlockDefaults, aP as PhotonBlockDefinition, ba as PhotonBlockInteractionSlotContext, aR as PhotonBlockLocalizationSchema, aV as PhotonBlockProps, aC as PhotonBranchPolicyState, j as PhotonComponentLibraryEditorSelection, l as PhotonComponentLibrarySettings, n as PhotonComponentLibraryUsage, o as PhotonComponentLibraryUsageProvider, p as PhotonComponentReferenceProps, r as PhotonConditionEvaluationContext, s as PhotonConditionEvaluator, u as PhotonConditionExpression, v as PhotonConditionResolution, bO as PhotonDefaultable, x as PhotonDocumentsMap, bP as PhotonFieldKind, bQ as PhotonFieldLocalization, bo as PhotonFieldOption, ap as PhotonFormDefinition, am as PhotonFormFieldDefinition, av as PhotonFormFieldOption, an as PhotonFormFieldType, aw as PhotonFormFieldValidation, ax as PhotonFormFieldWidth, ay as PhotonFormMode, az as PhotonFormPolicy, ar as PhotonFormValues, A as PhotonInteractionActionExecutionHandlers, B as PhotonInteractionActionInstance, bR as PhotonInteractionExecutionPlanMeta, E as PhotonInteractionExecutionStatus, G as PhotonInteractionGuardEvaluationContext, H as PhotonInteractionGuardEvaluationResult, I as PhotonInteractionGuardEvaluator, K as PhotonInteractionGuardInstance, L as PhotonInteractionGuardMissingEvaluatorPolicy, N as PhotonInteractionSettings, bS as PhotonInteractionSurfaceEditableFieldInput, bT as PhotonInteractionSurfaceEditableFieldKind, bU as PhotonInteractionSurfaceEditableFieldOption, a_ as PhotonInteractionSurfaceEditableFieldRenderer, Q as PhotonInteractionSurfaceInstance, R as PhotonInteractionSurfaceIntentBinding, bp as PhotonInteractionSurfaceKind, bq as PhotonInteractionSurfaceRenderer, a$ as PhotonInteractionSurfaceRendererProps, S as PhotonInteractionSurfaceSettings, T as PhotonInteractionSurfaceTrigger, br as PhotonInteractionSurfaceVariant, b7 as PhotonInteractionToastInput, bs as PhotonInteractionToastStatus, V as PhotonInteractionTriggerBinding, bV as PhotonInterfaceLocaleOption, bt as PhotonLinkFactoryOptions, X as PhotonLocaleDescriptor, Y as PhotonLocaleStatus, aT as PhotonLocalizedDefaultValue, Z as PhotonMediaUploadInput, bW as PhotonMergeConflict, bX as PhotonMergeDiffItem, aD as PhotonMergePreview, bY as PhotonMergeResolutionStrategy, bu as PhotonNavigateOptions, bZ as PhotonNavigationQueryKeys, aQ as PhotonNestedField, $ as PhotonPageCatalogItem, a0 as PhotonPageRuntimeData, aN as PhotonPageSettingsPanelDefinition, b_ as PhotonPageSettingsPanelProps, bv as PhotonPageSettingsScope, aU as PhotonRegistryEntry, as as PhotonResolvedFormField, b9 as PhotonResolvedInteractionActionCatalog, b5 as PhotonResolvedInteractionSurfaceCatalog, b6 as PhotonResolvedInteractionSurfaceRequest, a2 as PhotonResolvedPage, b8 as PhotonResolvedRouteContext, b1 as PhotonResolvedSiteDesignSettings, b$ as PhotonRevisionChangeSummaryItem, aB as PhotonRevisionDescriptor, c0 as PhotonRouteContextFieldKind, aY as PhotonRuntime, c1 as PhotonSearchInput, c2 as PhotonSearchRuntimeState, c3 as PhotonSiteColorSchemeDefinition, b2 as PhotonSiteComponentVariants, a8 as PhotonSiteDataBinding, a9 as PhotonSiteDataField, aa as PhotonSiteDataFieldKind, c4 as PhotonSiteDesignAppearance, c5 as PhotonSiteDesignColorTokens, c6 as PhotonSiteDesignPresetDefinition, b0 as PhotonSiteDesignSettings, c7 as PhotonSiteDesignValue, bw as PhotonSiteFrameActionComponentProps, bx as PhotonSiteFrameActionItem, c8 as PhotonSiteFrameActionKind, ah as PhotonSiteFrameExtensionContext, by as PhotonSiteFrameFloatingControls, bz as PhotonSiteFrameFooterSlot, bA as PhotonSiteFrameFooterSlotItems, ai as PhotonSiteFrameFooterSlots, bB as PhotonSiteFrameHeaderSlot, bC as PhotonSiteFrameHeaderSlotItems, aj as PhotonSiteFrameHeaderSlots, bD as PhotonSiteFrameLinkItem, bE as PhotonSiteFrameMobileBottomMenuControls, bj as PhotonSiteFrameMobileControls, bF as PhotonSiteFrameMobileMenuControls, bk as PhotonSiteFrameMobileMenuTriggerPlacement, bG as PhotonSiteFrameMobileMenuType, bH as PhotonSiteFrameNavigationColumn, ac as PhotonSiteRegion, ad as PhotonSiteSettings, aO as PhotonSiteSettingsPanelDefinition, c9 as PhotonSiteSettingsPanelProps, ca as PhotonStudioInteractionTab, cb as PhotonStudioPaletteTab, bc as PhotonStudioSurfaceMode, bd as PhotonStudioUrlState, bb as PhotonStudioUrlStatePatch, b3 as PhotonWorkspaceRef } from './types-1-bZpAzJ.js';
import { P as PhotonBlockActiveStateResolution } from './photon-site-search-BX8xiYuj.js';
export { i as PhotonI18nProvider, j as PhotonRenderDepthProvider, c as PhotonSiteSearch, d as PhotonSiteSearchSurfaceRenderer, k as resolvePhotonText, u as usePhotonI18n, h as usePhotonRenderDepth } from './photon-site-search-BX8xiYuj.js';
import { StoreApi } from 'zustand/vanilla';
import { V as resolvePhotonInteractionSurfaceRequest } from './constants-tXsWK43T.js';
export { P as PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY, a as PHOTON_COMPONENT_REFERENCE_AREA_ID, b as PHOTON_COMPONENT_REFERENCE_MAX_DEPTH, c as PHOTON_COMPONENT_REFERENCE_MODULE, d as PHOTON_COMPONENT_REFERENCE_TYPE, e as PHOTON_INTERACTIONS_SITE_SETTING_KEY, f as PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY, g as PHOTON_ROUTE_CONTEXT_SCOPE, h as PHOTON_SEARCH_OCCURRENCE_PARAM, i as PHOTON_SEARCH_QUERY_PARAM, j as PHOTON_SEARCH_TARGET_PARAM, k as clonePhotonComponentLibraryBlocksForCopy, l as clonePhotonComponentSourceBlockWithNewIds, m as collectPhotonComponentLibraryUsages, n as createPhotonActionValue, o as createPhotonComponentLibraryBlockId, p as createPhotonComponentLibraryItemFromBlock, q as createPhotonComponentReferenceBlock, r as createPhotonInteractionActionDefinition, s as createPhotonInteractionExecutionResult, t as createPhotonInteractionGuardDefinition, u as createPhotonInteractionSurfaceDefinition, v as createPhotonInteractionTriggerSlot, w as duplicatePhotonComponentLibraryItem, x as evaluatePhotonInteractionGuards, y as executePhotonInteractionActionPresentation, z as executePhotonInteractionTriggerSlot, A as getPhotonComponentLibraryItems, B as isPhotonComponentReferenceBlock, C as matchRoutePattern, D as mergePhotonStudioUrlState, E as normalizePhotonStudioSurfaceMode, F as parsePhotonComponentLibraryBlockId, G as parsePhotonStudioUrlState, H as parseRoutePattern, I as photonInteractionExecutionSucceeded, J as planPhotonInteractionTriggerSlot, K as readPhotonComponentLibrarySettings, L as readPhotonInteractionSettings, M as readPhotonInteractionSurfaceSettings, N as remapPhotonComponentLibraryBlock, O as resolvePhotonBlockInteractionSlots, Q as resolvePhotonComponentReferenceBlocks, R as resolvePhotonInteractionActionCatalog, S as resolvePhotonInteractionSlotAction, T as resolvePhotonInteractionSlotGuards, U as resolvePhotonInteractionSurfaceCatalog, W as resolvePhotonInteractionToastTemplate, X as resolveRouteContext, Y as writePhotonStudioUrlState } from './constants-tXsWK43T.js';
export { P as PHOTON_CASCADE_SCOPE_ORDER, a as PHOTON_SITE_DATA_BY_LOCALE_SETTING_KEY, b as PHOTON_SITE_DATA_SETTING_KEY, c as PhotonCascadable, d as PhotonCascadeConflict, e as buildActionPlan, f as comparePhotonCascadable, g as createSitePolicyOverride, h as dedupePhotonCascadeBy, i as dedupePoliciesById, j as detectPhotonCascadeConflicts, k as evaluateConditionExpression, l as extractPhotonSiteDataBindings, m as isSitePolicyOverride, n as localeSitePath, o as mapGuardsToActionPolicies, p as parsePhotonSiteDataBindingExpression, r as resolvePhotonSiteData, q as resolvePhotonSiteDataBinding, s as resolvePolicyCascade, t as sitePath, u as sitePolicyPath, v as sortPhotonCascade } from './site-data-poNcwQ6e.js';
export { f as collectPhotonAccountTabs, g as collectPhotonConditionDefinitions, h as collectPhotonConditionEvaluators, i as collectPhotonDocuments, j as collectPhotonFormSchemas, k as collectPhotonInteractionActions, l as collectPhotonInteractionGuardEvaluators, m as collectPhotonInteractionGuards, n as collectPhotonInteractionPolicies, o as collectPhotonInteractionSurfaces, p as collectPhotonRouteContextFields, q as collectPhotonSiteDataSchemas, r as collectPhotonSiteFrameExtensions, s as createPhotonBlock, c as createPhotonBlockLocalizationSchema, a as createPhotonKit, t as createPhotonLocalizationManifest, b as createPhotonLocalizedDefault, u as createPhotonRegistry, d as createPhotonRuntime, e as definePhotonBlockDefinition, v as getPhotonDefinitionKey, w as getPhotonDocumentFingerprint, x as isPhotonInstallableKit, y as movePhotonArrayItem, z as resolvePhotonModules } from './runtime-CNj8WQEr.js';
export { d as decodePhotonHtmlEntities, g as getPhotonAnchorRel, n as normalizePhotonUrlForProtocolCheck, s as sanitizePhotonLinkHref } from './link-url-XwgBLvA0.js';
export { D as DEFAULT_PHOTON_WORKSPACE_CAPABILITIES, a as DEFAULT_PHOTON_WORKSPACE_REF, I as PHOTON_EMPTY_TEXT, P as PHOTON_ROOT_LIST_ID, b as PHOTON_SITE_DESIGN_DEFAULTS, c as PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS, d as applyPhotonSiteColorScheme, e as applyPhotonSiteDesignPreset, f as canEditPhotonWorkspace, g as canSavePhotonWorkspace, h as clonePhotonBlockTreeWithNewIds, i as clonePhotonValue, j as collectBlockIds, k as createPhotonAreaListId, l as createPhotonNodeId, m as createPhotonSiteDesignSettings, n as duplicatePhotonBlockInDocument, o as findPhotonBlock, p as getFirstPhotonBlockId, q as getPhotonWorkspaceIdentityKey, r as getPhotonWorkspaceKey, J as getValueAtPath, s as hasPhotonSiteDesignPresetCustomization, t as insertPhotonBlockInDocument, u as insertPhotonBlocksInDocument, v as isPhotonFramelessPreset, w as isPhotonFramelessSiteDesign, x as isPhotonSiteDesignPresetApplied, y as isPhotonWorkspaceReadonly, K as isRecord, z as movePhotonBlockInDocument, A as normalizePhotonWorkspaceCapabilities, B as normalizePhotonWorkspaceDescriptor, C as normalizePhotonWorkspaceRef, E as removePhotonBlockFromDocument, F as replacePhotonBlockWithBlocksInDocument, G as resolvePhotonSiteDesignSettings, L as setValueAtPath, H as updatePhotonBlockInDocument } from './workspace-CXPqFLaH.js';
export { PHOTON_DEFAULT_SITE_DESIGN_PRESET_ID, PHOTON_PAGE_SURFACE_REGION_KEY, composePhotonSurfaceDocument, decomposePhotonSurfaceDocument, getFirstPhotonSurfaceEditableBlockId, getPhotonSiteColorScheme, getPhotonSiteDesignPreset, getPhotonSurfaceRegionBlocks, getPhotonSurfaceRegionListId, photonSiteColorSchemes, photonSiteDesignPresets, resolvePhotonSurfaceRegionDescriptors, resolvePhotonSurfaceRegionForBlockId, resolvePhotonSurfaceRegionForListId } from './server.js';
export { c as collectPhotonFooterExtensionItems, a as collectPhotonHeaderExtensionItems, b as createPhotonAccountTabExtension, d as createPhotonSiteFrameExtension, r as resolvePhotonAccountTabs, e as resolvePhotonSiteFrameExtensions } from './site-frame-extensions-EvFuCLX5.js';
export { g as getPhotonSurfaceModeStyle } from './surface-layout-C7tcEvSp.js';
export { PhotonAccessAuthStateLike, PhotonModeLike, PhotonWorkspaceSelectionLike, normalizePhotonSelectionForMode, resolvePhotonAccess, resolvePhotonMode, resolvePhotonRequestHeaders, resolvePhotonWorkspaceParams } from './sdk.js';
export { I as InsertTarget, a as InspectorDefinitionMeta, b as InspectorGroups, c as PageSettingsPanelDefinition, d as PaletteDefinition, e as PaletteFamilyGroup, P as PhotonStudio, f as PhotonStudioProps, g as PhotonStudioSavePayload, h as PhotonStudioSaveReason, i as PhotonStudioSiteSettingChangeContext, S as SiteSettingsPanelDefinition, j as SiteSettingsSubtabDefinition } from './photon-studio-CFXoMCmR.js';

type PhotonEditableEditorLoaderKey = "gallery" | "image" | "richText" | "text" | "textarea";
type PhotonEditableEditorLoaders = Partial<Record<PhotonEditableEditorLoaderKey, () => Promise<ComponentType<any>>>>;
declare global {
    var __photonEditableEditorLoaders: PhotonEditableEditorLoaders | undefined;
}

declare global {
    var __photonEditableEditorLoaders: PhotonEditableEditorLoaders | undefined;
}

type PhotonBlockRendererProps = {
    block: PhotonBlock;
    renderArea?: (area: PhotonArea, index: number) => ReactNode;
};
declare const PhotonBlockRenderer: ({ block, renderArea, }: PhotonBlockRendererProps) => react_jsx_runtime.JSX.Element;

type EditableGalleryProps = {
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
declare const EditableGallery: ({ blockId, path, className, emptyTitle, emptyBody, columnsClassName, itemCardClassName, itemFallbackClassName, itemLabelClassName, itemCaptionClassName, itemFileNameClassName, emptyStateClassName, emptyStateTitleClassName, emptyStateBodyClassName, emptyStateButtonClassName, addCardClassName, addCardTitleClassName, addCardBodyClassName, addCardButtonClassName, }: EditableGalleryProps) => react_jsx_runtime.JSX.Element;

type EditableImageProps = {
    blockId: string;
    path: string;
    altPath?: string;
    className?: string;
    imageClassName?: string;
    fallbackAlt?: string;
};
declare const EditableImage: ({ blockId, path, altPath, className, imageClassName, fallbackAlt, }: EditableImageProps) => react_jsx_runtime.JSX.Element;

type EditableRepeaterValueProps = {
    blockId: string;
    path: string;
    fallback?: string;
    className?: string;
    as?: ElementType;
};
declare const EditableRepeaterValue: ({ blockId, path, fallback, className, as, }: EditableRepeaterValueProps) => react_jsx_runtime.JSX.Element;

type EditableRichTextProps = {
    blockId: string;
    path: string;
    className?: string;
    placeholder?: string;
};
declare const EditableRichText: ({ blockId, path, className, placeholder, }: EditableRichTextProps) => react_jsx_runtime.JSX.Element;

type EditableTextProps = HTMLAttributes<HTMLElement> & {
    blockId: string;
    path: string;
    as?: ElementType;
    placeholder?: string;
};
declare const EditableText: ({ blockId, path, as: Tag, className, placeholder, ...rest }: EditableTextProps) => react_jsx_runtime.JSX.Element;

type EditableTextareaProps = {
    blockId: string;
    path: string;
    className?: string;
    placeholder?: string;
};
declare const EditableTextarea: ({ blockId, path, className, placeholder, }: EditableTextareaProps) => react_jsx_runtime.JSX.Element;

declare const usePhotonValueAtPath: (blockId: string, path: string) => unknown;

type PhotonRichTextEditorProps = {
    value: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onEscape?: () => void;
    placeholder?: string;
    className?: string;
    surfaceClassName?: string;
};
declare const photonRichTextContentClassName = "text-[var(--photon-site-text)] [&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--photon-site-border)] [&_blockquote]:pl-4 [&_blockquote]:text-[var(--photon-site-muted-text)] [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.04em] [&_h2]:text-[var(--photon-site-text)] [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-[-0.03em] [&_h3]:text-[var(--photon-site-text)] [&_li]:text-[var(--photon-site-text)] [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:leading-8 [&_p]:text-[var(--photon-site-text)] [&_p+p]:mt-4 [&_strong]:font-semibold [&_strong]:text-[var(--photon-site-text)] [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5";
declare const renderPhotonRichTextHtml: (value: string, placeholder?: string) => string;
declare const PhotonRichTextEditor: ({ value, onChange, onFocus, onBlur, onEscape, placeholder, className, surfaceClassName, }: PhotonRichTextEditorProps) => react_jsx_runtime.JSX.Element | null;

type PhotonSurfaceSectionProps<T extends ElementType> = {
    as?: T;
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    surfaceMode?: PhotonSurfaceMode;
};
declare const PhotonSurfaceSection: <T extends ElementType = "section">({ as, children, className, style, surfaceMode, }: PhotonSurfaceSectionProps<T>) => react.ReactElement<any, string | react.JSXElementConstructor<any>>;

type KeyboardMenuSection<T> = {
    id: string;
    label?: ReactNode;
    items: T[];
};
type UseKeyboardMenuControllerOptions<T> = {
    items: T[];
    getItemId: (item: T) => string;
    isItemDisabled?: (item: T) => boolean;
    isOpen?: boolean;
    preferredItemId?: string | null;
    onSelectItem?: (item: T) => void;
};
type KeyboardMenuController<T> = {
    listId: string;
    activeItem: T | null;
    activeItemId: string | null;
    activeOptionId?: string;
    focusList: () => void;
    getOptionElement: (itemId: string) => HTMLDivElement | null;
    getOptionId: (itemId: string) => string;
    getOptionRef: (itemId: string) => (node: HTMLDivElement | null) => void;
    getOptionProps: (item: T) => Pick<HTMLAttributes<HTMLDivElement>, "onMouseMove"> & {
        "aria-disabled"?: true;
        "aria-selected": boolean;
        role: "option";
    };
    getListProps: (props?: HTMLAttributes<HTMLDivElement>) => HTMLAttributes<HTMLDivElement> & {
        ref: (node: HTMLDivElement | null) => void;
        role: "listbox";
        tabIndex: number;
    };
    handleKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
    setActiveItemId: (itemId: string | null) => void;
};
type KeyboardMenuListProps<T> = {
    controller: KeyboardMenuController<T>;
    sections: KeyboardMenuSection<T>[];
    getItemId: (item: T) => string;
    isItemDisabled?: (item: T) => boolean;
    selectedItemId?: string | null;
    listLabel: string;
    className?: string;
    emptyState?: ReactNode;
    renderItem: (item: T, state: {
        isActive: boolean;
        isDisabled: boolean;
        isSelected: boolean;
        optionId: string;
    }) => ReactNode;
};
declare const useKeyboardMenuController: <T>({ items, getItemId, isItemDisabled, isOpen, preferredItemId, onSelectItem, }: UseKeyboardMenuControllerOptions<T>) => KeyboardMenuController<T>;
declare const KeyboardMenuList: <T>({ controller, sections, getItemId, isItemDisabled, selectedItemId, listLabel, className, emptyState, renderItem, }: KeyboardMenuListProps<T>) => react_jsx_runtime.JSX.Element;

type PhotonFieldEditorListProps = {
    fields: PhotonField[];
    subjectId: string;
    getValue: (path: string) => unknown;
    onChange: (path: string, value: unknown) => void;
    onFocus: (path: string) => void;
};
declare const PhotonFieldEditorList: ({ fields, subjectId, getValue, onChange, onFocus, }: PhotonFieldEditorListProps) => react_jsx_runtime.JSX.Element;

type InsertBlockInput = {
    module: string;
    type: string;
    listId?: string;
    index?: number;
};
type PhotonStoreState = {
    document: PhotonDocument;
    resources: PhotonResources;
    pageSettings: PhotonPageSettings;
    site: PhotonSite;
    workspace: PhotonWorkspaceDescriptor;
    capabilities: PhotonWorkspaceCapabilities;
    initialDocument: PhotonDocument;
    initialResources: PhotonResources;
    initialPageSettings: PhotonPageSettings;
    initialSite: PhotonSite;
    initialWorkspace: PhotonWorkspaceDescriptor;
    initialCapabilities: PhotonWorkspaceCapabilities;
    registry: PhotonRegistry;
    mode: PhotonMode;
    isAdmin: boolean;
    selectedBlockId: string | null;
    selectedComponentLibrarySource: PhotonComponentLibrarySourceSelection | null;
    selectedField: PhotonSelectedField;
    selectedInspectorTriggerId: string | null;
    selectedCanvasTriggerStageId: string | null;
    /** Builder-only: per-block preview scenario/state override for canvas state-switcher. Not persisted to site settings. */
    blockPreviewScenarios: Record<string, string>;
    /**
     * Pending action plan continuation. Set when a trigger executes a
     * prerequisite (e.g. opens sign-in dialog) instead of the target action.
     * The store re-evaluates the plan when the prerequisite surface closes:
     * if conditions changed (plan shrunk), the next step or target is auto-executed.
     * If no progress, the pending plan is cleared (user backed out).
     */
    pendingActionPlan: {
        targetAction: PhotonInteractionActionPresentation;
        targetActionInstanceId: string;
        previousStepCount: number;
        slot: PhotonInteractionTriggerSlot | null;
    } | null;
    /**
     * The interaction action instance id that the builder requested to be
     * focused for editing (e.g. via "Open instance" link inside an action
     * flow row). `interaction-surfaces-surface` reads this to scroll/highlight
     * the matching instance editor. Cleared when null.
     */
    selectedInteractionInstanceId: string | null;
    uploadMedia?: PhotonMediaUploadHandler;
    searchSite?: PhotonSearchHandler;
    requestAuth?: () => void;
    requestAuthAction?: PhotonInteractionActionPresentation;
    requestAuthFallback?: () => void;
    openInteractionSurface: PhotonInteractionSurfaceOpenHandler;
    showInteractionToast: PhotonInteractionToastHandler;
    executeInteractionAction: (action: PhotonInteractionActionPresentation | undefined | null) => PhotonInteractionExecutionResult;
    executeInteractionTriggerSlot: (slot: PhotonInteractionTriggerSlot, options?: {
        scenarioId?: string | null;
        scenario?: PhotonInteractionPreviewScenario | null;
    }) => PhotonInteractionExecutionResult;
    closeInteractionSurface: () => void;
    /**
     * Surface explicitly signals success completion (e.g. login OK, form
     * submitted). The runtime advances any pending action plan: target
     * action runs immediately if remaining plan is empty, next prereq
     * runs otherwise. Use this instead of `closeInteractionSurface`
     * whenever the surface knows it succeeded.
     */
    completeInteractionSurface: () => void;
    navigate?: PhotonNavigateHandler;
    prefetch?: PhotonPrefetchHandler;
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
    formSchemas: PhotonFormSchemaDescriptor[];
    interactionSurfaceRenderers: PhotonInteractionSurfaceRendererMap;
    activeInteractionSurface: ReturnType<typeof resolvePhotonInteractionSurfaceRequest>;
    contentLocale: string;
    defaultLocale: string;
    contentRevision: number;
    collapsedBlockIds: Record<string, true>;
    setMode: (nextMode: PhotonMode) => void;
    selectBlock: (blockId: string | null) => void;
    selectField: (blockId: string, path: string) => void;
    selectInspectorTrigger: (triggerId: string | null) => void;
    selectCanvasTriggerStage: (triggerId: string | null) => void;
    setBlockPreviewScenario: (blockId: string, scenarioId: string | null) => void;
    selectInteractionInstance: (instanceId: string | null) => void;
    clearSelectedField: () => void;
    selectPageSettingField: (path: string) => void;
    selectSiteSettingField: (path: string) => void;
    updateFieldValue: (blockId: string, path: string, value: unknown) => void;
    getFieldValue: (blockId: string, path: string) => unknown;
    /**
     * Sets or clears a field-level binding on a block. When `binding` is
     * non-null the field's runtime value resolves from the bound source
     * (e.g. `{ source: "site-data", path: "brand.name" }`). When `null`
     * the binding is removed and the field falls back to its block prop value.
     *
     * Distinct from `updateFieldValue`, which writes the literal value
     * (or a `{{ template }}` string for substitution mode). Binding mode
     * is an object-level link — the picker emits a `PhotonFieldBinding`
     * directly so non-string fields can also reference shared data.
     */
    setFieldBinding: (blockId: string, path: string, binding: PhotonFieldBinding | null) => void;
    updatePageSettingValue: (path: string, value: unknown) => void;
    getPageSettingValue: (path: string) => unknown;
    updateSiteSettingValue: (path: string, value: unknown) => void;
    getSiteSettingValue: (path: string) => unknown;
    getFieldBinding: (blockId: string, path: string) => PhotonFieldBinding | null;
    insertBlock: (input: InsertBlockInput) => void;
    duplicateBlock: (blockId: string) => void;
    removeBlock: (blockId: string) => void;
    moveBlock: (activeBlockId: string, targetListId: string, targetIndex: number) => void;
    createComponentLibraryItemFromBlock: (blockId: string) => void;
    insertComponentLibraryReference: (itemId: string, listId?: string, index?: number) => void;
    insertComponentLibraryCopy: (itemId: string, listId?: string, index?: number) => void;
    detachComponentReference: (blockId: string) => void;
    selectComponentLibrarySource: (itemId: string) => void;
    duplicateComponentLibraryItem: (itemId: string) => void;
    deleteComponentLibraryItem: (itemId: string, options?: {
        detachUsages?: boolean;
        force?: boolean;
    }) => boolean;
    updateComponentLibraryItem: (itemId: string, updater: (item: PhotonComponentLibraryItem) => PhotonComponentLibraryItem) => void;
    replaceState: (nextDocument: PhotonDocument, nextResources?: PhotonResources, nextPageSettings?: PhotonPageSettings, nextSite?: PhotonSite, options?: {
        workspace?: PhotonWorkspaceDescriptor;
        capabilities?: Partial<PhotonWorkspaceCapabilities>;
    }) => void;
    syncExternalState: (input: {
        initialDocument: PhotonDocument;
        initialResources?: PhotonResources;
        initialPageSettings?: PhotonPageSettings;
        initialSite?: PhotonSite;
        workspace?: PhotonWorkspaceDescriptor;
        capabilities?: Partial<PhotonWorkspaceCapabilities>;
    }) => void;
    resetDocument: () => void;
    /**
     * Updates non-block document metadata (route patterns, name, route).
     * Block content goes through `updateFieldValue` / `insertBlock` etc.
     *
     * Pass partial updates; omit fields to leave them unchanged. Pass
     * `routePatterns: undefined` to clear the patterns array entirely.
     */
    updateDocumentMetadata: (patch: Partial<Pick<PhotonDocument, "routePatterns" | "name" | "route">>) => void;
    toggleBlockCollapse: (blockId: string) => void;
    collapseAllBlocks: () => void;
    expandAllBlocks: () => void;
};
type PhotonStore = StoreApi<PhotonStoreState>;
type PhotonStoreInit = {
    initialDocument: PhotonDocument;
    initialResources?: PhotonResources;
    initialPageSettings?: PhotonPageSettings;
    initialSite?: PhotonSite;
    registry: PhotonRegistry;
    workspace?: PhotonWorkspaceDescriptor;
    capabilities?: Partial<PhotonWorkspaceCapabilities>;
    initialMode?: PhotonMode;
    isAdmin?: boolean;
    uploadMedia?: PhotonMediaUploadHandler;
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
    formSchemas?: PhotonFormSchemaDescriptor[];
    interactionSurfaceRenderers?: PhotonInteractionSurfaceRendererMap;
    dispatchInteractionToast?: (template: PhotonInteractionToastTemplate) => void;
    navigate?: PhotonNavigateHandler;
    prefetch?: PhotonPrefetchHandler;
    linkComponent: PhotonLinkComponent;
    linkFactory?: PhotonLinkFactory;
    navigation?: PhotonNavigationConfig;
    siteFrameExtensions?: PhotonSiteFrameExtension[];
    accountTabs?: PhotonAccountTabExtension[];
    i18n?: {
        contentLocale?: string;
        defaultLocale?: string;
    };
};

type PhotonProviderProps = {
    children: ReactNode;
    initialDocument: PhotonStoreInit["initialDocument"];
    initialResources?: PhotonResources;
    initialPageSettings?: PhotonPageSettings;
    initialSite?: PhotonSite;
    registry: PhotonRegistry;
    workspace?: PhotonWorkspaceDescriptor;
    capabilities?: Partial<PhotonWorkspaceCapabilities>;
    initialMode?: PhotonMode;
    isAdmin?: boolean;
    i18n?: PhotonI18nValue | null;
    uploadMedia?: PhotonMediaUploadHandler;
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
    linkComponent?: PhotonLinkComponent;
    linkFactory?: PhotonLinkFactory;
    navigation?: PhotonNavigationConfig;
    siteFrameExtensions?: PhotonSiteFrameExtension[];
    accountTabs?: PhotonAccountTabExtension[];
    routeContextFields?: PhotonRouteContextField[];
    routeContextValues?: Record<string, unknown>;
};
declare const PhotonProvider: ({ children, initialDocument, initialResources, initialPageSettings, initialSite, registry, workspace, capabilities, initialMode, isAdmin, i18n, uploadMedia, searchSite, requestAuth, requestAuthAction, interactionSurfaces, interactionActions, interactionGuards, interactionGuardEvaluators, interactionSurfaceRenderers, navigate, prefetch, linkComponent, linkFactory, navigation, siteFrameExtensions, accountTabs, routeContextFields, routeContextValues, }: PhotonProviderProps) => react_jsx_runtime.JSX.Element;
declare const usePhotonStoreApi: () => PhotonStore;
declare const usePhotonStore: <T>(selector: (state: PhotonStoreState) => T) => T;
declare const usePhoton: () => PhotonStoreState;
declare const usePhotonFieldValue: (blockId: string, path: string) => unknown;
declare const usePhotonCanEdit: () => boolean;
declare const usePhotonSiteData: () => PhotonResolvedSiteData;
declare const usePhotonRouteContext: () => Record<string, unknown>;
/**
 * Resolves the active state for a block based on its definition's
 * `states` (condition-driven) and `previewScenarios` (builder preview).
 *
 * Resolution order:
 * 1. Builder preview override (`blockPreviewScenarios[blockId]`) wins
 *    when it matches a state or scenario id.
 * 2. First state whose `condition` evaluates `true` against current site/route context.
 * 3. State marked `isDefaultServerState` when client-only conditions are unresolved.
 * 4. `null` when the block declares no states/scenarios.
 *
 * Block components call this with their own `block.id` to render
 * state-specific copy/UI without becoming aware of the resolver.
 */
declare const usePhotonBlockActiveState: (blockId: string) => PhotonBlockActiveStateResolution;
declare const usePhotonPersistedState: () => {
    document: PhotonDocument;
    resources: PhotonResources;
    pageSettings: PhotonPageSettings;
    site: PhotonSite;
};
type PhotonLinkProps = PhotonLinkComponentProps & {
    navigateInPreviewOnly?: boolean;
};
declare const PhotonLink: ({ navigateInPreviewOnly, onClick, ...props }: PhotonLinkProps) => react_jsx_runtime.JSX.Element;

declare const createPhotonTiptapJsonBindingAdapter: (key: string) => PhotonBindingAdapter;

declare const isPhotonMediaValue: (value: unknown) => value is PhotonMediaValue;
declare const resolvePhotonMediaUrl: (value: unknown) => string;
declare const resolvePhotonMediaPreviewUrl: (value: unknown) => string;
declare const updatePhotonMediaUrl: (currentValue: unknown, url: string) => string | PhotonMediaValue;

declare const photonSystemModule: PhotonModule;
declare const photonSystemKit: PhotonInstallableKit;

declare const buildPhotonSearchTargetId: (blockId: string, path: string) => string;
declare const resolvePhotonNavigationConfig: (config?: PhotonNavigationConfig) => {
    adminPathPrefix: string;
    queryKeys: {
        mode: string;
        contentLocale: string;
        profile: string;
        branch: string;
        revision: string;
    };
};
declare const buildPhotonSearchResultHref: (result: PhotonSearchResult, query: string, mode: PhotonMode, isAdmin: boolean, options?: {
    locale?: string;
    contentLocale?: string;
    currentSearchParams?: URLSearchParams;
    navigation?: PhotonNavigationConfig;
    workspaceSelection?: {
        profileId: string;
        branch: string;
        revisionId?: null | string;
    } | null;
}) => string;

type PhotonSearchHighlightEffectProps = {
    activeHighlight?: PhotonSearchHighlight | null;
};
declare const PhotonSearchHighlightEffect: ({ activeHighlight, }: PhotonSearchHighlightEffectProps) => null;

export { EditableGallery, EditableImage, EditableRepeaterValue, EditableRichText, EditableText, EditableTextarea, type KeyboardMenuController, KeyboardMenuList, type KeyboardMenuSection, PhotonAccountTabExtension, PhotonActionPolicy, PhotonArea, PhotonBindingAdapter, PhotonBlock, PhotonBlockRenderer, PhotonComponentLibraryItem, PhotonComponentLibrarySourceSelection, PhotonConditionDefinition, PhotonConditionEvaluatorMap, PhotonDocument, PhotonField, PhotonFieldBinding, PhotonFieldEditorList, PhotonFormSchemaDescriptor, PhotonI18nValue, PhotonInstallableKit, PhotonInteractionActionDefinition, PhotonInteractionActionPresentation, PhotonInteractionExecutionResult, PhotonInteractionGuardDefinition, PhotonInteractionGuardEvaluatorMap, PhotonInteractionPreviewScenario, PhotonInteractionSurfaceDefinition, PhotonInteractionSurfaceOpenHandler, PhotonInteractionSurfaceRendererMap, PhotonInteractionToastHandler, PhotonInteractionToastTemplate, PhotonInteractionTriggerSlot, PhotonLink, PhotonLinkComponent, PhotonLinkComponentProps, PhotonLinkFactory, PhotonMediaUploadHandler, PhotonMediaValue, PhotonMode, PhotonModule, PhotonNavigateHandler, PhotonNavigationConfig, PhotonPageSettings, PhotonPrefetchHandler, PhotonProvider, PhotonRegistry, PhotonResolvedSiteData, PhotonResources, PhotonRichTextEditor, PhotonRouteContextField, PhotonSearchHandler, PhotonSearchHighlight, PhotonSearchHighlightEffect, PhotonSearchResult, PhotonSelectedField, PhotonSite, PhotonSiteDataSchema, PhotonSiteFrameExtension, PhotonSurfaceMode, PhotonSurfaceSection, PhotonWorkspaceCapabilities, PhotonWorkspaceDescriptor, buildPhotonSearchResultHref, buildPhotonSearchTargetId, createPhotonTiptapJsonBindingAdapter, isPhotonMediaValue, photonRichTextContentClassName, photonSystemKit, photonSystemModule, renderPhotonRichTextHtml, resolvePhotonInteractionSurfaceRequest, resolvePhotonMediaPreviewUrl, resolvePhotonMediaUrl, resolvePhotonNavigationConfig, updatePhotonMediaUrl, useKeyboardMenuController, usePhoton, usePhotonBlockActiveState, usePhotonCanEdit, usePhotonFieldValue, usePhotonPersistedState, usePhotonRouteContext, usePhotonSiteData, usePhotonStore, usePhotonStoreApi, usePhotonValueAtPath };
