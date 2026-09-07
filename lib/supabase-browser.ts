import { createBrowserClient } from "@supabase/ssr";

/** Cliente Supabase para componentes de cliente do painel (login). */
export function supabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
