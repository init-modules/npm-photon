"use client";

import { Settings2 } from "lucide-react";
import { useMemo } from "react";
import { usePhotonStore } from "../../context/photon-context";
import { buildActionPlan } from "../../helpers/action-policy";
import {
	resolvePhotonInteractionActionCatalog,
	resolvePhotonInteractionSlotAction,
	resolvePhotonBlockInteractionSlots,
} from "../../helpers/interactions";
import type {
	PhotonBlock,
	PhotonInteractionActionPresentation,
	PhotonInteractionTriggerSlot,
} from "../../types";

type TriggerOverlayProps = {
	block: PhotonBlock;
};

const formatActionLabel = (
	action: PhotonInteractionActionPresentation | null,
): string => {
	if (!action) {
		return "—";
	}
	switch (action.type) {
		case "surface":
			return action.intent ?? action.surfaceInstanceId ?? "surface";
		case "toast":
			return `toast: ${action.templateId}`;
		case "link":
			return `link: ${action.href}`;
		default:
			return "action";
	}
};

const TriggerChip = ({
	slot,
	actionLabel,
	steps,
	policyCount,
	isActive,
	onToggleStage,
	onOpenInspector,
}: {
	slot: PhotonInteractionTriggerSlot;
	actionLabel: string;
	steps: number;
	policyCount: number;
	isActive: boolean;
	onToggleStage: () => void;
	onOpenInspector: () => void;
}) => (
	<div
		className="inline-flex max-w-full items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
		style={{
			borderColor: isActive
				? "var(--photon-builder-border-strong)"
				: "var(--photon-builder-border)",
			background: isActive
				? "var(--photon-builder-accent-soft)"
				: "var(--photon-builder-panel-solid)",
			color: isActive
				? "var(--photon-builder-accent-text)"
				: "var(--photon-builder-text-soft)",
		}}
		data-testid={`photon-trigger-overlay-chip-${slot.id}`}
		title={`${slot.label} → ${actionLabel}`}
	>
		<button
			type="button"
			onClick={(event) => {
				event.stopPropagation();
				onToggleStage();
			}}
			className="inline-flex cursor-pointer items-center gap-2 bg-transparent uppercase tracking-[0.18em]"
			data-testid={`photon-trigger-overlay-toggle-${slot.id}`}
		>
			<span style={{ color: "var(--photon-builder-text-muted)" }}>
				{slot.label}
			</span>
			<span aria-hidden="true">→</span>
			<span style={{ color: "var(--photon-builder-text)" }}>{actionLabel}</span>
		</button>
		{policyCount > 0 ? (
			<span
				className="rounded-full border px-2 py-0.5 normal-case tracking-normal"
				style={{
					borderColor: "var(--photon-builder-border-strong)",
					background: "var(--photon-builder-accent-soft)",
					color: "var(--photon-builder-accent-text)",
				}}
			>
				{policyCount} policy
				{policyCount === 1 ? "" : "ies"}
			</span>
		) : null}
		{steps > 1 ? (
			<span className="opacity-70 normal-case tracking-normal">
				· {steps} step{steps === 1 ? "" : "s"}
			</span>
		) : null}
		<button
			type="button"
			onClick={(event) => {
				event.stopPropagation();
				onOpenInspector();
			}}
			className="inline-flex cursor-pointer items-center justify-center rounded-full border p-1"
			style={{
				borderColor: "var(--photon-builder-border)",
				color: "var(--photon-builder-text-soft)",
			}}
			data-testid={`photon-trigger-overlay-open-${slot.id}`}
			aria-label={`Open inspector for ${slot.label}`}
		>
			<Settings2 className="h-3 w-3" />
		</button>
	</div>
);

export const TriggerOverlay = ({ block }: TriggerOverlayProps) => {
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
	const interactionActions = usePhotonStore(
		(state) => state.interactionActions,
	);
	const interactionGuards = usePhotonStore(
		(state) => state.interactionGuards,
	);
	const interactionSurfaces = usePhotonStore(
		(state) => state.interactionSurfaces,
	);
	const interactionPolicies = usePhotonStore(
		(state) => state.interactionPolicies,
	);
	const conditionEvaluators = usePhotonStore(
		(state) => state.conditionEvaluators,
	);
	const routeContextValues = usePhotonStore(
		(state) => state.routeContextValues,
	);
	const selectInspectorTrigger = usePhotonStore(
		(state) => state.selectInspectorTrigger,
	);
	const selectCanvasTriggerStage = usePhotonStore(
		(state) => state.selectCanvasTriggerStage,
	);
	const selectedCanvasTriggerStageId = usePhotonStore(
		(state) => state.selectedCanvasTriggerStageId,
	);
	const selectBlock = usePhotonStore((state) => state.selectBlock);

	const definition = registry.getDefinition(block.module, block.type);
	const slots = resolvePhotonBlockInteractionSlots(definition, {
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

	const chips = useMemo(
		() =>
			slots.map((slot) => {
				const action = resolvePhotonInteractionSlotAction(
					slot,
					actionCatalog,
				);
				const targetInstanceId = slot.actionInstanceId;
				const plan = targetInstanceId
					? buildActionPlan(
							targetInstanceId,
							interactionPolicies,
							conditionEvaluators,
							{
								siteSettings: site.settings,
								routeContext: routeContextValues,
							},
						)
					: null;
				return {
					slot,
					actionLabel: formatActionLabel(action),
					steps: plan?.steps.length ?? 1,
					policyCount: plan
						? plan.steps.filter((step) => Boolean(step.policyId))
								.length
						: 0,
				};
			}),
		[
			actionCatalog,
			conditionEvaluators,
			interactionPolicies,
			routeContextValues,
			site.settings,
			slots,
		],
	);

	if (chips.length === 0) {
		return null;
	}

	return (
		<div
			className="mt-2 flex flex-wrap items-center gap-2"
			data-testid={`photon-trigger-overlay-${block.id}`}
		>
			<span
				className="text-[10px] font-semibold uppercase tracking-[0.28em]"
				style={{ color: "var(--photon-builder-text-soft)" }}
			>
				Triggers
			</span>
			{chips.map(({ slot, actionLabel, steps, policyCount }) => {
				const isActive = selectedCanvasTriggerStageId === slot.id;
				return (
					<TriggerChip
						key={slot.id}
						slot={slot}
						actionLabel={actionLabel}
						steps={steps}
						policyCount={policyCount}
						isActive={isActive}
						onToggleStage={() => {
							selectBlock(block.id);
							selectCanvasTriggerStage(isActive ? null : slot.id);
						}}
						onOpenInspector={() => {
							selectBlock(block.id);
							selectInspectorTrigger(slot.id);
						}}
					/>
				);
			})}
		</div>
	);
};
