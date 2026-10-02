import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { OpenLeadModalButton } from "@/components/OpenLeadModalButton";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { InfraDiagram } from "@/components/InfraDiagram";
import { NichosModal } from "@/components/NichosModal";
import { Pipoca } from "@/components/Pipoca";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import type { Metadata } from "next";
import { SERVICOS } from "@/content/servicos";
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
      <Problema />
      <OrdemEscondida />
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
      surface
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
    >
      <p className="max-w-measure text-corpo text-ink-2">
        Quando o caminho fica claro, fica muito mais fácil decidir o que deve ser
        organizado, conectado ou automatizado.
      </p>

      <p className="mt-6 max-w-measure text-corpo text-ink-2">
        Clique aqui e confira se algum desses nichos se assemelha a sua
        operação:
      </p>

      <div className="mt-6">
        <NichosModal />
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

/* ============== FRENTES DE TRABALHO (Como funciona) ============== */
function Frentes() {
  return (
    <Section
      id="como-funciona"
      eyebrow="Como funciona"
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
