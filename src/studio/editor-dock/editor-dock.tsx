"use client";

import clsx from "clsx";
import { LayoutPanelLeft, LayoutPanelTop, LogIn, LogOut } from "lucide-react";
import { useEffect, useRef } from "react";
import { useWebsiteBuilderI18n } from "../../i18n/website-builder-i18n-context";
import type {
	WebsiteBuilderMode,
	WebsiteBuilderPageCatalogItem,
} from "../../types";
import { ToolbarButton } from "../shared";
import { EditorDockBrand } from "./editor-dock-brand";
import { EditorLocaleSelect } from "./editor-locale-select";
import { EditorModeSelect } from "./editor-mode-select";
import { EditorPageBrowser } from "./editor-page-browser";
import { EditorSaveButton } from "./editor-save-button";

export const WEBSITE_BUILDER_EDITOR_DOCK_FALLBACK_HEIGHT = 80;

type EditorDockProps = {
	activeMode: WebsiteBuilderMode;
	canManage: boolean;
	hasUnsavedChanges: boolean;
	collapsedBlockCount: number;
	autosaveEnabled: boolean;
	saveState: "idle" | "saving" | "saved" | "error";
	showCollapsedInPreview: boolean;
	title: string;
	description?: string;
	currentPage: WebsiteBuilderPageCatalogItem | null;
	pages: WebsiteBuilderPageCatalogItem[];
	onHeightChange: (height: number) => void;
	onAuthOpen: () => void;
	onAutosaveChange: (value: boolean) => void;
	onOpenPage?: (page: WebsiteBuilderPageCatalogItem) => void;
	onCreatePage?: (input: {
		name: string;
		route: string;
		duplicateCurrent: boolean;
	}) => void | Promise<void>;
	onContentLocaleChange?: (locale: string) => void;
	onInterfaceLocaleChange?: (locale: string) => void;
	showInterfaceLocaleControl: boolean;
	workspaceControl?: {
		isOpen: boolean;
		onToggle: () => void;
		shortcutLabel?: string;
	};
	onLogout: () => void;
	onModeChange: (mode: WebsiteBuilderMode) => void;
	onPreviewCollapsedChange: () => void;
	onReset: () => void;
	onSave: () => void;
};

export const EditorDock = ({
	activeMode,
	canManage,
	hasUnsavedChanges,
	collapsedBlockCount,
	autosaveEnabled,
	saveState,
	showCollapsedInPreview,
	title,
	description: _description,
	currentPage,
	pages,
	onHeightChange,
	onAuthOpen,
	onAutosaveChange,
	onOpenPage,
	onCreatePage,
	onContentLocaleChange,
	onInterfaceLocaleChange,
	showInterfaceLocaleControl,
	workspaceControl,
	onLogout,
	onModeChange,
	onPreviewCollapsedChange,
	onReset,
	onSave,
}: EditorDockProps) => {
	const headerRef = useRef<HTMLElement | null>(null);
	const {
		contentLocale,
		editableLocales,
		interfaceLocale,
		interfaceLocales,
		translate,
	} = useWebsiteBuilderI18n();
	const compact = true;
	const contentLocaleOptions = editableLocales.map((locale) => ({
		code: locale.code,
		label: locale.label,
	}));
	const WorkspaceIcon = workspaceControl?.isOpen
		? LayoutPanelTop
		: LayoutPanelLeft;

	useEffect(() => {
		const node = headerRef.current;

		if (!node) {
			return;
		}

		const updateHeight = () => {
			onHeightChange(Math.ceil(node.getBoundingClientRect().height));
		};

		updateHeight();

		if (typeof ResizeObserver === "undefined") {
			window.addEventListener("resize", updateHeight);
			return () => window.removeEventListener("resize", updateHeight);
		}

		const observer = new ResizeObserver(updateHeight);
		observer.observe(node);

		return () => observer.disconnect();
	}, [onHeightChange]);

	return (
		<header
			ref={headerRef}
			className="fixed inset-x-0 top-0 z-[60] border-b backdrop-blur-xl"
			data-testid="wb-editor-dock"
			style={{
				minHeight: WEBSITE_BUILDER_EDITOR_DOCK_FALLBACK_HEIGHT,
				background: "var(--wb-builder-dock-bg)",
				boxShadow: "var(--wb-builder-panel-shadow)",
				borderColor: "var(--wb-builder-border)",
				color: "var(--wb-builder-text)",
			}}
		>
			<div
				className={clsx(
					"mx-auto flex flex-col px-4 sm:px-6 lg:px-8",
					compact ? "gap-2 py-2.5" : "gap-3 py-3",
				)}
				style={{ maxWidth: "1720px" }}
			>
				<div
					className={clsx(
						"grid gap-3",
						canManage
							? "xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center"
							: "lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center",
					)}
				>
					<EditorDockBrand title={title} compact={compact} />

					<div
						className={clsx(
							"flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
							"flex-wrap lg:flex-nowrap",
							canManage ? "xl:justify-end" : "lg:justify-end",
						)}
					>
						{canManage ? (
							<>
								<EditorPageBrowser
									activeMode={activeMode}
									currentPage={currentPage}
									pages={pages}
									onOpenPage={onOpenPage}
									onCreatePage={onCreatePage}
								/>
								<EditorLocaleSelect
									label={translate(
										"websiteBuilder.editor.contentLocale.label",
										"Content",
									)}
									value={contentLocale}
									options={contentLocaleOptions}
									onChange={onContentLocaleChange}
								/>
								{showInterfaceLocaleControl ? (
									<EditorLocaleSelect
										label={translate(
											"websiteBuilder.editor.interfaceLocale.label",
											"Interface",
										)}
										value={interfaceLocale}
										options={interfaceLocales}
										onChange={onInterfaceLocaleChange}
									/>
								) : null}
								{workspaceControl ? (
									<button
										type="button"
										className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] px-4 text-sm font-semibold text-[color:var(--wb-builder-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-field)]"
										onClick={workspaceControl.onToggle}
										aria-pressed={workspaceControl.isOpen}
										aria-label={
											workspaceControl.isOpen
												? "Hide workspace panel"
												: "Show workspace panel"
										}
										data-testid="wb-workspace-toggle"
									>
										<WorkspaceIcon className="h-4 w-4 text-[color:var(--wb-builder-accent)]" />
										<span>Workspace</span>
									</button>
								) : null}
								<EditorModeSelect value={activeMode} onChange={onModeChange} />
								<EditorSaveButton
									activeMode={activeMode}
									autosaveEnabled={autosaveEnabled}
									hasUnsavedChanges={hasUnsavedChanges}
									collapsedBlockCount={collapsedBlockCount}
									saveState={saveState}
									showCollapsedInPreview={showCollapsedInPreview}
									onAutosaveChange={onAutosaveChange}
									onPreviewCollapsedChange={onPreviewCollapsedChange}
									onReset={onReset}
									onSave={onSave}
								/>
								<ToolbarButton onClick={onLogout}>
									<LogOut className="h-4 w-4" />
									{translate("websiteBuilder.auth.logOut", "Log out")}
								</ToolbarButton>
							</>
						) : (
							<ToolbarButton onClick={onAuthOpen}>
								<LogIn className="h-4 w-4" />
								{translate("websiteBuilder.auth.signIn", "Admin sign in")}
							</ToolbarButton>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};
