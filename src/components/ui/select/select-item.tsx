"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check } from "lucide-react";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";

export const SelectItem = forwardRef<
	ElementRef<typeof SelectPrimitive.Item>,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
	return (
		<SelectPrimitive.Item
			ref={ref}
			data-slot="select-item"
			className={cn(
				"relative flex w-full cursor-pointer select-none items-center rounded-[1rem] py-2.5 pl-9 pr-3 text-sm font-semibold text-white/82 outline-none transition-colors duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[highlighted]:bg-cyan-300/14 data-[highlighted]:text-white",
				className,
			)}
			{...props}
		>
			<span className="absolute left-3 inline-flex h-4 w-4 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<Check className="h-4 w-4 text-cyan-200" />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
});

SelectItem.displayName = SelectPrimitive.Item.displayName;
