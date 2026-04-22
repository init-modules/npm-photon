"use client";

import { createContext, type ReactNode, useContext, useMemo } from "react";
import type { PhotonI18nValue } from "../types";

const createDefaultTranslate = () => (key: string, fallback?: string) =>
	fallback ?? key;

const defaultValue: PhotonI18nValue = {
	defaultLocale: "en",
	locale: "en",
	contentLocale: "en",
	interfaceLocale: "en",
	interfaceLocales: [
		{ code: "en", label: "English" },
		{ code: "ru", label: "Русский" },
	],
	locales: [],
	publicLocales: [],
	editableLocales: [],
	showLocaleSwitcher: false,
	translate: createDefaultTranslate(),
};

const PhotonI18nContext =
	createContext<PhotonI18nValue>(defaultValue);

export const PhotonI18nProvider = ({
	children,
	value,
}: {
	children: ReactNode;
	value?: Partial<PhotonI18nValue> | null;
}) => {
	const nextValue = useMemo<PhotonI18nValue>(
		() => ({
			...defaultValue,
			...value,
			translate: value?.translate ?? defaultValue.translate,
		}),
		[value],
	);

	return (
		<PhotonI18nContext.Provider value={nextValue}>
			{children}
		</PhotonI18nContext.Provider>
	);
};

export const usePhotonI18n = () =>
	useContext(PhotonI18nContext);

export const resolvePhotonText = (
	value: string,
	translate: PhotonI18nValue["translate"],
	fallback?: string,
) => translate(value, fallback ?? value);
