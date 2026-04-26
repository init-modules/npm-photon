import assert from "node:assert/strict";
import test from "node:test";
import type { PhotonConditionEvaluationContext } from "../../../types";
import { photonSystemConditionEvaluators } from "./site-interaction-surfaces";

const baseContext = (
	searchState?: PhotonConditionEvaluationContext["searchState"],
): PhotonConditionEvaluationContext => ({
	siteSettings: {},
	searchState,
});

test("search.queryIsEmpty: null when no search state", () => {
	const result = photonSystemConditionEvaluators["search.queryIsEmpty"]?.(
		baseContext(),
	);
	assert.equal(result, null);
});

test("search.queryIsEmpty: true when query is empty string", () => {
	const result = photonSystemConditionEvaluators["search.queryIsEmpty"]?.(
		baseContext({ query: "" }),
	);
	assert.equal(result, true);
});

test("search.queryIsEmpty: true for whitespace-only query", () => {
	const result = photonSystemConditionEvaluators["search.queryIsEmpty"]?.(
		baseContext({ query: "   " }),
	);
	assert.equal(result, true);
});

test("search.queryIsEmpty: false when query has content", () => {
	const result = photonSystemConditionEvaluators["search.queryIsEmpty"]?.(
		baseContext({ query: "coffee" }),
	);
	assert.equal(result, false);
});

test("search.hasResults: null when results not provided", () => {
	const result = photonSystemConditionEvaluators["search.hasResults"]?.(
		baseContext(),
	);
	assert.equal(result, null);
});

test("search.hasResults: true when results array non-empty", () => {
	const result = photonSystemConditionEvaluators["search.hasResults"]?.(
		baseContext({ results: [{ id: "1" }] }),
	);
	assert.equal(result, true);
});

test("search.hasResults: false when results array empty", () => {
	const result = photonSystemConditionEvaluators["search.hasResults"]?.(
		baseContext({ results: [] }),
	);
	assert.equal(result, false);
});

test("search.providerUnavailable: true when provider explicitly unavailable", () => {
	const result = photonSystemConditionEvaluators[
		"search.providerUnavailable"
	]?.(baseContext({ isProviderAvailable: false }));
	assert.equal(result, true);
});

test("search.providerUnavailable: true when provider available but last error present", () => {
	const result = photonSystemConditionEvaluators[
		"search.providerUnavailable"
	]?.(baseContext({ isProviderAvailable: true, lastError: "timeout" }));
	assert.equal(result, true);
});

test("search.providerUnavailable: false when provider available and no error", () => {
	const result = photonSystemConditionEvaluators[
		"search.providerUnavailable"
	]?.(baseContext({ isProviderAvailable: true, lastError: null }));
	assert.equal(result, false);
});

test("search.providerUnavailable: null when state indeterminate", () => {
	const result = photonSystemConditionEvaluators[
		"search.providerUnavailable"
	]?.(baseContext({}));
	assert.equal(result, null);
});
