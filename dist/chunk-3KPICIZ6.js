import {
  collectWebsiteBuilderAccountTabs,
  collectWebsiteBuilderDocuments,
  collectWebsiteBuilderSiteFrameExtensions,
  createWebsiteBuilderRegistry
} from "./chunk-GBIC56HN.js";

// src/helpers/runtime.ts
var createWebsiteBuilderRuntime = (entries) => ({
  entries,
  registry: createWebsiteBuilderRegistry(entries),
  documents: collectWebsiteBuilderDocuments(entries),
  siteFrameExtensions: collectWebsiteBuilderSiteFrameExtensions(entries),
  accountTabs: collectWebsiteBuilderAccountTabs(entries)
});

export {
  createWebsiteBuilderRuntime
};
