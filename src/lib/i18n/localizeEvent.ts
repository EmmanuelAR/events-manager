import type { Locale } from "./dictionaries";
import type {
  AgendaItem,
  CommunityEvent,
  FaqItem,
  MaterialItem,
} from "@/lib/events/types";

export type LocalizedEventContent = {
  title?: string;
  subtitle?: string;
  coverAlt?: string;
  summary?: string;
  agenda?: AgendaItem[];
  materials?: Array<Pick<MaterialItem, "label"> & Partial<MaterialItem>>;
  faq?: FaqItem[];
};

export type CommunityEventRecord = CommunityEvent & {
  en?: LocalizedEventContent;
};

export function localizeEvent(
  event: CommunityEventRecord,
  locale: Locale,
): CommunityEvent {
  if (locale === "es" || !event.en) {
    const { en: _en, ...rest } = event;
    return rest;
  }

  const en = event.en;
  const { en: _en, ...base } = event;

  return {
    ...base,
    title: en.title ?? base.title,
    subtitle: en.subtitle ?? base.subtitle,
    coverAlt: en.coverAlt ?? base.coverAlt,
    summary: en.summary ?? base.summary,
    agenda: en.agenda ?? base.agenda,
    materials: en.materials
      ? base.materials.map((material, index) => ({
          ...material,
          label: en.materials?.[index]?.label ?? material.label,
        }))
      : base.materials,
    faq: en.faq ?? base.faq,
  };
}
