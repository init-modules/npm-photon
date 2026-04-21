import { V as WebsiteBuilderSiteDesignSettings, X as WebsiteBuilderResolvedSiteDesignSettings, Y as WebsiteBuilderSiteComponentVariants, a as WebsiteBuilderBlock, b as WebsiteBuilderDocument, s as WebsiteBuilderWorkspaceCapabilities, Z as WebsiteBuilderWorkspaceRef, t as WebsiteBuilderWorkspaceDescriptor } from './types-CuFDrLWO.js';

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
declare const collectBlockIds: (blocks: WebsiteBuilderBlock[]) => string[];
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

export { normalizeWebsiteBuilderWorkspaceDescriptor as A, normalizeWebsiteBuilderWorkspaceRef as B, removeWebsiteBuilderBlockFromDocument as C, DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES as D, resolveWebsiteBuilderSiteDesignSettings as E, updateWebsiteBuilderBlockInDocument as F, WEBSITE_BUILDER_EMPTY_TEXT as G, getValueAtPath as H, setValueAtPath as I, WEBSITE_BUILDER_ROOT_LIST_ID as W, DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF as a, WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS as b, WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS as c, applyWebsiteBuilderSiteColorScheme as d, applyWebsiteBuilderSiteDesignPreset as e, canEditWebsiteBuilderWorkspace as f, canSaveWebsiteBuilderWorkspace as g, cloneWebsiteBuilderBlockTreeWithNewIds as h, cloneWebsiteBuilderValue as i, collectBlockIds as j, createWebsiteBuilderAreaListId as k, createWebsiteBuilderNodeId as l, createWebsiteBuilderSiteDesignSettings as m, duplicateWebsiteBuilderBlockInDocument as n, findWebsiteBuilderBlock as o, getFirstWebsiteBuilderBlockId as p, getWebsiteBuilderWorkspaceIdentityKey as q, getWebsiteBuilderWorkspaceKey as r, hasWebsiteBuilderSiteDesignPresetCustomization as s, insertWebsiteBuilderBlockInDocument as t, isWebsiteBuilderFramelessPreset as u, isWebsiteBuilderFramelessSiteDesign as v, isWebsiteBuilderSiteDesignPresetApplied as w, isWebsiteBuilderWorkspaceReadonly as x, moveWebsiteBuilderBlockInDocument as y, normalizeWebsiteBuilderWorkspaceCapabilities as z };
