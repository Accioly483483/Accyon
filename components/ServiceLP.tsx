import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./Button";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { NodeMark } from "./NodeMark";
import { LeadForm } from "./LeadForm";
import { JsonLd } from "./JsonLd";
import type { ServiceCopy } from "@/content/servicos";
import { graph, serviceNode, faqPageNode, breadcrumbNode } from "@/lib/schema";

export function ServiceLP({ data }: { data: ServiceCopy }) {
  const path = `/${data.slug}`;
  return (
    <>
      <JsonLd
        data={graph([
          serviceNode(data),
          faqPageNode(data.faq, path),
          breadcrumbNode(
            [
              { name: "Início", path: "/" },
              { name: data.nav, path },
            ],
            path,
          ),
        ])}
      />
      {/* Hero */}
      <section className="pb-section pt-14 md:pt-20">
        <Container>
          <p className="mono mb-8 flex items-center gap-2 text-eyebrow uppercase text-ink-2">
            <Link href="/" className="transition-colors hover:text-ink">
              Início
            </Link>
            <span aria-hidden>·</span>
            <span className="text-ink">{data.nav}</span>
          </p>
          <div className="flex items-start gap-4">
            <NodeMark size={28} className="mt-2 hidden flex-none sm:block" />
            <div className="max-w-[46rem]">
              <h1 className="text-titulo font-medium text-ink">{data.h1}</h1>
              <p className="mt-6 max-w-measure text-corpo text-ink-2">
                {data.abertura}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href="#formulario" variant="primary" arrow>
                  Solicitar análise da operação
                </Button>
                <Button href="#como-funciona" variant="ghost">
                  Como funciona
                </Button>
              </div>
              <p className="mono mt-6 text-legenda text-ink-2">
                Projeto sob medida · Implementação em 2 a 4 semanas
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Quando você precisa disso */}
      <Section title="Quando você precisa disso" surface>
        <Reveal as="ul" className="max-w-measure space-y-4">
          {data.quando.map((q) => (
            <li key={q} className="flex gap-4 text-corpo text-ink">
              <span aria-hidden className="mt-4 block h-px w-6 flex-none bg-line-2" />
              <span>{q}</span>
            </li>
          ))}
        </Reveal>
      </Section>

      {/* A ordem escondida */}
      <Section title={data.ordemTitulo}>
        <p className="max-w-measure text-corpo text-ink-2">{data.ordemTexto}</p>
      </Section>

      {/* O que a Accyon entrega */}
      <Section title="O que a Accyon entrega" surface>
        <Reveal as="ul" className="divide-y divide-line border-y border-line">
          {data.entrega.map((d) => (
            <li key={d.label} className="py-6 text-corpo text-ink-2">
              <span className="text-ink">{d.label}.</span> {d.text}
            </li>
          ))}
        </Reveal>
      </Section>

      {/* Como funciona */}
      <Section
        id="como-funciona"
        eyebrow="Como funciona"
        title="Entender. Mapear. Estruturar. Construir. Entregar."
      >
        <Reveal as="ol" className="border-t border-line">
          {data.comoFunciona.map((line, i) => {
            const [verbo, ...rest] = line.split(". ");
            return (
              <li
                key={line}
                className="grid gap-4 border-b border-line py-6 md:grid-cols-[4rem_1fr]"
              >
                <span className="mono text-legenda text-ink-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="max-w-measure text-corpo text-ink-2">
                  <span className="text-ink">{verbo}.</span> {rest.join(". ")}
                </p>
              </li>
            );
          })}
        </Reveal>
      </Section>

      {/* Ferramentas / Investimento / Prazo / Para quem não é */}
      <Section title="Ferramentas, investimento e prazo" surface>
        <div className="grid gap-10 md:grid-cols-3">
          <Bloco titulo="Ferramentas" texto={data.ferramentas} />
          <Bloco titulo="Investimento" texto={data.investimento} />
          <Bloco titulo="Prazo" texto={data.prazo} />
        </div>
        <p className="mt-12 max-w-measure text-subtitulo text-ink">
          {data.paraQuemNao}
        </p>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Perguntas" title="Perguntas frequentes">
        <div className="border-t border-line">
          {data.faq.map(([q, a]) => (
            <details key={q} className="group border-b border-line py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-corpo text-ink [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  aria-hidden
                  className="mono flex-none text-ink-2 transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-measure text-corpo text-ink-2">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* CTA + formulário */}
      <Section id="formulario" eyebrow="Próxima etapa" title={data.ctaTitulo} surface>
        <p className="max-w-measure text-corpo text-ink-2">
          Conte para a Accyon como sua empresa funciona hoje. A primeira etapa não
          é contratar. É entender.
        </p>
        <div className="mt-12 border border-line bg-bg p-6 md:p-10">
          <p className="text-subtitulo text-ink">
            Conte um pouco sobre sua operação.
          </p>
          <p className="mb-10 mt-3 max-w-measure text-corpo text-ink-2">
            Não precisamos de uma apresentação formal. Queremos entender onde sua
            operação está hoje e o que está impedindo seu trabalho de fluir como
            poderia.
          </p>
          <LeadForm formSlug={data.slug} />
        </div>
      </Section>
    </>
  );
}

function Bloco({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div>
      <p className="mono text-eyebrow uppercase text-ink-2">{titulo}</p>
      <p className="mt-4 text-corpo text-ink-2">{texto}</p>
    </div>
  );
}
