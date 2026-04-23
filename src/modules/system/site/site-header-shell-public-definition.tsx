"use client";

import clsx from "clsx";
import { ArrowRight, CircleUserRound, LogIn, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EditableImage } from "../../../components/public/public-editable-image";
import { EditableText } from "../../../components/public/public-editable-text";
import {
	PhotonLink,
	usePhotonStore,
} from "../../../context/photon-public-context";
import {
	createPhotonLocalizedDefault,
	definePhotonBlockDefinition,
} from "../../../helpers/document";
import { isPhotonPublicFramelessSiteDesign } from "../../../helpers/public-site-design";
import {
	collectPhotonPublicHeaderExtensionItems,
	resolvePhotonPublicSiteFrameExtensions,
} from "../../../helpers/public-site-frame-extensions";
import { usePhotonI18n } from "../../../i18n/photon-i18n-context";
import { PhotonSiteSearch } from "../../../search/photon-site-search";
import type {
	PhotonBlockComponentProps,
	PhotonField,
	PhotonSiteFrameActionItem,
} from "../../../types";
import {
	normalizePhotonSiteLinkItems,
	normalizePhotonSiteStringItems,
} from "./helpers";
import {
	collectHeaderActionLinkKeys,
	collectUniqueHeaderLinks,
	getHeaderActionVisibleHref,
	getHeaderCartLink,
	getHeaderCartQuantity,
	getHeaderLinkDedupeKey,
	getHeaderLinkPathname,
	hasAuthenticatedUser,
	hasCommerceBlock,
	hasCommerceRuntimeResource,
	isCartLinkHref,
	isCommerceExtensionId,
	isProtectedAccountHref,
	normalizeHeaderHref,
} from "./site-header-links";

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
	compactOnScroll: boolean;
	showLocaleSwitcher?: boolean;
	categoryLinks: Array<{ label: string; href: string }>;
	disabledExtensionIds?: string[];
	disabledExtensionItemIds?: string[];
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
	const currentBlocks = usePhotonStore((state) => state.document.blocks);
	const requestAuth = usePhotonStore((state) => state.requestAuth);
	const resources = usePhotonStore((state) => state.resources);
	const siteRegions = usePhotonStore((state) => state.site.regions);
	const siteDesign = usePhotonStore((state) => state.site.settings.design);
	const siteFrameExtensions = usePhotonStore(
		(state) => state.siteFrameExtensions,
	);
	const { locale, publicLocales, translate } = usePhotonI18n();
	const [isCompact, setIsCompact] = useState(false);
	const headerRef = useRef<HTMLElement | null>(null);
	const disabledExtensionIds = normalizePhotonSiteStringItems(
		block.props.disabledExtensionIds,
	);
	const disabledExtensionItemIds = normalizePhotonSiteStringItems(
		block.props.disabledExtensionItemIds,
	);
	const headerExtensionItems = collectPhotonPublicHeaderExtensionItems(
		resolvePhotonPublicSiteFrameExtensions(
			siteFrameExtensions,
			disabledExtensionIds,
		).filter(
			(extension) =>
				!isCommerceExtensionId(extension.id) ||
				hasCommerceBlock(currentBlocks) ||
				Object.values(siteRegions).some((region) =>
					hasCommerceBlock(region.document.blocks),
				) ||
				hasCommerceRuntimeResource(resources),
		),
		disabledExtensionItemIds,
	);
	const rawUtilityLinks = [
		...normalizePhotonSiteLinkItems(block.props.utilityLinks),
		...normalizePhotonSiteLinkItems(headerExtensionItems.utilityLinks),
	];
	const extensionCategoryLinks = normalizePhotonSiteLinkItems(
		headerExtensionItems.categoryLinks,
	);
	const commerceCatalogLink =
		extensionCategoryLinks.find(
			(link) =>
				link.id === "commerce:catalog-link" ||
				getHeaderLinkPathname(link.href) === "/catalog",
		) ?? null;
	const rawCategoryLinks = [
		...normalizePhotonSiteLinkItems(block.props.categoryLinks),
		...extensionCategoryLinks.filter((link) => link !== commerceCatalogLink),
	];
	const variant = block.props.variant ?? "commerce-inline";
	const liveSurfaceMode = mode !== "builder";
	const compact = liveSurfaceMode && block.props.compactOnScroll && isCompact;
	const framelessSite = isPhotonPublicFramelessSiteDesign(siteDesign);
	const isShowcaseCard = variant === "showcase-card" && !framelessSite;
	const localeSwitcherVisible =
		block.props.showLocaleSwitcher !== false && publicLocales.length > 1;
	const authenticatedUser = hasAuthenticatedUser(resources);
	const [cartQuantity, setCartQuantity] = useState(() =>
		getHeaderCartQuantity(resources),
	);
	const rawExtensionActions = collectUniqueHeaderLinks(
		headerExtensionItems.actions,
	).filter((action) => {
		const visibleHref = getHeaderActionVisibleHref(action, authenticatedUser);

		return normalizeHeaderHref(visibleHref) !== "";
	});
	const dedicatedCartLink =
		getHeaderCartLink(
			rawExtensionActions.map((action) => ({
				label: action.label,
				href: getHeaderActionVisibleHref(action, authenticatedUser),
			})),
		) ??
		getHeaderCartLink([
			{
				label: block.props.secondaryCtaLabel,
				href: block.props.secondaryCtaHref,
			},
			{
				label: block.props.primaryCtaLabel,
				href: block.props.primaryCtaHref,
			},
			...rawCategoryLinks,
			...rawUtilityLinks,
		]);
	const extensionActions = rawExtensionActions.filter(
		(action) =>
			!isCartLinkHref(getHeaderActionVisibleHref(action, authenticatedUser)),
	);
	const hasExtensionAuthAction = extensionActions.some(
		(action) => (action.kind ?? "link") === "auth",
	);
	const extensionActionLinkKeys = collectHeaderActionLinkKeys(extensionActions);
	const secondaryCtaLinkKey = getHeaderLinkDedupeKey(
		block.props.secondaryCtaHref,
	);
	const primaryCtaLinkKey = getHeaderLinkDedupeKey(block.props.primaryCtaHref);
	const shouldRenderSecondaryCta =
		normalizeHeaderHref(block.props.secondaryCtaHref) !== "" &&
		!isCartLinkHref(block.props.secondaryCtaHref) &&
		!extensionActionLinkKeys.has(secondaryCtaLinkKey) &&
		!(
			(hasExtensionAuthAction || !authenticatedUser) &&
			isProtectedAccountHref(block.props.secondaryCtaHref)
		);
	const shouldRenderPrimaryCta =
		normalizeHeaderHref(block.props.primaryCtaHref) !== "" &&
		!isCartLinkHref(block.props.primaryCtaHref) &&
		(!extensionActionLinkKeys.has(primaryCtaLinkKey) ||
			primaryCtaLinkKey === secondaryCtaLinkKey);
	const prominentLinkKeys = new Set(extensionActionLinkKeys);

	if (dedicatedCartLink) {
		prominentLinkKeys.add(getHeaderLinkDedupeKey(dedicatedCartLink.href));
	}

	if (commerceCatalogLink) {
		prominentLinkKeys.add(getHeaderLinkDedupeKey(commerceCatalogLink.href));
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

	const renderCartLink = (
		href: string,
		label: string,
		className?: string,
		key?: string,
	) => (
		<PhotonLink
			key={key ?? `cart:${href}`}
			href={href}
			aria-label={label}
			data-photon-header-cart-link="true"
			className={clsx(
				"relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--photon-site-border)] text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
				className,
			)}
		>
			<ShoppingCart className="h-5 w-5" />
			{cartQuantity > 0 ? (
				<span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--photon-site-accent)] px-1 text-[10px] font-bold leading-none text-white">
					{cartQuantity > 99 ? "99+" : cartQuantity}
				</span>
			) : null}
		</PhotonLink>
	);

	const renderSmartLink = (
		link: { label: string; href: string; target?: string; rel?: string },
		className: string,
		key: string,
	) => {
		if (isCartLinkHref(link.href)) {
			return renderCartLink(link.href, link.label, className, key);
		}

		if (!authenticatedUser && isProtectedAccountHref(link.href)) {
			return null;
		}

		return (
			<PhotonLink
				key={key}
				href={link.href}
				target={link.target}
				rel={link.rel}
				className={className}
			>
				{link.label}
			</PhotonLink>
		);
	};

	const renderExtensionAction = (action: PhotonSiteFrameActionItem) => {
		const appearance = action.appearance ?? "secondary";
		const className = clsx(
			"inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition",
			appearance === "primary"
				? "bg-[var(--photon-site-accent)] text-white shadow-[0_18px_34px_rgba(15,118,110,0.28)] hover:translate-y-[-1px]"
				: appearance === "ghost"
					? "text-[var(--photon-site-text)] hover:text-[var(--photon-site-accent)]"
					: "border border-[var(--photon-site-border)] text-[var(--photon-site-text)] hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]",
		);

		if ((action.kind ?? "link") === "auth") {
			if (authenticatedUser) {
				const authenticatedHref = action.authenticatedHref ?? action.href;

				if (!authenticatedHref) {
					return null;
				}

				return (
					<PhotonLink
						key={
							action.id ??
							`${action.authenticatedLabel ?? action.label}:${authenticatedHref}`
						}
						href={authenticatedHref}
						target={action.authenticatedTarget}
						rel={action.authenticatedRel}
						className={className}
					>
						<CircleUserRound className="h-4 w-4" />
						<span>{action.authenticatedLabel ?? action.label}</span>
					</PhotonLink>
				);
			}

			return (
				<button
					key={action.id ?? `${action.label}:${action.href}`}
					type="button"
					onClick={requestAuth}
					className={clsx(className, "cursor-pointer")}
				>
					{action.label}
				</button>
			);
		}

		return renderSmartLink(
			action,
			className,
			action.id ?? `${action.label}:${action.href}`,
		);
	};

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

		setCartQuantity(getHeaderCartQuantity(resources));

		const syncCartQuantity = (event: Event) => {
			if (!(event instanceof CustomEvent)) {
				return;
			}

			const cart = event.detail as
				| { items_quantity?: unknown; item_count?: unknown }
				| undefined;
			const quantity = Number(cart?.items_quantity ?? cart?.item_count ?? 0);

			setCartQuantity(
				Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 0,
			);
		};

		window.addEventListener("commerce-cart-updated", syncCartQuantity);

		return () => {
			window.removeEventListener("commerce-cart-updated", syncCartQuantity);
		};
	}, [resources]);

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
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
							<div className="flex flex-wrap items-center gap-3 text-sm text-[var(--photon-site-muted)]">
								{utilityLinks.map((link) =>
									renderSmartLink(
										link,
										clsx(
											"transition hover:text-[var(--photon-site-text)]",
											isCartLinkHref(link.href) && "h-8 w-8 border-transparent",
										),
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
								"grid gap-4 lg:items-center",
								commerceCatalogLink
									? "lg:grid-cols-[auto_auto_minmax(280px,1fr)_auto]"
									: "lg:grid-cols-[auto_minmax(280px,1fr)_auto]",
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

							{commerceCatalogLink ? (
								<PhotonLink
									href={commerceCatalogLink.href}
									className="inline-flex items-center gap-2 rounded-full border border-[var(--photon-site-border)] bg-[var(--photon-site-background)] px-4 py-3 text-sm font-semibold text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]"
								>
									<div className="h-2.5 w-2.5 rounded-full bg-[var(--photon-site-accent)]" />
									<EditableText
										blockId={block.id}
										path="catalogLabel"
										className="font-semibold"
									/>
								</PhotonLink>
							) : null}

							<PhotonSiteSearch
								blockId={block.id}
								placeholderPath="searchPlaceholder"
							/>

							<div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
								{shouldRenderSecondaryCta ? (
									isCartLinkHref(block.props.secondaryCtaHref) ? (
										renderCartLink(
											block.props.secondaryCtaHref,
											block.props.secondaryCtaLabel,
											undefined,
											"secondary-cart",
										)
									) : (
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
									)
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
								{dedicatedCartLink
									? renderCartLink(
											dedicatedCartLink.href,
											dedicatedCartLink.label,
											undefined,
											"dedicated-cart",
										)
									: null}
								{extensionActions.map(renderExtensionAction)}
								{block.props.showLoginAction &&
								!isAdmin &&
								!authenticatedUser &&
								!hasExtensionAuthAction ? (
									<button
										type="button"
										onClick={requestAuth}
										className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--photon-site-border)] bg-[var(--photon-site-surface)] px-4 py-3 text-sm font-semibold text-[var(--photon-site-text)] transition hover:border-[var(--photon-site-accent)] hover:text-[var(--photon-site-accent)]"
									>
										<LogIn className="h-4 w-4" />
										<EditableText
											blockId={block.id}
											path="loginLabel"
											className="font-semibold"
										/>
									</button>
								) : null}
							</div>
						</div>
					</div>
				</div>
				{categoryLinks.length > 0 ? (
					<div
						className={clsx(
							"border-t border-[var(--photon-site-border)]",
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
											isCartLinkHref(link.href) && "h-10 w-10 px-0 py-0",
										),
										`${link.label}:${link.href}`,
									),
								)}
							</div>
						</div>
					</div>
				) : null}
			</div>
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
	component: SiteHeaderShell,
});
