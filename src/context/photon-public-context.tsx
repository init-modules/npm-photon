"use client";

import {
	createContext,
	createElement,
	type ReactNode,
	useContext,
	useMemo,
} from "react";
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
import { PhotonI18nProvider } from "../i18n/photon-i18n-context";
import type {
	PhotonAccountTabExtension,
	PhotonBlock,
	PhotonDocument,
	PhotonI18nValue,
	PhotonLinkComponent,
	PhotonLinkComponentProps,
	PhotonMode,
	PhotonNavigationConfig,
	PhotonPageSettings,
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
	linkComponent: PhotonLinkComponent;
	navigation: PhotonNavigationConfig;
	siteFrameExtensions: PhotonSiteFrameExtension[];
	accountTabs: PhotonAccountTabExtension[];
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
	linkComponent?: PhotonLinkComponent;
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
	linkComponent = DefaultPhotonLinkComponent,
	navigation = {},
	siteFrameExtensions = [],
	accountTabs = [],
}: PhotonPublicProviderProps) => {
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
			requestAuth,
			linkComponent,
			navigation,
			siteFrameExtensions,
			accountTabs,
			contentLocale: i18n?.contentLocale ?? "en",
			defaultLocale: i18n?.defaultLocale ?? "en",
		}),
		[
			accountTabs,
			capabilities,
			i18n?.contentLocale,
			i18n?.defaultLocale,
			initialDocument,
			initialMode,
			initialPageSettings,
			initialResources,
			initialSite,
			isAdmin,
			linkComponent,
			navigation,
			registry,
			requestAuth,
			searchSite,
			siteFrameExtensions,
			workspace,
		],
	);

	return (
		<PhotonI18nProvider value={i18n}>
			<PhotonPublicContext.Provider value={value}>
				{children}
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
	const { document, resources, registry } = usePhoton();
	const block = findPhotonPublicBlock(document.blocks, blockId);

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
