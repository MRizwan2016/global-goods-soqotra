-- Avoid recursive RLS by using a SECURITY DEFINER helper
create or replace function public.is_admin(_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = _user_id and p.is_admin = true
  );
$$;

-- Drop previous recursive policies if they exist
drop policy if exists "profiles_select_self" on public.profiles;
drop policy if exists "profiles_select_admin_all" on public.profiles;
drop policy if exists "profiles_insert_self" on public.profiles;
drop policy if exists "profiles_insert_admin_any" on public.profiles;
drop policy if exists "profiles_update_self" on public.profiles;
drop policy if exists "profiles_update_admin_all" on public.profiles;

-- Create non-recursive, combined policies
create policy "profiles_select"
  on public.profiles
  for select
  using (id = auth.uid() or public.is_admin(auth.uid()));

create policy "profiles_insert"
  on public.profiles
  for insert
  with check (id = auth.uid() or public.is_admin(auth.uid()));

create policy "profiles_update"
  on public.profiles
  for update
  using (id = auth.uid() or public.is_admin(auth.uid()))
  with check (id = auth.uid() or public.is_admin(auth.uid()));