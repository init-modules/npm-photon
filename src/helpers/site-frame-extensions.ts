import type {
	PhotonAccountTabExtension,
	PhotonSiteFrameActionItem,
	PhotonSiteFrameExtension,
	PhotonSiteFrameExtensionContext,
	PhotonSiteFrameLinkItem,
	PhotonSiteFrameNavigationColumn,
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

const isVisible = (
	value: { isVisible?: (context: PhotonSiteFrameExtensionContext) => boolean },
	context: PhotonSiteFrameExtensionContext,
) => value.isVisible?.(context) !== false;

const isNotDisabled = (
	id: string | undefined,
	disabledIds: ReadonlySet<string>,
) => !id || !disabledIds.has(id);

export const createPhotonSiteFrameExtension = (
	extension: PhotonSiteFrameExtension,
): PhotonSiteFrameExtension => extension;

export const createPhotonAccountTabExtension = (
	tab: PhotonAccountTabExtension,
): PhotonAccountTabExtension => tab;

export const resolvePhotonSiteFrameExtensions = (
	extensions: readonly PhotonSiteFrameExtension[] | undefined,
	disabledExtensionIds: readonly string[] = [],
): PhotonSiteFrameExtension[] => {
	const disabledIds = new Set(disabledExtensionIds);

	return [...(extensions ?? [])]
		.filter(
			(extension) => isEnabled(extension) && !disabledIds.has(extension.id),
		)
		.sort(byOrderThenLabel);
};

export const resolvePhotonAccountTabs = (
	tabs: readonly PhotonAccountTabExtension[] | undefined,
	disabledTabIds: readonly string[] = [],
): PhotonAccountTabExtension[] => {
	const disabledIds = new Set(disabledTabIds);

	return [...(tabs ?? [])]
		.filter((tab) => isEnabled(tab) && !disabledIds.has(tab.id))
		.sort(byOrderThenLabel);
};

export const collectPhotonHeaderExtensionItems = (
	extensions: readonly PhotonSiteFrameExtension[],
	disabledItemIds: readonly string[] = [],
	context: PhotonSiteFrameExtensionContext,
): {
	utilityLinks: PhotonSiteFrameLinkItem[];
	categoryLinks: PhotonSiteFrameLinkItem[];
	actions: PhotonSiteFrameActionItem[];
} => {
	const disabledIds = new Set(disabledItemIds);

	return {
		utilityLinks: extensions
			.flatMap((extension) => extension.header?.utilityLinks ?? [])
			.filter(
				(item) =>
					isEnabled(item) &&
					isNotDisabled(item.id, disabledIds) &&
					isVisible(item, context),
			)
			.sort(byOrderThenLabel),
		categoryLinks: extensions
			.flatMap((extension) => extension.header?.categoryLinks ?? [])
			.filter(
				(item) =>
					isEnabled(item) &&
					isNotDisabled(item.id, disabledIds) &&
					isVisible(item, context),
			)
			.sort(byOrderThenLabel),
		actions: extensions
			.flatMap((extension) => extension.header?.actions ?? [])
			.filter(
				(item) =>
					isEnabled(item) &&
					isNotDisabled(item.id, disabledIds) &&
					isVisible(item, context),
			)
			.sort(byOrderThenLabel),
	};
};

export const collectPhotonFooterExtensionItems = (
	extensions: readonly PhotonSiteFrameExtension[],
	disabledItemIds: readonly string[] = [],
): {
	navigationColumns: PhotonSiteFrameNavigationColumn[];
	legalLinks: PhotonSiteFrameLinkItem[];
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
