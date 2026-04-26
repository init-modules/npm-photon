"use client";

import clsx from "clsx";
import {
	usePhotonCanEdit,
	usePhotonFieldValue,
	usePhotonStore,
} from "../../context/photon-context";
import { PHOTON_EMPTY_TEXT } from "../../helpers/path";
import { buildPhotonSearchTargetId } from "../../search/helpers";
import {
	renderPhotonRichTextHtml,
	PhotonRichTextEditor,
	photonRichTextContentClassName,
} from "../rich-text-editor";
import {
	createActivationProps,
	editableFrameClassName,
	useResolvedFieldValue,
} from "./shared";

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
	placeholder = PHOTON_EMPTY_TEXT,
}: EditableRichTextProps) => {
	const selectedField = usePhotonStore((state) => state.selectedField);
	const selectField = usePhotonStore((state) => state.selectField);
	const clearSelectedField = usePhotonStore(
		(state) => state.clearSelectedField,
	);
	const updateFieldValue = usePhotonStore(
		(state) => state.updateFieldValue,
	);
	const value = String(usePhotonFieldValue(blockId, path) ?? "");
	const resolvedValue = useResolvedFieldValue(value);
	const isEditable = usePhotonCanEdit();
	const isActive =
		selectedField?.blockId === blockId && selectedField.path === path;
	const searchTargetId = buildPhotonSearchTargetId(blockId, path);

	if (isEditable && isActive) {
		return (
			<div
				data-photon-search-target={searchTargetId}
				className={editableFrameClassName({ isActive, isEditable })}
			>
				<PhotonRichTextEditor
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
			data-photon-search-target={searchTargetId}
			className={editableFrameClassName({ isActive, isEditable })}
		>
			<div
				className={clsx(
					photonRichTextContentClassName,
					className,
					!value && "text-[color:var(--photon-site-muted)] opacity-60",
				)}
				dangerouslySetInnerHTML={{
					__html: renderPhotonRichTextHtml(resolvedValue, placeholder),
				}}
			/>
		</div>
	);
};
