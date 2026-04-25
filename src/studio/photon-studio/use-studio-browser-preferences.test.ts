import assert from "node:assert/strict";
import test from "node:test";
import type {
	getStudioStorageItem,
	setStudioStorageItem,
} from "./studio-browser-storage";
import {
	isStudioManualSaveShortcut,
	loadStudioBuilderSurfacePreference,
	loadStudioModePreference,
	persistStudioBuilderSurfacePreference,
	persistStudioModePreference,
	registerStudioManualSaveShortcut,
	resolveStudioBrowserPreferenceStorageKeys,
} from "./use-studio-browser-preferences";

test("mode hydration prefers URL mode over stored mode", async () => {
	const { modeStorageKey } =
		resolveStudioBrowserPreferenceStorageKeys("draft-key");
	const readStorage: typeof getStudioStorageItem = async <T>() =>
		"content" as T;
	const { preferredMode } = await loadStudioModePreference({
		isAdmin: true,
		hydrateModePreference: true,
		mode: "preview",
		search: "?mode=builder",
		storageKey: modeStorageKey,
		readStorage,
	});

	assert.equal(preferredMode, "builder");
});

test("mode hydration can be disabled when the host router owns mode", async () => {
	const { modeStorageKey } =
		resolveStudioBrowserPreferenceStorageKeys("draft-key");
	const readStorage: typeof getStudioStorageItem = async <T>() =>
		"builder" as T;
	const { preferredMode } = await loadStudioModePreference({
		isAdmin: true,
		hydrateModePreference: false,
		mode: "preview",
		search: "?mode=content",
		storageKey: modeStorageKey,
		readStorage,
	});

	assert.equal(preferredMode, null);
});

test("mode persistence stores the preference without mutating app-owned routing", async () => {
	const writes: Array<{ key: string; value: string }> = [];
	const writeStorage: typeof setStudioStorageItem = async <T>(key, value) => {
		writes.push({ key, value: value as string });
	};

	await persistStudioModePreference({
		isAdmin: true,
		hydrated: true,
		mode: "content",
		storageKey: "draft-key:mode",
		writeStorage,
	});

	assert.deepEqual(writes, [
		{
			key: "draft-key:mode",
			value: "content",
		},
	]);
});

test("builder surface hydration and persistence stay workspace-local", async () => {
	const { builderSurfaceStorageKey } =
		resolveStudioBrowserPreferenceStorageKeys("draft-key");
	const readStorage: typeof getStudioStorageItem = async <T>() =>
		"settings" as T;
	const hydrated = await loadStudioBuilderSurfacePreference({
		isAdmin: true,
		builderSurfaceMode: "canvas",
		storageKey: builderSurfaceStorageKey,
		readStorage,
	});
	const writes: Array<{ key: string; value: string }> = [];
	const writeStorage: typeof setStudioStorageItem = async <T>(key, value) => {
		writes.push({ key, value: value as string });
	};

	await persistStudioBuilderSurfacePreference({
		isAdmin: true,
		hydrated: true,
		builderSurfaceMode: hydrated.builderSurfaceMode,
		storageKey: builderSurfaceStorageKey,
		writeStorage,
	});

	assert.equal(hydrated.builderSurfaceMode, "settings");
	assert.deepEqual(writes, [
		{
			key: "draft-key:builder-surface",
			value: "settings",
		},
	]);
});

test("builder surface hydration accepts surfaces alias as interactions mode", async () => {
	const readStorage: typeof getStudioStorageItem = async <T>() =>
		"surfaces" as T;
	const hydrated = await loadStudioBuilderSurfacePreference({
		isAdmin: true,
		builderSurfaceMode: "canvas",
		storageKey: "draft-key:builder-surface",
		readStorage,
	});

	assert.equal(hydrated.builderSurfaceMode, "interactions");
});

test("builder surface hydration prefers URL builder surface over stored mode", async () => {
	const readStorage: typeof getStudioStorageItem = async <T>() =>
		"settings" as T;
	const hydrated = await loadStudioBuilderSurfacePreference({
		isAdmin: true,
		builderSurfaceMode: "canvas",
		search: "?builderSurface=interactions",
		storageKey: "draft-key:builder-surface",
		readStorage,
	});

	assert.equal(hydrated.builderSurfaceMode, "interactions");
});

test("manual save shortcut only fires on ctrl/cmd+s without modifier conflicts", () => {
	assert.equal(
		isStudioManualSaveShortcut({
			key: "s",
			code: "KeyS",
			ctrlKey: true,
			metaKey: false,
			altKey: false,
			shiftKey: false,
			preventDefault: () => undefined,
		}),
		true,
	);
	assert.equal(
		isStudioManualSaveShortcut({
			key: "s",
			code: "KeyS",
			ctrlKey: true,
			metaKey: false,
			altKey: false,
			shiftKey: true,
			preventDefault: () => undefined,
		}),
		false,
	);
	assert.equal(
		isStudioManualSaveShortcut({
			key: "ы",
			code: "KeyS",
			ctrlKey: true,
			metaKey: false,
			altKey: false,
			shiftKey: false,
			preventDefault: () => undefined,
		}),
		true,
	);
	assert.equal(
		isStudioManualSaveShortcut({
			key: "ы",
			code: "KeyA",
			ctrlKey: true,
			metaKey: false,
			altKey: false,
			shiftKey: false,
			preventDefault: () => undefined,
		}),
		false,
	);
	assert.equal(
		isStudioManualSaveShortcut({
			code: "KeyS",
			ctrlKey: true,
			metaKey: false,
			altKey: false,
			shiftKey: false,
			preventDefault: () => undefined,
		} as unknown as Parameters<typeof isStudioManualSaveShortcut>[0]),
		true,
	);
	assert.equal(
		isStudioManualSaveShortcut({
			ctrlKey: true,
			metaKey: false,
			altKey: false,
			shiftKey: false,
			preventDefault: () => undefined,
		} as unknown as Parameters<typeof isStudioManualSaveShortcut>[0]),
		false,
	);

	let keydownHandler: null | ((event: Event) => void) = null;
	let saveCount = 0;
	const cleanup = registerStudioManualSaveShortcut({
		isAdmin: true,
		target: {
			addEventListener: (_eventName, handler) => {
				keydownHandler = handler as (event: Event) => void;
			},
			removeEventListener: () => {
				keydownHandler = null;
			},
		},
		onManualSave: () => {
			saveCount += 1;
		},
	});

	assert.ok(keydownHandler);

	let prevented = false;
	keydownHandler?.({
		key: "s",
		code: "KeyS",
		ctrlKey: true,
		metaKey: false,
		altKey: false,
		shiftKey: false,
		preventDefault: () => {
			prevented = true;
		},
	} as unknown as Event);

	assert.equal(prevented, true);
	assert.equal(saveCount, 1);

	cleanup();
	assert.equal(keydownHandler, null);
});
