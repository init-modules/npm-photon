import {
  EditableText
} from "./chunk-AUXN32PD.js";
import "./chunk-6LYMEWZL.js";
import "./chunk-CZ47CC3D.js";
import "./chunk-O6DIDPAQ.js";
import "./chunk-V7CN23YR.js";
import "./chunk-ZJB32M2N.js";

// src/forms/helpers.ts
var fieldTypeOptions = [
  { label: "Text", value: "text" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "Number", value: "number" },
  { label: "Textarea", value: "textarea" },
  { label: "Select", value: "select" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Date", value: "date" },
  { label: "Hidden", value: "hidden" }
];
var widthOptions = [
  { label: "Full", value: "full" },
  { label: "Half", value: "half" },
  { label: "Third", value: "third" }
];
var normalizeFieldKey = (field) => field.id.trim() || field.name.trim();
var isAllowedByPolicy = (field, policy = {}) => {
  if (policy.allowedFieldTypes?.length && !policy.allowedFieldTypes.includes(field.type)) {
    return false;
  }
  if (policy.deniedFieldTypes?.includes(field.type)) {
    return false;
  }
  return true;
};
var mergeEditableFieldParts = (base, incoming, policy) => {
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
    name: allowEditFieldNames ? incoming.name || base.name : base.name
  };
};
var definePhotonForm = (definition) => definition;
var createPhotonFormFieldsField = (path = "fields", options = {}) => {
  const typeOptions = options.allowedFieldTypes?.length ? fieldTypeOptions.filter(
    (item) => options.allowedFieldTypes?.includes(item.value)
  ) : fieldTypeOptions;
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
      removable: true
    },
    fields: [
      { path: "id", label: "Field id", kind: "text", localization: "shared" },
      {
        path: "name",
        label: "Input name",
        kind: "text",
        localization: "shared"
      },
      {
        path: "type",
        label: "Type",
        kind: "select",
        localization: "shared",
        options: typeOptions
      },
      {
        path: "label",
        label: "Label",
        kind: "text",
        localization: "localized"
      },
      {
        path: "placeholder",
        label: "Placeholder",
        kind: "text",
        localization: "localized"
      },
      {
        path: "helpText",
        label: "Help text",
        kind: "textarea",
        localization: "localized"
      },
      {
        path: "required",
        label: "Required",
        kind: "toggle",
        localization: "shared"
      },
      {
        path: "width",
        label: "Width",
        kind: "select",
        localization: "shared",
        options: widthOptions
      },
      {
        path: "locked",
        label: "Locked",
        kind: "toggle",
        localization: "shared"
      },
      {
        path: "removable",
        label: "Removable",
        kind: "toggle",
        localization: "shared"
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
            localization: "localized"
          },
          {
            path: "value",
            label: "Value",
            kind: "text",
            localization: "shared"
          }
        ]
      }
    ]
  };
};
var resolvePhotonFormFields = (fields, definition) => {
  const mode = definition.mode ?? "extendable";
  const policy = definition.policy ?? {};
  const incoming = Array.isArray(fields) ? fields : [];
  const defaultByKey = new Map(
    definition.defaultFields.map((field) => [normalizeFieldKey(field), field])
  );
  const incomingByKey = new Map(
    incoming.map((field, index) => [
      normalizeFieldKey(field),
      { field, index }
    ])
  );
  const requiredFieldIds = /* @__PURE__ */ new Set([
    ...policy.requiredFieldIds ?? [],
    ...mode === "fixed" || policy.allowRemoveFields === false ? definition.defaultFields.map((field) => normalizeFieldKey(field)) : []
  ]);
  const lockedFieldIds = new Set(policy.lockedFieldIds ?? []);
  const allowAddFields = mode === "freeform" ? true : policy.allowAddFields !== false;
  const allowReorder = mode === "freeform" ? true : policy.allowReorder !== false;
  const sourceItems = mode === "fixed" ? definition.defaultFields.map(
    (field) => mergeEditableFieldParts(
      field,
      incomingByKey.get(normalizeFieldKey(field))?.field,
      policy
    )
  ) : [
    ...incoming,
    ...definition.defaultFields.filter(
      (field) => !incomingByKey.has(normalizeFieldKey(field)) && requiredFieldIds.has(normalizeFieldKey(field))
    )
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
  const ordered = allowReorder ? filtered : [
    ...definition.defaultFields.map(
      (field) => filtered.find(
        (item) => normalizeFieldKey(item) === normalizeFieldKey(field)
      )
    ).filter(
      (field) => Boolean(field)
    ),
    ...filtered.filter(
      (field) => !defaultByKey.has(normalizeFieldKey(field))
    )
  ];
  return ordered.map((field) => {
    const key = normalizeFieldKey(field);
    const sourceIndex = incomingByKey.get(key)?.index ?? null;
    return {
      ...field,
      locked: field.locked || lockedFieldIds.has(key) || requiredFieldIds.has(key),
      removable: field.removable ?? (policy.removableFieldIds ? policy.removableFieldIds.includes(key) : !requiredFieldIds.has(key)),
      sourceIndex
    };
  });
};
var readPhotonFormValues = (form, fields) => {
  const formData = new FormData(form);
  const values = {};
  for (const field of fields) {
    if (!field.name || field.disabled) {
      continue;
    }
    if (field.type === "checkbox") {
      values[field.name] = formData.has(field.name);
      continue;
    }
    const value = formData.get(field.name);
    values[field.name] = value instanceof File ? value : value?.toString() ?? "";
  }
  return values;
};

// src/forms/photon-form.tsx
import clsx from "clsx";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var getFieldInputType = (field) => {
  if (field.type === "phone") {
    return "tel";
  }
  return field.type;
};
var getFieldWidthClassName = (field) => {
  if (field.type === "hidden") {
    return "hidden";
  }
  if (field.width === "half") {
    return "sm:col-span-6";
  }
  if (field.width === "third") {
    return "sm:col-span-4";
  }
  return "sm:col-span-12";
};
var renderFieldLabel = (field, blockId, fieldsPath, className) => {
  const labelPath = blockId && fieldsPath && field.sourceIndex !== null ? `${fieldsPath}.${field.sourceIndex}.label` : null;
  if (!labelPath || !blockId) {
    return /* @__PURE__ */ jsx("span", { className, children: field.label });
  }
  return /* @__PURE__ */ jsx(
    EditableText,
    {
      blockId,
      path: labelPath,
      placeholder: field.label,
      className
    }
  );
};
var renderFieldHelpText = (field, blockId, fieldsPath, className) => {
  if (!field.helpText) {
    return null;
  }
  const helpPath = blockId && fieldsPath && field.sourceIndex !== null ? `${fieldsPath}.${field.sourceIndex}.helpText` : null;
  if (!helpPath || !blockId) {
    return /* @__PURE__ */ jsx("span", { className, children: field.helpText });
  }
  return /* @__PURE__ */ jsx(
    EditableText,
    {
      blockId,
      path: helpPath,
      placeholder: field.helpText,
      className
    }
  );
};
var PhotonForm = ({
  blockId,
  fieldsPath = "fields",
  definition,
  fields,
  disabled = false,
  classNames,
  submitOnEnter = true,
  onSubmitValues,
  renderField,
  children,
  className,
  ...props
}) => {
  const resolvedFields = resolvePhotonFormFields(fields, definition);
  const handleSubmit = async (event) => {
    if (!submitOnEnter) {
      event.preventDefault();
    }
    if (!onSubmitValues) {
      return;
    }
    event.preventDefault();
    await onSubmitValues(
      readPhotonFormValues(event.currentTarget, resolvedFields),
      event
    );
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: clsx("grid gap-4 sm:grid-cols-12", className),
      onSubmit: handleSubmit,
      ...props,
      children: [
        resolvedFields.map((field) => {
          const label = renderFieldLabel(
            field,
            blockId,
            fieldsPath,
            classNames?.label
          );
          const helpText = renderFieldHelpText(
            field,
            blockId,
            fieldsPath,
            classNames?.helpText
          );
          const commonInputProps = {
            id: field.id,
            name: field.name,
            required: field.required,
            disabled: disabled || field.disabled,
            defaultValue: typeof field.defaultValue === "string" || typeof field.defaultValue === "number" ? field.defaultValue : void 0,
            placeholder: field.placeholder,
            className: classNames?.input
          };
          const input = field.type === "textarea" ? /* @__PURE__ */ jsx("textarea", { rows: 4, ...commonInputProps }) : field.type === "select" ? /* @__PURE__ */ jsx("select", { ...commonInputProps, children: (field.options ?? []).map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.id ?? option.value)) }) : field.type === "checkbox" ? /* @__PURE__ */ jsx(
            "input",
            {
              id: field.id,
              name: field.name,
              type: "checkbox",
              required: field.required,
              disabled: disabled || field.disabled,
              defaultChecked: Boolean(field.defaultValue),
              className: classNames?.checkboxInput
            }
          ) : /* @__PURE__ */ jsx(
            "input",
            {
              ...commonInputProps,
              type: getFieldInputType(field),
              min: field.validation?.min,
              max: field.validation?.max,
              minLength: field.validation?.minLength,
              maxLength: field.validation?.maxLength,
              pattern: field.validation?.pattern
            }
          );
          const content = renderField?.({
            field,
            input,
            label,
            helpText
          }) ?? /* @__PURE__ */ jsxs(
            "label",
            {
              className: clsx(
                field.type === "checkbox" ? classNames?.checkboxField ?? classNames?.field : classNames?.field
              ),
              htmlFor: field.id,
              children: [
                field.type === "checkbox" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  input,
                  label
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  label,
                  input
                ] }),
                helpText
              ]
            }
          );
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                getFieldWidthClassName(field),
                field.type === "hidden" && classNames?.hiddenField
              ),
              children: content
            },
            field.id
          );
        }),
        children
      ]
    }
  );
};
export {
  PhotonForm,
  createPhotonFormFieldsField,
  definePhotonForm,
  readPhotonFormValues,
  resolvePhotonFormFields
};
