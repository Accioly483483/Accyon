import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // páginas de frente de trabalho retiradas do ar: 301 para a solução equivalente
  async redirects() {
    return [
      ["infraestrutura-comercial", "ecossistema-comercial-operacional"],
      ["sistemas", "desenvolvimento-de-softwares"],
      ["atendimento-automatizado", "atendimento-automatizado"],
      ["gestao-de-automacoes", "automacoes-sob-medida"],
      ["criacao-de-paginas", "sites-paginas-e-bio"],
    ].map(([de, para]) => ({
      source: `/${de}`,
      destination: `/solucoes#${para}`,
      permanent: true,
    })).concat({
      // "Quem somos" virou pop-up na Home (faixa acima do rodapé)
      source: "/quem-somos",
      destination: "/#quem-somos",
      permanent: true,
    });
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // painel e APIs nunca em cache nem em índice
        source: "/(admin|login|api)/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/admin",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/login",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
