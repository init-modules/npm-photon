import {
  buildPhotonSearchTargetId
} from "./chunk-FRFYYFDJ.js";
import {
  usePhotonCanEdit,
  usePhotonFieldValue
} from "./chunk-XOQNSI7G.js";
import {
  PHOTON_EMPTY_TEXT
} from "./chunk-5MWE2CZQ.js";

// src/components/public/public-editable-text.tsx
import clsx from "clsx";
import { useEffect, useState } from "react";

// src/helpers/editable-editor-loaders.ts
var getPhotonEditableEditorLoader = (key) => globalThis.__photonEditableEditorLoaders?.[key] ?? null;

// src/components/public/public-editable-text.tsx
import { jsx } from "react/jsx-runtime";
var EditableText = ({
  blockId,
  path,
  as: Tag = "span",
  className,
  placeholder = PHOTON_EMPTY_TEXT,
  ...rest
}) => {
  const canEdit = usePhotonCanEdit();
  const value = String(usePhotonFieldValue(blockId, path) ?? "");
  const [EditableTextEditor, setEditableTextEditor] = useState(null);
  useEffect(() => {
    if (!canEdit || EditableTextEditor) {
      return;
    }
    let cancelled = false;
    const loadEditor = getPhotonEditableEditorLoader("text");
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
      "data-photon-search-target": buildPhotonSearchTargetId(blockId, path),
      className: clsx(className, !value && "opacity-60"),
      children: value || placeholder
    }
  );
};

export {
  getPhotonEditableEditorLoader,
  EditableText
};
