import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EventDetailView } from "@/components/EventDetailView";
import { getAllEvents, getEventBySlug } from "@/lib/events/load";
import type { CommunityEventRecord } from "@/lib/i18n/localizeEvent";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://events-manager-ten.vercel.app";

const OG_IMAGE_PATH = "/assets/imagenes/og-community.jpg";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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
  return {
    title: event.title,
    description: event.summary,
    openGraph: {
      title: event.title,
      description: event.summary,
      type: "website",
      locale: "es_CR",
      url: eventUrl,
      siteName: "SpaceXSI Community Costa Rica",
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 640,
          height: 640,
          alt: "Logo de la comunidad SpaceXSI Costa Rica",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: event.title,
      description: event.summary,
      images: [OG_IMAGE_PATH],
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
