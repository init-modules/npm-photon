import type { PhotonFormSchemaDescriptor } from "../../../types";

export const photonSystemFormSchemas: PhotonFormSchemaDescriptor[] = [
	{
		id: "photon.contact",
		packageName: "photon-system",
		label: "Contact form",
		description:
			"Default contact form schema. Workspaces can extend or replace fields via site overrides.",
		fields: [
			{
				id: "name",
				name: "name",
				type: "text",
				label: "Your name",
				placeholder: "Jane Doe",
				required: true,
				width: "half",
				locked: true,
			},
			{
				id: "email",
				name: "email",
				type: "email",
				label: "Email",
				placeholder: "you@example.com",
				required: true,
				width: "half",
				locked: true,
			},
			{
				id: "phone",
				name: "phone",
				type: "phone",
				label: "Phone (optional)",
				width: "half",
			},
			{
				id: "message",
				name: "message",
				type: "textarea",
				label: "Message",
				required: true,
				width: "full",
				locked: true,
			},
		],
		policy: {
			allowAddFields: true,
			allowRemoveFields: true,
			allowReorder: true,
			allowEditFieldNames: false,
			lockedFieldIds: ["name", "email", "message"],
		},
		submit: {
			intent: "photon.contact.submit",
			endpoint: "/api/photon/contact",
			successMessage: "Thanks — we'll be in touch shortly.",
			errorMessage:
				"Sorry, the message could not be sent. Please try again later.",
		},
	},
	{
		id: "photon.newsletter",
		packageName: "photon-system",
		label: "Newsletter signup",
		description: "Single-field email subscription form.",
		fields: [
			{
				id: "email",
				name: "email",
				type: "email",
				label: "Email",
				placeholder: "you@example.com",
				required: true,
				width: "full",
				locked: true,
			},
		],
		policy: {
			allowAddFields: false,
			allowRemoveFields: false,
			allowReorder: false,
		},
		submit: {
			intent: "photon.newsletter.submit",
			endpoint: "/api/photon/newsletter",
			successMessage: "Subscribed.",
			errorMessage: "Subscription failed.",
		},
	},
];
