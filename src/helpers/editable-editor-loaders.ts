import type { ComponentType } from "react";

export type WebsiteBuilderEditableEditorLoaderKey =
	| "gallery"
	| "image"
	| "richText"
	| "text"
	| "textarea";

export type WebsiteBuilderEditableEditorLoaders = Partial<
	Record<
		WebsiteBuilderEditableEditorLoaderKey,
		() => Promise<ComponentType<any>>
	>
>;

declare global {
	var __websiteBuilderEditableEditorLoaders:
		| WebsiteBuilderEditableEditorLoaders
		| undefined;
}

export const getWebsiteBuilderEditableEditorLoader = (
	key: WebsiteBuilderEditableEditorLoaderKey,
) => globalThis.__websiteBuilderEditableEditorLoaders?.[key] ?? null;
