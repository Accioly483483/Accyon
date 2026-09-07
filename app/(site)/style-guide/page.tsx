import type { Metadata } from "next";
import { NodeMark } from "@/components/NodeMark";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

// Página de QA visual do design system (Fase 1). Fora do índice. Remover antes do launch.
export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const SWATCHES = [
  ["--bg", "Preto de Painel", "#0B0D10"],
  ["--surface", "Grafite de Superfície", "#0E1216"],
  ["--ink", "Branco de Marcação", "#FFFFFF"],
  ["--ink-2", "Cinza de Leitura", "#8A97A6"],
  ["--sinal", "Azul de Sinal", "#0C98DE"],
  ["--success", "Verde de Conferência", "#00A181"],
  ["--warning", "Âmbar de Espera", "#B5851F"],
  ["--danger", "Terracota de Falha", "#D9705F"],
];

export default function StyleGuide() {
  return (
    <>
      <Section eyebrow="Design system" title="Style guide da Accyon">
        <p className="max-w-measure text-corpo text-ink-2">
          QA visual dos tokens e componentes base das landing pages. Identidade do
          Accyon Brand Book: Preto de Painel, Space Grotesk no texto, IBM Plex Mono
          nos rótulos, Azul de Sinal só no estado ativo, cantos vivos.
        </p>
      </Section>

      <Section eyebrow="Cor" title="Sistema cromático" surface>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {SWATCHES.map(([varName, name, hex]) => (
            <div key={varName} className="border border-line">
              <div className="h-24" style={{ background: `var(${varName})` }} />
              <div className="p-3">
                <p className="mono text-legenda text-ink">{name}</p>
                <p className="mono text-legenda text-ink-2">{hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Tipografia" title="Escala modular">
        <div className="space-y-6">
          <p className="text-display font-medium text-ink">Accyon</p>
          <p className="text-titulo font-medium text-ink">Processo visível</p>
          <p className="text-subtitulo text-ink">Visibilidade antes de automação</p>
          <p className="text-corpo text-ink-2">
            Antes de propor ferramenta, a gente pergunta como você trabalha, e
            escuta a resposta inteira. Corpo em Space Grotesk, 18px, leading 1.62,
            medida travada em 68 caracteres.
          </p>
          <p className="mono text-legenda text-ink-2">
            013 · nota técnica · ACC-BB-2609 · 99,98 % uptime
          </p>
          <Eyebrow>Em operação</Eyebrow>
        </div>
      </Section>

      <Section eyebrow="Componentes" title="Botões" surface>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contato" variant="primary">
            Solicitar análise
          </Button>
          <Button href="/contato" variant="primary" arrow>
            Solicitar análise
          </Button>
          <Button href="/#como-funciona" variant="ghost">
            Entender como funciona
          </Button>
          <Button href="/#como-funciona" variant="ghost" arrow>
            Entender como funciona
          </Button>
        </div>
      </Section>

      <Section eyebrow="Componentes" title="O nó">
        <div className="flex items-end gap-10">
          <div className="text-center">
            <NodeMark size={64} title="Nó aberto" />
            <p className="mono mt-3 text-legenda text-ink-2">aberto · 64</p>
          </div>
          <div className="text-center">
            <NodeMark size={40} />
            <p className="mono mt-3 text-legenda text-ink-2">aberto · 40</p>
          </div>
          <div className="text-center">
            <NodeMark size={16} variant="solido" />
            <p className="mono mt-3 text-legenda text-ink-2">solido · 16</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Movimento" title="Revelação por scroll" surface>
        <div className="space-y-4">
          {[0, 1, 2, 3].map((i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="border border-line bg-bg p-6">
                <p className="mono text-legenda text-ink-2">bloco {i + 1}</p>
                <p className="text-corpo text-ink">
                  Sobe 20px, blur de 8px a 0, opacidade de 0 a 1. Escalonado em
                  60ms. Uma vez por elemento.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
