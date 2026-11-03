import { timingSafeEqual } from "node:crypto";
import type { CreditsLinks } from "./types";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;

type AttemptRecord = {
  count: number;
  firstAttempt: number;
};

const rateLimitStore = new Map<string, AttemptRecord>();

function getRateLimitKey(ip: string, slug: string): string {
  return `${ip}:${slug}`;
}

export function checkRateLimit(
  ip: string,
  slug: string,
): { allowed: boolean; retryAfterSeconds: number } {
  const key = getRateLimitKey(ip, slug);
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record) {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  const elapsed = now - record.firstAttempt;
  if (elapsed >= RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.delete(key);
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (record.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    const remaining = RATE_LIMIT_WINDOW_MS - elapsed;
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(remaining / 1000),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function recordAttempt(ip: string, slug: string): void {
  const key = getRateLimitKey(ip, slug);
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || now - existing.firstAttempt >= RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, firstAttempt: now });
  } else {
    existing.count += 1;
  }
}

function envKey(slug: string, suffix: string): string {
  const normalized = slug.replace(/-/g, "_").toUpperCase();
  return `CREDITS_${normalized}_${suffix}`;
}

function safeEqual(a: string, b: string): boolean {
  const normalizedA = a.trim().toLowerCase().replace(/\s+/g, "");
  const normalizedB = b.trim().toLowerCase().replace(/\s+/g, "");

  const left = Buffer.from(normalizedA);
  const right = Buffer.from(normalizedB);

  if (left.length !== right.length) {
    const maxLen = Math.max(left.length, right.length);
    const paddedLeft = Buffer.alloc(maxLen, 0);
    const paddedRight = Buffer.alloc(maxLen, 0);
    left.copy(paddedLeft);
    right.copy(paddedRight);
    timingSafeEqual(paddedLeft, paddedRight);
    return false;
  }

  return timingSafeEqual(left, right);
}

type CreditsConfig = {
  code: string;
  links: CreditsLinks;
};

function getCreditsConfig(slug: string): CreditsConfig | null {
  const codeKey = envKey(slug, "CODE");
  const existingKey = envKey(slug, "LINK_EXISTING");
  const newKey = envKey(slug, "LINK_NEW");

  const code = process.env[codeKey];
  const existing = process.env[existingKey];
  const next = process.env[newKey];

  if (!code || !existing || !next) {
    if (!code) console.error(`[credits] Missing env: ${codeKey}`);
    if (!existing) console.error(`[credits] Missing env: ${existingKey}`);
    if (!next) console.error(`[credits] Missing env: ${newKey}`);
    return null;
  }

  return {
    code,
    links: { existing, new: next },
  };
}

type UnlockResult =
  | { links: CreditsLinks; error?: undefined }
  | { links?: undefined; error: "config_missing" | "invalid_code" };

export function unlockCredits(slug: string, code: string): UnlockResult {
  const config = getCreditsConfig(slug);
  if (!config) {
    return { error: "config_missing" };
  }

  if (!safeEqual(code, config.code)) {
    return { error: "invalid_code" };
  }

  return { links: config.links };
}
