"use client";

import { WandSparkles } from "lucide-react";
import { useEffect, useState } from "react";

type JsonFieldEditorProps = {
	blockId: string;
	path: string;
	initialValue: unknown;
	onApply: (value: unknown) => void;
	onFocus: () => void;
};

export const JsonFieldEditor = ({
	blockId,
	path,
	initialValue,
	onApply,
	onFocus,
}: JsonFieldEditorProps) => {
	const [draft, setDraft] = useState(JSON.stringify(initialValue, null, 2));
	const [error, setError] = useState<string | null>(null);
	const testIdSuffix = path.replace(/[^a-zA-Z0-9_-]+/g, "-");

	useEffect(() => {
		setDraft(JSON.stringify(initialValue, null, 2));
		setError(null);
	}, [blockId, path, initialValue]);

	return (
		<div data-testid={`wb-json-field-editor-${testIdSuffix}`}>
			<textarea
				data-testid={`wb-json-field-editor-input-${testIdSuffix}`}
				rows={7}
				value={draft}
				onFocus={onFocus}
				onChange={(event) => {
					setDraft(event.currentTarget.value);
					setError(null);
				}}
				className="w-full rounded-2xl border px-4 py-3 font-mono text-xs leading-6 outline-none transition"
				style={{
					borderColor: "var(--wb-builder-border)",
					background: "var(--wb-builder-field)",
					color: "var(--wb-builder-text)",
				}}
			/>
			<div className="mt-3 flex items-center justify-between gap-3">
				<button
					data-testid={`wb-json-field-editor-apply-${testIdSuffix}`}
					type="button"
					onClick={() => {
						try {
							const nextValue = JSON.parse(draft);
							onApply(nextValue);
							setError(null);
						} catch {
							setError("Invalid JSON");
						}
					}}
					className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]"
					style={{
						borderColor: "var(--wb-builder-border-strong)",
						background: "var(--wb-builder-accent-strong)",
						color: "var(--wb-builder-accent)",
					}}
				>
					<WandSparkles className="h-3.5 w-3.5" />
					Apply JSON
				</button>
				{error ? (
					<div
						className="text-xs"
						style={{ color: "var(--wb-builder-accent)" }}
					>
						{error}
					</div>
				) : null}
			</div>
		</div>
	);
};
