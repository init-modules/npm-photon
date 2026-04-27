"use client";

import clsx from "clsx";
import { LayoutPanelLeft, LayoutPanelTop, LogIn, LogOut } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";
import { usePhotonTranslationCompleteness } from "../../i18n/use-photon-translation-completeness";
import type {
	PhotonMode,
	PhotonPageCatalogItem,
} from "../../types";
import { ToolbarButton } from "../shared";
import { EditorDockBrand } from "./editor-dock-brand";
import { EditorLocaleSelect } from "./editor-locale-select";
import { EditorModeSelect } from "./editor-mode-select";
import { EditorPageBrowser } from "./editor-page-browser";
import { EditorSaveButton } from "./editor-save-button";

export const PHOTON_EDITOR_DOCK_FALLBACK_HEIGHT = 80;

type EditorDockProps = {
	activeMode: PhotonMode;
	canManage: boolean;
	hasUnsavedChanges: boolean;
	collapsedBlockCount: number;
	saveState: "idle" | "saving" | "saved" | "error";
	showCollapsedInPreview: boolean;
	title: string;
	description?: string;
	currentPage: PhotonPageCatalogItem | null;
	pages: PhotonPageCatalogItem[];
	onHeightChange: (height: number) => void;
	onAuthOpen: () => void;
	onOpenPage?: (page: PhotonPageCatalogItem) => void;
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
	onModeChange: (mode: PhotonMode) => void;
	onPreviewCollapsedChange: () => void;
	onReset: () => void;
	onSave: () => void;
};

export const EditorDock = ({
	activeMode,
	canManage,
	hasUnsavedChanges,
	collapsedBlockCount,
	saveState,
	showCollapsedInPreview,
	title,
	description: _description,
	currentPage,
	pages,
	onHeightChange,
	onAuthOpen,
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
		defaultLocale,
		interfaceLocale,
		interfaceLocales,
		translate,
	} = usePhotonI18n();
	const compact = true;
	const editableLocaleCodes = useMemo(
		() => editableLocales.map((locale) => locale.code),
		[editableLocales],
	);
	const completeness = usePhotonTranslationCompleteness({
		locales: editableLocaleCodes,
		referenceLocale: defaultLocale,
	});
	const contentLocaleOptions = editableLocales.map((locale) => ({
		code: locale.code,
		label: locale.label,
		status: locale.status,
		completeness: completeness.results[locale.code]?.percentage,
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
			className="fixed left-0 right-auto top-0 z-[60] w-[100dvw] max-w-[100dvw] overflow-hidden border-b backdrop-blur-xl"
			data-testid="photon-editor-dock"
			style={{
				minHeight: PHOTON_EDITOR_DOCK_FALLBACK_HEIGHT,
				background: "var(--photon-builder-dock-bg)",
				boxShadow: "var(--photon-builder-panel-shadow)",
				borderColor: "var(--photon-builder-border)",
				color: "var(--photon-builder-text)",
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
										"photon.editor.contentLocale.label",
										"Content",
									)}
									value={contentLocale}
									options={contentLocaleOptions}
									onChange={onContentLocaleChange}
								/>
								{showInterfaceLocaleControl ? (
									<EditorLocaleSelect
										label={translate(
											"photon.editor.interfaceLocale.label",
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
										className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] px-4 text-sm font-semibold text-[color:var(--photon-builder-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)]"
										onClick={workspaceControl.onToggle}
										aria-pressed={workspaceControl.isOpen}
										aria-label={
											workspaceControl.isOpen
												? "Hide workspace panel"
												: "Show workspace panel"
										}
										data-testid="photon-workspace-toggle"
									>
										<WorkspaceIcon className="h-4 w-4 text-[color:var(--photon-builder-accent)]" />
										<span>Workspace</span>
									</button>
								) : null}
								<EditorModeSelect value={activeMode} onChange={onModeChange} />
								<EditorSaveButton
									activeMode={activeMode}
									hasUnsavedChanges={hasUnsavedChanges}
									collapsedBlockCount={collapsedBlockCount}
									saveState={saveState}
									showCollapsedInPreview={showCollapsedInPreview}
									onPreviewCollapsedChange={onPreviewCollapsedChange}
									onReset={onReset}
									onSave={onSave}
								/>
								<ToolbarButton onClick={onLogout}>
									<LogOut className="h-4 w-4" />
									{translate("photon.auth.logOut", "Log out")}
								</ToolbarButton>
							</>
						) : (
							<ToolbarButton onClick={onAuthOpen}>
								<LogIn className="h-4 w-4" />
								{translate("photon.auth.signIn", "Admin sign in")}
							</ToolbarButton>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};
