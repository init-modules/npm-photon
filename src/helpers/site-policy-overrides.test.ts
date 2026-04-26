import assert from "node:assert/strict";
import test from "node:test";
import type { PhotonActionPolicy, PhotonSiteSettings } from "../types";
import {
	createSitePolicyOverride,
	isSitePolicyOverride,
	sitePolicyPath,
} from "./site-policy-overrides";

const basePolicy: PhotonActionPolicy = {
	id: "auth.policy.sign-in-before-publish",
	packageName: "auth-photon",
	targetActionId: "publication.article.publish",
	when: { type: "ref", conditionId: "auth.isGuest" },
	run: "auth:publish-content",
	scope: "package-default",
	priority: 10,
	enforcement: "client-hint",
	securityMode: "fail-closed",
};

test("sitePolicyPath returns nested interactions.policies.<id> path", () => {
	assert.equal(sitePolicyPath("foo.bar"), "interactions.policies.foo.bar");
});

test("isSitePolicyOverride returns false when no site policies present", () => {
	const settings: PhotonSiteSettings = {};
	assert.equal(isSitePolicyOverride("foo", settings), false);
});

test("isSitePolicyOverride returns false when policy id absent in site overrides", () => {
	const settings: PhotonSiteSettings = {
		interactions: { policies: { "other.id": basePolicy } },
	};
	assert.equal(isSitePolicyOverride("foo", settings), false);
});

test("isSitePolicyOverride returns true when site override present for id", () => {
	const settings: PhotonSiteSettings = {
		interactions: { policies: { [basePolicy.id]: basePolicy } },
	};
	assert.equal(isSitePolicyOverride(basePolicy.id, settings), true);
});

test("createSitePolicyOverride preserves id/packageName and forces scope=site", () => {
	const override = createSitePolicyOverride(basePolicy, { scope: "workspace" });
	assert.equal(override.id, basePolicy.id);
	assert.equal(override.packageName, basePolicy.packageName);
	assert.equal(override.scope, "site");
});

test("createSitePolicyOverride applies patched fields", () => {
	const override = createSitePolicyOverride(basePolicy, {
		priority: 99,
		enforcement: "server-required",
	});
	assert.equal(override.priority, 99);
	assert.equal(override.enforcement, "server-required");
	assert.equal(override.targetActionId, basePolicy.targetActionId);
});
