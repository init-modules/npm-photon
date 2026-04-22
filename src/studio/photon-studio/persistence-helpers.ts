import { getPhotonDocumentFingerprint } from "../../helpers/document";
import { clonePhotonValue, setValueAtPath } from "../../helpers/path";
import {
	canSavePhotonWorkspace,
	getPhotonWorkspaceIdentityKey,
	normalizePhotonWorkspaceCapabilities,
	normalizePhotonWorkspaceDescriptor,
} from "../../helpers/workspace";
import type {
	PhotonDocument,
	PhotonPageCatalogItem,
	PhotonPageSettings,
	PhotonResources,
	PhotonSite,
	PhotonWorkspaceCapabilities,
	PhotonWorkspaceDescriptor,
} from "../../types";
import type {
	PhotonStudioSavePayload,
	PhotonStudioSaveReason,
	PhotonStudioSiteSettingChangeContext,
} from "../types";

export type PersistedDraftEnvelope = {
	workspaceKey?: string | null;
	document?: Partial<PhotonDocument>;
	resources?: PhotonResources;
	pageSettings?: PhotonPageSettings;
	site?: PhotonSite;
};

export type ParsedPersistedDraft = {
	payload: PhotonStudioSavePayload;
	workspaceKey: string | null;
};

export const parseBooleanStorageValue = (rawValue: string) => {
	if (rawValue === "true") {
		return true;
	}

	if (rawValue === "false") {
		return false;
	}

	return null;
};

export const getDefaultPhotonAutosaveEnabled = () => false;

export const parsePersistedDraft = (
	rawValue: string,
	fallbackUpdatedAt: string,
): ParsedPersistedDraft | null => {
	try {
		const parsedValue = JSON.parse(rawValue) as
			| Partial<PhotonDocument>
			| PersistedDraftEnvelope;
		const parsedEnvelope =
			typeof parsedValue === "object" &&
			parsedValue !== null &&
			"document" in parsedValue
				? (parsedValue as PersistedDraftEnvelope)
				: null;
		const parsedDocument: null | Partial<PhotonDocument> =
			parsedEnvelope?.document ??
			(parsedValue as Partial<PhotonDocument>);

		if (
			typeof parsedDocument?.id !== "string" ||
			typeof parsedDocument?.name !== "string" ||
			typeof parsedDocument?.route !== "string" ||
			!Array.isArray(parsedDocument?.blocks)
		) {
			return null;
		}

		return {
			workspaceKey:
				typeof parsedEnvelope?.workspaceKey === "string"
					? parsedEnvelope.workspaceKey
					: null,
			payload: {
				expectedHeadRevisionId: null,
				saveMode: "manual",
				document: clonePhotonValue({
					id: parsedDocument.id,
					name: parsedDocument.name,
					route: parsedDocument.route,
					updatedAt:
						typeof parsedDocument.updatedAt === "string"
							? parsedDocument.updatedAt
							: fallbackUpdatedAt,
					blocks: parsedDocument.blocks,
				}),
				resources: clonePhotonValue(parsedEnvelope?.resources ?? {}),
				pageSettings: clonePhotonValue(
					parsedEnvelope?.pageSettings ?? {},
				),
				site: clonePhotonValue(
					parsedEnvelope?.site ?? {
						settings: {},
						regions: {},
					},
				),
			},
		};
	} catch {
		return null;
	}
};

export const getPhotonStudioFingerprint = (
	document: PhotonDocument,
	resources: PhotonResources,
	pageSettings: PhotonPageSettings,
	site: PhotonSite,
	workspace?: PhotonWorkspaceDescriptor,
) =>
	JSON.stringify({
		workspace: getPhotonWorkspaceIdentityKey(workspace),
		document: getPhotonDocumentFingerprint(document),
		resources,
		pageSettings,
		site,
	});

export const normalizePhotonStudioWorkspace = (
	workspace?: PhotonWorkspaceDescriptor,
) => normalizePhotonWorkspaceDescriptor(workspace);

export const normalizePhotonStudioCapabilities = (
	capabilities?: Partial<PhotonWorkspaceCapabilities>,
) => normalizePhotonWorkspaceCapabilities(capabilities);

export const resolvePhotonStudioWorkspaceKey = (
	workspace?: PhotonWorkspaceDescriptor,
) => getPhotonWorkspaceIdentityKey(workspace);

export const resolvePhotonStudioDraftStorageKey = ({
	baseKey,
	workspace,
}: {
	baseKey: string;
	workspace?: PhotonWorkspaceDescriptor;
}) => `${baseKey}:${getPhotonWorkspaceIdentityKey(workspace)}`;

export const createPhotonStudioSavePayload = ({
	workspace,
	expectedHeadRevisionId,
	saveMode,
	document,
	resources,
	pageSettings,
	site,
}: {
	workspace?: PhotonWorkspaceDescriptor;
	expectedHeadRevisionId?: string | null;
	saveMode: PhotonStudioSaveReason;
	document: PhotonDocument;
	resources: PhotonResources;
	pageSettings: PhotonPageSettings;
	site: PhotonSite;
}): PhotonStudioSavePayload => ({
	workspace,
	expectedHeadRevisionId:
		expectedHeadRevisionId ?? workspace?.headRevisionId ?? null,
	commitMessage: null,
	saveMode,
	document,
	resources,
	pageSettings,
	site,
});

export const createPhotonStudioSiteSettingChangeContext = ({
	path,
	value,
	workspace,
	expectedHeadRevisionId,
	document,
	resources,
	pageSettings,
	site,
	currentPage,
}: {
	path: string;
	value: unknown;
	workspace?: PhotonWorkspaceDescriptor;
	expectedHeadRevisionId?: string | null;
	document: PhotonDocument;
	resources: PhotonResources;
	pageSettings: PhotonPageSettings;
	site: PhotonSite;
	currentPage?: PhotonPageCatalogItem | null;
}): PhotonStudioSiteSettingChangeContext => {
	const nextSiteSettings = setValueAtPath(
		clonePhotonValue(site.settings) as Record<string, unknown>,
		path,
		value,
	);

	return {
		...createPhotonStudioSavePayload({
			workspace,
			expectedHeadRevisionId,
			saveMode: "manual",
			document,
			resources,
			pageSettings,
			site: {
				...clonePhotonValue(site),
				settings: nextSiteSettings,
			},
		}),
		currentPage: currentPage ?? null,
	};
};

export const canSavePhotonStudioDocument = ({
	isAdmin,
	workspace,
	capabilities,
}: {
	isAdmin: boolean;
	workspace?: PhotonWorkspaceDescriptor;
	capabilities?: Partial<PhotonWorkspaceCapabilities>;
}) =>
	canSavePhotonWorkspace({
		isAdmin,
		workspace,
		capabilities,
	});
