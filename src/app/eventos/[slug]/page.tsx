import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EventDetailView } from "@/components/EventDetailView";
import { getAllEvents, getEventBySlug } from "@/lib/events/load";
import type { CommunityEventRecord } from "@/lib/i18n/localizeEvent";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://eventos-costa-rica.vercel.app";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function truncateDescription(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "…";
}

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) {
    return { title: "Evento" };
  }
  const eventUrl = `${SITE_URL}/eventos/${slug}`;
  const shortDescription = truncateDescription(event.summary);

  return {
    title: event.title,
    description: shortDescription,
    openGraph: {
      title: event.title,
      description: shortDescription,
      type: "website",
      locale: "es_CR",
      url: eventUrl,
      siteName: "Eventos Grok Bot & Cursor Costa Rica",
      images: [
        {
          url: event.cover,
          width: 640,
          height: 640,
          alt: event.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: event.title,
      description: shortDescription,
      images: [event.cover],
    },
    alternates: {
      canonical: eventUrl,
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = (await getEventBySlug(slug)) as CommunityEventRecord | null;
  if (!event) {
    notFound();
  }

  return <EventDetailView event={event} />;
}
