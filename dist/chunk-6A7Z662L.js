import {
  WebsiteBuilderRichTextEditor
} from "./chunk-RHGH5BX2.js";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  KeyboardMenuList,
  Root,
  WebsiteBuilderBlockRenderer,
  WebsiteBuilderRenderDepthProvider,
  WebsiteBuilderSearchHighlightEffect,
  WebsiteBuilderSurfaceLayoutProvider,
  cn,
  useKeyboardMenuController,
  useWebsiteBuilderRenderDepth
} from "./chunk-OURPASIW.js";
import {
  resolveWebsiteBuilderSiteDesignSettings
} from "./chunk-7A32BINR.js";
import {
  isWebsiteBuilderMediaValue,
  resolveWebsiteBuilderMediaPreviewUrl,
  resolveWebsiteBuilderMediaUrl,
  updateWebsiteBuilderMediaUrl
} from "./chunk-NZ4V64SZ.js";
import {
  WebsiteBuilderProvider,
  useWebsiteBuilderI18n,
  useWebsiteBuilderPersistedState,
  useWebsiteBuilderStore
} from "./chunk-OWDRVIFG.js";
import {
  WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
  getWebsiteBuilderDocumentFingerprint,
  getWebsiteBuilderSurfaceRegionBlocks,
  getWebsiteBuilderSurfaceRegionListId,
  moveWebsiteBuilderArrayItem,
  resolveWebsiteBuilderSurfaceRegionDescriptors,
  resolveWebsiteBuilderSurfaceRegionForBlockId,
  resolveWebsiteBuilderSurfaceRegionForListId
} from "./chunk-4FGVRZOX.js";
import {
  canSaveWebsiteBuilderWorkspace,
  cloneWebsiteBuilderValue,
  createWebsiteBuilderAreaListId,
  createWebsiteBuilderNodeId,
  findWebsiteBuilderBlock,
  getValueAtPath,
  getWebsiteBuilderWorkspaceIdentityKey,
  normalizeWebsiteBuilderWorkspaceCapabilities,
  normalizeWebsiteBuilderWorkspaceDescriptor,
  setValueAtPath
} from "./chunk-NYLOTAVT.js";

// src/studio/inspector-panel/field-editor.tsx
import clsx4 from "clsx";
import { ArrowDown as ArrowDown2, ArrowUp as ArrowUp2, ChevronDown, Plus as Plus2, Trash2 as Trash22 } from "lucide-react";
import { useEffect as useEffect2, useState as useState5 } from "react";

// src/components/ui/dropdown-menu/index.ts
import {
  RadioGroup,
  Root as Root2,
  Trigger
} from "@radix-ui/react-dropdown-menu";

// src/components/ui/dropdown-menu/dropdown-menu-content.tsx
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  forwardRef
} from "react";
import { jsx } from "react/jsx-runtime";
var DropdownMenuContent = forwardRef(({ className, sideOffset = 8, ...props }, ref) => {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      ref,
      "data-slot": "dropdown-menu-content",
      sideOffset,
      collisionPadding: { top: 24, right: 16, bottom: 24, left: 16 },
      className: cn(
        "relative z-50 min-w-[12rem] overflow-hidden rounded-[1.35rem] border p-1.5 shadow-[var(--wb-builder-panel-shadow)] backdrop-blur-2xl duration-200 origin-[--radix-dropdown-menu-content-transform-origin] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      style: {
        borderColor: "var(--wb-builder-border)",
        background: "linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
        color: "var(--wb-builder-text)"
      },
      ...props
    }
  ) });
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

// src/components/ui/dropdown-menu/dropdown-menu-radio-item.tsx
import * as DropdownMenuPrimitive2 from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import {
  forwardRef as forwardRef2
} from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var DropdownMenuRadioItem = forwardRef2(({ className, children, ...props }, ref) => {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive2.RadioItem,
    {
      ref,
      "data-slot": "dropdown-menu-radio-item",
      className: cn(
        "relative flex cursor-pointer select-none items-center justify-between gap-3 rounded-[1rem] py-2.5 pl-3 pr-9 text-sm font-semibold outline-none transition-colors duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[highlighted]:bg-[var(--wb-builder-accent-strong)] data-[highlighted]:text-[var(--wb-builder-text)]",
        className
      ),
      style: {
        color: "var(--wb-builder-text-muted)"
      },
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx2("span", { className: "absolute right-3 inline-flex h-4 w-4 items-center justify-center", children: /* @__PURE__ */ jsx2(DropdownMenuPrimitive2.ItemIndicator, { children: /* @__PURE__ */ jsx2(
          Check,
          {
            className: "h-4 w-4",
            style: { color: "var(--wb-builder-accent)" }
          }
        ) }) })
      ]
    }
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive2.RadioItem.displayName;

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
var inputClassName = clsx(
  "w-full rounded-[20px] border px-4 py-3",
  "text-sm outline-none transition placeholder:text-[color:var(--wb-builder-text-ghost)]",
  "border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-field)] text-[color:var(--wb-builder-text)] focus:border-[color:var(--wb-builder-border-strong)]"
);

// src/studio/shared/status-chip.tsx
import { jsx as jsx3 } from "react/jsx-runtime";

// src/studio/shared/toolbar-button.tsx
import clsx2 from "clsx";
import { jsx as jsx4 } from "react/jsx-runtime";
var ToolbarButton = ({
  children,
  onClick,
  disabled = false,
  className
}) => {
  return /* @__PURE__ */ jsx4(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      className: clsx2(
        "inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-45",
        "border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] text-[color:var(--wb-builder-text-muted)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-field)] hover:text-[color:var(--wb-builder-text)]",
        className
      ),
      children
    }
  );
};

// src/studio/shared/toolbar-chip-button.tsx
import { jsx as jsx5 } from "react/jsx-runtime";

// src/studio/inspector-panel/gallery-field-editor.tsx
import clsx3 from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
var GalleryFieldEditor = ({
  blockId,
  path,
  documentId,
  value,
  onFocus,
  onApply,
  onUpload
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const items = Array.isArray(value) ? value : [];
  const updateItems = (nextItems) => {
    onApply(nextItems);
  };
  return /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx6("div", { className: "space-y-3", children: items.map((item, index) => /* @__PURE__ */ jsx6(
      "div",
      {
        className: "rounded-[24px] border p-3",
        style: {
          borderColor: "var(--wb-builder-border)",
          background: "linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
          boxShadow: "var(--wb-builder-card-shadow)"
        },
        "data-testid": `wb-gallery-field-editor-item-${path}-${index}`,
        children: /* @__PURE__ */ jsxs2("div", { className: "grid gap-3 sm:grid-cols-[80px_minmax(0,1fr)]", children: [
          /* @__PURE__ */ jsx6(
            "div",
            {
              className: "overflow-hidden rounded-2xl border",
              style: {
                borderColor: "var(--wb-builder-border)",
                background: "var(--wb-builder-field)"
              },
              children: resolveWebsiteBuilderMediaPreviewUrl(item.media) ? /* @__PURE__ */ jsx6(
                "img",
                {
                  src: resolveWebsiteBuilderMediaPreviewUrl(item.media),
                  alt: item.alt ?? `Gallery item ${index + 1}`,
                  className: "aspect-square h-full w-full object-cover"
                }
              ) : /* @__PURE__ */ jsx6(
                "div",
                {
                  className: "flex aspect-square items-center justify-center text-xs uppercase tracking-[0.22em]",
                  style: { color: "var(--wb-builder-text-muted)" },
                  children: "Media"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs2("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs2("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx6(
                "div",
                {
                  className: "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
                  style: {
                    borderColor: "var(--wb-builder-border)",
                    background: "var(--wb-builder-field)",
                    color: "var(--wb-builder-text-soft)"
                  },
                  children: `item ${index + 1}`
                }
              ),
              isWebsiteBuilderMediaValue(item.media) && item.media.temporaryUploadId ? /* @__PURE__ */ jsx6(
                "div",
                {
                  className: "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
                  style: {
                    borderColor: "var(--wb-builder-border-strong)",
                    background: "var(--wb-builder-accent-strong)",
                    color: "var(--wb-builder-accent)"
                  },
                  children: "staged"
                }
              ) : null
            ] }),
            /* @__PURE__ */ jsx6(
              "input",
              {
                value: item.alt ?? "",
                onFocus,
                onChange: (event) => updateItems(
                  items.map(
                    (candidate, candidateIndex) => candidateIndex === index ? {
                      ...candidate,
                      alt: event.currentTarget.value
                    } : candidate
                  )
                ),
                placeholder: "Alt text",
                className: inputClassName
              }
            ),
            /* @__PURE__ */ jsx6(
              "textarea",
              {
                rows: 3,
                value: item.caption ?? "",
                onFocus,
                onChange: (event) => updateItems(
                  items.map(
                    (candidate, candidateIndex) => candidateIndex === index ? {
                      ...candidate,
                      caption: event.currentTarget.value
                    } : candidate
                  )
                ),
                placeholder: "Caption",
                className: clsx3(inputClassName, "min-h-[92px] resize-y")
              }
            ),
            /* @__PURE__ */ jsxs2("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx6(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    if (index === 0) {
                      return;
                    }
                    const nextItems = [...items];
                    [nextItems[index - 1], nextItems[index]] = [
                      nextItems[index],
                      nextItems[index - 1]
                    ];
                    updateItems(nextItems);
                  },
                  className: "rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] transition",
                  style: {
                    borderColor: "var(--wb-builder-border)",
                    background: "var(--wb-builder-field)",
                    color: "var(--wb-builder-text-soft)"
                  },
                  children: "Prev"
                }
              ),
              /* @__PURE__ */ jsx6(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    if (index === items.length - 1) {
                      return;
                    }
                    const nextItems = [...items];
                    [nextItems[index], nextItems[index + 1]] = [
                      nextItems[index + 1],
                      nextItems[index]
                    ];
                    updateItems(nextItems);
                  },
                  className: "rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] transition",
                  style: {
                    borderColor: "var(--wb-builder-border)",
                    background: "var(--wb-builder-field)",
                    color: "var(--wb-builder-text-soft)"
                  },
                  children: "Next"
                }
              ),
              /* @__PURE__ */ jsx6(
                "button",
                {
                  type: "button",
                  onClick: () => updateItems(
                    items.filter(
                      (_, candidateIndex) => candidateIndex !== index
                    )
                  ),
                  className: "rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] transition",
                  style: {
                    borderColor: "var(--wb-builder-border-strong)",
                    background: "var(--wb-builder-accent-strong)",
                    color: "var(--wb-builder-accent)"
                  },
                  children: "Remove"
                }
              )
            ] })
          ] })
        ] })
      },
      item.id ?? `${blockId}-${path}-${index}`
    )) }),
    /* @__PURE__ */ jsxs2(
      "label",
      {
        className: "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition",
        style: {
          borderColor: "var(--wb-builder-border-strong)",
          background: "var(--wb-builder-accent-strong)",
          color: "var(--wb-builder-accent)"
        },
        children: [
          /* @__PURE__ */ jsx6("span", { children: isUploading ? "Uploading..." : items.length > 0 ? "Add more media" : "Add media" }),
          /* @__PURE__ */ jsx6(
            "input",
            {
              type: "file",
              accept: "image/*",
              multiple: true,
              className: "hidden",
              disabled: isUploading,
              onChange: (event) => {
                const files = event.currentTarget.files ? Array.from(event.currentTarget.files) : [];
                if (files.length === 0 || !onUpload) {
                  return;
                }
                setIsUploading(true);
                void Promise.all(
                  files.map(async (file) => ({
                    id: createWebsiteBuilderNodeId(),
                    media: await onUpload({
                      file,
                      documentId,
                      blockId,
                      path
                    }),
                    alt: file.name.replace(/\.[^.]+$/, ""),
                    caption: ""
                  }))
                ).then((uploadedItems) => {
                  updateItems([...items, ...uploadedItems]);
                }).catch((error) => {
                  toast.error("Gallery upload failed", {
                    description: error instanceof Error ? error.message : "Unable to upload gallery media."
                  });
                }).finally(() => {
                  setIsUploading(false);
                  event.currentTarget.value = "";
                });
              }
            }
          )
        ]
      }
    )
  ] });
};

// src/studio/inspector-panel/image-field-editor.tsx
import { useState as useState2 } from "react";
import { toast as toast2 } from "sonner";

// src/studio/inspector-panel/shared.ts
var formatMediaFileSize = (size) => {
  if (!size || size <= 0) {
    return null;
  }
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

// src/studio/inspector-panel/image-field-editor.tsx
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
var ImageFieldEditor = ({
  blockId,
  path,
  documentId,
  value,
  onFocus,
  onApply,
  onUpload
}) => {
  const [isUploading, setIsUploading] = useState2(false);
  const source = resolveWebsiteBuilderMediaPreviewUrl(value);
  const mediaValue = isWebsiteBuilderMediaValue(value) ? value : null;
  return /* @__PURE__ */ jsxs3("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx7(
      "div",
      {
        className: "overflow-hidden rounded-[24px] border",
        style: {
          borderColor: "var(--wb-builder-border)",
          background: "linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
          boxShadow: "var(--wb-builder-card-shadow)"
        },
        "data-testid": `wb-image-field-editor-preview-${path}`,
        children: source ? /* @__PURE__ */ jsx7(
          "img",
          {
            src: source,
            alt: "Inspector media preview",
            className: "aspect-[4/3] w-full object-cover"
          }
        ) : /* @__PURE__ */ jsx7(
          "div",
          {
            className: "flex aspect-[4/3] items-center justify-center px-6 text-center text-sm",
            style: { color: "var(--wb-builder-text-muted)" },
            children: "Upload an image or paste a remote source URL."
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs3("div", { className: "flex flex-wrap gap-2", children: [
      mediaValue?.temporaryUploadId ? /* @__PURE__ */ jsx7(
        "div",
        {
          className: "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
          style: {
            borderColor: "var(--wb-builder-border-strong)",
            background: "var(--wb-builder-accent-strong)",
            color: "var(--wb-builder-accent)"
          },
          children: "staged upload"
        }
      ) : null,
      mediaValue?.fileName ? /* @__PURE__ */ jsx7(
        "div",
        {
          className: "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
          style: {
            borderColor: "var(--wb-builder-border)",
            background: "var(--wb-builder-field)",
            color: "var(--wb-builder-text-soft)"
          },
          children: mediaValue.fileName
        }
      ) : null,
      mediaValue?.size ? /* @__PURE__ */ jsx7(
        "div",
        {
          className: "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
          style: {
            borderColor: "var(--wb-builder-border)",
            background: "var(--wb-builder-field)",
            color: "var(--wb-builder-text-soft)"
          },
          children: formatMediaFileSize(mediaValue.size) ?? "remote"
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsx7(
      "input",
      {
        type: "text",
        value: resolveWebsiteBuilderMediaUrl(value),
        onFocus,
        onChange: (event) => onApply(
          updateWebsiteBuilderMediaUrl(value, event.currentTarget.value)
        ),
        className: inputClassName
      }
    ),
    /* @__PURE__ */ jsxs3("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxs3(
        "label",
        {
          className: "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition",
          style: {
            borderColor: "var(--wb-builder-border-strong)",
            background: "var(--wb-builder-accent-strong)",
            color: "var(--wb-builder-accent)"
          },
          children: [
            /* @__PURE__ */ jsx7("span", { children: isUploading ? "Uploading..." : source ? "Replace media" : "Upload media" }),
            /* @__PURE__ */ jsx7(
              "input",
              {
                type: "file",
                accept: "image/*",
                className: "hidden",
                disabled: isUploading,
                onChange: (event) => {
                  const file = event.currentTarget.files?.[0];
                  if (!file || !onUpload) {
                    return;
                  }
                  setIsUploading(true);
                  void onUpload({
                    file,
                    documentId,
                    blockId,
                    path
                  }).then((uploadedMedia) => onApply(uploadedMedia)).catch((error) => {
                    toast2.error("Upload failed", {
                      description: error instanceof Error ? error.message : "Unable to upload the selected media file."
                    });
                  }).finally(() => {
                    setIsUploading(false);
                    event.currentTarget.value = "";
                  });
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx7(
        "button",
        {
          type: "button",
          onClick: () => onApply(""),
          className: "rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition",
          style: {
            borderColor: "var(--wb-builder-border)",
            background: "var(--wb-builder-field)",
            color: "var(--wb-builder-text-soft)"
          },
          children: "Clear"
        }
      )
    ] })
  ] });
};

// src/studio/inspector-panel/json-field-editor.tsx
import { WandSparkles } from "lucide-react";
import { useEffect, useState as useState3 } from "react";
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
var JsonFieldEditor = ({
  blockId,
  path,
  initialValue,
  onApply,
  onFocus
}) => {
  const [draft, setDraft] = useState3(JSON.stringify(initialValue, null, 2));
  const [error, setError] = useState3(null);
  const testIdSuffix = path.replace(/[^a-zA-Z0-9_-]+/g, "-");
  useEffect(() => {
    setDraft(JSON.stringify(initialValue, null, 2));
    setError(null);
  }, [blockId, path, initialValue]);
  return /* @__PURE__ */ jsxs4("div", { "data-testid": `wb-json-field-editor-${testIdSuffix}`, children: [
    /* @__PURE__ */ jsx8(
      "textarea",
      {
        "data-testid": `wb-json-field-editor-input-${testIdSuffix}`,
        rows: 7,
        value: draft,
        onFocus,
        onChange: (event) => {
          setDraft(event.currentTarget.value);
          setError(null);
        },
        className: "w-full rounded-2xl border px-4 py-3 font-mono text-xs leading-6 outline-none transition",
        style: {
          borderColor: "var(--wb-builder-border)",
          background: "var(--wb-builder-field)",
          color: "var(--wb-builder-text)"
        }
      }
    ),
    /* @__PURE__ */ jsxs4("div", { className: "mt-3 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs4(
        "button",
        {
          "data-testid": `wb-json-field-editor-apply-${testIdSuffix}`,
          type: "button",
          onClick: () => {
            try {
              const nextValue = JSON.parse(draft);
              onApply(nextValue);
              setError(null);
            } catch {
              setError("Invalid JSON");
            }
          },
          className: "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]",
          style: {
            borderColor: "var(--wb-builder-border-strong)",
            background: "var(--wb-builder-accent-strong)",
            color: "var(--wb-builder-accent)"
          },
          children: [
            /* @__PURE__ */ jsx8(WandSparkles, { className: "h-3.5 w-3.5" }),
            "Apply JSON"
          ]
        }
      ),
      error ? /* @__PURE__ */ jsx8("div", { className: "text-xs", style: { color: "var(--wb-builder-accent)" }, children: error }) : null
    ] })
  ] });
};

// src/forms/form-fields-editor.tsx
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useState as useState4 } from "react";
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
var fieldTypes = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Textarea" },
  { value: "select", label: "Select" },
  { value: "checkbox", label: "Checkbox" },
  { value: "date", label: "Date" },
  { value: "hidden", label: "Hidden" }
];
var widthOptions = [
  { value: "full", label: "Full" },
  { value: "half", label: "Half" },
  { value: "third", label: "Third" }
];
var normalizeFields = (value) => Array.isArray(value) ? value.filter(
  (item) => typeof item === "object" && item !== null
) : [];
var createField = () => ({
  id: "custom_field",
  name: "custom_field",
  type: "text",
  label: "Custom field",
  placeholder: "",
  helpText: "",
  required: false,
  width: "full",
  locked: false,
  removable: true
});
var createOption = () => ({
  label: "Option",
  value: "option"
});
var updateField = (fields, index, patch) => fields.map((field, fieldIndex) => fieldIndex === index ? { ...field, ...patch } : field);
var updateOption = (field, optionIndex, patch) => ({
  ...field,
  options: (field.options ?? []).map(
    (option, index) => index === optionIndex ? { ...option, ...patch } : option
  )
});
var WebsiteBuilderFormFieldsEditor = ({
  value,
  onChange,
  onFocus
}) => {
  const fields = normalizeFields(value);
  const [expandedFieldId, setExpandedFieldId] = useState4(
    fields[0]?.id ?? null
  );
  const emit = (nextFields) => {
    onChange(cloneWebsiteBuilderValue(nextFields));
  };
  return /* @__PURE__ */ jsxs5("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx9("div", { className: "space-y-2 rounded-[20px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] p-2", children: fields.map((field, index) => {
      const isExpanded = expandedFieldId === field.id;
      const options = field.options ?? [];
      return /* @__PURE__ */ jsxs5(
        "div",
        {
          className: "rounded-[18px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-field)] p-3",
          children: [
            /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxs5(
                "button",
                {
                  type: "button",
                  onClick: () => setExpandedFieldId(isExpanded ? null : field.id),
                  className: "min-w-0 cursor-pointer text-left",
                  children: [
                    /* @__PURE__ */ jsx9("div", { className: "truncate text-sm font-semibold text-[color:var(--wb-builder-text)]", children: field.label || field.id || "Field" }),
                    /* @__PURE__ */ jsxs5("div", { className: "mt-1 truncate font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--wb-builder-text-ghost)]", children: [
                      field.type,
                      " / ",
                      field.name
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs5("div", { className: "flex shrink-0 items-center gap-1", children: [
                /* @__PURE__ */ jsx9(
                  "button",
                  {
                    type: "button",
                    disabled: index === 0,
                    onClick: () => emit(moveWebsiteBuilderArrayItem(fields, index, index - 1)),
                    className: "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[color:var(--wb-builder-border)] text-[color:var(--wb-builder-text-soft)] disabled:cursor-not-allowed disabled:opacity-40",
                    children: /* @__PURE__ */ jsx9(ArrowUp, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx9(
                  "button",
                  {
                    type: "button",
                    disabled: index === fields.length - 1,
                    onClick: () => emit(moveWebsiteBuilderArrayItem(fields, index, index + 1)),
                    className: "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[color:var(--wb-builder-border)] text-[color:var(--wb-builder-text-soft)] disabled:cursor-not-allowed disabled:opacity-40",
                    children: /* @__PURE__ */ jsx9(ArrowDown, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx9(
                  "button",
                  {
                    type: "button",
                    disabled: field.locked || field.removable === false,
                    onClick: () => emit(fields.filter((_, fieldIndex) => fieldIndex !== index)),
                    className: "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[color:var(--wb-builder-border)] text-[color:var(--wb-builder-text-soft)] disabled:cursor-not-allowed disabled:opacity-40",
                    children: /* @__PURE__ */ jsx9(Trash2, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] }),
            isExpanded ? /* @__PURE__ */ jsxs5("div", { className: "mt-4 grid gap-3", children: [
              /* @__PURE__ */ jsxs5("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxs5("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]", children: [
                  "Label",
                  /* @__PURE__ */ jsx9(
                    "input",
                    {
                      value: field.label ?? "",
                      onFocus: () => onFocus(`${index}.label`),
                      onChange: (event) => emit(updateField(fields, index, { label: event.currentTarget.value })),
                      className: inputClassName
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs5("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]", children: [
                  "Type",
                  /* @__PURE__ */ jsx9(
                    "select",
                    {
                      value: field.type,
                      onFocus: () => onFocus(`${index}.type`),
                      onChange: (event) => emit(updateField(fields, index, { type: event.currentTarget.value })),
                      className: inputClassName,
                      children: fieldTypes.map((item) => /* @__PURE__ */ jsx9("option", { value: item.value, children: item.label }, item.value))
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs5("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxs5("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]", children: [
                  "Field id",
                  /* @__PURE__ */ jsx9(
                    "input",
                    {
                      value: field.id ?? "",
                      onFocus: () => onFocus(`${index}.id`),
                      onChange: (event) => emit(updateField(fields, index, { id: event.currentTarget.value })),
                      className: inputClassName
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs5("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]", children: [
                  "Input name",
                  /* @__PURE__ */ jsx9(
                    "input",
                    {
                      value: field.name ?? "",
                      onFocus: () => onFocus(`${index}.name`),
                      onChange: (event) => emit(updateField(fields, index, { name: event.currentTarget.value })),
                      className: inputClassName
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs5("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]", children: [
                "Placeholder",
                /* @__PURE__ */ jsx9(
                  "input",
                  {
                    value: field.placeholder ?? "",
                    onFocus: () => onFocus(`${index}.placeholder`),
                    onChange: (event) => emit(updateField(fields, index, { placeholder: event.currentTarget.value })),
                    className: inputClassName
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs5("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]", children: [
                "Help text",
                /* @__PURE__ */ jsx9(
                  "textarea",
                  {
                    rows: 3,
                    value: field.helpText ?? "",
                    onFocus: () => onFocus(`${index}.helpText`),
                    onChange: (event) => emit(updateField(fields, index, { helpText: event.currentTarget.value })),
                    className: inputClassName
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs5("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxs5("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]", children: [
                  "Width",
                  /* @__PURE__ */ jsx9(
                    "select",
                    {
                      value: field.width ?? "full",
                      onFocus: () => onFocus(`${index}.width`),
                      onChange: (event) => emit(updateField(fields, index, { width: event.currentTarget.value })),
                      className: inputClassName,
                      children: widthOptions.map((item) => /* @__PURE__ */ jsx9("option", { value: item.value, children: item.label }, item.value))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx9("div", { className: "grid grid-cols-2 gap-2 pt-7", children: [
                  ["required", "Required"],
                  ["disabled", "Disabled"]
                ].map(([key, label]) => /* @__PURE__ */ jsxs5("label", { className: "flex items-center gap-2 text-xs font-semibold text-[color:var(--wb-builder-text-soft)]", children: [
                  /* @__PURE__ */ jsx9(
                    "input",
                    {
                      type: "checkbox",
                      checked: Boolean(field[key]),
                      onChange: (event) => emit(updateField(fields, index, { [key]: event.currentTarget.checked }))
                    }
                  ),
                  label
                ] }, key)) })
              ] }),
              field.type === "select" ? /* @__PURE__ */ jsxs5("div", { className: "rounded-[16px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] p-3", children: [
                /* @__PURE__ */ jsx9("div", { className: "mb-3 text-sm font-semibold text-[color:var(--wb-builder-text)]", children: "Options" }),
                /* @__PURE__ */ jsx9("div", { className: "grid gap-2", children: options.map((option, optionIndex) => /* @__PURE__ */ jsxs5("div", { className: "grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]", children: [
                  /* @__PURE__ */ jsx9(
                    "input",
                    {
                      value: option.label,
                      onFocus: () => onFocus(`${index}.options.${optionIndex}.label`),
                      onChange: (event) => emit(updateField(fields, index, updateOption(field, optionIndex, { label: event.currentTarget.value }))),
                      className: inputClassName,
                      placeholder: "Label"
                    }
                  ),
                  /* @__PURE__ */ jsx9(
                    "input",
                    {
                      value: option.value,
                      onFocus: () => onFocus(`${index}.options.${optionIndex}.value`),
                      onChange: (event) => emit(updateField(fields, index, updateOption(field, optionIndex, { value: event.currentTarget.value }))),
                      className: inputClassName,
                      placeholder: "Value"
                    }
                  ),
                  /* @__PURE__ */ jsx9(
                    "button",
                    {
                      type: "button",
                      onClick: () => emit(updateField(fields, index, { options: options.filter((_, currentIndex) => currentIndex !== optionIndex) })),
                      className: "inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--wb-builder-border)] text-[color:var(--wb-builder-text-soft)]",
                      children: /* @__PURE__ */ jsx9(Trash2, { className: "h-4 w-4" })
                    }
                  )
                ] }, optionIndex)) }),
                /* @__PURE__ */ jsxs5(
                  "button",
                  {
                    type: "button",
                    onClick: () => emit(updateField(fields, index, { options: [...options, createOption()] })),
                    className: "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[18px] border border-[color:var(--wb-builder-border)] px-4 py-3 text-sm font-semibold text-[color:var(--wb-builder-text)]",
                    children: [
                      /* @__PURE__ */ jsx9(Plus, { className: "h-4 w-4" }),
                      " Add option"
                    ]
                  }
                )
              ] }) : null
            ] }) : null
          ]
        },
        `${field.id}:${index}`
      );
    }) }),
    /* @__PURE__ */ jsxs5(
      "button",
      {
        type: "button",
        onClick: () => {
          const nextField = createField();
          emit([...fields, nextField]);
          setExpandedFieldId(nextField.id);
        },
        className: "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[20px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] px-4 py-3 text-sm font-semibold text-[color:var(--wb-builder-text)] transition hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-panel-solid)]",
        children: [
          /* @__PURE__ */ jsx9(Plus, { className: "h-4 w-4" }),
          " Add field"
        ]
      }
    )
  ] });
};

// src/studio/inspector-panel/field-editor.tsx
import { jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
var joinFieldPath = (parentPath, childPath) => {
  if (!childPath) {
    return parentPath;
  }
  return parentPath ? `${parentPath}.${childPath}` : childPath;
};
var normalizeObjectValue = (value) => typeof value === "object" && value !== null && !Array.isArray(value) ? value : {};
var normalizeArrayValue = (value) => Array.isArray(value) ? value : [];
var createDefaultFieldValue = (field) => {
  if (field.defaultValue !== void 0) {
    return cloneWebsiteBuilderValue(field.defaultValue);
  }
  switch (field.kind) {
    case "textarea":
    case "rich-text":
    case "text":
    case "url":
    case "color":
      return "";
    case "number":
      return field.min ?? 0;
    case "toggle":
      return false;
    case "select":
      return field.options?.[0]?.value ?? "";
    case "tags":
    case "gallery":
    case "repeater":
      return [];
    case "image":
      return null;
    case "json":
      return {};
    case "object": {
      const nextValue = {};
      for (const childField of field.fields ?? []) {
        if (!childField.path) {
          continue;
        }
        nextValue[childField.path] = createDefaultFieldValue(childField);
      }
      return nextValue;
    }
    default:
      return "";
  }
};
var SelectFieldEditor = ({
  field,
  value,
  onChange,
  onFocus
}) => {
  const { translate } = useWebsiteBuilderI18n();
  const [hasMounted, setHasMounted] = useState5(false);
  const selectedValue = String(value ?? "");
  const activeOption = (field.options ?? []).find((option) => option.value === selectedValue) ?? null;
  const trigger = /* @__PURE__ */ jsxs6(
    "button",
    {
      type: "button",
      onFocus: () => onFocus(),
      className: "inline-flex h-auto w-full min-w-0 cursor-pointer items-center justify-between gap-3 rounded-[20px] border px-4 py-3 text-left text-sm font-semibold shadow-none transition-[border-color,background-color] border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-field)] text-[color:var(--wb-builder-text)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-panel-solid)] focus-visible:border-[color:var(--wb-builder-border-strong)] focus-visible:bg-[color:var(--wb-builder-panel-solid)]",
      children: [
        /* @__PURE__ */ jsx10("span", { className: "min-w-0 truncate", children: translate(
          activeOption?.labelKey ?? activeOption?.label ?? "Select value",
          activeOption?.label ?? "Select value"
        ) }),
        /* @__PURE__ */ jsx10(ChevronDown, { className: "h-4 w-4 shrink-0 text-[color:var(--wb-builder-text-soft)]" })
      ]
    }
  );
  useEffect2(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return trigger;
  }
  return /* @__PURE__ */ jsxs6(Root2, { modal: false, children: [
    /* @__PURE__ */ jsx10(Trigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsx10(DropdownMenuContent, { align: "start", className: "min-w-[14rem]", children: /* @__PURE__ */ jsx10(
      RadioGroup,
      {
        value: selectedValue,
        onValueChange: (nextValue) => onChange(nextValue),
        children: (field.options ?? []).map((option) => /* @__PURE__ */ jsx10(
          DropdownMenuRadioItem,
          {
            value: option.value,
            onFocus: () => onFocus(),
            children: translate(option.labelKey ?? option.label, option.label)
          },
          option.value
        ))
      }
    ) })
  ] });
};
var ObjectFieldEditor = ({
  field,
  blockId,
  value,
  onChange,
  onFocus,
  absolutePath,
  hidePathLabel
}) => {
  const objectValue = normalizeObjectValue(value);
  return /* @__PURE__ */ jsx10("div", { className: "space-y-3 rounded-[20px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] p-3", children: (field.fields ?? []).map((childField, index) => {
    const childPath = childField.path ?? "";
    const childAbsolutePath = joinFieldPath(absolutePath ?? "", childPath);
    const childValue = childPath ? getValueAtPath(objectValue, childPath) : objectValue;
    return /* @__PURE__ */ jsx10(
      "div",
      {
        className: "rounded-[18px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-field)] p-3",
        children: /* @__PURE__ */ jsx10(
          FieldEditor,
          {
            field: childField,
            blockId,
            value: childValue,
            absolutePath: childAbsolutePath,
            hidePathLabel,
            onFocus,
            onChange: (nextValue) => {
              if (!childPath) {
                onChange(nextValue);
                return;
              }
              onChange(setValueAtPath(objectValue, childPath, nextValue));
            }
          }
        )
      },
      childAbsolutePath || `${field.label ?? field.path}-${index}`
    );
  }) });
};
var RepeaterFieldEditor = ({
  field,
  blockId,
  value,
  onChange,
  onFocus,
  absolutePath
}) => {
  const { translate } = useWebsiteBuilderI18n();
  const items = normalizeArrayValue(value);
  const itemField = field.itemField;
  const updateItems = (nextItems) => {
    onChange(nextItems);
  };
  const addItem = () => {
    const defaultItem = field.defaultItem !== void 0 ? cloneWebsiteBuilderValue(field.defaultItem) : itemField ? createDefaultFieldValue(itemField) : createDefaultFieldValue({
      kind: "object",
      fields: field.fields
    });
    updateItems([...items, defaultItem]);
  };
  return /* @__PURE__ */ jsxs6("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx10("div", { className: "space-y-3 rounded-[20px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] p-3", children: items.map((item, index) => {
      const itemAbsolutePath = joinFieldPath(absolutePath ?? "", String(index));
      const itemLabelSource = field.itemLabelPath && item && typeof item === "object" ? getValueAtPath(item, field.itemLabelPath) : null;
      const itemLabel = typeof itemLabelSource === "string" && itemLabelSource.trim() !== "" ? itemLabelSource : translate(
        field.itemLabelKey ?? field.itemLabel ?? "Item",
        field.itemLabel ?? "Item"
      );
      return /* @__PURE__ */ jsxs6(
        "div",
        {
          className: "rounded-[18px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-field)] p-3",
          children: [
            /* @__PURE__ */ jsxs6("div", { className: "mb-3 flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsx10("div", { className: "min-w-0", children: /* @__PURE__ */ jsx10(
                "div",
                {
                  className: "truncate text-sm font-semibold",
                  style: { color: "var(--wb-builder-text)" },
                  children: itemLabel
                }
              ) }),
              /* @__PURE__ */ jsxs6("div", { className: "flex shrink-0 items-center gap-1", children: [
                /* @__PURE__ */ jsx10(
                  "button",
                  {
                    type: "button",
                    disabled: index === 0,
                    onClick: () => updateItems(moveWebsiteBuilderArrayItem(items, index, index - 1)),
                    className: "inline-flex cursor-pointer items-center justify-center rounded-full border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] p-2 text-[color:var(--wb-builder-text-soft)] transition hover:border-[color:var(--wb-builder-border-strong)] hover:text-[color:var(--wb-builder-text)] disabled:cursor-not-allowed disabled:opacity-40",
                    "aria-label": `Move ${itemLabel} up`,
                    children: /* @__PURE__ */ jsx10(ArrowUp2, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx10(
                  "button",
                  {
                    type: "button",
                    disabled: index === items.length - 1,
                    onClick: () => updateItems(moveWebsiteBuilderArrayItem(items, index, index + 1)),
                    className: "inline-flex cursor-pointer items-center justify-center rounded-full border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] p-2 text-[color:var(--wb-builder-text-soft)] transition hover:border-[color:var(--wb-builder-border-strong)] hover:text-[color:var(--wb-builder-text)] disabled:cursor-not-allowed disabled:opacity-40",
                    "aria-label": `Move ${itemLabel} down`,
                    children: /* @__PURE__ */ jsx10(ArrowDown2, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx10(
                  "button",
                  {
                    type: "button",
                    onClick: () => updateItems(items.filter((_, itemIndex) => itemIndex !== index)),
                    className: "inline-flex cursor-pointer items-center justify-center rounded-full border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] p-2 text-[color:var(--wb-builder-text-soft)] transition hover:border-[color:var(--wb-builder-border-strong)] hover:text-[color:var(--wb-builder-text)]",
                    "aria-label": `Remove ${itemLabel}`,
                    children: /* @__PURE__ */ jsx10(Trash22, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] }),
            itemField ? /* @__PURE__ */ jsx10(
              FieldEditor,
              {
                field: itemField,
                blockId,
                value: item,
                absolutePath: itemAbsolutePath,
                hidePathLabel: true,
                onFocus,
                onChange: (nextValue) => updateItems(
                  items.map(
                    (currentItem, itemIndex) => itemIndex === index ? nextValue : currentItem
                  )
                )
              }
            ) : /* @__PURE__ */ jsx10("div", { className: "space-y-3", children: (field.fields ?? []).map((childField, childIndex) => {
              const itemObject = normalizeObjectValue(item);
              const childPath = childField.path ?? "";
              const childAbsolutePath = joinFieldPath(
                itemAbsolutePath,
                childPath
              );
              const childValue = childPath ? getValueAtPath(itemObject, childPath) : itemObject;
              return /* @__PURE__ */ jsx10(
                "div",
                {
                  className: "rounded-[16px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] p-3",
                  children: /* @__PURE__ */ jsx10(
                    FieldEditor,
                    {
                      field: childField,
                      blockId,
                      value: childValue,
                      absolutePath: childAbsolutePath,
                      hidePathLabel: true,
                      onFocus,
                      onChange: (nextValue) => {
                        if (!childPath) {
                          updateItems(
                            items.map(
                              (currentItem, itemIndex) => itemIndex === index ? nextValue : currentItem
                            )
                          );
                          return;
                        }
                        updateItems(
                          items.map(
                            (currentItem, itemIndex) => itemIndex === index ? setValueAtPath(itemObject, childPath, nextValue) : currentItem
                          )
                        );
                      }
                    }
                  )
                },
                childAbsolutePath || `${itemAbsolutePath}-${childIndex}`
              );
            }) })
          ]
        },
        itemAbsolutePath
      );
    }) }),
    /* @__PURE__ */ jsxs6(
      "button",
      {
        type: "button",
        onClick: addItem,
        className: "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[20px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] px-4 py-3 text-sm font-semibold text-[color:var(--wb-builder-text)] transition hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-panel-solid)]",
        children: [
          /* @__PURE__ */ jsx10(Plus2, { className: "h-4 w-4" }),
          translate(
            field.addLabelKey ?? field.addLabel ?? "Add item",
            field.addLabel ?? "Add item"
          )
        ]
      }
    )
  ] });
};
var FieldEditor = ({
  field,
  blockId,
  value,
  onChange,
  onFocus,
  absolutePath,
  hidePathLabel = false
}) => {
  const documentId = useWebsiteBuilderStore((state) => state.document.id);
  const uploadMedia = useWebsiteBuilderStore((state) => state.uploadMedia);
  const { translate } = useWebsiteBuilderI18n();
  const path = absolutePath ?? field.path ?? "";
  return /* @__PURE__ */ jsxs6("div", { children: [
    /* @__PURE__ */ jsxs6("div", { className: "mb-2 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx10(
        "div",
        {
          className: "text-sm font-semibold",
          style: { color: "var(--wb-builder-text)" },
          children: translate(
            field.labelKey ?? field.label ?? "Field",
            field.label ?? "Field"
          )
        }
      ),
      path && !hidePathLabel ? /* @__PURE__ */ jsx10(
        "button",
        {
          type: "button",
          onClick: () => onFocus(path),
          className: "cursor-pointer font-mono text-[10px] uppercase tracking-[0.24em] transition",
          style: { color: "var(--wb-builder-text-ghost)" },
          children: path
        }
      ) : null
    ] }),
    field.description ? /* @__PURE__ */ jsx10(
      "div",
      {
        className: "mb-2 text-xs leading-5",
        style: { color: "var(--wb-builder-text-soft)" },
        children: translate(
          field.descriptionKey ?? field.description ?? "",
          field.description
        )
      }
    ) : null,
    field.kind === "textarea" ? /* @__PURE__ */ jsx10(
      "textarea",
      {
        rows: 5,
        value: String(value ?? ""),
        onFocus: () => onFocus(path),
        onChange: (event) => onChange(event.currentTarget.value),
        className: inputClassName
      }
    ) : null,
    field.kind === "rich-text" ? /* @__PURE__ */ jsx10(
      WebsiteBuilderRichTextEditor,
      {
        value: String(value ?? ""),
        onFocus: () => onFocus(path),
        onChange,
        className: "text-sm text-[color:var(--wb-builder-text)]",
        surfaceClassName: "border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-field)]"
      }
    ) : null,
    field.kind === "json" ? /* @__PURE__ */ jsx10(
      JsonFieldEditor,
      {
        blockId,
        path,
        initialValue: value,
        onFocus: () => onFocus(path),
        onApply: onChange
      }
    ) : null,
    field.kind === "object" ? /* @__PURE__ */ jsx10(
      ObjectFieldEditor,
      {
        field,
        blockId,
        value,
        onFocus,
        onChange,
        absolutePath: path
      }
    ) : null,
    field.kind === "repeater" ? /* @__PURE__ */ jsx10(
      RepeaterFieldEditor,
      {
        field,
        blockId,
        value,
        onFocus,
        onChange,
        absolutePath: path
      }
    ) : null,
    field.kind === "form-fields" ? /* @__PURE__ */ jsx10(
      WebsiteBuilderFormFieldsEditor,
      {
        value,
        onChange,
        onFocus: (path2) => onFocus(joinFieldPath(absolutePath ?? "", path2)),
        absolutePath: path
      }
    ) : null,
    field.kind === "select" ? /* @__PURE__ */ jsx10(
      SelectFieldEditor,
      {
        field,
        value,
        onChange,
        onFocus
      }
    ) : null,
    field.kind === "toggle" ? /* @__PURE__ */ jsxs6("label", { className: "inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-field)] px-4 py-3 text-sm text-[color:var(--wb-builder-text)]", children: [
      /* @__PURE__ */ jsx10(
        "input",
        {
          type: "checkbox",
          checked: Boolean(value),
          onFocus: () => onFocus(path),
          onChange: (event) => onChange(event.currentTarget.checked)
        }
      ),
      "Enable value"
    ] }) : null,
    field.kind === "tags" ? /* @__PURE__ */ jsx10(
      "textarea",
      {
        rows: 4,
        value: Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean).join(", ") : "",
        onFocus: () => onFocus(path),
        onChange: (event) => onChange(
          event.currentTarget.value.split(/[\n,]/).map((item) => item.trim()).filter(Boolean)
        ),
        placeholder: "keyword one, keyword two",
        className: inputClassName
      }
    ) : null,
    field.kind === "image" ? /* @__PURE__ */ jsx10(
      ImageFieldEditor,
      {
        blockId,
        path,
        documentId,
        value,
        onFocus: () => onFocus(path),
        onApply: onChange,
        onUpload: uploadMedia
      }
    ) : null,
    field.kind === "gallery" ? /* @__PURE__ */ jsx10(
      GalleryFieldEditor,
      {
        blockId,
        path,
        documentId,
        value,
        onFocus: () => onFocus(path),
        onApply: onChange,
        onUpload: uploadMedia
      }
    ) : null,
    ["text", "url", "color"].includes(field.kind) ? /* @__PURE__ */ jsx10(
      "input",
      {
        type: field.kind === "color" ? "color" : field.kind === "url" ? "url" : "text",
        value: String(value ?? ""),
        onFocus: () => onFocus(path),
        onChange: (event) => onChange(event.currentTarget.value),
        className: clsx4(
          inputClassName,
          field.kind === "color" && "h-14 cursor-pointer px-2 py-2"
        )
      }
    ) : null,
    field.kind === "number" ? /* @__PURE__ */ jsx10(
      "input",
      {
        type: "number",
        value: Number(value ?? 0),
        min: field.min,
        max: field.max,
        step: field.step ?? 1,
        onFocus: () => onFocus(path),
        onChange: (event) => onChange(Number(event.currentTarget.value)),
        className: inputClassName
      }
    ) : null
  ] });
};

// src/components/website-builder-field-editor-list.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
var WebsiteBuilderFieldEditorList = ({
  fields,
  subjectId,
  getValue,
  onChange,
  onFocus
}) => {
  return /* @__PURE__ */ jsx11("div", { className: "space-y-4", children: fields.map((field) => /* @__PURE__ */ jsx11(
    FieldEditor,
    {
      field,
      blockId: subjectId,
      value: getValue(field.path),
      onFocus: () => onFocus(field.path),
      onChange: (value) => onChange(field.path, value)
    },
    field.path
  )) });
};

// src/studio/website-builder-studio/website-builder-studio-inner.tsx
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  startTransition,
  useCallback as useCallback3,
  useDeferredValue,
  useEffect as useEffect17,
  useRef as useRef5,
  useState as useState20
} from "react";
import { createPortal } from "react-dom";
import { toast as toast4 } from "sonner";

// src/studio/canvas/canvas-block-item.tsx
import { Fragment as Fragment2, memo as memo2 } from "react";

// src/studio/canvas/canvas-block-shell.tsx
import { useDraggable } from "@dnd-kit/core";
import clsx5 from "clsx";
import {
  ChevronDown as ChevronDown2,
  ChevronUp,
  Copy,
  GripVertical,
  Trash2 as Trash23
} from "lucide-react";
import { memo, useEffect as useEffect3, useState as useState6 } from "react";
import { Fragment, jsx as jsx12, jsxs as jsxs7 } from "react/jsx-runtime";
var CanvasBlockShellComponent = ({
  block,
  blockLabel,
  blockModule,
  chromeStyle = "default",
  builderEnabled,
  collapseControlsEnabled,
  isSelected,
  isCollapsed,
  onSelect,
  onDuplicate,
  onDelete,
  onToggleCollapse,
  children
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `block:${block.id}`,
    data: {
      kind: "block",
      blockId: block.id
    },
    disabled: !builderEnabled
  });
  const [hasMounted, setHasMounted] = useState6(false);
  const chromeEnabled = builderEnabled || collapseControlsEnabled;
  const contentChromeOnly = collapseControlsEnabled && !builderEnabled;
  const edgeToEdgeChrome = chromeStyle === "edge-to-edge";
  useEffect3(() => {
    setHasMounted(true);
  }, []);
  const chromeBorderClassName = clsx5(
    "border transition",
    isSelected ? "border-[color:var(--wb-builder-border-strong)] shadow-[0_0_0_1px_var(--wb-builder-accent-strong)]" : "border-[color:var(--wb-builder-border)] group-hover:border-[color:var(--wb-builder-border-strong)]"
  );
  const chromeBadges = builderEnabled ? /* @__PURE__ */ jsxs7(Fragment, { children: [
    /* @__PURE__ */ jsx12(
      "div",
      {
        className: "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]",
        style: {
          borderColor: "var(--wb-builder-border)",
          background: "var(--wb-builder-panel-solid)",
          color: "var(--wb-builder-text-muted)"
        },
        children: blockLabel
      }
    ),
    /* @__PURE__ */ jsx12(
      "div",
      {
        className: "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]",
        style: {
          borderColor: "var(--wb-builder-border)",
          background: "var(--wb-builder-panel-solid)",
          color: "var(--wb-builder-text-ghost)"
        },
        children: blockModule
      }
    )
  ] }) : null;
  const chromeControls = chromeEnabled ? /* @__PURE__ */ jsxs7(Fragment, { children: [
    /* @__PURE__ */ jsx12(
      "button",
      {
        type: "button",
        onClick: (event) => {
          event.stopPropagation();
          onToggleCollapse();
        },
        className: "rounded-full border p-2 transition",
        style: {
          borderColor: "var(--wb-builder-border)",
          background: "var(--wb-builder-panel-solid)",
          color: "var(--wb-builder-text-muted)"
        },
        children: isCollapsed ? /* @__PURE__ */ jsx12(ChevronDown2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx12(ChevronUp, { className: "h-4 w-4" })
      }
    ),
    builderEnabled ? /* @__PURE__ */ jsxs7(Fragment, { children: [
      /* @__PURE__ */ jsx12(
        "button",
        {
          type: "button",
          onClick: (event) => {
            event.stopPropagation();
            onDuplicate();
          },
          className: "rounded-full border p-2 transition",
          style: {
            borderColor: "var(--wb-builder-border)",
            background: "var(--wb-builder-panel-solid)",
            color: "var(--wb-builder-text-muted)"
          },
          children: /* @__PURE__ */ jsx12(Copy, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx12(
        "button",
        {
          type: "button",
          onClick: (event) => {
            event.stopPropagation();
            onDelete();
          },
          className: "rounded-full border p-2 transition",
          style: {
            borderColor: "var(--wb-builder-border)",
            background: "var(--wb-builder-panel-solid)",
            color: "var(--wb-builder-text-muted)"
          },
          children: /* @__PURE__ */ jsx12(Trash23, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx12(
        "button",
        {
          type: "button",
          ...hasMounted ? attributes : {},
          ...hasMounted ? listeners : {},
          onClick: (event) => event.stopPropagation(),
          className: "rounded-full border p-2 transition",
          style: {
            borderColor: "var(--wb-builder-border)",
            background: "var(--wb-builder-panel-solid)",
            color: "var(--wb-builder-text-muted)"
          },
          children: /* @__PURE__ */ jsx12(GripVertical, { className: "h-4 w-4" })
        }
      )
    ] }) : null
  ] }) : null;
  if (edgeToEdgeChrome && chromeEnabled) {
    return /* @__PURE__ */ jsxs7(
      "article",
      {
        ref: hasMounted ? setNodeRef : void 0,
        role: chromeEnabled ? "button" : void 0,
        tabIndex: chromeEnabled ? 0 : void 0,
        onClick: chromeEnabled ? onSelect : void 0,
        onKeyDown: chromeEnabled ? (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect();
          }
        } : void 0,
        className: clsx5(
          "group relative transition duration-200",
          chromeEnabled && "cursor-default",
          hasMounted && isDragging && "opacity-0"
        ),
        children: [
          chromeEnabled ? /* @__PURE__ */ jsxs7("div", { className: "mb-3 flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsx12("div", { className: "pointer-events-none flex min-h-10 max-w-[70%] flex-wrap items-center gap-2", children: chromeBadges }),
            /* @__PURE__ */ jsx12("div", { className: "relative z-10 flex shrink-0 items-center gap-2", children: chromeControls })
          ] }) : null,
          /* @__PURE__ */ jsx12(
            "div",
            {
              className: clsx5(
                "relative overflow-hidden rounded-[28px]",
                chromeBorderClassName
              ),
              children
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs7(
    "article",
    {
      ref: hasMounted ? setNodeRef : void 0,
      role: chromeEnabled ? "button" : void 0,
      tabIndex: chromeEnabled ? 0 : void 0,
      onClick: chromeEnabled ? onSelect : void 0,
      onKeyDown: chromeEnabled ? (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      } : void 0,
      className: clsx5(
        "group relative transition duration-200",
        chromeEnabled && "cursor-default",
        hasMounted && isDragging && "opacity-0"
      ),
      children: [
        chromeEnabled ? /* @__PURE__ */ jsx12(
          "div",
          {
            className: clsx5(
              "pointer-events-none absolute inset-0 rounded-[36px] border transition",
              chromeBorderClassName
            )
          }
        ) : null,
        builderEnabled ? /* @__PURE__ */ jsx12("div", { className: "pointer-events-none absolute left-5 top-5 z-10 flex max-w-[70%] flex-wrap items-center gap-2", children: chromeBadges }) : null,
        chromeEnabled ? /* @__PURE__ */ jsx12("div", { className: "absolute right-5 top-5 z-10 flex items-center gap-2", children: chromeControls }) : null,
        /* @__PURE__ */ jsx12(
          "div",
          {
            className: clsx5(
              builderEnabled && (edgeToEdgeChrome ? "px-0 pb-0 pt-0" : "overflow-hidden rounded-[36px] px-4 pb-4 pt-16 sm:px-5 sm:pb-5 sm:pt-[4.75rem]"),
              contentChromeOnly && (edgeToEdgeChrome ? "px-0 pb-0 pt-0" : "overflow-hidden rounded-[36px] px-4 pb-4 pt-6 sm:px-5 sm:pb-5 sm:pt-7")
            ),
            children
          }
        )
      ]
    }
  );
};
var CanvasBlockShell = memo(CanvasBlockShellComponent);

// src/studio/canvas/canvas-insert-zone.tsx
import { useDroppable } from "@dnd-kit/core";
import clsx6 from "clsx";
import { Plus as Plus3 } from "lucide-react";
import { jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
var CanvasInsertZone = ({
  listId,
  index,
  builderEnabled,
  isActive,
  isDragging,
  isManual,
  isEmpty = false,
  onActivate
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: createInsertionZoneId(listId, index),
    data: {
      kind: "insert-zone",
      listId,
      index
    },
    disabled: !builderEnabled || !isDragging
  });
  if (!builderEnabled) {
    return null;
  }
  return /* @__PURE__ */ jsxs8(
    "div",
    {
      ref: setNodeRef,
      className: clsx6(
        "relative flex items-center justify-center transition-[padding] duration-200 ease-out",
        isDragging ? "py-4" : "py-2",
        isEmpty && !isDragging && "py-4"
      ),
      children: [
        /* @__PURE__ */ jsx13(
          "div",
          {
            className: clsx6(
              "absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-[22px] border border-dashed transition-[height,background-color,border-color,box-shadow] duration-200 ease-out",
              isDragging ? "h-14" : "h-6 border-transparent bg-transparent"
            ),
            style: {
              borderColor: isActive || isOver ? "var(--wb-builder-border-strong)" : isManual ? "var(--wb-builder-border)" : isDragging ? "var(--wb-builder-border)" : "transparent",
              background: isActive || isOver ? "var(--wb-builder-accent-strong)" : isManual ? "color-mix(in srgb, var(--wb-builder-accent) 8%, transparent)" : isDragging ? "var(--wb-builder-panel-muted)" : "transparent",
              boxShadow: isActive || isOver ? "var(--wb-builder-card-shadow)" : "none"
            }
          }
        ),
        /* @__PURE__ */ jsx13(
          "div",
          {
            className: clsx6(
              "absolute inset-x-0 top-1/2 h-px -translate-y-1/2 transition"
            ),
            style: {
              background: isActive || isOver ? "var(--wb-builder-border-strong)" : isManual ? "var(--wb-builder-border)" : "var(--wb-builder-border)"
            }
          }
        ),
        /* @__PURE__ */ jsxs8(
          "button",
          {
            type: "button",
            onClick: onActivate,
            className: clsx6(
              "relative z-10 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition duration-200",
              isDragging && "px-4 py-2"
            ),
            style: {
              borderColor: isActive || isOver ? "var(--wb-builder-border-strong)" : isManual ? "var(--wb-builder-border)" : "var(--wb-builder-border)",
              background: isActive || isOver ? "var(--wb-builder-accent-soft)" : isManual ? "color-mix(in srgb, var(--wb-builder-accent) 10%, var(--wb-builder-panel-solid))" : "var(--wb-builder-panel-solid)",
              color: isActive || isOver ? "var(--wb-builder-accent-text)" : isManual ? "var(--wb-builder-text)" : "var(--wb-builder-text-muted)"
            },
            children: [
              /* @__PURE__ */ jsx13(Plus3, { className: "h-3.5 w-3.5" }),
              isEmpty ? isDragging ? "Drop first block here" : "Insert first block" : isDragging ? "Drop block here" : "Insert here"
            ]
          }
        )
      ]
    }
  );
};

// src/studio/canvas/collapsed-block-preview.tsx
import { jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
var CollapsedBlockPreview = ({
  block
}) => {
  return /* @__PURE__ */ jsxs9(
    "div",
    {
      className: "rounded-[28px] border border-dashed px-5 py-5 text-sm",
      style: {
        borderColor: "var(--wb-builder-border)",
        background: "var(--wb-builder-panel-muted)",
        color: "var(--wb-builder-text-muted)"
      },
      children: [
        /* @__PURE__ */ jsx14(
          "div",
          {
            className: "font-semibold",
            style: { color: "var(--wb-builder-text)" },
            children: block.type
          }
        ),
        /* @__PURE__ */ jsx14(
          "div",
          {
            className: "mt-2",
            style: { color: "var(--wb-builder-text-soft)" },
            children: block.areas?.length ? `${block.areas.length} layout area${block.areas.length > 1 ? "s" : ""} hidden while collapsed.` : "Collapsed to keep the canvas compact while you work on neighboring sections."
          }
        )
      ]
    }
  );
};

// src/studio/canvas/canvas-block-item.tsx
import { jsx as jsx15, jsxs as jsxs10 } from "react/jsx-runtime";
var CanvasBlockItemComponent = ({
  block,
  index,
  listId,
  builderEnabled,
  collapseControlsEnabled,
  respectsCollapsedState,
  isDragging,
  manualInsertTarget,
  dropTarget,
  onActivateInsertTarget
}) => {
  const renderDepth = useWebsiteBuilderRenderDepth();
  const { translate } = useWebsiteBuilderI18n();
  const registry = useWebsiteBuilderStore((state) => state.registry);
  const isSelected = useWebsiteBuilderStore(
    (state) => state.selectedBlockId === block.id
  );
  const isCollapsed = useWebsiteBuilderStore(
    (state) => Boolean(state.collapsedBlockIds[block.id])
  );
  const selectBlock = useWebsiteBuilderStore((state) => state.selectBlock);
  const duplicateBlock = useWebsiteBuilderStore(
    (state) => state.duplicateBlock
  );
  const removeBlock = useWebsiteBuilderStore((state) => state.removeBlock);
  const toggleBlockCollapse = useWebsiteBuilderStore(
    (state) => state.toggleBlockCollapse
  );
  const definition = registry.getDefinition(block.module, block.type);
  const chromeStyle = definition?.category === "Site Frame" ? "edge-to-edge" : "default";
  return /* @__PURE__ */ jsxs10(Fragment2, { children: [
    /* @__PURE__ */ jsx15(
      CanvasBlockShell,
      {
        block,
        blockLabel: translate(
          definition?.labelKey ?? definition?.label ?? block.type,
          definition?.label ?? block.type
        ),
        blockModule: block.module,
        chromeStyle,
        builderEnabled,
        collapseControlsEnabled,
        isSelected,
        isCollapsed: respectsCollapsedState && isCollapsed,
        onDuplicate: () => duplicateBlock(block.id),
        onDelete: () => removeBlock(block.id),
        onSelect: () => selectBlock(block.id),
        onToggleCollapse: () => toggleBlockCollapse(block.id),
        children: respectsCollapsedState && isCollapsed ? /* @__PURE__ */ jsx15(CollapsedBlockPreview, { block }) : /* @__PURE__ */ jsx15(
          WebsiteBuilderBlockRenderer,
          {
            block,
            renderArea: (area) => /* @__PURE__ */ jsx15(WebsiteBuilderRenderDepthProvider, { value: renderDepth + 1, children: /* @__PURE__ */ jsx15(
              CanvasBlockList,
              {
                blocks: area.blocks,
                listId: createWebsiteBuilderAreaListId(block.id, area.id),
                builderEnabled,
                collapseControlsEnabled,
                respectsCollapsedState,
                isDragging,
                manualInsertTarget,
                dropTarget,
                onActivateInsertTarget
              }
            ) })
          }
        )
      }
    ),
    /* @__PURE__ */ jsx15(
      CanvasInsertZone,
      {
        listId,
        index: index + 1,
        builderEnabled,
        isActive: matchesTarget(dropTarget, listId, index + 1),
        isDragging,
        isManual: matchesTarget(manualInsertTarget, listId, index + 1),
        onActivate: () => onActivateInsertTarget({ listId, index: index + 1 })
      }
    )
  ] });
};
var CanvasBlockItem = memo2(CanvasBlockItemComponent);

// src/studio/canvas/canvas-block-list.tsx
import { jsx as jsx16, jsxs as jsxs11 } from "react/jsx-runtime";
var CanvasBlockList = ({
  blocks,
  listId,
  builderEnabled,
  collapseControlsEnabled,
  respectsCollapsedState,
  isDragging,
  manualInsertTarget,
  dropTarget,
  onActivateInsertTarget
}) => /* @__PURE__ */ jsxs11("div", { className: "space-y-[var(--wb-list-gap,0.75rem)]", children: [
  /* @__PURE__ */ jsx16(
    CanvasInsertZone,
    {
      listId,
      index: 0,
      builderEnabled,
      isActive: matchesTarget(dropTarget, listId, 0),
      isDragging,
      isManual: matchesTarget(manualInsertTarget, listId, 0),
      isEmpty: blocks.length === 0,
      onActivate: () => onActivateInsertTarget({ listId, index: 0 })
    }
  ),
  blocks.map((block, index) => /* @__PURE__ */ jsx16(
    CanvasBlockItem,
    {
      block,
      index,
      listId,
      builderEnabled,
      collapseControlsEnabled,
      respectsCollapsedState,
      isDragging,
      manualInsertTarget,
      dropTarget,
      onActivateInsertTarget
    },
    block.id
  ))
] });

// src/studio/canvas/block-overlay-card.tsx
import { jsx as jsx17, jsxs as jsxs12 } from "react/jsx-runtime";
var BlockOverlayCard = ({ block }) => {
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      className: "rounded-[24px] border px-4 py-4 text-sm backdrop-blur-xl",
      style: {
        borderColor: "var(--wb-builder-border-strong)",
        background: "var(--wb-builder-card-highlight), linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
        color: "var(--wb-builder-text)",
        boxShadow: "var(--wb-builder-shadow)"
      },
      children: [
        /* @__PURE__ */ jsx17(
          "div",
          {
            className: "text-[11px] uppercase tracking-[0.28em]",
            style: { color: "var(--wb-builder-text-soft)" },
            children: block.module
          }
        ),
        /* @__PURE__ */ jsx17("div", { className: "mt-2 font-semibold", children: block.type }),
        /* @__PURE__ */ jsx17(
          "div",
          {
            className: "mt-1",
            style: { color: "var(--wb-builder-text-muted)" },
            children: "Move block into any visible insert zone."
          }
        )
      ]
    }
  );
};

// src/studio/canvas/site-surface-canvas.tsx
import clsx7 from "clsx";
import {
  memo as memo3,
  useEffect as useEffect4,
  useRef,
  useState as useState7
} from "react";
import { jsx as jsx18, jsxs as jsxs13 } from "react/jsx-runtime";
var SiteSurfaceRegionSection = ({
  region,
  site,
  document: document2,
  builderEnabled,
  collapseControlsEnabled,
  respectsCollapsedState,
  isDragging,
  manualInsertTarget,
  dropTarget,
  onActivateInsertTarget,
  previewEnabled
}) => {
  const sectionRef = useRef(null);
  const [surfaceWidth, setSurfaceWidth] = useState7(0);
  const blocks = getWebsiteBuilderSurfaceRegionBlocks(document2, region.key) ?? [];
  const regionListId = getWebsiteBuilderSurfaceRegionListId(region.key);
  const isPageRegion = region.key === WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY;
  const builderRegionInsetClassName = builderEnabled ? "px-4 sm:px-5" : void 0;
  const builderSiteFrameInset = builderEnabled && (region.key === "header" || region.key === "footer");
  const stickySiteHeaderRegion = region.key === "header" && blocks.some(
    (block) => block.module === "website-builder-system" && block.type === "site-header-shell" && block.props.sticky === true
  );
  useEffect4(() => {
    const element = sectionRef.current;
    if (!element || typeof ResizeObserver === "undefined") {
      return;
    }
    const sync = () => setSurfaceWidth(Math.round(element.clientWidth));
    sync();
    const observer = new ResizeObserver(() => sync());
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsx18(
    WebsiteBuilderSurfaceLayoutProvider,
    {
      value: {
        builderEnabled,
        kind: region.kind,
        regionKey: region.key,
        width: surfaceWidth
      },
      children: /* @__PURE__ */ jsxs13(
        "section",
        {
          ref: sectionRef,
          "data-wb-surface-region": region.key,
          className: clsx7(
            "relative [container-type:inline-size]",
            previewEnabled && stickySiteHeaderRegion && "sticky z-40"
          ),
          style: previewEnabled && stickySiteHeaderRegion ? {
            top: "calc(var(--wb-dock-offset, 0px) + var(--wb-site-header-offset, 0px))"
          } : void 0,
          children: [
            builderEnabled ? /* @__PURE__ */ jsxs13(
              "div",
              {
                className: clsx7(
                  "pointer-events-none mb-3 flex flex-wrap items-center gap-2",
                  builderRegionInsetClassName
                ),
                children: [
                  /* @__PURE__ */ jsx18(
                    "div",
                    {
                      className: "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em]",
                      style: {
                        borderColor: "var(--wb-builder-border)",
                        background: "var(--wb-builder-panel-solid)",
                        color: "var(--wb-builder-text-ghost)"
                      },
                      children: region.label
                    }
                  ),
                  region.lockedOnCanvas ? /* @__PURE__ */ jsx18(
                    "div",
                    {
                      className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                      style: {
                        borderColor: "var(--wb-builder-border-strong)",
                        background: "var(--wb-builder-accent-soft)",
                        color: "var(--wb-builder-accent-text)"
                      },
                      children: "Fixed region"
                    }
                  ) : null
                ]
              }
            ) : null,
            /* @__PURE__ */ jsx18(
              "div",
              {
                className: clsx7(
                  "transition-all duration-500",
                  isPageRegion ? "mx-auto w-full max-w-[calc(var(--wb-site-max-width,1280px)+var(--wb-site-gutter,24px)*2)] px-[var(--wb-site-gutter,24px)]" : builderSiteFrameInset ? clsx7("w-full pb-1", builderRegionInsetClassName) : "w-full"
                ),
                style: isPageRegion ? {
                  "--wb-list-gap": "var(--wb-section-gap,2rem)"
                } : void 0,
                children: /* @__PURE__ */ jsx18(
                  CanvasBlockList,
                  {
                    blocks,
                    listId: regionListId,
                    builderEnabled,
                    collapseControlsEnabled,
                    respectsCollapsedState,
                    isDragging,
                    manualInsertTarget,
                    dropTarget,
                    onActivateInsertTarget
                  }
                )
              }
            )
          ]
        }
      )
    }
  );
};
var SiteSurfaceCanvasComponent = ({
  document: document2,
  site,
  builderEnabled,
  collapseControlsEnabled,
  respectsCollapsedState,
  isDragging,
  manualInsertTarget,
  dropTarget,
  onActivateInsertTarget
}) => {
  const mode = useWebsiteBuilderStore((state) => state.mode);
  const regions = resolveWebsiteBuilderSurfaceRegionDescriptors(site);
  const previewEnabled = mode !== "builder";
  return /* @__PURE__ */ jsx18("div", { className: "space-y-[var(--wb-section-gap,2rem)]", children: regions.map((region) => /* @__PURE__ */ jsx18(
    SiteSurfaceRegionSection,
    {
      region,
      site,
      document: document2,
      builderEnabled,
      collapseControlsEnabled,
      respectsCollapsedState,
      isDragging,
      manualInsertTarget,
      dropTarget,
      onActivateInsertTarget,
      previewEnabled
    },
    region.key
  )) });
};
var SiteSurfaceCanvas = memo3(SiteSurfaceCanvasComponent);

// src/studio/editor-dock/editor-dock.tsx
import clsx10 from "clsx";
import { LayoutPanelLeft, LayoutPanelTop, LogIn, LogOut } from "lucide-react";
import { useEffect as useEffect8, useRef as useRef2 } from "react";

// src/studio/editor-dock/editor-dock-brand.tsx
import { PanelsTopLeft as PanelsTopLeft2 } from "lucide-react";
import { jsx as jsx19, jsxs as jsxs14 } from "react/jsx-runtime";
var EditorDockBrand = ({
  title,
  compact = false
}) => {
  const { translate } = useWebsiteBuilderI18n();
  return /* @__PURE__ */ jsxs14(
    "div",
    {
      className: `flex min-w-0 items-start transition-[gap] duration-300 ease-out ${compact ? "gap-2.5" : "gap-3"}`,
      children: [
        /* @__PURE__ */ jsx19(
          "div",
          {
            className: `flex items-center justify-center rounded-2xl border transition-[width,height,transform] duration-300 ease-out ${compact ? "h-10 w-10" : "h-11 w-11"}`,
            style: {
              borderColor: "var(--wb-builder-border-strong)",
              background: "var(--wb-builder-accent-strong)",
              color: "var(--wb-builder-accent)"
            },
            children: /* @__PURE__ */ jsx19(PanelsTopLeft2, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxs14("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx19(
            "div",
            {
              className: "text-[11px] uppercase tracking-[0.3em]",
              style: { color: "var(--wb-builder-text-soft)" },
              children: translate("websiteBuilder.brand", "Website Builder")
            }
          ),
          /* @__PURE__ */ jsx19(
            "div",
            {
              className: `font-semibold tracking-[-0.03em] transition-[font-size] duration-300 ease-out ${compact ? "text-base" : "text-lg"}`,
              style: { color: "var(--wb-builder-text)" },
              children: title
            }
          )
        ] })
      ]
    }
  );
};

// src/studio/editor-dock/editor-locale-select.tsx
import { ChevronDown as ChevronDown3 } from "lucide-react";
import { useEffect as useEffect5, useState as useState8 } from "react";
import { jsx as jsx20, jsxs as jsxs15 } from "react/jsx-runtime";
var EditorLocaleSelect = ({
  label,
  value,
  options,
  onChange
}) => {
  const [hasMounted, setHasMounted] = useState8(false);
  const activeOption = options.find((option) => option.code === value) ?? options[0] ?? null;
  useEffect5(() => {
    setHasMounted(true);
  }, []);
  if (options.length <= 1 || !activeOption || typeof onChange !== "function") {
    return null;
  }
  const trigger = /* @__PURE__ */ jsxs15(
    "button",
    {
      type: "button",
      "aria-label": label,
      className: "inline-flex h-11 min-w-[10.25rem] cursor-pointer items-center justify-between gap-3 rounded-full border px-4 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,box-shadow,color] duration-200 ease-out outline-none border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] text-[color:var(--wb-builder-text)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-field)] focus-visible:border-[color:var(--wb-builder-border-strong)] focus-visible:bg-[color:var(--wb-builder-accent-strong)]",
      children: [
        /* @__PURE__ */ jsxs15("span", { className: "flex min-w-0 items-center gap-2.5", children: [
          /* @__PURE__ */ jsx20("span", { className: "text-[10px] uppercase tracking-[0.24em] text-[color:var(--wb-builder-text-soft)]", children: label }),
          /* @__PURE__ */ jsx20("span", { className: "truncate uppercase", children: activeOption.label })
        ] }),
        /* @__PURE__ */ jsx20(ChevronDown3, { className: "h-4 w-4 shrink-0 text-[color:var(--wb-builder-text-soft)] transition-transform duration-200 ease-out" })
      ]
    }
  );
  if (!hasMounted) {
    return trigger;
  }
  return /* @__PURE__ */ jsxs15(Root2, { modal: false, children: [
    /* @__PURE__ */ jsx20(Trigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsx20(DropdownMenuContent, { align: "start", children: /* @__PURE__ */ jsx20(
      RadioGroup,
      {
        value,
        onValueChange: (nextLocale) => onChange(nextLocale),
        children: options.map((option) => /* @__PURE__ */ jsx20(DropdownMenuRadioItem, { value: option.code, children: /* @__PURE__ */ jsxs15("span", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx20("span", { className: "text-[10px] uppercase tracking-[0.24em] text-[color:var(--wb-builder-text-soft)]", children: label }),
          /* @__PURE__ */ jsx20("span", { className: "uppercase", children: option.label })
        ] }) }, option.code))
      }
    ) })
  ] });
};

// src/studio/editor-dock/editor-mode-select.tsx
import { ChevronDown as ChevronDown4, Eye, PanelsTopLeft as PanelsTopLeft3, PenLine } from "lucide-react";
import { useEffect as useEffect6, useState as useState9 } from "react";
import { jsx as jsx21, jsxs as jsxs16 } from "react/jsx-runtime";
var MODE_OPTIONS = [
  { label: "Preview", value: "preview", icon: Eye },
  { label: "Content", value: "content", icon: PenLine },
  { label: "Builder", value: "builder", icon: PanelsTopLeft3 }
];
var EditorModeSelect = ({
  value,
  onChange
}) => {
  const activeValue = MODE_OPTIONS.find((option) => option.value === value)?.value ?? "preview";
  const [optimisticValue, setOptimisticValue] = useState9(activeValue);
  const activeOption = MODE_OPTIONS.find((option) => option.value === optimisticValue) ?? MODE_OPTIONS[0];
  const ActiveIcon = activeOption.icon;
  const [hasMounted, setHasMounted] = useState9(false);
  useEffect6(() => {
    setHasMounted(true);
  }, []);
  useEffect6(() => {
    setOptimisticValue(activeValue);
  }, [activeValue]);
  const trigger = /* @__PURE__ */ jsxs16(
    "button",
    {
      type: "button",
      "aria-label": "Editing mode",
      className: "inline-flex h-11 min-w-[10.25rem] cursor-pointer items-center justify-between gap-3 rounded-full border px-4 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,box-shadow,color] duration-200 ease-out outline-none border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] text-[color:var(--wb-builder-text)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-field)] focus-visible:border-[color:var(--wb-builder-border-strong)] focus-visible:bg-[color:var(--wb-builder-accent-strong)]",
      children: [
        /* @__PURE__ */ jsxs16("span", { className: "flex min-w-0 items-center gap-2.5", children: [
          /* @__PURE__ */ jsx21(ActiveIcon, { className: "h-4 w-4 text-[color:var(--wb-builder-accent)]" }),
          /* @__PURE__ */ jsx21("span", { children: activeOption.label })
        ] }),
        /* @__PURE__ */ jsx21(ChevronDown4, { className: "h-4 w-4 text-[color:var(--wb-builder-text-soft)] transition-transform duration-200 ease-out" })
      ]
    }
  );
  if (!hasMounted) {
    return trigger;
  }
  return /* @__PURE__ */ jsxs16(Root2, { modal: false, children: [
    /* @__PURE__ */ jsx21(Trigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsx21(DropdownMenuContent, { align: "start", children: /* @__PURE__ */ jsx21(
      RadioGroup,
      {
        value: optimisticValue,
        onValueChange: (nextMode) => {
          const resolvedMode = nextMode;
          setOptimisticValue(resolvedMode);
          onChange(resolvedMode);
        },
        children: MODE_OPTIONS.map((option) => {
          const OptionIcon = option.icon;
          return /* @__PURE__ */ jsx21(DropdownMenuRadioItem, { value: option.value, children: /* @__PURE__ */ jsxs16("span", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx21(OptionIcon, { className: "h-4 w-4 text-[color:var(--wb-builder-accent)]" }),
            /* @__PURE__ */ jsx21("span", { children: option.label })
          ] }) }, option.value);
        })
      }
    ) })
  ] });
};

// src/studio/editor-dock/editor-page-browser.tsx
import clsx8 from "clsx";
import { ChevronDown as ChevronDown5, FilePlus2, FolderTree } from "lucide-react";
import { useEffect as useEffect7, useMemo, useState as useState10 } from "react";

// src/i18n/website-builder-labels.ts
var PALETTE_CATEGORY_KEYS = {
  Content: "websiteBuilder.palette.categories.content",
  Conversion: "websiteBuilder.palette.categories.conversion",
  Evidence: "websiteBuilder.palette.categories.evidence",
  Hero: "websiteBuilder.palette.categories.hero",
  Layout: "websiteBuilder.palette.categories.layout",
  Media: "websiteBuilder.palette.categories.media",
  Publication: "websiteBuilder.palette.categories.publication",
  "Site Frame": "websiteBuilder.palette.categories.siteFrame",
  System: "websiteBuilder.palette.categories.system"
};
var FIELD_GROUP_KEYS = {
  content: "websiteBuilder.fieldGroups.content",
  style: "websiteBuilder.fieldGroups.style",
  layout: "websiteBuilder.fieldGroups.layout",
  data: "websiteBuilder.fieldGroups.data",
  misc: "websiteBuilder.fieldGroups.misc"
};
var PAGE_GROUP_KEYS = {
  Pages: "websiteBuilder.pageBrowser.groups.pages",
  Publications: "websiteBuilder.pageBrowser.groups.publications",
  Templates: "websiteBuilder.pageBrowser.groups.templates"
};
var translateWebsiteBuilderPaletteCategory = (category, translate) => translate(PALETTE_CATEGORY_KEYS[category] ?? category, category);
var translateWebsiteBuilderFieldGroup = (group, translate) => translate(FIELD_GROUP_KEYS[group] ?? group, group);
var translateWebsiteBuilderPageGroup = (group, translate) => translate(PAGE_GROUP_KEYS[group] ?? group, group);

// src/studio/editor-dock/editor-page-browser.tsx
import { Fragment as Fragment3, jsx as jsx22, jsxs as jsxs17 } from "react/jsx-runtime";
var EditorPageBrowser = ({
  activeMode,
  currentPage,
  pages,
  onOpenPage,
  onCreatePage
}) => {
  const { translate } = useWebsiteBuilderI18n();
  const [menuOpen, setMenuOpen] = useState10(false);
  const [dialogOpen, setDialogOpen] = useState10(false);
  const [name, setName] = useState10("");
  const [route, setRoute] = useState10("");
  const [duplicateCurrent, setDuplicateCurrent] = useState10(false);
  const [isSubmitting, setIsSubmitting] = useState10(false);
  const groupedPages = useMemo(() => {
    return pages.reduce(
      (groups, page) => {
        const key = page.group?.trim() || "Pages";
        groups[key] ??= [];
        groups[key].push(page);
        return groups;
      },
      {}
    );
  }, [pages]);
  const pageSections = useMemo(
    () => Object.entries(groupedPages).map(([group, items]) => ({
      id: group,
      label: translateWebsiteBuilderPageGroup(group, translate),
      items
    })),
    [groupedPages, translate]
  );
  const currentRouteLabel = currentPage?.routePattern ?? currentPage?.route ?? translate(
    "websiteBuilder.pageBrowser.unmappedRoute",
    "Unmapped route"
  );
  const canDuplicateCurrent = currentPage?.canDuplicate === true;
  const compact = activeMode === "builder";
  const pageMenu = useKeyboardMenuController({
    items: pages,
    getItemId: (page) => page.key,
    isItemDisabled: (page) => !page.canOpen || !onOpenPage,
    isOpen: menuOpen,
    preferredItemId: currentPage?.key ?? null,
    onSelectItem: (page) => {
      setMenuOpen(false);
      onOpenPage?.(page);
    }
  });
  const resetCreateForm = () => {
    setName("");
    setRoute("");
    setDuplicateCurrent(false);
  };
  useEffect7(() => {
    if (!menuOpen) {
      return;
    }
    window.requestAnimationFrame(() => pageMenu.focusList());
  }, [menuOpen]);
  return /* @__PURE__ */ jsxs17(Fragment3, { children: [
    /* @__PURE__ */ jsxs17(Root2, { open: menuOpen, onOpenChange: setMenuOpen, modal: false, children: [
      /* @__PURE__ */ jsx22(Trigger, { asChild: true, children: /* @__PURE__ */ jsxs17(
        "button",
        {
          type: "button",
          "data-testid": "wb-editor-page-browser-trigger",
          className: clsx8(
            "inline-flex min-w-[14rem] cursor-pointer items-center justify-between gap-3 rounded-full border px-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,box-shadow,color] duration-200 ease-out outline-none border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] text-[color:var(--wb-builder-text)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-field)] focus-visible:border-[color:var(--wb-builder-border-strong)] focus-visible:bg-[color:var(--wb-builder-accent-strong)]",
            compact ? "h-10" : "h-11"
          ),
          children: [
            /* @__PURE__ */ jsxs17("span", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxs17("span", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsx22(FolderTree, { className: "h-4 w-4 text-[color:var(--wb-builder-accent)]" }),
                /* @__PURE__ */ jsx22("span", { className: "truncate text-sm font-semibold", children: currentPage?.name ?? translate(
                  "websiteBuilder.pageBrowser.groups.pages",
                  "Pages"
                ) })
              ] }),
              /* @__PURE__ */ jsx22("span", { className: "mt-0.5 block truncate text-[11px] uppercase tracking-[0.22em] text-[color:var(--wb-builder-text-soft)]", children: currentRouteLabel })
            ] }),
            /* @__PURE__ */ jsx22(ChevronDown5, { className: "h-4 w-4 shrink-0 text-[color:var(--wb-builder-text-soft)]" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs17(DropdownMenuContent, { className: "w-[22rem] p-0", children: [
        /* @__PURE__ */ jsxs17(
          "div",
          {
            className: "border-b px-4 py-4",
            style: { borderColor: "var(--wb-builder-border)" },
            children: [
              /* @__PURE__ */ jsx22(
                "div",
                {
                  className: "text-[11px] uppercase tracking-[0.28em]",
                  style: { color: "var(--wb-builder-text-soft)" },
                  children: translate(
                    "websiteBuilder.pageBrowser.title",
                    "Page Browser"
                  )
                }
              ),
              /* @__PURE__ */ jsx22(
                "div",
                {
                  className: "mt-2 text-sm leading-6",
                  style: { color: "var(--wb-builder-text-muted)" },
                  children: translate(
                    "websiteBuilder.pageBrowser.description",
                    "Switch between live pages and shared templates without leaving the website surface."
                  )
                }
              ),
              onCreatePage ? /* @__PURE__ */ jsxs17(
                "button",
                {
                  type: "button",
                  "data-testid": "wb-page-browser-new-page",
                  onClick: () => {
                    setMenuOpen(false);
                    resetCreateForm();
                    setDialogOpen(true);
                  },
                  className: "mt-4 inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition",
                  style: {
                    borderColor: "var(--wb-builder-border-strong)",
                    background: "var(--wb-builder-accent-strong)",
                    color: "var(--wb-builder-accent)"
                  },
                  children: [
                    /* @__PURE__ */ jsx22(FilePlus2, { className: "h-4 w-4" }),
                    translate(
                      "websiteBuilder.pageBrowser.newPage",
                      "New Page"
                    )
                  ]
                }
              ) : null
            ]
          }
        ),
        /* @__PURE__ */ jsx22(
          KeyboardMenuList,
          {
            controller: pageMenu,
            sections: pageSections,
            getItemId: (page) => page.key,
            isItemDisabled: (page) => !page.canOpen || !onOpenPage,
            selectedItemId: currentPage?.key ?? null,
            listLabel: translate(
              "websiteBuilder.pageBrowser.listLabel",
              "Website builder page browser"
            ),
            className: "max-h-[26rem] space-y-4 overflow-y-auto px-3 py-3",
            renderItem: (page, { isActive, isDisabled, isSelected }) => {
              const routeLabel = page.routePattern ?? page.route;
              return /* @__PURE__ */ jsxs17(
                "button",
                {
                  type: "button",
                  tabIndex: -1,
                  disabled: isDisabled,
                  onClick: () => {
                    setMenuOpen(false);
                    onOpenPage?.(page);
                  },
                  className: clsx8(
                    "flex w-full items-start justify-between gap-3 rounded-[1rem] border px-3 py-3 text-left transition",
                    isDisabled && "cursor-not-allowed opacity-45"
                  ),
                  style: {
                    borderColor: isSelected ? "var(--wb-builder-border-strong)" : isActive ? "var(--wb-builder-border)" : "transparent",
                    background: isSelected ? "var(--wb-builder-accent-strong)" : isActive ? "var(--wb-builder-panel-muted)" : "transparent",
                    color: "var(--wb-builder-text)"
                  },
                  children: [
                    /* @__PURE__ */ jsxs17("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsx22(
                        "div",
                        {
                          className: "truncate text-sm font-semibold",
                          style: { color: "var(--wb-builder-text)" },
                          children: page.name
                        }
                      ),
                      /* @__PURE__ */ jsx22(
                        "div",
                        {
                          className: "mt-1 truncate font-mono text-[10px] uppercase tracking-[0.22em]",
                          style: { color: "var(--wb-builder-text-soft)" },
                          children: routeLabel
                        }
                      ),
                      page.description ? /* @__PURE__ */ jsx22(
                        "div",
                        {
                          className: "mt-2 text-xs leading-5",
                          style: { color: "var(--wb-builder-text-muted)" },
                          children: page.description
                        }
                      ) : null
                    ] }),
                    /* @__PURE__ */ jsx22(
                      "div",
                      {
                        className: "shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
                        style: {
                          borderColor: page.kind === "template" ? "var(--wb-builder-border-strong)" : "var(--wb-builder-border)",
                          background: page.kind === "template" ? "var(--wb-builder-accent-strong)" : "var(--wb-builder-panel-muted)",
                          color: page.kind === "template" ? "var(--wb-builder-accent)" : "var(--wb-builder-text-soft)"
                        },
                        children: page.kind
                      }
                    )
                  ]
                }
              );
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx22(
      Root,
      {
        open: dialogOpen,
        onOpenChange: (nextOpen) => {
          setDialogOpen(nextOpen);
          if (!nextOpen) {
            resetCreateForm();
          }
        },
        children: /* @__PURE__ */ jsxs17(DialogContent, { "data-testid": "wb-page-browser-create-dialog", children: [
          /* @__PURE__ */ jsxs17(DialogHeader, { children: [
            /* @__PURE__ */ jsx22(DialogTitle, { children: "Create Page" }),
            /* @__PURE__ */ jsx22(DialogDescription, { children: "Add a new static page to the live website and start editing it in the same builder surface." })
          ] }),
          /* @__PURE__ */ jsxs17("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs17("label", { className: "block", children: [
              /* @__PURE__ */ jsx22(
                "div",
                {
                  className: "mb-2 text-[11px] uppercase tracking-[0.24em]",
                  style: { color: "var(--wb-builder-text-soft)" },
                  children: "Page Name"
                }
              ),
              /* @__PURE__ */ jsx22(
                "input",
                {
                  "data-testid": "wb-page-browser-create-name",
                  value: name,
                  onChange: (event) => setName(event.currentTarget.value),
                  placeholder: "About us",
                  className: "w-full rounded-[1.25rem] border px-4 py-3 text-sm outline-none transition placeholder:text-[color:var(--wb-builder-text-ghost)]",
                  style: {
                    borderColor: "var(--wb-builder-border)",
                    background: "var(--wb-builder-field)",
                    color: "var(--wb-builder-text)"
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxs17("label", { className: "block", children: [
              /* @__PURE__ */ jsx22(
                "div",
                {
                  className: "mb-2 text-[11px] uppercase tracking-[0.24em]",
                  style: { color: "var(--wb-builder-text-soft)" },
                  children: "Route"
                }
              ),
              /* @__PURE__ */ jsx22(
                "input",
                {
                  "data-testid": "wb-page-browser-create-route",
                  value: route,
                  onChange: (event) => setRoute(event.currentTarget.value),
                  placeholder: "/about",
                  className: "w-full rounded-[1.25rem] border px-4 py-3 text-sm outline-none transition placeholder:text-[color:var(--wb-builder-text-ghost)]",
                  style: {
                    borderColor: "var(--wb-builder-border)",
                    background: "var(--wb-builder-field)",
                    color: "var(--wb-builder-text)"
                  }
                }
              )
            ] }),
            canDuplicateCurrent ? /* @__PURE__ */ jsxs17("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx22(
                "div",
                {
                  className: "text-[11px] uppercase tracking-[0.24em]",
                  style: { color: "var(--wb-builder-text-soft)" },
                  children: "Starting Point"
                }
              ),
              /* @__PURE__ */ jsxs17("div", { className: "grid gap-2 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxs17(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDuplicateCurrent(false),
                    className: clsx8(
                      "rounded-[1.2rem] border px-4 py-3 text-left transition"
                    ),
                    style: !duplicateCurrent ? {
                      borderColor: "var(--wb-builder-border-strong)",
                      background: "var(--wb-builder-accent-strong)",
                      color: "var(--wb-builder-text)"
                    } : {
                      borderColor: "var(--wb-builder-border)",
                      background: "var(--wb-builder-panel-muted)",
                      color: "var(--wb-builder-text-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx22("div", { className: "text-sm font-semibold", children: "Blank page" }),
                      /* @__PURE__ */ jsx22("div", { className: "mt-1 text-xs leading-5", children: "Start from a clean canvas." })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs17(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDuplicateCurrent(true),
                    className: clsx8(
                      "rounded-[1.2rem] border px-4 py-3 text-left transition"
                    ),
                    style: duplicateCurrent ? {
                      borderColor: "var(--wb-builder-border-strong)",
                      background: "var(--wb-builder-accent-strong)",
                      color: "var(--wb-builder-text)"
                    } : {
                      borderColor: "var(--wb-builder-border)",
                      background: "var(--wb-builder-panel-muted)",
                      color: "var(--wb-builder-text-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx22("div", { className: "text-sm font-semibold", children: "Duplicate current" }),
                      /* @__PURE__ */ jsx22("div", { className: "mt-1 text-xs leading-5", children: "Copy the current page layout into the new route." })
                    ]
                  }
                )
              ] })
            ] }) : null
          ] }),
          /* @__PURE__ */ jsxs17(DialogFooter, { children: [
            /* @__PURE__ */ jsx22(
              "button",
              {
                type: "button",
                onClick: () => setDialogOpen(false),
                className: "inline-flex h-11 cursor-pointer items-center justify-center rounded-full border px-5 text-sm font-semibold transition",
                style: {
                  borderColor: "var(--wb-builder-border)",
                  background: "var(--wb-builder-panel-muted)",
                  color: "var(--wb-builder-text-muted)"
                },
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx22(
              "button",
              {
                type: "button",
                disabled: isSubmitting || !name.trim() || !route.trim() || !onCreatePage,
                onClick: async () => {
                  if (!onCreatePage) {
                    return;
                  }
                  setIsSubmitting(true);
                  try {
                    await onCreatePage({
                      name: name.trim(),
                      route: route.trim(),
                      duplicateCurrent
                    });
                    setDialogOpen(false);
                    resetCreateForm();
                  } finally {
                    setIsSubmitting(false);
                  }
                },
                className: "inline-flex h-11 cursor-pointer items-center justify-center rounded-full border px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45",
                style: {
                  borderColor: "var(--wb-builder-border-strong)",
                  background: "var(--wb-builder-accent-strong)",
                  color: "var(--wb-builder-accent)"
                },
                children: isSubmitting ? "Creating..." : "Create page"
              }
            )
          ] })
        ] })
      }
    )
  ] });
};

// src/studio/editor-dock/editor-save-button.tsx
import clsx9 from "clsx";
import {
  ChevronRight,
  History,
  LoaderCircle,
  Save
} from "lucide-react";
import { useState as useState11 } from "react";

// src/components/ui/context-menu/index.ts
import {
  Root as Root3,
  Trigger as Trigger2
} from "@radix-ui/react-context-menu";

// src/components/ui/context-menu/context-menu-checkbox-item.tsx
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check as Check2 } from "lucide-react";
import {
  forwardRef as forwardRef3
} from "react";
import { jsx as jsx23, jsxs as jsxs18 } from "react/jsx-runtime";
var ContextMenuCheckboxItem = forwardRef3(({ className, children, checked, ...props }, ref) => {
  return /* @__PURE__ */ jsxs18(
    ContextMenuPrimitive.CheckboxItem,
    {
      ref,
      "data-slot": "context-menu-checkbox-item",
      checked,
      className: cn(
        "relative flex cursor-pointer select-none items-center rounded-[1rem] py-2.5 pl-9 pr-3 text-sm font-semibold text-[var(--wb-builder-text-muted)] outline-none transition-colors duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[highlighted]:bg-[var(--wb-builder-accent-strong)] data-[highlighted]:text-[var(--wb-builder-text)]",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx23("span", { className: "absolute left-3 inline-flex h-4 w-4 items-center justify-center", children: /* @__PURE__ */ jsx23(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx23(
          Check2,
          {
            className: "h-4 w-4",
            style: { color: "var(--wb-builder-accent)" }
          }
        ) }) }),
        children
      ]
    }
  );
});
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

// src/components/ui/context-menu/context-menu-content.tsx
import * as ContextMenuPrimitive2 from "@radix-ui/react-context-menu";
import {
  forwardRef as forwardRef4
} from "react";
import { jsx as jsx24 } from "react/jsx-runtime";
var ContextMenuContent = forwardRef4(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx24(ContextMenuPrimitive2.Portal, { children: /* @__PURE__ */ jsx24(
    ContextMenuPrimitive2.Content,
    {
      ref,
      "data-slot": "context-menu-content",
      collisionPadding: { top: 24, right: 16, bottom: 24, left: 16 },
      className: cn(
        "relative z-50 min-w-[13rem] overflow-hidden rounded-[1.35rem] border p-1.5 shadow-[var(--wb-builder-panel-shadow)] backdrop-blur-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      style: {
        borderColor: "var(--wb-builder-border)",
        background: "linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
        color: "var(--wb-builder-text)"
      },
      ...props
    }
  ) });
});
ContextMenuContent.displayName = ContextMenuPrimitive2.Content.displayName;

// src/components/ui/context-menu/context-menu-item.tsx
import * as ContextMenuPrimitive3 from "@radix-ui/react-context-menu";
import {
  forwardRef as forwardRef5
} from "react";
import { jsx as jsx25 } from "react/jsx-runtime";
var ContextMenuItem = forwardRef5(({ className, inset, ...props }, ref) => {
  return /* @__PURE__ */ jsx25(
    ContextMenuPrimitive3.Item,
    {
      ref,
      "data-slot": "context-menu-item",
      className: cn(
        "relative flex cursor-pointer select-none items-center rounded-[1rem] px-3 py-2.5 text-sm font-semibold text-[var(--wb-builder-text-muted)] outline-none transition-colors duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[highlighted]:bg-[var(--wb-builder-accent-strong)] data-[highlighted]:text-[var(--wb-builder-text)]",
        inset && "pl-9",
        className
      ),
      ...props
    }
  );
});
ContextMenuItem.displayName = ContextMenuPrimitive3.Item.displayName;

// src/components/ui/context-menu/context-menu-separator.tsx
import * as ContextMenuPrimitive4 from "@radix-ui/react-context-menu";
import {
  forwardRef as forwardRef6
} from "react";
import { jsx as jsx26 } from "react/jsx-runtime";
var ContextMenuSeparator = forwardRef6(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx26(
    ContextMenuPrimitive4.Separator,
    {
      ref,
      "data-slot": "context-menu-separator",
      className: cn("my-1.5 h-px bg-[var(--wb-builder-border)]", className),
      ...props
    }
  );
});
ContextMenuSeparator.displayName = ContextMenuPrimitive4.Separator.displayName;

// src/studio/editor-dock/editor-reset-dialog.tsx
import { jsx as jsx27, jsxs as jsxs19 } from "react/jsx-runtime";
var EditorResetDialog = ({
  open,
  onOpenChange,
  onConfirm
}) => {
  return /* @__PURE__ */ jsx27(Root, { open, onOpenChange, children: /* @__PURE__ */ jsxs19(DialogContent, { children: [
    /* @__PURE__ */ jsxs19(DialogHeader, { children: [
      /* @__PURE__ */ jsx27(DialogTitle, { children: "Discard local draft?" }),
      /* @__PURE__ */ jsx27(DialogDescription, { children: "This will remove every unsaved local change and restore the last version synced with Laravel." })
    ] }),
    /* @__PURE__ */ jsxs19(DialogFooter, { children: [
      /* @__PURE__ */ jsx27(
        "button",
        {
          type: "button",
          onClick: () => onOpenChange(false),
          className: "inline-flex h-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] text-[color:var(--wb-builder-text-muted)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-field)] hover:text-[color:var(--wb-builder-text)]",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx27(
        "button",
        {
          type: "button",
          onClick: onConfirm,
          className: "inline-flex h-11 items-center justify-center rounded-full border border-rose-400/18 bg-rose-400/10 px-4 text-sm font-semibold text-rose-100 transition hover:border-rose-300/28 hover:bg-rose-400/16 hover:text-white",
          children: "Discard draft"
        }
      )
    ] })
  ] }) });
};

// src/studio/editor-dock/get-save-button-meta.ts
var getSaveButtonMeta = ({
  activeMode,
  autosaveEnabled,
  hasUnsavedChanges,
  saveState
}) => {
  if (saveState === "error") {
    return {
      label: "Save failed",
      className: "border-[color:var(--wb-builder-border-strong)] bg-[color:color-mix(in_srgb,var(--wb-builder-accent)_18%,var(--wb-builder-panel-solid))] text-[color:var(--wb-builder-text)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:color-mix(in_srgb,var(--wb-builder-accent)_24%,var(--wb-builder-panel-solid))] hover:text-[color:var(--wb-builder-text)]",
      dotClassName: "bg-[color:var(--wb-builder-accent)]"
    };
  }
  if (saveState === "saving") {
    return {
      label: "Saving",
      className: "border-[color:var(--wb-builder-border-strong)] bg-[color:var(--wb-builder-accent-strong)] text-[color:var(--wb-builder-accent)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-accent-soft)] hover:text-[color:var(--wb-builder-accent-text)]",
      dotClassName: "bg-[color:var(--wb-builder-accent)]"
    };
  }
  if (hasUnsavedChanges) {
    return {
      label: autosaveEnabled ? "Sync pending" : "Draft pending",
      className: "border-[color:var(--wb-builder-border-strong)] bg-[color:color-mix(in_srgb,var(--wb-builder-accent)_14%,var(--wb-builder-panel-solid))] text-[color:var(--wb-builder-accent-text)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-accent-soft)] hover:text-[color:var(--wb-builder-accent-text)]",
      dotClassName: "bg-[color:var(--wb-builder-accent)]"
    };
  }
  return {
    label: activeMode === "builder" && autosaveEnabled ? "Builder synced" : autosaveEnabled ? "Synced" : "Saved",
    className: "border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] text-[color:var(--wb-builder-text-muted)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-field)] hover:text-[color:var(--wb-builder-text)]",
    dotClassName: "bg-[color:var(--wb-builder-text-soft)]"
  };
};

// src/studio/editor-dock/editor-save-button.tsx
import { Fragment as Fragment4, jsx as jsx28, jsxs as jsxs20 } from "react/jsx-runtime";
var EditorSaveButton = ({
  activeMode,
  autosaveEnabled,
  hasUnsavedChanges,
  collapsedBlockCount,
  saveState,
  showCollapsedInPreview,
  onAutosaveChange,
  onPreviewCollapsedChange,
  onReset,
  onSave
}) => {
  const [resetDialogOpen, setResetDialogOpen] = useState11(false);
  const meta = getSaveButtonMeta({
    activeMode,
    autosaveEnabled,
    hasUnsavedChanges,
    saveState
  });
  return /* @__PURE__ */ jsxs20(Fragment4, { children: [
    /* @__PURE__ */ jsxs20(Root3, { children: [
      /* @__PURE__ */ jsx28(Trigger2, { asChild: true, children: /* @__PURE__ */ jsxs20(
        "button",
        {
          type: "button",
          onClick: onSave,
          className: clsx9(
            "inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,color] duration-200 ease-out",
            meta.className
          ),
          children: [
            saveState === "saving" ? /* @__PURE__ */ jsx28(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx28(Save, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx28(
              "span",
              {
                className: clsx9("h-2.5 w-2.5 rounded-full", meta.dotClassName)
              }
            ),
            /* @__PURE__ */ jsx28("span", { children: meta.label })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs20(ContextMenuContent, { children: [
        /* @__PURE__ */ jsxs20(ContextMenuItem, { onSelect: onSave, children: [
          /* @__PURE__ */ jsx28(Save, { className: "mr-3 h-4 w-4 text-[color:var(--wb-builder-text-soft)]" }),
          "Save now"
        ] }),
        /* @__PURE__ */ jsx28(
          ContextMenuCheckboxItem,
          {
            checked: autosaveEnabled,
            onCheckedChange: (checked) => onAutosaveChange(checked === true),
            children: "Autosave"
          }
        ),
        /* @__PURE__ */ jsxs20(
          ContextMenuItem,
          {
            disabled: !hasUnsavedChanges,
            onSelect: () => {
              setResetDialogOpen(true);
            },
            children: [
              /* @__PURE__ */ jsx28(History, { className: "mr-3 h-4 w-4 text-[color:var(--wb-builder-text-soft)]" }),
              "Revert local draft"
            ]
          }
        ),
        /* @__PURE__ */ jsx28(ContextMenuSeparator, {}),
        activeMode === "preview" && collapsedBlockCount > 0 ? /* @__PURE__ */ jsxs20(ContextMenuItem, { onSelect: onPreviewCollapsedChange, children: [
          /* @__PURE__ */ jsx28(ChevronRight, { className: "mr-3 h-4 w-4 rotate-90 text-[color:var(--wb-builder-text-soft)]" }),
          showCollapsedInPreview ? "Show full layout" : "Show collapsed blocks"
        ] }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsx28(
      EditorResetDialog,
      {
        open: resetDialogOpen,
        onOpenChange: setResetDialogOpen,
        onConfirm: () => {
          setResetDialogOpen(false);
          onReset();
        }
      }
    )
  ] });
};

// src/studio/editor-dock/editor-dock.tsx
import { Fragment as Fragment5, jsx as jsx29, jsxs as jsxs21 } from "react/jsx-runtime";
var WEBSITE_BUILDER_EDITOR_DOCK_FALLBACK_HEIGHT = 80;
var EditorDock = ({
  activeMode,
  canManage,
  hasUnsavedChanges,
  collapsedBlockCount,
  autosaveEnabled,
  saveState,
  showCollapsedInPreview,
  title,
  description: _description,
  currentPage,
  pages,
  onHeightChange,
  onAuthOpen,
  onAutosaveChange,
  onOpenPage,
  onCreatePage,
  onContentLocaleChange,
  onInterfaceLocaleChange,
  showInterfaceLocaleControl,
  workspaceControl,
  onLogout,
  onModeChange,
  onPreviewCollapsedChange,
  onReset,
  onSave
}) => {
  const headerRef = useRef2(null);
  const {
    contentLocale,
    editableLocales,
    interfaceLocale,
    interfaceLocales,
    translate
  } = useWebsiteBuilderI18n();
  const compact = true;
  const contentLocaleOptions = editableLocales.map((locale) => ({
    code: locale.code,
    label: locale.label
  }));
  const WorkspaceIcon = workspaceControl?.isOpen ? LayoutPanelTop : LayoutPanelLeft;
  useEffect8(() => {
    const node = headerRef.current;
    if (!node) {
      return;
    }
    const updateHeight = () => {
      onHeightChange(Math.ceil(node.getBoundingClientRect().height));
    };
    updateHeight();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }
    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, [onHeightChange]);
  return /* @__PURE__ */ jsx29(
    "header",
    {
      ref: headerRef,
      className: "fixed inset-x-0 top-0 z-[60] border-b backdrop-blur-xl",
      "data-testid": "wb-editor-dock",
      style: {
        minHeight: WEBSITE_BUILDER_EDITOR_DOCK_FALLBACK_HEIGHT,
        background: "var(--wb-builder-dock-bg)",
        boxShadow: "var(--wb-builder-panel-shadow)",
        borderColor: "var(--wb-builder-border)",
        color: "var(--wb-builder-text)"
      },
      children: /* @__PURE__ */ jsx29(
        "div",
        {
          className: clsx10(
            "mx-auto flex flex-col px-4 sm:px-6 lg:px-8",
            compact ? "gap-2 py-2.5" : "gap-3 py-3"
          ),
          style: { maxWidth: "1720px" },
          children: /* @__PURE__ */ jsxs21(
            "div",
            {
              className: clsx10(
                "grid gap-3",
                canManage ? "xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center" : "lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
              ),
              children: [
                /* @__PURE__ */ jsx29(EditorDockBrand, { title, compact }),
                /* @__PURE__ */ jsx29(
                  "div",
                  {
                    className: clsx10(
                      "flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                      "flex-wrap lg:flex-nowrap",
                      canManage ? "xl:justify-end" : "lg:justify-end"
                    ),
                    children: canManage ? /* @__PURE__ */ jsxs21(Fragment5, { children: [
                      /* @__PURE__ */ jsx29(
                        EditorPageBrowser,
                        {
                          activeMode,
                          currentPage,
                          pages,
                          onOpenPage,
                          onCreatePage
                        }
                      ),
                      /* @__PURE__ */ jsx29(
                        EditorLocaleSelect,
                        {
                          label: translate(
                            "websiteBuilder.editor.contentLocale.label",
                            "Content"
                          ),
                          value: contentLocale,
                          options: contentLocaleOptions,
                          onChange: onContentLocaleChange
                        }
                      ),
                      showInterfaceLocaleControl ? /* @__PURE__ */ jsx29(
                        EditorLocaleSelect,
                        {
                          label: translate(
                            "websiteBuilder.editor.interfaceLocale.label",
                            "Interface"
                          ),
                          value: interfaceLocale,
                          options: interfaceLocales,
                          onChange: onInterfaceLocaleChange
                        }
                      ) : null,
                      workspaceControl ? /* @__PURE__ */ jsxs21(
                        "button",
                        {
                          type: "button",
                          className: "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] px-4 text-sm font-semibold text-[color:var(--wb-builder-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-field)]",
                          onClick: workspaceControl.onToggle,
                          "aria-pressed": workspaceControl.isOpen,
                          "aria-label": workspaceControl.isOpen ? "Hide workspace panel" : "Show workspace panel",
                          "data-testid": "wb-workspace-toggle",
                          children: [
                            /* @__PURE__ */ jsx29(WorkspaceIcon, { className: "h-4 w-4 text-[color:var(--wb-builder-accent)]" }),
                            /* @__PURE__ */ jsx29("span", { children: "Workspace" })
                          ]
                        }
                      ) : null,
                      /* @__PURE__ */ jsx29(EditorModeSelect, { value: activeMode, onChange: onModeChange }),
                      /* @__PURE__ */ jsx29(
                        EditorSaveButton,
                        {
                          activeMode,
                          autosaveEnabled,
                          hasUnsavedChanges,
                          collapsedBlockCount,
                          saveState,
                          showCollapsedInPreview,
                          onAutosaveChange,
                          onPreviewCollapsedChange,
                          onReset,
                          onSave
                        }
                      ),
                      /* @__PURE__ */ jsxs21(ToolbarButton, { onClick: onLogout, children: [
                        /* @__PURE__ */ jsx29(LogOut, { className: "h-4 w-4" }),
                        translate("websiteBuilder.auth.logOut", "Log out")
                      ] })
                    ] }) : /* @__PURE__ */ jsxs21(ToolbarButton, { onClick: onAuthOpen, children: [
                      /* @__PURE__ */ jsx29(LogIn, { className: "h-4 w-4" }),
                      translate("websiteBuilder.auth.signIn", "Admin sign in")
                    ] })
                  }
                )
              ]
            }
          )
        }
      )
    }
  );
};

// src/studio/palette-panel/palette-panel.tsx
import {
  ChevronDown as ChevronDown6,
  ChevronLeft,
  ChevronRight as ChevronRight2,
  Search,
  SlidersHorizontal
} from "lucide-react";
import { memo as memo4 } from "react";

// src/studio/palette-panel/palette-card.tsx
import { useDraggable as useDraggable2 } from "@dnd-kit/core";
import clsx11 from "clsx";
import { Boxes } from "lucide-react";
import { useEffect as useEffect9, useState as useState12 } from "react";
import { jsx as jsx30, jsxs as jsxs22 } from "react/jsx-runtime";
var PaletteCard = ({
  definition,
  isSelected,
  onInsert,
  onSelect
}) => {
  const { translate } = useWebsiteBuilderI18n();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable2({
    id: definition.key,
    data: {
      kind: "palette",
      module: definition.module,
      type: definition.type,
      definitionKey: definition.key
    }
  });
  const [hasMounted, setHasMounted] = useState12(false);
  const Icon = STUDIO_ICONS[definition.icon] ?? Boxes;
  useEffect9(() => {
    setHasMounted(true);
  }, []);
  return /* @__PURE__ */ jsxs22(
    "button",
    {
      type: "button",
      ref: hasMounted ? setNodeRef : void 0,
      ...hasMounted ? attributes : {},
      ...hasMounted ? listeners : {},
      onClick: () => onSelect(definition),
      onDoubleClick: () => onInsert(definition),
      "data-wb-palette-card": "true",
      className: clsx11(
        "group flex w-full cursor-pointer items-center gap-3 rounded-[28px] border px-3.5 py-3.5 text-left transition duration-200",
        hasMounted && isDragging && "opacity-0"
      ),
      style: {
        borderColor: isSelected ? "var(--wb-builder-border-strong)" : "var(--wb-builder-border)",
        background: isSelected ? "var(--wb-builder-card-highlight), var(--wb-builder-card-selected)" : "var(--wb-builder-card)",
        color: "var(--wb-builder-text)",
        boxShadow: "var(--wb-builder-card-shadow)"
      },
      children: [
        /* @__PURE__ */ jsx30(
          "div",
          {
            className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] border",
            style: {
              borderColor: isSelected ? "var(--wb-builder-border-strong)" : "var(--wb-builder-border)",
              background: isSelected ? "var(--wb-builder-accent-strong)" : "var(--wb-builder-field)",
              color: isSelected ? "var(--wb-builder-accent)" : "var(--wb-builder-text-soft)",
              boxShadow: "var(--wb-builder-card-shadow)"
            },
            children: /* @__PURE__ */ jsx30(Icon, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx30("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsx30(
          "div",
          {
            className: "truncate text-[15px] font-semibold",
            style: { color: "var(--wb-builder-text)" },
            children: translate(definition.labelKey ?? definition.label, definition.label)
          }
        ) })
      ]
    }
  );
};

// src/studio/palette-panel/palette-panel.tsx
import { jsx as jsx31, jsxs as jsxs23 } from "react/jsx-runtime";
var PalettePanelComponent = ({
  search,
  onSearchChange,
  allPaletteBlocks,
  paletteGroups,
  paletteFamily,
  onPaletteFamilyChange,
  palettePackage,
  onPalettePackageChange,
  collapsedFamilies,
  onToggleFamily,
  collapsedGroups,
  onToggleGroup,
  selectedDefinitionKey,
  onSelectDefinition,
  onInsert,
  manualInsertTarget: _manualInsertTarget,
  onCollapse
}) => {
  const { translate } = useWebsiteBuilderI18n();
  const normalizedSearch = search.trim().toLowerCase();
  const matchesSearch = (definition) => !normalizedSearch || [
    definition.label,
    definition.description,
    definition.category,
    definition.module,
    definition.family,
    definition.group,
    definition.package
  ].join(" ").toLowerCase().includes(normalizedSearch);
  const familyOptions = Array.from(
    new Set(allPaletteBlocks.map((definition) => definition.family))
  ).map((family) => ({
    value: family,
    enabled: allPaletteBlocks.some(
      (definition) => definition.family === family && (palettePackage === "all" || definition.package === palettePackage) && matchesSearch(definition)
    )
  })).sort((left, right) => {
    if (left.enabled !== right.enabled) {
      return left.enabled ? -1 : 1;
    }
    return left.value.localeCompare(right.value);
  });
  const packageOptions = Array.from(
    new Set(allPaletteBlocks.map((definition) => definition.package))
  ).map((pkg) => ({
    value: pkg,
    enabled: allPaletteBlocks.some(
      (definition) => definition.package === pkg && (paletteFamily === "all" || definition.family === paletteFamily) && matchesSearch(definition)
    )
  })).sort((left, right) => {
    if (left.enabled !== right.enabled) {
      return left.enabled ? -1 : 1;
    }
    return left.value.localeCompare(right.value);
  });
  return /* @__PURE__ */ jsxs23("div", { className: "flex h-full flex-col", children: [
    /* @__PURE__ */ jsxs23(
      "div",
      {
        className: "border-b px-5 py-5",
        style: { borderColor: "var(--wb-builder-border)" },
        children: [
          /* @__PURE__ */ jsxs23("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsx31(
              "div",
              {
                className: "text-[11px] uppercase tracking-[0.28em]",
                style: { color: "var(--wb-builder-text-soft)" },
                children: translate("websiteBuilder.palette.title", "Palette")
              }
            ),
            onCollapse ? /* @__PURE__ */ jsx31(
              "button",
              {
                type: "button",
                onClick: onCollapse,
                className: "cursor-pointer rounded-full border p-2 transition",
                style: {
                  borderColor: "var(--wb-builder-border)",
                  background: "var(--wb-builder-panel-muted)",
                  color: "var(--wb-builder-text-soft)"
                },
                children: /* @__PURE__ */ jsx31(ChevronLeft, { className: "h-4 w-4" })
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsxs23("div", { className: "relative mt-4", children: [
            /* @__PURE__ */ jsx31(
              Search,
              {
                className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
                style: { color: "var(--wb-builder-text-soft)" }
              }
            ),
            /* @__PURE__ */ jsx31(
              "input",
              {
                value: search,
                onChange: (event) => onSearchChange(event.currentTarget.value),
                placeholder: translate(
                  "websiteBuilder.palette.searchPlaceholder",
                  "Find blocks, categories, modules"
                ),
                className: "w-full rounded-[22px] border py-3 pl-10 pr-4 text-sm outline-none transition",
                style: {
                  borderColor: "var(--wb-builder-border)",
                  background: "var(--wb-builder-field)",
                  color: "var(--wb-builder-text)"
                }
              }
            ),
            /* @__PURE__ */ jsx31("div", { className: "absolute right-2 top-1/2 -translate-y-1/2", children: /* @__PURE__ */ jsxs23(Root2, { modal: false, children: [
              /* @__PURE__ */ jsx31(Trigger, { asChild: true, children: /* @__PURE__ */ jsx31(
                "button",
                {
                  type: "button",
                  "aria-label": "Open palette filters",
                  className: "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition",
                  style: {
                    borderColor: "var(--wb-builder-border)",
                    background: paletteFamily !== "all" || palettePackage !== "all" ? "var(--wb-builder-card-selected)" : "var(--wb-builder-panel-muted)",
                    color: "var(--wb-builder-text-soft)"
                  },
                  children: /* @__PURE__ */ jsx31(SlidersHorizontal, { className: "h-4 w-4" })
                }
              ) }),
              /* @__PURE__ */ jsxs23(
                DropdownMenuContent,
                {
                  align: "end",
                  className: "w-[20rem] space-y-4 p-3",
                  children: [
                    /* @__PURE__ */ jsxs23("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx31(
                        "div",
                        {
                          className: "text-[11px] font-semibold uppercase tracking-[0.24em]",
                          style: { color: "var(--wb-builder-text-soft)" },
                          children: "Family"
                        }
                      ),
                      /* @__PURE__ */ jsxs23("div", { className: "flex flex-wrap gap-2", children: [
                        /* @__PURE__ */ jsx31(
                          "button",
                          {
                            type: "button",
                            onClick: () => onPaletteFamilyChange("all"),
                            className: "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] transition",
                            style: {
                              borderColor: paletteFamily === "all" ? "var(--wb-builder-border-strong)" : "var(--wb-builder-border)",
                              background: paletteFamily === "all" ? "var(--wb-builder-card-selected)" : "var(--wb-builder-field)",
                              color: "var(--wb-builder-text)"
                            },
                            children: "All"
                          }
                        ),
                        familyOptions.map((family) => /* @__PURE__ */ jsx31(
                          "button",
                          {
                            type: "button",
                            onClick: () => family.enabled ? onPaletteFamilyChange(family.value) : void 0,
                            disabled: !family.enabled,
                            className: "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] transition",
                            style: {
                              borderColor: paletteFamily === family.value ? "var(--wb-builder-border-strong)" : "var(--wb-builder-border)",
                              background: paletteFamily === family.value ? "var(--wb-builder-card-selected)" : "var(--wb-builder-field)",
                              color: family.enabled ? "var(--wb-builder-text)" : "var(--wb-builder-text-ghost)",
                              opacity: family.enabled ? 1 : 0.55
                            },
                            children: family.value
                          },
                          family.value
                        ))
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs23("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx31(
                        "div",
                        {
                          className: "text-[11px] font-semibold uppercase tracking-[0.24em]",
                          style: { color: "var(--wb-builder-text-soft)" },
                          children: "Package"
                        }
                      ),
                      /* @__PURE__ */ jsxs23("div", { className: "flex flex-wrap gap-2", children: [
                        /* @__PURE__ */ jsx31(
                          "button",
                          {
                            type: "button",
                            onClick: () => onPalettePackageChange("all"),
                            className: "cursor-pointer rounded-full border px-3 py-1.5 text-xs transition",
                            style: {
                              borderColor: palettePackage === "all" ? "var(--wb-builder-border-strong)" : "var(--wb-builder-border)",
                              background: palettePackage === "all" ? "var(--wb-builder-card-selected)" : "var(--wb-builder-field)",
                              color: "var(--wb-builder-text-soft)"
                            },
                            children: "All"
                          }
                        ),
                        packageOptions.map((pkg) => /* @__PURE__ */ jsx31(
                          "button",
                          {
                            type: "button",
                            onClick: () => pkg.enabled ? onPalettePackageChange(pkg.value) : void 0,
                            disabled: !pkg.enabled,
                            className: "cursor-pointer rounded-full border px-3 py-1.5 text-xs transition",
                            style: {
                              borderColor: palettePackage === pkg.value ? "var(--wb-builder-border-strong)" : "var(--wb-builder-border)",
                              background: palettePackage === pkg.value ? "var(--wb-builder-card-selected)" : "var(--wb-builder-field)",
                              color: pkg.enabled ? "var(--wb-builder-text-soft)" : "var(--wb-builder-text-ghost)",
                              opacity: pkg.enabled ? 1 : 0.55
                            },
                            children: pkg.value
                          },
                          pkg.value
                        ))
                      ] })
                    ] })
                  ]
                }
              )
            ] }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx31("div", { className: "flex-1 overflow-y-auto px-4 py-4", children: /* @__PURE__ */ jsx31("div", { className: "space-y-4", children: paletteGroups.map((familyGroup) => /* @__PURE__ */ jsxs23("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs23(
        "button",
        {
          type: "button",
          onClick: () => onToggleFamily(familyGroup.family),
          className: "sticky top-0 z-10 flex w-full cursor-pointer items-center justify-between gap-3 rounded-[20px] border px-3 py-2.5 text-left shadow-[0_14px_34px_-26px_rgba(15,23,42,0.45)] backdrop-blur-xl transition",
          style: {
            color: "var(--wb-builder-text)",
            borderColor: "var(--wb-builder-border)",
            background: "var(--wb-builder-panel-muted)"
          },
          children: [
            /* @__PURE__ */ jsxs23("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx31(
                "div",
                {
                  className: "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em]",
                  style: {
                    color: "var(--wb-builder-text-soft)",
                    borderColor: "var(--wb-builder-border)",
                    background: "var(--wb-builder-card)"
                  },
                  children: familyGroup.family
                }
              ),
              /* @__PURE__ */ jsx31("span", { className: "font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--wb-builder-text-ghost)]", children: familyGroup.groups.reduce(
                (total, group) => total + group.definitions.length,
                0
              ) })
            ] }),
            /* @__PURE__ */ jsx31("div", { style: { color: "var(--wb-builder-text-ghost)" }, children: collapsedFamilies.includes(familyGroup.family) ? /* @__PURE__ */ jsx31(ChevronRight2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx31(ChevronDown6, { className: "h-4 w-4" }) })
          ]
        }
      ),
      collapsedFamilies.includes(familyGroup.family) ? null : familyGroup.groups.map(({ group, definitions }) => {
        const key = `${familyGroup.family}:${group}`;
        const collapsed = collapsedGroups.includes(key);
        return /* @__PURE__ */ jsxs23("section", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs23(
            "button",
            {
              type: "button",
              onClick: () => onToggleGroup(key),
              className: "flex w-full cursor-pointer items-center justify-between gap-3 rounded-[18px] px-2 py-1.5 text-left transition",
              style: { color: "var(--wb-builder-text)" },
              children: [
                /* @__PURE__ */ jsxs23("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx31(
                    "div",
                    {
                      className: "text-[11px] uppercase tracking-[0.28em]",
                      style: { color: "var(--wb-builder-text-soft)" },
                      children: translateWebsiteBuilderPaletteCategory(
                        group,
                        translate
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx31("span", { className: "font-mono text-[10px] uppercase tracking-[0.24em]", children: definitions.length })
                ] }),
                /* @__PURE__ */ jsx31("div", { style: { color: "var(--wb-builder-text-ghost)" }, children: collapsed ? /* @__PURE__ */ jsx31(ChevronRight2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx31(ChevronDown6, { className: "h-4 w-4" }) })
              ]
            }
          ),
          collapsed ? null : /* @__PURE__ */ jsx31("div", { className: "space-y-2", children: definitions.map((definition) => /* @__PURE__ */ jsx31(
            PaletteCard,
            {
              definition,
              isSelected: selectedDefinitionKey === definition.key,
              onSelect: onSelectDefinition,
              onInsert
            },
            definition.key
          )) })
        ] }, key);
      })
    ] }, familyGroup.family)) }) })
  ] });
};
var PalettePanel = memo4(PalettePanelComponent);

// src/studio/palette-panel/palette-overlay-card.tsx
import { Boxes as Boxes2 } from "lucide-react";
import { jsx as jsx32, jsxs as jsxs24 } from "react/jsx-runtime";
var PaletteOverlayCard = ({
  definition
}) => {
  const Icon = STUDIO_ICONS[definition.icon] ?? Boxes2;
  return /* @__PURE__ */ jsx32(
    "div",
    {
      className: "w-[13.5rem] min-w-[13.5rem] max-w-[13.5rem] overflow-hidden rounded-[30px] border px-3.5 py-3.5 text-left backdrop-blur-xl",
      style: {
        borderColor: "var(--wb-builder-border-strong)",
        background: "var(--wb-builder-card-highlight), linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
        color: "var(--wb-builder-text)",
        boxShadow: "var(--wb-builder-shadow)"
      },
      children: /* @__PURE__ */ jsxs24("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx32(
          "div",
          {
            className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[20px] border",
            style: {
              borderColor: "var(--wb-builder-border)",
              background: "var(--wb-builder-field)",
              color: "var(--wb-builder-accent)"
            },
            children: /* @__PURE__ */ jsx32(Icon, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxs24("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx32(
            "div",
            {
              className: "text-[10px] uppercase tracking-[0.26em]",
              style: { color: "var(--wb-builder-text-soft)" },
              children: definition.category
            }
          ),
          /* @__PURE__ */ jsx32("div", { className: "mt-1 truncate text-[1.05rem] font-semibold leading-6", children: definition.label }),
          /* @__PURE__ */ jsx32(
            "div",
            {
              className: "mt-2 text-[10px] uppercase tracking-[0.26em]",
              style: { color: "var(--wb-builder-text-ghost)" },
              children: definition.module
            }
          )
        ] })
      ] })
    }
  );
};

// src/studio/website-builder-studio/use-studio-browser-preferences.ts
import { useEffect as useEffect10, useState as useState13 } from "react";

// src/studio/website-builder-studio/studio-browser-storage.ts
import { openDB } from "idb";
var DATABASE_NAME = "website-builder-studio";
var STORE_NAME = "values";
var databasePromise = null;
var parseJsonLegacyValue = (rawValue) => {
  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
};
var getDatabase = async () => {
  if (databasePromise) {
    return databasePromise;
  }
  databasePromise = openDB(
    DATABASE_NAME,
    1,
    {
      upgrade(database) {
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME);
        }
      }
    }
  );
  return databasePromise;
};
var getDatabaseSafely = async () => {
  try {
    return await getDatabase();
  } catch {
    return null;
  }
};
var getStudioStorageItem = async (key, options = {}) => {
  const database = await getDatabaseSafely();
  if (database) {
    try {
      const storedValue = await database.get(STORE_NAME, key);
      if (storedValue !== void 0) {
        return storedValue;
      }
    } catch {
    }
  }
  if (typeof window === "undefined") {
    return null;
  }
  const rawValue = window.localStorage.getItem(key);
  if (rawValue === null) {
    return null;
  }
  const parseLegacy = options.parseLegacy ?? parseJsonLegacyValue;
  const parsedValue = parseLegacy(rawValue);
  if (parsedValue === null) {
    window.localStorage.removeItem(key);
    return null;
  }
  if (database) {
    try {
      await database.put(STORE_NAME, parsedValue, key);
      window.localStorage.removeItem(key);
    } catch {
    }
  }
  return parsedValue;
};
var setStudioStorageItem = async (key, value, options = {}) => {
  const database = await getDatabaseSafely();
  if (database) {
    try {
      await database.put(STORE_NAME, value, key);
      return;
    } catch {
    }
  }
  if (typeof window === "undefined") {
    return;
  }
  const serializeLegacy = options.serializeLegacy ?? ((candidate) => JSON.stringify(candidate));
  window.localStorage.setItem(key, serializeLegacy(value));
};
var removeStudioStorageItem = async (key) => {
  const database = await getDatabaseSafely();
  if (database) {
    try {
      await database.delete(STORE_NAME, key);
    } catch {
    }
  }
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(key);
};

// src/studio/website-builder-studio/use-studio-browser-preferences.ts
var isPersistedMode = (value) => value === "preview" || value === "content" || value === "builder";
var isPersistedBuilderSurfaceMode = (value) => value === "canvas" || value === "settings";
var resolveStudioBrowserPreferenceStorageKeys = (draftStorageKey) => ({
  modeStorageKey: `${draftStorageKey}:mode`,
  builderSurfaceStorageKey: `${draftStorageKey}:builder-surface`
});
var loadStudioModePreference = async ({
  isAdmin,
  hydrateModePreference,
  mode,
  search,
  storageKey,
  readStorage = getStudioStorageItem
}) => {
  if (!hydrateModePreference) {
    return {
      preferredMode: null
    };
  }
  const queryMode = new URLSearchParams(search).get("mode");
  const storedMode = await readStorage(storageKey, {
    parseLegacy: (rawValue) => isPersistedMode(rawValue) ? rawValue : null,
    serializeLegacy: (persistedMode) => persistedMode
  });
  const preferredMode = isPersistedMode(queryMode) ? queryMode : storedMode;
  return {
    preferredMode: isAdmin && isPersistedMode(preferredMode) && preferredMode !== mode ? preferredMode : null
  };
};
var persistStudioModePreference = async ({
  isAdmin,
  hydrated,
  mode,
  storageKey,
  writeStorage = setStudioStorageItem
}) => {
  if (!isAdmin || !hydrated) {
    return;
  }
  await writeStorage(storageKey, mode, {
    serializeLegacy: (persistedMode) => persistedMode
  });
};
var loadStudioBuilderSurfacePreference = async ({
  isAdmin,
  builderSurfaceMode,
  storageKey,
  readStorage = getStudioStorageItem
}) => {
  const storedSurfaceMode = await readStorage(storageKey, {
    parseLegacy: (rawValue) => isPersistedBuilderSurfaceMode(rawValue) ? rawValue : null,
    serializeLegacy: (persistedMode) => persistedMode
  });
  return {
    builderSurfaceMode: isAdmin && isPersistedBuilderSurfaceMode(storedSurfaceMode) && storedSurfaceMode !== builderSurfaceMode ? storedSurfaceMode : builderSurfaceMode
  };
};
var persistStudioBuilderSurfacePreference = async ({
  isAdmin,
  hydrated,
  builderSurfaceMode,
  storageKey,
  writeStorage = setStudioStorageItem
}) => {
  if (!isAdmin || !hydrated) {
    return;
  }
  await writeStorage(storageKey, builderSurfaceMode, {
    serializeLegacy: (persistedMode) => persistedMode
  });
};
var isStudioManualSaveShortcut = (event) => {
  const key = typeof event.key === "string" ? event.key.toLowerCase() : "";
  const code = typeof event.code === "string" ? event.code : "";
  return (code === "KeyS" || key === "s") && (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey;
};
var registerStudioManualSaveShortcut = ({
  isAdmin,
  target,
  onManualSave
}) => {
  if (!isAdmin) {
    return () => void 0;
  }
  const handleKeyDown = (event) => {
    const keyboardEvent = event;
    if (!isStudioManualSaveShortcut(keyboardEvent)) {
      return;
    }
    keyboardEvent.preventDefault();
    onManualSave();
  };
  target.addEventListener("keydown", handleKeyDown);
  return () => target.removeEventListener("keydown", handleKeyDown);
};
var useStudioBrowserPreferences = ({
  isAdmin,
  mode,
  setMode,
  draftStorageKey,
  hydrateModePreference,
  onManualSave
}) => {
  const [modePreferenceHydrated, setModePreferenceHydrated] = useState13(false);
  const [builderSurfaceMode, setBuilderSurfaceMode] = useState13("canvas");
  const [
    builderSurfacePreferenceHydrated,
    setBuilderSurfacePreferenceHydrated
  ] = useState13(false);
  const { modeStorageKey, builderSurfaceStorageKey } = resolveStudioBrowserPreferenceStorageKeys(draftStorageKey);
  useEffect10(() => {
    if (typeof window === "undefined") {
      return;
    }
    let cancelled = false;
    void (async () => {
      const { preferredMode } = await loadStudioModePreference({
        isAdmin,
        hydrateModePreference,
        mode,
        search: window.location.search,
        storageKey: modeStorageKey
      });
      if (!cancelled && preferredMode) {
        setMode(preferredMode);
      }
      if (!cancelled) {
        setModePreferenceHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [hydrateModePreference, isAdmin, modeStorageKey, setMode]);
  useEffect10(() => {
    if (typeof window === "undefined" || !isAdmin || !modePreferenceHydrated) {
      return;
    }
    void persistStudioModePreference({
      isAdmin,
      hydrated: modePreferenceHydrated,
      mode,
      storageKey: modeStorageKey
    });
  }, [isAdmin, mode, modePreferenceHydrated, modeStorageKey]);
  useEffect10(() => {
    if (typeof window === "undefined") {
      return;
    }
    let cancelled = false;
    void (async () => {
      const { builderSurfaceMode: preferredBuilderSurfaceMode } = await loadStudioBuilderSurfacePreference({
        isAdmin,
        builderSurfaceMode,
        storageKey: builderSurfaceStorageKey
      });
      if (!cancelled && preferredBuilderSurfaceMode !== builderSurfaceMode) {
        setBuilderSurfaceMode(preferredBuilderSurfaceMode);
      }
      if (!cancelled) {
        setBuilderSurfacePreferenceHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [builderSurfaceStorageKey, isAdmin]);
  useEffect10(() => {
    if (typeof window === "undefined" || !isAdmin || !builderSurfacePreferenceHydrated) {
      return;
    }
    void persistStudioBuilderSurfacePreference({
      isAdmin,
      hydrated: builderSurfacePreferenceHydrated,
      builderSurfaceMode,
      storageKey: builderSurfaceStorageKey
    });
  }, [
    builderSurfaceMode,
    builderSurfacePreferenceHydrated,
    builderSurfaceStorageKey,
    isAdmin
  ]);
  useEffect10(() => {
    if (typeof window === "undefined" || !isAdmin) {
      return;
    }
    return registerStudioManualSaveShortcut({
      isAdmin,
      target: window,
      onManualSave
    });
  }, [isAdmin, onManualSave]);
  return {
    builderSurfaceMode,
    setBuilderSurfaceMode
  };
};

// src/studio/website-builder-studio/use-studio-definition-catalog.ts
import { useMemo as useMemo2 } from "react";

// src/studio/website-builder-studio/helpers.ts
var resolvePaletteFamily = (definition) => {
  if (definition.family?.trim()) {
    return definition.family;
  }
  if (definition.type.startsWith("init-landing-")) {
    return "init";
  }
  if ([
    "hero-spotlight",
    "proof-strip",
    "feature-grid",
    "command-center-cta",
    "split-layout"
  ].includes(definition.type)) {
    return "paper";
  }
  return "standard";
};
var resolvePaletteGroup = (definition) => definition.group?.trim() || definition.category;
var resolvePalettePackage = (definition) => {
  if (definition.package?.trim()) {
    return definition.package;
  }
  if (definition.category === "Publication" || definition.type.includes("publication") || definition.type.includes("article")) {
    return "publication";
  }
  if (definition.module === "marketing-demo") {
    return "base-kit";
  }
  if (definition.module === "website-builder-system") {
    return "core";
  }
  return definition.module;
};
var normalizePaletteDefinitions = (definitions) => definitions.map((definition) => ({
  ...definition,
  family: resolvePaletteFamily(definition),
  group: resolvePaletteGroup(definition),
  package: resolvePalettePackage(definition)
}));
var filterPaletteDefinitions = (definitions, search, activeFamily, activePackage) => {
  const normalizedSearch = search.trim().toLowerCase();
  return definitions.filter((definition) => {
    const matchesFamily = activeFamily === "all" || definition.family === activeFamily;
    const matchesPackage = activePackage === "all" || definition.package === activePackage;
    const matchesSearch = !normalizedSearch || [
      definition.label,
      definition.description,
      definition.category,
      definition.module,
      definition.family,
      definition.group,
      definition.package
    ].join(" ").toLowerCase().includes(normalizedSearch);
    return matchesFamily && matchesPackage && matchesSearch;
  });
};
var groupPaletteDefinitions = (definitions) => {
  const families = /* @__PURE__ */ new Map();
  for (const definition of definitions) {
    const familyEntry = families.get(definition.family) ?? {
      packageOptions: /* @__PURE__ */ new Set(),
      groups: /* @__PURE__ */ new Map()
    };
    familyEntry.packageOptions.add(definition.package);
    const groupDefinitions = familyEntry.groups.get(definition.group) ?? [];
    groupDefinitions.push(definition);
    familyEntry.groups.set(definition.group, groupDefinitions);
    families.set(definition.family, familyEntry);
  }
  return Array.from(families.entries()).map(([family, entry]) => ({
    family,
    packageOptions: Array.from(entry.packageOptions).sort(
      (left, right) => left.localeCompare(right)
    ),
    groups: Array.from(entry.groups.entries()).map(([group, groupDefinitions]) => ({
      group,
      definitions: groupDefinitions
    })).sort((left, right) => left.group.localeCompare(right.group))
  }));
};
var groupInspectorFields = (definition) => definition?.fields.reduce((groups, field) => {
  const key = field.group ?? "misc";
  groups[key] ??= [];
  groups[key].push(field);
  return groups;
}, {}) ?? {};
var createInspectorDefinitionMeta = ({
  definition,
  module
}) => definition ? {
  label: definition.label,
  labelKey: definition.labelKey,
  description: definition.description,
  descriptionKey: definition.descriptionKey,
  module,
  category: definition.category,
  fieldCount: definition.fields.length
} : null;

// src/studio/website-builder-studio/use-studio-definition-catalog.ts
var createStudioDefinitionCatalog = ({
  registry,
  selectedBlock,
  selectedPaletteKey,
  currentPage,
  pageSettings,
  site,
  search,
  paletteFamily,
  palettePackage
}) => {
  const allPaletteBlocks = normalizePaletteDefinitions(
    registry.getPaletteBlocks()
  );
  const allPageSettingsPanels = registry.getPageSettingsPanels();
  const allSiteSettingsPanels = registry.getSiteSettingsPanels();
  const paletteDefinitionByKey = new Map(
    allPaletteBlocks.map((definition) => [definition.key, definition])
  );
  const paletteBlocks = filterPaletteDefinitions(
    allPaletteBlocks,
    search,
    paletteFamily,
    palettePackage
  );
  const paletteGroups = groupPaletteDefinitions(paletteBlocks);
  const selectedDefinition = selectedBlock && typeof selectedBlock.module === "string" && typeof selectedBlock.type === "string" ? registry.getDefinition(selectedBlock.module, selectedBlock.type) : null;
  const selectedPaletteDefinition = selectedPaletteKey ? paletteDefinitionByKey.get(selectedPaletteKey) ?? null : null;
  const effectiveInspectorDefinition = selectedDefinition ?? selectedPaletteDefinition;
  const inspectorGroups = groupInspectorFields(effectiveInspectorDefinition);
  const inspectorDefinition = createInspectorDefinitionMeta({
    definition: effectiveInspectorDefinition,
    module: (typeof selectedBlock?.module === "string" ? selectedBlock.module : selectedPaletteDefinition?.module) ?? ""
  });
  const visiblePageSettingsPanels = allPageSettingsPanels.filter(
    (panel) => panel.isVisible ? panel.isVisible({
      scope: panel.scope,
      currentPage,
      pageSettings
    }) : true
  );
  const visibleSiteSettingsPanels = allSiteSettingsPanels.filter(
    (panel) => panel.isVisible ? panel.isVisible({
      currentPage,
      pageSettings,
      site
    }) : true
  );
  const definitionFields = effectiveInspectorDefinition?.fields ?? [];
  return {
    allPaletteBlocks,
    paletteGroups,
    definitionFields,
    inspectorGroups,
    inspectorDefinition,
    visiblePageSettingsPanels,
    visibleSiteSettingsPanels
  };
};
var useStudioDefinitionCatalog = (input) => useMemo2(
  () => createStudioDefinitionCatalog(input),
  [
    input.currentPage,
    input.pageSettings,
    input.paletteFamily,
    input.palettePackage,
    input.registry,
    input.search,
    input.selectedBlock,
    input.selectedPaletteKey,
    input.site
  ]
);

// src/studio/website-builder-studio/use-studio-drag-state.ts
import { useState as useState14 } from "react";
var useStudioDragState = ({
  builderEnabled,
  document: document2,
  allPaletteBlocks,
  selectedBlockId,
  selectedBlock,
  insertBlock,
  moveBlock,
  selectBlock,
  onClearPaletteSelection
}) => {
  const [activePaletteKey, setActivePaletteKey] = useState14(null);
  const [activeBlockId, setActiveBlockId] = useState14(null);
  const [activeDragKind, setActiveDragKind] = useState14(null);
  const [dropTarget, setDropTarget] = useState14(null);
  const [paletteOverlayOrigin, setPaletteOverlayOrigin] = useState14(null);
  const activePaletteDefinition = activePaletteKey ? allPaletteBlocks.find(
    (definition) => definition.key === activePaletteKey
  ) ?? null : null;
  const activeBlock = activeBlockId && activeBlockId === selectedBlockId ? selectedBlock : activeBlockId ? findWebsiteBuilderBlock(document2.blocks, activeBlockId) : null;
  const handleDragStart = (event) => {
    const activeData = event.active.data.current;
    if (activeData?.kind === "palette") {
      setActiveDragKind("palette");
      setActivePaletteKey(String(activeData.definitionKey));
      const activatorTarget = event.activatorEvent.target instanceof HTMLElement ? event.activatorEvent.target : null;
      const paletteCard = activatorTarget?.closest(
        "[data-wb-palette-card='true']"
      );
      const paletteCardRect = paletteCard?.getBoundingClientRect();
      setPaletteOverlayOrigin(
        paletteCardRect ? {
          x: paletteCardRect.left,
          y: paletteCardRect.top
        } : null
      );
      return;
    }
    if (activeData?.kind === "block") {
      setActiveDragKind("block");
      const blockId = String(activeData.blockId);
      setActiveBlockId(blockId);
      onClearPaletteSelection();
      selectBlock(blockId);
    }
  };
  const handleDragOver = (event) => {
    const activeData = event.active.data.current;
    const candidate = resolveInsertTarget(event) ?? null;
    if (!candidate || activeData?.kind !== "block") {
      setDropTarget(candidate);
      return;
    }
    const sourceRegion = resolveWebsiteBuilderSurfaceRegionForBlockId(
      document2,
      String(activeData.blockId)
    );
    const targetRegion = resolveWebsiteBuilderSurfaceRegionForListId(
      document2,
      candidate.listId
    );
    setDropTarget(
      sourceRegion !== null && targetRegion !== null && sourceRegion === targetRegion ? candidate : null
    );
  };
  const resetDragState = () => {
    setActiveDragKind(null);
    setActivePaletteKey(null);
    setActiveBlockId(null);
    setDropTarget(null);
    setPaletteOverlayOrigin(null);
  };
  const handleDragEnd = (event) => {
    const activeData = event.active.data.current;
    const candidateTarget = resolveInsertTarget(event) ?? dropTarget;
    const target = activeData?.kind !== "block" || !candidateTarget ? candidateTarget : (() => {
      const sourceRegion = resolveWebsiteBuilderSurfaceRegionForBlockId(
        document2,
        String(activeData.blockId)
      );
      const targetRegion = resolveWebsiteBuilderSurfaceRegionForListId(
        document2,
        candidateTarget.listId
      );
      return sourceRegion !== null && targetRegion !== null && sourceRegion === targetRegion ? candidateTarget : null;
    })();
    if (target && activeData?.kind === "palette" && builderEnabled) {
      insertBlock({
        module: String(activeData.module),
        type: String(activeData.type),
        listId: target.listId,
        index: target.index
      });
    }
    if (target && activeData?.kind === "block" && builderEnabled) {
      moveBlock(String(activeData.blockId), target.listId, target.index);
    }
    resetDragState();
  };
  return {
    activeBlock,
    activeDragKind,
    activePaletteDefinition,
    paletteOverlayOrigin,
    dropTarget,
    handleDragCancel: resetDragState,
    handleDragEnd,
    handleDragOver,
    handleDragStart
  };
};

// src/studio/website-builder-studio/use-studio-persistence.ts
import { useCallback, useEffect as useEffect11, useMemo as useMemo3, useRef as useRef3, useState as useState15 } from "react";
import { toast as toast3 } from "sonner";

// src/studio/website-builder-studio/persistence-helpers.ts
var parseBooleanStorageValue = (rawValue) => {
  if (rawValue === "true") {
    return true;
  }
  if (rawValue === "false") {
    return false;
  }
  return null;
};
var getDefaultWebsiteBuilderAutosaveEnabled = () => false;
var parsePersistedDraft = (rawValue, fallbackUpdatedAt) => {
  try {
    const parsedValue = JSON.parse(rawValue);
    const parsedEnvelope = typeof parsedValue === "object" && parsedValue !== null && "document" in parsedValue ? parsedValue : null;
    const parsedDocument = parsedEnvelope?.document ?? parsedValue;
    if (typeof parsedDocument?.id !== "string" || typeof parsedDocument?.name !== "string" || typeof parsedDocument?.route !== "string" || !Array.isArray(parsedDocument?.blocks)) {
      return null;
    }
    return {
      workspaceKey: typeof parsedEnvelope?.workspaceKey === "string" ? parsedEnvelope.workspaceKey : null,
      payload: {
        expectedHeadRevisionId: null,
        saveMode: "manual",
        document: cloneWebsiteBuilderValue({
          id: parsedDocument.id,
          name: parsedDocument.name,
          route: parsedDocument.route,
          updatedAt: typeof parsedDocument.updatedAt === "string" ? parsedDocument.updatedAt : fallbackUpdatedAt,
          blocks: parsedDocument.blocks
        }),
        resources: cloneWebsiteBuilderValue(parsedEnvelope?.resources ?? {}),
        pageSettings: cloneWebsiteBuilderValue(
          parsedEnvelope?.pageSettings ?? {}
        ),
        site: cloneWebsiteBuilderValue(
          parsedEnvelope?.site ?? {
            settings: {},
            regions: {}
          }
        )
      }
    };
  } catch {
    return null;
  }
};
var getWebsiteBuilderStudioFingerprint = (document2, resources, pageSettings, site, workspace) => JSON.stringify({
  workspace: getWebsiteBuilderWorkspaceIdentityKey(workspace),
  document: getWebsiteBuilderDocumentFingerprint(document2),
  resources,
  pageSettings,
  site
});
var normalizeWebsiteBuilderStudioWorkspace = (workspace) => normalizeWebsiteBuilderWorkspaceDescriptor(workspace);
var normalizeWebsiteBuilderStudioCapabilities = (capabilities) => normalizeWebsiteBuilderWorkspaceCapabilities(capabilities);
var resolveWebsiteBuilderStudioWorkspaceKey = (workspace) => getWebsiteBuilderWorkspaceIdentityKey(workspace);
var resolveWebsiteBuilderStudioDraftStorageKey = ({
  baseKey,
  workspace
}) => `${baseKey}:${getWebsiteBuilderWorkspaceIdentityKey(workspace)}`;
var createWebsiteBuilderStudioSavePayload = ({
  workspace,
  expectedHeadRevisionId,
  saveMode,
  document: document2,
  resources,
  pageSettings,
  site
}) => ({
  workspace,
  expectedHeadRevisionId: expectedHeadRevisionId ?? workspace?.headRevisionId ?? null,
  commitMessage: null,
  saveMode,
  document: document2,
  resources,
  pageSettings,
  site
});
var createWebsiteBuilderStudioSiteSettingChangeContext = ({
  path,
  value,
  workspace,
  expectedHeadRevisionId,
  document: document2,
  resources,
  pageSettings,
  site,
  currentPage
}) => {
  const nextSiteSettings = setValueAtPath(
    cloneWebsiteBuilderValue(site.settings),
    path,
    value
  );
  return {
    ...createWebsiteBuilderStudioSavePayload({
      workspace,
      expectedHeadRevisionId,
      saveMode: "manual",
      document: document2,
      resources,
      pageSettings,
      site: {
        ...cloneWebsiteBuilderValue(site),
        settings: nextSiteSettings
      }
    }),
    currentPage: currentPage ?? null
  };
};
var canSaveWebsiteBuilderStudioDocument = ({
  isAdmin,
  workspace,
  capabilities
}) => canSaveWebsiteBuilderWorkspace({
  isAdmin,
  workspace,
  capabilities
});

// src/studio/website-builder-studio/use-studio-persistence.ts
var useStudioPersistence = ({
  initialDocument,
  initialResources,
  initialPageSettings,
  initialSite,
  contentRevision,
  persistedDocument,
  resources,
  pageSettings,
  site,
  isAdmin,
  workspace,
  capabilities,
  draftStorageKey,
  autosaveStorageKey,
  onSaveDocument,
  replaceState,
  syncExternalState
}) => {
  const normalizedWorkspace = useMemo3(
    () => normalizeWebsiteBuilderStudioWorkspace(workspace),
    [workspace]
  );
  const normalizedCapabilities = useMemo3(
    () => normalizeWebsiteBuilderStudioCapabilities(capabilities),
    [capabilities]
  );
  const workspaceKey = useMemo3(
    () => resolveWebsiteBuilderStudioWorkspaceKey(normalizedWorkspace),
    [normalizedWorkspace]
  );
  const draftStorageScopeKey = useMemo3(
    () => resolveWebsiteBuilderStudioDraftStorageKey({
      baseKey: draftStorageKey,
      workspace: normalizedWorkspace
    }),
    [draftStorageKey, normalizedWorkspace]
  );
  const canSaveDocument = useMemo3(
    () => canSaveWebsiteBuilderStudioDocument({
      isAdmin,
      workspace: normalizedWorkspace,
      capabilities: normalizedCapabilities
    }),
    [isAdmin, normalizedCapabilities, normalizedWorkspace]
  );
  const [autosaveEnabled, setAutosaveEnabled] = useState15(
    getDefaultWebsiteBuilderAutosaveEnabled
  );
  const [saveState, setSaveState] = useState15("idle");
  const [hasHydrated, setHasHydrated] = useState15(false);
  const [lastSavedRevision, setLastSavedRevision] = useState15(0);
  const [lastSavedState, setLastSavedState] = useState15(() => ({
    ...createWebsiteBuilderStudioSavePayload({
      workspace: cloneWebsiteBuilderValue(normalizedWorkspace),
      expectedHeadRevisionId: normalizedWorkspace.headRevisionId ?? null,
      saveMode: "manual",
      document: cloneWebsiteBuilderValue(initialDocument),
      resources: cloneWebsiteBuilderValue(initialResources),
      pageSettings: cloneWebsiteBuilderValue(initialPageSettings),
      site: cloneWebsiteBuilderValue(initialSite)
    })
  }));
  const hasLoadedDraftRef = useRef3(null);
  const initialStateFingerprint = useMemo3(
    () => getWebsiteBuilderStudioFingerprint(
      initialDocument,
      initialResources,
      initialPageSettings,
      initialSite,
      normalizedWorkspace
    ),
    [
      initialDocument,
      initialPageSettings,
      initialResources,
      initialSite,
      normalizedWorkspace
    ]
  );
  const hasUnsavedChanges = contentRevision !== lastSavedRevision;
  useEffect11(() => {
    setLastSavedRevision(0);
    setLastSavedState(
      createWebsiteBuilderStudioSavePayload({
        workspace: cloneWebsiteBuilderValue(normalizedWorkspace),
        expectedHeadRevisionId: normalizedWorkspace.headRevisionId ?? null,
        saveMode: "manual",
        document: cloneWebsiteBuilderValue(initialDocument),
        resources: cloneWebsiteBuilderValue(initialResources),
        pageSettings: cloneWebsiteBuilderValue(initialPageSettings),
        site: cloneWebsiteBuilderValue(initialSite)
      })
    );
    setSaveState("idle");
  }, [
    initialDocument,
    initialPageSettings,
    initialResources,
    initialSite,
    draftStorageScopeKey
  ]);
  useEffect11(() => {
    setLastSavedState((currentState) => ({
      ...currentState,
      workspace: cloneWebsiteBuilderValue(normalizedWorkspace)
    }));
  }, [normalizedWorkspace]);
  useEffect11(() => {
    if (!isAdmin || hasLoadedDraftRef.current === workspaceKey || typeof window === "undefined") {
      return;
    }
    hasLoadedDraftRef.current = workspaceKey;
    let cancelled = false;
    void (async () => {
      try {
        const [storedAutosave, storedDraft] = await Promise.all([
          getStudioStorageItem(autosaveStorageKey, {
            parseLegacy: parseBooleanStorageValue,
            serializeLegacy: String
          }),
          getStudioStorageItem(draftStorageScopeKey, {
            parseLegacy: (rawValue) => parsePersistedDraft(rawValue, initialDocument.updatedAt)
          })
        ]);
        if (cancelled) {
          return;
        }
        if (storedAutosave !== null) {
          setAutosaveEnabled(storedAutosave);
        }
        if (!storedDraft) {
          return;
        }
        if (storedDraft.workspaceKey !== null && storedDraft.workspaceKey !== workspaceKey) {
          return;
        }
        if (getWebsiteBuilderStudioFingerprint(
          storedDraft.payload.document,
          storedDraft.payload.resources,
          storedDraft.payload.pageSettings,
          storedDraft.payload.site,
          normalizedWorkspace
        ) === initialStateFingerprint) {
          return;
        }
        if (!canSaveDocument) {
          return;
        }
        replaceState(
          storedDraft.payload.document,
          storedDraft.payload.resources,
          storedDraft.payload.pageSettings,
          storedDraft.payload.site,
          {
            workspace: normalizedWorkspace,
            capabilities: normalizedCapabilities
          }
        );
        toast3.info("Draft restored", {
          description: "Recovered your local draft after reload."
        });
      } finally {
        if (!cancelled) {
          setHasHydrated(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [
    autosaveStorageKey,
    canSaveDocument,
    draftStorageScopeKey,
    initialDocument,
    initialStateFingerprint,
    isAdmin,
    normalizedCapabilities,
    normalizedWorkspace,
    replaceState,
    workspaceKey
  ]);
  useEffect11(() => {
    if (typeof window === "undefined" || !isAdmin || !hasHydrated || !canSaveDocument) {
      return;
    }
    if (hasUnsavedChanges) {
      const timeoutId = window.setTimeout(() => {
        void setStudioStorageItem(draftStorageScopeKey, {
          workspaceKey,
          document: cloneWebsiteBuilderValue(persistedDocument),
          resources: cloneWebsiteBuilderValue(resources),
          pageSettings: cloneWebsiteBuilderValue(pageSettings),
          site: cloneWebsiteBuilderValue(site)
        });
      }, 180);
      return () => window.clearTimeout(timeoutId);
    }
    void removeStudioStorageItem(draftStorageScopeKey);
  }, [
    canSaveDocument,
    draftStorageScopeKey,
    hasHydrated,
    hasUnsavedChanges,
    isAdmin,
    pageSettings,
    persistedDocument,
    resources,
    site,
    workspaceKey
  ]);
  useEffect11(() => {
    if (typeof window === "undefined" || !isAdmin || !hasHydrated) {
      return;
    }
    void setStudioStorageItem(autosaveStorageKey, autosaveEnabled, {
      serializeLegacy: String
    });
  }, [autosaveEnabled, autosaveStorageKey, hasHydrated, isAdmin]);
  const saveDocument = useCallback(
    async (reason) => {
      if (!canSaveDocument || saveState === "saving") {
        if (reason !== "autosave" && isAdmin) {
          toast3.error("Save unavailable", {
            description: "This workspace is readonly or direct commits are currently blocked."
          });
        }
        return;
      }
      setSaveState("saving");
      try {
        const persistedState = await onSaveDocument?.(
          createWebsiteBuilderStudioSavePayload({
            workspace: normalizedWorkspace,
            expectedHeadRevisionId: lastSavedState.expectedHeadRevisionId ?? normalizedWorkspace.headRevisionId ?? null,
            saveMode: reason,
            document: persistedDocument,
            resources,
            pageSettings,
            site
          }),
          {
            reason,
            workspace: normalizedWorkspace,
            capabilities: normalizedCapabilities
          }
        ) ?? createWebsiteBuilderStudioSavePayload({
          workspace: normalizedWorkspace,
          expectedHeadRevisionId: lastSavedState.expectedHeadRevisionId ?? normalizedWorkspace.headRevisionId ?? null,
          saveMode: reason,
          document: persistedDocument,
          resources,
          pageSettings,
          site
        });
        syncExternalState({
          initialDocument: persistedState.document,
          initialResources: persistedState.resources,
          initialPageSettings: persistedState.pageSettings,
          initialSite: persistedState.site,
          workspace: persistedState.workspace ?? normalizedWorkspace,
          capabilities: normalizedCapabilities
        });
        setLastSavedState(
          createWebsiteBuilderStudioSavePayload({
            workspace: cloneWebsiteBuilderValue(
              persistedState.workspace ?? normalizedWorkspace
            ),
            expectedHeadRevisionId: persistedState.expectedHeadRevisionId ?? persistedState.workspace?.headRevisionId ?? normalizedWorkspace.headRevisionId ?? null,
            saveMode: persistedState.saveMode,
            document: cloneWebsiteBuilderValue(persistedState.document),
            resources: cloneWebsiteBuilderValue(persistedState.resources),
            pageSettings: cloneWebsiteBuilderValue(
              persistedState.pageSettings
            ),
            site: cloneWebsiteBuilderValue(persistedState.site)
          })
        );
        setLastSavedRevision(0);
        setSaveState("saved");
        if (reason !== "autosave") {
          toast3.success("Saved successfully", {
            description: "Document changes were saved successfully."
          });
        }
      } catch (error) {
        setSaveState("error");
        toast3.error("Save failed", {
          description: error instanceof Error ? error.message : "Failed to save the document."
        });
      }
    },
    [
      canSaveDocument,
      contentRevision,
      isAdmin,
      normalizedCapabilities,
      normalizedWorkspace,
      onSaveDocument,
      pageSettings,
      persistedDocument,
      replaceState,
      resources,
      saveState,
      site,
      syncExternalState,
      lastSavedState.expectedHeadRevisionId
    ]
  );
  const restoreLastSavedState = useCallback(() => {
    syncExternalState({
      initialDocument: cloneWebsiteBuilderValue(lastSavedState.document),
      initialResources: cloneWebsiteBuilderValue(lastSavedState.resources),
      initialPageSettings: cloneWebsiteBuilderValue(lastSavedState.pageSettings),
      initialSite: cloneWebsiteBuilderValue(lastSavedState.site),
      workspace: lastSavedState.workspace ?? normalizedWorkspace,
      capabilities: normalizedCapabilities
    });
    setLastSavedRevision(0);
  }, [
    lastSavedState,
    normalizedCapabilities,
    normalizedWorkspace,
    syncExternalState
  ]);
  useEffect11(() => {
    if (!canSaveDocument || !autosaveEnabled || !hasUnsavedChanges) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      void saveDocument("autosave");
    }, 900);
    return () => window.clearTimeout(timeoutId);
  }, [
    autosaveEnabled,
    canSaveDocument,
    contentRevision,
    hasUnsavedChanges,
    saveDocument
  ]);
  useEffect11(() => {
    if (saveState === "idle" || saveState === "saving") {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setSaveState("idle");
    }, 2200);
    return () => window.clearTimeout(timeoutId);
  }, [saveState]);
  return {
    autosaveEnabled,
    canSaveDocument,
    setAutosaveEnabled,
    hasUnsavedChanges,
    lastSavedState,
    restoreLastSavedState,
    saveState,
    saveDocument,
    expectedHeadRevisionId: lastSavedState.expectedHeadRevisionId
  };
};

// src/studio/website-builder-studio/use-studio-site-setting-change.ts
import { useCallback as useCallback2 } from "react";
var applyStudioSiteSettingChange = ({
  path,
  value,
  workspace,
  expectedHeadRevisionId,
  document: document2,
  resources,
  pageSettings,
  site,
  currentPage,
  updateSiteSettingValue,
  onSiteSettingChange,
  replaceState
}) => {
  updateSiteSettingValue(path, value);
  if (!onSiteSettingChange) {
    return;
  }
  const replacement = onSiteSettingChange(
    path,
    value,
    createWebsiteBuilderStudioSiteSettingChangeContext({
      path,
      value,
      workspace,
      expectedHeadRevisionId,
      document: document2,
      resources,
      pageSettings,
      site,
      currentPage
    })
  );
  if (!replacement) {
    return;
  }
  replaceState(
    replacement.document,
    replacement.resources,
    replacement.pageSettings,
    replacement.site
  );
};
var useStudioSiteSettingChange = ({
  workspace,
  expectedHeadRevisionId,
  document: document2,
  resources,
  pageSettings,
  site,
  currentPage,
  updateSiteSettingValue,
  onSiteSettingChange,
  replaceState
}) => useCallback2(
  (path, value) => {
    applyStudioSiteSettingChange({
      path,
      value,
      workspace,
      expectedHeadRevisionId,
      document: document2,
      resources,
      pageSettings,
      site,
      currentPage,
      updateSiteSettingValue,
      onSiteSettingChange,
      replaceState
    });
  },
  [
    currentPage,
    document2,
    expectedHeadRevisionId,
    onSiteSettingChange,
    pageSettings,
    replaceState,
    resources,
    site,
    updateSiteSettingValue,
    workspace
  ]
);

// src/studio/website-builder-studio/use-studio-sidebars.ts
import {
  useEffect as useEffect12,
  useRef as useRef4,
  useState as useState16
} from "react";
var DEFAULT_LEFT_WIDTH = 304;
var DEFAULT_RIGHT_WIDTH = 368;
var MIN_LEFT_WIDTH = 264;
var MAX_LEFT_WIDTH = 480;
var MIN_RIGHT_WIDTH = 320;
var MAX_RIGHT_WIDTH = 560;
var clamp = (value, min, max) => Math.min(Math.max(value, min), max);
var isPersistedSidebarState = (value) => {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value;
  return typeof candidate.leftWidth === "number" && typeof candidate.rightWidth === "number" && typeof candidate.leftCollapsed === "boolean" && typeof candidate.rightCollapsed === "boolean";
};
var useStudioSidebars = ({ storageKey }) => {
  const [leftWidth, setLeftWidth] = useState16(DEFAULT_LEFT_WIDTH);
  const [rightWidth, setRightWidth] = useState16(DEFAULT_RIGHT_WIDTH);
  const [leftCollapsed, setLeftCollapsed] = useState16(false);
  const [rightCollapsed, setRightCollapsed] = useState16(false);
  const [hasHydrated, setHasHydrated] = useState16(false);
  const [isResizing, setIsResizing] = useState16(false);
  const resizeFrameRef = useRef4(null);
  useEffect12(() => {
    let cancelled = false;
    void (async () => {
      try {
        const parsedValue = await getStudioStorageItem(storageKey);
        if (cancelled || !isPersistedSidebarState(parsedValue)) {
          return;
        }
        setLeftWidth(
          clamp(parsedValue.leftWidth, MIN_LEFT_WIDTH, MAX_LEFT_WIDTH)
        );
        setRightWidth(
          clamp(parsedValue.rightWidth, MIN_RIGHT_WIDTH, MAX_RIGHT_WIDTH)
        );
        setLeftCollapsed(parsedValue.leftCollapsed);
        setRightCollapsed(parsedValue.rightCollapsed);
      } finally {
        if (!cancelled) {
          setHasHydrated(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [storageKey]);
  useEffect12(() => {
    if (typeof window === "undefined" || !hasHydrated || isResizing) {
      return;
    }
    const persistedValue = {
      leftWidth,
      rightWidth,
      leftCollapsed,
      rightCollapsed
    };
    void setStudioStorageItem(storageKey, persistedValue);
  }, [
    hasHydrated,
    isResizing,
    leftCollapsed,
    leftWidth,
    rightCollapsed,
    rightWidth,
    storageKey
  ]);
  const toggleLeftCollapsed = () => {
    setLeftCollapsed((current) => !current);
  };
  const toggleRightCollapsed = () => {
    setRightCollapsed((current) => !current);
  };
  const expandLeft = () => {
    setLeftCollapsed(false);
  };
  const expandRight = () => {
    setRightCollapsed(false);
  };
  const startResize = (side) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startWidth = side === "left" ? leftWidth : rightWidth;
    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;
    let latestWidth = startWidth;
    setIsResizing(true);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    const applyWidth = () => {
      const nextWidth = clamp(
        latestWidth,
        side === "left" ? MIN_LEFT_WIDTH : MIN_RIGHT_WIDTH,
        side === "left" ? MAX_LEFT_WIDTH : MAX_RIGHT_WIDTH
      );
      if (side === "left") {
        setLeftWidth(nextWidth);
        return;
      }
      setRightWidth(nextWidth);
    };
    const scheduleWidthUpdate = () => {
      if (resizeFrameRef.current !== null) {
        return;
      }
      resizeFrameRef.current = window.requestAnimationFrame(() => {
        resizeFrameRef.current = null;
        applyWidth();
      });
    };
    const handlePointerMove = (moveEvent) => {
      const delta = side === "left" ? moveEvent.clientX - startX : startX - moveEvent.clientX;
      latestWidth = startWidth + delta;
      scheduleWidthUpdate();
    };
    const handlePointerUp = () => {
      if (resizeFrameRef.current !== null) {
        window.cancelAnimationFrame(resizeFrameRef.current);
        resizeFrameRef.current = null;
      }
      applyWidth();
      setIsResizing(false);
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp, { once: true });
  };
  return {
    leftWidth,
    rightWidth,
    leftCollapsed,
    rightCollapsed,
    toggleLeftCollapsed,
    toggleRightCollapsed,
    expandLeft,
    expandRight,
    isResizing,
    startResize
  };
};

// src/studio/website-builder-studio/website-builder-stage.tsx
import clsx19 from "clsx";
import {
  useEffect as useEffect16
} from "react";

// src/studio/canvas/canvas-top-toolbar.tsx
import clsx13 from "clsx";
import { ChevronDown as ChevronDown7, ChevronUp as ChevronUp2, History as History2 } from "lucide-react";

// src/studio/canvas/canvas-surface-mode-toggle.tsx
import clsx12 from "clsx";
import { jsx as jsx33 } from "react/jsx-runtime";
var CanvasSurfaceModeToggle = ({
  value,
  onChange
}) => {
  return /* @__PURE__ */ jsx33(
    "div",
    {
      className: "pointer-events-auto inline-flex items-center gap-1 rounded-[14px] border p-1",
      style: {
        borderColor: "var(--wb-builder-border)",
        background: "var(--wb-builder-field)",
        boxShadow: "var(--wb-builder-shadow)"
      },
      children: [
        {
          key: "canvas",
          label: "Canvas"
        },
        {
          key: "settings",
          label: "Settings"
        }
      ].map((option) => /* @__PURE__ */ jsx33(
        "button",
        {
          type: "button",
          onClick: () => onChange(option.key),
          "data-testid": `wb-canvas-surface-mode-${option.key}`,
          className: clsx12(
            "cursor-pointer rounded-[10px] px-3 py-1.5 text-xs font-semibold transition"
          ),
          style: value === option.key ? {
            background: "var(--wb-builder-accent-soft)",
            color: "var(--wb-builder-accent-text)"
          } : { color: "var(--wb-builder-text-muted)" },
          children: option.label
        },
        option.key
      ))
    }
  );
};

// src/studio/canvas/canvas-top-toolbar.tsx
import { jsx as jsx34, jsxs as jsxs25 } from "react/jsx-runtime";
var CanvasTopToolbarButton = ({
  label,
  onClick,
  disabled = false,
  children
}) => {
  return /* @__PURE__ */ jsxs25(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      title: label,
      "aria-label": label,
      className: "group relative inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-[9px] border transition disabled:pointer-events-none disabled:opacity-35",
      style: {
        borderColor: "var(--wb-builder-border)",
        background: "var(--wb-builder-field)",
        color: "var(--wb-builder-text-muted)"
      },
      children: [
        children,
        /* @__PURE__ */ jsx34(
          "span",
          {
            className: "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border px-2 py-1 text-[10px] font-semibold opacity-0 transition duration-150 group-hover:-translate-y-0.5 group-hover:opacity-100",
            style: {
              borderColor: "var(--wb-builder-border)",
              background: "var(--wb-builder-panel-solid)",
              color: "var(--wb-builder-text)",
              boxShadow: "var(--wb-builder-shadow)"
            },
            children: label
          }
        )
      ]
    }
  );
};
var CanvasTopToolbar = ({
  visible,
  surfaceMode,
  canReset,
  topOffset,
  leftOffset,
  rightOffset,
  onSurfaceModeChange,
  onReset,
  onCollapseAll,
  onExpandAll
}) => {
  const { translate } = useWebsiteBuilderI18n();
  return /* @__PURE__ */ jsx34(
    "div",
    {
      className: clsx13(
        "pointer-events-none fixed z-40 hidden transition-[opacity,transform] duration-300 ease-out lg:block",
        visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      ),
      style: {
        top: topOffset,
        left: leftOffset,
        right: rightOffset
      },
      "data-testid": "wb-canvas-toolbar",
      children: /* @__PURE__ */ jsx34(
        "div",
        {
          className: "border-b backdrop-blur-xl",
          style: {
            borderColor: "var(--wb-builder-border)",
            background: "linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
            boxShadow: "var(--wb-builder-shadow)"
          },
          children: /* @__PURE__ */ jsxs25("div", { className: "flex h-10 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsx34(
              CanvasSurfaceModeToggle,
              {
                value: surfaceMode,
                onChange: onSurfaceModeChange
              }
            ),
            /* @__PURE__ */ jsxs25(
              "div",
              {
                className: clsx13(
                  "pointer-events-auto flex items-center gap-1 rounded-[12px] border p-1 transition-opacity duration-200",
                  surfaceMode === "canvas" ? "opacity-100" : "pointer-events-none opacity-35"
                ),
                style: {
                  borderColor: "var(--wb-builder-border)",
                  background: "var(--wb-builder-field)",
                  boxShadow: "var(--wb-builder-shadow)"
                },
                children: [
                  /* @__PURE__ */ jsx34(
                    CanvasTopToolbarButton,
                    {
                      label: translate(
                        "websiteBuilder.toolbar.revertDraft",
                        "Revert local draft"
                      ),
                      onClick: onReset,
                      disabled: !canReset || surfaceMode !== "canvas",
                      children: /* @__PURE__ */ jsx34(History2, { className: clsx13("h-[13px] w-[13px]") })
                    }
                  ),
                  /* @__PURE__ */ jsx34(
                    CanvasTopToolbarButton,
                    {
                      label: translate(
                        "websiteBuilder.toolbar.collapseAll",
                        "Collapse all blocks"
                      ),
                      onClick: onCollapseAll,
                      disabled: surfaceMode !== "canvas",
                      children: /* @__PURE__ */ jsx34(ChevronDown7, { className: "h-[13px] w-[13px]" })
                    }
                  ),
                  /* @__PURE__ */ jsx34(
                    CanvasTopToolbarButton,
                    {
                      label: translate(
                        "websiteBuilder.toolbar.expandAll",
                        "Expand all blocks"
                      ),
                      onClick: onExpandAll,
                      disabled: surfaceMode !== "canvas",
                      children: /* @__PURE__ */ jsx34(ChevronUp2, { className: "h-[13px] w-[13px]" })
                    }
                  )
                ]
              }
            )
          ] })
        }
      )
    }
  );
};

// src/studio/page-settings-surface/page-settings-surface.tsx
import clsx14 from "clsx";
import { useEffect as useEffect13, useMemo as useMemo4, useState as useState17 } from "react";
import { Fragment as Fragment6, jsx as jsx35, jsxs as jsxs26 } from "react/jsx-runtime";
var scopeOrder = [
  "page",
  "template",
  "record"
];
var staticPageFields = [
  {
    path: "name",
    label: "Name",
    kind: "text",
    description: "Visible in the page browser and the settings surface."
  },
  {
    path: "path",
    label: "Path",
    kind: "text",
    description: "Public route for this page, for example /about or /pricing."
  }
];
var scopeMeta = {
  page: {
    label: "Page",
    eyebrow: "Page settings",
    description: "Control the public route and package-registered settings for this standalone page."
  },
  template: {
    label: "Template",
    eyebrow: "Template settings",
    description: "Shared settings applied by the dynamic page template before any current-record overrides."
  },
  record: {
    label: "Record",
    eyebrow: "Record settings",
    description: "Current-route settings stored only for the active record behind this dynamic page."
  }
};
var getScopeSettings = (pageSettings, scope) => {
  const value = pageSettings[scope];
  return typeof value === "object" && value !== null ? value : {};
};
var readString = (settings, key) => {
  const value = settings[key];
  return typeof value === "string" && value.trim() !== "" ? value : void 0;
};
var resolveAvailableScopes = (pageSettings) => scopeOrder.filter((scope) => {
  const value = pageSettings[scope];
  return typeof value === "object" && value !== null;
});
var surfaceCardStyle = {
  borderColor: "var(--wb-builder-border)",
  background: "var(--wb-builder-panel-muted)",
  color: "var(--wb-builder-text)"
};
var subtleChipStyle = {
  borderColor: "var(--wb-builder-border)",
  background: "var(--wb-builder-field)",
  color: "var(--wb-builder-text-soft)"
};
var emphasizedChipStyle = {
  borderColor: "var(--wb-builder-border-strong)",
  background: "var(--wb-builder-accent-soft)",
  color: "var(--wb-builder-accent-text)"
};
var warningCardStyle = {
  borderColor: "var(--wb-builder-border-strong)",
  background: "linear-gradient(180deg, color-mix(in srgb, var(--wb-builder-accent) 12%, transparent), color-mix(in srgb, var(--wb-builder-panel-solid) 82%, transparent))",
  color: "var(--wb-builder-text)"
};
var SettingsCard = ({
  eyebrow,
  title,
  description,
  children
}) => /* @__PURE__ */ jsxs26("section", { className: "rounded-[28px] border px-5 py-5", style: surfaceCardStyle, children: [
  /* @__PURE__ */ jsx35(
    "div",
    {
      className: "text-[11px] uppercase tracking-[0.28em]",
      style: { color: "var(--wb-builder-text-soft)" },
      children: eyebrow
    }
  ),
  /* @__PURE__ */ jsx35(
    "div",
    {
      className: "mt-4 text-2xl font-semibold tracking-[-0.04em]",
      style: { color: "var(--wb-builder-text)" },
      children: title
    }
  ),
  description ? /* @__PURE__ */ jsx35(
    "div",
    {
      className: "mt-3 text-sm leading-7",
      style: { color: "var(--wb-builder-text-muted)" },
      children: description
    }
  ) : null,
  children ? /* @__PURE__ */ jsx35("div", { className: "mt-5", children }) : null
] });
var PageSettingsSurface = ({
  currentPage,
  pageSettings,
  pageSettingsPanels,
  site,
  siteSettingsPanels,
  siteSettingsSubtabs,
  getPageSettingValue,
  onPageSettingChange,
  onPageSettingFocus,
  getSiteSettingValue,
  onSiteSettingChange,
  onSiteSettingFocus
}) => {
  const availableScopes = useMemo4(
    () => resolveAvailableScopes(pageSettings),
    [pageSettings]
  );
  const [activeTab, setActiveTab] = useState17("page");
  const [activeScope, setActiveScope] = useState17(availableScopes[0] ?? "page");
  const siteSubtabs = useMemo4(
    () => [
      { key: "design", label: "Design" },
      { key: "advanced-design", label: "Advanced design" },
      { key: "locales", label: "Locales" },
      ...siteSettingsSubtabs.map((tab) => ({
        key: tab.key,
        label: tab.label
      }))
    ],
    [siteSettingsSubtabs]
  );
  const [activeSiteTab, setActiveSiteTab] = useState17(siteSubtabs[0]?.key ?? "design");
  useEffect13(() => {
    if (availableScopes.length === 0) {
      setActiveTab("site");
      return;
    }
    if (!availableScopes.includes(activeScope)) {
      setActiveScope(availableScopes[0]);
    }
  }, [activeScope, availableScopes]);
  useEffect13(() => {
    if (!siteSubtabs.some((tab) => tab.key === activeSiteTab)) {
      setActiveSiteTab(siteSubtabs[0]?.key ?? "design");
    }
  }, [activeSiteTab, siteSubtabs]);
  const scopeSettings = getScopeSettings(pageSettings, activeScope);
  const scopedPanels = pageSettingsPanels.filter(
    (panel) => panel.scope === activeScope ? panel.isVisible ? panel.isVisible({
      scope: activeScope,
      currentPage,
      pageSettings
    }) : true : false
  );
  const scopeTitle = readString(scopeSettings, "name") ?? currentPage?.name ?? scopeMeta[activeScope].label;
  const primaryRoute = activeScope === "template" ? readString(scopeSettings, "pathPattern") ?? currentPage?.routePattern ?? currentPage?.route : readString(scopeSettings, "path") ?? currentPage?.route;
  const secondaryRoute = activeScope === "template" ? readString(scopeSettings, "currentPath") ?? currentPage?.route : null;
  const sitePanelDescription = "Design sources now belong to website profiles. Use Design to inspect the current profile source, Advanced Design to edit stored runtime tokens, and Locales to manage public/admin locale exposure.";
  const siteDesignPanel = siteSettingsPanels.find((panel) => panel.key === "design");
  const siteLocalesPanel = siteSettingsPanels.find((panel) => panel.key === "locales");
  const siteWorkspaceSubtab = siteSettingsSubtabs.find(
    (tab) => tab.key === activeSiteTab
  );
  const remainingSitePanels = siteSettingsPanels.filter(
    (panel) => panel.key !== "design" && panel.key !== "locales"
  );
  const renderSitePanel = (panel, viewMode) => {
    if (!panel) {
      return null;
    }
    const scopeSettings2 = typeof site.settings[panel.key] === "object" && site.settings[panel.key] !== null ? site.settings[panel.key] : {};
    const PanelComponent = panel.component;
    return /* @__PURE__ */ jsxs26(
      "section",
      {
        className: "rounded-[28px] border px-5 py-5",
        style: surfaceCardStyle,
        "data-testid": `wb-site-settings-panel-${panel.key}${viewMode ? `-${viewMode}` : ""}`,
        children: [
          /* @__PURE__ */ jsxs26("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx35(
              "div",
              {
                className: "text-[11px] uppercase tracking-[0.28em]",
                style: { color: "var(--wb-builder-text-soft)" },
                children: panel.label
              }
            ),
            panel.description ? /* @__PURE__ */ jsx35(
              "div",
              {
                className: "mt-2 text-sm leading-6",
                style: { color: "var(--wb-builder-text-muted)" },
                children: panel.description
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsx35(
            PanelComponent,
            {
              currentPage,
              pageSettings,
              site,
              scopeSettings: scopeSettings2,
              viewMode,
              getValue: (path) => getSiteSettingValue(`${panel.key}.${path}`),
              setValue: (path, value) => onSiteSettingChange(`${panel.key}.${path}`, value),
              focusField: (path) => onSiteSettingFocus(`${panel.key}.${path}`)
            }
          )
        ]
      },
      `${panel.key}:${viewMode ?? "default"}`
    );
  };
  return /* @__PURE__ */ jsx35(
    "section",
    {
      className: "mx-auto w-full max-w-[1240px] px-1 pb-10",
      "data-testid": "wb-page-settings-surface",
      children: /* @__PURE__ */ jsx35(
        "div",
        {
          className: "rounded-[34px] border p-5 sm:p-6",
          style: {
            borderColor: "var(--wb-builder-border)",
            background: "linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
            boxShadow: "var(--wb-builder-shadow)",
            color: "var(--wb-builder-text)"
          },
          "data-testid": "wb-builder-settings-shell",
          children: /* @__PURE__ */ jsxs26("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxs26("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
              /* @__PURE__ */ jsxs26("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx35(
                  "div",
                  {
                    className: "text-[11px] uppercase tracking-[0.3em]",
                    style: { color: "var(--wb-builder-text-soft)" },
                    children: "Settings mode"
                  }
                ),
                /* @__PURE__ */ jsx35(
                  "div",
                  {
                    className: "mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl",
                    style: { color: "var(--wb-builder-text)" },
                    children: "Website settings"
                  }
                ),
                /* @__PURE__ */ jsx35(
                  "div",
                  {
                    className: "mt-2 max-w-3xl text-sm leading-7",
                    style: { color: "var(--wb-builder-text-muted)" },
                    children: "Switch between route-specific settings and shared site design without leaving the live website surface."
                  }
                )
              ] }),
              /* @__PURE__ */ jsx35(
                "div",
                {
                  className: "inline-flex w-full max-w-full flex-wrap rounded-full border p-1 sm:w-auto",
                  style: {
                    borderColor: "var(--wb-builder-border)",
                    background: "var(--wb-builder-field)"
                  },
                  children: [
                    {
                      key: "page",
                      label: currentPage?.isDynamic ? "Template" : "Page",
                      disabled: availableScopes.length === 0
                    },
                    {
                      key: "site",
                      label: "Site",
                      disabled: false
                    }
                  ].map((tab) => /* @__PURE__ */ jsx35(
                    "button",
                    {
                      type: "button",
                      onClick: () => !tab.disabled && setActiveTab(tab.key),
                      disabled: tab.disabled,
                      "data-testid": `wb-settings-tab-${tab.key}`,
                      className: clsx14(
                        "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-35"
                      ),
                      style: activeTab === tab.key ? {
                        background: "var(--wb-builder-accent-soft)",
                        color: "var(--wb-builder-accent-text)"
                      } : { color: "var(--wb-builder-text-muted)" },
                      children: tab.label
                    },
                    tab.key
                  ))
                }
              )
            ] }),
            activeTab === "page" && availableScopes.length > 0 ? /* @__PURE__ */ jsxs26(Fragment6, { children: [
              /* @__PURE__ */ jsx35(
                "div",
                {
                  className: "inline-flex w-full max-w-full flex-wrap rounded-full border p-1 sm:w-auto",
                  style: {
                    borderColor: "var(--wb-builder-border)",
                    background: "var(--wb-builder-field)"
                  },
                  children: availableScopes.map((scope) => /* @__PURE__ */ jsx35(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveScope(scope),
                      "data-testid": `wb-settings-scope-${scope}`,
                      className: clsx14(
                        "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition"
                      ),
                      style: activeScope === scope ? {
                        background: "var(--wb-builder-accent-soft)",
                        color: "var(--wb-builder-accent-text)"
                      } : { color: "var(--wb-builder-text-muted)" },
                      children: scopeMeta[scope].label
                    },
                    scope
                  ))
                }
              ),
              /* @__PURE__ */ jsx35(
                SettingsCard,
                {
                  eyebrow: scopeMeta[activeScope].eyebrow,
                  title: scopeTitle,
                  description: scopeMeta[activeScope].description,
                  children: /* @__PURE__ */ jsxs26("div", { className: "flex flex-wrap items-center gap-2", children: [
                    /* @__PURE__ */ jsx35(
                      "div",
                      {
                        className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                        style: subtleChipStyle,
                        children: scopeMeta[activeScope].label
                      }
                    ),
                    primaryRoute ? /* @__PURE__ */ jsx35(
                      "div",
                      {
                        className: "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]",
                        style: subtleChipStyle,
                        children: primaryRoute
                      }
                    ) : null,
                    activeScope === "template" && currentPage?.isDynamic ? /* @__PURE__ */ jsx35(
                      "div",
                      {
                        className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                        style: emphasizedChipStyle,
                        children: "Dynamic template"
                      }
                    ) : null
                  ] })
                }
              ),
              /* @__PURE__ */ jsxs26(
                "section",
                {
                  className: "rounded-[28px] border px-5 py-5",
                  style: surfaceCardStyle,
                  children: [
                    /* @__PURE__ */ jsx35(
                      "div",
                      {
                        className: "mb-4 text-[11px] uppercase tracking-[0.28em]",
                        style: { color: "var(--wb-builder-text-soft)" },
                        children: "Basics"
                      }
                    ),
                    activeScope === "page" ? /* @__PURE__ */ jsx35(
                      WebsiteBuilderFieldEditorList,
                      {
                        fields: staticPageFields,
                        subjectId: "page-settings",
                        getValue: (path) => getPageSettingValue(`${activeScope}.${path}`),
                        onChange: (path, value) => onPageSettingChange(`${activeScope}.${path}`, value),
                        onFocus: (path) => onPageSettingFocus(`${activeScope}.${path}`)
                      }
                    ) : null,
                    activeScope === "template" ? /* @__PURE__ */ jsxs26("div", { className: "space-y-4", children: [
                      /* @__PURE__ */ jsx35(
                        "div",
                        {
                          className: "rounded-2xl border px-4 py-3 text-sm leading-6",
                          style: warningCardStyle,
                          children: "Template structure stays shared here. The current route below is the live record you are previewing while editing that shared template."
                        }
                      ),
                      /* @__PURE__ */ jsxs26("div", { className: "grid gap-3 md:grid-cols-2", children: [
                        /* @__PURE__ */ jsxs26(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: surfaceCardStyle,
                            children: [
                              /* @__PURE__ */ jsx35(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--wb-builder-text-soft)" },
                                  children: "Name"
                                }
                              ),
                              /* @__PURE__ */ jsx35(
                                "div",
                                {
                                  className: "mt-2 text-sm font-semibold",
                                  style: { color: "var(--wb-builder-text)" },
                                  children: scopeTitle
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs26(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: surfaceCardStyle,
                            children: [
                              /* @__PURE__ */ jsx35(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--wb-builder-text-soft)" },
                                  children: "Route pattern"
                                }
                              ),
                              /* @__PURE__ */ jsx35(
                                "div",
                                {
                                  className: "mt-2 font-mono text-sm",
                                  style: { color: "var(--wb-builder-text-muted)" },
                                  children: primaryRoute ?? "Not available"
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs26(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3 md:col-span-2",
                            style: surfaceCardStyle,
                            children: [
                              /* @__PURE__ */ jsx35(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--wb-builder-text-soft)" },
                                  children: "Current route"
                                }
                              ),
                              /* @__PURE__ */ jsx35(
                                "div",
                                {
                                  className: "mt-2 font-mono text-sm",
                                  style: { color: "var(--wb-builder-text-muted)" },
                                  children: secondaryRoute ?? currentPage?.route ?? "Not available"
                                }
                              )
                            ]
                          }
                        )
                      ] })
                    ] }) : null,
                    activeScope === "record" ? /* @__PURE__ */ jsxs26("div", { className: "space-y-4", children: [
                      /* @__PURE__ */ jsx35(
                        "div",
                        {
                          className: "rounded-2xl border px-4 py-3 text-sm leading-6",
                          style: warningCardStyle,
                          children: "Record settings affect only the live entity behind the current route. Shared builder structure remains owned by the template scope."
                        }
                      ),
                      /* @__PURE__ */ jsxs26("div", { className: "grid gap-3 md:grid-cols-2", children: [
                        /* @__PURE__ */ jsxs26(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: surfaceCardStyle,
                            children: [
                              /* @__PURE__ */ jsx35(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--wb-builder-text-soft)" },
                                  children: "Current route"
                                }
                              ),
                              /* @__PURE__ */ jsx35(
                                "div",
                                {
                                  className: "mt-2 font-mono text-sm",
                                  style: { color: "var(--wb-builder-text-muted)" },
                                  children: primaryRoute ?? currentPage?.route ?? "Not available"
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs26(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: surfaceCardStyle,
                            children: [
                              /* @__PURE__ */ jsx35(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--wb-builder-text-soft)" },
                                  children: "Record key"
                                }
                              ),
                              /* @__PURE__ */ jsx35(
                                "div",
                                {
                                  className: "mt-2 text-sm font-semibold",
                                  style: { color: "var(--wb-builder-text)" },
                                  children: currentPage?.key ?? "Not available"
                                }
                              )
                            ]
                          }
                        )
                      ] })
                    ] }) : null
                  ]
                }
              ),
              scopedPanels.map((panel) => {
                const PanelComponent = panel.component;
                return /* @__PURE__ */ jsxs26(
                  "section",
                  {
                    className: "rounded-[28px] border px-5 py-5",
                    style: surfaceCardStyle,
                    children: [
                      /* @__PURE__ */ jsxs26("div", { className: "mb-4", children: [
                        /* @__PURE__ */ jsx35(
                          "div",
                          {
                            className: "text-[11px] uppercase tracking-[0.28em]",
                            style: { color: "var(--wb-builder-text-soft)" },
                            children: panel.label
                          }
                        ),
                        panel.description ? /* @__PURE__ */ jsx35(
                          "div",
                          {
                            className: "mt-2 text-sm leading-6",
                            style: { color: "var(--wb-builder-text-muted)" },
                            children: panel.description
                          }
                        ) : null
                      ] }),
                      /* @__PURE__ */ jsx35(
                        PanelComponent,
                        {
                          scope: activeScope,
                          currentPage,
                          pageSettings,
                          scopeSettings,
                          getValue: (path) => getPageSettingValue(`${activeScope}.${path}`),
                          setValue: (path, value) => onPageSettingChange(`${activeScope}.${path}`, value),
                          focusField: (path) => onPageSettingFocus(`${activeScope}.${path}`)
                        }
                      )
                    ]
                  },
                  `${activeScope}:${panel.key}`
                );
              })
            ] }) : null,
            activeTab === "site" ? /* @__PURE__ */ jsxs26(Fragment6, { children: [
              /* @__PURE__ */ jsx35(
                SettingsCard,
                {
                  eyebrow: "Site settings",
                  title: "Shared design system",
                  description: sitePanelDescription,
                  children: /* @__PURE__ */ jsxs26("div", { className: "flex flex-wrap items-center gap-2", children: [
                    /* @__PURE__ */ jsxs26(
                      "div",
                      {
                        className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                        style: subtleChipStyle,
                        children: [
                          Object.keys(site.regions).length,
                          " site regions"
                        ]
                      }
                    ),
                    Object.values(site.regions).map((region) => /* @__PURE__ */ jsx35(
                      "div",
                      {
                        className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                        style: subtleChipStyle,
                        children: region.label
                      },
                      region.key
                    ))
                  ] })
                }
              ),
              /* @__PURE__ */ jsx35(
                "div",
                {
                  className: "inline-flex w-full max-w-full flex-wrap rounded-full border p-1 sm:w-auto",
                  style: {
                    borderColor: "var(--wb-builder-border)",
                    background: "var(--wb-builder-field)"
                  },
                  "data-testid": "wb-site-settings-subtabs",
                  children: siteSubtabs.map((tab) => /* @__PURE__ */ jsx35(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveSiteTab(tab.key),
                      "data-testid": `wb-site-settings-subtab-${tab.key}`,
                      className: "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition",
                      style: activeSiteTab === tab.key ? {
                        background: "var(--wb-builder-accent-soft)",
                        color: "var(--wb-builder-accent-text)"
                      } : { color: "var(--wb-builder-text-muted)" },
                      children: tab.label
                    },
                    tab.key
                  ))
                }
              ),
              activeSiteTab === "design" ? renderSitePanel(siteDesignPanel, "curated") : null,
              activeSiteTab === "advanced-design" ? renderSitePanel(siteDesignPanel, "advanced") : null,
              activeSiteTab === "locales" ? siteLocalesPanel ? renderSitePanel(siteLocalesPanel) : remainingSitePanels.length > 0 ? remainingSitePanels.map((panel) => renderSitePanel(panel)) : /* @__PURE__ */ jsxs26(
                "section",
                {
                  className: "rounded-[28px] border px-5 py-5",
                  style: surfaceCardStyle,
                  "data-testid": "wb-site-settings-panel-locales-empty",
                  children: [
                    /* @__PURE__ */ jsx35(
                      "div",
                      {
                        className: "text-[11px] uppercase tracking-[0.28em]",
                        style: { color: "var(--wb-builder-text-soft)" },
                        children: "Locales"
                      }
                    ),
                    /* @__PURE__ */ jsx35(
                      "div",
                      {
                        className: "mt-3 text-sm leading-6",
                        style: { color: "var(--wb-builder-text-muted)" },
                        children: "The locales settings panel is not registered in this build."
                      }
                    )
                  ]
                }
              ) : null,
              siteWorkspaceSubtab ? /* @__PURE__ */ jsxs26(
                "section",
                {
                  className: "rounded-[28px] border px-5 py-5",
                  style: surfaceCardStyle,
                  "data-testid": `wb-site-settings-panel-${siteWorkspaceSubtab.key}`,
                  children: [
                    /* @__PURE__ */ jsxs26("div", { className: "mb-4", children: [
                      /* @__PURE__ */ jsx35(
                        "div",
                        {
                          className: "text-[11px] uppercase tracking-[0.28em]",
                          style: { color: "var(--wb-builder-text-soft)" },
                          children: siteWorkspaceSubtab.label
                        }
                      ),
                      siteWorkspaceSubtab.description ? /* @__PURE__ */ jsx35(
                        "div",
                        {
                          className: "mt-2 text-sm leading-6",
                          style: { color: "var(--wb-builder-text-muted)" },
                          children: siteWorkspaceSubtab.description
                        }
                      ) : null
                    ] }),
                    /* @__PURE__ */ jsx35(siteWorkspaceSubtab.component, {})
                  ]
                }
              ) : null
            ] }) : null
          ] })
        }
      )
    }
  );
};

// src/studio/inspector-panel/inspector-panel.tsx
import clsx15 from "clsx";
import { ChevronDown as ChevronDown8, ChevronRight as ChevronRight3 } from "lucide-react";
import { memo as memo5, useEffect as useEffect14, useMemo as useMemo5, useState as useState18 } from "react";
import { Fragment as Fragment7, jsx as jsx36, jsxs as jsxs27 } from "react/jsx-runtime";
var readString2 = (settings, key) => {
  const value = settings[key];
  return typeof value === "string" && value.trim() !== "" ? value : void 0;
};
var fieldSupportsLocalization = (field, inheritedLocalization) => {
  const effectiveLocalization = field.localization ?? inheritedLocalization;
  if (effectiveLocalization === "localized" && field.kind !== "object" && field.kind !== "repeater") {
    return true;
  }
  if (field.kind === "object") {
    return (field.fields ?? []).some(
      (nestedField) => fieldSupportsLocalization(nestedField, effectiveLocalization)
    );
  }
  if (field.kind === "repeater") {
    return (field.itemField ? fieldSupportsLocalization(field.itemField, effectiveLocalization) : false) || (field.fields ?? []).some(
      (nestedField) => fieldSupportsLocalization(nestedField, effectiveLocalization)
    );
  }
  return false;
};
var InspectorPanelComponent = ({
  definitionFields,
  inspectorGroups,
  selectedFieldPath,
  inspectorDefinition,
  pageSettings,
  currentPage,
  onContentLocaleChange,
  onCollapse
}) => {
  const document2 = useWebsiteBuilderStore((state) => state.document);
  const { contentLocale, editableLocales, translate } = useWebsiteBuilderI18n();
  const selectedBlock = useWebsiteBuilderStore(
    (state) => state.selectedBlockId ? findWebsiteBuilderBlock(state.document.blocks, state.selectedBlockId) : null
  );
  const getFieldValue = useWebsiteBuilderStore((state) => state.getFieldValue);
  const updateFieldValue = useWebsiteBuilderStore(
    (state) => state.updateFieldValue
  );
  const selectField = useWebsiteBuilderStore((state) => state.selectField);
  const [activeTab, setActiveTab] = useState18("block");
  const [showBlockJson, setShowBlockJson] = useState18(false);
  const [showDocumentJson, setShowDocumentJson] = useState18(false);
  const hasBlockContext = selectedBlock !== null || inspectorDefinition !== null;
  const pageTabLabel = currentPage?.isDynamic ? translate("websiteBuilder.studio.inspector.templateTab", "Template") : translate("websiteBuilder.studio.inspector.pageTab", "Page");
  const templateSettings = typeof pageSettings.template === "object" && pageSettings.template !== null ? pageSettings.template : {};
  const pageSettingsSummary = typeof pageSettings.page === "object" && pageSettings.page !== null ? pageSettings.page : {};
  const summarySettings = currentPage?.isDynamic ? templateSettings : pageSettingsSummary;
  const summaryName = readString2(summarySettings, "name") ?? currentPage?.name ?? document2.name;
  const summaryRoute = (currentPage?.isDynamic ? readString2(summarySettings, "pathPattern") : readString2(summarySettings, "path")) ?? currentPage?.routePattern ?? currentPage?.route ?? document2.route;
  const currentRoute = readString2(summarySettings, "currentPath") ?? currentPage?.route;
  const selectedBlockJson = useMemo5(
    () => showBlockJson && selectedBlock ? JSON.stringify(selectedBlock, null, 2) : "",
    [showBlockJson, selectedBlock]
  );
  const documentJson = useMemo5(
    () => showDocumentJson ? JSON.stringify(
      {
        id: document2.id,
        route: document2.route,
        updatedAt: document2.updatedAt,
        blocks: document2.blocks.map((block) => ({
          id: block.id,
          module: block.module,
          type: block.type,
          areas: block.areas?.length ?? 0
        }))
      },
      null,
      2
    ) : "",
    [document2, showDocumentJson]
  );
  useEffect14(() => {
    if (selectedBlock) {
      setActiveTab("block");
    }
  }, [selectedBlock]);
  return /* @__PURE__ */ jsxs27(
    "div",
    {
      className: "flex h-full flex-col",
      style: {
        background: "var(--wb-builder-shell-muted)",
        color: "var(--wb-builder-text)"
      },
      children: [
        /* @__PURE__ */ jsx36(
          "div",
          {
            className: "border-b px-5 py-5",
            style: {
              borderColor: "var(--wb-builder-border)",
              background: "var(--wb-builder-shell-strong)"
            },
            children: /* @__PURE__ */ jsxs27("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxs27("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx36(
                  "div",
                  {
                    className: "text-[11px] uppercase tracking-[0.28em]",
                    style: { color: "var(--wb-builder-text-soft)" },
                    children: translate("websiteBuilder.studio.inspector.title", "Inspector")
                  }
                ),
                /* @__PURE__ */ jsxs27(
                  "div",
                  {
                    className: "mt-4 inline-flex rounded-full border p-1",
                    style: {
                      borderColor: "var(--wb-builder-border)",
                      background: "var(--wb-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx36(
                        "button",
                        {
                          type: "button",
                          onClick: () => setActiveTab("block"),
                          className: clsx15(
                            "cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition"
                          ),
                          style: activeTab === "block" ? {
                            background: "var(--wb-builder-accent-soft)",
                            color: "var(--wb-builder-accent-text)"
                          } : { color: "var(--wb-builder-text-muted)" },
                          children: translate("websiteBuilder.studio.inspector.blockTab", "Block")
                        }
                      ),
                      /* @__PURE__ */ jsx36(
                        "button",
                        {
                          type: "button",
                          onClick: () => setActiveTab("page"),
                          className: clsx15(
                            "cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition"
                          ),
                          style: activeTab === "page" ? {
                            background: "var(--wb-builder-accent-soft)",
                            color: "var(--wb-builder-accent-text)"
                          } : { color: "var(--wb-builder-text-muted)" },
                          children: pageTabLabel
                        }
                      )
                    ]
                  }
                )
              ] }),
              onCollapse ? /* @__PURE__ */ jsx36(
                "button",
                {
                  type: "button",
                  onClick: onCollapse,
                  className: "cursor-pointer rounded-full border p-2 transition",
                  style: {
                    borderColor: "var(--wb-builder-border)",
                    background: "var(--wb-builder-panel-muted)",
                    color: "var(--wb-builder-text-soft)"
                  },
                  children: /* @__PURE__ */ jsx36(ChevronRight3, { className: "h-4 w-4" })
                }
              ) : null
            ] })
          }
        ),
        /* @__PURE__ */ jsxs27(
          "div",
          {
            className: "flex-1 space-y-5 overflow-y-auto px-4 py-4",
            style: { background: "var(--wb-builder-shell-muted)" },
            children: [
              activeTab === "block" && !selectedBlock && inspectorDefinition ? /* @__PURE__ */ jsxs27(Fragment7, { children: [
                /* @__PURE__ */ jsxs27(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--wb-builder-border)",
                      background: "var(--wb-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx36(
                        "div",
                        {
                          className: "text-[11px] uppercase tracking-[0.28em]",
                          style: { color: "var(--wb-builder-text-soft)" },
                          children: "Palette block"
                        }
                      ),
                      /* @__PURE__ */ jsx36(
                        "div",
                        {
                          className: "mt-3 text-lg font-semibold",
                          style: { color: "var(--wb-builder-text)" },
                          children: inspectorDefinition.label
                        }
                      ),
                      /* @__PURE__ */ jsxs27("div", { className: "mt-1 flex flex-wrap items-center gap-2", children: [
                        /* @__PURE__ */ jsx36(
                          "div",
                          {
                            className: "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]",
                            style: {
                              borderColor: "var(--wb-builder-border)",
                              background: "var(--wb-builder-field)",
                              color: "var(--wb-builder-text-soft)"
                            },
                            children: inspectorDefinition.module
                          }
                        ),
                        /* @__PURE__ */ jsx36(
                          "div",
                          {
                            className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                            style: {
                              borderColor: "var(--wb-builder-border)",
                              background: "var(--wb-builder-field)",
                              color: "var(--wb-builder-text-soft)"
                            },
                            children: translateWebsiteBuilderPaletteCategory(
                              inspectorDefinition.category,
                              translate
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxs27(
                          "div",
                          {
                            className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                            style: {
                              borderColor: "var(--wb-builder-border-strong)",
                              background: "var(--wb-builder-accent-strong)",
                              color: "var(--wb-builder-accent)"
                            },
                            children: [
                              inspectorDefinition.fieldCount,
                              " settings"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx36(
                        "div",
                        {
                          className: "mt-4 text-sm leading-6",
                          style: { color: "var(--wb-builder-text-muted)" },
                          children: inspectorDefinition.description
                        }
                      )
                    ]
                  }
                ),
                Object.entries(inspectorGroups).map(([groupKey, fields]) => /* @__PURE__ */ jsxs27(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--wb-builder-border)",
                      background: "var(--wb-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsxs27("div", { className: "mb-4 flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsx36(
                          "div",
                          {
                            className: "text-[11px] uppercase tracking-[0.28em]",
                            style: { color: "var(--wb-builder-text-soft)" },
                            children: translate(
                              FIELD_GROUP_LABELS[groupKey] ?? FIELD_GROUP_LABELS.misc,
                              translateWebsiteBuilderFieldGroup(groupKey, translate)
                            )
                          }
                        ),
                        /* @__PURE__ */ jsx36(
                          "div",
                          {
                            className: "font-mono text-[10px] uppercase tracking-[0.24em]",
                            style: { color: "var(--wb-builder-text-ghost)" },
                            children: fields.length
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx36("div", { className: "space-y-3", children: fields.map((field) => /* @__PURE__ */ jsxs27(
                        "div",
                        {
                          className: "rounded-2xl border px-4 py-3",
                          style: {
                            borderColor: "var(--wb-builder-border)",
                            background: "var(--wb-builder-field)"
                          },
                          children: [
                            /* @__PURE__ */ jsxs27("div", { className: "flex items-center justify-between gap-3", children: [
                              /* @__PURE__ */ jsx36(
                                "div",
                                {
                                  className: "text-sm font-semibold",
                                  style: { color: "var(--wb-builder-text)" },
                                  children: field.label
                                }
                              ),
                              /* @__PURE__ */ jsx36(
                                "div",
                                {
                                  className: "rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.22em]",
                                  style: {
                                    borderColor: "var(--wb-builder-border)",
                                    color: "var(--wb-builder-text-soft)"
                                  },
                                  children: field.kind
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsx36(
                              "div",
                              {
                                className: "mt-2 font-mono text-[10px] uppercase tracking-[0.24em]",
                                style: { color: "var(--wb-builder-text-ghost)" },
                                children: field.path
                              }
                            ),
                            field.description ? /* @__PURE__ */ jsx36(
                              "div",
                              {
                                className: "mt-2 text-xs leading-5",
                                style: { color: "var(--wb-builder-text-soft)" },
                                children: field.description
                              }
                            ) : null
                          ]
                        },
                        field.path
                      )) })
                    ]
                  },
                  groupKey
                ))
              ] }) : null,
              activeTab === "block" && selectedBlock ? /* @__PURE__ */ jsxs27(Fragment7, { children: [
                /* @__PURE__ */ jsxs27(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--wb-builder-border)",
                      background: "var(--wb-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx36(
                        "div",
                        {
                          className: "text-[11px] uppercase tracking-[0.28em]",
                          style: { color: "var(--wb-builder-text-soft)" },
                          children: "Selected block"
                        }
                      ),
                      /* @__PURE__ */ jsx36(
                        "div",
                        {
                          className: "mt-3 text-lg font-semibold",
                          style: { color: "var(--wb-builder-text)" },
                          children: inspectorDefinition?.label ?? selectedBlock.type
                        }
                      ),
                      /* @__PURE__ */ jsxs27("div", { className: "mt-1 flex flex-wrap items-center gap-2", children: [
                        /* @__PURE__ */ jsx36(
                          "div",
                          {
                            className: "font-mono text-[11px] uppercase tracking-[0.24em]",
                            style: { color: "var(--wb-builder-text-ghost)" },
                            children: selectedBlock.module
                          }
                        ),
                        inspectorDefinition ? /* @__PURE__ */ jsx36(
                          "div",
                          {
                            className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                            style: {
                              borderColor: "var(--wb-builder-border)",
                              background: "var(--wb-builder-field)",
                              color: "var(--wb-builder-text-soft)"
                            },
                            children: translateWebsiteBuilderPaletteCategory(
                              inspectorDefinition.category,
                              translate
                            )
                          }
                        ) : null
                      ] }),
                      inspectorDefinition?.description ? /* @__PURE__ */ jsx36(
                        "div",
                        {
                          className: "mt-4 text-sm leading-6",
                          style: { color: "var(--wb-builder-text-muted)" },
                          children: inspectorDefinition.description
                        }
                      ) : null,
                      selectedFieldPath ? /* @__PURE__ */ jsxs27(
                        "div",
                        {
                          className: "mt-4 rounded-2xl border px-3 py-3 text-sm",
                          style: {
                            borderColor: "var(--wb-builder-border-strong)",
                            background: "var(--wb-builder-accent-strong)",
                            color: "var(--wb-builder-accent)"
                          },
                          children: [
                            "Active field:",
                            " ",
                            /* @__PURE__ */ jsx36("span", { className: "font-mono", children: selectedFieldPath })
                          ]
                        }
                      ) : null
                    ]
                  }
                ),
                Object.entries(inspectorGroups).map(([groupKey, fields]) => /* @__PURE__ */ jsxs27(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--wb-builder-border)",
                      background: "var(--wb-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx36(
                        "div",
                        {
                          className: "mb-4 text-[11px] uppercase tracking-[0.28em]",
                          style: { color: "var(--wb-builder-text-soft)" },
                          children: translate(
                            FIELD_GROUP_LABELS[groupKey] ?? FIELD_GROUP_LABELS.misc,
                            translateWebsiteBuilderFieldGroup(groupKey, translate)
                          )
                        }
                      ),
                      groupKey === "content" && editableLocales.length > 1 && fields.some((field) => fieldSupportsLocalization(field)) ? /* @__PURE__ */ jsx36(
                        "div",
                        {
                          className: "mb-4 inline-flex flex-wrap rounded-full border p-1",
                          style: {
                            borderColor: "var(--wb-builder-border)",
                            background: "var(--wb-builder-panel)"
                          },
                          children: editableLocales.map((locale) => /* @__PURE__ */ jsx36(
                            "button",
                            {
                              type: "button",
                              onClick: () => onContentLocaleChange?.(locale.code),
                              className: "cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition",
                              style: locale.code === contentLocale ? {
                                background: "var(--wb-builder-accent-soft)",
                                color: "var(--wb-builder-accent-text)"
                              } : { color: "var(--wb-builder-text-muted)" },
                              children: locale.code
                            },
                            locale.code
                          ))
                        }
                      ) : null,
                      /* @__PURE__ */ jsx36("div", { className: "space-y-4", children: fields.map((field) => /* @__PURE__ */ jsx36(
                        FieldEditor,
                        {
                          field,
                          blockId: selectedBlock.id,
                          value: getFieldValue(selectedBlock.id, field.path),
                          onFocus: (path) => selectField(selectedBlock.id, path ?? field.path),
                          onChange: (value) => updateFieldValue(selectedBlock.id, field.path, value)
                        },
                        field.path
                      )) })
                    ]
                  },
                  groupKey
                )),
                /* @__PURE__ */ jsxs27(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--wb-builder-border)",
                      background: "var(--wb-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsxs27(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowBlockJson((current) => !current),
                          className: "flex w-full cursor-pointer items-center justify-between gap-3 text-left",
                          children: [
                            /* @__PURE__ */ jsx36(
                              "div",
                              {
                                className: "text-[11px] uppercase tracking-[0.28em]",
                                style: { color: "var(--wb-builder-text-soft)" },
                                children: "Raw block manifest"
                              }
                            ),
                            showBlockJson ? /* @__PURE__ */ jsx36(
                              ChevronDown8,
                              {
                                className: "h-4 w-4",
                                style: { color: "var(--wb-builder-text-soft)" }
                              }
                            ) : /* @__PURE__ */ jsx36(
                              ChevronRight3,
                              {
                                className: "h-4 w-4",
                                style: { color: "var(--wb-builder-text-soft)" }
                              }
                            )
                          ]
                        }
                      ),
                      showBlockJson ? /* @__PURE__ */ jsx36(
                        "pre",
                        {
                          className: "mt-4 h-[320px] overflow-x-auto rounded-2xl border p-4 text-xs leading-6",
                          style: {
                            borderColor: "var(--wb-builder-border)",
                            background: "var(--wb-builder-field)",
                            color: "var(--wb-builder-text-muted)"
                          },
                          children: selectedBlockJson
                        }
                      ) : null
                    ]
                  }
                )
              ] }) : null,
              activeTab === "block" ? /* @__PURE__ */ jsxs27(Fragment7, { children: [
                /* @__PURE__ */ jsxs27(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--wb-builder-border)",
                      background: "var(--wb-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsxs27(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowDocumentJson((current) => !current),
                          className: "flex w-full cursor-pointer items-center justify-between gap-3 text-left",
                          children: [
                            /* @__PURE__ */ jsx36(
                              "div",
                              {
                                className: "text-[11px] uppercase tracking-[0.28em]",
                                style: { color: "var(--wb-builder-text-soft)" },
                                children: "Document JSON"
                              }
                            ),
                            showDocumentJson ? /* @__PURE__ */ jsx36(
                              ChevronDown8,
                              {
                                className: "h-4 w-4",
                                style: { color: "var(--wb-builder-text-soft)" }
                              }
                            ) : /* @__PURE__ */ jsx36(
                              ChevronRight3,
                              {
                                className: "h-4 w-4",
                                style: { color: "var(--wb-builder-text-soft)" }
                              }
                            )
                          ]
                        }
                      ),
                      showDocumentJson ? /* @__PURE__ */ jsx36(
                        "pre",
                        {
                          className: "mt-4 max-h-[320px] overflow-auto rounded-2xl border p-4 text-xs leading-6",
                          style: {
                            borderColor: "var(--wb-builder-border)",
                            background: "var(--wb-builder-field)",
                            color: "var(--wb-builder-text-muted)"
                          },
                          children: documentJson
                        }
                      ) : null
                    ]
                  }
                ),
                !definitionFields.length && !hasBlockContext ? /* @__PURE__ */ jsx36(
                  "section",
                  {
                    className: "rounded-[24px] border border-dashed px-4 py-4 text-sm leading-6",
                    style: {
                      borderColor: "var(--wb-builder-border)",
                      color: "var(--wb-builder-text-muted)"
                    },
                    children: "Builder tip: select any live block, click any palette block, or drop a new block into one of the visible plus zones to inspect it here."
                  }
                ) : null
              ] }) : null,
              activeTab === "page" ? /* @__PURE__ */ jsxs27(Fragment7, { children: [
                /* @__PURE__ */ jsxs27(
                  "section",
                  {
                    className: "rounded-[24px] border border-dashed px-4 py-4 text-sm leading-6",
                    style: {
                      borderColor: "var(--wb-builder-border)",
                      color: "var(--wb-builder-text-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsxs27(
                        "div",
                        {
                          className: "text-[11px] uppercase tracking-[0.28em]",
                          style: { color: "var(--wb-builder-text-soft)" },
                          children: [
                            pageTabLabel,
                            " settings"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx36(
                        "div",
                        {
                          className: "mt-3 text-lg font-semibold",
                          style: { color: "var(--wb-builder-text)" },
                          children: summaryName
                        }
                      ),
                      /* @__PURE__ */ jsxs27("div", { className: "mt-2 flex flex-wrap items-center gap-2", children: [
                        /* @__PURE__ */ jsx36(
                          "div",
                          {
                            className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                            style: {
                              borderColor: "var(--wb-builder-border)",
                              background: "var(--wb-builder-field)",
                              color: "var(--wb-builder-text-soft)"
                            },
                            children: currentPage?.kind ?? "page"
                          }
                        ),
                        /* @__PURE__ */ jsx36(
                          "div",
                          {
                            className: "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]",
                            style: {
                              borderColor: "var(--wb-builder-border)",
                              background: "var(--wb-builder-field)",
                              color: "var(--wb-builder-text-soft)"
                            },
                            children: currentPage?.route ?? document2.route
                          }
                        ),
                        currentPage?.isDynamic ? /* @__PURE__ */ jsx36("div", { className: "rounded-full border border-amber-300/18 bg-amber-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-amber-100/80", children: "Dynamic template" }) : null
                      ] }),
                      /* @__PURE__ */ jsx36(
                        "div",
                        {
                          className: "mt-4 rounded-2xl border px-3 py-3 text-sm leading-6",
                          style: {
                            borderColor: "var(--wb-builder-border-strong)",
                            background: "var(--wb-builder-accent-strong)",
                            color: "var(--wb-builder-accent)"
                          },
                          children: "Open Page Settings from the top canvas toolbar to edit route basics and package-registered settings like SEO."
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs27(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--wb-builder-border)",
                      background: "var(--wb-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx36(
                        "div",
                        {
                          className: "mb-4 text-[11px] uppercase tracking-[0.28em]",
                          style: { color: "var(--wb-builder-text-soft)" },
                          children: "Basics"
                        }
                      ),
                      /* @__PURE__ */ jsxs27("div", { className: "space-y-3", children: [
                        /* @__PURE__ */ jsxs27(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: {
                              borderColor: "var(--wb-builder-border)",
                              background: "var(--wb-builder-field)"
                            },
                            children: [
                              /* @__PURE__ */ jsx36(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--wb-builder-text-soft)" },
                                  children: "Name"
                                }
                              ),
                              /* @__PURE__ */ jsx36(
                                "div",
                                {
                                  className: "mt-2 text-sm font-semibold",
                                  style: { color: "var(--wb-builder-text)" },
                                  children: summaryName
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs27(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: {
                              borderColor: "var(--wb-builder-border)",
                              background: "var(--wb-builder-field)"
                            },
                            children: [
                              /* @__PURE__ */ jsx36(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--wb-builder-text-soft)" },
                                  children: currentPage?.isDynamic ? "Route pattern" : "Path"
                                }
                              ),
                              /* @__PURE__ */ jsx36(
                                "div",
                                {
                                  className: "mt-2 font-mono text-sm",
                                  style: { color: "var(--wb-builder-text-muted)" },
                                  children: summaryRoute
                                }
                              )
                            ]
                          }
                        ),
                        currentPage?.isDynamic ? /* @__PURE__ */ jsxs27(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: {
                              borderColor: "var(--wb-builder-border)",
                              background: "var(--wb-builder-field)"
                            },
                            children: [
                              /* @__PURE__ */ jsx36(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--wb-builder-text-soft)" },
                                  children: "Current route"
                                }
                              ),
                              /* @__PURE__ */ jsx36(
                                "div",
                                {
                                  className: "mt-2 font-mono text-sm",
                                  style: { color: "var(--wb-builder-text-muted)" },
                                  children: currentRoute
                                }
                              )
                            ]
                          }
                        ) : null
                      ] })
                    ]
                  }
                )
              ] }) : null
            ]
          }
        )
      ]
    }
  );
};
var InspectorPanel = memo5(InspectorPanelComponent);

// src/studio/website-builder-studio/builder-mobile-panels.tsx
import { jsx as jsx37, jsxs as jsxs28 } from "react/jsx-runtime";
var BuilderMobilePanels = ({
  search,
  onSearchChange,
  allPaletteBlocks,
  paletteGroups,
  paletteFamily,
  onPaletteFamilyChange,
  palettePackage,
  onPalettePackageChange,
  collapsedFamilies,
  onToggleFamily,
  collapsedGroups,
  onToggleGroup,
  selectedDefinitionKey,
  onSelectDefinition,
  onInsert,
  manualInsertTarget,
  definitionFields,
  inspectorGroups,
  selectedFieldPath,
  inspectorDefinition,
  pageSettings,
  currentPage,
  onContentLocaleChange
}) => {
  return /* @__PURE__ */ jsxs28("div", { className: "mt-6 grid gap-4 lg:hidden", children: [
    /* @__PURE__ */ jsx37(
      PalettePanel,
      {
        search,
        onSearchChange,
        allPaletteBlocks,
        paletteGroups,
        paletteFamily,
        onPaletteFamilyChange,
        palettePackage,
        onPalettePackageChange,
        collapsedFamilies,
        onToggleFamily,
        collapsedGroups,
        onToggleGroup,
        selectedDefinitionKey,
        onSelectDefinition,
        onInsert,
        manualInsertTarget
      }
    ),
    /* @__PURE__ */ jsx37(
      InspectorPanel,
      {
        definitionFields,
        inspectorGroups,
        selectedFieldPath,
        inspectorDefinition,
        pageSettings,
        currentPage,
        onContentLocaleChange
      }
    )
  ] });
};

// src/studio/website-builder-studio/builder-sidebars.tsx
import clsx18 from "clsx";
import {
  useEffect as useEffect15,
  useState as useState19
} from "react";

// src/studio/website-builder-studio/builder-sidebar-edge-toggle.tsx
import clsx16 from "clsx";
import { ChevronLeft as ChevronLeft2, ChevronRight as ChevronRight4 } from "lucide-react";
import { jsx as jsx38 } from "react/jsx-runtime";
var BuilderSidebarEdgeToggle = ({
  side,
  dockHeight,
  onExpand
}) => {
  return /* @__PURE__ */ jsx38(
    "div",
    {
      className: clsx16(
        "fixed bottom-0 z-20 hidden lg:block",
        side === "left" ? "left-0 w-5" : "right-0 w-5"
      ),
      style: {
        top: dockHeight
      },
      children: /* @__PURE__ */ jsx38("div", { className: "group relative h-full w-full", children: /* @__PURE__ */ jsx38(
        "button",
        {
          type: "button",
          "aria-label": `Expand ${side} sidebar`,
          onClick: onExpand,
          className: clsx16(
            "absolute top-6 rounded-full border p-2 shadow-[var(--wb-builder-shadow)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            side === "left" ? "-left-10 group-hover:translate-x-9" : "-right-10 group-hover:-translate-x-9"
          ),
          style: {
            borderColor: "var(--wb-builder-border)",
            background: "var(--wb-builder-panel-solid)",
            color: "var(--wb-builder-text-muted)"
          },
          children: side === "left" ? /* @__PURE__ */ jsx38(ChevronRight4, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx38(ChevronLeft2, { className: "h-4 w-4" })
        }
      ) })
    }
  );
};

// src/studio/website-builder-studio/builder-sidebar-resize-handle.tsx
import clsx17 from "clsx";
import { jsx as jsx39, jsxs as jsxs29 } from "react/jsx-runtime";
var BuilderSidebarResizeHandle = ({
  side,
  onPointerDown
}) => {
  return /* @__PURE__ */ jsxs29(
    "button",
    {
      type: "button",
      "aria-label": `Resize ${side} sidebar`,
      onPointerDown,
      className: clsx17(
        "group absolute bottom-0 top-0 z-20 hidden w-6 cursor-col-resize touch-none lg:block",
        side === "left" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
      ),
      children: [
        /* @__PURE__ */ jsx39("span", { className: "absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 rounded-full bg-cyan-300/0 opacity-0 transition-[background-color,opacity] duration-200 delay-500 group-hover:bg-cyan-300/12 group-hover:opacity-100 group-focus-visible:bg-cyan-300/12 group-focus-visible:opacity-100 group-active:delay-0 group-active:bg-cyan-300/18 group-active:opacity-100" }),
        /* @__PURE__ */ jsx39("span", { className: "absolute inset-y-8 left-1/2 w-px -translate-x-1/2 rounded-full bg-white/12 opacity-50 transition-[background-color,opacity] duration-200 delay-500 group-hover:bg-cyan-300/55 group-hover:opacity-100 group-focus-visible:bg-cyan-300/55 group-focus-visible:opacity-100 group-active:delay-0 group-active:bg-cyan-300/65 group-active:opacity-100" })
      ]
    }
  );
};

// src/studio/website-builder-studio/builder-sidebars.tsx
import { Fragment as Fragment8, jsx as jsx40, jsxs as jsxs30 } from "react/jsx-runtime";
var BuilderSidebars = ({
  sidebarsVisible,
  dockHeight,
  isResizing,
  leftSidebarWidth,
  rightSidebarWidth,
  leftCollapsed,
  rightCollapsed,
  children,
  search,
  onSearchChange,
  allPaletteBlocks,
  paletteGroups,
  paletteFamily,
  onPaletteFamilyChange,
  palettePackage,
  onPalettePackageChange,
  collapsedFamilies,
  onToggleFamily,
  collapsedGroups,
  onToggleGroup,
  selectedDefinitionKey,
  onSelectDefinition,
  onInsert,
  manualInsertTarget,
  definitionFields,
  inspectorGroups,
  selectedFieldPath,
  inspectorDefinition,
  pageSettings,
  currentPage,
  onContentLocaleChange,
  onToggleLeftCollapsed,
  onToggleRightCollapsed,
  onExpandLeft,
  onExpandRight,
  onResizeStart
}) => {
  const [transitionsEnabled, setTransitionsEnabled] = useState19(false);
  const leftReservedWidth = sidebarsVisible && !leftCollapsed ? leftSidebarWidth : 0;
  const rightReservedWidth = sidebarsVisible && !rightCollapsed ? rightSidebarWidth : 0;
  useEffect15(() => {
    const timeoutId = window.setTimeout(() => {
      setTransitionsEnabled(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);
  return /* @__PURE__ */ jsxs30(Fragment8, { children: [
    transitionsEnabled && sidebarsVisible && leftCollapsed ? /* @__PURE__ */ jsx40(
      BuilderSidebarEdgeToggle,
      {
        side: "left",
        dockHeight,
        onExpand: onExpandLeft
      }
    ) : null,
    transitionsEnabled && sidebarsVisible && rightCollapsed ? /* @__PURE__ */ jsx40(
      BuilderSidebarEdgeToggle,
      {
        side: "right",
        dockHeight,
        onExpand: onExpandRight
      }
    ) : null,
    /* @__PURE__ */ jsxs30(
      "div",
      {
        className: clsx18(
          "relative min-w-0 lg:pl-[var(--wb-left-sidebar-width)] lg:pr-[var(--wb-right-sidebar-width)]",
          !isResizing && "lg:transition-[padding] lg:duration-500 lg:ease-[cubic-bezier(0.22,1,0.36,1)]"
        ),
        style: {
          "--wb-left-sidebar-width": `${leftReservedWidth}px`,
          "--wb-right-sidebar-width": `${rightReservedWidth}px`
        },
        children: [
          /* @__PURE__ */ jsx40(
            "aside",
            {
              className: clsx18(
                "fixed bottom-0 z-30 hidden overflow-hidden lg:block",
                transitionsEnabled && !isResizing && "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                (!sidebarsVisible || leftCollapsed) && "pointer-events-none"
              ),
              style: {
                top: dockHeight,
                width: leftSidebarWidth,
                left: 0,
                transform: sidebarsVisible && !leftCollapsed ? "translateX(0)" : "translateX(-100%)"
              },
              "aria-hidden": !sidebarsVisible || leftCollapsed,
              "data-testid": "wb-builder-sidebar-left",
              children: /* @__PURE__ */ jsxs30(
                "div",
                {
                  className: clsx18(
                    "relative h-full min-w-0 overflow-hidden border-r backdrop-blur-md"
                  ),
                  style: {
                    borderColor: "var(--wb-builder-border)",
                    background: isResizing ? "var(--wb-builder-panel-solid)" : "var(--wb-builder-panel)",
                    color: "var(--wb-builder-text)",
                    boxShadow: "var(--wb-builder-sidebar-shadow)"
                  },
                  children: [
                    /* @__PURE__ */ jsx40(
                      PalettePanel,
                      {
                        search,
                        onSearchChange,
                        allPaletteBlocks,
                        paletteGroups,
                        paletteFamily,
                        onPaletteFamilyChange,
                        palettePackage,
                        onPalettePackageChange,
                        collapsedFamilies,
                        onToggleFamily,
                        collapsedGroups,
                        onToggleGroup,
                        selectedDefinitionKey,
                        onSelectDefinition,
                        onInsert,
                        manualInsertTarget,
                        onCollapse: onToggleLeftCollapsed
                      }
                    ),
                    /* @__PURE__ */ jsx40(
                      BuilderSidebarResizeHandle,
                      {
                        side: "left",
                        onPointerDown: onResizeStart("left")
                      }
                    )
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx40("div", { className: "min-w-0", children }),
          /* @__PURE__ */ jsx40(
            "aside",
            {
              className: clsx18(
                "fixed bottom-0 z-30 hidden overflow-hidden lg:block",
                transitionsEnabled && !isResizing && "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                (!sidebarsVisible || rightCollapsed) && "pointer-events-none"
              ),
              style: {
                top: dockHeight,
                width: rightSidebarWidth,
                right: 0,
                transform: sidebarsVisible && !rightCollapsed ? "translateX(0)" : "translateX(100%)"
              },
              "aria-hidden": !sidebarsVisible || rightCollapsed,
              "data-testid": "wb-builder-sidebar-right",
              children: /* @__PURE__ */ jsxs30(
                "div",
                {
                  className: clsx18(
                    "relative h-full min-w-0 overflow-hidden border-l backdrop-blur-md"
                  ),
                  style: {
                    borderColor: "var(--wb-builder-border)",
                    background: isResizing ? "var(--wb-builder-panel-solid)" : "var(--wb-builder-panel)",
                    color: "var(--wb-builder-text)",
                    boxShadow: "var(--wb-builder-sidebar-shadow)"
                  },
                  children: [
                    /* @__PURE__ */ jsx40(
                      InspectorPanel,
                      {
                        definitionFields,
                        inspectorGroups,
                        selectedFieldPath,
                        inspectorDefinition,
                        pageSettings,
                        currentPage,
                        onContentLocaleChange,
                        onCollapse: onToggleRightCollapsed
                      }
                    ),
                    /* @__PURE__ */ jsx40(
                      BuilderSidebarResizeHandle,
                      {
                        side: "right",
                        onPointerDown: onResizeStart("right")
                      }
                    )
                  ]
                }
              )
            }
          )
        ]
      }
    )
  ] });
};

// src/studio/website-builder-studio/website-builder-stage.tsx
import { jsx as jsx41, jsxs as jsxs31 } from "react/jsx-runtime";
var clampChannel = (value) => Math.max(0, Math.min(255, Math.round(value)));
var HEX_COLOR_PATTERN = /^#([\da-f]{3}|[\da-f]{6})$/i;
var RGB_COLOR_PATTERN = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[\d.]+\s*)?\)$/i;
var parseColor = (value) => {
  const normalizedValue = value.trim();
  if (HEX_COLOR_PATTERN.test(normalizedValue)) {
    const hex = normalizedValue.slice(1);
    const expandedHex = hex.length === 3 ? hex.split("").map((part) => `${part}${part}`).join("") : hex;
    return {
      r: Number.parseInt(expandedHex.slice(0, 2), 16),
      g: Number.parseInt(expandedHex.slice(2, 4), 16),
      b: Number.parseInt(expandedHex.slice(4, 6), 16)
    };
  }
  const rgbMatch = normalizedValue.match(RGB_COLOR_PATTERN);
  if (!rgbMatch) {
    return null;
  }
  return {
    r: clampChannel(Number(rgbMatch[1])),
    g: clampChannel(Number(rgbMatch[2])),
    b: clampChannel(Number(rgbMatch[3]))
  };
};
var mixColor = (from, to, amount) => ({
  r: clampChannel(from.r + (to.r - from.r) * amount),
  g: clampChannel(from.g + (to.g - from.g) * amount),
  b: clampChannel(from.b + (to.b - from.b) * amount)
});
var createRgbString = ({ r, g, b }) => `rgb(${r} ${g} ${b})`;
var createAlphaString = ({ r, g, b }, alpha) => `rgb(${r} ${g} ${b} / ${alpha})`;
var getRelativeLuminance = (color) => {
  const channels = [color.r, color.g, color.b].map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};
var createBuilderThemeStyle = (designSettings) => {
  const fallbackBackground = { r: 8, g: 19, b: 33 };
  const fallbackSurface = { r: 15, g: 27, b: 45 };
  const fallbackText = { r: 248, g: 251, b: 255 };
  const fallbackAccent = { r: 20, g: 184, b: 166 };
  const fallbackBorder = { r: 148, g: 163, b: 184 };
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 9, g: 18, b: 31 };
  const background = parseColor(designSettings.backgroundColor) ?? fallbackBackground;
  const surface = parseColor(designSettings.surfaceColor) ?? fallbackSurface;
  const text = parseColor(designSettings.textColor) ?? fallbackText;
  const accent = parseColor(designSettings.accentColor) ?? fallbackAccent;
  const border = parseColor(designSettings.borderColor) ?? fallbackBorder;
  const isDark = getRelativeLuminance(background) < 0.38;
  const shell = isDark ? mixColor(background, surface, 0.58) : mixColor(background, surface, 0.28);
  const shellMuted = isDark ? mixColor(shell, background, 0.18) : mixColor(shell, white, 0.2);
  const shellStrong = isDark ? mixColor(shell, black, 0.18) : mixColor(shell, background, 0.06);
  const dockTop = isDark ? mixColor(shell, accent, 0.08) : mixColor(shell, white, 0.42);
  const dockBottom = isDark ? mixColor(background, surface, 0.32) : mixColor(surface, background, 0.36);
  const panel = isDark ? mixColor(surface, background, 0.22) : mixColor(surface, background, 0.08);
  const panelSolid = isDark ? mixColor(panel, black, 0.12) : mixColor(panel, white, 0.3);
  const field = isDark ? mixColor(panelSolid, black, 0.22) : mixColor(panelSolid, background, 0.46);
  const card = isDark ? mixColor(panelSolid, accent, 0.04) : mixColor(panelSolid, accent, 0.06);
  const cardSelected = isDark ? mixColor(panelSolid, accent, 0.16) : mixColor(panelSolid, accent, 0.18);
  const accentSoft = isDark ? mixColor(accent, background, 0.64) : mixColor(accent, white, 0.78);
  const accentText = getRelativeLuminance(accentSoft) > 0.58 ? black : white;
  const builderTextMuted = mixColor(text, background, isDark ? 0.42 : 0.34);
  const builderTextSoft = mixColor(text, background, isDark ? 0.62 : 0.52);
  const builderTextGhost = mixColor(text, background, isDark ? 0.76 : 0.68);
  const borderStrong = mixColor(border, accent, isDark ? 0.32 : 0.22);
  const scrollbarTrack = isDark ? mixColor(background, black, 0.2) : mixColor(background, surface, 0.24);
  const scrollbarThumb = isDark ? mixColor(accent, white, 0.16) : mixColor(accent, background, 0.18);
  const scrollbarThumbHover = isDark ? mixColor(accent, white, 0.28) : mixColor(accent, white, 0.12);
  return {
    "--wb-builder-shell": createRgbString(shell),
    "--wb-builder-shell-muted": createRgbString(shellMuted),
    "--wb-builder-shell-strong": createRgbString(shellStrong),
    "--wb-builder-dock-bg": `linear-gradient(180deg, ${createAlphaString(dockTop, 0.96)} 0%, ${createAlphaString(dockBottom, 0.88)} 100%)`,
    "--wb-builder-panel": createAlphaString(panel, isDark ? 0.82 : 0.94),
    "--wb-builder-panel-solid": createRgbString(panelSolid),
    "--wb-builder-panel-muted": createAlphaString(
      panelSolid,
      isDark ? 0.78 : 0.88
    ),
    "--wb-builder-field": createRgbString(field),
    "--wb-builder-card": createRgbString(card),
    "--wb-builder-card-selected": createRgbString(cardSelected),
    "--wb-builder-card-highlight": `radial-gradient(circle at top left, ${createAlphaString(accent, isDark ? 0.14 : 0.12)}, transparent 58%)`,
    "--wb-builder-border": createAlphaString(border, isDark ? 0.22 : 0.7),
    "--wb-builder-border-strong": createAlphaString(
      borderStrong,
      isDark ? 0.42 : 0.8
    ),
    "--wb-builder-text": createRgbString(text),
    "--wb-builder-text-muted": createRgbString(builderTextMuted),
    "--wb-builder-text-soft": createRgbString(builderTextSoft),
    "--wb-builder-text-ghost": createRgbString(builderTextGhost),
    "--wb-builder-accent": createRgbString(accent),
    "--wb-builder-accent-soft": createAlphaString(
      accentSoft,
      isDark ? 0.94 : 0.96
    ),
    "--wb-builder-accent-strong": createAlphaString(
      accent,
      isDark ? 0.2 : 0.14
    ),
    "--wb-builder-accent-text": createRgbString(accentText),
    "--wb-builder-shadow": isDark ? "0 18px 64px rgba(2, 6, 23, 0.28)" : "0 18px 54px rgba(15, 23, 42, 0.12)",
    "--wb-builder-panel-shadow": isDark ? "0 14px 38px rgba(2, 6, 23, 0.24)" : "0 14px 34px rgba(15, 23, 42, 0.08)",
    "--wb-builder-sidebar-shadow": isDark ? "0 22px 52px rgba(2, 6, 23, 0.3)" : "0 18px 44px rgba(15, 23, 42, 0.1)",
    "--wb-builder-card-shadow": isDark ? "0 12px 26px rgba(2, 6, 23, 0.18)" : "0 10px 22px rgba(15, 23, 42, 0.08)",
    "--wb-builder-canvas-shadow": isDark ? "0 28px 80px rgba(2, 8, 23, 0.24)" : "0 28px 72px rgba(15, 23, 42, 0.12)",
    "--wb-builder-elevation": `linear-gradient(180deg, ${createAlphaString(white, isDark ? 0.04 : 0.55)}, ${createAlphaString(white, 0)} 100%)`,
    "--wb-site-scrollbar-track": createAlphaString(
      scrollbarTrack,
      isDark ? 0.88 : 0.92
    ),
    "--wb-site-scrollbar-thumb": `linear-gradient(180deg, ${createAlphaString(
      scrollbarThumb,
      isDark ? 0.82 : 0.76
    )}, ${createAlphaString(scrollbarThumbHover, isDark ? 0.9 : 0.84)})`,
    "--wb-site-scrollbar-thumb-hover": `linear-gradient(180deg, ${createAlphaString(
      scrollbarThumbHover,
      isDark ? 0.92 : 0.88
    )}, ${createAlphaString(accent, isDark ? 0.94 : 0.9)})`,
    "--wb-site-scrollbar-border": createAlphaString(
      borderStrong,
      isDark ? 0.24 : 0.44
    )
  };
};
var WebsiteBuilderStage = ({
  activeMode,
  canManage,
  hasUnsavedChanges,
  collapsedBlockCount,
  autosaveEnabled,
  saveState,
  showCollapsedInPreview,
  title,
  description,
  currentPage,
  pages,
  onHeightChange,
  onAuthOpen,
  onAutosaveChange,
  onOpenPage,
  onCreatePage,
  onContentLocaleChange,
  onInterfaceLocaleChange,
  showInterfaceLocaleControl,
  workspaceControl,
  onCollapseAll,
  onExpandAll,
  onBuilderSurfaceModeChange,
  onLogout,
  onModeChange,
  onPreviewCollapsedChange,
  onReset,
  onSave,
  builderEnabled,
  builderSurfaceMode,
  contentEnabled,
  dockHeight,
  isResizing,
  leftSidebarWidth,
  rightSidebarWidth,
  leftCollapsed,
  rightCollapsed,
  mainPaddingTop,
  document: document2,
  isDragging,
  manualInsertTarget,
  dropTarget,
  structureModeEnabled,
  respectsCollapsedState,
  onActivateInsertTarget,
  contentNotice,
  search,
  onSearchChange,
  allPaletteBlocks,
  paletteGroups,
  paletteFamily,
  onPaletteFamilyChange,
  palettePackage,
  onPalettePackageChange,
  collapsedFamilies,
  onToggleFamily,
  collapsedGroups,
  onToggleGroup,
  selectedDefinitionKey,
  onSelectDefinition,
  onInsert,
  definitionFields,
  inspectorGroups,
  selectedFieldPath,
  inspectorDefinition,
  pageSettings,
  pageSettingsPanels,
  site,
  siteSettingsPanels,
  siteSettingsSubtabs,
  getPageSettingValue,
  onPageSettingChange,
  onPageSettingFocus,
  getSiteSettingValue,
  onSiteSettingChange,
  onSiteSettingFocus,
  onToggleLeftCollapsed,
  onToggleRightCollapsed,
  onExpandLeft,
  onExpandRight,
  onResizeStart
}) => {
  const canvasSurfaceVisible = !builderEnabled || builderSurfaceMode === "canvas";
  const sidebarsVisible = builderEnabled && builderSurfaceMode === "canvas";
  const canvasToolbarHeight = builderEnabled ? 40 : 0;
  const canvasToolbarLeftOffset = sidebarsVisible && !leftCollapsed ? leftSidebarWidth : 0;
  const canvasToolbarRightOffset = sidebarsVisible && !rightCollapsed ? rightSidebarWidth : 0;
  const canvasToolbarTopOffset = dockHeight;
  const canvasMainPaddingTop = mainPaddingTop + canvasToolbarHeight;
  const builderSurfaceInset = builderEnabled ? 16 : 0;
  const designSettings = resolveWebsiteBuilderSiteDesignSettings(
    site.settings.design
  );
  const siteSurfaceStyle = {
    "--wb-site-body-font": designSettings.bodyFontFamily,
    "--wb-site-heading-font": designSettings.headingFontFamily,
    "--wb-site-background": designSettings.backgroundColor,
    "--wb-site-surface": designSettings.surfaceColor,
    "--wb-site-text": designSettings.textColor,
    "--wb-site-muted": designSettings.mutedTextColor,
    "--wb-site-muted-text": designSettings.mutedTextColor,
    "--wb-site-accent": designSettings.accentColor,
    "--wb-site-border": designSettings.borderColor,
    "--wb-site-max-width": designSettings.siteMaxWidth,
    "--wb-site-gutter": designSettings.pageGutter,
    "--wb-section-gap": designSettings.sectionGap,
    "--wb-site-radius": designSettings.radius,
    "--wb-site-header-offset": designSettings.headerOffset
  };
  const siteSurfaceSceneStyle = {
    backgroundColor: designSettings.backgroundColor,
    color: designSettings.textColor,
    fontFamily: designSettings.bodyFontFamily
  };
  const builderThemeStyle = createBuilderThemeStyle(designSettings);
  const stageStyle = {
    ...siteSurfaceStyle,
    ...builderThemeStyle,
    fontFamily: "var(--font-display, ui-sans-serif), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontWeight: 400
  };
  const mainStyle = {
    paddingTop: canManage ? canvasMainPaddingTop + builderSurfaceInset : mainPaddingTop,
    "--wb-dock-offset": `${canManage ? canvasMainPaddingTop : 0}px`,
    ...canManage ? {
      backgroundColor: "var(--wb-builder-shell)",
      color: "var(--wb-builder-text)"
    } : {},
    ...canvasSurfaceVisible ? siteSurfaceSceneStyle : {}
  };
  useEffect16(() => {
    const browserDocument = globalThis.document;
    if (!browserDocument) {
      return;
    }
    const root = browserDocument.documentElement instanceof HTMLElement ? browserDocument.documentElement : null;
    if (!root) {
      return;
    }
    const previousValues = /* @__PURE__ */ new Map();
    for (const [key, value] of Object.entries(builderThemeStyle)) {
      if (!key.startsWith("--wb-builder-") && !key.startsWith("--wb-site-scrollbar-") || typeof value !== "string") {
        continue;
      }
      previousValues.set(key, root.style.getPropertyValue(key));
      root.style.setProperty(key, value);
    }
    return () => {
      for (const [key, value] of previousValues.entries()) {
        if (value) {
          root.style.setProperty(key, value);
          continue;
        }
        root.style.removeProperty(key);
      }
    };
  }, [builderThemeStyle, canManage]);
  return /* @__PURE__ */ jsxs31(
    "div",
    {
      className: "relative z-10 transition-[background-color,color] duration-500",
      style: stageStyle,
      "data-testid": "wb-builder-theme-root",
      "data-wb-builder-appearance": getRelativeLuminance(
        parseColor(designSettings.backgroundColor) ?? { r: 8, g: 19, b: 33 }
      ) < 0.38 ? "dark" : "light",
      children: [
        canManage ? /* @__PURE__ */ jsx41(
          EditorDock,
          {
            activeMode,
            canManage,
            hasUnsavedChanges,
            collapsedBlockCount,
            autosaveEnabled,
            saveState,
            showCollapsedInPreview,
            title,
            description,
            currentPage,
            pages,
            onHeightChange,
            onAuthOpen,
            onAutosaveChange,
            onOpenPage,
            onCreatePage,
            onContentLocaleChange,
            onInterfaceLocaleChange,
            showInterfaceLocaleControl,
            workspaceControl,
            onLogout,
            onModeChange,
            onPreviewCollapsedChange,
            onReset,
            onSave
          }
        ) : null,
        /* @__PURE__ */ jsxs31(
          BuilderSidebars,
          {
            sidebarsVisible,
            dockHeight,
            isResizing,
            leftSidebarWidth,
            rightSidebarWidth,
            leftCollapsed,
            rightCollapsed,
            search,
            onSearchChange,
            allPaletteBlocks,
            paletteGroups,
            paletteFamily,
            onPaletteFamilyChange,
            palettePackage,
            onPalettePackageChange,
            collapsedFamilies,
            onToggleFamily,
            collapsedGroups,
            onToggleGroup,
            selectedDefinitionKey,
            onSelectDefinition,
            onInsert,
            manualInsertTarget,
            definitionFields,
            inspectorGroups,
            selectedFieldPath,
            inspectorDefinition,
            pageSettings,
            currentPage,
            onContentLocaleChange,
            onToggleLeftCollapsed,
            onToggleRightCollapsed,
            onExpandLeft,
            onExpandRight,
            onResizeStart,
            children: [
              /* @__PURE__ */ jsx41(
                CanvasTopToolbar,
                {
                  visible: builderEnabled,
                  surfaceMode: builderSurfaceMode,
                  canReset: hasUnsavedChanges,
                  topOffset: canvasToolbarTopOffset,
                  leftOffset: canvasToolbarLeftOffset,
                  rightOffset: canvasToolbarRightOffset,
                  onSurfaceModeChange: onBuilderSurfaceModeChange,
                  onReset,
                  onCollapseAll,
                  onExpandAll
                }
              ),
              /* @__PURE__ */ jsxs31(
                "main",
                {
                  className: clsx19(
                    "min-w-0 transition-colors duration-500",
                    canManage ? "min-h-screen pb-0" : "pb-0",
                    builderEnabled ? "px-4 sm:px-6 lg:px-8" : canvasSurfaceVisible ? "px-0" : "px-4 sm:px-6 lg:px-8"
                  ),
                  style: mainStyle,
                  children: [
                    /* @__PURE__ */ jsx41(
                      "div",
                      {
                        className: clsx19(
                          "mx-auto transition-[max-width,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          canvasSurfaceVisible ? "max-w-none" : "max-w-[1480px]"
                        ),
                        children: builderEnabled && builderSurfaceMode === "settings" ? /* @__PURE__ */ jsx41(
                          PageSettingsSurface,
                          {
                            currentPage,
                            pageSettings,
                            pageSettingsPanels,
                            site,
                            siteSettingsPanels,
                            siteSettingsSubtabs,
                            getPageSettingValue,
                            onPageSettingChange,
                            onPageSettingFocus,
                            getSiteSettingValue,
                            onSiteSettingChange,
                            onSiteSettingFocus
                          }
                        ) : /* @__PURE__ */ jsxs31(
                          "div",
                          {
                            className: clsx19(
                              "relative",
                              !isResizing && "transition-[border-radius,box-shadow] duration-300",
                              builderEnabled ? "rounded-[28px] border shadow-[var(--wb-builder-canvas-shadow)]" : null
                            ),
                            style: {
                              ...siteSurfaceSceneStyle,
                              ...builderEnabled ? {
                                borderColor: "var(--wb-builder-border)"
                              } : {}
                            },
                            children: [
                              builderEnabled ? /* @__PURE__ */ jsx41(
                                "div",
                                {
                                  className: "pointer-events-none absolute inset-0 rounded-[28px]",
                                  style: { background: "var(--wb-builder-elevation)" }
                                }
                              ) : null,
                              /* @__PURE__ */ jsx41("div", { className: "relative", children: /* @__PURE__ */ jsx41(
                                SiteSurfaceCanvas,
                                {
                                  document: document2,
                                  site,
                                  builderEnabled,
                                  collapseControlsEnabled: structureModeEnabled,
                                  respectsCollapsedState,
                                  isDragging,
                                  manualInsertTarget,
                                  dropTarget,
                                  onActivateInsertTarget
                                }
                              ) })
                            ]
                          }
                        )
                      }
                    ),
                    contentEnabled && contentNotice ? /* @__PURE__ */ jsx41("div", { className: "mx-auto mt-4 max-w-[1480px]", children: contentNotice }) : null,
                    builderEnabled && builderSurfaceMode === "canvas" ? /* @__PURE__ */ jsx41(
                      BuilderMobilePanels,
                      {
                        search,
                        onSearchChange,
                        allPaletteBlocks,
                        paletteGroups,
                        paletteFamily,
                        onPaletteFamilyChange,
                        palettePackage,
                        onPalettePackageChange,
                        collapsedFamilies,
                        onToggleFamily,
                        collapsedGroups,
                        onToggleGroup,
                        selectedDefinitionKey,
                        onSelectDefinition,
                        onInsert,
                        manualInsertTarget,
                        definitionFields,
                        inspectorGroups,
                        selectedFieldPath,
                        inspectorDefinition,
                        pageSettings,
                        currentPage,
                        onContentLocaleChange
                      }
                    ) : null
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
};

// src/studio/website-builder-studio/website-builder-studio-inner.tsx
import { jsx as jsx42, jsxs as jsxs32 } from "react/jsx-runtime";
var WebsiteBuilderStudioInner = ({
  initialDocument,
  initialResources = {},
  initialPageSettings = {},
  initialSite = {
    settings: {},
    regions: {}
  },
  workspace,
  capabilities,
  history: _history,
  branchPolicy: _branchPolicy,
  mergePreview: _mergePreview,
  canManage,
  initialMode = "preview",
  draftStorageKey,
  autosaveStorageKey,
  currentPage,
  pages = [],
  onRequestAuth,
  onLogout,
  onContentLocaleChange,
  onInterfaceLocaleChange,
  onModeChange,
  onSiteSettingChange,
  onSaveDocument,
  onOpenPage,
  onCreatePage,
  activeSearchHighlight,
  hydrateModePreference = true,
  showInterfaceLocaleControl = true,
  workspaceControl,
  title,
  description,
  renderContentNotice,
  siteSettingsSubtabs
}) => {
  const document2 = useWebsiteBuilderStore((state) => state.document);
  const contentRevision = useWebsiteBuilderStore(
    (state) => state.contentRevision
  );
  const {
    document: persistedDocument,
    resources,
    pageSettings,
    site
  } = useWebsiteBuilderPersistedState();
  const mode = useWebsiteBuilderStore((state) => state.mode);
  const setMode = useWebsiteBuilderStore((state) => state.setMode);
  const isAdmin = useWebsiteBuilderStore((state) => state.isAdmin);
  const registry = useWebsiteBuilderStore((state) => state.registry);
  const selectedBlockId = useWebsiteBuilderStore(
    (state) => state.selectedBlockId
  );
  const selectedBlock = useWebsiteBuilderStore(
    (state) => state.selectedBlockId ? findWebsiteBuilderBlock(state.document.blocks, state.selectedBlockId) : null
  );
  const selectedField = useWebsiteBuilderStore((state) => state.selectedField);
  const selectBlock = useWebsiteBuilderStore((state) => state.selectBlock);
  const selectPageSettingField = useWebsiteBuilderStore(
    (state) => state.selectPageSettingField
  );
  const selectSiteSettingField = useWebsiteBuilderStore(
    (state) => state.selectSiteSettingField
  );
  const updatePageSettingValue = useWebsiteBuilderStore(
    (state) => state.updatePageSettingValue
  );
  const getPageSettingValue = useWebsiteBuilderStore(
    (state) => state.getPageSettingValue
  );
  const updateSiteSettingValue = useWebsiteBuilderStore(
    (state) => state.updateSiteSettingValue
  );
  const getSiteSettingValue = useWebsiteBuilderStore(
    (state) => state.getSiteSettingValue
  );
  const insertBlock = useWebsiteBuilderStore((state) => state.insertBlock);
  const moveBlock = useWebsiteBuilderStore((state) => state.moveBlock);
  const replaceState = useWebsiteBuilderStore((state) => state.replaceState);
  const syncExternalState = useWebsiteBuilderStore(
    (state) => state.syncExternalState
  );
  const collapseAllBlocks = useWebsiteBuilderStore(
    (state) => state.collapseAllBlocks
  );
  const expandAllBlocks = useWebsiteBuilderStore(
    (state) => state.expandAllBlocks
  );
  const collapsedBlockCount = useWebsiteBuilderStore(
    (state) => Object.keys(state.collapsedBlockIds).length
  );
  const [search, setSearch] = useState20("");
  const [paletteFamily, setPaletteFamily] = useState20("all");
  const [palettePackage, setPalettePackage] = useState20("all");
  const [selectedPaletteKey, setSelectedPaletteKey] = useState20(
    null
  );
  const [manualInsertTarget, setManualInsertTarget] = useState20(null);
  const [paletteCollapsedGroups, setPaletteCollapsedGroups] = useState20([]);
  const [paletteCollapsedFamilies, setPaletteCollapsedFamilies] = useState20([]);
  const [dockHeight, setDockHeight] = useState20(
    WEBSITE_BUILDER_EDITOR_DOCK_FALLBACK_HEIGHT
  );
  const [showCollapsedInPreview, setShowCollapsedInPreview] = useState20(false);
  const [hasMounted, setHasMounted] = useState20(false);
  const lastExternalModeRef = useRef5(initialMode);
  const deferredSearch = useDeferredValue(search);
  const builderEnabled = isAdmin && mode === "builder";
  const contentEnabled = isAdmin && mode === "content";
  const structureModeEnabled = isAdmin && mode === "builder";
  const activeMode = isAdmin ? mode : "preview";
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  const {
    leftWidth,
    rightWidth,
    leftCollapsed,
    rightCollapsed,
    toggleLeftCollapsed,
    toggleRightCollapsed,
    expandLeft,
    expandRight,
    isResizing,
    startResize
  } = useStudioSidebars({
    storageKey: `${draftStorageKey}:sidebars`
  });
  const {
    autosaveEnabled,
    setAutosaveEnabled,
    hasUnsavedChanges,
    restoreLastSavedState,
    saveState,
    saveDocument,
    expectedHeadRevisionId
  } = useStudioPersistence({
    initialDocument,
    initialResources,
    initialPageSettings,
    initialSite,
    contentRevision,
    persistedDocument,
    resources,
    pageSettings,
    site,
    isAdmin,
    workspace,
    capabilities,
    draftStorageKey,
    autosaveStorageKey,
    onSaveDocument,
    replaceState,
    syncExternalState
  });
  const handleSiteSettingChange = useStudioSiteSettingChange({
    workspace,
    expectedHeadRevisionId,
    document: persistedDocument,
    resources,
    pageSettings,
    site,
    currentPage: currentPage ?? null,
    updateSiteSettingValue,
    onSiteSettingChange,
    replaceState
  });
  const flushActiveInlineField = useCallback3(async () => {
    if (typeof window !== "undefined") {
      const activeElement = window.document.activeElement;
      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }
    }
    await new Promise((resolve) => {
      if (typeof window === "undefined") {
        resolve();
        return;
      }
      window.requestAnimationFrame(() => resolve());
    });
  }, []);
  const saveDocumentManually = useCallback3(async () => {
    await flushActiveInlineField();
    await saveDocument("manual");
  }, [flushActiveInlineField, saveDocument]);
  const { builderSurfaceMode, setBuilderSurfaceMode } = useStudioBrowserPreferences({
    isAdmin,
    mode,
    setMode,
    draftStorageKey,
    hydrateModePreference,
    onManualSave: () => void saveDocumentManually()
  });
  const {
    allPaletteBlocks,
    paletteGroups,
    definitionFields,
    inspectorGroups,
    inspectorDefinition,
    visiblePageSettingsPanels,
    visibleSiteSettingsPanels
  } = useStudioDefinitionCatalog({
    registry,
    selectedBlock,
    selectedPaletteKey,
    currentPage: currentPage ?? null,
    pageSettings,
    site,
    search: deferredSearch,
    paletteFamily,
    palettePackage
  });
  const {
    activeBlock,
    activeDragKind,
    activePaletteDefinition,
    paletteOverlayOrigin,
    dropTarget,
    handleDragCancel,
    handleDragEnd,
    handleDragOver,
    handleDragStart
  } = useStudioDragState({
    builderEnabled,
    document: document2,
    allPaletteBlocks,
    selectedBlockId,
    selectedBlock,
    insertBlock,
    moveBlock,
    selectBlock,
    onClearPaletteSelection: () => setSelectedPaletteKey(null)
  });
  const mainPaddingTop = canManage ? dockHeight : 0;
  const respectsCollapsedState = structureModeEnabled || showCollapsedInPreview;
  const dragOverlayModifiers = activeDragKind === "palette" && paletteOverlayOrigin ? [
    ({ transform }) => ({
      ...transform,
      x: transform.x + paletteOverlayOrigin.x,
      y: transform.y + paletteOverlayOrigin.y
    })
  ] : [];
  useEffect17(() => {
    setHasMounted(true);
  }, []);
  const togglePaletteFamily = (family) => {
    setPaletteCollapsedFamilies(
      (current) => current.includes(family) ? current.filter((candidate) => candidate !== family) : [...current, family]
    );
  };
  useEffect17(() => {
    if (!isAdmin || lastExternalModeRef.current === initialMode) {
      return;
    }
    lastExternalModeRef.current = initialMode;
    startTransition(() => {
      setMode(initialMode);
    });
  }, [initialMode, isAdmin, setMode]);
  const handleModeChange = (nextMode) => {
    if (!isAdmin && nextMode !== "preview") {
      return;
    }
    startTransition(() => {
      setMode(nextMode);
    });
    void onModeChange?.(nextMode);
  };
  const handlePaletteInsert = (definition) => {
    const target = manualInsertTarget ?? {
      listId: getWebsiteBuilderSurfaceRegionListId(
        WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY
      ),
      index: persistedDocument.blocks.length
    };
    insertBlock({
      module: definition.module,
      type: definition.type,
      listId: target.listId,
      index: target.index
    });
    setSelectedPaletteKey(definition.key);
    setManualInsertTarget(null);
  };
  const handlePaletteSelect = (definition) => {
    setSelectedPaletteKey(definition.key);
    selectBlock(null);
  };
  const togglePaletteGroup = (group) => {
    setPaletteCollapsedGroups(
      (current) => current.includes(group) ? current.filter((candidate) => candidate !== group) : [...current, group]
    );
  };
  const contentNotice = renderContentNotice ?? null;
  return /* @__PURE__ */ jsxs32("div", { className: "relative min-h-screen", children: [
    /* @__PURE__ */ jsx42(
      WebsiteBuilderSearchHighlightEffect,
      {
        activeHighlight: activeSearchHighlight
      }
    ),
    /* @__PURE__ */ jsxs32(
      DndContext,
      {
        id: "website-builder-studio",
        sensors,
        collisionDetection: websiteBuilderCollisionDetection,
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
        onDragEnd: handleDragEnd,
        onDragCancel: handleDragCancel,
        children: [
          /* @__PURE__ */ jsx42(
            WebsiteBuilderStage,
            {
              activeMode,
              canManage,
              hasUnsavedChanges,
              collapsedBlockCount,
              autosaveEnabled,
              saveState,
              showCollapsedInPreview,
              title,
              description,
              onHeightChange: setDockHeight,
              onAuthOpen: () => onRequestAuth?.(),
              onAutosaveChange: setAutosaveEnabled,
              onCollapseAll: collapseAllBlocks,
              onExpandAll: expandAllBlocks,
              onLogout: () => void onLogout?.(),
              onContentLocaleChange: (locale) => void onContentLocaleChange?.(locale),
              onInterfaceLocaleChange: (locale) => void onInterfaceLocaleChange?.(locale),
              showInterfaceLocaleControl,
              workspaceControl,
              onModeChange: handleModeChange,
              onPreviewCollapsedChange: () => setShowCollapsedInPreview((current) => !current),
              onReset: () => {
                restoreLastSavedState();
                toast4.info("Local draft reverted", {
                  description: "Local changes were reset to the last saved version."
                });
              },
              onSave: () => void saveDocumentManually(),
              currentPage: currentPage ?? null,
              pages,
              onOpenPage: (page) => void onOpenPage?.(page, { mode: activeMode }),
              onCreatePage: async (input) => onCreatePage?.(input, {
                mode: activeMode,
                document: persistedDocument,
                resources,
                pageSettings,
                site,
                currentPage: currentPage ?? null
              }),
              builderEnabled,
              builderSurfaceMode,
              contentEnabled,
              dockHeight,
              isResizing,
              leftSidebarWidth: leftWidth,
              rightSidebarWidth: rightWidth,
              leftCollapsed,
              rightCollapsed,
              mainPaddingTop,
              document: document2,
              isDragging: activeDragKind !== null,
              manualInsertTarget,
              dropTarget,
              structureModeEnabled,
              respectsCollapsedState,
              onActivateInsertTarget: setManualInsertTarget,
              contentNotice,
              search,
              onSearchChange: setSearch,
              allPaletteBlocks,
              paletteGroups,
              paletteFamily,
              onPaletteFamilyChange: setPaletteFamily,
              palettePackage,
              onPalettePackageChange: setPalettePackage,
              collapsedFamilies: paletteCollapsedFamilies,
              onToggleFamily: togglePaletteFamily,
              collapsedGroups: paletteCollapsedGroups,
              onToggleGroup: togglePaletteGroup,
              selectedDefinitionKey: selectedPaletteKey,
              onSelectDefinition: handlePaletteSelect,
              onInsert: handlePaletteInsert,
              definitionFields,
              inspectorGroups,
              selectedFieldPath: selectedField?.path ?? null,
              inspectorDefinition,
              pageSettings,
              pageSettingsPanels: visiblePageSettingsPanels,
              site,
              siteSettingsPanels: visibleSiteSettingsPanels,
              siteSettingsSubtabs: siteSettingsSubtabs ?? [],
              onPageSettingFocus: selectPageSettingField,
              onPageSettingChange: updatePageSettingValue,
              getPageSettingValue,
              onSiteSettingFocus: selectSiteSettingField,
              onSiteSettingChange: handleSiteSettingChange,
              getSiteSettingValue,
              onBuilderSurfaceModeChange: setBuilderSurfaceMode,
              onToggleLeftCollapsed: toggleLeftCollapsed,
              onToggleRightCollapsed: toggleRightCollapsed,
              onExpandLeft: expandLeft,
              onExpandRight: expandRight,
              onResizeStart: startResize
            }
          ),
          hasMounted ? createPortal(
            /* @__PURE__ */ jsx42(
              DragOverlay,
              {
                adjustScale: false,
                dropAnimation: null,
                modifiers: dragOverlayModifiers,
                children: activeDragKind === "palette" && activePaletteDefinition ? /* @__PURE__ */ jsx42(PaletteOverlayCard, { definition: activePaletteDefinition }) : activeBlock ? /* @__PURE__ */ jsx42(BlockOverlayCard, { block: activeBlock }) : null
              }
            ),
            globalThis.document.body
          ) : null
        ]
      }
    )
  ] });
};

// src/studio/website-builder-studio/website-builder-studio.tsx
import { jsx as jsx43 } from "react/jsx-runtime";
var WebsiteBuilderStudio = ({
  initialDocument,
  initialResources,
  initialPageSettings,
  initialSite,
  registry,
  workspace,
  capabilities,
  history,
  branchPolicy,
  mergePreview,
  canManage,
  initialMode = "preview",
  draftStorageKey,
  autosaveStorageKey,
  currentPage,
  pages,
  onRequestAuth,
  onLogout,
  onContentLocaleChange,
  onInterfaceLocaleChange,
  onModeChange,
  onSiteSettingChange,
  onSaveDocument,
  onOpenPage,
  onCreatePage,
  onUploadMedia,
  onSearch,
  activeSearchHighlight,
  linkComponent,
  siteFrameExtensions,
  accountTabs,
  i18n,
  hydrateModePreference = true,
  showInterfaceLocaleControl = true,
  workspaceControl,
  title = "Live website editing framework",
  description = "Package-level studio shell with inline content editing, builder chrome and installable kit support.",
  renderContentNotice,
  siteSettingsSubtabs
}) => {
  return /* @__PURE__ */ jsx43(
    WebsiteBuilderProvider,
    {
      initialDocument,
      initialResources,
      initialPageSettings,
      initialSite,
      registry,
      workspace,
      capabilities,
      initialMode,
      isAdmin: canManage,
      uploadMedia: onUploadMedia,
      searchSite: onSearch,
      requestAuth: onRequestAuth,
      linkComponent,
      siteFrameExtensions,
      accountTabs,
      i18n,
      children: /* @__PURE__ */ jsx43(
        WebsiteBuilderStudioInner,
        {
          initialDocument,
          initialResources,
          initialPageSettings,
          initialSite,
          workspace,
          capabilities,
          history,
          branchPolicy,
          mergePreview,
          canManage: Boolean(canManage),
          initialMode,
          draftStorageKey,
          autosaveStorageKey,
          currentPage,
          pages,
          onRequestAuth,
          onLogout,
          onContentLocaleChange,
          onInterfaceLocaleChange,
          onModeChange,
          onSiteSettingChange,
          onSaveDocument,
          onOpenPage,
          onCreatePage,
          activeSearchHighlight,
          hydrateModePreference,
          showInterfaceLocaleControl,
          workspaceControl,
          title: title ?? "Live website editing framework",
          description: description ?? "Package-level studio shell with inline content editing, builder chrome and installable kit support.",
          renderContentNotice,
          siteSettingsSubtabs
        }
      )
    }
  );
};

export {
  WebsiteBuilderFieldEditorList,
  WebsiteBuilderStudio
};
