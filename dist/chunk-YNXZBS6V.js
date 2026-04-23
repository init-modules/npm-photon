import {
  createPhotonAreaListId,
  createPhotonNodeId
} from "./chunk-U2HNHTED.js";
import {
  clonePhotonValue
} from "./chunk-KAITZE7U.js";

// src/helpers/site.ts
var PHOTON_SURFACE_REGION_AREA_ID = "content";
var PHOTON_PAGE_SURFACE_REGION_KEY = "page";
var PHOTON_PAGE_SURFACE_REGION_ORDER = 50;
var PHOTON_SITE_SHELL_REGION_TYPES = {
  header: "site-header-shell",
  footer: "site-footer-shell"
};
var createPhotonSurfaceRegionBlockId = (regionKey) => `__photon_surface_region:${regionKey}__`;
var isPhotonSurfaceRegionBlock = (block, regionKey) => {
  if (!block.id.startsWith("__photon_surface_region:")) {
    return false;
  }
  return regionKey ? block.id === createPhotonSurfaceRegionBlockId(regionKey) : true;
};
var getPhotonSurfaceRegionArea = (block) => block.areas?.find((area) => area.id === PHOTON_SURFACE_REGION_AREA_ID) ?? null;
var getPhotonSiteRegionDescriptors = (site) => Object.values(site.regions).sort((left, right) => left.order - right.order).map((region) => ({
  key: region.key,
  label: region.label,
  order: region.order,
  lockedOnCanvas: region.lockedOnCanvas,
  kind: "site"
}));
var removeDuplicatedPhotonSiteShellBlocks = (blocks, site) => blocks.filter((block) => {
  const regionEntry = Object.entries(PHOTON_SITE_SHELL_REGION_TYPES).find(
    ([, type]) => type === block.type
  );
  if (!regionEntry) {
    return true;
  }
  const [regionKey] = regionEntry;
  return !regionKey || !(regionKey in site.regions);
});
var resolvePhotonSurfaceRegionDescriptors = (site) => {
  const pageDescriptor = {
    key: PHOTON_PAGE_SURFACE_REGION_KEY,
    label: "Page content",
    order: PHOTON_PAGE_SURFACE_REGION_ORDER,
    lockedOnCanvas: false,
    kind: "page"
  };
  return [...getPhotonSiteRegionDescriptors(site), pageDescriptor].sort(
    (left, right) => left.order - right.order
  );
};
var createPhotonSurfaceRegionBlock = ({
  key,
  label,
  lockedOnCanvas,
  blocks
}) => ({
  id: createPhotonSurfaceRegionBlockId(key),
  module: "__photon_internal__",
  type: "surface-region",
  props: {
    regionKey: key,
    label,
    lockedOnCanvas
  },
  areas: [
    {
      id: PHOTON_SURFACE_REGION_AREA_ID,
      label,
      blocks: clonePhotonValue(blocks)
    }
  ]
});
var createPhotonEmptyDocument = (key, label, route, updatedAt) => ({
  id: `photon-${key}`,
  name: label,
  route,
  updatedAt,
  blocks: []
});
var composePhotonSurfaceDocument = (pageDocument, site) => {
  const sanitizedPageBlocks = removeDuplicatedPhotonSiteShellBlocks(
    pageDocument.blocks,
    site
  );
  const regionDescriptors = resolvePhotonSurfaceRegionDescriptors(site);
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
        return createPhotonSurfaceRegionBlock({
          key: descriptor.key,
          label: descriptor.label,
          lockedOnCanvas: descriptor.lockedOnCanvas,
          blocks: sanitizedPageBlocks
        });
      }
      const regionDocument = site.regions[descriptor.key]?.document;
      return createPhotonSurfaceRegionBlock({
        key: descriptor.key,
        label: descriptor.label,
        lockedOnCanvas: descriptor.lockedOnCanvas,
        blocks: regionDocument?.blocks ?? []
      });
    })
  };
};
var decomposePhotonSurfaceDocument = (surfaceDocument, site) => {
  const pageBlocks = getPhotonSurfaceRegionBlocks(
    surfaceDocument,
    PHOTON_PAGE_SURFACE_REGION_KEY
  ) ?? [];
  const pageDocument = {
    id: surfaceDocument.id,
    name: surfaceDocument.name,
    route: surfaceDocument.route,
    updatedAt: surfaceDocument.updatedAt,
    blocks: clonePhotonValue(
      removeDuplicatedPhotonSiteShellBlocks(pageBlocks, site)
    )
  };
  const nextRegions = Object.fromEntries(
    Object.entries(site.regions).map(([regionKey, region]) => {
      const regionBlocks = getPhotonSurfaceRegionBlocks(surfaceDocument, regionKey) ?? [];
      const fallbackDocument = region.document ?? createPhotonEmptyDocument(
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
            blocks: clonePhotonValue(regionBlocks)
          }
        }
      ];
    })
  );
  return {
    pageDocument,
    site: {
      settings: clonePhotonValue(site.settings),
      regions: nextRegions
    }
  };
};
var getPhotonSurfaceRegionBlocks = (document, regionKey) => {
  const block = document.blocks.find(
    (candidate) => isPhotonSurfaceRegionBlock(candidate, regionKey)
  );
  const area = block ? getPhotonSurfaceRegionArea(block) : null;
  return area ? area.blocks : null;
};
var getPhotonSurfaceRegionListId = (regionKey) => createPhotonAreaListId(
  createPhotonSurfaceRegionBlockId(regionKey),
  PHOTON_SURFACE_REGION_AREA_ID
);
var findFirstEditableBlockId = (blocks) => {
  for (const block of blocks) {
    if (isPhotonSurfaceRegionBlock(block)) {
      const area = getPhotonSurfaceRegionArea(block);
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
var getFirstPhotonSurfaceEditableBlockId = (document) => findFirstEditableBlockId(document.blocks);
var resolvePhotonSurfaceRegionFromBlocks = (blocks, blockId, listId, currentRegion) => {
  for (const block of blocks) {
    const nextRegion = isPhotonSurfaceRegionBlock(block) ? block.props.regionKey ?? currentRegion : currentRegion;
    if (block.id === blockId) {
      return nextRegion;
    }
    for (const area of block.areas ?? []) {
      const areaListId = createPhotonAreaListId(block.id, area.id);
      if (areaListId === listId) {
        return nextRegion;
      }
      const nested = resolvePhotonSurfaceRegionFromBlocks(
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
var resolvePhotonSurfaceRegionForBlockId = (document, blockId) => resolvePhotonSurfaceRegionFromBlocks(
  document.blocks,
  blockId,
  "__unknown__",
  null
);
var resolvePhotonSurfaceRegionForListId = (document, listId) => resolvePhotonSurfaceRegionFromBlocks(
  document.blocks,
  "__unknown__",
  listId,
  null
);

// src/helpers/installable.ts
var createPhotonKit = (kit) => kit;
var isPhotonInstallableKit = (entry) => "modules" in entry;
var resolvePhotonModules = (entries) => entries.flatMap(
  (entry) => isPhotonInstallableKit(entry) ? entry.modules : [entry]
);
var collectPhotonDocuments = (entries) => {
  const documents = {};
  for (const entry of entries) {
    if (!isPhotonInstallableKit(entry) || !entry.documents) {
      continue;
    }
    Object.assign(documents, entry.documents);
  }
  return documents;
};
var collectPhotonSiteFrameExtensions = (entries) => entries.flatMap(
  (entry) => isPhotonInstallableKit(entry) ? entry.siteFrameExtensions ?? [] : []
);
var collectPhotonAccountTabs = (entries) => entries.flatMap(
  (entry) => isPhotonInstallableKit(entry) ? entry.accountTabs ?? [] : []
);

// src/helpers/document.ts
var getPhotonDefinitionKey = (moduleName, blockType) => `${moduleName}::${blockType}`;
var createPhotonRegistry = (entries) => {
  const modules = resolvePhotonModules(entries);
  const definitions = /* @__PURE__ */ new Map();
  const bindingAdapters = /* @__PURE__ */ new Map();
  const pageSettingsPanels = [];
  const siteSettingsPanels = [];
  modules.forEach((moduleEntry) => {
    moduleEntry.blocks.forEach((definition) => {
      definitions.set(
        getPhotonDefinitionKey(moduleEntry.module, definition.type),
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
  pageSettingsPanels.sort((left, right) => {
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
  });
  siteSettingsPanels.sort(
    (left, right) => (left.order ?? 0) - (right.order ?? 0)
  );
  return {
    modules,
    definitions,
    bindingAdapters,
    pageSettingsPanels,
    siteSettingsPanels,
    getDefinition(moduleName, blockType) {
      return definitions.get(getPhotonDefinitionKey(moduleName, blockType));
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
          key: getPhotonDefinitionKey(moduleEntry.module, definition.type)
        }))
      );
    }
  };
};
var createPhotonLocalizedDefault = (values) => ({
  __wbLocalizedDefault: true,
  values
});
var registerPhotonFieldLocalization = (schema, mode, path) => {
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
var collectPhotonFieldLocalization = (field, schema, basePath, inheritedLocalization) => {
  const effectiveLocalization = field.localization ?? inheritedLocalization;
  const currentPath = field.path ? basePath ? `${basePath}.${field.path}` : field.path : basePath;
  if (field.kind === "object") {
    for (const nestedField of field.fields ?? []) {
      collectPhotonFieldLocalization(
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
      collectPhotonFieldLocalization(
        field.itemField,
        schema,
        repeaterBasePath,
        effectiveLocalization
      );
    }
    for (const nestedField of field.fields ?? []) {
      collectPhotonFieldLocalization(
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
      throw new Error("Photon form fields require a concrete path.");
    }
    for (const localizedPath of [
      "helpText",
      "label",
      "options.*.label",
      "placeholder"
    ]) {
      registerPhotonFieldLocalization(
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
      registerPhotonFieldLocalization(
        schema,
        "shared",
        `${currentPath}.*.${sharedPath}`
      );
    }
    return;
  }
  if (!currentPath) {
    throw new Error("Photon field localization requires a concrete path.");
  }
  if (!effectiveLocalization) {
    throw new Error(
      `Photon field "${currentPath}" is missing explicit localization metadata.`
    );
  }
  registerPhotonFieldLocalization(schema, effectiveLocalization, currentPath);
};
var createPhotonBlockLocalizationSchema = (fields) => {
  const schema = {
    localized: [],
    shared: []
  };
  for (const field of fields) {
    collectPhotonFieldLocalization(field, schema, "");
  }
  schema.localized.sort();
  schema.shared.sort();
  return schema;
};
var createPhotonLocalizationManifest = (modules) => Object.fromEntries(
  modules.flatMap(
    (moduleEntry) => moduleEntry.blocks.map((definition) => [
      getPhotonDefinitionKey(moduleEntry.module, definition.type),
      definition.localizationSchema ?? createPhotonBlockLocalizationSchema(definition.fields)
    ])
  )
);
var isPhotonLocalizedDefault = (value) => typeof value === "object" && value !== null && "__wbLocalizedDefault" in value && value.__wbLocalizedDefault === true && "values" in value;
var resolvePhotonLocalizedDefaultValue = (value, locale, defaultLocale) => {
  if (Array.isArray(value)) {
    return value.map(
      (item) => resolvePhotonLocalizedDefaultValue(item, locale, defaultLocale)
    );
  }
  if (isPhotonLocalizedDefault(value)) {
    return clonePhotonValue(
      value.values[locale] ?? value.values[defaultLocale] ?? Object.values(value.values)[0] ?? null
    );
  }
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        resolvePhotonLocalizedDefaultValue(item, locale, defaultLocale)
      ])
    );
  }
  return value;
};
var createPhotonBlock = (moduleName, definition, options) => {
  const locale = options?.locale?.trim().toLowerCase() || "en";
  const defaultLocale = options?.defaultLocale?.trim().toLowerCase() || "en";
  return {
    id: createPhotonNodeId(),
    module: moduleName,
    type: definition.type,
    props: resolvePhotonLocalizedDefaultValue(
      clonePhotonValue(definition.defaults),
      locale,
      defaultLocale
    ),
    bindings: clonePhotonValue(definition.bindings),
    areas: clonePhotonValue(definition.areas)
  };
};
var definePhotonBlockDefinition = (definition) => ({
  ...definition,
  localizationSchema: definition.localizationSchema ?? createPhotonBlockLocalizationSchema(definition.fields)
});
var movePhotonArrayItem = (items, fromIndex, toIndex) => {
  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
};
var getPhotonDocumentFingerprint = (document) => JSON.stringify({
  id: document.id,
  name: document.name,
  route: document.route,
  blocks: document.blocks
});

export {
  PHOTON_PAGE_SURFACE_REGION_KEY,
  resolvePhotonSurfaceRegionDescriptors,
  composePhotonSurfaceDocument,
  decomposePhotonSurfaceDocument,
  getPhotonSurfaceRegionBlocks,
  getPhotonSurfaceRegionListId,
  getFirstPhotonSurfaceEditableBlockId,
  resolvePhotonSurfaceRegionForBlockId,
  resolvePhotonSurfaceRegionForListId,
  createPhotonKit,
  isPhotonInstallableKit,
  resolvePhotonModules,
  collectPhotonDocuments,
  collectPhotonSiteFrameExtensions,
  collectPhotonAccountTabs,
  getPhotonDefinitionKey,
  createPhotonRegistry,
  createPhotonLocalizedDefault,
  createPhotonBlockLocalizationSchema,
  createPhotonLocalizationManifest,
  createPhotonBlock,
  definePhotonBlockDefinition,
  movePhotonArrayItem,
  getPhotonDocumentFingerprint
};
