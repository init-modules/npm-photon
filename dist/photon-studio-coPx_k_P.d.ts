import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { w as PhotonDocument, a4 as PhotonResources, a1 as PhotonPageSettings, a7 as PhotonSite, aA as PhotonRegistry, af as PhotonWorkspaceDescriptor, ae as PhotonWorkspaceCapabilities, aB as PhotonRevisionDescriptor, aC as PhotonBranchPolicyState, aD as PhotonMergePreview, aE as PhotonMode, $ as PhotonPageCatalogItem, C as PhotonInteractionActionPresentation, aF as PhotonMediaUploadHandler, aG as PhotonSearchHandler, aH as PhotonNavigateHandler, aI as PhotonPrefetchHandler, a5 as PhotonSearchHighlight, aJ as PhotonLinkComponent, aK as PhotonLinkFactory, ag as PhotonSiteFrameExtension, ak as PhotonAccountTabExtension, O as PhotonInteractionSurfaceDefinition, z as PhotonInteractionActionDefinition, F as PhotonInteractionGuardDefinition, J as PhotonInteractionGuardEvaluatorMap, aL as PhotonInteractionSurfaceRendererMap, o as PhotonComponentLibraryUsageProvider, aM as PhotonI18nValue, ao as PhotonField, aN as PhotonPageSettingsPanelDefinition, aO as PhotonSiteSettingsPanelDefinition } from './types-C1q0pf4n.js';

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
    requestAuthAction?: PhotonInteractionActionPresentation;
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
    navigate?: PhotonNavigateHandler;
    prefetch?: PhotonPrefetchHandler;
    activeSearchHighlight?: PhotonSearchHighlight | null;
    linkComponent?: PhotonLinkComponent;
    linkFactory?: PhotonLinkFactory;
    siteFrameExtensions?: PhotonSiteFrameExtension[];
    accountTabs?: PhotonAccountTabExtension[];
    interactionSurfaces?: PhotonInteractionSurfaceDefinition[];
    interactionActions?: PhotonInteractionActionDefinition[];
    interactionGuards?: PhotonInteractionGuardDefinition[];
    interactionGuardEvaluators?: PhotonInteractionGuardEvaluatorMap;
    interactionSurfaceRenderers?: PhotonInteractionSurfaceRendererMap;
    componentLibraryUsageProvider?: PhotonComponentLibraryUsageProvider;
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

declare const PhotonStudio: ({ initialDocument, initialResources, initialPageSettings, initialSite, registry, workspace, capabilities, history, branchPolicy, mergePreview, canManage, initialMode, draftStorageKey, autosaveStorageKey, currentPage, pages, onRequestAuth, requestAuthAction, onLogout, onContentLocaleChange, onInterfaceLocaleChange, onModeChange, onSiteSettingChange, onSaveDocument, onOpenPage, onCreatePage, onUploadMedia, onSearch, navigate, prefetch, activeSearchHighlight, linkComponent, linkFactory, siteFrameExtensions, accountTabs, interactionSurfaces, interactionActions, interactionGuards, interactionGuardEvaluators, interactionSurfaceRenderers, componentLibraryUsageProvider, i18n, hydrateModePreference, showInterfaceLocaleControl, workspaceControl, title, description, renderContentNotice, siteSettingsSubtabs, }: PhotonStudioProps) => react_jsx_runtime.JSX.Element;

export { type InsertTarget as I, PhotonStudio as P, type SiteSettingsPanelDefinition as S, type InspectorDefinitionMeta as a, type InspectorGroups as b, type PageSettingsPanelDefinition as c, type PaletteDefinition as d, type PaletteFamilyGroup as e, type PhotonStudioProps as f, type PhotonStudioSavePayload as g, type PhotonStudioSaveReason as h, type PhotonStudioSiteSettingChangeContext as i, type SiteSettingsSubtabDefinition as j };
