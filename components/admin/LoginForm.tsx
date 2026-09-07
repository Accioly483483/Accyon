"use client";

import { useActionState, useEffect, useState } from "react";
import { signIn, type LoginState } from "@/app/(admin)/login/actions";
import { NodeMark } from "@/components/NodeMark";

type Captcha = { a: number; b: number; token: string };

const field =
  "w-full rounded-[10px] border border-[var(--line-2)] bg-[var(--surface)] px-3.5 py-2.5 text-[0.9rem] text-[var(--ink)] outline-none transition-colors focus:border-[var(--sinal)] focus:shadow-[0_0_0_3px_var(--sinal-bg,transparent)]";
const label =
  "mb-1.5 block text-[0.75rem] font-medium text-[var(--ink-2)]";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, {});
  const [cap, setCap] = useState<Captcha | null>(null);

  const load = () =>
    fetch("/api/admin/captcha")
      .then((r) => r.json())
      .then(setCap)
      .catch(() => setCap(null));

  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    if (state.error) load();
  }, [state.error]);

  return (
    <form
      action={action}
      className="w-full max-w-[380px] rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center gap-2.5">
        <NodeMark size={22} />
        <span className="text-[0.95rem] font-semibold tracking-[0.14em] text-[var(--ink)]">
          PAINEL ACCYON
        </span>
      </div>
      <p className="mt-2 text-[0.85rem] text-[var(--ink-2)]">
        Acesso restrito à gestão das leads.
      </p>

      <div className="mt-7 space-y-4">
        <div>
          <label className={label} htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            autoFocus
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="answer">
            Quanto é {cap ? `${cap.a} + ${cap.b}` : "…"}?
          </label>
          <input
            id="answer"
            name="answer"
            inputMode="numeric"
            required
            autoComplete="off"
            className={field}
          />
          <input type="hidden" name="token" value={cap?.token ?? ""} />
        </div>
      </div>

      {state.error && (
        <p
          role="alert"
          className="mt-4 rounded-[8px] bg-[var(--danger-bg)] px-3 py-2 text-[0.8rem] text-[var(--danger)]"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !cap}
        className="mt-6 w-full rounded-[10px] bg-[var(--sinal)] py-2.5 text-[0.85rem] font-semibold text-[var(--sinal-fg)] transition-[opacity,transform] hover:opacity-95 active:scale-[0.99] disabled:opacity-50"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
