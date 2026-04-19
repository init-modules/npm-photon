"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";

export const DialogTitle = forwardRef<
	ElementRef<typeof DialogPrimitive.Title>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
	return (
		<DialogPrimitive.Title
			ref={ref}
			data-slot="dialog-title"
			className={cn("text-xl font-semibold tracking-[-0.03em]", className)}
			style={{ color: "var(--wb-builder-text, rgb(255 255 255))" }}
			{...props}
		/>
	);
});

DialogTitle.displayName = DialogPrimitive.Title.displayName;
