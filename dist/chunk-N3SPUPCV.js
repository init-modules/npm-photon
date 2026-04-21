import {
  useWebsiteBuilderStore
} from "./chunk-ZQJWNS6S.js";

// src/context/website-builder-surface-layout-context.tsx
import { createContext, useContext } from "react";
import { jsx } from "react/jsx-runtime";
var WebsiteBuilderSurfaceLayoutContext = createContext(null);
var WebsiteBuilderSurfaceLayoutProvider = ({
  children,
  value
}) => /* @__PURE__ */ jsx(WebsiteBuilderSurfaceLayoutContext.Provider, { value, children });
var useWebsiteBuilderSurfaceLayoutMetrics = () => useContext(WebsiteBuilderSurfaceLayoutContext);
var useWebsiteBuilderSurfaceBreakpoints = () => {
  const metrics = useWebsiteBuilderSurfaceLayoutMetrics();
  const width = metrics?.width ?? 0;
  return {
    width,
    atLeastSm: width >= 640,
    atLeastMd: width >= 768,
    atLeastLg: width >= 1024,
    atLeastXl: width >= 1280
  };
};

// src/search/website-builder-search-highlight-effect.tsx
import { useEffect } from "react";
var SEARCH_MARK_SELECTOR = 'mark[data-wb-search-mark="true"]';
var SEARCH_TARGET_SELECTOR = "[data-wb-search-target]";
var ACTIVE_TARGET_ATTRIBUTE = "data-wb-search-active-target";
var normalizeSearchValue = (value) => value.replace(/\s+/gu, " ").trim();
var clearSearchMarks = () => {
  if (typeof document === "undefined") {
    return;
  }
  document.querySelectorAll(SEARCH_MARK_SELECTOR).forEach((mark) => {
    const parent = mark.parentNode;
    if (!parent) {
      return;
    }
    while (mark.firstChild) {
      parent.insertBefore(mark.firstChild, mark);
    }
    parent.removeChild(mark);
    parent.normalize();
  });
  document.querySelectorAll(`[${ACTIVE_TARGET_ATTRIBUTE}="true"]`).forEach((element) => {
    element.removeAttribute(ACTIVE_TARGET_ATTRIBUTE);
    element.style.removeProperty("outline");
    element.style.removeProperty("outline-offset");
    element.style.removeProperty("border-radius");
  });
};
var findTargetElement = (targetId) => {
  const elements = Array.from(
    document.querySelectorAll(SEARCH_TARGET_SELECTOR)
  );
  return elements.find((element) => element.dataset.wbSearchTarget === targetId) ?? null;
};
var appendNormalizedTextNode = (textNode, normalized) => {
  const source = textNode.textContent ?? "";
  if (source.trim() === "") {
    return;
  }
  let segmentText = "";
  const segmentPoints = [];
  let started = false;
  let pendingWhitespace = null;
  for (let rawOffset = 0; rawOffset < source.length; ) {
    const codePoint = source.codePointAt(rawOffset);
    if (codePoint === void 0) {
      break;
    }
    const character = String.fromCodePoint(codePoint);
    const characterLength = character.length;
    if (/\s/u.test(character)) {
      if (started && pendingWhitespace === null) {
        pendingWhitespace = {
          offset: rawOffset,
          length: characterLength
        };
      }
      rawOffset += characterLength;
      continue;
    }
    started = true;
    if (pendingWhitespace !== null) {
      segmentText += " ";
      segmentPoints.push({
        node: textNode,
        offset: pendingWhitespace.offset,
        length: pendingWhitespace.length
      });
      pendingWhitespace = null;
    }
    segmentText += character;
    segmentPoints.push({
      node: textNode,
      offset: rawOffset,
      length: characterLength
    });
    rawOffset += characterLength;
  }
  if (!segmentText) {
    return;
  }
  if (normalized.text !== "") {
    normalized.text += " ";
    normalized.points.push(null);
  }
  normalized.text += segmentText;
  normalized.points.push(...segmentPoints);
};
var collectNormalizedSearchText = (element) => {
  const normalized = {
    text: "",
    points: []
  };
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const value = node.textContent ?? "";
      return value.trim() === "" ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  let currentNode = walker.nextNode();
  while (currentNode) {
    appendNormalizedTextNode(currentNode, normalized);
    currentNode = walker.nextNode();
  }
  return normalized;
};
var findPointInRange = (points, startIndex, endIndex, direction) => {
  if (direction === "forward") {
    for (let index = startIndex; index < endIndex; index += 1) {
      const point = points[index];
      if (point !== null) {
        return point;
      }
    }
    return null;
  }
  for (let index = endIndex - 1; index >= startIndex; index -= 1) {
    const point = points[index];
    if (point !== null) {
      return point;
    }
  }
  return null;
};
var highlightOccurrenceInElement = (element, query, occurrence) => {
  const normalizedText = collectNormalizedSearchText(element);
  const normalizedQuery = normalizeSearchValue(query).toLowerCase();
  if (!normalizedQuery || !normalizedText.text) {
    return null;
  }
  const haystack = normalizedText.text.toLowerCase();
  let searchOffset = 0;
  let currentOccurrence = 0;
  while (searchOffset <= haystack.length) {
    const matchIndex = haystack.indexOf(normalizedQuery, searchOffset);
    if (matchIndex === -1) {
      break;
    }
    if (currentOccurrence === occurrence) {
      const matchEnd = matchIndex + normalizedQuery.length;
      const startPoint = findPointInRange(
        normalizedText.points,
        matchIndex,
        matchEnd,
        "forward"
      );
      const endPoint = findPointInRange(
        normalizedText.points,
        matchIndex,
        matchEnd,
        "backward"
      );
      if (!startPoint || !endPoint) {
        return null;
      }
      const range = document.createRange();
      range.setStart(startPoint.node, startPoint.offset);
      range.setEnd(endPoint.node, endPoint.offset + endPoint.length);
      const mark = document.createElement("mark");
      mark.dataset.wbSearchMark = "true";
      mark.style.background = "rgba(34, 211, 238, 0.28)";
      mark.style.color = "inherit";
      mark.style.padding = "0 0.15em";
      mark.style.borderRadius = "0.35em";
      try {
        range.surroundContents(mark);
        return mark;
      } catch {
        return null;
      }
    }
    currentOccurrence += 1;
    searchOffset = matchIndex + Math.max(normalizedQuery.length, 1);
  }
  return null;
};
var WebsiteBuilderSearchHighlightEffect = ({
  activeHighlight
}) => {
  useEffect(() => {
    clearSearchMarks();
    if (typeof window === "undefined" || !activeHighlight?.query || !activeHighlight.targetId) {
      return;
    }
    let frameOne = 0;
    let frameTwo = 0;
    const runHighlight = () => {
      const target = findTargetElement(activeHighlight.targetId);
      if (!target) {
        return;
      }
      target.setAttribute(ACTIVE_TARGET_ATTRIBUTE, "true");
      target.style.outline = "2px solid rgba(34, 211, 238, 0.42)";
      target.style.outlineOffset = "4px";
      target.style.borderRadius = "18px";
      const mark = highlightOccurrenceInElement(
        target,
        activeHighlight.query,
        activeHighlight.occurrence
      ) ?? target;
      mark.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    };
    frameOne = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(runHighlight);
    });
    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
      clearSearchMarks();
    };
  }, [
    activeHighlight?.occurrence,
    activeHighlight?.query,
    activeHighlight?.targetId
  ]);
  return null;
};

// src/components/block-renderer.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var WebsiteBuilderBlockRenderer = ({
  block,
  renderArea
}) => {
  const registry = useWebsiteBuilderStore((state) => state.registry);
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
  return /* @__PURE__ */ jsx2(Component, { block, renderArea });
};

// src/context/website-builder-render-depth-context.tsx
import { createContext as createContext2, useContext as useContext2 } from "react";
var WebsiteBuilderRenderDepthContext = createContext2(0);
var WebsiteBuilderRenderDepthProvider = WebsiteBuilderRenderDepthContext.Provider;
var useWebsiteBuilderRenderDepth = () => useContext2(WebsiteBuilderRenderDepthContext);

// src/components/ui/keyboard-menu/keyboard-menu.tsx
import clsx from "clsx";
import {
  useCallback,
  useEffect as useEffect2,
  useId,
  useMemo,
  useRef,
  useState
} from "react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var moveIndex = (currentIndex, total, direction) => {
  if (total === 0) {
    return -1;
  }
  if (currentIndex === -1) {
    return direction === 1 ? 0 : total - 1;
  }
  return (currentIndex + direction + total) % total;
};
var useKeyboardMenuController = ({
  items,
  getItemId,
  isItemDisabled,
  isOpen = true,
  preferredItemId = null,
  onSelectItem
}) => {
  const rawListId = useId();
  const listId = `wb-keyboard-menu-${rawListId.replace(/:/gu, "")}`;
  const [activeItemId, setActiveItemId] = useState(null);
  const itemNodesRef = useRef(/* @__PURE__ */ new Map());
  const listNodeRef = useRef(null);
  const enabledItems = useMemo(
    () => items.filter((item) => !isItemDisabled?.(item)),
    [isItemDisabled, items]
  );
  const enabledItemIds = useMemo(
    () => enabledItems.map((item) => getItemId(item)),
    [enabledItems, getItemId]
  );
  const activeItem = useMemo(
    () => items.find((item) => getItemId(item) === activeItemId) ?? null,
    [activeItemId, getItemId, items]
  );
  useEffect2(() => {
    if (!isOpen) {
      setActiveItemId(null);
      return;
    }
    setActiveItemId((currentItemId) => {
      if (currentItemId !== null && enabledItemIds.includes(currentItemId)) {
        return currentItemId;
      }
      if (preferredItemId !== null && enabledItemIds.includes(preferredItemId)) {
        return preferredItemId;
      }
      return enabledItemIds[0] ?? null;
    });
  }, [enabledItemIds, isOpen, preferredItemId]);
  useEffect2(() => {
    if (!activeItemId) {
      return;
    }
    itemNodesRef.current.get(activeItemId)?.scrollIntoView({
      block: "nearest"
    });
  }, [activeItemId]);
  const selectItem = useCallback(
    (item) => {
      if (!item || isItemDisabled?.(item)) {
        return;
      }
      onSelectItem?.(item);
    },
    [isItemDisabled, onSelectItem]
  );
  const handleKeyDown = useCallback(
    (event) => {
      if (!isOpen) {
        return;
      }
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          setActiveItemId((currentItemId) => {
            const currentIndex = currentItemId ? enabledItemIds.indexOf(currentItemId) : -1;
            const nextIndex = moveIndex(currentIndex, enabledItemIds.length, 1);
            return nextIndex === -1 ? null : enabledItemIds[nextIndex];
          });
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          setActiveItemId((currentItemId) => {
            const currentIndex = currentItemId ? enabledItemIds.indexOf(currentItemId) : -1;
            const nextIndex = moveIndex(
              currentIndex,
              enabledItemIds.length,
              -1
            );
            return nextIndex === -1 ? null : enabledItemIds[nextIndex];
          });
          break;
        }
        case "Home": {
          if (enabledItemIds.length === 0) {
            return;
          }
          event.preventDefault();
          setActiveItemId(enabledItemIds[0] ?? null);
          break;
        }
        case "End": {
          if (enabledItemIds.length === 0) {
            return;
          }
          event.preventDefault();
          setActiveItemId(enabledItemIds[enabledItemIds.length - 1] ?? null);
          break;
        }
        case "Enter": {
          if (!activeItem) {
            return;
          }
          event.preventDefault();
          selectItem(activeItem);
          break;
        }
        default:
          break;
      }
    },
    [activeItem, enabledItemIds, isOpen, selectItem]
  );
  return {
    listId,
    activeItem,
    activeItemId,
    activeOptionId: activeItemId ? `${listId}-option-${activeItemId}` : void 0,
    focusList: () => listNodeRef.current?.focus(),
    getOptionElement: (itemId) => itemNodesRef.current.get(itemId) ?? null,
    getOptionId: (itemId) => `${listId}-option-${itemId}`,
    getOptionRef: (itemId) => (node) => {
      itemNodesRef.current.set(itemId, node);
    },
    getOptionProps: (item) => ({
      role: "option",
      "aria-selected": getItemId(item) === activeItemId,
      "aria-disabled": isItemDisabled?.(item) ? true : void 0,
      onMouseMove: () => {
        if (isItemDisabled?.(item)) {
          return;
        }
        setActiveItemId(getItemId(item));
      }
    }),
    getListProps: (props = {}) => ({
      ...props,
      ref: (node) => {
        listNodeRef.current = node;
      },
      id: listId,
      role: "listbox",
      tabIndex: 0,
      "aria-activedescendant": activeItemId ? `${listId}-option-${activeItemId}` : void 0,
      onKeyDown: (event) => {
        props.onKeyDown?.(event);
        if (!event.defaultPrevented) {
          handleKeyDown(event);
        }
      }
    }),
    handleKeyDown,
    setActiveItemId
  };
};
var KeyboardMenuList = ({
  controller,
  sections,
  getItemId,
  isItemDisabled,
  selectedItemId = null,
  listLabel,
  className,
  emptyState,
  renderItem
}) => {
  const hasItems = sections.some((section) => section.items.length > 0);
  if (!hasItems) {
    return /* @__PURE__ */ jsx3(
      "div",
      {
        ...controller.getListProps({
          "aria-label": listLabel,
          className
        }),
        children: emptyState
      }
    );
  }
  return /* @__PURE__ */ jsx3(
    "div",
    {
      ...controller.getListProps({
        "aria-label": listLabel,
        className: clsx("outline-none", className)
      }),
      children: sections.map((section) => /* @__PURE__ */ jsxs2("section", { className: "space-y-2", children: [
        section.label ? /* @__PURE__ */ jsx3("div", { className: "px-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--wb-builder-text-soft)]", children: section.label }) : null,
        /* @__PURE__ */ jsx3("div", { className: "space-y-1", children: section.items.map((item) => {
          const itemId = getItemId(item);
          const optionId = controller.getOptionId(itemId);
          const isActive = controller.activeItemId === itemId;
          const isDisabled = isItemDisabled?.(item) === true;
          const isSelected = selectedItemId === itemId;
          return /* @__PURE__ */ jsx3(
            "div",
            {
              ref: controller.getOptionRef(itemId),
              id: optionId,
              "data-keyboard-menu-item-id": itemId,
              ...controller.getOptionProps(item),
              children: renderItem(item, {
                isActive,
                isDisabled,
                isSelected,
                optionId
              })
            },
            itemId
          );
        }) })
      ] }, section.id))
    }
  );
};

// src/components/ui/dialog/dialog-content.tsx
import * as DialogPrimitive2 from "@radix-ui/react-dialog";
import {
  forwardRef as forwardRef2
} from "react";

// src/helpers/cn.ts
import { clsx as clsx2 } from "clsx";
var cn = (...inputs) => clsx2(inputs);

// src/components/ui/dialog/dialog-overlay.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  forwardRef
} from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var DialogOverlay = forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx4(
    DialogPrimitive.Overlay,
    {
      ref,
      "data-slot": "dialog-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-slate-950/72 backdrop-blur-sm duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      ),
      ...props
    }
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// src/components/ui/dialog/dialog-content.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var DialogContent = forwardRef2(({ className, ...props }, ref) => {
  const builderThemeRoot = typeof document === "undefined" ? null : document.querySelector(
    '[data-testid="wb-builder-theme-root"]'
  );
  return /* @__PURE__ */ jsxs3(DialogPrimitive2.Portal, { container: builderThemeRoot ?? void 0, children: [
    /* @__PURE__ */ jsx5(DialogOverlay, {}),
    /* @__PURE__ */ jsx5(
      DialogPrimitive2.Content,
      {
        ref,
        "data-slot": "dialog-content",
        "data-testid": "wb-dialog-content",
        className: cn(
          "fixed left-1/2 top-1/2 z-50 grid w-[min(32rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 gap-5 rounded-[1.75rem] border border-[color:var(--wb-builder-border-strong)] bg-[linear-gradient(180deg,var(--wb-builder-panel-solid),var(--wb-builder-panel))] p-6 text-[color:var(--wb-builder-text)] shadow-[var(--wb-builder-shadow)] backdrop-blur-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        ),
        ...props
      }
    )
  ] });
});
DialogContent.displayName = DialogPrimitive2.Content.displayName;

// src/components/ui/dialog/dialog-description.tsx
import * as DialogPrimitive3 from "@radix-ui/react-dialog";
import {
  forwardRef as forwardRef3
} from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var DialogDescription = forwardRef3(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx6(
    DialogPrimitive3.Description,
    {
      ref,
      "data-slot": "dialog-description",
      className: cn("text-sm leading-6", className),
      style: {
        color: "var(--wb-builder-text-muted, rgb(255 255 255 / 0.62))"
      },
      ...props
    }
  );
});
DialogDescription.displayName = DialogPrimitive3.Description.displayName;

// src/components/ui/dialog/dialog-title.tsx
import * as DialogPrimitive4 from "@radix-ui/react-dialog";
import {
  forwardRef as forwardRef4
} from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var DialogTitle = forwardRef4(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx7(
    DialogPrimitive4.Title,
    {
      ref,
      "data-slot": "dialog-title",
      className: cn("text-xl font-semibold tracking-[-0.03em]", className),
      style: { color: "var(--wb-builder-text, rgb(255 255 255))" },
      ...props
    }
  );
});
DialogTitle.displayName = DialogPrimitive4.Title.displayName;

// src/components/ui/dialog/index.ts
import {
  Close,
  Root,
  Trigger
} from "@radix-ui/react-dialog";

// src/components/ui/dialog/dialog-footer.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
var DialogFooter = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx8(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
};

// src/components/ui/dialog/dialog-header.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
var DialogHeader = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-left", className),
      ...props
    }
  );
};

export {
  WebsiteBuilderSurfaceLayoutProvider,
  useWebsiteBuilderSurfaceLayoutMetrics,
  useWebsiteBuilderSurfaceBreakpoints,
  WebsiteBuilderSearchHighlightEffect,
  WebsiteBuilderBlockRenderer,
  WebsiteBuilderRenderDepthProvider,
  useWebsiteBuilderRenderDepth,
  cn,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Root,
  useKeyboardMenuController,
  KeyboardMenuList
};
