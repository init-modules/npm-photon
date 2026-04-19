"use client";

import type { WebsiteBuilderI18nValue } from "../types";

const PALETTE_CATEGORY_KEYS: Record<string, string> = {
	Content: "websiteBuilder.palette.categories.content",
	Conversion: "websiteBuilder.palette.categories.conversion",
	Evidence: "websiteBuilder.palette.categories.evidence",
	Hero: "websiteBuilder.palette.categories.hero",
	Layout: "websiteBuilder.palette.categories.layout",
	Media: "websiteBuilder.palette.categories.media",
	Publication: "websiteBuilder.palette.categories.publication",
	"Site Frame": "websiteBuilder.palette.categories.siteFrame",
	System: "websiteBuilder.palette.categories.system",
};

const FIELD_GROUP_KEYS: Record<string, string> = {
	content: "websiteBuilder.fieldGroups.content",
	style: "websiteBuilder.fieldGroups.style",
	layout: "websiteBuilder.fieldGroups.layout",
	data: "websiteBuilder.fieldGroups.data",
	misc: "websiteBuilder.fieldGroups.misc",
};

const PAGE_GROUP_KEYS: Record<string, string> = {
	Pages: "websiteBuilder.pageBrowser.groups.pages",
	Publications: "websiteBuilder.pageBrowser.groups.publications",
	Templates: "websiteBuilder.pageBrowser.groups.templates",
};

export const translateWebsiteBuilderPaletteCategory = (
	category: string,
	translate: WebsiteBuilderI18nValue["translate"],
) => translate(PALETTE_CATEGORY_KEYS[category] ?? category, category);

export const translateWebsiteBuilderFieldGroup = (
	group: string,
	translate: WebsiteBuilderI18nValue["translate"],
) => translate(FIELD_GROUP_KEYS[group] ?? group, group);

export const translateWebsiteBuilderPageGroup = (
	group: string,
	translate: WebsiteBuilderI18nValue["translate"],
) => translate(PAGE_GROUP_KEYS[group] ?? group, group);
