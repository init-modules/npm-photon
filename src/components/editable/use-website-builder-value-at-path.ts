"use client";

import { useWebsiteBuilderFieldValue } from "../../context/website-builder-context";

export const useWebsiteBuilderValueAtPath = (
	blockId: string,
	path: string,
): unknown => {
	return useWebsiteBuilderFieldValue(blockId, path);
};
