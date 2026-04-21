import { getWebsiteBuilderDocumentFingerprint } from "../../helpers/document";
import { cloneWebsiteBuilderValue, setValueAtPath } from "../../helpers/path";
import {
	canSaveWebsiteBuilderWorkspace,
	getWebsiteBuilderWorkspaceIdentityKey,
	normalizeWebsiteBuilderWorkspaceCapabilities,
	normalizeWebsiteBuilderWorkspaceDescriptor,
} from "../../helpers/workspace";
import type {
	WebsiteBuilderDocument,
	WebsiteBuilderPageCatalogItem,
	WebsiteBuilderPageSettings,
	WebsiteBuilderResources,
	WebsiteBuilderSite,
	WebsiteBuilderWorkspaceCapabilities,
	WebsiteBuilderWorkspaceDescriptor,
} from "../../types";
import type {
	WebsiteBuilderStudioSavePayload,
	WebsiteBuilderStudioSaveReason,
	WebsiteBuilderStudioSiteSettingChangeContext,
} from "../types";

export type PersistedDraftEnvelope = {
	workspaceKey?: string | null;
	document?: Partial<WebsiteBuilderDocument>;
	resources?: WebsiteBuilderResources;
	pageSettings?: WebsiteBuilderPageSettings;
	site?: WebsiteBuilderSite;
};

export type ParsedPersistedDraft = {
	payload: WebsiteBuilderStudioSavePayload;
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

export const getDefaultWebsiteBuilderAutosaveEnabled = () => false;

export const parsePersistedDraft = (
	rawValue: string,
	fallbackUpdatedAt: string,
): ParsedPersistedDraft | null => {
	try {
		const parsedValue = JSON.parse(rawValue) as
			| Partial<WebsiteBuilderDocument>
			| PersistedDraftEnvelope;
		const parsedEnvelope =
			typeof parsedValue === "object" &&
			parsedValue !== null &&
			"document" in parsedValue
				? (parsedValue as PersistedDraftEnvelope)
				: null;
		const parsedDocument: null | Partial<WebsiteBuilderDocument> =
			parsedEnvelope?.document ??
			(parsedValue as Partial<WebsiteBuilderDocument>);

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
				document: cloneWebsiteBuilderValue({
					id: parsedDocument.id,
					name: parsedDocument.name,
					route: parsedDocument.route,
					updatedAt:
						typeof parsedDocument.updatedAt === "string"
							? parsedDocument.updatedAt
							: fallbackUpdatedAt,
					blocks: parsedDocument.blocks,
				}),
				resources: cloneWebsiteBuilderValue(parsedEnvelope?.resources ?? {}),
				pageSettings: cloneWebsiteBuilderValue(
					parsedEnvelope?.pageSettings ?? {},
				),
				site: cloneWebsiteBuilderValue(
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

export const getWebsiteBuilderStudioFingerprint = (
	document: WebsiteBuilderDocument,
	resources: WebsiteBuilderResources,
	pageSettings: WebsiteBuilderPageSettings,
	site: WebsiteBuilderSite,
	workspace?: WebsiteBuilderWorkspaceDescriptor,
) =>
	JSON.stringify({
		workspace: getWebsiteBuilderWorkspaceIdentityKey(workspace),
		document: getWebsiteBuilderDocumentFingerprint(document),
		resources,
		pageSettings,
		site,
	});

export const normalizeWebsiteBuilderStudioWorkspace = (
	workspace?: WebsiteBuilderWorkspaceDescriptor,
) => normalizeWebsiteBuilderWorkspaceDescriptor(workspace);

export const normalizeWebsiteBuilderStudioCapabilities = (
	capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>,
) => normalizeWebsiteBuilderWorkspaceCapabilities(capabilities);

export const resolveWebsiteBuilderStudioWorkspaceKey = (
	workspace?: WebsiteBuilderWorkspaceDescriptor,
) => getWebsiteBuilderWorkspaceIdentityKey(workspace);

export const resolveWebsiteBuilderStudioDraftStorageKey = ({
	baseKey,
	workspace,
}: {
	baseKey: string;
	workspace?: WebsiteBuilderWorkspaceDescriptor;
}) => `${baseKey}:${getWebsiteBuilderWorkspaceIdentityKey(workspace)}`;

export const createWebsiteBuilderStudioSavePayload = ({
	workspace,
	expectedHeadRevisionId,
	saveMode,
	document,
	resources,
	pageSettings,
	site,
}: {
	workspace?: WebsiteBuilderWorkspaceDescriptor;
	expectedHeadRevisionId?: string | null;
	saveMode: WebsiteBuilderStudioSaveReason;
	document: WebsiteBuilderDocument;
	resources: WebsiteBuilderResources;
	pageSettings: WebsiteBuilderPageSettings;
	site: WebsiteBuilderSite;
}): WebsiteBuilderStudioSavePayload => ({
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

export const createWebsiteBuilderStudioSiteSettingChangeContext = ({
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
	workspace?: WebsiteBuilderWorkspaceDescriptor;
	expectedHeadRevisionId?: string | null;
	document: WebsiteBuilderDocument;
	resources: WebsiteBuilderResources;
	pageSettings: WebsiteBuilderPageSettings;
	site: WebsiteBuilderSite;
	currentPage?: WebsiteBuilderPageCatalogItem | null;
}): WebsiteBuilderStudioSiteSettingChangeContext => {
	const nextSiteSettings = setValueAtPath(
		cloneWebsiteBuilderValue(site.settings) as Record<string, unknown>,
		path,
		value,
	);

	return {
		...createWebsiteBuilderStudioSavePayload({
			workspace,
			expectedHeadRevisionId,
			saveMode: "manual",
			document,
			resources,
			pageSettings,
			site: {
				...cloneWebsiteBuilderValue(site),
				settings: nextSiteSettings,
			},
		}),
		currentPage: currentPage ?? null,
	};
};

export const canSaveWebsiteBuilderStudioDocument = ({
	isAdmin,
	workspace,
	capabilities,
}: {
	isAdmin: boolean;
	workspace?: WebsiteBuilderWorkspaceDescriptor;
	capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
}) =>
	canSaveWebsiteBuilderWorkspace({
		isAdmin,
		workspace,
		capabilities,
	});
