import { a0 as WebsiteBuilderBlockDefinition, a as WebsiteBuilderBlock, ac as WebsiteBuilderNestedField, a1 as WebsiteBuilderBlockLocalizationSchema, U as WebsiteBuilderModule, a8 as WebsiteBuilderLocalizedDefaultValue, af as WebsiteBuilderRegistryEntry, A as WebsiteBuilderRegistry, a2 as WebsiteBuilderBlockProps, b as WebsiteBuilderDocument, y as WebsiteBuilderAccountTabExtension, c as WebsiteBuilderDocumentsMap, u as WebsiteBuilderSiteFrameExtension, T as WebsiteBuilderInstallableKit, ah as WebsiteBuilderRuntime, p as WebsiteBuilderSite, aj as WebsiteBuilderSiteColorSchemeDefinition, am as WebsiteBuilderSiteDesignPresetDefinition } from './types-q9w-WbBC.js';
export { V as WebsiteBuilderActorSummary, X as WebsiteBuilderAnyBlockDefinition, W as WebsiteBuilderArea, S as WebsiteBuilderBindingAdapter, Y as WebsiteBuilderBindingMode, Z as WebsiteBuilderBlockComponent, _ as WebsiteBuilderBlockComponentProps, $ as WebsiteBuilderBlockDefaults, C as WebsiteBuilderBranchPolicyState, a3 as WebsiteBuilderDefaultable, J as WebsiteBuilderField, d as WebsiteBuilderFieldBinding, a4 as WebsiteBuilderFieldKind, a5 as WebsiteBuilderFieldLocalization, a6 as WebsiteBuilderFieldOption, I as WebsiteBuilderI18nValue, a7 as WebsiteBuilderInterfaceLocaleOption, H as WebsiteBuilderLinkComponent, R as WebsiteBuilderLinkComponentProps, e as WebsiteBuilderLocaleDescriptor, f as WebsiteBuilderLocaleStatus, F as WebsiteBuilderMediaUploadHandler, g as WebsiteBuilderMediaUploadInput, h as WebsiteBuilderMediaValue, a9 as WebsiteBuilderMergeConflict, aa as WebsiteBuilderMergeDiffItem, D as WebsiteBuilderMergePreview, ab as WebsiteBuilderMergeResolutionStrategy, E as WebsiteBuilderMode, i as WebsiteBuilderPageCatalogItem, j as WebsiteBuilderPageRuntimeData, k as WebsiteBuilderPageSettings, K as WebsiteBuilderPageSettingsPanelDefinition, ad as WebsiteBuilderPageSettingsPanelProps, ae as WebsiteBuilderPageSettingsScope, l as WebsiteBuilderResolvedPage, N as WebsiteBuilderResolvedSiteDesignSettings, m as WebsiteBuilderResources, ag as WebsiteBuilderRevisionChangeSummaryItem, B as WebsiteBuilderRevisionDescriptor, G as WebsiteBuilderSearchHandler, n as WebsiteBuilderSearchHighlight, ai as WebsiteBuilderSearchInput, o as WebsiteBuilderSearchResult, Q as WebsiteBuilderSelectedField, O as WebsiteBuilderSiteComponentVariants, ak as WebsiteBuilderSiteDesignAppearance, al as WebsiteBuilderSiteDesignColorTokens, M as WebsiteBuilderSiteDesignSettings, an as WebsiteBuilderSiteDesignValue, x as WebsiteBuilderSiteFrameActionItem, ao as WebsiteBuilderSiteFrameActionKind, w as WebsiteBuilderSiteFrameLinkItem, v as WebsiteBuilderSiteFrameNavigationColumn, q as WebsiteBuilderSiteRegion, r as WebsiteBuilderSiteSettings, L as WebsiteBuilderSiteSettingsPanelDefinition, ap as WebsiteBuilderSiteSettingsPanelProps, z as WebsiteBuilderSurfaceMode, s as WebsiteBuilderWorkspaceCapabilities, t as WebsiteBuilderWorkspaceDescriptor, P as WebsiteBuilderWorkspaceRef } from './types-q9w-WbBC.js';
export { D as DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES, a as DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF, I as WEBSITE_BUILDER_EMPTY_TEXT, W as WEBSITE_BUILDER_ROOT_LIST_ID, b as WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM, c as WEBSITE_BUILDER_SEARCH_QUERY_PARAM, d as WEBSITE_BUILDER_SEARCH_TARGET_PARAM, e as WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS, f as WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS, g as applyWebsiteBuilderSiteColorScheme, h as applyWebsiteBuilderSiteDesignPreset, i as canEditWebsiteBuilderWorkspace, j as canSaveWebsiteBuilderWorkspace, k as cloneWebsiteBuilderBlockTreeWithNewIds, l as cloneWebsiteBuilderValue, m as createWebsiteBuilderAreaListId, n as createWebsiteBuilderNodeId, o as createWebsiteBuilderSiteDesignSettings, p as duplicateWebsiteBuilderBlockInDocument, q as findWebsiteBuilderBlock, r as getFirstWebsiteBuilderBlockId, J as getValueAtPath, s as getWebsiteBuilderWorkspaceIdentityKey, t as getWebsiteBuilderWorkspaceKey, u as hasWebsiteBuilderSiteDesignPresetCustomization, v as insertWebsiteBuilderBlockInDocument, w as isWebsiteBuilderFramelessPreset, x as isWebsiteBuilderFramelessSiteDesign, y as isWebsiteBuilderSiteDesignPresetApplied, z as isWebsiteBuilderWorkspaceReadonly, A as moveWebsiteBuilderBlockInDocument, B as normalizeWebsiteBuilderWorkspaceCapabilities, C as normalizeWebsiteBuilderWorkspaceDescriptor, E as normalizeWebsiteBuilderWorkspaceRef, F as removeWebsiteBuilderBlockFromDocument, G as resolveWebsiteBuilderSiteDesignSettings, K as setValueAtPath, H as updateWebsiteBuilderBlockInDocument } from './constants-CjPVMoHx.js';
export { c as collectWebsiteBuilderFooterExtensionItems, a as collectWebsiteBuilderHeaderExtensionItems, b as createWebsiteBuilderAccountTabExtension, d as createWebsiteBuilderSiteFrameExtension, r as resolveWebsiteBuilderAccountTabs, e as resolveWebsiteBuilderSiteFrameExtensions } from './site-frame-extensions-zYe8rj84.js';
import 'react';

declare const getWebsiteBuilderDefinitionKey: (moduleName: string, blockType: string) => string;
declare const createWebsiteBuilderRegistry: (entries: WebsiteBuilderRegistryEntry[]) => WebsiteBuilderRegistry;
declare const createWebsiteBuilderLocalizedDefault: <T>(values: Record<string, T>) => WebsiteBuilderLocalizedDefaultValue<T>;
declare const createWebsiteBuilderBlockLocalizationSchema: (fields: WebsiteBuilderNestedField[]) => WebsiteBuilderBlockLocalizationSchema;
declare const createWebsiteBuilderLocalizationManifest: (modules: WebsiteBuilderModule[]) => {
    [k: string]: WebsiteBuilderBlockLocalizationSchema;
};
declare const createWebsiteBuilderBlock: <Props extends Record<string, unknown> = Record<string, unknown>>(moduleName: string, definition: WebsiteBuilderBlockDefinition<Props>, options?: {
    locale?: string;
    defaultLocale?: string;
}) => WebsiteBuilderBlock<Props>;
declare const defineWebsiteBuilderBlockDefinition: <Props extends WebsiteBuilderBlockProps>(definition: WebsiteBuilderBlockDefinition<Props>) => WebsiteBuilderBlockDefinition<Props>;
declare const moveWebsiteBuilderArrayItem: <T>(items: T[], fromIndex: number, toIndex: number) => T[];
declare const getWebsiteBuilderDocumentFingerprint: (document: WebsiteBuilderDocument) => string;

declare const createWebsiteBuilderKit: (kit: WebsiteBuilderInstallableKit) => WebsiteBuilderInstallableKit;
declare const isWebsiteBuilderInstallableKit: (entry: WebsiteBuilderRegistryEntry) => entry is WebsiteBuilderInstallableKit;
declare const resolveWebsiteBuilderModules: (entries: WebsiteBuilderRegistryEntry[]) => WebsiteBuilderModule[];
declare const collectWebsiteBuilderDocuments: (entries: WebsiteBuilderRegistryEntry[]) => WebsiteBuilderDocumentsMap;
declare const collectWebsiteBuilderSiteFrameExtensions: (entries: WebsiteBuilderRegistryEntry[]) => WebsiteBuilderSiteFrameExtension[];
declare const collectWebsiteBuilderAccountTabs: (entries: WebsiteBuilderRegistryEntry[]) => WebsiteBuilderAccountTabExtension[];

declare const createWebsiteBuilderRuntime: (entries: WebsiteBuilderRegistryEntry[]) => WebsiteBuilderRuntime;

declare const WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY = "page";
type WebsiteBuilderSurfaceRegionDescriptor = {
    key: string;
    label: string;
    order: number;
    lockedOnCanvas: boolean;
    kind: "page" | "site";
};
declare const resolveWebsiteBuilderSurfaceRegionDescriptors: (site: WebsiteBuilderSite) => WebsiteBuilderSurfaceRegionDescriptor[];
declare const composeWebsiteBuilderSurfaceDocument: (pageDocument: WebsiteBuilderDocument, site: WebsiteBuilderSite) => WebsiteBuilderDocument;
declare const decomposeWebsiteBuilderSurfaceDocument: (surfaceDocument: WebsiteBuilderDocument, site: WebsiteBuilderSite) => {
    pageDocument: WebsiteBuilderDocument;
    site: WebsiteBuilderSite;
};
declare const getWebsiteBuilderSurfaceRegionBlocks: (document: WebsiteBuilderDocument, regionKey: string) => WebsiteBuilderBlock[] | null;
declare const getWebsiteBuilderSurfaceRegionListId: (regionKey: string) => string;
declare const getFirstWebsiteBuilderSurfaceEditableBlockId: (document: WebsiteBuilderDocument) => string | null;
declare const resolveWebsiteBuilderSurfaceRegionForBlockId: (document: WebsiteBuilderDocument, blockId: string) => string | null;
declare const resolveWebsiteBuilderSurfaceRegionForListId: (document: WebsiteBuilderDocument, listId: string) => string | null;

declare const websiteBuilderSiteColorSchemes: WebsiteBuilderSiteColorSchemeDefinition[];
declare const getWebsiteBuilderSiteColorScheme: (id: string) => WebsiteBuilderSiteColorSchemeDefinition | undefined;

declare const WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID = "aurora-current";
declare const websiteBuilderSiteDesignPresets: WebsiteBuilderSiteDesignPresetDefinition[];
declare const getWebsiteBuilderSiteDesignPreset: (id: string) => WebsiteBuilderSiteDesignPresetDefinition | undefined;

export { WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID, WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY, WebsiteBuilderAccountTabExtension, WebsiteBuilderBlock, WebsiteBuilderBlockDefinition, WebsiteBuilderBlockLocalizationSchema, WebsiteBuilderBlockProps, WebsiteBuilderDocument, WebsiteBuilderDocumentsMap, WebsiteBuilderInstallableKit, WebsiteBuilderLocalizedDefaultValue, WebsiteBuilderModule, WebsiteBuilderNestedField, WebsiteBuilderRegistry, WebsiteBuilderRegistryEntry, WebsiteBuilderRuntime, WebsiteBuilderSite, WebsiteBuilderSiteColorSchemeDefinition, WebsiteBuilderSiteDesignPresetDefinition, WebsiteBuilderSiteFrameExtension, collectWebsiteBuilderAccountTabs, collectWebsiteBuilderDocuments, collectWebsiteBuilderSiteFrameExtensions, composeWebsiteBuilderSurfaceDocument, createWebsiteBuilderBlock, createWebsiteBuilderBlockLocalizationSchema, createWebsiteBuilderKit, createWebsiteBuilderLocalizationManifest, createWebsiteBuilderLocalizedDefault, createWebsiteBuilderRegistry, createWebsiteBuilderRuntime, decomposeWebsiteBuilderSurfaceDocument, defineWebsiteBuilderBlockDefinition, getFirstWebsiteBuilderSurfaceEditableBlockId, getWebsiteBuilderDefinitionKey, getWebsiteBuilderDocumentFingerprint, getWebsiteBuilderSiteColorScheme, getWebsiteBuilderSiteDesignPreset, getWebsiteBuilderSurfaceRegionBlocks, getWebsiteBuilderSurfaceRegionListId, isWebsiteBuilderInstallableKit, moveWebsiteBuilderArrayItem, resolveWebsiteBuilderModules, resolveWebsiteBuilderSurfaceRegionDescriptors, resolveWebsiteBuilderSurfaceRegionForBlockId, resolveWebsiteBuilderSurfaceRegionForListId, websiteBuilderSiteColorSchemes, websiteBuilderSiteDesignPresets };
