import {
  usePhotonRouteContext,
  usePhotonSiteData
} from "./chunk-YD42FZ4X.js";
import {
  extractPhotonSiteDataBindings,
  resolvePhotonSiteDataBinding
} from "./chunk-UOWHTI2K.js";

// src/components/editable/shared.ts
import clsx from "clsx";
import { useMemo } from "react";
var useResolvedFieldValue = (value) => {
  const siteData = usePhotonSiteData();
  const routeContext = usePhotonRouteContext();
  return useMemo(() => {
    if (extractPhotonSiteDataBindings(value).length === 0) {
      return value;
    }
    return resolvePhotonSiteDataBinding(value, siteData, { routeContext });
  }, [routeContext, siteData, value]);
};
var editableFrameClassName = ({
  isActive,
  isEditable,
  className
}) => clsx(
  className,
  isEditable && "rounded-[1.5rem] transition-[background-color,box-shadow,transform,border-color] duration-200",
  isEditable && !isActive && "cursor-text shadow-[0_0_0_1px_transparent] hover:bg-white/[0.03] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]",
  isEditable && isActive && "bg-cyan-300/[0.07] shadow-[0_0_0_1px_rgba(34,211,238,0.52)]"
);
var createActivationProps = (isEditable, activate) => isEditable ? {
  role: "button",
  tabIndex: 0,
  onClick: (event) => {
    event.stopPropagation();
    activate();
  },
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      activate();
    }
  }
} : {};
var builderInputClassName = "w-full rounded-[24px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)] px-4 py-3 text-sm text-[color:var(--photon-builder-text)] outline-none ring-0 transition placeholder:text-[color:var(--photon-builder-text-ghost)] focus:border-[color:var(--photon-builder-border-strong)]";
var formatMediaFileSize = (size) => {
  if (!size || size <= 0) {
    return null;
  }
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export {
  useResolvedFieldValue,
  editableFrameClassName,
  createActivationProps,
  builderInputClassName,
  formatMediaFileSize
};
