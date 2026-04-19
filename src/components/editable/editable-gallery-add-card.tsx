"use client";

type EditableGalleryAddCardProps = {
	isUploading: boolean;
	onUpload: (files: FileList | null) => void | Promise<void>;
	className?: string;
	titleClassName?: string;
	bodyClassName?: string;
	buttonClassName?: string;
};

export const EditableGalleryAddCard = ({
	isUploading,
	onUpload,
	className,
	titleClassName,
	bodyClassName,
	buttonClassName,
}: EditableGalleryAddCardProps) => {
	return (
		<label
			data-testid="wb-editable-gallery-add-card"
			className={`flex min-h-[18rem] cursor-pointer flex-col items-center justify-center gap-3 rounded-[34px] border border-dashed px-6 py-8 text-center transition ${className ?? ""}`}
			style={{
				borderColor:
					"var(--wb-gallery-add-border, rgba(34,211,238,0.18))",
				background:
					"var(--wb-gallery-add-bg, radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_52%),linear-gradient(180deg,rgba(8,18,31,0.84),rgba(6,13,24,0.94)))",
				color: "var(--wb-gallery-add-text, rgba(255,255,255,0.55))",
			}}
		>
			<div
				className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${buttonClassName ?? ""}`}
				style={{
					borderColor:
						"var(--wb-gallery-add-button-border, rgba(34,211,238,0.18))",
					background:
						"var(--wb-gallery-add-button-bg, rgba(34,211,238,0.1))",
					color: "var(--wb-gallery-add-button-text, rgb(207 250 254))",
				}}
			>
				{isUploading ? "Uploading..." : "Add media"}
			</div>
			<div
				className={`text-base font-semibold ${titleClassName ?? ""}`}
				style={{ color: "var(--wb-gallery-add-title, rgba(255,255,255,0.84))" }}
			>
				Expand the gallery without leaving the page
			</div>
			<div
				className={`max-w-sm text-sm leading-7 ${bodyClassName ?? ""}`}
				style={{ color: "var(--wb-gallery-add-body, rgba(255,255,255,0.48))" }}
			>
				New uploads land here immediately, then autosave can finalize them on
				the backend.
			</div>
			<input
				type="file"
				accept="image/*"
				multiple
				className="hidden"
				onChange={(event) => void onUpload(event.currentTarget.files)}
				disabled={isUploading}
			/>
		</label>
	);
};
