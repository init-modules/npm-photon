"use client";

import type {
	PhotonInteractionSurfaceRendererMap,
	PhotonResolvedInteractionSurfaceRequest,
} from "../types";

type PhotonInteractionSurfaceHostProps = {
	request: PhotonResolvedInteractionSurfaceRequest | null;
	renderers?: PhotonInteractionSurfaceRendererMap;
	onOpenChange: (open: boolean) => void;
	/**
	 * Called by the renderer on explicit success (e.g. login OK, form
	 * submitted). Forwarded as `onComplete` to the renderer; surfaces
	 * that signal completion get deterministic plan continuation in the
	 * runtime. Renderers that don't migrate continue to call only
	 * `onOpenChange(false)`, which falls back to plan re-evaluation.
	 */
	onComplete?: () => void;
};

export const PhotonInteractionSurfaceHost = ({
	request,
	renderers = {},
	onOpenChange,
	onComplete,
}: PhotonInteractionSurfaceHostProps) => {
	if (!request || request.definition.kind === "toast") {
		return null;
	}

	const Renderer = renderers[request.definition.rendererKey];

	if (!Renderer) {
		return null;
	}

	return (
		<Renderer
			open={true}
			onOpenChange={onOpenChange}
			request={request}
			onComplete={onComplete}
		/>
	);
};
