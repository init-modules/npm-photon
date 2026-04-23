import {
  EditableImage
} from "./chunk-FXGTS64K.js";
import {
  EditableRichText
} from "./chunk-AKPXDP4R.js";
import {
  EditableText as EditableText2
} from "./chunk-CZTXEKVS.js";
import {
  EditableTextarea
} from "./chunk-3DD2HNCR.js";
import {
  PhotonBlockRenderer,
  PhotonFieldEditorList,
  PhotonStudio
} from "./chunk-WV3U2BZT.js";
import {
  PhotonRichTextEditor,
  photonRichTextContentClassName,
  renderPhotonRichTextHtml
} from "./chunk-KSRBTT5H.js";
import {
  EditableImage as EditableImage2,
  EditableTextarea as EditableTextarea2,
  PhotonSiteSearch,
  collectHeaderActionLinkKeys,
  collectUniqueHeaderLinks,
  getHeaderActionVisibleHref,
  getHeaderCartLink,
  getHeaderCartQuantity,
  getHeaderLinkDedupeKey,
  getHeaderLinkPathname,
  hasAuthenticatedUser,
  hasCommerceBlock,
  hasCommerceRuntimeResource,
  isCartLinkHref,
  isCommerceExtensionId,
  isPhotonPublicFramelessSiteDesign,
  isProtectedAccountHref,
  normalizeHeaderHref,
  normalizePhotonSiteLinkItems,
  normalizePhotonSiteNavigationColumns,
  normalizePhotonSiteStringItems
} from "./chunk-GVYQNPDL.js";
import {
  KeyboardMenuList,
  PhotonRenderDepthProvider,
  PhotonSearchHighlightEffect,
  useKeyboardMenuController,
  usePhotonRenderDepth
} from "./chunk-3BZZZBLC.js";
import {
  EditableText
} from "./chunk-OWLYGTJF.js";
import {
  buildPhotonSearchResultHref,
  buildPhotonSearchTargetId
} from "./chunk-FRFYYFDJ.js";
import {
  normalizePhotonSelectionForMode,
  resolvePhotonAccess,
  resolvePhotonMode,
  resolvePhotonRequestHeaders,
  resolvePhotonWorkspaceParams
} from "./chunk-LOTB3E2O.js";
import {
  createPhotonRuntime
} from "./chunk-TSSJCQJA.js";
import {
  collectPhotonFooterExtensionItems,
  collectPhotonHeaderExtensionItems,
  createPhotonAccountTabExtension,
  createPhotonSiteFrameExtension,
  resolvePhotonAccountTabs,
  resolvePhotonSiteFrameExtensions
} from "./chunk-JSXMWVKI.js";
import {
  getPhotonSurfaceModeStyle
} from "./chunk-IOB5G6YT.js";
import {
  PHOTON_DEFAULT_SITE_DESIGN_PRESET_ID,
  PHOTON_SITE_DESIGN_DEFAULTS,
  PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS,
  applyPhotonSiteColorScheme,
  applyPhotonSiteDesignPreset,
  createPhotonSiteDesignSettings,
  getPhotonSiteColorScheme,
  getPhotonSiteDesignPreset,
  hasPhotonSiteDesignPresetCustomization,
  isPhotonFramelessPreset,
  isPhotonFramelessSiteDesign,
  isPhotonSiteDesignPresetApplied,
  photonSiteColorSchemes,
  photonSiteDesignPresets,
  resolvePhotonSiteDesignSettings
} from "./chunk-UVEN3EYU.js";
import {
  PHOTON_SEARCH_OCCURRENCE_PARAM,
  PHOTON_SEARCH_QUERY_PARAM,
  PHOTON_SEARCH_TARGET_PARAM
} from "./chunk-CZ47CC3D.js";
import {
  EditableGallery
} from "./chunk-RHIWNP5B.js";
import "./chunk-RLJXTXGN.js";
import "./chunk-K6EYZM4G.js";
import {
  PhotonLink,
  PhotonProvider,
  usePhoton,
  usePhotonCanEdit,
  usePhotonFieldValue,
  usePhotonPersistedState,
  usePhotonStore,
  usePhotonStoreApi
} from "./chunk-BIMQCHT5.js";
import {
  isPhotonMediaValue,
  resolvePhotonMediaPreviewUrl,
  resolvePhotonMediaUrl,
  updatePhotonMediaUrl
} from "./chunk-QQDDM7OM.js";
import {
  PhotonI18nProvider,
  resolvePhotonText,
  usePhotonI18n
} from "./chunk-NV6FZ3PQ.js";
import {
  PHOTON_PAGE_SURFACE_REGION_KEY,
  collectPhotonAccountTabs,
  collectPhotonDocuments,
  collectPhotonSiteFrameExtensions,
  composePhotonSurfaceDocument,
  createPhotonBlock,
  createPhotonBlockLocalizationSchema,
  createPhotonKit,
  createPhotonLocalizationManifest,
  createPhotonLocalizedDefault,
  createPhotonRegistry,
  decomposePhotonSurfaceDocument,
  definePhotonBlockDefinition,
  getFirstPhotonSurfaceEditableBlockId,
  getPhotonDefinitionKey,
  getPhotonDocumentFingerprint,
  getPhotonSurfaceRegionBlocks,
  getPhotonSurfaceRegionListId,
  isPhotonInstallableKit,
  movePhotonArrayItem,
  resolvePhotonModules,
  resolvePhotonSurfaceRegionDescriptors,
  resolvePhotonSurfaceRegionForBlockId,
  resolvePhotonSurfaceRegionForListId
} from "./chunk-YNXZBS6V.js";
import {
  decodePhotonHtmlEntities,
  getPhotonAnchorRel,
  normalizePhotonUrlForProtocolCheck,
  sanitizePhotonLinkHref
} from "./chunk-V7CN23YR.js";
import {
  clonePhotonBlockTreeWithNewIds,
  collectBlockIds,
  duplicatePhotonBlockInDocument,
  findPhotonBlock,
  getFirstPhotonBlockId,
  insertPhotonBlockInDocument,
  movePhotonBlockInDocument,
  removePhotonBlockFromDocument,
  updatePhotonBlockInDocument
} from "./chunk-UZJ5GO74.js";
import {
  PHOTON_ROOT_LIST_ID,
  createPhotonAreaListId,
  createPhotonNodeId
} from "./chunk-U2HNHTED.js";
import {
  DEFAULT_PHOTON_WORKSPACE_CAPABILITIES,
  DEFAULT_PHOTON_WORKSPACE_REF,
  PHOTON_EMPTY_TEXT,
  canEditPhotonWorkspace,
  canSavePhotonWorkspace,
  clonePhotonValue,
  getPhotonWorkspaceIdentityKey,
  getPhotonWorkspaceKey,
  getValueAtPath,
  isPhotonWorkspaceReadonly,
  normalizePhotonWorkspaceCapabilities,
  normalizePhotonWorkspaceDescriptor,
  normalizePhotonWorkspaceRef,
  setValueAtPath
} from "./chunk-KAITZE7U.js";

// src/helpers/register-editable-editor-loaders.ts
var registerLoader = (key, loader) => {
  globalThis.__photonEditableEditorLoaders = {
    ...globalThis.__photonEditableEditorLoaders,
    [key]: loader
  };
};
registerLoader(
  "gallery",
  () => import("./editable-gallery-WZ3NYYEE.js").then(
    (module) => module.EditableGallery
  )
);
registerLoader(
  "image",
  () => import("./editable-image-6N3JBB2H.js").then(
    (module) => module.EditableImage
  )
);
registerLoader(
  "richText",
  () => import("./editable-rich-text-REURWOWE.js").then(
    (module) => module.EditableRichText
  )
);
registerLoader(
  "text",
  () => import("./editable-text-7OZM2EDP.js").then(
    (module) => module.EditableText
  )
);
registerLoader(
  "textarea",
  () => import("./editable-textarea-CBXC2QKY.js").then(
    (module) => module.EditableTextarea
  )
);

// src/components/editable/editable-repeater-value.tsx
import { jsx } from "react/jsx-runtime";
var EditableRepeaterValue = ({
  blockId,
  path,
  fallback,
  className,
  as
}) => {
  return /* @__PURE__ */ jsx(
    EditableText2,
    {
      blockId,
      path,
      placeholder: fallback,
      className,
      as
    }
  );
};

// src/components/editable/use-photon-value-at-path.ts
var usePhotonValueAtPath = (blockId, path) => {
  return usePhotonFieldValue(blockId, path);
};

// src/components/surface-section.tsx
import {
  createElement
} from "react";
var PhotonSurfaceSection = ({
  as,
  children,
  className,
  style,
  surfaceMode = "contained"
}) => {
  const Component = as ?? "section";
  const surfaceStyle = getPhotonSurfaceModeStyle(surfaceMode);
  return createElement(
    Component,
    {
      className,
      style: surfaceStyle ? { ...surfaceStyle, ...style } : style,
      "data-photon-surface-mode": surfaceMode
    },
    children
  );
};

// src/helpers/binding.ts
import { generateHTML, generateJSON } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
var photonBindingExtensions = [StarterKit];
var normalizeRichTextHtml = (value) => {
  const trimmed = value.trim();
  return trimmed === "" ? "<p></p>" : trimmed;
};
var createPhotonTiptapJsonBindingAdapter = (key) => ({
  key,
  read: (value) => {
    if (typeof value === "string") {
      return value;
    }
    if (!value || typeof value !== "object") {
      return "";
    }
    try {
      return generateHTML(
        value,
        photonBindingExtensions
      );
    } catch {
      return "";
    }
  },
  write: (value) => {
    if (typeof value !== "string") {
      return null;
    }
    try {
      const parsed = generateJSON(
        normalizeRichTextHtml(value),
        photonBindingExtensions
      );
      const blocks = Array.isArray(parsed.content) ? parsed.content : [];
      return blocks.length === 0 ? null : parsed;
    } catch {
      return null;
    }
  }
});

// src/modules/system.tsx
import clsx3 from "clsx";

// src/modules/system/site/site-design-settings-panel.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var designFields = [
  {
    path: "bodyFontFamily",
    label: "Body font family",
    labelKey: "photon.system.design.bodyFontFamily.label",
    kind: "text",
    description: "Any valid CSS font-family stack.",
    descriptionKey: "photon.system.design.bodyFontFamily.description"
  },
  {
    path: "headingFontFamily",
    label: "Heading font family",
    labelKey: "photon.system.design.headingFontFamily.label",
    kind: "text",
    description: "Used by system header/footer shells and any package that opts into the shared site tokens.",
    descriptionKey: "photon.system.design.headingFontFamily.description"
  },
  {
    path: "backgroundColor",
    label: "Page background",
    labelKey: "photon.system.design.backgroundColor.label",
    kind: "color"
  },
  {
    path: "surfaceColor",
    label: "Surface color",
    labelKey: "photon.system.design.surfaceColor.label",
    kind: "color"
  },
  {
    path: "textColor",
    label: "Text color",
    labelKey: "photon.system.design.textColor.label",
    kind: "color"
  },
  {
    path: "mutedTextColor",
    label: "Muted text color",
    labelKey: "photon.system.design.mutedTextColor.label",
    kind: "color"
  },
  {
    path: "accentColor",
    label: "Accent color",
    labelKey: "photon.system.design.accentColor.label",
    kind: "color"
  },
  {
    path: "borderColor",
    label: "Border color",
    labelKey: "photon.system.design.borderColor.label",
    kind: "color"
  },
  {
    path: "siteMaxWidth",
    label: "Site max width",
    labelKey: "photon.system.design.siteMaxWidth.label",
    kind: "text",
    description: "CSS width value used by the main content rail, for example 1280px or 92rem.",
    descriptionKey: "photon.system.design.siteMaxWidth.description"
  },
  {
    path: "pageGutter",
    label: "Page gutter",
    labelKey: "photon.system.design.pageGutter.label",
    kind: "text",
    description: "Horizontal spacing applied around the live page surface.",
    descriptionKey: "photon.system.design.pageGutter.description"
  },
  {
    path: "sectionGap",
    label: "Section gap",
    labelKey: "photon.system.design.sectionGap.label",
    kind: "text",
    description: "Vertical spacing between top-level blocks in the page region.",
    descriptionKey: "photon.system.design.sectionGap.description"
  },
  {
    path: "radius",
    label: "Radius",
    labelKey: "photon.system.design.radius.label",
    kind: "text",
    description: "Shared radius token consumed by the system shells.",
    descriptionKey: "photon.system.design.radius.description"
  },
  {
    path: "headerOffset",
    label: "Header offset",
    labelKey: "photon.system.design.headerOffset.label",
    kind: "text",
    description: "Extra top offset applied to sticky site headers on top of the builder dock.",
    descriptionKey: "photon.system.design.headerOffset.description"
  }
];
var summaryCardStyle = {
  borderColor: "var(--photon-builder-border)",
  background: "var(--photon-builder-panel-muted)",
  color: "var(--photon-builder-text)"
};
var highlightCardStyle = {
  borderColor: "var(--photon-builder-border-strong)",
  background: "linear-gradient(180deg, color-mix(in srgb, var(--photon-builder-accent) 10%, transparent), var(--photon-builder-panel-muted))",
  color: "var(--photon-builder-text)"
};
var badgeStyle = {
  borderColor: "var(--photon-builder-border)",
  background: "var(--photon-builder-panel-solid)",
  color: "var(--photon-builder-text-soft)"
};
var tokenPreviewItems = [
  {
    key: "backgroundColor",
    label: "Background"
  },
  {
    key: "surfaceColor",
    label: "Surface"
  },
  {
    key: "textColor",
    label: "Text"
  },
  {
    key: "mutedTextColor",
    label: "Muted"
  },
  {
    key: "accentColor",
    label: "Accent"
  },
  {
    key: "borderColor",
    label: "Border"
  }
];
var DetailBadge = ({ label }) => /* @__PURE__ */ jsx2(
  "span",
  {
    className: "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
    style: badgeStyle,
    children: label
  }
);
var SiteDesignSettingsPanelBody = ({
  scopeSettings,
  getValue,
  setValue,
  focusField,
  viewMode
}) => {
  const { translate } = usePhotonI18n();
  const resolvedSettings = resolvePhotonSiteDesignSettings(scopeSettings);
  const isAdvancedView = viewMode === "advanced";
  const activePreset = resolvedSettings.presetId ? photonSiteDesignPresets.find(
    (candidate) => candidate.id === resolvedSettings.presetId
  ) ?? null : null;
  const activeColorScheme = resolvedSettings.colorSchemeId ? photonSiteColorSchemes.find(
    (candidate) => candidate.id === resolvedSettings.colorSchemeId
  ) ?? null : null;
  if (isAdvancedView) {
    return /* @__PURE__ */ jsxs("section", { className: "space-y-4", "data-testid": "photon-design-manual-tokens", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx2(
          "div",
          {
            className: "text-sm font-semibold",
            style: { color: "var(--photon-builder-text)" },
            children: translate(
              "photon.system.design.manual.sectionTitle",
              "Manual tokens"
            )
          }
        ),
        /* @__PURE__ */ jsx2(
          "div",
          {
            className: "text-sm leading-6",
            style: { color: "var(--photon-builder-text-muted)" },
            children: translate(
              "photon.system.design.manual.sectionDescription",
              "Edit the active profile tokens directly here. These overrides live inside the selected profile branch and revision."
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx2(
        PhotonFieldEditorList,
        {
          fields: designFields,
          subjectId: "site-design-settings",
          getValue,
          onChange: setValue,
          onFocus: focusField
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", "data-testid": "photon-design-profile-source-summary", children: [
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "rounded-[24px] border p-4 sm:p-5",
        style: highlightCardStyle,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx2(
              "div",
              {
                className: "text-sm font-semibold",
                style: { color: "var(--photon-builder-text)" },
                children: translate(
                  "photon.system.design.profileSource.sectionTitle",
                  "Profile source"
                )
              }
            ),
            /* @__PURE__ */ jsx2(
              "div",
              {
                className: "text-sm leading-6",
                style: { color: "var(--photon-builder-text-muted)" },
                children: translate(
                  "photon.system.design.profileSource.sectionDescription",
                  "Starter presets and design templates are chosen when a website profile is created. This tab shows the current profile source metadata, while token editing lives in Advanced Design."
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "rounded-[22px] border p-4",
                style: summaryCardStyle,
                "data-testid": "photon-design-source-preset",
                children: [
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "text-[11px] uppercase tracking-[0.28em]",
                      style: { color: "var(--photon-builder-text-soft)" },
                      children: translate(
                        "photon.system.design.profileSource.presetLabel",
                        "Starter preset"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "mt-3 text-lg font-semibold",
                      style: { color: "var(--photon-builder-text)" },
                      children: activePreset?.label ?? translate(
                        "photon.system.design.profileSource.blankPreset",
                        "Blank or migrated profile"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "mt-2 text-sm leading-6",
                      style: { color: "var(--photon-builder-text-muted)" },
                      children: activePreset?.description ?? translate(
                        "photon.system.design.profileSource.blankPresetDescription",
                        "This profile has no starter preset metadata. Its current appearance is defined entirely by the stored design tokens below and the active branch history."
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
                    /* @__PURE__ */ jsx2(
                      DetailBadge,
                      {
                        label: activePreset?.appearance === "dark" ? translate(
                          "photon.system.design.appearance.dark",
                          "Dark"
                        ) : activePreset?.appearance === "light" ? translate(
                          "photon.system.design.appearance.light",
                          "Light"
                        ) : translate(
                          "photon.system.design.profileSource.customized",
                          "Custom"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx2(DetailBadge, { label: resolvedSettings.siteMaxWidth }),
                    /* @__PURE__ */ jsx2(DetailBadge, { label: resolvedSettings.sectionGap })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "rounded-[22px] border p-4",
                style: summaryCardStyle,
                "data-testid": "photon-design-source-color-scheme",
                children: [
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "text-[11px] uppercase tracking-[0.28em]",
                      style: { color: "var(--photon-builder-text-soft)" },
                      children: translate(
                        "photon.system.design.profileSource.schemeLabel",
                        "Stored palette"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "mt-3 text-lg font-semibold",
                      style: { color: "var(--photon-builder-text)" },
                      children: activeColorScheme?.label ?? translate(
                        "photon.system.design.profileSource.customPalette",
                        "Manual palette"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "mt-2 text-sm leading-6",
                      style: { color: "var(--photon-builder-text-muted)" },
                      children: activeColorScheme?.description ?? translate(
                        "photon.system.design.profileSource.customPaletteDescription",
                        "The current branch stores color tokens directly, so no named palette is attached to this profile state."
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "mt-4 flex flex-wrap gap-2",
                      "data-testid": "photon-design-runtime-palette",
                      children: tokenPreviewItems.map(({ key, label }) => /* @__PURE__ */ jsxs(
                        "span",
                        {
                          className: "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs",
                          style: badgeStyle,
                          children: [
                            /* @__PURE__ */ jsx2(
                              "span",
                              {
                                className: "h-3 w-3 rounded-full border",
                                style: {
                                  backgroundColor: resolvedSettings[key],
                                  borderColor: "var(--photon-builder-border)"
                                }
                              }
                            ),
                            label
                          ]
                        },
                        key
                      ))
                    }
                  )
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "rounded-[24px] border p-4 sm:p-5",
        style: summaryCardStyle,
        "data-testid": "photon-design-workspace-guidance",
        children: [
          /* @__PURE__ */ jsx2(
            "div",
            {
              className: "text-sm font-semibold",
              style: { color: "var(--photon-builder-text)" },
              children: translate(
                "photon.system.design.workspaceGuidance.title",
                "How to change the source"
              )
            }
          ),
          /* @__PURE__ */ jsx2(
            "div",
            {
              className: "mt-2 text-sm leading-6",
              style: { color: "var(--photon-builder-text-muted)" },
              children: translate(
                "photon.system.design.workspaceGuidance.description",
                "To start from another preset or immutable design template, create a new website profile from the workspace panel. To evolve the current profile, keep editing the stored tokens in Advanced Design."
              )
            }
          )
        ]
      }
    )
  ] });
};
var siteDesignSettingsPanel = {
  key: "design",
  label: "Design",
  labelKey: "photon.system.design.panel.label",
  description: "Profile source metadata and stored runtime design tokens for the current branch.",
  descriptionKey: "photon.system.design.panel.description",
  order: 10,
  component: (props) => /* @__PURE__ */ jsx2(SiteDesignSettingsPanelBody, { ...props })
};

// src/modules/system/site/site-footer-shell-definition.tsx
import clsx from "clsx";
import { ArrowRight, Send } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var siteFooterFields = [
  {
    path: "variant",
    label: "Variant",
    kind: "select",
    group: "style",
    localization: "shared",
    options: [
      { label: "Classic dark", value: "classic-dark" },
      { label: "Soft cards", value: "soft-cards" },
      { label: "Minimal air", value: "minimal-air" }
    ]
  },
  {
    path: "brandTitle",
    label: "Brand title",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "brandBody",
    label: "Brand body",
    kind: "textarea",
    group: "content",
    localization: "localized"
  },
  {
    path: "logoImage",
    label: "Logo image",
    kind: "image",
    group: "content",
    localization: "shared"
  },
  {
    path: "subscriptionTitle",
    label: "Subscription title",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "subscriptionBody",
    label: "Subscription body",
    kind: "textarea",
    group: "content",
    localization: "localized"
  },
  {
    path: "subscriptionPlaceholder",
    label: "Subscription placeholder",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "subscriptionButtonLabel",
    label: "Subscription button label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "navigationColumns",
    label: "Navigation columns",
    kind: "repeater",
    group: "content",
    localization: "localized",
    itemLabelPath: "title",
    addLabel: "Add navigation column",
    fields: [
      { path: "title", label: "Title", kind: "text" },
      {
        path: "links",
        label: "Links",
        kind: "repeater",
        addLabel: "Add link",
        itemLabelPath: "label",
        fields: [
          { path: "label", label: "Label", kind: "text" },
          { path: "href", label: "Href", kind: "url", localization: "shared" }
        ]
      }
    ]
  },
  {
    path: "contactItems",
    label: "Contact items",
    kind: "repeater",
    group: "content",
    localization: "localized",
    addLabel: "Add contact item",
    itemLabel: "Contact item",
    itemField: { label: "Contact item", kind: "text" }
  },
  {
    path: "legalLabel",
    label: "Legal label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "legalHref",
    label: "Legal href",
    kind: "url",
    group: "content",
    localization: "shared"
  },
  {
    path: "copyrightLabel",
    label: "Copyright label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "developerLabel",
    label: "Developer label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "developerHref",
    label: "Developer href",
    kind: "url",
    group: "content",
    localization: "shared"
  },
  {
    path: "disabledExtensionIds",
    label: "Disabled package extensions",
    kind: "tags",
    group: "layout",
    localization: "shared"
  },
  {
    path: "disabledExtensionItemIds",
    label: "Disabled package extension items",
    kind: "tags",
    group: "layout",
    localization: "shared"
  }
];
var footerVariantStyles = {
  "classic-dark": {
    shell: "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--photon-site-surface)_94%,black)_0%,color-mix(in_srgb,var(--photon-site-background)_88%,black)_100%)] text-white",
    card: "border-white/10 bg-white/[0.04]",
    text: "text-white",
    muted: "text-white/60"
  },
  "soft-cards": {
    shell: "bg-[linear-gradient(180deg,#f7f7fb_0%,#eef2f7_100%)] text-[var(--photon-site-text)]",
    card: "border-[var(--photon-site-border)] bg-white/85",
    text: "text-[var(--photon-site-text)]",
    muted: "text-[var(--photon-site-muted)]"
  },
  "minimal-air": {
    shell: "border-t border-[var(--photon-site-border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--photon-site-background)_94%,white)_0%,color-mix(in_srgb,var(--photon-site-surface)_94%,white)_100%)] text-[var(--photon-site-text)] shadow-none",
    card: "border-transparent bg-transparent",
    text: "text-[var(--photon-site-text)]",
    muted: "text-[var(--photon-site-muted)]"
  }
};
var SiteFooterShell = ({
  block
}) => {
  const siteDesign = usePhotonStore((state) => state.site.settings.design);
  const siteFrameExtensions = usePhotonStore(
    (state) => state.siteFrameExtensions
  );
  const framelessSite = isPhotonPublicFramelessSiteDesign(siteDesign);
  const footerVariant = framelessSite ? "minimal-air" : block.props.variant;
  const variant = footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"];
  const isSoftCardsVariant = footerVariant === "soft-cards" && !framelessSite;
  const disabledExtensionIds = normalizePhotonSiteStringItems(
    block.props.disabledExtensionIds
  );
  const disabledExtensionItemIds = normalizePhotonSiteStringItems(
    block.props.disabledExtensionItemIds
  );
  const footerExtensionItems = collectPhotonFooterExtensionItems(
    resolvePhotonSiteFrameExtensions(siteFrameExtensions, disabledExtensionIds),
    disabledExtensionItemIds
  );
  const navigationColumns = [
    ...normalizePhotonSiteNavigationColumns(block.props.navigationColumns),
    ...normalizePhotonSiteNavigationColumns(
      footerExtensionItems.navigationColumns
    )
  ];
  const legalLinks = normalizePhotonSiteLinkItems(
    footerExtensionItems.legalLinks
  );
  const contactItems = normalizePhotonSiteStringItems(block.props.contactItems);
  return /* @__PURE__ */ jsx3(
    "footer",
    {
      className: clsx(
        "w-full transition-colors duration-300",
        (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).shell
      ),
      children: /* @__PURE__ */ jsxs2("div", { className: "mx-auto flex w-full max-w-[var(--photon-site-max-width,1280px)] flex-col gap-5 px-[var(--photon-site-gutter,24px)] py-8 pb-12 sm:py-10 sm:pb-14", children: [
        /* @__PURE__ */ jsxs2("div", { className: "grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]", children: [
          /* @__PURE__ */ jsx3(
            "div",
            {
              className: clsx(
                footerVariant === "minimal-air" ? "rounded-none border-0 border-b border-[var(--photon-site-border)] px-0 pb-6 pt-0 sm:px-0" : "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: /* @__PURE__ */ jsxs2("div", { className: "grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)]", children: [
                /* @__PURE__ */ jsx3("div", { className: "relative h-24 w-24 overflow-hidden rounded-[28px] border border-[var(--photon-site-border)] bg-[linear-gradient(180deg,rgba(15,118,110,0.16),rgba(15,118,110,0.04))]", children: block.props.logoImage ? /* @__PURE__ */ jsx3(
                  EditableImage2,
                  {
                    blockId: block.id,
                    path: "logoImage",
                    className: "h-full w-full rounded-[28px]",
                    imageClassName: "h-full w-full object-contain p-3",
                    fallbackAlt: block.props.brandTitle
                  }
                ) : /* @__PURE__ */ jsx3("div", { className: "flex h-full items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--photon-site-accent)]", children: /* @__PURE__ */ jsx3(
                  EditableText,
                  {
                    blockId: block.id,
                    path: "brandTitle",
                    className: "text-[var(--photon-site-accent)]"
                  }
                ) }) }),
                /* @__PURE__ */ jsxs2("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx3(
                    EditableText,
                    {
                      blockId: block.id,
                      path: "brandTitle",
                      as: "h2",
                      className: clsx(
                        "[font-family:var(--photon-site-heading-font)] text-3xl font-semibold tracking-[-0.05em]",
                        variant.text
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx3(
                    EditableTextarea2,
                    {
                      blockId: block.id,
                      path: "brandBody",
                      className: clsx("mt-4 leading-7", variant.muted)
                    }
                  )
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs2(
            "div",
            {
              className: clsx(
                footerVariant === "minimal-air" ? "rounded-none border-0 px-0 py-0 sm:px-0" : "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                block.props.variant === "soft-cards" && !framelessSite ? "border-transparent bg-[linear-gradient(135deg,var(--photon-site-accent),color-mix(in srgb,var(--photon-site-accent) 72%, white))] text-white shadow-[0_28px_60px_rgba(15,118,110,0.24)]" : (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: [
                /* @__PURE__ */ jsxs2("div", { className: "max-w-xl", children: [
                  /* @__PURE__ */ jsx3(
                    EditableText,
                    {
                      blockId: block.id,
                      path: "subscriptionTitle",
                      as: "h3",
                      className: "[font-family:var(--photon-site-heading-font)] text-2xl font-semibold tracking-[-0.04em]"
                    }
                  ),
                  /* @__PURE__ */ jsx3(
                    EditableTextarea2,
                    {
                      blockId: block.id,
                      path: "subscriptionBody",
                      className: clsx(
                        "mt-3 leading-7",
                        isSoftCardsVariant ? "text-white/82" : variant.muted
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs2("div", { className: "mt-5 flex flex-col gap-3 sm:flex-row", children: [
                  /* @__PURE__ */ jsx3(
                    "div",
                    {
                      className: clsx(
                        "flex min-h-14 flex-1 items-center px-4",
                        footerVariant === "minimal-air" ? "rounded-full border border-[var(--photon-site-border)] bg-white/72" : "rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
                      ),
                      children: /* @__PURE__ */ jsx3(
                        EditableText,
                        {
                          blockId: block.id,
                          path: "subscriptionPlaceholder",
                          className: clsx(
                            "text-sm",
                            isSoftCardsVariant ? "text-white/74" : variant.muted
                          )
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxs2(
                    "button",
                    {
                      type: "button",
                      className: clsx(
                        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-[0_18px_34px_rgba(15,23,42,0.12)]",
                        isSoftCardsVariant ? "bg-white text-[var(--photon-site-accent)]" : "bg-[var(--photon-site-accent)] text-white"
                      ),
                      children: [
                        /* @__PURE__ */ jsx3(Send, { className: "h-4 w-4" }),
                        /* @__PURE__ */ jsx3(
                          EditableText,
                          {
                            blockId: block.id,
                            path: "subscriptionButtonLabel",
                            className: clsx(
                              isSoftCardsVariant ? "text-[var(--photon-site-accent)]" : "text-white"
                            )
                          }
                        )
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]", children: [
          /* @__PURE__ */ jsx3(
            "div",
            {
              className: clsx(
                footerVariant === "minimal-air" ? "rounded-none border-0 border-b border-[var(--photon-site-border)] px-0 pb-6 pt-0 sm:px-0" : "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: /* @__PURE__ */ jsx3("div", { className: "grid gap-6 md:grid-cols-2", children: navigationColumns.map((column) => /* @__PURE__ */ jsxs2("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx3("div", { className: clsx("text-sm font-semibold", variant.text), children: column.title }),
                /* @__PURE__ */ jsx3("div", { className: "space-y-2", children: column.links.map((link) => /* @__PURE__ */ jsx3(
                  PhotonLink,
                  {
                    href: link.href,
                    className: clsx(
                      "block text-sm transition hover:text-[var(--photon-site-accent)]",
                      variant.muted
                    ),
                    children: link.label
                  },
                  `${column.title}:${link.label}:${link.href}`
                )) })
              ] }, column.title)) })
            }
          ),
          /* @__PURE__ */ jsxs2(
            "div",
            {
              className: clsx(
                footerVariant === "minimal-air" ? "rounded-none border-0 px-0 pt-0 sm:px-0" : "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: [
                /* @__PURE__ */ jsx3("div", { className: clsx("text-sm font-semibold", variant.text), children: "Contacts" }),
                /* @__PURE__ */ jsx3("div", { className: "mt-4 space-y-3", children: contactItems.map((item) => /* @__PURE__ */ jsx3(
                  "div",
                  {
                    className: clsx("text-sm leading-7", variant.muted),
                    children: item
                  },
                  item
                )) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2(
          "div",
          {
            className: clsx(
              "flex flex-col gap-4 border-t pt-5 text-sm md:flex-row md:items-center md:justify-between",
              footerVariant === "classic-dark" ? "border-white/10" : "border-[var(--photon-site-border)]"
            ),
            children: [
              /* @__PURE__ */ jsx3(
                EditableText,
                {
                  blockId: block.id,
                  path: "copyrightLabel",
                  className: (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).muted
                }
              ),
              /* @__PURE__ */ jsxs2("div", { className: "flex flex-wrap items-center gap-4", children: [
                /* @__PURE__ */ jsxs2(
                  PhotonLink,
                  {
                    href: block.props.legalHref,
                    className: clsx(
                      "inline-flex items-center gap-2 transition hover:text-[var(--photon-site-accent)]",
                      (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).muted
                    ),
                    children: [
                      /* @__PURE__ */ jsx3(EditableText, { blockId: block.id, path: "legalLabel" }),
                      /* @__PURE__ */ jsx3(ArrowRight, { className: "h-4 w-4" })
                    ]
                  }
                ),
                legalLinks.map((link) => /* @__PURE__ */ jsxs2(
                  PhotonLink,
                  {
                    href: link.href,
                    target: link.target,
                    rel: link.rel,
                    className: clsx(
                      "inline-flex items-center gap-2 transition hover:text-[var(--photon-site-accent)]",
                      (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).muted
                    ),
                    children: [
                      link.label,
                      /* @__PURE__ */ jsx3(ArrowRight, { className: "h-4 w-4" })
                    ]
                  },
                  `${link.label}:${link.href}`
                )),
                /* @__PURE__ */ jsx3(
                  PhotonLink,
                  {
                    href: block.props.developerHref,
                    className: clsx(
                      "font-semibold transition hover:text-[var(--photon-site-accent)]",
                      (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).text
                    ),
                    children: /* @__PURE__ */ jsx3(EditableText, { blockId: block.id, path: "developerLabel" })
                  }
                )
              ] })
            ]
          }
        )
      ] })
    }
  );
};
var siteFooterShellDefinition = definePhotonBlockDefinition({
  type: "site-footer-shell",
  label: "Site Footer Shell",
  labelKey: "photon.system.siteFooter.block.label",
  description: "Shared footer with editorial brand copy, subscription card, navigation columns and legal row.",
  descriptionKey: "photon.system.siteFooter.block.description",
  category: "Site Frame",
  icon: "panel-bottom",
  defaults: {
    variant: "classic-dark",
    brandTitle: createPhotonLocalizedDefault({
      en: "Photon",
      ru: "Photon"
    }),
    brandBody: createPhotonLocalizedDefault({
      en: "Package-first live website editing for teams that want reusable packages, clean package boundaries and real page composition.",
      ru: "Package-first \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0436\u0438\u0432\u043E\u0433\u043E \u0441\u0430\u0439\u0442\u0430 \u0434\u043B\u044F \u043A\u043E\u043C\u0430\u043D\u0434, \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u043D\u0443\u0436\u043D\u044B \u043F\u0435\u0440\u0435\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C\u044B\u0435 \u043F\u0430\u043A\u0435\u0442\u044B, \u0447\u0438\u0441\u0442\u044B\u0435 \u0433\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u0430\u043A\u0435\u0442\u043E\u0432 \u0438 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0430\u044F \u043A\u043E\u043C\u043F\u043E\u0437\u0438\u0446\u0438\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446."
    }),
    logoImage: null,
    subscriptionTitle: createPhotonLocalizedDefault({
      en: "Get product notes and release updates",
      ru: "\u041F\u043E\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0440\u0435\u043B\u0438\u0437\u043E\u0432"
    }),
    subscriptionBody: createPhotonLocalizedDefault({
      en: "Subscribe for major builder releases, new integration kits and architecture notes.",
      ru: "\u041F\u043E\u0434\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u043A\u0440\u0443\u043F\u043D\u044B\u0435 \u0440\u0435\u043B\u0438\u0437\u044B builder, \u043D\u043E\u0432\u044B\u0435 integration kits \u0438 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u043D\u044B\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438."
    }),
    subscriptionPlaceholder: createPhotonLocalizedDefault({
      en: "Enter your email",
      ru: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 email"
    }),
    subscriptionButtonLabel: createPhotonLocalizedDefault({
      en: "Subscribe",
      ru: "\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F"
    }),
    navigationColumns: createPhotonLocalizedDefault({
      en: [
        {
          title: "Product",
          links: [
            { label: "Overview", href: "/" },
            { label: "Publication", href: "/news" },
            { label: "Contacts", href: "/contacts" }
          ]
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Privacy", href: "/privacy" }
          ]
        }
      ],
      ru: [
        {
          title: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442",
          links: [
            { label: "\u041E\u0431\u0437\u043E\u0440", href: "/" },
            { label: "\u041F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438", href: "/news" },
            { label: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B", href: "/contacts" }
          ]
        },
        {
          title: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F",
          links: [
            { label: "\u041E \u043D\u0430\u0441", href: "/about" },
            { label: "\u0411\u043B\u043E\u0433", href: "/blog" },
            { label: "\u041F\u0440\u0438\u0432\u0430\u0442\u043D\u043E\u0441\u0442\u044C", href: "/privacy" }
          ]
        }
      ]
    }),
    contactItems: createPhotonLocalizedDefault({
      en: ["+7 (707) 040-43-43", "hello@example.test", "Almaty, Kazakhstan"],
      ru: ["+7 (707) 040-43-43", "hello@example.test", "\u0410\u043B\u043C\u0430\u0442\u044B, \u041A\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043D"]
    }),
    legalLabel: createPhotonLocalizedDefault({
      en: "Privacy policy",
      ru: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"
    }),
    legalHref: "/privacy",
    copyrightLabel: createPhotonLocalizedDefault({
      en: "Photon 2026",
      ru: "Photon 2026"
    }),
    developerLabel: createPhotonLocalizedDefault({
      en: "Built by init",
      ru: "\u0421\u0434\u0435\u043B\u0430\u043D\u043E init"
    }),
    developerHref: "https://init.kz",
    disabledExtensionIds: [],
    disabledExtensionItemIds: []
  },
  fields: siteFooterFields,
  component: SiteFooterShell
});

// src/modules/system/site/site-header-shell-definition.tsx
import clsx2 from "clsx";
import { ArrowRight as ArrowRight2, CircleUserRound, LogIn, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var siteHeaderFields = [
  {
    path: "variant",
    label: "Variant",
    kind: "select",
    group: "style",
    localization: "shared",
    options: [
      { label: "Commerce inline", value: "commerce-inline" },
      { label: "Showcase card", value: "showcase-card" }
    ]
  },
  {
    path: "brandLabel",
    label: "Brand label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "brandHref",
    label: "Brand href",
    kind: "url",
    group: "content",
    localization: "shared"
  },
  {
    path: "logoImage",
    label: "Logo image",
    kind: "image",
    group: "content",
    localization: "shared"
  },
  {
    path: "utilityLinks",
    label: "Utility links",
    kind: "repeater",
    group: "content",
    localization: "localized",
    itemLabelPath: "label",
    addLabel: "Add utility link",
    fields: [
      { path: "label", label: "Label", kind: "text" },
      { path: "href", label: "Href", kind: "url", localization: "shared" }
    ]
  },
  {
    path: "catalogLabel",
    label: "Catalog label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "searchPlaceholder",
    label: "Search placeholder",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "contactValue",
    label: "Contact value",
    kind: "text",
    group: "content",
    localization: "shared"
  },
  {
    path: "contactCaption",
    label: "Contact caption",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "primaryCtaLabel",
    label: "Primary CTA label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "primaryCtaHref",
    label: "Primary CTA href",
    kind: "url",
    group: "content",
    localization: "shared"
  },
  {
    path: "secondaryCtaLabel",
    label: "Secondary CTA label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "secondaryCtaHref",
    label: "Secondary CTA href",
    kind: "url",
    group: "content",
    localization: "shared"
  },
  {
    path: "showLoginAction",
    label: "Show login action",
    kind: "toggle",
    group: "layout",
    localization: "shared"
  },
  {
    path: "loginLabel",
    label: "Login label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "sticky",
    label: "Sticky header",
    kind: "toggle",
    group: "layout",
    localization: "shared"
  },
  {
    path: "compactOnScroll",
    label: "Compact on scroll",
    kind: "toggle",
    group: "layout",
    localization: "shared"
  },
  {
    path: "showLocaleSwitcher",
    label: "Show locale switcher",
    labelKey: "photon.system.siteHeader.showLocaleSwitcher.label",
    kind: "toggle",
    group: "layout",
    localization: "shared"
  },
  {
    path: "categoryLinks",
    label: "Category links",
    kind: "repeater",
    group: "content",
    localization: "localized",
    itemLabelPath: "label",
    addLabel: "Add category link",
    fields: [
      { path: "label", label: "Label", kind: "text" },
      { path: "href", label: "Href", kind: "url", localization: "shared" }
    ]
  },
  {
    path: "disabledExtensionIds",
    label: "Disabled package extensions",
    kind: "tags",
    group: "layout",
    localization: "shared"
  },
  {
    path: "disabledExtensionItemIds",
    label: "Disabled package extension items",
    kind: "tags",
    group: "layout",
    localization: "shared"
  }
];
var SiteHeaderShell = ({
  block
}) => {
  const isAdmin = usePhotonStore((state) => state.isAdmin);
  const mode = usePhotonStore((state) => state.mode);
  const currentRoute = usePhotonStore((state) => state.document.route);
  const currentBlocks = usePhotonStore((state) => state.document.blocks);
  const requestAuth = usePhotonStore((state) => state.requestAuth);
  const resources = usePhotonStore((state) => state.resources);
  const siteRegions = usePhotonStore((state) => state.site.regions);
  const siteDesign = usePhotonStore((state) => state.site.settings.design);
  const siteFrameExtensions = usePhotonStore(
    (state) => state.siteFrameExtensions
  );
  const { locale, publicLocales, translate } = usePhotonI18n();
  const [isCompact, setIsCompact] = useState(false);
  const headerRef = useRef(null);
  const disabledExtensionIds = normalizePhotonSiteStringItems(
    block.props.disabledExtensionIds
  );
  const disabledExtensionItemIds = normalizePhotonSiteStringItems(
    block.props.disabledExtensionItemIds
  );
  const headerExtensionItems = collectPhotonHeaderExtensionItems(
    resolvePhotonSiteFrameExtensions(
      siteFrameExtensions,
      disabledExtensionIds
    ).filter(
      (extension) => !isCommerceExtensionId(extension.id) || hasCommerceBlock(currentBlocks) || Object.values(siteRegions).some(
        (region) => hasCommerceBlock(region.document.blocks)
      ) || hasCommerceRuntimeResource(resources)
    ),
    disabledExtensionItemIds
  );
  const rawUtilityLinks = [
    ...normalizePhotonSiteLinkItems(block.props.utilityLinks),
    ...normalizePhotonSiteLinkItems(headerExtensionItems.utilityLinks)
  ];
  const extensionCategoryLinks = normalizePhotonSiteLinkItems(
    headerExtensionItems.categoryLinks
  );
  const commerceCatalogLink = extensionCategoryLinks.find(
    (link) => link.id === "commerce:catalog-link" || getHeaderLinkPathname(link.href) === "/catalog"
  ) ?? null;
  const rawCategoryLinks = [
    ...normalizePhotonSiteLinkItems(block.props.categoryLinks),
    ...extensionCategoryLinks.filter((link) => link !== commerceCatalogLink)
  ];
  const variant = block.props.variant ?? "commerce-inline";
  const liveSurfaceMode = mode !== "builder";
  const compact = liveSurfaceMode && block.props.compactOnScroll && isCompact;
  const framelessSite = isPhotonPublicFramelessSiteDesign(siteDesign);
  const isShowcaseCard = variant === "showcase-card" && !framelessSite;
  const localeSwitcherVisible = block.props.showLocaleSwitcher !== false && publicLocales.length > 1;
  const authenticatedUser = hasAuthenticatedUser(resources);
  const [cartQuantity, setCartQuantity] = useState(
    () => getHeaderCartQuantity(resources)
  );
  const rawExtensionActions = collectUniqueHeaderLinks(
    headerExtensionItems.actions
  ).filter((action) => {
    const visibleHref = getHeaderActionVisibleHref(action, authenticatedUser);
    return normalizeHeaderHref(visibleHref) !== "";
  });
  const dedicatedCartLink = getHeaderCartLink(
    rawExtensionActions.map((action) => ({
      label: action.label,
      href: getHeaderActionVisibleHref(action, authenticatedUser)
    }))
  ) ?? getHeaderCartLink([
    {
      label: block.props.secondaryCtaLabel,
      href: block.props.secondaryCtaHref
    },
    {
      label: block.props.primaryCtaLabel,
      href: block.props.primaryCtaHref
    },
    ...rawCategoryLinks,
    ...rawUtilityLinks
  ]);
  const extensionActions = rawExtensionActions.filter(
    (action) => !isCartLinkHref(getHeaderActionVisibleHref(action, authenticatedUser))
  );
  const hasExtensionAuthAction = extensionActions.some(
    (action) => (action.kind ?? "link") === "auth"
  );
  const extensionActionLinkKeys = collectHeaderActionLinkKeys(extensionActions);
  const secondaryCtaLinkKey = getHeaderLinkDedupeKey(
    block.props.secondaryCtaHref
  );
  const primaryCtaLinkKey = getHeaderLinkDedupeKey(block.props.primaryCtaHref);
  const shouldRenderSecondaryCta = normalizeHeaderHref(block.props.secondaryCtaHref) !== "" && !isCartLinkHref(block.props.secondaryCtaHref) && !extensionActionLinkKeys.has(secondaryCtaLinkKey) && !((hasExtensionAuthAction || !authenticatedUser) && isProtectedAccountHref(block.props.secondaryCtaHref));
  const shouldRenderPrimaryCta = normalizeHeaderHref(block.props.primaryCtaHref) !== "" && !isCartLinkHref(block.props.primaryCtaHref) && (!extensionActionLinkKeys.has(primaryCtaLinkKey) || primaryCtaLinkKey === secondaryCtaLinkKey);
  const prominentLinkKeys = new Set(extensionActionLinkKeys);
  if (dedicatedCartLink) {
    prominentLinkKeys.add(getHeaderLinkDedupeKey(dedicatedCartLink.href));
  }
  if (commerceCatalogLink) {
    prominentLinkKeys.add(getHeaderLinkDedupeKey(commerceCatalogLink.href));
  }
  if (shouldRenderPrimaryCta) {
    prominentLinkKeys.add(primaryCtaLinkKey);
  }
  if (shouldRenderSecondaryCta) {
    prominentLinkKeys.add(secondaryCtaLinkKey);
  }
  const categoryLinks = collectUniqueHeaderLinks(
    rawCategoryLinks,
    prominentLinkKeys
  );
  const categoryLinkKeys = new Set(
    categoryLinks.map((link) => getHeaderLinkDedupeKey(link.href))
  );
  const utilityLinks = collectUniqueHeaderLinks(
    rawUtilityLinks,
    /* @__PURE__ */ new Set([...prominentLinkKeys, ...categoryLinkKeys])
  );
  const renderCartLink = (href, label, className, key) => /* @__PURE__ */ jsxs3(
    PhotonLink,
    {
      href,
      "aria-label": label,
      "data-photon-header-cart-link": "true",
      className: clsx2(
        "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--photon-site-border)] text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
        className
      ),
      children: [
        /* @__PURE__ */ jsx4(ShoppingCart, { className: "h-5 w-5" }),
        cartQuantity > 0 ? /* @__PURE__ */ jsx4("span", { className: "absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--photon-site-accent)] px-1 text-[10px] font-bold leading-none text-white", children: cartQuantity > 99 ? "99+" : cartQuantity }) : null
      ]
    },
    key ?? `cart:${href}`
  );
  const renderSmartLink = (link, className, key) => {
    if (isCartLinkHref(link.href)) {
      return renderCartLink(link.href, link.label, className, key);
    }
    if (!authenticatedUser && isProtectedAccountHref(link.href)) {
      return null;
    }
    return /* @__PURE__ */ jsx4(
      PhotonLink,
      {
        href: link.href,
        target: link.target,
        rel: link.rel,
        className,
        children: link.label
      },
      key
    );
  };
  const renderExtensionAction = (action) => {
    const appearance = action.appearance ?? "secondary";
    const className = clsx2(
      "inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition",
      appearance === "primary" ? "bg-[var(--photon-site-accent)] text-white shadow-[0_18px_34px_rgba(15,118,110,0.28)] hover:translate-y-[-1px]" : appearance === "ghost" ? "text-[var(--photon-site-text)] hover:text-[var(--photon-site-accent)]" : "border border-[var(--photon-site-border)] text-[var(--photon-site-text)] hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]"
    );
    if ((action.kind ?? "link") === "auth") {
      if (authenticatedUser) {
        const authenticatedHref = action.authenticatedHref ?? action.href;
        if (!authenticatedHref) {
          return null;
        }
        return /* @__PURE__ */ jsxs3(
          PhotonLink,
          {
            href: authenticatedHref,
            target: action.authenticatedTarget,
            rel: action.authenticatedRel,
            className,
            children: [
              /* @__PURE__ */ jsx4(CircleUserRound, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx4("span", { children: action.authenticatedLabel ?? action.label })
            ]
          },
          action.id ?? `${action.authenticatedLabel ?? action.label}:${authenticatedHref}`
        );
      }
      return /* @__PURE__ */ jsx4(
        "button",
        {
          type: "button",
          onClick: requestAuth,
          className: clsx2(className, "cursor-pointer"),
          children: action.label
        },
        action.id ?? `${action.label}:${action.href}`
      );
    }
    return renderSmartLink(
      action,
      className,
      action.id ?? `${action.label}:${action.href}`
    );
  };
  useEffect(() => {
    if (typeof window === "undefined" || !block.props.compactOnScroll || !liveSurfaceMode) {
      setIsCompact(false);
      return;
    }
    const sync = () => setIsCompact(window.scrollY > 36);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, [block.props.compactOnScroll, liveSurfaceMode]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setCartQuantity(getHeaderCartQuantity(resources));
    const syncCartQuantity = (event) => {
      if (!(event instanceof CustomEvent)) {
        return;
      }
      const cart = event.detail;
      const quantity = Number(cart?.items_quantity ?? cart?.item_count ?? 0);
      setCartQuantity(
        Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 0
      );
    };
    window.addEventListener("commerce-cart-updated", syncCartQuantity);
    return () => {
      window.removeEventListener("commerce-cart-updated", syncCartQuantity);
    };
  }, [resources]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const root = window.document.documentElement instanceof HTMLElement ? window.document.documentElement : null;
    if (!root) {
      return;
    }
    const syncHeaderHeight = () => {
      root.style.setProperty(
        "--photon-site-header-height",
        liveSurfaceMode && block.props.sticky && headerRef.current ? `${headerRef.current.offsetHeight}px` : "0px"
      );
    };
    syncHeaderHeight();
    if (!headerRef.current || typeof ResizeObserver === "undefined") {
      return () => {
        root.style.setProperty("--photon-site-header-height", "0px");
      };
    }
    const observer = new ResizeObserver(() => {
      syncHeaderHeight();
    });
    observer.observe(headerRef.current);
    return () => {
      observer.disconnect();
      root.style.setProperty("--photon-site-header-height", "0px");
    };
  }, [block.props.sticky, liveSurfaceMode, compact, localeSwitcherVisible]);
  return /* @__PURE__ */ jsx4(
    "header",
    {
      ref: headerRef,
      className: clsx2(
        "relative",
        liveSurfaceMode && "z-40",
        isShowcaseCard ? "pt-[var(--photon-site-gutter,24px)]" : "pt-0"
      ),
      children: /* @__PURE__ */ jsxs3(
        "div",
        {
          className: clsx2(
            "border-b border-[var(--photon-site-border)] text-[var(--photon-site-text)] transition-[box-shadow,background-color,border-radius] duration-300",
            framelessSite ? clsx2(
              "rounded-none border-x-0 border-t-0 bg-[color-mix(in_srgb,var(--photon-site-surface)_92%,white)] shadow-none",
              block.props.sticky && compact && "bg-[color-mix(in_srgb,var(--photon-site-surface)_96%,white)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            ) : isShowcaseCard ? "mx-auto max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] rounded-[calc(var(--photon-site-radius,24px)+10px)] border shadow-[0_28px_70px_rgba(15,23,42,0.08)]" : clsx2(
              "rounded-none border-x-0 border-t-0 bg-[var(--photon-site-surface)] shadow-[0_18px_40px_rgba(15,23,42,0.06)]",
              block.props.sticky && compact && "shadow-[0_20px_54px_rgba(15,23,42,0.12)]"
            )
          ),
          children: [
            /* @__PURE__ */ jsx4(
              "div",
              {
                className: clsx2(
                  "mx-auto w-full max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] transition-[padding,gap] duration-300",
                  framelessSite ? compact ? "px-[var(--photon-site-gutter,24px)] py-3" : "px-[var(--photon-site-gutter,24px)] py-4" : isShowcaseCard ? compact ? "px-4 py-3" : "px-5 py-4 sm:px-6" : compact ? "px-[var(--photon-site-gutter,24px)] py-3" : "px-[var(--photon-site-gutter,24px)] py-4"
                ),
                children: /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-4", children: [
                  /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [
                    /* @__PURE__ */ jsx4("div", { className: "flex flex-wrap items-center gap-3 text-sm text-[var(--photon-site-muted)]", children: utilityLinks.map(
                      (link) => renderSmartLink(
                        link,
                        clsx2(
                          "transition hover:text-[var(--photon-site-text)]",
                          isCartLinkHref(link.href) && "h-8 w-8 border-transparent"
                        ),
                        `${link.label}:${link.href}`
                      )
                    ) }),
                    /* @__PURE__ */ jsxs3("div", { className: "flex flex-wrap items-center gap-3 text-sm", children: [
                      localeSwitcherVisible ? /* @__PURE__ */ jsxs3(
                        "div",
                        {
                          "data-photon-locale-switcher": "true",
                          className: "flex flex-wrap items-center gap-2 rounded-full border border-[var(--photon-site-border)] bg-[var(--photon-site-background)] px-2 py-2",
                          children: [
                            /* @__PURE__ */ jsx4("div", { className: "px-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--photon-site-muted)]", children: translate("photon.localeSwitcher.label", "Language") }),
                            publicLocales.map((item) => /* @__PURE__ */ jsx4(
                              PhotonLink,
                              {
                                href: currentRoute,
                                locale: item.code,
                                "data-photon-locale-option": item.code,
                                className: clsx2(
                                  "rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
                                  item.code === locale ? "bg-[var(--photon-site-accent)] text-white" : "text-[var(--photon-site-muted)] hover:text-[var(--photon-site-text)]"
                                ),
                                children: item.label
                              },
                              item.code
                            ))
                          ]
                        }
                      ) : null,
                      /* @__PURE__ */ jsx4(
                        EditableText,
                        {
                          blockId: block.id,
                          path: "contactCaption",
                          className: "text-[var(--photon-site-muted)]"
                        }
                      ),
                      /* @__PURE__ */ jsx4(
                        EditableText,
                        {
                          blockId: block.id,
                          path: "contactValue",
                          className: "font-semibold text-[var(--photon-site-text)]"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs3(
                    "div",
                    {
                      className: clsx2(
                        "grid gap-4 lg:items-center",
                        commerceCatalogLink ? "lg:grid-cols-[auto_auto_minmax(280px,1fr)_auto]" : "lg:grid-cols-[auto_minmax(280px,1fr)_auto]"
                      ),
                      children: [
                        /* @__PURE__ */ jsxs3(
                          PhotonLink,
                          {
                            href: block.props.brandHref,
                            className: "flex min-w-0 items-center gap-3",
                            children: [
                              /* @__PURE__ */ jsx4("div", { className: "relative h-16 w-16 overflow-hidden rounded-[22px] border border-[var(--photon-site-border)] bg-[linear-gradient(180deg,rgba(15,118,110,0.14),rgba(15,118,110,0.03))]", children: block.props.logoImage ? /* @__PURE__ */ jsx4(
                                EditableImage2,
                                {
                                  blockId: block.id,
                                  path: "logoImage",
                                  className: "h-full w-full rounded-[22px]",
                                  imageClassName: "h-full w-full object-contain p-2",
                                  fallbackAlt: block.props.brandLabel
                                }
                              ) : /* @__PURE__ */ jsx4("div", { className: "flex h-full items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--photon-site-accent)]", children: /* @__PURE__ */ jsx4(
                                EditableText,
                                {
                                  blockId: block.id,
                                  path: "brandLabel",
                                  className: "text-[var(--photon-site-accent)]"
                                }
                              ) }) }),
                              /* @__PURE__ */ jsxs3("div", { className: "min-w-0", children: [
                                /* @__PURE__ */ jsx4(
                                  EditableText,
                                  {
                                    blockId: block.id,
                                    path: "brandLabel",
                                    as: "div",
                                    className: "[font-family:var(--photon-site-heading-font)] text-2xl font-semibold tracking-[-0.04em]"
                                  }
                                ),
                                isShowcaseCard ? /* @__PURE__ */ jsx4("div", { className: "mt-1 text-xs uppercase tracking-[0.24em] text-[var(--photon-site-muted)]", children: "Live site frame" }) : null
                              ] })
                            ]
                          }
                        ),
                        commerceCatalogLink ? /* @__PURE__ */ jsxs3(
                          PhotonLink,
                          {
                            href: commerceCatalogLink.href,
                            className: "inline-flex items-center gap-2 rounded-full border border-[var(--photon-site-border)] bg-[var(--photon-site-background)] px-4 py-3 text-sm font-semibold text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
                            children: [
                              /* @__PURE__ */ jsx4("div", { className: "h-2.5 w-2.5 rounded-full bg-[var(--photon-site-accent)]" }),
                              /* @__PURE__ */ jsx4(
                                EditableText,
                                {
                                  blockId: block.id,
                                  path: "catalogLabel",
                                  className: "font-semibold"
                                }
                              )
                            ]
                          }
                        ) : null,
                        /* @__PURE__ */ jsx4(
                          PhotonSiteSearch,
                          {
                            blockId: block.id,
                            placeholderPath: "searchPlaceholder"
                          }
                        ),
                        /* @__PURE__ */ jsxs3("div", { className: "flex flex-wrap items-center justify-start gap-2 lg:justify-end", children: [
                          shouldRenderSecondaryCta ? isCartLinkHref(block.props.secondaryCtaHref) ? renderCartLink(
                            block.props.secondaryCtaHref,
                            block.props.secondaryCtaLabel,
                            void 0,
                            "secondary-cart"
                          ) : /* @__PURE__ */ jsx4(
                            PhotonLink,
                            {
                              href: block.props.secondaryCtaHref,
                              className: "inline-flex items-center gap-2 rounded-full border border-[var(--photon-site-border)] px-4 py-3 text-sm font-semibold text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
                              children: /* @__PURE__ */ jsx4(
                                EditableText,
                                {
                                  blockId: block.id,
                                  path: "secondaryCtaLabel",
                                  className: "font-semibold"
                                }
                              )
                            }
                          ) : null,
                          shouldRenderPrimaryCta ? /* @__PURE__ */ jsxs3(
                            PhotonLink,
                            {
                              href: block.props.primaryCtaHref,
                              className: "inline-flex items-center gap-2 rounded-full bg-[var(--photon-site-accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(15,118,110,0.28)] transition hover:translate-y-[-1px]",
                              children: [
                                /* @__PURE__ */ jsx4(
                                  EditableText,
                                  {
                                    blockId: block.id,
                                    path: "primaryCtaLabel",
                                    className: "font-semibold text-white"
                                  }
                                ),
                                /* @__PURE__ */ jsx4(ArrowRight2, { className: "h-4 w-4" })
                              ]
                            }
                          ) : null,
                          dedicatedCartLink ? renderCartLink(
                            dedicatedCartLink.href,
                            dedicatedCartLink.label,
                            void 0,
                            "dedicated-cart"
                          ) : null,
                          extensionActions.map(renderExtensionAction),
                          block.props.showLoginAction && !isAdmin && !authenticatedUser && !hasExtensionAuthAction ? /* @__PURE__ */ jsxs3(
                            "button",
                            {
                              type: "button",
                              onClick: requestAuth,
                              className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--photon-site-border)] bg-[var(--photon-site-surface)] px-4 py-3 text-sm font-semibold text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
                              children: [
                                /* @__PURE__ */ jsx4(LogIn, { className: "h-4 w-4" }),
                                /* @__PURE__ */ jsx4(
                                  EditableText,
                                  {
                                    blockId: block.id,
                                    path: "loginLabel",
                                    className: "font-semibold"
                                  }
                                )
                              ]
                            }
                          ) : null
                        ] })
                      ]
                    }
                  )
                ] })
              }
            ),
            categoryLinks.length > 0 ? /* @__PURE__ */ jsx4(
              "div",
              {
                className: clsx2(
                  "border-t border-[var(--photon-site-border)]",
                  framelessSite && "bg-transparent"
                ),
                children: /* @__PURE__ */ jsx4("div", { className: "mx-auto w-full max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] px-[var(--photon-site-gutter,24px)] py-4", children: /* @__PURE__ */ jsx4("div", { className: "flex flex-wrap gap-2", children: categoryLinks.map(
                  (link) => renderSmartLink(
                    link,
                    clsx2(
                      "rounded-full border border-[var(--photon-site-border)] px-4 py-2 text-sm text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
                      framelessSite ? "bg-transparent" : isShowcaseCard ? "bg-[var(--photon-site-background)]" : "bg-white/0",
                      isCartLinkHref(link.href) && "h-10 w-10 px-0 py-0"
                    ),
                    `${link.label}:${link.href}`
                  )
                ) }) })
              }
            ) : null
          ]
        }
      )
    }
  );
};
var siteHeaderShellDefinition = definePhotonBlockDefinition({
  type: "site-header-shell",
  label: "Site Header Shell",
  labelKey: "photon.system.siteHeader.block.label",
  description: "Shared live-site header with utility links, search and package-registered actions.",
  descriptionKey: "photon.system.siteHeader.block.description",
  category: "Site Frame",
  icon: "panel-top",
  defaults: {
    variant: "commerce-inline",
    brandLabel: createPhotonLocalizedDefault({
      en: "Photon",
      ru: "Photon"
    }),
    brandHref: "/",
    logoImage: null,
    utilityLinks: createPhotonLocalizedDefault({
      en: [
        { label: "Services", href: "/services" },
        { label: "Partners", href: "/partners" },
        { label: "Blog", href: "/blog" }
      ],
      ru: [
        { label: "\u0423\u0441\u043B\u0443\u0433\u0438", href: "/services" },
        { label: "\u041F\u0430\u0440\u0442\u043D\u0435\u0440\u044B", href: "/partners" },
        { label: "\u0411\u043B\u043E\u0433", href: "/blog" }
      ]
    }),
    catalogLabel: createPhotonLocalizedDefault({
      en: "Catalog",
      ru: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433"
    }),
    searchPlaceholder: createPhotonLocalizedDefault({
      en: "Search the website",
      ru: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0441\u0430\u0439\u0442\u0443"
    }),
    contactValue: "+7 (707) 040-43-43",
    contactCaption: createPhotonLocalizedDefault({
      en: "Daily from 09:00 to 18:00",
      ru: "\u0415\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E \u0441 09:00 \u0434\u043E 18:00"
    }),
    primaryCtaLabel: createPhotonLocalizedDefault({
      en: "Contact us",
      ru: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F"
    }),
    primaryCtaHref: "/contacts",
    secondaryCtaLabel: createPhotonLocalizedDefault({
      en: "WhatsApp",
      ru: "WhatsApp"
    }),
    secondaryCtaHref: "https://wa.me/77070404343",
    showLoginAction: false,
    loginLabel: createPhotonLocalizedDefault({
      en: "Admin sign in",
      ru: "\u0412\u0445\u043E\u0434 \u0434\u043B\u044F \u0430\u0434\u043C\u0438\u043D\u0430"
    }),
    sticky: true,
    compactOnScroll: true,
    showLocaleSwitcher: true,
    disabledExtensionIds: [],
    disabledExtensionItemIds: [],
    categoryLinks: createPhotonLocalizedDefault({
      en: [
        { label: "Infrastructure", href: "/infrastructure" },
        { label: "Operations", href: "/operations" },
        { label: "Research", href: "/research" }
      ],
      ru: [
        { label: "\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430", href: "/infrastructure" },
        { label: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438", href: "/operations" },
        { label: "\u0418\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F", href: "/research" }
      ]
    })
  },
  fields: siteHeaderFields,
  component: SiteHeaderShell
});

// src/modules/system.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var surfaceStyles = {
  glass: "border-white/10 bg-[linear-gradient(180deg,rgba(7,17,31,0.85),rgba(8,21,38,0.7))] text-white",
  bright: "border-slate-200 bg-[linear-gradient(180deg,#f7f9fc_0%,#eef3fb_100%)] text-slate-950",
  ink: "border-cyan-300/14 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.11),transparent_24%),linear-gradient(180deg,#08111e_0%,#050912_100%)] text-white"
};
var getColumnConfig = (columns, area, index) => columns.find((column) => column.areaId === area.id) ?? {
  areaId: area.id,
  label: "",
  width: "minmax(0,1fr)",
  sticky: false
};
var SplitLayout = ({
  block,
  renderArea
}) => {
  const mode = usePhotonStore((state) => state.mode);
  const siteDesign = usePhotonStore(
    (state) => state.site.settings.design
  );
  const columns = block.props.columns ?? [];
  const areas = block.areas ?? [];
  const templateColumns = areas.map((area, index) => getColumnConfig(columns, area, index).width).join(" ");
  const surface = surfaceStyles[block.props.surface] ?? surfaceStyles.glass;
  const framelessSurface = isPhotonFramelessSiteDesign(siteDesign);
  const stickyPreviewEnabled = mode !== "builder";
  return /* @__PURE__ */ jsxs4(
    "section",
    {
      className: clsx3(
        "min-w-0 px-6 py-8 sm:px-8 sm:py-10",
        framelessSurface ? "rounded-none border-0 bg-transparent text-[var(--photon-site-text)] shadow-none" : "rounded-[38px] border shadow-[0_28px_90px_rgba(2,12,27,0.16)]",
        !framelessSurface && surface
      ),
      style: framelessSurface ? getPhotonSurfaceModeStyle("bleed") : void 0,
      children: [
        /* @__PURE__ */ jsxs4("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx5(
            EditableText2,
            {
              blockId: block.id,
              path: "eyebrow",
              className: clsx3(
                "text-[11px] font-semibold uppercase tracking-[0.3em]",
                framelessSurface ? "text-[var(--photon-site-muted)]" : block.props.surface === "bright" ? "text-slate-500" : "text-cyan-100/70"
              )
            }
          ),
          /* @__PURE__ */ jsx5(
            EditableText2,
            {
              blockId: block.id,
              path: "title",
              as: "h2",
              className: clsx3(
                "mt-4 block text-balance text-3xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-4xl xl:text-5xl",
                framelessSurface ? "text-[var(--photon-site-text)]" : block.props.surface === "bright" ? "text-slate-950" : "text-white"
              )
            }
          ),
          /* @__PURE__ */ jsx5(
            EditableTextarea,
            {
              blockId: block.id,
              path: "body",
              className: clsx3(
                "mt-5 text-base leading-8",
                framelessSurface ? "text-[var(--photon-site-muted)]" : block.props.surface === "bright" ? "text-slate-600" : "text-slate-300"
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsx5(
          "div",
          {
            className: "mt-8 grid grid-cols-1 items-start gap-[var(--photon-layout-gap)] lg:[grid-template-columns:var(--photon-layout-columns)]",
            style: {
              "--photon-layout-columns": templateColumns || "minmax(0,1fr)",
              "--photon-layout-gap": `${block.props.gap || 24}px`
            },
            children: areas.map((area, index) => {
              const column = getColumnConfig(columns, area, index);
              return /* @__PURE__ */ jsx5(
                "div",
                {
                  className: clsx3(
                    "min-w-0",
                    column.sticky && stickyPreviewEnabled && "lg:sticky lg:self-start"
                  ),
                  style: column.sticky && stickyPreviewEnabled ? {
                    top: "calc(var(--photon-dock-offset, 0px) + var(--photon-site-header-offset, 0px) + var(--photon-site-header-height, 0px) + 0.75rem)"
                  } : void 0,
                  children: /* @__PURE__ */ jsxs4(
                    "div",
                    {
                      className: clsx3(
                        "relative isolate min-w-0 px-0 py-0",
                        framelessSurface ? "rounded-none border-0 bg-transparent shadow-none" : block.props.surface === "bright" ? "border-0 bg-transparent shadow-none" : "border-0 bg-transparent shadow-none"
                      ),
                      children: [
                        column.label?.trim() ? /* @__PURE__ */ jsx5(
                          "div",
                          {
                            className: clsx3(
                              "mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]",
                              framelessSurface ? "text-[var(--photon-site-muted)]" : block.props.surface === "bright" ? "text-slate-500" : "text-white/40"
                            ),
                            children: column.label
                          }
                        ) : null,
                        renderArea ? renderArea(area, index) : null
                      ]
                    }
                  )
                },
                `${block.id}-${area.id}`
              );
            })
          }
        )
      ]
    }
  );
};
var splitLayoutFields = [
  {
    path: "eyebrow",
    label: "Eyebrow",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "title",
    label: "Title",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "body",
    label: "Body",
    kind: "textarea",
    group: "content",
    localization: "localized"
  },
  {
    path: "gap",
    label: "Column gap",
    kind: "number",
    min: 12,
    max: 72,
    step: 2,
    group: "layout",
    localization: "shared"
  },
  {
    path: "surface",
    label: "Surface",
    kind: "select",
    group: "style",
    localization: "shared",
    options: [
      { label: "Glass", value: "glass" },
      { label: "Bright", value: "bright" },
      { label: "Ink", value: "ink" }
    ]
  },
  {
    path: "columns.0.areaId",
    label: "Column 1 area",
    kind: "text",
    group: "layout",
    localization: "shared"
  },
  {
    path: "columns.0.label",
    label: "Column 1 label",
    kind: "text",
    group: "layout",
    localization: "shared"
  },
  {
    path: "columns.0.width",
    label: "Column 1 width",
    kind: "text",
    group: "layout",
    localization: "shared",
    description: "Any valid CSS track, for example minmax(0,0.38fr) or 360px."
  },
  {
    path: "columns.0.sticky",
    label: "Column 1 sticky",
    kind: "toggle",
    group: "layout",
    localization: "shared"
  },
  {
    path: "columns.1.areaId",
    label: "Column 2 area",
    kind: "text",
    group: "layout",
    localization: "shared"
  },
  {
    path: "columns.1.label",
    label: "Column 2 label",
    kind: "text",
    group: "layout",
    localization: "shared"
  },
  {
    path: "columns.1.width",
    label: "Column 2 width",
    kind: "text",
    group: "layout",
    localization: "shared"
  },
  {
    path: "columns.1.sticky",
    label: "Column 2 sticky",
    kind: "toggle",
    group: "layout",
    localization: "shared"
  }
];
var photonSystemModule = {
  module: "photon-system",
  label: "Photon System",
  labelKey: "photon.system.module.label",
  version: "0.2.0",
  blocks: [
    siteHeaderShellDefinition,
    siteFooterShellDefinition,
    definePhotonBlockDefinition({
      type: "split-layout",
      label: "Split Layout",
      labelKey: "photon.system.splitLayout.label",
      description: "Nested horizontal layout container with independent sticky columns and stackable child blocks.",
      descriptionKey: "photon.system.splitLayout.description",
      category: "Layout",
      icon: "layout-grid",
      defaults: {
        eyebrow: createPhotonLocalizedDefault({
          en: "Layout system",
          ru: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 layout-\u0431\u043B\u043E\u043A\u043E\u0432"
        }),
        title: createPhotonLocalizedDefault({
          en: "Compose horizontal sections without leaving the live page",
          ru: "\u0421\u043E\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u043A\u0446\u0438\u0438 \u043F\u0440\u044F\u043C\u043E \u043D\u0430 \u0436\u0438\u0432\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435"
        }),
        body: createPhotonLocalizedDefault({
          en: "Use nested layout containers to pin one side, stack blocks on the other and tune widths directly from the inspector.",
          ru: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0432\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0435 layout-\u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u044B, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0434\u043D\u0443 \u043A\u043E\u043B\u043E\u043D\u043A\u0443, \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0442\u0435\u043A \u0431\u043B\u043E\u043A\u043E\u0432 \u0432\u043E \u0432\u0442\u043E\u0440\u043E\u0439 \u0438 \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0442\u044C \u0448\u0438\u0440\u0438\u043D\u044B \u043F\u0440\u044F\u043C\u043E \u0438\u0437 \u0438\u043D\u0441\u043F\u0435\u043A\u0442\u043E\u0440\u0430."
        }),
        gap: 24,
        surface: "glass",
        columns: [
          {
            areaId: "primary",
            label: "",
            width: "minmax(280px, 0.38fr)",
            sticky: true
          },
          {
            areaId: "secondary",
            label: "",
            width: "minmax(0, 0.62fr)",
            sticky: false
          }
        ]
      },
      areas: [
        {
          id: "primary",
          label: "Primary rail",
          blocks: []
        },
        {
          id: "secondary",
          label: "Content stack",
          blocks: []
        }
      ],
      fields: splitLayoutFields,
      component: SplitLayout
    })
  ],
  siteSettingsPanels: [siteDesignSettingsPanel]
};
var photonSystemKit = createPhotonKit({
  key: "photon-system",
  label: "Photon System",
  modules: [photonSystemModule]
});
export {
  DEFAULT_PHOTON_WORKSPACE_CAPABILITIES,
  DEFAULT_PHOTON_WORKSPACE_REF,
  EditableGallery,
  EditableImage,
  EditableRepeaterValue,
  EditableRichText,
  EditableText2 as EditableText,
  EditableTextarea,
  KeyboardMenuList,
  PHOTON_DEFAULT_SITE_DESIGN_PRESET_ID,
  PHOTON_EMPTY_TEXT,
  PHOTON_PAGE_SURFACE_REGION_KEY,
  PHOTON_ROOT_LIST_ID,
  PHOTON_SEARCH_OCCURRENCE_PARAM,
  PHOTON_SEARCH_QUERY_PARAM,
  PHOTON_SEARCH_TARGET_PARAM,
  PHOTON_SITE_DESIGN_DEFAULTS,
  PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS,
  PhotonBlockRenderer,
  PhotonFieldEditorList,
  PhotonI18nProvider,
  PhotonLink,
  PhotonProvider,
  PhotonRenderDepthProvider,
  PhotonRichTextEditor,
  PhotonSearchHighlightEffect,
  PhotonSiteSearch,
  PhotonStudio,
  PhotonSurfaceSection,
  applyPhotonSiteColorScheme,
  applyPhotonSiteDesignPreset,
  buildPhotonSearchResultHref,
  buildPhotonSearchTargetId,
  canEditPhotonWorkspace,
  canSavePhotonWorkspace,
  clonePhotonBlockTreeWithNewIds,
  clonePhotonValue,
  collectBlockIds,
  collectPhotonAccountTabs,
  collectPhotonDocuments,
  collectPhotonFooterExtensionItems,
  collectPhotonHeaderExtensionItems,
  collectPhotonSiteFrameExtensions,
  composePhotonSurfaceDocument,
  createPhotonAccountTabExtension,
  createPhotonAreaListId,
  createPhotonBlock,
  createPhotonBlockLocalizationSchema,
  createPhotonKit,
  createPhotonLocalizationManifest,
  createPhotonLocalizedDefault,
  createPhotonNodeId,
  createPhotonRegistry,
  createPhotonRuntime,
  createPhotonSiteDesignSettings,
  createPhotonSiteFrameExtension,
  createPhotonTiptapJsonBindingAdapter,
  decodePhotonHtmlEntities,
  decomposePhotonSurfaceDocument,
  definePhotonBlockDefinition,
  duplicatePhotonBlockInDocument,
  findPhotonBlock,
  getFirstPhotonBlockId,
  getFirstPhotonSurfaceEditableBlockId,
  getPhotonAnchorRel,
  getPhotonDefinitionKey,
  getPhotonDocumentFingerprint,
  getPhotonSiteColorScheme,
  getPhotonSiteDesignPreset,
  getPhotonSurfaceModeStyle,
  getPhotonSurfaceRegionBlocks,
  getPhotonSurfaceRegionListId,
  getPhotonWorkspaceIdentityKey,
  getPhotonWorkspaceKey,
  getValueAtPath,
  hasPhotonSiteDesignPresetCustomization,
  insertPhotonBlockInDocument,
  isPhotonFramelessPreset,
  isPhotonFramelessSiteDesign,
  isPhotonInstallableKit,
  isPhotonMediaValue,
  isPhotonSiteDesignPresetApplied,
  isPhotonWorkspaceReadonly,
  movePhotonArrayItem,
  movePhotonBlockInDocument,
  normalizePhotonSelectionForMode,
  normalizePhotonUrlForProtocolCheck,
  normalizePhotonWorkspaceCapabilities,
  normalizePhotonWorkspaceDescriptor,
  normalizePhotonWorkspaceRef,
  photonRichTextContentClassName,
  photonSiteColorSchemes,
  photonSiteDesignPresets,
  photonSystemKit,
  photonSystemModule,
  removePhotonBlockFromDocument,
  renderPhotonRichTextHtml,
  resolvePhotonAccess,
  resolvePhotonAccountTabs,
  resolvePhotonMediaPreviewUrl,
  resolvePhotonMediaUrl,
  resolvePhotonMode,
  resolvePhotonModules,
  resolvePhotonRequestHeaders,
  resolvePhotonSiteDesignSettings,
  resolvePhotonSiteFrameExtensions,
  resolvePhotonSurfaceRegionDescriptors,
  resolvePhotonSurfaceRegionForBlockId,
  resolvePhotonSurfaceRegionForListId,
  resolvePhotonText,
  resolvePhotonWorkspaceParams,
  sanitizePhotonLinkHref,
  setValueAtPath,
  updatePhotonBlockInDocument,
  updatePhotonMediaUrl,
  useKeyboardMenuController,
  usePhoton,
  usePhotonCanEdit,
  usePhotonFieldValue,
  usePhotonI18n,
  usePhotonPersistedState,
  usePhotonRenderDepth,
  usePhotonStore,
  usePhotonStoreApi,
  usePhotonValueAtPath
};
