"use client";

import clsx from "clsx";
import {
	ArrowDown,
	ArrowUp,
	ChevronDown,
	ChevronRight,
	Plus,
	Trash2,
} from "lucide-react";
import { memo, type ReactNode, useEffect, useState } from "react";
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
			className="inline-flex h-6 w-full min-w-0 cursor-pointer items-center justify-between gap-1 rounded-sm px-1.5 text-left text-[11px] font-medium leading-tight shadow-none outline-none ring-1 ring-transparent transition-[box-shadow] bg-[color:var(--photon-builder-field)] text-[color:var(--photon-builder-text)] focus-visible:ring-[color:var(--photon-builder-border-strong)]"
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
		<div className="space-y-0.5 rounded-sm bg-[color:var(--photon-builder-field)] p-1">
			{(field.fields ?? []).map((childField, index) => {
				const childPath = childField.path ?? "";
				const childAbsolutePath = joinFieldPath(absolutePath ?? "", childPath);
				const childValue = childPath
					? getValueAtPath(objectValue, childPath)
					: objectValue;

				return (
					<div
						key={childAbsolutePath || `${field.label ?? field.path}-${index}`}
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

type RepeaterItemProps = {
	item: unknown;
	itemAbsolutePath: string;
	itemLabel: string;
	canMoveUp: boolean;
	canMoveDown: boolean;
	onMoveUp: () => void;
	onMoveDown: () => void;
	onRemove: () => void;
	children: ReactNode;
};

const RepeaterItem = ({
	itemAbsolutePath,
	itemLabel,
	canMoveUp,
	canMoveDown,
	onMoveUp,
	onMoveDown,
	onRemove,
	children,
}: RepeaterItemProps) => {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<div
			key={itemAbsolutePath}
			className="rounded-sm bg-[color:var(--photon-builder-panel-solid)] px-1.5 py-1"
		>
			<div className="flex items-center justify-between gap-2">
				<button
					type="button"
					onClick={() => setCollapsed((prev) => !prev)}
					className="flex min-w-0 flex-1 cursor-pointer items-center gap-1 text-left"
					aria-expanded={!collapsed}
				>
					{collapsed ? (
						<ChevronRight
							className="h-3 w-3 shrink-0"
							style={{ color: "var(--photon-builder-text-soft)" }}
						/>
					) : (
						<ChevronDown
							className="h-3 w-3 shrink-0"
							style={{ color: "var(--photon-builder-text-soft)" }}
						/>
					)}
					<span
						className="truncate text-[11px] font-semibold leading-tight"
						style={{ color: "var(--photon-builder-text)" }}
					>
						{itemLabel}
					</span>
				</button>
				<div className="flex shrink-0 items-center gap-0.5">
					<button
						type="button"
						disabled={!canMoveUp}
						onClick={onMoveUp}
						className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm text-[color:var(--photon-builder-text-soft)] transition hover:bg-[color:var(--photon-builder-field)] hover:text-[color:var(--photon-builder-text)] disabled:cursor-not-allowed disabled:opacity-40"
						aria-label={`Move ${itemLabel} up`}
					>
						<ArrowUp className="h-3 w-3" />
					</button>
					<button
						type="button"
						disabled={!canMoveDown}
						onClick={onMoveDown}
						className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm text-[color:var(--photon-builder-text-soft)] transition hover:bg-[color:var(--photon-builder-field)] hover:text-[color:var(--photon-builder-text)] disabled:cursor-not-allowed disabled:opacity-40"
						aria-label={`Move ${itemLabel} down`}
					>
						<ArrowDown className="h-3 w-3" />
					</button>
					<button
						type="button"
						onClick={onRemove}
						className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm text-[color:var(--photon-builder-text-soft)] transition hover:bg-[color:var(--photon-builder-field)] hover:text-[color:var(--photon-builder-text)]"
						aria-label={`Remove ${itemLabel}`}
					>
						<Trash2 className="h-3 w-3" />
					</button>
				</div>
			</div>
			{collapsed ? null : <div className="mt-1">{children}</div>}
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
		<div className="space-y-1">
			<div className="space-y-1 rounded-sm bg-[color:var(--photon-builder-field)] p-1.5">
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
						<RepeaterItem
							key={itemAbsolutePath}
							item={item}
							itemAbsolutePath={itemAbsolutePath}
							itemLabel={itemLabel}
							canMoveUp={index > 0}
							canMoveDown={index < items.length - 1}
							onMoveUp={() =>
								updateItems(
									movePhotonArrayItem(items, index, index - 1),
								)
							}
							onMoveDown={() =>
								updateItems(
									movePhotonArrayItem(items, index, index + 1),
								)
							}
							onRemove={() =>
								updateItems(
									items.filter((_, itemIndex) => itemIndex !== index),
								)
							}
						>
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
								<div className="space-y-0.5">
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
						</RepeaterItem>
					);
				})}
			</div>

			<button
				type="button"
				onClick={addItem}
				className="inline-flex h-6 w-full cursor-pointer items-center justify-center gap-1 rounded-sm bg-[color:var(--photon-builder-field)] px-2 text-[11px] font-semibold text-[color:var(--photon-builder-text-muted)] transition hover:bg-[color:var(--photon-builder-panel-solid)] hover:text-[color:var(--photon-builder-text)]"
			>
				<Plus className="h-3 w-3" />
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
export const INLINE_FIELD_KINDS = new Set<
	PhotonField["kind"] | PhotonNestedField["kind"]
>([
	"text",
	"url",
	"color",
	"number",
	"select",
	"toggle",
]);

const FieldEditorImpl = ({
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
				className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-sm px-1 font-mono text-[10px] leading-tight"
				style={{
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
						rows={3}
						value={String(value ?? "")}
						onFocus={() => onFocus(path)}
						onChange={(event) => onChange(event.currentTarget.value)}
						className={clsx(inputClassName, "resize-y leading-snug")}
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
						surfaceClassName="bg-[color:var(--photon-builder-field)]"
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
					"flex items-center gap-1.5 px-1",
				)}
			>
				{labelNode}
				{/* 1px divider between label gutter and value column — Unreal
				    Details-panel style. Self-stretch so its height tracks the
				    row, opacity-40 keeps it subtle. */}
				<div
					aria-hidden="true"
					className="w-px self-stretch opacity-40"
					style={{ background: "var(--photon-builder-border)" }}
				/>
				<div className="flex min-w-0 flex-1 items-center gap-1">
					{renderControl()}
					{bindingPill}
					{path && !fieldBinding ? (
						<SiteDataBindingPicker
							mode="field"
							label="↗"
							compact
							onPick={(binding) =>
								setFieldBinding(blockId, path, binding)
							}
						/>
					) : null}
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

	// Flat fields (image, gallery, textarea, rich-text, tags) render without
	// section chrome. A single textarea/rich-text field does not need a
	// collapsible section with dark header; it should render flat like image/gallery
	// do — label + control on separate rows, no caret-folding.
	const isFlatField =
		field.kind === "image" ||
		field.kind === "gallery" ||
		field.kind === "textarea" ||
		field.kind === "rich-text" ||
		field.kind === "tags";

	if (isFlatField) {
		return (
			<div className="flex flex-col gap-1 px-1 py-1" data-photon-density-row>
				<div className="flex items-center gap-1.5">
					<div
						className={clsx(tokens.fieldLabelClass, "min-w-0 flex-1 truncate")}
						style={{ color: "var(--photon-builder-text)" }}
						title={labelText}
					>
						{labelText}
					</div>
					{bindingPill}
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
				{description ? <div>{description}</div> : null}
				{path && !fieldBinding ? (
					<SiteDataBindingPicker
						mode="field"
						label="Bind field"
						onPick={(binding) => setFieldBinding(blockId, path, binding)}
					/>
				) : null}
				{renderControl()}
			</div>
		);
	}

	return (
		<NonInlineFieldShell
			path={path}
			hidePathLabel={hidePathLabel}
			label={labelText}
			bindingPill={bindingPill}
			description={description}
			onPathClick={() => onFocus(path)}
		>
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
		</NonInlineFieldShell>
	);
};

type NonInlineFieldShellProps = {
	path: string;
	hidePathLabel: boolean;
	label: string;
	bindingPill: ReactNode;
	description: ReactNode;
	onPathClick: () => void;
	children: ReactNode;
};

/**
 * Every non-inline field renders as a caret-folding **section** with the
 * darker header band — Unreal Details-panel style. Repeater, object,
 * image, gallery, json, rich-text, textarea, form-fields all share this
 * shell so each composite control reads as its own chamber inside the
 * parent group, never as a free-floating block.
 */
const NonInlineFieldShell = ({
	path,
	hidePathLabel,
	label,
	bindingPill,
	description,
	onPathClick,
	children,
}: NonInlineFieldShellProps) => {
	const { tokens } = usePhotonInspectorDensity();
	const [collapsed, setCollapsed] = useState(false);
	const isExpanded = !collapsed;
	return (
		<section
			data-photon-density-row
			className={clsx("overflow-hidden", tokens.sectionRadius)}
			style={{ background: "var(--photon-builder-panel-solid)" }}
			data-collapsed={!isExpanded}
		>
			<div
				className="flex w-full items-center gap-1.5 px-2 py-1"
				style={{
					// Same darker mix as PhotonInspectorSection — keeps the
					// header unmistakably distinct from the input bg (which is
					// `field` directly), so a section header above a single-row
					// input no longer visually merges.
					background:
						"color-mix(in srgb, var(--photon-builder-field), #000 32%)",
					boxShadow: isExpanded
						? "inset 0 -1px 0 0 color-mix(in srgb, var(--photon-builder-border) 60%, transparent)"
						: undefined,
				}}
			>
				<button
					type="button"
					onClick={() => setCollapsed((prev) => !prev)}
					className="flex min-w-0 flex-1 cursor-pointer items-center gap-1 text-left"
					aria-expanded={isExpanded}
				>
					{isExpanded ? (
						<ChevronDown
							className="h-3 w-3 shrink-0"
							style={{ color: "var(--photon-builder-text-soft)" }}
						/>
					) : (
						<ChevronRight
							className="h-3 w-3 shrink-0"
							style={{ color: "var(--photon-builder-text-soft)" }}
						/>
					)}
					<span
						className={clsx(
							tokens.sectionHeaderClass,
							"min-w-0 flex-1 truncate",
						)}
						style={{ color: "var(--photon-builder-text-soft)" }}
						title={label}
					>
						{label}
					</span>
					{bindingPill}
				</button>
				{path && !hidePathLabel ? (
					<button
						type="button"
						onClick={(event) => {
							event.stopPropagation();
							onPathClick();
						}}
						className="shrink-0 cursor-pointer font-mono text-[9px] uppercase tracking-[0.16em] transition"
						style={{ color: "var(--photon-builder-text-ghost)" }}
						title={path}
					>
						{path}
					</button>
				) : null}
			</div>
			{isExpanded ? (
				<div className={clsx(tokens.sectionPadding, "pt-1")}>
					{description ? <div className="mb-1">{description}</div> : null}
					{children}
				</div>
			) : null}
		</section>
	);
};

/**
 * Memoize on the props that actually drive the rendered output. The
 * inspector panel passes inline `onChange`/`onFocus` closures that
 * are recreated on every render — comparing them by reference would
 * defeat memoization, so they are intentionally excluded. The store
 * is the source of truth for committed values, so a stale closure
 * cannot leak the wrong value back.
 */
export const FieldEditor = memo(FieldEditorImpl, (prev, next) => {
	if (prev.field !== next.field) return false;
	if (prev.blockId !== next.blockId) return false;
	if (prev.absolutePath !== next.absolutePath) return false;
	if (prev.hidePathLabel !== next.hidePathLabel) return false;
	if (!Object.is(prev.value, next.value)) return false;
	return true;
});
