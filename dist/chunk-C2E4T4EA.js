import {
  collectPhotonAccountTabs,
  collectPhotonDocuments,
  collectPhotonInteractionActions,
  collectPhotonInteractionGuardEvaluators,
  collectPhotonInteractionGuards,
  collectPhotonInteractionSurfaces,
  collectPhotonSiteFrameExtensions,
  createPhotonRegistry
} from "./chunk-PWNAHWNN.js";

// src/helpers/runtime.ts
var createPhotonRuntime = (entries) => ({
  entries,
  registry: createPhotonRegistry(entries),
  documents: collectPhotonDocuments(entries),
  siteFrameExtensions: collectPhotonSiteFrameExtensions(entries),
  accountTabs: collectPhotonAccountTabs(entries),
  interactionSurfaces: collectPhotonInteractionSurfaces(entries),
  interactionActions: collectPhotonInteractionActions(entries),
  interactionGuards: collectPhotonInteractionGuards(entries),
  interactionGuardEvaluators: collectPhotonInteractionGuardEvaluators(entries)
});

export {
  createPhotonRuntime
};
