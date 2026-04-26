"use client";

import { usePhotonStore } from "../../context/photon-context";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";
import type { PhotonBlock } from "../../types";

type CanvasBlockStateOverlayProps = {
	block: PhotonBlock;
};

/**
 * Compact chip strip rendered above a selected block in builder canvas
 * when the block declares `previewScenarios` or `states`. Mirrors the
 * trigger-overlay pattern (chip = clickable scenario), letting the
 * builder author preview the block in different runtime states without
 * leaving the canvas. Writes to `blockPreviewScenarios[block.id]` which
 * `usePhotonBlockActiveState(block.id)` reads.
 *
 * Renders nothing when the block has no declared scenarios/states —
 * keeps the canvas clean for blocks that don't use the state model.
 */
export const CanvasBlockStateOverlay = ({
	block,
}: CanvasBlockStateOverlayProps) => {
	const { translate } = usePhotonI18n();
	const definition = usePhotonStore((state) =>
		state.registry.getDefinition(block.module, block.type),
	);
	const previewScenarioId = usePhotonStore(
		(state) => state.blockPreviewScenarios[block.id] ?? null,
	);
	const setBlockPreviewScenario = usePhotonStore(
		(state) => state.setBlockPreviewScenario,
	);

	const previewScenarios = definition?.previewScenarios ?? [];
	const states = definition?.states ?? [];

	if (previewScenarios.length === 0 && states.length === 0) {
		return null;
	}

	const items: Array<{ id: string; label: string; group: "scenario" | "state" }> = [
		...previewScenarios.map((s) => ({
			id: s.id,
			label: translate(s.labelKey ?? "", s.label),
			group: "scenario" as const,
		})),
		...states.map((s) => ({
			id: s.id,
			label: s.label,
			group: "state" as const,
		})),
	];

	return (
		<div
			className="pointer-events-none absolute -top-9 left-0 right-0 z-10 flex flex-wrap items-center gap-1 px-1"
			data-testid={`photon-canvas-block-state-overlay-${block.id}`}
		>
			<span
				className="pointer-events-none rounded-full px-2 py-0.5 text-[9px] uppercase tracking-[0.18em]"
				style={{
					background: "var(--photon-builder-panel-solid)",
					color: "var(--photon-builder-text-soft)",
					border: "1px solid var(--photon-builder-border)",
				}}
			>
				{translate("photon.studio.canvasBlockState.label", "State")}
			</span>
			<button
				type="button"
				onClick={() => setBlockPreviewScenario(block.id, null)}
				className="pointer-events-auto rounded-full border px-2 py-0.5 text-[10px]"
				style={{
					borderColor: previewScenarioId
						? "var(--photon-builder-border)"
						: "var(--photon-builder-border-strong)",
					background: previewScenarioId
						? "var(--photon-builder-panel-solid)"
						: "var(--photon-builder-accent-strong)",
					color: previewScenarioId
						? "var(--photon-builder-text-soft)"
						: "var(--photon-builder-accent)",
				}}
				data-testid={`photon-canvas-block-state-overlay-auto-${block.id}`}
			>
				{translate("photon.studio.canvasBlockState.auto", "Auto")}
			</button>
			{items.map((item) => {
				const isActive = previewScenarioId === item.id;
				return (
					<button
						key={`${item.group}:${item.id}`}
						type="button"
						onClick={() => setBlockPreviewScenario(block.id, item.id)}
						className="pointer-events-auto rounded-full border px-2 py-0.5 text-[10px]"
						style={{
							borderColor: isActive
								? "var(--photon-builder-border-strong)"
								: "var(--photon-builder-border)",
							background: isActive
								? "var(--photon-builder-accent-strong)"
								: "var(--photon-builder-panel-solid)",
							color: isActive
								? "var(--photon-builder-accent)"
								: "var(--photon-builder-text-soft)",
						}}
						data-testid={`photon-canvas-block-state-overlay-item-${block.id}-${item.id}`}
					>
						{item.label}
					</button>
				);
			})}
		</div>
	);
};
