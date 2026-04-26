"use client";
import {
  buildPhotonSearchTargetId
} from "./chunk-6LYMEWZL.js";
import {
  PhotonI18nProvider,
  PhotonInteractionSurfaceHost
} from "./chunk-O6DIDPAQ.js";
import {
  getPhotonAnchorRel,
  sanitizePhotonLinkHref
} from "./chunk-V7CN23YR.js";
import {
  PHOTON_EMPTY_TEXT,
  canEditPhotonWorkspace,
  executePhotonInteractionActionPresentation,
  executePhotonInteractionTriggerSlot,
  getPhotonComponentLibraryItems,
  getValueAtPath,
  normalizePhotonWorkspaceCapabilities,
  normalizePhotonWorkspaceDescriptor,
  parsePhotonComponentLibraryBlockId,
  photonInteractionExecutionSucceeded,
  resolvePhotonInteractionActionCatalog,
  resolvePhotonInteractionSurfaceCatalog,
  resolvePhotonInteractionSurfaceRequest,
  resolvePhotonInteractionToastTemplate
} from "./chunk-P4O7POLV.js";

// src/context/photon-public-context.tsx
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import { toast } from "sonner";
import { jsx, jsxs } from "react/jsx-runtime";
var PhotonPublicContext = createContext(
  null
);
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
var findPhotonPublicBlock = (blocks, blockId) => {
  for (const block of blocks) {
    if (block.id === blockId) {
      return block;
    }
    for (const area of block.areas ?? []) {
      const nestedBlock = findPhotonPublicBlock(area.blocks, blockId);
      if (nestedBlock) {
        return nestedBlock;
      }
    }
  }
  return null;
};
var findPhotonPublicComponentSourceBlock = (site, blockId) => {
  const parsed = parsePhotonComponentLibraryBlockId(blockId);
  if (!parsed) {
    return null;
  }
  const item = getPhotonComponentLibraryItems(site.settings)[parsed.itemId];
  return item ? findPhotonPublicBlock(item.blocks, parsed.sourceBlockId) : null;
};
var getPhotonPublicFieldBinding = (block, path) => {
  if (!block.bindings) {
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
  interactionSurfaceRenderers = {},
  navigate,
  prefetch,
  renderAuthPage,
  linkComponent = DefaultPhotonLinkComponent,
  linkFactory = defaultPhotonLinkFactory,
  navigation = {},
  siteFrameExtensions = [],
  accountTabs = []
}) => {
  const [activeInteractionSurface, setActiveInteractionSurface] = useState(null);
  const interactionSurfaceCatalog = useMemo(
    () => resolvePhotonInteractionSurfaceCatalog({
      definitions: interactionSurfaces,
      siteSettings: initialSite.settings
    }),
    [initialSite.settings, interactionSurfaces]
  );
  const interactionActionCatalog = useMemo(
    () => resolvePhotonInteractionActionCatalog({
      actions: interactionActions,
      guards: interactionGuards,
      surfaces: interactionSurfaces,
      policies: interactionPolicies,
      siteSettings: initialSite.settings
    }),
    [
      initialSite.settings,
      interactionActions,
      interactionGuards,
      interactionPolicies,
      interactionSurfaces
    ]
  );
  const showInteractionToast = useCallback(
    (input) => {
      const template = resolvePhotonInteractionToastTemplate(
        input,
        interactionSurfaceCatalog
      );
      if (!template) {
        return false;
      }
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
      return true;
    },
    [interactionSurfaceCatalog]
  );
  const openInteractionSurface = useCallback(
    (trigger) => {
      const request = resolvePhotonInteractionSurfaceRequest(
        trigger,
        interactionSurfaceCatalog
      );
      if (!request) {
        return false;
      }
      if (request.definition.kind === "toast") {
        return showInteractionToast({
          templateId: request.instance.id,
          overrides: {
            title: typeof request.props.title === "string" ? request.props.title : void 0,
            description: typeof request.props.description === "string" ? request.props.description : void 0,
            status: typeof request.props.status === "string" ? request.props.status : void 0,
            props: request.props
          }
        });
      }
      if (!interactionSurfaceRenderers[request.definition.rendererKey]) {
        return false;
      }
      setActiveInteractionSurface(request);
      return true;
    },
    [
      interactionSurfaceCatalog,
      interactionSurfaceRenderers,
      navigate,
      showInteractionToast
    ]
  );
  const executeInteractionAction = useCallback(
    (action) => executePhotonInteractionActionPresentation(action, {
      openInteractionSurface,
      showInteractionToast,
      navigate
    }),
    [navigate, openInteractionSurface, showInteractionToast]
  );
  const executeInteractionTriggerSlot = useCallback(
    (slot, options) => {
      const scenarioResources = options?.scenario?.resources;
      const resources = scenarioResources ? {
        ...initialResources,
        ...scenarioResources
      } : initialResources;
      return executePhotonInteractionTriggerSlot({
        slot,
        catalog: interactionActionCatalog,
        evaluators: interactionGuardEvaluators,
        context: {
          document: initialDocument,
          resources,
          pageSettings: initialPageSettings,
          site: initialSite,
          mode: isAdmin ? initialMode : "preview",
          isAdmin,
          scenarioId: options?.scenario?.id ?? options?.scenarioId
        },
        handlers: {
          openInteractionSurface,
          showInteractionToast,
          navigate
        }
      });
    },
    [
      initialDocument,
      initialMode,
      initialPageSettings,
      initialResources,
      initialSite,
      interactionActionCatalog,
      interactionGuardEvaluators,
      isAdmin,
      navigate,
      openInteractionSurface,
      showInteractionToast
    ]
  );
  const resolvedRequestAuth = useCallback(() => {
    const executedAction = executeInteractionAction(requestAuthAction);
    if (photonInteractionExecutionSucceeded(executedAction)) {
      return;
    }
    requestAuth?.();
  }, [
    executeInteractionAction,
    requestAuth,
    requestAuthAction
  ]);
  const value = useMemo(
    () => ({
      document: initialDocument,
      resources: initialResources,
      pageSettings: initialPageSettings,
      site: initialSite,
      registry,
      workspace: normalizePhotonWorkspaceDescriptor(workspace),
      capabilities: normalizePhotonWorkspaceCapabilities(capabilities),
      mode: isAdmin ? initialMode : "preview",
      isAdmin,
      searchSite,
      requestAuth: resolvedRequestAuth,
      openInteractionSurface,
      showInteractionToast,
      executeInteractionAction,
      executeInteractionTriggerSlot,
      navigate,
      prefetch,
      renderAuthPage,
      linkComponent,
      linkFactory,
      navigation,
      siteFrameExtensions,
      accountTabs,
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
      interactionSurfaceRenderers,
      contentLocale: i18n?.contentLocale ?? "en",
      defaultLocale: i18n?.defaultLocale ?? "en"
    }),
    [
      accountTabs,
      capabilities,
      executeInteractionAction,
      executeInteractionTriggerSlot,
      i18n?.contentLocale,
      i18n?.defaultLocale,
      initialDocument,
      initialMode,
      initialPageSettings,
      initialResources,
      initialSite,
      isAdmin,
      linkFactory,
      linkComponent,
      navigation,
      registry,
      navigate,
      openInteractionSurface,
      prefetch,
      renderAuthPage,
      resolvedRequestAuth,
      searchSite,
      showInteractionToast,
      siteFrameExtensions,
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
      interactionSurfaceRenderers,
      workspace
    ]
  );
  return /* @__PURE__ */ jsx(PhotonI18nProvider, { value: i18n, children: /* @__PURE__ */ jsxs(PhotonPublicContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsx(
      PhotonInteractionSurfaceHost,
      {
        request: activeInteractionSurface,
        renderers: interactionSurfaceRenderers,
        onOpenChange: (open) => {
          if (!open) {
            setActiveInteractionSurface(null);
          }
        }
      }
    )
  ] }) });
};
var usePhoton = () => {
  const context = useContext(PhotonPublicContext);
  if (!context) {
    throw new Error("usePhoton must be used within PhotonProvider");
  }
  return context;
};
var usePhotonStore = (selector) => selector(usePhoton());
var usePhotonFieldValue = (blockId, path) => {
  const { document, resources, registry, site } = usePhoton();
  const block = findPhotonPublicBlock(document.blocks, blockId) ?? findPhotonPublicComponentSourceBlock(site, blockId);
  if (!block) {
    return null;
  }
  const binding = getPhotonPublicFieldBinding(block, path);
  if (binding && binding.source in resources) {
    const adapter = binding.adapter ? registry.getBindingAdapter(binding.adapter) : void 0;
    const rawValue = getValueAtPath(
      resources[binding.source],
      binding.path
    );
    return adapter?.read ? adapter.read(rawValue) : rawValue;
  }
  return getValueAtPath(block.props, path);
};
var usePhotonCanEdit = () => usePhotonStore(
  (state) => state.isAdmin && state.mode !== "preview" && canEditPhotonWorkspace(state.workspace, state.capabilities)
);
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

// src/components/public/public-editable-text.tsx
import clsx from "clsx";
import { useEffect, useState as useState2 } from "react";

// src/helpers/editable-editor-loaders.ts
var getPhotonEditableEditorLoader = (key) => globalThis.__photonEditableEditorLoaders?.[key] ?? null;

// src/components/public/public-editable-text.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var EditableText = ({
  blockId,
  path,
  as: Tag = "span",
  className,
  placeholder = PHOTON_EMPTY_TEXT,
  ...rest
}) => {
  const canEdit = usePhotonCanEdit();
  const value = String(usePhotonFieldValue(blockId, path) ?? "");
  const [EditableTextEditor, setEditableTextEditor] = useState2(null);
  useEffect(() => {
    if (!canEdit || EditableTextEditor) {
      return;
    }
    let cancelled = false;
    const loadEditor = getPhotonEditableEditorLoader("text");
    if (!loadEditor) {
      return;
    }
    void loadEditor().then((component) => {
      if (!cancelled) {
        setEditableTextEditor(() => component);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [canEdit, EditableTextEditor]);
  if (canEdit && EditableTextEditor) {
    return /* @__PURE__ */ jsx2(
      EditableTextEditor,
      {
        blockId,
        path,
        as: Tag,
        className,
        placeholder,
        ...rest
      }
    );
  }
  return /* @__PURE__ */ jsx2(
    Tag,
    {
      ...rest,
      "data-photon-search-target": buildPhotonSearchTargetId(blockId, path),
      className: clsx(className, !value && "opacity-60"),
      children: value || placeholder
    }
  );
};

export {
  PhotonProvider,
  usePhoton,
  usePhotonStore,
  usePhotonFieldValue,
  usePhotonCanEdit,
  PhotonLink,
  getPhotonEditableEditorLoader,
  EditableText
};
