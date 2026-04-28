import {
	type PhotonCascadable,
	sortPhotonCascade,
} from "../override-resolution";
import type { PhotonSiteFrameContributionRegistry } from "./registry";
import type {
	PhotonAnySiteFrameContribution,
	PhotonContributionOverride,
	PhotonSiteFrameContributionConfigurable,
	PhotonSiteFrameContributionContext,
} from "./types";

/**
 * One winner of slot resolution: the contribution itself (for component
 * + isAvailable + configurable schema) plus the merged cascadable
 * payload (defaults + winning overrides).
 */
export type PhotonResolvedContribution = {
	readonly contribution: PhotonAnySiteFrameContribution;
	readonly resolved: PhotonContributionOverride;
};

const normalizeOrder = (value: unknown): number =>
	typeof value === "number" && Number.isFinite(value) ? value : 0;

const PROTECTED_OVERRIDE_KEYS = new Set([
	"contributionId",
	"scope",
	"priority",
	"packageName",
]);

/**
 * Strip override fields that are not declared in the contribution's
 * `configurable` schema. Implements the forward-compat rule: fields
 * removed from `configurable` between releases remain as harmless
 * leftovers in DB but are ignored by the resolver.
 *
 * Cascade-metadata fields (`scope`, `priority`, `packageName`,
 * `contributionId`) always pass through.
 */
const filterOverrideByConfigurable = (
	override: PhotonContributionOverride,
	configurable: PhotonSiteFrameContributionConfigurable | undefined,
): PhotonContributionOverride => {
	const filtered: Record<string, unknown> = {};
	const allowedKeys = configurable ? Object.keys(configurable) : [];
	const allowed = new Set(allowedKeys);
	for (const [key, value] of Object.entries(override)) {
		if (PROTECTED_OVERRIDE_KEYS.has(key) || allowed.has(key)) {
			filtered[key] = value;
		}
	}
	return filtered as PhotonContributionOverride;
};

/**
 * Resolve one site-frame slot to its render-ready contribution list.
 *
 * Algorithm:
 * 1. Load contributions registered to `slotId`. Empty slot ⇒ empty result.
 * 2. Group profile overrides by `contributionId`, dropping orphans
 *    (override referring to an unregistered contribution) and
 *    cross-slot overrides (override targeting a contribution in a
 *    different slot).
 * 3. For each contribution:
 *    a. Synthesize a `package-default` cascadable from `contribution.defaults`.
 *    b. Filter each profile override through the contribution's
 *       `configurable` schema (forward-compat).
 *    c. Sort all layers by cascade scope (lowest first), apply each
 *       on top of the accumulator. Highest-priority layer wins per
 *       field; missing fields fall through to lower layers.
 *    d. If merged `enabled` is explicitly `false`, drop the
 *       contribution.
 *    e. If `contribution.isAvailable(context)` returns `false`, drop.
 * 4. Sort surviving contributions by merged `order` ascending; ties
 *    preserve insertion order (stable sort in V8).
 *
 * Pure function: no React, no I/O. Suitable for SSR and tests.
 */
export const resolvePhotonSlot = (
	slotId: string,
	registry: PhotonSiteFrameContributionRegistry,
	overrides: readonly PhotonContributionOverride[] | undefined,
	context: PhotonSiteFrameContributionContext,
): readonly PhotonResolvedContribution[] => {
	const contributions = registry.bySlot(slotId);
	if (contributions.length === 0) {
		return [];
	}

	const overridesByContribution = new Map<
		string,
		PhotonContributionOverride[]
	>();
	for (const override of overrides ?? []) {
		const contribution = registry.get(override.contributionId);
		if (!contribution || contribution.slot.id !== slotId) {
			continue;
		}
		const bucket = overridesByContribution.get(override.contributionId);
		if (bucket) {
			bucket.push(override);
		} else {
			overridesByContribution.set(override.contributionId, [override]);
		}
	}

	const resolved: PhotonResolvedContribution[] = [];

	for (const contribution of contributions) {
		const packageDefaultLayer: PhotonContributionOverride = {
			...contribution.defaults,
			contributionId: contribution.id,
			scope: "package-default",
			packageName: contribution.packageName,
		};

		const filteredOverrides = (
			overridesByContribution.get(contribution.id) ?? []
		).map((o) => filterOverrideByConfigurable(o, contribution.configurable));

		// sortPhotonCascade returns winner-first (descending priority).
		// For merge we apply lowest-priority layer first, highest last —
		// so highest priority wins on field conflict — hence reverse.
		const winnerFirst = sortPhotonCascade<PhotonCascadable>([
			packageDefaultLayer,
			...filteredOverrides,
		]);
		const lowestFirst = [...winnerFirst].reverse();

		const merged: Record<string, unknown> = {};
		for (const layer of lowestFirst) {
			Object.assign(merged, layer);
		}

		if (merged.enabled === false) {
			continue;
		}

		if (
			contribution.isAvailable &&
			contribution.isAvailable(context) === false
		) {
			continue;
		}

		resolved.push({
			contribution,
			resolved: merged as PhotonContributionOverride,
		});
	}

	resolved.sort(
		(a, b) =>
			normalizeOrder(a.resolved.order) - normalizeOrder(b.resolved.order),
	);

	return resolved;
};
