import type { FormEvent, ReactNode } from "react";

export type WebsiteBuilderFormMode = "fixed" | "extendable" | "freeform";

export type WebsiteBuilderFormFieldType =
	| "text"
	| "email"
	| "phone"
	| "number"
	| "textarea"
	| "select"
	| "checkbox"
	| "date"
	| "hidden";

export type WebsiteBuilderFormFieldWidth = "full" | "half" | "third";

export type WebsiteBuilderFormFieldOption = {
	id?: string;
	label: string;
	value: string;
};

export type WebsiteBuilderFormFieldValidation = {
	min?: number;
	max?: number;
	minLength?: number;
	maxLength?: number;
	pattern?: string;
};

export type WebsiteBuilderFormFieldDefinition = {
	id: string;
	name: string;
	type: WebsiteBuilderFormFieldType;
	label: string;
	placeholder?: string;
	helpText?: string;
	required?: boolean;
	defaultValue?: unknown;
	options?: WebsiteBuilderFormFieldOption[];
	width?: WebsiteBuilderFormFieldWidth;
	locked?: boolean;
	removable?: boolean;
	disabled?: boolean;
	validation?: WebsiteBuilderFormFieldValidation;
};

export type WebsiteBuilderFormPolicy = {
	allowedFieldTypes?: WebsiteBuilderFormFieldType[];
	deniedFieldTypes?: WebsiteBuilderFormFieldType[];
	requiredFieldIds?: string[];
	lockedFieldIds?: string[];
	removableFieldIds?: string[];
	allowAddFields?: boolean;
	allowRemoveFields?: boolean;
	allowReorder?: boolean;
	allowEditFieldNames?: boolean;
};

export type WebsiteBuilderFormDefinition = {
	id: string;
	mode?: WebsiteBuilderFormMode;
	defaultFields: WebsiteBuilderFormFieldDefinition[];
	policy?: WebsiteBuilderFormPolicy;
};

export type WebsiteBuilderResolvedFormField = WebsiteBuilderFormFieldDefinition & {
	sourceIndex: number | null;
};

export type WebsiteBuilderFormValues = Record<string, unknown>;

export type WebsiteBuilderFormSubmitHandler = (
	values: WebsiteBuilderFormValues,
	event: FormEvent<HTMLFormElement>,
) => void | Promise<void>;

export type WebsiteBuilderFormFieldRenderContext = {
	field: WebsiteBuilderResolvedFormField;
	input: ReactNode;
	label: ReactNode;
	helpText: ReactNode;
	error?: ReactNode;
};
