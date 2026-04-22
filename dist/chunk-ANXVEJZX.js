import {
  WebsiteBuilderRichTextEditor,
  renderWebsiteBuilderRichTextHtml,
  websiteBuilderRichTextContentClassName
} from "./chunk-PVXBOLON.js";
import {
  buildWebsiteBuilderSearchTargetId
} from "./chunk-VDE2PPT5.js";
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

// src/components/editable/editable-rich-text.tsx
import clsx from "clsx";
import { jsx } from "react/jsx-runtime";
var EditableRichText = ({
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
  const value = String(useWebsiteBuilderFieldValue(blockId, path) ?? "");
  const isEditable = useWebsiteBuilderCanEdit();
  const isActive = selectedField?.blockId === blockId && selectedField.path === path;
  const searchTargetId = buildWebsiteBuilderSearchTargetId(blockId, path);
  if (isEditable && isActive) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-wb-search-target": searchTargetId,
        className: editableFrameClassName({ isActive, isEditable }),
        children: /* @__PURE__ */ jsx(
          WebsiteBuilderRichTextEditor,
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
      "data-wb-search-target": searchTargetId,
      className: editableFrameClassName({ isActive, isEditable }),
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(
            websiteBuilderRichTextContentClassName,
            className,
            !value && "text-[color:var(--wb-site-muted)] opacity-60"
          ),
          dangerouslySetInnerHTML: {
            __html: renderWebsiteBuilderRichTextHtml(value, placeholder)
          }
        }
      )
    }
  );
};

export {
  EditableRichText
};
