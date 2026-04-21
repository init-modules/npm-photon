import * as react from 'react';
import { ComponentType, ReactNode, ElementType, HTMLAttributes, CSSProperties, KeyboardEvent } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { a as WebsiteBuilderBlock, W as WebsiteBuilderArea, z as WebsiteBuilderSurfaceMode, J as WebsiteBuilderField, a0 as WebsiteBuilderBindingAdapter, h as WebsiteBuilderMediaValue, T as WebsiteBuilderInstallableKit, P as WebsiteBuilderModule, o as WebsiteBuilderSearchResult, E as WebsiteBuilderMode, n as WebsiteBuilderSearchHighlight } from './types-CuFDrLWO.js';
export { y as WebsiteBuilderAccountTabExtension, a4 as WebsiteBuilderAccountTabMatch, a5 as WebsiteBuilderActorSummary, a6 as WebsiteBuilderAnyBlockDefinition, a7 as WebsiteBuilderBindingMode, a8 as WebsiteBuilderBlockComponent, a1 as WebsiteBuilderBlockComponentProps, a9 as WebsiteBuilderBlockDefaults, M as WebsiteBuilderBlockDefinition, O as WebsiteBuilderBlockLocalizationSchema, S as WebsiteBuilderBlockProps, C as WebsiteBuilderBranchPolicyState, aa as WebsiteBuilderDefaultable, b as WebsiteBuilderDocument, c as WebsiteBuilderDocumentsMap, d as WebsiteBuilderFieldBinding, ab as WebsiteBuilderFieldKind, ac as WebsiteBuilderFieldLocalization, a2 as WebsiteBuilderFieldOption, I as WebsiteBuilderI18nValue, ad as WebsiteBuilderInterfaceLocaleOption, H as WebsiteBuilderLinkComponent, $ as WebsiteBuilderLinkComponentProps, e as WebsiteBuilderLocaleDescriptor, f as WebsiteBuilderLocaleStatus, Q as WebsiteBuilderLocalizedDefaultValue, F as WebsiteBuilderMediaUploadHandler, g as WebsiteBuilderMediaUploadInput, ae as WebsiteBuilderMergeConflict, af as WebsiteBuilderMergeDiffItem, D as WebsiteBuilderMergePreview, ag as WebsiteBuilderMergeResolutionStrategy, N as WebsiteBuilderNestedField, i as WebsiteBuilderPageCatalogItem, j as WebsiteBuilderPageRuntimeData, k as WebsiteBuilderPageSettings, K as WebsiteBuilderPageSettingsPanelDefinition, ah as WebsiteBuilderPageSettingsPanelProps, a3 as WebsiteBuilderPageSettingsScope, A as WebsiteBuilderRegistry, R as WebsiteBuilderRegistryEntry, l as WebsiteBuilderResolvedPage, X as WebsiteBuilderResolvedSiteDesignSettings, m as WebsiteBuilderResources, ai as WebsiteBuilderRevisionChangeSummaryItem, B as WebsiteBuilderRevisionDescriptor, U as WebsiteBuilderRuntime, G as WebsiteBuilderSearchHandler, aj as WebsiteBuilderSearchInput, _ as WebsiteBuilderSelectedField, p as WebsiteBuilderSite, ak as WebsiteBuilderSiteColorSchemeDefinition, Y as WebsiteBuilderSiteComponentVariants, al as WebsiteBuilderSiteDesignAppearance, am as WebsiteBuilderSiteDesignColorTokens, an as WebsiteBuilderSiteDesignPresetDefinition, V as WebsiteBuilderSiteDesignSettings, ao as WebsiteBuilderSiteDesignValue, x as WebsiteBuilderSiteFrameActionItem, ap as WebsiteBuilderSiteFrameActionKind, u as WebsiteBuilderSiteFrameExtension, w as WebsiteBuilderSiteFrameLinkItem, v as WebsiteBuilderSiteFrameNavigationColumn, q as WebsiteBuilderSiteRegion, r as WebsiteBuilderSiteSettings, L as WebsiteBuilderSiteSettingsPanelDefinition, aq as WebsiteBuilderSiteSettingsPanelProps, s as WebsiteBuilderWorkspaceCapabilities, t as WebsiteBuilderWorkspaceDescriptor, Z as WebsiteBuilderWorkspaceRef } from './types-CuFDrLWO.js';
export { g as WebsiteBuilderI18nProvider, W as WebsiteBuilderLink, h as WebsiteBuilderProvider, i as WebsiteBuilderRenderDepthProvider, a as WebsiteBuilderSiteSearch, r as resolveWebsiteBuilderText, u as useWebsiteBuilder, b as useWebsiteBuilderCanEdit, f as useWebsiteBuilderFieldValue, c as useWebsiteBuilderI18n, j as useWebsiteBuilderPersistedState, d as useWebsiteBuilderRenderDepth, e as useWebsiteBuilderStore, k as useWebsiteBuilderStoreApi } from './website-builder-site-search-DgqPIWez.js';
export { f as collectWebsiteBuilderAccountTabs, g as collectWebsiteBuilderDocuments, h as collectWebsiteBuilderSiteFrameExtensions, i as createWebsiteBuilderBlock, c as createWebsiteBuilderBlockLocalizationSchema, a as createWebsiteBuilderKit, j as createWebsiteBuilderLocalizationManifest, b as createWebsiteBuilderLocalizedDefault, k as createWebsiteBuilderRegistry, d as createWebsiteBuilderRuntime, e as defineWebsiteBuilderBlockDefinition, l as getWebsiteBuilderDefinitionKey, m as getWebsiteBuilderDocumentFingerprint, n as isWebsiteBuilderInstallableKit, o as moveWebsiteBuilderArrayItem, r as resolveWebsiteBuilderModules } from './runtime-Led5emTV.js';
export { d as decodeWebsiteBuilderHtmlEntities, g as getWebsiteBuilderAnchorRel, n as normalizeWebsiteBuilderUrlForProtocolCheck, s as sanitizeWebsiteBuilderLinkHref } from './link-url-CBOXlDl0.js';
export { D as DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES, a as DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF, G as WEBSITE_BUILDER_EMPTY_TEXT, W as WEBSITE_BUILDER_ROOT_LIST_ID, b as WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS, c as WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS, d as applyWebsiteBuilderSiteColorScheme, e as applyWebsiteBuilderSiteDesignPreset, f as canEditWebsiteBuilderWorkspace, g as canSaveWebsiteBuilderWorkspace, h as cloneWebsiteBuilderBlockTreeWithNewIds, i as cloneWebsiteBuilderValue, j as collectBlockIds, k as createWebsiteBuilderAreaListId, l as createWebsiteBuilderNodeId, m as createWebsiteBuilderSiteDesignSettings, n as duplicateWebsiteBuilderBlockInDocument, o as findWebsiteBuilderBlock, p as getFirstWebsiteBuilderBlockId, H as getValueAtPath, q as getWebsiteBuilderWorkspaceIdentityKey, r as getWebsiteBuilderWorkspaceKey, s as hasWebsiteBuilderSiteDesignPresetCustomization, t as insertWebsiteBuilderBlockInDocument, u as isWebsiteBuilderFramelessPreset, v as isWebsiteBuilderFramelessSiteDesign, w as isWebsiteBuilderSiteDesignPresetApplied, x as isWebsiteBuilderWorkspaceReadonly, y as moveWebsiteBuilderBlockInDocument, z as normalizeWebsiteBuilderWorkspaceCapabilities, A as normalizeWebsiteBuilderWorkspaceDescriptor, B as normalizeWebsiteBuilderWorkspaceRef, C as removeWebsiteBuilderBlockFromDocument, E as resolveWebsiteBuilderSiteDesignSettings, I as setValueAtPath, F as updateWebsiteBuilderBlockInDocument } from './workspace-DYMiajiz.js';
export { b as collectWebsiteBuilderFooterExtensionItems, d as collectWebsiteBuilderHeaderExtensionItems, c as createWebsiteBuilderAccountTabExtension, a as createWebsiteBuilderSiteFrameExtension, r as resolveWebsiteBuilderAccountTabs, e as resolveWebsiteBuilderSiteFrameExtensions } from './site-frame-extensions-CljWsZYY.js';
export { g as getWebsiteBuilderSurfaceModeStyle } from './surface-layout-p8WBJh3f.js';
export { WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID, WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY, composeWebsiteBuilderSurfaceDocument, decomposeWebsiteBuilderSurfaceDocument, getFirstWebsiteBuilderSurfaceEditableBlockId, getWebsiteBuilderSiteColorScheme, getWebsiteBuilderSiteDesignPreset, getWebsiteBuilderSurfaceRegionBlocks, getWebsiteBuilderSurfaceRegionListId, resolveWebsiteBuilderSurfaceRegionDescriptors, resolveWebsiteBuilderSurfaceRegionForBlockId, resolveWebsiteBuilderSurfaceRegionForListId, websiteBuilderSiteColorSchemes, websiteBuilderSiteDesignPresets } from './server.js';
export { W as WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM, a as WEBSITE_BUILDER_SEARCH_QUERY_PARAM, b as WEBSITE_BUILDER_SEARCH_TARGET_PARAM } from './constants-DenT-L3W.js';
export { WebsiteBuilderAccessAuthStateLike, WebsiteBuilderModeLike, WebsiteBuilderWorkspaceSelectionLike, normalizeWebsiteBuilderSelectionForMode, resolveWebsiteBuilderAccess, resolveWebsiteBuilderMode, resolveWebsiteBuilderRequestHeaders, resolveWebsiteBuilderWorkspaceParams } from './sdk.js';
export { I as InsertTarget, a as InspectorDefinitionMeta, b as InspectorGroups, P as PageSettingsPanelDefinition, c as PaletteDefinition, d as PaletteFamilyGroup, S as SiteSettingsPanelDefinition, e as SiteSettingsSubtabDefinition, W as WebsiteBuilderStudio, f as WebsiteBuilderStudioProps, g as WebsiteBuilderStudioSavePayload, h as WebsiteBuilderStudioSaveReason, i as WebsiteBuilderStudioSiteSettingChangeContext } from './website-builder-studio-DMX6zQCo.js';
import 'zustand/vanilla';

type WebsiteBuilderEditableEditorLoaderKey = "gallery" | "image" | "richText" | "text" | "textarea";
type WebsiteBuilderEditableEditorLoaders = Partial<Record<WebsiteBuilderEditableEditorLoaderKey, () => Promise<ComponentType<any>>>>;
declare global {
    var __websiteBuilderEditableEditorLoaders: WebsiteBuilderEditableEditorLoaders | undefined;
}

declare global {
    var __websiteBuilderEditableEditorLoaders: WebsiteBuilderEditableEditorLoaders | undefined;
}

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

export { EditableGallery, EditableImage, EditableRepeaterValue, EditableRichText, EditableText, EditableTextarea, type KeyboardMenuController, KeyboardMenuList, type KeyboardMenuSection, WebsiteBuilderArea, WebsiteBuilderBindingAdapter, WebsiteBuilderBlock, WebsiteBuilderBlockRenderer, WebsiteBuilderField, WebsiteBuilderFieldEditorList, WebsiteBuilderInstallableKit, WebsiteBuilderMediaValue, WebsiteBuilderMode, WebsiteBuilderModule, WebsiteBuilderRichTextEditor, WebsiteBuilderSearchHighlight, WebsiteBuilderSearchHighlightEffect, WebsiteBuilderSearchResult, WebsiteBuilderSurfaceMode, WebsiteBuilderSurfaceSection, buildWebsiteBuilderSearchResultHref, buildWebsiteBuilderSearchTargetId, createWebsiteBuilderTiptapJsonBindingAdapter, isWebsiteBuilderMediaValue, renderWebsiteBuilderRichTextHtml, resolveWebsiteBuilderMediaPreviewUrl, resolveWebsiteBuilderMediaUrl, updateWebsiteBuilderMediaUrl, useKeyboardMenuController, useWebsiteBuilderValueAtPath, websiteBuilderRichTextContentClassName, websiteBuilderSystemKit, websiteBuilderSystemModule };
