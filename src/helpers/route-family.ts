import type { PhotonDocument, PhotonDocumentsMap } from "../types";
import { matchRoutePattern } from "./route-context";

export type PhotonResolvedDocumentForRoute = {
	document: PhotonDocument;
	source: "exact" | "pattern";
	matchedPattern?: string;
};

/**
 * Resolves which document to render for a given URL path.
 *
 * Resolution order:
 * 1. **Exact match** — a document whose `route` equals `path` (override case
 *    from 4.md: "/astana" gets a fully custom document, not the template).
 * 2. **Pattern match** — first document with `routePatterns` that contains
 *    a pattern matching `path` (template case: "/products/:slug" matches
 *    "/products/coffee" and feeds slug into route context).
 * 3. **Null** when neither matches — caller decides 404 vs default behavior.
 *
 * Pattern documents (templates) typically have `route` set to a placeholder
 * like "/" or "/products" and the actual specific routes are derived from
 * `routePatterns`. Specific overrides have `route` set to the exact path
 * and no `routePatterns`.
 */
export const resolvePhotonDocumentForRoute = (
	path: string,
	documents: PhotonDocumentsMap,
): PhotonResolvedDocumentForRoute | null => {
	const allDocuments = Object.values(documents);

	for (const document of allDocuments) {
		if (document.route === path) {
			return { document, source: "exact" };
		}
	}

	for (const document of allDocuments) {
		if (!document.routePatterns?.length) {
			continue;
		}
		for (const pattern of document.routePatterns) {
			if (matchRoutePattern(pattern, path)) {
				return {
					document,
					source: "pattern",
					matchedPattern: pattern,
				};
			}
		}
	}

	return null;
};
