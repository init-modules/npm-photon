import type {
	PhotonResolvedSiteData,
	PhotonSiteDataSchema,
	PhotonSiteSettings,
} from "../types";
import { isRecord } from "./path";
import { PHOTON_ROUTE_CONTEXT_SCOPE } from "./route-context";

export const PHOTON_SITE_DATA_SETTING_KEY = "data";
export const PHOTON_SITE_DATA_BY_LOCALE_SETTING_KEY = "dataByLocale";

export const sitePath = (schemaId: string, fieldPath: string): string =>
	`${PHOTON_SITE_DATA_SETTING_KEY}.${schemaId}.${fieldPath}`;

export const localeSitePath = (
	localeCode: string,
	schemaId: string,
	fieldPath: string,
): string =>
	`${PHOTON_SITE_DATA_BY_LOCALE_SETTING_KEY}.${localeCode}.${schemaId}.${fieldPath}`;

const getNested = (obj: Record<string, unknown>, path: string): unknown => {
	const parts = path.split(".");
	let cur: unknown = obj;
	for (const part of parts) {
		if (!isRecord(cur)) {
			return undefined;
		}
		cur = cur[part];
	}
	return cur;
};

export const resolvePhotonSiteData = (
	schemas: PhotonSiteDataSchema[],
	siteSettings: PhotonSiteSettings | undefined,
	options?: { locale?: string | null },
): PhotonResolvedSiteData => {
	const dataSetting = isRecord(siteSettings)
		? siteSettings[PHOTON_SITE_DATA_SETTING_KEY]
		: undefined;
	const overrides = isRecord(dataSetting) ? dataSetting : {};

	const localeRoot = isRecord(siteSettings)
		? siteSettings[PHOTON_SITE_DATA_BY_LOCALE_SETTING_KEY]
		: undefined;
	const localeBucket =
		options?.locale && isRecord(localeRoot) && isRecord(localeRoot[options.locale])
			? (localeRoot[options.locale] as Record<string, unknown>)
			: {};

	const values: Record<string, Record<string, unknown>> = {};

	for (const schema of schemas) {
		const localeOverride = isRecord(localeBucket[schema.id])
			? (localeBucket[schema.id] as Record<string, unknown>)
			: {};
		const schemaOverride = isRecord(overrides[schema.id])
			? (overrides[schema.id] as Record<string, unknown>)
			: {};
		const schemaValues: Record<string, unknown> = {};
		for (const field of schema.fields) {
			const localeValue = getNested(localeOverride, field.path);
			if (localeValue !== undefined) {
				schemaValues[field.path] = localeValue;
				continue;
			}
			const overrideValue = getNested(schemaOverride, field.path);
			schemaValues[field.path] =
				overrideValue !== undefined ? overrideValue : field.defaultValue;
		}
		values[schema.id] = schemaValues;
	}

	return {
		schemas,
		schemasById: new Map(schemas.map((s) => [s.id, s])),
		values,
	};
};

const BINDING_PATTERN = /\{\{\s*([\w.]+)\s*\}\}/g;

export const parsePhotonSiteDataBindingExpression = (
	expression: string,
): { schemaId: string; fieldPath: string } | null => {
	const trimmed = expression.trim();
	const dotIndex = trimmed.indexOf(".");
	if (dotIndex <= 0 || dotIndex === trimmed.length - 1) {
		return null;
	}
	return {
		schemaId: trimmed.slice(0, dotIndex),
		fieldPath: trimmed.slice(dotIndex + 1),
	};
};

export const resolvePhotonSiteDataBinding = (
	text: string,
	resolved: PhotonResolvedSiteData,
	options?: {
		fallback?: string;
		routeContext?: Record<string, unknown>;
	},
): string =>
	text.replace(BINDING_PATTERN, (match, expression: string) => {
		const parsed = parsePhotonSiteDataBindingExpression(expression);
		if (!parsed) {
			return match;
		}
		if (parsed.schemaId === PHOTON_ROUTE_CONTEXT_SCOPE) {
			const routeValue = options?.routeContext?.[parsed.fieldPath];
			if (routeValue === undefined || routeValue === null) {
				return options?.fallback ?? "";
			}
			return String(routeValue);
		}
		const value = resolved.values[parsed.schemaId]?.[parsed.fieldPath];
		if (value === undefined || value === null) {
			return options?.fallback ?? "";
		}
		return String(value);
	});

export const extractPhotonSiteDataBindings = (
	text: string,
): Array<{ schemaId: string; fieldPath: string }> => {
	const result: Array<{ schemaId: string; fieldPath: string }> = [];
	for (const match of text.matchAll(BINDING_PATTERN)) {
		const parsed = parsePhotonSiteDataBindingExpression(match[1]);
		if (parsed) {
			result.push(parsed);
		}
	}
	return result;
};
