"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
} from "react";

/**
 * Inspector visual density.
 *
 * Photon's inspector follows Unreal Engine's Details panel as a north
 * star: every row is a single line with a fixed-width label gutter on
 * the left and a tightly-packed control on the right. Sections are
 * caret-folded headers, not card-style boxes. There is exactly one
 * density — `compact` — and it is the only configuration we ship.
 */
export type PhotonInspectorDensity = "compact";

export type PhotonInspectorDensityTokens = {
	/** Vertical gap between sibling field rows (Tailwind class). */
	rowGap: string;
	/** Padding inside section bodies. */
	sectionPadding: string;
	/** Padding for inspector header chrome. */
	headerPadding: string;
	/** Border radius for section bodies — kept tight, no card-style rounding. */
	sectionRadius: string;
	/** Section header (caret + uppercase tag) classes. */
	sectionHeaderClass: string;
	/** Field label font (left gutter). */
	fieldLabelClass: string;
	/** Bottom margin between header / binding row / control. */
	rowSpacing: string;
	/** Width of the left label gutter, used by single-line rows. */
	labelGutterWidth: string;
	/** Min row height — keeps single-line rows visually aligned. */
	rowMinHeight: string;
	/** Tab pill base class (block / page / trigger). */
	tabClass: string;
	/** Standard inline input class for inspector controls. */
	inputClass: string;
	/** Block-detail subtitle (palette card). */
	subtitleClass: string;
};

const COMPACT_TOKENS: PhotonInspectorDensityTokens = {
	rowGap: "space-y-0.5",
	sectionPadding: "px-1.5 pb-1.5",
	headerPadding: "px-2.5 py-1.5",
	sectionRadius: "rounded-[3px]",
	sectionHeaderClass:
		"text-[10px] font-semibold uppercase tracking-[0.16em] leading-tight",
	fieldLabelClass:
		"text-[11px] font-medium leading-tight tabular-nums",
	rowSpacing: "",
	labelGutterWidth: "min-w-[112px] max-w-[112px]",
	rowMinHeight: "min-h-[24px]",
	tabClass:
		"cursor-pointer rounded-sm px-2 py-0.5 text-[11px] font-semibold transition leading-tight",
	// Inputs use a darker recess instead of a visible border: the section
	// background is already a tone lighter, so the deeper `field` swatch alone
	// chambers the input. A 1px ring of the same colour keeps focus state
	// crisp without painting a permanent white-ish outline.
	inputClass:
		"h-6 w-full min-w-0 rounded-sm bg-[color:var(--photon-builder-field)] px-1.5 text-[11px] leading-tight outline-none ring-1 ring-transparent transition-[box-shadow] focus:ring-[color:var(--photon-builder-border-strong)] tabular-nums",
	subtitleClass: "text-[13px] font-semibold leading-tight",
};

type PhotonInspectorDensityContextValue = {
	density: PhotonInspectorDensity;
	tokens: PhotonInspectorDensityTokens;
};

const PhotonInspectorDensityContext =
	createContext<PhotonInspectorDensityContextValue | null>(null);

export const PhotonInspectorDensityProvider = ({
	children,
}: {
	children: ReactNode;
	/**
	 * @deprecated Density is fixed to `compact`. Argument is kept for
	 * backwards compatibility with previously-saved call sites; the
	 * provided value is ignored.
	 */
	initialDensity?: PhotonInspectorDensity;
}) => {
	const value = useMemo<PhotonInspectorDensityContextValue>(
		() => ({
			density: "compact",
			tokens: COMPACT_TOKENS,
		}),
		[],
	);
	return (
		<PhotonInspectorDensityContext.Provider value={value}>
			{children}
		</PhotonInspectorDensityContext.Provider>
	);
};

/**
 * Returns density + tokens. Falls back to compact tokens when no
 * provider is mounted so isolated test harnesses keep rendering.
 */
export const usePhotonInspectorDensity =
	(): PhotonInspectorDensityContextValue => {
		const context = useContext(PhotonInspectorDensityContext);
		if (context) {
			return context;
		}
		return {
			density: "compact",
			tokens: COMPACT_TOKENS,
		};
	};
