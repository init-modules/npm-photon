import type { PhotonMode, PhotonSearchResult } from "../types";
import {
	PHOTON_SEARCH_OCCURRENCE_PARAM,
	PHOTON_SEARCH_QUERY_PARAM,
	PHOTON_SEARCH_TARGET_PARAM,
} from "./constants";

export const buildPhotonSearchTargetId = (
	blockId: string,
	path: string,
) => `${blockId}::${path}`;

const preservedPhotonSearchQueryParams = new Set([
	"photonProfile",
	"photonBranch",
	"photonRevision",
	"mode",
	"contentLocale",
]);

const preservePhotonSearchParams = (
	currentSearchParams: URLSearchParams,
) => {
	const searchParams = new URLSearchParams();

	currentSearchParams.forEach((value, key) => {
		if (preservedPhotonSearchQueryParams.has(key)) {
			searchParams.append(key, value);
		}
	});

	return searchParams;
};

const normalizePhotonSearchRoute = (
	route: string,
	locale?: string,
	contentLocale?: string,
) => {
	const url = new URL(route.trim() || "/", "https://photon.local");
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

export const buildPhotonSearchResultHref = (
	result: PhotonSearchResult,
	query: string,
	mode: PhotonMode,
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
	const normalizedRoute = normalizePhotonSearchRoute(
		result.route,
		options?.locale,
		options?.contentLocale,
	);
	const routeUrl = new URL(normalizedRoute, "https://photon.local");
	const targetPathname = isAdmin
		? `/photon-admin${routeUrl.pathname === "/" ? "" : routeUrl.pathname}`
		: routeUrl.pathname;
	const url = new URL(targetPathname, "https://photon.local");
	const searchParams = preservePhotonSearchParams(
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
		searchParams.set("photonProfile", options.workspaceSelection.profileId);
		searchParams.set("photonBranch", options.workspaceSelection.branch);

		if (options.workspaceSelection.revisionId) {
			searchParams.set("photonRevision", options.workspaceSelection.revisionId);
		} else {
			searchParams.delete("photonRevision");
		}
	} else {
		searchParams.delete("photonProfile");
		searchParams.delete("photonBranch");
		searchParams.delete("photonRevision");
	}

	searchParams.set(PHOTON_SEARCH_QUERY_PARAM, query);
	searchParams.set(PHOTON_SEARCH_TARGET_PARAM, result.targetId);
	searchParams.set(
		PHOTON_SEARCH_OCCURRENCE_PARAM,
		String(result.occurrence),
	);

	const serializedSearch = searchParams.toString();

	return `${url.pathname}${serializedSearch ? `?${serializedSearch}` : ""}${
		routeUrl.hash
	}`;
};
