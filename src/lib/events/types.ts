export type EventStatus = "upcoming" | "past";

export type AgendaItem = {
  time: string;
  title: string;
  note?: string;
};

export type MaterialItem = {
  label: string;
  url: string;
  kind: "file" | "link";
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Venue = {
  name: string;
  address: string;
  mapsUrl?: string;
};

export type CommunityEvent = {
  slug: string;
  title: string;
  subtitle?: string;
  status: EventStatus;
  startsAt: string;
  endsAt: string;
  timezone: string;
  venue: Venue;
  cover: string;
  coverAlt: string;
  lumaUrl?: string;
  /** ID Luma (evt-...) para el botón embed de registro */
  lumaEventId?: string;
  /** Grupo de WhatsApp solo de este evento */
  whatsappUrl?: string;
  /** Grupo de WhatsApp de la comunidad en general */
  communityWhatsappUrl?: string;
  summary: string;
  agenda: AgendaItem[];
  materials: MaterialItem[];
  faq?: FaqItem[];
  creditsEnabled: boolean;
};

export type CreditsLinks = {
  existing: string;
  new: string;
};
