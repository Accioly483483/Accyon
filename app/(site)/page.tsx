import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { OpenLeadModalButton } from "@/components/OpenLeadModalButton";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { HeroDiagram } from "@/components/HeroDiagram";
import { InfraDiagram } from "@/components/InfraDiagram";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import type { Metadata } from "next";
import { SERVICOS } from "@/content/servicos";
import { ETAPAS, FAQ } from "@/content/home";
import { graph, webPageNode, howToNode, faqPageNode } from "@/lib/schema";

/* Copy: "Copy - site - Accyon.docx" (blueprint da Home). Tom pela lista
   permitido/proibido do Brand Book. Sem travessão, aspas curvas. */

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Accyon, infraestrutura para operações que precisam avançar",
    description:
      "A Accyon estrutura operações comerciais e empresariais conectando processos, pessoas e tecnologia. Menos trabalho manual, mais clareza e velocidade.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={graph([
          webPageNode(
            "/",
            "Accyon, infraestrutura para operações que precisam avançar",
            "A Accyon estrutura operações comerciais e empresariais conectando processos, pessoas e tecnologia.",
          ),
          howToNode(
            "Como a Accyon estrutura uma operação",
            ETAPAS.map((e) => ({
              name: e.nome,
              text: [e.texto, e.itens?.join(", "), e.fecho]
                .filter(Boolean)
                .join(" "),
            })),
            "/",
          ),
          faqPageNode(FAQ as [string, string][], "/"),
        ])}
      />
      <Hero />
      <Problema />
      <OrdemEscondida />
      <Infraestrutura />
      <Frentes />
      <ComoFunciona />
      <OQueEAccyon />
      <Autoridade />
      <Faq />
      <CtaEForm />
    </>
  );
}

/* ============================ HERO (§06) ============================ */
function Hero() {
  return (
    <section className="relative pb-8 pt-4 md:pb-10 md:pt-6">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-[46rem]">
            <Eyebrow>Infraestrutura operacional e comercial</Eyebrow>
            <h1 className="mt-3 text-titulo font-medium text-ink">
              Sua empresa já funciona. Mas ela pode{" "}
              <span className="text-sinal">performar ainda melhor</span>.
            </h1>
            <p className="mt-3 max-w-measure text-corpo text-ink-2">
              A Accyon encontra onde sua operação perde velocidade e constrói a
              estrutura necessária para conectar pessoas, processos e tecnologia.
            </p>
            <p className="mt-2 max-w-measure text-corpo text-ink-2">
              Menos trabalho manual. Mais clareza sobre o que acontece. Uma
              operação que não depende de você para cada movimento.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <OpenLeadModalButton variant="primary" arrow>
                Falar sobre minha operação
              </OpenLeadModalButton>
              <Button href="/#como-funciona" variant="ghost">
                Entender como funciona
              </Button>
            </div>
            <p className="mono mt-3 text-legenda text-ink-2">
              Projetos sob medida · A depender das suas particularidades
            </p>
          </div>

          <div className="flex justify-center">
            <HeroDiagram />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ========================== PROBLEMA (§07) ========================== */
const SINAIS = [
  "Não dei a devolutiva no prazo.",
  "Não realizei o follow-up com o lead.",
  "Esqueci de avisar a área responsável.",
  "Esqueci de agendar a reunião / consulta.",
  "Não lancei a nota.",
  "Informação não está mais na planilha.",
  "Os dados não foram atualizados.",
  "O processo não foi seguido.",
  "Você precisa cobrar para descobrir se algo foi feito.",
];

function Problema() {
  return (
    <Section
      title={
        <>
          Sua empresa não está parada. Ela talvez desacelere nas{" "}
          <span className="text-sinal">pequenas coisas</span>.
        </>
      }
      surface
    >
      <Reveal as="ul" className="max-w-measure space-y-4">
        {SINAIS.map((s) => (
          <li key={s} className="flex gap-4 text-corpo text-ink">
            <span aria-hidden className="mt-4 block h-px w-6 flex-none bg-line-2" />
            <span>{s}</span>
          </li>
        ))}
      </Reveal>
      <p className="mt-10 max-w-measure text-corpo text-ink-2">
        Isoladamente não parece nada grave. Mas no decorrer dos dias fica
        perceptível.
      </p>
      <Reveal>
        <p className="mt-12 max-w-[34ch] text-subtitulo text-ink">
          O problema não é falta de esforço. É não possuir a estrutura certa.
        </p>
      </Reveal>
    </Section>
  );
}

/* ===================== ORDEM ESCONDIDA (§09) ====================== */
function OrdemEscondida() {
  return (
    <Section
      title={
        <>
          Toda operação tem uma <span className="text-sinal">ordem</span>.
          Nós encontramos a <span className="text-sinal">sua</span>.
        </>
      }
      surface
    >
      <p className="max-w-measure text-corpo text-ink-2">
        Toda mensagem, venda, tarefa, decisão e atendimento possui um caminho.
        Nosso trabalho é descobrir esse caminho. A Accyon conversa com as pessoas
        envolvidas na operação, entende como o trabalho realmente acontece,
        identifica gargalos, dependências, repetições e informações que se
        perdem. Depois transforma essa lógica em uma estrutura clara.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="border border-line p-6">
          <p className="mono text-eyebrow uppercase text-ink-2">Antes</p>
          <ul className="mt-4 space-y-2 text-corpo text-ink-2">
            <li>Cliente, WhatsApp, ?</li>
            <li>Planilha, ?</li>
            <li>Cobrança, ?</li>
            <li>Vendedor, ?</li>
          </ul>
        </div>
        <div className="border border-line bg-bg p-6">
          <p className="mono text-eyebrow uppercase text-sinal">Depois</p>
          <p className="mono mt-4 text-legenda leading-relaxed text-ink">
            Cliente, atendimento, informação, decisão, execução, follow-up,
            próximo movimento.
          </p>
        </div>
      </div>

      <p className="mt-10 max-w-measure text-corpo text-ink-2">
        Quando o caminho fica claro, fica muito mais fácil decidir o que deve ser
        organizado, conectado ou automatizado.
      </p>
    </Section>
  );
}

/* ==================== INFRAESTRUTURA (§10) ====================== */
function Infraestrutura() {
  return (
    <Section
      id="infraestrutura"
      eyebrow="Infraestrutura"
      title={
        <>
          A <span className="text-sinal">infraestrutura</span> que sua
          operação precisa.
        </>
      }
    >
      <p className="max-w-measure text-corpo text-ink-2">
        Organizar, conectar, automatizar, enxergar e aplicar inteligência.
        Cada camada entra onde a operação precisa, conectada com a próxima.
      </p>
      <div className="mt-12 overflow-x-auto">
        <InfraDiagram />
      </div>
      <p className="mt-12 max-w-measure text-corpo text-ink-2">
        A tecnologia varia. O objetivo não. Construir uma operação mais clara,
        conectada e capaz de avançar.
      </p>
    </Section>
  );
}

/* ==================== FRENTES DE TRABALHO ====================== */
function Frentes() {
  return (
    <Section
      id="servicos"
      eyebrow="Frentes de trabalho"
      title={
        <>
          A infraestrutura entra por onde a{" "}
          <span className="text-sinal">operação</span> mais precisa.
        </>
      }
    >
      <ul className="divide-y divide-line border-y border-line">
        {SERVICOS.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/${s.slug}`}
              className="group grid gap-2 py-5 transition-colors md:grid-cols-[15rem_1fr] md:gap-8"
            >
              <span className="whitespace-nowrap text-[1.05rem] font-medium text-ink transition-colors group-hover:text-sinal">
                {s.nav}
              </span>
              <span className="max-w-measure text-corpo text-ink-2">
                {s.resumo}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ==================== COMO FUNCIONA (§11) ====================== */
function ComoFunciona() {
  return (
    <Section
      id="como-funciona"
      eyebrow="Como funciona"
      title="Entender. Mapear. Estruturar. Construir. Entregar."
      surface
    >
      <Reveal as="ol" className="border-t border-line">
        {ETAPAS.map((e) => (
          <li key={e.n} className="border-b border-line py-4">
            <p className="text-corpo text-ink-2">
              <span className="mono mr-3 text-legenda text-ink-2">{e.n}</span>
              <span className="font-medium text-ink">{e.nome}. </span>
              {e.texto}
              {e.itens && " " + e.itens.join(", ") + "."}
              {e.fecho && " " + e.fecho}
            </p>
          </li>
        ))}
      </Reveal>
      <p className="mt-12 max-w-measure text-subtitulo text-ink">
        Não entregamos uma coleção de ferramentas. Entregamos uma operação
        estruturada.
      </p>
    </Section>
  );
}

/* ================== O QUE É A ACCYON (§24, GEO) ================== */
function OQueEAccyon() {
  return (
    <Section
      title={
        <>
          O que é a <span className="text-sinal">Accyon</span>?
        </>
      }
      surface
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

/* ========================= FAQ (§25) ========================= */
function Faq() {
  return (
    <Section eyebrow="Perguntas" title="Perguntas frequentes" surface>
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
  );
}

/* =================== CTA (§16) + FORM (§17) =================== */
function CtaEForm() {
  return (
    <Section
      id="formulario"
      eyebrow="Próxima etapa"
      title={
        <>
          Onde sua operação está perdendo{" "}
          <span className="text-sinal">velocidade</span>?
        </>
      }
    >
      <p className="max-w-measure text-corpo text-ink-2">
        Conte para a Accyon como sua empresa funciona hoje. Vamos entender onde
        existem gargalos e avaliar o que pode ser organizado, conectado ou
        automatizado.
      </p>
      <div className="mt-12 border border-line p-6 md:p-10">
        <p className="text-subtitulo text-ink">
          Conte um pouco sobre sua operação.
        </p>
        <p className="mb-10 mt-3 max-w-measure text-corpo text-ink-2">
          Queremos entender onde sua operação está hoje e o que está
          impedindo seu trabalho de fluir como poderia.
        </p>
        <OpenLeadModalButton variant="primary" arrow>
          Falar sobre minha operação
        </OpenLeadModalButton>
        <p className="mono mt-8 text-legenda text-ink-2">
          Projeto sob medida · A depender das suas particularidades
        </p>
      </div>
    </Section>
  );
}
