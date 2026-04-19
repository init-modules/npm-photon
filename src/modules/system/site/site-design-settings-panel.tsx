"use client";

import type { CSSProperties } from "react";
import React from "react";
import { WebsiteBuilderFieldEditorList } from "../../../components/website-builder-field-editor-list";
import { resolveWebsiteBuilderSiteDesignSettings } from "../../../helpers/site-design";
import { useWebsiteBuilderI18n } from "../../../i18n/website-builder-i18n-context";
import type {
	WebsiteBuilderField,
	WebsiteBuilderSiteSettingsPanelDefinition,
	WebsiteBuilderSiteSettingsPanelProps,
} from "../../../types";
import { websiteBuilderSiteColorSchemes } from "./site-color-schemes";
import { websiteBuilderSiteDesignPresets } from "./site-design-presets";

const designFields: WebsiteBuilderField[] = [
	{
		path: "bodyFontFamily",
		label: "Body font family",
		labelKey: "websiteBuilder.system.design.bodyFontFamily.label",
		kind: "text",
		description: "Any valid CSS font-family stack.",
		descriptionKey: "websiteBuilder.system.design.bodyFontFamily.description",
	},
	{
		path: "headingFontFamily",
		label: "Heading font family",
		labelKey: "websiteBuilder.system.design.headingFontFamily.label",
		kind: "text",
		description:
			"Used by system header/footer shells and any package that opts into the shared site tokens.",
		descriptionKey:
			"websiteBuilder.system.design.headingFontFamily.description",
	},
	{
		path: "backgroundColor",
		label: "Page background",
		labelKey: "websiteBuilder.system.design.backgroundColor.label",
		kind: "color",
	},
	{
		path: "surfaceColor",
		label: "Surface color",
		labelKey: "websiteBuilder.system.design.surfaceColor.label",
		kind: "color",
	},
	{
		path: "textColor",
		label: "Text color",
		labelKey: "websiteBuilder.system.design.textColor.label",
		kind: "color",
	},
	{
		path: "mutedTextColor",
		label: "Muted text color",
		labelKey: "websiteBuilder.system.design.mutedTextColor.label",
		kind: "color",
	},
	{
		path: "accentColor",
		label: "Accent color",
		labelKey: "websiteBuilder.system.design.accentColor.label",
		kind: "color",
	},
	{
		path: "borderColor",
		label: "Border color",
		labelKey: "websiteBuilder.system.design.borderColor.label",
		kind: "color",
	},
	{
		path: "siteMaxWidth",
		label: "Site max width",
		labelKey: "websiteBuilder.system.design.siteMaxWidth.label",
		kind: "text",
		description:
			"CSS width value used by the main content rail, for example 1280px or 92rem.",
		descriptionKey: "websiteBuilder.system.design.siteMaxWidth.description",
	},
	{
		path: "pageGutter",
		label: "Page gutter",
		labelKey: "websiteBuilder.system.design.pageGutter.label",
		kind: "text",
		description: "Horizontal spacing applied around the live page surface.",
		descriptionKey: "websiteBuilder.system.design.pageGutter.description",
	},
	{
		path: "sectionGap",
		label: "Section gap",
		labelKey: "websiteBuilder.system.design.sectionGap.label",
		kind: "text",
		description:
			"Vertical spacing between top-level blocks in the page region.",
		descriptionKey: "websiteBuilder.system.design.sectionGap.description",
	},
	{
		path: "radius",
		label: "Radius",
		labelKey: "websiteBuilder.system.design.radius.label",
		kind: "text",
		description: "Shared radius token consumed by the system shells.",
		descriptionKey: "websiteBuilder.system.design.radius.description",
	},
	{
		path: "headerOffset",
		label: "Header offset",
		labelKey: "websiteBuilder.system.design.headerOffset.label",
		kind: "text",
		description:
			"Extra top offset applied to sticky site headers on top of the builder dock.",
		descriptionKey: "websiteBuilder.system.design.headerOffset.description",
	},
];

const summaryCardStyle: CSSProperties = {
	borderColor: "var(--wb-builder-border)",
	background: "var(--wb-builder-panel-muted)",
	color: "var(--wb-builder-text)",
};

const highlightCardStyle: CSSProperties = {
	borderColor: "var(--wb-builder-border-strong)",
	background:
		"linear-gradient(180deg, color-mix(in srgb, var(--wb-builder-accent) 10%, transparent), var(--wb-builder-panel-muted))",
	color: "var(--wb-builder-text)",
};

const badgeStyle: CSSProperties = {
	borderColor: "var(--wb-builder-border)",
	background: "var(--wb-builder-panel-solid)",
	color: "var(--wb-builder-text-soft)",
};

const tokenPreviewItems = [
	{
		key: "backgroundColor",
		label: "Background",
	},
	{
		key: "surfaceColor",
		label: "Surface",
	},
	{
		key: "textColor",
		label: "Text",
	},
	{
		key: "mutedTextColor",
		label: "Muted",
	},
	{
		key: "accentColor",
		label: "Accent",
	},
	{
		key: "borderColor",
		label: "Border",
	},
] as const;

const DetailBadge = ({ label }: { label: string }) => (
	<span
		className="inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
		style={badgeStyle}
	>
		{label}
	</span>
);

const SiteDesignSettingsPanelBody = ({
	scopeSettings,
	getValue,
	setValue,
	focusField,
	viewMode,
}: WebsiteBuilderSiteSettingsPanelProps) => {
	const { translate } = useWebsiteBuilderI18n();
	const resolvedSettings = resolveWebsiteBuilderSiteDesignSettings(scopeSettings);
	const isAdvancedView = viewMode === "advanced";
	const activePreset = resolvedSettings.presetId
		? websiteBuilderSiteDesignPresets.find(
				(candidate) => candidate.id === resolvedSettings.presetId,
			) ?? null
		: null;
	const activeColorScheme = resolvedSettings.colorSchemeId
		? websiteBuilderSiteColorSchemes.find(
				(candidate) => candidate.id === resolvedSettings.colorSchemeId,
			) ?? null
		: null;

	if (isAdvancedView) {
		return (
			<section className="space-y-4" data-testid="wb-design-manual-tokens">
				<div className="space-y-2">
					<div
						className="text-sm font-semibold"
						style={{ color: "var(--wb-builder-text)" }}
					>
						{translate(
							"websiteBuilder.system.design.manual.sectionTitle",
							"Manual tokens",
						)}
					</div>
					<div
						className="text-sm leading-6"
						style={{ color: "var(--wb-builder-text-muted)" }}
					>
						{translate(
							"websiteBuilder.system.design.manual.sectionDescription",
							"Edit the active profile tokens directly here. These overrides live inside the selected profile branch and revision.",
						)}
					</div>
				</div>
				<WebsiteBuilderFieldEditorList
					fields={designFields}
					subjectId="site-design-settings"
					getValue={getValue}
					onChange={setValue}
					onFocus={focusField}
				/>
			</section>
		);
	}

	return (
		<div className="space-y-6" data-testid="wb-design-profile-source-summary">
			<section
				className="rounded-[24px] border p-4 sm:p-5"
				style={highlightCardStyle}
			>
				<div className="space-y-2">
					<div
						className="text-sm font-semibold"
						style={{ color: "var(--wb-builder-text)" }}
					>
						{translate(
							"websiteBuilder.system.design.profileSource.sectionTitle",
							"Profile source",
						)}
					</div>
					<div
						className="text-sm leading-6"
						style={{ color: "var(--wb-builder-text-muted)" }}
					>
						{translate(
							"websiteBuilder.system.design.profileSource.sectionDescription",
							"Starter presets and design templates are chosen when a website profile is created. This tab shows the current profile source metadata, while token editing lives in Advanced Design.",
						)}
					</div>
				</div>

				<div className="mt-4 grid gap-3 lg:grid-cols-2">
					<div
						className="rounded-[22px] border p-4"
						style={summaryCardStyle}
						data-testid="wb-design-source-preset"
					>
						<div
							className="text-[11px] uppercase tracking-[0.28em]"
							style={{ color: "var(--wb-builder-text-soft)" }}
						>
							{translate(
								"websiteBuilder.system.design.profileSource.presetLabel",
								"Starter preset",
							)}
						</div>
						<div
							className="mt-3 text-lg font-semibold"
							style={{ color: "var(--wb-builder-text)" }}
						>
							{activePreset?.label ??
								translate(
									"websiteBuilder.system.design.profileSource.blankPreset",
									"Blank or migrated profile",
								)}
						</div>
						<div
							className="mt-2 text-sm leading-6"
							style={{ color: "var(--wb-builder-text-muted)" }}
						>
							{activePreset?.description ??
								translate(
									"websiteBuilder.system.design.profileSource.blankPresetDescription",
									"This profile has no starter preset metadata. Its current appearance is defined entirely by the stored design tokens below and the active branch history.",
								)}
						</div>
						<div className="mt-3 flex flex-wrap gap-2">
							<DetailBadge
								label={
									activePreset?.appearance === "dark"
										? translate(
												"websiteBuilder.system.design.appearance.dark",
												"Dark",
											)
										: activePreset?.appearance === "light"
											? translate(
													"websiteBuilder.system.design.appearance.light",
													"Light",
												)
											: translate(
													"websiteBuilder.system.design.profileSource.customized",
													"Custom",
												)
								}
							/>
							<DetailBadge label={resolvedSettings.siteMaxWidth} />
							<DetailBadge label={resolvedSettings.sectionGap} />
						</div>
					</div>

					<div
						className="rounded-[22px] border p-4"
						style={summaryCardStyle}
						data-testid="wb-design-source-color-scheme"
					>
						<div
							className="text-[11px] uppercase tracking-[0.28em]"
							style={{ color: "var(--wb-builder-text-soft)" }}
						>
							{translate(
								"websiteBuilder.system.design.profileSource.schemeLabel",
								"Stored palette",
							)}
						</div>
						<div
							className="mt-3 text-lg font-semibold"
							style={{ color: "var(--wb-builder-text)" }}
						>
							{activeColorScheme?.label ??
								translate(
									"websiteBuilder.system.design.profileSource.customPalette",
									"Manual palette",
								)}
						</div>
						<div
							className="mt-2 text-sm leading-6"
							style={{ color: "var(--wb-builder-text-muted)" }}
						>
							{activeColorScheme?.description ??
								translate(
									"websiteBuilder.system.design.profileSource.customPaletteDescription",
									"The current branch stores color tokens directly, so no named palette is attached to this profile state.",
								)}
						</div>
						<div
							className="mt-4 flex flex-wrap gap-2"
							data-testid="wb-design-runtime-palette"
						>
							{tokenPreviewItems.map(({ key, label }) => (
								<span
									key={key}
									className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs"
									style={badgeStyle}
								>
									<span
										className="h-3 w-3 rounded-full border"
										style={{
											backgroundColor: resolvedSettings[key],
											borderColor: "var(--wb-builder-border)",
										}}
									/>
									{label}
								</span>
							))}
						</div>
					</div>
				</div>
			</section>

			<section
				className="rounded-[24px] border p-4 sm:p-5"
				style={summaryCardStyle}
				data-testid="wb-design-workspace-guidance"
			>
				<div
					className="text-sm font-semibold"
					style={{ color: "var(--wb-builder-text)" }}
				>
					{translate(
						"websiteBuilder.system.design.workspaceGuidance.title",
						"How to change the source",
					)}
				</div>
				<div
					className="mt-2 text-sm leading-6"
					style={{ color: "var(--wb-builder-text-muted)" }}
				>
					{translate(
						"websiteBuilder.system.design.workspaceGuidance.description",
						"To start from another preset or immutable design template, create a new website profile from the workspace panel. To evolve the current profile, keep editing the stored tokens in Advanced Design.",
					)}
				</div>
			</section>
		</div>
	);
};

export const siteDesignSettingsPanel: WebsiteBuilderSiteSettingsPanelDefinition = {
	key: "design",
	label: "Design",
	labelKey: "websiteBuilder.system.design.panel.label",
	description:
		"Profile source metadata and stored runtime design tokens for the current branch.",
	descriptionKey: "websiteBuilder.system.design.panel.description",
	order: 10,
	component: (props) => <SiteDesignSettingsPanelBody {...props} />,
};
