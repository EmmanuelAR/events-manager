"use client";

import Image from "next/image";
import { localizeAmbassador } from "@/lib/ambassadors/localize";
import type { Ambassador } from "@/lib/ambassadors/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import styles from "./AmbassadorsView.module.css";

type Props = {
  ambassadors: Ambassador[];
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function AmbassadorsView({ ambassadors }: Props) {
  const { locale, t } = useLocale();
  const items = ambassadors.map((person) =>
    localizeAmbassador(person, locale),
  );

  return (
    <section
      id="embajadores"
      className={styles.section}
      aria-labelledby="ambassadors-heading"
    >
      <div className={`site-shell ${styles.page}`}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t.ambassadorsEyebrow}</p>
          <h2 id="ambassadors-heading" className={styles.title}>
            {t.ambassadors}
          </h2>
          <p className={styles.lead}>{t.ambassadorsLead}</p>
        </header>

        <div className={styles.grid}>
          {items.map((person) => (
            <article key={person.slug} className={styles.card}>
              {person.photo ? (
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={128}
                  height={128}
                  className={styles.photo}
                />
              ) : (
                <div className={styles.avatar} aria-hidden="true">
                  {initials(person.name)}
                </div>
              )}
              <div className={styles.body}>
                <h3 className={styles.name}>{person.name}</h3>
                <p className={styles.role}>{person.role}</p>
                <p className={styles.location}>{person.location}</p>
                <div className={styles.links}>
                  {person.socials.map((social) => (
                    <a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.link}
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
