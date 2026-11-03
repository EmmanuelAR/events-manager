import Image from "next/image";
import Link from "next/link";
import type { CommunityEvent } from "@/lib/events/types";
import styles from "./EventRow.module.css";

type Props = {
  event: CommunityEvent;
};

function formatHour(iso: string): string {
  return new Intl.DateTimeFormat("es-CR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Costa_Rica",
  }).format(new Date(iso));
}

export function EventRow({ event }: Props) {
  return (
    <Link href={`/eventos/${event.slug}`} className={styles.row}>
      <div className={styles.main}>
        <time className={styles.time} dateTime={event.startsAt}>
          {formatHour(event.startsAt)}
        </time>
        <div className={styles.copy}>
          <h2 className={styles.title}>{event.title}</h2>
          {event.subtitle ? (
            <p className={styles.subtitle}>{event.subtitle}</p>
          ) : null}
          <p className={styles.venue}>
            <span className={styles.pin} aria-hidden="true" />
            {event.venue.name}
          </p>
        </div>
      </div>
      <div className={styles.thumb}>
        <Image
          src={event.cover}
          alt={event.coverAlt}
          width={112}
          height={112}
          className={styles.image}
        />
      </div>
    </Link>
  );
}
