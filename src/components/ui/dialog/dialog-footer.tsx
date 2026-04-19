"use client";

import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../helpers/cn";

export const DialogFooter = ({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) => {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
				className,
			)}
			{...props}
		/>
	);
};
