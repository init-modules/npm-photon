"use client";

export type WebsiteBuilderSiteLinkItem = {
	label: string;
	href: string;
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
								label: normalizeString((candidate as { label: unknown }).label),
								href: normalizeString((candidate as { href: unknown }).href),
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
