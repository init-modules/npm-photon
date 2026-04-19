export const formatMediaFileSize = (size?: number | null) => {
	if (!size || size <= 0) {
		return null;
	}

	if (size < 1024 * 1024) {
		return `${Math.round(size / 1024)} KB`;
	}

	return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};
