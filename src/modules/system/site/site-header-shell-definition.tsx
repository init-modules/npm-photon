"use client";

import clsx from "clsx";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EditableImage } from "../../../components/public/public-editable-image";
import { EditableText } from "../../../components/public/public-editable-text";
import { PhotonLink, usePhotonStore } from "../../../context/photon-context";
import {
	createPhotonLocalizedDefault,
	definePhotonBlockDefinition,
} from "../../../helpers/document";
import { isPhotonPublicFramelessSiteDesign } from "../../../helpers/public-site-design";
import {
	collectPhotonHeaderExtensionItems,
	resolvePhotonSiteFrameExtensions,
} from "../../../helpers/site-frame-extensions";
import { usePhotonI18n } from "../../../i18n/photon-i18n-context";
import { PhotonSiteSearch } from "../../../search/photon-site-search";
import type {
	PhotonBlockComponentProps,
	PhotonBlockInteractionSlotContext,
	PhotonField,
	PhotonInteractionActionPresentation,
	PhotonSiteFrameMobileControls,
	PhotonSiteFrameActionItem,
	PhotonSiteFrameExtensionContext,
} from "../../../types";
import {
	normalizePhotonSiteLinkItems,
	normalizePhotonSiteStringItems,
} from "./helpers";
import {
	collectHeaderActionLinkKeys,
	collectUniqueHeaderLinks,
	getHeaderActionVisibleHref,
	getHeaderLinkDedupeKey,
	normalizeHeaderHref,
} from "./site-header-links";
import {
	resolvePhotonSiteFrameMobileControls,
	usePhotonSiteFrameScrollLock,
} from "./site-mobile-frame";
import { createPhotonSiteSearchTriggerSlot } from "./site-interaction-surfaces";

type SiteHeaderProps = {
	variant?: "commerce-inline" | "showcase-card";
	brandLabel: string;
	brandHref: string;
	logoImage: unknown;
	utilityLinks: Array<{ label: string; href: string }>;
	catalogLabel: string;
	searchPlaceholder: string;
	contactValue: string;
	contactCaption: string;
	primaryCtaLabel: string;
	primaryCtaHref: string;
	secondaryCtaLabel: string;
	secondaryCtaHref: string;
	showLoginAction: boolean;
	loginLabel: string;
	sticky: boolean;
	mobile?: PhotonSiteFrameMobileControls;
	compactOnScroll: boolean;
	showLocaleSwitcher?: boolean;
	categoryLinks: Array<{ label: string; href: string }>;
	disabledExtensionIds?: string[];
	disabledExtensionItemIds?: string[];
};

const resolveSiteHeaderInteractionSlots = ({
	block,
	document,
	resources,
	pageSettings,
	site,
	mode,
	isAdmin,
	siteFrameExtensions,
}: PhotonBlockInteractionSlotContext) => {
	const props = block.props as SiteHeaderProps;
	const disabledExtensionIds = normalizePhotonSiteStringItems(
		props.disabledExtensionIds,
	);
	const disabledExtensionItemIds = normalizePhotonSiteStringItems(
		props.disabledExtensionItemIds,
	);
	const extensionContext: PhotonSiteFrameExtensionContext = {
		document,
		resources,
		pageSettings,
		site,
		mode,
		isAdmin,
		currentRoute: document.route,
	};
	const headerExtensionItems = collectPhotonHeaderExtensionItems(
		resolvePhotonSiteFrameExtensions(siteFrameExtensions, disabledExtensionIds),
		disabledExtensionItemIds,
		extensionContext,
	);

	return [
		createPhotonSiteSearchTriggerSlot(`${block.id}.search`),
		...headerExtensionItems.slots.actions.actions.flatMap((action) =>
			action.triggerSlot
				? [
						{
							...action.triggerSlot,
							id: `${block.id}.${action.triggerSlot.id}`,
							action:
								action.triggerSlot.action ??
								action.action ??
								(action.interaction
									? {
											type: "surface" as const,
											...action.interaction,
										}
									: undefined),
						},
					]
				: action.action || action.interaction
					? [
							{
								id: `${block.id}.${action.id ?? action.label}`,
								label: action.label,
								action:
									action.action ??
									({
										type: "surface" as const,
										...action.interaction,
									}),
							},
						]
					: [],
		),
	];
};

const siteHeaderFields: PhotonField[] = [
	{
		path: "variant",
		label: "Variant",
		kind: "select",
		group: "style",
		localization: "shared",
		options: [
			{ label: "Commerce inline", value: "commerce-inline" },
			{ label: "Showcase card", value: "showcase-card" },
		],
	},
	{
		path: "brandLabel",
		label: "Brand label",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "brandHref",
		label: "Brand href",
		kind: "url",
		group: "content",
		localization: "shared",
	},
	{
		path: "logoImage",
		label: "Logo image",
		kind: "image",
		group: "content",
		localization: "shared",
	},
	{
		path: "utilityLinks",
		label: "Utility links",
		kind: "repeater",
		group: "content",
		localization: "localized",
		itemLabelPath: "label",
		addLabel: "Add utility link",
		fields: [
			{ path: "label", label: "Label", kind: "text" },
			{ path: "href", label: "Href", kind: "url", localization: "shared" },
		],
	},
	{
		path: "catalogLabel",
		label: "Catalog label",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "searchPlaceholder",
		label: "Search placeholder",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "contactValue",
		label: "Contact value",
		kind: "text",
		group: "content",
		localization: "shared",
	},
	{
		path: "contactCaption",
		label: "Contact caption",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "primaryCtaLabel",
		label: "Primary CTA label",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "primaryCtaHref",
		label: "Primary CTA href",
		kind: "url",
		group: "content",
		localization: "shared",
	},
	{
		path: "secondaryCtaLabel",
		label: "Secondary CTA label",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "secondaryCtaHref",
		label: "Secondary CTA href",
		kind: "url",
		group: "content",
		localization: "shared",
	},
	{
		path: "showLoginAction",
		label: "Show login action",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
	{
		path: "loginLabel",
		label: "Login label",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "sticky",
		label: "Sticky header",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
	{
		path: "mobile.sticky",
		label: "Sticky on mobile",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
	{
		path: "mobile.menu.type",
		label: "Mobile menu type",
		kind: "select",
		group: "layout",
		localization: "shared",
		options: [
			{ label: "Inline", value: "inline" },
			{ label: "Drawer", value: "drawer" },
			{ label: "Fullscreen", value: "fullscreen" },
		],
	},
	{
		path: "mobile.menu.triggerPlacement",
		label: "Mobile burger placement",
		kind: "select",
		group: "layout",
		localization: "shared",
		options: [
			{ label: "Fixed", value: "fixed" },
			{ label: "Header", value: "header" },
			{ label: "Hidden", value: "hidden" },
		],
	},
	{
		path: "mobile.menu.scrollLock",
		label: "Lock scroll when mobile menu is open",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
	{
		path: "mobile.menu.floating",
		label: "Floating mobile burger",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
	{
		path: "mobile.menu.disableFloatingOnSmallScreens",
		label: "Disable floating burger on small screens",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
	{
		path: "mobile.bottomMenu.enabled",
		label: "Show mobile bottom menu",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
	{
		path: "mobile.bottomMenu.showBurger",
		label: "Show burger in bottom menu",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
	{
		path: "mobile.bottomMenu.floating",
		label: "Floating mobile bottom menu",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
	{
		path: "mobile.bottomMenu.disableFloatingOnSmallScreens",
		label: "Disable floating bottom menu on small screens",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
	{
		path: "compactOnScroll",
		label: "Compact on scroll",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
	{
		path: "showLocaleSwitcher",
		label: "Show locale switcher",
		labelKey: "photon.system.siteHeader.showLocaleSwitcher.label",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
	{
		path: "categoryLinks",
		label: "Category links",
		kind: "repeater",
		group: "content",
		localization: "localized",
		itemLabelPath: "label",
		addLabel: "Add category link",
		fields: [
			{ path: "label", label: "Label", kind: "text" },
			{ path: "href", label: "Href", kind: "url", localization: "shared" },
		],
	},
	{
		path: "disabledExtensionIds",
		label: "Disabled package extensions",
		kind: "tags",
		group: "layout",
		localization: "shared",
	},
	{
		path: "disabledExtensionItemIds",
		label: "Disabled package extension items",
		kind: "tags",
		group: "layout",
		localization: "shared",
	},
];

const SiteHeaderShell = ({
	block,
}: PhotonBlockComponentProps<SiteHeaderProps>) => {
	const isAdmin = usePhotonStore((state) => state.isAdmin);
	const mode = usePhotonStore((state) => state.mode);
	const currentRoute = usePhotonStore((state) => state.document.route);
	const document = usePhotonStore((state) => state.document);
	const requestAuth = usePhotonStore((state) => state.requestAuth);
	const openInteractionSurface = usePhotonStore(
		(state) => state.openInteractionSurface,
	);
	const showInteractionToast = usePhotonStore(
		(state) => state.showInteractionToast,
	);
	const executeInteractionAction = usePhotonStore(
		(state) => state.executeInteractionAction,
	);
	const executeInteractionTriggerSlot = usePhotonStore(
		(state) => state.executeInteractionTriggerSlot,
	);
	const resources = usePhotonStore((state) => state.resources);
	const pageSettings = usePhotonStore((state) => state.pageSettings);
	const site = usePhotonStore((state) => state.site);
	const siteDesign = usePhotonStore((state) => state.site.settings.design);
	const siteFrameExtensions = usePhotonStore(
		(state) => state.siteFrameExtensions,
	);
	const { locale, publicLocales, translate } = usePhotonI18n();
	const [isCompact, setIsCompact] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const headerRef = useRef<HTMLElement | null>(null);
	const disabledExtensionIds = normalizePhotonSiteStringItems(
		block.props.disabledExtensionIds,
	);
	const disabledExtensionItemIds = normalizePhotonSiteStringItems(
		block.props.disabledExtensionItemIds,
	);
	const extensionContext: PhotonSiteFrameExtensionContext = {
		document,
		resources,
		pageSettings,
		site,
		mode,
		isAdmin,
		currentRoute,
	};
	const headerExtensionItems = collectPhotonHeaderExtensionItems(
		resolvePhotonSiteFrameExtensions(siteFrameExtensions, disabledExtensionIds),
		disabledExtensionItemIds,
		extensionContext,
	);
	const rawUtilityLinks = [
		...normalizePhotonSiteLinkItems(block.props.utilityLinks),
		...normalizePhotonSiteLinkItems(headerExtensionItems.slots.utility.links),
	];
	const prominentCategoryLink =
		normalizePhotonSiteLinkItems(headerExtensionItems.slots.prominent.links)[0] ??
		null;
	const rawCategoryLinks = [
		...normalizePhotonSiteLinkItems(block.props.categoryLinks),
		...normalizePhotonSiteLinkItems(headerExtensionItems.slots.navigation.links),
	];
	const variant = block.props.variant ?? "commerce-inline";
	const mobileControls = resolvePhotonSiteFrameMobileControls(block.props.mobile);
	const mobileMenuType = mobileControls.menu.type;
	const liveSurfaceMode = mode !== "builder";
	const compact = liveSurfaceMode && block.props.compactOnScroll && isCompact;
	const framelessSite = isPhotonPublicFramelessSiteDesign(siteDesign);
	const isShowcaseCard = variant === "showcase-card" && !framelessSite;
	const localeSwitcherVisible =
		block.props.showLocaleSwitcher !== false && publicLocales.length > 1;
	const rawExtensionActions = collectUniqueHeaderLinks<PhotonSiteFrameActionItem>(
		[
			...headerExtensionItems.slots.actions.links,
			...headerExtensionItems.slots.actions.actions,
		],
	).filter((action) => {
		const visibleHref = getHeaderActionVisibleHref(action);

		return (
			Boolean(action.component) ||
			Boolean(action.interaction) ||
			normalizeHeaderHref(visibleHref) !== ""
		);
	});
	const extensionActions = rawExtensionActions;
	const extensionActionLinkKeys = collectHeaderActionLinkKeys(extensionActions);
	const secondaryCtaLinkKey = getHeaderLinkDedupeKey(
		block.props.secondaryCtaHref,
	);
	const primaryCtaLinkKey = getHeaderLinkDedupeKey(block.props.primaryCtaHref);
	const shouldRenderSecondaryCta =
		normalizeHeaderHref(block.props.secondaryCtaHref) !== "" &&
		!extensionActionLinkKeys.has(secondaryCtaLinkKey);
	const shouldRenderPrimaryCta =
		normalizeHeaderHref(block.props.primaryCtaHref) !== "" &&
		(!extensionActionLinkKeys.has(primaryCtaLinkKey) ||
			primaryCtaLinkKey === secondaryCtaLinkKey);
	const prominentLinkKeys = new Set(extensionActionLinkKeys);

	if (prominentCategoryLink) {
		prominentLinkKeys.add(getHeaderLinkDedupeKey(prominentCategoryLink.href));
	}

	if (shouldRenderPrimaryCta) {
		prominentLinkKeys.add(primaryCtaLinkKey);
	}

	if (shouldRenderSecondaryCta) {
		prominentLinkKeys.add(secondaryCtaLinkKey);
	}

	const categoryLinks = collectUniqueHeaderLinks(
		rawCategoryLinks,
		prominentLinkKeys,
	);
	const categoryLinkKeys = new Set(
		categoryLinks.map((link) => getHeaderLinkDedupeKey(link.href)),
	);
	const utilityLinks = collectUniqueHeaderLinks(
		rawUtilityLinks,
		new Set([...prominentLinkKeys, ...categoryLinkKeys]),
	);

	const renderSmartLink = (
		link: { label: string; href: string; target?: string; rel?: string },
		className: string,
		key: string,
		onClick?: () => void,
	) => {
		return (
			<PhotonLink
				key={key}
				href={link.href}
				target={link.target}
				rel={link.rel}
				className={className}
				onClick={onClick}
			>
				{link.label}
			</PhotonLink>
		);
	};

	const renderExtensionAction = (
		action: PhotonSiteFrameActionItem,
		keySuffix = "",
		classNameOverride?: string,
		onAction?: () => void,
	) => {
		const appearance = action.appearance ?? "secondary";
		const className = clsx(
			classNameOverride ??
				"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-3 text-sm font-semibold leading-none transition",
			!classNameOverride &&
				(appearance === "primary"
					? "bg-[var(--photon-site-accent)] text-white shadow-[0_18px_34px_rgba(15,118,110,0.28)] hover:translate-y-[-1px]"
					: appearance === "ghost"
						? "text-[var(--photon-site-text)] hover:text-[var(--photon-site-accent)]"
						: "border border-[var(--photon-site-border)] text-[var(--photon-site-text)] hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]"),
		);

		if (action.component) {
			const ActionComponent = action.component;
			const componentAction = action.triggerSlot
				? {
						...action,
						triggerSlot: {
							...action.triggerSlot,
							id: `${block.id}.${action.triggerSlot.id}`,
							action: action.triggerSlot.action ?? action.action,
						},
					}
				: action;

			return (
				<ActionComponent
					key={`${action.id ?? `${action.label}:${action.href}`}${keySuffix}`}
					action={componentAction}
					className={className}
					context={extensionContext}
					requestAuth={requestAuth}
					openInteractionSurface={openInteractionSurface}
					showInteractionToast={showInteractionToast}
					executeInteractionAction={executeInteractionAction}
					executeInteractionTriggerSlot={executeInteractionTriggerSlot}
				/>
			);
		}

		const actionPresentation: PhotonInteractionActionPresentation | undefined =
			action.action ??
			(action.interaction
				? {
						type: "surface",
						...action.interaction,
					}
				: undefined);

		if (actionPresentation?.type === "surface") {
			const interaction = actionPresentation;
			const triggerSlot = action.triggerSlot
				? {
						...action.triggerSlot,
						id: `${block.id}.${action.triggerSlot.id}`,
						action: interaction,
					}
				: null;

			return (
				<button
					key={`${action.id ?? `${action.label}:${action.href}`}${keySuffix}`}
					type="button"
					onClick={() => {
						onAction?.();
						if (triggerSlot) {
							executeInteractionTriggerSlot(triggerSlot);
						} else {
							executeInteractionAction({
								...interaction,
								fallbackHref: interaction.fallbackHref ?? action.href,
							});
						}
					}}
					className={clsx(className, "cursor-pointer")}
				>
					<span>{action.label}</span>
				</button>
			);
		}

		if (actionPresentation?.type === "toast") {
			return (
				<button
					key={`${action.id ?? `${action.label}:${action.href}`}${keySuffix}`}
					type="button"
					onClick={() => {
						onAction?.();
						executeInteractionAction(actionPresentation);
					}}
					className={clsx(className, "cursor-pointer")}
				>
					<span>{action.label}</span>
				</button>
			);
		}

		if (actionPresentation?.type === "link") {
			return renderSmartLink(
				{
					label: action.label,
					href: actionPresentation.href,
					target: actionPresentation.target,
					rel: actionPresentation.rel,
				},
				className,
				`${action.id ?? `${action.label}:${action.href}`}${keySuffix}`,
				onAction,
			);
		}

		return renderSmartLink(
			action,
			className,
			`${action.id ?? `${action.label}:${action.href}`}${keySuffix}`,
			onAction,
		);
	};

	const closeMobileMenu = () => setMobileMenuOpen(false);
	const mobileLinkClassName =
		"flex min-h-11 items-center rounded-2xl px-3 text-sm font-semibold text-[var(--photon-site-text)] transition hover:bg-[var(--photon-site-background)] hover:text-[var(--photon-site-accent)]";
	const mobileActionClassName =
		"inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--photon-site-border)] bg-[var(--photon-site-surface)] px-4 py-3 text-sm font-semibold text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]";
	const mobileBottomLinks = collectUniqueHeaderLinks([
		...(prominentCategoryLink ? [prominentCategoryLink] : []),
		...categoryLinks,
		...utilityLinks,
	]).slice(0, 4);
	const mobileBottomMenuVisible =
		mobileControls.bottomMenu.enabled &&
		(mobileBottomLinks.length > 0 ||
			mobileControls.bottomMenu.showBurger);
	const mobileFixedTriggerVisible =
		mobileControls.menu.triggerPlacement === "fixed";
	const mobileInlineTriggerVisible =
		mobileControls.menu.triggerPlacement === "header";
	const mobileMenuFloating = mobileControls.menu.floating;
	const mobileBottomMenuFloating = mobileControls.bottomMenu.floating;
	const mobileMenuPanelClassName = clsx(
		"fixed overflow-y-auto border border-[var(--photon-site-border)] bg-[var(--photon-site-surface)] p-5 text-[var(--photon-site-text)] opacity-0 shadow-[0_26px_80px_rgba(15,23,42,0.22)] transition-[opacity,transform] duration-300 ease-in-out",
		mobileMenuOpen
			? "pointer-events-auto translate-x-0 translate-y-0 opacity-100"
			: "pointer-events-none opacity-0",
		mobileMenuType === "fullscreen"
			? clsx(
					"bottom-0 left-0 top-[var(--photon-dock-offset,0px)] w-[100dvw] max-w-[100dvw] rounded-none border-0",
					!mobileMenuOpen && "translate-y-4 scale-[0.98]",
				)
			: mobileMenuType === "drawer"
				? clsx(
						"bottom-0 left-0 top-[var(--photon-dock-offset,0px)] w-[100dvw] max-w-[100dvw] rounded-none border-0",
						!mobileMenuOpen && "translate-x-full",
					)
				: clsx(
						"left-3 right-3 top-[calc(var(--photon-dock-offset,0px)+4.75rem)] max-h-[calc(100dvh-var(--photon-dock-offset,0px)-6rem)] rounded-[28px]",
						!mobileMenuOpen && "-translate-y-3 scale-[0.98]",
					),
	);

	const mobileFixedTriggerClassName = clsx(
		"fixed",
		mobileMenuFloating
			? "left-[calc(100dvw-3.75rem)] right-auto rounded-2xl"
			: "left-[calc(100dvw-3rem)] right-auto rounded-l-2xl",
		mobileControls.menu.floating &&
			mobileControls.menu.disableFloatingOnSmallScreens &&
			"max-[420px]:left-[calc(100dvw-3rem)] max-[420px]:right-auto max-[420px]:rounded-l-2xl max-[420px]:rounded-r-none max-[420px]:border-r-0",
		"z-[60] inline-flex h-12 w-12 cursor-pointer items-center justify-center border border-[var(--photon-site-border)] bg-[color-mix(in_srgb,var(--photon-site-surface)_94%,white)] text-[var(--photon-site-text)] opacity-100 shadow-[0_18px_44px_rgba(15,23,42,0.16)] backdrop-blur-xl transition-[background-color,border-color,color,transform] duration-300 ease-in-out hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)] md:hidden",
		!mobileMenuFloating && "rounded-r-none border-r-0",
	);

	const mobileBottomMenuClassName = clsx(
		"fixed z-[50] border border-[var(--photon-site-border)] bg-[color-mix(in_srgb,var(--photon-site-surface)_94%,white)] px-2 text-[var(--photon-site-text)] opacity-100 shadow-[0_22px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden",
		mobileBottomMenuFloating
			? "bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-3 right-auto w-[calc(100dvw-1.5rem)] rounded-[26px] py-2"
			: "bottom-0 left-0 right-auto w-[100dvw] rounded-none border-x-0 border-b-0 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2",
		mobileControls.bottomMenu.floating &&
			mobileControls.bottomMenu.disableFloatingOnSmallScreens &&
			"max-[420px]:bottom-0 max-[420px]:left-0 max-[420px]:right-auto max-[420px]:w-[100dvw] max-[420px]:rounded-none max-[420px]:border-x-0 max-[420px]:border-b-0 max-[420px]:pb-[calc(env(safe-area-inset-bottom)+0.5rem)] max-[420px]:pt-2",
	);

	const renderMobileMenuContent = (keySuffix = "") => (
		<div className="flex flex-col gap-4">
			<PhotonSiteSearch
				blockId={block.id}
				placeholderPath="searchPlaceholder"
			/>
			<div className="grid gap-1">
				{prominentCategoryLink
					? renderSmartLink(
							prominentCategoryLink,
							mobileLinkClassName,
							`${prominentCategoryLink.label}:${prominentCategoryLink.href}:mobile-prominent${keySuffix}`,
							closeMobileMenu,
						)
					: null}
				{categoryLinks.map((link) =>
					renderSmartLink(
						link,
						mobileLinkClassName,
						`${link.label}:${link.href}:mobile-category${keySuffix}`,
						closeMobileMenu,
					),
				)}
				{utilityLinks.map((link) =>
					renderSmartLink(
						link,
						mobileLinkClassName,
						`${link.label}:${link.href}:mobile-utility${keySuffix}`,
						closeMobileMenu,
					),
				)}
			</div>
			{localeSwitcherVisible ? (
				<div
					data-photon-locale-switcher="true"
					className="flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--photon-site-border)] bg-[var(--photon-site-background)] px-2 py-2"
				>
					<div className="px-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--photon-site-muted)]">
						{translate("photon.localeSwitcher.label", "Language")}
					</div>
					{publicLocales.map((item) => (
						<PhotonLink
							key={`${item.code}:mobile${keySuffix}`}
							href={currentRoute}
							locale={item.code}
							data-photon-locale-option={item.code}
							onClick={closeMobileMenu}
							className={clsx(
								"rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
								item.code === locale
									? "bg-[var(--photon-site-accent)] text-white"
									: "text-[var(--photon-site-muted)] hover:text-[var(--photon-site-text)]",
							)}
						>
							{item.label}
						</PhotonLink>
					))}
				</div>
			) : null}
			<div className="grid gap-2">
				{shouldRenderSecondaryCta ? (
					<PhotonLink
						href={block.props.secondaryCtaHref}
						onClick={closeMobileMenu}
						className={mobileActionClassName}
					>
						<EditableText
							blockId={block.id}
							path="secondaryCtaLabel"
							className="font-semibold"
						/>
					</PhotonLink>
				) : null}
				{shouldRenderPrimaryCta ? (
					<PhotonLink
						href={block.props.primaryCtaHref}
						onClick={closeMobileMenu}
						className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--photon-site-accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(15,118,110,0.24)] transition hover:translate-y-[-1px]"
					>
						<EditableText
							blockId={block.id}
							path="primaryCtaLabel"
							className="font-semibold text-white"
						/>
						<ArrowRight className="h-4 w-4" />
					</PhotonLink>
				) : null}
				{extensionActions.map((action) =>
					renderExtensionAction(
						action,
						`:mobile${keySuffix}`,
						mobileActionClassName,
						closeMobileMenu,
					),
				)}
			</div>
			<div className="grid gap-1 text-sm">
				<EditableText
					blockId={block.id}
					path="contactCaption"
					className="text-[var(--photon-site-muted)]"
				/>
				<EditableText
					blockId={block.id}
					path="contactValue"
					className="font-semibold text-[var(--photon-site-text)]"
				/>
			</div>
		</div>
	);

	usePhotonSiteFrameScrollLock(
		mobileMenuOpen && mobileControls.menu.scrollLock,
	);

	useEffect(() => {
		if (
			typeof window === "undefined" ||
			!block.props.compactOnScroll ||
			!liveSurfaceMode
		) {
			setIsCompact(false);
			return;
		}

		const sync = () => setIsCompact(window.scrollY > 36);
		sync();
		window.addEventListener("scroll", sync, { passive: true });

		return () => window.removeEventListener("scroll", sync);
	}, [block.props.compactOnScroll, liveSurfaceMode]);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const root =
			window.document.documentElement instanceof HTMLElement
				? window.document.documentElement
				: null;

		if (!root) {
			return;
		}

		const syncHeaderHeight = () => {
			root.style.setProperty(
				"--photon-site-header-height",
				liveSurfaceMode && block.props.sticky && headerRef.current
					? `${headerRef.current.offsetHeight}px`
					: "0px",
			);
		};

		syncHeaderHeight();

		if (!headerRef.current || typeof ResizeObserver === "undefined") {
			return () => {
				root.style.setProperty("--photon-site-header-height", "0px");
			};
		}

		const observer = new ResizeObserver(() => {
			syncHeaderHeight();
		});
		observer.observe(headerRef.current);

		return () => {
			observer.disconnect();
			root.style.setProperty("--photon-site-header-height", "0px");
		};
	}, [block.props.sticky, liveSurfaceMode, compact, localeSwitcherVisible]);

	return (
		<header
			ref={headerRef}
			className={clsx(
				"relative",
				liveSurfaceMode && "z-40",
				isShowcaseCard ? "pt-[var(--photon-site-gutter,24px)]" : "pt-0",
			)}
		>
			{mobileFixedTriggerVisible && !mobileMenuOpen ? (
				<button
					type="button"
					aria-label="Open menu"
					aria-expanded={mobileMenuOpen}
					onClick={() => setMobileMenuOpen((value) => !value)}
					className={mobileFixedTriggerClassName}
					style={{
						top: "calc(var(--photon-dock-offset, 0px) + env(safe-area-inset-top) + 0.75rem)",
					}}
				>
					<Menu className="h-5 w-5 transition-transform duration-300 ease-in-out" />
				</button>
			) : null}
			<div
				className={clsx(
					"border-b border-[var(--photon-site-border)] text-[var(--photon-site-text)] transition-[box-shadow,background-color,border-radius] duration-300",
					framelessSite
						? clsx(
								"rounded-none border-x-0 border-t-0 bg-[color-mix(in_srgb,var(--photon-site-surface)_92%,white)] shadow-none",
								block.props.sticky &&
									compact &&
									"bg-[color-mix(in_srgb,var(--photon-site-surface)_96%,white)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]",
							)
						: isShowcaseCard
							? "mx-auto max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] rounded-[calc(var(--photon-site-radius,24px)+10px)] border shadow-[0_28px_70px_rgba(15,23,42,0.08)]"
							: clsx(
									"rounded-none border-x-0 border-t-0 bg-[var(--photon-site-surface)] shadow-[0_18px_40px_rgba(15,23,42,0.06)]",
									block.props.sticky &&
										compact &&
										"shadow-[0_20px_54px_rgba(15,23,42,0.12)]",
								),
				)}
			>
				<div
					className={clsx(
						"mx-auto w-full max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] transition-[padding,gap] duration-300",
						framelessSite
							? compact
								? "px-[var(--photon-site-gutter,24px)] py-3"
								: "px-[var(--photon-site-gutter,24px)] py-4"
							: isShowcaseCard
								? compact
									? "px-4 py-3"
									: "px-5 py-4 sm:px-6"
								: compact
									? "px-[var(--photon-site-gutter,24px)] py-3"
									: "px-[var(--photon-site-gutter,24px)] py-4",
					)}
				>
					<div
						className={clsx(
							"flex items-center justify-between gap-3 md:hidden",
							mobileFixedTriggerVisible && "pr-14",
						)}
					>
						<PhotonLink
							href={block.props.brandHref}
							className="flex min-w-0 items-center gap-3"
							onClick={closeMobileMenu}
						>
							<div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-[var(--photon-site-border)] bg-[linear-gradient(180deg,rgba(15,118,110,0.14),rgba(15,118,110,0.03))]">
								{block.props.logoImage ? (
									<EditableImage
										blockId={block.id}
										path="logoImage"
										className="h-full w-full rounded-2xl"
										imageClassName="h-full w-full object-contain p-1.5"
										fallbackAlt={block.props.brandLabel}
									/>
								) : (
									<div className="flex h-full items-center justify-center px-2 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--photon-site-accent)]">
										<EditableText
											blockId={block.id}
											path="brandLabel"
											className="text-[var(--photon-site-accent)]"
										/>
									</div>
								)}
							</div>
							<EditableText
								blockId={block.id}
								path="brandLabel"
								as="div"
								className="min-w-0 truncate [font-family:var(--photon-site-heading-font)] text-xl font-semibold tracking-[-0.02em]"
							/>
						</PhotonLink>
						{mobileInlineTriggerVisible ? (
							<button
								type="button"
								aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
								aria-expanded={mobileMenuOpen}
								onClick={() => setMobileMenuOpen((value) => !value)}
								className="inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-[var(--photon-site-border)] bg-[var(--photon-site-surface)] text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]"
							>
								{mobileMenuOpen ? (
									<X className="h-5 w-5" />
								) : (
									<Menu className="h-5 w-5" />
								)}
							</button>
						) : null}
					</div>

					<div className="hidden flex-col gap-4 md:flex">
						<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
							<div className="flex flex-wrap items-center gap-3 text-sm text-[var(--photon-site-muted)]">
								{utilityLinks.map((link) =>
									renderSmartLink(
										link,
										"transition hover:text-[var(--photon-site-text)]",
										`${link.label}:${link.href}`,
									),
								)}
							</div>
							<div className="flex flex-wrap items-center gap-3 text-sm">
								{localeSwitcherVisible ? (
									<div
										data-photon-locale-switcher="true"
										className="flex flex-wrap items-center gap-2 rounded-full border border-[var(--photon-site-border)] bg-[var(--photon-site-background)] px-2 py-2"
									>
										<div className="px-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--photon-site-muted)]">
											{translate("photon.localeSwitcher.label", "Language")}
										</div>
										{publicLocales.map((item) => (
											<PhotonLink
												key={item.code}
												href={currentRoute}
												locale={item.code}
												data-photon-locale-option={item.code}
												className={clsx(
													"rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
													item.code === locale
														? "bg-[var(--photon-site-accent)] text-white"
														: "text-[var(--photon-site-muted)] hover:text-[var(--photon-site-text)]",
												)}
											>
												{item.label}
											</PhotonLink>
										))}
									</div>
								) : null}
								<EditableText
									blockId={block.id}
									path="contactCaption"
									className="text-[var(--photon-site-muted)]"
								/>
								<EditableText
									blockId={block.id}
									path="contactValue"
									className="font-semibold text-[var(--photon-site-text)]"
								/>
							</div>
						</div>

						<div
							className={clsx(
								"grid gap-4 md:items-center",
								prominentCategoryLink
									? "md:grid-cols-[auto_auto_minmax(280px,1fr)_auto]"
									: "md:grid-cols-[auto_minmax(280px,1fr)_auto]",
							)}
						>
							<PhotonLink
								href={block.props.brandHref}
								className="flex min-w-0 items-center gap-3"
							>
								<div className="relative h-16 w-16 overflow-hidden rounded-[22px] border border-[var(--photon-site-border)] bg-[linear-gradient(180deg,rgba(15,118,110,0.14),rgba(15,118,110,0.03))]">
									{block.props.logoImage ? (
										<EditableImage
											blockId={block.id}
											path="logoImage"
											className="h-full w-full rounded-[22px]"
											imageClassName="h-full w-full object-contain p-2"
											fallbackAlt={block.props.brandLabel}
										/>
									) : (
										<div className="flex h-full items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--photon-site-accent)]">
											<EditableText
												blockId={block.id}
												path="brandLabel"
												className="text-[var(--photon-site-accent)]"
											/>
										</div>
									)}
								</div>
								<div className="min-w-0">
									<EditableText
										blockId={block.id}
										path="brandLabel"
										as="div"
										className="[font-family:var(--photon-site-heading-font)] text-2xl font-semibold tracking-[-0.04em]"
									/>
									{isShowcaseCard ? (
										<div className="mt-1 text-xs uppercase tracking-[0.24em] text-[var(--photon-site-muted)]">
											Live site frame
										</div>
									) : null}
								</div>
							</PhotonLink>

							{prominentCategoryLink ? (
								<PhotonLink
									href={prominentCategoryLink.href}
									target={prominentCategoryLink.target}
									rel={prominentCategoryLink.rel}
									className="inline-flex items-center gap-2 rounded-full border border-[var(--photon-site-border)] bg-[var(--photon-site-background)] px-4 py-3 text-sm font-semibold text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]"
								>
									<div className="h-2.5 w-2.5 rounded-full bg-[var(--photon-site-accent)]" />
									<span className="font-semibold">
										{prominentCategoryLink.label}
									</span>
								</PhotonLink>
							) : null}

							<PhotonSiteSearch
								blockId={block.id}
								placeholderPath="searchPlaceholder"
							/>

							<div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
								{shouldRenderSecondaryCta ? (
									<PhotonLink
										href={block.props.secondaryCtaHref}
										className="inline-flex items-center gap-2 rounded-full border border-[var(--photon-site-border)] px-4 py-3 text-sm font-semibold text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]"
									>
										<EditableText
											blockId={block.id}
											path="secondaryCtaLabel"
											className="font-semibold"
										/>
									</PhotonLink>
								) : null}
								{shouldRenderPrimaryCta ? (
									<PhotonLink
										href={block.props.primaryCtaHref}
										className="inline-flex items-center gap-2 rounded-full bg-[var(--photon-site-accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(15,118,110,0.28)] transition hover:translate-y-[-1px]"
									>
										<EditableText
											blockId={block.id}
											path="primaryCtaLabel"
											className="font-semibold text-white"
										/>
										<ArrowRight className="h-4 w-4" />
									</PhotonLink>
								) : null}
								{extensionActions.map((action) =>
									renderExtensionAction(action),
								)}
							</div>
						</div>
					</div>
				</div>
				{categoryLinks.length > 0 ? (
					<div
						className={clsx(
							"hidden border-t border-[var(--photon-site-border)] md:block",
							framelessSite && "bg-transparent",
						)}
					>
						<div className="mx-auto w-full max-w-[calc(var(--photon-site-max-width,1280px)+var(--photon-site-gutter,24px)*2)] px-[var(--photon-site-gutter,24px)] py-4">
							<div className="flex flex-wrap gap-2">
								{categoryLinks.map((link) =>
									renderSmartLink(
										link,
										clsx(
											"rounded-full border border-[var(--photon-site-border)] px-4 py-2 text-sm text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
											framelessSite
												? "bg-transparent"
												: isShowcaseCard
													? "bg-[var(--photon-site-background)]"
													: "bg-white/0",
										),
										`${link.label}:${link.href}`,
									),
								)}
							</div>
						</div>
					</div>
				) : null}
			</div>
			<div
				className={clsx(
					"fixed left-0 top-[var(--photon-dock-offset,0px)] z-[55] h-[calc(100dvh-var(--photon-dock-offset,0px))] w-[100dvw] overflow-hidden transition-[visibility] duration-300 ease-in-out md:hidden",
					mobileMenuOpen ? "visible" : "invisible",
				)}
			>
				{mobileMenuType === "inline" ? null : (
					<button
						type="button"
						aria-label="Close menu"
						className={clsx(
							"absolute inset-0 cursor-default bg-slate-950/35 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out",
							mobileMenuOpen
								? "pointer-events-auto opacity-100"
								: "pointer-events-none opacity-0",
						)}
						onClick={closeMobileMenu}
					/>
				)}
				<div className={mobileMenuPanelClassName}>
					<div className="mb-4 flex items-center justify-between gap-3">
						<EditableText
							blockId={block.id}
							path="brandLabel"
							as="div"
							className="[font-family:var(--photon-site-heading-font)] text-xl font-semibold tracking-[-0.02em]"
						/>
						<button
							type="button"
							aria-label="Close menu"
							onClick={closeMobileMenu}
							className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-[var(--photon-site-border)] text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
					{renderMobileMenuContent(":panel")}
				</div>
			</div>
			{mobileBottomMenuVisible && !mobileMenuOpen ? (
				<nav
					aria-label="Mobile bottom navigation"
					className={mobileBottomMenuClassName}
				>
					<div className="flex items-center justify-around gap-1">
						{mobileBottomLinks.map((link) =>
							renderSmartLink(
								link,
								"flex min-w-0 flex-1 items-center justify-center rounded-2xl px-2 py-2 text-center text-[11px] font-semibold leading-tight text-[var(--photon-site-muted)] transition hover:bg-[var(--photon-site-background)] hover:text-[var(--photon-site-accent)]",
								`${link.label}:${link.href}:mobile-bottom`,
								closeMobileMenu,
							),
						)}
						{mobileControls.bottomMenu.showBurger ? (
							<button
								type="button"
								aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
								aria-expanded={mobileMenuOpen}
								onClick={() => setMobileMenuOpen((value) => !value)}
								className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-[var(--photon-site-accent)] text-white shadow-[0_14px_30px_rgba(15,118,110,0.24)]"
							>
								{mobileMenuOpen ? (
									<X className="h-5 w-5" />
								) : (
									<Menu className="h-5 w-5" />
								)}
							</button>
						) : null}
					</div>
				</nav>
			) : null}
		</header>
	);
};

export const siteHeaderShellDefinition = definePhotonBlockDefinition({
	type: "site-header-shell",
	label: "Site Header Shell",
	labelKey: "photon.system.siteHeader.block.label",
	description:
		"Shared live-site header with utility links, search and package-registered actions.",
	descriptionKey: "photon.system.siteHeader.block.description",
	category: "Site Frame",
	icon: "panel-top",
	defaults: {
		variant: "commerce-inline",
		brandLabel: createPhotonLocalizedDefault({
			en: "Photon",
			ru: "Photon",
		}),
		brandHref: "/",
		logoImage: null,
		utilityLinks: createPhotonLocalizedDefault({
			en: [
				{ label: "Services", href: "/services" },
				{ label: "Partners", href: "/partners" },
				{ label: "Blog", href: "/blog" },
			],
			ru: [
				{ label: "Услуги", href: "/services" },
				{ label: "Партнеры", href: "/partners" },
				{ label: "Блог", href: "/blog" },
			],
		}),
		catalogLabel: createPhotonLocalizedDefault({
			en: "Catalog",
			ru: "Каталог",
		}),
		searchPlaceholder: createPhotonLocalizedDefault({
			en: "Search the website",
			ru: "Поиск по сайту",
		}),
		contactValue: "+7 (707) 040-43-43",
		contactCaption: createPhotonLocalizedDefault({
			en: "Daily from 09:00 to 18:00",
			ru: "Ежедневно с 09:00 до 18:00",
		}),
		primaryCtaLabel: createPhotonLocalizedDefault({
			en: "Contact us",
			ru: "Связаться",
		}),
		primaryCtaHref: "/contacts",
		secondaryCtaLabel: createPhotonLocalizedDefault({
			en: "WhatsApp",
			ru: "WhatsApp",
		}),
		secondaryCtaHref: "https://wa.me/77070404343",
		showLoginAction: false,
		loginLabel: createPhotonLocalizedDefault({
			en: "Admin sign in",
			ru: "Вход для админа",
		}),
		sticky: true,
		mobile: {
			sticky: true,
			menu: {
				type: "inline",
				triggerPlacement: "fixed",
				scrollLock: true,
				floating: false,
				disableFloatingOnSmallScreens: true,
			},
			bottomMenu: {
				enabled: false,
				showBurger: false,
				floating: false,
				disableFloatingOnSmallScreens: true,
			},
		},
		compactOnScroll: true,
		showLocaleSwitcher: true,
		disabledExtensionIds: [],
		disabledExtensionItemIds: [],
		categoryLinks: createPhotonLocalizedDefault({
			en: [
				{ label: "Infrastructure", href: "/infrastructure" },
				{ label: "Operations", href: "/operations" },
				{ label: "Research", href: "/research" },
			],
			ru: [
				{ label: "Инфраструктура", href: "/infrastructure" },
				{ label: "Операции", href: "/operations" },
				{ label: "Исследования", href: "/research" },
			],
		}),
	},
	fields: siteHeaderFields,
	interactionSlots: resolveSiteHeaderInteractionSlots,
	component: SiteHeaderShell,
});
