"use client";

import type { WebsiteBuilderField } from "../types";
import { FieldEditor } from "../studio/inspector-panel/field-editor";

type WebsiteBuilderFieldEditorListProps = {
	fields: WebsiteBuilderField[];
	subjectId: string;
	getValue: (path: string) => unknown;
	onChange: (path: string, value: unknown) => void;
	onFocus: (path: string) => void;
};

export const WebsiteBuilderFieldEditorList = ({
	fields,
	subjectId,
	getValue,
	onChange,
	onFocus,
}: WebsiteBuilderFieldEditorListProps) => {
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
