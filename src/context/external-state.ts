import { getPhotonDocumentFingerprint } from "../helpers/document";
import { getPhotonWorkspaceIdentityKey } from "../helpers/workspace";
import type {
	PhotonDocument,
	PhotonPageSettings,
	PhotonResources,
	PhotonSite,
	PhotonWorkspaceDescriptor,
} from "../types";

export const getPhotonExternalStateFingerprint = ({
	document,
	resources,
	pageSettings,
	site,
	workspace,
}: {
	document: PhotonDocument;
	resources: PhotonResources;
	pageSettings: PhotonPageSettings;
	site: PhotonSite;
	workspace?: PhotonWorkspaceDescriptor;
}) =>
	JSON.stringify({
		workspace: getPhotonWorkspaceIdentityKey(workspace),
		document: getPhotonDocumentFingerprint(document),
		resources,
		pageSettings,
		site,
	});
