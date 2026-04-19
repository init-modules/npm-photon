export { c as collectWebsiteBuilderFooterExtensionItems, a as collectWebsiteBuilderHeaderExtensionItems, b as createWebsiteBuilderAccountTabExtension, d as createWebsiteBuilderSiteFrameExtension, r as resolveWebsiteBuilderAccountTabs, e as resolveWebsiteBuilderSiteFrameExtensions } from './site-frame-extensions-zYe8rj84.js';
import './types-q9w-WbBC.js';
import 'react';

type WebsiteBuilderAccessAuthStateLike = {
    user?: {
        permissions?: string[] | null;
        role?: string | null;
    } | null;
} | null;
declare const resolveWebsiteBuilderAccess: (authState: WebsiteBuilderAccessAuthStateLike, options?: {
    demoAccessAllowed?: boolean;
}) => {
    canManage: boolean;
    isDemoAccess: boolean;
};

type WebsiteBuilderModeLike = "preview" | "content" | "builder";
type WebsiteBuilderWorkspaceSelectionLike = Partial<{
    profileId: string;
    branch: string;
    revisionId: null | string;
}> | null | undefined;
declare const resolveWebsiteBuilderMode: (mode: string | string[] | null | undefined, canManage: boolean, fallback?: WebsiteBuilderModeLike) => WebsiteBuilderModeLike;
declare const normalizeWebsiteBuilderSelectionForMode: (selection: WebsiteBuilderWorkspaceSelectionLike, mode: WebsiteBuilderModeLike) => WebsiteBuilderWorkspaceSelectionLike;

declare const resolveWebsiteBuilderRequestHeaders: (options?: {
    locale?: string;
}) => {
    "X-Locale": string;
    "Accept-Language": string;
} | undefined;
declare const resolveWebsiteBuilderWorkspaceParams: (workspace?: WebsiteBuilderWorkspaceSelectionLike) => {
    workspace: {
        revisionId?: string | undefined;
        profileId: string;
        branch: string;
    };
} | {
    workspace?: undefined;
};

export { type WebsiteBuilderAccessAuthStateLike, type WebsiteBuilderModeLike, type WebsiteBuilderWorkspaceSelectionLike, normalizeWebsiteBuilderSelectionForMode, resolveWebsiteBuilderAccess, resolveWebsiteBuilderMode, resolveWebsiteBuilderRequestHeaders, resolveWebsiteBuilderWorkspaceParams };
