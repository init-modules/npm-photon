import type {
	PhotonWorkspaceCapabilities,
	PhotonWorkspaceDescriptor,
	PhotonWorkspaceRef,
} from "../types";

export const DEFAULT_PHOTON_WORKSPACE_REF: PhotonWorkspaceRef =
	{
		profileId: "default",
		branch: "main",
		readonly: false,
	};

export const DEFAULT_PHOTON_WORKSPACE_CAPABILITIES: PhotonWorkspaceCapabilities =
	{
		canEdit: true,
		canCommit: true,
		canBranch: true,
		canMerge: true,
		canEditMain: true,
		isReadonlyRevision: false,
		isMainLocked: false,
	};

export const normalizePhotonWorkspaceRef = (
	workspace?: PhotonWorkspaceRef | null,
): PhotonWorkspaceRef => {
	const normalizedWorkspace = {
		...DEFAULT_PHOTON_WORKSPACE_REF,
		...(workspace ?? {}),
	};

	if (normalizedWorkspace.revisionId?.trim()) {
		normalizedWorkspace.readonly = true;
	}

	return normalizedWorkspace;
};

export const normalizePhotonWorkspaceCapabilities = (
	capabilities?: Partial<PhotonWorkspaceCapabilities> | null,
): PhotonWorkspaceCapabilities => ({
	...DEFAULT_PHOTON_WORKSPACE_CAPABILITIES,
	...(capabilities ?? {}),
});

export const normalizePhotonWorkspaceDescriptor = (
	workspace?: PhotonWorkspaceDescriptor | null,
): PhotonWorkspaceDescriptor => ({
	ref: normalizePhotonWorkspaceRef(workspace?.ref),
	headRevisionId: workspace?.headRevisionId ?? null,
	profileName: workspace?.profileName ?? null,
	branchLabel: workspace?.branchLabel ?? null,
	revisionLabel: workspace?.revisionLabel ?? null,
	readonlyReason:
		workspace?.readonlyReason ??
		(workspace?.ref?.revisionId?.trim() ? "revision" : null),
});

const extractPhotonWorkspaceRef = (
	workspace?:
		| PhotonWorkspaceDescriptor
		| PhotonWorkspaceRef
		| null,
): PhotonWorkspaceRef | null => {
	if (!workspace) {
		return null;
	}

	return "ref" in workspace ? workspace.ref : workspace;
};

export const getPhotonWorkspaceKey = (
	workspace?:
		| PhotonWorkspaceDescriptor
		| PhotonWorkspaceRef
		| null,
) => {
	const descriptor =
		workspace && "ref" in workspace
			? normalizePhotonWorkspaceDescriptor(workspace)
			: {
					ref: normalizePhotonWorkspaceRef(
						extractPhotonWorkspaceRef(workspace),
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

export const getPhotonWorkspaceIdentityKey = (
	workspace?:
		| PhotonWorkspaceDescriptor
		| PhotonWorkspaceRef
		| null,
) => {
	const descriptor =
		workspace && "ref" in workspace
			? normalizePhotonWorkspaceDescriptor(workspace)
			: {
					ref: normalizePhotonWorkspaceRef(
						extractPhotonWorkspaceRef(workspace),
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

export const isPhotonWorkspaceReadonly = (
	workspace?:
		| PhotonWorkspaceDescriptor
		| PhotonWorkspaceRef
		| null,
	capabilities?: Partial<PhotonWorkspaceCapabilities> | null,
) => {
	const normalizedWorkspace =
		workspace && "ref" in workspace
			? normalizePhotonWorkspaceDescriptor(workspace)
			: {
					ref: normalizePhotonWorkspaceRef(
						extractPhotonWorkspaceRef(workspace),
					),
					headRevisionId: null,
					profileName: null,
					branchLabel: null,
					revisionLabel: null,
					readonlyReason: null,
				};
	const normalizedCapabilities =
		normalizePhotonWorkspaceCapabilities(capabilities);

	return Boolean(
		normalizedWorkspace.ref.readonly ||
			normalizedCapabilities.isReadonlyRevision ||
			!normalizedCapabilities.canEdit,
	);
};

export const canEditPhotonWorkspace = (
	workspace?:
		| PhotonWorkspaceDescriptor
		| PhotonWorkspaceRef
		| null,
	capabilities?: Partial<PhotonWorkspaceCapabilities> | null,
) => !isPhotonWorkspaceReadonly(workspace, capabilities);

export const canSavePhotonWorkspace = ({
	isAdmin,
	workspace,
	capabilities,
}: {
	isAdmin: boolean;
	workspace?:
		| PhotonWorkspaceDescriptor
		| PhotonWorkspaceRef
		| null;
	capabilities?: Partial<PhotonWorkspaceCapabilities> | null;
}) =>
	Boolean(
		isAdmin &&
			!isPhotonWorkspaceReadonly(workspace, capabilities) &&
			normalizePhotonWorkspaceCapabilities(capabilities).canCommit,
	);
