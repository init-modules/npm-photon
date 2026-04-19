"use client";

import type { ReactNode } from "react";
import { useWebsiteBuilderStore } from "../context/website-builder-context";
import type { WebsiteBuilderArea, WebsiteBuilderBlock } from "../types";

type WebsiteBuilderBlockRendererProps = {
	block: WebsiteBuilderBlock;
	renderArea?: (area: WebsiteBuilderArea, index: number) => ReactNode;
};

export const WebsiteBuilderBlockRenderer = ({
	block,
	renderArea,
}: WebsiteBuilderBlockRendererProps) => {
	const registry = useWebsiteBuilderStore((state) => state.registry);
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
