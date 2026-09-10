-- Lux Calyra — schema inicial (produtos + marcas)
-- Rode este arquivo inteiro no SQL Editor do Supabase (Project > SQL Editor > New query).

create table if not exists brands (
  slug text primary key,
  name text not null,
  description text,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id text primary key,
  slug text unique not null,
  name text not null,
  brand_slug text references brands(slug) on delete set null,
  gender text not null check (gender in ('masculino', 'feminino', 'unissex')),
  category text not null check (category in ('perfume', 'body-splash', 'creme-corporal', 'decant')),
  volume_ml integer not null default 0,
  price numeric(10, 2) not null,
  sale_price numeric(10, 2),
  short_description text,
  description text,
  main_image text not null,
  gallery jsonb not null default '[]',
  olfactive_family text,
  top_notes jsonb not null default '[]',
  heart_notes jsonb not null default '[]',
  base_notes jsonb not null default '[]',
  main_accords jsonb not null default '[]',
  sensations jsonb not null default '[]',
  occasions jsonb not null default '[]',
  dna jsonb,
  intensity text check (intensity in ('suave', 'moderada', 'marcante', 'muito intensa')),
  longevity text check (longevity in ('curta', 'moderada', 'longa', 'muito longa')),
  projection text check (projection in ('intima', 'moderada', 'forte', 'muito forte')),
  inspired_by text,
  featured boolean not null default false,
  is_new boolean not null default false,
  is_bestseller boolean not null default false,
  is_special_edit boolean not null default false,
  is_decant boolean not null default false,
  related_products jsonb not null default '[]',
  in_stock boolean not null default true,
  needs_admin_review boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on products (category);
create index if not exists products_brand_slug_idx on products (brand_slug);

-- RLS: leitura pública (o catálogo é público), escrita só para usuários autenticados (o admin).
alter table brands enable row level security;
alter table products enable row level security;

create policy "brands_public_read" on brands for select using (true);
create policy "brands_admin_write" on brands for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "products_public_read" on products for select using (true);
create policy "products_admin_write" on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Mantém updated_at em dia automaticamente.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger brands_set_updated_at before update on brands
  for each row execute function set_updated_at();

create trigger products_set_updated_at before update on products
  for each row execute function set_updated_at();

-- Storage: buckets públicos para imagens de produto e de marca, upload restrito a autenticados.
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('brands', 'brands', true)
on conflict (id) do nothing;

create policy "products_bucket_public_read" on storage.objects for select
  using (bucket_id = 'products');
create policy "products_bucket_admin_write" on storage.objects for insert
  with check (bucket_id = 'products' and auth.role() = 'authenticated');
create policy "products_bucket_admin_update" on storage.objects for update
  using (bucket_id = 'products' and auth.role() = 'authenticated');
create policy "products_bucket_admin_delete" on storage.objects for delete
  using (bucket_id = 'products' and auth.role() = 'authenticated');

create policy "brands_bucket_public_read" on storage.objects for select
  using (bucket_id = 'brands');
create policy "brands_bucket_admin_write" on storage.objects for insert
  with check (bucket_id = 'brands' and auth.role() = 'authenticated');
create policy "brands_bucket_admin_update" on storage.objects for update
  using (bucket_id = 'brands' and auth.role() = 'authenticated');
create policy "brands_bucket_admin_delete" on storage.objects for delete
  using (bucket_id = 'brands' and auth.role() = 'authenticated');
