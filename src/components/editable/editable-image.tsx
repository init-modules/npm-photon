"use client";

import clsx from "clsx";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
	usePhotonCanEdit,
	usePhotonFieldValue,
	usePhotonStore,
	usePhotonStoreApi,
} from "../../context/photon-context";
import {
	isPhotonMediaValue,
	resolvePhotonMediaPreviewUrl,
	resolvePhotonMediaUrl,
	updatePhotonMediaUrl,
} from "../../helpers/media";
import { MediaStateChip } from "./media-state-chip";
import {
	builderInputClassName,
	createActivationProps,
	editableFrameClassName,
	formatMediaFileSize,
} from "./shared";

type EditableImageProps = {
	blockId: string;
	path: string;
	altPath?: string;
	className?: string;
	imageClassName?: string;
	fallbackAlt?: string;
};

export const EditableImage = ({
	blockId,
	path,
	altPath,
	className,
	imageClassName,
	fallbackAlt = "Builder image",
}: EditableImageProps) => {
	const store = usePhotonStoreApi();
	const documentId = usePhotonStore((state) => state.document.id);
	const selectedField = usePhotonStore((state) => state.selectedField);
	const selectField = usePhotonStore((state) => state.selectField);
	const updateFieldValue = usePhotonStore(
		(state) => state.updateFieldValue,
	);
	const uploadMedia = usePhotonStore((state) => state.uploadMedia);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const rawValue = usePhotonFieldValue(blockId, path);
	const source = previewUrl ?? resolvePhotonMediaPreviewUrl(rawValue);
	const altValue = altPath
		? usePhotonFieldValue(blockId, altPath)
		: null;
	const alt = altPath ? String(altValue ?? fallbackAlt) : fallbackAlt;
	const mediaValue = isPhotonMediaValue(rawValue) ? rawValue : null;
	const isEditable = usePhotonCanEdit();
	const isActive =
		selectedField?.blockId === blockId && selectedField.path === path;

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.currentTarget.files?.[0];

		if (!file) {
			return;
		}

		const nextPreviewUrl = URL.createObjectURL(file);

		if (!uploadMedia) {
			updateFieldValue(blockId, path, nextPreviewUrl);
			setPreviewUrl(nextPreviewUrl);
			return;
		}

		setPreviewUrl(nextPreviewUrl);
		setIsUploading(true);

		void uploadMedia({
			file,
			documentId,
			blockId,
			path,
		})
			.then((uploadedMedia) => {
				updateFieldValue(blockId, path, uploadedMedia);

				if (altPath) {
					const currentAlt = String(
						store.getState().getFieldValue(blockId, altPath) ?? "",
					);

					if (!currentAlt.trim()) {
						updateFieldValue(
							blockId,
							altPath,
							file.name.replace(/\.[^.]+$/, ""),
						);
					}
				}
			})
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
				setPreviewUrl((currentPreviewUrl) => {
					if (currentPreviewUrl) {
						URL.revokeObjectURL(currentPreviewUrl);
					}

					return null;
				});
				event.currentTarget.value = "";
			});
	};

	useEffect(
		() => () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		},
		[previewUrl],
	);

	return (
		<div
			{...createActivationProps(isEditable, () => selectField(blockId, path))}
			className={editableFrameClassName({ isActive, isEditable, className })}
		>
			{source ? (
				<img
					src={source}
					alt={alt}
					className={clsx("h-full w-full object-cover", imageClassName)}
				/>
			) : (
				<div className="flex h-full min-h-[14rem] w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_28%),linear-gradient(180deg,rgba(9,18,31,0.92),rgba(5,11,20,0.98))] text-center text-white/48">
					<div className="px-6">
						<div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-100/66">
							Media slot
						</div>
						<div className="mt-3 text-sm leading-7 text-white/54">
							Upload a staged image or paste a remote URL directly into the live
							page.
						</div>
					</div>
				</div>
			)}

			{isEditable ? (
				<div
					className={clsx(
						"pointer-events-none absolute inset-x-4 bottom-4 rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_58%),linear-gradient(180deg,rgba(7,17,31,0.94),rgba(6,13,24,0.98))] px-4 py-4 text-xs text-white/70 opacity-0 shadow-[0_20px_48px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-200 ease-out",
						isActive && "pointer-events-auto opacity-100",
					)}
				>
					<div className="mb-3 flex items-center justify-between gap-3">
						<div className="uppercase tracking-[0.26em] text-white/42">
							Media source
						</div>
						<div className="flex flex-wrap items-center gap-2">
							{mediaValue?.temporaryUploadId ? (
								<MediaStateChip tone="accent">staged</MediaStateChip>
							) : null}
							{mediaValue?.mediaId ? (
								<MediaStateChip>saved</MediaStateChip>
							) : null}
							{mediaValue?.mimeType ? (
								<MediaStateChip>{mediaValue.mimeType}</MediaStateChip>
							) : null}
						</div>
					</div>
					<input
						value={resolvePhotonMediaUrl(rawValue)}
						onChange={(event) =>
							updateFieldValue(
								blockId,
								path,
								updatePhotonMediaUrl(
									store.getState().getFieldValue(blockId, path),
									event.currentTarget.value,
								),
							)
						}
						placeholder="https://..."
						className={clsx("mb-3", builderInputClassName)}
					/>
					{altPath ? (
						<input
							value={alt}
							onChange={(event) =>
								updateFieldValue(blockId, altPath, event.currentTarget.value)
							}
							placeholder="Alt text"
							className={clsx("mb-3", builderInputClassName)}
						/>
					) : null}
					<div className="flex flex-wrap items-center gap-2">
						<label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cyan-300/16 bg-cyan-300/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100">
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
								onChange={handleFileChange}
								disabled={isUploading}
							/>
						</label>
						{source ? (
							<button
								type="button"
								onClick={(event) => {
									event.stopPropagation();
									updateFieldValue(blockId, path, "");
								}}
								className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-white"
							>
								Clear
							</button>
						) : null}
						{mediaValue?.fileName ? (
							<div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
								{mediaValue.fileName}
							</div>
						) : null}
						{formatMediaFileSize(mediaValue?.size) ? (
							<MediaStateChip>
								{formatMediaFileSize(mediaValue?.size) ?? ""}
							</MediaStateChip>
						) : null}
					</div>
				</div>
			) : null}
		</div>
	);
};
