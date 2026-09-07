-- Accyon · tabela de leads das landing pages (Fase 3)
-- Projeto Supabase COMPARTILHADO: por isso o prefixo accyon_. Não mexer nas
-- tabelas leads / agenda_blocos / respondentes (outro sistema, dados reais).
--
-- Rodar uma vez: Supabase Dashboard > SQL Editor > New query > colar tudo > Run.

create extension if not exists "pgcrypto";

create table if not exists public.accyon_leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  form_slug   text not null,                 -- home | infraestrutura-comercial | sistemas | ...
  nome        text,
  email       text,
  whatsapp    text,                          -- só dígitos
  empresa     text,
  servicos    text[] not null default '{}',  -- multi-select "quais serviços você busca"
  respostas   jsonb  not null default '{}',  -- campos específicos do form (ex.: melhoria)
  utms        jsonb  not null default '{}',  -- utm_source/medium/campaign/term/content
  metadata    jsonb  not null default '{}',  -- ip, geo, device, browser, os, screen, idioma
  status      text   not null default 'novo'
);

create index if not exists accyon_leads_created_at_idx  on public.accyon_leads (created_at desc);
create index if not exists accyon_leads_form_slug_idx   on public.accyon_leads (form_slug);
create index if not exists accyon_leads_email_lower_idx on public.accyon_leads (lower(email));

-- RLS ligado, sem policies: só a service_role (usada pelo /api/leads e, depois,
-- pelo painel admin no server) acessa. anon não lê nem escreve nada.
alter table public.accyon_leads enable row level security;

comment on table public.accyon_leads is 'Leads das landing pages da Accyon. Escrita via /api/leads (service role). Projeto Supabase compartilhado, daí o prefixo.';
