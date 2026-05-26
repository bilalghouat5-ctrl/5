import { useEffect, useState } from "react";
import {
  IconLanguage,
  IconSupport,
  IconLogin,
  IconVerified,
  IconBell,
  IconChevronRight,
} from "../ui/AppIcons.jsx";
import { getCurrentUser, signOut, getAppLanguage, setAppLanguage } from "../../lib/supabase.js";

const VERSION = "6.7";

const LANGS = [
  { id: "ar", label: "العربية", short: "AR" },
  { id: "fr", label: "Français", short: "FR" },
  { id: "en", label: "English", short: "EN" },
];

function Row({ icon, title, sub, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        border: "none",
        background: "transparent",
        padding: "14px 14px",
        fontFamily: "inherit",
        textAlign: "right",
        cursor: "pointer",
        borderBottom: "1px solid rgba(255,255,255,.055)",
      }}
    >
      <span style={{
        width: 38,
        height: 38,
        borderRadius: 13,
        display: "grid",
        placeItems: "center",
        background: danger ? "rgba(239,68,68,.10)" : "rgba(124,58,237,.12)",
        border: danger ? "1px solid rgba(239,68,68,.2)" : "1px solid rgba(167,139,250,.2)",
        color: danger ? "#FCA5A5" : "#A78BFA",
        flexShrink: 0,
      }}>{icon}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", color: danger ? "#FCA5A5" : "#fff", fontSize: 13.2, fontWeight: 900 }}>{title}</span>
        {sub && <span style={{ display: "block", color: "rgba(255,255,255,.34)", fontSize: 11.2, fontWeight: 700, marginTop: 3 }}>{sub}</span>}
      </span>
      {!danger && <IconChevronRight size={15} color="rgba(255,255,255,.28)" />}
    </button>
  );
}

export function ProfilePage({ onLogout }) {
  const user = getCurrentUser();
  const [lang, setLang] = useState(getAppLanguage());
  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "مستخدم درايف";
  const email = user?.email || "demo@driverent.dz";
  const avatar = user?.user_metadata?.avatar_url || `https://i.pravatar.cc/160?u=${encodeURIComponent(email)}`;

  useEffect(() => {
    const sync = () => setLang(getAppLanguage());
    window.addEventListener("driverent-language-change", sync);
    return () => window.removeEventListener("driverent-language-change", sync);
  }, []);

  async function handleLogout() {
    await signOut();
    window.dispatchEvent(new Event("driverent-auth-change"));
    onLogout?.();
  }

  function changeLanguage(id) {
    setLang(id);
    setAppLanguage(id);
    navigator.vibrate?.(12);
  }

  return (
    <div style={{ paddingBottom: 112, animation: "fadeUp .35s ease" }}>
      <div style={{
        margin: "4px 0 16px",
        padding: "22px 18px",
        borderRadius: 24,
        background: "linear-gradient(135deg, rgba(124,58,237,.18), rgba(79,70,229,.08))",
        border: "1px solid rgba(167,139,250,.18)",
        boxShadow: "0 18px 44px rgba(0,0,0,.22)",
        textAlign: "center",
      }}>
        <div style={{ position: "relative", width: 82, height: 82, margin: "0 auto 12px" }}>
          <img src={avatar} alt={name} style={{ width: "100%", height: "100%", borderRadius: 25, objectFit: "cover", border: "2px solid rgba(167,139,250,.45)" }} />
          <span style={{ position: "absolute", right: -4, bottom: -4, width: 27, height: 27, borderRadius: "50%", background: "#07080F", display: "grid", placeItems: "center", border: "2px solid #07080F" }}>
            <IconVerified size={18} color="#34D399" />
          </span>
        </div>
        <h1 style={{ margin: 0, fontSize: 20, color: "#fff", fontWeight: 950, letterSpacing: "-.25px" }}>{name}</h1>
        <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,.38)", fontSize: 12, direction: "ltr" }}>{email}</p>
      </div>

      <div style={{
        borderRadius: 22,
        overflow: "hidden",
        background: "rgba(255,255,255,.035)",
        border: "1px solid rgba(255,255,255,.075)",
      }}>
        <div style={{ padding: "14px 14px 12px", borderBottom: "1px solid rgba(255,255,255,.055)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: 13, background: "rgba(124,58,237,.12)", border: "1px solid rgba(167,139,250,.2)" }}>
              <IconLanguage size={18} color="#A78BFA" />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontSize: 13.2, fontWeight: 900 }}>اللغة</div>
              <div style={{ color: "rgba(255,255,255,.34)", fontSize: 11.2, marginTop: 2 }}>اختر لغة التطبيق</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {LANGS.map((l) => (
              <button key={l.id} onClick={() => changeLanguage(l.id)} style={{
                minHeight: 40,
                borderRadius: 14,
                border: lang === l.id ? "1px solid rgba(167,139,250,.75)" : "1px solid rgba(255,255,255,.08)",
                background: lang === l.id ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.045)",
                color: lang === l.id ? "#fff" : "rgba(255,255,255,.58)",
                fontFamily: "inherit",
                fontSize: 12,
                fontWeight: 950,
              }}>{l.short}</button>
            ))}
          </div>
        </div>

        <Row icon={<IconSupport size={18} color="currentColor" />} title="الدعم والمساعدة" sub="تواصل مع فريق درايف Rent" onClick={() => alert("سيتم إضافة مركز المساعدة قريبًا")} />
        <Row icon={<IconBell size={18} color="currentColor" />} title="الإشعارات" sub="تنبيهات الحجوزات والرسائل" onClick={() => alert("الإشعارات مفعّلة تجريبياً")} />
        <Row icon={<IconLogin size={18} color="currentColor" />} title="تسجيل الخروج" sub="الخروج من حساب المستخدم" danger onClick={handleLogout} />
      </div>

      <div style={{ marginTop: 22, textAlign: "center", color: "rgba(255,255,255,.26)", fontSize: 11.5, fontWeight: 800 }}>
        Version {VERSION}
      </div>
    </div>
  );
}
