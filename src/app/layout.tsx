import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Eventos SpaceXSI Community Costa Rica",
    template: "%s, SpaceXSI Community Costa Rica",
  },
  description:
    "Eventos de Grok Bot y Cursor en Costa Rica. Part of the SpaceXSI Community.",
  icons: {
    icon: "/assets/logos/grokbot-favicon-thumbnailtool.svg",
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
