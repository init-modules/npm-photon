"use client";

import { ChevronDown, Eye, PanelsTopLeft, PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import type { PhotonMode } from "../../types";

const MODE_OPTIONS: Array<{
	label: string;
	value: PhotonMode;
	icon: typeof Eye;
}> = [
	{ label: "Preview", value: "preview", icon: Eye },
	{ label: "Content", value: "content", icon: PenLine },
	{ label: "Builder", value: "builder", icon: PanelsTopLeft },
];

type EditorModeSelectProps = {
	value: PhotonMode;
	onChange: (mode: PhotonMode) => void;
};

export const EditorModeSelect = ({
	value,
	onChange,
}: EditorModeSelectProps) => {
	const activeValue =
		MODE_OPTIONS.find((option) => option.value === value)?.value ?? "preview";
	const [optimisticValue, setOptimisticValue] =
		useState<PhotonMode>(activeValue);
	const activeOption =
		MODE_OPTIONS.find((option) => option.value === optimisticValue) ??
		MODE_OPTIONS[0];
	const ActiveIcon = activeOption.icon;
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	useEffect(() => {
		setOptimisticValue(activeValue);
	}, [activeValue]);

	const trigger = (
		<button
			type="button"
			aria-label="Editing mode"
			className="inline-flex h-11 min-w-[10.25rem] cursor-pointer items-center justify-between gap-3 rounded-full border px-4 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,box-shadow,color] duration-200 ease-out outline-none border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] text-[color:var(--photon-builder-text)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)] focus-visible:border-[color:var(--photon-builder-border-strong)] focus-visible:bg-[color:var(--photon-builder-accent-strong)]"
		>
			<span className="flex min-w-0 items-center gap-2.5">
				<ActiveIcon className="h-4 w-4 text-[color:var(--photon-builder-accent)]" />
				<span>{activeOption.label}</span>
			</span>
			<ChevronDown className="h-4 w-4 text-[color:var(--photon-builder-text-soft)] transition-transform duration-200 ease-out" />
		</button>
	);

	if (!hasMounted) {
		return trigger;
	}

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuRadioGroup
					value={optimisticValue}
					onValueChange={(nextMode) => {
						const resolvedMode = nextMode as PhotonMode;
						setOptimisticValue(resolvedMode);
						onChange(resolvedMode);
					}}
				>
					{MODE_OPTIONS.map((option) => {
						const OptionIcon = option.icon;

						return (
							<DropdownMenuRadioItem key={option.value} value={option.value}>
								<span className="flex items-center gap-2.5">
									<OptionIcon className="h-4 w-4 text-[color:var(--photon-builder-accent)]" />
									<span>{option.label}</span>
								</span>
							</DropdownMenuRadioItem>
						);
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
