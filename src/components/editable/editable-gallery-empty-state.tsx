"use client";

type EditableGalleryEmptyStateProps = {
	emptyTitle: string;
	emptyBody: string;
	isEditable: boolean;
	isUploading: boolean;
	onUpload: (files: FileList | null) => void | Promise<void>;
	className?: string;
	titleClassName?: string;
	bodyClassName?: string;
	buttonClassName?: string;
};

export const EditableGalleryEmptyState = ({
	emptyTitle,
	emptyBody,
	isEditable,
	isUploading,
	onUpload,
	className,
	titleClassName,
	bodyClassName,
	buttonClassName,
}: EditableGalleryEmptyStateProps) => {
	return (
		<div
			data-testid="wb-editable-gallery-empty-state"
			className={`flex min-h-[18rem] flex-col items-center justify-center gap-3 rounded-[34px] border border-dashed px-6 py-8 text-center ${className ?? ""}`}
			style={{
				borderColor: "var(--wb-gallery-empty-border, rgba(255,255,255,0.12))",
				background:
					"var(--wb-gallery-empty-bg, radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_44%),linear-gradient(180deg,rgba(9,18,31,0.92),rgba(6,12,22,0.98)))",
				color: "var(--wb-gallery-empty-text, rgba(255,255,255,0.55))",
				boxShadow:
					"var(--wb-gallery-empty-shadow, 0 24px 54px rgba(0,0,0,0.2))",
			}}
		>
			<div
				className={`text-base font-semibold ${titleClassName ?? ""}`}
				style={{
					color: "var(--wb-gallery-empty-title, rgba(255,255,255,0.82))",
				}}
			>
				{emptyTitle}
			</div>
			<div
				className={`max-w-sm text-sm leading-7 ${bodyClassName ?? ""}`}
				style={{
					color: "var(--wb-gallery-empty-body, rgba(255,255,255,0.48))",
				}}
			>
				{emptyBody}
			</div>
			{isEditable ? (
				<label className="inline-flex cursor-pointer items-center rounded-full">
					<div
						className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${buttonClassName ?? ""}`}
						style={{
							borderColor:
								"var(--wb-gallery-empty-button-border, rgba(34,211,238,0.18))",
							background:
								"var(--wb-gallery-empty-button-bg, rgba(34,211,238,0.1))",
							color: "var(--wb-gallery-empty-button-text, rgb(207 250 254))",
						}}
					>
						{isUploading ? "Uploading..." : "Add media"}
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
			) : null}
		</div>
	);
};
