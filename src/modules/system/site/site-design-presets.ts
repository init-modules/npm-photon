import type { WebsiteBuilderSiteDesignPresetDefinition } from "../../../types";

export const WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID = "aurora-current";

const createMarketingDemoComponentVariants = (variant: string) => ({
	"hero-spotlight": variant,
	"proof-strip": variant,
	"feature-grid": variant,
	"media-frame": variant,
	"media-gallery": variant,
	"rich-text": variant,
	"publication-spotlight": variant,
	"command-center-cta": variant,
	"marketing-demo/hero-spotlight": variant,
	"marketing-demo/proof-strip": variant,
	"marketing-demo/feature-grid": variant,
	"marketing-demo/media-frame": variant,
	"marketing-demo/media-gallery": variant,
	"marketing-demo/rich-text": variant,
	"marketing-demo/publication-spotlight": variant,
	"marketing-demo/command-center-cta": variant,
});

export const websiteBuilderSiteDesignPresets: WebsiteBuilderSiteDesignPresetDefinition[] =
	[
		{
			id: WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID,
			label: "Aurora Current",
			appearance: "dark",
			description:
				"The current shipped look: glossy dark surfaces, roomy spacing, and display-led typography.",
			recommendedColorSchemeId: "midnight-aqua",
			designTokens: {
				bodyFontFamily:
					"var(--font-display, ui-sans-serif), system-ui, sans-serif",
				headingFontFamily:
					"var(--font-display, ui-sans-serif), system-ui, sans-serif",
				siteMaxWidth: "1280px",
				pageGutter: "24px",
				sectionGap: "32px",
				radius: "24px",
				headerOffset: "0px",
			},
			componentVariants: {
				siteShell: "aurora",
				hero: "aurora",
				featureGrid: "aurora",
				testimonials: "aurora",
				cta: "aurora",
				...createMarketingDemoComponentVariants("default"),
			},
		},
		{
			id: "paper-flow",
			label: "Paper Flow",
			appearance: "light",
			description:
				"A frameless editorial landing page with airy spacing, restrained typography, and sections that read as one continuous canvas.",
			recommendedColorSchemeId: "paper-sky",
			designTokens: {
				bodyFontFamily:
					"var(--font-body, 'Avenir Next', ui-sans-serif), system-ui, sans-serif",
				headingFontFamily: "'Iowan Old Style', 'Palatino Linotype', serif",
				siteMaxWidth: "1120px",
				pageGutter: "40px",
				sectionGap: "0px",
				radius: "0px",
				headerOffset: "0px",
			},
			componentVariants: {
				siteShell: "editorial",
				hero: "editorial",
				featureGrid: "stacked",
				testimonials: "quotes",
				cta: "ribbon",
				...createMarketingDemoComponentVariants("air"),
			},
		},
		{
			id: "init-landing",
			label: "Init Landing",
			appearance: "light",
			description:
				"A frameless warm landing layout matching the Init website hero, section rhythm, and neutral-first commercial presentation.",
			designTokens: {
				bodyFontFamily:
					"var(--font-body, 'Geist', ui-sans-serif), system-ui, sans-serif",
				headingFontFamily:
					"var(--font-body, 'Geist', ui-sans-serif), system-ui, sans-serif",
				backgroundColor: "#f8f3ed",
				surfaceColor: "#fffdf9",
				textColor: "#211916",
				mutedTextColor: "#6b5f59",
				accentColor: "#dc1f2f",
				borderColor: "#e6ddd4",
				siteMaxWidth: "1280px",
				pageGutter: "24px",
				sectionGap: "0px",
				radius: "0px",
				headerOffset: "0px",
			},
			componentVariants: {
				siteShell: "editorial",
				hero: "editorial",
				featureGrid: "stacked",
				testimonials: "quotes",
				cta: "ribbon",
				...createMarketingDemoComponentVariants("air"),
			},
		},
	];

const siteDesignPresetMap = new Map(
	websiteBuilderSiteDesignPresets.map((preset) => [preset.id, preset]),
);

export const getWebsiteBuilderSiteDesignPreset = (id: string) =>
	siteDesignPresetMap.get(id);
