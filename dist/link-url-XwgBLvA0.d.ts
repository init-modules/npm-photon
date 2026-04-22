declare const decodePhotonHtmlEntities: (value: string) => string;
declare const normalizePhotonUrlForProtocolCheck: (value: string) => string;
declare const sanitizePhotonLinkHref: (href: unknown, fallback?: string) => string;
declare const getPhotonAnchorRel: (target: unknown, rel: unknown) => string | undefined;

export { decodePhotonHtmlEntities as d, getPhotonAnchorRel as g, normalizePhotonUrlForProtocolCheck as n, sanitizePhotonLinkHref as s };
