"use client";

import clsx from "clsx";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import {
	useWebsiteBuilderCanEdit,
	useWebsiteBuilderFieldValue,
} from "../../context/website-builder-context";
import { getWebsiteBuilderEditableEditorLoader } from "../../helpers/editable-editor-loaders";
import { resolveWebsiteBuilderMediaPreviewUrl } from "../../helpers/media";

type PublicEditableImageProps = {
	blockId: string;
	path: string;
	altPath?: string;
	className?: string;
	imageClassName?: string;
	fallbackAlt?: string;
};

type EditableImageEditorComponent = ComponentType<PublicEditableImageProps>;

export const EditableImage = ({
	blockId,
	path,
	altPath,
	className,
	imageClassName,
	fallbackAlt = "Builder image",
}: PublicEditableImageProps) => {
	const canEdit = useWebsiteBuilderCanEdit();
	const rawValue = useWebsiteBuilderFieldValue(blockId, path);
	const source = resolveWebsiteBuilderMediaPreviewUrl(rawValue);
	const altValue = altPath
		? useWebsiteBuilderFieldValue(blockId, altPath)
		: null;
	const alt = altPath ? String(altValue ?? fallbackAlt) : fallbackAlt;
	const [EditableImageEditor, setEditableImageEditor] =
		useState<EditableImageEditorComponent | null>(null);

	useEffect(() => {
		if (!canEdit || EditableImageEditor) {
			return;
		}

		let cancelled = false;

		const loadEditor = getWebsiteBuilderEditableEditorLoader("image");

		if (!loadEditor) {
			return;
		}

		void loadEditor().then((component) => {
			if (!cancelled) {
				setEditableImageEditor(() => component as EditableImageEditorComponent);
			}
		});

		return () => {
			cancelled = true;
		};
	}, [canEdit, EditableImageEditor]);

	if (canEdit && EditableImageEditor) {
		return (
			<EditableImageEditor
				blockId={blockId}
				path={path}
				altPath={altPath}
				className={className}
				imageClassName={imageClassName}
				fallbackAlt={fallbackAlt}
			/>
		);
	}

	return (
		<div className={className}>
			{source ? (
				<img
					src={source}
					alt={alt}
					className={clsx("h-full w-full object-cover", imageClassName)}
				/>
			) : (
				<div className="flex h-full min-h-[14rem] w-full items-center justify-center bg-[color:var(--wb-site-surface)] text-center text-[color:var(--wb-site-muted)]">
					<div className="px-6 text-sm leading-7">Media</div>
				</div>
			)}
		</div>
	);
};
