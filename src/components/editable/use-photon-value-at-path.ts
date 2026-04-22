"use client";

import { usePhotonFieldValue } from "../../context/photon-context";

export const usePhotonValueAtPath = (
	blockId: string,
	path: string,
): unknown => {
	return usePhotonFieldValue(blockId, path);
};
