declare const decodeWebsiteBuilderHtmlEntities: (value: string) => string;
declare const normalizeWebsiteBuilderUrlForProtocolCheck: (value: string) => string;
declare const sanitizeWebsiteBuilderLinkHref: (href: unknown, fallback?: string) => string;
declare const getWebsiteBuilderAnchorRel: (target: unknown, rel: unknown) => string | undefined;

export { decodeWebsiteBuilderHtmlEntities as d, getWebsiteBuilderAnchorRel as g, normalizeWebsiteBuilderUrlForProtocolCheck as n, sanitizeWebsiteBuilderLinkHref as s };
