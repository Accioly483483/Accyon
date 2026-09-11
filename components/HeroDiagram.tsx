"use client";

/**
 * Representação abstrata de uma operação (copy §06): PESSOAS, PROCESSOS,
 * INFORMAÇÃO, DECISÃO, AÇÃO. Elementos entram dispersos, as conexões se
 * desenham, um sinal percorre o caminho. SVG + CSS puro, sem lib.
 * Ângulos herdados do nó: 0, 60, 90, 120 (nenhum a 45). Azul só no sinal ativo.
 * prefers-reduced-motion: tudo já no estado conectado, sem movimento.
 */
const NODES = [
  { id: "pessoas", label: "Pessoas", x: 60, y: 40 },
  { id: "processos", label: "Processos", x: 60, y: 120 },
  { id: "informacao", label: "Informação", x: 180, y: 160 },
  { id: "decisao", label: "Decisão", x: 180, y: 240 },
  { id: "acao", label: "Ação", x: 60, y: 300 },
];

const LINKS = [
  "M60 40 L60 120",
  "M60 120 L180 160",
  "M180 160 L180 240",
  "M180 240 L60 300",
];

export function HeroDiagram() {
  return (
    <svg
      viewBox="-84 -12 352 368"
      className="hero-diagram h-auto w-full max-w-[460px]"
      role="img"
      aria-label="Diagrama de uma operação: pessoas, processos, informação, decisão e ação conectados em um fluxo."
    >
      {LINKS.map((d, i) => (
        <path
          key={d}
          d={d}
          className="hd-link"
          style={{ animationDelay: `${300 + i * 260}ms` }}
          stroke="var(--line-2)"
          strokeWidth="1.5"
          fill="none"
        />
      ))}

      {/* sinal que percorre o caminho principal em loop contínuo */}
      <circle r="3" className="hd-pulse" fill="var(--sinal)">
        <animateMotion
          dur="3.4s"
          begin="1.6s"
          repeatCount="indefinite"
          path="M60 40 L60 120 L180 160 L180 240 L60 300"
        />
      </circle>

      {NODES.map((n, i) => (
        <g
          key={n.id}
          className="hd-node"
          style={{ animationDelay: `${i * 140}ms` }}
          transform={`translate(${n.x} ${n.y})`}
        >
          <circle r="5.5" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.5" />
          <circle r="2" fill="var(--ink-2)" />
          <text
            x={n.x > 120 ? 14 : -14}
            y="4"
            textAnchor={n.x > 120 ? "start" : "end"}
            className="hd-label"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
