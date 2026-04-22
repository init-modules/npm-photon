"use client";

import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import {
	isPhotonMediaValue,
	resolvePhotonMediaPreviewUrl,
} from "../../helpers/media";
import { createPhotonNodeId } from "../../helpers/tree";
import type { PhotonMediaUploadHandler } from "../../types";
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
	onUpload?: PhotonMediaUploadHandler;
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
							borderColor: "var(--photon-builder-border)",
							background:
								"linear-gradient(180deg, var(--photon-builder-panel-solid), var(--photon-builder-panel))",
							boxShadow: "var(--photon-builder-card-shadow)",
						}}
						data-testid={`photon-gallery-field-editor-item-${path}-${index}`}
					>
						<div className="grid gap-3 sm:grid-cols-[80px_minmax(0,1fr)]">
							<div
								className="overflow-hidden rounded-2xl border"
								style={{
									borderColor: "var(--photon-builder-border)",
									background: "var(--photon-builder-field)",
								}}
							>
								{resolvePhotonMediaPreviewUrl(item.media) ? (
									<img
										src={resolvePhotonMediaPreviewUrl(item.media)}
										alt={item.alt ?? `Gallery item ${index + 1}`}
										className="aspect-square h-full w-full object-cover"
									/>
								) : (
									<div
										className="flex aspect-square items-center justify-center text-xs uppercase tracking-[0.22em]"
										style={{ color: "var(--photon-builder-text-muted)" }}
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
											borderColor: "var(--photon-builder-border)",
											background: "var(--photon-builder-field)",
											color: "var(--photon-builder-text-soft)",
										}}
									>
										{`item ${index + 1}`}
									</div>
									{isPhotonMediaValue(item.media) &&
									item.media.temporaryUploadId ? (
										<div
											className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
											style={{
												borderColor: "var(--photon-builder-border-strong)",
												background: "var(--photon-builder-accent-strong)",
												color: "var(--photon-builder-accent)",
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
											borderColor: "var(--photon-builder-border)",
											background: "var(--photon-builder-field)",
											color: "var(--photon-builder-text-soft)",
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
											borderColor: "var(--photon-builder-border)",
											background: "var(--photon-builder-field)",
											color: "var(--photon-builder-text-soft)",
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
											borderColor: "var(--photon-builder-border-strong)",
											background: "var(--photon-builder-accent-strong)",
											color: "var(--photon-builder-accent)",
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
					borderColor: "var(--photon-builder-border-strong)",
					background: "var(--photon-builder-accent-strong)",
					color: "var(--photon-builder-accent)",
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
								id: createPhotonNodeId(),
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
