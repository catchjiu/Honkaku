"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getInitialLocale, setStoredLocale, type Locale } from "@/lib/i18n";

import en from "@/locales/en.json";
import zhTW from "@/locales/zh-TW.json";

const translations: Record<Locale, Record<string, unknown>> = {
  en: en as Record<string, unknown>,
  "zh-TW": zhTW as Record<string, unknown>,
};

function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getInitialLocale());
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh-TW" ? "zh-TW" : "en";
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setStoredLocale(newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
      if (!mounted) {
        const fallback = getNested(translations.en as Record<string, unknown>, key);
        return fallback ?? key;
      }
      const dict = translations[locale];
      const value = getNested(dict as Record<string, unknown>, key);
      if (value) return value;
      const fallback = getNested(translations.en as Record<string, unknown>, key);
      return fallback ?? key;
    },
    [locale, mounted]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
