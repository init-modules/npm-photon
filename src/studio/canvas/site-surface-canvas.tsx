"use client";

import clsx from "clsx";
import { type CSSProperties, memo, useEffect, useRef, useState } from "react";
import { useWebsiteBuilderStore } from "../../context/website-builder-context";
import { WebsiteBuilderSurfaceLayoutProvider } from "../../context/website-builder-surface-layout-context";
import {
	getWebsiteBuilderSurfaceRegionBlocks,
	getWebsiteBuilderSurfaceRegionListId,
	resolveWebsiteBuilderSurfaceRegionDescriptors,
	WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
} from "../../helpers/site";
import type { WebsiteBuilderDocument, WebsiteBuilderSite } from "../../types";
import type { InsertTarget } from "../types";
import { CanvasBlockList } from "./canvas-block-list";

type SiteSurfaceCanvasProps = {
	document: WebsiteBuilderDocument;
	site: WebsiteBuilderSite;
	builderEnabled: boolean;
	collapseControlsEnabled: boolean;
	respectsCollapsedState: boolean;
	isDragging: boolean;
	manualInsertTarget: InsertTarget | null;
	dropTarget: InsertTarget | null;
	onActivateInsertTarget: (target: InsertTarget | null) => void;
};

type SiteSurfaceRegionSectionProps = {
	region: ReturnType<
		typeof resolveWebsiteBuilderSurfaceRegionDescriptors
	>[number];
	site: WebsiteBuilderSite;
	document: WebsiteBuilderDocument;
	builderEnabled: boolean;
	collapseControlsEnabled: boolean;
	respectsCollapsedState: boolean;
	isDragging: boolean;
	manualInsertTarget: InsertTarget | null;
	dropTarget: InsertTarget | null;
	onActivateInsertTarget: (target: InsertTarget | null) => void;
	previewEnabled: boolean;
};

const SiteSurfaceRegionSection = ({
	region,
	site,
	document,
	builderEnabled,
	collapseControlsEnabled,
	respectsCollapsedState,
	isDragging,
	manualInsertTarget,
	dropTarget,
	onActivateInsertTarget,
	previewEnabled,
}: SiteSurfaceRegionSectionProps) => {
	const sectionRef = useRef<HTMLElement | null>(null);
	const [surfaceWidth, setSurfaceWidth] = useState(0);
	const blocks =
		getWebsiteBuilderSurfaceRegionBlocks(document, region.key) ?? [];
	const regionListId = getWebsiteBuilderSurfaceRegionListId(region.key);
	const isPageRegion = region.key === WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY;
	const builderRegionInsetClassName = builderEnabled
		? "px-4 sm:px-5"
		: undefined;
	const builderSiteFrameInset =
		builderEnabled && (region.key === "header" || region.key === "footer");
	const stickySiteHeaderRegion =
		region.key === "header" &&
		blocks.some(
			(block) =>
				block.module === "website-builder-system" &&
				block.type === "site-header-shell" &&
				block.props.sticky === true,
		);

	useEffect(() => {
		const element = sectionRef.current;
		if (!element || typeof ResizeObserver === "undefined") {
			return;
		}

		const sync = () => setSurfaceWidth(Math.round(element.clientWidth));
		sync();
		const observer = new ResizeObserver(() => sync());
		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	return (
		<WebsiteBuilderSurfaceLayoutProvider
			value={{
				builderEnabled,
				kind: region.kind,
				regionKey: region.key,
				width: surfaceWidth,
			}}
		>
			<section
				ref={sectionRef}
				data-wb-surface-region={region.key}
				className={clsx(
					"relative [container-type:inline-size]",
					previewEnabled && stickySiteHeaderRegion && "sticky z-40",
				)}
				style={
					previewEnabled && stickySiteHeaderRegion
						? ({
								top: "calc(var(--wb-dock-offset, 0px) + var(--wb-site-header-offset, 0px))",
							} as CSSProperties)
						: undefined
				}
			>
				{builderEnabled ? (
					<div
						className={clsx(
							"pointer-events-none mb-3 flex flex-wrap items-center gap-2",
							builderRegionInsetClassName,
						)}
					>
						<div
							className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em]"
							style={{
								borderColor: "var(--wb-builder-border)",
								background: "var(--wb-builder-panel-solid)",
								color: "var(--wb-builder-text-ghost)",
							}}
						>
							{region.label}
						</div>
						{region.lockedOnCanvas ? (
							<div
								className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
								style={{
									borderColor: "var(--wb-builder-border-strong)",
									background: "var(--wb-builder-accent-soft)",
									color: "var(--wb-builder-accent-text)",
								}}
							>
								Fixed region
							</div>
						) : null}
					</div>
				) : null}

				<div
					className={clsx(
						"transition-all duration-500",
						isPageRegion
							? "mx-auto w-full max-w-[calc(var(--wb-site-max-width,1280px)+var(--wb-site-gutter,24px)*2)] px-[var(--wb-site-gutter,24px)]"
							: builderSiteFrameInset
								? clsx("w-full pb-1", builderRegionInsetClassName)
								: "w-full",
					)}
					style={
						isPageRegion
							? ({
									"--wb-list-gap": "var(--wb-section-gap,2rem)",
								} as CSSProperties)
							: undefined
					}
				>
					<CanvasBlockList
						blocks={blocks}
						listId={regionListId}
						builderEnabled={builderEnabled}
						collapseControlsEnabled={collapseControlsEnabled}
						respectsCollapsedState={respectsCollapsedState}
						isDragging={isDragging}
						manualInsertTarget={manualInsertTarget}
						dropTarget={dropTarget}
						onActivateInsertTarget={onActivateInsertTarget}
					/>
				</div>
			</section>
		</WebsiteBuilderSurfaceLayoutProvider>
	);
};

const SiteSurfaceCanvasComponent = ({
	document,
	site,
	builderEnabled,
	collapseControlsEnabled,
	respectsCollapsedState,
	isDragging,
	manualInsertTarget,
	dropTarget,
	onActivateInsertTarget,
}: SiteSurfaceCanvasProps) => {
	const mode = useWebsiteBuilderStore((state) => state.mode);
	const regions = resolveWebsiteBuilderSurfaceRegionDescriptors(site);
	const previewEnabled = mode !== "builder";

	return (
		<div className="space-y-[var(--wb-section-gap,2rem)]">
			{regions.map((region) => (
				<SiteSurfaceRegionSection
					key={region.key}
					region={region}
					site={site}
					document={document}
					builderEnabled={builderEnabled}
					collapseControlsEnabled={collapseControlsEnabled}
					respectsCollapsedState={respectsCollapsedState}
					isDragging={isDragging}
					manualInsertTarget={manualInsertTarget}
					dropTarget={dropTarget}
					onActivateInsertTarget={onActivateInsertTarget}
					previewEnabled={previewEnabled}
				/>
			))}
		</div>
	);
};

export const SiteSurfaceCanvas = memo(SiteSurfaceCanvasComponent);
