import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { definePhotonSiteFrameContribution } from "./define-contribution";
import { definePhotonSlot } from "./define-slot";
import {
	PhotonContributionConflictError,
	PhotonSlotConflictError,
	PhotonUnknownSlotError,
	createPhotonSiteFrameContributionRegistry,
	createPhotonSlotRegistry,
} from "./registry";

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
	defaults: { enabled: true, order: 20 },
	component: NoopComponent,
});

const accountContribution = definePhotonSiteFrameContribution({
	id: "auth.account",
	packageName: "auth-photon",
	slot: headerSlot,
	defaults: { enabled: true, order: 10 },
	component: NoopComponent,
});

const shopColumnContribution = definePhotonSiteFrameContribution({
	id: "commerce.shop-column",
	packageName: "commerce-photon",
	slot: footerSlot,
	defaults: { enabled: true, order: 5 },
	component: NoopComponent,
});

describe("createPhotonSlotRegistry", () => {
	it("looks up declared slots by id", () => {
		const registry = createPhotonSlotRegistry([headerSlot, footerSlot]);
		assert.equal(registry.size, 2);
		assert.equal(registry.has("header.actions"), true);
		assert.equal(registry.has("footer.columns"), true);
		assert.equal(registry.has("unknown"), false);
		assert.equal(registry.get("header.actions"), headerSlot);
	});

	it("preserves declaration order in all()", () => {
		const registry = createPhotonSlotRegistry([headerSlot, footerSlot]);
		assert.deepEqual(
			registry.all().map((s) => s.id),
			["header.actions", "footer.columns"],
		);
	});

	it("throws PhotonSlotConflictError on duplicate slot id", () => {
		const conflicting = definePhotonSlot({
			id: "header.actions",
			placement: "page",
		});
		assert.throws(
			() => createPhotonSlotRegistry([headerSlot, conflicting]),
			(error: unknown) =>
				error instanceof PhotonSlotConflictError &&
				error.slotId === "header.actions" &&
				error.existingPlacement === "site-frame" &&
				error.attemptedPlacement === "page",
		);
	});
});

describe("createPhotonSiteFrameContributionRegistry", () => {
	it("indexes contributions by id and by slot", () => {
		const slots = createPhotonSlotRegistry([headerSlot, footerSlot]);
		const registry = createPhotonSiteFrameContributionRegistry(
			[cartContribution, accountContribution, shopColumnContribution],
			slots,
		);
		assert.equal(registry.size, 3);
		assert.equal(registry.has("commerce.cart"), true);
		assert.equal(registry.get("auth.account"), accountContribution);
		assert.deepEqual(
			registry.bySlot("header.actions").map((c) => c.id),
			["commerce.cart", "auth.account"],
		);
		assert.deepEqual(
			registry.bySlot("footer.columns").map((c) => c.id),
			["commerce.shop-column"],
		);
	});

	it("returns empty array for unknown slot lookup", () => {
		const slots = createPhotonSlotRegistry([headerSlot]);
		const registry = createPhotonSiteFrameContributionRegistry(
			[cartContribution],
			slots,
		);
		assert.deepEqual(registry.bySlot("nonexistent"), []);
	});

	it("throws PhotonContributionConflictError on duplicate contribution id", () => {
		const slots = createPhotonSlotRegistry([headerSlot]);
		const duplicate = definePhotonSiteFrameContribution({
			id: "commerce.cart",
			packageName: "legacy-commerce",
			slot: headerSlot,
			defaults: { enabled: true, order: 99 },
			component: NoopComponent,
		});
		assert.throws(
			() =>
				createPhotonSiteFrameContributionRegistry(
					[cartContribution, duplicate],
					slots,
				),
			(error: unknown) =>
				error instanceof PhotonContributionConflictError &&
				error.contributionId === "commerce.cart" &&
				error.existingPackage === "commerce-photon" &&
				error.attemptedPackage === "legacy-commerce",
		);
	});

	it("throws PhotonUnknownSlotError when slot is not declared", () => {
		const slots = createPhotonSlotRegistry([headerSlot]);
		const orphan = definePhotonSiteFrameContribution({
			id: "marketplace.banner",
			packageName: "marketplaces-kit",
			slot: definePhotonSlot({
				id: "marketplace.banner-strip",
				placement: "site-frame",
			}),
			defaults: { enabled: true, order: 0 },
			component: NoopComponent,
		});
		assert.throws(
			() => createPhotonSiteFrameContributionRegistry([orphan], slots),
			(error: unknown) =>
				error instanceof PhotonUnknownSlotError &&
				error.contributionId === "marketplace.banner" &&
				error.slotId === "marketplace.banner-strip",
		);
	});

	it("throws when packageName is empty", () => {
		const slots = createPhotonSlotRegistry([headerSlot]);
		const malformed = definePhotonSiteFrameContribution({
			id: "broken.entry",
			packageName: "",
			slot: headerSlot,
			defaults: { enabled: true, order: 0 },
			component: NoopComponent,
		});
		assert.throws(
			() => createPhotonSiteFrameContributionRegistry([malformed], slots),
			/packageName/,
		);
	});
});
