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
	insertPhotonBlockInDocument,
	movePhotonBlockInDocument,
	removePhotonBlockFromDocument,
	updatePhotonBlockInDocument,
} from "../helpers/tree";
import {
	canEditPhotonWorkspace,
	normalizePhotonWorkspaceCapabilities,
	normalizePhotonWorkspaceDescriptor,
} from "../helpers/workspace";
import type {
	PhotonAccountTabExtension,
	PhotonBlock,
	PhotonDocument,
	PhotonFieldBinding,
	PhotonLinkComponent,
	PhotonMediaUploadHandler,
	PhotonMode,
	PhotonPageSettings,
	PhotonRegistry,
	PhotonResources,
	PhotonSearchHandler,
	PhotonSelectedField,
	PhotonSite,
	PhotonSiteFrameExtension,
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
	selectedField: PhotonSelectedField;
	uploadMedia?: PhotonMediaUploadHandler;
	searchSite?: PhotonSearchHandler;
	requestAuth?: () => void;
	linkComponent: PhotonLinkComponent;
	siteFrameExtensions: PhotonSiteFrameExtension[];
	accountTabs: PhotonAccountTabExtension[];
	contentLocale: string;
	defaultLocale: string;
	contentRevision: number;
	collapsedBlockIds: Record<string, true>;
	setMode: (nextMode: PhotonMode) => void;
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
	) => PhotonFieldBinding | null;
	insertBlock: (input: InsertBlockInput) => void;
	duplicateBlock: (blockId: string) => void;
	removeBlock: (blockId: string) => void;
	moveBlock: (
		activeBlockId: string,
		targetListId: string,
		targetIndex: number,
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
	linkComponent: PhotonLinkComponent;
	siteFrameExtensions?: PhotonSiteFrameExtension[];
	accountTabs?: PhotonAccountTabExtension[];
	i18n?: {
		contentLocale?: string;
		defaultLocale?: string;
	};
};

const PAGE_SETTINGS_FIELD_SCOPE = "__page_settings__";
const SITE_SETTINGS_FIELD_SCOPE = "__site_settings__";

const normalizePhotonMode = (
	mode: PhotonMode,
	isAdmin: boolean,
): PhotonMode => (isAdmin ? mode : "preview");

const canMutatePhotonState = (state: PhotonStoreState) =>
	state.isAdmin &&
	canEditPhotonWorkspace(state.workspace, state.capabilities);

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

export const getPhotonSelectedBlock = (
	state: PhotonStoreState,
): PhotonBlock | null =>
	state.selectedBlockId
		? findPhotonBlock(state.document.blocks, state.selectedBlockId)
		: null;

export const getPhotonFieldBinding = (
	state: PhotonStoreState,
	blockId: string,
	path: string,
): PhotonFieldBinding | null => {
	const block = findPhotonBlock(state.document.blocks, blockId);

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
	const block = findPhotonBlock(state.document.blocks, blockId);

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
	linkComponent,
	siteFrameExtensions = [],
	accountTabs = [],
	i18n,
}: PhotonStoreInit): PhotonStore => {
	const initialSurfaceDocument = composePhotonSurfaceDocument(
		initialDocument,
		initialSite,
	);
	const initialWorkspace =
		normalizePhotonWorkspaceDescriptor(workspace);
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
		selectedField: null,
		uploadMedia,
		searchSite,
		requestAuth,
		linkComponent,
		siteFrameExtensions: clonePhotonValue(siteFrameExtensions),
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
		getFieldValue: (blockId, path) =>
			getPhotonFieldValue(get(), blockId, path),
		updatePageSettingValue: (path, value) => {
			if (!canMutatePhotonState(get())) {
				return;
			}

			set((state) => ({
				pageSettings: setValueAtPath(state.pageSettings, path, value),
				contentRevision: bumpContentRevision(state),
			}));
		},
		getPageSettingValue: (path) =>
			getPhotonPageSettingValue(get(), path),
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
		getSiteSettingValue: (path) =>
			getPhotonSiteSettingValue(get(), path),
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
							getPhotonSurfaceRegionListId(
								PHOTON_PAGE_SURFACE_REGION_KEY,
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
				const removal = removePhotonBlockFromDocument(
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
					findPhotonBlock(
						nextSurfaceDocument.blocks,
						state.selectedBlockId,
					)
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
				selectedField: null,
				collapsedBlockIds: {},
				mode: normalizePhotonMode(state.mode, state.isAdmin),
				contentRevision: 0,
			}));
		},
		resetDocument: () => {
			set((state) => {
				const initialResetSurfaceDocument =
					composePhotonSurfaceDocument(
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
