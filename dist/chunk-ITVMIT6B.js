import {
  collectWebsiteBuilderDocuments,
  createWebsiteBuilderRegistry
} from "./chunk-2NBCYAY5.js";

// src/helpers/runtime.ts
var createWebsiteBuilderRuntime = (entries) => ({
  entries,
  registry: createWebsiteBuilderRegistry(entries),
  documents: collectWebsiteBuilderDocuments(entries)
});

export {
  createWebsiteBuilderRuntime
};
