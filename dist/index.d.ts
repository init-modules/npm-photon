import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode, ElementType, HTMLAttributes, CSSProperties, KeyboardEvent } from 'react';
import { a as WebsiteBuilderBlock, W as WebsiteBuilderArea, u as WebsiteBuilderSurfaceMode, E as WebsiteBuilderField, b as WebsiteBuilderDocument, m as WebsiteBuilderResources, k as WebsiteBuilderPageSettings, p as WebsiteBuilderSite, v as WebsiteBuilderRegistry, t as WebsiteBuilderWorkspaceDescriptor, s as WebsiteBuilderWorkspaceCapabilities, z as WebsiteBuilderMode, A as WebsiteBuilderMediaUploadHandler, B as WebsiteBuilderSearchHandler, C as WebsiteBuilderLinkComponent, L as WebsiteBuilderSelectedField, d as WebsiteBuilderFieldBinding, M as WebsiteBuilderLinkComponentProps, D as WebsiteBuilderI18nValue, N as WebsiteBuilderBindingAdapter, h as WebsiteBuilderMediaValue, O as WebsiteBuilderInstallableKit, P as WebsiteBuilderModule, o as WebsiteBuilderSearchResult, n as WebsiteBuilderSearchHighlight } from './types-HUrNYqTk.js';
export { Q as WebsiteBuilderActorSummary, R as WebsiteBuilderAnyBlockDefinition, S as WebsiteBuilderBindingMode, T as WebsiteBuilderBlockComponent, U as WebsiteBuilderBlockComponentProps, V as WebsiteBuilderBlockDefaults, X as WebsiteBuilderBlockDefinition, Y as WebsiteBuilderBlockLocalizationSchema, Z as WebsiteBuilderBlockProps, x as WebsiteBuilderBranchPolicyState, _ as WebsiteBuilderDefaultable, c as WebsiteBuilderDocumentsMap, $ as WebsiteBuilderFieldKind, a0 as WebsiteBuilderFieldLocalization, a1 as WebsiteBuilderFieldOption, a2 as WebsiteBuilderInterfaceLocaleOption, e as WebsiteBuilderLocaleDescriptor, f as WebsiteBuilderLocaleStatus, a3 as WebsiteBuilderLocalizedDefaultValue, g as WebsiteBuilderMediaUploadInput, a4 as WebsiteBuilderMergeConflict, a5 as WebsiteBuilderMergeDiffItem, y as WebsiteBuilderMergePreview, a6 as WebsiteBuilderMergeResolutionStrategy, a7 as WebsiteBuilderNestedField, i as WebsiteBuilderPageCatalogItem, j as WebsiteBuilderPageRuntimeData, F as WebsiteBuilderPageSettingsPanelDefinition, a8 as WebsiteBuilderPageSettingsPanelProps, a9 as WebsiteBuilderPageSettingsScope, aa as WebsiteBuilderRegistryEntry, l as WebsiteBuilderResolvedPage, I as WebsiteBuilderResolvedSiteDesignSettings, ab as WebsiteBuilderRevisionChangeSummaryItem, w as WebsiteBuilderRevisionDescriptor, ac as WebsiteBuilderRuntime, ad as WebsiteBuilderSearchInput, ae as WebsiteBuilderSiteColorSchemeDefinition, J as WebsiteBuilderSiteComponentVariants, af as WebsiteBuilderSiteDesignAppearance, ag as WebsiteBuilderSiteDesignColorTokens, ah as WebsiteBuilderSiteDesignPresetDefinition, H as WebsiteBuilderSiteDesignSettings, ai as WebsiteBuilderSiteDesignValue, q as WebsiteBuilderSiteRegion, r as WebsiteBuilderSiteSettings, G as WebsiteBuilderSiteSettingsPanelDefinition, aj as WebsiteBuilderSiteSettingsPanelProps, K as WebsiteBuilderWorkspaceRef } from './types-HUrNYqTk.js';
import { StoreApi } from 'zustand/vanilla';
export { WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID, WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY, collectWebsiteBuilderDocuments, composeWebsiteBuilderSurfaceDocument, createWebsiteBuilderBlock, createWebsiteBuilderBlockLocalizationSchema, createWebsiteBuilderKit, createWebsiteBuilderLocalizationManifest, createWebsiteBuilderLocalizedDefault, createWebsiteBuilderRegistry, createWebsiteBuilderRuntime, decomposeWebsiteBuilderSurfaceDocument, defineWebsiteBuilderBlockDefinition, getFirstWebsiteBuilderSurfaceEditableBlockId, getWebsiteBuilderDefinitionKey, getWebsiteBuilderDocumentFingerprint, getWebsiteBuilderSiteColorScheme, getWebsiteBuilderSiteDesignPreset, getWebsiteBuilderSurfaceRegionBlocks, getWebsiteBuilderSurfaceRegionListId, isWebsiteBuilderInstallableKit, moveWebsiteBuilderArrayItem, resolveWebsiteBuilderModules, resolveWebsiteBuilderSurfaceRegionDescriptors, resolveWebsiteBuilderSurfaceRegionForBlockId, resolveWebsiteBuilderSurfaceRegionForListId, websiteBuilderSiteColorSchemes, websiteBuilderSiteDesignPresets } from './server.js';
export { D as DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES, a as DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF, I as WEBSITE_BUILDER_EMPTY_TEXT, W as WEBSITE_BUILDER_ROOT_LIST_ID, b as WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM, c as WEBSITE_BUILDER_SEARCH_QUERY_PARAM, d as WEBSITE_BUILDER_SEARCH_TARGET_PARAM, e as WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS, f as WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS, g as applyWebsiteBuilderSiteColorScheme, h as applyWebsiteBuilderSiteDesignPreset, i as canEditWebsiteBuilderWorkspace, j as canSaveWebsiteBuilderWorkspace, k as cloneWebsiteBuilderBlockTreeWithNewIds, l as cloneWebsiteBuilderValue, m as createWebsiteBuilderAreaListId, n as createWebsiteBuilderNodeId, o as createWebsiteBuilderSiteDesignSettings, p as duplicateWebsiteBuilderBlockInDocument, q as findWebsiteBuilderBlock, r as getFirstWebsiteBuilderBlockId, J as getValueAtPath, s as getWebsiteBuilderWorkspaceIdentityKey, t as getWebsiteBuilderWorkspaceKey, u as hasWebsiteBuilderSiteDesignPresetCustomization, v as insertWebsiteBuilderBlockInDocument, w as isWebsiteBuilderFramelessPreset, x as isWebsiteBuilderFramelessSiteDesign, y as isWebsiteBuilderSiteDesignPresetApplied, z as isWebsiteBuilderWorkspaceReadonly, A as moveWebsiteBuilderBlockInDocument, B as normalizeWebsiteBuilderWorkspaceCapabilities, C as normalizeWebsiteBuilderWorkspaceDescriptor, E as normalizeWebsiteBuilderWorkspaceRef, F as removeWebsiteBuilderBlockFromDocument, G as resolveWebsiteBuilderSiteDesignSettings, K as setValueAtPath, H as updateWebsiteBuilderBlockInDocument } from './constants-ghJfLI0T.js';
export { g as getWebsiteBuilderSurfaceModeStyle } from './surface-layout-Dg7kPXS2.js';
export { WebsiteBuilderAccessAuthStateLike, WebsiteBuilderModeLike, WebsiteBuilderWorkspaceSelectionLike, normalizeWebsiteBuilderSelectionForMode, resolveWebsiteBuilderAccess, resolveWebsiteBuilderMode, resolveWebsiteBuilderRequestHeaders, resolveWebsiteBuilderWorkspaceParams } from './sdk.js';
export { I as InsertTarget, a as InspectorDefinitionMeta, b as InspectorGroups, P as PageSettingsPanelDefinition, c as PaletteDefinition, d as PaletteFamilyGroup, S as SiteSettingsPanelDefinition, e as SiteSettingsSubtabDefinition, W as WebsiteBuilderStudio, f as WebsiteBuilderStudioProps, g as WebsiteBuilderStudioSavePayload, h as WebsiteBuilderStudioSaveReason, i as WebsiteBuilderStudioSiteSettingChangeContext } from './website-builder-studio-BxJBDREm.js';

type WebsiteBuilderBlockRendererProps = {
    block: WebsiteBuilderBlock;
    renderArea?: (area: WebsiteBuilderArea, index: number) => ReactNode;
};
declare const WebsiteBuilderBlockRenderer: ({ block, renderArea, }: WebsiteBuilderBlockRendererProps) => react_jsx_runtime.JSX.Element;

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

declare const useWebsiteBuilderValueAtPath: (blockId: string, path: string) => unknown;

type WebsiteBuilderRichTextEditorProps = {
    value: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onEscape?: () => void;
    placeholder?: string;
    className?: string;
    surfaceClassName?: string;
};
declare const websiteBuilderRichTextContentClassName = "text-[var(--wb-site-text)] [&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--wb-site-border)] [&_blockquote]:pl-4 [&_blockquote]:text-[var(--wb-site-muted-text)] [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.04em] [&_h2]:text-[var(--wb-site-text)] [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-[-0.03em] [&_h3]:text-[var(--wb-site-text)] [&_li]:text-[var(--wb-site-text)] [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:leading-8 [&_p]:text-[var(--wb-site-text)] [&_p+p]:mt-4 [&_strong]:font-semibold [&_strong]:text-[var(--wb-site-text)] [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5";
declare const renderWebsiteBuilderRichTextHtml: (value: string, placeholder?: string) => string;
declare const WebsiteBuilderRichTextEditor: ({ value, onChange, onFocus, onBlur, onEscape, placeholder, className, surfaceClassName, }: WebsiteBuilderRichTextEditorProps) => react_jsx_runtime.JSX.Element | null;

type WebsiteBuilderSurfaceSectionProps<T extends ElementType> = {
    as?: T;
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    surfaceMode?: WebsiteBuilderSurfaceMode;
};
declare const WebsiteBuilderSurfaceSection: <T extends ElementType = "section">({ as, children, className, style, surfaceMode, }: WebsiteBuilderSurfaceSectionProps<T>) => react.ReactElement<any, string | react.JSXElementConstructor<any>>;

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

type WebsiteBuilderFieldEditorListProps = {
    fields: WebsiteBuilderField[];
    subjectId: string;
    getValue: (path: string) => unknown;
    onChange: (path: string, value: unknown) => void;
    onFocus: (path: string) => void;
};
declare const WebsiteBuilderFieldEditorList: ({ fields, subjectId, getValue, onChange, onFocus, }: WebsiteBuilderFieldEditorListProps) => react_jsx_runtime.JSX.Element;

type InsertBlockInput = {
    module: string;
    type: string;
    listId?: string;
    index?: number;
};
type WebsiteBuilderStoreState = {
    document: WebsiteBuilderDocument;
    resources: WebsiteBuilderResources;
    pageSettings: WebsiteBuilderPageSettings;
    site: WebsiteBuilderSite;
    workspace: WebsiteBuilderWorkspaceDescriptor;
    capabilities: WebsiteBuilderWorkspaceCapabilities;
    initialDocument: WebsiteBuilderDocument;
    initialResources: WebsiteBuilderResources;
    initialPageSettings: WebsiteBuilderPageSettings;
    initialSite: WebsiteBuilderSite;
    initialWorkspace: WebsiteBuilderWorkspaceDescriptor;
    initialCapabilities: WebsiteBuilderWorkspaceCapabilities;
    registry: WebsiteBuilderRegistry;
    mode: WebsiteBuilderMode;
    isAdmin: boolean;
    selectedBlockId: string | null;
    selectedField: WebsiteBuilderSelectedField;
    uploadMedia?: WebsiteBuilderMediaUploadHandler;
    searchSite?: WebsiteBuilderSearchHandler;
    requestAuth?: () => void;
    linkComponent: WebsiteBuilderLinkComponent;
    contentLocale: string;
    defaultLocale: string;
    contentRevision: number;
    collapsedBlockIds: Record<string, true>;
    setMode: (nextMode: WebsiteBuilderMode) => void;
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
    getFieldBinding: (blockId: string, path: string) => WebsiteBuilderFieldBinding | null;
    insertBlock: (input: InsertBlockInput) => void;
    duplicateBlock: (blockId: string) => void;
    removeBlock: (blockId: string) => void;
    moveBlock: (activeBlockId: string, targetListId: string, targetIndex: number) => void;
    replaceState: (nextDocument: WebsiteBuilderDocument, nextResources?: WebsiteBuilderResources, nextPageSettings?: WebsiteBuilderPageSettings, nextSite?: WebsiteBuilderSite, options?: {
        workspace?: WebsiteBuilderWorkspaceDescriptor;
        capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
    }) => void;
    syncExternalState: (input: {
        initialDocument: WebsiteBuilderDocument;
        initialResources?: WebsiteBuilderResources;
        initialPageSettings?: WebsiteBuilderPageSettings;
        initialSite?: WebsiteBuilderSite;
        workspace?: WebsiteBuilderWorkspaceDescriptor;
        capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
    }) => void;
    resetDocument: () => void;
    toggleBlockCollapse: (blockId: string) => void;
    collapseAllBlocks: () => void;
    expandAllBlocks: () => void;
};
type WebsiteBuilderStore = StoreApi<WebsiteBuilderStoreState>;
type WebsiteBuilderStoreInit = {
    initialDocument: WebsiteBuilderDocument;
    initialResources?: WebsiteBuilderResources;
    initialPageSettings?: WebsiteBuilderPageSettings;
    initialSite?: WebsiteBuilderSite;
    registry: WebsiteBuilderRegistry;
    workspace?: WebsiteBuilderWorkspaceDescriptor;
    capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
    initialMode?: WebsiteBuilderMode;
    isAdmin?: boolean;
    uploadMedia?: WebsiteBuilderMediaUploadHandler;
    searchSite?: WebsiteBuilderSearchHandler;
    requestAuth?: () => void;
    linkComponent: WebsiteBuilderLinkComponent;
    i18n?: {
        contentLocale?: string;
        defaultLocale?: string;
    };
};

type WebsiteBuilderProviderProps = {
    children: ReactNode;
    initialDocument: WebsiteBuilderStoreInit["initialDocument"];
    initialResources?: WebsiteBuilderResources;
    initialPageSettings?: WebsiteBuilderPageSettings;
    initialSite?: WebsiteBuilderSite;
    registry: WebsiteBuilderRegistry;
    workspace?: WebsiteBuilderWorkspaceDescriptor;
    capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
    initialMode?: WebsiteBuilderMode;
    isAdmin?: boolean;
    i18n?: WebsiteBuilderI18nValue | null;
    uploadMedia?: WebsiteBuilderMediaUploadHandler;
    searchSite?: WebsiteBuilderSearchHandler;
    requestAuth?: () => void;
    linkComponent?: WebsiteBuilderLinkComponent;
};
declare const WebsiteBuilderProvider: ({ children, initialDocument, initialResources, initialPageSettings, initialSite, registry, workspace, capabilities, initialMode, isAdmin, i18n, uploadMedia, searchSite, requestAuth, linkComponent, }: WebsiteBuilderProviderProps) => react_jsx_runtime.JSX.Element;
declare const useWebsiteBuilderStoreApi: () => WebsiteBuilderStore;
declare const useWebsiteBuilderStore: <T>(selector: (state: WebsiteBuilderStoreState) => T) => T;
declare const useWebsiteBuilder: () => WebsiteBuilderStoreState;
declare const useWebsiteBuilderFieldValue: (blockId: string, path: string) => unknown;
declare const useWebsiteBuilderCanEdit: () => boolean;
declare const useWebsiteBuilderPersistedState: () => {
    document: WebsiteBuilderDocument;
    resources: WebsiteBuilderResources;
    pageSettings: WebsiteBuilderPageSettings;
    site: WebsiteBuilderSite;
};
type WebsiteBuilderLinkProps = WebsiteBuilderLinkComponentProps & {
    navigateInPreviewOnly?: boolean;
};
declare const WebsiteBuilderLink: ({ navigateInPreviewOnly, onClick, ...props }: WebsiteBuilderLinkProps) => react_jsx_runtime.JSX.Element;

declare const WebsiteBuilderRenderDepthProvider: react.Provider<number>;
declare const useWebsiteBuilderRenderDepth: () => number;

declare const WebsiteBuilderI18nProvider: ({ children, value, }: {
    children: ReactNode;
    value?: Partial<WebsiteBuilderI18nValue> | null;
}) => react_jsx_runtime.JSX.Element;
declare const useWebsiteBuilderI18n: () => WebsiteBuilderI18nValue;
declare const resolveWebsiteBuilderText: (value: string, translate: WebsiteBuilderI18nValue["translate"], fallback?: string) => string;

declare const createWebsiteBuilderTiptapJsonBindingAdapter: (key: string) => WebsiteBuilderBindingAdapter;

declare const isWebsiteBuilderMediaValue: (value: unknown) => value is WebsiteBuilderMediaValue;
declare const resolveWebsiteBuilderMediaUrl: (value: unknown) => string;
declare const resolveWebsiteBuilderMediaPreviewUrl: (value: unknown) => string;
declare const updateWebsiteBuilderMediaUrl: (currentValue: unknown, url: string) => string | WebsiteBuilderMediaValue;

declare const websiteBuilderSystemModule: WebsiteBuilderModule;
declare const websiteBuilderSystemKit: WebsiteBuilderInstallableKit;

declare const buildWebsiteBuilderSearchTargetId: (blockId: string, path: string) => string;
declare const buildWebsiteBuilderSearchResultHref: (result: WebsiteBuilderSearchResult, query: string, mode: WebsiteBuilderMode, isAdmin: boolean, options?: {
    locale?: string;
    contentLocale?: string;
    currentSearchParams?: URLSearchParams;
    workspaceSelection?: {
        profileId: string;
        branch: string;
        revisionId?: null | string;
    } | null;
}) => string;

type WebsiteBuilderSearchHighlightEffectProps = {
    activeHighlight?: WebsiteBuilderSearchHighlight | null;
};
declare const WebsiteBuilderSearchHighlightEffect: ({ activeHighlight, }: WebsiteBuilderSearchHighlightEffectProps) => null;

type WebsiteBuilderSiteSearchProps = {
    blockId: string;
    placeholderPath: string;
    className?: string;
};
declare const WebsiteBuilderSiteSearch: ({ blockId, placeholderPath, className, }: WebsiteBuilderSiteSearchProps) => react_jsx_runtime.JSX.Element;

export { EditableGallery, EditableImage, EditableRepeaterValue, EditableRichText, EditableText, EditableTextarea, type KeyboardMenuController, KeyboardMenuList, type KeyboardMenuSection, WebsiteBuilderArea, WebsiteBuilderBindingAdapter, WebsiteBuilderBlock, WebsiteBuilderBlockRenderer, WebsiteBuilderDocument, WebsiteBuilderField, WebsiteBuilderFieldBinding, WebsiteBuilderFieldEditorList, WebsiteBuilderI18nProvider, WebsiteBuilderI18nValue, WebsiteBuilderInstallableKit, WebsiteBuilderLink, WebsiteBuilderLinkComponent, WebsiteBuilderLinkComponentProps, WebsiteBuilderMediaUploadHandler, WebsiteBuilderMediaValue, WebsiteBuilderMode, WebsiteBuilderModule, WebsiteBuilderPageSettings, WebsiteBuilderProvider, WebsiteBuilderRegistry, WebsiteBuilderRenderDepthProvider, WebsiteBuilderResources, WebsiteBuilderRichTextEditor, WebsiteBuilderSearchHandler, WebsiteBuilderSearchHighlight, WebsiteBuilderSearchHighlightEffect, WebsiteBuilderSearchResult, WebsiteBuilderSelectedField, WebsiteBuilderSite, WebsiteBuilderSiteSearch, WebsiteBuilderSurfaceMode, WebsiteBuilderSurfaceSection, WebsiteBuilderWorkspaceCapabilities, WebsiteBuilderWorkspaceDescriptor, buildWebsiteBuilderSearchResultHref, buildWebsiteBuilderSearchTargetId, createWebsiteBuilderTiptapJsonBindingAdapter, isWebsiteBuilderMediaValue, renderWebsiteBuilderRichTextHtml, resolveWebsiteBuilderMediaPreviewUrl, resolveWebsiteBuilderMediaUrl, resolveWebsiteBuilderText, updateWebsiteBuilderMediaUrl, useKeyboardMenuController, useWebsiteBuilder, useWebsiteBuilderCanEdit, useWebsiteBuilderFieldValue, useWebsiteBuilderI18n, useWebsiteBuilderPersistedState, useWebsiteBuilderRenderDepth, useWebsiteBuilderStore, useWebsiteBuilderStoreApi, useWebsiteBuilderValueAtPath, websiteBuilderRichTextContentClassName, websiteBuilderSystemKit, websiteBuilderSystemModule };
