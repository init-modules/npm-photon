import {
  buildWebsiteBuilderSearchTargetId
} from "./chunk-JWEWJA2O.js";
import {
  createActivationProps,
  editableFrameClassName
} from "./chunk-DUTVWY2H.js";
import {
  useWebsiteBuilderCanEdit,
  useWebsiteBuilderFieldValue,
  useWebsiteBuilderStore
} from "./chunk-ZQJWNS6S.js";
import {
  WEBSITE_BUILDER_EMPTY_TEXT
} from "./chunk-KUHW6SOQ.js";

// src/components/editable/editable-textarea.tsx
import { useEffect, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
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
  const textareaRef = useRef(null);
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
      const textarea = textareaRef.current;
      if (!textarea) {
        return;
      }
      setDraftValue(fallbackValue);
      textarea.focus();
      const caretPosition = fallbackValue.length;
      textarea.setSelectionRange(caretPosition, caretPosition);
    }
  }, [fallbackValue, isActive, isEditable]);
  if (isEditable && isActive) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-wb-search-target": searchTargetId,
        className: editableFrameClassName({ isActive, isEditable, className }),
        children: /* @__PURE__ */ jsx(
          "textarea",
          {
            ref: textareaRef,
            rows: 5,
            value: draftValue,
            placeholder,
            onChange: handleChange,
            onBlur: handleBlur,
            onKeyDown: handleKeyDown,
            onKeyUp: (event) => event.stopPropagation(),
            onKeyPress: (event) => event.stopPropagation(),
            onClick: (event) => event.stopPropagation(),
            className: "block w-full resize-y border-0 bg-transparent p-0 font-inherit leading-inherit tracking-inherit text-inherit outline-none ring-0 shadow-none placeholder:text-white/28 focus:outline-none"
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...createActivationProps(isEditable, () => selectField(blockId, path)),
      "data-wb-search-target": searchTargetId,
      className: editableFrameClassName({ isActive, isEditable, className }),
      children: value || placeholder
    }
  );
};

export {
  EditableTextarea
};
