-- RENT درايف v6.7.19
-- ربط AdminPanel و AgencyPortal المعتمدين من RD مع المنصة الرسمية.
-- نفّذ الملف بعد schema.sql من Supabase SQL Editor.

alter table public.agencies add column if not exists owner_name text;
alter table public.agencies add column if not exists verified boolean default false;
alter table public.agencies add column if not exists featured boolean default false;
alter table public.agencies add column if not exists plan text default 'basic';
alter table public.agencies add column if not exists monthly_price numeric default 0;
alter table public.agencies add column if not exists subscription_months integer default 0;
alter table public.agencies add column if not exists subscription_start date;
alter table public.agencies add column if not exists subscription_end date;
alter table public.agencies add column if not exists renewal_request boolean default false;
alter table public.agencies add column if not exists renewal_months integer;
alter table public.agencies add column if not exists renewal_request_date timestamptz;

create table if not exists public.subscription_plans (
  id text primary key,
  name_ar text not null,
  name_fr text,
  name_en text,
  monthly_price numeric not null default 0,
  max_cars integer,
  featured_allowed boolean default false,
  active boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscription_renewal_requests (
  id text primary key,
  agency_id text references public.agencies(id) on delete cascade,
  requested_months integer not null default 1,
  monthly_price numeric default 0,
  status text not null default 'pending' check (status in ('pending','approved','rejected','cancelled')),
  admin_note text,
  requested_at timestamptz not null default now(),
  decided_at timestamptz
);

alter table public.messages add column if not exists thread_id text;
alter table public.messages add column if not exists attachment_url text;

create unique index if not exists profiles_username_unique_idx on public.profiles (lower(username)) where username is not null;
create index if not exists cars_agency_id_idx on public.cars (agency_id);
create index if not exists bookings_agency_id_idx on public.bookings (agency_id);
create index if not exists messages_agency_id_idx on public.messages (agency_id);
create index if not exists renewal_requests_agency_id_idx on public.subscription_renewal_requests (agency_id);

insert into public.subscription_plans (id,name_ar,name_fr,name_en,monthly_price,max_cars,featured_allowed)
values
  ('basic','Basic','Basic','Basic',3500,10,false),
  ('standard','Standard','Standard','Standard',5000,30,false),
  ('premium','Premium','Premium','Premium',8000,null,true)
on conflict (id) do update set
  name_ar=excluded.name_ar,
  name_fr=excluded.name_fr,
  name_en=excluded.name_en,
  monthly_price=excluded.monthly_price,
  max_cars=excluded.max_cars,
  featured_allowed=excluded.featured_allowed,
  updated_at=now();

-- لا تضف service_role داخل الواجهات. حسابات admin و agency تُنشأ من Supabase Auth ثم تُربط في profiles.
