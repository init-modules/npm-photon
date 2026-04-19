import type { WebsiteBuilderWorkspaceSelectionLike } from "./mode";

export const resolveWebsiteBuilderRequestHeaders = (options?: {
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

export const resolveWebsiteBuilderWorkspaceParams = (
	workspace?: WebsiteBuilderWorkspaceSelectionLike,
) =>
	workspace?.profileId
		? {
				workspace: {
					profileId: workspace.profileId,
					branch: workspace.branch ?? "main",
					...(workspace.revisionId
						? { revisionId: workspace.revisionId }
						: {}),
				},
			}
		: {};
