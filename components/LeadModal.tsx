"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LeadForm } from "./LeadForm";

const LeadModalContext = createContext<{ open: () => void } | null>(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal precisa estar dentro de LeadModalProvider.");
  return ctx;
}

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [formStep, setFormStep] = useState(1);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setVisible(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  return (
    <LeadModalContext.Provider
      value={{
        open: () => {
          setFormStep(1);
          setVisible(true);
        },
      }}
    >
      {children}
      {visible && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-bg/90 p-4 backdrop-blur sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Formulário de contato"
          onClick={(e) => {
            if (e.target === e.currentTarget) setVisible(false);
          }}
        >
          <div className="relative my-4 w-full max-w-lg border border-line bg-bg p-5 md:p-8">
            <button
              type="button"
              aria-label="Fechar"
              onClick={() => setVisible(false)}
              className="press absolute right-4 top-4 grid h-9 w-9 place-items-center text-ink-2 transition-colors hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {formStep === 1 && (
              <>
                <p className="pr-10 text-subtitulo text-ink">
                  Nos conte um pouco sobre sua operação.
                </p>
                <p className="mb-6 mt-3 max-w-measure text-corpo text-ink-2">
                  Queremos saber um pouquinho melhor sobre você e como sua
                  estrutura funciona.
                </p>
              </>
            )}
            <LeadForm formSlug="modal" onStepChange={setFormStep} />
          </div>
        </div>
      )}
    </LeadModalContext.Provider>
  );
}
