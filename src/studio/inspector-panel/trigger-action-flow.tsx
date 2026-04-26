"use client";

import { ChevronRight, Pencil } from "lucide-react";
import { useMemo, useState } from "react";
import { usePhotonStore } from "../../context/photon-context";
import {
	PHOTON_INTERACTIONS_SITE_SETTING_KEY,
	planPhotonInteractionTriggerSlot,
	readPhotonInteractionSettings,
	resolvePhotonInteractionActionCatalog,
} from "../../helpers/interactions";
import type {
	PhotonActionPolicy,
	PhotonConditionExpression,
	PhotonInteractionActionInstance,
	PhotonInteractionTriggerSlot,
} from "../../types";

type TriggerActionFlowProps = {
	slot: PhotonInteractionTriggerSlot;
};

/**
 * Inspector chain view: renders the prerequisite → target action plan
 * for the current trigger slot. Each row shows the action instance's
 * label + props inline (so the user can see "Sign in to publish" copy
 * directly without switching screens), plus an "Open instance" link
 * that surfaces the instance for full editing.
 *
 * Replaces the flat `PolicyRow` list with a readable cascade that
 * mirrors the runtime execution order.
 */
const cardStyle = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-panel-solid)",
};

const targetCardStyle = {
	borderColor: "var(--photon-builder-border-strong)",
	background: "var(--photon-builder-accent-strong)",
	color: "var(--photon-builder-accent)",
};

const subtleStyle = { color: "var(--photon-builder-text-soft)" };
const mutedStyle = { color: "var(--photon-builder-text-muted)" };

const formatCondition = (expr: PhotonConditionExpression | undefined): string => {
	if (!expr) {
		return "always";
	}
	switch (expr.type) {
		case "ref":
			return expr.conditionId;
		case "and":
			return expr.operands.map(formatCondition).join(" AND ");
		case "or":
			return expr.operands.map(formatCondition).join(" OR ");
		case "not":
			return `NOT (${formatCondition(expr.operand)})`;
		case "eq":
			return `${expr.path} == ${JSON.stringify(expr.value)}`;
	}
};

const instancePropPreview = (
	instance: PhotonInteractionActionInstance | undefined,
): string | null => {
	if (!instance?.props) {
		return null;
	}
	const candidates = ["title", "description", "label"];
	for (const key of candidates) {
		const value = instance.props[key];
		if (typeof value === "string" && value.trim()) {
			return value;
		}
	}
	return null;
};

type InstancePropEntry = {
	key: string;
	value: string | number | boolean;
	kind: "string" | "number" | "boolean";
};

const editableInstanceProps = (
	instance: PhotonInteractionActionInstance | undefined,
): InstancePropEntry[] => {
	if (!instance?.props) {
		return [];
	}
	const entries: InstancePropEntry[] = [];
	for (const [key, value] of Object.entries(instance.props)) {
		if (typeof value === "string") {
			entries.push({ key, value, kind: "string" });
		} else if (typeof value === "number") {
			entries.push({ key, value, kind: "number" });
		} else if (typeof value === "boolean") {
			entries.push({ key, value, kind: "boolean" });
		}
	}
	return entries.sort((a, b) => a.key.localeCompare(b.key));
};

const InstanceRow = ({
	instance,
	policy,
	role,
	onOpenInstance,
	onUpdateInstanceProp,
}: {
	instance: PhotonInteractionActionInstance | undefined;
	policy?: PhotonActionPolicy;
	role: "prerequisite" | "target";
	onOpenInstance: (instanceId: string) => void;
	onUpdateInstanceProp: (
		instanceId: string,
		propKey: string,
		value: string | number | boolean,
	) => void;
}) => {
	const [open, setOpen] = useState(false);
	const isTarget = role === "target";
	const label = instance?.label ?? policy?.run ?? "(missing instance)";
	const propPreview = instancePropPreview(instance);
	const conditionLabel = policy ? formatCondition(policy.when) : null;
	const isBridge = policy?.id.startsWith("bridge:guard:") ?? false;

	return (
		<div
			className="rounded-2xl border text-xs"
			style={isTarget ? targetCardStyle : cardStyle}
			data-testid={
				isTarget
					? "photon-trigger-action-flow-target"
					: `photon-trigger-action-flow-step-${policy?.id ?? "unknown"}`
			}
		>
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left"
			>
				<ChevronRight
					size={14}
					style={{
						transform: open ? "rotate(90deg)" : "rotate(0deg)",
						transition: "transform 120ms ease",
					}}
				/>
				<div className="flex flex-1 flex-col gap-0.5">
					<div className="flex items-center gap-2">
						<span className="font-semibold">{label}</span>
						{conditionLabel ? (
							<span style={subtleStyle}>when {conditionLabel}</span>
						) : null}
					</div>
					{propPreview ? (
						<div className="truncate" style={mutedStyle} title={propPreview}>
							"{propPreview}"
						</div>
					) : null}
				</div>
				{isBridge ? (
					<span
						className="font-mono text-[9px] uppercase tracking-[0.18em]"
						style={subtleStyle}
					>
						legacy guard
					</span>
				) : null}
			</button>
			{open ? (
				<div
					className="space-y-3 border-t px-3 py-2"
					style={{
						borderColor: "var(--photon-builder-border)",
					}}
				>
					{instance ? (
						<div className="space-y-2">
							<div
								className="text-[10px] uppercase tracking-[0.18em]"
								style={subtleStyle}
							>
								Instance copy
							</div>
							{editableInstanceProps(instance).length === 0 ? (
								<div className="text-xs italic" style={mutedStyle}>
									No editable props on this instance.
								</div>
							) : (
								editableInstanceProps(instance).map((entry) => (
									<label
										key={entry.key}
										className="flex flex-col gap-1 text-xs"
									>
										<span style={subtleStyle}>{entry.key}</span>
										{entry.kind === "boolean" ? (
											<input
												type="checkbox"
												checked={entry.value as boolean}
												onChange={(event) =>
													onUpdateInstanceProp(
														instance.id,
														entry.key,
														event.currentTarget.checked,
													)
												}
												data-testid={`photon-trigger-action-flow-prop-${instance.id}-${entry.key}`}
											/>
										) : entry.kind === "number" ? (
											<input
												type="number"
												defaultValue={entry.value as number}
												onBlur={(event) =>
													onUpdateInstanceProp(
														instance.id,
														entry.key,
														Number(event.currentTarget.value),
													)
												}
												className="rounded-[10px] border px-2 py-1 text-xs"
												style={{
													borderColor: "var(--photon-builder-border)",
													background: "var(--photon-builder-panel-solid)",
													color: "var(--photon-builder-text)",
												}}
												data-testid={`photon-trigger-action-flow-prop-${instance.id}-${entry.key}`}
											/>
										) : (
											<input
												type="text"
												defaultValue={entry.value as string}
												onBlur={(event) =>
													onUpdateInstanceProp(
														instance.id,
														entry.key,
														event.currentTarget.value,
													)
												}
												className="rounded-[10px] border px-2 py-1 text-xs"
												style={{
													borderColor: "var(--photon-builder-border)",
													background: "var(--photon-builder-panel-solid)",
													color: "var(--photon-builder-text)",
												}}
												data-testid={`photon-trigger-action-flow-prop-${instance.id}-${entry.key}`}
											/>
										)}
									</label>
								))
							)}
						</div>
					) : null}
					<div
						className="space-y-1 font-mono text-[11px] leading-5"
						style={mutedStyle}
					>
						<div>instance: {instance?.id ?? policy?.run ?? "—"}</div>
						{policy ? (
							<>
								<div>policy: {policy.id}</div>
								<div>scope: {policy.scope}</div>
								{policy.priority !== undefined ? (
									<div>priority: {policy.priority}</div>
								) : null}
								<div>enforcement: {policy.enforcement ?? "client-hint"}</div>
							</>
						) : null}
					</div>
					{instance ? (
						<button
							type="button"
							onClick={(event) => {
								event.stopPropagation();
								onOpenInstance(instance.id);
							}}
							className="inline-flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-[10px] uppercase tracking-wide"
							style={{
								borderColor: "var(--photon-builder-border-strong)",
								color: "var(--photon-builder-text)",
							}}
							data-testid={`photon-trigger-action-flow-open-instance-${instance.id}`}
						>
							<Pencil size={10} /> Open instance
						</button>
					) : null}
				</div>
			) : null}
		</div>
	);
};

export const TriggerActionFlow = ({ slot }: TriggerActionFlowProps) => {
	const interactionActions = usePhotonStore(
		(state) => state.interactionActions,
	);
	const interactionGuards = usePhotonStore((state) => state.interactionGuards);
	const interactionSurfaces = usePhotonStore(
		(state) => state.interactionSurfaces,
	);
	const interactionPolicies = usePhotonStore(
		(state) => state.interactionPolicies,
	);
	const conditionEvaluators = usePhotonStore(
		(state) => state.conditionEvaluators,
	);
	const site = usePhotonStore((state) => state.site);
	const resources = usePhotonStore((state) => state.resources);
	const routeContextValues = usePhotonStore(
		(state) => state.routeContextValues,
	);
	const selectInteractionInstance = usePhotonStore(
		(state) => state.selectInteractionInstance,
	);
	const updateSiteSettingValue = usePhotonStore(
		(state) => state.updateSiteSettingValue,
	);

	const catalog = useMemo(
		() =>
			resolvePhotonInteractionActionCatalog({
				actions: interactionActions,
				guards: interactionGuards,
				surfaces: interactionSurfaces,
				policies: interactionPolicies,
				siteSettings: site.settings,
			}),
		[
			interactionActions,
			interactionGuards,
			interactionSurfaces,
			interactionPolicies,
			site.settings,
		],
	);

	const targetInstanceId =
		catalog.triggerBindings[slot.id]?.actionInstanceId ?? slot.actionInstanceId;
	const targetInstance = targetInstanceId
		? catalog.actionInstances[targetInstanceId]
		: undefined;

	const plan = useMemo(
		() =>
			planPhotonInteractionTriggerSlot({
				slot,
				catalog,
				conditionEvaluators,
				conditionContext: {
					siteSettings: site.settings,
					resources,
					routeContext: routeContextValues,
				},
			}),
		[
			slot,
			catalog,
			conditionEvaluators,
			site.settings,
			resources,
			routeContextValues,
		],
	);

	const handleOpenInstance = (instanceId: string) => {
		selectInteractionInstance?.(instanceId);
	};

	const handleUpdateInstanceProp = (
		instanceId: string,
		propKey: string,
		value: string | number | boolean,
	) => {
		const settings = readPhotonInteractionSettings(site.settings);
		const existingInstance = settings.actionInstances?.[instanceId];
		const baseInstance =
			existingInstance ?? catalog.actionInstances[instanceId];
		if (!baseInstance) {
			return;
		}
		const nextInstances = {
			...(settings.actionInstances ?? {}),
			[instanceId]: {
				...baseInstance,
				id: baseInstance.id,
				props: {
					...(baseInstance.props ?? {}),
					[propKey]: value,
				},
			},
		};
		updateSiteSettingValue(
			`${PHOTON_INTERACTIONS_SITE_SETTING_KEY}.actionInstances`,
			nextInstances,
		);
	};

	if (!targetInstance) {
		return null;
	}

	const policiesById = new Map<string, PhotonActionPolicy>();
	for (const policy of catalog.policies) {
		policiesById.set(policy.id, policy);
	}

	const steps = plan?.steps ?? [];
	const showWarning =
		plan?.hasCycles ||
		(plan?.warnings.some((warning) => warning.startsWith("fail-closed")) ??
			false);

	return (
		<section
			className="space-y-2"
			data-testid={`photon-trigger-action-flow-${slot.id}`}
		>
			<div
				className="text-[10px] uppercase tracking-[0.22em]"
				style={subtleStyle}
			>
				Action flow
			</div>
			{showWarning ? (
				<div
					className="rounded-2xl border p-3 text-xs"
					style={{
						borderColor: "rgba(248, 113, 113, 0.4)",
						background: "rgba(127, 29, 29, 0.25)",
						color: "rgb(254, 202, 202)",
					}}
				>
					{plan?.hasCycles ? "Cycle detected. " : null}
					{plan?.warnings.join("; ")}
				</div>
			) : null}
			{steps.length === 0 ? (
				<div
					className="rounded-2xl border p-3 text-xs italic"
					style={{ ...cardStyle, ...mutedStyle }}
				>
					No prerequisites. Target action runs directly.
				</div>
			) : (
				steps.map((step) => {
					const policy = policiesById.get(step.policyId);
					const stepInstance = catalog.actionInstances[step.actionInstanceId];
					return (
						<InstanceRow
							key={step.policyId}
							instance={stepInstance}
							policy={policy}
							role="prerequisite"
							onOpenInstance={handleOpenInstance}
							onUpdateInstanceProp={handleUpdateInstanceProp}
						/>
					);
				})
			)}
			<InstanceRow
				instance={targetInstance}
				role="target"
				onOpenInstance={handleOpenInstance}
			/>
		</section>
	);
};
