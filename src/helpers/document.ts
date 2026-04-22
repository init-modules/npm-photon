import type {
	PhotonAnyBlockDefinition,
	PhotonBindingAdapter,
	PhotonBlock,
	PhotonBlockDefinition,
	PhotonBlockLocalizationSchema,
	PhotonBlockProps,
	PhotonDocument,
	PhotonLocalizedDefaultValue,
	PhotonModule,
	PhotonNestedField,
	PhotonPageSettingsPanelDefinition,
	PhotonRegistry,
	PhotonRegistryEntry,
	PhotonSiteSettingsPanelDefinition,
} from "../types";
import { resolvePhotonModules } from "./installable";
import { clonePhotonValue } from "./path";
import { createPhotonNodeId } from "./tree";

export const getPhotonDefinitionKey = (
	moduleName: string,
	blockType: string,
) => `${moduleName}::${blockType}`;

export const createPhotonRegistry = (
	entries: PhotonRegistryEntry[],
): PhotonRegistry => {
	const modules = resolvePhotonModules(entries);
	const definitions = new Map<string, PhotonAnyBlockDefinition>();
	const bindingAdapters = new Map<string, PhotonBindingAdapter>();
	const pageSettingsPanels: PhotonPageSettingsPanelDefinition[] = [];
	const siteSettingsPanels: PhotonSiteSettingsPanelDefinition[] = [];

	modules.forEach((moduleEntry) => {
		moduleEntry.blocks.forEach((definition) => {
			definitions.set(
				getPhotonDefinitionKey(moduleEntry.module, definition.type),
				definition,
			);
		});

		moduleEntry.bindingAdapters?.forEach((adapter) => {
			bindingAdapters.set(adapter.key, adapter);
		});

		moduleEntry.pageSettingsPanels?.forEach((panel) => {
			pageSettingsPanels.push(panel);
		});

		moduleEntry.siteSettingsPanels?.forEach((panel) => {
			siteSettingsPanels.push(panel);
		});
	});

	pageSettingsPanels.sort((left, right) => {
		const scopeOrder = {
			page: 0,
			template: 1,
			record: 2,
		} as const;

		const byScope = scopeOrder[left.scope] - scopeOrder[right.scope];

		if (byScope !== 0) {
			return byScope;
		}

		return (left.order ?? 0) - (right.order ?? 0);
	});

	siteSettingsPanels.sort(
		(left, right) => (left.order ?? 0) - (right.order ?? 0),
	);

	return {
		modules,
		definitions,
		bindingAdapters,
		pageSettingsPanels,
		siteSettingsPanels,
		getDefinition(moduleName, blockType) {
			return definitions.get(
				getPhotonDefinitionKey(moduleName, blockType),
			);
		},
		getBindingAdapter(key) {
			return bindingAdapters.get(key);
		},
		getPageSettingsPanels() {
			return pageSettingsPanels;
		},
		getSiteSettingsPanels() {
			return siteSettingsPanels;
		},
		getPaletteBlocks() {
			return modules.flatMap((moduleEntry) =>
				moduleEntry.blocks.map((definition) => ({
					...definition,
					module: moduleEntry.module,
					key: getPhotonDefinitionKey(
						moduleEntry.module,
						definition.type,
					),
				})),
			);
		},
	};
};

export const createPhotonLocalizedDefault = <T>(
	values: Record<string, T>,
): PhotonLocalizedDefaultValue<T> => ({
	__wbLocalizedDefault: true,
	values,
});

const registerPhotonFieldLocalization = (
	schema: PhotonBlockLocalizationSchema,
	mode: "localized" | "shared",
	path: string,
) => {
	const normalizedPath = path.replace(/(?:^|\.)\d+(?=\.|$)/g, (segment) =>
		segment.startsWith(".") ? ".*" : "*",
	);

	if (mode === "localized") {
		schema.localized.push(normalizedPath);
		return;
	}

	schema.shared.push(normalizedPath);
};

const collectPhotonFieldLocalization = (
	field: PhotonNestedField,
	schema: PhotonBlockLocalizationSchema,
	basePath: string,
	inheritedLocalization?: "localized" | "shared",
) => {
	const effectiveLocalization = field.localization ?? inheritedLocalization;
	const currentPath = field.path
		? basePath
			? `${basePath}.${field.path}`
			: field.path
		: basePath;

	if (field.kind === "object") {
		for (const nestedField of field.fields ?? []) {
			collectPhotonFieldLocalization(
				nestedField,
				schema,
				currentPath,
				effectiveLocalization,
			);
		}

		return;
	}

	if (field.kind === "repeater") {
		const repeaterBasePath = currentPath ? `${currentPath}.*` : "*";

		if (field.itemField) {
			collectPhotonFieldLocalization(
				field.itemField,
				schema,
				repeaterBasePath,
				effectiveLocalization,
			);
		}

		for (const nestedField of field.fields ?? []) {
			collectPhotonFieldLocalization(
				nestedField,
				schema,
				repeaterBasePath,
				effectiveLocalization,
			);
		}

		return;
	}

	if (field.kind === "form-fields") {
		if (!currentPath) {
			throw new Error("Photon form fields require a concrete path.");
		}

		for (const localizedPath of [
			"helpText",
			"label",
			"options.*.label",
			"placeholder",
		]) {
			registerPhotonFieldLocalization(
				schema,
				"localized",
				`${currentPath}.*.${localizedPath}`,
			);
		}

		for (const sharedPath of [
			"disabled",
			"id",
			"locked",
			"name",
			"options.*.value",
			"removable",
			"required",
			"type",
			"width",
		]) {
			registerPhotonFieldLocalization(
				schema,
				"shared",
				`${currentPath}.*.${sharedPath}`,
			);
		}

		return;
	}

	if (!currentPath) {
		throw new Error(
			"Photon field localization requires a concrete path.",
		);
	}

	if (!effectiveLocalization) {
		throw new Error(
			`Photon field "${currentPath}" is missing explicit localization metadata.`,
		);
	}

	registerPhotonFieldLocalization(
		schema,
		effectiveLocalization,
		currentPath,
	);
};

export const createPhotonBlockLocalizationSchema = (
	fields: PhotonNestedField[],
): PhotonBlockLocalizationSchema => {
	const schema: PhotonBlockLocalizationSchema = {
		localized: [],
		shared: [],
	};

	for (const field of fields) {
		collectPhotonFieldLocalization(field, schema, "");
	}

	schema.localized.sort();
	schema.shared.sort();

	return schema;
};

export const createPhotonLocalizationManifest = (
	modules: PhotonModule[],
) =>
	Object.fromEntries(
		modules.flatMap((moduleEntry) =>
			moduleEntry.blocks.map((definition) => [
				getPhotonDefinitionKey(moduleEntry.module, definition.type),
				definition.localizationSchema ??
					createPhotonBlockLocalizationSchema(definition.fields),
			]),
		),
	);

const isPhotonLocalizedDefault = (
	value: unknown,
): value is PhotonLocalizedDefaultValue =>
	typeof value === "object" &&
	value !== null &&
	"__wbLocalizedDefault" in value &&
	(value as { __wbLocalizedDefault?: unknown }).__wbLocalizedDefault === true &&
	"values" in value;

const resolvePhotonLocalizedDefaultValue = (
	value: unknown,
	locale: string,
	defaultLocale: string,
): unknown => {
	if (Array.isArray(value)) {
		return value.map((item) =>
			resolvePhotonLocalizedDefaultValue(item, locale, defaultLocale),
		);
	}

	if (isPhotonLocalizedDefault(value)) {
		return clonePhotonValue(
			value.values[locale] ??
				value.values[defaultLocale] ??
				Object.values(value.values)[0] ??
				null,
		);
	}

	if (typeof value === "object" && value !== null) {
		return Object.fromEntries(
			Object.entries(value).map(([key, item]) => [
				key,
				resolvePhotonLocalizedDefaultValue(item, locale, defaultLocale),
			]),
		);
	}

	return value;
};

export const createPhotonBlock = <
	Props extends Record<string, unknown> = Record<string, unknown>,
>(
	moduleName: string,
	definition: PhotonBlockDefinition<Props>,
	options?: {
		locale?: string;
		defaultLocale?: string;
	},
): PhotonBlock<Props> => {
	const locale = options?.locale?.trim().toLowerCase() || "en";
	const defaultLocale = options?.defaultLocale?.trim().toLowerCase() || "en";

	return {
		id: createPhotonNodeId(),
		module: moduleName,
		type: definition.type,
		props: resolvePhotonLocalizedDefaultValue(
			clonePhotonValue(definition.defaults),
			locale,
			defaultLocale,
		) as Props,
		bindings: clonePhotonValue(definition.bindings),
		areas: clonePhotonValue(definition.areas),
	};
};

export const definePhotonBlockDefinition = <
	Props extends PhotonBlockProps,
>(
	definition: PhotonBlockDefinition<Props>,
): PhotonBlockDefinition<Props> => ({
	...definition,
	localizationSchema:
		definition.localizationSchema ??
		createPhotonBlockLocalizationSchema(definition.fields),
});

export const movePhotonArrayItem = <T>(
	items: T[],
	fromIndex: number,
	toIndex: number,
) => {
	const next = [...items];
	const [moved] = next.splice(fromIndex, 1);

	next.splice(toIndex, 0, moved);

	return next;
};

export const getPhotonDocumentFingerprint = (
	document: PhotonDocument,
) =>
	JSON.stringify({
		id: document.id,
		name: document.name,
		route: document.route,
		blocks: document.blocks,
	});
