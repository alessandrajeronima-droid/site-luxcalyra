-- Lux Calyra — estoque numérico + conteúdo editável do site
-- Rode este arquivo inteiro no SQL Editor do Supabase (Project > SQL Editor > New query).

-- 1) Quantidade de estoque por produto.
alter table products add column if not exists stock_quantity integer not null default 0;

-- Backfill: como nunca tivemos contagem real, produtos já marcados como "em estoque"
-- recebem um valor provisório alto para não sumirem do site. É um placeholder técnico,
-- não uma contagem real — os números de verdade precisam ser preenchidos no admin.
update products set stock_quantity = 999 where in_stock = true and stock_quantity = 0;

-- 2) Conteúdo editável do site (textos/imagens de home, heros de categoria, páginas institucionais).
create table if not exists site_content (
  key text primary key,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

alter table site_content enable row level security;

create policy "site_content_public_read" on site_content for select using (true);
create policy "site_content_admin_write" on site_content for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create trigger site_content_set_updated_at before update on site_content
  for each row execute function set_updated_at();
