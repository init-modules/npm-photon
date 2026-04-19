"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";

export const DropdownMenuRadioItem = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => {
	return (
		<DropdownMenuPrimitive.RadioItem
			ref={ref}
			data-slot="dropdown-menu-radio-item"
			className={cn(
				"relative flex cursor-pointer select-none items-center justify-between gap-3 rounded-[1rem] py-2.5 pl-3 pr-9 text-sm font-semibold outline-none transition-colors duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[highlighted]:bg-[var(--wb-builder-accent-strong)] data-[highlighted]:text-[var(--wb-builder-text)]",
				className,
			)}
			style={{
				color: "var(--wb-builder-text-muted)",
			}}
			{...props}
		>
			{children}
			<span className="absolute right-3 inline-flex h-4 w-4 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<Check
						className="h-4 w-4"
						style={{ color: "var(--wb-builder-accent)" }}
					/>
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
		</DropdownMenuPrimitive.RadioItem>
	);
});

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
