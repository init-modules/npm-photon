import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { b as PhotonDocument, m as PhotonResources, k as PhotonPageSettings, p as PhotonSite, A as PhotonRegistry, t as PhotonWorkspaceDescriptor, s as PhotonWorkspaceCapabilities, B as PhotonRevisionDescriptor, C as PhotonBranchPolicyState, D as PhotonMergePreview, E as PhotonMode, i as PhotonPageCatalogItem, F as PhotonMediaUploadHandler, G as PhotonSearchHandler, n as PhotonSearchHighlight, H as PhotonLinkComponent, u as PhotonSiteFrameExtension, y as PhotonAccountTabExtension, I as PhotonI18nValue, J as PhotonField, K as PhotonPageSettingsPanelDefinition, L as PhotonSiteSettingsPanelDefinition } from './types-S6aNsw9R.js';

type InsertTarget = {
    listId: string;
    index: number;
};
type PhotonStudioSaveReason = "manual" | "autosave";
type PhotonStudioSavePayload = {
    workspace?: PhotonWorkspaceDescriptor;
    expectedHeadRevisionId: string | null;
    commitMessage?: string | null;
    saveMode: PhotonStudioSaveReason;
    document: PhotonDocument;
    resources: PhotonResources;
    pageSettings: PhotonPageSettings;
    site: PhotonSite;
};
type PhotonStudioSiteSettingChangeContext = PhotonStudioSavePayload & {
    currentPage: PhotonPageCatalogItem | null;
};
type PhotonStudioProps = {
    initialDocument: PhotonDocument;
    initialResources?: PhotonResources;
    initialPageSettings?: PhotonPageSettings;
    initialSite?: PhotonSite;
    registry: PhotonRegistry;
    workspace?: PhotonWorkspaceDescriptor;
    capabilities?: Partial<PhotonWorkspaceCapabilities>;
    history?: PhotonRevisionDescriptor[];
    branchPolicy?: PhotonBranchPolicyState;
    mergePreview?: PhotonMergePreview | null;
    canManage: boolean;
    isDemoAccess?: boolean;
    userEmail?: string | null;
    initialMode?: PhotonMode;
    draftStorageKey: string;
    autosaveStorageKey: string;
    currentPage?: PhotonPageCatalogItem | null;
    pages?: PhotonPageCatalogItem[];
    onRequestAuth?: () => void;
    onLogout?: () => void | Promise<void>;
    onContentLocaleChange?: (locale: string) => void | Promise<void>;
    onInterfaceLocaleChange?: (locale: string) => void | Promise<void>;
    onModeChange?: (mode: PhotonMode) => void | Promise<void>;
    onSiteSettingChange?: (path: string, value: unknown, context: PhotonStudioSiteSettingChangeContext) => PhotonStudioSavePayload | void;
    onSaveDocument?: (payload: PhotonStudioSavePayload, context: {
        reason: PhotonStudioSaveReason;
        workspace: PhotonWorkspaceDescriptor;
        capabilities: PhotonWorkspaceCapabilities;
    }) => Promise<PhotonStudioSavePayload | undefined>;
    onOpenPage?: (page: PhotonPageCatalogItem, context: {
        mode: PhotonMode;
    }) => void | Promise<void>;
    onCreatePage?: (input: {
        name: string;
        route: string;
        duplicateCurrent: boolean;
    }, context: {
        mode: PhotonMode;
        document: PhotonDocument;
        resources: PhotonResources;
        pageSettings: PhotonPageSettings;
        site: PhotonSite;
        currentPage: PhotonPageCatalogItem | null;
    }) => void | Promise<void>;
    onUploadMedia?: PhotonMediaUploadHandler;
    onSearch?: PhotonSearchHandler;
    activeSearchHighlight?: PhotonSearchHighlight | null;
    linkComponent?: PhotonLinkComponent;
    siteFrameExtensions?: PhotonSiteFrameExtension[];
    accountTabs?: PhotonAccountTabExtension[];
    i18n?: PhotonI18nValue | null;
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
type InspectorGroups = Record<string, PhotonField[]>;
type InspectorDefinitionMeta = {
    label: string;
    labelKey?: string;
    description: string;
    descriptionKey?: string;
    module: string;
    category: string;
    fieldCount: number;
};
type PaletteDefinition = ReturnType<PhotonRegistry["getPaletteBlocks"]>[number] & {
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
type PageSettingsPanelDefinition = PhotonPageSettingsPanelDefinition;
type SiteSettingsPanelDefinition = PhotonSiteSettingsPanelDefinition;
type SiteSettingsSubtabDefinition = {
    key: string;
    label: string;
    description?: string;
    component: () => ReactNode;
};

declare const PhotonStudio: ({ initialDocument, initialResources, initialPageSettings, initialSite, registry, workspace, capabilities, history, branchPolicy, mergePreview, canManage, initialMode, draftStorageKey, autosaveStorageKey, currentPage, pages, onRequestAuth, onLogout, onContentLocaleChange, onInterfaceLocaleChange, onModeChange, onSiteSettingChange, onSaveDocument, onOpenPage, onCreatePage, onUploadMedia, onSearch, activeSearchHighlight, linkComponent, siteFrameExtensions, accountTabs, i18n, hydrateModePreference, showInterfaceLocaleControl, workspaceControl, title, description, renderContentNotice, siteSettingsSubtabs, }: PhotonStudioProps) => react_jsx_runtime.JSX.Element;

export { type InsertTarget as I, PhotonStudio as P, type SiteSettingsPanelDefinition as S, type InspectorDefinitionMeta as a, type InspectorGroups as b, type PageSettingsPanelDefinition as c, type PaletteDefinition as d, type PaletteFamilyGroup as e, type PhotonStudioProps as f, type PhotonStudioSavePayload as g, type PhotonStudioSaveReason as h, type PhotonStudioSiteSettingChangeContext as i, type SiteSettingsSubtabDefinition as j };
