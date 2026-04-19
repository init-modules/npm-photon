// src/sdk/access.ts
var BUILDER_PERMISSION_KEYS = [
  "admin",
  "su",
  "website-builder.manage",
  "website-builder.edit",
  "cms.manage"
];
var resolveWebsiteBuilderAccess = (authState, options) => {
  const permissions = authState?.user?.permissions ?? [];
  const hasExplicitPermission = permissions.some(
    (permission) => BUILDER_PERMISSION_KEYS.includes(permission)
  );
  const hasRoleAccess = authState?.user?.role === "admin";
  const hasRealAccess = hasExplicitPermission || hasRoleAccess;
  const hasDemoAccess = !authState?.user && options?.demoAccessAllowed === true;
  return {
    canManage: hasRealAccess || hasDemoAccess,
    isDemoAccess: !hasRealAccess && hasDemoAccess
  };
};

// src/sdk/mode.ts
var resolveWebsiteBuilderMode = (mode, canManage, fallback = "preview") => {
  const candidate = Array.isArray(mode) ? mode[0] : mode;
  return canManage && (candidate === "builder" || candidate === "content" || candidate === "preview") ? candidate : fallback;
};
var normalizeWebsiteBuilderSelectionForMode = (selection, mode) => {
  if (!selection) {
    return selection;
  }
  if ((mode === "builder" || mode === "content") && typeof selection.revisionId === "string") {
    return {
      profileId: selection.profileId,
      branch: selection.branch ?? "main",
      revisionId: null
    };
  }
  return selection;
};

// src/sdk/request.ts
var resolveWebsiteBuilderRequestHeaders = (options) => {
  const locale = options?.locale?.trim().toLowerCase();
  if (!locale) {
    return void 0;
  }
  return {
    "X-Locale": locale,
    "Accept-Language": locale
  };
};
var resolveWebsiteBuilderWorkspaceParams = (workspace) => workspace?.profileId ? {
  workspace: {
    profileId: workspace.profileId,
    branch: workspace.branch ?? "main",
    ...workspace.revisionId ? { revisionId: workspace.revisionId } : {}
  }
} : {};

export {
  resolveWebsiteBuilderAccess,
  resolveWebsiteBuilderMode,
  normalizeWebsiteBuilderSelectionForMode,
  resolveWebsiteBuilderRequestHeaders,
  resolveWebsiteBuilderWorkspaceParams
};
