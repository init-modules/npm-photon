import {
  collectPhotonAccountTabs,
  collectPhotonDocuments,
  collectPhotonSiteFrameExtensions,
  createPhotonRegistry
} from "./chunk-U33YWAMI.js";

// src/helpers/runtime.ts
var createPhotonRuntime = (entries) => ({
  entries,
  registry: createPhotonRegistry(entries),
  documents: collectPhotonDocuments(entries),
  siteFrameExtensions: collectPhotonSiteFrameExtensions(entries),
  accountTabs: collectPhotonAccountTabs(entries)
});

export {
  createPhotonRuntime
};
