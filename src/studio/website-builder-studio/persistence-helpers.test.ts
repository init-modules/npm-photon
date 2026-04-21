import assert from "node:assert/strict";
import test from "node:test";
import {
	canSaveWebsiteBuilderStudioDocument,
	createWebsiteBuilderStudioSavePayload,
	createWebsiteBuilderStudioSiteSettingChangeContext,
	getDefaultWebsiteBuilderAutosaveEnabled,
	getWebsiteBuilderStudioFingerprint,
	parsePersistedDraft,
	resolveWebsiteBuilderStudioDraftStorageKey,
	resolveWebsiteBuilderStudioWorkspaceKey,
} from "./persistence-helpers";

const document = {
	id: "home",
	name: "Home",
	route: "/",
	updatedAt: "2026-01-01T00:00:00.000Z",
	blocks: [],
};

test("autosave is disabled by default", () => {
	assert.equal(getDefaultWebsiteBuilderAutosaveEnabled(), false);
});

test("readonly revision workspaces cannot be saved", () => {
	assert.equal(
		canSaveWebsiteBuilderStudioDocument({
			isAdmin: true,
			workspace: {
				ref: {
					profileId: "profile-a",
					branch: "release",
					revisionId: "rev-42",
				},
			},
			capabilities: {
				canEdit: false,
				canCommit: false,
				isReadonlyRevision: true,
			},
		}),
		false,
	);
});

test("fingerprints are workspace-aware so branches keep independent dirty state", () => {
	const mainWorkspace = {
		ref: {
			profileId: "profile-a",
			branch: "main",
		},
		headRevisionId: "rev-main-1",
	};
	const featureWorkspace = {
		ref: {
			profileId: "profile-a",
			branch: "feature/redesign",
		},
		headRevisionId: "rev-feature-1",
	};
	const mainFingerprint = getWebsiteBuilderStudioFingerprint(
		document,
		{},
		{},
		{
			settings: {},
			regions: {},
		},
		mainWorkspace,
	);
	const featureFingerprint = getWebsiteBuilderStudioFingerprint(
		document,
		{},
		{},
		{
			settings: {},
			regions: {},
		},
		featureWorkspace,
	);

	assert.notEqual(mainFingerprint, featureFingerprint);
	assert.equal(
		resolveWebsiteBuilderStudioWorkspaceKey(mainWorkspace),
		"profile-a:main:head",
	);
});

test("workspace head changes do not invalidate the studio fingerprint", () => {
	const previousHeadFingerprint = getWebsiteBuilderStudioFingerprint(
		document,
		{},
		{},
		{
			settings: {},
			regions: {},
		},
		{
			ref: {
				profileId: "profile-a",
				branch: "main",
			},
			headRevisionId: "rev-main-1",
		},
	);
	const updatedHeadFingerprint = getWebsiteBuilderStudioFingerprint(
		document,
		{},
		{},
		{
			settings: {},
			regions: {},
		},
		{
			ref: {
				profileId: "profile-a",
				branch: "main",
			},
			headRevisionId: "rev-main-2",
		},
	);

	assert.equal(previousHeadFingerprint, updatedHeadFingerprint);
});

test("draft storage keys are namespaced by workspace identity", () => {
	const draftKeyA = resolveWebsiteBuilderStudioDraftStorageKey({
		baseKey: "website-builder:draft",
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "main",
			},
			headRevisionId: "rev-1",
		},
	});
	const draftKeyB = resolveWebsiteBuilderStudioDraftStorageKey({
		baseKey: "website-builder:draft",
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "feature/redesign",
			},
			headRevisionId: "rev-5",
		},
	});

	assert.equal(draftKeyA, "website-builder:draft:profile-a:main:head");
	assert.equal(
		draftKeyB,
		"website-builder:draft:profile-a:feature/redesign:head",
	);
	assert.notEqual(draftKeyA, draftKeyB);
});

test("persisted draft envelopes retain workspace keys", () => {
	const parsed = parsePersistedDraft(
		JSON.stringify({
			workspaceKey: "profile-a:feature/redesign:head",
			document,
			resources: {
				record: {
					title: "Draft",
				},
			},
			pageSettings: {
				seo: {
					title: "Draft",
				},
			},
			site: {
				settings: {},
				regions: {},
			},
		}),
		document.updatedAt,
	);

	assert.equal(parsed?.workspaceKey, "profile-a:feature/redesign:head");
	assert.deepEqual(parsed?.payload.document, document);
	assert.deepEqual(parsed?.payload.resources, {
		record: {
			title: "Draft",
		},
	});
});

test("save payloads keep optimistic concurrency separate from workspace identity", () => {
	const autosavePayload = createWebsiteBuilderStudioSavePayload({
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "main",
			},
			headRevisionId: "rev-main-2",
		},
		expectedHeadRevisionId: "rev-main-1",
		saveMode: "autosave",
		document,
		resources: {
			record: {
				title: "Draft",
			},
		},
		pageSettings: {},
		site: {
			settings: {},
			regions: {},
		},
	});
	const manualPayload = createWebsiteBuilderStudioSavePayload({
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "main",
			},
			headRevisionId: "rev-main-2",
		},
		saveMode: "manual",
		document,
		resources: {},
		pageSettings: {},
		site: {
			settings: {},
			regions: {},
		},
	});

	assert.equal(autosavePayload.saveMode, "autosave");
	assert.equal(autosavePayload.expectedHeadRevisionId, "rev-main-1");
	assert.equal(autosavePayload.workspace?.headRevisionId, "rev-main-2");
	assert.equal(manualPayload.saveMode, "manual");
	assert.equal(manualPayload.expectedHeadRevisionId, "rev-main-2");
});

test("site setting change payloads receive the updated site snapshot and workspace metadata", () => {
	const context = createWebsiteBuilderStudioSiteSettingChangeContext({
		path: "design.header.sticky",
		value: true,
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "feature/redesign",
			},
			headRevisionId: "rev-feature-2",
		},
		expectedHeadRevisionId: "rev-feature-1",
		document,
		resources: {},
		pageSettings: {
			seo: {
				title: "Home",
			},
		},
		site: {
			settings: {},
			regions: {},
		},
		currentPage: {
			key: "home",
			name: "Home",
			kind: "page",
			route: "/",
			canOpen: true,
			canDuplicate: true,
			isDynamic: false,
		},
	});

	assert.equal(context.saveMode, "manual");
	assert.equal(context.expectedHeadRevisionId, "rev-feature-1");
	assert.equal(context.workspace?.ref.branch, "feature/redesign");
	assert.deepEqual(context.site.settings, {
		design: {
			header: {
				sticky: true,
			},
		},
	});
	assert.deepEqual(context.currentPage, {
		key: "home",
		name: "Home",
		kind: "page",
		route: "/",
		canOpen: true,
		canDuplicate: true,
		isDynamic: false,
	});
});
