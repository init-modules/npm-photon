"use client";

import {
	createContext,
	createElement,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { toast } from "sonner";
import {
	getPhotonAnchorRel,
	sanitizePhotonLinkHref,
} from "../helpers/link-url";
import { getValueAtPath } from "../helpers/path";
import {
	canEditPhotonWorkspace,
	DEFAULT_PHOTON_WORKSPACE_REF,
	normalizePhotonWorkspaceCapabilities,
	normalizePhotonWorkspaceDescriptor,
} from "../helpers/workspace";
import {
	resolvePhotonInteractionSurfaceCatalog,
	resolvePhotonInteractionSurfaceRequest,
	resolvePhotonInteractionToastTemplate,
} from "../helpers/interaction-surfaces";
import {
	executePhotonInteractionActionPresentation,
	executePhotonInteractionTriggerSlot,
	photonInteractionExecutionSucceeded,
	resolvePhotonInteractionActionCatalog,
} from "../helpers/interactions";
import {
	getPhotonComponentLibraryItems,
	parsePhotonComponentLibraryBlockId,
} from "../helpers/component-library";
import {
	resolvePhotonBlockActiveState,
	type PhotonBlockActiveStateResolution,
} from "../helpers/block-active-state";
import { PhotonI18nProvider } from "../i18n/photon-i18n-context";
import { PhotonInteractionSurfaceHost } from "../interaction-surfaces/photon-interaction-surface-host";
import type {
	PhotonAccountTabExtension,
	PhotonActionPolicy,
	PhotonBlock,
	PhotonConditionDefinition,
	PhotonConditionEvaluatorMap,
	PhotonRouteContextField,
	PhotonSiteDataSchema,
	PhotonDocument,
	PhotonAuthPageRenderer,
	PhotonI18nValue,
	PhotonInteractionActionDefinition,
	PhotonInteractionActionPresentation,
	PhotonInteractionExecutionResult,
	PhotonInteractionGuardDefinition,
	PhotonInteractionGuardEvaluatorMap,
	PhotonInteractionPreviewScenario,
	PhotonInteractionSurfaceDefinition,
	PhotonInteractionSurfaceOpenHandler,
	PhotonInteractionSurfaceRendererMap,
	PhotonInteractionToastHandler,
	PhotonInteractionTriggerSlot,
	PhotonLinkComponent,
	PhotonLinkComponentProps,
	PhotonLinkFactory,
	PhotonMode,
	PhotonNavigateHandler,
	PhotonNavigationConfig,
	PhotonPageSettings,
	PhotonPrefetchHandler,
	PhotonRegistry,
	PhotonResources,
	PhotonSearchHandler,
	PhotonSite,
	PhotonSiteFrameExtension,
	PhotonWorkspaceCapabilities,
	PhotonWorkspaceDescriptor,
} from "../types";

type PhotonPublicContextValue = {
	document: PhotonDocument;
	resources: PhotonResources;
	pageSettings: PhotonPageSettings;
	site: PhotonSite;
	registry: PhotonRegistry;
	workspace: PhotonWorkspaceDescriptor;
	capabilities: PhotonWorkspaceCapabilities;
	mode: PhotonMode;
	isAdmin: boolean;
	searchSite?: PhotonSearchHandler;
	requestAuth?: () => void;
	openInteractionSurface: PhotonInteractionSurfaceOpenHandler;
	showInteractionToast: PhotonInteractionToastHandler;
	executeInteractionAction: (
		action: PhotonInteractionActionPresentation | undefined | null,
	) => PhotonInteractionExecutionResult;
	executeInteractionTriggerSlot: (
		slot: PhotonInteractionTriggerSlot,
		options?: {
			scenarioId?: string | null;
			scenario?: PhotonInteractionPreviewScenario | null;
		},
	) => PhotonInteractionExecutionResult;
	navigate?: PhotonNavigateHandler;
	prefetch?: PhotonPrefetchHandler;
	renderAuthPage?: PhotonAuthPageRenderer;
	linkComponent: PhotonLinkComponent;
	linkFactory: PhotonLinkFactory;
	navigation: PhotonNavigationConfig;
	siteFrameExtensions: PhotonSiteFrameExtension[];
	accountTabs: PhotonAccountTabExtension[];
	interactionSurfaces: PhotonInteractionSurfaceDefinition[];
	interactionActions: PhotonInteractionActionDefinition[];
	interactionGuards: PhotonInteractionGuardDefinition[];
	interactionGuardEvaluators: PhotonInteractionGuardEvaluatorMap;
	interactionPolicies: PhotonActionPolicy[];
	conditionDefinitions: PhotonConditionDefinition[];
	conditionEvaluators: PhotonConditionEvaluatorMap;
	siteDataSchemas: PhotonSiteDataSchema[];
	routeContextFields: PhotonRouteContextField[];
	routeContextValues: Record<string, unknown>;
	interactionSurfaceRenderers: PhotonInteractionSurfaceRendererMap;
	contentLocale: string;
	defaultLocale: string;
};

type PhotonPublicProviderProps = {
	children: ReactNode;
	initialDocument: PhotonDocument;
	initialResources?: PhotonResources;
	initialPageSettings?: PhotonPageSettings;
	initialSite?: PhotonSite;
	registry: PhotonRegistry;
	workspace?: PhotonWorkspaceDescriptor;
	capabilities?: Partial<PhotonWorkspaceCapabilities>;
	initialMode?: PhotonMode;
	isAdmin?: boolean;
	i18n?: PhotonI18nValue | null;
	searchSite?: PhotonSearchHandler;
	requestAuth?: () => void;
	requestAuthAction?: PhotonInteractionActionPresentation;
	interactionSurfaces?: PhotonInteractionSurfaceDefinition[];
	interactionActions?: PhotonInteractionActionDefinition[];
	interactionGuards?: PhotonInteractionGuardDefinition[];
	interactionGuardEvaluators?: PhotonInteractionGuardEvaluatorMap;
	interactionPolicies?: PhotonActionPolicy[];
	conditionDefinitions?: PhotonConditionDefinition[];
	conditionEvaluators?: PhotonConditionEvaluatorMap;
	siteDataSchemas?: PhotonSiteDataSchema[];
	routeContextFields?: PhotonRouteContextField[];
	routeContextValues?: Record<string, unknown>;
	interactionSurfaceRenderers?: PhotonInteractionSurfaceRendererMap;
	navigate?: PhotonNavigateHandler;
	prefetch?: PhotonPrefetchHandler;
	renderAuthPage?: PhotonAuthPageRenderer;
	linkComponent?: PhotonLinkComponent;
	linkFactory?: PhotonLinkFactory;
	navigation?: PhotonNavigationConfig;
	siteFrameExtensions?: PhotonSiteFrameExtension[];
	accountTabs?: PhotonAccountTabExtension[];
};

const PhotonPublicContext = createContext<PhotonPublicContextValue | null>(
	null,
);

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

const followInteractionSurfaceFallback = (
	fallbackHref: string | undefined,
	navigate: PhotonNavigateHandler | undefined,
) => {
	if (!fallbackHref) {
		return;
	}

	if (navigate) {
		void navigate(fallbackHref);
	} else if (typeof window !== "undefined") {
		window.location.assign(fallbackHref);
	}
};

const findPhotonPublicBlock = (
	blocks: PhotonBlock[],
	blockId: string,
): PhotonBlock | null => {
	for (const block of blocks) {
		if (block.id === blockId) {
			return block;
		}

		for (const area of block.areas ?? []) {
			const nestedBlock = findPhotonPublicBlock(area.blocks, blockId);

			if (nestedBlock) {
				return nestedBlock;
			}
		}
	}

	return null;
};

const findPhotonPublicComponentSourceBlock = (
	site: PhotonSite,
	blockId: string,
): PhotonBlock | null => {
	const parsed = parsePhotonComponentLibraryBlockId(blockId);

	if (!parsed) {
		return null;
	}

	const item = getPhotonComponentLibraryItems(site.settings)[parsed.itemId];

	return item ? findPhotonPublicBlock(item.blocks, parsed.sourceBlockId) : null;
};

const getPhotonPublicFieldBinding = (block: PhotonBlock, path: string) => {
	if (!block.bindings) {
		return null;
	}

	const exactBinding = block.bindings[path];

	if (exactBinding) {
		return exactBinding;
	}

	const prefixMatch = Object.entries(block.bindings)
		.filter(([bindingPath]) => path.startsWith(`${bindingPath}.`))
		.sort(([leftPath], [rightPath]) => rightPath.length - leftPath.length)[0];

	if (!prefixMatch) {
		return null;
	}

	const [bindingPath, binding] = prefixMatch;
	const suffix = path.slice(bindingPath.length + 1);
	const sourcePath = binding.path ? `${binding.path}.${suffix}` : suffix;

	return {
		...binding,
		path: sourcePath,
	};
};

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
	searchSite,
	requestAuth,
	requestAuthAction,
	interactionSurfaces = [],
	interactionActions = [],
	interactionGuards = [],
	interactionGuardEvaluators = {},
	interactionPolicies = [],
	conditionDefinitions = [],
	conditionEvaluators = {},
	siteDataSchemas = [],
	routeContextFields = [],
	routeContextValues = {},
	interactionSurfaceRenderers = {},
	navigate,
	prefetch,
	renderAuthPage,
	linkComponent = DefaultPhotonLinkComponent,
	linkFactory = defaultPhotonLinkFactory,
	navigation = {},
	siteFrameExtensions = [],
	accountTabs = [],
}: PhotonPublicProviderProps) => {
	const [activeInteractionSurface, setActiveInteractionSurface] =
		useState<ReturnType<typeof resolvePhotonInteractionSurfaceRequest>>(null);
		const interactionSurfaceCatalog = useMemo(
			() =>
				resolvePhotonInteractionSurfaceCatalog({
					definitions: interactionSurfaces,
					siteSettings: initialSite.settings,
				}),
			[initialSite.settings, interactionSurfaces],
		);
		const interactionActionCatalog = useMemo(
			() =>
				resolvePhotonInteractionActionCatalog({
					actions: interactionActions,
					guards: interactionGuards,
					surfaces: interactionSurfaces,
					policies: interactionPolicies,
					siteSettings: initialSite.settings,
				}),
			[
				initialSite.settings,
				interactionActions,
				interactionGuards,
				interactionPolicies,
				interactionSurfaces,
			],
		);
	const showInteractionToast = useCallback<PhotonInteractionToastHandler>(
		(input) => {
			const template = resolvePhotonInteractionToastTemplate(
				input,
				interactionSurfaceCatalog,
			);

			if (!template) {
				return false;
			}

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

			return true;
		},
		[interactionSurfaceCatalog],
	);
	const openInteractionSurface =
		useCallback<PhotonInteractionSurfaceOpenHandler>(
			(trigger) => {
				const request = resolvePhotonInteractionSurfaceRequest(
					trigger,
					interactionSurfaceCatalog,
					);

					if (!request) {
						return false;
					}

				if (request.definition.kind === "toast") {
					return showInteractionToast({
						templateId: request.instance.id,
						overrides: {
							title:
								typeof request.props.title === "string"
									? request.props.title
									: undefined,
							description:
								typeof request.props.description === "string"
									? request.props.description
									: undefined,
							status:
								typeof request.props.status === "string"
									? (request.props.status as never)
									: undefined,
							props: request.props,
						},
						});
					}

					if (!interactionSurfaceRenderers[request.definition.rendererKey]) {
						return false;
					}

					setActiveInteractionSurface(request);
					return true;
				},
				[
					interactionSurfaceCatalog,
					interactionSurfaceRenderers,
					navigate,
					showInteractionToast,
				],
			);
		const executeInteractionAction = useCallback(
			(action: PhotonInteractionActionPresentation | undefined | null) =>
				executePhotonInteractionActionPresentation(action, {
					openInteractionSurface,
					showInteractionToast,
					navigate,
				}),
			[navigate, openInteractionSurface, showInteractionToast],
		);
	const executeInteractionTriggerSlot = useCallback(
		(
			slot: PhotonInteractionTriggerSlot,
			options?: {
				scenarioId?: string | null;
				scenario?: PhotonInteractionPreviewScenario | null;
			},
		) => {
			const scenarioResources = options?.scenario?.resources;
			const resources = scenarioResources
				? {
						...initialResources,
						...scenarioResources,
					}
				: initialResources;

			return executePhotonInteractionTriggerSlot({
				slot,
				catalog: interactionActionCatalog,
				evaluators: interactionGuardEvaluators,
				context: {
					document: initialDocument,
					resources,
					pageSettings: initialPageSettings,
					site: initialSite,
					mode: isAdmin ? initialMode : "preview",
					isAdmin,
					scenarioId: options?.scenario?.id ?? options?.scenarioId,
				},
				handlers: {
					openInteractionSurface,
					showInteractionToast,
					navigate,
				},
			});
		},
			[
				initialDocument,
				initialMode,
				initialPageSettings,
				initialResources,
				initialSite,
				interactionActionCatalog,
				interactionGuardEvaluators,
				isAdmin,
				navigate,
				openInteractionSurface,
				showInteractionToast,
			],
		);
		const resolvedRequestAuth = useCallback(() => {
				const executedAction = executeInteractionAction(requestAuthAction);

			if (photonInteractionExecutionSucceeded(executedAction)) {
				return;
			}

			requestAuth?.();
			}, [
				executeInteractionAction,
				requestAuth,
				requestAuthAction,
			]);
	const value = useMemo<PhotonPublicContextValue>(
		() => ({
			document: initialDocument,
			resources: initialResources,
			pageSettings: initialPageSettings,
			site: initialSite,
			registry,
			workspace: normalizePhotonWorkspaceDescriptor(workspace),
			capabilities: normalizePhotonWorkspaceCapabilities(capabilities),
			mode: isAdmin ? initialMode : "preview",
			isAdmin,
			searchSite,
				requestAuth: resolvedRequestAuth,
				openInteractionSurface,
				showInteractionToast,
				executeInteractionAction,
				executeInteractionTriggerSlot,
				navigate,
			prefetch,
			renderAuthPage,
			linkComponent,
			linkFactory,
			navigation,
			siteFrameExtensions,
				accountTabs,
				interactionSurfaces,
				interactionActions,
				interactionGuards,
				interactionGuardEvaluators,
				interactionPolicies,
				conditionDefinitions,
				conditionEvaluators,
				siteDataSchemas,
				routeContextFields,
				routeContextValues,
				interactionSurfaceRenderers,
			contentLocale: i18n?.contentLocale ?? "en",
			defaultLocale: i18n?.defaultLocale ?? "en",
		}),
		[
			accountTabs,
				capabilities,
				executeInteractionAction,
				executeInteractionTriggerSlot,
				i18n?.contentLocale,
			i18n?.defaultLocale,
			initialDocument,
			initialMode,
			initialPageSettings,
			initialResources,
			initialSite,
			isAdmin,
			linkFactory,
			linkComponent,
			navigation,
			registry,
			navigate,
			openInteractionSurface,
			prefetch,
			renderAuthPage,
			resolvedRequestAuth,
			searchSite,
				showInteractionToast,
				siteFrameExtensions,
				interactionSurfaces,
				interactionActions,
				interactionGuards,
				interactionGuardEvaluators,
				interactionPolicies,
				conditionDefinitions,
				conditionEvaluators,
				siteDataSchemas,
				routeContextFields,
				routeContextValues,
				interactionSurfaceRenderers,
			workspace,
		],
	);

	return (
		<PhotonI18nProvider value={i18n}>
			<PhotonPublicContext.Provider value={value}>
				{children}
				<PhotonInteractionSurfaceHost
					request={activeInteractionSurface}
					renderers={interactionSurfaceRenderers}
					onOpenChange={(open) => {
						if (!open) {
							setActiveInteractionSurface(null);
						}
					}}
				/>
			</PhotonPublicContext.Provider>
		</PhotonI18nProvider>
	);
};

export const usePhoton = () => {
	const context = useContext(PhotonPublicContext);

	if (!context) {
		throw new Error("usePhoton must be used within PhotonProvider");
	}

	return context;
};

export const usePhotonStore = <T,>(
	selector: (state: PhotonPublicContextValue) => T,
) => selector(usePhoton());

export const usePhotonFieldValue = (blockId: string, path: string): unknown => {
	const { document, resources, registry, site } = usePhoton();
	const block =
		findPhotonPublicBlock(document.blocks, blockId) ??
		findPhotonPublicComponentSourceBlock(site, blockId);

	if (!block) {
		return null;
	}

	const binding = getPhotonPublicFieldBinding(block, path);

	if (binding && binding.source in resources) {
		const adapter = binding.adapter
			? registry.getBindingAdapter(binding.adapter)
			: undefined;
		const rawValue = getValueAtPath(
			resources[binding.source] as Record<string, unknown>,
			binding.path,
		);

		return adapter?.read ? adapter.read(rawValue) : rawValue;
	}

	return getValueAtPath(block.props, path);
};

export const usePhotonCanEdit = () =>
	usePhotonStore(
		(state) =>
			state.isAdmin &&
			state.mode !== "preview" &&
			canEditPhotonWorkspace(state.workspace, state.capabilities),
	);

/**
 * Public-runtime variant of `usePhotonBlockActiveState`. Builder preview overrides
 * are not applicable here (production runtime), so resolution always falls back to
 * condition evaluation + server defaults.
 */
export const usePhotonBlockActiveState = (
	blockId: string,
): PhotonBlockActiveStateResolution => {
	const ctx = usePhoton();
	return useMemo(() => {
		const block =
			findPhotonPublicBlock(ctx.document.blocks, blockId) ??
			findPhotonPublicComponentSourceBlock(ctx.site, blockId);
		const definition = block
			? ctx.registry.getDefinition(block.module, block.type)
			: undefined;
		return resolvePhotonBlockActiveState({
			definition,
			evaluators: ctx.conditionEvaluators,
			context: {
				siteSettings: ctx.site.settings,
				resources: ctx.resources,
				routeContext: ctx.routeContextValues,
			},
		});
	}, [
		ctx.document.blocks,
		ctx.site,
		ctx.registry,
		ctx.conditionEvaluators,
		ctx.resources,
		ctx.routeContextValues,
		blockId,
	]);
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

export { DEFAULT_PHOTON_WORKSPACE_REF };
