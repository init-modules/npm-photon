// src/helpers/list-id.ts
var PHOTON_ROOT_LIST_ID = "root";
var createPhotonAreaListId = (blockId, areaId) => `area:${blockId}:${areaId}`;

// src/helpers/route-context.ts
var PHOTON_ROUTE_CONTEXT_SCOPE = "route";
var PARAM_TOKEN = /:([A-Za-z_][\w]*)/g;
var REGEX_META = /[.+*?^${}()|[\]\\]/g;
var parsedPatternCache = /* @__PURE__ */ new Map();
var parseRoutePattern = (pattern) => {
  const cached = parsedPatternCache.get(pattern);
  if (cached) {
    return cached;
  }
  const paramNames = [];
  let cursor = 0;
  let regexSource = "";
  for (const match of pattern.matchAll(PARAM_TOKEN)) {
    const start = match.index ?? 0;
    const literal = pattern.slice(cursor, start);
    regexSource += literal.replace(REGEX_META, "\\$&");
    paramNames.push(match[1]);
    regexSource += "([^/]+)";
    cursor = start + match[0].length;
  }
  regexSource += pattern.slice(cursor).replace(REGEX_META, "\\$&");
  const parsed = {
    regex: new RegExp(`^${regexSource}\\/?$`),
    paramNames
  };
  parsedPatternCache.set(pattern, parsed);
  return parsed;
};
var matchRoutePattern = (pattern, path) => {
  const { regex, paramNames } = parseRoutePattern(pattern);
  const match = regex.exec(path);
  if (!match) return null;
  const params = {};
  paramNames.forEach((name, idx) => {
    const raw = match[idx + 1] ?? "";
    try {
      params[name] = decodeURIComponent(raw);
    } catch {
      params[name] = raw;
    }
  });
  return { params };
};
var resolveRouteContext = (fields, patterns, path) => {
  let matchedPattern = null;
  let urlParams = {};
  for (const pattern of patterns ?? []) {
    const result = matchRoutePattern(pattern, path);
    if (result) {
      matchedPattern = pattern;
      urlParams = result.params;
      break;
    }
  }
  const values = {};
  for (const field of fields) {
    const paramName = field.urlParam ?? field.path;
    const fromUrl = urlParams[paramName];
    if (fromUrl !== void 0) {
      values[field.path] = field.kind === "number" ? Number(fromUrl) : fromUrl;
    } else if (field.defaultValue !== void 0) {
      values[field.path] = field.defaultValue;
    }
  }
  return {
    fields,
    fieldsByPath: new Map(fields.map((f) => [f.path, f])),
    values,
    matchedPattern
  };
};

export {
  PHOTON_ROOT_LIST_ID,
  createPhotonAreaListId,
  PHOTON_ROUTE_CONTEXT_SCOPE,
  parseRoutePattern,
  matchRoutePattern,
  resolveRouteContext
};
