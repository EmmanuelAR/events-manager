"use client";

import { useMemo, useState } from "react";
import type { CommunityEvent } from "@/lib/events/types";
import { formatDateLabel } from "@/lib/events/format";
import { localizeEvent, type CommunityEventRecord } from "@/lib/i18n/localizeEvent";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { EventRow } from "./EventRow";
import styles from "./EventList.module.css";

type Props = {
  upcoming: CommunityEventRecord[];
  past: CommunityEventRecord[];
};

type Tab = "upcoming" | "past";

function groupByDateLabel(
  events: CommunityEvent[],
  locale: "es" | "en",
) {
  const groups: { label: string; events: CommunityEvent[] }[] = [];

  for (const event of events) {
    const label = formatDateLabel(event.startsAt, locale);
    const last = groups[groups.length - 1];
    if (last && last.label === label) {
      last.events.push(event);
    } else {
      groups.push({ label, events: [event] });
    }
  }

  return groups;
}

export function EventList({ upcoming, past }: Props) {
  const { locale, t } = useLocale();
  const [tab, setTab] = useState<Tab>(
    upcoming.length > 0 ? "upcoming" : "past",
  );

  const localizedUpcoming = useMemo(
    () => upcoming.map((event) => localizeEvent(event, locale)),
    [upcoming, locale],
  );
  const localizedPast = useMemo(
    () => past.map((event) => localizeEvent(event, locale)),
    [past, locale],
  );

  const active = tab === "upcoming" ? localizedUpcoming : localizedPast;
  const groups = useMemo(
    () => groupByDateLabel(active, locale),
    [active, locale],
  );

  return (
    <section className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t.events}</h1>
        <div className={styles.tabs} role="tablist" aria-label={t.filterAria}>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "upcoming"}
            className={styles.tab}
            data-active={tab === "upcoming"}
            onClick={() => setTab("upcoming")}
          >
            {t.upcoming}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "past"}
            className={styles.tab}
            data-active={tab === "past"}
            onClick={() => setTab("past")}
          >
            {t.past}
          </button>
        </div>
      </div>

      {groups.length === 0 ? (
        <p className={styles.empty}>
          {tab === "upcoming" ? t.noUpcoming : t.noPast}
        </p>
      ) : (
        <div className={styles.timeline}>
          {groups.map((group) => (
            <div key={group.label} className={styles.group}>
              <div className={styles.dateCol}>
                <span className={styles.dateLabel}>{group.label}</span>
              </div>
              <div className={styles.rail} aria-hidden="true">
                <span className={styles.dot} />
              </div>
              <div className={styles.cards}>
                {group.events.map((event) => (
                  <EventRow key={event.slug} event={event} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
