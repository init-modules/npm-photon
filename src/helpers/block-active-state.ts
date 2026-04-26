import type {
	PhotonActionStateDefinition,
	PhotonAnyBlockDefinition,
	PhotonConditionDefinition,
	PhotonConditionEvaluationContext,
	PhotonConditionEvaluatorMap,
	PhotonInteractionPreviewScenario,
} from "../types";
import { evaluateConditionExpression } from "./action-policy";
import {
	evaluatePhotonConditionForMode,
	type PhotonConditionResolutionMode,
} from "./condition-resolution";

export type PhotonBlockActiveStateInput = {
	definition: PhotonAnyBlockDefinition | undefined;
	evaluators?: PhotonConditionEvaluatorMap;
	context?: PhotonConditionEvaluationContext;
	previewScenarioId?: string | null;
	/**
	 * Resolution mode. When `"server"`, conditions whose
	 * `PhotonConditionDefinition.resolution === "client"` short-circuit
	 * to `null` and the resolver picks the `defaultServerPreviewState`
	 * (or `isDefaultServerState`) — eliminates auth-flash on first paint.
	 * Defaults to `"any"` (legacy behavior, all axes evaluated).
	 */
	mode?: PhotonConditionResolutionMode;
	conditionDefinitions?: readonly PhotonConditionDefinition[];
};

export type PhotonBlockActiveStateResolution = {
	state: PhotonActionStateDefinition | null;
	scenario: PhotonInteractionPreviewScenario | null;
	source: "preview" | "condition" | "default-server" | "fallback" | "none";
};

const findScenarioById = (
	definition: PhotonAnyBlockDefinition | undefined,
	scenarioId: string | null | undefined,
): PhotonInteractionPreviewScenario | null => {
	if (!definition || !scenarioId) {
		return null;
	}
	return (
		definition.previewScenarios?.find((s) => s.id === scenarioId) ?? null
	);
};

const findStateById = (
	definition: PhotonAnyBlockDefinition | undefined,
	stateId: string | null | undefined,
): PhotonActionStateDefinition | null => {
	if (!definition || !stateId) {
		return null;
	}
	return definition.states?.find((s) => s.id === stateId) ?? null;
};

const pickConditionState = (
	definition: PhotonAnyBlockDefinition,
	evaluators: PhotonConditionEvaluatorMap,
	context: PhotonConditionEvaluationContext,
	mode: PhotonConditionResolutionMode,
	conditionDefinitions: readonly PhotonConditionDefinition[],
): {
	state: PhotonActionStateDefinition | null;
	hasUnresolved: boolean;
} => {
	const states = definition.states ?? [];
	let hasUnresolved = false;

	for (const state of states) {
		if (!state.condition) {
			continue;
		}
		const result =
			mode === "any"
				? evaluateConditionExpression(state.condition, evaluators, context)
				: evaluatePhotonConditionForMode(
						state.condition,
						evaluators,
						context,
						conditionDefinitions,
						mode,
					);
		if (result === true) {
			return { state, hasUnresolved };
		}
		if (result === null) {
			hasUnresolved = true;
		}
	}

	return { state: null, hasUnresolved };
};

const pickServerDefault = (
	definition: PhotonAnyBlockDefinition,
	conditionDefinitions: readonly PhotonConditionDefinition[],
): PhotonActionStateDefinition | null => {
	const states = definition.states ?? [];
	const explicit = states.find((s) => s.isDefaultServerState);
	if (explicit) {
		return explicit;
	}
	// Walk every state's `ref` condition; if its definition declares a
	// defaultServerPreviewStateId, look up that target state and return it.
	for (const state of states) {
		const condition = state.condition;
		if (!condition || condition.type !== "ref") continue;
		const conditionDef = conditionDefinitions.find(
			(d) => d.id === condition.conditionId,
		);
		const targetId = conditionDef?.defaultServerPreviewStateId;
		if (!targetId) continue;
		const target = states.find((s) => s.id === targetId);
		if (target) return target;
	}
	return states.find((s) => !s.condition) ?? null;
};

/**
 * Resolves the active state for a block based on:
 * 1. Builder preview override (`previewScenarioId`) — wins if a matching state
 *    or scenario exists, used for inspector state-switcher in builder mode.
 * 2. First state whose `condition` evaluates `true`.
 * 3. The state marked `isDefaultServerState` (or referenced via
 *    `conditionDefinition.defaultServerPreviewStateId`, or first
 *    unconditional state) when client-only conditions are unresolved.
 * 4. `null` when the block has no states/scenarios at all.
 *
 * SSR usage: pass `mode: "server"` with `conditionDefinitions`.
 * Conditions whose `resolution === "client"` short-circuit; resolver
 * falls back to default-server-preview-state for first paint without
 * auth-flash. After hydration, re-resolve with `mode: "any"`.
 *
 * Block components consume this via `usePhotonBlockActiveState(blockId)`.
 */
export const resolvePhotonBlockActiveState = ({
	definition,
	evaluators,
	context,
	previewScenarioId,
	mode = "any",
	conditionDefinitions = [],
}: PhotonBlockActiveStateInput): PhotonBlockActiveStateResolution => {
	if (!definition) {
		return { state: null, scenario: null, source: "none" };
	}

	if (previewScenarioId) {
		const matchingState = findStateById(definition, previewScenarioId);
		if (matchingState) {
			const matchingScenario = findScenarioById(definition, previewScenarioId);
			return {
				state: matchingState,
				scenario: matchingScenario,
				source: "preview",
			};
		}
		const matchingScenario = findScenarioById(definition, previewScenarioId);
		if (matchingScenario) {
			return { state: null, scenario: matchingScenario, source: "preview" };
		}
	}

	const hasStates = (definition.states?.length ?? 0) > 0;
	const hasScenarios = (definition.previewScenarios?.length ?? 0) > 0;

	if (!hasStates && !hasScenarios) {
		return { state: null, scenario: null, source: "none" };
	}

	if (hasStates && evaluators && context) {
		const picked = pickConditionState(
			definition,
			evaluators,
			context,
			mode,
			conditionDefinitions,
		);
		if (picked.state) {
			return { state: picked.state, scenario: null, source: "condition" };
		}
		if (picked.hasUnresolved) {
			const serverDefault = pickServerDefault(
				definition,
				conditionDefinitions,
			);
			if (serverDefault) {
				return {
					state: serverDefault,
					scenario: null,
					source: "default-server",
				};
			}
		}
	}

	const fallbackState = hasStates
		? pickServerDefault(definition, conditionDefinitions)
		: null;
	if (fallbackState) {
		return { state: fallbackState, scenario: null, source: "fallback" };
	}

	const firstScenario = definition.previewScenarios?.[0] ?? null;
	if (firstScenario) {
		return { state: null, scenario: firstScenario, source: "fallback" };
	}

	return { state: null, scenario: null, source: "none" };
};
