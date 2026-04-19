"use client";

import type {
	ChangeEvent,
	ElementType,
	FocusEvent,
	HTMLAttributes,
	KeyboardEvent,
	MouseEvent,
} from "react";
import { useEffect, useRef } from "react";
import {
	useWebsiteBuilderCanEdit,
	useWebsiteBuilderFieldValue,
	useWebsiteBuilderStore,
} from "../../context/website-builder-context";
import { WEBSITE_BUILDER_EMPTY_TEXT } from "../../helpers/path";
import { buildWebsiteBuilderSearchTargetId } from "../../search/helpers";
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
	placeholder = WEBSITE_BUILDER_EMPTY_TEXT,
	...rest
}: EditableTextProps) => {
	const selectedField = useWebsiteBuilderStore((state) => state.selectedField);
	const selectField = useWebsiteBuilderStore((state) => state.selectField);
	const clearSelectedField = useWebsiteBuilderStore(
		(state) => state.clearSelectedField,
	);
	const updateFieldValue = useWebsiteBuilderStore(
		(state) => state.updateFieldValue,
	);
	const inputRef = useRef<HTMLInputElement>(null);
	const value = String(useWebsiteBuilderFieldValue(blockId, path) ?? "");
	const isEditable = useWebsiteBuilderCanEdit();
	const isActive =
		selectedField?.blockId === blockId && selectedField.path === path;
	const searchTargetId = buildWebsiteBuilderSearchTargetId(blockId, path);
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		updateFieldValue(blockId, path, event.currentTarget.value);
	};
	const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
		if (event.currentTarget.contains(event.relatedTarget)) {
			return;
		}

		clearSelectedField();
	};
	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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

			input.focus();
			const caretPosition = input.value.length;
			input.setSelectionRange(caretPosition, caretPosition);
		}
	}, [isActive, isEditable]);

	if (isEditable && isActive) {
		return (
			<Tag
				{...rest}
				data-wb-search-target={searchTargetId}
				onClick={(event: MouseEvent<HTMLElement>) => event.stopPropagation()}
				className={editableFrameClassName({ isActive, isEditable, className })}
			>
				<input
					ref={inputRef}
					value={value}
					placeholder={placeholder}
					onChange={handleChange}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					onClick={(event) => event.stopPropagation()}
					className="m-0 block w-full min-w-0 appearance-none border-0 bg-transparent p-0 font-inherit leading-inherit tracking-inherit text-inherit outline-none ring-0 shadow-none placeholder:text-white/28 focus:outline-none"
				/>
			</Tag>
		);
	}

	return (
		<Tag
			{...rest}
			data-wb-search-target={searchTargetId}
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
