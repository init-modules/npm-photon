"use client";
import {
  PhotonI18nProvider,
  PhotonInteractionSurfaceHost,
  resolvePhotonBlockActiveState
} from "./chunk-TSGYFS2W.js";
import {
  PHOTON_PAGE_SURFACE_REGION_KEY,
  composePhotonSurfaceDocument,
  createPhotonBlock,
  decomposePhotonSurfaceDocument,
  getFirstPhotonSurfaceEditableBlockId,
  getPhotonDocumentFingerprint,
  getPhotonSurfaceRegionListId
} from "./chunk-FF7K4ALP.js";
import {
  resolvePhotonSiteData
} from "./chunk-UOWHTI2K.js";
import {
  getPhotonAnchorRel,
  sanitizePhotonLinkHref
} from "./chunk-V7CN23YR.js";
import {
  collectBlockIds,
  duplicatePhotonBlockInDocument,
  findPhotonBlock,
  insertPhotonBlockInDocument,
  insertPhotonBlocksInDocument,
  movePhotonBlockInDocument,
  removePhotonBlockFromDocument,
  replacePhotonBlockWithBlocksInDocument,
  updatePhotonBlockInDocument
} from "./chunk-URGYF42Q.js";
import {
  PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY,
  canEditPhotonWorkspace,
  clonePhotonComponentLibraryBlocksForCopy,
  clonePhotonValue,
  collectPhotonComponentLibraryUsages,
  createPhotonComponentLibraryBlockId,
  createPhotonComponentLibraryItemFromBlock,
  createPhotonComponentReferenceBlock,
  duplicatePhotonComponentLibraryItem,
  executePhotonInteractionActionPresentation,
  executePhotonInteractionTriggerSlot,
  getPhotonComponentLibraryItems,
  getPhotonWorkspaceIdentityKey,
  getValueAtPath,
  isPhotonComponentReferenceBlock,
  normalizePhotonWorkspaceCapabilities,
  normalizePhotonWorkspaceDescriptor,
  parsePhotonComponentLibraryBlockId,
  photonInteractionExecutionSucceeded,
  planPhotonInteractionTriggerSlot,
  readPhotonComponentLibrarySettings,
  resolvePhotonInteractionActionCatalog,
  resolvePhotonInteractionSurfaceCatalog,
  resolvePhotonInteractionSurfaceRequest,
  resolvePhotonInteractionToastTemplate,
  setValueAtPath
} from "./chunk-WHYISUJX.js";

// src/context/photon-context.tsx
import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useRef
} from "react";
import { toast } from "sonner";
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
var advancePendingActionPlanAfterSurfaceTransition = ({
  get,
  set
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
    siteSettings: state.site.settings
  });
  const refreshedPlan = pending.slot ? planPhotonInteractionTriggerSlot({
    slot: pending.slot,
    catalog,
    conditionEvaluators: state.conditionEvaluators,
    conditionContext: {
      siteSettings: state.site.settings,
      resources: state.resources,
      routeContext: state.routeContextValues
    }
  }) : null;
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
    const nextPresentation = catalog.actionInstances[nextStep.actionInstanceId]?.presentation;
    if (nextPresentation) {
      set({
        pendingActionPlan: {
          ...pending,
          previousStepCount: refreshedPlan.steps.length
        }
      });
      get().executeInteractionAction(nextPresentation);
      return;
    }
    set({ pendingActionPlan: null });
    return;
  }
  set({ pendingActionPlan: null });
};
var getPhotonSelectedBlock = (state) => state.selectedBlockId ? findPhotonBlock(state.document.blocks, state.selectedBlockId) ?? getPhotonComponentLibrarySourceBlock(state, state.selectedBlockId)?.block ?? null : null;
var getPhotonComponentLibrarySourceBlock = (state, blockId) => {
  const parsed = parsePhotonComponentLibraryBlockId(blockId);
  if (!parsed) {
    return null;
  }
  const item = getPhotonComponentLibraryItems(state.site.settings)[parsed.itemId];
  const block = item ? findPhotonBlock(item.blocks, parsed.sourceBlockId) : null;
  return item && block ? { item, block } : null;
};
var persistPhotonComponentLibraryItem = (state, item) => {
  const settings = readPhotonComponentLibrarySettings(state.site.settings);
  return {
    ...state.site,
    settings: setValueAtPath(
      state.site.settings,
      `${PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY}.items`,
      {
        ...settings.items ?? {},
        [item.id]: {
          ...item,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      }
    )
  };
};
var getPhotonFieldBinding = (state, blockId, path) => {
  const block = findPhotonBlock(state.document.blocks, blockId) ?? getPhotonComponentLibrarySourceBlock(state, blockId)?.block;
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
  const block = findPhotonBlock(state.document.blocks, blockId) ?? getPhotonComponentLibrarySourceBlock(state, blockId)?.block;
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
        state.requestAuthAction
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
        mode: normalizePhotonMode(nextMode, state.isAdmin)
      }));
    },
    showInteractionToast: (input) => {
      const state = get();
      const catalog = resolvePhotonInteractionSurfaceCatalog({
        definitions: state.interactionSurfaces,
        siteSettings: state.site.settings
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
        navigate: state.navigate
      });
    },
    executeInteractionTriggerSlot: (slot, options) => {
      const state = get();
      const catalog = resolvePhotonInteractionActionCatalog({
        actions: state.interactionActions,
        guards: state.interactionGuards,
        surfaces: state.interactionSurfaces,
        policies: state.interactionPolicies,
        siteSettings: state.site.settings
      });
      const scenarioResources = options?.scenario?.resources;
      const resources = scenarioResources ? {
        ...state.resources,
        ...clonePhotonValue(scenarioResources)
      } : state.resources;
      const result = executePhotonInteractionTriggerSlot({
        slot,
        catalog,
        evaluators: state.interactionGuardEvaluators,
        conditionEvaluators: state.conditionEvaluators,
        conditionContext: {
          siteSettings: state.site.settings,
          resources,
          routeContext: state.routeContextValues
        },
        context: {
          document: state.document,
          resources,
          pageSettings: state.pageSettings,
          site: state.site,
          mode: state.mode,
          isAdmin: state.isAdmin,
          scenarioId: options?.scenario?.id ?? options?.scenarioId
        },
        handlers: {
          openInteractionSurface: state.openInteractionSurface,
          showInteractionToast: state.showInteractionToast,
          navigate: state.navigate
        }
      });
      if (result.plan) {
        set({
          pendingActionPlan: {
            targetAction: result.plan.targetAction,
            targetActionInstanceId: result.plan.targetActionInstanceId,
            previousStepCount: result.plan.previousStepCount,
            slot
          }
        });
      } else if (result.executed) {
        set({ pendingActionPlan: null });
      }
      return result;
    },
    openInteractionSurface: (trigger) => {
      const state = get();
      const catalog = resolvePhotonInteractionSurfaceCatalog({
        definitions: state.interactionSurfaces,
        siteSettings: state.site.settings
      });
      const request = resolvePhotonInteractionSurfaceRequest(trigger, catalog);
      if (!request) {
        return false;
      }
      if (request.definition.kind === "toast") {
        return state.showInteractionToast({
          templateId: request.instance.id,
          overrides: {
            title: typeof request.props.title === "string" ? request.props.title : void 0,
            description: typeof request.props.description === "string" ? request.props.description : void 0,
            status: typeof request.props.status === "string" ? request.props.status : void 0,
            props: request.props
          }
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
        pendingActionPlan: null
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
        selectedInspectorTriggerId: blockId === state.selectedBlockId ? state.selectedInspectorTriggerId : null,
        selectedCanvasTriggerStageId: blockId === state.selectedBlockId ? state.selectedCanvasTriggerStageId : null
      }));
    },
    selectField: (blockId, path) => {
      set({
        selectedBlockId: blockId,
        selectedComponentLibrarySource: null,
        selectedField: { blockId, path }
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
            [blockId]: scenarioId
          }
        };
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
        selectedComponentLibrarySource: null,
        selectedField: {
          blockId: PAGE_SETTINGS_FIELD_SCOPE,
          path
        }
      });
    },
    selectSiteSettingField: (path) => {
      set({
        selectedBlockId: null,
        selectedComponentLibrarySource: null,
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
      const componentSource = getPhotonComponentLibrarySourceBlock(
        state,
        blockId
      );
      if (componentSource) {
        set((currentState) => {
          const currentSource = getPhotonComponentLibrarySourceBlock(
            currentState,
            blockId
          );
          if (!currentSource) {
            return currentState;
          }
          const nextBlocks = updatePhotonBlockInDocument(
            {
              id: currentSource.item.id,
              name: currentSource.item.label,
              route: `/_component/${currentSource.item.id}`,
              updatedAt: currentSource.item.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
              blocks: currentSource.item.blocks
            },
            currentSource.block.id,
            (block) => ({
              ...block,
              props: setValueAtPath(block.props, path, value)
            })
          ).blocks;
          return {
            site: persistPhotonComponentLibraryItem(currentState, {
              ...currentSource.item,
              blocks: nextBlocks
            }),
            contentRevision: bumpContentRevision(currentState)
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
      } else if (previous && previous.source === binding.source && previous.path === binding.path && previous.mode === binding.mode && previous.adapter === binding.adapter) {
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
                bindings: Object.keys(rest).length > 0 ? rest : void 0
              };
            }
            return {
              ...block,
              bindings: {
                ...currentBindings,
                [path]: binding
              }
            };
          }
        );
        return {
          document: {
            ...nextDocument,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          contentRevision: bumpContentRevision(currentState)
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
                localization: Object.keys(rest).length > 0 ? rest : void 0
              };
            }
            if (current[path] === target) return block;
            return {
              ...block,
              localization: { ...current, [path]: target }
            };
          }
        );
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
        selectedComponentLibrarySource: null,
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
          selectedComponentLibrarySource: null,
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
          selectedComponentLibrarySource: null,
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
        definition?.label ?? block.type
      );
      set((currentState) => ({
        site: persistPhotonComponentLibraryItem(currentState, item),
        contentRevision: bumpContentRevision(currentState)
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
            listId ?? getPhotonSurfaceRegionListId(PHOTON_PAGE_SURFACE_REGION_KEY),
            nextBlock,
            index ?? Number.MAX_SAFE_INTEGER
          ),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        selectedBlockId: nextBlock.id,
        selectedComponentLibrarySource: null,
        selectedField: null,
        contentRevision: bumpContentRevision(currentState)
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
            listId ?? getPhotonSurfaceRegionListId(PHOTON_PAGE_SURFACE_REGION_KEY),
            blocks,
            index ?? Number.MAX_SAFE_INTEGER
          ),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        selectedBlockId: blocks[0]?.id ?? currentState.selectedBlockId,
        selectedComponentLibrarySource: null,
        selectedField: null,
        contentRevision: bumpContentRevision(currentState)
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
      const item = getPhotonComponentLibraryItems(state.site.settings)[block.props.itemId];
      if (!item) {
        return;
      }
      const replacementBlocks = clonePhotonComponentLibraryBlocksForCopy(item);
      set((currentState) => ({
        document: {
          ...replacePhotonBlockWithBlocksInDocument(
            currentState.document,
            blockId,
            replacementBlocks
          ),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        selectedBlockId: replacementBlocks[0]?.id ?? null,
        selectedComponentLibrarySource: null,
        selectedField: null,
        contentRevision: bumpContentRevision(currentState)
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
          sourceBlockId: firstBlock.id
        }),
        selectedComponentLibrarySource: {
          kind: "component-library-source",
          itemId: item.id,
          sourceBlockId: firstBlock.id
        },
        selectedField: null
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
          sourceBlockId: duplicate.blocks[0]?.id ?? ""
        }),
        selectedComponentLibrarySource: duplicate.blocks[0] ? {
          kind: "component-library-source",
          itemId: duplicate.id,
          sourceBlockId: duplicate.blocks[0].id
        } : null,
        selectedField: null,
        contentRevision: bumpContentRevision(currentState)
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
        (usage) => usage.itemId === itemId
      );
      if (usages.length > 0 && !options?.detachUsages) {
        return false;
      }
      const nextItems = { ...items };
      delete nextItems[itemId];
      set((currentState) => {
        const currentUsages = collectPhotonComponentLibraryUsages(
          currentState.document
        ).filter((usage) => usage.itemId === itemId);
        let nextDocument = currentState.document;
        let selectedBlockId = currentState.selectedBlockId;
        const selectedSource = currentState.selectedBlockId && parsePhotonComponentLibraryBlockId(currentState.selectedBlockId)?.itemId === itemId;
        const selectedUsage = currentUsages.some(
          (usage) => usage.referenceBlockId === currentState.selectedBlockId
        );
        if (options?.detachUsages) {
          for (const usage of currentUsages) {
            const replacementBlocks = clonePhotonComponentLibraryBlocksForCopy(item);
            nextDocument = replacePhotonBlockWithBlocksInDocument(
              nextDocument,
              usage.referenceBlockId,
              replacementBlocks
            );
            if (selectedBlockId === usage.referenceBlockId) {
              selectedBlockId = replacementBlocks[0]?.id ?? null;
            }
          }
        }
        return {
          document: options?.detachUsages && currentUsages.length > 0 ? {
            ...nextDocument,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          } : currentState.document,
          site: {
            ...currentState.site,
            settings: setValueAtPath(
              currentState.site.settings,
              `${PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY}.items`,
              nextItems
            )
          },
          selectedBlockId: selectedSource ? null : selectedUsage ? selectedBlockId : currentState.selectedBlockId,
          selectedComponentLibrarySource: currentState.selectedComponentLibrarySource?.itemId === itemId ? null : currentState.selectedComponentLibrarySource,
          selectedField: selectedSource || selectedUsage ? null : currentState.selectedField,
          contentRevision: bumpContentRevision(currentState)
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
          updater(item)
        ),
        contentRevision: bumpContentRevision(currentState)
      }));
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
          selectedComponentLibrarySource: null,
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
        selectedComponentLibrarySource: null,
        selectedField: null,
        collapsedBlockIds: {},
        mode: normalizePhotonMode(state.mode, state.isAdmin),
        contentRevision: 0
      }));
    },
    updateDocumentMetadata: (patch) => {
      const state = get();
      if (!canMutatePhotonState(state)) {
        return;
      }
      set((currentState) => {
        const current = currentState.document;
        const nextRoutePatterns = "routePatterns" in patch ? patch.routePatterns : current.routePatterns;
        const nextName = patch.name ?? current.name;
        const nextRoute = patch.route ?? current.route;
        if (nextName === current.name && nextRoute === current.route && arePhotonValuesEqual(
          nextRoutePatterns ?? null,
          current.routePatterns ?? null
        )) {
          return currentState;
        }
        return {
          document: {
            ...current,
            name: nextName,
            route: nextRoute,
            routePatterns: nextRoutePatterns,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          contentRevision: bumpContentRevision(currentState)
        };
      });
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
          selectedComponentLibrarySource: null,
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
import { jsx, jsxs } from "react/jsx-runtime";
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
var defaultPhotonLinkFactory = (href) => sanitizePhotonLinkHref(href);
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
  requestAuthAction,
  interactionSurfaces = [],
  interactionActions = [],
  interactionGuards = [],
  interactionGuardEvaluators = {},
  interactionSurfaceRenderers = {},
  navigate,
  prefetch,
  linkComponent = DefaultPhotonLinkComponent,
  linkFactory = defaultPhotonLinkFactory,
  navigation = {},
  siteFrameExtensions = [],
  accountTabs = [],
  routeContextFields = [],
  routeContextValues = {}
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
  const lastExternalStateFingerprintRef = useRef(
    externalStateFingerprint
  );
  const dispatchInteractionToast = (template) => {
    const description = template.description;
    switch (template.status ?? "message") {
      case "success":
        toast.success(template.title, { description });
        break;
      case "error":
        toast.error(template.title, { description });
        break;
      case "info":
        toast.info(template.title, { description });
        break;
      case "warning":
        toast.warning(template.title, { description });
        break;
      default:
        toast(template.title, { description });
        break;
    }
  };
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
      requestAuthAction,
      interactionSurfaces,
      interactionActions,
      interactionGuards,
      interactionGuardEvaluators,
      interactionSurfaceRenderers,
      dispatchInteractionToast,
      navigate,
      prefetch,
      linkComponent,
      linkFactory,
      navigation,
      siteFrameExtensions,
      accountTabs,
      routeContextFields,
      routeContextValues,
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
    if ((storeRef.current?.getState().contentRevision ?? 0) !== 0) {
      return;
    }
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
      if (state.isAdmin === isAdmin && state.uploadMedia === uploadMedia && state.searchSite === searchSite && state.requestAuthAction === requestAuthAction && state.requestAuthFallback === requestAuth && state.interactionSurfaces === interactionSurfaces && state.interactionActions === interactionActions && state.interactionGuards === interactionGuards && state.interactionGuardEvaluators === interactionGuardEvaluators && state.interactionSurfaceRenderers === interactionSurfaceRenderers && state.navigate === navigate && state.prefetch === prefetch && state.linkComponent === linkComponent && state.linkFactory === linkFactory && JSON.stringify(state.navigation) === JSON.stringify(navigation) && state.siteFrameExtensions === siteFrameExtensions && JSON.stringify(state.accountTabs) === JSON.stringify(accountTabs) && state.routeContextFields === routeContextFields && JSON.stringify(state.routeContextValues) === JSON.stringify(routeContextValues) && state.contentLocale === (i18n?.contentLocale ?? state.contentLocale) && state.defaultLocale === (i18n?.defaultLocale ?? state.defaultLocale) && state.mode === nextMode && JSON.stringify(state.capabilities) === JSON.stringify(normalizedCapabilities) && JSON.stringify(state.workspace) === JSON.stringify(normalizedWorkspace)) {
        return state;
      }
      return {
        ...state,
        isAdmin,
        workspace: normalizedWorkspace,
        capabilities: normalizedCapabilities,
        uploadMedia,
        searchSite,
        requestAuthAction,
        requestAuthFallback: requestAuth,
        interactionSurfaces,
        interactionActions,
        interactionGuards,
        interactionGuardEvaluators,
        interactionSurfaceRenderers,
        navigate,
        prefetch,
        linkComponent,
        linkFactory,
        navigation: clonePhotonValue(navigation),
        siteFrameExtensions,
        accountTabs: clonePhotonValue(accountTabs),
        routeContextFields,
        routeContextValues: clonePhotonValue(routeContextValues),
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
    linkFactory,
    linkComponent,
    navigate,
    prefetch,
    navigation,
    siteFrameExtensions,
    accountTabs,
    routeContextFields,
    routeContextValues,
    interactionSurfaces,
    interactionActions,
    interactionGuards,
    interactionGuardEvaluators,
    interactionSurfaceRenderers,
    requestAuth,
    requestAuthAction,
    searchSite,
    uploadMedia,
    workspace
  ]);
  return /* @__PURE__ */ jsx(PhotonI18nProvider, { value: i18n, children: /* @__PURE__ */ jsxs(PhotonContext.Provider, { value: storeRef.current, children: [
    children,
    /* @__PURE__ */ jsx(PhotonStoreInteractionSurfaceHost, {})
  ] }) });
};
var PhotonStoreInteractionSurfaceHost = () => {
  const request = usePhotonStore((state) => state.activeInteractionSurface);
  const renderers = usePhotonStore(
    (state) => state.interactionSurfaceRenderers
  );
  const closeInteractionSurface = usePhotonStore(
    (state) => state.closeInteractionSurface
  );
  const completeInteractionSurface = usePhotonStore(
    (state) => state.completeInteractionSurface
  );
  return /* @__PURE__ */ jsx(
    PhotonInteractionSurfaceHost,
    {
      request,
      renderers,
      onOpenChange: (open) => {
        if (!open) {
          closeInteractionSurface();
        }
      },
      onComplete: completeInteractionSurface
    }
  );
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
var usePhotonSiteData = () => {
  const site = usePhotonStore((state) => state.site);
  const siteDataSchemas = usePhotonStore((state) => state.siteDataSchemas);
  const contentLocale = usePhotonStore((state) => state.contentLocale);
  return useMemo(
    () => resolvePhotonSiteData(siteDataSchemas, site.settings, {
      locale: contentLocale
    }),
    [contentLocale, siteDataSchemas, site.settings]
  );
};
var usePhotonRouteContext = () => usePhotonStore((state) => state.routeContextValues);
var usePhotonBlockActiveState = (blockId) => {
  const block = usePhotonStore(
    (state) => state.document.blocks.find((b) => b.id === blockId)
  );
  const registry = usePhotonStore((state) => state.registry);
  const conditionEvaluators = usePhotonStore(
    (state) => state.conditionEvaluators
  );
  const siteSettings = usePhotonStore((state) => state.site.settings);
  const resources = usePhotonStore((state) => state.resources);
  const routeContextValues = usePhotonStore(
    (state) => state.routeContextValues
  );
  const previewScenarioId = usePhotonStore(
    (state) => state.blockPreviewScenarios[blockId] ?? null
  );
  return useMemo(() => {
    const definition = block ? registry.getDefinition(block.module, block.type) : void 0;
    return resolvePhotonBlockActiveState({
      definition,
      evaluators: conditionEvaluators,
      context: {
        siteSettings,
        resources,
        routeContext: routeContextValues
      },
      previewScenarioId
    });
  }, [
    block,
    registry,
    conditionEvaluators,
    siteSettings,
    resources,
    routeContextValues,
    previewScenarioId
  ]);
};
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
  getPhotonSelectedBlock,
  PhotonProvider,
  usePhotonStoreApi,
  usePhotonStore,
  usePhoton,
  usePhotonFieldValue,
  usePhotonCanEdit,
  usePhotonSiteData,
  usePhotonRouteContext,
  usePhotonBlockActiveState,
  usePhotonPersistedState,
  PhotonLink
};
