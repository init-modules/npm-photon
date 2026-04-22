import type { WebsiteBuilderMode, WebsiteBuilderSearchResult } from "../types";
import {
	WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM,
	WEBSITE_BUILDER_SEARCH_QUERY_PARAM,
	WEBSITE_BUILDER_SEARCH_TARGET_PARAM,
} from "./constants";

export const buildWebsiteBuilderSearchTargetId = (
	blockId: string,
	path: string,
) => `${blockId}::${path}`;

const preservedWebsiteBuilderSearchQueryParams = new Set([
	"wbProfile",
	"wbBranch",
	"wbRevision",
	"mode",
	"contentLocale",
]);

const preserveWebsiteBuilderSearchParams = (
	currentSearchParams: URLSearchParams,
) => {
	const searchParams = new URLSearchParams();

	currentSearchParams.forEach((value, key) => {
		if (preservedWebsiteBuilderSearchQueryParams.has(key)) {
			searchParams.append(key, value);
		}
	});

	return searchParams;
};

const normalizeWebsiteBuilderSearchRoute = (
	route: string,
	locale?: string,
	contentLocale?: string,
) => {
	const url = new URL(route.trim() || "/", "https://website-builder.local");
	let pathname = url.pathname || "/";
	const localeCandidates = [...new Set([locale, contentLocale])].filter(
		(value): value is string => Boolean(value),
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

export const buildWebsiteBuilderSearchResultHref = (
	result: WebsiteBuilderSearchResult,
	query: string,
	mode: WebsiteBuilderMode,
	isAdmin: boolean,
	options?: {
		locale?: string;
		contentLocale?: string;
		currentSearchParams?: URLSearchParams;
		workspaceSelection?: {
			profileId: string;
			branch: string;
			revisionId?: null | string;
		} | null;
	},
) => {
	const normalizedRoute = normalizeWebsiteBuilderSearchRoute(
		result.route,
		options?.locale,
		options?.contentLocale,
	);
	const routeUrl = new URL(normalizedRoute, "https://website-builder.local");
	const targetPathname = isAdmin
		? `/wb-admin${routeUrl.pathname === "/" ? "" : routeUrl.pathname}`
		: routeUrl.pathname;
	const url = new URL(targetPathname, "https://website-builder.local");
	const searchParams = preserveWebsiteBuilderSearchParams(
		options?.currentSearchParams ?? new URLSearchParams(),
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
		String(result.occurrence),
	);

	const serializedSearch = searchParams.toString();

	return `${url.pathname}${serializedSearch ? `?${serializedSearch}` : ""}${
		routeUrl.hash
	}`;
};
