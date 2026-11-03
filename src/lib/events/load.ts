import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { CommunityEventRecord } from "@/lib/i18n/localizeEvent";
import type { EventStatus } from "./types";

const eventsDir = path.join(process.cwd(), "content", "events");

function deriveEventStatus(endsAt: string): EventStatus {
  const costaRicaTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Costa_Rica",
  });
  const nowCR = new Date(costaRicaTime);
  const eventEnd = new Date(endsAt);
  return eventEnd < nowCR ? "past" : "upcoming";
}

export async function getAllEvents(): Promise<CommunityEventRecord[]> {
  const files = await readdir(eventsDir);
  const events = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const raw = await readFile(path.join(eventsDir, file), "utf8");
        const event = JSON.parse(raw) as CommunityEventRecord;
        return {
          ...event,
          status: deriveEventStatus(event.endsAt),
        };
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
