import { b0 as PhotonSiteDesignSettings, b1 as PhotonResolvedSiteDesignSettings, b2 as PhotonSiteComponentVariants, i as PhotonBlock, w as PhotonDocument, ae as PhotonWorkspaceCapabilities, b3 as PhotonWorkspaceRef, af as PhotonWorkspaceDescriptor } from './types-C1q0pf4n.js';

declare const PHOTON_EMPTY_TEXT = "Untitled";
declare const clonePhotonValue: <T>(value: T) => T;
declare const getValueAtPath: (target: Record<string, unknown> | unknown[] | null | undefined, path: string) => unknown;
declare const setValueAtPath: <T extends Record<string, unknown>>(target: T, path: string, value: unknown) => T;
declare const isRecord: (value: unknown) => value is Record<string, unknown>;

declare const PHOTON_SITE_DESIGN_DEFAULTS: PhotonSiteDesignSettings;
declare const PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS: PhotonSiteDesignSettings;
declare const createPhotonSiteDesignSettings: ({ presetId, colorSchemeId, componentVariants, overrides, }?: {
    presetId?: string;
    colorSchemeId?: string;
    componentVariants?: PhotonSiteComponentVariants;
    overrides?: Partial<PhotonSiteDesignSettings>;
}) => PhotonResolvedSiteDesignSettings;
declare const isPhotonFramelessPreset: (presetId?: string | null) => boolean;
declare const isPhotonFramelessSiteDesign: (value: unknown) => boolean;
declare const applyPhotonSiteDesignPreset: (value: unknown, presetId: string) => PhotonResolvedSiteDesignSettings;
declare const isPhotonSiteDesignPresetApplied: (settings: PhotonResolvedSiteDesignSettings, presetId: string) => boolean;
declare const hasPhotonSiteDesignPresetCustomization: (settings: PhotonResolvedSiteDesignSettings, presetId: string) => boolean;
declare const applyPhotonSiteColorScheme: (value: unknown, colorSchemeId: string) => PhotonResolvedSiteDesignSettings;
declare const resolvePhotonSiteDesignSettings: (value: unknown) => PhotonResolvedSiteDesignSettings;

declare const PHOTON_ROOT_LIST_ID = "root";
declare const createPhotonAreaListId: (blockId: string, areaId: string) => string;

declare const createPhotonNodeId: () => string;

declare const clonePhotonBlockTreeWithNewIds: <Props extends Record<string, unknown> = Record<string, unknown>>(block: PhotonBlock<Props>) => PhotonBlock<Props>;
declare const getFirstPhotonBlockId: (blocks: PhotonBlock[]) => string | null;
declare const findPhotonBlock: (blocks: PhotonBlock[], blockId: string) => PhotonBlock | null;
declare const collectBlockIds: (blocks: PhotonBlock[]) => string[];
declare const updatePhotonBlockInDocument: (document: PhotonDocument, blockId: string, updater: (block: PhotonBlock) => PhotonBlock) => PhotonDocument;
type RemoveResult = {
    blocks: PhotonBlock[];
    removed: PhotonBlock | null;
    sourceListId: string | null;
    sourceIndex: number;
};
declare const insertPhotonBlockInDocument: (document: PhotonDocument, listId: string, block: PhotonBlock, index: number) => PhotonDocument;
declare const insertPhotonBlocksInDocument: (document: PhotonDocument, listId: string, blocks: PhotonBlock[], index: number) => PhotonDocument;
declare const replacePhotonBlockWithBlocksInDocument: (document: PhotonDocument, blockId: string, replacementBlocks: PhotonBlock[]) => PhotonDocument;
declare const removePhotonBlockFromDocument: (document: PhotonDocument, blockId: string) => RemoveResult;
declare const duplicatePhotonBlockInDocument: (document: PhotonDocument, blockId: string) => {
    document: PhotonDocument;
    duplicatedBlockId: null;
} | {
    document: PhotonDocument;
    duplicatedBlockId: string;
};
declare const movePhotonBlockInDocument: (document: PhotonDocument, blockId: string, targetListId: string, targetIndex: number) => PhotonDocument;

declare const DEFAULT_PHOTON_WORKSPACE_REF: PhotonWorkspaceRef;
declare const DEFAULT_PHOTON_WORKSPACE_CAPABILITIES: PhotonWorkspaceCapabilities;
declare const normalizePhotonWorkspaceRef: (workspace?: PhotonWorkspaceRef | null) => PhotonWorkspaceRef;
declare const normalizePhotonWorkspaceCapabilities: (capabilities?: Partial<PhotonWorkspaceCapabilities> | null) => PhotonWorkspaceCapabilities;
declare const normalizePhotonWorkspaceDescriptor: (workspace?: PhotonWorkspaceDescriptor | null) => PhotonWorkspaceDescriptor;
declare const getPhotonWorkspaceKey: (workspace?: PhotonWorkspaceDescriptor | PhotonWorkspaceRef | null) => string;
declare const getPhotonWorkspaceIdentityKey: (workspace?: PhotonWorkspaceDescriptor | PhotonWorkspaceRef | null) => string;
declare const isPhotonWorkspaceReadonly: (workspace?: PhotonWorkspaceDescriptor | PhotonWorkspaceRef | null, capabilities?: Partial<PhotonWorkspaceCapabilities> | null) => boolean;
declare const canEditPhotonWorkspace: (workspace?: PhotonWorkspaceDescriptor | PhotonWorkspaceRef | null, capabilities?: Partial<PhotonWorkspaceCapabilities> | null) => boolean;
declare const canSavePhotonWorkspace: ({ isAdmin, workspace, capabilities, }: {
    isAdmin: boolean;
    workspace?: PhotonWorkspaceDescriptor | PhotonWorkspaceRef | null;
    capabilities?: Partial<PhotonWorkspaceCapabilities> | null;
}) => boolean;

export { normalizePhotonWorkspaceCapabilities as A, normalizePhotonWorkspaceDescriptor as B, normalizePhotonWorkspaceRef as C, DEFAULT_PHOTON_WORKSPACE_CAPABILITIES as D, removePhotonBlockFromDocument as E, replacePhotonBlockWithBlocksInDocument as F, resolvePhotonSiteDesignSettings as G, updatePhotonBlockInDocument as H, PHOTON_EMPTY_TEXT as I, getValueAtPath as J, isRecord as K, setValueAtPath as L, PHOTON_ROOT_LIST_ID as P, DEFAULT_PHOTON_WORKSPACE_REF as a, PHOTON_SITE_DESIGN_DEFAULTS as b, PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS as c, applyPhotonSiteColorScheme as d, applyPhotonSiteDesignPreset as e, canEditPhotonWorkspace as f, canSavePhotonWorkspace as g, clonePhotonBlockTreeWithNewIds as h, clonePhotonValue as i, collectBlockIds as j, createPhotonAreaListId as k, createPhotonNodeId as l, createPhotonSiteDesignSettings as m, duplicatePhotonBlockInDocument as n, findPhotonBlock as o, getFirstPhotonBlockId as p, getPhotonWorkspaceIdentityKey as q, getPhotonWorkspaceKey as r, hasPhotonSiteDesignPresetCustomization as s, insertPhotonBlockInDocument as t, insertPhotonBlocksInDocument as u, isPhotonFramelessPreset as v, isPhotonFramelessSiteDesign as w, isPhotonSiteDesignPresetApplied as x, isPhotonWorkspaceReadonly as y, movePhotonBlockInDocument as z };
