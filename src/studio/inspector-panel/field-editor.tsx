"use client";

import clsx from "clsx";
import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PhotonRichTextEditor } from "../../components/rich-text-editor";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { usePhotonStore } from "../../context/photon-context";
import { usePhotonInspectorDensity } from "./inspector-density-context";
import { PhotonFormFieldsEditor } from "../../forms/form-fields-editor";
import { movePhotonArrayItem } from "../../helpers/document";
import {
	clonePhotonValue,
	getValueAtPath,
	setValueAtPath,
} from "../../helpers/path";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";
import type {
	PhotonField,
	PhotonNestedField,
} from "../../types";
import { inputClassName } from "../shared";
import { GalleryFieldEditor } from "./gallery-field-editor";
import { ImageFieldEditor } from "./image-field-editor";
import { JsonFieldEditor } from "./json-field-editor";
import { SiteDataBindingPicker } from "./site-data-binding-picker";

type FieldEditorProps = {
	field: PhotonField | PhotonNestedField;
	blockId: string;
	value: unknown;
	onChange: (value: unknown) => void;
	onFocus: (path?: string) => void;
	absolutePath?: string;
	hidePathLabel?: boolean;
};

const joinFieldPath = (parentPath: string, childPath?: string) => {
	if (!childPath) {
		return parentPath;
	}

	return parentPath ? `${parentPath}.${childPath}` : childPath;
};

const normalizeObjectValue = (value: unknown) =>
	typeof value === "object" && value !== null && !Array.isArray(value)
		? (value as Record<string, unknown>)
		: {};

const normalizeArrayValue = (value: unknown) =>
	Array.isArray(value) ? value : [];

const createDefaultFieldValue = (
	field: PhotonField | PhotonNestedField,
): unknown => {
	if (field.defaultValue !== undefined) {
		return clonePhotonValue(field.defaultValue);
	}

	switch (field.kind) {
		case "textarea":
		case "rich-text":
		case "text":
		case "url":
		case "color":
			return "";
		case "number":
			return field.min ?? 0;
		case "toggle":
			return false;
		case "select":
			return field.options?.[0]?.value ?? "";
		case "tags":
		case "gallery":
		case "repeater":
			return [];
		case "image":
			return null;
		case "json":
			return {};
		case "object": {
			const nextValue: Record<string, unknown> = {};

			for (const childField of field.fields ?? []) {
				if (!childField.path) {
					continue;
				}

				nextValue[childField.path] = createDefaultFieldValue(childField);
			}

			return nextValue;
		}
		default:
			return "";
	}
};

const SelectFieldEditor = ({
	field,
	value,
	onChange,
	onFocus,
}: Pick<FieldEditorProps, "field" | "value" | "onChange" | "onFocus">) => {
	const { translate } = usePhotonI18n();
	const [hasMounted, setHasMounted] = useState(false);
	const selectedValue = String(value ?? "");
	const activeOption =
		(field.options ?? []).find((option) => option.value === selectedValue) ??
		null;
	const trigger = (
		<button
			type="button"
			onFocus={() => onFocus()}
			className="inline-flex h-auto w-full min-w-0 cursor-pointer items-center justify-between gap-3 rounded-[20px] border px-4 py-3 text-left text-sm font-semibold shadow-none transition-[border-color,background-color] border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)] text-[color:var(--photon-builder-text)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-panel-solid)] focus-visible:border-[color:var(--photon-builder-border-strong)] focus-visible:bg-[color:var(--photon-builder-panel-solid)]"
		>
			<span className="min-w-0 truncate">
				{translate(
					activeOption?.labelKey ?? activeOption?.label ?? "Select value",
					activeOption?.label ?? "Select value",
				)}
			</span>
			<ChevronDown className="h-4 w-4 shrink-0 text-[color:var(--photon-builder-text-soft)]" />
		</button>
	);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return trigger;
	}

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="min-w-[14rem]">
				<DropdownMenuRadioGroup
					value={selectedValue}
					onValueChange={(nextValue) => onChange(nextValue)}
				>
					{(field.options ?? []).map((option) => (
						<DropdownMenuRadioItem
							key={option.value}
							value={option.value}
							onFocus={() => onFocus()}
						>
							{translate(option.labelKey ?? option.label, option.label)}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const ObjectFieldEditor = ({
	field,
	blockId,
	value,
	onChange,
	onFocus,
	absolutePath,
	hidePathLabel,
}: FieldEditorProps) => {
	const objectValue = normalizeObjectValue(value);

	return (
		<div className="space-y-3 rounded-[20px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-3">
			{(field.fields ?? []).map((childField, index) => {
				const childPath = childField.path ?? "";
				const childAbsolutePath = joinFieldPath(absolutePath ?? "", childPath);
				const childValue = childPath
					? getValueAtPath(objectValue, childPath)
					: objectValue;

				return (
					<div
						key={childAbsolutePath || `${field.label ?? field.path}-${index}`}
						className="rounded-[18px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)] p-3"
					>
						<FieldEditor
							field={childField}
							blockId={blockId}
							value={childValue}
							absolutePath={childAbsolutePath}
							hidePathLabel={hidePathLabel}
							onFocus={onFocus}
							onChange={(nextValue) => {
								if (!childPath) {
									onChange(nextValue);
									return;
								}

								onChange(setValueAtPath(objectValue, childPath, nextValue));
							}}
						/>
					</div>
				);
			})}
		</div>
	);
};

const RepeaterFieldEditor = ({
	field,
	blockId,
	value,
	onChange,
	onFocus,
	absolutePath,
}: FieldEditorProps) => {
	const { translate } = usePhotonI18n();
	const items = normalizeArrayValue(value);
	const itemField = field.itemField;

	const updateItems = (nextItems: unknown[]) => {
		onChange(nextItems);
	};

	const addItem = () => {
		const defaultItem =
			field.defaultItem !== undefined
				? clonePhotonValue(field.defaultItem)
				: itemField
					? createDefaultFieldValue(itemField)
					: createDefaultFieldValue({
							kind: "object",
							fields: field.fields,
						});

		updateItems([...items, defaultItem]);
	};

	return (
		<div className="space-y-3">
			<div className="space-y-3 rounded-[20px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-3">
				{items.map((item, index) => {
					const itemAbsolutePath = joinFieldPath(
						absolutePath ?? "",
						String(index),
					);
					const itemLabelSource =
						field.itemLabelPath && item && typeof item === "object"
							? getValueAtPath(
									item as Record<string, unknown>,
									field.itemLabelPath,
								)
							: null;
					const itemLabel =
						typeof itemLabelSource === "string" && itemLabelSource.trim() !== ""
							? itemLabelSource
							: translate(
									field.itemLabelKey ?? field.itemLabel ?? "Item",
									field.itemLabel ?? "Item",
								);

					return (
						<div
							key={itemAbsolutePath}
							className="rounded-[18px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)] p-3"
						>
							<div className="mb-3 flex items-center justify-between gap-3">
								<div className="min-w-0">
									<div
										className="truncate text-sm font-semibold"
										style={{ color: "var(--photon-builder-text)" }}
									>
										{itemLabel}
									</div>
								</div>
								<div className="flex shrink-0 items-center gap-1">
									<button
										type="button"
										disabled={index === 0}
										onClick={() =>
											updateItems(
												movePhotonArrayItem(items, index, index - 1),
											)
										}
										className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-2 text-[color:var(--photon-builder-text-soft)] transition hover:border-[color:var(--photon-builder-border-strong)] hover:text-[color:var(--photon-builder-text)] disabled:cursor-not-allowed disabled:opacity-40"
										aria-label={`Move ${itemLabel} up`}
									>
										<ArrowUp className="h-4 w-4" />
									</button>
									<button
										type="button"
										disabled={index === items.length - 1}
										onClick={() =>
											updateItems(
												movePhotonArrayItem(items, index, index + 1),
											)
										}
										className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-2 text-[color:var(--photon-builder-text-soft)] transition hover:border-[color:var(--photon-builder-border-strong)] hover:text-[color:var(--photon-builder-text)] disabled:cursor-not-allowed disabled:opacity-40"
										aria-label={`Move ${itemLabel} down`}
									>
										<ArrowDown className="h-4 w-4" />
									</button>
									<button
										type="button"
										onClick={() =>
											updateItems(
												items.filter((_, itemIndex) => itemIndex !== index),
											)
										}
										className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-2 text-[color:var(--photon-builder-text-soft)] transition hover:border-[color:var(--photon-builder-border-strong)] hover:text-[color:var(--photon-builder-text)]"
										aria-label={`Remove ${itemLabel}`}
									>
										<Trash2 className="h-4 w-4" />
									</button>
								</div>
							</div>

							{itemField ? (
								<FieldEditor
									field={itemField}
									blockId={blockId}
									value={item}
									absolutePath={itemAbsolutePath}
									hidePathLabel
									onFocus={onFocus}
									onChange={(nextValue) =>
										updateItems(
											items.map((currentItem, itemIndex) =>
												itemIndex === index ? nextValue : currentItem,
											),
										)
									}
								/>
							) : (
								<div className="space-y-3">
									{(field.fields ?? []).map((childField, childIndex) => {
										const itemObject = normalizeObjectValue(item);
										const childPath = childField.path ?? "";
										const childAbsolutePath = joinFieldPath(
											itemAbsolutePath,
											childPath,
										);
										const childValue = childPath
											? getValueAtPath(itemObject, childPath)
											: itemObject;

										return (
											<div
												key={
													childAbsolutePath ||
													`${itemAbsolutePath}-${childIndex}`
												}
												className="rounded-[16px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] p-3"
											>
												<FieldEditor
													field={childField}
													blockId={blockId}
													value={childValue}
													absolutePath={childAbsolutePath}
													hidePathLabel
													onFocus={onFocus}
													onChange={(nextValue) => {
														if (!childPath) {
															updateItems(
																items.map((currentItem, itemIndex) =>
																	itemIndex === index ? nextValue : currentItem,
																),
															);
															return;
														}

														updateItems(
															items.map((currentItem, itemIndex) =>
																itemIndex === index
																	? setValueAtPath(
																			itemObject,
																			childPath,
																			nextValue,
																		)
																	: currentItem,
															),
														);
													}}
												/>
											</div>
										);
									})}
								</div>
							)}
						</div>
					);
				})}
			</div>

			<button
				type="button"
				onClick={addItem}
				className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[20px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] px-4 py-3 text-sm font-semibold text-[color:var(--photon-builder-text)] transition hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-panel-solid)]"
			>
				<Plus className="h-4 w-4" />
				{translate(
					field.addLabelKey ?? field.addLabel ?? "Add item",
					field.addLabel ?? "Add item",
				)}
			</button>
		</div>
	);
};

/**
 * Single-row inline kinds use the compact UE-style layout: label-gutter
 * on the left, control packed to the right, all on a single line.
 * Block-style kinds (textarea, rich-text, repeater, json, image,
 * gallery, object, form-fields, tags) keep the label on top with the
 * control occupying the row below — they would not fit a single line
 * cleanly.
 */
const INLINE_FIELD_KINDS = new Set<PhotonField["kind"] | PhotonNestedField["kind"]>([
	"text",
	"url",
	"color",
	"number",
	"select",
	"toggle",
]);

export const FieldEditor = ({
	field,
	blockId,
	value,
	onChange,
	onFocus,
	absolutePath,
	hidePathLabel = false,
}: FieldEditorProps) => {
	const documentId = usePhotonStore((state) => state.document.id);
	const uploadMedia = usePhotonStore((state) => state.uploadMedia);
	const setFieldBinding = usePhotonStore((state) => state.setFieldBinding);
	const fieldBinding = usePhotonStore((state) =>
		state.getFieldBinding(blockId, absolutePath ?? field.path ?? ""),
	);
	const { translate } = usePhotonI18n();
	const { tokens } = usePhotonInspectorDensity();
	const path = absolutePath ?? field.path ?? "";
	const isInline = INLINE_FIELD_KINDS.has(field.kind);
	const labelText = translate(
		field.labelKey ?? field.label ?? "Field",
		field.label ?? "Field",
	);

	const labelNode = (
		<div
			className={clsx(
				tokens.fieldLabelClass,
				isInline ? clsx(tokens.labelGutterWidth, "truncate") : null,
			)}
			style={{ color: "var(--photon-builder-text)" }}
			title={labelText}
		>
			{labelText}
		</div>
	);

	const bindingPill =
		path && fieldBinding ? (
			<button
				type="button"
				onClick={() => setFieldBinding(blockId, path, null)}
				className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-sm border px-1 font-mono text-[10px] leading-tight"
				style={{
					borderColor: "var(--photon-builder-border-strong)",
					background: "var(--photon-builder-accent-strong)",
					color: "var(--photon-builder-accent)",
				}}
				data-testid={`photon-field-binding-pill-${path}`}
				title="Unbind"
			>
				<span>
					{fieldBinding.source}:{fieldBinding.path}
					{fieldBinding.adapter ? (
						<span
							className="ml-1 opacity-70"
							data-testid={`photon-field-binding-adapter-${path}`}
						>
							·{fieldBinding.adapter}
						</span>
					) : null}
				</span>
				<span data-testid={`photon-field-binding-unbind-${path}`}>×</span>
			</button>
		) : null;

	const renderControl = () => {
		if (field.kind === "textarea") {
			return (
				<div className="flex flex-col gap-1">
					<textarea
						rows={4}
						value={String(value ?? "")}
						onFocus={() => onFocus(path)}
						onChange={(event) => onChange(event.currentTarget.value)}
						className={inputClassName}
					/>
					<SiteDataBindingPicker
						onPick={(binding) =>
							onChange(`${String(value ?? "")}${binding}`)
						}
					/>
				</div>
			);
		}

		if (field.kind === "rich-text") {
			return (
				<div className="flex flex-col gap-1">
					<PhotonRichTextEditor
						value={String(value ?? "")}
						onFocus={() => onFocus(path)}
						onChange={onChange}
						className="text-[12px] text-[color:var(--photon-builder-text)]"
						surfaceClassName="border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)]"
					/>
					<SiteDataBindingPicker
						onPick={(binding) =>
							onChange(`${String(value ?? "")}${binding}`)
						}
					/>
				</div>
			);
		}

		if (field.kind === "json") {
			return (
				<JsonFieldEditor
					blockId={blockId}
					path={path}
					initialValue={value}
					onFocus={() => onFocus(path)}
					onApply={onChange}
				/>
			);
		}

		if (field.kind === "object") {
			return (
				<ObjectFieldEditor
					field={field}
					blockId={blockId}
					value={value}
					onFocus={onFocus}
					onChange={onChange}
					absolutePath={path}
				/>
			);
		}

		if (field.kind === "repeater") {
			return (
				<RepeaterFieldEditor
					field={field}
					blockId={blockId}
					value={value}
					onFocus={onFocus}
					onChange={onChange}
					absolutePath={path}
				/>
			);
		}

		if (field.kind === "form-fields") {
			return (
				<PhotonFormFieldsEditor
					value={value}
					onChange={onChange}
					onFocus={(p) => onFocus(joinFieldPath(absolutePath ?? "", p))}
					absolutePath={path}
				/>
			);
		}

		if (field.kind === "select") {
			return (
				<SelectFieldEditor
					field={field}
					value={value}
					onChange={onChange}
					onFocus={onFocus}
				/>
			);
		}

		if (field.kind === "toggle") {
			return (
				<input
					type="checkbox"
					checked={Boolean(value)}
					onFocus={() => onFocus(path)}
					onChange={(event) => onChange(event.currentTarget.checked)}
					className="h-3.5 w-3.5 cursor-pointer accent-[color:var(--photon-builder-accent)]"
				/>
			);
		}

		if (field.kind === "tags") {
			return (
				<textarea
					rows={3}
					value={
						Array.isArray(value)
							? value
									.map((item) => String(item).trim())
									.filter(Boolean)
									.join(", ")
							: ""
					}
					onFocus={() => onFocus(path)}
					onChange={(event) =>
						onChange(
							event.currentTarget.value
								.split(/[\n,]/)
								.map((item) => item.trim())
								.filter(Boolean),
						)
					}
					placeholder="keyword one, keyword two"
					className={inputClassName}
				/>
			);
		}

		if (field.kind === "image") {
			return (
				<ImageFieldEditor
					blockId={blockId}
					path={path}
					documentId={documentId}
					value={value}
					onFocus={() => onFocus(path)}
					onApply={onChange}
					onUpload={uploadMedia}
				/>
			);
		}

		if (field.kind === "gallery") {
			return (
				<GalleryFieldEditor
					blockId={blockId}
					path={path}
					documentId={documentId}
					value={value}
					onFocus={() => onFocus(path)}
					onApply={onChange}
					onUpload={uploadMedia}
				/>
			);
		}

		if (["text", "url", "color"].includes(field.kind)) {
			return (
				<input
					type={
						field.kind === "color"
							? "color"
							: field.kind === "url"
								? "url"
								: "text"
					}
					value={String(value ?? "")}
					onFocus={() => onFocus(path)}
					onChange={(event) => onChange(event.currentTarget.value)}
					className={clsx(
						tokens.inputClass,
						field.kind === "color" && "h-6 cursor-pointer p-0",
					)}
				/>
			);
		}

		if (field.kind === "number") {
			return (
				<input
					type="number"
					value={Number(value ?? 0)}
					min={field.min}
					max={field.max}
					step={field.step ?? 1}
					onFocus={() => onFocus(path)}
					onChange={(event) => onChange(Number(event.currentTarget.value))}
					className={tokens.inputClass}
				/>
			);
		}

		return null;
	};

	const description = field.description ? (
		<div
			className="text-[10.5px] leading-snug"
			style={{ color: "var(--photon-builder-text-soft)" }}
		>
			{translate(
				field.descriptionKey ?? field.description ?? "",
				field.description,
			)}
		</div>
	) : null;

	if (isInline) {
		return (
			<div
				data-photon-density-row
				className={clsx(
					tokens.rowMinHeight,
					"flex items-center gap-2 px-1",
				)}
			>
				{labelNode}
				<div className="flex min-w-0 flex-1 items-center gap-1">
					{renderControl()}
					{bindingPill}
				</div>
				{path && !hidePathLabel ? (
					<button
						type="button"
						onClick={() => onFocus(path)}
						className="shrink-0 cursor-pointer font-mono text-[9px] uppercase tracking-[0.16em] transition"
						style={{ color: "var(--photon-builder-text-ghost)" }}
						title={path}
					>
						⌗
					</button>
				) : null}
			</div>
		);
	}

	return (
		<div data-photon-density-row className="px-1 py-1">
			<div className="mb-1 flex items-center justify-between gap-2">
				<div className="flex items-center gap-1.5">
					{labelNode}
					{bindingPill}
				</div>
				{path && !hidePathLabel ? (
					<button
						type="button"
						onClick={() => onFocus(path)}
						className="shrink-0 cursor-pointer font-mono text-[9px] uppercase tracking-[0.16em] transition"
						style={{ color: "var(--photon-builder-text-ghost)" }}
						title={path}
					>
						{path}
					</button>
				) : null}
			</div>
			{description ? <div className="mb-1">{description}</div> : null}
			{path && !fieldBinding ? (
				<div className="mb-1">
					<SiteDataBindingPicker
						mode="field"
						label="Bind field"
						onPick={(binding) => setFieldBinding(blockId, path, binding)}
					/>
				</div>
			) : null}
			{renderControl()}
		</div>
	);
};
