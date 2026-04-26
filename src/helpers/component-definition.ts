import type {
	PhotonActionStateDefinition,
	PhotonAnyBlockDefinition,
	PhotonField,
	PhotonInteractionPreviewScenario,
	PhotonInteractionSurfaceDefinition,
	PhotonInteractionSurfaceInstance,
} from "../types";

/**
 * Unified component shape — bridges `PhotonBlockDefinition` (inline)
 * and `PhotonInteractionSurfaceDefinition` (portal-mounted) for
 * generic builder UX (instance pickers, state switchers, field
 * editing). Backed by adapter functions so existing block/surface
 * types remain the source of truth.
 *
 * Long-term goal per 7.md: Block and Surface converge into one
 * `PhotonComponentDefinition` that simply differs by `kind`. This
 * adapter is the bridge until that refactor.
 */
export type PhotonComponentDefinition = {
	id: string;
	label: string;
	labelKey?: string;
	description?: string;
	descriptionKey?: string;
	/**
	 * Mounting strategy:
	 * - `inline`: rendered inside the document tree at a fixed position (block)
	 * - `dialog` / `panel` / `toast`: portal-mounted overlay activated globally (surface)
	 */
	kind: "inline" | "dialog" | "panel" | "toast";
	package?: string;
	fields?: PhotonField[];
	previewScenarios?: PhotonInteractionPreviewScenario[];
	states?: PhotonActionStateDefinition[];
	/**
	 * Reusable site-owned configured copies of this component. For inline
	 * blocks this is currently `undefined` (each block in the document is
	 * its own placement). For surfaces this maps `defaultInstances`.
	 */
	instances?: PhotonComponentInstance[];
	/**
	 * Reference to the originating definition for runtime fall-through.
	 * Generic helpers use the unified shape; concrete renderers still
	 * dispatch on `kind` and call the original block/surface APIs.
	 */
	source: PhotonComponentDefinitionSource;
};

export type PhotonComponentInstance = {
	id: string;
	label: string;
	labelKey?: string;
	enabled?: boolean;
	props?: Record<string, unknown>;
};

export type PhotonComponentDefinitionSource =
	| { kind: "block"; definition: PhotonAnyBlockDefinition }
	| { kind: "surface"; definition: PhotonInteractionSurfaceDefinition };

const surfaceInstanceToComponentInstance = (
	instance: PhotonInteractionSurfaceInstance,
): PhotonComponentInstance => ({
	id: instance.id,
	label: instance.label,
	labelKey: instance.labelKey,
	enabled: instance.enabled,
	props: instance.props,
});

/**
 * Adapt a block definition into the unified shape. Inline blocks have
 * no native instance system — the unified `instances` field stays
 * undefined. `kind` is fixed to `"inline"`.
 */
export const blockDefinitionAsPhotonComponentDefinition = (
	definition: PhotonAnyBlockDefinition,
): PhotonComponentDefinition => ({
	id: definition.type,
	label: definition.label,
	labelKey: definition.labelKey,
	description: definition.description,
	descriptionKey: definition.descriptionKey,
	kind: "inline",
	package: definition.package,
	fields: definition.fields,
	previewScenarios: definition.previewScenarios,
	states: definition.states,
	source: { kind: "block", definition },
});

/**
 * Adapt a surface definition into the unified shape. `kind` carries
 * over from the surface (`dialog` / `panel` / `toast`). `instances`
 * maps from `defaultInstances`.
 */
export const surfaceDefinitionAsPhotonComponentDefinition = (
	definition: PhotonInteractionSurfaceDefinition,
): PhotonComponentDefinition => ({
	id: definition.id,
	label: definition.label,
	labelKey: definition.labelKey,
	description: definition.description,
	descriptionKey: definition.descriptionKey,
	kind: definition.kind,
	fields: definition.fields,
	instances: definition.defaultInstances?.map(
		surfaceInstanceToComponentInstance,
	),
	source: { kind: "surface", definition },
});

/**
 * Convenience overload — accepts either a block or a surface and
 * returns the unified shape. Generic helpers can write code against
 * `PhotonComponentDefinition` once and consume from either source.
 */
export const asPhotonComponentDefinition = (
	definition: PhotonAnyBlockDefinition | PhotonInteractionSurfaceDefinition,
): PhotonComponentDefinition => {
	if ("component" in definition) {
		return blockDefinitionAsPhotonComponentDefinition(
			definition as PhotonAnyBlockDefinition,
		);
	}
	return surfaceDefinitionAsPhotonComponentDefinition(
		definition as PhotonInteractionSurfaceDefinition,
	);
};

/**
 * Generic helper: returns an instance label, falling back to the
 * component label when no per-instance label is defined. Useful for
 * inspector pickers and chain rows that show "instance: label".
 */
export const getPhotonComponentInstanceLabel = (
	component: PhotonComponentDefinition,
	instanceId: string | undefined,
): string => {
	if (!instanceId) {
		return component.label;
	}
	const instance = component.instances?.find((i) => i.id === instanceId);
	return instance?.label ?? component.label;
};

/**
 * Generic helper: collects all preview scenarios + states into a
 * uniform `{ id, label, kind: "scenario" | "state" }` list. Used by
 * canvas state-switcher and inspector picker UIs that need to render
 * both options regardless of source.
 */
export type PhotonComponentSwitchableOption = {
	id: string;
	label: string;
	labelKey?: string;
	kind: "scenario" | "state";
};

export const collectPhotonComponentSwitchableOptions = (
	component: PhotonComponentDefinition,
): PhotonComponentSwitchableOption[] => [
	...(component.previewScenarios ?? []).map((scenario) => ({
		id: scenario.id,
		label: scenario.label,
		labelKey: scenario.labelKey,
		kind: "scenario" as const,
	})),
	...(component.states ?? []).map((state) => ({
		id: state.id,
		label: state.label,
		kind: "state" as const,
	})),
];
