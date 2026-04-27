import { am as PhotonFormFieldDefinition, an as PhotonFormFieldType, ao as PhotonField, ap as PhotonFormDefinition, aq as PhotonFormSchemaDescriptor, ar as PhotonFormValues, as as PhotonResolvedFormField, at as PhotonFormSubmitHandler, au as PhotonFormFieldRenderContext } from './types-1-bZpAzJ.js';
export { av as PhotonFormFieldOption, aw as PhotonFormFieldValidation, ax as PhotonFormFieldWidth, ay as PhotonFormMode, az as PhotonFormPolicy } from './types-1-bZpAzJ.js';
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
