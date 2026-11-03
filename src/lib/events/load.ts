import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { CommunityEventRecord } from "@/lib/i18n/localizeEvent";

const eventsDir = path.join(process.cwd(), "content", "events");

export async function getAllEvents(): Promise<CommunityEventRecord[]> {
  const files = await readdir(eventsDir);
  const events = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const raw = await readFile(path.join(eventsDir, file), "utf8");
        return JSON.parse(raw) as CommunityEventRecord;
      }),
  );

  return events.sort(
    (a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime(),
  );
}

export async function getEventBySlug(
  slug: string,
): Promise<CommunityEventRecord | null> {
  const events = await getAllEvents();
  return events.find((event) => event.slug === slug) ?? null;
}

export async function getUpcomingEvents(): Promise<CommunityEventRecord[]> {
  const events = await getAllEvents();
  return events.filter((event) => event.status === "upcoming");
}

export async function getPastEvents(): Promise<CommunityEventRecord[]> {
  const events = await getAllEvents();
  return events.filter((event) => event.status === "past");
}
