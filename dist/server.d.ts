export { f as collectPhotonAccountTabs, g as collectPhotonDocuments, h as collectPhotonSiteFrameExtensions, i as createPhotonBlock, c as createPhotonBlockLocalizationSchema, a as createPhotonKit, j as createPhotonLocalizationManifest, b as createPhotonLocalizedDefault, k as createPhotonRegistry, d as createPhotonRuntime, e as definePhotonBlockDefinition, l as getPhotonDefinitionKey, m as getPhotonDocumentFingerprint, n as isPhotonInstallableKit, o as movePhotonArrayItem, r as resolvePhotonModules } from './runtime-D7HZokyb.js';
export { D as DEFAULT_PHOTON_WORKSPACE_CAPABILITIES, a as DEFAULT_PHOTON_WORKSPACE_REF, G as PHOTON_EMPTY_TEXT, P as PHOTON_ROOT_LIST_ID, b as PHOTON_SITE_DESIGN_DEFAULTS, c as PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS, d as applyPhotonSiteColorScheme, e as applyPhotonSiteDesignPreset, f as canEditPhotonWorkspace, g as canSavePhotonWorkspace, h as clonePhotonBlockTreeWithNewIds, i as clonePhotonValue, j as collectBlockIds, k as createPhotonAreaListId, l as createPhotonNodeId, m as createPhotonSiteDesignSettings, n as duplicatePhotonBlockInDocument, o as findPhotonBlock, p as getFirstPhotonBlockId, q as getPhotonWorkspaceIdentityKey, r as getPhotonWorkspaceKey, H as getValueAtPath, s as hasPhotonSiteDesignPresetCustomization, t as insertPhotonBlockInDocument, u as isPhotonFramelessPreset, v as isPhotonFramelessSiteDesign, w as isPhotonSiteDesignPresetApplied, x as isPhotonWorkspaceReadonly, y as movePhotonBlockInDocument, z as normalizePhotonWorkspaceCapabilities, A as normalizePhotonWorkspaceDescriptor, B as normalizePhotonWorkspaceRef, C as removePhotonBlockFromDocument, E as resolvePhotonSiteDesignSettings, I as setValueAtPath, F as updatePhotonBlockInDocument } from './workspace-DuupJTEH.js';
import { b as PhotonDocument, p as PhotonSite, a as PhotonBlock, ao as PhotonSiteColorSchemeDefinition, ar as PhotonSiteDesignPresetDefinition } from './types-D3ghbc-a.js';
export { z as PhotonAccountTabExtension, a7 as PhotonAccountTabMatch, a8 as PhotonActorSummary, a9 as PhotonAnyBlockDefinition, P as PhotonArea, a1 as PhotonBindingAdapter, aa as PhotonBindingMode, ab as PhotonBlockComponent, a2 as PhotonBlockComponentProps, ac as PhotonBlockDefaults, N as PhotonBlockDefinition, Q as PhotonBlockLocalizationSchema, U as PhotonBlockProps, D as PhotonBranchPolicyState, ad as PhotonDefaultable, c as PhotonDocumentsMap, K as PhotonField, d as PhotonFieldBinding, ae as PhotonFieldKind, af as PhotonFieldLocalization, a3 as PhotonFieldOption, J as PhotonI18nValue, V as PhotonInstallableKit, ag as PhotonInterfaceLocaleOption, I as PhotonLinkComponent, $ as PhotonLinkComponentProps, e as PhotonLocaleDescriptor, f as PhotonLocaleStatus, S as PhotonLocalizedDefaultValue, G as PhotonMediaUploadHandler, g as PhotonMediaUploadInput, h as PhotonMediaValue, ah as PhotonMergeConflict, ai as PhotonMergeDiffItem, E as PhotonMergePreview, aj as PhotonMergeResolutionStrategy, F as PhotonMode, R as PhotonModule, a0 as PhotonNavigationConfig, ak as PhotonNavigationQueryKeys, O as PhotonNestedField, i as PhotonPageCatalogItem, j as PhotonPageRuntimeData, k as PhotonPageSettings, L as PhotonPageSettingsPanelDefinition, al as PhotonPageSettingsPanelProps, a4 as PhotonPageSettingsScope, B as PhotonRegistry, T as PhotonRegistryEntry, l as PhotonResolvedPage, Y as PhotonResolvedSiteDesignSettings, m as PhotonResources, am as PhotonRevisionChangeSummaryItem, C as PhotonRevisionDescriptor, W as PhotonRuntime, H as PhotonSearchHandler, n as PhotonSearchHighlight, an as PhotonSearchInput, o as PhotonSearchResult, a6 as PhotonSelectedField, Z as PhotonSiteComponentVariants, ap as PhotonSiteDesignAppearance, aq as PhotonSiteDesignColorTokens, X as PhotonSiteDesignSettings, as as PhotonSiteDesignValue, a5 as PhotonSiteFrameActionComponentProps, y as PhotonSiteFrameActionItem, at as PhotonSiteFrameActionKind, u as PhotonSiteFrameExtension, x as PhotonSiteFrameExtensionContext, w as PhotonSiteFrameLinkItem, v as PhotonSiteFrameNavigationColumn, q as PhotonSiteRegion, r as PhotonSiteSettings, M as PhotonSiteSettingsPanelDefinition, au as PhotonSiteSettingsPanelProps, A as PhotonSurfaceMode, s as PhotonWorkspaceCapabilities, t as PhotonWorkspaceDescriptor, _ as PhotonWorkspaceRef } from './types-D3ghbc-a.js';
export { c as collectPhotonFooterExtensionItems, a as collectPhotonHeaderExtensionItems, b as createPhotonAccountTabExtension, d as createPhotonSiteFrameExtension, r as resolvePhotonAccountTabs, e as resolvePhotonSiteFrameExtensions } from './site-frame-extensions-D_8O6hge.js';
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
