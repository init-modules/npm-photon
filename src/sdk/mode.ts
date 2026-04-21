export type WebsiteBuilderModeLike = "preview" | "content" | "builder";

export type WebsiteBuilderWorkspaceSelectionLike =
	| Partial<{
			profileId: string;
			branch: string;
			revisionId: null | string;
	  }>
	| null
	| undefined;

export const resolveWebsiteBuilderMode = (
	mode: string | string[] | null | undefined,
	canManage: boolean,
	fallback: WebsiteBuilderModeLike = "preview",
): WebsiteBuilderModeLike => {
	const candidate = Array.isArray(mode) ? mode[0] : mode;

	return canManage &&
		(candidate === "builder" ||
			candidate === "content" ||
			candidate === "preview")
		? candidate
		: fallback;
};

export const normalizeWebsiteBuilderSelectionForMode = (
	selection: WebsiteBuilderWorkspaceSelectionLike,
	mode: WebsiteBuilderModeLike,
): WebsiteBuilderWorkspaceSelectionLike => {
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
