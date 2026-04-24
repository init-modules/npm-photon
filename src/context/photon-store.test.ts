import assert from "node:assert/strict";
import test from "node:test";
import { createPhotonRegistry } from "../helpers/document";
import { createPhotonStore } from "./photon-store";

const createDocument = (id: string, blockId: string) => ({
	id,
	name: id,
	route: `/${id}`,
	updatedAt: "2026-01-01T00:00:00.000Z",
	blocks: [
		{
			id: blockId,
			module: "test",
			type: "text",
			props: {
				label: id,
			},
		},
	],
});

const createStore = () =>
	createPhotonStore({
		initialDocument: createDocument("profile-a", "block-a"),
		initialResources: {},
		initialPageSettings: {},
		initialSite: {
			settings: {},
			regions: {},
		},
		registry: createPhotonRegistry([]),
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "main",
			},
		},
		linkComponent: () => null,
		isAdmin: true,
	});

test("syncExternalState replaces the active workspace and resets dirty state", () => {
	const store = createStore();

	store.getState().updatePageSettingValue("seo.title", "Draft title");
	assert.equal(store.getState().contentRevision, 1);

	store.getState().syncExternalState({
		initialDocument: createDocument("profile-b", "block-b"),
		initialResources: {
			record: {
				title: "Fresh",
			},
		},
		initialPageSettings: {
			seo: {
				title: "Published",
			},
		},
		initialSite: {
			settings: {
				design: {
					presetId: "init-landing",
				},
			},
			regions: {},
		},
		workspace: {
			ref: {
				profileId: "profile-b",
				branch: "feature/refresh",
			},
			profileName: "Profile B",
		},
		capabilities: {
			canEditMain: false,
		},
	});

	const state = store.getState();

	assert.equal(state.workspace.ref.profileId, "profile-b");
	assert.equal(state.workspace.ref.branch, "feature/refresh");
	assert.equal(state.initialWorkspace.ref.profileId, "profile-b");
	assert.equal(state.contentRevision, 0);
	assert.equal(state.document.id, "profile-b");
	assert.equal(state.selectedBlockId, "block-b");
	assert.deepEqual(state.pageSettings, {
		seo: {
			title: "Published",
		},
	});
	assert.deepEqual(state.resources, {
		record: {
			title: "Fresh",
		},
	});
});

test("readonly revision workspaces reject editor mutations", () => {
	const store = createPhotonStore({
		initialDocument: createDocument("revision", "block-readonly"),
		initialResources: {},
		initialPageSettings: {},
		initialSite: {
			settings: {},
			regions: {},
		},
		registry: createPhotonRegistry([]),
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "release",
				revisionId: "rev-42",
				readonly: true,
			},
			readonlyReason: "revision",
		},
		capabilities: {
			canEdit: false,
			canCommit: false,
			isReadonlyRevision: true,
		},
		linkComponent: () => null,
		isAdmin: true,
	});

	store.getState().updatePageSettingValue("seo.title", "Should not persist");
	store.getState().updateSiteSettingValue("design.presetId", "init-landing");

	const state = store.getState();

	assert.deepEqual(state.pageSettings, {});
	assert.deepEqual(state.site.settings, {});
	assert.equal(state.contentRevision, 0);
});
