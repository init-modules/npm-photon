import type { PhotonSiteColorSchemeDefinition } from "../../../types";

export const photonSiteColorSchemes: PhotonSiteColorSchemeDefinition[] =
	[
		{
			id: "midnight-aqua",
			label: "Midnight Aqua",
			appearance: "dark",
			description:
				"Deep navy surfaces with crisp white type and a bright aqua accent.",
			colorTokens: {
				backgroundColor: "#081321",
				surfaceColor: "#0f1b2d",
				textColor: "#f8fbff",
				mutedTextColor: "#94a3b8",
				accentColor: "#14b8a6",
				borderColor: "rgba(148, 163, 184, 0.18)",
			},
		},
		{
			id: "ember-noir",
			label: "Ember Noir",
			appearance: "dark",
			description:
				"Warm charcoal foundations with copper accents for dramatic storytelling.",
			colorTokens: {
				backgroundColor: "#140d0b",
				surfaceColor: "#211613",
				textColor: "#fff7f2",
				mutedTextColor: "#d6b5a2",
				accentColor: "#f97316",
				borderColor: "rgba(249, 115, 22, 0.2)",
			},
		},
		{
			id: "neon-orchid",
			label: "Neon Orchid",
			appearance: "dark",
			description:
				"Inky violet foundations with electric pink highlights and cool supporting text.",
			colorTokens: {
				backgroundColor: "#110a1d",
				surfaceColor: "#1b102c",
				textColor: "#f7f1ff",
				mutedTextColor: "#b6a6d6",
				accentColor: "#f472b6",
				borderColor: "rgba(167, 139, 250, 0.22)",
			},
		},
		{
			id: "paper-sky",
			label: "Paper Sky",
			appearance: "light",
			description:
				"A clean editorial light scheme with cool grays and blue-green emphasis.",
			colorTokens: {
				backgroundColor: "#f5f8fc",
				surfaceColor: "#ffffff",
				textColor: "#0f172a",
				mutedTextColor: "#64748b",
				accentColor: "#0284c7",
				borderColor: "#d8e3ef",
			},
		},
		{
			id: "citrus-punch",
			label: "Citrus Punch",
			appearance: "light",
			description:
				"Sunlit neutrals with energetic coral accents for product-forward layouts.",
			colorTokens: {
				backgroundColor: "#fff9f2",
				surfaceColor: "#fffdf8",
				textColor: "#1f2937",
				mutedTextColor: "#7c6f64",
				accentColor: "#f97316",
				borderColor: "#f3ddcb",
			},
		},
		{
			id: "mint-ledger",
			label: "Mint Ledger",
			appearance: "light",
			description:
				"Soft mint highlights with grounded slate copy for calm, data-friendly surfaces.",
			colorTokens: {
				backgroundColor: "#f4fbf8",
				surfaceColor: "#ffffff",
				textColor: "#102a28",
				mutedTextColor: "#5d7c78",
				accentColor: "#0f766e",
				borderColor: "#d2ebe5",
			},
		},
	];

const siteColorSchemeMap = new Map(
	photonSiteColorSchemes.map((scheme) => [scheme.id, scheme]),
);

export const getPhotonSiteColorScheme = (id: string) =>
	siteColorSchemeMap.get(id);
