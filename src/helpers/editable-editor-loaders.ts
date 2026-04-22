import type { ComponentType } from "react";

export type PhotonEditableEditorLoaderKey =
	| "gallery"
	| "image"
	| "richText"
	| "text"
	| "textarea";

export type PhotonEditableEditorLoaders = Partial<
	Record<
		PhotonEditableEditorLoaderKey,
		() => Promise<ComponentType<any>>
	>
>;

declare global {
	var __photonEditableEditorLoaders:
		| PhotonEditableEditorLoaders
		| undefined;
}

export const getPhotonEditableEditorLoader = (
	key: PhotonEditableEditorLoaderKey,
) => globalThis.__photonEditableEditorLoaders?.[key] ?? null;
