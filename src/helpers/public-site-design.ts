import type {
	PhotonResolvedSiteDesignSettings,
	PhotonSiteComponentVariants,
	PhotonSiteDesignColorTokens,
	PhotonSiteDesignSettings,
} from "../types";

const PHOTON_PUBLIC_SITE_DESIGN_TOKEN_KEYS = [
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

const PHOTON_PUBLIC_SITE_DESIGN_COLOR_TOKEN_KEYS = [
	"backgroundColor",
	"surfaceColor",
	"textColor",
	"mutedTextColor",
	"accentColor",
	"borderColor",
] as const satisfies ReadonlyArray<keyof PhotonSiteDesignColorTokens>;

export const PHOTON_PUBLIC_SITE_DESIGN_DEFAULTS: PhotonSiteDesignSettings =
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

const PHOTON_PUBLIC_SITE_DESIGN_FALLBACK_DEFAULTS: PhotonSiteDesignSettings =
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

const hasAnyTokenOverride = (
	candidate: Record<string, unknown>,
	keys: readonly (keyof PhotonSiteDesignSettings)[],
) => keys.some((key) => readNonEmptyString(candidate[key]) !== undefined);

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

const matchesPublicFallbackDefaults = (
	value: PhotonSiteDesignSettings,
) =>
	PHOTON_PUBLIC_SITE_DESIGN_TOKEN_KEYS.every(
		(key) =>
			value[key] === PHOTON_PUBLIC_SITE_DESIGN_FALLBACK_DEFAULTS[key],
	);

export const resolvePhotonPublicSiteDesignSettings = (
	value: unknown,
): PhotonResolvedSiteDesignSettings => {
	const candidate = asSiteDesignCandidate(value);
	const tokenOverrides = readTokenOverrides(
		candidate,
		PHOTON_PUBLIC_SITE_DESIGN_TOKEN_KEYS,
	);
	const componentVariants = normalizeComponentVariants(
		candidate.componentVariants,
	);
	const tokenSettings = {
		...PHOTON_PUBLIC_SITE_DESIGN_DEFAULTS,
		...tokenOverrides,
	};
	const hasTokenOverrides = hasAnyTokenOverride(
		candidate,
		PHOTON_PUBLIC_SITE_DESIGN_TOKEN_KEYS,
	);
	const hasColorOverrides = hasAnyTokenOverride(
		candidate,
		PHOTON_PUBLIC_SITE_DESIGN_COLOR_TOKEN_KEYS,
	);
	const hasComponentVariantOverrides =
		Object.keys(componentVariants).length > 0;
	const isFallbackDesign =
		hasTokenOverrides &&
		!hasColorOverrides &&
		!hasComponentVariantOverrides &&
		matchesPublicFallbackDefaults(tokenSettings);

	return {
		...(isFallbackDesign
			? PHOTON_PUBLIC_SITE_DESIGN_FALLBACK_DEFAULTS
			: PHOTON_PUBLIC_SITE_DESIGN_DEFAULTS),
		...tokenOverrides,
		componentVariants,
	};
};

export const isPhotonPublicFramelessSiteDesign = (value: unknown) => {
	const settings = resolvePhotonPublicSiteDesignSettings(value);

	return (
		settings.radius === "0px" ||
		settings.sectionGap === "0px" ||
		settings.componentVariants.siteShell === "editorial"
	);
};
