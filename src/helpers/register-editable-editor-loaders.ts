import type { ComponentType } from "react";
import type {
	WebsiteBuilderEditableEditorLoaderKey,
	WebsiteBuilderEditableEditorLoaders,
} from "./editable-editor-loaders";

declare global {
	var __websiteBuilderEditableEditorLoaders:
		| WebsiteBuilderEditableEditorLoaders
		| undefined;
}

const registerLoader = (
	key: WebsiteBuilderEditableEditorLoaderKey,
	loader: () => Promise<ComponentType<any>>,
) => {
	globalThis.__websiteBuilderEditableEditorLoaders = {
		...globalThis.__websiteBuilderEditableEditorLoaders,
		[key]: loader,
	};
};

registerLoader("gallery", () =>
	import("../components/editable/editable-gallery").then(
		(module) => module.EditableGallery,
	),
);
registerLoader("image", () =>
	import("../components/editable/editable-image").then(
		(module) => module.EditableImage,
	),
);
registerLoader("richText", () =>
	import("../components/editable/editable-rich-text").then(
		(module) => module.EditableRichText,
	),
);
registerLoader("text", () =>
	import("../components/editable/editable-text").then(
		(module) => module.EditableText,
	),
);
registerLoader("textarea", () =>
	import("../components/editable/editable-textarea").then(
		(module) => module.EditableTextarea,
	),
);
