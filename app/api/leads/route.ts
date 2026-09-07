import { NextResponse, type NextRequest } from "next/server";
import { buildLeadMetadata } from "@/lib/metadata";
import { findDuplicate, saveLead } from "@/lib/db-leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad("Corpo inválido.");
  }

  const formSlug = String(body.form_slug ?? "").trim();
  const nome = String(body.nome ?? "").trim();
  const email = String(body.email ?? "").trim();
  const whatsappRaw = String(body.whatsapp ?? "");
  const empresa = String(body.empresa ?? "").trim();
  const servicos = Array.isArray(body.servicos)
    ? (body.servicos as unknown[]).map(String).filter(Boolean)
    : [];
  const respostas =
    body.respostas && typeof body.respostas === "object"
      ? (body.respostas as Record<string, unknown>)
      : {};
  const utms =
    body.utms && typeof body.utms === "object"
      ? (body.utms as Record<string, string>)
      : {};
  const clientMeta =
    body.metadata && typeof body.metadata === "object"
      ? (body.metadata as Record<string, unknown>)
      : {};

  // Validação server-side (defesa em profundidade; todos os campos obrigatórios).
  if (!formSlug) return bad("Origem do formulário ausente.");
  if (!nome || nome.split(/\s+/).length < 2)
    return bad("Informe nome e sobrenome.");
  if (!EMAIL_RE.test(email)) return bad("E-mail inválido.");
  const whatsapp = whatsappRaw.replace(/\D/g, "");
  if (whatsapp.length < 10 || whatsapp.length > 13)
    return bad("WhatsApp inválido (DDD + número).");
  if (!empresa) return bad("Informe a empresa.");
  if (servicos.length === 0) return bad("Selecione ao menos um serviço.");
  const melhoria = String(
    (respostas as Record<string, unknown>).melhoria ?? "",
  ).trim();
  if (melhoria.length < 3) return bad("Descreva o que gostaria que fosse diferente.");

  const metadata = buildLeadMetadata(clientMeta, request.headers);
  const eventId = crypto.randomUUID();

  // Dedup escopo-consciente: mesmo lead pode enviar outro formulário, não o mesmo.
  const dup = await findDuplicate(formSlug, email, whatsapp);
  if (dup) {
    return NextResponse.json(
      { ...dup, duplicate: true, _eventId: eventId },
      { status: 200 },
    );
  }

  try {
    const lead = await saveLead({
      form_slug: formSlug,
      nome,
      email,
      whatsapp,
      empresa,
      servicos,
      respostas: { ...respostas, melhoria },
      utms,
      metadata,
    });

    // Tracking server-side (CAPI) entra aqui na Fase 2 do plano, fire-and-forget.

    return NextResponse.json({ ...lead, _eventId: eventId }, { status: 201 });
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
