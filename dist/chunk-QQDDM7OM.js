// src/helpers/media.ts
var isPhotonMediaValue = (value) => Boolean(
  value && typeof value === "object" && "url" in value && "kind" in value && value.kind === "media" && typeof value.url === "string"
);
var resolvePhotonMediaUrl = (value) => {
  if (typeof value === "string") {
    return value;
  }
  if (isPhotonMediaValue(value)) {
    return value.url;
  }
  return "";
};
var resolvePhotonMediaPreviewUrl = (value) => {
  if (isPhotonMediaValue(value)) {
    return value.previewUrl || value.url;
  }
  return resolvePhotonMediaUrl(value);
};
var updatePhotonMediaUrl = (currentValue, url) => isPhotonMediaValue(currentValue) ? {
  ...currentValue,
  url
} : url;

export {
  isPhotonMediaValue,
  resolvePhotonMediaUrl,
  resolvePhotonMediaPreviewUrl,
  updatePhotonMediaUrl
};
