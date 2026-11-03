import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://eventos-costa-rica.vercel.app";

const OG_IMAGE_PATH = "/assets/imagenes/og-community.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Eventos Grok Bot & Cursor Costa Rica",
    template: "%s | Eventos Grok Bot & Cursor Costa Rica",
  },
  description:
    "Eventos de Grok Bot y Cursor en Costa Rica. Part of the SpaceXSI Community.",
  icons: {
    icon: "/assets/logos/grokbot-favicon-thumbnailtool.svg",
  },
  openGraph: {
    title: "Eventos Grok Bot & Cursor Costa Rica",
    description:
      "Eventos de Grok Bot y Cursor en Costa Rica. Part of the SpaceXSI Community.",
    type: "website",
    locale: "es_CR",
    url: SITE_URL,
    siteName: "Eventos Grok Bot & Cursor Costa Rica",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 640,
        height: 640,
        alt: "Imagen de la SpaceXSI Community",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Eventos Grok Bot & Cursor Costa Rica",
    description:
      "Eventos de Grok Bot y Cursor en Costa Rica. Part of the SpaceXSI Community.",
    images: [OG_IMAGE_PATH],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CR">
      <body>
        <LocaleProvider>
          <Header />
          <main className="site-main">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
