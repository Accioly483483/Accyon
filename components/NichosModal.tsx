"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";

const NICHOS = [
  "Academia",
  "Agência de marketing",
  "Barbearia",
  "Clínica de estética",
  "Clínica médica",
  "Clínica veterinária",
  "Educação: colégios, cursos e creches",
  "Concessionária",
  "Consultório de psicologia / psicanálise",
  "Empresa de limpeza empresarial e residencial",
  "Empresa de logística",
  "Empresas de RH",
  "Escritório de advocacia",
  "Escritório de contabilidade",
  "Estúdio de tatuagem",
  "Imobiliária",
  "Consultorias / mentorias / vendas online / infoproduto",
  "Pet shop",
  "Salão de beleza",
  "Saúde: dentista, nutricionista, pediatra, ginecologista, oftalmologista",
];

export function NichosModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Button type="button" variant="ghost" onClick={() => setOpen(true)}>
        Conferir nichos
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-bg/90 p-4 backdrop-blur sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Nichos atendidos"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative my-4 w-full max-w-lg border border-line bg-bg p-5 md:p-8">
            <button
              type="button"
              aria-label="Fechar"
              onClick={() => setOpen(false)}
              className="press absolute right-4 top-4 grid h-9 w-9 place-items-center text-ink-2 transition-colors hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <p className="pr-10 text-subtitulo text-ink">Nichos atendidos</p>
            <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
              <ul className="grid gap-3 sm:grid-cols-2">
                {NICHOS.map((n) => (
                  <li
                    key={n}
                    className="border border-line px-4 py-3 text-corpo text-ink"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
