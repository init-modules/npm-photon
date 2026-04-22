"use client";

import clsx from "clsx";
import type { CSSProperties } from "react";
import { memo, useEffect, useRef, useState } from "react";
import { PhotonBlockRenderer } from "./components/block-renderer";
import { PhotonProvider } from "./context/photon-context";
import {
	usePhotonRenderDepth,
	PhotonRenderDepthProvider,
} from "./context/photon-render-depth-context";
import { PhotonSurfaceLayoutProvider } from "./context/photon-surface-layout-context";
import { resolvePhotonPublicSiteDesignSettings } from "./helpers/public-site-design";
import {
	getPhotonSurfaceRegionBlocks,
	resolvePhotonSurfaceRegionDescriptors,
	PHOTON_PAGE_SURFACE_REGION_KEY,
} from "./helpers/site";

export {
	getPhotonAnchorRel,
	sanitizePhotonLinkHref,
} from "./helpers/link-url";

import { PhotonSearchHighlightEffect } from "./search/photon-search-highlight-effect";
import type {
	PhotonAccountTabExtension,
	PhotonArea,
	PhotonBlock,
	PhotonI18nValue,
	PhotonLinkComponent,
	PhotonRegistry,
	PhotonResolvedPage,
	PhotonSearchHandler,
	PhotonSearchHighlight,
	PhotonSiteFrameExtension,
} from "./types";

export type PhotonPublicRuntimePageValue = Pick<
	PhotonResolvedPage,
	"page" | "document" | "resources" | "pageSettings" | "runtimeData" | "site"
>;

type PhotonPublicBlockListProps = {
	blocks: PhotonBlock[];
};

const PhotonPublicBlockItem = ({
	block,
}: {
	block: PhotonBlock;
}) => {
	const renderDepth = usePhotonRenderDepth();

	return (
		<PhotonBlockRenderer
			block={block}
			renderArea={(area: PhotonArea) => (
				<PhotonRenderDepthProvider value={renderDepth + 1}>
					<PhotonPublicBlockList blocks={area.blocks} />
				</PhotonRenderDepthProvider>
			)}
		/>
	);
};

const PhotonPublicBlockList = ({
	blocks,
}: PhotonPublicBlockListProps) => (
	<div className="space-y-[var(--photon-list-gap,0.75rem)]">
		{blocks.map((block) => (
			<PhotonPublicBlockItem key={block.id} block={block} />
		))}
	</div>
);

type PhotonPublicSurfaceRegionProps = {
	region: ReturnType<
		typeof resolvePhotonSurfaceRegionDescriptors
	>[number];
	page: PhotonPublicRuntimePageValue;
};

const PhotonPublicSurfaceRegion = ({
	region,
	page,
}: PhotonPublicSurfaceRegionProps) => {
	const sectionRef = useRef<HTMLElement | null>(null);
	const [surfaceWidth, setSurfaceWidth] = useState(0);
	const blocks = getPhotonSurfaceRegionBlocks(
		page.document,
		region.key,
	);
	const isPageRegion = region.key === PHOTON_PAGE_SURFACE_REGION_KEY;
	const stickySiteHeaderRegion =
		region.key === "header" &&
		(blocks ?? []).some(
			(block) =>
				block.module === "photon-system" &&
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

		const observer = new ResizeObserver(sync);
		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	return (
		<PhotonSurfaceLayoutProvider
			value={{
				builderEnabled: false,
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
					stickySiteHeaderRegion && "sticky z-40",
				)}
				style={
					stickySiteHeaderRegion
						? ({
								top: "var(--photon-site-header-offset, 0px)",
							} as CSSProperties)
						: undefined
				}
			>
				<div
					className={
						isPageRegion
							? "mx-auto w-full max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] px-[var(--photon-site-gutter,24px)]"
							: "w-full"
					}
					style={
						isPageRegion
							? ({
									"--photon-list-gap": "var(--photon-section-gap,2rem)",
								} as CSSProperties)
							: undefined
					}
				>
					<PhotonPublicBlockList blocks={blocks ?? []} />
				</div>
			</section>
		</PhotonSurfaceLayoutProvider>
	);
};

const PhotonPublicSurface = memo(function PhotonPublicSurface({
	page,
}: {
	page: PhotonPublicRuntimePageValue;
}) {
	const regions = resolvePhotonSurfaceRegionDescriptors(page.site);

	return (
		<div className="space-y-[var(--photon-section-gap,2rem)]">
			{regions.map((region) => (
				<PhotonPublicSurfaceRegion
					key={region.key}
					region={region}
					page={page}
				/>
			))}
		</div>
	);
});

type PhotonPublicPageProps = {
	page: PhotonPublicRuntimePageValue;
	registry: PhotonRegistry;
	i18n?: PhotonI18nValue | null;
	linkComponent?: PhotonLinkComponent;
	siteFrameExtensions?: PhotonSiteFrameExtension[];
	accountTabs?: PhotonAccountTabExtension[];
	requestAuth?: () => void;
	searchSite?: PhotonSearchHandler;
	activeSearchHighlight?: PhotonSearchHighlight | null;
};

export const PhotonPublicPage = ({
	page,
	registry,
	i18n,
	linkComponent,
	siteFrameExtensions,
	accountTabs,
	requestAuth,
	searchSite,
	activeSearchHighlight = null,
}: PhotonPublicPageProps) => {
	const designSettings = resolvePhotonPublicSiteDesignSettings(
		page.site.settings.design,
	);
	const siteSurfaceStyle = {
		"--photon-site-body-font": designSettings.bodyFontFamily,
		"--photon-site-heading-font": designSettings.headingFontFamily,
		"--photon-site-background": designSettings.backgroundColor,
		"--photon-site-surface": designSettings.surfaceColor,
		"--photon-site-text": designSettings.textColor,
		"--photon-site-muted": designSettings.mutedTextColor,
		"--photon-site-muted-text": designSettings.mutedTextColor,
		"--photon-site-accent": designSettings.accentColor,
		"--photon-site-border": designSettings.borderColor,
		"--photon-site-max-width": designSettings.siteMaxWidth,
		"--photon-site-gutter": designSettings.pageGutter,
		"--photon-section-gap": designSettings.sectionGap,
		"--photon-site-radius": designSettings.radius,
		"--photon-site-header-offset": designSettings.headerOffset,
		backgroundColor: designSettings.backgroundColor,
		color: designSettings.textColor,
		fontFamily: designSettings.bodyFontFamily,
	} as CSSProperties;

	return (
		<PhotonProvider
			initialDocument={page.document}
			initialResources={page.resources}
			initialPageSettings={page.pageSettings}
			initialSite={page.site}
			registry={registry}
			initialMode="preview"
			isAdmin={false}
			linkComponent={linkComponent}
			siteFrameExtensions={siteFrameExtensions}
			accountTabs={accountTabs}
			requestAuth={requestAuth}
			searchSite={searchSite}
			i18n={i18n}
		>
			<PhotonSearchHighlightEffect
				activeHighlight={activeSearchHighlight}
			/>
			<main
				className="min-h-screen min-w-0 px-0 transition-colors duration-500"
				style={siteSurfaceStyle}
				data-testid="photon-public-runtime"
			>
				<PhotonPublicSurface page={page} />
			</main>
		</PhotonProvider>
	);
};

export { EditableGallery } from "./components/public/public-editable-gallery";
export { EditableImage } from "./components/public/public-editable-image";
export { EditableRepeaterValue } from "./components/public/public-editable-repeater-value";
export { EditableRichText } from "./components/public/public-editable-rich-text";
export { EditableText } from "./components/public/public-editable-text";
export { EditableTextarea } from "./components/public/public-editable-textarea";
export {
	renderPhotonRichTextHtml,
	sanitizePhotonRichTextHtml,
} from "./components/public/sanitize-rich-text";
export {
	usePhoton,
	usePhotonCanEdit,
	usePhotonFieldValue as usePhotonValueAtPath,
	usePhotonStore,
	PhotonLink,
} from "./context/photon-context";
export { usePhotonRenderDepth } from "./context/photon-render-depth-context";
export {
	createPhotonBlockLocalizationSchema,
	createPhotonLocalizedDefault,
	definePhotonBlockDefinition,
} from "./helpers/document";
export { createPhotonKit } from "./helpers/installable";
export { createPhotonRuntime } from "./helpers/runtime";
export {
	createPhotonAccountTabExtension,
	createPhotonSiteFrameExtension,
	resolvePhotonAccountTabs,
} from "./helpers/site-frame-extensions";
export { getPhotonSurfaceModeStyle } from "./helpers/surface-layout";
export { usePhotonI18n } from "./i18n/photon-i18n-context";
export {
	photonPublicSystemKit as photonSystemKit,
	photonPublicSystemModule as photonSystemModule,
} from "./modules/system-public";
export {
	PHOTON_SEARCH_OCCURRENCE_PARAM,
	PHOTON_SEARCH_QUERY_PARAM,
	PHOTON_SEARCH_TARGET_PARAM,
} from "./search/constants";
export { PhotonSiteSearch } from "./search/photon-site-search";
export type {
	PhotonAccountTabExtension,
	PhotonBindingAdapter,
	PhotonBlock,
	PhotonBlockComponentProps,
	PhotonBlockDefinition,
	PhotonBlockLocalizationSchema,
	PhotonDocument,
	PhotonDocumentsMap,
	PhotonField,
	PhotonFieldOption,
	PhotonInstallableKit,
	PhotonLinkComponentProps,
	PhotonLocaleDescriptor,
	PhotonLocaleStatus,
	PhotonModule,
	PhotonPageSettingsPanelDefinition,
	PhotonPageSettingsScope,
	PhotonSiteFrameExtension,
	PhotonSiteSettingsPanelDefinition,
} from "./types";
