"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { clonePhotonValue } from "../../helpers/path";
import type {
	PhotonDocument,
	PhotonPageSettings,
	PhotonResources,
	PhotonSite,
	PhotonWorkspaceCapabilities,
	PhotonWorkspaceDescriptor,
} from "../../types";
import type {
	PhotonStudioProps,
	PhotonStudioSavePayload,
	PhotonStudioSaveReason,
} from "../types";
import {
	canSavePhotonStudioDocument,
	createPhotonStudioSavePayload,
	getDefaultPhotonAutosaveEnabled,
	getPhotonStudioFingerprint,
	normalizePhotonStudioCapabilities,
	normalizePhotonStudioWorkspace,
	parseBooleanStorageValue,
	parsePersistedDraft,
	resolvePhotonStudioDraftStorageKey,
	resolvePhotonStudioWorkspaceKey,
} from "./persistence-helpers";
import {
	getStudioStorageItem,
	removeStudioStorageItem,
	setStudioStorageItem,
} from "./studio-browser-storage";

type UseStudioPersistenceProps = {
	initialDocument: PhotonDocument;
	initialResources: PhotonResources;
	initialPageSettings: PhotonPageSettings;
	initialSite: PhotonSite;
	contentRevision: number;
	persistedDocument: PhotonDocument;
	resources: PhotonResources;
	pageSettings: PhotonPageSettings;
	site: PhotonSite;
	isAdmin: boolean;
	workspace?: PhotonWorkspaceDescriptor;
	capabilities?: Partial<PhotonWorkspaceCapabilities>;
	draftStorageKey: string;
	autosaveStorageKey: string;
	onSaveDocument?: PhotonStudioProps["onSaveDocument"];
	replaceState: (
		document: PhotonDocument,
		resources?: PhotonResources,
		pageSettings?: PhotonPageSettings,
		site?: PhotonSite,
		options?: {
			workspace?: PhotonWorkspaceDescriptor;
			capabilities?: Partial<PhotonWorkspaceCapabilities>;
		},
	) => void;
	syncExternalState: (input: {
		initialDocument: PhotonDocument;
		initialResources?: PhotonResources;
		initialPageSettings?: PhotonPageSettings;
		initialSite?: PhotonSite;
		workspace?: PhotonWorkspaceDescriptor;
		capabilities?: Partial<PhotonWorkspaceCapabilities>;
	}) => void;
};

export const useStudioPersistence = ({
	initialDocument,
	initialResources,
	initialPageSettings,
	initialSite,
	contentRevision,
	persistedDocument,
	resources,
	pageSettings,
	site,
	isAdmin,
	workspace,
	capabilities,
	draftStorageKey,
	autosaveStorageKey,
	onSaveDocument,
	replaceState,
	syncExternalState,
}: UseStudioPersistenceProps) => {
	const normalizedWorkspace = useMemo(
		() => normalizePhotonStudioWorkspace(workspace),
		[workspace],
	);
	const normalizedCapabilities = useMemo(
		() => normalizePhotonStudioCapabilities(capabilities),
		[capabilities],
	);
	const workspaceKey = useMemo(
		() => resolvePhotonStudioWorkspaceKey(normalizedWorkspace),
		[normalizedWorkspace],
	);
	const draftStorageScopeKey = useMemo(
		() =>
			resolvePhotonStudioDraftStorageKey({
				baseKey: draftStorageKey,
				workspace: normalizedWorkspace,
			}),
		[draftStorageKey, normalizedWorkspace],
	);
	const canSaveDocument = useMemo(
		() =>
			canSavePhotonStudioDocument({
				isAdmin,
				workspace: normalizedWorkspace,
				capabilities: normalizedCapabilities,
			}),
		[isAdmin, normalizedCapabilities, normalizedWorkspace],
	);
	const [autosaveEnabled, setAutosaveEnabled] = useState(
		getDefaultPhotonAutosaveEnabled,
	);
	const [saveState, setSaveState] = useState<
		"idle" | "saving" | "saved" | "error"
	>("idle");
	const [hasHydrated, setHasHydrated] = useState(false);
	const [lastSavedRevision, setLastSavedRevision] = useState(0);
	const [lastSavedState, setLastSavedState] =
		useState<PhotonStudioSavePayload>(() => ({
			...createPhotonStudioSavePayload({
				workspace: clonePhotonValue(normalizedWorkspace),
				expectedHeadRevisionId: normalizedWorkspace.headRevisionId ?? null,
				saveMode: "manual",
				document: clonePhotonValue(initialDocument),
				resources: clonePhotonValue(initialResources),
				pageSettings: clonePhotonValue(initialPageSettings),
				site: clonePhotonValue(initialSite),
			}),
		}));
	const hasLoadedDraftRef = useRef<string | null>(null);
	const initialStateFingerprint = useMemo(
		() =>
			getPhotonStudioFingerprint(
				initialDocument,
				initialResources,
				initialPageSettings,
				initialSite,
				normalizedWorkspace,
			),
		[
			initialDocument,
			initialPageSettings,
			initialResources,
			initialSite,
			normalizedWorkspace,
		],
	);
	const hasUnsavedChanges = contentRevision !== lastSavedRevision;

	useEffect(() => {
		setLastSavedRevision(0);
		setLastSavedState(
			createPhotonStudioSavePayload({
				workspace: clonePhotonValue(normalizedWorkspace),
				expectedHeadRevisionId: normalizedWorkspace.headRevisionId ?? null,
				saveMode: "manual",
				document: clonePhotonValue(initialDocument),
				resources: clonePhotonValue(initialResources),
				pageSettings: clonePhotonValue(initialPageSettings),
				site: clonePhotonValue(initialSite),
			}),
		);
		setSaveState("idle");
	}, [
		initialDocument,
		initialPageSettings,
		initialResources,
		initialSite,
		draftStorageScopeKey,
	]);

	useEffect(() => {
		setLastSavedState((currentState) => ({
			...currentState,
			workspace: clonePhotonValue(normalizedWorkspace),
		}));
	}, [normalizedWorkspace]);

	useEffect(() => {
		if (
			!isAdmin ||
			hasLoadedDraftRef.current === workspaceKey ||
			typeof window === "undefined"
		) {
			return;
		}

		hasLoadedDraftRef.current = workspaceKey;
		let cancelled = false;

		void (async () => {
			try {
				const [storedAutosave, storedDraft] = await Promise.all([
					getStudioStorageItem<boolean>(autosaveStorageKey, {
						parseLegacy: parseBooleanStorageValue,
						serializeLegacy: String,
					}),
					getStudioStorageItem(draftStorageScopeKey, {
						parseLegacy: (rawValue) =>
							parsePersistedDraft(rawValue, initialDocument.updatedAt),
					}),
				]);

				if (cancelled) {
					return;
				}

				if (storedAutosave !== null) {
					setAutosaveEnabled(storedAutosave);
				}

				if (!storedDraft) {
					return;
				}

				if (
					storedDraft.workspaceKey !== null &&
					storedDraft.workspaceKey !== workspaceKey
				) {
					return;
				}

				if (
					getPhotonStudioFingerprint(
						storedDraft.payload.document,
						storedDraft.payload.resources,
						storedDraft.payload.pageSettings,
						storedDraft.payload.site,
						normalizedWorkspace,
					) === initialStateFingerprint
				) {
					return;
				}

				if (!canSaveDocument) {
					return;
				}

				replaceState(
					storedDraft.payload.document,
					storedDraft.payload.resources,
					storedDraft.payload.pageSettings,
					storedDraft.payload.site,
					{
						workspace: normalizedWorkspace,
						capabilities: normalizedCapabilities,
					},
				);
				toast.info("Draft restored", {
					description: "Recovered your local draft after reload.",
				});
			} finally {
				if (!cancelled) {
					setHasHydrated(true);
				}
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [
		autosaveStorageKey,
		canSaveDocument,
		draftStorageScopeKey,
		initialDocument,
		initialStateFingerprint,
		isAdmin,
		normalizedCapabilities,
		normalizedWorkspace,
		replaceState,
		workspaceKey,
	]);

	useEffect(() => {
		if (
			typeof window === "undefined" ||
			!isAdmin ||
			!hasHydrated ||
			!canSaveDocument
		) {
			return;
		}

		if (hasUnsavedChanges) {
			const timeoutId = window.setTimeout(() => {
				void setStudioStorageItem(draftStorageScopeKey, {
					workspaceKey,
					document: clonePhotonValue(persistedDocument),
					resources: clonePhotonValue(resources),
					pageSettings: clonePhotonValue(pageSettings),
					site: clonePhotonValue(site),
				});
			}, 180);

			return () => window.clearTimeout(timeoutId);
		}

		void removeStudioStorageItem(draftStorageScopeKey);
	}, [
		canSaveDocument,
		draftStorageScopeKey,
		hasHydrated,
		hasUnsavedChanges,
		isAdmin,
		pageSettings,
		persistedDocument,
		resources,
		site,
		workspaceKey,
	]);

	useEffect(() => {
		if (typeof window === "undefined" || !isAdmin || !hasHydrated) {
			return;
		}

		void setStudioStorageItem(autosaveStorageKey, autosaveEnabled, {
			serializeLegacy: String,
		});
	}, [autosaveEnabled, autosaveStorageKey, hasHydrated, isAdmin]);

	const saveDocument = useCallback(
		async (reason: PhotonStudioSaveReason) => {
			if (!canSaveDocument || saveState === "saving") {
				if (reason !== "autosave" && isAdmin) {
					toast.error("Save unavailable", {
						description:
							"This workspace is readonly or direct commits are currently blocked.",
					});
				}

				return;
			}

			setSaveState("saving");

			try {
				const persistedState =
					(await onSaveDocument?.(
						createPhotonStudioSavePayload({
							workspace: normalizedWorkspace,
							expectedHeadRevisionId:
								lastSavedState.expectedHeadRevisionId ??
								normalizedWorkspace.headRevisionId ??
								null,
							saveMode: reason,
							document: persistedDocument,
							resources,
							pageSettings,
							site,
						}),
						{
							reason,
							workspace: normalizedWorkspace,
							capabilities: normalizedCapabilities,
						},
					)) ??
					createPhotonStudioSavePayload({
						workspace: normalizedWorkspace,
						expectedHeadRevisionId:
							lastSavedState.expectedHeadRevisionId ??
							normalizedWorkspace.headRevisionId ??
							null,
						saveMode: reason,
						document: persistedDocument,
						resources,
						pageSettings,
						site,
					});

				syncExternalState({
					initialDocument: persistedState.document,
					initialResources: persistedState.resources,
					initialPageSettings: persistedState.pageSettings,
					initialSite: persistedState.site,
					workspace: persistedState.workspace ?? normalizedWorkspace,
					capabilities: normalizedCapabilities,
				});
				setLastSavedState(
					createPhotonStudioSavePayload({
						workspace: clonePhotonValue(
							persistedState.workspace ?? normalizedWorkspace,
						),
						expectedHeadRevisionId:
							persistedState.expectedHeadRevisionId ??
							persistedState.workspace?.headRevisionId ??
							normalizedWorkspace.headRevisionId ??
							null,
						saveMode: persistedState.saveMode,
						document: clonePhotonValue(persistedState.document),
						resources: clonePhotonValue(persistedState.resources),
						pageSettings: clonePhotonValue(persistedState.pageSettings),
						site: clonePhotonValue(persistedState.site),
					}),
				);
				setLastSavedRevision(0);
				setSaveState("saved");

				if (reason !== "autosave") {
					toast.success("Saved successfully", {
						description: "Document changes were saved successfully.",
					});
				}
			} catch (error) {
				setSaveState("error");
				toast.error("Save failed", {
					description:
						error instanceof Error
							? error.message
							: "Failed to save the document.",
				});
			}
		},
		[
			canSaveDocument,
			contentRevision,
			isAdmin,
			normalizedCapabilities,
			normalizedWorkspace,
			onSaveDocument,
			pageSettings,
			persistedDocument,
			replaceState,
			resources,
			saveState,
			site,
			syncExternalState,
			lastSavedState.expectedHeadRevisionId,
		],
	);

	const restoreLastSavedState = useCallback(() => {
		syncExternalState({
			initialDocument: clonePhotonValue(lastSavedState.document),
			initialResources: clonePhotonValue(lastSavedState.resources),
			initialPageSettings: clonePhotonValue(
				lastSavedState.pageSettings,
			),
			initialSite: clonePhotonValue(lastSavedState.site),
			workspace: lastSavedState.workspace ?? normalizedWorkspace,
			capabilities: normalizedCapabilities,
		});
		setLastSavedRevision(0);
	}, [
		lastSavedState,
		normalizedCapabilities,
		normalizedWorkspace,
		syncExternalState,
	]);

	useEffect(() => {
		if (!canSaveDocument || !autosaveEnabled || !hasUnsavedChanges) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			void saveDocument("autosave");
		}, 900);

		return () => window.clearTimeout(timeoutId);
	}, [
		autosaveEnabled,
		canSaveDocument,
		contentRevision,
		hasUnsavedChanges,
		saveDocument,
	]);

	useEffect(() => {
		if (saveState === "idle" || saveState === "saving") {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setSaveState("idle");
		}, 2200);

		return () => window.clearTimeout(timeoutId);
	}, [saveState]);

	return {
		autosaveEnabled,
		canSaveDocument,
		setAutosaveEnabled,
		hasUnsavedChanges,
		lastSavedState,
		restoreLastSavedState,
		saveState,
		saveDocument,
		expectedHeadRevisionId: lastSavedState.expectedHeadRevisionId,
	};
};
