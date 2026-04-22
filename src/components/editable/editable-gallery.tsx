"use client";

import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import {
	usePhotonCanEdit,
	usePhotonFieldValue,
	usePhotonStore,
} from "../../context/photon-context";
import { createPhotonNodeId } from "../../helpers/tree";
import { EditableGalleryAddCard } from "./editable-gallery-add-card";
import { EditableGalleryEmptyState } from "./editable-gallery-empty-state";
import { EditableGalleryItemCard } from "./editable-gallery-item-card";
import type { EditableGalleryItem } from "./editable-gallery-types";
import { createActivationProps, editableFrameClassName } from "./shared";

type EditableGalleryProps = {
	blockId: string;
	path: string;
	className?: string;
	emptyTitle?: string;
	emptyBody?: string;
	columnsClassName?: string;
	itemCardClassName?: string;
	itemFallbackClassName?: string;
	itemLabelClassName?: string;
	itemCaptionClassName?: string;
	itemFileNameClassName?: string;
	emptyStateClassName?: string;
	emptyStateTitleClassName?: string;
	emptyStateBodyClassName?: string;
	emptyStateButtonClassName?: string;
	addCardClassName?: string;
	addCardTitleClassName?: string;
	addCardBodyClassName?: string;
	addCardButtonClassName?: string;
};

export const EditableGallery = ({
	blockId,
	path,
	className,
	emptyTitle = "Upload gallery images",
	emptyBody = "Drop or upload supporting visuals directly into the live page.",
	columnsClassName = "grid gap-4 sm:grid-cols-2",
	itemCardClassName,
	itemFallbackClassName,
	itemLabelClassName,
	itemCaptionClassName,
	itemFileNameClassName,
	emptyStateClassName,
	emptyStateTitleClassName,
	emptyStateBodyClassName,
	emptyStateButtonClassName,
	addCardClassName,
	addCardTitleClassName,
	addCardBodyClassName,
	addCardButtonClassName,
}: EditableGalleryProps) => {
	const documentId = usePhotonStore((state) => state.document.id);
	const selectedField = usePhotonStore((state) => state.selectedField);
	const selectField = usePhotonStore((state) => state.selectField);
	const updateFieldValue = usePhotonStore(
		(state) => state.updateFieldValue,
	);
	const uploadMedia = usePhotonStore((state) => state.uploadMedia);
	const [isUploading, setIsUploading] = useState(false);
	const galleryValue = usePhotonFieldValue(blockId, path);
	const items = Array.isArray(galleryValue)
		? (galleryValue as EditableGalleryItem[])
		: [];
	const isEditable = usePhotonCanEdit();
	const isActive =
		selectedField?.blockId === blockId && selectedField.path === path;

	const updateItems = (nextItems: EditableGalleryItem[]) => {
		updateFieldValue(blockId, path, nextItems);
	};

	const handleUpload = async (files: FileList | null) => {
		if (!files?.length) {
			return;
		}

		const selectedFiles = Array.from(files);

		if (!uploadMedia) {
			updateItems([
				...items,
				...selectedFiles.map((file) => ({
					id: createPhotonNodeId(),
					media: URL.createObjectURL(file),
					alt: file.name.replace(/\.[^.]+$/, ""),
					caption: "",
				})),
			]);
			return;
		}

		setIsUploading(true);

		try {
			const uploadedItems = await Promise.all(
				selectedFiles.map(async (file) => ({
					id: createPhotonNodeId(),
					media: await uploadMedia({
						file,
						documentId,
						blockId,
						path,
					}),
					alt: file.name.replace(/\.[^.]+$/, ""),
					caption: "",
				})),
			);

			updateItems([...items, ...uploadedItems]);
		} catch (error) {
			toast.error("Gallery upload failed", {
				description:
					error instanceof Error
						? error.message
						: "Unable to upload one or more gallery images.",
			});
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div
			{...createActivationProps(isEditable, () => selectField(blockId, path))}
			data-testid="photon-editable-gallery"
			className={editableFrameClassName({ isActive, isEditable, className })}
		>
			<div
				className={clsx(columnsClassName, items.length === 0 && "grid-cols-1")}
			>
				{items.length === 0 ? (
					<EditableGalleryEmptyState
						emptyTitle={emptyTitle}
						emptyBody={emptyBody}
						isEditable={isEditable}
						isUploading={isUploading}
						onUpload={handleUpload}
						className={emptyStateClassName}
						titleClassName={emptyStateTitleClassName}
						bodyClassName={emptyStateBodyClassName}
						buttonClassName={emptyStateButtonClassName}
					/>
				) : (
					<>
						{items.map((item, index) => (
							<EditableGalleryItemCard
								key={item.id ?? `${blockId}-gallery-${index}`}
								blockId={blockId}
								index={index}
								item={item}
								items={items}
								isEditable={isEditable}
								isActive={isActive}
								onUpdateItems={updateItems}
								className={itemCardClassName}
								fallbackClassName={itemFallbackClassName}
								labelClassName={itemLabelClassName}
								captionClassName={itemCaptionClassName}
								fileNameClassName={itemFileNameClassName}
							/>
						))}

						{isEditable ? (
							<EditableGalleryAddCard
								isUploading={isUploading}
								onUpload={handleUpload}
								className={addCardClassName}
								titleClassName={addCardTitleClassName}
								bodyClassName={addCardBodyClassName}
								buttonClassName={addCardButtonClassName}
							/>
						) : null}
					</>
				)}
			</div>
		</div>
	);
};
