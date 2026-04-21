"use client";

import clsx from "clsx";
import {
	useWebsiteBuilderCanEdit,
	useWebsiteBuilderFieldValue,
	useWebsiteBuilderStore,
} from "../../context/website-builder-context";
import { WEBSITE_BUILDER_EMPTY_TEXT } from "../../helpers/path";
import { buildWebsiteBuilderSearchTargetId } from "../../search/helpers";
import {
	renderWebsiteBuilderRichTextHtml,
	WebsiteBuilderRichTextEditor,
	websiteBuilderRichTextContentClassName,
} from "../rich-text-editor";
import { createActivationProps, editableFrameClassName } from "./shared";

type EditableRichTextProps = {
	blockId: string;
	path: string;
	className?: string;
	placeholder?: string;
};

export const EditableRichText = ({
	blockId,
	path,
	className,
	placeholder = WEBSITE_BUILDER_EMPTY_TEXT,
}: EditableRichTextProps) => {
	const selectedField = useWebsiteBuilderStore((state) => state.selectedField);
	const selectField = useWebsiteBuilderStore((state) => state.selectField);
	const clearSelectedField = useWebsiteBuilderStore(
		(state) => state.clearSelectedField,
	);
	const updateFieldValue = useWebsiteBuilderStore(
		(state) => state.updateFieldValue,
	);
	const value = String(useWebsiteBuilderFieldValue(blockId, path) ?? "");
	const isEditable = useWebsiteBuilderCanEdit();
	const isActive =
		selectedField?.blockId === blockId && selectedField.path === path;
	const searchTargetId = buildWebsiteBuilderSearchTargetId(blockId, path);

	if (isEditable && isActive) {
		return (
			<div
				data-wb-search-target={searchTargetId}
				className={editableFrameClassName({ isActive, isEditable })}
			>
				<WebsiteBuilderRichTextEditor
					value={value}
					placeholder={placeholder}
					className={className}
					onFocus={() => selectField(blockId, path)}
					onBlur={() => clearSelectedField()}
					onEscape={() => clearSelectedField()}
					onChange={(nextValue) => updateFieldValue(blockId, path, nextValue)}
				/>
			</div>
		);
	}

	return (
		<div
			{...createActivationProps(isEditable, () => selectField(blockId, path))}
			data-wb-search-target={searchTargetId}
			className={editableFrameClassName({ isActive, isEditable })}
		>
			<div
				className={clsx(
					websiteBuilderRichTextContentClassName,
					className,
					!value && "text-[color:var(--wb-site-muted)] opacity-60",
				)}
				dangerouslySetInnerHTML={{
					__html: renderWebsiteBuilderRichTextHtml(value, placeholder),
				}}
			/>
		</div>
	);
};
