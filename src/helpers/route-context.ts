import type {
	PhotonResolvedRouteContext,
	PhotonRouteContextField,
} from "../types";

export const PHOTON_ROUTE_CONTEXT_SCOPE = "route";

const PARAM_TOKEN = /:([A-Za-z_][\w]*)/g;
const REGEX_META = /[.+*?^${}()|[\]\\]/g;

type ParsedRoutePattern = { regex: RegExp; paramNames: string[] };

const parsedPatternCache = new Map<string, ParsedRoutePattern>();

export const parseRoutePattern = (pattern: string): ParsedRoutePattern => {
	const cached = parsedPatternCache.get(pattern);
	if (cached) {
		return cached;
	}
	const paramNames: string[] = [];
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
	const parsed: ParsedRoutePattern = {
		regex: new RegExp(`^${regexSource}\\/?$`),
		paramNames,
	};
	parsedPatternCache.set(pattern, parsed);
	return parsed;
};

export const matchRoutePattern = (
	pattern: string,
	path: string,
): { params: Record<string, string> } | null => {
	const { regex, paramNames } = parseRoutePattern(pattern);
	const match = regex.exec(path);
	if (!match) return null;
	const params: Record<string, string> = {};
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

export const resolveRouteContext = (
	fields: PhotonRouteContextField[],
	patterns: string[] | undefined,
	path: string,
): PhotonResolvedRouteContext => {
	let matchedPattern: string | null = null;
	let urlParams: Record<string, string> = {};

	for (const pattern of patterns ?? []) {
		const result = matchRoutePattern(pattern, path);
		if (result) {
			matchedPattern = pattern;
			urlParams = result.params;
			break;
		}
	}

	const values: Record<string, unknown> = {};
	for (const field of fields) {
		const paramName = field.urlParam ?? field.path;
		const fromUrl = urlParams[paramName];
		if (fromUrl !== undefined) {
			values[field.path] =
				field.kind === "number" ? Number(fromUrl) : fromUrl;
		} else if (field.defaultValue !== undefined) {
			values[field.path] = field.defaultValue;
		}
	}

	return {
		fields,
		fieldsByPath: new Map(fields.map((f) => [f.path, f])),
		values,
		matchedPattern,
	};
};
