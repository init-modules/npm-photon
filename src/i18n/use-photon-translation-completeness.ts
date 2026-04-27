"use client";

import { useCallback, useMemo, useState } from "react";
import { usePhotonStore } from "../context/photon-context";
import {
	computePhotonTranslationCompletenessForLocales,
} from "./translation-completeness-from-registry";
import type { PhotonTranslationCompletenessResult } from "./translation-completeness";

export interface UsePhotonTranslationCompletenessInput {
	/** Editable locales to compute %; usually `editableLocales.map(l => l.code)`. */
	locales: readonly string[];
	/** Locale to compare against for "copied-untranslated" detection. */
	referenceLocale?: string;
	/** Defaults to true. */
	treatCopiedAsMissing?: boolean;
}

export interface UsePhotonTranslationCompletenessResult {
	/** Per-locale completeness result. */
	results: Record<string, PhotonTranslationCompletenessResult>;
	/** Force a recomputation right now (admin-triggered). */
	recompute: () => void;
}

/**
 * Compute translation completeness for the current document, per locale.
 *
 * Memoized by:
 *  - `contentRevision` — every edit invalidates (live updates)
 *  - `locales` join, `referenceLocale`, `treatCopiedAsMissing`
 *
 * Plus an explicit `recomputeToken` that the consumer bumps via the
 * returned `recompute` callback. This is admin-only — do NOT call this hook
 * from the public bundle (the calculator walks the entire document).
 */
export const usePhotonTranslationCompleteness = ({
	locales,
	referenceLocale,
	treatCopiedAsMissing = true,
}: UsePhotonTranslationCompletenessInput): UsePhotonTranslationCompletenessResult => {
	const blocks = usePhotonStore((state) => state.document.blocks);
	const registry = usePhotonStore((state) => state.registry);
	const contentRevision = usePhotonStore((state) => state.contentRevision);
	const [recomputeToken, setRecomputeToken] = useState(0);

	const localesKey = locales.join(",");

	const results = useMemo(
		() =>
			computePhotonTranslationCompletenessForLocales({
				blocks,
				registry,
				locales,
				...(referenceLocale ? { referenceLocale } : {}),
				treatCopiedAsMissing,
			}),
		// blocks reference stays stable while contentRevision is unchanged.
		// recomputeToken forces a refresh from a manual recompute action.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			contentRevision,
			registry,
			localesKey,
			referenceLocale,
			treatCopiedAsMissing,
			recomputeToken,
		],
	);

	const recompute = useCallback(() => {
		setRecomputeToken((token) => token + 1);
	}, []);

	return { results, recompute };
};
