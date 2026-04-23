import {
  buildPhotonSearchTargetId
} from "./chunk-FRFYYFDJ.js";
import {
  createActivationProps,
  editableFrameClassName
} from "./chunk-K6EYZM4G.js";
import {
  usePhotonCanEdit,
  usePhotonFieldValue,
  usePhotonStore
} from "./chunk-BIMQCHT5.js";
import {
  PHOTON_EMPTY_TEXT
} from "./chunk-KAITZE7U.js";

// src/components/editable/editable-textarea.tsx
import { useEffect, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
var EditableTextarea = ({
  blockId,
  path,
  className,
  placeholder = PHOTON_EMPTY_TEXT
}) => {
  const selectedField = usePhotonStore((state) => state.selectedField);
  const selectField = usePhotonStore((state) => state.selectField);
  const clearSelectedField = usePhotonStore(
    (state) => state.clearSelectedField
  );
  const updateFieldValue = usePhotonStore(
    (state) => state.updateFieldValue
  );
  const textareaRef = useRef(null);
  const value = String(usePhotonFieldValue(blockId, path) ?? "");
  const fallbackValue = value || (placeholder !== PHOTON_EMPTY_TEXT ? String(placeholder) : "");
  const [draftValue, setDraftValue] = useState(fallbackValue);
  const isEditable = usePhotonCanEdit();
  const isActive = selectedField?.blockId === blockId && selectedField.path === path;
  const searchTargetId = buildPhotonSearchTargetId(blockId, path);
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
        "data-photon-search-target": searchTargetId,
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
      "data-photon-search-target": searchTargetId,
      className: editableFrameClassName({ isActive, isEditable, className }),
      children: value || placeholder
    }
  );
};

export {
  EditableTextarea
};
