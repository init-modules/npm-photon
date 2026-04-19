"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { WebsiteBuilderMediaUploadHandler } from "../../types";
import {
	isWebsiteBuilderMediaValue,
	resolveWebsiteBuilderMediaPreviewUrl,
	resolveWebsiteBuilderMediaUrl,
	updateWebsiteBuilderMediaUrl,
} from "../../helpers/media";
import { inputClassName } from "../shared";
import { formatMediaFileSize } from "./shared";

type ImageFieldEditorProps = {
	blockId: string;
	path: string;
	documentId: string;
	value: unknown;
	onFocus: () => void;
	onApply: (value: unknown) => void;
	onUpload?: WebsiteBuilderMediaUploadHandler;
};

export const ImageFieldEditor = ({
	blockId,
	path,
	documentId,
	value,
	onFocus,
	onApply,
	onUpload,
}: ImageFieldEditorProps) => {
	const [isUploading, setIsUploading] = useState(false);
	const source = resolveWebsiteBuilderMediaPreviewUrl(value);
	const mediaValue = isWebsiteBuilderMediaValue(value) ? value : null;

	return (
		<div className="space-y-3">
			<div
				className="overflow-hidden rounded-[24px] border"
				style={{
					borderColor: "var(--wb-builder-border)",
					background:
						"linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
					boxShadow: "var(--wb-builder-card-shadow)",
				}}
				data-testid={`wb-image-field-editor-preview-${path}`}
			>
				{source ? (
					<img
						src={source}
						alt="Inspector media preview"
						className="aspect-[4/3] w-full object-cover"
					/>
				) : (
					<div
						className="flex aspect-[4/3] items-center justify-center px-6 text-center text-sm"
						style={{ color: "var(--wb-builder-text-muted)" }}
					>
						Upload an image or paste a remote source URL.
					</div>
				)}
			</div>
			<div className="flex flex-wrap gap-2">
				{mediaValue?.temporaryUploadId ? (
					<div
						className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
						style={{
							borderColor: "var(--wb-builder-border-strong)",
							background: "var(--wb-builder-accent-strong)",
							color: "var(--wb-builder-accent)",
						}}
					>
						staged upload
					</div>
				) : null}
				{mediaValue?.fileName ? (
					<div
						className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
						style={{
							borderColor: "var(--wb-builder-border)",
							background: "var(--wb-builder-field)",
							color: "var(--wb-builder-text-soft)",
						}}
					>
						{mediaValue.fileName}
					</div>
				) : null}
				{mediaValue?.size ? (
					<div
						className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
						style={{
							borderColor: "var(--wb-builder-border)",
							background: "var(--wb-builder-field)",
							color: "var(--wb-builder-text-soft)",
						}}
					>
						{formatMediaFileSize(mediaValue.size) ?? "remote"}
					</div>
				) : null}
			</div>
			<input
				type="text"
				value={resolveWebsiteBuilderMediaUrl(value)}
				onFocus={onFocus}
				onChange={(event) =>
					onApply(
						updateWebsiteBuilderMediaUrl(value, event.currentTarget.value),
					)
				}
				className={inputClassName}
			/>
			<div className="flex flex-wrap items-center gap-2">
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
							: source
								? "Replace media"
								: "Upload media"}
					</span>
					<input
						type="file"
						accept="image/*"
						className="hidden"
						disabled={isUploading}
						onChange={(event) => {
							const file = event.currentTarget.files?.[0];

							if (!file || !onUpload) {
								return;
							}

							setIsUploading(true);
							void onUpload({
								file,
								documentId,
								blockId,
								path,
							})
								.then((uploadedMedia) => onApply(uploadedMedia))
								.catch((error) => {
									toast.error("Upload failed", {
										description:
											error instanceof Error
												? error.message
												: "Unable to upload the selected media file.",
									});
								})
								.finally(() => {
									setIsUploading(false);
									event.currentTarget.value = "";
								});
						}}
					/>
				</label>
				<button
					type="button"
					onClick={() => onApply("")}
					className="rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition"
					style={{
						borderColor: "var(--wb-builder-border)",
						background: "var(--wb-builder-field)",
						color: "var(--wb-builder-text-soft)",
					}}
				>
					Clear
				</button>
			</div>
		</div>
	);
};
