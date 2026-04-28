"use client";

import { useMemo } from "react";
import { usePhotonStore } from "../../context/photon-public-context";
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
 * Convenience hook that pulls registry, overrides, and the
 * site-frame extension context out of the public PhotonProvider and
 * resolves a slot. Handy in marketplace kit blocks (and any block that
 * already runs inside PhotonProvider) so consumers don't have to wire
 * registry+overrides+context manually.
 *
 * If the surrounding PhotonProvider was created without
 * `siteFrameContributionRegistry`, this returns `[]` — kit blocks can
 * safely call it unconditionally and render the resolved list.
 *
 * The site-frame `contributionOverrides` are read from
 * `siteSettings.contributionOverrides`. The PhotonProvider also accepts
 * a top-level `contributionOverrides` prop which, when present, takes
 * precedence (used by the editor's draft preview path).
 */
export const usePhotonResolvedSlot = (
	slot: PhotonSlot,
): readonly PhotonResolvedContribution[] => {
	const registry = usePhotonStore((s) => s.siteFrameContributionRegistry);
	const overridesProp = usePhotonStore((s) => s.contributionOverrides);
	const document = usePhotonStore((s) => s.document);
	const resources = usePhotonStore((s) => s.resources);
	const pageSettings = usePhotonStore((s) => s.pageSettings);
	const site = usePhotonStore((s) => s.site);
	const mode = usePhotonStore((s) => s.mode);
	const isAdmin = usePhotonStore((s) => s.isAdmin);

	const settingsOverrides = (
		site.settings as {
			contributionOverrides?: readonly PhotonContributionOverride[];
		}
	).contributionOverrides;

	const overrides: readonly PhotonContributionOverride[] | undefined =
		overridesProp ?? settingsOverrides;

	const context = useMemo<PhotonSiteFrameContributionContext>(
		() => ({
			document,
			resources,
			pageSettings,
			site,
			mode,
			isAdmin,
			currentRoute: document.route,
		}),
		[document, resources, pageSettings, site, mode, isAdmin],
	);

	return useMemo(
		() => {
			if (!registry) return [];
			const entries = resolvePhotonSlot(slot.id, registry, overrides, context);
			// Bake context into each entry's resolved props so consumers can
			// `<Component {...r} />` without manually passing context. This
			// matches the `PhotonSiteFrameContributionRenderProps` contract
			// (which mandates `context` on the rendered props).
			return entries.map((entry) => ({
				...entry,
				resolved: { ...entry.resolved, context },
			}));
		},
		[registry, slot.id, overrides, context],
	);
};
