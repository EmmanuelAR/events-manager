"use client";

import Image from "next/image";
import { Button } from "@/components/Button";
import { CreditsClaim } from "@/components/CreditsClaim";
import { LumaCheckoutButton } from "@/components/LumaCheckoutButton";
import { formatEventDate, formatEventTimeRange, buildIcs } from "@/lib/events/format";
import { localizeEvent, type CommunityEventRecord } from "@/lib/i18n/localizeEvent";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import styles from "@/app/eventos/[slug]/page.module.css";

type Props = {
  event: CommunityEventRecord;
};

export function EventDetailView({ event }: Props) {
  const { locale, t } = useLocale();
  const localized = localizeEvent(event, locale);

  function handleDownloadIcs() {
    const ics = buildIcs(localized);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${localized.slug}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

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
                <span className={styles.locationMuted}>{localized.venue.address}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={`${styles.shell} ${styles.body}`}>
        <section className={`${styles.block} ${styles.spanFull}`} id="descripcion">
          <h2 className={styles.heading}>{t.summary}</h2>
          <div className={styles.moduleBody}>
            <p className={styles.summaryText}>{localized.summary}</p>
          </div>
        </section>

        {localized.lumaUrl ? (
          <section className={`${styles.module} ${styles.spanFull}`}>
            <h2 className={styles.registerTitle}>{t.registration}</h2>
            <div className={styles.moduleBody}>
              <p className={styles.registerCopy}>{t.registrationCopy}</p>
              <div className={styles.actions}>
                {localized.lumaEventId ? (
                  <LumaCheckoutButton
                    eventId={localized.lumaEventId}
                    eventUrl={localized.lumaUrl}
                  />
                ) : (
                  <Button
                    href={localized.lumaUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.requestJoin}
                  </Button>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleDownloadIcs}
                >
                  {t.addToCalendar}
                </Button>
              </div>
            </div>
          </section>
        ) : null}

        {localized.whoCanAttend ? (
          <section className={styles.block} id="quien-puede-asistir">
            <h2 className={styles.heading}>{t.whoCanAttend}</h2>
            <div className={styles.moduleBody}>
              <p className={styles.sectionText}>{localized.whoCanAttend}</p>
            </div>
          </section>
        ) : null}

        {localized.whatToBring && localized.whatToBring.length > 0 ? (
          <section className={styles.block} id="que-traer">
            <h2 className={styles.heading}>{t.whatToBring}</h2>
            <div className={styles.moduleBody}>
              <ul className={styles.bringList}>
                {localized.whatToBring.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className={`${styles.block} ${styles.spanFull}`} id="agenda">
          <h2 className={styles.heading}>{t.agenda}</h2>
          <div className={styles.moduleBody}>
            <ol className={styles.agenda}>
              {localized.agenda.map((item, index) => (
                <li
                  key={`${item.time ?? index}-${item.title}`}
                  className={styles.agendaItem}
                >
                  {item.time ? (
                    <span className={styles.agendaTime}>{item.time}</span>
                  ) : (
                    <span className={styles.agendaTime} aria-hidden="true"></span>
                  )}
                  <div>
                    <strong>{item.title}</strong>
                    {item.note ? <p className={styles.noteMuted}>{item.note}</p> : null}
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
            <p className={styles.locationMuted}>{localized.venue.address}</p>
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

        {localized.whatsappUrl || localized.communityWhatsappUrl ? (
          <section className={styles.block} id="whatsapp">
            <h2 className={styles.heading}>{t.whatsapp}</h2>
            <div className={styles.moduleBody}>
              <p className={styles.sectionLead}>{t.whatsappLead}</p>
              <div className={styles.whatsappGroups}>
                {localized.whatsappUrl ? (
                  <div className={styles.whatsappGroup}>
                    <strong>{t.whatsappEventLabel}</strong>
                    <p className={styles.noteMuted}>{t.whatsappEventHint}</p>
                    <Button
                      href={localized.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      variant="secondary"
                    >
                      {t.joinEventGroup}
                    </Button>
                  </div>
                ) : null}
                {localized.communityWhatsappUrl ? (
                  <div className={styles.whatsappGroup}>
                    <strong>{t.whatsappCommunityLabel}</strong>
                    <p className={styles.noteMuted}>{t.whatsappCommunityHint}</p>
                    <Button
                      href={localized.communityWhatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      variant="secondary"
                    >
                      {t.joinCommunityGroup}
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {localized.privacy ? (
          <section className={styles.block} id="privacidad">
            <h2 className={styles.heading}>{t.privacyPhotos}</h2>
            <div className={styles.moduleBody}>
              <p className={styles.sectionText}>{localized.privacy}</p>
            </div>
          </section>
        ) : null}

        {localized.acknowledgment ? (
          <section className={styles.block} id="importante">
            <h2 className={styles.heading}>{t.acknowledgment}</h2>
            <div className={styles.moduleBody}>
              <p className={styles.sectionText}>{localized.acknowledgment}</p>
            </div>
          </section>
        ) : null}

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
              <p className={styles.noteMuted}>{t.noMaterials}</p>
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
