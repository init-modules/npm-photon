// src/components/editable/media-state-chip.tsx
import clsx from "clsx";
import { jsx } from "react/jsx-runtime";
var MediaStateChip = ({
  children,
  tone = "neutral"
}) => /* @__PURE__ */ jsx(
  "div",
  {
    "data-testid": tone === "accent" ? "wb-media-state-chip-accent" : "wb-media-state-chip",
    className: clsx(
      "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
    ),
    style: tone === "accent" ? {
      borderColor: "var(--wb-gallery-chip-accent-border, rgba(34,211,238,0.16))",
      background: "var(--wb-gallery-chip-accent-bg, rgba(34,211,238,0.1))",
      color: "var(--wb-gallery-chip-accent-text, rgba(207,250,254,0.84))"
    } : {
      borderColor: "var(--wb-gallery-chip-border, rgba(255,255,255,0.1))",
      background: "var(--wb-gallery-chip-bg, rgba(255,255,255,0.03))",
      color: "var(--wb-gallery-chip-text, rgba(255,255,255,0.52))"
    },
    children
  }
);

export {
  MediaStateChip
};
