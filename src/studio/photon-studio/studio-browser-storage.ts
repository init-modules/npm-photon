"use client";

import { type DBSchema, type IDBPDatabase, openDB } from "idb";

type PhotonStudioStorageSchema = DBSchema & {
	values: {
		key: string;
		value: unknown;
	};
};

type LegacyStorageOptions<T> = {
	parseLegacy?: (rawValue: string) => T | null;
	serializeLegacy?: (value: T) => string;
};

const DATABASE_NAME = "photon-studio";
const STORE_NAME = "values";

let databasePromise: Promise<
	IDBPDatabase<PhotonStudioStorageSchema>
> | null = null;

const parseJsonLegacyValue = <T>(rawValue: string): T | null => {
	try {
		return JSON.parse(rawValue) as T;
	} catch {
		return null;
	}
};

const getDatabase = async () => {
	if (databasePromise) {
		return databasePromise;
	}

	databasePromise = openDB<PhotonStudioStorageSchema>(
		DATABASE_NAME,
		1,
		{
			upgrade(database) {
				if (!database.objectStoreNames.contains(STORE_NAME)) {
					database.createObjectStore(STORE_NAME);
				}
			},
		},
	);

	return databasePromise;
};

const getDatabaseSafely = async () => {
	try {
		return await getDatabase();
	} catch {
		return null;
	}
};

export const getStudioStorageItem = async <T>(
	key: string,
	options: LegacyStorageOptions<T> = {},
): Promise<T | null> => {
	const database = await getDatabaseSafely();

	if (database) {
		try {
			const storedValue = await database.get(STORE_NAME, key);

			if (storedValue !== undefined) {
				return storedValue as T;
			}
		} catch {
			// Fall back to legacy storage below if IndexedDB read fails.
		}
	}

	if (typeof window === "undefined") {
		return null;
	}

	const rawValue = window.localStorage.getItem(key);

	if (rawValue === null) {
		return null;
	}

	const parseLegacy = options.parseLegacy ?? parseJsonLegacyValue<T>;
	const parsedValue = parseLegacy(rawValue);

	if (parsedValue === null) {
		window.localStorage.removeItem(key);
		return null;
	}

	if (database) {
		try {
			await database.put(STORE_NAME, parsedValue, key);
			window.localStorage.removeItem(key);
		} catch {
			// Keep the legacy value if migration to IndexedDB fails.
		}
	}

	return parsedValue;
};

export const setStudioStorageItem = async <T>(
	key: string,
	value: T,
	options: LegacyStorageOptions<T> = {},
) => {
	const database = await getDatabaseSafely();

	if (database) {
		try {
			await database.put(STORE_NAME, value, key);
			return;
		} catch {
			// Fall back to localStorage below if IndexedDB write fails.
		}
	}

	if (typeof window === "undefined") {
		return;
	}

	const serializeLegacy =
		options.serializeLegacy ?? ((candidate: T) => JSON.stringify(candidate));

	window.localStorage.setItem(key, serializeLegacy(value));
};

export const removeStudioStorageItem = async (key: string) => {
	const database = await getDatabaseSafely();

	if (database) {
		try {
			await database.delete(STORE_NAME, key);
		} catch {
			// Continue and clear the legacy key below.
		}
	}

	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.removeItem(key);
};
