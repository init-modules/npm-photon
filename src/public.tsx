"use client";

import clsx from "clsx";
import type { CSSProperties } from "react";
import { memo, useEffect, useRef, useState } from "react";
import { WebsiteBuilderBlockRenderer } from "./components/block-renderer";
import { WebsiteBuilderProvider } from "./context/website-builder-context";
import {
	WebsiteBuilderRenderDepthProvider,
	useWebsiteBuilderRenderDepth,
} from "./context/website-builder-render-depth-context";
import { WebsiteBuilderSurfaceLayoutProvider } from "./context/website-builder-surface-layout-context";
import { resolveWebsiteBuilderPublicSiteDesignSettings } from "./helpers/public-site-design";
import {
	getWebsiteBuilderSurfaceRegionBlocks,
	resolveWebsiteBuilderSurfaceRegionDescriptors,
	WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
} from "./helpers/site";
export {
	getWebsiteBuilderAnchorRel,
	sanitizeWebsiteBuilderLinkHref,
} from "./helpers/link-url";
import { WebsiteBuilderSearchHighlightEffect } from "./search/website-builder-search-highlight-effect";
import type {
	WebsiteBuilderArea,
	WebsiteBuilderBlock,
	WebsiteBuilderI18nValue,
	WebsiteBuilderLinkComponent,
	WebsiteBuilderRegistry,
	WebsiteBuilderResolvedPage,
	WebsiteBuilderSearchHighlight,
	WebsiteBuilderSiteFrameExtension,
	WebsiteBuilderAccountTabExtension,
} from "./types";

type WebsiteBuilderPublicBlockListProps = {
	blocks: WebsiteBuilderBlock[];
};

const WebsiteBuilderPublicBlockItem = ({
	block,
}: {
	block: WebsiteBuilderBlock;
}) => {
	const renderDepth = useWebsiteBuilderRenderDepth();

	return (
		<WebsiteBuilderBlockRenderer
			block={block}
			renderArea={(area: WebsiteBuilderArea) => (
				<WebsiteBuilderRenderDepthProvider value={renderDepth + 1}>
					<WebsiteBuilderPublicBlockList
						blocks={area.blocks}
					/>
				</WebsiteBuilderRenderDepthProvider>
			)}
		/>
	);
};

const WebsiteBuilderPublicBlockList = ({
	blocks,
}: WebsiteBuilderPublicBlockListProps) => (
	<div className="space-y-[var(--wb-list-gap,0.75rem)]">
		{blocks.map((block) => (
			<WebsiteBuilderPublicBlockItem key={block.id} block={block} />
		))}
	</div>
);

type WebsiteBuilderPublicSurfaceRegionProps = {
	region: ReturnType<typeof resolveWebsiteBuilderSurfaceRegionDescriptors>[number];
	page: WebsiteBuilderResolvedPage;
};

const WebsiteBuilderPublicSurfaceRegion = ({
	region,
	page,
}: WebsiteBuilderPublicSurfaceRegionProps) => {
	const sectionRef = useRef<HTMLElement | null>(null);
	const [surfaceWidth, setSurfaceWidth] = useState(0);
	const blocks = getWebsiteBuilderSurfaceRegionBlocks(page.document, region.key);
	const isPageRegion = region.key === WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY;
	const stickySiteHeaderRegion =
		region.key === "header" &&
		(blocks ?? []).some(
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

		const observer = new ResizeObserver(sync);
		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	return (
		<WebsiteBuilderSurfaceLayoutProvider
			value={{
				builderEnabled: false,
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
					stickySiteHeaderRegion && "sticky z-40",
				)}
				style={
					stickySiteHeaderRegion
						? ({
								top: "var(--wb-site-header-offset, 0px)",
							} as CSSProperties)
						: undefined
				}
			>
				<div
					className={
						isPageRegion
							? "mx-auto w-full max-w-[calc(var(--wb-site-max-width,1280px)+var(--wb-site-gutter,24px)*2)] px-[var(--wb-site-gutter,24px)]"
							: "w-full"
					}
					style={
						isPageRegion
							? ({
									"--wb-list-gap": "var(--wb-section-gap,2rem)",
								} as CSSProperties)
							: undefined
					}
				>
					<WebsiteBuilderPublicBlockList
						blocks={blocks ?? []}
					/>
				</div>
			</section>
		</WebsiteBuilderSurfaceLayoutProvider>
	);
};

const WebsiteBuilderPublicSurface = memo(function WebsiteBuilderPublicSurface({
	page,
}: {
	page: WebsiteBuilderResolvedPage;
}) {
	const regions = resolveWebsiteBuilderSurfaceRegionDescriptors(page.site);

	return (
		<div className="space-y-[var(--wb-section-gap,2rem)]">
			{regions.map((region) => (
				<WebsiteBuilderPublicSurfaceRegion
					key={region.key}
					region={region}
					page={page}
				/>
			))}
		</div>
	);
});

type WebsiteBuilderPublicPageProps = {
	page: WebsiteBuilderResolvedPage;
	registry: WebsiteBuilderRegistry;
	i18n?: WebsiteBuilderI18nValue | null;
	linkComponent?: WebsiteBuilderLinkComponent;
	siteFrameExtensions?: WebsiteBuilderSiteFrameExtension[];
	accountTabs?: WebsiteBuilderAccountTabExtension[];
	requestAuth?: () => void;
	activeSearchHighlight?: WebsiteBuilderSearchHighlight | null;
};

export const WebsiteBuilderPublicPage = ({
	page,
	registry,
	i18n,
	linkComponent,
	siteFrameExtensions,
	accountTabs,
	requestAuth,
	activeSearchHighlight = null,
}: WebsiteBuilderPublicPageProps) => {
	const designSettings = resolveWebsiteBuilderPublicSiteDesignSettings(
		page.site.settings.design,
	);
	const siteSurfaceStyle = {
		"--wb-site-body-font": designSettings.bodyFontFamily,
		"--wb-site-heading-font": designSettings.headingFontFamily,
		"--wb-site-background": designSettings.backgroundColor,
		"--wb-site-surface": designSettings.surfaceColor,
		"--wb-site-text": designSettings.textColor,
		"--wb-site-muted": designSettings.mutedTextColor,
		"--wb-site-muted-text": designSettings.mutedTextColor,
		"--wb-site-accent": designSettings.accentColor,
		"--wb-site-border": designSettings.borderColor,
		"--wb-site-max-width": designSettings.siteMaxWidth,
		"--wb-site-gutter": designSettings.pageGutter,
		"--wb-section-gap": designSettings.sectionGap,
		"--wb-site-radius": designSettings.radius,
		"--wb-site-header-offset": designSettings.headerOffset,
		backgroundColor: designSettings.backgroundColor,
		color: designSettings.textColor,
		fontFamily: designSettings.bodyFontFamily,
	} as CSSProperties;

	return (
		<WebsiteBuilderProvider
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
			i18n={i18n}
		>
			<WebsiteBuilderSearchHighlightEffect
				activeHighlight={activeSearchHighlight}
			/>
			<main
				className="min-h-screen min-w-0 px-0 transition-colors duration-500"
				style={siteSurfaceStyle}
				data-testid="wb-public-runtime"
			>
				<WebsiteBuilderPublicSurface page={page} />
			</main>
		</WebsiteBuilderProvider>
	);
};

export { EditableImage } from "./components/public/public-editable-image";
export { EditableGallery } from "./components/public/public-editable-gallery";
export { EditableRepeaterValue } from "./components/public/public-editable-repeater-value";
export { EditableRichText } from "./components/public/public-editable-rich-text";
export { EditableText } from "./components/public/public-editable-text";
export { EditableTextarea } from "./components/public/public-editable-textarea";
export {
	renderWebsiteBuilderRichTextHtml,
	sanitizeWebsiteBuilderRichTextHtml,
} from "./components/public/sanitize-rich-text";
export {
	useWebsiteBuilder,
	useWebsiteBuilderStore,
	useWebsiteBuilderCanEdit,
	useWebsiteBuilderFieldValue as useWebsiteBuilderValueAtPath,
	WebsiteBuilderLink,
} from "./context/website-builder-context";
export { useWebsiteBuilderI18n } from "./i18n/website-builder-i18n-context";
export { useWebsiteBuilderRenderDepth } from "./context/website-builder-render-depth-context";
export {
	createWebsiteBuilderBlockLocalizationSchema,
	createWebsiteBuilderLocalizedDefault,
	defineWebsiteBuilderBlockDefinition,
} from "./helpers/document";
export { createWebsiteBuilderKit } from "./helpers/installable";
export { createWebsiteBuilderRuntime } from "./helpers/runtime";
export { getWebsiteBuilderSurfaceModeStyle } from "./helpers/surface-layout";
export {
	createWebsiteBuilderAccountTabExtension,
	createWebsiteBuilderSiteFrameExtension,
	resolveWebsiteBuilderAccountTabs,
} from "./helpers/site-frame-extensions";
export {
	WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM,
	WEBSITE_BUILDER_SEARCH_QUERY_PARAM,
	WEBSITE_BUILDER_SEARCH_TARGET_PARAM,
} from "./search/constants";
export { WebsiteBuilderSiteSearch } from "./search/website-builder-site-search";
export {
	websiteBuilderPublicSystemKit as websiteBuilderSystemKit,
	websiteBuilderPublicSystemModule as websiteBuilderSystemModule,
} from "./modules/system-public";
export type {
	WebsiteBuilderAccountTabExtension,
	WebsiteBuilderBlock,
	WebsiteBuilderBlockComponentProps,
	WebsiteBuilderBlockDefinition,
	WebsiteBuilderBlockLocalizationSchema,
	WebsiteBuilderBindingAdapter,
	WebsiteBuilderDocument,
	WebsiteBuilderDocumentsMap,
	WebsiteBuilderField,
	WebsiteBuilderFieldOption,
	WebsiteBuilderInstallableKit,
	WebsiteBuilderLinkComponentProps,
	WebsiteBuilderLocaleDescriptor,
	WebsiteBuilderLocaleStatus,
	WebsiteBuilderModule,
	WebsiteBuilderPageSettingsPanelDefinition,
	WebsiteBuilderPageSettingsScope,
	WebsiteBuilderSiteFrameExtension,
	WebsiteBuilderSiteSettingsPanelDefinition,
} from "./types";
