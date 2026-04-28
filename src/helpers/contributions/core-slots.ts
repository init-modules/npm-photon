import { definePhotonSlot } from "./define-slot";
import type { PhotonSiteFrameContributionContext } from "./types";

/**
 * Built-in site-frame slots declared by the core. Mirror the legacy
 * site-frame extension slot layout (`site-frame-extensions.ts`) one-to-one
 * so Phase B migration is mechanical: each legacy `header.slots.<name>`
 * becomes a contribution into the corresponding `header.<name>` slot here.
 *
 * Kits and packages may declare additional slots (e.g.
 * `marketplace.banner-strip`) via `definePhotonSlot` from their own modules;
 * this file is the home only for slots whose behavior is part of the core
 * site-frame contract.
 */

/** Top-strip utility links (small, secondary). */
export const headerUtilitySlot =
	definePhotonSlot<PhotonSiteFrameContributionContext>({
		id: "header.utility",
		placement: "site-frame",
		description: "Utility-strip links above the main header (about, contacts, etc.)",
	});

/** Main navigation links. */
export const headerNavigationSlot =
	definePhotonSlot<PhotonSiteFrameContributionContext>({
		id: "header.navigation",
		placement: "site-frame",
		description: "Primary navigation links in the header",
	});

/** Prominent links (catalog, hero CTAs). */
export const headerProminentSlot =
	definePhotonSlot<PhotonSiteFrameContributionContext>({
		id: "header.prominent",
		placement: "site-frame",
		description: "Prominent header items (catalog button, primary CTAs)",
	});

/** Right-aligned action surface (cart, account, search, locale). */
export const headerActionsSlot =
	definePhotonSlot<PhotonSiteFrameContributionContext>({
		id: "header.actions",
		placement: "site-frame",
		description: "Right-aligned action items in the header (cart, account, etc.)",
	});

/** Footer navigation columns (catalog, account links, etc.). */
export const footerNavigationSlot =
	definePhotonSlot<PhotonSiteFrameContributionContext>({
		id: "footer.navigation",
		placement: "site-frame",
		description: "Navigation columns in the footer body",
	});

/** Footer legal-links strip (privacy, terms, copyright). */
export const footerLegalSlot =
	definePhotonSlot<PhotonSiteFrameContributionContext>({
		id: "footer.legal",
		placement: "site-frame",
		description: "Legal-links strip in the footer bottom bar",
	});

/** Mobile bottom-bar items (menu, cart, account icons). */
export const mobileBottomBarItemsSlot =
	definePhotonSlot<PhotonSiteFrameContributionContext>({
		id: "mobile-bottom-bar.items",
		placement: "site-frame",
		description: "Action items in the mobile bottom bar",
	});

/** Convenient list of all core slots — for app composition default seeding. */
export const photonCoreSiteFrameSlots = [
	headerUtilitySlot,
	headerNavigationSlot,
	headerProminentSlot,
	headerActionsSlot,
	footerNavigationSlot,
	footerLegalSlot,
	mobileBottomBarItemsSlot,
] as const;
