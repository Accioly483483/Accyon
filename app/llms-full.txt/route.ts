import { SERVICOS } from "@/content/servicos";
import { GLOSSARIO } from "@/content/glossario";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://accyon.com.br";

export const dynamic = "force-static";

function servicoMd(s: (typeof SERVICOS)[number]): string {
  return `## ${s.nav}
URL: ${SITE}/${s.slug}

${s.h1}

${s.abertura}

### Quando você precisa disso
${s.quando.map((q) => `- ${q}`).join("\n")}

### ${s.ordemTitulo}
${s.ordemTexto}

### O que a Accyon entrega
${s.entrega.map((d) => `- ${d.label}. ${d.text}`).join("\n")}

### Como funciona
${s.comoFunciona.map((l, i) => `${i + 1}. ${l}`).join("\n")}

### Ferramentas
${s.ferramentas}

### Investimento
${s.investimento}

### Prazo
${s.prazo}

### Para quem não é
${s.paraQuemNao}

### Perguntas frequentes
${s.faq.map(([q, a]) => `- ${q}\n  ${a}`).join("\n")}
`;
}

export function GET() {
  const body = `# Accyon, conteúdo completo

Consultoria de infraestrutura operacional e comercial para pequenas e médias empresas no Brasil.

## O que é a Accyon
A Accyon é uma empresa brasileira de infraestrutura operacional e comercial que ajuda pequenas e médias empresas a organizar, conectar e automatizar suas operações. A empresa analisa como pessoas, processos e ferramentas trabalham atualmente, identifica gargalos e constrói estruturas sob medida utilizando processos, CRM, automações, integrações, inteligência artificial, dados e sistemas. O objetivo não é adicionar tecnologia por adicionar, mas criar uma operação mais clara, conectada e capaz de funcionar com menos trabalho manual e dependência de pessoas específicas.

## Como funciona um projeto
1. Entender. Conversamos com as pessoas que fazem a operação acontecer, e entendemos como o trabalho realmente é feito.
2. Mapear. Tornamos a operação visível: gargalos, tarefas repetitivas, dependências, informações perdidas, etapas desnecessárias e oportunidades de automação.
3. Estruturar. Desenhamos como a operação deveria funcionar: o que acontece, quem faz, quando, qual informação é necessária e qual é o próximo movimento. Primeiro a lógica, depois a ferramenta.
4. Construir. Implementamos o que a operação precisa: CRM, automações, integrações, dashboards, sistemas, IA, fluxos de atendimento e processos digitais.
5. Entregar. A estrutura passa a fazer parte da rotina.

${SERVICOS.map(servicoMd).join("\n\n")}

## Glossário
${GLOSSARIO.map((v) => `### ${v.termo}\n${v.definicao}`).join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
