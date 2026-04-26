import assert from "node:assert/strict";
import test from "node:test";

// Smoke-test the token shape & defaults without React render.
// Full provider integration is covered by contract tests.
import {
	type PhotonInspectorDensityTokens,
} from "./inspector-density-context";

const requiredTokenKeys: Array<keyof PhotonInspectorDensityTokens> = [
	"rowGap",
	"sectionPadding",
	"headerPadding",
	"sectionRadius",
	"sectionHeaderClass",
	"fieldLabelClass",
	"rowSpacing",
	"labelGutterWidth",
	"rowMinHeight",
	"tabClass",
	"inputClass",
	"subtitleClass",
];

test("PhotonInspectorDensityTokens shape declares all required spacing keys", () => {
	const sample: PhotonInspectorDensityTokens = {
		rowGap: "x",
		sectionPadding: "x",
		headerPadding: "x",
		sectionRadius: "x",
		sectionHeaderClass: "x",
		fieldLabelClass: "x",
		rowSpacing: "x",
		labelGutterWidth: "x",
		rowMinHeight: "x",
		tabClass: "x",
		inputClass: "x",
		subtitleClass: "x",
	};
	for (const key of requiredTokenKeys) {
		assert.ok(key in sample, `token shape must include ${key}`);
	}
});
