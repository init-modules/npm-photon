import assert from "node:assert/strict";
import test from "node:test";
import {
	findPhotonFormSchema,
	photonFormSchemaToDefinition,
} from "./helpers";
import type { PhotonFormSchemaDescriptor } from "./types";

const contactSchema: PhotonFormSchemaDescriptor = {
	id: "test.contact",
	packageName: "test",
	label: "Contact",
	fields: [
		{
			id: "name",
			name: "name",
			type: "text",
			label: "Name",
			required: true,
		},
		{
			id: "email",
			name: "email",
			type: "email",
			label: "Email",
			required: true,
		},
	],
	policy: { lockedFieldIds: ["email"] },
	submit: { intent: "contact.submit" },
};

const newsletterSchema: PhotonFormSchemaDescriptor = {
	id: "test.newsletter",
	packageName: "test",
	label: "Newsletter",
	fields: [
		{ id: "email", name: "email", type: "email", label: "Email" },
	],
};

test("photonFormSchemaToDefinition copies fields and policy into a form definition", () => {
	const definition = photonFormSchemaToDefinition(contactSchema);
	assert.equal(definition.id, "test.contact");
	assert.equal(definition.mode, "extendable");
	assert.equal(definition.defaultFields.length, 2);
	assert.deepEqual(definition.policy?.lockedFieldIds, ["email"]);
});

test("photonFormSchemaToDefinition leaves submit metadata to the descriptor", () => {
	const definition = photonFormSchemaToDefinition(contactSchema);
	assert.equal((definition as { submit?: unknown }).submit, undefined);
});

test("findPhotonFormSchema locates a schema by id", () => {
	const schemas = [contactSchema, newsletterSchema];
	const found = findPhotonFormSchema(schemas, "test.newsletter");
	assert.equal(found?.id, "test.newsletter");
});

test("findPhotonFormSchema returns undefined when id missing", () => {
	const found = findPhotonFormSchema([contactSchema], "missing.id");
	assert.equal(found, undefined);
});
