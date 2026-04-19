import type { ComponentType, MouseEventHandler, ReactNode } from "react";

export type WebsiteBuilderMode = "preview" | "content" | "builder";
export type WebsiteBuilderSurfaceMode =
	| "contained"
	| "bleed"
	| "full-viewport"
	| "fixed-shell";

export type WebsiteBuilderFieldKind =
	| "text"
	| "textarea"
	| "rich-text"
	| "number"
	| "url"
	| "color"
	| "select"
	| "toggle"
	| "tags"
	| "json"
	| "object"
	| "repeater"
	| "image"
	| "gallery";

export type WebsiteBuilderFieldOption = {
	label: string;
	labelKey?: string;
	value: string;
};

export type WebsiteBuilderFieldLocalization = "localized" | "shared";

export type WebsiteBuilderLocalizedDefaultValue<T = unknown> = {
	__wbLocalizedDefault: true;
	values: Record<string, T>;
};

export type WebsiteBuilderNestedField = {
	path?: string;
	label?: string;
	labelKey?: string;
	kind: WebsiteBuilderFieldKind;
	localization?: WebsiteBuilderFieldLocalization;
	description?: string;
	descriptionKey?: string;
	group?: "content" | "style" | "layout" | "data";
	options?: WebsiteBuilderFieldOption[];
	min?: number;
	max?: number;
	step?: number;
	fields?: WebsiteBuilderNestedField[];
	itemField?: WebsiteBuilderNestedField;
	itemLabel?: string;
	itemLabelKey?: string;
	itemLabelPath?: string;
	addLabel?: string;
	addLabelKey?: string;
	defaultValue?: unknown;
	defaultItem?: unknown;
};

export type WebsiteBuilderDefaultable<T> = T extends Array<infer Item>
	? Array<WebsiteBuilderDefaultable<Item>> | WebsiteBuilderLocalizedDefaultValue<T>
	: T extends Record<string, unknown>
		?
				| {
						[K in keyof T]: WebsiteBuilderDefaultable<T[K]>;
				  }
				| WebsiteBuilderLocalizedDefaultValue<T>
		: T | WebsiteBuilderLocalizedDefaultValue<T>;

export type WebsiteBuilderBlockDefaults<
	Props extends WebsiteBuilderBlockProps = WebsiteBuilderBlockProps,
> = {
	[K in keyof Props]: WebsiteBuilderDefaultable<Props[K]>;
};

export type WebsiteBuilderField = WebsiteBuilderNestedField & {
	path: string;
	label: string;
};

export type WebsiteBuilderBlockLocalizationSchema = {
	localized: string[];
	shared: string[];
};

export type WebsiteBuilderArea = {
	id: string;
	label?: string;
	blocks: WebsiteBuilderBlock[];
};

export type WebsiteBuilderMediaValue = {
	kind: "media";
	url: string;
	previewUrl?: string | null;
	temporaryUploadId?: string | null;
	mediaId?: string | null;
	name?: string | null;
	fileName?: string | null;
	mimeType?: string | null;
	size?: number | null;
	extension?: string | null;
	width?: number | null;
	height?: number | null;
	context?: string | null;
	expiresAt?: string | null;
	uploadedAt?: string | null;
};

export type WebsiteBuilderSearchResult = {
	id: string;
	pageKey: string;
	pageName: string;
	pageGroup?: string | null;
	pageKind: "page" | "template";
	route: string;
	blockId: string;
	path: string;
	targetId: string;
	occurrence: number;
	snippet: string;
};

export type WebsiteBuilderSearchInput = {
	query: string;
	limit?: number;
};

export type WebsiteBuilderSearchHighlight = {
	query: string;
	targetId: string;
	occurrence: number;
};

export type WebsiteBuilderSearchHandler = (
	input: WebsiteBuilderSearchInput,
) => Promise<WebsiteBuilderSearchResult[]>;

export type WebsiteBuilderBindingMode = "read" | "write";

export type WebsiteBuilderFieldBinding = {
	source: string;
	path: string;
	mode?: WebsiteBuilderBindingMode;
	adapter?: string;
};

export type WebsiteBuilderBindingAdapter = {
	key: string;
	read?: (value: unknown) => unknown;
	write?: (value: unknown) => unknown;
};

export type WebsiteBuilderBlockProps = Record<string, unknown>;

export type WebsiteBuilderBlock<
	Props extends WebsiteBuilderBlockProps = WebsiteBuilderBlockProps,
> = {
	id: string;
	module: string;
	type: string;
	props: Props;
	bindings?: Record<string, WebsiteBuilderFieldBinding>;
	areas?: WebsiteBuilderArea[];
};

export type WebsiteBuilderDocument = {
	id: string;
	name: string;
	route: string;
	updatedAt: string;
	blocks: WebsiteBuilderBlock[];
};

export type WebsiteBuilderDocumentsMap = Record<string, WebsiteBuilderDocument>;

export type WebsiteBuilderResources = Record<string, unknown>;

export type WebsiteBuilderPageSettings = Record<string, unknown>;
export type WebsiteBuilderPageRuntimeData = Record<string, unknown>;
export type WebsiteBuilderSiteSettings = Record<string, unknown>;

export type WebsiteBuilderSiteDesignAppearance = "light" | "dark";

export type WebsiteBuilderSiteComponentVariants = Record<string, string>;

export type WebsiteBuilderSiteDesignSettings = {
	bodyFontFamily: string;
	headingFontFamily: string;
	backgroundColor: string;
	surfaceColor: string;
	textColor: string;
	mutedTextColor: string;
	accentColor: string;
	borderColor: string;
	siteMaxWidth: string;
	pageGutter: string;
	sectionGap: string;
	radius: string;
	headerOffset: string;
};

export type WebsiteBuilderSiteDesignColorTokens = Pick<
	WebsiteBuilderSiteDesignSettings,
	| "backgroundColor"
	| "surfaceColor"
	| "textColor"
	| "mutedTextColor"
	| "accentColor"
	| "borderColor"
>;

export type WebsiteBuilderSiteDesignValue = Partial<
	WebsiteBuilderSiteDesignSettings
> & {
	presetId?: string;
	colorSchemeId?: string;
	componentVariants?: WebsiteBuilderSiteComponentVariants;
};

export type WebsiteBuilderResolvedSiteDesignSettings =
	WebsiteBuilderSiteDesignSettings & {
		presetId?: string;
		colorSchemeId?: string;
		componentVariants: WebsiteBuilderSiteComponentVariants;
	};

export type WebsiteBuilderSiteDesignPresetDefinition = {
	id: string;
	label: string;
	appearance: WebsiteBuilderSiteDesignAppearance;
	description: string;
	recommendedColorSchemeId?: string;
	designTokens: Partial<WebsiteBuilderSiteDesignSettings>;
	componentVariants: WebsiteBuilderSiteComponentVariants;
};

export type WebsiteBuilderSiteColorSchemeDefinition = {
	id: string;
	label: string;
	appearance: WebsiteBuilderSiteDesignAppearance;
	description: string;
	colorTokens: WebsiteBuilderSiteDesignColorTokens;
};

export type WebsiteBuilderSiteRegion = {
	key: string;
	label: string;
	order: number;
	lockedOnCanvas: boolean;
	document: WebsiteBuilderDocument;
};

export type WebsiteBuilderSite = {
	settings: WebsiteBuilderSiteSettings;
	regions: Record<string, WebsiteBuilderSiteRegion>;
};

export type WebsiteBuilderSiteFrameLinkItem = {
	id?: string;
	label: string;
	href: string;
	target?: string;
	rel?: string;
	order?: number;
	enabled?: boolean;
};

export type WebsiteBuilderSiteFrameActionKind = "link" | "auth";

export type WebsiteBuilderSiteFrameActionItem =
	WebsiteBuilderSiteFrameLinkItem & {
		kind?: WebsiteBuilderSiteFrameActionKind;
		appearance?: "primary" | "secondary" | "ghost";
	};

export type WebsiteBuilderSiteFrameNavigationColumn = {
	id?: string;
	title: string;
	links: WebsiteBuilderSiteFrameLinkItem[];
	order?: number;
	enabled?: boolean;
};

export type WebsiteBuilderSiteFrameExtension = {
	id: string;
	label?: string;
	enabled?: boolean;
	order?: number;
	header?: {
		utilityLinks?: WebsiteBuilderSiteFrameLinkItem[];
		categoryLinks?: WebsiteBuilderSiteFrameLinkItem[];
		actions?: WebsiteBuilderSiteFrameActionItem[];
	};
	footer?: {
		navigationColumns?: WebsiteBuilderSiteFrameNavigationColumn[];
		legalLinks?: WebsiteBuilderSiteFrameLinkItem[];
	};
};

export type WebsiteBuilderAccountTabExtension = {
	id: string;
	label: string;
	href?: string;
	order?: number;
	enabled?: boolean;
};

export type WebsiteBuilderWorkspaceRef = {
	profileId: string;
	branch: string;
	revisionId?: string;
	readonly?: boolean;
};

export type WebsiteBuilderWorkspaceDescriptor = {
	ref: WebsiteBuilderWorkspaceRef;
	headRevisionId?: string | null;
	profileName?: string | null;
	branchLabel?: string | null;
	revisionLabel?: string | null;
	readonlyReason?:
		| "revision"
		| "branch-lock"
		| "permission"
		| "policy"
		| "unknown"
		| null;
};

export type WebsiteBuilderWorkspaceCapabilities = {
	canEdit: boolean;
	canCommit: boolean;
	canBranch: boolean;
	canMerge: boolean;
	canEditMain: boolean;
	isReadonlyRevision: boolean;
	isMainLocked: boolean;
};

export type WebsiteBuilderActorSummary = {
	id: string;
	type: string;
	label: string;
	email?: string | null;
};

export type WebsiteBuilderRevisionChangeSummaryItem = {
	path: string;
	action: "added" | "updated" | "removed" | "moved" | "conflicted";
	label?: string;
};

export type WebsiteBuilderRevisionDescriptor = {
	id: string;
	branch: string;
	parents: string[];
	message: string;
	createdAt: string;
	actor: WebsiteBuilderActorSummary;
	treeHash?: string;
	changeSummary: WebsiteBuilderRevisionChangeSummaryItem[];
};

export type WebsiteBuilderBranchPolicyState = {
	isMainBranch: boolean;
	isLocked: boolean;
	directWritePolicy: "allowed" | "forbidden";
	lockReason?: string | null;
	lockedAt?: string | null;
	lockedBy?: WebsiteBuilderActorSummary | null;
};

export type WebsiteBuilderMergeResolutionStrategy =
	| "take_source_branch"
	| "take_newest_change"
	| "manual";

export type WebsiteBuilderMergeDiffItem = {
	path: string;
	nodeType: string;
	change: "added" | "updated" | "removed";
	sourceRevisionId?: string;
	targetRevisionId?: string;
};

export type WebsiteBuilderMergeConflict = {
	path: string;
	nodeType: string;
	baseValue: unknown;
	sourceValue: unknown;
	targetValue: unknown;
	sourceRevisionId?: string;
	targetRevisionId?: string;
	resolution?: {
		kind: WebsiteBuilderMergeResolutionStrategy;
		value?: unknown;
	};
};

export type WebsiteBuilderMergePreview = {
	mergeBaseRevisionId: string;
	conflicts: WebsiteBuilderMergeConflict[];
	autoResolved: WebsiteBuilderMergeDiffItem[];
	cleanChanges: WebsiteBuilderMergeDiffItem[];
};

export type WebsiteBuilderLinkComponentProps = {
	href: string;
	locale?: string;
	className?: string;
	children?: ReactNode;
	onClick?: MouseEventHandler<HTMLElement>;
	target?: string;
	rel?: string;
};

export type WebsiteBuilderLinkComponent =
	ComponentType<WebsiteBuilderLinkComponentProps>;

export type WebsiteBuilderBlockComponentProps<
	Props extends WebsiteBuilderBlockProps = WebsiteBuilderBlockProps,
> = {
	block: WebsiteBuilderBlock<Props>;
	renderArea?: (area: WebsiteBuilderArea, index: number) => ReactNode;
};

export type WebsiteBuilderBlockComponent<
	Props extends WebsiteBuilderBlockProps = WebsiteBuilderBlockProps,
> = {
	bivarianceHack: (
		props: WebsiteBuilderBlockComponentProps<Props>,
	) => ReactNode;
}["bivarianceHack"];

export type WebsiteBuilderBlockDefinition<
	Props extends WebsiteBuilderBlockProps = WebsiteBuilderBlockProps,
> = {
	type: string;
	label: string;
	labelKey?: string;
	description: string;
	descriptionKey?: string;
	category: string;
	family?: string;
	group?: string;
	package?: string;
	icon?: string;
	defaults: WebsiteBuilderBlockDefaults<Props>;
	bindings?: Record<string, WebsiteBuilderFieldBinding>;
	areas?: WebsiteBuilderArea[];
	fields: WebsiteBuilderField[];
	localizationSchema?: WebsiteBuilderBlockLocalizationSchema;
	component: WebsiteBuilderBlockComponent<Props>;
};

export type WebsiteBuilderAnyBlockDefinition =
	WebsiteBuilderBlockDefinition<any>;

export type WebsiteBuilderPageSettingsPanelProps = {
	scope: WebsiteBuilderPageSettingsScope;
	currentPage: WebsiteBuilderPageCatalogItem | null;
	pageSettings: WebsiteBuilderPageSettings;
	scopeSettings: Record<string, unknown>;
	getValue: (path: string) => unknown;
	setValue: (path: string, value: unknown) => void;
	focusField: (path: string) => void;
};

export type WebsiteBuilderPageSettingsScope = "page" | "record" | "template";

export type WebsiteBuilderPageSettingsPanelDefinition = {
	key: string;
	scope: WebsiteBuilderPageSettingsScope;
	label: string;
	labelKey?: string;
	description?: string;
	descriptionKey?: string;
	order?: number;
	isVisible?: (context: {
		scope: WebsiteBuilderPageSettingsScope;
		currentPage: WebsiteBuilderPageCatalogItem | null;
		pageSettings: WebsiteBuilderPageSettings;
	}) => boolean;
	component: (props: WebsiteBuilderPageSettingsPanelProps) => ReactNode;
};

export type WebsiteBuilderSiteSettingsPanelProps = {
	currentPage: WebsiteBuilderPageCatalogItem | null;
	pageSettings: WebsiteBuilderPageSettings;
	site: WebsiteBuilderSite;
	scopeSettings: Record<string, unknown>;
	viewMode?: string;
	getValue: (path: string) => unknown;
	setValue: (path: string, value: unknown) => void;
	focusField: (path: string) => void;
};

export type WebsiteBuilderSiteSettingsPanelDefinition = {
	key: string;
	label: string;
	labelKey?: string;
	description?: string;
	descriptionKey?: string;
	order?: number;
	isVisible?: (context: {
		currentPage: WebsiteBuilderPageCatalogItem | null;
		pageSettings: WebsiteBuilderPageSettings;
		site: WebsiteBuilderSite;
	}) => boolean;
	component: (props: WebsiteBuilderSiteSettingsPanelProps) => ReactNode;
};

export type WebsiteBuilderModule = {
	module: string;
	label: string;
	labelKey?: string;
	version?: string;
	blocks: WebsiteBuilderAnyBlockDefinition[];
	bindingAdapters?: WebsiteBuilderBindingAdapter[];
	pageSettingsPanels?: WebsiteBuilderPageSettingsPanelDefinition[];
	siteSettingsPanels?: WebsiteBuilderSiteSettingsPanelDefinition[];
};

export type WebsiteBuilderInstallableKit = {
	key: string;
	label: string;
	modules: WebsiteBuilderModule[];
	documents?: WebsiteBuilderDocumentsMap;
	siteFrameExtensions?: WebsiteBuilderSiteFrameExtension[];
	accountTabs?: WebsiteBuilderAccountTabExtension[];
};

export type WebsiteBuilderRegistryEntry =
	| WebsiteBuilderModule
	| WebsiteBuilderInstallableKit;

export type WebsiteBuilderLocaleStatus = "active" | "draft" | "inactive";

export type WebsiteBuilderLocaleDescriptor = {
	code: string;
	label: string;
	status: WebsiteBuilderLocaleStatus;
	isDefault?: boolean;
	sortOrder?: number;
};

export type WebsiteBuilderInterfaceLocaleOption = {
	code: string;
	label: string;
};

export type WebsiteBuilderI18nValue = {
	defaultLocale: string;
	locale: string;
	contentLocale: string;
	interfaceLocale: string;
	interfaceLocales: WebsiteBuilderInterfaceLocaleOption[];
	locales: WebsiteBuilderLocaleDescriptor[];
	publicLocales: WebsiteBuilderLocaleDescriptor[];
	editableLocales: WebsiteBuilderLocaleDescriptor[];
	showLocaleSwitcher?: boolean;
	translate: (key: string, fallback?: string) => string;
};

export type WebsiteBuilderSelectedField = {
	blockId: string;
	path: string;
} | null;

export type WebsiteBuilderRegistry = {
	modules: WebsiteBuilderModule[];
	definitions: Map<string, WebsiteBuilderAnyBlockDefinition>;
	bindingAdapters: Map<string, WebsiteBuilderBindingAdapter>;
	pageSettingsPanels: WebsiteBuilderPageSettingsPanelDefinition[];
	siteSettingsPanels: WebsiteBuilderSiteSettingsPanelDefinition[];
	getDefinition: (
		moduleName: string,
		blockType: string,
	) => WebsiteBuilderAnyBlockDefinition | undefined;
	getBindingAdapter: (
		key: string,
	) => WebsiteBuilderBindingAdapter | undefined;
	getPageSettingsPanels: () => WebsiteBuilderPageSettingsPanelDefinition[];
	getSiteSettingsPanels: () => WebsiteBuilderSiteSettingsPanelDefinition[];
	getPaletteBlocks: () => Array<
		WebsiteBuilderAnyBlockDefinition & {
			module: string;
			key: string;
		}
	>;
};

export type WebsiteBuilderRuntime = {
	entries: WebsiteBuilderRegistryEntry[];
	registry: WebsiteBuilderRegistry;
	documents: WebsiteBuilderDocumentsMap;
	siteFrameExtensions: WebsiteBuilderSiteFrameExtension[];
	accountTabs: WebsiteBuilderAccountTabExtension[];
};

export type WebsiteBuilderPageCatalogItem = {
	key: string;
	name: string;
	description?: string | null;
	group?: string | null;
	kind: "page" | "template";
	route: string;
	routePattern?: string | null;
	navigationRoute?: string | null;
	canOpen: boolean;
	canDuplicate: boolean;
	isDynamic: boolean;
};

export type WebsiteBuilderResolvedPage = {
	workspace?: WebsiteBuilderWorkspaceDescriptor;
	page: WebsiteBuilderPageCatalogItem;
	document: WebsiteBuilderDocument;
	resources: WebsiteBuilderResources;
	pageSettings: WebsiteBuilderPageSettings;
	runtimeData: WebsiteBuilderPageRuntimeData;
	site: WebsiteBuilderSite;
	pages: WebsiteBuilderPageCatalogItem[];
	capabilities?: WebsiteBuilderWorkspaceCapabilities;
	history?: WebsiteBuilderRevisionDescriptor[];
	branchPolicy?: WebsiteBuilderBranchPolicyState;
	mergePreview?: WebsiteBuilderMergePreview | null;
};

export type WebsiteBuilderMediaUploadInput = {
	file: File;
	documentId: string;
	blockId: string;
	path: string;
};

export type WebsiteBuilderMediaUploadHandler = (
	input: WebsiteBuilderMediaUploadInput,
) => Promise<WebsiteBuilderMediaValue>;
