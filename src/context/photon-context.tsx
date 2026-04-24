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
import { useStore } from "zustand";
import {
	getPhotonAnchorRel,
	sanitizePhotonLinkHref,
} from "../helpers/link-url";
import { clonePhotonValue } from "../helpers/path";
import { decomposePhotonSurfaceDocument } from "../helpers/site";
import {
	canEditPhotonWorkspace,
	normalizePhotonWorkspaceCapabilities,
	normalizePhotonWorkspaceDescriptor,
} from "../helpers/workspace";
import { PhotonI18nProvider } from "../i18n/photon-i18n-context";
import type {
	PhotonAccountTabExtension,
	PhotonI18nValue,
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
	PhotonSearchHandler,
	PhotonSite,
	PhotonSiteFrameExtension,
	PhotonWorkspaceCapabilities,
	PhotonWorkspaceDescriptor,
} from "../types";
import { getPhotonExternalStateFingerprint } from "./external-state";
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
	navigate?: PhotonNavigateHandler;
	prefetch?: PhotonPrefetchHandler;
	linkComponent?: PhotonLinkComponent;
	linkFactory?: PhotonLinkFactory;
	navigation?: PhotonNavigationConfig;
	siteFrameExtensions?: PhotonSiteFrameExtension[];
	accountTabs?: PhotonAccountTabExtension[];
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
	navigate,
	prefetch,
	linkComponent = DefaultPhotonLinkComponent,
	linkFactory = defaultPhotonLinkFactory,
	navigation = {},
	siteFrameExtensions = [],
	accountTabs = [],
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
	const lastExternalStateFingerprintRef = useRef<string | null>(null);

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
			navigate,
			prefetch,
			linkComponent,
			linkFactory,
			navigation,
			siteFrameExtensions,
			accountTabs,
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
				state.requestAuth === requestAuth &&
				state.navigate === navigate &&
				state.prefetch === prefetch &&
				state.linkComponent === linkComponent &&
				state.linkFactory === linkFactory &&
				JSON.stringify(state.navigation) === JSON.stringify(navigation) &&
				state.siteFrameExtensions === siteFrameExtensions &&
				JSON.stringify(state.accountTabs) === JSON.stringify(accountTabs) &&
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
				requestAuth,
				navigate,
				prefetch,
				linkComponent,
				linkFactory,
				navigation: clonePhotonValue(navigation),
				siteFrameExtensions,
				accountTabs: clonePhotonValue(accountTabs),
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
		requestAuth,
		searchSite,
		uploadMedia,
		workspace,
	]);

	return (
		<PhotonI18nProvider value={i18n}>
			<PhotonContext.Provider value={storeRef.current}>
				{children}
			</PhotonContext.Provider>
		</PhotonI18nProvider>
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
