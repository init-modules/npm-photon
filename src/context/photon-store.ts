"use client";

import { createStore, type StoreApi } from "zustand/vanilla";
import { createPhotonBlock } from "../helpers/document";
import {
	clonePhotonValue,
	getValueAtPath,
	setValueAtPath,
} from "../helpers/path";
import {
	composePhotonSurfaceDocument,
	decomposePhotonSurfaceDocument,
	getFirstPhotonSurfaceEditableBlockId,
	getPhotonSurfaceRegionListId,
	PHOTON_PAGE_SURFACE_REGION_KEY,
} from "../helpers/site";
import {
	collectBlockIds,
	duplicatePhotonBlockInDocument,
	findPhotonBlock,
	insertPhotonBlocksInDocument,
	insertPhotonBlockInDocument,
	movePhotonBlockInDocument,
	removePhotonBlockFromDocument,
	replacePhotonBlockWithBlocksInDocument,
	updatePhotonBlockInDocument,
} from "../helpers/tree";
import {
	PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY,
	clonePhotonComponentLibraryBlocksForCopy,
	collectPhotonComponentLibraryUsages,
	createPhotonComponentLibraryItemFromBlock,
	createPhotonComponentLibraryBlockId,
	createPhotonComponentReferenceBlock,
	duplicatePhotonComponentLibraryItem,
	getPhotonComponentLibraryItems,
	isPhotonComponentReferenceBlock,
	parsePhotonComponentLibraryBlockId,
	readPhotonComponentLibrarySettings,
} from "../helpers/component-library";
import {
	executePhotonInteractionActionPresentation,
	executePhotonInteractionTriggerSlot,
	photonInteractionExecutionSucceeded,
	planPhotonInteractionTriggerSlot,
	resolvePhotonInteractionActionCatalog,
} from "../helpers/interactions";
import {
	canEditPhotonWorkspace,
	normalizePhotonWorkspaceCapabilities,
	normalizePhotonWorkspaceDescriptor,
} from "../helpers/workspace";
import {
	resolvePhotonInteractionSurfaceCatalog,
	resolvePhotonInteractionSurfaceRequest,
	resolvePhotonInteractionToastTemplate,
} from "../helpers/interaction-surfaces";
import type {
	PhotonAccountTabExtension,
	PhotonActionPolicy,
	PhotonBlock,
	PhotonConditionDefinition,
	PhotonConditionEvaluatorMap,
	PhotonFormSchemaDescriptor,
	PhotonRouteContextField,
	PhotonSiteDataSchema,
	PhotonDocument,
	PhotonFieldBinding,
	PhotonInteractionActionDefinition,
	PhotonInteractionActionPresentation,
	PhotonInteractionExecutionResult,
	PhotonInteractionGuardDefinition,
	PhotonInteractionGuardEvaluatorMap,
	PhotonInteractionPreviewScenario,
	PhotonInteractionSurfaceDefinition,
	PhotonInteractionSurfaceOpenHandler,
	PhotonInteractionSurfaceRendererMap,
	PhotonInteractionToastHandler,
	PhotonInteractionToastTemplate,
	PhotonInteractionTriggerSlot,
	PhotonLinkComponent,
	PhotonLinkFactory,
	PhotonMediaUploadHandler,
	PhotonMode,
	PhotonNavigateHandler,
	PhotonNavigationConfig,
	PhotonPageSettings,
	PhotonPrefetchHandler,
	PhotonRegistry,
	PhotonResources,
	PhotonSearchHandler,
	PhotonSelectedField,
	PhotonSite,
	PhotonSiteFrameExtension,
	PhotonComponentLibraryItem,
	PhotonComponentLibrarySourceSelection,
	PhotonWorkspaceCapabilities,
	PhotonWorkspaceDescriptor,
} from "../types";

export type InsertBlockInput = {
	module: string;
	type: string;
	listId?: string;
	index?: number;
};

export type PhotonStoreState = {
	document: PhotonDocument;
	resources: PhotonResources;
	pageSettings: PhotonPageSettings;
	site: PhotonSite;
	workspace: PhotonWorkspaceDescriptor;
	capabilities: PhotonWorkspaceCapabilities;
	initialDocument: PhotonDocument;
	initialResources: PhotonResources;
	initialPageSettings: PhotonPageSettings;
	initialSite: PhotonSite;
	initialWorkspace: PhotonWorkspaceDescriptor;
	initialCapabilities: PhotonWorkspaceCapabilities;
	registry: PhotonRegistry;
	mode: PhotonMode;
	isAdmin: boolean;
	selectedBlockId: string | null;
	selectedComponentLibrarySource: PhotonComponentLibrarySourceSelection | null;
	selectedField: PhotonSelectedField;
	selectedInspectorTriggerId: string | null;
	selectedCanvasTriggerStageId: string | null;
	/** Builder-only: per-block preview scenario/state override for canvas state-switcher. Not persisted to site settings. */
	blockPreviewScenarios: Record<string, string>;
	/**
	 * Pending action plan continuation. Set when a trigger executes a
	 * prerequisite (e.g. opens sign-in dialog) instead of the target action.
	 * The store re-evaluates the plan when the prerequisite surface closes:
	 * if conditions changed (plan shrunk), the next step or target is auto-executed.
	 * If no progress, the pending plan is cleared (user backed out).
	 */
	pendingActionPlan: {
		targetAction: PhotonInteractionActionPresentation;
		targetActionInstanceId: string;
		previousStepCount: number;
		slot: PhotonInteractionTriggerSlot | null;
	} | null;
	/**
	 * The interaction action instance id that the builder requested to be
	 * focused for editing (e.g. via "Open instance" link inside an action
	 * flow row). `interaction-surfaces-surface` reads this to scroll/highlight
	 * the matching instance editor. Cleared when null.
	 */
	selectedInteractionInstanceId: string | null;
	uploadMedia?: PhotonMediaUploadHandler;
	searchSite?: PhotonSearchHandler;
	requestAuth?: () => void;
	requestAuthAction?: PhotonInteractionActionPresentation;
	requestAuthFallback?: () => void;
	openInteractionSurface: PhotonInteractionSurfaceOpenHandler;
	showInteractionToast: PhotonInteractionToastHandler;
	executeInteractionAction: (
		action: PhotonInteractionActionPresentation | undefined | null,
	) => PhotonInteractionExecutionResult;
	executeInteractionTriggerSlot: (
		slot: PhotonInteractionTriggerSlot,
		options?: {
			scenarioId?: string | null;
			scenario?: PhotonInteractionPreviewScenario | null;
		},
	) => PhotonInteractionExecutionResult;
	closeInteractionSurface: () => void;
	/**
	 * Surface explicitly signals success completion (e.g. login OK, form
	 * submitted). The runtime advances any pending action plan: target
	 * action runs immediately if remaining plan is empty, next prereq
	 * runs otherwise. Use this instead of `closeInteractionSurface`
	 * whenever the surface knows it succeeded.
	 */
	completeInteractionSurface: () => void;
	navigate?: PhotonNavigateHandler;
	prefetch?: PhotonPrefetchHandler;
	linkComponent: PhotonLinkComponent;
	linkFactory: PhotonLinkFactory;
	navigation: PhotonNavigationConfig;
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
	routeContextValues: Record<string, unknown>;
	formSchemas: PhotonFormSchemaDescriptor[];
	interactionSurfaceRenderers: PhotonInteractionSurfaceRendererMap;
	activeInteractionSurface: ReturnType<
		typeof resolvePhotonInteractionSurfaceRequest
	>;
	contentLocale: string;
	defaultLocale: string;
	contentRevision: number;
	collapsedBlockIds: Record<string, true>;
	setMode: (nextMode: PhotonMode) => void;
	selectBlock: (blockId: string | null) => void;
	selectField: (blockId: string, path: string) => void;
	selectInspectorTrigger: (triggerId: string | null) => void;
	selectCanvasTriggerStage: (triggerId: string | null) => void;
	setBlockPreviewScenario: (
		blockId: string,
		scenarioId: string | null,
	) => void;
	selectInteractionInstance: (instanceId: string | null) => void;
	clearSelectedField: () => void;
	selectPageSettingField: (path: string) => void;
	selectSiteSettingField: (path: string) => void;
	updateFieldValue: (blockId: string, path: string, value: unknown) => void;
	getFieldValue: (blockId: string, path: string) => unknown;
	/**
	 * Sets or clears a field-level binding on a block. When `binding` is
	 * non-null the field's runtime value resolves from the bound source
	 * (e.g. `{ source: "site-data", path: "brand.name" }`). When `null`
	 * the binding is removed and the field falls back to its block prop value.
	 *
	 * Distinct from `updateFieldValue`, which writes the literal value
	 * (or a `{{ template }}` string for substitution mode). Binding mode
	 * is an object-level link — the picker emits a `PhotonFieldBinding`
	 * directly so non-string fields can also reference shared data.
	 */
	setFieldBinding: (
		blockId: string,
		path: string,
		binding: PhotonFieldBinding | null,
	) => void;
	/**
	 * Set or clear a per-field localization override on a block instance.
	 * `target = null` removes the override (revert to schema/kind default).
	 * Mirrors `setFieldBinding`. See
	 * `resolvePhotonBlockFieldLocalization` for resolution priority.
	 */
	setBlockFieldLocalization: (
		blockId: string,
		path: string,
		target: "localized" | "shared" | null,
	) => void;
	updatePageSettingValue: (path: string, value: unknown) => void;
	getPageSettingValue: (path: string) => unknown;
	updateSiteSettingValue: (path: string, value: unknown) => void;
	getSiteSettingValue: (path: string) => unknown;
	getFieldBinding: (blockId: string, path: string) => PhotonFieldBinding | null;
	insertBlock: (input: InsertBlockInput) => void;
	duplicateBlock: (blockId: string) => void;
	removeBlock: (blockId: string) => void;
	moveBlock: (
		activeBlockId: string,
		targetListId: string,
		targetIndex: number,
	) => void;
	createComponentLibraryItemFromBlock: (blockId: string) => void;
	insertComponentLibraryReference: (
		itemId: string,
		listId?: string,
		index?: number,
	) => void;
	insertComponentLibraryCopy: (
		itemId: string,
		listId?: string,
		index?: number,
	) => void;
	detachComponentReference: (blockId: string) => void;
	selectComponentLibrarySource: (itemId: string) => void;
	duplicateComponentLibraryItem: (itemId: string) => void;
	deleteComponentLibraryItem: (
		itemId: string,
		options?: { detachUsages?: boolean; force?: boolean },
	) => boolean;
	updateComponentLibraryItem: (
		itemId: string,
		updater: (item: PhotonComponentLibraryItem) => PhotonComponentLibraryItem,
	) => void;
	replaceState: (
		nextDocument: PhotonDocument,
		nextResources?: PhotonResources,
		nextPageSettings?: PhotonPageSettings,
		nextSite?: PhotonSite,
		options?: {
			workspace?: PhotonWorkspaceDescriptor;
			capabilities?: Partial<PhotonWorkspaceCapabilities>;
		},
	) => void;
	syncExternalState: (input: {
		initialDocument: PhotonDocument;
		initialResources?: PhotonResources;
		initialPageSettings?: PhotonPageSettings;
		initialSite?: PhotonSite;
		workspace?: PhotonWorkspaceDescriptor;
		capabilities?: Partial<PhotonWorkspaceCapabilities>;
	}) => void;
	resetDocument: () => void;
	/**
	 * Updates non-block document metadata (route patterns, name, route).
	 * Block content goes through `updateFieldValue` / `insertBlock` etc.
	 *
	 * Pass partial updates; omit fields to leave them unchanged. Pass
	 * `routePatterns: undefined` to clear the patterns array entirely.
	 */
	updateDocumentMetadata: (
		patch: Partial<Pick<PhotonDocument, "routePatterns" | "name" | "route">>,
	) => void;
	toggleBlockCollapse: (blockId: string) => void;
	collapseAllBlocks: () => void;
	expandAllBlocks: () => void;
};

export type PhotonStore = StoreApi<PhotonStoreState>;

export type PhotonStoreInit = {
	initialDocument: PhotonDocument;
	initialResources?: PhotonResources;
	initialPageSettings?: PhotonPageSettings;
	initialSite?: PhotonSite;
	registry: PhotonRegistry;
	workspace?: PhotonWorkspaceDescriptor;
	capabilities?: Partial<PhotonWorkspaceCapabilities>;
	initialMode?: PhotonMode;
	isAdmin?: boolean;
	uploadMedia?: PhotonMediaUploadHandler;
	searchSite?: PhotonSearchHandler;
	requestAuth?: () => void;
	requestAuthAction?: PhotonInteractionActionPresentation;
	interactionSurfaces?: PhotonInteractionSurfaceDefinition[];
	interactionActions?: PhotonInteractionActionDefinition[];
	interactionGuards?: PhotonInteractionGuardDefinition[];
	interactionGuardEvaluators?: PhotonInteractionGuardEvaluatorMap;
	interactionPolicies?: PhotonActionPolicy[];
	conditionDefinitions?: PhotonConditionDefinition[];
	conditionEvaluators?: PhotonConditionEvaluatorMap;
	siteDataSchemas?: PhotonSiteDataSchema[];
	routeContextFields?: PhotonRouteContextField[];
	routeContextValues?: Record<string, unknown>;
	formSchemas?: PhotonFormSchemaDescriptor[];
	interactionSurfaceRenderers?: PhotonInteractionSurfaceRendererMap;
	dispatchInteractionToast?: (template: PhotonInteractionToastTemplate) => void;
	navigate?: PhotonNavigateHandler;
	prefetch?: PhotonPrefetchHandler;
	linkComponent: PhotonLinkComponent;
	linkFactory?: PhotonLinkFactory;
	navigation?: PhotonNavigationConfig;
	siteFrameExtensions?: PhotonSiteFrameExtension[];
	accountTabs?: PhotonAccountTabExtension[];
	i18n?: {
		contentLocale?: string;
		defaultLocale?: string;
	};
};

const PAGE_SETTINGS_FIELD_SCOPE = "__page_settings__";
const SITE_SETTINGS_FIELD_SCOPE = "__site_settings__";

const normalizePhotonMode = (mode: PhotonMode, isAdmin: boolean): PhotonMode =>
	isAdmin ? mode : "preview";

const canMutatePhotonState = (state: PhotonStoreState) =>
	state.isAdmin && canEditPhotonWorkspace(state.workspace, state.capabilities);

const readBindingValue = (
	registry: PhotonRegistry,
	binding: PhotonFieldBinding,
	value: unknown,
): unknown => {
	const adapter = binding.adapter
		? registry.getBindingAdapter(binding.adapter)
		: undefined;

	return adapter?.read ? adapter.read(value) : value;
};

const writeBindingValue = (
	registry: PhotonRegistry,
	binding: PhotonFieldBinding,
	value: unknown,
): unknown => {
	const adapter = binding.adapter
		? registry.getBindingAdapter(binding.adapter)
		: undefined;

	return adapter?.write ? adapter.write(value) : value;
};

const arePhotonValuesEqual = (left: unknown, right: unknown) => {
	if (Object.is(left, right)) {
		return true;
	}

	try {
		return JSON.stringify(left) === JSON.stringify(right);
	} catch {
		return false;
	}
};

const followInteractionSurfaceFallback = (
	fallbackHref: string | undefined,
	navigate: PhotonNavigateHandler | undefined,
) => {
	if (!fallbackHref) {
		return;
	}

	if (navigate) {
		void navigate(fallbackHref);
	} else if (typeof window !== "undefined") {
		window.location.assign(fallbackHref);
	}
};

/**
 * Continuation helper used by `completeInteractionSurface` (explicit
 * success). Re-evaluates the pending action plan and either advances
 * to the next prereq, executes the target action, or clears the
 * pending plan based on plan delta.
 *
 * `closeInteractionSurface` is now strict-clear (cancellation): foundation
 * surface renderers (auth/search) call `onComplete()` on success and
 * `onOpenChange(false)` only on dismissal. External renderers that have
 * not migrated should also wire `onComplete` for chain continuation.
 */
const advancePendingActionPlanAfterSurfaceTransition = ({
	get,
	set,
}: {
	get: () => PhotonStoreState;
	set: (
		partial:
			| Partial<PhotonStoreState>
			| ((state: PhotonStoreState) => Partial<PhotonStoreState>),
	) => void;
}) => {
	const state = get();
	const pending = state.pendingActionPlan;
	set({ activeInteractionSurface: null });

	if (!pending) {
		return;
	}

	const catalog = resolvePhotonInteractionActionCatalog({
		actions: state.interactionActions,
		guards: state.interactionGuards,
		surfaces: state.interactionSurfaces,
		policies: state.interactionPolicies,
		siteSettings: state.site.settings,
	});

	const refreshedPlan = pending.slot
		? planPhotonInteractionTriggerSlot({
				slot: pending.slot,
				catalog,
				conditionEvaluators: state.conditionEvaluators,
				conditionContext: {
					siteSettings: state.site.settings,
					resources: state.resources,
					routeContext: state.routeContextValues,
				},
			})
		: null;

	if (!refreshedPlan) {
		set({ pendingActionPlan: null });
		return;
	}

	if (refreshedPlan.steps.length === 0) {
		set({ pendingActionPlan: null });
		get().executeInteractionAction(pending.targetAction);
		return;
	}

	const planShrunk = refreshedPlan.steps.length < pending.previousStepCount;

	if (planShrunk) {
		const nextStep = refreshedPlan.steps[0];
		const nextPresentation =
			catalog.actionInstances[nextStep.actionInstanceId]?.presentation;
		if (nextPresentation) {
			set({
				pendingActionPlan: {
					...pending,
					previousStepCount: refreshedPlan.steps.length,
				},
			});
			get().executeInteractionAction(nextPresentation);
			return;
		}
		set({ pendingActionPlan: null });
		return;
	}

	// Plan unchanged ⇒ user did not progress. Both `close` and `complete`
	// without progress mean the chain is over.
	set({ pendingActionPlan: null });
};

export const getPhotonSelectedBlock = (
	state: PhotonStoreState,
): PhotonBlock | null =>
	state.selectedBlockId
		? findPhotonBlock(state.document.blocks, state.selectedBlockId) ??
			getPhotonComponentLibrarySourceBlock(state, state.selectedBlockId)?.block ??
			null
		: null;

const getPhotonComponentLibrarySourceBlock = (
	state: PhotonStoreState,
	blockId: string,
): { item: PhotonComponentLibraryItem; block: PhotonBlock } | null => {
	const parsed = parsePhotonComponentLibraryBlockId(blockId);

	if (!parsed) {
		return null;
	}

	const item = getPhotonComponentLibraryItems(state.site.settings)[parsed.itemId];
	const block = item
		? findPhotonBlock(item.blocks, parsed.sourceBlockId)
		: null;

	return item && block ? { item, block } : null;
};

const persistPhotonComponentLibraryItem = (
	state: PhotonStoreState,
	item: PhotonComponentLibraryItem,
) => {
	const settings = readPhotonComponentLibrarySettings(state.site.settings);

	return {
		...state.site,
		settings: setValueAtPath(
			state.site.settings,
			`${PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY}.items`,
			{
				...(settings.items ?? {}),
				[item.id]: {
					...item,
					updatedAt: new Date().toISOString(),
				},
			},
		),
	};
};

export const getPhotonFieldBinding = (
	state: PhotonStoreState,
	blockId: string,
	path: string,
): PhotonFieldBinding | null => {
	const block =
		findPhotonBlock(state.document.blocks, blockId) ??
		getPhotonComponentLibrarySourceBlock(state, blockId)?.block;

	if (!block?.bindings) {
		return null;
	}

	const exactBinding = block.bindings[path];

	if (exactBinding) {
		return exactBinding;
	}

	const prefixMatch = Object.entries(block.bindings)
		.filter(([bindingPath]) => path.startsWith(`${bindingPath}.`))
		.sort(([leftPath], [rightPath]) => rightPath.length - leftPath.length)[0];

	if (!prefixMatch) {
		return null;
	}

	const [bindingPath, binding] = prefixMatch;
	const suffix = path.slice(bindingPath.length + 1);
	const sourcePath = binding.path ? `${binding.path}.${suffix}` : suffix;

	return {
		...binding,
		path: sourcePath,
	};
};

export const getPhotonFieldValue = (
	state: PhotonStoreState,
	blockId: string,
	path: string,
): unknown => {
	const block =
		findPhotonBlock(state.document.blocks, blockId) ??
		getPhotonComponentLibrarySourceBlock(state, blockId)?.block;

	if (!block) {
		return null;
	}

	const binding = getPhotonFieldBinding(state, blockId, path);

	if (binding && binding.source in state.resources) {
		const resourceValue = getValueAtPath(
			(state.resources[binding.source] as Record<string, unknown>) ?? {},
			binding.path,
		);

		return readBindingValue(state.registry, binding, resourceValue);
	}

	return getValueAtPath(block.props, path);
};

export const getPhotonPageSettingValue = (
	state: PhotonStoreState,
	path: string,
) => getValueAtPath(state.pageSettings, path);

export const getPhotonSiteSettingValue = (
	state: PhotonStoreState,
	path: string,
) => getValueAtPath(state.site.settings, path);

export const getPhotonPersistedState = (
	state: Pick<
		PhotonStoreState,
		"document" | "resources" | "pageSettings" | "site"
	>,
) => {
	const persistedState = decomposePhotonSurfaceDocument(
		state.document,
		state.site,
	);

	return {
		document: persistedState.pageDocument,
		resources: state.resources,
		pageSettings: state.pageSettings,
		site: persistedState.site,
	};
};

const bumpContentRevision = (state: PhotonStoreState) =>
	state.contentRevision + 1;

export const createPhotonStore = ({
	initialDocument,
	initialResources = {},
	initialPageSettings = {},
	initialSite = {
		settings: {},
		regions: {},
	},
	registry,
	workspace,
	capabilities,
	initialMode = "preview",
	isAdmin = false,
	uploadMedia,
	searchSite,
	requestAuth,
	requestAuthAction,
		interactionSurfaces = [],
		interactionActions = [],
		interactionGuards = [],
		interactionGuardEvaluators = {},
		interactionPolicies = [],
		conditionDefinitions = [],
		conditionEvaluators = {},
		siteDataSchemas = [],
		routeContextFields = [],
		routeContextValues = {},
		formSchemas = [],
		interactionSurfaceRenderers = {},
	dispatchInteractionToast,
	navigate,
	prefetch,
	linkComponent,
	linkFactory = (href) => href,
	navigation = {},
	siteFrameExtensions = [],
	accountTabs = [],
	i18n,
}: PhotonStoreInit): PhotonStore => {
	const initialSurfaceDocument = composePhotonSurfaceDocument(
		initialDocument,
		initialSite,
	);
	const initialWorkspace = normalizePhotonWorkspaceDescriptor(workspace);
	const initialWorkspaceCapabilities =
		normalizePhotonWorkspaceCapabilities(capabilities);
	const defaultLocale = i18n?.defaultLocale?.trim().toLowerCase() || "en";
	const contentLocale =
		i18n?.contentLocale?.trim().toLowerCase() || defaultLocale;

	return createStore<PhotonStoreState>()((set, get) => ({
		document: clonePhotonValue(initialSurfaceDocument),
		resources: clonePhotonValue(initialResources),
		pageSettings: clonePhotonValue(initialPageSettings),
		site: clonePhotonValue(initialSite),
		workspace: initialWorkspace,
		capabilities: initialWorkspaceCapabilities,
		initialDocument: clonePhotonValue(initialDocument),
		initialResources: clonePhotonValue(initialResources),
		initialPageSettings: clonePhotonValue(initialPageSettings),
		initialSite: clonePhotonValue(initialSite),
		initialWorkspace: clonePhotonValue(initialWorkspace),
		initialCapabilities: clonePhotonValue(initialWorkspaceCapabilities),
		registry,
		mode: normalizePhotonMode(initialMode, isAdmin),
		isAdmin,
		selectedBlockId: getFirstPhotonSurfaceEditableBlockId(
			initialSurfaceDocument,
		),
		selectedComponentLibrarySource: null,
		selectedField: null,
		selectedInspectorTriggerId: null,
		selectedCanvasTriggerStageId: null,
		blockPreviewScenarios: {},
		pendingActionPlan: null,
		selectedInteractionInstanceId: null,
		uploadMedia,
		searchSite,
		requestAuthAction,
		requestAuthFallback: requestAuth,
		requestAuth: () => {
			const state = get();
			const executedAction = state.executeInteractionAction(
				state.requestAuthAction,
			);

			if (photonInteractionExecutionSucceeded(executedAction)) {
				return;
			}

			if (state.requestAuthFallback) {
				state.requestAuthFallback();
			}
		},
		activeInteractionSurface: null,
		interactionSurfaces,
		interactionActions,
		interactionGuards,
		interactionGuardEvaluators,
		interactionPolicies,
		conditionDefinitions,
		conditionEvaluators,
		siteDataSchemas,
			routeContextFields,
			routeContextValues,
			formSchemas,
			interactionSurfaceRenderers,
		navigate,
		prefetch,
		linkComponent,
		linkFactory,
		navigation: clonePhotonValue(navigation),
		siteFrameExtensions,
		accountTabs: clonePhotonValue(accountTabs),
		contentLocale,
		defaultLocale,
		contentRevision: 0,
		collapsedBlockIds: {},
		setMode: (nextMode) => {
			set((state) => ({
				mode: normalizePhotonMode(nextMode, state.isAdmin),
			}));
		},
			showInteractionToast: (input) => {
				const state = get();
			const catalog = resolvePhotonInteractionSurfaceCatalog({
				definitions: state.interactionSurfaces,
				siteSettings: state.site.settings,
			});
			const template = resolvePhotonInteractionToastTemplate(input, catalog);

			if (!template) {
				return false;
			}

				dispatchInteractionToast?.(template);
				return true;
			},
			executeInteractionAction: (action) => {
				const state = get();

				return executePhotonInteractionActionPresentation(action, {
					openInteractionSurface: state.openInteractionSurface,
					showInteractionToast: state.showInteractionToast,
					navigate: state.navigate,
				});
			},
			executeInteractionTriggerSlot: (slot, options) => {
				const state = get();
				const catalog = resolvePhotonInteractionActionCatalog({
					actions: state.interactionActions,
					guards: state.interactionGuards,
					surfaces: state.interactionSurfaces,
					policies: state.interactionPolicies,
					siteSettings: state.site.settings,
				});
				const scenarioResources = options?.scenario?.resources;
				const resources = scenarioResources
					? {
							...state.resources,
							...clonePhotonValue(scenarioResources),
						}
					: state.resources;

				const result = executePhotonInteractionTriggerSlot({
					slot,
					catalog,
					evaluators: state.interactionGuardEvaluators,
					conditionEvaluators: state.conditionEvaluators,
					conditionContext: {
						siteSettings: state.site.settings,
						resources,
						routeContext: state.routeContextValues,
					},
					context: {
						document: state.document,
						resources,
						pageSettings: state.pageSettings,
						site: state.site,
						mode: state.mode,
						isAdmin: state.isAdmin,
						scenarioId: options?.scenario?.id ?? options?.scenarioId,
					},
					handlers: {
						openInteractionSurface: state.openInteractionSurface,
						showInteractionToast: state.showInteractionToast,
						navigate: state.navigate,
					},
				});

				if (result.plan) {
					set({
						pendingActionPlan: {
							targetAction: result.plan.targetAction,
							targetActionInstanceId: result.plan.targetActionInstanceId,
							previousStepCount: result.plan.previousStepCount,
							slot,
						},
					});
				} else if (result.executed) {
					// Target executed (or final step), no continuation needed.
					set({ pendingActionPlan: null });
				}

				return result;
			},
			openInteractionSurface: (trigger) => {
			const state = get();
			const catalog = resolvePhotonInteractionSurfaceCatalog({
				definitions: state.interactionSurfaces,
				siteSettings: state.site.settings,
			});
				const request = resolvePhotonInteractionSurfaceRequest(trigger, catalog);

				if (!request) {
					return false;
				}

			if (request.definition.kind === "toast") {
				return state.showInteractionToast({
					templateId: request.instance.id,
					overrides: {
						title:
							typeof request.props.title === "string"
								? request.props.title
								: undefined,
						description:
							typeof request.props.description === "string"
								? request.props.description
								: undefined,
						status:
							typeof request.props.status === "string"
								? (request.props.status as never)
								: undefined,
						props: request.props,
					},
					});
				}

				if (!state.interactionSurfaceRenderers[request.definition.rendererKey]) {
					return false;
				}

				set({ activeInteractionSurface: request });
				return true;
			},
		closeInteractionSurface: () => {
			set({
				activeInteractionSurface: null,
				pendingActionPlan: null,
			});
		},
		completeInteractionSurface: () => {
			advancePendingActionPlanAfterSurfaceTransition({ get, set });
		},
		selectBlock: (blockId) => {
			set((state) => ({
				selectedBlockId: blockId,
				selectedComponentLibrarySource: null,
				selectedField: blockId ? state.selectedField : null,
				selectedInspectorTriggerId:
					blockId === state.selectedBlockId
						? state.selectedInspectorTriggerId
						: null,
				selectedCanvasTriggerStageId:
					blockId === state.selectedBlockId
						? state.selectedCanvasTriggerStageId
						: null,
			}));
		},
		selectField: (blockId, path) => {
			set({
				selectedBlockId: blockId,
				selectedComponentLibrarySource: null,
				selectedField: { blockId, path },
			});
		},
		selectInspectorTrigger: (triggerId) => {
			set({ selectedInspectorTriggerId: triggerId });
		},
		selectCanvasTriggerStage: (triggerId) => {
			set({ selectedCanvasTriggerStageId: triggerId });
		},
		selectInteractionInstance: (instanceId) => {
			set((state) => {
				if (state.selectedInteractionInstanceId === instanceId) {
					return state;
				}
				return { selectedInteractionInstanceId: instanceId };
			});
		},
		setBlockPreviewScenario: (blockId, scenarioId) => {
			set((state) => {
				if (!scenarioId) {
					if (!(blockId in state.blockPreviewScenarios)) {
						return state;
					}
					const { [blockId]: _removed, ...rest } = state.blockPreviewScenarios;
					return { blockPreviewScenarios: rest };
				}
				if (state.blockPreviewScenarios[blockId] === scenarioId) {
					return state;
				}
				return {
					blockPreviewScenarios: {
						...state.blockPreviewScenarios,
						[blockId]: scenarioId,
					},
				};
			});
		},
		clearSelectedField: () => {
			set({
				selectedField: null,
			});
		},
		selectPageSettingField: (path) => {
			set({
				selectedBlockId: null,
				selectedComponentLibrarySource: null,
				selectedField: {
					blockId: PAGE_SETTINGS_FIELD_SCOPE,
					path,
				},
			});
		},
		selectSiteSettingField: (path) => {
			set({
				selectedBlockId: null,
				selectedComponentLibrarySource: null,
				selectedField: {
					blockId: SITE_SETTINGS_FIELD_SCOPE,
					path,
				},
			});
		},
		updateFieldValue: (blockId, path, value) => {
			const state = get();
			const currentValue = getPhotonFieldValue(state, blockId, path);

			if (
				!canMutatePhotonState(state) ||
				arePhotonValuesEqual(currentValue, value)
			) {
				return;
			}

			const binding = getPhotonFieldBinding(state, blockId, path);

			if (binding && binding.mode !== "read") {
				set((currentState) => ({
					resources: {
						...currentState.resources,
						[binding.source]: setValueAtPath(
							((currentState.resources[binding.source] as Record<
								string,
								unknown
							>) ?? {}) as Record<string, unknown>,
							binding.path,
							writeBindingValue(currentState.registry, binding, value),
						),
					},
					contentRevision: bumpContentRevision(currentState),
				}));

				return;
			}

			const componentSource = getPhotonComponentLibrarySourceBlock(
				state,
				blockId,
			);

			if (componentSource) {
				set((currentState) => {
					const currentSource = getPhotonComponentLibrarySourceBlock(
						currentState,
						blockId,
					);

					if (!currentSource) {
						return currentState;
					}

					const nextBlocks = updatePhotonBlockInDocument(
						{
							id: currentSource.item.id,
							name: currentSource.item.label,
							route: `/_component/${currentSource.item.id}`,
							updatedAt:
								currentSource.item.updatedAt ?? new Date().toISOString(),
							blocks: currentSource.item.blocks,
						},
						currentSource.block.id,
						(block) => ({
							...block,
							props: setValueAtPath(block.props, path, value),
						}),
					).blocks;

					return {
						site: persistPhotonComponentLibraryItem(currentState, {
							...currentSource.item,
							blocks: nextBlocks,
						}),
						contentRevision: bumpContentRevision(currentState),
					};
				});

				return;
			}

			set((currentState) => {
				const nextDocument = updatePhotonBlockInDocument(
					currentState.document,
					blockId,
					(block) => ({
						...block,
						props: setValueAtPath(block.props, path, value),
					}),
				);

				if (nextDocument === currentState.document) {
					return currentState;
				}

				return {
					document: {
						...nextDocument,
						updatedAt: new Date().toISOString(),
					},
					contentRevision: bumpContentRevision(currentState),
				};
			});
		},
		setFieldBinding: (blockId, path, binding) => {
			const state = get();
			if (!canMutatePhotonState(state)) {
				return;
			}
			const previous = getPhotonFieldBinding(state, blockId, path);
			if (binding === null) {
				if (!previous) {
					return;
				}
			} else if (
				previous &&
				previous.source === binding.source &&
				previous.path === binding.path &&
				previous.mode === binding.mode &&
				previous.adapter === binding.adapter
			) {
				return;
			}
			set((currentState) => {
				const nextDocument = updatePhotonBlockInDocument(
					currentState.document,
					blockId,
					(block) => {
						const currentBindings = block.bindings ?? {};
						if (binding === null) {
							const { [path]: _removed, ...rest } = currentBindings;
							return {
								...block,
								bindings: Object.keys(rest).length > 0 ? rest : undefined,
							};
						}
						return {
							...block,
							bindings: {
								...currentBindings,
								[path]: binding,
							},
						};
					},
				);
				return {
					document: {
						...nextDocument,
						updatedAt: new Date().toISOString(),
					},
					contentRevision: bumpContentRevision(currentState),
				};
			});
		},
		setBlockFieldLocalization: (blockId, path, target) => {
			const state = get();
			if (!canMutatePhotonState(state)) {
				return;
			}
			set((currentState) => {
				const nextDocument = updatePhotonBlockInDocument(
					currentState.document,
					blockId,
					(block) => {
						const current = block.localization ?? {};
						if (target === null) {
							if (!(path in current)) return block;
							const { [path]: _removed, ...rest } = current;
							return {
								...block,
								localization:
									Object.keys(rest).length > 0 ? rest : undefined,
							};
						}
						if (current[path] === target) return block;
						return {
							...block,
							localization: { ...current, [path]: target },
						};
					},
				);
				return {
					document: {
						...nextDocument,
						updatedAt: new Date().toISOString(),
					},
					contentRevision: bumpContentRevision(currentState),
				};
			});
		},
		getFieldValue: (blockId, path) => getPhotonFieldValue(get(), blockId, path),
		updatePageSettingValue: (path, value) => {
			if (!canMutatePhotonState(get())) {
				return;
			}

			set((state) => ({
				pageSettings: setValueAtPath(state.pageSettings, path, value),
				contentRevision: bumpContentRevision(state),
			}));
		},
		getPageSettingValue: (path) => getPhotonPageSettingValue(get(), path),
		updateSiteSettingValue: (path, value) => {
			if (!canMutatePhotonState(get())) {
				return;
			}

			set((state) => ({
				site: {
					...state.site,
					settings: setValueAtPath(state.site.settings, path, value),
				},
				contentRevision: bumpContentRevision(state),
			}));
		},
		getSiteSettingValue: (path) => getPhotonSiteSettingValue(get(), path),
		getFieldBinding: (blockId, path) =>
			getPhotonFieldBinding(get(), blockId, path),
		insertBlock: ({ module, type, listId, index }) => {
			const state = get();

			if (!canMutatePhotonState(state)) {
				return;
			}

			const definition = state.registry.getDefinition(module, type);

			if (!definition) {
				return;
			}

			const nextBlock = createPhotonBlock(module, definition, {
				locale: state.contentLocale,
				defaultLocale: state.defaultLocale,
			});

			set((currentState) => ({
				document: {
					...insertPhotonBlockInDocument(
						currentState.document,
						listId ??
							getPhotonSurfaceRegionListId(PHOTON_PAGE_SURFACE_REGION_KEY),
						nextBlock,
						index ?? Number.MAX_SAFE_INTEGER,
					),
					updatedAt: new Date().toISOString(),
				},
				selectedBlockId: nextBlock.id,
				selectedComponentLibrarySource: null,
				selectedField: null,
				contentRevision: bumpContentRevision(currentState),
			}));
		},
		duplicateBlock: (blockId) => {
			if (!canMutatePhotonState(get())) {
				return;
			}

			set((state) => {
				const duplication = duplicatePhotonBlockInDocument(
					state.document,
					blockId,
				);

				if (duplication.duplicatedBlockId === null) {
					return state;
				}

				return {
					document: {
						...duplication.document,
						updatedAt: new Date().toISOString(),
					},
					selectedBlockId: duplication.duplicatedBlockId,
					selectedComponentLibrarySource: null,
					selectedField: null,
					contentRevision: bumpContentRevision(state),
				};
			});
		},
		removeBlock: (blockId) => {
			if (!canMutatePhotonState(get())) {
				return;
			}

			set((state) => {
				const removal = removePhotonBlockFromDocument(state.document, blockId);

				if (!removal.removed) {
					return state;
				}

				const nextCollapsedBlockIds = { ...state.collapsedBlockIds };
				delete nextCollapsedBlockIds[blockId];

				return {
					document: {
						...state.document,
						updatedAt: new Date().toISOString(),
						blocks: removal.blocks,
					},
					selectedBlockId:
						state.selectedBlockId === blockId ? null : state.selectedBlockId,
					selectedComponentLibrarySource: null,
					selectedField:
						state.selectedBlockId === blockId ? null : state.selectedField,
					collapsedBlockIds: nextCollapsedBlockIds,
					contentRevision: bumpContentRevision(state),
				};
			});
		},
		moveBlock: (activeBlockId, targetListId, targetIndex) => {
			if (!canMutatePhotonState(get())) {
				return;
			}

			set((state) => {
				const nextDocument = movePhotonBlockInDocument(
					state.document,
					activeBlockId,
					targetListId,
					targetIndex,
				);

				if (nextDocument === state.document) {
					return state;
				}

				return {
					document: {
						...nextDocument,
						updatedAt: new Date().toISOString(),
					},
					contentRevision: bumpContentRevision(state),
				};
			});
		},
		createComponentLibraryItemFromBlock: (blockId) => {
			const state = get();

			if (!canMutatePhotonState(state)) {
				return;
			}

			const block = findPhotonBlock(state.document.blocks, blockId);

			if (!block) {
				return;
			}

			const definition = state.registry.getDefinition(block.module, block.type);
			const item = createPhotonComponentLibraryItemFromBlock(
				block,
				definition?.label ?? block.type,
			);

			set((currentState) => ({
				site: persistPhotonComponentLibraryItem(currentState, item),
				contentRevision: bumpContentRevision(currentState),
			}));
		},
		insertComponentLibraryReference: (itemId, listId, index) => {
			const state = get();

			if (!canMutatePhotonState(state)) {
				return;
			}

			const item = getPhotonComponentLibraryItems(state.site.settings)[itemId];

			if (!item || item.enabled === false) {
				return;
			}

			const nextBlock = createPhotonComponentReferenceBlock(item);

			set((currentState) => ({
				document: {
					...insertPhotonBlockInDocument(
						currentState.document,
						listId ??
							getPhotonSurfaceRegionListId(PHOTON_PAGE_SURFACE_REGION_KEY),
						nextBlock,
						index ?? Number.MAX_SAFE_INTEGER,
					),
					updatedAt: new Date().toISOString(),
				},
				selectedBlockId: nextBlock.id,
				selectedComponentLibrarySource: null,
				selectedField: null,
				contentRevision: bumpContentRevision(currentState),
			}));
		},
		insertComponentLibraryCopy: (itemId, listId, index) => {
			const state = get();

			if (!canMutatePhotonState(state)) {
				return;
			}

			const item = getPhotonComponentLibraryItems(state.site.settings)[itemId];

			if (!item || item.enabled === false) {
				return;
			}

			const blocks = clonePhotonComponentLibraryBlocksForCopy(item);

			set((currentState) => ({
				document: {
					...insertPhotonBlocksInDocument(
						currentState.document,
						listId ??
							getPhotonSurfaceRegionListId(PHOTON_PAGE_SURFACE_REGION_KEY),
						blocks,
						index ?? Number.MAX_SAFE_INTEGER,
					),
					updatedAt: new Date().toISOString(),
				},
				selectedBlockId: blocks[0]?.id ?? currentState.selectedBlockId,
				selectedComponentLibrarySource: null,
				selectedField: null,
				contentRevision: bumpContentRevision(currentState),
			}));
		},
		detachComponentReference: (blockId) => {
			const state = get();

			if (!canMutatePhotonState(state)) {
				return;
			}

			const block = findPhotonBlock(state.document.blocks, blockId);

			if (!block || !isPhotonComponentReferenceBlock(block)) {
				return;
			}

			const item = getPhotonComponentLibraryItems(state.site.settings)[
				block.props.itemId
			];

			if (!item) {
				return;
			}

			const replacementBlocks = clonePhotonComponentLibraryBlocksForCopy(item);

			set((currentState) => ({
				document: {
					...replacePhotonBlockWithBlocksInDocument(
						currentState.document,
						blockId,
						replacementBlocks,
					),
					updatedAt: new Date().toISOString(),
				},
				selectedBlockId: replacementBlocks[0]?.id ?? null,
				selectedComponentLibrarySource: null,
				selectedField: null,
				contentRevision: bumpContentRevision(currentState),
			}));
		},
		selectComponentLibrarySource: (itemId) => {
			const state = get();
			const item = getPhotonComponentLibraryItems(state.site.settings)[itemId];
			const firstBlock = item?.blocks[0];

			if (!item || !firstBlock) {
				return;
			}

			set({
				selectedBlockId: createPhotonComponentLibraryBlockId({
					itemId: item.id,
					referenceBlockId: "__source",
					sourceBlockId: firstBlock.id,
				}),
				selectedComponentLibrarySource: {
					kind: "component-library-source",
					itemId: item.id,
					sourceBlockId: firstBlock.id,
				},
				selectedField: null,
			});
		},
		duplicateComponentLibraryItem: (itemId) => {
			const state = get();

			if (!canMutatePhotonState(state)) {
				return;
			}

			const item = getPhotonComponentLibraryItems(state.site.settings)[itemId];

			if (!item) {
				return;
			}

			const duplicate = duplicatePhotonComponentLibraryItem(item);

			set((currentState) => ({
				site: persistPhotonComponentLibraryItem(currentState, duplicate),
				selectedBlockId: createPhotonComponentLibraryBlockId({
					itemId: duplicate.id,
					referenceBlockId: "__source",
					sourceBlockId: duplicate.blocks[0]?.id ?? "",
				}),
				selectedComponentLibrarySource: duplicate.blocks[0]
					? {
							kind: "component-library-source",
							itemId: duplicate.id,
							sourceBlockId: duplicate.blocks[0].id,
						}
					: null,
				selectedField: null,
				contentRevision: bumpContentRevision(currentState),
			}));
		},
		deleteComponentLibraryItem: (itemId, options) => {
			const state = get();

			if (!canMutatePhotonState(state)) {
				return false;
			}

			const settings = readPhotonComponentLibrarySettings(state.site.settings);
			const items = settings.items ?? {};

			const item = items[itemId];

			if (!item) {
				return false;
			}

			const usages = collectPhotonComponentLibraryUsages(state.document).filter(
				(usage) => usage.itemId === itemId,
			);

			if (usages.length > 0 && !options?.detachUsages) {
				return false;
			}

			const nextItems = { ...items };
			delete nextItems[itemId];

			set((currentState) => {
				const currentUsages = collectPhotonComponentLibraryUsages(
					currentState.document,
				).filter((usage) => usage.itemId === itemId);
				let nextDocument = currentState.document;
				let selectedBlockId = currentState.selectedBlockId;
				const selectedSource =
					currentState.selectedBlockId &&
					parsePhotonComponentLibraryBlockId(currentState.selectedBlockId)
						?.itemId === itemId;
				const selectedUsage = currentUsages.some(
					(usage) => usage.referenceBlockId === currentState.selectedBlockId,
				);

				if (options?.detachUsages) {
					for (const usage of currentUsages) {
						const replacementBlocks =
							clonePhotonComponentLibraryBlocksForCopy(item);

						nextDocument = replacePhotonBlockWithBlocksInDocument(
							nextDocument,
							usage.referenceBlockId,
							replacementBlocks,
						);

						if (selectedBlockId === usage.referenceBlockId) {
							selectedBlockId = replacementBlocks[0]?.id ?? null;
						}
					}
				}

				return {
					document:
						options?.detachUsages && currentUsages.length > 0
							? {
									...nextDocument,
									updatedAt: new Date().toISOString(),
								}
							: currentState.document,
					site: {
						...currentState.site,
						settings: setValueAtPath(
							currentState.site.settings,
							`${PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY}.items`,
							nextItems,
						),
					},
					selectedBlockId: selectedSource
						? null
						: selectedUsage
							? selectedBlockId
							: currentState.selectedBlockId,
					selectedComponentLibrarySource:
						currentState.selectedComponentLibrarySource?.itemId === itemId
							? null
							: currentState.selectedComponentLibrarySource,
					selectedField:
						selectedSource || selectedUsage ? null : currentState.selectedField,
					contentRevision: bumpContentRevision(currentState),
				};
			});

			return true;
		},
		updateComponentLibraryItem: (itemId, updater) => {
			const state = get();

			if (!canMutatePhotonState(state)) {
				return;
			}

			const item = getPhotonComponentLibraryItems(state.site.settings)[itemId];

			if (!item) {
				return;
			}

			set((currentState) => ({
				site: persistPhotonComponentLibraryItem(
					currentState,
					updater(item),
				),
				contentRevision: bumpContentRevision(currentState),
			}));
		},
		replaceState: (
			nextDocument,
			nextResources = {},
			nextPageSettings = {},
			nextSite = get().site,
			options,
		) => {
			const nextSurfaceDocument = composePhotonSurfaceDocument(
				nextDocument,
				nextSite,
			);
			const nextWorkspace = options?.workspace
				? normalizePhotonWorkspaceDescriptor(options.workspace)
				: get().workspace;
			const nextCapabilities = options?.capabilities
				? normalizePhotonWorkspaceCapabilities(options.capabilities)
				: get().capabilities;

			set((state) => {
				const nextSelectedBlockId =
					state.selectedBlockId &&
					findPhotonBlock(nextSurfaceDocument.blocks, state.selectedBlockId)
						? state.selectedBlockId
						: getFirstPhotonSurfaceEditableBlockId(nextSurfaceDocument);

				return {
					document: clonePhotonValue(nextSurfaceDocument),
					resources: clonePhotonValue(nextResources),
					pageSettings: clonePhotonValue(nextPageSettings),
					site: clonePhotonValue(nextSite),
					workspace: clonePhotonValue(nextWorkspace),
					capabilities: clonePhotonValue(nextCapabilities),
					selectedBlockId: nextSelectedBlockId,
					selectedComponentLibrarySource: null,
					selectedField: (() => {
						if (!state.selectedField) {
							return null;
						}

						if (
							state.selectedField.blockId === PAGE_SETTINGS_FIELD_SCOPE ||
							state.selectedField.blockId === SITE_SETTINGS_FIELD_SCOPE
						) {
							return state.selectedField;
						}

						if (state.selectedField.blockId !== nextSelectedBlockId) {
							return null;
						}

						return state.selectedField;
					})(),
					contentRevision: bumpContentRevision(state),
				};
			});
		},
		syncExternalState: ({
			initialDocument: nextInitialDocument,
			initialResources: nextInitialResources = {},
			initialPageSettings: nextInitialPageSettings = {},
			initialSite: nextInitialSite = {
				settings: {},
				regions: {},
			},
			workspace: nextWorkspace,
			capabilities: nextCapabilities,
		}) => {
			const nextSurfaceDocument = composePhotonSurfaceDocument(
				nextInitialDocument,
				nextInitialSite,
			);
			const normalizedWorkspace =
				normalizePhotonWorkspaceDescriptor(nextWorkspace);
			const normalizedCapabilities =
				normalizePhotonWorkspaceCapabilities(nextCapabilities);

			set((state) => ({
				document: clonePhotonValue(nextSurfaceDocument),
				resources: clonePhotonValue(nextInitialResources),
				pageSettings: clonePhotonValue(nextInitialPageSettings),
				site: clonePhotonValue(nextInitialSite),
				workspace: clonePhotonValue(normalizedWorkspace),
				capabilities: clonePhotonValue(normalizedCapabilities),
				initialDocument: clonePhotonValue(nextInitialDocument),
				initialResources: clonePhotonValue(nextInitialResources),
				initialPageSettings: clonePhotonValue(nextInitialPageSettings),
				initialSite: clonePhotonValue(nextInitialSite),
				initialWorkspace: clonePhotonValue(normalizedWorkspace),
				initialCapabilities: clonePhotonValue(normalizedCapabilities),
				selectedBlockId:
					getFirstPhotonSurfaceEditableBlockId(nextSurfaceDocument),
				selectedComponentLibrarySource: null,
				selectedField: null,
				collapsedBlockIds: {},
				mode: normalizePhotonMode(state.mode, state.isAdmin),
				contentRevision: 0,
			}));
		},
		updateDocumentMetadata: (patch) => {
			const state = get();
			if (!canMutatePhotonState(state)) {
				return;
			}
			set((currentState) => {
				const current = currentState.document;
				const nextRoutePatterns =
					"routePatterns" in patch ? patch.routePatterns : current.routePatterns;
				const nextName = patch.name ?? current.name;
				const nextRoute = patch.route ?? current.route;
				if (
					nextName === current.name &&
					nextRoute === current.route &&
					arePhotonValuesEqual(
						nextRoutePatterns ?? null,
						current.routePatterns ?? null,
					)
				) {
					return currentState;
				}
				return {
					document: {
						...current,
						name: nextName,
						route: nextRoute,
						routePatterns: nextRoutePatterns,
						updatedAt: new Date().toISOString(),
					},
					contentRevision: bumpContentRevision(currentState),
				};
			});
		},
		resetDocument: () => {
			set((state) => {
				const initialResetSurfaceDocument = composePhotonSurfaceDocument(
					state.initialDocument,
					state.initialSite,
				);

				return {
					document: clonePhotonValue(initialResetSurfaceDocument),
					resources: clonePhotonValue(state.initialResources),
					pageSettings: clonePhotonValue(state.initialPageSettings),
					site: clonePhotonValue(state.initialSite),
					workspace: clonePhotonValue(state.initialWorkspace),
					capabilities: clonePhotonValue(state.initialCapabilities),
					selectedBlockId: getFirstPhotonSurfaceEditableBlockId(
						initialResetSurfaceDocument,
					),
					selectedComponentLibrarySource: null,
					selectedField: null,
					contentRevision: bumpContentRevision(state),
				};
			});
		},
		toggleBlockCollapse: (blockId) => {
			set((state) => {
				const nextCollapsedBlockIds = { ...state.collapsedBlockIds };

				if (nextCollapsedBlockIds[blockId]) {
					delete nextCollapsedBlockIds[blockId];
				} else {
					nextCollapsedBlockIds[blockId] = true;
				}

				return {
					collapsedBlockIds: nextCollapsedBlockIds,
				};
			});
		},
		collapseAllBlocks: () => {
			set((state) => ({
				collapsedBlockIds: Object.fromEntries(
					collectBlockIds(state.document.blocks).map((blockId) => [
						blockId,
						true,
					]),
				),
			}));
		},
		expandAllBlocks: () => {
			set({
				collapsedBlockIds: {},
			});
		},
	}));
};
