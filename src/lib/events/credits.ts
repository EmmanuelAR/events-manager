import { timingSafeEqual } from "node:crypto";
import type { CreditsLinks } from "./types";

function envKey(slug: string, suffix: string): string {
  const normalized = slug.replace(/-/g, "_").toUpperCase();
  return `CREDITS_${normalized}_${suffix}`;
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    return false;
  }
  return timingSafeEqual(left, right);
}

export function getCreditsConfig(slug: string): {
  code: string;
  links: CreditsLinks;
} | null {
  const code = process.env[envKey(slug, "CODE")];
  const existing = process.env[envKey(slug, "LINK_EXISTING")];
  const next = process.env[envKey(slug, "LINK_NEW")];

  if (!code || !existing || !next) {
    return null;
  }

  return {
    code,
    links: { existing, new: next },
  };
}

export function unlockCredits(
  slug: string,
  code: string,
): CreditsLinks | null {
  const config = getCreditsConfig(slug);
  if (!config) {
    return null;
  }

  if (!safeEqual(code.trim(), config.code)) {
    return null;
  }

  return config.links;
}
