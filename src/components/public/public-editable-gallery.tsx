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

type PublicEditableGalleryItem = {
	id?: string;
	media?: unknown;
	alt?: string;
	caption?: string;
	eyebrow?: string;
};

type PublicEditableGalleryProps = {
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

type EditableGalleryEditorComponent = ComponentType<PublicEditableGalleryProps>;

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
}: PublicEditableGalleryProps) => {
	const canEdit = useWebsiteBuilderCanEdit();
	const galleryValue = useWebsiteBuilderFieldValue(blockId, path);
	const items = Array.isArray(galleryValue)
		? (galleryValue as PublicEditableGalleryItem[])
		: [];
	const [EditableGalleryEditor, setEditableGalleryEditor] =
		useState<EditableGalleryEditorComponent | null>(null);

	useEffect(() => {
		if (!canEdit || EditableGalleryEditor) {
			return;
		}

		let cancelled = false;

		const loadEditor = getWebsiteBuilderEditableEditorLoader("gallery");

		if (!loadEditor) {
			return;
		}

		void loadEditor().then((component) => {
			if (!cancelled) {
				setEditableGalleryEditor(
					() => component as EditableGalleryEditorComponent,
				);
			}
		});

		return () => {
			cancelled = true;
		};
	}, [canEdit, EditableGalleryEditor]);

	if (canEdit && EditableGalleryEditor) {
		return (
			<EditableGalleryEditor
				blockId={blockId}
				path={path}
				className={className}
				emptyTitle={emptyTitle}
				emptyBody={emptyBody}
				columnsClassName={columnsClassName}
				itemCardClassName={itemCardClassName}
				itemFallbackClassName={itemFallbackClassName}
				itemLabelClassName={itemLabelClassName}
				itemCaptionClassName={itemCaptionClassName}
				itemFileNameClassName={itemFileNameClassName}
				emptyStateClassName={emptyStateClassName}
				emptyStateTitleClassName={emptyStateTitleClassName}
				emptyStateBodyClassName={emptyStateBodyClassName}
				emptyStateButtonClassName={emptyStateButtonClassName}
				addCardClassName={addCardClassName}
				addCardTitleClassName={addCardTitleClassName}
				addCardBodyClassName={addCardBodyClassName}
				addCardButtonClassName={addCardButtonClassName}
			/>
		);
	}

	return (
		<EditableGalleryStatic
			items={items}
			className={className}
			columnsClassName={columnsClassName}
			itemCardClassName={itemCardClassName}
			itemFallbackClassName={itemFallbackClassName}
			itemLabelClassName={itemLabelClassName}
			itemCaptionClassName={itemCaptionClassName}
			itemFileNameClassName={itemFileNameClassName}
			emptyTitle={emptyTitle}
			emptyBody={emptyBody}
			emptyStateClassName={emptyStateClassName}
			emptyStateTitleClassName={emptyStateTitleClassName}
			emptyStateBodyClassName={emptyStateBodyClassName}
		/>
	);
};

const EditableGalleryStatic = ({
	items,
	className,
	columnsClassName,
	itemCardClassName,
	itemFallbackClassName,
	itemLabelClassName,
	itemCaptionClassName,
	itemFileNameClassName,
	emptyTitle,
	emptyBody,
	emptyStateClassName,
	emptyStateTitleClassName,
	emptyStateBodyClassName,
}: {
	items: PublicEditableGalleryItem[];
	className?: string;
	columnsClassName: string;
	itemCardClassName?: string;
	itemFallbackClassName?: string;
	itemLabelClassName?: string;
	itemCaptionClassName?: string;
	itemFileNameClassName?: string;
	emptyTitle: string;
	emptyBody: string;
	emptyStateClassName?: string;
	emptyStateTitleClassName?: string;
	emptyStateBodyClassName?: string;
}) => (
	<div data-testid="wb-editable-gallery" className={className}>
		<div className={clsx(columnsClassName, items.length === 0 && "grid-cols-1")}>
			{items.length === 0 ? (
				<div
					className={clsx(
						"rounded-[34px] border border-dashed px-6 py-8 text-center",
						emptyStateClassName,
					)}
					style={{
						borderColor:
							"var(--wb-gallery-empty-border, rgba(214,211,209,0.9))",
						background:
							"var(--wb-gallery-empty-bg, linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,240,231,0.96)))",
						color: "var(--wb-gallery-empty-text, rgba(87,83,78,0.84))",
						boxShadow:
							"var(--wb-gallery-empty-shadow, 0 18px 40px rgba(120,113,108,0.12))",
					}}
				>
					<p
						className={clsx(
							"text-sm font-semibold",
							emptyStateTitleClassName,
						)}
						style={{ color: "var(--wb-gallery-empty-title, currentColor)" }}
					>
						{emptyTitle}
					</p>
					<p className={clsx("mt-2 text-sm", emptyStateBodyClassName)}>
						{emptyBody}
					</p>
				</div>
			) : (
				items.map((item, index) => (
					<PublicGalleryItemCard
						key={item.id ?? `${index}-${resolveWebsiteBuilderMediaPreviewUrl(item.media)}`}
						item={item}
						index={index}
						totalItems={items.length}
						className={itemCardClassName}
						fallbackClassName={itemFallbackClassName}
						labelClassName={itemLabelClassName}
						captionClassName={itemCaptionClassName}
						fileNameClassName={itemFileNameClassName}
					/>
				))
			)}
		</div>
	</div>
);

const PublicGalleryItemCard = ({
	item,
	index,
	totalItems,
	className,
	fallbackClassName,
	labelClassName,
	captionClassName,
	fileNameClassName,
}: {
	item: PublicEditableGalleryItem;
	index: number;
	totalItems: number;
	className?: string;
	fallbackClassName?: string;
	labelClassName?: string;
	captionClassName?: string;
	fileNameClassName?: string;
}) => {
	const previewUrl = resolveWebsiteBuilderMediaPreviewUrl(item.media);
	const isHeroItem = totalItems >= 3 && index === 0;

	return (
		<article
			data-testid="wb-editable-gallery-item"
			className={clsx(
				"overflow-hidden rounded-[34px] border",
				className,
				isHeroItem && "md:col-span-2",
			)}
			style={{
				borderColor: "var(--wb-gallery-card-border, rgba(255,255,255,0.1))",
				background:
					"var(--wb-gallery-card-bg, radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_48%),linear-gradient(180deg,rgba(8,17,30,0.97),rgba(5,11,20,0.99)))",
				boxShadow:
					"var(--wb-gallery-card-shadow, 0 24px 56px rgba(0,0,0,0.2))",
			}}
		>
			<div
				className={clsx(
					"relative overflow-hidden",
					isHeroItem ? "aspect-[16/10]" : "aspect-[4/3]",
				)}
			>
				{previewUrl ? (
					<img
						src={previewUrl}
						alt={item.alt || `Gallery image ${index + 1}`}
						className="h-full w-full object-cover"
					/>
				) : (
					<div
						className={clsx(
							"flex h-full w-full items-center justify-center text-center text-sm",
							fallbackClassName,
						)}
						style={{
							background:
								"var(--wb-gallery-fallback-bg, radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_28%),linear-gradient(180deg,rgba(7,17,31,0.92),rgba(5,11,20,0.98)))",
							color:
								"var(--wb-gallery-fallback-text, rgba(255,255,255,0.48))",
						}}
					>
						Media slot
					</div>
				)}
			</div>
			<div className="space-y-3 px-5 py-5">
				<p
					className={clsx(
						"text-[11px] font-semibold uppercase tracking-[0.2em]",
						labelClassName,
					)}
					style={{ color: "var(--wb-gallery-label, rgba(255,255,255,0.54))" }}
				>
					{item.eyebrow || `Item ${index + 1}`}
				</p>
				{item.caption ? (
					<p
						className={clsx("text-sm leading-6", captionClassName)}
						style={{
							color: "var(--wb-gallery-caption, rgba(255,255,255,0.72))",
						}}
					>
						{item.caption}
					</p>
				) : null}
				{typeof item.media === "string" ? (
					<p
						className={clsx(
							"truncate rounded-full border px-3 py-1.5 text-xs",
							fileNameClassName,
						)}
						style={{
							borderColor:
								"var(--wb-gallery-file-border, rgba(255,255,255,0.08))",
							background:
								"var(--wb-gallery-file-bg, rgba(255,255,255,0.05))",
							color:
								"var(--wb-gallery-file-text, rgba(255,255,255,0.5))",
						}}
					>
						{item.media}
					</p>
				) : null}
			</div>
		</article>
	);
};
