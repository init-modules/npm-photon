import type {
	PhotonConditionDefinition,
	PhotonConditionExpression,
} from "../../types";

export const formatConditionExpression = (
	expr: PhotonConditionExpression,
	byId: Map<string, PhotonConditionDefinition>,
): string => {
	switch (expr.type) {
		case "ref":
			return byId.get(expr.conditionId)?.label ?? expr.conditionId;
		case "and":
			return expr.operands
				.map((op) => formatConditionExpression(op, byId))
				.join(" AND ");
		case "or":
			return expr.operands
				.map((op) => formatConditionExpression(op, byId))
				.join(" OR ");
		case "not":
			return `NOT (${formatConditionExpression(expr.operand, byId)})`;
		case "eq":
			return `${expr.path} = ${JSON.stringify(expr.value)}`;
	}
};

export const cardStyle = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-panel-muted)",
	color: "var(--photon-builder-text)",
};

export const fieldStyle = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-field)",
	color: "var(--photon-builder-text)",
};

export const activeStyle = {
	borderColor: "var(--photon-builder-border-strong)",
	background: "var(--photon-builder-card-selected)",
	color: "var(--photon-builder-text)",
};

export const subtleStyle = {
	color: "var(--photon-builder-text-muted)",
};

export const badgeStyle = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-field)",
	color: "var(--photon-builder-text-muted)",
};
