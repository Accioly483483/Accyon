import { NodeMark } from "@/components/NodeMark";
import { ThemeToggle } from "@/components/admin/ThemeToggle";
import { AdminNav } from "@/components/admin/AdminNav";
import { signOut } from "@/app/(admin)/login/actions";
import { requireAdmin } from "@/lib/require-admin";

export default async function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const email = await requireAdmin();

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
            {email}
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

      <div className="md:flex">
        <AdminNav />
        <div className="min-w-0 flex-1 px-6 py-6">{children}</div>
      </div>
    </main>
  );
}
