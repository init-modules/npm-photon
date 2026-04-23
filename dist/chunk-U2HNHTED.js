// src/helpers/list-id.ts
var PHOTON_ROOT_LIST_ID = "root";
var createPhotonAreaListId = (blockId, areaId) => `area:${blockId}:${areaId}`;

// src/helpers/node-id.ts
var randomSegment = () => Math.random().toString(36).slice(2, 10);
var createPhotonNodeId = () => `photon_${randomSegment()}`;

export {
  PHOTON_ROOT_LIST_ID,
  createPhotonAreaListId,
  createPhotonNodeId
};
