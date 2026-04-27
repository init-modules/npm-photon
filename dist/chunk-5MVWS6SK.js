import {
  PHOTON_INTERACTIONS_SITE_SETTING_KEY
} from "./chunk-WHYISUJX.js";

// src/helpers/profile-seed.ts
var collectInstanceCanvasStageOverrides = (instance) => {
  if (!instance.props || Object.keys(instance.props).length === 0) {
    return null;
  }
  return {
    default: { ...instance.props }
  };
};
var collectPhotonProfileSeedSiteSettings = (input) => {
  const surfaces = input.interactionSurfaces ?? [];
  if (surfaces.length === 0) {
    return null;
  }
  const surfaceInstances = {};
  const canvasStageOverrides = {};
  for (const surface of surfaces) {
    const definitionInstances = surface.defaultInstances ?? [];
    for (const instance of definitionInstances) {
      surfaceInstances[instance.id] = { ...instance };
      const stageOverrides = collectInstanceCanvasStageOverrides(instance);
      if (stageOverrides) {
        canvasStageOverrides[instance.id] = stageOverrides;
      }
    }
  }
  const hasInstances = Object.keys(surfaceInstances).length > 0;
  const hasCanvasStageOverrides = Object.keys(canvasStageOverrides).length > 0;
  if (!hasInstances && !hasCanvasStageOverrides) {
    return null;
  }
  const result = {};
  if (hasInstances) {
    result.interactionSurfaces = { instances: surfaceInstances };
  }
  if (hasCanvasStageOverrides) {
    result.interactions = { canvasStageOverrides };
  }
  return result;
};
var mergePhotonProfileSeedIntoSiteSettings = (siteSettings, input) => {
  const seed = collectPhotonProfileSeedSiteSettings(input);
  if (!seed) {
    return siteSettings;
  }
  const next = { ...siteSettings };
  if (seed.interactionSurfaces) {
    const existing = next.interactionSurfaces ?? {};
    next.interactionSurfaces = {
      ...existing,
      instances: {
        ...seed.interactionSurfaces.instances ?? {},
        ...existing.instances ?? {}
      }
    };
  }
  if (seed.interactions) {
    const existing = next[PHOTON_INTERACTIONS_SITE_SETTING_KEY] ?? {};
    next[PHOTON_INTERACTIONS_SITE_SETTING_KEY] = {
      ...existing,
      canvasStageOverrides: {
        ...seed.interactions.canvasStageOverrides ?? {},
        ...existing.canvasStageOverrides ?? {}
      }
    };
  }
  return next;
};

export {
  collectPhotonProfileSeedSiteSettings,
  mergePhotonProfileSeedIntoSiteSettings
};
