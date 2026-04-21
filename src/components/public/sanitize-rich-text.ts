import {
	getWebsiteBuilderAnchorRel,
	sanitizeWebsiteBuilderLinkHref,
} from "../../helpers/link-url";

const allowedTags = new Set([
	"a",
	"blockquote",
	"br",
	"code",
	"em",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"li",
	"ol",
	"p",
	"strong",
	"ul",
]);

const allowedGlobalAttributes = new Set(["class"]);
const allowedAttributesByTag: Record<string, Set<string>> = {
	a: new Set(["href", "rel", "target", "title"]),
};

const escapeHtml = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");

const escapeAttribute = (value: string) =>
	escapeHtml(value).replaceAll("\"", "&quot;");

const sanitizeAttributeValue = (tagName: string, name: string, value: string) => {
	if (name === "href") {
		const sanitizedHref = sanitizeWebsiteBuilderLinkHref(value, "");

		return sanitizedHref === "" ? null : sanitizedHref;
	}

	if (tagName === "a" && name === "target" && value !== "_blank") {
		return null;
	}

	return value;
};

const sanitizeWithDomParser = (html: string) => {
	const parser = new DOMParser();
	const document = parser.parseFromString(`<div>${html}</div>`, "text/html");
	const root = document.body.firstElementChild;

	const sanitizeNode = (node: Node): Node[] => {
		if (node.nodeType === Node.TEXT_NODE) {
			return [document.createTextNode(node.textContent ?? "")];
		}

		if (node.nodeType !== Node.ELEMENT_NODE) {
			return [];
		}

		const element = node as Element;
		const tagName = element.tagName.toLowerCase();
		const children = Array.from(element.childNodes).flatMap(sanitizeNode);

		if (!allowedTags.has(tagName)) {
			return children;
		}

		const cleanElement = document.createElement(tagName);
		const allowedAttributes = allowedAttributesByTag[tagName] ?? new Set<string>();

		for (const attribute of Array.from(element.attributes)) {
			const name = attribute.name.toLowerCase();

			if (name.startsWith("on")) {
				continue;
			}

			if (!allowedGlobalAttributes.has(name) && !allowedAttributes.has(name)) {
				continue;
			}

			const value = sanitizeAttributeValue(tagName, name, attribute.value);

			if (value !== null) {
				cleanElement.setAttribute(name, value);
			}
		}

		if (tagName === "a") {
			cleanElement.setAttribute(
				"rel",
				getWebsiteBuilderAnchorRel(
					cleanElement.getAttribute("target"),
					cleanElement.getAttribute("rel"),
				) ?? "noopener noreferrer",
			);
		}

		for (const child of children) {
			cleanElement.appendChild(child);
		}

		return [cleanElement];
	};

	const cleanRoot = document.createElement("div");

	for (const child of Array.from(root?.childNodes ?? [])) {
		for (const cleanChild of sanitizeNode(child)) {
			cleanRoot.appendChild(cleanChild);
		}
	}

	return cleanRoot.innerHTML;
};

const parseAttributes = (source: string) => {
	const attributes: Array<{ name: string; value: string }> = [];
	const pattern = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

	for (const match of source.matchAll(pattern)) {
		const name = match[1]?.toLowerCase();

		if (!name) {
			continue;
		}

		attributes.push({
			name,
			value: match[2] ?? match[3] ?? match[4] ?? "",
		});
	}

	return attributes;
};

const sanitizeWithoutDomParser = (html: string) => {
	let output = "";
	let cursor = 0;
	const tagPattern = /<\s*(\/)?\s*([a-z][a-z0-9-]*)([^>]*)>/gi;

	for (const match of html.matchAll(tagPattern)) {
		const index = match.index ?? 0;
		const [rawTag, closingSlash, rawTagName, rawAttributes = ""] = match;
		const tagName = rawTagName.toLowerCase();

		output += escapeHtml(html.slice(cursor, index));
		cursor = index + rawTag.length;

		if (!allowedTags.has(tagName)) {
			continue;
		}

		if (closingSlash) {
			if (tagName !== "br") {
				output += `</${tagName}>`;
			}
			continue;
		}

		const allowedAttributes = allowedAttributesByTag[tagName] ?? new Set<string>();
		const cleanAttributes: string[] = [];

		for (const attribute of parseAttributes(rawAttributes)) {
			if (attribute.name.startsWith("on")) {
				continue;
			}

			if (
				!allowedGlobalAttributes.has(attribute.name) &&
				!allowedAttributes.has(attribute.name)
			) {
				continue;
			}

			const value = sanitizeAttributeValue(
				tagName,
				attribute.name,
				attribute.value,
			);

			if (value !== null) {
				cleanAttributes.push(`${attribute.name}="${escapeAttribute(value)}"`);
			}
		}

		if (tagName === "a" && !cleanAttributes.some((item) => item.startsWith("rel="))) {
			cleanAttributes.push(`rel="noopener noreferrer"`);
		}

		output += `<${tagName}${cleanAttributes.length ? ` ${cleanAttributes.join(" ")}` : ""}>`;
	}

	output += escapeHtml(html.slice(cursor));

	return output;
};

export const sanitizeWebsiteBuilderRichTextHtml = (value: string) => {
	if (typeof DOMParser === "undefined") {
		return sanitizeWithoutDomParser(value);
	}

	return sanitizeWithDomParser(value);
};

export const renderWebsiteBuilderRichTextHtml = (
	value: string,
	placeholder: string,
) => {
	const trimmed = value.trim();

	if (!trimmed) {
		return `<p>${escapeHtml(placeholder)}</p>`;
	}

	if (!trimmed.startsWith("<")) {
		return `<p>${escapeHtml(trimmed)}</p>`;
	}

	return sanitizeWebsiteBuilderRichTextHtml(trimmed);
};
