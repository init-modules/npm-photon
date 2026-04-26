import type {
	PhotonActionPolicy,
	PhotonActionPolicyScope,
} from "../types";

const SCOPE_ORDER: Record<PhotonActionPolicyScope, number> = {
	"package-default": 1,
	site: 2,
	workspace: 3,
};

export const resolvePolicyCascade = (
	policies: PhotonActionPolicy[],
): PhotonActionPolicy[] =>
	[...policies].sort((a, b) => {
		const scopeDiff = SCOPE_ORDER[b.scope] - SCOPE_ORDER[a.scope];
		if (scopeDiff !== 0) {
			return scopeDiff;
		}
		const priorityDiff = (a.priority ?? 0) - (b.priority ?? 0);
		if (priorityDiff !== 0) {
			return priorityDiff;
		}
		return a.packageName.localeCompare(b.packageName);
	});

export const dedupePoliciesById = (
	policies: PhotonActionPolicy[],
): PhotonActionPolicy[] => {
	const sorted = resolvePolicyCascade(policies);
	const seen = new Set<string>();
	const result: PhotonActionPolicy[] = [];
	for (const policy of sorted) {
		if (seen.has(policy.id)) {
			continue;
		}
		seen.add(policy.id);
		result.push(policy);
	}
	return result;
};
