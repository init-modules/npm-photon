import { getWebsiteBuilderSiteColorScheme } from "../modules/system/site/site-color-schemes";
import { getWebsiteBuilderSiteDesignPreset } from "../modules/system/site/site-design-presets";
import type {
	WebsiteBuilderResolvedSiteDesignSettings,
	WebsiteBuilderSiteComponentVariants,
	WebsiteBuilderSiteDesignColorTokens,
	WebsiteBuilderSiteDesignSettings,
} from "../types";

const WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS = [
	"bodyFontFamily",
	"headingFontFamily",
	"backgroundColor",
	"surfaceColor",
	"textColor",
	"mutedTextColor",
	"accentColor",
	"borderColor",
	"siteMaxWidth",
	"pageGutter",
	"sectionGap",
	"radius",
	"headerOffset",
] as const satisfies ReadonlyArray<keyof WebsiteBuilderSiteDesignSettings>;

const WEBSITE_BUILDER_SITE_DESIGN_COLOR_TOKEN_KEYS = [
	"backgroundColor",
	"surfaceColor",
	"textColor",
	"mutedTextColor",
	"accentColor",
	"borderColor",
] as const satisfies ReadonlyArray<keyof WebsiteBuilderSiteDesignColorTokens>;

const WEBSITE_BUILDER_FRAMELESS_PRESET_IDS = new Set([
	"paper-flow",
	"init-landing",
]);

export const WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS: WebsiteBuilderSiteDesignSettings =
	{
		bodyFontFamily: "var(--font-display, ui-sans-serif), system-ui, sans-serif",
		headingFontFamily:
			"var(--font-display, ui-sans-serif), system-ui, sans-serif",
		backgroundColor: "#081321",
		surfaceColor: "#0f1b2d",
		textColor: "#f8fbff",
		mutedTextColor: "#94a3b8",
		accentColor: "#14b8a6",
		borderColor: "rgba(148, 163, 184, 0.18)",
		siteMaxWidth: "1280px",
		pageGutter: "24px",
		sectionGap: "32px",
		radius: "24px",
		headerOffset: "0px",
	};

export const WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS: WebsiteBuilderSiteDesignSettings =
	{
		bodyFontFamily: "ui-sans-serif, system-ui, sans-serif",
		headingFontFamily: "ui-sans-serif, system-ui, sans-serif",
		backgroundColor: "#f8fafc",
		surfaceColor: "#ffffff",
		textColor: "#0f172a",
		mutedTextColor: "#64748b",
		accentColor: "#0f766e",
		borderColor: "#dbe4ee",
		siteMaxWidth: "1280px",
		pageGutter: "24px",
		sectionGap: "32px",
		radius: "24px",
		headerOffset: "0px",
	};

const asSiteDesignCandidate = (value: unknown): Record<string, unknown> =>
	typeof value === "object" && value !== null
		? (value as Record<string, unknown>)
		: {};

const readNonEmptyString = (value: unknown) =>
	typeof value === "string" && value.trim() !== "" ? value : undefined;

const matchesWebsiteBuilderSiteDesignDefaults = (
	left: WebsiteBuilderSiteDesignSettings,
	right: WebsiteBuilderSiteDesignSettings,
) =>
	WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS.every(
		(key) => left[key] === right[key],
	);

const hasAnyTokenOverride = (
	candidate: Record<string, unknown>,
	keys: readonly (keyof WebsiteBuilderSiteDesignSettings)[],
) => keys.some((key) => readNonEmptyString(candidate[key]) !== undefined);

const readTokenOverrides = (
	candidate: Record<string, unknown>,
	keys: readonly (keyof WebsiteBuilderSiteDesignSettings)[],
) =>
	keys.reduce<Partial<WebsiteBuilderSiteDesignSettings>>((result, key) => {
		const value = readNonEmptyString(candidate[key]);

		if (value !== undefined) {
			result[key] = value;
		}

		return result;
	}, {});

const normalizeComponentVariants = (
	value: unknown,
): WebsiteBuilderSiteComponentVariants => {
	if (typeof value !== "object" || value === null) {
		return {};
	}

	return Object.entries(
		value as Record<string, unknown>,
	).reduce<WebsiteBuilderSiteComponentVariants>(
		(result, [key, candidateValue]) => {
			const normalizedValue = readNonEmptyString(candidateValue);

			if (key.trim() !== "" && normalizedValue !== undefined) {
				result[key] = normalizedValue;
			}

			return result;
		},
		{},
	);
};

const pickSiteDesignTokens = (
	value: WebsiteBuilderSiteDesignSettings,
): WebsiteBuilderSiteDesignSettings =>
	WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS.reduce<WebsiteBuilderSiteDesignSettings>(
		(result, key) => {
			result[key] = value[key];

			return result;
		},
		{ ...WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS },
	);

const createResolvedSettings = ({
	presetId,
	colorSchemeId,
	componentVariants,
	tokenOverrides,
}: {
	presetId?: string;
	colorSchemeId?: string;
	componentVariants?: WebsiteBuilderSiteComponentVariants;
	tokenOverrides?: Partial<WebsiteBuilderSiteDesignSettings>;
}): WebsiteBuilderResolvedSiteDesignSettings => {
	const preset = presetId
		? getWebsiteBuilderSiteDesignPreset(presetId)
		: undefined;
	const colorScheme = colorSchemeId
		? getWebsiteBuilderSiteColorScheme(colorSchemeId)
		: undefined;

	return {
		...WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS,
		...(preset?.designTokens ?? {}),
		...(colorScheme?.colorTokens ?? {}),
		...(tokenOverrides ?? {}),
		presetId: preset?.id,
		colorSchemeId: colorScheme?.id,
		componentVariants: {
			...(preset?.componentVariants ?? {}),
			...(componentVariants ?? {}),
		},
	};
};

const createFallbackResolvedSettings = ({
	componentVariants,
	tokenOverrides,
}: {
	componentVariants?: WebsiteBuilderSiteComponentVariants;
	tokenOverrides?: Partial<WebsiteBuilderSiteDesignSettings>;
} = {}): WebsiteBuilderResolvedSiteDesignSettings =>
	createResolvedSettings({
		componentVariants,
		tokenOverrides: {
			...WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS,
			...(tokenOverrides ?? {}),
		},
	});

export const createWebsiteBuilderSiteDesignSettings = ({
	presetId,
	colorSchemeId,
	componentVariants,
	overrides,
}: {
	presetId?: string;
	colorSchemeId?: string;
	componentVariants?: WebsiteBuilderSiteComponentVariants;
	overrides?: Partial<WebsiteBuilderSiteDesignSettings>;
} = {}): WebsiteBuilderResolvedSiteDesignSettings => {
	const preset = presetId
		? getWebsiteBuilderSiteDesignPreset(presetId)
		: undefined;

	return createResolvedSettings({
		presetId: preset?.id,
		colorSchemeId: colorSchemeId ?? preset?.recommendedColorSchemeId,
		componentVariants,
		tokenOverrides: overrides,
	});
};

export const isWebsiteBuilderFramelessPreset = (presetId?: string | null) =>
	typeof presetId === "string" &&
	WEBSITE_BUILDER_FRAMELESS_PRESET_IDS.has(presetId);

export const isWebsiteBuilderFramelessSiteDesign = (value: unknown) =>
	isWebsiteBuilderFramelessPreset(
		resolveWebsiteBuilderSiteDesignSettings(value).presetId,
	);

export const applyWebsiteBuilderSiteDesignPreset = (
	value: unknown,
	presetId: string,
): WebsiteBuilderResolvedSiteDesignSettings => {
	const currentSettings = resolveWebsiteBuilderSiteDesignSettings(value);
	const preset = getWebsiteBuilderSiteDesignPreset(presetId);
	const resolvedColorSchemeId =
		preset?.recommendedColorSchemeId ?? currentSettings.colorSchemeId;
	const rawComponentVariants = normalizeComponentVariants(
		asSiteDesignCandidate(value).componentVariants,
	);
	const presetVariantKeys = new Set(
		Object.keys(preset?.componentVariants ?? {}),
	);
	const preservedCustomVariants = Object.fromEntries(
		Object.entries(rawComponentVariants).filter(
			([key]) => !presetVariantKeys.has(key),
		),
	);

	return createResolvedSettings({
		presetId: preset?.id ?? currentSettings.presetId,
		colorSchemeId: resolvedColorSchemeId,
		componentVariants: {
			...preservedCustomVariants,
			...(preset?.componentVariants ?? {}),
		},
	});
};

export const isWebsiteBuilderSiteDesignPresetApplied = (
	settings: WebsiteBuilderResolvedSiteDesignSettings,
	presetId: string,
) => {
	const preset = getWebsiteBuilderSiteDesignPreset(presetId);

	if (!preset) {
		return false;
	}

	const tokenMatches = Object.entries(preset.designTokens).every(
		([key, value]) =>
			settings[key as keyof WebsiteBuilderResolvedSiteDesignSettings] === value,
	);
	const variantMatches = Object.entries(preset.componentVariants).every(
		([key, value]) => settings.componentVariants[key] === value,
	);
	const recommendedSchemeMatches =
		settings.colorSchemeId === preset.recommendedColorSchemeId;

	return tokenMatches && variantMatches && recommendedSchemeMatches;
};

export const hasWebsiteBuilderSiteDesignPresetCustomization = (
	settings: WebsiteBuilderResolvedSiteDesignSettings,
	presetId: string,
) => {
	const preset = getWebsiteBuilderSiteDesignPreset(presetId);

	return (
		settings.presetId === preset?.id &&
		!isWebsiteBuilderSiteDesignPresetApplied(settings, presetId)
	);
};

export const applyWebsiteBuilderSiteColorScheme = (
	value: unknown,
	colorSchemeId: string,
): WebsiteBuilderResolvedSiteDesignSettings => {
	const currentSettings = resolveWebsiteBuilderSiteDesignSettings(value);
	const colorScheme = getWebsiteBuilderSiteColorScheme(colorSchemeId);

	return createResolvedSettings({
		presetId: currentSettings.presetId,
		colorSchemeId: colorScheme?.id ?? currentSettings.colorSchemeId,
		componentVariants: currentSettings.componentVariants,
		tokenOverrides: {
			...pickSiteDesignTokens(currentSettings),
			...(colorScheme?.colorTokens ?? {}),
		},
	});
};

export const resolveWebsiteBuilderSiteDesignSettings = (
	value: unknown,
): WebsiteBuilderResolvedSiteDesignSettings => {
	const candidate = asSiteDesignCandidate(value);
	const presetId = readNonEmptyString(candidate.presetId);
	const colorSchemeId = readNonEmptyString(candidate.colorSchemeId);
	const tokenOverrides = readTokenOverrides(
		candidate,
		WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS,
	);
	const tokenOverrideSettings = {
		...WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS,
		...tokenOverrides,
	};
	const componentVariants = normalizeComponentVariants(
		candidate.componentVariants,
	);
	const hasTokenOverrides = hasAnyTokenOverride(
		candidate,
		WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS,
	);
	const hasColorOverrides = hasAnyTokenOverride(
		candidate,
		WEBSITE_BUILDER_SITE_DESIGN_COLOR_TOKEN_KEYS,
	);
	const hasComponentVariantOverrides =
		Object.keys(componentVariants).length > 0;
	const explicitPreset = presetId
		? getWebsiteBuilderSiteDesignPreset(presetId)
		: undefined;
	const explicitColorScheme = colorSchemeId
		? getWebsiteBuilderSiteColorScheme(colorSchemeId)
		: undefined;
	const isFallbackDesign =
		!explicitPreset &&
		!explicitColorScheme &&
		!hasComponentVariantOverrides &&
		matchesWebsiteBuilderSiteDesignDefaults(
			tokenOverrideSettings,
			WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS,
		);
	if (isFallbackDesign) {
		return createFallbackResolvedSettings({
			tokenOverrides,
		});
	}

	return createResolvedSettings({
		presetId: explicitPreset?.id,
		colorSchemeId:
			explicitColorScheme?.id ?? explicitPreset?.recommendedColorSchemeId,
		componentVariants,
		tokenOverrides,
	});
};
