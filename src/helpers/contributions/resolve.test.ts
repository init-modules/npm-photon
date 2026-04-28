import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { PhotonSiteFrameContributionContext } from "./types";
import { definePhotonSiteFrameContribution } from "./define-contribution";
import { definePhotonSlot } from "./define-slot";
import {
	createPhotonSiteFrameContributionRegistry,
	createPhotonSlotRegistry,
} from "./registry";
import { resolvePhotonSlot } from "./resolve";

const headerSlot = definePhotonSlot({
	id: "header.actions",
	placement: "site-frame",
});

const footerSlot = definePhotonSlot({
	id: "footer.columns",
	placement: "site-frame",
});

const NoopComponent = () => null;

const cartContribution = definePhotonSiteFrameContribution({
	id: "commerce.cart",
	packageName: "commerce-photon",
	slot: headerSlot,
	defaults: {
		enabled: true,
		order: 20,
		label: { ru: "Корзина", en: "Cart" },
		href: "/cart",
		icon: "shopping-bag",
	},
	configurable: {
		enabled: { kind: "toggle" },
		label: { kind: "localized-text" },
		order: { kind: "order" },
	},
	component: NoopComponent,
});

const accountContribution = definePhotonSiteFrameContribution({
	id: "auth.account",
	packageName: "auth-photon",
	slot: headerSlot,
	defaults: {
		enabled: true,
		order: 10,
		label: { ru: "Кабинет", en: "Account" },
		href: "/account",
	},
	configurable: {
		enabled: { kind: "toggle" },
		label: { kind: "localized-text" },
		order: { kind: "order" },
	},
	component: NoopComponent,
});

const supportContribution = definePhotonSiteFrameContribution({
	id: "marketplace.support",
	packageName: "photon-marketplaces-kit",
	slot: headerSlot,
	defaults: {
		enabled: true,
		order: 50,
		label: { ru: "Помощь", en: "Help" },
		href: "/help",
	},
	configurable: {
		enabled: { kind: "toggle" },
		label: { kind: "localized-text" },
		href: { kind: "url" },
		order: { kind: "order" },
	},
	component: NoopComponent,
});

const buildSetup = () => {
	const slots = createPhotonSlotRegistry([headerSlot, footerSlot]);
	const registry = createPhotonSiteFrameContributionRegistry(
		[cartContribution, accountContribution, supportContribution],
		slots,
	);
	return { slots, registry };
};

const ctx = {} as PhotonSiteFrameContributionContext;

describe("resolvePhotonSlot", () => {
	it("returns package-default ordering when no overrides exist", () => {
		const { registry } = buildSetup();
		const result = resolvePhotonSlot(
			"header.actions",
			registry,
			undefined,
			ctx,
		);
		assert.deepEqual(
			result.map((r) => r.resolved.contributionId),
			["auth.account", "commerce.cart", "marketplace.support"],
		);
	});

	it("returns empty array for an empty slot", () => {
		const { registry } = buildSetup();
		const result = resolvePhotonSlot(
			"footer.columns",
			registry,
			[],
			ctx,
		);
		assert.deepEqual(result, []);
	});

	it("merges site override on top of package-default per field", () => {
		const { registry } = buildSetup();
		const result = resolvePhotonSlot(
			"header.actions",
			registry,
			[
				{
					contributionId: "commerce.cart",
					scope: "site",
					packageName: "site",
					label: { ru: "Моя корзина", en: "My cart" },
				},
			],
			ctx,
		);
		const cart = result.find(
			(r) => r.resolved.contributionId === "commerce.cart",
		);
		assert.ok(cart, "cart should resolve");
		assert.deepEqual(cart?.resolved.label, {
			ru: "Моя корзина",
			en: "My cart",
		});
		// Untouched fields fall through from package-default
		assert.equal(cart?.resolved.href, "/cart");
		assert.equal(cart?.resolved.icon, "shopping-bag");
	});

	it("workspace-draft scope wins over site scope on conflicting fields", () => {
		const { registry } = buildSetup();
		const result = resolvePhotonSlot(
			"header.actions",
			registry,
			[
				{
					contributionId: "commerce.cart",
					scope: "site",
					packageName: "site",
					label: { ru: "Site label" },
				},
				{
					contributionId: "commerce.cart",
					scope: "workspace-draft",
					packageName: "workspace",
					label: { ru: "Draft label" },
				},
			],
			ctx,
		);
		const cart = result.find(
			(r) => r.resolved.contributionId === "commerce.cart",
		);
		assert.equal(cart?.resolved.label?.ru, "Draft label");
	});

	it("hides contribution when merged enabled is false", () => {
		const { registry } = buildSetup();
		const result = resolvePhotonSlot(
			"header.actions",
			registry,
			[
				{
					contributionId: "commerce.cart",
					scope: "site",
					packageName: "site",
					enabled: false,
				},
			],
			ctx,
		);
		assert.deepEqual(
			result.map((r) => r.resolved.contributionId),
			["auth.account", "marketplace.support"],
		);
	});

	it("respects isAvailable predicate as final gate", () => {
		const slots = createPhotonSlotRegistry([headerSlot]);
		const guarded = definePhotonSiteFrameContribution({
			id: "commerce.cart",
			packageName: "commerce-photon",
			slot: headerSlot,
			defaults: { enabled: true, order: 20 },
			configurable: { enabled: { kind: "toggle" } },
			isAvailable: () => false,
			component: NoopComponent,
		});
		const registry = createPhotonSiteFrameContributionRegistry(
			[guarded],
			slots,
		);
		const result = resolvePhotonSlot(
			"header.actions",
			registry,
			[],
			ctx,
		);
		assert.deepEqual(result, []);
	});

	it("ignores override fields not in configurable (forward compat)", () => {
		const { registry } = buildSetup();
		const result = resolvePhotonSlot(
			"header.actions",
			registry,
			[
				{
					contributionId: "commerce.cart",
					scope: "site",
					packageName: "site",
					// `href` is NOT in commerce.cart.configurable; must be ignored.
					href: "/spoofed-cart",
					// `someUnknownField` also ignored
					someUnknownField: "leftover",
				},
			],
			ctx,
		);
		const cart = result.find(
			(r) => r.resolved.contributionId === "commerce.cart",
		);
		assert.equal(cart?.resolved.href, "/cart");
		assert.equal(
			(cart?.resolved as Record<string, unknown>).someUnknownField,
			undefined,
		);
	});

	it("skips orphan overrides referring to unknown contribution id", () => {
		const { registry } = buildSetup();
		const result = resolvePhotonSlot(
			"header.actions",
			registry,
			[
				{
					contributionId: "commerce.legacy-wishlist",
					scope: "site",
					packageName: "site",
					enabled: false,
				},
			],
			ctx,
		);
		// Resolves cleanly; orphan does not corrupt or hide anything
		assert.equal(result.length, 3);
	});

	it("ignores overrides targeting a contribution from a different slot", () => {
		const { registry } = buildSetup();
		// commerce.cart is in header.actions; we ask for footer.columns
		// which is empty in setup, so the cart override has nowhere to land.
		const result = resolvePhotonSlot(
			"footer.columns",
			registry,
			[
				{
					contributionId: "commerce.cart",
					scope: "site",
					packageName: "site",
					enabled: false,
				},
			],
			ctx,
		);
		assert.deepEqual(result, []);
	});

	it("sorts winners by merged order ascending and is stable on ties", () => {
		const { registry } = buildSetup();
		// Override account.order to 50 (same as marketplace.support default).
		// Insertion order: account before marketplace.support → tie keeps that.
		const result = resolvePhotonSlot(
			"header.actions",
			registry,
			[
				{
					contributionId: "auth.account",
					scope: "site",
					packageName: "site",
					order: 50,
				},
			],
			ctx,
		);
		assert.deepEqual(
			result.map((r) => r.resolved.contributionId),
			// commerce.cart=20 first, then auth.account (50, inserted first)
			// then marketplace.support (50, inserted later) — stable tie.
			["commerce.cart", "auth.account", "marketplace.support"],
		);
	});
});
