import type { WebsiteBuilderBlockDefinition } from "../../types";
import type {
	InspectorDefinitionMeta,
	InspectorGroups,
	PaletteDefinition,
	PaletteFamilyGroup,
} from "../types";

const resolvePaletteFamily = (definition: PaletteDefinition) => {
	if (definition.family?.trim()) {
		return definition.family;
	}

	if (definition.type.startsWith("init-landing-")) {
		return "init";
	}

	if (
		[
			"hero-spotlight",
			"proof-strip",
			"feature-grid",
			"command-center-cta",
			"split-layout",
		].includes(definition.type)
	) {
		return "paper";
	}

	return "standard";
};

const resolvePaletteGroup = (definition: PaletteDefinition) =>
	definition.group?.trim() || definition.category;

const resolvePalettePackage = (definition: PaletteDefinition) => {
	if (definition.package?.trim()) {
		return definition.package;
	}

	if (
		definition.category === "Publication" ||
		definition.type.includes("publication") ||
		definition.type.includes("article")
	) {
		return "publication";
	}

	if (definition.module === "marketing-demo") {
		return "base-kit";
	}

	if (definition.module === "website-builder-system") {
		return "core";
	}

	return definition.module;
};

export const normalizePaletteDefinitions = (definitions: PaletteDefinition[]) =>
	definitions.map((definition) => ({
		...definition,
		family: resolvePaletteFamily(definition),
		group: resolvePaletteGroup(definition),
		package: resolvePalettePackage(definition),
	}));

export const filterPaletteDefinitions = (
	definitions: PaletteDefinition[],
	search: string,
	activeFamily: string,
	activePackage: string,
) => {
	const normalizedSearch = search.trim().toLowerCase();

	return definitions.filter((definition) => {
		const matchesFamily =
			activeFamily === "all" || definition.family === activeFamily;
		const matchesPackage =
			activePackage === "all" || definition.package === activePackage;
		const matchesSearch =
			!normalizedSearch ||
			[
				definition.label,
				definition.description,
				definition.category,
				definition.module,
				definition.family,
				definition.group,
				definition.package,
			]
				.join(" ")
				.toLowerCase()
				.includes(normalizedSearch);

		return matchesFamily && matchesPackage && matchesSearch;
	});
};

export const groupPaletteDefinitions = (
	definitions: PaletteDefinition[],
): PaletteFamilyGroup[] => {
	const families = new Map<
		string,
		{
			packageOptions: Set<string>;
			groups: Map<string, PaletteDefinition[]>;
		}
	>();

	for (const definition of definitions) {
		const familyEntry = families.get(definition.family) ?? {
			packageOptions: new Set<string>(),
			groups: new Map<string, PaletteDefinition[]>(),
		};
		familyEntry.packageOptions.add(definition.package);
		const groupDefinitions = familyEntry.groups.get(definition.group) ?? [];
		groupDefinitions.push(definition);
		familyEntry.groups.set(definition.group, groupDefinitions);
		families.set(definition.family, familyEntry);
	}

	return Array.from(families.entries()).map(([family, entry]) => ({
		family,
		packageOptions: Array.from(entry.packageOptions).sort((left, right) =>
			left.localeCompare(right),
		),
		groups: Array.from(entry.groups.entries())
			.map(([group, groupDefinitions]) => ({
				group,
				definitions: groupDefinitions,
			}))
			.sort((left, right) => left.group.localeCompare(right.group)),
	}));
};

export const groupInspectorFields = (
	definition: WebsiteBuilderBlockDefinition | null,
): InspectorGroups =>
	definition?.fields.reduce<InspectorGroups>((groups, field) => {
		const key = field.group ?? "misc";
		groups[key] ??= [];
		groups[key].push(field);
		return groups;
	}, {}) ?? {};

export const createInspectorDefinitionMeta = ({
	definition,
	module,
}: {
	definition: WebsiteBuilderBlockDefinition | null;
	module: string;
}): InspectorDefinitionMeta | null =>
	definition
		? {
				label: definition.label,
				labelKey: definition.labelKey,
				description: definition.description,
				descriptionKey: definition.descriptionKey,
				module,
				category: definition.category,
				fieldCount: definition.fields.length,
			}
		: null;
