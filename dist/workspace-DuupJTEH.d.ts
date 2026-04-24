import { X as PhotonSiteDesignSettings, Y as PhotonResolvedSiteDesignSettings, Z as PhotonSiteComponentVariants, a as PhotonBlock, b as PhotonDocument, s as PhotonWorkspaceCapabilities, _ as PhotonWorkspaceRef, t as PhotonWorkspaceDescriptor } from './types-D3ghbc-a.js';

declare const PHOTON_EMPTY_TEXT = "Untitled";
declare const clonePhotonValue: <T>(value: T) => T;
declare const getValueAtPath: (target: Record<string, unknown> | unknown[] | null | undefined, path: string) => unknown;
declare const setValueAtPath: <T extends Record<string, unknown>>(target: T, path: string, value: unknown) => T;

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

export { normalizePhotonWorkspaceDescriptor as A, normalizePhotonWorkspaceRef as B, removePhotonBlockFromDocument as C, DEFAULT_PHOTON_WORKSPACE_CAPABILITIES as D, resolvePhotonSiteDesignSettings as E, updatePhotonBlockInDocument as F, PHOTON_EMPTY_TEXT as G, getValueAtPath as H, setValueAtPath as I, PHOTON_ROOT_LIST_ID as P, DEFAULT_PHOTON_WORKSPACE_REF as a, PHOTON_SITE_DESIGN_DEFAULTS as b, PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS as c, applyPhotonSiteColorScheme as d, applyPhotonSiteDesignPreset as e, canEditPhotonWorkspace as f, canSavePhotonWorkspace as g, clonePhotonBlockTreeWithNewIds as h, clonePhotonValue as i, collectBlockIds as j, createPhotonAreaListId as k, createPhotonNodeId as l, createPhotonSiteDesignSettings as m, duplicatePhotonBlockInDocument as n, findPhotonBlock as o, getFirstPhotonBlockId as p, getPhotonWorkspaceIdentityKey as q, getPhotonWorkspaceKey as r, hasPhotonSiteDesignPresetCustomization as s, insertPhotonBlockInDocument as t, isPhotonFramelessPreset as u, isPhotonFramelessSiteDesign as v, isPhotonSiteDesignPresetApplied as w, isPhotonWorkspaceReadonly as x, movePhotonBlockInDocument as y, normalizePhotonWorkspaceCapabilities as z };
