-- Create a proper profiles table linked to Supabase auth.users
create table if not exists public.profiles (
  id uuid not null primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  mobile_number text,
  country text,
  is_active boolean not null default true,
  is_admin boolean not null default false,
  permissions jsonb not null default '{
    "masterData": false,
    "dataEntry": true,
    "reports": true,
    "downloads": true,
    "accounting": true,
    "controlPanel": false,
    "cargoDelivery": true,
    "accountFunctions": true,
    "accountRegistrations": true,
    "accountFinancialEntities": true,
    "accountCountryReconciliations": true,
    "files": {}
  }'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Timestamps trigger
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql set search_path = public;

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Auto-create profile on auth signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill any existing auth users into profiles
insert into public.profiles (id, full_name, email)
select u.id,
       coalesce(u.raw_user_meta_data ->> 'full_name', split_part(u.email, '@', 1)) as full_name,
       u.email
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);

-- RLS policies
-- Self can select; admins can select all
create policy "profiles_select_self" on public.profiles
for select using (id = auth.uid());

create policy "profiles_select_admin_all" on public.profiles
for select using (
  exists (
    select 1 from public.profiles me where me.id = auth.uid() and me.is_admin = true
  )
);

-- Self can insert; admins can insert any
create policy "profiles_insert_self" on public.profiles
for insert with check (id = auth.uid());

create policy "profiles_insert_admin_any" on public.profiles
for insert with check (
  exists (
    select 1 from public.profiles me where me.id = auth.uid() and me.is_admin = true
  )
);

-- Self can update; admins can update any
create policy "profiles_update_self" on public.profiles
for update using (id = auth.uid()) with check (id = auth.uid());

create policy "profiles_update_admin_all" on public.profiles
for update using (
  exists (
    select 1 from public.profiles me where me.id = auth.uid() and me.is_admin = true
  )
) with check (true);
