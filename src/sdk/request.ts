import type { PhotonWorkspaceSelectionLike } from "./mode";

export const resolvePhotonRequestHeaders = (options?: {
	locale?: string;
}) => {
	const locale = options?.locale?.trim().toLowerCase();

	if (!locale) {
		return undefined;
	}

	return {
		"X-Locale": locale,
		"Accept-Language": locale,
	};
};

export const resolvePhotonWorkspaceParams = (
	workspace?: PhotonWorkspaceSelectionLike,
) =>
	workspace?.profileId
		? {
				workspace: {
					profileId: workspace.profileId,
					branch: workspace.branch ?? "main",
					...(workspace.revisionId ? { revisionId: workspace.revisionId } : {}),
				},
			}
		: {};
