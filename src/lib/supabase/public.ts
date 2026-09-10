import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase para leitura pública do catálogo (produtos/marcas), sem depender de
 * cookies/sessão. Seguro para usar em qualquer contexto, incluindo generateStaticParams,
 * onde next/headers `cookies()` não está disponível. As tabelas de catálogo têm RLS de
 * leitura pública (`for select using (true)`), então autenticação nunca é necessária aqui.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
