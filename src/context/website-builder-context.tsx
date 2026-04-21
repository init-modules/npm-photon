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
	getWebsiteBuilderAnchorRel,
	sanitizeWebsiteBuilderLinkHref,
} from "../helpers/link-url";
import { cloneWebsiteBuilderValue } from "../helpers/path";
import { decomposeWebsiteBuilderSurfaceDocument } from "../helpers/site";
import {
	canEditWebsiteBuilderWorkspace,
	normalizeWebsiteBuilderWorkspaceCapabilities,
	normalizeWebsiteBuilderWorkspaceDescriptor,
} from "../helpers/workspace";
import { WebsiteBuilderI18nProvider } from "../i18n/website-builder-i18n-context";
import type {
	WebsiteBuilderAccountTabExtension,
	WebsiteBuilderI18nValue,
	WebsiteBuilderLinkComponent,
	WebsiteBuilderLinkComponentProps,
	WebsiteBuilderMediaUploadHandler,
	WebsiteBuilderMode,
	WebsiteBuilderPageSettings,
	WebsiteBuilderRegistry,
	WebsiteBuilderResources,
	WebsiteBuilderSearchHandler,
	WebsiteBuilderSite,
	WebsiteBuilderSiteFrameExtension,
	WebsiteBuilderWorkspaceCapabilities,
	WebsiteBuilderWorkspaceDescriptor,
} from "../types";
import { getWebsiteBuilderExternalStateFingerprint } from "./external-state";
import {
	createWebsiteBuilderStore,
	getWebsiteBuilderFieldValue,
	type WebsiteBuilderStore,
	type WebsiteBuilderStoreInit,
	type WebsiteBuilderStoreState,
} from "./website-builder-store";

const WebsiteBuilderContext = createContext<WebsiteBuilderStore | null>(null);

type WebsiteBuilderProviderProps = {
	children: ReactNode;
	initialDocument: WebsiteBuilderStoreInit["initialDocument"];
	initialResources?: WebsiteBuilderResources;
	initialPageSettings?: WebsiteBuilderPageSettings;
	initialSite?: WebsiteBuilderSite;
	registry: WebsiteBuilderRegistry;
	workspace?: WebsiteBuilderWorkspaceDescriptor;
	capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
	initialMode?: WebsiteBuilderMode;
	isAdmin?: boolean;
	i18n?: WebsiteBuilderI18nValue | null;
	uploadMedia?: WebsiteBuilderMediaUploadHandler;
	searchSite?: WebsiteBuilderSearchHandler;
	requestAuth?: () => void;
	linkComponent?: WebsiteBuilderLinkComponent;
	siteFrameExtensions?: WebsiteBuilderSiteFrameExtension[];
	accountTabs?: WebsiteBuilderAccountTabExtension[];
};

const DefaultWebsiteBuilderLinkComponent: WebsiteBuilderLinkComponent = ({
	href,
	locale: _locale,
	children,
	...props
}) =>
	createElement(
		"a",
		{
			...props,
			href: sanitizeWebsiteBuilderLinkHref(href),
			rel: getWebsiteBuilderAnchorRel(props.target, props.rel),
		},
		children,
	);

export const WebsiteBuilderProvider = ({
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
	linkComponent = DefaultWebsiteBuilderLinkComponent,
	siteFrameExtensions = [],
	accountTabs = [],
}: WebsiteBuilderProviderProps) => {
	const storeRef = useRef<WebsiteBuilderStore | null>(null);
	const externalStateFingerprint = useMemo(
		() =>
			getWebsiteBuilderExternalStateFingerprint({
				document: initialDocument,
				resources: initialResources,
				pageSettings: initialPageSettings,
				site: initialSite,
				workspace: normalizeWebsiteBuilderWorkspaceDescriptor(workspace),
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
		storeRef.current = createWebsiteBuilderStore({
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
			linkComponent,
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
			initialDocument: cloneWebsiteBuilderValue(initialDocument),
			initialResources: cloneWebsiteBuilderValue(initialResources),
			initialPageSettings: cloneWebsiteBuilderValue(initialPageSettings),
			initialSite: cloneWebsiteBuilderValue(initialSite),
			workspace: cloneWebsiteBuilderValue(
				normalizeWebsiteBuilderWorkspaceDescriptor(workspace),
			),
			capabilities: cloneWebsiteBuilderValue(
				normalizeWebsiteBuilderWorkspaceCapabilities(capabilities),
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
			const normalizedWorkspace =
				normalizeWebsiteBuilderWorkspaceDescriptor(workspace);
			const normalizedCapabilities =
				normalizeWebsiteBuilderWorkspaceCapabilities(capabilities);
			const nextMode = !isAdmin ? "preview" : state.mode;
			const nextEditable =
				isAdmin &&
				canEditWebsiteBuilderWorkspace(
					normalizedWorkspace,
					normalizedCapabilities,
				);

			if (
				state.isAdmin === isAdmin &&
				state.uploadMedia === uploadMedia &&
				state.searchSite === searchSite &&
				state.requestAuth === requestAuth &&
				state.linkComponent === linkComponent &&
				JSON.stringify(state.siteFrameExtensions) ===
					JSON.stringify(siteFrameExtensions) &&
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
				linkComponent,
				siteFrameExtensions: cloneWebsiteBuilderValue(siteFrameExtensions),
				accountTabs: cloneWebsiteBuilderValue(accountTabs),
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
		linkComponent,
		siteFrameExtensions,
		accountTabs,
		requestAuth,
		searchSite,
		uploadMedia,
		workspace,
	]);

	return (
		<WebsiteBuilderI18nProvider value={i18n}>
			<WebsiteBuilderContext.Provider value={storeRef.current}>
				{children}
			</WebsiteBuilderContext.Provider>
		</WebsiteBuilderI18nProvider>
	);
};

export const useWebsiteBuilderStoreApi = () => {
	const context = useContext(WebsiteBuilderContext);

	if (!context) {
		throw new Error(
			"useWebsiteBuilder must be used within WebsiteBuilderProvider",
		);
	}

	return context;
};

export const useWebsiteBuilderStore = <T,>(
	selector: (state: WebsiteBuilderStoreState) => T,
) => {
	const store = useWebsiteBuilderStoreApi();

	return useStore(store, selector);
};

export const useWebsiteBuilder = () => {
	const store = useWebsiteBuilderStoreApi();

	return useStore(store);
};

export const useWebsiteBuilderFieldValue = (
	blockId: string,
	path: string,
): unknown =>
	useWebsiteBuilderStore((state) =>
		getWebsiteBuilderFieldValue(state, blockId, path),
	);

export const useWebsiteBuilderCanEdit = () =>
	useWebsiteBuilderStore(
		(state) =>
			state.isAdmin &&
			state.mode !== "preview" &&
			canEditWebsiteBuilderWorkspace(state.workspace, state.capabilities),
	);

export const useWebsiteBuilderPersistedState = () => {
	const document = useWebsiteBuilderStore((state) => state.document);
	const resources = useWebsiteBuilderStore((state) => state.resources);
	const pageSettings = useWebsiteBuilderStore((state) => state.pageSettings);
	const site = useWebsiteBuilderStore((state) => state.site);

	return useMemo(() => {
		const persistedState = decomposeWebsiteBuilderSurfaceDocument(
			document,
			site,
		);

		return {
			document: persistedState.pageDocument,
			resources,
			pageSettings,
			site: persistedState.site,
		};
	}, [document, resources, pageSettings, site]);
};

type WebsiteBuilderLinkProps = WebsiteBuilderLinkComponentProps & {
	navigateInPreviewOnly?: boolean;
};

export const WebsiteBuilderLink = ({
	navigateInPreviewOnly = true,
	onClick,
	...props
}: WebsiteBuilderLinkProps) => {
	const mode = useWebsiteBuilderStore((state) => state.mode);
	const LinkComponent = useWebsiteBuilderStore((state) => state.linkComponent);
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
