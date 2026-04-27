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
			className="rounded-sm text-[11px]"
			style={{
				background: "var(--photon-builder-field)",
			}}
			data-testid={`photon-trigger-policy-${policy.id}`}
		>
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				className="flex w-full cursor-pointer items-center justify-between gap-2 px-2 py-1 text-left"
			>
				<span style={{ color: "var(--photon-builder-text)" }}>
					Run <strong>{policy.run || "(default)"}</strong> when {conditionId}
				</span>
				<span
					className="font-mono text-[9.5px] uppercase tracking-[0.14em]"
					style={{ color: "var(--photon-builder-text-soft)" }}
				>
					{isBridge ? "legacy guard · " : ""}
					{policy.scope}
					{policy.priority !== undefined ? ` · p${policy.priority}` : ""}
				</span>
			</button>
			{open ? (
				<div
					className="space-y-0.5 px-2 pb-1 font-mono text-[10.5px] leading-snug"
					style={{
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

	const hasOverrides =
		(currentBinding.overrides &&
			Object.keys(currentBinding.overrides).length > 0) ||
		(canvasStageOverrides[slot.id] &&
			Object.values(canvasStageOverrides[slot.id]).some(
				(s) => Object.keys(s).length > 0,
			));

	return (
		<div
			className="space-y-1.5"
			data-testid={`photon-inspector-trigger-${slot.id}`}
		>
			<header
				className="rounded-sm px-2 py-1.5"
				style={{
					background: "var(--photon-builder-panel-solid)",
				}}
			>
				<div
					className="text-[10px] font-semibold uppercase tracking-[0.16em]"
					style={{ color: "var(--photon-builder-text-soft)" }}
				>
					Trigger · {block.id}
				</div>
				<div
					className="mt-0.5 text-[12px] font-semibold leading-tight"
					style={{ color: "var(--photon-builder-text)" }}
				>
					{slot.label}
				</div>
				{slot.description ? (
					<p
						className="mt-0.5 text-[10.5px] leading-snug"
						style={{ color: "var(--photon-builder-text-muted)" }}
					>
						{slot.description}
					</p>
				) : null}
			</header>

			{actionInstanceOptions.length ? (
				<div className="flex min-h-[24px] items-center gap-2 px-1">
					<div
						className="min-w-[112px] max-w-[112px] truncate text-[11px] font-medium leading-tight"
						style={{ color: "var(--photon-builder-text)" }}
					>
						Action
					</div>
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
						className="h-6 min-w-0 flex-1 rounded-sm bg-[color:var(--photon-builder-field)] px-1.5 text-[11px] outline-none ring-1 ring-transparent transition-[box-shadow] focus:ring-[color:var(--photon-builder-border-strong)]"
						style={{
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
				</div>
			) : null}

			<TriggerActionFlow slot={slot} />

			{policiesForAction.length ? (
				<details
					className="rounded-sm px-1.5 py-1"
					style={{
						background: "var(--photon-builder-panel-solid)",
					}}
					data-testid="photon-trigger-policy-debug"
				>
					<summary
						className="cursor-pointer text-[10px] font-semibold uppercase tracking-[0.16em]"
						style={{ color: "var(--photon-builder-text-soft)" }}
					>
						Raw policies (debug · {policiesForAction.length})
					</summary>
					<div className="mt-1 space-y-1">
						{policiesForAction.map((policy) => (
							<PolicyRow key={policy.id} policy={policy} />
						))}
					</div>
				</details>
			) : null}

			{hasOverrides ? (
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
					className="inline-flex h-6 cursor-pointer items-center gap-1 rounded-sm border px-2 text-[10.5px] font-semibold"
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
