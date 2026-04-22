import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  KeyboardMenuList,
  Root,
  useKeyboardMenuController
} from "./chunk-57U64XQ4.js";
import {
  EditableText,
  getPhotonEditableEditorLoader
} from "./chunk-KBISSZIA.js";
import {
  buildPhotonSearchResultHref,
  buildPhotonSearchTargetId
} from "./chunk-FRFYYFDJ.js";
import {
  collectPhotonFooterExtensionItems,
  collectPhotonHeaderExtensionItems,
  resolvePhotonSiteFrameExtensions
} from "./chunk-JSXMWVKI.js";
import {
  resolvePhotonMediaPreviewUrl
} from "./chunk-QQDDM7OM.js";
import {
  PhotonLink,
  usePhotonCanEdit,
  usePhotonFieldValue,
  usePhotonI18n,
  usePhotonStore
} from "./chunk-XOQNSI7G.js";
import {
  createPhotonLocalizedDefault,
  definePhotonBlockDefinition
} from "./chunk-U33YWAMI.js";
import {
  PHOTON_EMPTY_TEXT
} from "./chunk-5MWE2CZQ.js";

// src/components/public/public-editable-image.tsx
import clsx from "clsx";
import { useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
var EditableImage = ({
  blockId,
  path,
  altPath,
  className,
  imageClassName,
  fallbackAlt = "Builder image"
}) => {
  const canEdit = usePhotonCanEdit();
  const rawValue = usePhotonFieldValue(blockId, path);
  const source = resolvePhotonMediaPreviewUrl(rawValue);
  const altValue = altPath ? usePhotonFieldValue(blockId, altPath) : null;
  const alt = altPath ? String(altValue ?? fallbackAlt) : fallbackAlt;
  const [EditableImageEditor, setEditableImageEditor] = useState(null);
  useEffect(() => {
    if (!canEdit || EditableImageEditor) {
      return;
    }
    let cancelled = false;
    const loadEditor = getPhotonEditableEditorLoader("image");
    if (!loadEditor) {
      return;
    }
    void loadEditor().then((component) => {
      if (!cancelled) {
        setEditableImageEditor(() => component);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [canEdit, EditableImageEditor]);
  if (canEdit && EditableImageEditor) {
    return /* @__PURE__ */ jsx(
      EditableImageEditor,
      {
        blockId,
        path,
        altPath,
        className,
        imageClassName,
        fallbackAlt
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className, children: source ? /* @__PURE__ */ jsx(
    "img",
    {
      src: source,
      alt,
      className: clsx("h-full w-full object-cover", imageClassName)
    }
  ) : /* @__PURE__ */ jsx("div", { className: "flex h-full min-h-[14rem] w-full items-center justify-center bg-[color:var(--photon-site-surface)] text-center text-[color:var(--photon-site-muted)]", children: /* @__PURE__ */ jsx("div", { className: "px-6 text-sm leading-7", children: "Media" }) }) });
};

// src/components/public/public-editable-textarea.tsx
import clsx2 from "clsx";
import { useEffect as useEffect2, useState as useState2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var EditableTextarea = ({
  blockId,
  path,
  className,
  placeholder = PHOTON_EMPTY_TEXT
}) => {
  const canEdit = usePhotonCanEdit();
  const value = String(usePhotonFieldValue(blockId, path) ?? "");
  const [EditableTextareaEditor, setEditableTextareaEditor] = useState2(null);
  useEffect2(() => {
    if (!canEdit || EditableTextareaEditor) {
      return;
    }
    let cancelled = false;
    const loadEditor = getPhotonEditableEditorLoader("textarea");
    if (!loadEditor) {
      return;
    }
    void loadEditor().then((component) => {
      if (!cancelled) {
        setEditableTextareaEditor(
          () => component
        );
      }
    });
    return () => {
      cancelled = true;
    };
  }, [canEdit, EditableTextareaEditor]);
  if (canEdit && EditableTextareaEditor) {
    return /* @__PURE__ */ jsx2(
      EditableTextareaEditor,
      {
        blockId,
        path,
        className,
        placeholder
      }
    );
  }
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-photon-search-target": buildPhotonSearchTargetId(blockId, path),
      className: clsx2(className, !value && "opacity-60"),
      children: value || placeholder
    }
  );
};

// src/helpers/public-site-design.ts
var PHOTON_PUBLIC_SITE_DESIGN_TOKEN_KEYS = [
  "bodyFontFamily",
  "headingFontFamily",
  "backgroundColor",
  "surfaceColor",
  "textColor",
  "mutedTextColor",
  "accentColor",
  "borderColor",
  "siteMaxWidth",
  "pageGutter",
  "sectionGap",
  "radius",
  "headerOffset"
];
var PHOTON_PUBLIC_SITE_DESIGN_COLOR_TOKEN_KEYS = [
  "backgroundColor",
  "surfaceColor",
  "textColor",
  "mutedTextColor",
  "accentColor",
  "borderColor"
];
var PHOTON_PUBLIC_SITE_DESIGN_DEFAULTS = {
  bodyFontFamily: "var(--font-display, ui-sans-serif), system-ui, sans-serif",
  headingFontFamily: "var(--font-display, ui-sans-serif), system-ui, sans-serif",
  backgroundColor: "#081321",
  surfaceColor: "#0f1b2d",
  textColor: "#f8fbff",
  mutedTextColor: "#94a3b8",
  accentColor: "#14b8a6",
  borderColor: "rgba(148, 163, 184, 0.18)",
  siteMaxWidth: "1280px",
  pageGutter: "24px",
  sectionGap: "32px",
  radius: "24px",
  headerOffset: "0px"
};
var PHOTON_PUBLIC_SITE_DESIGN_FALLBACK_DEFAULTS = {
  bodyFontFamily: "ui-sans-serif, system-ui, sans-serif",
  headingFontFamily: "ui-sans-serif, system-ui, sans-serif",
  backgroundColor: "#f8fafc",
  surfaceColor: "#ffffff",
  textColor: "#0f172a",
  mutedTextColor: "#64748b",
  accentColor: "#0f766e",
  borderColor: "#dbe4ee",
  siteMaxWidth: "1280px",
  pageGutter: "24px",
  sectionGap: "32px",
  radius: "24px",
  headerOffset: "0px"
};
var asSiteDesignCandidate = (value) => typeof value === "object" && value !== null ? value : {};
var readNonEmptyString = (value) => typeof value === "string" && value.trim() !== "" ? value : void 0;
var readTokenOverrides = (candidate, keys) => keys.reduce((result, key) => {
  const value = readNonEmptyString(candidate[key]);
  if (value !== void 0) {
    result[key] = value;
  }
  return result;
}, {});
var hasAnyTokenOverride = (candidate, keys) => keys.some((key) => readNonEmptyString(candidate[key]) !== void 0);
var normalizeComponentVariants = (value) => {
  if (typeof value !== "object" || value === null) {
    return {};
  }
  return Object.entries(
    value
  ).reduce(
    (result, [key, candidateValue]) => {
      const normalizedValue = readNonEmptyString(candidateValue);
      if (key.trim() !== "" && normalizedValue !== void 0) {
        result[key] = normalizedValue;
      }
      return result;
    },
    {}
  );
};
var matchesPublicFallbackDefaults = (value) => PHOTON_PUBLIC_SITE_DESIGN_TOKEN_KEYS.every(
  (key) => value[key] === PHOTON_PUBLIC_SITE_DESIGN_FALLBACK_DEFAULTS[key]
);
var resolvePhotonPublicSiteDesignSettings = (value) => {
  const candidate = asSiteDesignCandidate(value);
  const tokenOverrides = readTokenOverrides(
    candidate,
    PHOTON_PUBLIC_SITE_DESIGN_TOKEN_KEYS
  );
  const componentVariants = normalizeComponentVariants(
    candidate.componentVariants
  );
  const tokenSettings = {
    ...PHOTON_PUBLIC_SITE_DESIGN_DEFAULTS,
    ...tokenOverrides
  };
  const hasTokenOverrides = hasAnyTokenOverride(
    candidate,
    PHOTON_PUBLIC_SITE_DESIGN_TOKEN_KEYS
  );
  const hasColorOverrides = hasAnyTokenOverride(
    candidate,
    PHOTON_PUBLIC_SITE_DESIGN_COLOR_TOKEN_KEYS
  );
  const hasComponentVariantOverrides = Object.keys(componentVariants).length > 0;
  const isFallbackDesign = hasTokenOverrides && !hasColorOverrides && !hasComponentVariantOverrides && matchesPublicFallbackDefaults(tokenSettings);
  return {
    ...isFallbackDesign ? PHOTON_PUBLIC_SITE_DESIGN_FALLBACK_DEFAULTS : PHOTON_PUBLIC_SITE_DESIGN_DEFAULTS,
    ...tokenOverrides,
    componentVariants
  };
};
var isPhotonPublicFramelessSiteDesign = (value) => {
  const settings = resolvePhotonPublicSiteDesignSettings(value);
  return settings.radius === "0px" || settings.sectionGap === "0px" || settings.componentVariants.siteShell === "editorial";
};

// src/search/photon-site-search.tsx
import clsx3 from "clsx";
import { Loader2, Search, X } from "lucide-react";
import {
  startTransition,
  useDeferredValue,
  useEffect as useEffect3,
  useMemo,
  useRef,
  useState as useState3
} from "react";
import { Fragment, jsx as jsx3, jsxs } from "react/jsx-runtime";
var searchDialogStyle = {
  background: "color-mix(in oklab, var(--photon-site-background) 88%, var(--photon-site-surface))",
  borderColor: "color-mix(in oklab, var(--photon-site-border) 24%, transparent)",
  boxShadow: "0 34px 110px rgba(0,0,0,0.34)"
};
var searchDividerStyle = {
  borderColor: "color-mix(in oklab, var(--photon-site-border) 18%, transparent)"
};
var searchPanelStyle = {
  background: "color-mix(in oklab, var(--photon-site-surface) 34%, transparent)",
  borderColor: "color-mix(in oklab, var(--photon-site-border) 18%, transparent)"
};
var searchResultStyle = (isActive) => ({
  background: isActive ? "color-mix(in oklab, var(--photon-site-accent) 13%, var(--photon-site-surface))" : "color-mix(in oklab, var(--photon-site-surface) 30%, transparent)",
  borderColor: isActive ? "color-mix(in oklab, var(--photon-site-accent) 54%, var(--photon-site-border))" : "color-mix(in oklab, var(--photon-site-border) 20%, transparent)"
});
var searchResultPillStyle = {
  borderColor: "color-mix(in oklab, var(--photon-site-border) 24%, transparent)"
};
var renderSnippetParts = (snippet, query) => {
  if (!query) {
    return [snippet];
  }
  const source = snippet.toLowerCase();
  const needle = query.toLowerCase();
  const matchIndex = source.indexOf(needle);
  if (matchIndex === -1) {
    return [snippet];
  }
  return [
    snippet.slice(0, matchIndex),
    snippet.slice(matchIndex, matchIndex + query.length),
    snippet.slice(matchIndex + query.length)
  ];
};
var PhotonSiteSearch = ({
  blockId,
  placeholderPath,
  className
}) => {
  const { translate } = usePhotonI18n();
  const { locale, contentLocale } = usePhotonI18n();
  const canEdit = usePhotonCanEdit();
  const searchSite = usePhotonStore((state) => state.searchSite);
  const mode = usePhotonStore((state) => state.mode);
  const isAdmin = usePhotonStore((state) => state.isAdmin);
  const workspace = usePhotonStore((state) => state.workspace);
  const placeholder = String(
    usePhotonFieldValue(blockId, placeholderPath) ?? "Search the website"
  );
  const [open, setOpen] = useState3(false);
  const [query, setQuery] = useState3("");
  const [results, setResults] = useState3([]);
  const [loading, setLoading] = useState3(false);
  const [error, setError] = useState3(null);
  const searchInputRef = useRef(null);
  const lastRequestId = useRef(0);
  const handleDialogOpenAutoFocus = (event) => {
    event.preventDefault();
    searchInputRef.current?.focus();
  };
  const deferredQuery = useDeferredValue(query.trim());
  const canSearch = typeof searchSite === "function";
  const hasQuery = deferredQuery.length >= 2;
  const searchSections = useMemo(
    () => [
      {
        id: "results",
        items: results
      }
    ],
    [results]
  );
  const searchMenu = useKeyboardMenuController({
    items: results,
    getItemId: (result) => result.id,
    isOpen: open && !loading,
    onSelectItem: (result) => {
      const href = buildPhotonSearchResultHref(
        result,
        deferredQuery || query.trim(),
        mode,
        isAdmin,
        {
          locale,
          contentLocale,
          currentSearchParams: typeof window === "undefined" ? void 0 : new URLSearchParams(window.location.search),
          workspaceSelection: workspace?.ref?.profileId ? {
            profileId: workspace.ref.profileId,
            branch: workspace.ref.branch,
            revisionId: workspace.ref.revisionId ?? null
          } : null
        }
      );
      const optionElement = searchMenu.getOptionElement(result.id);
      const linkElement = optionElement?.querySelector("[href]");
      setOpen(false);
      if (linkElement) {
        linkElement.click();
        return;
      }
      if (typeof window !== "undefined") {
        window.location.assign(href);
      }
    }
  });
  const summaryText = useMemo(() => {
    if (!hasQuery) {
      return translate(
        "photon.search.hint",
        "Type at least 2 characters to search across static pages and publications."
      );
    }
    if (loading) {
      return translate(
        "photon.search.loading",
        "Searching the live site surface\u2026"
      );
    }
    if (error) {
      return error;
    }
    if (results.length === 0) {
      return "No matches found for this query.";
    }
    return `${results.length} match${results.length === 1 ? "" : "es"} across the live site.`;
  }, [error, hasQuery, loading, results.length, translate]);
  useEffect3(() => {
    if (!open) {
      return;
    }
    searchInputRef.current?.focus();
  }, [open]);
  useEffect3(() => {
    if (!open || !canSearch) {
      return;
    }
    if (!hasQuery) {
      startTransition(() => {
        setResults([]);
        setLoading(false);
        setError(null);
      });
      return;
    }
    const requestId = lastRequestId.current + 1;
    lastRequestId.current = requestId;
    startTransition(() => {
      setLoading(true);
      setError(null);
    });
    void searchSite({
      query: deferredQuery,
      limit: 8
    }).then((nextResults) => {
      if (lastRequestId.current !== requestId) {
        return;
      }
      startTransition(() => {
        setResults(nextResults);
        setLoading(false);
      });
    }).catch(() => {
      if (lastRequestId.current !== requestId) {
        return;
      }
      startTransition(() => {
        setResults([]);
        setLoading(false);
        setError("Search is temporarily unavailable.");
      });
    });
  }, [canSearch, deferredQuery, hasQuery, open, searchSite]);
  if (!canSearch) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx3(
          "flex min-h-14 items-center gap-3 rounded-[24px] border border-[var(--photon-site-border)] bg-[var(--photon-site-background)] px-4",
          className
        ),
        children: [
          /* @__PURE__ */ jsx3(Search, { className: "h-4 w-4 shrink-0 text-[var(--photon-site-muted)]" }),
          /* @__PURE__ */ jsx3(
            EditableText,
            {
              blockId,
              path: placeholderPath,
              className: "text-sm text-[var(--photon-site-muted)]"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx3(
          "flex min-h-14 items-center gap-3 rounded-[24px] border border-[var(--photon-site-border)] bg-[var(--photon-site-background)] px-4",
          className
        ),
        children: [
          /* @__PURE__ */ jsx3(
            "button",
            {
              type: "button",
              onClick: () => setOpen(true),
              className: "inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--photon-site-muted)] transition hover:bg-black/5 hover:text-[var(--photon-site-text)]",
              "aria-label": translate(
                "photon.search.open",
                "Search the website"
              ),
              children: /* @__PURE__ */ jsx3(Search, { className: "h-4 w-4" })
            }
          ),
          canEdit ? /* @__PURE__ */ jsx3(
            EditableText,
            {
              blockId,
              path: placeholderPath,
              className: "flex-1 text-sm text-[var(--photon-site-muted)]"
            }
          ) : /* @__PURE__ */ jsx3(
            "button",
            {
              type: "button",
              onClick: () => setOpen(true),
              className: "flex-1 cursor-pointer text-left text-sm text-[var(--photon-site-muted)]",
              children: placeholder
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx3(Root, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(
      DialogContent,
      {
        onOpenAutoFocus: handleDialogOpenAutoFocus,
        className: "w-[min(44rem,calc(100%-1.5rem))] gap-0 overflow-hidden rounded-[24px] border p-0 text-[var(--photon-site-text)] backdrop-blur-xl",
        style: searchDialogStyle,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "sr-only", children: [
            /* @__PURE__ */ jsx3(DialogTitle, { children: translate(
              "photon.search.dialogTitle",
              "Search the website"
            ) }),
            /* @__PURE__ */ jsx3(DialogDescription, { children: translate(
              "photon.search.dialogDescription",
              "Find exact matches across static pages and publication pages."
            ) })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center gap-3 border-b px-5 py-4",
              style: searchDividerStyle,
              children: [
                /* @__PURE__ */ jsx3(Search, { className: "h-5 w-5 shrink-0 text-[var(--photon-site-muted-text)]" }),
                /* @__PURE__ */ jsx3(
                  "input",
                  {
                    ref: searchInputRef,
                    value: query,
                    onChange: (event) => setQuery(event.currentTarget.value),
                    onKeyDown: searchMenu.handleKeyDown,
                    placeholder,
                    role: "combobox",
                    "aria-autocomplete": "list",
                    "aria-controls": searchMenu.listId,
                    "aria-expanded": open,
                    "aria-activedescendant": searchMenu.activeOptionId,
                    className: "min-w-0 flex-1 border-0 bg-transparent text-base text-[var(--photon-site-text)] outline-none placeholder:text-[color-mix(in_srgb,var(--photon-site-muted-text)_72%,transparent)]"
                  }
                ),
                /* @__PURE__ */ jsx3(
                  "button",
                  {
                    type: "button",
                    onClick: () => setOpen(false),
                    className: "inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--photon-site-muted-text)] transition hover:bg-[color-mix(in_oklab,var(--photon-site-border)_38%,transparent)] hover:text-[var(--photon-site-text)]",
                    "aria-label": "Close search",
                    children: /* @__PURE__ */ jsx3(X, { className: "h-4 w-4" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx3(
            "div",
            {
              className: "border-b px-5 py-3 text-sm text-[var(--photon-site-muted-text)]",
              style: searchDividerStyle,
              children: summaryText
            }
          ),
          /* @__PURE__ */ jsx3("div", { className: "max-h-[24rem] overflow-y-auto px-3 py-3", children: loading ? /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center gap-3 rounded-[20px] border px-4 py-4 text-sm text-[var(--photon-site-muted-text)]",
              style: searchPanelStyle,
              children: [
                /* @__PURE__ */ jsx3(Loader2, { className: "h-4 w-4 animate-spin text-[var(--photon-site-accent)]" }),
                /* @__PURE__ */ jsx3("span", { children: "Searching the live site surface\u2026" })
              ]
            }
          ) : /* @__PURE__ */ jsx3(
            KeyboardMenuList,
            {
              controller: searchMenu,
              sections: searchSections,
              getItemId: (result) => result.id,
              listLabel: "Website search results",
              className: "space-y-2",
              emptyState: /* @__PURE__ */ jsx3(
                "div",
                {
                  className: "rounded-[20px] border border-dashed px-4 py-8 text-center text-sm leading-7 text-[var(--photon-site-muted-text)]",
                  style: searchPanelStyle,
                  children: hasQuery ? "No blocks matched this query yet." : "Search static page copy and publication content from the live site shell."
                }
              ),
              renderItem: (result, { isActive }) => {
                const snippetParts = renderSnippetParts(
                  result.snippet,
                  deferredQuery || query.trim()
                );
                return /* @__PURE__ */ jsx3(
                  "div",
                  {
                    "data-photon-search-result-id": result.id,
                    style: searchResultStyle(isActive),
                    className: clsx3(
                      "rounded-[20px] border transition",
                      isActive ? "hover:bg-[color-mix(in_oklab,var(--photon-site-accent)_16%,var(--photon-site-surface))]" : "hover:bg-[color-mix(in_oklab,var(--photon-site-accent)_10%,var(--photon-site-surface))]"
                    ),
                    children: /* @__PURE__ */ jsxs(
                      PhotonLink,
                      {
                        navigateInPreviewOnly: false,
                        locale,
                        href: buildPhotonSearchResultHref(
                          result,
                          deferredQuery || query.trim(),
                          mode,
                          isAdmin,
                          {
                            locale,
                            contentLocale,
                            currentSearchParams: typeof window === "undefined" ? void 0 : new URLSearchParams(window.location.search),
                            workspaceSelection: workspace?.ref?.profileId ? {
                              profileId: workspace.ref.profileId,
                              branch: workspace.ref.branch,
                              revisionId: workspace.ref.revisionId ?? null
                            } : null
                          }
                        ),
                        onClick: () => setOpen(false),
                        className: "block px-4 py-4",
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                              /* @__PURE__ */ jsx3("div", { className: "text-sm font-semibold text-[var(--photon-site-text)]", children: result.pageName }),
                              /* @__PURE__ */ jsx3("div", { className: "mt-1 text-[11px] uppercase tracking-[0.24em] text-[var(--photon-site-muted-text)]", children: result.route })
                            ] }),
                            /* @__PURE__ */ jsx3(
                              "div",
                              {
                                className: "shrink-0 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--photon-site-muted-text)]",
                                style: searchResultPillStyle,
                                children: result.pageKind
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "mt-3 text-sm leading-7 text-[var(--photon-site-muted-text)]", children: [
                            snippetParts[0],
                            snippetParts[1] ? /* @__PURE__ */ jsx3("mark", { className: "rounded-full bg-[color-mix(in_oklab,var(--photon-site-accent)_24%,var(--photon-site-surface))] px-1.5 py-0.5 text-[var(--photon-site-text)]", children: snippetParts[1] }) : null,
                            snippetParts[2] ?? ""
                          ] })
                        ]
                      }
                    )
                  }
                );
              }
            }
          ) })
        ]
      }
    ) })
  ] });
};

// src/modules/system/site/site-footer-shell-definition.tsx
import clsx4 from "clsx";
import { ArrowRight, Send } from "lucide-react";

// src/modules/system/site/helpers.ts
var normalizeString = (value) => typeof value === "string" ? value : "";
var normalizePhotonSiteLinkItems = (value) => Array.isArray(value) ? value.flatMap(
  (candidate) => typeof candidate === "object" && candidate !== null && typeof candidate.label === "string" && typeof candidate.href === "string" ? [
    {
      id: typeof candidate.id === "string" ? candidate.id : void 0,
      label: normalizeString(candidate.label),
      href: normalizeString(candidate.href),
      target: typeof candidate.target === "string" ? candidate.target : void 0,
      rel: typeof candidate.rel === "string" ? candidate.rel : void 0
    }
  ] : []
) : [];
var normalizePhotonSiteNavigationColumns = (value) => Array.isArray(value) ? value.flatMap(
  (candidate) => typeof candidate === "object" && candidate !== null && typeof candidate.title === "string" ? [
    {
      title: normalizeString(candidate.title),
      links: normalizePhotonSiteLinkItems(
        candidate.links ?? []
      )
    }
  ] : []
) : [];
var normalizePhotonSiteStringItems = (value) => Array.isArray(value) ? value.flatMap(
  (candidate) => typeof candidate === "string" && candidate.trim() !== "" ? [candidate] : []
) : [];

// src/modules/system/site/site-footer-shell-definition.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var siteFooterFields = [
  {
    path: "variant",
    label: "Variant",
    kind: "select",
    group: "style",
    localization: "shared",
    options: [
      { label: "Classic dark", value: "classic-dark" },
      { label: "Soft cards", value: "soft-cards" },
      { label: "Minimal air", value: "minimal-air" }
    ]
  },
  {
    path: "brandTitle",
    label: "Brand title",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "brandBody",
    label: "Brand body",
    kind: "textarea",
    group: "content",
    localization: "localized"
  },
  {
    path: "logoImage",
    label: "Logo image",
    kind: "image",
    group: "content",
    localization: "shared"
  },
  {
    path: "subscriptionTitle",
    label: "Subscription title",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "subscriptionBody",
    label: "Subscription body",
    kind: "textarea",
    group: "content",
    localization: "localized"
  },
  {
    path: "subscriptionPlaceholder",
    label: "Subscription placeholder",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "subscriptionButtonLabel",
    label: "Subscription button label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "navigationColumns",
    label: "Navigation columns",
    kind: "repeater",
    group: "content",
    localization: "localized",
    itemLabelPath: "title",
    addLabel: "Add navigation column",
    fields: [
      { path: "title", label: "Title", kind: "text" },
      {
        path: "links",
        label: "Links",
        kind: "repeater",
        addLabel: "Add link",
        itemLabelPath: "label",
        fields: [
          { path: "label", label: "Label", kind: "text" },
          { path: "href", label: "Href", kind: "url", localization: "shared" }
        ]
      }
    ]
  },
  {
    path: "contactItems",
    label: "Contact items",
    kind: "repeater",
    group: "content",
    localization: "localized",
    addLabel: "Add contact item",
    itemLabel: "Contact item",
    itemField: { label: "Contact item", kind: "text" }
  },
  {
    path: "legalLabel",
    label: "Legal label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "legalHref",
    label: "Legal href",
    kind: "url",
    group: "content",
    localization: "shared"
  },
  {
    path: "copyrightLabel",
    label: "Copyright label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "developerLabel",
    label: "Developer label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "developerHref",
    label: "Developer href",
    kind: "url",
    group: "content",
    localization: "shared"
  },
  {
    path: "disabledExtensionIds",
    label: "Disabled package extensions",
    kind: "tags",
    group: "layout",
    localization: "shared"
  },
  {
    path: "disabledExtensionItemIds",
    label: "Disabled package extension items",
    kind: "tags",
    group: "layout",
    localization: "shared"
  }
];
var footerVariantStyles = {
  "classic-dark": {
    shell: "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--photon-site-surface)_94%,black)_0%,color-mix(in_srgb,var(--photon-site-background)_88%,black)_100%)] text-white",
    card: "border-white/10 bg-white/[0.04]",
    text: "text-white",
    muted: "text-white/60"
  },
  "soft-cards": {
    shell: "bg-[linear-gradient(180deg,#f7f7fb_0%,#eef2f7_100%)] text-[var(--photon-site-text)]",
    card: "border-[var(--photon-site-border)] bg-white/85",
    text: "text-[var(--photon-site-text)]",
    muted: "text-[var(--photon-site-muted)]"
  },
  "minimal-air": {
    shell: "border-t border-[var(--photon-site-border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--photon-site-background)_94%,white)_0%,color-mix(in_srgb,var(--photon-site-surface)_94%,white)_100%)] text-[var(--photon-site-text)] shadow-none",
    card: "border-transparent bg-transparent",
    text: "text-[var(--photon-site-text)]",
    muted: "text-[var(--photon-site-muted)]"
  }
};
var SiteFooterShell = ({
  block
}) => {
  const siteDesign = usePhotonStore(
    (state) => state.site.settings.design
  );
  const siteFrameExtensions = usePhotonStore(
    (state) => state.siteFrameExtensions
  );
  const framelessSite = isPhotonPublicFramelessSiteDesign(siteDesign);
  const footerVariant = framelessSite ? "minimal-air" : block.props.variant;
  const variant = footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"];
  const isSoftCardsVariant = footerVariant === "soft-cards" && !framelessSite;
  const disabledExtensionIds = normalizePhotonSiteStringItems(
    block.props.disabledExtensionIds
  );
  const disabledExtensionItemIds = normalizePhotonSiteStringItems(
    block.props.disabledExtensionItemIds
  );
  const footerExtensionItems = collectPhotonFooterExtensionItems(
    resolvePhotonSiteFrameExtensions(
      siteFrameExtensions,
      disabledExtensionIds
    ),
    disabledExtensionItemIds
  );
  const navigationColumns = [
    ...normalizePhotonSiteNavigationColumns(
      block.props.navigationColumns
    ),
    ...normalizePhotonSiteNavigationColumns(
      footerExtensionItems.navigationColumns
    )
  ];
  const legalLinks = normalizePhotonSiteLinkItems(
    footerExtensionItems.legalLinks
  );
  const contactItems = normalizePhotonSiteStringItems(
    block.props.contactItems
  );
  return /* @__PURE__ */ jsx4(
    "footer",
    {
      className: clsx4(
        "w-full transition-colors duration-300",
        (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).shell
      ),
      children: /* @__PURE__ */ jsxs2("div", { className: "mx-auto flex w-full max-w-[var(--photon-site-max-width,1280px)] flex-col gap-5 px-[var(--photon-site-gutter,24px)] py-8 pb-12 sm:py-10 sm:pb-14", children: [
        /* @__PURE__ */ jsxs2("div", { className: "grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]", children: [
          /* @__PURE__ */ jsx4(
            "div",
            {
              className: clsx4(
                footerVariant === "minimal-air" ? "rounded-none border-0 border-b border-[var(--photon-site-border)] px-0 pb-6 pt-0 sm:px-0" : "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: /* @__PURE__ */ jsxs2("div", { className: "grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)]", children: [
                /* @__PURE__ */ jsx4("div", { className: "relative h-24 w-24 overflow-hidden rounded-[28px] border border-[var(--photon-site-border)] bg-[linear-gradient(180deg,rgba(15,118,110,0.16),rgba(15,118,110,0.04))]", children: block.props.logoImage ? /* @__PURE__ */ jsx4(
                  EditableImage,
                  {
                    blockId: block.id,
                    path: "logoImage",
                    className: "h-full w-full rounded-[28px]",
                    imageClassName: "h-full w-full object-contain p-3",
                    fallbackAlt: block.props.brandTitle
                  }
                ) : /* @__PURE__ */ jsx4("div", { className: "flex h-full items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--photon-site-accent)]", children: /* @__PURE__ */ jsx4(
                  EditableText,
                  {
                    blockId: block.id,
                    path: "brandTitle",
                    className: "text-[var(--photon-site-accent)]"
                  }
                ) }) }),
                /* @__PURE__ */ jsxs2("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx4(
                    EditableText,
                    {
                      blockId: block.id,
                      path: "brandTitle",
                      as: "h2",
                      className: clsx4(
                        "[font-family:var(--photon-site-heading-font)] text-3xl font-semibold tracking-[-0.05em]",
                        variant.text
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx4(
                    EditableTextarea,
                    {
                      blockId: block.id,
                      path: "brandBody",
                      className: clsx4("mt-4 leading-7", variant.muted)
                    }
                  )
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs2(
            "div",
            {
              className: clsx4(
                footerVariant === "minimal-air" ? "rounded-none border-0 px-0 py-0 sm:px-0" : "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                block.props.variant === "soft-cards" && !framelessSite ? "border-transparent bg-[linear-gradient(135deg,var(--photon-site-accent),color-mix(in srgb,var(--photon-site-accent) 72%, white))] text-white shadow-[0_28px_60px_rgba(15,118,110,0.24)]" : (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: [
                /* @__PURE__ */ jsxs2("div", { className: "max-w-xl", children: [
                  /* @__PURE__ */ jsx4(
                    EditableText,
                    {
                      blockId: block.id,
                      path: "subscriptionTitle",
                      as: "h3",
                      className: "[font-family:var(--photon-site-heading-font)] text-2xl font-semibold tracking-[-0.04em]"
                    }
                  ),
                  /* @__PURE__ */ jsx4(
                    EditableTextarea,
                    {
                      blockId: block.id,
                      path: "subscriptionBody",
                      className: clsx4(
                        "mt-3 leading-7",
                        isSoftCardsVariant ? "text-white/82" : variant.muted
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs2("div", { className: "mt-5 flex flex-col gap-3 sm:flex-row", children: [
                  /* @__PURE__ */ jsx4(
                    "div",
                    {
                      className: clsx4(
                        "flex min-h-14 flex-1 items-center px-4",
                        footerVariant === "minimal-air" ? "rounded-full border border-[var(--photon-site-border)] bg-white/72" : "rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
                      ),
                      children: /* @__PURE__ */ jsx4(
                        EditableText,
                        {
                          blockId: block.id,
                          path: "subscriptionPlaceholder",
                          className: clsx4(
                            "text-sm",
                            isSoftCardsVariant ? "text-white/74" : variant.muted
                          )
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxs2(
                    "button",
                    {
                      type: "button",
                      className: clsx4(
                        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-[0_18px_34px_rgba(15,23,42,0.12)]",
                        isSoftCardsVariant ? "bg-white text-[var(--photon-site-accent)]" : "bg-[var(--photon-site-accent)] text-white"
                      ),
                      children: [
                        /* @__PURE__ */ jsx4(Send, { className: "h-4 w-4" }),
                        /* @__PURE__ */ jsx4(
                          EditableText,
                          {
                            blockId: block.id,
                            path: "subscriptionButtonLabel",
                            className: clsx4(
                              isSoftCardsVariant ? "text-[var(--photon-site-accent)]" : "text-white"
                            )
                          }
                        )
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]", children: [
          /* @__PURE__ */ jsx4(
            "div",
            {
              className: clsx4(
                footerVariant === "minimal-air" ? "rounded-none border-0 border-b border-[var(--photon-site-border)] px-0 pb-6 pt-0 sm:px-0" : "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: /* @__PURE__ */ jsx4("div", { className: "grid gap-6 md:grid-cols-2", children: navigationColumns.map((column) => /* @__PURE__ */ jsxs2("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx4("div", { className: clsx4("text-sm font-semibold", variant.text), children: column.title }),
                /* @__PURE__ */ jsx4("div", { className: "space-y-2", children: column.links.map((link) => /* @__PURE__ */ jsx4(
                  PhotonLink,
                  {
                    href: link.href,
                    className: clsx4(
                      "block text-sm transition hover:text-[var(--photon-site-accent)]",
                      variant.muted
                    ),
                    children: link.label
                  },
                  `${column.title}:${link.label}:${link.href}`
                )) })
              ] }, column.title)) })
            }
          ),
          /* @__PURE__ */ jsxs2(
            "div",
            {
              className: clsx4(
                footerVariant === "minimal-air" ? "rounded-none border-0 px-0 pt-0 sm:px-0" : "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
                (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).card
              ),
              children: [
                /* @__PURE__ */ jsx4("div", { className: clsx4("text-sm font-semibold", variant.text), children: "Contacts" }),
                /* @__PURE__ */ jsx4("div", { className: "mt-4 space-y-3", children: contactItems.map((item) => /* @__PURE__ */ jsx4(
                  "div",
                  {
                    className: clsx4("text-sm leading-7", variant.muted),
                    children: item
                  },
                  item
                )) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2(
          "div",
          {
            className: clsx4(
              "flex flex-col gap-4 border-t pt-5 text-sm md:flex-row md:items-center md:justify-between",
              footerVariant === "classic-dark" ? "border-white/10" : "border-[var(--photon-site-border)]"
            ),
            children: [
              /* @__PURE__ */ jsx4(
                EditableText,
                {
                  blockId: block.id,
                  path: "copyrightLabel",
                  className: (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).muted
                }
              ),
              /* @__PURE__ */ jsxs2("div", { className: "flex flex-wrap items-center gap-4", children: [
                /* @__PURE__ */ jsxs2(
                  PhotonLink,
                  {
                    href: block.props.legalHref,
                    className: clsx4(
                      "inline-flex items-center gap-2 transition hover:text-[var(--photon-site-accent)]",
                      (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).muted
                    ),
                    children: [
                      /* @__PURE__ */ jsx4(EditableText, { blockId: block.id, path: "legalLabel" }),
                      /* @__PURE__ */ jsx4(ArrowRight, { className: "h-4 w-4" })
                    ]
                  }
                ),
                legalLinks.map((link) => /* @__PURE__ */ jsxs2(
                  PhotonLink,
                  {
                    href: link.href,
                    target: link.target,
                    rel: link.rel,
                    className: clsx4(
                      "inline-flex items-center gap-2 transition hover:text-[var(--photon-site-accent)]",
                      (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).muted
                    ),
                    children: [
                      link.label,
                      /* @__PURE__ */ jsx4(ArrowRight, { className: "h-4 w-4" })
                    ]
                  },
                  `${link.label}:${link.href}`
                )),
                /* @__PURE__ */ jsx4(
                  PhotonLink,
                  {
                    href: block.props.developerHref,
                    className: clsx4(
                      "font-semibold transition hover:text-[var(--photon-site-accent)]",
                      (footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"]).text
                    ),
                    children: /* @__PURE__ */ jsx4(EditableText, { blockId: block.id, path: "developerLabel" })
                  }
                )
              ] })
            ]
          }
        )
      ] })
    }
  );
};
var siteFooterShellDefinition = definePhotonBlockDefinition({
  type: "site-footer-shell",
  label: "Site Footer Shell",
  labelKey: "photon.system.siteFooter.block.label",
  description: "Shared footer with editorial brand copy, subscription card, navigation columns and legal row.",
  descriptionKey: "photon.system.siteFooter.block.description",
  category: "Site Frame",
  icon: "panel-bottom",
  defaults: {
    variant: "classic-dark",
    brandTitle: createPhotonLocalizedDefault({
      en: "Photon",
      ru: "Photon"
    }),
    brandBody: createPhotonLocalizedDefault({
      en: "Package-first live website editing for teams that want reusable packages, clean package boundaries and real page composition.",
      ru: "Package-first \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0436\u0438\u0432\u043E\u0433\u043E \u0441\u0430\u0439\u0442\u0430 \u0434\u043B\u044F \u043A\u043E\u043C\u0430\u043D\u0434, \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u043D\u0443\u0436\u043D\u044B \u043F\u0435\u0440\u0435\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C\u044B\u0435 \u043F\u0430\u043A\u0435\u0442\u044B, \u0447\u0438\u0441\u0442\u044B\u0435 \u0433\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u0430\u043A\u0435\u0442\u043E\u0432 \u0438 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0430\u044F \u043A\u043E\u043C\u043F\u043E\u0437\u0438\u0446\u0438\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446."
    }),
    logoImage: null,
    subscriptionTitle: createPhotonLocalizedDefault({
      en: "Get product notes and release updates",
      ru: "\u041F\u043E\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0440\u0435\u043B\u0438\u0437\u043E\u0432"
    }),
    subscriptionBody: createPhotonLocalizedDefault({
      en: "Subscribe for major builder releases, new integration kits and architecture notes.",
      ru: "\u041F\u043E\u0434\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u043A\u0440\u0443\u043F\u043D\u044B\u0435 \u0440\u0435\u043B\u0438\u0437\u044B builder, \u043D\u043E\u0432\u044B\u0435 integration kits \u0438 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u043D\u044B\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438."
    }),
    subscriptionPlaceholder: createPhotonLocalizedDefault({
      en: "Enter your email",
      ru: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 email"
    }),
    subscriptionButtonLabel: createPhotonLocalizedDefault({
      en: "Subscribe",
      ru: "\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F"
    }),
    navigationColumns: createPhotonLocalizedDefault({
      en: [
        {
          title: "Product",
          links: [
            { label: "Overview", href: "/" },
            { label: "Publication", href: "/news" },
            { label: "Contacts", href: "/contacts" }
          ]
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Privacy", href: "/privacy" }
          ]
        }
      ],
      ru: [
        {
          title: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442",
          links: [
            { label: "\u041E\u0431\u0437\u043E\u0440", href: "/" },
            { label: "\u041F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438", href: "/news" },
            { label: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B", href: "/contacts" }
          ]
        },
        {
          title: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F",
          links: [
            { label: "\u041E \u043D\u0430\u0441", href: "/about" },
            { label: "\u0411\u043B\u043E\u0433", href: "/blog" },
            { label: "\u041F\u0440\u0438\u0432\u0430\u0442\u043D\u043E\u0441\u0442\u044C", href: "/privacy" }
          ]
        }
      ]
    }),
    contactItems: createPhotonLocalizedDefault({
      en: ["+7 (707) 040-43-43", "hello@example.test", "Almaty, Kazakhstan"],
      ru: ["+7 (707) 040-43-43", "hello@example.test", "\u0410\u043B\u043C\u0430\u0442\u044B, \u041A\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043D"]
    }),
    legalLabel: createPhotonLocalizedDefault({
      en: "Privacy policy",
      ru: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"
    }),
    legalHref: "/privacy",
    copyrightLabel: createPhotonLocalizedDefault({
      en: "Photon 2026",
      ru: "Photon 2026"
    }),
    developerLabel: createPhotonLocalizedDefault({
      en: "Built by init",
      ru: "\u0421\u0434\u0435\u043B\u0430\u043D\u043E init"
    }),
    developerHref: "https://init.kz",
    disabledExtensionIds: [],
    disabledExtensionItemIds: []
  },
  fields: siteFooterFields,
  component: SiteFooterShell
});

// src/modules/system/site/site-header-shell-definition.tsx
import clsx5 from "clsx";
import { ArrowRight as ArrowRight2, CircleUserRound, LogIn, ShoppingCart } from "lucide-react";
import { useEffect as useEffect4, useRef as useRef2, useState as useState4 } from "react";

// src/modules/system/site/site-header-links.ts
var normalizeHeaderHref = (href) => typeof href === "string" ? href.trim() : "";
var getHeaderLinkPathname = (href) => {
  const cleanHref = normalizeHeaderHref(href);
  if (!cleanHref.startsWith("/") || cleanHref.startsWith("//")) {
    return cleanHref;
  }
  return (cleanHref.split(/[?#]/u)[0] ?? "/").replace(/\/+$/u, "") || "/";
};
var isCartLinkHref = (href) => getHeaderLinkPathname(href) === "/cart";
var getHeaderLinkDedupeKey = (href) => `route:${getHeaderLinkPathname(href).toLowerCase()}`;
var isProtectedAccountHref = (href) => {
  const pathname = getHeaderLinkPathname(href);
  return pathname === "/account" || pathname.startsWith("/account/");
};
var getHeaderCartQuantity = (resources) => {
  const summary = resources.commerceCartSummary;
  const quantity = Number(summary?.items_quantity ?? summary?.item_count ?? 0);
  return Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 0;
};
var hasAuthenticatedUser = (resources) => {
  const auth = resources.auth;
  return Boolean(auth?.user);
};
var hasCommerceBlock = (blocks) => (blocks ?? []).some((item) => {
  if (item.module === "commerce-photon") {
    return true;
  }
  return (item.areas ?? []).some((area) => hasCommerceBlock(area.blocks));
});
var hasCommerceRuntimeResource = (resources) => [
  "commerceCatalog",
  "commerceCatalogItem",
  "commerceProduct",
  "commerceCheckout",
  "commerceOrder"
].some((key) => resources[key] !== void 0) || getHeaderCartQuantity(resources) > 0;
var isCommerceExtensionId = (id) => typeof id === "string" && id.startsWith("commerce");
var collectUniqueHeaderLinks = (links, hiddenKeys = /* @__PURE__ */ new Set()) => {
  const seenKeys = /* @__PURE__ */ new Set();
  return links.filter((link) => {
    const key = getHeaderLinkDedupeKey(link.href);
    if (key === "route:" || hiddenKeys.has(key) || seenKeys.has(key)) {
      return false;
    }
    seenKeys.add(key);
    return true;
  });
};
var getHeaderActionVisibleHref = (action, authenticatedUser) => authenticatedUser && (action.kind ?? "link") === "auth" ? action.authenticatedHref ?? action.href : action.href;
var getHeaderCartLink = (links) => {
  const link = links.find((item) => isCartLinkHref(item.href));
  return link?.href ? { label: link.label, href: link.href } : null;
};
var collectHeaderActionLinkKeys = (actions) => {
  const keys = /* @__PURE__ */ new Set();
  for (const action of actions) {
    keys.add(getHeaderLinkDedupeKey(action.href));
    if (action.authenticatedHref) {
      keys.add(getHeaderLinkDedupeKey(action.authenticatedHref));
    }
  }
  return keys;
};

// src/modules/system/site/site-header-shell-definition.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var siteHeaderFields = [
  {
    path: "variant",
    label: "Variant",
    kind: "select",
    group: "style",
    localization: "shared",
    options: [
      { label: "Commerce inline", value: "commerce-inline" },
      { label: "Showcase card", value: "showcase-card" }
    ]
  },
  {
    path: "brandLabel",
    label: "Brand label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "brandHref",
    label: "Brand href",
    kind: "url",
    group: "content",
    localization: "shared"
  },
  {
    path: "logoImage",
    label: "Logo image",
    kind: "image",
    group: "content",
    localization: "shared"
  },
  {
    path: "utilityLinks",
    label: "Utility links",
    kind: "repeater",
    group: "content",
    localization: "localized",
    itemLabelPath: "label",
    addLabel: "Add utility link",
    fields: [
      { path: "label", label: "Label", kind: "text" },
      { path: "href", label: "Href", kind: "url", localization: "shared" }
    ]
  },
  {
    path: "catalogLabel",
    label: "Catalog label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "searchPlaceholder",
    label: "Search placeholder",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "contactValue",
    label: "Contact value",
    kind: "text",
    group: "content",
    localization: "shared"
  },
  {
    path: "contactCaption",
    label: "Contact caption",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "primaryCtaLabel",
    label: "Primary CTA label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "primaryCtaHref",
    label: "Primary CTA href",
    kind: "url",
    group: "content",
    localization: "shared"
  },
  {
    path: "secondaryCtaLabel",
    label: "Secondary CTA label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "secondaryCtaHref",
    label: "Secondary CTA href",
    kind: "url",
    group: "content",
    localization: "shared"
  },
  {
    path: "showLoginAction",
    label: "Show login action",
    kind: "toggle",
    group: "layout",
    localization: "shared"
  },
  {
    path: "loginLabel",
    label: "Login label",
    kind: "text",
    group: "content",
    localization: "localized"
  },
  {
    path: "sticky",
    label: "Sticky header",
    kind: "toggle",
    group: "layout",
    localization: "shared"
  },
  {
    path: "compactOnScroll",
    label: "Compact on scroll",
    kind: "toggle",
    group: "layout",
    localization: "shared"
  },
  {
    path: "showLocaleSwitcher",
    label: "Show locale switcher",
    labelKey: "photon.system.siteHeader.showLocaleSwitcher.label",
    kind: "toggle",
    group: "layout",
    localization: "shared"
  },
  {
    path: "categoryLinks",
    label: "Category links",
    kind: "repeater",
    group: "content",
    localization: "localized",
    itemLabelPath: "label",
    addLabel: "Add category link",
    fields: [
      { path: "label", label: "Label", kind: "text" },
      { path: "href", label: "Href", kind: "url", localization: "shared" }
    ]
  },
  {
    path: "disabledExtensionIds",
    label: "Disabled package extensions",
    kind: "tags",
    group: "layout",
    localization: "shared"
  },
  {
    path: "disabledExtensionItemIds",
    label: "Disabled package extension items",
    kind: "tags",
    group: "layout",
    localization: "shared"
  }
];
var SiteHeaderShell = ({
  block
}) => {
  const isAdmin = usePhotonStore((state) => state.isAdmin);
  const mode = usePhotonStore((state) => state.mode);
  const currentRoute = usePhotonStore((state) => state.document.route);
  const currentBlocks = usePhotonStore(
    (state) => state.document.blocks
  );
  const requestAuth = usePhotonStore((state) => state.requestAuth);
  const resources = usePhotonStore((state) => state.resources);
  const siteRegions = usePhotonStore((state) => state.site.regions);
  const siteDesign = usePhotonStore(
    (state) => state.site.settings.design
  );
  const siteFrameExtensions = usePhotonStore(
    (state) => state.siteFrameExtensions
  );
  const { locale, publicLocales, translate } = usePhotonI18n();
  const [isCompact, setIsCompact] = useState4(false);
  const headerRef = useRef2(null);
  const disabledExtensionIds = normalizePhotonSiteStringItems(
    block.props.disabledExtensionIds
  );
  const disabledExtensionItemIds = normalizePhotonSiteStringItems(
    block.props.disabledExtensionItemIds
  );
  const headerExtensionItems = collectPhotonHeaderExtensionItems(
    resolvePhotonSiteFrameExtensions(
      siteFrameExtensions,
      disabledExtensionIds
    ).filter(
      (extension) => !isCommerceExtensionId(extension.id) || hasCommerceBlock(currentBlocks) || Object.values(siteRegions).some(
        (region) => hasCommerceBlock(region.document.blocks)
      ) || hasCommerceRuntimeResource(resources)
    ),
    disabledExtensionItemIds
  );
  const rawUtilityLinks = [
    ...normalizePhotonSiteLinkItems(block.props.utilityLinks),
    ...normalizePhotonSiteLinkItems(headerExtensionItems.utilityLinks)
  ];
  const extensionCategoryLinks = normalizePhotonSiteLinkItems(
    headerExtensionItems.categoryLinks
  );
  const commerceCatalogLink = extensionCategoryLinks.find(
    (link) => link.id === "commerce:catalog-link" || getHeaderLinkPathname(link.href) === "/catalog"
  ) ?? null;
  const rawCategoryLinks = [
    ...normalizePhotonSiteLinkItems(block.props.categoryLinks),
    ...extensionCategoryLinks.filter((link) => link !== commerceCatalogLink)
  ];
  const variant = block.props.variant ?? "commerce-inline";
  const liveSurfaceMode = mode !== "builder";
  const compact = liveSurfaceMode && block.props.compactOnScroll && isCompact;
  const framelessSite = isPhotonPublicFramelessSiteDesign(siteDesign);
  const isShowcaseCard = variant === "showcase-card" && !framelessSite;
  const localeSwitcherVisible = block.props.showLocaleSwitcher !== false && publicLocales.length > 1;
  const authenticatedUser = hasAuthenticatedUser(resources);
  const [cartQuantity, setCartQuantity] = useState4(
    () => getHeaderCartQuantity(resources)
  );
  const rawExtensionActions = collectUniqueHeaderLinks(
    headerExtensionItems.actions
  ).filter((action) => {
    const visibleHref = getHeaderActionVisibleHref(action, authenticatedUser);
    return normalizeHeaderHref(visibleHref) !== "";
  });
  const dedicatedCartLink = getHeaderCartLink(
    rawExtensionActions.map((action) => ({
      label: action.label,
      href: getHeaderActionVisibleHref(action, authenticatedUser)
    }))
  ) ?? getHeaderCartLink([
    {
      label: block.props.secondaryCtaLabel,
      href: block.props.secondaryCtaHref
    },
    {
      label: block.props.primaryCtaLabel,
      href: block.props.primaryCtaHref
    },
    ...rawCategoryLinks,
    ...rawUtilityLinks
  ]);
  const extensionActions = rawExtensionActions.filter(
    (action) => !isCartLinkHref(getHeaderActionVisibleHref(action, authenticatedUser))
  );
  const hasExtensionAuthAction = extensionActions.some(
    (action) => (action.kind ?? "link") === "auth"
  );
  const extensionActionLinkKeys = collectHeaderActionLinkKeys(extensionActions);
  const secondaryCtaLinkKey = getHeaderLinkDedupeKey(
    block.props.secondaryCtaHref
  );
  const primaryCtaLinkKey = getHeaderLinkDedupeKey(block.props.primaryCtaHref);
  const shouldRenderSecondaryCta = normalizeHeaderHref(block.props.secondaryCtaHref) !== "" && !isCartLinkHref(block.props.secondaryCtaHref) && !extensionActionLinkKeys.has(secondaryCtaLinkKey) && !((hasExtensionAuthAction || !authenticatedUser) && isProtectedAccountHref(block.props.secondaryCtaHref));
  const shouldRenderPrimaryCta = normalizeHeaderHref(block.props.primaryCtaHref) !== "" && !isCartLinkHref(block.props.primaryCtaHref) && (!extensionActionLinkKeys.has(primaryCtaLinkKey) || primaryCtaLinkKey === secondaryCtaLinkKey);
  const prominentLinkKeys = new Set(extensionActionLinkKeys);
  if (dedicatedCartLink) {
    prominentLinkKeys.add(getHeaderLinkDedupeKey(dedicatedCartLink.href));
  }
  if (commerceCatalogLink) {
    prominentLinkKeys.add(getHeaderLinkDedupeKey(commerceCatalogLink.href));
  }
  if (shouldRenderPrimaryCta) {
    prominentLinkKeys.add(primaryCtaLinkKey);
  }
  if (shouldRenderSecondaryCta) {
    prominentLinkKeys.add(secondaryCtaLinkKey);
  }
  const categoryLinks = collectUniqueHeaderLinks(
    rawCategoryLinks,
    prominentLinkKeys
  );
  const categoryLinkKeys = new Set(
    categoryLinks.map((link) => getHeaderLinkDedupeKey(link.href))
  );
  const utilityLinks = collectUniqueHeaderLinks(
    rawUtilityLinks,
    /* @__PURE__ */ new Set([...prominentLinkKeys, ...categoryLinkKeys])
  );
  const renderCartLink = (href, label, className, key) => /* @__PURE__ */ jsxs3(
    PhotonLink,
    {
      href,
      "aria-label": label,
      "data-photon-header-cart-link": "true",
      className: clsx5(
        "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--photon-site-border)] text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
        className
      ),
      children: [
        /* @__PURE__ */ jsx5(ShoppingCart, { className: "h-5 w-5" }),
        cartQuantity > 0 ? /* @__PURE__ */ jsx5("span", { className: "absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--photon-site-accent)] px-1 text-[10px] font-bold leading-none text-white", children: cartQuantity > 99 ? "99+" : cartQuantity }) : null
      ]
    },
    key ?? `cart:${href}`
  );
  const renderSmartLink = (link, className, key) => {
    if (isCartLinkHref(link.href)) {
      return renderCartLink(link.href, link.label, className, key);
    }
    if (!authenticatedUser && isProtectedAccountHref(link.href)) {
      return null;
    }
    return /* @__PURE__ */ jsx5(
      PhotonLink,
      {
        href: link.href,
        target: link.target,
        rel: link.rel,
        className,
        children: link.label
      },
      key
    );
  };
  const renderExtensionAction = (action) => {
    const appearance = action.appearance ?? "secondary";
    const className = clsx5(
      "inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition",
      appearance === "primary" ? "bg-[var(--photon-site-accent)] text-white shadow-[0_18px_34px_rgba(15,118,110,0.28)] hover:translate-y-[-1px]" : appearance === "ghost" ? "text-[var(--photon-site-text)] hover:text-[var(--photon-site-accent)]" : "border border-[var(--photon-site-border)] text-[var(--photon-site-text)] hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]"
    );
    if ((action.kind ?? "link") === "auth") {
      if (authenticatedUser) {
        const authenticatedHref = action.authenticatedHref ?? action.href;
        if (!authenticatedHref) {
          return null;
        }
        return /* @__PURE__ */ jsxs3(
          PhotonLink,
          {
            href: authenticatedHref,
            target: action.authenticatedTarget,
            rel: action.authenticatedRel,
            className,
            children: [
              /* @__PURE__ */ jsx5(CircleUserRound, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx5("span", { children: action.authenticatedLabel ?? action.label })
            ]
          },
          action.id ?? `${action.authenticatedLabel ?? action.label}:${authenticatedHref}`
        );
      }
      return /* @__PURE__ */ jsx5(
        "button",
        {
          type: "button",
          onClick: requestAuth,
          className: clsx5(className, "cursor-pointer"),
          children: action.label
        },
        action.id ?? `${action.label}:${action.href}`
      );
    }
    return renderSmartLink(
      action,
      className,
      action.id ?? `${action.label}:${action.href}`
    );
  };
  useEffect4(() => {
    if (typeof window === "undefined" || !block.props.compactOnScroll || !liveSurfaceMode) {
      setIsCompact(false);
      return;
    }
    const sync = () => setIsCompact(window.scrollY > 36);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, [block.props.compactOnScroll, liveSurfaceMode]);
  useEffect4(() => {
    if (typeof window === "undefined") {
      return;
    }
    setCartQuantity(getHeaderCartQuantity(resources));
    const syncCartQuantity = (event) => {
      if (!(event instanceof CustomEvent)) {
        return;
      }
      const cart = event.detail;
      const quantity = Number(cart?.items_quantity ?? cart?.item_count ?? 0);
      setCartQuantity(
        Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 0
      );
    };
    window.addEventListener("commerce-cart-updated", syncCartQuantity);
    return () => {
      window.removeEventListener("commerce-cart-updated", syncCartQuantity);
    };
  }, [resources]);
  useEffect4(() => {
    if (typeof window === "undefined") {
      return;
    }
    const root = window.document.documentElement instanceof HTMLElement ? window.document.documentElement : null;
    if (!root) {
      return;
    }
    const syncHeaderHeight = () => {
      root.style.setProperty(
        "--photon-site-header-height",
        liveSurfaceMode && block.props.sticky && headerRef.current ? `${headerRef.current.offsetHeight}px` : "0px"
      );
    };
    syncHeaderHeight();
    if (!headerRef.current || typeof ResizeObserver === "undefined") {
      return () => {
        root.style.setProperty("--photon-site-header-height", "0px");
      };
    }
    const observer = new ResizeObserver(() => {
      syncHeaderHeight();
    });
    observer.observe(headerRef.current);
    return () => {
      observer.disconnect();
      root.style.setProperty("--photon-site-header-height", "0px");
    };
  }, [block.props.sticky, liveSurfaceMode, compact, localeSwitcherVisible]);
  return /* @__PURE__ */ jsx5(
    "header",
    {
      ref: headerRef,
      className: clsx5(
        "relative",
        liveSurfaceMode && "z-40",
        isShowcaseCard ? "pt-[var(--photon-site-gutter,24px)]" : "pt-0"
      ),
      children: /* @__PURE__ */ jsxs3(
        "div",
        {
          className: clsx5(
            "border-b border-[var(--photon-site-border)] text-[var(--photon-site-text)] transition-[box-shadow,background-color,border-radius] duration-300",
            framelessSite ? clsx5(
              "rounded-none border-x-0 border-t-0 bg-[color-mix(in_srgb,var(--photon-site-surface)_92%,white)] shadow-none",
              block.props.sticky && compact && "bg-[color-mix(in_srgb,var(--photon-site-surface)_96%,white)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            ) : isShowcaseCard ? "mx-auto max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] rounded-[calc(var(--photon-site-radius,24px)+10px)] border shadow-[0_28px_70px_rgba(15,23,42,0.08)]" : clsx5(
              "rounded-none border-x-0 border-t-0 bg-[var(--photon-site-surface)] shadow-[0_18px_40px_rgba(15,23,42,0.06)]",
              block.props.sticky && compact && "shadow-[0_20px_54px_rgba(15,23,42,0.12)]"
            )
          ),
          children: [
            /* @__PURE__ */ jsx5(
              "div",
              {
                className: clsx5(
                  "mx-auto w-full max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] transition-[padding,gap] duration-300",
                  framelessSite ? compact ? "px-[var(--photon-site-gutter,24px)] py-3" : "px-[var(--photon-site-gutter,24px)] py-4" : isShowcaseCard ? compact ? "px-4 py-3" : "px-5 py-4 sm:px-6" : compact ? "px-[var(--photon-site-gutter,24px)] py-3" : "px-[var(--photon-site-gutter,24px)] py-4"
                ),
                children: /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-4", children: [
                  /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [
                    /* @__PURE__ */ jsx5("div", { className: "flex flex-wrap items-center gap-3 text-sm text-[var(--photon-site-muted)]", children: utilityLinks.map(
                      (link) => renderSmartLink(
                        link,
                        clsx5(
                          "transition hover:text-[var(--photon-site-text)]",
                          isCartLinkHref(link.href) && "h-8 w-8 border-transparent"
                        ),
                        `${link.label}:${link.href}`
                      )
                    ) }),
                    /* @__PURE__ */ jsxs3("div", { className: "flex flex-wrap items-center gap-3 text-sm", children: [
                      localeSwitcherVisible ? /* @__PURE__ */ jsxs3(
                        "div",
                        {
                          "data-photon-locale-switcher": "true",
                          className: "flex flex-wrap items-center gap-2 rounded-full border border-[var(--photon-site-border)] bg-[var(--photon-site-background)] px-2 py-2",
                          children: [
                            /* @__PURE__ */ jsx5("div", { className: "px-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--photon-site-muted)]", children: translate(
                              "photon.localeSwitcher.label",
                              "Language"
                            ) }),
                            publicLocales.map((item) => /* @__PURE__ */ jsx5(
                              PhotonLink,
                              {
                                href: currentRoute,
                                locale: item.code,
                                "data-photon-locale-option": item.code,
                                className: clsx5(
                                  "rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
                                  item.code === locale ? "bg-[var(--photon-site-accent)] text-white" : "text-[var(--photon-site-muted)] hover:text-[var(--photon-site-text)]"
                                ),
                                children: item.label
                              },
                              item.code
                            ))
                          ]
                        }
                      ) : null,
                      /* @__PURE__ */ jsx5(
                        EditableText,
                        {
                          blockId: block.id,
                          path: "contactCaption",
                          className: "text-[var(--photon-site-muted)]"
                        }
                      ),
                      /* @__PURE__ */ jsx5(
                        EditableText,
                        {
                          blockId: block.id,
                          path: "contactValue",
                          className: "font-semibold text-[var(--photon-site-text)]"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs3(
                    "div",
                    {
                      className: clsx5(
                        "grid gap-4 lg:items-center",
                        commerceCatalogLink ? "lg:grid-cols-[auto_auto_minmax(280px,1fr)_auto]" : "lg:grid-cols-[auto_minmax(280px,1fr)_auto]"
                      ),
                      children: [
                        /* @__PURE__ */ jsxs3(
                          PhotonLink,
                          {
                            href: block.props.brandHref,
                            className: "flex min-w-0 items-center gap-3",
                            children: [
                              /* @__PURE__ */ jsx5("div", { className: "relative h-16 w-16 overflow-hidden rounded-[22px] border border-[var(--photon-site-border)] bg-[linear-gradient(180deg,rgba(15,118,110,0.14),rgba(15,118,110,0.03))]", children: block.props.logoImage ? /* @__PURE__ */ jsx5(
                                EditableImage,
                                {
                                  blockId: block.id,
                                  path: "logoImage",
                                  className: "h-full w-full rounded-[22px]",
                                  imageClassName: "h-full w-full object-contain p-2",
                                  fallbackAlt: block.props.brandLabel
                                }
                              ) : /* @__PURE__ */ jsx5("div", { className: "flex h-full items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--photon-site-accent)]", children: /* @__PURE__ */ jsx5(
                                EditableText,
                                {
                                  blockId: block.id,
                                  path: "brandLabel",
                                  className: "text-[var(--photon-site-accent)]"
                                }
                              ) }) }),
                              /* @__PURE__ */ jsxs3("div", { className: "min-w-0", children: [
                                /* @__PURE__ */ jsx5(
                                  EditableText,
                                  {
                                    blockId: block.id,
                                    path: "brandLabel",
                                    as: "div",
                                    className: "[font-family:var(--photon-site-heading-font)] text-2xl font-semibold tracking-[-0.04em]"
                                  }
                                ),
                                isShowcaseCard ? /* @__PURE__ */ jsx5("div", { className: "mt-1 text-xs uppercase tracking-[0.24em] text-[var(--photon-site-muted)]", children: "Live site frame" }) : null
                              ] })
                            ]
                          }
                        ),
                        commerceCatalogLink ? /* @__PURE__ */ jsxs3(
                          PhotonLink,
                          {
                            href: commerceCatalogLink.href,
                            className: "inline-flex items-center gap-2 rounded-full border border-[var(--photon-site-border)] bg-[var(--photon-site-background)] px-4 py-3 text-sm font-semibold text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
                            children: [
                              /* @__PURE__ */ jsx5("div", { className: "h-2.5 w-2.5 rounded-full bg-[var(--photon-site-accent)]" }),
                              /* @__PURE__ */ jsx5(
                                EditableText,
                                {
                                  blockId: block.id,
                                  path: "catalogLabel",
                                  className: "font-semibold"
                                }
                              )
                            ]
                          }
                        ) : null,
                        /* @__PURE__ */ jsx5(
                          PhotonSiteSearch,
                          {
                            blockId: block.id,
                            placeholderPath: "searchPlaceholder"
                          }
                        ),
                        /* @__PURE__ */ jsxs3("div", { className: "flex flex-wrap items-center justify-start gap-2 lg:justify-end", children: [
                          shouldRenderSecondaryCta ? isCartLinkHref(block.props.secondaryCtaHref) ? renderCartLink(
                            block.props.secondaryCtaHref,
                            block.props.secondaryCtaLabel,
                            void 0,
                            "secondary-cart"
                          ) : /* @__PURE__ */ jsx5(
                            PhotonLink,
                            {
                              href: block.props.secondaryCtaHref,
                              className: "inline-flex items-center gap-2 rounded-full border border-[var(--photon-site-border)] px-4 py-3 text-sm font-semibold text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
                              children: /* @__PURE__ */ jsx5(
                                EditableText,
                                {
                                  blockId: block.id,
                                  path: "secondaryCtaLabel",
                                  className: "font-semibold"
                                }
                              )
                            }
                          ) : null,
                          shouldRenderPrimaryCta ? /* @__PURE__ */ jsxs3(
                            PhotonLink,
                            {
                              href: block.props.primaryCtaHref,
                              className: "inline-flex items-center gap-2 rounded-full bg-[var(--photon-site-accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(15,118,110,0.28)] transition hover:translate-y-[-1px]",
                              children: [
                                /* @__PURE__ */ jsx5(
                                  EditableText,
                                  {
                                    blockId: block.id,
                                    path: "primaryCtaLabel",
                                    className: "font-semibold text-white"
                                  }
                                ),
                                /* @__PURE__ */ jsx5(ArrowRight2, { className: "h-4 w-4" })
                              ]
                            }
                          ) : null,
                          dedicatedCartLink ? renderCartLink(
                            dedicatedCartLink.href,
                            dedicatedCartLink.label,
                            void 0,
                            "dedicated-cart"
                          ) : null,
                          extensionActions.map(renderExtensionAction),
                          block.props.showLoginAction && !isAdmin && !authenticatedUser && !hasExtensionAuthAction ? /* @__PURE__ */ jsxs3(
                            "button",
                            {
                              type: "button",
                              onClick: requestAuth,
                              className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--photon-site-border)] bg-[var(--photon-site-surface)] px-4 py-3 text-sm font-semibold text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
                              children: [
                                /* @__PURE__ */ jsx5(LogIn, { className: "h-4 w-4" }),
                                /* @__PURE__ */ jsx5(
                                  EditableText,
                                  {
                                    blockId: block.id,
                                    path: "loginLabel",
                                    className: "font-semibold"
                                  }
                                )
                              ]
                            }
                          ) : null
                        ] })
                      ]
                    }
                  )
                ] })
              }
            ),
            categoryLinks.length > 0 ? /* @__PURE__ */ jsx5(
              "div",
              {
                className: clsx5(
                  "border-t border-[var(--photon-site-border)]",
                  framelessSite && "bg-transparent"
                ),
                children: /* @__PURE__ */ jsx5("div", { className: "mx-auto w-full max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] px-[var(--photon-site-gutter,24px)] py-4", children: /* @__PURE__ */ jsx5("div", { className: "flex flex-wrap gap-2", children: categoryLinks.map(
                  (link) => renderSmartLink(
                    link,
                    clsx5(
                      "rounded-full border border-[var(--photon-site-border)] px-4 py-2 text-sm text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
                      framelessSite ? "bg-transparent" : isShowcaseCard ? "bg-[var(--photon-site-background)]" : "bg-white/0",
                      isCartLinkHref(link.href) && "h-10 w-10 px-0 py-0"
                    ),
                    `${link.label}:${link.href}`
                  )
                ) }) })
              }
            ) : null
          ]
        }
      )
    }
  );
};
var siteHeaderShellDefinition = definePhotonBlockDefinition({
  type: "site-header-shell",
  label: "Site Header Shell",
  labelKey: "photon.system.siteHeader.block.label",
  description: "Shared live-site header with utility links, search and package-registered actions.",
  descriptionKey: "photon.system.siteHeader.block.description",
  category: "Site Frame",
  icon: "panel-top",
  defaults: {
    variant: "commerce-inline",
    brandLabel: createPhotonLocalizedDefault({
      en: "Photon",
      ru: "Photon"
    }),
    brandHref: "/",
    logoImage: null,
    utilityLinks: createPhotonLocalizedDefault({
      en: [
        { label: "Services", href: "/services" },
        { label: "Partners", href: "/partners" },
        { label: "Blog", href: "/blog" }
      ],
      ru: [
        { label: "\u0423\u0441\u043B\u0443\u0433\u0438", href: "/services" },
        { label: "\u041F\u0430\u0440\u0442\u043D\u0435\u0440\u044B", href: "/partners" },
        { label: "\u0411\u043B\u043E\u0433", href: "/blog" }
      ]
    }),
    catalogLabel: createPhotonLocalizedDefault({
      en: "Catalog",
      ru: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433"
    }),
    searchPlaceholder: createPhotonLocalizedDefault({
      en: "Search the website",
      ru: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0441\u0430\u0439\u0442\u0443"
    }),
    contactValue: "+7 (707) 040-43-43",
    contactCaption: createPhotonLocalizedDefault({
      en: "Daily from 09:00 to 18:00",
      ru: "\u0415\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E \u0441 09:00 \u0434\u043E 18:00"
    }),
    primaryCtaLabel: createPhotonLocalizedDefault({
      en: "Contact us",
      ru: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F"
    }),
    primaryCtaHref: "/contacts",
    secondaryCtaLabel: createPhotonLocalizedDefault({
      en: "WhatsApp",
      ru: "WhatsApp"
    }),
    secondaryCtaHref: "https://wa.me/77070404343",
    showLoginAction: false,
    loginLabel: createPhotonLocalizedDefault({
      en: "Admin sign in",
      ru: "\u0412\u0445\u043E\u0434 \u0434\u043B\u044F \u0430\u0434\u043C\u0438\u043D\u0430"
    }),
    sticky: true,
    compactOnScroll: true,
    showLocaleSwitcher: true,
    disabledExtensionIds: [],
    disabledExtensionItemIds: [],
    categoryLinks: createPhotonLocalizedDefault({
      en: [
        { label: "Infrastructure", href: "/infrastructure" },
        { label: "Operations", href: "/operations" },
        { label: "Research", href: "/research" }
      ],
      ru: [
        { label: "\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430", href: "/infrastructure" },
        { label: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438", href: "/operations" },
        { label: "\u0418\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F", href: "/research" }
      ]
    })
  },
  fields: siteHeaderFields,
  component: SiteHeaderShell
});

export {
  EditableImage,
  EditableTextarea,
  resolvePhotonPublicSiteDesignSettings,
  isPhotonPublicFramelessSiteDesign,
  siteFooterShellDefinition,
  PhotonSiteSearch,
  siteHeaderShellDefinition
};
