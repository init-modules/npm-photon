import {
  PHOTON_SEARCH_OCCURRENCE_PARAM,
  PHOTON_SEARCH_QUERY_PARAM,
  PHOTON_SEARCH_TARGET_PARAM
} from "./chunk-CZ47CC3D.js";

// src/search/helpers.ts
var buildPhotonSearchTargetId = (blockId, path) => `${blockId}::${path}`;
var DEFAULT_PHOTON_NAVIGATION_QUERY_KEYS = {
  mode: "mode",
  contentLocale: "contentLocale",
  profile: "photonProfile",
  branch: "photonBranch",
  revision: "photonRevision"
};
var DEFAULT_PHOTON_ADMIN_PATH_PREFIX = "/photon-admin";
var normalizePhotonAdminPathPrefix = (pathPrefix) => {
  const normalized = pathPrefix?.trim().replace(/\/+$/u, "");
  return normalized?.startsWith("/") ? normalized : DEFAULT_PHOTON_ADMIN_PATH_PREFIX;
};
var resolvePhotonNavigationConfig = (config) => ({
  adminPathPrefix: normalizePhotonAdminPathPrefix(config?.adminPathPrefix),
  queryKeys: {
    ...DEFAULT_PHOTON_NAVIGATION_QUERY_KEYS,
    ...config?.queryKeys ?? {}
  }
});
var preservePhotonSearchParams = (currentSearchParams, navigation) => {
  const { queryKeys } = resolvePhotonNavigationConfig(navigation);
  const preservedPhotonSearchQueryParams = /* @__PURE__ */ new Set([
    queryKeys.profile,
    queryKeys.branch,
    queryKeys.revision,
    queryKeys.mode,
    queryKeys.contentLocale
  ]);
  const searchParams = new URLSearchParams();
  currentSearchParams.forEach((value, key) => {
    if (preservedPhotonSearchQueryParams.has(key)) {
      searchParams.append(key, value);
    }
  });
  return searchParams;
};
var normalizePhotonSearchRoute = (route, locale, contentLocale) => {
  const url = new URL(route.trim() || "/", "https://photon.local");
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
var buildPhotonSearchResultHref = (result, query, mode, isAdmin, options) => {
  const normalizedRoute = normalizePhotonSearchRoute(
    result.route,
    options?.locale,
    options?.contentLocale
  );
  const navigation = resolvePhotonNavigationConfig(options?.navigation);
  const routeUrl = new URL(normalizedRoute, "https://photon.local");
  const targetPathname = isAdmin ? `${navigation.adminPathPrefix}${routeUrl.pathname === "/" ? "" : routeUrl.pathname}` : routeUrl.pathname;
  const url = new URL(targetPathname, "https://photon.local");
  const searchParams = preservePhotonSearchParams(
    options?.currentSearchParams ?? new URLSearchParams(),
    options?.navigation
  );
  routeUrl.searchParams.forEach((value, key) => {
    searchParams.set(key, value);
  });
  if (isAdmin && mode !== "preview") {
    searchParams.set(navigation.queryKeys.mode, mode);
  } else {
    searchParams.delete(navigation.queryKeys.mode);
  }
  if (options?.contentLocale && options.contentLocale !== options.locale) {
    searchParams.set(
      navigation.queryKeys.contentLocale,
      options.contentLocale
    );
  } else {
    searchParams.delete(navigation.queryKeys.contentLocale);
  }
  if (options?.workspaceSelection?.profileId) {
    searchParams.set(
      navigation.queryKeys.profile,
      options.workspaceSelection.profileId
    );
    searchParams.set(
      navigation.queryKeys.branch,
      options.workspaceSelection.branch
    );
    if (options.workspaceSelection.revisionId) {
      searchParams.set(
        navigation.queryKeys.revision,
        options.workspaceSelection.revisionId
      );
    } else {
      searchParams.delete(navigation.queryKeys.revision);
    }
  } else {
    searchParams.delete(navigation.queryKeys.profile);
    searchParams.delete(navigation.queryKeys.branch);
    searchParams.delete(navigation.queryKeys.revision);
  }
  searchParams.set(PHOTON_SEARCH_QUERY_PARAM, query);
  searchParams.set(PHOTON_SEARCH_TARGET_PARAM, result.targetId);
  searchParams.set(
    PHOTON_SEARCH_OCCURRENCE_PARAM,
    String(result.occurrence)
  );
  const serializedSearch = searchParams.toString();
  return `${url.pathname}${serializedSearch ? `?${serializedSearch}` : ""}${routeUrl.hash}`;
};

export {
  buildPhotonSearchTargetId,
  resolvePhotonNavigationConfig,
  buildPhotonSearchResultHref
};
