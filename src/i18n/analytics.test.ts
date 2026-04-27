import assert from "node:assert/strict";
import test from "node:test";
import {
	emitPhotonLocaleAnalyticsEvent,
	setPhotonLocaleAnalyticsEmitter,
	type PhotonLocaleAnalyticsEvent,
} from "./analytics";

test("noop when emitter is unset", () => {
	setPhotonLocaleAnalyticsEmitter(null);
	// Should not throw.
	emitPhotonLocaleAnalyticsEvent({ name: "page_view", locale: "en" });
});

test("calls emitter with event payload", () => {
	const captured: PhotonLocaleAnalyticsEvent[] = [];
	setPhotonLocaleAnalyticsEmitter((event) => captured.push(event));

	emitPhotonLocaleAnalyticsEvent({ name: "page_view", locale: "ru" });
	emitPhotonLocaleAnalyticsEvent({
		name: "locale_switch",
		locale: "de",
		previousLocale: "en",
	});

	assert.equal(captured.length, 2);
	assert.equal(captured[0].name, "page_view");
	assert.equal(captured[1].previousLocale, "en");
	setPhotonLocaleAnalyticsEmitter(null);
});

test("emitter exception is swallowed", () => {
	setPhotonLocaleAnalyticsEmitter(() => {
		throw new Error("boom");
	});
	// Should not throw.
	emitPhotonLocaleAnalyticsEvent({ name: "page_view", locale: "en" });
	setPhotonLocaleAnalyticsEmitter(null);
});
