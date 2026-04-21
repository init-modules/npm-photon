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
import { renderWebsiteBuilderRichTextHtml } from "./sanitize-rich-text";

type PublicEditableRichTextProps = {
	blockId: string;
	path: string;
	className?: string;
	placeholder?: string;
};

const richTextContentClassName =
	"text-[var(--wb-site-text)] [&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--wb-site-border)] [&_blockquote]:pl-4 [&_blockquote]:text-[var(--wb-site-muted-text)] [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.04em] [&_h2]:text-[var(--wb-site-text)] [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-[-0.03em] [&_h3]:text-[var(--wb-site-text)] [&_li]:text-[var(--wb-site-text)] [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:leading-8 [&_p]:text-[var(--wb-site-text)] [&_p+p]:mt-4 [&_strong]:font-semibold [&_strong]:text-[var(--wb-site-text)] [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5";

type EditableRichTextEditorComponent = ComponentType<PublicEditableRichTextProps>;

export const EditableRichText = ({
	blockId,
	path,
	className,
	placeholder = WEBSITE_BUILDER_EMPTY_TEXT,
}: PublicEditableRichTextProps) => {
	const canEdit = useWebsiteBuilderCanEdit();
	const value = String(useWebsiteBuilderFieldValue(blockId, path) ?? "");
	const [EditableRichTextEditor, setEditableRichTextEditor] =
		useState<EditableRichTextEditorComponent | null>(null);

	useEffect(() => {
		if (!canEdit || EditableRichTextEditor) {
			return;
		}

		let cancelled = false;

		const loadEditor = getWebsiteBuilderEditableEditorLoader("richText");

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
		<div data-wb-search-target={buildWebsiteBuilderSearchTargetId(blockId, path)}>
			<div
				className={clsx(
					richTextContentClassName,
					className,
					!value && "text-[color:var(--wb-site-muted)] opacity-60",
				)}
				dangerouslySetInnerHTML={{
					__html: renderWebsiteBuilderRichTextHtml(value, placeholder),
				}}
			/>
		</div>
	);
};
