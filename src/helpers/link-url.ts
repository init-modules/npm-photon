const safeWebsiteBuilderUrlProtocols = new Set([
	"http:",
	"https:",
	"mailto:",
	"tel:",
]);

const htmlEntities: Record<string, string> = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: '"',
	apos: "'",
	nbsp: " ",
};

export const decodeWebsiteBuilderHtmlEntities = (value: string) =>
	value.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]+);?/gi, (entity, body) => {
		const normalized = String(body).toLowerCase();

		if (normalized.startsWith("#x")) {
			const codePoint = Number.parseInt(normalized.slice(2), 16);
			return Number.isFinite(codePoint)
				? String.fromCodePoint(codePoint)
				: entity;
		}

		if (normalized.startsWith("#")) {
			const codePoint = Number.parseInt(normalized.slice(1), 10);
			return Number.isFinite(codePoint)
				? String.fromCodePoint(codePoint)
				: entity;
		}

		return htmlEntities[normalized] ?? entity;
	});

export const normalizeWebsiteBuilderUrlForProtocolCheck = (value: string) =>
	decodeWebsiteBuilderHtmlEntities(value)
		.replace(/[\u0000-\u001f\u007f\s]+/g, "")
		.trim();

export const sanitizeWebsiteBuilderLinkHref = (
	href: unknown,
	fallback = "#",
) => {
	if (typeof href !== "string") {
		return fallback;
	}

	const trimmed = decodeWebsiteBuilderHtmlEntities(href).trim();

	if (!trimmed) {
		return fallback;
	}

	const protocolCheckValue =
		normalizeWebsiteBuilderUrlForProtocolCheck(trimmed);

	if (protocolCheckValue.startsWith("//")) {
		return fallback;
	}

	if (
		protocolCheckValue.startsWith("/") ||
		protocolCheckValue.startsWith("#") ||
		protocolCheckValue.startsWith("?")
	) {
		return trimmed;
	}

	const protocolSeparatorIndex = protocolCheckValue.indexOf(":");

	if (protocolSeparatorIndex === -1) {
		return trimmed;
	}

	const protocol = protocolCheckValue
		.slice(0, protocolSeparatorIndex + 1)
		.toLowerCase();

	return safeWebsiteBuilderUrlProtocols.has(protocol) ? trimmed : fallback;
};

export const getWebsiteBuilderAnchorRel = (target: unknown, rel: unknown) => {
	const relTokens = new Set(
		typeof rel === "string" ? rel.split(/\s+/).filter(Boolean) : [],
	);

	if (target === "_blank") {
		relTokens.add("noopener");
		relTokens.add("noreferrer");
	}

	return relTokens.size > 0 ? [...relTokens].join(" ") : undefined;
};
