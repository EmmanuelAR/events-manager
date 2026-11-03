import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EventDetailView } from "@/components/EventDetailView";
import { getAllEvents, getEventBySlug } from "@/lib/events/load";
import type { CommunityEventRecord } from "@/lib/i18n/localizeEvent";

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
  return {
    title: event.title,
    description: event.summary,
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
