import type {
	PhotonResources,
	PhotonSiteFrameActionItem,
} from "../../../types";

export type SiteHeaderLinkItem = {
	id?: string;
	label: string;
	href?: string;
	target?: string;
	rel?: string;
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

export const isProtectedAccountHref = (href: unknown) => {
	const pathname = getHeaderLinkPathname(href);

	return pathname === "/account" || pathname.startsWith("/account/");
};

export const hasAuthenticatedUser = (resources: PhotonResources) => {
	const auth = resources.auth as
		| { user?: null | Record<string, unknown> }
		| undefined;

	return Boolean(auth?.user);
};

export const collectUniqueHeaderLinks = <TLink extends SiteHeaderLinkItem>(
	links: TLink[],
	hiddenKeys: ReadonlySet<string> = new Set(),
): TLink[] => {
	const seenKeys = new Set<string>();

	return links.filter((link) => {
		const key = getHeaderLinkDedupeKey(link.href);

		if (key === "route:" || hiddenKeys.has(key) || seenKeys.has(key)) {
			return false;
		}

		seenKeys.add(key);

		return true;
	});
};

export const getHeaderActionVisibleHref = (
	action: PhotonSiteFrameActionItem,
	authenticatedUser: boolean,
) =>
	authenticatedUser && (action.kind ?? "link") === "auth"
		? (action.authenticatedHref ?? action.href)
		: action.href;

export const collectHeaderActionLinkKeys = (
	actions: PhotonSiteFrameActionItem[],
) => {
	const keys = new Set<string>();

	for (const action of actions) {
		keys.add(getHeaderLinkDedupeKey(action.href));

		if (action.authenticatedHref) {
			keys.add(getHeaderLinkDedupeKey(action.authenticatedHref));
		}
	}

	return keys;
};
