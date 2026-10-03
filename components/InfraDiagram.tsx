"use client";

import { useEffect, useRef } from "react";

/**
 * Zigzag animado das etapas de infraestrutura. Computador: horizontal, 01
 * embaixo, alternando até o 07. Celular: vertical, 01 no alto descendo até o 07.
 * A linha se desenha em velocidade constante (SEG por trecho) e cada etapa
 * acende quando a linha chega nela. prefers-reduced-motion: tudo aceso, parado.
 */
const ETAPAS = [
  { n: "01", nome: "Identificar", desc: "Gaps" },
  { n: "02", nome: "Organizar", desc: "Processos e fluxos" },
  { n: "03", nome: "Conectar", desc: "Sistemas e dados" },
  { n: "04", nome: "Automatizar", desc: "Tarefas repetitivas" },
  { n: "05", nome: "Visualizar", desc: "Indicadores e dashboards" },
  { n: "06", nome: "Acompanhar", desc: "Performance e resultados" },
  { n: "07", nome: "Clareza", desc: "Na sua operação", destaque: true },
];

const SEG = 1500; // ms por trecho entre etapas
const DRAW = SEG * (ETAPAS.length - 1);
const HOLD = 1600;
const FADE = 600;
const CYCLE = DRAW + HOLD + FADE;

type Pt = [number, number];
type Label = { x: number; y: number; anchor: "start" | "middle" | "end" };

const LAYOUTS: {
  key: string;
  className: string;
  viewBox: string;
  pts: Pt[];
  label: (i: number) => Label;
}[] = [
  {
    key: "h",
    className: "mx-auto hidden max-w-[800px] md:block",
    viewBox: "-90 0 900 235",
    pts: ETAPAS.map((_, i) => [i * 120, i % 2 ? 80 : 150]),
    label: (i) => (i % 2 ? { x: 0, y: -62, anchor: "middle" } : { x: 0, y: 34, anchor: "middle" }),
  },
  {
    key: "v",
    // celular: zigzag estreito à esquerda, texto todo à direita (legível em 360px)
    className: "iz-v mx-auto block max-w-[420px] md:hidden",
    viewBox: "0 10 340 470",
    pts: ETAPAS.map((_, i) => [i % 2 ? 80 : 24, 40 + i * 66]),
    label: (i) => ({ x: i % 2 ? 48 : 104, y: -14, anchor: "start" }),
  },
];

function Zigzag({ layout }: { layout: (typeof LAYOUTS)[number] }) {
  const ref = useRef<SVGSVGElement>(null);
  const d = layout.pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const live = svg.querySelector<SVGPathElement>(".iz-live")!;
    const nodes = Array.from(svg.querySelectorAll<SVGGElement>(".iz-node"));

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      live.style.strokeDashoffset = "0";
      nodes.forEach((n) => n.classList.add("on"));
      return;
    }

    // só começa quando o diagrama entra na tela; até lá fica apagado, parado
    let raf = 0;
    let t0 = 0;
    const frame = (now: number) => {
      const t = (now - t0) % CYCLE;
      const p = Math.min(t / DRAW, 1); // linear: mesma velocidade em todo trecho
      live.style.strokeDashoffset = String(1 - p);
      live.style.opacity = String(t > DRAW + HOLD ? 1 - (t - DRAW - HOLD) / FADE : 1);
      // trechos têm o mesmo comprimento, então a etapa i acende em i/(n-1)
      nodes.forEach((n, i) =>
        n.classList.toggle("on", t < DRAW + HOLD && p >= i / (nodes.length - 1) - 1e-3),
      );
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        t0 = performance.now();
        raf = requestAnimationFrame(frame);
      },
      { threshold: 0.4 },
    );
    io.observe(svg);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={layout.viewBox}
      className={`infra-diagram h-auto w-full ${layout.className}`}
      role="img"
      aria-label="Etapas da infraestrutura: identificar gaps, organizar processos, conectar sistemas, automatizar tarefas, visualizar indicadores, acompanhar resultados e clareza na sua operação."
    >
      <path d={d} fill="none" stroke="var(--line-2)" strokeWidth="1.5" />
      <path
        d={d}
        className="iz-live"
        pathLength={1}
        fill="none"
        stroke="var(--sinal)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      {ETAPAS.map((e, i) => {
        const [x, y] = layout.pts[i];
        const l = layout.label(i);
        return (
          <g key={e.n} className={`iz-node${"destaque" in e ? " iz-destaque" : ""}`} transform={`translate(${x} ${y})`}>
            <circle r="8" className="iz-halo" />
            <circle r="7" className="iz-ring" />
            <circle r="2.5" className="iz-dot" />
            <text x={l.x} y={l.y} textAnchor={l.anchor} className="iz-num">
              {e.n}
            </text>
            <text x={l.x} y={l.y + 20} textAnchor={l.anchor} className="iz-nome">
              {e.nome}
            </text>
            <text x={l.x} y={l.y + 36} textAnchor={l.anchor} className="iz-desc">
              {e.desc}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function InfraDiagram() {
  return (
    <>
      {LAYOUTS.map((l) => (
        <Zigzag key={l.key} layout={l} />
      ))}
    </>
  );
}
