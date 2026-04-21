import { u as WebsiteBuilderSiteFrameExtension, v as WebsiteBuilderSiteFrameNavigationColumn, w as WebsiteBuilderSiteFrameLinkItem, x as WebsiteBuilderSiteFrameActionItem, y as WebsiteBuilderAccountTabExtension } from './types-CuFDrLWO.js';

declare const createWebsiteBuilderSiteFrameExtension: (extension: WebsiteBuilderSiteFrameExtension) => WebsiteBuilderSiteFrameExtension;
declare const createWebsiteBuilderAccountTabExtension: (tab: WebsiteBuilderAccountTabExtension) => WebsiteBuilderAccountTabExtension;
declare const resolveWebsiteBuilderSiteFrameExtensions: (extensions: readonly WebsiteBuilderSiteFrameExtension[] | undefined, disabledExtensionIds?: readonly string[]) => WebsiteBuilderSiteFrameExtension[];
declare const resolveWebsiteBuilderAccountTabs: (tabs: readonly WebsiteBuilderAccountTabExtension[] | undefined, disabledTabIds?: readonly string[]) => WebsiteBuilderAccountTabExtension[];
declare const collectWebsiteBuilderHeaderExtensionItems: (extensions: readonly WebsiteBuilderSiteFrameExtension[], disabledItemIds?: readonly string[]) => {
    utilityLinks: WebsiteBuilderSiteFrameLinkItem[];
    categoryLinks: WebsiteBuilderSiteFrameLinkItem[];
    actions: WebsiteBuilderSiteFrameActionItem[];
};
declare const collectWebsiteBuilderFooterExtensionItems: (extensions: readonly WebsiteBuilderSiteFrameExtension[], disabledItemIds?: readonly string[]) => {
    navigationColumns: WebsiteBuilderSiteFrameNavigationColumn[];
    legalLinks: WebsiteBuilderSiteFrameLinkItem[];
};

export { createWebsiteBuilderSiteFrameExtension as a, collectWebsiteBuilderFooterExtensionItems as b, createWebsiteBuilderAccountTabExtension as c, collectWebsiteBuilderHeaderExtensionItems as d, resolveWebsiteBuilderSiteFrameExtensions as e, resolveWebsiteBuilderAccountTabs as r };
