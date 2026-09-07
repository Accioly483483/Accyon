import type { Metadata } from "next";
import { ServiceLP } from "@/components/ServiceLP";
import { SERVICOS_POR_SLUG } from "@/content/servicos";

const data = SERVICOS_POR_SLUG["gestao-de-automacoes"];

export const metadata: Metadata = {
  title: { absolute: data.title },
  description: data.description,
  alternates: { canonical: `/${data.slug}` },
  openGraph: { title: data.title, description: data.description, url: `/${data.slug}` },
};

export default function Page() {
  return <ServiceLP data={data} />;
}
