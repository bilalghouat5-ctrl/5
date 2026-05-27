-- RENT درايف - Supabase starter schema v6.7.18
-- نفّذ هذا الملف من Supabase SQL Editor قبل نشر المنصات الثلاث.
-- ملاحظة: هذه نسخة تشغيل أولية تربط التطبيق و AdminPanel و AgencyPortal.

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  username text unique,
  full_name text,
  phone text,
  role text not null default 'user' check (role in ('user','agency','agency_owner','admin','admin_staff')),
  agency_id text,
  permissions jsonb not null default '{}'::jsonb,
  status text not null default 'active',
  bookings_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agencies (
  id text primary key,
  name text not null,
  wilaya text not null default 'الجزائر',
  city text,
  rating numeric not null default 4.8,
  cars_count integer not null default 0,
  cars integer not null default 0,
  status text not null default 'pending' check (status in ('pending','approved','rejected','active','blocked','suspended')),
  phone text,
  whatsapp text,
  email text,
  address text,
  description text,
  img text,
  color text default '#7C3AED',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cars (
  id text primary key,
  agency_id text references public.agencies(id) on delete set null,
  agency_name text,
  name text not null,
  type text default 'sedan',
  price numeric not null default 0,
  rating numeric not null default 4.8,
  trips integer not null default 0,
  requests integer not null default 0,
  reviews integer not null default 0,
  year integer default 2024,
  seats integer default 5,
  wilaya text default 'الجزائر',
  city text,
  img text,
  image text,
  badge text,
  verified boolean default false,
  fuel text default 'بنزين',
  trans text default 'أوتوماتيك',
  free_cancel boolean default false,
  featured boolean default false,
  available boolean default true,
  status text not null default 'approved' check (status in ('pending','approved','available','unavailable','rejected','blocked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id text primary key,
  user_id uuid,
  user_name text,
  user_email text,
  agency_id text references public.agencies(id) on delete set null,
  agency_name text,
  car_id text references public.cars(id) on delete set null,
  car_name text,
  car_image text,
  wilaya text,
  pickup_date date,
  return_date date,
  days integer not null default 1,
  daily_price numeric not null default 0,
  base_price numeric not null default 0,
  platform_fee numeric not null default 0,
  total_price numeric not null default 0,
  old_display_price numeric not null default 0,
  pickup_place text,
  driver_name text,
  driver_phone text,
  driver_age text,
  payment_status text default 'عند الاستلام',
  status text not null default 'pending' check (status in ('pending','confirmed','active','done','completed','cancelled','rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id text primary key,
  agency_id text references public.agencies(id) on delete set null,
  agency_name text,
  user_id uuid,
  user_name text,
  user_email text,
  subject text,
  body text,
  direction text not null default 'user_to_agency' check (direction in ('user_to_agency','agency_to_user','admin_to_agency','agency_to_admin')),
  status text not null default 'pending' check (status in ('pending','active','read','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id text primary key,
  agency_id text references public.agencies(id) on delete set null,
  car_id text references public.cars(id) on delete set null,
  user_id uuid,
  user_name text,
  rating integer not null default 5,
  comment text,
  status text not null default 'approved',
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id text primary key,
  target_role text,
  target_id text,
  title text,
  body text,
  status text not null default 'unread',
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();

drop trigger if exists set_agencies_updated_at on public.agencies;
create trigger set_agencies_updated_at before update on public.agencies for each row execute function public.set_updated_at();

drop trigger if exists set_cars_updated_at on public.cars;
create trigger set_cars_updated_at before update on public.cars for each row execute function public.set_updated_at();

drop trigger if exists set_bookings_updated_at on public.bookings;
create trigger set_bookings_updated_at before update on public.bookings for each row execute function public.set_updated_at();

drop trigger if exists set_messages_updated_at on public.messages;
create trigger set_messages_updated_at before update on public.messages for each row execute function public.set_updated_at();

-- لا توجد بيانات وهمية أو حسابات تجريبية داخل schema.
-- أضف الوكالات والسيارات الحقيقية من AdminPanel أو Supabase بعد إنشاء الحسابات.


-- تحديثات v6.7.18 للحسابات باسم المستخدم والصلاحيات
alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists permissions jsonb not null default '{}'::jsonb;
create unique index if not exists profiles_username_unique_idx on public.profiles (lower(username)) where username is not null;

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('user','agency','agency_owner','admin','admin_staff'));

-- مثال profiles بعد إنشاء مستخدمين من Authentication:
-- 1) أنشئ مستخدم admin من Supabase Authentication UI، ثم استعمل user id مكان AUTH_ADMIN_UUID.
-- insert into public.profiles (id,email,username,full_name,role,status,permissions)
-- values ('AUTH_ADMIN_UUID','YOUR_ADMIN_EMAIL','YOUR_ADMIN_USERNAME','مدير المنصة','admin','active','{"agencies":true,"cars":true,"bookings":true,"messages":true,"users":true,"staff":true,"fees":true,"settings":true}'::jsonb)
-- on conflict (id) do update set username=excluded.username, role=excluded.role, permissions=excluded.permissions;
--
-- 2) أنشئ مستخدم صاحب وكالة من Authentication UI، ثم اربطه بمعرف الوكالة:
-- insert into public.profiles (id,email,username,full_name,role,agency_id,status)
-- values ('AUTH_AGENCY_UUID','YOUR_AGENCY_EMAIL','YOUR_AGENCY_USERNAME','صاحب الوكالة','agency','1','active')
-- on conflict (id) do update set username=excluded.username, agency_id=excluded.agency_id, role=excluded.role;


-- v6.7.18: إنشاء profile حقيقي تلقائياً عند تسجيل مستخدم جديد من التطبيق الرئيسي.
create or replace function public.handle_new_auth_user_profile()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, phone, role, status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'role', 'user'),
    'active'
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(nullif(excluded.full_name, ''), public.profiles.full_name),
    phone = coalesce(nullif(excluded.phone, ''), public.profiles.phone),
    updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.handle_new_auth_user_profile();

-- v6.7.19: بعد schema.sql شغّل أيضاً:
-- migration_v6_7_19_rd_platforms_pwa_subscriptions.sql
