import { AdminKanban } from "@/components/admin/AdminKanban";
import { requireAdmin } from "@/lib/require-admin";
import { listLeads } from "@/lib/db-leads";

export const dynamic = "force-dynamic";

export default async function KanbanPage() {
  await requireAdmin();
  const { leads, error } = await listLeads();

  return (
    <>
      <h1 className="text-[1.4rem] font-bold tracking-[-0.01em] text-[var(--ink)]">
        Kanban
      </h1>
      <p className="mt-1 text-[0.85rem] text-[var(--ink-2)]">
        Funil das leads. Arraste o card ou troque a etapa no seletor.
      </p>

      {error ? (
        <p className="mt-8 rounded-[10px] bg-[var(--danger-bg)] px-4 py-3 text-[0.85rem] text-[var(--danger)]">
          Não foi possível carregar as leads: {error.message}
        </p>
      ) : (
        <AdminKanban leads={leads} />
      )}
    </>
  );
}
