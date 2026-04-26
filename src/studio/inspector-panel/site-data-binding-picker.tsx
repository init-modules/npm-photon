"use client";

import { useMemo, useState } from "react";
import {
	usePhotonSiteData,
	usePhotonStore,
} from "../../context/photon-context";
import type { PhotonFieldBinding } from "../../types";

type StringPickProps = {
	mode?: "string";
	onPick: (binding: string) => void;
	label?: string;
	/** Compact icon-only trigger for inline rows. */
	compact?: boolean;
};

type FieldPickProps = {
	mode: "field";
	onPick: (binding: PhotonFieldBinding) => void;
	label?: string;
	/** Compact icon-only trigger for inline rows. */
	compact?: boolean;
};

type Props = StringPickProps | FieldPickProps;

const buttonStyle = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-field)",
	color: "var(--photon-builder-text-muted)",
};

const dropdownStyle = {
	borderColor: "var(--photon-builder-border)",
	background: "var(--photon-builder-panel-solid, var(--photon-builder-panel))",
	color: "var(--photon-builder-text)",
	boxShadow: "var(--photon-builder-shadow)",
};

const subtleStyle = {
	color: "var(--photon-builder-text-muted)",
};

export const SiteDataBindingPicker = (props: Props) => {
	const { onPick, label, compact } = props;
	const mode = props.mode ?? "string";
	const siteData = usePhotonSiteData();
	const routeContextFields = usePhotonStore(
		(state) => state.routeContextFields,
	);
	const registry = usePhotonStore((state) => state.registry);
	const adapterKeys = useMemo(
		() =>
			Array.from(registry.bindingAdapters?.keys?.() ?? []).sort((a, b) =>
				a.localeCompare(b),
			),
		[registry],
	);
	const [isOpen, setIsOpen] = useState(false);
	const [pendingPick, setPendingPick] = useState<{
		source: "site-data" | "route";
		path: string;
	} | null>(null);

	if (siteData.schemas.length === 0 && routeContextFields.length === 0) {
		return null;
	}

	const emitFieldBinding = (
		source: "site-data" | "route",
		path: string,
		adapter: string | undefined,
	) => {
		(onPick as (binding: PhotonFieldBinding) => void)({
			source,
			path,
			...(adapter ? { adapter } : {}),
		});
		setPendingPick(null);
		setIsOpen(false);
	};

	const handlePick = (schemaId: string, fieldPath: string) => {
		if (mode === "field") {
			const source: "site-data" | "route" =
				schemaId === "route" ? "route" : "site-data";
			const path =
				schemaId === "route" ? fieldPath : `${schemaId}.${fieldPath}`;
			if (adapterKeys.length > 0) {
				// Defer emit until user selects adapter (or skips)
				setPendingPick({ source, path });
				return;
			}
			emitFieldBinding(source, path, undefined);
			return;
		}
		const binding = `{{ ${schemaId}.${fieldPath} }}`;
		(onPick as (binding: string) => void)(binding);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-flex">
			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className={
					compact
						? "inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm border text-[10px] font-semibold leading-none"
						: "cursor-pointer rounded-sm border px-1.5 py-0.5 text-[10.5px] font-semibold leading-tight"
				}
				style={buttonStyle}
				data-testid={
					mode === "field"
						? "photon-bind-to-field-button"
						: "photon-bind-to-data-button"
				}
				aria-expanded={isOpen}
				title={label ?? "Bind to data"}
			>
				{compact ? "🔗" : `🔗 ${label ?? "Bind to data"}`}
			</button>
			{isOpen && pendingPick ? (
				<div
					className="absolute left-0 top-full z-10 mt-1 flex min-w-[16rem] flex-col gap-1 rounded-[14px] border p-2 text-sm"
					style={dropdownStyle}
					data-testid="photon-bind-to-field-adapter-picker"
				>
					<div
						className="px-2 py-1 text-xs uppercase tracking-wide"
						style={subtleStyle}
					>
						Pick adapter (optional)
					</div>
					<button
						type="button"
						onClick={() =>
							emitFieldBinding(
								pendingPick.source,
								pendingPick.path,
								undefined,
							)
						}
						className="flex cursor-pointer rounded-[8px] px-2 py-1 text-left hover:opacity-80"
						data-testid="photon-bind-to-field-adapter-none"
					>
						No adapter (raw value)
					</button>
					{adapterKeys.map((adapterKey) => (
						<button
							key={adapterKey}
							type="button"
							onClick={() =>
								emitFieldBinding(
									pendingPick.source,
									pendingPick.path,
									adapterKey,
								)
							}
							className="flex cursor-pointer items-baseline justify-between gap-2 rounded-[8px] px-2 py-1 text-left hover:opacity-80"
							data-testid={`photon-bind-to-field-adapter-${adapterKey}`}
						>
							<span>{adapterKey}</span>
						</button>
					))}
				</div>
			) : null}
			{isOpen && !pendingPick ? (
				<div
					className="absolute left-0 top-full z-10 mt-1 flex max-h-80 min-w-[16rem] flex-col gap-1 overflow-y-auto rounded-[14px] border p-2 text-sm"
					style={dropdownStyle}
					role="menu"
					data-testid="photon-bind-to-data-dropdown"
				>
					{siteData.schemas.map((schema) => (
						<div key={schema.id} className="flex flex-col gap-0.5">
							<div
								className="px-2 py-1 text-xs uppercase tracking-wide"
								style={subtleStyle}
							>
								{schema.label}
							</div>
							{schema.fields.map((field) => (
								<button
									key={`${schema.id}.${field.path}`}
									type="button"
									role="menuitem"
									onClick={() => handlePick(schema.id, field.path)}
									className="flex cursor-pointer items-baseline justify-between gap-2 rounded-[8px] px-2 py-1 text-left hover:opacity-80"
									data-testid={`photon-bind-to-data-option-${schema.id}-${field.path}`}
								>
									<span>{field.label}</span>
									<code className="text-xs" style={subtleStyle}>
										{`{{ ${schema.id}.${field.path} }}`}
									</code>
								</button>
							))}
						</div>
					))}
					{routeContextFields.length > 0 ? (
						<div className="flex flex-col gap-0.5">
							<div
								className="px-2 py-1 text-xs uppercase tracking-wide"
								style={subtleStyle}
							>
								Route
							</div>
							{routeContextFields.map((field) => (
								<button
									key={`route.${field.path}`}
									type="button"
									role="menuitem"
									onClick={() => handlePick("route", field.path)}
									className="flex cursor-pointer items-baseline justify-between gap-2 rounded-[8px] px-2 py-1 text-left hover:opacity-80"
									data-testid={`photon-bind-to-data-option-route-${field.path}`}
								>
									<span>{field.label}</span>
									<code className="text-xs" style={subtleStyle}>
										{`{{ route.${field.path} }}`}
									</code>
								</button>
							))}
						</div>
					) : null}
				</div>
			) : null}
		</div>
	);
};
