"use client";

import clsx from "clsx";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import {
	usePhotonCanEdit,
	usePhotonFieldValue,
} from "../../context/photon-context";
import { getPhotonEditableEditorLoader } from "../../helpers/editable-editor-loaders";
import { PHOTON_EMPTY_TEXT } from "../../helpers/path";
import { buildPhotonSearchTargetId } from "../../search/helpers";
import { renderPhotonRichTextHtml } from "./sanitize-rich-text";

type PublicEditableRichTextProps = {
	blockId: string;
	path: string;
	className?: string;
	placeholder?: string;
};

const richTextContentClassName =
	"text-[var(--photon-site-text)] [&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--photon-site-border)] [&_blockquote]:pl-4 [&_blockquote]:text-[var(--photon-site-muted-text)] [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.04em] [&_h2]:text-[var(--photon-site-text)] [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-[-0.03em] [&_h3]:text-[var(--photon-site-text)] [&_li]:text-[var(--photon-site-text)] [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:leading-8 [&_p]:text-[var(--photon-site-text)] [&_p+p]:mt-4 [&_strong]:font-semibold [&_strong]:text-[var(--photon-site-text)] [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5";

type EditableRichTextEditorComponent =
	ComponentType<PublicEditableRichTextProps>;

export const EditableRichText = ({
	blockId,
	path,
	className,
	placeholder = PHOTON_EMPTY_TEXT,
}: PublicEditableRichTextProps) => {
	const canEdit = usePhotonCanEdit();
	const value = String(usePhotonFieldValue(blockId, path) ?? "");
	const [EditableRichTextEditor, setEditableRichTextEditor] =
		useState<EditableRichTextEditorComponent | null>(null);

	useEffect(() => {
		if (!canEdit || EditableRichTextEditor) {
			return;
		}

		let cancelled = false;

		const loadEditor = getPhotonEditableEditorLoader("richText");

		if (!loadEditor) {
			return;
		}

		void loadEditor().then((component) => {
			if (!cancelled) {
				setEditableRichTextEditor(
					() => component as EditableRichTextEditorComponent,
				);
			}
		});

		return () => {
			cancelled = true;
		};
	}, [canEdit, EditableRichTextEditor]);

	if (canEdit && EditableRichTextEditor) {
		return (
			<EditableRichTextEditor
				blockId={blockId}
				path={path}
				className={className}
				placeholder={placeholder}
			/>
		);
	}

	return (
		<div
			data-photon-search-target={buildPhotonSearchTargetId(blockId, path)}
		>
			<div
				className={clsx(
					richTextContentClassName,
					className,
					!value && "text-[color:var(--photon-site-muted)] opacity-60",
				)}
				dangerouslySetInnerHTML={{
					__html: renderPhotonRichTextHtml(value, placeholder),
				}}
			/>
		</div>
	);
};
