import assert from "node:assert/strict";
import test from "node:test";
import {
	getPhotonWorkspaceIdentityKey,
	normalizePhotonWorkspaceDescriptor,
	normalizePhotonWorkspaceRef,
} from "./workspace";

test("detached revisions normalize to readonly workspaces by default", () => {
	const ref = normalizePhotonWorkspaceRef({
		profileId: "profile-a",
		branch: "main",
		revisionId: "rev-42",
	});
	const descriptor = normalizePhotonWorkspaceDescriptor({
		ref: {
			profileId: "profile-a",
			branch: "main",
			revisionId: "rev-42",
		},
	});

	assert.equal(ref.readonly, true);
	assert.equal(descriptor.ref.readonly, true);
	assert.equal(descriptor.readonlyReason, "revision");
});

test("workspace identity ignores readonly and label metadata", () => {
	const writableIdentity = getPhotonWorkspaceIdentityKey({
		ref: {
			profileId: "profile-a",
			branch: "main",
		},
		headRevisionId: "rev-7",
		profileName: "Profile A",
	});
	const readonlyIdentity = getPhotonWorkspaceIdentityKey({
		ref: {
			profileId: "profile-a",
			branch: "main",
			readonly: true,
		},
		headRevisionId: "rev-7",
		profileName: "Renamed profile",
		branchLabel: "Protected main",
	});

	assert.equal(writableIdentity, readonlyIdentity);
});

test("workspace identity ignores head revision metadata", () => {
	const previousHeadIdentity = getPhotonWorkspaceIdentityKey({
		ref: {
			profileId: "profile-a",
			branch: "main",
		},
		headRevisionId: "rev-7",
	});
	const advancedHeadIdentity = getPhotonWorkspaceIdentityKey({
		ref: {
			profileId: "profile-a",
			branch: "main",
		},
		headRevisionId: "rev-8",
	});

	assert.equal(previousHeadIdentity, advancedHeadIdentity);
});
