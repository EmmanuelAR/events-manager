"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className={styles.hero}>
      <div className={`site-shell ${styles.inner}`}>
        <h1 className={styles.title}>
          SpaceXSI
          <span>Community</span>
          <span className={styles.region}>{t.heroRegion}</span>
        </h1>
        <p className={styles.headline}>{t.heroHeadline}</p>
        <p className={styles.lead}>{t.heroLead}</p>
        <p className={styles.credit}>{t.heroCredit}</p>
      </div>
    </section>
  );
}
