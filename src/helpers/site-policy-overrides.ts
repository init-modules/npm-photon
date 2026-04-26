import type {
	PhotonActionPolicy,
	PhotonInteractionSettings,
	PhotonSiteSettings,
} from "../types";
import { PHOTON_INTERACTIONS_SITE_SETTING_KEY } from "./interactions";

export const sitePolicyPath = (id: string): string =>
	`${PHOTON_INTERACTIONS_SITE_SETTING_KEY}.policies.${id}`;

export const isSitePolicyOverride = (
	policyId: string,
	siteSettings: PhotonSiteSettings | undefined,
): boolean => {
	const interactions = siteSettings?.[PHOTON_INTERACTIONS_SITE_SETTING_KEY] as
		| PhotonInteractionSettings
		| undefined;
	return Boolean(interactions?.policies?.[policyId]);
};

export const createSitePolicyOverride = (
	basePolicy: PhotonActionPolicy,
	patch?: Partial<PhotonActionPolicy>,
): PhotonActionPolicy => ({
	...basePolicy,
	...patch,
	id: basePolicy.id,
	packageName: basePolicy.packageName,
	scope: "site",
});
