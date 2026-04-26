export { c as collectPhotonFooterExtensionItems, a as collectPhotonHeaderExtensionItems, b as createPhotonAccountTabExtension, d as createPhotonSiteFrameExtension, r as resolvePhotonAccountTabs, e as resolvePhotonSiteFrameExtensions } from './site-frame-extensions-DGiCZlam.js';
import './types-BQcsKmzz.js';
import 'react';

type PhotonAccessAuthStateLike = {
    user?: {
        permissions?: string[] | null;
        role?: string | null;
    } | null;
} | null;
declare const resolvePhotonAccess: (authState: PhotonAccessAuthStateLike, options?: {
    demoAccessAllowed?: boolean;
}) => {
    canManage: boolean;
    isDemoAccess: boolean;
};

type PhotonModeLike = "preview" | "content" | "builder";
type PhotonWorkspaceSelectionLike = Partial<{
    profileId: string;
    branch: string;
    revisionId: null | string;
}> | null | undefined;
declare const resolvePhotonMode: (mode: string | string[] | null | undefined, canManage: boolean, fallback?: PhotonModeLike) => PhotonModeLike;
declare const normalizePhotonSelectionForMode: (selection: PhotonWorkspaceSelectionLike, mode: PhotonModeLike) => PhotonWorkspaceSelectionLike;

declare const resolvePhotonRequestHeaders: (options?: {
    locale?: string;
}) => {
    "X-Locale": string;
    "Accept-Language": string;
} | undefined;
declare const resolvePhotonWorkspaceParams: (workspace?: PhotonWorkspaceSelectionLike) => {
    workspace: {
        revisionId?: string | undefined;
        profileId: string;
        branch: string;
    };
} | {
    workspace?: undefined;
};

export { type PhotonAccessAuthStateLike, type PhotonModeLike, type PhotonWorkspaceSelectionLike, normalizePhotonSelectionForMode, resolvePhotonAccess, resolvePhotonMode, resolvePhotonRequestHeaders, resolvePhotonWorkspaceParams };
