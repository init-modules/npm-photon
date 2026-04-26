import { a6 as PhotonActionPolicy, a4 as PhotonConditionEvaluatorMap, ac as PhotonConditionEvaluationContext, aH as PhotonActionPlan, ab as PhotonConditionExpression, aC as PhotonInteractionGuardInstance, Q as PhotonInteractionGuardDefinition, aZ as PhotonActionPolicyScope, ao as PhotonSiteSettings, a8 as PhotonSiteDataSchema, bl as PhotonResolvedSiteData } from './types-B49fMVug.js';
export { aV as PhotonActionPlanExecutionStatus, aW as PhotonActionPlanResult, aX as PhotonActionPlanStep, aY as PhotonActionPolicyEnforcement, ad as PhotonActionStateDefinition, bB as PhotonArea, Y as PhotonBlock, b1 as PhotonComponentLibraryEditorSelection, aw as PhotonComponentLibraryItem, az as PhotonComponentLibrarySettings, b2 as PhotonComponentLibrarySourceSelection, ax as PhotonComponentLibraryUsage, T as PhotonComponentLibraryUsageProvider, ay as PhotonComponentReferenceProps, a3 as PhotonConditionDefinition, b3 as PhotonConditionEvaluator, ae as PhotonConditionResolution, t as PhotonDocument, a5 as PhotonDocumentsMap, bD as PhotonFieldBinding, O as PhotonInteractionActionDefinition, aG as PhotonInteractionActionExecutionHandlers, b5 as PhotonInteractionActionInstance, F as PhotonInteractionActionPresentation, aA as PhotonInteractionExecutionResult, b6 as PhotonInteractionExecutionStatus, aD as PhotonInteractionGuardEvaluationContext, aF as PhotonInteractionGuardEvaluationResult, b7 as PhotonInteractionGuardEvaluator, R as PhotonInteractionGuardEvaluatorMap, b8 as PhotonInteractionGuardMissingEvaluatorPolicy, af as PhotonInteractionPreviewScenario, aI as PhotonInteractionSettings, N as PhotonInteractionSurfaceDefinition, b9 as PhotonInteractionSurfaceInstance, ba as PhotonInteractionSurfaceIntentBinding, ap as PhotonInteractionSurfaceSettings, ar as PhotonInteractionSurfaceTrigger, au as PhotonInteractionToastTemplate, bf as PhotonInteractionTriggerBinding, aB as PhotonInteractionTriggerSlot, bh as PhotonLocaleDescriptor, bi as PhotonLocaleStatus, bT as PhotonMediaUploadInput, bE as PhotonMediaValue, E as PhotonPageCatalogItem, bY as PhotonPageRuntimeData, v as PhotonPageSettings, aU as PhotonResolvedPage, u as PhotonResources, K as PhotonSearchHighlight, bF as PhotonSearchResult, w as PhotonSite, bm as PhotonSiteDataBinding, bn as PhotonSiteDataField, bo as PhotonSiteDataFieldKind, c8 as PhotonSiteRegion, z as PhotonWorkspaceCapabilities, y as PhotonWorkspaceDescriptor } from './types-B49fMVug.js';
export { P as PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY, U as PHOTON_COMPONENT_REFERENCE_AREA_ID, V as PHOTON_COMPONENT_REFERENCE_MAX_DEPTH, a as PHOTON_COMPONENT_REFERENCE_MODULE, b as PHOTON_COMPONENT_REFERENCE_TYPE, c as PHOTON_INTERACTIONS_SITE_SETTING_KEY, d as PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY, e as PHOTON_ROUTE_CONTEXT_SCOPE, f as PHOTON_SEARCH_OCCURRENCE_PARAM, g as PHOTON_SEARCH_QUERY_PARAM, h as PHOTON_SEARCH_TARGET_PARAM, i as clonePhotonComponentLibraryBlocksForCopy, j as clonePhotonComponentSourceBlockWithNewIds, k as collectPhotonComponentLibraryUsages, l as createPhotonActionValue, m as createPhotonComponentLibraryBlockId, n as createPhotonComponentLibraryItemFromBlock, o as createPhotonComponentReferenceBlock, p as createPhotonInteractionActionDefinition, q as createPhotonInteractionExecutionResult, r as createPhotonInteractionGuardDefinition, s as createPhotonInteractionSurfaceDefinition, t as createPhotonInteractionTriggerSlot, W as duplicatePhotonComponentLibraryItem, u as evaluatePhotonInteractionGuards, v as executePhotonInteractionActionPresentation, w as executePhotonInteractionTriggerSlot, x as getPhotonComponentLibraryItems, y as isPhotonComponentReferenceBlock, z as matchRoutePattern, A as mergePhotonStudioUrlState, B as normalizePhotonStudioSurfaceMode, C as parsePhotonComponentLibraryBlockId, D as parsePhotonStudioUrlState, E as parseRoutePattern, F as photonInteractionExecutionSucceeded, G as planPhotonInteractionTriggerSlot, H as readPhotonComponentLibrarySettings, I as readPhotonInteractionSettings, J as readPhotonInteractionSurfaceSettings, X as remapPhotonComponentLibraryBlock, Y as resolvePhotonBlockInteractionSlots, K as resolvePhotonComponentReferenceBlocks, L as resolvePhotonInteractionActionCatalog, M as resolvePhotonInteractionSlotAction, N as resolvePhotonInteractionSlotGuards, O as resolvePhotonInteractionSurfaceCatalog, Q as resolvePhotonInteractionSurfaceRequest, R as resolvePhotonInteractionToastTemplate, S as resolveRouteContext, T as writePhotonStudioUrlState } from './constants-C7i8GoFP.js';
export { d as decodePhotonHtmlEntities, g as getPhotonAnchorRel, n as normalizePhotonUrlForProtocolCheck, s as sanitizePhotonLinkHref } from './link-url-XwgBLvA0.js';
export { D as DEFAULT_PHOTON_WORKSPACE_CAPABILITIES, a as DEFAULT_PHOTON_WORKSPACE_REF, b as PHOTON_ROOT_LIST_ID, c as PHOTON_SITE_DESIGN_DEFAULTS, d as PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS, e as applyPhotonSiteColorScheme, f as applyPhotonSiteDesignPreset, g as canEditPhotonWorkspace, h as canSavePhotonWorkspace, i as clonePhotonBlockTreeWithNewIds, j as clonePhotonValue, k as collectBlockIds, l as createPhotonAreaListId, m as createPhotonNodeId, n as createPhotonSiteDesignSettings, o as duplicatePhotonBlockInDocument, p as findPhotonBlock, q as getFirstPhotonBlockId, r as getPhotonWorkspaceIdentityKey, s as getPhotonWorkspaceKey, u as hasPhotonSiteDesignPresetCustomization, v as insertPhotonBlockInDocument, w as insertPhotonBlocksInDocument, x as isPhotonFramelessPreset, y as isPhotonFramelessSiteDesign, z as isPhotonSiteDesignPresetApplied, A as isPhotonWorkspaceReadonly, C as movePhotonBlockInDocument, E as normalizePhotonWorkspaceCapabilities, F as normalizePhotonWorkspaceDescriptor, G as normalizePhotonWorkspaceRef, H as removePhotonBlockFromDocument, I as replacePhotonBlockWithBlocksInDocument, J as resolvePhotonSiteDesignSettings, L as updatePhotonBlockInDocument } from './workspace-Bq5g_SWD.js';
export { g as getPhotonSurfaceModeStyle } from './surface-layout-BDeLt-7u.js';
import 'react';

declare const evaluateConditionExpression: (expr: PhotonConditionExpression, evaluators: PhotonConditionEvaluatorMap, context: PhotonConditionEvaluationContext) => boolean | null;
declare const buildActionPlan: (targetActionInstanceId: string, policies: PhotonActionPolicy[], evaluators: PhotonConditionEvaluatorMap, conditionContext: PhotonConditionEvaluationContext) => PhotonActionPlan;
declare const mapGuardsToActionPolicies: (guardInstances: PhotonInteractionGuardInstance[], _guardDefinitions: PhotonInteractionGuardDefinition[], options?: {
    targetActionId?: string;
    runActionInstanceId?: string;
}) => PhotonActionPolicy[];

/**
 * Cascade scope ordering from 6.md §Override Resolution Algorithm.
 *
 * Lower number = lower priority (broader). Higher number wins when
 * contributions conflict on the same key. Generic resolver applies
 * the same ladder across all layered domains: site data, action
 * instances, policies, library refs, route context, localized copy.
 *
 * `workspace` is a backward-compatible alias for `workspace-draft`
 * (same priority slot — equivalent during transition).
 */
declare const PHOTON_CASCADE_SCOPE_ORDER: Record<PhotonActionPolicyScope, number>;
/**
 * Cascade-orderable shape: anything with `scope`, optional `priority`,
 * and `packageName`. Generic helpers below sort/dedupe across any
 * domain (policies, instances, library refs, etc.) by reusing this
 * single comparison rule.
 */
type PhotonCascadable = {
    scope: PhotonActionPolicyScope;
    priority?: number;
    packageName: string;
};
/**
 * Compare two cascadable items. Returns negative if `b` wins, positive
 * if `a` wins, zero if fully equal. Suitable for `Array.sort` to put
 * winners first (descending priority).
 *
 * Resolution order from 6.md:
 * 1. Higher scope wins.
 * 2. Within scope, higher explicit `priority` wins.
 * 3. On tie, `scope: "site"` beats `scope: "package-default"` (already
 *    handled by step 1 since site > package-default).
 * 4. On full equality, alphabetical `packageName` (deterministic only —
 *    builder should warn about this case).
 */
declare const comparePhotonCascadable: (a: PhotonCascadable, b: PhotonCascadable) => number;
/**
 * Sort cascadable items in winner-first order (descending priority).
 * Pure function: returns a new array, does not mutate input.
 */
declare const sortPhotonCascade: <T extends PhotonCascadable>(items: readonly T[]) => T[];
/**
 * Sort + dedupe by a key extractor. Items earlier in the cascade-sorted
 * order win (winners come first). Useful for resolving competing
 * contributions on the same domain key (e.g. multiple policies
 * targeting the same action, or multiple data overrides on one field).
 */
declare const dedupePhotonCascadeBy: <T extends PhotonCascadable, K>(items: readonly T[], getKey: (item: T) => K) => T[];
/**
 * Detect ambiguous resolutions: items that share the same key, scope,
 * and priority but come from different packages. The first wins by
 * alphabetical package name, but the builder should surface the
 * conflict so the site author can disambiguate via explicit `priority`.
 */
type PhotonCascadeConflict<T extends PhotonCascadable> = {
    key: unknown;
    winner: T;
    losers: T[];
};
declare const detectPhotonCascadeConflicts: <T extends PhotonCascadable, K>(items: readonly T[], getKey: (item: T) => K) => PhotonCascadeConflict<T>[];
declare const resolvePolicyCascade: (policies: PhotonActionPolicy[]) => PhotonActionPolicy[];
declare const dedupePoliciesById: (policies: PhotonActionPolicy[]) => PhotonActionPolicy[];

declare const sitePolicyPath: (id: string) => string;
declare const isSitePolicyOverride: (policyId: string, siteSettings: PhotonSiteSettings | undefined) => boolean;
declare const createSitePolicyOverride: (basePolicy: PhotonActionPolicy, patch?: Partial<PhotonActionPolicy>) => PhotonActionPolicy;

declare const PHOTON_SITE_DATA_SETTING_KEY = "data";
declare const PHOTON_SITE_DATA_BY_LOCALE_SETTING_KEY = "dataByLocale";
declare const sitePath: (schemaId: string, fieldPath: string) => string;
declare const localeSitePath: (localeCode: string, schemaId: string, fieldPath: string) => string;
declare const resolvePhotonSiteData: (schemas: PhotonSiteDataSchema[], siteSettings: PhotonSiteSettings | undefined, options?: {
    locale?: string | null;
}) => PhotonResolvedSiteData;
declare const parsePhotonSiteDataBindingExpression: (expression: string) => {
    schemaId: string;
    fieldPath: string;
} | null;
declare const resolvePhotonSiteDataBinding: (text: string, resolved: PhotonResolvedSiteData, options?: {
    fallback?: string;
    routeContext?: Record<string, unknown>;
}) => string;
declare const extractPhotonSiteDataBindings: (text: string) => Array<{
    schemaId: string;
    fieldPath: string;
}>;

export { PHOTON_CASCADE_SCOPE_ORDER, PHOTON_SITE_DATA_BY_LOCALE_SETTING_KEY, PHOTON_SITE_DATA_SETTING_KEY, PhotonActionPlan, PhotonActionPolicy, PhotonActionPolicyScope, type PhotonCascadable, type PhotonCascadeConflict, PhotonConditionEvaluationContext, PhotonConditionEvaluatorMap, PhotonConditionExpression, PhotonInteractionGuardDefinition, PhotonInteractionGuardInstance, PhotonResolvedSiteData, PhotonSiteDataSchema, PhotonSiteSettings, buildActionPlan, comparePhotonCascadable, createSitePolicyOverride, dedupePhotonCascadeBy, dedupePoliciesById, detectPhotonCascadeConflicts, evaluateConditionExpression, extractPhotonSiteDataBindings, isSitePolicyOverride, localeSitePath, mapGuardsToActionPolicies, parsePhotonSiteDataBindingExpression, resolvePhotonSiteData, resolvePhotonSiteDataBinding, resolvePolicyCascade, sitePath, sitePolicyPath, sortPhotonCascade };
