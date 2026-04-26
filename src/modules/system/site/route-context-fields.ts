import type { PhotonRouteContextField } from "../../../types";

export const photonSystemRouteContextFields: PhotonRouteContextField[] = [
	{
		path: "slug",
		label: "Slug",
		kind: "text",
		description: "Item slug from the URL.",
		packageName: "photon-system",
	},
	{
		path: "city",
		label: "City",
		kind: "text",
		description:
			"Active city. Defaults to almaty when URL has no city segment.",
		defaultValue: "almaty",
		packageName: "photon-system",
	},
];
