"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";

export const SelectScrollDownButton = forwardRef<
	ElementRef<typeof SelectPrimitive.ScrollDownButton>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => {
	return (
		<SelectPrimitive.ScrollDownButton
			ref={ref}
			data-slot="select-scroll-down-button"
			className={cn(
				"flex cursor-pointer items-center justify-center px-2 py-1 text-white/55",
				className,
			)}
			{...props}
		>
			<ChevronDown className="h-4 w-4" />
		</SelectPrimitive.ScrollDownButton>
	);
});

SelectScrollDownButton.displayName =
	SelectPrimitive.ScrollDownButton.displayName;
