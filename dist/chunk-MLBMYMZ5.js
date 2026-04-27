// src/i18n/block-localization.ts
var TEXT_LIKE_FIELD_KINDS = /* @__PURE__ */ new Set([
  "text",
  "textarea",
  "rich-text",
  "tags"
]);
var resolveDefaultPhotonFieldLocalization = (kind) => TEXT_LIKE_FIELD_KINDS.has(kind) ? "localized" : "shared";
var resolvePhotonBlockFieldLocalization = ({
  block,
  schema,
  fieldPath,
  fieldKind
}) => {
  const override = block.localization?.[fieldPath];
  if (override === "localized" || override === "shared") {
    return override;
  }
  if (schema) {
    if (schema.localized.includes(fieldPath)) return "localized";
    if (schema.shared.includes(fieldPath)) return "shared";
  }
  return resolveDefaultPhotonFieldLocalization(fieldKind);
};
var isPhotonBlockFieldLocalizationOverridden = ({
  block,
  schema,
  fieldPath,
  fieldKind
}) => {
  const override = block.localization?.[fieldPath];
  if (override !== "localized" && override !== "shared") return false;
  const baseline = schema ? schema.localized.includes(fieldPath) ? "localized" : schema.shared.includes(fieldPath) ? "shared" : resolveDefaultPhotonFieldLocalization(fieldKind) : resolveDefaultPhotonFieldLocalization(fieldKind);
  return override !== baseline;
};
var togglePhotonBlockFieldLocalization = (block, fieldPath, fieldKind, schema) => {
  const current = resolvePhotonBlockFieldLocalization({
    block,
    schema,
    fieldPath,
    fieldKind
  });
  const next = current === "localized" ? "shared" : "localized";
  const baseline = schema ? schema.localized.includes(fieldPath) ? "localized" : schema.shared.includes(fieldPath) ? "shared" : resolveDefaultPhotonFieldLocalization(fieldKind) : resolveDefaultPhotonFieldLocalization(fieldKind);
  const nextLocalization = { ...block.localization ?? {} };
  if (next === baseline) {
    delete nextLocalization[fieldPath];
  } else {
    nextLocalization[fieldPath] = next;
  }
  const cleaned = Object.keys(nextLocalization).length === 0 ? void 0 : nextLocalization;
  const result = {
    ...block,
    ...cleaned ? { localization: cleaned } : {}
  };
  if (!cleaned && "localization" in result) {
    delete result.localization;
  }
  return result;
};
var clearPhotonBlockFieldLocalization = (block, fieldPath) => {
  if (!block.localization || !(fieldPath in block.localization)) {
    return block;
  }
  const { [fieldPath]: _removed, ...rest } = block.localization;
  const cleaned = Object.keys(rest).length === 0 ? void 0 : rest;
  const result = {
    ...block,
    ...cleaned ? { localization: cleaned } : {}
  };
  if (!cleaned && "localization" in result) {
    delete result.localization;
  }
  return result;
};

// src/i18n/translation-completeness.ts
var isLocalizedDefault = (value) => typeof value === "object" && value !== null && value.__wbLocalizedDefault === true;
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
var isEmptyValue = (value) => {
  if (value === null || value === void 0) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};
var readLocalizedFieldValue = (block, fieldPath, locale) => {
  const raw = readPath(block.props, fieldPath);
  if (isLocalizedDefault(raw)) {
    return raw.values?.[locale];
  }
  return raw;
};
var computePhotonTranslationCompleteness = ({
  blocks,
  schemas,
  locale,
  treatCopiedAsMissing = true,
  referenceLocale
}) => {
  let total = 0;
  let filled = 0;
  const missingFields = [];
  const visit = (block) => {
    const schema = schemas[block.type];
    if (schema) {
      for (const field of schema.fields) {
        const localization = resolvePhotonBlockFieldLocalization({
          block,
          schema: schema.localization,
          fieldPath: field.path,
          fieldKind: field.kind
        });
        if (localization !== "localized") continue;
        total += 1;
        const value = readLocalizedFieldValue(block, field.path, locale);
        const isEmpty2 = isEmptyValue(value);
        let isCopiedUntranslated = false;
        if (!isEmpty2 && treatCopiedAsMissing && referenceLocale && referenceLocale !== locale) {
          const refValue = readLocalizedFieldValue(
            block,
            field.path,
            referenceLocale
          );
          if (refValue !== void 0 && refValue !== null && JSON.stringify(refValue) === JSON.stringify(value)) {
            const explicitOverride = block.localization?.[field.path];
            if (explicitOverride !== "localized") {
              isCopiedUntranslated = true;
            }
          }
        }
        if (isEmpty2 || isCopiedUntranslated) {
          missingFields.push({
            blockId: block.id,
            blockType: block.type,
            fieldPath: field.path
          });
        } else {
          filled += 1;
        }
      }
    }
    if (block.areas) {
      for (const area of block.areas) {
        for (const child of area.blocks) {
          visit(child);
        }
      }
    }
  };
  for (const block of blocks) visit(block);
  const percentage = total === 0 ? 100 : Math.round(filled / total * 100);
  const missing = total - filled;
  return {
    locale,
    total,
    filled,
    missing,
    percentage,
    missingFields
  };
};

// src/i18n/translation-completeness-from-registry.ts
var buildPhotonBlockSchemaMapForBlocks = (blocks, registry) => {
  const schemas = {};
  const visit = (block) => {
    const definition = registry.getDefinition(block.module, block.type);
    if (definition) {
      schemas[block.type] = {
        fields: definition.fields,
        ...definition.localizationSchema ? { localization: definition.localizationSchema } : {}
      };
    }
    if (block.areas) {
      for (const area of block.areas) {
        for (const child of area.blocks) visit(child);
      }
    }
  };
  for (const block of blocks) visit(block);
  return schemas;
};
var computePhotonTranslationCompletenessFromRegistry = ({
  blocks,
  registry,
  locale,
  treatCopiedAsMissing,
  referenceLocale
}) => {
  const schemas = buildPhotonBlockSchemaMapForBlocks(blocks, registry);
  return computePhotonTranslationCompleteness({
    blocks,
    schemas,
    locale,
    ...treatCopiedAsMissing !== void 0 ? { treatCopiedAsMissing } : {},
    ...referenceLocale !== void 0 ? { referenceLocale } : {}
  });
};
var computePhotonTranslationCompletenessForLocales = ({
  blocks,
  registry,
  locales,
  referenceLocale,
  treatCopiedAsMissing
}) => {
  const schemas = buildPhotonBlockSchemaMapForBlocks(blocks, registry);
  const result = {};
  for (const locale of locales) {
    result[locale] = computePhotonTranslationCompleteness({
      blocks,
      schemas,
      locale,
      ...treatCopiedAsMissing !== void 0 ? { treatCopiedAsMissing } : {},
      ...referenceLocale !== void 0 ? { referenceLocale } : {}
    });
  }
  return result;
};

// src/i18n/missing-translation.ts
var isLocalizedDefault2 = (value) => typeof value === "object" && value !== null && value.__wbLocalizedDefault === true;
var readPath2 = (source, path) => {
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
var isEmpty = (value) => {
  if (value === null || value === void 0) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};
var findPhotonFieldMissingLocales = ({
  block,
  schema,
  fieldPath,
  fieldKind,
  locales,
  referenceLocale,
  treatCopiedAsMissing = true
}) => {
  const localization = resolvePhotonBlockFieldLocalization({
    block,
    schema,
    fieldPath,
    fieldKind
  });
  if (localization !== "localized") return [];
  const raw = readPath2(block.props, fieldPath);
  const explicitOverride = block.localization?.[fieldPath];
  const result = [];
  for (const locale of locales) {
    const value = isLocalizedDefault2(raw) ? raw.values?.[locale] : raw;
    if (isEmpty(value)) {
      result.push(locale);
      continue;
    }
    if (treatCopiedAsMissing && referenceLocale && referenceLocale !== locale) {
      const refValue = isLocalizedDefault2(raw) ? raw.values?.[referenceLocale] : raw;
      if (refValue !== void 0 && refValue !== null && JSON.stringify(refValue) === JSON.stringify(value) && explicitOverride !== "localized") {
        result.push(locale);
      }
    }
  }
  return result;
};

export {
  resolveDefaultPhotonFieldLocalization,
  resolvePhotonBlockFieldLocalization,
  isPhotonBlockFieldLocalizationOverridden,
  togglePhotonBlockFieldLocalization,
  clearPhotonBlockFieldLocalization,
  readLocalizedFieldValue,
  computePhotonTranslationCompleteness,
  buildPhotonBlockSchemaMapForBlocks,
  computePhotonTranslationCompletenessFromRegistry,
  computePhotonTranslationCompletenessForLocales,
  findPhotonFieldMissingLocales
};
