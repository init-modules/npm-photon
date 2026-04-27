import type {
	PhotonBlock,
	PhotonField,
	PhotonLocalizedDefaultValue,
} from "../types";
import { resolvePhotonBlockFieldLocalization } from "./block-localization";
import type { PhotonBlockSchemaMap } from "./translation-completeness";

const isLocalizedDefault = (
	value: unknown,
): value is PhotonLocalizedDefaultValue =>
	typeof value === "object" &&
	value !== null &&
	(value as { __wbLocalizedDefault?: boolean }).__wbLocalizedDefault === true;

const setPath = (
	source: Record<string, unknown>,
	path: string,
	value: unknown,
): Record<string, unknown> => {
	const segments = path.split(".");
	const out: Record<string, unknown> = { ...source };
	let cursor: Record<string, unknown> = out;
	for (let i = 0; i < segments.length - 1; i += 1) {
		const segment = segments[i];
		const next = cursor[segment];
		if (typeof next === "object" && next !== null && !Array.isArray(next)) {
			const cloned = { ...(next as Record<string, unknown>) };
			cursor[segment] = cloned;
			cursor = cloned;
		} else if (Array.isArray(next)) {
			const cloned = next.slice();
			cursor[segment] = cloned;
			cursor = cloned as unknown as Record<string, unknown>;
		} else {
			const cloned: Record<string, unknown> = {};
			cursor[segment] = cloned;
			cursor = cloned;
		}
	}
	cursor[segments[segments.length - 1]] = value;
	return out;
};

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

const setLocalizedFieldValue = (
	props: Record<string, unknown>,
	fieldPath: string,
	locale: string,
	value: unknown,
): Record<string, unknown> => {
	const current = readPath(props, fieldPath);
	if (isLocalizedDefault(current)) {
		const nextValues = { ...current.values, [locale]: value };
		const nextLocalized: PhotonLocalizedDefaultValue = {
			__wbLocalizedDefault: true,
			values: nextValues,
		};
		return setPath(props, fieldPath, nextLocalized);
	}
	const nextLocalized: PhotonLocalizedDefaultValue = {
		__wbLocalizedDefault: true,
		values: { [locale]: value },
	};
	return setPath(props, fieldPath, nextLocalized);
};

export interface CopyPhotonLocaleContentInput {
	blocks: readonly PhotonBlock[];
	schemas: PhotonBlockSchemaMap;
	sourceLocale: string;
	targetLocale: string;
	/**
	 * - "clone": overwrite all localized values in `targetLocale` with
	 *   `sourceLocale`'s values, even if target already had data.
	 * - "merge": only fill in fields whose target value is empty/undefined.
	 *
	 * Default `merge` — preserves any in-progress translation work.
	 */
	mode?: "clone" | "merge";
}

const isEmptyValue = (value: unknown): boolean => {
	if (value === null || value === undefined) return true;
	if (typeof value === "string") return value.trim() === "";
	if (Array.isArray(value)) return value.length === 0;
	if (typeof value === "object") return Object.keys(value).length === 0;
	return false;
};

const readSourceValue = (
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

/**
 * Returns the locale-specific value for `locale`. Crucially, raw (non-
 * localized) field values are treated as `undefined` — they do not count as
 * a target-locale entry, so merge mode will still upgrade them.
 */
const readTargetEntry = (
	block: PhotonBlock,
	fieldPath: string,
	locale: string,
): unknown => {
	const raw = readPath(block.props, fieldPath);
	if (isLocalizedDefault(raw)) {
		return raw.values?.[locale];
	}
	return undefined;
};

/**
 * Returns a deep-copied list of blocks where translatable fields in
 * `targetLocale` are filled from `sourceLocale` according to `mode`.
 *
 * - Walks nested `areas[*].blocks`.
 * - Only touches fields whose effective localization is "localized" (per
 *   `resolvePhotonBlockFieldLocalization`); shared fields are untouched.
 * - When source value is missing, target value is left as is.
 */
export const copyPhotonLocaleContent = ({
	blocks,
	schemas,
	sourceLocale,
	targetLocale,
	mode = "merge",
}: CopyPhotonLocaleContentInput): PhotonBlock[] => {
	const visit = (block: PhotonBlock): PhotonBlock => {
		const schema = schemas[block.type];
		let nextProps: Record<string, unknown> = block.props as Record<
			string,
			unknown
		>;

		if (schema) {
			for (const field of schema.fields as readonly PhotonField[]) {
				const localization = resolvePhotonBlockFieldLocalization({
					block,
					schema: schema.localization,
					fieldPath: field.path,
					fieldKind: field.kind,
				});
				if (localization !== "localized") continue;

				const sourceValue = readSourceValue(
					block,
					field.path,
					sourceLocale,
				);
				if (sourceValue === undefined) continue;

				const targetValue = readTargetEntry(
					block,
					field.path,
					targetLocale,
				);
				const shouldWrite =
					mode === "clone" || isEmptyValue(targetValue);

				if (shouldWrite) {
					nextProps = setLocalizedFieldValue(
						nextProps,
						field.path,
						targetLocale,
						sourceValue,
					);
				}
			}
		}

		const nextAreas = block.areas?.map((area) => ({
			...area,
			blocks: area.blocks.map(visit),
		}));

		return {
			...block,
			props: nextProps,
			...(nextAreas ? { areas: nextAreas } : {}),
		};
	};

	return blocks.map(visit);
};

/**
 * Copy a single block's translatable fields. Returned block is a new object;
 * input is not mutated. Useful for the inspector context-menu action.
 */
export const copyPhotonBlockLocaleContent = (
	block: PhotonBlock,
	options: Omit<CopyPhotonLocaleContentInput, "blocks">,
): PhotonBlock => copyPhotonLocaleContent({ ...options, blocks: [block] })[0];
