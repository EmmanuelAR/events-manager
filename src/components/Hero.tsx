"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className={`atmosphere ${styles.hero}`}>
      <div className={`site-shell ${styles.inner}`}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            Grok Bot &amp; Cursor
            <span className={styles.region}>{t.heroRegion}</span>
          </h1>
          <p className={styles.subtitle}>{t.heroSubtitle}</p>
          <p className={styles.headline}>{t.heroHeadline}</p>
          <p className={styles.lead}>{t.heroLead}</p>
          <p className={styles.credit}>{t.heroCredit}</p>
        </div>
      </div>
    </section>
  );
}
