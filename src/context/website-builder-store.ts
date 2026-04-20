"use client";

import { createStore, type StoreApi } from "zustand/vanilla";
import { createWebsiteBuilderBlock } from "../helpers/document";
import {
	cloneWebsiteBuilderValue,
	getValueAtPath,
	setValueAtPath,
} from "../helpers/path";
import {
	canEditWebsiteBuilderWorkspace,
	normalizeWebsiteBuilderWorkspaceCapabilities,
	normalizeWebsiteBuilderWorkspaceDescriptor,
} from "../helpers/workspace";
import {
	composeWebsiteBuilderSurfaceDocument,
	decomposeWebsiteBuilderSurfaceDocument,
	getFirstWebsiteBuilderSurfaceEditableBlockId,
	getWebsiteBuilderSurfaceRegionListId,
	WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
} from "../helpers/site";
import {
	duplicateWebsiteBuilderBlockInDocument,
	findWebsiteBuilderBlock,
	insertWebsiteBuilderBlockInDocument,
	moveWebsiteBuilderBlockInDocument,
	removeWebsiteBuilderBlockFromDocument,
	updateWebsiteBuilderBlockInDocument,
} from "../helpers/tree";
import { collectBlockIds } from "../studio/shared/constants";
import type {
	WebsiteBuilderBlock,
	WebsiteBuilderAccountTabExtension,
	WebsiteBuilderDocument,
	WebsiteBuilderFieldBinding,
	WebsiteBuilderLinkComponent,
	WebsiteBuilderMediaUploadHandler,
	WebsiteBuilderMode,
	WebsiteBuilderPageSettings,
	WebsiteBuilderRegistry,
	WebsiteBuilderResources,
	WebsiteBuilderSearchHandler,
	WebsiteBuilderSelectedField,
	WebsiteBuilderSite,
	WebsiteBuilderSiteFrameExtension,
	WebsiteBuilderWorkspaceCapabilities,
	WebsiteBuilderWorkspaceDescriptor,
} from "../types";

export type InsertBlockInput = {
	module: string;
	type: string;
	listId?: string;
	index?: number;
};

export type WebsiteBuilderStoreState = {
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
	getFieldBinding: (
		blockId: string,
		path: string,
	) => WebsiteBuilderFieldBinding | null;
	insertBlock: (input: InsertBlockInput) => void;
	duplicateBlock: (blockId: string) => void;
	removeBlock: (blockId: string) => void;
	moveBlock: (
		activeBlockId: string,
		targetListId: string,
		targetIndex: number,
	) => void;
	replaceState: (
		nextDocument: WebsiteBuilderDocument,
		nextResources?: WebsiteBuilderResources,
		nextPageSettings?: WebsiteBuilderPageSettings,
		nextSite?: WebsiteBuilderSite,
		options?: {
			workspace?: WebsiteBuilderWorkspaceDescriptor;
			capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
		},
	) => void;
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

export type WebsiteBuilderStore = StoreApi<WebsiteBuilderStoreState>;

export type WebsiteBuilderStoreInit = {
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

const PAGE_SETTINGS_FIELD_SCOPE = "__page_settings__";
const SITE_SETTINGS_FIELD_SCOPE = "__site_settings__";

const normalizeWebsiteBuilderMode = (
	mode: WebsiteBuilderMode,
	isAdmin: boolean,
): WebsiteBuilderMode => (isAdmin ? mode : "preview");

const canMutateWebsiteBuilderState = (state: WebsiteBuilderStoreState) =>
	state.isAdmin &&
	canEditWebsiteBuilderWorkspace(state.workspace, state.capabilities);

const readBindingValue = (
	registry: WebsiteBuilderRegistry,
	binding: WebsiteBuilderFieldBinding,
	value: unknown,
): unknown => {
	const adapter = binding.adapter
		? registry.getBindingAdapter(binding.adapter)
		: undefined;

	return adapter?.read ? adapter.read(value) : value;
};

const writeBindingValue = (
	registry: WebsiteBuilderRegistry,
	binding: WebsiteBuilderFieldBinding,
	value: unknown,
): unknown => {
	const adapter = binding.adapter
		? registry.getBindingAdapter(binding.adapter)
		: undefined;

	return adapter?.write ? adapter.write(value) : value;
};

const areWebsiteBuilderValuesEqual = (left: unknown, right: unknown) => {
	if (Object.is(left, right)) {
		return true;
	}

	try {
		return JSON.stringify(left) === JSON.stringify(right);
	} catch {
		return false;
	}
};

export const getWebsiteBuilderSelectedBlock = (
	state: WebsiteBuilderStoreState,
): WebsiteBuilderBlock | null =>
	state.selectedBlockId
		? findWebsiteBuilderBlock(state.document.blocks, state.selectedBlockId)
		: null;

export const getWebsiteBuilderFieldBinding = (
	state: WebsiteBuilderStoreState,
	blockId: string,
	path: string,
): WebsiteBuilderFieldBinding | null => {
	const block = findWebsiteBuilderBlock(state.document.blocks, blockId);

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

export const getWebsiteBuilderFieldValue = (
	state: WebsiteBuilderStoreState,
	blockId: string,
	path: string,
): unknown => {
	const block = findWebsiteBuilderBlock(state.document.blocks, blockId);

	if (!block) {
		return null;
	}

	const binding = getWebsiteBuilderFieldBinding(state, blockId, path);

	if (binding && binding.source in state.resources) {
		const resourceValue = getValueAtPath(
			(state.resources[binding.source] as Record<string, unknown>) ?? {},
			binding.path,
		);

		return readBindingValue(state.registry, binding, resourceValue);
	}

	return getValueAtPath(block.props, path);
};

export const getWebsiteBuilderPageSettingValue = (
	state: WebsiteBuilderStoreState,
	path: string,
) => getValueAtPath(state.pageSettings, path);

export const getWebsiteBuilderSiteSettingValue = (
	state: WebsiteBuilderStoreState,
	path: string,
) => getValueAtPath(state.site.settings, path);

export const getWebsiteBuilderPersistedState = (
	state: Pick<
		WebsiteBuilderStoreState,
		"document" | "resources" | "pageSettings" | "site"
	>,
) => {
	const persistedState = decomposeWebsiteBuilderSurfaceDocument(
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

const bumpContentRevision = (state: WebsiteBuilderStoreState) =>
	state.contentRevision + 1;

export const createWebsiteBuilderStore = ({
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
	linkComponent,
	siteFrameExtensions = [],
	accountTabs = [],
	i18n,
}: WebsiteBuilderStoreInit): WebsiteBuilderStore => {
	const initialSurfaceDocument = composeWebsiteBuilderSurfaceDocument(
		initialDocument,
		initialSite,
	);
	const initialWorkspace =
		normalizeWebsiteBuilderWorkspaceDescriptor(workspace);
	const initialWorkspaceCapabilities =
		normalizeWebsiteBuilderWorkspaceCapabilities(capabilities);
	const defaultLocale = i18n?.defaultLocale?.trim().toLowerCase() || "en";
	const contentLocale =
		i18n?.contentLocale?.trim().toLowerCase() || defaultLocale;

	return createStore<WebsiteBuilderStoreState>()((set, get) => ({
		document: cloneWebsiteBuilderValue(initialSurfaceDocument),
		resources: cloneWebsiteBuilderValue(initialResources),
		pageSettings: cloneWebsiteBuilderValue(initialPageSettings),
		site: cloneWebsiteBuilderValue(initialSite),
		workspace: initialWorkspace,
		capabilities: initialWorkspaceCapabilities,
		initialDocument: cloneWebsiteBuilderValue(initialDocument),
		initialResources: cloneWebsiteBuilderValue(initialResources),
		initialPageSettings: cloneWebsiteBuilderValue(initialPageSettings),
		initialSite: cloneWebsiteBuilderValue(initialSite),
		initialWorkspace: cloneWebsiteBuilderValue(initialWorkspace),
		initialCapabilities: cloneWebsiteBuilderValue(initialWorkspaceCapabilities),
		registry,
		mode: normalizeWebsiteBuilderMode(initialMode, isAdmin),
		isAdmin,
		selectedBlockId: getFirstWebsiteBuilderSurfaceEditableBlockId(
			initialSurfaceDocument,
		),
		selectedField: null,
		uploadMedia,
		searchSite,
		requestAuth,
		linkComponent,
		siteFrameExtensions: cloneWebsiteBuilderValue(siteFrameExtensions),
		accountTabs: cloneWebsiteBuilderValue(accountTabs),
		contentLocale,
		defaultLocale,
		contentRevision: 0,
		collapsedBlockIds: {},
		setMode: (nextMode) => {
			set((state) => ({
				mode: normalizeWebsiteBuilderMode(nextMode, state.isAdmin),
			}));
		},
		selectBlock: (blockId) => {
			set((state) => ({
				selectedBlockId: blockId,
				selectedField: blockId ? state.selectedField : null,
			}));
		},
		selectField: (blockId, path) => {
			set({
				selectedBlockId: blockId,
				selectedField: { blockId, path },
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
				selectedField: {
					blockId: PAGE_SETTINGS_FIELD_SCOPE,
					path,
				},
			});
		},
		selectSiteSettingField: (path) => {
			set({
				selectedBlockId: null,
				selectedField: {
					blockId: SITE_SETTINGS_FIELD_SCOPE,
					path,
				},
			});
		},
		updateFieldValue: (blockId, path, value) => {
			const state = get();
			const currentValue = getWebsiteBuilderFieldValue(state, blockId, path);

			if (
				!canMutateWebsiteBuilderState(state) ||
				areWebsiteBuilderValuesEqual(currentValue, value)
			) {
				return;
			}

			const binding = getWebsiteBuilderFieldBinding(state, blockId, path);

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

			set((currentState) => {
				const nextDocument = updateWebsiteBuilderBlockInDocument(
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
		getFieldValue: (blockId, path) =>
			getWebsiteBuilderFieldValue(get(), blockId, path),
		updatePageSettingValue: (path, value) => {
			if (!canMutateWebsiteBuilderState(get())) {
				return;
			}

			set((state) => ({
				pageSettings: setValueAtPath(state.pageSettings, path, value),
				contentRevision: bumpContentRevision(state),
			}));
		},
		getPageSettingValue: (path) =>
			getWebsiteBuilderPageSettingValue(get(), path),
		updateSiteSettingValue: (path, value) => {
			if (!canMutateWebsiteBuilderState(get())) {
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
		getSiteSettingValue: (path) =>
			getWebsiteBuilderSiteSettingValue(get(), path),
		getFieldBinding: (blockId, path) =>
			getWebsiteBuilderFieldBinding(get(), blockId, path),
		insertBlock: ({ module, type, listId, index }) => {
			const state = get();

			if (!canMutateWebsiteBuilderState(state)) {
				return;
			}

			const definition = state.registry.getDefinition(module, type);

			if (!definition) {
				return;
			}

			const nextBlock = createWebsiteBuilderBlock(module, definition, {
				locale: state.contentLocale,
				defaultLocale: state.defaultLocale,
			});

			set((currentState) => ({
				document: {
					...insertWebsiteBuilderBlockInDocument(
						currentState.document,
						listId ??
							getWebsiteBuilderSurfaceRegionListId(
								WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
							),
						nextBlock,
						index ?? Number.MAX_SAFE_INTEGER,
					),
					updatedAt: new Date().toISOString(),
				},
				selectedBlockId: nextBlock.id,
				selectedField: null,
				contentRevision: bumpContentRevision(currentState),
			}));
		},
		duplicateBlock: (blockId) => {
			if (!canMutateWebsiteBuilderState(get())) {
				return;
			}

			set((state) => {
				const duplication = duplicateWebsiteBuilderBlockInDocument(
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
					selectedField: null,
					contentRevision: bumpContentRevision(state),
				};
			});
		},
		removeBlock: (blockId) => {
			if (!canMutateWebsiteBuilderState(get())) {
				return;
			}

			set((state) => {
				const removal = removeWebsiteBuilderBlockFromDocument(
					state.document,
					blockId,
				);

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
					selectedField:
						state.selectedBlockId === blockId ? null : state.selectedField,
					collapsedBlockIds: nextCollapsedBlockIds,
					contentRevision: bumpContentRevision(state),
				};
			});
		},
		moveBlock: (activeBlockId, targetListId, targetIndex) => {
			if (!canMutateWebsiteBuilderState(get())) {
				return;
			}

			set((state) => {
				const nextDocument = moveWebsiteBuilderBlockInDocument(
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
		replaceState: (
			nextDocument,
			nextResources = {},
			nextPageSettings = {},
			nextSite = get().site,
			options,
		) => {
			const nextSurfaceDocument = composeWebsiteBuilderSurfaceDocument(
				nextDocument,
				nextSite,
			);
			const nextWorkspace = options?.workspace
				? normalizeWebsiteBuilderWorkspaceDescriptor(options.workspace)
				: get().workspace;
			const nextCapabilities = options?.capabilities
				? normalizeWebsiteBuilderWorkspaceCapabilities(options.capabilities)
				: get().capabilities;

			set((state) => {
				const nextSelectedBlockId =
					state.selectedBlockId &&
					findWebsiteBuilderBlock(
						nextSurfaceDocument.blocks,
						state.selectedBlockId,
					)
						? state.selectedBlockId
						: getFirstWebsiteBuilderSurfaceEditableBlockId(nextSurfaceDocument);

				return {
					document: cloneWebsiteBuilderValue(nextSurfaceDocument),
					resources: cloneWebsiteBuilderValue(nextResources),
					pageSettings: cloneWebsiteBuilderValue(nextPageSettings),
					site: cloneWebsiteBuilderValue(nextSite),
					workspace: cloneWebsiteBuilderValue(nextWorkspace),
					capabilities: cloneWebsiteBuilderValue(nextCapabilities),
					selectedBlockId: nextSelectedBlockId,
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
			const nextSurfaceDocument = composeWebsiteBuilderSurfaceDocument(
				nextInitialDocument,
				nextInitialSite,
			);
			const normalizedWorkspace =
				normalizeWebsiteBuilderWorkspaceDescriptor(nextWorkspace);
			const normalizedCapabilities =
				normalizeWebsiteBuilderWorkspaceCapabilities(nextCapabilities);

			set((state) => ({
				document: cloneWebsiteBuilderValue(nextSurfaceDocument),
				resources: cloneWebsiteBuilderValue(nextInitialResources),
				pageSettings: cloneWebsiteBuilderValue(nextInitialPageSettings),
				site: cloneWebsiteBuilderValue(nextInitialSite),
				workspace: cloneWebsiteBuilderValue(normalizedWorkspace),
				capabilities: cloneWebsiteBuilderValue(normalizedCapabilities),
				initialDocument: cloneWebsiteBuilderValue(nextInitialDocument),
				initialResources: cloneWebsiteBuilderValue(nextInitialResources),
				initialPageSettings: cloneWebsiteBuilderValue(nextInitialPageSettings),
				initialSite: cloneWebsiteBuilderValue(nextInitialSite),
				initialWorkspace: cloneWebsiteBuilderValue(normalizedWorkspace),
				initialCapabilities: cloneWebsiteBuilderValue(normalizedCapabilities),
				selectedBlockId: getFirstWebsiteBuilderSurfaceEditableBlockId(
					nextSurfaceDocument,
				),
				selectedField: null,
				collapsedBlockIds: {},
				mode: normalizeWebsiteBuilderMode(state.mode, state.isAdmin),
				contentRevision: 0,
			}));
		},
		resetDocument: () => {
			set((state) => {
				const initialResetSurfaceDocument =
					composeWebsiteBuilderSurfaceDocument(
						state.initialDocument,
						state.initialSite,
					);

				return {
					document: cloneWebsiteBuilderValue(initialResetSurfaceDocument),
					resources: cloneWebsiteBuilderValue(state.initialResources),
					pageSettings: cloneWebsiteBuilderValue(state.initialPageSettings),
					site: cloneWebsiteBuilderValue(state.initialSite),
					workspace: cloneWebsiteBuilderValue(state.initialWorkspace),
					capabilities: cloneWebsiteBuilderValue(state.initialCapabilities),
					selectedBlockId: getFirstWebsiteBuilderSurfaceEditableBlockId(
						initialResetSurfaceDocument,
					),
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
