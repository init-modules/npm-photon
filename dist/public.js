"use client";
import {
  EditableImage,
  EditableTextarea,
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
  normalizePhotonSiteStringItems,
  resolvePhotonPublicSiteDesignSettings
} from "./chunk-GVYQNPDL.js";
import {
  PhotonRenderDepthProvider,
  PhotonSearchHighlightEffect,
  PhotonSurfaceLayoutProvider,
  usePhotonRenderDepth
} from "./chunk-3BZZZBLC.js";
import {
  EditableText,
  PhotonLink,
  PhotonProvider,
  getPhotonEditableEditorLoader,
  usePhoton,
  usePhotonCanEdit,
  usePhotonFieldValue,
  usePhotonStore
} from "./chunk-OWLYGTJF.js";
import {
  buildPhotonSearchTargetId
} from "./chunk-FRFYYFDJ.js";
import {
  createPhotonRuntime
} from "./chunk-TSSJCQJA.js";
import "./chunk-IOB5G6YT.js";
import {
  PHOTON_SEARCH_OCCURRENCE_PARAM,
  PHOTON_SEARCH_QUERY_PARAM,
  PHOTON_SEARCH_TARGET_PARAM
} from "./chunk-CZ47CC3D.js";
import {
  resolvePhotonMediaPreviewUrl
} from "./chunk-QQDDM7OM.js";
import {
  usePhotonI18n
} from "./chunk-NV6FZ3PQ.js";
import {
  PHOTON_PAGE_SURFACE_REGION_KEY,
  createPhotonBlockLocalizationSchema,
  createPhotonKit,
  createPhotonLocalizedDefault,
  definePhotonBlockDefinition,
  getPhotonSurfaceRegionBlocks,
  resolvePhotonSurfaceRegionDescriptors
} from "./chunk-YNXZBS6V.js";
import {
  getPhotonAnchorRel,
  sanitizePhotonLinkHref
} from "./chunk-V7CN23YR.js";
import "./chunk-U2HNHTED.js";
import {
  PHOTON_EMPTY_TEXT
} from "./chunk-KAITZE7U.js";

// src/public.tsx
import clsx6 from "clsx";
import { memo, useEffect as useEffect4, useRef as useRef2, useState as useState4 } from "react";

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
              style: {
                color: "var(--photon-gallery-label, rgba(255,255,255,0.54))"
              },
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
  return /* @__PURE__ */ jsx3("div", { "data-photon-search-target": buildPhotonSearchTargetId(blockId, path), children: /* @__PURE__ */ jsx3(
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
  ) });
};

// src/helpers/public-site-frame-extensions.ts
var normalizeOrder = (value) => typeof value === "number" && Number.isFinite(value) ? value : 0;
var byOrderThenLabel = (left, right) => normalizeOrder(left.order) - normalizeOrder(right.order) || (left.label ?? left.title ?? "").localeCompare(
  right.label ?? right.title ?? ""
);
var isEnabled = (value) => value.enabled !== false;
var isNotDisabled = (id, disabledIds) => !id || !disabledIds.has(id);
var createPhotonPublicSiteFrameExtension = (extension) => extension;
var createPhotonPublicAccountTabExtension = (tab) => tab;
var resolvePhotonPublicSiteFrameExtensions = (extensions, disabledExtensionIds = []) => {
  const disabledIds = new Set(disabledExtensionIds);
  return [...extensions ?? []].filter(
    (extension) => isEnabled(extension) && !disabledIds.has(extension.id)
  ).sort(byOrderThenLabel);
};
var resolvePhotonPublicAccountTabs = (tabs, disabledTabIds = []) => {
  const disabledIds = new Set(disabledTabIds);
  return [...tabs ?? []].filter((tab) => isEnabled(tab) && !disabledIds.has(tab.id)).sort(byOrderThenLabel);
};
var collectPhotonPublicHeaderExtensionItems = (extensions, disabledItemIds = []) => {
  const disabledIds = new Set(disabledItemIds);
  return {
    utilityLinks: extensions.flatMap((extension) => extension.header?.utilityLinks ?? []).filter((item) => isEnabled(item) && isNotDisabled(item.id, disabledIds)).sort(byOrderThenLabel),
    categoryLinks: extensions.flatMap((extension) => extension.header?.categoryLinks ?? []).filter((item) => isEnabled(item) && isNotDisabled(item.id, disabledIds)).sort(byOrderThenLabel),
    actions: extensions.flatMap((extension) => extension.header?.actions ?? []).filter((item) => isEnabled(item) && isNotDisabled(item.id, disabledIds)).sort(byOrderThenLabel)
  };
};
var collectPhotonPublicFooterExtensionItems = (extensions, disabledItemIds = []) => {
  const disabledIds = new Set(disabledItemIds);
  return {
    navigationColumns: extensions.flatMap((extension) => extension.footer?.navigationColumns ?? []).filter((item) => isEnabled(item) && isNotDisabled(item.id, disabledIds)).map((column) => ({
      ...column,
      links: column.links.filter(
        (item) => isEnabled(item) && isNotDisabled(item.id, disabledIds)
      ).sort(byOrderThenLabel)
    })).sort(byOrderThenLabel),
    legalLinks: extensions.flatMap((extension) => extension.footer?.legalLinks ?? []).filter((item) => isEnabled(item) && isNotDisabled(item.id, disabledIds)).sort(byOrderThenLabel)
  };
};

// src/helpers/public-surface-layout.ts
var getPhotonPublicSurfaceModeStyle = (mode) => {
  switch (mode) {
    case "bleed":
      return {
        marginInline: "calc(50% - 50cqw)",
        paddingInline: "max(calc((100cqw - var(--photon-site-max-width, 1280px)) / 2), var(--photon-site-gutter, 24px))"
      };
    case "full-viewport":
      return {
        marginInline: "calc(50% - 50cqw)"
      };
    default:
      return void 0;
  }
};

// src/modules/system-public.tsx
import clsx5 from "clsx";

// src/modules/system/site/site-footer-shell-public-definition.tsx
import clsx3 from "clsx";
import { ArrowRight, Send } from "lucide-react";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
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
  const footerExtensionItems = collectPhotonPublicFooterExtensionItems(
    resolvePhotonPublicSiteFrameExtensions(
      siteFrameExtensions,
      disabledExtensionIds
    ),
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
  return /* @__PURE__ */ jsx4(
    "footer",
    {
      className: clsx3(
        "w-full transition-colors duration-300",
        (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).shell
      ),
      children: /* @__PURE__ */ jsxs2("div", { className: "mx-auto flex w-full max-w-[var(--photon-site-max-width,1280px)] flex-col gap-5 px-[var(--photon-site-gutter,24px)] py-8 pb-12 sm:py-10 sm:pb-14", children: [
        /* @__PURE__ */ jsxs2("div", { className: "grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]", children: [
          /* @__PURE__ */ jsx4(
            "div",
            {
              className: clsx3(
                footerVariant === "minimal-air" ? "rounded-none border-0 border-b border-[var(--photon-site-border)] px-0 pb-6 pt-0 sm:px-0" : "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: /* @__PURE__ */ jsxs2("div", { className: "grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)]", children: [
                /* @__PURE__ */ jsx4("div", { className: "relative h-24 w-24 overflow-hidden rounded-[28px] border border-[var(--photon-site-border)] bg-[linear-gradient(180deg,rgba(15,118,110,0.16),rgba(15,118,110,0.04))]", children: block.props.logoImage ? /* @__PURE__ */ jsx4(
                  EditableImage,
                  {
                    blockId: block.id,
                    path: "logoImage",
                    className: "h-full w-full rounded-[28px]",
                    imageClassName: "h-full w-full object-contain p-3",
                    fallbackAlt: block.props.brandTitle
                  }
                ) : /* @__PURE__ */ jsx4("div", { className: "flex h-full items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--photon-site-accent)]", children: /* @__PURE__ */ jsx4(
                  EditableText,
                  {
                    blockId: block.id,
                    path: "brandTitle",
                    className: "text-[var(--photon-site-accent)]"
                  }
                ) }) }),
                /* @__PURE__ */ jsxs2("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx4(
                    EditableText,
                    {
                      blockId: block.id,
                      path: "brandTitle",
                      as: "h2",
                      className: clsx3(
                        "[font-family:var(--photon-site-heading-font)] text-3xl font-semibold tracking-[-0.05em]",
                        variant.text
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx4(
                    EditableTextarea,
                    {
                      blockId: block.id,
                      path: "brandBody",
                      className: clsx3("mt-4 leading-7", variant.muted)
                    }
                  )
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs2(
            "div",
            {
              className: clsx3(
                footerVariant === "minimal-air" ? "rounded-none border-0 px-0 py-0 sm:px-0" : "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                block.props.variant === "soft-cards" && !framelessSite ? "border-transparent bg-[linear-gradient(135deg,var(--photon-site-accent),color-mix(in srgb,var(--photon-site-accent) 72%, white))] text-white shadow-[0_28px_60px_rgba(15,118,110,0.24)]" : (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: [
                /* @__PURE__ */ jsxs2("div", { className: "max-w-xl", children: [
                  /* @__PURE__ */ jsx4(
                    EditableText,
                    {
                      blockId: block.id,
                      path: "subscriptionTitle",
                      as: "h3",
                      className: "[font-family:var(--photon-site-heading-font)] text-2xl font-semibold tracking-[-0.04em]"
                    }
                  ),
                  /* @__PURE__ */ jsx4(
                    EditableTextarea,
                    {
                      blockId: block.id,
                      path: "subscriptionBody",
                      className: clsx3(
                        "mt-3 leading-7",
                        isSoftCardsVariant ? "text-white/82" : variant.muted
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs2("div", { className: "mt-5 flex flex-col gap-3 sm:flex-row", children: [
                  /* @__PURE__ */ jsx4(
                    "div",
                    {
                      className: clsx3(
                        "flex min-h-14 flex-1 items-center px-4",
                        footerVariant === "minimal-air" ? "rounded-full border border-[var(--photon-site-border)] bg-white/72" : "rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
                      ),
                      children: /* @__PURE__ */ jsx4(
                        EditableText,
                        {
                          blockId: block.id,
                          path: "subscriptionPlaceholder",
                          className: clsx3(
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
                      className: clsx3(
                        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-[0_18px_34px_rgba(15,23,42,0.12)]",
                        isSoftCardsVariant ? "bg-white text-[var(--photon-site-accent)]" : "bg-[var(--photon-site-accent)] text-white"
                      ),
                      children: [
                        /* @__PURE__ */ jsx4(Send, { className: "h-4 w-4" }),
                        /* @__PURE__ */ jsx4(
                          EditableText,
                          {
                            blockId: block.id,
                            path: "subscriptionButtonLabel",
                            className: clsx3(
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
          /* @__PURE__ */ jsx4(
            "div",
            {
              className: clsx3(
                footerVariant === "minimal-air" ? "rounded-none border-0 border-b border-[var(--photon-site-border)] px-0 pb-6 pt-0 sm:px-0" : "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: /* @__PURE__ */ jsx4("div", { className: "grid gap-6 md:grid-cols-2", children: navigationColumns.map((column) => /* @__PURE__ */ jsxs2("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx4("div", { className: clsx3("text-sm font-semibold", variant.text), children: column.title }),
                /* @__PURE__ */ jsx4("div", { className: "space-y-2", children: column.links.map((link) => /* @__PURE__ */ jsx4(
                  PhotonLink,
                  {
                    href: link.href,
                    className: clsx3(
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
              className: clsx3(
                footerVariant === "minimal-air" ? "rounded-none border-0 px-0 pt-0 sm:px-0" : "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: [
                /* @__PURE__ */ jsx4("div", { className: clsx3("text-sm font-semibold", variant.text), children: "Contacts" }),
                /* @__PURE__ */ jsx4("div", { className: "mt-4 space-y-3", children: contactItems.map((item) => /* @__PURE__ */ jsx4(
                  "div",
                  {
                    className: clsx3("text-sm leading-7", variant.muted),
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
            className: clsx3(
              "flex flex-col gap-4 border-t pt-5 text-sm md:flex-row md:items-center md:justify-between",
              footerVariant === "classic-dark" ? "border-white/10" : "border-[var(--photon-site-border)]"
            ),
            children: [
              /* @__PURE__ */ jsx4(
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
                    className: clsx3(
                      "inline-flex items-center gap-2 transition hover:text-[var(--photon-site-accent)]",
                      (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).muted
                    ),
                    children: [
                      /* @__PURE__ */ jsx4(EditableText, { blockId: block.id, path: "legalLabel" }),
                      /* @__PURE__ */ jsx4(ArrowRight, { className: "h-4 w-4" })
                    ]
                  }
                ),
                legalLinks.map((link) => /* @__PURE__ */ jsxs2(
                  PhotonLink,
                  {
                    href: link.href,
                    target: link.target,
                    rel: link.rel,
                    className: clsx3(
                      "inline-flex items-center gap-2 transition hover:text-[var(--photon-site-accent)]",
                      (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).muted
                    ),
                    children: [
                      link.label,
                      /* @__PURE__ */ jsx4(ArrowRight, { className: "h-4 w-4" })
                    ]
                  },
                  `${link.label}:${link.href}`
                )),
                /* @__PURE__ */ jsx4(
                  PhotonLink,
                  {
                    href: block.props.developerHref,
                    className: clsx3(
                      "font-semibold transition hover:text-[var(--photon-site-accent)]",
                      (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).text
                    ),
                    children: /* @__PURE__ */ jsx4(EditableText, { blockId: block.id, path: "developerLabel" })
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

// src/modules/system/site/site-header-shell-public-definition.tsx
import clsx4 from "clsx";
import { ArrowRight as ArrowRight2, CircleUserRound, LogIn, ShoppingCart } from "lucide-react";
import { useEffect as useEffect3, useRef, useState as useState3 } from "react";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
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
  const [isCompact, setIsCompact] = useState3(false);
  const headerRef = useRef(null);
  const disabledExtensionIds = normalizePhotonSiteStringItems(
    block.props.disabledExtensionIds
  );
  const disabledExtensionItemIds = normalizePhotonSiteStringItems(
    block.props.disabledExtensionItemIds
  );
  const headerExtensionItems = collectPhotonPublicHeaderExtensionItems(
    resolvePhotonPublicSiteFrameExtensions(
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
  const [cartQuantity, setCartQuantity] = useState3(
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
      className: clsx4(
        "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--photon-site-border)] text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
        className
      ),
      children: [
        /* @__PURE__ */ jsx5(ShoppingCart, { className: "h-5 w-5" }),
        cartQuantity > 0 ? /* @__PURE__ */ jsx5("span", { className: "absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--photon-site-accent)] px-1 text-[10px] font-bold leading-none text-white", children: cartQuantity > 99 ? "99+" : cartQuantity }) : null
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
    return /* @__PURE__ */ jsx5(
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
    const className = clsx4(
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
              /* @__PURE__ */ jsx5(CircleUserRound, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx5("span", { children: action.authenticatedLabel ?? action.label })
            ]
          },
          action.id ?? `${action.authenticatedLabel ?? action.label}:${authenticatedHref}`
        );
      }
      return /* @__PURE__ */ jsx5(
        "button",
        {
          type: "button",
          onClick: requestAuth,
          className: clsx4(className, "cursor-pointer"),
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
  useEffect3(() => {
    if (typeof window === "undefined" || !block.props.compactOnScroll || !liveSurfaceMode) {
      setIsCompact(false);
      return;
    }
    const sync = () => setIsCompact(window.scrollY > 36);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, [block.props.compactOnScroll, liveSurfaceMode]);
  useEffect3(() => {
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
  useEffect3(() => {
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
  return /* @__PURE__ */ jsx5(
    "header",
    {
      ref: headerRef,
      className: clsx4(
        "relative",
        liveSurfaceMode && "z-40",
        isShowcaseCard ? "pt-[var(--photon-site-gutter,24px)]" : "pt-0"
      ),
      children: /* @__PURE__ */ jsxs3(
        "div",
        {
          className: clsx4(
            "border-b border-[var(--photon-site-border)] text-[var(--photon-site-text)] transition-[box-shadow,background-color,border-radius] duration-300",
            framelessSite ? clsx4(
              "rounded-none border-x-0 border-t-0 bg-[color-mix(in_srgb,var(--photon-site-surface)_92%,white)] shadow-none",
              block.props.sticky && compact && "bg-[color-mix(in_srgb,var(--photon-site-surface)_96%,white)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            ) : isShowcaseCard ? "mx-auto max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] rounded-[calc(var(--photon-site-radius,24px)+10px)] border shadow-[0_28px_70px_rgba(15,23,42,0.08)]" : clsx4(
              "rounded-none border-x-0 border-t-0 bg-[var(--photon-site-surface)] shadow-[0_18px_40px_rgba(15,23,42,0.06)]",
              block.props.sticky && compact && "shadow-[0_20px_54px_rgba(15,23,42,0.12)]"
            )
          ),
          children: [
            /* @__PURE__ */ jsx5(
              "div",
              {
                className: clsx4(
                  "mx-auto w-full max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] transition-[padding,gap] duration-300",
                  framelessSite ? compact ? "px-[var(--photon-site-gutter,24px)] py-3" : "px-[var(--photon-site-gutter,24px)] py-4" : isShowcaseCard ? compact ? "px-4 py-3" : "px-5 py-4 sm:px-6" : compact ? "px-[var(--photon-site-gutter,24px)] py-3" : "px-[var(--photon-site-gutter,24px)] py-4"
                ),
                children: /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-4", children: [
                  /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [
                    /* @__PURE__ */ jsx5("div", { className: "flex flex-wrap items-center gap-3 text-sm text-[var(--photon-site-muted)]", children: utilityLinks.map(
                      (link) => renderSmartLink(
                        link,
                        clsx4(
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
                            /* @__PURE__ */ jsx5("div", { className: "px-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--photon-site-muted)]", children: translate("photon.localeSwitcher.label", "Language") }),
                            publicLocales.map((item) => /* @__PURE__ */ jsx5(
                              PhotonLink,
                              {
                                href: currentRoute,
                                locale: item.code,
                                "data-photon-locale-option": item.code,
                                className: clsx4(
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
                      /* @__PURE__ */ jsx5(
                        EditableText,
                        {
                          blockId: block.id,
                          path: "contactCaption",
                          className: "text-[var(--photon-site-muted)]"
                        }
                      ),
                      /* @__PURE__ */ jsx5(
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
                      className: clsx4(
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
                              /* @__PURE__ */ jsx5("div", { className: "relative h-16 w-16 overflow-hidden rounded-[22px] border border-[var(--photon-site-border)] bg-[linear-gradient(180deg,rgba(15,118,110,0.14),rgba(15,118,110,0.03))]", children: block.props.logoImage ? /* @__PURE__ */ jsx5(
                                EditableImage,
                                {
                                  blockId: block.id,
                                  path: "logoImage",
                                  className: "h-full w-full rounded-[22px]",
                                  imageClassName: "h-full w-full object-contain p-2",
                                  fallbackAlt: block.props.brandLabel
                                }
                              ) : /* @__PURE__ */ jsx5("div", { className: "flex h-full items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--photon-site-accent)]", children: /* @__PURE__ */ jsx5(
                                EditableText,
                                {
                                  blockId: block.id,
                                  path: "brandLabel",
                                  className: "text-[var(--photon-site-accent)]"
                                }
                              ) }) }),
                              /* @__PURE__ */ jsxs3("div", { className: "min-w-0", children: [
                                /* @__PURE__ */ jsx5(
                                  EditableText,
                                  {
                                    blockId: block.id,
                                    path: "brandLabel",
                                    as: "div",
                                    className: "[font-family:var(--photon-site-heading-font)] text-2xl font-semibold tracking-[-0.04em]"
                                  }
                                ),
                                isShowcaseCard ? /* @__PURE__ */ jsx5("div", { className: "mt-1 text-xs uppercase tracking-[0.24em] text-[var(--photon-site-muted)]", children: "Live site frame" }) : null
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
                              /* @__PURE__ */ jsx5("div", { className: "h-2.5 w-2.5 rounded-full bg-[var(--photon-site-accent)]" }),
                              /* @__PURE__ */ jsx5(
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
                        /* @__PURE__ */ jsx5(
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
                          ) : /* @__PURE__ */ jsx5(
                            PhotonLink,
                            {
                              href: block.props.secondaryCtaHref,
                              className: "inline-flex items-center gap-2 rounded-full border border-[var(--photon-site-border)] px-4 py-3 text-sm font-semibold text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
                              children: /* @__PURE__ */ jsx5(
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
                                /* @__PURE__ */ jsx5(
                                  EditableText,
                                  {
                                    blockId: block.id,
                                    path: "primaryCtaLabel",
                                    className: "font-semibold text-white"
                                  }
                                ),
                                /* @__PURE__ */ jsx5(ArrowRight2, { className: "h-4 w-4" })
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
                                /* @__PURE__ */ jsx5(LogIn, { className: "h-4 w-4" }),
                                /* @__PURE__ */ jsx5(
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
            categoryLinks.length > 0 ? /* @__PURE__ */ jsx5(
              "div",
              {
                className: clsx4(
                  "border-t border-[var(--photon-site-border)]",
                  framelessSite && "bg-transparent"
                ),
                children: /* @__PURE__ */ jsx5("div", { className: "mx-auto w-full max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] px-[var(--photon-site-gutter,24px)] py-4", children: /* @__PURE__ */ jsx5("div", { className: "flex flex-wrap gap-2", children: categoryLinks.map(
                  (link) => renderSmartLink(
                    link,
                    clsx4(
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

// src/modules/system-public.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var surfaceStyles = {
  glass: "border-white/10 bg-[linear-gradient(180deg,rgba(7,17,31,0.85),rgba(8,21,38,0.7))] text-white",
  bright: "border-slate-200 bg-[linear-gradient(180deg,#f7f9fc_0%,#eef3fb_100%)] text-slate-950",
  ink: "border-cyan-300/14 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.11),transparent_24%),linear-gradient(180deg,#08111e_0%,#050912_100%)] text-white"
};
var getColumnConfig = (columns, area, _index) => columns.find((column) => column.areaId === area.id) ?? {
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
  const siteDesign = usePhotonStore((state) => state.site.settings.design);
  const columns = block.props.columns ?? [];
  const areas = block.areas ?? [];
  const templateColumns = areas.map((area, index) => getColumnConfig(columns, area, index).width).join(" ");
  const surface = surfaceStyles[block.props.surface] ?? surfaceStyles.glass;
  const framelessSurface = isPhotonPublicFramelessSiteDesign(siteDesign);
  const stickyPreviewEnabled = mode !== "builder";
  return /* @__PURE__ */ jsxs4(
    "section",
    {
      className: clsx5(
        "min-w-0 px-6 py-8 sm:px-8 sm:py-10",
        framelessSurface ? "rounded-none border-0 bg-transparent text-[var(--photon-site-text)] shadow-none" : "rounded-[38px] border shadow-[0_28px_90px_rgba(2,12,27,0.16)]",
        !framelessSurface && surface
      ),
      style: framelessSurface ? getPhotonPublicSurfaceModeStyle("bleed") : void 0,
      children: [
        /* @__PURE__ */ jsxs4("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx6(EditableText, { blockId: block.id, path: "eyebrow" }),
          /* @__PURE__ */ jsx6(EditableText, { blockId: block.id, path: "title", as: "h2" }),
          /* @__PURE__ */ jsx6(EditableTextarea, { blockId: block.id, path: "body" })
        ] }),
        /* @__PURE__ */ jsx6(
          "div",
          {
            className: "mt-8 grid grid-cols-1 items-start gap-[var(--photon-layout-gap)] lg:[grid-template-columns:var(--photon-layout-columns)]",
            style: {
              "--photon-layout-columns": templateColumns || "minmax(0,1fr)",
              "--photon-layout-gap": `${block.props.gap || 24}px`
            },
            children: areas.map((area, index) => {
              const column = getColumnConfig(columns, area, index);
              return /* @__PURE__ */ jsxs4(
                "div",
                {
                  className: clsx5(
                    "min-w-0",
                    column.sticky && stickyPreviewEnabled && "lg:sticky lg:self-start"
                  ),
                  style: column.sticky && stickyPreviewEnabled ? {
                    top: "calc(var(--photon-dock-offset, 0px) + var(--photon-site-header-offset, 0px) + var(--photon-site-header-height, 0px) + 0.75rem)"
                  } : void 0,
                  children: [
                    column.label?.trim() ? /* @__PURE__ */ jsx6("div", { className: "mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]", children: column.label }) : null,
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
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var PhotonPublicBlockItem = ({ block }) => {
  const renderDepth = usePhotonRenderDepth();
  const registry = usePhotonStore((state) => state.registry);
  const definition = registry.getDefinition(block.module, block.type);
  if (!definition) {
    return /* @__PURE__ */ jsxs5("div", { className: "rounded-[28px] border border-rose-400/30 bg-rose-500/10 p-6 text-sm text-rose-100", children: [
      "Unknown block: ",
      block.module,
      "/",
      block.type
    ] });
  }
  const Component = definition.component;
  return /* @__PURE__ */ jsx7(
    Component,
    {
      block,
      renderArea: (area) => /* @__PURE__ */ jsx7(PhotonRenderDepthProvider, { value: renderDepth + 1, children: /* @__PURE__ */ jsx7(PhotonPublicBlockList, { blocks: area.blocks }) })
    }
  );
};
var PhotonPublicBlockList = ({ blocks }) => /* @__PURE__ */ jsx7("div", { className: "space-y-[var(--photon-list-gap,0.75rem)]", children: blocks.map((block) => /* @__PURE__ */ jsx7(PhotonPublicBlockItem, { block }, block.id)) });
var PhotonPublicSurfaceRegion = ({
  region,
  page
}) => {
  const sectionRef = useRef2(null);
  const [surfaceWidth, setSurfaceWidth] = useState4(0);
  const blocks = getPhotonSurfaceRegionBlocks(page.document, region.key);
  const isPageRegion = region.key === PHOTON_PAGE_SURFACE_REGION_KEY;
  const stickySiteHeaderRegion = region.key === "header" && (blocks ?? []).some(
    (block) => block.module === "photon-system" && block.type === "site-header-shell" && block.props.sticky === true
  );
  useEffect4(() => {
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
  return /* @__PURE__ */ jsx7(
    PhotonSurfaceLayoutProvider,
    {
      value: {
        builderEnabled: false,
        kind: region.kind,
        regionKey: region.key,
        width: surfaceWidth
      },
      children: /* @__PURE__ */ jsx7(
        "section",
        {
          ref: sectionRef,
          "data-photon-surface-region": region.key,
          className: clsx6(
            "relative [container-type:inline-size]",
            stickySiteHeaderRegion && "sticky z-40"
          ),
          style: stickySiteHeaderRegion ? {
            top: "var(--photon-site-header-offset, 0px)"
          } : void 0,
          children: /* @__PURE__ */ jsx7(
            "div",
            {
              className: isPageRegion ? "mx-auto w-full max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] px-[var(--photon-site-gutter,24px)]" : "w-full",
              style: isPageRegion ? {
                "--photon-list-gap": "var(--photon-section-gap,2rem)"
              } : void 0,
              children: /* @__PURE__ */ jsx7(PhotonPublicBlockList, { blocks: blocks ?? [] })
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
  return /* @__PURE__ */ jsx7("div", { className: "space-y-[var(--photon-section-gap,2rem)]", children: regions.map((region) => /* @__PURE__ */ jsx7(
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
  return /* @__PURE__ */ jsxs5(
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
        /* @__PURE__ */ jsx7(PhotonSearchHighlightEffect, { activeHighlight: activeSearchHighlight }),
        /* @__PURE__ */ jsx7(
          "main",
          {
            className: "min-h-screen min-w-0 px-0 transition-colors duration-500",
            style: siteSurfaceStyle,
            "data-testid": "photon-public-runtime",
            children: /* @__PURE__ */ jsx7(PhotonPublicSurface, { page })
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
  PhotonProvider,
  PhotonPublicPage,
  PhotonSiteSearch,
  createPhotonPublicAccountTabExtension as createPhotonAccountTabExtension,
  createPhotonBlockLocalizationSchema,
  createPhotonKit,
  createPhotonLocalizedDefault,
  createPhotonRuntime,
  createPhotonPublicSiteFrameExtension as createPhotonSiteFrameExtension,
  definePhotonBlockDefinition,
  getPhotonAnchorRel,
  getPhotonPublicSurfaceModeStyle as getPhotonSurfaceModeStyle,
  photonPublicSystemKit as photonSystemKit,
  photonPublicSystemModule as photonSystemModule,
  renderPhotonRichTextHtml,
  resolvePhotonPublicAccountTabs as resolvePhotonAccountTabs,
  sanitizePhotonLinkHref,
  sanitizePhotonRichTextHtml,
  usePhoton,
  usePhotonCanEdit,
  usePhotonI18n,
  usePhotonRenderDepth,
  usePhotonStore,
  usePhotonFieldValue as usePhotonValueAtPath
};
