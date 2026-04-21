import {
  EditableImage
} from "./chunk-MLFQUPPU.js";
import {
  EditableRichText
} from "./chunk-AUDECFAA.js";
import {
  EditableText
} from "./chunk-H45OKBHC.js";
import {
  EditableTextarea
} from "./chunk-EYMSWDJE.js";
import {
  WebsiteBuilderFieldEditorList,
  WebsiteBuilderStudio
} from "./chunk-6A7Z662L.js";
import {
  WebsiteBuilderRichTextEditor,
  renderWebsiteBuilderRichTextHtml,
  websiteBuilderRichTextContentClassName
} from "./chunk-RHGH5BX2.js";
import {
  WebsiteBuilderSiteSearch,
  siteFooterShellDefinition,
  siteHeaderShellDefinition
} from "./chunk-5JYE76G2.js";
import {
  KeyboardMenuList,
  WebsiteBuilderBlockRenderer,
  WebsiteBuilderRenderDepthProvider,
  WebsiteBuilderSearchHighlightEffect,
  useKeyboardMenuController,
  useWebsiteBuilderRenderDepth
} from "./chunk-OURPASIW.js";
import "./chunk-LEXLLWPP.js";
import {
  buildWebsiteBuilderSearchResultHref,
  buildWebsiteBuilderSearchTargetId
} from "./chunk-JWEWJA2O.js";
import {
  normalizeWebsiteBuilderSelectionForMode,
  resolveWebsiteBuilderAccess,
  resolveWebsiteBuilderMode,
  resolveWebsiteBuilderRequestHeaders,
  resolveWebsiteBuilderWorkspaceParams
} from "./chunk-NIL7BFDU.js";
import {
  createWebsiteBuilderRuntime
} from "./chunk-73LA5FDK.js";
import {
  collectWebsiteBuilderFooterExtensionItems,
  collectWebsiteBuilderHeaderExtensionItems,
  createWebsiteBuilderAccountTabExtension,
  createWebsiteBuilderSiteFrameExtension,
  resolveWebsiteBuilderAccountTabs,
  resolveWebsiteBuilderSiteFrameExtensions
} from "./chunk-4N2K54N2.js";
import {
  getWebsiteBuilderSurfaceModeStyle
} from "./chunk-75KJ6L3N.js";
import {
  WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID,
  WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS,
  WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS,
  applyWebsiteBuilderSiteColorScheme,
  applyWebsiteBuilderSiteDesignPreset,
  createWebsiteBuilderSiteDesignSettings,
  getWebsiteBuilderSiteColorScheme,
  getWebsiteBuilderSiteDesignPreset,
  hasWebsiteBuilderSiteDesignPresetCustomization,
  isWebsiteBuilderFramelessPreset,
  isWebsiteBuilderFramelessSiteDesign,
  isWebsiteBuilderSiteDesignPresetApplied,
  resolveWebsiteBuilderSiteDesignSettings,
  websiteBuilderSiteColorSchemes,
  websiteBuilderSiteDesignPresets
} from "./chunk-7A32BINR.js";
import {
  WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM,
  WEBSITE_BUILDER_SEARCH_QUERY_PARAM,
  WEBSITE_BUILDER_SEARCH_TARGET_PARAM
} from "./chunk-HFEMF2E3.js";
import {
  EditableGallery
} from "./chunk-EMAOBTRS.js";
import "./chunk-LGQN6FEA.js";
import "./chunk-DUTVWY2H.js";
import {
  isWebsiteBuilderMediaValue,
  resolveWebsiteBuilderMediaPreviewUrl,
  resolveWebsiteBuilderMediaUrl,
  updateWebsiteBuilderMediaUrl
} from "./chunk-NZ4V64SZ.js";
import {
  WebsiteBuilderI18nProvider,
  WebsiteBuilderLink,
  WebsiteBuilderProvider,
  resolveWebsiteBuilderText,
  useWebsiteBuilder,
  useWebsiteBuilderCanEdit,
  useWebsiteBuilderFieldValue,
  useWebsiteBuilderI18n,
  useWebsiteBuilderPersistedState,
  useWebsiteBuilderStore,
  useWebsiteBuilderStoreApi
} from "./chunk-OWDRVIFG.js";
import {
  WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
  collectWebsiteBuilderAccountTabs,
  collectWebsiteBuilderDocuments,
  collectWebsiteBuilderSiteFrameExtensions,
  composeWebsiteBuilderSurfaceDocument,
  createWebsiteBuilderBlock,
  createWebsiteBuilderBlockLocalizationSchema,
  createWebsiteBuilderKit,
  createWebsiteBuilderLocalizationManifest,
  createWebsiteBuilderLocalizedDefault,
  createWebsiteBuilderRegistry,
  decomposeWebsiteBuilderSurfaceDocument,
  defineWebsiteBuilderBlockDefinition,
  getFirstWebsiteBuilderSurfaceEditableBlockId,
  getWebsiteBuilderDefinitionKey,
  getWebsiteBuilderDocumentFingerprint,
  getWebsiteBuilderSurfaceRegionBlocks,
  getWebsiteBuilderSurfaceRegionListId,
  isWebsiteBuilderInstallableKit,
  moveWebsiteBuilderArrayItem,
  resolveWebsiteBuilderModules,
  resolveWebsiteBuilderSurfaceRegionDescriptors,
  resolveWebsiteBuilderSurfaceRegionForBlockId,
  resolveWebsiteBuilderSurfaceRegionForListId
} from "./chunk-4FGVRZOX.js";
import {
  decodeWebsiteBuilderHtmlEntities,
  getWebsiteBuilderAnchorRel,
  normalizeWebsiteBuilderUrlForProtocolCheck,
  sanitizeWebsiteBuilderLinkHref
} from "./chunk-M743RWMM.js";
import {
  DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES,
  DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF,
  WEBSITE_BUILDER_EMPTY_TEXT,
  WEBSITE_BUILDER_ROOT_LIST_ID,
  canEditWebsiteBuilderWorkspace,
  canSaveWebsiteBuilderWorkspace,
  cloneWebsiteBuilderBlockTreeWithNewIds,
  cloneWebsiteBuilderValue,
  collectBlockIds,
  createWebsiteBuilderAreaListId,
  createWebsiteBuilderNodeId,
  duplicateWebsiteBuilderBlockInDocument,
  findWebsiteBuilderBlock,
  getFirstWebsiteBuilderBlockId,
  getValueAtPath,
  getWebsiteBuilderWorkspaceIdentityKey,
  getWebsiteBuilderWorkspaceKey,
  insertWebsiteBuilderBlockInDocument,
  isWebsiteBuilderWorkspaceReadonly,
  moveWebsiteBuilderBlockInDocument,
  normalizeWebsiteBuilderWorkspaceCapabilities,
  normalizeWebsiteBuilderWorkspaceDescriptor,
  normalizeWebsiteBuilderWorkspaceRef,
  removeWebsiteBuilderBlockFromDocument,
  setValueAtPath,
  updateWebsiteBuilderBlockInDocument
} from "./chunk-NYLOTAVT.js";

// src/helpers/register-editable-editor-loaders.ts
var registerLoader = (key, loader) => {
  globalThis.__websiteBuilderEditableEditorLoaders = {
    ...globalThis.__websiteBuilderEditableEditorLoaders,
    [key]: loader
  };
};
registerLoader(
  "gallery",
  () => import("./editable-gallery-XDVIRYWH.js").then(
    (module) => module.EditableGallery
  )
);
registerLoader(
  "image",
  () => import("./editable-image-J6DP5LPU.js").then(
    (module) => module.EditableImage
  )
);
registerLoader(
  "richText",
  () => import("./editable-rich-text-OAOMYXS6.js").then(
    (module) => module.EditableRichText
  )
);
registerLoader(
  "text",
  () => import("./editable-text-PGPBEXAP.js").then(
    (module) => module.EditableText
  )
);
registerLoader(
  "textarea",
  () => import("./editable-textarea-IVKJ4OB3.js").then(
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
    EditableText,
    {
      blockId,
      path,
      placeholder: fallback,
      className,
      as
    }
  );
};

// src/components/editable/use-website-builder-value-at-path.ts
var useWebsiteBuilderValueAtPath = (blockId, path) => {
  return useWebsiteBuilderFieldValue(blockId, path);
};

// src/components/surface-section.tsx
import {
  createElement
} from "react";
var WebsiteBuilderSurfaceSection = ({
  as,
  children,
  className,
  style,
  surfaceMode = "contained"
}) => {
  const Component = as ?? "section";
  const surfaceStyle = getWebsiteBuilderSurfaceModeStyle(surfaceMode);
  return createElement(
    Component,
    {
      className,
      style: surfaceStyle ? { ...surfaceStyle, ...style } : style,
      "data-wb-surface-mode": surfaceMode
    },
    children
  );
};

// src/helpers/binding.ts
import { generateHTML, generateJSON } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
var websiteBuilderBindingExtensions = [StarterKit];
var normalizeRichTextHtml = (value) => {
  const trimmed = value.trim();
  return trimmed === "" ? "<p></p>" : trimmed;
};
var createWebsiteBuilderTiptapJsonBindingAdapter = (key) => ({
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
        websiteBuilderBindingExtensions
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
        websiteBuilderBindingExtensions
      );
      const blocks = Array.isArray(parsed.content) ? parsed.content : [];
      return blocks.length === 0 ? null : parsed;
    } catch {
      return null;
    }
  }
});

// src/modules/system.tsx
import clsx from "clsx";

// src/modules/system/site/site-design-settings-panel.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var designFields = [
  {
    path: "bodyFontFamily",
    label: "Body font family",
    labelKey: "websiteBuilder.system.design.bodyFontFamily.label",
    kind: "text",
    description: "Any valid CSS font-family stack.",
    descriptionKey: "websiteBuilder.system.design.bodyFontFamily.description"
  },
  {
    path: "headingFontFamily",
    label: "Heading font family",
    labelKey: "websiteBuilder.system.design.headingFontFamily.label",
    kind: "text",
    description: "Used by system header/footer shells and any package that opts into the shared site tokens.",
    descriptionKey: "websiteBuilder.system.design.headingFontFamily.description"
  },
  {
    path: "backgroundColor",
    label: "Page background",
    labelKey: "websiteBuilder.system.design.backgroundColor.label",
    kind: "color"
  },
  {
    path: "surfaceColor",
    label: "Surface color",
    labelKey: "websiteBuilder.system.design.surfaceColor.label",
    kind: "color"
  },
  {
    path: "textColor",
    label: "Text color",
    labelKey: "websiteBuilder.system.design.textColor.label",
    kind: "color"
  },
  {
    path: "mutedTextColor",
    label: "Muted text color",
    labelKey: "websiteBuilder.system.design.mutedTextColor.label",
    kind: "color"
  },
  {
    path: "accentColor",
    label: "Accent color",
    labelKey: "websiteBuilder.system.design.accentColor.label",
    kind: "color"
  },
  {
    path: "borderColor",
    label: "Border color",
    labelKey: "websiteBuilder.system.design.borderColor.label",
    kind: "color"
  },
  {
    path: "siteMaxWidth",
    label: "Site max width",
    labelKey: "websiteBuilder.system.design.siteMaxWidth.label",
    kind: "text",
    description: "CSS width value used by the main content rail, for example 1280px or 92rem.",
    descriptionKey: "websiteBuilder.system.design.siteMaxWidth.description"
  },
  {
    path: "pageGutter",
    label: "Page gutter",
    labelKey: "websiteBuilder.system.design.pageGutter.label",
    kind: "text",
    description: "Horizontal spacing applied around the live page surface.",
    descriptionKey: "websiteBuilder.system.design.pageGutter.description"
  },
  {
    path: "sectionGap",
    label: "Section gap",
    labelKey: "websiteBuilder.system.design.sectionGap.label",
    kind: "text",
    description: "Vertical spacing between top-level blocks in the page region.",
    descriptionKey: "websiteBuilder.system.design.sectionGap.description"
  },
  {
    path: "radius",
    label: "Radius",
    labelKey: "websiteBuilder.system.design.radius.label",
    kind: "text",
    description: "Shared radius token consumed by the system shells.",
    descriptionKey: "websiteBuilder.system.design.radius.description"
  },
  {
    path: "headerOffset",
    label: "Header offset",
    labelKey: "websiteBuilder.system.design.headerOffset.label",
    kind: "text",
    description: "Extra top offset applied to sticky site headers on top of the builder dock.",
    descriptionKey: "websiteBuilder.system.design.headerOffset.description"
  }
];
var summaryCardStyle = {
  borderColor: "var(--wb-builder-border)",
  background: "var(--wb-builder-panel-muted)",
  color: "var(--wb-builder-text)"
};
var highlightCardStyle = {
  borderColor: "var(--wb-builder-border-strong)",
  background: "linear-gradient(180deg, color-mix(in srgb, var(--wb-builder-accent) 10%, transparent), var(--wb-builder-panel-muted))",
  color: "var(--wb-builder-text)"
};
var badgeStyle = {
  borderColor: "var(--wb-builder-border)",
  background: "var(--wb-builder-panel-solid)",
  color: "var(--wb-builder-text-soft)"
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
  const { translate } = useWebsiteBuilderI18n();
  const resolvedSettings = resolveWebsiteBuilderSiteDesignSettings(scopeSettings);
  const isAdvancedView = viewMode === "advanced";
  const activePreset = resolvedSettings.presetId ? websiteBuilderSiteDesignPresets.find(
    (candidate) => candidate.id === resolvedSettings.presetId
  ) ?? null : null;
  const activeColorScheme = resolvedSettings.colorSchemeId ? websiteBuilderSiteColorSchemes.find(
    (candidate) => candidate.id === resolvedSettings.colorSchemeId
  ) ?? null : null;
  if (isAdvancedView) {
    return /* @__PURE__ */ jsxs("section", { className: "space-y-4", "data-testid": "wb-design-manual-tokens", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx2(
          "div",
          {
            className: "text-sm font-semibold",
            style: { color: "var(--wb-builder-text)" },
            children: translate(
              "websiteBuilder.system.design.manual.sectionTitle",
              "Manual tokens"
            )
          }
        ),
        /* @__PURE__ */ jsx2(
          "div",
          {
            className: "text-sm leading-6",
            style: { color: "var(--wb-builder-text-muted)" },
            children: translate(
              "websiteBuilder.system.design.manual.sectionDescription",
              "Edit the active profile tokens directly here. These overrides live inside the selected profile branch and revision."
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx2(
        WebsiteBuilderFieldEditorList,
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
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", "data-testid": "wb-design-profile-source-summary", children: [
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
                style: { color: "var(--wb-builder-text)" },
                children: translate(
                  "websiteBuilder.system.design.profileSource.sectionTitle",
                  "Profile source"
                )
              }
            ),
            /* @__PURE__ */ jsx2(
              "div",
              {
                className: "text-sm leading-6",
                style: { color: "var(--wb-builder-text-muted)" },
                children: translate(
                  "websiteBuilder.system.design.profileSource.sectionDescription",
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
                "data-testid": "wb-design-source-preset",
                children: [
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "text-[11px] uppercase tracking-[0.28em]",
                      style: { color: "var(--wb-builder-text-soft)" },
                      children: translate(
                        "websiteBuilder.system.design.profileSource.presetLabel",
                        "Starter preset"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "mt-3 text-lg font-semibold",
                      style: { color: "var(--wb-builder-text)" },
                      children: activePreset?.label ?? translate(
                        "websiteBuilder.system.design.profileSource.blankPreset",
                        "Blank or migrated profile"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "mt-2 text-sm leading-6",
                      style: { color: "var(--wb-builder-text-muted)" },
                      children: activePreset?.description ?? translate(
                        "websiteBuilder.system.design.profileSource.blankPresetDescription",
                        "This profile has no starter preset metadata. Its current appearance is defined entirely by the stored design tokens below and the active branch history."
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
                    /* @__PURE__ */ jsx2(
                      DetailBadge,
                      {
                        label: activePreset?.appearance === "dark" ? translate(
                          "websiteBuilder.system.design.appearance.dark",
                          "Dark"
                        ) : activePreset?.appearance === "light" ? translate(
                          "websiteBuilder.system.design.appearance.light",
                          "Light"
                        ) : translate(
                          "websiteBuilder.system.design.profileSource.customized",
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
                "data-testid": "wb-design-source-color-scheme",
                children: [
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "text-[11px] uppercase tracking-[0.28em]",
                      style: { color: "var(--wb-builder-text-soft)" },
                      children: translate(
                        "websiteBuilder.system.design.profileSource.schemeLabel",
                        "Stored palette"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "mt-3 text-lg font-semibold",
                      style: { color: "var(--wb-builder-text)" },
                      children: activeColorScheme?.label ?? translate(
                        "websiteBuilder.system.design.profileSource.customPalette",
                        "Manual palette"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "mt-2 text-sm leading-6",
                      style: { color: "var(--wb-builder-text-muted)" },
                      children: activeColorScheme?.description ?? translate(
                        "websiteBuilder.system.design.profileSource.customPaletteDescription",
                        "The current branch stores color tokens directly, so no named palette is attached to this profile state."
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx2(
                    "div",
                    {
                      className: "mt-4 flex flex-wrap gap-2",
                      "data-testid": "wb-design-runtime-palette",
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
                                  borderColor: "var(--wb-builder-border)"
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
        "data-testid": "wb-design-workspace-guidance",
        children: [
          /* @__PURE__ */ jsx2(
            "div",
            {
              className: "text-sm font-semibold",
              style: { color: "var(--wb-builder-text)" },
              children: translate(
                "websiteBuilder.system.design.workspaceGuidance.title",
                "How to change the source"
              )
            }
          ),
          /* @__PURE__ */ jsx2(
            "div",
            {
              className: "mt-2 text-sm leading-6",
              style: { color: "var(--wb-builder-text-muted)" },
              children: translate(
                "websiteBuilder.system.design.workspaceGuidance.description",
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
  labelKey: "websiteBuilder.system.design.panel.label",
  description: "Profile source metadata and stored runtime design tokens for the current branch.",
  descriptionKey: "websiteBuilder.system.design.panel.description",
  order: 10,
  component: (props) => /* @__PURE__ */ jsx2(SiteDesignSettingsPanelBody, { ...props })
};

// src/modules/system.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
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
  const mode = useWebsiteBuilderStore((state) => state.mode);
  const siteDesign = useWebsiteBuilderStore((state) => state.site.settings.design);
  const columns = block.props.columns ?? [];
  const areas = block.areas ?? [];
  const templateColumns = areas.map((area, index) => getColumnConfig(columns, area, index).width).join(" ");
  const surface = surfaceStyles[block.props.surface] ?? surfaceStyles.glass;
  const framelessSurface = isWebsiteBuilderFramelessSiteDesign(siteDesign);
  const stickyPreviewEnabled = mode !== "builder";
  return /* @__PURE__ */ jsxs2(
    "section",
    {
      className: clsx(
        "min-w-0 px-6 py-8 sm:px-8 sm:py-10",
        framelessSurface ? "rounded-none border-0 bg-transparent text-[var(--wb-site-text)] shadow-none" : "rounded-[38px] border shadow-[0_28px_90px_rgba(2,12,27,0.16)]",
        !framelessSurface && surface
      ),
      style: framelessSurface ? getWebsiteBuilderSurfaceModeStyle("bleed") : void 0,
      children: [
        /* @__PURE__ */ jsxs2("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx3(
            EditableText,
            {
              blockId: block.id,
              path: "eyebrow",
              className: clsx(
                "text-[11px] font-semibold uppercase tracking-[0.3em]",
                framelessSurface ? "text-[var(--wb-site-muted)]" : block.props.surface === "bright" ? "text-slate-500" : "text-cyan-100/70"
              )
            }
          ),
          /* @__PURE__ */ jsx3(
            EditableText,
            {
              blockId: block.id,
              path: "title",
              as: "h2",
              className: clsx(
                "mt-4 block text-balance text-3xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-4xl xl:text-5xl",
                framelessSurface ? "text-[var(--wb-site-text)]" : block.props.surface === "bright" ? "text-slate-950" : "text-white"
              )
            }
          ),
          /* @__PURE__ */ jsx3(
            EditableTextarea,
            {
              blockId: block.id,
              path: "body",
              className: clsx(
                "mt-5 text-base leading-8",
                framelessSurface ? "text-[var(--wb-site-muted)]" : block.props.surface === "bright" ? "text-slate-600" : "text-slate-300"
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsx3(
          "div",
          {
            className: "mt-8 grid grid-cols-1 items-start gap-[var(--wb-layout-gap)] lg:[grid-template-columns:var(--wb-layout-columns)]",
            style: {
              "--wb-layout-columns": templateColumns || "minmax(0,1fr)",
              "--wb-layout-gap": `${block.props.gap || 24}px`
            },
            children: areas.map((area, index) => {
              const column = getColumnConfig(columns, area, index);
              return /* @__PURE__ */ jsx3(
                "div",
                {
                  className: clsx(
                    "min-w-0",
                    column.sticky && stickyPreviewEnabled && "lg:sticky lg:self-start"
                  ),
                  style: column.sticky && stickyPreviewEnabled ? {
                    top: "calc(var(--wb-dock-offset, 0px) + var(--wb-site-header-offset, 0px) + var(--wb-site-header-height, 0px) + 0.75rem)"
                  } : void 0,
                  children: /* @__PURE__ */ jsxs2(
                    "div",
                    {
                      className: clsx(
                        "relative isolate min-w-0 px-0 py-0",
                        framelessSurface ? "rounded-none border-0 bg-transparent shadow-none" : block.props.surface === "bright" ? "border-0 bg-transparent shadow-none" : "border-0 bg-transparent shadow-none"
                      ),
                      children: [
                        column.label?.trim() ? /* @__PURE__ */ jsx3(
                          "div",
                          {
                            className: clsx(
                              "mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]",
                              framelessSurface ? "text-[var(--wb-site-muted)]" : block.props.surface === "bright" ? "text-slate-500" : "text-white/40"
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
var websiteBuilderSystemModule = {
  module: "website-builder-system",
  label: "Website Builder System",
  labelKey: "websiteBuilder.system.module.label",
  version: "0.2.0",
  blocks: [
    siteHeaderShellDefinition,
    siteFooterShellDefinition,
    defineWebsiteBuilderBlockDefinition({
      type: "split-layout",
      label: "Split Layout",
      labelKey: "websiteBuilder.system.splitLayout.label",
      description: "Nested horizontal layout container with independent sticky columns and stackable child blocks.",
      descriptionKey: "websiteBuilder.system.splitLayout.description",
      category: "Layout",
      icon: "layout-grid",
      defaults: {
        eyebrow: createWebsiteBuilderLocalizedDefault({
          en: "Layout system",
          ru: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 layout-\u0431\u043B\u043E\u043A\u043E\u0432"
        }),
        title: createWebsiteBuilderLocalizedDefault({
          en: "Compose horizontal sections without leaving the live page",
          ru: "\u0421\u043E\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u043A\u0446\u0438\u0438 \u043F\u0440\u044F\u043C\u043E \u043D\u0430 \u0436\u0438\u0432\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435"
        }),
        body: createWebsiteBuilderLocalizedDefault({
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
var websiteBuilderSystemKit = createWebsiteBuilderKit({
  key: "website-builder-system",
  label: "Website Builder System",
  modules: [websiteBuilderSystemModule]
});
export {
  DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES,
  DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF,
  EditableGallery,
  EditableImage,
  EditableRepeaterValue,
  EditableRichText,
  EditableText,
  EditableTextarea,
  KeyboardMenuList,
  WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID,
  WEBSITE_BUILDER_EMPTY_TEXT,
  WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
  WEBSITE_BUILDER_ROOT_LIST_ID,
  WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM,
  WEBSITE_BUILDER_SEARCH_QUERY_PARAM,
  WEBSITE_BUILDER_SEARCH_TARGET_PARAM,
  WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS,
  WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS,
  WebsiteBuilderBlockRenderer,
  WebsiteBuilderFieldEditorList,
  WebsiteBuilderI18nProvider,
  WebsiteBuilderLink,
  WebsiteBuilderProvider,
  WebsiteBuilderRenderDepthProvider,
  WebsiteBuilderRichTextEditor,
  WebsiteBuilderSearchHighlightEffect,
  WebsiteBuilderSiteSearch,
  WebsiteBuilderStudio,
  WebsiteBuilderSurfaceSection,
  applyWebsiteBuilderSiteColorScheme,
  applyWebsiteBuilderSiteDesignPreset,
  buildWebsiteBuilderSearchResultHref,
  buildWebsiteBuilderSearchTargetId,
  canEditWebsiteBuilderWorkspace,
  canSaveWebsiteBuilderWorkspace,
  cloneWebsiteBuilderBlockTreeWithNewIds,
  cloneWebsiteBuilderValue,
  collectBlockIds,
  collectWebsiteBuilderAccountTabs,
  collectWebsiteBuilderDocuments,
  collectWebsiteBuilderFooterExtensionItems,
  collectWebsiteBuilderHeaderExtensionItems,
  collectWebsiteBuilderSiteFrameExtensions,
  composeWebsiteBuilderSurfaceDocument,
  createWebsiteBuilderAccountTabExtension,
  createWebsiteBuilderAreaListId,
  createWebsiteBuilderBlock,
  createWebsiteBuilderBlockLocalizationSchema,
  createWebsiteBuilderKit,
  createWebsiteBuilderLocalizationManifest,
  createWebsiteBuilderLocalizedDefault,
  createWebsiteBuilderNodeId,
  createWebsiteBuilderRegistry,
  createWebsiteBuilderRuntime,
  createWebsiteBuilderSiteDesignSettings,
  createWebsiteBuilderSiteFrameExtension,
  createWebsiteBuilderTiptapJsonBindingAdapter,
  decodeWebsiteBuilderHtmlEntities,
  decomposeWebsiteBuilderSurfaceDocument,
  defineWebsiteBuilderBlockDefinition,
  duplicateWebsiteBuilderBlockInDocument,
  findWebsiteBuilderBlock,
  getFirstWebsiteBuilderBlockId,
  getFirstWebsiteBuilderSurfaceEditableBlockId,
  getValueAtPath,
  getWebsiteBuilderAnchorRel,
  getWebsiteBuilderDefinitionKey,
  getWebsiteBuilderDocumentFingerprint,
  getWebsiteBuilderSiteColorScheme,
  getWebsiteBuilderSiteDesignPreset,
  getWebsiteBuilderSurfaceModeStyle,
  getWebsiteBuilderSurfaceRegionBlocks,
  getWebsiteBuilderSurfaceRegionListId,
  getWebsiteBuilderWorkspaceIdentityKey,
  getWebsiteBuilderWorkspaceKey,
  hasWebsiteBuilderSiteDesignPresetCustomization,
  insertWebsiteBuilderBlockInDocument,
  isWebsiteBuilderFramelessPreset,
  isWebsiteBuilderFramelessSiteDesign,
  isWebsiteBuilderInstallableKit,
  isWebsiteBuilderMediaValue,
  isWebsiteBuilderSiteDesignPresetApplied,
  isWebsiteBuilderWorkspaceReadonly,
  moveWebsiteBuilderArrayItem,
  moveWebsiteBuilderBlockInDocument,
  normalizeWebsiteBuilderSelectionForMode,
  normalizeWebsiteBuilderUrlForProtocolCheck,
  normalizeWebsiteBuilderWorkspaceCapabilities,
  normalizeWebsiteBuilderWorkspaceDescriptor,
  normalizeWebsiteBuilderWorkspaceRef,
  removeWebsiteBuilderBlockFromDocument,
  renderWebsiteBuilderRichTextHtml,
  resolveWebsiteBuilderAccess,
  resolveWebsiteBuilderAccountTabs,
  resolveWebsiteBuilderMediaPreviewUrl,
  resolveWebsiteBuilderMediaUrl,
  resolveWebsiteBuilderMode,
  resolveWebsiteBuilderModules,
  resolveWebsiteBuilderRequestHeaders,
  resolveWebsiteBuilderSiteDesignSettings,
  resolveWebsiteBuilderSiteFrameExtensions,
  resolveWebsiteBuilderSurfaceRegionDescriptors,
  resolveWebsiteBuilderSurfaceRegionForBlockId,
  resolveWebsiteBuilderSurfaceRegionForListId,
  resolveWebsiteBuilderText,
  resolveWebsiteBuilderWorkspaceParams,
  sanitizeWebsiteBuilderLinkHref,
  setValueAtPath,
  updateWebsiteBuilderBlockInDocument,
  updateWebsiteBuilderMediaUrl,
  useKeyboardMenuController,
  useWebsiteBuilder,
  useWebsiteBuilderCanEdit,
  useWebsiteBuilderFieldValue,
  useWebsiteBuilderI18n,
  useWebsiteBuilderPersistedState,
  useWebsiteBuilderRenderDepth,
  useWebsiteBuilderStore,
  useWebsiteBuilderStoreApi,
  useWebsiteBuilderValueAtPath,
  websiteBuilderRichTextContentClassName,
  websiteBuilderSiteColorSchemes,
  websiteBuilderSiteDesignPresets,
  websiteBuilderSystemKit,
  websiteBuilderSystemModule
};
