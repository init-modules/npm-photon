export type PhotonModeLike = "preview" | "content" | "builder";

export type PhotonWorkspaceSelectionLike =
	| Partial<{
			profileId: string;
			branch: string;
			revisionId: null | string;
	  }>
	| null
	| undefined;

export const resolvePhotonMode = (
	mode: string | string[] | null | undefined,
	canManage: boolean,
	fallback: PhotonModeLike = "preview",
): PhotonModeLike => {
	const candidate = Array.isArray(mode) ? mode[0] : mode;

	return canManage &&
		(candidate === "builder" ||
			candidate === "content" ||
			candidate === "preview")
		? candidate
		: fallback;
};

export const normalizePhotonSelectionForMode = (
	selection: PhotonWorkspaceSelectionLike,
	mode: PhotonModeLike,
): PhotonWorkspaceSelectionLike => {
	if (!selection) {
		return selection;
	}

	if (
		(mode === "builder" || mode === "content") &&
		typeof selection.revisionId === "string"
	) {
		return {
			profileId: selection.profileId,
			branch: selection.branch ?? "main",
			revisionId: null,
		};
	}

	return selection;
};
