"use client";

import { Pencil, X } from "lucide-react";
import { useMemo, useState } from "react";
import { usePhotonStore } from "../../context/photon-context";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";
import {
	PHOTON_INTERACTIONS_SITE_SETTING_KEY,
	readPhotonInteractionSettings,
	resolvePhotonInteractionActionCatalog,
	resolvePhotonInteractionSlotAction,
	resolvePhotonBlockInteractionSlots,
} from "../../helpers/interactions";
import {
	resolvePhotonInteractionSurfaceCatalog,
	resolvePhotonInteractionSurfaceRequest,
} from "../../helpers/interaction-surfaces";
import { setValueAtPath } from "../../helpers/path";
import type {
	PhotonBlock,
	PhotonInteractionSurfaceEditableFieldRenderer,
	PhotonInteractionTriggerSlot,
} from "../../types";

type CanvasTriggerStageProps = {
	block: PhotonBlock;
};

const interactionSettingPath = (suffix: string) =>
	`${PHOTON_INTERACTIONS_SITE_SETTING_KEY}.${suffix}`;

type InlineEditableTextProps = {
	value: string;
	placeholder?: string;
	multiline?: boolean;
	select?: boolean;
	options?: readonly { value: string; label: string }[];
	onCommit: (next: string) => void;
	className?: string;
};

const InlineEditableText = ({
	value,
	placeholder,
	multiline,
	select,
	options,
	onCommit,
	className,
}: InlineEditableTextProps) => {
	const { translate } = usePhotonI18n();
	const emptyLabel = translate(
		"photon.studio.canvasStage.emptyValue",
		"(empty)",
	);
	const [editing, setEditing] = useState(false);
	const [draft, setDraft] = useState(value);

	if (select && options) {
		const selectedLabel =
			(options.find((o) => o.value === value)?.label ?? value) || emptyLabel;
		return (
			<select
				value={value}
				onChange={(event) => onCommit(event.currentTarget.value)}
				className={`w-full rounded-[10px] border px-2 py-1 text-inherit outline-none ${className ?? ""}`}
				style={{
					borderColor: "var(--photon-builder-border-strong)",
					background: "var(--photon-builder-panel-solid)",
					color: value ? "inherit" : "var(--photon-builder-text-soft)",
				}}
				data-testid="photon-trigger-stage-inline-select"
				aria-label={selectedLabel}
			>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		);
	}

	const startEditing = () => {
		setDraft(value);
		setEditing(true);
	};
	const commit = () => {
		setEditing(false);
		if (draft !== value) {
			onCommit(draft);
		}
	};
	const cancel = () => {
		setDraft(value);
		setEditing(false);
	};
	if (editing) {
		const sharedProps = {
			autoFocus: true,
			value: draft,
			onChange: (
				event:
					| React.ChangeEvent<HTMLInputElement>
					| React.ChangeEvent<HTMLTextAreaElement>,
			) => setDraft(event.currentTarget.value),
			onBlur: commit,
			onKeyDown: (
				event:
					| React.KeyboardEvent<HTMLInputElement>
					| React.KeyboardEvent<HTMLTextAreaElement>,
			) => {
				if (event.key === "Escape") {
					event.preventDefault();
					cancel();
				}
				if (event.key === "Enter" && !event.shiftKey && !multiline) {
					event.preventDefault();
					commit();
				}
			},
			className: `w-full rounded-[10px] border bg-transparent px-2 py-1 text-inherit outline-none ${className ?? ""}`,
			style: {
				borderColor: "var(--photon-builder-border-strong)",
				background: "var(--photon-builder-panel-solid)",
				color: "var(--photon-builder-text)",
			} as React.CSSProperties,
			placeholder,
		};
		return multiline ? (
			<textarea rows={3} {...sharedProps} />
		) : (
			<input type="text" {...sharedProps} />
		);
	}
	const display = value || placeholder || emptyLabel;
	const showPlaceholderStyle = !value;
	return (
		<button
			type="button"
			onClick={startEditing}
			className={`group inline-flex w-full cursor-text items-center gap-1.5 rounded-[10px] px-1 py-0.5 text-left transition hover:bg-[var(--photon-builder-accent-soft)] ${className ?? ""}`}
			style={{
				color: showPlaceholderStyle
					? "var(--photon-builder-text-soft)"
					: "inherit",
			}}
			data-testid="photon-trigger-stage-inline-edit"
		>
			<span className="flex-1 whitespace-pre-wrap">{display}</span>
			<Pencil
				className="h-3 w-3 shrink-0 opacity-0 transition group-hover:opacity-100"
				style={{ color: "var(--photon-builder-text-soft)" }}
			/>
		</button>
	);
};

const TriggerStageSection = ({
	slot,
	block,
}: {
	slot: PhotonInteractionTriggerSlot;
	block: PhotonBlock;
}) => {
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
	const interactionSurfaceRenderers = usePhotonStore(
		(state) => state.interactionSurfaceRenderers,
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
	const surfaceRequest =
		action?.type === "surface"
			? resolvePhotonInteractionSurfaceRequest(action, surfaceCatalog)
			: null;
	const interactionSettings = readPhotonInteractionSettings(site.settings);
	const currentBinding = interactionSettings.triggerBindings?.[slot.id] ?? {
		slotId: slot.id,
		actionInstanceId: slot.actionInstanceId,
		guardInstanceIds: slot.guardInstanceIds,
	};
	const canvasStageOverrides = interactionSettings.canvasStageOverrides ?? {};
	const slotCanvasOverrides = canvasStageOverrides[slot.id] ?? {};
	const scenarios = slot.previewScenarios ?? [];
	const [scenarioId, setScenarioId] = useState<string>(
		scenarios[0]?.id ?? "idle",
	);
	const persistOverride = (path: string, value: unknown) => {
		updateSiteSettingValue(interactionSettingPath("canvasStageOverrides"), {
			...canvasStageOverrides,
			[slot.id]: {
				...slotCanvasOverrides,
				[scenarioId]: setValueAtPath(
					slotCanvasOverrides[scenarioId] ?? {},
					path,
					value,
				),
			},
		});
	};
	const editableField: PhotonInteractionSurfaceEditableFieldRenderer = ({
		path,
		value,
		kind,
		options,
		placeholder,
		className,
	}) => (
		<InlineEditableText
			value={value}
			placeholder={placeholder}
			multiline={kind === "textarea"}
			select={kind === "select"}
			options={options}
			onCommit={(next) => persistOverride(path, next)}
			className={className}
		/>
	);
	const SurfaceRenderer = surfaceRequest
		? interactionSurfaceRenderers[surfaceRequest.definition.rendererKey]
		: undefined;
	if (!surfaceRequest || !SurfaceRenderer) {
		return null;
	}
	const stateLayer = slotCanvasOverrides[scenarioId] ?? {};
	const effectiveSurfaceRequest =
		Object.keys(stateLayer).length > 0
			? { ...surfaceRequest, props: { ...surfaceRequest.props, ...stateLayer } }
			: surfaceRequest;
	return (
		<section
			className="space-y-3"
			data-testid={`photon-canvas-trigger-stage-${slot.id}`}
		>
			<header className="flex flex-wrap items-center gap-3">
				<div
					className="text-[10px] font-semibold uppercase tracking-[0.22em]"
					style={{ color: "var(--photon-builder-text-soft)" }}
				>
					{slot.label}
				</div>
				{scenarios.length ? (
					<div className="flex flex-wrap gap-1.5">
						{scenarios.map((scenario) => {
							const isActive = scenarioId === scenario.id;
							return (
								<button
									key={scenario.id}
									type="button"
									onClick={() => setScenarioId(scenario.id)}
									className="cursor-pointer rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
									style={{
										borderColor: isActive
											? "var(--photon-builder-border-strong)"
											: "var(--photon-builder-border)",
										background: isActive
											? "var(--photon-builder-accent-soft)"
											: "transparent",
										color: isActive
											? "var(--photon-builder-accent-text)"
											: "var(--photon-builder-text-soft)",
									}}
									data-testid={`photon-canvas-trigger-stage-state-${slot.id}-${scenario.id}`}
								>
									{scenario.label}
								</button>
							);
						})}
					</div>
				) : null}
			</header>
			<SurfaceRenderer
				open={false}
				onOpenChange={() => undefined}
				request={effectiveSurfaceRequest}
				previewMode="builder-canvas-stage"
				previewScenarioId={scenarioId}
				editableField={editableField}
				/* `previewMode` makes `open`/`onOpenChange` no-ops by contract; renderer
				 * MUST NOT mount a real dialog. See PhotonInteractionSurfaceRendererProps
				 * docs in @init/photon types. */
			/>
		</section>
	);
};

export const CanvasTriggerStage = ({ block }: CanvasTriggerStageProps) => {
	const { translate } = usePhotonI18n();
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
	const selectedCanvasTriggerStageId = usePhotonStore(
		(state) => state.selectedCanvasTriggerStageId,
	);
	const selectCanvasTriggerStage = usePhotonStore(
		(state) => state.selectCanvasTriggerStage,
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
	if (slots.length === 0 || !selectedCanvasTriggerStageId) {
		return null;
	}
	const activeSlot = slots.find((slot) => slot.id === selectedCanvasTriggerStageId);
	if (!activeSlot) {
		return null;
	}
	return (
		<div
			className="mt-3 rounded-[24px] border p-4"
			style={{
				borderColor: "var(--photon-builder-border-strong)",
				background: "var(--photon-builder-panel-muted)",
				color: "var(--photon-builder-text)",
			}}
			data-testid={`photon-canvas-trigger-stage-${block.id}`}
		>
			<div className="mb-3 flex items-center justify-between">
				<div
					className="text-[10px] font-semibold uppercase tracking-[0.28em]"
					style={{ color: "var(--photon-builder-text-soft)" }}
				>
					{translate(
						"photon.studio.canvasStage.heading",
						"Trigger preview · click text to edit",
					)}
				</div>
				<button
					type="button"
					onClick={() => selectCanvasTriggerStage(null)}
					className="inline-flex cursor-pointer items-center justify-center rounded-full border p-1.5"
					style={{
						borderColor: "var(--photon-builder-border)",
						color: "var(--photon-builder-text-soft)",
					}}
					data-testid="photon-canvas-trigger-stage-close"
					aria-label={translate(
						"photon.studio.canvasStage.close",
						"Close trigger preview",
					)}
				>
					<X className="h-3 w-3" />
				</button>
			</div>
			<TriggerStageSection slot={activeSlot} block={block} />
		</div>
	);
};
