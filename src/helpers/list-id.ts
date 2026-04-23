export const PHOTON_ROOT_LIST_ID = "root";

export const createPhotonAreaListId = (blockId: string, areaId: string) =>
	`area:${blockId}:${areaId}`;
