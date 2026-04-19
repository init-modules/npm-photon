import assert from "node:assert/strict";
import test from "node:test";
import type {
	WebsiteBuilderAnyBlockDefinition,
	WebsiteBuilderRegistry,
} from "../../types";
import { createStudioDefinitionCatalog } from "./use-studio-definition-catalog";

const textDefinition: WebsiteBuilderAnyBlockDefinition & {
	key: string;
	module: string;
} = {
	key: "marketing.hero",
	module: "marketing",
	type: "hero",
	label: "Hero",
	description: "Hero block",
	category: "sections",
	defaults: {},
	fields: [
		{
			path: "title",
			label: "Title",
			kind: "text" as const,
			group: "content" as const,
		},
	],
	component: () => null,
};

const registry: WebsiteBuilderRegistry = {
	modules: [],
	definitions: new Map([["marketing:hero", textDefinition]]),
	bindingAdapters: new Map(),
	pageSettingsPanels: [
		{
			key: "page-seo",
			scope: "page",
			label: "SEO",
			component: () => null,
			isVisible: ({ currentPage }) => currentPage?.kind === "page",
		},
	],
	siteSettingsPanels: [
		{
			key: "site-branding",
			label: "Branding",
			component: () => null,
			isVisible: ({ site }) => Boolean(site.settings.branding),
		},
	],
	getDefinition: (moduleName, blockType) =>
		moduleName === "marketing" && blockType === "hero"
			? textDefinition
			: undefined,
	getBindingAdapter: () => undefined,
	getPageSettingsPanels: () => registry.pageSettingsPanels,
	getSiteSettingsPanels: () => registry.siteSettingsPanels,
	getPaletteBlocks: () => [textDefinition],
};

test("definition catalog resolves palette selection and visible panels", () => {
	const catalog = createStudioDefinitionCatalog({
		registry,
		selectedBlock: null,
		selectedPaletteKey: "marketing.hero",
		currentPage: {
			key: "home",
			name: "Home",
			kind: "page",
			route: "/",
			canOpen: true,
			canDuplicate: true,
			isDynamic: false,
		},
		pageSettings: {},
		site: {
			settings: {
				branding: {
					logo: "logo.svg",
				},
			},
			regions: {},
		},
		search: "hero",
	});

	assert.equal(catalog.allPaletteBlocks.length, 1);
	assert.equal(catalog.paletteGroups.sections?.length, 1);
	assert.equal(catalog.inspectorDefinition?.module, "marketing");
	assert.equal(catalog.definitionFields.length, 1);
	assert.equal(catalog.visiblePageSettingsPanels.length, 1);
	assert.equal(catalog.visibleSiteSettingsPanels.length, 1);
});
