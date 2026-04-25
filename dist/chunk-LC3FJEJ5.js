// src/helpers/list-id.ts
var PHOTON_ROOT_LIST_ID = "root";
var createPhotonAreaListId = (blockId, areaId) => `area:${blockId}:${areaId}`;

export {
  PHOTON_ROOT_LIST_ID,
  createPhotonAreaListId
};
