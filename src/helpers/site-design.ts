import { getPhotonSiteColorScheme } from "../modules/system/site/site-color-schemes";
import { getPhotonSiteDesignPreset } from "../modules/system/site/site-design-presets";
import type {
	PhotonResolvedSiteDesignSettings,
	PhotonSiteComponentVariants,
	PhotonSiteDesignColorTokens,
	PhotonSiteDesignSettings,
} from "../types";

const PHOTON_SITE_DESIGN_TOKEN_KEYS = [
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
] as const satisfies ReadonlyArray<keyof PhotonSiteDesignSettings>;

const PHOTON_SITE_DESIGN_COLOR_TOKEN_KEYS = [
	"backgroundColor",
	"surfaceColor",
	"textColor",
	"mutedTextColor",
	"accentColor",
	"borderColor",
] as const satisfies ReadonlyArray<keyof PhotonSiteDesignColorTokens>;

const PHOTON_FRAMELESS_PRESET_IDS = new Set([
	"paper-flow",
	"init-landing",
]);

export const PHOTON_SITE_DESIGN_DEFAULTS: PhotonSiteDesignSettings =
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

export const PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS: PhotonSiteDesignSettings =
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

const matchesPhotonSiteDesignDefaults = (
	left: PhotonSiteDesignSettings,
	right: PhotonSiteDesignSettings,
) =>
	PHOTON_SITE_DESIGN_TOKEN_KEYS.every(
		(key) => left[key] === right[key],
	);

const hasAnyTokenOverride = (
	candidate: Record<string, unknown>,
	keys: readonly (keyof PhotonSiteDesignSettings)[],
) => keys.some((key) => readNonEmptyString(candidate[key]) !== undefined);

const readTokenOverrides = (
	candidate: Record<string, unknown>,
	keys: readonly (keyof PhotonSiteDesignSettings)[],
) =>
	keys.reduce<Partial<PhotonSiteDesignSettings>>((result, key) => {
		const value = readNonEmptyString(candidate[key]);

		if (value !== undefined) {
			result[key] = value;
		}

		return result;
	}, {});

const normalizeComponentVariants = (
	value: unknown,
): PhotonSiteComponentVariants => {
	if (typeof value !== "object" || value === null) {
		return {};
	}

	return Object.entries(
		value as Record<string, unknown>,
	).reduce<PhotonSiteComponentVariants>(
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
	value: PhotonSiteDesignSettings,
): PhotonSiteDesignSettings =>
	PHOTON_SITE_DESIGN_TOKEN_KEYS.reduce<PhotonSiteDesignSettings>(
		(result, key) => {
			result[key] = value[key];

			return result;
		},
		{ ...PHOTON_SITE_DESIGN_DEFAULTS },
	);

const createResolvedSettings = ({
	presetId,
	colorSchemeId,
	componentVariants,
	tokenOverrides,
}: {
	presetId?: string;
	colorSchemeId?: string;
	componentVariants?: PhotonSiteComponentVariants;
	tokenOverrides?: Partial<PhotonSiteDesignSettings>;
}): PhotonResolvedSiteDesignSettings => {
	const preset = presetId
		? getPhotonSiteDesignPreset(presetId)
		: undefined;
	const colorScheme = colorSchemeId
		? getPhotonSiteColorScheme(colorSchemeId)
		: undefined;

	return {
		...PHOTON_SITE_DESIGN_DEFAULTS,
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
	componentVariants?: PhotonSiteComponentVariants;
	tokenOverrides?: Partial<PhotonSiteDesignSettings>;
} = {}): PhotonResolvedSiteDesignSettings =>
	createResolvedSettings({
		componentVariants,
		tokenOverrides: {
			...PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS,
			...(tokenOverrides ?? {}),
		},
	});

export const createPhotonSiteDesignSettings = ({
	presetId,
	colorSchemeId,
	componentVariants,
	overrides,
}: {
	presetId?: string;
	colorSchemeId?: string;
	componentVariants?: PhotonSiteComponentVariants;
	overrides?: Partial<PhotonSiteDesignSettings>;
} = {}): PhotonResolvedSiteDesignSettings => {
	const preset = presetId
		? getPhotonSiteDesignPreset(presetId)
		: undefined;

	return createResolvedSettings({
		presetId: preset?.id,
		colorSchemeId: colorSchemeId ?? preset?.recommendedColorSchemeId,
		componentVariants,
		tokenOverrides: overrides,
	});
};

export const isPhotonFramelessPreset = (presetId?: string | null) =>
	typeof presetId === "string" &&
	PHOTON_FRAMELESS_PRESET_IDS.has(presetId);

export const isPhotonFramelessSiteDesign = (value: unknown) =>
	isPhotonFramelessPreset(
		resolvePhotonSiteDesignSettings(value).presetId,
	);

export const applyPhotonSiteDesignPreset = (
	value: unknown,
	presetId: string,
): PhotonResolvedSiteDesignSettings => {
	const currentSettings = resolvePhotonSiteDesignSettings(value);
	const preset = getPhotonSiteDesignPreset(presetId);
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

export const isPhotonSiteDesignPresetApplied = (
	settings: PhotonResolvedSiteDesignSettings,
	presetId: string,
) => {
	const preset = getPhotonSiteDesignPreset(presetId);

	if (!preset) {
		return false;
	}

	const tokenMatches = Object.entries(preset.designTokens).every(
		([key, value]) =>
			settings[key as keyof PhotonResolvedSiteDesignSettings] === value,
	);
	const variantMatches = Object.entries(preset.componentVariants).every(
		([key, value]) => settings.componentVariants[key] === value,
	);
	const recommendedSchemeMatches =
		settings.colorSchemeId === preset.recommendedColorSchemeId;

	return tokenMatches && variantMatches && recommendedSchemeMatches;
};

export const hasPhotonSiteDesignPresetCustomization = (
	settings: PhotonResolvedSiteDesignSettings,
	presetId: string,
) => {
	const preset = getPhotonSiteDesignPreset(presetId);

	return (
		settings.presetId === preset?.id &&
		!isPhotonSiteDesignPresetApplied(settings, presetId)
	);
};

export const applyPhotonSiteColorScheme = (
	value: unknown,
	colorSchemeId: string,
): PhotonResolvedSiteDesignSettings => {
	const currentSettings = resolvePhotonSiteDesignSettings(value);
	const colorScheme = getPhotonSiteColorScheme(colorSchemeId);

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

export const resolvePhotonSiteDesignSettings = (
	value: unknown,
): PhotonResolvedSiteDesignSettings => {
	const candidate = asSiteDesignCandidate(value);
	const presetId = readNonEmptyString(candidate.presetId);
	const colorSchemeId = readNonEmptyString(candidate.colorSchemeId);
	const tokenOverrides = readTokenOverrides(
		candidate,
		PHOTON_SITE_DESIGN_TOKEN_KEYS,
	);
	const tokenOverrideSettings = {
		...PHOTON_SITE_DESIGN_DEFAULTS,
		...tokenOverrides,
	};
	const componentVariants = normalizeComponentVariants(
		candidate.componentVariants,
	);
	const hasTokenOverrides = hasAnyTokenOverride(
		candidate,
		PHOTON_SITE_DESIGN_TOKEN_KEYS,
	);
	const hasColorOverrides = hasAnyTokenOverride(
		candidate,
		PHOTON_SITE_DESIGN_COLOR_TOKEN_KEYS,
	);
	const hasComponentVariantOverrides =
		Object.keys(componentVariants).length > 0;
	const explicitPreset = presetId
		? getPhotonSiteDesignPreset(presetId)
		: undefined;
	const explicitColorScheme = colorSchemeId
		? getPhotonSiteColorScheme(colorSchemeId)
		: undefined;
	const isFallbackDesign =
		!explicitPreset &&
		!explicitColorScheme &&
		!hasComponentVariantOverrides &&
		matchesPhotonSiteDesignDefaults(
			tokenOverrideSettings,
			PHOTON_SITE_DESIGN_FALLBACK_DEFAULTS,
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
