import {
  PHOTON_INTERACTIONS_SITE_SETTING_KEY
} from "./chunk-WHYISUJX.js";

// src/helpers/site-policy-overrides.ts
var sitePolicyPath = (id) => `${PHOTON_INTERACTIONS_SITE_SETTING_KEY}.policies.${id}`;
var isSitePolicyOverride = (policyId, siteSettings) => {
  const interactions = siteSettings?.[PHOTON_INTERACTIONS_SITE_SETTING_KEY];
  return Boolean(interactions?.policies?.[policyId]);
};
var createSitePolicyOverride = (basePolicy, patch) => ({
  ...basePolicy,
  ...patch,
  id: basePolicy.id,
  packageName: basePolicy.packageName,
  scope: "site"
});

export {
  sitePolicyPath,
  isSitePolicyOverride,
  createSitePolicyOverride
};
