# Eventos Grok Bot & Cursor Costa Rica

Site liviano de eventos de Grok Bot y Cursor para la comunidad en Costa Rica.
Part of the SpaceXSI Community. Contenido en JSON, sin panel admin: los embajadores editan en código.

## Ver en local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

En `.env.local` poné el código del día y los 2 links de créditos del evento.
Esos valores **no** van en el JSON público.

## Variables de entorno

- `NEXT_PUBLIC_SITE_URL`: URL pública del sitio (canonical, OG, sitemap). Fallback: `https://eventos-costa-rica.vercel.app`
- `CREDITS_<SLUG>_CODE/LINK_EXISTING/LINK_NEW`: códigos y links de créditos por evento
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`: rate limiting persistente (opcional; sin ellos se usa memoria)
- Alternativamente, `KV_REST_API_URL` / `KV_REST_API_TOKEN` si usás Vercel KV

## Agregar un evento

1. Copiá `content/events/grok-bot-101.json` a un archivo nuevo, p. ej. `mi-evento.json`.
2. Cambiá `slug`, fechas, venue, cover, agenda, materiales, FAQ, etc.
3. El estado `past`/`upcoming` se deriva automáticamente de la fecha del evento.
4. Si el evento tiene créditos, agregá en `.env.local`:

```bash
CREDITS_<SLUG_EN_MAYUSCULAS>_CODE=...
CREDITS_<SLUG_EN_MAYUSCULAS>_LINK_EXISTING=...
CREDITS_<SLUG_EN_MAYUSCULAS>_LINK_NEW=...
```

Ejemplo: slug `grok-bot-101` → `CREDITS_GROK_BOT_101_CODE`.

5. Covers recomendados: `/public/assets/imagenes/luma-covers/`.

## Estructura

- `content/events/`: datos de cada evento
- `content/ambassadors/`: datos de cada embajador
- `src/app/`: rutas (home, detalle, API de créditos, sitemap, robots)
- `src/components/`: UI (Header, Footer, Hero, EventList, CreditsClaim, etc.)
- `public/assets/`: logos, fuentes Universal Sans, covers, stickers

## Branding y copy

- Decí **Grok Bot**, **Cursor**, **SpaceXSI Community**
- Título de rol: **Build Ambassador in the SpaceXSI Community**
- No uses SpaceX, SpaceXAI, ni "oficial"
- Footer: evento comunitario independiente, sin fines de lucro

## Scripts

- `npm run dev`: desarrollo
- `npm run build`: build de producción
- `npm run start`: servir build
