// src/helpers/media.ts
var isWebsiteBuilderMediaValue = (value) => Boolean(
  value && typeof value === "object" && "url" in value && "kind" in value && value.kind === "media" && typeof value.url === "string"
);
var resolveWebsiteBuilderMediaUrl = (value) => {
  if (typeof value === "string") {
    return value;
  }
  if (isWebsiteBuilderMediaValue(value)) {
    return value.url;
  }
  return "";
};
var resolveWebsiteBuilderMediaPreviewUrl = (value) => {
  if (isWebsiteBuilderMediaValue(value)) {
    return value.previewUrl || value.url;
  }
  return resolveWebsiteBuilderMediaUrl(value);
};
var updateWebsiteBuilderMediaUrl = (currentValue, url) => isWebsiteBuilderMediaValue(currentValue) ? {
  ...currentValue,
  url
} : url;

export {
  isWebsiteBuilderMediaValue,
  resolveWebsiteBuilderMediaUrl,
  resolveWebsiteBuilderMediaPreviewUrl,
  updateWebsiteBuilderMediaUrl
};
