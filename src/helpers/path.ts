export const WEBSITE_BUILDER_EMPTY_TEXT = "Untitled";

const cloneWithFallback = <T>(value: T): T => {
	if (typeof structuredClone === "function") {
		return structuredClone(value);
	}

	return JSON.parse(JSON.stringify(value)) as T;
};

const parsePathSegment = (segment: string) => {
	const numeric = Number(segment);

	return Number.isInteger(numeric) && segment.trim() !== "" ? numeric : segment;
};

export const cloneWebsiteBuilderValue = <T>(value: T): T => {
	return cloneWithFallback(value);
};

export const getValueAtPath = (
	target: Record<string, unknown> | unknown[] | null | undefined,
	path: string,
) => {
	if (!target || !path) {
		return target ?? null;
	}

	return path.split(".").reduce<unknown>((current, segment) => {
		if (current === null || current === undefined) {
			return null;
		}

		const key = parsePathSegment(segment);

		if (Array.isArray(current) && typeof key === "number") {
			return current[key];
		}

		if (typeof current === "object" && key in current) {
			return (current as Record<string, unknown>)[key as string];
		}

		return null;
	}, target);
};

export const setValueAtPath = <T extends Record<string, unknown>>(
	target: T,
	path: string,
	value: unknown,
) => {
	if (!path) {
		return cloneWebsiteBuilderValue(value) as T;
	}

	const draft = cloneWithFallback(target) as Record<string, unknown>;
	const segments = path.split(".").map(parsePathSegment);

	let cursor: Record<string, unknown> | unknown[] = draft;

	for (let index = 0; index < segments.length - 1; index += 1) {
		const segment = segments[index];
		const nextSegment = segments[index + 1];

		if (Array.isArray(cursor) && typeof segment === "number") {
			if (cursor[segment] === undefined || cursor[segment] === null) {
				cursor[segment] = typeof nextSegment === "number" ? [] : {};
			}

			cursor = cursor[segment] as Record<string, unknown> | unknown[];
			continue;
		}

		const currentValue = (cursor as Record<string, unknown>)[segment as string];

		if (currentValue === undefined || currentValue === null) {
			(cursor as Record<string, unknown>)[segment as string] =
				typeof nextSegment === "number" ? [] : {};
		}

		cursor = (cursor as Record<string, unknown>)[segment as string] as
			| Record<string, unknown>
			| unknown[];
	}

	const lastSegment = segments.at(-1);

	if (Array.isArray(cursor) && typeof lastSegment === "number") {
		cursor[lastSegment] = value;
		return draft as T;
	}

	(cursor as Record<string, unknown>)[lastSegment as string] = value;

	return draft as T;
};
