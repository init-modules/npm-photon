import {
  PhotonI18nProvider
} from "./chunk-NV6FZ3PQ.js";
import {
  PHOTON_PAGE_SURFACE_REGION_KEY,
  composePhotonSurfaceDocument,
  createPhotonBlock,
  decomposePhotonSurfaceDocument,
  getFirstPhotonSurfaceEditableBlockId,
  getPhotonDocumentFingerprint,
  getPhotonSurfaceRegionListId
} from "./chunk-YNXZBS6V.js";
import {
  getPhotonAnchorRel,
  sanitizePhotonLinkHref
} from "./chunk-V7CN23YR.js";
import {
  collectBlockIds,
  duplicatePhotonBlockInDocument,
  findPhotonBlock,
  insertPhotonBlockInDocument,
  movePhotonBlockInDocument,
  removePhotonBlockFromDocument,
  updatePhotonBlockInDocument
} from "./chunk-UZJ5GO74.js";
import {
  canEditPhotonWorkspace,
  clonePhotonValue,
  getPhotonWorkspaceIdentityKey,
  getValueAtPath,
  normalizePhotonWorkspaceCapabilities,
  normalizePhotonWorkspaceDescriptor,
  setValueAtPath
} from "./chunk-KAITZE7U.js";

// src/context/photon-context.tsx
import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useRef
} from "react";
import { useStore } from "zustand";

// src/context/external-state.ts
var getPhotonExternalStateFingerprint = ({
  document,
  resources,
  pageSettings,
  site,
  workspace
}) => JSON.stringify({
  workspace: getPhotonWorkspaceIdentityKey(workspace),
  document: getPhotonDocumentFingerprint(document),
  resources,
  pageSettings,
  site
});

// src/context/photon-store.ts
import { createStore } from "zustand/vanilla";
var PAGE_SETTINGS_FIELD_SCOPE = "__page_settings__";
var SITE_SETTINGS_FIELD_SCOPE = "__site_settings__";
var normalizePhotonMode = (mode, isAdmin) => isAdmin ? mode : "preview";
var canMutatePhotonState = (state) => state.isAdmin && canEditPhotonWorkspace(state.workspace, state.capabilities);
var readBindingValue = (registry, binding, value) => {
  const adapter = binding.adapter ? registry.getBindingAdapter(binding.adapter) : void 0;
  return adapter?.read ? adapter.read(value) : value;
};
var writeBindingValue = (registry, binding, value) => {
  const adapter = binding.adapter ? registry.getBindingAdapter(binding.adapter) : void 0;
  return adapter?.write ? adapter.write(value) : value;
};
var arePhotonValuesEqual = (left, right) => {
  if (Object.is(left, right)) {
    return true;
  }
  try {
    return JSON.stringify(left) === JSON.stringify(right);
  } catch {
    return false;
  }
};
var getPhotonFieldBinding = (state, blockId, path) => {
  const block = findPhotonBlock(state.document.blocks, blockId);
  if (!block?.bindings) {
    return null;
  }
  const exactBinding = block.bindings[path];
  if (exactBinding) {
    return exactBinding;
  }
  const prefixMatch = Object.entries(block.bindings).filter(([bindingPath2]) => path.startsWith(`${bindingPath2}.`)).sort(([leftPath], [rightPath]) => rightPath.length - leftPath.length)[0];
  if (!prefixMatch) {
    return null;
  }
  const [bindingPath, binding] = prefixMatch;
  const suffix = path.slice(bindingPath.length + 1);
  const sourcePath = binding.path ? `${binding.path}.${suffix}` : suffix;
  return {
    ...binding,
    path: sourcePath
  };
};
var getPhotonFieldValue = (state, blockId, path) => {
  const block = findPhotonBlock(state.document.blocks, blockId);
  if (!block) {
    return null;
  }
  const binding = getPhotonFieldBinding(state, blockId, path);
  if (binding && binding.source in state.resources) {
    const resourceValue = getValueAtPath(
      state.resources[binding.source] ?? {},
      binding.path
    );
    return readBindingValue(state.registry, binding, resourceValue);
  }
  return getValueAtPath(block.props, path);
};
var getPhotonPageSettingValue = (state, path) => getValueAtPath(state.pageSettings, path);
var getPhotonSiteSettingValue = (state, path) => getValueAtPath(state.site.settings, path);
var bumpContentRevision = (state) => state.contentRevision + 1;
var createPhotonStore = ({
  initialDocument,
  initialResources = {},
  initialPageSettings = {},
  initialSite = {
    settings: {},
    regions: {}
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
  navigation = {},
  siteFrameExtensions = [],
  accountTabs = [],
  i18n
}) => {
  const initialSurfaceDocument = composePhotonSurfaceDocument(
    initialDocument,
    initialSite
  );
  const initialWorkspace = normalizePhotonWorkspaceDescriptor(workspace);
  const initialWorkspaceCapabilities = normalizePhotonWorkspaceCapabilities(capabilities);
  const defaultLocale = i18n?.defaultLocale?.trim().toLowerCase() || "en";
  const contentLocale = i18n?.contentLocale?.trim().toLowerCase() || defaultLocale;
  return createStore()((set, get) => ({
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
      initialSurfaceDocument
    ),
    selectedField: null,
    uploadMedia,
    searchSite,
    requestAuth,
    linkComponent,
    navigation: clonePhotonValue(navigation),
    siteFrameExtensions,
    accountTabs: clonePhotonValue(accountTabs),
    contentLocale,
    defaultLocale,
    contentRevision: 0,
    collapsedBlockIds: {},
    setMode: (nextMode) => {
      set((state) => ({
        mode: normalizePhotonMode(nextMode, state.isAdmin)
      }));
    },
    selectBlock: (blockId) => {
      set((state) => ({
        selectedBlockId: blockId,
        selectedField: blockId ? state.selectedField : null
      }));
    },
    selectField: (blockId, path) => {
      set({
        selectedBlockId: blockId,
        selectedField: { blockId, path }
      });
    },
    clearSelectedField: () => {
      set({
        selectedField: null
      });
    },
    selectPageSettingField: (path) => {
      set({
        selectedBlockId: null,
        selectedField: {
          blockId: PAGE_SETTINGS_FIELD_SCOPE,
          path
        }
      });
    },
    selectSiteSettingField: (path) => {
      set({
        selectedBlockId: null,
        selectedField: {
          blockId: SITE_SETTINGS_FIELD_SCOPE,
          path
        }
      });
    },
    updateFieldValue: (blockId, path, value) => {
      const state = get();
      const currentValue = getPhotonFieldValue(state, blockId, path);
      if (!canMutatePhotonState(state) || arePhotonValuesEqual(currentValue, value)) {
        return;
      }
      const binding = getPhotonFieldBinding(state, blockId, path);
      if (binding && binding.mode !== "read") {
        set((currentState) => ({
          resources: {
            ...currentState.resources,
            [binding.source]: setValueAtPath(
              currentState.resources[binding.source] ?? {},
              binding.path,
              writeBindingValue(currentState.registry, binding, value)
            )
          },
          contentRevision: bumpContentRevision(currentState)
        }));
        return;
      }
      set((currentState) => {
        const nextDocument = updatePhotonBlockInDocument(
          currentState.document,
          blockId,
          (block) => ({
            ...block,
            props: setValueAtPath(block.props, path, value)
          })
        );
        if (nextDocument === currentState.document) {
          return currentState;
        }
        return {
          document: {
            ...nextDocument,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          contentRevision: bumpContentRevision(currentState)
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
        contentRevision: bumpContentRevision(state)
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
          settings: setValueAtPath(state.site.settings, path, value)
        },
        contentRevision: bumpContentRevision(state)
      }));
    },
    getSiteSettingValue: (path) => getPhotonSiteSettingValue(get(), path),
    getFieldBinding: (blockId, path) => getPhotonFieldBinding(get(), blockId, path),
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
        defaultLocale: state.defaultLocale
      });
      set((currentState) => ({
        document: {
          ...insertPhotonBlockInDocument(
            currentState.document,
            listId ?? getPhotonSurfaceRegionListId(PHOTON_PAGE_SURFACE_REGION_KEY),
            nextBlock,
            index ?? Number.MAX_SAFE_INTEGER
          ),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        selectedBlockId: nextBlock.id,
        selectedField: null,
        contentRevision: bumpContentRevision(currentState)
      }));
    },
    duplicateBlock: (blockId) => {
      if (!canMutatePhotonState(get())) {
        return;
      }
      set((state) => {
        const duplication = duplicatePhotonBlockInDocument(
          state.document,
          blockId
        );
        if (duplication.duplicatedBlockId === null) {
          return state;
        }
        return {
          document: {
            ...duplication.document,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          selectedBlockId: duplication.duplicatedBlockId,
          selectedField: null,
          contentRevision: bumpContentRevision(state)
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
            updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
            blocks: removal.blocks
          },
          selectedBlockId: state.selectedBlockId === blockId ? null : state.selectedBlockId,
          selectedField: state.selectedBlockId === blockId ? null : state.selectedField,
          collapsedBlockIds: nextCollapsedBlockIds,
          contentRevision: bumpContentRevision(state)
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
          targetIndex
        );
        if (nextDocument === state.document) {
          return state;
        }
        return {
          document: {
            ...nextDocument,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          contentRevision: bumpContentRevision(state)
        };
      });
    },
    replaceState: (nextDocument, nextResources = {}, nextPageSettings = {}, nextSite = get().site, options) => {
      const nextSurfaceDocument = composePhotonSurfaceDocument(
        nextDocument,
        nextSite
      );
      const nextWorkspace = options?.workspace ? normalizePhotonWorkspaceDescriptor(options.workspace) : get().workspace;
      const nextCapabilities = options?.capabilities ? normalizePhotonWorkspaceCapabilities(options.capabilities) : get().capabilities;
      set((state) => {
        const nextSelectedBlockId = state.selectedBlockId && findPhotonBlock(nextSurfaceDocument.blocks, state.selectedBlockId) ? state.selectedBlockId : getFirstPhotonSurfaceEditableBlockId(nextSurfaceDocument);
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
            if (state.selectedField.blockId === PAGE_SETTINGS_FIELD_SCOPE || state.selectedField.blockId === SITE_SETTINGS_FIELD_SCOPE) {
              return state.selectedField;
            }
            if (state.selectedField.blockId !== nextSelectedBlockId) {
              return null;
            }
            return state.selectedField;
          })(),
          contentRevision: bumpContentRevision(state)
        };
      });
    },
    syncExternalState: ({
      initialDocument: nextInitialDocument,
      initialResources: nextInitialResources = {},
      initialPageSettings: nextInitialPageSettings = {},
      initialSite: nextInitialSite = {
        settings: {},
        regions: {}
      },
      workspace: nextWorkspace,
      capabilities: nextCapabilities
    }) => {
      const nextSurfaceDocument = composePhotonSurfaceDocument(
        nextInitialDocument,
        nextInitialSite
      );
      const normalizedWorkspace = normalizePhotonWorkspaceDescriptor(nextWorkspace);
      const normalizedCapabilities = normalizePhotonWorkspaceCapabilities(nextCapabilities);
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
        selectedBlockId: getFirstPhotonSurfaceEditableBlockId(nextSurfaceDocument),
        selectedField: null,
        collapsedBlockIds: {},
        mode: normalizePhotonMode(state.mode, state.isAdmin),
        contentRevision: 0
      }));
    },
    resetDocument: () => {
      set((state) => {
        const initialResetSurfaceDocument = composePhotonSurfaceDocument(
          state.initialDocument,
          state.initialSite
        );
        return {
          document: clonePhotonValue(initialResetSurfaceDocument),
          resources: clonePhotonValue(state.initialResources),
          pageSettings: clonePhotonValue(state.initialPageSettings),
          site: clonePhotonValue(state.initialSite),
          workspace: clonePhotonValue(state.initialWorkspace),
          capabilities: clonePhotonValue(state.initialCapabilities),
          selectedBlockId: getFirstPhotonSurfaceEditableBlockId(
            initialResetSurfaceDocument
          ),
          selectedField: null,
          contentRevision: bumpContentRevision(state)
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
          collapsedBlockIds: nextCollapsedBlockIds
        };
      });
    },
    collapseAllBlocks: () => {
      set((state) => ({
        collapsedBlockIds: Object.fromEntries(
          collectBlockIds(state.document.blocks).map((blockId) => [
            blockId,
            true
          ])
        )
      }));
    },
    expandAllBlocks: () => {
      set({
        collapsedBlockIds: {}
      });
    }
  }));
};

// src/context/photon-context.tsx
import { jsx } from "react/jsx-runtime";
var PhotonContext = createContext(null);
var DefaultPhotonLinkComponent = ({
  href,
  locale: _locale,
  children,
  ...props
}) => createElement(
  "a",
  {
    ...props,
    href: sanitizePhotonLinkHref(href),
    rel: getPhotonAnchorRel(props.target, props.rel)
  },
  children
);
var PhotonProvider = ({
  children,
  initialDocument,
  initialResources = {},
  initialPageSettings = {},
  initialSite = {
    settings: {},
    regions: {}
  },
  registry,
  workspace,
  capabilities,
  initialMode = "preview",
  isAdmin = false,
  i18n,
  uploadMedia,
  searchSite,
  requestAuth,
  linkComponent = DefaultPhotonLinkComponent,
  navigation = {},
  siteFrameExtensions = [],
  accountTabs = []
}) => {
  const storeRef = useRef(null);
  const externalStateFingerprint = useMemo(
    () => getPhotonExternalStateFingerprint({
      document: initialDocument,
      resources: initialResources,
      pageSettings: initialPageSettings,
      site: initialSite,
      workspace: normalizePhotonWorkspaceDescriptor(workspace)
    }),
    [
      initialDocument,
      initialPageSettings,
      initialResources,
      initialSite,
      workspace
    ]
  );
  const lastExternalStateFingerprintRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createPhotonStore({
      initialDocument,
      initialResources,
      initialPageSettings,
      initialSite,
      registry,
      workspace,
      capabilities,
      initialMode,
      isAdmin,
      uploadMedia,
      searchSite,
      requestAuth,
      linkComponent,
      navigation,
      siteFrameExtensions,
      accountTabs,
      i18n: i18n ? {
        contentLocale: i18n.contentLocale,
        defaultLocale: i18n.defaultLocale
      } : void 0
    });
  }
  useEffect(() => {
    if (lastExternalStateFingerprintRef.current === externalStateFingerprint) {
      return;
    }
    lastExternalStateFingerprintRef.current = externalStateFingerprint;
    storeRef.current?.getState().syncExternalState({
      initialDocument: clonePhotonValue(initialDocument),
      initialResources: clonePhotonValue(initialResources),
      initialPageSettings: clonePhotonValue(initialPageSettings),
      initialSite: clonePhotonValue(initialSite),
      workspace: clonePhotonValue(
        normalizePhotonWorkspaceDescriptor(workspace)
      ),
      capabilities: clonePhotonValue(
        normalizePhotonWorkspaceCapabilities(capabilities)
      )
    });
  }, [
    externalStateFingerprint,
    capabilities,
    initialDocument,
    initialPageSettings,
    initialResources,
    initialSite,
    workspace
  ]);
  useEffect(() => {
    storeRef.current?.setState((state) => {
      const normalizedWorkspace = normalizePhotonWorkspaceDescriptor(workspace);
      const normalizedCapabilities = normalizePhotonWorkspaceCapabilities(capabilities);
      const nextMode = !isAdmin ? "preview" : state.mode;
      const nextEditable = isAdmin && canEditPhotonWorkspace(normalizedWorkspace, normalizedCapabilities);
      if (state.isAdmin === isAdmin && state.uploadMedia === uploadMedia && state.searchSite === searchSite && state.requestAuth === requestAuth && state.linkComponent === linkComponent && JSON.stringify(state.navigation) === JSON.stringify(navigation) && state.siteFrameExtensions === siteFrameExtensions && JSON.stringify(state.accountTabs) === JSON.stringify(accountTabs) && state.contentLocale === (i18n?.contentLocale ?? state.contentLocale) && state.defaultLocale === (i18n?.defaultLocale ?? state.defaultLocale) && state.mode === nextMode && JSON.stringify(state.capabilities) === JSON.stringify(normalizedCapabilities) && JSON.stringify(state.workspace) === JSON.stringify(normalizedWorkspace)) {
        return state;
      }
      return {
        ...state,
        isAdmin,
        workspace: normalizedWorkspace,
        capabilities: normalizedCapabilities,
        uploadMedia,
        searchSite,
        requestAuth,
        linkComponent,
        navigation: clonePhotonValue(navigation),
        siteFrameExtensions,
        accountTabs: clonePhotonValue(accountTabs),
        contentLocale: i18n?.contentLocale ?? state.contentLocale,
        defaultLocale: i18n?.defaultLocale ?? state.defaultLocale,
        mode: nextEditable || nextMode === "preview" ? nextMode : "preview"
      };
    });
  }, [
    capabilities,
    i18n?.contentLocale,
    i18n?.defaultLocale,
    isAdmin,
    linkComponent,
    navigation,
    siteFrameExtensions,
    accountTabs,
    requestAuth,
    searchSite,
    uploadMedia,
    workspace
  ]);
  return /* @__PURE__ */ jsx(PhotonI18nProvider, { value: i18n, children: /* @__PURE__ */ jsx(PhotonContext.Provider, { value: storeRef.current, children }) });
};
var usePhotonStoreApi = () => {
  const context = useContext(PhotonContext);
  if (!context) {
    throw new Error("usePhoton must be used within PhotonProvider");
  }
  return context;
};
var usePhotonStore = (selector) => {
  const store = usePhotonStoreApi();
  return useStore(store, selector);
};
var usePhoton = () => {
  const store = usePhotonStoreApi();
  return useStore(store);
};
var usePhotonFieldValue = (blockId, path) => usePhotonStore((state) => getPhotonFieldValue(state, blockId, path));
var usePhotonCanEdit = () => usePhotonStore(
  (state) => state.isAdmin && state.mode !== "preview" && canEditPhotonWorkspace(state.workspace, state.capabilities)
);
var usePhotonPersistedState = () => {
  const document = usePhotonStore((state) => state.document);
  const resources = usePhotonStore((state) => state.resources);
  const pageSettings = usePhotonStore((state) => state.pageSettings);
  const site = usePhotonStore((state) => state.site);
  return useMemo(() => {
    const persistedState = decomposePhotonSurfaceDocument(document, site);
    return {
      document: persistedState.pageDocument,
      resources,
      pageSettings,
      site: persistedState.site
    };
  }, [document, resources, pageSettings, site]);
};
var PhotonLink = ({
  navigateInPreviewOnly = true,
  onClick,
  ...props
}) => {
  const mode = usePhotonStore((state) => state.mode);
  const LinkComponent = usePhotonStore((state) => state.linkComponent);
  const disableNavigation = navigateInPreviewOnly && mode !== "preview";
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: "contents",
      onClickCapture: disableNavigation ? (event) => {
        event.preventDefault();
      } : void 0,
      children: /* @__PURE__ */ jsx(
        LinkComponent,
        {
          ...props,
          onClick: (event) => {
            if (disableNavigation) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }
            onClick?.(event);
          }
        }
      )
    }
  );
};

export {
  PhotonProvider,
  usePhotonStoreApi,
  usePhotonStore,
  usePhoton,
  usePhotonFieldValue,
  usePhotonCanEdit,
  usePhotonPersistedState,
  PhotonLink
};
