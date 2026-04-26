"use client";

import { usePhotonStore } from "../../context/photon-context";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";
import type { PhotonBlock } from "../../types";

type BlockPreviewScenariosPickerProps = {
	block: PhotonBlock;
};

/**
 * Inspector control: switches the builder preview state of a block when
 * the block declares `previewScenarios` and/or `states`. The picked scenario
 * id is stored in `blockPreviewScenarios[block.id]` and consumed by
 * `usePhotonBlockActiveState(block.id)` to render the selected variant.
 *
 * Renders nothing when the block has no scenarios or states.
 */
export const BlockPreviewScenariosPicker = ({
	block,
}: BlockPreviewScenariosPickerProps) => {
	const { translate } = usePhotonI18n();
	const definition = usePhotonStore((state) =>
		state.registry.getDefinition(block.module, block.type),
	);
	const previewScenarios = definition?.previewScenarios ?? [];
	const states = definition?.states ?? [];
	const previewScenarioId = usePhotonStore(
		(state) => state.blockPreviewScenarios[block.id] ?? null,
	);
	const setBlockPreviewScenario = usePhotonStore(
		(state) => state.setBlockPreviewScenario,
	);

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
		<section
			className="rounded-[24px] border px-4 py-4"
			style={{
				borderColor: "var(--photon-builder-border)",
				background: "var(--photon-builder-panel-muted)",
			}}
			data-testid="photon-block-preview-scenarios-picker"
		>
			<div
				className="text-[11px] uppercase tracking-[0.28em]"
				style={{ color: "var(--photon-builder-text-soft)" }}
			>
				{translate("photon.studio.blockPreviewScenarios.title", "Preview state")}
			</div>
			<div className="mt-3 flex flex-wrap gap-2">
				<button
					type="button"
					onClick={() => setBlockPreviewScenario(block.id, null)}
					className="rounded-full border px-3 py-1 text-xs"
					style={{
						borderColor: previewScenarioId
							? "var(--photon-builder-border)"
							: "var(--photon-builder-border-strong)",
						background: previewScenarioId
							? "var(--photon-builder-field)"
							: "var(--photon-builder-accent-strong)",
						color: previewScenarioId
							? "var(--photon-builder-text-soft)"
							: "var(--photon-builder-accent)",
					}}
					data-testid={`photon-block-preview-scenarios-picker-auto-${block.id}`}
				>
					{translate("photon.studio.blockPreviewScenarios.auto", "Auto")}
				</button>
				{items.map((item) => {
					const isActive = previewScenarioId === item.id;
					return (
						<button
							key={`${item.group}:${item.id}`}
							type="button"
							onClick={() => setBlockPreviewScenario(block.id, item.id)}
							className="rounded-full border px-3 py-1 text-xs"
							style={{
								borderColor: isActive
									? "var(--photon-builder-border-strong)"
									: "var(--photon-builder-border)",
								background: isActive
									? "var(--photon-builder-accent-strong)"
									: "var(--photon-builder-field)",
								color: isActive
									? "var(--photon-builder-accent)"
									: "var(--photon-builder-text-soft)",
							}}
							data-testid={`photon-block-preview-scenarios-picker-item-${block.id}-${item.id}`}
						>
							{item.label}
							{item.group === "state" ? (
								<span
									className="ml-1 text-[9px] uppercase tracking-wider opacity-60"
									aria-hidden="true"
								>
									·{translate("photon.studio.blockPreviewScenarios.stateBadge", "state")}
								</span>
							) : null}
						</button>
					);
				})}
			</div>
		</section>
	);
};
