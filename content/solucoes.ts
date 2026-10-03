/* Soluções da Accyon. Fonte única: modal "Soluções e nichos" (Home), página
   /solucoes (cada item vira uma seção com âncora #slug) e llms.txt/llms-full.txt.
   `textos`: parágrafos da seção; o primeiro é o destaque. */

export interface Solucao {
  slug: string;
  nome: string;
  textos: string[];
}

export const SOLUCOES: Solucao[] = [
  {
    slug: "ecossistema-comercial-operacional",
    nome: "Construção de Ecossistemas Comerciais e Operacionais",
    textos: [
      "Estrutura que conecta processos, pessoas, informações e tecnologia para sua operação funcionar de forma mais organizada.",
      "Do processo ao fluxo. Da rotina à estrutura.",
    ],
  },
  {
    slug: "desenvolvimento-de-softwares",
    nome: "CRMs, Ferramentas e Painéis Sob Medida",
    textos: [
      "Ferramentas que sua operação precisa quando as soluções prontas não acompanham sua realidade.",
      "CRMs personalizados, painéis de vendas e estoque e ferramentas desenvolvidas para o seu processo.",
    ],
  },
  {
    slug: "dashboards",
    nome: "Dashboards e Acompanhamento de Dados",
    textos: [
      "Dados que eram espalhados, agora, em uma visão clara da operação.",
      "Acompanhe vendas, estoque, desempenho e indicadores sem precisar procurar informações em vários lugares.",
    ],
  },
  {
    slug: "automacoes-sob-medida",
    nome: "Automações Sob Medida",
    textos: [
      "Tarefas e processos que não deveriam depender de alguém lembrar, conferir ou executar manualmente.",
      "Menos tarefas repetitivas. Mais tempo para o que realmente precisa de pessoas.",
    ],
  },
  {
    slug: "atendimento-automatizado",
    nome: "Atendimento Automatizado",
    textos: [
      "Atendimento para que cada contato tenha contexto, direção e próximo passo.",
      "Respostas, encaminhamentos e rotinas de atendimento funcionando de forma estruturada.",
    ],
  },
  {
    slug: "follow-ups-automatizados",
    nome: "Follow-ups Automatizados",
    textos: [
      "Seu cliente ou lead não deveria depender da memória de alguém para receber um retorno.",
      "Criamos fluxos que acompanham cada oportunidade no momento certo.",
    ],
  },
  {
    slug: "disparos-whatsapp",
    nome: "Disparos de WhatsApp",
    textos: [
      "Comunique-se com sua base de forma estruturada, segmentada e integrada à sua operação.",
      "Campanhas, avisos, lembretes e comunicações automatizadas.",
    ],
  },
  {
    slug: "disparos-de-emails",
    nome: "Disparos de E-mail",
    textos: [
      "Transforme sua base de contatos em uma comunicação contínua com sua empresa.",
      "Envios, campanhas e sequências de e-mail integrados aos seus processos.",
    ],
  },
  {
    slug: "sites-paginas-e-bio",
    nome: "Sites, Landing Pages, Páginas de Vendas e Bio",
    textos: [
      "Transforme interesse em oportunidade.",
      "Experiências digitais que apresentam sua empresa, orientam o visitante e conduzem para a próxima ação.",
      "Cada página com uma função clara dentro da sua operação comercial.",
    ],
  },
  {
    slug: "formularios-interativos",
    nome: "Formulários Interativos",
    textos: [
      "Não colete apenas informações. Use o formulário para iniciar o processo comercial.",
      "Captação, qualificação e organização dos dados desde o primeiro contato.",
    ],
  },
  {
    slug: "assistentes-ia",
    nome: "Agentes e Assistentes de IA",
    textos: [
      "Ponha IA onde ela realmente pode gerar valor para sua operação.",
      "Atendimento, qualificação, consulta de informações, organização de dados e execução de tarefas.",
    ],
  },
  {
    slug: "identidade-visual",
    nome: "Identidade Visual",
    textos: [
      "Construa uma marca que sustenta sua operação.",
      "Criamos uma identidade que traduz o posicionamento da sua empresa e mantém sua comunicação consistente em cada ponto de contato.",
    ],
  },
  {
    slug: "linhas-editoriais",
    nome: "Linhas Editoriais",
    textos: [
      "Definição de temas, direcionamentos e pilares que orientam sua comunicação.",
      "Mais consistência para produzir conteúdo. Mais clareza sobre o que sua empresa precisa comunicar.",
    ],
  },
];
