import { getWebsiteBuilderDocumentFingerprint } from "../helpers/document";
import { getWebsiteBuilderWorkspaceIdentityKey } from "../helpers/workspace";
import type {
	WebsiteBuilderDocument,
	WebsiteBuilderPageSettings,
	WebsiteBuilderResources,
	WebsiteBuilderSite,
	WebsiteBuilderWorkspaceDescriptor,
} from "../types";

export const getWebsiteBuilderExternalStateFingerprint = ({
	document,
	resources,
	pageSettings,
	site,
	workspace,
}: {
	document: WebsiteBuilderDocument;
	resources: WebsiteBuilderResources;
	pageSettings: WebsiteBuilderPageSettings;
	site: WebsiteBuilderSite;
	workspace?: WebsiteBuilderWorkspaceDescriptor;
}) =>
	JSON.stringify({
		workspace: getWebsiteBuilderWorkspaceIdentityKey(workspace),
		document: getWebsiteBuilderDocumentFingerprint(document),
		resources,
		pageSettings,
		site,
	});
