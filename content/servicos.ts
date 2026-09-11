/* Copy das LPs de serviço, aprovada pelo usuário (Fase 4).
   Tom pela lista permitido/proibido do Accyon Brand Book. Sem travessão, aspas curvas.
   Sem número inventado, sem caso fictício. */

export interface Deliverable {
  label: string;
  text: string;
}

export interface ServiceCopy {
  slug: string;
  nav: string; // rótulo curto (footer, listas)
  resumo: string; // uma linha (seção Frentes na Home)
  title: string; // meta title
  description: string; // meta description
  h1: string;
  abertura: string;
  quando: string[];
  ordemTitulo: string;
  ordemTexto: string;
  entrega: Deliverable[];
  comoFunciona: string[]; // 5 linhas "Verbo. resto"
  ferramentas: string;
  investimento: string;
  prazo: string;
  paraQuemNao: string;
  faq: [string, string][];
  ctaTitulo: string;
}

export const SERVICOS: ServiceCopy[] = [
  {
    slug: "infraestrutura-comercial",
    resumo:
      "Chegada do lead/cliente → captação → CRM → primeiro contato → fluxo de comunicação (WhatsApp + e-mail) → venda / agendamento / solicitação realizada → painel de resultados → finalização da demanda.",
    nav: "Infraestrutura comercial",
    title: "Infraestrutura comercial estruturada para PMEs | Accyon",
    description:
      "A Accyon organiza sua operação comercial do primeiro contato ao fechamento: captação centralizada, CRM no seu processo, régua de follow-up e painel de vendas.",
    h1: "A operação comercial da sua empresa, estruturada do primeiro contato ao fechamento.",
    abertura:
      "Infraestrutura comercial é a estrutura que faz um contato virar cliente sem depender de alguém lembrar. A Accyon organiza como os contatos chegam, quem responde, o que acontece depois e como a venda é registrada, e conecta isso ao WhatsApp, ao CRM e ao painel de quem acompanha o mês.",
    quando: [
      "O contato chega no WhatsApp e fica sem resposta até alguém ver.",
      "O follow-up depende de um vendedor lembrar.",
      "Você não sabe quantas propostas estão abertas agora.",
      "Cada venda é registrada de um jeito, ou não é registrada.",
      "Você não sabe de onde vêm os clientes que fecham.",
      "Quando um vendedor sai, o histórico dos contatos dele sai junto.",
    ],
    ordemTitulo: "A ordem escondida do comercial",
    ordemTexto:
      "Todo contato percorre um caminho: chega, é recebido, é qualificado, recebe uma proposta, decide, e vira cliente ou não. Na maioria das empresas esse caminho existe, mas mora na cabeça das pessoas. Quando ele fica escrito, dá para ver onde os contatos param.",
    entrega: [
      { label: "Captação centralizada", text: "WhatsApp, Instagram, site e indicação chegam a um só lugar, já registrados." },
      { label: "CRM configurado ao seu processo real", text: "não ao processo genérico da ferramenta." },
      { label: "Régua de follow-up", text: "cada contato sem resposta entra numa fila com prazo, e a retomada acontece sozinha, no seu tom." },
      { label: "Modelos de proposta", text: "e o registro de cada envio." },
      { label: "Painel do comercial", text: "propostas abertas, taxa de fechamento, tempo médio até a primeira resposta, origem dos contatos." },
      { label: "WhatsApp na API oficial da Meta", text: "sem número pessoal e sem risco de bloqueio." },
    ],
    comoFunciona: [
      "Entender. Conversamos com quem vende e com quem recebe os contatos.",
      "Mapear. Desenhamos o caminho atual, do primeiro contato ao fechamento, e marcamos onde ele vaza.",
      "Estruturar. Definimos quem responde, em quanto tempo, o que registra e qual é o próximo passo.",
      "Construir. Montamos o CRM, as automações, a régua e o painel.",
      "Entregar. A equipe passa a operar dentro da estrutura, e você passa a enxergar o comercial sem pedir relatório.",
    ],
    ferramentas:
      "A ferramenta depende da sua operação. Trabalhamos com o CRM que você já usa quando ele serve, ou indicamos um que sirva. As automações rodam em n8n ou Make. O WhatsApp roda na API oficial da Meta. O painel sai no que você já acompanha, planilha ou BI.",
    investimento:
      "Definido depois do diagnóstico. O que muda o valor: número de canais de entrada, se o CRM já existe ou vai ser montado, volume de propostas por mês e número de pessoas no comercial.",
    prazo: "De 2 a 4 semanas, conforme o escopo.",
    paraQuemNao:
      "Se o seu problema é preço de tabela ou volume de anúncio, não é aqui. Se é contato perdido por falta de resposta e venda que não é registrada, é.",
    faq: [
      ["Preciso trocar meu CRM?", "Não necessariamente. Se o que você usa dá conta do seu processo, a gente configura em cima dele. A troca só entra se a ferramenta atual impedir o processo."],
      ["A régua de follow-up manda mensagem em nome de quem?", "Da empresa, no tom que você definir, pela API oficial da Meta. Sem número pessoal de vendedor e sem risco de bloqueio."],
      ["E se um vendedor sair?", "O histórico do contato fica no CRM, não no celular dele. Quem assumir continua de onde parou."],
      ["Isso serve para quem vende por WhatsApp?", "Sim. A maior parte da estrutura existe justamente para organizar a venda que hoje acontece solta no WhatsApp."],
      ["Quanto tempo até ver diferença?", "A estrutura entra em 2 a 4 semanas. A diferença no dia a dia aparece quando a equipe passa a operar dentro dela, normalmente nas primeiras semanas de uso."],
    ],
    ctaTitulo: "Onde sua operação comercial está perdendo contato?",
  },

  {
    slug: "sistemas",
    resumo:
      "Softwares feitos sob medida para o seu processo, com a finalidade de facilitar tarefas e resolver demandas.",
    nav: "Construção de sistemas",
    title: "Construção de sistemas sob medida para empresas | Accyon",
    description:
      "A Accyon constrói o sistema que a sua operação precisa quando a planilha e a ferramenta pronta pararam de servir: cadastros, fluxos, permissões e integrações.",
    h1: "Quando a planilha para de dar conta, a Accyon constrói o sistema que a sua operação precisa.",
    abertura:
      "Sistema sob medida é o software feito para o jeito que a sua empresa trabalha, e não o contrário. A Accyon desenha o fluxo real, constrói os cadastros, as telas, as permissões e as integrações, e entrega uma ferramenta que a equipe usa sem treinamento de manual.",
    quando: [
      "A planilha central já tem abas demais e trava quando duas pessoas mexem juntas.",
      "A ferramenta pronta que você assina obriga a operação a se encaixar nela.",
      "O mesmo dado é digitado em três lugares diferentes.",
      "Só uma pessoa sabe onde está cada coisa.",
      "Você paga por funções que não usa e falta a função que você precisa.",
      "O controle do negócio depende de um arquivo que pode ser apagado sem querer.",
    ],
    ordemTitulo: "A ordem escondida de um sistema",
    ordemTexto:
      "Todo sistema é só um processo escrito em tela. Antes de programar qualquer coisa, a gente descobre o processo: o que é cadastrado, quem altera, o que dispara o quê, qual informação precisa estar visível e para quem. O código vem depois.",
    entrega: [
      { label: "O sistema em si", text: "hospedado, com telas de cadastro, listas, filtros e busca." },
      { label: "Fluxos e status", text: "cada registro tem um caminho e um próximo passo claro." },
      { label: "Permissões por papel", text: "cada pessoa vê e altera o que faz sentido para a função dela." },
      { label: "Integrações", text: "o sistema conversa com o que você já usa: ERP, planilha, WhatsApp, e-mail, ferramentas de automação." },
      { label: "Painel", text: "os números da operação saem do próprio sistema, sem exportar nada." },
      { label: "Manutenção combinada", text: "ajuste do que muda no negócio, sem refazer tudo." },
    ],
    comoFunciona: [
      "Entender. Conversamos com quem usa a planilha e quem depende dos dados dela.",
      "Mapear. Desenhamos o processo que o sistema vai representar.",
      "Estruturar. Definimos os dados, as telas, os fluxos e as permissões.",
      "Construir. Montamos o sistema e as integrações.",
      "Entregar. A equipe passa a operar dentro dele, com os dados migrados.",
    ],
    ferramentas:
      "Construímos em base de dados gerenciada e interface web, com Supabase quando serve. As integrações rodam em n8n ou Make. A escolha segue a operação, não a moda.",
    investimento:
      "Definido depois do diagnóstico. O que muda o valor: número de cadastros e telas, quantidade de integrações, regras de permissão e volume de dados a migrar.",
    prazo: "De 2 a 4 semanas para a primeira versão em uso, conforme o escopo.",
    paraQuemNao:
      "Se você quer um site institucional ou uma landing page, isso é outra frente. Se você precisa de uma ferramenta interna que hoje vive numa planilha improvisada, é aqui.",
    faq: [
      ["Vocês refazem tudo do zero?", "Não. O que já funciona vira ponto de partida. A planilha atual costuma ser o melhor rascunho do sistema."],
      ["Fico preso a vocês para mexer no sistema?", "Não. Entregamos com acesso e documentação. Manutenção contínua é opcional."],
      ["E os dados que já tenho?", "Migramos da planilha ou da ferramenta atual para dentro do sistema no lançamento."],
      ["Funciona no celular?", "Sim, no navegador do celular e do computador."],
      ["E se o processo mudar depois?", "Sistema sob medida se ajusta. É para isso que ele existe, em vez de uma ferramenta fechada."],
    ],
    ctaTitulo: "O que hoje vive numa planilha que já não dá conta?",
  },

  {
    slug: "atendimento-automatizado",
    resumo:
      "Fluxos de mensagens ou bots de conversa para triagem, agendamento ou suporte.",
    nav: "Atendimento automatizado",
    title: "Atendimento automatizado sem robô que irrita | Accyon",
    description:
      "A Accyon estrutura o primeiro atendimento da sua empresa: resposta imediata, triagem, encaminhamento e agendamento, com pessoa onde precisa ser pessoa.",
    h1: "O primeiro atendimento da sua empresa, respondido na hora, sem robô que irrita.",
    abertura:
      "Atendimento automatizado é a estrutura que garante que ninguém fique sem resposta e que cada assunto chegue à pessoa certa. A Accyon organiza a triagem, as respostas do que se repete, o encaminhamento e o agendamento, e deixa claro onde o atendimento continua sendo humano.",
    quando: [
      "A mesma pergunta é respondida dezenas de vezes por dia, na mão.",
      "O cliente manda mensagem fora do horário e só é visto no dia seguinte.",
      "A mensagem chega e ninguém sabe quem deveria responder.",
      "O atendimento para quando a pessoa que responde está de folga.",
      "Você já tentou um chatbot e ele afastou cliente.",
      "Marcar um horário depende de troca de dez mensagens.",
    ],
    ordemTitulo: "A ordem escondida do atendimento",
    ordemTexto:
      "Todo atendimento tem três momentos em que uma resposta automática ajuda, e o resto em que ela atrapalha. A gente separa: o que pode ser respondido na hora, o que precisa ser encaminhado, e o que só uma pessoa resolve. A automação cobre o primeiro e passa a bola nos outros dois.",
    entrega: [
      { label: "Resposta imediata", text: "com confirmação e o próximo passo, a qualquer hora." },
      { label: "Triagem", text: "a mensagem é classificada e encaminhada para o setor ou a pessoa certa." },
      { label: "Respostas do que se repete", text: "escritas no tom da empresa, com saída fácil para uma pessoa." },
      { label: "Agendamento", text: "direto, sem a troca de mensagens de sempre." },
      { label: "Registro", text: "toda conversa fica registrada onde a equipe acompanha." },
      { label: "WhatsApp na API oficial da Meta", text: "sem número pessoal e sem risco de bloqueio." },
    ],
    comoFunciona: [
      "Entender. Conversamos com quem atende e levantamos o que perguntam.",
      "Mapear. Listamos os assuntos e para onde cada um vai.",
      "Estruturar. Definimos o que é automático, o que é humano e os limites.",
      "Construir. Montamos os fluxos, a triagem e o agendamento.",
      "Entregar. O atendimento passa a começar na hora, com a equipe livre do que se repete.",
    ],
    ferramentas:
      "WhatsApp na API oficial da Meta. Os fluxos rodam em n8n ou Make. Triagem e registro caem no CRM ou na ferramenta que a equipe já usa.",
    investimento:
      "Definido depois do diagnóstico. O que muda o valor: número de assuntos a tratar, canais atendidos, integração com agenda e volume de mensagens.",
    prazo: "De 2 a 4 semanas, conforme o escopo.",
    paraQuemNao:
      "Se você quer substituir a equipe de atendimento por um robô, não é aqui. Se você quer que a equipe pare de responder o que se repete e o cliente pare de esperar, é.",
    faq: [
      ["O cliente fala com um robô?", "Só no que é objetivo e no primeiro contato. Assim que o assunto exige uma pessoa, a conversa passa, sem o cliente pedir."],
      ["Funciona fora do horário comercial?", "Sim. Resposta imediata e triagem a qualquer hora. O que precisa de pessoa entra na fila do próximo horário útil."],
      ["Vai parecer atendimento de empresa grande e fria?", "As respostas são escritas no tom da sua empresa. O objetivo é soar como você num dia organizado, não como um script."],
      ["E se eu já tenho um chatbot?", "A gente avalia o que existe. Se o problema é o desenho do fluxo, refazemos o desenho. Nem sempre é trocar a ferramenta."],
      ["Precisa de número novo?", "Roda na API oficial da Meta, com um número da empresa. Não usa o celular pessoal de ninguém."],
    ],
    ctaTitulo: "Quantas vezes por dia sua equipe responde a mesma coisa?",
  },

  {
    slug: "gestao-de-automacoes",
    resumo:
      "Assumir, consertar, documentar, integrar e monitorar ações manuais. Velocidade e assertividade nos processos, com menos ação humana e menos gargalos operacionais.",
    nav: "Gestão de automações",
    title: "Gestão e manutenção das automações da sua empresa | Accyon",
    description:
      "A Accyon assume as automações que a sua empresa já tem: mapeia o que roda, conserta o que falha em silêncio, documenta e monitora.",
    h1: "As automações que a sua empresa já tem, sob controle.",
    abertura:
      "Gestão de automações é assumir o que já foi montado e fazer funcionar de forma confiável. A Accyon mapeia tudo que roda hoje, conserta o que falha sem avisar, junta o que está espalhado, documenta e passa a monitorar, para que você pare de descobrir um problema pelo cliente.",
    quando: [
      "Você tem automações rodando, mas não sabe listar todas.",
      "Cada uma foi feita por uma pessoa diferente, e algumas dessas pessoas saíram.",
      "Uma automação parou semana passada e ninguém percebeu na hora.",
      "Estão espalhadas entre Zapier, Make, n8n e planilhas com macro.",
      "Ninguém sabe o que acontece se desligar uma delas.",
      "O custo das ferramentas subiu e você não sabe o que ainda é usado.",
    ],
    ordemTitulo: "A ordem escondida das automações",
    ordemTexto:
      "Toda automação é uma decisão que virou rotina invisível. Quando ninguém revisa, ela continua rodando mesmo depois de o motivo dela ter mudado. A gente descobre o que cada uma faz, por que existe, e o que quebra junto se ela falhar.",
    entrega: [
      { label: "Inventário", text: "uma lista do que roda, onde roda, o que dispara e o que depende de cada automação." },
      { label: "Correção", text: "o que está quebrado ou frágil é consertado ou refeito de forma mais simples." },
      { label: "Consolidação", text: "o que está espalhado em várias ferramentas é reunido onde faz sentido." },
      { label: "Documentação", text: "cada automação com o que faz, por que existe e como mexer." },
      { label: "Monitoramento", text: "alerta quando uma automação falha, antes de o cliente sentir." },
      { label: "Manutenção combinada", text: "ajuste do que muda no negócio, com prioridade acordada." },
    ],
    comoFunciona: [
      "Entender. Descobrimos quem depende de quê.",
      "Mapear. Montamos o inventário do que roda.",
      "Estruturar. Definimos o que fica, o que é refeito e o que é desligado.",
      "Construir. Corrigimos, consolidamos e ligamos o monitoramento.",
      "Entregar. Tudo documentado e sob acompanhamento.",
    ],
    ferramentas:
      "Trabalhamos com o que você já usa: Zapier, Make, n8n. Quando faz sentido, migramos para uma base só. O monitoramento roda em cima das próprias ferramentas.",
    investimento:
      "Definido depois do diagnóstico. O que muda o valor: número de automações, quantas ferramentas diferentes estão em uso, estado da documentação atual e frequência da manutenção contínua.",
    prazo:
      "O inventário e a correção do crítico saem em 2 a 4 semanas. A manutenção é contínua, com escopo combinado.",
    paraQuemNao:
      "Se você ainda não tem nenhuma automação, comece por outra frente. Se você já tem várias e perdeu a visão do conjunto, é aqui.",
    faq: [
      ["Vocês só cuidam do que já existe, ou também criam?", "Cuidar do que existe é o foco desta frente. Automação nova entra quando o diagnóstico mostra que falta, e é combinada à parte."],
      ["Preciso migrar tudo para o n8n?", "Não. A migração só entra quando reduz custo ou risco de verdade. Às vezes o melhor é manter onde está e só documentar e monitorar."],
      ["Como funciona a manutenção?", "Escopo e prioridade combinados. Falha crítica tem resposta rápida; melhoria entra na fila."],
      ["E se a pessoa que montou as automações não estiver mais aqui?", "É o caso mais comum. A gente reconstrói o entendimento a partir do que está rodando."],
      ["Isso reduz o custo das ferramentas?", "Costuma reduzir, ao desligar o que não é mais usado e juntar o que estava duplicado. Não é garantido, depende do que for encontrado."],
    ],
    ctaTitulo: "Quantas automações rodam na sua empresa agora? Consegue listar todas?",
  },

  {
    slug: "criacao-de-paginas",
    resumo:
      "Criação de sites, páginas e aplicações. Encontráveis e interligados aos seus processos.",
    nav: "Sites, páginas e Bio",
    title: "Criação de sites e páginas que carregam e convertem | Accyon",
    description:
      "A Accyon cria sites, landing pages e link na bio do Instagram feitos para carregar rápido, aparecer no Google e transformar visita em contato registrado.",
    h1: "Sites e páginas feitos para carregar rápido, aparecer no Google e virar contato.",
    abertura:
      "Criação de páginas é construir o ponto de entrada da sua operação na web: um site, uma landing page ou o link na bio do Instagram. A Accyon entrega páginas rápidas, encontráveis e ligadas ao seu atendimento, para que a visita não termine em nada.",
    quando: [
      "Sua página demora para abrir e o visitante sai antes de ver.",
      "Você aparece no Instagram, mas não tem para onde mandar quem se interessa.",
      "O site atual foi feito há anos e ninguém consegue mexer nele.",
      "Quem entra no site não sabe o que fazer depois.",
      "Você não sabe quantas pessoas visitaram nem de onde vieram.",
      "O formulário do site manda e-mail que ninguém lê.",
    ],
    ordemTitulo: "A ordem escondida de uma página",
    ordemTexto:
      "Uma página tem um trabalho: transformar quem chega em contato. Antes do visual, a gente define quem é esse visitante, o que ele precisa entender em segundos, e qual é a ação clara no fim. O layout serve a isso.",
    entrega: [
      { label: "A página construída", text: "rápida no celular e no computador, com nota alta de performance." },
      { label: "Estrutura para o Google", text: "título, descrição, endereço limpo e dados que os buscadores entendem." },
      { label: "Formulário ligado ao seu atendimento", text: "com o contato registrado onde a equipe acompanha, não num e-mail perdido." },
      { label: "Link na bio", text: "organizado, se o tráfego vem do Instagram." },
      { label: "Medição", text: "quantas visitas, de onde vêm e quantas viram contato." },
      { label: "Você consegue editar", text: "o texto e as imagens sem depender de código." },
    ],
    comoFunciona: [
      "Entender. Definimos quem visita e de onde vem.",
      "Mapear. Listamos o que precisa ser dito e a ação final.",
      "Estruturar. Desenhamos as seções e o caminho até o contato.",
      "Construir. Montamos a página, a medição e a ligação com o atendimento.",
      "Entregar. No ar, com você conseguindo editar.",
    ],
    ferramentas:
      "Páginas construídas em tecnologia moderna, publicadas na Vercel. O formulário liga ao seu CRM ou ao seu WhatsApp. A medição sai em ferramenta gratuita de análise.",
    investimento:
      "Definido depois do diagnóstico. O que muda o valor: número de páginas, se o texto já existe ou vai ser escrito, integração com atendimento e necessidade de edição pelo cliente.",
    prazo: "De 1 a 3 semanas, conforme o número de páginas.",
    paraQuemNao:
      "Se você precisa de um sistema interno com login e cadastros, isso é outra frente. Se você precisa de um ponto de entrada na web que carregue rápido e gere contato, é aqui.",
    faq: [
      ["Vocês escrevem o texto ou eu mando pronto?", "Os dois funcionam. Se você manda pronto, a gente ajusta para a estrutura. Se não, a gente escreve a partir do diagnóstico."],
      ["Consigo mexer depois sem chamar vocês?", "Sim. Texto e imagens são editáveis por você. Mudança de estrutura é combinada à parte."],
      ["Serve para link na bio do Instagram?", "Sim. É um dos formatos: uma página enxuta, rápida, com os caminhos que fazem sentido para quem vem do Instagram."],
      ["A página vai aparecer no Google?", "A página sai preparada para ser encontrada. Aparecer bem posicionado depende de conteúdo e tempo, e é trabalho contínuo, não uma entrega única."],
      ["Já tenho site. Dá para melhorar em vez de refazer?", "Depende do estado dele. Se a base permite, melhoramos. Se refazer sai mais rápido e mais barato de manter, a gente diz isso com clareza."],
    ],
    ctaTitulo: "Para onde você manda quem se interessa pela sua empresa hoje?",
  },
];

export const SERVICOS_POR_SLUG: Record<string, ServiceCopy> = Object.fromEntries(
  SERVICOS.map((s) => [s.slug, s]),
);
