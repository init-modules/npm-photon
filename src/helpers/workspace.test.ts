import assert from "node:assert/strict";
import test from "node:test";
import {
	getWebsiteBuilderWorkspaceIdentityKey,
	normalizeWebsiteBuilderWorkspaceDescriptor,
	normalizeWebsiteBuilderWorkspaceRef,
} from "./workspace";

test("detached revisions normalize to readonly workspaces by default", () => {
	const ref = normalizeWebsiteBuilderWorkspaceRef({
		profileId: "profile-a",
		branch: "main",
		revisionId: "rev-42",
	});
	const descriptor = normalizeWebsiteBuilderWorkspaceDescriptor({
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
	const writableIdentity = getWebsiteBuilderWorkspaceIdentityKey({
		ref: {
			profileId: "profile-a",
			branch: "main",
		},
		headRevisionId: "rev-7",
		profileName: "Profile A",
	});
	const readonlyIdentity = getWebsiteBuilderWorkspaceIdentityKey({
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
	const previousHeadIdentity = getWebsiteBuilderWorkspaceIdentityKey({
		ref: {
			profileId: "profile-a",
			branch: "main",
		},
		headRevisionId: "rev-7",
	});
	const advancedHeadIdentity = getWebsiteBuilderWorkspaceIdentityKey({
		ref: {
			profileId: "profile-a",
			branch: "main",
		},
		headRevisionId: "rev-8",
	});

	assert.equal(previousHeadIdentity, advancedHeadIdentity);
});
