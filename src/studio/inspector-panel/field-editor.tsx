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
	const { translate } = usePhotonI18n();
	const path = absolutePath ?? field.path ?? "";

	return (
		<div>
			<div className="mb-2 flex items-center justify-between gap-3">
				<div
					className="text-sm font-semibold"
					style={{ color: "var(--photon-builder-text)" }}
				>
					{translate(
						field.labelKey ?? field.label ?? "Field",
						field.label ?? "Field",
					)}
				</div>
				{path && !hidePathLabel ? (
					<button
						type="button"
						onClick={() => onFocus(path)}
						className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.24em] transition"
						style={{ color: "var(--photon-builder-text-ghost)" }}
					>
						{path}
					</button>
				) : null}
			</div>
			{field.description ? (
				<div
					className="mb-2 text-xs leading-5"
					style={{ color: "var(--photon-builder-text-soft)" }}
				>
					{translate(
						field.descriptionKey ?? field.description ?? "",
						field.description,
					)}
				</div>
			) : null}

			{field.kind === "textarea" ? (
				<textarea
					rows={5}
					value={String(value ?? "")}
					onFocus={() => onFocus(path)}
					onChange={(event) => onChange(event.currentTarget.value)}
					className={inputClassName}
				/>
			) : null}

			{field.kind === "rich-text" ? (
				<PhotonRichTextEditor
					value={String(value ?? "")}
					onFocus={() => onFocus(path)}
					onChange={onChange}
					className="text-sm text-[color:var(--photon-builder-text)]"
					surfaceClassName="border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)]"
				/>
			) : null}

			{field.kind === "json" ? (
				<JsonFieldEditor
					blockId={blockId}
					path={path}
					initialValue={value}
					onFocus={() => onFocus(path)}
					onApply={onChange}
				/>
			) : null}

			{field.kind === "object" ? (
				<ObjectFieldEditor
					field={field}
					blockId={blockId}
					value={value}
					onFocus={onFocus}
					onChange={onChange}
					absolutePath={path}
				/>
			) : null}

			{field.kind === "repeater" ? (
				<RepeaterFieldEditor
					field={field}
					blockId={blockId}
					value={value}
					onFocus={onFocus}
					onChange={onChange}
					absolutePath={path}
				/>
			) : null}

			{field.kind === "form-fields" ? (
				<PhotonFormFieldsEditor
					value={value}
					onChange={onChange}
					onFocus={(path) => onFocus(joinFieldPath(absolutePath ?? "", path))}
					absolutePath={path}
				/>
			) : null}

			{field.kind === "select" ? (
				<SelectFieldEditor
					field={field}
					value={value}
					onChange={onChange}
					onFocus={onFocus}
				/>
			) : null}

			{field.kind === "toggle" ? (
				<label className="inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)] px-4 py-3 text-sm text-[color:var(--photon-builder-text)]">
					<input
						type="checkbox"
						checked={Boolean(value)}
						onFocus={() => onFocus(path)}
						onChange={(event) => onChange(event.currentTarget.checked)}
					/>
					Enable value
				</label>
			) : null}

			{field.kind === "tags" ? (
				<textarea
					rows={4}
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
			) : null}

			{field.kind === "image" ? (
				<ImageFieldEditor
					blockId={blockId}
					path={path}
					documentId={documentId}
					value={value}
					onFocus={() => onFocus(path)}
					onApply={onChange}
					onUpload={uploadMedia}
				/>
			) : null}

			{field.kind === "gallery" ? (
				<GalleryFieldEditor
					blockId={blockId}
					path={path}
					documentId={documentId}
					value={value}
					onFocus={() => onFocus(path)}
					onApply={onChange}
					onUpload={uploadMedia}
				/>
			) : null}

			{["text", "url", "color"].includes(field.kind) ? (
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
						inputClassName,
						field.kind === "color" && "h-14 cursor-pointer px-2 py-2",
					)}
				/>
			) : null}

			{field.kind === "number" ? (
				<input
					type="number"
					value={Number(value ?? 0)}
					min={field.min}
					max={field.max}
					step={field.step ?? 1}
					onFocus={() => onFocus(path)}
					onChange={(event) => onChange(Number(event.currentTarget.value))}
					className={inputClassName}
				/>
			) : null}
		</div>
	);
};
