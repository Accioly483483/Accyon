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

const SOLUCOES = [
  "Construção completa de ecossistema Comercial / Operacional",
  "Desenvolvimento de Softwares (CRMs, Painéis de Estoque e Vendas, Esteiras Operacionais)",
  "Criação de Dashboards (Análise de Dados)",
  "Construção de Sites, Páginas e Bio",
  "Formulários interativos",
  "Fluxos de conversa",
  "Atendimento automatizado",
  "Disparos de mensagem - Whatsapp",
  "Follow-ups automatizados",
  "Gestão de automações",
  "Automações sob medida",
  "Fluxos de atendimento",
  "Disparos de Emails",
  "Criação de linhas editoriais",
  "Criação de assistentes IA",
];

const ABAS = [
  { id: "solucoes", rotulo: "Soluções", titulo: "Soluções", itens: SOLUCOES, colunas: false },
  { id: "nichos", rotulo: "Nichos", titulo: "Nichos atendidos", itens: NICHOS, colunas: true },
];

export function SolucoesNichosModal() {
  const [open, setOpen] = useState(false);
  const [aba, setAba] = useState(0);
  const atual = ABAS[aba];

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
        Soluções e nichos
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-bg/90 p-4 backdrop-blur sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Soluções e nichos"
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
            <div role="tablist" aria-label="Soluções ou nichos" className="mr-12 inline-flex border border-line">
              {ABAS.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  role="tab"
                  aria-selected={i === aba}
                  onClick={() => setAba(i)}
                  className={`press px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] transition-colors ${
                    i === aba ? "bg-sinal text-bg" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {a.rotulo}
                </button>
              ))}
            </div>
            <p className="mt-6 text-subtitulo text-ink">{atual.titulo}</p>
            <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
              <ul key={atual.id} className={`grid gap-3 ${atual.colunas ? "sm:grid-cols-2" : ""}`}>
                {atual.itens.map((n) => (
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
