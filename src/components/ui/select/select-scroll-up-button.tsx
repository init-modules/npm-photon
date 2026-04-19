"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronUp } from "lucide-react";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";

export const SelectScrollUpButton = forwardRef<
	ElementRef<typeof SelectPrimitive.ScrollUpButton>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => {
	return (
		<SelectPrimitive.ScrollUpButton
			ref={ref}
			data-slot="select-scroll-up-button"
			className={cn(
				"flex cursor-pointer items-center justify-center px-2 py-1 text-white/55",
				className,
			)}
			{...props}
		>
			<ChevronUp className="h-4 w-4" />
		</SelectPrimitive.ScrollUpButton>
	);
});

SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
