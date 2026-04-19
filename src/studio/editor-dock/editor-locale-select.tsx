"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

type EditorLocaleSelectProps = {
	label: string;
	value: string;
	options: Array<{ code: string; label: string }>;
	onChange?: (locale: string) => void;
};

export const EditorLocaleSelect = ({
	label,
	value,
	options,
	onChange,
}: EditorLocaleSelectProps) => {
	const [hasMounted, setHasMounted] = useState(false);
	const activeOption =
		options.find((option) => option.code === value) ?? options[0] ?? null;

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (options.length <= 1 || !activeOption || typeof onChange !== "function") {
		return null;
	}

	const trigger = (
		<button
			type="button"
			aria-label={label}
			className="inline-flex h-11 min-w-[10.25rem] cursor-pointer items-center justify-between gap-3 rounded-full border px-4 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,box-shadow,color] duration-200 ease-out outline-none border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] text-[color:var(--wb-builder-text)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-field)] focus-visible:border-[color:var(--wb-builder-border-strong)] focus-visible:bg-[color:var(--wb-builder-accent-strong)]"
		>
			<span className="flex min-w-0 items-center gap-2.5">
				<span className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--wb-builder-text-soft)]">
					{label}
				</span>
				<span className="truncate uppercase">{activeOption.label}</span>
			</span>
			<ChevronDown className="h-4 w-4 shrink-0 text-[color:var(--wb-builder-text-soft)] transition-transform duration-200 ease-out" />
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
					value={value}
					onValueChange={(nextLocale) => onChange(nextLocale)}
				>
					{options.map((option) => (
						<DropdownMenuRadioItem key={option.code} value={option.code}>
							<span className="flex items-center gap-2.5">
								<span className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--wb-builder-text-soft)]">
									{label}
								</span>
								<span className="uppercase">{option.label}</span>
							</span>
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
