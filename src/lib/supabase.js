// ─── Supabase Client ────────────────────────────────────────────────────────
const SUPABASE_URL = "https://xtxgvymigvwrhcsogmdj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0eGd2eW1pZ3Z3cmhjc29nbWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTIyMTYsImV4cCI6MjA5NDk2ODIxNn0.5XvUQHiKvSr8jdENo-CAWOC0aYooWxKok-wFdF_IHp4";

// ─── Minimal fetch-based Supabase helper (no npm package needed) ─────────────
const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

// ─── Auth helpers ─────────────────────────────────────────────────────────────

/** Sign up with email + password + extra profile data */
export async function signUp({ email, password, name, phone }) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      password,
      data: { full_name: name, phone },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || "فشل التسجيل");
  return data; // { user, session }
}

/** Sign in with email + password */
export async function signIn({ email, password }) {
  const res = await fetch(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || "بيانات الدخول غير صحيحة");
  // persist session
  localStorage.setItem("sb_session", JSON.stringify(data));
  return data; // { access_token, user, ... }
}

/** Sign out */
export async function signOut() {
  const session = getSession();
  if (session?.access_token) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: { ...headers, Authorization: `Bearer ${session.access_token}` },
    }).catch(() => {});
  }
  localStorage.removeItem("sb_session");
}

/** Get stored session */
export function getSession() {
  try {
    return JSON.parse(localStorage.getItem("sb_session") || "null");
  } catch {
    return null;
  }
}

/** Get current user from stored session */
export function getCurrentUser() {
  const s = getSession();
  return s?.user ?? null;
}

/** Send password-reset email */
export async function resetPassword(email) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || "فشل الإرسال");
  return data;
}

// ─── DB helpers (REST) ────────────────────────────────────────────────────────

function authHeaders() {
  const s = getSession();
  return s?.access_token
    ? { ...headers, Authorization: `Bearer ${s.access_token}` }
    : headers;
}

/** Generic SELECT */
export async function dbSelect(table, query = "") {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
    headers: { ...authHeaders(), Prefer: "return=representation" },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "خطأ في قاعدة البيانات");
  return data;
}

/** Generic INSERT */
export async function dbInsert(table, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...authHeaders(), Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "فشل الحفظ");
  return data;
}

/** Generic UPDATE */
export async function dbUpdate(table, match, body) {
  const query = Object.entries(match)
    .map(([k, v]) => `${k}=eq.${v}`)
    .join("&");
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    method: "PATCH",
    headers: { ...authHeaders(), Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "فشل التحديث");
  return data;
}
