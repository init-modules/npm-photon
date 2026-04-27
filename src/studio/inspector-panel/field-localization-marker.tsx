"use client";

import { Languages, TriangleAlert } from "lucide-react";
import type {
	PhotonBlock,
	PhotonBlockLocalizationSchema,
	PhotonFieldKind,
} from "../../types";
import {
	isPhotonBlockFieldLocalizationOverridden,
	resolvePhotonBlockFieldLocalization,
} from "../../i18n/block-localization";

type PhotonFieldLocalizationMarkerProps = {
	block: Pick<PhotonBlock, "localization" | "props">;
	schema?: PhotonBlockLocalizationSchema;
	fieldPath: string;
	fieldKind: PhotonFieldKind;
	/**
	 * Locales currently missing this field's value. When non-empty, the
	 * marker switches to a warn variant and the tooltip lists them.
	 */
	missingLocales?: readonly string[];
	/**
	 * Resolve a display label for a locale code (so the tooltip can show
	 * "EN / RU / DE" instead of raw codes). Falls back to uppercase code.
	 */
	getLocaleLabel?: (code: string) => string | undefined;
};

/**
 * Subtle inline marker that indicates the field is treated as translatable.
 * Renders nothing for "shared" fields. Highlighted slightly when the
 * localization is an explicit instance-level override (i.e., differs from
 * the schema/kind baseline).
 */
export const PhotonFieldLocalizationMarker = ({
	block,
	schema,
	fieldPath,
	fieldKind,
	missingLocales,
	getLocaleLabel,
}: PhotonFieldLocalizationMarkerProps) => {
	const localization = resolvePhotonBlockFieldLocalization({
		block,
		schema,
		fieldPath,
		fieldKind,
	});

	if (localization !== "localized") return null;

	const isOverride = isPhotonBlockFieldLocalizationOverridden({
		block,
		schema,
		fieldPath,
		fieldKind,
	});
	const hasMissing = (missingLocales?.length ?? 0) > 0;

	if (hasMissing && missingLocales) {
		const labels = missingLocales
			.map((code) => getLocaleLabel?.(code) ?? code.toUpperCase())
			.join(", ");
		return (
			<span
				aria-label={`Missing translation in: ${labels}`}
				title={`Missing in: ${labels}`}
				className="inline-flex h-3.5 w-3.5 items-center justify-center text-[color:var(--photon-builder-warning,_#d97706)]"
				data-photon-i18n-marker="missing"
			>
				<TriangleAlert className="h-3 w-3" />
			</span>
		);
	}

	return (
		<span
			aria-label={
				isOverride
					? "Translatable (explicit override)"
					: "Translatable"
			}
			title={
				isOverride
					? "This field is marked translatable on this instance (override)."
					: "This field is translated per locale."
			}
			className="inline-flex h-3.5 w-3.5 items-center justify-center text-[color:var(--photon-builder-text-ghost)]"
			data-photon-i18n-marker={isOverride ? "override" : "default"}
		>
			<Languages className="h-3 w-3" />
		</span>
	);
};
