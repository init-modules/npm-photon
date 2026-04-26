import { f as PhotonFormFieldDefinition, g as PhotonFormFieldType, h as PhotonField, i as PhotonFormDefinition, j as PhotonFormSchemaDescriptor, k as PhotonFormValues, l as PhotonResolvedFormField, m as PhotonFormSubmitHandler, n as PhotonFormFieldRenderContext } from './types-BQcsKmzz.js';
export { o as PhotonFormFieldOption, p as PhotonFormFieldValidation, q as PhotonFormFieldWidth, r as PhotonFormMode, s as PhotonFormPolicy } from './types-BQcsKmzz.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ComponentProps, ReactNode } from 'react';

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
declare const photonFormSchemaToDefinition: (schema: PhotonFormSchemaDescriptor) => PhotonFormDefinition;
declare const findPhotonFormSchema: (schemas: readonly PhotonFormSchemaDescriptor[], schemaId: string) => PhotonFormSchemaDescriptor | undefined;

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

export { PhotonForm, PhotonFormDefinition, PhotonFormFieldDefinition, PhotonFormFieldRenderContext, PhotonFormFieldType, PhotonFormSchemaDescriptor, PhotonFormSubmitHandler, PhotonFormValues, PhotonResolvedFormField, createPhotonFormFieldsField, definePhotonForm, findPhotonFormSchema, photonFormSchemaToDefinition, readPhotonFormValues, resolvePhotonFormFields };
