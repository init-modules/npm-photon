// src/helpers/path.ts
var WEBSITE_BUILDER_EMPTY_TEXT = "Untitled";
var cloneWithFallback = (value) => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
};
var parsePathSegment = (segment) => {
  const numeric = Number(segment);
  return Number.isInteger(numeric) && segment.trim() !== "" ? numeric : segment;
};
var cloneWebsiteBuilderValue = (value) => {
  return cloneWithFallback(value);
};
var getValueAtPath = (target, path) => {
  if (!target || !path) {
    return target ?? null;
  }
  return path.split(".").reduce((current, segment) => {
    if (current === null || current === void 0) {
      return null;
    }
    const key = parsePathSegment(segment);
    if (Array.isArray(current) && typeof key === "number") {
      return current[key];
    }
    if (typeof current === "object" && key in current) {
      return current[key];
    }
    return null;
  }, target);
};
var setValueAtPath = (target, path, value) => {
  if (!path) {
    return cloneWebsiteBuilderValue(value);
  }
  const draft = cloneWithFallback(target);
  const segments = path.split(".").map(parsePathSegment);
  let cursor = draft;
  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index];
    const nextSegment = segments[index + 1];
    if (Array.isArray(cursor) && typeof segment === "number") {
      if (cursor[segment] === void 0 || cursor[segment] === null) {
        cursor[segment] = typeof nextSegment === "number" ? [] : {};
      }
      cursor = cursor[segment];
      continue;
    }
    const currentValue = cursor[segment];
    if (currentValue === void 0 || currentValue === null) {
      cursor[segment] = typeof nextSegment === "number" ? [] : {};
    }
    cursor = cursor[segment];
  }
  const lastSegment = segments.at(-1);
  if (Array.isArray(cursor) && typeof lastSegment === "number") {
    cursor[lastSegment] = value;
    return draft;
  }
  cursor[lastSegment] = value;
  return draft;
};

// src/helpers/workspace.ts
var DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF = {
  profileId: "default",
  branch: "main",
  readonly: false
};
var DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES = {
  canEdit: true,
  canCommit: true,
  canBranch: true,
  canMerge: true,
  canEditMain: true,
  isReadonlyRevision: false,
  isMainLocked: false
};
var normalizeWebsiteBuilderWorkspaceRef = (workspace) => {
  const normalizedWorkspace = {
    ...DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF,
    ...workspace ?? {}
  };
  if (normalizedWorkspace.revisionId?.trim()) {
    normalizedWorkspace.readonly = true;
  }
  return normalizedWorkspace;
};
var normalizeWebsiteBuilderWorkspaceCapabilities = (capabilities) => ({
  ...DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES,
  ...capabilities ?? {}
});
var normalizeWebsiteBuilderWorkspaceDescriptor = (workspace) => ({
  ref: normalizeWebsiteBuilderWorkspaceRef(workspace?.ref),
  headRevisionId: workspace?.headRevisionId ?? null,
  profileName: workspace?.profileName ?? null,
  branchLabel: workspace?.branchLabel ?? null,
  revisionLabel: workspace?.revisionLabel ?? null,
  readonlyReason: workspace?.readonlyReason ?? (workspace?.ref?.revisionId?.trim() ? "revision" : null)
});
var extractWebsiteBuilderWorkspaceRef = (workspace) => {
  if (!workspace) {
    return null;
  }
  return "ref" in workspace ? workspace.ref : workspace;
};
var getWebsiteBuilderWorkspaceKey = (workspace) => {
  const descriptor = workspace && "ref" in workspace ? normalizeWebsiteBuilderWorkspaceDescriptor(workspace) : {
    ref: normalizeWebsiteBuilderWorkspaceRef(
      extractWebsiteBuilderWorkspaceRef(workspace)
    ),
    headRevisionId: null,
    profileName: null,
    branchLabel: null,
    revisionLabel: null,
    readonlyReason: null
  };
  return [
    descriptor.ref.profileId,
    descriptor.ref.branch,
    descriptor.ref.revisionId?.trim() || "head",
    descriptor.ref.readonly ? "readonly" : "writable",
    descriptor.headRevisionId?.trim() || "unknown-head"
  ].join(":");
};
var getWebsiteBuilderWorkspaceIdentityKey = (workspace) => {
  const descriptor = workspace && "ref" in workspace ? normalizeWebsiteBuilderWorkspaceDescriptor(workspace) : {
    ref: normalizeWebsiteBuilderWorkspaceRef(
      extractWebsiteBuilderWorkspaceRef(workspace)
    ),
    headRevisionId: null,
    profileName: null,
    branchLabel: null,
    revisionLabel: null,
    readonlyReason: null
  };
  return [
    descriptor.ref.profileId,
    descriptor.ref.branch,
    descriptor.ref.revisionId?.trim() || "head"
  ].join(":");
};
var isWebsiteBuilderWorkspaceReadonly = (workspace, capabilities) => {
  const normalizedWorkspace = workspace && "ref" in workspace ? normalizeWebsiteBuilderWorkspaceDescriptor(workspace) : {
    ref: normalizeWebsiteBuilderWorkspaceRef(
      extractWebsiteBuilderWorkspaceRef(workspace)
    ),
    headRevisionId: null,
    profileName: null,
    branchLabel: null,
    revisionLabel: null,
    readonlyReason: null
  };
  const normalizedCapabilities = normalizeWebsiteBuilderWorkspaceCapabilities(capabilities);
  return Boolean(
    normalizedWorkspace.ref.readonly || normalizedCapabilities.isReadonlyRevision || !normalizedCapabilities.canEdit
  );
};
var canEditWebsiteBuilderWorkspace = (workspace, capabilities) => !isWebsiteBuilderWorkspaceReadonly(workspace, capabilities);
var canSaveWebsiteBuilderWorkspace = ({
  isAdmin,
  workspace,
  capabilities
}) => Boolean(
  isAdmin && !isWebsiteBuilderWorkspaceReadonly(workspace, capabilities) && normalizeWebsiteBuilderWorkspaceCapabilities(capabilities).canCommit
);

// src/helpers/tree.ts
var WEBSITE_BUILDER_ROOT_LIST_ID = "root";
var createWebsiteBuilderAreaListId = (blockId, areaId) => `area:${blockId}:${areaId}`;
var randomSegment = () => Math.random().toString(36).slice(2, 10);
var createWebsiteBuilderNodeId = () => `wb_${randomSegment()}`;
var cloneAreaTree = (areas) => {
  if (!areas?.length) {
    return void 0;
  }
  return areas.map((area) => ({
    id: area.id,
    label: area.label,
    blocks: area.blocks.map(cloneWebsiteBuilderBlockTreeWithNewIds)
  }));
};
var cloneWebsiteBuilderBlockTreeWithNewIds = (block) => ({
  id: createWebsiteBuilderNodeId(),
  module: block.module,
  type: block.type,
  props: cloneWebsiteBuilderValue(block.props),
  bindings: cloneWebsiteBuilderValue(block.bindings),
  areas: cloneAreaTree(block.areas)
});
var getFirstWebsiteBuilderBlockId = (blocks) => blocks[0]?.id ?? null;
var findWebsiteBuilderBlock = (blocks, blockId) => {
  for (const block of blocks) {
    if (block.id === blockId) {
      return block;
    }
    for (const area of block.areas ?? []) {
      const nested = findWebsiteBuilderBlock(area.blocks, blockId);
      if (nested) {
        return nested;
      }
    }
  }
  return null;
};
var updateBlocks = (blocks, blockId, updater) => {
  let updated = false;
  const nextBlocks = blocks.map((block) => {
    if (block.id === blockId) {
      updated = true;
      return updater(block);
    }
    if (!block.areas?.length) {
      return block;
    }
    let nestedUpdated = false;
    const nextAreas = block.areas.map((area) => {
      const result = updateBlocks(area.blocks, blockId, updater);
      if (!result.updated) {
        return area;
      }
      nestedUpdated = true;
      return {
        ...area,
        blocks: result.blocks
      };
    });
    if (!nestedUpdated) {
      return block;
    }
    updated = true;
    return {
      ...block,
      areas: nextAreas
    };
  });
  return {
    blocks: updated ? nextBlocks : blocks,
    updated
  };
};
var updateWebsiteBuilderBlockInDocument = (document, blockId, updater) => {
  const result = updateBlocks(document.blocks, blockId, updater);
  return result.updated ? {
    ...document,
    blocks: result.blocks
  } : document;
};
var removeBlockFromList = (blocks, blockId, listId) => {
  const targetIndex = blocks.findIndex((block) => block.id === blockId);
  if (targetIndex >= 0) {
    return {
      blocks: blocks.filter((block) => block.id !== blockId),
      removed: blocks[targetIndex] ?? null,
      sourceListId: listId,
      sourceIndex: targetIndex
    };
  }
  for (const block of blocks) {
    if (!block.areas?.length) {
      continue;
    }
    let areaChanged = false;
    const nextAreas = block.areas.map((area) => {
      const result = removeBlockFromList(
        area.blocks,
        blockId,
        createWebsiteBuilderAreaListId(block.id, area.id)
      );
      if (!result.removed) {
        return area;
      }
      areaChanged = true;
      return {
        ...area,
        blocks: result.blocks,
        __removed: result.removed,
        __sourceListId: result.sourceListId,
        __sourceIndex: result.sourceIndex
      };
    });
    if (!areaChanged) {
      continue;
    }
    const areaWithPayload = nextAreas.find(
      (area) => "__removed" in area
    );
    return {
      blocks: blocks.map(
        (candidate) => candidate.id === block.id ? {
          ...candidate,
          areas: nextAreas.map((area) => {
            const { __removed, __sourceListId, __sourceIndex, ...cleanArea } = area;
            return cleanArea;
          })
        } : candidate
      ),
      removed: areaWithPayload?.__removed ?? null,
      sourceListId: areaWithPayload?.__sourceListId ?? null,
      sourceIndex: areaWithPayload?.__sourceIndex ?? -1
    };
  }
  return {
    blocks,
    removed: null,
    sourceListId: null,
    sourceIndex: -1
  };
};
var insertIntoList = (blocks, block, index) => {
  const nextBlocks = [...blocks];
  const safeIndex = Math.min(Math.max(index, 0), nextBlocks.length);
  nextBlocks.splice(safeIndex, 0, block);
  return nextBlocks;
};
var insertIntoListTree = (blocks, listId, block, index) => {
  if (listId === WEBSITE_BUILDER_ROOT_LIST_ID) {
    return {
      blocks: insertIntoList(blocks, block, index),
      inserted: true
    };
  }
  let inserted = false;
  const nextBlocks = blocks.map((candidate) => {
    if (!candidate.areas?.length) {
      return candidate;
    }
    const nextAreas = candidate.areas.map((area) => {
      const areaListId = createWebsiteBuilderAreaListId(candidate.id, area.id);
      if (areaListId === listId) {
        inserted = true;
        return {
          ...area,
          blocks: insertIntoList(area.blocks, block, index)
        };
      }
      const result = insertIntoListTree(area.blocks, listId, block, index);
      if (!result.inserted) {
        return area;
      }
      inserted = true;
      return {
        ...area,
        blocks: result.blocks
      };
    });
    return inserted ? {
      ...candidate,
      areas: nextAreas
    } : candidate;
  });
  return {
    blocks: inserted ? nextBlocks : blocks,
    inserted
  };
};
var insertWebsiteBuilderBlockInDocument = (document, listId, block, index) => {
  const result = insertIntoListTree(document.blocks, listId, block, index);
  return result.inserted ? {
    ...document,
    blocks: result.blocks
  } : document;
};
var removeWebsiteBuilderBlockFromDocument = (document, blockId) => removeBlockFromList(document.blocks, blockId, WEBSITE_BUILDER_ROOT_LIST_ID);
var duplicateWebsiteBuilderBlockInDocument = (document, blockId) => {
  const target = findWebsiteBuilderBlock(document.blocks, blockId);
  if (!target) {
    return {
      document,
      duplicatedBlockId: null
    };
  }
  const removeResult = removeBlockFromList(
    document.blocks,
    blockId,
    WEBSITE_BUILDER_ROOT_LIST_ID
  );
  if (!removeResult.sourceListId || removeResult.sourceIndex < 0) {
    return {
      document,
      duplicatedBlockId: null
    };
  }
  const clone = cloneWebsiteBuilderBlockTreeWithNewIds(target);
  const nextDocument = insertWebsiteBuilderBlockInDocument(
    document,
    removeResult.sourceListId,
    clone,
    removeResult.sourceIndex + 1
  );
  return {
    document: nextDocument,
    duplicatedBlockId: clone.id
  };
};
var moveWebsiteBuilderBlockInDocument = (document, blockId, targetListId, targetIndex) => {
  const removal = removeBlockFromList(
    document.blocks,
    blockId,
    WEBSITE_BUILDER_ROOT_LIST_ID
  );
  if (!removal.removed || !removal.sourceListId || removal.sourceIndex < 0) {
    return document;
  }
  const targetLivesInsideRemovedTree = (block, listId) => {
    for (const area of block.areas ?? []) {
      if (createWebsiteBuilderAreaListId(block.id, area.id) === listId) {
        return true;
      }
      if (area.blocks.some((child) => targetLivesInsideRemovedTree(child, listId))) {
        return true;
      }
    }
    return false;
  };
  if (targetLivesInsideRemovedTree(removal.removed, targetListId)) {
    return document;
  }
  const adjustedIndex = removal.sourceListId === targetListId && removal.sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
  const nextDocument = insertWebsiteBuilderBlockInDocument(
    {
      ...document,
      blocks: removal.blocks
    },
    targetListId,
    removal.removed,
    adjustedIndex
  );
  return nextDocument;
};

// src/modules/system/site/site-design-presets.ts
var WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID = "aurora-current";
var createMarketingDemoComponentVariants = (variant) => ({
  "hero-spotlight": variant,
  "proof-strip": variant,
  "feature-grid": variant,
  "media-frame": variant,
  "media-gallery": variant,
  "rich-text": variant,
  "publication-spotlight": variant,
  "command-center-cta": variant,
  "marketing-demo/hero-spotlight": variant,
  "marketing-demo/proof-strip": variant,
  "marketing-demo/feature-grid": variant,
  "marketing-demo/media-frame": variant,
  "marketing-demo/media-gallery": variant,
  "marketing-demo/rich-text": variant,
  "marketing-demo/publication-spotlight": variant,
  "marketing-demo/command-center-cta": variant
});
var websiteBuilderSiteDesignPresets = [
  {
    id: WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID,
    label: "Aurora Current",
    appearance: "dark",
    description: "The current shipped look: glossy dark surfaces, roomy spacing, and display-led typography.",
    recommendedColorSchemeId: "midnight-aqua",
    designTokens: {
      bodyFontFamily: "var(--font-display, ui-sans-serif), system-ui, sans-serif",
      headingFontFamily: "var(--font-display, ui-sans-serif), system-ui, sans-serif",
      siteMaxWidth: "1280px",
      pageGutter: "24px",
      sectionGap: "32px",
      radius: "24px",
      headerOffset: "0px"
    },
    componentVariants: {
      siteShell: "aurora",
      hero: "aurora",
      featureGrid: "aurora",
      testimonials: "aurora",
      cta: "aurora",
      ...createMarketingDemoComponentVariants("default")
    }
  },
  {
    id: "paper-flow",
    label: "Paper Flow",
    appearance: "light",
    description: "A frameless editorial landing page with airy spacing, restrained typography, and sections that read as one continuous canvas.",
    recommendedColorSchemeId: "paper-sky",
    designTokens: {
      bodyFontFamily: "var(--font-body, 'Avenir Next', ui-sans-serif), system-ui, sans-serif",
      headingFontFamily: "'Iowan Old Style', 'Palatino Linotype', serif",
      siteMaxWidth: "1120px",
      pageGutter: "40px",
      sectionGap: "0px",
      radius: "0px",
      headerOffset: "0px"
    },
    componentVariants: {
      siteShell: "editorial",
      hero: "editorial",
      featureGrid: "stacked",
      testimonials: "quotes",
      cta: "ribbon",
      ...createMarketingDemoComponentVariants("air")
    }
  },
  {
    id: "init-landing",
    label: "Init Landing",
    appearance: "light",
    description: "A frameless warm landing layout matching the Init website hero, section rhythm, and neutral-first commercial presentation.",
    designTokens: {
      bodyFontFamily: "var(--font-body, 'Geist', ui-sans-serif), system-ui, sans-serif",
      headingFontFamily: "var(--font-body, 'Geist', ui-sans-serif), system-ui, sans-serif",
      backgroundColor: "#f8f3ed",
      surfaceColor: "#fffdf9",
      textColor: "#211916",
      mutedTextColor: "#6b5f59",
      accentColor: "#dc1f2f",
      borderColor: "#e6ddd4",
      siteMaxWidth: "1280px",
      pageGutter: "24px",
      sectionGap: "0px",
      radius: "0px",
      headerOffset: "0px"
    },
    componentVariants: {
      siteShell: "editorial",
      hero: "editorial",
      featureGrid: "stacked",
      testimonials: "quotes",
      cta: "ribbon",
      ...createMarketingDemoComponentVariants("air")
    }
  }
];
var siteDesignPresetMap = new Map(
  websiteBuilderSiteDesignPresets.map((preset) => [preset.id, preset])
);
var getWebsiteBuilderSiteDesignPreset = (id) => siteDesignPresetMap.get(id);

// src/modules/system/site/site-color-schemes.ts
var websiteBuilderSiteColorSchemes = [
  {
    id: "midnight-aqua",
    label: "Midnight Aqua",
    appearance: "dark",
    description: "Deep navy surfaces with crisp white type and a bright aqua accent.",
    colorTokens: {
      backgroundColor: "#081321",
      surfaceColor: "#0f1b2d",
      textColor: "#f8fbff",
      mutedTextColor: "#94a3b8",
      accentColor: "#14b8a6",
      borderColor: "rgba(148, 163, 184, 0.18)"
    }
  },
  {
    id: "ember-noir",
    label: "Ember Noir",
    appearance: "dark",
    description: "Warm charcoal foundations with copper accents for dramatic storytelling.",
    colorTokens: {
      backgroundColor: "#140d0b",
      surfaceColor: "#211613",
      textColor: "#fff7f2",
      mutedTextColor: "#d6b5a2",
      accentColor: "#f97316",
      borderColor: "rgba(249, 115, 22, 0.2)"
    }
  },
  {
    id: "neon-orchid",
    label: "Neon Orchid",
    appearance: "dark",
    description: "Inky violet foundations with electric pink highlights and cool supporting text.",
    colorTokens: {
      backgroundColor: "#110a1d",
      surfaceColor: "#1b102c",
      textColor: "#f7f1ff",
      mutedTextColor: "#b6a6d6",
      accentColor: "#f472b6",
      borderColor: "rgba(167, 139, 250, 0.22)"
    }
  },
  {
    id: "paper-sky",
    label: "Paper Sky",
    appearance: "light",
    description: "A clean editorial light scheme with cool grays and blue-green emphasis.",
    colorTokens: {
      backgroundColor: "#f5f8fc",
      surfaceColor: "#ffffff",
      textColor: "#0f172a",
      mutedTextColor: "#64748b",
      accentColor: "#0284c7",
      borderColor: "#d8e3ef"
    }
  },
  {
    id: "citrus-punch",
    label: "Citrus Punch",
    appearance: "light",
    description: "Sunlit neutrals with energetic coral accents for product-forward layouts.",
    colorTokens: {
      backgroundColor: "#fff9f2",
      surfaceColor: "#fffdf8",
      textColor: "#1f2937",
      mutedTextColor: "#7c6f64",
      accentColor: "#f97316",
      borderColor: "#f3ddcb"
    }
  },
  {
    id: "mint-ledger",
    label: "Mint Ledger",
    appearance: "light",
    description: "Soft mint highlights with grounded slate copy for calm, data-friendly surfaces.",
    colorTokens: {
      backgroundColor: "#f4fbf8",
      surfaceColor: "#ffffff",
      textColor: "#102a28",
      mutedTextColor: "#5d7c78",
      accentColor: "#0f766e",
      borderColor: "#d2ebe5"
    }
  }
];
var siteColorSchemeMap = new Map(
  websiteBuilderSiteColorSchemes.map((scheme) => [scheme.id, scheme])
);
var getWebsiteBuilderSiteColorScheme = (id) => siteColorSchemeMap.get(id);

// src/helpers/site-design.ts
var WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS = [
  "bodyFontFamily",
  "headingFontFamily",
  "backgroundColor",
  "surfaceColor",
  "textColor",
  "mutedTextColor",
  "accentColor",
  "borderColor",
  "siteMaxWidth",
  "pageGutter",
  "sectionGap",
  "radius",
  "headerOffset"
];
var WEBSITE_BUILDER_SITE_DESIGN_COLOR_TOKEN_KEYS = [
  "backgroundColor",
  "surfaceColor",
  "textColor",
  "mutedTextColor",
  "accentColor",
  "borderColor"
];
var WEBSITE_BUILDER_FRAMELESS_PRESET_IDS = /* @__PURE__ */ new Set([
  "paper-flow",
  "init-landing"
]);
var WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS = {
  bodyFontFamily: "var(--font-display, ui-sans-serif), system-ui, sans-serif",
  headingFontFamily: "var(--font-display, ui-sans-serif), system-ui, sans-serif",
  backgroundColor: "#081321",
  surfaceColor: "#0f1b2d",
  textColor: "#f8fbff",
  mutedTextColor: "#94a3b8",
  accentColor: "#14b8a6",
  borderColor: "rgba(148, 163, 184, 0.18)",
  siteMaxWidth: "1280px",
  pageGutter: "24px",
  sectionGap: "32px",
  radius: "24px",
  headerOffset: "0px"
};
var WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS = {
  bodyFontFamily: "ui-sans-serif, system-ui, sans-serif",
  headingFontFamily: "ui-sans-serif, system-ui, sans-serif",
  backgroundColor: "#f8fafc",
  surfaceColor: "#ffffff",
  textColor: "#0f172a",
  mutedTextColor: "#64748b",
  accentColor: "#0f766e",
  borderColor: "#dbe4ee",
  siteMaxWidth: "1280px",
  pageGutter: "24px",
  sectionGap: "32px",
  radius: "24px",
  headerOffset: "0px"
};
var asSiteDesignCandidate = (value) => typeof value === "object" && value !== null ? value : {};
var readNonEmptyString = (value) => typeof value === "string" && value.trim() !== "" ? value : void 0;
var matchesWebsiteBuilderSiteDesignDefaults = (left, right) => WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS.every((key) => left[key] === right[key]);
var hasAnyTokenOverride = (candidate, keys) => keys.some((key) => readNonEmptyString(candidate[key]) !== void 0);
var readTokenOverrides = (candidate, keys) => keys.reduce((result, key) => {
  const value = readNonEmptyString(candidate[key]);
  if (value !== void 0) {
    result[key] = value;
  }
  return result;
}, {});
var normalizeComponentVariants = (value) => {
  if (typeof value !== "object" || value === null) {
    return {};
  }
  return Object.entries(value).reduce((result, [key, candidateValue]) => {
    const normalizedValue = readNonEmptyString(candidateValue);
    if (key.trim() !== "" && normalizedValue !== void 0) {
      result[key] = normalizedValue;
    }
    return result;
  }, {});
};
var pickSiteDesignTokens = (value) => WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS.reduce(
  (result, key) => {
    result[key] = value[key];
    return result;
  },
  { ...WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS }
);
var createResolvedSettings = ({
  presetId,
  colorSchemeId,
  componentVariants,
  tokenOverrides
}) => {
  const preset = presetId ? getWebsiteBuilderSiteDesignPreset(presetId) : void 0;
  const colorScheme = colorSchemeId ? getWebsiteBuilderSiteColorScheme(colorSchemeId) : void 0;
  return {
    ...WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS,
    ...preset?.designTokens ?? {},
    ...colorScheme?.colorTokens ?? {},
    ...tokenOverrides ?? {},
    presetId: preset?.id,
    colorSchemeId: colorScheme?.id,
    componentVariants: {
      ...preset?.componentVariants ?? {},
      ...componentVariants ?? {}
    }
  };
};
var createFallbackResolvedSettings = ({
  componentVariants,
  tokenOverrides
} = {}) => createResolvedSettings({
  componentVariants,
  tokenOverrides: {
    ...WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS,
    ...tokenOverrides ?? {}
  }
});
var createWebsiteBuilderSiteDesignSettings = ({
  presetId,
  colorSchemeId,
  componentVariants,
  overrides
} = {}) => {
  const preset = presetId ? getWebsiteBuilderSiteDesignPreset(presetId) : void 0;
  return createResolvedSettings({
    presetId: preset?.id,
    colorSchemeId: colorSchemeId ?? preset?.recommendedColorSchemeId,
    componentVariants,
    tokenOverrides: overrides
  });
};
var isWebsiteBuilderFramelessPreset = (presetId) => typeof presetId === "string" && WEBSITE_BUILDER_FRAMELESS_PRESET_IDS.has(presetId);
var isWebsiteBuilderFramelessSiteDesign = (value) => isWebsiteBuilderFramelessPreset(
  resolveWebsiteBuilderSiteDesignSettings(value).presetId
);
var applyWebsiteBuilderSiteDesignPreset = (value, presetId) => {
  const currentSettings = resolveWebsiteBuilderSiteDesignSettings(value);
  const preset = getWebsiteBuilderSiteDesignPreset(presetId);
  const resolvedColorSchemeId = preset?.recommendedColorSchemeId ?? currentSettings.colorSchemeId;
  const rawComponentVariants = normalizeComponentVariants(
    asSiteDesignCandidate(value).componentVariants
  );
  const presetVariantKeys = new Set(Object.keys(preset?.componentVariants ?? {}));
  const preservedCustomVariants = Object.fromEntries(
    Object.entries(rawComponentVariants).filter(
      ([key]) => !presetVariantKeys.has(key)
    )
  );
  return createResolvedSettings({
    presetId: preset?.id ?? currentSettings.presetId,
    colorSchemeId: resolvedColorSchemeId,
    componentVariants: {
      ...preservedCustomVariants,
      ...preset?.componentVariants ?? {}
    }
  });
};
var isWebsiteBuilderSiteDesignPresetApplied = (settings, presetId) => {
  const preset = getWebsiteBuilderSiteDesignPreset(presetId);
  if (!preset) {
    return false;
  }
  const tokenMatches = Object.entries(preset.designTokens).every(
    ([key, value]) => settings[key] === value
  );
  const variantMatches = Object.entries(preset.componentVariants).every(
    ([key, value]) => settings.componentVariants[key] === value
  );
  const recommendedSchemeMatches = settings.colorSchemeId === preset.recommendedColorSchemeId;
  return tokenMatches && variantMatches && recommendedSchemeMatches;
};
var hasWebsiteBuilderSiteDesignPresetCustomization = (settings, presetId) => {
  const preset = getWebsiteBuilderSiteDesignPreset(presetId);
  return settings.presetId === preset?.id && !isWebsiteBuilderSiteDesignPresetApplied(settings, presetId);
};
var applyWebsiteBuilderSiteColorScheme = (value, colorSchemeId) => {
  const currentSettings = resolveWebsiteBuilderSiteDesignSettings(value);
  const colorScheme = getWebsiteBuilderSiteColorScheme(colorSchemeId);
  return createResolvedSettings({
    presetId: currentSettings.presetId,
    colorSchemeId: colorScheme?.id ?? currentSettings.colorSchemeId,
    componentVariants: currentSettings.componentVariants,
    tokenOverrides: {
      ...pickSiteDesignTokens(currentSettings),
      ...colorScheme?.colorTokens ?? {}
    }
  });
};
var resolveWebsiteBuilderSiteDesignSettings = (value) => {
  const candidate = asSiteDesignCandidate(value);
  const presetId = readNonEmptyString(candidate.presetId);
  const colorSchemeId = readNonEmptyString(candidate.colorSchemeId);
  const tokenOverrides = readTokenOverrides(
    candidate,
    WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS
  );
  const tokenOverrideSettings = {
    ...WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS,
    ...tokenOverrides
  };
  const componentVariants = normalizeComponentVariants(
    candidate.componentVariants
  );
  const hasTokenOverrides = hasAnyTokenOverride(
    candidate,
    WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS
  );
  const hasColorOverrides = hasAnyTokenOverride(
    candidate,
    WEBSITE_BUILDER_SITE_DESIGN_COLOR_TOKEN_KEYS
  );
  const hasComponentVariantOverrides = Object.keys(componentVariants).length > 0;
  const explicitPreset = presetId ? getWebsiteBuilderSiteDesignPreset(presetId) : void 0;
  const explicitColorScheme = colorSchemeId ? getWebsiteBuilderSiteColorScheme(colorSchemeId) : void 0;
  const isFallbackDesign = !explicitPreset && !explicitColorScheme && !hasComponentVariantOverrides && matchesWebsiteBuilderSiteDesignDefaults(
    tokenOverrideSettings,
    WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS
  );
  if (isFallbackDesign) {
    return createFallbackResolvedSettings({
      tokenOverrides
    });
  }
  return createResolvedSettings({
    presetId: explicitPreset?.id,
    colorSchemeId: explicitColorScheme?.id ?? explicitPreset?.recommendedColorSchemeId,
    componentVariants,
    tokenOverrides
  });
};

export {
  WEBSITE_BUILDER_EMPTY_TEXT,
  cloneWebsiteBuilderValue,
  getValueAtPath,
  setValueAtPath,
  DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF,
  DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES,
  normalizeWebsiteBuilderWorkspaceRef,
  normalizeWebsiteBuilderWorkspaceCapabilities,
  normalizeWebsiteBuilderWorkspaceDescriptor,
  getWebsiteBuilderWorkspaceKey,
  getWebsiteBuilderWorkspaceIdentityKey,
  isWebsiteBuilderWorkspaceReadonly,
  canEditWebsiteBuilderWorkspace,
  canSaveWebsiteBuilderWorkspace,
  WEBSITE_BUILDER_ROOT_LIST_ID,
  createWebsiteBuilderAreaListId,
  createWebsiteBuilderNodeId,
  cloneWebsiteBuilderBlockTreeWithNewIds,
  getFirstWebsiteBuilderBlockId,
  findWebsiteBuilderBlock,
  updateWebsiteBuilderBlockInDocument,
  insertWebsiteBuilderBlockInDocument,
  removeWebsiteBuilderBlockFromDocument,
  duplicateWebsiteBuilderBlockInDocument,
  moveWebsiteBuilderBlockInDocument,
  WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID,
  websiteBuilderSiteDesignPresets,
  getWebsiteBuilderSiteDesignPreset,
  websiteBuilderSiteColorSchemes,
  getWebsiteBuilderSiteColorScheme,
  WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS,
  WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS,
  createWebsiteBuilderSiteDesignSettings,
  isWebsiteBuilderFramelessPreset,
  isWebsiteBuilderFramelessSiteDesign,
  applyWebsiteBuilderSiteDesignPreset,
  isWebsiteBuilderSiteDesignPresetApplied,
  hasWebsiteBuilderSiteDesignPresetCustomization,
  applyWebsiteBuilderSiteColorScheme,
  resolveWebsiteBuilderSiteDesignSettings
};
