"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";

export const ContextMenuContent = forwardRef<
	ElementRef<typeof ContextMenuPrimitive.Content>,
	ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => {
	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.Content
				ref={ref}
				data-slot="context-menu-content"
				collisionPadding={{ top: 24, right: 16, bottom: 24, left: 16 }}
				className={cn(
					"relative z-50 min-w-[13rem] overflow-hidden rounded-[1.35rem] border p-1.5 shadow-[var(--wb-builder-panel-shadow)] backdrop-blur-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className,
				)}
				style={{
					borderColor: "var(--wb-builder-border)",
					background:
						"linear-gradient(180deg, var(--wb-builder-panel-solid), var(--wb-builder-panel))",
					color: "var(--wb-builder-text)",
				}}
				{...props}
			/>
		</ContextMenuPrimitive.Portal>
	);
});

ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;
