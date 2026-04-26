import type {
	PhotonActionPlan,
	PhotonActionPlanStep,
	PhotonActionPolicy,
	PhotonConditionEvaluationContext,
	PhotonConditionEvaluatorMap,
	PhotonConditionExpression,
	PhotonInteractionGuardDefinition,
	PhotonInteractionGuardInstance,
} from "../types";

const MAX_PLAN_DEPTH = 10;

export const evaluateConditionExpression = (
	expr: PhotonConditionExpression,
	evaluators: PhotonConditionEvaluatorMap,
	context: PhotonConditionEvaluationContext,
): boolean | null => {
	switch (expr.type) {
		case "ref": {
			const fn = evaluators[expr.conditionId];
			if (!fn) {
				return null;
			}
			const result = fn(context);
			if (result === undefined) {
				return null;
			}
			return result ?? null;
		}
		case "and": {
			let hasNull = false;
			for (const operand of expr.operands) {
				const r = evaluateConditionExpression(operand, evaluators, context);
				if (r === false) {
					return false;
				}
				if (r === null) {
					hasNull = true;
				}
			}
			return hasNull ? null : true;
		}
		case "or": {
			let hasNull = false;
			for (const operand of expr.operands) {
				const r = evaluateConditionExpression(operand, evaluators, context);
				if (r === true) {
					return true;
				}
				if (r === null) {
					hasNull = true;
				}
			}
			return hasNull ? null : false;
		}
		case "not": {
			const r = evaluateConditionExpression(expr.operand, evaluators, context);
			if (r === null) {
				return null;
			}
			return !r;
		}
		case "eq": {
			const parts = expr.path.split(".");
			let val: unknown = context;
			for (const part of parts) {
				if (val == null || typeof val !== "object") {
					return false;
				}
				val = (val as Record<string, unknown>)[part];
			}
			return val === expr.value;
		}
	}
};

type BuildContext = {
	policies: PhotonActionPolicy[];
	evaluators: PhotonConditionEvaluatorMap;
	conditionContext: PhotonConditionEvaluationContext;
	visited: Set<string>;
	warnings: string[];
};

const buildSteps = (
	actionInstanceId: string,
	ctx: BuildContext,
	depth: number,
): PhotonActionPlanStep[] => {
	if (depth > MAX_PLAN_DEPTH) {
		ctx.warnings.push(`Max depth exceeded at action: ${actionInstanceId}`);
		return [];
	}
	if (ctx.visited.has(actionInstanceId)) {
		ctx.warnings.push(`Cycle detected at action: ${actionInstanceId}`);
		return [];
	}

	ctx.visited.add(actionInstanceId);

	const matching = ctx.policies
		.filter((p) => p.targetActionId === actionInstanceId)
		.sort(
			(a, b) =>
				(a.priority ?? 0) - (b.priority ?? 0) ||
				a.packageName.localeCompare(b.packageName),
		);

	const result: PhotonActionPlanStep[] = [];

	for (const policy of matching) {
		const condResult = evaluateConditionExpression(
			policy.when,
			ctx.evaluators,
			ctx.conditionContext,
		);

		if (condResult === false) {
			continue;
		}

		if (condResult === null && policy.securityMode === "fail-closed") {
			ctx.warnings.push(
				`fail-closed policy ${policy.id}: evaluator missing or unresolved`,
			);
			continue;
		}

		const prereqSteps = buildSteps(policy.run, ctx, depth + 1);
		result.push(...prereqSteps, {
			actionInstanceId: policy.run,
			policyId: policy.id,
		});
	}

	ctx.visited.delete(actionInstanceId);
	return result;
};

export const buildActionPlan = (
	targetActionInstanceId: string,
	policies: PhotonActionPolicy[],
	evaluators: PhotonConditionEvaluatorMap,
	conditionContext: PhotonConditionEvaluationContext,
): PhotonActionPlan => {
	const ctx: BuildContext = {
		policies,
		evaluators,
		conditionContext,
		visited: new Set(),
		warnings: [],
	};

	const rawSteps = buildSteps(targetActionInstanceId, ctx, 0);

	const seen = new Set<string>();
	const dedupedSteps: PhotonActionPlanStep[] = [];
	for (const step of rawSteps) {
		if (seen.has(step.actionInstanceId)) {
			continue;
		}
		seen.add(step.actionInstanceId);
		dedupedSteps.push(step);
	}

	const hasCycles = ctx.warnings.some((w) => w.startsWith("Cycle detected"));

	return {
		targetActionInstanceId,
		steps: dedupedSteps,
		hasCycles,
		warnings: ctx.warnings,
	};
};

export const mapGuardsToActionPolicies = (
	guardInstances: PhotonInteractionGuardInstance[],
	_guardDefinitions: PhotonInteractionGuardDefinition[],
	options?: { targetActionId?: string; runActionInstanceId?: string },
): PhotonActionPolicy[] =>
	guardInstances
		.filter((g) => g.enabled !== false)
		.map((g) => {
			const presentation = g.action;
			let runId = options?.runActionInstanceId ?? "";
			if (!runId && presentation && presentation.type === "surface") {
				runId = presentation.surfaceInstanceId ?? "";
			}
			return {
				id: `bridge:guard:${g.id}`,
				packageName: "photon-bridge",
				targetActionId: options?.targetActionId ?? "",
				when: { type: "ref", conditionId: g.definitionId },
				run: runId,
				scope: "site",
				enforcement: "client-hint",
				securityMode: "fail-open",
			} satisfies PhotonActionPolicy;
		});
