"use client";

import type { ReactNode } from "react";
import { usePhotonStore } from "../context/photon-context";
import type { PhotonArea, PhotonBlock } from "../types";

type PhotonBlockRendererProps = {
	block: PhotonBlock;
	renderArea?: (area: PhotonArea, index: number) => ReactNode;
};

export const PhotonBlockRenderer = ({
	block,
	renderArea,
}: PhotonBlockRendererProps) => {
	const registry = usePhotonStore((state) => state.registry);
	const definition = registry.getDefinition(block.module, block.type);

	if (!definition) {
		return (
			<div className="rounded-[28px] border border-rose-400/30 bg-rose-500/10 p-6 text-sm text-rose-100">
				Unknown block: {block.module}/{block.type}
			</div>
		);
	}

	const Component = definition.component;

	return <Component block={block} renderArea={renderArea} />;
};
