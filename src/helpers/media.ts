import type { PhotonMediaValue } from "../types";

export const isPhotonMediaValue = (
	value: unknown,
): value is PhotonMediaValue =>
	Boolean(
		value &&
			typeof value === "object" &&
			"url" in value &&
			"kind" in value &&
			(value as { kind?: unknown }).kind === "media" &&
			typeof (value as { url?: unknown }).url === "string",
	);

export const resolvePhotonMediaUrl = (value: unknown): string => {
	if (typeof value === "string") {
		return value;
	}

	if (isPhotonMediaValue(value)) {
		return value.url;
	}

	return "";
};

export const resolvePhotonMediaPreviewUrl = (
	value: unknown,
): string => {
	if (isPhotonMediaValue(value)) {
		return value.previewUrl || value.url;
	}

	return resolvePhotonMediaUrl(value);
};

export const updatePhotonMediaUrl = (
	currentValue: unknown,
	url: string,
): string | PhotonMediaValue =>
	isPhotonMediaValue(currentValue)
		? {
				...currentValue,
				url,
			}
		: url;
