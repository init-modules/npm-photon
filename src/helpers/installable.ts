import type {
	PhotonAccountTabExtension,
	PhotonDocumentsMap,
	PhotonInstallableKit,
	PhotonInteractionActionDefinition,
	PhotonInteractionGuardDefinition,
	PhotonInteractionGuardEvaluatorMap,
	PhotonInteractionSurfaceDefinition,
	PhotonModule,
	PhotonRegistryEntry,
	PhotonSiteFrameExtension,
} from "../types";

export const createPhotonKit = (
	kit: PhotonInstallableKit,
): PhotonInstallableKit => kit;

export const isPhotonInstallableKit = (
	entry: PhotonRegistryEntry,
): entry is PhotonInstallableKit => "modules" in entry;

export const resolvePhotonModules = (
	entries: PhotonRegistryEntry[],
): PhotonModule[] =>
	entries.flatMap((entry) =>
		isPhotonInstallableKit(entry) ? entry.modules : [entry],
	);

export const collectPhotonDocuments = (
	entries: PhotonRegistryEntry[],
): PhotonDocumentsMap => {
	const documents: PhotonDocumentsMap = {};

	for (const entry of entries) {
		if (!isPhotonInstallableKit(entry) || !entry.documents) {
			continue;
		}

		Object.assign(documents, entry.documents);
	}

	return documents;
};

export const collectPhotonSiteFrameExtensions = (
	entries: PhotonRegistryEntry[],
): PhotonSiteFrameExtension[] =>
	entries.flatMap((entry) =>
		isPhotonInstallableKit(entry)
			? (entry.siteFrameExtensions ?? [])
			: [],
	);

export const collectPhotonAccountTabs = (
	entries: PhotonRegistryEntry[],
): PhotonAccountTabExtension[] =>
	entries.flatMap((entry) =>
		isPhotonInstallableKit(entry) ? (entry.accountTabs ?? []) : [],
	);

export const collectPhotonInteractionSurfaces = (
	entries: PhotonRegistryEntry[],
): PhotonInteractionSurfaceDefinition[] =>
	entries.flatMap((entry) =>
		isPhotonInstallableKit(entry) ? (entry.interactionSurfaces ?? []) : [],
	);

export const collectPhotonInteractionActions = (
	entries: PhotonRegistryEntry[],
): PhotonInteractionActionDefinition[] =>
	entries.flatMap((entry) =>
		isPhotonInstallableKit(entry) ? (entry.interactionActions ?? []) : [],
	);

export const collectPhotonInteractionGuards = (
	entries: PhotonRegistryEntry[],
): PhotonInteractionGuardDefinition[] =>
	entries.flatMap((entry) =>
		isPhotonInstallableKit(entry) ? (entry.interactionGuards ?? []) : [],
	);

export const collectPhotonInteractionGuardEvaluators = (
	entries: PhotonRegistryEntry[],
): PhotonInteractionGuardEvaluatorMap =>
	Object.assign(
		{},
		...entries.map((entry) =>
			isPhotonInstallableKit(entry)
				? (entry.interactionGuardEvaluators ?? {})
				: {},
		),
	);
