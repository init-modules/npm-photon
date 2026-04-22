import { generateHTML, generateJSON } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import type { PhotonBindingAdapter } from "../types";

const photonBindingExtensions = [StarterKit];

const normalizeRichTextHtml = (value: string) => {
	const trimmed = value.trim();

	return trimmed === "" ? "<p></p>" : trimmed;
};

export const createPhotonTiptapJsonBindingAdapter = (
	key: string,
): PhotonBindingAdapter => ({
	key,
	read: (value) => {
		if (typeof value === "string") {
			return value;
		}

		if (!value || typeof value !== "object") {
			return "";
		}

		try {
			return generateHTML(
				value as Record<string, unknown>,
				photonBindingExtensions,
			);
		} catch {
			return "";
		}
	},
	write: (value) => {
		if (typeof value !== "string") {
			return null;
		}

		try {
			const parsed = generateJSON(
				normalizeRichTextHtml(value),
				photonBindingExtensions,
			);
			const blocks = Array.isArray(parsed.content) ? parsed.content : [];

			return blocks.length === 0 ? null : parsed;
		} catch {
			return null;
		}
	},
});
