import { createPhotonInteractionSurfaceDefinition } from "../../../helpers/interaction-surfaces";
import { createPhotonInteractionActionDefinition } from "../../../helpers/interactions";
import type {
	PhotonInteractionActionDefinition,
	PhotonInteractionSurfaceDefinition,
	PhotonInteractionTriggerSlot,
} from "../../../types";

export const photonSiteSearchInteractionSurface =
	createPhotonInteractionSurfaceDefinition({
		id: "photon.site-search",
		label: "Website search",
		description: "Shared dialog for searching public website content.",
		kind: "dialog",
		rendererKey: "photon.site-search",
		order: 20,
		fields: [
				{
					path: "placeholder",
					label: "Placeholder",
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
					path: "description",
					label: "Description",
					kind: "textarea",
					group: "content",
					localization: "localized",
				},
				{
					path: "hint",
					label: "Hint",
					kind: "textarea",
					group: "content",
					localization: "localized",
				},
				{
					path: "loading",
					label: "Loading copy",
					kind: "text",
					group: "content",
					localization: "localized",
				},
				{
					path: "empty",
					label: "Empty result copy",
					kind: "textarea",
					group: "content",
					localization: "localized",
				},
			],
			defaultInstances: [
				{
					id: "photon:site-search",
					definitionId: "photon.site-search",
					label: "Website search",
					props: {
						placeholder: "Search the website",
						title: "Search the website",
						description:
							"Find exact matches across static pages and publication pages.",
						hint:
							"Type at least 2 characters to search across static pages and publications.",
						loading: "Searching the live site surface...",
						empty: "No matches found for this query.",
					},
				},
		],
		defaultIntentBindings: [
			{
				intent: "search:site",
				surfaceInstanceId: "photon:site-search",
			},
		],
	});

export const photonToastInteractionSurface =
	createPhotonInteractionSurfaceDefinition({
		id: "photon.toast",
		label: "Toast messages",
		description: "Editable templates for short runtime notifications.",
		kind: "toast",
		rendererKey: "photon.toast",
		order: 90,
		fields: [
			{
				path: "title",
				label: "Title",
				kind: "text",
				group: "content",
				localization: "localized",
			},
			{
				path: "description",
				label: "Description",
				kind: "textarea",
				group: "content",
				localization: "localized",
			},
			{
				path: "status",
				label: "Status",
				kind: "select",
				group: "style",
				localization: "shared",
				options: [
					{ label: "Message", value: "message" },
					{ label: "Success", value: "success" },
					{ label: "Info", value: "info" },
					{ label: "Warning", value: "warning" },
					{ label: "Error", value: "error" },
				],
			},
		],
		defaultToastTemplates: [
			{
				id: "photon:local-draft-reverted",
				label: "Local draft reverted",
				status: "info",
				title: "Local draft reverted",
				description: "Local changes were reset to the last saved version.",
			},
			{
				id: "photon:workspace-readonly",
				label: "Workspace read-only",
				status: "error",
				title: "This workspace is read-only",
			},
		],
	});

export const photonSystemInteractionSurfaces: PhotonInteractionSurfaceDefinition[] =
	[photonSiteSearchInteractionSurface, photonToastInteractionSurface];

export const photonSystemInteractionActions: PhotonInteractionActionDefinition[] =
	[
		createPhotonInteractionActionDefinition({
			id: "photon.search-site",
			label: "Website search",
			description: "Open the shared website search dialog.",
			order: 20,
			fields: photonSiteSearchInteractionSurface.fields,
			defaultInstances: [
				{
					id: "photon:search-site",
					definitionId: "photon.search-site",
					label: "Website search",
					presentation: {
						type: "surface",
						intent: "search:site",
					},
				},
			],
			previewScenarios: [
				{ id: "empty", label: "Empty" },
				{ id: "loading", label: "Loading" },
				{ id: "results", label: "Results" },
			],
		}),
	];

export const createPhotonSiteSearchTriggerSlot = (
	id: string,
): PhotonInteractionTriggerSlot => ({
	id,
	label: "Search",
	description: "Header trigger that opens the website search action.",
	actionInstanceId: "photon:search-site",
	allowedActionDefinitionIds: ["photon.search-site"],
	action: {
		type: "surface",
		intent: "search:site",
	},
	previewScenarios: [
		{ id: "empty", label: "Empty" },
		{ id: "loading", label: "Loading" },
		{ id: "results", label: "Results" },
	],
});
