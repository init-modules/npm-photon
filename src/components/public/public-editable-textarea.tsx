"use client";

import clsx from "clsx";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import {
	useWebsiteBuilderCanEdit,
	useWebsiteBuilderFieldValue,
} from "../../context/website-builder-context";
import { getWebsiteBuilderEditableEditorLoader } from "../../helpers/editable-editor-loaders";
import { WEBSITE_BUILDER_EMPTY_TEXT } from "../../helpers/path";
import { buildWebsiteBuilderSearchTargetId } from "../../search/helpers";

type PublicEditableTextareaProps = {
	blockId: string;
	path: string;
	className?: string;
	placeholder?: string;
};

type EditableTextareaEditorComponent =
	ComponentType<PublicEditableTextareaProps>;

export const EditableTextarea = ({
	blockId,
	path,
	className,
	placeholder = WEBSITE_BUILDER_EMPTY_TEXT,
}: PublicEditableTextareaProps) => {
	const canEdit = useWebsiteBuilderCanEdit();
	const value = String(useWebsiteBuilderFieldValue(blockId, path) ?? "");
	const [EditableTextareaEditor, setEditableTextareaEditor] =
		useState<EditableTextareaEditorComponent | null>(null);

	useEffect(() => {
		if (!canEdit || EditableTextareaEditor) {
			return;
		}

		let cancelled = false;

		const loadEditor = getWebsiteBuilderEditableEditorLoader("textarea");

		if (!loadEditor) {
			return;
		}

		void loadEditor().then((component) => {
			if (!cancelled) {
				setEditableTextareaEditor(
					() => component as EditableTextareaEditorComponent,
				);
			}
		});

		return () => {
			cancelled = true;
		};
	}, [canEdit, EditableTextareaEditor]);

	if (canEdit && EditableTextareaEditor) {
		return (
			<EditableTextareaEditor
				blockId={blockId}
				path={path}
				className={className}
				placeholder={placeholder}
			/>
		);
	}

	return (
		<div
			data-wb-search-target={buildWebsiteBuilderSearchTargetId(blockId, path)}
			className={clsx(className, !value && "opacity-60")}
		>
			{value || placeholder}
		</div>
	);
};
