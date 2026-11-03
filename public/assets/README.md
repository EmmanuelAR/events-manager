# Grok Bot – assets de marca para el site de Grok Bot 101 (CCCN, 28 nov 2026)

Research hecho el 2 nov 2026 (hora de Costa Rica) en Slack (workspace buildbotambassadors) y Notion. Solo se leyó: no se publicó ni se cambió nada.

## IMPORTANTE: accesos que no se lograron
- Las páginas oficiales de Notion están en el workspace de embajadores (cursorambassadors / spacexaiambassadors). **El conector de Notion de Emmanuel no tiene acceso a ese workspace** (404) y no son públicas. Hay que abrirlas a mano con la sesión de embajador:
  - Grok Bot assets (logos, rollup, stickers, use-case cards, slides, Figma): https://app.notion.com/p/cursorambassadors/Grok-Bot-assets-3c5ba798b53c8080a44ae0b7d93f19c2
  - SpaceXAI Community Brand Guidelines: https://app.notion.com/p/cursorambassadors/SpaceXAI-Community-Brand-Guidelines-3cfba798b53c810ebfd2f304de62c3ea
  - Social and comms guidelines (reglas públicas, nov 2026): https://app.notion.com/p/spacexaiambassadors/Social-and-comms-guidelines-40cba798b53c80a48a81f87de81f1f92
  - Event guide: https://app.notion.com/p/cursorambassadors/Event-guide-1deba798b53c800d9513d964043a1b4a
  - Onboarding (incluye la página de LinkedIn de la comunidad): https://app.notion.com/p/spacexaiambassadors/Onboarding-1c3ba798b53c81679dfec5698c1c5dfb
- En el Notion personal de Emmanuel no hay nada sobre la marca Grok Bot.

## Tipografía
- **Universal Sans** es la fuente de Grok Bot. Lo confirman Ben Lang (#07_ambassador-help, 20 sep 2026) y Ambassador Support (26 oct 2026).
- Las variantes que usa la herramienta oficial de miniaturas son **Universal Sans Display Regular y Medium** (woff2). Se descargaron en `fuentes/`.
- Licencia y descarga oficial: **no se encontraron**. Los archivos salen de la web de la herramienta de miniaturas y no traen licencia. Antes de usarlos en producción, confirmalo en #07_ambassador-help o en la página de Grok Bot assets.
- La herramienta también tiene CSS para "Cursor Gothic", la fuente de la marca Cursor, pero no se descargó.

## Colores
No se encontró una paleta oficial de Grok Bot con códigos hex. La página de Brand Guidelines no se pudo abrir. Los colores de abajo se **sacaron de los archivos oficiales que se descargaron**, así que sirven como referencia y no son una paleta publicada:
| Hex | Dónde aparece |
|---|---|
| #0A0A0A | fondo del ícono/favicon de Grok Bot (herramienta de miniaturas) |
| #FFFFFF | logo sobre fondo oscuro |
| #000000 / #14120B / #0B0A06 / #1B1913 / #2B2923 | fondos y bordes de la UI oscura de la herramienta |
| #EDECEC / #FAFAFA / #E6E6E6 / #9A9A9A / #6B6B6B | textos y fondos claros de la UI |
| #FF309B (rosa), #1084FE (azul), #00BCA6 (verde-turquesa), #FF9800 (naranja), #FF6700, #00C972, #008F7E | colores de los personajes "bots" en las portadas de Luma oficiales (SVG) |
| #777777, #3D3D3D, #262626, gradiente #D2D2D2→#8A8A8A | grises de las portadas |
En el preview del rollup también se ven un bot café, uno rosa, uno azul (nube) y uno turquesa, con el logo negro de Grok Bot sobre fondo blanco.
Otra referencia, de #15_discord (Mario Pulice, no oficial): en el brand book de X van #000000/#FFFFFF, el acento del blog de Cursor es #F54E00 sobre #14120B, y spacex.com usa #000000/#F0F0FA.

## Assets descargados
| Archivo | Qué es | Origen |
|---|---|---|
| logos/grokbot-favicon-thumbnailtool.svg | ícono/marca en blanco sobre cuadro redondeado #0A0A0A | grok-bot-thumbnail-tool.vercel.app (link oficial que comparte Ambassador Support) |
| logos/CUBE_2D_DARK-DqZHf7Al.png | marca "cube" 2D, versión dark | misma herramienta |
| logos/LOCKUP_VERTICAL_2D_DARK-BjsjCrzO.png | lockup vertical 2D, versión dark | misma herramienta |
| imagenes/luma-covers/GrokBot_Luma_Cover*.svg (11) | plantillas oficiales de portadas Luma con los personajes bot | misma herramienta (/templates/) |
| imagenes/grokbot-rollup-preview-welcome.png | preview del rollup "Welcome / Grok Bot / Event name" | Slack #02_general, Ben Lang, 23 ago 2026 |
| fuentes/UniversalSans-Display-Regular.woff2, -Medium.woff2 | fuente de Grok Bot | herramienta de miniaturas |
| otros/thumbnail-tool.html, tt-index-*.css/js | código de la herramienta, de donde salen los colores | herramienta de miniaturas |

## Assets que no se pudieron descargar (links)
- **GrokBot Banner 2x6ft.ai** (rollup en Illustrator, 18.4 MB): Slack #02_general, Ben Lang, 23 ago 2026: https://buildbotambassadors.slack.com/archives/C08K6DML04X/p1787473876897969 (es demasiado grande para el conector)
- **Archivos del logo Grok para producción local** (image.png, 11.8 MB): Walter Morales, #01_announcements, 25 ago 2026: https://buildbotambassadors.slack.com/archives/C08KBBXMS2W/p1787712083994989 (demasiado grande)
- Figma de miniaturas de Grok Bot: https://www.figma.com/design/3PcKyybEoc6SAqysnCb5HA/Grok-Bot-thumbnails--temp-
- Generador de miniaturas: https://grok-bot-thumbnail-tool.vercel.app/
- Slides de Grok Bot del equipo: están en la página Grok Bot assets y **piden acceso con aprobación previa** (pedilo con tiempo)
- Logos SpaceXSI/Grok (uso como usuario, sin modificar): https://x.ai/legal/brand-guidelines
- Figma de Cursor (para eventos Cursor, no Grok Bot): https://www.figma.com/design/dR7pVwUJqo61cIBqhgzOjB/Shared---Cursor-Ambassador-assets
- Marca Cursor: https://cursor.com/brand
- Herramientas de la comunidad (no oficiales): video de evento https://grokbot-event-video.osamaakhtar5051.workers.dev/ , fondo virtual https://grok-bot-virtual-background.vercel.app , fotos xaievents.vercel.app , slides de ejemplo https://lfrc.me/slides/grok-bot-siem-reap ; marco de fotos de Rasal Jayasinghe en #08_tooling (20 oct 2026)
- No se encontró ningún press kit oficial, mascota definida aparte de los personajes "bots", ni animación SVG oficial (alguien la pidió en #06_events-help y no hubo respuesta pública).

## Reglas de marca y comunicación
Anuncio de Ben Lang, #01_announcements, 2 nov 2026: https://buildbotambassadors.slack.com/archives/C08KBBXMS2W/p1793644907900379
**Sí:** decir que sos "part of the SpaceXSI Community" con tu rol ("Build ambassador" / "Bot ambassador"). Escribir los nombres como **Grok Bot**, **Cursor** y **SpaceXSI Community**. Usar la imagen social que viene en las guías.
**No:** llamarte "SpaceXSI ambassador" o "SpaceX ambassador", ni decir que representás a la empresa. Poner SpaceX o SpaceXSI como empleador en LinkedIn. Mencionar SpaceX, usar "SpaceXAI" o comentar noticias de la empresa. **Hacer imágenes propias con logos o marca de SpaceX/SpaceXSI.** Compartir información no pública. **Llamar "official" a eventos o contenido.**
Prensa: avisá en #07_ambassador-help antes de aceptar entrevistas. Si rompés las guías, te sacan del programa.
Otras reglas (Ambassador Support, oct 2026):
- Los eventos Grok Bot siguen las SpaceXAI Community Brand Guidelines con la fuente Universal Sans. Si hacés tu propio material, tiene que respetar esas guías y assets.
- Cualquier artículo de marca que se produzca localmente (stickers, banner, camisetas) necesita una muestra o prueba aprobada por Ben Lang antes de producirlo. Se paga del presupuesto del evento.
- Las miniaturas de eventos Grok Bot se hacen con el generador oficial.
- En el caso de Convex se pidió mantener a Cursor como marca principal y usar el formato de partner del Event guide. Pradipta Shrestha preguntó (2 nov 2026) si se pueden poner logos de sponsors en las gráficas de Luma, y en lo revisado no hubo respuesta pública.
- x.ai/legal/brand-guidelines: usar las marcas solo para referirse a SpaceXSI o Grok con precisión, usar los logos sin alterarlos, no insinuar que hay respaldo oficial, no ponerlas en dominios ni en nombres de productos, y no agregar nada junto a la marca que parezca una marca nueva.
- Ben Lang sobre Cursor (abr 2026): no usar colores arcoíris y usar el logo estático con fondo transparente.

## Vacíos y dudas
1. No hay paleta oficial con hex. Revisar la página de Brand Guidelines en Notion.
2. No está clara la licencia ni la descarga oficial de Universal Sans.
3. Los logos oficiales y el rollup grande hay que bajarlos a mano desde Notion o Slack.
4. Hay que ver si el "cube" o la marca Grok cuenta como "SpaceXSI branding" que no se puede usar en imágenes propias. Conviene preguntar en #07_ambassador-help antes de ponerlo en el site.
5. No hay que poner "official" en el site.
