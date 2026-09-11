/**
 * Fluxograma animado das camadas de infraestrutura (substitui a lista 01-05).
 * Mesmo estilo do HeroDiagram: SVG + CSS puro, sinal percorrendo o caminho
 * em loop contínuo. prefers-reduced-motion desliga o sinal (ver globals.css).
 */
const CAMADAS = [
  { n: "01", nome: "Organizar", desc: "Processos e fluxos" },
  { n: "02", nome: "Conectar", desc: "Sistemas e dados" },
  { n: "03", nome: "Automatizar", desc: "Tarefas repetitivas" },
  { n: "04", nome: "Enxergar", desc: "Indicadores e dashboards" },
  { n: "05", nome: "Inteligência", desc: "IA aplicada" },
];

const GAP = 130;
const Y = 44;

export function InfraDiagram() {
  const path = CAMADAS.map((_, i) => `${i === 0 ? "M" : "L"}${i * GAP} ${Y}`).join(" ");
  const width = GAP * (CAMADAS.length - 1);

  return (
    <svg
      viewBox={`-70 0 ${width + 140} 88`}
      className="infra-diagram h-auto w-full max-w-none"
      style={{ minWidth: 640 }}
      role="img"
      aria-label="Fluxo da infraestrutura: organizar, conectar, automatizar, enxergar e aplicar inteligência, em movimento contínuo."
    >
      <path d={path} className="id-link" stroke="var(--line-2)" strokeWidth="1.5" fill="none" />

      <circle r="3.5" className="id-pulse" fill="var(--sinal)">
        <animateMotion dur="6s" repeatCount="indefinite" path={path} />
      </circle>

      {CAMADAS.map((c, i) => (
        <g key={c.n} transform={`translate(${i * GAP} ${Y})`}>
          <circle r="6" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.5" />
          <circle r="2" fill="var(--ink-2)" />
          <text y="-22" textAnchor="middle" className="mono id-num">
            {c.n}
          </text>
          <text y="26" textAnchor="middle" className="id-nome">
            {c.nome}
          </text>
          <text y="40" textAnchor="middle" className="mono id-desc">
            {c.desc}
          </text>
        </g>
      ))}
    </svg>
  );
}
