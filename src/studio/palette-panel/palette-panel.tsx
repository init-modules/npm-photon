"use client";

import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Search,
	SlidersHorizontal,
} from "lucide-react";
import { memo } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";
import { translatePhotonPaletteCategory } from "../../i18n/photon-labels";
import type {
	InsertTarget,
	PaletteDefinition,
	PaletteFamilyGroup,
} from "../types";
import { PaletteCard } from "./palette-card";

type PalettePanelProps = {
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
	manualInsertTarget: InsertTarget | null;
	onCollapse?: () => void;
};

const PalettePanelComponent = ({
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
	manualInsertTarget: _manualInsertTarget,
	onCollapse,
}: PalettePanelProps) => {
	const { translate } = usePhotonI18n();
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

	return (
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
			</div>

			<div className="flex-1 overflow-y-auto px-4 py-4">
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
			</div>
		</div>
	);
};

export const PalettePanel = memo(PalettePanelComponent);
