import type { ServiceCopy } from "@/content/servicos";
import type { Verbete } from "@/content/glossario";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://accyon.com.br";
export const ORG_ID = `${SITE}/#organizacao`;
export const SITE_ID = `${SITE}/#website`;
export const PERSON_ID = `${SITE}/#pessoa-fundador`;

const url = (path = "") => `${SITE}${path}`;

// Tópicos que a Accyon domina. Strings de assunto, não dado sensível.
const KNOWS_ABOUT = [
  "Infraestrutura operacional",
  "Infraestrutura comercial",
  "Automação de processos empresariais",
  "Automação comercial",
  "Integração de sistemas",
  "CRM",
  "Atendimento automatizado",
  "Inteligência artificial aplicada a operações",
  "Dashboards operacionais",
  "n8n",
  "Make",
  "Zapier",
  "Supabase",
  "API oficial do WhatsApp Business",
];

// TODO: adicionar sameAs (LinkedIn, Instagram) quando as URLs existirem.
export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Accyon",
    url: url("/"),
    description:
      "Consultoria de infraestrutura operacional e comercial para pequenas e médias empresas: organiza processos, conecta sistemas, automatiza tarefas e entrega dashboards.",
    email: "accioly483@gmail.com",
    telephone: "+55 21 97970-0821",
    taxID: "66.008.856/0001-11",
    areaServed: { "@type": "Country", name: "Brasil" },
    knowsAbout: KNOWS_ABOUT,
    founder: { "@id": PERSON_ID },
  };
}

export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Matheus A.",
    jobTitle: "Gestor de Automações",
    worksFor: { "@id": ORG_ID },
    knowsAbout: [
      "Automação de processos",
      "Integração de sistemas",
      "RevOps",
      "Inteligência artificial aplicada a operações",
    ],
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: url("/"),
    name: "Accyon",
    inLanguage: "pt-BR",
    publisher: { "@id": ORG_ID },
  };
}

export function webPageNode(path: string, name: string, description?: string) {
  return {
    "@type": "WebPage",
    "@id": `${url(path)}#webpage`,
    url: url(path),
    name,
    ...(description ? { description } : {}),
    isPartOf: { "@id": SITE_ID },
    inLanguage: "pt-BR",
  };
}

export function breadcrumbNode(
  items: { name: string; path: string }[],
  pagePath: string,
) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url(pagePath)}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: url(it.path),
    })),
  };
}

export function faqPageNode(items: [string, string][], pagePath: string) {
  return {
    "@type": "FAQPage",
    "@id": `${url(pagePath)}#faq`,
    mainEntity: items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function howToNode(
  name: string,
  steps: { name: string; text: string }[],
  pagePath: string,
) {
  return {
    "@type": "HowTo",
    "@id": `${url(pagePath)}#howto`,
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function serviceNode(s: ServiceCopy) {
  const path = `/${s.slug}`;
  return {
    "@type": "Service",
    "@id": `${url(path)}#servico`,
    serviceType: s.nav,
    name: s.h1,
    url: url(path),
    description: s.description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Brasil" },
    audience: { "@type": "BusinessAudience", name: "Pequenas e médias empresas" },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      priceSpecification: {
        "@type": "PriceSpecification",
        description:
          "Investimento definido após diagnóstico, conforme o escopo da operação.",
      },
      url: url(path),
    },
  };
}

export function definedTermSetNode(verbetes: Verbete[]) {
  return {
    "@type": "DefinedTermSet",
    "@id": `${url("/glossario")}#glossario`,
    name: "Glossário Accyon",
    url: url("/glossario"),
    inLanguage: "pt-BR",
    hasDefinedTerm: verbetes.map((v) => ({
      "@type": "DefinedTerm",
      "@id": `${url("/glossario")}#${v.slug}`,
      name: v.termo,
      description: v.definicao,
      inDefinedTermSet: { "@id": `${url("/glossario")}#glossario` },
    })),
  };
}

export function graph(nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
