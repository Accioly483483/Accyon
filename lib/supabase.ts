import { createClient } from "@supabase/supabase-js";

/**
 * Cliente admin do Supabase. SERVER-ONLY: usa a service_role key, ignora RLS.
 * Nunca importar isto em componente de cliente.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  // Falha cedo e claro em vez de erro obscuro no primeiro insert.
  throw new Error(
    "Supabase: defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local",
  );
}

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
