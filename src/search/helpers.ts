import type {
	WebsiteBuilderMode,
	WebsiteBuilderSearchResult,
} from "../types";
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
	const localePrefix =
		options?.locale === "en" && !result.route.startsWith("/en")
			? "/en"
			: "";
	const url = new URL(
		`${localePrefix}${result.route}`,
		"https://website-builder.local",
	);
	const searchParams = preserveWebsiteBuilderSearchParams(
		options?.currentSearchParams ?? new URLSearchParams(),
	);

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

	return serializedSearch ? `${url.pathname}?${serializedSearch}` : url.pathname;
};
