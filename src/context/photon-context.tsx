"use client";

import {
	createContext,
	createElement,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { toast } from "sonner";
import { useStore } from "zustand";
import {
	getPhotonAnchorRel,
	sanitizePhotonLinkHref,
} from "../helpers/link-url";
import { clonePhotonValue } from "../helpers/path";
import { decomposePhotonSurfaceDocument } from "../helpers/site";
import { resolvePhotonSiteData } from "../helpers/site-data";
import {
	resolvePhotonBlockActiveState,
	type PhotonBlockActiveStateResolution,
} from "../helpers/block-active-state";
import {
	canEditPhotonWorkspace,
	normalizePhotonWorkspaceCapabilities,
	normalizePhotonWorkspaceDescriptor,
} from "../helpers/workspace";
import { PhotonI18nProvider } from "../i18n/photon-i18n-context";
import type {
	PhotonAccountTabExtension,
	PhotonI18nValue,
	PhotonInteractionActionDefinition,
	PhotonInteractionActionPresentation,
	PhotonInteractionGuardDefinition,
	PhotonInteractionGuardEvaluatorMap,
	PhotonInteractionSurfaceDefinition,
	PhotonInteractionSurfaceRendererMap,
	PhotonInteractionToastTemplate,
	PhotonLinkComponent,
	PhotonLinkComponentProps,
	PhotonLinkFactory,
	PhotonMediaUploadHandler,
	PhotonMode,
	PhotonNavigateHandler,
	PhotonNavigationConfig,
	PhotonPageSettings,
	PhotonPrefetchHandler,
	PhotonRegistry,
	PhotonResources,
	PhotonRouteContextField,
	PhotonSearchHandler,
	PhotonSite,
	PhotonSiteFrameExtension,
	PhotonWorkspaceCapabilities,
	PhotonWorkspaceDescriptor,
} from "../types";
import { getPhotonExternalStateFingerprint } from "./external-state";
import { PhotonInteractionSurfaceHost } from "../interaction-surfaces/photon-interaction-surface-host";
import {
	createPhotonStore,
	getPhotonFieldValue,
	type PhotonStore,
	type PhotonStoreInit,
	type PhotonStoreState,
} from "./photon-store";

const PhotonContext = createContext<PhotonStore | null>(null);

type PhotonProviderProps = {
	children: ReactNode;
	initialDocument: PhotonStoreInit["initialDocument"];
	initialResources?: PhotonResources;
	initialPageSettings?: PhotonPageSettings;
	initialSite?: PhotonSite;
	registry: PhotonRegistry;
	workspace?: PhotonWorkspaceDescriptor;
	capabilities?: Partial<PhotonWorkspaceCapabilities>;
	initialMode?: PhotonMode;
	isAdmin?: boolean;
	i18n?: PhotonI18nValue | null;
	uploadMedia?: PhotonMediaUploadHandler;
	searchSite?: PhotonSearchHandler;
	requestAuth?: () => void;
	requestAuthAction?: PhotonInteractionActionPresentation;
		interactionSurfaces?: PhotonInteractionSurfaceDefinition[];
		interactionActions?: PhotonInteractionActionDefinition[];
		interactionGuards?: PhotonInteractionGuardDefinition[];
		interactionGuardEvaluators?: PhotonInteractionGuardEvaluatorMap;
		interactionSurfaceRenderers?: PhotonInteractionSurfaceRendererMap;
	navigate?: PhotonNavigateHandler;
	prefetch?: PhotonPrefetchHandler;
	linkComponent?: PhotonLinkComponent;
	linkFactory?: PhotonLinkFactory;
	navigation?: PhotonNavigationConfig;
	siteFrameExtensions?: PhotonSiteFrameExtension[];
	accountTabs?: PhotonAccountTabExtension[];
	routeContextFields?: PhotonRouteContextField[];
	routeContextValues?: Record<string, unknown>;
};

const DefaultPhotonLinkComponent: PhotonLinkComponent = ({
	href,
	locale: _locale,
	children,
	...props
}) =>
	createElement(
		"a",
		{
			...props,
			href: sanitizePhotonLinkHref(href),
			rel: getPhotonAnchorRel(props.target, props.rel),
		},
		children,
	);

const defaultPhotonLinkFactory: PhotonLinkFactory = (href) =>
	sanitizePhotonLinkHref(href);

export const PhotonProvider = ({
	children,
	initialDocument,
	initialResources = {},
	initialPageSettings = {},
	initialSite = {
		settings: {},
		regions: {},
	},
	registry,
	workspace,
	capabilities,
	initialMode = "preview",
	isAdmin = false,
	i18n,
	uploadMedia,
	searchSite,
	requestAuth,
	requestAuthAction,
		interactionSurfaces = [],
		interactionActions = [],
		interactionGuards = [],
		interactionGuardEvaluators = {},
		interactionSurfaceRenderers = {},
	navigate,
	prefetch,
	linkComponent = DefaultPhotonLinkComponent,
	linkFactory = defaultPhotonLinkFactory,
	navigation = {},
	siteFrameExtensions = [],
	accountTabs = [],
	routeContextFields = [],
	routeContextValues = {},
}: PhotonProviderProps) => {
	const storeRef = useRef<PhotonStore | null>(null);
	const externalStateFingerprint = useMemo(
		() =>
			getPhotonExternalStateFingerprint({
				document: initialDocument,
				resources: initialResources,
				pageSettings: initialPageSettings,
				site: initialSite,
				workspace: normalizePhotonWorkspaceDescriptor(workspace),
			}),
		[
			initialDocument,
			initialPageSettings,
			initialResources,
			initialSite,
			workspace,
		],
	);
	const lastExternalStateFingerprintRef = useRef<string | null>(
		externalStateFingerprint,
	);
	const dispatchInteractionToast = (template: PhotonInteractionToastTemplate) => {
		const description = template.description;

		switch (template.status ?? "message") {
			case "success":
				toast.success(template.title, { description });
				break;
			case "error":
				toast.error(template.title, { description });
				break;
			case "info":
				toast.info(template.title, { description });
				break;
			case "warning":
				toast.warning(template.title, { description });
				break;
			default:
				toast(template.title, { description });
				break;
		}
	};

	if (!storeRef.current) {
		storeRef.current = createPhotonStore({
			initialDocument,
			initialResources,
			initialPageSettings,
			initialSite,
			registry,
			workspace,
			capabilities,
			initialMode,
			isAdmin,
				uploadMedia,
				searchSite,
				requestAuth,
				requestAuthAction,
					interactionSurfaces,
				interactionActions,
				interactionGuards,
				interactionGuardEvaluators,
				interactionSurfaceRenderers,
			dispatchInteractionToast,
			navigate,
			prefetch,
			linkComponent,
			linkFactory,
			navigation,
			siteFrameExtensions,
			accountTabs,
			routeContextFields,
			routeContextValues,
			i18n: i18n
				? {
						contentLocale: i18n.contentLocale,
						defaultLocale: i18n.defaultLocale,
					}
				: undefined,
		});
	}

	useEffect(() => {
		if (lastExternalStateFingerprintRef.current === externalStateFingerprint) {
			return;
		}

		lastExternalStateFingerprintRef.current = externalStateFingerprint;
		if ((storeRef.current?.getState().contentRevision ?? 0) !== 0) {
			return;
		}

		storeRef.current?.getState().syncExternalState({
			initialDocument: clonePhotonValue(initialDocument),
			initialResources: clonePhotonValue(initialResources),
			initialPageSettings: clonePhotonValue(initialPageSettings),
			initialSite: clonePhotonValue(initialSite),
			workspace: clonePhotonValue(
				normalizePhotonWorkspaceDescriptor(workspace),
			),
			capabilities: clonePhotonValue(
				normalizePhotonWorkspaceCapabilities(capabilities),
			),
		});
	}, [
		externalStateFingerprint,
		capabilities,
		initialDocument,
		initialPageSettings,
		initialResources,
		initialSite,
		workspace,
	]);

	useEffect(() => {
		storeRef.current?.setState((state) => {
			const normalizedWorkspace = normalizePhotonWorkspaceDescriptor(workspace);
			const normalizedCapabilities =
				normalizePhotonWorkspaceCapabilities(capabilities);
			const nextMode = !isAdmin ? "preview" : state.mode;
			const nextEditable =
				isAdmin &&
				canEditPhotonWorkspace(normalizedWorkspace, normalizedCapabilities);

				if (
					state.isAdmin === isAdmin &&
					state.uploadMedia === uploadMedia &&
					state.searchSite === searchSite &&
					state.requestAuthAction === requestAuthAction &&
					state.requestAuthFallback === requestAuth &&
						state.interactionSurfaces === interactionSurfaces &&
						state.interactionActions === interactionActions &&
						state.interactionGuards === interactionGuards &&
						state.interactionGuardEvaluators === interactionGuardEvaluators &&
					state.interactionSurfaceRenderers === interactionSurfaceRenderers &&
				state.navigate === navigate &&
				state.prefetch === prefetch &&
				state.linkComponent === linkComponent &&
				state.linkFactory === linkFactory &&
				JSON.stringify(state.navigation) === JSON.stringify(navigation) &&
				state.siteFrameExtensions === siteFrameExtensions &&
				JSON.stringify(state.accountTabs) === JSON.stringify(accountTabs) &&
				state.routeContextFields === routeContextFields &&
				JSON.stringify(state.routeContextValues) ===
					JSON.stringify(routeContextValues) &&
				state.contentLocale === (i18n?.contentLocale ?? state.contentLocale) &&
				state.defaultLocale === (i18n?.defaultLocale ?? state.defaultLocale) &&
				state.mode === nextMode &&
				JSON.stringify(state.capabilities) ===
					JSON.stringify(normalizedCapabilities) &&
				JSON.stringify(state.workspace) === JSON.stringify(normalizedWorkspace)
			) {
				return state;
			}

				return {
					...state,
					isAdmin,
					workspace: normalizedWorkspace,
					capabilities: normalizedCapabilities,
					uploadMedia,
					searchSite,
					requestAuthAction,
					requestAuthFallback: requestAuth,
					interactionSurfaces,
					interactionActions,
					interactionGuards,
					interactionGuardEvaluators,
					interactionSurfaceRenderers,
				navigate,
				prefetch,
				linkComponent,
				linkFactory,
				navigation: clonePhotonValue(navigation),
				siteFrameExtensions,
				accountTabs: clonePhotonValue(accountTabs),
				routeContextFields,
				routeContextValues: clonePhotonValue(routeContextValues),
				contentLocale: i18n?.contentLocale ?? state.contentLocale,
				defaultLocale: i18n?.defaultLocale ?? state.defaultLocale,
				mode: nextEditable || nextMode === "preview" ? nextMode : "preview",
			};
		});
	}, [
		capabilities,
		i18n?.contentLocale,
		i18n?.defaultLocale,
		isAdmin,
		linkFactory,
		linkComponent,
		navigate,
		prefetch,
		navigation,
		siteFrameExtensions,
		accountTabs,
		routeContextFields,
		routeContextValues,
		interactionSurfaces,
		interactionActions,
		interactionGuards,
		interactionGuardEvaluators,
			interactionSurfaceRenderers,
			requestAuth,
			requestAuthAction,
			searchSite,
		uploadMedia,
		workspace,
	]);

	return (
		<PhotonI18nProvider value={i18n}>
			<PhotonContext.Provider value={storeRef.current}>
				{children}
				<PhotonStoreInteractionSurfaceHost />
			</PhotonContext.Provider>
		</PhotonI18nProvider>
	);
};

const PhotonStoreInteractionSurfaceHost = () => {
	const request = usePhotonStore((state) => state.activeInteractionSurface);
	const renderers = usePhotonStore(
		(state) => state.interactionSurfaceRenderers,
	);
	const closeInteractionSurface = usePhotonStore(
		(state) => state.closeInteractionSurface,
	);
	const completeInteractionSurface = usePhotonStore(
		(state) => state.completeInteractionSurface,
	);

	return (
		<PhotonInteractionSurfaceHost
			request={request}
			renderers={renderers}
			onOpenChange={(open) => {
				if (!open) {
					closeInteractionSurface();
				}
			}}
			onComplete={completeInteractionSurface}
		/>
	);
};

export const usePhotonStoreApi = () => {
	const context = useContext(PhotonContext);

	if (!context) {
		throw new Error("usePhoton must be used within PhotonProvider");
	}

	return context;
};

export const usePhotonStore = <T,>(
	selector: (state: PhotonStoreState) => T,
) => {
	const store = usePhotonStoreApi();

	return useStore(store, selector);
};

export const usePhoton = () => {
	const store = usePhotonStoreApi();

	return useStore(store);
};

export const usePhotonFieldValue = (blockId: string, path: string): unknown =>
	usePhotonStore((state) => getPhotonFieldValue(state, blockId, path));

export const usePhotonCanEdit = () =>
	usePhotonStore(
		(state) =>
			state.isAdmin &&
			state.mode !== "preview" &&
			canEditPhotonWorkspace(state.workspace, state.capabilities),
	);

export const usePhotonSiteData = () => {
	const site = usePhotonStore((state) => state.site);
	const siteDataSchemas = usePhotonStore((state) => state.siteDataSchemas);
	const contentLocale = usePhotonStore((state) => state.contentLocale);
	return useMemo(
		() =>
			resolvePhotonSiteData(siteDataSchemas, site.settings, {
				locale: contentLocale,
			}),
		[contentLocale, siteDataSchemas, site.settings],
	);
};

export const usePhotonRouteContext = (): Record<string, unknown> =>
	usePhotonStore((state) => state.routeContextValues);

/**
 * Resolves the active state for a block based on its definition's
 * `states` (condition-driven) and `previewScenarios` (builder preview).
 *
 * Resolution order:
 * 1. Builder preview override (`blockPreviewScenarios[blockId]`) wins
 *    when it matches a state or scenario id.
 * 2. First state whose `condition` evaluates `true` against current site/route context.
 * 3. State marked `isDefaultServerState` when client-only conditions are unresolved.
 * 4. `null` when the block declares no states/scenarios.
 *
 * Block components call this with their own `block.id` to render
 * state-specific copy/UI without becoming aware of the resolver.
 */
export const usePhotonBlockActiveState = (
	blockId: string,
): PhotonBlockActiveStateResolution => {
	const block = usePhotonStore((state) =>
		state.document.blocks.find((b) => b.id === blockId),
	);
	const registry = usePhotonStore((state) => state.registry);
	const conditionEvaluators = usePhotonStore(
		(state) => state.conditionEvaluators,
	);
	const siteSettings = usePhotonStore((state) => state.site.settings);
	const resources = usePhotonStore((state) => state.resources);
	const routeContextValues = usePhotonStore(
		(state) => state.routeContextValues,
	);
	const previewScenarioId = usePhotonStore(
		(state) => state.blockPreviewScenarios[blockId] ?? null,
	);

	return useMemo(() => {
		const definition = block
			? registry.getDefinition(block.module, block.type)
			: undefined;
		return resolvePhotonBlockActiveState({
			definition,
			evaluators: conditionEvaluators,
			context: {
				siteSettings,
				resources,
				routeContext: routeContextValues,
			},
			previewScenarioId,
		});
	}, [
		block,
		registry,
		conditionEvaluators,
		siteSettings,
		resources,
		routeContextValues,
		previewScenarioId,
	]);
};

export const usePhotonPersistedState = () => {
	const document = usePhotonStore((state) => state.document);
	const resources = usePhotonStore((state) => state.resources);
	const pageSettings = usePhotonStore((state) => state.pageSettings);
	const site = usePhotonStore((state) => state.site);

	return useMemo(() => {
		const persistedState = decomposePhotonSurfaceDocument(document, site);

		return {
			document: persistedState.pageDocument,
			resources,
			pageSettings,
			site: persistedState.site,
		};
	}, [document, resources, pageSettings, site]);
};

type PhotonLinkProps = PhotonLinkComponentProps & {
	navigateInPreviewOnly?: boolean;
};

export const PhotonLink = ({
	navigateInPreviewOnly = true,
	onClick,
	...props
}: PhotonLinkProps) => {
	const mode = usePhotonStore((state) => state.mode);
	const LinkComponent = usePhotonStore((state) => state.linkComponent);
	const disableNavigation = navigateInPreviewOnly && mode !== "preview";

	return (
		<span
			className="contents"
			onClickCapture={
				disableNavigation
					? (event) => {
							event.preventDefault();
						}
					: undefined
			}
		>
			<LinkComponent
				{...props}
				onClick={(event) => {
					if (disableNavigation) {
						event.preventDefault();
						event.stopPropagation();
						return;
					}

					onClick?.(event);
				}}
			/>
		</span>
	);
};
