"use client";

import { usePhotonStore } from "../../context/photon-context";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";
import type { PhotonBlock } from "../../types";
import { PhotonInspectorSection } from "./inspector-section";

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
		<PhotonInspectorSection
			id="block-preview-scenarios"
			title={translate(
				"photon.studio.blockPreviewScenarios.title",
				"Preview state",
			)}
			defaultCollapsed={previewScenarioId === null}
			trailing={
				<span
					className="rounded-sm border px-1 font-mono text-[9px] tabular-nums"
					style={{
						borderColor: "var(--photon-builder-border)",
						color: "var(--photon-builder-text-soft)",
					}}
				>
					{items.length}
				</span>
			}
		>
			<div
				className="flex flex-wrap gap-1"
				data-testid="photon-block-preview-scenarios-picker"
			>
				<button
					type="button"
					onClick={() => setBlockPreviewScenario(block.id, null)}
					className="rounded-sm border px-1.5 py-0.5 text-[10.5px]"
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
							className="rounded-sm border px-1.5 py-0.5 text-[10.5px]"
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
									·
									{translate(
										"photon.studio.blockPreviewScenarios.stateBadge",
										"state",
									)}
								</span>
							) : null}
						</button>
					);
				})}
			</div>
		</PhotonInspectorSection>
	);
};
