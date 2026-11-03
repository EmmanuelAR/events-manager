"use client";

import { Button } from "@/components/Button";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import styles from "./CommunityStrip.module.css";

type Props = {
  whatsappUrl: string;
};

export function CommunityStrip({ whatsappUrl }: Props) {
  const { t } = useLocale();

  return (
    <section
      id="comunidad"
      className={styles.section}
      aria-labelledby="community-heading"
    >
      <div className={`site-shell ${styles.inner}`}>
        <div className={styles.copy}>
          <h2 id="community-heading" className={styles.title}>
            {t.communityTitle}
          </h2>
          <p className={styles.lead}>{t.communityLead}</p>
        </div>
        <Button href={whatsappUrl} target="_blank" rel="noreferrer">
          {t.joinCommunityGroup}
        </Button>
      </div>
    </section>
  );
}
