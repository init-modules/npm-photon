"use client";

import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { PhotonFieldEditorList } from "../../components/photon-field-editor-list";
import {
	PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY,
	readPhotonInteractionSurfaceSettings,
	resolvePhotonInteractionSurfaceCatalog,
} from "../../helpers/interaction-surfaces";
import {
	PHOTON_INTERACTIONS_SITE_SETTING_KEY,
	readPhotonInteractionSettings,
	resolvePhotonInteractionActionCatalog,
} from "../../helpers/interactions";
import {
	clonePhotonValue,
	getValueAtPath,
	setValueAtPath,
} from "../../helpers/path";
import type {
	PhotonActionPolicy,
	PhotonConditionDefinition,
	PhotonConditionEvaluatorMap,
	PhotonInteractionSurfaceDefinition,
	PhotonInteractionSurfaceInstance,
	PhotonInteractionSurfaceIntentBinding,
	PhotonInteractionSurfaceOpenHandler,
	PhotonInteractionToastHandler,
	PhotonInteractionToastTemplate,
	PhotonSite,
	PhotonInteractionActionDefinition,
	PhotonInteractionActionInstance,
	PhotonInteractionActionPresentation,
	PhotonInteractionGuardDefinition,
	PhotonInteractionGuardInstance,
	PhotonStudioInteractionTab,
} from "../../types";
import { ActionStateCards } from "./action-state-cards";
import { PoliciesPanel } from "./policies-panel";

type InteractionSurfacesSurfaceProps = {
	site: PhotonSite;
	definitions: PhotonInteractionSurfaceDefinition[];
	actionDefinitions: PhotonInteractionActionDefinition[];
	guardDefinitions: PhotonInteractionGuardDefinition[];
	interactionPolicies?: PhotonActionPolicy[];
	conditionDefinitions?: PhotonConditionDefinition[];
	conditionEvaluators?: PhotonConditionEvaluatorMap;
	activeTab?: PhotonStudioInteractionTab;
	selectedActionId?: string | null;
	selectedGuardId?: string | null;
	selectedPolicyId?: string | null;
	selectedScenarioId?: string | null;
	onActiveTabChange?: (tab: PhotonStudioInteractionTab) => void;
	onSelectedActionChange?: (id: string | null) => void;
	onSelectedGuardChange?: (id: string | null) => void;
	onSelectedPolicyChange?: (id: string | null) => void;
	onSelectedScenarioChange?: (id: string | null) => void;
	selectedInstanceId?: string | null;
	selectedTemplateId?: string | null;
	onSelectedInstanceChange?: (id: string | null) => void;
	onSelectedTemplateChange?: (id: string | null) => void;
	onSiteSettingChange: (path: string, value: unknown) => void;
	onSiteSettingFocus: (path: string) => void;
	openInteractionSurface: PhotonInteractionSurfaceOpenHandler;
	showInteractionToast: PhotonInteractionToastHandler;
	executeInteractionAction: (
		action: PhotonInteractionActionPresentation | undefined | null,
	) => boolean;
};

const shellStyle = {
	borderColor: "var(--photon-builder-border)",
	background:
		"linear-gradient(180deg, var(--photon-builder-panel-solid), var(--photon-builder-panel))",
	boxShadow: "var(--photon-builder-shadow)",
	color: "var(--photon-builder-text)",
};

const cardStyle = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-panel-muted)",
	color: "var(--photon-builder-text)",
};

const fieldStyle = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-field)",
	color: "var(--photon-builder-text)",
};

const activeStyle = {
	borderColor: "var(--photon-builder-border-strong)",
	background: "var(--photon-builder-card-selected)",
	color: "var(--photon-builder-text)",
};

const buttonStyle = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-field)",
	color: "var(--photon-builder-text)",
};

const primaryButtonStyle = {
	borderColor: "var(--photon-builder-border-strong)",
	background: "var(--photon-builder-accent-soft)",
	color: "var(--photon-builder-accent-text)",
};

const settingPath = (suffix: string) =>
	`${PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY}.${suffix}`;

const interactionSettingPath = (suffix: string) =>
	`${PHOTON_INTERACTIONS_SITE_SETTING_KEY}.${suffix}`;

const getDefinitionFields = (
	definition: PhotonInteractionSurfaceDefinition | undefined,
) =>
	(definition?.fields ?? []).map((field) => ({
		...field,
		path: field.path.replace(/^props\./u, ""),
	}));

const getInstanceValue = (
	instance: PhotonInteractionSurfaceInstance,
	path: string,
) => getValueAtPath(instance.props ?? {}, path);

const setInstanceValue = (
	instance: PhotonInteractionSurfaceInstance,
	path: string,
	value: unknown,
): PhotonInteractionSurfaceInstance => ({
	...instance,
	props: setValueAtPath(instance.props ?? {}, path, value),
});

export const InteractionSurfacesSurface = ({
	site,
	definitions,
	actionDefinitions,
	guardDefinitions,
	interactionPolicies = [],
	conditionDefinitions = [],
	conditionEvaluators = {},
	activeTab: controlledActiveTab,
	selectedActionId: controlledSelectedActionId,
	selectedGuardId: controlledSelectedGuardId,
	selectedPolicyId: controlledSelectedPolicyId,
	selectedScenarioId: controlledSelectedScenarioId,
	onActiveTabChange,
	onSelectedActionChange,
	onSelectedGuardChange,
	onSelectedPolicyChange,
	onSelectedScenarioChange,
	selectedInstanceId: controlledSelectedInstanceId,
	selectedTemplateId: controlledSelectedTemplateId,
	onSelectedInstanceChange,
	onSelectedTemplateChange,
	onSiteSettingChange,
	onSiteSettingFocus,
	openInteractionSurface,
	showInteractionToast,
	executeInteractionAction,
}: InteractionSurfacesSurfaceProps) => {
	const catalog = useMemo(
		() =>
			resolvePhotonInteractionSurfaceCatalog({
				definitions,
				siteSettings: site.settings,
			}),
		[definitions, site.settings],
	);
	const actionCatalog = useMemo(
		() =>
			resolvePhotonInteractionActionCatalog({
				actions: actionDefinitions,
				guards: guardDefinitions,
				surfaces: definitions,
				policies: interactionPolicies,
				siteSettings: site.settings,
			}),
		[
			actionDefinitions,
			definitions,
			guardDefinitions,
			interactionPolicies,
			site.settings,
		],
	);
	const persistedSettings = readPhotonInteractionSurfaceSettings(site.settings);
	const persistedInteractionSettings = readPhotonInteractionSettings(site.settings);
	const defaultInstanceIds = new Set(
		catalog.definitions.flatMap((definition) =>
			(definition.defaultInstances ?? []).map((instance) => instance.id),
		),
	);
	const surfaceDefinitions = catalog.definitions.filter(
		(definition) => definition.kind !== "toast",
	);
	const allInstances = Object.values(catalog.instances);
	const instances = allInstances.filter(
		(instance) => instance.enabled !== false,
	);
	const disabledInstances = allInstances.filter(
		(instance) => instance.enabled === false,
	);
	const toastTemplates = Object.values(catalog.toastTemplates).filter(
		(template) => template.enabled !== false,
	);
	const [localSelectedInstanceId, setLocalSelectedInstanceId] = useState(
		instances[0]?.id ?? "",
	);
	const [localSelectedTemplateId, setLocalSelectedTemplateId] = useState(
		toastTemplates[0]?.id ?? "",
	);
	const [localActiveTab, setLocalActiveTab] =
		useState<PhotonStudioInteractionTab>("actions");
	const [localSelectedActionId, setLocalSelectedActionId] = useState(
		Object.values(actionCatalog.actionInstances)[0]?.id ?? "",
	);
	const [localSelectedGuardId, setLocalSelectedGuardId] = useState(
		Object.values(actionCatalog.guardInstances)[0]?.id ?? "",
	);
	const [localSelectedScenarioId, setLocalSelectedScenarioId] = useState("");
	const [localSelectedPolicyId, setLocalSelectedPolicyId] = useState(
		interactionPolicies[0]?.id ?? "",
	);
	const activeTab = controlledActiveTab ?? localActiveTab;
	const selectedInstanceId =
		controlledSelectedInstanceId ?? localSelectedInstanceId;
	const instanceListRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (!selectedInstanceId || !instanceListRef.current) {
			return;
		}
		const target = instanceListRef.current.querySelector<HTMLElement>(
			`[data-instance-id="${CSS.escape(selectedInstanceId)}"]`,
		);
		if (target) {
			target.scrollIntoView({ behavior: "smooth", block: "nearest" });
		}
	}, [selectedInstanceId]);
	const selectedTemplateId =
		controlledSelectedTemplateId ?? localSelectedTemplateId;
	const selectedActionId =
		controlledSelectedActionId ?? localSelectedActionId;
	const selectedGuardId = controlledSelectedGuardId ?? localSelectedGuardId;
	const selectedScenarioId =
		controlledSelectedScenarioId ?? localSelectedScenarioId;
	const setActiveTab = (tab: PhotonStudioInteractionTab) => {
		setLocalActiveTab(tab);
		onActiveTabChange?.(tab);
	};
	const setSelectedInstanceId = (id: string | null) => {
		setLocalSelectedInstanceId(id ?? "");
		onSelectedInstanceChange?.(id);
	};
	const setSelectedTemplateId = (id: string | null) => {
		setLocalSelectedTemplateId(id ?? "");
		onSelectedTemplateChange?.(id);
	};
	const setSelectedActionId = (id: string | null) => {
		setLocalSelectedActionId(id ?? "");
		onSelectedActionChange?.(id);
	};
	const setSelectedGuardId = (id: string | null) => {
		setLocalSelectedGuardId(id ?? "");
		onSelectedGuardChange?.(id);
	};
	const setSelectedScenarioId = (id: string | null) => {
		setLocalSelectedScenarioId(id ?? "");
		onSelectedScenarioChange?.(id);
	};
	const selectedPolicyId =
		controlledSelectedPolicyId ?? localSelectedPolicyId;
	const setSelectedPolicyId = (id: string | null) => {
		setLocalSelectedPolicyId(id ?? "");
		onSelectedPolicyChange?.(id);
	};
	const selectedInstance =
		(selectedInstanceId ? catalog.instances[selectedInstanceId] : undefined) ??
		instances[0] ??
		null;
	const selectedDefinition = selectedInstance
		? catalog.definitionsById.get(selectedInstance.definitionId)
		: undefined;
	const selectedTemplate =
		(selectedTemplateId
			? catalog.toastTemplates[selectedTemplateId]
			: undefined) ??
			toastTemplates[0] ??
			null;
	const actionInstances = Object.values(actionCatalog.actionInstances).filter(
		(instance) => instance.enabled !== false,
	);
	const guardInstances = Object.values(actionCatalog.guardInstances).filter(
		(instance) => instance.enabled !== false,
	);
	const selectedAction =
		(selectedActionId ? actionCatalog.actionInstances[selectedActionId] : undefined) ??
		actionInstances[0] ??
		null;
	const selectedActionDefinition = selectedAction
		? actionCatalog.actionsById.get(selectedAction.definitionId)
		: undefined;
	const selectedGuard =
		(selectedGuardId ? actionCatalog.guardInstances[selectedGuardId] : undefined) ??
		guardInstances[0] ??
		null;
	const selectedGuardDefinition = selectedGuard
		? actionCatalog.guardsById.get(selectedGuard.definitionId)
		: undefined;
	const selectedIntentBindings = selectedInstance
		? Object.values(catalog.intents).filter(
				(binding) => binding.surfaceInstanceId === selectedInstance.id,
			)
		: [];
	const selectedInstanceDeleteBlocked =
		Boolean(selectedInstance) &&
		!defaultInstanceIds.has(selectedInstance?.id ?? "") &&
		selectedIntentBindings.length > 0;
	const selectedActionSurfaceRequest =
		selectedAction?.presentation.type === "surface"
			? (() => {
					const surfaceInstance =
						selectedAction.presentation.surfaceInstanceId
							? catalog.instances[selectedAction.presentation.surfaceInstanceId]
							: selectedAction.presentation.intent
								? catalog.instances[
										catalog.intents[selectedAction.presentation.intent]
											?.surfaceInstanceId ?? ""
									]
								: undefined;
					const surfaceDefinition = surfaceInstance
						? catalog.definitionsById.get(surfaceInstance.definitionId)
						: undefined;

					return surfaceDefinition && surfaceInstance
						? {
								definition: surfaceDefinition,
								instance: surfaceInstance,
								trigger: selectedAction.presentation,
								props: {
									...(surfaceInstance.props ?? {}),
									...(selectedAction.presentation.overrides ?? {}),
								},
								payload: selectedAction.presentation.payload ?? {},
								fallbackHref: selectedAction.presentation.fallbackHref,
							}
						: null;
				})()
			: null;
	const selectedActionFields = getDefinitionFields(
		selectedActionSurfaceRequest?.definition,
	);

	const persistInstances = (
		nextInstances: Record<string, PhotonInteractionSurfaceInstance>,
	) => {
		onSiteSettingChange(settingPath("instances"), nextInstances);
	};
	const persistInstance = (instance: PhotonInteractionSurfaceInstance) => {
		persistInstances({
			...(persistedSettings.instances ?? {}),
			[instance.id]: instance,
		});
	};
	const persistIntent = (binding: PhotonInteractionSurfaceIntentBinding) => {
		onSiteSettingChange(settingPath("intents"), {
			...(persistedSettings.intents ?? {}),
			[binding.intent]: binding,
		});
	};
	const persistTemplate = (template: PhotonInteractionToastTemplate) => {
		onSiteSettingChange(settingPath("toastTemplates"), {
			...(persistedSettings.toastTemplates ?? {}),
			[template.id]: template,
		});
	};
	const persistActionInstance = (instance: PhotonInteractionActionInstance) => {
		onSiteSettingChange(interactionSettingPath("actionInstances"), {
			...(persistedInteractionSettings.actionInstances ?? {}),
			[instance.id]: instance,
		});
	};
	const persistGuardInstance = (instance: PhotonInteractionGuardInstance) => {
		onSiteSettingChange(interactionSettingPath("guardInstances"), {
			...(persistedInteractionSettings.guardInstances ?? {}),
			[instance.id]: instance,
		});
	};
	const setActionOverride = (path: string, value: unknown) => {
		if (!selectedAction) {
			return;
		}

		persistActionInstance({
			...selectedAction,
			presentation:
				selectedAction.presentation.type === "surface"
					? {
							...selectedAction.presentation,
							overrides: setValueAtPath(
								selectedAction.presentation.overrides ?? {},
								path,
								value,
							),
						}
					: selectedAction.presentation,
		});
	};
	const duplicateInstance = () => {
		if (!selectedInstance) {
			return;
		}

		const nextId = `${selectedInstance.id}:copy-${Date.now().toString(36)}`;
		const duplicate = {
			...selectedInstance,
			id: nextId,
			label: `${selectedInstance.label} copy`,
		};

		persistInstance(duplicate);
		setSelectedInstanceId(nextId);
	};
	const createInstance = (definition: PhotonInteractionSurfaceDefinition) => {
		const defaultInstance = definition.defaultInstances?.[0];
		const nextId = `${definition.id}:custom-${Date.now().toString(36)}`;
		const instance: PhotonInteractionSurfaceInstance = {
			id: nextId,
			definitionId: definition.id,
			label: `${definition.label} custom`,
			variant: defaultInstance?.variant,
			props: clonePhotonValue(defaultInstance?.props ?? {}),
		};

		persistInstance(instance);
		setSelectedInstanceId(nextId);
	};
	const disableInstance = () => {
		if (!selectedInstance) {
			return;
		}

		persistInstance({
			...selectedInstance,
			enabled: false,
		});
		setSelectedInstanceId(
			instances.find((instance) => instance.id !== selectedInstance.id)?.id ?? "",
		);
	};
	const restoreInstance = (instance: PhotonInteractionSurfaceInstance) => {
		persistInstance({
			...instance,
			enabled: true,
		});
		setSelectedInstanceId(instance.id);
	};
	const deleteSiteOwnedInstance = () => {
		if (
			!selectedInstance ||
			defaultInstanceIds.has(selectedInstance.id) ||
			selectedIntentBindings.length > 0
		) {
			return;
		}

		const nextInstances = {
			...(persistedSettings.instances ?? {}),
		};
		delete nextInstances[selectedInstance.id];

		persistInstances(nextInstances);
		setSelectedInstanceId(
			instances.find((instance) => instance.id !== selectedInstance.id)?.id ?? "",
		);
	};

	return (
		<section
			className="mx-auto w-full max-w-[1240px] px-1 pb-10"
			data-testid="photon-interaction-surfaces-surface"
		>
			<div className="rounded-[34px] border p-5 sm:p-6" style={shellStyle}>
				<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-3">
							<div
								className="text-[11px] uppercase tracking-[0.3em]"
							style={{ color: "var(--photon-builder-text-soft)" }}
						>
							Surfaces mode
						</div>
						<div className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
							Interactions
						</div>
						<div
							className="max-w-3xl text-sm leading-7"
							style={{ color: "var(--photon-builder-text-muted)" }}
						>
							Manage package-registered dialogs and notifications that are
							opened by website actions.
							</div>
						</div>

						<div className="flex flex-wrap gap-2">
							{[
								{ key: "actions" as const, label: "Actions" },
								{ key: "policies" as const, label: "Policies" },
								{ key: "surfaces" as const, label: "Surfaces" },
								{ key: "toasts" as const, label: "Toasts" },
							].map((tab) => (
								<button
									key={tab.key}
									type="button"
									onClick={() => setActiveTab(tab.key)}
									className="cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold"
									style={activeTab === tab.key ? primaryButtonStyle : buttonStyle}
								>
									{tab.label}
								</button>
							))}
						</div>

						{activeTab === "actions" ? (
							<div className="grid gap-5 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)]">
						<section className="rounded-[28px] border p-4" style={cardStyle}>
							<div
										className="mb-3 text-[11px] uppercase tracking-[0.28em]"
										style={{ color: "var(--photon-builder-text-soft)" }}
									>
										Action instances
									</div>
									<div className="space-y-2">
										{actionInstances.map((instance) => (
											<button
												key={instance.id}
												type="button"
												onClick={() => setSelectedActionId(instance.id)}
												className="w-full cursor-pointer rounded-[18px] border px-3 py-3 text-left transition"
												style={
													selectedAction?.id === instance.id
														? activeStyle
														: fieldStyle
												}
											>
												<div className="text-sm font-semibold">
													{instance.label}
												</div>
												<div
													className="mt-1 text-xs"
													style={{ color: "var(--photon-builder-text-muted)" }}
												>
													{actionCatalog.actionsById.get(instance.definitionId)
														?.label ?? instance.definitionId}
												</div>
											</button>
										))}
									</div>
								</section>
								<section className="rounded-[28px] border p-4" style={cardStyle}>
									{selectedAction ? (
										<div className="space-y-4">
											<div className="flex flex-wrap items-start justify-between gap-3">
												<div>
													<div
														className="text-[11px] uppercase tracking-[0.28em]"
														style={{ color: "var(--photon-builder-text-soft)" }}
													>
														{selectedActionDefinition?.label ??
															selectedAction.definitionId}
													</div>
													<div className="mt-2 text-xl font-semibold">
														{selectedAction.label}
													</div>
												</div>
												<button
													type="button"
													onClick={() =>
														executeInteractionAction(selectedAction.presentation)
													}
													className="cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold"
													style={primaryButtonStyle}
												>
													Preview
												</button>
											</div>
											<label className="grid gap-2 text-sm font-semibold">
												Label
												<input
													value={selectedAction.label}
													onChange={(event) =>
														persistActionInstance({
															...selectedAction,
															label: event.currentTarget.value,
														})
													}
													className="h-11 rounded-[16px] border px-3 text-sm outline-none"
													style={fieldStyle}
												/>
											</label>
											{selectedActionDefinition?.previewScenarios?.length ? (
												<div className="flex flex-wrap gap-2">
													{selectedActionDefinition.previewScenarios.map(
														(scenario) => (
															<button
																key={scenario.id}
																type="button"
																onClick={() =>
																	setSelectedScenarioId(scenario.id)
																}
																className="cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold"
																style={
																	selectedScenarioId === scenario.id
																		? primaryButtonStyle
																		: buttonStyle
																}
															>
																{scenario.label}
															</button>
														),
													)}
												</div>
											) : null}
											{selectedActionDefinition?.states?.length ? (
												<ActionStateCards
													states={selectedActionDefinition.states}
													conditionDefinitions={conditionDefinitions}
													selectedScenarioId={selectedScenarioId || null}
													onSelectScenario={setSelectedScenarioId}
												/>
											) : null}
											{selectedActionSurfaceRequest &&
											selectedActionFields.length ? (
												<PhotonFieldEditorList
													fields={selectedActionFields}
													subjectId={`interaction-action:${selectedAction.id}`}
													getValue={(path) =>
														getValueAtPath(
															selectedActionSurfaceRequest.props,
															path,
														)
													}
													onChange={setActionOverride}
													onFocus={(path) =>
														onSiteSettingFocus(
															interactionSettingPath(
																`actionInstances.${selectedAction.id}.presentation.overrides.${path}`,
															),
														)
													}
												/>
											) : null}
										</div>
									) : (
										<div
											className="rounded-[20px] border border-dashed px-4 py-8 text-center text-sm"
											style={fieldStyle}
										>
											No action instances are registered yet.
										</div>
									)}
								</section>
							</div>
						) : null}

						{activeTab === "policies" ? (
							<PoliciesPanel
								policies={actionCatalog.policies}
								actionCatalog={actionCatalog}
								conditionDefinitions={conditionDefinitions}
								conditionEvaluators={conditionEvaluators}
								selectedPolicyId={selectedPolicyId || null}
								onSelectPolicy={setSelectedPolicyId}
								onSiteSettingChange={onSiteSettingChange}
								onSiteSettingFocus={onSiteSettingFocus}
								siteSettings={site.settings}
							/>
						) : null}

						{activeTab === "guards" ? (
							<div className="grid gap-5 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)]">
								<section className="rounded-[28px] border p-4" style={cardStyle}>
									<div
										className="mb-3 text-[11px] uppercase tracking-[0.28em]"
										style={{ color: "var(--photon-builder-text-soft)" }}
									>
										Guard instances
									</div>
									<div className="space-y-2">
										{guardInstances.map((instance) => (
											<button
												key={instance.id}
												type="button"
												onClick={() => setSelectedGuardId(instance.id)}
												className="w-full cursor-pointer rounded-[18px] border px-3 py-3 text-left transition"
												style={
													selectedGuard?.id === instance.id
														? activeStyle
														: fieldStyle
												}
											>
												<div className="text-sm font-semibold">
													{instance.label}
												</div>
												<div
													className="mt-1 text-xs"
													style={{ color: "var(--photon-builder-text-muted)" }}
												>
													{actionCatalog.guardsById.get(instance.definitionId)
														?.label ?? instance.definitionId}
												</div>
											</button>
										))}
									</div>
								</section>
								<section className="rounded-[28px] border p-4" style={cardStyle}>
									{selectedGuard ? (
										<div className="space-y-4">
											<div>
												<div
													className="text-[11px] uppercase tracking-[0.28em]"
													style={{ color: "var(--photon-builder-text-soft)" }}
												>
													{selectedGuardDefinition?.label ??
														selectedGuard.definitionId}
												</div>
												<div className="mt-2 text-xl font-semibold">
													{selectedGuard.label}
												</div>
											</div>
											<label className="grid gap-2 text-sm font-semibold">
												Label
												<input
													value={selectedGuard.label}
													onChange={(event) =>
														persistGuardInstance({
															...selectedGuard,
															label: event.currentTarget.value,
														})
													}
													className="h-11 rounded-[16px] border px-3 text-sm outline-none"
													style={fieldStyle}
												/>
											</label>
											<div
												className="rounded-[18px] border px-3 py-2 text-xs leading-6"
												style={fieldStyle}
											>
												Blocked action:{" "}
												{selectedGuard.action?.type === "surface"
													? selectedGuard.action.intent ??
														selectedGuard.action.surfaceInstanceId
													: selectedGuard.action?.type === "toast"
														? selectedGuard.action.templateId
														: selectedGuard.action?.type === "link"
															? selectedGuard.action.href
															: "No action configured"}
											</div>
										</div>
									) : (
										<div
											className="rounded-[20px] border border-dashed px-4 py-8 text-center text-sm"
											style={fieldStyle}
										>
											No guard instances are registered yet.
										</div>
									)}
								</section>
							</div>
						) : null}

							{activeTab === "surfaces" ? (
							<>
							<div className="grid gap-5 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)]">
						<section className="rounded-[28px] border p-4" style={cardStyle}>
								<div
									className="mb-3 text-[11px] uppercase tracking-[0.28em]"
									style={{ color: "var(--photon-builder-text-soft)" }}
								>
									Instances
								</div>
								<div className="mb-4 grid gap-2">
									{surfaceDefinitions.map((definition) => (
										<button
											key={definition.id}
											type="button"
											onClick={() => createInstance(definition)}
											className="cursor-pointer rounded-full border px-3 py-2 text-left text-xs font-semibold"
											style={buttonStyle}
										>
											Create {definition.label}
										</button>
									))}
								</div>
								<div className="space-y-2" ref={instanceListRef}>
									{instances.map((instance) => {
									const definition = catalog.definitionsById.get(
										instance.definitionId,
									);

									return (
										<button
											key={instance.id}
											type="button"
											data-instance-id={instance.id}
											data-testid={`photon-interaction-instance-${instance.id}`}
											onClick={() => setSelectedInstanceId(instance.id)}
											className="w-full cursor-pointer rounded-[18px] border px-3 py-3 text-left transition"
											style={
												selectedInstance?.id === instance.id
													? activeStyle
													: fieldStyle
											}
										>
											<div className="text-sm font-semibold">
												{instance.label}
											</div>
											<div
												className="mt-1 text-xs"
												style={{ color: "var(--photon-builder-text-muted)" }}
											>
												{definition?.label ?? instance.definitionId}
											</div>
										</button>
										);
									})}
								</div>
								{disabledInstances.length > 0 ? (
									<div className="mt-5 space-y-2">
										<div
											className="text-[10px] uppercase tracking-[0.26em]"
											style={{ color: "var(--photon-builder-text-soft)" }}
										>
											Disabled
										</div>
										{disabledInstances.map((instance) => (
											<div
												key={instance.id}
												className="rounded-[18px] border px-3 py-3 text-sm"
												style={fieldStyle}
											>
												<div className="font-semibold">{instance.label}</div>
												<button
													type="button"
													onClick={() => restoreInstance(instance)}
													className="mt-2 cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold"
													style={buttonStyle}
												>
													Restore
												</button>
											</div>
										))}
									</div>
								) : null}
							</section>

						<section className="rounded-[28px] border p-4" style={cardStyle}>
							{selectedInstance && selectedDefinition ? (
								<div className="space-y-5">
									<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
										<div>
											<div
												className="text-[11px] uppercase tracking-[0.28em]"
												style={{ color: "var(--photon-builder-text-soft)" }}
											>
												{selectedDefinition.label}
											</div>
											<div className="mt-2 text-xl font-semibold">
												{selectedInstance.label}
											</div>
										</div>
										<div className="flex flex-wrap gap-2">
											<button
												type="button"
												onClick={() =>
													openInteractionSurface({
														surfaceInstanceId: selectedInstance.id,
													})
												}
												className="cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold"
												style={primaryButtonStyle}
											>
												Preview
											</button>
											<button
												type="button"
												onClick={duplicateInstance}
												className="cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold"
												style={buttonStyle}
											>
												Duplicate
											</button>
												<button
													type="button"
													onClick={disableInstance}
													className="cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold"
													style={buttonStyle}
												>
													Disable
												</button>
												{defaultInstanceIds.has(selectedInstance.id) ? null : (
													<button
														type="button"
														onClick={deleteSiteOwnedInstance}
														disabled={selectedInstanceDeleteBlocked}
														className={clsx(
															"rounded-full border px-4 py-2 text-sm font-semibold",
															selectedInstanceDeleteBlocked
																? "cursor-not-allowed opacity-55"
																: "cursor-pointer",
														)}
														style={buttonStyle}
													>
														Delete
													</button>
												)}
											</div>
										</div>
										{selectedInstanceDeleteBlocked ? (
											<div
												className="rounded-[18px] border px-3 py-2 text-xs leading-6"
												style={fieldStyle}
											>
												Rebind{" "}
												{selectedIntentBindings
													.map((binding) => binding.intent)
													.join(", ")}{" "}
												before deleting this instance.
											</div>
										) : null}

										<div className="grid gap-4 md:grid-cols-2">
										<label className="grid gap-2 text-sm font-semibold">
											Label
											<input
												value={selectedInstance.label}
												onFocus={() =>
													onSiteSettingFocus(
														settingPath(
															`instances.${selectedInstance.id}.label`,
														),
													)
												}
												onChange={(event) =>
													persistInstance({
														...selectedInstance,
														label: event.currentTarget.value,
													})
												}
												className="h-11 rounded-[16px] border px-3 text-sm outline-none"
												style={fieldStyle}
											/>
										</label>
										<label className="grid gap-2 text-sm font-semibold">
											Variant
											<select
												value={selectedInstance.variant ?? ""}
												onFocus={() =>
													onSiteSettingFocus(
														settingPath(
															`instances.${selectedInstance.id}.variant`,
														),
													)
												}
												onChange={(event) =>
													persistInstance({
														...selectedInstance,
														variant: event.currentTarget.value || undefined,
													})
												}
												className="h-11 rounded-[16px] border px-3 text-sm outline-none"
												style={fieldStyle}
											>
												<option value="">Default</option>
												{(selectedDefinition.variants ?? []).map((variant) => (
													<option key={variant.id} value={variant.id}>
														{variant.label}
													</option>
												))}
											</select>
										</label>
									</div>

									<PhotonFieldEditorList
										fields={getDefinitionFields(selectedDefinition)}
										subjectId={`interaction-surface:${selectedInstance.id}`}
										getValue={(path) => getInstanceValue(selectedInstance, path)}
										onChange={(path, value) =>
											persistInstance(
												setInstanceValue(selectedInstance, path, value),
											)
										}
										onFocus={(path) =>
											onSiteSettingFocus(
												settingPath(
													`instances.${selectedInstance.id}.props.${path}`,
												),
											)
										}
									/>
								</div>
							) : (
								<div
									className="rounded-[20px] border border-dashed px-4 py-8 text-center text-sm"
									style={fieldStyle}
								>
									No dialog or panel instances are registered yet.
								</div>
							)}
						</section>
					</div>

					<section className="rounded-[28px] border p-4" style={cardStyle}>
						<div
							className="mb-3 text-[11px] uppercase tracking-[0.28em]"
							style={{ color: "var(--photon-builder-text-soft)" }}
						>
							Intent bindings
						</div>
						<div className="grid gap-3 md:grid-cols-2">
							{Object.values(catalog.intents).map((binding) => (
								<label
									key={binding.intent}
									className="grid gap-2 rounded-[18px] border p-3 text-sm font-semibold"
									style={fieldStyle}
								>
									<span>{binding.intent}</span>
									<select
										value={binding.surfaceInstanceId}
										onChange={(event) =>
											persistIntent({
												...binding,
												surfaceInstanceId: event.currentTarget.value,
											})
										}
										className="h-10 rounded-[14px] border px-3 text-sm outline-none"
										style={fieldStyle}
									>
										{instances.map((instance) => (
											<option key={instance.id} value={instance.id}>
												{instance.label}
											</option>
										))}
									</select>
								</label>
								))}
							</div>
							</section>
							</>
							) : null}

						{activeTab === "toasts" ? (
						<section className="rounded-[28px] border p-4" style={cardStyle}>
						<div className="grid gap-5 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)]">
							<div>
								<div
									className="mb-3 text-[11px] uppercase tracking-[0.28em]"
									style={{ color: "var(--photon-builder-text-soft)" }}
								>
									Toast templates
								</div>
								<div className="space-y-2">
									{toastTemplates.map((template) => (
										<button
											key={template.id}
											type="button"
											onClick={() => setSelectedTemplateId(template.id)}
											className="w-full cursor-pointer rounded-[18px] border px-3 py-3 text-left transition"
											style={
												selectedTemplate?.id === template.id
													? activeStyle
													: fieldStyle
											}
										>
											<div className="text-sm font-semibold">
												{template.label}
											</div>
											<div
												className="mt-1 text-xs"
												style={{ color: "var(--photon-builder-text-muted)" }}
											>
												{template.status ?? "message"}
											</div>
										</button>
									))}
								</div>
							</div>

							{selectedTemplate ? (
								<div className="space-y-4">
									<div className="flex flex-wrap justify-end gap-2">
										<button
											type="button"
											onClick={() =>
												showInteractionToast({
													templateId: selectedTemplate.id,
												})
											}
											className="cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold"
											style={primaryButtonStyle}
										>
											Preview toast
										</button>
									</div>
									<PhotonFieldEditorList
										fields={[
											{
												path: "title",
												label: "Title",
												kind: "text",
												group: "content",
												localization: "localized",
											},
											{
												path: "description",
												label: "Description",
												kind: "textarea",
												group: "content",
												localization: "localized",
											},
											{
												path: "status",
												label: "Status",
												kind: "select",
												group: "style",
												localization: "shared",
												options: [
													{ label: "Message", value: "message" },
													{ label: "Success", value: "success" },
													{ label: "Info", value: "info" },
													{ label: "Warning", value: "warning" },
													{ label: "Error", value: "error" },
												],
											},
										]}
										subjectId={`interaction-toast:${selectedTemplate.id}`}
										getValue={(path) => getValueAtPath(selectedTemplate, path)}
										onChange={(path, value) =>
											persistTemplate(
												setValueAtPath(
													selectedTemplate,
													path,
													value,
												) as PhotonInteractionToastTemplate,
											)
										}
										onFocus={(path) =>
											onSiteSettingFocus(
												settingPath(
													`toastTemplates.${selectedTemplate.id}.${path}`,
												),
											)
										}
									/>
								</div>
							) : (
								<div
									className="rounded-[20px] border border-dashed px-4 py-8 text-center text-sm"
									style={fieldStyle}
								>
									No toast templates are registered yet.
								</div>
							)}
						</div>
						</section>
						) : null}

						<section className="rounded-[28px] border p-4" style={cardStyle}>
						<div
							className="mb-3 text-[11px] uppercase tracking-[0.28em]"
							style={{ color: "var(--photon-builder-text-soft)" }}
						>
							Registered definitions
						</div>
						<div className="flex flex-wrap gap-2">
							{catalog.definitions.map((definition) => (
								<span
									key={definition.id}
									className={clsx(
										"rounded-full border px-3 py-1 text-xs font-semibold",
									)}
									style={buttonStyle}
								>
									{definition.label}
								</span>
							))}
						</div>
					</section>
				</div>
			</div>
		</section>
	);
};
