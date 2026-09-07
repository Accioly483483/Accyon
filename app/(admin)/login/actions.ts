"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import { tokenFor } from "@/lib/captcha";
import { isAdmin } from "@/lib/admin-auth";

export interface LoginState {
  error?: string;
}

export async function signIn(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const answer = String(formData.get("answer") ?? "").trim();
  const token = String(formData.get("token") ?? "");

  if (!email || !password) return { error: "Preencha e-mail e senha." };
  if (!token || tokenFor(answer) !== token)
    return { error: "Resposta da conta incorreta." };

  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "E-mail ou senha inválidos." };

  // Projeto Supabase compartilhado: estar logado não basta, tem que estar na allowlist.
  if (!isAdmin(email)) {
    await supabase.auth.signOut();
    return { error: "Este e-mail não tem acesso ao painel." };
  }

  redirect("/admin");
}

export async function signOut(): Promise<void> {
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  redirect("/login");
}
