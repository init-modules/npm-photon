import { an as PhotonActionValue, N as PhotonInteractionSurfaceDefinition, ao as PhotonSiteSettings, ap as PhotonInteractionSurfaceSettings, aq as PhotonResolvedInteractionSurfaceCatalog, ar as PhotonInteractionSurfaceTrigger, as as PhotonResolvedInteractionSurfaceRequest, at as PhotonInteractionToastInput, au as PhotonInteractionToastTemplate, a7 as PhotonRouteContextField, av as PhotonResolvedRouteContext, aw as PhotonComponentLibraryItem, Y as PhotonBlock, t as PhotonDocument, ax as PhotonComponentLibraryUsage, ay as PhotonComponentReferenceProps, az as PhotonComponentLibrarySettings, O as PhotonInteractionActionDefinition, aA as PhotonInteractionExecutionResult, Q as PhotonInteractionGuardDefinition, aB as PhotonInteractionTriggerSlot, aC as PhotonInteractionGuardInstance, R as PhotonInteractionGuardEvaluatorMap, aD as PhotonInteractionGuardEvaluationContext, aE as PhotonResolvedInteractionActionCatalog, aF as PhotonInteractionGuardEvaluationResult, F as PhotonInteractionActionPresentation, aG as PhotonInteractionActionExecutionHandlers, a4 as PhotonConditionEvaluatorMap, ac as PhotonConditionEvaluationContext, aH as PhotonActionPlan, aI as PhotonInteractionSettings, X as PhotonBlockDefinition, aJ as PhotonBlockInteractionSlotContext, a6 as PhotonActionPolicy, aK as PhotonStudioUrlStatePatch, aL as PhotonStudioSurfaceMode, aM as PhotonStudioUrlState } from './types-B49fMVug.js';

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

export { mergePhotonStudioUrlState as A, normalizePhotonStudioSurfaceMode as B, parsePhotonComponentLibraryBlockId as C, parsePhotonStudioUrlState as D, parseRoutePattern as E, photonInteractionExecutionSucceeded as F, planPhotonInteractionTriggerSlot as G, readPhotonComponentLibrarySettings as H, readPhotonInteractionSettings as I, readPhotonInteractionSurfaceSettings as J, resolvePhotonComponentReferenceBlocks as K, resolvePhotonInteractionActionCatalog as L, resolvePhotonInteractionSlotAction as M, resolvePhotonInteractionSlotGuards as N, resolvePhotonInteractionSurfaceCatalog as O, PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY as P, resolvePhotonInteractionSurfaceRequest as Q, resolvePhotonInteractionToastTemplate as R, resolveRouteContext as S, writePhotonStudioUrlState as T, PHOTON_COMPONENT_REFERENCE_AREA_ID as U, PHOTON_COMPONENT_REFERENCE_MAX_DEPTH as V, duplicatePhotonComponentLibraryItem as W, remapPhotonComponentLibraryBlock as X, resolvePhotonBlockInteractionSlots as Y, PHOTON_COMPONENT_REFERENCE_MODULE as a, PHOTON_COMPONENT_REFERENCE_TYPE as b, PHOTON_INTERACTIONS_SITE_SETTING_KEY as c, PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY as d, PHOTON_ROUTE_CONTEXT_SCOPE as e, PHOTON_SEARCH_OCCURRENCE_PARAM as f, PHOTON_SEARCH_QUERY_PARAM as g, PHOTON_SEARCH_TARGET_PARAM as h, clonePhotonComponentLibraryBlocksForCopy as i, clonePhotonComponentSourceBlockWithNewIds as j, collectPhotonComponentLibraryUsages as k, createPhotonActionValue as l, createPhotonComponentLibraryBlockId as m, createPhotonComponentLibraryItemFromBlock as n, createPhotonComponentReferenceBlock as o, createPhotonInteractionActionDefinition as p, createPhotonInteractionExecutionResult as q, createPhotonInteractionGuardDefinition as r, createPhotonInteractionSurfaceDefinition as s, createPhotonInteractionTriggerSlot as t, evaluatePhotonInteractionGuards as u, executePhotonInteractionActionPresentation as v, executePhotonInteractionTriggerSlot as w, getPhotonComponentLibraryItems as x, isPhotonComponentReferenceBlock as y, matchRoutePattern as z };
