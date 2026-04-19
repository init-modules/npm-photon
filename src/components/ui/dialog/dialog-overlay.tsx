"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";

export const DialogOverlay = forwardRef<
	ElementRef<typeof DialogPrimitive.Overlay>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
	return (
		<DialogPrimitive.Overlay
			ref={ref}
			data-slot="dialog-overlay"
			className={cn(
				"fixed inset-0 z-50 bg-slate-950/72 backdrop-blur-sm duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
				className,
			)}
			{...props}
		/>
	);
});

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
