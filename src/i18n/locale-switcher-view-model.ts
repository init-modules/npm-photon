import type { PhotonLocaleDescriptor } from "../types";

export interface PhotonLocaleSwitcherViewModelInput {
	locales: readonly PhotonLocaleDescriptor[];
	recentCodes?: readonly string[];
	searchQuery?: string;
	/**
	 * When the number of locales is at or above this threshold, the UI is
	 * expected to surface a search input. Default 8 (LOCALE_V1 §9.1).
	 */
	searchThreshold?: number;
	/**
	 * How many recent locales to surface at the top. Default 3 (§9.3).
	 */
	maxRecents?: number;
}

export interface PhotonLocaleSwitcherViewModel {
	/**
	 * Whether the consumer should display a search input. True when there
	 * are enough locales to warrant filtering.
	 */
	showSearch: boolean;
	/**
	 * Recent locales (up to `maxRecents`), in usage order. Already filtered
	 * down to locales that still exist in the input list.
	 */
	recents: PhotonLocaleDescriptor[];
	/**
	 * The flattened, alphabetically sorted list, after applying the search
	 * query. No region grouping per §9.2.
	 */
	results: PhotonLocaleDescriptor[];
}

const matchesQuery = (
	locale: PhotonLocaleDescriptor,
	query: string,
): boolean => {
	if (!query) return true;
	const q = query.trim().toLowerCase();
	return (
		locale.code.toLowerCase().includes(q) ||
		locale.label.toLowerCase().includes(q)
	);
};

const sortAlphabetically = (
	list: readonly PhotonLocaleDescriptor[],
): PhotonLocaleDescriptor[] =>
	list.slice().sort((left, right) => left.label.localeCompare(right.label));

export const buildPhotonLocaleSwitcherViewModel = ({
	locales,
	recentCodes = [],
	searchQuery = "",
	searchThreshold = 8,
	maxRecents = 3,
}: PhotonLocaleSwitcherViewModelInput): PhotonLocaleSwitcherViewModel => {
	const trimmedQuery = searchQuery.trim();
	const showSearch = locales.length >= searchThreshold;

	const localesByCode = new Map(locales.map((l) => [l.code, l]));

	const recents: PhotonLocaleDescriptor[] = [];
	const seenRecentCodes = new Set<string>();
	for (const code of recentCodes) {
		if (recents.length >= maxRecents) break;
		const locale = localesByCode.get(code);
		if (locale && !seenRecentCodes.has(code) && matchesQuery(locale, trimmedQuery)) {
			recents.push(locale);
			seenRecentCodes.add(code);
		}
	}

	const filteredAll = locales.filter((locale) =>
		matchesQuery(locale, trimmedQuery),
	);
	const results = sortAlphabetically(filteredAll);

	return {
		showSearch,
		recents,
		results,
	};
};

const STORAGE_KEY = "photon:i18n:recent-locales";

const isBrowser = (): boolean =>
	typeof globalThis !== "undefined" &&
	typeof (globalThis as { localStorage?: Storage }).localStorage !== "undefined";

/**
 * Read recent locale codes (most recent first) from localStorage. Safe on
 * server: returns `[]` when localStorage is not available.
 */
export const readPhotonRecentLocaleCodes = (
	maxRecents = 3,
): string[] => {
	if (!isBrowser()) return [];
	try {
		const raw = (globalThis as { localStorage: Storage }).localStorage.getItem(
			STORAGE_KEY,
		);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed
			.filter((value): value is string => typeof value === "string")
			.slice(0, maxRecents);
	} catch {
		return [];
	}
};

/**
 * Record a locale as most-recently-used. Trims to `maxRecents` entries and
 * preserves uniqueness. Safe on server (no-op).
 */
export const recordPhotonRecentLocaleUsage = (
	code: string,
	maxRecents = 3,
): string[] => {
	if (!isBrowser()) return [];
	try {
		const current = readPhotonRecentLocaleCodes(maxRecents * 2);
		const next = [code, ...current.filter((entry) => entry !== code)].slice(
			0,
			maxRecents,
		);
		(globalThis as { localStorage: Storage }).localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify(next),
		);
		return next;
	} catch {
		return [];
	}
};
