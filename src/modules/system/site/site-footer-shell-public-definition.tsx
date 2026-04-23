"use client";

import clsx from "clsx";
import { ArrowRight, Send } from "lucide-react";
import { EditableImage } from "../../../components/public/public-editable-image";
import { EditableText } from "../../../components/public/public-editable-text";
import { EditableTextarea } from "../../../components/public/public-editable-textarea";
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
	collectPhotonPublicFooterExtensionItems,
	resolvePhotonPublicSiteFrameExtensions,
} from "../../../helpers/public-site-frame-extensions";
import type { PhotonBlockComponentProps, PhotonField } from "../../../types";
import {
	normalizePhotonSiteLinkItems,
	normalizePhotonSiteNavigationColumns,
	normalizePhotonSiteStringItems,
} from "./helpers";

type SiteFooterProps = {
	variant: "classic-dark" | "soft-cards" | "minimal-air";
	brandTitle: string;
	brandBody: string;
	logoImage: unknown;
	subscriptionTitle: string;
	subscriptionBody: string;
	subscriptionPlaceholder: string;
	subscriptionButtonLabel: string;
	navigationColumns: Array<{
		title: string;
		links: Array<{ label: string; href: string }>;
	}>;
	contactItems: string[];
	legalLabel: string;
	legalHref: string;
	copyrightLabel: string;
	developerLabel: string;
	developerHref: string;
	disabledExtensionIds?: string[];
	disabledExtensionItemIds?: string[];
};

const siteFooterFields: PhotonField[] = [
	{
		path: "variant",
		label: "Variant",
		kind: "select",
		group: "style",
		localization: "shared",
		options: [
			{ label: "Classic dark", value: "classic-dark" },
			{ label: "Soft cards", value: "soft-cards" },
			{ label: "Minimal air", value: "minimal-air" },
		],
	},
	{
		path: "brandTitle",
		label: "Brand title",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "brandBody",
		label: "Brand body",
		kind: "textarea",
		group: "content",
		localization: "localized",
	},
	{
		path: "logoImage",
		label: "Logo image",
		kind: "image",
		group: "content",
		localization: "shared",
	},
	{
		path: "subscriptionTitle",
		label: "Subscription title",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "subscriptionBody",
		label: "Subscription body",
		kind: "textarea",
		group: "content",
		localization: "localized",
	},
	{
		path: "subscriptionPlaceholder",
		label: "Subscription placeholder",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "subscriptionButtonLabel",
		label: "Subscription button label",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "navigationColumns",
		label: "Navigation columns",
		kind: "repeater",
		group: "content",
		localization: "localized",
		itemLabelPath: "title",
		addLabel: "Add navigation column",
		fields: [
			{ path: "title", label: "Title", kind: "text" },
			{
				path: "links",
				label: "Links",
				kind: "repeater",
				addLabel: "Add link",
				itemLabelPath: "label",
				fields: [
					{ path: "label", label: "Label", kind: "text" },
					{ path: "href", label: "Href", kind: "url", localization: "shared" },
				],
			},
		],
	},
	{
		path: "contactItems",
		label: "Contact items",
		kind: "repeater",
		group: "content",
		localization: "localized",
		addLabel: "Add contact item",
		itemLabel: "Contact item",
		itemField: { label: "Contact item", kind: "text" },
	},
	{
		path: "legalLabel",
		label: "Legal label",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "legalHref",
		label: "Legal href",
		kind: "url",
		group: "content",
		localization: "shared",
	},
	{
		path: "copyrightLabel",
		label: "Copyright label",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "developerLabel",
		label: "Developer label",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "developerHref",
		label: "Developer href",
		kind: "url",
		group: "content",
		localization: "shared",
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

const footerVariantStyles: Record<
	SiteFooterProps["variant"],
	{
		shell: string;
		card: string;
		text: string;
		muted: string;
	}
> = {
	"classic-dark": {
		shell:
			"bg-[linear-gradient(180deg,color-mix(in_srgb,var(--photon-site-surface)_94%,black)_0%,color-mix(in_srgb,var(--photon-site-background)_88%,black)_100%)] text-white",
		card: "border-white/10 bg-white/[0.04]",
		text: "text-white",
		muted: "text-white/60",
	},
	"soft-cards": {
		shell:
			"bg-[linear-gradient(180deg,#f7f7fb_0%,#eef2f7_100%)] text-[var(--photon-site-text)]",
		card: "border-[var(--photon-site-border)] bg-white/85",
		text: "text-[var(--photon-site-text)]",
		muted: "text-[var(--photon-site-muted)]",
	},
	"minimal-air": {
		shell:
			"border-t border-[var(--photon-site-border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--photon-site-background)_94%,white)_0%,color-mix(in_srgb,var(--photon-site-surface)_94%,white)_100%)] text-[var(--photon-site-text)] shadow-none",
		card: "border-transparent bg-transparent",
		text: "text-[var(--photon-site-text)]",
		muted: "text-[var(--photon-site-muted)]",
	},
};

const SiteFooterShell = ({
	block,
}: PhotonBlockComponentProps<SiteFooterProps>) => {
	const siteDesign = usePhotonStore((state) => state.site.settings.design);
	const siteFrameExtensions = usePhotonStore(
		(state) => state.siteFrameExtensions,
	);
	const framelessSite = isPhotonPublicFramelessSiteDesign(siteDesign);
	const footerVariant = framelessSite ? "minimal-air" : block.props.variant;
	const variant =
		footerVariantStyles[footerVariant] ?? footerVariantStyles["classic-dark"];
	const isSoftCardsVariant = footerVariant === "soft-cards" && !framelessSite;
	const disabledExtensionIds = normalizePhotonSiteStringItems(
		block.props.disabledExtensionIds,
	);
	const disabledExtensionItemIds = normalizePhotonSiteStringItems(
		block.props.disabledExtensionItemIds,
	);
	const footerExtensionItems = collectPhotonPublicFooterExtensionItems(
		resolvePhotonPublicSiteFrameExtensions(
			siteFrameExtensions,
			disabledExtensionIds,
		),
		disabledExtensionItemIds,
	);
	const navigationColumns = [
		...normalizePhotonSiteNavigationColumns(block.props.navigationColumns),
		...normalizePhotonSiteNavigationColumns(
			footerExtensionItems.navigationColumns,
		),
	];
	const legalLinks = normalizePhotonSiteLinkItems(
		footerExtensionItems.legalLinks,
	);
	const contactItems = normalizePhotonSiteStringItems(block.props.contactItems);

	return (
		<footer
			className={clsx(
				"w-full transition-colors duration-300",
				(
					footerVariantStyles[footerVariant] ??
					footerVariantStyles["classic-dark"]
				).shell,
			)}
		>
			<div className="mx-auto flex w-full max-w-[var(--photon-site-max-width,1280px)] flex-col gap-5 px-[var(--photon-site-gutter,24px)] py-8 pb-12 sm:py-10 sm:pb-14">
				<div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
					<div
						className={clsx(
							footerVariant === "minimal-air"
								? "rounded-none border-0 border-b border-[var(--photon-site-border)] px-0 pb-6 pt-0 sm:px-0"
								: "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
							(
								footerVariantStyles[footerVariant] ??
								footerVariantStyles["classic-dark"]
							).card,
						)}
					>
						<div className="grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)]">
							<div className="relative h-24 w-24 overflow-hidden rounded-[28px] border border-[var(--photon-site-border)] bg-[linear-gradient(180deg,rgba(15,118,110,0.16),rgba(15,118,110,0.04))]">
								{block.props.logoImage ? (
									<EditableImage
										blockId={block.id}
										path="logoImage"
										className="h-full w-full rounded-[28px]"
										imageClassName="h-full w-full object-contain p-3"
										fallbackAlt={block.props.brandTitle}
									/>
								) : (
									<div className="flex h-full items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--photon-site-accent)]">
										<EditableText
											blockId={block.id}
											path="brandTitle"
											className="text-[var(--photon-site-accent)]"
										/>
									</div>
								)}
							</div>
							<div className="min-w-0">
								<EditableText
									blockId={block.id}
									path="brandTitle"
									as="h2"
									className={clsx(
										"[font-family:var(--photon-site-heading-font)] text-3xl font-semibold tracking-[-0.05em]",
										variant.text,
									)}
								/>
								<EditableTextarea
									blockId={block.id}
									path="brandBody"
									className={clsx("mt-4 leading-7", variant.muted)}
								/>
							</div>
						</div>
					</div>

					<div
						className={clsx(
							footerVariant === "minimal-air"
								? "rounded-none border-0 px-0 py-0 sm:px-0"
								: "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
							block.props.variant === "soft-cards" && !framelessSite
								? "border-transparent bg-[linear-gradient(135deg,var(--photon-site-accent),color-mix(in srgb,var(--photon-site-accent) 72%, white))] text-white shadow-[0_28px_60px_rgba(15,118,110,0.24)]"
								: (
										footerVariantStyles[footerVariant] ??
										footerVariantStyles["classic-dark"]
									).card,
						)}
					>
						<div className="max-w-xl">
							<EditableText
								blockId={block.id}
								path="subscriptionTitle"
								as="h3"
								className="[font-family:var(--photon-site-heading-font)] text-2xl font-semibold tracking-[-0.04em]"
							/>
							<EditableTextarea
								blockId={block.id}
								path="subscriptionBody"
								className={clsx(
									"mt-3 leading-7",
									isSoftCardsVariant ? "text-white/82" : variant.muted,
								)}
							/>
						</div>
						<div className="mt-5 flex flex-col gap-3 sm:flex-row">
							<div
								className={clsx(
									"flex min-h-14 flex-1 items-center px-4",
									footerVariant === "minimal-air"
										? "rounded-full border border-[var(--photon-site-border)] bg-white/72"
										: "rounded-full border border-white/20 bg-white/10 backdrop-blur-sm",
								)}
							>
								<EditableText
									blockId={block.id}
									path="subscriptionPlaceholder"
									className={clsx(
										"text-sm",
										isSoftCardsVariant ? "text-white/74" : variant.muted,
									)}
								/>
							</div>
							<button
								type="button"
								className={clsx(
									"inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-[0_18px_34px_rgba(15,23,42,0.12)]",
									isSoftCardsVariant
										? "bg-white text-[var(--photon-site-accent)]"
										: "bg-[var(--photon-site-accent)] text-white",
								)}
							>
								<Send className="h-4 w-4" />
								<EditableText
									blockId={block.id}
									path="subscriptionButtonLabel"
									className={clsx(
										isSoftCardsVariant
											? "text-[var(--photon-site-accent)]"
											: "text-white",
									)}
								/>
							</button>
						</div>
					</div>
				</div>

				<div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
					<div
						className={clsx(
							footerVariant === "minimal-air"
								? "rounded-none border-0 border-b border-[var(--photon-site-border)] px-0 pb-6 pt-0 sm:px-0"
								: "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
							(
								footerVariantStyles[footerVariant] ??
								footerVariantStyles["classic-dark"]
							).card,
						)}
					>
						<div className="grid gap-6 md:grid-cols-2">
							{navigationColumns.map((column) => (
								<div key={column.title} className="space-y-3">
									<div className={clsx("text-sm font-semibold", variant.text)}>
										{column.title}
									</div>
									<div className="space-y-2">
										{column.links.map((link) => (
											<PhotonLink
												key={`${column.title}:${link.label}:${link.href}`}
												href={link.href}
												className={clsx(
													"block text-sm transition hover:text-[var(--photon-site-accent)]",
													variant.muted,
												)}
											>
												{link.label}
											</PhotonLink>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					<div
						className={clsx(
							footerVariant === "minimal-air"
								? "rounded-none border-0 px-0 pt-0 sm:px-0"
								: "rounded-[calc(var(--photon-site-radius,24px)-4px)] border px-5 py-5 sm:px-6",
							(
								footerVariantStyles[footerVariant] ??
								footerVariantStyles["classic-dark"]
							).card,
						)}
					>
						<div className={clsx("text-sm font-semibold", variant.text)}>
							Contacts
						</div>
						<div className="mt-4 space-y-3">
							{contactItems.map((item) => (
								<div
									key={item}
									className={clsx("text-sm leading-7", variant.muted)}
								>
									{item}
								</div>
							))}
						</div>
					</div>
				</div>

				<div
					className={clsx(
						"flex flex-col gap-4 border-t pt-5 text-sm md:flex-row md:items-center md:justify-between",
						footerVariant === "classic-dark"
							? "border-white/10"
							: "border-[var(--photon-site-border)]",
					)}
				>
					<EditableText
						blockId={block.id}
						path="copyrightLabel"
						className={
							(
								footerVariantStyles[footerVariant] ??
								footerVariantStyles["classic-dark"]
							).muted
						}
					/>
					<div className="flex flex-wrap items-center gap-4">
						<PhotonLink
							href={block.props.legalHref}
							className={clsx(
								"inline-flex items-center gap-2 transition hover:text-[var(--photon-site-accent)]",
								(
									footerVariantStyles[footerVariant] ??
									footerVariantStyles["classic-dark"]
								).muted,
							)}
						>
							<EditableText blockId={block.id} path="legalLabel" />
							<ArrowRight className="h-4 w-4" />
						</PhotonLink>
						{legalLinks.map((link) => (
							<PhotonLink
								key={`${link.label}:${link.href}`}
								href={link.href}
								target={link.target}
								rel={link.rel}
								className={clsx(
									"inline-flex items-center gap-2 transition hover:text-[var(--photon-site-accent)]",
									(
										footerVariantStyles[footerVariant] ??
										footerVariantStyles["classic-dark"]
									).muted,
								)}
							>
								{link.label}
								<ArrowRight className="h-4 w-4" />
							</PhotonLink>
						))}
						<PhotonLink
							href={block.props.developerHref}
							className={clsx(
								"font-semibold transition hover:text-[var(--photon-site-accent)]",
								(
									footerVariantStyles[footerVariant] ??
									footerVariantStyles["classic-dark"]
								).text,
							)}
						>
							<EditableText blockId={block.id} path="developerLabel" />
						</PhotonLink>
					</div>
				</div>
			</div>
		</footer>
	);
};

export const siteFooterShellDefinition = definePhotonBlockDefinition({
	type: "site-footer-shell",
	label: "Site Footer Shell",
	labelKey: "photon.system.siteFooter.block.label",
	description:
		"Shared footer with editorial brand copy, subscription card, navigation columns and legal row.",
	descriptionKey: "photon.system.siteFooter.block.description",
	category: "Site Frame",
	icon: "panel-bottom",
	defaults: {
		variant: "classic-dark",
		brandTitle: createPhotonLocalizedDefault({
			en: "Photon",
			ru: "Photon",
		}),
		brandBody: createPhotonLocalizedDefault({
			en: "Package-first live website editing for teams that want reusable packages, clean package boundaries and real page composition.",
			ru: "Package-first редактирование живого сайта для команд, которым нужны переиспользуемые пакеты, чистые границы пакетов и настоящая композиция страниц.",
		}),
		logoImage: null,
		subscriptionTitle: createPhotonLocalizedDefault({
			en: "Get product notes and release updates",
			ru: "Получайте продуктовые заметки и обновления релизов",
		}),
		subscriptionBody: createPhotonLocalizedDefault({
			en: "Subscribe for major builder releases, new integration kits and architecture notes.",
			ru: "Подпишитесь, чтобы получать крупные релизы builder, новые integration kits и архитектурные заметки.",
		}),
		subscriptionPlaceholder: createPhotonLocalizedDefault({
			en: "Enter your email",
			ru: "Введите ваш email",
		}),
		subscriptionButtonLabel: createPhotonLocalizedDefault({
			en: "Subscribe",
			ru: "Подписаться",
		}),
		navigationColumns: createPhotonLocalizedDefault({
			en: [
				{
					title: "Product",
					links: [
						{ label: "Overview", href: "/" },
						{ label: "Publication", href: "/news" },
						{ label: "Contacts", href: "/contacts" },
					],
				},
				{
					title: "Company",
					links: [
						{ label: "About", href: "/about" },
						{ label: "Blog", href: "/blog" },
						{ label: "Privacy", href: "/privacy" },
					],
				},
			],
			ru: [
				{
					title: "Продукт",
					links: [
						{ label: "Обзор", href: "/" },
						{ label: "Публикации", href: "/news" },
						{ label: "Контакты", href: "/contacts" },
					],
				},
				{
					title: "Компания",
					links: [
						{ label: "О нас", href: "/about" },
						{ label: "Блог", href: "/blog" },
						{ label: "Приватность", href: "/privacy" },
					],
				},
			],
		}),
		contactItems: createPhotonLocalizedDefault({
			en: ["+7 (707) 040-43-43", "hello@example.test", "Almaty, Kazakhstan"],
			ru: ["+7 (707) 040-43-43", "hello@example.test", "Алматы, Казахстан"],
		}),
		legalLabel: createPhotonLocalizedDefault({
			en: "Privacy policy",
			ru: "Политика конфиденциальности",
		}),
		legalHref: "/privacy",
		copyrightLabel: createPhotonLocalizedDefault({
			en: "Photon 2026",
			ru: "Photon 2026",
		}),
		developerLabel: createPhotonLocalizedDefault({
			en: "Built by init",
			ru: "Сделано init",
		}),
		developerHref: "https://init.kz",
		disabledExtensionIds: [],
		disabledExtensionItemIds: [],
	},
	fields: siteFooterFields,
	component: SiteFooterShell,
});
