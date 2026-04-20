import {
  cloneWebsiteBuilderValue,
  createWebsiteBuilderAreaListId,
  createWebsiteBuilderNodeId
} from "./chunk-IEZXES2I.js";

// src/helpers/site.ts
var WEBSITE_BUILDER_SURFACE_REGION_AREA_ID = "content";
var WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY = "page";
var WEBSITE_BUILDER_PAGE_SURFACE_REGION_ORDER = 50;
var WEBSITE_BUILDER_SITE_SHELL_REGION_TYPES = {
  header: "site-header-shell",
  footer: "site-footer-shell"
};
var createWebsiteBuilderSurfaceRegionBlockId = (regionKey) => `__wb_surface_region:${regionKey}__`;
var isWebsiteBuilderSurfaceRegionBlock = (block, regionKey) => {
  if (!block.id.startsWith("__wb_surface_region:")) {
    return false;
  }
  return regionKey ? block.id === createWebsiteBuilderSurfaceRegionBlockId(regionKey) : true;
};
var getWebsiteBuilderSurfaceRegionArea = (block) => block.areas?.find((area) => area.id === WEBSITE_BUILDER_SURFACE_REGION_AREA_ID) ?? null;
var getWebsiteBuilderSiteRegionDescriptors = (site) => Object.values(site.regions).sort((left, right) => left.order - right.order).map((region) => ({
  key: region.key,
  label: region.label,
  order: region.order,
  lockedOnCanvas: region.lockedOnCanvas,
  kind: "site"
}));
var removeDuplicatedWebsiteBuilderSiteShellBlocks = (blocks, site) => blocks.filter((block) => {
  const regionEntry = Object.entries(
    WEBSITE_BUILDER_SITE_SHELL_REGION_TYPES
  ).find(([, type]) => type === block.type);
  if (!regionEntry) {
    return true;
  }
  const [regionKey] = regionEntry;
  return !regionKey || !(regionKey in site.regions);
});
var resolveWebsiteBuilderSurfaceRegionDescriptors = (site) => {
  const pageDescriptor = {
    key: WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
    label: "Page content",
    order: WEBSITE_BUILDER_PAGE_SURFACE_REGION_ORDER,
    lockedOnCanvas: false,
    kind: "page"
  };
  return [...getWebsiteBuilderSiteRegionDescriptors(site), pageDescriptor].sort(
    (left, right) => left.order - right.order
  );
};
var createWebsiteBuilderSurfaceRegionBlock = ({
  key,
  label,
  lockedOnCanvas,
  blocks
}) => ({
  id: createWebsiteBuilderSurfaceRegionBlockId(key),
  module: "__website_builder_internal__",
  type: "surface-region",
  props: {
    regionKey: key,
    label,
    lockedOnCanvas
  },
  areas: [
    {
      id: WEBSITE_BUILDER_SURFACE_REGION_AREA_ID,
      label,
      blocks: cloneWebsiteBuilderValue(blocks)
    }
  ]
});
var createWebsiteBuilderEmptyDocument = (key, label, route, updatedAt) => ({
  id: `website-builder-${key}`,
  name: label,
  route,
  updatedAt,
  blocks: []
});
var composeWebsiteBuilderSurfaceDocument = (pageDocument, site) => {
  const sanitizedPageBlocks = removeDuplicatedWebsiteBuilderSiteShellBlocks(
    pageDocument.blocks,
    site
  );
  const regionDescriptors = resolveWebsiteBuilderSurfaceRegionDescriptors(site);
  const latestUpdatedAt = Object.values(site.regions).reduce(
    (currentLatest, region) => {
      const candidate = region.document?.updatedAt;
      return typeof candidate === "string" && candidate > currentLatest ? candidate : currentLatest;
    },
    pageDocument.updatedAt
  );
  return {
    id: pageDocument.id,
    name: pageDocument.name,
    route: pageDocument.route,
    updatedAt: latestUpdatedAt,
    blocks: regionDescriptors.map((descriptor) => {
      if (descriptor.kind === "page") {
        return createWebsiteBuilderSurfaceRegionBlock({
          key: descriptor.key,
          label: descriptor.label,
          lockedOnCanvas: descriptor.lockedOnCanvas,
          blocks: sanitizedPageBlocks
        });
      }
      const regionDocument = site.regions[descriptor.key]?.document;
      return createWebsiteBuilderSurfaceRegionBlock({
        key: descriptor.key,
        label: descriptor.label,
        lockedOnCanvas: descriptor.lockedOnCanvas,
        blocks: regionDocument?.blocks ?? []
      });
    })
  };
};
var decomposeWebsiteBuilderSurfaceDocument = (surfaceDocument, site) => {
  const pageBlocks = getWebsiteBuilderSurfaceRegionBlocks(
    surfaceDocument,
    WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY
  ) ?? [];
  const pageDocument = {
    id: surfaceDocument.id,
    name: surfaceDocument.name,
    route: surfaceDocument.route,
    updatedAt: surfaceDocument.updatedAt,
    blocks: cloneWebsiteBuilderValue(
      removeDuplicatedWebsiteBuilderSiteShellBlocks(pageBlocks, site)
    )
  };
  const nextRegions = Object.fromEntries(
    Object.entries(site.regions).map(([regionKey, region]) => {
      const regionBlocks = getWebsiteBuilderSurfaceRegionBlocks(surfaceDocument, regionKey) ?? [];
      const fallbackDocument = region.document ?? createWebsiteBuilderEmptyDocument(
        `site-${regionKey}`,
        region.label,
        `/_site/${regionKey}`,
        surfaceDocument.updatedAt
      );
      return [
        regionKey,
        {
          ...region,
          document: {
            ...fallbackDocument,
            updatedAt: surfaceDocument.updatedAt,
            blocks: cloneWebsiteBuilderValue(regionBlocks)
          }
        }
      ];
    })
  );
  return {
    pageDocument,
    site: {
      settings: cloneWebsiteBuilderValue(site.settings),
      regions: nextRegions
    }
  };
};
var getWebsiteBuilderSurfaceRegionBlocks = (document, regionKey) => {
  const block = document.blocks.find(
    (candidate) => isWebsiteBuilderSurfaceRegionBlock(candidate, regionKey)
  );
  const area = block ? getWebsiteBuilderSurfaceRegionArea(block) : null;
  return area ? area.blocks : null;
};
var getWebsiteBuilderSurfaceRegionListId = (regionKey) => createWebsiteBuilderAreaListId(
  createWebsiteBuilderSurfaceRegionBlockId(regionKey),
  WEBSITE_BUILDER_SURFACE_REGION_AREA_ID
);
var findFirstEditableBlockId = (blocks) => {
  for (const block of blocks) {
    if (isWebsiteBuilderSurfaceRegionBlock(block)) {
      const area = getWebsiteBuilderSurfaceRegionArea(block);
      const nested = area ? findFirstEditableBlockId(area.blocks) : null;
      if (nested) {
        return nested;
      }
      continue;
    }
    return block.id;
  }
  return null;
};
var getFirstWebsiteBuilderSurfaceEditableBlockId = (document) => findFirstEditableBlockId(document.blocks);
var resolveWebsiteBuilderSurfaceRegionFromBlocks = (blocks, blockId, listId, currentRegion) => {
  for (const block of blocks) {
    const nextRegion = isWebsiteBuilderSurfaceRegionBlock(block) ? block.props.regionKey ?? currentRegion : currentRegion;
    if (block.id === blockId) {
      return nextRegion;
    }
    for (const area of block.areas ?? []) {
      const areaListId = createWebsiteBuilderAreaListId(block.id, area.id);
      if (areaListId === listId) {
        return nextRegion;
      }
      const nested = resolveWebsiteBuilderSurfaceRegionFromBlocks(
        area.blocks,
        blockId,
        listId,
        nextRegion
      );
      if (nested) {
        return nested;
      }
    }
  }
  return null;
};
var resolveWebsiteBuilderSurfaceRegionForBlockId = (document, blockId) => resolveWebsiteBuilderSurfaceRegionFromBlocks(
  document.blocks,
  blockId,
  "__unknown__",
  null
);
var resolveWebsiteBuilderSurfaceRegionForListId = (document, listId) => resolveWebsiteBuilderSurfaceRegionFromBlocks(
  document.blocks,
  "__unknown__",
  listId,
  null
);

// src/helpers/installable.ts
var createWebsiteBuilderKit = (kit) => kit;
var isWebsiteBuilderInstallableKit = (entry) => "modules" in entry;
var resolveWebsiteBuilderModules = (entries) => entries.flatMap(
  (entry) => isWebsiteBuilderInstallableKit(entry) ? entry.modules : [entry]
);
var collectWebsiteBuilderDocuments = (entries) => {
  const documents = {};
  for (const entry of entries) {
    if (!isWebsiteBuilderInstallableKit(entry) || !entry.documents) {
      continue;
    }
    Object.assign(documents, entry.documents);
  }
  return documents;
};
var collectWebsiteBuilderSiteFrameExtensions = (entries) => entries.flatMap(
  (entry) => isWebsiteBuilderInstallableKit(entry) ? entry.siteFrameExtensions ?? [] : []
);
var collectWebsiteBuilderAccountTabs = (entries) => entries.flatMap(
  (entry) => isWebsiteBuilderInstallableKit(entry) ? entry.accountTabs ?? [] : []
);

// src/helpers/document.ts
var getWebsiteBuilderDefinitionKey = (moduleName, blockType) => `${moduleName}::${blockType}`;
var createWebsiteBuilderRegistry = (entries) => {
  const modules = resolveWebsiteBuilderModules(entries);
  const definitions = /* @__PURE__ */ new Map();
  const bindingAdapters = /* @__PURE__ */ new Map();
  const pageSettingsPanels = [];
  const siteSettingsPanels = [];
  modules.forEach((moduleEntry) => {
    moduleEntry.blocks.forEach((definition) => {
      definitions.set(
        getWebsiteBuilderDefinitionKey(moduleEntry.module, definition.type),
        definition
      );
    });
    moduleEntry.bindingAdapters?.forEach((adapter) => {
      bindingAdapters.set(adapter.key, adapter);
    });
    moduleEntry.pageSettingsPanels?.forEach((panel) => {
      pageSettingsPanels.push(panel);
    });
    moduleEntry.siteSettingsPanels?.forEach((panel) => {
      siteSettingsPanels.push(panel);
    });
  });
  pageSettingsPanels.sort(
    (left, right) => {
      const scopeOrder = {
        page: 0,
        template: 1,
        record: 2
      };
      const byScope = scopeOrder[left.scope] - scopeOrder[right.scope];
      if (byScope !== 0) {
        return byScope;
      }
      return (left.order ?? 0) - (right.order ?? 0);
    }
  );
  siteSettingsPanels.sort((left, right) => (left.order ?? 0) - (right.order ?? 0));
  return {
    modules,
    definitions,
    bindingAdapters,
    pageSettingsPanels,
    siteSettingsPanels,
    getDefinition(moduleName, blockType) {
      return definitions.get(
        getWebsiteBuilderDefinitionKey(moduleName, blockType)
      );
    },
    getBindingAdapter(key) {
      return bindingAdapters.get(key);
    },
    getPageSettingsPanels() {
      return pageSettingsPanels;
    },
    getSiteSettingsPanels() {
      return siteSettingsPanels;
    },
    getPaletteBlocks() {
      return modules.flatMap(
        (moduleEntry) => moduleEntry.blocks.map((definition) => ({
          ...definition,
          module: moduleEntry.module,
          key: getWebsiteBuilderDefinitionKey(
            moduleEntry.module,
            definition.type
          )
        }))
      );
    }
  };
};
var createWebsiteBuilderLocalizedDefault = (values) => ({
  __wbLocalizedDefault: true,
  values
});
var registerWebsiteBuilderFieldLocalization = (schema, mode, path) => {
  const normalizedPath = path.replace(
    /(?:^|\.)\d+(?=\.|$)/g,
    (segment) => segment.startsWith(".") ? ".*" : "*"
  );
  if (mode === "localized") {
    schema.localized.push(normalizedPath);
    return;
  }
  schema.shared.push(normalizedPath);
};
var collectWebsiteBuilderFieldLocalization = (field, schema, basePath, inheritedLocalization) => {
  const effectiveLocalization = field.localization ?? inheritedLocalization;
  const currentPath = field.path ? basePath ? `${basePath}.${field.path}` : field.path : basePath;
  if (field.kind === "object") {
    for (const nestedField of field.fields ?? []) {
      collectWebsiteBuilderFieldLocalization(
        nestedField,
        schema,
        currentPath,
        effectiveLocalization
      );
    }
    return;
  }
  if (field.kind === "repeater") {
    const repeaterBasePath = currentPath ? `${currentPath}.*` : "*";
    if (field.itemField) {
      collectWebsiteBuilderFieldLocalization(
        field.itemField,
        schema,
        repeaterBasePath,
        effectiveLocalization
      );
    }
    for (const nestedField of field.fields ?? []) {
      collectWebsiteBuilderFieldLocalization(
        nestedField,
        schema,
        repeaterBasePath,
        effectiveLocalization
      );
    }
    return;
  }
  if (field.kind === "form-fields") {
    if (!currentPath) {
      throw new Error("Website Builder form fields require a concrete path.");
    }
    for (const localizedPath of [
      "helpText",
      "label",
      "options.*.label",
      "placeholder"
    ]) {
      registerWebsiteBuilderFieldLocalization(
        schema,
        "localized",
        `${currentPath}.*.${localizedPath}`
      );
    }
    for (const sharedPath of [
      "disabled",
      "id",
      "locked",
      "name",
      "options.*.value",
      "removable",
      "required",
      "type",
      "width"
    ]) {
      registerWebsiteBuilderFieldLocalization(
        schema,
        "shared",
        `${currentPath}.*.${sharedPath}`
      );
    }
    return;
  }
  if (!currentPath) {
    throw new Error("Website Builder field localization requires a concrete path.");
  }
  if (!effectiveLocalization) {
    throw new Error(
      `Website Builder field "${currentPath}" is missing explicit localization metadata.`
    );
  }
  registerWebsiteBuilderFieldLocalization(
    schema,
    effectiveLocalization,
    currentPath
  );
};
var createWebsiteBuilderBlockLocalizationSchema = (fields) => {
  const schema = {
    localized: [],
    shared: []
  };
  for (const field of fields) {
    collectWebsiteBuilderFieldLocalization(field, schema, "");
  }
  schema.localized.sort();
  schema.shared.sort();
  return schema;
};
var createWebsiteBuilderLocalizationManifest = (modules) => Object.fromEntries(
  modules.flatMap(
    (moduleEntry) => moduleEntry.blocks.map((definition) => [
      getWebsiteBuilderDefinitionKey(moduleEntry.module, definition.type),
      definition.localizationSchema ?? createWebsiteBuilderBlockLocalizationSchema(definition.fields)
    ])
  )
);
var isWebsiteBuilderLocalizedDefault = (value) => typeof value === "object" && value !== null && "__wbLocalizedDefault" in value && value.__wbLocalizedDefault === true && "values" in value;
var resolveWebsiteBuilderLocalizedDefaultValue = (value, locale, defaultLocale) => {
  if (Array.isArray(value)) {
    return value.map(
      (item) => resolveWebsiteBuilderLocalizedDefaultValue(item, locale, defaultLocale)
    );
  }
  if (isWebsiteBuilderLocalizedDefault(value)) {
    return cloneWebsiteBuilderValue(
      value.values[locale] ?? value.values[defaultLocale] ?? Object.values(value.values)[0] ?? null
    );
  }
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        resolveWebsiteBuilderLocalizedDefaultValue(item, locale, defaultLocale)
      ])
    );
  }
  return value;
};
var createWebsiteBuilderBlock = (moduleName, definition, options) => {
  const locale = options?.locale?.trim().toLowerCase() || "en";
  const defaultLocale = options?.defaultLocale?.trim().toLowerCase() || "en";
  return {
    id: createWebsiteBuilderNodeId(),
    module: moduleName,
    type: definition.type,
    props: resolveWebsiteBuilderLocalizedDefaultValue(
      cloneWebsiteBuilderValue(definition.defaults),
      locale,
      defaultLocale
    ),
    bindings: cloneWebsiteBuilderValue(definition.bindings),
    areas: cloneWebsiteBuilderValue(definition.areas)
  };
};
var defineWebsiteBuilderBlockDefinition = (definition) => ({
  ...definition,
  localizationSchema: definition.localizationSchema ?? createWebsiteBuilderBlockLocalizationSchema(definition.fields)
});
var moveWebsiteBuilderArrayItem = (items, fromIndex, toIndex) => {
  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
};
var getWebsiteBuilderDocumentFingerprint = (document) => JSON.stringify({
  id: document.id,
  name: document.name,
  route: document.route,
  blocks: document.blocks
});

export {
  WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
  resolveWebsiteBuilderSurfaceRegionDescriptors,
  composeWebsiteBuilderSurfaceDocument,
  decomposeWebsiteBuilderSurfaceDocument,
  getWebsiteBuilderSurfaceRegionBlocks,
  getWebsiteBuilderSurfaceRegionListId,
  getFirstWebsiteBuilderSurfaceEditableBlockId,
  resolveWebsiteBuilderSurfaceRegionForBlockId,
  resolveWebsiteBuilderSurfaceRegionForListId,
  createWebsiteBuilderKit,
  isWebsiteBuilderInstallableKit,
  resolveWebsiteBuilderModules,
  collectWebsiteBuilderDocuments,
  collectWebsiteBuilderSiteFrameExtensions,
  collectWebsiteBuilderAccountTabs,
  getWebsiteBuilderDefinitionKey,
  createWebsiteBuilderRegistry,
  createWebsiteBuilderLocalizedDefault,
  createWebsiteBuilderBlockLocalizationSchema,
  createWebsiteBuilderLocalizationManifest,
  createWebsiteBuilderBlock,
  defineWebsiteBuilderBlockDefinition,
  moveWebsiteBuilderArrayItem,
  getWebsiteBuilderDocumentFingerprint
};
