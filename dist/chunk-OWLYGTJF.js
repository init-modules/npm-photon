import {
  buildPhotonSearchTargetId
} from "./chunk-FRFYYFDJ.js";
import {
  PhotonI18nProvider
} from "./chunk-NV6FZ3PQ.js";
import {
  getPhotonAnchorRel,
  sanitizePhotonLinkHref
} from "./chunk-V7CN23YR.js";
import {
  PHOTON_EMPTY_TEXT,
  canEditPhotonWorkspace,
  getValueAtPath,
  normalizePhotonWorkspaceCapabilities,
  normalizePhotonWorkspaceDescriptor
} from "./chunk-KAITZE7U.js";

// src/context/photon-public-context.tsx
import {
  createContext,
  createElement,
  useContext,
  useMemo
} from "react";
import { jsx } from "react/jsx-runtime";
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
  linkComponent = DefaultPhotonLinkComponent,
  siteFrameExtensions = [],
  accountTabs = []
}) => {
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
      requestAuth,
      linkComponent,
      siteFrameExtensions,
      accountTabs,
      contentLocale: i18n?.contentLocale ?? "en",
      defaultLocale: i18n?.defaultLocale ?? "en"
    }),
    [
      accountTabs,
      capabilities,
      i18n?.contentLocale,
      i18n?.defaultLocale,
      initialDocument,
      initialMode,
      initialPageSettings,
      initialResources,
      initialSite,
      isAdmin,
      linkComponent,
      registry,
      requestAuth,
      searchSite,
      siteFrameExtensions,
      workspace
    ]
  );
  return /* @__PURE__ */ jsx(PhotonI18nProvider, { value: i18n, children: /* @__PURE__ */ jsx(PhotonPublicContext.Provider, { value, children }) });
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
  const { document, resources, registry } = usePhoton();
  const block = findPhotonPublicBlock(document.blocks, blockId);
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
import { useEffect, useState } from "react";

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
  const [EditableTextEditor, setEditableTextEditor] = useState(null);
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
