import { NextResponse } from "next/server";
import { unlockCredits, checkRateLimit, recordAttempt } from "@/lib/events/credits";
import { getEventBySlug } from "@/lib/events/load";

const CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

function jsonResponse(
  data: object,
  status: number,
  extraHeaders?: Record<string, string>,
) {
  return NextResponse.json(data, {
    status,
    headers: { ...CACHE_HEADERS, ...extraHeaders },
  });
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Pedido inválido." }, 400);
  }

  if (
    body === null ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    return jsonResponse({ ok: false, error: "Pedido inválido." }, 400);
  }

  const bodyObj = body as Record<string, unknown>;
  const rawSlug = bodyObj.slug;
  const rawCode = bodyObj.code;

  if (typeof rawSlug !== "string" || typeof rawCode !== "string") {
    return jsonResponse(
      { ok: false, error: "Falta el código o el evento." },
      400,
    );
  }

  const slug = rawSlug.trim();
  const code = rawCode;

  if (!slug || !code.trim()) {
    return jsonResponse(
      { ok: false, error: "Falta el código o el evento." },
      400,
    );
  }

  const rateCheck = checkRateLimit(ip, slug);
  if (!rateCheck.allowed) {
    return jsonResponse(
      { ok: false, error: "Demasiados intentos. Esperá un rato." },
      429,
      { "Retry-After": String(rateCheck.retryAfterSeconds) },
    );
  }

  const event = await getEventBySlug(slug);
  if (!event || !event.creditsEnabled) {
    return jsonResponse(
      { ok: false, error: "Este evento no tiene créditos activos." },
      404,
    );
  }

  const result = unlockCredits(slug, code);

  if (result.error === "config_missing") {
    console.error(`[credits] Missing env var for event: ${slug}`);
    return jsonResponse(
      { ok: false, error: "Los créditos no están disponibles ahora." },
      503,
    );
  }

  if (result.error === "invalid_code") {
    recordAttempt(ip, slug);
    return jsonResponse({ ok: false, error: "Código incorrecto." }, 401);
  }

  return jsonResponse({ ok: true, links: result.links }, 200);
}
