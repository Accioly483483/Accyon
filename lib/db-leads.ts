import { supabaseAdmin } from "./supabase";
import type { LeadMetadata } from "./metadata";

export interface LeadInput {
  form_slug: string;
  nome: string;
  email: string;
  whatsapp: string; // só dígitos
  empresa: string;
  servicos: string[];
  respostas: Record<string, unknown>;
  utms: Record<string, string>;
  metadata: LeadMetadata;
}

export interface Lead extends LeadInput {
  id: string;
  created_at: string;
  status: string;
}

/**
 * Dedup escopo-consciente: o mesmo lead pode enviar formulários diferentes
 * (form_slug diferente), mas não o mesmo formulário duas vezes.
 * Retorna o lead existente se achar, senão null.
 */
export async function findDuplicate(
  formSlug: string,
  email: string,
  whatsappDigits: string,
): Promise<Lead | null> {
  const normEmail = email.trim().toLowerCase();
  const { data, error } = await supabaseAdmin
    .from("accyon_leads")
    .select("*")
    .eq("form_slug", formSlug)
    .or(`email.ilike.${normEmail},whatsapp.eq.${whatsappDigits}`)
    .limit(1);

  if (error) {
    console.error("[db-leads] findDuplicate:", error.message);
    return null; // não bloqueia o envio por falha na checagem
  }
  return (data?.[0] as Lead) ?? null;
}

export async function saveLead(input: LeadInput): Promise<Lead> {
  const { data, error } = await supabaseAdmin
    .from("accyon_leads")
    .insert(input)
    .select("*")
    .single();

  if (error) {
    console.error("[db-leads] saveLead:", error.message);
    throw new Error("Não foi possível salvar. Tente novamente.");
  }
  return data as Lead;
}
