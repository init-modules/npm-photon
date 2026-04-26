"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { usePhotonStore } from "../../context/photon-context";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";

/**
 * Inspector panel for managing the current document's `routePatterns`
 * — the list of URL patterns that this document serves as a template
 * for (e.g. `/:city/products/:slug`). Used together with site-data
 * binding `{{ route.x }}` to render city/slug-specific copy.
 *
 * Edits are persisted via `updateDocumentMetadata`. Renders nothing
 * outside builder mode or when the user lacks edit permissions.
 */
export const RouteFamilyEditor = () => {
	const { translate } = usePhotonI18n();
	const document = usePhotonStore((state) => state.document);
	const updateDocumentMetadata = usePhotonStore(
		(state) => state.updateDocumentMetadata,
	);
	const canEdit = usePhotonStore(
		(state) => state.isAdmin && state.mode === "builder",
	);
	const [draftPattern, setDraftPattern] = useState("");

	if (!canEdit || !updateDocumentMetadata) {
		return null;
	}

	const patterns = document.routePatterns ?? [];

	const writePatterns = (next: string[]) => {
		updateDocumentMetadata({
			routePatterns: next.length > 0 ? next : undefined,
		});
	};

	const addPattern = () => {
		const trimmed = draftPattern.trim();
		if (!trimmed || patterns.includes(trimmed)) {
			return;
		}
		writePatterns([...patterns, trimmed]);
		setDraftPattern("");
	};

	const removePattern = (pattern: string) => {
		writePatterns(patterns.filter((p) => p !== pattern));
	};

	return (
		<section
			className="rounded-[24px] border px-4 py-4"
			style={{
				borderColor: "var(--photon-builder-border)",
				background: "var(--photon-builder-panel-muted)",
			}}
			data-testid="photon-route-family-editor"
		>
			<div
				className="text-[11px] uppercase tracking-[0.28em]"
				style={{ color: "var(--photon-builder-text-soft)" }}
			>
				{translate("photon.studio.routeFamily.title", "Route family")}
			</div>
			<p
				className="mt-2 text-xs leading-5"
				style={{ color: "var(--photon-builder-text-muted)" }}
			>
				{translate(
					"photon.studio.routeFamily.description",
					"URL patterns this document serves. Specific routes (e.g. /astana) can fully override this template.",
				)}
			</p>
			<div className="mt-3 space-y-2">
				{patterns.length === 0 ? (
					<div
						className="text-xs italic"
						style={{ color: "var(--photon-builder-text-soft)" }}
					>
						{translate(
							"photon.studio.routeFamily.empty",
							"No patterns. Document only renders at its primary route.",
						)}
					</div>
				) : (
					patterns.map((pattern) => (
						<div
							key={pattern}
							className="flex items-center gap-2 rounded-2xl border px-3 py-2 font-mono text-xs"
							style={{
								borderColor: "var(--photon-builder-border)",
								background: "var(--photon-builder-panel-solid)",
								color: "var(--photon-builder-text)",
							}}
							data-testid={`photon-route-family-pattern-${pattern}`}
						>
							<span className="flex-1">{pattern}</span>
							<button
								type="button"
								onClick={() => removePattern(pattern)}
								className="cursor-pointer rounded-full p-1 hover:opacity-70"
								style={{ color: "var(--photon-builder-text-muted)" }}
								aria-label={translate(
									"photon.studio.routeFamily.remove",
									"Remove pattern",
								)}
								data-testid={`photon-route-family-remove-${pattern}`}
							>
								<Trash2 size={12} />
							</button>
						</div>
					))
				)}
				<div className="flex items-center gap-2">
					<input
						type="text"
						value={draftPattern}
						onChange={(event) => setDraftPattern(event.currentTarget.value)}
						placeholder="/:city/products/:slug"
						className="flex-1 rounded-[10px] border px-2 py-1 font-mono text-xs"
						style={{
							borderColor: "var(--photon-builder-border)",
							background: "var(--photon-builder-panel-solid)",
							color: "var(--photon-builder-text)",
						}}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								addPattern();
							}
						}}
						data-testid="photon-route-family-input"
					/>
					<button
						type="button"
						onClick={addPattern}
						className="inline-flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-xs"
						style={{
							borderColor: "var(--photon-builder-border-strong)",
							color: "var(--photon-builder-text)",
						}}
						data-testid="photon-route-family-add"
					>
						<Plus size={10} /> Add
					</button>
				</div>
			</div>
		</section>
	);
};
