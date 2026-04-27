"use client";

import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import { type ReactNode, useCallback, useState } from "react";
import { usePhotonInspectorDensity } from "./inspector-density-context";

type PhotonInspectorSectionProps = {
	/** Stable identifier — used as the testid suffix and persistence key. */
	id: string;
	/** Top-line label shown in the caret header. */
	title: ReactNode;
	/** Optional right-aligned chip in the caret header (e.g. count badge). */
	trailing?: ReactNode;
	/** Optional small text under the title. */
	subtitle?: ReactNode;
	/** Whether the section starts collapsed. Defaults to expanded. */
	defaultCollapsed?: boolean;
	/** Hide the caret entirely (always-expanded section). */
	nonCollapsible?: boolean;
	/** Section body — only mounted when expanded. */
	children: ReactNode;
};

/**
 * The compact caret-folded section primitive. Replaces the old
 * `rounded-[24px] border px-4 py-4` card style with a tight UE-style
 * header that the user can click to fold the section away. Body is
 * unmounted when collapsed so heavy sub-trees do not pay any render
 * cost.
 */
export const PhotonInspectorSection = ({
	id,
	title,
	trailing,
	subtitle,
	defaultCollapsed = false,
	nonCollapsible = false,
	children,
}: PhotonInspectorSectionProps) => {
	const { tokens } = usePhotonInspectorDensity();
	const [collapsed, setCollapsed] = useState(defaultCollapsed);
	const toggle = useCallback(() => setCollapsed((current) => !current), []);
	const isExpanded = nonCollapsible || !collapsed;

	return (
		<section
			className={tokens.sectionRadius}
			style={{
				background: "var(--photon-builder-panel-solid)",
			}}
			data-testid={`photon-inspector-section-${id}`}
			data-collapsed={!isExpanded}
		>
			<button
				type="button"
				onClick={nonCollapsible ? undefined : toggle}
				className={clsx(
					"flex w-full items-center gap-1.5 px-2 py-1.5 text-left",
					nonCollapsible ? "cursor-default" : "cursor-pointer",
				)}
				aria-expanded={isExpanded}
				data-testid={`photon-inspector-section-header-${id}`}
			>
				{nonCollapsible ? null : isExpanded ? (
					<ChevronDown
						className="h-3 w-3 shrink-0"
						style={{ color: "var(--photon-builder-text-soft)" }}
					/>
				) : (
					<ChevronRight
						className="h-3 w-3 shrink-0"
						style={{ color: "var(--photon-builder-text-soft)" }}
					/>
				)}
				<div
					className={clsx(tokens.sectionHeaderClass, "min-w-0 flex-1 truncate")}
					style={{ color: "var(--photon-builder-text-soft)" }}
				>
					{title}
				</div>
				{trailing ? (
					<div className="shrink-0">{trailing}</div>
				) : null}
			</button>
			{subtitle ? (
				<div
					className="px-2 pb-1 text-[10.5px] leading-snug"
					style={{ color: "var(--photon-builder-text-soft)" }}
				>
					{subtitle}
				</div>
			) : null}
			{isExpanded ? (
				<div className={clsx(tokens.sectionPadding, "pt-0")}>{children}</div>
			) : null}
		</section>
	);
};
