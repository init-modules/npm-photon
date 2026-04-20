"use client";

import clsx from "clsx";
import { ArrowRight, LogIn, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EditableImage, EditableText } from "../../../components/editable";
import {
	useWebsiteBuilderStore,
	WebsiteBuilderLink,
} from "../../../context/website-builder-context";
import { useWebsiteBuilderI18n } from "../../../i18n/website-builder-i18n-context";
import {
	createWebsiteBuilderLocalizedDefault,
	defineWebsiteBuilderBlockDefinition,
} from "../../../helpers/document";
import {
	collectWebsiteBuilderHeaderExtensionItems,
	resolveWebsiteBuilderSiteFrameExtensions,
} from "../../../helpers/site-frame-extensions";
import {
	isWebsiteBuilderFramelessSiteDesign,
} from "../../../helpers/site-design";
import { WebsiteBuilderSiteSearch } from "../../../search/website-builder-site-search";
import type {
	WebsiteBuilderBlockComponentProps,
	WebsiteBuilderField,
	WebsiteBuilderResources,
	WebsiteBuilderSiteFrameActionItem,
} from "../../../types";
import {
	normalizeWebsiteBuilderSiteLinkItems,
	normalizeWebsiteBuilderSiteStringItems,
} from "./helpers";

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

const getHeaderLinkPathname = (href: string) => {
	const cleanHref = href.trim();

	if (!cleanHref.startsWith("/") || cleanHref.startsWith("//")) {
		return cleanHref;
	}

	return (cleanHref.split(/[?#]/u)[0] ?? "/").replace(/\/+$/u, "") || "/";
};

const isCartLinkHref = (href: string) => getHeaderLinkPathname(href) === "/cart";

const isProtectedAccountHref = (href: string) => {
	const pathname = getHeaderLinkPathname(href);

	return pathname === "/account" || pathname.startsWith("/account/");
};

const getHeaderCartQuantity = (resources: WebsiteBuilderResources) => {
	const summary = resources.commerceCartSummary as
		| { items_quantity?: unknown; item_count?: unknown }
		| undefined;
	const quantity = Number(summary?.items_quantity ?? summary?.item_count ?? 0);

	return Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 0;
};

const hasAuthenticatedUser = (resources: WebsiteBuilderResources) => {
	const auth = resources.auth as
		| { user?: null | Record<string, unknown> }
		| undefined;

	return Boolean(auth?.user);
};

const siteHeaderFields: WebsiteBuilderField[] = [
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
	{ path: "brandLabel", label: "Brand label", kind: "text", group: "content", localization: "localized" },
	{ path: "brandHref", label: "Brand href", kind: "url", group: "content", localization: "shared" },
	{ path: "logoImage", label: "Logo image", kind: "image", group: "content", localization: "shared" },
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
		labelKey: "websiteBuilder.system.siteHeader.showLocaleSwitcher.label",
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
}: WebsiteBuilderBlockComponentProps<SiteHeaderProps>) => {
	const isAdmin = useWebsiteBuilderStore((state) => state.isAdmin);
	const mode = useWebsiteBuilderStore((state) => state.mode);
	const currentRoute = useWebsiteBuilderStore((state) => state.document.route);
	const requestAuth = useWebsiteBuilderStore((state) => state.requestAuth);
	const resources = useWebsiteBuilderStore((state) => state.resources);
	const siteDesign = useWebsiteBuilderStore((state) => state.site.settings.design);
	const siteFrameExtensions = useWebsiteBuilderStore(
		(state) => state.siteFrameExtensions,
	);
	const { locale, publicLocales, translate } = useWebsiteBuilderI18n();
	const [isCompact, setIsCompact] = useState(false);
	const headerRef = useRef<HTMLElement | null>(null);
	const disabledExtensionIds = normalizeWebsiteBuilderSiteStringItems(
		block.props.disabledExtensionIds,
	);
	const disabledExtensionItemIds = normalizeWebsiteBuilderSiteStringItems(
		block.props.disabledExtensionItemIds,
	);
	const headerExtensionItems = collectWebsiteBuilderHeaderExtensionItems(
		resolveWebsiteBuilderSiteFrameExtensions(
			siteFrameExtensions,
			disabledExtensionIds,
		),
		disabledExtensionItemIds,
	);
	const utilityLinks = [
		...normalizeWebsiteBuilderSiteLinkItems(block.props.utilityLinks),
		...normalizeWebsiteBuilderSiteLinkItems(headerExtensionItems.utilityLinks),
	];
	const categoryLinks = [
		...normalizeWebsiteBuilderSiteLinkItems(block.props.categoryLinks),
		...normalizeWebsiteBuilderSiteLinkItems(headerExtensionItems.categoryLinks),
	];
	const extensionActions = headerExtensionItems.actions;
	const hasExtensionAuthAction = extensionActions.some(
		(action) => (action.kind ?? "link") === "auth",
	);
	const variant = block.props.variant ?? "commerce-inline";
	const liveSurfaceMode = mode !== "builder";
	const compact = liveSurfaceMode && block.props.compactOnScroll && isCompact;
	const framelessSite = isWebsiteBuilderFramelessSiteDesign(siteDesign);
	const isShowcaseCard = variant === "showcase-card" && !framelessSite;
	const localeSwitcherVisible =
		block.props.showLocaleSwitcher !== false && publicLocales.length > 1;
	const authenticatedUser = hasAuthenticatedUser(resources);
	const [cartQuantity, setCartQuantity] = useState(() =>
		getHeaderCartQuantity(resources),
	);

	const renderCartLink = (
		href: string,
		label: string,
		className?: string,
		key?: string,
	) => (
		<WebsiteBuilderLink
			key={key ?? `cart:${href}`}
			href={href}
			aria-label={label}
			data-wb-header-cart-link="true"
			className={clsx(
				"relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--wb-site-border)] text-[var(--wb-site-text)] transition hover:border-[var(--wb-site-accent)] hover:text-[var(--wb-site-accent)]",
				className,
			)}
		>
			<ShoppingCart className="h-5 w-5" />
			{cartQuantity > 0 ? (
				<span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--wb-site-accent)] px-1 text-[10px] font-bold leading-none text-white">
					{cartQuantity > 99 ? "99+" : cartQuantity}
				</span>
			) : null}
		</WebsiteBuilderLink>
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
			return (
				<button
					key={key}
					type="button"
					onClick={requestAuth}
					className={clsx(className, "cursor-pointer")}
				>
					{link.label}
				</button>
			);
		}

		return (
			<WebsiteBuilderLink
				key={key}
				href={link.href}
				target={link.target}
				rel={link.rel}
				className={className}
			>
				{link.label}
			</WebsiteBuilderLink>
		);
	};

	const renderExtensionAction = (action: WebsiteBuilderSiteFrameActionItem) => {
		const appearance = action.appearance ?? "secondary";
		const className = clsx(
			"inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition",
			appearance === "primary"
				? "bg-[var(--wb-site-accent)] text-white shadow-[0_18px_34px_rgba(15,118,110,0.28)] hover:translate-y-[-1px]"
				: appearance === "ghost"
					? "text-[var(--wb-site-text)] hover:text-[var(--wb-site-accent)]"
					: "border border-[var(--wb-site-border)] text-[var(--wb-site-text)] hover:border-[var(--wb-site-accent)] hover:text-[var(--wb-site-accent)]",
		);

		if ((action.kind ?? "link") === "auth") {
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
				"--wb-site-header-height",
				liveSurfaceMode && block.props.sticky && headerRef.current
					? `${headerRef.current.offsetHeight}px`
					: "0px",
			);
		};

		syncHeaderHeight();

		if (!headerRef.current || typeof ResizeObserver === "undefined") {
			return () => {
				root.style.setProperty("--wb-site-header-height", "0px");
			};
		}

		const observer = new ResizeObserver(() => {
			syncHeaderHeight();
		});
		observer.observe(headerRef.current);

		return () => {
			observer.disconnect();
			root.style.setProperty("--wb-site-header-height", "0px");
		};
	}, [block.props.sticky, liveSurfaceMode, compact, localeSwitcherVisible]);

	return (
		<header
			ref={headerRef}
			className={clsx(
				"relative",
				liveSurfaceMode && "z-40",
				isShowcaseCard ? "pt-[var(--wb-site-gutter,24px)]" : "pt-0",
			)}
		>
			<div
				className={clsx(
					"border-b border-[var(--wb-site-border)] text-[var(--wb-site-text)] transition-[box-shadow,background-color,border-radius] duration-300",
					framelessSite
						? clsx(
								"rounded-none border-x-0 border-t-0 bg-[color-mix(in_srgb,var(--wb-site-surface)_92%,white)] shadow-none",
								block.props.sticky &&
									compact &&
									"bg-[color-mix(in_srgb,var(--wb-site-surface)_96%,white)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]",
							)
						: isShowcaseCard
						? "mx-auto max-w-[calc(var(--wb-site-max-width,1280px)+var(--wb-site-gutter,24px)*2)] rounded-[calc(var(--wb-site-radius,24px)+10px)] border shadow-[0_28px_70px_rgba(15,23,42,0.08)]"
						: clsx(
								"rounded-none border-x-0 border-t-0 bg-[var(--wb-site-surface)] shadow-[0_18px_40px_rgba(15,23,42,0.06)]",
								block.props.sticky &&
									compact &&
									"shadow-[0_20px_54px_rgba(15,23,42,0.12)]",
							),
				)}
			>
				<div
					className={clsx(
						"mx-auto w-full max-w-[calc(var(--wb-site-max-width,1280px)+var(--wb-site-gutter,24px)*2)] transition-[padding,gap] duration-300",
						framelessSite
							? compact
								? "px-[var(--wb-site-gutter,24px)] py-3"
								: "px-[var(--wb-site-gutter,24px)] py-4"
							: isShowcaseCard
							? compact
								? "px-4 py-3"
								: "px-5 py-4 sm:px-6"
							: compact
								? "px-[var(--wb-site-gutter,24px)] py-3"
								: "px-[var(--wb-site-gutter,24px)] py-4",
					)}
				>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
							<div className="flex flex-wrap items-center gap-3 text-sm text-[var(--wb-site-muted)]">
								{utilityLinks.map((link) => (
									isCartLinkHref(link.href) ? (
										renderCartLink(
											link.href,
											link.label,
											"h-8 w-8 border-transparent",
											`${link.label}:${link.href}`,
										)
									) : !authenticatedUser &&
										isProtectedAccountHref(link.href) ? (
										<button
											key={`${link.label}:${link.href}`}
											type="button"
											onClick={requestAuth}
											data-wb-header-utility-link={link.href}
											className="cursor-pointer transition hover:text-[var(--wb-site-text)]"
										>
											{link.label}
										</button>
									) : (
										<WebsiteBuilderLink
											key={`${link.label}:${link.href}`}
											href={link.href}
											data-wb-header-utility-link={link.href}
											className="transition hover:text-[var(--wb-site-text)]"
										>
											{link.label}
										</WebsiteBuilderLink>
									)
								))}
							</div>
							<div className="flex flex-wrap items-center gap-3 text-sm">
								{localeSwitcherVisible ? (
									<div
										data-wb-locale-switcher="true"
										className="flex flex-wrap items-center gap-2 rounded-full border border-[var(--wb-site-border)] bg-[var(--wb-site-background)] px-2 py-2"
									>
										<div className="px-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--wb-site-muted)]">
											{translate(
												"websiteBuilder.localeSwitcher.label",
												"Language",
											)}
										</div>
										{publicLocales.map((item) => (
											<WebsiteBuilderLink
												key={item.code}
												href={currentRoute}
												locale={item.code}
												data-wb-locale-option={item.code}
												className={clsx(
													"rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
													item.code === locale
														? "bg-[var(--wb-site-accent)] text-white"
														: "text-[var(--wb-site-muted)] hover:text-[var(--wb-site-text)]",
												)}
											>
												{item.label}
											</WebsiteBuilderLink>
										))}
									</div>
								) : null}
								<EditableText
									blockId={block.id}
									path="contactCaption"
									className="text-[var(--wb-site-muted)]"
								/>
								<EditableText
									blockId={block.id}
									path="contactValue"
									className="font-semibold text-[var(--wb-site-text)]"
								/>
							</div>
						</div>

						<div className="grid gap-4 lg:grid-cols-[auto_auto_minmax(280px,1fr)_auto] lg:items-center">
							<WebsiteBuilderLink
								href={block.props.brandHref}
								className="flex min-w-0 items-center gap-3"
							>
								<div className="relative h-16 w-16 overflow-hidden rounded-[22px] border border-[var(--wb-site-border)] bg-[linear-gradient(180deg,rgba(15,118,110,0.14),rgba(15,118,110,0.03))]">
									{block.props.logoImage ? (
										<EditableImage
											blockId={block.id}
											path="logoImage"
											className="h-full w-full rounded-[22px]"
											imageClassName="h-full w-full object-contain p-2"
											fallbackAlt={block.props.brandLabel}
										/>
									) : (
										<div className="flex h-full items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--wb-site-accent)]">
											<EditableText
												blockId={block.id}
												path="brandLabel"
												className="text-[var(--wb-site-accent)]"
											/>
										</div>
									)}
								</div>
								<div className="min-w-0">
									<EditableText
										blockId={block.id}
										path="brandLabel"
										as="div"
										className="[font-family:var(--wb-site-heading-font)] text-2xl font-semibold tracking-[-0.04em]"
									/>
									{isShowcaseCard ? (
										<div className="mt-1 text-xs uppercase tracking-[0.24em] text-[var(--wb-site-muted)]">
											Live site frame
										</div>
									) : null}
								</div>
							</WebsiteBuilderLink>

							<div className="inline-flex items-center gap-2 rounded-full border border-[var(--wb-site-border)] bg-[var(--wb-site-background)] px-4 py-3 text-sm font-semibold text-[var(--wb-site-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
								<div className="h-2.5 w-2.5 rounded-full bg-[var(--wb-site-accent)]" />
								<EditableText
									blockId={block.id}
									path="catalogLabel"
									className="font-semibold text-[var(--wb-site-text)]"
								/>
							</div>

							<WebsiteBuilderSiteSearch
								blockId={block.id}
								placeholderPath="searchPlaceholder"
							/>

							<div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
								{isCartLinkHref(block.props.secondaryCtaHref) ? (
									renderCartLink(
										block.props.secondaryCtaHref,
										block.props.secondaryCtaLabel,
										undefined,
										"secondary-cart",
									)
								) : !authenticatedUser &&
									isProtectedAccountHref(block.props.secondaryCtaHref) ? (
									<button
										type="button"
										onClick={requestAuth}
										className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--wb-site-border)] px-4 py-3 text-sm font-semibold text-[var(--wb-site-text)] transition hover:border-[var(--wb-site-accent)] hover:text-[var(--wb-site-accent)]"
									>
										<EditableText
											blockId={block.id}
											path="secondaryCtaLabel"
											className="font-semibold"
										/>
									</button>
								) : (
									<WebsiteBuilderLink
										href={block.props.secondaryCtaHref}
										className="inline-flex items-center gap-2 rounded-full border border-[var(--wb-site-border)] px-4 py-3 text-sm font-semibold text-[var(--wb-site-text)] transition hover:border-[var(--wb-site-accent)] hover:text-[var(--wb-site-accent)]"
									>
										<EditableText
											blockId={block.id}
											path="secondaryCtaLabel"
											className="font-semibold"
										/>
									</WebsiteBuilderLink>
								)}
								<WebsiteBuilderLink
									href={block.props.primaryCtaHref}
									className="inline-flex items-center gap-2 rounded-full bg-[var(--wb-site-accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(15,118,110,0.28)] transition hover:translate-y-[-1px]"
								>
									<EditableText
										blockId={block.id}
										path="primaryCtaLabel"
										className="font-semibold text-white"
									/>
									<ArrowRight className="h-4 w-4" />
								</WebsiteBuilderLink>
								{extensionActions.map(renderExtensionAction)}
								{block.props.showLoginAction && !isAdmin && !hasExtensionAuthAction ? (
									<button
										type="button"
										onClick={requestAuth}
										className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--wb-site-border)] bg-[var(--wb-site-surface)] px-4 py-3 text-sm font-semibold text-[var(--wb-site-text)] transition hover:border-[var(--wb-site-accent)] hover:text-[var(--wb-site-accent)]"
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
							"border-t border-[var(--wb-site-border)]",
							framelessSite && "bg-transparent",
						)}
					>
						<div className="mx-auto w-full max-w-[calc(var(--wb-site-max-width,1280px)+var(--wb-site-gutter,24px)*2)] px-[var(--wb-site-gutter,24px)] py-4">
							<div className="flex flex-wrap gap-2">
								{categoryLinks.map((link) => (
									renderSmartLink(
										link,
										clsx(
											"rounded-full border border-[var(--wb-site-border)] px-4 py-2 text-sm text-[var(--wb-site-text)] transition hover:border-[var(--wb-site-accent)] hover:text-[var(--wb-site-accent)]",
											framelessSite
												? "bg-transparent"
												: isShowcaseCard
													? "bg-[var(--wb-site-background)]"
													: "bg-white/0",
											isCartLinkHref(link.href) && "h-10 w-10 px-0 py-0",
										),
										`${link.label}:${link.href}`,
									)
								))}
							</div>
						</div>
					</div>
				) : null}
			</div>
		</header>
	);
};

export const siteHeaderShellDefinition = defineWebsiteBuilderBlockDefinition({
	type: "site-header-shell",
	label: "Site Header Shell",
	labelKey: "websiteBuilder.system.siteHeader.block.label",
	description:
		"Shared live-site header with utility links, search, contact actions and an admin sign-in entrypoint.",
	descriptionKey: "websiteBuilder.system.siteHeader.block.description",
	category: "Site Frame",
	icon: "panel-top",
	defaults: {
		variant: "commerce-inline",
		brandLabel: createWebsiteBuilderLocalizedDefault({
			en: "Website Builder",
			ru: "Website Builder",
		}),
		brandHref: "/",
		logoImage: null,
		utilityLinks: createWebsiteBuilderLocalizedDefault({
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
		catalogLabel: createWebsiteBuilderLocalizedDefault({
			en: "Catalog",
			ru: "Каталог",
		}),
		searchPlaceholder: createWebsiteBuilderLocalizedDefault({
			en: "Search the website",
			ru: "Поиск по сайту",
		}),
		contactValue: "+7 (707) 040-43-43",
		contactCaption: createWebsiteBuilderLocalizedDefault({
			en: "Daily from 09:00 to 18:00",
			ru: "Ежедневно с 09:00 до 18:00",
		}),
		primaryCtaLabel: createWebsiteBuilderLocalizedDefault({
			en: "Contact us",
			ru: "Связаться",
		}),
		primaryCtaHref: "/contacts",
		secondaryCtaLabel: createWebsiteBuilderLocalizedDefault({
			en: "WhatsApp",
			ru: "WhatsApp",
		}),
		secondaryCtaHref: "https://wa.me/77070404343",
		showLoginAction: true,
		loginLabel: createWebsiteBuilderLocalizedDefault({
			en: "Admin sign in",
			ru: "Вход для админа",
		}),
		sticky: true,
		compactOnScroll: true,
		showLocaleSwitcher: true,
		disabledExtensionIds: [],
		disabledExtensionItemIds: [],
		categoryLinks: createWebsiteBuilderLocalizedDefault({
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
