import type {
	PhotonBlock,
	PhotonBlockLocalizationSchema,
	PhotonField,
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

const isEmptyValue = (value: unknown): boolean => {
	if (value === null || value === undefined) return true;
	if (typeof value === "string") return value.trim() === "";
	if (Array.isArray(value)) return value.length === 0;
	if (typeof value === "object") return Object.keys(value).length === 0;
	return false;
};

/**
 * Read the value of a localized field in a specific locale. If the value
 * stored on the block is a `PhotonLocalizedDefaultValue`, its `values[locale]`
 * is returned. Otherwise the raw value is treated as the locale-agnostic
 * fallback (which may or may not be considered "missing" — that's caller's
 * decision via `treatRawAsLocale`).
 */
export const readLocalizedFieldValue = (
	block: PhotonBlock,
	fieldPath: string,
	locale: string,
): unknown => {
	const raw = readPath(block.props, fieldPath);
	if (isLocalizedDefault(raw)) {
		return raw.values?.[locale];
	}
	return raw;
};

export interface PhotonBlockSchemaMap {
	/**
	 * Maps a block `type` string to the list of editable fields and its
	 * localization schema. Provided by the registry that owns block module
	 * definitions; passed in here as a plain map to avoid coupling to the
	 * studio runtime.
	 */
	[blockType: string]: {
		fields: readonly PhotonField[];
		localization?: PhotonBlockLocalizationSchema;
	};
}

export interface PhotonTranslationCompletenessResult {
	locale: string;
	total: number;
	filled: number;
	missing: number;
	percentage: number;
	missingFields: Array<{
		blockId: string;
		blockType: string;
		fieldPath: string;
	}>;
}

export interface ComputePhotonTranslationCompletenessInput {
	blocks: readonly PhotonBlock[];
	schemas: PhotonBlockSchemaMap;
	locale: string;
	/**
	 * If true (default), a value identical to the same field in
	 * `referenceLocale` is treated as missing (admin copied content but never
	 * translated it). Caller can flip a per-field "translated" flag in
	 * `block.localization` to opt out.
	 */
	treatCopiedAsMissing?: boolean;
	/** Locale to compare against when `treatCopiedAsMissing` is on. */
	referenceLocale?: string;
}

/**
 * Compute translation completeness % for a given locale across blocks.
 *
 * Counts only fields whose effective localization is "localized" (per
 * `resolvePhotonBlockFieldLocalization`). A field is considered "filled" when:
 *
 *   - its value for `locale` is non-empty, AND
 *   - if `treatCopiedAsMissing` and `referenceLocale` are set, it is not
 *     identical to the reference locale's value (unless the block instance
 *     explicitly marks the field as translated via
 *     `block.localization[fieldPath] === "localized"` — this means the admin
 *     already opted into "this field is the same intentionally").
 *
 * Per spec, percentage = filled / total. 100% requires zero missing fields.
 * Cache the result yourself; this function is a pure computation.
 */
export const computePhotonTranslationCompleteness = ({
	blocks,
	schemas,
	locale,
	treatCopiedAsMissing = true,
	referenceLocale,
}: ComputePhotonTranslationCompletenessInput): PhotonTranslationCompletenessResult => {
	let total = 0;
	let filled = 0;
	const missingFields: PhotonTranslationCompletenessResult["missingFields"] = [];

	const visit = (block: PhotonBlock) => {
		const schema = schemas[block.type];
		if (schema) {
			for (const field of schema.fields) {
				const localization = resolvePhotonBlockFieldLocalization({
					block,
					schema: schema.localization,
					fieldPath: field.path,
					fieldKind: field.kind,
				});
				if (localization !== "localized") continue;

				total += 1;
				const value = readLocalizedFieldValue(block, field.path, locale);
				const isEmpty = isEmptyValue(value);

				let isCopiedUntranslated = false;
				if (
					!isEmpty &&
					treatCopiedAsMissing &&
					referenceLocale &&
					referenceLocale !== locale
				) {
					const refValue = readLocalizedFieldValue(
						block,
						field.path,
						referenceLocale,
					);
					if (
						refValue !== undefined &&
						refValue !== null &&
						JSON.stringify(refValue) === JSON.stringify(value)
					) {
						// Caller can mark a field as intentionally identical via
						// instance override of the same value; in that case skip.
						const explicitOverride = block.localization?.[field.path];
						if (explicitOverride !== "localized") {
							isCopiedUntranslated = true;
						}
					}
				}

				if (isEmpty || isCopiedUntranslated) {
					missingFields.push({
						blockId: block.id,
						blockType: block.type,
						fieldPath: field.path,
					});
				} else {
					filled += 1;
				}
			}
		}

		if (block.areas) {
			for (const area of block.areas) {
				for (const child of area.blocks) {
					visit(child);
				}
			}
		}
	};

	for (const block of blocks) visit(block);

	const percentage =
		total === 0 ? 100 : Math.round((filled / total) * 100);
	const missing = total - filled;

	return {
		locale,
		total,
		filled,
		missing,
		percentage,
		missingFields,
	};
};
