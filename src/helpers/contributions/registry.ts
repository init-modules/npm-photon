import type {
	PhotonAnySiteFrameContribution,
	PhotonSlot,
} from "./types";

/**
 * Error thrown when two slots with the same id are declared. Slot ids
 * are global (across all packages and kits) — duplicates indicate
 * conflicting capability declarations.
 */
export class PhotonSlotConflictError extends Error {
	constructor(
		public readonly slotId: string,
		public readonly existingPlacement: string,
		public readonly attemptedPlacement: string,
	) {
		super(
			`Photon slot "${slotId}" was declared more than once ` +
				`(existing placement: "${existingPlacement}", ` +
				`attempted: "${attemptedPlacement}"). ` +
				`Slot ids must be unique across all packages.`,
		);
		this.name = "PhotonSlotConflictError";
	}
}

/**
 * Error thrown when two contributions share the same id. Contribution
 * ids must be globally unique and namespaced as `<package>.<feature>`.
 */
export class PhotonContributionConflictError extends Error {
	constructor(
		public readonly contributionId: string,
		public readonly existingPackage: string,
		public readonly attemptedPackage: string,
	) {
		super(
			`Photon contribution "${contributionId}" was declared more than once ` +
				`(existing package: "${existingPackage}", ` +
				`attempted: "${attemptedPackage}"). ` +
				`Contribution ids must be globally unique and namespaced as "<package>.<feature>".`,
		);
		this.name = "PhotonContributionConflictError";
	}
}

/**
 * Error thrown when a contribution targets an undeclared slot.
 */
export class PhotonUnknownSlotError extends Error {
	constructor(
		public readonly contributionId: string,
		public readonly slotId: string,
	) {
		super(
			`Photon contribution "${contributionId}" targets undeclared slot ` +
				`"${slotId}". Declare the slot via definePhotonSlot before ` +
				`registering contributions into it.`,
		);
		this.name = "PhotonUnknownSlotError";
	}
}

/**
 * Read-only registry of declared slots. Built by collecting slot
 * declarations from app modules at composition time. Lookup by id is
 * O(1); listing all slots is O(n).
 */
export type PhotonSlotRegistry = {
	readonly size: number;
	has(slotId: string): boolean;
	get(slotId: string): PhotonSlot | undefined;
	all(): readonly PhotonSlot[];
};

/**
 * Read-only registry of registered site-frame contributions.
 * Lookup by id is O(1); lookup by slot is O(s) where s = contributions
 * in that slot (precomputed bucket).
 */
export type PhotonSiteFrameContributionRegistry = {
	readonly size: number;
	has(contributionId: string): boolean;
	get(
		contributionId: string,
	): PhotonAnySiteFrameContribution | undefined;
	bySlot(slotId: string): readonly PhotonAnySiteFrameContribution[];
	all(): readonly PhotonAnySiteFrameContribution[];
};

/**
 * Build a slot registry from a list of declarations. Throws
 * {@link PhotonSlotConflictError} if any two slots share an id.
 *
 * Iteration order in `all()` matches declaration order.
 */
export const createPhotonSlotRegistry = (
	slots: readonly PhotonSlot[],
): PhotonSlotRegistry => {
	const byId = new Map<string, PhotonSlot>();
	const ordered: PhotonSlot[] = [];

	for (const slot of slots) {
		const existing = byId.get(slot.id);
		if (existing) {
			throw new PhotonSlotConflictError(
				slot.id,
				existing.placement,
				slot.placement,
			);
		}
		byId.set(slot.id, slot);
		ordered.push(slot);
	}

	return {
		get size() {
			return ordered.length;
		},
		has: (slotId) => byId.has(slotId),
		get: (slotId) => byId.get(slotId),
		all: () => ordered,
	};
};

/**
 * Build a contribution registry from a list of contributions and a slot
 * registry. Validates each contribution's slot is declared, ids are
 * unique, and `packageName` is non-empty.
 *
 * Throws {@link PhotonContributionConflictError} on duplicate id,
 * {@link PhotonUnknownSlotError} on missing slot.
 */
export const createPhotonSiteFrameContributionRegistry = (
	contributions: readonly PhotonAnySiteFrameContribution[],
	slots: PhotonSlotRegistry,
): PhotonSiteFrameContributionRegistry => {
	const byId = new Map<string, PhotonAnySiteFrameContribution>();
	const bySlotBucket = new Map<string, PhotonAnySiteFrameContribution[]>();
	const ordered: PhotonAnySiteFrameContribution[] = [];

	for (const contribution of contributions) {
		if (!contribution.packageName) {
			throw new Error(
				`Photon contribution "${contribution.id}" is missing required field "packageName".`,
			);
		}

		const existing = byId.get(contribution.id);
		if (existing) {
			throw new PhotonContributionConflictError(
				contribution.id,
				existing.packageName,
				contribution.packageName,
			);
		}

		const slotId = contribution.slot.id;
		if (!slots.has(slotId)) {
			throw new PhotonUnknownSlotError(contribution.id, slotId);
		}

		byId.set(contribution.id, contribution);
		ordered.push(contribution);

		const bucket = bySlotBucket.get(slotId);
		if (bucket) {
			bucket.push(contribution);
		} else {
			bySlotBucket.set(slotId, [contribution]);
		}
	}

	const emptyBucket: readonly PhotonAnySiteFrameContribution[] = [];

	return {
		get size() {
			return ordered.length;
		},
		has: (contributionId) => byId.has(contributionId),
		get: (contributionId) => byId.get(contributionId),
		bySlot: (slotId) => bySlotBucket.get(slotId) ?? emptyBucket,
		all: () => ordered,
	};
};
