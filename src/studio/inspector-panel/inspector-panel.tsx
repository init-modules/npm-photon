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
import { PhotonInspectorSection } from "./inspector-section";
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

// Block-tab groups: Стиль first (the group "feel" of the block), then
// Контент (what the block displays), then any extra groups packages may
// register. `layout` is now its own top-level inspector tab and is
// excluded from the block flow.
const BLOCK_GROUP_ORDER = ["style", "content", "data", "misc"] as const;

const orderInspectorGroupKeys = (
	groups: InspectorGroups,
	options: { exclude?: ReadonlySet<string> } = {},
): string[] => {
	const exclude = options.exclude ?? new Set<string>();
	const keys = Object.keys(groups).filter((key) => !exclude.has(key));
	return keys.sort((left, right) => {
		const leftIndex = BLOCK_GROUP_ORDER.indexOf(
			left as (typeof BLOCK_GROUP_ORDER)[number],
		);
		const rightIndex = BLOCK_GROUP_ORDER.indexOf(
			right as (typeof BLOCK_GROUP_ORDER)[number],
		);
		const leftRank =
			leftIndex === -1 ? BLOCK_GROUP_ORDER.length : leftIndex;
		const rightRank =
			rightIndex === -1 ? BLOCK_GROUP_ORDER.length : rightIndex;
		if (leftRank !== rightRank) {
			return leftRank - rightRank;
		}
		return left.localeCompare(right);
	});
};

const LAYOUT_GROUP_KEY = "layout";
const BLOCK_TAB_EXCLUDED_GROUPS = new Set<string>([LAYOUT_GROUP_KEY]);

const InspectorPanelComponent = ({
	definitionFields,
	inspectorGroups,
	selectedFieldPath,
	inspectorDefinition,
	pageSettings,
	currentPage,
	onCollapse,
}: InspectorPanelProps) => {
	const document = usePhotonStore((state) => state.document);
	const { translate } = usePhotonI18n();
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
	const triggerSlots = useInspectorTriggerSlots(selectedBlock);
	const activeTriggerSlot =
		selectedInspectorTriggerId && triggerSlots.length
			? triggerSlots.find((slot) => slot.id === selectedInspectorTriggerId) ??
				null
			: null;
	const layoutFields = inspectorGroups[LAYOUT_GROUP_KEY] ?? [];
	const hasLayoutFields = layoutFields.length > 0;
	const hasSurfaces = triggerSlots.length > 0;
	type InspectorTopTab = "block" | "surfaces" | "layout" | "page";
	const [activeTab, setActiveTab] = useState<InspectorTopTab>("block");
	// If the user lands on a tab that is no longer available (block lost
	// its triggers / layout fields), bounce back to "block" silently.
	useEffect(() => {
		if (activeTab === "surfaces" && !hasSurfaces) {
			setActiveTab("block");
		}
		if (activeTab === "layout" && !hasLayoutFields) {
			setActiveTab("block");
		}
	}, [activeTab, hasSurfaces, hasLayoutFields]);
	const blockGroupKeys = useMemo(
		() =>
			orderInspectorGroupKeys(inspectorGroups, {
				exclude: BLOCK_TAB_EXCLUDED_GROUPS,
			}),
		[inspectorGroups],
	);
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
	// JSON viewers are cheap to compute. PhotonInspectorSection unmounts
	// the body when collapsed (default), so the <pre> is not in the DOM
	// until the user expands the section.
	const selectedBlockJson = useMemo(
		() => (selectedBlock ? JSON.stringify(selectedBlock, null, 2) : ""),
		[selectedBlock],
	);
	const documentJson = useMemo(
		() =>
			JSON.stringify(
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
			),
		[document],
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
					"flex items-center justify-between gap-2",
					tokens.headerPadding,
				)}
				style={{
					background: "var(--photon-builder-shell-strong)",
				}}
			>
				<div className="flex min-w-0 items-center gap-1">
					{(
						[
							{
								key: "block" as const,
								label: translate(
									"photon.studio.inspector.blockTab",
									"Block",
								),
								enabled: true,
							},
							{
								key: "surfaces" as const,
								label: translate(
									"photon.studio.inspector.surfacesTab",
									"Surfaces",
								),
								enabled: hasSurfaces,
							},
							{
								key: "layout" as const,
								label: translate(
									"photon.studio.inspector.layoutTab",
									"Layout",
								),
								enabled: hasLayoutFields,
							},
							{
								key: "page" as const,
								label: pageTabLabel,
								enabled: true,
							},
						] satisfies Array<{
							key: InspectorTopTab;
							label: string;
							enabled: boolean;
						}>
					)
						.filter((tab) => tab.enabled)
						.map((tab) => {
							const isActive = activeTab === tab.key;
							return (
								<button
									key={tab.key}
									type="button"
									role="tab"
									aria-selected={isActive}
									onClick={() => {
										if (tab.key !== "surfaces") {
											selectInspectorTrigger(null);
										}
										setActiveTab(tab.key);
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
									data-testid={`photon-inspector-tab-${tab.key}`}
								>
									{tab.label}
								</button>
							);
						})}
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
						<PhotonInspectorSection
							id="palette-block-summary"
							nonCollapsible
							title={
								<span
									className={clsx(tokens.subtitleClass)}
									style={{ color: "var(--photon-builder-text)" }}
								>
									{inspectorDefinition.label}
								</span>
							}
						>
							<div className="flex flex-wrap items-center gap-1">
								<span
									className="rounded-sm px-1.5 py-0 font-mono text-[10px] uppercase tracking-[0.14em]"
									style={{
										background: "var(--photon-builder-field)",
										color: "var(--photon-builder-text-soft)",
									}}
								>
									{inspectorDefinition.module}
								</span>
								<span
									className="rounded-sm px-1.5 py-0 text-[10px] uppercase tracking-[0.14em]"
									style={{
										background: "var(--photon-builder-field)",
										color: "var(--photon-builder-text-soft)",
									}}
								>
									{translatePhotonPaletteCategory(
										inspectorDefinition.category,
										translate,
									)}
								</span>
								<span
									className="rounded-sm px-1.5 py-0 text-[10px] uppercase tracking-[0.14em]"
									style={{
										background: "var(--photon-builder-accent-strong)",
										color: "var(--photon-builder-accent)",
									}}
								>
									{inspectorDefinition.fieldCount} settings
								</span>
							</div>
							<div
								className="mt-1 text-[11px] leading-snug"
								style={{ color: "var(--photon-builder-text-muted)" }}
							>
								{inspectorDefinition.description}
							</div>
						</PhotonInspectorSection>

						{Object.entries(inspectorGroups).map(([groupKey, fields]) => (
							<PhotonInspectorSection
								key={groupKey}
								id={`palette-group-${groupKey}`}
								variant="group"
								title={translate(
									FIELD_GROUP_LABELS[groupKey] ?? FIELD_GROUP_LABELS.misc,
									translatePhotonFieldGroup(groupKey, translate),
								)}
								trailing={
									<span
										className="rounded-sm px-1 font-mono text-[9px] tabular-nums"
										style={{
											background: "var(--photon-builder-field)",
											color: "var(--photon-builder-text-soft)",
										}}
									>
										{fields.length}
									</span>
								}
							>
								<div className="space-y-1">
									{fields.map((field) => (
										<div
											key={field.path}
											className="rounded-sm px-2 py-1.5"
											style={{
												background: "var(--photon-builder-field)",
											}}
										>
											<div className="flex items-center justify-between gap-2">
												<div
													className="text-[12px] font-semibold leading-tight"
													style={{ color: "var(--photon-builder-text)" }}
												>
													{field.label}
												</div>
												<div
													className="rounded-sm px-1.5 py-0.5 text-[9.5px] uppercase tracking-[0.16em]"
													style={{
														color: "var(--photon-builder-text-soft)",
													}}
												>
													{field.kind}
												</div>
											</div>
											<div
												className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em]"
												style={{ color: "var(--photon-builder-text-ghost)" }}
											>
												{field.path}
											</div>
											{field.description ? (
												<div
													className="mt-0.5 text-[11px] leading-snug"
													style={{ color: "var(--photon-builder-text-soft)" }}
												>
													{field.description}
												</div>
											) : null}
										</div>
									))}
								</div>
							</PhotonInspectorSection>
						))}
					</>
				) : null}

				{activeTab === "surfaces" && selectedBlock && hasSurfaces ? (
					<>
						<div
							className="flex flex-wrap gap-1"
							role="tablist"
							aria-label="Surfaces"
							data-testid="photon-inspector-surfaces-tabstrip"
						>
							{triggerSlots.map((slot) => {
								const isActive = activeTriggerSlot?.id === slot.id;
								return (
									<button
										key={slot.id}
										type="button"
										role="tab"
										aria-selected={isActive}
										onClick={() => selectInspectorTrigger(slot.id)}
										className="inline-flex cursor-pointer items-center gap-1 rounded-sm px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.16em]"
										style={
											isActive
												? {
														background:
															"var(--photon-builder-accent-soft)",
														color: "var(--photon-builder-accent-text)",
													}
												: {
														background: "var(--photon-builder-panel-solid)",
														color: "var(--photon-builder-text-soft)",
													}
										}
										data-testid={`photon-inspector-surfaces-tab-${slot.id}`}
									>
										{slot.label}
									</button>
								);
							})}
						</div>
						{activeTriggerSlot ? (
							<InspectorTriggerTab
								block={selectedBlock}
								slot={activeTriggerSlot}
							/>
						) : (
							<div
								className="rounded-sm px-2 py-2 text-[11px] leading-snug"
								style={{
									background: "var(--photon-builder-panel-solid)",
									color: "var(--photon-builder-text-muted)",
								}}
							>
								Pick a surface above to inspect its trigger bindings.
							</div>
						)}
					</>
				) : null}

				{activeTab === "layout" && selectedBlock && hasLayoutFields ? (
					<div
						className="space-y-1"
						data-testid="photon-inspector-layout-panel"
					>
						{layoutFields.map((field) => (
							<FieldEditor
								key={field.path}
								field={field}
								blockId={selectedBlock.id}
								value={getFieldValue(selectedBlock.id, field.path)}
								onFocus={(path) =>
									selectField(selectedBlock.id, path ?? field.path)
								}
								onChange={(value) =>
									updateFieldValue(selectedBlock.id, field.path, value)
								}
							/>
						))}
					</div>
				) : null}

				{activeTab === "block" && selectedBlock ? (
					<>
						<PhotonInspectorSection
							id="selected-block"
							nonCollapsible
							title={
								<span
									className={clsx(tokens.subtitleClass)}
									style={{ color: "var(--photon-builder-text)" }}
								>
									{inspectorDefinition?.label ?? selectedBlock.type}
								</span>
							}
							trailing={
								inspectorDefinition ? (
									<span
										className="rounded-sm px-1.5 py-0 text-[10px] uppercase tracking-[0.14em]"
										style={{
											background: "var(--photon-builder-field)",
											color: "var(--photon-builder-text-soft)",
										}}
									>
										{translatePhotonPaletteCategory(
											inspectorDefinition.category,
											translate,
										)}
									</span>
								) : null
							}
						>
							<div className="flex flex-wrap items-center gap-1">
								<span
									className="font-mono text-[10px] uppercase tracking-[0.16em]"
									style={{ color: "var(--photon-builder-text-ghost)" }}
								>
									{selectedBlock.module}
								</span>
							</div>
							{inspectorDefinition?.description ? (
								<div
									className="mt-1 text-[11px] leading-snug"
									style={{ color: "var(--photon-builder-text-muted)" }}
								>
									{inspectorDefinition.description}
								</div>
							) : null}
							{selectedFieldPath ? (
								<div
									className="mt-1 rounded-sm px-2 py-1 text-[11px]"
									style={{
										background: "var(--photon-builder-accent-strong)",
										color: "var(--photon-builder-accent)",
									}}
								>
									Active field:{" "}
									<span className="font-mono">{selectedFieldPath}</span>
								</div>
							) : null}
						</PhotonInspectorSection>

						<BlockPreviewScenariosPicker block={selectedBlock} />

						<RouteFamilyEditor />

						{blockGroupKeys.map((groupKey) => {
							const groupFields = inspectorGroups[groupKey] ?? [];
							if (groupFields.length === 0) {
								return null;
							}
							const label = translate(
								FIELD_GROUP_LABELS[groupKey] ?? FIELD_GROUP_LABELS.misc,
								translatePhotonFieldGroup(groupKey, translate),
							);
							return (
								<PhotonInspectorSection
									key={groupKey}
									id={`block-group-${groupKey}`}
									variant="group"
									title={label}
									trailing={
										<span
											className="rounded-sm px-1 font-mono text-[9px] tabular-nums"
											style={{
												background: "var(--photon-builder-field)",
												color: "var(--photon-builder-text-soft)",
											}}
										>
											{groupFields.length}
										</span>
									}
								>
									<div
										className="space-y-0.5"
										data-testid={`photon-inspector-group-panel-${groupKey}`}
									>
										{groupFields.map((field) => (
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
								</PhotonInspectorSection>
							);
						})}

						<PhotonInspectorSection
							id="raw-block-manifest"
							title="Raw block manifest"
							defaultCollapsed
						>
							<pre
								className="h-[280px] overflow-x-auto rounded-sm p-2 text-[10.5px] leading-5"
								style={{
									background: "var(--photon-builder-field)",
									color: "var(--photon-builder-text-muted)",
								}}
							>
								{selectedBlockJson}
							</pre>
						</PhotonInspectorSection>
					</>
				) : null}

				{activeTab === "block" ? (
					<>
						<PhotonInspectorSection
							id="document-json"
							title="Document JSON"
							defaultCollapsed
						>
							<pre
								className="max-h-[280px] overflow-auto rounded-sm p-2 text-[10.5px] leading-5"
								style={{
									background: "var(--photon-builder-field)",
									color: "var(--photon-builder-text-muted)",
								}}
							>
								{documentJson}
							</pre>
						</PhotonInspectorSection>

						{!definitionFields.length && !hasBlockContext ? (
							<section
								className="rounded-sm px-2 py-1.5 text-[11px] leading-snug"
								style={{
									background: "var(--photon-builder-panel-solid)",
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
						<PhotonInspectorSection
							id="page-summary"
							nonCollapsible
							title={
								<span
									className={clsx(tokens.subtitleClass)}
									style={{ color: "var(--photon-builder-text)" }}
								>
									{summaryName}
								</span>
							}
						>
							<div className="flex flex-wrap items-center gap-1">
								<span
									className="rounded-sm px-1.5 py-0 text-[10px] uppercase tracking-[0.14em]"
									style={{
										background: "var(--photon-builder-field)",
										color: "var(--photon-builder-text-soft)",
									}}
								>
									{currentPage?.kind ?? "page"}
								</span>
								<span
									className="rounded-sm px-1.5 py-0 font-mono text-[10px] uppercase tracking-[0.14em]"
									style={{
										background: "var(--photon-builder-field)",
										color: "var(--photon-builder-text-soft)",
									}}
								>
									{currentPage?.route ?? document.route}
								</span>
								{currentPage?.isDynamic ? (
									<span className="rounded-sm bg-amber-300/10 px-1.5 py-0 text-[10px] uppercase tracking-[0.14em] text-amber-100/80">
										Dynamic template
									</span>
								) : null}
							</div>
							<div
								className="mt-1 rounded-sm px-2 py-1 text-[11px] leading-snug"
								style={{
									background: "var(--photon-builder-accent-strong)",
									color: "var(--photon-builder-accent)",
								}}
							>
								Open Page Settings from the top canvas toolbar to edit route
								basics and package-registered settings like SEO.
							</div>
						</PhotonInspectorSection>

						<PhotonInspectorSection
							id="page-basics"
							title={translate(
								"photon.studio.inspector.basicsSection",
								"Basics",
							)}
						>
							<div className="space-y-1">
								<div
									className="rounded-sm px-2 py-1.5"
									style={{ background: "var(--photon-builder-field)" }}
								>
									<div
										className="text-[10px] uppercase tracking-[0.16em]"
										style={{ color: "var(--photon-builder-text-soft)" }}
									>
										Name
									</div>
									<div
										className="mt-0.5 text-[12px] font-semibold leading-tight"
										style={{ color: "var(--photon-builder-text)" }}
									>
										{summaryName}
									</div>
								</div>
								<div
									className="rounded-sm px-2 py-1.5"
									style={{ background: "var(--photon-builder-field)" }}
								>
									<div
										className="text-[10px] uppercase tracking-[0.16em]"
										style={{ color: "var(--photon-builder-text-soft)" }}
									>
										{currentPage?.isDynamic ? "Route pattern" : "Path"}
									</div>
									<div
										className="mt-0.5 font-mono text-[11px]"
										style={{ color: "var(--photon-builder-text-muted)" }}
									>
										{summaryRoute}
									</div>
								</div>
								{currentPage?.isDynamic ? (
									<div
										className="rounded-sm px-2 py-1.5"
										style={{ background: "var(--photon-builder-field)" }}
									>
										<div
											className="text-[10px] uppercase tracking-[0.16em]"
											style={{ color: "var(--photon-builder-text-soft)" }}
										>
											Current route
										</div>
										<div
											className="mt-0.5 font-mono text-[11px]"
											style={{ color: "var(--photon-builder-text-muted)" }}
										>
											{currentRoute}
										</div>
									</div>
								) : null}
							</div>
						</PhotonInspectorSection>
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
