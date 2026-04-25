import {
  PhotonRichTextEditor
} from "./chunk-DSTVLR5H.js";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  KeyboardMenuList,
  PhotonRenderDepthProvider,
  PhotonSearchHighlightEffect,
  PhotonSurfaceLayoutProvider,
  Root,
  cn,
  resolvePhotonSiteFrameMobileControls,
  useKeyboardMenuController,
  usePhotonRenderDepth
} from "./chunk-ND6K56IL.js";
import {
  resolvePhotonSiteDesignSettings
} from "./chunk-32RC6A36.js";
import {
  mergePhotonStudioUrlState,
  normalizePhotonStudioSurfaceMode,
  parsePhotonStudioUrlState
} from "./chunk-ANYY7ADN.js";
import {
  PhotonProvider,
  getPhotonSelectedBlock,
  usePhotonPersistedState,
  usePhotonStore
} from "./chunk-4M3LI4MZ.js";
import {
  isPhotonMediaValue,
  resolvePhotonMediaPreviewUrl,
  resolvePhotonMediaUrl,
  updatePhotonMediaUrl
} from "./chunk-QQDDM7OM.js";
import {
  usePhotonI18n
} from "./chunk-O6DIDPAQ.js";
import {
  PHOTON_PAGE_SURFACE_REGION_KEY,
  getPhotonDocumentFingerprint,
  getPhotonSurfaceRegionBlocks,
  getPhotonSurfaceRegionListId,
  movePhotonArrayItem,
  resolvePhotonSurfaceRegionDescriptors,
  resolvePhotonSurfaceRegionForBlockId,
  resolvePhotonSurfaceRegionForListId
} from "./chunk-PWNAHWNN.js";
import {
  findPhotonBlock
} from "./chunk-DBONYFOO.js";
import {
  createPhotonAreaListId
} from "./chunk-LC3FJEJ5.js";
import {
  PHOTON_INTERACTIONS_SITE_SETTING_KEY,
  PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY,
  canSavePhotonWorkspace,
  clonePhotonValue,
  collectPhotonComponentLibraryUsages,
  createPhotonNodeId,
  getPhotonComponentLibraryItems,
  getPhotonWorkspaceIdentityKey,
  getValueAtPath,
  isPhotonComponentReferenceBlock,
  normalizePhotonWorkspaceCapabilities,
  normalizePhotonWorkspaceDescriptor,
  readPhotonInteractionSettings,
  readPhotonInteractionSurfaceSettings,
  resolvePhotonBlockInteractionSlots,
  resolvePhotonInteractionActionCatalog,
  resolvePhotonInteractionSlotAction,
  resolvePhotonInteractionSlotGuards,
  resolvePhotonInteractionSurfaceCatalog,
  resolvePhotonInteractionSurfaceRequest,
  setValueAtPath
} from "./chunk-ZJB32M2N.js";

// src/components/block-renderer.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var PhotonBlockRenderer = ({
  block,
  renderArea
}) => {
  const registry = usePhotonStore((state) => state.registry);
  const definition = registry.getDefinition(block.module, block.type);
  if (!definition) {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[28px] border border-rose-400/30 bg-rose-500/10 p-6 text-sm text-rose-100", children: [
      "Unknown block: ",
      block.module,
      "/",
      block.type
    ] });
  }
  const Component = definition.component;
  return /* @__PURE__ */ jsx(Component, { block, renderArea });
};

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
import { jsx as jsx2 } from "react/jsx-runtime";
var DropdownMenuContent = forwardRef(({ className, sideOffset = 8, ...props }, ref) => {
  return /* @__PURE__ */ jsx2(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx2(
    DropdownMenuPrimitive.Content,
    {
      ref,
      "data-slot": "dropdown-menu-content",
      sideOffset,
      collisionPadding: { top: 24, right: 16, bottom: 24, left: 16 },
      className: cn(
        "relative z-50 min-w-[12rem] overflow-hidden rounded-[1.35rem] border p-1.5 shadow-[var(--photon-builder-panel-shadow)] backdrop-blur-2xl duration-200 origin-[--radix-dropdown-menu-content-transform-origin] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      style: {
        borderColor: "var(--photon-builder-border)",
        background: "linear-gradient(180deg, var(--photon-builder-panel-solid), var(--photon-builder-panel))",
        color: "var(--photon-builder-text)"
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
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var DropdownMenuRadioItem = forwardRef2(({ className, children, ...props }, ref) => {
  return /* @__PURE__ */ jsxs2(
    DropdownMenuPrimitive2.RadioItem,
    {
      ref,
      "data-slot": "dropdown-menu-radio-item",
      className: cn(
        "relative flex cursor-pointer select-none items-center justify-between gap-3 rounded-[1rem] py-2.5 pl-3 pr-9 text-sm font-semibold outline-none transition-colors duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[highlighted]:bg-[var(--photon-builder-accent-strong)] data-[highlighted]:text-[var(--photon-builder-text)]",
        className
      ),
      style: {
        color: "var(--photon-builder-text-muted)"
      },
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx3("span", { className: "absolute right-3 inline-flex h-4 w-4 items-center justify-center", children: /* @__PURE__ */ jsx3(DropdownMenuPrimitive2.ItemIndicator, { children: /* @__PURE__ */ jsx3(
          Check,
          {
            className: "h-4 w-4",
            style: { color: "var(--photon-builder-accent)" }
          }
        ) }) })
      ]
    }
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive2.RadioItem.displayName;

// src/forms/form-fields-editor.tsx
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

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
  content: "photon.fieldGroups.content",
  style: "photon.fieldGroups.style",
  layout: "photon.fieldGroups.layout",
  data: "photon.fieldGroups.data",
  misc: "photon.fieldGroups.misc"
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
  const rightDistance = getPointerDistanceToRect(
    pointerCoordinates,
    rightRect
  );
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
var photonCollisionDetection = (args) => {
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
  const pointerProximityRect = createPointerProximityRect(
    args.pointerCoordinates
  );
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
  "text-sm outline-none transition placeholder:text-[color:var(--photon-builder-text-ghost)]",
  "border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)] text-[color:var(--photon-builder-text)] focus:border-[color:var(--photon-builder-border-strong)]"
);

// src/studio/shared/status-chip.tsx
import { jsx as jsx4 } from "react/jsx-runtime";

// src/studio/shared/toolbar-button.tsx
import clsx2 from "clsx";
import { jsx as jsx5 } from "react/jsx-runtime";
var ToolbarButton = ({
  children,
  onClick,
  disabled = false,
  className
}) => {
  return /* @__PURE__ */ jsx5(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      className: clsx2(
        "inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-45",
        "border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] text-[color:var(--photon-builder-text-muted)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)] hover:text-[color:var(--photon-builder-text)]",
        className
      ),
      children
    }
  );
};

// src/studio/shared/toolbar-chip-button.tsx
import { jsx as jsx6 } from "react/jsx-runtime";

// src/forms/form-fields-editor.tsx
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
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
var updateField = (fields, index, patch) => fields.map(
  (field, fieldIndex) => fieldIndex === index ? { ...field, ...patch } : field
);
var updateOption = (field, optionIndex, patch) => ({
  ...field,
  options: (field.options ?? []).map(
    (option, index) => index === optionIndex ? { ...option, ...patch } : option
  )
});
var PhotonFormFieldsEditor = ({
  value,
  onChange,
  onFocus
}) => {
  const fields = normalizeFields(value);
  const [expandedFieldId, setExpandedFieldId] = useState(
    fields[0]?.id ?? null
  );
  const emit = (nextFields) => {
    onChange(
      clonePhotonValue(
        nextFields
      )
    );
  };
  return /* @__PURE__ */ jsxs3("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx7("div", { className: "space-y-2 rounded-[20px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-2", children: fields.map((field, index) => {
      const isExpanded = expandedFieldId === field.id;
      const options = field.options ?? [];
      return /* @__PURE__ */ jsxs3(
        "div",
        {
          className: "rounded-[18px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)] p-3",
          children: [
            /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxs3(
                "button",
                {
                  type: "button",
                  onClick: () => setExpandedFieldId(isExpanded ? null : field.id),
                  className: "min-w-0 cursor-pointer text-left",
                  children: [
                    /* @__PURE__ */ jsx7("div", { className: "truncate text-sm font-semibold text-[color:var(--photon-builder-text)]", children: field.label || field.id || "Field" }),
                    /* @__PURE__ */ jsxs3("div", { className: "mt-1 truncate font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--photon-builder-text-ghost)]", children: [
                      field.type,
                      " / ",
                      field.name
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs3("div", { className: "flex shrink-0 items-center gap-1", children: [
                /* @__PURE__ */ jsx7(
                  "button",
                  {
                    type: "button",
                    disabled: index === 0,
                    onClick: () => emit(
                      movePhotonArrayItem(fields, index, index - 1)
                    ),
                    className: "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[color:var(--photon-builder-border)] text-[color:var(--photon-builder-text-soft)] disabled:cursor-not-allowed disabled:opacity-40",
                    children: /* @__PURE__ */ jsx7(ArrowUp, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx7(
                  "button",
                  {
                    type: "button",
                    disabled: index === fields.length - 1,
                    onClick: () => emit(
                      movePhotonArrayItem(fields, index, index + 1)
                    ),
                    className: "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[color:var(--photon-builder-border)] text-[color:var(--photon-builder-text-soft)] disabled:cursor-not-allowed disabled:opacity-40",
                    children: /* @__PURE__ */ jsx7(ArrowDown, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx7(
                  "button",
                  {
                    type: "button",
                    disabled: field.locked || field.removable === false,
                    onClick: () => emit(
                      fields.filter((_, fieldIndex) => fieldIndex !== index)
                    ),
                    className: "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[color:var(--photon-builder-border)] text-[color:var(--photon-builder-text-soft)] disabled:cursor-not-allowed disabled:opacity-40",
                    children: /* @__PURE__ */ jsx7(Trash2, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] }),
            isExpanded ? /* @__PURE__ */ jsxs3("div", { className: "mt-4 grid gap-3", children: [
              /* @__PURE__ */ jsxs3("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxs3("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--photon-builder-text)]", children: [
                  "Label",
                  /* @__PURE__ */ jsx7(
                    "input",
                    {
                      value: field.label ?? "",
                      onFocus: () => onFocus(`${index}.label`),
                      onChange: (event) => emit(
                        updateField(fields, index, {
                          label: event.currentTarget.value
                        })
                      ),
                      className: inputClassName
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs3("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--photon-builder-text)]", children: [
                  "Type",
                  /* @__PURE__ */ jsx7(
                    "select",
                    {
                      value: field.type,
                      onFocus: () => onFocus(`${index}.type`),
                      onChange: (event) => emit(
                        updateField(fields, index, {
                          type: event.currentTarget.value
                        })
                      ),
                      className: inputClassName,
                      children: fieldTypes.map((item) => /* @__PURE__ */ jsx7("option", { value: item.value, children: item.label }, item.value))
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs3("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxs3("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--photon-builder-text)]", children: [
                  "Field id",
                  /* @__PURE__ */ jsx7(
                    "input",
                    {
                      value: field.id ?? "",
                      onFocus: () => onFocus(`${index}.id`),
                      onChange: (event) => emit(
                        updateField(fields, index, {
                          id: event.currentTarget.value
                        })
                      ),
                      className: inputClassName
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs3("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--photon-builder-text)]", children: [
                  "Input name",
                  /* @__PURE__ */ jsx7(
                    "input",
                    {
                      value: field.name ?? "",
                      onFocus: () => onFocus(`${index}.name`),
                      onChange: (event) => emit(
                        updateField(fields, index, {
                          name: event.currentTarget.value
                        })
                      ),
                      className: inputClassName
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs3("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--photon-builder-text)]", children: [
                "Placeholder",
                /* @__PURE__ */ jsx7(
                  "input",
                  {
                    value: field.placeholder ?? "",
                    onFocus: () => onFocus(`${index}.placeholder`),
                    onChange: (event) => emit(
                      updateField(fields, index, {
                        placeholder: event.currentTarget.value
                      })
                    ),
                    className: inputClassName
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs3("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--photon-builder-text)]", children: [
                "Help text",
                /* @__PURE__ */ jsx7(
                  "textarea",
                  {
                    rows: 3,
                    value: field.helpText ?? "",
                    onFocus: () => onFocus(`${index}.helpText`),
                    onChange: (event) => emit(
                      updateField(fields, index, {
                        helpText: event.currentTarget.value
                      })
                    ),
                    className: inputClassName
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs3("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxs3("label", { className: "grid gap-2 text-sm font-semibold text-[color:var(--photon-builder-text)]", children: [
                  "Width",
                  /* @__PURE__ */ jsx7(
                    "select",
                    {
                      value: field.width ?? "full",
                      onFocus: () => onFocus(`${index}.width`),
                      onChange: (event) => emit(
                        updateField(fields, index, {
                          width: event.currentTarget.value
                        })
                      ),
                      className: inputClassName,
                      children: widthOptions.map((item) => /* @__PURE__ */ jsx7("option", { value: item.value, children: item.label }, item.value))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx7("div", { className: "grid grid-cols-2 gap-2 pt-7", children: [
                  ["required", "Required"],
                  ["disabled", "Disabled"]
                ].map(([key, label]) => /* @__PURE__ */ jsxs3(
                  "label",
                  {
                    className: "flex items-center gap-2 text-xs font-semibold text-[color:var(--photon-builder-text-soft)]",
                    children: [
                      /* @__PURE__ */ jsx7(
                        "input",
                        {
                          type: "checkbox",
                          checked: Boolean(
                            field[key]
                          ),
                          onChange: (event) => emit(
                            updateField(fields, index, {
                              [key]: event.currentTarget.checked
                            })
                          )
                        }
                      ),
                      label
                    ]
                  },
                  key
                )) })
              ] }),
              field.type === "select" ? /* @__PURE__ */ jsxs3("div", { className: "rounded-[16px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-3", children: [
                /* @__PURE__ */ jsx7("div", { className: "mb-3 text-sm font-semibold text-[color:var(--photon-builder-text)]", children: "Options" }),
                /* @__PURE__ */ jsx7("div", { className: "grid gap-2", children: options.map((option, optionIndex) => /* @__PURE__ */ jsxs3(
                  "div",
                  {
                    className: "grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]",
                    children: [
                      /* @__PURE__ */ jsx7(
                        "input",
                        {
                          value: option.label,
                          onFocus: () => onFocus(`${index}.options.${optionIndex}.label`),
                          onChange: (event) => emit(
                            updateField(
                              fields,
                              index,
                              updateOption(field, optionIndex, {
                                label: event.currentTarget.value
                              })
                            )
                          ),
                          className: inputClassName,
                          placeholder: "Label"
                        }
                      ),
                      /* @__PURE__ */ jsx7(
                        "input",
                        {
                          value: option.value,
                          onFocus: () => onFocus(`${index}.options.${optionIndex}.value`),
                          onChange: (event) => emit(
                            updateField(
                              fields,
                              index,
                              updateOption(field, optionIndex, {
                                value: event.currentTarget.value
                              })
                            )
                          ),
                          className: inputClassName,
                          placeholder: "Value"
                        }
                      ),
                      /* @__PURE__ */ jsx7(
                        "button",
                        {
                          type: "button",
                          onClick: () => emit(
                            updateField(fields, index, {
                              options: options.filter(
                                (_, currentIndex) => currentIndex !== optionIndex
                              )
                            })
                          ),
                          className: "inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--photon-builder-border)] text-[color:var(--photon-builder-text-soft)]",
                          children: /* @__PURE__ */ jsx7(Trash2, { className: "h-4 w-4" })
                        }
                      )
                    ]
                  },
                  optionIndex
                )) }),
                /* @__PURE__ */ jsxs3(
                  "button",
                  {
                    type: "button",
                    onClick: () => emit(
                      updateField(fields, index, {
                        options: [...options, createOption()]
                      })
                    ),
                    className: "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[18px] border border-[color:var(--photon-builder-border)] px-4 py-3 text-sm font-semibold text-[color:var(--photon-builder-text)]",
                    children: [
                      /* @__PURE__ */ jsx7(Plus, { className: "h-4 w-4" }),
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
    /* @__PURE__ */ jsxs3(
      "button",
      {
        type: "button",
        onClick: () => {
          const nextField = createField();
          emit([...fields, nextField]);
          setExpandedFieldId(nextField.id);
        },
        className: "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[20px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] px-4 py-3 text-sm font-semibold text-[color:var(--photon-builder-text)] transition hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-panel-solid)]",
        children: [
          /* @__PURE__ */ jsx7(Plus, { className: "h-4 w-4" }),
          " Add field"
        ]
      }
    )
  ] });
};

// src/studio/inspector-panel/gallery-field-editor.tsx
import clsx3 from "clsx";
import { useState as useState2 } from "react";
import { toast } from "sonner";
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
var GalleryFieldEditor = ({
  blockId,
  path,
  documentId,
  value,
  onFocus,
  onApply,
  onUpload
}) => {
  const [isUploading, setIsUploading] = useState2(false);
  const items = Array.isArray(value) ? value : [];
  const updateItems = (nextItems) => {
    onApply(nextItems);
  };
  return /* @__PURE__ */ jsxs4("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx8("div", { className: "space-y-3", children: items.map((item, index) => /* @__PURE__ */ jsx8(
      "div",
      {
        className: "rounded-[24px] border p-3",
        style: {
          borderColor: "var(--photon-builder-border)",
          background: "linear-gradient(180deg, var(--photon-builder-panel-solid), var(--photon-builder-panel))",
          boxShadow: "var(--photon-builder-card-shadow)"
        },
        "data-testid": `photon-gallery-field-editor-item-${path}-${index}`,
        children: /* @__PURE__ */ jsxs4("div", { className: "grid gap-3 sm:grid-cols-[80px_minmax(0,1fr)]", children: [
          /* @__PURE__ */ jsx8(
            "div",
            {
              className: "overflow-hidden rounded-2xl border",
              style: {
                borderColor: "var(--photon-builder-border)",
                background: "var(--photon-builder-field)"
              },
              children: resolvePhotonMediaPreviewUrl(item.media) ? /* @__PURE__ */ jsx8(
                "img",
                {
                  src: resolvePhotonMediaPreviewUrl(item.media),
                  alt: item.alt ?? `Gallery item ${index + 1}`,
                  className: "aspect-square h-full w-full object-cover"
                }
              ) : /* @__PURE__ */ jsx8(
                "div",
                {
                  className: "flex aspect-square items-center justify-center text-xs uppercase tracking-[0.22em]",
                  style: { color: "var(--photon-builder-text-muted)" },
                  children: "Media"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs4("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs4("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx8(
                "div",
                {
                  className: "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    background: "var(--photon-builder-field)",
                    color: "var(--photon-builder-text-soft)"
                  },
                  children: `item ${index + 1}`
                }
              ),
              isPhotonMediaValue(item.media) && item.media.temporaryUploadId ? /* @__PURE__ */ jsx8(
                "div",
                {
                  className: "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
                  style: {
                    borderColor: "var(--photon-builder-border-strong)",
                    background: "var(--photon-builder-accent-strong)",
                    color: "var(--photon-builder-accent)"
                  },
                  children: "staged"
                }
              ) : null
            ] }),
            /* @__PURE__ */ jsx8(
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
            /* @__PURE__ */ jsx8(
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
            /* @__PURE__ */ jsxs4("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx8(
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
                    borderColor: "var(--photon-builder-border)",
                    background: "var(--photon-builder-field)",
                    color: "var(--photon-builder-text-soft)"
                  },
                  children: "Prev"
                }
              ),
              /* @__PURE__ */ jsx8(
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
                    borderColor: "var(--photon-builder-border)",
                    background: "var(--photon-builder-field)",
                    color: "var(--photon-builder-text-soft)"
                  },
                  children: "Next"
                }
              ),
              /* @__PURE__ */ jsx8(
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
                    borderColor: "var(--photon-builder-border-strong)",
                    background: "var(--photon-builder-accent-strong)",
                    color: "var(--photon-builder-accent)"
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
    /* @__PURE__ */ jsxs4(
      "label",
      {
        className: "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition",
        style: {
          borderColor: "var(--photon-builder-border-strong)",
          background: "var(--photon-builder-accent-strong)",
          color: "var(--photon-builder-accent)"
        },
        children: [
          /* @__PURE__ */ jsx8("span", { children: isUploading ? "Uploading..." : items.length > 0 ? "Add more media" : "Add media" }),
          /* @__PURE__ */ jsx8(
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
                    id: createPhotonNodeId(),
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
import { useState as useState3 } from "react";
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
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
var ImageFieldEditor = ({
  blockId,
  path,
  documentId,
  value,
  onFocus,
  onApply,
  onUpload
}) => {
  const [isUploading, setIsUploading] = useState3(false);
  const source = resolvePhotonMediaPreviewUrl(value);
  const mediaValue = isPhotonMediaValue(value) ? value : null;
  return /* @__PURE__ */ jsxs5("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx9(
      "div",
      {
        className: "overflow-hidden rounded-[24px] border",
        style: {
          borderColor: "var(--photon-builder-border)",
          background: "linear-gradient(180deg, var(--photon-builder-panel-solid), var(--photon-builder-panel))",
          boxShadow: "var(--photon-builder-card-shadow)"
        },
        "data-testid": `photon-image-field-editor-preview-${path}`,
        children: source ? /* @__PURE__ */ jsx9(
          "img",
          {
            src: source,
            alt: "Inspector media preview",
            className: "aspect-[4/3] w-full object-cover"
          }
        ) : /* @__PURE__ */ jsx9(
          "div",
          {
            className: "flex aspect-[4/3] items-center justify-center px-6 text-center text-sm",
            style: { color: "var(--photon-builder-text-muted)" },
            children: "Upload an image or paste a remote source URL."
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs5("div", { className: "flex flex-wrap gap-2", children: [
      mediaValue?.temporaryUploadId ? /* @__PURE__ */ jsx9(
        "div",
        {
          className: "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
          style: {
            borderColor: "var(--photon-builder-border-strong)",
            background: "var(--photon-builder-accent-strong)",
            color: "var(--photon-builder-accent)"
          },
          children: "staged upload"
        }
      ) : null,
      mediaValue?.fileName ? /* @__PURE__ */ jsx9(
        "div",
        {
          className: "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
          style: {
            borderColor: "var(--photon-builder-border)",
            background: "var(--photon-builder-field)",
            color: "var(--photon-builder-text-soft)"
          },
          children: mediaValue.fileName
        }
      ) : null,
      mediaValue?.size ? /* @__PURE__ */ jsx9(
        "div",
        {
          className: "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
          style: {
            borderColor: "var(--photon-builder-border)",
            background: "var(--photon-builder-field)",
            color: "var(--photon-builder-text-soft)"
          },
          children: formatMediaFileSize(mediaValue.size) ?? "remote"
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsx9(
      "input",
      {
        type: "text",
        value: resolvePhotonMediaUrl(value),
        onFocus,
        onChange: (event) => onApply(
          updatePhotonMediaUrl(value, event.currentTarget.value)
        ),
        className: inputClassName
      }
    ),
    /* @__PURE__ */ jsxs5("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxs5(
        "label",
        {
          className: "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition",
          style: {
            borderColor: "var(--photon-builder-border-strong)",
            background: "var(--photon-builder-accent-strong)",
            color: "var(--photon-builder-accent)"
          },
          children: [
            /* @__PURE__ */ jsx9("span", { children: isUploading ? "Uploading..." : source ? "Replace media" : "Upload media" }),
            /* @__PURE__ */ jsx9(
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
      /* @__PURE__ */ jsx9(
        "button",
        {
          type: "button",
          onClick: () => onApply(""),
          className: "rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition",
          style: {
            borderColor: "var(--photon-builder-border)",
            background: "var(--photon-builder-field)",
            color: "var(--photon-builder-text-soft)"
          },
          children: "Clear"
        }
      )
    ] })
  ] });
};

// src/studio/inspector-panel/json-field-editor.tsx
import { WandSparkles } from "lucide-react";
import { useEffect, useState as useState4 } from "react";
import { jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
var JsonFieldEditor = ({
  blockId,
  path,
  initialValue,
  onApply,
  onFocus
}) => {
  const [draft, setDraft] = useState4(JSON.stringify(initialValue, null, 2));
  const [error, setError] = useState4(null);
  const testIdSuffix = path.replace(/[^a-zA-Z0-9_-]+/g, "-");
  useEffect(() => {
    setDraft(JSON.stringify(initialValue, null, 2));
    setError(null);
  }, [blockId, path, initialValue]);
  return /* @__PURE__ */ jsxs6("div", { "data-testid": `photon-json-field-editor-${testIdSuffix}`, children: [
    /* @__PURE__ */ jsx10(
      "textarea",
      {
        "data-testid": `photon-json-field-editor-input-${testIdSuffix}`,
        rows: 7,
        value: draft,
        onFocus,
        onChange: (event) => {
          setDraft(event.currentTarget.value);
          setError(null);
        },
        className: "w-full rounded-2xl border px-4 py-3 font-mono text-xs leading-6 outline-none transition",
        style: {
          borderColor: "var(--photon-builder-border)",
          background: "var(--photon-builder-field)",
          color: "var(--photon-builder-text)"
        }
      }
    ),
    /* @__PURE__ */ jsxs6("div", { className: "mt-3 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs6(
        "button",
        {
          "data-testid": `photon-json-field-editor-apply-${testIdSuffix}`,
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
            borderColor: "var(--photon-builder-border-strong)",
            background: "var(--photon-builder-accent-strong)",
            color: "var(--photon-builder-accent)"
          },
          children: [
            /* @__PURE__ */ jsx10(WandSparkles, { className: "h-3.5 w-3.5" }),
            "Apply JSON"
          ]
        }
      ),
      error ? /* @__PURE__ */ jsx10(
        "div",
        {
          className: "text-xs",
          style: { color: "var(--photon-builder-accent)" },
          children: error
        }
      ) : null
    ] })
  ] });
};

// src/studio/inspector-panel/field-editor.tsx
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
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
    return clonePhotonValue(field.defaultValue);
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
  const { translate } = usePhotonI18n();
  const [hasMounted, setHasMounted] = useState5(false);
  const selectedValue = String(value ?? "");
  const activeOption = (field.options ?? []).find((option) => option.value === selectedValue) ?? null;
  const trigger = /* @__PURE__ */ jsxs7(
    "button",
    {
      type: "button",
      onFocus: () => onFocus(),
      className: "inline-flex h-auto w-full min-w-0 cursor-pointer items-center justify-between gap-3 rounded-[20px] border px-4 py-3 text-left text-sm font-semibold shadow-none transition-[border-color,background-color] border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)] text-[color:var(--photon-builder-text)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-panel-solid)] focus-visible:border-[color:var(--photon-builder-border-strong)] focus-visible:bg-[color:var(--photon-builder-panel-solid)]",
      children: [
        /* @__PURE__ */ jsx11("span", { className: "min-w-0 truncate", children: translate(
          activeOption?.labelKey ?? activeOption?.label ?? "Select value",
          activeOption?.label ?? "Select value"
        ) }),
        /* @__PURE__ */ jsx11(ChevronDown, { className: "h-4 w-4 shrink-0 text-[color:var(--photon-builder-text-soft)]" })
      ]
    }
  );
  useEffect2(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return trigger;
  }
  return /* @__PURE__ */ jsxs7(Root2, { modal: false, children: [
    /* @__PURE__ */ jsx11(Trigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsx11(DropdownMenuContent, { align: "start", className: "min-w-[14rem]", children: /* @__PURE__ */ jsx11(
      RadioGroup,
      {
        value: selectedValue,
        onValueChange: (nextValue) => onChange(nextValue),
        children: (field.options ?? []).map((option) => /* @__PURE__ */ jsx11(
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
  return /* @__PURE__ */ jsx11("div", { className: "space-y-3 rounded-[20px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-3", children: (field.fields ?? []).map((childField, index) => {
    const childPath = childField.path ?? "";
    const childAbsolutePath = joinFieldPath(absolutePath ?? "", childPath);
    const childValue = childPath ? getValueAtPath(objectValue, childPath) : objectValue;
    return /* @__PURE__ */ jsx11(
      "div",
      {
        className: "rounded-[18px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)] p-3",
        children: /* @__PURE__ */ jsx11(
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
  const { translate } = usePhotonI18n();
  const items = normalizeArrayValue(value);
  const itemField = field.itemField;
  const updateItems = (nextItems) => {
    onChange(nextItems);
  };
  const addItem = () => {
    const defaultItem = field.defaultItem !== void 0 ? clonePhotonValue(field.defaultItem) : itemField ? createDefaultFieldValue(itemField) : createDefaultFieldValue({
      kind: "object",
      fields: field.fields
    });
    updateItems([...items, defaultItem]);
  };
  return /* @__PURE__ */ jsxs7("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx11("div", { className: "space-y-3 rounded-[20px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-3", children: items.map((item, index) => {
      const itemAbsolutePath = joinFieldPath(
        absolutePath ?? "",
        String(index)
      );
      const itemLabelSource = field.itemLabelPath && item && typeof item === "object" ? getValueAtPath(
        item,
        field.itemLabelPath
      ) : null;
      const itemLabel = typeof itemLabelSource === "string" && itemLabelSource.trim() !== "" ? itemLabelSource : translate(
        field.itemLabelKey ?? field.itemLabel ?? "Item",
        field.itemLabel ?? "Item"
      );
      return /* @__PURE__ */ jsxs7(
        "div",
        {
          className: "rounded-[18px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)] p-3",
          children: [
            /* @__PURE__ */ jsxs7("div", { className: "mb-3 flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsx11("div", { className: "min-w-0", children: /* @__PURE__ */ jsx11(
                "div",
                {
                  className: "truncate text-sm font-semibold",
                  style: { color: "var(--photon-builder-text)" },
                  children: itemLabel
                }
              ) }),
              /* @__PURE__ */ jsxs7("div", { className: "flex shrink-0 items-center gap-1", children: [
                /* @__PURE__ */ jsx11(
                  "button",
                  {
                    type: "button",
                    disabled: index === 0,
                    onClick: () => updateItems(
                      movePhotonArrayItem(items, index, index - 1)
                    ),
                    className: "inline-flex cursor-pointer items-center justify-center rounded-full border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-2 text-[color:var(--photon-builder-text-soft)] transition hover:border-[color:var(--photon-builder-border-strong)] hover:text-[color:var(--photon-builder-text)] disabled:cursor-not-allowed disabled:opacity-40",
                    "aria-label": `Move ${itemLabel} up`,
                    children: /* @__PURE__ */ jsx11(ArrowUp2, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx11(
                  "button",
                  {
                    type: "button",
                    disabled: index === items.length - 1,
                    onClick: () => updateItems(
                      movePhotonArrayItem(items, index, index + 1)
                    ),
                    className: "inline-flex cursor-pointer items-center justify-center rounded-full border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-2 text-[color:var(--photon-builder-text-soft)] transition hover:border-[color:var(--photon-builder-border-strong)] hover:text-[color:var(--photon-builder-text)] disabled:cursor-not-allowed disabled:opacity-40",
                    "aria-label": `Move ${itemLabel} down`,
                    children: /* @__PURE__ */ jsx11(ArrowDown2, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx11(
                  "button",
                  {
                    type: "button",
                    onClick: () => updateItems(
                      items.filter((_, itemIndex) => itemIndex !== index)
                    ),
                    className: "inline-flex cursor-pointer items-center justify-center rounded-full border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-2 text-[color:var(--photon-builder-text-soft)] transition hover:border-[color:var(--photon-builder-border-strong)] hover:text-[color:var(--photon-builder-text)]",
                    "aria-label": `Remove ${itemLabel}`,
                    children: /* @__PURE__ */ jsx11(Trash22, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] }),
            itemField ? /* @__PURE__ */ jsx11(
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
            ) : /* @__PURE__ */ jsx11("div", { className: "space-y-3", children: (field.fields ?? []).map((childField, childIndex) => {
              const itemObject = normalizeObjectValue(item);
              const childPath = childField.path ?? "";
              const childAbsolutePath = joinFieldPath(
                itemAbsolutePath,
                childPath
              );
              const childValue = childPath ? getValueAtPath(itemObject, childPath) : itemObject;
              return /* @__PURE__ */ jsx11(
                "div",
                {
                  className: "rounded-[16px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-3",
                  children: /* @__PURE__ */ jsx11(
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
                            (currentItem, itemIndex) => itemIndex === index ? setValueAtPath(
                              itemObject,
                              childPath,
                              nextValue
                            ) : currentItem
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
    /* @__PURE__ */ jsxs7(
      "button",
      {
        type: "button",
        onClick: addItem,
        className: "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[20px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] px-4 py-3 text-sm font-semibold text-[color:var(--photon-builder-text)] transition hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-panel-solid)]",
        children: [
          /* @__PURE__ */ jsx11(Plus2, { className: "h-4 w-4" }),
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
  const documentId = usePhotonStore((state) => state.document.id);
  const uploadMedia = usePhotonStore((state) => state.uploadMedia);
  const { translate } = usePhotonI18n();
  const path = absolutePath ?? field.path ?? "";
  return /* @__PURE__ */ jsxs7("div", { children: [
    /* @__PURE__ */ jsxs7("div", { className: "mb-2 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx11(
        "div",
        {
          className: "text-sm font-semibold",
          style: { color: "var(--photon-builder-text)" },
          children: translate(
            field.labelKey ?? field.label ?? "Field",
            field.label ?? "Field"
          )
        }
      ),
      path && !hidePathLabel ? /* @__PURE__ */ jsx11(
        "button",
        {
          type: "button",
          onClick: () => onFocus(path),
          className: "cursor-pointer font-mono text-[10px] uppercase tracking-[0.24em] transition",
          style: { color: "var(--photon-builder-text-ghost)" },
          children: path
        }
      ) : null
    ] }),
    field.description ? /* @__PURE__ */ jsx11(
      "div",
      {
        className: "mb-2 text-xs leading-5",
        style: { color: "var(--photon-builder-text-soft)" },
        children: translate(
          field.descriptionKey ?? field.description ?? "",
          field.description
        )
      }
    ) : null,
    field.kind === "textarea" ? /* @__PURE__ */ jsx11(
      "textarea",
      {
        rows: 5,
        value: String(value ?? ""),
        onFocus: () => onFocus(path),
        onChange: (event) => onChange(event.currentTarget.value),
        className: inputClassName
      }
    ) : null,
    field.kind === "rich-text" ? /* @__PURE__ */ jsx11(
      PhotonRichTextEditor,
      {
        value: String(value ?? ""),
        onFocus: () => onFocus(path),
        onChange,
        className: "text-sm text-[color:var(--photon-builder-text)]",
        surfaceClassName: "border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)]"
      }
    ) : null,
    field.kind === "json" ? /* @__PURE__ */ jsx11(
      JsonFieldEditor,
      {
        blockId,
        path,
        initialValue: value,
        onFocus: () => onFocus(path),
        onApply: onChange
      }
    ) : null,
    field.kind === "object" ? /* @__PURE__ */ jsx11(
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
    field.kind === "repeater" ? /* @__PURE__ */ jsx11(
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
    field.kind === "form-fields" ? /* @__PURE__ */ jsx11(
      PhotonFormFieldsEditor,
      {
        value,
        onChange,
        onFocus: (path2) => onFocus(joinFieldPath(absolutePath ?? "", path2)),
        absolutePath: path
      }
    ) : null,
    field.kind === "select" ? /* @__PURE__ */ jsx11(
      SelectFieldEditor,
      {
        field,
        value,
        onChange,
        onFocus
      }
    ) : null,
    field.kind === "toggle" ? /* @__PURE__ */ jsxs7("label", { className: "inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)] px-4 py-3 text-sm text-[color:var(--photon-builder-text)]", children: [
      /* @__PURE__ */ jsx11(
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
    field.kind === "tags" ? /* @__PURE__ */ jsx11(
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
    field.kind === "image" ? /* @__PURE__ */ jsx11(
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
    field.kind === "gallery" ? /* @__PURE__ */ jsx11(
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
    ["text", "url", "color"].includes(field.kind) ? /* @__PURE__ */ jsx11(
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
    field.kind === "number" ? /* @__PURE__ */ jsx11(
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

// src/components/photon-field-editor-list.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var fieldEditorTestId = (subjectId, path) => `photon-field-editor-${subjectId}-${path}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
var PhotonFieldEditorList = ({
  fields,
  subjectId,
  getValue,
  onChange,
  onFocus
}) => {
  return /* @__PURE__ */ jsx12("div", { className: "space-y-4", children: fields.map((field) => /* @__PURE__ */ jsx12(
    "div",
    {
      "data-testid": fieldEditorTestId(subjectId, field.path),
      children: /* @__PURE__ */ jsx12(
        FieldEditor,
        {
          field,
          blockId: subjectId,
          value: getValue(field.path),
          onFocus: () => onFocus(field.path),
          onChange: (value) => onChange(field.path, value)
        }
      )
    },
    field.path
  )) });
};

// src/studio/photon-studio/photon-studio-inner.tsx
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
  useEffect as useEffect18,
  useRef as useRef5,
  useState as useState23
} from "react";
import { createPortal } from "react-dom";

// src/studio/canvas/block-overlay-card.tsx
import { jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
var BlockOverlayCard = ({ block }) => {
  return /* @__PURE__ */ jsxs8(
    "div",
    {
      className: "rounded-[24px] border px-4 py-4 text-sm backdrop-blur-xl",
      style: {
        borderColor: "var(--photon-builder-border-strong)",
        background: "var(--photon-builder-card-highlight), linear-gradient(180deg, var(--photon-builder-panel-solid), var(--photon-builder-panel))",
        color: "var(--photon-builder-text)",
        boxShadow: "var(--photon-builder-shadow)"
      },
      children: [
        /* @__PURE__ */ jsx13(
          "div",
          {
            className: "text-[11px] uppercase tracking-[0.28em]",
            style: { color: "var(--photon-builder-text-soft)" },
            children: block.module
          }
        ),
        /* @__PURE__ */ jsx13("div", { className: "mt-2 font-semibold", children: block.type }),
        /* @__PURE__ */ jsx13("div", { className: "mt-1", style: { color: "var(--photon-builder-text-muted)" }, children: "Move block into any visible insert zone." })
      ]
    }
  );
};

// src/studio/canvas/canvas-block-item.tsx
import { Fragment as Fragment2, memo as memo2 } from "react";

// src/studio/canvas/canvas-block-interactions.tsx
import clsx5 from "clsx";
import { ChevronDown as ChevronDown2, ChevronRight, ExternalLink } from "lucide-react";
import { useMemo, useState as useState6 } from "react";
import { jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
var interactionSettingPath = (suffix) => `${PHOTON_INTERACTIONS_SITE_SETTING_KEY}.${suffix}`;
var getDefinitionFields = (request) => (request?.definition.fields ?? []).map((field) => ({
  ...field,
  path: field.path.replace(/^props\./u, "")
}));
var resolveActionLabel = (action) => {
  if (!action) {
    return "No action";
  }
  switch (action.type) {
    case "surface":
      return action.intent ?? action.surfaceInstanceId ?? "Surface action";
    case "toast":
      return action.templateId;
    case "link":
      return action.href;
    default:
      return "Action";
  }
};
var SlotRow = ({
  slot
}) => {
  const [open, setOpen] = useState6(false);
  const site = usePhotonStore((state) => state.site);
  const interactionSurfaces = usePhotonStore(
    (state) => state.interactionSurfaces
  );
  const interactionActions = usePhotonStore(
    (state) => state.interactionActions
  );
  const interactionGuards = usePhotonStore(
    (state) => state.interactionGuards
  );
  const interactionSurfaceRenderers = usePhotonStore(
    (state) => state.interactionSurfaceRenderers
  );
  const executeInteractionTriggerSlot = usePhotonStore(
    (state) => state.executeInteractionTriggerSlot
  );
  const updateSiteSettingValue = usePhotonStore(
    (state) => state.updateSiteSettingValue
  );
  const surfaceCatalog = useMemo(
    () => resolvePhotonInteractionSurfaceCatalog({
      definitions: interactionSurfaces,
      siteSettings: site.settings
    }),
    [interactionSurfaces, site.settings]
  );
  const actionCatalog = useMemo(
    () => resolvePhotonInteractionActionCatalog({
      actions: interactionActions,
      guards: interactionGuards,
      surfaces: interactionSurfaces,
      siteSettings: site.settings
    }),
    [interactionActions, interactionGuards, interactionSurfaces, site.settings]
  );
  const action = resolvePhotonInteractionSlotAction(slot, actionCatalog);
  const guards = resolvePhotonInteractionSlotGuards(slot, actionCatalog);
  const surfaceRequest = action?.type === "surface" ? resolvePhotonInteractionSurfaceRequest(action, surfaceCatalog) : null;
  const fields = getDefinitionFields(surfaceRequest);
  const interactionSettings = readPhotonInteractionSettings(site.settings);
  const currentBinding = interactionSettings.triggerBindings?.[slot.id] ?? {
    slotId: slot.id,
    actionInstanceId: slot.actionInstanceId,
    guardInstanceIds: slot.guardInstanceIds
  };
  const actionInstanceOptions = Object.values(actionCatalog.actionInstances).filter((instance) => instance.enabled !== false).filter(
    (instance) => !slot.allowedActionDefinitionIds?.length || slot.allowedActionDefinitionIds.includes(instance.definitionId)
  ).sort((left, right) => left.label.localeCompare(right.label));
  const guardInstanceOptions = Object.values(actionCatalog.guardInstances).filter((instance) => instance.enabled !== false).filter(
    (instance) => !slot.allowedGuardDefinitionIds?.length || slot.allowedGuardDefinitionIds.includes(instance.definitionId)
  ).sort((left, right) => left.label.localeCompare(right.label));
  const [selectedScenarioId, setSelectedScenarioId] = useState6(
    slot.previewScenarios?.[0]?.id ?? null
  );
  const [lastExecutionResult, setLastExecutionResult] = useState6(null);
  const selectedScenario = slot.previewScenarios?.find((scenario) => scenario.id === selectedScenarioId) ?? null;
  const persistTriggerBinding = (nextBinding) => {
    updateSiteSettingValue(interactionSettingPath("triggerBindings"), {
      ...interactionSettings.triggerBindings ?? {},
      [slot.id]: nextBinding
    });
  };
  const persistTriggerOverride = (path, value) => {
    persistTriggerBinding({
      ...currentBinding,
      slotId: slot.id,
      overrides: setValueAtPath(
        currentBinding.overrides ?? {},
        path,
        value
      )
    });
  };
  const preview = () => {
    setLastExecutionResult(
      executeInteractionTriggerSlot(slot, {
        scenarioId: selectedScenarioId,
        scenario: selectedScenario
      })
    );
  };
  const SurfaceRenderer = surfaceRequest ? interactionSurfaceRenderers[surfaceRequest.definition.rendererKey] : void 0;
  return /* @__PURE__ */ jsxs9(
    "section",
    {
      className: "rounded-[20px] border",
      style: {
        borderColor: "var(--photon-builder-border)",
        background: "var(--photon-builder-field)"
      },
      "data-testid": `photon-interaction-slot-${slot.id}`,
      children: [
        /* @__PURE__ */ jsxs9(
          "button",
          {
            type: "button",
            onClick: (event) => {
              event.stopPropagation();
              setOpen((value) => !value);
            },
            className: "flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left",
            children: [
              /* @__PURE__ */ jsxs9("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx14(
                  "div",
                  {
                    className: "text-sm font-semibold",
                    style: { color: "var(--photon-builder-text)" },
                    children: slot.label
                  }
                ),
                /* @__PURE__ */ jsxs9(
                  "div",
                  {
                    className: "mt-1 truncate font-mono text-[10px] uppercase tracking-[0.18em]",
                    style: { color: "var(--photon-builder-text-ghost)" },
                    children: [
                      resolveActionLabel(action),
                      guards.length ? ` \xB7 ${guards.length} guard` : ""
                    ]
                  }
                )
              ] }),
              open ? /* @__PURE__ */ jsx14(
                ChevronDown2,
                {
                  className: "h-4 w-4 shrink-0",
                  style: { color: "var(--photon-builder-text-soft)" }
                }
              ) : /* @__PURE__ */ jsx14(
                ChevronRight,
                {
                  className: "h-4 w-4 shrink-0",
                  style: { color: "var(--photon-builder-text-soft)" }
                }
              )
            ]
          }
        ),
        open ? /* @__PURE__ */ jsxs9(
          "div",
          {
            className: "space-y-4 border-t px-4 py-4",
            style: { borderColor: "var(--photon-builder-border)" },
            onClick: (event) => event.stopPropagation(),
            children: [
              slot.description ? /* @__PURE__ */ jsx14(
                "p",
                {
                  className: "text-xs leading-5",
                  style: { color: "var(--photon-builder-text-muted)" },
                  children: slot.description
                }
              ) : null,
              actionInstanceOptions.length ? /* @__PURE__ */ jsxs9("label", { className: "grid gap-2 text-xs font-semibold", children: [
                "Action",
                /* @__PURE__ */ jsxs9(
                  "select",
                  {
                    value: currentBinding.actionInstanceId ?? slot.actionInstanceId ?? "",
                    onChange: (event) => persistTriggerBinding({
                      ...currentBinding,
                      slotId: slot.id,
                      actionInstanceId: event.currentTarget.value || void 0
                    }),
                    className: "h-10 rounded-[14px] border px-3 text-sm outline-none",
                    style: {
                      borderColor: "var(--photon-builder-border)",
                      background: "var(--photon-builder-panel-solid)",
                      color: "var(--photon-builder-text)"
                    },
                    children: [
                      /* @__PURE__ */ jsx14("option", { value: "", children: "Default action" }),
                      actionInstanceOptions.map((instance) => /* @__PURE__ */ jsx14("option", { value: instance.id, children: instance.label }, instance.id))
                    ]
                  }
                )
              ] }) : null,
              slot.previewScenarios?.length ? /* @__PURE__ */ jsx14("div", { className: "flex flex-wrap gap-2", children: slot.previewScenarios.map((scenario) => /* @__PURE__ */ jsx14(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedScenarioId(scenario.id),
                  className: "cursor-pointer rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
                  style: {
                    borderColor: selectedScenarioId === scenario.id ? "var(--photon-builder-border-strong)" : "var(--photon-builder-border)",
                    background: selectedScenarioId === scenario.id ? "var(--photon-builder-accent-soft)" : "transparent",
                    color: selectedScenarioId === scenario.id ? "var(--photon-builder-accent-text)" : "var(--photon-builder-text-soft)"
                  },
                  children: scenario.label
                },
                scenario.id
              )) }) : null,
              guards.length ? /* @__PURE__ */ jsxs9("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx14(
                  "div",
                  {
                    className: "text-[10px] uppercase tracking-[0.22em]",
                    style: { color: "var(--photon-builder-text-soft)" },
                    children: "Guards"
                  }
                ),
                guards.map((guard) => /* @__PURE__ */ jsx14(
                  "div",
                  {
                    className: "rounded-2xl border px-3 py-2 text-xs",
                    style: {
                      borderColor: "var(--photon-builder-border)",
                      color: "var(--photon-builder-text-muted)"
                    },
                    children: guard.label
                  },
                  guard.id
                ))
              ] }) : null,
              guardInstanceOptions.length ? /* @__PURE__ */ jsxs9("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx14(
                  "div",
                  {
                    className: "text-[10px] uppercase tracking-[0.22em]",
                    style: { color: "var(--photon-builder-text-soft)" },
                    children: "Guard chain"
                  }
                ),
                /* @__PURE__ */ jsx14("div", { className: "grid gap-2", children: guardInstanceOptions.map((guard) => {
                  const selectedGuardIds = currentBinding.guardInstanceIds ?? slot.guardInstanceIds ?? [];
                  const checked = selectedGuardIds.includes(guard.id);
                  return /* @__PURE__ */ jsxs9(
                    "label",
                    {
                      className: "flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs",
                      style: {
                        borderColor: "var(--photon-builder-border)",
                        color: "var(--photon-builder-text-muted)"
                      },
                      children: [
                        /* @__PURE__ */ jsx14(
                          "input",
                          {
                            type: "checkbox",
                            checked,
                            onChange: (event) => {
                              const nextIds = event.currentTarget.checked ? [...selectedGuardIds, guard.id] : selectedGuardIds.filter((id) => id !== guard.id);
                              persistTriggerBinding({
                                ...currentBinding,
                                slotId: slot.id,
                                guardInstanceIds: nextIds
                              });
                            }
                          }
                        ),
                        guard.label
                      ]
                    },
                    guard.id
                  );
                }) })
              ] }) : null,
              /* @__PURE__ */ jsxs9(
                "button",
                {
                  type: "button",
                  onClick: preview,
                  disabled: !action,
                  className: clsx5(
                    "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold disabled:pointer-events-none disabled:opacity-50"
                  ),
                  style: {
                    borderColor: "var(--photon-builder-border-strong)",
                    background: "var(--photon-builder-accent-soft)",
                    color: "var(--photon-builder-accent-text)"
                  },
                  children: [
                    /* @__PURE__ */ jsx14(ExternalLink, { className: "h-3.5 w-3.5" }),
                    "Preview"
                  ]
                }
              ),
              lastExecutionResult && lastExecutionResult.status !== "executed" ? /* @__PURE__ */ jsxs9(
                "div",
                {
                  className: "mt-2 rounded-2xl border px-3 py-2 text-xs leading-5",
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    background: "var(--photon-builder-panel-solid)",
                    color: "var(--photon-builder-text-muted)"
                  },
                  children: [
                    "Interaction result: ",
                    lastExecutionResult.status,
                    lastExecutionResult.reason ? ` (${lastExecutionResult.reason})` : ""
                  ]
                }
              ) : null,
              currentBinding.overrides && Object.keys(currentBinding.overrides).length ? /* @__PURE__ */ jsx14(
                "button",
                {
                  type: "button",
                  onClick: () => persistTriggerBinding({
                    ...currentBinding,
                    slotId: slot.id,
                    overrides: void 0
                  }),
                  className: "ml-2 inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold",
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    color: "var(--photon-builder-text-muted)"
                  },
                  children: "Reset overrides"
                }
              ) : null,
              surfaceRequest && fields.length ? /* @__PURE__ */ jsx14(
                PhotonFieldEditorList,
                {
                  fields,
                  subjectId: `interaction-slot:${slot.id}`,
                  getValue: (path) => getValueAtPath(surfaceRequest.props ?? {}, path),
                  onChange: persistTriggerOverride,
                  onFocus: () => void 0
                }
              ) : null,
              surfaceRequest && SurfaceRenderer ? /* @__PURE__ */ jsx14(
                "div",
                {
                  className: "overflow-hidden rounded-[22px] border p-3",
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    background: "var(--photon-builder-panel-solid)"
                  },
                  children: /* @__PURE__ */ jsx14(
                    SurfaceRenderer,
                    {
                      open: true,
                      onOpenChange: () => void 0,
                      request: surfaceRequest,
                      previewMode: "builder-inline",
                      previewScenarioId: selectedScenarioId ?? void 0
                    }
                  )
                }
              ) : null
            ]
          }
        ) : null
      ]
    }
  );
};
var CanvasBlockInteractions = ({
  block
}) => {
  const [open, setOpen] = useState6(false);
  const registry = usePhotonStore((state) => state.registry);
  const document2 = usePhotonStore((state) => state.document);
  const resources = usePhotonStore((state) => state.resources);
  const pageSettings = usePhotonStore((state) => state.pageSettings);
  const site = usePhotonStore((state) => state.site);
  const mode = usePhotonStore((state) => state.mode);
  const isAdmin = usePhotonStore((state) => state.isAdmin);
  const siteFrameExtensions = usePhotonStore(
    (state) => state.siteFrameExtensions
  );
  const definition = registry.getDefinition(block.module, block.type);
  const slots = resolvePhotonBlockInteractionSlots(definition, {
    block,
    document: document2,
    resources,
    pageSettings,
    site,
    mode,
    isAdmin,
    registry,
    siteFrameExtensions
  });
  if (!slots.length) {
    return null;
  }
  return /* @__PURE__ */ jsxs9(
    "div",
    {
      className: "mt-3 rounded-[24px] border p-3",
      style: {
        borderColor: "var(--photon-builder-border)",
        background: "var(--photon-builder-panel-muted)",
        color: "var(--photon-builder-text)"
      },
      "data-testid": `photon-block-interactions-${block.id}`,
      children: [
        /* @__PURE__ */ jsxs9(
          "button",
          {
            type: "button",
            onClick: (event) => {
              event.stopPropagation();
              setOpen((value) => !value);
            },
            className: "mb-0 flex w-full cursor-pointer items-center justify-between px-1 text-left text-[10px] font-semibold uppercase tracking-[0.24em]",
            style: { color: "var(--photon-builder-text-soft)" },
            children: [
              /* @__PURE__ */ jsx14("span", { children: "Interactions" }),
              /* @__PURE__ */ jsx14("span", { children: open ? "Hide" : `${slots.length} trigger${slots.length === 1 ? "" : "s"}` })
            ]
          }
        ),
        open ? /* @__PURE__ */ jsx14("div", { className: "mt-3 space-y-2", children: slots.map((slot) => /* @__PURE__ */ jsx14(SlotRow, { slot }, slot.id)) }) : null
      ]
    }
  );
};

// src/studio/canvas/canvas-block-shell.tsx
import { useDraggable } from "@dnd-kit/core";
import clsx6 from "clsx";
import {
  ChevronDown as ChevronDown3,
  ChevronUp,
  Copy,
  GripVertical,
  Trash2 as Trash23
} from "lucide-react";
import { memo, useEffect as useEffect3, useState as useState7 } from "react";
import { Fragment, jsx as jsx15, jsxs as jsxs10 } from "react/jsx-runtime";
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
  const [hasMounted, setHasMounted] = useState7(false);
  const chromeEnabled = builderEnabled || collapseControlsEnabled;
  const contentChromeOnly = collapseControlsEnabled && !builderEnabled;
  const edgeToEdgeChrome = chromeStyle === "edge-to-edge";
  useEffect3(() => {
    setHasMounted(true);
  }, []);
  const chromeBorderClassName = clsx6(
    "border transition",
    isSelected ? "border-[color:var(--photon-builder-border-strong)] shadow-[0_0_0_1px_var(--photon-builder-accent-strong)]" : "border-[color:var(--photon-builder-border)] group-hover:border-[color:var(--photon-builder-border-strong)]"
  );
  const chromeBadges = builderEnabled ? /* @__PURE__ */ jsxs10(Fragment, { children: [
    /* @__PURE__ */ jsx15(
      "div",
      {
        className: "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]",
        style: {
          borderColor: "var(--photon-builder-border)",
          background: "var(--photon-builder-panel-solid)",
          color: "var(--photon-builder-text-muted)"
        },
        children: blockLabel
      }
    ),
    /* @__PURE__ */ jsx15(
      "div",
      {
        className: "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]",
        style: {
          borderColor: "var(--photon-builder-border)",
          background: "var(--photon-builder-panel-solid)",
          color: "var(--photon-builder-text-ghost)"
        },
        children: blockModule
      }
    )
  ] }) : null;
  const chromeControls = chromeEnabled ? /* @__PURE__ */ jsxs10(Fragment, { children: [
    /* @__PURE__ */ jsx15(
      "button",
      {
        type: "button",
        onClick: (event) => {
          event.stopPropagation();
          onToggleCollapse();
        },
        className: "rounded-full border p-2 transition",
        style: {
          borderColor: "var(--photon-builder-border)",
          background: "var(--photon-builder-panel-solid)",
          color: "var(--photon-builder-text-muted)"
        },
        children: isCollapsed ? /* @__PURE__ */ jsx15(ChevronDown3, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx15(ChevronUp, { className: "h-4 w-4" })
      }
    ),
    builderEnabled ? /* @__PURE__ */ jsxs10(Fragment, { children: [
      /* @__PURE__ */ jsx15(
        "button",
        {
          type: "button",
          onClick: (event) => {
            event.stopPropagation();
            onDuplicate();
          },
          className: "rounded-full border p-2 transition",
          style: {
            borderColor: "var(--photon-builder-border)",
            background: "var(--photon-builder-panel-solid)",
            color: "var(--photon-builder-text-muted)"
          },
          children: /* @__PURE__ */ jsx15(Copy, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx15(
        "button",
        {
          type: "button",
          onClick: (event) => {
            event.stopPropagation();
            onDelete();
          },
          className: "rounded-full border p-2 transition",
          style: {
            borderColor: "var(--photon-builder-border)",
            background: "var(--photon-builder-panel-solid)",
            color: "var(--photon-builder-text-muted)"
          },
          children: /* @__PURE__ */ jsx15(Trash23, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx15(
        "button",
        {
          type: "button",
          ...hasMounted ? attributes : {},
          ...hasMounted ? listeners : {},
          onClick: (event) => event.stopPropagation(),
          className: "rounded-full border p-2 transition",
          style: {
            borderColor: "var(--photon-builder-border)",
            background: "var(--photon-builder-panel-solid)",
            color: "var(--photon-builder-text-muted)"
          },
          children: /* @__PURE__ */ jsx15(GripVertical, { className: "h-4 w-4" })
        }
      )
    ] }) : null
  ] }) : null;
  if (edgeToEdgeChrome && chromeEnabled) {
    return /* @__PURE__ */ jsxs10(
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
        className: clsx6(
          "group relative transition duration-200",
          chromeEnabled && "cursor-default",
          hasMounted && isDragging && "opacity-0"
        ),
        children: [
          chromeEnabled ? /* @__PURE__ */ jsxs10("div", { className: "mb-3 flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsx15("div", { className: "pointer-events-none flex min-h-10 max-w-[70%] flex-wrap items-center gap-2", children: chromeBadges }),
            /* @__PURE__ */ jsx15("div", { className: "relative z-10 flex shrink-0 items-center gap-2", children: chromeControls })
          ] }) : null,
          /* @__PURE__ */ jsx15(
            "div",
            {
              className: clsx6(
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
  return /* @__PURE__ */ jsxs10(
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
      className: clsx6(
        "group relative transition duration-200",
        chromeEnabled && "cursor-default",
        hasMounted && isDragging && "opacity-0"
      ),
      children: [
        chromeEnabled ? /* @__PURE__ */ jsx15(
          "div",
          {
            className: clsx6(
              "pointer-events-none absolute inset-0 rounded-[36px] border transition",
              chromeBorderClassName
            )
          }
        ) : null,
        builderEnabled ? /* @__PURE__ */ jsx15("div", { className: "pointer-events-none absolute left-5 top-5 z-10 flex max-w-[70%] flex-wrap items-center gap-2", children: chromeBadges }) : null,
        chromeEnabled ? /* @__PURE__ */ jsx15("div", { className: "absolute right-5 top-5 z-10 flex items-center gap-2", children: chromeControls }) : null,
        /* @__PURE__ */ jsx15(
          "div",
          {
            className: clsx6(
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
import clsx7 from "clsx";
import { Plus as Plus3 } from "lucide-react";
import { jsx as jsx16, jsxs as jsxs11 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs11(
    "div",
    {
      ref: setNodeRef,
      className: clsx7(
        "relative flex items-center justify-center transition-[padding] duration-200 ease-out",
        isDragging ? "py-4" : "py-2",
        isEmpty && !isDragging && "py-4"
      ),
      children: [
        /* @__PURE__ */ jsx16(
          "div",
          {
            className: clsx7(
              "absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-[22px] border border-dashed transition-[height,background-color,border-color,box-shadow] duration-200 ease-out",
              isDragging ? "h-14" : "h-6 border-transparent bg-transparent"
            ),
            style: {
              borderColor: isActive || isOver ? "var(--photon-builder-border-strong)" : isManual ? "var(--photon-builder-border)" : isDragging ? "var(--photon-builder-border)" : "transparent",
              background: isActive || isOver ? "var(--photon-builder-accent-strong)" : isManual ? "color-mix(in srgb, var(--photon-builder-accent) 8%, transparent)" : isDragging ? "var(--photon-builder-panel-muted)" : "transparent",
              boxShadow: isActive || isOver ? "var(--photon-builder-card-shadow)" : "none"
            }
          }
        ),
        /* @__PURE__ */ jsx16(
          "div",
          {
            className: clsx7(
              "absolute inset-x-0 top-1/2 h-px -translate-y-1/2 transition"
            ),
            style: {
              background: isActive || isOver ? "var(--photon-builder-border-strong)" : isManual ? "var(--photon-builder-border)" : "var(--photon-builder-border)"
            }
          }
        ),
        /* @__PURE__ */ jsxs11(
          "button",
          {
            type: "button",
            onClick: onActivate,
            className: clsx7(
              "relative z-10 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition duration-200",
              isDragging && "px-4 py-2"
            ),
            style: {
              borderColor: isActive || isOver ? "var(--photon-builder-border-strong)" : isManual ? "var(--photon-builder-border)" : "var(--photon-builder-border)",
              background: isActive || isOver ? "var(--photon-builder-accent-soft)" : isManual ? "color-mix(in srgb, var(--photon-builder-accent) 10%, var(--photon-builder-panel-solid))" : "var(--photon-builder-panel-solid)",
              color: isActive || isOver ? "var(--photon-builder-accent-text)" : isManual ? "var(--photon-builder-text)" : "var(--photon-builder-text-muted)"
            },
            children: [
              /* @__PURE__ */ jsx16(Plus3, { className: "h-3.5 w-3.5" }),
              isEmpty ? isDragging ? "Drop first block here" : "Insert first block" : isDragging ? "Drop block here" : "Insert here"
            ]
          }
        )
      ]
    }
  );
};

// src/studio/canvas/collapsed-block-preview.tsx
import { jsx as jsx17, jsxs as jsxs12 } from "react/jsx-runtime";
var CollapsedBlockPreview = ({
  block
}) => {
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      className: "rounded-[28px] border border-dashed px-5 py-5 text-sm",
      style: {
        borderColor: "var(--photon-builder-border)",
        background: "var(--photon-builder-panel-muted)",
        color: "var(--photon-builder-text-muted)"
      },
      children: [
        /* @__PURE__ */ jsx17(
          "div",
          {
            className: "font-semibold",
            style: { color: "var(--photon-builder-text)" },
            children: block.type
          }
        ),
        /* @__PURE__ */ jsx17("div", { className: "mt-2", style: { color: "var(--photon-builder-text-soft)" }, children: block.areas?.length ? `${block.areas.length} layout area${block.areas.length > 1 ? "s" : ""} hidden while collapsed.` : "Collapsed to keep the canvas compact while you work on neighboring sections." })
      ]
    }
  );
};

// src/studio/canvas/canvas-block-item.tsx
import { jsx as jsx18, jsxs as jsxs13 } from "react/jsx-runtime";
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
  const renderDepth = usePhotonRenderDepth();
  const { translate } = usePhotonI18n();
  const registry = usePhotonStore((state) => state.registry);
  const isSelected = usePhotonStore(
    (state) => state.selectedBlockId === block.id
  );
  const isCollapsed = usePhotonStore(
    (state) => Boolean(state.collapsedBlockIds[block.id])
  );
  const selectBlock = usePhotonStore((state) => state.selectBlock);
  const duplicateBlock = usePhotonStore(
    (state) => state.duplicateBlock
  );
  const removeBlock = usePhotonStore((state) => state.removeBlock);
  const toggleBlockCollapse = usePhotonStore(
    (state) => state.toggleBlockCollapse
  );
  const definition = registry.getDefinition(block.module, block.type);
  const chromeStyle = definition?.category === "Site Frame" ? "edge-to-edge" : "default";
  return /* @__PURE__ */ jsxs13(Fragment2, { children: [
    /* @__PURE__ */ jsxs13(
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
        children: [
          respectsCollapsedState && isCollapsed ? /* @__PURE__ */ jsx18(CollapsedBlockPreview, { block }) : /* @__PURE__ */ jsx18(
            PhotonBlockRenderer,
            {
              block,
              renderArea: (area) => /* @__PURE__ */ jsx18(PhotonRenderDepthProvider, { value: renderDepth + 1, children: /* @__PURE__ */ jsx18(
                CanvasBlockList,
                {
                  blocks: area.blocks,
                  listId: createPhotonAreaListId(block.id, area.id),
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
          ),
          builderEnabled && isSelected ? /* @__PURE__ */ jsx18(CanvasBlockInteractions, { block }) : null
        ]
      }
    ),
    /* @__PURE__ */ jsx18(
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
import { jsx as jsx19, jsxs as jsxs14 } from "react/jsx-runtime";
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
}) => /* @__PURE__ */ jsxs14("div", { className: "space-y-[var(--photon-list-gap,0.75rem)]", children: [
  /* @__PURE__ */ jsx19(
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
  blocks.map((block, index) => /* @__PURE__ */ jsx19(
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

// src/studio/canvas/site-surface-canvas.tsx
import clsx8 from "clsx";
import { memo as memo3, useEffect as useEffect4, useRef, useState as useState8 } from "react";
import { jsx as jsx20, jsxs as jsxs15 } from "react/jsx-runtime";
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
  const [surfaceWidth, setSurfaceWidth] = useState8(0);
  const blocks = getPhotonSurfaceRegionBlocks(document2, region.key) ?? [];
  const regionListId = getPhotonSurfaceRegionListId(region.key);
  const isPageRegion = region.key === PHOTON_PAGE_SURFACE_REGION_KEY;
  const builderRegionInsetClassName = builderEnabled ? "px-4 sm:px-5" : void 0;
  const builderSiteFrameInset = builderEnabled && (region.key === "header" || region.key === "footer");
  const stickySiteHeaderBlock = region.key === "header" ? blocks.find(
    (block) => block.module === "photon-system" && block.type === "site-header-shell" && block.props.sticky === true
  ) : void 0;
  const stickySiteHeaderRegion = Boolean(stickySiteHeaderBlock);
  const mobileStickySiteHeaderRegion = resolvePhotonSiteFrameMobileControls(
    stickySiteHeaderBlock?.props?.mobile
  ).sticky;
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
  return /* @__PURE__ */ jsx20(
    PhotonSurfaceLayoutProvider,
    {
      value: {
        builderEnabled,
        kind: region.kind,
        regionKey: region.key,
        width: surfaceWidth
      },
      children: /* @__PURE__ */ jsxs15(
        "section",
        {
          ref: sectionRef,
          "data-photon-surface-region": region.key,
          className: clsx8(
            "relative [container-type:inline-size]",
            isPageRegion && "flex-1",
            previewEnabled && stickySiteHeaderRegion && (mobileStickySiteHeaderRegion ? "sticky top-[calc(var(--photon-dock-offset,0px)+var(--photon-site-header-offset,0px))] z-40" : "md:sticky md:top-[calc(var(--photon-dock-offset,0px)+var(--photon-site-header-offset,0px))] md:z-40")
          ),
          children: [
            builderEnabled ? /* @__PURE__ */ jsxs15(
              "div",
              {
                className: clsx8(
                  "pointer-events-none mb-3 flex flex-wrap items-center gap-2",
                  builderRegionInsetClassName
                ),
                children: [
                  /* @__PURE__ */ jsx20(
                    "div",
                    {
                      className: "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em]",
                      style: {
                        borderColor: "var(--photon-builder-border)",
                        background: "var(--photon-builder-panel-solid)",
                        color: "var(--photon-builder-text-ghost)"
                      },
                      children: region.label
                    }
                  ),
                  region.lockedOnCanvas ? /* @__PURE__ */ jsx20(
                    "div",
                    {
                      className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                      style: {
                        borderColor: "var(--photon-builder-border-strong)",
                        background: "var(--photon-builder-accent-soft)",
                        color: "var(--photon-builder-accent-text)"
                      },
                      children: "Fixed region"
                    }
                  ) : null
                ]
              }
            ) : null,
            /* @__PURE__ */ jsx20(
              "div",
              {
                className: clsx8(
                  "transition-all duration-500",
                  isPageRegion ? "mx-auto w-full max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] px-[var(--photon-site-gutter,24px)]" : builderSiteFrameInset ? clsx8("w-full pb-1", builderRegionInsetClassName) : "w-full"
                ),
                style: isPageRegion ? {
                  "--photon-list-gap": "var(--photon-section-gap,2rem)"
                } : void 0,
                children: /* @__PURE__ */ jsx20(
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
  const mode = usePhotonStore((state) => state.mode);
  const regions = resolvePhotonSurfaceRegionDescriptors(site);
  const previewEnabled = mode !== "builder";
  return /* @__PURE__ */ jsx20("div", { className: "flex min-h-[var(--photon-site-surface-min-height,100dvh)] flex-col gap-[var(--photon-section-gap,2rem)]", children: regions.map((region) => /* @__PURE__ */ jsx20(
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
import clsx11 from "clsx";
import { LayoutPanelLeft, LayoutPanelTop, LogIn, LogOut } from "lucide-react";
import { useEffect as useEffect8, useRef as useRef2 } from "react";

// src/studio/editor-dock/editor-dock-brand.tsx
import { PanelsTopLeft as PanelsTopLeft2 } from "lucide-react";
import { jsx as jsx21, jsxs as jsxs16 } from "react/jsx-runtime";
var EditorDockBrand = ({
  title,
  compact = false
}) => {
  const { translate } = usePhotonI18n();
  return /* @__PURE__ */ jsxs16(
    "div",
    {
      className: `flex min-w-0 items-start transition-[gap] duration-300 ease-out ${compact ? "gap-2.5" : "gap-3"}`,
      children: [
        /* @__PURE__ */ jsx21(
          "div",
          {
            className: `flex items-center justify-center rounded-2xl border transition-[width,height,transform] duration-300 ease-out ${compact ? "h-10 w-10" : "h-11 w-11"}`,
            style: {
              borderColor: "var(--photon-builder-border-strong)",
              background: "var(--photon-builder-accent-strong)",
              color: "var(--photon-builder-accent)"
            },
            children: /* @__PURE__ */ jsx21(PanelsTopLeft2, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxs16("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx21(
            "div",
            {
              className: "text-[11px] uppercase tracking-[0.3em]",
              style: { color: "var(--photon-builder-text-soft)" },
              children: translate("photon.brand", "Photon")
            }
          ),
          /* @__PURE__ */ jsx21(
            "div",
            {
              className: `font-semibold tracking-[-0.03em] transition-[font-size] duration-300 ease-out ${compact ? "text-base" : "text-lg"}`,
              style: { color: "var(--photon-builder-text)" },
              children: title
            }
          )
        ] })
      ]
    }
  );
};

// src/studio/editor-dock/editor-locale-select.tsx
import { ChevronDown as ChevronDown4 } from "lucide-react";
import { useEffect as useEffect5, useState as useState9 } from "react";
import { jsx as jsx22, jsxs as jsxs17 } from "react/jsx-runtime";
var EditorLocaleSelect = ({
  label,
  value,
  options,
  onChange
}) => {
  const [hasMounted, setHasMounted] = useState9(false);
  const activeOption = options.find((option) => option.code === value) ?? options[0] ?? null;
  useEffect5(() => {
    setHasMounted(true);
  }, []);
  if (options.length <= 1 || !activeOption || typeof onChange !== "function") {
    return null;
  }
  const trigger = /* @__PURE__ */ jsxs17(
    "button",
    {
      type: "button",
      "aria-label": label,
      className: "inline-flex h-11 min-w-[10.25rem] cursor-pointer items-center justify-between gap-3 rounded-full border px-4 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,box-shadow,color] duration-200 ease-out outline-none border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] text-[color:var(--photon-builder-text)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)] focus-visible:border-[color:var(--photon-builder-border-strong)] focus-visible:bg-[color:var(--photon-builder-accent-strong)]",
      children: [
        /* @__PURE__ */ jsxs17("span", { className: "flex min-w-0 items-center gap-2.5", children: [
          /* @__PURE__ */ jsx22("span", { className: "text-[10px] uppercase tracking-[0.24em] text-[color:var(--photon-builder-text-soft)]", children: label }),
          /* @__PURE__ */ jsx22("span", { className: "truncate uppercase", children: activeOption.label })
        ] }),
        /* @__PURE__ */ jsx22(ChevronDown4, { className: "h-4 w-4 shrink-0 text-[color:var(--photon-builder-text-soft)] transition-transform duration-200 ease-out" })
      ]
    }
  );
  if (!hasMounted) {
    return trigger;
  }
  return /* @__PURE__ */ jsxs17(Root2, { modal: false, children: [
    /* @__PURE__ */ jsx22(Trigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsx22(DropdownMenuContent, { align: "start", children: /* @__PURE__ */ jsx22(
      RadioGroup,
      {
        value,
        onValueChange: (nextLocale) => onChange(nextLocale),
        children: options.map((option) => /* @__PURE__ */ jsx22(DropdownMenuRadioItem, { value: option.code, children: /* @__PURE__ */ jsxs17("span", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx22("span", { className: "text-[10px] uppercase tracking-[0.24em] text-[color:var(--photon-builder-text-soft)]", children: label }),
          /* @__PURE__ */ jsx22("span", { className: "uppercase", children: option.label })
        ] }) }, option.code))
      }
    ) })
  ] });
};

// src/studio/editor-dock/editor-mode-select.tsx
import { ChevronDown as ChevronDown5, Eye, PanelsTopLeft as PanelsTopLeft3, PenLine } from "lucide-react";
import { useEffect as useEffect6, useState as useState10 } from "react";
import { jsx as jsx23, jsxs as jsxs18 } from "react/jsx-runtime";
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
  const [optimisticValue, setOptimisticValue] = useState10(activeValue);
  const activeOption = MODE_OPTIONS.find((option) => option.value === optimisticValue) ?? MODE_OPTIONS[0];
  const ActiveIcon = activeOption.icon;
  const [hasMounted, setHasMounted] = useState10(false);
  useEffect6(() => {
    setHasMounted(true);
  }, []);
  useEffect6(() => {
    setOptimisticValue(activeValue);
  }, [activeValue]);
  const trigger = /* @__PURE__ */ jsxs18(
    "button",
    {
      type: "button",
      "aria-label": "Editing mode",
      className: "inline-flex h-11 min-w-[10.25rem] cursor-pointer items-center justify-between gap-3 rounded-full border px-4 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,box-shadow,color] duration-200 ease-out outline-none border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] text-[color:var(--photon-builder-text)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)] focus-visible:border-[color:var(--photon-builder-border-strong)] focus-visible:bg-[color:var(--photon-builder-accent-strong)]",
      children: [
        /* @__PURE__ */ jsxs18("span", { className: "flex min-w-0 items-center gap-2.5", children: [
          /* @__PURE__ */ jsx23(ActiveIcon, { className: "h-4 w-4 text-[color:var(--photon-builder-accent)]" }),
          /* @__PURE__ */ jsx23("span", { children: activeOption.label })
        ] }),
        /* @__PURE__ */ jsx23(ChevronDown5, { className: "h-4 w-4 text-[color:var(--photon-builder-text-soft)] transition-transform duration-200 ease-out" })
      ]
    }
  );
  if (!hasMounted) {
    return trigger;
  }
  return /* @__PURE__ */ jsxs18(Root2, { modal: false, children: [
    /* @__PURE__ */ jsx23(Trigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsx23(DropdownMenuContent, { align: "start", children: /* @__PURE__ */ jsx23(
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
          return /* @__PURE__ */ jsx23(DropdownMenuRadioItem, { value: option.value, children: /* @__PURE__ */ jsxs18("span", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx23(OptionIcon, { className: "h-4 w-4 text-[color:var(--photon-builder-accent)]" }),
            /* @__PURE__ */ jsx23("span", { children: option.label })
          ] }) }, option.value);
        })
      }
    ) })
  ] });
};

// src/studio/editor-dock/editor-page-browser.tsx
import clsx9 from "clsx";
import { ChevronDown as ChevronDown6, FilePlus2, FolderTree } from "lucide-react";
import { useEffect as useEffect7, useMemo as useMemo2, useState as useState11 } from "react";

// src/i18n/photon-labels.ts
var PALETTE_CATEGORY_KEYS = {
  Content: "photon.palette.categories.content",
  Conversion: "photon.palette.categories.conversion",
  Evidence: "photon.palette.categories.evidence",
  Hero: "photon.palette.categories.hero",
  Layout: "photon.palette.categories.layout",
  Media: "photon.palette.categories.media",
  Publication: "photon.palette.categories.publication",
  "Site Frame": "photon.palette.categories.siteFrame",
  System: "photon.palette.categories.system"
};
var FIELD_GROUP_KEYS = {
  content: "photon.fieldGroups.content",
  style: "photon.fieldGroups.style",
  layout: "photon.fieldGroups.layout",
  data: "photon.fieldGroups.data",
  misc: "photon.fieldGroups.misc"
};
var PAGE_GROUP_KEYS = {
  Pages: "photon.pageBrowser.groups.pages",
  Publications: "photon.pageBrowser.groups.publications",
  Templates: "photon.pageBrowser.groups.templates"
};
var translatePhotonPaletteCategory = (category, translate) => translate(PALETTE_CATEGORY_KEYS[category] ?? category, category);
var translatePhotonFieldGroup = (group, translate) => translate(FIELD_GROUP_KEYS[group] ?? group, group);
var translatePhotonPageGroup = (group, translate) => translate(PAGE_GROUP_KEYS[group] ?? group, group);

// src/studio/editor-dock/editor-page-browser.tsx
import { Fragment as Fragment3, jsx as jsx24, jsxs as jsxs19 } from "react/jsx-runtime";
var EditorPageBrowser = ({
  activeMode,
  currentPage,
  pages,
  onOpenPage,
  onCreatePage
}) => {
  const { translate } = usePhotonI18n();
  const [menuOpen, setMenuOpen] = useState11(false);
  const [dialogOpen, setDialogOpen] = useState11(false);
  const [name, setName] = useState11("");
  const [route, setRoute] = useState11("");
  const [duplicateCurrent, setDuplicateCurrent] = useState11(false);
  const [isSubmitting, setIsSubmitting] = useState11(false);
  const groupedPages = useMemo2(() => {
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
  const pageSections = useMemo2(
    () => Object.entries(groupedPages).map(([group, items]) => ({
      id: group,
      label: translatePhotonPageGroup(group, translate),
      items
    })),
    [groupedPages, translate]
  );
  const currentRouteLabel = currentPage?.routePattern ?? currentPage?.route ?? translate("photon.pageBrowser.unmappedRoute", "Unmapped route");
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
  return /* @__PURE__ */ jsxs19(Fragment3, { children: [
    /* @__PURE__ */ jsxs19(Root2, { open: menuOpen, onOpenChange: setMenuOpen, modal: false, children: [
      /* @__PURE__ */ jsx24(Trigger, { asChild: true, children: /* @__PURE__ */ jsxs19(
        "button",
        {
          type: "button",
          "data-testid": "photon-editor-page-browser-trigger",
          className: clsx9(
            "inline-flex min-w-[14rem] cursor-pointer items-center justify-between gap-3 rounded-full border px-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,box-shadow,color] duration-200 ease-out outline-none border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] text-[color:var(--photon-builder-text)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)] focus-visible:border-[color:var(--photon-builder-border-strong)] focus-visible:bg-[color:var(--photon-builder-accent-strong)]",
            compact ? "h-10" : "h-11"
          ),
          children: [
            /* @__PURE__ */ jsxs19("span", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxs19("span", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsx24(FolderTree, { className: "h-4 w-4 text-[color:var(--photon-builder-accent)]" }),
                /* @__PURE__ */ jsx24("span", { className: "truncate text-sm font-semibold", children: currentPage?.name ?? translate(
                  "photon.pageBrowser.groups.pages",
                  "Pages"
                ) })
              ] }),
              /* @__PURE__ */ jsx24("span", { className: "mt-0.5 block truncate text-[11px] uppercase tracking-[0.22em] text-[color:var(--photon-builder-text-soft)]", children: currentRouteLabel })
            ] }),
            /* @__PURE__ */ jsx24(ChevronDown6, { className: "h-4 w-4 shrink-0 text-[color:var(--photon-builder-text-soft)]" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs19(DropdownMenuContent, { className: "w-[22rem] p-0", children: [
        /* @__PURE__ */ jsxs19(
          "div",
          {
            className: "border-b px-4 py-4",
            style: { borderColor: "var(--photon-builder-border)" },
            children: [
              /* @__PURE__ */ jsx24(
                "div",
                {
                  className: "text-[11px] uppercase tracking-[0.28em]",
                  style: { color: "var(--photon-builder-text-soft)" },
                  children: translate("photon.pageBrowser.title", "Page Browser")
                }
              ),
              /* @__PURE__ */ jsx24(
                "div",
                {
                  className: "mt-2 text-sm leading-6",
                  style: { color: "var(--photon-builder-text-muted)" },
                  children: translate(
                    "photon.pageBrowser.description",
                    "Switch between live pages and shared templates without leaving the website surface."
                  )
                }
              ),
              onCreatePage ? /* @__PURE__ */ jsxs19(
                "button",
                {
                  type: "button",
                  "data-testid": "photon-page-browser-new-page",
                  onClick: () => {
                    setMenuOpen(false);
                    resetCreateForm();
                    setDialogOpen(true);
                  },
                  className: "mt-4 inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition",
                  style: {
                    borderColor: "var(--photon-builder-border-strong)",
                    background: "var(--photon-builder-accent-strong)",
                    color: "var(--photon-builder-accent)"
                  },
                  children: [
                    /* @__PURE__ */ jsx24(FilePlus2, { className: "h-4 w-4" }),
                    translate("photon.pageBrowser.newPage", "New Page")
                  ]
                }
              ) : null
            ]
          }
        ),
        /* @__PURE__ */ jsx24(
          KeyboardMenuList,
          {
            controller: pageMenu,
            sections: pageSections,
            getItemId: (page) => page.key,
            isItemDisabled: (page) => !page.canOpen || !onOpenPage,
            selectedItemId: currentPage?.key ?? null,
            listLabel: translate(
              "photon.pageBrowser.listLabel",
              "Photon page browser"
            ),
            className: "max-h-[26rem] space-y-4 overflow-y-auto px-3 py-3",
            renderItem: (page, { isActive, isDisabled, isSelected }) => {
              const routeLabel = page.routePattern ?? page.route;
              return /* @__PURE__ */ jsxs19(
                "button",
                {
                  type: "button",
                  tabIndex: -1,
                  disabled: isDisabled,
                  onClick: () => {
                    setMenuOpen(false);
                    onOpenPage?.(page);
                  },
                  className: clsx9(
                    "flex w-full items-start justify-between gap-3 rounded-[1rem] border px-3 py-3 text-left transition",
                    isDisabled && "cursor-not-allowed opacity-45"
                  ),
                  style: {
                    borderColor: isSelected ? "var(--photon-builder-border-strong)" : isActive ? "var(--photon-builder-border)" : "transparent",
                    background: isSelected ? "var(--photon-builder-accent-strong)" : isActive ? "var(--photon-builder-panel-muted)" : "transparent",
                    color: "var(--photon-builder-text)"
                  },
                  children: [
                    /* @__PURE__ */ jsxs19("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsx24(
                        "div",
                        {
                          className: "truncate text-sm font-semibold",
                          style: { color: "var(--photon-builder-text)" },
                          children: page.name
                        }
                      ),
                      /* @__PURE__ */ jsx24(
                        "div",
                        {
                          className: "mt-1 truncate font-mono text-[10px] uppercase tracking-[0.22em]",
                          style: { color: "var(--photon-builder-text-soft)" },
                          children: routeLabel
                        }
                      ),
                      page.description ? /* @__PURE__ */ jsx24(
                        "div",
                        {
                          className: "mt-2 text-xs leading-5",
                          style: { color: "var(--photon-builder-text-muted)" },
                          children: page.description
                        }
                      ) : null
                    ] }),
                    /* @__PURE__ */ jsx24(
                      "div",
                      {
                        className: "shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
                        style: {
                          borderColor: page.kind === "template" ? "var(--photon-builder-border-strong)" : "var(--photon-builder-border)",
                          background: page.kind === "template" ? "var(--photon-builder-accent-strong)" : "var(--photon-builder-panel-muted)",
                          color: page.kind === "template" ? "var(--photon-builder-accent)" : "var(--photon-builder-text-soft)"
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
    /* @__PURE__ */ jsx24(
      Root,
      {
        open: dialogOpen,
        onOpenChange: (nextOpen) => {
          setDialogOpen(nextOpen);
          if (!nextOpen) {
            resetCreateForm();
          }
        },
        children: /* @__PURE__ */ jsxs19(DialogContent, { "data-testid": "photon-page-browser-create-dialog", children: [
          /* @__PURE__ */ jsxs19(DialogHeader, { children: [
            /* @__PURE__ */ jsx24(DialogTitle, { children: "Create Page" }),
            /* @__PURE__ */ jsx24(DialogDescription, { children: "Add a new static page to the live website and start editing it in the same builder surface." })
          ] }),
          /* @__PURE__ */ jsxs19("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs19("label", { className: "block", children: [
              /* @__PURE__ */ jsx24(
                "div",
                {
                  className: "mb-2 text-[11px] uppercase tracking-[0.24em]",
                  style: { color: "var(--photon-builder-text-soft)" },
                  children: "Page Name"
                }
              ),
              /* @__PURE__ */ jsx24(
                "input",
                {
                  "data-testid": "photon-page-browser-create-name",
                  value: name,
                  onChange: (event) => setName(event.currentTarget.value),
                  placeholder: "About us",
                  className: "w-full rounded-[1.25rem] border px-4 py-3 text-sm outline-none transition placeholder:text-[color:var(--photon-builder-text-ghost)]",
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    background: "var(--photon-builder-field)",
                    color: "var(--photon-builder-text)"
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxs19("label", { className: "block", children: [
              /* @__PURE__ */ jsx24(
                "div",
                {
                  className: "mb-2 text-[11px] uppercase tracking-[0.24em]",
                  style: { color: "var(--photon-builder-text-soft)" },
                  children: "Route"
                }
              ),
              /* @__PURE__ */ jsx24(
                "input",
                {
                  "data-testid": "photon-page-browser-create-route",
                  value: route,
                  onChange: (event) => setRoute(event.currentTarget.value),
                  placeholder: "/about",
                  className: "w-full rounded-[1.25rem] border px-4 py-3 text-sm outline-none transition placeholder:text-[color:var(--photon-builder-text-ghost)]",
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    background: "var(--photon-builder-field)",
                    color: "var(--photon-builder-text)"
                  }
                }
              )
            ] }),
            canDuplicateCurrent ? /* @__PURE__ */ jsxs19("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx24(
                "div",
                {
                  className: "text-[11px] uppercase tracking-[0.24em]",
                  style: { color: "var(--photon-builder-text-soft)" },
                  children: "Starting Point"
                }
              ),
              /* @__PURE__ */ jsxs19("div", { className: "grid gap-2 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxs19(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDuplicateCurrent(false),
                    className: clsx9(
                      "rounded-[1.2rem] border px-4 py-3 text-left transition"
                    ),
                    style: !duplicateCurrent ? {
                      borderColor: "var(--photon-builder-border-strong)",
                      background: "var(--photon-builder-accent-strong)",
                      color: "var(--photon-builder-text)"
                    } : {
                      borderColor: "var(--photon-builder-border)",
                      background: "var(--photon-builder-panel-muted)",
                      color: "var(--photon-builder-text-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx24("div", { className: "text-sm font-semibold", children: "Blank page" }),
                      /* @__PURE__ */ jsx24("div", { className: "mt-1 text-xs leading-5", children: "Start from a clean canvas." })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs19(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDuplicateCurrent(true),
                    className: clsx9(
                      "rounded-[1.2rem] border px-4 py-3 text-left transition"
                    ),
                    style: duplicateCurrent ? {
                      borderColor: "var(--photon-builder-border-strong)",
                      background: "var(--photon-builder-accent-strong)",
                      color: "var(--photon-builder-text)"
                    } : {
                      borderColor: "var(--photon-builder-border)",
                      background: "var(--photon-builder-panel-muted)",
                      color: "var(--photon-builder-text-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx24("div", { className: "text-sm font-semibold", children: "Duplicate current" }),
                      /* @__PURE__ */ jsx24("div", { className: "mt-1 text-xs leading-5", children: "Copy the current page layout into the new route." })
                    ]
                  }
                )
              ] })
            ] }) : null
          ] }),
          /* @__PURE__ */ jsxs19(DialogFooter, { children: [
            /* @__PURE__ */ jsx24(
              "button",
              {
                type: "button",
                onClick: () => setDialogOpen(false),
                className: "inline-flex h-11 cursor-pointer items-center justify-center rounded-full border px-5 text-sm font-semibold transition",
                style: {
                  borderColor: "var(--photon-builder-border)",
                  background: "var(--photon-builder-panel-muted)",
                  color: "var(--photon-builder-text-muted)"
                },
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx24(
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
                  borderColor: "var(--photon-builder-border-strong)",
                  background: "var(--photon-builder-accent-strong)",
                  color: "var(--photon-builder-accent)"
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
import clsx10 from "clsx";
import { ChevronRight as ChevronRight2, History, LoaderCircle, Save } from "lucide-react";
import { useState as useState12 } from "react";

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
import { jsx as jsx25, jsxs as jsxs20 } from "react/jsx-runtime";
var ContextMenuCheckboxItem = forwardRef3(({ className, children, checked, ...props }, ref) => {
  return /* @__PURE__ */ jsxs20(
    ContextMenuPrimitive.CheckboxItem,
    {
      ref,
      "data-slot": "context-menu-checkbox-item",
      checked,
      className: cn(
        "relative flex cursor-pointer select-none items-center rounded-[1rem] py-2.5 pl-9 pr-3 text-sm font-semibold text-[var(--photon-builder-text-muted)] outline-none transition-colors duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[highlighted]:bg-[var(--photon-builder-accent-strong)] data-[highlighted]:text-[var(--photon-builder-text)]",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx25("span", { className: "absolute left-3 inline-flex h-4 w-4 items-center justify-center", children: /* @__PURE__ */ jsx25(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx25(
          Check2,
          {
            className: "h-4 w-4",
            style: { color: "var(--photon-builder-accent)" }
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
import { jsx as jsx26 } from "react/jsx-runtime";
var ContextMenuContent = forwardRef4(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx26(ContextMenuPrimitive2.Portal, { children: /* @__PURE__ */ jsx26(
    ContextMenuPrimitive2.Content,
    {
      ref,
      "data-slot": "context-menu-content",
      collisionPadding: { top: 24, right: 16, bottom: 24, left: 16 },
      className: cn(
        "relative z-50 min-w-[13rem] overflow-hidden rounded-[1.35rem] border p-1.5 shadow-[var(--photon-builder-panel-shadow)] backdrop-blur-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      style: {
        borderColor: "var(--photon-builder-border)",
        background: "linear-gradient(180deg, var(--photon-builder-panel-solid), var(--photon-builder-panel))",
        color: "var(--photon-builder-text)"
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
import { jsx as jsx27 } from "react/jsx-runtime";
var ContextMenuItem = forwardRef5(({ className, inset, ...props }, ref) => {
  return /* @__PURE__ */ jsx27(
    ContextMenuPrimitive3.Item,
    {
      ref,
      "data-slot": "context-menu-item",
      className: cn(
        "relative flex cursor-pointer select-none items-center rounded-[1rem] px-3 py-2.5 text-sm font-semibold text-[var(--photon-builder-text-muted)] outline-none transition-colors duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[highlighted]:bg-[var(--photon-builder-accent-strong)] data-[highlighted]:text-[var(--photon-builder-text)]",
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
import { jsx as jsx28 } from "react/jsx-runtime";
var ContextMenuSeparator = forwardRef6(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx28(
    ContextMenuPrimitive4.Separator,
    {
      ref,
      "data-slot": "context-menu-separator",
      className: cn("my-1.5 h-px bg-[var(--photon-builder-border)]", className),
      ...props
    }
  );
});
ContextMenuSeparator.displayName = ContextMenuPrimitive4.Separator.displayName;

// src/studio/editor-dock/editor-reset-dialog.tsx
import { jsx as jsx29, jsxs as jsxs21 } from "react/jsx-runtime";
var EditorResetDialog = ({
  open,
  onOpenChange,
  onConfirm
}) => {
  return /* @__PURE__ */ jsx29(Root, { open, onOpenChange, children: /* @__PURE__ */ jsxs21(DialogContent, { children: [
    /* @__PURE__ */ jsxs21(DialogHeader, { children: [
      /* @__PURE__ */ jsx29(DialogTitle, { children: "Discard local draft?" }),
      /* @__PURE__ */ jsx29(DialogDescription, { children: "This will remove every unsaved local change and restore the last version synced with Laravel." })
    ] }),
    /* @__PURE__ */ jsxs21(DialogFooter, { children: [
      /* @__PURE__ */ jsx29(
        "button",
        {
          type: "button",
          onClick: () => onOpenChange(false),
          className: "inline-flex h-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] text-[color:var(--photon-builder-text-muted)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)] hover:text-[color:var(--photon-builder-text)]",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx29(
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
      className: "border-[color:var(--photon-builder-border-strong)] bg-[color:color-mix(in_srgb,var(--photon-builder-accent)_18%,var(--photon-builder-panel-solid))] text-[color:var(--photon-builder-text)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:color-mix(in_srgb,var(--photon-builder-accent)_24%,var(--photon-builder-panel-solid))] hover:text-[color:var(--photon-builder-text)]",
      dotClassName: "bg-[color:var(--photon-builder-accent)]"
    };
  }
  if (saveState === "saving") {
    return {
      label: "Saving",
      className: "border-[color:var(--photon-builder-border-strong)] bg-[color:var(--photon-builder-accent-strong)] text-[color:var(--photon-builder-accent)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-accent-soft)] hover:text-[color:var(--photon-builder-accent-text)]",
      dotClassName: "bg-[color:var(--photon-builder-accent)]"
    };
  }
  if (hasUnsavedChanges) {
    return {
      label: autosaveEnabled ? "Sync pending" : "Draft pending",
      className: "border-[color:var(--photon-builder-border-strong)] bg-[color:color-mix(in_srgb,var(--photon-builder-accent)_14%,var(--photon-builder-panel-solid))] text-[color:var(--photon-builder-accent-text)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-accent-soft)] hover:text-[color:var(--photon-builder-accent-text)]",
      dotClassName: "bg-[color:var(--photon-builder-accent)]"
    };
  }
  return {
    label: activeMode === "builder" && autosaveEnabled ? "Builder synced" : autosaveEnabled ? "Synced" : "Saved",
    className: "border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] text-[color:var(--photon-builder-text-muted)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)] hover:text-[color:var(--photon-builder-text)]",
    dotClassName: "bg-[color:var(--photon-builder-text-soft)]"
  };
};

// src/studio/editor-dock/editor-save-button.tsx
import { Fragment as Fragment4, jsx as jsx30, jsxs as jsxs22 } from "react/jsx-runtime";
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
  const [resetDialogOpen, setResetDialogOpen] = useState12(false);
  const meta = getSaveButtonMeta({
    activeMode,
    autosaveEnabled,
    hasUnsavedChanges,
    saveState
  });
  return /* @__PURE__ */ jsxs22(Fragment4, { children: [
    /* @__PURE__ */ jsxs22(Root3, { children: [
      /* @__PURE__ */ jsx30(Trigger2, { asChild: true, children: /* @__PURE__ */ jsxs22(
        "button",
        {
          type: "button",
          onClick: onSave,
          className: clsx10(
            "inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,color] duration-200 ease-out",
            meta.className
          ),
          children: [
            saveState === "saving" ? /* @__PURE__ */ jsx30(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx30(Save, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx30(
              "span",
              {
                className: clsx10("h-2.5 w-2.5 rounded-full", meta.dotClassName)
              }
            ),
            /* @__PURE__ */ jsx30("span", { children: meta.label })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs22(ContextMenuContent, { children: [
        /* @__PURE__ */ jsxs22(ContextMenuItem, { onSelect: onSave, children: [
          /* @__PURE__ */ jsx30(Save, { className: "mr-3 h-4 w-4 text-[color:var(--photon-builder-text-soft)]" }),
          "Save now"
        ] }),
        /* @__PURE__ */ jsx30(
          ContextMenuCheckboxItem,
          {
            checked: autosaveEnabled,
            onCheckedChange: (checked) => onAutosaveChange(checked === true),
            children: "Autosave"
          }
        ),
        /* @__PURE__ */ jsxs22(
          ContextMenuItem,
          {
            disabled: !hasUnsavedChanges,
            onSelect: () => {
              setResetDialogOpen(true);
            },
            children: [
              /* @__PURE__ */ jsx30(History, { className: "mr-3 h-4 w-4 text-[color:var(--photon-builder-text-soft)]" }),
              "Revert local draft"
            ]
          }
        ),
        /* @__PURE__ */ jsx30(ContextMenuSeparator, {}),
        activeMode === "preview" && collapsedBlockCount > 0 ? /* @__PURE__ */ jsxs22(ContextMenuItem, { onSelect: onPreviewCollapsedChange, children: [
          /* @__PURE__ */ jsx30(ChevronRight2, { className: "mr-3 h-4 w-4 rotate-90 text-[color:var(--photon-builder-text-soft)]" }),
          showCollapsedInPreview ? "Show full layout" : "Show collapsed blocks"
        ] }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsx30(
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
import { Fragment as Fragment5, jsx as jsx31, jsxs as jsxs23 } from "react/jsx-runtime";
var PHOTON_EDITOR_DOCK_FALLBACK_HEIGHT = 80;
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
  } = usePhotonI18n();
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
  return /* @__PURE__ */ jsx31(
    "header",
    {
      ref: headerRef,
      className: "fixed left-0 right-auto top-0 z-[60] w-[100dvw] max-w-[100dvw] overflow-hidden border-b backdrop-blur-xl",
      "data-testid": "photon-editor-dock",
      style: {
        minHeight: PHOTON_EDITOR_DOCK_FALLBACK_HEIGHT,
        background: "var(--photon-builder-dock-bg)",
        boxShadow: "var(--photon-builder-panel-shadow)",
        borderColor: "var(--photon-builder-border)",
        color: "var(--photon-builder-text)"
      },
      children: /* @__PURE__ */ jsx31(
        "div",
        {
          className: clsx11(
            "mx-auto flex flex-col px-4 sm:px-6 lg:px-8",
            compact ? "gap-2 py-2.5" : "gap-3 py-3"
          ),
          style: { maxWidth: "1720px" },
          children: /* @__PURE__ */ jsxs23(
            "div",
            {
              className: clsx11(
                "grid gap-3",
                canManage ? "xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center" : "lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
              ),
              children: [
                /* @__PURE__ */ jsx31(EditorDockBrand, { title, compact }),
                /* @__PURE__ */ jsx31(
                  "div",
                  {
                    className: clsx11(
                      "flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                      "flex-wrap lg:flex-nowrap",
                      canManage ? "xl:justify-end" : "lg:justify-end"
                    ),
                    children: canManage ? /* @__PURE__ */ jsxs23(Fragment5, { children: [
                      /* @__PURE__ */ jsx31(
                        EditorPageBrowser,
                        {
                          activeMode,
                          currentPage,
                          pages,
                          onOpenPage,
                          onCreatePage
                        }
                      ),
                      /* @__PURE__ */ jsx31(
                        EditorLocaleSelect,
                        {
                          label: translate(
                            "photon.editor.contentLocale.label",
                            "Content"
                          ),
                          value: contentLocale,
                          options: contentLocaleOptions,
                          onChange: onContentLocaleChange
                        }
                      ),
                      showInterfaceLocaleControl ? /* @__PURE__ */ jsx31(
                        EditorLocaleSelect,
                        {
                          label: translate(
                            "photon.editor.interfaceLocale.label",
                            "Interface"
                          ),
                          value: interfaceLocale,
                          options: interfaceLocales,
                          onChange: onInterfaceLocaleChange
                        }
                      ) : null,
                      workspaceControl ? /* @__PURE__ */ jsxs23(
                        "button",
                        {
                          type: "button",
                          className: "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] px-4 text-sm font-semibold text-[color:var(--photon-builder-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)]",
                          onClick: workspaceControl.onToggle,
                          "aria-pressed": workspaceControl.isOpen,
                          "aria-label": workspaceControl.isOpen ? "Hide workspace panel" : "Show workspace panel",
                          "data-testid": "photon-workspace-toggle",
                          children: [
                            /* @__PURE__ */ jsx31(WorkspaceIcon, { className: "h-4 w-4 text-[color:var(--photon-builder-accent)]" }),
                            /* @__PURE__ */ jsx31("span", { children: "Workspace" })
                          ]
                        }
                      ) : null,
                      /* @__PURE__ */ jsx31(EditorModeSelect, { value: activeMode, onChange: onModeChange }),
                      /* @__PURE__ */ jsx31(
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
                      /* @__PURE__ */ jsxs23(ToolbarButton, { onClick: onLogout, children: [
                        /* @__PURE__ */ jsx31(LogOut, { className: "h-4 w-4" }),
                        translate("photon.auth.logOut", "Log out")
                      ] })
                    ] }) : /* @__PURE__ */ jsxs23(ToolbarButton, { onClick: onAuthOpen, children: [
                      /* @__PURE__ */ jsx31(LogIn, { className: "h-4 w-4" }),
                      translate("photon.auth.signIn", "Admin sign in")
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

// src/studio/palette-panel/palette-overlay-card.tsx
import { Boxes } from "lucide-react";
import { jsx as jsx32, jsxs as jsxs24 } from "react/jsx-runtime";
var PaletteOverlayCard = ({
  definition
}) => {
  const Icon = STUDIO_ICONS[definition.icon] ?? Boxes;
  return /* @__PURE__ */ jsx32(
    "div",
    {
      className: "w-[13.5rem] min-w-[13.5rem] max-w-[13.5rem] overflow-hidden rounded-[30px] border px-3.5 py-3.5 text-left backdrop-blur-xl",
      style: {
        borderColor: "var(--photon-builder-border-strong)",
        background: "var(--photon-builder-card-highlight), linear-gradient(180deg, var(--photon-builder-panel-solid), var(--photon-builder-panel))",
        color: "var(--photon-builder-text)",
        boxShadow: "var(--photon-builder-shadow)"
      },
      children: /* @__PURE__ */ jsxs24("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx32(
          "div",
          {
            className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[20px] border",
            style: {
              borderColor: "var(--photon-builder-border)",
              background: "var(--photon-builder-field)",
              color: "var(--photon-builder-accent)"
            },
            children: /* @__PURE__ */ jsx32(Icon, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxs24("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx32(
            "div",
            {
              className: "text-[10px] uppercase tracking-[0.26em]",
              style: { color: "var(--photon-builder-text-soft)" },
              children: definition.category
            }
          ),
          /* @__PURE__ */ jsx32("div", { className: "mt-1 truncate text-[1.05rem] font-semibold leading-6", children: definition.label }),
          /* @__PURE__ */ jsx32(
            "div",
            {
              className: "mt-2 text-[10px] uppercase tracking-[0.26em]",
              style: { color: "var(--photon-builder-text-ghost)" },
              children: definition.module
            }
          )
        ] })
      ] })
    }
  );
};

// src/studio/palette-panel/palette-panel.tsx
import {
  ChevronDown as ChevronDown7,
  ChevronLeft,
  ChevronRight as ChevronRight3,
  Copy as Copy2,
  Library,
  Search,
  SlidersHorizontal,
  Trash2 as Trash24
} from "lucide-react";
import { memo as memo4, useEffect as useEffect10, useMemo as useMemo3, useState as useState14 } from "react";

// src/studio/palette-panel/palette-card.tsx
import { useDraggable as useDraggable2 } from "@dnd-kit/core";
import clsx12 from "clsx";
import { Boxes as Boxes2 } from "lucide-react";
import { useEffect as useEffect9, useState as useState13 } from "react";
import { jsx as jsx33, jsxs as jsxs25 } from "react/jsx-runtime";
var PaletteCard = ({
  definition,
  isSelected,
  onInsert,
  onSelect
}) => {
  const { translate } = usePhotonI18n();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable2({
    id: definition.key,
    data: {
      kind: "palette",
      module: definition.module,
      type: definition.type,
      definitionKey: definition.key
    }
  });
  const [hasMounted, setHasMounted] = useState13(false);
  const Icon = STUDIO_ICONS[definition.icon] ?? Boxes2;
  useEffect9(() => {
    setHasMounted(true);
  }, []);
  return /* @__PURE__ */ jsxs25(
    "button",
    {
      type: "button",
      ref: hasMounted ? setNodeRef : void 0,
      ...hasMounted ? attributes : {},
      ...hasMounted ? listeners : {},
      onClick: () => onSelect(definition),
      onDoubleClick: () => onInsert(definition),
      "data-photon-palette-card": "true",
      className: clsx12(
        "group flex w-full cursor-pointer items-center gap-3 rounded-[28px] border px-3.5 py-3.5 text-left transition duration-200",
        hasMounted && isDragging && "opacity-0"
      ),
      style: {
        borderColor: isSelected ? "var(--photon-builder-border-strong)" : "var(--photon-builder-border)",
        background: isSelected ? "var(--photon-builder-card-highlight), var(--photon-builder-card-selected)" : "var(--photon-builder-card)",
        color: "var(--photon-builder-text)",
        boxShadow: "var(--photon-builder-card-shadow)"
      },
      children: [
        /* @__PURE__ */ jsx33(
          "div",
          {
            className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] border",
            style: {
              borderColor: isSelected ? "var(--photon-builder-border-strong)" : "var(--photon-builder-border)",
              background: isSelected ? "var(--photon-builder-accent-strong)" : "var(--photon-builder-field)",
              color: isSelected ? "var(--photon-builder-accent)" : "var(--photon-builder-text-soft)",
              boxShadow: "var(--photon-builder-card-shadow)"
            },
            children: /* @__PURE__ */ jsx33(Icon, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx33("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsx33(
          "div",
          {
            className: "truncate text-[15px] font-semibold",
            style: { color: "var(--photon-builder-text)" },
            children: translate(definition.labelKey ?? definition.label, definition.label)
          }
        ) })
      ]
    }
  );
};

// src/studio/palette-panel/palette-panel.tsx
import { Fragment as Fragment6, jsx as jsx34, jsxs as jsxs26 } from "react/jsx-runtime";
var normalizeLibraryUsageSource = (source) => {
  if (source === "current") {
    return "currentDocument";
  }
  if (source === "workspace") {
    return "workspacePage";
  }
  return source ?? "workspacePage";
};
var isWorkspaceLibraryUsage = (usage) => normalizeLibraryUsageSource(usage.source) === "workspacePage";
var PalettePanelComponent = ({
  paletteTab,
  onPaletteTabChange,
  selectedLibraryItemId,
  onLibraryItemSelect,
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
  componentLibraryUsageProvider,
  manualInsertTarget,
  onCollapse
}) => {
  const { translate } = usePhotonI18n();
  const site = usePhotonStore((state) => state.site);
  const document2 = usePhotonStore((state) => state.document);
  const pageSettings = usePhotonStore((state) => state.pageSettings);
  const workspace = usePhotonStore((state) => state.workspace);
  const selectedBlock = usePhotonStore(
    (state) => getPhotonSelectedBlock(state)
  );
  const createLibraryItemFromBlock = usePhotonStore(
    (state) => state.createComponentLibraryItemFromBlock
  );
  const insertComponentReference = usePhotonStore(
    (state) => state.insertComponentLibraryReference
  );
  const insertComponentCopy = usePhotonStore(
    (state) => state.insertComponentLibraryCopy
  );
  const detachComponentReference = usePhotonStore(
    (state) => state.detachComponentReference
  );
  const selectComponentLibrarySource = usePhotonStore(
    (state) => state.selectComponentLibrarySource
  );
  const duplicateComponentLibraryItem = usePhotonStore(
    (state) => state.duplicateComponentLibraryItem
  );
  const deleteComponentLibraryItem = usePhotonStore(
    (state) => state.deleteComponentLibraryItem
  );
  const updateComponentLibraryItem = usePhotonStore(
    (state) => state.updateComponentLibraryItem
  );
  const libraryItems = useMemo3(
    () => Object.values(getPhotonComponentLibraryItems(site.settings)).filter(
      (item) => item.enabled !== false
    ),
    [site.settings]
  );
  const currentLibraryUsages = useMemo3(
    () => collectPhotonComponentLibraryUsages(document2, "currentDocument").map((usage) => ({
      ...usage,
      source: normalizeLibraryUsageSource(usage.source)
    })),
    [document2]
  );
  const [workspaceLibraryUsages, setWorkspaceLibraryUsages] = useState14([]);
  const [pendingDeleteItemId, setPendingDeleteItemId] = useState14(
    null
  );
  useEffect10(() => {
    let cancelled = false;
    if (!componentLibraryUsageProvider) {
      setWorkspaceLibraryUsages([]);
      return;
    }
    Promise.resolve(
      componentLibraryUsageProvider({
        site,
        document: document2,
        pageSettings,
        workspace,
        itemIds: libraryItems.map((item) => item.id)
      })
    ).then((usages) => {
      if (!cancelled) {
        setWorkspaceLibraryUsages(
          usages.map((usage) => ({
            ...usage,
            source: normalizeLibraryUsageSource(usage.source)
          }))
        );
      }
    });
    return () => {
      cancelled = true;
    };
  }, [
    componentLibraryUsageProvider,
    document2,
    libraryItems,
    pageSettings,
    site,
    workspace
  ]);
  const libraryUsages = [...currentLibraryUsages, ...workspaceLibraryUsages];
  const selectedReferenceBlock = selectedBlock && isPhotonComponentReferenceBlock(selectedBlock) ? selectedBlock : null;
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
  const libraryMatchesSearch = (label) => !normalizedSearch || label.toLowerCase().includes(normalizedSearch);
  const visibleLibraryItems = libraryItems.filter(
    (item) => libraryMatchesSearch(`${item.label} ${item.description ?? ""} ${item.id}`)
  );
  const insertTarget = manualInsertTarget ?? void 0;
  const pendingDeleteItem = pendingDeleteItemId ? libraryItems.find((item) => item.id === pendingDeleteItemId) ?? null : null;
  const pendingDeleteUsages = pendingDeleteItem ? libraryUsages.filter((usage) => usage.itemId === pendingDeleteItem.id) : [];
  const pendingDeleteCurrentUsageCount = pendingDeleteUsages.filter(
    (usage) => !isWorkspaceLibraryUsage(usage)
  ).length;
  const pendingDeleteWorkspaceUsageCount = pendingDeleteUsages.filter(
    (usage) => isWorkspaceLibraryUsage(usage)
  ).length;
  return /* @__PURE__ */ jsxs26(Fragment6, { children: [
    /* @__PURE__ */ jsxs26("div", { className: "flex h-full flex-col", children: [
      /* @__PURE__ */ jsxs26(
        "div",
        {
          className: "border-b px-5 py-5",
          style: { borderColor: "var(--photon-builder-border)" },
          children: [
            /* @__PURE__ */ jsxs26("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsx34(
                "div",
                {
                  className: "text-[11px] uppercase tracking-[0.28em]",
                  style: { color: "var(--photon-builder-text-soft)" },
                  children: translate("photon.palette.title", "Palette")
                }
              ),
              onCollapse ? /* @__PURE__ */ jsx34(
                "button",
                {
                  type: "button",
                  onClick: onCollapse,
                  className: "cursor-pointer rounded-full border p-2 transition",
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    background: "var(--photon-builder-panel-muted)",
                    color: "var(--photon-builder-text-soft)"
                  },
                  children: /* @__PURE__ */ jsx34(ChevronLeft, { className: "h-4 w-4" })
                }
              ) : null
            ] }),
            /* @__PURE__ */ jsxs26("div", { className: "relative mt-4", children: [
              /* @__PURE__ */ jsx34(
                Search,
                {
                  className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
                  style: { color: "var(--photon-builder-text-soft)" }
                }
              ),
              /* @__PURE__ */ jsx34(
                "input",
                {
                  value: search,
                  onChange: (event) => onSearchChange(event.currentTarget.value),
                  placeholder: translate(
                    "photon.palette.searchPlaceholder",
                    "Find blocks, categories, modules"
                  ),
                  className: "w-full rounded-[22px] border py-3 pl-10 pr-4 text-sm outline-none transition",
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    background: "var(--photon-builder-field)",
                    color: "var(--photon-builder-text)"
                  }
                }
              ),
              /* @__PURE__ */ jsx34("div", { className: "absolute right-2 top-1/2 -translate-y-1/2", children: /* @__PURE__ */ jsxs26(Root2, { modal: false, children: [
                /* @__PURE__ */ jsx34(Trigger, { asChild: true, children: /* @__PURE__ */ jsx34(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Open palette filters",
                    className: "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition",
                    style: {
                      borderColor: "var(--photon-builder-border)",
                      background: paletteFamily !== "all" || palettePackage !== "all" ? "var(--photon-builder-card-selected)" : "var(--photon-builder-panel-muted)",
                      color: "var(--photon-builder-text-soft)"
                    },
                    children: /* @__PURE__ */ jsx34(SlidersHorizontal, { className: "h-4 w-4" })
                  }
                ) }),
                /* @__PURE__ */ jsxs26(
                  DropdownMenuContent,
                  {
                    align: "end",
                    className: "w-[20rem] space-y-4 p-3",
                    children: [
                      /* @__PURE__ */ jsxs26("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsx34(
                          "div",
                          {
                            className: "text-[11px] font-semibold uppercase tracking-[0.24em]",
                            style: { color: "var(--photon-builder-text-soft)" },
                            children: "Family"
                          }
                        ),
                        /* @__PURE__ */ jsxs26("div", { className: "flex flex-wrap gap-2", children: [
                          /* @__PURE__ */ jsx34(
                            "button",
                            {
                              type: "button",
                              onClick: () => onPaletteFamilyChange("all"),
                              className: "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] transition",
                              style: {
                                borderColor: paletteFamily === "all" ? "var(--photon-builder-border-strong)" : "var(--photon-builder-border)",
                                background: paletteFamily === "all" ? "var(--photon-builder-card-selected)" : "var(--photon-builder-field)",
                                color: "var(--photon-builder-text)"
                              },
                              children: "All"
                            }
                          ),
                          familyOptions.map((family) => /* @__PURE__ */ jsx34(
                            "button",
                            {
                              type: "button",
                              onClick: () => family.enabled ? onPaletteFamilyChange(family.value) : void 0,
                              disabled: !family.enabled,
                              className: "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] transition",
                              style: {
                                borderColor: paletteFamily === family.value ? "var(--photon-builder-border-strong)" : "var(--photon-builder-border)",
                                background: paletteFamily === family.value ? "var(--photon-builder-card-selected)" : "var(--photon-builder-field)",
                                color: family.enabled ? "var(--photon-builder-text)" : "var(--photon-builder-text-ghost)",
                                opacity: family.enabled ? 1 : 0.55
                              },
                              children: family.value
                            },
                            family.value
                          ))
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs26("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsx34(
                          "div",
                          {
                            className: "text-[11px] font-semibold uppercase tracking-[0.24em]",
                            style: { color: "var(--photon-builder-text-soft)" },
                            children: "Package"
                          }
                        ),
                        /* @__PURE__ */ jsxs26("div", { className: "flex flex-wrap gap-2", children: [
                          /* @__PURE__ */ jsx34(
                            "button",
                            {
                              type: "button",
                              onClick: () => onPalettePackageChange("all"),
                              className: "cursor-pointer rounded-full border px-3 py-1.5 text-xs transition",
                              style: {
                                borderColor: palettePackage === "all" ? "var(--photon-builder-border-strong)" : "var(--photon-builder-border)",
                                background: palettePackage === "all" ? "var(--photon-builder-card-selected)" : "var(--photon-builder-field)",
                                color: "var(--photon-builder-text-soft)"
                              },
                              children: "All"
                            }
                          ),
                          packageOptions.map((pkg) => /* @__PURE__ */ jsx34(
                            "button",
                            {
                              type: "button",
                              onClick: () => pkg.enabled ? onPalettePackageChange(pkg.value) : void 0,
                              disabled: !pkg.enabled,
                              className: "cursor-pointer rounded-full border px-3 py-1.5 text-xs transition",
                              style: {
                                borderColor: palettePackage === pkg.value ? "var(--photon-builder-border-strong)" : "var(--photon-builder-border)",
                                background: palettePackage === pkg.value ? "var(--photon-builder-card-selected)" : "var(--photon-builder-field)",
                                color: pkg.enabled ? "var(--photon-builder-text-soft)" : "var(--photon-builder-text-ghost)",
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
            ] }),
            /* @__PURE__ */ jsx34(
              "div",
              {
                className: "mt-4 inline-flex rounded-[14px] border p-1",
                style: {
                  borderColor: "var(--photon-builder-border)",
                  background: "var(--photon-builder-panel-muted)"
                },
                children: [
                  { key: "blocks", label: "Blocks" },
                  { key: "library", label: "Library" }
                ].map((tab) => /* @__PURE__ */ jsx34(
                  "button",
                  {
                    type: "button",
                    onClick: () => onPaletteTabChange(tab.key),
                    className: "cursor-pointer rounded-[10px] px-3 py-1.5 text-xs font-semibold transition",
                    style: paletteTab === tab.key ? {
                      background: "var(--photon-builder-accent-soft)",
                      color: "var(--photon-builder-accent-text)"
                    } : { color: "var(--photon-builder-text-muted)" },
                    children: tab.label
                  },
                  tab.key
                ))
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx34("div", { className: "flex-1 overflow-y-auto px-4 py-4", children: paletteTab === "library" ? /* @__PURE__ */ jsxs26("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs26(
          "section",
          {
            className: "rounded-[22px] border p-4",
            style: {
              borderColor: "var(--photon-builder-border)",
              background: "var(--photon-builder-panel-muted)"
            },
            children: [
              /* @__PURE__ */ jsx34(
                "div",
                {
                  className: "text-[11px] uppercase tracking-[0.28em]",
                  style: { color: "var(--photon-builder-text-soft)" },
                  children: "Reusable components"
                }
              ),
              /* @__PURE__ */ jsxs26(
                "button",
                {
                  type: "button",
                  disabled: !selectedBlock,
                  onClick: () => selectedBlock ? createLibraryItemFromBlock(selectedBlock.id) : void 0,
                  className: "mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold disabled:pointer-events-none disabled:opacity-45",
                  style: {
                    borderColor: "var(--photon-builder-border-strong)",
                    background: "var(--photon-builder-accent-soft)",
                    color: "var(--photon-builder-accent-text)"
                  },
                  children: [
                    /* @__PURE__ */ jsx34(Library, { className: "h-3.5 w-3.5" }),
                    "Create from selection"
                  ]
                }
              )
            ]
          }
        ),
        visibleLibraryItems.map((item) => {
          const selected = selectedLibraryItemId === item.id;
          const itemUsages = libraryUsages.filter(
            (usage) => usage.itemId === item.id
          );
          const currentUsageCount = itemUsages.filter(
            (usage) => !isWorkspaceLibraryUsage(usage)
          ).length;
          const workspaceUsageCount = itemUsages.filter(
            (usage) => isWorkspaceLibraryUsage(usage)
          ).length;
          const usageCount = itemUsages.length;
          return /* @__PURE__ */ jsxs26(
            "section",
            {
              className: "rounded-[22px] border p-4",
              style: {
                borderColor: selected ? "var(--photon-builder-border-strong)" : "var(--photon-builder-border)",
                background: selected ? "var(--photon-builder-card-selected)" : "var(--photon-builder-field)"
              },
              children: [
                /* @__PURE__ */ jsxs26(
                  "button",
                  {
                    type: "button",
                    onClick: () => onLibraryItemSelect(item.id),
                    className: "w-full cursor-pointer text-left",
                    children: [
                      /* @__PURE__ */ jsx34(
                        "div",
                        {
                          className: "text-sm font-semibold",
                          style: { color: "var(--photon-builder-text)" },
                          children: item.label
                        }
                      ),
                      /* @__PURE__ */ jsxs26(
                        "div",
                        {
                          className: "mt-1 font-mono text-[10px] uppercase tracking-[0.2em]",
                          style: { color: "var(--photon-builder-text-ghost)" },
                          children: [
                            item.blocks.length,
                            " block",
                            item.blocks.length === 1 ? "" : "s",
                            " \xB7 ",
                            usageCount,
                            " usage",
                            usageCount === 1 ? "" : "s"
                          ]
                        }
                      )
                    ]
                  }
                ),
                selected ? /* @__PURE__ */ jsxs26("div", { className: "mt-4 space-y-3", children: [
                  /* @__PURE__ */ jsxs26("label", { className: "grid gap-2 text-xs font-semibold", children: [
                    "Label",
                    /* @__PURE__ */ jsx34(
                      "input",
                      {
                        value: item.label,
                        onChange: (event) => updateComponentLibraryItem(item.id, (current) => ({
                          ...current,
                          label: event.currentTarget.value
                        })),
                        className: "h-10 rounded-[14px] border px-3 text-sm outline-none",
                        style: {
                          borderColor: "var(--photon-builder-border)",
                          background: "var(--photon-builder-panel-solid)",
                          color: "var(--photon-builder-text)"
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs26("div", { className: "flex flex-wrap gap-2", children: [
                    /* @__PURE__ */ jsxs26(
                      "button",
                      {
                        type: "button",
                        onClick: () => selectComponentLibrarySource(item.id),
                        className: "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold",
                        style: {
                          borderColor: "var(--photon-builder-border)",
                          background: "var(--photon-builder-panel-solid)",
                          color: "var(--photon-builder-text)"
                        },
                        children: [
                          /* @__PURE__ */ jsx34(SlidersHorizontal, { className: "h-3.5 w-3.5" }),
                          "Edit source"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs26(
                      "button",
                      {
                        type: "button",
                        onClick: () => insertComponentReference(
                          item.id,
                          insertTarget?.listId,
                          insertTarget?.index
                        ),
                        className: "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold",
                        style: {
                          borderColor: "var(--photon-builder-border)",
                          background: "var(--photon-builder-panel-solid)",
                          color: "var(--photon-builder-text)"
                        },
                        children: [
                          /* @__PURE__ */ jsx34(Library, { className: "h-3.5 w-3.5" }),
                          "Reference"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs26(
                      "button",
                      {
                        type: "button",
                        onClick: () => insertComponentCopy(
                          item.id,
                          insertTarget?.listId,
                          insertTarget?.index
                        ),
                        className: "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold",
                        style: {
                          borderColor: "var(--photon-builder-border)",
                          background: "var(--photon-builder-panel-solid)",
                          color: "var(--photon-builder-text)"
                        },
                        children: [
                          /* @__PURE__ */ jsx34(Copy2, { className: "h-3.5 w-3.5" }),
                          "Copy"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs26(
                      "button",
                      {
                        type: "button",
                        onClick: () => duplicateComponentLibraryItem(item.id),
                        className: "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold",
                        style: {
                          borderColor: "var(--photon-builder-border)",
                          background: "var(--photon-builder-panel-solid)",
                          color: "var(--photon-builder-text)"
                        },
                        children: [
                          /* @__PURE__ */ jsx34(Copy2, { className: "h-3.5 w-3.5" }),
                          "Duplicate source"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs26(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          if (usageCount === 0) {
                            deleteComponentLibraryItem(item.id);
                            return;
                          }
                          setPendingDeleteItemId(item.id);
                        },
                        className: "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold",
                        style: {
                          borderColor: "var(--photon-builder-border)",
                          background: "var(--photon-builder-panel-solid)",
                          color: "var(--photon-builder-text)"
                        },
                        children: [
                          /* @__PURE__ */ jsx34(Trash24, { className: "h-3.5 w-3.5" }),
                          "Delete source"
                        ]
                      }
                    ),
                    selectedReferenceBlock?.props.itemId === item.id ? /* @__PURE__ */ jsxs26(
                      "button",
                      {
                        type: "button",
                        onClick: () => detachComponentReference(selectedReferenceBlock.id),
                        className: "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold",
                        style: {
                          borderColor: "var(--photon-builder-border)",
                          background: "var(--photon-builder-accent-soft)",
                          color: "var(--photon-builder-accent-text)"
                        },
                        children: [
                          /* @__PURE__ */ jsx34(Copy2, { className: "h-3.5 w-3.5" }),
                          "Detach selected"
                        ]
                      }
                    ) : null
                  ] }),
                  /* @__PURE__ */ jsx34(
                    "div",
                    {
                      className: "rounded-2xl border px-3 py-2 text-xs leading-5",
                      style: {
                        borderColor: "var(--photon-builder-border)",
                        color: "var(--photon-builder-text-muted)"
                      },
                      children: usageCount ? `${currentUsageCount} current placement${currentUsageCount === 1 ? "" : "s"} \xB7 ${workspaceUsageCount} workspace placement${workspaceUsageCount === 1 ? "" : "s"}.` : "No placements in the current surface or workspace index."
                    }
                  )
                ] }) : null
              ]
            },
            item.id
          );
        }),
        visibleLibraryItems.length === 0 ? /* @__PURE__ */ jsx34(
          "section",
          {
            className: "rounded-[22px] border border-dashed p-4 text-sm leading-6",
            style: {
              borderColor: "var(--photon-builder-border)",
              color: "var(--photon-builder-text-muted)"
            },
            children: "No reusable components yet."
          }
        ) : null
      ] }) : /* @__PURE__ */ jsx34("div", { className: "space-y-4", children: paletteGroups.map((familyGroup) => /* @__PURE__ */ jsxs26("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs26(
          "button",
          {
            type: "button",
            onClick: () => onToggleFamily(familyGroup.family),
            className: "sticky top-0 z-10 flex w-full cursor-pointer items-center justify-between gap-3 rounded-[20px] border px-3 py-2.5 text-left shadow-[0_14px_34px_-26px_rgba(15,23,42,0.45)] backdrop-blur-xl transition",
            style: {
              color: "var(--photon-builder-text)",
              borderColor: "var(--photon-builder-border)",
              background: "var(--photon-builder-panel-muted)"
            },
            children: [
              /* @__PURE__ */ jsxs26("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx34(
                  "div",
                  {
                    className: "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em]",
                    style: {
                      color: "var(--photon-builder-text-soft)",
                      borderColor: "var(--photon-builder-border)",
                      background: "var(--photon-builder-card)"
                    },
                    children: familyGroup.family
                  }
                ),
                /* @__PURE__ */ jsx34("span", { className: "font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--photon-builder-text-ghost)]", children: familyGroup.groups.reduce(
                  (total, group) => total + group.definitions.length,
                  0
                ) })
              ] }),
              /* @__PURE__ */ jsx34("div", { style: { color: "var(--photon-builder-text-ghost)" }, children: collapsedFamilies.includes(familyGroup.family) ? /* @__PURE__ */ jsx34(ChevronRight3, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx34(ChevronDown7, { className: "h-4 w-4" }) })
            ]
          }
        ),
        collapsedFamilies.includes(familyGroup.family) ? null : familyGroup.groups.map(({ group, definitions }) => {
          const key = `${familyGroup.family}:${group}`;
          const collapsed = collapsedGroups.includes(key);
          return /* @__PURE__ */ jsxs26("section", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs26(
              "button",
              {
                type: "button",
                onClick: () => onToggleGroup(key),
                className: "flex w-full cursor-pointer items-center justify-between gap-3 rounded-[18px] px-2 py-1.5 text-left transition",
                style: { color: "var(--photon-builder-text)" },
                children: [
                  /* @__PURE__ */ jsxs26("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx34(
                      "div",
                      {
                        className: "text-[11px] uppercase tracking-[0.28em]",
                        style: { color: "var(--photon-builder-text-soft)" },
                        children: translatePhotonPaletteCategory(
                          group,
                          translate
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx34("span", { className: "font-mono text-[10px] uppercase tracking-[0.24em]", children: definitions.length })
                  ] }),
                  /* @__PURE__ */ jsx34(
                    "div",
                    {
                      style: { color: "var(--photon-builder-text-ghost)" },
                      children: collapsed ? /* @__PURE__ */ jsx34(ChevronRight3, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx34(ChevronDown7, { className: "h-4 w-4" })
                    }
                  )
                ]
              }
            ),
            collapsed ? null : /* @__PURE__ */ jsx34("div", { className: "space-y-2", children: definitions.map((definition) => /* @__PURE__ */ jsx34(
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
    ] }),
    /* @__PURE__ */ jsx34(
      Root,
      {
        open: Boolean(pendingDeleteItem),
        onOpenChange: (open) => {
          if (!open) {
            setPendingDeleteItemId(null);
          }
        },
        children: /* @__PURE__ */ jsxs26(DialogContent, { children: [
          /* @__PURE__ */ jsxs26(DialogHeader, { children: [
            /* @__PURE__ */ jsx34(DialogTitle, { children: "Delete reusable component?" }),
            /* @__PURE__ */ jsx34(DialogDescription, { children: pendingDeleteItem ? pendingDeleteWorkspaceUsageCount > 0 ? `"${pendingDeleteItem.label}" is used outside the current canvas. Delete is blocked until workspace usages are removed.` : pendingDeleteCurrentUsageCount > 0 ? `"${pendingDeleteItem.label}" has ${pendingDeleteCurrentUsageCount} current placement${pendingDeleteCurrentUsageCount === 1 ? "" : "s"}. Detach them to copies before deleting the source.` : `"${pendingDeleteItem.label}" has no placements and can be deleted.` : "" })
          ] }),
          /* @__PURE__ */ jsxs26(DialogFooter, { children: [
            /* @__PURE__ */ jsx34(
              "button",
              {
                type: "button",
                onClick: () => setPendingDeleteItemId(null),
                className: "inline-flex h-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] text-[color:var(--photon-builder-text-muted)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)] hover:text-[color:var(--photon-builder-text)]",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx34(
              "button",
              {
                type: "button",
                disabled: !pendingDeleteItem || pendingDeleteWorkspaceUsageCount > 0,
                onClick: () => {
                  if (!pendingDeleteItem) {
                    return;
                  }
                  const deleted = deleteComponentLibraryItem(
                    pendingDeleteItem.id,
                    {
                      detachUsages: pendingDeleteCurrentUsageCount > 0
                    }
                  );
                  if (deleted) {
                    setPendingDeleteItemId(null);
                    onLibraryItemSelect(null);
                  }
                },
                className: "inline-flex h-11 items-center justify-center rounded-full border border-rose-400/18 bg-rose-400/10 px-4 text-sm font-semibold text-rose-100 transition hover:border-rose-300/28 hover:bg-rose-400/16 hover:text-white disabled:pointer-events-none disabled:opacity-45",
                children: pendingDeleteCurrentUsageCount > 0 ? "Detach usages and delete" : "Delete source"
              }
            )
          ] })
        ] })
      }
    )
  ] });
};
var PalettePanel = memo4(PalettePanelComponent);

// src/studio/photon-studio/use-studio-browser-preferences.ts
import { useEffect as useEffect11, useState as useState15 } from "react";

// src/studio/photon-studio/studio-browser-storage.ts
import { openDB } from "idb";
var DATABASE_NAME = "photon-studio";
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

// src/studio/photon-studio/use-studio-browser-preferences.ts
var isPersistedMode = (value) => value === "preview" || value === "content" || value === "builder";
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
  search = "",
  storageKey,
  readStorage = getStudioStorageItem
}) => {
  const querySurfaceMode = parsePhotonStudioUrlState(search).builderSurface;
  const storedSurfaceMode = normalizePhotonStudioSurfaceMode(
    await readStorage(storageKey, {
      parseLegacy: (rawValue) => normalizePhotonStudioSurfaceMode(rawValue) ?? null,
      serializeLegacy: (persistedMode) => persistedMode
    })
  );
  const preferredSurfaceMode = querySurfaceMode ?? storedSurfaceMode ?? builderSurfaceMode;
  return {
    builderSurfaceMode: isAdmin && preferredSurfaceMode !== builderSurfaceMode ? preferredSurfaceMode : builderSurfaceMode
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
  const [modePreferenceHydrated, setModePreferenceHydrated] = useState15(false);
  const [builderSurfaceMode, setBuilderSurfaceMode] = useState15("canvas");
  const [
    builderSurfacePreferenceHydrated,
    setBuilderSurfacePreferenceHydrated
  ] = useState15(false);
  const { modeStorageKey, builderSurfaceStorageKey } = resolveStudioBrowserPreferenceStorageKeys(draftStorageKey);
  useEffect11(() => {
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
  useEffect11(() => {
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
  useEffect11(() => {
    if (typeof window === "undefined") {
      return;
    }
    let cancelled = false;
    void (async () => {
      const { builderSurfaceMode: preferredBuilderSurfaceMode } = await loadStudioBuilderSurfacePreference({
        isAdmin,
        builderSurfaceMode,
        search: window.location.search,
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
  useEffect11(() => {
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
  useEffect11(() => {
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

// src/studio/photon-studio/use-studio-definition-catalog.ts
import { useMemo as useMemo4 } from "react";

// src/studio/photon-studio/helpers.ts
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
  if (definition.module === "photon-system") {
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

// src/studio/photon-studio/use-studio-definition-catalog.ts
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
var useStudioDefinitionCatalog = (input) => useMemo4(
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

// src/studio/photon-studio/use-studio-drag-state.ts
import { useState as useState16 } from "react";
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
  const [activePaletteKey, setActivePaletteKey] = useState16(null);
  const [activeBlockId, setActiveBlockId] = useState16(null);
  const [activeDragKind, setActiveDragKind] = useState16(null);
  const [dropTarget, setDropTarget] = useState16(null);
  const [paletteOverlayOrigin, setPaletteOverlayOrigin] = useState16(null);
  const activePaletteDefinition = activePaletteKey ? allPaletteBlocks.find(
    (definition) => definition.key === activePaletteKey
  ) ?? null : null;
  const activeBlock = activeBlockId && activeBlockId === selectedBlockId ? selectedBlock : activeBlockId ? findPhotonBlock(document2.blocks, activeBlockId) : null;
  const handleDragStart = (event) => {
    const activeData = event.active.data.current;
    if (activeData?.kind === "palette") {
      setActiveDragKind("palette");
      setActivePaletteKey(String(activeData.definitionKey));
      const activatorTarget = event.activatorEvent.target instanceof HTMLElement ? event.activatorEvent.target : null;
      const paletteCard = activatorTarget?.closest(
        "[data-photon-palette-card='true']"
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
    const sourceRegion = resolvePhotonSurfaceRegionForBlockId(
      document2,
      String(activeData.blockId)
    );
    const targetRegion = resolvePhotonSurfaceRegionForListId(
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
      const sourceRegion = resolvePhotonSurfaceRegionForBlockId(
        document2,
        String(activeData.blockId)
      );
      const targetRegion = resolvePhotonSurfaceRegionForListId(
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

// src/studio/photon-studio/use-studio-persistence.ts
import { useCallback, useEffect as useEffect12, useMemo as useMemo5, useRef as useRef3, useState as useState17 } from "react";
import { toast as toast3 } from "sonner";

// src/studio/photon-studio/persistence-helpers.ts
var parseBooleanStorageValue = (rawValue) => {
  if (rawValue === "true") {
    return true;
  }
  if (rawValue === "false") {
    return false;
  }
  return null;
};
var getDefaultPhotonAutosaveEnabled = () => false;
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
        document: clonePhotonValue({
          id: parsedDocument.id,
          name: parsedDocument.name,
          route: parsedDocument.route,
          updatedAt: typeof parsedDocument.updatedAt === "string" ? parsedDocument.updatedAt : fallbackUpdatedAt,
          blocks: parsedDocument.blocks
        }),
        resources: clonePhotonValue(parsedEnvelope?.resources ?? {}),
        pageSettings: clonePhotonValue(
          parsedEnvelope?.pageSettings ?? {}
        ),
        site: clonePhotonValue(
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
var getPhotonStudioFingerprint = (document2, resources, pageSettings, site, workspace) => JSON.stringify({
  workspace: getPhotonWorkspaceIdentityKey(workspace),
  document: getPhotonDocumentFingerprint(document2),
  resources,
  pageSettings,
  site
});
var normalizePhotonStudioWorkspace = (workspace) => normalizePhotonWorkspaceDescriptor(workspace);
var normalizePhotonStudioCapabilities = (capabilities) => normalizePhotonWorkspaceCapabilities(capabilities);
var resolvePhotonStudioWorkspaceKey = (workspace) => getPhotonWorkspaceIdentityKey(workspace);
var resolvePhotonStudioDraftStorageKey = ({
  baseKey,
  workspace
}) => `${baseKey}:${getPhotonWorkspaceIdentityKey(workspace)}`;
var createPhotonStudioSavePayload = ({
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
var createPhotonStudioSiteSettingChangeContext = ({
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
    clonePhotonValue(site.settings),
    path,
    value
  );
  return {
    ...createPhotonStudioSavePayload({
      workspace,
      expectedHeadRevisionId,
      saveMode: "manual",
      document: document2,
      resources,
      pageSettings,
      site: {
        ...clonePhotonValue(site),
        settings: nextSiteSettings
      }
    }),
    currentPage: currentPage ?? null
  };
};
var canSavePhotonStudioDocument = ({
  isAdmin,
  workspace,
  capabilities
}) => canSavePhotonWorkspace({
  isAdmin,
  workspace,
  capabilities
});

// src/studio/photon-studio/use-studio-persistence.ts
var resolvePhotonStudioSaveFailureDescription = (error) => {
  const responseData = typeof error === "object" && error !== null ? error.response?.data : null;
  if (typeof responseData === "object" && responseData !== null) {
    const candidate = responseData;
    if (candidate.code === "photon_workspace_head_mismatch") {
      return "This workspace changed before the save finished. Refresh the workspace, then apply the local draft again.";
    }
    if (typeof candidate.message === "string" && candidate.message.trim()) {
      return candidate.message;
    }
  }
  return error instanceof Error ? error.message : "Failed to save the document.";
};
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
  const normalizedWorkspace = useMemo5(
    () => normalizePhotonStudioWorkspace(workspace),
    [workspace]
  );
  const normalizedCapabilities = useMemo5(
    () => normalizePhotonStudioCapabilities(capabilities),
    [capabilities]
  );
  const workspaceKey = useMemo5(
    () => resolvePhotonStudioWorkspaceKey(normalizedWorkspace),
    [normalizedWorkspace]
  );
  const draftStorageScopeKey = useMemo5(
    () => resolvePhotonStudioDraftStorageKey({
      baseKey: draftStorageKey,
      workspace: normalizedWorkspace
    }),
    [draftStorageKey, normalizedWorkspace]
  );
  const canSaveDocument = useMemo5(
    () => canSavePhotonStudioDocument({
      isAdmin,
      workspace: normalizedWorkspace,
      capabilities: normalizedCapabilities
    }),
    [isAdmin, normalizedCapabilities, normalizedWorkspace]
  );
  const [autosaveEnabled, setAutosaveEnabled] = useState17(
    getDefaultPhotonAutosaveEnabled
  );
  const [saveState, setSaveState] = useState17("idle");
  const [hasHydrated, setHasHydrated] = useState17(false);
  const [lastSavedRevision, setLastSavedRevision] = useState17(0);
  const [lastSavedState, setLastSavedState] = useState17(() => ({
    ...createPhotonStudioSavePayload({
      workspace: clonePhotonValue(normalizedWorkspace),
      expectedHeadRevisionId: normalizedWorkspace.headRevisionId ?? null,
      saveMode: "manual",
      document: clonePhotonValue(initialDocument),
      resources: clonePhotonValue(initialResources),
      pageSettings: clonePhotonValue(initialPageSettings),
      site: clonePhotonValue(initialSite)
    })
  }));
  const hasLoadedDraftRef = useRef3(null);
  const contentRevisionRef = useRef3(contentRevision);
  const isSavingRef = useRef3(false);
  const lastSavedStateRef = useRef3(lastSavedState);
  const initialStateFingerprint = useMemo5(
    () => getPhotonStudioFingerprint(
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
  useEffect12(() => {
    contentRevisionRef.current = contentRevision;
  }, [contentRevision]);
  useEffect12(() => {
    lastSavedStateRef.current = lastSavedState;
  }, [lastSavedState]);
  useEffect12(() => {
    const nextLastSavedState = createPhotonStudioSavePayload({
      workspace: clonePhotonValue(normalizedWorkspace),
      expectedHeadRevisionId: normalizedWorkspace.headRevisionId ?? null,
      saveMode: "manual",
      document: clonePhotonValue(initialDocument),
      resources: clonePhotonValue(initialResources),
      pageSettings: clonePhotonValue(initialPageSettings),
      site: clonePhotonValue(initialSite)
    });
    setLastSavedRevision(0);
    lastSavedStateRef.current = nextLastSavedState;
    setLastSavedState(nextLastSavedState);
    setSaveState("idle");
  }, [
    initialDocument,
    initialPageSettings,
    initialResources,
    initialSite,
    draftStorageScopeKey
  ]);
  useEffect12(() => {
    setLastSavedState((currentState) => ({
      ...currentState,
      workspace: clonePhotonValue(normalizedWorkspace)
    }));
  }, [normalizedWorkspace]);
  useEffect12(() => {
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
        if (getPhotonStudioFingerprint(
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
        if (contentRevisionRef.current !== 0) {
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
  useEffect12(() => {
    if (typeof window === "undefined" || !isAdmin || !hasHydrated || !canSaveDocument) {
      return;
    }
    if (hasUnsavedChanges) {
      const timeoutId = window.setTimeout(() => {
        void setStudioStorageItem(draftStorageScopeKey, {
          workspaceKey,
          document: clonePhotonValue(persistedDocument),
          resources: clonePhotonValue(resources),
          pageSettings: clonePhotonValue(pageSettings),
          site: clonePhotonValue(site)
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
  useEffect12(() => {
    if (typeof window === "undefined" || !isAdmin || !hasHydrated) {
      return;
    }
    void setStudioStorageItem(autosaveStorageKey, autosaveEnabled, {
      serializeLegacy: String
    });
  }, [autosaveEnabled, autosaveStorageKey, hasHydrated, isAdmin]);
  const saveDocument = useCallback(
    async (reason) => {
      if (!canSaveDocument || isSavingRef.current) {
        if (reason !== "autosave" && isAdmin) {
          toast3.error("Save unavailable", {
            description: isSavingRef.current ? "A save is already in progress." : "This workspace is readonly or direct commits are currently blocked."
          });
        }
        return;
      }
      isSavingRef.current = true;
      setSaveState("saving");
      try {
        const baseSavedState = lastSavedStateRef.current;
        const persistedState = await onSaveDocument?.(
          createPhotonStudioSavePayload({
            workspace: normalizedWorkspace,
            expectedHeadRevisionId: baseSavedState.expectedHeadRevisionId ?? normalizedWorkspace.headRevisionId ?? null,
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
        ) ?? createPhotonStudioSavePayload({
          workspace: normalizedWorkspace,
          expectedHeadRevisionId: baseSavedState.expectedHeadRevisionId ?? normalizedWorkspace.headRevisionId ?? null,
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
        const nextLastSavedState = createPhotonStudioSavePayload({
          workspace: clonePhotonValue(
            persistedState.workspace ?? normalizedWorkspace
          ),
          expectedHeadRevisionId: persistedState.expectedHeadRevisionId ?? persistedState.workspace?.headRevisionId ?? normalizedWorkspace.headRevisionId ?? null,
          saveMode: persistedState.saveMode,
          document: clonePhotonValue(persistedState.document),
          resources: clonePhotonValue(persistedState.resources),
          pageSettings: clonePhotonValue(persistedState.pageSettings),
          site: clonePhotonValue(persistedState.site)
        });
        lastSavedStateRef.current = nextLastSavedState;
        setLastSavedState(nextLastSavedState);
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
          description: resolvePhotonStudioSaveFailureDescription(error)
        });
      } finally {
        isSavingRef.current = false;
      }
    },
    [
      canSaveDocument,
      isAdmin,
      normalizedCapabilities,
      normalizedWorkspace,
      onSaveDocument,
      pageSettings,
      persistedDocument,
      resources,
      site,
      syncExternalState
    ]
  );
  const restoreLastSavedState = useCallback(() => {
    syncExternalState({
      initialDocument: clonePhotonValue(lastSavedState.document),
      initialResources: clonePhotonValue(lastSavedState.resources),
      initialPageSettings: clonePhotonValue(
        lastSavedState.pageSettings
      ),
      initialSite: clonePhotonValue(lastSavedState.site),
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
  useEffect12(() => {
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
  useEffect12(() => {
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

// src/studio/photon-studio/use-studio-sidebars.ts
import {
  useEffect as useEffect13,
  useRef as useRef4,
  useState as useState18
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
  const [leftWidth, setLeftWidth] = useState18(DEFAULT_LEFT_WIDTH);
  const [rightWidth, setRightWidth] = useState18(DEFAULT_RIGHT_WIDTH);
  const [leftCollapsed, setLeftCollapsed] = useState18(false);
  const [rightCollapsed, setRightCollapsed] = useState18(false);
  const [hasHydrated, setHasHydrated] = useState18(false);
  const [isResizing, setIsResizing] = useState18(false);
  const resizeFrameRef = useRef4(null);
  useEffect13(() => {
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
  useEffect13(() => {
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

// src/studio/photon-studio/use-studio-site-setting-change.ts
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
    createPhotonStudioSiteSettingChangeContext({
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

// src/studio/photon-studio/photon-stage.tsx
import clsx21 from "clsx";
import {
  useEffect as useEffect17
} from "react";

// src/studio/canvas/canvas-top-toolbar.tsx
import clsx14 from "clsx";
import { ChevronDown as ChevronDown8, ChevronUp as ChevronUp2, History as History2 } from "lucide-react";

// src/studio/canvas/canvas-surface-mode-toggle.tsx
import clsx13 from "clsx";
import { jsx as jsx35 } from "react/jsx-runtime";
var CanvasSurfaceModeToggle = ({
  value,
  onChange
}) => {
  return /* @__PURE__ */ jsx35(
    "div",
    {
      className: "pointer-events-auto inline-flex items-center gap-1 rounded-[14px] border p-1",
      style: {
        borderColor: "var(--photon-builder-border)",
        background: "var(--photon-builder-field)",
        boxShadow: "var(--photon-builder-shadow)"
      },
      children: [
        {
          key: "canvas",
          label: "Canvas"
        },
        {
          key: "settings",
          label: "Settings"
        },
        {
          key: "interactions",
          label: "Interactions"
        }
      ].map((option) => /* @__PURE__ */ jsx35(
        "button",
        {
          type: "button",
          onClick: () => onChange(option.key),
          "data-testid": `photon-canvas-surface-mode-${option.key}`,
          className: clsx13(
            "cursor-pointer rounded-[10px] px-3 py-1.5 text-xs font-semibold transition"
          ),
          style: value === option.key ? {
            background: "var(--photon-builder-accent-soft)",
            color: "var(--photon-builder-accent-text)"
          } : { color: "var(--photon-builder-text-muted)" },
          children: option.label
        },
        option.key
      ))
    }
  );
};

// src/studio/canvas/canvas-top-toolbar.tsx
import { jsx as jsx36, jsxs as jsxs27 } from "react/jsx-runtime";
var CanvasTopToolbarButton = ({
  label,
  onClick,
  disabled = false,
  children
}) => {
  return /* @__PURE__ */ jsxs27(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      title: label,
      "aria-label": label,
      className: "group relative inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-[9px] border transition disabled:pointer-events-none disabled:opacity-35",
      style: {
        borderColor: "var(--photon-builder-border)",
        background: "var(--photon-builder-field)",
        color: "var(--photon-builder-text-muted)"
      },
      children: [
        children,
        /* @__PURE__ */ jsx36(
          "span",
          {
            className: "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border px-2 py-1 text-[10px] font-semibold opacity-0 transition duration-150 group-hover:-translate-y-0.5 group-hover:opacity-100",
            style: {
              borderColor: "var(--photon-builder-border)",
              background: "var(--photon-builder-panel-solid)",
              color: "var(--photon-builder-text)",
              boxShadow: "var(--photon-builder-shadow)"
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
  const { translate } = usePhotonI18n();
  return /* @__PURE__ */ jsx36(
    "div",
    {
      className: clsx14(
        "pointer-events-none fixed z-40 hidden transition-[opacity,transform] duration-300 ease-out lg:block",
        visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      ),
      style: {
        top: topOffset,
        left: leftOffset,
        right: rightOffset
      },
      "data-testid": "photon-canvas-toolbar",
      children: /* @__PURE__ */ jsx36(
        "div",
        {
          className: "border-b backdrop-blur-xl",
          style: {
            borderColor: "var(--photon-builder-border)",
            background: "linear-gradient(180deg, var(--photon-builder-panel-solid), var(--photon-builder-panel))",
            boxShadow: "var(--photon-builder-shadow)"
          },
          children: /* @__PURE__ */ jsxs27("div", { className: "flex h-10 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsx36(
              CanvasSurfaceModeToggle,
              {
                value: surfaceMode,
                onChange: onSurfaceModeChange
              }
            ),
            /* @__PURE__ */ jsxs27(
              "div",
              {
                className: clsx14(
                  "pointer-events-auto flex items-center gap-1 rounded-[12px] border p-1 transition-opacity duration-200",
                  surfaceMode === "canvas" ? "opacity-100" : "pointer-events-none opacity-35"
                ),
                style: {
                  borderColor: "var(--photon-builder-border)",
                  background: "var(--photon-builder-field)",
                  boxShadow: "var(--photon-builder-shadow)"
                },
                children: [
                  /* @__PURE__ */ jsx36(
                    CanvasTopToolbarButton,
                    {
                      label: translate(
                        "photon.toolbar.revertDraft",
                        "Revert local draft"
                      ),
                      onClick: onReset,
                      disabled: !canReset || surfaceMode !== "canvas",
                      children: /* @__PURE__ */ jsx36(History2, { className: clsx14("h-[13px] w-[13px]") })
                    }
                  ),
                  /* @__PURE__ */ jsx36(
                    CanvasTopToolbarButton,
                    {
                      label: translate(
                        "photon.toolbar.collapseAll",
                        "Collapse all blocks"
                      ),
                      onClick: onCollapseAll,
                      disabled: surfaceMode !== "canvas",
                      children: /* @__PURE__ */ jsx36(ChevronDown8, { className: "h-[13px] w-[13px]" })
                    }
                  ),
                  /* @__PURE__ */ jsx36(
                    CanvasTopToolbarButton,
                    {
                      label: translate(
                        "photon.toolbar.expandAll",
                        "Expand all blocks"
                      ),
                      onClick: onExpandAll,
                      disabled: surfaceMode !== "canvas",
                      children: /* @__PURE__ */ jsx36(ChevronUp2, { className: "h-[13px] w-[13px]" })
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

// src/studio/interaction-surfaces-surface/interaction-surfaces-surface.tsx
import clsx15 from "clsx";
import { useMemo as useMemo6, useState as useState19 } from "react";
import { Fragment as Fragment7, jsx as jsx37, jsxs as jsxs28 } from "react/jsx-runtime";
var shellStyle = {
  borderColor: "var(--photon-builder-border)",
  background: "linear-gradient(180deg, var(--photon-builder-panel-solid), var(--photon-builder-panel))",
  boxShadow: "var(--photon-builder-shadow)",
  color: "var(--photon-builder-text)"
};
var cardStyle = {
  borderColor: "var(--photon-builder-border)",
  background: "var(--photon-builder-panel-muted)",
  color: "var(--photon-builder-text)"
};
var fieldStyle = {
  borderColor: "var(--photon-builder-border)",
  background: "var(--photon-builder-field)",
  color: "var(--photon-builder-text)"
};
var activeStyle = {
  borderColor: "var(--photon-builder-border-strong)",
  background: "var(--photon-builder-card-selected)",
  color: "var(--photon-builder-text)"
};
var buttonStyle = {
  borderColor: "var(--photon-builder-border)",
  background: "var(--photon-builder-field)",
  color: "var(--photon-builder-text)"
};
var primaryButtonStyle = {
  borderColor: "var(--photon-builder-border-strong)",
  background: "var(--photon-builder-accent-soft)",
  color: "var(--photon-builder-accent-text)"
};
var settingPath = (suffix) => `${PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY}.${suffix}`;
var interactionSettingPath2 = (suffix) => `${PHOTON_INTERACTIONS_SITE_SETTING_KEY}.${suffix}`;
var getDefinitionFields2 = (definition) => (definition?.fields ?? []).map((field) => ({
  ...field,
  path: field.path.replace(/^props\./u, "")
}));
var getInstanceValue = (instance, path) => getValueAtPath(instance.props ?? {}, path);
var setInstanceValue = (instance, path, value) => ({
  ...instance,
  props: setValueAtPath(instance.props ?? {}, path, value)
});
var InteractionSurfacesSurface = ({
  site,
  definitions,
  actionDefinitions,
  guardDefinitions,
  activeTab: controlledActiveTab,
  selectedActionId: controlledSelectedActionId,
  selectedGuardId: controlledSelectedGuardId,
  selectedScenarioId: controlledSelectedScenarioId,
  onActiveTabChange,
  onSelectedActionChange,
  onSelectedGuardChange,
  onSelectedScenarioChange,
  selectedInstanceId: controlledSelectedInstanceId,
  selectedTemplateId: controlledSelectedTemplateId,
  onSelectedInstanceChange,
  onSelectedTemplateChange,
  onSiteSettingChange,
  onSiteSettingFocus,
  openInteractionSurface,
  showInteractionToast,
  executeInteractionAction
}) => {
  const catalog = useMemo6(
    () => resolvePhotonInteractionSurfaceCatalog({
      definitions,
      siteSettings: site.settings
    }),
    [definitions, site.settings]
  );
  const actionCatalog = useMemo6(
    () => resolvePhotonInteractionActionCatalog({
      actions: actionDefinitions,
      guards: guardDefinitions,
      surfaces: definitions,
      siteSettings: site.settings
    }),
    [actionDefinitions, definitions, guardDefinitions, site.settings]
  );
  const persistedSettings = readPhotonInteractionSurfaceSettings(site.settings);
  const persistedInteractionSettings = readPhotonInteractionSettings(site.settings);
  const defaultInstanceIds = new Set(
    catalog.definitions.flatMap(
      (definition) => (definition.defaultInstances ?? []).map((instance) => instance.id)
    )
  );
  const surfaceDefinitions = catalog.definitions.filter(
    (definition) => definition.kind !== "toast"
  );
  const allInstances = Object.values(catalog.instances);
  const instances = allInstances.filter(
    (instance) => instance.enabled !== false
  );
  const disabledInstances = allInstances.filter(
    (instance) => instance.enabled === false
  );
  const toastTemplates = Object.values(catalog.toastTemplates).filter(
    (template) => template.enabled !== false
  );
  const [localSelectedInstanceId, setLocalSelectedInstanceId] = useState19(
    instances[0]?.id ?? ""
  );
  const [localSelectedTemplateId, setLocalSelectedTemplateId] = useState19(
    toastTemplates[0]?.id ?? ""
  );
  const [localActiveTab, setLocalActiveTab] = useState19("actions");
  const [localSelectedActionId, setLocalSelectedActionId] = useState19(
    Object.values(actionCatalog.actionInstances)[0]?.id ?? ""
  );
  const [localSelectedGuardId, setLocalSelectedGuardId] = useState19(
    Object.values(actionCatalog.guardInstances)[0]?.id ?? ""
  );
  const [localSelectedScenarioId, setLocalSelectedScenarioId] = useState19("");
  const activeTab = controlledActiveTab ?? localActiveTab;
  const selectedInstanceId = controlledSelectedInstanceId ?? localSelectedInstanceId;
  const selectedTemplateId = controlledSelectedTemplateId ?? localSelectedTemplateId;
  const selectedActionId = controlledSelectedActionId ?? localSelectedActionId;
  const selectedGuardId = controlledSelectedGuardId ?? localSelectedGuardId;
  const selectedScenarioId = controlledSelectedScenarioId ?? localSelectedScenarioId;
  const setActiveTab = (tab) => {
    setLocalActiveTab(tab);
    onActiveTabChange?.(tab);
  };
  const setSelectedInstanceId = (id) => {
    setLocalSelectedInstanceId(id ?? "");
    onSelectedInstanceChange?.(id);
  };
  const setSelectedTemplateId = (id) => {
    setLocalSelectedTemplateId(id ?? "");
    onSelectedTemplateChange?.(id);
  };
  const setSelectedActionId = (id) => {
    setLocalSelectedActionId(id ?? "");
    onSelectedActionChange?.(id);
  };
  const setSelectedGuardId = (id) => {
    setLocalSelectedGuardId(id ?? "");
    onSelectedGuardChange?.(id);
  };
  const setSelectedScenarioId = (id) => {
    setLocalSelectedScenarioId(id ?? "");
    onSelectedScenarioChange?.(id);
  };
  const selectedInstance = (selectedInstanceId ? catalog.instances[selectedInstanceId] : void 0) ?? instances[0] ?? null;
  const selectedDefinition = selectedInstance ? catalog.definitionsById.get(selectedInstance.definitionId) : void 0;
  const selectedTemplate = (selectedTemplateId ? catalog.toastTemplates[selectedTemplateId] : void 0) ?? toastTemplates[0] ?? null;
  const actionInstances = Object.values(actionCatalog.actionInstances).filter(
    (instance) => instance.enabled !== false
  );
  const guardInstances = Object.values(actionCatalog.guardInstances).filter(
    (instance) => instance.enabled !== false
  );
  const selectedAction = (selectedActionId ? actionCatalog.actionInstances[selectedActionId] : void 0) ?? actionInstances[0] ?? null;
  const selectedActionDefinition = selectedAction ? actionCatalog.actionsById.get(selectedAction.definitionId) : void 0;
  const selectedGuard = (selectedGuardId ? actionCatalog.guardInstances[selectedGuardId] : void 0) ?? guardInstances[0] ?? null;
  const selectedGuardDefinition = selectedGuard ? actionCatalog.guardsById.get(selectedGuard.definitionId) : void 0;
  const selectedIntentBindings = selectedInstance ? Object.values(catalog.intents).filter(
    (binding) => binding.surfaceInstanceId === selectedInstance.id
  ) : [];
  const selectedInstanceDeleteBlocked = Boolean(selectedInstance) && !defaultInstanceIds.has(selectedInstance?.id ?? "") && selectedIntentBindings.length > 0;
  const selectedActionSurfaceRequest = selectedAction?.presentation.type === "surface" ? (() => {
    const surfaceInstance = selectedAction.presentation.surfaceInstanceId ? catalog.instances[selectedAction.presentation.surfaceInstanceId] : selectedAction.presentation.intent ? catalog.instances[catalog.intents[selectedAction.presentation.intent]?.surfaceInstanceId ?? ""] : void 0;
    const surfaceDefinition = surfaceInstance ? catalog.definitionsById.get(surfaceInstance.definitionId) : void 0;
    return surfaceDefinition && surfaceInstance ? {
      definition: surfaceDefinition,
      instance: surfaceInstance,
      trigger: selectedAction.presentation,
      props: {
        ...surfaceInstance.props ?? {},
        ...selectedAction.presentation.overrides ?? {}
      },
      payload: selectedAction.presentation.payload ?? {},
      fallbackHref: selectedAction.presentation.fallbackHref
    } : null;
  })() : null;
  const selectedActionFields = getDefinitionFields2(
    selectedActionSurfaceRequest?.definition
  );
  const persistInstances = (nextInstances) => {
    onSiteSettingChange(settingPath("instances"), nextInstances);
  };
  const persistInstance = (instance) => {
    persistInstances({
      ...persistedSettings.instances ?? {},
      [instance.id]: instance
    });
  };
  const persistIntent = (binding) => {
    onSiteSettingChange(settingPath("intents"), {
      ...persistedSettings.intents ?? {},
      [binding.intent]: binding
    });
  };
  const persistTemplate = (template) => {
    onSiteSettingChange(settingPath("toastTemplates"), {
      ...persistedSettings.toastTemplates ?? {},
      [template.id]: template
    });
  };
  const persistActionInstance = (instance) => {
    onSiteSettingChange(interactionSettingPath2("actionInstances"), {
      ...persistedInteractionSettings.actionInstances ?? {},
      [instance.id]: instance
    });
  };
  const persistGuardInstance = (instance) => {
    onSiteSettingChange(interactionSettingPath2("guardInstances"), {
      ...persistedInteractionSettings.guardInstances ?? {},
      [instance.id]: instance
    });
  };
  const setActionOverride = (path, value) => {
    if (!selectedAction) {
      return;
    }
    persistActionInstance({
      ...selectedAction,
      presentation: selectedAction.presentation.type === "surface" ? {
        ...selectedAction.presentation,
        overrides: setValueAtPath(
          selectedAction.presentation.overrides ?? {},
          path,
          value
        )
      } : selectedAction.presentation
    });
  };
  const duplicateInstance = () => {
    if (!selectedInstance) {
      return;
    }
    const nextId = `${selectedInstance.id}:copy-${Date.now().toString(36)}`;
    const duplicate = {
      ...selectedInstance,
      id: nextId,
      label: `${selectedInstance.label} copy`
    };
    persistInstance(duplicate);
    setSelectedInstanceId(nextId);
  };
  const createInstance = (definition) => {
    const defaultInstance = definition.defaultInstances?.[0];
    const nextId = `${definition.id}:custom-${Date.now().toString(36)}`;
    const instance = {
      id: nextId,
      definitionId: definition.id,
      label: `${definition.label} custom`,
      variant: defaultInstance?.variant,
      props: clonePhotonValue(defaultInstance?.props ?? {})
    };
    persistInstance(instance);
    setSelectedInstanceId(nextId);
  };
  const disableInstance = () => {
    if (!selectedInstance) {
      return;
    }
    persistInstance({
      ...selectedInstance,
      enabled: false
    });
    setSelectedInstanceId(
      instances.find((instance) => instance.id !== selectedInstance.id)?.id ?? ""
    );
  };
  const restoreInstance = (instance) => {
    persistInstance({
      ...instance,
      enabled: true
    });
    setSelectedInstanceId(instance.id);
  };
  const deleteSiteOwnedInstance = () => {
    if (!selectedInstance || defaultInstanceIds.has(selectedInstance.id) || selectedIntentBindings.length > 0) {
      return;
    }
    const nextInstances = {
      ...persistedSettings.instances ?? {}
    };
    delete nextInstances[selectedInstance.id];
    persistInstances(nextInstances);
    setSelectedInstanceId(
      instances.find((instance) => instance.id !== selectedInstance.id)?.id ?? ""
    );
  };
  return /* @__PURE__ */ jsx37(
    "section",
    {
      className: "mx-auto w-full max-w-[1240px] px-1 pb-10",
      "data-testid": "photon-interaction-surfaces-surface",
      children: /* @__PURE__ */ jsx37("div", { className: "rounded-[34px] border p-5 sm:p-6", style: shellStyle, children: /* @__PURE__ */ jsxs28("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxs28("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx37(
            "div",
            {
              className: "text-[11px] uppercase tracking-[0.3em]",
              style: { color: "var(--photon-builder-text-soft)" },
              children: "Surfaces mode"
            }
          ),
          /* @__PURE__ */ jsx37("div", { className: "text-2xl font-semibold tracking-[-0.04em] sm:text-3xl", children: "Interactions" }),
          /* @__PURE__ */ jsx37(
            "div",
            {
              className: "max-w-3xl text-sm leading-7",
              style: { color: "var(--photon-builder-text-muted)" },
              children: "Manage package-registered dialogs and notifications that are opened by website actions."
            }
          )
        ] }),
        /* @__PURE__ */ jsx37("div", { className: "flex flex-wrap gap-2", children: [
          { key: "actions", label: "Actions" },
          { key: "guards", label: "Guards" },
          { key: "surfaces", label: "Surfaces" },
          { key: "toasts", label: "Toasts" }
        ].map((tab) => /* @__PURE__ */ jsx37(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab.key),
            className: "cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold",
            style: activeTab === tab.key ? primaryButtonStyle : buttonStyle,
            children: tab.label
          },
          tab.key
        )) }),
        activeTab === "actions" ? /* @__PURE__ */ jsxs28("div", { className: "grid gap-5 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)]", children: [
          /* @__PURE__ */ jsxs28("section", { className: "rounded-[28px] border p-4", style: cardStyle, children: [
            /* @__PURE__ */ jsx37(
              "div",
              {
                className: "mb-3 text-[11px] uppercase tracking-[0.28em]",
                style: { color: "var(--photon-builder-text-soft)" },
                children: "Action instances"
              }
            ),
            /* @__PURE__ */ jsx37("div", { className: "space-y-2", children: actionInstances.map((instance) => /* @__PURE__ */ jsxs28(
              "button",
              {
                type: "button",
                onClick: () => setSelectedActionId(instance.id),
                className: "w-full cursor-pointer rounded-[18px] border px-3 py-3 text-left transition",
                style: selectedAction?.id === instance.id ? activeStyle : fieldStyle,
                children: [
                  /* @__PURE__ */ jsx37("div", { className: "text-sm font-semibold", children: instance.label }),
                  /* @__PURE__ */ jsx37(
                    "div",
                    {
                      className: "mt-1 text-xs",
                      style: { color: "var(--photon-builder-text-muted)" },
                      children: actionCatalog.actionsById.get(instance.definitionId)?.label ?? instance.definitionId
                    }
                  )
                ]
              },
              instance.id
            )) })
          ] }),
          /* @__PURE__ */ jsx37("section", { className: "rounded-[28px] border p-4", style: cardStyle, children: selectedAction ? /* @__PURE__ */ jsxs28("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs28("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs28("div", { children: [
                /* @__PURE__ */ jsx37(
                  "div",
                  {
                    className: "text-[11px] uppercase tracking-[0.28em]",
                    style: { color: "var(--photon-builder-text-soft)" },
                    children: selectedActionDefinition?.label ?? selectedAction.definitionId
                  }
                ),
                /* @__PURE__ */ jsx37("div", { className: "mt-2 text-xl font-semibold", children: selectedAction.label })
              ] }),
              /* @__PURE__ */ jsx37(
                "button",
                {
                  type: "button",
                  onClick: () => executeInteractionAction(selectedAction.presentation),
                  className: "cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold",
                  style: primaryButtonStyle,
                  children: "Preview"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs28("label", { className: "grid gap-2 text-sm font-semibold", children: [
              "Label",
              /* @__PURE__ */ jsx37(
                "input",
                {
                  value: selectedAction.label,
                  onChange: (event) => persistActionInstance({
                    ...selectedAction,
                    label: event.currentTarget.value
                  }),
                  className: "h-11 rounded-[16px] border px-3 text-sm outline-none",
                  style: fieldStyle
                }
              )
            ] }),
            selectedActionDefinition?.previewScenarios?.length ? /* @__PURE__ */ jsx37("div", { className: "flex flex-wrap gap-2", children: selectedActionDefinition.previewScenarios.map(
              (scenario) => /* @__PURE__ */ jsx37(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedScenarioId(scenario.id),
                  className: "cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold",
                  style: selectedScenarioId === scenario.id ? primaryButtonStyle : buttonStyle,
                  children: scenario.label
                },
                scenario.id
              )
            ) }) : null,
            selectedActionSurfaceRequest && selectedActionFields.length ? /* @__PURE__ */ jsx37(
              PhotonFieldEditorList,
              {
                fields: selectedActionFields,
                subjectId: `interaction-action:${selectedAction.id}`,
                getValue: (path) => getValueAtPath(
                  selectedActionSurfaceRequest.props,
                  path
                ),
                onChange: setActionOverride,
                onFocus: (path) => onSiteSettingFocus(
                  interactionSettingPath2(
                    `actionInstances.${selectedAction.id}.presentation.overrides.${path}`
                  )
                )
              }
            ) : null
          ] }) : /* @__PURE__ */ jsx37(
            "div",
            {
              className: "rounded-[20px] border border-dashed px-4 py-8 text-center text-sm",
              style: fieldStyle,
              children: "No action instances are registered yet."
            }
          ) })
        ] }) : null,
        activeTab === "guards" ? /* @__PURE__ */ jsxs28("div", { className: "grid gap-5 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)]", children: [
          /* @__PURE__ */ jsxs28("section", { className: "rounded-[28px] border p-4", style: cardStyle, children: [
            /* @__PURE__ */ jsx37(
              "div",
              {
                className: "mb-3 text-[11px] uppercase tracking-[0.28em]",
                style: { color: "var(--photon-builder-text-soft)" },
                children: "Guard instances"
              }
            ),
            /* @__PURE__ */ jsx37("div", { className: "space-y-2", children: guardInstances.map((instance) => /* @__PURE__ */ jsxs28(
              "button",
              {
                type: "button",
                onClick: () => setSelectedGuardId(instance.id),
                className: "w-full cursor-pointer rounded-[18px] border px-3 py-3 text-left transition",
                style: selectedGuard?.id === instance.id ? activeStyle : fieldStyle,
                children: [
                  /* @__PURE__ */ jsx37("div", { className: "text-sm font-semibold", children: instance.label }),
                  /* @__PURE__ */ jsx37(
                    "div",
                    {
                      className: "mt-1 text-xs",
                      style: { color: "var(--photon-builder-text-muted)" },
                      children: actionCatalog.guardsById.get(instance.definitionId)?.label ?? instance.definitionId
                    }
                  )
                ]
              },
              instance.id
            )) })
          ] }),
          /* @__PURE__ */ jsx37("section", { className: "rounded-[28px] border p-4", style: cardStyle, children: selectedGuard ? /* @__PURE__ */ jsxs28("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs28("div", { children: [
              /* @__PURE__ */ jsx37(
                "div",
                {
                  className: "text-[11px] uppercase tracking-[0.28em]",
                  style: { color: "var(--photon-builder-text-soft)" },
                  children: selectedGuardDefinition?.label ?? selectedGuard.definitionId
                }
              ),
              /* @__PURE__ */ jsx37("div", { className: "mt-2 text-xl font-semibold", children: selectedGuard.label })
            ] }),
            /* @__PURE__ */ jsxs28("label", { className: "grid gap-2 text-sm font-semibold", children: [
              "Label",
              /* @__PURE__ */ jsx37(
                "input",
                {
                  value: selectedGuard.label,
                  onChange: (event) => persistGuardInstance({
                    ...selectedGuard,
                    label: event.currentTarget.value
                  }),
                  className: "h-11 rounded-[16px] border px-3 text-sm outline-none",
                  style: fieldStyle
                }
              )
            ] }),
            /* @__PURE__ */ jsxs28(
              "div",
              {
                className: "rounded-[18px] border px-3 py-2 text-xs leading-6",
                style: fieldStyle,
                children: [
                  "Blocked action:",
                  " ",
                  selectedGuard.action?.type === "surface" ? selectedGuard.action.intent ?? selectedGuard.action.surfaceInstanceId : selectedGuard.action?.type === "toast" ? selectedGuard.action.templateId : selectedGuard.action?.type === "link" ? selectedGuard.action.href : "No action configured"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsx37(
            "div",
            {
              className: "rounded-[20px] border border-dashed px-4 py-8 text-center text-sm",
              style: fieldStyle,
              children: "No guard instances are registered yet."
            }
          ) })
        ] }) : null,
        activeTab === "surfaces" ? /* @__PURE__ */ jsxs28(Fragment7, { children: [
          /* @__PURE__ */ jsxs28("div", { className: "grid gap-5 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)]", children: [
            /* @__PURE__ */ jsxs28("section", { className: "rounded-[28px] border p-4", style: cardStyle, children: [
              /* @__PURE__ */ jsx37(
                "div",
                {
                  className: "mb-3 text-[11px] uppercase tracking-[0.28em]",
                  style: { color: "var(--photon-builder-text-soft)" },
                  children: "Instances"
                }
              ),
              /* @__PURE__ */ jsx37("div", { className: "mb-4 grid gap-2", children: surfaceDefinitions.map((definition) => /* @__PURE__ */ jsxs28(
                "button",
                {
                  type: "button",
                  onClick: () => createInstance(definition),
                  className: "cursor-pointer rounded-full border px-3 py-2 text-left text-xs font-semibold",
                  style: buttonStyle,
                  children: [
                    "Create ",
                    definition.label
                  ]
                },
                definition.id
              )) }),
              /* @__PURE__ */ jsx37("div", { className: "space-y-2", children: instances.map((instance) => {
                const definition = catalog.definitionsById.get(
                  instance.definitionId
                );
                return /* @__PURE__ */ jsxs28(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedInstanceId(instance.id),
                    className: "w-full cursor-pointer rounded-[18px] border px-3 py-3 text-left transition",
                    style: selectedInstance?.id === instance.id ? activeStyle : fieldStyle,
                    children: [
                      /* @__PURE__ */ jsx37("div", { className: "text-sm font-semibold", children: instance.label }),
                      /* @__PURE__ */ jsx37(
                        "div",
                        {
                          className: "mt-1 text-xs",
                          style: { color: "var(--photon-builder-text-muted)" },
                          children: definition?.label ?? instance.definitionId
                        }
                      )
                    ]
                  },
                  instance.id
                );
              }) }),
              disabledInstances.length > 0 ? /* @__PURE__ */ jsxs28("div", { className: "mt-5 space-y-2", children: [
                /* @__PURE__ */ jsx37(
                  "div",
                  {
                    className: "text-[10px] uppercase tracking-[0.26em]",
                    style: { color: "var(--photon-builder-text-soft)" },
                    children: "Disabled"
                  }
                ),
                disabledInstances.map((instance) => /* @__PURE__ */ jsxs28(
                  "div",
                  {
                    className: "rounded-[18px] border px-3 py-3 text-sm",
                    style: fieldStyle,
                    children: [
                      /* @__PURE__ */ jsx37("div", { className: "font-semibold", children: instance.label }),
                      /* @__PURE__ */ jsx37(
                        "button",
                        {
                          type: "button",
                          onClick: () => restoreInstance(instance),
                          className: "mt-2 cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold",
                          style: buttonStyle,
                          children: "Restore"
                        }
                      )
                    ]
                  },
                  instance.id
                ))
              ] }) : null
            ] }),
            /* @__PURE__ */ jsx37("section", { className: "rounded-[28px] border p-4", style: cardStyle, children: selectedInstance && selectedDefinition ? /* @__PURE__ */ jsxs28("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxs28("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
                /* @__PURE__ */ jsxs28("div", { children: [
                  /* @__PURE__ */ jsx37(
                    "div",
                    {
                      className: "text-[11px] uppercase tracking-[0.28em]",
                      style: { color: "var(--photon-builder-text-soft)" },
                      children: selectedDefinition.label
                    }
                  ),
                  /* @__PURE__ */ jsx37("div", { className: "mt-2 text-xl font-semibold", children: selectedInstance.label })
                ] }),
                /* @__PURE__ */ jsxs28("div", { className: "flex flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsx37(
                    "button",
                    {
                      type: "button",
                      onClick: () => openInteractionSurface({
                        surfaceInstanceId: selectedInstance.id
                      }),
                      className: "cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold",
                      style: primaryButtonStyle,
                      children: "Preview"
                    }
                  ),
                  /* @__PURE__ */ jsx37(
                    "button",
                    {
                      type: "button",
                      onClick: duplicateInstance,
                      className: "cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold",
                      style: buttonStyle,
                      children: "Duplicate"
                    }
                  ),
                  /* @__PURE__ */ jsx37(
                    "button",
                    {
                      type: "button",
                      onClick: disableInstance,
                      className: "cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold",
                      style: buttonStyle,
                      children: "Disable"
                    }
                  ),
                  defaultInstanceIds.has(selectedInstance.id) ? null : /* @__PURE__ */ jsx37(
                    "button",
                    {
                      type: "button",
                      onClick: deleteSiteOwnedInstance,
                      disabled: selectedInstanceDeleteBlocked,
                      className: clsx15(
                        "rounded-full border px-4 py-2 text-sm font-semibold",
                        selectedInstanceDeleteBlocked ? "cursor-not-allowed opacity-55" : "cursor-pointer"
                      ),
                      style: buttonStyle,
                      children: "Delete"
                    }
                  )
                ] })
              ] }),
              selectedInstanceDeleteBlocked ? /* @__PURE__ */ jsxs28(
                "div",
                {
                  className: "rounded-[18px] border px-3 py-2 text-xs leading-6",
                  style: fieldStyle,
                  children: [
                    "Rebind",
                    " ",
                    selectedIntentBindings.map((binding) => binding.intent).join(", "),
                    " ",
                    "before deleting this instance."
                  ]
                }
              ) : null,
              /* @__PURE__ */ jsxs28("div", { className: "grid gap-4 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxs28("label", { className: "grid gap-2 text-sm font-semibold", children: [
                  "Label",
                  /* @__PURE__ */ jsx37(
                    "input",
                    {
                      value: selectedInstance.label,
                      onFocus: () => onSiteSettingFocus(
                        settingPath(
                          `instances.${selectedInstance.id}.label`
                        )
                      ),
                      onChange: (event) => persistInstance({
                        ...selectedInstance,
                        label: event.currentTarget.value
                      }),
                      className: "h-11 rounded-[16px] border px-3 text-sm outline-none",
                      style: fieldStyle
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs28("label", { className: "grid gap-2 text-sm font-semibold", children: [
                  "Variant",
                  /* @__PURE__ */ jsxs28(
                    "select",
                    {
                      value: selectedInstance.variant ?? "",
                      onFocus: () => onSiteSettingFocus(
                        settingPath(
                          `instances.${selectedInstance.id}.variant`
                        )
                      ),
                      onChange: (event) => persistInstance({
                        ...selectedInstance,
                        variant: event.currentTarget.value || void 0
                      }),
                      className: "h-11 rounded-[16px] border px-3 text-sm outline-none",
                      style: fieldStyle,
                      children: [
                        /* @__PURE__ */ jsx37("option", { value: "", children: "Default" }),
                        (selectedDefinition.variants ?? []).map((variant) => /* @__PURE__ */ jsx37("option", { value: variant.id, children: variant.label }, variant.id))
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx37(
                PhotonFieldEditorList,
                {
                  fields: getDefinitionFields2(selectedDefinition),
                  subjectId: `interaction-surface:${selectedInstance.id}`,
                  getValue: (path) => getInstanceValue(selectedInstance, path),
                  onChange: (path, value) => persistInstance(
                    setInstanceValue(selectedInstance, path, value)
                  ),
                  onFocus: (path) => onSiteSettingFocus(
                    settingPath(
                      `instances.${selectedInstance.id}.props.${path}`
                    )
                  )
                }
              )
            ] }) : /* @__PURE__ */ jsx37(
              "div",
              {
                className: "rounded-[20px] border border-dashed px-4 py-8 text-center text-sm",
                style: fieldStyle,
                children: "No dialog or panel instances are registered yet."
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs28("section", { className: "rounded-[28px] border p-4", style: cardStyle, children: [
            /* @__PURE__ */ jsx37(
              "div",
              {
                className: "mb-3 text-[11px] uppercase tracking-[0.28em]",
                style: { color: "var(--photon-builder-text-soft)" },
                children: "Intent bindings"
              }
            ),
            /* @__PURE__ */ jsx37("div", { className: "grid gap-3 md:grid-cols-2", children: Object.values(catalog.intents).map((binding) => /* @__PURE__ */ jsxs28(
              "label",
              {
                className: "grid gap-2 rounded-[18px] border p-3 text-sm font-semibold",
                style: fieldStyle,
                children: [
                  /* @__PURE__ */ jsx37("span", { children: binding.intent }),
                  /* @__PURE__ */ jsx37(
                    "select",
                    {
                      value: binding.surfaceInstanceId,
                      onChange: (event) => persistIntent({
                        ...binding,
                        surfaceInstanceId: event.currentTarget.value
                      }),
                      className: "h-10 rounded-[14px] border px-3 text-sm outline-none",
                      style: fieldStyle,
                      children: instances.map((instance) => /* @__PURE__ */ jsx37("option", { value: instance.id, children: instance.label }, instance.id))
                    }
                  )
                ]
              },
              binding.intent
            )) })
          ] })
        ] }) : null,
        activeTab === "toasts" ? /* @__PURE__ */ jsx37("section", { className: "rounded-[28px] border p-4", style: cardStyle, children: /* @__PURE__ */ jsxs28("div", { className: "grid gap-5 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)]", children: [
          /* @__PURE__ */ jsxs28("div", { children: [
            /* @__PURE__ */ jsx37(
              "div",
              {
                className: "mb-3 text-[11px] uppercase tracking-[0.28em]",
                style: { color: "var(--photon-builder-text-soft)" },
                children: "Toast templates"
              }
            ),
            /* @__PURE__ */ jsx37("div", { className: "space-y-2", children: toastTemplates.map((template) => /* @__PURE__ */ jsxs28(
              "button",
              {
                type: "button",
                onClick: () => setSelectedTemplateId(template.id),
                className: "w-full cursor-pointer rounded-[18px] border px-3 py-3 text-left transition",
                style: selectedTemplate?.id === template.id ? activeStyle : fieldStyle,
                children: [
                  /* @__PURE__ */ jsx37("div", { className: "text-sm font-semibold", children: template.label }),
                  /* @__PURE__ */ jsx37(
                    "div",
                    {
                      className: "mt-1 text-xs",
                      style: { color: "var(--photon-builder-text-muted)" },
                      children: template.status ?? "message"
                    }
                  )
                ]
              },
              template.id
            )) })
          ] }),
          selectedTemplate ? /* @__PURE__ */ jsxs28("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx37("div", { className: "flex flex-wrap justify-end gap-2", children: /* @__PURE__ */ jsx37(
              "button",
              {
                type: "button",
                onClick: () => showInteractionToast({
                  templateId: selectedTemplate.id
                }),
                className: "cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold",
                style: primaryButtonStyle,
                children: "Preview toast"
              }
            ) }),
            /* @__PURE__ */ jsx37(
              PhotonFieldEditorList,
              {
                fields: [
                  {
                    path: "title",
                    label: "Title",
                    kind: "text",
                    group: "content",
                    localization: "localized"
                  },
                  {
                    path: "description",
                    label: "Description",
                    kind: "textarea",
                    group: "content",
                    localization: "localized"
                  },
                  {
                    path: "status",
                    label: "Status",
                    kind: "select",
                    group: "style",
                    localization: "shared",
                    options: [
                      { label: "Message", value: "message" },
                      { label: "Success", value: "success" },
                      { label: "Info", value: "info" },
                      { label: "Warning", value: "warning" },
                      { label: "Error", value: "error" }
                    ]
                  }
                ],
                subjectId: `interaction-toast:${selectedTemplate.id}`,
                getValue: (path) => getValueAtPath(selectedTemplate, path),
                onChange: (path, value) => persistTemplate(
                  setValueAtPath(
                    selectedTemplate,
                    path,
                    value
                  )
                ),
                onFocus: (path) => onSiteSettingFocus(
                  settingPath(
                    `toastTemplates.${selectedTemplate.id}.${path}`
                  )
                )
              }
            )
          ] }) : /* @__PURE__ */ jsx37(
            "div",
            {
              className: "rounded-[20px] border border-dashed px-4 py-8 text-center text-sm",
              style: fieldStyle,
              children: "No toast templates are registered yet."
            }
          )
        ] }) }) : null,
        /* @__PURE__ */ jsxs28("section", { className: "rounded-[28px] border p-4", style: cardStyle, children: [
          /* @__PURE__ */ jsx37(
            "div",
            {
              className: "mb-3 text-[11px] uppercase tracking-[0.28em]",
              style: { color: "var(--photon-builder-text-soft)" },
              children: "Registered definitions"
            }
          ),
          /* @__PURE__ */ jsx37("div", { className: "flex flex-wrap gap-2", children: catalog.definitions.map((definition) => /* @__PURE__ */ jsx37(
            "span",
            {
              className: clsx15(
                "rounded-full border px-3 py-1 text-xs font-semibold"
              ),
              style: buttonStyle,
              children: definition.label
            },
            definition.id
          )) })
        ] })
      ] }) })
    }
  );
};

// src/studio/page-settings-surface/page-settings-surface.tsx
import clsx16 from "clsx";
import { useEffect as useEffect14, useMemo as useMemo7, useState as useState20 } from "react";
import { Fragment as Fragment8, jsx as jsx38, jsxs as jsxs29 } from "react/jsx-runtime";
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
  borderColor: "var(--photon-builder-border)",
  background: "var(--photon-builder-panel-muted)",
  color: "var(--photon-builder-text)"
};
var subtleChipStyle = {
  borderColor: "var(--photon-builder-border)",
  background: "var(--photon-builder-field)",
  color: "var(--photon-builder-text-soft)"
};
var emphasizedChipStyle = {
  borderColor: "var(--photon-builder-border-strong)",
  background: "var(--photon-builder-accent-soft)",
  color: "var(--photon-builder-accent-text)"
};
var warningCardStyle = {
  borderColor: "var(--photon-builder-border-strong)",
  background: "linear-gradient(180deg, color-mix(in srgb, var(--photon-builder-accent) 12%, transparent), color-mix(in srgb, var(--photon-builder-panel-solid) 82%, transparent))",
  color: "var(--photon-builder-text)"
};
var SettingsCard = ({
  eyebrow,
  title,
  description,
  children
}) => /* @__PURE__ */ jsxs29("section", { className: "rounded-[28px] border px-5 py-5", style: surfaceCardStyle, children: [
  /* @__PURE__ */ jsx38(
    "div",
    {
      className: "text-[11px] uppercase tracking-[0.28em]",
      style: { color: "var(--photon-builder-text-soft)" },
      children: eyebrow
    }
  ),
  /* @__PURE__ */ jsx38(
    "div",
    {
      className: "mt-4 text-2xl font-semibold tracking-[-0.04em]",
      style: { color: "var(--photon-builder-text)" },
      children: title
    }
  ),
  description ? /* @__PURE__ */ jsx38(
    "div",
    {
      className: "mt-3 text-sm leading-7",
      style: { color: "var(--photon-builder-text-muted)" },
      children: description
    }
  ) : null,
  children ? /* @__PURE__ */ jsx38("div", { className: "mt-5", children }) : null
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
  const availableScopes = useMemo7(
    () => resolveAvailableScopes(pageSettings),
    [pageSettings]
  );
  const [activeTab, setActiveTab] = useState20("page");
  const [activeScope, setActiveScope] = useState20(availableScopes[0] ?? "page");
  const siteSubtabs = useMemo7(
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
  const [activeSiteTab, setActiveSiteTab] = useState20(
    siteSubtabs[0]?.key ?? "design"
  );
  useEffect14(() => {
    if (availableScopes.length === 0) {
      setActiveTab("site");
      return;
    }
    if (!availableScopes.includes(activeScope)) {
      setActiveScope(availableScopes[0]);
    }
  }, [activeScope, availableScopes]);
  useEffect14(() => {
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
  const siteDesignPanel = siteSettingsPanels.find(
    (panel) => panel.key === "design"
  );
  const siteLocalesPanel = siteSettingsPanels.find(
    (panel) => panel.key === "locales"
  );
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
    return /* @__PURE__ */ jsxs29(
      "section",
      {
        className: "rounded-[28px] border px-5 py-5",
        style: surfaceCardStyle,
        "data-testid": `photon-site-settings-panel-${panel.key}${viewMode ? `-${viewMode}` : ""}`,
        children: [
          /* @__PURE__ */ jsxs29("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx38(
              "div",
              {
                className: "text-[11px] uppercase tracking-[0.28em]",
                style: { color: "var(--photon-builder-text-soft)" },
                children: panel.label
              }
            ),
            panel.description ? /* @__PURE__ */ jsx38(
              "div",
              {
                className: "mt-2 text-sm leading-6",
                style: { color: "var(--photon-builder-text-muted)" },
                children: panel.description
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsx38(
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
  return /* @__PURE__ */ jsx38(
    "section",
    {
      className: "mx-auto w-full max-w-[1240px] px-1 pb-10",
      "data-testid": "photon-page-settings-surface",
      children: /* @__PURE__ */ jsx38(
        "div",
        {
          className: "rounded-[34px] border p-5 sm:p-6",
          style: {
            borderColor: "var(--photon-builder-border)",
            background: "linear-gradient(180deg, var(--photon-builder-panel-solid), var(--photon-builder-panel))",
            boxShadow: "var(--photon-builder-shadow)",
            color: "var(--photon-builder-text)"
          },
          "data-testid": "photon-builder-settings-shell",
          children: /* @__PURE__ */ jsxs29("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxs29("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
              /* @__PURE__ */ jsxs29("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx38(
                  "div",
                  {
                    className: "text-[11px] uppercase tracking-[0.3em]",
                    style: { color: "var(--photon-builder-text-soft)" },
                    children: "Settings mode"
                  }
                ),
                /* @__PURE__ */ jsx38(
                  "div",
                  {
                    className: "mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl",
                    style: { color: "var(--photon-builder-text)" },
                    children: "Website settings"
                  }
                ),
                /* @__PURE__ */ jsx38(
                  "div",
                  {
                    className: "mt-2 max-w-3xl text-sm leading-7",
                    style: { color: "var(--photon-builder-text-muted)" },
                    children: "Switch between route-specific settings and shared site design without leaving the live website surface."
                  }
                )
              ] }),
              /* @__PURE__ */ jsx38(
                "div",
                {
                  className: "inline-flex w-full max-w-full flex-wrap rounded-full border p-1 sm:w-auto",
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    background: "var(--photon-builder-field)"
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
                  ].map((tab) => /* @__PURE__ */ jsx38(
                    "button",
                    {
                      type: "button",
                      onClick: () => !tab.disabled && setActiveTab(tab.key),
                      disabled: tab.disabled,
                      "data-testid": `photon-settings-tab-${tab.key}`,
                      className: clsx16(
                        "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-35"
                      ),
                      style: activeTab === tab.key ? {
                        background: "var(--photon-builder-accent-soft)",
                        color: "var(--photon-builder-accent-text)"
                      } : { color: "var(--photon-builder-text-muted)" },
                      children: tab.label
                    },
                    tab.key
                  ))
                }
              )
            ] }),
            activeTab === "page" && availableScopes.length > 0 ? /* @__PURE__ */ jsxs29(Fragment8, { children: [
              /* @__PURE__ */ jsx38(
                "div",
                {
                  className: "inline-flex w-full max-w-full flex-wrap rounded-full border p-1 sm:w-auto",
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    background: "var(--photon-builder-field)"
                  },
                  children: availableScopes.map((scope) => /* @__PURE__ */ jsx38(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveScope(scope),
                      "data-testid": `photon-settings-scope-${scope}`,
                      className: clsx16(
                        "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition"
                      ),
                      style: activeScope === scope ? {
                        background: "var(--photon-builder-accent-soft)",
                        color: "var(--photon-builder-accent-text)"
                      } : { color: "var(--photon-builder-text-muted)" },
                      children: scopeMeta[scope].label
                    },
                    scope
                  ))
                }
              ),
              /* @__PURE__ */ jsx38(
                SettingsCard,
                {
                  eyebrow: scopeMeta[activeScope].eyebrow,
                  title: scopeTitle,
                  description: scopeMeta[activeScope].description,
                  children: /* @__PURE__ */ jsxs29("div", { className: "flex flex-wrap items-center gap-2", children: [
                    /* @__PURE__ */ jsx38(
                      "div",
                      {
                        className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                        style: subtleChipStyle,
                        children: scopeMeta[activeScope].label
                      }
                    ),
                    primaryRoute ? /* @__PURE__ */ jsx38(
                      "div",
                      {
                        className: "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]",
                        style: subtleChipStyle,
                        children: primaryRoute
                      }
                    ) : null,
                    activeScope === "template" && currentPage?.isDynamic ? /* @__PURE__ */ jsx38(
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
              /* @__PURE__ */ jsxs29(
                "section",
                {
                  className: "rounded-[28px] border px-5 py-5",
                  style: surfaceCardStyle,
                  children: [
                    /* @__PURE__ */ jsx38(
                      "div",
                      {
                        className: "mb-4 text-[11px] uppercase tracking-[0.28em]",
                        style: { color: "var(--photon-builder-text-soft)" },
                        children: "Basics"
                      }
                    ),
                    activeScope === "page" ? /* @__PURE__ */ jsx38(
                      PhotonFieldEditorList,
                      {
                        fields: staticPageFields,
                        subjectId: "page-settings",
                        getValue: (path) => getPageSettingValue(`${activeScope}.${path}`),
                        onChange: (path, value) => onPageSettingChange(`${activeScope}.${path}`, value),
                        onFocus: (path) => onPageSettingFocus(`${activeScope}.${path}`)
                      }
                    ) : null,
                    activeScope === "template" ? /* @__PURE__ */ jsxs29("div", { className: "space-y-4", children: [
                      /* @__PURE__ */ jsx38(
                        "div",
                        {
                          className: "rounded-2xl border px-4 py-3 text-sm leading-6",
                          style: warningCardStyle,
                          children: "Template structure stays shared here. The current route below is the live record you are previewing while editing that shared template."
                        }
                      ),
                      /* @__PURE__ */ jsxs29("div", { className: "grid gap-3 md:grid-cols-2", children: [
                        /* @__PURE__ */ jsxs29(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: surfaceCardStyle,
                            children: [
                              /* @__PURE__ */ jsx38(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--photon-builder-text-soft)" },
                                  children: "Name"
                                }
                              ),
                              /* @__PURE__ */ jsx38(
                                "div",
                                {
                                  className: "mt-2 text-sm font-semibold",
                                  style: { color: "var(--photon-builder-text)" },
                                  children: scopeTitle
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs29(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: surfaceCardStyle,
                            children: [
                              /* @__PURE__ */ jsx38(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--photon-builder-text-soft)" },
                                  children: "Route pattern"
                                }
                              ),
                              /* @__PURE__ */ jsx38(
                                "div",
                                {
                                  className: "mt-2 font-mono text-sm",
                                  style: { color: "var(--photon-builder-text-muted)" },
                                  children: primaryRoute ?? "Not available"
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs29(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3 md:col-span-2",
                            style: surfaceCardStyle,
                            children: [
                              /* @__PURE__ */ jsx38(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--photon-builder-text-soft)" },
                                  children: "Current route"
                                }
                              ),
                              /* @__PURE__ */ jsx38(
                                "div",
                                {
                                  className: "mt-2 font-mono text-sm",
                                  style: { color: "var(--photon-builder-text-muted)" },
                                  children: secondaryRoute ?? currentPage?.route ?? "Not available"
                                }
                              )
                            ]
                          }
                        )
                      ] })
                    ] }) : null,
                    activeScope === "record" ? /* @__PURE__ */ jsxs29("div", { className: "space-y-4", children: [
                      /* @__PURE__ */ jsx38(
                        "div",
                        {
                          className: "rounded-2xl border px-4 py-3 text-sm leading-6",
                          style: warningCardStyle,
                          children: "Record settings affect only the live entity behind the current route. Shared builder structure remains owned by the template scope."
                        }
                      ),
                      /* @__PURE__ */ jsxs29("div", { className: "grid gap-3 md:grid-cols-2", children: [
                        /* @__PURE__ */ jsxs29(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: surfaceCardStyle,
                            children: [
                              /* @__PURE__ */ jsx38(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--photon-builder-text-soft)" },
                                  children: "Current route"
                                }
                              ),
                              /* @__PURE__ */ jsx38(
                                "div",
                                {
                                  className: "mt-2 font-mono text-sm",
                                  style: { color: "var(--photon-builder-text-muted)" },
                                  children: primaryRoute ?? currentPage?.route ?? "Not available"
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs29(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: surfaceCardStyle,
                            children: [
                              /* @__PURE__ */ jsx38(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--photon-builder-text-soft)" },
                                  children: "Record key"
                                }
                              ),
                              /* @__PURE__ */ jsx38(
                                "div",
                                {
                                  className: "mt-2 text-sm font-semibold",
                                  style: { color: "var(--photon-builder-text)" },
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
                return /* @__PURE__ */ jsxs29(
                  "section",
                  {
                    className: "rounded-[28px] border px-5 py-5",
                    style: surfaceCardStyle,
                    children: [
                      /* @__PURE__ */ jsxs29("div", { className: "mb-4", children: [
                        /* @__PURE__ */ jsx38(
                          "div",
                          {
                            className: "text-[11px] uppercase tracking-[0.28em]",
                            style: { color: "var(--photon-builder-text-soft)" },
                            children: panel.label
                          }
                        ),
                        panel.description ? /* @__PURE__ */ jsx38(
                          "div",
                          {
                            className: "mt-2 text-sm leading-6",
                            style: { color: "var(--photon-builder-text-muted)" },
                            children: panel.description
                          }
                        ) : null
                      ] }),
                      /* @__PURE__ */ jsx38(
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
            activeTab === "site" ? /* @__PURE__ */ jsxs29(Fragment8, { children: [
              /* @__PURE__ */ jsx38(
                SettingsCard,
                {
                  eyebrow: "Site settings",
                  title: "Shared design system",
                  description: sitePanelDescription,
                  children: /* @__PURE__ */ jsxs29("div", { className: "flex flex-wrap items-center gap-2", children: [
                    /* @__PURE__ */ jsxs29(
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
                    Object.values(site.regions).map((region) => /* @__PURE__ */ jsx38(
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
              /* @__PURE__ */ jsx38(
                "div",
                {
                  className: "inline-flex w-full max-w-full flex-wrap rounded-full border p-1 sm:w-auto",
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    background: "var(--photon-builder-field)"
                  },
                  "data-testid": "photon-site-settings-subtabs",
                  children: siteSubtabs.map((tab) => /* @__PURE__ */ jsx38(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveSiteTab(tab.key),
                      "data-testid": `photon-site-settings-subtab-${tab.key}`,
                      className: "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition",
                      style: activeSiteTab === tab.key ? {
                        background: "var(--photon-builder-accent-soft)",
                        color: "var(--photon-builder-accent-text)"
                      } : { color: "var(--photon-builder-text-muted)" },
                      children: tab.label
                    },
                    tab.key
                  ))
                }
              ),
              activeSiteTab === "design" ? renderSitePanel(siteDesignPanel, "curated") : null,
              activeSiteTab === "advanced-design" ? renderSitePanel(siteDesignPanel, "advanced") : null,
              activeSiteTab === "locales" ? siteLocalesPanel ? renderSitePanel(siteLocalesPanel) : remainingSitePanels.length > 0 ? remainingSitePanels.map((panel) => renderSitePanel(panel)) : /* @__PURE__ */ jsxs29(
                "section",
                {
                  className: "rounded-[28px] border px-5 py-5",
                  style: surfaceCardStyle,
                  "data-testid": "photon-site-settings-panel-locales-empty",
                  children: [
                    /* @__PURE__ */ jsx38(
                      "div",
                      {
                        className: "text-[11px] uppercase tracking-[0.28em]",
                        style: { color: "var(--photon-builder-text-soft)" },
                        children: "Locales"
                      }
                    ),
                    /* @__PURE__ */ jsx38(
                      "div",
                      {
                        className: "mt-3 text-sm leading-6",
                        style: { color: "var(--photon-builder-text-muted)" },
                        children: "The locales settings panel is not registered in this build."
                      }
                    )
                  ]
                }
              ) : null,
              siteWorkspaceSubtab ? /* @__PURE__ */ jsxs29(
                "section",
                {
                  className: "rounded-[28px] border px-5 py-5",
                  style: surfaceCardStyle,
                  "data-testid": `photon-site-settings-panel-${siteWorkspaceSubtab.key}`,
                  children: [
                    /* @__PURE__ */ jsxs29("div", { className: "mb-4", children: [
                      /* @__PURE__ */ jsx38(
                        "div",
                        {
                          className: "text-[11px] uppercase tracking-[0.28em]",
                          style: { color: "var(--photon-builder-text-soft)" },
                          children: siteWorkspaceSubtab.label
                        }
                      ),
                      siteWorkspaceSubtab.description ? /* @__PURE__ */ jsx38(
                        "div",
                        {
                          className: "mt-2 text-sm leading-6",
                          style: { color: "var(--photon-builder-text-muted)" },
                          children: siteWorkspaceSubtab.description
                        }
                      ) : null
                    ] }),
                    /* @__PURE__ */ jsx38(siteWorkspaceSubtab.component, {})
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
import clsx17 from "clsx";
import { ChevronDown as ChevronDown9, ChevronRight as ChevronRight4 } from "lucide-react";
import { memo as memo5, useEffect as useEffect15, useMemo as useMemo8, useState as useState21 } from "react";
import { Fragment as Fragment9, jsx as jsx39, jsxs as jsxs30 } from "react/jsx-runtime";
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
  const document2 = usePhotonStore((state) => state.document);
  const { contentLocale, editableLocales, translate } = usePhotonI18n();
  const selectedBlock = usePhotonStore(
    (state) => getPhotonSelectedBlock(state)
  );
  const getFieldValue = usePhotonStore((state) => state.getFieldValue);
  const updateFieldValue = usePhotonStore(
    (state) => state.updateFieldValue
  );
  const selectField = usePhotonStore((state) => state.selectField);
  const [activeTab, setActiveTab] = useState21("block");
  const [showBlockJson, setShowBlockJson] = useState21(false);
  const [showDocumentJson, setShowDocumentJson] = useState21(false);
  const hasBlockContext = selectedBlock !== null || inspectorDefinition !== null;
  const pageTabLabel = currentPage?.isDynamic ? translate("photon.studio.inspector.templateTab", "Template") : translate("photon.studio.inspector.pageTab", "Page");
  const templateSettings = typeof pageSettings.template === "object" && pageSettings.template !== null ? pageSettings.template : {};
  const pageSettingsSummary = typeof pageSettings.page === "object" && pageSettings.page !== null ? pageSettings.page : {};
  const summarySettings = currentPage?.isDynamic ? templateSettings : pageSettingsSummary;
  const summaryName = readString2(summarySettings, "name") ?? currentPage?.name ?? document2.name;
  const summaryRoute = (currentPage?.isDynamic ? readString2(summarySettings, "pathPattern") : readString2(summarySettings, "path")) ?? currentPage?.routePattern ?? currentPage?.route ?? document2.route;
  const currentRoute = readString2(summarySettings, "currentPath") ?? currentPage?.route;
  const selectedBlockJson = useMemo8(
    () => showBlockJson && selectedBlock ? JSON.stringify(selectedBlock, null, 2) : "",
    [showBlockJson, selectedBlock]
  );
  const documentJson = useMemo8(
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
  useEffect15(() => {
    if (selectedBlock) {
      setActiveTab("block");
    }
  }, [selectedBlock]);
  return /* @__PURE__ */ jsxs30(
    "div",
    {
      className: "flex h-full flex-col",
      style: {
        background: "var(--photon-builder-shell-muted)",
        color: "var(--photon-builder-text)"
      },
      children: [
        /* @__PURE__ */ jsx39(
          "div",
          {
            className: "border-b px-5 py-5",
            style: {
              borderColor: "var(--photon-builder-border)",
              background: "var(--photon-builder-shell-strong)"
            },
            children: /* @__PURE__ */ jsxs30("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxs30("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx39(
                  "div",
                  {
                    className: "text-[11px] uppercase tracking-[0.28em]",
                    style: { color: "var(--photon-builder-text-soft)" },
                    children: translate("photon.studio.inspector.title", "Inspector")
                  }
                ),
                /* @__PURE__ */ jsxs30(
                  "div",
                  {
                    className: "mt-4 inline-flex rounded-full border p-1",
                    style: {
                      borderColor: "var(--photon-builder-border)",
                      background: "var(--photon-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx39(
                        "button",
                        {
                          type: "button",
                          onClick: () => setActiveTab("block"),
                          className: clsx17(
                            "cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition"
                          ),
                          style: activeTab === "block" ? {
                            background: "var(--photon-builder-accent-soft)",
                            color: "var(--photon-builder-accent-text)"
                          } : { color: "var(--photon-builder-text-muted)" },
                          children: translate("photon.studio.inspector.blockTab", "Block")
                        }
                      ),
                      /* @__PURE__ */ jsx39(
                        "button",
                        {
                          type: "button",
                          onClick: () => setActiveTab("page"),
                          className: clsx17(
                            "cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition"
                          ),
                          style: activeTab === "page" ? {
                            background: "var(--photon-builder-accent-soft)",
                            color: "var(--photon-builder-accent-text)"
                          } : { color: "var(--photon-builder-text-muted)" },
                          children: pageTabLabel
                        }
                      )
                    ]
                  }
                )
              ] }),
              onCollapse ? /* @__PURE__ */ jsx39(
                "button",
                {
                  type: "button",
                  onClick: onCollapse,
                  className: "cursor-pointer rounded-full border p-2 transition",
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    background: "var(--photon-builder-panel-muted)",
                    color: "var(--photon-builder-text-soft)"
                  },
                  children: /* @__PURE__ */ jsx39(ChevronRight4, { className: "h-4 w-4" })
                }
              ) : null
            ] })
          }
        ),
        /* @__PURE__ */ jsxs30(
          "div",
          {
            className: "flex-1 space-y-5 overflow-y-auto px-4 py-4",
            style: { background: "var(--photon-builder-shell-muted)" },
            children: [
              activeTab === "block" && !selectedBlock && inspectorDefinition ? /* @__PURE__ */ jsxs30(Fragment9, { children: [
                /* @__PURE__ */ jsxs30(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--photon-builder-border)",
                      background: "var(--photon-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx39(
                        "div",
                        {
                          className: "text-[11px] uppercase tracking-[0.28em]",
                          style: { color: "var(--photon-builder-text-soft)" },
                          children: "Palette block"
                        }
                      ),
                      /* @__PURE__ */ jsx39(
                        "div",
                        {
                          className: "mt-3 text-lg font-semibold",
                          style: { color: "var(--photon-builder-text)" },
                          children: inspectorDefinition.label
                        }
                      ),
                      /* @__PURE__ */ jsxs30("div", { className: "mt-1 flex flex-wrap items-center gap-2", children: [
                        /* @__PURE__ */ jsx39(
                          "div",
                          {
                            className: "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]",
                            style: {
                              borderColor: "var(--photon-builder-border)",
                              background: "var(--photon-builder-field)",
                              color: "var(--photon-builder-text-soft)"
                            },
                            children: inspectorDefinition.module
                          }
                        ),
                        /* @__PURE__ */ jsx39(
                          "div",
                          {
                            className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                            style: {
                              borderColor: "var(--photon-builder-border)",
                              background: "var(--photon-builder-field)",
                              color: "var(--photon-builder-text-soft)"
                            },
                            children: translatePhotonPaletteCategory(
                              inspectorDefinition.category,
                              translate
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxs30(
                          "div",
                          {
                            className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                            style: {
                              borderColor: "var(--photon-builder-border-strong)",
                              background: "var(--photon-builder-accent-strong)",
                              color: "var(--photon-builder-accent)"
                            },
                            children: [
                              inspectorDefinition.fieldCount,
                              " settings"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx39(
                        "div",
                        {
                          className: "mt-4 text-sm leading-6",
                          style: { color: "var(--photon-builder-text-muted)" },
                          children: inspectorDefinition.description
                        }
                      )
                    ]
                  }
                ),
                Object.entries(inspectorGroups).map(([groupKey, fields]) => /* @__PURE__ */ jsxs30(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--photon-builder-border)",
                      background: "var(--photon-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsxs30("div", { className: "mb-4 flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsx39(
                          "div",
                          {
                            className: "text-[11px] uppercase tracking-[0.28em]",
                            style: { color: "var(--photon-builder-text-soft)" },
                            children: translate(
                              FIELD_GROUP_LABELS[groupKey] ?? FIELD_GROUP_LABELS.misc,
                              translatePhotonFieldGroup(groupKey, translate)
                            )
                          }
                        ),
                        /* @__PURE__ */ jsx39(
                          "div",
                          {
                            className: "font-mono text-[10px] uppercase tracking-[0.24em]",
                            style: { color: "var(--photon-builder-text-ghost)" },
                            children: fields.length
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx39("div", { className: "space-y-3", children: fields.map((field) => /* @__PURE__ */ jsxs30(
                        "div",
                        {
                          className: "rounded-2xl border px-4 py-3",
                          style: {
                            borderColor: "var(--photon-builder-border)",
                            background: "var(--photon-builder-field)"
                          },
                          children: [
                            /* @__PURE__ */ jsxs30("div", { className: "flex items-center justify-between gap-3", children: [
                              /* @__PURE__ */ jsx39(
                                "div",
                                {
                                  className: "text-sm font-semibold",
                                  style: { color: "var(--photon-builder-text)" },
                                  children: field.label
                                }
                              ),
                              /* @__PURE__ */ jsx39(
                                "div",
                                {
                                  className: "rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.22em]",
                                  style: {
                                    borderColor: "var(--photon-builder-border)",
                                    color: "var(--photon-builder-text-soft)"
                                  },
                                  children: field.kind
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsx39(
                              "div",
                              {
                                className: "mt-2 font-mono text-[10px] uppercase tracking-[0.24em]",
                                style: { color: "var(--photon-builder-text-ghost)" },
                                children: field.path
                              }
                            ),
                            field.description ? /* @__PURE__ */ jsx39(
                              "div",
                              {
                                className: "mt-2 text-xs leading-5",
                                style: { color: "var(--photon-builder-text-soft)" },
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
              activeTab === "block" && selectedBlock ? /* @__PURE__ */ jsxs30(Fragment9, { children: [
                /* @__PURE__ */ jsxs30(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--photon-builder-border)",
                      background: "var(--photon-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx39(
                        "div",
                        {
                          className: "text-[11px] uppercase tracking-[0.28em]",
                          style: { color: "var(--photon-builder-text-soft)" },
                          children: "Selected block"
                        }
                      ),
                      /* @__PURE__ */ jsx39(
                        "div",
                        {
                          className: "mt-3 text-lg font-semibold",
                          style: { color: "var(--photon-builder-text)" },
                          children: inspectorDefinition?.label ?? selectedBlock.type
                        }
                      ),
                      /* @__PURE__ */ jsxs30("div", { className: "mt-1 flex flex-wrap items-center gap-2", children: [
                        /* @__PURE__ */ jsx39(
                          "div",
                          {
                            className: "font-mono text-[11px] uppercase tracking-[0.24em]",
                            style: { color: "var(--photon-builder-text-ghost)" },
                            children: selectedBlock.module
                          }
                        ),
                        inspectorDefinition ? /* @__PURE__ */ jsx39(
                          "div",
                          {
                            className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                            style: {
                              borderColor: "var(--photon-builder-border)",
                              background: "var(--photon-builder-field)",
                              color: "var(--photon-builder-text-soft)"
                            },
                            children: translatePhotonPaletteCategory(
                              inspectorDefinition.category,
                              translate
                            )
                          }
                        ) : null
                      ] }),
                      inspectorDefinition?.description ? /* @__PURE__ */ jsx39(
                        "div",
                        {
                          className: "mt-4 text-sm leading-6",
                          style: { color: "var(--photon-builder-text-muted)" },
                          children: inspectorDefinition.description
                        }
                      ) : null,
                      selectedFieldPath ? /* @__PURE__ */ jsxs30(
                        "div",
                        {
                          className: "mt-4 rounded-2xl border px-3 py-3 text-sm",
                          style: {
                            borderColor: "var(--photon-builder-border-strong)",
                            background: "var(--photon-builder-accent-strong)",
                            color: "var(--photon-builder-accent)"
                          },
                          children: [
                            "Active field:",
                            " ",
                            /* @__PURE__ */ jsx39("span", { className: "font-mono", children: selectedFieldPath })
                          ]
                        }
                      ) : null
                    ]
                  }
                ),
                Object.entries(inspectorGroups).map(([groupKey, fields]) => /* @__PURE__ */ jsxs30(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--photon-builder-border)",
                      background: "var(--photon-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx39(
                        "div",
                        {
                          className: "mb-4 text-[11px] uppercase tracking-[0.28em]",
                          style: { color: "var(--photon-builder-text-soft)" },
                          children: translate(
                            FIELD_GROUP_LABELS[groupKey] ?? FIELD_GROUP_LABELS.misc,
                            translatePhotonFieldGroup(groupKey, translate)
                          )
                        }
                      ),
                      groupKey === "content" && editableLocales.length > 1 && fields.some((field) => fieldSupportsLocalization(field)) ? /* @__PURE__ */ jsx39(
                        "div",
                        {
                          className: "mb-4 inline-flex flex-wrap rounded-full border p-1",
                          style: {
                            borderColor: "var(--photon-builder-border)",
                            background: "var(--photon-builder-panel)"
                          },
                          children: editableLocales.map((locale) => /* @__PURE__ */ jsx39(
                            "button",
                            {
                              type: "button",
                              onClick: () => onContentLocaleChange?.(locale.code),
                              className: "cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition",
                              style: locale.code === contentLocale ? {
                                background: "var(--photon-builder-accent-soft)",
                                color: "var(--photon-builder-accent-text)"
                              } : { color: "var(--photon-builder-text-muted)" },
                              children: locale.code
                            },
                            locale.code
                          ))
                        }
                      ) : null,
                      /* @__PURE__ */ jsx39("div", { className: "space-y-4", children: fields.map((field) => /* @__PURE__ */ jsx39(
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
                /* @__PURE__ */ jsxs30(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--photon-builder-border)",
                      background: "var(--photon-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsxs30(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowBlockJson((current) => !current),
                          className: "flex w-full cursor-pointer items-center justify-between gap-3 text-left",
                          children: [
                            /* @__PURE__ */ jsx39(
                              "div",
                              {
                                className: "text-[11px] uppercase tracking-[0.28em]",
                                style: { color: "var(--photon-builder-text-soft)" },
                                children: "Raw block manifest"
                              }
                            ),
                            showBlockJson ? /* @__PURE__ */ jsx39(
                              ChevronDown9,
                              {
                                className: "h-4 w-4",
                                style: { color: "var(--photon-builder-text-soft)" }
                              }
                            ) : /* @__PURE__ */ jsx39(
                              ChevronRight4,
                              {
                                className: "h-4 w-4",
                                style: { color: "var(--photon-builder-text-soft)" }
                              }
                            )
                          ]
                        }
                      ),
                      showBlockJson ? /* @__PURE__ */ jsx39(
                        "pre",
                        {
                          className: "mt-4 h-[320px] overflow-x-auto rounded-2xl border p-4 text-xs leading-6",
                          style: {
                            borderColor: "var(--photon-builder-border)",
                            background: "var(--photon-builder-field)",
                            color: "var(--photon-builder-text-muted)"
                          },
                          children: selectedBlockJson
                        }
                      ) : null
                    ]
                  }
                )
              ] }) : null,
              activeTab === "block" ? /* @__PURE__ */ jsxs30(Fragment9, { children: [
                /* @__PURE__ */ jsxs30(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--photon-builder-border)",
                      background: "var(--photon-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsxs30(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowDocumentJson((current) => !current),
                          className: "flex w-full cursor-pointer items-center justify-between gap-3 text-left",
                          children: [
                            /* @__PURE__ */ jsx39(
                              "div",
                              {
                                className: "text-[11px] uppercase tracking-[0.28em]",
                                style: { color: "var(--photon-builder-text-soft)" },
                                children: "Document JSON"
                              }
                            ),
                            showDocumentJson ? /* @__PURE__ */ jsx39(
                              ChevronDown9,
                              {
                                className: "h-4 w-4",
                                style: { color: "var(--photon-builder-text-soft)" }
                              }
                            ) : /* @__PURE__ */ jsx39(
                              ChevronRight4,
                              {
                                className: "h-4 w-4",
                                style: { color: "var(--photon-builder-text-soft)" }
                              }
                            )
                          ]
                        }
                      ),
                      showDocumentJson ? /* @__PURE__ */ jsx39(
                        "pre",
                        {
                          className: "mt-4 max-h-[320px] overflow-auto rounded-2xl border p-4 text-xs leading-6",
                          style: {
                            borderColor: "var(--photon-builder-border)",
                            background: "var(--photon-builder-field)",
                            color: "var(--photon-builder-text-muted)"
                          },
                          children: documentJson
                        }
                      ) : null
                    ]
                  }
                ),
                !definitionFields.length && !hasBlockContext ? /* @__PURE__ */ jsx39(
                  "section",
                  {
                    className: "rounded-[24px] border border-dashed px-4 py-4 text-sm leading-6",
                    style: {
                      borderColor: "var(--photon-builder-border)",
                      color: "var(--photon-builder-text-muted)"
                    },
                    children: "Builder tip: select any live block, click any palette block, or drop a new block into one of the visible plus zones to inspect it here."
                  }
                ) : null
              ] }) : null,
              activeTab === "page" ? /* @__PURE__ */ jsxs30(Fragment9, { children: [
                /* @__PURE__ */ jsxs30(
                  "section",
                  {
                    className: "rounded-[24px] border border-dashed px-4 py-4 text-sm leading-6",
                    style: {
                      borderColor: "var(--photon-builder-border)",
                      color: "var(--photon-builder-text-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsxs30(
                        "div",
                        {
                          className: "text-[11px] uppercase tracking-[0.28em]",
                          style: { color: "var(--photon-builder-text-soft)" },
                          children: [
                            pageTabLabel,
                            " settings"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx39(
                        "div",
                        {
                          className: "mt-3 text-lg font-semibold",
                          style: { color: "var(--photon-builder-text)" },
                          children: summaryName
                        }
                      ),
                      /* @__PURE__ */ jsxs30("div", { className: "mt-2 flex flex-wrap items-center gap-2", children: [
                        /* @__PURE__ */ jsx39(
                          "div",
                          {
                            className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                            style: {
                              borderColor: "var(--photon-builder-border)",
                              background: "var(--photon-builder-field)",
                              color: "var(--photon-builder-text-soft)"
                            },
                            children: currentPage?.kind ?? "page"
                          }
                        ),
                        /* @__PURE__ */ jsx39(
                          "div",
                          {
                            className: "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]",
                            style: {
                              borderColor: "var(--photon-builder-border)",
                              background: "var(--photon-builder-field)",
                              color: "var(--photon-builder-text-soft)"
                            },
                            children: currentPage?.route ?? document2.route
                          }
                        ),
                        currentPage?.isDynamic ? /* @__PURE__ */ jsx39("div", { className: "rounded-full border border-amber-300/18 bg-amber-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-amber-100/80", children: "Dynamic template" }) : null
                      ] }),
                      /* @__PURE__ */ jsx39(
                        "div",
                        {
                          className: "mt-4 rounded-2xl border px-3 py-3 text-sm leading-6",
                          style: {
                            borderColor: "var(--photon-builder-border-strong)",
                            background: "var(--photon-builder-accent-strong)",
                            color: "var(--photon-builder-accent)"
                          },
                          children: "Open Page Settings from the top canvas toolbar to edit route basics and package-registered settings like SEO."
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs30(
                  "section",
                  {
                    className: "rounded-[24px] border px-4 py-4",
                    style: {
                      borderColor: "var(--photon-builder-border)",
                      background: "var(--photon-builder-panel-muted)"
                    },
                    children: [
                      /* @__PURE__ */ jsx39(
                        "div",
                        {
                          className: "mb-4 text-[11px] uppercase tracking-[0.28em]",
                          style: { color: "var(--photon-builder-text-soft)" },
                          children: "Basics"
                        }
                      ),
                      /* @__PURE__ */ jsxs30("div", { className: "space-y-3", children: [
                        /* @__PURE__ */ jsxs30(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: {
                              borderColor: "var(--photon-builder-border)",
                              background: "var(--photon-builder-field)"
                            },
                            children: [
                              /* @__PURE__ */ jsx39(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--photon-builder-text-soft)" },
                                  children: "Name"
                                }
                              ),
                              /* @__PURE__ */ jsx39(
                                "div",
                                {
                                  className: "mt-2 text-sm font-semibold",
                                  style: { color: "var(--photon-builder-text)" },
                                  children: summaryName
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs30(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: {
                              borderColor: "var(--photon-builder-border)",
                              background: "var(--photon-builder-field)"
                            },
                            children: [
                              /* @__PURE__ */ jsx39(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--photon-builder-text-soft)" },
                                  children: currentPage?.isDynamic ? "Route pattern" : "Path"
                                }
                              ),
                              /* @__PURE__ */ jsx39(
                                "div",
                                {
                                  className: "mt-2 font-mono text-sm",
                                  style: { color: "var(--photon-builder-text-muted)" },
                                  children: summaryRoute
                                }
                              )
                            ]
                          }
                        ),
                        currentPage?.isDynamic ? /* @__PURE__ */ jsxs30(
                          "div",
                          {
                            className: "rounded-2xl border px-4 py-3",
                            style: {
                              borderColor: "var(--photon-builder-border)",
                              background: "var(--photon-builder-field)"
                            },
                            children: [
                              /* @__PURE__ */ jsx39(
                                "div",
                                {
                                  className: "text-[11px] uppercase tracking-[0.24em]",
                                  style: { color: "var(--photon-builder-text-soft)" },
                                  children: "Current route"
                                }
                              ),
                              /* @__PURE__ */ jsx39(
                                "div",
                                {
                                  className: "mt-2 font-mono text-sm",
                                  style: { color: "var(--photon-builder-text-muted)" },
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

// src/studio/photon-studio/builder-mobile-panels.tsx
import { jsx as jsx40, jsxs as jsxs31 } from "react/jsx-runtime";
var BuilderMobilePanels = ({
  paletteTab,
  onPaletteTabChange,
  selectedLibraryItemId,
  onLibraryItemSelect,
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
  componentLibraryUsageProvider,
  manualInsertTarget,
  definitionFields,
  inspectorGroups,
  selectedFieldPath,
  inspectorDefinition,
  pageSettings,
  currentPage,
  onContentLocaleChange
}) => {
  return /* @__PURE__ */ jsxs31("div", { className: "mt-6 grid gap-4 lg:hidden", children: [
    /* @__PURE__ */ jsx40(
      PalettePanel,
      {
        paletteTab,
        onPaletteTabChange,
        selectedLibraryItemId,
        onLibraryItemSelect,
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
        componentLibraryUsageProvider,
        manualInsertTarget
      }
    ),
    /* @__PURE__ */ jsx40(
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

// src/studio/photon-studio/builder-sidebars.tsx
import clsx20 from "clsx";
import {
  useEffect as useEffect16,
  useState as useState22
} from "react";

// src/studio/photon-studio/builder-sidebar-edge-toggle.tsx
import clsx18 from "clsx";
import { ChevronLeft as ChevronLeft2, ChevronRight as ChevronRight5 } from "lucide-react";
import { jsx as jsx41 } from "react/jsx-runtime";
var BuilderSidebarEdgeToggle = ({
  side,
  dockHeight,
  onExpand
}) => {
  return /* @__PURE__ */ jsx41(
    "div",
    {
      className: clsx18(
        "fixed bottom-0 z-20 hidden lg:block",
        side === "left" ? "left-0 w-5" : "right-0 w-5"
      ),
      style: {
        top: dockHeight
      },
      children: /* @__PURE__ */ jsx41("div", { className: "group relative h-full w-full", children: /* @__PURE__ */ jsx41(
        "button",
        {
          type: "button",
          "aria-label": `Expand ${side} sidebar`,
          onClick: onExpand,
          className: clsx18(
            "absolute top-6 rounded-full border p-2 shadow-[var(--photon-builder-shadow)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            side === "left" ? "-left-10 group-hover:translate-x-9" : "-right-10 group-hover:-translate-x-9"
          ),
          style: {
            borderColor: "var(--photon-builder-border)",
            background: "var(--photon-builder-panel-solid)",
            color: "var(--photon-builder-text-muted)"
          },
          children: side === "left" ? /* @__PURE__ */ jsx41(ChevronRight5, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx41(ChevronLeft2, { className: "h-4 w-4" })
        }
      ) })
    }
  );
};

// src/studio/photon-studio/builder-sidebar-resize-handle.tsx
import clsx19 from "clsx";
import { jsx as jsx42, jsxs as jsxs32 } from "react/jsx-runtime";
var BuilderSidebarResizeHandle = ({
  side,
  onPointerDown
}) => {
  return /* @__PURE__ */ jsxs32(
    "button",
    {
      type: "button",
      "aria-label": `Resize ${side} sidebar`,
      onPointerDown,
      className: clsx19(
        "group absolute bottom-0 top-0 z-20 hidden w-6 cursor-col-resize touch-none lg:block",
        side === "left" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
      ),
      children: [
        /* @__PURE__ */ jsx42("span", { className: "absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 rounded-full bg-cyan-300/0 opacity-0 transition-[background-color,opacity] duration-200 delay-500 group-hover:bg-cyan-300/12 group-hover:opacity-100 group-focus-visible:bg-cyan-300/12 group-focus-visible:opacity-100 group-active:delay-0 group-active:bg-cyan-300/18 group-active:opacity-100" }),
        /* @__PURE__ */ jsx42("span", { className: "absolute inset-y-8 left-1/2 w-px -translate-x-1/2 rounded-full bg-white/12 opacity-50 transition-[background-color,opacity] duration-200 delay-500 group-hover:bg-cyan-300/55 group-hover:opacity-100 group-focus-visible:bg-cyan-300/55 group-focus-visible:opacity-100 group-active:delay-0 group-active:bg-cyan-300/65 group-active:opacity-100" })
      ]
    }
  );
};

// src/studio/photon-studio/builder-sidebars.tsx
import { Fragment as Fragment10, jsx as jsx43, jsxs as jsxs33 } from "react/jsx-runtime";
var BuilderSidebars = ({
  sidebarsVisible,
  dockHeight,
  isResizing,
  leftSidebarWidth,
  rightSidebarWidth,
  leftCollapsed,
  rightCollapsed,
  children,
  paletteTab,
  onPaletteTabChange,
  selectedLibraryItemId,
  onLibraryItemSelect,
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
  componentLibraryUsageProvider,
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
  const [transitionsEnabled, setTransitionsEnabled] = useState22(false);
  const leftReservedWidth = sidebarsVisible && !leftCollapsed ? leftSidebarWidth : 0;
  const rightReservedWidth = sidebarsVisible && !rightCollapsed ? rightSidebarWidth : 0;
  useEffect16(() => {
    const timeoutId = window.setTimeout(() => {
      setTransitionsEnabled(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);
  return /* @__PURE__ */ jsxs33(Fragment10, { children: [
    transitionsEnabled && sidebarsVisible && leftCollapsed ? /* @__PURE__ */ jsx43(
      BuilderSidebarEdgeToggle,
      {
        side: "left",
        dockHeight,
        onExpand: onExpandLeft
      }
    ) : null,
    transitionsEnabled && sidebarsVisible && rightCollapsed ? /* @__PURE__ */ jsx43(
      BuilderSidebarEdgeToggle,
      {
        side: "right",
        dockHeight,
        onExpand: onExpandRight
      }
    ) : null,
    /* @__PURE__ */ jsxs33(
      "div",
      {
        className: clsx20(
          "relative min-w-0 lg:pl-[var(--photon-left-sidebar-width)] lg:pr-[var(--photon-right-sidebar-width)]",
          !isResizing && "lg:transition-[padding] lg:duration-500 lg:ease-[cubic-bezier(0.22,1,0.36,1)]"
        ),
        style: {
          "--photon-left-sidebar-width": `${leftReservedWidth}px`,
          "--photon-right-sidebar-width": `${rightReservedWidth}px`
        },
        children: [
          /* @__PURE__ */ jsx43(
            "aside",
            {
              className: clsx20(
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
              "data-testid": "photon-builder-sidebar-left",
              children: /* @__PURE__ */ jsxs33(
                "div",
                {
                  className: clsx20(
                    "relative h-full min-w-0 overflow-hidden border-r backdrop-blur-md"
                  ),
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    background: isResizing ? "var(--photon-builder-panel-solid)" : "var(--photon-builder-panel)",
                    color: "var(--photon-builder-text)",
                    boxShadow: "var(--photon-builder-sidebar-shadow)"
                  },
                  children: [
                    /* @__PURE__ */ jsx43(
                      PalettePanel,
                      {
                        paletteTab,
                        onPaletteTabChange,
                        selectedLibraryItemId,
                        onLibraryItemSelect,
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
                        componentLibraryUsageProvider,
                        manualInsertTarget,
                        onCollapse: onToggleLeftCollapsed
                      }
                    ),
                    /* @__PURE__ */ jsx43(
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
          /* @__PURE__ */ jsx43("div", { className: "min-w-0", children }),
          /* @__PURE__ */ jsx43(
            "aside",
            {
              className: clsx20(
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
              "data-testid": "photon-builder-sidebar-right",
              children: /* @__PURE__ */ jsxs33(
                "div",
                {
                  className: clsx20(
                    "relative h-full min-w-0 overflow-hidden border-l backdrop-blur-md"
                  ),
                  style: {
                    borderColor: "var(--photon-builder-border)",
                    background: isResizing ? "var(--photon-builder-panel-solid)" : "var(--photon-builder-panel)",
                    color: "var(--photon-builder-text)",
                    boxShadow: "var(--photon-builder-sidebar-shadow)"
                  },
                  children: [
                    /* @__PURE__ */ jsx43(
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
                    /* @__PURE__ */ jsx43(
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

// src/studio/photon-studio/photon-stage.tsx
import { jsx as jsx44, jsxs as jsxs34 } from "react/jsx-runtime";
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
    "--photon-builder-shell": createRgbString(shell),
    "--photon-builder-shell-muted": createRgbString(shellMuted),
    "--photon-builder-shell-strong": createRgbString(shellStrong),
    "--photon-builder-dock-bg": `linear-gradient(180deg, ${createAlphaString(dockTop, 0.96)} 0%, ${createAlphaString(dockBottom, 0.88)} 100%)`,
    "--photon-builder-panel": createAlphaString(panel, isDark ? 0.82 : 0.94),
    "--photon-builder-panel-solid": createRgbString(panelSolid),
    "--photon-builder-panel-muted": createAlphaString(
      panelSolid,
      isDark ? 0.78 : 0.88
    ),
    "--photon-builder-field": createRgbString(field),
    "--photon-builder-card": createRgbString(card),
    "--photon-builder-card-selected": createRgbString(cardSelected),
    "--photon-builder-card-highlight": `radial-gradient(circle at top left, ${createAlphaString(accent, isDark ? 0.14 : 0.12)}, transparent 58%)`,
    "--photon-builder-border": createAlphaString(border, isDark ? 0.22 : 0.7),
    "--photon-builder-border-strong": createAlphaString(
      borderStrong,
      isDark ? 0.42 : 0.8
    ),
    "--photon-builder-text": createRgbString(text),
    "--photon-builder-text-muted": createRgbString(builderTextMuted),
    "--photon-builder-text-soft": createRgbString(builderTextSoft),
    "--photon-builder-text-ghost": createRgbString(builderTextGhost),
    "--photon-builder-accent": createRgbString(accent),
    "--photon-builder-accent-soft": createAlphaString(
      accentSoft,
      isDark ? 0.94 : 0.96
    ),
    "--photon-builder-accent-strong": createAlphaString(
      accent,
      isDark ? 0.2 : 0.14
    ),
    "--photon-builder-accent-text": createRgbString(accentText),
    "--photon-builder-shadow": isDark ? "0 18px 64px rgba(2, 6, 23, 0.28)" : "0 18px 54px rgba(15, 23, 42, 0.12)",
    "--photon-builder-panel-shadow": isDark ? "0 14px 38px rgba(2, 6, 23, 0.24)" : "0 14px 34px rgba(15, 23, 42, 0.08)",
    "--photon-builder-sidebar-shadow": isDark ? "0 22px 52px rgba(2, 6, 23, 0.3)" : "0 18px 44px rgba(15, 23, 42, 0.1)",
    "--photon-builder-card-shadow": isDark ? "0 12px 26px rgba(2, 6, 23, 0.18)" : "0 10px 22px rgba(15, 23, 42, 0.08)",
    "--photon-builder-canvas-shadow": isDark ? "0 28px 80px rgba(2, 8, 23, 0.24)" : "0 28px 72px rgba(15, 23, 42, 0.12)",
    "--photon-builder-elevation": `linear-gradient(180deg, ${createAlphaString(white, isDark ? 0.04 : 0.55)}, ${createAlphaString(white, 0)} 100%)`,
    "--photon-site-scrollbar-track": createAlphaString(
      scrollbarTrack,
      isDark ? 0.88 : 0.92
    ),
    "--photon-site-scrollbar-thumb": `linear-gradient(180deg, ${createAlphaString(
      scrollbarThumb,
      isDark ? 0.82 : 0.76
    )}, ${createAlphaString(scrollbarThumbHover, isDark ? 0.9 : 0.84)})`,
    "--photon-site-scrollbar-thumb-hover": `linear-gradient(180deg, ${createAlphaString(
      scrollbarThumbHover,
      isDark ? 0.92 : 0.88
    )}, ${createAlphaString(accent, isDark ? 0.94 : 0.9)})`,
    "--photon-site-scrollbar-border": createAlphaString(
      borderStrong,
      isDark ? 0.24 : 0.44
    )
  };
};
var PhotonStage = ({
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
  onPaletteTabChange,
  onLibraryItemSelect,
  onInteractionTabChange,
  onInteractionActionSelect,
  onInteractionGuardSelect,
  onInteractionScenarioSelect,
  onInteractionSurfaceSelect,
  onInteractionToastSelect,
  onLogout,
  onModeChange,
  onPreviewCollapsedChange,
  onReset,
  onSave,
  builderEnabled,
  builderSurfaceMode,
  paletteTab,
  selectedLibraryItemId,
  interactionTab,
  selectedInteractionActionId,
  selectedInteractionGuardId,
  selectedInteractionScenarioId,
  selectedInteractionSurfaceId,
  selectedInteractionToastId,
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
  interactionSurfaces,
  interactionActions,
  interactionGuards,
  openInteractionSurface,
  showInteractionToast,
  executeInteractionAction,
  componentLibraryUsageProvider,
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
  const designSettings = resolvePhotonSiteDesignSettings(
    site.settings.design
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
    "--photon-site-header-offset": designSettings.headerOffset
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
    "--photon-dock-offset": `${canManage ? canvasMainPaddingTop : 0}px`,
    "--photon-site-surface-min-height": `max(0px, calc(100dvh - ${canManage ? canvasMainPaddingTop + builderSurfaceInset : mainPaddingTop}px))`,
    ...canManage ? {
      backgroundColor: "var(--photon-builder-shell)",
      color: "var(--photon-builder-text)"
    } : {},
    ...canvasSurfaceVisible ? siteSurfaceSceneStyle : {}
  };
  useEffect17(() => {
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
      if (!key.startsWith("--photon-builder-") && !key.startsWith("--photon-site-scrollbar-") || typeof value !== "string") {
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
  return /* @__PURE__ */ jsxs34(
    "div",
    {
      className: "relative z-10 transition-[background-color,color] duration-500",
      style: stageStyle,
      "data-testid": "photon-builder-theme-root",
      "data-photon-builder-appearance": getRelativeLuminance(
        parseColor(designSettings.backgroundColor) ?? { r: 8, g: 19, b: 33 }
      ) < 0.38 ? "dark" : "light",
      children: [
        canManage ? /* @__PURE__ */ jsx44(
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
        /* @__PURE__ */ jsxs34(
          BuilderSidebars,
          {
            sidebarsVisible,
            dockHeight,
            isResizing,
            leftSidebarWidth,
            rightSidebarWidth,
            leftCollapsed,
            rightCollapsed,
            paletteTab,
            onPaletteTabChange,
            selectedLibraryItemId,
            onLibraryItemSelect,
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
            componentLibraryUsageProvider,
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
              /* @__PURE__ */ jsx44(
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
              /* @__PURE__ */ jsxs34(
                "main",
                {
                  className: clsx21(
                    "min-w-0 transition-colors duration-500",
                    canManage ? "min-h-screen pb-0" : "pb-0",
                    builderEnabled ? "px-4 sm:px-6 lg:px-8" : canvasSurfaceVisible ? "px-0" : "px-4 sm:px-6 lg:px-8"
                  ),
                  style: mainStyle,
                  children: [
                    /* @__PURE__ */ jsx44(
                      "div",
                      {
                        className: clsx21(
                          "mx-auto transition-[max-width,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          canvasSurfaceVisible ? "max-w-none" : "max-w-[1480px]"
                        ),
                        children: builderEnabled && builderSurfaceMode === "settings" ? /* @__PURE__ */ jsx44(
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
                        ) : builderEnabled && builderSurfaceMode === "interactions" ? /* @__PURE__ */ jsx44(
                          InteractionSurfacesSurface,
                          {
                            site,
                            definitions: interactionSurfaces,
                            actionDefinitions: interactionActions,
                            guardDefinitions: interactionGuards,
                            activeTab: interactionTab,
                            selectedActionId: selectedInteractionActionId,
                            selectedGuardId: selectedInteractionGuardId,
                            selectedScenarioId: selectedInteractionScenarioId,
                            selectedInstanceId: selectedInteractionSurfaceId,
                            selectedTemplateId: selectedInteractionToastId,
                            onActiveTabChange: onInteractionTabChange,
                            onSelectedActionChange: onInteractionActionSelect,
                            onSelectedGuardChange: onInteractionGuardSelect,
                            onSelectedScenarioChange: onInteractionScenarioSelect,
                            onSelectedInstanceChange: onInteractionSurfaceSelect,
                            onSelectedTemplateChange: onInteractionToastSelect,
                            onSiteSettingChange,
                            onSiteSettingFocus,
                            openInteractionSurface,
                            showInteractionToast,
                            executeInteractionAction
                          }
                        ) : /* @__PURE__ */ jsxs34(
                          "div",
                          {
                            className: clsx21(
                              "relative",
                              !isResizing && "transition-[border-radius,box-shadow] duration-300",
                              builderEnabled ? "rounded-[28px] border shadow-[var(--photon-builder-canvas-shadow)]" : null
                            ),
                            style: {
                              ...siteSurfaceSceneStyle,
                              ...builderEnabled ? {
                                borderColor: "var(--photon-builder-border)"
                              } : {}
                            },
                            children: [
                              builderEnabled ? /* @__PURE__ */ jsx44(
                                "div",
                                {
                                  className: "pointer-events-none absolute inset-0 rounded-[28px]",
                                  style: { background: "var(--photon-builder-elevation)" }
                                }
                              ) : null,
                              /* @__PURE__ */ jsx44("div", { className: "relative", children: /* @__PURE__ */ jsx44(
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
                    contentEnabled && contentNotice ? /* @__PURE__ */ jsx44("div", { className: "mx-auto mt-4 max-w-[1480px]", children: contentNotice }) : null,
                    builderEnabled && builderSurfaceMode === "canvas" ? /* @__PURE__ */ jsx44(
                      BuilderMobilePanels,
                      {
                        paletteTab,
                        onPaletteTabChange,
                        selectedLibraryItemId,
                        onLibraryItemSelect,
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
                        componentLibraryUsageProvider,
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

// src/studio/photon-studio/photon-studio-inner.tsx
import { jsx as jsx45, jsxs as jsxs35 } from "react/jsx-runtime";
var PhotonStudioInner = ({
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
  siteSettingsSubtabs,
  componentLibraryUsageProvider
}) => {
  const document2 = usePhotonStore((state) => state.document);
  const contentRevision = usePhotonStore(
    (state) => state.contentRevision
  );
  const {
    document: persistedDocument,
    resources,
    pageSettings,
    site
  } = usePhotonPersistedState();
  const mode = usePhotonStore((state) => state.mode);
  const setMode = usePhotonStore((state) => state.setMode);
  const isAdmin = usePhotonStore((state) => state.isAdmin);
  const registry = usePhotonStore((state) => state.registry);
  const selectedBlockId = usePhotonStore(
    (state) => state.selectedBlockId
  );
  const selectedBlock = usePhotonStore(
    (state) => getPhotonSelectedBlock(state)
  );
  const selectedField = usePhotonStore((state) => state.selectedField);
  const selectBlock = usePhotonStore((state) => state.selectBlock);
  const selectPageSettingField = usePhotonStore(
    (state) => state.selectPageSettingField
  );
  const selectSiteSettingField = usePhotonStore(
    (state) => state.selectSiteSettingField
  );
  const updatePageSettingValue = usePhotonStore(
    (state) => state.updatePageSettingValue
  );
  const getPageSettingValue = usePhotonStore(
    (state) => state.getPageSettingValue
  );
  const updateSiteSettingValue = usePhotonStore(
    (state) => state.updateSiteSettingValue
  );
  const getSiteSettingValue = usePhotonStore(
    (state) => state.getSiteSettingValue
  );
  const interactionSurfaces = usePhotonStore(
    (state) => state.interactionSurfaces
  );
  const interactionActions = usePhotonStore((state) => state.interactionActions);
  const interactionGuards = usePhotonStore((state) => state.interactionGuards);
  const openInteractionSurface = usePhotonStore(
    (state) => state.openInteractionSurface
  );
  const showInteractionToast = usePhotonStore(
    (state) => state.showInteractionToast
  );
  const executeInteractionAction = usePhotonStore(
    (state) => state.executeInteractionAction
  );
  const insertBlock = usePhotonStore((state) => state.insertBlock);
  const moveBlock = usePhotonStore((state) => state.moveBlock);
  const replaceState = usePhotonStore((state) => state.replaceState);
  const syncExternalState = usePhotonStore(
    (state) => state.syncExternalState
  );
  const collapseAllBlocks = usePhotonStore(
    (state) => state.collapseAllBlocks
  );
  const expandAllBlocks = usePhotonStore(
    (state) => state.expandAllBlocks
  );
  const collapsedBlockCount = usePhotonStore(
    (state) => Object.keys(state.collapsedBlockIds).length
  );
  const [search, setSearch] = useState23("");
  const [paletteFamily, setPaletteFamily] = useState23("all");
  const [palettePackage, setPalettePackage] = useState23("all");
  const [selectedPaletteKey, setSelectedPaletteKey] = useState23(
    null
  );
  const [manualInsertTarget, setManualInsertTarget] = useState23(null);
  const [paletteCollapsedGroups, setPaletteCollapsedGroups] = useState23([]);
  const [paletteCollapsedFamilies, setPaletteCollapsedFamilies] = useState23([]);
  const [dockHeight, setDockHeight] = useState23(
    PHOTON_EDITOR_DOCK_FALLBACK_HEIGHT
  );
  const [showCollapsedInPreview, setShowCollapsedInPreview] = useState23(false);
  const [hasMounted, setHasMounted] = useState23(false);
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
  const initialStudioUrlState = typeof window === "undefined" ? {} : parsePhotonStudioUrlState(window.location.search);
  const [paletteTab, setPaletteTab] = useState23(
    initialStudioUrlState.paletteTab ?? "blocks"
  );
  const [selectedLibraryItemId, setSelectedLibraryItemId] = useState23(initialStudioUrlState.library ?? null);
  const [interactionTab, setInteractionTab] = useState23(
    initialStudioUrlState.interactionTab ?? "actions"
  );
  const [selectedInteractionActionId, setSelectedInteractionActionId] = useState23(initialStudioUrlState.action ?? null);
  const [selectedInteractionGuardId, setSelectedInteractionGuardId] = useState23(initialStudioUrlState.guard ?? null);
  const [selectedInteractionScenarioId, setSelectedInteractionScenarioId] = useState23(initialStudioUrlState.scenario ?? null);
  const [selectedInteractionSurfaceId, setSelectedInteractionSurfaceId] = useState23(initialStudioUrlState.surface ?? null);
  const [selectedInteractionToastId, setSelectedInteractionToastId] = useState23(initialStudioUrlState.toast ?? null);
  useEffect18(() => {
    if (typeof window === "undefined" || !isAdmin) {
      return;
    }
    const syncFromUrl = () => {
      const state = parsePhotonStudioUrlState(window.location.search);
      if (state.mode) {
        setMode(state.mode);
      }
      if (state.builderSurface) {
        setBuilderSurfaceMode(state.builderSurface);
      }
      if (state.paletteTab) {
        setPaletteTab(state.paletteTab);
      }
      if (state.interactionTab) {
        setInteractionTab(state.interactionTab);
      }
      setSelectedLibraryItemId(state.library ?? null);
      setSelectedInteractionActionId(state.action ?? null);
      setSelectedInteractionGuardId(state.guard ?? null);
      setSelectedInteractionScenarioId(state.scenario ?? null);
      setSelectedInteractionSurfaceId(state.surface ?? null);
      setSelectedInteractionToastId(state.toast ?? null);
      selectBlock(state.block ?? null);
    };
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [isAdmin, selectBlock, setBuilderSurfaceMode, setMode]);
  useEffect18(() => {
    if (typeof window === "undefined" || !isAdmin) {
      return;
    }
    const current = parsePhotonStudioUrlState(window.location.search);
    if (current.mode === mode && current.builderSurface === builderSurfaceMode) {
      return;
    }
    const nextSearch = mergePhotonStudioUrlState(window.location.search, {
      mode,
      builderSurface: builderSurfaceMode
    });
    const nextUrl = `${window.location.pathname}?${nextSearch.toString()}${window.location.hash}`;
    window.history.pushState(null, "", nextUrl);
  }, [builderSurfaceMode, isAdmin, mode]);
  useEffect18(() => {
    if (typeof window === "undefined" || !isAdmin) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      const nextSearch = mergePhotonStudioUrlState(window.location.search, {
        block: selectedBlockId ?? null,
        paletteTab,
        library: selectedLibraryItemId ?? null,
        interactionTab,
        action: selectedInteractionActionId ?? null,
        guard: selectedInteractionGuardId ?? null,
        scenario: selectedInteractionScenarioId ?? null,
        surface: selectedInteractionSurfaceId ?? null,
        toast: selectedInteractionToastId ?? null
      });
      const nextUrl = `${window.location.pathname}?${nextSearch.toString()}${window.location.hash}`;
      window.history.replaceState(null, "", nextUrl);
    }, 120);
    return () => window.clearTimeout(timeoutId);
  }, [
    isAdmin,
    paletteTab,
    interactionTab,
    selectedBlockId,
    selectedInteractionActionId,
    selectedInteractionGuardId,
    selectedInteractionScenarioId,
    selectedInteractionSurfaceId,
    selectedInteractionToastId,
    selectedLibraryItemId
  ]);
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
  useEffect18(() => {
    setHasMounted(true);
  }, []);
  const togglePaletteFamily = (family) => {
    setPaletteCollapsedFamilies(
      (current) => current.includes(family) ? current.filter((candidate) => candidate !== family) : [...current, family]
    );
  };
  useEffect18(() => {
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
      listId: getPhotonSurfaceRegionListId(
        PHOTON_PAGE_SURFACE_REGION_KEY
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
  return /* @__PURE__ */ jsxs35("div", { className: "relative min-h-screen", children: [
    /* @__PURE__ */ jsx45(
      PhotonSearchHighlightEffect,
      {
        activeHighlight: activeSearchHighlight
      }
    ),
    /* @__PURE__ */ jsxs35(
      DndContext,
      {
        id: "photon-studio",
        sensors,
        collisionDetection: photonCollisionDetection,
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
        onDragEnd: handleDragEnd,
        onDragCancel: handleDragCancel,
        children: [
          /* @__PURE__ */ jsx45(
            PhotonStage,
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
                showInteractionToast({
                  templateId: "photon:local-draft-reverted"
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
              paletteTab,
              selectedLibraryItemId,
              selectedInteractionSurfaceId,
              selectedInteractionToastId,
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
              interactionSurfaces,
              interactionActions,
              interactionGuards,
              interactionTab,
              selectedInteractionActionId,
              selectedInteractionGuardId,
              selectedInteractionScenarioId,
              openInteractionSurface,
              showInteractionToast,
              executeInteractionAction,
              componentLibraryUsageProvider,
              siteSettingsPanels: visibleSiteSettingsPanels,
              siteSettingsSubtabs: siteSettingsSubtabs ?? [],
              onPageSettingFocus: selectPageSettingField,
              onPageSettingChange: updatePageSettingValue,
              getPageSettingValue,
              onSiteSettingFocus: selectSiteSettingField,
              onSiteSettingChange: handleSiteSettingChange,
              getSiteSettingValue,
              onBuilderSurfaceModeChange: setBuilderSurfaceMode,
              onPaletteTabChange: setPaletteTab,
              onLibraryItemSelect: setSelectedLibraryItemId,
              onInteractionTabChange: setInteractionTab,
              onInteractionActionSelect: setSelectedInteractionActionId,
              onInteractionGuardSelect: setSelectedInteractionGuardId,
              onInteractionScenarioSelect: setSelectedInteractionScenarioId,
              onInteractionSurfaceSelect: setSelectedInteractionSurfaceId,
              onInteractionToastSelect: setSelectedInteractionToastId,
              onToggleLeftCollapsed: toggleLeftCollapsed,
              onToggleRightCollapsed: toggleRightCollapsed,
              onExpandLeft: expandLeft,
              onExpandRight: expandRight,
              onResizeStart: startResize
            }
          ),
          hasMounted ? createPortal(
            /* @__PURE__ */ jsx45(
              DragOverlay,
              {
                adjustScale: false,
                dropAnimation: null,
                modifiers: dragOverlayModifiers,
                children: activeDragKind === "palette" && activePaletteDefinition ? /* @__PURE__ */ jsx45(PaletteOverlayCard, { definition: activePaletteDefinition }) : activeBlock ? /* @__PURE__ */ jsx45(BlockOverlayCard, { block: activeBlock }) : null
              }
            ),
            globalThis.document.body
          ) : null
        ]
      }
    )
  ] });
};

// src/studio/photon-studio/photon-studio.tsx
import { jsx as jsx46 } from "react/jsx-runtime";
var PhotonStudio = ({
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
  requestAuthAction,
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
  navigate,
  prefetch,
  activeSearchHighlight,
  linkComponent,
  linkFactory,
  siteFrameExtensions,
  accountTabs,
  interactionSurfaces,
  interactionActions,
  interactionGuards,
  interactionGuardEvaluators,
  interactionSurfaceRenderers,
  componentLibraryUsageProvider,
  i18n,
  hydrateModePreference = true,
  showInterfaceLocaleControl = true,
  workspaceControl,
  title = "Live website editing framework",
  description = "Package-level studio shell with inline content editing, builder chrome and installable kit support.",
  renderContentNotice,
  siteSettingsSubtabs
}) => {
  return /* @__PURE__ */ jsx46(
    PhotonProvider,
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
      requestAuthAction,
      navigate,
      prefetch,
      linkComponent,
      linkFactory,
      siteFrameExtensions,
      accountTabs,
      interactionSurfaces,
      interactionActions,
      interactionGuards,
      interactionGuardEvaluators,
      interactionSurfaceRenderers,
      i18n,
      children: /* @__PURE__ */ jsx46(
        PhotonStudioInner,
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
          siteSettingsSubtabs,
          componentLibraryUsageProvider
        }
      )
    }
  );
};

export {
  PhotonBlockRenderer,
  PhotonFieldEditorList,
  PhotonStudio
};
