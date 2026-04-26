import assert from "node:assert/strict";
import test from "node:test";
import type {
	PhotonAnyBlockDefinition,
	PhotonInteractionSurfaceDefinition,
} from "../types";
import {
	asPhotonComponentDefinition,
	blockDefinitionAsPhotonComponentDefinition,
	collectPhotonComponentSwitchableOptions,
	getPhotonComponentInstanceLabel,
	surfaceDefinitionAsPhotonComponentDefinition,
} from "./component-definition";

const blockDef: PhotonAnyBlockDefinition = {
	type: "subscribe-button",
	label: "Subscribe",
	description: "Newsletter subscribe",
	category: "interactive",
	defaults: {},
	fields: [
		{ kind: "text", path: "label", label: "Label" } as never,
	],
	component: () => null,
	package: "newsletter",
	previewScenarios: [{ id: "default", label: "Default" }],
	states: [
		{ id: "subscribed", label: "Subscribed" },
	],
};

const surfaceDef: PhotonInteractionSurfaceDefinition = {
	id: "auth.dialog",
	label: "Auth dialog",
	kind: "dialog",
	rendererKey: "auth.dialog",
	defaultInstances: [
		{
			id: "auth:default",
			definitionId: "auth.dialog",
			label: "Default auth",
			props: { title: "Sign in" },
		},
		{
			id: "auth:checkout",
			definitionId: "auth.dialog",
			label: "Checkout auth",
			enabled: true,
		},
	],
};

test("blockDefinitionAsPhotonComponentDefinition maps block.type → id and kind to 'inline'", () => {
	const component = blockDefinitionAsPhotonComponentDefinition(blockDef);
	assert.equal(component.id, "subscribe-button");
	assert.equal(component.kind, "inline");
	assert.equal(component.label, "Subscribe");
	assert.equal(component.package, "newsletter");
	assert.equal(component.fields?.length, 1);
	assert.equal(component.previewScenarios?.length, 1);
	assert.equal(component.states?.length, 1);
	assert.equal(
		component.instances,
		undefined,
		"inline blocks have no native instance system",
	);
	assert.equal(component.source.kind, "block");
});

test("surfaceDefinitionAsPhotonComponentDefinition maps surface kind verbatim and unwraps defaultInstances", () => {
	const component = surfaceDefinitionAsPhotonComponentDefinition(surfaceDef);
	assert.equal(component.id, "auth.dialog");
	assert.equal(component.kind, "dialog");
	assert.equal(component.instances?.length, 2);
	assert.equal(component.instances?.[0].id, "auth:default");
	assert.deepEqual(component.instances?.[0].props, { title: "Sign in" });
	assert.equal(component.source.kind, "surface");
});

test("asPhotonComponentDefinition discriminates block vs surface via 'component' field", () => {
	const fromBlock = asPhotonComponentDefinition(blockDef);
	const fromSurface = asPhotonComponentDefinition(surfaceDef);
	assert.equal(fromBlock.kind, "inline");
	assert.equal(fromSurface.kind, "dialog");
});

test("getPhotonComponentInstanceLabel returns component label when no instance id", () => {
	const component = surfaceDefinitionAsPhotonComponentDefinition(surfaceDef);
	assert.equal(
		getPhotonComponentInstanceLabel(component, undefined),
		"Auth dialog",
	);
});

test("getPhotonComponentInstanceLabel returns matching instance label when found", () => {
	const component = surfaceDefinitionAsPhotonComponentDefinition(surfaceDef);
	assert.equal(
		getPhotonComponentInstanceLabel(component, "auth:checkout"),
		"Checkout auth",
	);
});

test("getPhotonComponentInstanceLabel falls back to component label when instance id not found", () => {
	const component = surfaceDefinitionAsPhotonComponentDefinition(surfaceDef);
	assert.equal(
		getPhotonComponentInstanceLabel(component, "missing"),
		"Auth dialog",
	);
});

test("collectPhotonComponentSwitchableOptions merges previewScenarios and states with kind discriminator", () => {
	const component = blockDefinitionAsPhotonComponentDefinition(blockDef);
	const options = collectPhotonComponentSwitchableOptions(component);
	assert.equal(options.length, 2);
	assert.equal(options[0].kind, "scenario");
	assert.equal(options[0].id, "default");
	assert.equal(options[1].kind, "state");
	assert.equal(options[1].id, "subscribed");
});

test("collectPhotonComponentSwitchableOptions returns empty array when no scenarios/states", () => {
	const component = surfaceDefinitionAsPhotonComponentDefinition(surfaceDef);
	const options = collectPhotonComponentSwitchableOptions(component);
	assert.deepEqual(options, []);
});
