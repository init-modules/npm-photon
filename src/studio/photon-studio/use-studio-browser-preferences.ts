"use client";

import { useEffect, useState } from "react";
import type { PhotonMode } from "../../types";
import {
	getStudioStorageItem,
	setStudioStorageItem,
} from "./studio-browser-storage";

export type StudioSurfaceMode = "canvas" | "settings";

type UseStudioBrowserPreferencesInput = {
	isAdmin: boolean;
	mode: PhotonMode;
	setMode: (mode: PhotonMode) => void;
	draftStorageKey: string;
	hydrateModePreference: boolean;
	onManualSave: () => void;
};

const isPersistedMode = (value: string | null): value is PhotonMode =>
	value === "preview" || value === "content" || value === "builder";

const isPersistedBuilderSurfaceMode = (
	value: string | null,
): value is StudioSurfaceMode => value === "canvas" || value === "settings";

export const resolveStudioBrowserPreferenceStorageKeys = (
	draftStorageKey: string,
) => ({
	modeStorageKey: `${draftStorageKey}:mode`,
	builderSurfaceStorageKey: `${draftStorageKey}:builder-surface`,
});

export const loadStudioModePreference = async ({
	isAdmin,
	hydrateModePreference,
	mode,
	search,
	storageKey,
	readStorage = getStudioStorageItem,
}: {
	isAdmin: boolean;
	hydrateModePreference: boolean;
	mode: PhotonMode;
	search: string;
	storageKey: string;
	readStorage?: typeof getStudioStorageItem;
}) => {
	if (!hydrateModePreference) {
		return {
			preferredMode: null,
		};
	}

	const queryMode = new URLSearchParams(search).get("mode");
	const storedMode = await readStorage<PhotonMode>(storageKey, {
		parseLegacy: (rawValue) => (isPersistedMode(rawValue) ? rawValue : null),
		serializeLegacy: (persistedMode) => persistedMode,
	});
	const preferredMode = isPersistedMode(queryMode) ? queryMode : storedMode;

	return {
		preferredMode:
			isAdmin && isPersistedMode(preferredMode) && preferredMode !== mode
				? preferredMode
				: null,
	};
};

export const persistStudioModePreference = async ({
	isAdmin,
	hydrated,
	mode,
	storageKey,
	writeStorage = setStudioStorageItem,
}: {
	isAdmin: boolean;
	hydrated: boolean;
	mode: PhotonMode;
	storageKey: string;
	writeStorage?: typeof setStudioStorageItem;
}) => {
	if (!isAdmin || !hydrated) {
		return;
	}

	await writeStorage(storageKey, mode, {
		serializeLegacy: (persistedMode) => persistedMode,
	});
};

export const loadStudioBuilderSurfacePreference = async ({
	isAdmin,
	builderSurfaceMode,
	storageKey,
	readStorage = getStudioStorageItem,
}: {
	isAdmin: boolean;
	builderSurfaceMode: StudioSurfaceMode;
	storageKey: string;
	readStorage?: typeof getStudioStorageItem;
}) => {
	const storedSurfaceMode = await readStorage<StudioSurfaceMode>(storageKey, {
		parseLegacy: (rawValue) =>
			isPersistedBuilderSurfaceMode(rawValue) ? rawValue : null,
		serializeLegacy: (persistedMode) => persistedMode,
	});

	return {
		builderSurfaceMode:
			isAdmin &&
			isPersistedBuilderSurfaceMode(storedSurfaceMode) &&
			storedSurfaceMode !== builderSurfaceMode
				? storedSurfaceMode
				: builderSurfaceMode,
	};
};

export const persistStudioBuilderSurfacePreference = async ({
	isAdmin,
	hydrated,
	builderSurfaceMode,
	storageKey,
	writeStorage = setStudioStorageItem,
}: {
	isAdmin: boolean;
	hydrated: boolean;
	builderSurfaceMode: StudioSurfaceMode;
	storageKey: string;
	writeStorage?: typeof setStudioStorageItem;
}) => {
	if (!isAdmin || !hydrated) {
		return;
	}

	await writeStorage(storageKey, builderSurfaceMode, {
		serializeLegacy: (persistedMode) => persistedMode,
	});
};

type StudioManualSaveShortcutEvent = Pick<
	KeyboardEvent,
	| "key"
	| "code"
	| "ctrlKey"
	| "metaKey"
	| "altKey"
	| "shiftKey"
	| "preventDefault"
>;

export const isStudioManualSaveShortcut = (
	event: StudioManualSaveShortcutEvent,
) => {
	const key = typeof event.key === "string" ? event.key.toLowerCase() : "";
	const code = typeof event.code === "string" ? event.code : "";

	return (
		(code === "KeyS" || key === "s") &&
		(event.ctrlKey || event.metaKey) &&
		!event.altKey &&
		!event.shiftKey
	);
};

type StudioManualSaveShortcutTarget = Pick<
	Window,
	"addEventListener" | "removeEventListener"
>;

export const registerStudioManualSaveShortcut = ({
	isAdmin,
	target,
	onManualSave,
}: {
	isAdmin: boolean;
	target: StudioManualSaveShortcutTarget;
	onManualSave: () => void;
}) => {
	if (!isAdmin) {
		return () => undefined;
	}

	const handleKeyDown = (event: Event) => {
		const keyboardEvent = event as KeyboardEvent;

		if (!isStudioManualSaveShortcut(keyboardEvent)) {
			return;
		}

		keyboardEvent.preventDefault();
		onManualSave();
	};

	target.addEventListener("keydown", handleKeyDown);
	return () => target.removeEventListener("keydown", handleKeyDown);
};

export const useStudioBrowserPreferences = ({
	isAdmin,
	mode,
	setMode,
	draftStorageKey,
	hydrateModePreference,
	onManualSave,
}: UseStudioBrowserPreferencesInput) => {
	const [modePreferenceHydrated, setModePreferenceHydrated] = useState(false);
	const [builderSurfaceMode, setBuilderSurfaceMode] =
		useState<StudioSurfaceMode>("canvas");
	const [
		builderSurfacePreferenceHydrated,
		setBuilderSurfacePreferenceHydrated,
	] = useState(false);
	const { modeStorageKey, builderSurfaceStorageKey } =
		resolveStudioBrowserPreferenceStorageKeys(draftStorageKey);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		let cancelled = false;

		void (async () => {
			const { preferredMode } = await loadStudioModePreference({
				isAdmin,
				hydrateModePreference,
				mode,
				search: window.location.search,
				storageKey: modeStorageKey,
			});

			if (!cancelled && preferredMode) {
				setMode(preferredMode);
			}

			if (!cancelled) {
				setModePreferenceHydrated(true);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [hydrateModePreference, isAdmin, modeStorageKey, setMode]);

	useEffect(() => {
		if (typeof window === "undefined" || !isAdmin || !modePreferenceHydrated) {
			return;
		}

		void persistStudioModePreference({
			isAdmin,
			hydrated: modePreferenceHydrated,
			mode,
			storageKey: modeStorageKey,
		});
	}, [isAdmin, mode, modePreferenceHydrated, modeStorageKey]);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		let cancelled = false;

		void (async () => {
			const { builderSurfaceMode: preferredBuilderSurfaceMode } =
				await loadStudioBuilderSurfacePreference({
					isAdmin,
					builderSurfaceMode,
					storageKey: builderSurfaceStorageKey,
				});

			if (!cancelled && preferredBuilderSurfaceMode !== builderSurfaceMode) {
				setBuilderSurfaceMode(preferredBuilderSurfaceMode);
			}

			if (!cancelled) {
				setBuilderSurfacePreferenceHydrated(true);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [builderSurfaceStorageKey, isAdmin]);

	useEffect(() => {
		if (
			typeof window === "undefined" ||
			!isAdmin ||
			!builderSurfacePreferenceHydrated
		) {
			return;
		}

		void persistStudioBuilderSurfacePreference({
			isAdmin,
			hydrated: builderSurfacePreferenceHydrated,
			builderSurfaceMode,
			storageKey: builderSurfaceStorageKey,
		});
	}, [
		builderSurfaceMode,
		builderSurfacePreferenceHydrated,
		builderSurfaceStorageKey,
		isAdmin,
	]);

	useEffect(() => {
		if (typeof window === "undefined" || !isAdmin) {
			return;
		}

		return registerStudioManualSaveShortcut({
			isAdmin,
			target: window,
			onManualSave,
		});
	}, [isAdmin, onManualSave]);

	return {
		builderSurfaceMode,
		setBuilderSurfaceMode,
	};
};
