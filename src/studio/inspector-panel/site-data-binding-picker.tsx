"use client";

import { useState } from "react";
import {
	usePhotonSiteData,
	usePhotonStore,
} from "../../context/photon-context";

type Props = {
	onPick: (binding: string) => void;
};

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

export const SiteDataBindingPicker = ({ onPick }: Props) => {
	const siteData = usePhotonSiteData();
	const routeContextFields = usePhotonStore(
		(state) => state.routeContextFields,
	);
	const [isOpen, setIsOpen] = useState(false);

	if (siteData.schemas.length === 0 && routeContextFields.length === 0) {
		return null;
	}

	const handlePick = (schemaId: string, fieldPath: string) => {
		const binding = `{{ ${schemaId}.${fieldPath} }}`;
		onPick(binding);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-flex">
			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className="cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold"
				style={buttonStyle}
				data-testid="photon-bind-to-data-button"
				aria-expanded={isOpen}
			>
				🔗 Bind to data
			</button>
			{isOpen ? (
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
