import clsx from "clsx";
import type { HTMLAttributes, KeyboardEvent, MouseEvent } from "react";

type EditableFrameProps = {
	isActive: boolean;
	isEditable: boolean;
	className?: string;
};

export const editableFrameClassName = ({
	isActive,
	isEditable,
	className,
}: EditableFrameProps) =>
	clsx(
		className,
		isEditable &&
			"rounded-[1.5rem] transition-[background-color,box-shadow,transform,border-color] duration-200",
		isEditable &&
			!isActive &&
			"cursor-text shadow-[0_0_0_1px_transparent] hover:bg-white/[0.03] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]",
		isEditable &&
			isActive &&
			"bg-cyan-300/[0.07] shadow-[0_0_0_1px_rgba(34,211,238,0.52)]",
	);

export const createActivationProps = (
	isEditable: boolean,
	activate: () => void,
): HTMLAttributes<HTMLElement> =>
	isEditable
		? {
				role: "button",
				tabIndex: 0,
				onClick: (event: MouseEvent<HTMLElement>) => {
					event.stopPropagation();
					activate();
				},
				onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
					if (event.key === "Enter" || event.key === " ") {
						event.preventDefault();
						event.stopPropagation();
						activate();
					}
				},
			}
		: {};

export const builderInputClassName =
	"w-full rounded-[24px] border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-field)] px-4 py-3 text-sm text-[color:var(--photon-builder-text)] outline-none ring-0 transition placeholder:text-[color:var(--photon-builder-text-ghost)] focus:border-[color:var(--photon-builder-border-strong)]";

export const formatMediaFileSize = (size?: number | null) => {
	if (!size || size <= 0) {
		return null;
	}

	if (size < 1024 * 1024) {
		return `${Math.round(size / 1024)} KB`;
	}

	return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};
