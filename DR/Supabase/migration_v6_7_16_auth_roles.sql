-- Migration v6.7.16: username login, agency owner account, admin subaccounts permissions
alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists permissions jsonb not null default '{}'::jsonb;
create unique index if not exists profiles_username_unique_idx on public.profiles (lower(username)) where username is not null;
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('user','agency','agency_owner','admin','admin_staff'));
