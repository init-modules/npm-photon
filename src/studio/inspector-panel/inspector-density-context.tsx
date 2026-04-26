"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

export type PhotonInspectorDensity = "comfortable" | "compact";

/**
 * Spacing/sizing tokens per density mode. Compact mirrors UE5 Details
 * panel (smaller row height, tighter gaps, denser type) without changing
 * the visual identity. Comfortable preserves the current spacing as the
 * default — opt-in via the inspector header toggle.
 */
export type PhotonInspectorDensityTokens = {
	/** Vertical gap between sibling field rows (Tailwind class). */
	rowGap: string;
	/** Padding inside section cards. */
	sectionPadding: string;
	/** Border radius for section cards. */
	sectionRadius: string;
	/** Section title font + tracking. */
	sectionTitleClass: string;
	/** Field label font. */
	fieldLabelClass: string;
	/** Inline gap between label and metadata. */
	labelInlineGap: string;
	/** Bottom margin between header / binding row / control. */
	rowSpacing: string;
};

const COMFORTABLE_TOKENS: PhotonInspectorDensityTokens = {
	rowGap: "space-y-3",
	sectionPadding: "px-4 py-4",
	sectionRadius: "rounded-[24px]",
	sectionTitleClass: "text-[11px] uppercase tracking-[0.28em]",
	fieldLabelClass: "text-sm font-semibold",
	labelInlineGap: "gap-3",
	rowSpacing: "mb-2",
};

const COMPACT_TOKENS: PhotonInspectorDensityTokens = {
	rowGap: "space-y-1.5",
	sectionPadding: "px-3 py-2",
	sectionRadius: "rounded-[14px]",
	sectionTitleClass: "text-[10px] uppercase tracking-[0.22em]",
	fieldLabelClass: "text-xs font-medium",
	labelInlineGap: "gap-2",
	rowSpacing: "mb-1",
};

type PhotonInspectorDensityContextValue = {
	density: PhotonInspectorDensity;
	tokens: PhotonInspectorDensityTokens;
	setDensity: (density: PhotonInspectorDensity) => void;
	toggleDensity: () => void;
};

const PhotonInspectorDensityContext =
	createContext<PhotonInspectorDensityContextValue | null>(null);

const tokensForDensity = (
	density: PhotonInspectorDensity,
): PhotonInspectorDensityTokens =>
	density === "compact" ? COMPACT_TOKENS : COMFORTABLE_TOKENS;

export const PhotonInspectorDensityProvider = ({
	children,
	initialDensity = "comfortable",
}: {
	children: ReactNode;
	initialDensity?: PhotonInspectorDensity;
}) => {
	const [density, setDensity] =
		useState<PhotonInspectorDensity>(initialDensity);
	const toggleDensity = useCallback(() => {
		setDensity((current) =>
			current === "compact" ? "comfortable" : "compact",
		);
	}, []);
	const value = useMemo<PhotonInspectorDensityContextValue>(
		() => ({
			density,
			tokens: tokensForDensity(density),
			setDensity,
			toggleDensity,
		}),
		[density, toggleDensity],
	);
	return (
		<PhotonInspectorDensityContext.Provider value={value}>
			{children}
		</PhotonInspectorDensityContext.Provider>
	);
};

/**
 * Returns density + tokens. Falls back to comfortable when no provider
 * is mounted — keeps existing inspector callers backwards compatible.
 */
export const usePhotonInspectorDensity =
	(): PhotonInspectorDensityContextValue => {
		const context = useContext(PhotonInspectorDensityContext);
		if (context) {
			return context;
		}
		return {
			density: "comfortable",
			tokens: COMFORTABLE_TOKENS,
			setDensity: () => {},
			toggleDensity: () => {},
		};
	};
