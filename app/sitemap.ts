import type { MetadataRoute } from "next";
import { SERVICOS } from "@/content/servicos";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://accyon.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const e = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ) => ({ url: `${SITE}${path}`, lastModified: now, changeFrequency, priority });

  return [
    e("/", 1, "monthly"),
    ...SERVICOS.map((s) => e(`/${s.slug}`, 0.9, "monthly")),
    e("/glossario", 0.6, "monthly"),
    e("/contato", 0.7, "yearly"),
    e("/privacidade", 0.2, "yearly"),
  ];
}
