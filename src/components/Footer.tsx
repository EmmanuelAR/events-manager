"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className={styles.footer}>
      <div className={`site-shell ${styles.inner}`}>
        <p className={styles.disclaimer}>{t.footerDisclaimer}</p>
      </div>
    </footer>
  );
}
