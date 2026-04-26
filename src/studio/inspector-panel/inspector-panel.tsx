"use client";

import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { usePhotonStore } from "../../context/photon-context";
import { getPhotonSelectedBlock } from "../../context/photon-store";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";
import {
	translatePhotonFieldGroup,
	translatePhotonPaletteCategory,
} from "../../i18n/photon-labels";
import type {
	PhotonField,
	PhotonNestedField,
	PhotonPageCatalogItem,
	PhotonPageSettings,
} from "../../types";
import { FIELD_GROUP_LABELS } from "../shared";
import type { InspectorDefinitionMeta, InspectorGroups } from "../types";
import { BlockPreviewScenariosPicker } from "./block-preview-scenarios-picker";
import { FieldEditor } from "./field-editor";
import {
	PhotonInspectorDensityProvider,
	usePhotonInspectorDensity,
} from "./inspector-density-context";
import { RouteFamilyEditor } from "./route-family-editor";
import {
	InspectorTriggerTab,
	useInspectorTriggerSlots,
} from "./inspector-trigger-tab";

type InspectorPanelProps = {
	definitionFields: PhotonField[];
	inspectorGroups: InspectorGroups;
	selectedFieldPath: string | null;
	inspectorDefinition: InspectorDefinitionMeta | null;
	pageSettings: PhotonPageSettings;
	currentPage: PhotonPageCatalogItem | null;
	onContentLocaleChange?: (locale: string) => void;
	onCollapse?: () => void;
};

const readString = (
	settings: Record<string, unknown>,
	key: string,
): string | undefined => {
	const value = settings[key];

	return typeof value === "string" && value.trim() !== "" ? value : undefined;
};

const fieldSupportsLocalization = (
	field: PhotonField | PhotonNestedField,
	inheritedLocalization?: "localized" | "shared",
): boolean => {
	const effectiveLocalization = field.localization ?? inheritedLocalization;

	if (
		effectiveLocalization === "localized" &&
		field.kind !== "object" &&
		field.kind !== "repeater"
	) {
		return true;
	}

	if (field.kind === "object") {
		return (field.fields ?? []).some((nestedField) =>
			fieldSupportsLocalization(nestedField, effectiveLocalization),
		);
	}

	if (field.kind === "repeater") {
		return (
			(field.itemField
				? fieldSupportsLocalization(field.itemField, effectiveLocalization)
				: false) ||
			(field.fields ?? []).some((nestedField) =>
				fieldSupportsLocalization(nestedField, effectiveLocalization),
			)
		);
	}

	return false;
};

const GROUP_ORDER = ["content", "style", "layout", "data", "misc"] as const;

const orderInspectorGroupKeys = (groups: InspectorGroups): string[] => {
	const keys = Object.keys(groups);
	return keys.sort((left, right) => {
		const leftIndex = GROUP_ORDER.indexOf(
			left as (typeof GROUP_ORDER)[number],
		);
		const rightIndex = GROUP_ORDER.indexOf(
			right as (typeof GROUP_ORDER)[number],
		);
		const leftRank = leftIndex === -1 ? GROUP_ORDER.length : leftIndex;
		const rightRank = rightIndex === -1 ? GROUP_ORDER.length : rightIndex;
		if (leftRank !== rightRank) {
			return leftRank - rightRank;
		}
		return left.localeCompare(right);
	});
};

const InspectorPanelComponent = ({
	definitionFields,
	inspectorGroups,
	selectedFieldPath,
	inspectorDefinition,
	pageSettings,
	currentPage,
	onContentLocaleChange,
	onCollapse,
}: InspectorPanelProps) => {
	const document = usePhotonStore((state) => state.document);
	const { contentLocale, editableLocales, translate } = usePhotonI18n();
	const { tokens } = usePhotonInspectorDensity();
	const selectedBlock = usePhotonStore((state) =>
		getPhotonSelectedBlock(state),
	);
	const getFieldValue = usePhotonStore((state) => state.getFieldValue);
	const updateFieldValue = usePhotonStore(
		(state) => state.updateFieldValue,
	);
	const selectField = usePhotonStore((state) => state.selectField);
	const selectedInspectorTriggerId = usePhotonStore(
		(state) => state.selectedInspectorTriggerId,
	);
	const selectInspectorTrigger = usePhotonStore(
		(state) => state.selectInspectorTrigger,
	);
	const [activeTab, setActiveTab] = useState<"block" | "page">("block");
	const triggerSlots = useInspectorTriggerSlots(selectedBlock);
	const activeTriggerSlot =
		selectedInspectorTriggerId && triggerSlots.length
			? triggerSlots.find((slot) => slot.id === selectedInspectorTriggerId) ??
				null
			: null;
	const isTriggerTabActive = Boolean(activeTriggerSlot);
	const [showBlockJson, setShowBlockJson] = useState(false);
	const [showDocumentJson, setShowDocumentJson] = useState(false);
	const orderedGroupKeys = useMemo(
		() => orderInspectorGroupKeys(inspectorGroups),
		[inspectorGroups],
	);
	const [selectedGroupKey, setSelectedGroupKey] = useState<string | null>(
		null,
	);
	const activeGroupKey = useMemo(() => {
		if (selectedGroupKey && orderedGroupKeys.includes(selectedGroupKey)) {
			return selectedGroupKey;
		}
		return orderedGroupKeys[0] ?? null;
	}, [orderedGroupKeys, selectedGroupKey]);
	const hasBlockContext =
		selectedBlock !== null || inspectorDefinition !== null;
	const pageTabLabel = currentPage?.isDynamic
		? translate("photon.studio.inspector.templateTab", "Template")
		: translate("photon.studio.inspector.pageTab", "Page");
	const templateSettings =
		typeof pageSettings.template === "object" && pageSettings.template !== null
			? (pageSettings.template as Record<string, unknown>)
			: {};
	const pageSettingsSummary =
		typeof pageSettings.page === "object" && pageSettings.page !== null
			? (pageSettings.page as Record<string, unknown>)
			: {};
	const summarySettings = currentPage?.isDynamic
		? templateSettings
		: pageSettingsSummary;
	const summaryName =
		readString(summarySettings, "name") ?? currentPage?.name ?? document.name;
	const summaryRoute =
		(currentPage?.isDynamic
			? readString(summarySettings, "pathPattern")
			: readString(summarySettings, "path")) ??
		currentPage?.routePattern ??
		currentPage?.route ??
		document.route;
	const currentRoute =
		readString(summarySettings, "currentPath") ?? currentPage?.route;
	const selectedBlockJson = useMemo(
		() =>
			showBlockJson && selectedBlock
				? JSON.stringify(selectedBlock, null, 2)
				: "",
		[showBlockJson, selectedBlock],
	);
	const documentJson = useMemo(
		() =>
			showDocumentJson
				? JSON.stringify(
						{
							id: document.id,
							route: document.route,
							updatedAt: document.updatedAt,
							blocks: document.blocks.map((block) => ({
								id: block.id,
								module: block.module,
								type: block.type,
								areas: block.areas?.length ?? 0,
							})),
						},
						null,
						2,
					)
				: "",
		[document, showDocumentJson],
	);
	useEffect(() => {
		if (selectedBlock) {
			setActiveTab("block");
		}
	}, [selectedBlock]);

	return (
		<div
			className="flex h-full flex-col text-[12px]"
			style={{
				background: "var(--photon-builder-shell-muted)",
				color: "var(--photon-builder-text)",
			}}
		>
			<div
				className={clsx(
					"flex items-center justify-between gap-2 border-b",
					tokens.headerPadding,
				)}
				style={{
					borderColor: "var(--photon-builder-border)",
					background: "var(--photon-builder-shell-strong)",
				}}
			>
				<div className="flex min-w-0 items-center gap-1">
					<button
						type="button"
						onClick={() => {
							selectInspectorTrigger(null);
							setActiveTab("block");
						}}
						className={tokens.tabClass}
						style={
							activeTab === "block" && !isTriggerTabActive
								? {
										background: "var(--photon-builder-accent-soft)",
										color: "var(--photon-builder-accent-text)",
									}
								: { color: "var(--photon-builder-text-muted)" }
						}
					>
						{translate("photon.studio.inspector.blockTab", "Block")}
					</button>
					{triggerSlots.map((slot) => {
						const isActive =
							isTriggerTabActive &&
							activeTriggerSlot?.id === slot.id;
						return (
							<button
								key={slot.id}
								type="button"
								onClick={() => {
									selectInspectorTrigger(slot.id);
									setActiveTab("block");
								}}
								className={tokens.tabClass}
								style={
									isActive
										? {
												background:
													"var(--photon-builder-accent-soft)",
												color: "var(--photon-builder-accent-text)",
											}
										: { color: "var(--photon-builder-text-muted)" }
								}
								data-testid={`photon-inspector-trigger-tab-${slot.id}`}
							>
								{slot.label}
							</button>
						);
					})}
					<button
						type="button"
						onClick={() => {
							selectInspectorTrigger(null);
							setActiveTab("page");
						}}
						className={tokens.tabClass}
						style={
							activeTab === "page"
								? {
										background: "var(--photon-builder-accent-soft)",
										color: "var(--photon-builder-accent-text)",
									}
								: { color: "var(--photon-builder-text-muted)" }
						}
					>
						{pageTabLabel}
					</button>
				</div>
				{onCollapse ? (
					<button
						type="button"
						onClick={onCollapse}
						className="cursor-pointer rounded-sm p-1 transition"
						style={{
							color: "var(--photon-builder-text-soft)",
						}}
						aria-label="Collapse inspector"
					>
						<ChevronRight className="h-3.5 w-3.5" />
					</button>
				) : null}
			</div>

			<div
				className="photon-inspector-scroll flex-1 space-y-1.5 overflow-y-auto px-1.5 py-1.5"
				style={{ background: "var(--photon-builder-shell-muted)" }}
			>
				{activeTab === "block" && !selectedBlock && inspectorDefinition ? (
					<>
						<section
							className="rounded-md border px-2 py-2"
							style={{
								borderColor: "var(--photon-builder-border)",
								background: "var(--photon-builder-panel-muted)",
							}}
						>
							<div
								className={tokens.sectionHeaderClass}
								style={{ color: "var(--photon-builder-text-soft)" }}
							>
								Palette block
							</div>
							<div
								className={clsx("mt-1", tokens.subtitleClass)}
								style={{ color: "var(--photon-builder-text)" }}
							>
								{inspectorDefinition.label}
							</div>
							<div className="mt-1 flex flex-wrap items-center gap-2">
								<div
									className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]"
									style={{
										borderColor: "var(--photon-builder-border)",
										background: "var(--photon-builder-field)",
										color: "var(--photon-builder-text-soft)",
									}}
								>
									{inspectorDefinition.module}
								</div>
								<div
									className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
									style={{
										borderColor: "var(--photon-builder-border)",
										background: "var(--photon-builder-field)",
										color: "var(--photon-builder-text-soft)",
									}}
								>
									{translatePhotonPaletteCategory(
										inspectorDefinition.category,
										translate,
									)}
								</div>
								<div
									className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
									style={{
										borderColor: "var(--photon-builder-border-strong)",
										background: "var(--photon-builder-accent-strong)",
										color: "var(--photon-builder-accent)",
									}}
								>
									{inspectorDefinition.fieldCount} settings
								</div>
							</div>
							<div
								className="mt-1.5 text-[11.5px] leading-snug"
								style={{ color: "var(--photon-builder-text-muted)" }}
							>
								{inspectorDefinition.description}
							</div>
						</section>

						{Object.entries(inspectorGroups).map(([groupKey, fields]) => (
							<section
								key={groupKey}
								className="rounded-md border px-2 py-2"
								style={{
									borderColor: "var(--photon-builder-border)",
									background: "var(--photon-builder-panel-muted)",
								}}
							>
								<div className="mb-4 flex items-center justify-between gap-3">
									<div
										className={tokens.sectionHeaderClass}
										style={{ color: "var(--photon-builder-text-soft)" }}
									>
										{translate(
											FIELD_GROUP_LABELS[groupKey] ?? FIELD_GROUP_LABELS.misc,
											translatePhotonFieldGroup(groupKey, translate),
										)}
									</div>
									<div
										className="font-mono text-[10px] uppercase tracking-[0.24em]"
										style={{ color: "var(--photon-builder-text-ghost)" }}
									>
										{fields.length}
									</div>
								</div>
								<div className="space-y-3">
									{fields.map((field) => (
										<div
											key={field.path}
											className="rounded-2xl border px-4 py-3"
											style={{
												borderColor: "var(--photon-builder-border)",
												background: "var(--photon-builder-field)",
											}}
										>
											<div className="flex items-center justify-between gap-3">
												<div
													className="text-sm font-semibold"
													style={{ color: "var(--photon-builder-text)" }}
												>
													{field.label}
												</div>
												<div
													className="rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.22em]"
													style={{
														borderColor: "var(--photon-builder-border)",
														color: "var(--photon-builder-text-soft)",
													}}
												>
													{field.kind}
												</div>
											</div>
											<div
												className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em]"
												style={{ color: "var(--photon-builder-text-ghost)" }}
											>
												{field.path}
											</div>
											{field.description ? (
												<div
													className="mt-2 text-xs leading-5"
													style={{ color: "var(--photon-builder-text-soft)" }}
												>
													{field.description}
												</div>
											) : null}
										</div>
									))}
								</div>
							</section>
						))}
					</>
				) : null}

				{activeTab === "block" && selectedBlock && isTriggerTabActive && activeTriggerSlot ? (
					<InspectorTriggerTab block={selectedBlock} slot={activeTriggerSlot} />
				) : null}

				{activeTab === "block" && selectedBlock && !isTriggerTabActive ? (
					<>
						<section
							className="rounded-md border px-2 py-2"
							style={{
								borderColor: "var(--photon-builder-border)",
								background: "var(--photon-builder-panel-muted)",
							}}
						>
							<div
								className={tokens.sectionHeaderClass}
								style={{ color: "var(--photon-builder-text-soft)" }}
							>
								Selected block
							</div>
							<div
								className={clsx("mt-1", tokens.subtitleClass)}
								style={{ color: "var(--photon-builder-text)" }}
							>
								{inspectorDefinition?.label ?? selectedBlock.type}
							</div>
							<div className="mt-1 flex flex-wrap items-center gap-2">
								<div
									className="font-mono text-[11px] uppercase tracking-[0.24em]"
									style={{ color: "var(--photon-builder-text-ghost)" }}
								>
									{selectedBlock.module}
								</div>
								{inspectorDefinition ? (
									<div
										className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
										style={{
											borderColor: "var(--photon-builder-border)",
											background: "var(--photon-builder-field)",
											color: "var(--photon-builder-text-soft)",
										}}
									>
										{translatePhotonPaletteCategory(
											inspectorDefinition.category,
											translate,
										)}
									</div>
								) : null}
							</div>
							{inspectorDefinition?.description ? (
								<div
									className="mt-1.5 text-[11.5px] leading-snug"
									style={{ color: "var(--photon-builder-text-muted)" }}
								>
									{inspectorDefinition.description}
								</div>
							) : null}
							{selectedFieldPath ? (
								<div
									className="mt-4 rounded-2xl border px-3 py-3 text-sm"
									style={{
										borderColor: "var(--photon-builder-border-strong)",
										background: "var(--photon-builder-accent-strong)",
										color: "var(--photon-builder-accent)",
									}}
								>
									Active field:{" "}
									<span className="font-mono">{selectedFieldPath}</span>
								</div>
							) : null}
						</section>

						<BlockPreviewScenariosPicker block={selectedBlock} />

						<RouteFamilyEditor />

						{orderedGroupKeys.length > 0 ? (
							<section
								className="rounded-md border px-2 py-2"
								style={{
									borderColor: "var(--photon-builder-border)",
									background: "var(--photon-builder-panel-muted)",
								}}
								data-testid="photon-inspector-group-tabs"
							>
								<div
									className="mb-4 flex flex-wrap gap-1"
									role="tablist"
									aria-label="Field groups"
								>
									{orderedGroupKeys.map((groupKey) => {
										const isActive = groupKey === activeGroupKey;
										const groupFields = inspectorGroups[groupKey] ?? [];
										const label = translate(
											FIELD_GROUP_LABELS[groupKey] ?? FIELD_GROUP_LABELS.misc,
											translatePhotonFieldGroup(groupKey, translate),
										);
										return (
											<button
												key={groupKey}
												type="button"
												role="tab"
												aria-selected={isActive}
												onClick={() => setSelectedGroupKey(groupKey)}
												className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
												style={
													isActive
														? {
																borderColor:
																	"var(--photon-builder-border-strong)",
																background:
																	"var(--photon-builder-accent-soft)",
																color: "var(--photon-builder-accent-text)",
															}
														: {
																borderColor: "var(--photon-builder-border)",
																background: "var(--photon-builder-panel)",
																color: "var(--photon-builder-text-soft)",
															}
												}
												data-testid={`photon-inspector-group-tab-${groupKey}`}
											>
												<span>{label}</span>
												<span
													className="rounded-full border px-2 py-0.5 text-[10px] tracking-normal"
													style={{
														borderColor: "var(--photon-builder-border)",
														color: "var(--photon-builder-text-ghost)",
													}}
												>
													{groupFields.length}
												</span>
											</button>
										);
									})}
								</div>
								{(() => {
									const activeKey = activeGroupKey ?? orderedGroupKeys[0];
									const fields = activeKey
										? (inspectorGroups[activeKey] ?? [])
										: [];
									const showLocaleSwitch =
										activeKey === "content" &&
										editableLocales.length > 1 &&
										fields.some((field) => fieldSupportsLocalization(field));
									return (
										<>
											{showLocaleSwitch ? (
												<div
													className="mb-4 inline-flex flex-wrap rounded-full border p-1"
													style={{
														borderColor: "var(--photon-builder-border)",
														background: "var(--photon-builder-panel)",
													}}
												>
													{editableLocales.map((locale) => (
														<button
															key={locale.code}
															type="button"
															onClick={() =>
																onContentLocaleChange?.(locale.code)
															}
															className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition"
															style={
																locale.code === contentLocale
																	? {
																			background:
																				"var(--photon-builder-accent-soft)",
																			color:
																				"var(--photon-builder-accent-text)",
																		}
																	: {
																			color:
																				"var(--photon-builder-text-muted)",
																		}
															}
														>
															{locale.code}
														</button>
													))}
												</div>
											) : null}
											<div
												className="space-y-4"
												data-testid={`photon-inspector-group-panel-${activeKey ?? "empty"}`}
											>
												{fields.map((field) => (
													<FieldEditor
														key={field.path}
														field={field}
														blockId={selectedBlock.id}
														value={getFieldValue(selectedBlock.id, field.path)}
														onFocus={(path) =>
															selectField(
																selectedBlock.id,
																path ?? field.path,
															)
														}
														onChange={(value) =>
															updateFieldValue(
																selectedBlock.id,
																field.path,
																value,
															)
														}
													/>
												))}
											</div>
										</>
									);
								})()}
							</section>
						) : null}

						<section
							className="rounded-md border px-2 py-2"
							style={{
								borderColor: "var(--photon-builder-border)",
								background: "var(--photon-builder-panel-muted)",
							}}
						>
							<button
								type="button"
								onClick={() => setShowBlockJson((current) => !current)}
								className="flex w-full cursor-pointer items-center justify-between gap-3 text-left"
							>
								<div
									className={tokens.sectionHeaderClass}
									style={{ color: "var(--photon-builder-text-soft)" }}
								>
									Raw block manifest
								</div>
								{showBlockJson ? (
									<ChevronDown
										className="h-4 w-4"
										style={{ color: "var(--photon-builder-text-soft)" }}
									/>
								) : (
									<ChevronRight
										className="h-4 w-4"
										style={{ color: "var(--photon-builder-text-soft)" }}
									/>
								)}
							</button>
							{showBlockJson ? (
								<pre
									className="mt-4 h-[320px] overflow-x-auto rounded-2xl border p-4 text-xs leading-6"
									style={{
										borderColor: "var(--photon-builder-border)",
										background: "var(--photon-builder-field)",
										color: "var(--photon-builder-text-muted)",
									}}
								>
									{selectedBlockJson}
								</pre>
							) : null}
						</section>
					</>
				) : null}

				{activeTab === "block" ? (
					<>
						<section
							className="rounded-md border px-2 py-2"
							style={{
								borderColor: "var(--photon-builder-border)",
								background: "var(--photon-builder-panel-muted)",
							}}
						>
							<button
								type="button"
								onClick={() => setShowDocumentJson((current) => !current)}
								className="flex w-full cursor-pointer items-center justify-between gap-3 text-left"
							>
								<div
									className={tokens.sectionHeaderClass}
									style={{ color: "var(--photon-builder-text-soft)" }}
								>
									Document JSON
								</div>
								{showDocumentJson ? (
									<ChevronDown
										className="h-4 w-4"
										style={{ color: "var(--photon-builder-text-soft)" }}
									/>
								) : (
									<ChevronRight
										className="h-4 w-4"
										style={{ color: "var(--photon-builder-text-soft)" }}
									/>
								)}
							</button>
							{showDocumentJson ? (
								<pre
									className="mt-4 max-h-[320px] overflow-auto rounded-2xl border p-4 text-xs leading-6"
									style={{
										borderColor: "var(--photon-builder-border)",
										background: "var(--photon-builder-field)",
										color: "var(--photon-builder-text-muted)",
									}}
								>
									{documentJson}
								</pre>
							) : null}
						</section>

						{!definitionFields.length && !hasBlockContext ? (
							<section
								className="rounded-[24px] border border-dashed px-4 py-4 text-sm leading-6"
								style={{
									borderColor: "var(--photon-builder-border)",
									color: "var(--photon-builder-text-muted)",
								}}
							>
								Builder tip: select any live block, click any palette block, or
								drop a new block into one of the visible plus zones to inspect
								it here.
							</section>
						) : null}
					</>
				) : null}

				{activeTab === "page" ? (
					<>
						<section
							className="rounded-[24px] border border-dashed px-4 py-4 text-sm leading-6"
							style={{
								borderColor: "var(--photon-builder-border)",
								color: "var(--photon-builder-text-muted)",
							}}
						>
							<div
								className={tokens.sectionHeaderClass}
								style={{ color: "var(--photon-builder-text-soft)" }}
							>
								{pageTabLabel} settings
							</div>
							<div
								className={clsx("mt-1", tokens.subtitleClass)}
								style={{ color: "var(--photon-builder-text)" }}
							>
								{summaryName}
							</div>
							<div className="mt-2 flex flex-wrap items-center gap-2">
								<div
									className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
									style={{
										borderColor: "var(--photon-builder-border)",
										background: "var(--photon-builder-field)",
										color: "var(--photon-builder-text-soft)",
									}}
								>
									{currentPage?.kind ?? "page"}
								</div>
								<div
									className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]"
									style={{
										borderColor: "var(--photon-builder-border)",
										background: "var(--photon-builder-field)",
										color: "var(--photon-builder-text-soft)",
									}}
								>
									{currentPage?.route ?? document.route}
								</div>
								{currentPage?.isDynamic ? (
									<div className="rounded-full border border-amber-300/18 bg-amber-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-amber-100/80">
										Dynamic template
									</div>
								) : null}
							</div>
							<div
								className="mt-4 rounded-2xl border px-3 py-3 text-sm leading-6"
								style={{
									borderColor: "var(--photon-builder-border-strong)",
									background: "var(--photon-builder-accent-strong)",
									color: "var(--photon-builder-accent)",
								}}
							>
								Open Page Settings from the top canvas toolbar to edit route
								basics and package-registered settings like SEO.
							</div>
						</section>

						<section
							className="rounded-md border px-2 py-2"
							style={{
								borderColor: "var(--photon-builder-border)",
								background: "var(--photon-builder-panel-muted)",
							}}
						>
							<div
								className="mb-4 text-[11px] uppercase tracking-[0.28em]"
								style={{ color: "var(--photon-builder-text-soft)" }}
							>
								Basics
							</div>
							<div className="space-y-3">
								<div
									className="rounded-2xl border px-4 py-3"
									style={{
										borderColor: "var(--photon-builder-border)",
										background: "var(--photon-builder-field)",
									}}
								>
									<div
										className="text-[11px] uppercase tracking-[0.24em]"
										style={{ color: "var(--photon-builder-text-soft)" }}
									>
										Name
									</div>
									<div
										className="mt-2 text-sm font-semibold"
										style={{ color: "var(--photon-builder-text)" }}
									>
										{summaryName}
									</div>
								</div>
								<div
									className="rounded-2xl border px-4 py-3"
									style={{
										borderColor: "var(--photon-builder-border)",
										background: "var(--photon-builder-field)",
									}}
								>
									<div
										className="text-[11px] uppercase tracking-[0.24em]"
										style={{ color: "var(--photon-builder-text-soft)" }}
									>
										{currentPage?.isDynamic ? "Route pattern" : "Path"}
									</div>
									<div
										className="mt-2 font-mono text-sm"
										style={{ color: "var(--photon-builder-text-muted)" }}
									>
										{summaryRoute}
									</div>
								</div>
								{currentPage?.isDynamic ? (
									<div
										className="rounded-2xl border px-4 py-3"
										style={{
											borderColor: "var(--photon-builder-border)",
											background: "var(--photon-builder-field)",
										}}
									>
										<div
											className="text-[11px] uppercase tracking-[0.24em]"
											style={{ color: "var(--photon-builder-text-soft)" }}
										>
											Current route
										</div>
										<div
											className="mt-2 font-mono text-sm"
											style={{ color: "var(--photon-builder-text-muted)" }}
										>
											{currentRoute}
										</div>
									</div>
								) : null}
							</div>
						</section>
					</>
				) : null}
			</div>
		</div>
	);
};

const InspectorPanelWithDensity = (props: InspectorPanelProps) => (
	<PhotonInspectorDensityProvider>
		<InspectorPanelComponent {...props} />
	</PhotonInspectorDensityProvider>
);

export const InspectorPanel = memo(InspectorPanelWithDensity);
