import type {
	PhotonActionPolicy,
	PhotonActionPolicyScope,
} from "../types";

/**
 * Cascade scope ordering from 6.md §Override Resolution Algorithm.
 *
 * Lower number = lower priority (broader). Higher number wins when
 * contributions conflict on the same key. Generic resolver applies
 * the same ladder across all layered domains: site data, action
 * instances, policies, library refs, route context, localized copy.
 *
 * `workspace` is a backward-compatible alias for `workspace-draft`
 * (same priority slot — equivalent during transition).
 */
export const PHOTON_CASCADE_SCOPE_ORDER: Record<
	PhotonActionPolicyScope,
	number
> = {
	"package-default": 1,
	site: 2,
	locale: 3,
	"route-family": 4,
	"route-context": 5,
	page: 6,
	component: 7,
	"action-flow": 8,
	"workspace-draft": 9,
	workspace: 9,
	"user-session": 10,
};

/**
 * Cascade-orderable shape: anything with `scope`, optional `priority`,
 * and `packageName`. Generic helpers below sort/dedupe across any
 * domain (policies, instances, library refs, etc.) by reusing this
 * single comparison rule.
 */
export type PhotonCascadable = {
	scope: PhotonActionPolicyScope;
	priority?: number;
	packageName: string;
};

/**
 * Compare two cascadable items. Returns negative if `b` wins, positive
 * if `a` wins, zero if fully equal. Suitable for `Array.sort` to put
 * winners first (descending priority).
 *
 * Resolution order from 6.md:
 * 1. Higher scope wins.
 * 2. Within scope, higher explicit `priority` wins.
 * 3. On tie, `scope: "site"` beats `scope: "package-default"` (already
 *    handled by step 1 since site > package-default).
 * 4. On full equality, alphabetical `packageName` (deterministic only —
 *    builder should warn about this case).
 */
export const comparePhotonCascadable = (
	a: PhotonCascadable,
	b: PhotonCascadable,
): number => {
	const scopeDiff =
		PHOTON_CASCADE_SCOPE_ORDER[b.scope] - PHOTON_CASCADE_SCOPE_ORDER[a.scope];
	if (scopeDiff !== 0) {
		return scopeDiff;
	}
	const priorityDiff = (b.priority ?? 0) - (a.priority ?? 0);
	if (priorityDiff !== 0) {
		return priorityDiff;
	}
	return a.packageName.localeCompare(b.packageName);
};

/**
 * Sort cascadable items in winner-first order (descending priority).
 * Pure function: returns a new array, does not mutate input.
 */
export const sortPhotonCascade = <T extends PhotonCascadable>(
	items: readonly T[],
): T[] => [...items].sort(comparePhotonCascadable);

/**
 * Sort + dedupe by a key extractor. Items earlier in the cascade-sorted
 * order win (winners come first). Useful for resolving competing
 * contributions on the same domain key (e.g. multiple policies
 * targeting the same action, or multiple data overrides on one field).
 */
export const dedupePhotonCascadeBy = <T extends PhotonCascadable, K>(
	items: readonly T[],
	getKey: (item: T) => K,
): T[] => {
	const sorted = sortPhotonCascade(items);
	const seen = new Set<K>();
	const result: T[] = [];
	for (const item of sorted) {
		const key = getKey(item);
		if (seen.has(key)) {
			continue;
		}
		seen.add(key);
		result.push(item);
	}
	return result;
};

/**
 * Detect ambiguous resolutions: items that share the same key, scope,
 * and priority but come from different packages. The first wins by
 * alphabetical package name, but the builder should surface the
 * conflict so the site author can disambiguate via explicit `priority`.
 */
export type PhotonCascadeConflict<T extends PhotonCascadable> = {
	key: unknown;
	winner: T;
	losers: T[];
};

export const detectPhotonCascadeConflicts = <T extends PhotonCascadable, K>(
	items: readonly T[],
	getKey: (item: T) => K,
): PhotonCascadeConflict<T>[] => {
	const buckets = new Map<K, T[]>();
	for (const item of items) {
		const key = getKey(item);
		const bucket = buckets.get(key);
		if (bucket) {
			bucket.push(item);
		} else {
			buckets.set(key, [item]);
		}
	}
	const conflicts: PhotonCascadeConflict<T>[] = [];
	for (const [key, bucket] of buckets) {
		if (bucket.length < 2) {
			continue;
		}
		const sorted = sortPhotonCascade(bucket);
		const winner = sorted[0];
		const losers = sorted
			.slice(1)
			.filter(
				(item) =>
					PHOTON_CASCADE_SCOPE_ORDER[item.scope] ===
						PHOTON_CASCADE_SCOPE_ORDER[winner.scope] &&
					(item.priority ?? 0) === (winner.priority ?? 0) &&
					item.packageName !== winner.packageName,
			);
		if (losers.length > 0) {
			conflicts.push({ key, winner, losers });
		}
	}
	return conflicts;
};

// --- Backward-compatible policy-specific helpers (used by existing code) ---

export const resolvePolicyCascade = (
	policies: PhotonActionPolicy[],
): PhotonActionPolicy[] => sortPhotonCascade(policies);

export const dedupePoliciesById = (
	policies: PhotonActionPolicy[],
): PhotonActionPolicy[] => dedupePhotonCascadeBy(policies, (p) => p.id);
