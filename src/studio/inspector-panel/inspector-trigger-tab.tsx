"use client";

import { useMemo, useState } from "react";
import { usePhotonStore } from "../../context/photon-context";
import { mapGuardsToActionPolicies } from "../../helpers/action-policy";
import {
	PHOTON_INTERACTIONS_SITE_SETTING_KEY,
	readPhotonInteractionSettings,
	resolvePhotonInteractionActionCatalog,
	resolvePhotonInteractionSlotAction,
	resolvePhotonBlockInteractionSlots,
} from "../../helpers/interactions";
import type {
	PhotonActionPolicy,
	PhotonBlock,
	PhotonInteractionTriggerSlot,
} from "../../types";
import { TriggerActionFlow } from "./trigger-action-flow";

type InspectorTriggerTabProps = {
	block: PhotonBlock;
	slot: PhotonInteractionTriggerSlot;
};

const interactionSettingPath = (suffix: string) =>
	`${PHOTON_INTERACTIONS_SITE_SETTING_KEY}.${suffix}`;

const PolicyRow = ({ policy }: { policy: PhotonActionPolicy }) => {
	const [open, setOpen] = useState(false);
	const conditionId =
		policy.when.type === "ref" ? policy.when.conditionId : policy.when.type;
	const isBridge = policy.id.startsWith("bridge:guard:");
	return (
		<div
			className="rounded-2xl border text-xs"
			style={{
				borderColor: "var(--photon-builder-border)",
				background: "var(--photon-builder-panel-solid)",
			}}
			data-testid={`photon-trigger-policy-${policy.id}`}
		>
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				className="flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left"
			>
				<span style={{ color: "var(--photon-builder-text)" }}>
					Run <strong>{policy.run || "(default)"}</strong> when {conditionId}
				</span>
				<span
					className="font-mono text-[10px] uppercase tracking-[0.18em]"
					style={{ color: "var(--photon-builder-text-soft)" }}
				>
					{isBridge ? "legacy guard · " : ""}
					{policy.scope}
					{policy.priority !== undefined ? ` · p${policy.priority}` : ""}
				</span>
			</button>
			{open ? (
				<div
					className="space-y-1 border-t px-3 py-2 font-mono text-[11px] leading-5"
					style={{
						borderColor: "var(--photon-builder-border)",
						color: "var(--photon-builder-text-muted)",
					}}
				>
					<div>id: {policy.id}</div>
					<div>package: {policy.packageName}</div>
					<div>target: {policy.targetActionId}</div>
					<div>enforcement: {policy.enforcement ?? "client-hint"}</div>
				</div>
			) : null}
		</div>
	);
};

export const InspectorTriggerTab = ({
	block,
	slot,
}: InspectorTriggerTabProps) => {
	const site = usePhotonStore((state) => state.site);
	const interactionSurfaces = usePhotonStore(
		(state) => state.interactionSurfaces,
	);
	const interactionActions = usePhotonStore(
		(state) => state.interactionActions,
	);
	const interactionGuards = usePhotonStore(
		(state) => state.interactionGuards,
	);
	const interactionPolicies = usePhotonStore(
		(state) => state.interactionPolicies,
	);
	const updateSiteSettingValue = usePhotonStore(
		(state) => state.updateSiteSettingValue,
	);
	const actionCatalog = useMemo(
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
			interactionPolicies,
			interactionSurfaces,
			site.settings,
		],
	);
	const action = resolvePhotonInteractionSlotAction(slot, actionCatalog);
	const interactionSettings = readPhotonInteractionSettings(site.settings);
	const currentBinding = interactionSettings.triggerBindings?.[slot.id] ?? {
		slotId: slot.id,
		actionInstanceId: slot.actionInstanceId,
		guardInstanceIds: slot.guardInstanceIds,
	};
	const actionInstanceOptions = Object.values(actionCatalog.actionInstances)
		.filter((instance) => instance.enabled !== false)
		.filter(
			(instance) =>
				!slot.allowedActionDefinitionIds?.length ||
				slot.allowedActionDefinitionIds.includes(instance.definitionId),
		)
		.sort((left, right) => left.label.localeCompare(right.label));
	const targetDefinitionId = action
		? Object.values(actionCatalog.actionInstances).find(
				(instance) => instance.id === currentBinding.actionInstanceId,
			)?.definitionId ?? slot.allowedActionDefinitionIds?.[0]
		: null;
	const policiesForAction = useMemo(() => {
		const direct = interactionPolicies.filter(
			(policy) => policy.targetActionId === targetDefinitionId,
		);
		const slotGuardIds =
			currentBinding.guardInstanceIds ?? slot.guardInstanceIds ?? [];
		const slotGuardInstances = slotGuardIds
			.map((id) => actionCatalog.guardInstances[id])
			.filter(
				(value): value is NonNullable<typeof value> => value !== undefined,
			);
		const bridgePolicies = slotGuardInstances.length
			? mapGuardsToActionPolicies(slotGuardInstances, interactionGuards, {
					targetActionId: targetDefinitionId ?? "",
					runActionInstanceId: currentBinding.actionInstanceId,
				})
			: [];
		return [...direct, ...bridgePolicies];
	}, [
		interactionPolicies,
		targetDefinitionId,
		currentBinding.guardInstanceIds,
		currentBinding.actionInstanceId,
		slot.guardInstanceIds,
		actionCatalog.guardInstances,
		interactionGuards,
	]);
	const canvasStageOverrides = interactionSettings.canvasStageOverrides ?? {};
	const persistTriggerBinding = (nextBinding: typeof currentBinding) => {
		updateSiteSettingValue(interactionSettingPath("triggerBindings"), {
			...(interactionSettings.triggerBindings ?? {}),
			[slot.id]: nextBinding,
		});
	};
	const clearCanvasStageOverrides = () => {
		const { [slot.id]: _removed, ...rest } = canvasStageOverrides;
		updateSiteSettingValue(interactionSettingPath("canvasStageOverrides"), rest);
	};

	return (
		<div
			className="space-y-4"
			data-testid={`photon-inspector-trigger-${slot.id}`}
		>
			<header
				className="rounded-[20px] border px-4 py-3"
				style={{
					borderColor: "var(--photon-builder-border)",
					background: "var(--photon-builder-panel-muted)",
				}}
			>
				<div
					className="text-[10px] uppercase tracking-[0.22em]"
					style={{ color: "var(--photon-builder-text-soft)" }}
				>
					Trigger · {block.id}
				</div>
				<div
					className="mt-1 text-sm font-semibold"
					style={{ color: "var(--photon-builder-text)" }}
				>
					{slot.label}
				</div>
				{slot.description ? (
					<p
						className="mt-1 text-xs leading-5"
						style={{ color: "var(--photon-builder-text-muted)" }}
					>
						{slot.description}
					</p>
				) : null}
				<p
					className="mt-2 text-[11px] leading-5"
					style={{ color: "var(--photon-builder-text-soft)" }}
				>
					Visual editing happens on the canvas. This panel is for action
					selection, policies and overrides reset.
				</p>
			</header>

			{actionInstanceOptions.length ? (
				<label className="grid gap-2 text-xs font-semibold">
					Action
					<select
						value={
							currentBinding.actionInstanceId ?? slot.actionInstanceId ?? ""
						}
						onChange={(event) =>
							persistTriggerBinding({
								...currentBinding,
								slotId: slot.id,
								actionInstanceId: event.currentTarget.value || undefined,
							})
						}
						className="h-10 rounded-[14px] border px-3 text-sm outline-none"
						style={{
							borderColor: "var(--photon-builder-border)",
							background: "var(--photon-builder-panel-solid)",
							color: "var(--photon-builder-text)",
						}}
					>
						<option value="">Default action</option>
						{actionInstanceOptions.map((instance) => (
							<option key={instance.id} value={instance.id}>
								{instance.label}
							</option>
						))}
					</select>
				</label>
			) : null}

			<TriggerActionFlow slot={slot} />

			{policiesForAction.length ? (
				<details
					className="rounded-2xl border px-3 py-2"
					style={{
						borderColor: "var(--photon-builder-border)",
						background: "var(--photon-builder-panel-solid)",
					}}
					data-testid="photon-trigger-policy-debug"
				>
					<summary
						className="cursor-pointer text-[10px] uppercase tracking-[0.22em]"
						style={{ color: "var(--photon-builder-text-soft)" }}
					>
						Raw policies (debug)
					</summary>
					<div className="mt-2 space-y-2">
						{policiesForAction.map((policy) => (
							<PolicyRow key={policy.id} policy={policy} />
						))}
					</div>
				</details>
			) : null}

			{(currentBinding.overrides && Object.keys(currentBinding.overrides).length > 0) ||
			(canvasStageOverrides[slot.id] &&
				Object.values(canvasStageOverrides[slot.id]).some(
					(s) => Object.keys(s).length > 0,
				)) ? (
				<button
					type="button"
					onClick={() => {
						persistTriggerBinding({
							...currentBinding,
							slotId: slot.id,
							overrides: undefined,
						});
						clearCanvasStageOverrides();
					}}
					className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold"
					style={{
						borderColor: "var(--photon-builder-border)",
						color: "var(--photon-builder-text-muted)",
					}}
				>
					Reset overrides
				</button>
			) : null}
		</div>
	);
};

export const useInspectorTriggerSlots = (
	block: PhotonBlock | null,
): PhotonInteractionTriggerSlot[] => {
	const registry = usePhotonStore((state) => state.registry);
	const document = usePhotonStore((state) => state.document);
	const resources = usePhotonStore((state) => state.resources);
	const pageSettings = usePhotonStore((state) => state.pageSettings);
	const site = usePhotonStore((state) => state.site);
	const mode = usePhotonStore((state) => state.mode);
	const isAdmin = usePhotonStore((state) => state.isAdmin);
	const siteFrameExtensions = usePhotonStore(
		(state) => state.siteFrameExtensions,
	);
	return useMemo(() => {
		if (!block) {
			return [];
		}
		const definition = registry.getDefinition(block.module, block.type);
		return resolvePhotonBlockInteractionSlots(definition, {
			block,
			document,
			resources,
			pageSettings,
			site,
			mode,
			isAdmin,
			registry,
			siteFrameExtensions,
		});
	}, [
		block,
		document,
		isAdmin,
		mode,
		pageSettings,
		registry,
		resources,
		site,
		siteFrameExtensions,
	]);
};
