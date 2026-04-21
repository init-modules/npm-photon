export type WebsiteBuilderAccessAuthStateLike = {
	user?: {
		permissions?: string[] | null;
		role?: string | null;
	} | null;
} | null;

const BUILDER_PERMISSION_KEYS = [
	"admin",
	"su",
	"website-builder.manage",
	"website-builder.edit",
	"cms.manage",
];

export const resolveWebsiteBuilderAccess = (
	authState: WebsiteBuilderAccessAuthStateLike,
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
