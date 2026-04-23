export { f as collectPhotonAccountTabs, g as collectPhotonDocuments, h as collectPhotonSiteFrameExtensions, i as createPhotonBlock, c as createPhotonBlockLocalizationSchema, a as createPhotonKit, j as createPhotonLocalizationManifest, b as createPhotonLocalizedDefault, k as createPhotonRegistry, d as createPhotonRuntime, e as definePhotonBlockDefinition, l as getPhotonDefinitionKey, m as getPhotonDocumentFingerprint, n as isPhotonInstallableKit, o as movePhotonArrayItem, r as resolvePhotonModules } from './runtime-bINqXqWs.js';
export { D as DEFAULT_PHOTON_WORKSPACE_CAPABILITIES, a as DEFAULT_PHOTON_WORKSPACE_REF, G as PHOTON_EMPTY_TEXT, P as PHOTON_ROOT_LIST_ID, b as PHOTON_SITE_DESIGN_DEFAULTS, c as PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS, d as applyPhotonSiteColorScheme, e as applyPhotonSiteDesignPreset, f as canEditPhotonWorkspace, g as canSavePhotonWorkspace, h as clonePhotonBlockTreeWithNewIds, i as clonePhotonValue, j as collectBlockIds, k as createPhotonAreaListId, l as createPhotonNodeId, m as createPhotonSiteDesignSettings, n as duplicatePhotonBlockInDocument, o as findPhotonBlock, p as getFirstPhotonBlockId, q as getPhotonWorkspaceIdentityKey, r as getPhotonWorkspaceKey, H as getValueAtPath, s as hasPhotonSiteDesignPresetCustomization, t as insertPhotonBlockInDocument, u as isPhotonFramelessPreset, v as isPhotonFramelessSiteDesign, w as isPhotonSiteDesignPresetApplied, x as isPhotonWorkspaceReadonly, y as movePhotonBlockInDocument, z as normalizePhotonWorkspaceCapabilities, A as normalizePhotonWorkspaceDescriptor, B as normalizePhotonWorkspaceRef, C as removePhotonBlockFromDocument, E as resolvePhotonSiteDesignSettings, I as setValueAtPath, F as updatePhotonBlockInDocument } from './workspace-B4wkRMMc.js';
import { b as PhotonDocument, p as PhotonSite, a as PhotonBlock, ak as PhotonSiteColorSchemeDefinition, an as PhotonSiteDesignPresetDefinition } from './types-BAycJgQn.js';
export { y as PhotonAccountTabExtension, a4 as PhotonAccountTabMatch, a5 as PhotonActorSummary, a6 as PhotonAnyBlockDefinition, P as PhotonArea, $ as PhotonBindingAdapter, a7 as PhotonBindingMode, a8 as PhotonBlockComponent, a0 as PhotonBlockComponentProps, a9 as PhotonBlockDefaults, M as PhotonBlockDefinition, O as PhotonBlockLocalizationSchema, T as PhotonBlockProps, C as PhotonBranchPolicyState, aa as PhotonDefaultable, c as PhotonDocumentsMap, J as PhotonField, d as PhotonFieldBinding, ab as PhotonFieldKind, ac as PhotonFieldLocalization, a1 as PhotonFieldOption, I as PhotonI18nValue, U as PhotonInstallableKit, ad as PhotonInterfaceLocaleOption, H as PhotonLinkComponent, _ as PhotonLinkComponentProps, e as PhotonLocaleDescriptor, f as PhotonLocaleStatus, R as PhotonLocalizedDefaultValue, F as PhotonMediaUploadHandler, g as PhotonMediaUploadInput, h as PhotonMediaValue, ae as PhotonMergeConflict, af as PhotonMergeDiffItem, D as PhotonMergePreview, ag as PhotonMergeResolutionStrategy, E as PhotonMode, Q as PhotonModule, N as PhotonNestedField, i as PhotonPageCatalogItem, j as PhotonPageRuntimeData, k as PhotonPageSettings, K as PhotonPageSettingsPanelDefinition, ah as PhotonPageSettingsPanelProps, a2 as PhotonPageSettingsScope, A as PhotonRegistry, S as PhotonRegistryEntry, l as PhotonResolvedPage, X as PhotonResolvedSiteDesignSettings, m as PhotonResources, ai as PhotonRevisionChangeSummaryItem, B as PhotonRevisionDescriptor, V as PhotonRuntime, G as PhotonSearchHandler, n as PhotonSearchHighlight, aj as PhotonSearchInput, o as PhotonSearchResult, a3 as PhotonSelectedField, Y as PhotonSiteComponentVariants, al as PhotonSiteDesignAppearance, am as PhotonSiteDesignColorTokens, W as PhotonSiteDesignSettings, ao as PhotonSiteDesignValue, x as PhotonSiteFrameActionItem, ap as PhotonSiteFrameActionKind, u as PhotonSiteFrameExtension, w as PhotonSiteFrameLinkItem, v as PhotonSiteFrameNavigationColumn, q as PhotonSiteRegion, r as PhotonSiteSettings, L as PhotonSiteSettingsPanelDefinition, aq as PhotonSiteSettingsPanelProps, z as PhotonSurfaceMode, s as PhotonWorkspaceCapabilities, t as PhotonWorkspaceDescriptor, Z as PhotonWorkspaceRef } from './types-BAycJgQn.js';
export { c as collectPhotonFooterExtensionItems, a as collectPhotonHeaderExtensionItems, b as createPhotonAccountTabExtension, d as createPhotonSiteFrameExtension, r as resolvePhotonAccountTabs, e as resolvePhotonSiteFrameExtensions } from './site-frame-extensions-BddfNAsQ.js';
export { P as PHOTON_SEARCH_OCCURRENCE_PARAM, a as PHOTON_SEARCH_QUERY_PARAM, b as PHOTON_SEARCH_TARGET_PARAM } from './constants-Bu7HPDAC.js';
import 'react';

declare const PHOTON_PAGE_SURFACE_REGION_KEY = "page";
type PhotonSurfaceRegionDescriptor = {
    key: string;
    label: string;
    order: number;
    lockedOnCanvas: boolean;
    kind: "page" | "site";
};
declare const resolvePhotonSurfaceRegionDescriptors: (site: PhotonSite) => PhotonSurfaceRegionDescriptor[];
declare const composePhotonSurfaceDocument: (pageDocument: PhotonDocument, site: PhotonSite) => PhotonDocument;
declare const decomposePhotonSurfaceDocument: (surfaceDocument: PhotonDocument, site: PhotonSite) => {
    pageDocument: PhotonDocument;
    site: PhotonSite;
};
declare const getPhotonSurfaceRegionBlocks: (document: PhotonDocument, regionKey: string) => PhotonBlock[] | null;
declare const getPhotonSurfaceRegionListId: (regionKey: string) => string;
declare const getFirstPhotonSurfaceEditableBlockId: (document: PhotonDocument) => string | null;
declare const resolvePhotonSurfaceRegionForBlockId: (document: PhotonDocument, blockId: string) => string | null;
declare const resolvePhotonSurfaceRegionForListId: (document: PhotonDocument, listId: string) => string | null;

declare const photonSiteColorSchemes: PhotonSiteColorSchemeDefinition[];
declare const getPhotonSiteColorScheme: (id: string) => PhotonSiteColorSchemeDefinition | undefined;

declare const PHOTON_DEFAULT_SITE_DESIGN_PRESET_ID = "aurora-current";
declare const photonSiteDesignPresets: PhotonSiteDesignPresetDefinition[];
declare const getPhotonSiteDesignPreset: (id: string) => PhotonSiteDesignPresetDefinition | undefined;

export { PHOTON_DEFAULT_SITE_DESIGN_PRESET_ID, PHOTON_PAGE_SURFACE_REGION_KEY, PhotonBlock, PhotonDocument, PhotonSite, PhotonSiteColorSchemeDefinition, PhotonSiteDesignPresetDefinition, composePhotonSurfaceDocument, decomposePhotonSurfaceDocument, getFirstPhotonSurfaceEditableBlockId, getPhotonSiteColorScheme, getPhotonSiteDesignPreset, getPhotonSurfaceRegionBlocks, getPhotonSurfaceRegionListId, photonSiteColorSchemes, photonSiteDesignPresets, resolvePhotonSurfaceRegionDescriptors, resolvePhotonSurfaceRegionForBlockId, resolvePhotonSurfaceRegionForListId };
