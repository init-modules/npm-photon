"use client";

import clsx from "clsx";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import {
	usePhotonCanEdit,
	usePhotonFieldValue,
} from "../../context/photon-public-context";
import { getPhotonEditableEditorLoader } from "../../helpers/editable-editor-loaders";
import { resolvePhotonMediaPreviewUrl } from "../../helpers/media";

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
	const canEdit = usePhotonCanEdit();
	const rawValue = usePhotonFieldValue(blockId, path);
	const source = resolvePhotonMediaPreviewUrl(rawValue);
	const altValue = usePhotonFieldValue(blockId, altPath ?? path);
	const alt = altPath ? String(altValue ?? fallbackAlt) : fallbackAlt;
	const [EditableImageEditor, setEditableImageEditor] =
		useState<EditableImageEditorComponent | null>(null);

	useEffect(() => {
		if (!canEdit || EditableImageEditor) {
			return;
		}

		let cancelled = false;

		const loadEditor = getPhotonEditableEditorLoader("image");

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
				<div className="flex h-full min-h-[14rem] w-full items-center justify-center bg-[color:var(--photon-site-surface)] text-center text-[color:var(--photon-site-muted)]">
					<div className="px-6 text-sm leading-7">Media</div>
				</div>
			)}
		</div>
	);
};
