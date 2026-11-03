"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Button } from "./Button";
import styles from "./CreditsClaim.module.css";

type Step = "locked" | "choose" | "qr";
type Audience = "existing" | "new";

type Props = {
  slug: string;
  enabled: boolean;
};

export function CreditsClaim({ slug, enabled }: Props) {
  const { t } = useLocale();
  const [step, setStep] = useState<Step>("locked");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<{ existing: string; new: string } | null>(
    null,
  );
  const [audience, setAudience] = useState<Audience | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState("");

  useEffect(() => {
    if (!links || !audience) {
      return;
    }

    const url = audience === "existing" ? links.existing : links.new;
    let cancelled = false;

    QRCode.toDataURL(url, {
      width: 280,
      margin: 1,
      color: { dark: "#0A0A0A", light: "#FAFAFA" },
    }).then((dataUrl) => {
      if (!cancelled) {
        setQrDataUrl(dataUrl);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [links, audience]);

  if (!enabled) {
    return null;
  }

  async function onUnlock(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/credits/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, code }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        links?: { existing: string; new: string };
      };

      if (!response.ok || !data.ok || !data.links) {
        setError(data.error ?? t.invalidCode);
        return;
      }

      setLinks(data.links);
      setStep("choose");
    } catch {
      setError(t.validateError);
    } finally {
      setLoading(false);
    }
  }

  function chooseAudience(next: Audience) {
    setAudience(next);
    setStep("qr");
  }

  const activeLink =
    links && audience
      ? audience === "existing"
        ? links.existing
        : links.new
      : "";

  return (
    <section className={styles.section} id="creditos">
      <h2 className={styles.heading}>{t.claimCredits}</h2>
      <p className={styles.lead}>{t.claimCreditsLead}</p>

      {step === "locked" ? (
        <form className={styles.form} onSubmit={onUnlock}>
          <label className={styles.label} htmlFor="credits-code">
            {t.eventCode}
          </label>
          <input
            id="credits-code"
            className={styles.input}
            type="password"
            autoComplete="off"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder={t.codePlaceholder}
            required
          />
          {error ? <p className={styles.error}>{error}</p> : null}
          <Button type="submit" disabled={loading || !code.trim()}>
            {loading ? t.validating : t.unlock}
          </Button>
        </form>
      ) : null}

      {step === "choose" ? (
        <div className={styles.choices}>
          <p>{t.howClaim}</p>
          <div className={styles.choiceRow}>
            <Button type="button" onClick={() => chooseAudience("existing")}>
              {t.alreadyHaveAccount}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => chooseAudience("new")}
            >
              {t.imNew}
            </Button>
          </div>
        </div>
      ) : null}

      {step === "qr" && audience ? (
        <div className={styles.qrBlock}>
          <p className={styles.qrLabel}>
            {audience === "existing" ? t.qrExisting : t.qrNew}
          </p>
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrDataUrl}
              alt={t.qrAlt}
              className={styles.qr}
              width={280}
              height={280}
            />
          ) : (
            <p className="muted">{t.generatingQr}</p>
          )}
          <div className={styles.choiceRow}>
            <Button href={activeLink} target="_blank" rel="noreferrer">
              {t.openLink}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setStep("choose");
                setAudience(null);
                setQrDataUrl("");
              }}
            >
              {t.changeOption}
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
