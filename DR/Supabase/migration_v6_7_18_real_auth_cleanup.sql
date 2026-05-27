-- Migration v6.7.18: real Supabase auth cleanup, no demo accounts or seed data.
-- شغّل هذا الملف بعد migration v6.7.16 إذا كنت لا تريد حسابات أو بيانات تجريبية.

-- حذف بيانات البداية التجريبية السابقة إن كانت موجودة من النسخ القديمة.
delete from public.cars where id in ('101','102');
delete from public.agencies where id in ('1','2');

-- التأكد من وجود profile تلقائي لكل مستخدم يسجل من التطبيق الرئيسي.
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
