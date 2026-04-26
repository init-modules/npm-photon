"use client";

import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Copy,
	Library,
	Search,
	SlidersHorizontal,
	Trash2,
} from "lucide-react";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../components/ui/dialog";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";
import { usePhotonStore } from "../../context/photon-context";
import { getPhotonSelectedBlock } from "../../context/photon-store";
import {
	collectPhotonComponentLibraryUsages,
	getPhotonComponentLibraryItems,
	isPhotonComponentReferenceBlock,
} from "../../helpers/component-library";
import { translatePhotonPaletteCategory } from "../../i18n/photon-labels";
import type {
	InsertTarget,
	PaletteDefinition,
	PaletteFamilyGroup,
} from "../types";
import type {
	PhotonComponentLibraryUsage,
	PhotonComponentLibraryUsageProvider,
} from "../../types";
import { PaletteCard } from "./palette-card";

type PalettePanelProps = {
	paletteTab: "blocks" | "library";
	onPaletteTabChange: (value: "blocks" | "library") => void;
	selectedLibraryItemId: string | null;
	onLibraryItemSelect: (value: string | null) => void;
	search: string;
	onSearchChange: (value: string) => void;
	allPaletteBlocks: PaletteDefinition[];
	paletteGroups: PaletteFamilyGroup[];
	paletteFamily: string;
	onPaletteFamilyChange: (family: string) => void;
	palettePackage: string;
	onPalettePackageChange: (pkg: string) => void;
	collapsedFamilies: string[];
	onToggleFamily: (family: string) => void;
	collapsedGroups: string[];
	onToggleGroup: (group: string) => void;
	selectedDefinitionKey: string | null;
	onSelectDefinition: (definition: PaletteDefinition) => void;
	onInsert: (definition: PaletteDefinition) => void;
	componentLibraryUsageProvider?: PhotonComponentLibraryUsageProvider;
	manualInsertTarget: InsertTarget | null;
	onCollapse?: () => void;
};

const normalizeLibraryUsageSource = (
	source: PhotonComponentLibraryUsage["source"],
): NonNullable<PhotonComponentLibraryUsage["source"]> => {
	if (source === "current") {
		return "currentDocument";
	}

	if (source === "workspace") {
		return "workspacePage";
	}

	return source ?? "workspacePage";
};

const isWorkspaceLibraryUsage = (usage: PhotonComponentLibraryUsage) =>
	normalizeLibraryUsageSource(usage.source) === "workspacePage";

const PalettePanelComponent = ({
	paletteTab,
	onPaletteTabChange,
	selectedLibraryItemId,
	onLibraryItemSelect,
	search,
	onSearchChange,
	allPaletteBlocks,
	paletteGroups,
	paletteFamily,
	onPaletteFamilyChange,
	palettePackage,
	onPalettePackageChange,
	collapsedFamilies,
	onToggleFamily,
	collapsedGroups,
	onToggleGroup,
	selectedDefinitionKey,
	onSelectDefinition,
	onInsert,
	componentLibraryUsageProvider,
	manualInsertTarget,
	onCollapse,
}: PalettePanelProps) => {
	const { translate } = usePhotonI18n();
	const site = usePhotonStore((state) => state.site);
	const document = usePhotonStore((state) => state.document);
	const pageSettings = usePhotonStore((state) => state.pageSettings);
	const workspace = usePhotonStore((state) => state.workspace);
	const selectedBlock = usePhotonStore((state) =>
		getPhotonSelectedBlock(state),
	);
	const createLibraryItemFromBlock = usePhotonStore(
		(state) => state.createComponentLibraryItemFromBlock,
	);
	const insertComponentReference = usePhotonStore(
		(state) => state.insertComponentLibraryReference,
	);
	const insertComponentCopy = usePhotonStore(
		(state) => state.insertComponentLibraryCopy,
	);
	const detachComponentReference = usePhotonStore(
		(state) => state.detachComponentReference,
	);
	const selectComponentLibrarySource = usePhotonStore(
		(state) => state.selectComponentLibrarySource,
	);
	const duplicateComponentLibraryItem = usePhotonStore(
		(state) => state.duplicateComponentLibraryItem,
	);
	const deleteComponentLibraryItem = usePhotonStore(
		(state) => state.deleteComponentLibraryItem,
	);
	const updateComponentLibraryItem = usePhotonStore(
		(state) => state.updateComponentLibraryItem,
	);
	const libraryItems = useMemo(
		() =>
			Object.values(getPhotonComponentLibraryItems(site.settings)).filter(
				(item) => item.enabled !== false,
			),
		[site.settings],
	);
	const currentLibraryUsages = useMemo(
		() =>
			collectPhotonComponentLibraryUsages(document, "currentDocument").map((usage) => ({
				...usage,
				source: normalizeLibraryUsageSource(usage.source),
			})),
		[document],
	);
	const [workspaceLibraryUsages, setWorkspaceLibraryUsages] = useState<
		PhotonComponentLibraryUsage[]
	>([]);
	const [pendingDeleteItemId, setPendingDeleteItemId] = useState<string | null>(
		null,
	);
	// Workspace-wide usage scan is the most expensive thing the studio does
	// (one resolvePage per page in the workspace). It only depends on the
	// set of library item ids; the contextual `site`/`document`/`pageSettings`/
	// `workspace` payload is passed for provider use but must not retrigger
	// the effect — otherwise every inspector keystroke (which bumps `document`)
	// fans out a resolvePage flood across the entire workspace.
	// Also: skip entirely when the user is not viewing the library tab.
	const libraryItemIdsKey = useMemo(
		() =>
			libraryItems
				.map((item) => item.id)
				.sort()
				.join("|"),
		[libraryItems],
	);
	const usageProviderInputRef = useRef({
		site,
		document,
		pageSettings,
		workspace,
		libraryItems,
	});
	useEffect(() => {
		usageProviderInputRef.current = {
			site,
			document,
			pageSettings,
			workspace,
			libraryItems,
		};
	}, [site, document, pageSettings, workspace, libraryItems]);
	useEffect(() => {
		if (!componentLibraryUsageProvider || paletteTab !== "library") {
			setWorkspaceLibraryUsages([]);
			return;
		}

		let cancelled = false;
		const snapshot = usageProviderInputRef.current;

		Promise.resolve(
			componentLibraryUsageProvider({
				site: snapshot.site,
				document: snapshot.document,
				pageSettings: snapshot.pageSettings,
				workspace: snapshot.workspace,
				itemIds: snapshot.libraryItems.map((item) => item.id),
			}),
		).then((usages) => {
			if (!cancelled) {
				setWorkspaceLibraryUsages(
					usages.map((usage) => ({
						...usage,
						source: normalizeLibraryUsageSource(usage.source),
					})),
				);
			}
		});

		return () => {
			cancelled = true;
		};
	}, [componentLibraryUsageProvider, libraryItemIdsKey, paletteTab]);
	const libraryUsages = [...currentLibraryUsages, ...workspaceLibraryUsages];
	const selectedReferenceBlock =
		selectedBlock && isPhotonComponentReferenceBlock(selectedBlock)
			? selectedBlock
			: null;
	const normalizedSearch = search.trim().toLowerCase();
	const matchesSearch = (definition: PaletteDefinition) =>
		!normalizedSearch ||
		[
			definition.label,
			definition.description,
			definition.category,
			definition.module,
			definition.family,
			definition.group,
			definition.package,
		]
			.join(" ")
			.toLowerCase()
			.includes(normalizedSearch);

	const familyOptions = Array.from(
		new Set(allPaletteBlocks.map((definition) => definition.family)),
	)
		.map((family) => ({
			value: family,
			enabled: allPaletteBlocks.some(
				(definition) =>
					definition.family === family &&
					(palettePackage === "all" || definition.package === palettePackage) &&
					matchesSearch(definition),
			),
		}))
		.sort((left, right) => {
			if (left.enabled !== right.enabled) {
				return left.enabled ? -1 : 1;
			}
			return left.value.localeCompare(right.value);
		});

	const packageOptions = Array.from(
		new Set(allPaletteBlocks.map((definition) => definition.package)),
	)
		.map((pkg) => ({
			value: pkg,
			enabled: allPaletteBlocks.some(
				(definition) =>
					definition.package === pkg &&
					(paletteFamily === "all" || definition.family === paletteFamily) &&
					matchesSearch(definition),
			),
		}))
		.sort((left, right) => {
			if (left.enabled !== right.enabled) {
				return left.enabled ? -1 : 1;
			}
			return left.value.localeCompare(right.value);
		});

	const libraryMatchesSearch = (label: string) =>
		!normalizedSearch || label.toLowerCase().includes(normalizedSearch);
	const visibleLibraryItems = libraryItems.filter((item) =>
		libraryMatchesSearch(`${item.label} ${item.description ?? ""} ${item.id}`),
	);
	const insertTarget = manualInsertTarget ?? undefined;
	const pendingDeleteItem = pendingDeleteItemId
		? libraryItems.find((item) => item.id === pendingDeleteItemId) ?? null
		: null;
	const pendingDeleteUsages = pendingDeleteItem
		? libraryUsages.filter((usage) => usage.itemId === pendingDeleteItem.id)
		: [];
	const pendingDeleteCurrentUsageCount = pendingDeleteUsages.filter(
		(usage) => !isWorkspaceLibraryUsage(usage),
	).length;
	const pendingDeleteWorkspaceUsageCount = pendingDeleteUsages.filter(
		(usage) => isWorkspaceLibraryUsage(usage),
	).length;

	return (
		<>
		<div className="flex h-full flex-col">
			<div
				className="border-b px-5 py-5"
				style={{ borderColor: "var(--photon-builder-border)" }}
			>
				<div className="flex items-center justify-between gap-3">
					<div
						className="text-[11px] uppercase tracking-[0.28em]"
						style={{ color: "var(--photon-builder-text-soft)" }}
					>
						{translate("photon.palette.title", "Palette")}
					</div>
					{onCollapse ? (
						<button
							type="button"
							onClick={onCollapse}
							className="cursor-pointer rounded-full border p-2 transition"
							style={{
								borderColor: "var(--photon-builder-border)",
								background: "var(--photon-builder-panel-muted)",
								color: "var(--photon-builder-text-soft)",
							}}
						>
							<ChevronLeft className="h-4 w-4" />
						</button>
					) : null}
				</div>
				<div className="relative mt-4">
					<Search
						className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
						style={{ color: "var(--photon-builder-text-soft)" }}
					/>
					<input
						value={search}
						onChange={(event) => onSearchChange(event.currentTarget.value)}
						placeholder={translate(
							"photon.palette.searchPlaceholder",
							"Find blocks, categories, modules",
						)}
						className="w-full rounded-[22px] border py-3 pl-10 pr-4 text-sm outline-none transition"
						style={{
							borderColor: "var(--photon-builder-border)",
							background: "var(--photon-builder-field)",
							color: "var(--photon-builder-text)",
						}}
					/>
					<div className="absolute right-2 top-1/2 -translate-y-1/2">
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<button
									type="button"
									aria-label="Open palette filters"
									className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition"
									style={{
										borderColor: "var(--photon-builder-border)",
										background:
											paletteFamily !== "all" || palettePackage !== "all"
												? "var(--photon-builder-card-selected)"
												: "var(--photon-builder-panel-muted)",
										color: "var(--photon-builder-text-soft)",
									}}
								>
									<SlidersHorizontal className="h-4 w-4" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-[20rem] space-y-4 p-3"
							>
								<div className="space-y-2">
									<div
										className="text-[11px] font-semibold uppercase tracking-[0.24em]"
										style={{ color: "var(--photon-builder-text-soft)" }}
									>
										Family
									</div>
									<div className="flex flex-wrap gap-2">
										<button
											type="button"
											onClick={() => onPaletteFamilyChange("all")}
											className="cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] transition"
											style={{
												borderColor:
													paletteFamily === "all"
														? "var(--photon-builder-border-strong)"
														: "var(--photon-builder-border)",
												background:
													paletteFamily === "all"
														? "var(--photon-builder-card-selected)"
														: "var(--photon-builder-field)",
												color: "var(--photon-builder-text)",
											}}
										>
											All
										</button>
										{familyOptions.map((family) => (
											<button
												key={family.value}
												type="button"
												onClick={() =>
													family.enabled
														? onPaletteFamilyChange(family.value)
														: undefined
												}
												disabled={!family.enabled}
												className="cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] transition"
												style={{
													borderColor:
														paletteFamily === family.value
															? "var(--photon-builder-border-strong)"
															: "var(--photon-builder-border)",
													background:
														paletteFamily === family.value
															? "var(--photon-builder-card-selected)"
															: "var(--photon-builder-field)",
													color: family.enabled
														? "var(--photon-builder-text)"
														: "var(--photon-builder-text-ghost)",
													opacity: family.enabled ? 1 : 0.55,
												}}
											>
												{family.value}
											</button>
										))}
									</div>
								</div>
								<div className="space-y-2">
									<div
										className="text-[11px] font-semibold uppercase tracking-[0.24em]"
										style={{ color: "var(--photon-builder-text-soft)" }}
									>
										Package
									</div>
									<div className="flex flex-wrap gap-2">
										<button
											type="button"
											onClick={() => onPalettePackageChange("all")}
											className="cursor-pointer rounded-full border px-3 py-1.5 text-xs transition"
											style={{
												borderColor:
													palettePackage === "all"
														? "var(--photon-builder-border-strong)"
														: "var(--photon-builder-border)",
												background:
													palettePackage === "all"
														? "var(--photon-builder-card-selected)"
														: "var(--photon-builder-field)",
												color: "var(--photon-builder-text-soft)",
											}}
										>
											All
										</button>
										{packageOptions.map((pkg) => (
											<button
												key={pkg.value}
												type="button"
												onClick={() =>
													pkg.enabled
														? onPalettePackageChange(pkg.value)
														: undefined
												}
												disabled={!pkg.enabled}
												className="cursor-pointer rounded-full border px-3 py-1.5 text-xs transition"
												style={{
													borderColor:
														palettePackage === pkg.value
															? "var(--photon-builder-border-strong)"
															: "var(--photon-builder-border)",
													background:
														palettePackage === pkg.value
															? "var(--photon-builder-card-selected)"
															: "var(--photon-builder-field)",
													color: pkg.enabled
														? "var(--photon-builder-text-soft)"
														: "var(--photon-builder-text-ghost)",
													opacity: pkg.enabled ? 1 : 0.55,
												}}
											>
												{pkg.value}
											</button>
										))}
									</div>
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div
					className="mt-4 inline-flex rounded-[14px] border p-1"
					style={{
						borderColor: "var(--photon-builder-border)",
						background: "var(--photon-builder-panel-muted)",
					}}
				>
					{[
						{ key: "blocks" as const, label: "Blocks" },
						{ key: "library" as const, label: "Library" },
					].map((tab) => (
						<button
							key={tab.key}
							type="button"
							onClick={() => onPaletteTabChange(tab.key)}
							className="cursor-pointer rounded-[10px] px-3 py-1.5 text-xs font-semibold transition"
							style={
								paletteTab === tab.key
									? {
											background: "var(--photon-builder-accent-soft)",
											color: "var(--photon-builder-accent-text)",
										}
									: { color: "var(--photon-builder-text-muted)" }
							}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>

			<div className="flex-1 overflow-y-auto px-4 py-4">
				{paletteTab === "library" ? (
					<div className="space-y-4">
						<section
							className="rounded-[22px] border p-4"
							style={{
								borderColor: "var(--photon-builder-border)",
								background: "var(--photon-builder-panel-muted)",
							}}
						>
							<div
								className="text-[11px] uppercase tracking-[0.28em]"
								style={{ color: "var(--photon-builder-text-soft)" }}
							>
								Reusable components
							</div>
							<button
								type="button"
								disabled={!selectedBlock}
								onClick={() =>
									selectedBlock
										? createLibraryItemFromBlock(selectedBlock.id)
										: undefined
								}
								className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold disabled:pointer-events-none disabled:opacity-45"
								style={{
									borderColor: "var(--photon-builder-border-strong)",
									background: "var(--photon-builder-accent-soft)",
									color: "var(--photon-builder-accent-text)",
								}}
							>
								<Library className="h-3.5 w-3.5" />
								Create from selection
							</button>
						</section>

						{visibleLibraryItems.map((item) => {
							const selected = selectedLibraryItemId === item.id;
							const itemUsages = libraryUsages.filter(
								(usage) => usage.itemId === item.id,
							);
							const currentUsageCount = itemUsages.filter(
								(usage) => !isWorkspaceLibraryUsage(usage),
							).length;
							const workspaceUsageCount = itemUsages.filter(
								(usage) => isWorkspaceLibraryUsage(usage),
							).length;
							const usageCount = itemUsages.length;

							return (
								<section
									key={item.id}
									className="rounded-[22px] border p-4"
									style={{
										borderColor: selected
											? "var(--photon-builder-border-strong)"
											: "var(--photon-builder-border)",
										background: selected
											? "var(--photon-builder-card-selected)"
											: "var(--photon-builder-field)",
									}}
								>
									<button
										type="button"
										onClick={() => onLibraryItemSelect(item.id)}
										className="w-full cursor-pointer text-left"
									>
										<div
											className="text-sm font-semibold"
											style={{ color: "var(--photon-builder-text)" }}
										>
											{item.label}
										</div>
										<div
											className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em]"
											style={{ color: "var(--photon-builder-text-ghost)" }}
										>
											{item.blocks.length} block
											{item.blocks.length === 1 ? "" : "s"} · {usageCount} usage
											{usageCount === 1 ? "" : "s"}
										</div>
									</button>
									{selected ? (
										<div className="mt-4 space-y-3">
											<label className="grid gap-2 text-xs font-semibold">
												Label
												<input
													value={item.label}
													onChange={(event) =>
														updateComponentLibraryItem(item.id, (current) => ({
															...current,
															label: event.currentTarget.value,
														}))
													}
													className="h-10 rounded-[14px] border px-3 text-sm outline-none"
													style={{
														borderColor: "var(--photon-builder-border)",
														background: "var(--photon-builder-panel-solid)",
														color: "var(--photon-builder-text)",
													}}
												/>
											</label>
											<div className="flex flex-wrap gap-2">
												<button
													type="button"
													onClick={() => selectComponentLibrarySource(item.id)}
													className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold"
													style={{
														borderColor: "var(--photon-builder-border)",
														background: "var(--photon-builder-panel-solid)",
														color: "var(--photon-builder-text)",
													}}
												>
													<SlidersHorizontal className="h-3.5 w-3.5" />
													Edit source
												</button>
												<button
													type="button"
													onClick={() =>
														insertComponentReference(
															item.id,
															insertTarget?.listId,
															insertTarget?.index,
														)
													}
													className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold"
													style={{
														borderColor: "var(--photon-builder-border)",
														background: "var(--photon-builder-panel-solid)",
														color: "var(--photon-builder-text)",
													}}
												>
													<Library className="h-3.5 w-3.5" />
													Reference
												</button>
												<button
													type="button"
													onClick={() =>
														insertComponentCopy(
															item.id,
															insertTarget?.listId,
															insertTarget?.index,
														)
													}
													className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold"
													style={{
														borderColor: "var(--photon-builder-border)",
														background: "var(--photon-builder-panel-solid)",
														color: "var(--photon-builder-text)",
													}}
												>
													<Copy className="h-3.5 w-3.5" />
													Copy
												</button>
												<button
													type="button"
													onClick={() => duplicateComponentLibraryItem(item.id)}
													className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold"
													style={{
														borderColor: "var(--photon-builder-border)",
														background: "var(--photon-builder-panel-solid)",
														color: "var(--photon-builder-text)",
													}}
												>
													<Copy className="h-3.5 w-3.5" />
													Duplicate source
												</button>
												<button
													type="button"
													onClick={() => {
														if (usageCount === 0) {
															deleteComponentLibraryItem(item.id);
															return;
														}

														setPendingDeleteItemId(item.id);
													}}
													className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold"
													style={{
														borderColor: "var(--photon-builder-border)",
														background: "var(--photon-builder-panel-solid)",
														color: "var(--photon-builder-text)",
													}}
												>
													<Trash2 className="h-3.5 w-3.5" />
													Delete source
												</button>
												{selectedReferenceBlock?.props.itemId === item.id ? (
													<button
														type="button"
														onClick={() =>
															detachComponentReference(selectedReferenceBlock.id)
														}
														className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold"
														style={{
															borderColor: "var(--photon-builder-border)",
															background: "var(--photon-builder-accent-soft)",
															color: "var(--photon-builder-accent-text)",
														}}
													>
														<Copy className="h-3.5 w-3.5" />
														Detach selected
													</button>
												) : null}
											</div>
											<div
												className="rounded-2xl border px-3 py-2 text-xs leading-5"
												style={{
													borderColor: "var(--photon-builder-border)",
													color: "var(--photon-builder-text-muted)",
												}}
											>
												{usageCount
													? `${currentUsageCount} current placement${currentUsageCount === 1 ? "" : "s"} · ${workspaceUsageCount} workspace placement${workspaceUsageCount === 1 ? "" : "s"}.`
													: "No placements in the current surface or workspace index."}
											</div>
										</div>
									) : null}
								</section>
							);
						})}
						{visibleLibraryItems.length === 0 ? (
							<section
								className="rounded-[22px] border border-dashed p-4 text-sm leading-6"
								style={{
									borderColor: "var(--photon-builder-border)",
									color: "var(--photon-builder-text-muted)",
								}}
							>
								No reusable components yet.
							</section>
						) : null}
					</div>
				) : (
				<div className="space-y-4">
					{paletteGroups.map((familyGroup) => (
						<section key={familyGroup.family} className="space-y-3">
							<button
								type="button"
								onClick={() => onToggleFamily(familyGroup.family)}
								className="sticky top-0 z-10 flex w-full cursor-pointer items-center justify-between gap-3 rounded-[20px] border px-3 py-2.5 text-left shadow-[0_14px_34px_-26px_rgba(15,23,42,0.45)] backdrop-blur-xl transition"
								style={{
									color: "var(--photon-builder-text)",
									borderColor: "var(--photon-builder-border)",
									background: "var(--photon-builder-panel-muted)",
								}}
							>
								<div className="flex items-center gap-3">
									<div
										className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em]"
										style={{
											color: "var(--photon-builder-text-soft)",
											borderColor: "var(--photon-builder-border)",
											background: "var(--photon-builder-card)",
										}}
									>
										{familyGroup.family}
									</div>
									<span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--photon-builder-text-ghost)]">
										{familyGroup.groups.reduce(
											(total, group) => total + group.definitions.length,
											0,
										)}
									</span>
								</div>
								<div style={{ color: "var(--photon-builder-text-ghost)" }}>
									{collapsedFamilies.includes(familyGroup.family) ? (
										<ChevronRight className="h-4 w-4" />
									) : (
										<ChevronDown className="h-4 w-4" />
									)}
								</div>
							</button>
							{collapsedFamilies.includes(familyGroup.family)
								? null
								: familyGroup.groups.map(({ group, definitions }) => {
										const key = `${familyGroup.family}:${group}`;
										const collapsed = collapsedGroups.includes(key);

										return (
											<section key={key} className="space-y-2">
												<button
													type="button"
													onClick={() => onToggleGroup(key)}
													className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-[18px] px-2 py-1.5 text-left transition"
													style={{ color: "var(--photon-builder-text)" }}
												>
													<div className="flex items-center gap-3">
														<div
															className="text-[11px] uppercase tracking-[0.28em]"
															style={{ color: "var(--photon-builder-text-soft)" }}
														>
															{translatePhotonPaletteCategory(
																group,
																translate,
															)}
														</div>
														<span className="font-mono text-[10px] uppercase tracking-[0.24em]">
															{definitions.length}
														</span>
													</div>
													<div
														style={{ color: "var(--photon-builder-text-ghost)" }}
													>
														{collapsed ? (
															<ChevronRight className="h-4 w-4" />
														) : (
															<ChevronDown className="h-4 w-4" />
														)}
													</div>
												</button>
												{collapsed ? null : (
													<div className="space-y-2">
														{definitions.map((definition) => (
															<PaletteCard
																key={definition.key}
																definition={definition}
																isSelected={
																	selectedDefinitionKey === definition.key
																}
																onSelect={onSelectDefinition}
																onInsert={onInsert}
															/>
														))}
													</div>
												)}
											</section>
										);
									})}
						</section>
					))}
				</div>
				)}
			</div>
		</div>
		<Dialog
			open={Boolean(pendingDeleteItem)}
			onOpenChange={(open) => {
				if (!open) {
					setPendingDeleteItemId(null);
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete reusable component?</DialogTitle>
					<DialogDescription>
						{pendingDeleteItem
							? pendingDeleteWorkspaceUsageCount > 0
								? `"${pendingDeleteItem.label}" is used outside the current canvas. Delete is blocked until workspace usages are removed.`
								: pendingDeleteCurrentUsageCount > 0
									? `"${pendingDeleteItem.label}" has ${pendingDeleteCurrentUsageCount} current placement${pendingDeleteCurrentUsageCount === 1 ? "" : "s"}. Detach them to copies before deleting the source.`
									: `"${pendingDeleteItem.label}" has no placements and can be deleted.`
							: ""}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<button
						type="button"
						onClick={() => setPendingDeleteItemId(null)}
						className="inline-flex h-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] text-[color:var(--photon-builder-text-muted)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)] hover:text-[color:var(--photon-builder-text)]"
					>
						Cancel
					</button>
					<button
						type="button"
						disabled={!pendingDeleteItem || pendingDeleteWorkspaceUsageCount > 0}
						onClick={() => {
							if (!pendingDeleteItem) {
								return;
							}

							const deleted = deleteComponentLibraryItem(
								pendingDeleteItem.id,
								{
									detachUsages: pendingDeleteCurrentUsageCount > 0,
								},
							);

							if (deleted) {
								setPendingDeleteItemId(null);
								onLibraryItemSelect(null);
							}
						}}
						className="inline-flex h-11 items-center justify-center rounded-full border border-rose-400/18 bg-rose-400/10 px-4 text-sm font-semibold text-rose-100 transition hover:border-rose-300/28 hover:bg-rose-400/16 hover:text-white disabled:pointer-events-none disabled:opacity-45"
					>
						{pendingDeleteCurrentUsageCount > 0
							? "Detach usages and delete"
							: "Delete source"}
					</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
		</>
	);
};

export const PalettePanel = memo(PalettePanelComponent);
