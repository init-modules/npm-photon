import type {
	WebsiteBuilderBlock,
	WebsiteBuilderResources,
	WebsiteBuilderSiteFrameActionItem,
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

export const isCartLinkHref = (href: unknown) =>
	getHeaderLinkPathname(href) === "/cart";

export const getHeaderLinkDedupeKey = (href: unknown) =>
	`route:${getHeaderLinkPathname(href).toLowerCase()}`;

export const isProtectedAccountHref = (href: unknown) => {
	const pathname = getHeaderLinkPathname(href);

	return pathname === "/account" || pathname.startsWith("/account/");
};

export const getHeaderCartQuantity = (resources: WebsiteBuilderResources) => {
	const summary = resources.commerceCartSummary as
		| { items_quantity?: unknown; item_count?: unknown }
		| undefined;
	const quantity = Number(summary?.items_quantity ?? summary?.item_count ?? 0);

	return Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 0;
};

export const hasAuthenticatedUser = (resources: WebsiteBuilderResources) => {
	const auth = resources.auth as
		| { user?: null | Record<string, unknown> }
		| undefined;

	return Boolean(auth?.user);
};

export const hasCommerceBlock = (
	blocks: readonly WebsiteBuilderBlock[] | undefined,
): boolean =>
	(blocks ?? []).some((item) => {
		if (item.module === "commerce-website-builder") {
			return true;
		}

		return (item.areas ?? []).some((area) => hasCommerceBlock(area.blocks));
	});

export const hasCommerceRuntimeResource = (
	resources: WebsiteBuilderResources,
) =>
	[
		"commerceCatalog",
		"commerceCatalogItem",
		"commerceProduct",
		"commerceCheckout",
		"commerceOrder",
	].some((key) => resources[key] !== undefined) ||
	getHeaderCartQuantity(resources) > 0;

export const isCommerceExtensionId = (id: string | undefined) =>
	typeof id === "string" && id.startsWith("commerce");

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
	action: WebsiteBuilderSiteFrameActionItem,
	authenticatedUser: boolean,
) =>
	authenticatedUser && (action.kind ?? "link") === "auth"
		? (action.authenticatedHref ?? action.href)
		: action.href;

export const getHeaderCartLink = (
	links: Array<{ label: string; href?: string }>,
): { label: string; href: string } | null => {
	const link = links.find((item) => isCartLinkHref(item.href));

	return link?.href ? { label: link.label, href: link.href } : null;
};

export const collectHeaderActionLinkKeys = (
	actions: WebsiteBuilderSiteFrameActionItem[],
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
