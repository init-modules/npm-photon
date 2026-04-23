import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  KeyboardMenuList,
  Root,
  useKeyboardMenuController
} from "./chunk-3BZZZBLC.js";
import {
  EditableText,
  PhotonLink,
  getPhotonEditableEditorLoader,
  usePhotonCanEdit,
  usePhotonFieldValue,
  usePhotonStore
} from "./chunk-OWLYGTJF.js";
import {
  buildPhotonSearchResultHref,
  buildPhotonSearchTargetId
} from "./chunk-FRFYYFDJ.js";
import {
  resolvePhotonMediaPreviewUrl
} from "./chunk-QQDDM7OM.js";
import {
  usePhotonI18n
} from "./chunk-NV6FZ3PQ.js";
import {
  PHOTON_EMPTY_TEXT
} from "./chunk-KAITZE7U.js";

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
  const altValue = usePhotonFieldValue(blockId, altPath ?? path);
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
              "aria-label": translate("photon.search.open", "Search the website"),
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
            /* @__PURE__ */ jsx3(DialogTitle, { children: translate("photon.search.dialogTitle", "Search the website") }),
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

export {
  EditableImage,
  EditableTextarea,
  resolvePhotonPublicSiteDesignSettings,
  isPhotonPublicFramelessSiteDesign,
  normalizePhotonSiteLinkItems,
  normalizePhotonSiteNavigationColumns,
  normalizePhotonSiteStringItems,
  PhotonSiteSearch,
  normalizeHeaderHref,
  getHeaderLinkPathname,
  isCartLinkHref,
  getHeaderLinkDedupeKey,
  isProtectedAccountHref,
  getHeaderCartQuantity,
  hasAuthenticatedUser,
  hasCommerceBlock,
  hasCommerceRuntimeResource,
  isCommerceExtensionId,
  collectUniqueHeaderLinks,
  getHeaderActionVisibleHref,
  getHeaderCartLink,
  collectHeaderActionLinkKeys
};
