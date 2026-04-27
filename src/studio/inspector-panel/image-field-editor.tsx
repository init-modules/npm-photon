"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
	isPhotonMediaValue,
	resolvePhotonMediaPreviewUrl,
	resolvePhotonMediaUrl,
	updatePhotonMediaUrl,
} from "../../helpers/media";
import type { PhotonMediaUploadHandler } from "../../types";
import { inputClassName } from "../shared";
import { formatMediaFileSize } from "./shared";

type ImageFieldEditorProps = {
	blockId: string;
	path: string;
	documentId: string;
	value: unknown;
	onFocus: () => void;
	onApply: (value: unknown) => void;
	onUpload?: PhotonMediaUploadHandler;
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
	const source = resolvePhotonMediaPreviewUrl(value);
	const mediaValue = isPhotonMediaValue(value) ? value : null;

	return (
		<div className="space-y-1">
			<div
				className="overflow-hidden rounded-sm"
				style={{
					background: "var(--photon-builder-field)",
				}}
				data-testid={`photon-image-field-editor-preview-${path}`}
			>
				{source ? (
					<img
						src={source}
						alt="Inspector media preview"
						className="max-h-32 w-full object-contain"
					/>
				) : (
					<div
						className="flex h-16 items-center justify-center px-2 text-center text-[10.5px]"
						style={{ color: "var(--photon-builder-text-soft)" }}
					>
						No image. Upload or paste a remote URL.
					</div>
				)}
			</div>
			{mediaValue?.temporaryUploadId ||
			mediaValue?.fileName ||
			mediaValue?.size ? (
				<div className="flex flex-wrap gap-1">
					{mediaValue?.temporaryUploadId ? (
						<div
							className="rounded-sm px-1.5 py-0 text-[10px] uppercase tracking-[0.14em]"
							style={{
								background: "var(--photon-builder-accent-strong)",
								color: "var(--photon-builder-accent)",
							}}
						>
							staged upload
						</div>
					) : null}
					{mediaValue?.fileName ? (
						<div
							className="rounded-sm px-1.5 py-0 text-[10px] uppercase tracking-[0.14em]"
							style={{
								background: "var(--photon-builder-panel-solid)",
								color: "var(--photon-builder-text-soft)",
							}}
						>
							{mediaValue.fileName}
						</div>
					) : null}
					{mediaValue?.size ? (
						<div
							className="rounded-sm px-1.5 py-0 text-[10px] uppercase tracking-[0.14em]"
							style={{
								background: "var(--photon-builder-panel-solid)",
								color: "var(--photon-builder-text-soft)",
							}}
						>
							{formatMediaFileSize(mediaValue.size) ?? "remote"}
						</div>
					) : null}
				</div>
			) : null}
			<input
				type="text"
				value={resolvePhotonMediaUrl(value)}
				placeholder="https://… or paste URL"
				onFocus={onFocus}
				onChange={(event) =>
					onApply(
						updatePhotonMediaUrl(value, event.currentTarget.value),
					)
				}
				className={inputClassName}
			/>
			<div className="flex items-center gap-1">
				<label
					className="inline-flex h-6 cursor-pointer items-center gap-1 rounded-sm px-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] transition"
					style={{
						background: "var(--photon-builder-accent-soft)",
						color: "var(--photon-builder-accent-text)",
					}}
				>
					<span>
						{isUploading
							? "Uploading…"
							: source
								? "Replace"
								: "Upload"}
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
					className="inline-flex h-6 cursor-pointer items-center rounded-sm px-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] transition hover:bg-[color:var(--photon-builder-field)]"
					style={{
						color: "var(--photon-builder-text-soft)",
					}}
				>
					Clear
				</button>
			</div>
		</div>
	);
};
