"use client";

import clsx from "clsx";
import {
	isWebsiteBuilderMediaValue,
	resolveWebsiteBuilderMediaPreviewUrl,
} from "../../helpers/media";
import type { EditableGalleryItem } from "./editable-gallery-types";
import { MediaStateChip } from "./media-state-chip";
import { builderInputClassName } from "./shared";

type EditableGalleryItemCardProps = {
	blockId: string;
	index: number;
	item: EditableGalleryItem;
	items: EditableGalleryItem[];
	isEditable: boolean;
	isActive: boolean;
	onUpdateItems: (items: EditableGalleryItem[]) => void;
	className?: string;
	fallbackClassName?: string;
	labelClassName?: string;
	captionClassName?: string;
	fileNameClassName?: string;
};

export const EditableGalleryItemCard = ({
	blockId,
	index,
	item,
	items,
	isEditable,
	isActive,
	onUpdateItems,
	className,
	fallbackClassName,
	labelClassName,
	captionClassName,
	fileNameClassName,
}: EditableGalleryItemCardProps) => {
	const mediaValue = isWebsiteBuilderMediaValue(item.media) ? item.media : null;
	const previewUrl = resolveWebsiteBuilderMediaPreviewUrl(item.media);
	const isHeroItem = items.length >= 3 && index === 0;
	const isEditingItem = isEditable && isActive;

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
				boxShadow: "var(--wb-gallery-card-shadow, 0 24px 56px rgba(0,0,0,0.2))",
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
							color: "var(--wb-gallery-fallback-text, rgba(255,255,255,0.48))",
						}}
					>
						Media slot
					</div>
				)}
				<div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
					<MediaStateChip>{`item ${index + 1}`}</MediaStateChip>
					{mediaValue?.temporaryUploadId ? (
						<MediaStateChip tone="accent">staged</MediaStateChip>
					) : null}
				</div>
				{isEditingItem ? (
					<div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-end gap-2">
						<button
							type="button"
							onClick={(event) => {
								event.stopPropagation();

								if (index === 0) {
									return;
								}

								const nextItems = [...items];
								[nextItems[index - 1], nextItems[index]] = [
									nextItems[index],
									nextItems[index - 1],
								];
								onUpdateItems(nextItems);
							}}
							className="rounded-full border border-black/20 bg-slate-950/88 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55 backdrop-blur"
							style={{
								borderColor:
									"var(--wb-gallery-control-border, rgba(0,0,0,0.2))",
								background: "var(--wb-gallery-control-bg, rgba(2,6,23,0.88))",
								color: "var(--wb-gallery-control-text, rgba(255,255,255,0.55))",
							}}
						>
							Prev
						</button>
						<button
							type="button"
							onClick={(event) => {
								event.stopPropagation();

								if (index === items.length - 1) {
									return;
								}

								const nextItems = [...items];
								[nextItems[index], nextItems[index + 1]] = [
									nextItems[index + 1],
									nextItems[index],
								];
								onUpdateItems(nextItems);
							}}
							className="rounded-full border border-black/20 bg-slate-950/88 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55 backdrop-blur"
							style={{
								borderColor:
									"var(--wb-gallery-control-border, rgba(0,0,0,0.2))",
								background: "var(--wb-gallery-control-bg, rgba(2,6,23,0.88))",
								color: "var(--wb-gallery-control-text, rgba(255,255,255,0.55))",
							}}
						>
							Next
						</button>
						<button
							type="button"
							onClick={(event) => {
								event.stopPropagation();
								onUpdateItems(
									items.filter((_, candidateIndex) => candidateIndex !== index),
								);
							}}
							className="rounded-full border border-rose-300/18 bg-rose-300/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-rose-100 backdrop-blur"
							style={{
								borderColor:
									"var(--wb-gallery-remove-border, rgba(253,164,175,0.18))",
								background:
									"var(--wb-gallery-remove-bg, rgba(253,164,175,0.1))",
								color: "var(--wb-gallery-remove-text, rgb(255 228 230))",
							}}
						>
							Remove
						</button>
					</div>
				) : null}
			</div>
			<div className="space-y-3 px-5 py-5">
				{isEditingItem ? (
					<>
						<input
							value={item.alt ?? ""}
							onClick={(event) => event.stopPropagation()}
							onChange={(event) =>
								onUpdateItems(
									items.map((candidate, candidateIndex) =>
										candidateIndex === index
											? {
													...candidate,
													alt: event.currentTarget.value,
												}
											: candidate,
									),
								)
							}
							placeholder="Alt text"
							className={builderInputClassName}
						/>
						<textarea
							rows={3}
							value={item.caption ?? ""}
							onClick={(event) => event.stopPropagation()}
							onChange={(event) =>
								onUpdateItems(
									items.map((candidate, candidateIndex) =>
										candidateIndex === index
											? {
													...candidate,
													caption: event.currentTarget.value,
												}
											: candidate,
									),
								)
							}
							placeholder="Caption"
							className={clsx(builderInputClassName, "min-h-[96px] resize-y")}
						/>
					</>
				) : (
					<div className="space-y-3">
						<div
							data-testid="wb-editable-gallery-item-label"
							className={clsx(
								"text-[11px] font-semibold uppercase tracking-[0.26em]",
								labelClassName,
							)}
							style={{
								color: "var(--wb-gallery-label, rgba(207,250,254,0.56))",
							}}
						>
							{item.alt?.trim() ? item.alt : `Gallery image ${index + 1}`}
						</div>
						<div
							data-testid="wb-editable-gallery-item-caption"
							className={clsx("text-sm leading-7", captionClassName)}
							style={{
								color: "var(--wb-gallery-caption, rgba(203,213,225,0.92))",
							}}
						>
							{item.caption?.trim()
								? item.caption
								: "Click the gallery in Content or Builder mode to annotate this image."}
						</div>
						{mediaValue?.fileName || mediaValue?.name ? (
							<div
								data-testid="wb-editable-gallery-item-file-name"
								className={clsx(
									"inline-flex rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em]",
									fileNameClassName,
								)}
								style={{
									borderColor:
										"var(--wb-gallery-file-border, rgba(255,255,255,0.08))",
									background:
										"var(--wb-gallery-file-bg, rgba(255,255,255,0.03))",
									color: "var(--wb-gallery-file-text, rgba(255,255,255,0.4))",
								}}
							>
								{mediaValue?.fileName ?? mediaValue?.name}
							</div>
						) : null}
					</div>
				)}
			</div>
		</article>
	);
};
