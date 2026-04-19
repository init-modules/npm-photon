"use client";

import { useEffect } from "react";
import type { WebsiteBuilderSearchHighlight } from "../types";

type WebsiteBuilderSearchHighlightEffectProps = {
	activeHighlight?: WebsiteBuilderSearchHighlight | null;
};

type NormalizedCharacterPoint = {
	node: Text;
	offset: number;
	length: number;
};

type NormalizedSearchText = {
	text: string;
	points: Array<NormalizedCharacterPoint | null>;
};

const SEARCH_MARK_SELECTOR = 'mark[data-wb-search-mark="true"]';
const SEARCH_TARGET_SELECTOR = "[data-wb-search-target]";
const ACTIVE_TARGET_ATTRIBUTE = "data-wb-search-active-target";

const normalizeSearchValue = (value: string) =>
	value.replace(/\s+/gu, " ").trim();

const clearSearchMarks = () => {
	if (typeof document === "undefined") {
		return;
	}

	document.querySelectorAll<HTMLElement>(SEARCH_MARK_SELECTOR).forEach((mark) => {
		const parent = mark.parentNode;

		if (!parent) {
			return;
		}

		while (mark.firstChild) {
			parent.insertBefore(mark.firstChild, mark);
		}

		parent.removeChild(mark);
		parent.normalize();
	});

	document
		.querySelectorAll<HTMLElement>(`[${ACTIVE_TARGET_ATTRIBUTE}="true"]`)
		.forEach((element) => {
			element.removeAttribute(ACTIVE_TARGET_ATTRIBUTE);
			element.style.removeProperty("outline");
			element.style.removeProperty("outline-offset");
			element.style.removeProperty("border-radius");
		});
};

const findTargetElement = (targetId: string) => {
	const elements = Array.from(
		document.querySelectorAll<HTMLElement>(SEARCH_TARGET_SELECTOR),
	);

	return (
		elements.find(
			(element) => element.dataset.wbSearchTarget === targetId,
		) ?? null
	);
};

const appendNormalizedTextNode = (
	textNode: Text,
	normalized: NormalizedSearchText,
) => {
	const source = textNode.textContent ?? "";

	if (source.trim() === "") {
		return;
	}

	let segmentText = "";
	const segmentPoints: NormalizedCharacterPoint[] = [];
	let started = false;
	let pendingWhitespace:
		| {
				offset: number;
				length: number;
		  }
		| null = null;

	for (let rawOffset = 0; rawOffset < source.length; ) {
		const codePoint = source.codePointAt(rawOffset);

		if (codePoint === undefined) {
			break;
		}

		const character = String.fromCodePoint(codePoint);
		const characterLength = character.length;

		if (/\s/u.test(character)) {
			if (started && pendingWhitespace === null) {
				pendingWhitespace = {
					offset: rawOffset,
					length: characterLength,
				};
			}

			rawOffset += characterLength;
			continue;
		}

		started = true;

		if (pendingWhitespace !== null) {
			segmentText += " ";
			segmentPoints.push({
				node: textNode,
				offset: pendingWhitespace.offset,
				length: pendingWhitespace.length,
			});
			pendingWhitespace = null;
		}

		segmentText += character;
		segmentPoints.push({
			node: textNode,
			offset: rawOffset,
			length: characterLength,
		});
		rawOffset += characterLength;
	}

	if (!segmentText) {
		return;
	}

	if (normalized.text !== "") {
		normalized.text += " ";
		normalized.points.push(null);
	}

	normalized.text += segmentText;
	normalized.points.push(...segmentPoints);
};

const collectNormalizedSearchText = (
	element: HTMLElement,
): NormalizedSearchText => {
	const normalized: NormalizedSearchText = {
		text: "",
		points: [],
	};
	const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
		acceptNode(node) {
			const value = node.textContent ?? "";

			return value.trim() === ""
				? NodeFilter.FILTER_REJECT
				: NodeFilter.FILTER_ACCEPT;
		},
	});
	let currentNode = walker.nextNode();

	while (currentNode) {
		appendNormalizedTextNode(currentNode as Text, normalized);
		currentNode = walker.nextNode();
	}

	return normalized;
};

const findPointInRange = (
	points: Array<NormalizedCharacterPoint | null>,
	startIndex: number,
	endIndex: number,
	direction: "forward" | "backward",
) => {
	if (direction === "forward") {
		for (let index = startIndex; index < endIndex; index += 1) {
			const point = points[index];

			if (point !== null) {
				return point;
			}
		}

		return null;
	}

	for (let index = endIndex - 1; index >= startIndex; index -= 1) {
		const point = points[index];

		if (point !== null) {
			return point;
		}
	}

	return null;
};

const highlightOccurrenceInElement = (
	element: HTMLElement,
	query: string,
	occurrence: number,
) => {
	const normalizedText = collectNormalizedSearchText(element);
	const normalizedQuery = normalizeSearchValue(query).toLowerCase();

	if (!normalizedQuery || !normalizedText.text) {
		return null;
	}

	const haystack = normalizedText.text.toLowerCase();
	let searchOffset = 0;
	let currentOccurrence = 0;

	while (searchOffset <= haystack.length) {
		const matchIndex = haystack.indexOf(normalizedQuery, searchOffset);

		if (matchIndex === -1) {
			break;
		}

		if (currentOccurrence === occurrence) {
			const matchEnd = matchIndex + normalizedQuery.length;
			const startPoint = findPointInRange(
				normalizedText.points,
				matchIndex,
				matchEnd,
				"forward",
			);
			const endPoint = findPointInRange(
				normalizedText.points,
				matchIndex,
				matchEnd,
				"backward",
			);

			if (!startPoint || !endPoint) {
				return null;
			}

			const range = document.createRange();

			range.setStart(startPoint.node, startPoint.offset);
			range.setEnd(endPoint.node, endPoint.offset + endPoint.length);

			const mark = document.createElement("mark");
			mark.dataset.wbSearchMark = "true";
			mark.style.background = "rgba(34, 211, 238, 0.28)";
			mark.style.color = "inherit";
			mark.style.padding = "0 0.15em";
			mark.style.borderRadius = "0.35em";

			try {
				range.surroundContents(mark);
				return mark;
			} catch {
				return null;
			}
		}

		currentOccurrence += 1;
		searchOffset = matchIndex + Math.max(normalizedQuery.length, 1);
	}

	return null;
};

export const WebsiteBuilderSearchHighlightEffect = ({
	activeHighlight,
}: WebsiteBuilderSearchHighlightEffectProps) => {
	useEffect(() => {
		clearSearchMarks();

		if (
			typeof window === "undefined" ||
			!activeHighlight?.query ||
			!activeHighlight.targetId
		) {
			return;
		}

		let frameOne = 0;
		let frameTwo = 0;

		const runHighlight = () => {
			const target = findTargetElement(activeHighlight.targetId);

			if (!target) {
				return;
			}

			target.setAttribute(ACTIVE_TARGET_ATTRIBUTE, "true");
			target.style.outline = "2px solid rgba(34, 211, 238, 0.42)";
			target.style.outlineOffset = "4px";
			target.style.borderRadius = "18px";

			const mark =
				highlightOccurrenceInElement(
					target,
					activeHighlight.query,
					activeHighlight.occurrence,
				) ?? target;

			mark.scrollIntoView({
				block: "center",
				behavior: "smooth",
			});
		};

		frameOne = window.requestAnimationFrame(() => {
			frameTwo = window.requestAnimationFrame(runHighlight);
		});

		return () => {
			window.cancelAnimationFrame(frameOne);
			window.cancelAnimationFrame(frameTwo);
			clearSearchMarks();
		};
	}, [
		activeHighlight?.occurrence,
		activeHighlight?.query,
		activeHighlight?.targetId,
	]);

	return null;
};
