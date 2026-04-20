import {
  WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
  composeWebsiteBuilderSurfaceDocument,
  createWebsiteBuilderBlock,
  decomposeWebsiteBuilderSurfaceDocument,
  getFirstWebsiteBuilderSurfaceEditableBlockId,
  getWebsiteBuilderDocumentFingerprint,
  getWebsiteBuilderSurfaceRegionListId
} from "./chunk-PD2EQKYT.js";
import {
  canEditWebsiteBuilderWorkspace,
  cloneWebsiteBuilderValue,
  duplicateWebsiteBuilderBlockInDocument,
  findWebsiteBuilderBlock,
  getValueAtPath,
  getWebsiteBuilderWorkspaceIdentityKey,
  insertWebsiteBuilderBlockInDocument,
  moveWebsiteBuilderBlockInDocument,
  normalizeWebsiteBuilderWorkspaceCapabilities,
  normalizeWebsiteBuilderWorkspaceDescriptor,
  removeWebsiteBuilderBlockFromDocument,
  setValueAtPath,
  updateWebsiteBuilderBlockInDocument
} from "./chunk-IEZXES2I.js";

// src/i18n/website-builder-i18n-context.tsx
import {
  createContext,
  useContext,
  useMemo
} from "react";
import { jsx } from "react/jsx-runtime";
var createDefaultTranslate = () => (key, fallback) => fallback ?? key;
var defaultValue = {
  defaultLocale: "en",
  locale: "en",
  contentLocale: "en",
  interfaceLocale: "en",
  interfaceLocales: [
    { code: "en", label: "English" },
    { code: "ru", label: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" }
  ],
  locales: [],
  publicLocales: [],
  editableLocales: [],
  showLocaleSwitcher: false,
  translate: createDefaultTranslate()
};
var WebsiteBuilderI18nContext = createContext(defaultValue);
var WebsiteBuilderI18nProvider = ({
  children,
  value
}) => {
  const nextValue = useMemo(
    () => ({
      ...defaultValue,
      ...value,
      translate: value?.translate ?? defaultValue.translate
    }),
    [value]
  );
  return /* @__PURE__ */ jsx(WebsiteBuilderI18nContext.Provider, { value: nextValue, children });
};
var useWebsiteBuilderI18n = () => useContext(WebsiteBuilderI18nContext);
var resolveWebsiteBuilderText = (value, translate, fallback) => translate(value, fallback ?? value);

// src/context/website-builder-context.tsx
import {
  createContext as createContext2,
  createElement,
  useContext as useContext2,
  useEffect,
  useMemo as useMemo2,
  useRef
} from "react";
import { useStore } from "zustand";

// src/context/website-builder-store.ts
import { createStore } from "zustand/vanilla";

// src/studio/shared/constants.ts
import {
  closestCenter,
  pointerWithin,
  rectIntersection
} from "@dnd-kit/core";
import clsx from "clsx";
import {
  BadgeCheck,
  LayoutGrid,
  Newspaper,
  PanelsTopLeft,
  Sparkles
} from "lucide-react";
var FIELD_GROUP_LABELS = {
  content: "websiteBuilder.fieldGroups.content",
  style: "websiteBuilder.fieldGroups.style",
  layout: "websiteBuilder.fieldGroups.layout",
  data: "websiteBuilder.fieldGroups.data",
  misc: "websiteBuilder.fieldGroups.misc"
};
var STUDIO_ICONS = {
  "badge-check": BadgeCheck,
  "layout-grid": LayoutGrid,
  newspaper: Newspaper,
  "panels-top-left": PanelsTopLeft,
  sparkles: Sparkles
};
var createInsertionZoneId = (listId, index) => `insert:${listId}:${index}`;
var INSERT_ZONE_PROXIMITY_HEIGHT = 160;
var INSERT_ZONE_PROXIMITY_WIDTH = 96;
var getRectArea = (rect) => rect ? rect.width * rect.height : Number.POSITIVE_INFINITY;
var getPointerDistanceToRect = (pointerCoordinates, rect) => {
  if (!pointerCoordinates || !rect) {
    return Number.POSITIVE_INFINITY;
  }
  const deltaX = pointerCoordinates.x < rect.left ? rect.left - pointerCoordinates.x : pointerCoordinates.x > rect.right ? pointerCoordinates.x - rect.right : 0;
  const deltaY = pointerCoordinates.y < rect.top ? rect.top - pointerCoordinates.y : pointerCoordinates.y > rect.bottom ? pointerCoordinates.y - rect.bottom : 0;
  return Math.hypot(deltaX, deltaY);
};
var sortInsertZoneCollisions = (collisions, {
  droppableRects,
  pointerCoordinates,
  prioritizeValue = false
}) => [...collisions].sort((left, right) => {
  const leftValue = typeof left.data?.value === "number" ? left.data.value : Number.NEGATIVE_INFINITY;
  const rightValue = typeof right.data?.value === "number" ? right.data.value : Number.NEGATIVE_INFINITY;
  if (prioritizeValue && rightValue !== leftValue) {
    return rightValue - leftValue;
  }
  const leftRect = droppableRects.get(left.id);
  const rightRect = droppableRects.get(right.id);
  const leftDistance = getPointerDistanceToRect(pointerCoordinates, leftRect);
  const rightDistance = getPointerDistanceToRect(pointerCoordinates, rightRect);
  if (leftDistance !== rightDistance) {
    return leftDistance - rightDistance;
  }
  if (!prioritizeValue && rightValue !== leftValue) {
    return rightValue - leftValue;
  }
  return getRectArea(leftRect) - getRectArea(rightRect);
});
var createPointerProximityRect = (pointerCoordinates) => {
  if (!pointerCoordinates) {
    return null;
  }
  return {
    top: pointerCoordinates.y - INSERT_ZONE_PROXIMITY_HEIGHT / 2,
    bottom: pointerCoordinates.y + INSERT_ZONE_PROXIMITY_HEIGHT / 2,
    left: pointerCoordinates.x - INSERT_ZONE_PROXIMITY_WIDTH / 2,
    right: pointerCoordinates.x + INSERT_ZONE_PROXIMITY_WIDTH / 2,
    width: INSERT_ZONE_PROXIMITY_WIDTH,
    height: INSERT_ZONE_PROXIMITY_HEIGHT
  };
};
var websiteBuilderCollisionDetection = (args) => {
  const activeKind = args.active.data.current?.kind;
  const insertZoneContainers = args.droppableContainers.filter(
    (container) => container.data.current?.kind === "insert-zone"
  );
  const collisionArgs = {
    ...args,
    droppableContainers: insertZoneContainers
  };
  const pointerHits = pointerWithin(collisionArgs);
  if (pointerHits.length > 0) {
    return sortInsertZoneCollisions(pointerHits, {
      droppableRects: args.droppableRects,
      pointerCoordinates: args.pointerCoordinates
    });
  }
  const overlayHits = rectIntersection(collisionArgs);
  if (overlayHits.length > 0) {
    return sortInsertZoneCollisions(overlayHits, {
      droppableRects: args.droppableRects,
      pointerCoordinates: args.pointerCoordinates,
      prioritizeValue: true
    });
  }
  const pointerProximityRect = createPointerProximityRect(args.pointerCoordinates);
  if (pointerProximityRect) {
    const proximityHits = rectIntersection({
      ...collisionArgs,
      collisionRect: pointerProximityRect
    });
    if (proximityHits.length > 0) {
      return sortInsertZoneCollisions(proximityHits, {
        droppableRects: args.droppableRects,
        pointerCoordinates: args.pointerCoordinates,
        prioritizeValue: true
      });
    }
  }
  if (activeKind === "palette") {
    return [];
  }
  return sortInsertZoneCollisions(
    closestCenter({
      ...collisionArgs,
      collisionRect: pointerProximityRect ?? args.collisionRect
    }),
    {
      droppableRects: args.droppableRects,
      pointerCoordinates: args.pointerCoordinates
    }
  );
};
var parseInsertTargetFromZoneId = (zoneId) => {
  if (!zoneId.startsWith("insert:")) {
    return null;
  }
  const payload = zoneId.slice("insert:".length);
  const separatorIndex = payload.lastIndexOf(":");
  if (separatorIndex === -1) {
    return null;
  }
  const listId = payload.slice(0, separatorIndex);
  const index = Number(payload.slice(separatorIndex + 1));
  if (!Number.isFinite(index)) {
    return null;
  }
  return { listId, index };
};
var resolveInsertTarget = (event) => {
  const overData = event.over?.data.current;
  if (overData?.kind === "insert-zone") {
    return {
      listId: String(overData.listId),
      index: Number(overData.index)
    };
  }
  const collisionTarget = event.collisions?.map((collision) => parseInsertTargetFromZoneId(String(collision.id))).find((target) => target !== null);
  return collisionTarget ?? null;
};
var matchesTarget = (target, listId, index) => target?.listId === listId && target.index === index;
var collectBlockIds = (blocks) => {
  const ids = [];
  for (const block of blocks) {
    ids.push(block.id);
    for (const area of block.areas ?? []) {
      ids.push(...collectBlockIds(area.blocks));
    }
  }
  return ids;
};
var inputClassName = clsx(
  "w-full rounded-[20px] border px-4 py-3",
  "text-sm outline-none transition placeholder:text-[color:var(--wb-builder-text-ghost)]",
  "border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-field)] text-[color:var(--wb-builder-text)] focus:border-[color:var(--wb-builder-border-strong)]"
);

// src/context/website-builder-store.ts
var PAGE_SETTINGS_FIELD_SCOPE = "__page_settings__";
var SITE_SETTINGS_FIELD_SCOPE = "__site_settings__";
var normalizeWebsiteBuilderMode = (mode, isAdmin) => isAdmin ? mode : "preview";
var canMutateWebsiteBuilderState = (state) => state.isAdmin && canEditWebsiteBuilderWorkspace(state.workspace, state.capabilities);
var readBindingValue = (registry, binding, value) => {
  const adapter = binding.adapter ? registry.getBindingAdapter(binding.adapter) : void 0;
  return adapter?.read ? adapter.read(value) : value;
};
var writeBindingValue = (registry, binding, value) => {
  const adapter = binding.adapter ? registry.getBindingAdapter(binding.adapter) : void 0;
  return adapter?.write ? adapter.write(value) : value;
};
var areWebsiteBuilderValuesEqual = (left, right) => {
  if (Object.is(left, right)) {
    return true;
  }
  try {
    return JSON.stringify(left) === JSON.stringify(right);
  } catch {
    return false;
  }
};
var getWebsiteBuilderFieldBinding = (state, blockId, path) => {
  const block = findWebsiteBuilderBlock(state.document.blocks, blockId);
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
var getWebsiteBuilderFieldValue = (state, blockId, path) => {
  const block = findWebsiteBuilderBlock(state.document.blocks, blockId);
  if (!block) {
    return null;
  }
  const binding = getWebsiteBuilderFieldBinding(state, blockId, path);
  if (binding && binding.source in state.resources) {
    const resourceValue = getValueAtPath(
      state.resources[binding.source] ?? {},
      binding.path
    );
    return readBindingValue(state.registry, binding, resourceValue);
  }
  return getValueAtPath(block.props, path);
};
var getWebsiteBuilderPageSettingValue = (state, path) => getValueAtPath(state.pageSettings, path);
var getWebsiteBuilderSiteSettingValue = (state, path) => getValueAtPath(state.site.settings, path);
var bumpContentRevision = (state) => state.contentRevision + 1;
var createWebsiteBuilderStore = ({
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
  siteFrameExtensions = [],
  accountTabs = [],
  i18n
}) => {
  const initialSurfaceDocument = composeWebsiteBuilderSurfaceDocument(
    initialDocument,
    initialSite
  );
  const initialWorkspace = normalizeWebsiteBuilderWorkspaceDescriptor(workspace);
  const initialWorkspaceCapabilities = normalizeWebsiteBuilderWorkspaceCapabilities(capabilities);
  const defaultLocale = i18n?.defaultLocale?.trim().toLowerCase() || "en";
  const contentLocale = i18n?.contentLocale?.trim().toLowerCase() || defaultLocale;
  return createStore()((set, get) => ({
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
      initialSurfaceDocument
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
        mode: normalizeWebsiteBuilderMode(nextMode, state.isAdmin)
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
      const currentValue = getWebsiteBuilderFieldValue(state, blockId, path);
      if (!canMutateWebsiteBuilderState(state) || areWebsiteBuilderValuesEqual(currentValue, value)) {
        return;
      }
      const binding = getWebsiteBuilderFieldBinding(state, blockId, path);
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
        const nextDocument = updateWebsiteBuilderBlockInDocument(
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
    getFieldValue: (blockId, path) => getWebsiteBuilderFieldValue(get(), blockId, path),
    updatePageSettingValue: (path, value) => {
      if (!canMutateWebsiteBuilderState(get())) {
        return;
      }
      set((state) => ({
        pageSettings: setValueAtPath(state.pageSettings, path, value),
        contentRevision: bumpContentRevision(state)
      }));
    },
    getPageSettingValue: (path) => getWebsiteBuilderPageSettingValue(get(), path),
    updateSiteSettingValue: (path, value) => {
      if (!canMutateWebsiteBuilderState(get())) {
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
    getSiteSettingValue: (path) => getWebsiteBuilderSiteSettingValue(get(), path),
    getFieldBinding: (blockId, path) => getWebsiteBuilderFieldBinding(get(), blockId, path),
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
        defaultLocale: state.defaultLocale
      });
      set((currentState) => ({
        document: {
          ...insertWebsiteBuilderBlockInDocument(
            currentState.document,
            listId ?? getWebsiteBuilderSurfaceRegionListId(
              WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY
            ),
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
      if (!canMutateWebsiteBuilderState(get())) {
        return;
      }
      set((state) => {
        const duplication = duplicateWebsiteBuilderBlockInDocument(
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
      if (!canMutateWebsiteBuilderState(get())) {
        return;
      }
      set((state) => {
        const removal = removeWebsiteBuilderBlockFromDocument(
          state.document,
          blockId
        );
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
      if (!canMutateWebsiteBuilderState(get())) {
        return;
      }
      set((state) => {
        const nextDocument = moveWebsiteBuilderBlockInDocument(
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
      const nextSurfaceDocument = composeWebsiteBuilderSurfaceDocument(
        nextDocument,
        nextSite
      );
      const nextWorkspace = options?.workspace ? normalizeWebsiteBuilderWorkspaceDescriptor(options.workspace) : get().workspace;
      const nextCapabilities = options?.capabilities ? normalizeWebsiteBuilderWorkspaceCapabilities(options.capabilities) : get().capabilities;
      set((state) => {
        const nextSelectedBlockId = state.selectedBlockId && findWebsiteBuilderBlock(
          nextSurfaceDocument.blocks,
          state.selectedBlockId
        ) ? state.selectedBlockId : getFirstWebsiteBuilderSurfaceEditableBlockId(nextSurfaceDocument);
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
      const nextSurfaceDocument = composeWebsiteBuilderSurfaceDocument(
        nextInitialDocument,
        nextInitialSite
      );
      const normalizedWorkspace = normalizeWebsiteBuilderWorkspaceDescriptor(nextWorkspace);
      const normalizedCapabilities = normalizeWebsiteBuilderWorkspaceCapabilities(nextCapabilities);
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
          nextSurfaceDocument
        ),
        selectedField: null,
        collapsedBlockIds: {},
        mode: normalizeWebsiteBuilderMode(state.mode, state.isAdmin),
        contentRevision: 0
      }));
    },
    resetDocument: () => {
      set((state) => {
        const initialResetSurfaceDocument = composeWebsiteBuilderSurfaceDocument(
          state.initialDocument,
          state.initialSite
        );
        return {
          document: cloneWebsiteBuilderValue(initialResetSurfaceDocument),
          resources: cloneWebsiteBuilderValue(state.initialResources),
          pageSettings: cloneWebsiteBuilderValue(state.initialPageSettings),
          site: cloneWebsiteBuilderValue(state.initialSite),
          workspace: cloneWebsiteBuilderValue(state.initialWorkspace),
          capabilities: cloneWebsiteBuilderValue(state.initialCapabilities),
          selectedBlockId: getFirstWebsiteBuilderSurfaceEditableBlockId(
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

// src/context/external-state.ts
var getWebsiteBuilderExternalStateFingerprint = ({
  document,
  resources,
  pageSettings,
  site,
  workspace
}) => JSON.stringify({
  workspace: getWebsiteBuilderWorkspaceIdentityKey(workspace),
  document: getWebsiteBuilderDocumentFingerprint(document),
  resources,
  pageSettings,
  site
});

// src/context/website-builder-context.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var WebsiteBuilderContext = createContext2(null);
var DefaultWebsiteBuilderLinkComponent = ({
  href,
  locale: _locale,
  children,
  ...props
}) => createElement(
  "a",
  {
    href,
    ...props
  },
  children
);
var WebsiteBuilderProvider = ({
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
  linkComponent = DefaultWebsiteBuilderLinkComponent,
  siteFrameExtensions = [],
  accountTabs = []
}) => {
  const storeRef = useRef(null);
  const externalStateFingerprint = useMemo2(
    () => getWebsiteBuilderExternalStateFingerprint({
      document: initialDocument,
      resources: initialResources,
      pageSettings: initialPageSettings,
      site: initialSite,
      workspace: normalizeWebsiteBuilderWorkspaceDescriptor(workspace)
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
    storeRef.current = createWebsiteBuilderStore({
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
      initialDocument: cloneWebsiteBuilderValue(initialDocument),
      initialResources: cloneWebsiteBuilderValue(initialResources),
      initialPageSettings: cloneWebsiteBuilderValue(initialPageSettings),
      initialSite: cloneWebsiteBuilderValue(initialSite),
      workspace: cloneWebsiteBuilderValue(
        normalizeWebsiteBuilderWorkspaceDescriptor(workspace)
      ),
      capabilities: cloneWebsiteBuilderValue(
        normalizeWebsiteBuilderWorkspaceCapabilities(capabilities)
      )
    });
  }, [externalStateFingerprint, capabilities, initialDocument, initialPageSettings, initialResources, initialSite, workspace]);
  useEffect(() => {
    storeRef.current?.setState((state) => {
      const normalizedWorkspace = normalizeWebsiteBuilderWorkspaceDescriptor(workspace);
      const normalizedCapabilities = normalizeWebsiteBuilderWorkspaceCapabilities(capabilities);
      const nextMode = !isAdmin ? "preview" : state.mode;
      const nextEditable = isAdmin && canEditWebsiteBuilderWorkspace(
        normalizedWorkspace,
        normalizedCapabilities
      );
      if (state.isAdmin === isAdmin && state.uploadMedia === uploadMedia && state.searchSite === searchSite && state.requestAuth === requestAuth && state.linkComponent === linkComponent && JSON.stringify(state.siteFrameExtensions) === JSON.stringify(siteFrameExtensions) && JSON.stringify(state.accountTabs) === JSON.stringify(accountTabs) && state.contentLocale === (i18n?.contentLocale ?? state.contentLocale) && state.defaultLocale === (i18n?.defaultLocale ?? state.defaultLocale) && state.mode === nextMode && JSON.stringify(state.capabilities) === JSON.stringify(normalizedCapabilities) && JSON.stringify(state.workspace) === JSON.stringify(normalizedWorkspace)) {
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
        siteFrameExtensions: cloneWebsiteBuilderValue(siteFrameExtensions),
        accountTabs: cloneWebsiteBuilderValue(accountTabs),
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
    siteFrameExtensions,
    accountTabs,
    requestAuth,
    searchSite,
    uploadMedia,
    workspace
  ]);
  return /* @__PURE__ */ jsx2(WebsiteBuilderI18nProvider, { value: i18n, children: /* @__PURE__ */ jsx2(WebsiteBuilderContext.Provider, { value: storeRef.current, children }) });
};
var useWebsiteBuilderStoreApi = () => {
  const context = useContext2(WebsiteBuilderContext);
  if (!context) {
    throw new Error(
      "useWebsiteBuilder must be used within WebsiteBuilderProvider"
    );
  }
  return context;
};
var useWebsiteBuilderStore = (selector) => {
  const store = useWebsiteBuilderStoreApi();
  return useStore(store, selector);
};
var useWebsiteBuilder = () => {
  const store = useWebsiteBuilderStoreApi();
  return useStore(store);
};
var useWebsiteBuilderFieldValue = (blockId, path) => useWebsiteBuilderStore(
  (state) => getWebsiteBuilderFieldValue(state, blockId, path)
);
var useWebsiteBuilderCanEdit = () => useWebsiteBuilderStore(
  (state) => state.isAdmin && state.mode !== "preview" && canEditWebsiteBuilderWorkspace(state.workspace, state.capabilities)
);
var useWebsiteBuilderPersistedState = () => {
  const document = useWebsiteBuilderStore((state) => state.document);
  const resources = useWebsiteBuilderStore((state) => state.resources);
  const pageSettings = useWebsiteBuilderStore((state) => state.pageSettings);
  const site = useWebsiteBuilderStore((state) => state.site);
  return useMemo2(() => {
    const persistedState = decomposeWebsiteBuilderSurfaceDocument(
      document,
      site
    );
    return {
      document: persistedState.pageDocument,
      resources,
      pageSettings,
      site: persistedState.site
    };
  }, [document, resources, pageSettings, site]);
};
var WebsiteBuilderLink = ({
  navigateInPreviewOnly = true,
  onClick,
  ...props
}) => {
  const mode = useWebsiteBuilderStore((state) => state.mode);
  const LinkComponent = useWebsiteBuilderStore((state) => state.linkComponent);
  const disableNavigation = navigateInPreviewOnly && mode !== "preview";
  return /* @__PURE__ */ jsx2(
    "span",
    {
      className: "contents",
      onClickCapture: disableNavigation ? (event) => {
        event.preventDefault();
      } : void 0,
      children: /* @__PURE__ */ jsx2(
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
  WebsiteBuilderI18nProvider,
  useWebsiteBuilderI18n,
  resolveWebsiteBuilderText,
  FIELD_GROUP_LABELS,
  STUDIO_ICONS,
  createInsertionZoneId,
  websiteBuilderCollisionDetection,
  resolveInsertTarget,
  matchesTarget,
  inputClassName,
  WebsiteBuilderProvider,
  useWebsiteBuilderStoreApi,
  useWebsiteBuilderStore,
  useWebsiteBuilder,
  useWebsiteBuilderFieldValue,
  useWebsiteBuilderCanEdit,
  useWebsiteBuilderPersistedState,
  WebsiteBuilderLink
};
