import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { HeroDiagram } from "@/components/HeroDiagram";
import { LeadForm } from "@/components/LeadForm";
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
      <MudancaDePerspectiva />
      <OrdemEscondida />
      <Infraestrutura />
      <Frentes />
      <ComoFunciona />
      <Diferencial />
      <AntesDepois />
      <ParaQuem />
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
    <section className="relative pb-section pt-16 md:pt-24">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-8">
          <div className="max-w-[46rem]">
            <Eyebrow>Infraestrutura operacional e comercial</Eyebrow>
            <h1 className="mt-6 text-titulo font-medium text-ink">
              Sua empresa já funciona. Mas ela poderia funcionar muito melhor.
            </h1>
            <p className="mt-6 max-w-measure text-corpo text-ink-2">
              A Accyon encontra onde sua operação perde velocidade e constrói a
              estrutura necessária para conectar pessoas, processos e tecnologia.
            </p>
            <p className="mt-4 max-w-measure text-corpo text-ink-2">
              Menos trabalho manual. Mais clareza sobre o que acontece. Uma
              operação que não depende de você para cada movimento.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/contato" variant="primary" arrow>
                Solicitar análise da operação
              </Button>
              <Button href="/#como-funciona" variant="ghost">
                Entender como funciona
              </Button>
            </div>
            <p className="mono mt-6 text-legenda text-ink-2">
              Projetos sob medida · Implementação em 2 a 4 semanas
            </p>
          </div>

          <div className="hidden justify-center sm:flex">
            <HeroDiagram />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ========================== PROBLEMA (§07) ========================== */
const SINAIS = [
  "Cliente manda mensagem e ninguém sabe quem deveria responder.",
  "O follow-up fica para depois.",
  "Uma tarefa precisa ser lembrada.",
  "A informação está na planilha de alguém.",
  "A equipe pergunta aquilo que deveria estar claro.",
  "Você precisa cobrar para descobrir se algo foi feito.",
  "“Deixa que eu vejo.”",
];

function Problema() {
  return (
    <Section
      title="Sua empresa não está parada. Ela está presa em pequenas coisas."
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
        Nada disso parece grave sozinho. O problema é quando acontece todos os
        dias.
      </p>
      <Reveal>
        <p className="mt-12 max-w-[34ch] text-subtitulo text-ink">
          O problema não é falta de esforço. É falta de estrutura.
        </p>
      </Reveal>
    </Section>
  );
}

/* ================== MUDANÇA DE PERSPECTIVA (§08) =================== */
const FERRAMENTAS = [
  "WhatsApp",
  "Planilha",
  "CRM",
  "E-mail",
  "Financeiro",
  "Instagram",
  "Marketing",
  "IA",
];

function MudancaDePerspectiva() {
  return (
    <Section title="Talvez você não precise de mais uma ferramenta.">
      <div className="flex flex-wrap gap-3">
        {FERRAMENTAS.map((f) => (
          <span
            key={f}
            className="mono border border-line-2 px-3 py-2 text-legenda uppercase tracking-[0.14em] text-ink-2"
          >
            {f}
          </span>
        ))}
      </div>
      <p className="mt-10 max-w-[38ch] text-subtitulo text-ink">
        Ferramentas diferentes não significam uma operação integrada.
      </p>
      <p className="mt-8 max-w-measure text-corpo text-ink-2">
        É possível ter WhatsApp, planilhas, CRM, financeiro, marketing,
        automações e inteligência artificial, e ainda assim depender de pessoas
        lembrando o que fazer. A Accyon começa pelo funcionamento da empresa. Não
        pela ferramenta.
      </p>
    </Section>
  );
}

/* ===================== ORDEM ESCONDIDA (§09) ====================== */
function OrdemEscondida() {
  return (
    <Section title="Toda operação tem uma ordem. Nós encontramos a sua." surface>
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
const CAMADAS = [
  ["01", "Organizar", "Processos, responsabilidades e fluxos."],
  ["02", "Conectar", "Sistemas, ferramentas e informações."],
  ["03", "Automatizar", "Tarefas repetitivas e movimentos previsíveis."],
  ["04", "Enxergar", "Dados, indicadores e dashboards."],
  ["05", "Inteligência", "IA aplicada onde realmente existe uma oportunidade."],
];

function Infraestrutura() {
  return (
    <Section
      id="infraestrutura"
      eyebrow="Infraestrutura"
      title="A infraestrutura que sua operação precisa."
    >
      <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
        <p className="text-display font-medium leading-none text-ink">Operação</p>
        <Reveal as="ul" className="divide-y divide-line border-y border-line">
          {CAMADAS.map(([n, nome, desc]) => (
            <li key={n} className="flex gap-6 py-6">
              <span className="mono text-legenda text-ink-2">{n}</span>
              <div>
                <p className="text-subtitulo text-ink">{nome}</p>
                <p className="mt-1 text-corpo text-ink-2">{desc}</p>
              </div>
            </li>
          ))}
        </Reveal>
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
      eyebrow="Frentes de trabalho"
      title="A infraestrutura entra por onde a operação mais precisa."
    >
      <ul className="divide-y divide-line border-y border-line">
        {SERVICOS.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/${s.slug}`}
              className="group grid gap-2 py-6 transition-colors md:grid-cols-[16rem_1fr] md:gap-8"
            >
              <span className="text-subtitulo text-ink transition-colors group-hover:text-sinal">
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
          <li
            key={e.n}
            className="grid gap-4 border-b border-line py-8 md:grid-cols-[4rem_1fr]"
          >
            <span className="mono text-legenda text-ink-2">{e.n}</span>
            <div className="max-w-measure">
              <p className="text-subtitulo text-ink">{e.nome}</p>
              <p className="mt-2 text-corpo text-ink-2">{e.texto}</p>
              {e.itens && (
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {e.itens.map((it) => (
                    <li key={it} className="text-corpo text-ink-2">
                      {it}
                    </li>
                  ))}
                </ul>
              )}
              {e.fecho && (
                <p className="mt-4 text-corpo text-ink">{e.fecho}</p>
              )}
            </div>
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

/* ===================== DIFERENCIAL (§12) ====================== */
const PERGUNTAS_DIF = [
  "Como o trabalho acontece?",
  "Quem participa?",
  "Onde a informação nasce?",
  "Onde ela deveria chegar?",
  "Onde o processo para?",
  "O que depende de alguém lembrar?",
  "O que poderia acontecer sozinho?",
  "O que precisa continuar sendo humano?",
];

function Diferencial() {
  return (
    <Section title="Não começamos pela ferramenta.">
      <p className="max-w-measure text-corpo text-ink-2">
        É fácil começar por um CRM. É fácil começar por uma automação. É fácil
        começar por uma integração. Difícil é saber se aquilo resolve o problema
        certo. A Accyon começa pela empresa. Perguntamos:
      </p>
      <ul className="mt-6 max-w-measure space-y-3">
        {PERGUNTAS_DIF.map((p) => (
          <li key={p} className="text-corpo text-ink">
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-measure text-corpo text-ink-2">
        Só então decidimos o que construir.
      </p>
      <Reveal>
        <p className="mt-16 text-titulo font-medium leading-tight text-ink-2">
          Não começamos pela ferramenta.
          <br />
          <span className="text-ink">Começamos pela empresa.</span>
        </p>
      </Reveal>
    </Section>
  );
}

/* ===================== ANTES x DEPOIS (§13) ====================== */
const ANTES = [
  "Informação espalhada.",
  "Cada pessoa trabalha de um jeito.",
  "Follow-up depende da memória.",
  "Equipe precisa ser cobrada.",
  "Tarefas repetitivas consomem tempo.",
  "Sistemas não conversam.",
  "O dono entra em tudo.",
];
const DEPOIS = [
  "Processos possuem caminhos claros.",
  "Responsabilidades ficam definidas.",
  "Informação chega às pessoas certas.",
  "Follow-ups seguem fluxos.",
  "Tarefas repetitivas podem ser automatizadas.",
  "Sistemas trabalham conectados.",
  "Gestão consegue enxergar a operação.",
  "O dono não precisa estar em cada movimento.",
];

function AntesDepois() {
  return (
    <Section title="Quando a operação muda, o trabalho muda." surface>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="mono text-eyebrow uppercase text-ink-2">Antes</p>
          <ul className="mt-5 space-y-3 text-corpo text-ink-2">
            {ANTES.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mono text-eyebrow uppercase text-sinal">Depois</p>
          <ul className="mt-5 space-y-3 text-corpo text-ink">
            {DEPOIS.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-12 max-w-measure text-corpo text-ink-2">
        Não é sobre fazer mais. É sobre fazer o trabalho exigir menos esforço
        desnecessário.
      </p>
    </Section>
  );
}

/* ====================== PARA QUEM É (§14) ======================= */
const SITUACOES = [
  "Mais volume, mas ainda tudo manual.",
  "Mais pessoas, mas responsabilidades pouco claras.",
  "Mais ferramentas, mas informações espalhadas.",
  "Mais clientes, mas follow-up dependendo da memória.",
  "Empresa crescendo, mas o dono continua no centro de tudo.",
];

function ParaQuem() {
  return (
    <Section
      id="para-quem"
      title="Para empresas que cresceram mais rápido do que a própria operação."
    >
      <p className="max-w-measure text-corpo text-ink-2">
        Você já tem clientes, equipe, processos e ferramentas. Mas a estrutura
        ainda não acompanha o tamanho do negócio.
      </p>
      <ul className="mt-8 max-w-measure space-y-4">
        {SITUACOES.map((s) => (
          <li key={s} className="flex gap-4 text-corpo text-ink">
            <span aria-hidden className="mt-4 block h-px w-6 flex-none bg-line-2" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
      <p className="mt-10 max-w-[40ch] text-subtitulo text-ink">
        O que poderia acontecer sem precisar depender de você?
      </p>
    </Section>
  );
}

/* ================== O QUE É A ACCYON (§24, GEO) ================== */
function OQueEAccyon() {
  return (
    <Section title="O que é a Accyon?" surface>
      <div className="max-w-measure space-y-4 text-corpo text-ink-2">
        <p>
          A Accyon é uma empresa brasileira de infraestrutura operacional e
          comercial que ajuda pequenas e médias empresas a organizar, conectar e
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
];

function Autoridade() {
  return (
    <Section title="Uma operação melhor começa com perguntas melhores.">
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
      <div className="mt-10 max-w-measure space-y-2 text-corpo text-ink-2">
        <p>Não automatizamos por automatizar.</p>
        <p>Não trocamos ferramentas por trocar.</p>
        <p>Não complicamos o que pode ser simples.</p>
        <p className="text-ink">Entendemos primeiro. Construímos depois.</p>
        <p>E entregamos aquilo que a operação realmente precisa.</p>
      </div>
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
      title="Onde sua operação está perdendo velocidade?"
    >
      <p className="max-w-measure text-corpo text-ink-2">
        Conte para a Accyon como sua empresa funciona hoje. Vamos entender onde
        existem gargalos e avaliar o que pode ser organizado, conectado ou
        automatizado.
      </p>
      <p className="mt-8 max-w-[36ch] text-subtitulo text-ink">
        A primeira etapa não é contratar. É entender.
      </p>

      <div className="mt-12 border border-line p-6 md:p-10">
        <p className="text-subtitulo text-ink">
          Conte um pouco sobre sua operação.
        </p>
        <p className="mb-10 mt-3 max-w-measure text-corpo text-ink-2">
          Não precisamos de uma apresentação formal. Queremos entender onde sua
          operação está hoje e o que está impedindo seu trabalho de fluir como
          poderia.
        </p>
        <LeadForm formSlug="home" />
        <p className="mono mt-8 text-legenda text-ink-2">
          Projeto sob medida · Implementação em 2 a 4 semanas
        </p>
      </div>
    </Section>
  );
}
