import { useMemo } from "react";
import type { PhotonSiteFrameContributionRegistry } from "./registry";
import {
	type PhotonResolvedContribution,
	resolvePhotonSlot,
} from "./resolve";
import type {
	PhotonContributionOverride,
	PhotonSiteFrameContributionContext,
	PhotonSlot,
} from "./types";

/**
 * Memoized React wrapper around {@link resolvePhotonSlot}. Recomputes
 * only when one of its dependencies changes by reference.
 *
 * `registry` is allowed to be undefined so the hook can be called
 * unconditionally from a consumer that doesn't yet know whether the
 * surrounding app has wired contributions into context. When undefined,
 * the hook returns an empty list. This keeps Rules-of-Hooks-clean call
 * sites while the legacy/new render paths run side-by-side during
 * Phase B migration.
 *
 * Accepts the slot object (not just an id) so TypeScript can later
 * enforce that the consumer's render context matches the slot's
 * declared TContext.
 */
export const useResolvedSlot = (
	slot: PhotonSlot,
	registry: PhotonSiteFrameContributionRegistry | undefined,
	overrides: readonly PhotonContributionOverride[] | undefined,
	context: PhotonSiteFrameContributionContext,
): readonly PhotonResolvedContribution[] => {
	return useMemo(
		() =>
			registry
				? resolvePhotonSlot(slot.id, registry, overrides, context)
				: [],
		[slot.id, registry, overrides, context],
	);
};
