"use client";

import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../helpers/cn";

export const DialogHeader = ({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) => {
	return (
		<div
			data-slot="dialog-header"
			className={cn("flex flex-col gap-2 text-left", className)}
			{...props}
		/>
	);
};
