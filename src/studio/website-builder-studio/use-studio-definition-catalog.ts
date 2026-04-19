"use client";

import { useMemo } from "react";
import type {
	WebsiteBuilderBlock,
	WebsiteBuilderPageCatalogItem,
	WebsiteBuilderPageSettings,
	WebsiteBuilderRegistry,
	WebsiteBuilderSite,
} from "../../types";
import {
	createInspectorDefinitionMeta,
	filterPaletteDefinitions,
	groupInspectorFields,
	groupPaletteDefinitions,
	normalizePaletteDefinitions,
} from "./helpers";

type UseStudioDefinitionCatalogInput = {
	registry: WebsiteBuilderRegistry;
	selectedBlock: WebsiteBuilderBlock | null;
	selectedPaletteKey: string | null;
	currentPage: WebsiteBuilderPageCatalogItem | null;
	pageSettings: WebsiteBuilderPageSettings;
	site: WebsiteBuilderSite;
	search: string;
	paletteFamily: string;
	palettePackage: string;
};

export const createStudioDefinitionCatalog = ({
	registry,
	selectedBlock,
	selectedPaletteKey,
	currentPage,
	pageSettings,
	site,
	search,
	paletteFamily,
	palettePackage,
}: UseStudioDefinitionCatalogInput) => {
	const allPaletteBlocks = normalizePaletteDefinitions(
		registry.getPaletteBlocks() as any,
	);
	const allPageSettingsPanels = registry.getPageSettingsPanels();
	const allSiteSettingsPanels = registry.getSiteSettingsPanels();
	const paletteDefinitionByKey = new Map(
		allPaletteBlocks.map((definition) => [definition.key, definition] as const),
	);
	const paletteBlocks = filterPaletteDefinitions(
		allPaletteBlocks,
		search,
		paletteFamily,
		palettePackage,
	);
	const paletteGroups = groupPaletteDefinitions(paletteBlocks);
	const selectedDefinition =
		selectedBlock &&
		typeof selectedBlock.module === "string" &&
		typeof selectedBlock.type === "string"
			? registry.getDefinition(selectedBlock.module, selectedBlock.type)
			: null;
	const selectedPaletteDefinition = selectedPaletteKey
		? (paletteDefinitionByKey.get(selectedPaletteKey) ?? null)
		: null;
	const effectiveInspectorDefinition =
		selectedDefinition ?? selectedPaletteDefinition;
	const inspectorGroups = groupInspectorFields(effectiveInspectorDefinition);
	const inspectorDefinition = createInspectorDefinitionMeta({
		definition: effectiveInspectorDefinition,
		module:
			(typeof selectedBlock?.module === "string"
				? selectedBlock.module
				: selectedPaletteDefinition?.module) ?? "",
	});
	const visiblePageSettingsPanels = allPageSettingsPanels.filter((panel) =>
		panel.isVisible
			? panel.isVisible({
					scope: panel.scope,
					currentPage,
					pageSettings,
				})
			: true,
	);
	const visibleSiteSettingsPanels = allSiteSettingsPanels.filter((panel) =>
		panel.isVisible
			? panel.isVisible({
					currentPage,
					pageSettings,
					site,
				})
			: true,
	);
	const definitionFields = effectiveInspectorDefinition?.fields ?? [];

	return {
		allPaletteBlocks,
		paletteGroups,
		definitionFields,
		inspectorGroups,
		inspectorDefinition,
		visiblePageSettingsPanels,
		visibleSiteSettingsPanels,
	};
};

export const useStudioDefinitionCatalog = (
	input: UseStudioDefinitionCatalogInput,
) =>
	useMemo(
		() => createStudioDefinitionCatalog(input),
		[
			input.currentPage,
			input.pageSettings,
			input.paletteFamily,
			input.palettePackage,
			input.registry,
			input.search,
			input.selectedBlock,
			input.selectedPaletteKey,
			input.site,
		],
	);
