"use client";

import { ChevronRight, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { PhotonLocaleDescriptor } from "../types";
import {
	buildPhotonLocaleSwitcherViewModel,
	readPhotonRecentLocaleCodes,
	recordPhotonRecentLocaleUsage,
} from "./locale-switcher-view-model";

export interface PhotonMobileLocaleSwitcherProps {
	locales: readonly PhotonLocaleDescriptor[];
	value: string;
	onChange: (code: string) => void;
	/** Search threshold (default 8 per §9.1). */
	searchThreshold?: number;
	/** Max recent codes (default 3 per §9.3). */
	maxRecents?: number;
	/** Optional translator for static labels. */
	translate?: (key: string, fallback: string) => string;
	/** Optional className passthrough for the root element. */
	className?: string;
}

const headerLabelStyle: React.CSSProperties = {
	color: "var(--photon-builder-text-soft)",
};

const itemRowStyle: React.CSSProperties = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-panel-muted)",
	color: "var(--photon-builder-text)",
};

const activeRowStyle: React.CSSProperties = {
	borderColor: "var(--photon-builder-border-strong)",
	background: "var(--photon-builder-accent-soft)",
	color: "var(--photon-builder-accent-text)",
};

const inputStyle: React.CSSProperties = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-field)",
	color: "var(--photon-builder-text)",
};

/**
 * Mobile-friendly content-locale switcher built on top of
 * `buildPhotonLocaleSwitcherViewModel`. Designed for vertical lists with
 * touch targets, alphabetical ordering (no region grouping per §9.2), a
 * search input that appears at `searchThreshold` (default 8), and a
 * "Recently used" section sourced from localStorage via
 * `readPhotonRecentLocaleCodes`.
 *
 * Selecting a locale invokes `onChange(code)` and records the choice via
 * `recordPhotonRecentLocaleUsage`. Status pills (draft) appear inline.
 */
export const PhotonMobileLocaleSwitcher = ({
	locales,
	value,
	onChange,
	searchThreshold = 8,
	maxRecents = 3,
	translate,
	className,
}: PhotonMobileLocaleSwitcherProps) => {
	const [query, setQuery] = useState("");
	const [recentCodes, setRecentCodes] = useState<readonly string[]>([]);

	useEffect(() => {
		setRecentCodes(readPhotonRecentLocaleCodes(maxRecents));
	}, [maxRecents]);

	const viewModel = useMemo(
		() =>
			buildPhotonLocaleSwitcherViewModel({
				locales,
				recentCodes,
				searchQuery: query,
				searchThreshold,
				maxRecents,
			}),
		[locales, recentCodes, query, searchThreshold, maxRecents],
	);

	const handleSelect = (code: string) => {
		onChange(code);
		const next = recordPhotonRecentLocaleUsage(code, maxRecents);
		setRecentCodes(next);
	};

	const t = (key: string, fallback: string) =>
		translate ? translate(key, fallback) : fallback;

	const renderItem = (locale: PhotonLocaleDescriptor) => {
		const isActive = locale.code === value;
		return (
			<button
				key={locale.code}
				type="button"
				onClick={() => handleSelect(locale.code)}
				aria-current={isActive ? "true" : undefined}
				className="flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition"
				style={isActive ? activeRowStyle : itemRowStyle}
			>
				<span className="flex min-w-0 items-center gap-2.5">
					<span className="truncate">{locale.label}</span>
					<span
						className="text-[10px] uppercase tracking-[0.22em]"
						style={{ color: "var(--photon-builder-text-ghost)" }}
					>
						{locale.code}
					</span>
					{locale.status === "draft" ? (
						<span
							className="rounded-full border px-1.5 py-px text-[9px] font-semibold uppercase tracking-[0.2em]"
							style={{
								borderColor: "var(--photon-builder-border)",
								color: "var(--photon-builder-text-ghost)",
							}}
						>
							{t("photon.locale.draft.badge", "draft")}
						</span>
					) : null}
				</span>
				<ChevronRight
					className="h-4 w-4 shrink-0"
					style={{ color: "var(--photon-builder-text-ghost)" }}
				/>
			</button>
		);
	};

	return (
		<div className={className ?? "flex flex-col gap-3"}>
			{viewModel.showSearch ? (
				<label className="relative flex items-center">
					<Search
						className="pointer-events-none absolute left-3 h-4 w-4"
						style={{ color: "var(--photon-builder-text-ghost)" }}
					/>
					<input
						type="search"
						value={query}
						onChange={(event) => setQuery(event.currentTarget.value)}
						placeholder={t(
							"photon.locale.search.placeholder",
							"Search locales",
						)}
						className="w-full rounded-2xl border py-3 pl-9 pr-3 text-sm outline-none"
						style={inputStyle}
					/>
				</label>
			) : null}
			{viewModel.recents.length > 0 && !query ? (
				<section className="flex flex-col gap-2">
					<div
						className="px-1 text-[10px] uppercase tracking-[0.22em]"
						style={headerLabelStyle}
					>
						{t("photon.locale.recents.label", "Recently used")}
					</div>
					{viewModel.recents.map((locale) => renderItem(locale))}
				</section>
			) : null}
			<section className="flex flex-col gap-2">
				<div
					className="px-1 text-[10px] uppercase tracking-[0.22em]"
					style={headerLabelStyle}
				>
					{viewModel.recents.length > 0 && !query
						? t("photon.locale.all.label", "All locales")
						: t("photon.locale.list.label", "Locales")}
				</div>
				{viewModel.results.length === 0 ? (
					<div
						className="rounded-2xl border px-4 py-3 text-sm"
						style={itemRowStyle}
					>
						{t(
							"photon.locale.search.empty",
							"No locales match your search.",
						)}
					</div>
				) : (
					viewModel.results.map((locale) => renderItem(locale))
				)}
			</section>
		</div>
	);
};
