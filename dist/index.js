import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  KeyboardMenuList,
  Root,
  WebsiteBuilderBlockRenderer,
  WebsiteBuilderFieldEditorList,
  WebsiteBuilderI18nProvider,
  WebsiteBuilderLink,
  WebsiteBuilderProvider,
  WebsiteBuilderRenderDepthProvider,
  WebsiteBuilderRichTextEditor,
  WebsiteBuilderSearchHighlightEffect,
  WebsiteBuilderStudio,
  isWebsiteBuilderMediaValue,
  renderWebsiteBuilderRichTextHtml,
  resolveWebsiteBuilderMediaPreviewUrl,
  resolveWebsiteBuilderMediaUrl,
  resolveWebsiteBuilderText,
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
  websiteBuilderRichTextContentClassName
} from "./chunk-SKKKSM7X.js";
import {
  normalizeWebsiteBuilderSelectionForMode,
  resolveWebsiteBuilderAccess,
  resolveWebsiteBuilderMode,
  resolveWebsiteBuilderRequestHeaders,
  resolveWebsiteBuilderWorkspaceParams
} from "./chunk-NIL7BFDU.js";
import {
  createWebsiteBuilderRuntime
} from "./chunk-FAN4Y46R.js";
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
} from "./chunk-RIBOMHDR.js";
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
  WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM,
  WEBSITE_BUILDER_SEARCH_QUERY_PARAM,
  WEBSITE_BUILDER_SEARCH_TARGET_PARAM
} from "./chunk-HFEMF2E3.js";
import {
  DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES,
  DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF,
  WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID,
  WEBSITE_BUILDER_EMPTY_TEXT,
  WEBSITE_BUILDER_ROOT_LIST_ID,
  WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS,
  WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS,
  applyWebsiteBuilderSiteColorScheme,
  applyWebsiteBuilderSiteDesignPreset,
  canEditWebsiteBuilderWorkspace,
  canSaveWebsiteBuilderWorkspace,
  cloneWebsiteBuilderBlockTreeWithNewIds,
  cloneWebsiteBuilderValue,
  createWebsiteBuilderAreaListId,
  createWebsiteBuilderNodeId,
  createWebsiteBuilderSiteDesignSettings,
  duplicateWebsiteBuilderBlockInDocument,
  findWebsiteBuilderBlock,
  getFirstWebsiteBuilderBlockId,
  getValueAtPath,
  getWebsiteBuilderSiteColorScheme,
  getWebsiteBuilderSiteDesignPreset,
  getWebsiteBuilderWorkspaceIdentityKey,
  getWebsiteBuilderWorkspaceKey,
  hasWebsiteBuilderSiteDesignPresetCustomization,
  insertWebsiteBuilderBlockInDocument,
  isWebsiteBuilderFramelessPreset,
  isWebsiteBuilderFramelessSiteDesign,
  isWebsiteBuilderSiteDesignPresetApplied,
  isWebsiteBuilderWorkspaceReadonly,
  moveWebsiteBuilderBlockInDocument,
  normalizeWebsiteBuilderWorkspaceCapabilities,
  normalizeWebsiteBuilderWorkspaceDescriptor,
  normalizeWebsiteBuilderWorkspaceRef,
  removeWebsiteBuilderBlockFromDocument,
  resolveWebsiteBuilderSiteDesignSettings,
  setValueAtPath,
  updateWebsiteBuilderBlockInDocument,
  websiteBuilderSiteColorSchemes,
  websiteBuilderSiteDesignPresets
} from "./chunk-RVPYKYSQ.js";

// src/components/editable/editable-gallery.tsx
import clsx4 from "clsx";
import { useState } from "react";
import { toast } from "sonner";

// src/components/editable/editable-gallery-add-card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var EditableGalleryAddCard = ({
  isUploading,
  onUpload,
  className,
  titleClassName,
  bodyClassName,
  buttonClassName
}) => {
  return /* @__PURE__ */ jsxs(
    "label",
    {
      "data-testid": "wb-editable-gallery-add-card",
      className: `flex min-h-[18rem] cursor-pointer flex-col items-center justify-center gap-3 rounded-[34px] border border-dashed px-6 py-8 text-center transition ${className ?? ""}`,
      style: {
        borderColor: "var(--wb-gallery-add-border, rgba(34,211,238,0.18))",
        background: "var(--wb-gallery-add-bg, radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_52%),linear-gradient(180deg,rgba(8,18,31,0.84),rgba(6,13,24,0.94)))",
        color: "var(--wb-gallery-add-text, rgba(255,255,255,0.55))"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${buttonClassName ?? ""}`,
            style: {
              borderColor: "var(--wb-gallery-add-button-border, rgba(34,211,238,0.18))",
              background: "var(--wb-gallery-add-button-bg, rgba(34,211,238,0.1))",
              color: "var(--wb-gallery-add-button-text, rgb(207 250 254))"
            },
            children: isUploading ? "Uploading..." : "Add media"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `text-base font-semibold ${titleClassName ?? ""}`,
            style: { color: "var(--wb-gallery-add-title, rgba(255,255,255,0.84))" },
            children: "Expand the gallery without leaving the page"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `max-w-sm text-sm leading-7 ${bodyClassName ?? ""}`,
            style: { color: "var(--wb-gallery-add-body, rgba(255,255,255,0.48))" },
            children: "New uploads land here immediately, then autosave can finalize them on the backend."
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            multiple: true,
            className: "hidden",
            onChange: (event) => void onUpload(event.currentTarget.files),
            disabled: isUploading
          }
        )
      ]
    }
  );
};

// src/components/editable/editable-gallery-empty-state.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var EditableGalleryEmptyState = ({
  emptyTitle,
  emptyBody,
  isEditable,
  isUploading,
  onUpload,
  className,
  titleClassName,
  bodyClassName,
  buttonClassName
}) => {
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      "data-testid": "wb-editable-gallery-empty-state",
      className: `flex min-h-[18rem] flex-col items-center justify-center gap-3 rounded-[34px] border border-dashed px-6 py-8 text-center ${className ?? ""}`,
      style: {
        borderColor: "var(--wb-gallery-empty-border, rgba(255,255,255,0.12))",
        background: "var(--wb-gallery-empty-bg, radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_44%),linear-gradient(180deg,rgba(9,18,31,0.92),rgba(6,12,22,0.98)))",
        color: "var(--wb-gallery-empty-text, rgba(255,255,255,0.55))",
        boxShadow: "var(--wb-gallery-empty-shadow, 0 24px 54px rgba(0,0,0,0.2))"
      },
      children: [
        /* @__PURE__ */ jsx2(
          "div",
          {
            className: `text-base font-semibold ${titleClassName ?? ""}`,
            style: { color: "var(--wb-gallery-empty-title, rgba(255,255,255,0.82))" },
            children: emptyTitle
          }
        ),
        /* @__PURE__ */ jsx2(
          "div",
          {
            className: `max-w-sm text-sm leading-7 ${bodyClassName ?? ""}`,
            style: { color: "var(--wb-gallery-empty-body, rgba(255,255,255,0.48))" },
            children: emptyBody
          }
        ),
        isEditable ? /* @__PURE__ */ jsxs2("label", { className: "inline-flex cursor-pointer items-center rounded-full", children: [
          /* @__PURE__ */ jsx2(
            "div",
            {
              className: `rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${buttonClassName ?? ""}`,
              style: {
                borderColor: "var(--wb-gallery-empty-button-border, rgba(34,211,238,0.18))",
                background: "var(--wb-gallery-empty-button-bg, rgba(34,211,238,0.1))",
                color: "var(--wb-gallery-empty-button-text, rgb(207 250 254))"
              },
              children: isUploading ? "Uploading..." : "Add media"
            }
          ),
          /* @__PURE__ */ jsx2(
            "input",
            {
              type: "file",
              accept: "image/*",
              multiple: true,
              className: "hidden",
              onChange: (event) => void onUpload(event.currentTarget.files),
              disabled: isUploading
            }
          )
        ] }) : null
      ]
    }
  );
};

// src/components/editable/editable-gallery-item-card.tsx
import clsx3 from "clsx";

// src/components/editable/media-state-chip.tsx
import clsx from "clsx";
import { jsx as jsx3 } from "react/jsx-runtime";
var MediaStateChip = ({
  children,
  tone = "neutral"
}) => /* @__PURE__ */ jsx3(
  "div",
  {
    "data-testid": tone === "accent" ? "wb-media-state-chip-accent" : "wb-media-state-chip",
    className: clsx(
      "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
    ),
    style: tone === "accent" ? {
      borderColor: "var(--wb-gallery-chip-accent-border, rgba(34,211,238,0.16))",
      background: "var(--wb-gallery-chip-accent-bg, rgba(34,211,238,0.1))",
      color: "var(--wb-gallery-chip-accent-text, rgba(207,250,254,0.84))"
    } : {
      borderColor: "var(--wb-gallery-chip-border, rgba(255,255,255,0.1))",
      background: "var(--wb-gallery-chip-bg, rgba(255,255,255,0.03))",
      color: "var(--wb-gallery-chip-text, rgba(255,255,255,0.52))"
    },
    children
  }
);

// src/components/editable/shared.ts
import clsx2 from "clsx";
var editableFrameClassName = ({
  isActive,
  isEditable,
  className
}) => clsx2(
  className,
  isEditable && "rounded-[1.5rem] transition-[background-color,box-shadow,transform,border-color] duration-200",
  isEditable && !isActive && "cursor-text shadow-[0_0_0_1px_transparent] hover:bg-white/[0.03] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]",
  isEditable && isActive && "bg-cyan-300/[0.07] shadow-[0_0_0_1px_rgba(34,211,238,0.52)]"
);
var createActivationProps = (isEditable, activate) => isEditable ? {
  role: "button",
  tabIndex: 0,
  onClick: (event) => {
    event.stopPropagation();
    activate();
  },
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      activate();
    }
  }
} : {};
var builderInputClassName = "w-full rounded-[24px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-field)] px-4 py-3 text-sm text-[color:var(--wb-builder-text)] outline-none ring-0 transition placeholder:text-[color:var(--wb-builder-text-ghost)] focus:border-[color:var(--wb-builder-border-strong)]";
var formatMediaFileSize = (size) => {
  if (!size || size <= 0) {
    return null;
  }
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

// src/components/editable/editable-gallery-item-card.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var EditableGalleryItemCard = ({
  blockId,
  index,
  item,
  items,
  isEditable,
  isActive,
  onUpdateItems,
  className,
  fallbackClassName,
  labelClassName,
  captionClassName,
  fileNameClassName
}) => {
  const mediaValue = isWebsiteBuilderMediaValue(item.media) ? item.media : null;
  const previewUrl = resolveWebsiteBuilderMediaPreviewUrl(item.media);
  const isHeroItem = items.length >= 3 && index === 0;
  const isEditingItem = isEditable && isActive;
  return /* @__PURE__ */ jsxs3(
    "article",
    {
      "data-testid": "wb-editable-gallery-item",
      className: clsx3(
        "overflow-hidden rounded-[34px] border",
        className,
        isHeroItem && "md:col-span-2"
      ),
      style: {
        borderColor: "var(--wb-gallery-card-border, rgba(255,255,255,0.1))",
        background: "var(--wb-gallery-card-bg, radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_48%),linear-gradient(180deg,rgba(8,17,30,0.97),rgba(5,11,20,0.99)))",
        boxShadow: "var(--wb-gallery-card-shadow, 0 24px 56px rgba(0,0,0,0.2))"
      },
      children: [
        /* @__PURE__ */ jsxs3(
          "div",
          {
            className: clsx3(
              "relative overflow-hidden",
              isHeroItem ? "aspect-[16/10]" : "aspect-[4/3]"
            ),
            children: [
              previewUrl ? /* @__PURE__ */ jsx4(
                "img",
                {
                  src: previewUrl,
                  alt: item.alt || `Gallery image ${index + 1}`,
                  className: "h-full w-full object-cover"
                }
              ) : /* @__PURE__ */ jsx4(
                "div",
                {
                  className: clsx3(
                    "flex h-full w-full items-center justify-center text-center text-sm",
                    fallbackClassName
                  ),
                  style: {
                    background: "var(--wb-gallery-fallback-bg, radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_28%),linear-gradient(180deg,rgba(7,17,31,0.92),rgba(5,11,20,0.98)))",
                    color: "var(--wb-gallery-fallback-text, rgba(255,255,255,0.48))"
                  },
                  children: "Media slot"
                }
              ),
              /* @__PURE__ */ jsxs3("div", { className: "absolute inset-x-4 top-4 flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsx4(MediaStateChip, { children: `item ${index + 1}` }),
                mediaValue?.temporaryUploadId ? /* @__PURE__ */ jsx4(MediaStateChip, { tone: "accent", children: "staged" }) : null
              ] }),
              isEditingItem ? /* @__PURE__ */ jsxs3("div", { className: "absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsx4(
                  "button",
                  {
                    type: "button",
                    onClick: (event) => {
                      event.stopPropagation();
                      if (index === 0) {
                        return;
                      }
                      const nextItems = [...items];
                      [nextItems[index - 1], nextItems[index]] = [
                        nextItems[index],
                        nextItems[index - 1]
                      ];
                      onUpdateItems(nextItems);
                    },
                    className: "rounded-full border border-black/20 bg-slate-950/88 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55 backdrop-blur",
                    style: {
                      borderColor: "var(--wb-gallery-control-border, rgba(0,0,0,0.2))",
                      background: "var(--wb-gallery-control-bg, rgba(2,6,23,0.88))",
                      color: "var(--wb-gallery-control-text, rgba(255,255,255,0.55))"
                    },
                    children: "Prev"
                  }
                ),
                /* @__PURE__ */ jsx4(
                  "button",
                  {
                    type: "button",
                    onClick: (event) => {
                      event.stopPropagation();
                      if (index === items.length - 1) {
                        return;
                      }
                      const nextItems = [...items];
                      [nextItems[index], nextItems[index + 1]] = [
                        nextItems[index + 1],
                        nextItems[index]
                      ];
                      onUpdateItems(nextItems);
                    },
                    className: "rounded-full border border-black/20 bg-slate-950/88 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55 backdrop-blur",
                    style: {
                      borderColor: "var(--wb-gallery-control-border, rgba(0,0,0,0.2))",
                      background: "var(--wb-gallery-control-bg, rgba(2,6,23,0.88))",
                      color: "var(--wb-gallery-control-text, rgba(255,255,255,0.55))"
                    },
                    children: "Next"
                  }
                ),
                /* @__PURE__ */ jsx4(
                  "button",
                  {
                    type: "button",
                    onClick: (event) => {
                      event.stopPropagation();
                      onUpdateItems(
                        items.filter((_, candidateIndex) => candidateIndex !== index)
                      );
                    },
                    className: "rounded-full border border-rose-300/18 bg-rose-300/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-rose-100 backdrop-blur",
                    style: {
                      borderColor: "var(--wb-gallery-remove-border, rgba(253,164,175,0.18))",
                      background: "var(--wb-gallery-remove-bg, rgba(253,164,175,0.1))",
                      color: "var(--wb-gallery-remove-text, rgb(255 228 230))"
                    },
                    children: "Remove"
                  }
                )
              ] }) : null
            ]
          }
        ),
        /* @__PURE__ */ jsx4("div", { className: "space-y-3 px-5 py-5", children: isEditingItem ? /* @__PURE__ */ jsxs3(Fragment, { children: [
          /* @__PURE__ */ jsx4(
            "input",
            {
              value: item.alt ?? "",
              onClick: (event) => event.stopPropagation(),
              onChange: (event) => onUpdateItems(
                items.map(
                  (candidate, candidateIndex) => candidateIndex === index ? {
                    ...candidate,
                    alt: event.currentTarget.value
                  } : candidate
                )
              ),
              placeholder: "Alt text",
              className: builderInputClassName
            }
          ),
          /* @__PURE__ */ jsx4(
            "textarea",
            {
              rows: 3,
              value: item.caption ?? "",
              onClick: (event) => event.stopPropagation(),
              onChange: (event) => onUpdateItems(
                items.map(
                  (candidate, candidateIndex) => candidateIndex === index ? {
                    ...candidate,
                    caption: event.currentTarget.value
                  } : candidate
                )
              ),
              placeholder: "Caption",
              className: clsx3(builderInputClassName, "min-h-[96px] resize-y")
            }
          )
        ] }) : /* @__PURE__ */ jsxs3("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx4(
            "div",
            {
              "data-testid": "wb-editable-gallery-item-label",
              className: clsx3(
                "text-[11px] font-semibold uppercase tracking-[0.26em]",
                labelClassName
              ),
              style: {
                color: "var(--wb-gallery-label, rgba(207,250,254,0.56))"
              },
              children: item.alt?.trim() ? item.alt : `Gallery image ${index + 1}`
            }
          ),
          /* @__PURE__ */ jsx4(
            "div",
            {
              "data-testid": "wb-editable-gallery-item-caption",
              className: clsx3(
                "text-sm leading-7",
                captionClassName
              ),
              style: {
                color: "var(--wb-gallery-caption, rgba(203,213,225,0.92))"
              },
              children: item.caption?.trim() ? item.caption : "Click the gallery in Content or Builder mode to annotate this image."
            }
          ),
          mediaValue?.fileName || mediaValue?.name ? /* @__PURE__ */ jsx4(
            "div",
            {
              "data-testid": "wb-editable-gallery-item-file-name",
              className: clsx3(
                "inline-flex rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em]",
                fileNameClassName
              ),
              style: {
                borderColor: "var(--wb-gallery-file-border, rgba(255,255,255,0.08))",
                background: "var(--wb-gallery-file-bg, rgba(255,255,255,0.03))",
                color: "var(--wb-gallery-file-text, rgba(255,255,255,0.4))"
              },
              children: mediaValue?.fileName ?? mediaValue?.name
            }
          ) : null
        ] }) })
      ]
    }
  );
};

// src/components/editable/editable-gallery.tsx
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
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
  const documentId = useWebsiteBuilderStore((state) => state.document.id);
  const selectedField = useWebsiteBuilderStore((state) => state.selectedField);
  const selectField = useWebsiteBuilderStore((state) => state.selectField);
  const updateFieldValue = useWebsiteBuilderStore(
    (state) => state.updateFieldValue
  );
  const uploadMedia = useWebsiteBuilderStore((state) => state.uploadMedia);
  const [isUploading, setIsUploading] = useState(false);
  const galleryValue = useWebsiteBuilderFieldValue(blockId, path);
  const items = Array.isArray(galleryValue) ? galleryValue : [];
  const isEditable = useWebsiteBuilderCanEdit();
  const isActive = selectedField?.blockId === blockId && selectedField.path === path;
  const updateItems = (nextItems) => {
    updateFieldValue(blockId, path, nextItems);
  };
  const handleUpload = async (files) => {
    if (!files?.length) {
      return;
    }
    const selectedFiles = Array.from(files);
    if (!uploadMedia) {
      updateItems([
        ...items,
        ...selectedFiles.map((file) => ({
          id: createWebsiteBuilderNodeId(),
          media: URL.createObjectURL(file),
          alt: file.name.replace(/\.[^.]+$/, ""),
          caption: ""
        }))
      ]);
      return;
    }
    setIsUploading(true);
    try {
      const uploadedItems = await Promise.all(
        selectedFiles.map(async (file) => ({
          id: createWebsiteBuilderNodeId(),
          media: await uploadMedia({
            file,
            documentId,
            blockId,
            path
          }),
          alt: file.name.replace(/\.[^.]+$/, ""),
          caption: ""
        }))
      );
      updateItems([...items, ...uploadedItems]);
    } catch (error) {
      toast.error("Gallery upload failed", {
        description: error instanceof Error ? error.message : "Unable to upload one or more gallery images."
      });
    } finally {
      setIsUploading(false);
    }
  };
  return /* @__PURE__ */ jsx5(
    "div",
    {
      ...createActivationProps(isEditable, () => selectField(blockId, path)),
      "data-testid": "wb-editable-gallery",
      className: editableFrameClassName({ isActive, isEditable, className }),
      children: /* @__PURE__ */ jsx5(
        "div",
        {
          className: clsx4(columnsClassName, items.length === 0 && "grid-cols-1"),
          children: items.length === 0 ? /* @__PURE__ */ jsx5(
            EditableGalleryEmptyState,
            {
              emptyTitle,
              emptyBody,
              isEditable,
              isUploading,
              onUpload: handleUpload,
              className: emptyStateClassName,
              titleClassName: emptyStateTitleClassName,
              bodyClassName: emptyStateBodyClassName,
              buttonClassName: emptyStateButtonClassName
            }
          ) : /* @__PURE__ */ jsxs4(Fragment2, { children: [
            items.map((item, index) => /* @__PURE__ */ jsx5(
              EditableGalleryItemCard,
              {
                blockId,
                index,
                item,
                items,
                isEditable,
                isActive,
                onUpdateItems: updateItems,
                className: itemCardClassName,
                fallbackClassName: itemFallbackClassName,
                labelClassName: itemLabelClassName,
                captionClassName: itemCaptionClassName,
                fileNameClassName: itemFileNameClassName
              },
              item.id ?? `${blockId}-gallery-${index}`
            )),
            isEditable ? /* @__PURE__ */ jsx5(
              EditableGalleryAddCard,
              {
                isUploading,
                onUpload: handleUpload,
                className: addCardClassName,
                titleClassName: addCardTitleClassName,
                bodyClassName: addCardBodyClassName,
                buttonClassName: addCardButtonClassName
              }
            ) : null
          ] })
        }
      )
    }
  );
};

// src/components/editable/editable-image.tsx
import clsx5 from "clsx";
import { useEffect, useState as useState2 } from "react";
import { toast as toast2 } from "sonner";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var EditableImage = ({
  blockId,
  path,
  altPath,
  className,
  imageClassName,
  fallbackAlt = "Builder image"
}) => {
  const store = useWebsiteBuilderStoreApi();
  const documentId = useWebsiteBuilderStore((state) => state.document.id);
  const selectedField = useWebsiteBuilderStore((state) => state.selectedField);
  const selectField = useWebsiteBuilderStore((state) => state.selectField);
  const updateFieldValue = useWebsiteBuilderStore(
    (state) => state.updateFieldValue
  );
  const uploadMedia = useWebsiteBuilderStore((state) => state.uploadMedia);
  const [previewUrl, setPreviewUrl] = useState2(null);
  const [isUploading, setIsUploading] = useState2(false);
  const rawValue = useWebsiteBuilderFieldValue(blockId, path);
  const source = previewUrl ?? resolveWebsiteBuilderMediaPreviewUrl(rawValue);
  const altValue = altPath ? useWebsiteBuilderFieldValue(blockId, altPath) : null;
  const alt = altPath ? String(altValue ?? fallbackAlt) : fallbackAlt;
  const mediaValue = isWebsiteBuilderMediaValue(rawValue) ? rawValue : null;
  const isEditable = useWebsiteBuilderCanEdit();
  const isActive = selectedField?.blockId === blockId && selectedField.path === path;
  const handleFileChange = (event) => {
    const file = event.currentTarget.files?.[0];
    if (!file) {
      return;
    }
    const nextPreviewUrl = URL.createObjectURL(file);
    if (!uploadMedia) {
      updateFieldValue(blockId, path, nextPreviewUrl);
      setPreviewUrl(nextPreviewUrl);
      return;
    }
    setPreviewUrl(nextPreviewUrl);
    setIsUploading(true);
    void uploadMedia({
      file,
      documentId,
      blockId,
      path
    }).then((uploadedMedia) => {
      updateFieldValue(blockId, path, uploadedMedia);
      if (altPath) {
        const currentAlt = String(
          store.getState().getFieldValue(blockId, altPath) ?? ""
        );
        if (!currentAlt.trim()) {
          updateFieldValue(
            blockId,
            altPath,
            file.name.replace(/\.[^.]+$/, "")
          );
        }
      }
    }).catch((error) => {
      toast2.error("Upload failed", {
        description: error instanceof Error ? error.message : "Unable to upload the selected media file."
      });
    }).finally(() => {
      setIsUploading(false);
      setPreviewUrl((currentPreviewUrl) => {
        if (currentPreviewUrl) {
          URL.revokeObjectURL(currentPreviewUrl);
        }
        return null;
      });
      event.currentTarget.value = "";
    });
  };
  useEffect(
    () => () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    },
    [previewUrl]
  );
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      ...createActivationProps(isEditable, () => selectField(blockId, path)),
      className: editableFrameClassName({ isActive, isEditable, className }),
      children: [
        source ? /* @__PURE__ */ jsx6(
          "img",
          {
            src: source,
            alt,
            className: clsx5("h-full w-full object-cover", imageClassName)
          }
        ) : /* @__PURE__ */ jsx6("div", { className: "flex h-full min-h-[14rem] w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_28%),linear-gradient(180deg,rgba(9,18,31,0.92),rgba(5,11,20,0.98))] text-center text-white/48", children: /* @__PURE__ */ jsxs5("div", { className: "px-6", children: [
          /* @__PURE__ */ jsx6("div", { className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-100/66", children: "Media slot" }),
          /* @__PURE__ */ jsx6("div", { className: "mt-3 text-sm leading-7 text-white/54", children: "Upload a staged image or paste a remote URL directly into the live page." })
        ] }) }),
        isEditable ? /* @__PURE__ */ jsxs5(
          "div",
          {
            className: clsx5(
              "pointer-events-none absolute inset-x-4 bottom-4 rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_58%),linear-gradient(180deg,rgba(7,17,31,0.94),rgba(6,13,24,0.98))] px-4 py-4 text-xs text-white/70 opacity-0 shadow-[0_20px_48px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-200 ease-out",
              isActive && "pointer-events-auto opacity-100"
            ),
            children: [
              /* @__PURE__ */ jsxs5("div", { className: "mb-3 flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsx6("div", { className: "uppercase tracking-[0.26em] text-white/42", children: "Media source" }),
                /* @__PURE__ */ jsxs5("div", { className: "flex flex-wrap items-center gap-2", children: [
                  mediaValue?.temporaryUploadId ? /* @__PURE__ */ jsx6(MediaStateChip, { tone: "accent", children: "staged" }) : null,
                  mediaValue?.mediaId ? /* @__PURE__ */ jsx6(MediaStateChip, { children: "saved" }) : null,
                  mediaValue?.mimeType ? /* @__PURE__ */ jsx6(MediaStateChip, { children: mediaValue.mimeType }) : null
                ] })
              ] }),
              /* @__PURE__ */ jsx6(
                "input",
                {
                  value: resolveWebsiteBuilderMediaUrl(rawValue),
                  onChange: (event) => updateFieldValue(
                    blockId,
                    path,
                    updateWebsiteBuilderMediaUrl(
                      store.getState().getFieldValue(blockId, path),
                      event.currentTarget.value
                    )
                  ),
                  placeholder: "https://...",
                  className: clsx5("mb-3", builderInputClassName)
                }
              ),
              altPath ? /* @__PURE__ */ jsx6(
                "input",
                {
                  value: alt,
                  onChange: (event) => updateFieldValue(blockId, altPath, event.currentTarget.value),
                  placeholder: "Alt text",
                  className: clsx5("mb-3", builderInputClassName)
                }
              ) : null,
              /* @__PURE__ */ jsxs5("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxs5("label", { className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-cyan-300/16 bg-cyan-300/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100", children: [
                  /* @__PURE__ */ jsx6("span", { children: isUploading ? "Uploading..." : source ? "Replace media" : "Upload media" }),
                  /* @__PURE__ */ jsx6(
                    "input",
                    {
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: handleFileChange,
                      disabled: isUploading
                    }
                  )
                ] }),
                source ? /* @__PURE__ */ jsx6(
                  "button",
                  {
                    type: "button",
                    onClick: (event) => {
                      event.stopPropagation();
                      updateFieldValue(blockId, path, "");
                    },
                    className: "rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-white",
                    children: "Clear"
                  }
                ) : null,
                mediaValue?.fileName ? /* @__PURE__ */ jsx6("div", { className: "rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55", children: mediaValue.fileName }) : null,
                formatMediaFileSize(mediaValue?.size) ? /* @__PURE__ */ jsx6(MediaStateChip, { children: formatMediaFileSize(mediaValue?.size) ?? "" }) : null
              ] })
            ]
          }
        ) : null
      ]
    }
  );
};

// src/components/editable/editable-text.tsx
import { useEffect as useEffect2, useRef } from "react";

// src/search/helpers.ts
var buildWebsiteBuilderSearchTargetId = (blockId, path) => `${blockId}::${path}`;
var buildWebsiteBuilderSearchResultHref = (result, query, mode, isAdmin, options) => {
  const localePrefix = options?.locale === "en" && !result.route.startsWith("/en") ? "/en" : "";
  const url = new URL(
    `${localePrefix}${result.route}`,
    "https://website-builder.local"
  );
  const searchParams = new URLSearchParams(
    options?.currentSearchParams?.toString() ?? ""
  );
  if (isAdmin && mode !== "preview") {
    searchParams.set("mode", mode);
  } else {
    searchParams.delete("mode");
  }
  if (options?.contentLocale && options.contentLocale !== options.locale) {
    searchParams.set("contentLocale", options.contentLocale);
  } else {
    searchParams.delete("contentLocale");
  }
  if (options?.workspaceSelection?.profileId) {
    searchParams.set("wbProfile", options.workspaceSelection.profileId);
    searchParams.set("wbBranch", options.workspaceSelection.branch);
    if (options.workspaceSelection.revisionId) {
      searchParams.set("wbRevision", options.workspaceSelection.revisionId);
    } else {
      searchParams.delete("wbRevision");
    }
  } else {
    searchParams.delete("wbProfile");
    searchParams.delete("wbBranch");
    searchParams.delete("wbRevision");
  }
  searchParams.set(WEBSITE_BUILDER_SEARCH_QUERY_PARAM, query);
  searchParams.set(WEBSITE_BUILDER_SEARCH_TARGET_PARAM, result.targetId);
  searchParams.set(
    WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM,
    String(result.occurrence)
  );
  const serializedSearch = searchParams.toString();
  return serializedSearch ? `${url.pathname}?${serializedSearch}` : url.pathname;
};

// src/components/editable/editable-text.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var EditableText = ({
  blockId,
  path,
  as: Tag = "span",
  className,
  placeholder = WEBSITE_BUILDER_EMPTY_TEXT,
  ...rest
}) => {
  const selectedField = useWebsiteBuilderStore((state) => state.selectedField);
  const selectField = useWebsiteBuilderStore((state) => state.selectField);
  const clearSelectedField = useWebsiteBuilderStore(
    (state) => state.clearSelectedField
  );
  const updateFieldValue = useWebsiteBuilderStore(
    (state) => state.updateFieldValue
  );
  const inputRef = useRef(null);
  const value = String(useWebsiteBuilderFieldValue(blockId, path) ?? "");
  const isEditable = useWebsiteBuilderCanEdit();
  const isActive = selectedField?.blockId === blockId && selectedField.path === path;
  const searchTargetId = buildWebsiteBuilderSearchTargetId(blockId, path);
  const handleChange = (event) => {
    updateFieldValue(blockId, path, event.currentTarget.value);
  };
  const handleBlur = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    clearSelectedField();
  };
  const handleKeyDown = (event) => {
    if (event.key !== "Escape") {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    clearSelectedField();
    event.currentTarget.blur();
  };
  useEffect2(() => {
    if (isEditable && isActive) {
      const input = inputRef.current;
      if (!input) {
        return;
      }
      input.focus();
      const caretPosition = input.value.length;
      input.setSelectionRange(caretPosition, caretPosition);
    }
  }, [isActive, isEditable]);
  if (isEditable && isActive) {
    return /* @__PURE__ */ jsx7(
      Tag,
      {
        ...rest,
        "data-wb-search-target": searchTargetId,
        onClick: (event) => event.stopPropagation(),
        className: editableFrameClassName({ isActive, isEditable, className }),
        children: /* @__PURE__ */ jsx7(
          "input",
          {
            ref: inputRef,
            value,
            placeholder,
            onChange: handleChange,
            onBlur: handleBlur,
            onKeyDown: handleKeyDown,
            onClick: (event) => event.stopPropagation(),
            className: "m-0 block w-full min-w-0 appearance-none border-0 bg-transparent p-0 font-inherit leading-inherit tracking-inherit text-inherit outline-none ring-0 shadow-none placeholder:text-white/28 focus:outline-none"
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx7(
    Tag,
    {
      ...rest,
      "data-wb-search-target": searchTargetId,
      onClick: isEditable ? (event) => {
        event.stopPropagation();
        selectField(blockId, path);
      } : rest.onClick,
      className: editableFrameClassName({ isActive, isEditable, className }),
      children: value || placeholder
    }
  );
};

// src/components/editable/editable-repeater-value.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
var EditableRepeaterValue = ({
  blockId,
  path,
  fallback,
  className,
  as
}) => {
  return /* @__PURE__ */ jsx8(
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

// src/components/editable/editable-rich-text.tsx
import clsx6 from "clsx";
import { jsx as jsx9 } from "react/jsx-runtime";
var EditableRichText = ({
  blockId,
  path,
  className,
  placeholder = WEBSITE_BUILDER_EMPTY_TEXT
}) => {
  const selectedField = useWebsiteBuilderStore((state) => state.selectedField);
  const selectField = useWebsiteBuilderStore((state) => state.selectField);
  const clearSelectedField = useWebsiteBuilderStore(
    (state) => state.clearSelectedField
  );
  const updateFieldValue = useWebsiteBuilderStore(
    (state) => state.updateFieldValue
  );
  const value = String(useWebsiteBuilderFieldValue(blockId, path) ?? "");
  const isEditable = useWebsiteBuilderCanEdit();
  const isActive = selectedField?.blockId === blockId && selectedField.path === path;
  const searchTargetId = buildWebsiteBuilderSearchTargetId(blockId, path);
  if (isEditable && isActive) {
    return /* @__PURE__ */ jsx9(
      "div",
      {
        "data-wb-search-target": searchTargetId,
        className: editableFrameClassName({ isActive, isEditable }),
        children: /* @__PURE__ */ jsx9(
          WebsiteBuilderRichTextEditor,
          {
            value,
            placeholder,
            className,
            onFocus: () => selectField(blockId, path),
            onBlur: () => clearSelectedField(),
            onEscape: () => clearSelectedField(),
            onChange: (nextValue) => updateFieldValue(blockId, path, nextValue)
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx9(
    "div",
    {
      ...createActivationProps(isEditable, () => selectField(blockId, path)),
      "data-wb-search-target": searchTargetId,
      className: editableFrameClassName({ isActive, isEditable }),
      children: /* @__PURE__ */ jsx9(
        "div",
        {
          className: clsx6(
            websiteBuilderRichTextContentClassName,
            className,
            !value && "text-[color:var(--wb-site-muted)] opacity-60"
          ),
          dangerouslySetInnerHTML: {
            __html: renderWebsiteBuilderRichTextHtml(value, placeholder)
          }
        }
      )
    }
  );
};

// src/components/editable/editable-textarea.tsx
import { useEffect as useEffect3, useRef as useRef2 } from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var EditableTextarea = ({
  blockId,
  path,
  className,
  placeholder = WEBSITE_BUILDER_EMPTY_TEXT
}) => {
  const selectedField = useWebsiteBuilderStore((state) => state.selectedField);
  const selectField = useWebsiteBuilderStore((state) => state.selectField);
  const clearSelectedField = useWebsiteBuilderStore(
    (state) => state.clearSelectedField
  );
  const updateFieldValue = useWebsiteBuilderStore(
    (state) => state.updateFieldValue
  );
  const textareaRef = useRef2(null);
  const value = String(useWebsiteBuilderFieldValue(blockId, path) ?? "");
  const isEditable = useWebsiteBuilderCanEdit();
  const isActive = selectedField?.blockId === blockId && selectedField.path === path;
  const searchTargetId = buildWebsiteBuilderSearchTargetId(blockId, path);
  const handleChange = (event) => {
    updateFieldValue(blockId, path, event.currentTarget.value);
  };
  const handleBlur = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    clearSelectedField();
  };
  const handleKeyDown = (event) => {
    if (event.key !== "Escape") {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    clearSelectedField();
    event.currentTarget.blur();
  };
  useEffect3(() => {
    if (isEditable && isActive) {
      textareaRef.current?.focus();
    }
  }, [isActive, isEditable]);
  if (isEditable && isActive) {
    return /* @__PURE__ */ jsx10(
      "div",
      {
        "data-wb-search-target": searchTargetId,
        className: editableFrameClassName({ isActive, isEditable, className }),
        children: /* @__PURE__ */ jsx10(
          "textarea",
          {
            ref: textareaRef,
            rows: 5,
            value,
            placeholder,
            onChange: handleChange,
            onBlur: handleBlur,
            onKeyDown: handleKeyDown,
            onClick: (event) => event.stopPropagation(),
            className: "block w-full resize-y border-0 bg-transparent p-0 font-inherit leading-inherit tracking-inherit text-inherit outline-none ring-0 shadow-none placeholder:text-white/28 focus:outline-none"
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx10(
    "div",
    {
      ...createActivationProps(isEditable, () => selectField(blockId, path)),
      "data-wb-search-target": searchTargetId,
      className: editableFrameClassName({ isActive, isEditable, className }),
      children: value || placeholder
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
import clsx10 from "clsx";

// src/modules/system/site/site-design-settings-panel.tsx
import { jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
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
var DetailBadge = ({ label }) => /* @__PURE__ */ jsx11(
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
    return /* @__PURE__ */ jsxs6("section", { className: "space-y-4", "data-testid": "wb-design-manual-tokens", children: [
      /* @__PURE__ */ jsxs6("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx11(
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
        /* @__PURE__ */ jsx11(
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
      /* @__PURE__ */ jsx11(
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
  return /* @__PURE__ */ jsxs6("div", { className: "space-y-6", "data-testid": "wb-design-profile-source-summary", children: [
    /* @__PURE__ */ jsxs6(
      "section",
      {
        className: "rounded-[24px] border p-4 sm:p-5",
        style: highlightCardStyle,
        children: [
          /* @__PURE__ */ jsxs6("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx11(
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
            /* @__PURE__ */ jsx11(
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
          /* @__PURE__ */ jsxs6("div", { className: "mt-4 grid gap-3 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsxs6(
              "div",
              {
                className: "rounded-[22px] border p-4",
                style: summaryCardStyle,
                "data-testid": "wb-design-source-preset",
                children: [
                  /* @__PURE__ */ jsx11(
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
                  /* @__PURE__ */ jsx11(
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
                  /* @__PURE__ */ jsx11(
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
                  /* @__PURE__ */ jsxs6("div", { className: "mt-3 flex flex-wrap gap-2", children: [
                    /* @__PURE__ */ jsx11(
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
                    /* @__PURE__ */ jsx11(DetailBadge, { label: resolvedSettings.siteMaxWidth }),
                    /* @__PURE__ */ jsx11(DetailBadge, { label: resolvedSettings.sectionGap })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs6(
              "div",
              {
                className: "rounded-[22px] border p-4",
                style: summaryCardStyle,
                "data-testid": "wb-design-source-color-scheme",
                children: [
                  /* @__PURE__ */ jsx11(
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
                  /* @__PURE__ */ jsx11(
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
                  /* @__PURE__ */ jsx11(
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
                  /* @__PURE__ */ jsx11(
                    "div",
                    {
                      className: "mt-4 flex flex-wrap gap-2",
                      "data-testid": "wb-design-runtime-palette",
                      children: tokenPreviewItems.map(({ key, label }) => /* @__PURE__ */ jsxs6(
                        "span",
                        {
                          className: "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs",
                          style: badgeStyle,
                          children: [
                            /* @__PURE__ */ jsx11(
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
    /* @__PURE__ */ jsxs6(
      "section",
      {
        className: "rounded-[24px] border p-4 sm:p-5",
        style: summaryCardStyle,
        "data-testid": "wb-design-workspace-guidance",
        children: [
          /* @__PURE__ */ jsx11(
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
          /* @__PURE__ */ jsx11(
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
  component: (props) => /* @__PURE__ */ jsx11(SiteDesignSettingsPanelBody, { ...props })
};

// src/modules/system/site/site-footer-shell-definition.tsx
import clsx7 from "clsx";
import { ArrowRight, Send } from "lucide-react";

// src/modules/system/site/helpers.ts
var normalizeString = (value) => typeof value === "string" ? value : "";
var normalizeWebsiteBuilderSiteLinkItems = (value) => Array.isArray(value) ? value.flatMap(
  (candidate) => typeof candidate === "object" && candidate !== null && typeof candidate.label === "string" && typeof candidate.href === "string" ? [
    {
      id: typeof candidate.id === "string" ? candidate.id : void 0,
      label: normalizeString(candidate.label),
      href: normalizeString(candidate.href),
      target: typeof candidate.target === "string" ? candidate.target : void 0,
      rel: typeof candidate.rel === "string" ? candidate.rel : void 0
    }
  ] : []
) : [];
var normalizeWebsiteBuilderSiteNavigationColumns = (value) => Array.isArray(value) ? value.flatMap(
  (candidate) => typeof candidate === "object" && candidate !== null && typeof candidate.title === "string" ? [
    {
      title: normalizeString(candidate.title),
      links: normalizeWebsiteBuilderSiteLinkItems(
        candidate.links ?? []
      )
    }
  ] : []
) : [];
var normalizeWebsiteBuilderSiteStringItems = (value) => Array.isArray(value) ? value.flatMap(
  (candidate) => typeof candidate === "string" && candidate.trim() !== "" ? [candidate] : []
) : [];

// src/modules/system/site/site-footer-shell-definition.tsx
import { jsx as jsx12, jsxs as jsxs7 } from "react/jsx-runtime";
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
  { path: "brandTitle", label: "Brand title", kind: "text", group: "content", localization: "localized" },
  { path: "brandBody", label: "Brand body", kind: "textarea", group: "content", localization: "localized" },
  { path: "logoImage", label: "Logo image", kind: "image", group: "content", localization: "shared" },
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
  { path: "legalLabel", label: "Legal label", kind: "text", group: "content", localization: "localized" },
  { path: "legalHref", label: "Legal href", kind: "url", group: "content", localization: "shared" },
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
    shell: "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--wb-site-surface)_94%,black)_0%,color-mix(in_srgb,var(--wb-site-background)_88%,black)_100%)] text-white",
    card: "border-white/10 bg-white/[0.04]",
    text: "text-white",
    muted: "text-white/60"
  },
  "soft-cards": {
    shell: "bg-[linear-gradient(180deg,#f7f7fb_0%,#eef2f7_100%)] text-[var(--wb-site-text)]",
    card: "border-[var(--wb-site-border)] bg-white/85",
    text: "text-[var(--wb-site-text)]",
    muted: "text-[var(--wb-site-muted)]"
  },
  "minimal-air": {
    shell: "border-t border-[var(--wb-site-border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--wb-site-background)_94%,white)_0%,color-mix(in_srgb,var(--wb-site-surface)_94%,white)_100%)] text-[var(--wb-site-text)] shadow-none",
    card: "border-transparent bg-transparent",
    text: "text-[var(--wb-site-text)]",
    muted: "text-[var(--wb-site-muted)]"
  }
};
var SiteFooterShell = ({
  block
}) => {
  const siteDesign = useWebsiteBuilderStore((state) => state.site.settings.design);
  const siteFrameExtensions = useWebsiteBuilderStore(
    (state) => state.siteFrameExtensions
  );
  const framelessSite = isWebsiteBuilderFramelessSiteDesign(siteDesign);
  const footerVariant = framelessSite ? "minimal-air" : block.props.variant;
  const variant = footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"];
  const isSoftCardsVariant = footerVariant === "soft-cards" && !framelessSite;
  const disabledExtensionIds = normalizeWebsiteBuilderSiteStringItems(
    block.props.disabledExtensionIds
  );
  const disabledExtensionItemIds = normalizeWebsiteBuilderSiteStringItems(
    block.props.disabledExtensionItemIds
  );
  const footerExtensionItems = collectWebsiteBuilderFooterExtensionItems(
    resolveWebsiteBuilderSiteFrameExtensions(
      siteFrameExtensions,
      disabledExtensionIds
    ),
    disabledExtensionItemIds
  );
  const navigationColumns = [
    ...normalizeWebsiteBuilderSiteNavigationColumns(
      block.props.navigationColumns
    ),
    ...normalizeWebsiteBuilderSiteNavigationColumns(
      footerExtensionItems.navigationColumns
    )
  ];
  const legalLinks = normalizeWebsiteBuilderSiteLinkItems(
    footerExtensionItems.legalLinks
  );
  const contactItems = normalizeWebsiteBuilderSiteStringItems(block.props.contactItems);
  return /* @__PURE__ */ jsx12(
    "footer",
    {
      className: clsx7(
        "w-full transition-colors duration-300",
        (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).shell
      ),
      children: /* @__PURE__ */ jsxs7("div", { className: "mx-auto flex w-full max-w-[var(--wb-site-max-width,1280px)] flex-col gap-5 px-[var(--wb-site-gutter,24px)] py-8 pb-12 sm:py-10 sm:pb-14", children: [
        /* @__PURE__ */ jsxs7("div", { className: "grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]", children: [
          /* @__PURE__ */ jsx12(
            "div",
            {
              className: clsx7(
                footerVariant === "minimal-air" ? "rounded-none border-0 border-b border-[var(--wb-site-border)] px-0 pb-6 pt-0 sm:px-0" : "rounded-[calc(var(--wb-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: /* @__PURE__ */ jsxs7("div", { className: "grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)]", children: [
                /* @__PURE__ */ jsx12("div", { className: "relative h-24 w-24 overflow-hidden rounded-[28px] border border-[var(--wb-site-border)] bg-[linear-gradient(180deg,rgba(15,118,110,0.16),rgba(15,118,110,0.04))]", children: block.props.logoImage ? /* @__PURE__ */ jsx12(
                  EditableImage,
                  {
                    blockId: block.id,
                    path: "logoImage",
                    className: "h-full w-full rounded-[28px]",
                    imageClassName: "h-full w-full object-contain p-3",
                    fallbackAlt: block.props.brandTitle
                  }
                ) : /* @__PURE__ */ jsx12("div", { className: "flex h-full items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--wb-site-accent)]", children: /* @__PURE__ */ jsx12(
                  EditableText,
                  {
                    blockId: block.id,
                    path: "brandTitle",
                    className: "text-[var(--wb-site-accent)]"
                  }
                ) }) }),
                /* @__PURE__ */ jsxs7("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx12(
                    EditableText,
                    {
                      blockId: block.id,
                      path: "brandTitle",
                      as: "h2",
                      className: clsx7(
                        "[font-family:var(--wb-site-heading-font)] text-3xl font-semibold tracking-[-0.05em]",
                        variant.text
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx12(
                    EditableTextarea,
                    {
                      blockId: block.id,
                      path: "brandBody",
                      className: clsx7("mt-4 leading-7", variant.muted)
                    }
                  )
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs7(
            "div",
            {
              className: clsx7(
                footerVariant === "minimal-air" ? "rounded-none border-0 px-0 py-0 sm:px-0" : "rounded-[calc(var(--wb-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                block.props.variant === "soft-cards" && !framelessSite ? "border-transparent bg-[linear-gradient(135deg,var(--wb-site-accent),color-mix(in srgb,var(--wb-site-accent) 72%, white))] text-white shadow-[0_28px_60px_rgba(15,118,110,0.24)]" : (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: [
                /* @__PURE__ */ jsxs7("div", { className: "max-w-xl", children: [
                  /* @__PURE__ */ jsx12(
                    EditableText,
                    {
                      blockId: block.id,
                      path: "subscriptionTitle",
                      as: "h3",
                      className: "[font-family:var(--wb-site-heading-font)] text-2xl font-semibold tracking-[-0.04em]"
                    }
                  ),
                  /* @__PURE__ */ jsx12(
                    EditableTextarea,
                    {
                      blockId: block.id,
                      path: "subscriptionBody",
                      className: clsx7(
                        "mt-3 leading-7",
                        isSoftCardsVariant ? "text-white/82" : variant.muted
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs7("div", { className: "mt-5 flex flex-col gap-3 sm:flex-row", children: [
                  /* @__PURE__ */ jsx12(
                    "div",
                    {
                      className: clsx7(
                        "flex min-h-14 flex-1 items-center px-4",
                        footerVariant === "minimal-air" ? "rounded-full border border-[var(--wb-site-border)] bg-white/72" : "rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
                      ),
                      children: /* @__PURE__ */ jsx12(
                        EditableText,
                        {
                          blockId: block.id,
                          path: "subscriptionPlaceholder",
                          className: clsx7(
                            "text-sm",
                            isSoftCardsVariant ? "text-white/74" : variant.muted
                          )
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxs7(
                    "button",
                    {
                      type: "button",
                      className: clsx7(
                        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-[0_18px_34px_rgba(15,23,42,0.12)]",
                        isSoftCardsVariant ? "bg-white text-[var(--wb-site-accent)]" : "bg-[var(--wb-site-accent)] text-white"
                      ),
                      children: [
                        /* @__PURE__ */ jsx12(Send, { className: "h-4 w-4" }),
                        /* @__PURE__ */ jsx12(
                          EditableText,
                          {
                            blockId: block.id,
                            path: "subscriptionButtonLabel",
                            className: clsx7(
                              isSoftCardsVariant ? "text-[var(--wb-site-accent)]" : "text-white"
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
        /* @__PURE__ */ jsxs7("div", { className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]", children: [
          /* @__PURE__ */ jsx12(
            "div",
            {
              className: clsx7(
                footerVariant === "minimal-air" ? "rounded-none border-0 border-b border-[var(--wb-site-border)] px-0 pb-6 pt-0 sm:px-0" : "rounded-[calc(var(--wb-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: /* @__PURE__ */ jsx12("div", { className: "grid gap-6 md:grid-cols-2", children: navigationColumns.map((column) => /* @__PURE__ */ jsxs7("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx12("div", { className: clsx7("text-sm font-semibold", variant.text), children: column.title }),
                /* @__PURE__ */ jsx12("div", { className: "space-y-2", children: column.links.map((link) => /* @__PURE__ */ jsx12(
                  WebsiteBuilderLink,
                  {
                    href: link.href,
                    className: clsx7(
                      "block text-sm transition hover:text-[var(--wb-site-accent)]",
                      variant.muted
                    ),
                    children: link.label
                  },
                  `${column.title}:${link.label}:${link.href}`
                )) })
              ] }, column.title)) })
            }
          ),
          /* @__PURE__ */ jsxs7(
            "div",
            {
              className: clsx7(
                footerVariant === "minimal-air" ? "rounded-none border-0 px-0 pt-0 sm:px-0" : "rounded-[calc(var(--wb-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: [
                /* @__PURE__ */ jsx12("div", { className: clsx7("text-sm font-semibold", variant.text), children: "Contacts" }),
                /* @__PURE__ */ jsx12("div", { className: "mt-4 space-y-3", children: contactItems.map((item) => /* @__PURE__ */ jsx12("div", { className: clsx7("text-sm leading-7", variant.muted), children: item }, item)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs7(
          "div",
          {
            className: clsx7(
              "flex flex-col gap-4 border-t pt-5 text-sm md:flex-row md:items-center md:justify-between",
              footerVariant === "classic-dark" ? "border-white/10" : "border-[var(--wb-site-border)]"
            ),
            children: [
              /* @__PURE__ */ jsx12(
                EditableText,
                {
                  blockId: block.id,
                  path: "copyrightLabel",
                  className: (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).muted
                }
              ),
              /* @__PURE__ */ jsxs7("div", { className: "flex flex-wrap items-center gap-4", children: [
                /* @__PURE__ */ jsxs7(
                  WebsiteBuilderLink,
                  {
                    href: block.props.legalHref,
                    className: clsx7(
                      "inline-flex items-center gap-2 transition hover:text-[var(--wb-site-accent)]",
                      (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).muted
                    ),
                    children: [
                      /* @__PURE__ */ jsx12(EditableText, { blockId: block.id, path: "legalLabel" }),
                      /* @__PURE__ */ jsx12(ArrowRight, { className: "h-4 w-4" })
                    ]
                  }
                ),
                legalLinks.map((link) => /* @__PURE__ */ jsxs7(
                  WebsiteBuilderLink,
                  {
                    href: link.href,
                    target: link.target,
                    rel: link.rel,
                    className: clsx7(
                      "inline-flex items-center gap-2 transition hover:text-[var(--wb-site-accent)]",
                      (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).muted
                    ),
                    children: [
                      link.label,
                      /* @__PURE__ */ jsx12(ArrowRight, { className: "h-4 w-4" })
                    ]
                  },
                  `${link.label}:${link.href}`
                )),
                /* @__PURE__ */ jsx12(
                  WebsiteBuilderLink,
                  {
                    href: block.props.developerHref,
                    className: clsx7(
                      "font-semibold transition hover:text-[var(--wb-site-accent)]",
                      (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).text
                    ),
                    children: /* @__PURE__ */ jsx12(EditableText, { blockId: block.id, path: "developerLabel" })
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
var siteFooterShellDefinition = defineWebsiteBuilderBlockDefinition({
  type: "site-footer-shell",
  label: "Site Footer Shell",
  labelKey: "websiteBuilder.system.siteFooter.block.label",
  description: "Shared footer with editorial brand copy, subscription card, navigation columns and legal row.",
  descriptionKey: "websiteBuilder.system.siteFooter.block.description",
  category: "Site Frame",
  icon: "panel-bottom",
  defaults: {
    variant: "classic-dark",
    brandTitle: createWebsiteBuilderLocalizedDefault({
      en: "Website Builder",
      ru: "Website Builder"
    }),
    brandBody: createWebsiteBuilderLocalizedDefault({
      en: "Package-first live website editing for teams that want reusable packages, clean package boundaries and real page composition.",
      ru: "Package-first \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0436\u0438\u0432\u043E\u0433\u043E \u0441\u0430\u0439\u0442\u0430 \u0434\u043B\u044F \u043A\u043E\u043C\u0430\u043D\u0434, \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u043D\u0443\u0436\u043D\u044B \u043F\u0435\u0440\u0435\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C\u044B\u0435 \u043F\u0430\u043A\u0435\u0442\u044B, \u0447\u0438\u0441\u0442\u044B\u0435 \u0433\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u0430\u043A\u0435\u0442\u043E\u0432 \u0438 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0430\u044F \u043A\u043E\u043C\u043F\u043E\u0437\u0438\u0446\u0438\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446."
    }),
    logoImage: null,
    subscriptionTitle: createWebsiteBuilderLocalizedDefault({
      en: "Get product notes and release updates",
      ru: "\u041F\u043E\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0440\u0435\u043B\u0438\u0437\u043E\u0432"
    }),
    subscriptionBody: createWebsiteBuilderLocalizedDefault({
      en: "Subscribe for major builder releases, new integration kits and architecture notes.",
      ru: "\u041F\u043E\u0434\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u043A\u0440\u0443\u043F\u043D\u044B\u0435 \u0440\u0435\u043B\u0438\u0437\u044B builder, \u043D\u043E\u0432\u044B\u0435 integration kits \u0438 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u043D\u044B\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438."
    }),
    subscriptionPlaceholder: createWebsiteBuilderLocalizedDefault({
      en: "Enter your email",
      ru: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 email"
    }),
    subscriptionButtonLabel: createWebsiteBuilderLocalizedDefault({
      en: "Subscribe",
      ru: "\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F"
    }),
    navigationColumns: createWebsiteBuilderLocalizedDefault({
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
    contactItems: createWebsiteBuilderLocalizedDefault({
      en: [
        "+7 (707) 040-43-43",
        "hello@example.test",
        "Almaty, Kazakhstan"
      ],
      ru: [
        "+7 (707) 040-43-43",
        "hello@example.test",
        "\u0410\u043B\u043C\u0430\u0442\u044B, \u041A\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043D"
      ]
    }),
    legalLabel: createWebsiteBuilderLocalizedDefault({
      en: "Privacy policy",
      ru: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"
    }),
    legalHref: "/privacy",
    copyrightLabel: createWebsiteBuilderLocalizedDefault({
      en: "Website Builder 2026",
      ru: "Website Builder 2026"
    }),
    developerLabel: createWebsiteBuilderLocalizedDefault({
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
import clsx9 from "clsx";
import { ArrowRight as ArrowRight2, LogIn, ShoppingCart } from "lucide-react";
import { useEffect as useEffect5, useRef as useRef4, useState as useState4 } from "react";

// src/search/website-builder-site-search.tsx
import clsx8 from "clsx";
import { Loader2, Search, X } from "lucide-react";
import {
  startTransition,
  useDeferredValue,
  useEffect as useEffect4,
  useMemo,
  useRef as useRef3,
  useState as useState3
} from "react";
import { Fragment as Fragment3, jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
var renderSnippetParts = (snippet, query) => {
  if (!query) {
    return [snippet];
  }
  const source = snippet.toLowerCase();
  const needle = query.toLowerCase();
  const matchIndex = source.indexOf(needle);
  if (matchIndex === -1) {
    return [snippet];
  }
  return [
    snippet.slice(0, matchIndex),
    snippet.slice(matchIndex, matchIndex + query.length),
    snippet.slice(matchIndex + query.length)
  ];
};
var WebsiteBuilderSiteSearch = ({
  blockId,
  placeholderPath,
  className
}) => {
  const { translate } = useWebsiteBuilderI18n();
  const { locale, contentLocale } = useWebsiteBuilderI18n();
  const canEdit = useWebsiteBuilderCanEdit();
  const searchSite = useWebsiteBuilderStore((state) => state.searchSite);
  const mode = useWebsiteBuilderStore((state) => state.mode);
  const isAdmin = useWebsiteBuilderStore((state) => state.isAdmin);
  const workspace = useWebsiteBuilderStore((state) => state.workspace);
  const placeholder = String(
    useWebsiteBuilderFieldValue(blockId, placeholderPath) ?? "Search the website"
  );
  const [open, setOpen] = useState3(false);
  const [query, setQuery] = useState3("");
  const [results, setResults] = useState3([]);
  const [loading, setLoading] = useState3(false);
  const [error, setError] = useState3(null);
  const searchInputRef = useRef3(null);
  const lastRequestId = useRef3(0);
  const handleDialogOpenAutoFocus = (event) => {
    event.preventDefault();
    searchInputRef.current?.focus();
  };
  const deferredQuery = useDeferredValue(query.trim());
  const canSearch = typeof searchSite === "function";
  const hasQuery = deferredQuery.length >= 2;
  const searchSections = useMemo(
    () => [
      {
        id: "results",
        items: results
      }
    ],
    [results]
  );
  const searchMenu = useKeyboardMenuController({
    items: results,
    getItemId: (result) => result.id,
    isOpen: open && !loading,
    onSelectItem: (result) => {
      const href = buildWebsiteBuilderSearchResultHref(
        result,
        deferredQuery || query.trim(),
        mode,
        isAdmin,
        {
          locale,
          contentLocale,
          currentSearchParams: typeof window === "undefined" ? void 0 : new URLSearchParams(window.location.search),
          workspaceSelection: workspace?.ref?.profileId ? {
            profileId: workspace.ref.profileId,
            branch: workspace.ref.branch,
            revisionId: workspace.ref.revisionId ?? null
          } : null
        }
      );
      const optionElement = searchMenu.getOptionElement(result.id);
      const linkElement = optionElement?.querySelector("[href]");
      setOpen(false);
      if (linkElement) {
        linkElement.click();
        return;
      }
      if (typeof window !== "undefined") {
        window.location.assign(href);
      }
    }
  });
  const summaryText = useMemo(() => {
    if (!hasQuery) {
      return translate(
        "websiteBuilder.search.hint",
        "Type at least 2 characters to search across static pages and publications."
      );
    }
    if (loading) {
      return translate(
        "websiteBuilder.search.loading",
        "Searching the live site surface\u2026"
      );
    }
    if (error) {
      return error;
    }
    if (results.length === 0) {
      return "No matches found for this query.";
    }
    return `${results.length} match${results.length === 1 ? "" : "es"} across the live site.`;
  }, [error, hasQuery, loading, results.length, translate]);
  useEffect4(() => {
    if (!open) {
      return;
    }
    searchInputRef.current?.focus();
  }, [open]);
  useEffect4(() => {
    if (!open || !canSearch) {
      return;
    }
    if (!hasQuery) {
      startTransition(() => {
        setResults([]);
        setLoading(false);
        setError(null);
      });
      return;
    }
    const requestId = lastRequestId.current + 1;
    lastRequestId.current = requestId;
    startTransition(() => {
      setLoading(true);
      setError(null);
    });
    void searchSite({
      query: deferredQuery,
      limit: 8
    }).then((nextResults) => {
      if (lastRequestId.current !== requestId) {
        return;
      }
      startTransition(() => {
        setResults(nextResults);
        setLoading(false);
      });
    }).catch(() => {
      if (lastRequestId.current !== requestId) {
        return;
      }
      startTransition(() => {
        setResults([]);
        setLoading(false);
        setError("Search is temporarily unavailable.");
      });
    });
  }, [canSearch, deferredQuery, hasQuery, open, searchSite]);
  if (!canSearch) {
    return /* @__PURE__ */ jsxs8(
      "div",
      {
        className: clsx8(
          "flex min-h-14 items-center gap-3 rounded-[24px] border border-[var(--wb-site-border)] bg-[var(--wb-site-background)] px-4",
          className
        ),
        children: [
          /* @__PURE__ */ jsx13(Search, { className: "h-4 w-4 shrink-0 text-[var(--wb-site-muted)]" }),
          /* @__PURE__ */ jsx13(
            EditableText,
            {
              blockId,
              path: placeholderPath,
              className: "text-sm text-[var(--wb-site-muted)]"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs8(Fragment3, { children: [
    /* @__PURE__ */ jsxs8(
      "div",
      {
        className: clsx8(
          "flex min-h-14 items-center gap-3 rounded-[24px] border border-[var(--wb-site-border)] bg-[var(--wb-site-background)] px-4",
          className
        ),
        children: [
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              onClick: () => setOpen(true),
              className: "inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--wb-site-muted)] transition hover:bg-black/5 hover:text-[var(--wb-site-text)]",
              "aria-label": translate(
                "websiteBuilder.search.open",
                "Search the website"
              ),
              children: /* @__PURE__ */ jsx13(Search, { className: "h-4 w-4" })
            }
          ),
          canEdit ? /* @__PURE__ */ jsx13(
            EditableText,
            {
              blockId,
              path: placeholderPath,
              className: "flex-1 text-sm text-[var(--wb-site-muted)]"
            }
          ) : /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              onClick: () => setOpen(true),
              className: "flex-1 cursor-pointer text-left text-sm text-[var(--wb-site-muted)]",
              children: placeholder
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx13(Root, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs8(
      DialogContent,
      {
        onOpenAutoFocus: handleDialogOpenAutoFocus,
        className: "w-[min(44rem,calc(100%-1.5rem))] gap-0 overflow-hidden rounded-[32px] border border-[var(--wb-site-border)] bg-[color-mix(in_oklab,var(--wb-site-surface)_96%,var(--wb-site-background))] p-0 text-[var(--wb-site-text)] shadow-[0_40px_140px_rgba(0,0,0,0.28)]",
        children: [
          /* @__PURE__ */ jsxs8("div", { className: "sr-only", children: [
            /* @__PURE__ */ jsx13(DialogTitle, { children: translate(
              "websiteBuilder.search.dialogTitle",
              "Search the website"
            ) }),
            /* @__PURE__ */ jsx13(DialogDescription, { children: translate(
              "websiteBuilder.search.dialogDescription",
              "Find exact matches across static pages and publication pages."
            ) })
          ] }),
          /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-3 border-b border-[var(--wb-site-border)] px-5 py-4", children: [
            /* @__PURE__ */ jsx13(Search, { className: "h-5 w-5 shrink-0 text-[var(--wb-site-muted-text)]" }),
            /* @__PURE__ */ jsx13(
              "input",
              {
                ref: searchInputRef,
                value: query,
                onChange: (event) => setQuery(event.currentTarget.value),
                onKeyDown: searchMenu.handleKeyDown,
                placeholder,
                role: "combobox",
                "aria-autocomplete": "list",
                "aria-controls": searchMenu.listId,
                "aria-expanded": open,
                "aria-activedescendant": searchMenu.activeOptionId,
                className: "min-w-0 flex-1 border-0 bg-transparent text-base text-[var(--wb-site-text)] outline-none placeholder:text-[color-mix(in_srgb,var(--wb-site-muted-text)_72%,transparent)]"
              }
            ),
            /* @__PURE__ */ jsx13(
              "button",
              {
                type: "button",
                onClick: () => setOpen(false),
                className: "inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--wb-site-muted-text)] transition hover:bg-[color-mix(in_oklab,var(--wb-site-border)_38%,transparent)] hover:text-[var(--wb-site-text)]",
                "aria-label": "Close search",
                children: /* @__PURE__ */ jsx13(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx13("div", { className: "border-b border-[var(--wb-site-border)] px-5 py-3 text-sm text-[var(--wb-site-muted-text)]", children: summaryText }),
          /* @__PURE__ */ jsx13("div", { className: "max-h-[24rem] overflow-y-auto px-3 py-3", children: loading ? /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-3 rounded-[24px] border border-[var(--wb-site-border)] bg-[color-mix(in_oklab,var(--wb-site-surface)_86%,var(--wb-site-background))] px-4 py-4 text-sm text-[var(--wb-site-muted-text)]", children: [
            /* @__PURE__ */ jsx13(Loader2, { className: "h-4 w-4 animate-spin text-[var(--wb-site-accent)]" }),
            /* @__PURE__ */ jsx13("span", { children: "Searching the live site surface\u2026" })
          ] }) : /* @__PURE__ */ jsx13(
            KeyboardMenuList,
            {
              controller: searchMenu,
              sections: searchSections,
              getItemId: (result) => result.id,
              listLabel: "Website search results",
              className: "space-y-2",
              emptyState: /* @__PURE__ */ jsx13("div", { className: "rounded-[24px] border border-dashed border-[var(--wb-site-border)] bg-[color-mix(in_oklab,var(--wb-site-surface)_86%,var(--wb-site-background))] px-4 py-8 text-center text-sm leading-7 text-[var(--wb-site-muted-text)]", children: hasQuery ? "No blocks matched this query yet." : "Search static page copy and publication content from the live site shell." }),
              renderItem: (result, { isActive }) => {
                const snippetParts = renderSnippetParts(
                  result.snippet,
                  deferredQuery || query.trim()
                );
                return /* @__PURE__ */ jsx13("div", { "data-wb-search-result-id": result.id, children: /* @__PURE__ */ jsxs8(
                  WebsiteBuilderLink,
                  {
                    navigateInPreviewOnly: false,
                    href: buildWebsiteBuilderSearchResultHref(
                      result,
                      deferredQuery || query.trim(),
                      mode,
                      isAdmin,
                      {
                        locale,
                        contentLocale,
                        currentSearchParams: typeof window === "undefined" ? void 0 : new URLSearchParams(window.location.search),
                        workspaceSelection: workspace?.ref?.profileId ? {
                          profileId: workspace.ref.profileId,
                          branch: workspace.ref.branch,
                          revisionId: workspace.ref.revisionId ?? null
                        } : null
                      }
                    ),
                    onClick: () => setOpen(false),
                    className: clsx8(
                      "block rounded-[24px] border px-4 py-4 transition",
                      isActive ? "border-[var(--wb-site-accent)] bg-[color-mix(in_oklab,var(--wb-site-accent)_14%,var(--wb-site-surface))]" : "border-[var(--wb-site-border)] bg-[color-mix(in_oklab,var(--wb-site-surface)_86%,var(--wb-site-background))] hover:border-[color-mix(in_oklab,var(--wb-site-accent)_46%,var(--wb-site-border))] hover:bg-[color-mix(in_oklab,var(--wb-site-accent)_10%,var(--wb-site-surface))]"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs8("div", { className: "flex items-start justify-between gap-4", children: [
                        /* @__PURE__ */ jsxs8("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsx13("div", { className: "text-sm font-semibold text-[var(--wb-site-text)]", children: result.pageName }),
                          /* @__PURE__ */ jsx13("div", { className: "mt-1 text-[11px] uppercase tracking-[0.24em] text-[var(--wb-site-muted-text)]", children: result.route })
                        ] }),
                        /* @__PURE__ */ jsx13("div", { className: "shrink-0 rounded-full border border-[var(--wb-site-border)] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--wb-site-muted-text)]", children: result.pageKind })
                      ] }),
                      /* @__PURE__ */ jsxs8("div", { className: "mt-3 text-sm leading-7 text-[var(--wb-site-muted-text)]", children: [
                        snippetParts[0],
                        snippetParts[1] ? /* @__PURE__ */ jsx13("mark", { className: "rounded-full bg-[color-mix(in_oklab,var(--wb-site-accent)_24%,var(--wb-site-surface))] px-1.5 py-0.5 text-[var(--wb-site-text)]", children: snippetParts[1] }) : null,
                        snippetParts[2] ?? ""
                      ] })
                    ]
                  }
                ) });
              }
            }
          ) })
        ]
      }
    ) })
  ] });
};

// src/modules/system/site/site-header-shell-definition.tsx
import { jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
var getHeaderLinkPathname = (href) => {
  const cleanHref = href.trim();
  if (!cleanHref.startsWith("/") || cleanHref.startsWith("//")) {
    return cleanHref;
  }
  return (cleanHref.split(/[?#]/u)[0] ?? "/").replace(/\/+$/u, "") || "/";
};
var isCartLinkHref = (href) => getHeaderLinkPathname(href) === "/cart";
var isProtectedAccountHref = (href) => {
  const pathname = getHeaderLinkPathname(href);
  return pathname === "/account" || pathname.startsWith("/account/");
};
var getHeaderCartQuantity = (resources) => {
  const summary = resources.commerceCartSummary;
  const quantity = Number(summary?.items_quantity ?? summary?.item_count ?? 0);
  return Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 0;
};
var hasAuthenticatedUser = (resources) => {
  const auth = resources.auth;
  return Boolean(auth?.user);
};
var hasCommerceBlock = (blocks) => (blocks ?? []).some((item) => {
  if (item.module === "commerce-website-builder") {
    return true;
  }
  return (item.areas ?? []).some((area) => hasCommerceBlock(area.blocks));
});
var hasCommerceRuntimeResource = (resources) => [
  "commerceCatalog",
  "commerceCatalogItem",
  "commerceProduct",
  "commerceCheckout",
  "commerceOrder"
].some((key) => resources[key] !== void 0) || getHeaderCartQuantity(resources) > 0;
var isCommerceExtensionId = (id) => typeof id === "string" && id.startsWith("commerce");
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
  { path: "brandLabel", label: "Brand label", kind: "text", group: "content", localization: "localized" },
  { path: "brandHref", label: "Brand href", kind: "url", group: "content", localization: "shared" },
  { path: "logoImage", label: "Logo image", kind: "image", group: "content", localization: "shared" },
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
    labelKey: "websiteBuilder.system.siteHeader.showLocaleSwitcher.label",
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
  const isAdmin = useWebsiteBuilderStore((state) => state.isAdmin);
  const mode = useWebsiteBuilderStore((state) => state.mode);
  const currentRoute = useWebsiteBuilderStore((state) => state.document.route);
  const currentBlocks = useWebsiteBuilderStore((state) => state.document.blocks);
  const requestAuth = useWebsiteBuilderStore((state) => state.requestAuth);
  const resources = useWebsiteBuilderStore((state) => state.resources);
  const siteRegions = useWebsiteBuilderStore((state) => state.site.regions);
  const siteDesign = useWebsiteBuilderStore((state) => state.site.settings.design);
  const siteFrameExtensions = useWebsiteBuilderStore(
    (state) => state.siteFrameExtensions
  );
  const { locale, publicLocales, translate } = useWebsiteBuilderI18n();
  const [isCompact, setIsCompact] = useState4(false);
  const headerRef = useRef4(null);
  const disabledExtensionIds = normalizeWebsiteBuilderSiteStringItems(
    block.props.disabledExtensionIds
  );
  const disabledExtensionItemIds = normalizeWebsiteBuilderSiteStringItems(
    block.props.disabledExtensionItemIds
  );
  const headerExtensionItems = collectWebsiteBuilderHeaderExtensionItems(
    resolveWebsiteBuilderSiteFrameExtensions(
      siteFrameExtensions,
      disabledExtensionIds
    ).filter(
      (extension) => !isCommerceExtensionId(extension.id) || hasCommerceBlock(currentBlocks) || Object.values(siteRegions).some(
        (region) => hasCommerceBlock(region.document.blocks)
      ) || hasCommerceRuntimeResource(resources)
    ),
    disabledExtensionItemIds
  );
  const utilityLinks = [
    ...normalizeWebsiteBuilderSiteLinkItems(block.props.utilityLinks),
    ...normalizeWebsiteBuilderSiteLinkItems(headerExtensionItems.utilityLinks)
  ];
  const extensionCategoryLinks = normalizeWebsiteBuilderSiteLinkItems(
    headerExtensionItems.categoryLinks
  );
  const commerceCatalogLink = extensionCategoryLinks.find(
    (link) => link.id === "commerce:catalog-link" || getHeaderLinkPathname(link.href) === "/catalog"
  ) ?? null;
  const categoryLinks = [
    ...normalizeWebsiteBuilderSiteLinkItems(block.props.categoryLinks),
    ...extensionCategoryLinks.filter((link) => link !== commerceCatalogLink)
  ];
  const extensionActions = headerExtensionItems.actions;
  const hasExtensionAuthAction = extensionActions.some(
    (action) => (action.kind ?? "link") === "auth"
  );
  const variant = block.props.variant ?? "commerce-inline";
  const liveSurfaceMode = mode !== "builder";
  const compact = liveSurfaceMode && block.props.compactOnScroll && isCompact;
  const framelessSite = isWebsiteBuilderFramelessSiteDesign(siteDesign);
  const isShowcaseCard = variant === "showcase-card" && !framelessSite;
  const localeSwitcherVisible = block.props.showLocaleSwitcher !== false && publicLocales.length > 1;
  const authenticatedUser = hasAuthenticatedUser(resources);
  const [cartQuantity, setCartQuantity] = useState4(
    () => getHeaderCartQuantity(resources)
  );
  const renderCartLink = (href, label, className, key) => /* @__PURE__ */ jsxs9(
    WebsiteBuilderLink,
    {
      href,
      "aria-label": label,
      "data-wb-header-cart-link": "true",
      className: clsx9(
        "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--wb-site-border)] text-[var(--wb-site-text)] transition hover:border-[var(--wb-site-accent)] hover:text-[var(--wb-site-accent)]",
        className
      ),
      children: [
        /* @__PURE__ */ jsx14(ShoppingCart, { className: "h-5 w-5" }),
        cartQuantity > 0 ? /* @__PURE__ */ jsx14("span", { className: "absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--wb-site-accent)] px-1 text-[10px] font-bold leading-none text-white", children: cartQuantity > 99 ? "99+" : cartQuantity }) : null
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
    return /* @__PURE__ */ jsx14(
      WebsiteBuilderLink,
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
    const className = clsx9(
      "inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition",
      appearance === "primary" ? "bg-[var(--wb-site-accent)] text-white shadow-[0_18px_34px_rgba(15,118,110,0.28)] hover:translate-y-[-1px]" : appearance === "ghost" ? "text-[var(--wb-site-text)] hover:text-[var(--wb-site-accent)]" : "border border-[var(--wb-site-border)] text-[var(--wb-site-text)] hover:border-[var(--wb-site-accent)] hover:text-[var(--wb-site-accent)]"
    );
    if ((action.kind ?? "link") === "auth") {
      return /* @__PURE__ */ jsx14(
        "button",
        {
          type: "button",
          onClick: requestAuth,
          className: clsx9(className, "cursor-pointer"),
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
  useEffect5(() => {
    if (typeof window === "undefined" || !block.props.compactOnScroll || !liveSurfaceMode) {
      setIsCompact(false);
      return;
    }
    const sync = () => setIsCompact(window.scrollY > 36);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, [block.props.compactOnScroll, liveSurfaceMode]);
  useEffect5(() => {
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
  useEffect5(() => {
    if (typeof window === "undefined") {
      return;
    }
    const root = window.document.documentElement instanceof HTMLElement ? window.document.documentElement : null;
    if (!root) {
      return;
    }
    const syncHeaderHeight = () => {
      root.style.setProperty(
        "--wb-site-header-height",
        liveSurfaceMode && block.props.sticky && headerRef.current ? `${headerRef.current.offsetHeight}px` : "0px"
      );
    };
    syncHeaderHeight();
    if (!headerRef.current || typeof ResizeObserver === "undefined") {
      return () => {
        root.style.setProperty("--wb-site-header-height", "0px");
      };
    }
    const observer = new ResizeObserver(() => {
      syncHeaderHeight();
    });
    observer.observe(headerRef.current);
    return () => {
      observer.disconnect();
      root.style.setProperty("--wb-site-header-height", "0px");
    };
  }, [block.props.sticky, liveSurfaceMode, compact, localeSwitcherVisible]);
  return /* @__PURE__ */ jsx14(
    "header",
    {
      ref: headerRef,
      className: clsx9(
        "relative",
        liveSurfaceMode && "z-40",
        isShowcaseCard ? "pt-[var(--wb-site-gutter,24px)]" : "pt-0"
      ),
      children: /* @__PURE__ */ jsxs9(
        "div",
        {
          className: clsx9(
            "border-b border-[var(--wb-site-border)] text-[var(--wb-site-text)] transition-[box-shadow,background-color,border-radius] duration-300",
            framelessSite ? clsx9(
              "rounded-none border-x-0 border-t-0 bg-[color-mix(in_srgb,var(--wb-site-surface)_92%,white)] shadow-none",
              block.props.sticky && compact && "bg-[color-mix(in_srgb,var(--wb-site-surface)_96%,white)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            ) : isShowcaseCard ? "mx-auto max-w-[calc(var(--wb-site-max-width,1280px)+var(--wb-site-gutter,24px)*2)] rounded-[calc(var(--wb-site-radius,24px)+10px)] border shadow-[0_28px_70px_rgba(15,23,42,0.08)]" : clsx9(
              "rounded-none border-x-0 border-t-0 bg-[var(--wb-site-surface)] shadow-[0_18px_40px_rgba(15,23,42,0.06)]",
              block.props.sticky && compact && "shadow-[0_20px_54px_rgba(15,23,42,0.12)]"
            )
          ),
          children: [
            /* @__PURE__ */ jsx14(
              "div",
              {
                className: clsx9(
                  "mx-auto w-full max-w-[calc(var(--wb-site-max-width,1280px)+var(--wb-site-gutter,24px)*2)] transition-[padding,gap] duration-300",
                  framelessSite ? compact ? "px-[var(--wb-site-gutter,24px)] py-3" : "px-[var(--wb-site-gutter,24px)] py-4" : isShowcaseCard ? compact ? "px-4 py-3" : "px-5 py-4 sm:px-6" : compact ? "px-[var(--wb-site-gutter,24px)] py-3" : "px-[var(--wb-site-gutter,24px)] py-4"
                ),
                children: /* @__PURE__ */ jsxs9("div", { className: "flex flex-col gap-4", children: [
                  /* @__PURE__ */ jsxs9("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [
                    /* @__PURE__ */ jsx14("div", { className: "flex flex-wrap items-center gap-3 text-sm text-[var(--wb-site-muted)]", children: utilityLinks.map(
                      (link) => renderSmartLink(
                        link,
                        clsx9(
                          "transition hover:text-[var(--wb-site-text)]",
                          isCartLinkHref(link.href) && "h-8 w-8 border-transparent"
                        ),
                        `${link.label}:${link.href}`
                      )
                    ) }),
                    /* @__PURE__ */ jsxs9("div", { className: "flex flex-wrap items-center gap-3 text-sm", children: [
                      localeSwitcherVisible ? /* @__PURE__ */ jsxs9(
                        "div",
                        {
                          "data-wb-locale-switcher": "true",
                          className: "flex flex-wrap items-center gap-2 rounded-full border border-[var(--wb-site-border)] bg-[var(--wb-site-background)] px-2 py-2",
                          children: [
                            /* @__PURE__ */ jsx14("div", { className: "px-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--wb-site-muted)]", children: translate(
                              "websiteBuilder.localeSwitcher.label",
                              "Language"
                            ) }),
                            publicLocales.map((item) => /* @__PURE__ */ jsx14(
                              WebsiteBuilderLink,
                              {
                                href: currentRoute,
                                locale: item.code,
                                "data-wb-locale-option": item.code,
                                className: clsx9(
                                  "rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
                                  item.code === locale ? "bg-[var(--wb-site-accent)] text-white" : "text-[var(--wb-site-muted)] hover:text-[var(--wb-site-text)]"
                                ),
                                children: item.label
                              },
                              item.code
                            ))
                          ]
                        }
                      ) : null,
                      /* @__PURE__ */ jsx14(
                        EditableText,
                        {
                          blockId: block.id,
                          path: "contactCaption",
                          className: "text-[var(--wb-site-muted)]"
                        }
                      ),
                      /* @__PURE__ */ jsx14(
                        EditableText,
                        {
                          blockId: block.id,
                          path: "contactValue",
                          className: "font-semibold text-[var(--wb-site-text)]"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs9(
                    "div",
                    {
                      className: clsx9(
                        "grid gap-4 lg:items-center",
                        commerceCatalogLink ? "lg:grid-cols-[auto_auto_minmax(280px,1fr)_auto]" : "lg:grid-cols-[auto_minmax(280px,1fr)_auto]"
                      ),
                      children: [
                        /* @__PURE__ */ jsxs9(
                          WebsiteBuilderLink,
                          {
                            href: block.props.brandHref,
                            className: "flex min-w-0 items-center gap-3",
                            children: [
                              /* @__PURE__ */ jsx14("div", { className: "relative h-16 w-16 overflow-hidden rounded-[22px] border border-[var(--wb-site-border)] bg-[linear-gradient(180deg,rgba(15,118,110,0.14),rgba(15,118,110,0.03))]", children: block.props.logoImage ? /* @__PURE__ */ jsx14(
                                EditableImage,
                                {
                                  blockId: block.id,
                                  path: "logoImage",
                                  className: "h-full w-full rounded-[22px]",
                                  imageClassName: "h-full w-full object-contain p-2",
                                  fallbackAlt: block.props.brandLabel
                                }
                              ) : /* @__PURE__ */ jsx14("div", { className: "flex h-full items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--wb-site-accent)]", children: /* @__PURE__ */ jsx14(
                                EditableText,
                                {
                                  blockId: block.id,
                                  path: "brandLabel",
                                  className: "text-[var(--wb-site-accent)]"
                                }
                              ) }) }),
                              /* @__PURE__ */ jsxs9("div", { className: "min-w-0", children: [
                                /* @__PURE__ */ jsx14(
                                  EditableText,
                                  {
                                    blockId: block.id,
                                    path: "brandLabel",
                                    as: "div",
                                    className: "[font-family:var(--wb-site-heading-font)] text-2xl font-semibold tracking-[-0.04em]"
                                  }
                                ),
                                isShowcaseCard ? /* @__PURE__ */ jsx14("div", { className: "mt-1 text-xs uppercase tracking-[0.24em] text-[var(--wb-site-muted)]", children: "Live site frame" }) : null
                              ] })
                            ]
                          }
                        ),
                        commerceCatalogLink ? /* @__PURE__ */ jsxs9(
                          WebsiteBuilderLink,
                          {
                            href: commerceCatalogLink.href,
                            className: "inline-flex items-center gap-2 rounded-full border border-[var(--wb-site-border)] bg-[var(--wb-site-background)] px-4 py-3 text-sm font-semibold text-[var(--wb-site-text)] transition hover:border-[var(--wb-site-accent)] hover:text-[var(--wb-site-accent)]",
                            children: [
                              /* @__PURE__ */ jsx14("div", { className: "h-2.5 w-2.5 rounded-full bg-[var(--wb-site-accent)]" }),
                              /* @__PURE__ */ jsx14(
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
                        /* @__PURE__ */ jsx14(
                          WebsiteBuilderSiteSearch,
                          {
                            blockId: block.id,
                            placeholderPath: "searchPlaceholder"
                          }
                        ),
                        /* @__PURE__ */ jsxs9("div", { className: "flex flex-wrap items-center justify-start gap-2 lg:justify-end", children: [
                          isCartLinkHref(block.props.secondaryCtaHref) ? renderCartLink(
                            block.props.secondaryCtaHref,
                            block.props.secondaryCtaLabel,
                            void 0,
                            "secondary-cart"
                          ) : !authenticatedUser && isProtectedAccountHref(block.props.secondaryCtaHref) ? null : /* @__PURE__ */ jsx14(
                            WebsiteBuilderLink,
                            {
                              href: block.props.secondaryCtaHref,
                              className: "inline-flex items-center gap-2 rounded-full border border-[var(--wb-site-border)] px-4 py-3 text-sm font-semibold text-[var(--wb-site-text)] transition hover:border-[var(--wb-site-accent)] hover:text-[var(--wb-site-accent)]",
                              children: /* @__PURE__ */ jsx14(
                                EditableText,
                                {
                                  blockId: block.id,
                                  path: "secondaryCtaLabel",
                                  className: "font-semibold"
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxs9(
                            WebsiteBuilderLink,
                            {
                              href: block.props.primaryCtaHref,
                              className: "inline-flex items-center gap-2 rounded-full bg-[var(--wb-site-accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(15,118,110,0.28)] transition hover:translate-y-[-1px]",
                              children: [
                                /* @__PURE__ */ jsx14(
                                  EditableText,
                                  {
                                    blockId: block.id,
                                    path: "primaryCtaLabel",
                                    className: "font-semibold text-white"
                                  }
                                ),
                                /* @__PURE__ */ jsx14(ArrowRight2, { className: "h-4 w-4" })
                              ]
                            }
                          ),
                          extensionActions.map(renderExtensionAction),
                          block.props.showLoginAction && !isAdmin && !hasExtensionAuthAction ? /* @__PURE__ */ jsxs9(
                            "button",
                            {
                              type: "button",
                              onClick: requestAuth,
                              className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--wb-site-border)] bg-[var(--wb-site-surface)] px-4 py-3 text-sm font-semibold text-[var(--wb-site-text)] transition hover:border-[var(--wb-site-accent)] hover:text-[var(--wb-site-accent)]",
                              children: [
                                /* @__PURE__ */ jsx14(LogIn, { className: "h-4 w-4" }),
                                /* @__PURE__ */ jsx14(
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
            categoryLinks.length > 0 ? /* @__PURE__ */ jsx14(
              "div",
              {
                className: clsx9(
                  "border-t border-[var(--wb-site-border)]",
                  framelessSite && "bg-transparent"
                ),
                children: /* @__PURE__ */ jsx14("div", { className: "mx-auto w-full max-w-[calc(var(--wb-site-max-width,1280px)+var(--wb-site-gutter,24px)*2)] px-[var(--wb-site-gutter,24px)] py-4", children: /* @__PURE__ */ jsx14("div", { className: "flex flex-wrap gap-2", children: categoryLinks.map((link) => renderSmartLink(
                  link,
                  clsx9(
                    "rounded-full border border-[var(--wb-site-border)] px-4 py-2 text-sm text-[var(--wb-site-text)] transition hover:border-[var(--wb-site-accent)] hover:text-[var(--wb-site-accent)]",
                    framelessSite ? "bg-transparent" : isShowcaseCard ? "bg-[var(--wb-site-background)]" : "bg-white/0",
                    isCartLinkHref(link.href) && "h-10 w-10 px-0 py-0"
                  ),
                  `${link.label}:${link.href}`
                )) }) })
              }
            ) : null
          ]
        }
      )
    }
  );
};
var siteHeaderShellDefinition = defineWebsiteBuilderBlockDefinition({
  type: "site-header-shell",
  label: "Site Header Shell",
  labelKey: "websiteBuilder.system.siteHeader.block.label",
  description: "Shared live-site header with utility links, search, contact actions and an admin sign-in entrypoint.",
  descriptionKey: "websiteBuilder.system.siteHeader.block.description",
  category: "Site Frame",
  icon: "panel-top",
  defaults: {
    variant: "commerce-inline",
    brandLabel: createWebsiteBuilderLocalizedDefault({
      en: "Website Builder",
      ru: "Website Builder"
    }),
    brandHref: "/",
    logoImage: null,
    utilityLinks: createWebsiteBuilderLocalizedDefault({
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
    catalogLabel: createWebsiteBuilderLocalizedDefault({
      en: "Catalog",
      ru: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433"
    }),
    searchPlaceholder: createWebsiteBuilderLocalizedDefault({
      en: "Search the website",
      ru: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0441\u0430\u0439\u0442\u0443"
    }),
    contactValue: "+7 (707) 040-43-43",
    contactCaption: createWebsiteBuilderLocalizedDefault({
      en: "Daily from 09:00 to 18:00",
      ru: "\u0415\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E \u0441 09:00 \u0434\u043E 18:00"
    }),
    primaryCtaLabel: createWebsiteBuilderLocalizedDefault({
      en: "Contact us",
      ru: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F"
    }),
    primaryCtaHref: "/contacts",
    secondaryCtaLabel: createWebsiteBuilderLocalizedDefault({
      en: "WhatsApp",
      ru: "WhatsApp"
    }),
    secondaryCtaHref: "https://wa.me/77070404343",
    showLoginAction: true,
    loginLabel: createWebsiteBuilderLocalizedDefault({
      en: "Admin sign in",
      ru: "\u0412\u0445\u043E\u0434 \u0434\u043B\u044F \u0430\u0434\u043C\u0438\u043D\u0430"
    }),
    sticky: true,
    compactOnScroll: true,
    showLocaleSwitcher: true,
    disabledExtensionIds: [],
    disabledExtensionItemIds: [],
    categoryLinks: createWebsiteBuilderLocalizedDefault({
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
import { jsx as jsx15, jsxs as jsxs10 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs10(
    "section",
    {
      className: clsx10(
        "min-w-0 px-6 py-8 sm:px-8 sm:py-10",
        framelessSurface ? "rounded-none border-0 bg-transparent text-[var(--wb-site-text)] shadow-none" : "rounded-[38px] border shadow-[0_28px_90px_rgba(2,12,27,0.16)]",
        !framelessSurface && surface
      ),
      style: framelessSurface ? getWebsiteBuilderSurfaceModeStyle("bleed") : void 0,
      children: [
        /* @__PURE__ */ jsxs10("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx15(
            EditableText,
            {
              blockId: block.id,
              path: "eyebrow",
              className: clsx10(
                "text-[11px] font-semibold uppercase tracking-[0.3em]",
                framelessSurface ? "text-[var(--wb-site-muted)]" : block.props.surface === "bright" ? "text-slate-500" : "text-cyan-100/70"
              )
            }
          ),
          /* @__PURE__ */ jsx15(
            EditableText,
            {
              blockId: block.id,
              path: "title",
              as: "h2",
              className: clsx10(
                "mt-4 block text-balance text-3xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-4xl xl:text-5xl",
                framelessSurface ? "text-[var(--wb-site-text)]" : block.props.surface === "bright" ? "text-slate-950" : "text-white"
              )
            }
          ),
          /* @__PURE__ */ jsx15(
            EditableTextarea,
            {
              blockId: block.id,
              path: "body",
              className: clsx10(
                "mt-5 text-base leading-8",
                framelessSurface ? "text-[var(--wb-site-muted)]" : block.props.surface === "bright" ? "text-slate-600" : "text-slate-300"
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsx15(
          "div",
          {
            className: "mt-8 grid grid-cols-1 items-start gap-[var(--wb-layout-gap)] lg:[grid-template-columns:var(--wb-layout-columns)]",
            style: {
              "--wb-layout-columns": templateColumns || "minmax(0,1fr)",
              "--wb-layout-gap": `${block.props.gap || 24}px`
            },
            children: areas.map((area, index) => {
              const column = getColumnConfig(columns, area, index);
              return /* @__PURE__ */ jsx15(
                "div",
                {
                  className: clsx10(
                    "min-w-0",
                    column.sticky && stickyPreviewEnabled && "lg:sticky lg:self-start"
                  ),
                  style: column.sticky && stickyPreviewEnabled ? {
                    top: "calc(var(--wb-dock-offset, 0px) + var(--wb-site-header-offset, 0px) + var(--wb-site-header-height, 0px) + 0.75rem)"
                  } : void 0,
                  children: /* @__PURE__ */ jsxs10(
                    "div",
                    {
                      className: clsx10(
                        "relative isolate min-w-0 px-0 py-0",
                        framelessSurface ? "rounded-none border-0 bg-transparent shadow-none" : block.props.surface === "bright" ? "border-0 bg-transparent shadow-none" : "border-0 bg-transparent shadow-none"
                      ),
                      children: [
                        column.label?.trim() ? /* @__PURE__ */ jsx15(
                          "div",
                          {
                            className: clsx10(
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
  decomposeWebsiteBuilderSurfaceDocument,
  defineWebsiteBuilderBlockDefinition,
  duplicateWebsiteBuilderBlockInDocument,
  findWebsiteBuilderBlock,
  getFirstWebsiteBuilderBlockId,
  getFirstWebsiteBuilderSurfaceEditableBlockId,
  getValueAtPath,
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
