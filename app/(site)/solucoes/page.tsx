import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { SolucaoCard } from "@/components/SolucaoCard";
import { JsonLd } from "@/components/JsonLd";
import { SOLUCOES } from "@/content/solucoes";
import { graph, webPageNode, breadcrumbNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Soluções | Accyon" },
  description:
    "Ecossistemas comerciais, CRMs e painéis sob medida, dashboards, automações, disparos de WhatsApp e agentes de IA. Veja como a Accyon organiza sua operação.",
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
      {/* Cards numerados (visual do "Nosso processo"); texto de cada um em pop-up. */}
      <Section
        eyebrow="Soluções"
        title={
          <>
            Tudo o que sua operação precisa para{" "}
            <span className="text-sinal">funcionar melhor</span>.
          </>
        }
        intro="Da estrutura de vendas às automações do dia a dia: ferramentas e processos que fazem sua empresa ganhar clareza, velocidade e autonomia."
      >
        <Reveal as="ol" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SOLUCOES.map((s, i) => (
            <SolucaoCard key={s.slug} s={s} n={i + 1} />
          ))}
        </Reveal>
      </Section>
    </>
  );
}
