"use client";

import { useMemo } from "react";
import { PhotonFieldEditorList } from "../../components/photon-field-editor-list";
import { PHOTON_INTERACTIONS_SITE_SETTING_KEY } from "../../helpers/interactions";
import { getValueAtPath } from "../../helpers/path";
import {
	createSitePolicyOverride,
	isSitePolicyOverride,
	sitePolicyPath,
} from "../../helpers/site-policy-overrides";
import type {
	PhotonActionPolicy,
	PhotonConditionDefinition,
	PhotonConditionEvaluatorMap,
	PhotonField,
	PhotonResolvedInteractionActionCatalog,
	PhotonSiteSettings,
} from "../../types";
import { ActionChain } from "./action-chain";
import {
	activeStyle,
	badgeStyle,
	cardStyle,
	fieldStyle,
	formatConditionExpression,
	subtleStyle,
} from "./shared";

type Props = {
	policies: PhotonActionPolicy[];
	actionCatalog: PhotonResolvedInteractionActionCatalog;
	conditionDefinitions: PhotonConditionDefinition[];
	conditionEvaluators: PhotonConditionEvaluatorMap;
	selectedPolicyId: string | null;
	onSelectPolicy: (id: string | null) => void;
	onSiteSettingChange: (path: string, value: unknown) => void;
	onSiteSettingFocus: (path: string) => void;
	siteSettings: PhotonSiteSettings;
};

const interactionPath = (suffix: string) =>
	`${PHOTON_INTERACTIONS_SITE_SETTING_KEY}.${suffix}`;

const instanceCopyFields: PhotonField[] = [
	{
		path: "label",
		label: "Label",
		kind: "text",
		group: "content",
		localization: "shared",
	},
	{
		path: "labelKey",
		label: "Label key (optional)",
		kind: "text",
		group: "content",
		localization: "shared",
	},
];

export const PoliciesPanel = ({
	policies,
	actionCatalog,
	conditionDefinitions,
	conditionEvaluators,
	selectedPolicyId,
	onSelectPolicy,
	onSiteSettingChange,
	onSiteSettingFocus,
	siteSettings,
}: Props) => {
	const conditionDefinitionsById = useMemo(
		() => new Map(conditionDefinitions.map((c) => [c.id, c])),
		[conditionDefinitions],
	);

	const selectedPolicy = useMemo(
		() => policies.find((p) => p.id === selectedPolicyId) ?? policies[0] ?? null,
		[policies, selectedPolicyId],
	);

	const hasSiteOverride = useMemo(
		() =>
			selectedPolicy
				? isSitePolicyOverride(selectedPolicy.id, siteSettings)
				: false,
		[selectedPolicy, siteSettings],
	);

	const runInstance = selectedPolicy
		? actionCatalog.actionInstances[selectedPolicy.run]
		: undefined;

	const targetLabel = selectedPolicy
		? actionCatalog.actionsById.get(selectedPolicy.targetActionId)?.label ??
			selectedPolicy.targetActionId
		: "";

	const conditionLabel = selectedPolicy
		? formatConditionExpression(selectedPolicy.when, conditionDefinitionsById)
		: "";

	if (policies.length === 0) {
		return (
			<div
				className="rounded-[20px] border p-6 text-sm italic"
				style={cardStyle}
				data-testid="photon-policies-panel-empty"
			>
				No policies registered. Packages contribute policies declaratively via
				their kit (interactionPolicies field).
			</div>
		);
	}

	return (
		<div
			className="grid gap-5"
			style={{ gridTemplateColumns: "minmax(0, 34%) minmax(0, 1fr)" }}
			data-testid="photon-policies-panel"
		>
			<div className="flex flex-col gap-2">
				<div className="text-xs uppercase tracking-wide" style={subtleStyle}>
					Policies
				</div>
				{policies.map((policy) => {
					const isActive = policy.id === selectedPolicy?.id;
					const policyTargetLabel =
						actionCatalog.actionsById.get(policy.targetActionId)?.label ??
						policy.targetActionId;
					const policyConditionLabel = formatConditionExpression(
						policy.when,
						conditionDefinitionsById,
					);
					return (
						<button
							key={policy.id}
							type="button"
							onClick={() => onSelectPolicy(policy.id)}
							className="flex cursor-pointer flex-col gap-1 rounded-[16px] border p-3 text-left text-sm"
							style={isActive ? activeStyle : fieldStyle}
							data-testid={`photon-policy-list-item-${policy.id}`}
						>
							<div className="font-semibold">{policyTargetLabel}</div>
							<div className="text-xs" style={subtleStyle}>
								when {policyConditionLabel}
							</div>
							<div className="flex gap-2 text-xs">
								<span
									className="rounded-full border px-2 py-0.5"
									style={badgeStyle}
								>
									{policy.scope}
								</span>
								<code className="opacity-60">{policy.id}</code>
							</div>
						</button>
					);
				})}
			</div>
			{selectedPolicy ? (
				<div className="flex flex-col gap-5">
					<div
						className="flex flex-col gap-2 rounded-[20px] border p-4"
						style={cardStyle}
					>
						<div className="text-xs uppercase tracking-wide" style={subtleStyle}>
							Policy
						</div>
						<div className="text-sm">
							When <strong>{conditionLabel}</strong>, run before{" "}
							<strong>{targetLabel}</strong>.
						</div>
						<div className="flex gap-2 text-xs">
							<span
								className="rounded-full border px-2 py-0.5"
								style={badgeStyle}
							>
								scope: {selectedPolicy.scope}
							</span>
							{selectedPolicy.priority !== undefined ? (
								<span
									className="rounded-full border px-2 py-0.5"
									style={badgeStyle}
								>
									priority: {selectedPolicy.priority}
								</span>
							) : null}
							{selectedPolicy.enforcement ? (
								<span
									className="rounded-full border px-2 py-0.5"
									style={badgeStyle}
								>
									{selectedPolicy.enforcement}
								</span>
							) : null}
							{selectedPolicy.securityMode ? (
								<span
									className="rounded-full border px-2 py-0.5"
									style={badgeStyle}
								>
									{selectedPolicy.securityMode}
								</span>
							) : null}
						</div>
						<div className="flex flex-wrap items-center gap-2">
							{hasSiteOverride ? (
								<>
									<span
										className="rounded-full border px-2 py-0.5 text-xs"
										style={badgeStyle}
										data-testid="photon-policy-site-override-badge"
									>
										site override active
									</span>
									<button
										type="button"
										className="cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold"
										style={fieldStyle}
										onClick={() =>
											onSiteSettingChange(
												sitePolicyPath(selectedPolicy.id),
												undefined,
											)
										}
										data-testid="photon-policy-reset-override"
									>
										Reset to package default
									</button>
								</>
							) : selectedPolicy.scope === "package-default" ? (
								<button
									type="button"
									className="cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold"
									style={fieldStyle}
									onClick={() =>
										onSiteSettingChange(
											sitePolicyPath(selectedPolicy.id),
											createSitePolicyOverride(selectedPolicy),
										)
									}
									data-testid="photon-policy-create-override"
								>
									Override at site
								</button>
							) : null}
						</div>
					</div>

					<div
						className="flex flex-col gap-3 rounded-[20px] border p-4"
						style={cardStyle}
						data-testid="photon-policy-runs-section"
					>
						<div className="text-xs uppercase tracking-wide" style={subtleStyle}>
							Runs
						</div>
						{runInstance ? (
							<>
								<div className="text-sm">
									Action instance: <code>{selectedPolicy.run}</code>
								</div>
								<PhotonFieldEditorList
									fields={instanceCopyFields}
									subjectId={`policy-instance-${selectedPolicy.run}`}
									getValue={(path) =>
										getValueAtPath(runInstance, path)
									}
									onChange={(path, value) =>
										onSiteSettingChange(
											interactionPath(
												`actionInstances.${selectedPolicy.run}.${path}`,
											),
											value,
										)
									}
									onFocus={(path) =>
										onSiteSettingFocus(
											interactionPath(
												`actionInstances.${selectedPolicy.run}.${path}`,
											),
										)
									}
								/>
							</>
						) : (
							<div className="text-sm italic" style={subtleStyle}>
								Action instance <code>{selectedPolicy.run}</code> not found in
								catalog.
							</div>
						)}
					</div>

					<div
						className="flex flex-col gap-3 rounded-[20px] border p-4"
						style={cardStyle}
					>
						<div className="text-xs uppercase tracking-wide" style={subtleStyle}>
							Chain preview
						</div>
						<ActionChain
							targetActionId={selectedPolicy.targetActionId}
							policies={policies}
							conditionEvaluators={conditionEvaluators}
							actionCatalog={actionCatalog}
						/>
					</div>
				</div>
			) : null}
		</div>
	);
};
