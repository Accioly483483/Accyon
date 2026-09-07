"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Monitor,
  Download,
  Search,
  X,
  MapPin,
  Cpu,
  Globe,
  Tag,
} from "lucide-react";
import type { Lead } from "@/lib/db-leads";

const PAGE_SIZE = 25;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
const fmtPhone = (d: string) => {
  const n = String(d ?? "").replace(/\D/g, "");
  if (n.length === 11) return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
  if (n.length === 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return d;
};

type SortKey = "created_at" | "form_slug" | "nome" | "empresa";

export function AdminLeads({ leads }: { leads: Lead[] }) {
  const [q, setQ] = useState("");
  const [origem, setOrigem] = useState("");
  const [utmS, setUtmS] = useState("");
  const [utmM, setUtmM] = useState("");
  const [utmC, setUtmC] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [detail, setDetail] = useState<Lead | null>(null);

  const origens = useMemo(
    () => [...new Set(leads.map((l) => l.form_slug))].sort(),
    [leads],
  );

  const stats = useMemo(() => {
    const now = Date.now();
    const week = leads.filter(
      (l) => now - new Date(l.created_at).getTime() < 7 * 864e5,
    ).length;
    const porOrigem = new Map<string, number>();
    leads.forEach((l) =>
      porOrigem.set(l.form_slug, (porOrigem.get(l.form_slug) ?? 0) + 1),
    );
    return { total: leads.length, week, porOrigem: [...porOrigem].sort((a, b) => b[1] - a[1]) };
  }, [leads]);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    let r = leads.filter((l) => {
      if (origem && l.form_slug !== origem) return false;
      if (utmS && !(l.utms?.utm_source ?? "").toLowerCase().includes(utmS.toLowerCase()))
        return false;
      if (utmM && !(l.utms?.utm_medium ?? "").toLowerCase().includes(utmM.toLowerCase()))
        return false;
      if (utmC && !(l.utms?.utm_campaign ?? "").toLowerCase().includes(utmC.toLowerCase()))
        return false;
      if (t) {
        const hay = [l.nome, l.email, l.empresa, l.whatsapp]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(t)) return false;
      }
      return true;
    });
    r = [...r].sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      const cmp =
        sortKey === "created_at" ? av.localeCompare(bv) : av.localeCompare(bv, "pt-BR");
      return sortDir === "asc" ? cmp : -cmp;
    });
    return r;
  }, [leads, q, origem, utmS, utmM, utmC, sortKey, sortDir]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const cur = Math.min(page, pages - 1);
  const rows = filtered.slice(cur * PAGE_SIZE, cur * PAGE_SIZE + PAGE_SIZE);

  function toggleSort(k: SortKey) {
    if (k === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setSortDir(k === "created_at" ? "desc" : "asc");
    }
  }

  function clear() {
    setQ("");
    setOrigem("");
    setUtmS("");
    setUtmM("");
    setUtmC("");
    setPage(0);
  }

  function exportCsv() {
    const BOM = "﻿";
    const head = [
      "Nome",
      "Email",
      "WhatsApp",
      "Empresa",
      "Origem",
      "Servicos",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "Cidade",
      "Device",
      "Browser",
      "Criado em",
    ];
    const esc = (v: unknown) => {
      const s = String(v ?? "");
      return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const md = (l: Lead) => (l.metadata ?? {}) as Record<string, unknown>;
    const body = filtered
      .map((l) =>
        [
          l.nome,
          l.email,
          l.whatsapp,
          l.empresa,
          l.form_slug,
          (l.servicos ?? []).join(" | "),
          l.utms?.utm_source ?? "",
          l.utms?.utm_medium ?? "",
          l.utms?.utm_campaign ?? "",
          md(l).city ?? "",
          md(l).device ?? "",
          md(l).browser ?? "",
          fmtDateTime(l.created_at),
        ]
          .map(esc)
          .join(";"),
      )
      .join("\n");
    const blob = new Blob([BOM + head.join(";") + "\n" + body], {
      type: "text/csv;charset=utf-8",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `leads-accyon-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const input =
    "rounded-[8px] border border-[var(--line-2)] bg-[var(--surface)] px-3 py-2 text-[0.82rem] text-[var(--ink)] outline-none focus:border-[var(--sinal)]";

  return (
    <div className="mt-6">
      {/* stats */}
      <div className="flex flex-wrap items-center gap-3">
        <Stat label="Total" value={stats.total} />
        <Stat label="Últimos 7 dias" value={stats.week} />
        <div className="flex flex-wrap gap-1.5">
          {stats.porOrigem.map(([k, v]) => (
            <span
              key={k}
              className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-[0.72rem] text-[var(--ink-2)]"
            >
              {k} <b className="text-[var(--ink)]">{v}</b>
            </span>
          ))}
        </div>
      </div>

      {/* filtros */}
      <div className="mt-5 flex flex-wrap items-center gap-2 rounded-[12px] border border-[var(--line)] bg-[var(--surface)] p-3">
        <div className="relative">
          <Search
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--ink-3)]"
          />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(0);
            }}
            placeholder="Buscar nome, e-mail, empresa, WhatsApp"
            className={`${input} w-64 pl-8`}
          />
        </div>
        <select
          value={origem}
          onChange={(e) => {
            setOrigem(e.target.value);
            setPage(0);
          }}
          className={input}
        >
          <option value="">Todas as origens</option>
          {origens.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <input
          value={utmS}
          onChange={(e) => setUtmS(e.target.value)}
          placeholder="utm_source"
          className={`${input} w-32`}
        />
        <input
          value={utmM}
          onChange={(e) => setUtmM(e.target.value)}
          placeholder="utm_medium"
          className={`${input} w-32`}
        />
        <input
          value={utmC}
          onChange={(e) => setUtmC(e.target.value)}
          placeholder="utm_campaign"
          className={`${input} w-36`}
        />
        <button
          onClick={clear}
          className="rounded-[8px] px-2.5 py-2 text-[0.78rem] text-[var(--ink-2)] hover:text-[var(--ink)]"
        >
          Limpar
        </button>
        <button
          onClick={exportCsv}
          className="ml-auto flex items-center gap-1.5 rounded-[8px] border border-[var(--line-2)] px-3 py-2 text-[0.78rem] text-[var(--ink)] hover:bg-[var(--surface-2)]"
        >
          <Download size={14} /> CSV
        </button>
      </div>

      {/* tabela */}
      <div className="mt-4 overflow-x-auto rounded-[12px] border border-[var(--line)]">
        <table className="w-full border-collapse text-[0.82rem]">
          <thead>
            <tr className="border-b border-[var(--line-2)] text-left text-[var(--ink-2)]">
              <Th onClick={() => toggleSort("created_at")} active={sortKey === "created_at"} dir={sortDir}>
                Data
              </Th>
              <Th onClick={() => toggleSort("form_slug")} active={sortKey === "form_slug"} dir={sortDir}>
                Origem
              </Th>
              <Th onClick={() => toggleSort("nome")} active={sortKey === "nome"} dir={sortDir}>
                Nome
              </Th>
              <Th onClick={() => toggleSort("empresa")} active={sortKey === "empresa"} dir={sortDir}>
                Empresa
              </Th>
              <th className="px-3 py-2.5 font-medium">E-mail</th>
              <th className="px-3 py-2.5 font-medium">WhatsApp</th>
              <th className="px-3 py-2.5 font-medium">Serviços</th>
              <th className="px-3 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-10 text-center text-[var(--ink-2)]">
                  Nenhuma lead com esses filtros.
                </td>
              </tr>
            )}
            {rows.map((l) => (
              <tr
                key={l.id}
                className="border-b border-[var(--line)] last:border-0 hover:bg-[var(--surface-2)]"
              >
                <td className="whitespace-nowrap px-3 py-2.5 text-[var(--ink-2)]">
                  {fmtDate(l.created_at)}
                </td>
                <td className="px-3 py-2.5">
                  <span className="rounded-[6px] bg-[var(--surface-3)] px-2 py-0.5 text-[0.72rem] text-[var(--ink-2)]">
                    {l.form_slug}
                  </span>
                </td>
                <td className="px-3 py-2.5 font-medium text-[var(--ink)]">{l.nome}</td>
                <td className="px-3 py-2.5 text-[var(--ink-2)]">{l.empresa}</td>
                <td className="px-3 py-2.5 text-[var(--ink-2)]">{l.email}</td>
                <td className="whitespace-nowrap px-3 py-2.5 text-[var(--ink-2)]">
                  {fmtPhone(l.whatsapp)}
                </td>
                <td className="px-3 py-2.5 text-[var(--ink-2)]">
                  {(l.servicos ?? []).length}
                </td>
                <td className="px-3 py-2.5 text-right">
                  <button
                    onClick={() => setDetail(l)}
                    aria-label="Inteligência técnica"
                    className="rounded-[8px] p-1.5 text-[var(--ink-3)] hover:bg-[var(--surface-3)] hover:text-[var(--ink)]"
                  >
                    <Monitor size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* paginação */}
      <div className="mt-3 flex items-center justify-between text-[0.78rem] text-[var(--ink-2)]">
        <span>
          {filtered.length === 0
            ? "0"
            : `${cur * PAGE_SIZE + 1}–${Math.min(
                (cur + 1) * PAGE_SIZE,
                filtered.length,
              )}`}{" "}
          de {filtered.length}
        </span>
        <div className="flex gap-2">
          <button
            disabled={cur === 0}
            onClick={() => setPage(cur - 1)}
            className="rounded-[8px] border border-[var(--line-2)] px-3 py-1.5 hover:text-[var(--ink)] disabled:opacity-40"
          >
            Anterior
          </button>
          <button
            disabled={cur >= pages - 1}
            onClick={() => setPage(cur + 1)}
            className="rounded-[8px] border border-[var(--line-2)] px-3 py-1.5 hover:text-[var(--ink)] disabled:opacity-40"
          >
            Próxima
          </button>
        </div>
      </div>

      {detail && <TechModal lead={detail} onClose={() => setDetail(null)} />}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5">
      <div className="text-[1.3rem] font-bold leading-none text-[var(--ink)]">
        {value}
      </div>
      <div className="mt-1 text-[0.7rem] uppercase tracking-wide text-[var(--ink-3)]">
        {label}
      </div>
    </div>
  );
}

function Th({
  children,
  onClick,
  active,
  dir,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  dir: "asc" | "desc";
}) {
  return (
    <th className="px-3 py-2.5 font-medium">
      <button
        onClick={onClick}
        className="flex items-center gap-1 hover:text-[var(--ink)]"
      >
        {children}
        <span className="text-[0.65rem]">{active ? (dir === "asc" ? "▲" : "▼") : ""}</span>
      </button>
    </th>
  );
}

function TechModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const m = (lead.metadata ?? {}) as Record<string, string>;
  const utms = Object.entries(lead.utms ?? {});
  const melhoria = (lead.respostas as Record<string, unknown>)?.melhoria as
    | string
    | undefined;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[85dvh] w-full max-w-[480px] overflow-y-auto rounded-[16px] border border-[var(--line-2)] bg-[var(--surface)] p-6 shadow-[var(--shadow-pop)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Inteligência técnica da lead"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[0.95rem] font-semibold text-[var(--ink)]">
              {lead.nome}
            </p>
            <p className="text-[0.78rem] text-[var(--ink-2)]">
              {lead.empresa} · {fmtDateTime(lead.created_at)}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-[8px] p-1 text-[var(--ink-3)] hover:text-[var(--ink)]"
          >
            <X size={18} />
          </button>
        </div>

        <Section icon={<MapPin size={14} />} title="Geolocalização">
          <p className="text-[var(--ink)]">{m.location || "—"}</p>
          <p className="text-[0.75rem] text-[var(--ink-3)]">IP {m.ip || "—"}</p>
        </Section>
        <Section icon={<Cpu size={14} />} title="Dispositivo">
          <p className="text-[var(--ink)]">
            {[m.os, m.device].filter(Boolean).join(" · ") || "—"}
          </p>
          <p className="text-[0.75rem] text-[var(--ink-3)]">
            {m.screenResolution || ""} {m.windowSize ? `· janela ${m.windowSize}` : ""}
          </p>
        </Section>
        <Section icon={<Globe size={14} />} title="Navegador">
          <p className="text-[var(--ink)]">
            {[m.browser, m.language].filter(Boolean).join(" · ") || "—"}
          </p>
        </Section>
        <Section icon={<Tag size={14} />} title="Origem (UTMs)">
          {utms.length === 0 ? (
            <p className="text-[var(--ink-3)]">acesso direto</p>
          ) : (
            utms.map(([k, v]) => (
              <p key={k} className="text-[0.8rem]">
                <span className="text-[var(--ink-3)]">{k}:</span>{" "}
                <span className="text-[var(--ink)]">{String(v)}</span>
              </p>
            ))
          )}
        </Section>
        <Section title="Serviços de interesse">
          <ul className="list-inside list-disc text-[var(--ink)]">
            {(lead.servicos ?? []).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Section>
        {melhoria && (
          <Section title="O que gostaria que fosse diferente">
            <p className="text-[var(--ink)]">{melhoria}</p>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 border-t border-[var(--line)] pt-4 first:mt-4">
      <h3 className="flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-[var(--ink-2)]">
        {icon}
        {title}
      </h3>
      <div className="mt-1.5 space-y-0.5 text-[0.85rem]">{children}</div>
    </div>
  );
}
