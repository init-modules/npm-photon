import { b as WebsiteBuilderDocument, m as WebsiteBuilderResources, k as WebsiteBuilderPageSettings, p as WebsiteBuilderSite, A as WebsiteBuilderRegistry, t as WebsiteBuilderWorkspaceDescriptor, s as WebsiteBuilderWorkspaceCapabilities, E as WebsiteBuilderMode, F as WebsiteBuilderMediaUploadHandler, G as WebsiteBuilderSearchHandler, H as WebsiteBuilderLinkComponent, u as WebsiteBuilderSiteFrameExtension, y as WebsiteBuilderAccountTabExtension, _ as WebsiteBuilderSelectedField, d as WebsiteBuilderFieldBinding, $ as WebsiteBuilderLinkComponentProps, I as WebsiteBuilderI18nValue } from './types-CuFDrLWO.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode } from 'react';
import { StoreApi } from 'zustand/vanilla';

type InsertBlockInput = {
    module: string;
    type: string;
    listId?: string;
    index?: number;
};
type WebsiteBuilderStoreState = {
    document: WebsiteBuilderDocument;
    resources: WebsiteBuilderResources;
    pageSettings: WebsiteBuilderPageSettings;
    site: WebsiteBuilderSite;
    workspace: WebsiteBuilderWorkspaceDescriptor;
    capabilities: WebsiteBuilderWorkspaceCapabilities;
    initialDocument: WebsiteBuilderDocument;
    initialResources: WebsiteBuilderResources;
    initialPageSettings: WebsiteBuilderPageSettings;
    initialSite: WebsiteBuilderSite;
    initialWorkspace: WebsiteBuilderWorkspaceDescriptor;
    initialCapabilities: WebsiteBuilderWorkspaceCapabilities;
    registry: WebsiteBuilderRegistry;
    mode: WebsiteBuilderMode;
    isAdmin: boolean;
    selectedBlockId: string | null;
    selectedField: WebsiteBuilderSelectedField;
    uploadMedia?: WebsiteBuilderMediaUploadHandler;
    searchSite?: WebsiteBuilderSearchHandler;
    requestAuth?: () => void;
    linkComponent: WebsiteBuilderLinkComponent;
    siteFrameExtensions: WebsiteBuilderSiteFrameExtension[];
    accountTabs: WebsiteBuilderAccountTabExtension[];
    contentLocale: string;
    defaultLocale: string;
    contentRevision: number;
    collapsedBlockIds: Record<string, true>;
    setMode: (nextMode: WebsiteBuilderMode) => void;
    selectBlock: (blockId: string | null) => void;
    selectField: (blockId: string, path: string) => void;
    clearSelectedField: () => void;
    selectPageSettingField: (path: string) => void;
    selectSiteSettingField: (path: string) => void;
    updateFieldValue: (blockId: string, path: string, value: unknown) => void;
    getFieldValue: (blockId: string, path: string) => unknown;
    updatePageSettingValue: (path: string, value: unknown) => void;
    getPageSettingValue: (path: string) => unknown;
    updateSiteSettingValue: (path: string, value: unknown) => void;
    getSiteSettingValue: (path: string) => unknown;
    getFieldBinding: (blockId: string, path: string) => WebsiteBuilderFieldBinding | null;
    insertBlock: (input: InsertBlockInput) => void;
    duplicateBlock: (blockId: string) => void;
    removeBlock: (blockId: string) => void;
    moveBlock: (activeBlockId: string, targetListId: string, targetIndex: number) => void;
    replaceState: (nextDocument: WebsiteBuilderDocument, nextResources?: WebsiteBuilderResources, nextPageSettings?: WebsiteBuilderPageSettings, nextSite?: WebsiteBuilderSite, options?: {
        workspace?: WebsiteBuilderWorkspaceDescriptor;
        capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
    }) => void;
    syncExternalState: (input: {
        initialDocument: WebsiteBuilderDocument;
        initialResources?: WebsiteBuilderResources;
        initialPageSettings?: WebsiteBuilderPageSettings;
        initialSite?: WebsiteBuilderSite;
        workspace?: WebsiteBuilderWorkspaceDescriptor;
        capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
    }) => void;
    resetDocument: () => void;
    toggleBlockCollapse: (blockId: string) => void;
    collapseAllBlocks: () => void;
    expandAllBlocks: () => void;
};
type WebsiteBuilderStore = StoreApi<WebsiteBuilderStoreState>;
type WebsiteBuilderStoreInit = {
    initialDocument: WebsiteBuilderDocument;
    initialResources?: WebsiteBuilderResources;
    initialPageSettings?: WebsiteBuilderPageSettings;
    initialSite?: WebsiteBuilderSite;
    registry: WebsiteBuilderRegistry;
    workspace?: WebsiteBuilderWorkspaceDescriptor;
    capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
    initialMode?: WebsiteBuilderMode;
    isAdmin?: boolean;
    uploadMedia?: WebsiteBuilderMediaUploadHandler;
    searchSite?: WebsiteBuilderSearchHandler;
    requestAuth?: () => void;
    linkComponent: WebsiteBuilderLinkComponent;
    siteFrameExtensions?: WebsiteBuilderSiteFrameExtension[];
    accountTabs?: WebsiteBuilderAccountTabExtension[];
    i18n?: {
        contentLocale?: string;
        defaultLocale?: string;
    };
};

type WebsiteBuilderProviderProps = {
    children: ReactNode;
    initialDocument: WebsiteBuilderStoreInit["initialDocument"];
    initialResources?: WebsiteBuilderResources;
    initialPageSettings?: WebsiteBuilderPageSettings;
    initialSite?: WebsiteBuilderSite;
    registry: WebsiteBuilderRegistry;
    workspace?: WebsiteBuilderWorkspaceDescriptor;
    capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
    initialMode?: WebsiteBuilderMode;
    isAdmin?: boolean;
    i18n?: WebsiteBuilderI18nValue | null;
    uploadMedia?: WebsiteBuilderMediaUploadHandler;
    searchSite?: WebsiteBuilderSearchHandler;
    requestAuth?: () => void;
    linkComponent?: WebsiteBuilderLinkComponent;
    siteFrameExtensions?: WebsiteBuilderSiteFrameExtension[];
    accountTabs?: WebsiteBuilderAccountTabExtension[];
};
declare const WebsiteBuilderProvider: ({ children, initialDocument, initialResources, initialPageSettings, initialSite, registry, workspace, capabilities, initialMode, isAdmin, i18n, uploadMedia, searchSite, requestAuth, linkComponent, siteFrameExtensions, accountTabs, }: WebsiteBuilderProviderProps) => react_jsx_runtime.JSX.Element;
declare const useWebsiteBuilderStoreApi: () => WebsiteBuilderStore;
declare const useWebsiteBuilderStore: <T>(selector: (state: WebsiteBuilderStoreState) => T) => T;
declare const useWebsiteBuilder: () => WebsiteBuilderStoreState;
declare const useWebsiteBuilderFieldValue: (blockId: string, path: string) => unknown;
declare const useWebsiteBuilderCanEdit: () => boolean;
declare const useWebsiteBuilderPersistedState: () => {
    document: WebsiteBuilderDocument;
    resources: WebsiteBuilderResources;
    pageSettings: WebsiteBuilderPageSettings;
    site: WebsiteBuilderSite;
};
type WebsiteBuilderLinkProps = WebsiteBuilderLinkComponentProps & {
    navigateInPreviewOnly?: boolean;
};
declare const WebsiteBuilderLink: ({ navigateInPreviewOnly, onClick, ...props }: WebsiteBuilderLinkProps) => react_jsx_runtime.JSX.Element;

declare const WebsiteBuilderRenderDepthProvider: react.Provider<number>;
declare const useWebsiteBuilderRenderDepth: () => number;

declare const WebsiteBuilderI18nProvider: ({ children, value, }: {
    children: ReactNode;
    value?: Partial<WebsiteBuilderI18nValue> | null;
}) => react_jsx_runtime.JSX.Element;
declare const useWebsiteBuilderI18n: () => WebsiteBuilderI18nValue;
declare const resolveWebsiteBuilderText: (value: string, translate: WebsiteBuilderI18nValue["translate"], fallback?: string) => string;

type WebsiteBuilderSiteSearchProps = {
    blockId: string;
    placeholderPath: string;
    className?: string;
};
declare const WebsiteBuilderSiteSearch: ({ blockId, placeholderPath, className, }: WebsiteBuilderSiteSearchProps) => react_jsx_runtime.JSX.Element;

export { WebsiteBuilderLink as W, WebsiteBuilderSiteSearch as a, useWebsiteBuilderCanEdit as b, useWebsiteBuilderI18n as c, useWebsiteBuilderRenderDepth as d, useWebsiteBuilderStore as e, useWebsiteBuilderFieldValue as f, WebsiteBuilderI18nProvider as g, WebsiteBuilderProvider as h, WebsiteBuilderRenderDepthProvider as i, useWebsiteBuilderPersistedState as j, useWebsiteBuilderStoreApi as k, resolveWebsiteBuilderText as r, useWebsiteBuilder as u };
