"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/require-admin";
import { isLeadStatus } from "@/lib/lead-status";

export async function updateLeadStatus(
  id: string,
  status: string,
): Promise<{ error?: string }> {
  await requireAdmin();
  if (!isLeadStatus(status)) return { error: "Status inválido." };

  const { error } = await supabaseAdmin
    .from("accyon_leads")
    .update({ status })
    .eq("id", id);
  if (error) {
    console.error("[admin] updateLeadStatus:", error.message);
    return { error: "Não foi possível mover a lead." };
  }
  revalidatePath("/admin", "layout");
  return {};
}
