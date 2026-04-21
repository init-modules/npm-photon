"use client";

import {
	type ClientRect,
	type Collision,
	type CollisionDetection,
	closestCenter,
	type DragEndEvent,
	type DragOverEvent,
	pointerWithin,
	rectIntersection,
} from "@dnd-kit/core";
import clsx from "clsx";
import {
	BadgeCheck,
	LayoutGrid,
	Newspaper,
	PanelsTopLeft,
	Sparkles,
} from "lucide-react";
import type { WebsiteBuilderBlock } from "../../types";
import type { InsertTarget } from "../types";

export const FIELD_GROUP_LABELS: Record<string, string> = {
	content: "websiteBuilder.fieldGroups.content",
	style: "websiteBuilder.fieldGroups.style",
	layout: "websiteBuilder.fieldGroups.layout",
	data: "websiteBuilder.fieldGroups.data",
	misc: "websiteBuilder.fieldGroups.misc",
};

export const STUDIO_ICONS = {
	"badge-check": BadgeCheck,
	"layout-grid": LayoutGrid,
	newspaper: Newspaper,
	"panels-top-left": PanelsTopLeft,
	sparkles: Sparkles,
};

export const createInsertionZoneId = (listId: string, index: number) =>
	`insert:${listId}:${index}`;

const INSERT_ZONE_PROXIMITY_HEIGHT = 160;
const INSERT_ZONE_PROXIMITY_WIDTH = 96;

const getRectArea = (rect: ClientRect | undefined) =>
	rect ? rect.width * rect.height : Number.POSITIVE_INFINITY;

const getPointerDistanceToRect = (
	pointerCoordinates: { x: number; y: number } | null,
	rect: ClientRect | undefined,
) => {
	if (!pointerCoordinates || !rect) {
		return Number.POSITIVE_INFINITY;
	}

	const deltaX =
		pointerCoordinates.x < rect.left
			? rect.left - pointerCoordinates.x
			: pointerCoordinates.x > rect.right
				? pointerCoordinates.x - rect.right
				: 0;
	const deltaY =
		pointerCoordinates.y < rect.top
			? rect.top - pointerCoordinates.y
			: pointerCoordinates.y > rect.bottom
				? pointerCoordinates.y - rect.bottom
				: 0;

	return Math.hypot(deltaX, deltaY);
};

const sortInsertZoneCollisions = (
	collisions: Collision[],
	{
		droppableRects,
		pointerCoordinates,
		prioritizeValue = false,
	}: {
		droppableRects: Map<Collision["id"], ClientRect>;
		pointerCoordinates: { x: number; y: number } | null;
		prioritizeValue?: boolean;
	},
) =>
	[...collisions].sort((left, right) => {
		const leftValue =
			typeof left.data?.value === "number"
				? left.data.value
				: Number.NEGATIVE_INFINITY;
		const rightValue =
			typeof right.data?.value === "number"
				? right.data.value
				: Number.NEGATIVE_INFINITY;

		if (prioritizeValue && rightValue !== leftValue) {
			return rightValue - leftValue;
		}

		const leftRect = droppableRects.get(left.id);
		const rightRect = droppableRects.get(right.id);
		const leftDistance = getPointerDistanceToRect(pointerCoordinates, leftRect);
		const rightDistance = getPointerDistanceToRect(
			pointerCoordinates,
			rightRect,
		);

		if (leftDistance !== rightDistance) {
			return leftDistance - rightDistance;
		}

		if (!prioritizeValue && rightValue !== leftValue) {
			return rightValue - leftValue;
		}

		return getRectArea(leftRect) - getRectArea(rightRect);
	});

const createPointerProximityRect = (
	pointerCoordinates: { x: number; y: number } | null,
): ClientRect | null => {
	if (!pointerCoordinates) {
		return null;
	}

	return {
		top: pointerCoordinates.y - INSERT_ZONE_PROXIMITY_HEIGHT / 2,
		bottom: pointerCoordinates.y + INSERT_ZONE_PROXIMITY_HEIGHT / 2,
		left: pointerCoordinates.x - INSERT_ZONE_PROXIMITY_WIDTH / 2,
		right: pointerCoordinates.x + INSERT_ZONE_PROXIMITY_WIDTH / 2,
		width: INSERT_ZONE_PROXIMITY_WIDTH,
		height: INSERT_ZONE_PROXIMITY_HEIGHT,
	};
};

export const websiteBuilderCollisionDetection: CollisionDetection = (args) => {
	const activeKind = args.active.data.current?.kind;
	const insertZoneContainers = args.droppableContainers.filter(
		(container) => container.data.current?.kind === "insert-zone",
	);
	const collisionArgs = {
		...args,
		droppableContainers: insertZoneContainers,
	};
	const pointerHits = pointerWithin(collisionArgs);

	if (pointerHits.length > 0) {
		return sortInsertZoneCollisions(pointerHits, {
			droppableRects: args.droppableRects,
			pointerCoordinates: args.pointerCoordinates,
		});
	}

	const overlayHits = rectIntersection(collisionArgs);

	if (overlayHits.length > 0) {
		return sortInsertZoneCollisions(overlayHits, {
			droppableRects: args.droppableRects,
			pointerCoordinates: args.pointerCoordinates,
			prioritizeValue: true,
		});
	}

	const pointerProximityRect = createPointerProximityRect(
		args.pointerCoordinates,
	);

	if (pointerProximityRect) {
		const proximityHits = rectIntersection({
			...collisionArgs,
			collisionRect: pointerProximityRect,
		});

		if (proximityHits.length > 0) {
			return sortInsertZoneCollisions(proximityHits, {
				droppableRects: args.droppableRects,
				pointerCoordinates: args.pointerCoordinates,
				prioritizeValue: true,
			});
		}
	}

	if (activeKind === "palette") {
		return [];
	}

	return sortInsertZoneCollisions(
		closestCenter({
			...collisionArgs,
			collisionRect: pointerProximityRect ?? args.collisionRect,
		}),
		{
			droppableRects: args.droppableRects,
			pointerCoordinates: args.pointerCoordinates,
		},
	);
};

const parseInsertTargetFromZoneId = (zoneId: string): InsertTarget | null => {
	if (!zoneId.startsWith("insert:")) {
		return null;
	}

	const payload = zoneId.slice("insert:".length);
	const separatorIndex = payload.lastIndexOf(":");

	if (separatorIndex === -1) {
		return null;
	}

	const listId = payload.slice(0, separatorIndex);
	const index = Number(payload.slice(separatorIndex + 1));

	if (!Number.isFinite(index)) {
		return null;
	}

	return { listId, index };
};

export const resolveInsertTarget = (
	event: Pick<DragOverEvent | DragEndEvent, "collisions" | "over">,
): InsertTarget | null => {
	const overData = event.over?.data.current;

	if (overData?.kind === "insert-zone") {
		return {
			listId: String(overData.listId),
			index: Number(overData.index),
		};
	}

	const collisionTarget = event.collisions
		?.map((collision) => parseInsertTargetFromZoneId(String(collision.id)))
		.find((target): target is InsertTarget => target !== null);

	return collisionTarget ?? null;
};

export const matchesTarget = (
	target: InsertTarget | null,
	listId: string,
	index: number,
) => target?.listId === listId && target.index === index;

export const inputClassName = clsx(
	"w-full rounded-[20px] border px-4 py-3",
	"text-sm outline-none transition placeholder:text-[color:var(--wb-builder-text-ghost)]",
	"border-[color:var(--wb-builder-border)] bg-[color:var(--wb-builder-field)] text-[color:var(--wb-builder-text)] focus:border-[color:var(--wb-builder-border-strong)]",
);
