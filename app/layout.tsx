import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// display: "swap": a fonte da marca sempre entra quando termina de baixar.
// Com "optional", a primeira visita ficava inteira na fallback (menus e botões
// sem a mono). adjustFontFallback (padrão) aproxima as métricas e segura o CLS.
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://accyon.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Accyon, infraestrutura para operações que precisam avançar",
    template: "%s | Accyon",
  },
  description:
    "A Accyon estrutura operações comerciais e empresariais conectando processos, pessoas e tecnologia. Menos trabalho manual, mais clareza, velocidade e vendas.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0D10",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // corrige o teclado virtual cobrindo o campo em mobile (sem desabilitar zoom)
  interactiveWidget: "resizes-visual",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
