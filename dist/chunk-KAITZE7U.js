// src/helpers/path.ts
var PHOTON_EMPTY_TEXT = "Untitled";
var cloneWithFallback = (value) => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
};
var parsePathSegment = (segment) => {
  const numeric = Number(segment);
  return Number.isInteger(numeric) && segment.trim() !== "" ? numeric : segment;
};
var clonePhotonValue = (value) => {
  return cloneWithFallback(value);
};
var getValueAtPath = (target, path) => {
  if (!target || !path) {
    return target ?? null;
  }
  return path.split(".").reduce((current, segment) => {
    if (current === null || current === void 0) {
      return null;
    }
    const key = parsePathSegment(segment);
    if (Array.isArray(current) && typeof key === "number") {
      return current[key];
    }
    if (typeof current === "object" && key in current) {
      return current[key];
    }
    return null;
  }, target);
};
var setValueAtPath = (target, path, value) => {
  if (!path) {
    return clonePhotonValue(value);
  }
  const draft = cloneWithFallback(target);
  const segments = path.split(".").map(parsePathSegment);
  let cursor = draft;
  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index];
    const nextSegment = segments[index + 1];
    if (Array.isArray(cursor) && typeof segment === "number") {
      if (cursor[segment] === void 0 || cursor[segment] === null) {
        cursor[segment] = typeof nextSegment === "number" ? [] : {};
      }
      cursor = cursor[segment];
      continue;
    }
    const currentValue = cursor[segment];
    if (currentValue === void 0 || currentValue === null) {
      cursor[segment] = typeof nextSegment === "number" ? [] : {};
    }
    cursor = cursor[segment];
  }
  const lastSegment = segments.at(-1);
  if (Array.isArray(cursor) && typeof lastSegment === "number") {
    cursor[lastSegment] = value;
    return draft;
  }
  cursor[lastSegment] = value;
  return draft;
};

// src/helpers/workspace.ts
var DEFAULT_PHOTON_WORKSPACE_REF = {
  profileId: "default",
  branch: "main",
  readonly: false
};
var DEFAULT_PHOTON_WORKSPACE_CAPABILITIES = {
  canEdit: true,
  canCommit: true,
  canBranch: true,
  canMerge: true,
  canEditMain: true,
  isReadonlyRevision: false,
  isMainLocked: false
};
var normalizePhotonWorkspaceRef = (workspace) => {
  const normalizedWorkspace = {
    ...DEFAULT_PHOTON_WORKSPACE_REF,
    ...workspace ?? {}
  };
  if (normalizedWorkspace.revisionId?.trim()) {
    normalizedWorkspace.readonly = true;
  }
  return normalizedWorkspace;
};
var normalizePhotonWorkspaceCapabilities = (capabilities) => ({
  ...DEFAULT_PHOTON_WORKSPACE_CAPABILITIES,
  ...capabilities ?? {}
});
var normalizePhotonWorkspaceDescriptor = (workspace) => ({
  ref: normalizePhotonWorkspaceRef(workspace?.ref),
  headRevisionId: workspace?.headRevisionId ?? null,
  profileName: workspace?.profileName ?? null,
  branchLabel: workspace?.branchLabel ?? null,
  revisionLabel: workspace?.revisionLabel ?? null,
  readonlyReason: workspace?.readonlyReason ?? (workspace?.ref?.revisionId?.trim() ? "revision" : null)
});
var extractPhotonWorkspaceRef = (workspace) => {
  if (!workspace) {
    return null;
  }
  return "ref" in workspace ? workspace.ref : workspace;
};
var getPhotonWorkspaceKey = (workspace) => {
  const descriptor = workspace && "ref" in workspace ? normalizePhotonWorkspaceDescriptor(workspace) : {
    ref: normalizePhotonWorkspaceRef(
      extractPhotonWorkspaceRef(workspace)
    ),
    headRevisionId: null,
    profileName: null,
    branchLabel: null,
    revisionLabel: null,
    readonlyReason: null
  };
  return [
    descriptor.ref.profileId,
    descriptor.ref.branch,
    descriptor.ref.revisionId?.trim() || "head",
    descriptor.ref.readonly ? "readonly" : "writable",
    descriptor.headRevisionId?.trim() || "unknown-head"
  ].join(":");
};
var getPhotonWorkspaceIdentityKey = (workspace) => {
  const descriptor = workspace && "ref" in workspace ? normalizePhotonWorkspaceDescriptor(workspace) : {
    ref: normalizePhotonWorkspaceRef(
      extractPhotonWorkspaceRef(workspace)
    ),
    headRevisionId: null,
    profileName: null,
    branchLabel: null,
    revisionLabel: null,
    readonlyReason: null
  };
  return [
    descriptor.ref.profileId,
    descriptor.ref.branch,
    descriptor.ref.revisionId?.trim() || "head"
  ].join(":");
};
var isPhotonWorkspaceReadonly = (workspace, capabilities) => {
  const normalizedWorkspace = workspace && "ref" in workspace ? normalizePhotonWorkspaceDescriptor(workspace) : {
    ref: normalizePhotonWorkspaceRef(
      extractPhotonWorkspaceRef(workspace)
    ),
    headRevisionId: null,
    profileName: null,
    branchLabel: null,
    revisionLabel: null,
    readonlyReason: null
  };
  const normalizedCapabilities = normalizePhotonWorkspaceCapabilities(capabilities);
  return Boolean(
    normalizedWorkspace.ref.readonly || normalizedCapabilities.isReadonlyRevision || !normalizedCapabilities.canEdit
  );
};
var canEditPhotonWorkspace = (workspace, capabilities) => !isPhotonWorkspaceReadonly(workspace, capabilities);
var canSavePhotonWorkspace = ({
  isAdmin,
  workspace,
  capabilities
}) => Boolean(
  isAdmin && !isPhotonWorkspaceReadonly(workspace, capabilities) && normalizePhotonWorkspaceCapabilities(capabilities).canCommit
);

export {
  PHOTON_EMPTY_TEXT,
  clonePhotonValue,
  getValueAtPath,
  setValueAtPath,
  DEFAULT_PHOTON_WORKSPACE_REF,
  DEFAULT_PHOTON_WORKSPACE_CAPABILITIES,
  normalizePhotonWorkspaceRef,
  normalizePhotonWorkspaceCapabilities,
  normalizePhotonWorkspaceDescriptor,
  getPhotonWorkspaceKey,
  getPhotonWorkspaceIdentityKey,
  isPhotonWorkspaceReadonly,
  canEditPhotonWorkspace,
  canSavePhotonWorkspace
};
