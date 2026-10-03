import { SOLUCOES } from "@/content/solucoes";
import { GLOSSARIO } from "@/content/glossario";
import { PROCESSO } from "@/content/home";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://accyon.com.br";

export const dynamic = "force-static";

export function GET() {
  const body = `# Accyon, conteúdo completo

Consultoria de infraestrutura operacional e comercial para pequenas e médias empresas no Brasil.

## O que é a Accyon
A Accyon é uma empresa brasileira de infraestrutura operacional e comercial, situada no Rio de Janeiro, fundada por Matheus Accioly. Ajuda empreendedores e empresas a organizar, conectar e automatizar suas operações e vender mais. A empresa analisa como pessoas, processos e ferramentas trabalham atualmente, identifica gargalos e constrói estruturas sob medida utilizando processos, CRM, automações, integrações, inteligência artificial, dados e sistemas. O objetivo é criar uma operação mais clara, conectada e capaz de funcionar com mais velocidade e menos trabalho manual.

## Como funciona um projeto
${PROCESSO.map((p, i) => `${i + 1}. ${p.nome}. ${p.texto}`).join("\n")}

## Soluções
${SOLUCOES.map((s) => `### ${s.nome}\n${s.textos.join(" ")}\n${SITE}/solucoes#${s.slug}`).join("\n\n")}

## Glossário
${GLOSSARIO.map((v) => `### ${v.termo}\n${v.definicao}`).join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
