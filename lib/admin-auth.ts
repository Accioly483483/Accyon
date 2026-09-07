/**
 * O Supabase é compartilhado com outros apps, então "estar logado" não basta.
 * Só e-mails listados em ADMIN_EMAILS acessam o painel.
 */
const LIST = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return LIST.includes(email.trim().toLowerCase());
}
