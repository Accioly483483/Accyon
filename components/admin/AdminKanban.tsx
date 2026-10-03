"use client";

import { useState, useTransition } from "react";
import type { Lead } from "@/lib/db-leads";
import { LEAD_STATUSES, statusOf, type LeadStatus } from "@/lib/lead-status";
import { updateLeadStatus } from "@/app/(admin)/admin/actions";
import { TechModal, fmtPhone } from "./AdminLeads";

export function AdminKanban({ leads: initial }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initial);
  const [detail, setDetail] = useState<Lead | null>(null);
  const [over, setOver] = useState<LeadStatus | null>(null);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  // Otimista: move na tela na hora; se o servidor recusar, volta.
  function move(id: string, to: LeadStatus) {
    const prev = leads.find((l) => l.id === id);
    if (!prev || statusOf(prev.status) === to) return;
    setError("");
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status: to } : l)));
    startTransition(async () => {
      const res = await updateLeadStatus(id, to);
      if (res.error) {
        setLeads((ls) =>
          ls.map((l) => (l.id === id ? { ...l, status: prev.status } : l)),
        );
        setError(res.error);
      }
    });
  }

  return (
    <div className="mt-6">
      {error && (
        <p className="mb-4 rounded-[10px] bg-[var(--danger-bg)] px-4 py-3 text-[0.85rem] text-[var(--danger)]">
          {error}
        </p>
      )}

      <div className="flex gap-3 overflow-x-auto pb-3">
        {LEAD_STATUSES.map((col) => {
          const cards = leads.filter((l) => statusOf(l.status) === col.value);
          return (
            <section
              key={col.value}
              aria-label={col.label}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(col.value);
              }}
              onDragLeave={() => setOver(null)}
              onDrop={(e) => {
                e.preventDefault();
                setOver(null);
                move(e.dataTransfer.getData("text/plain"), col.value);
              }}
              className={`flex w-64 shrink-0 flex-col rounded-[12px] border bg-[var(--surface)] transition-colors ${
                over === col.value
                  ? "border-[var(--sinal)]"
                  : "border-[var(--line)]"
              }`}
            >
              <header className="flex items-center justify-between border-b border-[var(--line)] px-3 py-2.5">
                <h2 className="text-[0.78rem] font-semibold uppercase tracking-wide text-[var(--ink-2)]">
                  {col.label}
                </h2>
                <span className="rounded-full bg-[var(--surface-3)] px-2 py-0.5 text-[0.7rem] text-[var(--ink-2)]">
                  {cards.length}
                </span>
              </header>

              <div className="flex min-h-24 flex-col gap-2 p-2">
                {cards.map((l) => (
                  <article
                    key={l.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", l.id)}
                    className="cursor-grab rounded-[10px] border border-[var(--line-2)] bg-[var(--surface-2)] p-3 shadow-[var(--shadow-card)] active:cursor-grabbing"
                  >
                    <button
                      onClick={() => setDetail(l)}
                      className="block w-full text-left"
                    >
                      <p className="text-[0.85rem] font-medium text-[var(--ink)]">
                        {l.nome}
                      </p>
                      <p className="text-[0.75rem] text-[var(--ink-2)]">
                        {l.empresa}
                      </p>
                      <p className="mt-1 text-[0.72rem] text-[var(--ink-3)]">
                        {fmtPhone(l.whatsapp)} ·{" "}
                        {new Date(l.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </button>
                    <select
                      value={statusOf(l.status)}
                      onChange={(e) => move(l.id, e.target.value as LeadStatus)}
                      aria-label={`Etapa de ${l.nome}`}
                      className="mt-2 w-full rounded-[6px] border border-[var(--line-2)] bg-[var(--surface)] px-2 py-1 text-[0.75rem] text-[var(--ink-2)] outline-none focus:border-[var(--sinal)]"
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {detail && <TechModal lead={detail} onClose={() => setDetail(null)} />}
    </div>
  );
}
