import type { MetadataRoute } from "next";
import { getAllEvents } from "@/lib/events/load";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://eventos-costa-rica.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getAllEvents();

  const eventUrls: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${SITE_URL}/eventos/${event.slug}`,
    lastModified: new Date(event.startsAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const mostRecentEventDate =
    events.length > 0 ? new Date(events[0].startsAt) : new Date();

  return [
    {
      url: SITE_URL,
      lastModified: mostRecentEventDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...eventUrls,
  ];
}
