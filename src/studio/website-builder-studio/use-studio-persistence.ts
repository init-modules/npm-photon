"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { cloneWebsiteBuilderValue } from "../../helpers/path";
import type {
	WebsiteBuilderDocument,
	WebsiteBuilderPageSettings,
	WebsiteBuilderResources,
	WebsiteBuilderSite,
	WebsiteBuilderWorkspaceCapabilities,
	WebsiteBuilderWorkspaceDescriptor,
} from "../../types";
import type {
	WebsiteBuilderStudioProps,
	WebsiteBuilderStudioSavePayload,
	WebsiteBuilderStudioSaveReason,
} from "../types";
import {
	canSaveWebsiteBuilderStudioDocument,
	createWebsiteBuilderStudioSavePayload,
	getDefaultWebsiteBuilderAutosaveEnabled,
	getWebsiteBuilderStudioFingerprint,
	normalizeWebsiteBuilderStudioCapabilities,
	normalizeWebsiteBuilderStudioWorkspace,
	parseBooleanStorageValue,
	parsePersistedDraft,
	resolveWebsiteBuilderStudioDraftStorageKey,
	resolveWebsiteBuilderStudioWorkspaceKey,
} from "./persistence-helpers";
import {
	getStudioStorageItem,
	removeStudioStorageItem,
	setStudioStorageItem,
} from "./studio-browser-storage";

type UseStudioPersistenceProps = {
	initialDocument: WebsiteBuilderDocument;
	initialResources: WebsiteBuilderResources;
	initialPageSettings: WebsiteBuilderPageSettings;
	initialSite: WebsiteBuilderSite;
	contentRevision: number;
	persistedDocument: WebsiteBuilderDocument;
	resources: WebsiteBuilderResources;
	pageSettings: WebsiteBuilderPageSettings;
	site: WebsiteBuilderSite;
	isAdmin: boolean;
	workspace?: WebsiteBuilderWorkspaceDescriptor;
	capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
	draftStorageKey: string;
	autosaveStorageKey: string;
	onSaveDocument?: WebsiteBuilderStudioProps["onSaveDocument"];
	replaceState: (
		document: WebsiteBuilderDocument,
		resources?: WebsiteBuilderResources,
		pageSettings?: WebsiteBuilderPageSettings,
		site?: WebsiteBuilderSite,
		options?: {
			workspace?: WebsiteBuilderWorkspaceDescriptor;
			capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
		},
	) => void;
	syncExternalState: (input: {
		initialDocument: WebsiteBuilderDocument;
		initialResources?: WebsiteBuilderResources;
		initialPageSettings?: WebsiteBuilderPageSettings;
		initialSite?: WebsiteBuilderSite;
		workspace?: WebsiteBuilderWorkspaceDescriptor;
		capabilities?: Partial<WebsiteBuilderWorkspaceCapabilities>;
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
		() => normalizeWebsiteBuilderStudioWorkspace(workspace),
		[workspace],
	);
	const normalizedCapabilities = useMemo(
		() => normalizeWebsiteBuilderStudioCapabilities(capabilities),
		[capabilities],
	);
	const workspaceKey = useMemo(
		() => resolveWebsiteBuilderStudioWorkspaceKey(normalizedWorkspace),
		[normalizedWorkspace],
	);
	const draftStorageScopeKey = useMemo(
		() =>
			resolveWebsiteBuilderStudioDraftStorageKey({
				baseKey: draftStorageKey,
				workspace: normalizedWorkspace,
			}),
		[draftStorageKey, normalizedWorkspace],
	);
	const canSaveDocument = useMemo(
		() =>
			canSaveWebsiteBuilderStudioDocument({
				isAdmin,
				workspace: normalizedWorkspace,
				capabilities: normalizedCapabilities,
			}),
		[isAdmin, normalizedCapabilities, normalizedWorkspace],
	);
	const [autosaveEnabled, setAutosaveEnabled] = useState(
		getDefaultWebsiteBuilderAutosaveEnabled,
	);
	const [saveState, setSaveState] = useState<
		"idle" | "saving" | "saved" | "error"
	>("idle");
	const [hasHydrated, setHasHydrated] = useState(false);
	const [lastSavedRevision, setLastSavedRevision] = useState(0);
	const [lastSavedState, setLastSavedState] =
		useState<WebsiteBuilderStudioSavePayload>(() => ({
			...createWebsiteBuilderStudioSavePayload({
				workspace: cloneWebsiteBuilderValue(normalizedWorkspace),
				expectedHeadRevisionId: normalizedWorkspace.headRevisionId ?? null,
				saveMode: "manual",
				document: cloneWebsiteBuilderValue(initialDocument),
				resources: cloneWebsiteBuilderValue(initialResources),
				pageSettings: cloneWebsiteBuilderValue(initialPageSettings),
				site: cloneWebsiteBuilderValue(initialSite),
			}),
		}));
	const hasLoadedDraftRef = useRef<string | null>(null);
	const initialStateFingerprint = useMemo(
		() =>
			getWebsiteBuilderStudioFingerprint(
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
			createWebsiteBuilderStudioSavePayload({
				workspace: cloneWebsiteBuilderValue(normalizedWorkspace),
				expectedHeadRevisionId: normalizedWorkspace.headRevisionId ?? null,
				saveMode: "manual",
				document: cloneWebsiteBuilderValue(initialDocument),
				resources: cloneWebsiteBuilderValue(initialResources),
				pageSettings: cloneWebsiteBuilderValue(initialPageSettings),
				site: cloneWebsiteBuilderValue(initialSite),
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
			workspace: cloneWebsiteBuilderValue(normalizedWorkspace),
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
					getWebsiteBuilderStudioFingerprint(
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
					document: cloneWebsiteBuilderValue(persistedDocument),
					resources: cloneWebsiteBuilderValue(resources),
					pageSettings: cloneWebsiteBuilderValue(pageSettings),
					site: cloneWebsiteBuilderValue(site),
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
		async (reason: WebsiteBuilderStudioSaveReason) => {
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
						createWebsiteBuilderStudioSavePayload({
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
					createWebsiteBuilderStudioSavePayload({
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
					createWebsiteBuilderStudioSavePayload({
						workspace: cloneWebsiteBuilderValue(
							persistedState.workspace ?? normalizedWorkspace,
						),
						expectedHeadRevisionId:
							persistedState.expectedHeadRevisionId ??
							persistedState.workspace?.headRevisionId ??
							normalizedWorkspace.headRevisionId ??
							null,
						saveMode: persistedState.saveMode,
						document: cloneWebsiteBuilderValue(persistedState.document),
						resources: cloneWebsiteBuilderValue(persistedState.resources),
						pageSettings: cloneWebsiteBuilderValue(persistedState.pageSettings),
						site: cloneWebsiteBuilderValue(persistedState.site),
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
			initialDocument: cloneWebsiteBuilderValue(lastSavedState.document),
			initialResources: cloneWebsiteBuilderValue(lastSavedState.resources),
			initialPageSettings: cloneWebsiteBuilderValue(
				lastSavedState.pageSettings,
			),
			initialSite: cloneWebsiteBuilderValue(lastSavedState.site),
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
