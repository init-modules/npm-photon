"use client";

import clsx from "clsx";
import type { CSSProperties } from "react";
import { memo, useEffect, useRef, useState } from "react";
import {
	PhotonProvider,
	usePhotonStore,
} from "./context/photon-public-context";
import {
	PhotonRenderDepthProvider,
	usePhotonRenderDepth,
} from "./context/photon-render-depth-context";
import { PhotonSurfaceLayoutProvider } from "./context/photon-surface-layout-context";
import { resolvePhotonPublicSiteDesignSettings } from "./helpers/public-site-design";
import {
	getPhotonSurfaceRegionBlocks,
	PHOTON_PAGE_SURFACE_REGION_KEY,
	resolvePhotonSurfaceRegionDescriptors,
} from "./helpers/site";

export {
	getPhotonAnchorRel,
	sanitizePhotonLinkHref,
} from "./helpers/link-url";

import { PhotonSearchHighlightEffect } from "./search/photon-search-highlight-effect";
import { PhotonSiteSearchSurfaceRenderer } from "./search/photon-site-search";
import { resolvePhotonSiteFrameMobileControls } from "./modules/system/site/site-mobile-frame";
import type {
	PhotonAccountTabExtension,
	PhotonAuthPageRenderer,
	PhotonArea,
	PhotonBlock,
	PhotonI18nValue,
	PhotonInteractionActionDefinition,
	PhotonInteractionActionPresentation,
	PhotonInteractionGuardDefinition,
	PhotonInteractionGuardEvaluatorMap,
	PhotonInteractionSurfaceDefinition,
	PhotonInteractionSurfaceRendererMap,
	PhotonLinkComponent,
	PhotonLinkFactory,
	PhotonNavigateHandler,
	PhotonNavigationConfig,
	PhotonRouteContextField,
	PhotonPrefetchHandler,
	PhotonRegistry,
	PhotonResolvedPage,
	PhotonSearchHandler,
	PhotonSearchHighlight,
	PhotonSiteFrameExtension,
} from "./types";

const defaultPhotonInteractionSurfaceRenderers = {
	"photon.site-search": PhotonSiteSearchSurfaceRenderer,
} satisfies PhotonInteractionSurfaceRendererMap;

export type PhotonPublicRuntimePageValue = Pick<
	PhotonResolvedPage,
	"page" | "document" | "resources" | "pageSettings" | "runtimeData" | "site"
>;

type PhotonPublicBlockListProps = {
	blocks: PhotonBlock[];
};

const PhotonPublicBlockItem = ({ block }: { block: PhotonBlock }) => {
	const renderDepth = usePhotonRenderDepth();
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

	return (
		<Component
			block={block}
			renderArea={(area: PhotonArea) => (
				<PhotonRenderDepthProvider value={renderDepth + 1}>
					<PhotonPublicBlockList blocks={area.blocks} />
				</PhotonRenderDepthProvider>
			)}
		/>
	);
};

const PhotonPublicBlockList = ({ blocks }: PhotonPublicBlockListProps) => (
	<div className="space-y-[var(--photon-list-gap,0.75rem)]">
		{blocks.map((block) => (
			<PhotonPublicBlockItem key={block.id} block={block} />
		))}
	</div>
);

type PhotonPublicSurfaceRegionProps = {
	region: ReturnType<typeof resolvePhotonSurfaceRegionDescriptors>[number];
	page: PhotonPublicRuntimePageValue;
};

const PhotonPublicSurfaceRegion = ({
	region,
	page,
}: PhotonPublicSurfaceRegionProps) => {
	const sectionRef = useRef<HTMLElement | null>(null);
	const [surfaceWidth, setSurfaceWidth] = useState(0);
	const blocks = getPhotonSurfaceRegionBlocks(page.document, region.key);
	const isPageRegion = region.key === PHOTON_PAGE_SURFACE_REGION_KEY;
	const stickySiteHeaderBlock =
		region.key === "header"
			? (blocks ?? []).find(
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
					isPageRegion && "flex-1",
					stickySiteHeaderRegion &&
						(mobileStickySiteHeaderRegion
							? "sticky z-40"
							: "lg:sticky lg:z-40"),
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
		<div className="flex min-h-[var(--photon-site-surface-min-height,100dvh)] flex-col gap-[var(--photon-section-gap,2rem)]">
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
	interactionSurfaces?: PhotonInteractionSurfaceDefinition[];
	interactionActions?: PhotonInteractionActionDefinition[];
	interactionGuards?: PhotonInteractionGuardDefinition[];
	interactionGuardEvaluators?: PhotonInteractionGuardEvaluatorMap;
	interactionSurfaceRenderers?: PhotonInteractionSurfaceRendererMap;
	requestAuth?: () => void;
	requestAuthAction?: PhotonInteractionActionPresentation;
	navigate?: PhotonNavigateHandler;
	prefetch?: PhotonPrefetchHandler;
	renderAuthPage?: PhotonAuthPageRenderer;
	linkFactory?: PhotonLinkFactory;
	searchSite?: PhotonSearchHandler;
	activeSearchHighlight?: PhotonSearchHighlight | null;
	navigation?: PhotonNavigationConfig;
	routeContextFields?: PhotonRouteContextField[];
	routeContextValues?: Record<string, unknown>;
};

export const PhotonPublicPage = ({
	page,
	registry,
	i18n,
	linkComponent,
	siteFrameExtensions,
	accountTabs,
	interactionSurfaces,
	interactionActions,
	interactionGuards,
	interactionGuardEvaluators,
	interactionSurfaceRenderers,
	requestAuth,
	requestAuthAction,
	navigate,
	prefetch,
	renderAuthPage,
	linkFactory,
	searchSite,
	activeSearchHighlight = null,
	navigation,
	routeContextFields,
	routeContextValues,
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
		"--photon-site-surface-min-height": "100dvh",
		"--photon-site-radius": designSettings.radius,
		"--photon-site-header-offset": designSettings.headerOffset,
		backgroundColor: designSettings.backgroundColor,
		color: designSettings.textColor,
		fontFamily: designSettings.bodyFontFamily,
	} as CSSProperties;
	const resolvedInteractionSurfaceRenderers = {
		...defaultPhotonInteractionSurfaceRenderers,
		...(interactionSurfaceRenderers ?? {}),
	};

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
				interactionSurfaces={interactionSurfaces}
				interactionActions={interactionActions}
				interactionGuards={interactionGuards}
				interactionGuardEvaluators={interactionGuardEvaluators}
				interactionSurfaceRenderers={resolvedInteractionSurfaceRenderers}
			requestAuth={requestAuth}
			requestAuthAction={requestAuthAction}
			navigate={navigate}
			prefetch={prefetch}
			renderAuthPage={renderAuthPage}
			linkFactory={linkFactory}
			searchSite={searchSite}
			i18n={i18n}
			navigation={navigation}
			routeContextFields={routeContextFields}
			routeContextValues={routeContextValues}
		>
			<PhotonSearchHighlightEffect activeHighlight={activeSearchHighlight} />
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
	PhotonLink,
	PhotonProvider,
	usePhoton,
	usePhotonCanEdit,
	usePhotonFieldValue as usePhotonValueAtPath,
	usePhotonStore,
} from "./context/photon-public-context";
export {
	PHOTON_COMPONENT_LIBRARY_SITE_SETTING_KEY,
	PHOTON_COMPONENT_REFERENCE_MODULE,
	PHOTON_COMPONENT_REFERENCE_TYPE,
	clonePhotonComponentLibraryBlocksForCopy,
	clonePhotonComponentSourceBlockWithNewIds,
	collectPhotonComponentLibraryUsages,
	createPhotonComponentLibraryBlockId,
	createPhotonComponentLibraryItemFromBlock,
	createPhotonComponentReferenceBlock,
	getPhotonComponentLibraryItems,
	isPhotonComponentReferenceBlock,
	parsePhotonComponentLibraryBlockId,
	readPhotonComponentLibrarySettings,
	resolvePhotonComponentReferenceBlocks,
} from "./helpers/component-library";
export {
	PHOTON_INTERACTIONS_SITE_SETTING_KEY,
	createPhotonInteractionExecutionResult,
	createPhotonInteractionActionDefinition,
	createPhotonInteractionGuardDefinition,
	createPhotonInteractionTriggerSlot,
	executePhotonInteractionActionPresentation,
	executePhotonInteractionTriggerSlot,
	photonInteractionExecutionSucceeded,
	evaluatePhotonInteractionGuards,
	readPhotonInteractionSettings,
	resolvePhotonInteractionActionCatalog,
	resolvePhotonInteractionSlotAction,
	resolvePhotonInteractionSlotGuards,
} from "./helpers/interactions";
export {
	PHOTON_INTERACTION_SURFACES_SITE_SETTING_KEY,
	createPhotonActionValue,
	createPhotonInteractionSurfaceDefinition,
	readPhotonInteractionSurfaceSettings,
	resolvePhotonInteractionSurfaceCatalog,
	resolvePhotonInteractionSurfaceRequest,
	resolvePhotonInteractionToastTemplate,
} from "./helpers/interaction-surfaces";
export {
	mergePhotonStudioUrlState,
	normalizePhotonStudioSurfaceMode,
	parsePhotonStudioUrlState,
	writePhotonStudioUrlState,
} from "./helpers/studio-url-state";
export { usePhotonRenderDepth } from "./context/photon-render-depth-context";
export {
	createPhotonBlockLocalizationSchema,
	createPhotonLocalizedDefault,
	definePhotonBlockDefinition,
} from "./helpers/document";
export { createPhotonKit } from "./helpers/installable";
export { createPhotonRuntime } from "./helpers/runtime";
export {
	matchRoutePattern,
	parseRoutePattern,
	resolveRouteContext,
	PHOTON_ROUTE_CONTEXT_SCOPE,
} from "./helpers/route-context";
export {
	collectPhotonPublicFooterExtensionItems as collectPhotonFooterExtensionItems,
	collectPhotonPublicHeaderExtensionItems as collectPhotonHeaderExtensionItems,
	createPhotonPublicAccountTabExtension as createPhotonAccountTabExtension,
	createPhotonPublicSiteFrameExtension as createPhotonSiteFrameExtension,
	resolvePhotonPublicAccountTabs as resolvePhotonAccountTabs,
	resolvePhotonPublicSiteFrameExtensions as resolvePhotonSiteFrameExtensions,
} from "./helpers/public-site-frame-extensions";
export { getPhotonPublicSurfaceModeStyle as getPhotonSurfaceModeStyle } from "./helpers/public-surface-layout";
export { usePhotonI18n } from "./i18n/photon-i18n-context";
export {
	photonPublicSystemKit as photonSystemKit,
	photonPublicSystemModule as photonSystemModule,
} from "./modules/system-public";
export {
	resolvePhotonSiteFrameMobileControls,
	usePhotonSiteFrameScrollLock,
} from "./modules/system/site/site-mobile-frame";
export {
	PHOTON_SEARCH_OCCURRENCE_PARAM,
	PHOTON_SEARCH_QUERY_PARAM,
	PHOTON_SEARCH_TARGET_PARAM,
} from "./search/constants";
export {
	PhotonSiteSearch,
	PhotonSiteSearchSurfaceRenderer,
} from "./search/photon-site-search";
export type {
	PhotonAccountTabExtension,
	PhotonActionPlan,
	PhotonActionPlanExecutionStatus,
	PhotonActionPlanResult,
	PhotonActionPlanStep,
	PhotonActionPolicy,
	PhotonActionPolicyEnforcement,
	PhotonActionPolicyScope,
	PhotonActionStateDefinition,
	PhotonAuthPageRenderInput,
	PhotonAuthPageRenderer,
	PhotonBindingAdapter,
	PhotonBlock,
	PhotonConditionDefinition,
	PhotonConditionEvaluationContext,
	PhotonConditionEvaluator,
	PhotonConditionEvaluatorMap,
	PhotonConditionExpression,
	PhotonConditionResolution,
	PhotonResolvedSiteData,
	PhotonSiteDataBinding,
	PhotonSiteDataField,
	PhotonSiteDataFieldKind,
	PhotonSiteDataSchema,
	PhotonBlockComponentProps,
	PhotonBlockDefinition,
	PhotonBlockLocalizationSchema,
	PhotonDocument,
	PhotonDocumentsMap,
	PhotonField,
	PhotonFieldOption,
	PhotonInstallableKit,
	PhotonComponentLibraryEditorSelection,
	PhotonComponentLibraryItem,
	PhotonComponentLibrarySettings,
	PhotonComponentLibrarySourceSelection,
	PhotonComponentLibraryUsage,
	PhotonComponentLibraryUsageProvider,
	PhotonComponentReferenceProps,
	PhotonInteractionActionDefinition,
	PhotonInteractionActionExecutionHandlers,
	PhotonInteractionActionInstance,
	PhotonInteractionActionPresentation,
	PhotonInteractionExecutionResult,
	PhotonInteractionExecutionStatus,
	PhotonInteractionGuardDefinition,
	PhotonInteractionGuardEvaluationContext,
	PhotonInteractionGuardEvaluationResult,
	PhotonInteractionGuardEvaluator,
	PhotonInteractionGuardEvaluatorMap,
	PhotonInteractionGuardInstance,
	PhotonInteractionGuardMissingEvaluatorPolicy,
	PhotonInteractionPreviewScenario,
	PhotonInteractionSurfaceDefinition,
	PhotonInteractionSurfaceInstance,
	PhotonInteractionSurfaceIntentBinding,
	PhotonInteractionSurfaceKind,
	PhotonInteractionSurfaceOpenHandler,
	PhotonInteractionSurfaceRenderer,
	PhotonInteractionSurfaceRendererMap,
	PhotonInteractionSurfaceRendererProps,
	PhotonInteractionSurfaceSettings,
	PhotonInteractionSurfaceTrigger,
	PhotonInteractionSurfaceVariant,
	PhotonInteractionToastHandler,
	PhotonInteractionToastInput,
	PhotonInteractionToastStatus,
	PhotonInteractionToastTemplate,
	PhotonInteractionTriggerBinding,
	PhotonInteractionTriggerSlot,
	PhotonInteractionSettings,
	PhotonLinkFactory,
	PhotonLinkFactoryOptions,
	PhotonLinkComponentProps,
	PhotonNavigateHandler,
	PhotonNavigateOptions,
	PhotonPrefetchHandler,
	PhotonLocaleDescriptor,
	PhotonLocaleStatus,
	PhotonModule,
	PhotonPageSettings,
	PhotonResources,
	PhotonPageSettingsPanelDefinition,
	PhotonPageSettingsScope,
	PhotonSiteFrameFooterSlot,
	PhotonSiteFrameFooterSlotItems,
	PhotonSiteFrameFooterSlots,
	PhotonSiteFrameActionItem,
	PhotonSiteFrameActionComponentProps,
	PhotonSiteFrameExtension,
	PhotonSiteFrameExtensionContext,
	PhotonSiteFrameHeaderSlot,
	PhotonSiteFrameHeaderSlotItems,
	PhotonSiteFrameHeaderSlots,
	PhotonSiteFrameLinkItem,
	PhotonSiteFrameNavigationColumn,
	PhotonSiteFrameFloatingControls,
	PhotonSiteFrameMobileBottomMenuControls,
	PhotonSiteFrameMobileControls,
	PhotonSiteFrameMobileMenuControls,
	PhotonSiteFrameMobileMenuType,
	PhotonSiteSettingsPanelDefinition,
} from "./types";
