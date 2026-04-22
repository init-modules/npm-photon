"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../../../helpers/cn";
import { DialogOverlay } from "./dialog-overlay";

export const DialogContent = forwardRef<
	ElementRef<typeof DialogPrimitive.Content>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, ...props }, ref) => {
	const builderThemeRoot =
		typeof document === "undefined"
			? null
			: document.querySelector<HTMLElement>(
					'[data-testid="wb-builder-theme-root"]',
				);
	const publicThemeRoot =
		typeof document === "undefined"
			? null
			: document.querySelector<HTMLElement>(
					'[data-testid="wb-public-runtime"]',
				);

	return (
		<DialogPrimitive.Portal
			container={builderThemeRoot ?? publicThemeRoot ?? undefined}
		>
			<DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				data-slot="dialog-content"
				data-testid="wb-dialog-content"
				className={cn(
					"fixed left-1/2 top-1/2 z-50 grid w-[min(32rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 gap-5 rounded-[1.75rem] border border-[color:var(--wb-builder-border-strong)] bg-[linear-gradient(180deg,var(--wb-builder-panel-solid),var(--wb-builder-panel))] p-6 text-[color:var(--wb-builder-text)] shadow-[var(--wb-builder-shadow)] backdrop-blur-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					className,
				)}
				{...props}
			/>
		</DialogPrimitive.Portal>
	);
});

DialogContent.displayName = DialogPrimitive.Content.displayName;
