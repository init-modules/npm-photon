export { f as collectPhotonAccountTabs, g as collectPhotonConditionDefinitions, h as collectPhotonConditionEvaluators, i as collectPhotonDocuments, j as collectPhotonFormSchemas, k as collectPhotonInteractionActions, l as collectPhotonInteractionGuardEvaluators, m as collectPhotonInteractionGuards, n as collectPhotonInteractionPolicies, o as collectPhotonInteractionSurfaces, p as collectPhotonRouteContextFields, q as collectPhotonSiteDataSchemas, r as collectPhotonSiteFrameExtensions, s as createPhotonBlock, c as createPhotonBlockLocalizationSchema, a as createPhotonKit, t as createPhotonLocalizationManifest, b as createPhotonLocalizedDefault, u as createPhotonRegistry, d as createPhotonRuntime, e as definePhotonBlockDefinition, v as getPhotonDefinitionKey, w as getPhotonDocumentFingerprint, x as isPhotonInstallableKit, y as movePhotonArrayItem, z as resolvePhotonModules } from './runtime-BCdcmpTw.js';
export { P as PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY, a as PHOTON_COMPONENT_REFERENCE_AREA_ID, b as PHOTON_COMPONENT_REFERENCE_MAX_DEPTH, c as PHOTON_COMPONENT_REFERENCE_MODULE, d as PHOTON_COMPONENT_REFERENCE_TYPE, e as PHOTON_INTERACTIONS_SITE_SETTING_KEY, f as PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY, g as PHOTON_ROUTE_CONTEXT_SCOPE, h as PHOTON_SEARCH_OCCURRENCE_PARAM, i as PHOTON_SEARCH_QUERY_PARAM, j as PHOTON_SEARCH_TARGET_PARAM, k as clonePhotonComponentLibraryBlocksForCopy, l as clonePhotonComponentSourceBlockWithNewIds, m as collectPhotonComponentLibraryUsages, n as createPhotonActionValue, o as createPhotonComponentLibraryBlockId, p as createPhotonComponentLibraryItemFromBlock, q as createPhotonComponentReferenceBlock, r as createPhotonInteractionActionDefinition, s as createPhotonInteractionExecutionResult, t as createPhotonInteractionGuardDefinition, u as createPhotonInteractionSurfaceDefinition, v as createPhotonInteractionTriggerSlot, w as duplicatePhotonComponentLibraryItem, x as evaluatePhotonInteractionGuards, y as executePhotonInteractionActionPresentation, z as executePhotonInteractionTriggerSlot, A as getPhotonComponentLibraryItems, B as isPhotonComponentReferenceBlock, C as matchRoutePattern, D as mergePhotonStudioUrlState, E as normalizePhotonStudioSurfaceMode, F as parsePhotonComponentLibraryBlockId, G as parsePhotonStudioUrlState, H as parseRoutePattern, I as photonInteractionExecutionSucceeded, J as planPhotonInteractionTriggerSlot, K as readPhotonComponentLibrarySettings, L as readPhotonInteractionSettings, M as readPhotonInteractionSurfaceSettings, N as remapPhotonComponentLibraryBlock, O as resolvePhotonBlockInteractionSlots, Q as resolvePhotonComponentReferenceBlocks, R as resolvePhotonInteractionActionCatalog, S as resolvePhotonInteractionSlotAction, T as resolvePhotonInteractionSlotGuards, U as resolvePhotonInteractionSurfaceCatalog, V as resolvePhotonInteractionSurfaceRequest, W as resolvePhotonInteractionToastTemplate, X as resolveRouteContext, Y as writePhotonStudioUrlState } from './constants-TYBrBXkU.js';
export { D as DEFAULT_PHOTON_WORKSPACE_CAPABILITIES, a as DEFAULT_PHOTON_WORKSPACE_REF, I as PHOTON_EMPTY_TEXT, P as PHOTON_ROOT_LIST_ID, b as PHOTON_SITE_DESIGN_DEFAULTS, c as PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS, d as applyPhotonSiteColorScheme, e as applyPhotonSiteDesignPreset, f as canEditPhotonWorkspace, g as canSavePhotonWorkspace, h as clonePhotonBlockTreeWithNewIds, i as clonePhotonValue, j as collectBlockIds, k as createPhotonAreaListId, l as createPhotonNodeId, m as createPhotonSiteDesignSettings, n as duplicatePhotonBlockInDocument, o as findPhotonBlock, p as getFirstPhotonBlockId, q as getPhotonWorkspaceIdentityKey, r as getPhotonWorkspaceKey, J as getValueAtPath, s as hasPhotonSiteDesignPresetCustomization, t as insertPhotonBlockInDocument, u as insertPhotonBlocksInDocument, v as isPhotonFramelessPreset, w as isPhotonFramelessSiteDesign, x as isPhotonSiteDesignPresetApplied, y as isPhotonWorkspaceReadonly, K as isRecord, z as movePhotonBlockInDocument, A as normalizePhotonWorkspaceCapabilities, B as normalizePhotonWorkspaceDescriptor, C as normalizePhotonWorkspaceRef, E as removePhotonBlockFromDocument, F as replacePhotonBlockWithBlocksInDocument, G as resolvePhotonSiteDesignSettings, L as setValueAtPath, H as updatePhotonBlockInDocument } from './workspace-Bmivb4oA.js';
import { w as PhotonDocument, a7 as PhotonSite, i as PhotonBlock, aR as PhotonBlockLocalizationSchema, bI as PhotonFieldKind, bQ as PhotonFieldLocalization, ao as PhotonField, X as PhotonLocaleDescriptor, aA as PhotonRegistry, c3 as PhotonSiteColorSchemeDefinition, c6 as PhotonSiteDesignPresetDefinition } from './types-C1q0pf4n.js';
export { ak as PhotonAccountTabExtension, bK as PhotonAccountTabMatch, P as PhotonActionPlan, a as PhotonActionPlanExecutionStatus, b as PhotonActionPlanResult, c as PhotonActionPlanStep, d as PhotonActionPolicy, e as PhotonActionPolicyEnforcement, f as PhotonActionPolicyScope, g as PhotonActionStateDefinition, b4 as PhotonActionValue, bL as PhotonActorSummary, aZ as PhotonAnyBlockDefinition, h as PhotonArea, bl as PhotonAuthPageRenderInput, bf as PhotonAuthPageRenderer, bm as PhotonBindingAdapter, bM as PhotonBindingMode, bN as PhotonBlockComponent, bn as PhotonBlockComponentProps, bO as PhotonBlockDefaults, aP as PhotonBlockDefinition, ba as PhotonBlockInteractionSlotContext, aV as PhotonBlockProps, aC as PhotonBranchPolicyState, j as PhotonComponentLibraryEditorSelection, k as PhotonComponentLibraryItem, l as PhotonComponentLibrarySettings, m as PhotonComponentLibrarySourceSelection, n as PhotonComponentLibraryUsage, o as PhotonComponentLibraryUsageProvider, p as PhotonComponentReferenceProps, q as PhotonConditionDefinition, r as PhotonConditionEvaluationContext, s as PhotonConditionEvaluator, t as PhotonConditionEvaluatorMap, u as PhotonConditionExpression, v as PhotonConditionResolution, bP as PhotonDefaultable, x as PhotonDocumentsMap, y as PhotonFieldBinding, bo as PhotonFieldOption, ap as PhotonFormDefinition, am as PhotonFormFieldDefinition, av as PhotonFormFieldOption, an as PhotonFormFieldType, aw as PhotonFormFieldValidation, ax as PhotonFormFieldWidth, ay as PhotonFormMode, az as PhotonFormPolicy, aq as PhotonFormSchemaDescriptor, ar as PhotonFormValues, aM as PhotonI18nValue, aX as PhotonInstallableKit, z as PhotonInteractionActionDefinition, A as PhotonInteractionActionExecutionHandlers, B as PhotonInteractionActionInstance, C as PhotonInteractionActionPresentation, bR as PhotonInteractionExecutionPlanMeta, D as PhotonInteractionExecutionResult, E as PhotonInteractionExecutionStatus, F as PhotonInteractionGuardDefinition, G as PhotonInteractionGuardEvaluationContext, H as PhotonInteractionGuardEvaluationResult, I as PhotonInteractionGuardEvaluator, J as PhotonInteractionGuardEvaluatorMap, K as PhotonInteractionGuardInstance, L as PhotonInteractionGuardMissingEvaluatorPolicy, M as PhotonInteractionPreviewScenario, N as PhotonInteractionSettings, O as PhotonInteractionSurfaceDefinition, bS as PhotonInteractionSurfaceEditableFieldInput, bT as PhotonInteractionSurfaceEditableFieldKind, bU as PhotonInteractionSurfaceEditableFieldOption, a_ as PhotonInteractionSurfaceEditableFieldRenderer, Q as PhotonInteractionSurfaceInstance, R as PhotonInteractionSurfaceIntentBinding, bp as PhotonInteractionSurfaceKind, bh as PhotonInteractionSurfaceOpenHandler, bq as PhotonInteractionSurfaceRenderer, aL as PhotonInteractionSurfaceRendererMap, a$ as PhotonInteractionSurfaceRendererProps, S as PhotonInteractionSurfaceSettings, T as PhotonInteractionSurfaceTrigger, br as PhotonInteractionSurfaceVariant, bi as PhotonInteractionToastHandler, b7 as PhotonInteractionToastInput, bs as PhotonInteractionToastStatus, U as PhotonInteractionToastTemplate, V as PhotonInteractionTriggerBinding, W as PhotonInteractionTriggerSlot, bV as PhotonInterfaceLocaleOption, aJ as PhotonLinkComponent, be as PhotonLinkComponentProps, aK as PhotonLinkFactory, bt as PhotonLinkFactoryOptions, Y as PhotonLocaleStatus, aT as PhotonLocalizedDefaultValue, aF as PhotonMediaUploadHandler, Z as PhotonMediaUploadInput, _ as PhotonMediaValue, bW as PhotonMergeConflict, bX as PhotonMergeDiffItem, aD as PhotonMergePreview, bY as PhotonMergeResolutionStrategy, aE as PhotonMode, aS as PhotonModule, aH as PhotonNavigateHandler, bu as PhotonNavigateOptions, bg as PhotonNavigationConfig, bZ as PhotonNavigationQueryKeys, aQ as PhotonNestedField, $ as PhotonPageCatalogItem, a0 as PhotonPageRuntimeData, a1 as PhotonPageSettings, aN as PhotonPageSettingsPanelDefinition, b_ as PhotonPageSettingsPanelProps, bv as PhotonPageSettingsScope, aI as PhotonPrefetchHandler, aU as PhotonRegistryEntry, as as PhotonResolvedFormField, b9 as PhotonResolvedInteractionActionCatalog, b5 as PhotonResolvedInteractionSurfaceCatalog, b6 as PhotonResolvedInteractionSurfaceRequest, a2 as PhotonResolvedPage, b8 as PhotonResolvedRouteContext, a3 as PhotonResolvedSiteData, b1 as PhotonResolvedSiteDesignSettings, a4 as PhotonResources, b$ as PhotonRevisionChangeSummaryItem, aB as PhotonRevisionDescriptor, aW as PhotonRouteContextField, c0 as PhotonRouteContextFieldKind, aY as PhotonRuntime, aG as PhotonSearchHandler, a5 as PhotonSearchHighlight, c1 as PhotonSearchInput, a6 as PhotonSearchResult, c2 as PhotonSearchRuntimeState, bJ as PhotonSelectedField, b2 as PhotonSiteComponentVariants, a8 as PhotonSiteDataBinding, a9 as PhotonSiteDataField, aa as PhotonSiteDataFieldKind, ab as PhotonSiteDataSchema, c4 as PhotonSiteDesignAppearance, c5 as PhotonSiteDesignColorTokens, b0 as PhotonSiteDesignSettings, c7 as PhotonSiteDesignValue, bw as PhotonSiteFrameActionComponentProps, bx as PhotonSiteFrameActionItem, c8 as PhotonSiteFrameActionKind, ag as PhotonSiteFrameExtension, ah as PhotonSiteFrameExtensionContext, by as PhotonSiteFrameFloatingControls, bz as PhotonSiteFrameFooterSlot, bA as PhotonSiteFrameFooterSlotItems, ai as PhotonSiteFrameFooterSlots, bB as PhotonSiteFrameHeaderSlot, bC as PhotonSiteFrameHeaderSlotItems, aj as PhotonSiteFrameHeaderSlots, bD as PhotonSiteFrameLinkItem, bE as PhotonSiteFrameMobileBottomMenuControls, bj as PhotonSiteFrameMobileControls, bF as PhotonSiteFrameMobileMenuControls, bk as PhotonSiteFrameMobileMenuTriggerPlacement, bG as PhotonSiteFrameMobileMenuType, bH as PhotonSiteFrameNavigationColumn, ac as PhotonSiteRegion, ad as PhotonSiteSettings, aO as PhotonSiteSettingsPanelDefinition, c9 as PhotonSiteSettingsPanelProps, ca as PhotonStudioInteractionTab, cb as PhotonStudioPaletteTab, bc as PhotonStudioSurfaceMode, bd as PhotonStudioUrlState, bb as PhotonStudioUrlStatePatch, al as PhotonSurfaceMode, ae as PhotonWorkspaceCapabilities, af as PhotonWorkspaceDescriptor, b3 as PhotonWorkspaceRef } from './types-C1q0pf4n.js';
export { c as collectPhotonFooterExtensionItems, a as collectPhotonHeaderExtensionItems, b as createPhotonAccountTabExtension, d as createPhotonSiteFrameExtension, r as resolvePhotonAccountTabs, e as resolvePhotonSiteFrameExtensions } from './site-frame-extensions-CeQZC1eT.js';
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

declare const resolveDefaultPhotonFieldLocalization: (kind: PhotonFieldKind) => PhotonFieldLocalization;
interface ResolvePhotonBlockFieldLocalizationInput {
    /** Block instance whose `localization` map can override defaults. */
    block: Pick<PhotonBlock, "localization">;
    /**
     * Optional block-type level schema. Acts as the second priority after
     * instance overrides. Comes from the block module definition.
     */
    schema?: PhotonBlockLocalizationSchema;
    /** Path of the field within the block, e.g. "title" or "items.0.label". */
    fieldPath: string;
    /** Kind of the field, used as the lowest-priority default. */
    fieldKind: PhotonFieldKind;
}
/**
 * Resolve effective localization for a single field. Priority:
 *
 *   1. Instance override (`block.localization[fieldPath]`).
 *   2. Block schema (`schema.localized` / `schema.shared`).
 *   3. Kind default (`resolveDefaultPhotonFieldLocalization`).
 */
declare const resolvePhotonBlockFieldLocalization: ({ block, schema, fieldPath, fieldKind, }: ResolvePhotonBlockFieldLocalizationInput) => PhotonFieldLocalization;
/**
 * Returns true when the resolved value differs from what defaults alone
 * would produce. Useful for inspector decorations that highlight
 * non-default localization choices.
 */
declare const isPhotonBlockFieldLocalizationOverridden: ({ block, schema, fieldPath, fieldKind, }: ResolvePhotonBlockFieldLocalizationInput) => boolean;
/**
 * Toggle the instance-level localization override for a field. If the
 * resulting state matches the schema baseline, the override is cleared
 * (keeps stored data minimal).
 */
declare const togglePhotonBlockFieldLocalization: <B extends PhotonBlock>(block: B, fieldPath: string, fieldKind: PhotonFieldKind, schema?: PhotonBlockLocalizationSchema) => B;
/**
 * Explicitly clear an instance-level override (revert to schema/kind default).
 */
declare const clearPhotonBlockFieldLocalization: <B extends PhotonBlock>(block: B, fieldPath: string) => B;

/**
 * Read the value of a localized field in a specific locale. If the value
 * stored on the block is a `PhotonLocalizedDefaultValue`, its `values[locale]`
 * is returned. Otherwise the raw value is treated as the locale-agnostic
 * fallback (which may or may not be considered "missing" — that's caller's
 * decision via `treatRawAsLocale`).
 */
declare const readLocalizedFieldValue: (block: PhotonBlock, fieldPath: string, locale: string) => unknown;
interface PhotonBlockSchemaMap {
    /**
     * Maps a block `type` string to the list of editable fields and its
     * localization schema. Provided by the registry that owns block module
     * definitions; passed in here as a plain map to avoid coupling to the
     * studio runtime.
     */
    [blockType: string]: {
        fields: readonly PhotonField[];
        localization?: PhotonBlockLocalizationSchema;
    };
}
interface PhotonTranslationCompletenessResult {
    locale: string;
    total: number;
    filled: number;
    missing: number;
    percentage: number;
    missingFields: Array<{
        blockId: string;
        blockType: string;
        fieldPath: string;
    }>;
}
interface ComputePhotonTranslationCompletenessInput {
    blocks: readonly PhotonBlock[];
    schemas: PhotonBlockSchemaMap;
    locale: string;
    /**
     * If true (default), a value identical to the same field in
     * `referenceLocale` is treated as missing (admin copied content but never
     * translated it). Caller can flip a per-field "translated" flag in
     * `block.localization` to opt out.
     */
    treatCopiedAsMissing?: boolean;
    /** Locale to compare against when `treatCopiedAsMissing` is on. */
    referenceLocale?: string;
}
/**
 * Compute translation completeness % for a given locale across blocks.
 *
 * Counts only fields whose effective localization is "localized" (per
 * `resolvePhotonBlockFieldLocalization`). A field is considered "filled" when:
 *
 *   - its value for `locale` is non-empty, AND
 *   - if `treatCopiedAsMissing` and `referenceLocale` are set, it is not
 *     identical to the reference locale's value (unless the block instance
 *     explicitly marks the field as translated via
 *     `block.localization[fieldPath] === "localized"` — this means the admin
 *     already opted into "this field is the same intentionally").
 *
 * Per spec, percentage = filled / total. 100% requires zero missing fields.
 * Cache the result yourself; this function is a pure computation.
 */
declare const computePhotonTranslationCompleteness: ({ blocks, schemas, locale, treatCopiedAsMissing, referenceLocale, }: ComputePhotonTranslationCompletenessInput) => PhotonTranslationCompletenessResult;

interface CopyPhotonLocaleContentInput {
    blocks: readonly PhotonBlock[];
    schemas: PhotonBlockSchemaMap;
    sourceLocale: string;
    targetLocale: string;
    /**
     * - "clone": overwrite all localized values in `targetLocale` with
     *   `sourceLocale`'s values, even if target already had data.
     * - "merge": only fill in fields whose target value is empty/undefined.
     *
     * Default `merge` — preserves any in-progress translation work.
     */
    mode?: "clone" | "merge";
}
/**
 * Returns a deep-copied list of blocks where translatable fields in
 * `targetLocale` are filled from `sourceLocale` according to `mode`.
 *
 * - Walks nested `areas[*].blocks`.
 * - Only touches fields whose effective localization is "localized" (per
 *   `resolvePhotonBlockFieldLocalization`); shared fields are untouched.
 * - When source value is missing, target value is left as is.
 */
declare const copyPhotonLocaleContent: ({ blocks, schemas, sourceLocale, targetLocale, mode, }: CopyPhotonLocaleContentInput) => PhotonBlock[];
/**
 * Copy a single block's translatable fields. Returned block is a new object;
 * input is not mutated. Useful for the inspector context-menu action.
 */
declare const copyPhotonBlockLocaleContent: (block: PhotonBlock, options: Omit<CopyPhotonLocaleContentInput, "blocks">) => PhotonBlock;

interface PhotonLocaleFallbackSettings {
    /**
     * - `null` / unset → use the default locale as the fallback target.
     * - `string` → explicit locale code; must exist in the locale list,
     *   otherwise the resolver falls back to the default locale anyway.
     * - `false` → fallback disabled. Missing values render as empty.
     */
    fallbackLocale?: string | false | null;
}
interface ResolvePhotonLocaleFallbackInput {
    settings: PhotonLocaleFallbackSettings | null | undefined;
    locales: readonly PhotonLocaleDescriptor[];
}
/**
 * Resolve which locale code (if any) acts as the field-level fallback.
 *
 * Priority (LOCALE_V1 §5.3):
 *   1. If `settings.fallbackLocale === false` → no fallback (returns null).
 *   2. If `settings.fallbackLocale` is a string and exists in the locale
 *      list → that locale.
 *   3. Otherwise → default locale (where `isDefault === true`).
 *   4. If no default locale exists → null.
 */
declare const resolvePhotonFallbackLocaleCode: ({ settings, locales, }: ResolvePhotonLocaleFallbackInput) => string | null;
interface ResolvePhotonLocalizedValueInput {
    value: unknown;
    locale: string;
    settings: PhotonLocaleFallbackSettings | null | undefined;
    locales: readonly PhotonLocaleDescriptor[];
}
/**
 * Resolve the actual value to render for `locale`. If the locale-specific
 * value is empty, applies the fallback policy from
 * `resolvePhotonFallbackLocaleCode`. When the fallback target is also
 * empty (or the value is shared / non-localized), returns the value as-is
 * or `undefined` for empties.
 */
declare const resolvePhotonLocalizedValue: ({ value, locale, settings, locales, }: ResolvePhotonLocalizedValueInput) => unknown;

interface FindPhotonFieldMissingLocalesInput {
    block: Pick<PhotonBlock, "props" | "localization">;
    schema?: PhotonBlockLocalizationSchema;
    fieldPath: string;
    fieldKind: PhotonFieldKind;
    /** Editable locale codes to check (admin's perspective). */
    locales: readonly string[];
    /**
     * Reference locale used to detect "copied but never translated" values.
     * Defaults to none (only empty values count as missing).
     */
    referenceLocale?: string;
    /**
     * If true (default), values identical to `referenceLocale` are flagged
     * as missing unless the field instance is explicitly marked translated
     * (`localization[fieldPath] === "localized"`).
     */
    treatCopiedAsMissing?: boolean;
}
/**
 * Return the subset of `locales` for which the given field is missing.
 * A field is "missing" in a locale if:
 *  - effective localization for the field is "localized" (else returns []),
 *  - AND the locale-specific value is empty OR (with `treatCopiedAsMissing`)
 *    identical to the reference locale and not explicitly opted in.
 *
 * Pure helper. UI components consume the result to render warn markers.
 */
declare const findPhotonFieldMissingLocales: ({ block, schema, fieldPath, fieldKind, locales, referenceLocale, treatCopiedAsMissing, }: FindPhotonFieldMissingLocalesInput) => string[];

/**
 * Walk every block (including nested area blocks) and assemble a
 * `PhotonBlockSchemaMap` keyed by `block.type` from the registered block
 * definitions. Only entries actually present in `blocks` are included, so
 * callers don't pay for definitions they don't use.
 *
 * Note: the registry stores definitions keyed by `${module}::${type}` to
 * avoid module collisions. This map keys by `block.type` only because the
 * pure calculator looks up that way; if two modules ship the same block
 * type, the LAST visited block wins for that type. In practice block types
 * are globally unique within a Photon app.
 */
declare const buildPhotonBlockSchemaMapForBlocks: (blocks: readonly PhotonBlock[], registry: PhotonRegistry) => PhotonBlockSchemaMap;
interface ComputePhotonTranslationCompletenessFromRegistryInput {
    blocks: readonly PhotonBlock[];
    registry: PhotonRegistry;
    locale: string;
    treatCopiedAsMissing?: boolean;
    referenceLocale?: string;
}
/**
 * Convenience wrapper: assemble the schema map from the registry, then
 * delegate to the pure `computePhotonTranslationCompleteness`. Use this in
 * client code where the registry is available.
 */
declare const computePhotonTranslationCompletenessFromRegistry: ({ blocks, registry, locale, treatCopiedAsMissing, referenceLocale, }: ComputePhotonTranslationCompletenessFromRegistryInput) => PhotonTranslationCompletenessResult;
/**
 * Compute completeness for many locales at once (one call iterates blocks
 * once per locale, but assembles the schema map only once). Used by the
 * top-panel content-locale switcher to display per-locale percentages.
 */
declare const computePhotonTranslationCompletenessForLocales: ({ blocks, registry, locales, referenceLocale, treatCopiedAsMissing, }: {
    blocks: readonly PhotonBlock[];
    registry: PhotonRegistry;
    locales: readonly string[];
    referenceLocale?: string;
    treatCopiedAsMissing?: boolean;
}) => Record<string, PhotonTranslationCompletenessResult>;

declare const photonSiteColorSchemes: PhotonSiteColorSchemeDefinition[];
declare const getPhotonSiteColorScheme: (id: string) => PhotonSiteColorSchemeDefinition | undefined;

declare const PHOTON_DEFAULT_SITE_DESIGN_PRESET_ID = "aurora-current";
declare const photonSiteDesignPresets: PhotonSiteDesignPresetDefinition[];
declare const getPhotonSiteDesignPreset: (id: string) => PhotonSiteDesignPresetDefinition | undefined;

export { type ComputePhotonTranslationCompletenessFromRegistryInput, type ComputePhotonTranslationCompletenessInput, type CopyPhotonLocaleContentInput, type FindPhotonFieldMissingLocalesInput, PHOTON_DEFAULT_SITE_DESIGN_PRESET_ID, PHOTON_PAGE_SURFACE_REGION_KEY, PhotonBlock, PhotonBlockLocalizationSchema, type PhotonBlockSchemaMap, PhotonDocument, PhotonField, PhotonFieldKind, PhotonFieldLocalization, PhotonLocaleDescriptor, type PhotonLocaleFallbackSettings, PhotonRegistry, PhotonSite, PhotonSiteColorSchemeDefinition, PhotonSiteDesignPresetDefinition, type PhotonTranslationCompletenessResult, type ResolvePhotonBlockFieldLocalizationInput, type ResolvePhotonLocaleFallbackInput, type ResolvePhotonLocalizedValueInput, buildPhotonBlockSchemaMapForBlocks, clearPhotonBlockFieldLocalization, composePhotonSurfaceDocument, computePhotonTranslationCompleteness, computePhotonTranslationCompletenessForLocales, computePhotonTranslationCompletenessFromRegistry, copyPhotonBlockLocaleContent, copyPhotonLocaleContent, decomposePhotonSurfaceDocument, findPhotonFieldMissingLocales, getFirstPhotonSurfaceEditableBlockId, getPhotonSiteColorScheme, getPhotonSiteDesignPreset, getPhotonSurfaceRegionBlocks, getPhotonSurfaceRegionListId, isPhotonBlockFieldLocalizationOverridden, photonSiteColorSchemes, photonSiteDesignPresets, readLocalizedFieldValue, resolveDefaultPhotonFieldLocalization, resolvePhotonBlockFieldLocalization, resolvePhotonFallbackLocaleCode, resolvePhotonLocalizedValue, resolvePhotonSurfaceRegionDescriptors, resolvePhotonSurfaceRegionForBlockId, resolvePhotonSurfaceRegionForListId, togglePhotonBlockFieldLocalization };
