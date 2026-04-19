"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check } from "lucide-react";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";

export const ContextMenuCheckboxItem = forwardRef<
	ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
	ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => {
	return (
		<ContextMenuPrimitive.CheckboxItem
			ref={ref}
			data-slot="context-menu-checkbox-item"
			checked={checked}
			className={cn(
				"relative flex cursor-pointer select-none items-center rounded-[1rem] py-2.5 pl-9 pr-3 text-sm font-semibold text-[var(--wb-builder-text-muted)] outline-none transition-colors duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[highlighted]:bg-[var(--wb-builder-accent-strong)] data-[highlighted]:text-[var(--wb-builder-text)]",
				className,
			)}
			{...props}
		>
			<span className="absolute left-3 inline-flex h-4 w-4 items-center justify-center">
				<ContextMenuPrimitive.ItemIndicator>
					<Check
						className="h-4 w-4"
						style={{ color: "var(--wb-builder-accent)" }}
					/>
				</ContextMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.CheckboxItem>
	);
});

ContextMenuCheckboxItem.displayName =
	ContextMenuPrimitive.CheckboxItem.displayName;
