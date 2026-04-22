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

// src/helpers/tree.ts
var PHOTON_ROOT_LIST_ID = "root";
var createPhotonAreaListId = (blockId, areaId) => `area:${blockId}:${areaId}`;
var randomSegment = () => Math.random().toString(36).slice(2, 10);
var createPhotonNodeId = () => `photon_${randomSegment()}`;
var cloneAreaTree = (areas) => {
  if (!areas?.length) {
    return void 0;
  }
  return areas.map((area) => ({
    id: area.id,
    label: area.label,
    blocks: area.blocks.map(clonePhotonBlockTreeWithNewIds)
  }));
};
var clonePhotonBlockTreeWithNewIds = (block) => ({
  id: createPhotonNodeId(),
  module: block.module,
  type: block.type,
  props: clonePhotonValue(block.props),
  bindings: clonePhotonValue(block.bindings),
  areas: cloneAreaTree(block.areas)
});
var getFirstPhotonBlockId = (blocks) => blocks[0]?.id ?? null;
var findPhotonBlock = (blocks, blockId) => {
  for (const block of blocks) {
    if (block.id === blockId) {
      return block;
    }
    for (const area of block.areas ?? []) {
      const nested = findPhotonBlock(area.blocks, blockId);
      if (nested) {
        return nested;
      }
    }
  }
  return null;
};
var collectBlockIds = (blocks) => {
  const ids = [];
  for (const block of blocks) {
    ids.push(block.id);
    for (const area of block.areas ?? []) {
      ids.push(...collectBlockIds(area.blocks));
    }
  }
  return ids;
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
var updatePhotonBlockInDocument = (document, blockId, updater) => {
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
        createPhotonAreaListId(block.id, area.id)
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
            const {
              __removed,
              __sourceListId,
              __sourceIndex,
              ...cleanArea
            } = area;
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
  if (listId === PHOTON_ROOT_LIST_ID) {
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
      const areaListId = createPhotonAreaListId(candidate.id, area.id);
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
var insertPhotonBlockInDocument = (document, listId, block, index) => {
  const result = insertIntoListTree(document.blocks, listId, block, index);
  return result.inserted ? {
    ...document,
    blocks: result.blocks
  } : document;
};
var removePhotonBlockFromDocument = (document, blockId) => removeBlockFromList(document.blocks, blockId, PHOTON_ROOT_LIST_ID);
var duplicatePhotonBlockInDocument = (document, blockId) => {
  const target = findPhotonBlock(document.blocks, blockId);
  if (!target) {
    return {
      document,
      duplicatedBlockId: null
    };
  }
  const removeResult = removeBlockFromList(
    document.blocks,
    blockId,
    PHOTON_ROOT_LIST_ID
  );
  if (!removeResult.sourceListId || removeResult.sourceIndex < 0) {
    return {
      document,
      duplicatedBlockId: null
    };
  }
  const clone = clonePhotonBlockTreeWithNewIds(target);
  const nextDocument = insertPhotonBlockInDocument(
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
var movePhotonBlockInDocument = (document, blockId, targetListId, targetIndex) => {
  const removal = removeBlockFromList(
    document.blocks,
    blockId,
    PHOTON_ROOT_LIST_ID
  );
  if (!removal.removed || !removal.sourceListId || removal.sourceIndex < 0) {
    return document;
  }
  const targetLivesInsideRemovedTree = (block, listId) => {
    for (const area of block.areas ?? []) {
      if (createPhotonAreaListId(block.id, area.id) === listId) {
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
  const nextDocument = insertPhotonBlockInDocument(
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

export {
  PHOTON_EMPTY_TEXT,
  clonePhotonValue,
  getValueAtPath,
  setValueAtPath,
  PHOTON_ROOT_LIST_ID,
  createPhotonAreaListId,
  createPhotonNodeId,
  clonePhotonBlockTreeWithNewIds,
  getFirstPhotonBlockId,
  findPhotonBlock,
  collectBlockIds,
  updatePhotonBlockInDocument,
  insertPhotonBlockInDocument,
  removePhotonBlockFromDocument,
  duplicatePhotonBlockInDocument,
  movePhotonBlockInDocument,
  DEFAULT_PHOTON_WORKSPACE_REF,
  DEFAULT_PHOTON_WORKSPACE_CAPABILITIES,
  normalizePhotonWorkspaceRef,
  normalizePhotonWorkspaceCapabilities,
  normalizePhotonWorkspaceDescriptor,
  getPhotonWorkspaceKey,
  getPhotonWorkspaceIdentityKey,
  isPhotonWorkspaceReadonly,
  canEditPhotonWorkspace,
  canSavePhotonWorkspace
};
