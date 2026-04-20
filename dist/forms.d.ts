import { J as WebsiteBuilderField } from './types-q9w-WbBC.js';
import { FormEvent, ReactNode, ComponentProps } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type WebsiteBuilderFormMode = "fixed" | "extendable" | "freeform";
type WebsiteBuilderFormFieldType = "text" | "email" | "phone" | "number" | "textarea" | "select" | "checkbox" | "date" | "hidden";
type WebsiteBuilderFormFieldWidth = "full" | "half" | "third";
type WebsiteBuilderFormFieldOption = {
    id?: string;
    label: string;
    value: string;
};
type WebsiteBuilderFormFieldValidation = {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
};
type WebsiteBuilderFormFieldDefinition = {
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
type WebsiteBuilderFormPolicy = {
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
type WebsiteBuilderFormDefinition = {
    id: string;
    mode?: WebsiteBuilderFormMode;
    defaultFields: WebsiteBuilderFormFieldDefinition[];
    policy?: WebsiteBuilderFormPolicy;
};
type WebsiteBuilderResolvedFormField = WebsiteBuilderFormFieldDefinition & {
    sourceIndex: number | null;
};
type WebsiteBuilderFormValues = Record<string, unknown>;
type WebsiteBuilderFormSubmitHandler = (values: WebsiteBuilderFormValues, event: FormEvent<HTMLFormElement>) => void | Promise<void>;
type WebsiteBuilderFormFieldRenderContext = {
    field: WebsiteBuilderResolvedFormField;
    input: ReactNode;
    label: ReactNode;
    helpText: ReactNode;
    error?: ReactNode;
};

declare const defineWebsiteBuilderForm: (definition: WebsiteBuilderFormDefinition) => WebsiteBuilderFormDefinition;
declare const createWebsiteBuilderFormFieldsField: (path?: string, options?: {
    label?: string;
    description?: string;
    addLabel?: string;
    defaultItem?: WebsiteBuilderFormFieldDefinition;
    allowedFieldTypes?: WebsiteBuilderFormFieldType[];
}) => WebsiteBuilderField;
declare const resolveWebsiteBuilderFormFields: (fields: readonly WebsiteBuilderFormFieldDefinition[] | undefined, definition: WebsiteBuilderFormDefinition) => WebsiteBuilderResolvedFormField[];
declare const readWebsiteBuilderFormValues: (form: HTMLFormElement, fields: readonly WebsiteBuilderFormFieldDefinition[]) => WebsiteBuilderFormValues;

type WebsiteBuilderFormClassNames = {
    field?: string;
    label?: string;
    input?: string;
    helpText?: string;
    checkboxField?: string;
    checkboxInput?: string;
    hiddenField?: string;
};
type WebsiteBuilderFormProps = Omit<ComponentProps<"form">, "onSubmit"> & {
    blockId?: string;
    fieldsPath?: string;
    definition: WebsiteBuilderFormDefinition;
    fields?: readonly WebsiteBuilderFormFieldDefinition[];
    disabled?: boolean;
    classNames?: WebsiteBuilderFormClassNames;
    submitOnEnter?: boolean;
    onSubmitValues?: WebsiteBuilderFormSubmitHandler;
    renderField?: (context: WebsiteBuilderFormFieldRenderContext) => ReactNode;
    children?: ReactNode;
};
declare const WebsiteBuilderForm: ({ blockId, fieldsPath, definition, fields, disabled, classNames, submitOnEnter, onSubmitValues, renderField, children, className, ...props }: WebsiteBuilderFormProps) => react_jsx_runtime.JSX.Element;

export { WebsiteBuilderForm, type WebsiteBuilderFormDefinition, type WebsiteBuilderFormFieldDefinition, type WebsiteBuilderFormFieldOption, type WebsiteBuilderFormFieldRenderContext, type WebsiteBuilderFormFieldType, type WebsiteBuilderFormFieldValidation, type WebsiteBuilderFormFieldWidth, type WebsiteBuilderFormMode, type WebsiteBuilderFormPolicy, type WebsiteBuilderFormSubmitHandler, type WebsiteBuilderFormValues, type WebsiteBuilderResolvedFormField, createWebsiteBuilderFormFieldsField, defineWebsiteBuilderForm, readWebsiteBuilderFormValues, resolveWebsiteBuilderFormFields };
