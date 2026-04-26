import type {
	PhotonActionPolicy,
	PhotonInteractionActionDefinition,
	PhotonInteractionActionExecutionHandlers,
	PhotonInteractionActionInstance,
	PhotonInteractionActionPresentation,
	PhotonInteractionGuardDefinition,
	PhotonInteractionGuardEvaluationContext,
	PhotonInteractionGuardEvaluationResult,
	PhotonInteractionGuardEvaluatorMap,
	PhotonInteractionGuardInstance,
	PhotonInteractionExecutionResult,
	PhotonInteractionSettings,
	PhotonInteractionSurfaceDefinition,
	PhotonInteractionTriggerSlot,
	PhotonBlockDefinition,
	PhotonBlockInteractionSlotContext,
	PhotonResolvedInteractionActionCatalog,
	PhotonSiteSettings,
} from "../types";
import { resolvePhotonInteractionSurfaceCatalog } from "./interaction-surfaces";
import { dedupePoliciesById } from "./override-resolution";
import { isRecord } from "./path";

export const PHOTON_INTERACTIONS_SITE_SETTING_KEY = "interactions";

const normalizeRecordMap = <T extends { id?: string }>(
	value: unknown,
): Record<string, T & { id: string }> => {
	if (!isRecord(value)) {
		return {};
	}

	return Object.fromEntries(
		Object.entries(value)
			.filter(
				(entry): entry is [string, Record<string, unknown>] =>
					isRecord(entry[1]),
			)
			.map(([key, item]) => {
				const id =
					typeof item.id === "string" && item.id.trim() ? item.id : key;

				return [id, { ...(item as T), id }];
			}),
	);
};

const normalizeTriggerBindings = (
	value: unknown,
): NonNullable<PhotonInteractionSettings["triggerBindings"]> => {
	if (!isRecord(value)) {
		return {};
	}

	return Object.fromEntries(
		Object.entries(value)
			.filter(
				(entry): entry is [string, Record<string, unknown>] =>
					isRecord(entry[1]),
			)
			.map(([key, item]) => {
				const slotId =
					typeof item.slotId === "string" && item.slotId.trim()
						? item.slotId
						: key;

				return [slotId, { ...item, slotId }];
			}),
	);
};

const byOrderThenLabel = <
	T extends { order?: number; label?: string; id?: string },
>(
	left: T,
	right: T,
) =>
	(left.order ?? 0) - (right.order ?? 0) ||
	(left.label ?? left.id ?? "").localeCompare(right.label ?? right.id ?? "");

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

const mergeActionInstances = (
	defaults: PhotonInteractionActionInstance[],
	persisted: Record<string, PhotonInteractionActionInstance> | undefined,
) => {
	const merged = Object.fromEntries(defaults.map((item) => [item.id, item]));

	for (const [id, item] of Object.entries(persisted ?? {})) {
		const base = merged[id];

		merged[id] = {
			...(base ?? {}),
			...item,
			id,
			props: mergeRecords(base?.props, item.props),
			presentation: {
				...(base?.presentation ?? {}),
				...item.presentation,
			} as PhotonInteractionActionPresentation,
		};
	}

	return merged;
};

const mergeGuardInstances = (
	defaults: PhotonInteractionGuardInstance[],
	persisted: Record<string, PhotonInteractionGuardInstance> | undefined,
) => {
	const merged = Object.fromEntries(defaults.map((item) => [item.id, item]));

	for (const [id, item] of Object.entries(persisted ?? {})) {
		const base = merged[id];

		merged[id] = {
			...(base ?? {}),
			...item,
			id,
			props: mergeRecords(base?.props, item.props),
			action:
				base?.action || item.action
					? ({
							...(base?.action ?? {}),
							...(item.action ?? {}),
						} as PhotonInteractionActionPresentation)
					: undefined,
		};
	}

	return merged;
};

const createSurfaceBackedActionDefinitions = (
	surfaces: readonly PhotonInteractionSurfaceDefinition[] | undefined,
	siteSettings?: PhotonSiteSettings,
): PhotonInteractionActionDefinition[] =>
	(() => {
		const surfaceCatalog = resolvePhotonInteractionSurfaceCatalog({
			definitions: surfaces ?? [],
			siteSettings,
		});

		return (surfaces ?? [])
		.filter((definition) => definition.kind !== "toast")
		.map((definition) => ({
			id: `${definition.id}.action`,
			label: definition.label,
			labelKey: definition.labelKey,
			description: definition.description,
			descriptionKey: definition.descriptionKey,
			order: definition.order,
			fields: definition.fields,
			defaultInstances: Object.values(surfaceCatalog.instances)
				.filter((instance) => instance.definitionId === definition.id)
				.map((instance) => ({
					id: instance.id,
					definitionId: `${definition.id}.action`,
					label: instance.label,
					labelKey: instance.labelKey,
					enabled: instance.enabled,
					props: instance.props,
					presentation: {
						type: "surface" as const,
						surfaceInstanceId: instance.id,
					},
				})),
		}));
	})();

export const createPhotonInteractionActionDefinition = (
	definition: PhotonInteractionActionDefinition,
): PhotonInteractionActionDefinition => definition;

export const createPhotonInteractionGuardDefinition = (
	definition: PhotonInteractionGuardDefinition,
): PhotonInteractionGuardDefinition => definition;

export const createPhotonInteractionTriggerSlot = (
	slot: PhotonInteractionTriggerSlot,
): PhotonInteractionTriggerSlot => slot;

export const resolvePhotonBlockInteractionSlots = (
	definition: PhotonBlockDefinition | undefined,
	context: PhotonBlockInteractionSlotContext,
): PhotonInteractionTriggerSlot[] => {
	const slots = definition?.interactionSlots;

	if (!slots) {
		return [];
	}

	return typeof slots === "function" ? slots(context) : slots;
};

export const readPhotonInteractionSettings = (
	siteSettings: PhotonSiteSettings | undefined,
): PhotonInteractionSettings => {
	const rawSettings = siteSettings?.[PHOTON_INTERACTIONS_SITE_SETTING_KEY];

	if (!isRecord(rawSettings)) {
		return {};
	}

	return {
		actionInstances: normalizeRecordMap<PhotonInteractionActionInstance>(
			rawSettings.actionInstances,
		),
		triggerBindings: normalizeTriggerBindings(rawSettings.triggerBindings),
		guardInstances: normalizeRecordMap<PhotonInteractionGuardInstance>(
			rawSettings.guardInstances,
		),
		policies: normalizeRecordMap<PhotonActionPolicy>(rawSettings.policies),
		canvasStageOverrides: isRecord(rawSettings.canvasStageOverrides)
			? (rawSettings.canvasStageOverrides as PhotonInteractionSettings["canvasStageOverrides"])
			: undefined,
	};
};

export const resolvePhotonInteractionActionCatalog = ({
	actions,
	guards,
	surfaces,
	policies,
	siteSettings,
}: {
	actions?: readonly PhotonInteractionActionDefinition[];
	guards?: readonly PhotonInteractionGuardDefinition[];
	surfaces?: readonly PhotonInteractionSurfaceDefinition[];
	policies?: readonly PhotonActionPolicy[];
	siteSettings?: PhotonSiteSettings;
}): PhotonResolvedInteractionActionCatalog => {
	const persisted = readPhotonInteractionSettings(siteSettings);
	const sortedActions = [
		...createSurfaceBackedActionDefinitions(surfaces, siteSettings),
		...(actions ?? []),
	].sort(byOrderThenLabel);
	const sortedGuards = [...(guards ?? [])].sort(byOrderThenLabel);
	const actionsById = new Map(
		sortedActions.map((definition) => [definition.id, definition]),
	);
	const guardsById = new Map(
		sortedGuards.map((definition) => [definition.id, definition]),
	);
	const allPolicies = dedupePoliciesById([
		...(policies ?? []),
		...Object.values(persisted.policies ?? {}),
	]);
	const policiesById = new Map(allPolicies.map((p) => [p.id, p]));

	return {
		actions: sortedActions,
		actionsById,
		actionInstances: mergeActionInstances(
			sortedActions.flatMap((definition) => definition.defaultInstances ?? []),
			persisted.actionInstances,
		),
		guards: sortedGuards,
		guardsById,
		guardInstances: mergeGuardInstances(
			sortedGuards.flatMap((definition) => definition.defaultInstances ?? []),
			persisted.guardInstances,
		),
		triggerBindings: persisted.triggerBindings ?? {},
		policies: allPolicies,
		policiesById,
	};
};

export const resolvePhotonInteractionSlotAction = (
	slot: PhotonInteractionTriggerSlot,
	catalog: PhotonResolvedInteractionActionCatalog,
): PhotonInteractionActionPresentation | null => {
	const binding = catalog.triggerBindings[slot.id];

	if (binding?.enabled === false) {
		return null;
	}

	const actionInstanceId =
		binding?.actionInstanceId ?? slot.actionInstanceId ?? undefined;
	const actionInstance = actionInstanceId
		? catalog.actionInstances[actionInstanceId]
		: undefined;
	const presentation = actionInstance?.presentation ?? slot.action;

	if (!presentation || actionInstance?.enabled === false) {
		return null;
	}

	if (presentation.type !== "surface" || !binding?.overrides) {
		return presentation;
	}

	return {
		...presentation,
		overrides: {
			...(presentation.overrides ?? {}),
			...binding.overrides,
		},
	};
};

export const resolvePhotonInteractionSlotGuards = (
	slot: PhotonInteractionTriggerSlot,
	catalog: PhotonResolvedInteractionActionCatalog,
): PhotonInteractionGuardInstance[] => {
	const binding = catalog.triggerBindings[slot.id];
	const guardIds = binding?.guardInstanceIds ?? slot.guardInstanceIds ?? [];

	return guardIds
		.map((id) => catalog.guardInstances[id])
		.filter((guard): guard is PhotonInteractionGuardInstance =>
			Boolean(guard && guard.enabled !== false),
		);
};

export const createPhotonInteractionExecutionResult = (
	result: PhotonInteractionExecutionResult,
): PhotonInteractionExecutionResult => result;

export const photonInteractionExecutionSucceeded = (
	result: PhotonInteractionExecutionResult,
) => result.executed;

const followInteractionFallback = (
	fallbackHref: string | undefined,
	handlers: PhotonInteractionActionExecutionHandlers,
) => {
	if (!fallbackHref) {
		return false;
	}

	if (handlers.navigate) {
		void handlers.navigate(fallbackHref);
	} else if (typeof window !== "undefined") {
		window.location.assign(fallbackHref);
	} else {
		return false;
	}

	return true;
};

export const executePhotonInteractionActionPresentation = (
	action: PhotonInteractionActionPresentation | undefined | null,
	handlers: PhotonInteractionActionExecutionHandlers,
): PhotonInteractionExecutionResult => {
	if (!action) {
		return {
			status: "missing-action",
			executed: false,
			action: null,
		};
	}

	if (action.type === "surface") {
		const opened = handlers.openInteractionSurface(action);

		if (opened) {
			return {
				status: "executed",
				executed: true,
				action,
			};
		}

		if (followInteractionFallback(action.fallbackHref, handlers)) {
			return {
				status: "fallback",
				executed: true,
				action,
				fallbackHref: action.fallbackHref,
			};
		}

		return {
			status: "missing-renderer",
			executed: false,
			action,
			fallbackHref: action.fallbackHref,
		};
	}

	if (action.type === "toast") {
		const shown = handlers.showInteractionToast({
			templateId: action.templateId,
			overrides: action.overrides,
		});

		return {
			status: shown ? "executed" : "missing-action",
			executed: shown,
			action,
		};
	}

	if (handlers.navigate) {
		void handlers.navigate(action.href);
	} else if (typeof window !== "undefined") {
		window.location.assign(action.href);
	} else {
		return {
			status: "missing-action",
			executed: false,
			action,
			fallbackHref: action.href,
		};
	}

	return {
		status: "executed",
		executed: true,
		action,
	};
};

const normalizeGuardEvaluationResult = (
	result: ReturnType<NonNullable<PhotonInteractionGuardEvaluatorMap[string]>>,
	guard: PhotonInteractionGuardInstance,
): PhotonInteractionGuardEvaluationResult => {
	if (result === false) {
		return {
			status: "blocked",
			action: guard.action,
		};
	}

	if (result && typeof result === "object") {
		return result;
	}

	return {
		status: "allowed",
	};
};

export const evaluatePhotonInteractionGuards = ({
	guards,
	evaluators,
	context,
}: {
	guards: readonly PhotonInteractionGuardInstance[];
	evaluators?: PhotonInteractionGuardEvaluatorMap;
	context: Omit<PhotonInteractionGuardEvaluationContext, "guard" | "definition"> & {
		catalog: PhotonResolvedInteractionActionCatalog;
	};
}): PhotonInteractionGuardEvaluationResult => {
	for (const guard of guards) {
		const definition = context.catalog.guardsById.get(guard.definitionId);
		const evaluator = evaluators?.[guard.definitionId];

		if (!evaluator) {
			if (definition?.missingEvaluatorPolicy === "allow") {
				continue;
			}

			return {
				status: "blocked",
				reason: "missing-evaluator",
				action: guard.action,
			};
		}

		const result = normalizeGuardEvaluationResult(
			evaluator({
				...context,
				guard,
				definition,
			}),
			guard,
		);

		if (result.status === "blocked") {
			return {
				...result,
				action: result.action ?? guard.action,
			};
		}
	}

	return {
		status: "allowed",
	};
};

export const executePhotonInteractionTriggerSlot = ({
	slot,
	catalog,
	evaluators,
	context,
	handlers,
}: {
	slot: PhotonInteractionTriggerSlot;
	catalog: PhotonResolvedInteractionActionCatalog;
	evaluators?: PhotonInteractionGuardEvaluatorMap;
	context: Omit<
		PhotonInteractionGuardEvaluationContext,
		"guard" | "definition" | "slot" | "action"
	>;
	handlers: PhotonInteractionActionExecutionHandlers;
}): PhotonInteractionExecutionResult => {
	const action = resolvePhotonInteractionSlotAction(slot, catalog);
	const guards = resolvePhotonInteractionSlotGuards(slot, catalog);
	const guardResult = evaluatePhotonInteractionGuards({
		guards,
		evaluators,
		context: {
			...context,
			slot,
			action,
			catalog,
		},
	});

	if (guardResult.status === "blocked") {
		const fallbackAction =
			guardResult.action ??
			(action?.type === "surface" && action.fallbackHref
				? {
						type: "link" as const,
						href: action.fallbackHref,
					}
				: undefined);
		const execution = executePhotonInteractionActionPresentation(
			fallbackAction,
			handlers,
		);

		return {
			...execution,
			status:
				guardResult.reason === "missing-evaluator"
					? "missing-evaluator"
					: "blocked",
			reason: guardResult.reason,
			action: fallbackAction ?? null,
		};
	}

	return executePhotonInteractionActionPresentation(action, handlers);
};
