// ─── Supabase Client / REST bridge ──────────────────────────────────────────
// كل المنصات تستعمل نفس المتغيرات في Vercel:
// VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY
const DEFAULT_SUPABASE_URL = ''; 
const DEFAULT_SUPABASE_ANON_KEY = ''; 

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_ANON_KEY;
export const SUPABASE_READY = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes('placeholder'));

const baseHeaders = {
  'Content-Type': 'application/json',
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

function jsonHeaders(token) {
  return {
    ...baseHeaders,
    Authorization: `Bearer ${token || getSession()?.access_token || SUPABASE_ANON_KEY}`,
  };
}

function safeJson(value, fallback = null) {
  try { return JSON.parse(value) ?? fallback; } catch { return fallback; }
}

function throwSupabase(data, fallback) {
  throw new Error(data?.error_description || data?.msg || data?.message || fallback);
}

// ─── Auth helpers ───────────────────────────────────────────────────────────
export async function signUp({ email, password, name, phone }) {
  if (!SUPABASE_READY) throw new Error('Supabase غير مفعّل. أضف مفاتيح البيئة أولاً.');
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanName = String(name || '').trim();
  const cleanPhone = String(phone || '').trim();
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ email: cleanEmail, password, data: { full_name: cleanName, phone: cleanPhone, role: 'user' } }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throwSupabase(data, 'فشل التسجيل');

  const user = data?.user;
  if (user?.id) {
    await fetch(`${SUPABASE_URL}/rest/v1/profiles?on_conflict=id`, {
      method: 'POST',
      headers: { ...jsonHeaders(data?.session?.access_token), Prefer: 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify({
        id: user.id,
        email: cleanEmail,
        full_name: cleanName,
        phone: cleanPhone,
        role: 'user',
        status: 'active',
      }),
    }).catch(() => null);
  }

  if (data?.session) {
    localStorage.setItem('sb_session', JSON.stringify(data.session));
    window.dispatchEvent(new Event('driverent-auth-change'));
  }
  return data;
}

export async function signIn({ email, password }) {
  if (!SUPABASE_READY) throw new Error('Supabase غير مفعّل. أضف مفاتيح البيئة أولاً.');
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throwSupabase(data, 'بيانات الدخول غير صحيحة');
  localStorage.setItem('sb_session', JSON.stringify(data));
  window.dispatchEvent(new Event('driverent-auth-change'));
  return data;
}

export async function signOut() {
  const session = getSession();
  if (SUPABASE_READY && session?.access_token) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: 'POST',
      headers: jsonHeaders(session.access_token),
    }).catch(() => {});
  }
  localStorage.removeItem('sb_session');
  window.dispatchEvent(new Event('driverent-auth-change'));
}

export function getSession() {
  return safeJson(localStorage.getItem('sb_session') || 'null');
}

export function getCurrentUser() {
  return getSession()?.user ?? null;
}

export async function resetPassword(email) {
  if (!SUPABASE_READY) throw new Error('Supabase غير مفعّل. أضف مفاتيح البيئة أولاً.');
  const res = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ email }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throwSupabase(data, 'فشل الإرسال');
  return data;
}

export function signInWithOAuth(provider) {
  if (!SUPABASE_READY) throw new Error('Supabase غير مفعّل. أضف مفاتيح البيئة أولاً.');
  const cleanProvider = String(provider || '').toLowerCase();
  if (!['google', 'apple'].includes(cleanProvider)) throw new Error('مزود الدخول غير مدعوم.');
  const redirectTo = `${window.location.origin}/`;
  const url = new URL(`${SUPABASE_URL}/auth/v1/authorize`);
  url.searchParams.set('provider', cleanProvider);
  url.searchParams.set('redirect_to', redirectTo);
  window.location.assign(url.toString());
}

export async function handleOAuthCallback() {
  if (!SUPABASE_READY || typeof window === 'undefined') return null;
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const accessToken = hash.get('access_token');
  const refreshToken = hash.get('refresh_token');
  if (!accessToken) return getSession();

  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: jsonHeaders(accessToken) });
  const user = await res.json().catch(() => null);
  if (!res.ok || !user?.id) return null;

  const session = {
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: hash.get('token_type') || 'bearer',
    expires_in: Number(hash.get('expires_in') || 3600),
    user,
  };
  localStorage.setItem('sb_session', JSON.stringify(session));

  await fetch(`${SUPABASE_URL}/rest/v1/profiles?on_conflict=id`, {
    method: 'POST',
    headers: { ...jsonHeaders(accessToken), Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
      phone: user.user_metadata?.phone || '',
      role: 'user',
      status: 'active',
    }),
  }).catch(() => null);

  window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
  window.dispatchEvent(new Event('driverent-auth-change'));
  return session;
}

export function getAppLanguage() {
  return localStorage.getItem('driverent_lang') || 'ar';
}

export function setAppLanguage(lang) {
  const clean = ['ar', 'fr', 'en', 'tz'].includes(lang) ? lang : 'ar';
  localStorage.setItem('driverent_lang', clean);
  const dir = clean === 'ar' ? 'rtl' : 'ltr';
  if (typeof document !== 'undefined') {
    document.documentElement.lang = clean;
    document.documentElement.dir = dir;
    document.body?.setAttribute('dir', dir);
    document.body?.setAttribute('data-lang', clean);
  }
  window.dispatchEvent(new CustomEvent('driverent-language-change', { detail: { lang: clean, dir } }));
}

// ─── DB helpers ─────────────────────────────────────────────────────────────
export function isSupabaseReady() { return SUPABASE_READY; }

export async function dbSelect(table, query = '') {
  if (!SUPABASE_READY) return [];
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
    headers: { ...jsonHeaders(), Prefer: 'return=representation' },
  });
  const data = await res.json().catch(() => []);
  if (!res.ok) throwSupabase(data, 'خطأ في قاعدة البيانات');
  return Array.isArray(data) ? data : [];
}

export async function dbInsert(table, body) {
  if (!SUPABASE_READY) return [];
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...jsonHeaders(), Prefer: 'return=representation' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => []);
  if (!res.ok) throwSupabase(data, 'فشل الحفظ');
  return Array.isArray(data) ? data : [data];
}

export async function dbUpdate(table, match, body) {
  if (!SUPABASE_READY) return [];
  const query = Object.entries(match).map(([k, v]) => `${encodeURIComponent(k)}=eq.${encodeURIComponent(v)}`).join('&');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    method: 'PATCH',
    headers: { ...jsonHeaders(), Prefer: 'return=representation' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => []);
  if (!res.ok) throwSupabase(data, 'فشل التحديث');
  return Array.isArray(data) ? data : [data];
}

export async function dbDelete(table, match) {
  if (!SUPABASE_READY) return [];
  const query = Object.entries(match).map(([k, v]) => `${encodeURIComponent(k)}=eq.${encodeURIComponent(v)}`).join('&');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    method: 'DELETE',
    headers: { ...jsonHeaders(), Prefer: 'return=representation' },
  });
  const data = await res.json().catch(() => []);
  if (!res.ok) throwSupabase(data, 'فشل الحذف');
  return Array.isArray(data) ? data : [data];
}

// ─── Cross-platform helpers ────────────────────────────────────────────────
export function normalizeBookingRow(row) {
  return {
    id: row.id,
    status: row.status || 'pending',
    paymentStatus: row.payment_status || 'عند الاستلام',
    carId: row.car_id,
    agencyId: row.agency_id,
    agencyName: row.agency_name,
    car: row.car_name || row.car || 'سيارة',
    img: row.car_image || row.img || '',
    wilaya: row.wilaya || 'الجزائر',
    from: row.pickup_date || row.from,
    to: row.return_date || row.to,
    days: row.days || 1,
    price: Number(row.total_price ?? row.price ?? 0),
    oldDisplayPrice: Number(row.old_display_price ?? 0),
    basePrice: Number(row.base_price ?? 0),
    dailyPrice: Number(row.daily_price ?? 0),
    serviceFee: Number(row.platform_fee ?? row.service_fee ?? 0),
    pickupPlace: row.pickup_place || row.agency_name || 'الوكالة',
    driverName: row.driver_name || row.user_name || 'مستخدم',
    driverPhone: row.driver_phone || '',
    driverAge: row.driver_age || '',
    createdAt: row.created_at,
  };
}

export async function sendAgencyMessage({ agency, body, subject = 'رسالة من مستخدم المنصة' }) {
  const user = getCurrentUser();
  const cleanBody = String(body || '').trim();
  if (!cleanBody) throw new Error('اكتب الرسالة أولاً');
  const payload = {
    id: `MSG-${Date.now().toString(36).toUpperCase()}`,
    agency_id: String(agency?.id || ''),
    agency_name: agency?.name || 'الوكالة',
    user_id: user?.id || null,
    user_name: user?.user_metadata?.full_name || 'مستخدم RENT درايف',
    user_email: user?.email || null,
    subject,
    body: cleanBody,
    direction: 'user_to_agency',
    status: 'pending',
  };
  const rows = await dbInsert('messages', payload);
  window.dispatchEvent(new CustomEvent('driverent:message-created', { detail: payload }));
  return rows?.[0] || payload;
}
