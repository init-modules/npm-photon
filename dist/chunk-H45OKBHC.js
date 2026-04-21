import {
  buildWebsiteBuilderSearchTargetId
} from "./chunk-JWEWJA2O.js";
import {
  editableFrameClassName
} from "./chunk-DUTVWY2H.js";
import {
  useWebsiteBuilderCanEdit,
  useWebsiteBuilderFieldValue,
  useWebsiteBuilderStore
} from "./chunk-OWDRVIFG.js";
import {
  WEBSITE_BUILDER_EMPTY_TEXT
} from "./chunk-NYLOTAVT.js";

// src/components/editable/editable-text.tsx
import { useEffect, useRef, useState } from "react";
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
  const fallbackValue = value || (placeholder !== WEBSITE_BUILDER_EMPTY_TEXT ? String(placeholder) : "");
  const [draftValue, setDraftValue] = useState(fallbackValue);
  const isEditable = useWebsiteBuilderCanEdit();
  const isActive = selectedField?.blockId === blockId && selectedField.path === path;
  const searchTargetId = buildWebsiteBuilderSearchTargetId(blockId, path);
  const handleChange = (event) => {
    const nextValue = event.currentTarget.value;
    setDraftValue(nextValue);
    updateFieldValue(blockId, path, nextValue);
  };
  const handleBlur = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    clearSelectedField();
  };
  const handleKeyDown = (event) => {
    event.stopPropagation();
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
      setDraftValue(fallbackValue);
      input.focus();
      const caretPosition = fallbackValue.length;
      input.setSelectionRange(caretPosition, caretPosition);
    }
  }, [fallbackValue, isActive, isEditable]);
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
            value: draftValue,
            placeholder,
            onChange: handleChange,
            onBlur: handleBlur,
            onKeyDown: handleKeyDown,
            onKeyUp: (event) => event.stopPropagation(),
            onKeyPress: (event) => event.stopPropagation(),
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

export {
  EditableText
};
