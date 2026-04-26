import type { PhotonSiteDataSchema } from "../../../types";

export const photonSystemSiteDataSchemas: PhotonSiteDataSchema[] = [
	{
		id: "brand",
		packageName: "photon-system",
		label: "Brand",
		description: "Project name and tagline used across the site.",
		fields: [
			{
				path: "name",
				label: "Brand name",
				kind: "text",
				defaultValue: "Photon",
				group: "content",
			},
			{
				path: "tagline",
				label: "Tagline",
				kind: "text",
				defaultValue: "",
				group: "content",
			},
			{
				path: "legalName",
				label: "Legal name",
				kind: "text",
				defaultValue: "",
				group: "advanced",
			},
		],
	},
	{
		id: "contacts",
		packageName: "photon-system",
		label: "Contacts",
		description:
			"Phone, email, and address used in headers, footers, and CTAs.",
		fields: [
			{
				path: "phone",
				label: "Phone",
				kind: "phone",
				defaultValue: "+7 (707) 040-43-43",
				group: "contact",
			},
			{
				path: "email",
				label: "Email",
				kind: "email",
				defaultValue: "hello@example.test",
				group: "contact",
			},
			{
				path: "address",
				label: "Address",
				kind: "textarea",
				defaultValue: "Almaty, Kazakhstan",
				group: "contact",
			},
			{
				path: "workingHours",
				label: "Working hours",
				kind: "text",
				defaultValue: "",
				group: "contact",
			},
		],
	},
	{
		id: "socials",
		packageName: "photon-system",
		label: "Social links",
		description: "Public social media profiles.",
		fields: [
			{
				path: "instagram",
				label: "Instagram URL",
				kind: "url",
				defaultValue: "",
				group: "social",
			},
			{
				path: "whatsapp",
				label: "WhatsApp URL",
				kind: "url",
				defaultValue: "",
				group: "social",
			},
		],
	},
];
