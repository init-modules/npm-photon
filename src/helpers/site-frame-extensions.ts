import type {
	PhotonAccountTabExtension,
	PhotonSiteFrameActionItem,
	PhotonSiteFrameExtension,
	PhotonSiteFrameExtensionContext,
	PhotonSiteFrameFooterSlots,
	PhotonSiteFrameHeaderSlots,
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

const headerSlots = ["utility", "navigation", "prominent", "actions"] as const;
const footerSlots = ["navigation", "legal"] as const;

const createHeaderSlots = (): PhotonSiteFrameHeaderSlots => ({
	utility: { links: [], actions: [] },
	navigation: { links: [], actions: [] },
	prominent: { links: [], actions: [] },
	actions: { links: [], actions: [] },
});

const createFooterSlots = (): PhotonSiteFrameFooterSlots => ({
	navigation: { navigationColumns: [], links: [] },
	legal: { navigationColumns: [], links: [] },
});

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
	slots: PhotonSiteFrameHeaderSlots;
} => {
	const disabledIds = new Set(disabledItemIds);
	const slots = createHeaderSlots();
	const isAvailable = (
		item:
			| PhotonSiteFrameLinkItem
			| PhotonSiteFrameActionItem
			| { id?: string; enabled?: boolean },
	) => isEnabled(item) && isNotDisabled(item.id, disabledIds);

	for (const extension of extensions) {
		for (const slot of headerSlots) {
			const slotItems = extension.header?.slots?.[slot];

			for (const item of slotItems?.links ?? []) {
				if (isAvailable(item) && isVisible(item, context)) {
					slots[slot].links.push(item);
				}
			}

			for (const item of slotItems?.actions ?? []) {
				if (isAvailable(item) && isVisible(item, context)) {
					slots[slot].actions.push(item);
				}
			}
		}
	}

	for (const slot of headerSlots) {
		slots[slot].links.sort(byOrderThenLabel);
		slots[slot].actions.sort(byOrderThenLabel);
	}

	return {
		slots,
	};
};

export const collectPhotonFooterExtensionItems = (
	extensions: readonly PhotonSiteFrameExtension[],
	disabledItemIds: readonly string[] = [],
	context?: PhotonSiteFrameExtensionContext,
): {
	slots: PhotonSiteFrameFooterSlots;
} => {
	const disabledIds = new Set(disabledItemIds);
	const slots = createFooterSlots();
	const isAvailable = (
		item:
			| PhotonSiteFrameLinkItem
			| PhotonSiteFrameNavigationColumn
			| { id?: string; enabled?: boolean },
	) => isEnabled(item) && isNotDisabled(item.id, disabledIds);
	const isVisibleWhenPossible = (
		item: {
			isVisible?: (context: PhotonSiteFrameExtensionContext) => boolean;
		},
	) => !context || isVisible(item, context);

	for (const extension of extensions) {
		for (const slot of footerSlots) {
			const slotItems = extension.footer?.slots?.[slot];

			for (const column of slotItems?.navigationColumns ?? []) {
				if (isAvailable(column) && isVisibleWhenPossible(column)) {
					const links = column.links
						.filter(
							(item) => isAvailable(item) && isVisibleWhenPossible(item),
						)
						.sort(byOrderThenLabel);

					if (links.length > 0) {
						slots[slot].navigationColumns.push({
							...column,
							links,
						});
					}
				}
			}

			for (const item of slotItems?.links ?? []) {
				if (isAvailable(item) && isVisibleWhenPossible(item)) {
					slots[slot].links.push(item);
				}
			}
		}
	}

	for (const slot of footerSlots) {
		slots[slot].navigationColumns.sort(byOrderThenLabel);
		slots[slot].links.sort(byOrderThenLabel);
	}

	return {
		slots,
	};
};
