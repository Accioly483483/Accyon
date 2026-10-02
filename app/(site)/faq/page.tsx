import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { FAQ } from "@/content/home";
import { graph, faqPageNode, breadcrumbNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Perguntas frequentes | Accyon" },
  description:
    "Respostas diretas sobre como a Accyon trabalha: o que a empresa faz, ferramentas, duração e personalização dos projetos.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Perguntas frequentes | Accyon",
    description:
      "Respostas diretas sobre como a Accyon trabalha: o que a empresa faz, ferramentas, duração e personalização dos projetos.",
    url: "/faq",
  },
};

export default function Faq() {
  return (
    <>
      <JsonLd
        data={graph([
          faqPageNode(FAQ as [string, string][], "/faq"),
          breadcrumbNode(
            [
              { name: "Início", path: "/" },
              { name: "FAQ", path: "/faq" },
            ],
            "/faq",
          ),
        ])}
      />
      <Section eyebrow="Perguntas" title="Perguntas frequentes">
        <div className="border-t border-line">
          {FAQ.map(([q, a]) => (
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
      <Autoridade />
    </>
  );
}

/* ====================== AUTORIDADE (§15) ======================= */
const PERGUNTAS_AUT = [
  "Como o cliente chega?",
  "Quem recebe?",
  "O que acontece depois?",
  "Onde a informação é registrada?",
  "Quem precisa agir?",
  "O que faz esse processo parar?",
  "O que ainda depende de alguém lembrar?",
  "O que poderia acontecer sozinho?",
  "O que precisa continuar sendo humano?",
  "Qual o volume / a entrada / ganhos / perdas (?)",
];

function Autoridade() {
  return (
    <Section
      title={
        <>
          Uma operação melhor começa com{" "}
          <span className="text-sinal">perguntas melhores</span>.
        </>
      }
      surface
    >
      <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
        {PERGUNTAS_AUT.map((p) => (
          <li
            key={p}
            className="border border-line px-4 py-3 text-corpo text-ink"
          >
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-10 max-w-measure text-corpo text-ink">
        Entendemos primeiro. Construímos depois.
      </p>
    </Section>
  );
}
