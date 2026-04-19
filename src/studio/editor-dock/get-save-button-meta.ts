import type { WebsiteBuilderMode } from "../../types";

type SaveState = "idle" | "saving" | "saved" | "error";

type SaveButtonMeta = {
	label: string;
	className: string;
	dotClassName: string;
};

type GetSaveButtonMetaParams = {
	activeMode: WebsiteBuilderMode;
	autosaveEnabled: boolean;
	hasUnsavedChanges: boolean;
	saveState: SaveState;
};

export const getSaveButtonMeta = ({
	activeMode,
	autosaveEnabled,
	hasUnsavedChanges,
	saveState,
}: GetSaveButtonMetaParams): SaveButtonMeta => {
	if (saveState === "error") {
		return {
			label: "Save failed",
			className:
				"border-[color:var(--wb-builder-border-strong)] bg-[color:color-mix(in_srgb,var(--wb-builder-accent)_18%,var(--wb-builder-panel-solid))] text-[color:var(--wb-builder-text)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:color-mix(in_srgb,var(--wb-builder-accent)_24%,var(--wb-builder-panel-solid))] hover:text-[color:var(--wb-builder-text)]",
			dotClassName: "bg-[color:var(--wb-builder-accent)]",
		};
	}

	if (saveState === "saving") {
		return {
			label: "Saving",
			className:
				"border-[color:var(--wb-builder-border-strong)] bg-[color:var(--wb-builder-accent-strong)] text-[color:var(--wb-builder-accent)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-accent-soft)] hover:text-[color:var(--wb-builder-accent-text)]",
			dotClassName: "bg-[color:var(--wb-builder-accent)]",
		};
	}

	if (hasUnsavedChanges) {
		return {
			label: autosaveEnabled ? "Sync pending" : "Draft pending",
			className:
				"border-[color:var(--wb-builder-border-strong)] bg-[color:color-mix(in_srgb,var(--wb-builder-accent)_14%,var(--wb-builder-panel-solid))] text-[color:var(--wb-builder-accent-text)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-accent-soft)] hover:text-[color:var(--wb-builder-accent-text)]",
			dotClassName: "bg-[color:var(--wb-builder-accent)]",
		};
	}

	return {
		label:
			activeMode === "builder" && autosaveEnabled
				? "Builder synced"
				: autosaveEnabled
					? "Synced"
					: "Saved",
		className:
			"border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] text-[color:var(--wb-builder-text-muted)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-field)] hover:text-[color:var(--wb-builder-text)]",
		dotClassName: "bg-[color:var(--wb-builder-text-soft)]",
	};
};
