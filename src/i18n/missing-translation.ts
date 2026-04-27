import type {
	PhotonBlock,
	PhotonBlockLocalizationSchema,
	PhotonFieldKind,
	PhotonLocalizedDefaultValue,
} from "../types";
import { resolvePhotonBlockFieldLocalization } from "./block-localization";

const isLocalizedDefault = (
	value: unknown,
): value is PhotonLocalizedDefaultValue =>
	typeof value === "object" &&
	value !== null &&
	(value as { __wbLocalizedDefault?: boolean }).__wbLocalizedDefault === true;

const readPath = (source: unknown, path: string): unknown => {
	if (!path) return source;
	const segments = path.split(".");
	let current: unknown = source;
	for (const segment of segments) {
		if (current === null || current === undefined) return undefined;
		if (Array.isArray(current)) {
			const index = Number(segment);
			if (Number.isInteger(index)) {
				current = current[index];
				continue;
			}
		}
		if (typeof current === "object") {
			current = (current as Record<string, unknown>)[segment];
			continue;
		}
		return undefined;
	}
	return current;
};

const isEmpty = (value: unknown): boolean => {
	if (value === null || value === undefined) return true;
	if (typeof value === "string") return value.trim() === "";
	if (Array.isArray(value)) return value.length === 0;
	if (typeof value === "object") return Object.keys(value).length === 0;
	return false;
};

export interface FindPhotonFieldMissingLocalesInput {
	block: Pick<PhotonBlock, "props" | "localization">;
	schema?: PhotonBlockLocalizationSchema;
	fieldPath: string;
	fieldKind: PhotonFieldKind;
	/** Editable locale codes to check (admin's perspective). */
	locales: readonly string[];
	/**
	 * Reference locale used to detect "copied but never translated" values.
	 * Defaults to none (only empty values count as missing).
	 */
	referenceLocale?: string;
	/**
	 * If true (default), values identical to `referenceLocale` are flagged
	 * as missing unless the field instance is explicitly marked translated
	 * (`localization[fieldPath] === "localized"`).
	 */
	treatCopiedAsMissing?: boolean;
}

/**
 * Return the subset of `locales` for which the given field is missing.
 * A field is "missing" in a locale if:
 *  - effective localization for the field is "localized" (else returns []),
 *  - AND the locale-specific value is empty OR (with `treatCopiedAsMissing`)
 *    identical to the reference locale and not explicitly opted in.
 *
 * Pure helper. UI components consume the result to render warn markers.
 */
export const findPhotonFieldMissingLocales = ({
	block,
	schema,
	fieldPath,
	fieldKind,
	locales,
	referenceLocale,
	treatCopiedAsMissing = true,
}: FindPhotonFieldMissingLocalesInput): string[] => {
	const localization = resolvePhotonBlockFieldLocalization({
		block,
		schema,
		fieldPath,
		fieldKind,
	});
	if (localization !== "localized") return [];

	const raw = readPath(block.props, fieldPath);
	const explicitOverride = block.localization?.[fieldPath];

	const result: string[] = [];
	for (const locale of locales) {
		const value = isLocalizedDefault(raw) ? raw.values?.[locale] : raw;
		if (isEmpty(value)) {
			result.push(locale);
			continue;
		}
		if (
			treatCopiedAsMissing &&
			referenceLocale &&
			referenceLocale !== locale
		) {
			const refValue = isLocalizedDefault(raw)
				? raw.values?.[referenceLocale]
				: raw;
			if (
				refValue !== undefined &&
				refValue !== null &&
				JSON.stringify(refValue) === JSON.stringify(value) &&
				explicitOverride !== "localized"
			) {
				result.push(locale);
			}
		}
	}
	return result;
};
