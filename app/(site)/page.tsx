import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { OpenLeadModalButton } from "@/components/OpenLeadModalButton";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { InfraDiagram } from "@/components/InfraDiagram";
import { SolucoesNichosModal } from "@/components/NichosModal";
import { Pipoca } from "@/components/Pipoca";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import { graph, webPageNode } from "@/lib/schema";

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
        ])}
      />
      <Hero />
      <OrdemEscondida />
      <Problema />
      <Infraestrutura />
      <Frentes />
      <CtaEForm />
    </>
  );
}

/* ============================ HERO (§06) ============================ */
function Hero() {
  return (
    <section className="hero-video relative isolate -mt-16 flex min-h-[85svh] items-center overflow-hidden pb-16 pt-32 md:-mt-20 md:pt-36">
      {/* MP4 tem cor marcada como BT.601 (tom do player do Windows): sem a marca, o Chrome mudava o tom
          ao alternar entre overlay de hardware (parado) e composição (scroll). */}
      <video
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src="/videos/net-connect1.mp4?v=3"
        poster="/videos/net-connect1-poster.jpg?v=2"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div aria-hidden className="hero-video-overlay absolute inset-0 -z-10" />
      <Container>
        <div>
          <div className="max-w-[46rem]">
            <Eyebrow>Infraestrutura operacional e comercial</Eyebrow>
            <h1 className="mt-3 text-[clamp(2.25rem,5.2vw,4rem)] font-medium leading-[1.04] tracking-[-0.02em] text-ink">
              Sua empresa já funciona. Mas ela pode performar{" "}
              <span className="text-sinal">ainda melhor</span>.
            </h1>
            <p className="mt-4 max-w-[36rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-ink-2">
              Estruturação completa de processos operacionais e comerciais.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <OpenLeadModalButton variant="primary" arrow className="font-semibold">
                Falar com especialista
              </OpenLeadModalButton>
              <Button href="/#como-funciona" variant="ghost">
                Entender como funciona
              </Button>
            </div>
            <p className="mono mt-3 text-legenda text-ink-2">
              Projetos sob medida · Para empresas e empreendedores · Respeitando suas particularidades
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ========================== PROBLEMA (§07) ========================== */
function Problema() {
  return (
    <Section
      title={
        <>
          Sua empresa não está parada. Talvez só desacelere nas{" "}
          <span className="text-sinal">pequenas coisas</span>.
        </>
      }
    >
      <Pipoca />
      <p className="mt-6 max-w-measure text-corpo text-ink-2">
        Isoladamente não parece nada grave. Mas no decorrer dos dias fica
        perceptível.
      </p>
      <Reveal>
        <p className="mt-8 max-w-[34ch] text-subtitulo text-ink">
          O problema não é falta de esforço. É não possuir a{" "}
          <span className="text-sinal">estrutura certa</span>.
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
        Quando o caminho é claro, fica mais fácil decidir o que deve ser
        organizado, conectado ou automatizado.
      </p>

      <p className="mt-6 max-w-measure text-corpo text-ink-2">
        Clique aqui e confira nossas especialidades:
      </p>

      <div className="mt-6">
        <SolucoesNichosModal />
      </div>
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
      surface
    >
      <p className="max-w-measure text-corpo text-ink-2">
        Identificar, organizar, conectar, automatizar, visualizar e
        acompanhar. Cada etapa entra onde a operação precisa, conectada com a
        próxima.
      </p>
      <div className="mt-12">
        <InfraDiagram />
      </div>
      <p className="mt-12 max-w-measure text-corpo text-ink-2">
        A tecnologia varia. O objetivo não. Construir uma operação mais clara,
        conectada e capaz de avançar.
      </p>
    </Section>
  );
}

/* ===================== COMO FUNCIONA (processo) ===================== */
const PROCESSO = [
  { nome: "Diagnóstico", texto: "Entendemos seu negócio, desafios e objetivos." },
  { nome: "Planejamento", texto: "Criamos uma estratégia personalizada." },
  { nome: "Desenvolvimento", texto: "Colocamos tudo em prática com excelência." },
  { nome: "Entrega e Implementação", texto: "Testamos, ajustamos e colocamos on-line." },
  { nome: "Suporte contínuo", texto: "Acompanhamos, otimizamos e escalamos resultados." },
];

function Frentes() {
  return (
    <Section
      id="como-funciona"
      eyebrow="Como funciona"
      title="Nosso processo:"
    >
      <Reveal as="ol" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PROCESSO.map((p, i) => (
          <li
            key={p.nome}
            className="group border border-line bg-surface p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-sinal hover:shadow-[0_0_0_1px_var(--sinal),0_12px_40px_-12px_color-mix(in_srgb,var(--sinal)_45%,transparent)]"
          >
            <span className="mono inline-block border-b border-line-2 pb-2 pr-10 text-[2.25rem] font-semibold leading-none text-sinal transition-[border-color,padding] duration-300 ease-out group-hover:border-sinal group-hover:pr-16">
              {String(i + 1).padStart(2, "0")}.
            </span>
            <p className="mt-6 text-[1.125rem] font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-sinal">
              {p.nome}
            </p>
            <p className="mt-3 text-corpo text-ink-2">{p.texto}</p>
          </li>
        ))}
      </Reveal>
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
          Faça agora o seu{" "}
          <span className="text-sinal">trabalho fluir</span> e sua{" "}
          <span className="text-sinal">produtividade aumentar</span>.
        </>
      }
      surface
    >
      <div className="border border-line p-6 md:p-10">
        <p className="text-subtitulo text-ink">
          Conte um pouco sobre sua operação.
        </p>
        <p className="mb-10 mt-3 max-w-measure text-corpo text-ink-2">
          Queremos entender onde sua operação está hoje e o que está
          impedindo seu trabalho de fluir como poderia.
        </p>
        <OpenLeadModalButton variant="primary" arrow className="font-semibold">
          Falar com especialista
        </OpenLeadModalButton>
        <p className="mono mt-8 text-legenda text-ink-2">
          Projeto sob medida · A depender das suas particularidades
        </p>
      </div>
    </Section>
  );
}
