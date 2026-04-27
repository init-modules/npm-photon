import type {
	PhotonBlock,
	PhotonBlockLocalizationSchema,
	PhotonFieldKind,
	PhotonFieldLocalization,
} from "../types";

/**
 * Default localization policy by field kind.
 *
 * - Text-like fields (text, textarea, code, html, rich-text, json) → localized
 *   because they typically hold user-visible copy.
 * - Visual / structural / numeric fields (image, media, color, number,
 *   toggle, select-with-codes, etc.) → shared because they should be
 *   identical across locales by default.
 *
 * Overridable per block instance via `PhotonBlock.localization` and per
 * block-type schema via `PhotonBlockLocalizationSchema`.
 */
const TEXT_LIKE_FIELD_KINDS = new Set<PhotonFieldKind>([
	"text",
	"textarea",
	"rich-text",
	"tags",
]);

export const resolveDefaultPhotonFieldLocalization = (
	kind: PhotonFieldKind,
): PhotonFieldLocalization =>
	TEXT_LIKE_FIELD_KINDS.has(kind) ? "localized" : "shared";

export interface ResolvePhotonBlockFieldLocalizationInput {
	/** Block instance whose `localization` map can override defaults. */
	block: Pick<PhotonBlock, "localization">;
	/**
	 * Optional block-type level schema. Acts as the second priority after
	 * instance overrides. Comes from the block module definition.
	 */
	schema?: PhotonBlockLocalizationSchema;
	/** Path of the field within the block, e.g. "title" or "items.0.label". */
	fieldPath: string;
	/** Kind of the field, used as the lowest-priority default. */
	fieldKind: PhotonFieldKind;
}

/**
 * Resolve effective localization for a single field. Priority:
 *
 *   1. Instance override (`block.localization[fieldPath]`).
 *   2. Block schema (`schema.localized` / `schema.shared`).
 *   3. Kind default (`resolveDefaultPhotonFieldLocalization`).
 */
export const resolvePhotonBlockFieldLocalization = ({
	block,
	schema,
	fieldPath,
	fieldKind,
}: ResolvePhotonBlockFieldLocalizationInput): PhotonFieldLocalization => {
	const override = block.localization?.[fieldPath];
	if (override === "localized" || override === "shared") {
		return override;
	}
	if (schema) {
		if (schema.localized.includes(fieldPath)) return "localized";
		if (schema.shared.includes(fieldPath)) return "shared";
	}
	return resolveDefaultPhotonFieldLocalization(fieldKind);
};

/**
 * Returns true when the resolved value differs from what defaults alone
 * would produce. Useful for inspector decorations that highlight
 * non-default localization choices.
 */
export const isPhotonBlockFieldLocalizationOverridden = ({
	block,
	schema,
	fieldPath,
	fieldKind,
}: ResolvePhotonBlockFieldLocalizationInput): boolean => {
	const override = block.localization?.[fieldPath];
	if (override !== "localized" && override !== "shared") return false;

	const baseline = schema
		? schema.localized.includes(fieldPath)
			? "localized"
			: schema.shared.includes(fieldPath)
				? "shared"
				: resolveDefaultPhotonFieldLocalization(fieldKind)
		: resolveDefaultPhotonFieldLocalization(fieldKind);

	return override !== baseline;
};

/**
 * Toggle the instance-level localization override for a field. If the
 * resulting state matches the schema baseline, the override is cleared
 * (keeps stored data minimal).
 */
export const togglePhotonBlockFieldLocalization = <
	B extends PhotonBlock,
>(
	block: B,
	fieldPath: string,
	fieldKind: PhotonFieldKind,
	schema?: PhotonBlockLocalizationSchema,
): B => {
	const current = resolvePhotonBlockFieldLocalization({
		block,
		schema,
		fieldPath,
		fieldKind,
	});
	const next: PhotonFieldLocalization =
		current === "localized" ? "shared" : "localized";

	const baseline = schema
		? schema.localized.includes(fieldPath)
			? "localized"
			: schema.shared.includes(fieldPath)
				? "shared"
				: resolveDefaultPhotonFieldLocalization(fieldKind)
		: resolveDefaultPhotonFieldLocalization(fieldKind);

	const nextLocalization = { ...(block.localization ?? {}) };
	if (next === baseline) {
		delete nextLocalization[fieldPath];
	} else {
		nextLocalization[fieldPath] = next;
	}

	const cleaned =
		Object.keys(nextLocalization).length === 0 ? undefined : nextLocalization;

	const result: B = {
		...block,
		...(cleaned ? { localization: cleaned } : {}),
	};

	if (!cleaned && "localization" in result) {
		delete (result as { localization?: unknown }).localization;
	}

	return result;
};

/**
 * Explicitly clear an instance-level override (revert to schema/kind default).
 */
export const clearPhotonBlockFieldLocalization = <B extends PhotonBlock>(
	block: B,
	fieldPath: string,
): B => {
	if (!block.localization || !(fieldPath in block.localization)) {
		return block;
	}
	const { [fieldPath]: _removed, ...rest } = block.localization;
	const cleaned = Object.keys(rest).length === 0 ? undefined : rest;

	const result: B = {
		...block,
		...(cleaned ? { localization: cleaned } : {}),
	};
	if (!cleaned && "localization" in result) {
		delete (result as { localization?: unknown }).localization;
	}
	return result;
};
