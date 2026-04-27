import type {
	PhotonBlock,
	PhotonRegistry,
} from "../types";
import {
	computePhotonTranslationCompleteness,
	type PhotonBlockSchemaMap,
	type PhotonTranslationCompletenessResult,
} from "./translation-completeness";

/**
 * Walk every block (including nested area blocks) and assemble a
 * `PhotonBlockSchemaMap` keyed by `block.type` from the registered block
 * definitions. Only entries actually present in `blocks` are included, so
 * callers don't pay for definitions they don't use.
 *
 * Note: the registry stores definitions keyed by `${module}::${type}` to
 * avoid module collisions. This map keys by `block.type` only because the
 * pure calculator looks up that way; if two modules ship the same block
 * type, the LAST visited block wins for that type. In practice block types
 * are globally unique within a Photon app.
 */
export const buildPhotonBlockSchemaMapForBlocks = (
	blocks: readonly PhotonBlock[],
	registry: PhotonRegistry,
): PhotonBlockSchemaMap => {
	const schemas: PhotonBlockSchemaMap = {};

	const visit = (block: PhotonBlock) => {
		const definition = registry.getDefinition(block.module, block.type);
		if (definition) {
			schemas[block.type] = {
				fields: definition.fields,
				...(definition.localizationSchema
					? { localization: definition.localizationSchema }
					: {}),
			};
		}
		if (block.areas) {
			for (const area of block.areas) {
				for (const child of area.blocks) visit(child);
			}
		}
	};

	for (const block of blocks) visit(block);
	return schemas;
};

export interface ComputePhotonTranslationCompletenessFromRegistryInput {
	blocks: readonly PhotonBlock[];
	registry: PhotonRegistry;
	locale: string;
	treatCopiedAsMissing?: boolean;
	referenceLocale?: string;
}

/**
 * Convenience wrapper: assemble the schema map from the registry, then
 * delegate to the pure `computePhotonTranslationCompleteness`. Use this in
 * client code where the registry is available.
 */
export const computePhotonTranslationCompletenessFromRegistry = ({
	blocks,
	registry,
	locale,
	treatCopiedAsMissing,
	referenceLocale,
}: ComputePhotonTranslationCompletenessFromRegistryInput): PhotonTranslationCompletenessResult => {
	const schemas = buildPhotonBlockSchemaMapForBlocks(blocks, registry);
	return computePhotonTranslationCompleteness({
		blocks,
		schemas,
		locale,
		...(treatCopiedAsMissing !== undefined ? { treatCopiedAsMissing } : {}),
		...(referenceLocale !== undefined ? { referenceLocale } : {}),
	});
};

/**
 * Compute completeness for many locales at once (one call iterates blocks
 * once per locale, but assembles the schema map only once). Used by the
 * top-panel content-locale switcher to display per-locale percentages.
 */
export const computePhotonTranslationCompletenessForLocales = ({
	blocks,
	registry,
	locales,
	referenceLocale,
	treatCopiedAsMissing,
}: {
	blocks: readonly PhotonBlock[];
	registry: PhotonRegistry;
	locales: readonly string[];
	referenceLocale?: string;
	treatCopiedAsMissing?: boolean;
}): Record<string, PhotonTranslationCompletenessResult> => {
	const schemas = buildPhotonBlockSchemaMapForBlocks(blocks, registry);
	const result: Record<string, PhotonTranslationCompletenessResult> = {};
	for (const locale of locales) {
		result[locale] = computePhotonTranslationCompleteness({
			blocks,
			schemas,
			locale,
			...(treatCopiedAsMissing !== undefined ? { treatCopiedAsMissing } : {}),
			...(referenceLocale !== undefined ? { referenceLocale } : {}),
		});
	}
	return result;
};
