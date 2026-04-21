import assert from "node:assert/strict";
import test from "node:test";
import { applyStudioSiteSettingChange } from "./use-studio-site-setting-change";

const document = {
	id: "home",
	name: "Home",
	route: "/",
	updatedAt: "2026-01-01T00:00:00.000Z",
	blocks: [],
};

test("site setting changes can replace the full studio state via the callback contract", () => {
	const calls: string[] = [];
	let replacementState: unknown[] | null = null;

	applyStudioSiteSettingChange({
		path: "design.presetId",
		value: "paper-flow",
		workspace: {
			ref: {
				profileId: "profile-a",
				branch: "main",
			},
			headRevisionId: "rev-1",
		},
		expectedHeadRevisionId: "rev-1",
		document,
		resources: {
			record: {
				title: "Draft",
			},
		},
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
		updateSiteSettingValue: (path, value) => {
			calls.push(`update:${path}:${String(value)}`);
		},
		onSiteSettingChange: (_path, _value, context) => {
			const designSettings = context.site.settings as {
				design?: {
					presetId?: string;
				};
			};
			calls.push(`replace:${String(designSettings.design?.presetId)}`);
			return {
				document: {
					...context.document,
					name: "Updated Home",
				},
				resources: context.resources,
				pageSettings: context.pageSettings,
				site: context.site,
			};
		},
		replaceState: (...args) => {
			replacementState = args;
		},
	});

	assert.deepEqual(calls, [
		"update:design.presetId:paper-flow",
		"replace:paper-flow",
	]);
	assert.ok(replacementState);
	assert.equal(
		(replacementState?.[0] as { name: string }).name,
		"Updated Home",
	);
	assert.equal(
		(replacementState?.[3] as { settings: { design: { presetId: string } } })
			.settings.design.presetId,
		"paper-flow",
	);
});
