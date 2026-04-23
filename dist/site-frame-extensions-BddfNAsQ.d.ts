import { u as PhotonSiteFrameExtension, v as PhotonSiteFrameNavigationColumn, w as PhotonSiteFrameLinkItem, x as PhotonSiteFrameActionItem, y as PhotonAccountTabExtension } from './types-BAycJgQn.js';

declare const createPhotonSiteFrameExtension: (extension: PhotonSiteFrameExtension) => PhotonSiteFrameExtension;
declare const createPhotonAccountTabExtension: (tab: PhotonAccountTabExtension) => PhotonAccountTabExtension;
declare const resolvePhotonSiteFrameExtensions: (extensions: readonly PhotonSiteFrameExtension[] | undefined, disabledExtensionIds?: readonly string[]) => PhotonSiteFrameExtension[];
declare const resolvePhotonAccountTabs: (tabs: readonly PhotonAccountTabExtension[] | undefined, disabledTabIds?: readonly string[]) => PhotonAccountTabExtension[];
declare const collectPhotonHeaderExtensionItems: (extensions: readonly PhotonSiteFrameExtension[], disabledItemIds?: readonly string[]) => {
    utilityLinks: PhotonSiteFrameLinkItem[];
    categoryLinks: PhotonSiteFrameLinkItem[];
    actions: PhotonSiteFrameActionItem[];
};
declare const collectPhotonFooterExtensionItems: (extensions: readonly PhotonSiteFrameExtension[], disabledItemIds?: readonly string[]) => {
    navigationColumns: PhotonSiteFrameNavigationColumn[];
    legalLinks: PhotonSiteFrameLinkItem[];
};

export { collectPhotonHeaderExtensionItems as a, createPhotonAccountTabExtension as b, collectPhotonFooterExtensionItems as c, createPhotonSiteFrameExtension as d, resolvePhotonSiteFrameExtensions as e, resolvePhotonAccountTabs as r };
