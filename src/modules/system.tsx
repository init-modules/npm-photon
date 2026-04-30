"use client";

import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import { EditableText } from "../components/editable/editable-text";
import { EditableTextarea } from "../components/editable/editable-textarea";
import {
	PhotonComponentLibraryStackContext,
	usePhotonComponentLibraryStack,
} from "../context/photon-component-library-context";
import { usePhotonStore } from "../context/photon-context";
import {
	createPhotonLocalizedDefault,
	definePhotonBlockDefinition,
} from "../helpers/document";
import {
	PHOTON_COMPONENT_REFERENCE_AREA_ID,
	resolvePhotonComponentReferenceBlocks,
} from "../helpers/component-library";
import { createPhotonKit } from "../helpers/installable";
import { isPhotonFramelessSiteDesign } from "../helpers/site-design";
import { getPhotonSurfaceModeStyle } from "../helpers/surface-layout";
import type {
	PhotonArea,
	PhotonBlock,
	PhotonField,
	PhotonInstallableKit,
	PhotonModule,
	PhotonComponentReferenceProps,
	PhotonBlockComponentProps,
} from "../types";

export * from "./system/site/site-color-schemes";
export * from "./system/site/site-design-presets";

import { siteDesignSettingsPanel } from "./system/site/site-design-settings-panel";
import { siteFooterShellDefinition } from "./system/site/site-footer-shell-definition";
import { siteHeaderShellDefinition } from "./system/site/site-header-shell-definition";
import {
	photonSystemConditionDefinitions,
	photonSystemConditionEvaluators,
	photonSystemInteractionActions,
	photonSystemInteractionPolicies,
	photonSystemInteractionSurfaces,
} from "./system/site/site-interaction-surfaces";
import { photonSystemSiteDataSchemas } from "./system/site/site-data-schemas";
import { photonSystemRouteContextFields } from "./system/site/route-context-fields";
import { photonSystemProductsDocument } from "./system/site/products-document";
import { photonSystemFormSchemas } from "./system/site/form-schemas";

type SplitLayoutColumn = {
	areaId: string;
	label: string;
	width: string;
	sticky: boolean;
};

type SplitLayoutProps = {
	eyebrow: string;
	title: string;
	body: string;
	gap: number;
	surface: "glass" | "bright" | "ink";
	columns: SplitLayoutColumn[];
};

const surfaceStyles: Record<SplitLayoutProps["surface"], string> = {
	glass:
		"border-white/10 bg-[linear-gradient(180deg,rgba(7,17,31,0.85),rgba(8,21,38,0.7))] text-white",
	bright:
		"border-slate-200 bg-[linear-gradient(180deg,#f7f9fc_0%,#eef3fb_100%)] text-slate-950",
	ink: "border-cyan-300/14 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.11),transparent_24%),linear-gradient(180deg,#08111e_0%,#050912_100%)] text-white",
};

const getColumnConfig = (
	columns: SplitLayoutColumn[],
	area: PhotonArea,
	index: number,
) =>
	columns.find((column) => column.areaId === area.id) ?? {
		areaId: area.id,
		label: "",
		width: "minmax(0,1fr)",
		sticky: false,
	};

const SplitLayout = ({
	block,
	renderArea,
}: {
	block: PhotonBlock<SplitLayoutProps>;
	renderArea?: (area: PhotonArea, index: number) => ReactNode;
}) => {
	const mode = usePhotonStore((state) => state.mode);
	const siteDesign = usePhotonStore(
		(state) => state.site.settings.design,
	);
	const columns = block.props.columns ?? [];
	const areas = block.areas ?? [];
	const templateColumns = areas
		.map((area, index) => getColumnConfig(columns, area, index).width)
		.join(" ");
	const surface = surfaceStyles[block.props.surface] ?? surfaceStyles.glass;
	const framelessSurface = isPhotonFramelessSiteDesign(siteDesign);
	const stickyPreviewEnabled = mode !== "builder";

	return (
		<section
			className={clsx(
				"min-w-0 px-6 py-8 sm:px-8 sm:py-10",
				framelessSurface
					? "rounded-none border-0 bg-transparent text-[var(--photon-site-text)] shadow-none"
					: "rounded-[38px] border shadow-[0_28px_90px_rgba(2,12,27,0.16)]",
				!framelessSurface && surface,
			)}
			style={
				framelessSurface
					? (getPhotonSurfaceModeStyle("bleed") as CSSProperties)
					: undefined
			}
		>
			<div className="max-w-3xl">
				<EditableText
					blockId={block.id}
					path="eyebrow"
					className={clsx(
						"text-[11px] font-semibold uppercase tracking-[0.3em]",
						framelessSurface
							? "text-[var(--photon-site-muted)]"
							: block.props.surface === "bright"
								? "text-slate-500"
								: "text-cyan-100/70",
					)}
				/>
				<EditableText
					blockId={block.id}
					path="title"
					as="h2"
					className={clsx(
						"mt-4 block text-balance text-3xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-4xl xl:text-5xl",
						framelessSurface
							? "text-[var(--photon-site-text)]"
							: block.props.surface === "bright"
								? "text-slate-950"
								: "text-white",
					)}
				/>
				<EditableTextarea
					blockId={block.id}
					path="body"
					className={clsx(
						"mt-5 text-base leading-8",
						framelessSurface
							? "text-[var(--photon-site-muted)]"
							: block.props.surface === "bright"
								? "text-slate-600"
								: "text-slate-300",
					)}
				/>
			</div>

			<div
				className="mt-8 grid grid-cols-1 items-start gap-[var(--photon-layout-gap)] lg:[grid-template-columns:var(--photon-layout-columns)]"
				style={
					{
						"--photon-layout-columns": templateColumns || "minmax(0,1fr)",
						"--photon-layout-gap": `${block.props.gap || 24}px`,
					} as CSSProperties
				}
			>
				{areas.map((area, index) => {
					const column = getColumnConfig(columns, area, index);

					return (
						<div
							key={`${block.id}-${area.id}`}
							className={clsx(
								"min-w-0",
								column.sticky &&
									stickyPreviewEnabled &&
									"lg:sticky lg:self-start",
							)}
							style={
								column.sticky && stickyPreviewEnabled
									? {
											top: "calc(var(--photon-dock-offset, 0px) + var(--photon-site-header-offset, 0px) + var(--photon-site-header-height, 0px) + 0.75rem)",
										}
									: undefined
							}
						>
							<div
								className={clsx(
									"relative isolate min-w-0 px-0 py-0",
									framelessSurface
										? "rounded-none border-0 bg-transparent shadow-none"
										: block.props.surface === "bright"
											? "border-0 bg-transparent shadow-none"
											: "border-0 bg-transparent shadow-none",
								)}
							>
								{column.label?.trim() ? (
									<div
										className={clsx(
											"mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]",
											framelessSurface
												? "text-[var(--photon-site-muted)]"
												: block.props.surface === "bright"
													? "text-slate-500"
													: "text-white/40",
										)}
									>
										{column.label}
									</div>
								) : null}
								{renderArea ? renderArea(area, index) : null}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

const splitLayoutFields: PhotonField[] = [
	{
		path: "eyebrow",
		label: "Eyebrow",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "title",
		label: "Title",
		kind: "text",
		group: "content",
		localization: "localized",
	},
	{
		path: "body",
		label: "Body",
		kind: "textarea",
		group: "content",
		localization: "localized",
	},
	{
		path: "gap",
		label: "Column gap",
		kind: "number",
		min: 12,
		max: 72,
		step: 2,
		group: "layout",
		localization: "shared",
	},
	{
		path: "surface",
		label: "Surface",
		kind: "select",
		group: "style",
		localization: "shared",
		options: [
			{ label: "Glass", value: "glass" },
			{ label: "Bright", value: "bright" },
			{ label: "Ink", value: "ink" },
		],
	},
	{
		path: "columns.0.areaId",
		label: "Column 1 area",
		kind: "text",
		group: "layout",
		localization: "shared",
	},
	{
		path: "columns.0.label",
		label: "Column 1 label",
		kind: "text",
		group: "layout",
		localization: "shared",
	},
	{
		path: "columns.0.width",
		label: "Column 1 width",
		kind: "text",
		group: "layout",
		localization: "shared",
		description: "Any valid CSS track, for example minmax(0,0.38fr) or 360px.",
	},
	{
		path: "columns.0.sticky",
		label: "Column 1 sticky",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
	{
		path: "columns.1.areaId",
		label: "Column 2 area",
		kind: "text",
		group: "layout",
		localization: "shared",
	},
	{
		path: "columns.1.label",
		label: "Column 2 label",
		kind: "text",
		group: "layout",
		localization: "shared",
	},
	{
		path: "columns.1.width",
		label: "Column 2 width",
		kind: "text",
		group: "layout",
		localization: "shared",
	},
	{
		path: "columns.1.sticky",
		label: "Column 2 sticky",
		kind: "toggle",
		group: "layout",
		localization: "shared",
	},
];

const ComponentReferenceBlock = ({
	block,
	renderArea,
}: PhotonBlockComponentProps<PhotonComponentReferenceProps>) => {
	const siteSettings = usePhotonStore((state) => state.site.settings);
	const componentLibraryStack = usePhotonComponentLibraryStack();
	const blocks = resolvePhotonComponentReferenceBlocks({
		block,
		siteSettings,
		stack: componentLibraryStack,
	});

	if (!blocks.length) {
		return (
			<section className="rounded-[28px] border border-dashed border-[var(--photon-site-border)] px-6 py-8 text-sm text-[var(--photon-site-muted)]">
				Reusable component is unavailable.
			</section>
		);
	}

	return (
		<section data-photon-component-reference={block.props.itemId}>
			<PhotonComponentLibraryStackContext.Provider
				value={[...componentLibraryStack, block.props.itemId]}
			>
				{renderArea?.({
					id: PHOTON_COMPONENT_REFERENCE_AREA_ID,
					label: block.props.label ?? "Reusable component",
					blocks,
				}, 0)}
			</PhotonComponentLibraryStackContext.Provider>
		</section>
	);
};

const componentReferenceFields: PhotonField[] = [
	{
		path: "itemId",
		label: "Library item",
		kind: "text",
		group: "data",
		localization: "shared",
	},
	{
		path: "label",
		label: "Label",
		kind: "text",
		group: "content",
		localization: "localized",
	},
];

export const photonSystemModule: PhotonModule = {
	module: "photon-system",
	label: "Photon System",
	labelKey: "photon.system.module.label",
	version: "0.2.0",
	blocks: [
		siteHeaderShellDefinition,
		siteFooterShellDefinition,
		definePhotonBlockDefinition({
			type: "split-layout",
			label: "Split Layout",
			labelKey: "photon.system.splitLayout.label",
			description:
				"Nested horizontal layout container with independent sticky columns and stackable child blocks.",
			descriptionKey: "photon.system.splitLayout.description",
			category: "Layout",
			icon: "layout-grid",
			defaults: {
				eyebrow: createPhotonLocalizedDefault({
					en: "Layout system",
					ru: "Система layout-блоков",
				}),
				title: createPhotonLocalizedDefault({
					en: "Compose horizontal sections without leaving the live page",
					ru: "Собирайте горизонтальные секции прямо на живой странице",
				}),
				body: createPhotonLocalizedDefault({
					en: "Use nested layout containers to pin one side, stack blocks on the other and tune widths directly from the inspector.",
					ru: "Используйте вложенные layout-контейнеры, чтобы зафиксировать одну колонку, собрать стек блоков во второй и настраивать ширины прямо из инспектора.",
				}),
				gap: 24,
				surface: "glass",
				columns: [
					{
						areaId: "primary",
						label: "",
						width: "minmax(280px, 0.38fr)",
						sticky: true,
					},
					{
						areaId: "secondary",
						label: "",
						width: "minmax(0, 0.62fr)",
						sticky: false,
					},
				],
			},
			areas: [
				{
					id: "primary",
					label: "Primary rail",
					blocks: [],
				},
				{
					id: "secondary",
					label: "Content stack",
					blocks: [],
				},
			],
			fields: splitLayoutFields,
			component: SplitLayout,
		}),
		definePhotonBlockDefinition({
			type: "component-reference",
			label: "Reusable Component",
			labelKey: "photon.system.componentReference.label",
			description:
				"Reference to a site-owned reusable component library item.",
			descriptionKey: "photon.system.componentReference.description",
			category: "Library",
			icon: "component",
			defaults: {
				itemId: "",
				label: "",
			},
			fields: componentReferenceFields,
			component: ComponentReferenceBlock,
		}),
	],
	siteSettingsPanels: [siteDesignSettingsPanel],
};

export const photonSystemKit: PhotonInstallableKit =
	createPhotonKit({
		kind: "photon-system-kit",
		key: "photon-system",
		label: "Photon System",
	modules: [photonSystemModule],
	interactionSurfaces: photonSystemInteractionSurfaces,
	interactionActions: photonSystemInteractionActions,
	interactionPolicies: photonSystemInteractionPolicies,
	conditionDefinitions: photonSystemConditionDefinitions,
	conditionEvaluators: photonSystemConditionEvaluators,
	siteDataSchemas: photonSystemSiteDataSchemas,
	routeContextFields: photonSystemRouteContextFields,
	formSchemas: photonSystemFormSchemas,
	documents: {
		[photonSystemProductsDocument.id]: photonSystemProductsDocument,
	},
});
