import * as react from 'react';
import { ComponentType, ReactNode, ElementType, HTMLAttributes, CSSProperties, KeyboardEvent } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { a as PhotonBlock, P as PhotonArea, z as PhotonSurfaceMode, M as PhotonField, b as PhotonDocument, m as PhotonResources, k as PhotonPageSettings, p as PhotonSite, A as PhotonRegistry, t as PhotonWorkspaceDescriptor, s as PhotonWorkspaceCapabilities, E as PhotonMode, F as PhotonMediaUploadHandler, G as PhotonSearchHandler, H as PhotonNavigateHandler, I as PhotonPrefetchHandler, J as PhotonLinkComponent, K as PhotonLinkFactory, a3 as PhotonNavigationConfig, u as PhotonSiteFrameExtension, y as PhotonAccountTabExtension, an as PhotonSelectedField, d as PhotonFieldBinding, a1 as PhotonLinkComponentProps, L as PhotonI18nValue, a6 as PhotonBindingAdapter, h as PhotonMediaValue, X as PhotonInstallableKit, T as PhotonModule, o as PhotonSearchResult, n as PhotonSearchHighlight } from './types-_Y3LUXJR.js';
export { ao as PhotonAccountTabMatch, ap as PhotonActorSummary, aq as PhotonAnyBlockDefinition, a5 as PhotonAuthPageRenderInput, a2 as PhotonAuthPageRenderer, ar as PhotonBindingMode, as as PhotonBlockComponent, a7 as PhotonBlockComponentProps, at as PhotonBlockDefaults, Q as PhotonBlockDefinition, S as PhotonBlockLocalizationSchema, W as PhotonBlockProps, C as PhotonBranchPolicyState, au as PhotonDefaultable, c as PhotonDocumentsMap, av as PhotonFieldKind, aw as PhotonFieldLocalization, a8 as PhotonFieldOption, ax as PhotonInterfaceLocaleOption, a9 as PhotonLinkFactoryOptions, e as PhotonLocaleDescriptor, f as PhotonLocaleStatus, U as PhotonLocalizedDefaultValue, g as PhotonMediaUploadInput, ay as PhotonMergeConflict, az as PhotonMergeDiffItem, D as PhotonMergePreview, aA as PhotonMergeResolutionStrategy, aa as PhotonNavigateOptions, aB as PhotonNavigationQueryKeys, R as PhotonNestedField, i as PhotonPageCatalogItem, j as PhotonPageRuntimeData, N as PhotonPageSettingsPanelDefinition, aC as PhotonPageSettingsPanelProps, ab as PhotonPageSettingsScope, V as PhotonRegistryEntry, l as PhotonResolvedPage, _ as PhotonResolvedSiteDesignSettings, aD as PhotonRevisionChangeSummaryItem, B as PhotonRevisionDescriptor, Y as PhotonRuntime, aE as PhotonSearchInput, aF as PhotonSiteColorSchemeDefinition, $ as PhotonSiteComponentVariants, aG as PhotonSiteDesignAppearance, aH as PhotonSiteDesignColorTokens, aI as PhotonSiteDesignPresetDefinition, Z as PhotonSiteDesignSettings, aJ as PhotonSiteDesignValue, ac as PhotonSiteFrameActionComponentProps, ad as PhotonSiteFrameActionItem, aK as PhotonSiteFrameActionKind, v as PhotonSiteFrameExtensionContext, ae as PhotonSiteFrameFloatingControls, af as PhotonSiteFrameFooterSlot, ag as PhotonSiteFrameFooterSlotItems, w as PhotonSiteFrameFooterSlots, ah as PhotonSiteFrameHeaderSlot, ai as PhotonSiteFrameHeaderSlotItems, x as PhotonSiteFrameHeaderSlots, aj as PhotonSiteFrameLinkItem, ak as PhotonSiteFrameMobileBottomMenuControls, a4 as PhotonSiteFrameMobileControls, al as PhotonSiteFrameMobileMenuControls, am as PhotonSiteFrameMobileMenuType, aL as PhotonSiteFrameNavigationColumn, q as PhotonSiteRegion, r as PhotonSiteSettings, O as PhotonSiteSettingsPanelDefinition, aM as PhotonSiteSettingsPanelProps, a0 as PhotonWorkspaceRef } from './types-_Y3LUXJR.js';
import { StoreApi } from 'zustand/vanilla';
export { b as PhotonI18nProvider, c as PhotonRenderDepthProvider, P as PhotonSiteSearch, r as resolvePhotonText, u as usePhotonI18n, a as usePhotonRenderDepth } from './photon-site-search-C3rRcoDr.js';
export { f as collectPhotonAccountTabs, g as collectPhotonDocuments, h as collectPhotonSiteFrameExtensions, i as createPhotonBlock, c as createPhotonBlockLocalizationSchema, a as createPhotonKit, j as createPhotonLocalizationManifest, b as createPhotonLocalizedDefault, k as createPhotonRegistry, d as createPhotonRuntime, e as definePhotonBlockDefinition, l as getPhotonDefinitionKey, m as getPhotonDocumentFingerprint, n as isPhotonInstallableKit, o as movePhotonArrayItem, r as resolvePhotonModules } from './runtime-9uis0Id-.js';
export { d as decodePhotonHtmlEntities, g as getPhotonAnchorRel, n as normalizePhotonUrlForProtocolCheck, s as sanitizePhotonLinkHref } from './link-url-XwgBLvA0.js';
export { D as DEFAULT_PHOTON_WORKSPACE_CAPABILITIES, a as DEFAULT_PHOTON_WORKSPACE_REF, G as PHOTON_EMPTY_TEXT, P as PHOTON_ROOT_LIST_ID, b as PHOTON_SITE_DESIGN_DEFAULTS, c as PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS, d as applyPhotonSiteColorScheme, e as applyPhotonSiteDesignPreset, f as canEditPhotonWorkspace, g as canSavePhotonWorkspace, h as clonePhotonBlockTreeWithNewIds, i as clonePhotonValue, j as collectBlockIds, k as createPhotonAreaListId, l as createPhotonNodeId, m as createPhotonSiteDesignSettings, n as duplicatePhotonBlockInDocument, o as findPhotonBlock, p as getFirstPhotonBlockId, q as getPhotonWorkspaceIdentityKey, r as getPhotonWorkspaceKey, H as getValueAtPath, s as hasPhotonSiteDesignPresetCustomization, t as insertPhotonBlockInDocument, u as isPhotonFramelessPreset, v as isPhotonFramelessSiteDesign, w as isPhotonSiteDesignPresetApplied, x as isPhotonWorkspaceReadonly, y as movePhotonBlockInDocument, z as normalizePhotonWorkspaceCapabilities, A as normalizePhotonWorkspaceDescriptor, B as normalizePhotonWorkspaceRef, C as removePhotonBlockFromDocument, E as resolvePhotonSiteDesignSettings, I as setValueAtPath, F as updatePhotonBlockInDocument } from './workspace-BJmXfrPf.js';
export { PHOTON_DEFAULT_SITE_DESIGN_PRESET_ID, PHOTON_PAGE_SURFACE_REGION_KEY, composePhotonSurfaceDocument, decomposePhotonSurfaceDocument, getFirstPhotonSurfaceEditableBlockId, getPhotonSiteColorScheme, getPhotonSiteDesignPreset, getPhotonSurfaceRegionBlocks, getPhotonSurfaceRegionListId, photonSiteColorSchemes, photonSiteDesignPresets, resolvePhotonSurfaceRegionDescriptors, resolvePhotonSurfaceRegionForBlockId, resolvePhotonSurfaceRegionForListId } from './server.js';
export { c as collectPhotonFooterExtensionItems, a as collectPhotonHeaderExtensionItems, b as createPhotonAccountTabExtension, d as createPhotonSiteFrameExtension, r as resolvePhotonAccountTabs, e as resolvePhotonSiteFrameExtensions } from './site-frame-extensions-B8_bnzq9.js';
export { g as getPhotonSurfaceModeStyle } from './surface-layout-BmG0aSNx.js';
export { PhotonAccessAuthStateLike, PhotonModeLike, PhotonWorkspaceSelectionLike, normalizePhotonSelectionForMode, resolvePhotonAccess, resolvePhotonMode, resolvePhotonRequestHeaders, resolvePhotonWorkspaceParams } from './sdk.js';
export { P as PHOTON_SEARCH_OCCURRENCE_PARAM, a as PHOTON_SEARCH_QUERY_PARAM, b as PHOTON_SEARCH_TARGET_PARAM } from './constants-Bu7HPDAC.js';
export { I as InsertTarget, a as InspectorDefinitionMeta, b as InspectorGroups, c as PageSettingsPanelDefinition, d as PaletteDefinition, e as PaletteFamilyGroup, P as PhotonStudio, f as PhotonStudioProps, g as PhotonStudioSavePayload, h as PhotonStudioSaveReason, i as PhotonStudioSiteSettingChangeContext, S as SiteSettingsPanelDefinition, j as SiteSettingsSubtabDefinition } from './photon-studio-CioXWJXf.js';

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
    selectedField: PhotonSelectedField;
    uploadMedia?: PhotonMediaUploadHandler;
    searchSite?: PhotonSearchHandler;
    requestAuth?: () => void;
    navigate?: PhotonNavigateHandler;
    prefetch?: PhotonPrefetchHandler;
    linkComponent: PhotonLinkComponent;
    linkFactory: PhotonLinkFactory;
    navigation: PhotonNavigationConfig;
    siteFrameExtensions: PhotonSiteFrameExtension[];
    accountTabs: PhotonAccountTabExtension[];
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
    navigate?: PhotonNavigateHandler;
    prefetch?: PhotonPrefetchHandler;
    linkComponent?: PhotonLinkComponent;
    linkFactory?: PhotonLinkFactory;
    navigation?: PhotonNavigationConfig;
    siteFrameExtensions?: PhotonSiteFrameExtension[];
    accountTabs?: PhotonAccountTabExtension[];
};
declare const PhotonProvider: ({ children, initialDocument, initialResources, initialPageSettings, initialSite, registry, workspace, capabilities, initialMode, isAdmin, i18n, uploadMedia, searchSite, requestAuth, navigate, prefetch, linkComponent, linkFactory, navigation, siteFrameExtensions, accountTabs, }: PhotonProviderProps) => react_jsx_runtime.JSX.Element;
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

export { EditableGallery, EditableImage, EditableRepeaterValue, EditableRichText, EditableText, EditableTextarea, type KeyboardMenuController, KeyboardMenuList, type KeyboardMenuSection, PhotonAccountTabExtension, PhotonArea, PhotonBindingAdapter, PhotonBlock, PhotonBlockRenderer, PhotonDocument, PhotonField, PhotonFieldBinding, PhotonFieldEditorList, PhotonI18nValue, PhotonInstallableKit, PhotonLink, PhotonLinkComponent, PhotonLinkComponentProps, PhotonLinkFactory, PhotonMediaUploadHandler, PhotonMediaValue, PhotonMode, PhotonModule, PhotonNavigateHandler, PhotonNavigationConfig, PhotonPageSettings, PhotonPrefetchHandler, PhotonProvider, PhotonRegistry, PhotonResources, PhotonRichTextEditor, PhotonSearchHandler, PhotonSearchHighlight, PhotonSearchHighlightEffect, PhotonSearchResult, PhotonSelectedField, PhotonSite, PhotonSiteFrameExtension, PhotonSurfaceMode, PhotonSurfaceSection, PhotonWorkspaceCapabilities, PhotonWorkspaceDescriptor, buildPhotonSearchResultHref, buildPhotonSearchTargetId, createPhotonTiptapJsonBindingAdapter, isPhotonMediaValue, photonRichTextContentClassName, photonSystemKit, photonSystemModule, renderPhotonRichTextHtml, resolvePhotonMediaPreviewUrl, resolvePhotonMediaUrl, resolvePhotonNavigationConfig, updatePhotonMediaUrl, useKeyboardMenuController, usePhoton, usePhotonCanEdit, usePhotonFieldValue, usePhotonPersistedState, usePhotonStore, usePhotonStoreApi, usePhotonValueAtPath };
