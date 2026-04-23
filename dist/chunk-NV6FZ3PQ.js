// src/i18n/photon-i18n-context.tsx
import { createContext, useContext, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
var createDefaultTranslate = () => (key, fallback) => fallback ?? key;
var defaultValue = {
  defaultLocale: "en",
  locale: "en",
  contentLocale: "en",
  interfaceLocale: "en",
  interfaceLocales: [
    { code: "en", label: "English" },
    { code: "ru", label: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" }
  ],
  locales: [],
  publicLocales: [],
  editableLocales: [],
  showLocaleSwitcher: false,
  translate: createDefaultTranslate()
};
var PhotonI18nContext = createContext(defaultValue);
var PhotonI18nProvider = ({
  children,
  value
}) => {
  const nextValue = useMemo(
    () => ({
      ...defaultValue,
      ...value,
      translate: value?.translate ?? defaultValue.translate
    }),
    [value]
  );
  return /* @__PURE__ */ jsx(PhotonI18nContext.Provider, { value: nextValue, children });
};
var usePhotonI18n = () => useContext(PhotonI18nContext);
var resolvePhotonText = (value, translate, fallback) => translate(value, fallback ?? value);

export {
  PhotonI18nProvider,
  usePhotonI18n,
  resolvePhotonText
};
