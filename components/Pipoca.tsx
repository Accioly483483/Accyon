"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Emoji grande à esquerda; à direita os sinais "pipocam" um por vez, cada um
 * numa posição diferente (alterna esquerda/direita e altura). Cada card vive
 * VIDA ms, então ficam ~3 na tela. Duas fases em sequência: a fase seguinte
 * (e a troca de emoji) só começa quando o último card da anterior sumiu; depois
 * do fim da última, recomeça. Só começa quando a área entra na tela.
 * prefers-reduced-motion: fases paradas, cards em coluna.
 */
const FASES = [
  {
    emoji: "🗣️",
    frases: [
      "Não dei a devolutiva no prazo.",
      "Esqueci de agendar a reunião.",
      "Não reservei o horário.",
      "Esqueci de retornar o contato.",
      "Não realizei o follow-up com o lead.",
      "Enviei a proposta, mas não acompanhei depois.",
      "Agendamentos para o mesmo horário.",
      "Não enviei o lembrete da reunião para o lead.",
      "Esqueci de reagendar um compromisso cancelado.",
    ],
  },
  {
    emoji: "⚙️",
    // teste: GIF no lugar do emoji (só na animação; sem movimento fica o emoji)
    gif: "/gifs/vericardo-gears-6534.gif",
    frases: [
      "Informações perdidas em conversas de WhatsApp.",
      "Informações cadastrais incompletas.",
      "Etapa do negócio desatualizada.",
      "Processos não listados.",
      "Etapas puladas.",
      "Tarefas sem visibilidade para cobrar.",
      "O processo funciona enquanto determinada pessoa está presente.",
      "Informação não lançada no sistema.",
      "Dados não atualizados.",
    ],
  },
];

// posição por card: alterna lado (ancorado à esquerda ou à direita, nunca
// transborda) e altura
const POS = [
  { left: "0%", top: "2%" },
  { right: "0%", top: "34%" },
  { left: "4%", top: "66%" },
  { right: "2%", top: "0%" },
  { left: "0%", top: "36%" },
  { right: "0%", top: "68%" },
];

const PASSO = 1300;
const VIDA = 3900;
const VIVOS = Math.ceil(VIDA / PASSO); // ticks que um card fica na tela

// linha do tempo de um ciclo, um item por tick: o card que nasce nele (ou
// null na espera pelo último card da fase sumir) e a fase do emoji
const ROTEIRO = FASES.flatMap((f, fase) => [
  ...f.frases.map((frase) => ({ fase, frase })),
  ...Array.from({ length: VIVOS - 1 }, () => ({ fase, frase: null as string | null })),
]);

export function Pipoca() {
  const palco = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(-1);
  const [parado, setParado] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setParado(true);
      return;
    }
    let id = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setTick(0);
      id = window.setInterval(() => setTick((t) => t + 1), PASSO);
    }, { threshold: 0.3 });
    io.observe(palco.current!);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, []);

  // cards vivos: os nascidos nos últimos VIVOS ticks
  const vivos = [];
  for (let t = Math.max(0, tick - VIVOS + 1); t <= tick; t++) {
    const frase = ROTEIRO[t % ROTEIRO.length].frase;
    if (frase) vivos.push({ t, frase });
  }
  const fase = ROTEIRO[Math.max(0, tick) % ROTEIRO.length].fase;

  return (
    <div className="grid items-center gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      {parado ? null : (
        <span key={fase} aria-hidden className="pipoca-emoji block text-center text-[8rem] leading-none md:text-[13rem]">
          {"gif" in FASES[fase] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={FASES[fase].gif} alt="" className="mx-auto w-[14rem] md:w-[20rem]" />
          ) : (
            FASES[fase].emoji
          )}
        </span>
      )}

      <ul className="sr-only">
        {FASES.flatMap((f) => f.frases).map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      {parado ? (
        <div aria-hidden className="space-y-10 md:col-span-2">
          {FASES.map((f) => (
            <div key={f.emoji} className="grid items-start gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
              <span className="block text-center text-[6rem] leading-none">{f.emoji}</span>
              <ul className="space-y-3">
                {f.frases.map((s) => (
                  <li key={s} className="rounded-2xl border border-line bg-bg px-5 py-4 text-corpo text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div ref={palco} aria-hidden className="relative h-[30rem] md:h-[24rem]">
          {vivos.map(({ t, frase }) => (
            <div
              key={t}
              className="pipoca-card absolute w-[72%] md:w-[58%] rounded-2xl border border-line bg-bg px-5 py-4 text-corpo leading-snug text-ink shadow-[0_12px_32px_rgb(0_0_0/0.35)]"
              style={{ ...POS[t % POS.length], animationDuration: `${VIDA}ms` }}
            >
              {frase}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
