/**
 * Provider-agnostic analytics emit for locale-related events.
 *
 * Photon never picks a vendor. The host app wires `setPhotonLocaleAnalyticsEmitter`
 * once at boot to whatever it uses (Google Analytics gtag, PostHog,
 * Plausible, Umami, an internal HTTP collector, etc.). Photon then calls
 * `emitPhotonLocaleAnalyticsEvent(...)` whenever a locale-related thing
 * happens. If no emitter is registered the calls are silent no-ops, so
 * registration is opt-in per app.
 */

export type PhotonLocaleAnalyticsEventName =
	| "page_view"
	| "locale_switch"
	| "interface_locale_switch";

export interface PhotonLocaleAnalyticsEvent {
	name: PhotonLocaleAnalyticsEventName;
	/** The locale most relevant to the event. */
	locale: string;
	/** When the user just switched, this is the locale they came from. */
	previousLocale?: string;
	/** Free-form additional context — pathname, page key, etc. */
	context?: Record<string, unknown>;
}

export type PhotonLocaleAnalyticsEmitter = (
	event: PhotonLocaleAnalyticsEvent,
) => void;

let emitter: PhotonLocaleAnalyticsEmitter | null = null;

export const setPhotonLocaleAnalyticsEmitter = (
	next: PhotonLocaleAnalyticsEmitter | null,
): void => {
	emitter = next;
};

export const getPhotonLocaleAnalyticsEmitter = ():
	| PhotonLocaleAnalyticsEmitter
	| null => emitter;

export const emitPhotonLocaleAnalyticsEvent = (
	event: PhotonLocaleAnalyticsEvent,
): void => {
	if (!emitter) return;
	try {
		emitter(event);
	} catch {
		// Swallow analytics failures — they must never block UX.
	}
};
