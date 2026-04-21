import type {
	WebsiteBuilderAccountTabExtension,
	WebsiteBuilderSiteFrameActionItem,
	WebsiteBuilderSiteFrameExtension,
	WebsiteBuilderSiteFrameLinkItem,
	WebsiteBuilderSiteFrameNavigationColumn,
} from "../types";

const normalizeOrder = (value: unknown) =>
	typeof value === "number" && Number.isFinite(value) ? value : 0;

const byOrderThenLabel = <
	T extends { order?: number; label?: string; title?: string },
>(
	left: T,
	right: T,
) =>
	normalizeOrder(left.order) - normalizeOrder(right.order) ||
	(left.label ?? left.title ?? "").localeCompare(
		right.label ?? right.title ?? "",
	);

const isEnabled = (value: { enabled?: boolean }) => value.enabled !== false;

const isNotDisabled = (
	id: string | undefined,
	disabledIds: ReadonlySet<string>,
) => !id || !disabledIds.has(id);

export const createWebsiteBuilderSiteFrameExtension = (
	extension: WebsiteBuilderSiteFrameExtension,
): WebsiteBuilderSiteFrameExtension => extension;

export const createWebsiteBuilderAccountTabExtension = (
	tab: WebsiteBuilderAccountTabExtension,
): WebsiteBuilderAccountTabExtension => tab;

export const resolveWebsiteBuilderSiteFrameExtensions = (
	extensions: readonly WebsiteBuilderSiteFrameExtension[] | undefined,
	disabledExtensionIds: readonly string[] = [],
): WebsiteBuilderSiteFrameExtension[] => {
	const disabledIds = new Set(disabledExtensionIds);

	return [...(extensions ?? [])]
		.filter(
			(extension) => isEnabled(extension) && !disabledIds.has(extension.id),
		)
		.sort(byOrderThenLabel);
};

export const resolveWebsiteBuilderAccountTabs = (
	tabs: readonly WebsiteBuilderAccountTabExtension[] | undefined,
	disabledTabIds: readonly string[] = [],
): WebsiteBuilderAccountTabExtension[] => {
	const disabledIds = new Set(disabledTabIds);

	return [...(tabs ?? [])]
		.filter((tab) => isEnabled(tab) && !disabledIds.has(tab.id))
		.sort(byOrderThenLabel);
};

export const collectWebsiteBuilderHeaderExtensionItems = (
	extensions: readonly WebsiteBuilderSiteFrameExtension[],
	disabledItemIds: readonly string[] = [],
): {
	utilityLinks: WebsiteBuilderSiteFrameLinkItem[];
	categoryLinks: WebsiteBuilderSiteFrameLinkItem[];
	actions: WebsiteBuilderSiteFrameActionItem[];
} => {
	const disabledIds = new Set(disabledItemIds);

	return {
		utilityLinks: extensions
			.flatMap((extension) => extension.header?.utilityLinks ?? [])
			.filter((item) => isEnabled(item) && isNotDisabled(item.id, disabledIds))
			.sort(byOrderThenLabel),
		categoryLinks: extensions
			.flatMap((extension) => extension.header?.categoryLinks ?? [])
			.filter((item) => isEnabled(item) && isNotDisabled(item.id, disabledIds))
			.sort(byOrderThenLabel),
		actions: extensions
			.flatMap((extension) => extension.header?.actions ?? [])
			.filter((item) => isEnabled(item) && isNotDisabled(item.id, disabledIds))
			.sort(byOrderThenLabel),
	};
};

export const collectWebsiteBuilderFooterExtensionItems = (
	extensions: readonly WebsiteBuilderSiteFrameExtension[],
	disabledItemIds: readonly string[] = [],
): {
	navigationColumns: WebsiteBuilderSiteFrameNavigationColumn[];
	legalLinks: WebsiteBuilderSiteFrameLinkItem[];
} => {
	const disabledIds = new Set(disabledItemIds);

	return {
		navigationColumns: extensions
			.flatMap((extension) => extension.footer?.navigationColumns ?? [])
			.filter((item) => isEnabled(item) && isNotDisabled(item.id, disabledIds))
			.map((column) => ({
				...column,
				links: column.links
					.filter(
						(item) => isEnabled(item) && isNotDisabled(item.id, disabledIds),
					)
					.sort(byOrderThenLabel),
			}))
			.sort(byOrderThenLabel),
		legalLinks: extensions
			.flatMap((extension) => extension.footer?.legalLinks ?? [])
			.filter((item) => isEnabled(item) && isNotDisabled(item.id, disabledIds))
			.sort(byOrderThenLabel),
	};
};
