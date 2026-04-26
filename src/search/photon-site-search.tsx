"use client";

import clsx from "clsx";
import { Loader2, Search, X } from "lucide-react";
import {
	type CSSProperties,
	startTransition,
	useDeferredValue,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { EditableText } from "../components/public/public-editable-text";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "../components/ui/dialog";
import {
	KeyboardMenuList,
	useKeyboardMenuController,
} from "../components/ui/keyboard-menu";
import {
	PhotonLink,
	usePhotonCanEdit,
	usePhotonFieldValue,
	usePhotonStore,
} from "../context/photon-public-context";
import { usePhotonI18n } from "../i18n/photon-i18n-context";
import { photonInteractionExecutionSucceeded } from "../helpers/interactions";
import { createPhotonSiteSearchTriggerSlot } from "../modules/system/site/site-interaction-surfaces";
import type {
	PhotonInteractionSurfaceEditableFieldRenderer,
	PhotonInteractionSurfaceRendererProps,
	PhotonSearchResult,
} from "../types";
import { buildPhotonSearchResultHref } from "./helpers";

type PhotonSiteSearchProps = {
	blockId: string;
	placeholderPath: string;
	className?: string;
	surfaceOpen?: boolean;
	onSurfaceOpenChange?: (open: boolean) => void;
	surfacePlaceholder?: string;
	surfaceTitle?: string;
	surfaceDescription?: string;
	surfaceHint?: string;
	surfaceLoading?: string;
	surfaceEmpty?: string;
	hideTrigger?: boolean;
	previewMode?: "runtime" | "builder-inline" | "builder-canvas-stage";
	previewScenarioId?: string;
	editableField?: PhotonInteractionSurfaceEditableFieldRenderer;
};

const searchDialogStyle = {
	background:
		"color-mix(in oklab, var(--photon-site-background) 88%, var(--photon-site-surface))",
	borderColor:
		"color-mix(in oklab, var(--photon-site-border) 24%, transparent)",
	boxShadow: "0 34px 110px rgba(0,0,0,0.34)",
} satisfies CSSProperties;

const searchDividerStyle = {
	borderColor:
		"color-mix(in oklab, var(--photon-site-border) 18%, transparent)",
} satisfies CSSProperties;

const searchPanelStyle = {
	background:
		"color-mix(in oklab, var(--photon-site-surface) 34%, transparent)",
	borderColor:
		"color-mix(in oklab, var(--photon-site-border) 18%, transparent)",
} satisfies CSSProperties;

const searchResultStyle = (isActive: boolean) =>
	({
		background: isActive
			? "color-mix(in oklab, var(--photon-site-accent) 13%, var(--photon-site-surface))"
			: "color-mix(in oklab, var(--photon-site-surface) 30%, transparent)",
		borderColor: isActive
			? "color-mix(in oklab, var(--photon-site-accent) 54%, var(--photon-site-border))"
			: "color-mix(in oklab, var(--photon-site-border) 20%, transparent)",
	}) satisfies CSSProperties;

const searchResultPillStyle = {
	borderColor:
		"color-mix(in oklab, var(--photon-site-border) 24%, transparent)",
} satisfies CSSProperties;

const renderSnippetParts = (snippet: string, query: string) => {
	if (!query) {
		return [snippet];
	}

	const source = snippet.toLowerCase();
	const needle = query.toLowerCase();
	const matchIndex = source.indexOf(needle);

	if (matchIndex === -1) {
		return [snippet];
	}

	return [
		snippet.slice(0, matchIndex),
		snippet.slice(matchIndex, matchIndex + query.length),
		snippet.slice(matchIndex + query.length),
	];
};

export const PhotonSiteSearch = ({
	blockId,
	placeholderPath,
	className,
	surfaceOpen,
	onSurfaceOpenChange,
	surfacePlaceholder,
	surfaceTitle,
	surfaceDescription,
	surfaceHint,
	surfaceLoading,
	surfaceEmpty,
	hideTrigger = false,
	previewMode = "runtime",
	previewScenarioId,
	editableField,
}: PhotonSiteSearchProps) => {
	const { translate } = usePhotonI18n();
	const { locale, contentLocale } = usePhotonI18n();
	const canEdit = usePhotonCanEdit();
	const searchSite = usePhotonStore((state) => state.searchSite);
	const executeInteractionTriggerSlot = usePhotonStore(
		(state) => state.executeInteractionTriggerSlot,
	);
	const mode = usePhotonStore((state) => state.mode);
	const isAdmin = usePhotonStore((state) => state.isAdmin);
	const navigation = usePhotonStore((state) => state.navigation);
	const workspace = usePhotonStore((state) => state.workspace);
	const blockPlaceholder = usePhotonFieldValue(blockId, placeholderPath);
	const placeholder = String(
		surfacePlaceholder ?? blockPlaceholder ?? "Search the website",
	);
	const dialogTitle = surfaceTitle ?? translate(
		"photon.search.dialogTitle",
		"Search the website",
	);
	const dialogDescription = surfaceDescription ?? translate(
		"photon.search.dialogDescription",
		"Find exact matches across static pages and publication pages.",
	);
	const hintCopy = surfaceHint ?? translate(
		"photon.search.hint",
		"Type at least 2 characters to search across static pages and publications.",
	);
	const loadingCopy = surfaceLoading ?? translate(
		"photon.search.loading",
		"Searching the live site surface...",
	);
	const emptyCopy = surfaceEmpty ?? translate(
		"photon.search.empty",
		"No matches found for this query.",
	);
	const [localOpen, setLocalOpen] = useState(false);
	const open = surfaceOpen ?? localOpen;
	const setOpen = onSurfaceOpenChange ?? setLocalOpen;
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<PhotonSearchResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const lastRequestId = useRef(0);
	const handleDialogOpenAutoFocus = (event: Event) => {
		event.preventDefault();
		searchInputRef.current?.focus();
	};
	const deferredQuery = useDeferredValue(query.trim());
	const canSearch = typeof searchSite === "function";
	const hasQuery = deferredQuery.length >= 2;
	const openSearch = () => {
		const triggerSlot = createPhotonSiteSearchTriggerSlot(`${blockId}.search`);
		const openedSurface = executeInteractionTriggerSlot({
			...triggerSlot,
			action: {
				...triggerSlot.action,
				type: "surface",
				overrides: {
					placeholder,
				},
			},
		});

		if (!photonInteractionExecutionSucceeded(openedSurface)) {
			setOpen(true);
		}
	};
	const searchSections = useMemo(
		() => [
			{
				id: "results",
				items: results,
			},
		],
		[results],
	);
	const searchMenu = useKeyboardMenuController({
		items: results,
		getItemId: (result) => result.id,
		isOpen: open && !loading,
		onSelectItem: (result) => {
			const href = buildPhotonSearchResultHref(
				result,
				deferredQuery || query.trim(),
				mode,
				isAdmin,
				{
					locale,
					contentLocale,
					currentSearchParams:
						typeof window === "undefined"
							? undefined
							: new URLSearchParams(window.location.search),
					navigation,
					workspaceSelection: workspace?.ref?.profileId
						? {
								profileId: workspace.ref.profileId,
								branch: workspace.ref.branch,
								revisionId: workspace.ref.revisionId ?? null,
							}
						: null,
				},
			);
			const optionElement = searchMenu.getOptionElement(result.id);
			const linkElement = optionElement?.querySelector<HTMLElement>("[href]");

			setOpen(false);

			if (linkElement) {
				linkElement.click();
				return;
			}

			if (typeof window !== "undefined") {
				window.location.assign(href);
			}
		},
	});
	const summaryText = useMemo(() => {
		if (!hasQuery) {
			return hintCopy;
		}

		if (loading) {
			return loadingCopy;
		}

		if (error) {
			return error;
		}

		if (results.length === 0) {
			return emptyCopy;
		}

		return `${results.length} match${
			results.length === 1 ? "" : "es"
		} across the live site.`;
	}, [emptyCopy, error, hasQuery, hintCopy, loading, loadingCopy, results.length]);

	useEffect(() => {
		if (!open) {
			return;
		}

		searchInputRef.current?.focus();
	}, [open]);

	useEffect(() => {
		if (!open || !canSearch) {
			return;
		}

		if (!hasQuery) {
			startTransition(() => {
				setResults([]);
				setLoading(false);
				setError(null);
			});
			return;
		}

		const requestId = lastRequestId.current + 1;
		lastRequestId.current = requestId;
		startTransition(() => {
			setLoading(true);
			setError(null);
		});

		void searchSite({
			query: deferredQuery,
			limit: 8,
		})
			.then((nextResults) => {
				if (lastRequestId.current !== requestId) {
					return;
				}

				startTransition(() => {
					setResults(nextResults);
					setLoading(false);
				});
			})
			.catch(() => {
				if (lastRequestId.current !== requestId) {
					return;
				}

				startTransition(() => {
					setResults([]);
					setLoading(false);
					setError("Search is temporarily unavailable.");
				});
			});
		}, [canSearch, deferredQuery, hasQuery, open, searchSite]);

	if (previewMode === "builder-canvas-stage") {
		const renderText = (
			path: string,
			value: string,
			kind: "text" | "textarea" = "text",
			placeholderText?: string,
			className?: string,
		) =>
			editableField
				? editableField({ path, value, kind, placeholder: placeholderText, className })
				: (
					<span className={className}>{value || placeholderText || ""}</span>
				);
		const stageScenario = previewScenarioId ?? "idle";
		const mockResults: PhotonSearchResult[] = [
			{
				id: "mock-1",
				pageKey: "home",
				pageName: translate("photon.search.mock.page.home", "Home"),
				pageGroup: null,
				pageKind: "page",
				route: "/",
				blockId: "mock",
				path: "title",
				targetId: "mock-1",
				occurrence: 0,
				snippet: translate(
					"photon.search.mock.snippet.home",
					"Exact matches across all site pages.",
				),
			},
			{
				id: "mock-2",
				pageKey: "products",
				pageName: translate("photon.search.mock.page.products", "Products"),
				pageGroup: translate("photon.search.mock.group.catalog", "Catalog"),
				pageKind: "page",
				route: "/products",
				blockId: "mock",
				path: "title",
				targetId: "mock-2",
				occurrence: 0,
				snippet: translate(
					"photon.search.mock.snippet.products",
					"Browse the full product catalog.",
				),
			},
			{
				id: "mock-3",
				pageKey: "about",
				pageName: translate("photon.search.mock.page.about", "About"),
				pageGroup: null,
				pageKind: "page",
				route: "/about",
				blockId: "mock",
				path: "title",
				targetId: "mock-3",
				occurrence: 0,
				snippet: translate(
					"photon.search.mock.snippet.about",
					"Learn more about the team and mission.",
				),
			},
		];
		return (
			<div
				className="space-y-4"
				data-testid="photon-site-search-canvas-stage"
			>
				<div
					className="rounded-[22px] border p-5"
					style={searchPanelStyle}
				>
					<div className="text-lg font-semibold text-[var(--photon-site-text)]">
						{renderText("title", String(surfaceTitle ?? ""), "text", String(dialogTitle))}
					</div>
					<div className="mt-2 text-sm leading-6 text-[var(--photon-site-muted-text)]">
						{renderText("description", String(surfaceDescription ?? ""), "textarea", String(dialogDescription))}
					</div>
					<div
						className="mt-4 flex min-h-12 items-center gap-3 rounded-[18px] border px-3 text-sm text-[var(--photon-site-muted-text)]"
						style={searchPanelStyle}
					>
						<Search className="h-4 w-4" />
						<div className="flex-1">
							{renderText("placeholder", String(surfacePlaceholder ?? ""), "text", String(placeholder))}
						</div>
					</div>
					<div className="mt-3 text-xs leading-5 text-[var(--photon-site-muted-text)]">
						{renderText("hint", String(surfaceHint ?? ""), "textarea", String(hintCopy))}
					</div>
					<div
						className="mt-5 rounded-[18px] border p-4"
						style={searchPanelStyle}
						data-testid={`photon-site-search-stage-state-${stageScenario}`}
					>
						{stageScenario === "loading" ? (
							<div className="flex items-center gap-3 text-sm text-[var(--photon-site-muted-text)]">
								<Loader2 className="h-4 w-4 animate-spin" />
								{renderText("loading", String(surfaceLoading ?? ""), "text", String(loadingCopy))}
							</div>
						) : null}
						{stageScenario === "empty" ? (
							<div className="text-sm text-[var(--photon-site-muted-text)]">
								{renderText("empty", String(surfaceEmpty ?? ""), "textarea", String(emptyCopy))}
							</div>
						) : null}
						{stageScenario === "error" ? (
							<div className="text-sm text-[var(--photon-site-muted-text)]">
								{translate(
									"photon.search.error",
									"Search is temporarily unavailable.",
								)}
							</div>
						) : null}
						{stageScenario === "results" ? (
							<div className="space-y-2">
								{mockResults.map((result) => (
									<div
										key={result.id}
										className="rounded-[14px] border px-3 py-2 text-sm text-[var(--photon-site-text)]"
										style={searchPanelStyle}
									>
										<div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--photon-site-muted-text)]">
											{result.pageGroup ? `${result.pageGroup} · ` : ""}
											{result.pageName}
										</div>
										<div>{result.snippet}</div>
									</div>
								))}
							</div>
						) : null}
						{stageScenario === "idle" ? (
							<div className="text-sm text-[var(--photon-site-muted-text)]">
								{translate(
									"photon.search.idle",
									"Start typing to see live matches.",
								)}
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}

	if (previewMode === "builder-inline") {
		return (
			<div
				className="rounded-[22px] border p-4"
				style={searchPanelStyle}
				data-testid="photon-site-search-inline-preview"
			>
				<div className="text-base font-semibold text-[var(--photon-site-text)]">
					{dialogTitle}
				</div>
				<div className="mt-2 text-sm leading-6 text-[var(--photon-site-muted-text)]">
					{dialogDescription}
				</div>
				<div
					className="mt-4 flex min-h-12 items-center gap-3 rounded-[18px] border px-3 text-sm text-[var(--photon-site-muted-text)]"
					style={searchPanelStyle}
				>
					<Search className="h-4 w-4" />
					{placeholder}
				</div>
				<div className="mt-3 text-xs leading-5 text-[var(--photon-site-muted-text)]">
					{hintCopy}
				</div>
			</div>
		);
	}

	if (!canSearch && !hideTrigger) {
		return (
			<div
				className={clsx(
					"flex min-h-14 items-center gap-3 rounded-[24px] border border-[var(--photon-site-border)] bg-[var(--photon-site-background)] px-4",
					className,
				)}
			>
				<Search className="h-4 w-4 shrink-0 text-[var(--photon-site-muted)]" />
				<EditableText
					blockId={blockId}
					path={placeholderPath}
					className="text-sm text-[var(--photon-site-muted)]"
				/>
			</div>
		);
	}

		return (
			<>
				{hideTrigger ? null : (
					<div
						className={clsx(
							"flex min-h-14 items-center gap-3 rounded-[24px] border border-[var(--photon-site-border)] bg-[var(--photon-site-background)] px-4",
							className,
						)}
					>
						<button
							type="button"
							onClick={openSearch}
							className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--photon-site-muted)] transition hover:bg-black/5 hover:text-[var(--photon-site-text)]"
							aria-label={translate("photon.search.open", "Search the website")}
						>
							<Search className="h-4 w-4" />
						</button>
						{canEdit ? (
							<EditableText
								blockId={blockId}
								path={placeholderPath}
								className="flex-1 text-sm text-[var(--photon-site-muted)]"
							/>
						) : (
							<button
								type="button"
								onClick={openSearch}
								className="flex-1 cursor-pointer text-left text-sm text-[var(--photon-site-muted)]"
							>
								{placeholder}
							</button>
						)}
					</div>
				)}

				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent
						onOpenAutoFocus={handleDialogOpenAutoFocus}
						className="w-[min(44rem,calc(100%-1.5rem))] gap-0 overflow-hidden rounded-[24px] border p-0 text-[var(--photon-site-text)] backdrop-blur-xl"
						style={searchDialogStyle}
					>
						<div className="sr-only">
							<DialogTitle>{dialogTitle}</DialogTitle>
							<DialogDescription>{dialogDescription}</DialogDescription>
						</div>

						<div
							className="flex items-center gap-3 border-b px-5 py-4"
							style={searchDividerStyle}
						>
							<Search className="h-5 w-5 shrink-0 text-[var(--photon-site-muted-text)]" />
							<input
								ref={searchInputRef}
								value={query}
								onChange={(event) => setQuery(event.currentTarget.value)}
								onKeyDown={searchMenu.handleKeyDown}
								placeholder={placeholder}
								role="combobox"
								aria-autocomplete="list"
							aria-controls={searchMenu.listId}
							aria-expanded={open}
							aria-activedescendant={searchMenu.activeOptionId}
							className="min-w-0 flex-1 border-0 bg-transparent text-base text-[var(--photon-site-text)] outline-none placeholder:text-[color-mix(in_srgb,var(--photon-site-muted-text)_72%,transparent)]"
						/>
						<button
							type="button"
							onClick={() => setOpen(false)}
							className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--photon-site-muted-text)] transition hover:bg-[color-mix(in_oklab,var(--photon-site-border)_38%,transparent)] hover:text-[var(--photon-site-text)]"
							aria-label="Close search"
						>
							<X className="h-4 w-4" />
						</button>
					</div>

					<div
						className="border-b px-5 py-3 text-sm text-[var(--photon-site-muted-text)]"
						style={searchDividerStyle}
					>
						{summaryText}
					</div>

					<div className="max-h-[24rem] overflow-y-auto px-3 py-3">
						{loading ? (
							<div
								className="flex items-center gap-3 rounded-[20px] border px-4 py-4 text-sm text-[var(--photon-site-muted-text)]"
								style={searchPanelStyle}
								>
									<Loader2 className="h-4 w-4 animate-spin text-[var(--photon-site-accent)]" />
									<span>{loadingCopy}</span>
								</div>
						) : (
							<KeyboardMenuList
								controller={searchMenu}
								sections={searchSections}
								getItemId={(result) => result.id}
								listLabel="Website search results"
								className="space-y-2"
								emptyState={
									<div
										className="rounded-[20px] border border-dashed px-4 py-8 text-center text-sm leading-7 text-[var(--photon-site-muted-text)]"
										style={searchPanelStyle}
										>
											{hasQuery
												? emptyCopy
												: hintCopy}
										</div>
								}
								renderItem={(result, { isActive }) => {
									const snippetParts = renderSnippetParts(
										result.snippet,
										deferredQuery || query.trim(),
									);

									return (
										<div
											data-photon-search-result-id={result.id}
											style={searchResultStyle(isActive)}
											className={clsx(
												"rounded-[20px] border transition",
												isActive
													? "hover:bg-[color-mix(in_oklab,var(--photon-site-accent)_16%,var(--photon-site-surface))]"
													: "hover:bg-[color-mix(in_oklab,var(--photon-site-accent)_10%,var(--photon-site-surface))]",
											)}
										>
											<PhotonLink
												navigateInPreviewOnly={false}
												locale={locale}
												href={buildPhotonSearchResultHref(
													result,
													deferredQuery || query.trim(),
													mode,
													isAdmin,
													{
														locale,
														contentLocale,
														currentSearchParams:
															typeof window === "undefined"
																? undefined
																: new URLSearchParams(window.location.search),
														workspaceSelection: workspace?.ref?.profileId
															? {
																	profileId: workspace.ref.profileId,
																	branch: workspace.ref.branch,
																	revisionId: workspace.ref.revisionId ?? null,
																}
															: null,
													},
												)}
												onClick={() => setOpen(false)}
												className="block px-4 py-4"
											>
												<div className="flex items-start justify-between gap-4">
													<div className="min-w-0">
														<div className="text-sm font-semibold text-[var(--photon-site-text)]">
															{result.pageName}
														</div>
														<div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-[var(--photon-site-muted-text)]">
															{result.route}
														</div>
													</div>
													<div
														className="shrink-0 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--photon-site-muted-text)]"
														style={searchResultPillStyle}
													>
														{result.pageKind}
													</div>
												</div>
												<div className="mt-3 text-sm leading-7 text-[var(--photon-site-muted-text)]">
													{snippetParts[0]}
													{snippetParts[1] ? (
														<mark className="rounded-full bg-[color-mix(in_oklab,var(--photon-site-accent)_24%,var(--photon-site-surface))] px-1.5 py-0.5 text-[var(--photon-site-text)]">
															{snippetParts[1]}
														</mark>
													) : null}
													{snippetParts[2] ?? ""}
												</div>
											</PhotonLink>
										</div>
									);
								}}
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export const PhotonSiteSearchSurfaceRenderer = ({
	open,
	onOpenChange,
	request,
	previewMode,
	previewScenarioId,
	editableField,
}: PhotonInteractionSurfaceRendererProps) => (
	<PhotonSiteSearch
		blockId=""
		placeholderPath=""
		surfaceOpen={open}
		onSurfaceOpenChange={onOpenChange}
		previewScenarioId={previewScenarioId}
		editableField={editableField}
		surfacePlaceholder={
			typeof request.props.placeholder === "string"
				? request.props.placeholder
				: undefined
		}
		surfaceTitle={
			typeof request.props.title === "string" ? request.props.title : undefined
		}
		surfaceDescription={
			typeof request.props.description === "string"
				? request.props.description
				: undefined
		}
		surfaceHint={
			typeof request.props.hint === "string" ? request.props.hint : undefined
		}
		surfaceLoading={
			typeof request.props.loading === "string"
				? request.props.loading
				: undefined
		}
		surfaceEmpty={
			typeof request.props.empty === "string" ? request.props.empty : undefined
			}
			hideTrigger
			previewMode={previewMode}
	/>
);
