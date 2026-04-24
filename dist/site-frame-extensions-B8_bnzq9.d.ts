import { u as PhotonSiteFrameExtension, v as PhotonSiteFrameExtensionContext, w as PhotonSiteFrameFooterSlots, x as PhotonSiteFrameHeaderSlots, y as PhotonAccountTabExtension } from './types-_Y3LUXJR.js';

declare const createPhotonSiteFrameExtension: (extension: PhotonSiteFrameExtension) => PhotonSiteFrameExtension;
declare const createPhotonAccountTabExtension: (tab: PhotonAccountTabExtension) => PhotonAccountTabExtension;
declare const resolvePhotonSiteFrameExtensions: (extensions: readonly PhotonSiteFrameExtension[] | undefined, disabledExtensionIds?: readonly string[]) => PhotonSiteFrameExtension[];
declare const resolvePhotonAccountTabs: (tabs: readonly PhotonAccountTabExtension[] | undefined, disabledTabIds?: readonly string[]) => PhotonAccountTabExtension[];
declare const collectPhotonHeaderExtensionItems: (extensions: readonly PhotonSiteFrameExtension[], disabledItemIds: readonly string[] | undefined, context: PhotonSiteFrameExtensionContext) => {
    slots: PhotonSiteFrameHeaderSlots;
};
declare const collectPhotonFooterExtensionItems: (extensions: readonly PhotonSiteFrameExtension[], disabledItemIds?: readonly string[], context?: PhotonSiteFrameExtensionContext) => {
    slots: PhotonSiteFrameFooterSlots;
};

export { collectPhotonHeaderExtensionItems as a, createPhotonAccountTabExtension as b, collectPhotonFooterExtensionItems as c, createPhotonSiteFrameExtension as d, resolvePhotonSiteFrameExtensions as e, resolvePhotonAccountTabs as r };
