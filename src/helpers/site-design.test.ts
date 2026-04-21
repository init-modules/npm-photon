import assert from "node:assert/strict";
import test from "node:test";
import { getWebsiteBuilderSiteColorScheme } from "../modules/system/site/site-color-schemes";
import { getWebsiteBuilderSiteDesignPreset } from "../modules/system/site/site-design-presets";
import {
	applyWebsiteBuilderSiteColorScheme,
	applyWebsiteBuilderSiteDesignPreset,
	createWebsiteBuilderSiteDesignSettings,
	hasWebsiteBuilderSiteDesignPresetCustomization,
	isWebsiteBuilderSiteDesignPresetApplied,
	resolveWebsiteBuilderSiteDesignSettings,
} from "./site-design";

test("fallback flat defaults resolve without forcing the new preset metadata", () => {
	const resolved = resolveWebsiteBuilderSiteDesignSettings({
		bodyFontFamily: "ui-sans-serif, system-ui, sans-serif",
		headingFontFamily: "ui-sans-serif, system-ui, sans-serif",
		backgroundColor: "#f8fafc",
		surfaceColor: "#ffffff",
		textColor: "#0f172a",
		mutedTextColor: "#64748b",
		accentColor: "#0f766e",
		borderColor: "#dbe4ee",
		siteMaxWidth: "1280px",
		pageGutter: "24px",
		sectionGap: "32px",
		radius: "24px",
		headerOffset: "0px",
	});

	assert.equal(resolved.backgroundColor, "#f8fafc");
	assert.equal(resolved.surfaceColor, "#ffffff");
	assert.equal(resolved.textColor, "#0f172a");
	assert.equal(resolved.presetId, undefined);
	assert.equal(resolved.colorSchemeId, undefined);
	assert.deepEqual(resolved.componentVariants, {});
});

test("applying a preset replaces preset-owned variants while preserving unrelated custom keys", () => {
	const applied = applyWebsiteBuilderSiteDesignPreset(
		{
			...createWebsiteBuilderSiteDesignSettings({
				presetId: "aurora-current",
				colorSchemeId: "midnight-aqua",
			}),
			componentVariants: {
				hero: "legacy-hero",
				cta: "legacy-cta",
				customBlock: "keep-me",
			},
		},
		"paper-flow",
	);
	const preset = getWebsiteBuilderSiteDesignPreset("paper-flow");
	const recommendedScheme = getWebsiteBuilderSiteColorScheme(
		preset?.recommendedColorSchemeId ?? "",
	);

	assert.equal(applied.presetId, "paper-flow");
	assert.equal(applied.colorSchemeId, "paper-sky");
	assert.equal(applied.bodyFontFamily, preset?.designTokens.bodyFontFamily);
	assert.equal(
		applied.headingFontFamily,
		preset?.designTokens.headingFontFamily,
	);
	assert.equal(applied.siteMaxWidth, preset?.designTokens.siteMaxWidth);
	assert.equal(
		applied.backgroundColor,
		recommendedScheme?.colorTokens.backgroundColor,
	);
	assert.equal(
		applied.surfaceColor,
		recommendedScheme?.colorTokens.surfaceColor,
	);
	assert.equal(applied.textColor, recommendedScheme?.colorTokens.textColor);
	assert.equal(applied.componentVariants.hero, "editorial");
	assert.equal(applied.componentVariants.cta, "ribbon");
	assert.equal(applied.componentVariants.customBlock, "keep-me");
	assert.equal(
		applied.componentVariants["marketing-demo/hero-spotlight"],
		"air",
	);
});

test("remaining flow presets publish their linked scheme and full marketing-demo variant family", () => {
	const paperFlow = getWebsiteBuilderSiteDesignPreset("paper-flow");
	const initLanding = getWebsiteBuilderSiteDesignPreset("init-landing");

	assert.equal(paperFlow?.appearance, "light");
	assert.equal(paperFlow?.recommendedColorSchemeId, "paper-sky");
	assert.equal(
		paperFlow?.componentVariants["marketing-demo/hero-spotlight"],
		"air",
	);
	assert.equal(initLanding?.appearance, "light");
	assert.equal(initLanding?.recommendedColorSchemeId, undefined);
	assert.equal(
		initLanding?.componentVariants["marketing-demo/hero-spotlight"],
		"air",
	);
});

test("creating preset-backed settings without an explicit scheme uses the preset recommendation", () => {
	const paperFlow = createWebsiteBuilderSiteDesignSettings({
		presetId: "paper-flow",
	});
	const initLanding = createWebsiteBuilderSiteDesignSettings({
		presetId: "init-landing",
	});

	assert.equal(paperFlow.presetId, "paper-flow");
	assert.equal(paperFlow.colorSchemeId, "paper-sky");
	assert.equal(
		paperFlow.componentVariants["marketing-demo/feature-grid"],
		"air",
	);
	assert.equal(initLanding.presetId, "init-landing");
	assert.equal(initLanding.colorSchemeId, undefined);
	assert.equal(
		initLanding.componentVariants["marketing-demo/feature-grid"],
		"air",
	);
});

test("applying a color scheme changes only color tokens and keeps the active preset structure", () => {
	const base = createWebsiteBuilderSiteDesignSettings({
		presetId: "aurora-current",
		colorSchemeId: "midnight-aqua",
	});
	const applied = applyWebsiteBuilderSiteColorScheme(base, "mint-ledger");
	const scheme = getWebsiteBuilderSiteColorScheme("mint-ledger");

	assert.equal(applied.presetId, "aurora-current");
	assert.equal(applied.colorSchemeId, "mint-ledger");
	assert.equal(applied.siteMaxWidth, base.siteMaxWidth);
	assert.equal(applied.radius, base.radius);
	assert.deepEqual(applied.componentVariants, base.componentVariants);
	assert.equal(applied.backgroundColor, scheme?.colorTokens.backgroundColor);
	assert.equal(applied.surfaceColor, scheme?.colorTokens.surfaceColor);
	assert.equal(applied.textColor, scheme?.colorTokens.textColor);
	assert.equal(applied.accentColor, scheme?.colorTokens.accentColor);
});

test("switching only the color scheme keeps the preset selected but marks it customized", () => {
	const appliedPreset = applyWebsiteBuilderSiteDesignPreset({}, "paper-flow");
	const customizedPalette = applyWebsiteBuilderSiteColorScheme(
		appliedPreset,
		"mint-ledger",
	);

	assert.equal(customizedPalette.presetId, "paper-flow");
	assert.equal(customizedPalette.colorSchemeId, "mint-ledger");
	assert.equal(
		customizedPalette.componentVariants["marketing-demo/hero-spotlight"],
		"air",
	);
	assert.equal(
		isWebsiteBuilderSiteDesignPresetApplied(customizedPalette, "paper-flow"),
		false,
	);
	assert.equal(
		hasWebsiteBuilderSiteDesignPresetCustomization(
			customizedPalette,
			"paper-flow",
		),
		true,
	);
});
