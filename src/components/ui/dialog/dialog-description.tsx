"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";

export const DialogDescription = forwardRef<
	ElementRef<typeof DialogPrimitive.Description>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
	return (
		<DialogPrimitive.Description
			ref={ref}
			data-slot="dialog-description"
			className={cn("text-sm leading-6", className)}
			style={{
				color: "var(--photon-builder-text-muted, rgb(255 255 255 / 0.62))",
			}}
			{...props}
		/>
	);
});

DialogDescription.displayName = DialogPrimitive.Description.displayName;
