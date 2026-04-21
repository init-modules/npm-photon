"use client";

import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import {
	isWebsiteBuilderMediaValue,
	resolveWebsiteBuilderMediaPreviewUrl,
} from "../../helpers/media";
import { createWebsiteBuilderNodeId } from "../../helpers/tree";
import type { WebsiteBuilderMediaUploadHandler } from "../../types";
import { inputClassName } from "../shared";

type InspectorGalleryItem = {
	id?: string;
	media?: unknown;
	alt?: string;
	caption?: string;
};

type GalleryFieldEditorProps = {
	blockId: string;
	path: string;
	documentId: string;
	value: unknown;
	onFocus: () => void;
	onApply: (value: unknown) => void;
	onUpload?: WebsiteBuilderMediaUploadHandler;
};

export const GalleryFieldEditor = ({
	blockId,
	path,
	documentId,
	value,
	onFocus,
	onApply,
	onUpload,
}: GalleryFieldEditorProps) => {
	const [isUploading, setIsUploading] = useState(false);
	const items = Array.isArray(value) ? (value as InspectorGalleryItem[]) : [];

	const updateItems = (nextItems: InspectorGalleryItem[]) => {
		onApply(nextItems);
	};

	return (
		<div className="space-y-4">
			<div className="space-y-3">
				{items.map((item, index) => (
					<div
						key={item.id ?? `${blockId}-${path}-${index}`}
						className="rounded-[24px] border p-3"
						style={{
							borderColor: "var(--wb-builder-border)",
							background:
								"linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
							boxShadow: "var(--wb-builder-card-shadow)",
						}}
						data-testid={`wb-gallery-field-editor-item-${path}-${index}`}
					>
						<div className="grid gap-3 sm:grid-cols-[80px_minmax(0,1fr)]">
							<div
								className="overflow-hidden rounded-2xl border"
								style={{
									borderColor: "var(--wb-builder-border)",
									background: "var(--wb-builder-field)",
								}}
							>
								{resolveWebsiteBuilderMediaPreviewUrl(item.media) ? (
									<img
										src={resolveWebsiteBuilderMediaPreviewUrl(item.media)}
										alt={item.alt ?? `Gallery item ${index + 1}`}
										className="aspect-square h-full w-full object-cover"
									/>
								) : (
									<div
										className="flex aspect-square items-center justify-center text-xs uppercase tracking-[0.22em]"
										style={{ color: "var(--wb-builder-text-muted)" }}
									>
										Media
									</div>
								)}
							</div>
							<div className="space-y-3">
								<div className="flex flex-wrap gap-2">
									<div
										className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
										style={{
											borderColor: "var(--wb-builder-border)",
											background: "var(--wb-builder-field)",
											color: "var(--wb-builder-text-soft)",
										}}
									>
										{`item ${index + 1}`}
									</div>
									{isWebsiteBuilderMediaValue(item.media) &&
									item.media.temporaryUploadId ? (
										<div
											className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
											style={{
												borderColor: "var(--wb-builder-border-strong)",
												background: "var(--wb-builder-accent-strong)",
												color: "var(--wb-builder-accent)",
											}}
										>
											staged
										</div>
									) : null}
								</div>
								<input
									value={item.alt ?? ""}
									onFocus={onFocus}
									onChange={(event) =>
										updateItems(
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
									className={inputClassName}
								/>
								<textarea
									rows={3}
									value={item.caption ?? ""}
									onFocus={onFocus}
									onChange={(event) =>
										updateItems(
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
									className={clsx(inputClassName, "min-h-[92px] resize-y")}
								/>
								<div className="flex gap-2">
									<button
										type="button"
										onClick={() => {
											if (index === 0) {
												return;
											}

											const nextItems = [...items];
											[nextItems[index - 1], nextItems[index]] = [
												nextItems[index],
												nextItems[index - 1],
											];
											updateItems(nextItems);
										}}
										className="rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] transition"
										style={{
											borderColor: "var(--wb-builder-border)",
											background: "var(--wb-builder-field)",
											color: "var(--wb-builder-text-soft)",
										}}
									>
										Prev
									</button>
									<button
										type="button"
										onClick={() => {
											if (index === items.length - 1) {
												return;
											}

											const nextItems = [...items];
											[nextItems[index], nextItems[index + 1]] = [
												nextItems[index + 1],
												nextItems[index],
											];
											updateItems(nextItems);
										}}
										className="rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] transition"
										style={{
											borderColor: "var(--wb-builder-border)",
											background: "var(--wb-builder-field)",
											color: "var(--wb-builder-text-soft)",
										}}
									>
										Next
									</button>
									<button
										type="button"
										onClick={() =>
											updateItems(
												items.filter(
													(_, candidateIndex) => candidateIndex !== index,
												),
											)
										}
										className="rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] transition"
										style={{
											borderColor: "var(--wb-builder-border-strong)",
											background: "var(--wb-builder-accent-strong)",
											color: "var(--wb-builder-accent)",
										}}
									>
										Remove
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<label
				className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition"
				style={{
					borderColor: "var(--wb-builder-border-strong)",
					background: "var(--wb-builder-accent-strong)",
					color: "var(--wb-builder-accent)",
				}}
			>
				<span>
					{isUploading
						? "Uploading..."
						: items.length > 0
							? "Add more media"
							: "Add media"}
				</span>
				<input
					type="file"
					accept="image/*"
					multiple
					className="hidden"
					disabled={isUploading}
					onChange={(event) => {
						const files = event.currentTarget.files
							? Array.from(event.currentTarget.files)
							: [];

						if (files.length === 0 || !onUpload) {
							return;
						}

						setIsUploading(true);
						void Promise.all(
							files.map(async (file) => ({
								id: createWebsiteBuilderNodeId(),
								media: await onUpload({
									file,
									documentId,
									blockId,
									path,
								}),
								alt: file.name.replace(/\.[^.]+$/, ""),
								caption: "",
							})),
						)
							.then((uploadedItems) => {
								updateItems([...items, ...uploadedItems]);
							})
							.catch((error) => {
								toast.error("Gallery upload failed", {
									description:
										error instanceof Error
											? error.message
											: "Unable to upload gallery media.",
								});
							})
							.finally(() => {
								setIsUploading(false);
								event.currentTarget.value = "";
							});
					}}
				/>
			</label>
		</div>
	);
};
