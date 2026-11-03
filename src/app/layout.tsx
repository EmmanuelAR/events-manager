import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://events-manager-ten.vercel.app";

const OG_IMAGE_PATH = "/assets/imagenes/og-community.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Eventos SpaceXSI Community Costa Rica",
    template: "%s | SpaceXSI Community Costa Rica",
  },
  description:
    "Eventos de Grok Bot y Cursor en Costa Rica. Part of the SpaceXSI Community.",
  icons: {
    icon: "/assets/logos/grokbot-favicon-thumbnailtool.svg",
  },
  openGraph: {
    title: "Eventos SpaceXSI Community Costa Rica",
    description:
      "Eventos de Grok Bot y Cursor en Costa Rica. Part of the SpaceXSI Community.",
    type: "website",
    locale: "es_CR",
    url: SITE_URL,
    siteName: "SpaceXSI Community Costa Rica",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 640,
        height: 640,
        alt: "Logo de la comunidad SpaceXSI Costa Rica",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Eventos SpaceXSI Community Costa Rica",
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
        </LocaleProvider>
      </body>
    </html>
  );
}
