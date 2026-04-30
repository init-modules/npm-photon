export type PhotonSaveState =
	| { kind: "hydrating" }
	| { kind: "idle" }
	| { kind: "saving" }
	| { kind: "saved" }
	| { kind: "error"; message: string };

export type PhotonSaveAction =
	| { type: "HYDRATE_DONE" }
	| { type: "START_SAVE" }
	| { type: "SAVE_SUCCESS" }
	| { type: "SAVE_FAILURE"; message: string }
	| { type: "RESET" };

export const photonInitialSaveState: PhotonSaveState = { kind: "hydrating" };

export const photonSaveReducer = (
	state: PhotonSaveState,
	action: PhotonSaveAction,
): PhotonSaveState => {
	switch (action.type) {
		case "HYDRATE_DONE":
			if (state.kind !== "hydrating") {
				return state;
			}
			return { kind: "idle" };
		case "START_SAVE":
			if (state.kind === "saving" || state.kind === "hydrating") {
				return state;
			}
			return { kind: "saving" };
		case "SAVE_SUCCESS":
			if (state.kind !== "saving") {
				return state;
			}
			return { kind: "saved" };
		case "SAVE_FAILURE":
			if (state.kind !== "saving") {
				return state;
			}
			return { kind: "error", message: action.message };
		case "RESET":
			if (state.kind === "hydrating" || state.kind === "idle") {
				return state;
			}
			return { kind: "idle" };
		default: {
			const _exhaustive: never = action;
			return state;
		}
	}
};

export type PhotonExternalSaveState = "idle" | "saving" | "saved" | "error";

export const toExternalSaveState = (
	state: PhotonSaveState,
): PhotonExternalSaveState => {
	switch (state.kind) {
		case "saving":
			return "saving";
		case "saved":
			return "saved";
		case "error":
			return "error";
		default:
			return "idle";
	}
};
