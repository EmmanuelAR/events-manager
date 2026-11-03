import { NextResponse } from "next/server";
import { unlockCredits } from "@/lib/events/credits";
import { getEventBySlug } from "@/lib/events/load";

type Body = {
  slug?: string;
  code?: string;
};

export async function POST(request: Request) {
  let body: Body;

  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Pedido inválido." },
      { status: 400 },
    );
  }

  const slug = body.slug?.trim();
  const code = body.code ?? "";

  if (!slug || !code.trim()) {
    return NextResponse.json(
      { ok: false, error: "Falta el código o el evento." },
      { status: 400 },
    );
  }

  const event = await getEventBySlug(slug);
  if (!event || !event.creditsEnabled) {
    return NextResponse.json(
      { ok: false, error: "Este evento no tiene créditos activos." },
      { status: 404 },
    );
  }

  const links = unlockCredits(slug, code);
  if (!links) {
    return NextResponse.json(
      { ok: false, error: "Código inválido." },
      { status: 401 },
    );
  }

  return NextResponse.json({ ok: true, links });
}
