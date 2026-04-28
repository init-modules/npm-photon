import type { ComponentType, MouseEventHandler, ReactNode } from "react";
import type { PhotonFormSchemaDescriptor } from "./forms/types";

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
	| "gallery"
	| "contribution-list";

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
	/**
	 * For `kind: "contribution-list"` fields — id of the site-frame slot
	 * to display contributions for (e.g. "header.actions"). The field
	 * renderer reads the contribution registry from photon context,
	 * filters by this slot, and lists each contribution with its
	 * configurable controls.
	 */
	slotId?: string;
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

export type PhotonInteractionSurfaceEditableFieldKind = "text" | "textarea" | "select";

export type PhotonInteractionSurfaceEditableFieldOption = {
	value: string;
	label: string;
};

export type PhotonInteractionSurfaceEditableFieldInput =
	| {
			path: string;
			value: string;
			kind?: Exclude<PhotonInteractionSurfaceEditableFieldKind, "select">;
			options?: never;
			placeholder?: string;
			className?: string;
	  }
	| {
			path: string;
			value: string;
			kind: "select";
			options: readonly PhotonInteractionSurfaceEditableFieldOption[];
			placeholder?: string;
			className?: string;
	  };

export type PhotonInteractionSurfaceEditableFieldRenderer = (
	input: PhotonInteractionSurfaceEditableFieldInput,
) => ReactNode;

/**
 * Surface renderer contract.
 *
 * `previewMode` controls which surface form to render:
 * - `"runtime"` (default) — real interactive surface (e.g. open dialog).
 * - `"builder-inline"` — compact static preview suitable for inspector chips.
 * - `"builder-canvas-stage"` — full inline canvas stage with editable fields.
 *
 * In any `"builder-*"` mode the renderer MUST NOT open a real dialog/modal and
 * MUST ignore `open`/`onOpenChange`. When the mode is unknown the renderer
 * SHOULD return `null` instead of falling back to runtime — otherwise the
 * builder canvas accidentally surfaces a real popup that the user cannot close.
 *
 * `editableField` is provided by the builder canvas stage; renderers in
 * `"builder-canvas-stage"` mode use it to wrap user-editable labels into
 * inline-edit controls. Without it, render labels as plain text.
 */
export type PhotonInteractionSurfaceRendererProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	request: PhotonResolvedInteractionSurfaceRequest;
	previewMode?: "runtime" | "builder-inline" | "builder-canvas-stage";
	previewScenarioId?: string;
	editableField?: PhotonInteractionSurfaceEditableFieldRenderer;
	/**
	 * Renderers MUST call this when the surface flow finishes successfully
	 * (login OK, form submitted, search picked). Distinct from
	 * `onOpenChange(false)` which is ambiguous (cancel vs success).
	 *
	 * The runtime uses this signal to advance any pending action plan
	 * deterministically without re-evaluating conditions. Renderers that
	 * only know "I closed" should still call `onOpenChange(false)`; the
	 * runtime falls back to plan re-evaluation for backward compat.
	 */
	onComplete?: () => void;
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
	| "fallback"
	| "prerequisite-required";

/**
 * Pending continuation metadata returned when a trigger plan executed a
 * prerequisite (e.g. opened a sign-in dialog) instead of the target action.
 * The runtime stores this and re-evaluates the plan when the prereq surface
 * closes — if conditions changed, the next step (or target) is auto-executed.
 */
export type PhotonInteractionExecutionPlanMeta = {
	targetAction: PhotonInteractionActionPresentation;
	targetActionInstanceId: string;
	previousStepCount: number;
};

export type PhotonInteractionExecutionResult = {
	status: PhotonInteractionExecutionStatus;
	executed: boolean;
	reason?: string;
	action?: PhotonInteractionActionPresentation | null;
	guard?: PhotonInteractionGuardInstance;
	fallbackHref?: string;
	/**
	 * Present when a prerequisite step was executed instead of the target
	 * action. The store reads this to set up auto-continuation.
	 */
	plan?: PhotonInteractionExecutionPlanMeta;
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
	states?: PhotonActionStateDefinition[];
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

/** @deprecated Use PhotonActionPolicy. Guards remain only as a runtime compat alias. */
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
	/**
	 * @deprecated Map guards to ActionPolicy entries instead.
	 * Use interactionPolicies with condition-based prerequisites.
	 */
	guardInstanceIds?: string[];
	/** Global field overrides applied across all preview states. */
	overrides?: Record<string, unknown>;
	enabled?: boolean;
};

export type PhotonInteractionSettings = {
	actionInstances?: Record<string, PhotonInteractionActionInstance>;
	triggerBindings?: Record<string, PhotonInteractionTriggerBinding>;
	guardInstances?: Record<string, PhotonInteractionGuardInstance>;
	policies?: Record<string, PhotonActionPolicy>;
	/** Builder-only: per-slot, per-scenario field overrides for canvas stage preview. Not used by public runtime. */
	canvasStageOverrides?: Record<string, Record<string, Record<string, unknown>>>;
};

export type PhotonResolvedInteractionActionCatalog = {
	actions: PhotonInteractionActionDefinition[];
	actionsById: Map<string, PhotonInteractionActionDefinition>;
	actionInstances: Record<string, PhotonInteractionActionInstance>;
	guards: PhotonInteractionGuardDefinition[];
	guardsById: Map<string, PhotonInteractionGuardDefinition>;
	guardInstances: Record<string, PhotonInteractionGuardInstance>;
	triggerBindings: Record<string, PhotonInteractionTriggerBinding>;
	policies: PhotonActionPolicy[];
	policiesById: Map<string, PhotonActionPolicy>;
};

// --- Action Policy System ---

export type PhotonConditionResolution = "server" | "client" | "both";

export type PhotonConditionExpression =
	| { type: "ref"; conditionId: string }
	| { type: "and"; operands: PhotonConditionExpression[] }
	| { type: "or"; operands: PhotonConditionExpression[] }
	| { type: "not"; operand: PhotonConditionExpression }
	| { type: "eq"; path: string; value: string | number | boolean };

export type PhotonConditionDefinition = {
	id: string;
	packageName: string;
	label: string;
	resolution: PhotonConditionResolution;
	defaultServerPreviewStateId?: string;
};

export type PhotonSearchRuntimeState = {
	query?: string;
	results?: unknown[];
	isProviderAvailable?: boolean;
	lastError?: string | null;
};

export type PhotonConditionEvaluationContext = {
	siteSettings: PhotonSiteSettings;
	routeContext?: Record<string, unknown>;
	resources?: PhotonResources;
	searchState?: PhotonSearchRuntimeState;
};

export type PhotonConditionEvaluator = (
	context: PhotonConditionEvaluationContext,
) => boolean | null | undefined;

export type PhotonConditionEvaluatorMap = Record<
	string,
	PhotonConditionEvaluator
>;

/**
 * Cascade scope hierarchy from 6.md §Override Resolution Algorithm.
 *
 * Lower number = lower priority (broader, more general). Higher number
 * wins when contributions conflict on the same key. Within one scope:
 * explicit `priority` field wins; on tie, alphabetical `packageName`.
 *
 * The same scope ladder is reused across all layered domains: site data,
 * action instances, action policies, library references, route context
 * overrides, localized strings.
 *
 * Scope semantics:
 * - `package-default`: shipped by an installable package
 * - `site`: site-owner override across the whole site
 * - `locale`: per-locale override (e.g. ru vs en copy)
 * - `route-family`: per route-pattern family (e.g. all city pages)
 * - `route-context`: per resolved route context (e.g. specific city)
 * - `page`: per single page document
 * - `component`: per block/component instance
 * - `action-flow`: per specific action plan in flight
 * - `workspace-draft`: builder draft override (not yet published)
 * - `user-session`: per active user session (preview, A/B bucket)
 */
export type PhotonActionPolicyScope =
	| "package-default"
	| "site"
	| "locale"
	| "route-family"
	| "route-context"
	| "page"
	| "component"
	| "action-flow"
	| "workspace-draft"
	| "user-session"
	// Backward-compatible alias; new code should prefer "workspace-draft".
	| "workspace";

export type PhotonActionPolicyEnforcement = "client-hint" | "server-required";

export type PhotonActionPolicy = {
	id: string;
	packageName: string;
	targetActionId: string;
	when: PhotonConditionExpression;
	run: string;
	scope: PhotonActionPolicyScope;
	priority?: number;
	enforcement?: PhotonActionPolicyEnforcement;
	securityMode?: "fail-open" | "fail-closed";
	schemaVersion?: number;
};

export type PhotonActionStateDefinition = {
	id: string;
	label: string;
	condition?: PhotonConditionExpression;
	triggerRendererKey?: string;
	actionRendererKey?: string;
	effectKey?: string;
	isDefaultServerState?: boolean;
};

export type PhotonActionPlanStep = {
	actionInstanceId: string;
	policyId: string;
};

export type PhotonActionPlan = {
	targetActionInstanceId: string;
	steps: PhotonActionPlanStep[];
	hasCycles: boolean;
	warnings: string[];
};

export type PhotonActionPlanExecutionStatus =
	| "completed"
	| "cancelled"
	| "blocked"
	| "failed"
	| "missing-action"
	| "missing-evaluator"
	| "cycle-detected";

export type PhotonActionPlanResult = {
	status: PhotonActionPlanExecutionStatus;
	completedSteps: string[];
	cancelledAt?: string;
	warnings: string[];
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

export type PhotonStudioSurfaceMode =
	| "canvas"
	| "settings"
	| "interactions"
	| "data";

export type PhotonStudioPaletteTab = "blocks" | "library";

export type PhotonStudioInteractionTab =
	| "actions"
	| "policies"
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
	policy?: string;
	scenario?: string;
	block?: string;
	trigger?: string;
	/** Canvas stage open for this trigger slot id (separate from inspector trigger tab). */
	canvasTrigger?: string;
	paletteTab?: PhotonStudioPaletteTab;
	library?: string;
	dataField?: string;
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
	/**
	 * Per-field localization overrides for this specific block instance.
	 * Keys are field paths (matching `PhotonField.path`). Values override
	 * both the kind-default ("text" → localized, "image" → shared) and the
	 * block schema's `PhotonBlockLocalizationSchema`. Resolved through
	 * `resolvePhotonBlockFieldLocalization`.
	 */
	localization?: Record<string, PhotonFieldLocalization>;
};

export type PhotonDocument = {
	id: string;
	name: string;
	route: string;
	routePatterns?: string[];
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
	/**
	 * Preview-only scenarios for builder canvas state-switcher.
	 * Used when the block has no condition-based runtime states but the
	 * builder still wants to preview different visual variants (e.g. empty,
	 * filled, error). Resolution priority: builder preview override > first scenario.
	 */
	previewScenarios?: PhotonInteractionPreviewScenario[];
	/**
	 * Condition-driven runtime states. The first state whose `condition`
	 * evaluates `true` (in evaluator order) becomes the active state at runtime.
	 * Use `isDefaultServerState` to mark the SSR fallback when client-only
	 * conditions are unresolved. The block component reads the active state via
	 * `usePhotonBlockActiveState(blockId)`.
	 */
	states?: PhotonActionStateDefinition[];
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
	interactionPolicies?: PhotonActionPolicy[];
	conditionDefinitions?: PhotonConditionDefinition[];
	conditionEvaluators?: PhotonConditionEvaluatorMap;
	siteDataSchemas?: PhotonSiteDataSchema[];
	routeContextFields?: PhotonRouteContextField[];
	formSchemas?: PhotonFormSchemaDescriptor[];
};

// --- Site Data ---

export type PhotonSiteDataFieldKind =
	| "text"
	| "textarea"
	| "url"
	| "email"
	| "phone"
	| "number"
	| "toggle";

export type PhotonSiteDataField = {
	path: string;
	label: string;
	kind: PhotonSiteDataFieldKind;
	description?: string;
	defaultValue?: unknown;
	group?: "content" | "contact" | "social" | "advanced";
};

export type PhotonSiteDataSchema = {
	id: string;
	packageName: string;
	label: string;
	description?: string;
	fields: PhotonSiteDataField[];
};

export type PhotonResolvedSiteData = {
	schemas: PhotonSiteDataSchema[];
	schemasById: Map<string, PhotonSiteDataSchema>;
	values: Record<string, Record<string, unknown>>;
};

export type PhotonSiteDataBinding = {
	schemaId: string;
	fieldPath: string;
};

// --- Route Context ---

export type PhotonRouteContextFieldKind = "text" | "number" | "enum";

export type PhotonRouteContextField = {
	path: string;
	label: string;
	kind: PhotonRouteContextFieldKind;
	description?: string;
	defaultValue?: string | number;
	urlParam?: string;
	enumValues?: string[];
	packageName: string;
};

// --- Form Schemas (re-exports from forms/types for kit contributions) ---

export type {
	PhotonFormSchemaDescriptor,
	PhotonFormFieldDefinition,
	PhotonFormFieldType,
	PhotonFormDefinition,
	PhotonFormPolicy,
	PhotonFormFieldOption,
	PhotonFormFieldValidation,
	PhotonFormFieldWidth,
	PhotonFormMode,
	PhotonFormValues,
	PhotonResolvedFormField,
} from "./forms/types";

export type PhotonResolvedRouteContext = {
	fields: PhotonRouteContextField[];
	fieldsByPath: Map<string, PhotonRouteContextField>;
	values: Record<string, unknown>;
	matchedPattern: string | null;
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
	interactionPolicies: PhotonActionPolicy[];
	conditionDefinitions: PhotonConditionDefinition[];
	conditionEvaluators: PhotonConditionEvaluatorMap;
	siteDataSchemas: PhotonSiteDataSchema[];
	routeContextFields: PhotonRouteContextField[];
	formSchemas: PhotonFormSchemaDescriptor[];
};

export type PhotonPageCatalogItem = {
	key: string;
	name: string;
	description?: string | null;
	group?: string | null;
	kind: "page" | "template";
	route: string;
	routePattern?: string | null;
	routePatterns?: string[];
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
