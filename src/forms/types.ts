import type { FormEvent, ReactNode } from "react";

export type PhotonFormMode = "fixed" | "extendable" | "freeform";

export type PhotonFormFieldType =
	| "text"
	| "email"
	| "phone"
	| "number"
	| "textarea"
	| "select"
	| "checkbox"
	| "date"
	| "hidden";

export type PhotonFormFieldWidth = "full" | "half" | "third";

export type PhotonFormFieldOption = {
	id?: string;
	label: string;
	value: string;
};

export type PhotonFormFieldValidation = {
	min?: number;
	max?: number;
	minLength?: number;
	maxLength?: number;
	pattern?: string;
};

export type PhotonFormFieldDefinition = {
	id: string;
	name: string;
	type: PhotonFormFieldType;
	label: string;
	placeholder?: string;
	helpText?: string;
	required?: boolean;
	defaultValue?: unknown;
	options?: PhotonFormFieldOption[];
	width?: PhotonFormFieldWidth;
	locked?: boolean;
	removable?: boolean;
	disabled?: boolean;
	validation?: PhotonFormFieldValidation;
};

export type PhotonFormPolicy = {
	allowedFieldTypes?: PhotonFormFieldType[];
	deniedFieldTypes?: PhotonFormFieldType[];
	requiredFieldIds?: string[];
	lockedFieldIds?: string[];
	removableFieldIds?: string[];
	allowAddFields?: boolean;
	allowRemoveFields?: boolean;
	allowReorder?: boolean;
	allowEditFieldNames?: boolean;
};

export type PhotonFormDefinition = {
	id: string;
	mode?: PhotonFormMode;
	defaultFields: PhotonFormFieldDefinition[];
	policy?: PhotonFormPolicy;
};

export type PhotonResolvedFormField =
	PhotonFormFieldDefinition & {
		sourceIndex: number | null;
	};

export type PhotonFormValues = Record<string, unknown>;

export type PhotonFormSubmitHandler = (
	values: PhotonFormValues,
	event: FormEvent<HTMLFormElement>,
) => void | Promise<void>;

export type PhotonFormFieldRenderContext = {
	field: PhotonResolvedFormField;
	input: ReactNode;
	label: ReactNode;
	helpText: ReactNode;
	error?: ReactNode;
};

// Package-contributed declarative form schema (auth, contact, newsletter, etc.)
export type PhotonFormSchemaDescriptor = {
	id: string;
	packageName: string;
	label: string;
	description?: string;
	fields: PhotonFormFieldDefinition[];
	policy?: PhotonFormPolicy;
	submit?: {
		intent?: string;
		endpoint?: string;
		successMessage?: string;
		errorMessage?: string;
	};
};
