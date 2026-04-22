"use client";
import {
  EditableImage,
  EditableTextarea,
  PhotonSiteSearch,
  isPhotonPublicFramelessSiteDesign,
  resolvePhotonPublicSiteDesignSettings,
  siteFooterShellDefinition,
  siteHeaderShellDefinition
} from "./chunk-SNFVUC4N.js";
import {
  PhotonBlockRenderer,
  PhotonRenderDepthProvider,
  PhotonSearchHighlightEffect,
  PhotonSurfaceLayoutProvider,
  usePhotonRenderDepth
} from "./chunk-57U64XQ4.js";
import {
  EditableText,
  getPhotonEditableEditorLoader
} from "./chunk-KBISSZIA.js";
import {
  buildPhotonSearchTargetId
} from "./chunk-FRFYYFDJ.js";
import {
  createPhotonRuntime
} from "./chunk-HHFFJ7R4.js";
import {
  createPhotonAccountTabExtension,
  createPhotonSiteFrameExtension,
  resolvePhotonAccountTabs
} from "./chunk-JSXMWVKI.js";
import {
  getPhotonSurfaceModeStyle
} from "./chunk-IOB5G6YT.js";
import {
  PHOTON_SEARCH_OCCURRENCE_PARAM,
  PHOTON_SEARCH_QUERY_PARAM,
  PHOTON_SEARCH_TARGET_PARAM
} from "./chunk-CZ47CC3D.js";
import {
  resolvePhotonMediaPreviewUrl
} from "./chunk-QQDDM7OM.js";
import {
  PhotonLink,
  PhotonProvider,
  usePhoton,
  usePhotonCanEdit,
  usePhotonFieldValue,
  usePhotonI18n,
  usePhotonStore
} from "./chunk-XOQNSI7G.js";
import {
  PHOTON_PAGE_SURFACE_REGION_KEY,
  createPhotonBlockLocalizationSchema,
  createPhotonKit,
  createPhotonLocalizedDefault,
  definePhotonBlockDefinition,
  getPhotonSurfaceRegionBlocks,
  resolvePhotonSurfaceRegionDescriptors
} from "./chunk-U33YWAMI.js";
import {
  getPhotonAnchorRel,
  sanitizePhotonLinkHref
} from "./chunk-V7CN23YR.js";
import {
  PHOTON_EMPTY_TEXT
} from "./chunk-5MWE2CZQ.js";

// src/public.tsx
import clsx4 from "clsx";
import { memo, useEffect as useEffect3, useRef, useState as useState3 } from "react";

// src/components/public/public-editable-gallery.tsx
import clsx from "clsx";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var EditableGallery = ({
  blockId,
  path,
  className,
  emptyTitle = "Upload gallery images",
  emptyBody = "Drop or upload supporting visuals directly into the live page.",
  columnsClassName = "grid gap-4 sm:grid-cols-2",
  itemCardClassName,
  itemFallbackClassName,
  itemLabelClassName,
  itemCaptionClassName,
  itemFileNameClassName,
  emptyStateClassName,
  emptyStateTitleClassName,
  emptyStateBodyClassName,
  emptyStateButtonClassName,
  addCardClassName,
  addCardTitleClassName,
  addCardBodyClassName,
  addCardButtonClassName
}) => {
  const canEdit = usePhotonCanEdit();
  const galleryValue = usePhotonFieldValue(blockId, path);
  const items = Array.isArray(galleryValue) ? galleryValue : [];
  const [EditableGalleryEditor, setEditableGalleryEditor] = useState(null);
  useEffect(() => {
    if (!canEdit || EditableGalleryEditor) {
      return;
    }
    let cancelled = false;
    const loadEditor = getPhotonEditableEditorLoader("gallery");
    if (!loadEditor) {
      return;
    }
    void loadEditor().then((component) => {
      if (!cancelled) {
        setEditableGalleryEditor(
          () => component
        );
      }
    });
    return () => {
      cancelled = true;
    };
  }, [canEdit, EditableGalleryEditor]);
  if (canEdit && EditableGalleryEditor) {
    return /* @__PURE__ */ jsx(
      EditableGalleryEditor,
      {
        blockId,
        path,
        className,
        emptyTitle,
        emptyBody,
        columnsClassName,
        itemCardClassName,
        itemFallbackClassName,
        itemLabelClassName,
        itemCaptionClassName,
        itemFileNameClassName,
        emptyStateClassName,
        emptyStateTitleClassName,
        emptyStateBodyClassName,
        emptyStateButtonClassName,
        addCardClassName,
        addCardTitleClassName,
        addCardBodyClassName,
        addCardButtonClassName
      }
    );
  }
  return /* @__PURE__ */ jsx(
    EditableGalleryStatic,
    {
      items,
      className,
      columnsClassName,
      itemCardClassName,
      itemFallbackClassName,
      itemLabelClassName,
      itemCaptionClassName,
      itemFileNameClassName,
      emptyTitle,
      emptyBody,
      emptyStateClassName,
      emptyStateTitleClassName,
      emptyStateBodyClassName
    }
  );
};
var EditableGalleryStatic = ({
  items,
  className,
  columnsClassName,
  itemCardClassName,
  itemFallbackClassName,
  itemLabelClassName,
  itemCaptionClassName,
  itemFileNameClassName,
  emptyTitle,
  emptyBody,
  emptyStateClassName,
  emptyStateTitleClassName,
  emptyStateBodyClassName
}) => /* @__PURE__ */ jsx("div", { "data-testid": "photon-editable-gallery", className, children: /* @__PURE__ */ jsx(
  "div",
  {
    className: clsx(columnsClassName, items.length === 0 && "grid-cols-1"),
    children: items.length === 0 ? /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "rounded-[34px] border border-dashed px-6 py-8 text-center",
          emptyStateClassName
        ),
        style: {
          borderColor: "var(--photon-gallery-empty-border, rgba(214,211,209,0.9))",
          background: "var(--photon-gallery-empty-bg, linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,240,231,0.96)))",
          color: "var(--photon-gallery-empty-text, rgba(87,83,78,0.84))",
          boxShadow: "var(--photon-gallery-empty-shadow, 0 18px 40px rgba(120,113,108,0.12))"
        },
        children: [
          /* @__PURE__ */ jsx(
            "p",
            {
              className: clsx("text-sm font-semibold", emptyStateTitleClassName),
              style: { color: "var(--photon-gallery-empty-title, currentColor)" },
              children: emptyTitle
            }
          ),
          /* @__PURE__ */ jsx("p", { className: clsx("mt-2 text-sm", emptyStateBodyClassName), children: emptyBody })
        ]
      }
    ) : items.map((item, index) => /* @__PURE__ */ jsx(
      PublicGalleryItemCard,
      {
        item,
        index,
        totalItems: items.length,
        className: itemCardClassName,
        fallbackClassName: itemFallbackClassName,
        labelClassName: itemLabelClassName,
        captionClassName: itemCaptionClassName,
        fileNameClassName: itemFileNameClassName
      },
      item.id ?? `${index}-${resolvePhotonMediaPreviewUrl(item.media)}`
    ))
  }
) });
var PublicGalleryItemCard = ({
  item,
  index,
  totalItems,
  className,
  fallbackClassName,
  labelClassName,
  captionClassName,
  fileNameClassName
}) => {
  const previewUrl = resolvePhotonMediaPreviewUrl(item.media);
  const isHeroItem = totalItems >= 3 && index === 0;
  return /* @__PURE__ */ jsxs(
    "article",
    {
      "data-testid": "photon-editable-gallery-item",
      className: clsx(
        "overflow-hidden rounded-[34px] border",
        className,
        isHeroItem && "md:col-span-2"
      ),
      style: {
        borderColor: "var(--photon-gallery-card-border, rgba(255,255,255,0.1))",
        background: "var(--photon-gallery-card-bg, radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_48%),linear-gradient(180deg,rgba(8,17,30,0.97),rgba(5,11,20,0.99)))",
        boxShadow: "var(--photon-gallery-card-shadow, 0 24px 56px rgba(0,0,0,0.2))"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx(
              "relative overflow-hidden",
              isHeroItem ? "aspect-[16/10]" : "aspect-[4/3]"
            ),
            children: previewUrl ? /* @__PURE__ */ jsx(
              "img",
              {
                src: previewUrl,
                alt: item.alt || `Gallery image ${index + 1}`,
                className: "h-full w-full object-cover"
              }
            ) : /* @__PURE__ */ jsx(
              "div",
              {
                className: clsx(
                  "flex h-full w-full items-center justify-center text-center text-sm",
                  fallbackClassName
                ),
                style: {
                  background: "var(--photon-gallery-fallback-bg, radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_28%),linear-gradient(180deg,rgba(7,17,31,0.92),rgba(5,11,20,0.98)))",
                  color: "var(--photon-gallery-fallback-text, rgba(255,255,255,0.48))"
                },
                children: "Media slot"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 px-5 py-5", children: [
          /* @__PURE__ */ jsx(
            "p",
            {
              className: clsx(
                "text-[11px] font-semibold uppercase tracking-[0.2em]",
                labelClassName
              ),
              style: { color: "var(--photon-gallery-label, rgba(255,255,255,0.54))" },
              children: item.eyebrow || `Item ${index + 1}`
            }
          ),
          item.caption ? /* @__PURE__ */ jsx(
            "p",
            {
              className: clsx("text-sm leading-6", captionClassName),
              style: {
                color: "var(--photon-gallery-caption, rgba(255,255,255,0.72))"
              },
              children: item.caption
            }
          ) : null,
          typeof item.media === "string" ? /* @__PURE__ */ jsx(
            "p",
            {
              className: clsx(
                "truncate rounded-full border px-3 py-1.5 text-xs",
                fileNameClassName
              ),
              style: {
                borderColor: "var(--photon-gallery-file-border, rgba(255,255,255,0.08))",
                background: "var(--photon-gallery-file-bg, rgba(255,255,255,0.05))",
                color: "var(--photon-gallery-file-text, rgba(255,255,255,0.5))"
              },
              children: item.media
            }
          ) : null
        ] })
      ]
    }
  );
};

// src/components/public/public-editable-repeater-value.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var EditableRepeaterValue = ({
  blockId,
  path,
  fallback,
  className,
  as
}) => /* @__PURE__ */ jsx2(
  EditableText,
  {
    blockId,
    path,
    placeholder: fallback,
    className,
    as
  }
);

// src/components/public/public-editable-rich-text.tsx
import clsx2 from "clsx";
import { useEffect as useEffect2, useState as useState2 } from "react";

// src/components/public/sanitize-rich-text.ts
var allowedTags = /* @__PURE__ */ new Set([
  "a",
  "blockquote",
  "br",
  "code",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "li",
  "ol",
  "p",
  "strong",
  "ul"
]);
var allowedGlobalAttributes = /* @__PURE__ */ new Set(["class"]);
var allowedAttributesByTag = {
  a: /* @__PURE__ */ new Set(["href", "rel", "target", "title"])
};
var escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
var escapeAttribute = (value) => escapeHtml(value).replaceAll('"', "&quot;");
var sanitizeAttributeValue = (tagName, name, value) => {
  if (name === "href") {
    const sanitizedHref = sanitizePhotonLinkHref(value, "");
    return sanitizedHref === "" ? null : sanitizedHref;
  }
  if (tagName === "a" && name === "target" && value !== "_blank") {
    return null;
  }
  return value;
};
var sanitizeWithDomParser = (html) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const root = document.body.firstElementChild;
  const sanitizeNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return [document.createTextNode(node.textContent ?? "")];
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return [];
    }
    const element = node;
    const tagName = element.tagName.toLowerCase();
    const children = Array.from(element.childNodes).flatMap(sanitizeNode);
    if (!allowedTags.has(tagName)) {
      return children;
    }
    const cleanElement = document.createElement(tagName);
    const allowedAttributes = allowedAttributesByTag[tagName] ?? /* @__PURE__ */ new Set();
    for (const attribute of Array.from(element.attributes)) {
      const name = attribute.name.toLowerCase();
      if (name.startsWith("on")) {
        continue;
      }
      if (!allowedGlobalAttributes.has(name) && !allowedAttributes.has(name)) {
        continue;
      }
      const value = sanitizeAttributeValue(tagName, name, attribute.value);
      if (value !== null) {
        cleanElement.setAttribute(name, value);
      }
    }
    if (tagName === "a") {
      cleanElement.setAttribute(
        "rel",
        getPhotonAnchorRel(
          cleanElement.getAttribute("target"),
          cleanElement.getAttribute("rel")
        ) ?? "noopener noreferrer"
      );
    }
    for (const child of children) {
      cleanElement.appendChild(child);
    }
    return [cleanElement];
  };
  const cleanRoot = document.createElement("div");
  for (const child of Array.from(root?.childNodes ?? [])) {
    for (const cleanChild of sanitizeNode(child)) {
      cleanRoot.appendChild(cleanChild);
    }
  }
  return cleanRoot.innerHTML;
};
var parseAttributes = (source) => {
  const attributes = [];
  const pattern = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of source.matchAll(pattern)) {
    const name = match[1]?.toLowerCase();
    if (!name) {
      continue;
    }
    attributes.push({
      name,
      value: match[2] ?? match[3] ?? match[4] ?? ""
    });
  }
  return attributes;
};
var sanitizeWithoutDomParser = (html) => {
  let output = "";
  let cursor = 0;
  const tagPattern = /<\s*(\/)?\s*([a-z][a-z0-9-]*)([^>]*)>/gi;
  for (const match of html.matchAll(tagPattern)) {
    const index = match.index ?? 0;
    const [rawTag, closingSlash, rawTagName, rawAttributes = ""] = match;
    const tagName = rawTagName.toLowerCase();
    output += escapeHtml(html.slice(cursor, index));
    cursor = index + rawTag.length;
    if (!allowedTags.has(tagName)) {
      continue;
    }
    if (closingSlash) {
      if (tagName !== "br") {
        output += `</${tagName}>`;
      }
      continue;
    }
    const allowedAttributes = allowedAttributesByTag[tagName] ?? /* @__PURE__ */ new Set();
    const cleanAttributes = [];
    for (const attribute of parseAttributes(rawAttributes)) {
      if (attribute.name.startsWith("on")) {
        continue;
      }
      if (!allowedGlobalAttributes.has(attribute.name) && !allowedAttributes.has(attribute.name)) {
        continue;
      }
      const value = sanitizeAttributeValue(
        tagName,
        attribute.name,
        attribute.value
      );
      if (value !== null) {
        cleanAttributes.push(`${attribute.name}="${escapeAttribute(value)}"`);
      }
    }
    if (tagName === "a" && !cleanAttributes.some((item) => item.startsWith("rel="))) {
      cleanAttributes.push(`rel="noopener noreferrer"`);
    }
    output += `<${tagName}${cleanAttributes.length ? ` ${cleanAttributes.join(" ")}` : ""}>`;
  }
  output += escapeHtml(html.slice(cursor));
  return output;
};
var sanitizePhotonRichTextHtml = (value) => {
  if (typeof DOMParser === "undefined") {
    return sanitizeWithoutDomParser(value);
  }
  return sanitizeWithDomParser(value);
};
var renderPhotonRichTextHtml = (value, placeholder) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return `<p>${escapeHtml(placeholder)}</p>`;
  }
  if (!trimmed.startsWith("<")) {
    return `<p>${escapeHtml(trimmed)}</p>`;
  }
  return sanitizePhotonRichTextHtml(trimmed);
};

// src/components/public/public-editable-rich-text.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var richTextContentClassName = "text-[var(--photon-site-text)] [&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--photon-site-border)] [&_blockquote]:pl-4 [&_blockquote]:text-[var(--photon-site-muted-text)] [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.04em] [&_h2]:text-[var(--photon-site-text)] [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-[-0.03em] [&_h3]:text-[var(--photon-site-text)] [&_li]:text-[var(--photon-site-text)] [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:leading-8 [&_p]:text-[var(--photon-site-text)] [&_p+p]:mt-4 [&_strong]:font-semibold [&_strong]:text-[var(--photon-site-text)] [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5";
var EditableRichText = ({
  blockId,
  path,
  className,
  placeholder = PHOTON_EMPTY_TEXT
}) => {
  const canEdit = usePhotonCanEdit();
  const value = String(usePhotonFieldValue(blockId, path) ?? "");
  const [EditableRichTextEditor, setEditableRichTextEditor] = useState2(null);
  useEffect2(() => {
    if (!canEdit || EditableRichTextEditor) {
      return;
    }
    let cancelled = false;
    const loadEditor = getPhotonEditableEditorLoader("richText");
    if (!loadEditor) {
      return;
    }
    void loadEditor().then((component) => {
      if (!cancelled) {
        setEditableRichTextEditor(
          () => component
        );
      }
    });
    return () => {
      cancelled = true;
    };
  }, [canEdit, EditableRichTextEditor]);
  if (canEdit && EditableRichTextEditor) {
    return /* @__PURE__ */ jsx3(
      EditableRichTextEditor,
      {
        blockId,
        path,
        className,
        placeholder
      }
    );
  }
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-photon-search-target": buildPhotonSearchTargetId(blockId, path),
      children: /* @__PURE__ */ jsx3(
        "div",
        {
          className: clsx2(
            richTextContentClassName,
            className,
            !value && "text-[color:var(--photon-site-muted)] opacity-60"
          ),
          dangerouslySetInnerHTML: {
            __html: renderPhotonRichTextHtml(value, placeholder)
          }
        }
      )
    }
  );
};

// src/modules/system-public.tsx
import clsx3 from "clsx";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
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
  const framelessSurface = isPhotonPublicFramelessSiteDesign(siteDesign);
  const stickyPreviewEnabled = mode !== "builder";
  return /* @__PURE__ */ jsxs2(
    "section",
    {
      className: clsx3(
        "min-w-0 px-6 py-8 sm:px-8 sm:py-10",
        framelessSurface ? "rounded-none border-0 bg-transparent text-[var(--photon-site-text)] shadow-none" : "rounded-[38px] border shadow-[0_28px_90px_rgba(2,12,27,0.16)]",
        !framelessSurface && surface
      ),
      style: framelessSurface ? getPhotonSurfaceModeStyle("bleed") : void 0,
      children: [
        /* @__PURE__ */ jsxs2("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx4(EditableText, { blockId: block.id, path: "eyebrow" }),
          /* @__PURE__ */ jsx4(EditableText, { blockId: block.id, path: "title", as: "h2" }),
          /* @__PURE__ */ jsx4(EditableTextarea, { blockId: block.id, path: "body" })
        ] }),
        /* @__PURE__ */ jsx4(
          "div",
          {
            className: "mt-8 grid grid-cols-1 items-start gap-[var(--photon-layout-gap)] lg:[grid-template-columns:var(--photon-layout-columns)]",
            style: {
              "--photon-layout-columns": templateColumns || "minmax(0,1fr)",
              "--photon-layout-gap": `${block.props.gap || 24}px`
            },
            children: areas.map((area, index) => {
              const column = getColumnConfig(columns, area, index);
              return /* @__PURE__ */ jsxs2(
                "div",
                {
                  className: clsx3(
                    "min-w-0",
                    column.sticky && stickyPreviewEnabled && "lg:sticky lg:self-start"
                  ),
                  style: column.sticky && stickyPreviewEnabled ? {
                    top: "calc(var(--photon-dock-offset, 0px) + var(--photon-site-header-offset, 0px) + var(--photon-site-header-height, 0px) + 0.75rem)"
                  } : void 0,
                  children: [
                    column.label?.trim() ? /* @__PURE__ */ jsx4("div", { className: "mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]", children: column.label }) : null,
                    renderArea ? renderArea(area, index) : null
                  ]
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
    localization: "shared"
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
var photonPublicSystemModule = {
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
        { id: "primary", label: "Primary rail", blocks: [] },
        { id: "secondary", label: "Content stack", blocks: [] }
      ],
      fields: splitLayoutFields,
      component: SplitLayout
    })
  ]
};
var photonPublicSystemKit = createPhotonKit({
  key: "photon-system",
  label: "Photon System",
  modules: [photonPublicSystemModule]
});

// src/public.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var PhotonPublicBlockItem = ({
  block
}) => {
  const renderDepth = usePhotonRenderDepth();
  return /* @__PURE__ */ jsx5(
    PhotonBlockRenderer,
    {
      block,
      renderArea: (area) => /* @__PURE__ */ jsx5(PhotonRenderDepthProvider, { value: renderDepth + 1, children: /* @__PURE__ */ jsx5(PhotonPublicBlockList, { blocks: area.blocks }) })
    }
  );
};
var PhotonPublicBlockList = ({
  blocks
}) => /* @__PURE__ */ jsx5("div", { className: "space-y-[var(--photon-list-gap,0.75rem)]", children: blocks.map((block) => /* @__PURE__ */ jsx5(PhotonPublicBlockItem, { block }, block.id)) });
var PhotonPublicSurfaceRegion = ({
  region,
  page
}) => {
  const sectionRef = useRef(null);
  const [surfaceWidth, setSurfaceWidth] = useState3(0);
  const blocks = getPhotonSurfaceRegionBlocks(
    page.document,
    region.key
  );
  const isPageRegion = region.key === PHOTON_PAGE_SURFACE_REGION_KEY;
  const stickySiteHeaderRegion = region.key === "header" && (blocks ?? []).some(
    (block) => block.module === "photon-system" && block.type === "site-header-shell" && block.props.sticky === true
  );
  useEffect3(() => {
    const element = sectionRef.current;
    if (!element || typeof ResizeObserver === "undefined") {
      return;
    }
    const sync = () => setSurfaceWidth(Math.round(element.clientWidth));
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsx5(
    PhotonSurfaceLayoutProvider,
    {
      value: {
        builderEnabled: false,
        kind: region.kind,
        regionKey: region.key,
        width: surfaceWidth
      },
      children: /* @__PURE__ */ jsx5(
        "section",
        {
          ref: sectionRef,
          "data-photon-surface-region": region.key,
          className: clsx4(
            "relative [container-type:inline-size]",
            stickySiteHeaderRegion && "sticky z-40"
          ),
          style: stickySiteHeaderRegion ? {
            top: "var(--photon-site-header-offset, 0px)"
          } : void 0,
          children: /* @__PURE__ */ jsx5(
            "div",
            {
              className: isPageRegion ? "mx-auto w-full max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] px-[var(--photon-site-gutter,24px)]" : "w-full",
              style: isPageRegion ? {
                "--photon-list-gap": "var(--photon-section-gap,2rem)"
              } : void 0,
              children: /* @__PURE__ */ jsx5(PhotonPublicBlockList, { blocks: blocks ?? [] })
            }
          )
        }
      )
    }
  );
};
var PhotonPublicSurface = memo(function PhotonPublicSurface2({
  page
}) {
  const regions = resolvePhotonSurfaceRegionDescriptors(page.site);
  return /* @__PURE__ */ jsx5("div", { className: "space-y-[var(--photon-section-gap,2rem)]", children: regions.map((region) => /* @__PURE__ */ jsx5(
    PhotonPublicSurfaceRegion,
    {
      region,
      page
    },
    region.key
  )) });
});
var PhotonPublicPage = ({
  page,
  registry,
  i18n,
  linkComponent,
  siteFrameExtensions,
  accountTabs,
  requestAuth,
  searchSite,
  activeSearchHighlight = null
}) => {
  const designSettings = resolvePhotonPublicSiteDesignSettings(
    page.site.settings.design
  );
  const siteSurfaceStyle = {
    "--photon-site-body-font": designSettings.bodyFontFamily,
    "--photon-site-heading-font": designSettings.headingFontFamily,
    "--photon-site-background": designSettings.backgroundColor,
    "--photon-site-surface": designSettings.surfaceColor,
    "--photon-site-text": designSettings.textColor,
    "--photon-site-muted": designSettings.mutedTextColor,
    "--photon-site-muted-text": designSettings.mutedTextColor,
    "--photon-site-accent": designSettings.accentColor,
    "--photon-site-border": designSettings.borderColor,
    "--photon-site-max-width": designSettings.siteMaxWidth,
    "--photon-site-gutter": designSettings.pageGutter,
    "--photon-section-gap": designSettings.sectionGap,
    "--photon-site-radius": designSettings.radius,
    "--photon-site-header-offset": designSettings.headerOffset,
    backgroundColor: designSettings.backgroundColor,
    color: designSettings.textColor,
    fontFamily: designSettings.bodyFontFamily
  };
  return /* @__PURE__ */ jsxs3(
    PhotonProvider,
    {
      initialDocument: page.document,
      initialResources: page.resources,
      initialPageSettings: page.pageSettings,
      initialSite: page.site,
      registry,
      initialMode: "preview",
      isAdmin: false,
      linkComponent,
      siteFrameExtensions,
      accountTabs,
      requestAuth,
      searchSite,
      i18n,
      children: [
        /* @__PURE__ */ jsx5(
          PhotonSearchHighlightEffect,
          {
            activeHighlight: activeSearchHighlight
          }
        ),
        /* @__PURE__ */ jsx5(
          "main",
          {
            className: "min-h-screen min-w-0 px-0 transition-colors duration-500",
            style: siteSurfaceStyle,
            "data-testid": "photon-public-runtime",
            children: /* @__PURE__ */ jsx5(PhotonPublicSurface, { page })
          }
        )
      ]
    }
  );
};
export {
  EditableGallery,
  EditableImage,
  EditableRepeaterValue,
  EditableRichText,
  EditableText,
  EditableTextarea,
  PHOTON_SEARCH_OCCURRENCE_PARAM,
  PHOTON_SEARCH_QUERY_PARAM,
  PHOTON_SEARCH_TARGET_PARAM,
  PhotonLink,
  PhotonPublicPage,
  PhotonSiteSearch,
  createPhotonAccountTabExtension,
  createPhotonBlockLocalizationSchema,
  createPhotonKit,
  createPhotonLocalizedDefault,
  createPhotonRuntime,
  createPhotonSiteFrameExtension,
  definePhotonBlockDefinition,
  getPhotonAnchorRel,
  getPhotonSurfaceModeStyle,
  photonPublicSystemKit as photonSystemKit,
  photonPublicSystemModule as photonSystemModule,
  renderPhotonRichTextHtml,
  resolvePhotonAccountTabs,
  sanitizePhotonLinkHref,
  sanitizePhotonRichTextHtml,
  usePhoton,
  usePhotonCanEdit,
  usePhotonI18n,
  usePhotonRenderDepth,
  usePhotonStore,
  usePhotonFieldValue as usePhotonValueAtPath
};
