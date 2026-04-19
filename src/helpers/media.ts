import type { WebsiteBuilderMediaValue } from "../types";

export const isWebsiteBuilderMediaValue = (
	value: unknown,
): value is WebsiteBuilderMediaValue =>
	Boolean(
		value &&
			typeof value === "object" &&
			"url" in value &&
			"kind" in value &&
			(value as { kind?: unknown }).kind === "media" &&
			typeof (value as { url?: unknown }).url === "string",
	);

export const resolveWebsiteBuilderMediaUrl = (value: unknown): string => {
	if (typeof value === "string") {
		return value;
	}

	if (isWebsiteBuilderMediaValue(value)) {
		return value.url;
	}

	return "";
};

export const resolveWebsiteBuilderMediaPreviewUrl = (
	value: unknown,
): string => {
	if (isWebsiteBuilderMediaValue(value)) {
		return value.previewUrl || value.url;
	}

	return resolveWebsiteBuilderMediaUrl(value);
};

export const updateWebsiteBuilderMediaUrl = (
	currentValue: unknown,
	url: string,
): string | WebsiteBuilderMediaValue =>
	isWebsiteBuilderMediaValue(currentValue)
		? {
				...currentValue,
				url,
			}
		: url;
