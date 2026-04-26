"use client";

import { useMemo } from "react";
import type {
	PhotonActionStateDefinition,
	PhotonConditionDefinition,
} from "../../types";
import {
	activeStyle,
	cardStyle,
	fieldStyle,
	formatConditionExpression,
	subtleStyle,
} from "./shared";

type Props = {
	states: PhotonActionStateDefinition[];
	conditionDefinitions: PhotonConditionDefinition[];
	selectedScenarioId: string | null;
	onSelectScenario: (id: string | null) => void;
};

export const ActionStateCards = ({
	states,
	conditionDefinitions,
	selectedScenarioId,
	onSelectScenario,
}: Props) => {
	const conditionDefinitionsById = useMemo(
		() => new Map(conditionDefinitions.map((c) => [c.id, c])),
		[conditionDefinitions],
	);

	if (states.length === 0) {
		return null;
	}

	return (
		<div
			className="flex flex-col gap-2 rounded-[20px] border p-4"
			style={cardStyle}
			data-testid="photon-action-state-cards"
		>
			<div className="text-xs uppercase tracking-wide" style={subtleStyle}>
				States
			</div>
			<div className="flex flex-wrap gap-2">
				{states.map((state) => {
					const isActive = state.id === selectedScenarioId;
					const conditionLabel = state.condition
						? formatConditionExpression(state.condition, conditionDefinitionsById)
						: null;
					return (
						<button
							key={state.id}
							type="button"
							onClick={() =>
								onSelectScenario(isActive ? null : state.id)
							}
							className="flex min-w-[8rem] cursor-pointer flex-col gap-1 rounded-[16px] border p-3 text-left text-sm"
							style={isActive ? activeStyle : fieldStyle}
							data-testid={`photon-action-state-card-${state.id}`}
						>
							<div className="font-semibold">{state.label}</div>
							{conditionLabel ? (
								<div className="text-xs" style={subtleStyle}>
									when {conditionLabel}
								</div>
							) : (
								<div className="text-xs italic" style={subtleStyle}>
									no condition
								</div>
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
};
