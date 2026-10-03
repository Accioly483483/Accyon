"use client";

import type { RefObject } from "react";

/** Moldura de pop-up do site (<dialog> nativo: Esc, foco preso). Abrir com ref.current.showModal().
    Fecha no X, no Esc e no clique fora. O conteúdo fica no HTML mesmo fechado (indexável). */
export function Popup({
  ref,
  label,
  children,
}: {
  ref: RefObject<HTMLDialogElement | null>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close(); // clique no fundo
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-line bg-bg p-0 text-ink backdrop:bg-bg/90 backdrop:backdrop-blur"
    >
      <div className="relative p-6 md:p-8">
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => ref.current?.close()}
          className="press absolute right-4 top-4 grid h-9 w-9 place-items-center text-ink-2 transition-colors hover:text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        {children}
      </div>
    </dialog>
  );
}
