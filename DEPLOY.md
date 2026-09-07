# Deploy — Accyon

## Variáveis de ambiente (Vercel → Project → Settings → Environment Variables)

Copiar de `.env.local`. Marcar para **Production, Preview e Development**.

| Variável | Origem | Obrigatória |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | sim |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API (`anon` `public`) | sim |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API (`service_role` `secret`) — **secreta** | sim |
| `NEXT_PUBLIC_SITE_URL` | `https://accyon.com.br` (domínio final) | sim |
| `ADMIN_EMAILS` | e-mails com acesso ao `/admin`, separados por vírgula | sim |
| `NEXT_PUBLIC_GA4_ID` | GA4 Measurement ID | não (fase 2) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID | não (fase 2) |
| `META_CAPI_TOKEN` | Meta Conversions API token | não (fase 2) |

Sem `NEXT_PUBLIC_SUPABASE_*` / `SUPABASE_SERVICE_ROLE_KEY` o build quebra.
Sem `ADMIN_EMAILS` o `/admin` bloqueia todo mundo.

## Passos

1. `vercel link` (uma vez) — vincula a pasta ao projeto Vercel.
2. Definir as variáveis acima (dashboard ou `vercel env add NOME preview production`).
3. **Preview:** `vercel deploy` → gera URL de preview (não é o domínio).
4. **Produção:** `vercel deploy --prod` → publica no domínio. **Só depois de**:
   - preencher CNPJ / endereço / e-mail do encarregado em `/privacidade` (+ revisão jurídica);
   - trocar WhatsApp e e-mail placeholder em `/contato` e no footer;
   - apontar `accyon.com.br` para a Vercel (Project → Domains).
5. Pós-launch: enviar `sitemap.xml` ao Google Search Console e ao Bing Webmaster Tools.

## Banco

O Supabase é **compartilhado** com outro app. Tabelas da Accyon têm prefixo `accyon_`.
Migração: `supabase/migrations/0001_accyon_leads.sql` (rodar no SQL Editor, uma vez — já feito).
Nunca tocar em `leads`, `agenda_blocos`, `respondentes`.

## Admin

`accioly483@gmail.com` já é usuário do Supabase Auth (conta compartilhada com outro app).
Entra no `/admin` com a senha atual dessa conta. Trocar a senha afeta o outro app.
Alternativa mais limpa: criar um usuário dedicado (ex. `suporte+accyon@...`) e pôr em `ADMIN_EMAILS`.

## Notas

- `/style-guide` é QA interno (`noindex`). Remover antes do launch se quiser.
- `/admin`, `/login`, `/api/*` já saem com `no-store` + `X-Robots-Tag: noindex`.
- Headers de segurança (HSTS, X-Frame-Options, etc.) em `next.config.ts`.
