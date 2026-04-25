"use client";

import type {
	PhotonInteractionSurfaceRendererMap,
	PhotonResolvedInteractionSurfaceRequest,
} from "../types";

type PhotonInteractionSurfaceHostProps = {
	request: PhotonResolvedInteractionSurfaceRequest | null;
	renderers?: PhotonInteractionSurfaceRendererMap;
	onOpenChange: (open: boolean) => void;
};

export const PhotonInteractionSurfaceHost = ({
	request,
	renderers = {},
	onOpenChange,
}: PhotonInteractionSurfaceHostProps) => {
	if (!request || request.definition.kind === "toast") {
		return null;
	}

	const Renderer = renderers[request.definition.rendererKey];

	if (!Renderer) {
		return null;
	}

	return (
		<Renderer open={true} onOpenChange={onOpenChange} request={request} />
	);
};
