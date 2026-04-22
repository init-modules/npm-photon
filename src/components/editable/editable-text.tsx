"use client";

import type {
	ChangeEvent,
	ElementType,
	FocusEvent,
	HTMLAttributes,
	KeyboardEvent,
	MouseEvent,
} from "react";
import { useEffect, useRef, useState } from "react";
import {
	usePhotonCanEdit,
	usePhotonFieldValue,
	usePhotonStore,
} from "../../context/photon-context";
import { PHOTON_EMPTY_TEXT } from "../../helpers/path";
import { buildPhotonSearchTargetId } from "../../search/helpers";
import { editableFrameClassName } from "./shared";

type EditableTextProps = HTMLAttributes<HTMLElement> & {
	blockId: string;
	path: string;
	as?: ElementType;
	placeholder?: string;
};

export const EditableText = ({
	blockId,
	path,
	as: Tag = "span",
	className,
	placeholder = PHOTON_EMPTY_TEXT,
	...rest
}: EditableTextProps) => {
	const selectedField = usePhotonStore((state) => state.selectedField);
	const selectField = usePhotonStore((state) => state.selectField);
	const clearSelectedField = usePhotonStore(
		(state) => state.clearSelectedField,
	);
	const updateFieldValue = usePhotonStore(
		(state) => state.updateFieldValue,
	);
	const inputRef = useRef<HTMLInputElement>(null);
	const value = String(usePhotonFieldValue(blockId, path) ?? "");
	const fallbackValue =
		value ||
		(placeholder !== PHOTON_EMPTY_TEXT ? String(placeholder) : "");
	const [draftValue, setDraftValue] = useState(fallbackValue);
	const isEditable = usePhotonCanEdit();
	const isActive =
		selectedField?.blockId === blockId && selectedField.path === path;
	const searchTargetId = buildPhotonSearchTargetId(blockId, path);
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const nextValue = event.currentTarget.value;
		setDraftValue(nextValue);
		updateFieldValue(blockId, path, nextValue);
	};
	const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
		if (event.currentTarget.contains(event.relatedTarget)) {
			return;
		}

		clearSelectedField();
	};
	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
			const input = inputRef.current;
			if (!input) {
				return;
			}

			setDraftValue(fallbackValue);
			input.focus();
			const caretPosition = fallbackValue.length;
			input.setSelectionRange(caretPosition, caretPosition);
		}
	}, [fallbackValue, isActive, isEditable]);

	if (isEditable && isActive) {
		return (
			<Tag
				{...rest}
				data-photon-search-target={searchTargetId}
				onClick={(event: MouseEvent<HTMLElement>) => event.stopPropagation()}
				className={editableFrameClassName({ isActive, isEditable, className })}
			>
				<input
					ref={inputRef}
					value={draftValue}
					placeholder={placeholder}
					onChange={handleChange}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					onKeyUp={(event) => event.stopPropagation()}
					onKeyPress={(event) => event.stopPropagation()}
					onClick={(event) => event.stopPropagation()}
					className="m-0 block w-full min-w-0 appearance-none border-0 bg-transparent p-0 font-inherit leading-inherit tracking-inherit text-inherit outline-none ring-0 shadow-none placeholder:text-white/28 focus:outline-none"
				/>
			</Tag>
		);
	}

	return (
		<Tag
			{...rest}
			data-photon-search-target={searchTargetId}
			onClick={
				isEditable
					? (event: MouseEvent<HTMLElement>) => {
							event.stopPropagation();
							selectField(blockId, path);
						}
					: rest.onClick
			}
			className={editableFrameClassName({ isActive, isEditable, className })}
		>
			{value || placeholder}
		</Tag>
	);
};
