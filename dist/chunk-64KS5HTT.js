import {
  buildPhotonSearchTargetId
} from "./chunk-6LYMEWZL.js";
import {
  editableFrameClassName
} from "./chunk-K6EYZM4G.js";
import {
  usePhotonCanEdit,
  usePhotonFieldValue,
  usePhotonStore
} from "./chunk-HCJ7LK3V.js";
import {
  PHOTON_EMPTY_TEXT
} from "./chunk-KAITZE7U.js";

// src/components/editable/editable-text.tsx
import { useEffect, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
var EditableText = ({
  blockId,
  path,
  as: Tag = "span",
  className,
  placeholder = PHOTON_EMPTY_TEXT,
  ...rest
}) => {
  const selectedField = usePhotonStore((state) => state.selectedField);
  const selectField = usePhotonStore((state) => state.selectField);
  const clearSelectedField = usePhotonStore(
    (state) => state.clearSelectedField
  );
  const updateFieldValue = usePhotonStore(
    (state) => state.updateFieldValue
  );
  const inputRef = useRef(null);
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
        "data-photon-search-target": searchTargetId,
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
      "data-photon-search-target": searchTargetId,
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
