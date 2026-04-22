"use client";

import clsx from "clsx";
import type { ComponentType, ElementType, HTMLAttributes } from "react";
import { useEffect, useState } from "react";
import {
	usePhotonCanEdit,
	usePhotonFieldValue,
} from "../../context/photon-context";
import { getPhotonEditableEditorLoader } from "../../helpers/editable-editor-loaders";
import { PHOTON_EMPTY_TEXT } from "../../helpers/path";
import { buildPhotonSearchTargetId } from "../../search/helpers";

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
	placeholder = PHOTON_EMPTY_TEXT,
	...rest
}: PublicEditableTextProps) => {
	const canEdit = usePhotonCanEdit();
	const value = String(usePhotonFieldValue(blockId, path) ?? "");
	const [EditableTextEditor, setEditableTextEditor] =
		useState<EditableTextEditorComponent | null>(null);

	useEffect(() => {
		if (!canEdit || EditableTextEditor) {
			return;
		}

		let cancelled = false;

		const loadEditor = getPhotonEditableEditorLoader("text");

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
			data-photon-search-target={buildPhotonSearchTargetId(blockId, path)}
			className={clsx(className, !value && "opacity-60")}
		>
			{value || placeholder}
		</Tag>
	);
};
