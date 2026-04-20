import {
  useWebsiteBuilderCanEdit,
  useWebsiteBuilderFieldValue,
  useWebsiteBuilderStore
} from "./chunk-HCA5T4KG.js";
import {
  WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM,
  WEBSITE_BUILDER_SEARCH_QUERY_PARAM,
  WEBSITE_BUILDER_SEARCH_TARGET_PARAM
} from "./chunk-HFEMF2E3.js";
import {
  WEBSITE_BUILDER_EMPTY_TEXT
} from "./chunk-IEZXES2I.js";

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
import { useEffect, useRef } from "react";

// src/components/editable/shared.ts
import clsx from "clsx";
var editableFrameClassName = ({
  isActive,
  isEditable,
  className
}) => clsx(
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

// src/components/editable/editable-text.tsx
import { jsx } from "react/jsx-runtime";
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
  useEffect(() => {
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
    return /* @__PURE__ */ jsx(
      Tag,
      {
        ...rest,
        "data-wb-search-target": searchTargetId,
        onClick: (event) => event.stopPropagation(),
        className: editableFrameClassName({ isActive, isEditable, className }),
        children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
import { jsx as jsx2 } from "react/jsx-runtime";
var EditableRepeaterValue = ({
  blockId,
  path,
  fallback,
  className,
  as
}) => {
  return /* @__PURE__ */ jsx2(
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

export {
  buildWebsiteBuilderSearchTargetId,
  buildWebsiteBuilderSearchResultHref,
  editableFrameClassName,
  createActivationProps,
  builderInputClassName,
  formatMediaFileSize,
  EditableText,
  EditableRepeaterValue
};
