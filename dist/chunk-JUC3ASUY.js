import {
  resolvePhotonBlockFieldLocalization
} from "./chunk-MLBMYMZ5.js";

// src/i18n/copy-locale-content.ts
var isLocalizedDefault = (value) => typeof value === "object" && value !== null && value.__wbLocalizedDefault === true;
var setPath = (source, path, value) => {
  const segments = path.split(".");
  const out = { ...source };
  let cursor = out;
  for (let i = 0; i < segments.length - 1; i += 1) {
    const segment = segments[i];
    const next = cursor[segment];
    if (typeof next === "object" && next !== null && !Array.isArray(next)) {
      const cloned = { ...next };
      cursor[segment] = cloned;
      cursor = cloned;
    } else if (Array.isArray(next)) {
      const cloned = next.slice();
      cursor[segment] = cloned;
      cursor = cloned;
    } else {
      const cloned = {};
      cursor[segment] = cloned;
      cursor = cloned;
    }
  }
  cursor[segments[segments.length - 1]] = value;
  return out;
};
var readPath = (source, path) => {
  if (!path) return source;
  const segments = path.split(".");
  let current = source;
  for (const segment of segments) {
    if (current === null || current === void 0) return void 0;
    if (Array.isArray(current)) {
      const index = Number(segment);
      if (Number.isInteger(index)) {
        current = current[index];
        continue;
      }
    }
    if (typeof current === "object") {
      current = current[segment];
      continue;
    }
    return void 0;
  }
  return current;
};
var setLocalizedFieldValue = (props, fieldPath, locale, value) => {
  const current = readPath(props, fieldPath);
  if (isLocalizedDefault(current)) {
    const nextValues = { ...current.values, [locale]: value };
    const nextLocalized2 = {
      __wbLocalizedDefault: true,
      values: nextValues
    };
    return setPath(props, fieldPath, nextLocalized2);
  }
  const nextLocalized = {
    __wbLocalizedDefault: true,
    values: { [locale]: value }
  };
  return setPath(props, fieldPath, nextLocalized);
};
var isEmptyValue = (value) => {
  if (value === null || value === void 0) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};
var readSourceValue = (block, fieldPath, locale) => {
  const raw = readPath(block.props, fieldPath);
  if (isLocalizedDefault(raw)) {
    return raw.values?.[locale];
  }
  return raw;
};
var readTargetEntry = (block, fieldPath, locale) => {
  const raw = readPath(block.props, fieldPath);
  if (isLocalizedDefault(raw)) {
    return raw.values?.[locale];
  }
  return void 0;
};
var copyPhotonLocaleContent = ({
  blocks,
  schemas,
  sourceLocale,
  targetLocale,
  mode = "merge"
}) => {
  const visit = (block) => {
    const schema = schemas[block.type];
    let nextProps = block.props;
    if (schema) {
      for (const field of schema.fields) {
        const localization = resolvePhotonBlockFieldLocalization({
          block,
          schema: schema.localization,
          fieldPath: field.path,
          fieldKind: field.kind
        });
        if (localization !== "localized") continue;
        const sourceValue = readSourceValue(
          block,
          field.path,
          sourceLocale
        );
        if (sourceValue === void 0) continue;
        const targetValue = readTargetEntry(
          block,
          field.path,
          targetLocale
        );
        const shouldWrite = mode === "clone" || isEmptyValue(targetValue);
        if (shouldWrite) {
          nextProps = setLocalizedFieldValue(
            nextProps,
            field.path,
            targetLocale,
            sourceValue
          );
        }
      }
    }
    const nextAreas = block.areas?.map((area) => ({
      ...area,
      blocks: area.blocks.map(visit)
    }));
    return {
      ...block,
      props: nextProps,
      ...nextAreas ? { areas: nextAreas } : {}
    };
  };
  return blocks.map(visit);
};
var copyPhotonBlockLocaleContent = (block, options) => copyPhotonLocaleContent({ ...options, blocks: [block] })[0];

// src/i18n/locale-fallback.ts
var resolvePhotonFallbackLocaleCode = ({
  settings,
  locales
}) => {
  if (settings?.fallbackLocale === false) return null;
  const explicit = settings?.fallbackLocale;
  if (typeof explicit === "string" && explicit.length > 0 && locales.some((locale) => locale.code === explicit)) {
    return explicit;
  }
  const defaultLocale = locales.find((locale) => locale.isDefault);
  return defaultLocale?.code ?? null;
};
var isLocalizedDefault2 = (value) => typeof value === "object" && value !== null && value.__wbLocalizedDefault === true;
var isEmpty = (value) => {
  if (value === null || value === void 0) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};
var resolvePhotonLocalizedValue = ({
  value,
  locale,
  settings,
  locales
}) => {
  if (!isLocalizedDefault2(value)) {
    return isEmpty(value) ? void 0 : value;
  }
  const direct = value.values[locale];
  if (!isEmpty(direct)) return direct;
  const fallbackCode = resolvePhotonFallbackLocaleCode({ settings, locales });
  if (!fallbackCode || fallbackCode === locale) return void 0;
  const fallbackValue = value.values[fallbackCode];
  if (!isEmpty(fallbackValue)) return fallbackValue;
  return void 0;
};

export {
  copyPhotonLocaleContent,
  copyPhotonBlockLocaleContent,
  resolvePhotonFallbackLocaleCode,
  resolvePhotonLocalizedValue
};
