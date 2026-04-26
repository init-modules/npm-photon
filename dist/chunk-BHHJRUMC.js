import {
  MediaStateChip
} from "./chunk-RLJXTXGN.js";
import {
  builderInputClassName,
  createActivationProps,
  editableFrameClassName
} from "./chunk-3DINFRWK.js";
import {
  usePhotonCanEdit,
  usePhotonFieldValue,
  usePhotonStore
} from "./chunk-BJK5VDXG.js";
import {
  isPhotonMediaValue,
  resolvePhotonMediaPreviewUrl
} from "./chunk-QQDDM7OM.js";
import {
  createPhotonNodeId
} from "./chunk-P4O7POLV.js";

// src/components/editable/editable-gallery.tsx
import clsx2 from "clsx";
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
      "data-testid": "photon-editable-gallery-add-card",
      className: `flex min-h-[18rem] cursor-pointer flex-col items-center justify-center gap-3 rounded-[34px] border border-dashed px-6 py-8 text-center transition ${className ?? ""}`,
      style: {
        borderColor: "var(--photon-gallery-add-border, rgba(34,211,238,0.18))",
        background: "var(--photon-gallery-add-bg, radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_52%),linear-gradient(180deg,rgba(8,18,31,0.84),rgba(6,13,24,0.94)))",
        color: "var(--photon-gallery-add-text, rgba(255,255,255,0.55))"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${buttonClassName ?? ""}`,
            style: {
              borderColor: "var(--photon-gallery-add-button-border, rgba(34,211,238,0.18))",
              background: "var(--photon-gallery-add-button-bg, rgba(34,211,238,0.1))",
              color: "var(--photon-gallery-add-button-text, rgb(207 250 254))"
            },
            children: isUploading ? "Uploading..." : "Add media"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `text-base font-semibold ${titleClassName ?? ""}`,
            style: { color: "var(--photon-gallery-add-title, rgba(255,255,255,0.84))" },
            children: "Expand the gallery without leaving the page"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `max-w-sm text-sm leading-7 ${bodyClassName ?? ""}`,
            style: { color: "var(--photon-gallery-add-body, rgba(255,255,255,0.48))" },
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
      "data-testid": "photon-editable-gallery-empty-state",
      className: `flex min-h-[18rem] flex-col items-center justify-center gap-3 rounded-[34px] border border-dashed px-6 py-8 text-center ${className ?? ""}`,
      style: {
        borderColor: "var(--photon-gallery-empty-border, rgba(255,255,255,0.12))",
        background: "var(--photon-gallery-empty-bg, radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_44%),linear-gradient(180deg,rgba(9,18,31,0.92),rgba(6,12,22,0.98)))",
        color: "var(--photon-gallery-empty-text, rgba(255,255,255,0.55))",
        boxShadow: "var(--photon-gallery-empty-shadow, 0 24px 54px rgba(0,0,0,0.2))"
      },
      children: [
        /* @__PURE__ */ jsx2(
          "div",
          {
            className: `text-base font-semibold ${titleClassName ?? ""}`,
            style: {
              color: "var(--photon-gallery-empty-title, rgba(255,255,255,0.82))"
            },
            children: emptyTitle
          }
        ),
        /* @__PURE__ */ jsx2(
          "div",
          {
            className: `max-w-sm text-sm leading-7 ${bodyClassName ?? ""}`,
            style: {
              color: "var(--photon-gallery-empty-body, rgba(255,255,255,0.48))"
            },
            children: emptyBody
          }
        ),
        isEditable ? /* @__PURE__ */ jsxs2("label", { className: "inline-flex cursor-pointer items-center rounded-full", children: [
          /* @__PURE__ */ jsx2(
            "div",
            {
              className: `rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${buttonClassName ?? ""}`,
              style: {
                borderColor: "var(--photon-gallery-empty-button-border, rgba(34,211,238,0.18))",
                background: "var(--photon-gallery-empty-button-bg, rgba(34,211,238,0.1))",
                color: "var(--photon-gallery-empty-button-text, rgb(207 250 254))"
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
import clsx from "clsx";
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
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
  const mediaValue = isPhotonMediaValue(item.media) ? item.media : null;
  const previewUrl = resolvePhotonMediaPreviewUrl(item.media);
  const isHeroItem = items.length >= 3 && index === 0;
  const isEditingItem = isEditable && isActive;
  return /* @__PURE__ */ jsxs3(
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
        /* @__PURE__ */ jsxs3(
          "div",
          {
            className: clsx(
              "relative overflow-hidden",
              isHeroItem ? "aspect-[16/10]" : "aspect-[4/3]"
            ),
            children: [
              previewUrl ? /* @__PURE__ */ jsx3(
                "img",
                {
                  src: previewUrl,
                  alt: item.alt || `Gallery image ${index + 1}`,
                  className: "h-full w-full object-cover"
                }
              ) : /* @__PURE__ */ jsx3(
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
              ),
              /* @__PURE__ */ jsxs3("div", { className: "absolute inset-x-4 top-4 flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsx3(MediaStateChip, { children: `item ${index + 1}` }),
                mediaValue?.temporaryUploadId ? /* @__PURE__ */ jsx3(MediaStateChip, { tone: "accent", children: "staged" }) : null
              ] }),
              isEditingItem ? /* @__PURE__ */ jsxs3("div", { className: "absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsx3(
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
                      borderColor: "var(--photon-gallery-control-border, rgba(0,0,0,0.2))",
                      background: "var(--photon-gallery-control-bg, rgba(2,6,23,0.88))",
                      color: "var(--photon-gallery-control-text, rgba(255,255,255,0.55))"
                    },
                    children: "Prev"
                  }
                ),
                /* @__PURE__ */ jsx3(
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
                      borderColor: "var(--photon-gallery-control-border, rgba(0,0,0,0.2))",
                      background: "var(--photon-gallery-control-bg, rgba(2,6,23,0.88))",
                      color: "var(--photon-gallery-control-text, rgba(255,255,255,0.55))"
                    },
                    children: "Next"
                  }
                ),
                /* @__PURE__ */ jsx3(
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
                      borderColor: "var(--photon-gallery-remove-border, rgba(253,164,175,0.18))",
                      background: "var(--photon-gallery-remove-bg, rgba(253,164,175,0.1))",
                      color: "var(--photon-gallery-remove-text, rgb(255 228 230))"
                    },
                    children: "Remove"
                  }
                )
              ] }) : null
            ]
          }
        ),
        /* @__PURE__ */ jsx3("div", { className: "space-y-3 px-5 py-5", children: isEditingItem ? /* @__PURE__ */ jsxs3(Fragment, { children: [
          /* @__PURE__ */ jsx3(
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
          /* @__PURE__ */ jsx3(
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
              className: clsx(builderInputClassName, "min-h-[96px] resize-y")
            }
          )
        ] }) : /* @__PURE__ */ jsxs3("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx3(
            "div",
            {
              "data-testid": "photon-editable-gallery-item-label",
              className: clsx(
                "text-[11px] font-semibold uppercase tracking-[0.26em]",
                labelClassName
              ),
              style: {
                color: "var(--photon-gallery-label, rgba(207,250,254,0.56))"
              },
              children: item.alt?.trim() ? item.alt : `Gallery image ${index + 1}`
            }
          ),
          /* @__PURE__ */ jsx3(
            "div",
            {
              "data-testid": "photon-editable-gallery-item-caption",
              className: clsx("text-sm leading-7", captionClassName),
              style: {
                color: "var(--photon-gallery-caption, rgba(203,213,225,0.92))"
              },
              children: item.caption?.trim() ? item.caption : "Click the gallery in Content or Builder mode to annotate this image."
            }
          ),
          mediaValue?.fileName || mediaValue?.name ? /* @__PURE__ */ jsx3(
            "div",
            {
              "data-testid": "photon-editable-gallery-item-file-name",
              className: clsx(
                "inline-flex rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em]",
                fileNameClassName
              ),
              style: {
                borderColor: "var(--photon-gallery-file-border, rgba(255,255,255,0.08))",
                background: "var(--photon-gallery-file-bg, rgba(255,255,255,0.03))",
                color: "var(--photon-gallery-file-text, rgba(255,255,255,0.4))"
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
import { Fragment as Fragment2, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
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
  const documentId = usePhotonStore((state) => state.document.id);
  const selectedField = usePhotonStore((state) => state.selectedField);
  const selectField = usePhotonStore((state) => state.selectField);
  const updateFieldValue = usePhotonStore(
    (state) => state.updateFieldValue
  );
  const uploadMedia = usePhotonStore((state) => state.uploadMedia);
  const [isUploading, setIsUploading] = useState(false);
  const galleryValue = usePhotonFieldValue(blockId, path);
  const items = Array.isArray(galleryValue) ? galleryValue : [];
  const isEditable = usePhotonCanEdit();
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
          id: createPhotonNodeId(),
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
          id: createPhotonNodeId(),
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
  return /* @__PURE__ */ jsx4(
    "div",
    {
      ...createActivationProps(isEditable, () => selectField(blockId, path)),
      "data-testid": "photon-editable-gallery",
      className: editableFrameClassName({ isActive, isEditable, className }),
      children: /* @__PURE__ */ jsx4(
        "div",
        {
          className: clsx2(columnsClassName, items.length === 0 && "grid-cols-1"),
          children: items.length === 0 ? /* @__PURE__ */ jsx4(
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
            items.map((item, index) => /* @__PURE__ */ jsx4(
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
            isEditable ? /* @__PURE__ */ jsx4(
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

export {
  EditableGallery
};
