import type {
	PhotonActionStateDefinition,
	PhotonConditionDefinition,
	PhotonConditionEvaluationContext,
	PhotonConditionEvaluatorMap,
	PhotonConditionExpression,
	PhotonConditionResolution,
} from "../types";

export type PhotonConditionResolutionMode = "server" | "client" | "any";

/**
 * Walks a condition expression and returns the broadest resolution
 * axis required by all referenced conditions.
 *
 * - All refs resolve `server` or `both` → `server` (safe to evaluate on server)
 * - Any ref resolves `client` only → `client` (must wait for hydration)
 * - All refs resolve `both` → `both` (cheap on either side)
 * - Unknown refs → `client` (conservative, requires hydration to know)
 *
 * `eq` / structural operands have no resolution requirement (pure
 * comparison against context); they inherit `both`.
 */
export const resolvePhotonConditionAxis = (
	expr: PhotonConditionExpression | undefined,
	conditionDefinitions: readonly PhotonConditionDefinition[],
): PhotonConditionResolution => {
	if (!expr) {
		return "both";
	}
	const definitionsById = new Map(
		conditionDefinitions.map((definition) => [definition.id, definition]),
	);

	const walk = (node: PhotonConditionExpression): PhotonConditionResolution => {
		switch (node.type) {
			case "ref": {
				const definition = definitionsById.get(node.conditionId);
				if (!definition) {
					return "client";
				}
				return definition.resolution;
			}
			case "and":
			case "or":
				return mergeAxes(node.operands.map(walk));
			case "not":
				return walk(node.operand);
			case "eq":
				return "both";
		}
	};

	return walk(expr);
};

const mergeAxes = (
	axes: readonly PhotonConditionResolution[],
): PhotonConditionResolution => {
	let hasClient = false;
	let hasServer = false;
	for (const axis of axes) {
		if (axis === "client") {
			hasClient = true;
		} else if (axis === "server") {
			hasServer = true;
		}
	}
	if (hasClient) {
		return "client";
	}
	if (hasServer) {
		return "server";
	}
	return "both";
};

/**
 * SSR-aware safe evaluator. When `mode === "server"`, refs whose
 * `resolution === "client"` short-circuit to `null` (unresolved on server).
 * Other axes evaluate normally. The caller decides what to do with
 * `null` — typically: pick the `defaultServerPreviewState` for the
 * action/block.
 */
export const evaluatePhotonConditionForMode = (
	expr: PhotonConditionExpression,
	evaluators: PhotonConditionEvaluatorMap,
	context: PhotonConditionEvaluationContext,
	conditionDefinitions: readonly PhotonConditionDefinition[],
	mode: PhotonConditionResolutionMode,
): boolean | null => {
	const definitionsById = new Map(
		conditionDefinitions.map((definition) => [definition.id, definition]),
	);

	const walk = (node: PhotonConditionExpression): boolean | null => {
		switch (node.type) {
			case "ref": {
				if (mode === "server") {
					const definition = definitionsById.get(node.conditionId);
					if (!definition || definition.resolution === "client") {
						return null;
					}
				}
				const evaluator = evaluators[node.conditionId];
				if (!evaluator) {
					return null;
				}
				const result = evaluator(context);
				if (result === undefined) {
					return null;
				}
				return result ?? null;
			}
			case "and": {
				let hasNull = false;
				for (const operand of node.operands) {
					const r = walk(operand);
					if (r === false) return false;
					if (r === null) hasNull = true;
				}
				return hasNull ? null : true;
			}
			case "or": {
				let hasNull = false;
				for (const operand of node.operands) {
					const r = walk(operand);
					if (r === true) return true;
					if (r === null) hasNull = true;
				}
				return hasNull ? null : false;
			}
			case "not": {
				const r = walk(node.operand);
				return r === null ? null : !r;
			}
			case "eq": {
				const parts = node.path.split(".");
				let val: unknown = context;
				for (const part of parts) {
					if (val == null || typeof val !== "object") return false;
					val = (val as Record<string, unknown>)[part];
				}
				return val === node.value;
			}
		}
	};

	return walk(expr);
};

/**
 * Picks the active state for a list of `PhotonActionStateDefinition`
 * given a resolution mode (server/client/any).
 *
 * Resolution per 6.md §Action State + §Condition Resolution Axis:
 * 1. **Server mode** — first state whose condition is resolvable
 *    server-side AND evaluates `true`. If none resolve cleanly, picks
 *    the state marked `isDefaultServerState`, or the state referenced
 *    by `conditionDefinition.defaultServerPreviewStateId`, falling back
 *    to the first unconditional state.
 * 2. **Client mode** — first state whose condition evaluates `true`
 *    (all axes available).
 * 3. **Any mode** — same as client.
 *
 * Returns `null` when no state matches and no default exists.
 */
export const resolvePhotonActionStateForMode = ({
	states,
	conditionDefinitions,
	evaluators,
	context,
	mode,
}: {
	states: readonly PhotonActionStateDefinition[];
	conditionDefinitions: readonly PhotonConditionDefinition[];
	evaluators: PhotonConditionEvaluatorMap;
	context: PhotonConditionEvaluationContext;
	mode: PhotonConditionResolutionMode;
}): PhotonActionStateDefinition | null => {
	if (states.length === 0) {
		return null;
	}

	for (const state of states) {
		if (!state.condition) {
			continue;
		}
		const result = evaluatePhotonConditionForMode(
			state.condition,
			evaluators,
			context,
			conditionDefinitions,
			mode,
		);
		if (result === true) {
			return state;
		}
	}

	if (mode === "server") {
		// Server-side fallback chain
		const explicitDefault = states.find((s) => s.isDefaultServerState);
		if (explicitDefault) {
			return explicitDefault;
		}
		// Walk every state's ref condition; if its definition declares a
		// defaultServerPreviewStateId, return the target state.
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
	}

	return states.find((s) => !s.condition) ?? null;
};
