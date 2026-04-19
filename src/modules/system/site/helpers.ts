"use client";

export type WebsiteBuilderSiteLinkItem = {
	id?: string;
	label: string;
	href: string;
	target?: string;
	rel?: string;
};

export type WebsiteBuilderSiteNavigationColumn = {
	title: string;
	links: WebsiteBuilderSiteLinkItem[];
};

const normalizeString = (value: unknown) =>
	typeof value === "string" ? value : "";

export const normalizeWebsiteBuilderSiteLinkItems = (
	value: unknown,
): WebsiteBuilderSiteLinkItem[] =>
	Array.isArray(value)
		? value.flatMap((candidate) =>
				typeof candidate === "object" &&
				candidate !== null &&
				typeof (candidate as { label?: unknown }).label === "string" &&
				typeof (candidate as { href?: unknown }).href === "string"
					? [
							{
								id:
									typeof (candidate as { id?: unknown }).id === "string"
										? (candidate as { id: string }).id
										: undefined,
								label: normalizeString((candidate as { label: unknown }).label),
								href: normalizeString((candidate as { href: unknown }).href),
								target:
									typeof (candidate as { target?: unknown }).target === "string"
										? (candidate as { target: string }).target
										: undefined,
								rel:
									typeof (candidate as { rel?: unknown }).rel === "string"
										? (candidate as { rel: string }).rel
										: undefined,
							},
						]
					: [],
			)
		: [];

export const normalizeWebsiteBuilderSiteNavigationColumns = (
	value: unknown,
): WebsiteBuilderSiteNavigationColumn[] =>
	Array.isArray(value)
		? value.flatMap((candidate) =>
				typeof candidate === "object" &&
				candidate !== null &&
				typeof (candidate as { title?: unknown }).title === "string"
					? [
							{
								title: normalizeString((candidate as { title: unknown }).title),
								links: normalizeWebsiteBuilderSiteLinkItems(
									(candidate as { links?: unknown }).links ?? [],
								),
							},
						]
					: [],
			)
		: [];

export const normalizeWebsiteBuilderSiteStringItems = (
	value: unknown,
): string[] =>
	Array.isArray(value)
		? value.flatMap((candidate) =>
				typeof candidate === "string" && candidate.trim() !== ""
					? [candidate]
					: [],
			)
		: [];
