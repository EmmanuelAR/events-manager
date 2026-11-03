# Eventos SpaceXSI Community Costa Rica

Site liviano de eventos (Grok Bot / Cursor) para la comunidad en Costa Rica.
Contenido en JSON, sin panel admin: los embajadores editan en código.

## Ver en local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

En `.env.local` poné el código del día y los 2 links de créditos del evento.
Esos valores **no** van en el JSON público.

## Agregar un evento

1. Copiá `content/events/grok-bot-101.json` a un archivo nuevo, p. ej. `mi-evento.json`.
2. Cambiá `slug`, fechas, venue, cover, agenda, materiales, FAQ, etc.
3. Si el evento tiene créditos, agregá en `.env.local`:

```bash
CREDITS_<SLUG_EN_MAYUSCULAS>_CODE=...
CREDITS_<SLUG_EN_MAYUSCULAS>_LINK_EXISTING=...
CREDITS_<SLUG_EN_MAYUSCULAS>_LINK_NEW=...
```

Ejemplo: slug `grok-bot-101` → `CREDITS_GROK_BOT_101_CODE`.

4. Covers recomendados: `/public/assets/imagenes/luma-covers/`.

## Estructura

- `content/events/`: datos de cada evento
- `content/ambassadors/`: datos de cada embajador
- `src/app/`: rutas (home, detalle, API de créditos)
- `src/components/`: UI (Header, Hero, EventList, CreditsClaim, etc.)
- `public/assets/`: logos, fuentes Universal Sans, covers, stickers

## Branding y copy

- Decí **Grok Bot**, **Cursor**, **SpaceXSI Community**
- Título de rol: **Build ambassador in the SpaceXSI Community**
- No uses SpaceX, SpaceXAI, ni “oficial”
- Footer: evento independiente, sin fines de lucro

## Scripts

- `npm run dev`: desarrollo
- `npm run build`: build de producción
- `npm run start`: servir build
