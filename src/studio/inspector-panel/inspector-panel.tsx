"use client";

import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { useWebsiteBuilderStore } from "../../context/website-builder-context";
import { findWebsiteBuilderBlock } from "../../helpers/tree";
import { useWebsiteBuilderI18n } from "../../i18n/website-builder-i18n-context";
import {
	translateWebsiteBuilderFieldGroup,
	translateWebsiteBuilderPaletteCategory,
} from "../../i18n/website-builder-labels";
import type {
	WebsiteBuilderField,
	WebsiteBuilderNestedField,
	WebsiteBuilderPageCatalogItem,
	WebsiteBuilderPageSettings,
} from "../../types";
import { FIELD_GROUP_LABELS } from "../shared";
import type { InspectorDefinitionMeta, InspectorGroups } from "../types";
import { FieldEditor } from "./field-editor";

type InspectorPanelProps = {
	definitionFields: WebsiteBuilderField[];
	inspectorGroups: InspectorGroups;
	selectedFieldPath: string | null;
	inspectorDefinition: InspectorDefinitionMeta | null;
	pageSettings: WebsiteBuilderPageSettings;
	currentPage: WebsiteBuilderPageCatalogItem | null;
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
	field: WebsiteBuilderField | WebsiteBuilderNestedField,
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
	const document = useWebsiteBuilderStore((state) => state.document);
	const { contentLocale, editableLocales, translate } = useWebsiteBuilderI18n();
	const selectedBlock = useWebsiteBuilderStore((state) =>
		state.selectedBlockId
			? findWebsiteBuilderBlock(state.document.blocks, state.selectedBlockId)
			: null,
	);
	const getFieldValue = useWebsiteBuilderStore((state) => state.getFieldValue);
	const updateFieldValue = useWebsiteBuilderStore(
		(state) => state.updateFieldValue,
	);
	const selectField = useWebsiteBuilderStore((state) => state.selectField);
	const [activeTab, setActiveTab] = useState<"block" | "page">("block");
	const [showBlockJson, setShowBlockJson] = useState(false);
	const [showDocumentJson, setShowDocumentJson] = useState(false);
	const hasBlockContext =
		selectedBlock !== null || inspectorDefinition !== null;
	const pageTabLabel = currentPage?.isDynamic
		? translate("websiteBuilder.studio.inspector.templateTab", "Template")
		: translate("websiteBuilder.studio.inspector.pageTab", "Page");
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
			className="flex h-full flex-col"
			style={{
				background: "var(--wb-builder-shell-muted)",
				color: "var(--wb-builder-text)",
			}}
		>
			<div
				className="border-b px-5 py-5"
				style={{
					borderColor: "var(--wb-builder-border)",
					background: "var(--wb-builder-shell-strong)",
				}}
			>
				<div className="flex items-center justify-between gap-3">
					<div className="min-w-0">
						<div
							className="text-[11px] uppercase tracking-[0.28em]"
							style={{ color: "var(--wb-builder-text-soft)" }}
						>
							{translate("websiteBuilder.studio.inspector.title", "Inspector")}
						</div>
						<div
							className="mt-4 inline-flex rounded-full border p-1"
							style={{
								borderColor: "var(--wb-builder-border)",
								background: "var(--wb-builder-panel-muted)",
							}}
						>
							<button
								type="button"
								onClick={() => setActiveTab("block")}
								className={clsx(
									"cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition",
								)}
								style={
									activeTab === "block"
										? {
												background: "var(--wb-builder-accent-soft)",
												color: "var(--wb-builder-accent-text)",
											}
										: { color: "var(--wb-builder-text-muted)" }
								}
							>
								{translate("websiteBuilder.studio.inspector.blockTab", "Block")}
							</button>
							<button
								type="button"
								onClick={() => setActiveTab("page")}
								className={clsx(
									"cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition",
								)}
								style={
									activeTab === "page"
										? {
												background: "var(--wb-builder-accent-soft)",
												color: "var(--wb-builder-accent-text)",
											}
										: { color: "var(--wb-builder-text-muted)" }
								}
							>
								{pageTabLabel}
							</button>
						</div>
					</div>
					{onCollapse ? (
						<button
							type="button"
							onClick={onCollapse}
							className="cursor-pointer rounded-full border p-2 transition"
							style={{
								borderColor: "var(--wb-builder-border)",
								background: "var(--wb-builder-panel-muted)",
								color: "var(--wb-builder-text-soft)",
							}}
						>
							<ChevronRight className="h-4 w-4" />
						</button>
					) : null}
				</div>
			</div>

			<div
				className="flex-1 space-y-5 overflow-y-auto px-4 py-4"
				style={{ background: "var(--wb-builder-shell-muted)" }}
			>
				{activeTab === "block" && !selectedBlock && inspectorDefinition ? (
					<>
						<section
							className="rounded-[24px] border px-4 py-4"
							style={{
								borderColor: "var(--wb-builder-border)",
								background: "var(--wb-builder-panel-muted)",
							}}
						>
							<div
								className="text-[11px] uppercase tracking-[0.28em]"
								style={{ color: "var(--wb-builder-text-soft)" }}
							>
								Palette block
							</div>
							<div
								className="mt-3 text-lg font-semibold"
								style={{ color: "var(--wb-builder-text)" }}
							>
								{inspectorDefinition.label}
							</div>
							<div className="mt-1 flex flex-wrap items-center gap-2">
								<div
									className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]"
									style={{
										borderColor: "var(--wb-builder-border)",
										background: "var(--wb-builder-field)",
										color: "var(--wb-builder-text-soft)",
									}}
								>
									{inspectorDefinition.module}
								</div>
								<div
									className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
									style={{
										borderColor: "var(--wb-builder-border)",
										background: "var(--wb-builder-field)",
										color: "var(--wb-builder-text-soft)",
									}}
								>
									{translateWebsiteBuilderPaletteCategory(
										inspectorDefinition.category,
										translate,
									)}
								</div>
								<div
									className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
									style={{
										borderColor: "var(--wb-builder-border-strong)",
										background: "var(--wb-builder-accent-strong)",
										color: "var(--wb-builder-accent)",
									}}
								>
									{inspectorDefinition.fieldCount} settings
								</div>
							</div>
							<div
								className="mt-4 text-sm leading-6"
								style={{ color: "var(--wb-builder-text-muted)" }}
							>
								{inspectorDefinition.description}
							</div>
						</section>

						{Object.entries(inspectorGroups).map(([groupKey, fields]) => (
							<section
								key={groupKey}
								className="rounded-[24px] border px-4 py-4"
								style={{
									borderColor: "var(--wb-builder-border)",
									background: "var(--wb-builder-panel-muted)",
								}}
							>
								<div className="mb-4 flex items-center justify-between gap-3">
									<div
										className="text-[11px] uppercase tracking-[0.28em]"
										style={{ color: "var(--wb-builder-text-soft)" }}
									>
										{translate(
											FIELD_GROUP_LABELS[groupKey] ?? FIELD_GROUP_LABELS.misc,
											translateWebsiteBuilderFieldGroup(groupKey, translate),
										)}
									</div>
									<div
										className="font-mono text-[10px] uppercase tracking-[0.24em]"
										style={{ color: "var(--wb-builder-text-ghost)" }}
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
												borderColor: "var(--wb-builder-border)",
												background: "var(--wb-builder-field)",
											}}
										>
											<div className="flex items-center justify-between gap-3">
												<div
													className="text-sm font-semibold"
													style={{ color: "var(--wb-builder-text)" }}
												>
													{field.label}
												</div>
												<div
													className="rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.22em]"
													style={{
														borderColor: "var(--wb-builder-border)",
														color: "var(--wb-builder-text-soft)",
													}}
												>
													{field.kind}
												</div>
											</div>
											<div
												className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em]"
												style={{ color: "var(--wb-builder-text-ghost)" }}
											>
												{field.path}
											</div>
											{field.description ? (
												<div
													className="mt-2 text-xs leading-5"
													style={{ color: "var(--wb-builder-text-soft)" }}
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

				{activeTab === "block" && selectedBlock ? (
					<>
						<section
							className="rounded-[24px] border px-4 py-4"
							style={{
								borderColor: "var(--wb-builder-border)",
								background: "var(--wb-builder-panel-muted)",
							}}
						>
							<div
								className="text-[11px] uppercase tracking-[0.28em]"
								style={{ color: "var(--wb-builder-text-soft)" }}
							>
								Selected block
							</div>
							<div
								className="mt-3 text-lg font-semibold"
								style={{ color: "var(--wb-builder-text)" }}
							>
								{inspectorDefinition?.label ?? selectedBlock.type}
							</div>
							<div className="mt-1 flex flex-wrap items-center gap-2">
								<div
									className="font-mono text-[11px] uppercase tracking-[0.24em]"
									style={{ color: "var(--wb-builder-text-ghost)" }}
								>
									{selectedBlock.module}
								</div>
								{inspectorDefinition ? (
									<div
										className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
										style={{
											borderColor: "var(--wb-builder-border)",
											background: "var(--wb-builder-field)",
											color: "var(--wb-builder-text-soft)",
										}}
									>
										{translateWebsiteBuilderPaletteCategory(
											inspectorDefinition.category,
											translate,
										)}
									</div>
								) : null}
							</div>
							{inspectorDefinition?.description ? (
								<div
									className="mt-4 text-sm leading-6"
									style={{ color: "var(--wb-builder-text-muted)" }}
								>
									{inspectorDefinition.description}
								</div>
							) : null}
							{selectedFieldPath ? (
								<div
									className="mt-4 rounded-2xl border px-3 py-3 text-sm"
									style={{
										borderColor: "var(--wb-builder-border-strong)",
										background: "var(--wb-builder-accent-strong)",
										color: "var(--wb-builder-accent)",
									}}
								>
									Active field:{" "}
									<span className="font-mono">{selectedFieldPath}</span>
								</div>
							) : null}
						</section>

						{Object.entries(inspectorGroups).map(([groupKey, fields]) => (
							<section
								key={groupKey}
								className="rounded-[24px] border px-4 py-4"
								style={{
									borderColor: "var(--wb-builder-border)",
									background: "var(--wb-builder-panel-muted)",
								}}
							>
								<div
									className="mb-4 text-[11px] uppercase tracking-[0.28em]"
									style={{ color: "var(--wb-builder-text-soft)" }}
								>
									{translate(
										FIELD_GROUP_LABELS[groupKey] ?? FIELD_GROUP_LABELS.misc,
										translateWebsiteBuilderFieldGroup(groupKey, translate),
									)}
								</div>
								{groupKey === "content" &&
								editableLocales.length > 1 &&
								fields.some((field) => fieldSupportsLocalization(field)) ? (
									<div
										className="mb-4 inline-flex flex-wrap rounded-full border p-1"
										style={{
											borderColor: "var(--wb-builder-border)",
											background: "var(--wb-builder-panel)",
										}}
									>
										{editableLocales.map((locale) => (
											<button
												key={locale.code}
												type="button"
												onClick={() => onContentLocaleChange?.(locale.code)}
												className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition"
												style={
													locale.code === contentLocale
														? {
																background: "var(--wb-builder-accent-soft)",
																color: "var(--wb-builder-accent-text)",
															}
														: { color: "var(--wb-builder-text-muted)" }
												}
											>
												{locale.code}
											</button>
										))}
									</div>
								) : null}
								<div className="space-y-4">
									{fields.map((field) => (
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
							</section>
						))}

						<section
							className="rounded-[24px] border px-4 py-4"
							style={{
								borderColor: "var(--wb-builder-border)",
								background: "var(--wb-builder-panel-muted)",
							}}
						>
							<button
								type="button"
								onClick={() => setShowBlockJson((current) => !current)}
								className="flex w-full cursor-pointer items-center justify-between gap-3 text-left"
							>
								<div
									className="text-[11px] uppercase tracking-[0.28em]"
									style={{ color: "var(--wb-builder-text-soft)" }}
								>
									Raw block manifest
								</div>
								{showBlockJson ? (
									<ChevronDown
										className="h-4 w-4"
										style={{ color: "var(--wb-builder-text-soft)" }}
									/>
								) : (
									<ChevronRight
										className="h-4 w-4"
										style={{ color: "var(--wb-builder-text-soft)" }}
									/>
								)}
							</button>
							{showBlockJson ? (
								<pre
									className="mt-4 h-[320px] overflow-x-auto rounded-2xl border p-4 text-xs leading-6"
									style={{
										borderColor: "var(--wb-builder-border)",
										background: "var(--wb-builder-field)",
										color: "var(--wb-builder-text-muted)",
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
							className="rounded-[24px] border px-4 py-4"
							style={{
								borderColor: "var(--wb-builder-border)",
								background: "var(--wb-builder-panel-muted)",
							}}
						>
							<button
								type="button"
								onClick={() => setShowDocumentJson((current) => !current)}
								className="flex w-full cursor-pointer items-center justify-between gap-3 text-left"
							>
								<div
									className="text-[11px] uppercase tracking-[0.28em]"
									style={{ color: "var(--wb-builder-text-soft)" }}
								>
									Document JSON
								</div>
								{showDocumentJson ? (
									<ChevronDown
										className="h-4 w-4"
										style={{ color: "var(--wb-builder-text-soft)" }}
									/>
								) : (
									<ChevronRight
										className="h-4 w-4"
										style={{ color: "var(--wb-builder-text-soft)" }}
									/>
								)}
							</button>
							{showDocumentJson ? (
								<pre
									className="mt-4 max-h-[320px] overflow-auto rounded-2xl border p-4 text-xs leading-6"
									style={{
										borderColor: "var(--wb-builder-border)",
										background: "var(--wb-builder-field)",
										color: "var(--wb-builder-text-muted)",
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
									borderColor: "var(--wb-builder-border)",
									color: "var(--wb-builder-text-muted)",
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
								borderColor: "var(--wb-builder-border)",
								color: "var(--wb-builder-text-muted)",
							}}
						>
							<div
								className="text-[11px] uppercase tracking-[0.28em]"
								style={{ color: "var(--wb-builder-text-soft)" }}
							>
								{pageTabLabel} settings
							</div>
							<div
								className="mt-3 text-lg font-semibold"
								style={{ color: "var(--wb-builder-text)" }}
							>
								{summaryName}
							</div>
							<div className="mt-2 flex flex-wrap items-center gap-2">
								<div
									className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
									style={{
										borderColor: "var(--wb-builder-border)",
										background: "var(--wb-builder-field)",
										color: "var(--wb-builder-text-soft)",
									}}
								>
									{currentPage?.kind ?? "page"}
								</div>
								<div
									className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]"
									style={{
										borderColor: "var(--wb-builder-border)",
										background: "var(--wb-builder-field)",
										color: "var(--wb-builder-text-soft)",
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
									borderColor: "var(--wb-builder-border-strong)",
									background: "var(--wb-builder-accent-strong)",
									color: "var(--wb-builder-accent)",
								}}
							>
								Open Page Settings from the top canvas toolbar to edit route
								basics and package-registered settings like SEO.
							</div>
						</section>

						<section
							className="rounded-[24px] border px-4 py-4"
							style={{
								borderColor: "var(--wb-builder-border)",
								background: "var(--wb-builder-panel-muted)",
							}}
						>
							<div
								className="mb-4 text-[11px] uppercase tracking-[0.28em]"
								style={{ color: "var(--wb-builder-text-soft)" }}
							>
								Basics
							</div>
							<div className="space-y-3">
								<div
									className="rounded-2xl border px-4 py-3"
									style={{
										borderColor: "var(--wb-builder-border)",
										background: "var(--wb-builder-field)",
									}}
								>
									<div
										className="text-[11px] uppercase tracking-[0.24em]"
										style={{ color: "var(--wb-builder-text-soft)" }}
									>
										Name
									</div>
									<div
										className="mt-2 text-sm font-semibold"
										style={{ color: "var(--wb-builder-text)" }}
									>
										{summaryName}
									</div>
								</div>
								<div
									className="rounded-2xl border px-4 py-3"
									style={{
										borderColor: "var(--wb-builder-border)",
										background: "var(--wb-builder-field)",
									}}
								>
									<div
										className="text-[11px] uppercase tracking-[0.24em]"
										style={{ color: "var(--wb-builder-text-soft)" }}
									>
										{currentPage?.isDynamic ? "Route pattern" : "Path"}
									</div>
									<div
										className="mt-2 font-mono text-sm"
										style={{ color: "var(--wb-builder-text-muted)" }}
									>
										{summaryRoute}
									</div>
								</div>
								{currentPage?.isDynamic ? (
									<div
										className="rounded-2xl border px-4 py-3"
										style={{
											borderColor: "var(--wb-builder-border)",
											background: "var(--wb-builder-field)",
										}}
									>
										<div
											className="text-[11px] uppercase tracking-[0.24em]"
											style={{ color: "var(--wb-builder-text-soft)" }}
										>
											Current route
										</div>
										<div
											className="mt-2 font-mono text-sm"
											style={{ color: "var(--wb-builder-text-muted)" }}
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

export const InspectorPanel = memo(InspectorPanelComponent);
