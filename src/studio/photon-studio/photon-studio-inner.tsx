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
import { toast } from "sonner";
import {
	usePhotonPersistedState,
	usePhotonStore,
} from "../../context/photon-context";
import {
	getPhotonSurfaceRegionListId,
	PHOTON_PAGE_SURFACE_REGION_KEY,
} from "../../helpers/site";
import { findPhotonBlock } from "../../helpers/tree";
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
		state.selectedBlockId
			? findPhotonBlock(state.document.blocks, state.selectedBlockId)
			: null,
	);
	const selectedField = usePhotonStore((state) => state.selectedField);
	const selectBlock = usePhotonStore((state) => state.selectBlock);
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
						toast.info("Local draft reverted", {
							description:
								"Local changes were reset to the last saved version.",
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
					siteSettingsPanels={visibleSiteSettingsPanels}
					siteSettingsSubtabs={siteSettingsSubtabs ?? []}
					onPageSettingFocus={selectPageSettingField}
					onPageSettingChange={updatePageSettingValue}
					getPageSettingValue={getPageSettingValue}
					onSiteSettingFocus={selectSiteSettingField}
					onSiteSettingChange={handleSiteSettingChange}
					getSiteSettingValue={getSiteSettingValue}
					onBuilderSurfaceModeChange={setBuilderSurfaceMode}
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
