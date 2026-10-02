/* Soluções da Accyon. Fonte única: modal "Soluções e nichos" (Home) e página
   /solucoes, onde cada item vira uma seção com âncora #slug. O texto
   detalhado de cada uma ainda será escrito pelo usuário. */

export interface Solucao {
  slug: string;
  nome: string;
}

export const SOLUCOES: Solucao[] = [
  { slug: "ecossistema-comercial-operacional", nome: "Construção completa de ecossistema Comercial / Operacional" },
  { slug: "desenvolvimento-de-softwares", nome: "Desenvolvimento de Softwares (CRMs, Painéis de Estoque e Vendas, Esteiras Operacionais)" },
  { slug: "dashboards", nome: "Criação de Dashboards (Análise de Dados)" },
  { slug: "sites-paginas-e-bio", nome: "Sites Institucionais, Páginas de vendas, Landing Pages e Bio" },
  { slug: "formularios-interativos", nome: "Formulários interativos" },
  { slug: "fluxos-de-conversa", nome: "Fluxos de conversa" },
  { slug: "atendimento-automatizado", nome: "Atendimento automatizado" },
  { slug: "disparos-whatsapp", nome: "Disparos de mensagem - Whatsapp" },
  { slug: "follow-ups-automatizados", nome: "Follow-ups automatizados" },
  { slug: "gestao-de-automacoes", nome: "Gestão de automações" },
  { slug: "automacoes-sob-medida", nome: "Automações sob medida" },
  { slug: "fluxos-de-atendimento", nome: "Fluxos de atendimento" },
  { slug: "disparos-de-emails", nome: "Disparos de Emails" },
  { slug: "linhas-editoriais", nome: "Criação de linhas editoriais" },
  { slug: "assistentes-ia", nome: "Criação de assistentes IA" },
];
