// src/helpers/surface-layout.ts
var getWebsiteBuilderSurfaceModeStyle = (mode) => {
  switch (mode) {
    case "bleed":
      return {
        marginInline: "calc(50% - 50cqw)",
        paddingInline: "max(calc((100cqw - var(--wb-site-max-width, 1280px)) / 2), var(--wb-site-gutter, 24px))"
      };
    case "full-viewport":
      return {
        marginInline: "calc(50% - 50cqw)"
      };
    case "contained":
    case "fixed-shell":
    default:
      return void 0;
  }
};

export {
  getWebsiteBuilderSurfaceModeStyle
};
