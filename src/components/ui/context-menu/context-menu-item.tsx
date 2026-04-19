"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";

type ContextMenuItemProps = ComponentPropsWithoutRef<
	typeof ContextMenuPrimitive.Item
> & {
	inset?: boolean;
};

export const ContextMenuItem = forwardRef<
	ElementRef<typeof ContextMenuPrimitive.Item>,
	ContextMenuItemProps
>(({ className, inset, ...props }, ref) => {
	return (
		<ContextMenuPrimitive.Item
			ref={ref}
			data-slot="context-menu-item"
			className={cn(
				"relative flex cursor-pointer select-none items-center rounded-[1rem] px-3 py-2.5 text-sm font-semibold text-[var(--wb-builder-text-muted)] outline-none transition-colors duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[highlighted]:bg-[var(--wb-builder-accent-strong)] data-[highlighted]:text-[var(--wb-builder-text)]",
				inset && "pl-9",
				className,
			)}
			{...props}
		/>
	);
});

ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;
