"use client";

import clsx from "clsx";
import {
	type CSSProperties,
	type PointerEventHandler,
	type ReactNode,
	useEffect,
} from "react";
import { resolvePhotonSiteDesignSettings } from "../../helpers/site-design";
import type {
	PhotonDocument,
	PhotonPageCatalogItem,
	PhotonPageSettings,
	PhotonSite,
} from "../../types";
import { SiteSurfaceCanvas } from "../canvas";
import { CanvasTopToolbar } from "../canvas/canvas-top-toolbar";
import { EditorDock } from "../editor-dock";
import { PageSettingsSurface } from "../page-settings-surface/page-settings-surface";
import type {
	InspectorDefinitionMeta,
	InspectorGroups,
	PageSettingsPanelDefinition,
	PaletteDefinition,
	SiteSettingsPanelDefinition,
	SiteSettingsSubtabDefinition,
} from "../types";
import { BuilderMobilePanels } from "./builder-mobile-panels";
import { BuilderSidebars } from "./builder-sidebars";

type BuilderRgb = {
	r: number;
	g: number;
	b: number;
};

const clampChannel = (value: number) =>
	Math.max(0, Math.min(255, Math.round(value)));

const HEX_COLOR_PATTERN = /^#([\da-f]{3}|[\da-f]{6})$/i;
const RGB_COLOR_PATTERN =
	/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[\d.]+\s*)?\)$/i;

const parseColor = (value: string): BuilderRgb | null => {
	const normalizedValue = value.trim();

	if (HEX_COLOR_PATTERN.test(normalizedValue)) {
		const hex = normalizedValue.slice(1);
		const expandedHex =
			hex.length === 3
				? hex
						.split("")
						.map((part) => `${part}${part}`)
						.join("")
				: hex;

		return {
			r: Number.parseInt(expandedHex.slice(0, 2), 16),
			g: Number.parseInt(expandedHex.slice(2, 4), 16),
			b: Number.parseInt(expandedHex.slice(4, 6), 16),
		};
	}

	const rgbMatch = normalizedValue.match(RGB_COLOR_PATTERN);

	if (!rgbMatch) {
		return null;
	}

	return {
		r: clampChannel(Number(rgbMatch[1])),
		g: clampChannel(Number(rgbMatch[2])),
		b: clampChannel(Number(rgbMatch[3])),
	};
};

const mixColor = (
	from: BuilderRgb,
	to: BuilderRgb,
	amount: number,
): BuilderRgb => ({
	r: clampChannel(from.r + (to.r - from.r) * amount),
	g: clampChannel(from.g + (to.g - from.g) * amount),
	b: clampChannel(from.b + (to.b - from.b) * amount),
});

const createRgbString = ({ r, g, b }: BuilderRgb) => `rgb(${r} ${g} ${b})`;

const createAlphaString = ({ r, g, b }: BuilderRgb, alpha: number) =>
	`rgb(${r} ${g} ${b} / ${alpha})`;

const getRelativeLuminance = (color: BuilderRgb) => {
	const channels = [color.r, color.g, color.b].map((channel) => {
		const normalized = channel / 255;

		return normalized <= 0.03928
			? normalized / 12.92
			: ((normalized + 0.055) / 1.055) ** 2.4;
	});

	return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const createBuilderThemeStyle = (
	designSettings: ReturnType<typeof resolvePhotonSiteDesignSettings>,
): CSSProperties => {
	const fallbackBackground = { r: 8, g: 19, b: 33 };
	const fallbackSurface = { r: 15, g: 27, b: 45 };
	const fallbackText = { r: 248, g: 251, b: 255 };
	const fallbackAccent = { r: 20, g: 184, b: 166 };
	const fallbackBorder = { r: 148, g: 163, b: 184 };
	const white = { r: 255, g: 255, b: 255 };
	const black = { r: 9, g: 18, b: 31 };
	const background =
		parseColor(designSettings.backgroundColor) ?? fallbackBackground;
	const surface = parseColor(designSettings.surfaceColor) ?? fallbackSurface;
	const text = parseColor(designSettings.textColor) ?? fallbackText;
	const accent = parseColor(designSettings.accentColor) ?? fallbackAccent;
	const border = parseColor(designSettings.borderColor) ?? fallbackBorder;
	const isDark = getRelativeLuminance(background) < 0.38;
	const shell = isDark
		? mixColor(background, surface, 0.58)
		: mixColor(background, surface, 0.28);
	const shellMuted = isDark
		? mixColor(shell, background, 0.18)
		: mixColor(shell, white, 0.2);
	const shellStrong = isDark
		? mixColor(shell, black, 0.18)
		: mixColor(shell, background, 0.06);
	const dockTop = isDark
		? mixColor(shell, accent, 0.08)
		: mixColor(shell, white, 0.42);
	const dockBottom = isDark
		? mixColor(background, surface, 0.32)
		: mixColor(surface, background, 0.36);
	const panel = isDark
		? mixColor(surface, background, 0.22)
		: mixColor(surface, background, 0.08);
	const panelSolid = isDark
		? mixColor(panel, black, 0.12)
		: mixColor(panel, white, 0.3);
	const field = isDark
		? mixColor(panelSolid, black, 0.22)
		: mixColor(panelSolid, background, 0.46);
	const card = isDark
		? mixColor(panelSolid, accent, 0.04)
		: mixColor(panelSolid, accent, 0.06);
	const cardSelected = isDark
		? mixColor(panelSolid, accent, 0.16)
		: mixColor(panelSolid, accent, 0.18);
	const accentSoft = isDark
		? mixColor(accent, background, 0.64)
		: mixColor(accent, white, 0.78);
	const accentText = getRelativeLuminance(accentSoft) > 0.58 ? black : white;
	const builderTextMuted = mixColor(text, background, isDark ? 0.42 : 0.34);
	const builderTextSoft = mixColor(text, background, isDark ? 0.62 : 0.52);
	const builderTextGhost = mixColor(text, background, isDark ? 0.76 : 0.68);
	const borderStrong = mixColor(border, accent, isDark ? 0.32 : 0.22);
	const scrollbarTrack = isDark
		? mixColor(background, black, 0.2)
		: mixColor(background, surface, 0.24);
	const scrollbarThumb = isDark
		? mixColor(accent, white, 0.16)
		: mixColor(accent, background, 0.18);
	const scrollbarThumbHover = isDark
		? mixColor(accent, white, 0.28)
		: mixColor(accent, white, 0.12);

	return {
		"--photon-builder-shell": createRgbString(shell),
		"--photon-builder-shell-muted": createRgbString(shellMuted),
		"--photon-builder-shell-strong": createRgbString(shellStrong),
		"--photon-builder-dock-bg": `linear-gradient(180deg, ${createAlphaString(dockTop, 0.96)} 0%, ${createAlphaString(dockBottom, 0.88)} 100%)`,
		"--photon-builder-panel": createAlphaString(panel, isDark ? 0.82 : 0.94),
		"--photon-builder-panel-solid": createRgbString(panelSolid),
		"--photon-builder-panel-muted": createAlphaString(
			panelSolid,
			isDark ? 0.78 : 0.88,
		),
		"--photon-builder-field": createRgbString(field),
		"--photon-builder-card": createRgbString(card),
		"--photon-builder-card-selected": createRgbString(cardSelected),
		"--photon-builder-card-highlight": `radial-gradient(circle at top left, ${createAlphaString(accent, isDark ? 0.14 : 0.12)}, transparent 58%)`,
		"--photon-builder-border": createAlphaString(border, isDark ? 0.22 : 0.7),
		"--photon-builder-border-strong": createAlphaString(
			borderStrong,
			isDark ? 0.42 : 0.8,
		),
		"--photon-builder-text": createRgbString(text),
		"--photon-builder-text-muted": createRgbString(builderTextMuted),
		"--photon-builder-text-soft": createRgbString(builderTextSoft),
		"--photon-builder-text-ghost": createRgbString(builderTextGhost),
		"--photon-builder-accent": createRgbString(accent),
		"--photon-builder-accent-soft": createAlphaString(
			accentSoft,
			isDark ? 0.94 : 0.96,
		),
		"--photon-builder-accent-strong": createAlphaString(
			accent,
			isDark ? 0.2 : 0.14,
		),
		"--photon-builder-accent-text": createRgbString(accentText),
		"--photon-builder-shadow": isDark
			? "0 18px 64px rgba(2, 6, 23, 0.28)"
			: "0 18px 54px rgba(15, 23, 42, 0.12)",
		"--photon-builder-panel-shadow": isDark
			? "0 14px 38px rgba(2, 6, 23, 0.24)"
			: "0 14px 34px rgba(15, 23, 42, 0.08)",
		"--photon-builder-sidebar-shadow": isDark
			? "0 22px 52px rgba(2, 6, 23, 0.3)"
			: "0 18px 44px rgba(15, 23, 42, 0.1)",
		"--photon-builder-card-shadow": isDark
			? "0 12px 26px rgba(2, 6, 23, 0.18)"
			: "0 10px 22px rgba(15, 23, 42, 0.08)",
		"--photon-builder-canvas-shadow": isDark
			? "0 28px 80px rgba(2, 8, 23, 0.24)"
			: "0 28px 72px rgba(15, 23, 42, 0.12)",
		"--photon-builder-elevation": `linear-gradient(180deg, ${createAlphaString(white, isDark ? 0.04 : 0.55)}, ${createAlphaString(white, 0)} 100%)`,
		"--photon-site-scrollbar-track": createAlphaString(
			scrollbarTrack,
			isDark ? 0.88 : 0.92,
		),
		"--photon-site-scrollbar-thumb": `linear-gradient(180deg, ${createAlphaString(
			scrollbarThumb,
			isDark ? 0.82 : 0.76,
		)}, ${createAlphaString(scrollbarThumbHover, isDark ? 0.9 : 0.84)})`,
		"--photon-site-scrollbar-thumb-hover": `linear-gradient(180deg, ${createAlphaString(
			scrollbarThumbHover,
			isDark ? 0.92 : 0.88,
		)}, ${createAlphaString(accent, isDark ? 0.94 : 0.9)})`,
		"--photon-site-scrollbar-border": createAlphaString(
			borderStrong,
			isDark ? 0.24 : 0.44,
		),
	} as CSSProperties;
};

type PhotonStageProps = {
	activeMode: "preview" | "content" | "builder";
	canManage: boolean;
	hasUnsavedChanges: boolean;
	collapsedBlockCount: number;
	autosaveEnabled: boolean;
	saveState: "idle" | "saving" | "saved" | "error";
	showCollapsedInPreview: boolean;
	title: string;
	description: string;
	currentPage: PhotonPageCatalogItem | null;
	pages: PhotonPageCatalogItem[];
	onHeightChange: (height: number) => void;
	onAuthOpen: () => void;
	onAutosaveChange: (value: boolean) => void;
	onOpenPage?: (page: PhotonPageCatalogItem) => void;
	onCreatePage?: (input: {
		name: string;
		route: string;
		duplicateCurrent: boolean;
	}) => void | Promise<void>;
	onContentLocaleChange?: (locale: string) => void;
	onInterfaceLocaleChange?: (locale: string) => void;
	showInterfaceLocaleControl: boolean;
	workspaceControl?: {
		isOpen: boolean;
		onToggle: () => void;
		shortcutLabel?: string;
	};
	onCollapseAll: () => void;
	onExpandAll: () => void;
	onBuilderSurfaceModeChange: (value: "canvas" | "settings") => void;
	onLogout: () => void;
	onModeChange: (mode: "preview" | "content" | "builder") => void;
	onPreviewCollapsedChange: () => void;
	onReset: () => void;
	onSave: () => void;
	builderEnabled: boolean;
	builderSurfaceMode: "canvas" | "settings";
	contentEnabled: boolean;
	dockHeight: number;
	isResizing: boolean;
	leftSidebarWidth: number;
	rightSidebarWidth: number;
	leftCollapsed: boolean;
	rightCollapsed: boolean;
	mainPaddingTop: number;
	document: PhotonDocument;
	isDragging: boolean;
	manualInsertTarget: { listId: string; index: number } | null;
	dropTarget: { listId: string; index: number } | null;
	structureModeEnabled: boolean;
	respectsCollapsedState: boolean;
	onActivateInsertTarget: (
		target: { listId: string; index: number } | null,
	) => void;
	contentNotice: ReactNode;
	search: string;
	onSearchChange: (value: string) => void;
	allPaletteBlocks: PaletteDefinition[];
	paletteGroups: import("../types").PaletteFamilyGroup[];
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
	definitionFields: PaletteDefinition["fields"];
	inspectorGroups: InspectorGroups;
	selectedFieldPath: string | null;
	inspectorDefinition: InspectorDefinitionMeta | null;
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
	onToggleLeftCollapsed: () => void;
	onToggleRightCollapsed: () => void;
	onExpandLeft: () => void;
	onExpandRight: () => void;
	onResizeStart: (
		side: "left" | "right",
	) => PointerEventHandler<HTMLButtonElement>;
};

export const PhotonStage = ({
	activeMode,
	canManage,
	hasUnsavedChanges,
	collapsedBlockCount,
	autosaveEnabled,
	saveState,
	showCollapsedInPreview,
	title,
	description,
	currentPage,
	pages,
	onHeightChange,
	onAuthOpen,
	onAutosaveChange,
	onOpenPage,
	onCreatePage,
	onContentLocaleChange,
	onInterfaceLocaleChange,
	showInterfaceLocaleControl,
	workspaceControl,
	onCollapseAll,
	onExpandAll,
	onBuilderSurfaceModeChange,
	onLogout,
	onModeChange,
	onPreviewCollapsedChange,
	onReset,
	onSave,
	builderEnabled,
	builderSurfaceMode,
	contentEnabled,
	dockHeight,
	isResizing,
	leftSidebarWidth,
	rightSidebarWidth,
	leftCollapsed,
	rightCollapsed,
	mainPaddingTop,
	document,
	isDragging,
	manualInsertTarget,
	dropTarget,
	structureModeEnabled,
	respectsCollapsedState,
	onActivateInsertTarget,
	contentNotice,
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
	definitionFields,
	inspectorGroups,
	selectedFieldPath,
	inspectorDefinition,
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
	onToggleLeftCollapsed,
	onToggleRightCollapsed,
	onExpandLeft,
	onExpandRight,
	onResizeStart,
}: PhotonStageProps) => {
	const canvasSurfaceVisible =
		!builderEnabled || builderSurfaceMode === "canvas";
	const sidebarsVisible = builderEnabled && builderSurfaceMode === "canvas";
	const canvasToolbarHeight = builderEnabled ? 40 : 0;
	const canvasToolbarLeftOffset =
		sidebarsVisible && !leftCollapsed ? leftSidebarWidth : 0;
	const canvasToolbarRightOffset =
		sidebarsVisible && !rightCollapsed ? rightSidebarWidth : 0;
	const canvasToolbarTopOffset = dockHeight;
	const canvasMainPaddingTop = mainPaddingTop + canvasToolbarHeight;
	const builderSurfaceInset = builderEnabled ? 16 : 0;
	const designSettings = resolvePhotonSiteDesignSettings(
		site.settings.design,
	);
	const siteSurfaceStyle = {
		"--photon-site-body-font": designSettings.bodyFontFamily,
		"--photon-site-heading-font": designSettings.headingFontFamily,
		"--photon-site-background": designSettings.backgroundColor,
		"--photon-site-surface": designSettings.surfaceColor,
		"--photon-site-text": designSettings.textColor,
		"--photon-site-muted": designSettings.mutedTextColor,
		"--photon-site-muted-text": designSettings.mutedTextColor,
		"--photon-site-accent": designSettings.accentColor,
		"--photon-site-border": designSettings.borderColor,
		"--photon-site-max-width": designSettings.siteMaxWidth,
		"--photon-site-gutter": designSettings.pageGutter,
		"--photon-section-gap": designSettings.sectionGap,
		"--photon-site-radius": designSettings.radius,
		"--photon-site-header-offset": designSettings.headerOffset,
	} as CSSProperties;
	const siteSurfaceSceneStyle = {
		backgroundColor: designSettings.backgroundColor,
		color: designSettings.textColor,
		fontFamily: designSettings.bodyFontFamily,
	} as CSSProperties;
	const builderThemeStyle = createBuilderThemeStyle(designSettings);
	const stageStyle = {
		...siteSurfaceStyle,
		...builderThemeStyle,
		fontFamily:
			"var(--font-display, ui-sans-serif), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
		fontWeight: 400,
	} as CSSProperties;
	const mainStyle = {
		paddingTop: canManage
			? canvasMainPaddingTop + builderSurfaceInset
			: mainPaddingTop,
		"--photon-dock-offset": `${canManage ? canvasMainPaddingTop : 0}px`,
		...(canManage
			? {
					backgroundColor: "var(--photon-builder-shell)",
					color: "var(--photon-builder-text)",
				}
			: {}),
		...(canvasSurfaceVisible ? siteSurfaceSceneStyle : {}),
	} as CSSProperties;

	useEffect(() => {
		const browserDocument = globalThis.document;

		if (!browserDocument) {
			return;
		}

		const root =
			browserDocument.documentElement instanceof HTMLElement
				? browserDocument.documentElement
				: null;

		if (!root) {
			return;
		}

		const previousValues = new Map<string, string>();

		for (const [key, value] of Object.entries(builderThemeStyle)) {
			if (
				(!key.startsWith("--photon-builder-") &&
					!key.startsWith("--photon-site-scrollbar-")) ||
				typeof value !== "string"
			) {
				continue;
			}

			previousValues.set(key, root.style.getPropertyValue(key));
			root.style.setProperty(key, value);
		}

		return () => {
			for (const [key, value] of previousValues.entries()) {
				if (value) {
					root.style.setProperty(key, value);
					continue;
				}

				root.style.removeProperty(key);
			}
		};
	}, [builderThemeStyle, canManage]);

	return (
		<div
			className="relative z-10 transition-[background-color,color] duration-500"
			style={stageStyle}
			data-testid="photon-builder-theme-root"
			data-photon-builder-appearance={
				getRelativeLuminance(
					parseColor(designSettings.backgroundColor) ?? { r: 8, g: 19, b: 33 },
				) < 0.38
					? "dark"
					: "light"
			}
		>
			{canManage ? (
				<EditorDock
					activeMode={activeMode}
					canManage={canManage}
					hasUnsavedChanges={hasUnsavedChanges}
					collapsedBlockCount={collapsedBlockCount}
					autosaveEnabled={autosaveEnabled}
					saveState={saveState}
					showCollapsedInPreview={showCollapsedInPreview}
					title={title}
					description={description}
					currentPage={currentPage}
					pages={pages}
					onHeightChange={onHeightChange}
					onAuthOpen={onAuthOpen}
					onAutosaveChange={onAutosaveChange}
					onOpenPage={onOpenPage}
					onCreatePage={onCreatePage}
					onContentLocaleChange={onContentLocaleChange}
					onInterfaceLocaleChange={onInterfaceLocaleChange}
					showInterfaceLocaleControl={showInterfaceLocaleControl}
					workspaceControl={workspaceControl}
					onLogout={onLogout}
					onModeChange={onModeChange}
					onPreviewCollapsedChange={onPreviewCollapsedChange}
					onReset={onReset}
					onSave={onSave}
				/>
			) : null}

			<BuilderSidebars
				sidebarsVisible={sidebarsVisible}
				dockHeight={dockHeight}
				isResizing={isResizing}
				leftSidebarWidth={leftSidebarWidth}
				rightSidebarWidth={rightSidebarWidth}
				leftCollapsed={leftCollapsed}
				rightCollapsed={rightCollapsed}
				search={search}
				onSearchChange={onSearchChange}
				allPaletteBlocks={allPaletteBlocks}
				paletteGroups={paletteGroups}
				paletteFamily={paletteFamily}
				onPaletteFamilyChange={onPaletteFamilyChange}
				palettePackage={palettePackage}
				onPalettePackageChange={onPalettePackageChange}
				collapsedFamilies={collapsedFamilies}
				onToggleFamily={onToggleFamily}
				collapsedGroups={collapsedGroups}
				onToggleGroup={onToggleGroup}
				selectedDefinitionKey={selectedDefinitionKey}
				onSelectDefinition={onSelectDefinition}
				onInsert={onInsert}
				manualInsertTarget={manualInsertTarget}
				definitionFields={definitionFields}
				inspectorGroups={inspectorGroups}
				selectedFieldPath={selectedFieldPath}
				inspectorDefinition={inspectorDefinition}
				pageSettings={pageSettings}
				currentPage={currentPage}
				onContentLocaleChange={onContentLocaleChange}
				onToggleLeftCollapsed={onToggleLeftCollapsed}
				onToggleRightCollapsed={onToggleRightCollapsed}
				onExpandLeft={onExpandLeft}
				onExpandRight={onExpandRight}
				onResizeStart={onResizeStart}
			>
				<CanvasTopToolbar
					visible={builderEnabled}
					surfaceMode={builderSurfaceMode}
					canReset={hasUnsavedChanges}
					topOffset={canvasToolbarTopOffset}
					leftOffset={canvasToolbarLeftOffset}
					rightOffset={canvasToolbarRightOffset}
					onSurfaceModeChange={onBuilderSurfaceModeChange}
					onReset={onReset}
					onCollapseAll={onCollapseAll}
					onExpandAll={onExpandAll}
				/>
				<main
					className={clsx(
						"min-w-0 transition-colors duration-500",
						canManage ? "min-h-screen pb-0" : "pb-0",
						builderEnabled
							? "px-4 sm:px-6 lg:px-8"
							: canvasSurfaceVisible
								? "px-0"
								: "px-4 sm:px-6 lg:px-8",
					)}
					style={mainStyle}
				>
					<div
						className={clsx(
							"mx-auto transition-[max-width,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
							canvasSurfaceVisible ? "max-w-none" : "max-w-[1480px]",
						)}
					>
						{builderEnabled && builderSurfaceMode === "settings" ? (
							<PageSettingsSurface
								currentPage={currentPage}
								pageSettings={pageSettings}
								pageSettingsPanels={pageSettingsPanels}
								site={site}
								siteSettingsPanels={siteSettingsPanels}
								siteSettingsSubtabs={siteSettingsSubtabs}
								getPageSettingValue={getPageSettingValue}
								onPageSettingChange={onPageSettingChange}
								onPageSettingFocus={onPageSettingFocus}
								getSiteSettingValue={getSiteSettingValue}
								onSiteSettingChange={onSiteSettingChange}
								onSiteSettingFocus={onSiteSettingFocus}
							/>
						) : (
							<div
								className={clsx(
									"relative",
									!isResizing &&
										"transition-[border-radius,box-shadow] duration-300",
									builderEnabled
										? "rounded-[28px] border shadow-[var(--photon-builder-canvas-shadow)]"
										: null,
								)}
								style={{
									...siteSurfaceSceneStyle,
									...(builderEnabled
										? {
												borderColor: "var(--photon-builder-border)",
											}
										: {}),
								}}
							>
								{builderEnabled ? (
									<div
										className="pointer-events-none absolute inset-0 rounded-[28px]"
										style={{ background: "var(--photon-builder-elevation)" }}
									/>
								) : null}
								<div className="relative">
									<SiteSurfaceCanvas
										document={document}
										site={site}
										builderEnabled={builderEnabled}
										collapseControlsEnabled={structureModeEnabled}
										respectsCollapsedState={respectsCollapsedState}
										isDragging={isDragging}
										manualInsertTarget={manualInsertTarget}
										dropTarget={dropTarget}
										onActivateInsertTarget={onActivateInsertTarget}
									/>
								</div>
							</div>
						)}
					</div>

					{contentEnabled && contentNotice ? (
						<div className="mx-auto mt-4 max-w-[1480px]">{contentNotice}</div>
					) : null}

					{builderEnabled && builderSurfaceMode === "canvas" ? (
						<BuilderMobilePanels
							search={search}
							onSearchChange={onSearchChange}
							allPaletteBlocks={allPaletteBlocks}
							paletteGroups={paletteGroups}
							paletteFamily={paletteFamily}
							onPaletteFamilyChange={onPaletteFamilyChange}
							palettePackage={palettePackage}
							onPalettePackageChange={onPalettePackageChange}
							collapsedFamilies={collapsedFamilies}
							onToggleFamily={onToggleFamily}
							collapsedGroups={collapsedGroups}
							onToggleGroup={onToggleGroup}
							selectedDefinitionKey={selectedDefinitionKey}
							onSelectDefinition={onSelectDefinition}
							onInsert={onInsert}
							manualInsertTarget={manualInsertTarget}
							definitionFields={definitionFields}
							inspectorGroups={inspectorGroups}
							selectedFieldPath={selectedFieldPath}
							inspectorDefinition={inspectorDefinition}
							pageSettings={pageSettings}
							currentPage={currentPage}
							onContentLocaleChange={onContentLocaleChange}
						/>
					) : null}
				</main>
			</BuilderSidebars>
		</div>
	);
};
