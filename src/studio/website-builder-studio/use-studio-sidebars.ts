"use client";

import {
	type PointerEvent as ReactPointerEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	getStudioStorageItem,
	setStudioStorageItem,
} from "./studio-browser-storage";

type BuilderSidebarSide = "left" | "right";

type PersistedSidebarState = {
	leftWidth: number;
	rightWidth: number;
	leftCollapsed: boolean;
	rightCollapsed: boolean;
};

const DEFAULT_LEFT_WIDTH = 304;
const DEFAULT_RIGHT_WIDTH = 368;
const MIN_LEFT_WIDTH = 264;
const MAX_LEFT_WIDTH = 480;
const MIN_RIGHT_WIDTH = 320;
const MAX_RIGHT_WIDTH = 560;

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

const isPersistedSidebarState = (
	value: unknown,
): value is PersistedSidebarState => {
	if (!value || typeof value !== "object") {
		return false;
	}

	const candidate = value as Partial<PersistedSidebarState>;

	return (
		typeof candidate.leftWidth === "number" &&
		typeof candidate.rightWidth === "number" &&
		typeof candidate.leftCollapsed === "boolean" &&
		typeof candidate.rightCollapsed === "boolean"
	);
};

type UseStudioSidebarsParams = {
	storageKey: string;
};

export const useStudioSidebars = ({ storageKey }: UseStudioSidebarsParams) => {
	const [leftWidth, setLeftWidth] = useState(DEFAULT_LEFT_WIDTH);
	const [rightWidth, setRightWidth] = useState(DEFAULT_RIGHT_WIDTH);
	const [leftCollapsed, setLeftCollapsed] = useState(false);
	const [rightCollapsed, setRightCollapsed] = useState(false);
	const [hasHydrated, setHasHydrated] = useState(false);
	const [isResizing, setIsResizing] = useState(false);
	const resizeFrameRef = useRef<number | null>(null);

	useEffect(() => {
		let cancelled = false;

		void (async () => {
			try {
				const parsedValue = await getStudioStorageItem<unknown>(storageKey);

				if (cancelled || !isPersistedSidebarState(parsedValue)) {
					return;
				}

				setLeftWidth(
					clamp(parsedValue.leftWidth, MIN_LEFT_WIDTH, MAX_LEFT_WIDTH),
				);
				setRightWidth(
					clamp(parsedValue.rightWidth, MIN_RIGHT_WIDTH, MAX_RIGHT_WIDTH),
				);
				setLeftCollapsed(parsedValue.leftCollapsed);
				setRightCollapsed(parsedValue.rightCollapsed);
			} finally {
				if (!cancelled) {
					setHasHydrated(true);
				}
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [storageKey]);

	useEffect(() => {
		if (typeof window === "undefined" || !hasHydrated || isResizing) {
			return;
		}

		const persistedValue: PersistedSidebarState = {
			leftWidth,
			rightWidth,
			leftCollapsed,
			rightCollapsed,
		};

		void setStudioStorageItem(storageKey, persistedValue);
	}, [
		hasHydrated,
		isResizing,
		leftCollapsed,
		leftWidth,
		rightCollapsed,
		rightWidth,
		storageKey,
	]);

	const toggleLeftCollapsed = () => {
		setLeftCollapsed((current) => !current);
	};

	const toggleRightCollapsed = () => {
		setRightCollapsed((current) => !current);
	};

	const expandLeft = () => {
		setLeftCollapsed(false);
	};

	const expandRight = () => {
		setRightCollapsed(false);
	};

	const startResize =
		(side: BuilderSidebarSide) =>
		(event: ReactPointerEvent<HTMLButtonElement>) => {
			event.preventDefault();
			event.stopPropagation();

			const startX = event.clientX;
			const startWidth = side === "left" ? leftWidth : rightWidth;
			const previousCursor = document.body.style.cursor;
			const previousUserSelect = document.body.style.userSelect;
			let latestWidth = startWidth;

			setIsResizing(true);

			document.body.style.cursor = "col-resize";
			document.body.style.userSelect = "none";

			const applyWidth = () => {
				const nextWidth = clamp(
					latestWidth,
					side === "left" ? MIN_LEFT_WIDTH : MIN_RIGHT_WIDTH,
					side === "left" ? MAX_LEFT_WIDTH : MAX_RIGHT_WIDTH,
				);

				if (side === "left") {
					setLeftWidth(nextWidth);
					return;
				}

				setRightWidth(nextWidth);
			};

			const scheduleWidthUpdate = () => {
				if (resizeFrameRef.current !== null) {
					return;
				}

				resizeFrameRef.current = window.requestAnimationFrame(() => {
					resizeFrameRef.current = null;
					applyWidth();
				});
			};

			const handlePointerMove = (moveEvent: PointerEvent) => {
				const delta =
					side === "left"
						? moveEvent.clientX - startX
						: startX - moveEvent.clientX;

				latestWidth = startWidth + delta;
				scheduleWidthUpdate();
			};

			const handlePointerUp = () => {
				if (resizeFrameRef.current !== null) {
					window.cancelAnimationFrame(resizeFrameRef.current);
					resizeFrameRef.current = null;
				}

				applyWidth();
				setIsResizing(false);
				document.body.style.cursor = previousCursor;
				document.body.style.userSelect = previousUserSelect;
				window.removeEventListener("pointermove", handlePointerMove);
				window.removeEventListener("pointerup", handlePointerUp);
			};

			window.addEventListener("pointermove", handlePointerMove);
			window.addEventListener("pointerup", handlePointerUp, { once: true });
		};

	return {
		leftWidth,
		rightWidth,
		leftCollapsed,
		rightCollapsed,
		toggleLeftCollapsed,
		toggleRightCollapsed,
		expandLeft,
		expandRight,
		isResizing,
		startResize,
	};
};
