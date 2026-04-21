"use client";

import { createContext, type ReactNode, useContext, useMemo } from "react";
import type { WebsiteBuilderI18nValue } from "../types";

const createDefaultTranslate = () => (key: string, fallback?: string) =>
	fallback ?? key;

const defaultValue: WebsiteBuilderI18nValue = {
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

const WebsiteBuilderI18nContext =
	createContext<WebsiteBuilderI18nValue>(defaultValue);

export const WebsiteBuilderI18nProvider = ({
	children,
	value,
}: {
	children: ReactNode;
	value?: Partial<WebsiteBuilderI18nValue> | null;
}) => {
	const nextValue = useMemo<WebsiteBuilderI18nValue>(
		() => ({
			...defaultValue,
			...value,
			translate: value?.translate ?? defaultValue.translate,
		}),
		[value],
	);

	return (
		<WebsiteBuilderI18nContext.Provider value={nextValue}>
			{children}
		</WebsiteBuilderI18nContext.Provider>
	);
};

export const useWebsiteBuilderI18n = () =>
	useContext(WebsiteBuilderI18nContext);

export const resolveWebsiteBuilderText = (
	value: string,
	translate: WebsiteBuilderI18nValue["translate"],
	fallback?: string,
) => translate(value, fallback ?? value);
