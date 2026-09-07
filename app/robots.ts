import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://accyon.com.br";

// Robôs de IA de recuperação/citação (trazem tráfego e menção) + robôs de treino.
// Decisão: permitir. Bytespider bloqueado. Revalidar nomes a cada trimestre.
const IA_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Claude-User",
  "Claude-SearchBot",
  "Amazonbot",
  "Applebot-Extended",
  "GPTBot",
  "ClaudeBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/style-guide"],
      },
      ...IA_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
      { userAgent: "Bytespider", disallow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
