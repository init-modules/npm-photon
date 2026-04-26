import type { PhotonField } from "../types";
import type {
	PhotonFormDefinition,
	PhotonFormFieldDefinition,
	PhotonFormFieldType,
	PhotonFormPolicy,
	PhotonFormSchemaDescriptor,
	PhotonFormValues,
	PhotonResolvedFormField,
} from "./types";

const fieldTypeOptions: Array<{
	label: string;
	value: PhotonFormFieldType;
}> = [
	{ label: "Text", value: "text" },
	{ label: "Email", value: "email" },
	{ label: "Phone", value: "phone" },
	{ label: "Number", value: "number" },
	{ label: "Textarea", value: "textarea" },
	{ label: "Select", value: "select" },
	{ label: "Checkbox", value: "checkbox" },
	{ label: "Date", value: "date" },
	{ label: "Hidden", value: "hidden" },
];

const widthOptions = [
	{ label: "Full", value: "full" },
	{ label: "Half", value: "half" },
	{ label: "Third", value: "third" },
];

const normalizeFieldKey = (
	field: Pick<PhotonFormFieldDefinition, "id" | "name">,
) => field.id.trim() || field.name.trim();

const isAllowedByPolicy = (
	field: PhotonFormFieldDefinition,
	policy: PhotonFormPolicy = {},
) => {
	if (
		policy.allowedFieldTypes?.length &&
		!policy.allowedFieldTypes.includes(field.type)
	) {
		return false;
	}

	if (policy.deniedFieldTypes?.includes(field.type)) {
		return false;
	}

	return true;
};

const mergeEditableFieldParts = (
	base: PhotonFormFieldDefinition,
	incoming: PhotonFormFieldDefinition | undefined,
	policy: PhotonFormPolicy,
): PhotonFormFieldDefinition => {
	if (!incoming) {
		return base;
	}

	const allowEditFieldNames = policy.allowEditFieldNames !== false;

	return {
		...base,
		label: incoming.label ?? base.label,
		placeholder: incoming.placeholder ?? base.placeholder,
		helpText: incoming.helpText ?? base.helpText,
		defaultValue: incoming.defaultValue ?? base.defaultValue,
		required: incoming.required ?? base.required,
		width: incoming.width ?? base.width,
		options: incoming.options ?? base.options,
		name: allowEditFieldNames ? incoming.name || base.name : base.name,
	};
};

export const definePhotonForm = (
	definition: PhotonFormDefinition,
): PhotonFormDefinition => definition;

export const createPhotonFormFieldsField = (
	path = "fields",
	options: {
		label?: string;
		description?: string;
		addLabel?: string;
		defaultItem?: PhotonFormFieldDefinition;
		allowedFieldTypes?: PhotonFormFieldType[];
	} = {},
): PhotonField => {
	const typeOptions = options.allowedFieldTypes?.length
		? fieldTypeOptions.filter((item) =>
				options.allowedFieldTypes?.includes(item.value),
			)
		: fieldTypeOptions;

	return {
		path,
		label: options.label ?? "Form fields",
		kind: "form-fields",
		group: "content",
		localization: "shared",
		description: options.description,
		itemLabelPath: "label",
		addLabel: options.addLabel ?? "Add form field",
		defaultItem: options.defaultItem ?? {
			id: "field",
			name: "field",
			type: "text",
			label: "Field",
			placeholder: "",
			helpText: "",
			required: false,
			width: "full",
			locked: false,
			removable: true,
		},
		fields: [
			{ path: "id", label: "Field id", kind: "text", localization: "shared" },
			{
				path: "name",
				label: "Input name",
				kind: "text",
				localization: "shared",
			},
			{
				path: "type",
				label: "Type",
				kind: "select",
				localization: "shared",
				options: typeOptions,
			},
			{
				path: "label",
				label: "Label",
				kind: "text",
				localization: "localized",
			},
			{
				path: "placeholder",
				label: "Placeholder",
				kind: "text",
				localization: "localized",
			},
			{
				path: "helpText",
				label: "Help text",
				kind: "textarea",
				localization: "localized",
			},
			{
				path: "required",
				label: "Required",
				kind: "toggle",
				localization: "shared",
			},
			{
				path: "width",
				label: "Width",
				kind: "select",
				localization: "shared",
				options: widthOptions,
			},
			{
				path: "locked",
				label: "Locked",
				kind: "toggle",
				localization: "shared",
			},
			{
				path: "removable",
				label: "Removable",
				kind: "toggle",
				localization: "shared",
			},
			{
				path: "options",
				label: "Options",
				kind: "repeater",
				localization: "shared",
				itemLabelPath: "label",
				addLabel: "Add option",
				defaultItem: { label: "Option", value: "option" },
				fields: [
					{
						path: "label",
						label: "Label",
						kind: "text",
						localization: "localized",
					},
					{
						path: "value",
						label: "Value",
						kind: "text",
						localization: "shared",
					},
				],
			},
		],
	};
};

export const resolvePhotonFormFields = (
	fields: readonly PhotonFormFieldDefinition[] | undefined,
	definition: PhotonFormDefinition,
): PhotonResolvedFormField[] => {
	const mode = definition.mode ?? "extendable";
	const policy = definition.policy ?? {};
	const incoming = Array.isArray(fields) ? fields : [];
	const defaultByKey = new Map(
		definition.defaultFields.map((field) => [normalizeFieldKey(field), field]),
	);
	const incomingByKey = new Map(
		incoming.map((field, index) => [
			normalizeFieldKey(field),
			{ field, index },
		]),
	);
	const requiredFieldIds = new Set([
		...(policy.requiredFieldIds ?? []),
		...(mode === "fixed" || policy.allowRemoveFields === false
			? definition.defaultFields.map((field) => normalizeFieldKey(field))
			: []),
	]);
	const lockedFieldIds = new Set(policy.lockedFieldIds ?? []);
	const allowAddFields =
		mode === "freeform" ? true : policy.allowAddFields !== false;
	const allowReorder =
		mode === "freeform" ? true : policy.allowReorder !== false;
	const sourceItems =
		mode === "fixed"
			? definition.defaultFields.map((field) =>
					mergeEditableFieldParts(
						field,
						incomingByKey.get(normalizeFieldKey(field))?.field,
						policy,
					),
				)
			: [
					...incoming,
					...definition.defaultFields.filter(
						(field) =>
							!incomingByKey.has(normalizeFieldKey(field)) &&
							requiredFieldIds.has(normalizeFieldKey(field)),
					),
				];
	const filtered = sourceItems.filter((field) => {
		if (!isAllowedByPolicy(field, policy)) {
			return false;
		}

		if (allowAddFields) {
			return true;
		}

		return defaultByKey.has(normalizeFieldKey(field));
	});
	const ordered = allowReorder
		? filtered
		: [
				...definition.defaultFields
					.map((field) =>
						filtered.find(
							(item) => normalizeFieldKey(item) === normalizeFieldKey(field),
						),
					)
					.filter((field): field is PhotonFormFieldDefinition =>
						Boolean(field),
					),
				...filtered.filter(
					(field) => !defaultByKey.has(normalizeFieldKey(field)),
				),
			];

	return ordered.map((field) => {
		const key = normalizeFieldKey(field);
		const sourceIndex = incomingByKey.get(key)?.index ?? null;

		return {
			...field,
			locked:
				field.locked || lockedFieldIds.has(key) || requiredFieldIds.has(key),
			removable:
				field.removable ??
				(policy.removableFieldIds
					? policy.removableFieldIds.includes(key)
					: !requiredFieldIds.has(key)),
			sourceIndex,
		};
	});
};

export const readPhotonFormValues = (
	form: HTMLFormElement,
	fields: readonly PhotonFormFieldDefinition[],
): PhotonFormValues => {
	const formData = new FormData(form);
	const values: PhotonFormValues = {};

	for (const field of fields) {
		if (!field.name || field.disabled) {
			continue;
		}

		if (field.type === "checkbox") {
			values[field.name] = formData.has(field.name);
			continue;
		}

		const value = formData.get(field.name);
		values[field.name] =
			value instanceof File ? value : (value?.toString() ?? "");
	}

	return values;
};

export const photonFormSchemaToDefinition = (
	schema: PhotonFormSchemaDescriptor,
): PhotonFormDefinition => ({
	id: schema.id,
	mode: "extendable",
	defaultFields: schema.fields,
	policy: schema.policy,
});

export const findPhotonFormSchema = (
	schemas: readonly PhotonFormSchemaDescriptor[],
	schemaId: string,
): PhotonFormSchemaDescriptor | undefined =>
	schemas.find((schema) => schema.id === schemaId);
