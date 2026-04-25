import * as react from 'react';
import { ComponentType, ReactNode, ElementType, HTMLAttributes, CSSProperties, KeyboardEvent } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { a as PhotonBlock, P as PhotonArea, a2 as PhotonSurfaceMode, ag as PhotonField, i as PhotonDocument, R as PhotonResources, O as PhotonPageSettings, U as PhotonSite, a3 as PhotonRegistry, Y as PhotonWorkspaceDescriptor, X as PhotonWorkspaceCapabilities, a7 as PhotonMode, a8 as PhotonMediaUploadHandler, a9 as PhotonSearchHandler, o as PhotonInteractionActionPresentation, A as PhotonInteractionSurfaceDefinition, l as PhotonInteractionActionDefinition, r as PhotonInteractionGuardDefinition, v as PhotonInteractionGuardEvaluatorMap, ae as PhotonInteractionSurfaceRendererMap, F as PhotonInteractionToastTemplate, aa as PhotonNavigateHandler, ab as PhotonPrefetchHandler, ac as PhotonLinkComponent, ad as PhotonLinkFactory, aI as PhotonNavigationConfig, Z as PhotonSiteFrameExtension, a1 as PhotonAccountTabExtension, e as PhotonComponentLibrarySourceSelection, b8 as PhotonSelectedField, aJ as PhotonInteractionSurfaceOpenHandler, aK as PhotonInteractionToastHandler, p as PhotonInteractionExecutionResult, H as PhotonInteractionTriggerSlot, y as PhotonInteractionPreviewScenario, k as PhotonFieldBinding, c as PhotonComponentLibraryItem, aG as PhotonLinkComponentProps, af as PhotonI18nValue, aO as PhotonBindingAdapter, L as PhotonMediaValue, ar as PhotonInstallableKit, an as PhotonModule, T as PhotonSearchResult, S as PhotonSearchHighlight } from './types-DkoIiv0C.js';
export { b9 as PhotonAccountTabMatch, at as PhotonActionValue, ba as PhotonActorSummary, bb as PhotonAnyBlockDefinition, aN as PhotonAuthPageRenderInput, aH as PhotonAuthPageRenderer, bc as PhotonBindingMode, bd as PhotonBlockComponent, aP as PhotonBlockComponentProps, be as PhotonBlockDefaults, ak as PhotonBlockDefinition, ay as PhotonBlockInteractionSlotContext, am as PhotonBlockLocalizationSchema, aq as PhotonBlockProps, a5 as PhotonBranchPolicyState, b as PhotonComponentLibraryEditorSelection, d as PhotonComponentLibrarySettings, f as PhotonComponentLibraryUsage, g as PhotonComponentLibraryUsageProvider, h as PhotonComponentReferenceProps, bf as PhotonDefaultable, j as PhotonDocumentsMap, bg as PhotonFieldKind, bh as PhotonFieldLocalization, aQ as PhotonFieldOption, m as PhotonInteractionActionExecutionHandlers, n as PhotonInteractionActionInstance, q as PhotonInteractionExecutionStatus, s as PhotonInteractionGuardEvaluationContext, t as PhotonInteractionGuardEvaluationResult, u as PhotonInteractionGuardEvaluator, w as PhotonInteractionGuardInstance, x as PhotonInteractionGuardMissingEvaluatorPolicy, z as PhotonInteractionSettings, B as PhotonInteractionSurfaceInstance, C as PhotonInteractionSurfaceIntentBinding, aR as PhotonInteractionSurfaceKind, aS as PhotonInteractionSurfaceRenderer, aj as PhotonInteractionSurfaceRendererProps, D as PhotonInteractionSurfaceSettings, E as PhotonInteractionSurfaceTrigger, aT as PhotonInteractionSurfaceVariant, aw as PhotonInteractionToastInput, aU as PhotonInteractionToastStatus, G as PhotonInteractionTriggerBinding, bi as PhotonInterfaceLocaleOption, aV as PhotonLinkFactoryOptions, I as PhotonLocaleDescriptor, J as PhotonLocaleStatus, ao as PhotonLocalizedDefaultValue, K as PhotonMediaUploadInput, bj as PhotonMergeConflict, bk as PhotonMergeDiffItem, a6 as PhotonMergePreview, bl as PhotonMergeResolutionStrategy, aW as PhotonNavigateOptions, bm as PhotonNavigationQueryKeys, al as PhotonNestedField, M as PhotonPageCatalogItem, N as PhotonPageRuntimeData, ah as PhotonPageSettingsPanelDefinition, bn as PhotonPageSettingsPanelProps, aX as PhotonPageSettingsScope, ap as PhotonRegistryEntry, ax as PhotonResolvedInteractionActionCatalog, au as PhotonResolvedInteractionSurfaceCatalog, av as PhotonResolvedInteractionSurfaceRequest, Q as PhotonResolvedPage, aD as PhotonResolvedSiteDesignSettings, bo as PhotonRevisionChangeSummaryItem, a4 as PhotonRevisionDescriptor, as as PhotonRuntime, bp as PhotonSearchInput, bq as PhotonSiteColorSchemeDefinition, aE as PhotonSiteComponentVariants, br as PhotonSiteDesignAppearance, bs as PhotonSiteDesignColorTokens, bt as PhotonSiteDesignPresetDefinition, aC as PhotonSiteDesignSettings, bu as PhotonSiteDesignValue, aY as PhotonSiteFrameActionComponentProps, aZ as PhotonSiteFrameActionItem, bv as PhotonSiteFrameActionKind, _ as PhotonSiteFrameExtensionContext, a_ as PhotonSiteFrameFloatingControls, a$ as PhotonSiteFrameFooterSlot, b0 as PhotonSiteFrameFooterSlotItems, $ as PhotonSiteFrameFooterSlots, b1 as PhotonSiteFrameHeaderSlot, b2 as PhotonSiteFrameHeaderSlotItems, a0 as PhotonSiteFrameHeaderSlots, b3 as PhotonSiteFrameLinkItem, b4 as PhotonSiteFrameMobileBottomMenuControls, aL as PhotonSiteFrameMobileControls, b5 as PhotonSiteFrameMobileMenuControls, aM as PhotonSiteFrameMobileMenuTriggerPlacement, b6 as PhotonSiteFrameMobileMenuType, b7 as PhotonSiteFrameNavigationColumn, V as PhotonSiteRegion, W as PhotonSiteSettings, ai as PhotonSiteSettingsPanelDefinition, bw as PhotonSiteSettingsPanelProps, bx as PhotonStudioInteractionTab, by as PhotonStudioPaletteTab, aA as PhotonStudioSurfaceMode, aB as PhotonStudioUrlState, az as PhotonStudioUrlStatePatch, aF as PhotonWorkspaceRef } from './types-DkoIiv0C.js';
import { StoreApi } from 'zustand/vanilla';
import { R as resolvePhotonInteractionSurfaceRequest } from './constants-C5-uAwL9.js';
export { P as PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY, a as PHOTON_COMPONENT_REFERENCE_AREA_ID, b as PHOTON_COMPONENT_REFERENCE_MAX_DEPTH, c as PHOTON_COMPONENT_REFERENCE_MODULE, d as PHOTON_COMPONENT_REFERENCE_TYPE, e as PHOTON_INTERACTIONS_SITE_SETTING_KEY, f as PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY, g as PHOTON_SEARCH_OCCURRENCE_PARAM, h as PHOTON_SEARCH_QUERY_PARAM, i as PHOTON_SEARCH_TARGET_PARAM, j as clonePhotonComponentLibraryBlocksForCopy, k as clonePhotonComponentSourceBlockWithNewIds, l as collectPhotonComponentLibraryUsages, m as createPhotonActionValue, n as createPhotonComponentLibraryBlockId, o as createPhotonComponentLibraryItemFromBlock, p as createPhotonComponentReferenceBlock, q as createPhotonInteractionActionDefinition, r as createPhotonInteractionExecutionResult, s as createPhotonInteractionGuardDefinition, t as createPhotonInteractionSurfaceDefinition, u as createPhotonInteractionTriggerSlot, v as duplicatePhotonComponentLibraryItem, w as evaluatePhotonInteractionGuards, x as executePhotonInteractionActionPresentation, y as executePhotonInteractionTriggerSlot, z as getPhotonComponentLibraryItems, A as isPhotonComponentReferenceBlock, B as mergePhotonStudioUrlState, C as normalizePhotonStudioSurfaceMode, D as parsePhotonComponentLibraryBlockId, E as parsePhotonStudioUrlState, F as photonInteractionExecutionSucceeded, G as readPhotonComponentLibrarySettings, H as readPhotonInteractionSettings, I as readPhotonInteractionSurfaceSettings, J as remapPhotonComponentLibraryBlock, K as resolvePhotonBlockInteractionSlots, L as resolvePhotonComponentReferenceBlocks, M as resolvePhotonInteractionActionCatalog, N as resolvePhotonInteractionSlotAction, O as resolvePhotonInteractionSlotGuards, Q as resolvePhotonInteractionSurfaceCatalog, S as resolvePhotonInteractionToastTemplate, T as writePhotonStudioUrlState } from './constants-C5-uAwL9.js';
export { c as PhotonI18nProvider, d as PhotonRenderDepthProvider, P as PhotonSiteSearch, a as PhotonSiteSearchSurfaceRenderer, r as resolvePhotonText, u as usePhotonI18n, b as usePhotonRenderDepth } from './photon-site-search-C_qg0k2X.js';
export { f as collectPhotonAccountTabs, g as collectPhotonDocuments, h as collectPhotonInteractionActions, i as collectPhotonInteractionGuardEvaluators, j as collectPhotonInteractionGuards, k as collectPhotonInteractionSurfaces, l as collectPhotonSiteFrameExtensions, m as createPhotonBlock, c as createPhotonBlockLocalizationSchema, a as createPhotonKit, n as createPhotonLocalizationManifest, b as createPhotonLocalizedDefault, o as createPhotonRegistry, d as createPhotonRuntime, e as definePhotonBlockDefinition, p as getPhotonDefinitionKey, q as getPhotonDocumentFingerprint, r as isPhotonInstallableKit, s as movePhotonArrayItem, t as resolvePhotonModules } from './runtime-D29vnJUy.js';
export { d as decodePhotonHtmlEntities, g as getPhotonAnchorRel, n as normalizePhotonUrlForProtocolCheck, s as sanitizePhotonLinkHref } from './link-url-XwgBLvA0.js';
export { D as DEFAULT_PHOTON_WORKSPACE_CAPABILITIES, a as DEFAULT_PHOTON_WORKSPACE_REF, I as PHOTON_EMPTY_TEXT, P as PHOTON_ROOT_LIST_ID, b as PHOTON_SITE_DESIGN_DEFAULTS, c as PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS, d as applyPhotonSiteColorScheme, e as applyPhotonSiteDesignPreset, f as canEditPhotonWorkspace, g as canSavePhotonWorkspace, h as clonePhotonBlockTreeWithNewIds, i as clonePhotonValue, j as collectBlockIds, k as createPhotonAreaListId, l as createPhotonNodeId, m as createPhotonSiteDesignSettings, n as duplicatePhotonBlockInDocument, o as findPhotonBlock, p as getFirstPhotonBlockId, q as getPhotonWorkspaceIdentityKey, r as getPhotonWorkspaceKey, J as getValueAtPath, s as hasPhotonSiteDesignPresetCustomization, t as insertPhotonBlockInDocument, u as insertPhotonBlocksInDocument, v as isPhotonFramelessPreset, w as isPhotonFramelessSiteDesign, x as isPhotonSiteDesignPresetApplied, y as isPhotonWorkspaceReadonly, z as movePhotonBlockInDocument, A as normalizePhotonWorkspaceCapabilities, B as normalizePhotonWorkspaceDescriptor, C as normalizePhotonWorkspaceRef, E as removePhotonBlockFromDocument, F as replacePhotonBlockWithBlocksInDocument, G as resolvePhotonSiteDesignSettings, K as setValueAtPath, H as updatePhotonBlockInDocument } from './workspace-OF2RAtTm.js';
export { PHOTON_DEFAULT_SITE_DESIGN_PRESET_ID, PHOTON_PAGE_SURFACE_REGION_KEY, composePhotonSurfaceDocument, decomposePhotonSurfaceDocument, getFirstPhotonSurfaceEditableBlockId, getPhotonSiteColorScheme, getPhotonSiteDesignPreset, getPhotonSurfaceRegionBlocks, getPhotonSurfaceRegionListId, photonSiteColorSchemes, photonSiteDesignPresets, resolvePhotonSurfaceRegionDescriptors, resolvePhotonSurfaceRegionForBlockId, resolvePhotonSurfaceRegionForListId } from './server.js';
export { c as collectPhotonFooterExtensionItems, a as collectPhotonHeaderExtensionItems, b as createPhotonAccountTabExtension, d as createPhotonSiteFrameExtension, r as resolvePhotonAccountTabs, e as resolvePhotonSiteFrameExtensions } from './site-frame-extensions-DB1lCXlC.js';
export { g as getPhotonSurfaceModeStyle } from './surface-layout-CYZEKvb-.js';
export { PhotonAccessAuthStateLike, PhotonModeLike, PhotonWorkspaceSelectionLike, normalizePhotonSelectionForMode, resolvePhotonAccess, resolvePhotonMode, resolvePhotonRequestHeaders, resolvePhotonWorkspaceParams } from './sdk.js';
export { I as InsertTarget, a as InspectorDefinitionMeta, b as InspectorGroups, c as PageSettingsPanelDefinition, d as PaletteDefinition, e as PaletteFamilyGroup, P as PhotonStudio, f as PhotonStudioProps, g as PhotonStudioSavePayload, h as PhotonStudioSaveReason, i as PhotonStudioSiteSettingChangeContext, S as SiteSettingsPanelDefinition, j as SiteSettingsSubtabDefinition } from './photon-studio-Cu9ddXD6.js';

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
    interactionSurfaceRenderers: PhotonInteractionSurfaceRendererMap;
    activeInteractionSurface: ReturnType<typeof resolvePhotonInteractionSurfaceRequest>;
    contentLocale: string;
    defaultLocale: string;
    contentRevision: number;
    collapsedBlockIds: Record<string, true>;
    setMode: (nextMode: PhotonMode) => void;
    selectBlock: (blockId: string | null) => void;
    selectField: (blockId: string, path: string) => void;
    clearSelectedField: () => void;
    selectPageSettingField: (path: string) => void;
    selectSiteSettingField: (path: string) => void;
    updateFieldValue: (blockId: string, path: string, value: unknown) => void;
    getFieldValue: (blockId: string, path: string) => unknown;
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
};
declare const PhotonProvider: ({ children, initialDocument, initialResources, initialPageSettings, initialSite, registry, workspace, capabilities, initialMode, isAdmin, i18n, uploadMedia, searchSite, requestAuth, requestAuthAction, interactionSurfaces, interactionActions, interactionGuards, interactionGuardEvaluators, interactionSurfaceRenderers, navigate, prefetch, linkComponent, linkFactory, navigation, siteFrameExtensions, accountTabs, }: PhotonProviderProps) => react_jsx_runtime.JSX.Element;
declare const usePhotonStoreApi: () => PhotonStore;
declare const usePhotonStore: <T>(selector: (state: PhotonStoreState) => T) => T;
declare const usePhoton: () => PhotonStoreState;
declare const usePhotonFieldValue: (blockId: string, path: string) => unknown;
declare const usePhotonCanEdit: () => boolean;
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

export { EditableGallery, EditableImage, EditableRepeaterValue, EditableRichText, EditableText, EditableTextarea, type KeyboardMenuController, KeyboardMenuList, type KeyboardMenuSection, PhotonAccountTabExtension, PhotonArea, PhotonBindingAdapter, PhotonBlock, PhotonBlockRenderer, PhotonComponentLibraryItem, PhotonComponentLibrarySourceSelection, PhotonDocument, PhotonField, PhotonFieldBinding, PhotonFieldEditorList, PhotonI18nValue, PhotonInstallableKit, PhotonInteractionActionDefinition, PhotonInteractionActionPresentation, PhotonInteractionExecutionResult, PhotonInteractionGuardDefinition, PhotonInteractionGuardEvaluatorMap, PhotonInteractionPreviewScenario, PhotonInteractionSurfaceDefinition, PhotonInteractionSurfaceOpenHandler, PhotonInteractionSurfaceRendererMap, PhotonInteractionToastHandler, PhotonInteractionToastTemplate, PhotonInteractionTriggerSlot, PhotonLink, PhotonLinkComponent, PhotonLinkComponentProps, PhotonLinkFactory, PhotonMediaUploadHandler, PhotonMediaValue, PhotonMode, PhotonModule, PhotonNavigateHandler, PhotonNavigationConfig, PhotonPageSettings, PhotonPrefetchHandler, PhotonProvider, PhotonRegistry, PhotonResources, PhotonRichTextEditor, PhotonSearchHandler, PhotonSearchHighlight, PhotonSearchHighlightEffect, PhotonSearchResult, PhotonSelectedField, PhotonSite, PhotonSiteFrameExtension, PhotonSurfaceMode, PhotonSurfaceSection, PhotonWorkspaceCapabilities, PhotonWorkspaceDescriptor, buildPhotonSearchResultHref, buildPhotonSearchTargetId, createPhotonTiptapJsonBindingAdapter, isPhotonMediaValue, photonRichTextContentClassName, photonSystemKit, photonSystemModule, renderPhotonRichTextHtml, resolvePhotonInteractionSurfaceRequest, resolvePhotonMediaPreviewUrl, resolvePhotonMediaUrl, resolvePhotonNavigationConfig, updatePhotonMediaUrl, useKeyboardMenuController, usePhoton, usePhotonCanEdit, usePhotonFieldValue, usePhotonPersistedState, usePhotonStore, usePhotonStoreApi, usePhotonValueAtPath };
