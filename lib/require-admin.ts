import { redirect } from "next/navigation";
import { supabaseServer } from "./supabase-server";
import { isAdmin } from "./admin-auth";

/** Server-only. Garante sessão de admin; senão manda pro /login. Devolve o e-mail. */
export async function requireAdmin(): Promise<string> {
  const sb = await supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user || !isAdmin(user.email)) redirect("/login");
  return user.email!;
}
