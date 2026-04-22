"use client";

import clsx from "clsx";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { PhotonFieldEditorList } from "../../components/photon-field-editor-list";
import type {
	PhotonField,
	PhotonPageCatalogItem,
	PhotonPageSettings,
	PhotonPageSettingsScope,
	PhotonSite,
} from "../../types";
import type {
	PageSettingsPanelDefinition,
	SiteSettingsPanelDefinition,
	SiteSettingsSubtabDefinition,
} from "../types";

type PageSettingsSurfaceProps = {
	currentPage: PhotonPageCatalogItem | null;
	pageSettings: PhotonPageSettings;
	pageSettingsPanels: PageSettingsPanelDefinition[];
	site: PhotonSite;
	siteSettingsPanels: SiteSettingsPanelDefinition[];
	siteSettingsSubtabs: SiteSettingsSubtabDefinition[];
	getPageSettingValue: (path: string) => unknown;
	onPageSettingChange: (path: string, value: unknown) => void;
	onPageSettingFocus: (path: string) => void;
	getSiteSettingValue: (path: string) => unknown;
	onSiteSettingChange: (path: string, value: unknown) => void;
	onSiteSettingFocus: (path: string) => void;
};

const scopeOrder: PhotonPageSettingsScope[] = [
	"page",
	"template",
	"record",
];

const staticPageFields: PhotonField[] = [
	{
		path: "name",
		label: "Name",
		kind: "text",
		description: "Visible in the page browser and the settings surface.",
	},
	{
		path: "path",
		label: "Path",
		kind: "text",
		description: "Public route for this page, for example /about or /pricing.",
	},
];

const scopeMeta: Record<
	PhotonPageSettingsScope,
	{
		label: string;
		eyebrow: string;
		description: string;
	}
> = {
	page: {
		label: "Page",
		eyebrow: "Page settings",
		description:
			"Control the public route and package-registered settings for this standalone page.",
	},
	template: {
		label: "Template",
		eyebrow: "Template settings",
		description:
			"Shared settings applied by the dynamic page template before any current-record overrides.",
	},
	record: {
		label: "Record",
		eyebrow: "Record settings",
		description:
			"Current-route settings stored only for the active record behind this dynamic page.",
	},
};

const getScopeSettings = (
	pageSettings: PhotonPageSettings,
	scope: PhotonPageSettingsScope,
) => {
	const value = pageSettings[scope];

	return typeof value === "object" && value !== null
		? (value as Record<string, unknown>)
		: {};
};

const readString = (
	settings: Record<string, unknown>,
	key: string,
): string | undefined => {
	const value = settings[key];

	return typeof value === "string" && value.trim() !== "" ? value : undefined;
};

const resolveAvailableScopes = (
	pageSettings: PhotonPageSettings,
): PhotonPageSettingsScope[] =>
	scopeOrder.filter((scope) => {
		const value = pageSettings[scope];

		return typeof value === "object" && value !== null;
	});

const surfaceCardStyle: CSSProperties = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-panel-muted)",
	color: "var(--photon-builder-text)",
};

const subtleChipStyle: CSSProperties = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-field)",
	color: "var(--photon-builder-text-soft)",
};

const emphasizedChipStyle: CSSProperties = {
	borderColor: "var(--photon-builder-border-strong)",
	background: "var(--photon-builder-accent-soft)",
	color: "var(--photon-builder-accent-text)",
};

const warningCardStyle: CSSProperties = {
	borderColor: "var(--photon-builder-border-strong)",
	background:
		"linear-gradient(180deg, color-mix(in srgb, var(--photon-builder-accent) 12%, transparent), color-mix(in srgb, var(--photon-builder-panel-solid) 82%, transparent))",
	color: "var(--photon-builder-text)",
};

const SettingsCard = ({
	eyebrow,
	title,
	description,
	children,
}: {
	eyebrow: string;
	title: string;
	description?: string;
	children?: React.ReactNode;
}) => (
	<section className="rounded-[28px] border px-5 py-5" style={surfaceCardStyle}>
		<div
			className="text-[11px] uppercase tracking-[0.28em]"
			style={{ color: "var(--photon-builder-text-soft)" }}
		>
			{eyebrow}
		</div>
		<div
			className="mt-4 text-2xl font-semibold tracking-[-0.04em]"
			style={{ color: "var(--photon-builder-text)" }}
		>
			{title}
		</div>
		{description ? (
			<div
				className="mt-3 text-sm leading-7"
				style={{ color: "var(--photon-builder-text-muted)" }}
			>
				{description}
			</div>
		) : null}
		{children ? <div className="mt-5">{children}</div> : null}
	</section>
);

export const PageSettingsSurface = ({
	currentPage,
	pageSettings,
	pageSettingsPanels,
	site,
	siteSettingsPanels,
	siteSettingsSubtabs,
	getPageSettingValue,
	onPageSettingChange,
	onPageSettingFocus,
	getSiteSettingValue,
	onSiteSettingChange,
	onSiteSettingFocus,
}: PageSettingsSurfaceProps) => {
	const availableScopes = useMemo(
		() => resolveAvailableScopes(pageSettings),
		[pageSettings],
	);
	const [activeTab, setActiveTab] = useState<"page" | "site">("page");
	const [activeScope, setActiveScope] =
		useState<PhotonPageSettingsScope>(availableScopes[0] ?? "page");
	const siteSubtabs = useMemo(
		() => [
			{ key: "design", label: "Design" },
			{ key: "advanced-design", label: "Advanced design" },
			{ key: "locales", label: "Locales" },
			...siteSettingsSubtabs.map((tab) => ({
				key: tab.key,
				label: tab.label,
			})),
		],
		[siteSettingsSubtabs],
	);
	const [activeSiteTab, setActiveSiteTab] = useState(
		siteSubtabs[0]?.key ?? "design",
	);

	useEffect(() => {
		if (availableScopes.length === 0) {
			setActiveTab("site");
			return;
		}

		if (!availableScopes.includes(activeScope)) {
			setActiveScope(availableScopes[0]);
		}
	}, [activeScope, availableScopes]);

	useEffect(() => {
		if (!siteSubtabs.some((tab) => tab.key === activeSiteTab)) {
			setActiveSiteTab(siteSubtabs[0]?.key ?? "design");
		}
	}, [activeSiteTab, siteSubtabs]);

	const scopeSettings = getScopeSettings(pageSettings, activeScope);
	const scopedPanels = pageSettingsPanels.filter((panel) =>
		panel.scope === activeScope
			? panel.isVisible
				? panel.isVisible({
						scope: activeScope,
						currentPage,
						pageSettings,
					})
				: true
			: false,
	);
	const scopeTitle =
		readString(scopeSettings, "name") ??
		currentPage?.name ??
		scopeMeta[activeScope].label;
	const primaryRoute =
		activeScope === "template"
			? (readString(scopeSettings, "pathPattern") ??
				currentPage?.routePattern ??
				currentPage?.route)
			: (readString(scopeSettings, "path") ?? currentPage?.route);
	const secondaryRoute =
		activeScope === "template"
			? (readString(scopeSettings, "currentPath") ?? currentPage?.route)
			: null;
	const sitePanelDescription =
		"Design sources now belong to website profiles. Use Design to inspect the current profile source, Advanced Design to edit stored runtime tokens, and Locales to manage public/admin locale exposure.";
	const siteDesignPanel = siteSettingsPanels.find(
		(panel) => panel.key === "design",
	);
	const siteLocalesPanel = siteSettingsPanels.find(
		(panel) => panel.key === "locales",
	);
	const siteWorkspaceSubtab = siteSettingsSubtabs.find(
		(tab) => tab.key === activeSiteTab,
	);
	const remainingSitePanels = siteSettingsPanels.filter(
		(panel) => panel.key !== "design" && panel.key !== "locales",
	);

	const renderSitePanel = (
		panel: SiteSettingsPanelDefinition | undefined,
		viewMode?: string,
	) => {
		if (!panel) {
			return null;
		}

		const scopeSettings =
			typeof site.settings[panel.key] === "object" &&
			site.settings[panel.key] !== null
				? (site.settings[panel.key] as Record<string, unknown>)
				: {};
		const PanelComponent = panel.component;

		return (
			<section
				key={`${panel.key}:${viewMode ?? "default"}`}
				className="rounded-[28px] border px-5 py-5"
				style={surfaceCardStyle}
				data-testid={`photon-site-settings-panel-${panel.key}${viewMode ? `-${viewMode}` : ""}`}
			>
				<div className="mb-4">
					<div
						className="text-[11px] uppercase tracking-[0.28em]"
						style={{ color: "var(--photon-builder-text-soft)" }}
					>
						{panel.label}
					</div>
					{panel.description ? (
						<div
							className="mt-2 text-sm leading-6"
							style={{ color: "var(--photon-builder-text-muted)" }}
						>
							{panel.description}
						</div>
					) : null}
				</div>
				<PanelComponent
					currentPage={currentPage}
					pageSettings={pageSettings}
					site={site}
					scopeSettings={scopeSettings}
					viewMode={viewMode}
					getValue={(path) => getSiteSettingValue(`${panel.key}.${path}`)}
					setValue={(path, value) =>
						onSiteSettingChange(`${panel.key}.${path}`, value)
					}
					focusField={(path) => onSiteSettingFocus(`${panel.key}.${path}`)}
				/>
			</section>
		);
	};

	return (
		<section
			className="mx-auto w-full max-w-[1240px] px-1 pb-10"
			data-testid="photon-page-settings-surface"
		>
			<div
				className="rounded-[34px] border p-5 sm:p-6"
				style={{
					borderColor: "var(--photon-builder-border)",
					background:
						"linear-gradient(180deg, var(--photon-builder-panel-solid), var(--photon-builder-panel))",
					boxShadow: "var(--photon-builder-shadow)",
					color: "var(--photon-builder-text)",
				}}
				data-testid="photon-builder-settings-shell"
			>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
						<div className="min-w-0">
							<div
								className="text-[11px] uppercase tracking-[0.3em]"
								style={{ color: "var(--photon-builder-text-soft)" }}
							>
								Settings mode
							</div>
							<div
								className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
								style={{ color: "var(--photon-builder-text)" }}
							>
								Website settings
							</div>
							<div
								className="mt-2 max-w-3xl text-sm leading-7"
								style={{ color: "var(--photon-builder-text-muted)" }}
							>
								Switch between route-specific settings and shared site design
								without leaving the live website surface.
							</div>
						</div>

						<div
							className="inline-flex w-full max-w-full flex-wrap rounded-full border p-1 sm:w-auto"
							style={{
								borderColor: "var(--photon-builder-border)",
								background: "var(--photon-builder-field)",
							}}
						>
							{[
								{
									key: "page" as const,
									label: currentPage?.isDynamic ? "Template" : "Page",
									disabled: availableScopes.length === 0,
								},
								{
									key: "site" as const,
									label: "Site",
									disabled: false,
								},
							].map((tab) => (
								<button
									key={tab.key}
									type="button"
									onClick={() => !tab.disabled && setActiveTab(tab.key)}
									disabled={tab.disabled}
									data-testid={`photon-settings-tab-${tab.key}`}
									className={clsx(
										"cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-35",
									)}
									style={
										activeTab === tab.key
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

					{activeTab === "page" && availableScopes.length > 0 ? (
						<>
							<div
								className="inline-flex w-full max-w-full flex-wrap rounded-full border p-1 sm:w-auto"
								style={{
									borderColor: "var(--photon-builder-border)",
									background: "var(--photon-builder-field)",
								}}
							>
								{availableScopes.map((scope) => (
									<button
										key={scope}
										type="button"
										onClick={() => setActiveScope(scope)}
										data-testid={`photon-settings-scope-${scope}`}
										className={clsx(
											"cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition",
										)}
										style={
											activeScope === scope
												? {
														background: "var(--photon-builder-accent-soft)",
														color: "var(--photon-builder-accent-text)",
													}
												: { color: "var(--photon-builder-text-muted)" }
										}
									>
										{scopeMeta[scope].label}
									</button>
								))}
							</div>

							<SettingsCard
								eyebrow={scopeMeta[activeScope].eyebrow}
								title={scopeTitle}
								description={scopeMeta[activeScope].description}
							>
								<div className="flex flex-wrap items-center gap-2">
									<div
										className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
										style={subtleChipStyle}
									>
										{scopeMeta[activeScope].label}
									</div>
									{primaryRoute ? (
										<div
											className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]"
											style={subtleChipStyle}
										>
											{primaryRoute}
										</div>
									) : null}
									{activeScope === "template" && currentPage?.isDynamic ? (
										<div
											className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
											style={emphasizedChipStyle}
										>
											Dynamic template
										</div>
									) : null}
								</div>
							</SettingsCard>

							<section
								className="rounded-[28px] border px-5 py-5"
								style={surfaceCardStyle}
							>
								<div
									className="mb-4 text-[11px] uppercase tracking-[0.28em]"
									style={{ color: "var(--photon-builder-text-soft)" }}
								>
									Basics
								</div>

								{activeScope === "page" ? (
									<PhotonFieldEditorList
										fields={staticPageFields}
										subjectId="page-settings"
										getValue={(path) =>
											getPageSettingValue(`${activeScope}.${path}`)
										}
										onChange={(path, value) =>
											onPageSettingChange(`${activeScope}.${path}`, value)
										}
										onFocus={(path) =>
											onPageSettingFocus(`${activeScope}.${path}`)
										}
									/>
								) : null}

								{activeScope === "template" ? (
									<div className="space-y-4">
										<div
											className="rounded-2xl border px-4 py-3 text-sm leading-6"
											style={warningCardStyle}
										>
											Template structure stays shared here. The current route
											below is the live record you are previewing while editing
											that shared template.
										</div>
										<div className="grid gap-3 md:grid-cols-2">
											<div
												className="rounded-2xl border px-4 py-3"
												style={surfaceCardStyle}
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
													{scopeTitle}
												</div>
											</div>
											<div
												className="rounded-2xl border px-4 py-3"
												style={surfaceCardStyle}
											>
												<div
													className="text-[11px] uppercase tracking-[0.24em]"
													style={{ color: "var(--photon-builder-text-soft)" }}
												>
													Route pattern
												</div>
												<div
													className="mt-2 font-mono text-sm"
													style={{ color: "var(--photon-builder-text-muted)" }}
												>
													{primaryRoute ?? "Not available"}
												</div>
											</div>
											<div
												className="rounded-2xl border px-4 py-3 md:col-span-2"
												style={surfaceCardStyle}
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
													{secondaryRoute ??
														currentPage?.route ??
														"Not available"}
												</div>
											</div>
										</div>
									</div>
								) : null}

								{activeScope === "record" ? (
									<div className="space-y-4">
										<div
											className="rounded-2xl border px-4 py-3 text-sm leading-6"
											style={warningCardStyle}
										>
											Record settings affect only the live entity behind the
											current route. Shared builder structure remains owned by
											the template scope.
										</div>
										<div className="grid gap-3 md:grid-cols-2">
											<div
												className="rounded-2xl border px-4 py-3"
												style={surfaceCardStyle}
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
													{primaryRoute ??
														currentPage?.route ??
														"Not available"}
												</div>
											</div>
											<div
												className="rounded-2xl border px-4 py-3"
												style={surfaceCardStyle}
											>
												<div
													className="text-[11px] uppercase tracking-[0.24em]"
													style={{ color: "var(--photon-builder-text-soft)" }}
												>
													Record key
												</div>
												<div
													className="mt-2 text-sm font-semibold"
													style={{ color: "var(--photon-builder-text)" }}
												>
													{currentPage?.key ?? "Not available"}
												</div>
											</div>
										</div>
									</div>
								) : null}
							</section>

							{scopedPanels.map((panel) => {
								const PanelComponent = panel.component;

								return (
									<section
										key={`${activeScope}:${panel.key}`}
										className="rounded-[28px] border px-5 py-5"
										style={surfaceCardStyle}
									>
										<div className="mb-4">
											<div
												className="text-[11px] uppercase tracking-[0.28em]"
												style={{ color: "var(--photon-builder-text-soft)" }}
											>
												{panel.label}
											</div>
											{panel.description ? (
												<div
													className="mt-2 text-sm leading-6"
													style={{ color: "var(--photon-builder-text-muted)" }}
												>
													{panel.description}
												</div>
											) : null}
										</div>
										<PanelComponent
											scope={activeScope}
											currentPage={currentPage}
											pageSettings={pageSettings}
											scopeSettings={scopeSettings}
											getValue={(path) =>
												getPageSettingValue(`${activeScope}.${path}`)
											}
											setValue={(path, value) =>
												onPageSettingChange(`${activeScope}.${path}`, value)
											}
											focusField={(path) =>
												onPageSettingFocus(`${activeScope}.${path}`)
											}
										/>
									</section>
								);
							})}
						</>
					) : null}

					{activeTab === "site" ? (
						<>
							<SettingsCard
								eyebrow="Site settings"
								title="Shared design system"
								description={sitePanelDescription}
							>
								<div className="flex flex-wrap items-center gap-2">
									<div
										className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
										style={subtleChipStyle}
									>
										{Object.keys(site.regions).length} site regions
									</div>
									{Object.values(site.regions).map((region) => (
										<div
											key={region.key}
											className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
											style={subtleChipStyle}
										>
											{region.label}
										</div>
									))}
								</div>
							</SettingsCard>
							<div
								className="inline-flex w-full max-w-full flex-wrap rounded-full border p-1 sm:w-auto"
								style={{
									borderColor: "var(--photon-builder-border)",
									background: "var(--photon-builder-field)",
								}}
								data-testid="photon-site-settings-subtabs"
							>
								{siteSubtabs.map((tab) => (
									<button
										key={tab.key}
										type="button"
										onClick={() => setActiveSiteTab(tab.key)}
										data-testid={`photon-site-settings-subtab-${tab.key}`}
										className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition"
										style={
											activeSiteTab === tab.key
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

							{activeSiteTab === "design"
								? renderSitePanel(siteDesignPanel, "curated")
								: null}
							{activeSiteTab === "advanced-design"
								? renderSitePanel(siteDesignPanel, "advanced")
								: null}
							{activeSiteTab === "locales" ? (
								siteLocalesPanel ? (
									renderSitePanel(siteLocalesPanel)
								) : remainingSitePanels.length > 0 ? (
									remainingSitePanels.map((panel) => renderSitePanel(panel))
								) : (
									<section
										className="rounded-[28px] border px-5 py-5"
										style={surfaceCardStyle}
										data-testid="photon-site-settings-panel-locales-empty"
									>
										<div
											className="text-[11px] uppercase tracking-[0.28em]"
											style={{ color: "var(--photon-builder-text-soft)" }}
										>
											Locales
										</div>
										<div
											className="mt-3 text-sm leading-6"
											style={{ color: "var(--photon-builder-text-muted)" }}
										>
											The locales settings panel is not registered in this
											build.
										</div>
									</section>
								)
							) : null}
							{siteWorkspaceSubtab ? (
								<section
									className="rounded-[28px] border px-5 py-5"
									style={surfaceCardStyle}
									data-testid={`photon-site-settings-panel-${siteWorkspaceSubtab.key}`}
								>
									<div className="mb-4">
										<div
											className="text-[11px] uppercase tracking-[0.28em]"
											style={{ color: "var(--photon-builder-text-soft)" }}
										>
											{siteWorkspaceSubtab.label}
										</div>
										{siteWorkspaceSubtab.description ? (
											<div
												className="mt-2 text-sm leading-6"
												style={{ color: "var(--photon-builder-text-muted)" }}
											>
												{siteWorkspaceSubtab.description}
											</div>
										) : null}
									</div>
									<siteWorkspaceSubtab.component />
								</section>
							) : null}
						</>
					) : null}
				</div>
			</div>
		</section>
	);
};
