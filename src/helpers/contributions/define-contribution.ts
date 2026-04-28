import type {
	PhotonSiteFrameContribution,
	PhotonSiteFrameContributionDefaults,
} from "./types";

/**
 * Identity factory that captures a site-frame contribution declaration
 * with full type inference on the defaults shape. The captured object
 * is consumed by the contribution registry at app composition time.
 *
 * Why an identity function: it lets call sites declare contributions in
 * package-static modules without importing the registry (preserves the
 * direction of dependency — packages know the contract, the host owns
 * registration).
 *
 * Example:
 * ```ts
 * export const commerceCartContribution = definePhotonSiteFrameContribution({
 *   id: "commerce.cart",
 *   packageName: "commerce-photon",
 *   slot: headerActionsSlot,
 *   defaults: {
 *     enabled: true,
 *     order: 20,
 *     label: { ru: "Корзина", en: "Cart" },
 *     href: "/cart",
 *     icon: "shopping-bag",
 *   },
 *   configurable: {
 *     enabled: { kind: "toggle" },
 *     label: { kind: "localized-text" },
 *     order: { kind: "order" },
 *   },
 *   isAvailable: ({ site }) => site.settings.commerce?.checkoutEnabled !== false,
 *   component: CommerceCartAction,
 * });
 * ```
 */
export const definePhotonSiteFrameContribution = <
	TDefaults extends PhotonSiteFrameContributionDefaults,
>(
	contribution: PhotonSiteFrameContribution<TDefaults>,
): PhotonSiteFrameContribution<TDefaults> => contribution;
