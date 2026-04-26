// src/helpers/path.ts
var PHOTON_EMPTY_TEXT = "Untitled";
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
var clonePhotonValue = (value) => {
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
    return clonePhotonValue(value);
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
var isRecord = (value) => typeof value === "object" && value !== null && !Array.isArray(value);

// src/helpers/action-policy.ts
var MAX_PLAN_DEPTH = 10;
var evaluateConditionExpression = (expr, evaluators, context) => {
  switch (expr.type) {
    case "ref": {
      const fn = evaluators[expr.conditionId];
      if (!fn) {
        return null;
      }
      const result = fn(context);
      if (result === void 0) {
        return null;
      }
      return result ?? null;
    }
    case "and": {
      let hasNull = false;
      for (const operand of expr.operands) {
        const r = evaluateConditionExpression(operand, evaluators, context);
        if (r === false) {
          return false;
        }
        if (r === null) {
          hasNull = true;
        }
      }
      return hasNull ? null : true;
    }
    case "or": {
      let hasNull = false;
      for (const operand of expr.operands) {
        const r = evaluateConditionExpression(operand, evaluators, context);
        if (r === true) {
          return true;
        }
        if (r === null) {
          hasNull = true;
        }
      }
      return hasNull ? null : false;
    }
    case "not": {
      const r = evaluateConditionExpression(expr.operand, evaluators, context);
      if (r === null) {
        return null;
      }
      return !r;
    }
    case "eq": {
      const parts = expr.path.split(".");
      let val = context;
      for (const part of parts) {
        if (val == null || typeof val !== "object") {
          return false;
        }
        val = val[part];
      }
      return val === expr.value;
    }
  }
};
var buildSteps = (actionInstanceId, ctx, depth) => {
  if (depth > MAX_PLAN_DEPTH) {
    ctx.warnings.push(`Max depth exceeded at action: ${actionInstanceId}`);
    return [];
  }
  if (ctx.visited.has(actionInstanceId)) {
    ctx.warnings.push(`Cycle detected at action: ${actionInstanceId}`);
    return [];
  }
  ctx.visited.add(actionInstanceId);
  const matching = ctx.policies.filter((p) => p.targetActionId === actionInstanceId).sort(
    (a, b) => (a.priority ?? 0) - (b.priority ?? 0) || a.packageName.localeCompare(b.packageName)
  );
  const result = [];
  for (const policy of matching) {
    const condResult = evaluateConditionExpression(
      policy.when,
      ctx.evaluators,
      ctx.conditionContext
    );
    if (condResult === false) {
      continue;
    }
    if (condResult === null && policy.securityMode === "fail-closed") {
      ctx.warnings.push(
        `fail-closed policy ${policy.id}: evaluator missing or unresolved`
      );
      continue;
    }
    const prereqSteps = buildSteps(policy.run, ctx, depth + 1);
    result.push(...prereqSteps, {
      actionInstanceId: policy.run,
      policyId: policy.id
    });
  }
  ctx.visited.delete(actionInstanceId);
  return result;
};
var buildActionPlan = (targetActionInstanceId, policies, evaluators, conditionContext) => {
  const ctx = {
    policies,
    evaluators,
    conditionContext,
    visited: /* @__PURE__ */ new Set(),
    warnings: []
  };
  const rawSteps = buildSteps(targetActionInstanceId, ctx, 0);
  const seen = /* @__PURE__ */ new Set();
  const dedupedSteps = [];
  for (const step of rawSteps) {
    if (seen.has(step.actionInstanceId)) {
      continue;
    }
    seen.add(step.actionInstanceId);
    dedupedSteps.push(step);
  }
  const hasCycles = ctx.warnings.some((w) => w.startsWith("Cycle detected"));
  return {
    targetActionInstanceId,
    steps: dedupedSteps,
    hasCycles,
    warnings: ctx.warnings
  };
};
var mapGuardsToActionPolicies = (guardInstances, _guardDefinitions, options) => guardInstances.filter((g) => g.enabled !== false).map((g) => {
  const presentation = g.action;
  let runId = options?.runActionInstanceId ?? "";
  if (!runId && presentation && presentation.type === "surface") {
    runId = presentation.surfaceInstanceId ?? "";
  }
  return {
    id: `bridge:guard:${g.id}`,
    packageName: "photon-bridge",
    targetActionId: options?.targetActionId ?? "",
    when: { type: "ref", conditionId: g.definitionId },
    run: runId,
    scope: "site",
    enforcement: "client-hint",
    securityMode: "fail-open"
  };
});

// src/helpers/workspace.ts
var DEFAULT_PHOTON_WORKSPACE_REF = {
  profileId: "default",
  branch: "main",
  readonly: false
};
var DEFAULT_PHOTON_WORKSPACE_CAPABILITIES = {
  canEdit: true,
  canCommit: true,
  canBranch: true,
  canMerge: true,
  canEditMain: true,
  isReadonlyRevision: false,
  isMainLocked: false
};
var normalizePhotonWorkspaceRef = (workspace) => {
  const normalizedWorkspace = {
    ...DEFAULT_PHOTON_WORKSPACE_REF,
    ...workspace ?? {}
  };
  if (normalizedWorkspace.revisionId?.trim()) {
    normalizedWorkspace.readonly = true;
  }
  return normalizedWorkspace;
};
var normalizePhotonWorkspaceCapabilities = (capabilities) => ({
  ...DEFAULT_PHOTON_WORKSPACE_CAPABILITIES,
  ...capabilities ?? {}
});
var normalizePhotonWorkspaceDescriptor = (workspace) => ({
  ref: normalizePhotonWorkspaceRef(workspace?.ref),
  headRevisionId: workspace?.headRevisionId ?? null,
  profileName: workspace?.profileName ?? null,
  branchLabel: workspace?.branchLabel ?? null,
  revisionLabel: workspace?.revisionLabel ?? null,
  readonlyReason: workspace?.readonlyReason ?? (workspace?.ref?.revisionId?.trim() ? "revision" : null)
});
var extractPhotonWorkspaceRef = (workspace) => {
  if (!workspace) {
    return null;
  }
  return "ref" in workspace ? workspace.ref : workspace;
};
var getPhotonWorkspaceKey = (workspace) => {
  const descriptor = workspace && "ref" in workspace ? normalizePhotonWorkspaceDescriptor(workspace) : {
    ref: normalizePhotonWorkspaceRef(
      extractPhotonWorkspaceRef(workspace)
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
var getPhotonWorkspaceIdentityKey = (workspace) => {
  const descriptor = workspace && "ref" in workspace ? normalizePhotonWorkspaceDescriptor(workspace) : {
    ref: normalizePhotonWorkspaceRef(
      extractPhotonWorkspaceRef(workspace)
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
var isPhotonWorkspaceReadonly = (workspace, capabilities) => {
  const normalizedWorkspace = workspace && "ref" in workspace ? normalizePhotonWorkspaceDescriptor(workspace) : {
    ref: normalizePhotonWorkspaceRef(
      extractPhotonWorkspaceRef(workspace)
    ),
    headRevisionId: null,
    profileName: null,
    branchLabel: null,
    revisionLabel: null,
    readonlyReason: null
  };
  const normalizedCapabilities = normalizePhotonWorkspaceCapabilities(capabilities);
  return Boolean(
    normalizedWorkspace.ref.readonly || normalizedCapabilities.isReadonlyRevision || !normalizedCapabilities.canEdit
  );
};
var canEditPhotonWorkspace = (workspace, capabilities) => !isPhotonWorkspaceReadonly(workspace, capabilities);
var canSavePhotonWorkspace = ({
  isAdmin,
  workspace,
  capabilities
}) => Boolean(
  isAdmin && !isPhotonWorkspaceReadonly(workspace, capabilities) && normalizePhotonWorkspaceCapabilities(capabilities).canCommit
);

// src/helpers/node-id.ts
var randomSegment = () => Math.random().toString(36).slice(2, 10);
var createPhotonNodeId = () => `photon_${randomSegment()}`;

// src/helpers/component-library.ts
var PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY = "componentLibrary";
var PHOTON_COMPONENT_REFERENCE_MODULE = "photon-system";
var PHOTON_COMPONENT_REFERENCE_TYPE = "component-reference";
var PHOTON_COMPONENT_REFERENCE_AREA_ID = "content";
var PHOTON_COMPONENT_REFERENCE_MAX_DEPTH = 8;
var COMPONENT_BLOCK_ID_PREFIX = "__photon_component_block__";
var normalizeItem = (key, item) => {
  const id = typeof item.id === "string" && item.id.trim() ? item.id : key;
  const label = typeof item.label === "string" && item.label.trim() ? item.label : id;
  const blocks = Array.isArray(item.blocks) ? item.blocks.filter(isRecord) : [];
  if (blocks.length === 0) {
    return null;
  }
  return {
    ...item,
    id,
    label,
    blocks
  };
};
var createItemId = (label) => {
  const slug = label.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
  return `component:${slug || "item"}:${Date.now().toString(36)}`;
};
var encodePart = (value) => encodeURIComponent(value);
var decodePart = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};
var readPhotonComponentLibrarySettings = (siteSettings) => {
  const rawSettings = siteSettings?.[PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY];
  if (!isRecord(rawSettings) || !isRecord(rawSettings.items)) {
    return {};
  }
  return {
    items: Object.fromEntries(
      Object.entries(rawSettings.items).map(([key, item]) => isRecord(item) ? normalizeItem(key, item) : null).filter((item) => Boolean(item)).map((item) => [item.id, item])
    )
  };
};
var getPhotonComponentLibraryItems = (siteSettings) => readPhotonComponentLibrarySettings(siteSettings).items ?? {};
var isPhotonComponentReferenceBlock = (block) => block.module === PHOTON_COMPONENT_REFERENCE_MODULE && block.type === PHOTON_COMPONENT_REFERENCE_TYPE && typeof block.props.itemId === "string" && block.props.itemId.trim() !== "";
var createPhotonComponentReferenceBlock = (item) => ({
  id: createPhotonNodeId(),
  module: PHOTON_COMPONENT_REFERENCE_MODULE,
  type: PHOTON_COMPONENT_REFERENCE_TYPE,
  props: {
    itemId: item.id,
    label: item.label
  }
});
var parsePhotonComponentLibraryBlockId = (blockId) => {
  if (!blockId.startsWith(`${COMPONENT_BLOCK_ID_PREFIX}:`)) {
    return null;
  }
  const [, itemId, referenceBlockId, sourceBlockId] = blockId.split(":");
  if (!itemId || !referenceBlockId || !sourceBlockId) {
    return null;
  }
  return {
    itemId: decodePart(itemId),
    referenceBlockId: decodePart(referenceBlockId),
    sourceBlockId: decodePart(sourceBlockId)
  };
};
var createPhotonComponentLibraryBlockId = ({
  itemId,
  referenceBlockId,
  sourceBlockId
}) => [
  COMPONENT_BLOCK_ID_PREFIX,
  encodePart(itemId),
  encodePart(referenceBlockId),
  encodePart(sourceBlockId)
].join(":");
var remapAreas = (areas, itemId, referenceBlockId) => {
  if (!areas?.length) {
    return void 0;
  }
  return areas.map((area) => ({
    ...area,
    blocks: area.blocks.map(
      (block) => remapPhotonComponentLibraryBlock(block, itemId, referenceBlockId)
    )
  }));
};
var remapPhotonComponentLibraryBlock = (block, itemId, referenceBlockId) => ({
  ...clonePhotonValue(block),
  id: createPhotonComponentLibraryBlockId({
    itemId,
    referenceBlockId,
    sourceBlockId: block.id
  }),
  areas: remapAreas(block.areas, itemId, referenceBlockId)
});
var resolvePhotonComponentReferenceBlocks = ({
  block,
  siteSettings,
  stack = []
}) => {
  const itemId = block.props.itemId;
  const item = getPhotonComponentLibraryItems(siteSettings)[itemId];
  if (!item || item.enabled === false || stack.includes(item.id) || stack.length >= PHOTON_COMPONENT_REFERENCE_MAX_DEPTH) {
    return [];
  }
  return item.blocks.map(
    (sourceBlock) => remapPhotonComponentLibraryBlock(sourceBlock, item.id, block.id)
  );
};
var clonePhotonComponentLibraryBlocksForCopy = (item) => item.blocks.map(clonePhotonComponentSourceBlockWithNewIds);
var clonePhotonComponentSourceBlockWithNewIds = (block) => ({
  id: createPhotonNodeId(),
  module: block.module,
  type: block.type,
  props: clonePhotonValue(block.props),
  bindings: clonePhotonValue(block.bindings),
  areas: block.areas?.map((area) => ({
    id: area.id,
    label: area.label,
    blocks: area.blocks.map(clonePhotonComponentSourceBlockWithNewIds)
  }))
});
var createPhotonComponentLibraryItemFromBlock = (block, label) => {
  const resolvedLabel = label?.trim() || block.type;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  return {
    id: createItemId(resolvedLabel),
    label: resolvedLabel,
    blocks: [clonePhotonComponentSourceBlockWithNewIds(block)],
    createdAt: now,
    updatedAt: now
  };
};
var duplicatePhotonComponentLibraryItem = (item) => {
  const label = `${item.label} copy`;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  return {
    ...clonePhotonValue(item),
    id: createItemId(label),
    label,
    blocks: clonePhotonComponentLibraryBlocksForCopy(item),
    createdAt: now,
    updatedAt: now
  };
};
var collectUsagesFromBlocks = (blocks, path, source, regionKey) => blocks.flatMap((block, index) => {
  const blockPath = `${path}.${index}`;
  const surfaceRegionKey = block.module === "__photon_internal__" && block.type === "surface-region" && typeof block.props.regionKey === "string" ? block.props.regionKey : null;
  const nextRegionKey = surfaceRegionKey ?? regionKey;
  const nextSource = source === "currentDocument" && surfaceRegionKey && surfaceRegionKey !== "page" ? "siteFrame" : source;
  const ownUsage = isPhotonComponentReferenceBlock(block) ? [
    {
      itemId: block.props.itemId,
      referenceBlockId: block.id,
      regionKey: nextRegionKey,
      path: blockPath,
      source: nextSource
    }
  ] : [];
  const nestedUsages = (block.areas ?? []).flatMap(
    (area) => collectUsagesFromBlocks(
      area.blocks,
      `${blockPath}.areas.${area.id}.blocks`,
      nextSource,
      nextRegionKey
    )
  );
  return [...ownUsage, ...nestedUsages];
});
var collectPhotonComponentLibraryUsages = (document, source = "currentDocument") => collectUsagesFromBlocks(document.blocks, "blocks", source);

// src/helpers/interaction-surfaces.ts
var PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY = "interactionSurfaces";
var byOrderThenLabel = (left, right) => (left.order ?? 0) - (right.order ?? 0) || left.label.localeCompare(right.label);
var normalizeRecordMap = (value, normalizeEntry) => {
  if (!isRecord(value)) {
    return {};
  }
  const entries = [];
  for (const [key, item] of Object.entries(value)) {
    if (!isRecord(item)) {
      continue;
    }
    entries.push(normalizeEntry(key, item));
  }
  return Object.fromEntries(entries);
};
var normalizeIdRecord = (key, item) => {
  const id = typeof item.id === "string" && item.id.trim() ? item.id : key;
  return [id, { ...item, id }];
};
var normalizeIntentRecord = (key, item) => {
  const intent = typeof item.intent === "string" && item.intent.trim() ? item.intent : key;
  return [
    intent,
    {
      ...item,
      intent
    }
  ];
};
var mergeRecords = (base, override) => {
  if (!base && !override) {
    return void 0;
  }
  return {
    ...base ?? {},
    ...override ?? {}
  };
};
var mergeInstanceMap = (defaults, persisted) => {
  const merged = Object.fromEntries(
    defaults.map((instance) => [instance.id, instance])
  );
  for (const [id, instance] of Object.entries(persisted ?? {})) {
    const base = merged[id];
    merged[id] = {
      ...base ?? {},
      ...instance,
      id,
      props: mergeRecords(base?.props, instance.props)
    };
  }
  return merged;
};
var mergeIntentMap = (defaults, persisted) => {
  const merged = Object.fromEntries(
    defaults.map((intent) => [intent.intent, intent])
  );
  for (const [intent, binding] of Object.entries(persisted ?? {})) {
    const base = merged[intent];
    merged[intent] = {
      ...base ?? {},
      ...binding,
      intent,
      overrides: mergeRecords(base?.overrides, binding.overrides),
      payload: mergeRecords(base?.payload, binding.payload)
    };
  }
  return merged;
};
var mergeToastTemplateMap = (defaults, persisted) => {
  const merged = Object.fromEntries(
    defaults.map((template) => [template.id, template])
  );
  for (const [id, template] of Object.entries(persisted ?? {})) {
    const base = merged[id];
    merged[id] = {
      ...base ?? {},
      ...template,
      id,
      props: mergeRecords(base?.props, template.props)
    };
  }
  return merged;
};
var createPhotonInteractionSurfaceDefinition = (definition) => definition;
var createPhotonActionValue = (action) => action;
var readPhotonInteractionSurfaceSettings = (siteSettings) => {
  const rawSettings = siteSettings?.[PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY];
  if (!isRecord(rawSettings)) {
    return {};
  }
  return {
    instances: normalizeRecordMap(
      rawSettings.instances,
      normalizeIdRecord
    ),
    intents: normalizeRecordMap(
      rawSettings.intents,
      normalizeIntentRecord
    ),
    toastTemplates: normalizeRecordMap(
      rawSettings.toastTemplates,
      normalizeIdRecord
    )
  };
};
var resolvePhotonInteractionSurfaceCatalog = ({
  definitions,
  siteSettings
}) => {
  const sortedDefinitions = [...definitions ?? []].sort(byOrderThenLabel);
  const definitionsById = new Map(
    sortedDefinitions.map((definition) => [definition.id, definition])
  );
  const persistedSettings = readPhotonInteractionSurfaceSettings(siteSettings);
  const defaultInstances = sortedDefinitions.flatMap(
    (definition) => definition.defaultInstances ?? []
  );
  const defaultIntents = sortedDefinitions.flatMap(
    (definition) => definition.defaultIntentBindings ?? []
  );
  const defaultToastTemplates = sortedDefinitions.flatMap(
    (definition) => definition.defaultToastTemplates ?? []
  );
  return {
    definitions: sortedDefinitions,
    definitionsById,
    instances: mergeInstanceMap(defaultInstances, persistedSettings.instances),
    intents: mergeIntentMap(defaultIntents, persistedSettings.intents),
    toastTemplates: mergeToastTemplateMap(
      defaultToastTemplates,
      persistedSettings.toastTemplates
    )
  };
};
var resolvePhotonInteractionSurfaceRequest = (trigger, catalog) => {
  const intent = trigger.intent ? catalog.intents[trigger.intent] : void 0;
  if (intent?.enabled === false) {
    return null;
  }
  const instanceId = trigger.surfaceInstanceId ?? intent?.surfaceInstanceId;
  const instance = instanceId ? catalog.instances[instanceId] : void 0;
  if (!instance || instance.enabled === false) {
    return null;
  }
  const definition = catalog.definitionsById.get(instance.definitionId);
  if (!definition) {
    return null;
  }
  return {
    definition,
    instance,
    trigger,
    props: mergeRecords(instance.props, intent?.overrides) ?? {},
    payload: mergeRecords(intent?.payload, trigger.payload) ?? {},
    fallbackHref: trigger.fallbackHref,
    ...trigger.overrides ? {
      props: {
        ...mergeRecords(instance.props, intent?.overrides) ?? {},
        ...trigger.overrides
      }
    } : {}
  };
};
var resolvePhotonInteractionToastTemplate = (input, catalog) => {
  const template = catalog.toastTemplates[input.templateId];
  if (!template || template.enabled === false) {
    return null;
  }
  return {
    ...template,
    ...input.overrides ?? {},
    props: {
      ...template.props ?? {},
      ...input.overrides?.props ?? {}
    }
  };
};

// src/helpers/override-resolution.ts
var PHOTON_CASCADE_SCOPE_ORDER = {
  "package-default": 1,
  site: 2,
  locale: 3,
  "route-family": 4,
  "route-context": 5,
  page: 6,
  component: 7,
  "action-flow": 8,
  "workspace-draft": 9,
  workspace: 9,
  "user-session": 10
};
var comparePhotonCascadable = (a, b) => {
  const scopeDiff = PHOTON_CASCADE_SCOPE_ORDER[b.scope] - PHOTON_CASCADE_SCOPE_ORDER[a.scope];
  if (scopeDiff !== 0) {
    return scopeDiff;
  }
  const priorityDiff = (b.priority ?? 0) - (a.priority ?? 0);
  if (priorityDiff !== 0) {
    return priorityDiff;
  }
  return a.packageName.localeCompare(b.packageName);
};
var sortPhotonCascade = (items) => [...items].sort(comparePhotonCascadable);
var dedupePhotonCascadeBy = (items, getKey) => {
  const sorted = sortPhotonCascade(items);
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  for (const item of sorted) {
    const key = getKey(item);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(item);
  }
  return result;
};
var detectPhotonCascadeConflicts = (items, getKey) => {
  const buckets = /* @__PURE__ */ new Map();
  for (const item of items) {
    const key = getKey(item);
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.push(item);
    } else {
      buckets.set(key, [item]);
    }
  }
  const conflicts = [];
  for (const [key, bucket] of buckets) {
    if (bucket.length < 2) {
      continue;
    }
    const sorted = sortPhotonCascade(bucket);
    const winner = sorted[0];
    const losers = sorted.slice(1).filter(
      (item) => PHOTON_CASCADE_SCOPE_ORDER[item.scope] === PHOTON_CASCADE_SCOPE_ORDER[winner.scope] && (item.priority ?? 0) === (winner.priority ?? 0) && item.packageName !== winner.packageName
    );
    if (losers.length > 0) {
      conflicts.push({ key, winner, losers });
    }
  }
  return conflicts;
};
var resolvePolicyCascade = (policies) => sortPhotonCascade(policies);
var dedupePoliciesById = (policies) => dedupePhotonCascadeBy(policies, (p) => p.id);

// src/helpers/interactions.ts
var PHOTON_INTERACTIONS_SITE_SETTING_KEY = "interactions";
var normalizeRecordMap2 = (value) => {
  if (!isRecord(value)) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(value).filter(
      (entry) => isRecord(entry[1])
    ).map(([key, item]) => {
      const id = typeof item.id === "string" && item.id.trim() ? item.id : key;
      return [id, { ...item, id }];
    })
  );
};
var normalizeTriggerBindings = (value) => {
  if (!isRecord(value)) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(value).filter(
      (entry) => isRecord(entry[1])
    ).map(([key, item]) => {
      const slotId = typeof item.slotId === "string" && item.slotId.trim() ? item.slotId : key;
      return [slotId, { ...item, slotId }];
    })
  );
};
var byOrderThenLabel2 = (left, right) => (left.order ?? 0) - (right.order ?? 0) || (left.label ?? left.id ?? "").localeCompare(right.label ?? right.id ?? "");
var mergeRecords2 = (base, override) => {
  if (!base && !override) {
    return void 0;
  }
  return {
    ...base ?? {},
    ...override ?? {}
  };
};
var mergeActionInstances = (defaults, persisted) => {
  const merged = Object.fromEntries(defaults.map((item) => [item.id, item]));
  for (const [id, item] of Object.entries(persisted ?? {})) {
    const base = merged[id];
    merged[id] = {
      ...base ?? {},
      ...item,
      id,
      props: mergeRecords2(base?.props, item.props),
      presentation: {
        ...base?.presentation ?? {},
        ...item.presentation
      }
    };
  }
  return merged;
};
var mergeGuardInstances = (defaults, persisted) => {
  const merged = Object.fromEntries(defaults.map((item) => [item.id, item]));
  for (const [id, item] of Object.entries(persisted ?? {})) {
    const base = merged[id];
    merged[id] = {
      ...base ?? {},
      ...item,
      id,
      props: mergeRecords2(base?.props, item.props),
      action: base?.action || item.action ? {
        ...base?.action ?? {},
        ...item.action ?? {}
      } : void 0
    };
  }
  return merged;
};
var createSurfaceBackedActionDefinitions = (surfaces, siteSettings) => (() => {
  const surfaceCatalog = resolvePhotonInteractionSurfaceCatalog({
    definitions: surfaces ?? [],
    siteSettings
  });
  return (surfaces ?? []).filter((definition) => definition.kind !== "toast").map((definition) => ({
    id: `${definition.id}.action`,
    label: definition.label,
    labelKey: definition.labelKey,
    description: definition.description,
    descriptionKey: definition.descriptionKey,
    order: definition.order,
    fields: definition.fields,
    defaultInstances: Object.values(surfaceCatalog.instances).filter((instance) => instance.definitionId === definition.id).map((instance) => ({
      id: instance.id,
      definitionId: `${definition.id}.action`,
      label: instance.label,
      labelKey: instance.labelKey,
      enabled: instance.enabled,
      props: instance.props,
      presentation: {
        type: "surface",
        surfaceInstanceId: instance.id
      }
    }))
  }));
})();
var createPhotonInteractionActionDefinition = (definition) => definition;
var createPhotonInteractionGuardDefinition = (definition) => definition;
var createPhotonInteractionTriggerSlot = (slot) => slot;
var resolvePhotonBlockInteractionSlots = (definition, context) => {
  const slots = definition?.interactionSlots;
  if (!slots) {
    return [];
  }
  return typeof slots === "function" ? slots(context) : slots;
};
var readPhotonInteractionSettings = (siteSettings) => {
  const rawSettings = siteSettings?.[PHOTON_INTERACTIONS_SITE_SETTING_KEY];
  if (!isRecord(rawSettings)) {
    return {};
  }
  return {
    actionInstances: normalizeRecordMap2(
      rawSettings.actionInstances
    ),
    triggerBindings: normalizeTriggerBindings(rawSettings.triggerBindings),
    guardInstances: normalizeRecordMap2(
      rawSettings.guardInstances
    ),
    policies: normalizeRecordMap2(rawSettings.policies),
    canvasStageOverrides: isRecord(rawSettings.canvasStageOverrides) ? rawSettings.canvasStageOverrides : void 0
  };
};
var resolvePhotonInteractionActionCatalog = ({
  actions,
  guards,
  surfaces,
  policies,
  siteSettings
}) => {
  const persisted = readPhotonInteractionSettings(siteSettings);
  const sortedActions = [
    ...createSurfaceBackedActionDefinitions(surfaces, siteSettings),
    ...actions ?? []
  ].sort(byOrderThenLabel2);
  const sortedGuards = [...guards ?? []].sort(byOrderThenLabel2);
  const actionsById = new Map(
    sortedActions.map((definition) => [definition.id, definition])
  );
  const guardsById = new Map(
    sortedGuards.map((definition) => [definition.id, definition])
  );
  const allPolicies = dedupePoliciesById([
    ...policies ?? [],
    ...Object.values(persisted.policies ?? {})
  ]);
  const policiesById = new Map(allPolicies.map((p) => [p.id, p]));
  return {
    actions: sortedActions,
    actionsById,
    actionInstances: mergeActionInstances(
      sortedActions.flatMap((definition) => definition.defaultInstances ?? []),
      persisted.actionInstances
    ),
    guards: sortedGuards,
    guardsById,
    guardInstances: mergeGuardInstances(
      sortedGuards.flatMap((definition) => definition.defaultInstances ?? []),
      persisted.guardInstances
    ),
    triggerBindings: persisted.triggerBindings ?? {},
    policies: allPolicies,
    policiesById
  };
};
var resolvePhotonInteractionSlotAction = (slot, catalog) => {
  const binding = catalog.triggerBindings[slot.id];
  if (binding?.enabled === false) {
    return null;
  }
  const actionInstanceId = binding?.actionInstanceId ?? slot.actionInstanceId ?? void 0;
  const actionInstance = actionInstanceId ? catalog.actionInstances[actionInstanceId] : void 0;
  const presentation = actionInstance?.presentation ?? slot.action;
  if (!presentation || actionInstance?.enabled === false) {
    return null;
  }
  if (presentation.type !== "surface" || !binding?.overrides) {
    return presentation;
  }
  return {
    ...presentation,
    overrides: {
      ...presentation.overrides ?? {},
      ...binding.overrides
    }
  };
};
var resolvePhotonInteractionSlotGuards = (slot, catalog) => {
  const binding = catalog.triggerBindings[slot.id];
  const guardIds = binding?.guardInstanceIds ?? slot.guardInstanceIds ?? [];
  return guardIds.map((id) => catalog.guardInstances[id]).filter(
    (guard) => Boolean(guard && guard.enabled !== false)
  );
};
var createPhotonInteractionExecutionResult = (result) => result;
var photonInteractionExecutionSucceeded = (result) => result.executed;
var followInteractionFallback = (fallbackHref, handlers) => {
  if (!fallbackHref) {
    return false;
  }
  if (handlers.navigate) {
    void handlers.navigate(fallbackHref);
  } else if (typeof window !== "undefined") {
    window.location.assign(fallbackHref);
  } else {
    return false;
  }
  return true;
};
var executePhotonInteractionActionPresentation = (action, handlers) => {
  if (!action) {
    return {
      status: "missing-action",
      executed: false,
      action: null
    };
  }
  if (action.type === "surface") {
    const opened = handlers.openInteractionSurface(action);
    if (opened) {
      return {
        status: "executed",
        executed: true,
        action
      };
    }
    if (followInteractionFallback(action.fallbackHref, handlers)) {
      return {
        status: "fallback",
        executed: true,
        action,
        fallbackHref: action.fallbackHref
      };
    }
    return {
      status: "missing-renderer",
      executed: false,
      action,
      fallbackHref: action.fallbackHref
    };
  }
  if (action.type === "toast") {
    const shown = handlers.showInteractionToast({
      templateId: action.templateId,
      overrides: action.overrides
    });
    return {
      status: shown ? "executed" : "missing-action",
      executed: shown,
      action
    };
  }
  if (handlers.navigate) {
    void handlers.navigate(action.href);
  } else if (typeof window !== "undefined") {
    window.location.assign(action.href);
  } else {
    return {
      status: "missing-action",
      executed: false,
      action,
      fallbackHref: action.href
    };
  }
  return {
    status: "executed",
    executed: true,
    action
  };
};
var normalizeGuardEvaluationResult = (result, guard) => {
  if (result === false) {
    return {
      status: "blocked",
      action: guard.action
    };
  }
  if (result && typeof result === "object") {
    return result;
  }
  return {
    status: "allowed"
  };
};
var evaluatePhotonInteractionGuards = ({
  guards,
  evaluators,
  context
}) => {
  for (const guard of guards) {
    const definition = context.catalog.guardsById.get(guard.definitionId);
    const evaluator = evaluators?.[guard.definitionId];
    if (!evaluator) {
      if (definition?.missingEvaluatorPolicy === "allow") {
        continue;
      }
      return {
        status: "blocked",
        reason: "missing-evaluator",
        action: guard.action
      };
    }
    const result = normalizeGuardEvaluationResult(
      evaluator({
        ...context,
        guard,
        definition
      }),
      guard
    );
    if (result.status === "blocked") {
      return {
        ...result,
        action: result.action ?? guard.action
      };
    }
  }
  return {
    status: "allowed"
  };
};
var planPhotonInteractionTriggerSlot = ({
  slot,
  catalog,
  conditionEvaluators,
  conditionContext
}) => {
  const binding = catalog.triggerBindings[slot.id];
  const targetActionInstanceId = binding?.actionInstanceId ?? slot.actionInstanceId;
  if (!targetActionInstanceId || !conditionEvaluators || !conditionContext) {
    return null;
  }
  const slotGuards = resolvePhotonInteractionSlotGuards(slot, catalog);
  const bridgePolicies = slotGuards.length ? mapGuardsToActionPolicies(slotGuards, catalog.guards, {
    targetActionId: targetActionInstanceId
  }) : [];
  return buildActionPlan(
    targetActionInstanceId,
    [...catalog.policies, ...bridgePolicies],
    conditionEvaluators,
    conditionContext
  );
};
var resolvePlanStepPresentation = (stepActionInstanceId, catalog) => catalog.actionInstances[stepActionInstanceId]?.presentation;
var executePhotonInteractionTriggerSlot = ({
  slot,
  catalog,
  evaluators,
  conditionEvaluators,
  conditionContext,
  context,
  handlers
}) => {
  const action = resolvePhotonInteractionSlotAction(slot, catalog);
  const guards = resolvePhotonInteractionSlotGuards(slot, catalog);
  const guardResult = evaluatePhotonInteractionGuards({
    guards,
    evaluators,
    context: {
      ...context,
      slot,
      action,
      catalog
    }
  });
  if (guardResult.status === "blocked") {
    const fallbackAction = guardResult.action ?? (action?.type === "surface" && action.fallbackHref ? {
      type: "link",
      href: action.fallbackHref
    } : void 0);
    const execution = executePhotonInteractionActionPresentation(
      fallbackAction,
      handlers
    );
    return {
      ...execution,
      status: guardResult.reason === "missing-evaluator" ? "missing-evaluator" : "blocked",
      reason: guardResult.reason,
      action: fallbackAction ?? null
    };
  }
  const plan = planPhotonInteractionTriggerSlot({
    slot,
    catalog,
    conditionEvaluators,
    conditionContext
  });
  if (plan) {
    const failClosedWarning = plan.warnings.find(
      (warning) => warning.startsWith("fail-closed")
    );
    if (failClosedWarning) {
      return {
        status: "blocked",
        executed: false,
        reason: "missing-evaluator",
        action: null
      };
    }
    if (plan.hasCycles) {
      return {
        status: "blocked",
        executed: false,
        reason: "cycle-detected",
        action: null
      };
    }
    if (plan.steps.length > 0 && action) {
      const firstStep = plan.steps[0];
      const stepAction = resolvePlanStepPresentation(
        firstStep.actionInstanceId,
        catalog
      );
      if (stepAction) {
        const execution = executePhotonInteractionActionPresentation(
          stepAction,
          handlers
        );
        return {
          ...execution,
          status: "prerequisite-required",
          reason: `policy:${firstStep.policyId}`,
          action: stepAction,
          plan: {
            targetAction: action,
            targetActionInstanceId: plan.targetActionInstanceId,
            previousStepCount: plan.steps.length
          }
        };
      }
    }
  }
  return executePhotonInteractionActionPresentation(action, handlers);
};

export {
  PHOTON_EMPTY_TEXT,
  clonePhotonValue,
  getValueAtPath,
  setValueAtPath,
  isRecord,
  evaluateConditionExpression,
  buildActionPlan,
  mapGuardsToActionPolicies,
  DEFAULT_PHOTON_WORKSPACE_REF,
  DEFAULT_PHOTON_WORKSPACE_CAPABILITIES,
  normalizePhotonWorkspaceRef,
  normalizePhotonWorkspaceCapabilities,
  normalizePhotonWorkspaceDescriptor,
  getPhotonWorkspaceKey,
  getPhotonWorkspaceIdentityKey,
  isPhotonWorkspaceReadonly,
  canEditPhotonWorkspace,
  canSavePhotonWorkspace,
  createPhotonNodeId,
  PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY,
  PHOTON_COMPONENT_REFERENCE_MODULE,
  PHOTON_COMPONENT_REFERENCE_TYPE,
  PHOTON_COMPONENT_REFERENCE_AREA_ID,
  PHOTON_COMPONENT_REFERENCE_MAX_DEPTH,
  readPhotonComponentLibrarySettings,
  getPhotonComponentLibraryItems,
  isPhotonComponentReferenceBlock,
  createPhotonComponentReferenceBlock,
  parsePhotonComponentLibraryBlockId,
  createPhotonComponentLibraryBlockId,
  remapPhotonComponentLibraryBlock,
  resolvePhotonComponentReferenceBlocks,
  clonePhotonComponentLibraryBlocksForCopy,
  clonePhotonComponentSourceBlockWithNewIds,
  createPhotonComponentLibraryItemFromBlock,
  duplicatePhotonComponentLibraryItem,
  collectPhotonComponentLibraryUsages,
  PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY,
  createPhotonInteractionSurfaceDefinition,
  createPhotonActionValue,
  readPhotonInteractionSurfaceSettings,
  resolvePhotonInteractionSurfaceCatalog,
  resolvePhotonInteractionSurfaceRequest,
  resolvePhotonInteractionToastTemplate,
  PHOTON_CASCADE_SCOPE_ORDER,
  comparePhotonCascadable,
  sortPhotonCascade,
  dedupePhotonCascadeBy,
  detectPhotonCascadeConflicts,
  resolvePolicyCascade,
  dedupePoliciesById,
  PHOTON_INTERACTIONS_SITE_SETTING_KEY,
  createPhotonInteractionActionDefinition,
  createPhotonInteractionGuardDefinition,
  createPhotonInteractionTriggerSlot,
  resolvePhotonBlockInteractionSlots,
  readPhotonInteractionSettings,
  resolvePhotonInteractionActionCatalog,
  resolvePhotonInteractionSlotAction,
  resolvePhotonInteractionSlotGuards,
  createPhotonInteractionExecutionResult,
  photonInteractionExecutionSucceeded,
  executePhotonInteractionActionPresentation,
  evaluatePhotonInteractionGuards,
  planPhotonInteractionTriggerSlot,
  executePhotonInteractionTriggerSlot
};
