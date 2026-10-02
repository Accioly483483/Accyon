import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { graph, webPageNode, breadcrumbNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Quem somos | Accyon" },
  description:
    "A Accyon é uma empresa brasileira de infraestrutura operacional e comercial que ajuda empreendedores e empresas a organizar, conectar e automatizar suas operações.",
  alternates: { canonical: "/quem-somos" },
  openGraph: {
    title: "Quem somos | Accyon",
    description:
      "Empresa brasileira de infraestrutura operacional e comercial: processos, CRM, automações, integrações, inteligência artificial, dados e sistemas.",
    url: "/quem-somos",
  },
};

export default function QuemSomos() {
  return (
    <>
      <JsonLd
        data={graph([
          webPageNode(
            "/quem-somos",
            "Quem somos | Accyon",
            "O que é a Accyon, empresa brasileira de infraestrutura operacional e comercial.",
          ),
          breadcrumbNode(
            [
              { name: "Início", path: "/" },
              { name: "Quem somos", path: "/quem-somos" },
            ],
            "/quem-somos",
          ),
        ])}
      />
      <Section
        eyebrow="Quem somos"
        title={
          <>
            O que é a{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/accyon-wordmark.png"
              alt="Accyon"
              className="inline-block h-[0.7em] w-auto align-baseline"
            />
            ?
          </>
        }
      >
        <div className="max-w-measure space-y-4 text-corpo text-ink-2">
          <p>
            A Accyon é uma empresa brasileira de infraestrutura operacional e
            comercial que ajuda empreendedores e empresas a organizar, conectar e
            automatizar suas operações.
          </p>
          <p>
            A empresa analisa como pessoas, processos e ferramentas trabalham
            atualmente, identifica gargalos e constrói estruturas sob medida
            utilizando processos, CRM, automações, integrações, inteligência
            artificial, dados e sistemas.
          </p>
          <p>
            O objetivo não é adicionar tecnologia por adicionar, mas criar uma
            operação mais clara, conectada e capaz de funcionar com menos trabalho
            manual e dependência de pessoas específicas.
          </p>
        </div>
      </Section>
    </>
  );
}
