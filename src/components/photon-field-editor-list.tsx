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

const fieldEditorTestId = (subjectId: string, path: string) =>
	`photon-field-editor-${subjectId}-${path}`
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

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
				<div
					key={field.path}
					data-testid={fieldEditorTestId(subjectId, field.path)}
				>
					<FieldEditor
						field={field}
						blockId={subjectId}
						value={getValue(field.path)}
						onFocus={() => onFocus(field.path)}
						onChange={(value) => onChange(field.path, value)}
					/>
				</div>
			))}
		</div>
	);
};
