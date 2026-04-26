import type {
	PhotonActionValue,
	PhotonInteractionSurfaceDefinition,
	PhotonInteractionSurfaceIntentBinding,
	PhotonInteractionSurfaceInstance,
	PhotonInteractionSurfaceSettings,
	PhotonInteractionSurfaceTrigger,
	PhotonInteractionToastInput,
	PhotonInteractionToastTemplate,
	PhotonResolvedInteractionSurfaceCatalog,
	PhotonResolvedInteractionSurfaceRequest,
	PhotonSiteSettings,
} from "../types";
import { isRecord } from "./path";

export const PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY =
	"interactionSurfaces";

const byOrderThenLabel = (
	left: PhotonInteractionSurfaceDefinition,
	right: PhotonInteractionSurfaceDefinition,
) =>
	(left.order ?? 0) - (right.order ?? 0) ||
	left.label.localeCompare(right.label);

const normalizeRecordMap = <T extends Record<string, unknown>>(
	value: unknown,
	normalizeEntry: (key: string, item: Record<string, unknown>) => [string, T],
): Record<string, T> => {
	if (!isRecord(value)) {
		return {};
	}

	const entries: Array<[string, T]> = [];

	for (const [key, item] of Object.entries(value)) {
		if (!isRecord(item)) {
			continue;
		}

		entries.push(normalizeEntry(key, item));
	}

	return Object.fromEntries(entries);
};

const normalizeIdRecord = <T extends { id: string }>(
	key: string,
	item: Record<string, unknown>,
): [string, T] => {
	const id = typeof item.id === "string" && item.id.trim() ? item.id : key;

	return [id, { ...(item as T), id }];
};

const normalizeIntentRecord = (
	key: string,
	item: Record<string, unknown>,
): [string, PhotonInteractionSurfaceIntentBinding] => {
	const intent =
		typeof item.intent === "string" && item.intent.trim() ? item.intent : key;

	return [
		intent,
		{
			...(item as PhotonInteractionSurfaceIntentBinding),
			intent,
		},
	];
};

const mergeRecords = <T extends Record<string, unknown>>(
	base: T | undefined,
	override: T | undefined,
): T | undefined => {
	if (!base && !override) {
		return undefined;
	}

	return {
		...(base ?? ({} as T)),
		...(override ?? ({} as T)),
	};
};

const mergeInstanceMap = (
	defaults: PhotonInteractionSurfaceInstance[],
	persisted: Record<string, PhotonInteractionSurfaceInstance> | undefined,
): Record<string, PhotonInteractionSurfaceInstance> => {
	const merged = Object.fromEntries(
		defaults.map((instance) => [instance.id, instance]),
	);

	for (const [id, instance] of Object.entries(persisted ?? {})) {
		const base = merged[id];

		merged[id] = {
			...(base ?? {}),
			...instance,
			id,
			props: mergeRecords(base?.props, instance.props),
		};
	}

	return merged;
};

const mergeIntentMap = (
	defaults: PhotonInteractionSurfaceIntentBinding[],
	persisted: Record<string, PhotonInteractionSurfaceIntentBinding> | undefined,
): Record<string, PhotonInteractionSurfaceIntentBinding> => {
	const merged = Object.fromEntries(
		defaults.map((intent) => [intent.intent, intent]),
	);

	for (const [intent, binding] of Object.entries(persisted ?? {})) {
		const base = merged[intent];

		merged[intent] = {
			...(base ?? {}),
			...binding,
			intent,
			overrides: mergeRecords(base?.overrides, binding.overrides),
			payload: mergeRecords(base?.payload, binding.payload),
		};
	}

	return merged;
};

const mergeToastTemplateMap = (
	defaults: PhotonInteractionToastTemplate[],
	persisted: Record<string, PhotonInteractionToastTemplate> | undefined,
): Record<string, PhotonInteractionToastTemplate> => {
	const merged = Object.fromEntries(
		defaults.map((template) => [template.id, template]),
	);

	for (const [id, template] of Object.entries(persisted ?? {})) {
		const base = merged[id];

		merged[id] = {
			...(base ?? {}),
			...template,
			id,
			props: mergeRecords(base?.props, template.props),
		};
	}

	return merged;
};

export const createPhotonInteractionSurfaceDefinition = (
	definition: PhotonInteractionSurfaceDefinition,
): PhotonInteractionSurfaceDefinition => definition;

export const createPhotonActionValue = (
	action: PhotonActionValue,
): PhotonActionValue => action;

export const readPhotonInteractionSurfaceSettings = (
	siteSettings: PhotonSiteSettings | undefined,
): PhotonInteractionSurfaceSettings => {
	const rawSettings = siteSettings?.[PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY];

	if (!isRecord(rawSettings)) {
		return {};
	}

	return {
		instances: normalizeRecordMap<PhotonInteractionSurfaceInstance>(
			rawSettings.instances,
			normalizeIdRecord,
		),
		intents: normalizeRecordMap<PhotonInteractionSurfaceIntentBinding>(
			rawSettings.intents,
			normalizeIntentRecord,
		),
		toastTemplates: normalizeRecordMap<PhotonInteractionToastTemplate>(
			rawSettings.toastTemplates,
			normalizeIdRecord,
		),
	};
};

export const resolvePhotonInteractionSurfaceCatalog = ({
	definitions,
	siteSettings,
}: {
	definitions: readonly PhotonInteractionSurfaceDefinition[] | undefined;
	siteSettings?: PhotonSiteSettings;
}): PhotonResolvedInteractionSurfaceCatalog => {
	const sortedDefinitions = [...(definitions ?? [])].sort(byOrderThenLabel);
	const definitionsById = new Map(
		sortedDefinitions.map((definition) => [definition.id, definition]),
	);
	const persistedSettings =
		readPhotonInteractionSurfaceSettings(siteSettings);
	const defaultInstances = sortedDefinitions.flatMap(
		(definition) => definition.defaultInstances ?? [],
	);
	const defaultIntents = sortedDefinitions.flatMap(
		(definition) => definition.defaultIntentBindings ?? [],
	);
	const defaultToastTemplates = sortedDefinitions.flatMap(
		(definition) => definition.defaultToastTemplates ?? [],
	);

	return {
		definitions: sortedDefinitions,
		definitionsById,
		instances: mergeInstanceMap(defaultInstances, persistedSettings.instances),
		intents: mergeIntentMap(defaultIntents, persistedSettings.intents),
		toastTemplates: mergeToastTemplateMap(
			defaultToastTemplates,
			persistedSettings.toastTemplates,
		),
	};
};

export const resolvePhotonInteractionSurfaceRequest = (
	trigger: PhotonInteractionSurfaceTrigger,
	catalog: PhotonResolvedInteractionSurfaceCatalog,
): PhotonResolvedInteractionSurfaceRequest | null => {
	const intent = trigger.intent ? catalog.intents[trigger.intent] : undefined;

	if (intent?.enabled === false) {
		return null;
	}

	const instanceId = trigger.surfaceInstanceId ?? intent?.surfaceInstanceId;
	const instance = instanceId ? catalog.instances[instanceId] : undefined;

	if (!instance || instance.enabled === false) {
		return null;
	}

	const definition = catalog.definitionsById.get(instance.definitionId);

	if (!definition) {
		return null;
	}

	return {
		definition,
		instance,
		trigger,
		props: mergeRecords(instance.props, intent?.overrides) ?? {},
		payload: mergeRecords(intent?.payload, trigger.payload) ?? {},
		fallbackHref: trigger.fallbackHref,
		...(trigger.overrides
			? {
					props: {
						...(mergeRecords(instance.props, intent?.overrides) ?? {}),
						...trigger.overrides,
					},
				}
			: {}),
	};
};

export const resolvePhotonInteractionToastTemplate = (
	input: PhotonInteractionToastInput,
	catalog: PhotonResolvedInteractionSurfaceCatalog,
): PhotonInteractionToastTemplate | null => {
	const template = catalog.toastTemplates[input.templateId];

	if (!template || template.enabled === false) {
		return null;
	}

	return {
		...template,
		...(input.overrides ?? {}),
		props: {
			...(template.props ?? {}),
			...(input.overrides?.props ?? {}),
		},
	};
};
