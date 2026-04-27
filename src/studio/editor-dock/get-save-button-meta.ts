import type { PhotonMode } from "../../types";

type SaveState = "idle" | "saving" | "saved" | "error";

type SaveButtonMeta = {
	label: string;
	className: string;
	dotClassName: string;
};

type GetSaveButtonMetaParams = {
	activeMode: PhotonMode;
	hasUnsavedChanges: boolean;
	saveState: SaveState;
};

export const getSaveButtonMeta = ({
	hasUnsavedChanges,
	saveState,
}: GetSaveButtonMetaParams): SaveButtonMeta => {
	if (saveState === "error") {
		return {
			label: "Save failed",
			className:
				"border-[color:var(--photon-builder-border-strong)] bg-[color:color-mix(in_srgb,var(--photon-builder-accent)_18%,var(--photon-builder-panel-solid))] text-[color:var(--photon-builder-text)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:color-mix(in_srgb,var(--photon-builder-accent)_24%,var(--photon-builder-panel-solid))] hover:text-[color:var(--photon-builder-text)]",
			dotClassName: "bg-[color:var(--photon-builder-accent)]",
		};
	}

	if (saveState === "saving") {
		return {
			label: "Saving",
			className:
				"border-[color:var(--photon-builder-border-strong)] bg-[color:var(--photon-builder-accent-strong)] text-[color:var(--photon-builder-accent)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-accent-soft)] hover:text-[color:var(--photon-builder-accent-text)]",
			dotClassName: "bg-[color:var(--photon-builder-accent)]",
		};
	}

	if (hasUnsavedChanges) {
		return {
			label: "Draft pending",
			className:
				"border-[color:var(--photon-builder-border-strong)] bg-[color:color-mix(in_srgb,var(--photon-builder-accent)_14%,var(--photon-builder-panel-solid))] text-[color:var(--photon-builder-accent-text)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-accent-soft)] hover:text-[color:var(--photon-builder-accent-text)]",
			dotClassName: "bg-[color:var(--photon-builder-accent)]",
		};
	}

	return {
		label: "Saved",
		className:
			"border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] text-[color:var(--photon-builder-text-muted)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)] hover:text-[color:var(--photon-builder-text)]",
		dotClassName: "bg-[color:var(--photon-builder-text-soft)]",
	};
};
