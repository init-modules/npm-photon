// src/helpers/studio-url-state.ts
var isPhotonMode = (value) => value === "preview" || value === "content" || value === "builder";
var normalizePhotonStudioSurfaceMode = (value) => {
  if (value === "canvas" || value === "settings" || value === "interactions" || value === "data") {
    return value;
  }
  if (value === "surfaces") {
    return "interactions";
  }
  return void 0;
};
var normalizePaletteTab = (value) => value === "blocks" || value === "library" ? value : void 0;
var normalizeInteractionTab = (value) => value === "actions" || value === "policies" || value === "guards" || value === "surfaces" || value === "toasts" ? value : void 0;
var readValue = (params, key) => {
  const value = params.get(key);
  return value && value.trim() !== "" ? value : void 0;
};
var parsePhotonStudioUrlState = (search) => {
  const params = typeof search === "string" ? new URLSearchParams(search) : search;
  const mode = params.get("mode");
  return {
    ...isPhotonMode(mode) ? { mode } : {},
    ...normalizePhotonStudioSurfaceMode(params.get("builderSurface")) ? {
      builderSurface: normalizePhotonStudioSurfaceMode(
        params.get("builderSurface")
      )
    } : {},
    ...readValue(params, "surface") ? { surface: readValue(params, "surface") } : {},
    ...readValue(params, "toast") ? { toast: readValue(params, "toast") } : {},
    ...normalizeInteractionTab(params.get("interactionTab")) ? {
      interactionTab: normalizeInteractionTab(
        params.get("interactionTab")
      )
    } : {},
    ...readValue(params, "action") ? { action: readValue(params, "action") } : {},
    ...readValue(params, "guard") ? { guard: readValue(params, "guard") } : {},
    ...readValue(params, "policy") ? { policy: readValue(params, "policy") } : {},
    ...readValue(params, "scenario") ? { scenario: readValue(params, "scenario") } : {},
    ...readValue(params, "block") ? { block: readValue(params, "block") } : {},
    ...readValue(params, "trigger") ? { trigger: readValue(params, "trigger") } : {},
    ...readValue(params, "canvasTrigger") ? { canvasTrigger: readValue(params, "canvasTrigger") } : {},
    ...normalizePaletteTab(params.get("paletteTab")) ? { paletteTab: normalizePaletteTab(params.get("paletteTab")) } : {},
    ...readValue(params, "library") ? { library: readValue(params, "library") } : {},
    ...readValue(params, "dataField") ? { dataField: readValue(params, "dataField") } : {}
  };
};
var writePhotonStudioUrlState = (params, state) => {
  const next = new URLSearchParams(params);
  const write = (key, queryKey = key) => {
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
var mergePhotonStudioUrlState = (search, state) => writePhotonStudioUrlState(new URLSearchParams(search), state);

export {
  normalizePhotonStudioSurfaceMode,
  parsePhotonStudioUrlState,
  writePhotonStudioUrlState,
  mergePhotonStudioUrlState
};
