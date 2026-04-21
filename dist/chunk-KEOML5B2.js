// src/modules/system/site/site-color-schemes.ts
var websiteBuilderSiteColorSchemes = [
  {
    id: "midnight-aqua",
    label: "Midnight Aqua",
    appearance: "dark",
    description: "Deep navy surfaces with crisp white type and a bright aqua accent.",
    colorTokens: {
      backgroundColor: "#081321",
      surfaceColor: "#0f1b2d",
      textColor: "#f8fbff",
      mutedTextColor: "#94a3b8",
      accentColor: "#14b8a6",
      borderColor: "rgba(148, 163, 184, 0.18)"
    }
  },
  {
    id: "ember-noir",
    label: "Ember Noir",
    appearance: "dark",
    description: "Warm charcoal foundations with copper accents for dramatic storytelling.",
    colorTokens: {
      backgroundColor: "#140d0b",
      surfaceColor: "#211613",
      textColor: "#fff7f2",
      mutedTextColor: "#d6b5a2",
      accentColor: "#f97316",
      borderColor: "rgba(249, 115, 22, 0.2)"
    }
  },
  {
    id: "neon-orchid",
    label: "Neon Orchid",
    appearance: "dark",
    description: "Inky violet foundations with electric pink highlights and cool supporting text.",
    colorTokens: {
      backgroundColor: "#110a1d",
      surfaceColor: "#1b102c",
      textColor: "#f7f1ff",
      mutedTextColor: "#b6a6d6",
      accentColor: "#f472b6",
      borderColor: "rgba(167, 139, 250, 0.22)"
    }
  },
  {
    id: "paper-sky",
    label: "Paper Sky",
    appearance: "light",
    description: "A clean editorial light scheme with cool grays and blue-green emphasis.",
    colorTokens: {
      backgroundColor: "#f5f8fc",
      surfaceColor: "#ffffff",
      textColor: "#0f172a",
      mutedTextColor: "#64748b",
      accentColor: "#0284c7",
      borderColor: "#d8e3ef"
    }
  },
  {
    id: "citrus-punch",
    label: "Citrus Punch",
    appearance: "light",
    description: "Sunlit neutrals with energetic coral accents for product-forward layouts.",
    colorTokens: {
      backgroundColor: "#fff9f2",
      surfaceColor: "#fffdf8",
      textColor: "#1f2937",
      mutedTextColor: "#7c6f64",
      accentColor: "#f97316",
      borderColor: "#f3ddcb"
    }
  },
  {
    id: "mint-ledger",
    label: "Mint Ledger",
    appearance: "light",
    description: "Soft mint highlights with grounded slate copy for calm, data-friendly surfaces.",
    colorTokens: {
      backgroundColor: "#f4fbf8",
      surfaceColor: "#ffffff",
      textColor: "#102a28",
      mutedTextColor: "#5d7c78",
      accentColor: "#0f766e",
      borderColor: "#d2ebe5"
    }
  }
];
var siteColorSchemeMap = new Map(
  websiteBuilderSiteColorSchemes.map((scheme) => [scheme.id, scheme])
);
var getWebsiteBuilderSiteColorScheme = (id) => siteColorSchemeMap.get(id);

// src/modules/system/site/site-design-presets.ts
var WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID = "aurora-current";
var createMarketingDemoComponentVariants = (variant) => ({
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
  "marketing-demo/command-center-cta": variant
});
var websiteBuilderSiteDesignPresets = [
  {
    id: WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID,
    label: "Aurora Current",
    appearance: "dark",
    description: "The current shipped look: glossy dark surfaces, roomy spacing, and display-led typography.",
    recommendedColorSchemeId: "midnight-aqua",
    designTokens: {
      bodyFontFamily: "var(--font-display, ui-sans-serif), system-ui, sans-serif",
      headingFontFamily: "var(--font-display, ui-sans-serif), system-ui, sans-serif",
      siteMaxWidth: "1280px",
      pageGutter: "24px",
      sectionGap: "32px",
      radius: "24px",
      headerOffset: "0px"
    },
    componentVariants: {
      siteShell: "aurora",
      hero: "aurora",
      featureGrid: "aurora",
      testimonials: "aurora",
      cta: "aurora",
      ...createMarketingDemoComponentVariants("default")
    }
  },
  {
    id: "paper-flow",
    label: "Paper Flow",
    appearance: "light",
    description: "A frameless editorial landing page with airy spacing, restrained typography, and sections that read as one continuous canvas.",
    recommendedColorSchemeId: "paper-sky",
    designTokens: {
      bodyFontFamily: "var(--font-body, 'Avenir Next', ui-sans-serif), system-ui, sans-serif",
      headingFontFamily: "'Iowan Old Style', 'Palatino Linotype', serif",
      siteMaxWidth: "1120px",
      pageGutter: "40px",
      sectionGap: "0px",
      radius: "0px",
      headerOffset: "0px"
    },
    componentVariants: {
      siteShell: "editorial",
      hero: "editorial",
      featureGrid: "stacked",
      testimonials: "quotes",
      cta: "ribbon",
      ...createMarketingDemoComponentVariants("air")
    }
  },
  {
    id: "init-landing",
    label: "Init Landing",
    appearance: "light",
    description: "A frameless warm landing layout matching the Init website hero, section rhythm, and neutral-first commercial presentation.",
    designTokens: {
      bodyFontFamily: "var(--font-body, 'Geist', ui-sans-serif), system-ui, sans-serif",
      headingFontFamily: "var(--font-body, 'Geist', ui-sans-serif), system-ui, sans-serif",
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
      headerOffset: "0px"
    },
    componentVariants: {
      siteShell: "editorial",
      hero: "editorial",
      featureGrid: "stacked",
      testimonials: "quotes",
      cta: "ribbon",
      ...createMarketingDemoComponentVariants("air")
    }
  }
];
var siteDesignPresetMap = new Map(
  websiteBuilderSiteDesignPresets.map((preset) => [preset.id, preset])
);
var getWebsiteBuilderSiteDesignPreset = (id) => siteDesignPresetMap.get(id);

// src/helpers/site-design.ts
var WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS = [
  "bodyFontFamily",
  "headingFontFamily",
  "backgroundColor",
  "surfaceColor",
  "textColor",
  "mutedTextColor",
  "accentColor",
  "borderColor",
  "siteMaxWidth",
  "pageGutter",
  "sectionGap",
  "radius",
  "headerOffset"
];
var WEBSITE_BUILDER_SITE_DESIGN_COLOR_TOKEN_KEYS = [
  "backgroundColor",
  "surfaceColor",
  "textColor",
  "mutedTextColor",
  "accentColor",
  "borderColor"
];
var WEBSITE_BUILDER_FRAMELESS_PRESET_IDS = /* @__PURE__ */ new Set([
  "paper-flow",
  "init-landing"
]);
var WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS = {
  bodyFontFamily: "var(--font-display, ui-sans-serif), system-ui, sans-serif",
  headingFontFamily: "var(--font-display, ui-sans-serif), system-ui, sans-serif",
  backgroundColor: "#081321",
  surfaceColor: "#0f1b2d",
  textColor: "#f8fbff",
  mutedTextColor: "#94a3b8",
  accentColor: "#14b8a6",
  borderColor: "rgba(148, 163, 184, 0.18)",
  siteMaxWidth: "1280px",
  pageGutter: "24px",
  sectionGap: "32px",
  radius: "24px",
  headerOffset: "0px"
};
var WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS = {
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
  headerOffset: "0px"
};
var asSiteDesignCandidate = (value) => typeof value === "object" && value !== null ? value : {};
var readNonEmptyString = (value) => typeof value === "string" && value.trim() !== "" ? value : void 0;
var matchesWebsiteBuilderSiteDesignDefaults = (left, right) => WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS.every(
  (key) => left[key] === right[key]
);
var hasAnyTokenOverride = (candidate, keys) => keys.some((key) => readNonEmptyString(candidate[key]) !== void 0);
var readTokenOverrides = (candidate, keys) => keys.reduce((result, key) => {
  const value = readNonEmptyString(candidate[key]);
  if (value !== void 0) {
    result[key] = value;
  }
  return result;
}, {});
var normalizeComponentVariants = (value) => {
  if (typeof value !== "object" || value === null) {
    return {};
  }
  return Object.entries(
    value
  ).reduce(
    (result, [key, candidateValue]) => {
      const normalizedValue = readNonEmptyString(candidateValue);
      if (key.trim() !== "" && normalizedValue !== void 0) {
        result[key] = normalizedValue;
      }
      return result;
    },
    {}
  );
};
var pickSiteDesignTokens = (value) => WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS.reduce(
  (result, key) => {
    result[key] = value[key];
    return result;
  },
  { ...WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS }
);
var createResolvedSettings = ({
  presetId,
  colorSchemeId,
  componentVariants,
  tokenOverrides
}) => {
  const preset = presetId ? getWebsiteBuilderSiteDesignPreset(presetId) : void 0;
  const colorScheme = colorSchemeId ? getWebsiteBuilderSiteColorScheme(colorSchemeId) : void 0;
  return {
    ...WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS,
    ...preset?.designTokens ?? {},
    ...colorScheme?.colorTokens ?? {},
    ...tokenOverrides ?? {},
    presetId: preset?.id,
    colorSchemeId: colorScheme?.id,
    componentVariants: {
      ...preset?.componentVariants ?? {},
      ...componentVariants ?? {}
    }
  };
};
var createFallbackResolvedSettings = ({
  componentVariants,
  tokenOverrides
} = {}) => createResolvedSettings({
  componentVariants,
  tokenOverrides: {
    ...WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS,
    ...tokenOverrides ?? {}
  }
});
var createWebsiteBuilderSiteDesignSettings = ({
  presetId,
  colorSchemeId,
  componentVariants,
  overrides
} = {}) => {
  const preset = presetId ? getWebsiteBuilderSiteDesignPreset(presetId) : void 0;
  return createResolvedSettings({
    presetId: preset?.id,
    colorSchemeId: colorSchemeId ?? preset?.recommendedColorSchemeId,
    componentVariants,
    tokenOverrides: overrides
  });
};
var isWebsiteBuilderFramelessPreset = (presetId) => typeof presetId === "string" && WEBSITE_BUILDER_FRAMELESS_PRESET_IDS.has(presetId);
var isWebsiteBuilderFramelessSiteDesign = (value) => isWebsiteBuilderFramelessPreset(
  resolveWebsiteBuilderSiteDesignSettings(value).presetId
);
var applyWebsiteBuilderSiteDesignPreset = (value, presetId) => {
  const currentSettings = resolveWebsiteBuilderSiteDesignSettings(value);
  const preset = getWebsiteBuilderSiteDesignPreset(presetId);
  const resolvedColorSchemeId = preset?.recommendedColorSchemeId ?? currentSettings.colorSchemeId;
  const rawComponentVariants = normalizeComponentVariants(
    asSiteDesignCandidate(value).componentVariants
  );
  const presetVariantKeys = new Set(
    Object.keys(preset?.componentVariants ?? {})
  );
  const preservedCustomVariants = Object.fromEntries(
    Object.entries(rawComponentVariants).filter(
      ([key]) => !presetVariantKeys.has(key)
    )
  );
  return createResolvedSettings({
    presetId: preset?.id ?? currentSettings.presetId,
    colorSchemeId: resolvedColorSchemeId,
    componentVariants: {
      ...preservedCustomVariants,
      ...preset?.componentVariants ?? {}
    }
  });
};
var isWebsiteBuilderSiteDesignPresetApplied = (settings, presetId) => {
  const preset = getWebsiteBuilderSiteDesignPreset(presetId);
  if (!preset) {
    return false;
  }
  const tokenMatches = Object.entries(preset.designTokens).every(
    ([key, value]) => settings[key] === value
  );
  const variantMatches = Object.entries(preset.componentVariants).every(
    ([key, value]) => settings.componentVariants[key] === value
  );
  const recommendedSchemeMatches = settings.colorSchemeId === preset.recommendedColorSchemeId;
  return tokenMatches && variantMatches && recommendedSchemeMatches;
};
var hasWebsiteBuilderSiteDesignPresetCustomization = (settings, presetId) => {
  const preset = getWebsiteBuilderSiteDesignPreset(presetId);
  return settings.presetId === preset?.id && !isWebsiteBuilderSiteDesignPresetApplied(settings, presetId);
};
var applyWebsiteBuilderSiteColorScheme = (value, colorSchemeId) => {
  const currentSettings = resolveWebsiteBuilderSiteDesignSettings(value);
  const colorScheme = getWebsiteBuilderSiteColorScheme(colorSchemeId);
  return createResolvedSettings({
    presetId: currentSettings.presetId,
    colorSchemeId: colorScheme?.id ?? currentSettings.colorSchemeId,
    componentVariants: currentSettings.componentVariants,
    tokenOverrides: {
      ...pickSiteDesignTokens(currentSettings),
      ...colorScheme?.colorTokens ?? {}
    }
  });
};
var resolveWebsiteBuilderSiteDesignSettings = (value) => {
  const candidate = asSiteDesignCandidate(value);
  const presetId = readNonEmptyString(candidate.presetId);
  const colorSchemeId = readNonEmptyString(candidate.colorSchemeId);
  const tokenOverrides = readTokenOverrides(
    candidate,
    WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS
  );
  const tokenOverrideSettings = {
    ...WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS,
    ...tokenOverrides
  };
  const componentVariants = normalizeComponentVariants(
    candidate.componentVariants
  );
  const hasTokenOverrides = hasAnyTokenOverride(
    candidate,
    WEBSITE_BUILDER_SITE_DESIGN_TOKEN_KEYS
  );
  const hasColorOverrides = hasAnyTokenOverride(
    candidate,
    WEBSITE_BUILDER_SITE_DESIGN_COLOR_TOKEN_KEYS
  );
  const hasComponentVariantOverrides = Object.keys(componentVariants).length > 0;
  const explicitPreset = presetId ? getWebsiteBuilderSiteDesignPreset(presetId) : void 0;
  const explicitColorScheme = colorSchemeId ? getWebsiteBuilderSiteColorScheme(colorSchemeId) : void 0;
  const isFallbackDesign = !explicitPreset && !explicitColorScheme && !hasComponentVariantOverrides && matchesWebsiteBuilderSiteDesignDefaults(
    tokenOverrideSettings,
    WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS
  );
  if (isFallbackDesign) {
    return createFallbackResolvedSettings({
      tokenOverrides
    });
  }
  return createResolvedSettings({
    presetId: explicitPreset?.id,
    colorSchemeId: explicitColorScheme?.id ?? explicitPreset?.recommendedColorSchemeId,
    componentVariants,
    tokenOverrides
  });
};

export {
  websiteBuilderSiteColorSchemes,
  getWebsiteBuilderSiteColorScheme,
  WEBSITE_BUILDER_DEFAULT_SITE_DESIGN_PRESET_ID,
  websiteBuilderSiteDesignPresets,
  getWebsiteBuilderSiteDesignPreset,
  WEBSITE_BUILDER_SITE_DESIGN_DEFAULTS,
  WEBSITE_BUILDER_SITE_DESIGN_FALLBACK_DEFAULTS,
  createWebsiteBuilderSiteDesignSettings,
  isWebsiteBuilderFramelessPreset,
  isWebsiteBuilderFramelessSiteDesign,
  applyWebsiteBuilderSiteDesignPreset,
  isWebsiteBuilderSiteDesignPresetApplied,
  hasWebsiteBuilderSiteDesignPresetCustomization,
  applyWebsiteBuilderSiteColorScheme,
  resolveWebsiteBuilderSiteDesignSettings
};
