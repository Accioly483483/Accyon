import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: { absolute: "Contato | Accyon" },
  description:
    "Conte para a Accyon como sua operação funciona hoje. A primeira etapa não é contratar. É entender onde existem gargalos.",
  alternates: { canonical: "/contato" },
  openGraph: {
    title: "Contato | Accyon",
    description:
      "Conte para a Accyon como sua operação funciona hoje. A primeira etapa não é contratar. É entender.",
    url: "/contato",
  },
};

// TODO: substituir WHATSAPP e EMAIL pelos dados reais antes do launch.
const WHATSAPP_URL = "https://wa.me/5500000000000";
const EMAIL = "contato@accyon.com.br";

export default function Contato() {
  return (
    <Section
      eyebrow="Contato"
      title="Conte para a Accyon como sua operação funciona hoje."
    >
      <p className="max-w-measure text-corpo text-ink-2">
        Não precisamos de uma apresentação formal. Queremos entender onde sua
        operação está e o que está travando o trabalho. A primeira etapa não é
        contratar. É entender.
      </p>

      <div className="mt-12 border border-line bg-surface p-6 md:p-10">
        <p className="text-subtitulo text-ink">Conte um pouco sobre sua operação.</p>
        <p className="mb-10 mt-3 max-w-measure text-corpo text-ink-2">
          Suas respostas servem só para entender o contexto da sua operação antes
          da conversa.
        </p>
        <LeadForm formSlug="contato" />
      </div>

      <div className="mt-12 border-t border-line pt-8">
        <p className="mono text-eyebrow uppercase text-ink-2">Prefere falar direto?</p>
        <div className="mt-4 flex flex-col gap-2 text-corpo text-ink-2">
          <a
            href={WHATSAPP_URL}
            className="transition-colors hover:text-ink"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-ink">
            {EMAIL}
          </a>
        </div>
      </div>
    </Section>
  );
}
