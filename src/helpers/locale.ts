/**
 * Single locale-coercion primitive used across @init/photon and dependent kits.
 *
 * Returns `locale` unchanged when it is in `supported`; otherwise returns
 * `fallback`. Replaces the binary `locale === "en" ? "en" : "ru"` pattern that
 * silently collapsed any non-en locale to ru.
 */
export const coerceInterfaceLocale = (
	locale: string | null | undefined,
	options: { supported: readonly string[]; fallback: string },
): string => {
	const { supported, fallback } = options;

	if (typeof locale !== "string" || locale === "") {
		return fallback;
	}

	if (supported.includes(locale)) {
		return locale;
	}

	const baseTag = locale.split("-")[0];
	if (baseTag !== locale && supported.includes(baseTag)) {
		return baseTag;
	}

	return fallback;
};
