import type {
	WebsiteBuilderWorkspaceCapabilities,
	WebsiteBuilderWorkspaceDescriptor,
	WebsiteBuilderWorkspaceRef,
} from "../types";

export const DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF: WebsiteBuilderWorkspaceRef =
	{
		profileId: "default",
		branch: "main",
		readonly: false,
	};

export const DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES: WebsiteBuilderWorkspaceCapabilities =
	{
		canEdit: true,
		canCommit: true,
		canBranch: true,
		canMerge: true,
		canEditMain: true,
		isReadonlyRevision: false,
		isMainLocked: false,
	};

export const normalizeWebsiteBuilderWorkspaceRef = (
	workspace?: WebsiteBuilderWorkspaceRef | null,
): WebsiteBuilderWorkspaceRef => {
	const normalizedWorkspace = {
		...DEFAULT_WEBSITE_BUILDER_WORKSPACE_REF,
		...(workspace ?? {}),
	};

	if (normalizedWorkspace.revisionId?.trim()) {
		normalizedWorkspace.readonly = true;
	}

	return normalizedWorkspace;
};

export const normalizeWebsiteBuilderWorkspaceCapabilities = (
	capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities> | null,
): WebsiteBuilderWorkspaceCapabilities => ({
	...DEFAULT_WEBSITE_BUILDER_WORKSPACE_CAPABILITIES,
	...(capabilities ?? {}),
});

export const normalizeWebsiteBuilderWorkspaceDescriptor = (
	workspace?: WebsiteBuilderWorkspaceDescriptor | null,
): WebsiteBuilderWorkspaceDescriptor => ({
	ref: normalizeWebsiteBuilderWorkspaceRef(workspace?.ref),
	headRevisionId: workspace?.headRevisionId ?? null,
	profileName: workspace?.profileName ?? null,
	branchLabel: workspace?.branchLabel ?? null,
	revisionLabel: workspace?.revisionLabel ?? null,
	readonlyReason:
		workspace?.readonlyReason ??
		(workspace?.ref?.revisionId?.trim() ? "revision" : null),
});

const extractWebsiteBuilderWorkspaceRef = (
	workspace?:
		| WebsiteBuilderWorkspaceDescriptor
		| WebsiteBuilderWorkspaceRef
		| null,
): WebsiteBuilderWorkspaceRef | null => {
	if (!workspace) {
		return null;
	}

	return "ref" in workspace ? workspace.ref : workspace;
};

export const getWebsiteBuilderWorkspaceKey = (
	workspace?:
		| WebsiteBuilderWorkspaceDescriptor
		| WebsiteBuilderWorkspaceRef
		| null,
) => {
	const descriptor =
		workspace && "ref" in workspace
			? normalizeWebsiteBuilderWorkspaceDescriptor(workspace)
			: {
					ref: normalizeWebsiteBuilderWorkspaceRef(
						extractWebsiteBuilderWorkspaceRef(workspace),
					),
					headRevisionId: null,
					profileName: null,
					branchLabel: null,
					revisionLabel: null,
					readonlyReason: null,
				};

	return [
		descriptor.ref.profileId,
		descriptor.ref.branch,
		descriptor.ref.revisionId?.trim() || "head",
		descriptor.ref.readonly ? "readonly" : "writable",
		descriptor.headRevisionId?.trim() || "unknown-head",
	].join(":");
};

export const getWebsiteBuilderWorkspaceIdentityKey = (
	workspace?:
		| WebsiteBuilderWorkspaceDescriptor
		| WebsiteBuilderWorkspaceRef
		| null,
) => {
	const descriptor =
		workspace && "ref" in workspace
			? normalizeWebsiteBuilderWorkspaceDescriptor(workspace)
			: {
					ref: normalizeWebsiteBuilderWorkspaceRef(
						extractWebsiteBuilderWorkspaceRef(workspace),
					),
					headRevisionId: null,
					profileName: null,
					branchLabel: null,
					revisionLabel: null,
					readonlyReason: null,
				};

	return [
		descriptor.ref.profileId,
		descriptor.ref.branch,
		descriptor.ref.revisionId?.trim() || "head",
	].join(":");
};

export const isWebsiteBuilderWorkspaceReadonly = (
	workspace?:
		| WebsiteBuilderWorkspaceDescriptor
		| WebsiteBuilderWorkspaceRef
		| null,
	capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities> | null,
) => {
	const normalizedWorkspace =
		workspace && "ref" in workspace
			? normalizeWebsiteBuilderWorkspaceDescriptor(workspace)
			: {
					ref: normalizeWebsiteBuilderWorkspaceRef(
						extractWebsiteBuilderWorkspaceRef(workspace),
					),
					headRevisionId: null,
					profileName: null,
					branchLabel: null,
					revisionLabel: null,
					readonlyReason: null,
				};
	const normalizedCapabilities =
		normalizeWebsiteBuilderWorkspaceCapabilities(capabilities);

	return Boolean(
		normalizedWorkspace.ref.readonly ||
			normalizedCapabilities.isReadonlyRevision ||
			!normalizedCapabilities.canEdit,
	);
};

export const canEditWebsiteBuilderWorkspace = (
	workspace?:
		| WebsiteBuilderWorkspaceDescriptor
		| WebsiteBuilderWorkspaceRef
		| null,
	capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities> | null,
) => !isWebsiteBuilderWorkspaceReadonly(workspace, capabilities);

export const canSaveWebsiteBuilderWorkspace = ({
	isAdmin,
	workspace,
	capabilities,
}: {
	isAdmin: boolean;
	workspace?:
		| WebsiteBuilderWorkspaceDescriptor
		| WebsiteBuilderWorkspaceRef
		| null;
	capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities> | null;
}) =>
	Boolean(
		isAdmin &&
			!isWebsiteBuilderWorkspaceReadonly(workspace, capabilities) &&
			normalizeWebsiteBuilderWorkspaceCapabilities(capabilities).canCommit,
	);
