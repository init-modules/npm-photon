"use client";

import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import {
	usePhotonCanEdit,
	usePhotonFieldValue,
	usePhotonStore,
} from "../../context/photon-context";
import { PHOTON_EMPTY_TEXT } from "../../helpers/path";
import { buildPhotonSearchTargetId } from "../../search/helpers";
import {
	createActivationProps,
	editableFrameClassName,
	useResolvedFieldValue,
} from "./shared";

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
	placeholder = PHOTON_EMPTY_TEXT,
}: EditableTextareaProps) => {
	const selectedField = usePhotonStore((state) => state.selectedField);
	const selectField = usePhotonStore((state) => state.selectField);
	const clearSelectedField = usePhotonStore(
		(state) => state.clearSelectedField,
	);
	const updateFieldValue = usePhotonStore(
		(state) => state.updateFieldValue,
	);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const value = String(usePhotonFieldValue(blockId, path) ?? "");
	const resolvedValue = useResolvedFieldValue(value);
	const fallbackValue =
		value ||
		(placeholder !== PHOTON_EMPTY_TEXT ? String(placeholder) : "");
	const [draftValue, setDraftValue] = useState(fallbackValue);
	const isEditable = usePhotonCanEdit();
	const isActive =
		selectedField?.blockId === blockId && selectedField.path === path;
	const searchTargetId = buildPhotonSearchTargetId(blockId, path);
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
				data-photon-search-target={searchTargetId}
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
			data-photon-search-target={searchTargetId}
			className={editableFrameClassName({ isActive, isEditable, className })}
		>
			{resolvedValue || value || (isEditable ? placeholder : "")}
		</div>
	);
};
