import { redirect } from "next/navigation";
import { NodeMark } from "@/components/NodeMark";
import { ThemeToggle } from "@/components/admin/ThemeToggle";
import { AdminLeads } from "@/components/admin/AdminLeads";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase";
import { signOut } from "@/app/(admin)/login/actions";
import { isAdmin } from "@/lib/admin-auth";
import type { Lead } from "@/lib/db-leads";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const sb = await supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user || !isAdmin(user.email)) redirect("/login");

  // Leitura via service_role (server, atrás do middleware). RLS não muda.
  const { data, error } = await supabaseAdmin
    .from("accyon_leads")
    .select("*")
    .order("created_at", { ascending: false });

  const leads = (data ?? []) as Lead[];

  return (
    <main className="min-h-[100dvh]">
      <header className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--surface)] px-6 py-3">
        <div className="flex items-center gap-2.5">
          <NodeMark size={20} />
          <span className="text-[0.9rem] font-semibold tracking-[0.14em] text-[var(--ink)]">
            PAINEL ACCYON
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-[0.8rem] text-[var(--ink-2)] sm:inline">
            {user.email}
          </span>
          <ThemeToggle />
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-[10px] border border-[var(--line-2)] px-3 py-1.5 text-[0.78rem] text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
            >
              Sair
            </button>
          </form>
        </div>
      </header>

      <div className="px-6 py-6">
        <h1 className="text-[1.4rem] font-bold tracking-[-0.01em] text-[var(--ink)]">
          Leads
        </h1>
        <p className="mt-1 text-[0.85rem] text-[var(--ink-2)]">
          Capturas dos formulários das landing pages.
        </p>

        {error ? (
          <p className="mt-8 rounded-[10px] bg-[var(--danger-bg)] px-4 py-3 text-[0.85rem] text-[var(--danger)]">
            Não foi possível carregar as leads: {error.message}
          </p>
        ) : (
          <AdminLeads leads={leads} />
        )}
      </div>
    </main>
  );
}
