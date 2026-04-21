"use client";

import type { ElementType } from "react";
import { EditableText } from "./public-editable-text";

type PublicEditableRepeaterValueProps = {
	blockId: string;
	path: string;
	fallback?: string;
	className?: string;
	as?: ElementType;
};

export const EditableRepeaterValue = ({
	blockId,
	path,
	fallback,
	className,
	as,
}: PublicEditableRepeaterValueProps) => (
	<EditableText
		blockId={blockId}
		path={path}
		placeholder={fallback}
		className={className}
		as={as}
	/>
);
