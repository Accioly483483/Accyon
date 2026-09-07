/* Dados da Home reaproveitados pelo schema (HowTo, FAQPage). Ficam fora do
   page.tsx porque o Next 15 não permite export nomeado arbitrário em page. */

export interface Etapa {
  n: string;
  nome: string;
  texto: string;
  itens?: string[];
  fecho?: string;
}

export const ETAPAS: Etapa[] = [
  {
    n: "01",
    nome: "Entender",
    texto:
      "Conversamos com as pessoas que fazem a operação acontecer. Entendemos como o trabalho realmente é feito, e não como deveria ser feito no papel.",
  },
  {
    n: "02",
    nome: "Mapear",
    texto: "Tornamos a operação visível. Identificamos:",
    itens: [
      "gargalos",
      "tarefas repetitivas",
      "dependências",
      "informações perdidas",
      "etapas desnecessárias",
      "decisões",
      "oportunidades de automação",
    ],
  },
  {
    n: "03",
    nome: "Estruturar",
    texto: "Desenhamos como a operação deveria funcionar. Definimos:",
    itens: [
      "o que acontece",
      "quem faz",
      "quando acontece",
      "qual informação é necessária",
      "qual é o próximo movimento",
    ],
    fecho: "Primeiro a lógica. Depois a ferramenta.",
  },
  {
    n: "04",
    nome: "Construir",
    texto: "Implementamos aquilo que a operação realmente precisa:",
    itens: [
      "CRM",
      "automações",
      "integrações",
      "dashboards",
      "sistemas",
      "IA",
      "fluxos de atendimento",
      "processos digitais",
    ],
  },
  {
    n: "05",
    nome: "Entregar",
    texto:
      "A estrutura passa a fazer parte da rotina. A equipe sabe o que fazer. A informação chega a quem precisa. Tarefas repetitivas podem acontecer automaticamente. A gestão consegue enxergar melhor a operação.",
  },
];

export const FAQ: [string, string][] = [
  [
    "O que a Accyon faz?",
    "A Accyon estrutura operações comerciais e empresariais, organizando processos e construindo CRM, automações, integrações, dashboards e sistemas sob medida.",
  ],
  [
    "A Accyon é uma empresa de automação?",
    "Automação faz parte do trabalho da Accyon, mas não é o ponto de partida. A empresa primeiro entende a operação e depois define quais processos devem ser organizados, conectados ou automatizados.",
  ],
  [
    "A Accyon trabalha com quais ferramentas?",
    "A ferramenta depende da necessidade da operação. A Accyon trabalha com diferentes sistemas, CRMs, plataformas de automação, integrações, dados e soluções de inteligência artificial.",
  ],
  [
    "Preciso trocar os sistemas que minha empresa já utiliza?",
    "Não necessariamente. A estrutura existente é considerada matéria-prima do projeto. A substituição de ferramentas só deve acontecer quando fizer sentido para a operação.",
  ],
  [
    "Quanto tempo dura um projeto?",
    "Os projetos são personalizados e normalmente possuem implementação estimada entre 2 e 4 semanas, dependendo do escopo.",
  ],
  [
    "A Accyon atende pequenas empresas?",
    "Sim. O foco inclui empresas que já possuem uma operação em funcionamento, mas precisam organizar processos, reduzir trabalho manual e ganhar mais clareza.",
  ],
  [
    "A Accyon trabalha com inteligência artificial?",
    "Sim, quando a inteligência artificial resolve uma necessidade real da operação. IA não é adicionada apenas por ser uma tecnologia disponível.",
  ],
  [
    "O projeto é personalizado?",
    "Sim. Cada projeto começa pela compreensão da operação específica da empresa.",
  ],
];
