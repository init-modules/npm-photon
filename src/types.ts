import type { ComponentType, MouseEventHandler, ReactNode } from "react";

export type PhotonMode = "preview" | "content" | "builder";
export type PhotonSurfaceMode =
	| "contained"
	| "bleed"
	| "full-viewport"
	| "fixed-shell";

export type PhotonFieldKind =
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
	| "form-fields"
	| "object"
	| "repeater"
	| "image"
	| "gallery";

export type PhotonFieldOption = {
	label: string;
	labelKey?: string;
	value: string;
};

export type PhotonFieldLocalization = "localized" | "shared";

export type PhotonLocalizedDefaultValue<T = unknown> = {
	__wbLocalizedDefault: true;
	values: Record<string, T>;
};

export type PhotonNestedField = {
	path?: string;
	label?: string;
	labelKey?: string;
	kind: PhotonFieldKind;
	localization?: PhotonFieldLocalization;
	description?: string;
	descriptionKey?: string;
	group?: "content" | "style" | "layout" | "data";
	options?: PhotonFieldOption[];
	min?: number;
	max?: number;
	step?: number;
	fields?: PhotonNestedField[];
	itemField?: PhotonNestedField;
	itemLabel?: string;
	itemLabelKey?: string;
	itemLabelPath?: string;
	addLabel?: string;
	addLabelKey?: string;
	defaultValue?: unknown;
	defaultItem?: unknown;
};

export type PhotonDefaultable<T> =
	T extends Array<infer Item>
		? Array<PhotonDefaultable<Item>> | PhotonLocalizedDefaultValue<T>
		: T extends Record<string, unknown>
			?
					| {
							[K in keyof T]: PhotonDefaultable<T[K]>;
					  }
					| PhotonLocalizedDefaultValue<T>
			: T | PhotonLocalizedDefaultValue<T>;

export type PhotonBlockDefaults<
	Props extends PhotonBlockProps = PhotonBlockProps,
> = {
	[K in keyof Props]: PhotonDefaultable<Props[K]>;
};

export type PhotonField = PhotonNestedField & {
	path: string;
	label: string;
};

export type PhotonBlockLocalizationSchema = {
	localized: string[];
	shared: string[];
};

export type PhotonArea = {
	id: string;
	label?: string;
	blocks: PhotonBlock[];
};

export type PhotonMediaValue = {
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

export type PhotonSearchResult = {
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

export type PhotonSearchInput = {
	query: string;
	limit?: number;
};

export type PhotonSearchHighlight = {
	query: string;
	targetId: string;
	occurrence: number;
};

export type PhotonSearchHandler = (
	input: PhotonSearchInput,
) => Promise<PhotonSearchResult[]>;

export type PhotonInteractionSurfaceKind = "dialog" | "panel" | "toast";

export type PhotonInteractionSurfaceVariant = {
	id: string;
	label: string;
	labelKey?: string;
	description?: string;
	descriptionKey?: string;
};

export type PhotonInteractionSurfaceInstance = {
	id: string;
	definitionId: string;
	label: string;
	labelKey?: string;
	variant?: string;
	enabled?: boolean;
	props?: Record<string, unknown>;
};

export type PhotonInteractionSurfaceIntentBinding = {
	intent: string;
	surfaceInstanceId: string;
	enabled?: boolean;
	overrides?: Record<string, unknown>;
	payload?: Record<string, unknown>;
};

export type PhotonInteractionToastStatus =
	| "message"
	| "success"
	| "error"
	| "info"
	| "warning";

export type PhotonInteractionToastTemplate = {
	id: string;
	label: string;
	labelKey?: string;
	status?: PhotonInteractionToastStatus;
	title: string;
	titleKey?: string;
	description?: string;
	descriptionKey?: string;
	enabled?: boolean;
	props?: Record<string, unknown>;
};

export type PhotonInteractionSurfaceDefinition = {
	id: string;
	label: string;
	labelKey?: string;
	description?: string;
	descriptionKey?: string;
	kind: PhotonInteractionSurfaceKind;
	rendererKey: string;
	order?: number;
	variants?: PhotonInteractionSurfaceVariant[];
	fields?: PhotonField[];
	defaultInstances?: PhotonInteractionSurfaceInstance[];
	defaultIntentBindings?: PhotonInteractionSurfaceIntentBinding[];
	defaultToastTemplates?: PhotonInteractionToastTemplate[];
};

export type PhotonInteractionSurfaceSettings = {
	instances?: Record<string, PhotonInteractionSurfaceInstance>;
	intents?: Record<string, PhotonInteractionSurfaceIntentBinding>;
	toastTemplates?: Record<string, PhotonInteractionToastTemplate>;
};

export type PhotonInteractionSurfaceTrigger = {
	intent?: string;
	surfaceInstanceId?: string;
	overrides?: Record<string, unknown>;
	payload?: Record<string, unknown>;
	fallbackHref?: string;
};

export type PhotonActionValue =
	| {
			type: "link";
			href: string;
			target?: string;
			rel?: string;
	  }
	| ({
			type: "interaction";
	  } & PhotonInteractionSurfaceTrigger);

export type PhotonResolvedInteractionSurfaceCatalog = {
	definitions: PhotonInteractionSurfaceDefinition[];
	definitionsById: Map<string, PhotonInteractionSurfaceDefinition>;
	instances: Record<string, PhotonInteractionSurfaceInstance>;
	intents: Record<string, PhotonInteractionSurfaceIntentBinding>;
	toastTemplates: Record<string, PhotonInteractionToastTemplate>;
};

export type PhotonResolvedInteractionSurfaceRequest = {
	definition: PhotonInteractionSurfaceDefinition;
	instance: PhotonInteractionSurfaceInstance;
	trigger: PhotonInteractionSurfaceTrigger;
	props: Record<string, unknown>;
	payload: Record<string, unknown>;
	fallbackHref?: string;
};

export type PhotonInteractionSurfaceRendererProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	request: PhotonResolvedInteractionSurfaceRequest;
	previewMode?: "runtime" | "builder-inline";
	previewScenarioId?: string;
};

export type PhotonInteractionSurfaceRenderer =
	ComponentType<PhotonInteractionSurfaceRendererProps>;

export type PhotonInteractionSurfaceRendererMap = Record<
	string,
	PhotonInteractionSurfaceRenderer
>;

export type PhotonInteractionSurfaceOpenHandler = (
	trigger: PhotonInteractionSurfaceTrigger,
) => boolean;

export type PhotonInteractionToastInput = {
	templateId: string;
	overrides?: Partial<
		Pick<
			PhotonInteractionToastTemplate,
			"status" | "title" | "description" | "props"
		>
	>;
};

export type PhotonInteractionToastHandler = (
	input: PhotonInteractionToastInput,
) => boolean;

export type PhotonInteractionPreviewScenario = {
	id: string;
	label: string;
	labelKey?: string;
	description?: string;
	descriptionKey?: string;
	resources?: Record<string, unknown>;
	props?: Record<string, unknown>;
};

export type PhotonInteractionGuardEvaluationResult =
	| {
			status: "allowed";
			reason?: string;
	  }
	| {
			status: "blocked";
			reason?: string;
			action?: PhotonInteractionActionPresentation;
	  };

export type PhotonInteractionGuardMissingEvaluatorPolicy = "block" | "allow";

export type PhotonInteractionExecutionStatus =
	| "executed"
	| "blocked"
	| "missing-action"
	| "missing-evaluator"
	| "missing-renderer"
	| "fallback";

export type PhotonInteractionExecutionResult = {
	status: PhotonInteractionExecutionStatus;
	executed: boolean;
	reason?: string;
	action?: PhotonInteractionActionPresentation | null;
	guard?: PhotonInteractionGuardInstance;
	fallbackHref?: string;
};

export type PhotonInteractionGuardEvaluationContext = {
	guard: PhotonInteractionGuardInstance;
	definition?: PhotonInteractionGuardDefinition;
	slot?: PhotonInteractionTriggerSlot;
	action?: PhotonInteractionActionPresentation | null;
	document: PhotonDocument;
	resources: PhotonResources;
	pageSettings: PhotonPageSettings;
	site: PhotonSite;
	mode: PhotonMode;
	isAdmin: boolean;
	scenarioId?: string | null;
};

export type PhotonInteractionGuardEvaluator = (
	context: PhotonInteractionGuardEvaluationContext,
) => PhotonInteractionGuardEvaluationResult | boolean | null | undefined;

export type PhotonInteractionGuardEvaluatorMap = Record<
	string,
	PhotonInteractionGuardEvaluator
>;

export type PhotonInteractionActionExecutionHandlers = {
	openInteractionSurface: PhotonInteractionSurfaceOpenHandler;
	showInteractionToast: PhotonInteractionToastHandler;
	navigate?: PhotonNavigateHandler;
};

export type PhotonInteractionActionPresentation =
	| ({
			type: "surface";
	  } & PhotonInteractionSurfaceTrigger)
	| {
			type: "toast";
			templateId: string;
			overrides?: PhotonInteractionToastInput["overrides"];
	  }
	| {
			type: "link";
			href: string;
			target?: string;
			rel?: string;
	  };

export type PhotonInteractionActionInstance = {
	id: string;
	definitionId: string;
	label: string;
	labelKey?: string;
	enabled?: boolean;
	presentation: PhotonInteractionActionPresentation;
	props?: Record<string, unknown>;
};

export type PhotonInteractionActionDefinition = {
	id: string;
	label: string;
	labelKey?: string;
	description?: string;
	descriptionKey?: string;
	order?: number;
	fields?: PhotonField[];
	defaultInstances?: PhotonInteractionActionInstance[];
	previewScenarios?: PhotonInteractionPreviewScenario[];
};

export type PhotonInteractionGuardInstance = {
	id: string;
	definitionId: string;
	label: string;
	labelKey?: string;
	enabled?: boolean;
	action?: PhotonInteractionActionPresentation;
	props?: Record<string, unknown>;
};

export type PhotonInteractionGuardDefinition = {
	id: string;
	label: string;
	labelKey?: string;
	description?: string;
	descriptionKey?: string;
	order?: number;
	missingEvaluatorPolicy?: PhotonInteractionGuardMissingEvaluatorPolicy;
	fields?: PhotonField[];
	defaultInstances?: PhotonInteractionGuardInstance[];
	previewScenarios?: PhotonInteractionPreviewScenario[];
};

export type PhotonInteractionTriggerSlot = {
	id: string;
	label: string;
	labelKey?: string;
	description?: string;
	descriptionKey?: string;
	action?: PhotonInteractionActionPresentation;
	actionInstanceId?: string;
	guardInstanceIds?: string[];
	allowedActionDefinitionIds?: string[];
	allowedGuardDefinitionIds?: string[];
	previewScenarios?: PhotonInteractionPreviewScenario[];
};

export type PhotonInteractionTriggerBinding = {
	slotId: string;
	actionInstanceId?: string;
	guardInstanceIds?: string[];
	overrides?: Record<string, unknown>;
	enabled?: boolean;
};

export type PhotonInteractionSettings = {
	actionInstances?: Record<string, PhotonInteractionActionInstance>;
	triggerBindings?: Record<string, PhotonInteractionTriggerBinding>;
	guardInstances?: Record<string, PhotonInteractionGuardInstance>;
};

export type PhotonResolvedInteractionActionCatalog = {
	actions: PhotonInteractionActionDefinition[];
	actionsById: Map<string, PhotonInteractionActionDefinition>;
	actionInstances: Record<string, PhotonInteractionActionInstance>;
	guards: PhotonInteractionGuardDefinition[];
	guardsById: Map<string, PhotonInteractionGuardDefinition>;
	guardInstances: Record<string, PhotonInteractionGuardInstance>;
	triggerBindings: Record<string, PhotonInteractionTriggerBinding>;
};

export type PhotonComponentLibraryItem = {
	id: string;
	label: string;
	labelKey?: string;
	description?: string;
	descriptionKey?: string;
	enabled?: boolean;
	blocks: PhotonBlock[];
	createdAt?: string;
	updatedAt?: string;
};

export type PhotonComponentLibrarySettings = {
	items?: Record<string, PhotonComponentLibraryItem>;
};

export type PhotonComponentLibraryUsage = {
	itemId: string;
	referenceBlockId: string;
	regionKey?: string | null;
	path: string;
	source?:
		| "currentDocument"
		| "siteFrame"
		| "workspacePage"
		| "current"
		| "workspace";
	documentId?: string;
	documentLabel?: string;
	route?: string;
};

export type PhotonComponentLibrarySourceSelection = {
	kind: "component-library-source";
	itemId: string;
	sourceBlockId: string;
};

export type PhotonComponentLibraryEditorSelection =
	| {
			kind: "document-block";
			blockId: string;
	  }
	| PhotonComponentLibrarySourceSelection;

export type PhotonComponentLibraryUsageProvider = (input: {
	site: PhotonSite;
	document: PhotonDocument;
	pageSettings: PhotonPageSettings;
	workspace?: PhotonWorkspaceDescriptor;
	itemIds?: string[];
}) => PhotonComponentLibraryUsage[] | Promise<PhotonComponentLibraryUsage[]>;

export type PhotonComponentReferenceProps = {
	itemId: string;
	label?: string;
};

export type PhotonStudioSurfaceMode = "canvas" | "settings" | "interactions";

export type PhotonStudioPaletteTab = "blocks" | "library";

export type PhotonStudioInteractionTab =
	| "actions"
	| "guards"
	| "surfaces"
	| "toasts";

export type PhotonStudioUrlState = {
	mode?: PhotonMode;
	builderSurface?: PhotonStudioSurfaceMode;
	surface?: string;
	toast?: string;
	interactionTab?: PhotonStudioInteractionTab;
	action?: string;
	guard?: string;
	scenario?: string;
	block?: string;
	trigger?: string;
	paletteTab?: PhotonStudioPaletteTab;
	library?: string;
};

export type PhotonStudioUrlStatePatch = {
	[Key in keyof PhotonStudioUrlState]?: PhotonStudioUrlState[Key] | null;
};

export type PhotonBindingMode = "read" | "write";

export type PhotonFieldBinding = {
	source: string;
	path: string;
	mode?: PhotonBindingMode;
	adapter?: string;
};

export type PhotonBindingAdapter = {
	key: string;
	read?: (value: unknown) => unknown;
	write?: (value: unknown) => unknown;
};

export type PhotonBlockProps = Record<string, unknown>;

export type PhotonBlock<Props extends PhotonBlockProps = PhotonBlockProps> = {
	id: string;
	module: string;
	type: string;
	props: Props;
	bindings?: Record<string, PhotonFieldBinding>;
	areas?: PhotonArea[];
};

export type PhotonDocument = {
	id: string;
	name: string;
	route: string;
	updatedAt: string;
	blocks: PhotonBlock[];
};

export type PhotonDocumentsMap = Record<string, PhotonDocument>;

export type PhotonResources = Record<string, unknown>;

export type PhotonPageSettings = Record<string, unknown>;
export type PhotonPageRuntimeData = Record<string, unknown>;
export type PhotonSiteSettings = Record<string, unknown>;

export type PhotonSiteDesignAppearance = "light" | "dark";

export type PhotonSiteComponentVariants = Record<string, string>;

export type PhotonSiteDesignSettings = {
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

export type PhotonSiteDesignColorTokens = Pick<
	PhotonSiteDesignSettings,
	| "backgroundColor"
	| "surfaceColor"
	| "textColor"
	| "mutedTextColor"
	| "accentColor"
	| "borderColor"
>;

export type PhotonSiteDesignValue = Partial<PhotonSiteDesignSettings> & {
	presetId?: string;
	colorSchemeId?: string;
	componentVariants?: PhotonSiteComponentVariants;
};

export type PhotonResolvedSiteDesignSettings = PhotonSiteDesignSettings & {
	presetId?: string;
	colorSchemeId?: string;
	componentVariants: PhotonSiteComponentVariants;
};

export type PhotonSiteDesignPresetDefinition = {
	id: string;
	label: string;
	appearance: PhotonSiteDesignAppearance;
	description: string;
	recommendedColorSchemeId?: string;
	designTokens: Partial<PhotonSiteDesignSettings>;
	componentVariants: PhotonSiteComponentVariants;
};

export type PhotonSiteColorSchemeDefinition = {
	id: string;
	label: string;
	appearance: PhotonSiteDesignAppearance;
	description: string;
	colorTokens: PhotonSiteDesignColorTokens;
};

export type PhotonSiteRegion = {
	key: string;
	label: string;
	order: number;
	lockedOnCanvas: boolean;
	document: PhotonDocument;
};

export type PhotonSite = {
	settings: PhotonSiteSettings;
	regions: Record<string, PhotonSiteRegion>;
};

export type PhotonSiteFrameLinkItem = {
	id?: string;
	label: string;
	href: string;
	target?: string;
	rel?: string;
	order?: number;
	enabled?: boolean;
	dedupeKey?: string;
	isVisible?: (context: PhotonSiteFrameExtensionContext) => boolean;
};

export type PhotonSiteFrameActionKind = "link" | "auth";

export type PhotonSiteFrameHeaderSlot =
	| "utility"
	| "navigation"
	| "prominent"
	| "actions";

export type PhotonSiteFrameHeaderSlotItems = {
	links: PhotonSiteFrameLinkItem[];
	actions: PhotonSiteFrameActionItem[];
};

export type PhotonSiteFrameHeaderSlots = Record<
	PhotonSiteFrameHeaderSlot,
	PhotonSiteFrameHeaderSlotItems
>;

export type PhotonSiteFrameFooterSlot = "navigation" | "legal";

export type PhotonSiteFrameFooterSlotItems = {
	navigationColumns: PhotonSiteFrameNavigationColumn[];
	links: PhotonSiteFrameLinkItem[];
};

export type PhotonSiteFrameFooterSlots = Record<
	PhotonSiteFrameFooterSlot,
	PhotonSiteFrameFooterSlotItems
>;

export type PhotonSiteFrameMobileMenuType =
	| "inline"
	| "drawer"
	| "fullscreen";

export type PhotonSiteFrameMobileMenuTriggerPlacement =
	| "fixed"
	| "header"
	| "hidden";

export type PhotonSiteFrameFloatingControls = {
	floating?: boolean;
	disableFloatingOnSmallScreens?: boolean;
};

export type PhotonSiteFrameMobileMenuControls =
	PhotonSiteFrameFloatingControls & {
		type?: PhotonSiteFrameMobileMenuType;
		triggerPlacement?: PhotonSiteFrameMobileMenuTriggerPlacement;
		scrollLock?: boolean;
	};

export type PhotonSiteFrameMobileBottomMenuControls =
	PhotonSiteFrameFloatingControls & {
		enabled?: boolean;
		showBurger?: boolean;
	};

export type PhotonSiteFrameMobileControls = {
	sticky?: boolean;
	menu?: PhotonSiteFrameMobileMenuControls;
	bottomMenu?: PhotonSiteFrameMobileBottomMenuControls;
};

export type PhotonSiteFrameExtensionContext = {
	document: PhotonDocument;
	resources: PhotonResources;
	pageSettings: PhotonPageSettings;
	site: PhotonSite;
	mode: PhotonMode;
	isAdmin: boolean;
	currentRoute: string;
};

export type PhotonSiteFrameActionComponentProps = {
	action: PhotonSiteFrameActionItem;
	className: string;
	context: PhotonSiteFrameExtensionContext;
	requestAuth?: () => void;
	openInteractionSurface?: PhotonInteractionSurfaceOpenHandler;
	showInteractionToast?: PhotonInteractionToastHandler;
	executeInteractionAction?: (
		action: PhotonInteractionActionPresentation | undefined,
	) => PhotonInteractionExecutionResult;
	executeInteractionTriggerSlot?: (
		slot: PhotonInteractionTriggerSlot,
		options?: {
			scenarioId?: string | null;
			scenario?: PhotonInteractionPreviewScenario | null;
		},
	) => PhotonInteractionExecutionResult;
};

export type PhotonSiteFrameActionItem = PhotonSiteFrameLinkItem & {
	kind?: PhotonSiteFrameActionKind;
	appearance?: "primary" | "secondary" | "ghost";
	authenticatedLabel?: string;
	authenticatedHref?: string;
	authenticatedTarget?: string;
	authenticatedRel?: string;
	interaction?: PhotonInteractionSurfaceTrigger;
	action?: PhotonInteractionActionPresentation;
	triggerSlot?: PhotonInteractionTriggerSlot;
	component?: ComponentType<PhotonSiteFrameActionComponentProps>;
};

export type PhotonSiteFrameNavigationColumn = {
	id?: string;
	title: string;
	links: PhotonSiteFrameLinkItem[];
	order?: number;
	enabled?: boolean;
	isVisible?: (context: PhotonSiteFrameExtensionContext) => boolean;
};

export type PhotonSiteFrameExtension = {
	id: string;
	label?: string;
	enabled?: boolean;
	order?: number;
	header?: {
		slots?: Partial<
			Record<
				PhotonSiteFrameHeaderSlot,
				{
					links?: PhotonSiteFrameLinkItem[];
					actions?: PhotonSiteFrameActionItem[];
				}
			>
		>;
	};
	footer?: {
		slots?: Partial<
			Record<
				PhotonSiteFrameFooterSlot,
				{
					navigationColumns?: PhotonSiteFrameNavigationColumn[];
					links?: PhotonSiteFrameLinkItem[];
				}
			>
		>;
	};
};

export type PhotonAccountTabMatch =
	| {
			type: "exact";
			href: string;
	  }
	| {
			type: "prefix";
			href: string;
	  };

export type PhotonAccountTabExtension = {
	id: string;
	label: string;
	href?: string;
	icon?: string;
	match?: PhotonAccountTabMatch;
	order?: number;
	enabled?: boolean;
};

export type PhotonWorkspaceRef = {
	profileId: string;
	branch: string;
	revisionId?: string;
	readonly?: boolean;
};

export type PhotonWorkspaceDescriptor = {
	ref: PhotonWorkspaceRef;
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

export type PhotonWorkspaceCapabilities = {
	canEdit: boolean;
	canCommit: boolean;
	canBranch: boolean;
	canMerge: boolean;
	canEditMain: boolean;
	isReadonlyRevision: boolean;
	isMainLocked: boolean;
};

export type PhotonActorSummary = {
	id: string;
	type: string;
	label: string;
	email?: string | null;
};

export type PhotonRevisionChangeSummaryItem = {
	path: string;
	action: "added" | "updated" | "removed" | "moved" | "conflicted";
	label?: string;
};

export type PhotonRevisionDescriptor = {
	id: string;
	branch: string;
	parents: string[];
	message: string;
	createdAt: string;
	actor: PhotonActorSummary;
	treeHash?: string;
	changeSummary: PhotonRevisionChangeSummaryItem[];
};

export type PhotonBranchPolicyState = {
	isMainBranch: boolean;
	isLocked: boolean;
	directWritePolicy: "allowed" | "forbidden";
	lockReason?: string | null;
	lockedAt?: string | null;
	lockedBy?: PhotonActorSummary | null;
};

export type PhotonMergeResolutionStrategy =
	| "take_source_branch"
	| "take_newest_change"
	| "manual";

export type PhotonMergeDiffItem = {
	path: string;
	nodeType: string;
	change: "added" | "updated" | "removed";
	sourceRevisionId?: string;
	targetRevisionId?: string;
};

export type PhotonMergeConflict = {
	path: string;
	nodeType: string;
	baseValue: unknown;
	sourceValue: unknown;
	targetValue: unknown;
	sourceRevisionId?: string;
	targetRevisionId?: string;
	resolution?: {
		kind: PhotonMergeResolutionStrategy;
		value?: unknown;
	};
};

export type PhotonMergePreview = {
	mergeBaseRevisionId: string;
	conflicts: PhotonMergeConflict[];
	autoResolved: PhotonMergeDiffItem[];
	cleanChanges: PhotonMergeDiffItem[];
};

export type PhotonLinkComponentProps = {
	href: string;
	locale?: string;
	className?: string;
	children?: ReactNode;
	onClick?: MouseEventHandler<HTMLElement>;
	target?: string;
	rel?: string;
	[ariaAttribute: `aria-${string}`]: string | number | boolean | undefined;
	[dataAttribute: `data-${string}`]: string | number | boolean | undefined;
};

export type PhotonLinkComponent = ComponentType<PhotonLinkComponentProps>;

export type PhotonLinkFactoryOptions = {
	locale?: string | null;
};

export type PhotonLinkFactory = (
	href: string,
	options?: PhotonLinkFactoryOptions,
) => string;

export type PhotonBlockComponentProps<
	Props extends PhotonBlockProps = PhotonBlockProps,
> = {
	block: PhotonBlock<Props>;
	renderArea?: (area: PhotonArea, index: number) => ReactNode;
};

export type PhotonBlockComponent<
	Props extends PhotonBlockProps = PhotonBlockProps,
> = {
	bivarianceHack: (props: PhotonBlockComponentProps<Props>) => ReactNode;
}["bivarianceHack"];

export type PhotonBlockInteractionSlotContext = {
	block: PhotonBlock;
	document: PhotonDocument;
	resources: PhotonResources;
	pageSettings: PhotonPageSettings;
	site: PhotonSite;
	mode: PhotonMode;
	isAdmin: boolean;
	registry: PhotonRegistry;
	siteFrameExtensions: PhotonSiteFrameExtension[];
};

export type PhotonBlockDefinition<
	Props extends PhotonBlockProps = PhotonBlockProps,
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
	defaults: PhotonBlockDefaults<Props>;
	bindings?: Record<string, PhotonFieldBinding>;
	areas?: PhotonArea[];
	fields: PhotonField[];
	localizationSchema?: PhotonBlockLocalizationSchema;
	interactionSlots?:
		| PhotonInteractionTriggerSlot[]
		| ((context: PhotonBlockInteractionSlotContext) => PhotonInteractionTriggerSlot[]);
	component: PhotonBlockComponent<Props>;
};

export type PhotonAnyBlockDefinition = PhotonBlockDefinition<any>;

export type PhotonPageSettingsPanelProps = {
	scope: PhotonPageSettingsScope;
	currentPage: PhotonPageCatalogItem | null;
	pageSettings: PhotonPageSettings;
	scopeSettings: Record<string, unknown>;
	getValue: (path: string) => unknown;
	setValue: (path: string, value: unknown) => void;
	focusField: (path: string) => void;
};

export type PhotonPageSettingsScope = "page" | "record" | "template";

export type PhotonPageSettingsPanelDefinition = {
	key: string;
	scope: PhotonPageSettingsScope;
	label: string;
	labelKey?: string;
	description?: string;
	descriptionKey?: string;
	order?: number;
	isVisible?: (context: {
		scope: PhotonPageSettingsScope;
		currentPage: PhotonPageCatalogItem | null;
		pageSettings: PhotonPageSettings;
	}) => boolean;
	component: (props: PhotonPageSettingsPanelProps) => ReactNode;
};

export type PhotonSiteSettingsPanelProps = {
	currentPage: PhotonPageCatalogItem | null;
	pageSettings: PhotonPageSettings;
	site: PhotonSite;
	scopeSettings: Record<string, unknown>;
	viewMode?: string;
	getValue: (path: string) => unknown;
	setValue: (path: string, value: unknown) => void;
	focusField: (path: string) => void;
};

export type PhotonSiteSettingsPanelDefinition = {
	key: string;
	label: string;
	labelKey?: string;
	description?: string;
	descriptionKey?: string;
	order?: number;
	isVisible?: (context: {
		currentPage: PhotonPageCatalogItem | null;
		pageSettings: PhotonPageSettings;
		site: PhotonSite;
	}) => boolean;
	component: (props: PhotonSiteSettingsPanelProps) => ReactNode;
};

export type PhotonModule = {
	module: string;
	label: string;
	labelKey?: string;
	version?: string;
	blocks: PhotonAnyBlockDefinition[];
	bindingAdapters?: PhotonBindingAdapter[];
	pageSettingsPanels?: PhotonPageSettingsPanelDefinition[];
	siteSettingsPanels?: PhotonSiteSettingsPanelDefinition[];
};

export type PhotonInstallableKit = {
	key: string;
	label: string;
	modules: PhotonModule[];
	documents?: PhotonDocumentsMap;
	siteFrameExtensions?: PhotonSiteFrameExtension[];
	accountTabs?: PhotonAccountTabExtension[];
	interactionSurfaces?: PhotonInteractionSurfaceDefinition[];
	interactionActions?: PhotonInteractionActionDefinition[];
	interactionGuards?: PhotonInteractionGuardDefinition[];
	interactionGuardEvaluators?: PhotonInteractionGuardEvaluatorMap;
};

export type PhotonRegistryEntry = PhotonModule | PhotonInstallableKit;

export type PhotonLocaleStatus = "active" | "draft" | "inactive";

export type PhotonLocaleDescriptor = {
	code: string;
	label: string;
	status: PhotonLocaleStatus;
	isDefault?: boolean;
	sortOrder?: number;
};

export type PhotonInterfaceLocaleOption = {
	code: string;
	label: string;
};

export type PhotonI18nValue = {
	defaultLocale: string;
	locale: string;
	contentLocale: string;
	interfaceLocale: string;
	interfaceLocales: PhotonInterfaceLocaleOption[];
	locales: PhotonLocaleDescriptor[];
	publicLocales: PhotonLocaleDescriptor[];
	editableLocales: PhotonLocaleDescriptor[];
	showLocaleSwitcher?: boolean;
	translate: (key: string, fallback?: string) => string;
};

export type PhotonNavigationQueryKeys = {
	mode: string;
	contentLocale: string;
	profile: string;
	branch: string;
	revision: string;
};

export type PhotonNavigationConfig = {
	adminPathPrefix?: string;
	queryKeys?: Partial<PhotonNavigationQueryKeys>;
};

export type PhotonNavigateOptions = {
	replace?: boolean;
};

export type PhotonNavigateHandler = (
	href: string,
	options?: PhotonNavigateOptions,
) => void | Promise<void>;

export type PhotonPrefetchHandler = (href: string) => void | Promise<void>;

export type PhotonAuthPageRenderInput = {
	route: string;
};

export type PhotonAuthPageRenderer = (
	input: PhotonAuthPageRenderInput,
) => ReactNode;

export type PhotonSelectedField = {
	blockId: string;
	path: string;
} | null;

export type PhotonRegistry = {
	modules: PhotonModule[];
	definitions: Map<string, PhotonAnyBlockDefinition>;
	bindingAdapters: Map<string, PhotonBindingAdapter>;
	pageSettingsPanels: PhotonPageSettingsPanelDefinition[];
	siteSettingsPanels: PhotonSiteSettingsPanelDefinition[];
	getDefinition: (
		moduleName: string,
		blockType: string,
	) => PhotonAnyBlockDefinition | undefined;
	getBindingAdapter: (key: string) => PhotonBindingAdapter | undefined;
	getPageSettingsPanels: () => PhotonPageSettingsPanelDefinition[];
	getSiteSettingsPanels: () => PhotonSiteSettingsPanelDefinition[];
	getPaletteBlocks: () => Array<
		PhotonAnyBlockDefinition & {
			module: string;
			key: string;
		}
	>;
};

export type PhotonRuntime = {
	entries: PhotonRegistryEntry[];
	registry: PhotonRegistry;
	documents: PhotonDocumentsMap;
	siteFrameExtensions: PhotonSiteFrameExtension[];
	accountTabs: PhotonAccountTabExtension[];
	interactionSurfaces: PhotonInteractionSurfaceDefinition[];
	interactionActions: PhotonInteractionActionDefinition[];
	interactionGuards: PhotonInteractionGuardDefinition[];
	interactionGuardEvaluators: PhotonInteractionGuardEvaluatorMap;
};

export type PhotonPageCatalogItem = {
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

export type PhotonResolvedPage = {
	workspace?: PhotonWorkspaceDescriptor;
	page: PhotonPageCatalogItem;
	document: PhotonDocument;
	resources: PhotonResources;
	pageSettings: PhotonPageSettings;
	runtimeData: PhotonPageRuntimeData;
	site: PhotonSite;
	pages: PhotonPageCatalogItem[];
	capabilities?: PhotonWorkspaceCapabilities;
	history?: PhotonRevisionDescriptor[];
	branchPolicy?: PhotonBranchPolicyState;
	mergePreview?: PhotonMergePreview | null;
};

export type PhotonMediaUploadInput = {
	file: File;
	documentId: string;
	blockId: string;
	path: string;
};

export type PhotonMediaUploadHandler = (
	input: PhotonMediaUploadInput,
) => Promise<PhotonMediaValue>;
