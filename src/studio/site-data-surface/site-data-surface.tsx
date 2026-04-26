"use client";

import { useMemo } from "react";
import {
	resolvePhotonSiteData,
	sitePath,
} from "../../helpers/site-data";
import type {
	PhotonSite,
	PhotonSiteDataField,
	PhotonSiteDataSchema,
} from "../../types";
import {
	activeStyle,
	badgeStyle,
	cardStyle,
	fieldStyle,
	subtleStyle,
} from "../interaction-surfaces-surface/shared";

type Props = {
	siteDataSchemas: PhotonSiteDataSchema[];
	selectedDataFieldId: string | null;
	onSelectedDataFieldChange: (id: string | null) => void;
	site: PhotonSite;
	onSiteSettingChange: (path: string, value: unknown) => void;
	onSiteSettingFocus: (path: string) => void;
};

const fieldId = (schemaId: string, fieldPath: string) =>
	`${schemaId}.${fieldPath}`;

const findField = (
	schemas: PhotonSiteDataSchema[],
	id: string | null,
): { schema: PhotonSiteDataSchema; field: PhotonSiteDataField } | null => {
	if (!id) return null;
	const dotIndex = id.indexOf(".");
	if (dotIndex <= 0) return null;
	const schemaId = id.slice(0, dotIndex);
	const fieldPath = id.slice(dotIndex + 1);
	const schema = schemas.find((s) => s.id === schemaId);
	if (!schema) return null;
	const field = schema.fields.find((f) => f.path === fieldPath);
	if (!field) return null;
	return { schema, field };
};

const renderEditor = (
	field: PhotonSiteDataField,
	value: unknown,
	onChange: (next: unknown) => void,
	onFocus: () => void,
) => {
	const stringValue = value == null ? "" : String(value);
	if (field.kind === "textarea") {
		return (
			<textarea
				className="min-h-24 w-full rounded-[14px] border px-3 py-2 text-sm outline-none"
				style={fieldStyle}
				value={stringValue}
				onChange={(event) => onChange(event.currentTarget.value)}
				onFocus={onFocus}
				data-testid={`photon-site-data-input-${field.path}`}
			/>
		);
	}
	if (field.kind === "toggle") {
		return (
			<input
				type="checkbox"
				checked={Boolean(value)}
				onChange={(event) => onChange(event.currentTarget.checked)}
				onFocus={onFocus}
				data-testid={`photon-site-data-input-${field.path}`}
			/>
		);
	}
	if (field.kind === "number") {
		return (
			<input
				type="number"
				className="h-11 w-full rounded-[14px] border px-3 text-sm outline-none"
				style={fieldStyle}
				value={stringValue}
				onChange={(event) => {
					const v = event.currentTarget.value;
					onChange(v === "" ? "" : Number(v));
				}}
				onFocus={onFocus}
				data-testid={`photon-site-data-input-${field.path}`}
			/>
		);
	}
	const inputType =
		field.kind === "email"
			? "email"
			: field.kind === "url"
				? "url"
				: field.kind === "phone"
					? "tel"
					: "text";
	return (
		<input
			type={inputType}
			className="h-11 w-full rounded-[14px] border px-3 text-sm outline-none"
			style={fieldStyle}
			value={stringValue}
			onChange={(event) => onChange(event.currentTarget.value)}
			onFocus={onFocus}
			data-testid={`photon-site-data-input-${field.path}`}
		/>
	);
};

export const SiteDataSurface = ({
	siteDataSchemas,
	selectedDataFieldId,
	onSelectedDataFieldChange,
	site,
	onSiteSettingChange,
	onSiteSettingFocus,
}: Props) => {
	const resolved = useMemo(
		() => resolvePhotonSiteData(siteDataSchemas, site.settings),
		[siteDataSchemas, site.settings],
	);

	const selected = useMemo(
		() => findField(siteDataSchemas, selectedDataFieldId),
		[siteDataSchemas, selectedDataFieldId],
	);

	if (siteDataSchemas.length === 0) {
		return (
			<div
				className="rounded-[20px] border p-6 text-sm italic"
				style={cardStyle}
				data-testid="photon-site-data-empty"
			>
				No site data schemas registered. Packages contribute schemas through
				their kit (siteDataSchemas field).
			</div>
		);
	}

	const value = selected
		? resolved.values[selected.schema.id]?.[selected.field.path]
		: undefined;
	const isOverridden =
		selected !== null &&
		value !== undefined &&
		value !== selected.field.defaultValue;

	return (
		<div
			className="grid gap-5"
			style={{ gridTemplateColumns: "minmax(0, 34%) minmax(0, 1fr)" }}
			data-testid="photon-site-data-surface"
		>
			<div className="flex flex-col gap-4">
				{siteDataSchemas.map((schema) => (
					<div key={schema.id} className="flex flex-col gap-2">
						<div className="flex flex-col gap-1">
							<div className="text-sm font-semibold">{schema.label}</div>
							{schema.description ? (
								<div className="text-xs" style={subtleStyle}>
									{schema.description}
								</div>
							) : null}
						</div>
						<div className="flex flex-col gap-1">
							{schema.fields.map((field) => {
								const id = fieldId(schema.id, field.path);
								const isActive = selected
									? selected.schema.id === schema.id &&
										selected.field.path === field.path
									: false;
								return (
									<button
										key={id}
										type="button"
										onClick={() => onSelectedDataFieldChange(id)}
										className="flex cursor-pointer flex-col gap-1 rounded-[14px] border p-2 text-left text-sm"
										style={isActive ? activeStyle : fieldStyle}
										data-testid={`photon-site-data-field-${schema.id}-${field.path}`}
									>
										<div className="font-medium">{field.label}</div>
										<div className="text-xs" style={subtleStyle}>
											<code>{`${schema.id}.${field.path}`}</code>
										</div>
									</button>
								);
							})}
						</div>
					</div>
				))}
			</div>
			{selected ? (
				<div className="flex flex-col gap-4">
					<div
						className="flex flex-col gap-3 rounded-[20px] border p-4"
						style={cardStyle}
					>
						<div className="flex items-baseline justify-between gap-2">
							<div>
								<div
									className="text-xs uppercase tracking-wide"
									style={subtleStyle}
								>
									{selected.schema.label}
								</div>
								<div className="text-lg font-semibold">
									{selected.field.label}
								</div>
							</div>
							{isOverridden ? (
								<span
									className="rounded-full border px-2 py-0.5 text-xs"
									style={badgeStyle}
									data-testid="photon-site-data-overridden-badge"
								>
									site override
								</span>
							) : null}
						</div>
						{selected.field.description ? (
							<div className="text-sm" style={subtleStyle}>
								{selected.field.description}
							</div>
						) : null}
						<label className="flex flex-col gap-2 text-xs font-semibold">
							Value
							{renderEditor(
								selected.field,
								value,
								(next) =>
									onSiteSettingChange(
										sitePath(selected.schema.id, selected.field.path),
										next,
									),
								() =>
									onSiteSettingFocus(
										sitePath(selected.schema.id, selected.field.path),
									),
							)}
						</label>
						{isOverridden ? (
							<button
								type="button"
								className="cursor-pointer self-start rounded-full border px-3 py-1 text-xs font-semibold"
								style={fieldStyle}
								onClick={() =>
									onSiteSettingChange(
										sitePath(selected.schema.id, selected.field.path),
										undefined,
									)
								}
								data-testid="photon-site-data-reset"
							>
								Reset to default
							</button>
						) : null}
						<div className="text-xs" style={subtleStyle}>
							Path: <code>{sitePath(selected.schema.id, selected.field.path)}</code>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};
