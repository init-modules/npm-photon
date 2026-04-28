import type { ComponentType } from "react";
import type { PhotonSiteFrameExtensionContext } from "../../types";
import type { PhotonCascadable } from "../override-resolution";

/**
 * Categorical placement of a slot. Distinct from cascade `scope` (the
 * merge-priority axis from override-resolution.ts). Placement answers
 * "where in the host UI this slot lives"; scope answers "whose override
 * wins on this property".
 *
 * Open registry: kits may declare slots with any of these placements,
 * and additional placements can be added by extending the union later
 * without breaking existing call sites.
 */
export type PhotonSlotPlacement =
	| "site-frame"
	| "page"
	| "block"
	| "dashboard";

/**
 * Declared extension point. Created via {@link definePhotonSlot}. Slots
 * are collected at app composition time and used to validate that every
 * registered contribution targets a known slot.
 *
 * `TContext` is a phantom type marker — the host passes the real context
 * at render time. Used at compile time to enforce that a contribution
 * registered to slot `X` ships a component matching `X`'s context shape.
 */
export type PhotonSlot<TContext = unknown> = {
	readonly id: string;
	readonly placement: PhotonSlotPlacement;
	readonly description?: string;
	/** Phantom only — never read at runtime. */
	readonly __contextType?: TContext;
};

/**
 * Locale-keyed record. Keys are locale codes (`"ru"`, `"en"`, etc.),
 * values are the localized payload. Adding a new locale at runtime is
 * just adding a new key — no schema change needed.
 */
export type PhotonLocalizedRecord<T = string> = Record<string, T>;

/**
 * Open-shape defaults every site-frame contribution must provide.
 * Specific contributions extend this with their own fields (cart label,
 * legal-link href, etc.) declared in `configurable`.
 *
 * Fields like `enabled` and `order` are common across all contributions
 * and live here as conventional names; the index signature accepts any
 * additional package-specific fields.
 */
export type PhotonSiteFrameContributionDefaults = {
	enabled?: boolean;
	order?: number;
	label?: PhotonLocalizedRecord;
	href?: string;
	icon?: string;
	readonly [key: string]: unknown;
};

/**
 * Schema entry describing one configurable field on a contribution. The
 * inspector renders an editor of this kind for each entry; the resolver
 * uses it to gate which fields a site/draft override may legally
 * touch (fields absent from `configurable` are package-private).
 */
export type PhotonSiteFrameContributionConfigurableField = {
	kind: "toggle" | "localized-text" | "url" | "order" | "select";
	label?: string;
	options?: ReadonlyArray<{ value: string; label: string }>;
};

export type PhotonSiteFrameContributionConfigurable = Readonly<
	Record<string, PhotonSiteFrameContributionConfigurableField>
>;

/**
 * Runtime context passed to a contribution's component and to its
 * `isAvailable` predicate. Mirrors PhotonSiteFrameExtensionContext for
 * migration parity with the legacy createPhotonSiteFrameExtension API.
 */
export type PhotonSiteFrameContributionContext =
	PhotonSiteFrameExtensionContext;

/**
 * A capability registered by a package into one slot. The package owns:
 * id (namespaced as `<package>.<feature>`), defaults, configurable
 * schema, isAvailable predicate, render component. The host owns:
 * composition, override resolution, ordering, draft/publish lifecycle.
 *
 * `packageName` participates in the cascade resolver — it acts as the
 * deterministic alphabetical tie-break when two equal-scope, equal-priority
 * overrides land on the same field from different packages.
 */
export type PhotonSiteFrameContribution<
	TDefaults extends
		PhotonSiteFrameContributionDefaults = PhotonSiteFrameContributionDefaults,
> = {
	readonly id: string;
	readonly packageName: string;
	readonly slot: PhotonSlot;
	readonly defaults: TDefaults;
	readonly configurable?: PhotonSiteFrameContributionConfigurable;
	readonly isAvailable?: (
		context: PhotonSiteFrameContributionContext,
	) => boolean;
	readonly component: ComponentType<
		PhotonSiteFrameContributionRenderProps<TDefaults>
	>;
};

/**
 * Type-erased base for registries and resolvers. Specific call sites
 * declaring contributions use the generic `PhotonSiteFrameContribution<TDefaults>`
 * for inference on `defaults` and `component`; the registry treats all
 * contributions uniformly through this alias to side-step generic
 * invariance in collection types.
 */
// biome-ignore lint/suspicious/noExplicitAny: explicit any is needed to
// bridge invariant TDefaults across the registry boundary.
export type PhotonAnySiteFrameContribution = PhotonSiteFrameContribution<any>;

/**
 * Props passed to a contribution's render component. The resolved props
 * are the merge of `defaults` plus any winning overrides; the host adds
 * the contribution id (for keyed rendering) and the runtime context.
 */
export type PhotonSiteFrameContributionRenderProps<
	TDefaults extends
		PhotonSiteFrameContributionDefaults = PhotonSiteFrameContributionDefaults,
> = TDefaults & {
	readonly contributionId: string;
	readonly context: PhotonSiteFrameContributionContext;
};

/**
 * Per-profile override of a contribution. Cascadable: participates in
 * the generic resolver from override-resolution.ts. `scope` denotes WHO
 * owns this override (typically `"site"` for site-owner, `"workspace-draft"`
 * for unpublished editor changes; `"package-default"` is never persisted —
 * it's synthesized by the resolver from `contribution.defaults`).
 *
 * Only fields declared in the contribution's `configurable` are honored
 * during resolve; other fields are accepted for forward compatibility
 * (so old clients don't crash on a future override-shape) but ignored.
 */
export type PhotonContributionOverride = PhotonCascadable & {
	readonly contributionId: string;
	readonly enabled?: boolean;
	readonly order?: number;
	readonly label?: PhotonLocalizedRecord;
	readonly href?: string;
	readonly [key: string]: unknown;
};
