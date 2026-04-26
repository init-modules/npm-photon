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
	"sectionRadius",
	"sectionTitleClass",
	"fieldLabelClass",
	"labelInlineGap",
	"rowSpacing",
];

test("PhotonInspectorDensityTokens shape declares all required spacing keys", () => {
	const sample: PhotonInspectorDensityTokens = {
		rowGap: "x",
		sectionPadding: "x",
		sectionRadius: "x",
		sectionTitleClass: "x",
		fieldLabelClass: "x",
		labelInlineGap: "x",
		rowSpacing: "x",
	};
	for (const key of requiredTokenKeys) {
		assert.ok(key in sample, `token shape must include ${key}`);
	}
});
