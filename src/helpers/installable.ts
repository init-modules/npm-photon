import type {
	PhotonAccountTabExtension,
	PhotonActionPolicy,
	PhotonConditionDefinition,
	PhotonConditionEvaluatorMap,
	PhotonDocumentsMap,
	PhotonFormSchemaDescriptor,
	PhotonInstallableKit,
	PhotonInteractionActionDefinition,
	PhotonInteractionGuardDefinition,
	PhotonInteractionGuardEvaluatorMap,
	PhotonInteractionSurfaceDefinition,
	PhotonModule,
	PhotonRegistryEntry,
	PhotonRouteContextField,
	PhotonSiteDataSchema,
	PhotonSiteFrameExtension,
} from "../types";

export const createPhotonKit = (
	kit: Omit<PhotonInstallableKit, "kind"> & {
		kind?: PhotonInstallableKit["kind"];
	},
): PhotonInstallableKit => ({
	...kit,
	kind: kit.kind ?? "photon-installable-kit",
});

export const isPhotonInstallableKit = (
	entry: PhotonRegistryEntry,
): entry is PhotonInstallableKit => {
	if (entry === null || typeof entry !== "object") {
		return false;
	}

	const candidate = entry as { kind?: string };
	return (
		candidate.kind === "photon-installable-kit" ||
		candidate.kind === "photon-system-kit"
	);
};

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

export const collectPhotonInteractionPolicies = (
	entries: PhotonRegistryEntry[],
): PhotonActionPolicy[] =>
	entries.flatMap((entry) =>
		isPhotonInstallableKit(entry) ? (entry.interactionPolicies ?? []) : [],
	);

export const collectPhotonConditionDefinitions = (
	entries: PhotonRegistryEntry[],
): PhotonConditionDefinition[] =>
	entries.flatMap((entry) =>
		isPhotonInstallableKit(entry) ? (entry.conditionDefinitions ?? []) : [],
	);

export const collectPhotonConditionEvaluators = (
	entries: PhotonRegistryEntry[],
): PhotonConditionEvaluatorMap =>
	Object.assign(
		{},
		...entries.map((entry) =>
			isPhotonInstallableKit(entry)
				? (entry.conditionEvaluators ?? {})
				: {},
		),
	);

export const collectPhotonSiteDataSchemas = (
	entries: PhotonRegistryEntry[],
): PhotonSiteDataSchema[] =>
	entries.flatMap((entry) =>
		isPhotonInstallableKit(entry) ? (entry.siteDataSchemas ?? []) : [],
	);

export const collectPhotonRouteContextFields = (
	entries: PhotonRegistryEntry[],
): PhotonRouteContextField[] =>
	entries.flatMap((entry) =>
		isPhotonInstallableKit(entry) ? (entry.routeContextFields ?? []) : [],
	);

export const collectPhotonFormSchemas = (
	entries: PhotonRegistryEntry[],
): PhotonFormSchemaDescriptor[] =>
	entries.flatMap((entry) =>
		isPhotonInstallableKit(entry) ? (entry.formSchemas ?? []) : [],
	);
