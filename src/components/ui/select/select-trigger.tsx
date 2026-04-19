"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";

export const SelectTrigger = forwardRef<
	ElementRef<typeof SelectPrimitive.Trigger>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
	return (
		<SelectPrimitive.Trigger
			ref={ref}
			data-slot="select-trigger"
			className={cn(
				"group inline-flex h-11 min-w-[10.5rem] cursor-pointer items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 text-sm font-semibold text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,box-shadow,color] duration-200 ease-out outline-none hover:border-white/16 hover:bg-white/[0.055] focus-visible:border-cyan-300/30 focus-visible:bg-cyan-300/10 focus-visible:ring-2 focus-visible:ring-cyan-300/20 disabled:pointer-events-none disabled:opacity-50 data-[placeholder]:text-white/55 data-[state=open]:border-cyan-300/28 data-[state=open]:bg-cyan-300/10",
				className,
			)}
			{...props}
		>
			<span className="min-w-0 flex-1 truncate text-left">{children}</span>
			<SelectPrimitive.Icon asChild>
				<ChevronDown className="h-4 w-4 shrink-0 text-white/45 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180 group-data-[state=open]:text-cyan-100" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
});

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
