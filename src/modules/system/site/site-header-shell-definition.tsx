"use client";

import clsx from "clsx";
import { ArrowRight, LogIn } from "lucide-react";
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
	isWebsiteBuilderFramelessSiteDesign,
} from "../../../helpers/site-design";
import { WebsiteBuilderSiteSearch } from "../../../search/website-builder-site-search";
import type {
	WebsiteBuilderBlockComponentProps,
	WebsiteBuilderField,
} from "../../../types";
import { normalizeWebsiteBuilderSiteLinkItems } from "./helpers";

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
];

const SiteHeaderShell = ({
	block,
}: WebsiteBuilderBlockComponentProps<SiteHeaderProps>) => {
	const isAdmin = useWebsiteBuilderStore((state) => state.isAdmin);
	const mode = useWebsiteBuilderStore((state) => state.mode);
	const currentRoute = useWebsiteBuilderStore((state) => state.document.route);
	const requestAuth = useWebsiteBuilderStore((state) => state.requestAuth);
	const siteDesign = useWebsiteBuilderStore((state) => state.site.settings.design);
	const { locale, publicLocales, translate } = useWebsiteBuilderI18n();
	const [isCompact, setIsCompact] = useState(false);
	const headerRef = useRef<HTMLElement | null>(null);
	const utilityLinks = normalizeWebsiteBuilderSiteLinkItems(
		block.props.utilityLinks,
	);
	const categoryLinks = normalizeWebsiteBuilderSiteLinkItems(
		block.props.categoryLinks,
	);
	const variant = block.props.variant ?? "commerce-inline";
	const liveSurfaceMode = mode !== "builder";
	const compact = liveSurfaceMode && block.props.compactOnScroll && isCompact;
	const framelessSite = isWebsiteBuilderFramelessSiteDesign(siteDesign);
	const isShowcaseCard = variant === "showcase-card" && !framelessSite;
	const localeSwitcherVisible =
		block.props.showLocaleSwitcher !== false && publicLocales.length > 1;

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
									<WebsiteBuilderLink
										key={`${link.label}:${link.href}`}
										href={link.href}
										data-wb-header-utility-link={link.href}
										className="transition hover:text-[var(--wb-site-text)]"
									>
										{link.label}
									</WebsiteBuilderLink>
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
								{block.props.showLoginAction && !isAdmin ? (
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
									<WebsiteBuilderLink
										key={`${link.label}:${link.href}`}
										href={link.href}
										className={clsx(
											"rounded-full border border-[var(--wb-site-border)] px-4 py-2 text-sm text-[var(--wb-site-text)] transition hover:border-[var(--wb-site-accent)] hover:text-[var(--wb-site-accent)]",
											framelessSite
												? "bg-transparent"
												: isShowcaseCard
													? "bg-[var(--wb-site-background)]"
													: "bg-white/0",
										)}
									>
										{link.label}
									</WebsiteBuilderLink>
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
