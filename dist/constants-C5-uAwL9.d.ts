import { at as PhotonActionValue, A as PhotonInteractionSurfaceDefinition, W as PhotonSiteSettings, D as PhotonInteractionSurfaceSettings, au as PhotonResolvedInteractionSurfaceCatalog, E as PhotonInteractionSurfaceTrigger, av as PhotonResolvedInteractionSurfaceRequest, aw as PhotonInteractionToastInput, F as PhotonInteractionToastTemplate, c as PhotonComponentLibraryItem, a as PhotonBlock, i as PhotonDocument, f as PhotonComponentLibraryUsage, h as PhotonComponentReferenceProps, d as PhotonComponentLibrarySettings, l as PhotonInteractionActionDefinition, p as PhotonInteractionExecutionResult, r as PhotonInteractionGuardDefinition, H as PhotonInteractionTriggerSlot, w as PhotonInteractionGuardInstance, v as PhotonInteractionGuardEvaluatorMap, s as PhotonInteractionGuardEvaluationContext, ax as PhotonResolvedInteractionActionCatalog, t as PhotonInteractionGuardEvaluationResult, o as PhotonInteractionActionPresentation, m as PhotonInteractionActionExecutionHandlers, z as PhotonInteractionSettings, ak as PhotonBlockDefinition, ay as PhotonBlockInteractionSlotContext, az as PhotonStudioUrlStatePatch, aA as PhotonStudioSurfaceMode, aB as PhotonStudioUrlState } from './types-DkoIiv0C.js';

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
declare const resolvePhotonInteractionActionCatalog: ({ actions, guards, surfaces, siteSettings, }: {
    actions?: readonly PhotonInteractionActionDefinition[];
    guards?: readonly PhotonInteractionGuardDefinition[];
    surfaces?: readonly PhotonInteractionSurfaceDefinition[];
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
declare const executePhotonInteractionTriggerSlot: ({ slot, catalog, evaluators, context, handlers, }: {
    slot: PhotonInteractionTriggerSlot;
    catalog: PhotonResolvedInteractionActionCatalog;
    evaluators?: PhotonInteractionGuardEvaluatorMap;
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

export { isPhotonComponentReferenceBlock as A, mergePhotonStudioUrlState as B, normalizePhotonStudioSurfaceMode as C, parsePhotonComponentLibraryBlockId as D, parsePhotonStudioUrlState as E, photonInteractionExecutionSucceeded as F, readPhotonComponentLibrarySettings as G, readPhotonInteractionSettings as H, readPhotonInteractionSurfaceSettings as I, remapPhotonComponentLibraryBlock as J, resolvePhotonBlockInteractionSlots as K, resolvePhotonComponentReferenceBlocks as L, resolvePhotonInteractionActionCatalog as M, resolvePhotonInteractionSlotAction as N, resolvePhotonInteractionSlotGuards as O, PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY as P, resolvePhotonInteractionSurfaceCatalog as Q, resolvePhotonInteractionSurfaceRequest as R, resolvePhotonInteractionToastTemplate as S, writePhotonStudioUrlState as T, PHOTON_COMPONENT_REFERENCE_AREA_ID as a, PHOTON_COMPONENT_REFERENCE_MAX_DEPTH as b, PHOTON_COMPONENT_REFERENCE_MODULE as c, PHOTON_COMPONENT_REFERENCE_TYPE as d, PHOTON_INTERACTIONS_SITE_SETTING_KEY as e, PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY as f, PHOTON_SEARCH_OCCURRENCE_PARAM as g, PHOTON_SEARCH_QUERY_PARAM as h, PHOTON_SEARCH_TARGET_PARAM as i, clonePhotonComponentLibraryBlocksForCopy as j, clonePhotonComponentSourceBlockWithNewIds as k, collectPhotonComponentLibraryUsages as l, createPhotonActionValue as m, createPhotonComponentLibraryBlockId as n, createPhotonComponentLibraryItemFromBlock as o, createPhotonComponentReferenceBlock as p, createPhotonInteractionActionDefinition as q, createPhotonInteractionExecutionResult as r, createPhotonInteractionGuardDefinition as s, createPhotonInteractionSurfaceDefinition as t, createPhotonInteractionTriggerSlot as u, duplicatePhotonComponentLibraryItem as v, evaluatePhotonInteractionGuards as w, executePhotonInteractionActionPresentation as x, executePhotonInteractionTriggerSlot as y, getPhotonComponentLibraryItems as z };
