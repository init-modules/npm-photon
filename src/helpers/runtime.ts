import type {
	PhotonRegistryEntry,
	PhotonRuntime,
} from "../types";
import { createPhotonRegistry } from "./document";
import {
	collectPhotonAccountTabs,
	collectPhotonDocuments,
	collectPhotonInteractionActions,
	collectPhotonInteractionGuardEvaluators,
	collectPhotonInteractionGuards,
	collectPhotonInteractionSurfaces,
	collectPhotonSiteFrameExtensions,
} from "./installable";

export const createPhotonRuntime = (
	entries: PhotonRegistryEntry[],
): PhotonRuntime => ({
	entries,
	registry: createPhotonRegistry(entries),
	documents: collectPhotonDocuments(entries),
	siteFrameExtensions: collectPhotonSiteFrameExtensions(entries),
	accountTabs: collectPhotonAccountTabs(entries),
	interactionSurfaces: collectPhotonInteractionSurfaces(entries),
	interactionActions: collectPhotonInteractionActions(entries),
	interactionGuards: collectPhotonInteractionGuards(entries),
	interactionGuardEvaluators: collectPhotonInteractionGuardEvaluators(entries),
});
