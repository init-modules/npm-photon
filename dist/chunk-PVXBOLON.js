import {
  WEBSITE_BUILDER_EMPTY_TEXT
} from "./chunk-KUHW6SOQ.js";

// src/components/rich-text-editor.tsx
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import clsx from "clsx";
import { useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var websiteBuilderRichTextContentClassName = "text-[var(--wb-site-text)] [&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--wb-site-border)] [&_blockquote]:pl-4 [&_blockquote]:text-[var(--wb-site-muted-text)] [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.04em] [&_h2]:text-[var(--wb-site-text)] [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-[-0.03em] [&_h3]:text-[var(--wb-site-text)] [&_li]:text-[var(--wb-site-text)] [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:leading-8 [&_p]:text-[var(--wb-site-text)] [&_p+p]:mt-4 [&_strong]:font-semibold [&_strong]:text-[var(--wb-site-text)] [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5";
var escapeRichTextHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
var normalizeRichTextValue = (value) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "<p></p>";
  }
  if (trimmed.startsWith("<")) {
    return trimmed;
  }
  return `<p>${escapeRichTextHtml(trimmed)}</p>`;
};
var richTextToolbarButtonClassName = (isActive) => clsx(
  "rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition",
  isActive ? "border-[color:var(--wb-builder-border-strong)] bg-[color:var(--wb-builder-accent-soft)] text-[color:var(--wb-builder-accent-text)]" : "border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-field)] text-[color:var(--wb-builder-text-soft)] hover:border-[color:var(--wb-builder-border-strong)] hover:text-[color:var(--wb-builder-text)]"
);
var renderWebsiteBuilderRichTextHtml = (value, placeholder = WEBSITE_BUILDER_EMPTY_TEXT) => {
  if (value.trim()) {
    return normalizeRichTextValue(value);
  }
  return `<p>${escapeRichTextHtml(placeholder)}</p>`;
};
var WebsiteBuilderRichTextEditor = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onEscape,
  placeholder = WEBSITE_BUILDER_EMPTY_TEXT,
  className,
  surfaceClassName
}) => {
  const normalizedValue = normalizeRichTextValue(value);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        }
      }),
      Placeholder.configure({
        placeholder
      })
    ],
    content: normalizedValue,
    editorProps: {
      attributes: {
        class: clsx(
          "min-h-[10rem] text-inherit outline-none",
          websiteBuilderRichTextContentClassName,
          className
        )
      },
      handleKeyDown: (_view, event) => {
        if (event.key !== "Escape") {
          return false;
        }
        event.preventDefault();
        onEscape?.();
        return true;
      },
      handleDOMEvents: {
        blur: () => {
          onBlur?.();
          return false;
        }
      }
    },
    onFocus: () => onFocus?.(),
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    }
  });
  useEffect(() => {
    if (!editor) {
      return;
    }
    if (editor.getHTML() !== normalizedValue) {
      editor.commands.setContent(normalizedValue, false);
    }
  }, [editor, normalizedValue]);
  if (!editor) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-3 flex flex-wrap gap-2", children: [
      {
        key: "bold",
        label: "Bold",
        active: editor.isActive("bold"),
        run: () => editor.chain().focus().toggleBold().run()
      },
      {
        key: "italic",
        label: "Italic",
        active: editor.isActive("italic"),
        run: () => editor.chain().focus().toggleItalic().run()
      },
      {
        key: "h2",
        label: "H2",
        active: editor.isActive("heading", { level: 2 }),
        run: () => editor.chain().focus().toggleHeading({ level: 2 }).run()
      },
      {
        key: "h3",
        label: "H3",
        active: editor.isActive("heading", { level: 3 }),
        run: () => editor.chain().focus().toggleHeading({ level: 3 }).run()
      },
      {
        key: "bullet",
        label: "Bullets",
        active: editor.isActive("bulletList"),
        run: () => editor.chain().focus().toggleBulletList().run()
      },
      {
        key: "ordered",
        label: "Numbered",
        active: editor.isActive("orderedList"),
        run: () => editor.chain().focus().toggleOrderedList().run()
      },
      {
        key: "quote",
        label: "Quote",
        active: editor.isActive("blockquote"),
        run: () => editor.chain().focus().toggleBlockquote().run()
      },
      {
        key: "paragraph",
        label: "Text",
        active: editor.isActive("paragraph"),
        run: () => editor.chain().focus().setParagraph().run()
      }
    ].map((item) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onMouseDown: (event) => {
          event.preventDefault();
          item.run();
        },
        className: richTextToolbarButtonClassName(item.active),
        children: item.label
      },
      item.key
    )) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx(
          "rounded-[1.75rem] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-field)] px-4 py-4 text-[color:var(--wb-builder-text)]",
          surfaceClassName
        ),
        children: /* @__PURE__ */ jsx(EditorContent, { editor })
      }
    )
  ] });
};

export {
  websiteBuilderRichTextContentClassName,
  renderWebsiteBuilderRichTextHtml,
  WebsiteBuilderRichTextEditor
};
