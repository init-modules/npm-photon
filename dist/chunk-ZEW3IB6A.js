import {
  MediaStateChip
} from "./chunk-RLJXTXGN.js";
import {
  builderInputClassName,
  createActivationProps,
  editableFrameClassName,
  formatMediaFileSize
} from "./chunk-K6EYZM4G.js";
import {
  usePhotonCanEdit,
  usePhotonFieldValue,
  usePhotonStore,
  usePhotonStoreApi
} from "./chunk-YF6CIIBW.js";
import {
  isPhotonMediaValue,
  resolvePhotonMediaPreviewUrl,
  resolvePhotonMediaUrl,
  updatePhotonMediaUrl
} from "./chunk-QQDDM7OM.js";

// src/components/editable/editable-image.tsx
import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { jsx, jsxs } from "react/jsx-runtime";
var EditableImage = ({
  blockId,
  path,
  altPath,
  className,
  imageClassName,
  fallbackAlt = "Builder image"
}) => {
  const store = usePhotonStoreApi();
  const documentId = usePhotonStore((state) => state.document.id);
  const selectedField = usePhotonStore((state) => state.selectedField);
  const selectField = usePhotonStore((state) => state.selectField);
  const updateFieldValue = usePhotonStore(
    (state) => state.updateFieldValue
  );
  const uploadMedia = usePhotonStore((state) => state.uploadMedia);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const rawValue = usePhotonFieldValue(blockId, path);
  const source = previewUrl ?? resolvePhotonMediaPreviewUrl(rawValue);
  const altValue = altPath ? usePhotonFieldValue(blockId, altPath) : null;
  const alt = altPath ? String(altValue ?? fallbackAlt) : fallbackAlt;
  const mediaValue = isPhotonMediaValue(rawValue) ? rawValue : null;
  const isEditable = usePhotonCanEdit();
  const isActive = selectedField?.blockId === blockId && selectedField.path === path;
  const handleFileChange = (event) => {
    const file = event.currentTarget.files?.[0];
    if (!file) {
      return;
    }
    const nextPreviewUrl = URL.createObjectURL(file);
    if (!uploadMedia) {
      updateFieldValue(blockId, path, nextPreviewUrl);
      setPreviewUrl(nextPreviewUrl);
      return;
    }
    setPreviewUrl(nextPreviewUrl);
    setIsUploading(true);
    void uploadMedia({
      file,
      documentId,
      blockId,
      path
    }).then((uploadedMedia) => {
      updateFieldValue(blockId, path, uploadedMedia);
      if (altPath) {
        const currentAlt = String(
          store.getState().getFieldValue(blockId, altPath) ?? ""
        );
        if (!currentAlt.trim()) {
          updateFieldValue(
            blockId,
            altPath,
            file.name.replace(/\.[^.]+$/, "")
          );
        }
      }
    }).catch((error) => {
      toast.error("Upload failed", {
        description: error instanceof Error ? error.message : "Unable to upload the selected media file."
      });
    }).finally(() => {
      setIsUploading(false);
      setPreviewUrl((currentPreviewUrl) => {
        if (currentPreviewUrl) {
          URL.revokeObjectURL(currentPreviewUrl);
        }
        return null;
      });
      event.currentTarget.value = "";
    });
  };
  useEffect(
    () => () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    },
    [previewUrl]
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...createActivationProps(isEditable, () => selectField(blockId, path)),
      className: editableFrameClassName({ isActive, isEditable, className }),
      children: [
        source ? /* @__PURE__ */ jsx(
          "img",
          {
            src: source,
            alt,
            className: clsx("h-full w-full object-cover", imageClassName)
          }
        ) : /* @__PURE__ */ jsx("div", { className: "flex h-full min-h-[14rem] w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_28%),linear-gradient(180deg,rgba(9,18,31,0.92),rgba(5,11,20,0.98))] text-center text-white/48", children: /* @__PURE__ */ jsxs("div", { className: "px-6", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-100/66", children: "Media slot" }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 text-sm leading-7 text-white/54", children: "Upload a staged image or paste a remote URL directly into the live page." })
        ] }) }),
        isEditable ? /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(
              "pointer-events-none absolute inset-x-4 bottom-4 rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_58%),linear-gradient(180deg,rgba(7,17,31,0.94),rgba(6,13,24,0.98))] px-4 py-4 text-xs text-white/70 opacity-0 shadow-[0_20px_48px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-200 ease-out",
              isActive && "pointer-events-auto opacity-100"
            ),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "uppercase tracking-[0.26em] text-white/42", children: "Media source" }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  mediaValue?.temporaryUploadId ? /* @__PURE__ */ jsx(MediaStateChip, { tone: "accent", children: "staged" }) : null,
                  mediaValue?.mediaId ? /* @__PURE__ */ jsx(MediaStateChip, { children: "saved" }) : null,
                  mediaValue?.mimeType ? /* @__PURE__ */ jsx(MediaStateChip, { children: mediaValue.mimeType }) : null
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  value: resolvePhotonMediaUrl(rawValue),
                  onChange: (event) => updateFieldValue(
                    blockId,
                    path,
                    updatePhotonMediaUrl(
                      store.getState().getFieldValue(blockId, path),
                      event.currentTarget.value
                    )
                  ),
                  placeholder: "https://...",
                  className: clsx("mb-3", builderInputClassName)
                }
              ),
              altPath ? /* @__PURE__ */ jsx(
                "input",
                {
                  value: alt,
                  onChange: (event) => updateFieldValue(blockId, altPath, event.currentTarget.value),
                  placeholder: "Alt text",
                  className: clsx("mb-3", builderInputClassName)
                }
              ) : null,
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxs("label", { className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-cyan-300/16 bg-cyan-300/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100", children: [
                  /* @__PURE__ */ jsx("span", { children: isUploading ? "Uploading..." : source ? "Replace media" : "Upload media" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: handleFileChange,
                      disabled: isUploading
                    }
                  )
                ] }),
                source ? /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (event) => {
                      event.stopPropagation();
                      updateFieldValue(blockId, path, "");
                    },
                    className: "rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-white",
                    children: "Clear"
                  }
                ) : null,
                mediaValue?.fileName ? /* @__PURE__ */ jsx("div", { className: "rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55", children: mediaValue.fileName }) : null,
                formatMediaFileSize(mediaValue?.size) ? /* @__PURE__ */ jsx(MediaStateChip, { children: formatMediaFileSize(mediaValue?.size) ?? "" }) : null
              ] })
            ]
          }
        ) : null
      ]
    }
  );
};

export {
  EditableImage
};
