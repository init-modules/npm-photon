import { K as PhotonField } from './types-D3ghbc-a.js';
import { FormEvent, ReactNode, ComponentProps } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type PhotonFormMode = "fixed" | "extendable" | "freeform";
type PhotonFormFieldType = "text" | "email" | "phone" | "number" | "textarea" | "select" | "checkbox" | "date" | "hidden";
type PhotonFormFieldWidth = "full" | "half" | "third";
type PhotonFormFieldOption = {
    id?: string;
    label: string;
    value: string;
};
type PhotonFormFieldValidation = {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
};
type PhotonFormFieldDefinition = {
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
type PhotonFormPolicy = {
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
type PhotonFormDefinition = {
    id: string;
    mode?: PhotonFormMode;
    defaultFields: PhotonFormFieldDefinition[];
    policy?: PhotonFormPolicy;
};
type PhotonResolvedFormField = PhotonFormFieldDefinition & {
    sourceIndex: number | null;
};
type PhotonFormValues = Record<string, unknown>;
type PhotonFormSubmitHandler = (values: PhotonFormValues, event: FormEvent<HTMLFormElement>) => void | Promise<void>;
type PhotonFormFieldRenderContext = {
    field: PhotonResolvedFormField;
    input: ReactNode;
    label: ReactNode;
    helpText: ReactNode;
    error?: ReactNode;
};

declare const definePhotonForm: (definition: PhotonFormDefinition) => PhotonFormDefinition;
declare const createPhotonFormFieldsField: (path?: string, options?: {
    label?: string;
    description?: string;
    addLabel?: string;
    defaultItem?: PhotonFormFieldDefinition;
    allowedFieldTypes?: PhotonFormFieldType[];
}) => PhotonField;
declare const resolvePhotonFormFields: (fields: readonly PhotonFormFieldDefinition[] | undefined, definition: PhotonFormDefinition) => PhotonResolvedFormField[];
declare const readPhotonFormValues: (form: HTMLFormElement, fields: readonly PhotonFormFieldDefinition[]) => PhotonFormValues;

type PhotonFormClassNames = {
    field?: string;
    label?: string;
    input?: string;
    helpText?: string;
    checkboxField?: string;
    checkboxInput?: string;
    hiddenField?: string;
};
type PhotonFormProps = Omit<ComponentProps<"form">, "onSubmit"> & {
    blockId?: string;
    fieldsPath?: string;
    definition: PhotonFormDefinition;
    fields?: readonly PhotonFormFieldDefinition[];
    disabled?: boolean;
    classNames?: PhotonFormClassNames;
    submitOnEnter?: boolean;
    onSubmitValues?: PhotonFormSubmitHandler;
    renderField?: (context: PhotonFormFieldRenderContext) => ReactNode;
    children?: ReactNode;
};
declare const PhotonForm: ({ blockId, fieldsPath, definition, fields, disabled, classNames, submitOnEnter, onSubmitValues, renderField, children, className, ...props }: PhotonFormProps) => react_jsx_runtime.JSX.Element;

export { PhotonForm, type PhotonFormDefinition, type PhotonFormFieldDefinition, type PhotonFormFieldOption, type PhotonFormFieldRenderContext, type PhotonFormFieldType, type PhotonFormFieldValidation, type PhotonFormFieldWidth, type PhotonFormMode, type PhotonFormPolicy, type PhotonFormSubmitHandler, type PhotonFormValues, type PhotonResolvedFormField, createPhotonFormFieldsField, definePhotonForm, readPhotonFormValues, resolvePhotonFormFields };
