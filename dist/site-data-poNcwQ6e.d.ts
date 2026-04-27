import { d as PhotonActionPolicy, t as PhotonConditionEvaluatorMap, r as PhotonConditionEvaluationContext, P as PhotonActionPlan, u as PhotonConditionExpression, K as PhotonInteractionGuardInstance, F as PhotonInteractionGuardDefinition, f as PhotonActionPolicyScope, ad as PhotonSiteSettings, ab as PhotonSiteDataSchema, a3 as PhotonResolvedSiteData } from './types-1-bZpAzJ.js';

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

export { PHOTON_CASCADE_SCOPE_ORDER as P, PHOTON_SITE_DATA_BY_LOCALE_SETTING_KEY as a, PHOTON_SITE_DATA_SETTING_KEY as b, type PhotonCascadable as c, type PhotonCascadeConflict as d, buildActionPlan as e, comparePhotonCascadable as f, createSitePolicyOverride as g, dedupePhotonCascadeBy as h, dedupePoliciesById as i, detectPhotonCascadeConflicts as j, evaluateConditionExpression as k, extractPhotonSiteDataBindings as l, isSitePolicyOverride as m, localeSitePath as n, mapGuardsToActionPolicies as o, parsePhotonSiteDataBindingExpression as p, resolvePhotonSiteDataBinding as q, resolvePhotonSiteData as r, resolvePolicyCascade as s, sitePath as t, sitePolicyPath as u, sortPhotonCascade as v };
