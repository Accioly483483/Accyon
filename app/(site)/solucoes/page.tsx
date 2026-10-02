import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { SOLUCOES } from "@/content/solucoes";
import { graph, webPageNode, breadcrumbNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Soluções | Accyon" },
  description:
    "Ecossistemas comerciais e operacionais, softwares sob medida, dashboards, sites, automações, atendimento automatizado, disparos e assistentes de IA.",
  alternates: { canonical: "/solucoes" },
  openGraph: {
    title: "Soluções | Accyon",
    description:
      "As soluções que a Accyon constrói para organizar, conectar e automatizar operações.",
    url: "/solucoes",
  },
};

export default function Solucoes() {
  return (
    <>
      <JsonLd
        data={graph([
          webPageNode("/solucoes", "Soluções | Accyon", "As soluções que a Accyon constrói."),
          breadcrumbNode(
            [
              { name: "Início", path: "/" },
              { name: "Soluções", path: "/solucoes" },
            ],
            "/solucoes",
          ),
        ])}
      />
      <Section eyebrow="Soluções" title="O que a Accyon constrói.">
        <nav aria-label="Soluções">
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {SOLUCOES.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="text-corpo text-ink-2 transition-colors hover:text-sinal">
                  {s.nome}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {SOLUCOES.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          className={`scroll-mt-24 border-t border-line py-16 md:py-20 ${i % 2 === 0 ? "bg-surface" : ""}`}
        >
          <div className="container-accyon">
            <p className="mono text-legenda text-sinal">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-3 max-w-measure text-subtitulo font-medium text-ink">{s.nome}</h2>
            {/* TODO(usuário): texto detalhado desta solução */}
            <p className="mt-4 max-w-measure text-corpo text-ink-2">[Texto a definir]</p>
          </div>
        </section>
      ))}
    </>
  );
}
