import type { ReactNode } from "react";
import type { PhotonSiteFrameContributionRegistry } from "../helpers/contributions";
import type {
	PhotonAccountTabExtension,
	PhotonBranchPolicyState,
	PhotonDocument,
	PhotonField,
	PhotonI18nValue,
	PhotonInteractionActionDefinition,
	PhotonInteractionActionPresentation,
	PhotonInteractionGuardDefinition,
	PhotonInteractionGuardEvaluatorMap,
	PhotonInteractionSurfaceDefinition,
	PhotonInteractionSurfaceRendererMap,
	PhotonComponentLibraryUsageProvider,
	PhotonLinkComponent,
	PhotonLinkFactory,
	PhotonMediaUploadHandler,
	PhotonMergePreview,
	PhotonMode,
	PhotonNavigateHandler,
	PhotonPageCatalogItem,
	PhotonPageSettings,
	PhotonPageSettingsPanelDefinition,
	PhotonPrefetchHandler,
	PhotonRegistry,
	PhotonResources,
	PhotonRevisionDescriptor,
	PhotonSearchHandler,
	PhotonSearchHighlight,
	PhotonSite,
	PhotonSiteFrameExtension,
	PhotonSiteSettingsPanelDefinition,
	PhotonWorkspaceCapabilities,
	PhotonWorkspaceDescriptor,
} from "../types";

export type InsertTarget = {
	listId: string;
	index: number;
};

export type PhotonStudioSaveReason = "manual" | "autosave";

export type PhotonStudioSavePayload = {
	workspace?: PhotonWorkspaceDescriptor;
	expectedHeadRevisionId: string | null;
	commitMessage?: string | null;
	saveMode: PhotonStudioSaveReason;
	document: PhotonDocument;
	resources: PhotonResources;
	pageSettings: PhotonPageSettings;
	site: PhotonSite;
};

export type PhotonStudioSiteSettingChangeContext =
	PhotonStudioSavePayload & {
		currentPage: PhotonPageCatalogItem | null;
	};

export type PhotonStudioProps = {
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
	onSiteSettingChange?: (
		path: string,
		value: unknown,
		context: PhotonStudioSiteSettingChangeContext,
	) => PhotonStudioSavePayload | void;
	onSaveDocument?: (
		payload: PhotonStudioSavePayload,
		context: {
			reason: PhotonStudioSaveReason;
			workspace: PhotonWorkspaceDescriptor;
			capabilities: PhotonWorkspaceCapabilities;
		},
	) => Promise<PhotonStudioSavePayload | undefined>;
	onOpenPage?: (
		page: PhotonPageCatalogItem,
		context: { mode: PhotonMode },
	) => void | Promise<void>;
	onCreatePage?: (
		input: {
			name: string;
			route: string;
			duplicateCurrent: boolean;
		},
		context: {
			mode: PhotonMode;
			document: PhotonDocument;
			resources: PhotonResources;
			pageSettings: PhotonPageSettings;
			site: PhotonSite;
			currentPage: PhotonPageCatalogItem | null;
		},
	) => void | Promise<void>;
	onUploadMedia?: PhotonMediaUploadHandler;
	onSearch?: PhotonSearchHandler;
	navigate?: PhotonNavigateHandler;
	prefetch?: PhotonPrefetchHandler;
	activeSearchHighlight?: PhotonSearchHighlight | null;
	linkComponent?: PhotonLinkComponent;
	linkFactory?: PhotonLinkFactory;
	siteFrameExtensions?: PhotonSiteFrameExtension[];
	siteFrameContributionRegistry?: PhotonSiteFrameContributionRegistry;
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

export type InspectorGroups = Record<string, PhotonField[]>;

export type InspectorDefinitionMeta = {
	label: string;
	labelKey?: string;
	description: string;
	descriptionKey?: string;
	module: string;
	category: string;
	fieldCount: number;
};

export type PaletteDefinition = ReturnType<
	PhotonRegistry["getPaletteBlocks"]
>[number] & {
	family: string;
	group: string;
	package: string;
};

export type PaletteFamilyGroup = {
	family: string;
	packageOptions: string[];
	groups: Array<{
		group: string;
		definitions: PaletteDefinition[];
	}>;
};

export type PageSettingsPanelDefinition =
	PhotonPageSettingsPanelDefinition;
export type SiteSettingsPanelDefinition =
	PhotonSiteSettingsPanelDefinition;
export type SiteSettingsSubtabDefinition = {
	key: string;
	label: string;
	description?: string;
	component: () => ReactNode;
};
