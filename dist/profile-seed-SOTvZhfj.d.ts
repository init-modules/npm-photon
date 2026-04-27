import { O as PhotonInteractionSurfaceDefinition, Q as PhotonInteractionSurfaceInstance, ad as PhotonSiteSettings } from './types-1-bZpAzJ.js';

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
type PhotonProfileSeedInput = {
    interactionSurfaces?: readonly PhotonInteractionSurfaceDefinition[];
};
type PhotonProfileSeedSiteSettings = {
    interactionSurfaces?: {
        instances?: Record<string, PhotonInteractionSurfaceInstance>;
    };
    interactions?: {
        canvasStageOverrides?: Record<string, Record<string, Record<string, unknown>>>;
    };
};
/**
 * Compute the seed payload that profile creation flows should persist
 * into `site.settings`. Returns `null` when the input does not produce
 * any settings to seed (so callers can skip the persist call entirely
 * instead of writing empty objects).
 */
declare const collectPhotonProfileSeedSiteSettings: (input: PhotonProfileSeedInput) => PhotonProfileSeedSiteSettings | null;
/**
 * Convenience: merge the seed payload into an existing
 * `site.settings` record. Caller-provided settings win over the seed
 * (so re-seeding after a profile clone preserves user edits).
 */
declare const mergePhotonProfileSeedIntoSiteSettings: (siteSettings: PhotonSiteSettings, input: PhotonProfileSeedInput) => PhotonSiteSettings;

export { type PhotonProfileSeedInput as P, type PhotonProfileSeedSiteSettings as a, collectPhotonProfileSeedSiteSettings as c, mergePhotonProfileSeedIntoSiteSettings as m };
