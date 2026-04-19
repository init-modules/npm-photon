import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { b as WebsiteBuilderDocument, m as WebsiteBuilderResources, k as WebsiteBuilderPageSettings, p as WebsiteBuilderSite, A as WebsiteBuilderRegistry, t as WebsiteBuilderWorkspaceDescriptor, s as WebsiteBuilderWorkspaceCapabilities, B as WebsiteBuilderRevisionDescriptor, C as WebsiteBuilderBranchPolicyState, D as WebsiteBuilderMergePreview, E as WebsiteBuilderMode, i as WebsiteBuilderPageCatalogItem, F as WebsiteBuilderMediaUploadHandler, G as WebsiteBuilderSearchHandler, n as WebsiteBuilderSearchHighlight, H as WebsiteBuilderLinkComponent, u as WebsiteBuilderSiteFrameExtension, y as WebsiteBuilderAccountTabExtension, I as WebsiteBuilderI18nValue, J as WebsiteBuilderField, K as WebsiteBuilderPageSettingsPanelDefinition, L as WebsiteBuilderSiteSettingsPanelDefinition } from './types-q9w-WbBC.js';

type InsertTarget = {
    listId: string;
    index: number;
};
type WebsiteBuilderStudioSaveReason = "manual" | "autosave";
type WebsiteBuilderStudioSavePayload = {
    workspace?: WebsiteBuilderWorkspaceDescriptor;
    expectedHeadRevisionId: string | null;
    commitMessage?: string | null;
    saveMode: WebsiteBuilderStudioSaveReason;
    document: WebsiteBuilderDocument;
    resources: WebsiteBuilderResources;
    pageSettings: WebsiteBuilderPageSettings;
    site: WebsiteBuilderSite;
};
type WebsiteBuilderStudioSiteSettingChangeContext = WebsiteBuilderStudioSavePayload & {
    currentPage: WebsiteBuilderPageCatalogItem | null;
};
type WebsiteBuilderStudioProps = {
    initialDocument: WebsiteBuilderDocument;
    initialResources?: WebsiteBuilderResources;
    initialPageSettings?: WebsiteBuilderPageSettings;
    initialSite?: WebsiteBuilderSite;
    registry: WebsiteBuilderRegistry;
    workspace?: WebsiteBuilderWorkspaceDescriptor;
    capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
    history?: WebsiteBuilderRevisionDescriptor[];
    branchPolicy?: WebsiteBuilderBranchPolicyState;
    mergePreview?: WebsiteBuilderMergePreview | null;
    canManage: boolean;
    isDemoAccess?: boolean;
    userEmail?: string | null;
    initialMode?: WebsiteBuilderMode;
    draftStorageKey: string;
    autosaveStorageKey: string;
    currentPage?: WebsiteBuilderPageCatalogItem | null;
    pages?: WebsiteBuilderPageCatalogItem[];
    onRequestAuth?: () => void;
    onLogout?: () => void | Promise<void>;
    onContentLocaleChange?: (locale: string) => void | Promise<void>;
    onInterfaceLocaleChange?: (locale: string) => void | Promise<void>;
    onModeChange?: (mode: WebsiteBuilderMode) => void | Promise<void>;
    onSiteSettingChange?: (path: string, value: unknown, context: WebsiteBuilderStudioSiteSettingChangeContext) => WebsiteBuilderStudioSavePayload | void;
    onSaveDocument?: (payload: WebsiteBuilderStudioSavePayload, context: {
        reason: WebsiteBuilderStudioSaveReason;
        workspace: WebsiteBuilderWorkspaceDescriptor;
        capabilities: WebsiteBuilderWorkspaceCapabilities;
    }) => Promise<WebsiteBuilderStudioSavePayload | undefined>;
    onOpenPage?: (page: WebsiteBuilderPageCatalogItem, context: {
        mode: WebsiteBuilderMode;
    }) => void | Promise<void>;
    onCreatePage?: (input: {
        name: string;
        route: string;
        duplicateCurrent: boolean;
    }, context: {
        mode: WebsiteBuilderMode;
        document: WebsiteBuilderDocument;
        resources: WebsiteBuilderResources;
        pageSettings: WebsiteBuilderPageSettings;
        site: WebsiteBuilderSite;
        currentPage: WebsiteBuilderPageCatalogItem | null;
    }) => void | Promise<void>;
    onUploadMedia?: WebsiteBuilderMediaUploadHandler;
    onSearch?: WebsiteBuilderSearchHandler;
    activeSearchHighlight?: WebsiteBuilderSearchHighlight | null;
    linkComponent?: WebsiteBuilderLinkComponent;
    siteFrameExtensions?: WebsiteBuilderSiteFrameExtension[];
    accountTabs?: WebsiteBuilderAccountTabExtension[];
    i18n?: WebsiteBuilderI18nValue | null;
    hydrateModePreference?: boolean;
    showInterfaceLocaleControl?: boolean;
    workspaceControl?: {
        isOpen: boolean;
        onToggle: () => void;
        shortcutLabel?: string;
    };
    siteSettingsSubtabs?: SiteSettingsSubtabDefinition[];
    title?: string;
    description?: string;
    renderContentNotice?: ReactNode;
};
type InspectorGroups = Record<string, WebsiteBuilderField[]>;
type InspectorDefinitionMeta = {
    label: string;
    labelKey?: string;
    description: string;
    descriptionKey?: string;
    module: string;
    category: string;
    fieldCount: number;
};
type PaletteDefinition = ReturnType<WebsiteBuilderRegistry["getPaletteBlocks"]>[number] & {
    family: string;
    group: string;
    package: string;
};
type PaletteFamilyGroup = {
    family: string;
    packageOptions: string[];
    groups: Array<{
        group: string;
        definitions: PaletteDefinition[];
    }>;
};
type PageSettingsPanelDefinition = WebsiteBuilderPageSettingsPanelDefinition;
type SiteSettingsPanelDefinition = WebsiteBuilderSiteSettingsPanelDefinition;
type SiteSettingsSubtabDefinition = {
    key: string;
    label: string;
    description?: string;
    component: () => ReactNode;
};

declare const WebsiteBuilderStudio: ({ initialDocument, initialResources, initialPageSettings, initialSite, registry, workspace, capabilities, history, branchPolicy, mergePreview, canManage, initialMode, draftStorageKey, autosaveStorageKey, currentPage, pages, onRequestAuth, onLogout, onContentLocaleChange, onInterfaceLocaleChange, onModeChange, onSiteSettingChange, onSaveDocument, onOpenPage, onCreatePage, onUploadMedia, onSearch, activeSearchHighlight, linkComponent, siteFrameExtensions, accountTabs, i18n, hydrateModePreference, showInterfaceLocaleControl, workspaceControl, title, description, renderContentNotice, siteSettingsSubtabs, }: WebsiteBuilderStudioProps) => react_jsx_runtime.JSX.Element;

export { type InsertTarget as I, type PageSettingsPanelDefinition as P, type SiteSettingsPanelDefinition as S, WebsiteBuilderStudio as W, type InspectorDefinitionMeta as a, type InspectorGroups as b, type PaletteDefinition as c, type PaletteFamilyGroup as d, type SiteSettingsSubtabDefinition as e, type WebsiteBuilderStudioProps as f, type WebsiteBuilderStudioSavePayload as g, type WebsiteBuilderStudioSaveReason as h, type WebsiteBuilderStudioSiteSettingChangeContext as i };
