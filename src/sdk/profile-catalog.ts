/**
 * Frontend fetcher for the PHP-owned profile-template catalog. Mirrors the JSON
 * shape served by api/photon-profiles/v1/{profile-templates,template-families,
 * color-schemes,design-presets} and normalises snake_case → camelCase.
 *
 * Returns `fallback` if the network call fails (timeout / abort / non-2xx),
 * so SSR never throws on backend hiccups.
 */

export type PhotonProfileTemplate = {
	slug: string;
	locale: string;
	familySlug: string | null;
	colorSchemeSlug: string | null;
	designPresetSlug: string | null;
	name: string;
	summary: string | null;
	structure: unknown;
	copy: unknown;
	meta: unknown;
	position: number;
};

export type PhotonTemplateFamily = {
	slug: string;
	name: string;
	summary: string | null;
	meta: unknown;
	position: number;
};

export type PhotonColorScheme = {
	slug: string;
	name: string;
	tokens: unknown;
	meta: unknown;
	position: number;
};

export type PhotonDesignPreset = {
	slug: string;
	name: string;
	tokens: unknown;
	meta: unknown;
	position: number;
};

export type PhotonProfileCatalog = {
	templates: PhotonProfileTemplate[];
	families: PhotonTemplateFamily[];
	colorSchemes: PhotonColorScheme[];
	designPresets: PhotonDesignPreset[];
};

export type FetchPhotonProfileCatalogOptions = {
	backendUrl: string;
	locale?: string;
	signal?: AbortSignal;
	fallback?: PhotonProfileCatalog;
	fetchImpl?: typeof fetch;
};

const PROFILE_TEMPLATES_PATH = "/api/photon-profiles/v1/profile-templates";
const TEMPLATE_FAMILIES_PATH = "/api/photon-profiles/v1/template-families";
const COLOR_SCHEMES_PATH = "/api/photon-profiles/v1/color-schemes";
const DESIGN_PRESETS_PATH = "/api/photon-profiles/v1/design-presets";

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const toNumber = (value: unknown): number =>
	typeof value === "number" ? value : Number(value ?? 0) || 0;

const toString = (value: unknown): string =>
	typeof value === "string" ? value : "";

const toNullableString = (value: unknown): string | null =>
	typeof value === "string" ? value : null;

const mapTemplate = (raw: Record<string, unknown>): PhotonProfileTemplate => ({
	slug: toString(raw.slug),
	locale: toString(raw.locale ?? "*"),
	familySlug: toNullableString(raw.family_slug),
	colorSchemeSlug: toNullableString(raw.color_scheme_slug),
	designPresetSlug: toNullableString(raw.design_preset_slug),
	name: toString(raw.name),
	summary: toNullableString(raw.summary),
	structure: raw.structure ?? null,
	copy: raw.copy ?? null,
	meta: raw.meta ?? null,
	position: toNumber(raw.position),
});

const mapFamily = (raw: Record<string, unknown>): PhotonTemplateFamily => ({
	slug: toString(raw.slug),
	name: toString(raw.name),
	summary: toNullableString(raw.summary),
	meta: raw.meta ?? null,
	position: toNumber(raw.position),
});

const mapColorScheme = (raw: Record<string, unknown>): PhotonColorScheme => ({
	slug: toString(raw.slug),
	name: toString(raw.name),
	tokens: raw.tokens ?? null,
	meta: raw.meta ?? null,
	position: toNumber(raw.position),
});

const mapDesignPreset = (raw: Record<string, unknown>): PhotonDesignPreset => ({
	slug: toString(raw.slug),
	name: toString(raw.name),
	tokens: raw.tokens ?? null,
	meta: raw.meta ?? null,
	position: toNumber(raw.position),
});

const fetchData = async <T>(
	url: string,
	options: FetchPhotonProfileCatalogOptions,
	mapper: (row: Record<string, unknown>) => T,
): Promise<T[]> => {
	const fetchImpl = options.fetchImpl ?? fetch;
	const response = await fetchImpl(url, {
		signal: options.signal,
		headers: { accept: "application/json" },
	});

	if (!response.ok) {
		throw new Error(
			`fetchPhotonProfileCatalog: ${url} responded with ${response.status}`,
		);
	}

	const body = (await response.json()) as { data?: unknown };
	const rows = Array.isArray(body.data) ? body.data : [];

	return rows
		.filter((row): row is Record<string, unknown> =>
			row !== null && typeof row === "object",
		)
		.map(mapper);
};

export const fetchPhotonProfileCatalog = async (
	options: FetchPhotonProfileCatalogOptions,
): Promise<PhotonProfileCatalog> => {
	const base = stripTrailingSlash(options.backendUrl);
	const localeQuery =
		typeof options.locale === "string" && options.locale !== ""
			? `?locale=${encodeURIComponent(options.locale)}`
			: "";

	try {
		const [templates, families, colorSchemes, designPresets] = await Promise.all(
			[
				fetchData(`${base}${PROFILE_TEMPLATES_PATH}${localeQuery}`, options, mapTemplate),
				fetchData(`${base}${TEMPLATE_FAMILIES_PATH}`, options, mapFamily),
				fetchData(`${base}${COLOR_SCHEMES_PATH}`, options, mapColorScheme),
				fetchData(`${base}${DESIGN_PRESETS_PATH}`, options, mapDesignPreset),
			],
		);

		return { templates, families, colorSchemes, designPresets };
	} catch (error) {
		if (options.fallback !== undefined) {
			return options.fallback;
		}
		throw error;
	}
};

export const emptyPhotonProfileCatalog: PhotonProfileCatalog = {
	templates: [],
	families: [],
	colorSchemes: [],
	designPresets: [],
};
