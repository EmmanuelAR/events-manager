"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Button } from "./Button";
import styles from "./CreditsClaim.module.css";

type Step = 1 | 2 | 3;
type Audience = "new" | "existing";

type Props = {
  slug: string;
  enabled: boolean;
};

type Links = { existing: string; new: string };

const UNIFY_URL = "https://cursor.com/unify";

export function CreditsClaim({ slug, enabled }: Props) {
  const { t } = useLocale();
  const [step, setStep] = useState<Step>(1);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<Links | null>(null);
  const [audience, setAudience] = useState<Audience | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const activeLink = links
    ? audience === "new"
      ? links.new
      : links.existing
    : "";

  useEffect(() => {
    if (!activeLink || !showQr) {
      return;
    }

    let cancelled = false;

    QRCode.toDataURL(activeLink, {
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
      setQrDataUrl("");
    };
  }, [activeLink, showQr]);

  useEffect(() => {
    if (retryAfter === null || retryAfter <= 0) return;

    const interval = setInterval(() => {
      setRetryAfter((prev) => (prev !== null && prev > 1 ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [retryAfter]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    if (!activeLink) return;

    try {
      await navigator.clipboard.writeText(activeLink);
      setCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
    }
  }, [activeLink]);

  if (!enabled) {
    return null;
  }

  async function onUnlock(event: React.FormEvent) {
    event.preventDefault();
    if (retryAfter !== null && retryAfter > 0) return;

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
        links?: Links;
      };

      if (response.status === 429) {
        const retryHeader = response.headers.get("Retry-After");
        const seconds = retryHeader ? parseInt(retryHeader, 10) : 600;
        setRetryAfter(seconds);
        setError(t.tooManyAttempts);
        return;
      }

      if (response.status === 503) {
        setError(t.creditsUnavailable);
        return;
      }

      if (!response.ok || !data.ok || !data.links) {
        setError(data.error ?? t.invalidCode);
        return;
      }

      setLinks(data.links);
      setStep(2);
    } catch {
      setError(t.validateError);
    } finally {
      setLoading(false);
    }
  }

  function chooseAudience(next: Audience) {
    setAudience(next);
    setShowQr(false);
    setQrDataUrl("");
    setStep(3);
  }

  function goBack() {
    if (step === 3) {
      setAudience(null);
      setShowQr(false);
      setQrDataUrl("");
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    }
  }

  function jumpToNewUser() {
    setAudience("new");
    setShowQr(false);
    setQrDataUrl("");
    setStep(3);
  }

  const totalSteps = 3;

  return (
    <section className={styles.section} id="creditos" aria-labelledby="credits-heading">
      <header className={styles.header}>
        <h2 id="credits-heading" className={styles.heading}>
          {t.claimCredits}
        </h2>
        <p className={styles.lead}>{t.claimCreditsLead}</p>
      </header>

      {/* Progress bar */}
      <div className={styles.progress} role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={totalSteps}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
        <p className={styles.progressLabel}>
          {t.creditsStep} {step} {t.creditsStepOf} {totalSteps}
        </p>
      </div>

      {/* Step 1: Code input */}
      {step === 1 && (
        <form className={styles.stepContent} onSubmit={onUnlock}>
          <label className={styles.label} htmlFor="credits-code">
            {t.eventCode}
          </label>
          <p className={styles.hint}>{t.eventCodeHint}</p>
          <input
            id="credits-code"
            className={styles.input}
            type="password"
            autoComplete="off"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder={t.codePlaceholder}
            required
            disabled={retryAfter !== null && retryAfter > 0}
          />
          {error && (
            <p className={styles.error} role="alert">
              {error}
              {retryAfter !== null && retryAfter > 0 && (
                <span className={styles.retryTimer}>
                  {" "}({Math.ceil(retryAfter / 60)} min)
                </span>
              )}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading || !code.trim() || (retryAfter !== null && retryAfter > 0)}
          >
            {loading ? t.validating : t.unlock}
          </Button>
        </form>
      )}

      {/* Step 2: Choose account type */}
      {step === 2 && (
        <div className={styles.stepContent}>
          <p className={styles.choiceTitle}>{t.chooseAccountType}</p>
          <div className={styles.cardGrid}>
            <button
              type="button"
              className={styles.choiceCard}
              onClick={() => chooseAudience("new")}
            >
              <span className={styles.cardTitle}>{t.imNewUser}</span>
              <span className={styles.cardDesc}>{t.imNewUserDesc}</span>
            </button>
            <button
              type="button"
              className={styles.choiceCard}
              onClick={() => chooseAudience("existing")}
            >
              <span className={styles.cardTitle}>{t.imExistingUser}</span>
              <span className={styles.cardDesc}>{t.imExistingUserDesc}</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Instructions + QR */}
      {step === 3 && audience && (
        <div className={styles.stepContent}>
          {audience === "new" ? (
            <div className={styles.instructions}>
              <h3 className={styles.instructionsTitle}>{t.newUserTitle}</h3>
              <p className={styles.value}>{t.newUserValue}</p>
              <p className={styles.requirement}>{t.newUserReq}</p>
              <ol className={styles.steps}>
                <li>{t.newUserStep1}</li>
                <li>{t.newUserStep2}</li>
                <li>{t.newUserStep3}</li>
              </ol>
              <p className={styles.note}>{t.newUserNote}</p>
            </div>
          ) : (
            <div className={styles.instructions}>
              <h3 className={styles.instructionsTitle}>{t.existingUserTitle}</h3>
              <p className={styles.value}>{t.existingUserValue}</p>
              <p className={styles.requirement}>{t.existingUserNote}</p>
              <ol className={styles.steps}>
                <li>{t.existingUserStep1}</li>
                <li>{t.existingUserStep2}</li>
                <li>{t.existingUserStep3}</li>
              </ol>

              {/* Legacy notice */}
              <div className={styles.legacyNotice}>
                <p className={styles.legacyTitle}>{t.legacyNotice}</p>
                <p className={styles.legacyText}>{t.legacyInstructions}</p>
                <div className={styles.legacyActions}>
                  <Button
                    href={UNIFY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                  >
                    {t.legacyUnifyLink}
                  </Button>
                  <Button type="button" variant="ghost" onClick={jumpToNewUser}>
                    {t.legacyUseNewLink}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Link actions */}
          <div className={styles.linkActions}>
            <Button
              href={activeLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryAction}
            >
              {t.goToLink}
            </Button>
            <Button type="button" variant="secondary" onClick={handleCopy}>
              {copied ? t.linkCopied : t.copyLink}
            </Button>
          </div>

          {/* Accessible live region for copy feedback */}
          <div
            ref={liveRegionRef}
            aria-live="polite"
            aria-atomic="true"
            className={styles.srOnly}
          >
            {copied ? t.linkCopied : ""}
          </div>

          {/* QR toggle for mobile */}
          <div className={styles.qrSection}>
            <button
              type="button"
              className={styles.qrToggle}
              onClick={() => setShowQr(!showQr)}
              aria-expanded={showQr}
            >
              {showQr ? t.hideQr : t.showQr}
            </button>

            {showQr && (
              <div className={styles.qrContainer}>
                {qrDataUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={qrDataUrl}
                    alt={t.qrAlt}
                    className={styles.qr}
                    width={200}
                    height={200}
                  />
                ) : (
                  <p className={styles.muted}>{t.generatingQr}</p>
                )}
              </div>
            )}
          </div>

          <Button type="button" variant="ghost" onClick={goBack}>
            {t.backToChoice}
          </Button>
        </div>
      )}

      {/* Footer notices */}
      {step === 3 && (
        <footer className={styles.footer}>
          <p>{t.creditsFooterLimited}</p>
          <p>{t.creditsFooterTerms}</p>
          <p>{t.creditsFooterPrivacy}</p>
        </footer>
      )}
    </section>
  );
}
