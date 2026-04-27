import type { PhotonLocaleDescriptor } from "../types";

export interface PhotonLocaleFallbackSettings {
	/**
	 * - `null` / unset → use the default locale as the fallback target.
	 * - `string` → explicit locale code; must exist in the locale list,
	 *   otherwise the resolver falls back to the default locale anyway.
	 * - `false` → fallback disabled. Missing values render as empty.
	 */
	fallbackLocale?: string | false | null;
}

export interface ResolvePhotonLocaleFallbackInput {
	settings: PhotonLocaleFallbackSettings | null | undefined;
	locales: readonly PhotonLocaleDescriptor[];
}

/**
 * Resolve which locale code (if any) acts as the field-level fallback.
 *
 * Priority (LOCALE_V1 §5.3):
 *   1. If `settings.fallbackLocale === false` → no fallback (returns null).
 *   2. If `settings.fallbackLocale` is a string and exists in the locale
 *      list → that locale.
 *   3. Otherwise → default locale (where `isDefault === true`).
 *   4. If no default locale exists → null.
 */
export const resolvePhotonFallbackLocaleCode = ({
	settings,
	locales,
}: ResolvePhotonLocaleFallbackInput): string | null => {
	if (settings?.fallbackLocale === false) return null;

	const explicit = settings?.fallbackLocale;
	if (
		typeof explicit === "string" &&
		explicit.length > 0 &&
		locales.some((locale) => locale.code === explicit)
	) {
		return explicit;
	}

	const defaultLocale = locales.find((locale) => locale.isDefault);
	return defaultLocale?.code ?? null;
};

const isLocalizedDefault = (
	value: unknown,
): value is { __wbLocalizedDefault: true; values: Record<string, unknown> } =>
	typeof value === "object" &&
	value !== null &&
	(value as { __wbLocalizedDefault?: boolean }).__wbLocalizedDefault === true;

const isEmpty = (value: unknown): boolean => {
	if (value === null || value === undefined) return true;
	if (typeof value === "string") return value.trim() === "";
	if (Array.isArray(value)) return value.length === 0;
	if (typeof value === "object") return Object.keys(value).length === 0;
	return false;
};

export interface ResolvePhotonLocalizedValueInput {
	value: unknown;
	locale: string;
	settings: PhotonLocaleFallbackSettings | null | undefined;
	locales: readonly PhotonLocaleDescriptor[];
}

/**
 * Resolve the actual value to render for `locale`. If the locale-specific
 * value is empty, applies the fallback policy from
 * `resolvePhotonFallbackLocaleCode`. When the fallback target is also
 * empty (or the value is shared / non-localized), returns the value as-is
 * or `undefined` for empties.
 */
export const resolvePhotonLocalizedValue = ({
	value,
	locale,
	settings,
	locales,
}: ResolvePhotonLocalizedValueInput): unknown => {
	if (!isLocalizedDefault(value)) {
		return isEmpty(value) ? undefined : value;
	}

	const direct = value.values[locale];
	if (!isEmpty(direct)) return direct;

	const fallbackCode = resolvePhotonFallbackLocaleCode({ settings, locales });
	if (!fallbackCode || fallbackCode === locale) return undefined;

	const fallbackValue = value.values[fallbackCode];
	if (!isEmpty(fallbackValue)) return fallbackValue;

	return undefined;
};
