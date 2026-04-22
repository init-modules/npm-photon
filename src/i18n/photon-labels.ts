"use client";

import type { PhotonI18nValue } from "../types";

const PALETTE_CATEGORY_KEYS: Record<string, string> = {
	Content: "photon.palette.categories.content",
	Conversion: "photon.palette.categories.conversion",
	Evidence: "photon.palette.categories.evidence",
	Hero: "photon.palette.categories.hero",
	Layout: "photon.palette.categories.layout",
	Media: "photon.palette.categories.media",
	Publication: "photon.palette.categories.publication",
	"Site Frame": "photon.palette.categories.siteFrame",
	System: "photon.palette.categories.system",
};

const FIELD_GROUP_KEYS: Record<string, string> = {
	content: "photon.fieldGroups.content",
	style: "photon.fieldGroups.style",
	layout: "photon.fieldGroups.layout",
	data: "photon.fieldGroups.data",
	misc: "photon.fieldGroups.misc",
};

const PAGE_GROUP_KEYS: Record<string, string> = {
	Pages: "photon.pageBrowser.groups.pages",
	Publications: "photon.pageBrowser.groups.publications",
	Templates: "photon.pageBrowser.groups.templates",
};

export const translatePhotonPaletteCategory = (
	category: string,
	translate: PhotonI18nValue["translate"],
) => translate(PALETTE_CATEGORY_KEYS[category] ?? category, category);

export const translatePhotonFieldGroup = (
	group: string,
	translate: PhotonI18nValue["translate"],
) => translate(FIELD_GROUP_KEYS[group] ?? group, group);

export const translatePhotonPageGroup = (
	group: string,
	translate: PhotonI18nValue["translate"],
) => translate(PAGE_GROUP_KEYS[group] ?? group, group);
