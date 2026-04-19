import type { ReactNode } from "react";
import type {
	WebsiteBuilderI18nValue,
	WebsiteBuilderDocument,
	WebsiteBuilderField,
	WebsiteBuilderLinkComponent,
	WebsiteBuilderMediaUploadHandler,
	WebsiteBuilderMode,
	WebsiteBuilderPageCatalogItem,
	WebsiteBuilderPageSettings,
	WebsiteBuilderPageSettingsPanelDefinition,
	WebsiteBuilderRevisionDescriptor,
	WebsiteBuilderRegistry,
	WebsiteBuilderResources,
	WebsiteBuilderSearchHandler,
	WebsiteBuilderSearchHighlight,
	WebsiteBuilderMergePreview,
	WebsiteBuilderBranchPolicyState,
	WebsiteBuilderSite,
	WebsiteBuilderSiteFrameExtension,
	WebsiteBuilderAccountTabExtension,
	WebsiteBuilderSiteSettingsPanelDefinition,
	WebsiteBuilderWorkspaceCapabilities,
	WebsiteBuilderWorkspaceDescriptor,
} from "../types";

export type InsertTarget = {
	listId: string;
	index: number;
};

export type WebsiteBuilderStudioSaveReason = "manual" | "autosave";

export type WebsiteBuilderStudioSavePayload = {
	workspace?: WebsiteBuilderWorkspaceDescriptor;
	expectedHeadRevisionId: string | null;
	commitMessage?: string | null;
	saveMode: WebsiteBuilderStudioSaveReason;
	document: WebsiteBuilderDocument;
	resources: WebsiteBuilderResources;
	pageSettings: WebsiteBuilderPageSettings;
	site: WebsiteBuilderSite;
};

export type WebsiteBuilderStudioSiteSettingChangeContext =
	WebsiteBuilderStudioSavePayload & {
		currentPage: WebsiteBuilderPageCatalogItem | null;
	};

export type WebsiteBuilderStudioProps = {
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
	onSiteSettingChange?: (
		path: string,
		value: unknown,
		context: WebsiteBuilderStudioSiteSettingChangeContext,
	) => WebsiteBuilderStudioSavePayload | void;
	onSaveDocument?: (
		payload: WebsiteBuilderStudioSavePayload,
		context: {
			reason: WebsiteBuilderStudioSaveReason;
			workspace: WebsiteBuilderWorkspaceDescriptor;
			capabilities: WebsiteBuilderWorkspaceCapabilities;
		},
	) => Promise<WebsiteBuilderStudioSavePayload | undefined>;
	onOpenPage?: (
		page: WebsiteBuilderPageCatalogItem,
		context: { mode: WebsiteBuilderMode },
	) => void | Promise<void>;
	onCreatePage?: (
		input: {
			name: string;
			route: string;
			duplicateCurrent: boolean;
		},
		context: {
			mode: WebsiteBuilderMode;
			document: WebsiteBuilderDocument;
			resources: WebsiteBuilderResources;
			pageSettings: WebsiteBuilderPageSettings;
			site: WebsiteBuilderSite;
			currentPage: WebsiteBuilderPageCatalogItem | null;
		},
	) => void | Promise<void>;
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

export type InspectorGroups = Record<string, WebsiteBuilderField[]>;

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
	WebsiteBuilderRegistry["getPaletteBlocks"]
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

export type PageSettingsPanelDefinition = WebsiteBuilderPageSettingsPanelDefinition;
export type SiteSettingsPanelDefinition = WebsiteBuilderSiteSettingsPanelDefinition;
export type SiteSettingsSubtabDefinition = {
	key: string;
	label: string;
	description?: string;
	component: () => ReactNode;
};
