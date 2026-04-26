import type {
	PhotonInteractionSurfaceDefinition,
	PhotonInteractionSurfaceInstance,
	PhotonSiteSettings,
} from "../types";
import { PHOTON_INTERACTIONS_SITE_SETTING_KEY } from "./interactions";

/**
 * Profile creation seed.
 *
 * Photon's long-term policy is "after a profile is created, the
 * database is the source of truth — runtime never falls back to
 * surface/block definition defaults". To honor that, profile creation
 * persists a snapshot of every surface's `defaultInstances` into
 * `site.settings.{interactionSurfaces, interactions}` so subsequent
 * resolves never need the in-code fallbacks.
 *
 * This module provides the pure helper that builds the snapshot. It
 * is consumed by:
 *  - the demo workspace runtime (in-memory profile creation),
 *  - the Laravel `CreatePhotonProfileController` (persists the seed
 *    when a profile is provisioned from the API),
 *  - any custom profile-creation flow downstream consumers wire up.
 *
 * The helper is intentionally limited to the interactions / surface
 * dimension. Block field defaults are part of the per-page document
 * (already persisted at page-level via `PhotonDocumentData`) so they
 * do not need a parallel seed channel.
 */

export type PhotonProfileSeedInput = {
	interactionSurfaces?: readonly PhotonInteractionSurfaceDefinition[];
};

export type PhotonProfileSeedSiteSettings = {
	interactionSurfaces?: {
		instances?: Record<string, PhotonInteractionSurfaceInstance>;
	};
	interactions?: {
		canvasStageOverrides?: Record<
			string,
			Record<string, Record<string, unknown>>
		>;
	};
};

/**
 * Build the persistable canvasStageOverrides snapshot for a single
 * surface instance. Each instance's `props` are flattened into a
 * single `{ default: { ...props } }` scenario layer so the very first
 * `resolvePhotonInteractionSurfaceRequest` already has a DB-backed
 * starting point and runtime can stop falling back to surface
 * definition defaults.
 */
const collectInstanceCanvasStageOverrides = (
	instance: PhotonInteractionSurfaceInstance,
): Record<string, Record<string, unknown>> | null => {
	if (!instance.props || Object.keys(instance.props).length === 0) {
		return null;
	}

	return {
		default: { ...instance.props },
	};
};

/**
 * Compute the seed payload that profile creation flows should persist
 * into `site.settings`. Returns `null` when the input does not produce
 * any settings to seed (so callers can skip the persist call entirely
 * instead of writing empty objects).
 */
export const collectPhotonProfileSeedSiteSettings = (
	input: PhotonProfileSeedInput,
): PhotonProfileSeedSiteSettings | null => {
	const surfaces = input.interactionSurfaces ?? [];

	if (surfaces.length === 0) {
		return null;
	}

	const surfaceInstances: Record<string, PhotonInteractionSurfaceInstance> =
		{};
	const canvasStageOverrides: Record<
		string,
		Record<string, Record<string, unknown>>
	> = {};

	for (const surface of surfaces) {
		const definitionInstances = surface.defaultInstances ?? [];

		for (const instance of definitionInstances) {
			surfaceInstances[instance.id] = { ...instance };

			const stageOverrides = collectInstanceCanvasStageOverrides(instance);
			if (stageOverrides) {
				canvasStageOverrides[instance.id] = stageOverrides;
			}
		}
	}

	const hasInstances = Object.keys(surfaceInstances).length > 0;
	const hasCanvasStageOverrides =
		Object.keys(canvasStageOverrides).length > 0;

	if (!hasInstances && !hasCanvasStageOverrides) {
		return null;
	}

	const result: PhotonProfileSeedSiteSettings = {};

	if (hasInstances) {
		result.interactionSurfaces = { instances: surfaceInstances };
	}

	if (hasCanvasStageOverrides) {
		result.interactions = { canvasStageOverrides };
	}

	return result;
};

/**
 * Convenience: merge the seed payload into an existing
 * `site.settings` record. Caller-provided settings win over the seed
 * (so re-seeding after a profile clone preserves user edits).
 */
export const mergePhotonProfileSeedIntoSiteSettings = (
	siteSettings: PhotonSiteSettings,
	input: PhotonProfileSeedInput,
): PhotonSiteSettings => {
	const seed = collectPhotonProfileSeedSiteSettings(input);
	if (!seed) {
		return siteSettings;
	}

	const next: Record<string, unknown> = { ...siteSettings };

	if (seed.interactionSurfaces) {
		const existing =
			(next.interactionSurfaces as
				| {
						instances?: Record<string, PhotonInteractionSurfaceInstance>;
				  }
				| undefined) ?? {};
		next.interactionSurfaces = {
			...existing,
			instances: {
				...(seed.interactionSurfaces.instances ?? {}),
				...(existing.instances ?? {}),
			},
		};
	}

	if (seed.interactions) {
		const existing =
			(next[PHOTON_INTERACTIONS_SITE_SETTING_KEY] as
				| {
						canvasStageOverrides?: Record<
							string,
							Record<string, Record<string, unknown>>
						>;
				  }
				| undefined) ?? {};
		next[PHOTON_INTERACTIONS_SITE_SETTING_KEY] = {
			...existing,
			canvasStageOverrides: {
				...(seed.interactions.canvasStageOverrides ?? {}),
				...(existing.canvasStageOverrides ?? {}),
			},
		};
	}

	return next as PhotonSiteSettings;
};
