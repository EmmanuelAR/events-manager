"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dictionaries, type Dictionary, type Locale } from "./dictionaries";

type LocaleContextValue = {
  locale: Locale;
  t: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function detectLocale(): Locale {
  const candidates = [
    ...(typeof navigator !== "undefined" ? navigator.languages ?? [] : []),
    typeof navigator !== "undefined" ? navigator.language : "",
  ];

  for (const tag of candidates) {
    const lower = tag.toLowerCase();
    if (lower.startsWith("es")) return "es";
    if (lower.startsWith("en")) return "en";
  }

  return "es";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const next = detectLocale();
    setLocale(next);
    document.documentElement.lang = next === "es" ? "es-CR" : "en";
  }, []);

  const value = useMemo(
    () => ({
      locale,
      t: dictionaries[locale],
    }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
