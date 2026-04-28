"use client";

import clsx from "clsx";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import {
	usePhotonCanEdit,
	usePhotonFieldValue,
} from "../../context/photon-public-context";
import { getPhotonEditableEditorLoader } from "../../helpers/editable-editor-loaders";
import { PHOTON_EMPTY_TEXT } from "../../helpers/path";
import { buildPhotonSearchTargetId } from "../../search/helpers";

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
	placeholder = PHOTON_EMPTY_TEXT,
}: PublicEditableTextareaProps) => {
	const canEdit = usePhotonCanEdit();
	const value = String(usePhotonFieldValue(blockId, path) ?? "");
	const [EditableTextareaEditor, setEditableTextareaEditor] =
		useState<EditableTextareaEditorComponent | null>(null);

	useEffect(() => {
		if (!canEdit || EditableTextareaEditor) {
			return;
		}

		let cancelled = false;

		const loadEditor = getPhotonEditableEditorLoader("textarea");

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

	if (!value && !canEdit) {
		return null;
	}

	return (
		<div
			data-photon-search-target={buildPhotonSearchTargetId(blockId, path)}
			className={clsx(className, !value && "opacity-60")}
		>
			{value || placeholder}
		</div>
	);
};
