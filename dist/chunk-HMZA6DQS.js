// src/helpers/site-frame-extensions.ts
var normalizeOrder = (value) => typeof value === "number" && Number.isFinite(value) ? value : 0;
var byOrderThenLabel = (left, right) => normalizeOrder(left.order) - normalizeOrder(right.order) || (left.label ?? left.title ?? "").localeCompare(
  right.label ?? right.title ?? ""
);
var isEnabled = (value) => value.enabled !== false;
var isVisible = (value, context) => value.isVisible?.(context) !== false;
var isNotDisabled = (id, disabledIds) => !id || !disabledIds.has(id);
var headerSlots = ["utility", "navigation", "prominent", "actions"];
var footerSlots = ["navigation", "legal"];
var createHeaderSlots = () => ({
  utility: { links: [], actions: [] },
  navigation: { links: [], actions: [] },
  prominent: { links: [], actions: [] },
  actions: { links: [], actions: [] }
});
var createFooterSlots = () => ({
  navigation: { navigationColumns: [], links: [] },
  legal: { navigationColumns: [], links: [] }
});
var createPhotonSiteFrameExtension = (extension) => extension;
var createPhotonAccountTabExtension = (tab) => tab;
var resolvePhotonSiteFrameExtensions = (extensions, disabledExtensionIds = []) => {
  const disabledIds = new Set(disabledExtensionIds);
  return [...extensions ?? []].filter(
    (extension) => isEnabled(extension) && !disabledIds.has(extension.id)
  ).sort(byOrderThenLabel);
};
var resolvePhotonAccountTabs = (tabs, disabledTabIds = []) => {
  const disabledIds = new Set(disabledTabIds);
  return [...tabs ?? []].filter((tab) => isEnabled(tab) && !disabledIds.has(tab.id)).sort(byOrderThenLabel);
};
var collectPhotonHeaderExtensionItems = (extensions, disabledItemIds = [], context) => {
  const disabledIds = new Set(disabledItemIds);
  const slots = createHeaderSlots();
  const isAvailable = (item) => isEnabled(item) && isNotDisabled(item.id, disabledIds);
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
    slots
  };
};
var collectPhotonFooterExtensionItems = (extensions, disabledItemIds = [], context) => {
  const disabledIds = new Set(disabledItemIds);
  const slots = createFooterSlots();
  const isAvailable = (item) => isEnabled(item) && isNotDisabled(item.id, disabledIds);
  const isVisibleWhenPossible = (item) => !context || isVisible(item, context);
  for (const extension of extensions) {
    for (const slot of footerSlots) {
      const slotItems = extension.footer?.slots?.[slot];
      for (const column of slotItems?.navigationColumns ?? []) {
        if (isAvailable(column) && isVisibleWhenPossible(column)) {
          const links = column.links.filter(
            (item) => isAvailable(item) && isVisibleWhenPossible(item)
          ).sort(byOrderThenLabel);
          if (links.length > 0) {
            slots[slot].navigationColumns.push({
              ...column,
              links
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
    slots
  };
};

export {
  createPhotonSiteFrameExtension,
  createPhotonAccountTabExtension,
  resolvePhotonSiteFrameExtensions,
  resolvePhotonAccountTabs,
  collectPhotonHeaderExtensionItems,
  collectPhotonFooterExtensionItems
};
