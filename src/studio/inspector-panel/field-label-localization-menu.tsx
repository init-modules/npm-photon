"use client";

import type { ReactNode } from "react";
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "../../components/ui/context-menu";
import {
	isPhotonBlockFieldLocalizationOverridden,
	resolvePhotonBlockFieldLocalization,
} from "../../i18n/block-localization";
import type {
	PhotonBlock,
	PhotonBlockLocalizationSchema,
	PhotonFieldKind,
	PhotonFieldLocalization,
} from "../../types";
import { PhotonFieldLocalizationMarker } from "./field-localization-marker";

type FieldLabelLocalizationMenuProps = {
	block: Pick<PhotonBlock, "localization" | "props">;
	schema?: PhotonBlockLocalizationSchema;
	fieldPath: string;
	fieldKind: PhotonFieldKind;
	onToggle?: () => void;
	onSetLocalization?: (target: PhotonFieldLocalization) => void;
	missingLocales?: readonly string[];
	getLocaleLabel?: (code: string) => string | undefined;
	children: ReactNode;
};

/**
 * Wraps a field label in a right-click ContextMenu that lets the admin
 * mark the field translatable / shared, or revert to the kind/schema
 * default. Also renders the inline `<PhotonFieldLocalizationMarker>` as a
 * trailing visual hint for translatable fields.
 *
 * If both `onToggle` and `onSetLocalization` are absent, the menu is read-
 * only (state inspection only). The component still works without any
 * handlers; that's useful for previews where edits are disabled.
 */
export const FieldLabelLocalizationMenu = ({
	block,
	schema,
	fieldPath,
	fieldKind,
	onToggle,
	onSetLocalization,
	missingLocales,
	getLocaleLabel,
	children,
}: FieldLabelLocalizationMenuProps) => {
	const localization = resolvePhotonBlockFieldLocalization({
		block,
		schema,
		fieldPath,
		fieldKind,
	});
	const isOverride = isPhotonBlockFieldLocalizationOverridden({
		block,
		schema,
		fieldPath,
		fieldKind,
	});

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<span className="inline-flex items-center gap-1.5">
					{children}
					<PhotonFieldLocalizationMarker
						block={block}
						schema={schema}
						fieldPath={fieldPath}
						fieldKind={fieldKind}
						{...(missingLocales ? { missingLocales } : {})}
						{...(getLocaleLabel ? { getLocaleLabel } : {})}
					/>
				</span>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuCheckboxItem
					checked={localization === "localized"}
					onSelect={() => {
						if (onSetLocalization) {
							onSetLocalization("localized");
						} else if (onToggle && localization !== "localized") {
							onToggle();
						}
					}}
					disabled={!onSetLocalization && !onToggle}
				>
					Translatable per locale
				</ContextMenuCheckboxItem>
				<ContextMenuCheckboxItem
					checked={localization === "shared"}
					onSelect={() => {
						if (onSetLocalization) {
							onSetLocalization("shared");
						} else if (onToggle && localization !== "shared") {
							onToggle();
						}
					}}
					disabled={!onSetLocalization && !onToggle}
				>
					Shared across locales
				</ContextMenuCheckboxItem>
				{isOverride ? (
					<>
						<ContextMenuSeparator />
						<ContextMenuItem
							disabled={!onToggle && !onSetLocalization}
							onSelect={() => {
								// Toggle until the override clears (matches baseline).
								if (onToggle) onToggle();
							}}
						>
							Reset to default
						</ContextMenuItem>
					</>
				) : null}
			</ContextMenuContent>
		</ContextMenu>
	);
};
