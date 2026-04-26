import {
  PhotonRichTextEditor,
  photonRichTextContentClassName,
  renderPhotonRichTextHtml
} from "./chunk-HEAUAOXC.js";
import {
  buildPhotonSearchTargetId
} from "./chunk-6LYMEWZL.js";
import {
  createActivationProps,
  editableFrameClassName,
  useResolvedFieldValue
} from "./chunk-3DINFRWK.js";
import {
  usePhotonCanEdit,
  usePhotonFieldValue,
  usePhotonStore
} from "./chunk-BJK5VDXG.js";
import {
  PHOTON_EMPTY_TEXT
} from "./chunk-P4O7POLV.js";

// src/components/editable/editable-rich-text.tsx
import clsx from "clsx";
import { jsx } from "react/jsx-runtime";
var EditableRichText = ({
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
  const value = String(usePhotonFieldValue(blockId, path) ?? "");
  const resolvedValue = useResolvedFieldValue(value);
  const isEditable = usePhotonCanEdit();
  const isActive = selectedField?.blockId === blockId && selectedField.path === path;
  const searchTargetId = buildPhotonSearchTargetId(blockId, path);
  if (isEditable && isActive) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-photon-search-target": searchTargetId,
        className: editableFrameClassName({ isActive, isEditable }),
        children: /* @__PURE__ */ jsx(
          PhotonRichTextEditor,
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...createActivationProps(isEditable, () => selectField(blockId, path)),
      "data-photon-search-target": searchTargetId,
      className: editableFrameClassName({ isActive, isEditable }),
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(
            photonRichTextContentClassName,
            className,
            !value && "text-[color:var(--photon-site-muted)] opacity-60"
          ),
          dangerouslySetInnerHTML: {
            __html: renderPhotonRichTextHtml(resolvedValue, placeholder)
          }
        }
      )
    }
  );
};

export {
  EditableRichText
};
