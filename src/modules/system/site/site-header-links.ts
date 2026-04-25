import type { PhotonSiteFrameActionItem } from "../../../types";

export type SiteHeaderLinkItem = {
	id?: string;
	label: string;
	href?: string;
	target?: string;
	rel?: string;
	dedupeKey?: string;
};

export const normalizeHeaderHref = (href: unknown) =>
	typeof href === "string" ? href.trim() : "";

export const getHeaderLinkPathname = (href: unknown) => {
	const cleanHref = normalizeHeaderHref(href);

	if (!cleanHref.startsWith("/") || cleanHref.startsWith("//")) {
		return cleanHref;
	}

	return (cleanHref.split(/[?#]/u)[0] ?? "/").replace(/\/+$/u, "") || "/";
};

export const getHeaderLinkDedupeKey = (href: unknown) =>
	`route:${getHeaderLinkPathname(href).toLowerCase()}`;

export const getHeaderItemDedupeKey = (item: {
	href?: unknown;
	dedupeKey?: string;
}) =>
	item.dedupeKey
		? `semantic:${item.dedupeKey}`
		: getHeaderLinkDedupeKey(item.href);

export const collectUniqueHeaderLinks = <TLink extends SiteHeaderLinkItem>(
	links: TLink[],
	hiddenKeys: ReadonlySet<string> = new Set(),
): TLink[] => {
	const seenKeys = new Set<string>();

	return links.filter((link) => {
		const key = getHeaderItemDedupeKey(link);

		if (key === "route:" || hiddenKeys.has(key) || seenKeys.has(key)) {
			return false;
		}

		seenKeys.add(key);

		return true;
	});
};

export const getHeaderActionVisibleHref = (
	action: PhotonSiteFrameActionItem,
) => action.href;

export const collectHeaderActionLinkKeys = (
	actions: PhotonSiteFrameActionItem[],
) => {
	const keys = new Set<string>();

	for (const action of actions) {
		keys.add(getHeaderItemDedupeKey(action));

		if (action.authenticatedHref) {
			keys.add(getHeaderLinkDedupeKey(action.authenticatedHref));
		}
	}

	return keys;
};
