"use client";

import type { ElementType } from "react";
import { EditableText } from "./editable-text";

type EditableRepeaterValueProps = {
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
}: EditableRepeaterValueProps) => {
	return (
		<EditableText
			blockId={blockId}
			path={path}
			placeholder={fallback}
			className={className}
			as={as}
		/>
	);
};
