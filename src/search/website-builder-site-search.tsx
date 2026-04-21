"use client";

import clsx from "clsx";
import { Loader2, Search, X } from "lucide-react";
import {
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
	useWebsiteBuilderCanEdit,
	useWebsiteBuilderFieldValue,
	useWebsiteBuilderStore,
	WebsiteBuilderLink,
} from "../context/website-builder-context";
import { useWebsiteBuilderI18n } from "../i18n/website-builder-i18n-context";
import type { WebsiteBuilderSearchResult } from "../types";
import { buildWebsiteBuilderSearchResultHref } from "./helpers";

type WebsiteBuilderSiteSearchProps = {
	blockId: string;
	placeholderPath: string;
	className?: string;
};

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

export const WebsiteBuilderSiteSearch = ({
	blockId,
	placeholderPath,
	className,
}: WebsiteBuilderSiteSearchProps) => {
	const { translate } = useWebsiteBuilderI18n();
	const { locale, contentLocale } = useWebsiteBuilderI18n();
	const canEdit = useWebsiteBuilderCanEdit();
	const searchSite = useWebsiteBuilderStore((state) => state.searchSite);
	const mode = useWebsiteBuilderStore((state) => state.mode);
	const isAdmin = useWebsiteBuilderStore((state) => state.isAdmin);
	const workspace = useWebsiteBuilderStore((state) => state.workspace);
	const placeholder = String(
		useWebsiteBuilderFieldValue(blockId, placeholderPath) ??
			"Search the website",
	);
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<WebsiteBuilderSearchResult[]>([]);
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
			const href = buildWebsiteBuilderSearchResultHref(
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
			return translate(
				"websiteBuilder.search.hint",
				"Type at least 2 characters to search across static pages and publications.",
			);
		}

		if (loading) {
			return translate(
				"websiteBuilder.search.loading",
				"Searching the live site surface…",
			);
		}

		if (error) {
			return error;
		}

		if (results.length === 0) {
			return "No matches found for this query.";
		}

		return `${results.length} match${
			results.length === 1 ? "" : "es"
		} across the live site.`;
	}, [error, hasQuery, loading, results.length, translate]);

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

	if (!canSearch) {
		return (
			<div
				className={clsx(
					"flex min-h-14 items-center gap-3 rounded-[24px] border border-[var(--wb-site-border)] bg-[var(--wb-site-background)] px-4",
					className,
				)}
			>
				<Search className="h-4 w-4 shrink-0 text-[var(--wb-site-muted)]" />
				<EditableText
					blockId={blockId}
					path={placeholderPath}
					className="text-sm text-[var(--wb-site-muted)]"
				/>
			</div>
		);
	}

	return (
		<>
			<div
				className={clsx(
					"flex min-h-14 items-center gap-3 rounded-[24px] border border-[var(--wb-site-border)] bg-[var(--wb-site-background)] px-4",
					className,
				)}
			>
				<button
					type="button"
					onClick={() => setOpen(true)}
					className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--wb-site-muted)] transition hover:bg-black/5 hover:text-[var(--wb-site-text)]"
					aria-label={translate(
						"websiteBuilder.search.open",
						"Search the website",
					)}
				>
					<Search className="h-4 w-4" />
				</button>
				{canEdit ? (
					<EditableText
						blockId={blockId}
						path={placeholderPath}
						className="flex-1 text-sm text-[var(--wb-site-muted)]"
					/>
				) : (
					<button
						type="button"
						onClick={() => setOpen(true)}
						className="flex-1 cursor-pointer text-left text-sm text-[var(--wb-site-muted)]"
					>
						{placeholder}
					</button>
				)}
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent
					onOpenAutoFocus={handleDialogOpenAutoFocus}
					className="w-[min(44rem,calc(100%-1.5rem))] gap-0 overflow-hidden rounded-[32px] border border-[var(--wb-site-border)] bg-[color-mix(in_oklab,var(--wb-site-surface)_96%,var(--wb-site-background))] p-0 text-[var(--wb-site-text)] shadow-[0_40px_140px_rgba(0,0,0,0.28)]"
				>
					<div className="sr-only">
						<DialogTitle>
							{translate(
								"websiteBuilder.search.dialogTitle",
								"Search the website",
							)}
						</DialogTitle>
						<DialogDescription>
							{translate(
								"websiteBuilder.search.dialogDescription",
								"Find exact matches across static pages and publication pages.",
							)}
						</DialogDescription>
					</div>

					<div className="flex items-center gap-3 border-b border-[var(--wb-site-border)] px-5 py-4">
						<Search className="h-5 w-5 shrink-0 text-[var(--wb-site-muted-text)]" />
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
							className="min-w-0 flex-1 border-0 bg-transparent text-base text-[var(--wb-site-text)] outline-none placeholder:text-[color-mix(in_srgb,var(--wb-site-muted-text)_72%,transparent)]"
						/>
						<button
							type="button"
							onClick={() => setOpen(false)}
							className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--wb-site-muted-text)] transition hover:bg-[color-mix(in_oklab,var(--wb-site-border)_38%,transparent)] hover:text-[var(--wb-site-text)]"
							aria-label="Close search"
						>
							<X className="h-4 w-4" />
						</button>
					</div>

					<div className="border-b border-[var(--wb-site-border)] px-5 py-3 text-sm text-[var(--wb-site-muted-text)]">
						{summaryText}
					</div>

					<div className="max-h-[24rem] overflow-y-auto px-3 py-3">
						{loading ? (
							<div className="flex items-center gap-3 rounded-[24px] border border-[var(--wb-site-border)] bg-[color-mix(in_oklab,var(--wb-site-surface)_86%,var(--wb-site-background))] px-4 py-4 text-sm text-[var(--wb-site-muted-text)]">
								<Loader2 className="h-4 w-4 animate-spin text-[var(--wb-site-accent)]" />
								<span>Searching the live site surface…</span>
							</div>
						) : (
							<KeyboardMenuList
								controller={searchMenu}
								sections={searchSections}
								getItemId={(result) => result.id}
								listLabel="Website search results"
								className="space-y-2"
								emptyState={
									<div className="rounded-[24px] border border-dashed border-[var(--wb-site-border)] bg-[color-mix(in_oklab,var(--wb-site-surface)_86%,var(--wb-site-background))] px-4 py-8 text-center text-sm leading-7 text-[var(--wb-site-muted-text)]">
										{hasQuery
											? "No blocks matched this query yet."
											: "Search static page copy and publication content from the live site shell."}
									</div>
								}
								renderItem={(result, { isActive }) => {
									const snippetParts = renderSnippetParts(
										result.snippet,
										deferredQuery || query.trim(),
									);

									return (
										<div data-wb-search-result-id={result.id}>
											<WebsiteBuilderLink
												navigateInPreviewOnly={false}
												href={buildWebsiteBuilderSearchResultHref(
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
																	revisionId:
																		workspace.ref.revisionId ?? null,
																}
															: null,
													},
												)}
												onClick={() => setOpen(false)}
												className={clsx(
													"block rounded-[24px] border px-4 py-4 transition",
													isActive
														? "border-[var(--wb-site-accent)] bg-[color-mix(in_oklab,var(--wb-site-accent)_14%,var(--wb-site-surface))]"
														: "border-[var(--wb-site-border)] bg-[color-mix(in_oklab,var(--wb-site-surface)_86%,var(--wb-site-background))] hover:border-[color-mix(in_oklab,var(--wb-site-accent)_46%,var(--wb-site-border))] hover:bg-[color-mix(in_oklab,var(--wb-site-accent)_10%,var(--wb-site-surface))]",
												)}
											>
												<div className="flex items-start justify-between gap-4">
													<div className="min-w-0">
														<div className="text-sm font-semibold text-[var(--wb-site-text)]">
															{result.pageName}
														</div>
														<div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-[var(--wb-site-muted-text)]">
															{result.route}
														</div>
													</div>
													<div className="shrink-0 rounded-full border border-[var(--wb-site-border)] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--wb-site-muted-text)]">
														{result.pageKind}
													</div>
												</div>
												<div className="mt-3 text-sm leading-7 text-[var(--wb-site-muted-text)]">
													{snippetParts[0]}
													{snippetParts[1] ? (
														<mark className="rounded-full bg-[color-mix(in_oklab,var(--wb-site-accent)_24%,var(--wb-site-surface))] px-1.5 py-0.5 text-[var(--wb-site-text)]">
															{snippetParts[1]}
														</mark>
													) : null}
													{snippetParts[2] ?? ""}
												</div>
											</WebsiteBuilderLink>
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
