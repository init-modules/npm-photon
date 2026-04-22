"use client";

import clsx from "clsx";
import type { ComponentProps, FormEvent, ReactNode } from "react";
import { EditableText } from "../components/public/public-editable-text";
import {
	readPhotonFormValues,
	resolvePhotonFormFields,
} from "./helpers";
import type {
	PhotonFormDefinition,
	PhotonFormFieldDefinition,
	PhotonFormFieldRenderContext,
	PhotonFormSubmitHandler,
	PhotonResolvedFormField,
} from "./types";

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

const getFieldInputType = (field: PhotonResolvedFormField) => {
	if (field.type === "phone") {
		return "tel";
	}

	return field.type;
};

const getFieldWidthClassName = (field: PhotonResolvedFormField) => {
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

const renderFieldLabel = (
	field: PhotonResolvedFormField,
	blockId: string | undefined,
	fieldsPath: string | undefined,
	className: string | undefined,
) => {
	const labelPath =
		blockId && fieldsPath && field.sourceIndex !== null
			? `${fieldsPath}.${field.sourceIndex}.label`
			: null;

	if (!labelPath || !blockId) {
		return <span className={className}>{field.label}</span>;
	}

	return (
		<EditableText
			blockId={blockId}
			path={labelPath}
			placeholder={field.label}
			className={className}
		/>
	);
};

const renderFieldHelpText = (
	field: PhotonResolvedFormField,
	blockId: string | undefined,
	fieldsPath: string | undefined,
	className: string | undefined,
) => {
	if (!field.helpText) {
		return null;
	}

	const helpPath =
		blockId && fieldsPath && field.sourceIndex !== null
			? `${fieldsPath}.${field.sourceIndex}.helpText`
			: null;

	if (!helpPath || !blockId) {
		return <span className={className}>{field.helpText}</span>;
	}

	return (
		<EditableText
			blockId={blockId}
			path={helpPath}
			placeholder={field.helpText}
			className={className}
		/>
	);
};

export const PhotonForm = ({
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
}: PhotonFormProps) => {
	const resolvedFields = resolvePhotonFormFields(fields, definition);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		if (!submitOnEnter) {
			event.preventDefault();
		}

		if (!onSubmitValues) {
			return;
		}

		event.preventDefault();
		await onSubmitValues(
			readPhotonFormValues(event.currentTarget, resolvedFields),
			event,
		);
	};

	return (
		<form
			className={clsx("grid gap-4 sm:grid-cols-12", className)}
			onSubmit={handleSubmit}
			{...props}
		>
			{resolvedFields.map((field) => {
				const label = renderFieldLabel(
					field,
					blockId,
					fieldsPath,
					classNames?.label,
				);
				const helpText = renderFieldHelpText(
					field,
					blockId,
					fieldsPath,
					classNames?.helpText,
				);
				const commonInputProps = {
					id: field.id,
					name: field.name,
					required: field.required,
					disabled: disabled || field.disabled,
					defaultValue:
						typeof field.defaultValue === "string" ||
						typeof field.defaultValue === "number"
							? field.defaultValue
							: undefined,
					placeholder: field.placeholder,
					className: classNames?.input,
				};
				const input =
					field.type === "textarea" ? (
						<textarea rows={4} {...commonInputProps} />
					) : field.type === "select" ? (
						<select {...commonInputProps}>
							{(field.options ?? []).map((option) => (
								<option key={option.id ?? option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					) : field.type === "checkbox" ? (
						<input
							id={field.id}
							name={field.name}
							type="checkbox"
							required={field.required}
							disabled={disabled || field.disabled}
							defaultChecked={Boolean(field.defaultValue)}
							className={classNames?.checkboxInput}
						/>
					) : (
						<input
							{...commonInputProps}
							type={getFieldInputType(field)}
							min={field.validation?.min}
							max={field.validation?.max}
							minLength={field.validation?.minLength}
							maxLength={field.validation?.maxLength}
							pattern={field.validation?.pattern}
						/>
					);
				const content = renderField?.({
					field,
					input,
					label,
					helpText,
				}) ?? (
					<label
						className={clsx(
							field.type === "checkbox"
								? (classNames?.checkboxField ?? classNames?.field)
								: classNames?.field,
						)}
						htmlFor={field.id}
					>
						{field.type === "checkbox" ? (
							<>
								{input}
								{label}
							</>
						) : (
							<>
								{label}
								{input}
							</>
						)}
						{helpText}
					</label>
				);

				return (
					<div
						key={field.id}
						className={clsx(
							getFieldWidthClassName(field),
							field.type === "hidden" && classNames?.hiddenField,
						)}
					>
						{content}
					</div>
				);
			})}
			{children}
		</form>
	);
};
