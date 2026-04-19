"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";
import { SelectScrollDownButton } from "./select-scroll-down-button";
import { SelectScrollUpButton } from "./select-scroll-up-button";

export const SelectContent = forwardRef<
	ElementRef<typeof SelectPrimitive.Content>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				ref={ref}
				data-slot="select-content"
				position={position}
				sideOffset={8}
				collisionPadding={{ top: 24, right: 16, bottom: 24, left: 16 }}
				className={cn(
					"relative z-50 max-h-[min(24rem,var(--radix-select-content-available-height))] min-w-[12rem] overflow-hidden rounded-[1.35rem] border border-white/12 bg-[linear-gradient(180deg,rgba(8,16,30,0.98),rgba(4,10,20,0.99))] p-1.5 text-white shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl duration-200 origin-[--radix-select-content-transform-origin] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					position === "popper" &&
						"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
					className,
				)}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					data-slot="select-viewport"
					className={cn(
						"space-y-1 p-0.5",
						position === "popper" &&
							"w-full min-w-[var(--radix-select-trigger-width)]",
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
});

SelectContent.displayName = SelectPrimitive.Content.displayName;
