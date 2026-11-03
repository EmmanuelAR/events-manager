"use client";

import Script from "next/script";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import styles from "./LumaCheckoutButton.module.css";

type Props = {
  eventId: string;
  eventUrl: string;
};

export function LumaCheckoutButton({ eventId, eventUrl }: Props) {
  const { t } = useLocale();

  return (
    <>
      <a
        href={eventUrl}
        className={`luma-checkout--button ${styles.button}`}
        data-luma-action="checkout"
        data-luma-event-id={eventId}
        data-luma-utm-source="eventos-costa-rica"
      >
        {t.requestJoin}
      </a>
      <Script
        id="luma-checkout"
        src="https://embed.lu.ma/checkout-button.js"
        strategy="afterInteractive"
      />
    </>
  );
}
