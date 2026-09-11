"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { NodeMark } from "./NodeMark";
import { getUtms } from "@/lib/utms";
import { scrollInputIntoView } from "@/lib/mobile-utils";
import { track, trackLead } from "@/lib/tracking";

/* Formulário multi-step de captação. Padrão testado (construcao_da_estrutura_dos_
   formularios_pra_LP.md): arquivo único, useState, CSS animations, correções de
   teclado mobile, dedup no servidor. Todos os campos obrigatórios. */

export const SERVICOS_PADRAO = [
  "Infraestrutura comercial completa",
  "Construção de sistemas",
  "Atendimento automatizado",
  "Gestão de automações",
  "Criação de sites, páginas e Bio (Instagram)",
];

const TOTAL = 6;

interface FormData {
  nome: string;
  whatsapp: string; // dígitos
  empresa: string;
  email: string;
  servicos: string[];
  melhoria: string;
}

const EMPTY: FormData = {
  nome: "",
  whatsapp: "",
  empresa: "",
  email: "",
  servicos: [],
  melhoria: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function LeadForm({
  formSlug,
  servicos = SERVICOS_PADRAO,
  redirectUrl,
  onStepChange,
}: {
  formSlug: string;
  servicos?: string[];
  redirectUrl?: string;
  onStepChange?: (step: number) => void;
}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(EMPTY);
  const [utms, setUtms] = useState<Record<string, string>>({});
  const [meta, setMeta] = useState<Record<string, unknown>>({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    setUtms(getUtms());
    setMeta({
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      windowSize: `${window.innerWidth}x${window.innerHeight}`,
    });
  }, []);

  useEffect(() => {
    if (!started.current && step === 1) {
      started.current = true;
      track("form_start", { formSlug });
    }
  }, [step, formSlug]);

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  useEffect(() => {
    if (step > TOTAL && redirectUrl) {
      const t = setTimeout(() => {
        window.location.href = redirectUrl;
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [step, redirectUrl]);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function validate(s: number): string {
    if (s === 1 && (!data.nome.trim() || data.nome.trim().split(/\s+/).length < 2))
      return "Digite nome e sobrenome.";
    if (s === 2) {
      const d = data.whatsapp.replace(/\D/g, "");
      if (d.length < 10 || d.length > 11)
        return "Digite DDD + número (ex.: 21999999999).";
    }
    if (s === 3 && !data.empresa.trim()) return "Preencha o nome da empresa.";
    if (s === 4 && !EMAIL_RE.test(data.email.trim()))
      return "Digite um e-mail válido.";
    if (s === 5 && data.servicos.length === 0)
      return "Marque pelo menos um serviço.";
    if (s === 6 && data.melhoria.trim().length < 3)
      return "Conte em uma frase o que você mudaria.";
    return "";
  }

  function next() {
    const msg = validate(step);
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    if (step < TOTAL) {
      track("form_step", { formSlug, step: step + 1 });
      setStep(step + 1);
    } else {
      void submit();
    }
  }

  function prev() {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  }

  function onEnter(e: KeyboardEvent) {
    if (e.key === "Enter" && !(e.target as HTMLElement).matches("textarea")) {
      e.preventDefault();
      next();
    }
  }

  function toggleServico(s: string) {
    setError("");
    set(
      "servicos",
      data.servicos.includes(s)
        ? data.servicos.filter((x) => x !== s)
        : [...data.servicos, s],
    );
  }

  async function submit() {
    if (validate(6)) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_slug: formSlug,
          nome: data.nome.trim(),
          email: data.email.trim(),
          whatsapp: data.whatsapp.replace(/\D/g, ""),
          empresa: data.empresa.trim(),
          servicos: data.servicos,
          respostas: { melhoria: data.melhoria.trim() },
          utms,
          metadata: meta,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erro ao enviar.");
      trackLead({ eventId: json._eventId, formSlug });
      setStep(TOTAL + 1);
    } catch (err) {
      track("form_error", { formSlug });
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro. Tente novamente.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const progress = useMemo(
    () => ((Math.min(step, TOTAL) - 1) / TOTAL) * 100,
    [step],
  );

  const inputCls =
    "w-full border border-line-2 bg-surface p-4 text-corpo text-ink outline-none transition-colors focus:border-sinal";

  if (step > TOTAL) {
    return (
      <div className="animate-step-in py-10 text-center">
        <NodeMark size={36} className="mx-auto" />
        <p className="mx-auto mt-6 max-w-[28ch] text-subtitulo text-ink">
          Recebemos sua operação. Agora vamos entender onde ela pode avançar.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="h-0.5 w-full overflow-hidden bg-line">
          <div
            className="h-full bg-sinal transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="mono mt-2 block text-eyebrow uppercase text-ink-2">
          Etapa {step} / {TOTAL}
        </span>
      </div>

      <div key={step} className="animate-step-in">
        {step === 1 && (
          <TextStep
            question="Qual o seu nome completo?"
            value={data.nome}
            onChange={(v) => set("nome", v)}
            onEnter={onEnter}
            placeholder="Nome e sobrenome"
            autoComplete="name"
            className={inputCls}
          />
        )}

        {step === 2 && (
          <div>
            <Question>Qual o seu WhatsApp?</Question>
            <div className="flex">
              <span className="mono flex items-center border border-r-0 border-line-2 bg-surface px-4 text-legenda text-ink-2">
                🇧🇷 +55
              </span>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                autoFocus
                value={maskPhone(data.whatsapp)}
                onChange={(e) => set("whatsapp", e.target.value.replace(/\D/g, ""))}
                onFocus={scrollInputIntoView}
                onKeyDown={onEnter}
                placeholder="(21) 99999-9999"
                aria-label="Qual o seu WhatsApp?"
                aria-required="true"
                className={`${inputCls} mono border-l-0`}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <TextStep
            question="Qual empresa você representa?"
            value={data.empresa}
            onChange={(v) => set("empresa", v)}
            onEnter={onEnter}
            placeholder="Nome da empresa"
            autoComplete="organization"
            className={inputCls}
          />
        )}

        {step === 4 && (
          <TextStep
            question="Qual o seu melhor e-mail?"
            type="email"
            value={data.email}
            onChange={(v) => set("email", v)}
            onEnter={onEnter}
            placeholder="voce@empresa.com.br"
            autoComplete="email"
            className={inputCls}
          />
        )}

        {step === 5 && (
          <div>
            <Question>Quais serviços você busca?</Question>
            <p className="mb-6 text-legenda text-ink-2">
              Marque pelo menos um. Pode marcar mais de um.
            </p>
            <div className="space-y-3">
              {servicos.map((s) => {
                const on = data.servicos.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleServico(s)}
                    aria-pressed={on}
                    className={`flex w-full items-center justify-between gap-3 border bg-surface p-4 text-left text-corpo transition-colors ${
                      on ? "border-sinal text-ink" : "border-line-2 text-ink-2 hover:text-ink"
                    }`}
                  >
                    <span>{s}</span>
                    <span
                      className={`grid h-[18px] w-[18px] flex-none place-items-center border ${
                        on ? "border-sinal" : "border-line-2"
                      }`}
                    >
                      {on && <span className="h-2.5 w-2.5 bg-sinal" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <Question>
              O que você gostaria que fosse diferente em seu processo?
            </Question>
            <textarea
              autoFocus
              value={data.melhoria}
              onChange={(e) => set("melhoria", e.target.value)}
              onFocus={scrollInputIntoView}
              placeholder="Escreva com suas palavras."
              aria-label="O que você gostaria que fosse diferente em seu processo?"
              aria-required="true"
              rows={5}
              className={`${inputCls} resize-y`}
            />
          </div>
        )}

        {error && (
          <p
            id="lead-form-error"
            role="alert"
            className="mono mt-4 text-legenda text-danger"
          >
            {error}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={prev}
              className="press border border-line-2 px-6 py-4 font-mono text-eyebrow uppercase tracking-[0.16em] text-ink-2 transition-colors hover:text-ink"
            >
              Voltar
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={submitting}
            className="press flex-1 border border-sinal bg-sinal px-6 py-4 font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-bg transition-colors hover:bg-sinal-hover disabled:opacity-60 sm:flex-none"
          >
            {step === TOTAL
              ? submitting
                ? "Enviando..."
                : "Enviar para análise"
              : "Avançar"}
          </button>
        </div>

        {step === TOTAL && (
          <p className="mt-6 text-legenda text-ink-2">
            Suas respostas serão usadas apenas para entender o contexto da sua
            operação. Veja a{" "}
            <a
              href="/privacidade"
              className="text-sinal underline underline-offset-4"
            >
              política de privacidade
            </a>
            .
          </p>
        )}
      </div>
    </div>
  );
}

/* ---- subcomponentes inline ---- */

function Question({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-6 text-subtitulo text-ink">{children}</h3>;
}

function TextStep({
  question,
  value,
  onChange,
  onEnter,
  placeholder,
  autoComplete,
  type = "text",
  className,
}: {
  question: string;
  value: string;
  onChange: (v: string) => void;
  onEnter: (e: KeyboardEvent) => void;
  placeholder: string;
  autoComplete: string;
  type?: "text" | "email";
  className?: string;
}) {
  return (
    <div>
      <Question>{question}</Question>
      <input
        type={type}
        inputMode={type === "email" ? "email" : "text"}
        autoComplete={autoComplete}
        autoCapitalize={type === "email" ? "off" : undefined}
        autoCorrect="off"
        spellCheck={false}
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={scrollInputIntoView}
        onKeyDown={onEnter}
        placeholder={placeholder}
        aria-label={question}
        aria-required="true"
        className={className}
      />
    </div>
  );
}
