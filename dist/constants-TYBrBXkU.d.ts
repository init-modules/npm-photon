import { b4 as PhotonActionValue, O as PhotonInteractionSurfaceDefinition, ad as PhotonSiteSettings, S as PhotonInteractionSurfaceSettings, b5 as PhotonResolvedInteractionSurfaceCatalog, T as PhotonInteractionSurfaceTrigger, b6 as PhotonResolvedInteractionSurfaceRequest, b7 as PhotonInteractionToastInput, U as PhotonInteractionToastTemplate, aW as PhotonRouteContextField, b8 as PhotonResolvedRouteContext, k as PhotonComponentLibraryItem, i as PhotonBlock, w as PhotonDocument, n as PhotonComponentLibraryUsage, p as PhotonComponentReferenceProps, l as PhotonComponentLibrarySettings, z as PhotonInteractionActionDefinition, D as PhotonInteractionExecutionResult, F as PhotonInteractionGuardDefinition, W as PhotonInteractionTriggerSlot, K as PhotonInteractionGuardInstance, J as PhotonInteractionGuardEvaluatorMap, G as PhotonInteractionGuardEvaluationContext, b9 as PhotonResolvedInteractionActionCatalog, H as PhotonInteractionGuardEvaluationResult, C as PhotonInteractionActionPresentation, A as PhotonInteractionActionExecutionHandlers, t as PhotonConditionEvaluatorMap, r as PhotonConditionEvaluationContext, P as PhotonActionPlan, N as PhotonInteractionSettings, aP as PhotonBlockDefinition, ba as PhotonBlockInteractionSlotContext, d as PhotonActionPolicy, bb as PhotonStudioUrlStatePatch, bc as PhotonStudioSurfaceMode, bd as PhotonStudioUrlState } from './types-C1q0pf4n.js';

declare const PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY = "interactionSurfaces";
declare const createPhotonInteractionSurfaceDefinition: (definition: PhotonInteractionSurfaceDefinition) => PhotonInteractionSurfaceDefinition;
declare const createPhotonActionValue: (action: PhotonActionValue) => PhotonActionValue;
declare const readPhotonInteractionSurfaceSettings: (siteSettings: PhotonSiteSettings | undefined) => PhotonInteractionSurfaceSettings;
declare const resolvePhotonInteractionSurfaceCatalog: ({ definitions, siteSettings, }: {
    definitions: readonly PhotonInteractionSurfaceDefinition[] | undefined;
    siteSettings?: PhotonSiteSettings;
}) => PhotonResolvedInteractionSurfaceCatalog;
declare const resolvePhotonInteractionSurfaceRequest: (trigger: PhotonInteractionSurfaceTrigger, catalog: PhotonResolvedInteractionSurfaceCatalog) => PhotonResolvedInteractionSurfaceRequest | null;
declare const resolvePhotonInteractionToastTemplate: (input: PhotonInteractionToastInput, catalog: PhotonResolvedInteractionSurfaceCatalog) => PhotonInteractionToastTemplate | null;

declare const PHOTON_ROUTE_CONTEXT_SCOPE = "route";
type ParsedRoutePattern = {
    regex: RegExp;
    paramNames: string[];
};
declare const parseRoutePattern: (pattern: string) => ParsedRoutePattern;
declare const matchRoutePattern: (pattern: string, path: string) => {
    params: Record<string, string>;
} | null;
declare const resolveRouteContext: (fields: PhotonRouteContextField[], patterns: string[] | undefined, path: string) => PhotonResolvedRouteContext;

declare const PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY = "componentLibrary";
declare const PHOTON_COMPONENT_REFERENCE_MODULE = "photon-system";
declare const PHOTON_COMPONENT_REFERENCE_TYPE = "component-reference";
declare const PHOTON_COMPONENT_REFERENCE_AREA_ID = "content";
declare const PHOTON_COMPONENT_REFERENCE_MAX_DEPTH = 8;
declare const readPhotonComponentLibrarySettings: (siteSettings: PhotonSiteSettings | undefined) => PhotonComponentLibrarySettings;
declare const getPhotonComponentLibraryItems: (siteSettings: PhotonSiteSettings | undefined) => Record<string, PhotonComponentLibraryItem>;
declare const isPhotonComponentReferenceBlock: (block: PhotonBlock) => block is PhotonBlock<PhotonComponentReferenceProps>;
declare const createPhotonComponentReferenceBlock: (item: Pick<PhotonComponentLibraryItem, "id" | "label">) => PhotonBlock<PhotonComponentReferenceProps>;
declare const parsePhotonComponentLibraryBlockId: (blockId: string) => {
    itemId: string;
    referenceBlockId: string;
    sourceBlockId: string;
} | null;
declare const createPhotonComponentLibraryBlockId: ({ itemId, referenceBlockId, sourceBlockId, }: {
    itemId: string;
    referenceBlockId: string;
    sourceBlockId: string;
}) => string;
declare const remapPhotonComponentLibraryBlock: (block: PhotonBlock, itemId: string, referenceBlockId: string) => PhotonBlock;
declare const resolvePhotonComponentReferenceBlocks: ({ block, siteSettings, stack, }: {
    block: PhotonBlock<PhotonComponentReferenceProps>;
    siteSettings: PhotonSiteSettings | undefined;
    stack?: readonly string[];
}) => PhotonBlock[];
declare const clonePhotonComponentLibraryBlocksForCopy: (item: PhotonComponentLibraryItem) => PhotonBlock[];
declare const clonePhotonComponentSourceBlockWithNewIds: (block: PhotonBlock) => PhotonBlock;
declare const createPhotonComponentLibraryItemFromBlock: (block: PhotonBlock, label?: string) => PhotonComponentLibraryItem;
declare const duplicatePhotonComponentLibraryItem: (item: PhotonComponentLibraryItem) => PhotonComponentLibraryItem;
declare const collectPhotonComponentLibraryUsages: (document: PhotonDocument, source?: NonNullable<PhotonComponentLibraryUsage["source"]>) => PhotonComponentLibraryUsage[];

declare const PHOTON_INTERACTIONS_SITE_SETTING_KEY = "interactions";
declare const createPhotonInteractionActionDefinition: (definition: PhotonInteractionActionDefinition) => PhotonInteractionActionDefinition;
declare const createPhotonInteractionGuardDefinition: (definition: PhotonInteractionGuardDefinition) => PhotonInteractionGuardDefinition;
declare const createPhotonInteractionTriggerSlot: (slot: PhotonInteractionTriggerSlot) => PhotonInteractionTriggerSlot;
declare const resolvePhotonBlockInteractionSlots: (definition: PhotonBlockDefinition | undefined, context: PhotonBlockInteractionSlotContext) => PhotonInteractionTriggerSlot[];
declare const readPhotonInteractionSettings: (siteSettings: PhotonSiteSettings | undefined) => PhotonInteractionSettings;
declare const resolvePhotonInteractionActionCatalog: ({ actions, guards, surfaces, policies, siteSettings, }: {
    actions?: readonly PhotonInteractionActionDefinition[];
    guards?: readonly PhotonInteractionGuardDefinition[];
    surfaces?: readonly PhotonInteractionSurfaceDefinition[];
    policies?: readonly PhotonActionPolicy[];
    siteSettings?: PhotonSiteSettings;
}) => PhotonResolvedInteractionActionCatalog;
declare const resolvePhotonInteractionSlotAction: (slot: PhotonInteractionTriggerSlot, catalog: PhotonResolvedInteractionActionCatalog) => PhotonInteractionActionPresentation | null;
declare const resolvePhotonInteractionSlotGuards: (slot: PhotonInteractionTriggerSlot, catalog: PhotonResolvedInteractionActionCatalog) => PhotonInteractionGuardInstance[];
declare const createPhotonInteractionExecutionResult: (result: PhotonInteractionExecutionResult) => PhotonInteractionExecutionResult;
declare const photonInteractionExecutionSucceeded: (result: PhotonInteractionExecutionResult) => boolean;
declare const executePhotonInteractionActionPresentation: (action: PhotonInteractionActionPresentation | undefined | null, handlers: PhotonInteractionActionExecutionHandlers) => PhotonInteractionExecutionResult;
declare const evaluatePhotonInteractionGuards: ({ guards, evaluators, context, }: {
    guards: readonly PhotonInteractionGuardInstance[];
    evaluators?: PhotonInteractionGuardEvaluatorMap;
    context: Omit<PhotonInteractionGuardEvaluationContext, "guard" | "definition"> & {
        catalog: PhotonResolvedInteractionActionCatalog;
    };
}) => PhotonInteractionGuardEvaluationResult;
/**
 * Builds a plan for the given target action instance, mixing site-level
 * `interactionPolicies` (declared upfront) with bridge policies derived from
 * the slot's legacy `guardInstanceIds`. Returns `null` when there is no
 * target instance to plan against (e.g. link-only triggers).
 */
declare const planPhotonInteractionTriggerSlot: ({ slot, catalog, conditionEvaluators, conditionContext, }: {
    slot: PhotonInteractionTriggerSlot;
    catalog: PhotonResolvedInteractionActionCatalog;
    conditionEvaluators?: PhotonConditionEvaluatorMap;
    conditionContext?: PhotonConditionEvaluationContext;
}) => PhotonActionPlan | null;
declare const executePhotonInteractionTriggerSlot: ({ slot, catalog, evaluators, conditionEvaluators, conditionContext, context, handlers, }: {
    slot: PhotonInteractionTriggerSlot;
    catalog: PhotonResolvedInteractionActionCatalog;
    evaluators?: PhotonInteractionGuardEvaluatorMap;
    conditionEvaluators?: PhotonConditionEvaluatorMap;
    conditionContext?: PhotonConditionEvaluationContext;
    context: Omit<PhotonInteractionGuardEvaluationContext, "guard" | "definition" | "slot" | "action">;
    handlers: PhotonInteractionActionExecutionHandlers;
}) => PhotonInteractionExecutionResult;

declare const normalizePhotonStudioSurfaceMode: (value: string | null | undefined) => PhotonStudioSurfaceMode | undefined;
declare const parsePhotonStudioUrlState: (search: string | URLSearchParams) => PhotonStudioUrlState;
declare const writePhotonStudioUrlState: (params: URLSearchParams, state: PhotonStudioUrlStatePatch) => URLSearchParams;
declare const mergePhotonStudioUrlState: (search: string | URLSearchParams, state: PhotonStudioUrlStatePatch) => URLSearchParams;

declare const PHOTON_SEARCH_QUERY_PARAM = "photon-search-query";
declare const PHOTON_SEARCH_TARGET_PARAM = "photon-search-target";
declare const PHOTON_SEARCH_OCCURRENCE_PARAM = "photon-search-occurrence";

export { getPhotonComponentLibraryItems as A, isPhotonComponentReferenceBlock as B, matchRoutePattern as C, mergePhotonStudioUrlState as D, normalizePhotonStudioSurfaceMode as E, parsePhotonComponentLibraryBlockId as F, parsePhotonStudioUrlState as G, parseRoutePattern as H, photonInteractionExecutionSucceeded as I, planPhotonInteractionTriggerSlot as J, readPhotonComponentLibrarySettings as K, readPhotonInteractionSettings as L, readPhotonInteractionSurfaceSettings as M, remapPhotonComponentLibraryBlock as N, resolvePhotonBlockInteractionSlots as O, PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY as P, resolvePhotonComponentReferenceBlocks as Q, resolvePhotonInteractionActionCatalog as R, resolvePhotonInteractionSlotAction as S, resolvePhotonInteractionSlotGuards as T, resolvePhotonInteractionSurfaceCatalog as U, resolvePhotonInteractionSurfaceRequest as V, resolvePhotonInteractionToastTemplate as W, resolveRouteContext as X, writePhotonStudioUrlState as Y, PHOTON_COMPONENT_REFERENCE_AREA_ID as a, PHOTON_COMPONENT_REFERENCE_MAX_DEPTH as b, PHOTON_COMPONENT_REFERENCE_MODULE as c, PHOTON_COMPONENT_REFERENCE_TYPE as d, PHOTON_INTERACTIONS_SITE_SETTING_KEY as e, PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY as f, PHOTON_ROUTE_CONTEXT_SCOPE as g, PHOTON_SEARCH_OCCURRENCE_PARAM as h, PHOTON_SEARCH_QUERY_PARAM as i, PHOTON_SEARCH_TARGET_PARAM as j, clonePhotonComponentLibraryBlocksForCopy as k, clonePhotonComponentSourceBlockWithNewIds as l, collectPhotonComponentLibraryUsages as m, createPhotonActionValue as n, createPhotonComponentLibraryBlockId as o, createPhotonComponentLibraryItemFromBlock as p, createPhotonComponentReferenceBlock as q, createPhotonInteractionActionDefinition as r, createPhotonInteractionExecutionResult as s, createPhotonInteractionGuardDefinition as t, createPhotonInteractionSurfaceDefinition as u, createPhotonInteractionTriggerSlot as v, duplicatePhotonComponentLibraryItem as w, evaluatePhotonInteractionGuards as x, executePhotonInteractionActionPresentation as y, executePhotonInteractionTriggerSlot as z };
