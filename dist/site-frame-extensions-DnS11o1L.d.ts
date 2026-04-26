import { P as PhotonSiteFrameExtension, a as PhotonSiteFrameExtensionContext, b as PhotonSiteFrameFooterSlots, c as PhotonSiteFrameHeaderSlots, d as PhotonAccountTabExtension } from './types-B49fMVug.js';

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
