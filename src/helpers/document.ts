import type {
	WebsiteBuilderAnyBlockDefinition,
	WebsiteBuilderBindingAdapter,
	WebsiteBuilderBlock,
	WebsiteBuilderBlockDefinition,
	WebsiteBuilderBlockLocalizationSchema,
	WebsiteBuilderBlockProps,
	WebsiteBuilderDocument,
	WebsiteBuilderLocalizedDefaultValue,
	WebsiteBuilderModule,
	WebsiteBuilderNestedField,
	WebsiteBuilderPageSettingsPanelDefinition,
	WebsiteBuilderRegistry,
	WebsiteBuilderRegistryEntry,
	WebsiteBuilderSiteSettingsPanelDefinition,
} from "../types";
import { resolveWebsiteBuilderModules } from "./installable";
import { cloneWebsiteBuilderValue } from "./path";
import { createWebsiteBuilderNodeId } from "./tree";

export const getWebsiteBuilderDefinitionKey = (
	moduleName: string,
	blockType: string,
) => `${moduleName}::${blockType}`;

export const createWebsiteBuilderRegistry = (
	entries: WebsiteBuilderRegistryEntry[],
): WebsiteBuilderRegistry => {
	const modules = resolveWebsiteBuilderModules(entries);
	const definitions = new Map<string, WebsiteBuilderAnyBlockDefinition>();
	const bindingAdapters = new Map<string, WebsiteBuilderBindingAdapter>();
	const pageSettingsPanels: WebsiteBuilderPageSettingsPanelDefinition[] = [];
	const siteSettingsPanels: WebsiteBuilderSiteSettingsPanelDefinition[] = [];

	modules.forEach((moduleEntry) => {
		moduleEntry.blocks.forEach((definition) => {
			definitions.set(
				getWebsiteBuilderDefinitionKey(moduleEntry.module, definition.type),
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
				getWebsiteBuilderDefinitionKey(moduleName, blockType),
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
					key: getWebsiteBuilderDefinitionKey(
						moduleEntry.module,
						definition.type,
					),
				})),
			);
		},
	};
};

export const createWebsiteBuilderLocalizedDefault = <T>(
	values: Record<string, T>,
): WebsiteBuilderLocalizedDefaultValue<T> => ({
	__wbLocalizedDefault: true,
	values,
});

const registerWebsiteBuilderFieldLocalization = (
	schema: WebsiteBuilderBlockLocalizationSchema,
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

const collectWebsiteBuilderFieldLocalization = (
	field: WebsiteBuilderNestedField,
	schema: WebsiteBuilderBlockLocalizationSchema,
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
			collectWebsiteBuilderFieldLocalization(
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
			collectWebsiteBuilderFieldLocalization(
				field.itemField,
				schema,
				repeaterBasePath,
				effectiveLocalization,
			);
		}

		for (const nestedField of field.fields ?? []) {
			collectWebsiteBuilderFieldLocalization(
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
			throw new Error("Website Builder form fields require a concrete path.");
		}

		for (const localizedPath of [
			"helpText",
			"label",
			"options.*.label",
			"placeholder",
		]) {
			registerWebsiteBuilderFieldLocalization(
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
			registerWebsiteBuilderFieldLocalization(
				schema,
				"shared",
				`${currentPath}.*.${sharedPath}`,
			);
		}

		return;
	}

	if (!currentPath) {
		throw new Error(
			"Website Builder field localization requires a concrete path.",
		);
	}

	if (!effectiveLocalization) {
		throw new Error(
			`Website Builder field "${currentPath}" is missing explicit localization metadata.`,
		);
	}

	registerWebsiteBuilderFieldLocalization(
		schema,
		effectiveLocalization,
		currentPath,
	);
};

export const createWebsiteBuilderBlockLocalizationSchema = (
	fields: WebsiteBuilderNestedField[],
): WebsiteBuilderBlockLocalizationSchema => {
	const schema: WebsiteBuilderBlockLocalizationSchema = {
		localized: [],
		shared: [],
	};

	for (const field of fields) {
		collectWebsiteBuilderFieldLocalization(field, schema, "");
	}

	schema.localized.sort();
	schema.shared.sort();

	return schema;
};

export const createWebsiteBuilderLocalizationManifest = (
	modules: WebsiteBuilderModule[],
) =>
	Object.fromEntries(
		modules.flatMap((moduleEntry) =>
			moduleEntry.blocks.map((definition) => [
				getWebsiteBuilderDefinitionKey(moduleEntry.module, definition.type),
				definition.localizationSchema ??
					createWebsiteBuilderBlockLocalizationSchema(definition.fields),
			]),
		),
	);

const isWebsiteBuilderLocalizedDefault = (
	value: unknown,
): value is WebsiteBuilderLocalizedDefaultValue =>
	typeof value === "object" &&
	value !== null &&
	"__wbLocalizedDefault" in value &&
	(value as { __wbLocalizedDefault?: unknown }).__wbLocalizedDefault === true &&
	"values" in value;

const resolveWebsiteBuilderLocalizedDefaultValue = (
	value: unknown,
	locale: string,
	defaultLocale: string,
): unknown => {
	if (Array.isArray(value)) {
		return value.map((item) =>
			resolveWebsiteBuilderLocalizedDefaultValue(item, locale, defaultLocale),
		);
	}

	if (isWebsiteBuilderLocalizedDefault(value)) {
		return cloneWebsiteBuilderValue(
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
				resolveWebsiteBuilderLocalizedDefaultValue(item, locale, defaultLocale),
			]),
		);
	}

	return value;
};

export const createWebsiteBuilderBlock = <
	Props extends Record<string, unknown> = Record<string, unknown>,
>(
	moduleName: string,
	definition: WebsiteBuilderBlockDefinition<Props>,
	options?: {
		locale?: string;
		defaultLocale?: string;
	},
): WebsiteBuilderBlock<Props> => {
	const locale = options?.locale?.trim().toLowerCase() || "en";
	const defaultLocale = options?.defaultLocale?.trim().toLowerCase() || "en";

	return {
		id: createWebsiteBuilderNodeId(),
		module: moduleName,
		type: definition.type,
		props: resolveWebsiteBuilderLocalizedDefaultValue(
			cloneWebsiteBuilderValue(definition.defaults),
			locale,
			defaultLocale,
		) as Props,
		bindings: cloneWebsiteBuilderValue(definition.bindings),
		areas: cloneWebsiteBuilderValue(definition.areas),
	};
};

export const defineWebsiteBuilderBlockDefinition = <
	Props extends WebsiteBuilderBlockProps,
>(
	definition: WebsiteBuilderBlockDefinition<Props>,
): WebsiteBuilderBlockDefinition<Props> => ({
	...definition,
	localizationSchema:
		definition.localizationSchema ??
		createWebsiteBuilderBlockLocalizationSchema(definition.fields),
});

export const moveWebsiteBuilderArrayItem = <T>(
	items: T[],
	fromIndex: number,
	toIndex: number,
) => {
	const next = [...items];
	const [moved] = next.splice(fromIndex, 1);

	next.splice(toIndex, 0, moved);

	return next;
};

export const getWebsiteBuilderDocumentFingerprint = (
	document: WebsiteBuilderDocument,
) =>
	JSON.stringify({
		id: document.id,
		name: document.name,
		route: document.route,
		blocks: document.blocks,
	});
