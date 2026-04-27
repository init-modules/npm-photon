import { ag as PhotonSiteFrameExtension, ah as PhotonSiteFrameExtensionContext, ai as PhotonSiteFrameFooterSlots, aj as PhotonSiteFrameHeaderSlots, ak as PhotonAccountTabExtension } from './types-C1q0pf4n.js';

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
