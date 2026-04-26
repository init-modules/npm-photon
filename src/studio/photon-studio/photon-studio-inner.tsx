"use client";

import {
	DndContext,
	DragOverlay,
	type Modifier,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	startTransition,
	useCallback,
	useDeferredValue,
	useEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import {
	usePhotonPersistedState,
	usePhotonStore,
} from "../../context/photon-context";
import { getPhotonSelectedBlock } from "../../context/photon-store";
import {
	getPhotonSurfaceRegionListId,
	PHOTON_PAGE_SURFACE_REGION_KEY,
} from "../../helpers/site";
import {
	mergePhotonStudioUrlState,
	parsePhotonStudioUrlState,
} from "../../helpers/studio-url-state";
import { PhotonSearchHighlightEffect } from "../../search/photon-search-highlight-effect";
import type { PhotonMode } from "../../types";
import { BlockOverlayCard } from "../canvas";
import { PHOTON_EDITOR_DOCK_FALLBACK_HEIGHT } from "../editor-dock/editor-dock";
import { PaletteOverlayCard } from "../palette-panel";
import { photonCollisionDetection } from "../shared";
import type { PaletteDefinition, PhotonStudioProps } from "../types";
import { useStudioBrowserPreferences } from "./use-studio-browser-preferences";
import { useStudioDefinitionCatalog } from "./use-studio-definition-catalog";
import { useStudioDragState } from "./use-studio-drag-state";
import { useStudioPersistence } from "./use-studio-persistence";
import { useStudioSidebars } from "./use-studio-sidebars";
import { useStudioSiteSettingChange } from "./use-studio-site-setting-change";
import { PhotonStage } from "./photon-stage";

type PhotonStudioInnerProps = {
	initialDocument: PhotonStudioProps["initialDocument"];
	initialResources?: PhotonStudioProps["initialResources"];
	initialPageSettings?: PhotonStudioProps["initialPageSettings"];
	initialSite?: PhotonStudioProps["initialSite"];
	workspace?: PhotonStudioProps["workspace"];
	capabilities?: PhotonStudioProps["capabilities"];
	history?: PhotonStudioProps["history"];
	branchPolicy?: PhotonStudioProps["branchPolicy"];
	mergePreview?: PhotonStudioProps["mergePreview"];
	canManage: boolean;
	initialMode: PhotonStudioProps["initialMode"];
	draftStorageKey: string;
	autosaveStorageKey: string;
	currentPage?: PhotonStudioProps["currentPage"];
	pages?: PhotonStudioProps["pages"];
	onRequestAuth?: () => void;
	onLogout?: () => void | Promise<void>;
	onContentLocaleChange?: PhotonStudioProps["onContentLocaleChange"];
	onInterfaceLocaleChange?: PhotonStudioProps["onInterfaceLocaleChange"];
	onModeChange?: PhotonStudioProps["onModeChange"];
	onSiteSettingChange?: PhotonStudioProps["onSiteSettingChange"];
	onSaveDocument?: PhotonStudioProps["onSaveDocument"];
	onOpenPage?: PhotonStudioProps["onOpenPage"];
	onCreatePage?: PhotonStudioProps["onCreatePage"];
	activeSearchHighlight?: PhotonStudioProps["activeSearchHighlight"];
	hydrateModePreference?: PhotonStudioProps["hydrateModePreference"];
	showInterfaceLocaleControl?: PhotonStudioProps["showInterfaceLocaleControl"];
	workspaceControl?: PhotonStudioProps["workspaceControl"];
	title: string;
	description: string;
		renderContentNotice?: PhotonStudioProps["renderContentNotice"];
		siteSettingsSubtabs?: PhotonStudioProps["siteSettingsSubtabs"];
		componentLibraryUsageProvider?: PhotonStudioProps["componentLibraryUsageProvider"];
	};

export const PhotonStudioInner = ({
	initialDocument,
	initialResources = {},
	initialPageSettings = {},
	initialSite = {
		settings: {},
		regions: {},
	},
	workspace,
	capabilities,
	history: _history,
	branchPolicy: _branchPolicy,
	mergePreview: _mergePreview,
	canManage,
	initialMode = "preview",
	draftStorageKey,
	autosaveStorageKey,
	currentPage,
	pages = [],
	onRequestAuth,
	onLogout,
	onContentLocaleChange,
	onInterfaceLocaleChange,
	onModeChange,
	onSiteSettingChange,
	onSaveDocument,
	onOpenPage,
	onCreatePage,
	activeSearchHighlight,
	hydrateModePreference = true,
	showInterfaceLocaleControl = true,
	workspaceControl,
	title,
	description,
		renderContentNotice,
		siteSettingsSubtabs,
		componentLibraryUsageProvider,
	}: PhotonStudioInnerProps) => {
	const document = usePhotonStore((state) => state.document);
	const contentRevision = usePhotonStore(
		(state) => state.contentRevision,
	);
	const {
		document: persistedDocument,
		resources,
		pageSettings,
		site,
	} = usePhotonPersistedState();
	const mode = usePhotonStore((state) => state.mode);
	const setMode = usePhotonStore((state) => state.setMode);
	const isAdmin = usePhotonStore((state) => state.isAdmin);
	const registry = usePhotonStore((state) => state.registry);
	const selectedBlockId = usePhotonStore(
		(state) => state.selectedBlockId,
	);
	const selectedBlock = usePhotonStore((state) =>
		getPhotonSelectedBlock(state),
	);
	const selectedField = usePhotonStore((state) => state.selectedField);
	const selectBlock = usePhotonStore((state) => state.selectBlock);
	const selectedInspectorTriggerId = usePhotonStore(
		(state) => state.selectedInspectorTriggerId,
	);
	const selectInspectorTrigger = usePhotonStore(
		(state) => state.selectInspectorTrigger,
	);
	const selectedCanvasTriggerStageId = usePhotonStore(
		(state) => state.selectedCanvasTriggerStageId,
	);
	const selectCanvasTriggerStage = usePhotonStore(
		(state) => state.selectCanvasTriggerStage,
	);
	const selectedInteractionInstanceId = usePhotonStore(
		(state) => state.selectedInteractionInstanceId,
	);
	const selectInteractionInstance = usePhotonStore(
		(state) => state.selectInteractionInstance,
	);
	const selectPageSettingField = usePhotonStore(
		(state) => state.selectPageSettingField,
	);
	const selectSiteSettingField = usePhotonStore(
		(state) => state.selectSiteSettingField,
	);
	const updatePageSettingValue = usePhotonStore(
		(state) => state.updatePageSettingValue,
	);
	const getPageSettingValue = usePhotonStore(
		(state) => state.getPageSettingValue,
	);
	const updateSiteSettingValue = usePhotonStore(
		(state) => state.updateSiteSettingValue,
	);
	const getSiteSettingValue = usePhotonStore(
		(state) => state.getSiteSettingValue,
	);
	const interactionSurfaces = usePhotonStore(
		(state) => state.interactionSurfaces,
	);
	const interactionActions = usePhotonStore((state) => state.interactionActions);
	const interactionGuards = usePhotonStore((state) => state.interactionGuards);
	const interactionPolicies = usePhotonStore(
		(state) => state.interactionPolicies,
	);
	const conditionDefinitions = usePhotonStore(
		(state) => state.conditionDefinitions,
	);
	const conditionEvaluators = usePhotonStore(
		(state) => state.conditionEvaluators,
	);
	const siteDataSchemas = usePhotonStore((state) => state.siteDataSchemas);
	const openInteractionSurface = usePhotonStore(
		(state) => state.openInteractionSurface,
	);
	const showInteractionToast = usePhotonStore(
		(state) => state.showInteractionToast,
	);
	const executeInteractionAction = usePhotonStore(
		(state) => state.executeInteractionAction,
	);
	const insertBlock = usePhotonStore((state) => state.insertBlock);
	const moveBlock = usePhotonStore((state) => state.moveBlock);
	const replaceState = usePhotonStore((state) => state.replaceState);
	const syncExternalState = usePhotonStore(
		(state) => state.syncExternalState,
	);
	const collapseAllBlocks = usePhotonStore(
		(state) => state.collapseAllBlocks,
	);
	const expandAllBlocks = usePhotonStore(
		(state) => state.expandAllBlocks,
	);
	const collapsedBlockCount = usePhotonStore(
		(state) => Object.keys(state.collapsedBlockIds).length,
	);
	const [search, setSearch] = useState("");
	const [paletteFamily, setPaletteFamily] = useState("all");
	const [palettePackage, setPalettePackage] = useState("all");
	const [selectedPaletteKey, setSelectedPaletteKey] = useState<string | null>(
		null,
	);
	const [manualInsertTarget, setManualInsertTarget] = useState<{
		listId: string;
		index: number;
	} | null>(null);
	const [paletteCollapsedGroups, setPaletteCollapsedGroups] = useState<
		string[]
	>([]);
	const [paletteCollapsedFamilies, setPaletteCollapsedFamilies] = useState<
		string[]
	>([]);
	const [dockHeight, setDockHeight] = useState(
		PHOTON_EDITOR_DOCK_FALLBACK_HEIGHT,
	);
	const [showCollapsedInPreview, setShowCollapsedInPreview] = useState(false);
	const [hasMounted, setHasMounted] = useState(false);
	const lastExternalModeRef = useRef(initialMode);
	const deferredSearch = useDeferredValue(search);
	const builderEnabled = isAdmin && mode === "builder";
	const contentEnabled = isAdmin && mode === "content";
	const structureModeEnabled = isAdmin && mode === "builder";
	const activeMode = isAdmin ? mode : "preview";
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
	);
	const {
		leftWidth,
		rightWidth,
		leftCollapsed,
		rightCollapsed,
		toggleLeftCollapsed,
		toggleRightCollapsed,
		expandLeft,
		expandRight,
		isResizing,
		startResize,
	} = useStudioSidebars({
		storageKey: `${draftStorageKey}:sidebars`,
	});

	const {
		autosaveEnabled,
		setAutosaveEnabled,
		hasUnsavedChanges,
		restoreLastSavedState,
		saveState,
		saveDocument,
		expectedHeadRevisionId,
	} = useStudioPersistence({
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
	});

	const handleSiteSettingChange = useStudioSiteSettingChange({
		workspace,
		expectedHeadRevisionId,
		document: persistedDocument,
		resources,
		pageSettings,
		site,
		currentPage: currentPage ?? null,
		updateSiteSettingValue,
		onSiteSettingChange,
		replaceState,
	});
	const flushActiveInlineField = useCallback(async () => {
		if (typeof window !== "undefined") {
			const activeElement = window.document.activeElement;

			if (activeElement instanceof HTMLElement) {
				activeElement.blur();
			}
		}

		await new Promise<void>((resolve) => {
			if (typeof window === "undefined") {
				resolve();
				return;
			}

			window.requestAnimationFrame(() => resolve());
		});
	}, []);
	const saveDocumentManually = useCallback(async () => {
		await flushActiveInlineField();
		await saveDocument("manual");
	}, [flushActiveInlineField, saveDocument]);

	const { builderSurfaceMode, setBuilderSurfaceMode } =
		useStudioBrowserPreferences({
			isAdmin,
			mode,
			setMode,
			draftStorageKey,
			hydrateModePreference,
			onManualSave: () => void saveDocumentManually(),
		});
	const initialStudioUrlState =
		typeof window === "undefined"
			? {}
			: parsePhotonStudioUrlState(window.location.search);
	const [paletteTab, setPaletteTab] = useState<"blocks" | "library">(
		initialStudioUrlState.paletteTab ?? "blocks",
	);
	const [selectedLibraryItemId, setSelectedLibraryItemId] = useState<
		string | null
	>(initialStudioUrlState.library ?? null);
	const [interactionTab, setInteractionTab] = useState(
		initialStudioUrlState.interactionTab ?? "actions",
	);
	const [selectedInteractionActionId, setSelectedInteractionActionId] =
		useState<string | null>(initialStudioUrlState.action ?? null);
	const [selectedInteractionGuardId, setSelectedInteractionGuardId] =
		useState<string | null>(initialStudioUrlState.guard ?? null);
	const [selectedInteractionPolicyId, setSelectedInteractionPolicyId] =
		useState<string | null>(initialStudioUrlState.policy ?? null);
	const [selectedDataFieldId, setSelectedDataFieldId] = useState<
		string | null
	>(initialStudioUrlState.dataField ?? null);
	const [selectedInteractionScenarioId, setSelectedInteractionScenarioId] =
		useState<string | null>(initialStudioUrlState.scenario ?? null);
	const [selectedInteractionSurfaceId, setSelectedInteractionSurfaceId] =
		useState<string | null>(initialStudioUrlState.surface ?? null);
	const [selectedInteractionToastId, setSelectedInteractionToastId] = useState<
		string | null
	>(initialStudioUrlState.toast ?? null);

	useEffect(() => {
		if (initialStudioUrlState.trigger) {
			selectInspectorTrigger(initialStudioUrlState.trigger);
		}
	}, [initialStudioUrlState.trigger, selectInspectorTrigger]);

	useEffect(() => {
		if (initialStudioUrlState.canvasTrigger) {
			selectCanvasTriggerStage(initialStudioUrlState.canvasTrigger);
		}
	}, [initialStudioUrlState.canvasTrigger, selectCanvasTriggerStage]);

	// When the inspector requests "Open instance" navigation via
	// `selectInteractionInstance(id)`, switch the builder to the
	// interaction-surfaces editor and mirror the id into the local
	// surface selection so InteractionSurfacesSurface can scroll/highlight it.
	// The store action is consumed (set back to null) once the navigation
	// has been applied to avoid loops on subsequent re-renders.
	useEffect(() => {
		if (!selectedInteractionInstanceId) {
			return;
		}
		setBuilderSurfaceMode("interactions");
		setSelectedInteractionSurfaceId(selectedInteractionInstanceId);
		selectInteractionInstance(null);
	}, [
		selectedInteractionInstanceId,
		selectInteractionInstance,
		setBuilderSurfaceMode,
	]);

	useEffect(() => {
		if (typeof window === "undefined" || !isAdmin) {
			return;
		}

		const syncFromUrl = () => {
			const state = parsePhotonStudioUrlState(window.location.search);

			if (state.mode) {
				setMode(state.mode);
			}

			if (state.builderSurface) {
				setBuilderSurfaceMode(state.builderSurface);
			}

			if (state.paletteTab) {
				setPaletteTab(state.paletteTab);
			}

			if (state.interactionTab) {
				setInteractionTab(state.interactionTab);
			}

			setSelectedLibraryItemId(state.library ?? null);
			setSelectedInteractionActionId(state.action ?? null);
			setSelectedInteractionGuardId(state.guard ?? null);
			setSelectedInteractionScenarioId(state.scenario ?? null);
			setSelectedInteractionSurfaceId(state.surface ?? null);
			setSelectedInteractionToastId(state.toast ?? null);

			selectBlock(state.block ?? null);
			selectInspectorTrigger(state.trigger ?? null);
			selectCanvasTriggerStage(state.canvasTrigger ?? null);
		};

		window.addEventListener("popstate", syncFromUrl);

		return () => window.removeEventListener("popstate", syncFromUrl);
	}, [
		isAdmin,
		selectBlock,
		selectCanvasTriggerStage,
		selectInspectorTrigger,
		setBuilderSurfaceMode,
		setMode,
	]);

	useEffect(() => {
		if (typeof window === "undefined" || !isAdmin) {
			return;
		}

		const current = parsePhotonStudioUrlState(window.location.search);

		if (current.mode === mode && current.builderSurface === builderSurfaceMode) {
			return;
		}

		const nextSearch = mergePhotonStudioUrlState(window.location.search, {
			mode,
			builderSurface: builderSurfaceMode,
		});
		const nextUrl = `${window.location.pathname}?${nextSearch.toString()}${window.location.hash}`;

		window.history.pushState(null, "", nextUrl);
	}, [builderSurfaceMode, isAdmin, mode]);

	useEffect(() => {
		if (typeof window === "undefined" || !isAdmin) {
			return;
		}

			const timeoutId = window.setTimeout(() => {
				const nextSearch = mergePhotonStudioUrlState(window.location.search, {
					block: selectedBlockId ?? null,
					trigger: selectedInspectorTriggerId ?? null,
					canvasTrigger: selectedCanvasTriggerStageId ?? null,
					paletteTab,
					library: selectedLibraryItemId ?? null,
					interactionTab,
					action: selectedInteractionActionId ?? null,
					guard: selectedInteractionGuardId ?? null,
					policy: selectedInteractionPolicyId ?? null,
					dataField: selectedDataFieldId ?? null,
					scenario: selectedInteractionScenarioId ?? null,
					surface: selectedInteractionSurfaceId ?? null,
					toast: selectedInteractionToastId ?? null,
				});
			const nextUrl = `${window.location.pathname}?${nextSearch.toString()}${window.location.hash}`;

			window.history.replaceState(null, "", nextUrl);
		}, 120);

		return () => window.clearTimeout(timeoutId);
	}, [
		isAdmin,
		paletteTab,
		interactionTab,
		selectedBlockId,
		selectedInspectorTriggerId,
		selectedCanvasTriggerStageId,
		selectedInteractionActionId,
		selectedInteractionGuardId,
		selectedInteractionPolicyId,
		selectedDataFieldId,
		selectedInteractionScenarioId,
		selectedInteractionSurfaceId,
		selectedInteractionToastId,
		selectedLibraryItemId,
	]);
	const {
		allPaletteBlocks,
		paletteGroups,
		definitionFields,
		inspectorGroups,
		inspectorDefinition,
		visiblePageSettingsPanels,
		visibleSiteSettingsPanels,
	} = useStudioDefinitionCatalog({
		registry,
		selectedBlock,
		selectedPaletteKey,
		currentPage: currentPage ?? null,
		pageSettings,
		site,
		search: deferredSearch,
		paletteFamily,
		palettePackage,
	});
	const {
		activeBlock,
		activeDragKind,
		activePaletteDefinition,
		paletteOverlayOrigin,
		dropTarget,
		handleDragCancel,
		handleDragEnd,
		handleDragOver,
		handleDragStart,
	} = useStudioDragState({
		builderEnabled,
		document,
		allPaletteBlocks,
		selectedBlockId,
		selectedBlock,
		insertBlock,
		moveBlock,
		selectBlock,
		onClearPaletteSelection: () => setSelectedPaletteKey(null),
	});
	const mainPaddingTop = canManage ? dockHeight : 0;
	const respectsCollapsedState = structureModeEnabled || showCollapsedInPreview;
	const dragOverlayModifiers: Modifier[] =
		activeDragKind === "palette" && paletteOverlayOrigin
			? [
					({ transform }) => ({
						...transform,
						x: transform.x + paletteOverlayOrigin.x,
						y: transform.y + paletteOverlayOrigin.y,
					}),
				]
			: [];

	useEffect(() => {
		setHasMounted(true);
	}, []);

	const togglePaletteFamily = (family: string) => {
		setPaletteCollapsedFamilies((current) =>
			current.includes(family)
				? current.filter((candidate) => candidate !== family)
				: [...current, family],
		);
	};

	useEffect(() => {
		if (!isAdmin || lastExternalModeRef.current === initialMode) {
			return;
		}

		lastExternalModeRef.current = initialMode;
		startTransition(() => {
			setMode(initialMode);
		});
	}, [initialMode, isAdmin, setMode]);

	const handleModeChange = (nextMode: PhotonMode) => {
		if (!isAdmin && nextMode !== "preview") {
			return;
		}

		startTransition(() => {
			setMode(nextMode);
		});
		void onModeChange?.(nextMode);
	};

	const handlePaletteInsert = (definition: PaletteDefinition) => {
		const target = manualInsertTarget ?? {
			listId: getPhotonSurfaceRegionListId(
				PHOTON_PAGE_SURFACE_REGION_KEY,
			),
			index: persistedDocument.blocks.length,
		};

		insertBlock({
			module: definition.module,
			type: definition.type,
			listId: target.listId,
			index: target.index,
		});
		setSelectedPaletteKey(definition.key);
		setManualInsertTarget(null);
	};

	const handlePaletteSelect = (definition: PaletteDefinition) => {
		setSelectedPaletteKey(definition.key);
		selectBlock(null);
	};

	const togglePaletteGroup = (group: string) => {
		setPaletteCollapsedGroups((current) =>
			current.includes(group)
				? current.filter((candidate) => candidate !== group)
				: [...current, group],
		);
	};

	const contentNotice = renderContentNotice ?? null;

	return (
		<div className="relative min-h-screen">
			<PhotonSearchHighlightEffect
				activeHighlight={activeSearchHighlight}
			/>
			<DndContext
				id="photon-studio"
				sensors={sensors}
				collisionDetection={photonCollisionDetection}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
			>
				<PhotonStage
					activeMode={activeMode}
					canManage={canManage}
					hasUnsavedChanges={hasUnsavedChanges}
					collapsedBlockCount={collapsedBlockCount}
					autosaveEnabled={autosaveEnabled}
					saveState={saveState}
					showCollapsedInPreview={showCollapsedInPreview}
					title={title}
					description={description}
					onHeightChange={setDockHeight}
					onAuthOpen={() => onRequestAuth?.()}
					onAutosaveChange={setAutosaveEnabled}
					onCollapseAll={collapseAllBlocks}
					onExpandAll={expandAllBlocks}
					onLogout={() => void onLogout?.()}
					onContentLocaleChange={(locale) =>
						void onContentLocaleChange?.(locale)
					}
					onInterfaceLocaleChange={(locale) =>
						void onInterfaceLocaleChange?.(locale)
					}
					showInterfaceLocaleControl={showInterfaceLocaleControl}
					workspaceControl={workspaceControl}
					onModeChange={handleModeChange}
					onPreviewCollapsedChange={() =>
						setShowCollapsedInPreview((current) => !current)
					}
					onReset={() => {
						restoreLastSavedState();
						showInteractionToast({
							templateId: "photon:local-draft-reverted",
						});
					}}
					onSave={() => void saveDocumentManually()}
					currentPage={currentPage ?? null}
					pages={pages}
					onOpenPage={(page) => void onOpenPage?.(page, { mode: activeMode })}
					onCreatePage={async (input) =>
						onCreatePage?.(input, {
							mode: activeMode,
							document: persistedDocument,
							resources,
							pageSettings,
							site,
							currentPage: currentPage ?? null,
						})
					}
					builderEnabled={builderEnabled}
					builderSurfaceMode={builderSurfaceMode}
					paletteTab={paletteTab}
					selectedLibraryItemId={selectedLibraryItemId}
					selectedInteractionSurfaceId={selectedInteractionSurfaceId}
					selectedInteractionToastId={selectedInteractionToastId}
					contentEnabled={contentEnabled}
					dockHeight={dockHeight}
					isResizing={isResizing}
					leftSidebarWidth={leftWidth}
					rightSidebarWidth={rightWidth}
					leftCollapsed={leftCollapsed}
					rightCollapsed={rightCollapsed}
					mainPaddingTop={mainPaddingTop}
					document={document}
					isDragging={activeDragKind !== null}
					manualInsertTarget={manualInsertTarget}
					dropTarget={dropTarget}
					structureModeEnabled={structureModeEnabled}
					respectsCollapsedState={respectsCollapsedState}
					onActivateInsertTarget={setManualInsertTarget}
					contentNotice={contentNotice}
					search={search}
					onSearchChange={setSearch}
					allPaletteBlocks={allPaletteBlocks}
					paletteGroups={paletteGroups}
					paletteFamily={paletteFamily}
					onPaletteFamilyChange={setPaletteFamily}
					palettePackage={palettePackage}
					onPalettePackageChange={setPalettePackage}
					collapsedFamilies={paletteCollapsedFamilies}
					onToggleFamily={togglePaletteFamily}
					collapsedGroups={paletteCollapsedGroups}
					onToggleGroup={togglePaletteGroup}
					selectedDefinitionKey={selectedPaletteKey}
					onSelectDefinition={handlePaletteSelect}
					onInsert={handlePaletteInsert}
					definitionFields={definitionFields}
					inspectorGroups={inspectorGroups}
					selectedFieldPath={selectedField?.path ?? null}
					inspectorDefinition={inspectorDefinition}
					pageSettings={pageSettings}
					pageSettingsPanels={visiblePageSettingsPanels}
					site={site}
					interactionSurfaces={interactionSurfaces}
					interactionActions={interactionActions}
					interactionGuards={interactionGuards}
					interactionPolicies={interactionPolicies}
					conditionDefinitions={conditionDefinitions}
					conditionEvaluators={conditionEvaluators}
					siteDataSchemas={siteDataSchemas}
					selectedDataFieldId={selectedDataFieldId}
					onSelectedDataFieldChange={setSelectedDataFieldId}
					interactionTab={interactionTab}
					selectedInteractionActionId={selectedInteractionActionId}
					selectedInteractionGuardId={selectedInteractionGuardId}
					selectedInteractionPolicyId={selectedInteractionPolicyId}
					selectedInteractionScenarioId={selectedInteractionScenarioId}
					openInteractionSurface={openInteractionSurface}
					showInteractionToast={showInteractionToast}
					executeInteractionAction={executeInteractionAction}
					componentLibraryUsageProvider={componentLibraryUsageProvider}
					siteSettingsPanels={visibleSiteSettingsPanels}
					siteSettingsSubtabs={siteSettingsSubtabs ?? []}
					onPageSettingFocus={selectPageSettingField}
					onPageSettingChange={updatePageSettingValue}
					getPageSettingValue={getPageSettingValue}
					onSiteSettingFocus={selectSiteSettingField}
					onSiteSettingChange={handleSiteSettingChange}
					getSiteSettingValue={getSiteSettingValue}
					onBuilderSurfaceModeChange={setBuilderSurfaceMode}
					onPaletteTabChange={setPaletteTab}
					onLibraryItemSelect={setSelectedLibraryItemId}
					onInteractionTabChange={setInteractionTab}
					onInteractionActionSelect={setSelectedInteractionActionId}
					onInteractionGuardSelect={setSelectedInteractionGuardId}
					onInteractionPolicySelect={setSelectedInteractionPolicyId}
					onInteractionScenarioSelect={setSelectedInteractionScenarioId}
					onInteractionSurfaceSelect={setSelectedInteractionSurfaceId}
					onInteractionToastSelect={setSelectedInteractionToastId}
					onToggleLeftCollapsed={toggleLeftCollapsed}
					onToggleRightCollapsed={toggleRightCollapsed}
					onExpandLeft={expandLeft}
					onExpandRight={expandRight}
					onResizeStart={startResize}
				/>

				{hasMounted
					? createPortal(
							<DragOverlay
								adjustScale={false}
								dropAnimation={null}
								modifiers={dragOverlayModifiers}
							>
								{activeDragKind === "palette" && activePaletteDefinition ? (
									<PaletteOverlayCard definition={activePaletteDefinition} />
								) : activeBlock ? (
									<BlockOverlayCard block={activeBlock} />
								) : null}
							</DragOverlay>,
							globalThis.document.body,
						)
					: null}
			</DndContext>
		</div>
	);
};
