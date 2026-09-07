import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { GLOSSARIO } from "@/content/glossario";
import { graph, definedTermSetNode, breadcrumbNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Glossário de automação e infraestrutura operacional | Accyon" },
  description:
    "O que significam infraestrutura operacional, automação de processos, CRM, integração de sistemas, follow-up, régua de contato e outros termos que a Accyon usa.",
  alternates: { canonical: "/glossario" },
  openGraph: {
    title: "Glossário de automação e infraestrutura operacional | Accyon",
    description:
      "Definições diretas dos termos que a Accyon usa: infraestrutura operacional, automação de processos, CRM, integração de sistemas e mais.",
    url: "/glossario",
  },
};

export default function Glossario() {
  return (
    <>
      <JsonLd
        data={graph([
          definedTermSetNode(GLOSSARIO),
          breadcrumbNode(
            [
              { name: "Início", path: "/" },
              { name: "Glossário", path: "/glossario" },
            ],
            "/glossario",
          ),
        ])}
      />
    <Section eyebrow="Glossário" title="Os termos que a Accyon usa, sem rodeio.">
      <p className="max-w-measure text-corpo text-ink-2">
        Definições diretas dos conceitos que aparecem ao longo do site. Cada um
        explicado pelo que é, não pelo que promete.
      </p>

      <dl className="mt-12 divide-y divide-line border-y border-line">
        {GLOSSARIO.map((v) => (
          <div key={v.slug} id={v.slug} className="scroll-mt-24 py-8">
            <dt className="text-subtitulo text-ink">{v.termo}</dt>
            <dd className="mt-2 max-w-measure text-corpo text-ink-2">
              {v.definicao}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
    </>
  );
}
