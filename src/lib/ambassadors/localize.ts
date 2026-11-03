import type { Locale } from "@/lib/i18n/dictionaries";
import type { Ambassador } from "./types";

export function localizeAmbassador(
  ambassador: Ambassador,
  locale: Locale,
): Ambassador {
  if (locale === "es" || !ambassador.en) {
    const { en: _en, ...rest } = ambassador;
    return rest;
  }

  const { en, ...base } = ambassador;
  return {
    ...base,
    role: en.role ?? base.role,
    location: en.location ?? base.location,
    bio: en.bio ?? base.bio,
  };
}
