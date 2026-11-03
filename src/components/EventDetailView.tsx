"use client";

import Image from "next/image";
import { Button } from "@/components/Button";
import { CreditsClaim } from "@/components/CreditsClaim";
import { formatEventDate, formatEventTimeRange } from "@/lib/events/format";
import { localizeEvent, type CommunityEventRecord } from "@/lib/i18n/localizeEvent";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import styles from "@/app/eventos/[slug]/page.module.css";

type Props = {
  event: CommunityEventRecord;
};

export function EventDetailView({ event }: Props) {
  const { locale, t } = useLocale();
  const localized = localizeEvent(event, locale);

  return (
    <article className={styles.page}>
      <div className={`${styles.shell} ${styles.top}`}>
        <div className={styles.coverCol}>
          <div className={styles.coverWrap}>
            <Image
              src={localized.cover}
              alt={localized.coverAlt}
              width={640}
              height={640}
              className={styles.cover}
              priority
            />
          </div>
        </div>

        <div className={styles.infoCol}>
          <p className={styles.eyebrow}>
            {localized.status === "upcoming" ? t.upcomingEvent : t.pastEvent}
          </p>
          <h1 className={styles.title}>{localized.title}</h1>
          {localized.subtitle ? (
            <p className={styles.subtitle}>{localized.subtitle}</p>
          ) : null}

          <ul className={styles.facts}>
            <li>
              <span className={styles.factLabel}>{t.date}</span>
              <span>
                {formatEventDate(localized.startsAt, locale)}
                <br />
                {formatEventTimeRange(
                  localized.startsAt,
                  localized.endsAt,
                  locale,
                )}
              </span>
            </li>
            <li>
              <span className={styles.factLabel}>{t.place}</span>
              <span>
                {localized.venue.name}
                <br />
                <span className="muted">{localized.venue.address}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={`${styles.shell} ${styles.body}`}>
        {localized.lumaUrl ? (
          <section className={`${styles.module} ${styles.spanFull}`}>
            <h2 className={styles.registerTitle}>{t.registration}</h2>
            <div className={styles.moduleBody}>
              <p className={styles.registerCopy}>{t.registrationCopy}</p>
              <div className={styles.actions}>
                <Button
                  href={localized.lumaUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.requestJoin}
                </Button>
              </div>
            </div>
          </section>
        ) : null}

        <section className={`${styles.block} ${styles.spanFull}`} id="agenda">
          <h2 className={styles.heading}>{t.agenda}</h2>
          <div className={styles.moduleBody}>
            <ol className={styles.agenda}>
              {localized.agenda.map((item) => (
                <li
                  key={`${item.time}-${item.title}`}
                  className={styles.agendaItem}
                >
                  <span className={styles.agendaTime}>{item.time}</span>
                  <div>
                    <strong>{item.title}</strong>
                    {item.note ? <p className="muted">{item.note}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <CreditsClaim
          slug={localized.slug}
          enabled={localized.creditsEnabled}
        />

        <section className={styles.block} id="lugar">
          <h2 className={styles.heading}>{t.howToGetThere}</h2>
          <div className={styles.moduleBody}>
            <p>
              <strong>{localized.venue.name}</strong>
            </p>
            <p className="muted">{localized.venue.address}</p>
            {localized.venue.mapsUrl ? (
              <div className={styles.inlineActions}>
                <Button
                  href={localized.venue.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                >
                  {t.openMaps}
                </Button>
              </div>
            ) : null}
          </div>
        </section>

        <section className={styles.block} id="materiales">
          <h2 className={styles.heading}>{t.materials}</h2>
          <div className={styles.moduleBody}>
            {localized.materials.length > 0 ? (
              <ul className={styles.materials}>
                {localized.materials.map((material) => (
                  <li key={material.url}>
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.materialLink}
                    >
                      <span>{material.label}</span>
                      <span className={styles.materialKind}>
                        {material.kind === "file" ? t.file : t.link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">{t.noMaterials}</p>
            )}
          </div>
        </section>

        {localized.faq && localized.faq.length > 0 ? (
          <section className={`${styles.block} ${styles.spanFull}`} id="faq">
            <h2 className={styles.heading}>{t.faq}</h2>
            <div className={styles.moduleBody}>
              <div className={styles.faq}>
                {localized.faq.map((item) => (
                  <details key={item.question} className={styles.faqItem}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
