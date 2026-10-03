"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Solucao } from "@/content/solucoes";
import { Popup } from "./Popup";

/** Card numerado (visual do "Nosso processo"); clique abre <dialog> com os textos.
    O texto fica no HTML mesmo fechado (indexável). /solucoes#slug abre o pop-up. */
export function SolucaoCard({ s, n }: { s: Solucao; n: number }) {
  const ref = useRef<HTMLDialogElement>(null);
  const num = `${String(n).padStart(2, "0")}.`;

  useEffect(() => {
    const abrir = () => {
      if (decodeURIComponent(location.hash.slice(1)) === s.slug && !ref.current?.open)
        ref.current?.showModal();
    };
    abrir();
    window.addEventListener("hashchange", abrir);
    return () => window.removeEventListener("hashchange", abrir);
  }, [s.slug]);

  return (
    <li id={s.slug}>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-haspopup="dialog"
        className="group relative flex h-full w-full flex-col items-start rounded-2xl border border-line bg-surface p-6 text-left transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-sinal hover:shadow-[0_0_0_1px_var(--sinal),0_12px_40px_-12px_color-mix(in_srgb,var(--sinal)_45%,transparent)]"
      >
        <span
          aria-hidden
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-line-2 text-ink-2 transition-[color,border-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-sinal group-hover:text-sinal"
        >
          <ArrowUpRight size={16} />
        </span>
        <span className="mono inline-block border-b border-line-2 pb-2 pr-10 text-[1.875rem] font-semibold leading-none text-sinal transition-[border-color,padding] duration-300 ease-out group-hover:border-sinal group-hover:pr-16">
          {num}
        </span>
        <span className="mt-5 text-[1rem] font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-sinal">
          {s.nome}
        </span>
      </button>

      <Popup ref={ref} label={s.nome}>
        <span className="mono inline-block border-b border-sinal pb-2 pr-12 text-[1.5rem] font-semibold leading-none text-sinal">
          {num}
        </span>
        <h2 className="mt-5 pr-8 text-[1.375rem] font-medium leading-snug tracking-[-0.01em] text-ink">{s.nome}</h2>
        <div className="mt-4 space-y-4">
          {s.textos.map((t, j) => (
            <p key={j} className="text-[1rem] leading-[1.75] text-ink-2">
              {t}
            </p>
          ))}
        </div>
      </Popup>
    </li>
  );
}
