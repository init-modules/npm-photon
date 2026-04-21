"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { moveWebsiteBuilderArrayItem } from "../helpers/document";
import { cloneWebsiteBuilderValue } from "../helpers/path";
import { inputClassName } from "../studio/shared";
import type {
	WebsiteBuilderFormFieldDefinition,
	WebsiteBuilderFormFieldOption,
	WebsiteBuilderFormFieldType,
} from "./types";

type WebsiteBuilderFormFieldsEditorProps = {
	value: unknown;
	onChange: (value: WebsiteBuilderFormFieldDefinition[]) => void;
	onFocus: (path: string) => void;
	absolutePath?: string;
};

const fieldTypes: Array<{ value: WebsiteBuilderFormFieldType; label: string }> =
	[
		{ value: "text", label: "Text" },
		{ value: "email", label: "Email" },
		{ value: "phone", label: "Phone" },
		{ value: "number", label: "Number" },
		{ value: "textarea", label: "Textarea" },
		{ value: "select", label: "Select" },
		{ value: "checkbox", label: "Checkbox" },
		{ value: "date", label: "Date" },
		{ value: "hidden", label: "Hidden" },
	];

const widthOptions = [
	{ value: "full", label: "Full" },
	{ value: "half", label: "Half" },
	{ value: "third", label: "Third" },
] as const;

const normalizeFields = (
	value: unknown,
): WebsiteBuilderFormFieldDefinition[] =>
	Array.isArray(value)
		? value.filter(
				(item): item is WebsiteBuilderFormFieldDefinition =>
					typeof item === "object" && item !== null,
			)
		: [];

const createField = (): WebsiteBuilderFormFieldDefinition => ({
	id: "custom_field",
	name: "custom_field",
	type: "text",
	label: "Custom field",
	placeholder: "",
	helpText: "",
	required: false,
	width: "full",
	locked: false,
	removable: true,
});

const createOption = (): WebsiteBuilderFormFieldOption => ({
	label: "Option",
	value: "option",
});

const updateField = (
	fields: WebsiteBuilderFormFieldDefinition[],
	index: number,
	patch: Partial<WebsiteBuilderFormFieldDefinition>,
) =>
	fields.map((field, fieldIndex) =>
		fieldIndex === index ? { ...field, ...patch } : field,
	);

const updateOption = (
	field: WebsiteBuilderFormFieldDefinition,
	optionIndex: number,
	patch: Partial<WebsiteBuilderFormFieldOption>,
) => ({
	...field,
	options: (field.options ?? []).map((option, index) =>
		index === optionIndex ? { ...option, ...patch } : option,
	),
});

export const WebsiteBuilderFormFieldsEditor = ({
	value,
	onChange,
	onFocus,
}: WebsiteBuilderFormFieldsEditorProps) => {
	const fields = normalizeFields(value);
	const [expandedFieldId, setExpandedFieldId] = useState<string | null>(
		fields[0]?.id ?? null,
	);

	const emit = (nextFields: WebsiteBuilderFormFieldDefinition[]) => {
		onChange(
			cloneWebsiteBuilderValue(
				nextFields,
			) as WebsiteBuilderFormFieldDefinition[],
		);
	};

	return (
		<div className="space-y-3">
			<div className="space-y-2 rounded-[20px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] p-2">
				{fields.map((field, index) => {
					const isExpanded = expandedFieldId === field.id;
					const options = field.options ?? [];

					return (
						<div
							key={`${field.id}:${index}`}
							className="rounded-[18px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-field)] p-3"
						>
							<div className="flex items-center justify-between gap-3">
								<button
									type="button"
									onClick={() =>
										setExpandedFieldId(isExpanded ? null : field.id)
									}
									className="min-w-0 cursor-pointer text-left"
								>
									<div className="truncate text-sm font-semibold text-[color:var(--wb-builder-text)]">
										{field.label || field.id || "Field"}
									</div>
									<div className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--wb-builder-text-ghost)]">
										{field.type} / {field.name}
									</div>
								</button>
								<div className="flex shrink-0 items-center gap-1">
									<button
										type="button"
										disabled={index === 0}
										onClick={() =>
											emit(
												moveWebsiteBuilderArrayItem(fields, index, index - 1),
											)
										}
										className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[color:var(--wb-builder-border)] text-[color:var(--wb-builder-text-soft)] disabled:cursor-not-allowed disabled:opacity-40"
									>
										<ArrowUp className="h-4 w-4" />
									</button>
									<button
										type="button"
										disabled={index === fields.length - 1}
										onClick={() =>
											emit(
												moveWebsiteBuilderArrayItem(fields, index, index + 1),
											)
										}
										className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[color:var(--wb-builder-border)] text-[color:var(--wb-builder-text-soft)] disabled:cursor-not-allowed disabled:opacity-40"
									>
										<ArrowDown className="h-4 w-4" />
									</button>
									<button
										type="button"
										disabled={field.locked || field.removable === false}
										onClick={() =>
											emit(
												fields.filter((_, fieldIndex) => fieldIndex !== index),
											)
										}
										className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[color:var(--wb-builder-border)] text-[color:var(--wb-builder-text-soft)] disabled:cursor-not-allowed disabled:opacity-40"
									>
										<Trash2 className="h-4 w-4" />
									</button>
								</div>
							</div>

							{isExpanded ? (
								<div className="mt-4 grid gap-3">
									<div className="grid gap-3 sm:grid-cols-2">
										<label className="grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]">
											Label
											<input
												value={field.label ?? ""}
												onFocus={() => onFocus(`${index}.label`)}
												onChange={(event) =>
													emit(
														updateField(fields, index, {
															label: event.currentTarget.value,
														}),
													)
												}
												className={inputClassName}
											/>
										</label>
										<label className="grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]">
											Type
											<select
												value={field.type}
												onFocus={() => onFocus(`${index}.type`)}
												onChange={(event) =>
													emit(
														updateField(fields, index, {
															type: event.currentTarget
																.value as WebsiteBuilderFormFieldType,
														}),
													)
												}
												className={inputClassName}
											>
												{fieldTypes.map((item) => (
													<option key={item.value} value={item.value}>
														{item.label}
													</option>
												))}
											</select>
										</label>
									</div>

									<div className="grid gap-3 sm:grid-cols-2">
										<label className="grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]">
											Field id
											<input
												value={field.id ?? ""}
												onFocus={() => onFocus(`${index}.id`)}
												onChange={(event) =>
													emit(
														updateField(fields, index, {
															id: event.currentTarget.value,
														}),
													)
												}
												className={inputClassName}
											/>
										</label>
										<label className="grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]">
											Input name
											<input
												value={field.name ?? ""}
												onFocus={() => onFocus(`${index}.name`)}
												onChange={(event) =>
													emit(
														updateField(fields, index, {
															name: event.currentTarget.value,
														}),
													)
												}
												className={inputClassName}
											/>
										</label>
									</div>

									<label className="grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]">
										Placeholder
										<input
											value={field.placeholder ?? ""}
											onFocus={() => onFocus(`${index}.placeholder`)}
											onChange={(event) =>
												emit(
													updateField(fields, index, {
														placeholder: event.currentTarget.value,
													}),
												)
											}
											className={inputClassName}
										/>
									</label>

									<label className="grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]">
										Help text
										<textarea
											rows={3}
											value={field.helpText ?? ""}
											onFocus={() => onFocus(`${index}.helpText`)}
											onChange={(event) =>
												emit(
													updateField(fields, index, {
														helpText: event.currentTarget.value,
													}),
												)
											}
											className={inputClassName}
										/>
									</label>

									<div className="grid gap-3 sm:grid-cols-2">
										<label className="grid gap-2 text-sm font-semibold text-[color:var(--wb-builder-text)]">
											Width
											<select
												value={field.width ?? "full"}
												onFocus={() => onFocus(`${index}.width`)}
												onChange={(event) =>
													emit(
														updateField(fields, index, {
															width: event.currentTarget
																.value as WebsiteBuilderFormFieldDefinition["width"],
														}),
													)
												}
												className={inputClassName}
											>
												{widthOptions.map((item) => (
													<option key={item.value} value={item.value}>
														{item.label}
													</option>
												))}
											</select>
										</label>
										<div className="grid grid-cols-2 gap-2 pt-7">
											{[
												["required", "Required"],
												["disabled", "Disabled"],
											].map(([key, label]) => (
												<label
													key={key}
													className="flex items-center gap-2 text-xs font-semibold text-[color:var(--wb-builder-text-soft)]"
												>
													<input
														type="checkbox"
														checked={Boolean(
															field[
																key as keyof WebsiteBuilderFormFieldDefinition
															],
														)}
														onChange={(event) =>
															emit(
																updateField(fields, index, {
																	[key]: event.currentTarget.checked,
																}),
															)
														}
													/>
													{label}
												</label>
											))}
										</div>
									</div>

									{field.type === "select" ? (
										<div className="rounded-[16px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] p-3">
											<div className="mb-3 text-sm font-semibold text-[color:var(--wb-builder-text)]">
												Options
											</div>
											<div className="grid gap-2">
												{options.map((option, optionIndex) => (
													<div
														key={optionIndex}
														className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
													>
														<input
															value={option.label}
															onFocus={() =>
																onFocus(`${index}.options.${optionIndex}.label`)
															}
															onChange={(event) =>
																emit(
																	updateField(
																		fields,
																		index,
																		updateOption(field, optionIndex, {
																			label: event.currentTarget.value,
																		}),
																	),
																)
															}
															className={inputClassName}
															placeholder="Label"
														/>
														<input
															value={option.value}
															onFocus={() =>
																onFocus(`${index}.options.${optionIndex}.value`)
															}
															onChange={(event) =>
																emit(
																	updateField(
																		fields,
																		index,
																		updateOption(field, optionIndex, {
																			value: event.currentTarget.value,
																		}),
																	),
																)
															}
															className={inputClassName}
															placeholder="Value"
														/>
														<button
															type="button"
															onClick={() =>
																emit(
																	updateField(fields, index, {
																		options: options.filter(
																			(_, currentIndex) =>
																				currentIndex !== optionIndex,
																		),
																	}),
																)
															}
															className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--wb-builder-border)] text-[color:var(--wb-builder-text-soft)]"
														>
															<Trash2 className="h-4 w-4" />
														</button>
													</div>
												))}
											</div>
											<button
												type="button"
												onClick={() =>
													emit(
														updateField(fields, index, {
															options: [...options, createOption()],
														}),
													)
												}
												className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[18px] border border-[color:var(--wb-builder-border)] px-4 py-3 text-sm font-semibold text-[color:var(--wb-builder-text)]"
											>
												<Plus className="h-4 w-4" /> Add option
											</button>
										</div>
									) : null}
								</div>
							) : null}
						</div>
					);
				})}
			</div>

			<button
				type="button"
				onClick={() => {
					const nextField = createField();
					emit([...fields, nextField]);
					setExpandedFieldId(nextField.id);
				}}
				className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[20px] border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] px-4 py-3 text-sm font-semibold text-[color:var(--wb-builder-text)] transition hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-panel-solid)]"
			>
				<Plus className="h-4 w-4" /> Add field
			</button>
		</div>
	);
};
