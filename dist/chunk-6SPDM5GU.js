// src/helpers/site-frame-extensions.ts
var normalizeOrder = (value) => typeof value === "number" && Number.isFinite(value) ? value : 0;
var byOrderThenLabel = (left, right) => normalizeOrder(left.order) - normalizeOrder(right.order) || (left.label ?? left.title ?? "").localeCompare(
  right.label ?? right.title ?? ""
);
var isEnabled = (value) => value.enabled !== false;
var isVisible = (value, context) => value.isVisible?.(context) !== false;
var isNotDisabled = (id, disabledIds) => !id || !disabledIds.has(id);
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
  return {
    utilityLinks: extensions.flatMap((extension) => extension.header?.utilityLinks ?? []).filter(
      (item) => isEnabled(item) && isNotDisabled(item.id, disabledIds) && isVisible(item, context)
    ).sort(byOrderThenLabel),
    categoryLinks: extensions.flatMap((extension) => extension.header?.categoryLinks ?? []).filter(
      (item) => isEnabled(item) && isNotDisabled(item.id, disabledIds) && isVisible(item, context)
    ).sort(byOrderThenLabel),
    actions: extensions.flatMap((extension) => extension.header?.actions ?? []).filter(
      (item) => isEnabled(item) && isNotDisabled(item.id, disabledIds) && isVisible(item, context)
    ).sort(byOrderThenLabel)
  };
};
var collectPhotonFooterExtensionItems = (extensions, disabledItemIds = []) => {
  const disabledIds = new Set(disabledItemIds);
  return {
    navigationColumns: extensions.flatMap((extension) => extension.footer?.navigationColumns ?? []).filter((item) => isEnabled(item) && isNotDisabled(item.id, disabledIds)).map((column) => ({
      ...column,
      links: column.links.filter(
        (item) => isEnabled(item) && isNotDisabled(item.id, disabledIds)
      ).sort(byOrderThenLabel)
    })).sort(byOrderThenLabel),
    legalLinks: extensions.flatMap((extension) => extension.footer?.legalLinks ?? []).filter((item) => isEnabled(item) && isNotDisabled(item.id, disabledIds)).sort(byOrderThenLabel)
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
