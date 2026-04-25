"use client";

import clsx from "clsx";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { PhotonFieldEditorList } from "../../components/photon-field-editor-list";
import { usePhotonStore } from "../../context/photon-context";
import {
	PHOTON_INTERACTIONS_SITE_SETTING_KEY,
	readPhotonInteractionSettings,
	resolvePhotonInteractionActionCatalog,
	resolvePhotonInteractionSlotAction,
	resolvePhotonInteractionSlotGuards,
	resolvePhotonBlockInteractionSlots,
} from "../../helpers/interactions";
import {
	resolvePhotonInteractionSurfaceCatalog,
	resolvePhotonInteractionSurfaceRequest,
} from "../../helpers/interaction-surfaces";
import {
	getValueAtPath,
	setValueAtPath,
} from "../../helpers/path";
import type {
	PhotonBlock,
	PhotonInteractionActionPresentation,
	PhotonInteractionExecutionResult,
	PhotonInteractionTriggerSlot,
} from "../../types";

type CanvasBlockInteractionsProps = {
	block: PhotonBlock;
};

const interactionSettingPath = (suffix: string) =>
	`${PHOTON_INTERACTIONS_SITE_SETTING_KEY}.${suffix}`;

const getDefinitionFields = (
	request: ReturnType<typeof resolvePhotonInteractionSurfaceRequest>,
) =>
	(request?.definition.fields ?? []).map((field) => ({
		...field,
		path: field.path.replace(/^props\./u, ""),
	}));

const resolveActionLabel = (
	action: PhotonInteractionActionPresentation | null,
) => {
	if (!action) {
		return "No action";
	}

	switch (action.type) {
		case "surface":
			return action.intent ?? action.surfaceInstanceId ?? "Surface action";
		case "toast":
			return action.templateId;
		case "link":
			return action.href;
		default:
			return "Action";
	}
};

const SlotRow = ({
	slot,
}: {
	slot: PhotonInteractionTriggerSlot;
}) => {
	const [open, setOpen] = useState(false);
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
	const interactionSurfaceRenderers = usePhotonStore(
		(state) => state.interactionSurfaceRenderers,
	);
	const executeInteractionTriggerSlot = usePhotonStore(
		(state) => state.executeInteractionTriggerSlot,
	);
	const updateSiteSettingValue = usePhotonStore(
		(state) => state.updateSiteSettingValue,
	);
	const surfaceCatalog = useMemo(
		() =>
			resolvePhotonInteractionSurfaceCatalog({
				definitions: interactionSurfaces,
				siteSettings: site.settings,
			}),
		[interactionSurfaces, site.settings],
	);
	const actionCatalog = useMemo(
		() =>
			resolvePhotonInteractionActionCatalog({
				actions: interactionActions,
				guards: interactionGuards,
				surfaces: interactionSurfaces,
				siteSettings: site.settings,
			}),
		[interactionActions, interactionGuards, interactionSurfaces, site.settings],
	);
	const action = resolvePhotonInteractionSlotAction(slot, actionCatalog);
	const guards = resolvePhotonInteractionSlotGuards(slot, actionCatalog);
	const surfaceRequest =
		action?.type === "surface"
			? resolvePhotonInteractionSurfaceRequest(action, surfaceCatalog)
			: null;
	const fields = getDefinitionFields(surfaceRequest);
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
	const guardInstanceOptions = Object.values(actionCatalog.guardInstances)
		.filter((instance) => instance.enabled !== false)
		.filter(
			(instance) =>
				!slot.allowedGuardDefinitionIds?.length ||
				slot.allowedGuardDefinitionIds.includes(instance.definitionId),
		)
		.sort((left, right) => left.label.localeCompare(right.label));
	const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(
		slot.previewScenarios?.[0]?.id ?? null,
	);
	const [lastExecutionResult, setLastExecutionResult] =
		useState<PhotonInteractionExecutionResult | null>(null);
	const selectedScenario =
		slot.previewScenarios?.find((scenario) => scenario.id === selectedScenarioId) ??
		null;
	const persistTriggerBinding = (
		nextBinding: typeof currentBinding,
	) => {
		updateSiteSettingValue(interactionSettingPath("triggerBindings"), {
			...(interactionSettings.triggerBindings ?? {}),
			[slot.id]: nextBinding,
		});
	};
	const persistTriggerOverride = (path: string, value: unknown) => {
		persistTriggerBinding({
				...currentBinding,
				slotId: slot.id,
				overrides: setValueAtPath(
					currentBinding.overrides ?? {},
					path,
					value,
				),
		});
	};
	const preview = () => {
		setLastExecutionResult(
			executeInteractionTriggerSlot(slot, {
				scenarioId: selectedScenarioId,
				scenario: selectedScenario,
			}),
		);
	};
	const SurfaceRenderer = surfaceRequest
		? interactionSurfaceRenderers[surfaceRequest.definition.rendererKey]
		: undefined;

	return (
		<section
			className="rounded-[20px] border"
			style={{
				borderColor: "var(--photon-builder-border)",
				background: "var(--photon-builder-field)",
			}}
			data-testid={`photon-interaction-slot-${slot.id}`}
		>
			<button
				type="button"
				onClick={(event) => {
					event.stopPropagation();
					setOpen((value) => !value);
				}}
				className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left"
			>
				<div className="min-w-0">
					<div
						className="text-sm font-semibold"
						style={{ color: "var(--photon-builder-text)" }}
					>
						{slot.label}
					</div>
					<div
						className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.18em]"
						style={{ color: "var(--photon-builder-text-ghost)" }}
					>
						{resolveActionLabel(action)}
						{guards.length ? ` · ${guards.length} guard` : ""}
					</div>
				</div>
				{open ? (
					<ChevronDown
						className="h-4 w-4 shrink-0"
						style={{ color: "var(--photon-builder-text-soft)" }}
					/>
				) : (
					<ChevronRight
						className="h-4 w-4 shrink-0"
						style={{ color: "var(--photon-builder-text-soft)" }}
					/>
				)}
			</button>

			{open ? (
				<div
					className="space-y-4 border-t px-4 py-4"
					style={{ borderColor: "var(--photon-builder-border)" }}
					onClick={(event) => event.stopPropagation()}
				>
					{slot.description ? (
						<p
							className="text-xs leading-5"
							style={{ color: "var(--photon-builder-text-muted)" }}
						>
							{slot.description}
						</p>
					) : null}
					{actionInstanceOptions.length ? (
						<label className="grid gap-2 text-xs font-semibold">
							Action
							<select
								value={
									currentBinding.actionInstanceId ??
									slot.actionInstanceId ??
									""
								}
								onChange={(event) =>
									persistTriggerBinding({
										...currentBinding,
										slotId: slot.id,
										actionInstanceId:
											event.currentTarget.value || undefined,
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
					{slot.previewScenarios?.length ? (
						<div className="flex flex-wrap gap-2">
							{slot.previewScenarios.map((scenario) => (
								<button
									key={scenario.id}
									type="button"
									onClick={() => setSelectedScenarioId(scenario.id)}
									className="cursor-pointer rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
									style={{
										borderColor:
											selectedScenarioId === scenario.id
												? "var(--photon-builder-border-strong)"
												: "var(--photon-builder-border)",
										background:
											selectedScenarioId === scenario.id
												? "var(--photon-builder-accent-soft)"
												: "transparent",
										color:
											selectedScenarioId === scenario.id
												? "var(--photon-builder-accent-text)"
												: "var(--photon-builder-text-soft)",
									}}
								>
									{scenario.label}
								</button>
							))}
						</div>
					) : null}
					{guards.length ? (
						<div className="space-y-2">
							<div
								className="text-[10px] uppercase tracking-[0.22em]"
								style={{ color: "var(--photon-builder-text-soft)" }}
							>
								Guards
							</div>
							{guards.map((guard) => (
								<div
									key={guard.id}
									className="rounded-2xl border px-3 py-2 text-xs"
									style={{
										borderColor: "var(--photon-builder-border)",
										color: "var(--photon-builder-text-muted)",
									}}
								>
									{guard.label}
								</div>
							))}
						</div>
					) : null}
					{guardInstanceOptions.length ? (
						<div className="space-y-2">
							<div
								className="text-[10px] uppercase tracking-[0.22em]"
								style={{ color: "var(--photon-builder-text-soft)" }}
							>
								Guard chain
							</div>
							<div className="grid gap-2">
								{guardInstanceOptions.map((guard) => {
									const selectedGuardIds =
										currentBinding.guardInstanceIds ??
										slot.guardInstanceIds ??
										[];
									const checked = selectedGuardIds.includes(guard.id);

									return (
										<label
											key={guard.id}
											className="flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs"
											style={{
												borderColor: "var(--photon-builder-border)",
												color: "var(--photon-builder-text-muted)",
											}}
										>
											<input
												type="checkbox"
												checked={checked}
												onChange={(event) => {
													const nextIds = event.currentTarget.checked
														? [...selectedGuardIds, guard.id]
														: selectedGuardIds.filter((id) => id !== guard.id);

													persistTriggerBinding({
														...currentBinding,
														slotId: slot.id,
														guardInstanceIds: nextIds,
													});
												}}
											/>
											{guard.label}
										</label>
									);
								})}
							</div>
						</div>
					) : null}
					<button
						type="button"
						onClick={preview}
						disabled={!action}
						className={clsx(
							"inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold disabled:pointer-events-none disabled:opacity-50",
						)}
						style={{
							borderColor: "var(--photon-builder-border-strong)",
							background: "var(--photon-builder-accent-soft)",
							color: "var(--photon-builder-accent-text)",
						}}
					>
						<ExternalLink className="h-3.5 w-3.5" />
						Preview
					</button>
					{lastExecutionResult &&
					lastExecutionResult.status !== "executed" ? (
						<div
							className="mt-2 rounded-2xl border px-3 py-2 text-xs leading-5"
							style={{
								borderColor: "var(--photon-builder-border)",
								background: "var(--photon-builder-panel-solid)",
								color: "var(--photon-builder-text-muted)",
							}}
						>
							Interaction result: {lastExecutionResult.status}
							{lastExecutionResult.reason
								? ` (${lastExecutionResult.reason})`
								: ""}
						</div>
					) : null}
					{currentBinding.overrides &&
					Object.keys(currentBinding.overrides).length ? (
						<button
							type="button"
							onClick={() =>
								persistTriggerBinding({
									...currentBinding,
									slotId: slot.id,
									overrides: undefined,
								})
							}
							className="ml-2 inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold"
							style={{
								borderColor: "var(--photon-builder-border)",
								color: "var(--photon-builder-text-muted)",
							}}
						>
							Reset overrides
						</button>
					) : null}
					{surfaceRequest && fields.length ? (
						<PhotonFieldEditorList
							fields={fields}
							subjectId={`interaction-slot:${slot.id}`}
							getValue={(path) =>
								getValueAtPath(surfaceRequest.props ?? {}, path)
							}
							onChange={persistTriggerOverride}
							onFocus={() => undefined}
						/>
					) : null}
					{surfaceRequest && SurfaceRenderer ? (
						<div
							className="overflow-hidden rounded-[22px] border p-3"
							style={{
								borderColor: "var(--photon-builder-border)",
								background: "var(--photon-builder-panel-solid)",
							}}
						>
							<SurfaceRenderer
								open
								onOpenChange={() => undefined}
								request={surfaceRequest}
								previewMode="builder-inline"
								previewScenarioId={selectedScenarioId ?? undefined}
							/>
						</div>
					) : null}
				</div>
			) : null}
		</section>
	);
};

export const CanvasBlockInteractions = ({
	block,
}: CanvasBlockInteractionsProps) => {
	const [open, setOpen] = useState(false);
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

	if (!slots.length) {
		return null;
	}

	return (
		<div
			className="mt-3 rounded-[24px] border p-3"
			style={{
				borderColor: "var(--photon-builder-border)",
				background: "var(--photon-builder-panel-muted)",
				color: "var(--photon-builder-text)",
			}}
			data-testid={`photon-block-interactions-${block.id}`}
		>
			<button
				type="button"
				onClick={(event) => {
					event.stopPropagation();
					setOpen((value) => !value);
				}}
				className="mb-0 flex w-full cursor-pointer items-center justify-between px-1 text-left text-[10px] font-semibold uppercase tracking-[0.24em]"
				style={{ color: "var(--photon-builder-text-soft)" }}
			>
				<span>Interactions</span>
				<span>{open ? "Hide" : `${slots.length} trigger${slots.length === 1 ? "" : "s"}`}</span>
			</button>
			{open ? (
				<div className="mt-3 space-y-2">
					{slots.map((slot) => (
						<SlotRow key={slot.id} slot={slot} />
					))}
				</div>
			) : null}
		</div>
	);
};
