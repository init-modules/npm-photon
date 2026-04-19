import assert from "node:assert/strict";
import test from "node:test";
import { getWebsiteBuilderExternalStateFingerprint } from "./external-state";

const document = {
	id: "home",
	name: "Home",
	route: "/",
	updatedAt: "2026-01-01T00:00:00.000Z",
	blocks: [],
};

test("capability and label refreshes do not change the external content fingerprint", () => {
	const baseFingerprint = getWebsiteBuilderExternalStateFingerprint({
		document,
		resources: {},
		pageSettings: {},
		site: {
			settings: {},
			regions: {},
		},
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "main",
			},
			headRevisionId: "rev-1",
			profileName: "Profile A",
			branchLabel: "Main",
		},
	});
	const refreshedFingerprint = getWebsiteBuilderExternalStateFingerprint({
		document,
		resources: {},
		pageSettings: {},
		site: {
			settings: {},
			regions: {},
		},
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "main",
				readonly: true,
			},
			headRevisionId: "rev-1",
			profileName: "Renamed profile",
			branchLabel: "Protected main",
			readonlyReason: "policy",
		},
	});

	assert.equal(baseFingerprint, refreshedFingerprint);
});

test("workspace head changes do not replace external content fingerprints on their own", () => {
	const originalFingerprint = getWebsiteBuilderExternalStateFingerprint({
		document,
		resources: {},
		pageSettings: {},
		site: {
			settings: {},
			regions: {},
		},
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "main",
			},
			headRevisionId: "rev-1",
		},
	});
	const updatedFingerprint = getWebsiteBuilderExternalStateFingerprint({
		document,
		resources: {},
		pageSettings: {},
		site: {
			settings: {},
			regions: {},
		},
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "main",
			},
			headRevisionId: "rev-2",
		},
	});

	assert.equal(originalFingerprint, updatedFingerprint);
});

test("workspace branch changes still replace the external content fingerprint", () => {
	const mainFingerprint = getWebsiteBuilderExternalStateFingerprint({
		document,
		resources: {},
		pageSettings: {},
		site: {
			settings: {},
			regions: {},
		},
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "main",
			},
			headRevisionId: "rev-1",
		},
	});
	const featureFingerprint = getWebsiteBuilderExternalStateFingerprint({
		document,
		resources: {},
		pageSettings: {},
		site: {
			settings: {},
			regions: {},
		},
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "feature/redesign",
			},
			headRevisionId: "rev-99",
		},
	});

	assert.notEqual(mainFingerprint, featureFingerprint);
});
