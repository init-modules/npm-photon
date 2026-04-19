"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../components/ui/dialog";

type EditorResetDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
};

export const EditorResetDialog = ({
	open,
	onOpenChange,
	onConfirm,
}: EditorResetDialogProps) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Discard local draft?</DialogTitle>
					<DialogDescription>
						This will remove every unsaved local change and restore the last
						version synced with Laravel.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<button
						type="button"
						onClick={() => onOpenChange(false)}
						className="inline-flex h-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-panel-muted)] text-[color:var(--wb-builder-text-muted)] hover:border-[color:var(--wb-builder-border-strong)] hover:bg-[color:var(--wb-builder-field)] hover:text-[color:var(--wb-builder-text)]"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={onConfirm}
						className="inline-flex h-11 items-center justify-center rounded-full border border-rose-400/18 bg-rose-400/10 px-4 text-sm font-semibold text-rose-100 transition hover:border-rose-300/28 hover:bg-rose-400/16 hover:text-white"
					>
						Discard draft
					</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
