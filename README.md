# Accyon

Site institucional/comercial (landing pages) + painel admin de leads.

- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v3 · Supabase · Vercel
- **LPs:** identidade do Accyon Brand Book (dark, Space Grotesk + IBM Plex Mono, Azul de Sinal). Multi-step forms.
- **Painel admin (`/login`, `/admin`):** design system v4 (dual-mode dark/light, OKLCH), gestão das leads capturadas nas LPs.

## Rodar local

```bash
npm install
cp .env.example .env.local   # e preencher as chaves do Supabase
npm run dev
```

## Documentação de referência

Regras de design, copy e formulários ficam em `../Estruturação/` (fora deste repo):

- `Regras gerais da id visual - MD/design-landingpage-mauriciothomas-tlbc.md`
- `identidade visual - LP/Brandbook/Accyon Brand Book.dc.html`
- `identidade visual - Painel admin/ID visual all black e all white (switch) - painel-admin-design-system-v4 (1).md`
- `estrutura tecnica dos formularios/construcao_da_estrutura_dos_formularios_pra_LP.md`
- `estrutura geral da copy da home e dos serviços especificos/Copy - site - Accyon.docx`
- `SEO e GEO/prompt-mestre-seo-geo-accyon.md`

## Fases

0. Fundação (base Next + Tailwind) — **feito**
1. Design system das LPs — **feito**
2. Home — **feito**
3. Infra de formulários + Supabase (`accyon_leads`) — **feito**
4. 5 LPs de serviço — **feito**
5. Contato + institucionais (glossário, privacidade) — **feito**
6. Camada SEO/GEO (JSON-LD, robots, sitemap, llms.txt) — **feito**
7. Performance (PageSpeed/GTmetrix)
8. Painel admin
9. Entrega

Sem blog: escopo removido pelo usuário na Fase 6.
