import {
  buildWebsiteBuilderSearchTargetId
} from "./chunk-VDE2PPT5.js";
import {
  useWebsiteBuilderCanEdit,
  useWebsiteBuilderFieldValue
} from "./chunk-ZQJWNS6S.js";
import {
  WEBSITE_BUILDER_EMPTY_TEXT
} from "./chunk-KUHW6SOQ.js";

// src/components/public/public-editable-text.tsx
import clsx from "clsx";
import { useEffect, useState } from "react";

// src/helpers/editable-editor-loaders.ts
var getWebsiteBuilderEditableEditorLoader = (key) => globalThis.__websiteBuilderEditableEditorLoaders?.[key] ?? null;

// src/components/public/public-editable-text.tsx
import { jsx } from "react/jsx-runtime";
var EditableText = ({
  blockId,
  path,
  as: Tag = "span",
  className,
  placeholder = WEBSITE_BUILDER_EMPTY_TEXT,
  ...rest
}) => {
  const canEdit = useWebsiteBuilderCanEdit();
  const value = String(useWebsiteBuilderFieldValue(blockId, path) ?? "");
  const [EditableTextEditor, setEditableTextEditor] = useState(null);
  useEffect(() => {
    if (!canEdit || EditableTextEditor) {
      return;
    }
    let cancelled = false;
    const loadEditor = getWebsiteBuilderEditableEditorLoader("text");
    if (!loadEditor) {
      return;
    }
    void loadEditor().then((component) => {
      if (!cancelled) {
        setEditableTextEditor(() => component);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [canEdit, EditableTextEditor]);
  if (canEdit && EditableTextEditor) {
    return /* @__PURE__ */ jsx(
      EditableTextEditor,
      {
        blockId,
        path,
        as: Tag,
        className,
        placeholder,
        ...rest
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Tag,
    {
      ...rest,
      "data-wb-search-target": buildWebsiteBuilderSearchTargetId(blockId, path),
      className: clsx(className, !value && "opacity-60"),
      children: value || placeholder
    }
  );
};

export {
  getWebsiteBuilderEditableEditorLoader,
  EditableText
};
