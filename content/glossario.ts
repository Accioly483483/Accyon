/* Glossário para consolidação de entidades (GEO). Cada verbete no padrão
   "X é ...", voz do Accyon Brand Book, sem palavra proibida. */

export interface Verbete {
  termo: string;
  slug: string;
  definicao: string;
}

export const GLOSSARIO: Verbete[] = [
  {
    termo: "Infraestrutura operacional",
    slug: "infraestrutura-operacional",
    definicao:
      "A infraestrutura operacional é a parte invisível de uma empresa que faz o trabalho acontecer: os processos, as responsabilidades, os fluxos de informação e as ferramentas conectadas. Ela raramente aparece na vitrine, e some da vista até o dia em que falha.",
  },
  {
    termo: "Infraestrutura comercial",
    slug: "infraestrutura-comercial",
    definicao:
      "A infraestrutura comercial é a estrutura que leva alguém do primeiro contato até virar cliente: como o contato chega, quem responde, como é qualificado, como a proposta é enviada e como a venda é registrada.",
  },
  {
    termo: "Automação de processos",
    slug: "automacao-de-processos",
    definicao:
      "Automação de processos é fazer uma tarefa repetitiva acontecer sem uma pessoa executar cada passo. Serve para movimentos previsíveis, como enviar um lembrete, registrar um dado em dois lugares ou avisar quem precisa agir.",
  },
  {
    termo: "Automação comercial",
    slug: "automacao-comercial",
    definicao:
      "Automação comercial é a aplicação da automação de processos à área de vendas: qualificação de contatos, follow-up com prazo, envio de proposta e atualização do CRM sem depender da memória de um vendedor.",
  },
  {
    termo: "CRM",
    slug: "crm",
    definicao:
      "CRM é o registro central dos contatos e das negociações de uma empresa: quem falou com quem, em que etapa cada negócio está e qual é o próximo passo. Quando está bem configurado, o histórico fica na empresa, não no celular de uma pessoa.",
  },
  {
    termo: "Integração de sistemas",
    slug: "integracao-de-sistemas",
    definicao:
      "Integração de sistemas é fazer duas ferramentas trocarem informação sem alguém digitar o mesmo dado nas duas. Um pedido no e-commerce que aparece sozinho no financeiro é uma integração.",
  },
  {
    termo: "Follow-up",
    slug: "follow-up",
    definicao:
      "Follow-up é o retorno a um contato que ainda não respondeu ou não decidiu. Quando depende de alguém lembrar, ele falha justamente com quem estava perto de fechar.",
  },
  {
    termo: "Régua de contato",
    slug: "regua-de-contato",
    definicao:
      "Régua de contato é uma sequência definida de mensagens, com momentos e prazos combinados. Em vez de mandar mensagem quando lembra, a empresa retoma o contato em pontos que fazem sentido: confirmação, lembrete em 24 horas, retomada em alguns dias.",
  },
  {
    termo: "Gargalo operacional",
    slug: "gargalo-operacional",
    definicao:
      "Gargalo operacional é o ponto onde o trabalho para e se acumula: uma aprovação que só uma pessoa dá, um dado que ninguém sabe onde está, uma etapa que trava as seguintes.",
  },
  {
    termo: "Dashboard operacional",
    slug: "dashboard-operacional",
    definicao:
      "Dashboard operacional é uma tela que mostra os números da operação sem alguém montar um relatório: quantas propostas estão abertas, quanto tempo leva cada etapa, de onde vêm os contatos.",
  },
  {
    termo: "API oficial do WhatsApp Business",
    slug: "api-oficial-whatsapp-business",
    definicao:
      "A API oficial do WhatsApp Business é o canal autorizado pela Meta para uma empresa enviar e receber mensagens de forma automatizada, com um número da empresa, sem usar o celular pessoal de um funcionário e sem risco de bloqueio por uso indevido.",
  },
  {
    termo: "Sistema sob medida",
    slug: "sistema-sob-medida",
    definicao:
      "Sistema sob medida é um software construído para o processo específico de uma empresa, em vez de uma ferramenta pronta que obriga a operação a se encaixar nela. Costuma nascer de uma planilha que deixou de dar conta.",
  },
];
