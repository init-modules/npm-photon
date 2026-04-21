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
	useWebsiteBuilderPersistedState,
	useWebsiteBuilderStore,
} from "../../context/website-builder-context";
import {
	getWebsiteBuilderSurfaceRegionListId,
	WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
} from "../../helpers/site";
import { findWebsiteBuilderBlock } from "../../helpers/tree";
import { WebsiteBuilderSearchHighlightEffect } from "../../search/website-builder-search-highlight-effect";
import type { WebsiteBuilderMode } from "../../types";
import { BlockOverlayCard } from "../canvas";
import { WEBSITE_BUILDER_EDITOR_DOCK_FALLBACK_HEIGHT } from "../editor-dock/editor-dock";
import { PaletteOverlayCard } from "../palette-panel";
import { websiteBuilderCollisionDetection } from "../shared";
import type { PaletteDefinition, WebsiteBuilderStudioProps } from "../types";
import { useStudioBrowserPreferences } from "./use-studio-browser-preferences";
import { useStudioDefinitionCatalog } from "./use-studio-definition-catalog";
import { useStudioDragState } from "./use-studio-drag-state";
import { useStudioPersistence } from "./use-studio-persistence";
import { useStudioSidebars } from "./use-studio-sidebars";
import { useStudioSiteSettingChange } from "./use-studio-site-setting-change";
import { WebsiteBuilderStage } from "./website-builder-stage";

type WebsiteBuilderStudioInnerProps = {
	initialDocument: WebsiteBuilderStudioProps["initialDocument"];
	initialResources?: WebsiteBuilderStudioProps["initialResources"];
	initialPageSettings?: WebsiteBuilderStudioProps["initialPageSettings"];
	initialSite?: WebsiteBuilderStudioProps["initialSite"];
	workspace?: WebsiteBuilderStudioProps["workspace"];
	capabilities?: WebsiteBuilderStudioProps["capabilities"];
	history?: WebsiteBuilderStudioProps["history"];
	branchPolicy?: WebsiteBuilderStudioProps["branchPolicy"];
	mergePreview?: WebsiteBuilderStudioProps["mergePreview"];
	canManage: boolean;
	initialMode: WebsiteBuilderStudioProps["initialMode"];
	draftStorageKey: string;
	autosaveStorageKey: string;
	currentPage?: WebsiteBuilderStudioProps["currentPage"];
	pages?: WebsiteBuilderStudioProps["pages"];
	onRequestAuth?: () => void;
	onLogout?: () => void | Promise<void>;
	onContentLocaleChange?: WebsiteBuilderStudioProps["onContentLocaleChange"];
	onInterfaceLocaleChange?: WebsiteBuilderStudioProps["onInterfaceLocaleChange"];
	onModeChange?: WebsiteBuilderStudioProps["onModeChange"];
	onSiteSettingChange?: WebsiteBuilderStudioProps["onSiteSettingChange"];
	onSaveDocument?: WebsiteBuilderStudioProps["onSaveDocument"];
	onOpenPage?: WebsiteBuilderStudioProps["onOpenPage"];
	onCreatePage?: WebsiteBuilderStudioProps["onCreatePage"];
	activeSearchHighlight?: WebsiteBuilderStudioProps["activeSearchHighlight"];
	hydrateModePreference?: WebsiteBuilderStudioProps["hydrateModePreference"];
	showInterfaceLocaleControl?: WebsiteBuilderStudioProps["showInterfaceLocaleControl"];
	workspaceControl?: WebsiteBuilderStudioProps["workspaceControl"];
	title: string;
	description: string;
	renderContentNotice?: WebsiteBuilderStudioProps["renderContentNotice"];
	siteSettingsSubtabs?: WebsiteBuilderStudioProps["siteSettingsSubtabs"];
};

export const WebsiteBuilderStudioInner = ({
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
}: WebsiteBuilderStudioInnerProps) => {
	const document = useWebsiteBuilderStore((state) => state.document);
	const contentRevision = useWebsiteBuilderStore(
		(state) => state.contentRevision,
	);
	const {
		document: persistedDocument,
		resources,
		pageSettings,
		site,
	} = useWebsiteBuilderPersistedState();
	const mode = useWebsiteBuilderStore((state) => state.mode);
	const setMode = useWebsiteBuilderStore((state) => state.setMode);
	const isAdmin = useWebsiteBuilderStore((state) => state.isAdmin);
	const registry = useWebsiteBuilderStore((state) => state.registry);
	const selectedBlockId = useWebsiteBuilderStore(
		(state) => state.selectedBlockId,
	);
	const selectedBlock = useWebsiteBuilderStore((state) =>
		state.selectedBlockId
			? findWebsiteBuilderBlock(state.document.blocks, state.selectedBlockId)
			: null,
	);
	const selectedField = useWebsiteBuilderStore((state) => state.selectedField);
	const selectBlock = useWebsiteBuilderStore((state) => state.selectBlock);
	const selectPageSettingField = useWebsiteBuilderStore(
		(state) => state.selectPageSettingField,
	);
	const selectSiteSettingField = useWebsiteBuilderStore(
		(state) => state.selectSiteSettingField,
	);
	const updatePageSettingValue = useWebsiteBuilderStore(
		(state) => state.updatePageSettingValue,
	);
	const getPageSettingValue = useWebsiteBuilderStore(
		(state) => state.getPageSettingValue,
	);
	const updateSiteSettingValue = useWebsiteBuilderStore(
		(state) => state.updateSiteSettingValue,
	);
	const getSiteSettingValue = useWebsiteBuilderStore(
		(state) => state.getSiteSettingValue,
	);
	const insertBlock = useWebsiteBuilderStore((state) => state.insertBlock);
	const moveBlock = useWebsiteBuilderStore((state) => state.moveBlock);
	const replaceState = useWebsiteBuilderStore((state) => state.replaceState);
	const syncExternalState = useWebsiteBuilderStore(
		(state) => state.syncExternalState,
	);
	const collapseAllBlocks = useWebsiteBuilderStore(
		(state) => state.collapseAllBlocks,
	);
	const expandAllBlocks = useWebsiteBuilderStore(
		(state) => state.expandAllBlocks,
	);
	const collapsedBlockCount = useWebsiteBuilderStore(
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
		WEBSITE_BUILDER_EDITOR_DOCK_FALLBACK_HEIGHT,
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

	const handleModeChange = (nextMode: WebsiteBuilderMode) => {
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
			listId: getWebsiteBuilderSurfaceRegionListId(
				WEBSITE_BUILDER_PAGE_SURFACE_REGION_KEY,
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
			<WebsiteBuilderSearchHighlightEffect
				activeHighlight={activeSearchHighlight}
			/>
			<DndContext
				id="website-builder-studio"
				sensors={sensors}
				collisionDetection={websiteBuilderCollisionDetection}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
			>
				<WebsiteBuilderStage
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
