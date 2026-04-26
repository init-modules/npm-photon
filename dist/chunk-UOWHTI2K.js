import {
  PHOTON_ROUTE_CONTEXT_SCOPE
} from "./chunk-MQ64GIR5.js";
import {
  isRecord
} from "./chunk-WHYISUJX.js";

// src/helpers/site-data.ts
var PHOTON_SITE_DATA_SETTING_KEY = "data";
var PHOTON_SITE_DATA_BY_LOCALE_SETTING_KEY = "dataByLocale";
var sitePath = (schemaId, fieldPath) => `${PHOTON_SITE_DATA_SETTING_KEY}.${schemaId}.${fieldPath}`;
var localeSitePath = (localeCode, schemaId, fieldPath) => `${PHOTON_SITE_DATA_BY_LOCALE_SETTING_KEY}.${localeCode}.${schemaId}.${fieldPath}`;
var getNested = (obj, path) => {
  const parts = path.split(".");
  let cur = obj;
  for (const part of parts) {
    if (!isRecord(cur)) {
      return void 0;
    }
    cur = cur[part];
  }
  return cur;
};
var resolvePhotonSiteData = (schemas, siteSettings, options) => {
  const dataSetting = isRecord(siteSettings) ? siteSettings[PHOTON_SITE_DATA_SETTING_KEY] : void 0;
  const overrides = isRecord(dataSetting) ? dataSetting : {};
  const localeRoot = isRecord(siteSettings) ? siteSettings[PHOTON_SITE_DATA_BY_LOCALE_SETTING_KEY] : void 0;
  const localeBucket = options?.locale && isRecord(localeRoot) && isRecord(localeRoot[options.locale]) ? localeRoot[options.locale] : {};
  const values = {};
  for (const schema of schemas) {
    const localeOverride = isRecord(localeBucket[schema.id]) ? localeBucket[schema.id] : {};
    const schemaOverride = isRecord(overrides[schema.id]) ? overrides[schema.id] : {};
    const schemaValues = {};
    for (const field of schema.fields) {
      const localeValue = getNested(localeOverride, field.path);
      if (localeValue !== void 0) {
        schemaValues[field.path] = localeValue;
        continue;
      }
      const overrideValue = getNested(schemaOverride, field.path);
      schemaValues[field.path] = overrideValue !== void 0 ? overrideValue : field.defaultValue;
    }
    values[schema.id] = schemaValues;
  }
  return {
    schemas,
    schemasById: new Map(schemas.map((s) => [s.id, s])),
    values
  };
};
var BINDING_PATTERN = /\{\{\s*([\w.]+)\s*\}\}/g;
var parsePhotonSiteDataBindingExpression = (expression) => {
  const trimmed = expression.trim();
  const dotIndex = trimmed.indexOf(".");
  if (dotIndex <= 0 || dotIndex === trimmed.length - 1) {
    return null;
  }
  return {
    schemaId: trimmed.slice(0, dotIndex),
    fieldPath: trimmed.slice(dotIndex + 1)
  };
};
var resolvePhotonSiteDataBinding = (text, resolved, options) => text.replace(BINDING_PATTERN, (match, expression) => {
  const parsed = parsePhotonSiteDataBindingExpression(expression);
  if (!parsed) {
    return match;
  }
  if (parsed.schemaId === PHOTON_ROUTE_CONTEXT_SCOPE) {
    const routeValue = options?.routeContext?.[parsed.fieldPath];
    if (routeValue === void 0 || routeValue === null) {
      return options?.fallback ?? "";
    }
    return String(routeValue);
  }
  const value = resolved.values[parsed.schemaId]?.[parsed.fieldPath];
  if (value === void 0 || value === null) {
    return options?.fallback ?? "";
  }
  return String(value);
});
var extractPhotonSiteDataBindings = (text) => {
  const result = [];
  for (const match of text.matchAll(BINDING_PATTERN)) {
    const parsed = parsePhotonSiteDataBindingExpression(match[1]);
    if (parsed) {
      result.push(parsed);
    }
  }
  return result;
};

export {
  PHOTON_SITE_DATA_SETTING_KEY,
  PHOTON_SITE_DATA_BY_LOCALE_SETTING_KEY,
  sitePath,
  localeSitePath,
  resolvePhotonSiteData,
  parsePhotonSiteDataBindingExpression,
  resolvePhotonSiteDataBinding,
  extractPhotonSiteDataBindings
};
