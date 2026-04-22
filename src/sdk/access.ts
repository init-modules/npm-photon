export type PhotonAccessAuthStateLike = {
	user?: {
		permissions?: string[] | null;
		role?: string | null;
	} | null;
} | null;

const BUILDER_PERMISSION_KEYS = [
	"admin",
	"su",
	"photon.manage",
	"photon.edit",
	"cms.manage",
];

export const resolvePhotonAccess = (
	authState: PhotonAccessAuthStateLike,
	options?: {
		demoAccessAllowed?: boolean;
	},
) => {
	const permissions = authState?.user?.permissions ?? [];
	const hasExplicitPermission = permissions.some((permission) =>
		BUILDER_PERMISSION_KEYS.includes(permission),
	);
	const hasRoleAccess = authState?.user?.role === "admin";
	const hasRealAccess = hasExplicitPermission || hasRoleAccess;
	const hasDemoAccess = !authState?.user && options?.demoAccessAllowed === true;

	return {
		canManage: hasRealAccess || hasDemoAccess,
		isDemoAccess: !hasRealAccess && hasDemoAccess,
	};
};
