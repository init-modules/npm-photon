"use client";

import clsx from "clsx";
import { ChevronDown, FilePlus2, FolderTree } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
	KeyboardMenuList,
	useKeyboardMenuController,
} from "../../components/ui/keyboard-menu";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";
import { translatePhotonPageGroup } from "../../i18n/photon-labels";
import type {
	PhotonMode,
	PhotonPageCatalogItem,
} from "../../types";

type EditorPageBrowserProps = {
	activeMode: PhotonMode;
	currentPage: PhotonPageCatalogItem | null;
	pages: PhotonPageCatalogItem[];
	onOpenPage?: (page: PhotonPageCatalogItem) => void;
	onCreatePage?: (input: {
		name: string;
		route: string;
		duplicateCurrent: boolean;
	}) => void | Promise<void>;
};

export const EditorPageBrowser = ({
	activeMode,
	currentPage,
	pages,
	onOpenPage,
	onCreatePage,
}: EditorPageBrowserProps) => {
	const { translate } = usePhotonI18n();
	const [menuOpen, setMenuOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [name, setName] = useState("");
	const [route, setRoute] = useState("");
	const [duplicateCurrent, setDuplicateCurrent] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const groupedPages = useMemo(() => {
		return pages.reduce<Record<string, PhotonPageCatalogItem[]>>(
			(groups, page) => {
				const key = page.group?.trim() || "Pages";

				groups[key] ??= [];
				groups[key].push(page);

				return groups;
			},
			{},
		);
	}, [pages]);
	const pageSections = useMemo(
		() =>
			Object.entries(groupedPages).map(([group, items]) => ({
				id: group,
				label: translatePhotonPageGroup(group, translate),
				items,
			})),
		[groupedPages, translate],
	);
	const currentRouteLabel =
		currentPage?.routePattern ??
		currentPage?.route ??
		translate("photon.pageBrowser.unmappedRoute", "Unmapped route");
	const canDuplicateCurrent = currentPage?.canDuplicate === true;
	const compact = activeMode === "builder";
	const pageMenu = useKeyboardMenuController({
		items: pages,
		getItemId: (page) => page.key,
		isItemDisabled: (page) => !page.canOpen || !onOpenPage,
		isOpen: menuOpen,
		preferredItemId: currentPage?.key ?? null,
		onSelectItem: (page) => {
			setMenuOpen(false);
			onOpenPage?.(page);
		},
	});

	const resetCreateForm = () => {
		setName("");
		setRoute("");
		setDuplicateCurrent(false);
	};

	useEffect(() => {
		if (!menuOpen) {
			return;
		}

		window.requestAnimationFrame(() => pageMenu.focusList());
	}, [menuOpen]);

	return (
		<>
			<DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						data-testid="photon-editor-page-browser-trigger"
						className={clsx(
							"inline-flex min-w-[14rem] cursor-pointer items-center justify-between gap-3 rounded-full border px-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,box-shadow,color] duration-200 ease-out outline-none border-[color:var(--photon-builder-border)] bg-[color:var(--photon-builder-panel-muted)] text-[color:var(--photon-builder-text)] hover:border-[color:var(--photon-builder-border-strong)] hover:bg-[color:var(--photon-builder-field)] focus-visible:border-[color:var(--photon-builder-border-strong)] focus-visible:bg-[color:var(--photon-builder-accent-strong)]",
							compact ? "h-10" : "h-11",
						)}
					>
						<span className="min-w-0">
							<span className="flex items-center gap-2.5">
								<FolderTree className="h-4 w-4 text-[color:var(--photon-builder-accent)]" />
								<span className="truncate text-sm font-semibold">
									{currentPage?.name ??
										translate(
											"photon.pageBrowser.groups.pages",
											"Pages",
										)}
								</span>
							</span>
							<span className="mt-0.5 block truncate text-[11px] uppercase tracking-[0.22em] text-[color:var(--photon-builder-text-soft)]">
								{currentRouteLabel}
							</span>
						</span>
						<ChevronDown className="h-4 w-4 shrink-0 text-[color:var(--photon-builder-text-soft)]" />
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-[22rem] p-0">
					<div
						className="border-b px-4 py-4"
						style={{ borderColor: "var(--photon-builder-border)" }}
					>
						<div
							className="text-[11px] uppercase tracking-[0.28em]"
							style={{ color: "var(--photon-builder-text-soft)" }}
						>
							{translate("photon.pageBrowser.title", "Page Browser")}
						</div>
						<div
							className="mt-2 text-sm leading-6"
							style={{ color: "var(--photon-builder-text-muted)" }}
						>
							{translate(
								"photon.pageBrowser.description",
								"Switch between live pages and shared templates without leaving the website surface.",
							)}
						</div>
						{onCreatePage ? (
							<button
								type="button"
								data-testid="photon-page-browser-new-page"
								onClick={() => {
									setMenuOpen(false);
									resetCreateForm();
									setDialogOpen(true);
								}}
								className="mt-4 inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition"
								style={{
									borderColor: "var(--photon-builder-border-strong)",
									background: "var(--photon-builder-accent-strong)",
									color: "var(--photon-builder-accent)",
								}}
							>
								<FilePlus2 className="h-4 w-4" />
								{translate("photon.pageBrowser.newPage", "New Page")}
							</button>
						) : null}
					</div>

					<KeyboardMenuList
						controller={pageMenu}
						sections={pageSections}
						getItemId={(page) => page.key}
						isItemDisabled={(page) => !page.canOpen || !onOpenPage}
						selectedItemId={currentPage?.key ?? null}
						listLabel={translate(
							"photon.pageBrowser.listLabel",
							"Photon page browser",
						)}
						className="max-h-[26rem] space-y-4 overflow-y-auto px-3 py-3"
						renderItem={(page, { isActive, isDisabled, isSelected }) => {
							const routeLabel = page.routePattern ?? page.route;

							return (
								<button
									type="button"
									tabIndex={-1}
									disabled={isDisabled}
									onClick={() => {
										setMenuOpen(false);
										onOpenPage?.(page);
									}}
									className={clsx(
										"flex w-full items-start justify-between gap-3 rounded-[1rem] border px-3 py-3 text-left transition",
										isDisabled && "cursor-not-allowed opacity-45",
									)}
									style={{
										borderColor: isSelected
											? "var(--photon-builder-border-strong)"
											: isActive
												? "var(--photon-builder-border)"
												: "transparent",
										background: isSelected
											? "var(--photon-builder-accent-strong)"
											: isActive
												? "var(--photon-builder-panel-muted)"
												: "transparent",
										color: "var(--photon-builder-text)",
									}}
								>
									<div className="min-w-0">
										<div
											className="truncate text-sm font-semibold"
											style={{ color: "var(--photon-builder-text)" }}
										>
											{page.name}
										</div>
										<div
											className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.22em]"
											style={{ color: "var(--photon-builder-text-soft)" }}
										>
											{routeLabel}
										</div>
										{page.description ? (
											<div
												className="mt-2 text-xs leading-5"
												style={{ color: "var(--photon-builder-text-muted)" }}
											>
												{page.description}
											</div>
										) : null}
									</div>
									<div
										className="shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
										style={{
											borderColor:
												page.kind === "template"
													? "var(--photon-builder-border-strong)"
													: "var(--photon-builder-border)",
											background:
												page.kind === "template"
													? "var(--photon-builder-accent-strong)"
													: "var(--photon-builder-panel-muted)",
											color:
												page.kind === "template"
													? "var(--photon-builder-accent)"
													: "var(--photon-builder-text-soft)",
										}}
									>
										{page.kind}
									</div>
								</button>
							);
						}}
					/>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog
				open={dialogOpen}
				onOpenChange={(nextOpen) => {
					setDialogOpen(nextOpen);

					if (!nextOpen) {
						resetCreateForm();
					}
				}}
			>
				<DialogContent data-testid="photon-page-browser-create-dialog">
					<DialogHeader>
						<DialogTitle>Create Page</DialogTitle>
						<DialogDescription>
							Add a new static page to the live website and start editing it in
							the same builder surface.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4">
						<label className="block">
							<div
								className="mb-2 text-[11px] uppercase tracking-[0.24em]"
								style={{ color: "var(--photon-builder-text-soft)" }}
							>
								Page Name
							</div>
							<input
								data-testid="photon-page-browser-create-name"
								value={name}
								onChange={(event) => setName(event.currentTarget.value)}
								placeholder="About us"
								className="w-full rounded-[1.25rem] border px-4 py-3 text-sm outline-none transition placeholder:text-[color:var(--photon-builder-text-ghost)]"
								style={{
									borderColor: "var(--photon-builder-border)",
									background: "var(--photon-builder-field)",
									color: "var(--photon-builder-text)",
								}}
							/>
						</label>

						<label className="block">
							<div
								className="mb-2 text-[11px] uppercase tracking-[0.24em]"
								style={{ color: "var(--photon-builder-text-soft)" }}
							>
								Route
							</div>
							<input
								data-testid="photon-page-browser-create-route"
								value={route}
								onChange={(event) => setRoute(event.currentTarget.value)}
								placeholder="/about"
								className="w-full rounded-[1.25rem] border px-4 py-3 text-sm outline-none transition placeholder:text-[color:var(--photon-builder-text-ghost)]"
								style={{
									borderColor: "var(--photon-builder-border)",
									background: "var(--photon-builder-field)",
									color: "var(--photon-builder-text)",
								}}
							/>
						</label>

						{canDuplicateCurrent ? (
							<div className="space-y-2">
								<div
									className="text-[11px] uppercase tracking-[0.24em]"
									style={{ color: "var(--photon-builder-text-soft)" }}
								>
									Starting Point
								</div>
								<div className="grid gap-2 sm:grid-cols-2">
									<button
										type="button"
										onClick={() => setDuplicateCurrent(false)}
										className={clsx(
											"rounded-[1.2rem] border px-4 py-3 text-left transition",
										)}
										style={
											!duplicateCurrent
												? {
														borderColor: "var(--photon-builder-border-strong)",
														background: "var(--photon-builder-accent-strong)",
														color: "var(--photon-builder-text)",
													}
												: {
														borderColor: "var(--photon-builder-border)",
														background: "var(--photon-builder-panel-muted)",
														color: "var(--photon-builder-text-muted)",
													}
										}
									>
										<div className="text-sm font-semibold">Blank page</div>
										<div className="mt-1 text-xs leading-5">
											Start from a clean canvas.
										</div>
									</button>
									<button
										type="button"
										onClick={() => setDuplicateCurrent(true)}
										className={clsx(
											"rounded-[1.2rem] border px-4 py-3 text-left transition",
										)}
										style={
											duplicateCurrent
												? {
														borderColor: "var(--photon-builder-border-strong)",
														background: "var(--photon-builder-accent-strong)",
														color: "var(--photon-builder-text)",
													}
												: {
														borderColor: "var(--photon-builder-border)",
														background: "var(--photon-builder-panel-muted)",
														color: "var(--photon-builder-text-muted)",
													}
										}
									>
										<div className="text-sm font-semibold">
											Duplicate current
										</div>
										<div className="mt-1 text-xs leading-5">
											Copy the current page layout into the new route.
										</div>
									</button>
								</div>
							</div>
						) : null}
					</div>

					<DialogFooter>
						<button
							type="button"
							onClick={() => setDialogOpen(false)}
							className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full border px-5 text-sm font-semibold transition"
							style={{
								borderColor: "var(--photon-builder-border)",
								background: "var(--photon-builder-panel-muted)",
								color: "var(--photon-builder-text-muted)",
							}}
						>
							Cancel
						</button>
						<button
							type="button"
							disabled={
								isSubmitting || !name.trim() || !route.trim() || !onCreatePage
							}
							onClick={async () => {
								if (!onCreatePage) {
									return;
								}

								setIsSubmitting(true);

								try {
									await onCreatePage({
										name: name.trim(),
										route: route.trim(),
										duplicateCurrent,
									});
									setDialogOpen(false);
									resetCreateForm();
								} finally {
									setIsSubmitting(false);
								}
							}}
							className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full border px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45"
							style={{
								borderColor: "var(--photon-builder-border-strong)",
								background: "var(--photon-builder-accent-strong)",
								color: "var(--photon-builder-accent)",
							}}
						>
							{isSubmitting ? "Creating..." : "Create page"}
						</button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
