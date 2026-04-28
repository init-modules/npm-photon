"use client";

import { useCallback, useMemo } from "react";
import { usePhotonStore } from "../../context/photon-context";
import type {
	PhotonAnySiteFrameContribution,
	PhotonContributionOverride,
} from "../../helpers/contributions";
import type { PhotonField, PhotonNestedField } from "../../types";

export type PhotonContributionListFieldEditorProps = {
	field: PhotonField | PhotonNestedField;
	value: readonly PhotonContributionOverride[] | undefined;
	onChange: (next: readonly PhotonContributionOverride[]) => void;
};

const normalizeOrder = (value: unknown): number =>
	typeof value === "number" && Number.isFinite(value) ? value : 0;

const pickLabelEn = (
	label: unknown,
	fallback: string,
): string => {
	if (typeof label !== "object" || label === null) return fallback;
	const map = label as Record<string, string>;
	return map.en ?? map.ru ?? Object.values(map)[0] ?? fallback;
};

/**
 * Inspector field renderer for the `contribution-list` field kind.
 * Reads the contribution registry from photon context, lists each
 * contribution registered into `field.slotId`, and exposes:
 *
 * - **Toggle** for `enabled` (writes a `workspace-draft` override).
 * - **Up/down arrows** for `order` (writes integer order overrides
 *   to all swap-affected contributions in one batch).
 * - **Reset** button per-contribution that drops the entire
 *   `workspace-draft` override entry, returning the contribution to
 *   its package defaults (or the next-lower scope override).
 * - **Orphan section** at the bottom listing override entries whose
 *   `contributionId` is no longer in the registry (because the package
 *   was removed/renamed). Each has a "Forget" button that drops the
 *   override.
 *
 * Phase C.2 scope (this version): toggle / order / reset / orphans.
 * Phase C.3 will add expand-to-edit localized labels and full DnD
 * reorder; for now linear up/down covers the common case.
 */
export const PhotonContributionListFieldEditor = ({
	field,
	value,
	onChange,
}: PhotonContributionListFieldEditorProps) => {
	const registry = usePhotonStore(
		(state) => state.siteFrameContributionRegistry,
	);

	const slotId = field.slotId;

	const contributions: readonly PhotonAnySiteFrameContribution[] = useMemo(() => {
		if (!registry || !slotId) return [];
		return registry.bySlot(slotId);
	}, [registry, slotId]);

	const overridesByContribution = useMemo(() => {
		const map = new Map<string, PhotonContributionOverride>();
		for (const override of value ?? []) {
			map.set(override.contributionId, override);
		}
		return map;
	}, [value]);

	/**
	 * Sort the slot's contributions by their effective `order`
	 * (override-first, default-fallback). Determines the displayed
	 * order in the inspector AND the up/down swap targets.
	 */
	const orderedContributions = useMemo(() => {
		const withOrder = contributions.map((c) => {
			const override = overridesByContribution.get(c.id);
			const order = normalizeOrder(
				typeof override?.order === "number"
					? override.order
					: c.defaults.order,
			);
			return { contribution: c, order };
		});
		return withOrder
			.sort((a, b) => a.order - b.order)
			.map((entry) => entry.contribution);
	}, [contributions, overridesByContribution]);

	const orphanOverrides = useMemo(() => {
		if (!registry) return [];
		return (value ?? []).filter((o) => !registry.has(o.contributionId));
	}, [registry, value]);

	const writeOverride = useCallback(
		(
			contribution: PhotonAnySiteFrameContribution,
			patch: Partial<PhotonContributionOverride>,
		) => {
			const existing = overridesByContribution.get(contribution.id);
			const others = (value ?? []).filter(
				(o) =>
					!(
						o.contributionId === contribution.id &&
						o.scope === "workspace-draft"
					),
			);
			const next: PhotonContributionOverride = {
				...(existing ?? {}),
				...patch,
				contributionId: contribution.id,
				scope: "workspace-draft",
				packageName: contribution.packageName,
			};
			onChange([...others, next]);
		},
		[overridesByContribution, value, onChange],
	);

	const setEnabled = useCallback(
		(c: PhotonAnySiteFrameContribution, enabled: boolean) =>
			writeOverride(c, { enabled }),
		[writeOverride],
	);

	const resetContribution = useCallback(
		(c: PhotonAnySiteFrameContribution) => {
			const others = (value ?? []).filter(
				(o) =>
					!(
						o.contributionId === c.id &&
						o.scope === "workspace-draft"
					),
			);
			onChange(others);
		},
		[value, onChange],
	);

	const forgetOrphan = useCallback(
		(contributionId: string) => {
			onChange((value ?? []).filter((o) => o.contributionId !== contributionId));
		},
		[value, onChange],
	);

	const swapOrder = useCallback(
		(index: number, direction: "up" | "down") => {
			const target = direction === "up" ? index - 1 : index + 1;
			if (target < 0 || target >= orderedContributions.length) return;
			const a = orderedContributions[index];
			const b = orderedContributions[target];
			if (!a || !b) return;
			const aOrder = normalizeOrder(
				overridesByContribution.get(a.id)?.order ?? a.defaults.order,
			);
			const bOrder = normalizeOrder(
				overridesByContribution.get(b.id)?.order ?? b.defaults.order,
			);
			// Swap the two orders. If they were equal, bump the second by 1
			// to make the sort deterministic.
			const newAOrder = bOrder;
			const newBOrder = aOrder === bOrder ? aOrder + 1 : aOrder;
			const others = (value ?? []).filter(
				(o) =>
					o.scope !== "workspace-draft" ||
					(o.contributionId !== a.id && o.contributionId !== b.id),
			);
			const aDraft = overridesByContribution.get(a.id);
			const bDraft = overridesByContribution.get(b.id);
			const aNext: PhotonContributionOverride = {
				...(aDraft ?? {}),
				contributionId: a.id,
				scope: "workspace-draft",
				packageName: a.packageName,
				order: newAOrder,
			};
			const bNext: PhotonContributionOverride = {
				...(bDraft ?? {}),
				contributionId: b.id,
				scope: "workspace-draft",
				packageName: b.packageName,
				order: newBOrder,
			};
			onChange([...others, aNext, bNext]);
		},
		[orderedContributions, overridesByContribution, value, onChange],
	);

	if (!slotId) {
		return (
			<div className="text-xs text-[var(--photon-builder-muted-text,#888)]">
				Field is missing slotId; nothing to render.
			</div>
		);
	}

	if (!registry) {
		return (
			<div className="text-xs text-[var(--photon-builder-muted-text,#888)]">
				Contribution registry unavailable in this context.
			</div>
		);
	}

	if (contributions.length === 0 && orphanOverrides.length === 0) {
		return (
			<div className="text-xs text-[var(--photon-builder-muted-text,#888)]">
				No contributions registered into "{slotId}".
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col gap-1">
				{orderedContributions.map((c, index) => {
					const override = overridesByContribution.get(c.id);
					const defaultEnabled = c.defaults.enabled !== false;
					const effectiveEnabled =
						typeof override?.enabled === "boolean"
							? override.enabled
							: defaultEnabled;
					const isFirst = index === 0;
					const isLast = index === orderedContributions.length - 1;
					const labelEn = pickLabelEn(c.defaults.label, c.id);
					const hasDraft = override?.scope === "workspace-draft";
					return (
						<div
							key={c.id}
							className="flex items-center justify-between gap-2 rounded-sm border border-[var(--photon-builder-border,#e5e5e5)] px-2 py-1.5 text-xs"
						>
							<span className="flex min-w-0 flex-1 flex-col">
								<span className="truncate font-medium">{labelEn}</span>
								<span className="truncate text-[10px] text-[var(--photon-builder-muted-text,#888)]">
									{c.id}
								</span>
							</span>
							<div className="flex items-center gap-1">
								<button
									type="button"
									aria-label="Move up"
									title="Move up"
									disabled={isFirst}
									onClick={() => swapOrder(index, "up")}
									className="rounded-sm border border-[var(--photon-builder-border,#e5e5e5)] px-1 py-0.5 text-[10px] disabled:opacity-30"
								>
									↑
								</button>
								<button
									type="button"
									aria-label="Move down"
									title="Move down"
									disabled={isLast}
									onClick={() => swapOrder(index, "down")}
									className="rounded-sm border border-[var(--photon-builder-border,#e5e5e5)] px-1 py-0.5 text-[10px] disabled:opacity-30"
								>
									↓
								</button>
								{hasDraft ? (
									<button
										type="button"
										aria-label="Reset to default"
										title="Reset to default"
										onClick={() => resetContribution(c)}
										className="rounded-sm border border-[var(--photon-builder-border,#e5e5e5)] px-1 py-0.5 text-[10px]"
									>
										↺
									</button>
								) : null}
								<input
									type="checkbox"
									checked={effectiveEnabled}
									onChange={(event) => setEnabled(c, event.target.checked)}
								/>
							</div>
						</div>
					);
				})}
			</div>
			{orphanOverrides.length > 0 ? (
				<div className="flex flex-col gap-1 rounded-sm border border-[var(--photon-builder-border,#e5e5e5)] bg-[var(--photon-builder-muted-bg,#f7f7f7)] p-2">
					<span className="text-[10px] uppercase tracking-wide text-[var(--photon-builder-muted-text,#888)]">
						Removed by package update
					</span>
					{orphanOverrides.map((override) => (
						<div
							key={override.contributionId}
							className="flex items-center justify-between gap-2 text-xs"
						>
							<span className="truncate text-[var(--photon-builder-muted-text,#888)]">
								{override.contributionId}
							</span>
							<button
								type="button"
								onClick={() => forgetOrphan(override.contributionId)}
								className="rounded-sm border border-[var(--photon-builder-border,#e5e5e5)] px-2 py-0.5 text-[10px]"
							>
								Forget
							</button>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};
