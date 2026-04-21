"use client";

import clsx from "clsx";
import type { ComponentType, ElementType, HTMLAttributes } from "react";
import { useEffect, useState } from "react";
import {
	useWebsiteBuilderCanEdit,
	useWebsiteBuilderFieldValue,
} from "../../context/website-builder-context";
import { getWebsiteBuilderEditableEditorLoader } from "../../helpers/editable-editor-loaders";
import { WEBSITE_BUILDER_EMPTY_TEXT } from "../../helpers/path";
import { buildWebsiteBuilderSearchTargetId } from "../../search/helpers";

type PublicEditableTextProps = HTMLAttributes<HTMLElement> & {
	blockId: string;
	path: string;
	as?: ElementType;
	placeholder?: string;
};

type EditableTextEditorComponent = ComponentType<
	PublicEditableTextProps & { as: ElementType }
>;

export const EditableText = ({
	blockId,
	path,
	as: Tag = "span",
	className,
	placeholder = WEBSITE_BUILDER_EMPTY_TEXT,
	...rest
}: PublicEditableTextProps) => {
	const canEdit = useWebsiteBuilderCanEdit();
	const value = String(useWebsiteBuilderFieldValue(blockId, path) ?? "");
	const [EditableTextEditor, setEditableTextEditor] =
		useState<EditableTextEditorComponent | null>(null);

	useEffect(() => {
		if (!canEdit || EditableTextEditor) {
			return;
		}

		let cancelled = false;

		const loadEditor = getWebsiteBuilderEditableEditorLoader("text");

		if (!loadEditor) {
			return;
		}

		void loadEditor().then((component) => {
			if (!cancelled) {
				setEditableTextEditor(() => component as EditableTextEditorComponent);
			}
		});

		return () => {
			cancelled = true;
		};
	}, [canEdit, EditableTextEditor]);

	if (canEdit && EditableTextEditor) {
		return (
			<EditableTextEditor
				blockId={blockId}
				path={path}
				as={Tag}
				className={className}
				placeholder={placeholder}
				{...rest}
			/>
		);
	}

	return (
		<Tag
			{...rest}
			data-wb-search-target={buildWebsiteBuilderSearchTargetId(blockId, path)}
			className={clsx(className, !value && "opacity-60")}
		>
			{value || placeholder}
		</Tag>
	);
};
