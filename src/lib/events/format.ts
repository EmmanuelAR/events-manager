import type { Locale } from "@/lib/i18n/dictionaries";
import type { CommunityEvent } from "./types";

/** Normalize ICU narrow/nbsp spaces so SSR and browser match. */
function normalizeIntlText(value: string): string {
  return value.replace(/[\u00a0\u202f\u2009\u2007]/g, " ");
}

export function formatEventDate(iso: string, locale: Locale = "es"): string {
  const value = normalizeIntlText(
    new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "America/Costa_Rica",
    }).format(new Date(iso)),
  );

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatEventTimeRange(
  startsAt: string,
  endsAt: string,
  locale: Locale = "es",
): string {
  const timeFormatter = new Intl.DateTimeFormat(
    locale === "es" ? "es-CR" : "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Costa_Rica",
    },
  );

  const start = normalizeIntlText(timeFormatter.format(new Date(startsAt)));
  const end = normalizeIntlText(timeFormatter.format(new Date(endsAt)));
  return locale === "es" ? `${start} a ${end}` : `${start} to ${end}`;
}

export function formatDateLabel(iso: string, locale: Locale = "es"): string {
  const value = normalizeIntlText(
    new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
      day: "numeric",
      month: "short",
      weekday: "long",
      timeZone: "America/Costa_Rica",
    }).format(new Date(iso)),
  );

  if (locale === "en") {
    return value;
  }

  const parts = value.replace(/\./g, "").split(",").map((part) => part.trim());
  if (parts.length === 2) {
    const [weekday, rest] = parts;
    return `${rest} ${weekday}`;
  }
  return value;
}

export function buildIcs(event: CommunityEvent): string {
  const stamp = (iso: string) =>
    new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const description = event.summary.replace(/\n/g, "\\n");
  const location = `${event.venue.name}, ${event.venue.address}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Grok Bot & Cursor Costa Rica//Events//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.slug}@grokbot-cursor-cr-events`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(event.startsAt)}`,
    `DTEND:${stamp(event.endsAt)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    event.lumaUrl ? `URL:${event.lumaUrl}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}
