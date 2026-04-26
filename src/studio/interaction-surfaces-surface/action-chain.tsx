"use client";

import { useMemo } from "react";
import { buildActionPlan } from "../../helpers/action-policy";
import type {
	PhotonActionPolicy,
	PhotonConditionEvaluatorMap,
	PhotonResolvedInteractionActionCatalog,
} from "../../types";

type Props = {
	targetActionId: string;
	policies: PhotonActionPolicy[];
	conditionEvaluators: PhotonConditionEvaluatorMap;
	actionCatalog: PhotonResolvedInteractionActionCatalog;
};

const cardStyle = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-panel-muted)",
	color: "var(--photon-builder-text)",
};

const arrowStyle = {
	color: "var(--photon-builder-text-muted)",
};

const warningStyle = {
	borderColor: "rgba(248, 113, 113, 0.4)",
	background: "rgba(127, 29, 29, 0.25)",
	color: "rgb(254, 202, 202)",
};

export const ActionChain = ({
	targetActionId,
	policies,
	conditionEvaluators,
	actionCatalog,
}: Props) => {
	const plan = useMemo(
		() =>
			buildActionPlan(targetActionId, policies, conditionEvaluators, {
				siteSettings: {},
			}),
		[targetActionId, policies, conditionEvaluators],
	);

	const labelFor = (instanceId: string) =>
		actionCatalog.actionInstances[instanceId]?.label ?? instanceId;

	const targetLabel =
		actionCatalog.actionsById.get(targetActionId)?.label ?? targetActionId;

	const steps = plan.steps;

	if (plan.hasCycles) {
		return (
			<div
				className="rounded-[20px] border p-4 text-sm"
				style={warningStyle}
				data-testid="photon-action-chain-cycle-warning"
			>
				Cycle detected in action plan: {plan.warnings.join("; ")}
			</div>
		);
	}

	if (steps.length === 0) {
		return (
			<div
				className="rounded-[20px] border p-4 text-sm italic"
				style={cardStyle}
			>
				No prerequisites — runs directly.
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2" data-testid="photon-action-chain">
			<div className="rounded-[20px] border p-3 text-sm" style={cardStyle}>
				<div className="text-xs uppercase tracking-wide opacity-70">
					Trigger
				</div>
				<div className="font-semibold">Click</div>
			</div>
			{steps.map((step) => (
				<div key={step.policyId} className="flex flex-col items-center gap-2">
					<div className="text-xl" style={arrowStyle}>
						↓
					</div>
					<div
						className="w-full rounded-[20px] border p-3 text-sm"
						style={cardStyle}
					>
						<div className="text-xs uppercase tracking-wide opacity-70">
							Prerequisite
						</div>
						<div className="font-semibold">{labelFor(step.actionInstanceId)}</div>
						<div className="mt-1 text-xs opacity-60">
							via policy: <code>{step.policyId}</code>
						</div>
					</div>
				</div>
			))}
			<div className="flex flex-col items-center gap-2">
				<div className="text-xl" style={arrowStyle}>
					↓
				</div>
				<div
					className="w-full rounded-[20px] border-2 p-3 text-sm"
					style={cardStyle}
				>
					<div className="text-xs uppercase tracking-wide opacity-70">
						Target
					</div>
					<div className="font-semibold">{targetLabel}</div>
				</div>
			</div>
		</div>
	);
};
