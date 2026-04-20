import { M as WebsiteBuilderSiteDesignSettings, N as WebsiteBuilderResolvedSiteDesignSettings, O as WebsiteBuilderSiteComponentVariants, a as WebsiteBuilderBlock, b as WebsiteBuilderDocument, s as WebsiteBuilderWorkspaceCapabilities, P as WebsiteBuilderWorkspaceRef, t as WebsiteBuilderWorkspaceDescriptor } from './types-B_tR-sKT.js';

declare const WEBSITE_BUILDER_EMPTY_TEXT = "Untitled";
declare const cloneWebsiteBuilderValue: <T>(value: T) => T;
declare const getValueAtPath: (target: Record<string, unknown> | unknown[] | null | undefined, path: string) => unknown;
declare const setValueAtPath: <T extends Record<string, unknown>>(target: T, path: string, value: unknown) => T;

declare const WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS: WebsiteBuilderSiteDesignSettings;
declare const WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS: WebsiteBuilderSiteDesignSettings;
declare const createWebsiteBuilderSiteDesignSettings: ({ presetId, colorSchemeId, componentVariants, overrides, }?: {
    presetId?: string;
    colorSchemeId?: string;
    componentVariants?: WebsiteBuilderSiteComponentVariants;
    overrides?: Partial<WebsiteBuilderSiteDesignSettings>;
}) => WebsiteBuilderResolvedSiteDesignSettings;
declare const isWebsiteBuilderFramelessPreset: (presetId?: string | null) => boolean;
declare const isWebsiteBuilderFramelessSiteDesign: (value: unknown) => boolean;
declare const applyWebsiteBuilderSiteDesignPreset: (value: unknown, presetId: string) => WebsiteBuilderResolvedSiteDesignSettings;
declare const isWebsiteBuilderSiteDesignPresetApplied: (settings: WebsiteBuilderResolvedSiteDesignSettings, presetId: string) => boolean;
declare const hasWebsiteBuilderSiteDesignPresetCustomization: (settings: WebsiteBuilderResolvedSiteDesignSettings, presetId: string) => boolean;
declare const applyWebsiteBuilderSiteColorScheme: (value: unknown, colorSchemeId: string) => WebsiteBuilderResolvedSiteDesignSettings;
declare const resolveWebsiteBuilderSiteDesignSettings: (value: unknown) => WebsiteBuilderResolvedSiteDesignSettings;

declare const WEBSITE_BUILDER_ROOT_LIST_ID = "root";
declare const createWebsiteBuilderAreaListId: (blockId: string, areaId: string) => string;
declare const createWebsiteBuilderNodeId: () => string;
declare const cloneWebsiteBuilderBlockTreeWithNewIds: <Props extends Record<string, unknown> = Record<string, unknown>>(block: WebsiteBuilderBlock<Props>) => WebsiteBuilderBlock<Props>;
declare const getFirstWebsiteBuilderBlockId: (blocks: WebsiteBuilderBlock[]) => string | null;
declare const findWebsiteBuilderBlock: (blocks: WebsiteBuilderBlock[], blockId: string) => WebsiteBuilderBlock | null;
declare const updateWebsiteBuilderBlockInDocument: (document: WebsiteBuilderDocument, blockId: string, updater: (block: WebsiteBuilderBlock) => WebsiteBuilderBlock) => WebsiteBuilderDocument;
type RemoveResult = {
    blocks: WebsiteBuilderBlock[];
    removed: WebsiteBuilderBlock | null;
    sourceListId: string | null;
    sourceIndex: number;
};
declare const insertWebsiteBuilderBlockInDocument: (document: WebsiteBuilderDocument, listId: string, block: WebsiteBuilderBlock, index: number) => WebsiteBuilderDocument;
declare const removeWebsiteBuilderBlockFromDocument: (document: WebsiteBuilderDocument, blockId: string) => RemoveResult;
declare const duplicateWebsiteBuilderBlockInDocument: (document: WebsiteBuilderDocument, blockId: string) => {
    document: WebsiteBuilderDocument;
    duplicatedBlockId: null;
} | {
    document: WebsiteBuilderDocument;
    duplicatedBlockId: string;
};
declare const moveWebsiteBuilderBlockInDocument: (document: WebsiteBuilderDocument, blockId: string, targetListId: string, targetIndex: number) => WebsiteBuilderDocument;

declare const DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF: WebsiteBuilderWorkspaceRef;
declare const DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES: WebsiteBuilderWorkspaceCapabilities;
declare const normalizeWebsiteBuilderWorkspaceRef: (workspace?: WebsiteBuilderWorkspaceRef | null) => WebsiteBuilderWorkspaceRef;
declare const normalizeWebsiteBuilderWorkspaceCapabilities: (capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities> | null) => WebsiteBuilderWorkspaceCapabilities;
declare const normalizeWebsiteBuilderWorkspaceDescriptor: (workspace?: WebsiteBuilderWorkspaceDescriptor | null) => WebsiteBuilderWorkspaceDescriptor;
declare const getWebsiteBuilderWorkspaceKey: (workspace?: WebsiteBuilderWorkspaceDescriptor | WebsiteBuilderWorkspaceRef | null) => string;
declare const getWebsiteBuilderWorkspaceIdentityKey: (workspace?: WebsiteBuilderWorkspaceDescriptor | WebsiteBuilderWorkspaceRef | null) => string;
declare const isWebsiteBuilderWorkspaceReadonly: (workspace?: WebsiteBuilderWorkspaceDescriptor | WebsiteBuilderWorkspaceRef | null, capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities> | null) => boolean;
declare const canEditWebsiteBuilderWorkspace: (workspace?: WebsiteBuilderWorkspaceDescriptor | WebsiteBuilderWorkspaceRef | null, capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities> | null) => boolean;
declare const canSaveWebsiteBuilderWorkspace: ({ isAdmin, workspace, capabilities, }: {
    isAdmin: boolean;
    workspace?: WebsiteBuilderWorkspaceDescriptor | WebsiteBuilderWorkspaceRef | null;
    capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities> | null;
}) => boolean;

declare const WEBSITE_BUILDER_SEARCH_QUERY_PARAM = "wb-search-query";
declare const WEBSITE_BUILDER_SEARCH_TARGET_PARAM = "wb-search-target";
declare const WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM = "wb-search-occurrence";

export { moveWebsiteBuilderBlockInDocument as A, normalizeWebsiteBuilderWorkspaceCapabilities as B, normalizeWebsiteBuilderWorkspaceDescriptor as C, DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES as D, normalizeWebsiteBuilderWorkspaceRef as E, removeWebsiteBuilderBlockFromDocument as F, resolveWebsiteBuilderSiteDesignSettings as G, updateWebsiteBuilderBlockInDocument as H, WEBSITE_BUILDER_EMPTY_TEXT as I, getValueAtPath as J, setValueAtPath as K, WEBSITE_BUILDER_ROOT_LIST_ID as W, DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF as a, WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM as b, WEBSITE_BUILDER_SEARCH_QUERY_PARAM as c, WEBSITE_BUILDER_SEARCH_TARGET_PARAM as d, WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS as e, WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS as f, applyWebsiteBuilderSiteColorScheme as g, applyWebsiteBuilderSiteDesignPreset as h, canEditWebsiteBuilderWorkspace as i, canSaveWebsiteBuilderWorkspace as j, cloneWebsiteBuilderBlockTreeWithNewIds as k, cloneWebsiteBuilderValue as l, createWebsiteBuilderAreaListId as m, createWebsiteBuilderNodeId as n, createWebsiteBuilderSiteDesignSettings as o, duplicateWebsiteBuilderBlockInDocument as p, findWebsiteBuilderBlock as q, getFirstWebsiteBuilderBlockId as r, getWebsiteBuilderWorkspaceIdentityKey as s, getWebsiteBuilderWorkspaceKey as t, hasWebsiteBuilderSiteDesignPresetCustomization as u, insertWebsiteBuilderBlockInDocument as v, isWebsiteBuilderFramelessPreset as w, isWebsiteBuilderFramelessSiteDesign as x, isWebsiteBuilderSiteDesignPresetApplied as y, isWebsiteBuilderWorkspaceReadonly as z };
