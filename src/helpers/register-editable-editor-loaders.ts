import type { ComponentType } from "react";
import type {
	PhotonEditableEditorLoaderKey,
	PhotonEditableEditorLoaders,
} from "./editable-editor-loaders";

declare global {
	var __photonEditableEditorLoaders:
		| PhotonEditableEditorLoaders
		| undefined;
}

const registerLoader = (
	key: PhotonEditableEditorLoaderKey,
	loader: () => Promise<ComponentType<any>>,
) => {
	globalThis.__photonEditableEditorLoaders = {
		...globalThis.__photonEditableEditorLoaders,
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
