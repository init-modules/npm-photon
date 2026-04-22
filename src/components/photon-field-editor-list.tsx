"use client";

import { FieldEditor } from "../studio/inspector-panel/field-editor";
import type { PhotonField } from "../types";

type PhotonFieldEditorListProps = {
	fields: PhotonField[];
	subjectId: string;
	getValue: (path: string) => unknown;
	onChange: (path: string, value: unknown) => void;
	onFocus: (path: string) => void;
};

export const PhotonFieldEditorList = ({
	fields,
	subjectId,
	getValue,
	onChange,
	onFocus,
}: PhotonFieldEditorListProps) => {
	return (
		<div className="space-y-4">
			{fields.map((field) => (
				<FieldEditor
					key={field.path}
					field={field}
					blockId={subjectId}
					value={getValue(field.path)}
					onFocus={() => onFocus(field.path)}
					onChange={(value) => onChange(field.path, value)}
				/>
			))}
		</div>
	);
};
