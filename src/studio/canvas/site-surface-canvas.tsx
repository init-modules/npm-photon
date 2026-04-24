"use client";

import clsx from "clsx";
import { type CSSProperties, memo, useEffect, useRef, useState } from "react";
import { usePhotonStore } from "../../context/photon-context";
import { PhotonSurfaceLayoutProvider } from "../../context/photon-surface-layout-context";
import {
	getPhotonSurfaceRegionBlocks,
	getPhotonSurfaceRegionListId,
	resolvePhotonSurfaceRegionDescriptors,
	PHOTON_PAGE_SURFACE_REGION_KEY,
} from "../../helpers/site";
import { resolvePhotonSiteFrameMobileControls } from "../../modules/system/site/site-mobile-frame";
import type { PhotonDocument, PhotonSite } from "../../types";
import type { InsertTarget } from "../types";
import { CanvasBlockList } from "./canvas-block-list";

type SiteSurfaceCanvasProps = {
	document: PhotonDocument;
	site: PhotonSite;
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
		typeof resolvePhotonSurfaceRegionDescriptors
	>[number];
	site: PhotonSite;
	document: PhotonDocument;
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
		getPhotonSurfaceRegionBlocks(document, region.key) ?? [];
	const regionListId = getPhotonSurfaceRegionListId(region.key);
	const isPageRegion = region.key === PHOTON_PAGE_SURFACE_REGION_KEY;
	const builderRegionInsetClassName = builderEnabled
		? "px-4 sm:px-5"
		: undefined;
	const builderSiteFrameInset =
		builderEnabled && (region.key === "header" || region.key === "footer");
	const stickySiteHeaderBlock =
		region.key === "header"
			? blocks.find(
					(block) =>
						block.module === "photon-system" &&
						block.type === "site-header-shell" &&
						block.props.sticky === true,
				)
			: undefined;
	const stickySiteHeaderRegion = Boolean(stickySiteHeaderBlock);
	const mobileStickySiteHeaderRegion =
		resolvePhotonSiteFrameMobileControls(
			(
				stickySiteHeaderBlock?.props as
					| {
							mobile?: Parameters<
								typeof resolvePhotonSiteFrameMobileControls
							>[0];
					  }
					| undefined
			)?.mobile,
		).sticky;

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
		<PhotonSurfaceLayoutProvider
			value={{
				builderEnabled,
				kind: region.kind,
				regionKey: region.key,
				width: surfaceWidth,
			}}
		>
			<section
				ref={sectionRef}
				data-photon-surface-region={region.key}
				className={clsx(
					"relative [container-type:inline-size]",
					isPageRegion && "flex-1",
					previewEnabled &&
						stickySiteHeaderRegion &&
						(mobileStickySiteHeaderRegion
							? "sticky top-[calc(var(--photon-dock-offset,0px)+var(--photon-site-header-offset,0px))] z-40"
							: "md:sticky md:top-[calc(var(--photon-dock-offset,0px)+var(--photon-site-header-offset,0px))] md:z-40"),
				)}
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
								borderColor: "var(--photon-builder-border)",
								background: "var(--photon-builder-panel-solid)",
								color: "var(--photon-builder-text-ghost)",
							}}
						>
							{region.label}
						</div>
						{region.lockedOnCanvas ? (
							<div
								className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
								style={{
									borderColor: "var(--photon-builder-border-strong)",
									background: "var(--photon-builder-accent-soft)",
									color: "var(--photon-builder-accent-text)",
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
							? "mx-auto w-full max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] px-[var(--photon-site-gutter,24px)]"
							: builderSiteFrameInset
								? clsx("w-full pb-1", builderRegionInsetClassName)
								: "w-full",
					)}
					style={
						isPageRegion
							? ({
									"--photon-list-gap": "var(--photon-section-gap,2rem)",
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
		</PhotonSurfaceLayoutProvider>
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
	const mode = usePhotonStore((state) => state.mode);
	const regions = resolvePhotonSurfaceRegionDescriptors(site);
	const previewEnabled = mode !== "builder";

	return (
		<div className="flex min-h-[var(--photon-site-surface-min-height,100dvh)] flex-col gap-[var(--photon-section-gap,2rem)]">
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
