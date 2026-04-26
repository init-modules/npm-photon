import {
  collectPhotonAccountTabs,
  collectPhotonConditionDefinitions,
  collectPhotonConditionEvaluators,
  collectPhotonDocuments,
  collectPhotonFormSchemas,
  collectPhotonInteractionActions,
  collectPhotonInteractionGuardEvaluators,
  collectPhotonInteractionGuards,
  collectPhotonInteractionPolicies,
  collectPhotonInteractionSurfaces,
  collectPhotonRouteContextFields,
  collectPhotonSiteDataSchemas,
  collectPhotonSiteFrameExtensions,
  createPhotonRegistry
} from "./chunk-725LMVL7.js";

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
  interactionGuardEvaluators: collectPhotonInteractionGuardEvaluators(entries),
  interactionPolicies: collectPhotonInteractionPolicies(entries),
  conditionDefinitions: collectPhotonConditionDefinitions(entries),
  conditionEvaluators: collectPhotonConditionEvaluators(entries),
  siteDataSchemas: collectPhotonSiteDataSchemas(entries),
  routeContextFields: collectPhotonRouteContextFields(entries),
  formSchemas: collectPhotonFormSchemas(entries)
});

export {
  createPhotonRuntime
};
