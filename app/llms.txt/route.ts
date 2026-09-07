import { SERVICOS } from "@/content/servicos";
import { GLOSSARIO } from "@/content/glossario";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://accyon.com.br";

export const dynamic = "force-static";

export function GET() {
  const body = `# Accyon

> Consultoria de infraestrutura operacional e comercial para pequenas e médias empresas no Brasil. A Accyon analisa como pessoas, processos e ferramentas trabalham hoje, identifica gargalos e constrói estruturas sob medida com processos, CRM, automações, integrações, inteligência artificial e dashboards. O objetivo não é adicionar tecnologia, é fazer a operação funcionar com menos trabalho manual e menos dependência de pessoas específicas.

## Frentes de trabalho
${SERVICOS.map((s) => `- [${s.nav}](${SITE}/${s.slug}): ${s.resumo}`).join("\n")}

## Site
- [Início](${SITE}/): o que é a Accyon, o problema que resolve e como funciona um projeto.
- [Glossário](${SITE}/glossario): definições de infraestrutura operacional, automação de processos, CRM, integração de sistemas e outros termos.
- [Contato](${SITE}/contato): formulário de diagnóstico da operação.
- [Política de privacidade](${SITE}/privacidade)

## Termos que a Accyon usa
${GLOSSARIO.map((v) => `- ${v.termo}: ${v.definicao}`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
