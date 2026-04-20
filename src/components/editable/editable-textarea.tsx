"use client";

import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import {
	useWebsiteBuilderCanEdit,
	useWebsiteBuilderFieldValue,
	useWebsiteBuilderStore,
} from "../../context/website-builder-context";
import { WEBSITE_BUILDER_EMPTY_TEXT } from "../../helpers/path";
import { buildWebsiteBuilderSearchTargetId } from "../../search/helpers";
import { createActivationProps, editableFrameClassName } from "./shared";

type EditableTextareaProps = {
	blockId: string;
	path: string;
	className?: string;
	placeholder?: string;
};

export const EditableTextarea = ({
	blockId,
	path,
	className,
	placeholder = WEBSITE_BUILDER_EMPTY_TEXT,
}: EditableTextareaProps) => {
	const selectedField = useWebsiteBuilderStore((state) => state.selectedField);
	const selectField = useWebsiteBuilderStore((state) => state.selectField);
	const clearSelectedField = useWebsiteBuilderStore(
		(state) => state.clearSelectedField,
	);
	const updateFieldValue = useWebsiteBuilderStore(
		(state) => state.updateFieldValue,
	);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const value = String(useWebsiteBuilderFieldValue(blockId, path) ?? "");
	const fallbackValue =
		value ||
		(placeholder !== WEBSITE_BUILDER_EMPTY_TEXT ? String(placeholder) : "");
	const [draftValue, setDraftValue] = useState(fallbackValue);
	const isEditable = useWebsiteBuilderCanEdit();
	const isActive =
		selectedField?.blockId === blockId && selectedField.path === path;
	const searchTargetId = buildWebsiteBuilderSearchTargetId(blockId, path);
	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const nextValue = event.currentTarget.value;
		setDraftValue(nextValue);
		updateFieldValue(blockId, path, nextValue);
	};
	const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
		if (event.currentTarget.contains(event.relatedTarget)) {
			return;
		}

		clearSelectedField();
	};
	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		event.stopPropagation();

		if (event.key !== "Escape") {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
		clearSelectedField();
		event.currentTarget.blur();
	};

	useEffect(() => {
		if (isEditable && isActive) {
			const textarea = textareaRef.current;
			if (!textarea) {
				return;
			}

			setDraftValue(fallbackValue);
			textarea.focus();
			const caretPosition = fallbackValue.length;
			textarea.setSelectionRange(caretPosition, caretPosition);
		}
	}, [fallbackValue, isActive, isEditable]);

	if (isEditable && isActive) {
		return (
			<div
				data-wb-search-target={searchTargetId}
				className={editableFrameClassName({ isActive, isEditable, className })}
			>
				<textarea
					ref={textareaRef}
					rows={5}
					value={draftValue}
					placeholder={placeholder}
					onChange={handleChange}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					onKeyUp={(event) => event.stopPropagation()}
					onKeyPress={(event) => event.stopPropagation()}
					onClick={(event) => event.stopPropagation()}
					className="block w-full resize-y border-0 bg-transparent p-0 font-inherit leading-inherit tracking-inherit text-inherit outline-none ring-0 shadow-none placeholder:text-white/28 focus:outline-none"
				/>
			</div>
		);
	}

	return (
		<div
			{...createActivationProps(isEditable, () => selectField(blockId, path))}
			data-wb-search-target={searchTargetId}
			className={editableFrameClassName({ isActive, isEditable, className })}
		>
			{value || placeholder}
		</div>
	);
};
