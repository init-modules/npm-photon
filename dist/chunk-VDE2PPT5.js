import {
  WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM,
  WEBSITE_BUILDER_SEARCH_QUERY_PARAM,
  WEBSITE_BUILDER_SEARCH_TARGET_PARAM
} from "./chunk-HFEMF2E3.js";

// src/search/helpers.ts
var buildWebsiteBuilderSearchTargetId = (blockId, path) => `${blockId}::${path}`;
var preservedWebsiteBuilderSearchQueryParams = /* @__PURE__ */ new Set([
  "wbProfile",
  "wbBranch",
  "wbRevision",
  "mode",
  "contentLocale"
]);
var preserveWebsiteBuilderSearchParams = (currentSearchParams) => {
  const searchParams = new URLSearchParams();
  currentSearchParams.forEach((value, key) => {
    if (preservedWebsiteBuilderSearchQueryParams.has(key)) {
      searchParams.append(key, value);
    }
  });
  return searchParams;
};
var normalizeWebsiteBuilderSearchRoute = (route, locale, contentLocale) => {
  const url = new URL(route.trim() || "/", "https://website-builder.local");
  let pathname = url.pathname || "/";
  const localeCandidates = [.../* @__PURE__ */ new Set([locale, contentLocale])].filter(
    (value) => Boolean(value)
  );
  for (const candidate of localeCandidates) {
    const prefix = `/${candidate}`;
    if (pathname === prefix) {
      pathname = "/";
      break;
    }
    if (pathname.startsWith(`${prefix}/`)) {
      pathname = pathname.slice(prefix.length) || "/";
      break;
    }
  }
  return `${pathname}${url.search}${url.hash}`;
};
var buildWebsiteBuilderSearchResultHref = (result, query, mode, isAdmin, options) => {
  const normalizedRoute = normalizeWebsiteBuilderSearchRoute(
    result.route,
    options?.locale,
    options?.contentLocale
  );
  const routeUrl = new URL(normalizedRoute, "https://website-builder.local");
  const targetPathname = isAdmin ? `/wb-admin${routeUrl.pathname === "/" ? "" : routeUrl.pathname}` : routeUrl.pathname;
  const url = new URL(targetPathname, "https://website-builder.local");
  const searchParams = preserveWebsiteBuilderSearchParams(
    options?.currentSearchParams ?? new URLSearchParams()
  );
  routeUrl.searchParams.forEach((value, key) => {
    searchParams.set(key, value);
  });
  if (isAdmin && mode !== "preview") {
    searchParams.set("mode", mode);
  } else {
    searchParams.delete("mode");
  }
  if (options?.contentLocale && options.contentLocale !== options.locale) {
    searchParams.set("contentLocale", options.contentLocale);
  } else {
    searchParams.delete("contentLocale");
  }
  if (options?.workspaceSelection?.profileId) {
    searchParams.set("wbProfile", options.workspaceSelection.profileId);
    searchParams.set("wbBranch", options.workspaceSelection.branch);
    if (options.workspaceSelection.revisionId) {
      searchParams.set("wbRevision", options.workspaceSelection.revisionId);
    } else {
      searchParams.delete("wbRevision");
    }
  } else {
    searchParams.delete("wbProfile");
    searchParams.delete("wbBranch");
    searchParams.delete("wbRevision");
  }
  searchParams.set(WEBSITE_BUILDER_SEARCH_QUERY_PARAM, query);
  searchParams.set(WEBSITE_BUILDER_SEARCH_TARGET_PARAM, result.targetId);
  searchParams.set(
    WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM,
    String(result.occurrence)
  );
  const serializedSearch = searchParams.toString();
  return `${url.pathname}${serializedSearch ? `?${serializedSearch}` : ""}${routeUrl.hash}`;
};

export {
  buildWebsiteBuilderSearchTargetId,
  buildWebsiteBuilderSearchResultHref
};
