"use client";

import { useEffect } from "react";
import type {
	PhotonSiteFrameMobileControls,
	PhotonSiteFrameMobileMenuTriggerPlacement,
} from "../../../types";

export type ResolvedPhotonSiteFrameMobileControls = {
	sticky: boolean;
	menu: {
		type: "inline" | "drawer" | "fullscreen";
		triggerPlacement: PhotonSiteFrameMobileMenuTriggerPlacement;
		scrollLock: boolean;
		floating: boolean;
		disableFloatingOnSmallScreens: boolean;
	};
	bottomMenu: {
		enabled: boolean;
		showBurger: boolean;
		floating: boolean;
		disableFloatingOnSmallScreens: boolean;
	};
};

const resolveMobileMenuTriggerPlacement = (
	controls?: PhotonSiteFrameMobileControls,
): PhotonSiteFrameMobileMenuTriggerPlacement => {
	const placement = controls?.menu?.triggerPlacement;

	if (
		placement === "fixed" ||
		placement === "header" ||
		placement === "hidden"
	) {
		return placement;
	}

	return "fixed";
};

export const resolvePhotonSiteFrameMobileControls = (
	controls?: PhotonSiteFrameMobileControls,
): ResolvedPhotonSiteFrameMobileControls => {
	const triggerPlacement = resolveMobileMenuTriggerPlacement(controls);

	return {
		sticky: controls?.sticky ?? true,
		menu: {
			type: controls?.menu?.type ?? "inline",
			triggerPlacement,
			scrollLock: controls?.menu?.scrollLock ?? true,
			floating: controls?.menu?.floating ?? false,
			disableFloatingOnSmallScreens:
				controls?.menu?.disableFloatingOnSmallScreens ?? true,
		},
		bottomMenu: {
			enabled: controls?.bottomMenu?.enabled ?? false,
			showBurger: controls?.bottomMenu?.showBurger ?? false,
			floating: controls?.bottomMenu?.floating ?? false,
			disableFloatingOnSmallScreens:
				controls?.bottomMenu?.disableFloatingOnSmallScreens ?? true,
		},
	};
};

export const usePhotonSiteFrameScrollLock = (locked: boolean) => {
	useEffect(() => {
		if (!locked || typeof window === "undefined") {
			return;
		}

		const root = window.document.documentElement;
		const body = window.document.body;
		const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);
		const previousRootOverflow = root.style.overflow;
		const previousBodyOverflow = body.style.overflow;
		const previousBodyPaddingRight = body.style.paddingRight;
		const previousBodyTouchAction = body.style.touchAction;

		root.style.overflow = "hidden";
		body.style.overflow = "hidden";
		body.style.touchAction = "none";

		if (scrollbarWidth > 0) {
			body.style.paddingRight = `${scrollbarWidth}px`;
		}

		return () => {
			root.style.overflow = previousRootOverflow;
			body.style.overflow = previousBodyOverflow;
			body.style.paddingRight = previousBodyPaddingRight;
			body.style.touchAction = previousBodyTouchAction;
		};
	}, [locked]);
};
