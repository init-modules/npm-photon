"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";

export const ContextMenuSeparator = forwardRef<
	ElementRef<typeof ContextMenuPrimitive.Separator>,
	ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
	return (
		<ContextMenuPrimitive.Separator
			ref={ref}
			data-slot="context-menu-separator"
			className={cn("my-1.5 h-px bg-[var(--wb-builder-border)]", className)}
			{...props}
		/>
	);
});

ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;
