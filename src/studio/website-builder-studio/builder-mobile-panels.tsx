"use client";

import { InspectorPanel } from "../inspector-panel";
import { PalettePanel } from "../palette-panel";
import type {
	WebsiteBuilderPageCatalogItem,
	WebsiteBuilderPageSettings,
} from "../../types";
import type {
	InspectorDefinitionMeta,
	InspectorGroups,
	PaletteFamilyGroup,
	PaletteDefinition,
} from "../types";

type BuilderMobilePanelsProps = {
	search: string;
	onSearchChange: (value: string) => void;
	allPaletteBlocks: PaletteDefinition[];
	paletteGroups: PaletteFamilyGroup[];
	paletteFamily: string;
	onPaletteFamilyChange: (family: string) => void;
	palettePackage: string;
	onPalettePackageChange: (pkg: string) => void;
	collapsedFamilies: string[];
	onToggleFamily: (family: string) => void;
	collapsedGroups: string[];
	onToggleGroup: (group: string) => void;
	selectedDefinitionKey: string | null;
	onSelectDefinition: (definition: PaletteDefinition) => void;
	onInsert: (definition: PaletteDefinition) => void;
	manualInsertTarget: { listId: string; index: number } | null;
	definitionFields: PaletteDefinition["fields"];
	inspectorGroups: InspectorGroups;
	selectedFieldPath: string | null;
	inspectorDefinition: InspectorDefinitionMeta | null;
	pageSettings: WebsiteBuilderPageSettings;
	currentPage: WebsiteBuilderPageCatalogItem | null;
	onContentLocaleChange?: (locale: string) => void;
};

export const BuilderMobilePanels = ({
	search,
	onSearchChange,
	allPaletteBlocks,
	paletteGroups,
	paletteFamily,
	onPaletteFamilyChange,
	palettePackage,
	onPalettePackageChange,
	collapsedFamilies,
	onToggleFamily,
	collapsedGroups,
	onToggleGroup,
	selectedDefinitionKey,
	onSelectDefinition,
	onInsert,
	manualInsertTarget,
	definitionFields,
	inspectorGroups,
	selectedFieldPath,
	inspectorDefinition,
	pageSettings,
	currentPage,
	onContentLocaleChange,
}: BuilderMobilePanelsProps) => {
	return (
		<div className="mt-6 grid gap-4 lg:hidden">
			<PalettePanel
				search={search}
				onSearchChange={onSearchChange}
				allPaletteBlocks={allPaletteBlocks}
				paletteGroups={paletteGroups}
				paletteFamily={paletteFamily}
				onPaletteFamilyChange={onPaletteFamilyChange}
				palettePackage={palettePackage}
				onPalettePackageChange={onPalettePackageChange}
				collapsedFamilies={collapsedFamilies}
				onToggleFamily={onToggleFamily}
				collapsedGroups={collapsedGroups}
				onToggleGroup={onToggleGroup}
				selectedDefinitionKey={selectedDefinitionKey}
				onSelectDefinition={onSelectDefinition}
				onInsert={onInsert}
				manualInsertTarget={manualInsertTarget}
			/>
			<InspectorPanel
				definitionFields={definitionFields}
				inspectorGroups={inspectorGroups}
				selectedFieldPath={selectedFieldPath}
				inspectorDefinition={inspectorDefinition}
				pageSettings={pageSettings}
				currentPage={currentPage}
				onContentLocaleChange={onContentLocaleChange}
			/>
		</div>
	);
};
