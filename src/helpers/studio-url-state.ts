import type {
	PhotonMode,
	PhotonStudioInteractionTab,
	PhotonStudioPaletteTab,
	PhotonStudioSurfaceMode,
	PhotonStudioUrlState,
	PhotonStudioUrlStatePatch,
} from "../types";

const isPhotonMode = (value: string | null): value is PhotonMode =>
	value === "preview" || value === "content" || value === "builder";

export const normalizePhotonStudioSurfaceMode = (
	value: string | null | undefined,
): PhotonStudioSurfaceMode | undefined => {
	if (
		value === "canvas" ||
		value === "settings" ||
		value === "interactions" ||
		value === "data"
	) {
		return value;
	}

	if (value === "surfaces") {
		return "interactions";
	}

	return undefined;
};

const normalizePaletteTab = (
	value: string | null,
): PhotonStudioPaletteTab | undefined =>
	value === "blocks" || value === "library" ? value : undefined;

const normalizeInteractionTab = (
	value: string | null,
): PhotonStudioInteractionTab | undefined =>
	value === "actions" ||
	value === "policies" ||
	value === "guards" ||
	value === "surfaces" ||
	value === "toasts"
		? value
		: undefined;

const readValue = (params: URLSearchParams, key: string) => {
	const value = params.get(key);

	return value && value.trim() !== "" ? value : undefined;
};

export const parsePhotonStudioUrlState = (
	search: string | URLSearchParams,
): PhotonStudioUrlState => {
	const params =
		typeof search === "string" ? new URLSearchParams(search) : search;
	const mode = params.get("mode");

	return {
		...(isPhotonMode(mode) ? { mode } : {}),
		...(normalizePhotonStudioSurfaceMode(params.get("builderSurface"))
			? {
					builderSurface: normalizePhotonStudioSurfaceMode(
						params.get("builderSurface"),
					),
				}
			: {}),
		...(readValue(params, "surface")
			? { surface: readValue(params, "surface") }
			: {}),
			...(readValue(params, "toast") ? { toast: readValue(params, "toast") } : {}),
			...(normalizeInteractionTab(params.get("interactionTab"))
				? {
						interactionTab: normalizeInteractionTab(
							params.get("interactionTab"),
						),
					}
				: {}),
			...(readValue(params, "action")
				? { action: readValue(params, "action") }
				: {}),
			...(readValue(params, "guard")
				? { guard: readValue(params, "guard") }
				: {}),
			...(readValue(params, "policy")
				? { policy: readValue(params, "policy") }
				: {}),
			...(readValue(params, "scenario")
				? { scenario: readValue(params, "scenario") }
				: {}),
			...(readValue(params, "block") ? { block: readValue(params, "block") } : {}),
		...(readValue(params, "trigger")
			? { trigger: readValue(params, "trigger") }
			: {}),
		...(readValue(params, "canvasTrigger")
			? { canvasTrigger: readValue(params, "canvasTrigger") }
			: {}),
		...(normalizePaletteTab(params.get("paletteTab"))
			? { paletteTab: normalizePaletteTab(params.get("paletteTab")) }
			: {}),
		...(readValue(params, "library")
			? { library: readValue(params, "library") }
			: {}),
		...(readValue(params, "dataField")
			? { dataField: readValue(params, "dataField") }
			: {}),
	};
};

export const writePhotonStudioUrlState = (
	params: URLSearchParams,
	state: PhotonStudioUrlStatePatch,
): URLSearchParams => {
	const next = new URLSearchParams(params);
	const write = (key: keyof PhotonStudioUrlState, queryKey = key) => {
		const value = state[key];

		if (typeof value === "string" && value.trim() !== "") {
			next.set(String(queryKey), value);
		} else if (value === null) {
			next.delete(String(queryKey));
		}
	};

	write("mode");
	write("builderSurface");
	write("surface");
	write("toast");
	write("interactionTab");
	write("action");
	write("guard");
	write("policy");
	write("scenario");
	write("block");
	write("trigger");
	write("canvasTrigger");
	write("paletteTab");
	write("library");
	write("dataField");

	return next;
};

export const mergePhotonStudioUrlState = (
	search: string | URLSearchParams,
	state: PhotonStudioUrlStatePatch,
) => writePhotonStudioUrlState(new URLSearchParams(search), state);
