import { X as WebsiteBuilderBlockDefinition, a as WebsiteBuilderBlock, a7 as WebsiteBuilderNestedField, Y as WebsiteBuilderBlockLocalizationSchema, P as WebsiteBuilderModule, a3 as WebsiteBuilderLocalizedDefaultValue, aa as WebsiteBuilderRegistryEntry, v as WebsiteBuilderRegistry, Z as WebsiteBuilderBlockProps, b as WebsiteBuilderDocument, c as WebsiteBuilderDocumentsMap, O as WebsiteBuilderInstallableKit, ac as WebsiteBuilderRuntime, p as WebsiteBuilderSite, ae as WebsiteBuilderSiteColorSchemeDefinition, ah as WebsiteBuilderSiteDesignPresetDefinition } from './types-HUrNYqTk.js';
export { Q as WebsiteBuilderActorSummary, R as WebsiteBuilderAnyBlockDefinition, W as WebsiteBuilderArea, N as WebsiteBuilderBindingAdapter, S as WebsiteBuilderBindingMode, T as WebsiteBuilderBlockComponent, U as WebsiteBuilderBlockComponentProps, V as WebsiteBuilderBlockDefaults, x as WebsiteBuilderBranchPolicyState, _ as WebsiteBuilderDefaultable, E as WebsiteBuilderField, d as WebsiteBuilderFieldBinding, $ as WebsiteBuilderFieldKind, a0 as WebsiteBuilderFieldLocalization, a1 as WebsiteBuilderFieldOption, D as WebsiteBuilderI18nValue, a2 as WebsiteBuilderInterfaceLocaleOption, C as WebsiteBuilderLinkComponent, M as WebsiteBuilderLinkComponentProps, e as WebsiteBuilderLocaleDescriptor, f as WebsiteBuilderLocaleStatus, A as WebsiteBuilderMediaUploadHandler, g as WebsiteBuilderMediaUploadInput, h as WebsiteBuilderMediaValue, a4 as WebsiteBuilderMergeConflict, a5 as WebsiteBuilderMergeDiffItem, y as WebsiteBuilderMergePreview, a6 as WebsiteBuilderMergeResolutionStrategy, z as WebsiteBuilderMode, i as WebsiteBuilderPageCatalogItem, j as WebsiteBuilderPageRuntimeData, k as WebsiteBuilderPageSettings, F as WebsiteBuilderPageSettingsPanelDefinition, a8 as WebsiteBuilderPageSettingsPanelProps, a9 as WebsiteBuilderPageSettingsScope, l as WebsiteBuilderResolvedPage, I as WebsiteBuilderResolvedSiteDesignSettings, m as WebsiteBuilderResources, ab as WebsiteBuilderRevisionChangeSummaryItem, w as WebsiteBuilderRevisionDescriptor, B as WebsiteBuilderSearchHandler, n as WebsiteBuilderSearchHighlight, ad as WebsiteBuilderSearchInput, o as WebsiteBuilderSearchResult, L as WebsiteBuilderSelectedField, J as WebsiteBuilderSiteComponentVariants, af as WebsiteBuilderSiteDesignAppearance, ag as WebsiteBuilderSiteDesignColorTokens, H as WebsiteBuilderSiteDesignSettings, ai as WebsiteBuilderSiteDesignValue, q as WebsiteBuilderSiteRegion, r as WebsiteBuilderSiteSettings, G as WebsiteBuilderSiteSettingsPanelDefinition, aj as WebsiteBuilderSiteSettingsPanelProps, u as WebsiteBuilderSurfaceMode, s as WebsiteBuilderWorkspaceCapabilities, t as WebsiteBuilderWorkspaceDescriptor, K as WebsiteBuilderWorkspaceRef } from './types-HUrNYqTk.js';
export { D as DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES, a as DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF, I as WEBSITE_BUILDER_EMPTY_TEXT, W as WEBSITE_BUILDER_ROOT_LIST_ID, b as WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM, c as WEBSITE_BUILDER_SEARCH_QUERY_PARAM, d as WEBSITE_BUILDER_SEARCH_TARGET_PARAM, e as WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS, f as WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS, g as applyWebsiteBuilderSiteColorScheme, h as applyWebsiteBuilderSiteDesignPreset, i as canEditWebsiteBuilderWorkspace, j as canSaveWebsiteBuilderWorkspace, k as cloneWebsiteBuilderBlockTreeWithNewIds, l as cloneWebsiteBuilderValue, m as createWebsiteBuilderAreaListId, n as createWebsiteBuilderNodeId, o as createWebsiteBuilderSiteDesignSettings, p as duplicateWebsiteBuilderBlockInDocument, q as findWebsiteBuilderBlock, r as getFirstWebsiteBuilderBlockId, J as getValueAtPath, s as getWebsiteBuilderWorkspaceIdentityKey, t as getWebsiteBuilderWorkspaceKey, u as hasWebsiteBuilderSiteDesignPresetCustomization, v as insertWebsiteBuilderBlockInDocument, w as isWebsiteBuilderFramelessPreset, x as isWebsiteBuilderFramelessSiteDesign, y as isWebsiteBuilderSiteDesignPresetApplied, z as isWebsiteBuilderWorkspaceReadonly, A as moveWebsiteBuilderBlockInDocument, B as normalizeWebsiteBuilderWorkspaceCapabilities, C as normalizeWebsiteBuilderWorkspaceDescriptor, E as normalizeWebsiteBuilderWorkspaceRef, F as removeWebsiteBuilderBlockFromDocument, G as resolveWebsiteBuilderSiteDesignSettings, K as setValueAtPath, H as updateWebsiteBuilderBlockInDocument } from './constants-ghJfLI0T.js';
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

export { WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID, WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY, WebsiteBuilderBlock, WebsiteBuilderBlockDefinition, WebsiteBuilderBlockLocalizationSchema, WebsiteBuilderBlockProps, WebsiteBuilderDocument, WebsiteBuilderDocumentsMap, WebsiteBuilderInstallableKit, WebsiteBuilderLocalizedDefaultValue, WebsiteBuilderModule, WebsiteBuilderNestedField, WebsiteBuilderRegistry, WebsiteBuilderRegistryEntry, WebsiteBuilderRuntime, WebsiteBuilderSite, WebsiteBuilderSiteColorSchemeDefinition, WebsiteBuilderSiteDesignPresetDefinition, collectWebsiteBuilderDocuments, composeWebsiteBuilderSurfaceDocument, createWebsiteBuilderBlock, createWebsiteBuilderBlockLocalizationSchema, createWebsiteBuilderKit, createWebsiteBuilderLocalizationManifest, createWebsiteBuilderLocalizedDefault, createWebsiteBuilderRegistry, createWebsiteBuilderRuntime, decomposeWebsiteBuilderSurfaceDocument, defineWebsiteBuilderBlockDefinition, getFirstWebsiteBuilderSurfaceEditableBlockId, getWebsiteBuilderDefinitionKey, getWebsiteBuilderDocumentFingerprint, getWebsiteBuilderSiteColorScheme, getWebsiteBuilderSiteDesignPreset, getWebsiteBuilderSurfaceRegionBlocks, getWebsiteBuilderSurfaceRegionListId, isWebsiteBuilderInstallableKit, moveWebsiteBuilderArrayItem, resolveWebsiteBuilderModules, resolveWebsiteBuilderSurfaceRegionDescriptors, resolveWebsiteBuilderSurfaceRegionForBlockId, resolveWebsiteBuilderSurfaceRegionForListId, websiteBuilderSiteColorSchemes, websiteBuilderSiteDesignPresets };
