"use client";

import clsx from "clsx";
import {
	type CSSProperties,
	type PointerEventHandler,
	type ReactNode,
	useEffect,
	useState,
} from "react";
import type {
	WebsiteBuilderPageCatalogItem,
	WebsiteBuilderPageSettings,
} from "../../types";
import { InspectorPanel } from "../inspector-panel";
import { PalettePanel } from "../palette-panel";
import type {
	InspectorDefinitionMeta,
	InspectorGroups,
	PaletteFamilyGroup,
	PaletteDefinition,
} from "../types";
import { BuilderSidebarEdgeToggle } from "./builder-sidebar-edge-toggle";
import { BuilderSidebarResizeHandle } from "./builder-sidebar-resize-handle";

type BuilderSidebarsProps = {
	sidebarsVisible: boolean;
	dockHeight: number;
	isResizing: boolean;
	leftSidebarWidth: number;
	rightSidebarWidth: number;
	leftCollapsed: boolean;
	rightCollapsed: boolean;
	children: ReactNode;
	search: string;
	onSearchChange: (value: string) => void;
	allPaletteBlocks: PaletteDefinition[];
	paletteGroups: PaletteFamilyGroup[];
	paletteFamily: string;
	onPaletteFamilyChange: (family: string) => void;
	palettePackage: string;
	onPalettePackageChange: (pkg: string) => void;
	collapsedFamilies: string[];
	onToggleFamily: (family: string) => void;
	collapsedGroups: string[];
	onToggleGroup: (group: string) => void;
	selectedDefinitionKey: string | null;
	onSelectDefinition: (definition: PaletteDefinition) => void;
	onInsert: (definition: PaletteDefinition) => void;
	manualInsertTarget: { listId: string; index: number } | null;
	definitionFields: PaletteDefinition["fields"];
	inspectorGroups: InspectorGroups;
	selectedFieldPath: string | null;
	inspectorDefinition: InspectorDefinitionMeta | null;
	pageSettings: WebsiteBuilderPageSettings;
	currentPage: WebsiteBuilderPageCatalogItem | null;
	onContentLocaleChange?: (locale: string) => void;
	onToggleLeftCollapsed: () => void;
	onToggleRightCollapsed: () => void;
	onExpandLeft: () => void;
	onExpandRight: () => void;
	onResizeStart: (
		side: "left" | "right",
	) => PointerEventHandler<HTMLButtonElement>;
};

export const BuilderSidebars = ({
	sidebarsVisible,
	dockHeight,
	isResizing,
	leftSidebarWidth,
	rightSidebarWidth,
	leftCollapsed,
	rightCollapsed,
	children,
	search,
	onSearchChange,
	allPaletteBlocks,
	paletteGroups,
	paletteFamily,
	onPaletteFamilyChange,
	palettePackage,
	onPalettePackageChange,
	collapsedFamilies,
	onToggleFamily,
	collapsedGroups,
	onToggleGroup,
	selectedDefinitionKey,
	onSelectDefinition,
	onInsert,
	manualInsertTarget,
	definitionFields,
	inspectorGroups,
	selectedFieldPath,
	inspectorDefinition,
	pageSettings,
	currentPage,
	onContentLocaleChange,
	onToggleLeftCollapsed,
	onToggleRightCollapsed,
	onExpandLeft,
	onExpandRight,
	onResizeStart,
}: BuilderSidebarsProps) => {
	const [transitionsEnabled, setTransitionsEnabled] = useState(false);
	const leftReservedWidth =
		sidebarsVisible && !leftCollapsed ? leftSidebarWidth : 0;
	const rightReservedWidth =
		sidebarsVisible && !rightCollapsed ? rightSidebarWidth : 0;

	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setTransitionsEnabled(true);
		}, 0);

		return () => window.clearTimeout(timeoutId);
	}, []);

	return (
		<>
			{transitionsEnabled && sidebarsVisible && leftCollapsed ? (
				<BuilderSidebarEdgeToggle
					side="left"
					dockHeight={dockHeight}
					onExpand={onExpandLeft}
				/>
			) : null}

			{transitionsEnabled && sidebarsVisible && rightCollapsed ? (
				<BuilderSidebarEdgeToggle
					side="right"
					dockHeight={dockHeight}
					onExpand={onExpandRight}
				/>
			) : null}

			<div
				className={clsx(
					"relative min-w-0 lg:pl-[var(--wb-left-sidebar-width)] lg:pr-[var(--wb-right-sidebar-width)]",
					!isResizing &&
						"lg:transition-[padding] lg:duration-500 lg:ease-[cubic-bezier(0.22,1,0.36,1)]",
				)}
				style={
					{
						"--wb-left-sidebar-width": `${leftReservedWidth}px`,
						"--wb-right-sidebar-width": `${rightReservedWidth}px`,
					} as CSSProperties
				}
			>
				<aside
					className={clsx(
						"fixed bottom-0 z-30 hidden overflow-hidden lg:block",
						transitionsEnabled &&
							!isResizing &&
							"transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
						(!sidebarsVisible || leftCollapsed) && "pointer-events-none",
					)}
					style={{
						top: dockHeight,
						width: leftSidebarWidth,
						left: 0,
						transform:
							sidebarsVisible && !leftCollapsed
								? "translateX(0)"
								: "translateX(-100%)",
					}}
					aria-hidden={!sidebarsVisible || leftCollapsed}
					data-testid="wb-builder-sidebar-left"
				>
					<div
						className={clsx(
							"relative h-full min-w-0 overflow-hidden border-r backdrop-blur-md",
						)}
						style={{
							borderColor: "var(--wb-builder-border)",
							background: isResizing
								? "var(--wb-builder-panel-solid)"
								: "var(--wb-builder-panel)",
							color: "var(--wb-builder-text)",
							boxShadow: "var(--wb-builder-sidebar-shadow)",
						}}
					>
							<PalettePanel
								search={search}
								onSearchChange={onSearchChange}
								allPaletteBlocks={allPaletteBlocks}
								paletteGroups={paletteGroups}
								paletteFamily={paletteFamily}
								onPaletteFamilyChange={onPaletteFamilyChange}
								palettePackage={palettePackage}
								onPalettePackageChange={onPalettePackageChange}
								collapsedFamilies={collapsedFamilies}
								onToggleFamily={onToggleFamily}
								collapsedGroups={collapsedGroups}
							onToggleGroup={onToggleGroup}
							selectedDefinitionKey={selectedDefinitionKey}
							onSelectDefinition={onSelectDefinition}
							onInsert={onInsert}
							manualInsertTarget={manualInsertTarget}
							onCollapse={onToggleLeftCollapsed}
						/>
						<BuilderSidebarResizeHandle
							side="left"
							onPointerDown={onResizeStart("left")}
						/>
					</div>
				</aside>

				<div className="min-w-0">{children}</div>

				<aside
					className={clsx(
						"fixed bottom-0 z-30 hidden overflow-hidden lg:block",
						transitionsEnabled &&
							!isResizing &&
							"transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
						(!sidebarsVisible || rightCollapsed) && "pointer-events-none",
					)}
					style={{
						top: dockHeight,
						width: rightSidebarWidth,
						right: 0,
						transform:
							sidebarsVisible && !rightCollapsed
								? "translateX(0)"
								: "translateX(100%)",
					}}
					aria-hidden={!sidebarsVisible || rightCollapsed}
					data-testid="wb-builder-sidebar-right"
				>
					<div
						className={clsx(
							"relative h-full min-w-0 overflow-hidden border-l backdrop-blur-md",
						)}
						style={{
							borderColor: "var(--wb-builder-border)",
							background: isResizing
								? "var(--wb-builder-panel-solid)"
								: "var(--wb-builder-panel)",
							color: "var(--wb-builder-text)",
							boxShadow: "var(--wb-builder-sidebar-shadow)",
						}}
					>
						<InspectorPanel
							definitionFields={definitionFields}
							inspectorGroups={inspectorGroups}
							selectedFieldPath={selectedFieldPath}
							inspectorDefinition={inspectorDefinition}
							pageSettings={pageSettings}
							currentPage={currentPage}
							onContentLocaleChange={onContentLocaleChange}
							onCollapse={onToggleRightCollapsed}
						/>
						<BuilderSidebarResizeHandle
							side="right"
							onPointerDown={onResizeStart("right")}
						/>
					</div>
				</aside>
			</div>
		</>
	);
};
