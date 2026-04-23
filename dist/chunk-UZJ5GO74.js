import {
  PHOTON_ROOT_LIST_ID,
  createPhotonAreaListId,
  createPhotonNodeId
} from "./chunk-U2HNHTED.js";
import {
  clonePhotonValue
} from "./chunk-KAITZE7U.js";

// src/helpers/tree.ts
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

export {
  clonePhotonBlockTreeWithNewIds,
  getFirstPhotonBlockId,
  findPhotonBlock,
  collectBlockIds,
  updatePhotonBlockInDocument,
  insertPhotonBlockInDocument,
  removePhotonBlockFromDocument,
  duplicatePhotonBlockInDocument,
  movePhotonBlockInDocument
};
